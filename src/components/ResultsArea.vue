<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import type { ViewKind } from '../types'
import { useShellContext } from '../composables/context'
import { isTypeCardsQuery } from '../query/schema'
import CardsView from './views/CardsView.vue'
import GridView from './views/GridView.vue'
import LinksView from './views/LinksView.vue'
import ListView from './views/ListView.vue'
import PreviewView from './views/PreviewView.vue'
import TableView from './views/TableView.vue'
import TypeCardsView from './views/TypeCardsView.vue'

const shell = useShellContext()

const VIEWS: Record<ViewKind, Component> = {
  list: ListView,
  cards: CardsView,
  grid: GridView,
  table: TableView,
  links: LinksView,
  preview: PreviewView,
}

/**
 * Cards mean different things at different scopes. Filtered to one entity they
 * are one card per record; across every entity — the home screen — a card per
 * record would be a wall of mixed things, so it is a card per type instead.
 */
const isTypeCards = computed(() => isTypeCardsQuery(shell.query.value))

const view = computed(() => VIEWS[shell.query.value.view] ?? ListView)
const hasRows = computed(() => shell.rows.value.length > 0)
const failed = computed(() => shell.error.value !== null)
</script>

<template>
  <div
    class="dc-results"
    :data-dc-pending="shell.pending.value ? 'true' : 'false'"
  >
    <p
      v-if="failed"
      class="dc-results__state"
      role="alert"
    >
      <span class="dc-results__headline">Could not load results</span>
      <span class="dc-results__detail">
        {{ shell.error.value instanceof Error ? shell.error.value.message : 'The data source failed.' }}
      </span>
    </p>

    <!-- The per-type cards run their own per-entity queries, so they render
         whatever the shell's single mixed query happened to return. -->
    <TypeCardsView v-else-if="isTypeCards" />

    <p
      v-else-if="!hasRows && shell.pending.value"
      class="dc-results__state"
      aria-live="polite"
    >
      <span class="dc-results__detail">Running query…</span>
    </p>

    <div
      v-else-if="!hasRows"
      class="dc-results__state"
    >
      <span class="dc-results__headline">Nothing matches this query</span>
      <span class="dc-results__detail">{{ shell.summary.value }}</span>
      <button
        v-if="!shell.isPristine.value"
        type="button"
        class="dc-results__clear"
        @click="shell.clearFilters()"
      >
        {{ shell.isEverything.value ? 'Clear filters' : 'Search everything instead' }}
      </button>
    </div>

    <component
      :is="view"
      v-else
    />
  </div>
</template>

<style scoped>
.dc-results {
  flex: 1;
  min-height: 0;
  overflow: auto;
  transition: opacity 0.12s ease-out;
}

.dc-results[data-dc-pending='true'] {
  opacity: 0.6;
}

.dc-results__state {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  padding: 40px 24px;
}

.dc-results__headline {
  font-size: var(--dc-text-title);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-1);
}

.dc-results__detail {
  font-family: var(--dc-mono);
  font-size: var(--dc-text-meta);
  color: var(--dc-fg-3);
}

.dc-results__clear {
  margin-top: 6px;
  padding: 7px 13px;
  background: var(--dc-bg-2);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-0);
  font-weight: var(--dc-weight-medium);
  cursor: pointer;
}

.dc-results__clear:hover {
  background: var(--dc-bg-3);
}
</style>
