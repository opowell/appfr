import type {
  ColumnAlign,
  ColumnDef,
  DomainSchema,
  EntityLabels,
  EntitySchema,
  ShellRow,
} from '../types'
import { GENERIC_LABELS } from './schema'
import { formatDate, formatMetric } from '../data/format'

/**
 * What the table shows, as data.
 *
 * The four {@link EntityLabels} name a shape the shell fixed: an identity
 * pair, two metrics, a date and a state. That is the right shape for a card
 * and a tile, which are an identity and a number or two by construction — and
 * the wrong one for a table, where the whole question is which columns and how
 * many.
 *
 * So a table is the {@link ColumnDef}s it was given and nothing besides. The
 * shell reads no table out of the labels: which columns a type has is the
 * schema's to say, the way what a drill means is the host's, and a set of
 * columns nobody asked for is the component deciding what the data is.
 * {@link defaultColumns} is here for the schema that wants the familiar eight
 * — as something to ask for, not something to be given.
 */

/** Shown when a column resolves to nothing — absent, rather than empty. */
export const EMPTY_CELL = '—'

/**
 * The familiar eight, built from an entity's four labels — the ordinal, the
 * identity pair, the row's type, the two metrics, the date and the state.
 *
 * Nothing applies this: it is what a schema spreads into its own `columns`
 * when that set is the table it wanted, whole or as a starting point.
 *
 * ```ts
 * columns: [...defaultColumns(entity), { key: 'owner', label: 'Owner' }]
 * ```
 *
 * `entity` is null for the mixed result set, where the labels are generic and
 * the row's own type earns a column of its own.
 */
export function defaultColumns(entity: EntitySchema | null): ColumnDef[] {
  const labels: EntityLabels = entity?.labels ?? GENERIC_LABELS
  return [
    { key: 'ordinal', kind: 'ordinal', label: '#', width: '52px' },
    {
      key: 'primary',
      label: labels.primary,
      sort: 'name',
      activate: true,
      scope: true,
      truncate: true,
      class: 'dc-table__primary',
    },
    { key: 'secondary', label: labels.secondary, mono: true, muted: true, truncate: true },
    {
      key: 'entityLabel',
      label: 'Entity',
      when: 'everything',
      width: '130px',
      mono: true,
      truncate: true,
      hideBelow: 900,
      class: 'dc-table__entity',
    },
    {
      key: 'metric1',
      kind: 'number',
      label: labels.metric1,
      sort: 'metric1',
      width: '110px',
      hideBelow: 760,
      ...(entity?.drills?.metric1 ? { drill: entity.drills.metric1 } : {}),
    },
    {
      key: 'metric2',
      kind: 'number',
      label: labels.metric2,
      sort: 'metric2',
      width: '110px',
      hideBelow: 760,
      ...(entity?.drills?.metric2 ? { drill: entity.drills.metric2 } : {}),
    },
    {
      key: 'updatedAt',
      kind: 'date',
      label: 'Updated',
      sort: 'updated',
      width: '120px',
      mono: true,
      muted: true,
      hideBelow: 620,
    },
    { key: 'status', kind: 'status', label: 'State', width: '110px' },
  ]
}

/**
 * The columns for the current scope: an entity's own where one is filtered to,
 * the schema's across every entity, and none at all where neither declared
 * any. Columns are then dropped by {@link ColumnDef.when}, which is how one
 * set can carry a column — the row's type — that only means anything in the
 * mixed result set.
 */
export function columnsFor(
  schema: DomainSchema | null,
  entity: EntitySchema | null,
): ColumnDef[] {
  const declared = (entity ? entity.columns : schema?.columns) ?? []
  const scope = entity ? 'scoped' : 'everything'
  return declared.filter(
    (column) => (column.when ?? 'always') === 'always' || column.when === scope,
  )
}

/**
 * What identifies a column, for a schema that did not say.
 *
 * A key is what a rendered column is tracked by, so it has to be there and it
 * has to be distinct — two columns keyed the same are two columns the renderer
 * cannot tell apart, and a column keyed `undefined` is every column at once.
 * A schema naming its field or computing its value has already said enough for
 * one to be worked out, so the key is optional and this is the chain: the key,
 * then the field, then the label, and finally the position, which is always
 * there.
 */
export function columnKey(column: ColumnDef, index: number): string {
  const named = column.key ?? column.field ?? column.label
  return named?.trim() ? named.trim() : `column-${index}`
}

/**
 * What identifies a row, for a source that did not say.
 *
 * The same argument as {@link columnKey}, one level up: rows keyed alike are
 * rows the renderer reuses for each other — a checkbox ticked against the row
 * that replaces it, an open row that stays open under a different record. An
 * id is what a source should return, and where one is missing the row's place
 * in the result stands in, which is distinct for as long as the page is.
 */
export function rowKey(row: ShellRow, index: number): string {
  return row.id?.trim() ? row.id : `${row.entityKey || 'row'}-${index}`
}

/**
 * The raw value behind a cell.
 *
 * A column that computes its own beats everything; otherwise the field named,
 * or the column's key, is looked for on the row and then among its facets. The
 * facets are what makes a column of anything possible without a change to
 * {@link ShellRow}: a source already returns whatever it likes there, and this
 * is the lookup that puts it on screen.
 */
export function cellValue(column: ColumnDef, row: ShellRow): unknown {
  if (column.value) return column.value(row)
  const field = column.field ?? column.key
  // A column that names no field and computes nothing holds no value: it draws
  // the row's position, or a component of the host's.
  if (field === undefined) return undefined
  if (field in row) return (row as unknown as Record<string, unknown>)[field]
  return row.facets?.[field]
}

/** How a value reads with nothing said about it — the kind's own formatting. */
export function defaultCellText(value: unknown, kind: ColumnDef['kind']): string {
  if (value === null || value === undefined || value === '') return EMPTY_CELL
  if (kind === 'number') {
    const numeric = typeof value === 'number' ? value : Number(value)
    return Number.isFinite(numeric) ? formatMetric(numeric) : String(value)
  }
  if (kind === 'date') return formatDate(String(value))
  // A row may hold several values of one chips facet — see `ChipsFacet.multiple`.
  if (Array.isArray(value)) return value.length ? value.join(', ') : EMPTY_CELL
  return String(value)
}

/** What the cell says: the column's own formatting, or the kind's. */
export function cellText(column: ColumnDef, row: ShellRow): string {
  const value = cellValue(column, row)
  if (column.format) return column.format(value, row)
  return defaultCellText(value, column.kind)
}

/** Numbers line up on the right, and everything else reads from the left. */
export function columnAlign(column: ColumnDef): ColumnAlign {
  if (column.align) return column.align
  return column.kind === 'number' || column.kind === 'ordinal' ? 'right' : 'left'
}

/**
 * The class the table styles a column by. Derived from the kind so a host's
 * own number column is drawn like the shell's, and so the widths and the
 * stand-down rules have something to hang on.
 */
const KIND_CLASS: Partial<Record<NonNullable<ColumnDef['kind']>, string>> = {
  ordinal: 'dc-table__num',
  number: 'dc-table__number',
  date: 'dc-table__date',
  status: 'dc-table__state',
}

export function columnClass(column: ColumnDef): string {
  return [KIND_CLASS[column.kind ?? 'text'], column.class].filter(Boolean).join(' ')
}

/**
 * Whether the cell is truncated to one line. On for the text kinds, which is
 * what keeps every row the same depth however long a value is; off for the
 * marks, which have a size of their own.
 */
export function columnTruncates(column: ColumnDef): boolean {
  if (column.truncate !== undefined) return column.truncate
  const kind = column.kind ?? 'text'
  return kind === 'text' || kind === 'number' || kind === 'date'
}
