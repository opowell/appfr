<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { Component } from 'vue'
import type { ViewKind } from '../types'
import { useShellContext } from '../composables/context'
import { isTypeCardsQuery, resolveView } from '../query/schema'
import CardsView from './views/CardsView.vue'
import GridView from './views/GridView.vue'
import ImagesView from './views/ImagesView.vue'
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
  /**
   * Whether what the source answers is not yet the data — see `loading` on
   * `DataShell`. Said in place of everything else, the per-type cards
   * included: they run queries of their own against the same source, and
   * would each say "nothing here yet" of data that has not arrived.
   */
  loading?: boolean
}>()

const shell = useShellContext()

/**
 * Passed straight through to the per-type cards, which is the one view they
 * mean anything in: a card of the host's own belongs in a grid of cards, and
 * the other six views are rows, tiles and pictures of records.
 */
const slots = defineSlots<{
  'cards-before'?: () => unknown
  'cards-after'?: () => unknown
}>()

const VIEWS: Record<ViewKind, Component> = {
  list: ListView,
  cards: CardsView,
  grid: GridView,
  images: ImagesView,
  table: TableView,
  links: LinksView,
  preview: PreviewView,
}

/**
 * Cards mean different things at different scopes. Filtered to one entity they
 * are one card per record; across every entity — the home screen — a card per
 * record would be a wall of mixed things, so it is a card per type instead.
 */
const isTypeCards = computed(() => isTypeCardsQuery(shell.query.value, props.views))

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
  // The page on screen, which is the draft's own while one is being typed.
  () => shell.liveQuery.value.page,
  () => {
    if (scroller.value) scroller.value.scrollTop = 0
  },
)

/**
 * Which edges have results behind them, as a list — `top right bottom left`,
 * any of them, or nothing at all — the way the bar says it of a query too long
 * for it. An overlay scrollbar is invisible until the pointer is over the
 * results, so a table cut off at a row boundary reads as the end of the table,
 * and one scrolled down reads as its start.
 */
const more = ref('')

/*
 * How much of each edge the scrollbars themselves take, so that the fade
 * stops short of them: a classic scrollbar sits inside the box the mask is
 * drawn on, and would otherwise fade with the results it scrolls.
 */
const gutters = ref({ x: 0, y: 0 })

function measureEdges(): void {
  const element = scroller.value
  if (!element) {
    more.value = ''
    return
  }
  // A fraction of a pixel is not somewhere anyone can scroll to.
  const edges = {
    top: element.scrollTop > 1,
    right: element.scrollWidth - element.clientWidth - element.scrollLeft > 1,
    bottom: element.scrollHeight - element.clientHeight - element.scrollTop > 1,
    left: element.scrollLeft > 1,
  }
  more.value = Object.entries(edges)
    .filter(([, behind]) => behind)
    .map(([edge]) => edge)
    .join(' ')
  gutters.value = {
    x: element.offsetHeight - element.clientHeight,
    y: element.offsetWidth - element.clientWidth,
  }
}

/*
 * Measured rather than animated from a scroll timeline, for the reason the bar
 * is: a timeline leaves its end state applied once the box stops overflowing.
 * And the box is not all that changes it — rows arrive, a view is swapped for
 * another, a picture loads — so what is inside it is watched too: the view's
 * own root, whichever one that is at the time.
 */
let sizes: ResizeObserver | null = null
let children: MutationObserver | null = null
watch(
  scroller,
  (element, previous) => {
    previous?.removeEventListener('scroll', measureEdges)
    sizes?.disconnect()
    children?.disconnect()
    sizes = null
    children = null
    measureEdges()
    if (!element) return
    element.addEventListener('scroll', measureEdges, { passive: true })
    if (typeof ResizeObserver === 'undefined') return
    const resizes = new ResizeObserver(measureEdges)
    const observe = () => {
      resizes.disconnect()
      resizes.observe(element)
      for (const child of element.children) resizes.observe(child)
    }
    observe()
    sizes = resizes
    if (typeof MutationObserver === 'undefined') return
    children = new MutationObserver(() => {
      observe()
      measureEdges()
    })
    children.observe(element, { childList: true })
  },
  { flush: 'post' },
)

onBeforeUnmount(() => {
  scroller.value?.removeEventListener('scroll', measureEdges)
  sizes?.disconnect()
  children?.disconnect()
})
</script>

<template>
  <div
    ref="scroller"
    class="dc-results"
    :data-dc-pending="shell.pending.value ? 'true' : 'false'"
    :data-dc-more="more"
    :style="{
      '--dc-results-gutter-x': `${gutters.x}px`,
      '--dc-results-gutter-y': `${gutters.y}px`,
    }"
  >
    <!-- Before anything that reads the source, because nothing it answers is
         the data yet. -->
    <p
      v-if="loading"
      class="dc-results__state dc-results__state--loading"
      aria-live="polite"
    >
      <span class="dc-results__detail">Loading…</span>
    </p>

    <!-- First, because the per-type cards do not read the shell's own result
         set at all: each runs its own query and reports its own failure, and
         the cards a host put among them are not waiting on either. -->
    <TypeCardsView v-else-if="isTypeCards">
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
/*
 * The one scroller, and a containing block so that it stays the one scroller.
 *
 * `overflow: auto` clips a laid-out descendant but not an absolutely positioned one whose
 * containing block is further out — and the sr-only recipe every view here uses for its
 * announcements (`position: absolute`, a 1px box, `clip-path: inset(50%)`) sits in cards and rows
 * that declare no `position` of their own. Without this line their containing block is the
 * document: they are laid out at their static position far down the scrolled content, escape this
 * clip and the shell's, and extend the *page's* scrollable area past the viewport. The host then
 * has two scrollbars, and scrolling the outer one takes the shell's own header off the screen.
 *
 * Positioning the scroller is the whole fix, and it is free: every box under here that means to be
 * placed — a grid tick, a tile's image and scrim — already has a `relative` cell of its own, and
 * nothing in the results is meant to be drawn outside them.
 */
.dc-results {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: auto;
  transition: opacity 0.12s ease-out;
}

.dc-results[data-dc-pending='true'] {
  opacity: 0.6;
}

/*
 * And the cut says that it is one: each edge with results behind it is
 * softened, as the bar's is.
 *
 * Drawn as what is taken away rather than what is kept — the whole box, less a
 * strip along each edge that has more behind it — because the strips stop at
 * the scrollbars, and a mask layer is transparent wherever it is not drawn:
 * kept-shapes intersected would take the scrollbars out with the results. An
 * edge with nothing behind it has a strip 0px deep, which is not drawn at all.
 */
.dc-results {
  --dc-results-cue: 32px;
  --dc-results-cue-top: 0px;
  --dc-results-cue-right: 0px;
  --dc-results-cue-bottom: 0px;
  --dc-results-cue-left: 0px;
}

.dc-results[data-dc-more~='top'] {
  --dc-results-cue-top: var(--dc-results-cue);
}

.dc-results[data-dc-more~='right'] {
  --dc-results-cue-right: var(--dc-results-cue);
}

.dc-results[data-dc-more~='bottom'] {
  --dc-results-cue-bottom: var(--dc-results-cue);
}

.dc-results[data-dc-more~='left'] {
  --dc-results-cue-left: var(--dc-results-cue);
}

.dc-results:not([data-dc-more='']) {
  mask-image:
    linear-gradient(#000, #000),
    linear-gradient(to bottom, #000, transparent),
    linear-gradient(to left, #000, transparent),
    linear-gradient(to top, #000, transparent),
    linear-gradient(to right, #000, transparent);
  mask-size:
    100% 100%,
    calc(100% - var(--dc-results-gutter-y)) var(--dc-results-cue-top),
    var(--dc-results-cue-right) calc(100% - var(--dc-results-gutter-x)),
    calc(100% - var(--dc-results-gutter-y)) var(--dc-results-cue-bottom),
    var(--dc-results-cue-left) calc(100% - var(--dc-results-gutter-x));
  mask-position:
    0 0,
    left 0 top 0,
    right var(--dc-results-gutter-y) top 0,
    left 0 bottom var(--dc-results-gutter-x),
    left 0 top 0;
  mask-repeat: no-repeat;
  /* The whole box less the strips, which are added to each other first. */
  mask-composite: subtract, add, add, add;
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
