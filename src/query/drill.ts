import type { DomainSchema, EntitySchema, ShellRow } from '../types'

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
  const field = entity?.scope
  if (!field) return null
  return `${field}:"${row.id.replace(/"/g, '')}"`
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
 * term twice.
 */
export function addTerm(expr: string, term: string | null): string {
  if (!term) return expr
  const current = expr.trim()
  if (!current) return term
  return current.split(/\s+/).includes(term) ? current : `${current} ${term}`
}

/**
 * The whole of a drill: the expression to move to, given the row pressed.
 *
 * Which entity to list afterwards is the other half, and it comes straight
 * from the `drill` event — null there means narrow without pivoting.
 */
export function drillExpression(schema: DomainSchema, query: { expr: string }, row: ShellRow): string {
  return addTerm(query.expr, scopeTermFor(schema, row))
}
