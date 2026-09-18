import type { DomainSchema, EntitySchema, PressOptions, ShellRow } from '../types';
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
 *
 * A term the expression holds the other way round is turned rather than
 * joined: `set:a` added to `-set:a` is `set:a`, because a query saying both
 * says nothing, and the press that added it was a change of mind about that
 * record and not a request for an empty screen. The expression is written
 * back out through {@link formatExpression} in that one case, which is the
 * same rewrite lifting a part makes.
 */
export declare function addTerm(expr: string, term: string | null): string;
/**
 * The term that leaves a record out — `-host:"www.myzillertal.at"` — from the
 * term that narrows to it. Null for null, so it takes what {@link scopeTerm}
 * gives straight; and the text as it was, sign apart, so the quoting a scope
 * term always carries is kept rather than re-decided.
 */
export declare function excludingTerm(term: string | null): string | null;
/**
 * How a query stands on one record: `in` where it narrows to the record,
 * `out` where it leaves the record out, and null where it says nothing about
 * it — which is nearly every record of nearly every query.
 */
export type TermStanding = 'in' | 'out';
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
export declare function termStanding(expr: string, term: string | null): TermStanding | null;
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
export declare function liftTerm(expr: string, term: string | null): string;
/**
 * The options a pointer press carries — the one place the modifier is read, so
 * every view agrees about which key it is. ⌘ on a Mac and Ctrl elsewhere are
 * the same key in the same place, and both are read everywhere, so a keyboard
 * on the wrong machine still works.
 */
export declare function pressOptions(event: MouseEvent | KeyboardEvent): PressOptions;
/**
 * The whole of a drill: the expression to move to, given the row pressed.
 *
 * Which entity to list afterwards is the other half, and it comes straight
 * from the `drill` event — null there means narrow without pivoting.
 *
 * With `exclude` it is the expression that leaves the row out instead, which
 * is what the same press means with ⌘ held.
 */
export declare function drillExpression(schema: DomainSchema, query: {
    expr: string;
}, row: ShellRow, options?: PressOptions): string;
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
 * expression the reader wrote reaches the source as written.
 */
export declare function withoutOwnScope(entity: EntitySchema | null | undefined, expr: string): string;
/**
 * The entity whose records a field names — the inverse of {@link scopeTerm}.
 *
 * `set` is the field every other record carries a set's id in, so
 * `set:"sets_10007"` is a term about a record of `sets`, and this is what says
 * which type that is. Null where nothing declares the field: an ordinary
 * constraint on a value rather than a reference to a record.
 */
export declare function scopedEntity(schema: DomainSchema, field: string): EntitySchema | null;
