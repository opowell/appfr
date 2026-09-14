import type { DomainSchema, EntitySchema, PressOptions, ShellRow } from '../types'
import { formatExpression, oppositeTerm, parseExpression, sameTerm } from '../data/expression'

/**
 * Turning a `drill` into an expression.
 *
 * The shell reports the press and applies nothing, because how one record
 * reaches another is the host's — but the *expression* it takes is not, and
 * every host would otherwise write the same three lines and get the quoting
 * wrong. These are those three lines.
 */

/**
 * The expression term that narrows to one record — `host:"www.myzillertal.at"`.
 *
 * Null when the row's entity declares no {@link EntitySchema.scope}: nothing
 * carries this record's id, so a term naming it would match every row that has
 * never heard of the field. An unresolvable field is *true* in this language,
 * which makes the missing declaration the dangerous case rather than the inert
 * one.
 *
 * Always quoted. An id is opaque — a spec path, a URL, a name with a space in
 * it — and the tokenizer strips the quotes before the term is read.
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
  return `${field}:"${id.replace(/"/g, '')}"`
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
  const has = groups.some((group) => group.some((existing) => sameTerm(existing, added)))
  if (has) return current
  const opposed = groups.some((group) => group.some((existing) => oppositeTerm(existing, added)))
  if (!opposed) return `${current} ${term}`
  return formatExpression(
    groups.map((group) =>
      group.map((existing) => (oppositeTerm(existing, added) ? added : existing)),
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
 * The options a pointer press carries — the one place the modifier is read, so
 * every view agrees about which key it is. ⌘ on a Mac and Ctrl elsewhere are
 * the same key in the same place, and both are read everywhere, so a keyboard
 * on the wrong machine still works.
 */
export function pressOptions(event: MouseEvent | KeyboardEvent): PressOptions {
  return event.metaKey || event.ctrlKey ? { exclude: true } : {}
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
