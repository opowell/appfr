<script setup lang="ts">
/*
 * A row of counts, each in the colour of what it counts: `12 passed · 1
 * failed · 2 skipped`. What a run, a batch or a crawl came to, in the space
 * of a table cell.
 *
 * Words rather than a pill apiece, because there are several of them side by
 * side and six pills in a cell is a cell made of chrome. A count of nothing is
 * left out — `0 failed` is the absence of something, and saying it in red
 * would be shouting about it — and a row with nothing to count says so with
 * the shell's dash.
 *
 * The counts are a list rather than a map from tone to number, because two
 * counts can share a colour (`skipped` and `pending` are both quiet) and the
 * order they are read in is the host's to choose.
 */
import { computed } from 'vue'
import { EMPTY_CELL } from '../query/columns'
import type { StatusCount } from '../types'

const props = withDefaults(defineProps<{
  counts: StatusCount[]
  /** What a row with nothing to count says. */
  empty?: string
}>(), {
  empty: EMPTY_CELL,
})

const shown = computed(() => props.counts.filter((entry) => entry.count > 0))
</script>

<template>
  <span class="dc-counts">
    <span
      v-for="entry in shown"
      :key="entry.label"
      class="dc-counts__count"
      :data-dc-tone="entry.tone ?? 'neutral'"
    >{{ entry.count }} {{ entry.label }}</span>
    <span
      v-if="shown.length === 0"
      class="dc-counts__empty"
    >{{ empty }}</span>
  </span>
</template>

<style scoped>
.dc-counts {
  font-size: var(--dc-text-meta);
  font-variant-numeric: tabular-nums;
  color: var(--dc-fg-3);
}

/* The separator belongs to the gap, not to either count, so it stays quiet
   whatever colour the count after it is. */
.dc-counts__count + .dc-counts__count::before {
  content: ' · ';
  color: var(--dc-fg-3);
}

.dc-counts__count[data-dc-tone='ok'] {
  color: var(--dc-ok);
}

.dc-counts__count[data-dc-tone='failed'] {
  color: var(--dc-danger);
}

.dc-counts__count[data-dc-tone='review'] {
  color: var(--dc-warn);
}

.dc-counts__count[data-dc-tone='running'],
.dc-counts__count[data-dc-tone='accent'] {
  color: var(--dc-accent);
}

/* `neutral` and `queued`: the row's own quiet colour, inherited. */
</style>
