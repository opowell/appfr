import type { EntitySchema, FacetState, QueryRequest, QueryResult, ShellRow } from '../types';
/**
 * A query, applied to rows that are already in memory: the facets, the
 * expression, the sort and the page — the whole of what a source does, for a
 * source whose rows are an array.
 *
 * Two sources are made of it. The mock generates its rows and the memory
 * source is handed them, and the two differ in exactly the two places
 * {@link ApplyRules} names; everything else is this one loop, so the
 * expression language and the facet semantics behave in either exactly as
 * they do everywhere else.
 */
/** Applies the facet state to a row. Neutral facets never exclude anything. */
export declare function matchesFacets(row: ShellRow, facets: FacetState): boolean;
/** Where the two in-memory sources part ways. */
export interface ApplyRules {
    /**
     * Holds rows with no date under a date sort out of the sort and appends
     * them, so they stay at the bottom in *both* directions. Reversing for
     * `asc` would otherwise float every "never crawled" host to the top, where
     * it pushes the actual answers off the first screen.
     */
    undatedLast: boolean;
    /** Reads a `limit` of 0 as no limit, the way the shell's own sink does. */
    zeroIsAll: boolean;
}
/**
 * The one page of `rowsOf`'s rows the request asks for, with the count of
 * everything that matched.
 *
 * No entity selected means the whole corpus: every entity of the schema, in
 * the schema's order. Facets belong to an entity, so they only apply when one
 * is selected. The schema goes to {@link matchesExpression} as well, which
 * is what lets {@link DomainSchema.strictScopes} reach a source built on this
 * — and changes nothing for a schema that does not set it.
 */
export declare function applyQuery({ query, schema, entity, limit, offset }: QueryRequest, rowsOf: (entity: EntitySchema) => readonly ShellRow[], rules: ApplyRules): QueryResult;
