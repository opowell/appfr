<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnDef, EntitySchema } from '../../types'
import { useShellContext } from '../../composables/context'
import type { PresentedRow } from '../../composables/usePresentedRows'
import { cellText } from '../../query/columns'

/**
 * A value, as a button when its column's `drill` says the number counts
 * something the schema also lists: clicking `12` under **Colors** means "show
 * me those twelve", which is the one thing a count is ever wanted for.
 *
 * A number that counts nothing listable renders as the plain text it was, so
 * a view can put every metric through here without deciding anything itself.
 * The root element carries the caller's scope id either way, so the view goes
 * on styling the cell as it always did.
 */
const props = defineProps<{
  entry: PresentedRow
  /** The column this value came from — what says where pressing it leads. */
  column: ColumnDef
}>()

const shell = useShellContext()

/**
 * The entity this value counts. Null unless the column names one *and* the
 * row's type declares `scope` — without that, nothing on the far side says
 * which record it belongs to and the narrowed list would be the whole
 * population.
 */
const target = computed<EntitySchema | null>(() => {
  const entity = props.entry.entity
  if (!entity?.scope || !props.column.drill) return null
  return shell.entities.value.find((candidate) => candidate.key === props.column.drill) ?? null
})

const name = computed(() => props.column.label ?? '')

const text = computed(() => cellText(props.column, props.entry.row))

/** Stops the click reaching the row, which would open the record instead. */
function drill(event: MouseEvent) {
  event.stopPropagation()
  if (target.value) shell.drill(props.entry.row, target.value)
}
</script>

<template>
  <button
    v-if="target"
    type="button"
    class="dc-drill"
    :title="`${name} of ${entry.parts.identity} — show the ${target.label.toLowerCase()}`"
    @click="drill"
  >
    <slot>{{ text }}</slot>
  </button>
  <span v-else><slot>{{ text }}</slot></span>
</template>

<style scoped>
.dc-drill {
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  cursor: pointer;
  /* Underlined rather than accented: in a row of numbers, colour would read as
     a value being flagged rather than as a place to press. */
  text-decoration: underline dotted var(--dc-fg-3);
  text-underline-offset: 3px;
}

.dc-drill:hover {
  color: var(--dc-accent);
  text-decoration-color: var(--dc-accent);
}
</style>
