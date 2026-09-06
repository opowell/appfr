import type { DomainSchema, EntitySchema, ShellQuery } from '../types';
/** One removable term in the header's query summary. */
export interface SummaryTerm {
    /** Stable identity for list rendering and for the remove handler. */
    id: string;
    label: string;
    /** The facet this term came from, or `'entity'` for the entity filter. */
    facetKey: string;
    /** For chips terms, the single option this term stands for. */
    option?: string;
    /**
     * For expression terms, where in the expression the term sits: which `OR`
     * group, and where in that group. That pair is its address — the text of a
     * term is not unique, and two identical words in different alternatives are
     * two separate parts.
     */
    group?: number;
    index?: number;
    /**
     * For an expression term written as `field:value`, the two halves of it.
     *
     * The label is what the term *says*; these are what it names, which is what
     * reading a term back needs — a value that is a record's id says nothing on
     * its own, and only the field it sits under says which type it belongs to.
     */
    field?: string;
    value?: string;
}
/** The term id the entity filter uses, so it can be lifted like any other. */
export declare const ENTITY_TERM = "entity";
/** The facet key the expression's own parts carry. */
export declare const EXPRESSION_TERM = "expr";
/**
 * The terms currently narrowing the corpus, in schema order.
 *
 * Choosing an entity is the first of them: logs and settings are records like
 * any other, so what excludes them is an ordinary, liftable filter rather than
 * a mode the shell is in.
 */
export declare function summaryTerms(query: ShellQuery, entity: EntitySchema | null): SummaryTerm[];
/**
 * The query as one line of prose. An untouched query still states what it is
 * showing and how, so nothing that says this is ever blank and none of it
 * implies a filter that is not there.
 *
 * The header says the scope with a control of its own now, so the bar shows
 * the tail of this beside it and keeps the whole sentence as its title. Said
 * in full where there is room for a sentence: under an empty result.
 */
export declare function summarizeQuery(query: ShellQuery, entity: EntitySchema | null, 
/** For the sort's own name, which on the home screen the schema's columns hold. */
schema?: DomainSchema | null): string;
