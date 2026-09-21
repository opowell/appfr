import type { EntitySchema, ShellRow } from '../types';
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
export type Comparator = ':' | '=' | '>' | '<' | '>=' | '<=';
export interface FieldTerm {
    kind: 'field';
    field: string;
    comparator: Comparator;
    value: string;
    /** Written with a leading `-`: the rows this would have matched are the ones left out. */
    negated?: boolean;
}
export interface TextTerm {
    kind: 'text';
    value: string;
    /** As on {@link FieldTerm}. */
    negated?: boolean;
}
export type Term = FieldTerm | TextTerm;
/** Disjunction of conjunctions: the outer array is `OR`, each inner is `AND`. */
export type Expression = Term[][];
export declare function parseExpression(input: string): Expression;
/**
 * True when the row satisfies at least one `OR` group in full — every term
 * of it, except that the naming terms on one field (see {@link names}) count
 * as satisfied when any one of them is. A half-typed one among them is
 * satisfied on its own, as it is anywhere, so a set holding one is satisfied
 * whatever the rest say — the same reading a half-typed term gets alone.
 */
export declare function matchesExpression(expression: Expression, row: ShellRow, entity: EntitySchema): boolean;
/**
 * One term, written back as the source that parses to it.
 *
 * Normalized rather than original: the field is lowercased and the value
 * re-quoted only where it has to be, since the parse keeps neither the case
 * nor the spacing it was written with. `parseExpression(formatTerm(t))` is `t`.
 */
export declare function formatTerm(term: Term): string;
/**
 * The term turned round: the one that keeps exactly the rows this one drops.
 * Twice over is the term it started as.
 */
export declare function negateTerm<T extends Term>(term: T): T;
/**
 * A whole expression, written back as source: terms spaced within a group,
 * `OR` between them. A group with nothing left in it is dropped — an
 * alternative with no terms would match every row, and so would the expression.
 */
export declare function formatExpression(expression: Expression): string;
/**
 * The expression with one term taken out of it, addressed by which `OR` group
 * it is in and where in that group it sits — what removing one part of a query
 * means when the parts are what is on screen.
 */
export declare function withoutTerm(expression: Expression, group: number, index: number): Expression;
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
    parts: FieldTerm[];
    text: string;
}
export declare function splitExpression(input: string): ExpressionSplit;
/**
 * The two halves written back as one expression, the parts first — the field
 * read left to right, since that is the order it shows them in.
 */
export declare function joinExpression(parts: FieldTerm[], text: string): string;
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
export declare function sameTerm(one: Term, other: Term): boolean;
/**
 * Whether two terms are about the same thing, whichever way round each is
 * said — `set:a` and `-set:a` are one constraint with two signs, and a query
 * holding both of them holds nothing.
 */
export declare function oppositeTerm(one: Term, other: Term): boolean;
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
export declare function andExpression(one: string, other: string): string;
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
export declare function refineExpression(expr: string, typed: string): string;
