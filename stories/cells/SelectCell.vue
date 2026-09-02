<script setup lang="ts">
import { computed } from 'vue'
import type { ShellRow } from '../../src/types'
import type { PresentedRow } from '../../src/composables/usePresentedRows'
import { selectedRows } from '../selection'

/**
 * A cell of the host's own — the row checkbox a table that selects rows needs.
 *
 * The shell has no selection model and does not need one: a `component` column
 * is handed `{ row, entry, value, column }`, and what a tick means is the
 * host's. The row is what a tick is about; the entry is where its name is, the
 * schema having said which column that name comes from. Whatever it renders
 * has to stop the click reaching the row, which would open the record.
 */
const props = defineProps<{ row: ShellRow; entry: PresentedRow }>()

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
    :aria-label="`Select ${entry.parts.identity}`"
    @click="toggle"
  >
</template>
