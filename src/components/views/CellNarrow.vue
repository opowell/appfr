<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnDef, PressOptions } from '../../types'
import { useShellContext } from '../../composables/context'
import type { PresentedRow } from '../../composables/usePresentedRows'
import { formatTerm, refineExpression } from '../../data/expression'
import { pressPreviewOn } from '../../composables/usePressPreview'
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
 * another. The one exception is a cell saying the row's type, whose press is
 * that move: to the type, the query as it is, as the Type chooser makes it.
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
  if (narrowing.entity !== undefined) return `entity:${narrowing.entity}`
  return formatTerm({ ...narrowing.term, ...(exclude ? { negated: true } : {}) })
}

/** The expression after the press: the query's own where the press moves to a type. */
function exprWith(narrowing: CellNarrowing, exclude = false): string {
  if (narrowing.entity !== undefined) return shell.query.value.expr
  return refineExpression(shell.query.value.expr, termOf(narrowing, exclude))
}

/** The type after the press: the one it moves to, or the one the query is on. */
function entityOf(narrowing: CellNarrowing): string | null {
  return narrowing.entity ?? shell.query.value.entity
}

function hrefOf(narrowing: CellNarrowing): string {
  return shell.narrowHref(exprWith(narrowing), entityOf(narrowing))
}

function titleOf(narrowing: CellNarrowing): string {
  if (narrowing.entity !== undefined) {
    const label = shell.schema.value.entities.find((entity) => entity.key === narrowing.entity)?.label
    return `Show ${label ?? text.value} only`
  }
  return `Narrow to ${termOf(narrowing)}\n⌥-press to leave these out`
}

/** What the header shows faintly while the value is under the pointer: a term, never a move. */
function previewOf(narrowing: CellNarrowing) {
  return narrowing.entity !== undefined ? null : { term: termOf(narrowing) }
}

function press(narrowing: CellNarrowing, options: PressOptions, event: MouseEvent): void {
  // The row's own press would open the record — this value leads somewhere of its own.
  event.stopPropagation()
  shell.narrow(exprWith(narrowing, options.exclude), entityOf(narrowing))
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
        selectable
        v-on="pressPreviewOn(shell, previewOf(narrowing))"
        @press="(options, event) => press(narrowing, options, event)"
      ><slot>{{ narrowing.label ?? text }}</slot></PressLink>
    </template>
  </span>
</template>

<style scoped>
/* Text until the pointer finds it, or marked out at rest where the host's
   `valuePress` asks for buttons among plain text. */
.dc-narrow {
  display: inline;
  padding: 0;
  border: none;
  border-radius: var(--dc-radius-sm);
  background: transparent;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  cursor: pointer;
}

.dc-narrow:hover {
  background: var(--dc-accent-bg);
  color: var(--dc-accent);
}

[data-dc-value-press='button'] .dc-narrow {
  color: var(--dc-accent);
  font-weight: var(--dc-weight-medium);
}
</style>
