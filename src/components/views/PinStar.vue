<script setup lang="ts">
import type { ShellRow } from '../../types'
import { useShellContext } from '../../composables/context'

const props = defineProps<{
  row: ShellRow
  pinned: boolean
  /** What to call the record. Its identity column, resolved by the view. */
  name: string
}>()

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
    :aria-label="pinned ? `Unpin ${name}` : `Pin ${name}`"
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
  font-size: var(--dc-text-body);
  line-height: var(--dc-leading-flat);
  cursor: pointer;
}

.dc-star:hover,
.dc-star[data-dc-active='true'] {
  color: var(--dc-accent);
}
</style>
