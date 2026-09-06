import type { DomainSchema, EntitySchema, ShellRow } from '../types';
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
export declare function scopeTerm(entity: EntitySchema | null | undefined, row: ShellRow): string | null;
/**
 * The same term for a record named by its id alone — what reading one back
 * *out* of a query has, where a drill had the whole row in hand.
 */
export declare function recordTerm(entity: EntitySchema | null | undefined, id: string): string | null;
/** The same, resolving the row's entity out of the schema first. */
export declare function scopeTermFor(schema: DomainSchema, row: ShellRow): string | null;
/**
 * `expr` with `term` added, or unchanged when it is already there.
 *
 * Narrowing twice to the same record is a thing people do — press the count,
 * come back, press it again — and it should not leave the field carrying the
 * term twice. What goes in is the caller's own text; what decides it is
 * already there is the term it parses to.
 */
export declare function addTerm(expr: string, term: string | null): string;
/**
 * The whole of a drill: the expression to move to, given the row pressed.
 *
 * Which entity to list afterwards is the other half, and it comes straight
 * from the `drill` event — null there means narrow without pivoting.
 */
export declare function drillExpression(schema: DomainSchema, query: {
    expr: string;
}, row: ShellRow): string;
/**
 * The entity whose records a field names — the inverse of {@link scopeTerm}.
 *
 * `set` is the field every other record carries a set's id in, so
 * `set:"sets_10007"` is a term about a record of `sets`, and this is what says
 * which type that is. Null where nothing declares the field: an ordinary
 * constraint on a value rather than a reference to a record.
 */
export declare function scopedEntity(schema: DomainSchema, field: string): EntitySchema | null;
