import type { ColumnDef, EntitySchema, ShellRow } from '../types'
import type { FieldTerm } from '../data/expression'
import { cellValue } from './columns'

/**
 * What pressing a cell's value narrows the list to.
 *
 * A table answers "which rows are like this one?" as often as "what is this
 * row?" — every host at 0% recorded, every deployed host, everything built
 * from `dO` — and the query can already say each of those. So the value says
 * it: a press adds the term that keeps the rows sharing it.
 *
 * - **A number** keeps its end of the range: `recorded<=0` for 0%, where the
 *   range runs from 0 to 1, and `recorded>=0.99` for 99%. The range is the
 *   column's facet's where it has one, and the rows on screen otherwise.
 * - **Any other value** keeps that value, whole: `container=dO`,
 *   `source=news.ycombinator.com`.
 * - **A flag** keeps the rows it is set on: `deployed:true`, one term per word
 *   of a {@link ColumnDef.flags} column, each word its own press.
 *
 * The identity is not one of these: it says which row this is, not which rows
 * are like it, so a press on it goes to the record. Nor is a date, which is
 * rarely shared, or a picture, which has no term a press could mean. Pure, so
 * what each cell offers is tested without a browser.
 */

/** One press in a cell: what it is on, and the term it adds. */
export interface CellNarrowing {
  /** The word it is on, for a cell of several; null for the cell's text as a whole. */
  label: string | null
  term: FieldTerm
}

/** The lowest and highest a number column runs to. */
export interface NumberRange {
  min: number
  max: number
}

/** Kinds whose values no term says: a position, a picture, a host's own cell, a date. */
const UNSAID = new Set(['ordinal', 'image', 'component', 'date'])

/** How many decimals a bound is written to — rounded outwards, so the row pressed is still in. */
const BOUND_DECIMALS = 4

/** The field a column's terms are written on, lowercased as the parse lowercases every field. */
function fieldOf(column: ColumnDef): string | undefined {
  return (column.field ?? column.key)?.toLowerCase()
}

/**
 * Whether a column's cells are offered as presses at all. Not where the
 * column says not, nor where the cell names the row or is pressed for something
 * else already.
 */
export function columnNarrows(column: ColumnDef): boolean {
  if (column.narrow === false || column.role === 'identity') return false
  if (column.activate || column.click || column.drill) return false
  return !UNSAID.has(column.kind ?? 'text') && fieldOf(column) !== undefined
}

/** `value`, rounded to {@link BOUND_DECIMALS} away from the rows it bounds. */
function bound(value: number, up: boolean): number {
  if (Number.isInteger(value)) return value
  const scale = 10 ** BOUND_DECIMALS
  // The nudge keeps a value already on the grid there, against a product like 0.29 * 1e4 = 2899.9999…
  const scaled = up ? Math.ceil(value * scale - 1e-6) : Math.floor(value * scale + 1e-6)
  return scaled / scale
}

/**
 * The range a number column runs over `rows` — what {@link cellNarrowings}
 * measures a value against where the column has no facet. Null where no row
 * holds a number.
 */
export function numberRange(column: ColumnDef, rows: readonly ShellRow[]): NumberRange | null {
  let min = Infinity
  let max = -Infinity
  for (const row of rows) {
    const value = cellValue(column, row)
    if (typeof value !== 'number' || !Number.isFinite(value)) continue
    if (value < min) min = value
    if (value > max) max = value
  }
  return min <= max ? { min, max } : null
}

/**
 * The presses a cell offers: none, one for the whole of it, or one per word.
 * `range` is the column's over the rows on screen — see {@link numberRange} —
 * and only read for a number whose column has no range facet.
 */
export function cellNarrowings(
  column: ColumnDef,
  row: ShellRow,
  entity: EntitySchema | null,
  range: NumberRange | null = null,
): CellNarrowing[] {
  if (!columnNarrows(column)) return []
  const field = fieldOf(column)!

  if (column.flags) {
    return Object.entries(column.flags)
      .filter(([flag]) => row.fields[flag] === true)
      .map(([flag, name]) => ({
        label: name,
        term: { kind: 'field', field: flag.toLowerCase(), comparator: ':', value: 'true' },
      }))
  }

  const value = cellValue(column, row)
  const facet = entity?.facets.find((candidate) => candidate.key.toLowerCase() === field)

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return []
    const spans = facet?.kind === 'range' ? { min: facet.min, max: facet.max } : range
    // Nearer the bottom keeps the bottom; a tie, and a range of one value, too.
    const low = !spans || value - spans.min <= spans.max - value
    return [{
      label: null,
      term: { kind: 'field', field, comparator: low ? '<=' : '>=', value: String(bound(value, low)) },
    }]
  }

  const values = (Array.isArray(value) ? value : [value]).filter(
    (entry): entry is string => typeof entry === 'string' && entry !== '',
  )
  return values.map((entry) => ({
    label: Array.isArray(value) ? entry : null,
    term: { kind: 'field', field, comparator: '=', value: entry },
  }))
}
