import type { ChipsFacet, FacetDef, RangeFacet, ShellRow, ToggleFacet } from '../types';
/**
 * Facets read off the rows they filter.
 *
 * A schema built from live data cannot carry its facets as constants: a chips
 * facet has to offer the values that are actually in the data, and a range
 * has to know how far the data reaches. These build them from the rows — a
 * host's own, before they reach a source — so the query panel offers what
 * there is to choose between and nothing else.
 *
 * Pure, and none of it is a default: the shell builds no facet of its own, and
 * a schema still says which of these it has.
 */
/** Anything with the bag of fields a row has — a {@link ShellRow}, or a row on its way to being one. */
type RowFields = Pick<ShellRow, 'fields'>;
/**
 * The next 1, 2 or 5 step at or above `value` — 20 rather than 17, 500 rather
 * than 312. `0` for nothing, or less.
 *
 * Partly because a range control wants a bound that reads as a number, and
 * partly because an exact ceiling makes the schema churn: a run in flight
 * ticks its duration every second, and the shell would rebuild its query
 * panel with it. A rounded one moves only when the data crosses a step.
 */
export declare function niceMax(value: number): number;
/**
 * A chips facet offering every value `key` holds across the rows, A to Z.
 *
 * `multiple` says a row may hold several of these values and belongs under
 * each of them — a spec tagged twice, a tenant in two regions — which is
 * also what makes every member of a row's list an option here.
 */
export declare function chipsFrom(rows: readonly RowFields[], key: string, label: string, options?: {
    multiple?: boolean;
}): ChipsFacet;
/**
 * A range facet from `0` to the largest number `key` holds across the rows,
 * rounded up by {@link niceMax}. Only numbers count: a count held as a string
 * is text to this, as it is to a range control.
 */
export declare function rangeFrom(rows: readonly RowFields[], key: string, label: string): RangeFacet;
/**
 * A toggle facet: `key` is `true` on the rows it keeps, and `text` says which
 * those are — `'Only cases some run has failed'`.
 */
export declare function toggleFacet(key: string, label: string, text: string): ToggleFacet;
/**
 * The facets worth offering: a chips facet once there is more than one value
 * to choose between, and a range once the data spans one. Otherwise the query
 * panel fills with controls that cannot change the result — one chip that is
 * every row, a slider from 0 to 0. Toggles are kept, since whether any row
 * holds the flag is not something the facet knows.
 *
 * In the order given, so a schema's facets keep theirs.
 */
export declare function usefulFacets<T extends FacetDef>(facets: readonly T[]): T[];
export {};
