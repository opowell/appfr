<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Component } from 'vue'
import type { ViewKind } from '../types'
import { useShellContext } from '../composables/context'
import { isTypeCardsQuery, resolveView } from '../query/schema'
import CardsView from './views/CardsView.vue'
import GridView from './views/GridView.vue'
import LinksView from './views/LinksView.vue'
import ListView from './views/ListView.vue'
import PreviewView from './views/PreviewView.vue'
import TableView from './views/TableView.vue'
import TypeCardsView from './views/TypeCardsView.vue'

const props = defineProps<{
  /**
   * The views on offer, when the host restricts them. A URL naming one that is
   * not on the list — a link kept from before it was taken off — renders the
   * first that is, rather than a view with no way back to it in the panel.
   */
  views?: ViewKind[]
}>()

const shell = useShellContext()

/**
 * Passed straight through to the per-type cards, which is the one view they
 * mean anything in: a card of the host's own belongs in a grid of cards, and
 * the other five views are rows and tiles of records.
 */
const slots = defineSlots<{
  'cards-before'?: () => unknown
  'cards-after'?: () => unknown
}>()

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

const kind = computed<ViewKind>(() => resolveView(shell.query.value.view, props.views))

const view = computed(() => VIEWS[kind.value] ?? ListView)
const hasRows = computed(() => shell.rows.value.length > 0)
const failed = computed(() => shell.error.value !== null)

const scroller = ref<HTMLElement | null>(null)

/*
 * A page turn starts at the top. Where the scroll is belongs to the rows that
 * were there, and the next page is a different set of them: keeping it opens
 * the page partway down rows nobody has read yet, or — where the new page is
 * the shorter one — at whatever the browser clamps the old position to.
 *
 * Set rather than scrolled smoothly, because the rows it would travel over are
 * being replaced as it goes. Watched on the page alone — a change to the query
 * made from further down the results sends the page back to the first, and
 * arrives here as a page turn like any other.
 */
watch(
  () => shell.query.value.page,
  () => {
    if (scroller.value) scroller.value.scrollTop = 0
  },
)
</script>

<template>
  <div
    ref="scroller"
    class="dc-results"
    :data-dc-pending="shell.pending.value ? 'true' : 'false'"
  >
    <!-- First, because the per-type cards do not read the shell's own result
         set at all: each runs its own query and reports its own failure, and
         the cards a host put among them are not waiting on either. -->
    <TypeCardsView v-if="isTypeCards">
      <template
        v-if="slots['cards-before']"
        #before
      >
        <slot name="cards-before" />
      </template>
      <template
        v-if="slots['cards-after']"
        #after
      >
        <slot name="cards-after" />
      </template>
    </TypeCardsView>

    <p
      v-else-if="failed"
      class="dc-results__state"
      role="alert"
    >
      <span class="dc-results__headline">Could not load results</span>
      <span class="dc-results__detail">
        {{ shell.error.value instanceof Error ? shell.error.value.message : 'The data source failed.' }}
      </span>
    </p>

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
