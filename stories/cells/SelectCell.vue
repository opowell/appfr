<script setup lang="ts">
import { computed } from 'vue'
import type { ShellRow } from '../../src/types'
import { selectedRows } from '../selection'

/**
 * A cell of the host's own — the row checkbox a table that selects rows needs.
 *
 * The shell has no selection model and does not need one: a `component` column
 * is handed the row, and what a tick means is the host's. Whatever it renders
 * has to stop the click reaching the row, which would open the record.
 */
const props = defineProps<{ row: ShellRow }>()

const on = computed(() => selectedRows.value.includes(props.row.id))

function toggle(event: MouseEvent) {
  event.stopPropagation()
  selectedRows.value = on.value
    ? selectedRows.value.filter((id) => id !== props.row.id)
    : [...selectedRows.value, props.row.id]
}
</script>

<template>
  <input
    type="checkbox"
    :checked="on"
    :aria-label="`Select ${row.primary}`"
    @click="toggle"
  >
</template>
