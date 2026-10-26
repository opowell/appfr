import type { EntitySchema, ShellRow, SyncDataSource } from '../types';
export { matchesFacets } from './apply';
/** Tile backgrounds for the grid view, cycled by row hash. */
export declare const MOCK_TINTS: readonly ["oklch(0.36 0.06 240)", "oklch(0.34 0.07 290)", "oklch(0.36 0.06 160)", "oklch(0.38 0.06 80)", "oklch(0.35 0.07 30)", "oklch(0.34 0.05 200)"];
/**
 * A tile colour for a record, the same one every time: one of
 * {@link MOCK_TINTS}, picked by a hash of the id.
 *
 * For a host whose records have no colour of their own but whose grid view
 * wants its tiles told apart — the palette the mock draws with, so a real
 * corpus and a generated one look like the same shell. Stable across runs
 * and across sorts, since it reads nothing but the id; nothing fills it in
 * for you, so a `tint` column holds it only where a source puts it there.
 */
export declare function tintFor(id: string): string;
export interface MockSourceOptions {
    /** Rows generated per entity. Defaults to 48. */
    population?: number;
    /** Salt for the generator, so two sources can differ deterministically. */
    seed?: string;
    /** Most recent `updatedAt` in the generated set. Defaults to 2026-08-25. */
    now?: Date;
    /**
     * Entity keys whose records every generated row belongs to — the `scope`
     * fields the schema declares, as `[field, entityKey]`.
     *
     * Without these a drill would come back empty: nothing on the far side of
     * the number says which record it belongs to. `createMockDataSource` reads
     * them off the schema, so a caller only sets this when generating rows on
     * its own.
     */
    scopes?: Array<readonly [string, string]>;
}
/**
 * Expands an entity's sample pairs into a stable population, filling each row
 * from what the entity's columns say it holds. Repeats beyond the sample
 * length are suffixed as revisions, which keeps every identity unique without
 * inventing vocabulary the schema did not supply.
 */
export declare function generateRows(entity: EntitySchema, options?: MockSourceOptions): ShellRow[];
/**
 * An in-memory {@link SyncDataSource} over generated rows. It filters, sorts and
 * pages for real, so stories and tests exercise the same code paths a live
 * backend would.
 */
export declare function createMockDataSource(options?: MockSourceOptions): SyncDataSource;
