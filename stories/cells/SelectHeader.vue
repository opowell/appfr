<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnDef, EntitySchema } from '../../src/types'
import { selectedRows } from '../selection'

/**
 * A header of the host's own — the control over every tick the column's cells
 * made, which is what a column of ticks is missing without one.
 *
 * Given the column and the entity being listed, and nothing about the rows: a
 * header is about the whole column, and what the whole column holds is the
 * host's state to read. Here that is the selection the cells write, and the
 * one thing to do to all of it is let it go.
 */
defineProps<{ column: ColumnDef; entity: EntitySchema | null }>()

const count = computed(() => selectedRows.value.length)

function clear() {
  selectedRows.value = []
}
</script>

<template>
  <button
    v-if="count"
    type="button"
    :aria-label="`Clear ${count} ticked`"
    @click="clear"
  >
    Clear {{ count }}
  </button>
</template>
