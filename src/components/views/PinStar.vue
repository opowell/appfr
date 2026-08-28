<script setup lang="ts">
import type { ShellRow } from '../../types'
import { useShellContext } from '../../composables/context'

const props = defineProps<{ row: ShellRow; pinned: boolean }>()

const shell = useShellContext()

/** Stops the click reaching the row, which would open the record instead. */
function toggle(event: MouseEvent) {
  event.stopPropagation()
  shell.togglePin(props.row)
}
</script>

<template>
  <button
    type="button"
    class="dc-star"
    :data-dc-active="pinned ? 'true' : 'false'"
    :aria-pressed="pinned"
    :aria-label="pinned ? `Unpin ${row.primary}` : `Pin ${row.primary}`"
    @click="toggle"
  >
    {{ pinned ? '★' : '☆' }}
  </button>
</template>

<style scoped>
.dc-star {
  flex: 0 0 auto;
  padding: 2px;
  border: none;
  background: transparent;
  color: var(--dc-fg-3);
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
}

.dc-star:hover,
.dc-star[data-dc-active='true'] {
  color: var(--dc-accent);
}
</style>
