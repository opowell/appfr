<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnDef, EntitySchema } from '../../types'
import { useShellContext } from '../../composables/context'
import type { PressOptions } from '../../types'
import PressLink from './PressLink.vue'
import type { PresentedRow } from '../../composables/usePresentedRows'
import { cellText } from '../../query/columns'

/**
 * A value, as a button when its column's `drill` says the number counts
 * something the schema also lists: clicking `12` under **Colors** means "show
 * me those twelve", which is the one thing a count is ever wanted for.
 *
 * A column with a `click` of the host's is pressed for that instead, and is a
 * link where its `clickHref` gives an address: the count of something the
 * shell cannot list from here, which the host takes the reader to itself.
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

/** Pressed for the host's `click`, when the column has one. */
const hostPress = computed(() => Boolean(props.column.click))

const name = computed(() => props.column.label ?? '')

const text = computed(() => cellText(props.column, props.entry.row))

/** Stops the click reaching the row, which would open the record instead. */
/** Where the number leads, so it is a link the browser can open elsewhere too. */
const href = computed(() => {
  if (hostPress.value) return props.column.clickHref?.(props.entry.row) ?? null
  return target.value ? shell.drillHref(props.entry.row, target.value, props.column.drillWhere) : null
})

const title = computed(() => {
  if (target.value && !hostPress.value) return `${name.value} of ${props.entry.parts.identity} — show the ${target.value.label.toLowerCase()}`
  return `${name.value} of ${props.entry.parts.identity}`
})

function drill(options: PressOptions, event: MouseEvent) {
  // The row's own press would open the record — a count leads somewhere of its own.
  event.stopPropagation()
  if (hostPress.value) props.column.click?.(props.entry.row, options)
  else if (target.value) shell.drill(props.entry.row, target.value, options, props.column.drillWhere)
}
</script>

<template>
  <PressLink
    v-if="target || hostPress"
    class="dc-drill"
    :href="href"
    :title="title"
    @press="drill"
  >
    <slot>{{ text }}</slot>
  </PressLink>
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
