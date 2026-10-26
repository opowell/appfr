import type { ChipsFacet, FacetDef, RangeFacet, ShellRow, ToggleFacet } from '../types'

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
type RowFields = Pick<ShellRow, 'fields'>

/**
 * The next 1, 2 or 5 step at or above `value` — 20 rather than 17, 500 rather
 * than 312. `0` for nothing, or less.
 *
 * Partly because a range control wants a bound that reads as a number, and
 * partly because an exact ceiling makes the schema churn: a run in flight
 * ticks its duration every second, and the shell would rebuild its query
 * panel with it. A rounded one moves only when the data crosses a step.
 */
export function niceMax(value: number): number {
  if (value <= 0) return 0
  const magnitude = 10 ** Math.floor(Math.log10(value))
  for (const step of [1, 2, 5]) {
    if (value <= step * magnitude) return step * magnitude
  }
  return 10 * magnitude
}

/**
 * The distinct values `key` takes across the rows, sorted and de-blanked. A
 * multi-valued field holds a list per row, and every member of it is an
 * option. Anything that is not a string is no option a chip could be.
 */
function optionsOf(rows: readonly RowFields[], key: string): string[] {
  const seen = new Set<string>()
  for (const row of rows) {
    const value = row.fields[key]
    for (const entry of Array.isArray(value) ? value : [value]) {
      if (typeof entry === 'string' && entry) seen.add(entry)
    }
  }
  return [...seen].sort((a, b) => a.localeCompare(b))
}

/** The largest number `key` holds across the rows, and `0` where none holds one. */
function maxOf(rows: readonly RowFields[], key: string): number {
  let max = 0
  for (const row of rows) {
    const value = row.fields[key]
    if (typeof value === 'number' && value > max) max = value
  }
  return max
}

/**
 * A chips facet offering every value `key` holds across the rows, A to Z.
 *
 * `multiple` says a row may hold several of these values and belongs under
 * each of them — a spec tagged twice, a tenant in two regions — which is
 * also what makes every member of a row's list an option here.
 */
export function chipsFrom(
  rows: readonly RowFields[],
  key: string,
  label: string,
  options: { multiple?: boolean } = {},
): ChipsFacet {
  return {
    kind: 'chips',
    key,
    label,
    options: optionsOf(rows, key),
    ...(options.multiple ? { multiple: true } : {}),
  }
}

/**
 * A range facet from `0` to the largest number `key` holds across the rows,
 * rounded up by {@link niceMax}. Only numbers count: a count held as a string
 * is text to this, as it is to a range control.
 */
export function rangeFrom(rows: readonly RowFields[], key: string, label: string): RangeFacet {
  return { kind: 'range', key, label, min: 0, max: niceMax(maxOf(rows, key)) }
}

/**
 * A toggle facet: `key` is `true` on the rows it keeps, and `text` says which
 * those are — `'Only cases some run has failed'`.
 */
export function toggleFacet(key: string, label: string, text: string): ToggleFacet {
  return { kind: 'toggle', key, label, text }
}

/**
 * The facets worth offering: a chips facet once there is more than one value
 * to choose between, and a range once the data spans one. Otherwise the query
 * panel fills with controls that cannot change the result — one chip that is
 * every row, a slider from 0 to 0. Toggles are kept, since whether any row
 * holds the flag is not something the facet knows.
 *
 * In the order given, so a schema's facets keep theirs.
 */
export function usefulFacets<T extends FacetDef>(facets: readonly T[]): T[] {
  return facets.filter((facet) => {
    if (facet.kind === 'chips') return facet.options.length > 1
    if (facet.kind === 'range') return facet.max > 0
    return true
  })
}
