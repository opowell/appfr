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
 * A bare word matches the primary or secondary field. `field:value` and
 * `field<op>number` match a named field or facet. Anything unresolvable is
 * ignored rather than treated as a mismatch, so a half-typed expression keeps
 * showing results instead of emptying the screen.
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
