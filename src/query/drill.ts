import type { DomainSchema, EntitySchema, ShellRow } from '../types'
import { parseExpression } from '../data/expression'
import type { Term } from '../data/expression'

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

/** Values compare as they match: case is not a constraint in this language. */
const sameValue = (one: string, other: string) => one.toLowerCase() === other.toLowerCase()

/**
 * Whether two terms say the same thing.
 *
 * By what they parse to rather than by how they were written, because the same
 * constraint has more than one spelling: `scopeTerm` always quotes, while
 * lifting any part of a query writes the rest back out through
 * `formatExpression`, which quotes only where it has to. `host:"a.example"`
 * and `host:a.example` are one term, and a comparison of text would call them
 * two and let a second copy in.
 */
function sameTerm(one: Term, other: Term): boolean {
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

/**
 * `expr` with `term` added, or unchanged when it is already there.
 *
 * Narrowing twice to the same record is a thing people do — press the count,
 * come back, press it again — and it should not leave the field carrying the
 * term twice. What goes in is the caller's own text; what decides it is
 * already there is the term it parses to.
 */
export function addTerm(expr: string, term: string | null): string {
  if (!term) return expr
  const current = expr.trim()
  if (!current) return term
  const [added] = parseExpression(term).flat()
  if (!added) return current
  const has = parseExpression(current).some((group) =>
    group.some((existing) => sameTerm(existing, added)),
  )
  return has ? current : `${current} ${term}`
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
