import type { ColumnRole, EntitySchema, ShellRow } from '../types'
import { cellValue, roleColumn, roleColumns } from '../query/columns'

/**
 * A minimal query language for the expression field: whitespace-separated
 * terms, ANDed together, with `OR` splitting alternatives.
 *
 *   site:*.shop AND price < 40 AND seen:false
 *   theme:space year>=1988 parts>300
 *   cve OR advisory
 *   -theme:space -recall
 *
 * `AND` is implicit and the literal keyword is accepted for readability.
 * A bare word matches the identity or the reference — whichever columns the
 * schema gave those roles. `field:value` and `field<op>number` match a field
 * the row carries, a column by name or heading, or one of the generic names
 * below. Anything unresolvable is ignored rather than treated as a mismatch,
 * so a half-typed expression keeps showing results instead of emptying the
 * screen.
 *
 * `:` and `=` both name a field, and differ only on a string: `:` is
 * containment — `id:3070` finds `P-3070` and `P-3070bpb0745` alike — and `=`
 * is the whole value, case-insensitive and unwildcarded — `id=3070` finds
 * neither of those but `id=P-3070` finds only the first. An id sharing a
 * prefix with others of its kind is what `=` is for; free text is what `:`
 * is for. Numbers and booleans compare exactly either way, there being no
 * containment a number could mean.
 *
 * Two `field:value` terms on the same field in one group are any-of rather
 * than both: `category:5 category:7` is the rows filed under either, since
 * no row is filed under both, and it is what pressing two categories writes.
 * Only a positive `:` or `=` reads so — `year>=1988 year<=1990` is a range,
 * and `-set:a -set:b` is both sets left out.
 *
 * A leading `-` turns a term round: `-theme:space` keeps every row the plain
 * term would have dropped, and drops every row it would have kept. Only the
 * *match* is turned — a term that constrains nothing, an unknown field or a
 * number compared against a word, still constrains nothing with a `-` in
 * front of it, since the half-typed case is the same half-typed case. The
 * sign is read off the term as written, quotes and all: there is no way to
 * search for a word that starts with a dash, which is a smaller thing to give
 * up than a way to say "not this one".
 */

export type Comparator = ':' | '=' | '>' | '<' | '>=' | '<='

export interface FieldTerm {
  kind: 'field'
  field: string
  comparator: Comparator
  value: string
  /** Written with a leading `-`: the rows this would have matched are the ones left out. */
  negated?: boolean
}

export interface TextTerm {
  kind: 'text'
  value: string
  /** As on {@link FieldTerm}. */
  negated?: boolean
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

  for (const written of tokenize(trimmed)) {
    const upper = written.toUpperCase()
    if (upper === 'AND' || upper === '&&') continue
    if (upper === 'OR' || upper === '||') {
      if (group.length) groups.push(group)
      group = []
      continue
    }
    // A dash on its own is a word, not the sign of a term that is not there.
    const negated = written.length > 1 && written.startsWith('-')
    const token = negated ? written.slice(1) : written
    const sign = negated ? { negated: true } : {}
    const match = OPERATOR_PATTERN.exec(token)
    if (match && match[3] !== '') {
      group.push({
        kind: 'field',
        field: (match[1] as string).toLowerCase(),
        comparator: match[2] as Comparator,
        value: match[3] as string,
        ...sign,
      })
    } else {
      group.push({ kind: 'text', value: token, ...sign })
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

/**
 * Case-insensitive, whole-value comparison — no containment and no wildcard.
 *
 * What `=` asks for where `:` would ask "does this contain it": an id like
 * `P-3070` is a value in its own right, and a corpus that also holds
 * `P-3070bpb0745` answers `:` truthfully by containment and wrongly by the
 * question a caller meant. `=` is the way to ask the second question.
 */
function sameText(actual: string, wanted: string): boolean {
  return actual.toLowerCase() === wanted.toLowerCase()
}

/**
 * Whether the row is what the term asks for — or null, where the term asks
 * nothing of this row: an unresolvable field, a number compared against a
 * word, a word compared against a list. Those are not a mismatch, and they
 * are not a match turned round either, which is why they are told apart from
 * both here rather than folded into `true`.
 */
function termOutcome(term: Term, row: ShellRow, entity: EntitySchema): boolean | null {
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
  if (actual === undefined) return null // unknown field: not a constraint

  // A multi-valued facet answers to each of its values on its own. Nothing
  // there is a number, so a comparison against one constrains nothing.
  if (Array.isArray(actual)) {
    const equality = term.comparator === ':' || term.comparator === '='
    return equality
      ? actual.some((entry) =>
          term.comparator === '='
            ? sameText(String(entry), term.value)
            : matchesText(String(entry), term.value),
        )
      : null
  }

  if (term.comparator === ':' || term.comparator === '=') {
    if (typeof actual === 'boolean') {
      const wanted = term.value.toLowerCase()
      if (wanted === 'true' || wanted === 'yes') return actual
      if (wanted === 'false' || wanted === 'no') return !actual
      return null
    }
    if (typeof actual === 'number') {
      const wanted = Number(term.value)
      return Number.isFinite(wanted) ? actual === wanted : null
    }
    return term.comparator === '='
      ? sameText(String(actual), term.value)
      : matchesText(String(actual), term.value)
  }

  const wanted = Number(term.value)
  const actualNumber = typeof actual === 'number' ? actual : Number(actual)
  if (!Number.isFinite(wanted) || !Number.isFinite(actualNumber)) return null

  return compare(term.comparator, actualNumber, wanted)
}

/** The outcome as a constraint: a term that asks nothing is satisfied, and a `-` turns the rest. */
function matchesTerm(term: Term, row: ShellRow, entity: EntitySchema): boolean {
  const outcome = termOutcome(term, row, entity)
  if (outcome === null) return true
  return term.negated ? !outcome : outcome
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

/**
 * Whether a term is one of a set that reads as any-of: a positive `field:value`
 * or `field=value`, which names one of the values a field may hold. Two of
 * those on the same field in one group are alternatives, not a conjunction —
 * `category:5 category:7` is the rows filed under either, since no row is
 * filed under both. A comparison is not one of these: `year>=1988 year<=1990`
 * is a range, and stays two constraints; nor is a turned term, `-set:a -set:b`
 * being both sets left out.
 */
function names(term: Term): term is FieldTerm {
  return (
    term.kind === 'field' &&
    !term.negated &&
    (term.comparator === ':' || term.comparator === '=')
  )
}

/**
 * True when the row satisfies at least one `OR` group in full — every term
 * of it, except that the naming terms on one field (see {@link names}) count
 * as satisfied when any one of them is. A half-typed one among them is
 * satisfied on its own, as it is anywhere, so a set holding one is satisfied
 * whatever the rest say — the same reading a half-typed term gets alone.
 */
export function matchesExpression(
  expression: Expression,
  row: ShellRow,
  entity: EntitySchema,
): boolean {
  if (!expression.length) return true
  return expression.some((group) => {
    const named = new Map<string, boolean>()
    for (const term of group) {
      if (!names(term)) continue
      named.set(term.field, (named.get(term.field) ?? false) || matchesTerm(term, row, entity))
    }
    return group.every((term) =>
      names(term) ? named.get(term.field) === true : matchesTerm(term, row, entity),
    )
  })
}

/**
 * Wraps a value the tokenizer would otherwise read as two terms. Quotes inside
 * are dropped rather than escaped: there is no escape in this language, so a
 * kept quote would end the value early.
 */
function quote(value: string): string {
  return /[\s"']/.test(value) ? `"${value.replace(/["']/g, '')}"` : value
}

/**
 * One term, written back as the source that parses to it.
 *
 * Normalized rather than original: the field is lowercased and the value
 * re-quoted only where it has to be, since the parse keeps neither the case
 * nor the spacing it was written with. `parseExpression(formatTerm(t))` is `t`.
 */
export function formatTerm(term: Term): string {
  const sign = term.negated ? '-' : ''
  if (term.kind === 'text') return sign + quote(term.value)
  return `${sign}${term.field}${term.comparator}${quote(term.value)}`
}

/**
 * The term turned round: the one that keeps exactly the rows this one drops.
 * Twice over is the term it started as.
 */
export function negateTerm<T extends Term>(term: T): T {
  if (!term.negated) return { ...term, negated: true }
  // Dropped rather than set false, so the term is the one the parse would
  // have made of it and compares equal to that.
  const { negated: _sign, ...plain } = term
  return plain as T
}

/**
 * A whole expression, written back as source: terms spaced within a group,
 * `OR` between them. A group with nothing left in it is dropped — an
 * alternative with no terms would match every row, and so would the expression.
 */
export function formatExpression(expression: Expression): string {
  return expression
    .filter((group) => group.length)
    .map((group) => group.map(formatTerm).join(' '))
    .join(' OR ')
}

/**
 * The expression with one term taken out of it, addressed by which `OR` group
 * it is in and where in that group it sits — what removing one part of a query
 * means when the parts are what is on screen.
 */
export function withoutTerm(expression: Expression, group: number, index: number): Expression {
  return expression
    .map((terms, at) => (at === group ? terms.filter((_, i) => i !== index) : terms))
    .filter((terms) => terms.length)
}

/**
 * An expression in the two halves the query panel edits it as: the
 * `field:value` constraints it names, and the words left over.
 *
 * A field term is a whole constraint on its own — `set:"sets_10007"`, written
 * by a drill rather than typed — so the panel shows each of those as a part
 * and leaves the box for what a person writes into it: the text to look for,
 * or the next part to add.
 *
 * Alternatives are the exception. `OR` makes the terms of an expression
 * depend on one another — a term lifted out of one alternative and ANDed back
 * on to the whole is a different query — so an expression with more than one
 * of them is not split at all. It stays in the box as it was written, and the
 * header is where its parts come out one at a time.
 */
export interface ExpressionSplit {
  parts: FieldTerm[]
  text: string
}

export function splitExpression(input: string): ExpressionSplit {
  const groups = parseExpression(input)
  if (groups.length > 1) return { parts: [], text: input.trim() }

  const terms = groups[0] ?? []
  return {
    parts: terms.filter((term): term is FieldTerm => term.kind === 'field'),
    text: terms
      .filter((term) => term.kind === 'text')
      .map(formatTerm)
      .join(' '),
  }
}

/**
 * The two halves written back as one expression, the parts first — the field
 * read left to right, since that is the order it shows them in.
 */
export function joinExpression(parts: FieldTerm[], text: string): string {
  return [...parts.map(formatTerm), text.trim()].filter(Boolean).join(' ')
}

/** Values compare as they match: case is not a constraint in this language. */
const sameValue = (one: string, other: string) => one.toLowerCase() === other.toLowerCase()

/**
 * Whether two terms say the same thing.
 *
 * By what they parse to rather than by how they were written, because the same
 * constraint has more than one spelling: a term written by a drill is always
 * quoted, while lifting any part of a query writes the rest back out through
 * {@link formatExpression}, which quotes only where it has to. `host:"a.example"`
 * and `host:a.example` are one term, and a comparison of text would call them
 * two and let a second copy in.
 */
export function sameTerm(one: Term, other: Term): boolean {
  return Boolean(one.negated) === Boolean(other.negated) && sameConstraint(one, other)
}

/**
 * Whether two terms are about the same thing, whichever way round each is
 * said — `set:a` and `-set:a` are one constraint with two signs, and a query
 * holding both of them holds nothing.
 */
export function oppositeTerm(one: Term, other: Term): boolean {
  return Boolean(one.negated) !== Boolean(other.negated) && sameConstraint(one, other)
}

function sameConstraint(one: Term, other: Term): boolean {
  if (one.kind === 'field') {
    return (
      other.kind === 'field' &&
      one.field === other.field &&
      one.comparator === other.comparator &&
      sameValue(one.value, other.value)
    )
  }
  return other.kind === 'text' && sameValue(one.value, other.value)
}

/** The group with any term it already says taken out of what is being added. */
function withoutRepeats(group: Term[], added: Term[]): Term[] {
  return added.filter((term) => !group.some((existing) => sameTerm(existing, term)))
}

/**
 * Two expressions as one that means both — `(a OR b)` and `c` giving
 * `a c OR b c`.
 *
 * Not a concatenation, because this language is a disjunction of conjunctions
 * and has no brackets: appending `c` to `a OR b` would read as `a OR (b c)`,
 * which is a weaker query than was asked for. So the alternatives are
 * multiplied out, one group per pair, and a constraint already present in a
 * group is not repeated in it.
 *
 * Either side may be empty, in which case the other is the whole of it: an
 * expression with no terms narrows nothing, so ANDing one on changes nothing.
 */
export function andExpression(one: string, other: string): string {
  return combine(one, other, (group) => group)
}

/**
 * `expr` with `typed` added the way a reader adding to their own query means
 * it: as {@link andExpression} does, except that a term the query holds the
 * other way round is turned rather than joined.
 *
 * `-set:a` typed on to `set:a` is `-set:a`, because a query saying both says
 * nothing, and what was typed was a change of mind about that record — the
 * same reading a press makes through `addTerm`. Turned in each alternative the
 * old term stood in, so an `OR` query comes out with the new sign throughout.
 *
 * Not {@link andExpression}'s own reading, because that one also lays a
 * host's `within` under the query, and there the opposite is not a change of
 * mind but a query the host's scope rules out: turning it would let the
 * reader out of the scope.
 */
export function refineExpression(expr: string, typed: string): string {
  return combine(expr, typed, (group, added) =>
    group.filter((existing) => !added.some((term) => oppositeTerm(existing, term))),
  )
}

/**
 * The two expressions multiplied out, with `keep` saying what of each group
 * on the left survives what is added to it.
 */
function combine(
  one: string,
  other: string,
  keep: (group: Term[], added: Term[]) => Term[],
): string {
  const left = parseExpression(one)
  const right = parseExpression(other)
  if (!left.length) return formatExpression(right)
  if (!right.length) return formatExpression(left)
  return formatExpression(
    left.flatMap((group) =>
      right.map((added) => [...keep(group, added), ...withoutRepeats(group, added)]),
    ),
  )
}
