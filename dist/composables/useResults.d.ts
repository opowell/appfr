import type { ComputedRef, Ref, ShallowRef } from 'vue';
import type { DataSource, DomainSchema, EntitySchema, ShellQuery, ShellRow } from '../types';
export interface UseResultsOptions {
    source: ComputedRef<DataSource>;
    query: ComputedRef<ShellQuery>;
    schema: ComputedRef<DomainSchema>;
    /** `null` when the query spans every entity. */
    entity: ComputedRef<EntitySchema | null>;
    limit: ComputedRef<number>;
}
export interface ResultsState {
    rows: ShallowRef<ShellRow[]>;
    total: Ref<number>;
    /** True while an async source is in flight. Never true for a sync source. */
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
 * response can never overwrite a newer one.
 */
export declare function useResults(options: UseResultsOptions): ResultsState;
