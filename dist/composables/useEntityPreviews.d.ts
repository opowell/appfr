import type { ComputedRef, Ref, ShallowRef } from 'vue';
import type { DataSource, DomainSchema, EntitySchema, ShellQuery } from '../types';
import type { PresentedRow } from './usePresentedRows';
/** One entity type, summarised: what it is, how many, and its latest few. */
export interface EntityPreview {
    entity: EntitySchema;
    /** The top rows for this entity under the current sort. */
    rows: PresentedRow[];
    /** Rows of this entity matching the query. */
    total: number;
    /**
     * The count to show. An untouched query reports the population the schema
     * publishes; a narrowed one reports how many actually matched.
     */
    count: string;
    /**
     * Whether the whole of what this type matched is the one record the query
     * already names — see {@link namesItsOnlyRow}. Such a card says nothing the
     * header has not said, so the home screen leaves it off.
     */
    pinned: boolean;
}
export interface UseEntityPreviewsOptions {
    source: ComputedRef<DataSource>;
    schema: ComputedRef<DomainSchema>;
    query: ComputedRef<ShellQuery>;
    entities: ComputedRef<EntitySchema[]>;
    /** Rows to show inside each type's card. */
    limit: ComputedRef<number>;
    /**
     * An expression every card is read inside — see {@link UseResultsOptions.within}.
     * A card's count is then how many of its type are in *that* scope, which is
     * why a scoped shell never reports the population the schema publishes.
     */
    within?: ComputedRef<string>;
    isPinned: (id: string) => boolean;
}
export interface EntityPreviewsState {
    previews: ShallowRef<EntityPreview[]>;
    pending: Ref<boolean>;
    error: ShallowRef<unknown>;
    refresh(): void;
}
/**
 * Queries each entity separately so the home screen can show a card per type.
 *
 * One query across everything would not do: sorted globally, a quiet entity
 * would contribute no rows at all and its card would come up empty. Each type
 * gets its own top-N instead. The expression, sort and direction carry over —
 * facets do not, since those belong to a single entity.
 */
export declare function useEntityPreviews(options: UseEntityPreviewsOptions): EntityPreviewsState;
