import type { ColumnDef, ShellRow } from '../types'
import { formatBytes, formatDuration, formatElapsed, formatPercent } from '../data/format'
import { EMPTY_CELL } from './columns'

/**
 * Columns that most types have, as factories.
 *
 * The shell still invents no column: a type that declares none has nothing to
 * draw, and nothing here is a set it falls back on. These are for a host
 * writing several types' columns, so that one type's table does not disagree
 * with the card beside it — the same identity, the same date, the same state
 * — and so the field names they read are said once.
 *
 * Each reads the field names the fixtures and the mock use — `primary`,
 * `secondary`, `metric1`, `status`, `tint` — and takes a `Partial<ColumnDef>`
 * last, spread over its defaults, for whatever this type says differently: a
 * `field` of its own, a `drill`, a width. Each call is a fresh object, so a
 * set built from them can be changed without changing another's.
 */

type Over = Partial<ColumnDef>

/** The row's place in the result, which is not a field on it. */
export function ordinalColumn(over: Over = {}): ColumnDef {
  return { key: 'ordinal', kind: 'ordinal', label: '#', width: '52px', ...over }
}

/**
 * The record's state, as the pill. Usually last, because it is the last thing
 * a row is read for and the first thing it is scanned by.
 */
export function stateColumn(over: Over = {}): ColumnDef {
  return { key: 'status', role: 'state', kind: 'status', label: 'State', width: '104px', ...over }
}

/**
 * The grid tile's background. Declared but never drawn — the table drops a
 * `tint`, a background not being a value — so that the schema names every
 * field a row carries in one place. `tintFor(id)` is a colour to put in it.
 */
export function tintColumn(over: Over = {}): ColumnDef {
  return { key: 'tint', role: 'tint', ...over }
}

/**
 * What the record is *of*: beside the name on a card, behind the caption on
 * a tile, and — unlike `tint` — a cell of its own in the table too, a picture
 * being a value the row holds. No label, because a column of pictures says
 * what it is. The `height` is also what tells the table its rows are taller
 * than a line, so the long names beside it wrap rather than stop.
 */
export function pictureColumn(over: Over = {}): ColumnDef {
  return { key: 'picture', role: 'image', kind: 'image', width: '56px', height: '40px', ...over }
}

/**
 * What the record is called: it opens the record when pressed, and sorts by
 * `name`, the sort a reader asks for by that word.
 *
 * Not narrowable unless said — `{ scope: true }` puts the → beside it, which
 * only means something where the type declares an `EntitySchema.scope`. The
 * mixed set asks for it anyway where any type has one: which rows can be
 * narrowed to is decided per row, by the type the row belongs to.
 */
export function identityColumn(label: string, over: Over = {}): ColumnDef {
  return {
    key: 'primary',
    role: 'identity',
    label,
    sort: 'name',
    activate: true,
    truncate: true,
    ...over,
  }
}

/** The reference under the name — a path, a host, a part number. */
export function referenceColumn(label: string, over: Over = {}): ColumnDef {
  return {
    key: 'secondary',
    role: 'reference',
    label,
    mono: true,
    muted: true,
    truncate: true,
    ...over,
  }
}

/**
 * One of the numbers a card and a list row show beside the name, sorted by
 * its own key. A `drill` in `over` is what makes it a link to the records it
 * counts; a number counting something that is no type of the schema's stays
 * the number it was.
 */
export function metricColumn(key: string, label: string, over: Over = {}): ColumnDef {
  return {
    key,
    role: 'metric',
    kind: 'number',
    label,
    sort: key,
    width: '92px',
    hideBelow: 760,
    ...over,
  }
}

/**
 * A date, sorted by its own key. The one a card shows and every list opens in
 * says `{ role: 'updated', sort: 'updated' }`, the recency sort being the one
 * a URL naming none falls back to.
 */
export function dateColumn(key: string, label: string, over: Over = {}): ColumnDef {
  return { key, kind: 'date', label, sort: key, width: '104px', mono: true, muted: true, ...over }
}

/**
 * Which type a row is. For the mixed set: under one entity every row would
 * answer it the same way, which is a column of one repeated word, and across
 * every type it is the column that says most. Add `{ when: 'everything' }`
 * where one set serves both. Set in the text face: a type's name is a word,
 * not a figure.
 */
export function entityColumn(over: Over = {}): ColumnDef {
  return {
    key: 'entityLabel',
    label: 'Entity',
    width: '130px',
    truncate: true,
    class: 'dc-table__entity',
    ...over,
  }
}

/**
 * A field of this type alone, as a column — under the same key its facet is
 * offered by, so the column and the facet are one name. Among the first to
 * stand down: it is what this type has besides the parts every type has.
 */
export function facetColumn(key: string, label: string, over: Over = {}): ColumnDef {
  return { key, label, truncate: true, hideBelow: 900, ...over }
}

/**
 * The true ones of a row's boolean fields, named and joined.
 *
 * Independent flags as columns would be several columns of yes-or-nothing;
 * as one they are the short line that says what is unusual about the row —
 * `crawled, recorded`, and nothing at all for a row that is neither. `names`
 * maps each field to what to call it, in the order to say them; `key` only
 * identifies the column, since its value is computed.
 */
export function flagColumn(
  key: string,
  label: string,
  names: Record<string, string>,
  over: Over = {},
): ColumnDef {
  return {
    key,
    label,
    value: (row: ShellRow) =>
      Object.entries(names)
        .filter(([field]) => row.fields[field] === true)
        .map(([, name]) => name),
    muted: true,
    truncate: true,
    hideBelow: 1100,
    ...over,
  }
}

/* ---------------------------------------------------------- cell formats */

/*
 * The formatters in `data/format.ts`, as a column's `format`: a cell holds
 * whatever the row holds, so these take anything and say `EMPTY_CELL` for
 * what is no number — the dash every other empty cell draws. A number held as
 * a string counts; `null`, `''` and a boolean do not.
 */

function numberIn(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string' && value.trim() !== '') return Number(value)
  return Number.NaN
}

/** {@link formatBytes}, with nothing at all for a size of `0` — a directory holding nothing. */
export function bytesCell(value: unknown): string {
  const bytes = numberIn(value)
  return Number.isFinite(bytes) && bytes > 0 ? formatBytes(bytes) : EMPTY_CELL
}

/** {@link formatDuration}, from milliseconds. */
export function durationCell(value: unknown): string {
  const ms = numberIn(value)
  return Number.isFinite(ms) && ms > 0 ? formatDuration(ms) : EMPTY_CELL
}

/** {@link formatElapsed}, from seconds. */
export function elapsedCell(value: unknown): string {
  const seconds = numberIn(value)
  return Number.isFinite(seconds) && seconds > 0 ? formatElapsed(seconds) : EMPTY_CELL
}

/**
 * {@link formatPercent}, from a share. A missing share is the dash rather
 * than `0%`: a ratio over nothing is not the same answer as none of it.
 */
export function percentCell(value: unknown): string {
  const share = numberIn(value)
  return Number.isFinite(share) ? formatPercent(share) : EMPTY_CELL
}
