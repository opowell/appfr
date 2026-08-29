import type { EntitySchema, FacetState, ShellRow, SyncDataSource } from '../types';
/** Tile backgrounds for the grid view, cycled by row hash. */
export declare const MOCK_TINTS: readonly ["oklch(0.36 0.06 240)", "oklch(0.34 0.07 290)", "oklch(0.36 0.06 160)", "oklch(0.38 0.06 80)", "oklch(0.35 0.07 30)", "oklch(0.34 0.05 200)"];
export interface MockSourceOptions {
    /** Rows generated per entity. Defaults to 48. */
    population?: number;
    /** Salt for the generator, so two sources can differ deterministically. */
    seed?: string;
    /** Most recent `updatedAt` in the generated set. Defaults to 2026-08-25. */
    now?: Date;
}
/**
 * Expands an entity's sample pairs into a stable population. Repeats beyond the
 * sample length are suffixed as revisions, which keeps every `primary` unique
 * without inventing vocabulary the schema did not supply.
 */
export declare function generateRows(entity: EntitySchema, options?: MockSourceOptions): ShellRow[];
/** Applies the facet state to a row. Neutral facets never exclude anything. */
export declare function matchesFacets(row: ShellRow, facets: FacetState): boolean;
/**
 * An in-memory {@link SyncDataSource} over generated rows. It filters, sorts and
 * pages for real, so stories and tests exercise the same code paths a live
 * backend would.
 */
export declare function createMockDataSource(options?: MockSourceOptions): SyncDataSource;
