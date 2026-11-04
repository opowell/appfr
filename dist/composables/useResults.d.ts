import type { ComputedRef, Ref, ShallowRef } from 'vue';
import type { DataSource, DomainSchema, EntitySchema, ShellQuery, ShellRow } from '../types';
export interface UseResultsOptions {
    source: ComputedRef<DataSource>;
    query: ComputedRef<ShellQuery>;
    schema: ComputedRef<DomainSchema>;
    /** `null` when the query spans every entity. */
    entity: ComputedRef<EntitySchema | null>;
    /** Rows per page — the most the source is asked for at once. */
    limit: ComputedRef<number>;
    /**
     * An expression the query is read *inside* — the shell's own scope, which
     * the host holds rather than the URL. It is ANDed on to whatever the query
     * asks, so the source is handed one expression and never needs to know that
     * part of it was not typed.
     */
    within?: ComputedRef<string>;
}
/** How far from its place {@link ResultsState.locate} looks for a row. */
export declare const LOCATE_REACH = 50;
export interface ResultsState {
    rows: ShallowRef<ShellRow[]>;
    /** Rows matching the query, of which the current page is one `limit`. */
    total: Ref<number>;
    /** Rows skipped to reach the current page — where its first row sits. */
    offset: ComputedRef<number>;
    /** How many pages of `limit` the total comes to. Never fewer than one. */
    pageCount: ComputedRef<number>;
    /**
     * True while the source is still working: an async `query` in flight, or a
     * `stream` that has not closed. Never true for a sync source.
     */
    pending: Ref<boolean>;
    /**
     * True while the total itself is still being worked out, which is what a
     * `~` on the pager says. Not while another page of a query already counted
     * is asked for: the rows are pending, but how many match is known, and the
     * total stays at that until the source says otherwise.
     */
    counting: Ref<boolean>;
    error: ShallowRef<unknown>;
    refresh(): void;
    /**
     * Where a row now sits in the results, counted from 1, looking
     * {@link LOCATE_REACH} rows either side of `place`: one request, of a size
     * that does not grow with the results. Null where it is not among them,
     * which is not to say it is nowhere — or where the source could not say.
     */
    locate(id: string, place: number): Promise<number | null>;
}
/**
 * Runs the current query against the data source.
 *
 * A synchronous source is applied during the same tick, so the first render
 * already has rows — which keeps SSR output complete and lets component tests
 * assert without awaiting. Async sources are sequenced by a token so a slow
 * response can never overwrite a newer one, and a streaming source is held to
 * the same rule: its sink stops accepting the moment the query moves on.
 */
export declare function useResults(options: UseResultsOptions): ResultsState;
