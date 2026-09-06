import type { EntitySchema, ShellRow } from '../types';
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
export type Comparator = ':' | '=' | '>' | '<' | '>=' | '<=';
export interface FieldTerm {
    kind: 'field';
    field: string;
    comparator: Comparator;
    value: string;
}
export interface TextTerm {
    kind: 'text';
    value: string;
}
export type Term = FieldTerm | TextTerm;
/** Disjunction of conjunctions: the outer array is `OR`, each inner is `AND`. */
export type Expression = Term[][];
export declare function parseExpression(input: string): Expression;
/** True when the row satisfies at least one `OR` group in full. */
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
