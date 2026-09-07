<script setup lang="ts">
import type { ShellRow } from '../../types'
import { useShellContext } from '../../composables/context'

/**
 * The tick that says a record is one of the ones an operation is for.
 *
 * A box rather than a mark of the shell's own, because this is the one
 * affordance every reader already knows: a ticked box is a chosen thing, and
 * nothing about a bulk operation is worth teaching.
 */
const props = defineProps<{
  row: ShellRow
  selected: boolean
  /** What to call the record. Its identity column, resolved by the view. */
  name: string
}>()

const shell = useShellContext()

/** Stops the click reaching the row, which would open the record instead. */
function toggle(event: Event) {
  event.stopPropagation()
  shell.toggleSelect(props.row)
}
</script>

<template>
  <input
    class="dc-tick"
    type="checkbox"
    :checked="selected"
    :aria-label="`Select ${name}`"
    @click="toggle"
  >
</template>
