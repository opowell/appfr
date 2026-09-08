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
    error: ShallowRef<unknown>;
    refresh(): void;
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
