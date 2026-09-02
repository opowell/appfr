<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'
import { usePresentedRows } from '../../composables/usePresentedRows'
import ScoreMeter from '../ScoreMeter.vue'
import StatusPill from '../StatusPill.vue'
import MetricDrill from './MetricDrill.vue'
import PinStar from './PinStar.vue'
import ScopeMark from './ScopeMark.vue'

const shell = useShellContext()
const rows = usePresentedRows()
/* With no entity filter the rows are of mixed kinds, so each says which. */
const showEntity = computed(() => shell.isEverything.value)
</script>

<template>
  <div
    class="dc-list"
    role="list"
  >
    <div
      v-for="entry in rows"
      :key="entry.key"
      class="dc-list__row"
      role="listitem"
    >
      <!-- The name opens the record and the metrics narrow to it, so the two
           are siblings rather than one button around everything: a count that
           leads somewhere of its own cannot be nested inside the row's. -->
      <button
        type="button"
        class="dc-list__open"
        @click="shell.activate(entry.row)"
      >
        <span class="dc-list__ordinal dc-mono">{{ entry.ordinal }}</span>
        <span class="dc-list__identity">
          <span class="dc-list__primary dc-truncate">{{ entry.row.primary }}</span>
          <span class="dc-list__secondary dc-mono dc-truncate">{{ entry.row.secondary }}</span>
        </span>
      </button>
      <span
        v-if="showEntity"
        class="dc-list__entity dc-mono"
      >{{ entry.entityLabel }}</span>
      <span class="dc-list__metrics dc-mono">
        <MetricDrill
          :entry="entry"
          metric="metric1"
        />
        <MetricDrill
          :entry="entry"
          metric="metric2"
        />
        <ScoreMeter :value="entry.row.score" />
      </span>
      <span class="dc-list__trailing">
        <StatusPill :status="entry.row.status" />
        <ScopeMark :entry="entry" />
        <PinStar
          v-if="shell.pinnable.value"
          :row="entry.row"
          :pinned="entry.pinned"
        />
      </span>
    </div>
  </div>
</template>

<style scoped>
.dc-list__row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 16px;
  border-bottom: 1px solid var(--dc-line);
}

.dc-list__row:hover {
  background: var(--dc-bg-1);
}

.dc-list__entity {
  flex: 0 0 auto;
  padding: 2px 8px;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-2);
  font-size: var(--dc-text-micro);
  white-space: nowrap;
}

.dc-list__open {
  display: grid;
  /* Ordinal and identity only — the entity tag and the metrics moved out of
     this button so each can lead somewhere of its own. */
  grid-template-columns: 32px minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
  padding: 11px 0 11px 16px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.dc-list__ordinal {
  font-size: var(--dc-text-meta);
  color: var(--dc-fg-3);
  text-align: right;
}

.dc-list__identity {
  min-width: 0;
}

.dc-list__primary {
  display: block;
  color: var(--dc-accent);
  font-weight: var(--dc-weight-medium);
}

.dc-list__secondary {
  display: block;
  margin-top: 1px;
  font-size: var(--dc-text-meta);
  color: var(--dc-fg-3);
}

.dc-list__metrics {
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
  font-size: var(--dc-text-meta);
  color: var(--dc-fg-2);
}

.dc-list__trailing {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

@container (max-width: 640px) {
  .dc-list__metrics {
    display: none;
  }
}
</style>
