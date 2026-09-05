import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { ColumnDef, EntitySchema, RecordStatus, ShellRow } from '../types'
import { formatOrdinal } from '../data/format'
import {
  cellText,
  cellTextOf,
  cellValue,
  roleColumn,
  roleColumns,
  rowKey,
} from '../query/columns'
import { useShellContext } from './context'

/**
 * One metric of a row, with the column that knows what it is: its heading, its
 * formatted value, and whether pressing it narrows to what it counts.
 */
export interface RowMetric {
  column: ColumnDef
  label: string
  text: string
}

/**
 * The parts a view that is not a table is made of.
 *
 * A card, a tile, a link row and a preview pane are an identity, a reference,
 * a number or two and a mark — never a list of columns — so they read this
 * instead of the row. Every part comes from the column that declared the
 * matching {@link ColumnRole}, and is empty or null where the schema declared
 * no column for it.
 */
export interface RowParts {
  identity: string
  reference: string
  /** The metric columns, in the order the schema declared them. */
  metrics: RowMetric[]
  state: RecordStatus | null
  /** The date, formatted the way every view formats it. */
  updated: string
  /** A colour for the grid view's tile, where a column names one. */
  tint: string | null
}

/**
 * A row with its display strings resolved once. Views render these instead of
 * formatting inline, so the list, table, cards and grid can never disagree
 * about how a metric or a date looks.
 */
export interface PresentedRow {
  row: ShellRow
  /**
   * What the views track this row by: its id, or its place in the result where
   * a source returned none. Rows keyed alike are rows a renderer reuses for
   * each other, so this is never empty and never repeats within a page.
   */
  key: string
  /** The row's entity, worth showing only when the results span several. */
  entityLabel: string
  /**
   * The schema of that entity, or null for a row of a type the schema no
   * longer declares. Views read what the type *offers* from here — whether it
   * is narrowable, and what its columns say its fields are.
   */
  entity: EntitySchema | null
  /**
   * That entity's own columns. In a mixed result set this beats the scope's:
   * a log entry is read in its own vocabulary while a LEGO set beside it is
   * read in its.
   */
  columns: ColumnDef[]
  ordinal: string
  parts: RowParts
  pinned: boolean
}

/** Resolves the roles a view reads, from the columns of the row's own type. */
export function presentParts(row: ShellRow, columns: ColumnDef[]): RowParts {
  const state = roleColumn(columns, 'state')
  const tint = roleColumn(columns, 'tint')

  return {
    identity: cellTextOf(roleColumn(columns, 'identity'), row),
    reference: cellTextOf(roleColumn(columns, 'reference'), row),
    metrics: roleColumns(columns, 'metric').map((column) => ({
      column,
      label: column.label ?? '',
      text: cellText(column, row),
    })),
    state: state ? ((cellValue(state, row) as RecordStatus) ?? null) : null,
    updated: cellTextOf(roleColumn(columns, 'updated'), row),
    tint: tint ? ((cellValue(tint, row) as string) ?? null) : null,
  }
}

/**
 * Resolves one row's display strings. Pure, so the per-type cards on the home
 * screen format their rows exactly as the record views do.
 */
export function presentRow(
  row: ShellRow,
  index: number,
  entity: EntitySchema | null,
  pinned: boolean,
): PresentedRow {
  const columns = entity?.columns ?? []
  return {
    row,
    key: rowKey(row, index),
    entityLabel: row.entityLabel,
    entity,
    columns,
    ordinal: formatOrdinal(index),
    parts: presentParts(row, columns),
    pinned,
  }
}

export function usePresentedRows(): ComputedRef<PresentedRow[]> {
  const shell = useShellContext()
  const byKey = computed(
    () => new Map(shell.entities.value.map((entity) => [entity.key, entity])),
  )
  // Offset by where the page starts, so the leading column goes on counting
  // through the result set — page two of fifty opens at 51, not back at 01.
  return computed(() =>
    shell.rows.value.map((row, index) =>
      presentRow(
        row,
        shell.offset.value + index,
        byKey.value.get(row.entityKey) ?? null,
        shell.isPinned(row),
      ),
    ),
  )
}
