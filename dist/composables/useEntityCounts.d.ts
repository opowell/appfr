import type { ComputedRef, Ref, ShallowRef } from 'vue';
import type { DataSource, DomainSchema, EntitySchema, ShellQuery } from '../types';
/** How many rows of one entity currently match, for the type picker. */
export interface EntityCount {
    /** Rows of this entity matching the query, once resolved. */
    total: number;
    /** Still being counted — {@link total} may yet grow. */
    pending: boolean;
}
export interface UseEntityCountsOptions {
    source: ComputedRef<DataSource>;
    schema: ComputedRef<DomainSchema>;
    query: ComputedRef<ShellQuery>;
    entities: ComputedRef<EntitySchema[]>;
    /** An expression every count is read inside — see {@link UseResultsOptions.within}. */
    within?: ComputedRef<string>;
}
export interface EntityCountsState {
    /** Keyed by {@link EntitySchema.key}. Empty until {@link refresh} has run. */
    counts: ShallowRef<Map<string, EntityCount>>;
    /**
     * Whether the query behind the last {@link refresh} was pristine — a
     * caller then has nothing truer to show than each entity's own population.
     */
    pristine: Ref<boolean>;
    /** Counts every entity against the query as it stands right now. */
    refresh(): void;
}
/**
 * Counts each entity separately against the current query, for the type
 * picker's dropdown — the same per-entity fan-out {@link useEntityPreviews}
 * runs for the home screen's cards, but asking each entity for a total alone
 * (`limit: 0`) rather than a page of rows to show.
 *
 * Left for the caller to trigger rather than watched: a scan of a large entity
 * is real work, and the picker is open far less often than the query changes
 * underneath it. {@link refresh} is meant to be called as the picker opens.
 */
export declare function useEntityCounts(options: UseEntityCountsOptions): EntityCountsState;
