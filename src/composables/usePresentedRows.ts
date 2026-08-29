import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { EntityLabels, ShellRow } from '../types'
import { formatDate, formatMetric, formatOrdinal, formatPercent } from '../data/format'
import { useShellContext } from './context'

/**
 * A row with its display strings resolved once. Views render these instead of
 * formatting inline, so the list, table, cards and grid can never disagree
 * about how a metric or a date looks.
 */
export interface PresentedRow {
  row: ShellRow
  /** The row's entity, worth showing only when the results span several. */
  entityLabel: string
  /**
   * Field names from the row's *own* entity. In a mixed result set this beats
   * a generic fallback: a log entry can be labelled "Trace id" while a LEGO
   * set beside it says "Set number".
   */
  labels: EntityLabels
  ordinal: string
  metric1: string
  metric2: string
  date: string
  score: string
  percent: string
  pinned: boolean
}

/**
 * Column names to use when the results span every entity, where no single
 * schema's vocabulary applies.
 */
export const GENERIC_LABELS: EntityLabels = {
  primary: 'Item',
  secondary: 'Reference',
  metric1: 'Metric',
  metric2: 'Metric 2',
}

/** The column names for the current scope, generic across the whole corpus. */
export function useViewLabels(): ComputedRef<EntityLabels> {
  const shell = useShellContext()
  return computed(() => shell.entity.value?.labels ?? GENERIC_LABELS)
}

/**
 * Resolves one row's display strings. Pure, so the per-type cards on the home
 * screen format their rows exactly as the record views do.
 */
export function presentRow(
  row: ShellRow,
  index: number,
  labels: EntityLabels,
  pinned: boolean,
): PresentedRow {
  return {
    row,
    entityLabel: row.entityLabel,
    labels,
    ordinal: formatOrdinal(index),
    metric1: formatMetric(row.metric1),
    metric2: formatMetric(row.metric2),
    date: formatDate(row.updatedAt),
    score: row.score.toFixed(2),
    percent: formatPercent(row.score),
    pinned,
  }
}

export function usePresentedRows(): ComputedRef<PresentedRow[]> {
  const shell = useShellContext()
  const byKey = computed(
    () => new Map(shell.entities.value.map((entity) => [entity.key, entity.labels])),
  )
  // Offset by where the page starts, so the leading column goes on counting
  // through the result set — page two of fifty opens at 51, not back at 01.
  return computed(() =>
    shell.rows.value.map((row, index) =>
      presentRow(
        row,
        shell.offset.value + index,
        byKey.value.get(row.entityKey) ?? GENERIC_LABELS,
        shell.isPinned(row),
      ),
    ),
  )
}
