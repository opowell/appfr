import type { EntitySchema, ShellRow } from '../types'

/**
 * A minimal query language for the expression field: whitespace-separated
 * terms, ANDed together, with `OR` splitting alternatives.
 *
 *   site:*.shop AND price < 40 AND seen:false
 *   theme:space year>=1988 parts>300
 *   cve OR advisory
 *
 * `AND` is implicit and the literal keyword is accepted for readability.
 * A bare word matches the primary or secondary field. `field:value` and
 * `field<op>number` match a named field or facet. Anything unresolvable is
 * ignored rather than treated as a mismatch, so a half-typed expression keeps
 * showing results instead of emptying the screen.
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

/**
 * Resolves a field name against a row. Recognises the generic field names, the
 * entity's own column labels, and any facet key — so `price>40` works when the
 * schema calls a metric "Price", and `theme:space` works when `theme` is a
 * facet.
 */
function resolveField(
  field: string,
  row: ShellRow,
  entity: EntitySchema,
): ShellRow['facets'][string] | undefined {
  const labels = entity.labels
  const alias = (label: string) => label.toLowerCase().replace(/\s+/g, '')
  const normalized = field.replace(/\s+/g, '')

  // Lets a cross-corpus query narrow by kind — `entity:logs` — without the
  // entity being anything more special than another field. Deliberately not
  // aliased to `kind`, which is a facet key in its own right.
  if (normalized === 'entity') return row.entityKey
  if (normalized === 'status' || normalized === 'state') return row.status
  if (normalized === 'score') return row.score
  if (normalized === 'updated' || normalized === 'date') return row.updatedAt
  if (normalized === 'name') return row.primary
  if (normalized === 'ref') return row.secondary
  if (normalized === 'metric1') return row.metric1
  if (normalized === 'metric2') return row.metric2

  /*
   * A key a row actually carries beats a name derived from a column heading.
   * The aliases below are a convenience — `parts > 300` for whatever the
   * schema called metric1 — while this is an identifier the schema declared,
   * and an entity whose primary column happens to be headed "Category" should
   * not shadow its own `category` field. That is not hypothetical: a `scope`
   * field is usually the singular of the type it points at, which is exactly
   * what such a column tends to be called.
   */
  if (field in row.facets) return row.facets[field]

  if (normalized === alias(labels.primary)) return row.primary
  if (normalized === alias(labels.secondary)) return row.secondary
  if (normalized === alias(labels.metric1)) return row.metric1
  if (normalized === alias(labels.metric2)) return row.metric2

  const facet = entity.facets.find((f) => alias(f.label) === normalized)
  return facet ? row.facets[facet.key] : undefined
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
    return matchesText(row.primary, term.value) || matchesText(row.secondary, term.value)
  }

  const actual = resolveField(term.field, row, entity)
  if (actual === undefined) return true // unknown field: not a constraint

  // A multi-valued facet answers to each of its values on its own. Nothing
  // there is a number, so a comparison against one constrains nothing.
  if (Array.isArray(actual)) {
    const equality = term.comparator === ':' || term.comparator === '='
    return equality ? actual.some((entry) => matchesText(entry, term.value)) : true
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
    return matchesText(actual, term.value)
  }

  const wanted = Number(term.value)
  const actualNumber = typeof actual === 'number' ? actual : Number(actual)
  if (!Number.isFinite(wanted) || !Number.isFinite(actualNumber)) return true

  switch (term.comparator) {
    case '>':
      return actualNumber > wanted
    case '>=':
      return actualNumber >= wanted
    case '<':
      return actualNumber < wanted
    case '<=':
      return actualNumber <= wanted
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
