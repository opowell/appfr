import type { ColumnRole, EntitySchema, ShellRow } from '../types'
import { cellValue, roleColumn, roleColumns } from '../query/columns'

/**
 * A minimal query language for the expression field: whitespace-separated
 * terms, ANDed together, with `OR` splitting alternatives.
 *
 *   site:*.shop AND price < 40 AND seen:false
 *   theme:space year>=1988 parts>300
 *   cve OR advisory
 *
 * `AND` is implicit and the literal keyword is accepted for readability.
 * A bare word matches the identity or the reference — whichever columns the
 * schema gave those roles. `field:value` and `field<op>number` match a field
 * the row carries, a column by name or heading, or one of the generic names
 * below. Anything unresolvable is ignored rather than treated as a mismatch,
 * so a half-typed expression keeps showing results instead of emptying the
 * screen.
 */

export type Comparator = ':' | '=' | '>' | '<' | '>=' | '<='

export interface FieldTerm {
  kind: 'field'
  field: string
  comparator: Comparator
  value: string
}

export interface TextTerm {
  kind: 'text'
  value: string
}

export type Term = FieldTerm | TextTerm

/** Disjunction of conjunctions: the outer array is `OR`, each inner is `AND`. */
export type Expression = Term[][]

const OPERATOR_PATTERN = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/

/**
 * Splits on whitespace but keeps `field op value` together even when the user
 * spaced it out, and keeps quoted phrases intact.
 */
function tokenize(input: string): string[] {
  const tokens: string[] = []
  let current = ''
  let quote: '"' | "'" | null = null

  const flush = () => {
    if (current) tokens.push(current)
    current = ''
  }

  for (let i = 0; i < input.length; i++) {
    const char = input[i] as string
    if (quote) {
      if (char === quote) quote = null
      else current += char
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      continue
    }
    if (/\s/.test(char)) {
      // A trailing operator means the value is the next token: `price < 40`.
      if (/(?:>=|<=|[:=><])$/.test(current)) continue
      // A leading operator attaches to the field already collected.
      const next = input.slice(i + 1).match(/^\s*(>=|<=|[:=><])/)
      if (next && current) continue
      flush()
      continue
    }
    current += char
  }
  flush()
  return tokens
}

export function parseExpression(input: string): Expression {
  const trimmed = input.trim()
  if (!trimmed) return []

  const groups: Term[][] = []
  let group: Term[] = []

  for (const token of tokenize(trimmed)) {
    const upper = token.toUpperCase()
    if (upper === 'AND' || upper === '&&') continue
    if (upper === 'OR' || upper === '||') {
      if (group.length) groups.push(group)
      group = []
      continue
    }
    const match = OPERATOR_PATTERN.exec(token)
    if (match && match[3] !== '') {
      group.push({
        kind: 'field',
        field: (match[1] as string).toLowerCase(),
        comparator: match[2] as Comparator,
        value: match[3] as string,
      })
    } else {
      group.push({ kind: 'text', value: token })
    }
  }
  if (group.length) groups.push(group)
  return groups
}

/** Compares field names written by hand with names declared in a schema. */
const alias = (name: string) => name.toLowerCase().replace(/\s+/g, '')

/**
 * The generic names, and the role each one asks for. A query written against a
 * corpus whose vocabulary you do not know can still say `status:failed` or
 * `updated>2026-01-01`, because those are what the roles mean — while a schema
 * naming a field `status` of its own is read first, below.
 */
const ROLE_ALIASES: Array<readonly [string, ColumnRole]> = [
  ['status', 'state'],
  ['state', 'state'],
  ['score', 'score'],
  ['updated', 'updated'],
  ['date', 'updated'],
  ['name', 'identity'],
  ['ref', 'reference'],
]

/**
 * Resolves a field name against a row.
 *
 * In order: the row's own fields, then the columns by key, field or heading,
 * then a facet by heading, then the generic role names. A key the row actually
 * carries beats a name derived from a heading — the aliases are a convenience,
 * `price > 40` for whatever the schema called that column, while a field is an
 * identifier the schema declared, and an entity whose identity column happens
 * to be headed "Category" should not shadow its own `category` field. That is
 * not hypothetical: a `scope` field is usually the singular of the type it
 * points at, which is exactly what such a column tends to be called.
 */
function resolveField(field: string, row: ShellRow, entity: EntitySchema): unknown {
  const normalized = alias(field)
  const columns = entity.columns ?? []

  // Lets a cross-corpus query narrow by kind — `entity:logs` — without the
  // entity being anything more special than another field. Deliberately not
  // aliased to `kind`, which is a facet key in its own right.
  if (normalized === 'entity') return row.entityKey

  if (field in row.fields) return row.fields[field]

  const named = columns.find(
    (column) =>
      column.key === field ||
      column.field === field ||
      (column.label !== undefined && alias(column.label) === normalized),
  )
  if (named) return cellValue(named, row)

  const facet = entity.facets.find((candidate) => alias(candidate.label) === normalized)
  if (facet && facet.key in row.fields) return row.fields[facet.key]

  const role = ROLE_ALIASES.find(([name]) => name === normalized)?.[1]
  if (role) {
    const column = roleColumn(columns, role)
    if (column) return cellValue(column, row)
  }
  // `metric1`, `metric2`, … name the metric columns by position, for a query
  // written before anyone knew what this corpus calls its numbers.
  const positional = /^metric(\d+)$/.exec(normalized)
  if (positional) {
    const column = roleColumns(columns, 'metric')[Number(positional[1]) - 1]
    if (column) return cellValue(column, row)
  }
  return undefined
}

/**
 * Wildcard-aware, case-insensitive containment. `*.shop` matches
 * `shop.example.com/pricing`; a term with no `*` is a plain substring test.
 */
function matchesText(haystack: string, needle: string): boolean {
  const hay = haystack.toLowerCase()
  const pattern = needle.toLowerCase()
  if (!pattern.includes('*')) return hay.includes(pattern)
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')
  return new RegExp(escaped).test(hay)
}

function matchesTerm(term: Term, row: ShellRow, entity: EntitySchema): boolean {
  if (term.kind === 'text') {
    // The identity and the reference: what a bare word is looking for, in
    // whichever columns this type gave those roles to.
    const columns = entity.columns ?? []
    return (['identity', 'reference'] as const).some((role) => {
      const column = roleColumn(columns, role)
      const value = column ? cellValue(column, row) : undefined
      return typeof value === 'string' && matchesText(value, term.value)
    })
  }

  const actual = resolveField(term.field, row, entity)
  if (actual === undefined) return true // unknown field: not a constraint

  // A multi-valued facet answers to each of its values on its own. Nothing
  // there is a number, so a comparison against one constrains nothing.
  if (Array.isArray(actual)) {
    const equality = term.comparator === ':' || term.comparator === '='
    return equality
      ? actual.some((entry) => matchesText(String(entry), term.value))
      : true
  }

  if (term.comparator === ':' || term.comparator === '=') {
    if (typeof actual === 'boolean') {
      const wanted = term.value.toLowerCase()
      if (wanted === 'true' || wanted === 'yes') return actual
      if (wanted === 'false' || wanted === 'no') return !actual
      return true
    }
    if (typeof actual === 'number') {
      const wanted = Number(term.value)
      return Number.isFinite(wanted) ? actual === wanted : true
    }
    return matchesText(String(actual), term.value)
  }

  const wanted = Number(term.value)
  const actualNumber = typeof actual === 'number' ? actual : Number(actual)
  if (!Number.isFinite(wanted) || !Number.isFinite(actualNumber)) return true

  return compare(term.comparator, actualNumber, wanted)
}

function compare(comparator: Comparator, left: number, right: number): boolean {
  switch (comparator) {
    case '>':
      return left > right
    case '>=':
      return left >= right
    case '<':
      return left < right
    case '<=':
      return left <= right
    default:
      return left === right
  }
}

/** True when the row satisfies at least one `OR` group in full. */
export function matchesExpression(
  expression: Expression,
  row: ShellRow,
  entity: EntitySchema,
): boolean {
  if (!expression.length) return true
  return expression.some((group) => group.every((term) => matchesTerm(term, row, entity)))
}
