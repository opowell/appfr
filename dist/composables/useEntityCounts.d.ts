import type { ComputedRef, Ref, ShallowRef } from 'vue';
import type { DataSource, DomainSchema, EntitySchema, ShellQuery } from '../types';
/** How many rows of one entity currently match, for the type picker. */
export interface EntityCount {
    /**
     * Rows of this entity matching the query, once resolved — or as many as the
     * source has counted so far, while it is still {@link pending}.
     */
    total: number;
    /** Still being counted — {@link total} may yet grow. */
    pending: boolean;
    /**
     * Whether {@link total} is anything the source said. False while a count is
     * pending and the source has not yet reported any of it — the `0` then is a
     * placeholder, and a very different thing from having counted none.
     */
    counted: boolean;
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
     * Whether the query behind the last {@link refresh} narrowed nothing but
     * the type listed — a caller then has nothing truer to show than each
     * entity's own population. The type in force is no narrowing of the others,
     * and its facets are its own (see {@link refresh}), so only an expression,
     * or a scope the whole shell is read inside, makes a count worth reading.
     */
    pristine: Ref<boolean>;
    /**
     * Counts every entity against the query as it stands right now, calling
     * off whatever the last refresh still had running.
     */
    refresh(): void;
    /**
     * Calls off the counts still running, for a picker that has closed: each
     * request's {@link QueryRequest.signal} is aborted and nothing it answers
     * afterwards lands. What has already landed stays.
     */
    cancel(): void;
}
export declare function useEntityCounts(options: UseEntityCountsOptions): EntityCountsState;
