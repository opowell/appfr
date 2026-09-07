<script setup lang="ts">
import { useShellContext } from '../../composables/context'
import { usePresentedRows } from '../../composables/usePresentedRows'
import SelectTick from './SelectTick.vue'

const shell = useShellContext()
const rows = usePresentedRows()
</script>

<template>
  <div class="dc-links">
    <!-- A link is one button, so the tick goes in front of it rather than in
         it, and the pair wraps as one. -->
    <span
      v-for="entry in rows"
      :key="entry.key"
      class="dc-links__item"
    >
      <SelectTick
        v-if="shell.selectable.value"
        :row="entry.row"
        :selected="entry.selected"
        :name="entry.parts.identity"
      />
      <button
        type="button"
        class="dc-link"
        @click="shell.activate(entry.row)"
      >
        <span class="dc-link__primary dc-truncate">{{ entry.parts.identity }}</span>
        <span class="dc-link__secondary dc-mono dc-truncate">{{ entry.parts.reference }}</span>
      </button>
    </span>
  </div>
</template>

<style scoped>
.dc-links {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 10px;
  padding: 16px;
}

.dc-links__item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  max-width: 100%;
}

/* A tick belongs to the chip after it, so the gap between two of these pairs
   has to be plainly wider than the gap inside one — otherwise a wrapped row
   reads as chips with loose boxes between them. */
.dc-links:has(.dc-tick) {
  column-gap: 18px;
}

.dc-link {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  max-width: 100%;
  padding: 6px 12px;
  background: var(--dc-bg-1);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  font-size: var(--dc-text-body);
  text-align: left;
  cursor: pointer;
}

.dc-link:hover {
  border-color: var(--dc-line-2);
}

.dc-link__primary {
  color: var(--dc-accent);
  font-weight: var(--dc-weight-medium);
}

.dc-link__secondary {
  font-size: var(--dc-text-code);
  color: var(--dc-fg-3);
}
</style>
