import type {
  ColumnAlign,
  ColumnDef,
  ColumnRole,
  DomainSchema,
  EntitySchema,
  ShellRow,
} from '../types'
import { formatDate, formatMetric } from '../data/format'

/**
 * What a type *is*, as data.
 *
 * A table is the {@link ColumnDef}s its entity declares — exactly those, in
 * that order, however many. The shell reads none of a row's fields by a name
 * of its own: which fields a record has is the schema's to say, and a set of
 * columns nobody asked for would be the component deciding what the data is.
 *
 * The views that are not tables — a card, a tile, a link row, a preview pane —
 * are an identity, a reference, a number or two and a mark, so they read the
 * columns by {@link ColumnRole} rather than by position. {@link defaultColumns}
 * is here for the schema that wants the familiar set: something to ask for,
 * not something to be given.
 */

/** Shown when a column resolves to nothing — absent, rather than empty. */
export const EMPTY_CELL = '—'

/** Headings for {@link defaultColumns} where the caller names none. */
export const GENERIC_NAMES = {
  identity: 'Item',
  reference: 'Reference',
  metrics: ['Metric', 'Metric 2'],
} as const

/** One metric of the default set: what it is called, and what it counts. */
export interface DefaultMetric {
  label: string
  /** The row field it reads. `metric1`, `metric2`, … in order when unsaid. */
  field?: string
  /**
   * The {@link EntitySchema.key} this number counts, where the schema lists
   * it — what makes the number pressable.
   */
  drill?: string
}

export interface DefaultColumnNames {
  identity: string
  reference: string
  metrics: Array<string | DefaultMetric>
}

/**
 * The familiar set: an ordinal, the identity pair, the row's type, a metric or
 * two, the date, the state, the score and the tint — reading the fields the
 * shell used to fix on the row itself, so a source that already returns those
 * keeps working by moving them into {@link ShellRow.fields}.
 *
 * Nothing applies this. It is what a schema spreads into its own `columns`
 * when that set is what it wanted, whole or as a starting point:
 *
 * ```ts
 * columns: [
 *   ...defaultColumns({ identity: 'Piece', reference: 'Part no.', metrics: ['Colors'] }),
 *   { key: 'owner', label: 'Owner' },
 * ]
 * ```
 *
 * Called with nothing it is the generic set, for the mixed result where no one
 * type's vocabulary applies.
 */
export function defaultColumns(names: Partial<DefaultColumnNames> = {}): ColumnDef[] {
  const identity = names.identity ?? GENERIC_NAMES.identity
  const reference = names.reference ?? GENERIC_NAMES.reference
  const metrics = names.metrics ?? [...GENERIC_NAMES.metrics]

  return [
    { key: 'ordinal', kind: 'ordinal', label: '#', width: '52px' },
    {
      key: 'primary',
      role: 'identity',
      label: identity,
      sort: 'name',
      activate: true,
      scope: true,
      truncate: true,
      class: 'dc-table__primary',
    },
    {
      key: 'secondary',
      role: 'reference',
      label: reference,
      mono: true,
      muted: true,
      truncate: true,
    },
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
    ...metrics.map((metric, index): ColumnDef => {
      const spec: DefaultMetric = typeof metric === 'string' ? { label: metric } : metric
      const field = spec.field ?? `metric${index + 1}`
      return {
        key: field,
        role: 'metric',
        kind: 'number',
        label: spec.label,
        sort: field,
        width: '110px',
        hideBelow: 760,
        ...(spec.drill ? { drill: spec.drill } : {}),
      }
    }),
    {
      key: 'updatedAt',
      role: 'updated',
      kind: 'date',
      label: 'Updated',
      sort: 'updated',
      width: '120px',
      mono: true,
      muted: true,
      hideBelow: 620,
    },
    { key: 'status', role: 'state', kind: 'status', label: 'State', width: '110px' },
    {
      key: 'score',
      role: 'score',
      kind: 'score',
      /* Named as the sort it offers is named, the two being one thing now: a
         heading a schema does not like is a heading it can change. */
      label: 'Score',
      sort: 'score',
      width: '72px',
      hideBelow: 900,
    },
    /* A background is not a value, so the table leaves this one out. It is
       declared so that the schema names every field it has in one place. */
    { key: 'tint', role: 'tint' },
  ]
}

/** The first column playing a part, or undefined where nothing plays it. */
export function roleColumn(columns: ColumnDef[], role: ColumnRole): ColumnDef | undefined {
  return columns.find((column) => column.role === role)
}

/** Every column playing a part, in the order the schema declared them. */
export function roleColumns(columns: ColumnDef[], role: ColumnRole): ColumnDef[] {
  return columns.filter((column) => column.role === role)
}

/**
 * The columns the table draws for the current scope: an entity's own where one
 * is filtered to, the schema's across every entity, and none at all where
 * neither declared any.
 *
 * Columns are then dropped by {@link ColumnDef.when} — which is how one set
 * can carry a column, the row's type, that only means anything in the mixed
 * result set — and a `tint` is dropped always, being a colour rather than a
 * cell.
 */
export function columnsFor(
  schema: DomainSchema | null,
  entity: EntitySchema | null,
): ColumnDef[] {
  const declared = (entity ? entity.columns : schema?.columns) ?? []
  const scope = entity ? 'scoped' : 'everything'
  return declared.filter(
    (column) =>
      column.role !== 'tint' &&
      ((column.when ?? 'always') === 'always' || column.when === scope),
  )
}

/** The three fields the shell owns, which a column may name like any other. */
const OWN_FIELDS = ['id', 'entityKey', 'entityLabel'] as const

/**
 * The raw value behind a cell.
 *
 * A column that computes its own beats everything; otherwise the field it
 * names — `field`, or its `key` — is read off {@link ShellRow.fields}, and
 * then off the row's own three. The bag comes first: those names are the
 * schema's, and a type that has a field called `id` of its own means that one.
 */
export function cellValue(column: ColumnDef, row: ShellRow): unknown {
  if (column.value) return column.value(row)
  const field = column.field ?? column.key
  // A column that names no field and computes nothing holds no value: it draws
  // the row's position, or a component of the host's.
  if (field === undefined) return undefined
  if (row.fields && field in row.fields) return row.fields[field]
  if ((OWN_FIELDS as readonly string[]).includes(field)) {
    return (row as unknown as Record<string, unknown>)[field]
  }
  return undefined
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

/** The same for a column that may not be there at all — a role nothing plays. */
export function cellTextOf(column: ColumnDef | undefined, row: ShellRow): string {
  return column ? cellText(column, row) : ''
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
