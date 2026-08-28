<script setup lang="ts">
import { useShellContext } from '../../composables/context'
import { usePresentedRows } from '../../composables/usePresentedRows'

const shell = useShellContext()
const rows = usePresentedRows()
</script>

<template>
  <div class="dc-links">
    <button
      v-for="entry in rows"
      :key="entry.row.id"
      type="button"
      class="dc-link"
      @click="shell.activate(entry.row)"
    >
      <span class="dc-link__primary dc-truncate">{{ entry.row.primary }}</span>
      <span class="dc-link__secondary dc-mono dc-truncate">{{ entry.row.secondary }}</span>
    </button>
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
