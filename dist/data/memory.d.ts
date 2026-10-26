import type { QueryRequest, ShellRow, SyncDataSource } from '../types';
/**
 * A {@link SyncDataSource} over rows that are already in memory.
 *
 * For a host whose API has no filtering of its own — an endpoint that returns
 * the whole list — so the shell's query has to be applied in the page. That
 * makes the source **synchronous**, which the shell applies in the same tick:
 * rows are on screen from the first render, and the pending state stays
 * reserved for the fetch rather than the filter.
 *
 * The predicates and the comparator are the mock source's own, so the
 * expression language, the facets and the sorts behave exactly as they do
 * there. Two things differ, both because these rows are real rather than
 * generated:
 *
 * - **A row with no date under a date sort goes last, in both directions.** A
 *   column of `kind: 'date'` or `role: 'updated'` whose value is empty or does
 *   not parse says nothing about where the row belongs — never crawled, never
 *   run — so those rows are held out of the sort and appended. Reversing for
 *   `asc` would otherwise float every one of them to the top, where they push
 *   the actual answers off the first screen. Generated rows always have a
 *   date, so the mock never needed to.
 * - **A `limit` of 0 is no limit**, the way the shell's own sink reads it,
 *   which is how a caller asks for every row a query matches — see
 *   {@link queryAll}.
 *
 * The rows are grouped by `entityKey` once, here, so a row whose type the
 * schema does not declare is never returned. A new array of rows is a new
 * source: hand the shell a new one when the data changes — a `computed` over
 * it does that — and the new identity is what re-runs the query.
 */
export declare function createMemoryDataSource(rows: readonly ShellRow[]): SyncDataSource;
/** A request for every row, which is what {@link queryAll} takes: no page to ask for. */
export type QueryAllRequest = Omit<QueryRequest, 'limit' | 'offset'>;
/**
 * Every row a query matches, in the query's order — not a page of them.
 *
 * What acting on "everything this query found" needs: running every spec a
 * narrowed list holds, exporting a filtered set, checking whether the ticked
 * rows are the whole of the match. `request` is the one the shell would make,
 * less the page.
 *
 * It asks for a limit no corpus reaches rather than for 0. Reading 0 as "no
 * limit" is a convention — the memory source and the shell's own sink keep
 * it, but the mock source reads it as a page of nothing, as a source handing
 * `limit` straight to an `OFFSET … LIMIT` would — while a page longer than the
 * rows there are is every row to any source that pages by slicing.
 *
 * Synchronous sources only, since that is what can be read in one call. A
 * remote source is better asked by its own API than for a page the size of
 * `Number.MAX_SAFE_INTEGER`.
 */
export declare function queryAll(source: SyncDataSource, request: QueryAllRequest): ShellRow[];
