import type { EntitySchema, ShellQuery } from '../types';
/** One removable term in the header's query summary. */
export interface SummaryTerm {
    /** Stable identity for list rendering and for the remove handler. */
    id: string;
    label: string;
    /** The facet this term came from, or `'entity'` for the entity filter. */
    facetKey: string;
    /** For chips terms, the single option this term stands for. */
    option?: string;
}
/** The term id the entity filter uses, so it can be lifted like any other. */
export declare const ENTITY_TERM = "entity";
/**
 * The terms currently narrowing the corpus, in schema order.
 *
 * Choosing an entity is the first of them: logs and settings are records like
 * any other, so what excludes them is an ordinary, liftable filter rather than
 * a mode the shell is in.
 */
export declare function summaryTerms(query: ShellQuery, entity: EntitySchema | null): SummaryTerm[];
/**
 * The one-line summary shown in the header bar. An untouched query states what
 * it is showing and how, so the header is never blank and never implies a
 * filter that is not there.
 */
export declare function summarizeQuery(query: ShellQuery, entity: EntitySchema | null): string;
