<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnDef, PressOptions } from '../../types'
import { useShellContext } from '../../composables/context'
import type { PresentedRow } from '../../composables/usePresentedRows'
import { formatTerm, refineExpression } from '../../data/expression'
import { cellText } from '../../query/columns'
import type { CellNarrowing } from '../../query/narrowing'
import PressLink from './PressLink.vue'

/**
 * A value that narrows the list to the rows sharing it — see
 * `cellNarrowings`. One press for the whole cell, or one per word where the
 * cell is several (a flag column's `deployed, covered`), with the words
 * between them drawn as they were.
 *
 * The term is ANDed on to the query, as one typed in the box is: added to
 * each alternative, and turning a term the query holds the other way round.
 * The type and the view stay; it is a refinement of this list, not a move to
 * another.
 */
const props = defineProps<{
  entry: PresentedRow
  column: ColumnDef
  narrowings: CellNarrowing[]
  /** Whether the cell cuts its text short, as {@link ColumnDef.truncate} asks. */
  truncates: boolean
}>()

const shell = useShellContext()

const text = computed(() => cellText(props.column, props.entry.row))

function termOf(narrowing: CellNarrowing, exclude = false): string {
  return formatTerm({ ...narrowing.term, ...(exclude ? { negated: true } : {}) })
}

function exprWith(narrowing: CellNarrowing, exclude = false): string {
  return refineExpression(shell.query.value.expr, termOf(narrowing, exclude))
}

function hrefOf(narrowing: CellNarrowing): string {
  return shell.narrowHref(exprWith(narrowing), shell.query.value.entity)
}

function titleOf(narrowing: CellNarrowing): string {
  return `Narrow to ${termOf(narrowing)}\n⌥-press to leave these out`
}

function press(narrowing: CellNarrowing, options: PressOptions, event: MouseEvent): void {
  // The row's own press would open the record — this value leads somewhere of its own.
  event.stopPropagation()
  shell.narrow(exprWith(narrowing, options.exclude), shell.query.value.entity)
}
</script>

<template>
  <span
    class="dc-cell__text"
    :class="{ 'dc-truncate': truncates }"
  >
    <template
      v-for="(narrowing, place) in narrowings"
      :key="termOf(narrowing)"
    >
      <template v-if="place > 0">, </template>
      <PressLink
        class="dc-narrow"
        :href="hrefOf(narrowing)"
        :title="titleOf(narrowing)"
        @press="(options, event) => press(narrowing, options, event)"
      >{{ narrowing.label ?? text }}</PressLink>
    </template>
  </span>
</template>

<style scoped>
/* Underlined as a count that drills is (`MetricDrill`): a place to press, not a value flagged. */
.dc-narrow {
  display: inline;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  cursor: pointer;
  text-decoration: underline dotted var(--dc-fg-3);
  text-underline-offset: 3px;
}

.dc-narrow:hover {
  color: var(--dc-accent);
  text-decoration-color: var(--dc-accent);
}
</style>
