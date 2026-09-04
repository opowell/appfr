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
