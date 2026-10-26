import type { DomainSchema, EntitySchema, PressOptions, ShellRow, ViewKind } from '../types'
import type { FieldTerm, Term } from '../data/expression'
import { formatExpression, negateTerm, parseExpression, sameTerm } from '../data/expression'
import { PARAM_ENTITY, PARAM_EXPR, PARAM_PAGE, PARAM_VIEW } from './codec'

/**
 * Turning a `drill` into an expression.
 *
 * The shell reports the press and applies nothing, because how one record
 * reaches another is the host's — but the *expression* it takes is not, and
 * every host would otherwise write the same three lines and get the quoting
 * wrong. These are those three lines.
 */

/**
 * The expression term that narrows to one record — `host="www.myzillertal.at"`.
 *
 * Null when the row's entity declares no {@link EntitySchema.scope}: nothing
 * carries this record's id, so a term naming it would match every row that has
 * never heard of the field. An unresolvable field is *true* in this language,
 * which makes the missing declaration the dangerous case rather than the inert
 * one.
 *
 * Always quoted. An id is opaque — a spec path, a URL, a name with a space in
 * it — and the tokenizer strips the quotes before the term is read.
 *
 * Always `=`, never `:`. An id names one record, and ids nest: `:` asks "does
 * this contain it", so `test:"ticket-3.0/x.spec.ts"` also reached
 * `pre-ticket-3.0/x.spec.ts`, and narrowing to one record quietly brought its
 * namesake's rows along. `=` asks for the id itself, per entry of a list.
 */
export function scopeTerm(entity: EntitySchema | null | undefined, row: ShellRow): string | null {
  return recordTerm(entity, row.id)
}

/**
 * The same term for a record named by its id alone — what reading one back
 * *out* of a query has, where a drill had the whole row in hand.
 */
export function recordTerm(entity: EntitySchema | null | undefined, id: string): string | null {
  const field = entity?.scope
  if (!field) return null
  return fieldTerm(field, id)
}

/**
 * The term that names one record by the field it is carried in —
 * `test="ticket-3.0/x.spec.ts"` — for a caller that has the field in hand
 * rather than the entity: a route that knows which field its type is narrowed
 * by without assembling a schema first.
 *
 * Exactly what {@link recordTerm} writes, quoting and all, so a record reached
 * by an address and one reached by a press land on the same URL and read —
 * and lift — as one term. Quotes inside the id are dropped rather than
 * escaped: there is no escape in this language, and a kept quote would end
 * the value early.
 */
export function fieldTerm(field: string, id: string): string {
  return `${field}="${id.replace(/"/g, '')}"`
}

/**
 * The expression naming exactly these records — what acting on a ticked set
 * hands to a page that runs, exports or lists "what this query matches".
 *
 * Written on `target`: a field, or an entity whose {@link EntitySchema.scope}
 * says which. One {@link fieldTerm} per id, spaced, which this language reads
 * as *any of them* rather than all: two positive `=` terms on one field in one
 * group are alternatives, since no row is two records at once — it is what
 * the table's `+` over a page writes too.
 *
 * That reading belongs to the group, so ANDing this on to an expression that
 * already names a record on the same field widens rather than narrows: the
 * names land in one group and are all alternatives together. Hand it over as
 * the whole of a query, as a selection is.
 *
 * Null where no expression can say it: an entity that declares no scope, or
 * no ids — an empty expression is every row, the opposite of none. An id
 * that is nothing once its quotes are dropped names nothing, and is skipped.
 */
export function idsExpression(
  target: string | EntitySchema | null | undefined,
  ids: readonly string[],
): string | null {
  const field = typeof target === 'string' ? target : target?.scope
  if (!field) return null
  const terms = ids
    .filter((id) => id.replace(/"/g, '') !== '')
    .map((id) => fieldTerm(field, id))
  return terms.length ? terms.join(' ') : null
}

/**
 * Whether two terms name the same record, and with the same sign.
 *
 * A record term is `field="id"` now and was `field:"id"` before, and a query
 * in a bookmark, or written by a host, still says it the old way. Both name the
 * record, so the moves on a record — add it, lift it, read where the query
 * stands on it — treat the two spellings as one. Anything else compares as
 * {@link sameTerm} compares it.
 */
function sameReference(one: Term, other: Term): boolean {
  if (one.kind !== 'field' || other.kind !== 'field') return sameTerm(one, other)
  const names = (term: FieldTerm) => term.comparator === ':' || term.comparator === '='
  return sameTerm(one, { ...other, comparator: names(one) && names(other) ? one.comparator : other.comparator })
}

/** The same record, said the other way round. */
function oppositeReference(one: Term, other: Term): boolean {
  return sameReference(one, negateTerm(other))
}

/** The same, resolving the row's entity out of the schema first. */
export function scopeTermFor(schema: DomainSchema, row: ShellRow): string | null {
  return scopeTerm(
    schema.entities.find((entity) => entity.key === row.entityKey),
    row,
  )
}

/**
 * `expr` with `term` added, or unchanged when it is already there.
 *
 * Narrowing twice to the same record is a thing people do — press the count,
 * come back, press it again — and it should not leave the field carrying the
 * term twice. What goes in is the caller's own text; what decides it is
 * already there is the term it parses to.
 *
 * A term the expression holds the other way round is turned rather than
 * joined: `set:a` added to `-set:a` is `set:a`, because a query saying both
 * says nothing, and the press that added it was a change of mind about that
 * record and not a request for an empty screen. The expression is written
 * back out through {@link formatExpression} in that one case, which is the
 * same rewrite lifting a part makes.
 */
export function addTerm(expr: string, term: string | null): string {
  if (!term) return expr
  const current = expr.trim()
  if (!current) return term
  const [added] = parseExpression(term).flat()
  if (!added) return current
  const groups = parseExpression(current)
  const has = groups.some((group) => group.some((existing) => sameReference(existing, added)))
  if (has) return current
  const opposed = groups.some((group) => group.some((existing) => oppositeReference(existing, added)))
  if (!opposed) return `${current} ${term}`
  return formatExpression(
    groups.map((group) =>
      group.map((existing) => (oppositeReference(existing, added) ? added : existing)),
    ),
  )
}

/**
 * The term that leaves a record out — `-host:"www.myzillertal.at"` — from the
 * term that narrows to it. Null for null, so it takes what {@link scopeTerm}
 * gives straight; and the text as it was, sign apart, so the quoting a scope
 * term always carries is kept rather than re-decided.
 */
export function excludingTerm(term: string | null): string | null {
  if (!term) return null
  const written = term.trim()
  if (!written) return null
  return written.startsWith('-') ? written.slice(1) : `-${written}`
}

/**
 * How a query stands on one record: `in` where it narrows to the record,
 * `out` where it leaves the record out, and null where it says nothing about
 * it — which is nearly every record of nearly every query.
 */
export type TermStanding = 'in' | 'out'

/**
 * Whether `expr` holds `term`, and which way round it says it.
 *
 * A term is read by what it parses to, as {@link addTerm} reads it, so
 * `host:a.example` in the field is `host:"a.example"` written by a drill.
 * Found in any alternative: a query saying `set:a OR theme:space` is one that
 * names the set, whatever the other half says.
 *
 * Null for a null term — a record of a type that declares no scope is one no
 * query can name.
 */
export function termStanding(expr: string, term: string | null): TermStanding | null {
  if (!term || !expr.trim()) return null
  const [wanted] = parseExpression(term).flat()
  if (!wanted) return null
  const terms = parseExpression(expr).flat()
  if (terms.some((existing) => sameReference(existing, wanted))) return wanted.negated ? 'out' : 'in'
  if (terms.some((existing) => oppositeReference(existing, wanted))) return wanted.negated ? 'in' : 'out'
  return null
}

/**
 * `expr` with `term` lifted, whichever way round it was said.
 *
 * The one move a mark on a row offers: the query stops naming the record, and
 * that is the same move whether it named it to narrow to it or to leave it
 * out. Lifted from every alternative, since it is the *record* the reader is
 * releasing, not one mention of it; an alternative left with nothing in it
 * goes with it, as when a part on the bar is lifted. Unchanged, text and all,
 * where the query never held the term.
 */
export function liftTerm(expr: string, term: string | null): string {
  if (!term || !expr.trim()) return expr
  const [wanted] = parseExpression(term).flat()
  if (!wanted) return expr
  const groups = parseExpression(expr)
  const kept = groups.map((group) =>
    group.filter((existing) => !sameReference(existing, wanted) && !oppositeReference(existing, wanted)),
  )
  if (kept.every((group, at) => group.length === groups[at]?.length)) return expr
  return formatExpression(kept)
}

/**
 * `expr` with the query's standing on one record set outright: narrowed to
 * it, leaving it out, or — null — saying nothing about it.
 *
 * The three moves a mark on a row offers, as one: {@link addTerm} for the two
 * signs, which turns the term the other way round where the query held it so,
 * and {@link liftTerm} for neither. Unchanged for a null term, as they are —
 * a record of a type that declares no scope is one no query can name.
 */
export function withStanding(
  expr: string,
  term: string | null,
  standing: TermStanding | null,
): string {
  if (!term) return expr
  if (standing === null) return liftTerm(expr, term)
  return addTerm(expr, standing === 'out' ? excludingTerm(term) : term)
}

/**
 * Whether a press on a link is the browser's to handle: ⌘/Ctrl opens it in a
 * new tab, ⇧ in a new window, and any button but the main one is the
 * browser's too. A press that leads somewhere is a real link (`PressLink`),
 * so those keep doing exactly what they do on every other link.
 */
export function isBrowserPress(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0
}

/**
 * The options a press of the shell's own carries — the one place its modifier
 * is read, so every view agrees about which key it is.
 *
 * ⌥ (Alt) leaves the record out: the one modifier a link has no use for of its
 * own, ⌘/Ctrl and ⇧ being the browser's (see {@link isBrowserPress}). Alt-click
 * on a link would download it, which the press stops.
 */
export function pressOptions(event: MouseEvent | KeyboardEvent): PressOptions {
  return event.altKey ? { exclude: true } : {}
}

/**
 * The whole of a drill: the expression to move to, given the row pressed.
 *
 * Which entity to list afterwards is the other half, and it comes straight
 * from the `drill` event — null there means narrow without pivoting.
 *
 * With `exclude` it is the expression that leaves the row out instead, which
 * is what the same press means with ⌘ held.
 */
export function drillExpression(
  schema: DomainSchema,
  query: { expr: string },
  row: ShellRow,
  options: PressOptions = {},
): string {
  const term = scopeTermFor(schema, row)
  return addTerm(query.expr, options.exclude ? excludingTerm(term) : term)
}

/**
 * `expr` less any term on `entity`'s own {@link EntitySchema.scope} field.
 *
 * A query narrowed to `condition:N` says which condition every *other* type's
 * rows belong to; read against conditions themselves it would list the one
 * and leave nothing to choose from. So the term is the one part of the query
 * a list of that type does not apply to itself: every condition the rest of
 * the query allows is shown, and the term stays in the query, still narrowing
 * everything else, ready to be swapped for another from that list.
 *
 * Positive or negated, and every alternative: the field is what makes it that
 * type's own. Unchanged, text and all, where there is nothing to lift, so an
 * expression the reader wrote reaches the source as written — and unchanged
 * for a type that {@link EntitySchema.keepsScope}, whose list under the term
 * is the host's to narrow.
 */
export function withoutOwnScope(entity: EntitySchema | null | undefined, expr: string): string {
  const field = entity?.scope?.toLowerCase()
  if (!field || entity?.keepsScope || !expr.trim()) return expr
  const groups = parseExpression(expr)
  const kept = groups.map((group) =>
    group.filter((term) => term.kind !== 'field' || term.field !== field),
  )
  if (kept.every((group, at) => group.length === groups[at]?.length)) return expr
  return formatExpression(kept)
}

/**
 * The entity whose records a field names — the inverse of {@link scopeTerm}.
 *
 * `set` is the field every other record carries a set's id in, so
 * `set:"sets_10007"` is a term about a record of `sets`, and this is what says
 * which type that is. Null where nothing declares the field: an ordinary
 * constraint on a value rather than a reference to a record.
 */
export function scopedEntity(schema: DomainSchema, field: string): EntitySchema | null {
  // The parse lowercases a field it read; a schema declares one as it likes.
  const wanted = field.toLowerCase()
  return schema.entities.find((entity) => entity.scope?.toLowerCase() === wanted) ?? null
}

/**
 * The record a `field` and `value` name, where the field is some entity's
 * scope — `host` and `www.example.com` are a tenant — and null where it is
 * not, or where either half is missing.
 *
 * The one reading of a term as a reference to a record, shared by the header,
 * which puts a name to the id on a pill, and by {@link recordsIn}, which says
 * what a query is about. The sign and the comparator are the caller's to
 * weigh: `-host="x"` names the record as surely as `host="x"` does.
 */
export function namedRecord(
  schema: DomainSchema,
  field: string | undefined,
  value: string | undefined,
): { entity: EntitySchema; id: string } | null {
  if (!field || !value) return null
  const entity = scopedEntity(schema, field)
  return entity ? { entity, id: value } : null
}

/** One record a query names: which type, and which of them. */
export interface NarrowedRecord {
  entityKey: string
  id: string
}

/**
 * The records a set of expressions names, in the order they are written.
 *
 * A term whose field is some entity's `scope` is a term *about a record* —
 * that is what a scope declares — so this is the same reading the header
 * takes to put a name to the id on a pill. Everything else in the query is an
 * ordinary constraint on a value and names no record.
 *
 * Several expressions because the same screen can be read through more than
 * one: the query, and a `within` the host reads the shell inside. Deduped
 * across them, by type and by id whatever its case — the case is no
 * constraint in this language — keeping the first spelling written.
 *
 * Every such term counts, whatever its sign: `-host="x"` names the host too,
 * if only to leave it out. A caller that wants only the records the query
 * narrows *to* filters the expressions' negated terms out first.
 */
export function recordsIn(schema: DomainSchema, expressions: readonly string[]): NarrowedRecord[] {
  const found: NarrowedRecord[] = []
  const seen = new Set<string>()

  for (const expression of expressions) {
    for (const term of parseExpression(expression).flat()) {
      if (term.kind !== 'field') continue
      const named = namedRecord(schema, term.field, term.value)
      if (!named) continue
      const key = `${named.entity.key}:${named.id.toLowerCase()}`
      if (seen.has(key)) continue
      seen.add(key)
      found.push({ entityKey: named.entity.key, id: named.id })
    }
  }
  return found
}

/**
 * Search parameters to write over the ones a URL already carries, where
 * `undefined` takes one off — the shape `router.push({ query })` merges, and
 * the shape {@link narrowPatch} returns.
 */
export type SearchPatch = Record<string, string | undefined>

/**
 * The URL change that narrows the whole result set to one record, from
 * wherever the shell is now — what a press on a row's name does, for a
 * record card, a permalink or a link of the host's own.
 *
 * `expr` is the expression the URL already carries, so one narrowing stacks
 * on the last ({@link addTerm} — a term already there is not doubled, and one
 * held the other way round is turned). The type comes off and the view is
 * written rather than carried: in a list, one record is a one-row list of the
 * row that was just pressed, which is the press going nowhere, and the card
 * per type is where every type reports what it holds of the record. The page
 * goes too — these are different rows, so the page someone was on is a
 * position in a result set that no longer exists.
 *
 * `view` is cards unless said, as the shell's own press is.
 */
export function narrowPatch(expr: string, term: string | null, view: ViewKind = 'cards'): SearchPatch {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [PARAM_EXPR]: addTerm(expr, term) || undefined,
    [PARAM_ENTITY]: undefined,
    [PARAM_VIEW]: view,
    [PARAM_PAGE]: undefined,
  }
}
