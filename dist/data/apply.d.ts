import type { EntitySchema, QueryRequest, QueryResult, ShellRow } from '../types';
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
 * the schema's order. The facets are terms of the expression. The schema goes to {@link matchesExpression} as well, which
 * is what lets {@link DomainSchema.strictScopes} reach a source built on this
 * — and changes nothing for a schema that does not set it.
 */
export declare function applyQuery({ query, schema, entity, limit, offset }: QueryRequest, rowsOf: (entity: EntitySchema) => readonly ShellRow[], rules: ApplyRules): QueryResult;
