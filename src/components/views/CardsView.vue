<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'
import { usePresentedRows } from '../../composables/usePresentedRows'
import StatusPill from '../StatusPill.vue'
import MetricDrill from './MetricDrill.vue'
import PinStar from './PinStar.vue'
import ScopeMark from './ScopeMark.vue'

const shell = useShellContext()
const rows = usePresentedRows()
const showEntity = computed(() => shell.isEverything.value)
</script>

<template>
  <div class="dc-cards">
    <div
      v-for="entry in rows"
      :key="entry.row.id"
      class="dc-card"
    >
      <div class="dc-card__top dc-mono">
        <span>
          {{ entry.ordinal }}
          <span
            v-if="showEntity"
            class="dc-card__entity"
          >{{ entry.entityLabel }}</span>
        </span>
        <span class="dc-card__top-right">
          <StatusPill :status="entry.row.status" />
          <ScopeMark :entry="entry" />
          <PinStar
            v-if="shell.pinnable.value"
            :row="entry.row"
            :pinned="entry.pinned"
          />
        </span>
      </div>
      <button
        type="button"
        class="dc-card__open"
        @click="shell.activate(entry.row)"
      >
        <span class="dc-card__primary">{{ entry.row.primary }}</span>
        <span class="dc-card__secondary dc-mono">{{ entry.row.secondary }}</span>
      </button>
      <div class="dc-card__metrics dc-mono">
        <MetricDrill
          :entry="entry"
          metric="metric1"
        >
          {{ entry.labels.metric1 }} {{ entry.metric1 }}
        </MetricDrill>
        <MetricDrill
          :entry="entry"
          metric="metric2"
        >
          {{ entry.labels.metric2 }} {{ entry.metric2 }}
        </MetricDrill>
        <span class="dc-card__date">{{ entry.date }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dc-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 12px;
  padding: 16px;
}

.dc-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: var(--dc-bg-1);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
}

.dc-card:hover {
  background: var(--dc-bg-2);
  border-color: var(--dc-line-2);
}

.dc-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

.dc-card__top-right {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dc-card__entity {
  margin-left: 8px;
  padding: 2px 7px;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-2);
}

.dc-card__open {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.dc-card__primary {
  color: var(--dc-accent);
  font-size: var(--dc-text-heading);
  font-weight: var(--dc-weight-semibold);
  line-height: var(--dc-leading-tight);
}

.dc-card__secondary {
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
  word-break: break-all;
}

.dc-card__metrics {
  display: flex;
  gap: 16px;
  margin-top: 2px;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-2);
}

.dc-card__date {
  margin-left: auto;
}
</style>
