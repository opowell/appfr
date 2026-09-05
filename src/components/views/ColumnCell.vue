<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnDef, RecordStatus } from '../../types'
import { useShellContext } from '../../composables/context'
import type { PresentedRow } from '../../composables/usePresentedRows'
import { cellFull, cellText, cellValue, columnTruncates } from '../../query/columns'
import MetricDrill from './MetricDrill.vue'
import StatusPill from '../StatusPill.vue'

/**
 * One cell, drawn the way its {@link ColumnDef} says.
 *
 * The `<td>` around this belongs to the table — the width, the alignment and
 * whether the column is on screen at this size are the table's business. What
 * is *inside* it is the column's, and this is the whole of that: a value read
 * off the row, formatted by the column or by its kind, and made pressable when
 * the column says pressing it leads somewhere.
 */
const props = defineProps<{ column: ColumnDef; entry: PresentedRow }>()

const shell = useShellContext()

const kind = computed(() => props.column.kind ?? 'text')

const value = computed(() => cellValue(props.column, props.entry.row))

/**
 * The ordinal is the row's place in the result rather than anything on the
 * row, so it comes from the presented row and not from a field lookup.
 */
const text = computed(() =>
  kind.value === 'ordinal' ? props.entry.ordinal : cellText(props.column, props.entry.row),
)

const status = computed(() => value.value as RecordStatus)

/** Whether the value is a button of its own rather than part of the row's. */
const pressable = computed(() => props.column.activate === true || Boolean(props.column.click))

const truncates = computed(() => columnTruncates(props.column))

/**
 * What the button says on hover — the whole of the value, the rounding and the
 * truncation undone, since the pointer is on the button rather than on the
 * cell that would otherwise carry it.
 */
const title = computed(() => cellFull(props.column, props.entry.row))

/**
 * Stops the click reaching the row, which would open the record — a cell that
 * leads somewhere of its own cannot also be the row's way in.
 */
function press(event: MouseEvent) {
  if (!pressable.value) return
  event.stopPropagation()
  props.column.click?.(props.entry.row)
  if (props.column.activate) shell.activate(props.entry.row)
}
</script>

<template>
  <component
    :is="column.component"
    v-if="kind === 'component' && column.component"
    :row="entry.row"
    :entry="entry"
    :value="value"
    :column="column"
  />
  <StatusPill
    v-else-if="kind === 'status'"
    :status="status"
  />
  <img
    v-else-if="kind === 'image'"
    class="dc-cell__image"
    :src="String(value ?? '')"
    :alt="entry.parts.identity"
    loading="lazy"
    :style="{ maxHeight: column.height }"
    @click="press"
  >

  <!-- A value that counts something listable is the way into those rows:
       `12` under Tests means "show me those twelve". -->
  <MetricDrill
    v-else-if="column.drill"
    :entry="entry"
    :column="column"
  />

  <button
    v-else-if="pressable"
    type="button"
    class="dc-table__open"
    :class="{ 'dc-truncate': truncates }"
    :title="title"
    @click="press"
  >
    {{ text }}
  </button>

  <template v-else>
    {{ text }}
  </template>
</template>

<style scoped>
.dc-table__open {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--dc-accent);
  font: inherit;
  font-weight: var(--dc-weight-medium);
  /* Inherited rather than left-aligned: a pressable number belongs at the
     right-hand edge of its column with the numbers above and below it. */
  text-align: inherit;
  cursor: pointer;
}

.dc-table__open:hover {
  text-decoration: underline;
}

.dc-cell__image {
  display: block;
  max-width: 100%;
}
</style>
