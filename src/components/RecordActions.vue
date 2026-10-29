<script setup lang="ts">
import { computed } from 'vue'
import type { EntitySchema, ViewKind } from '../types'
import { VIEW_KINDS } from '../types'
import { useShellContext } from '../composables/context'
import { useEntityCounts } from '../composables/useEntityCounts'
import { formatCount } from '../data/format'
import { VIEW_LABELS, entityCount, isTypeCardsQuery, resolveView } from '../query/schema'
import PageTick from './views/PageTick.vue'
import PickControl from './PickControl.vue'

/**
 * The head of the results: which type they are, how they are drawn and what
 * they are ordered by, and what can be done with them — make one, tick some,
 * and copy, delete or otherwise operate on what is ticked.
 *
 * The type and the view are chosen here rather than on the bar above, which
 * is the query's to narrow: both are about the results as a whole, and here
 * they are over the results they change.
 *
 * The bar over the results rather than a menu on each row, because three of
 * the four are about a *set* of records — and the fourth, making one, is what
 * you reach for from the same place, having found there is nothing here yet.
 *
 * Every one of them is named by the entity rather than assumed: a type that
 * says nothing about deleting is a type that is not deleted from here, and the
 * bar is one control shorter. A type that says nothing at all, with no choice
 * of type or view to offer either, has no bar.
 */
const props = defineProps<{
  /** The views on offer, as `DataShell` was told them — see `ResultsArea`. */
  views?: ViewKind[]
  /** Where the list of types is a control on the bar — see `showTypes`. */
  typeChooser?: 'scoped' | 'always'
  /** Which end of the bar the count and its Clear sit at — see `selectionAtEnd`. */
  selectionPlacement?: 'start' | 'end'
}>()

const shell = useShellContext()

/* ---------------------------------------------------------- which type */

/**
 * Whether the results are narrower than the type in force: a facet, an
 * expression, or the scope the whole shell is read inside — which the reader
 * did not ask for and cannot lift, but which is no less a narrowing. A draft
 * being typed is one too, being what the results are read under right now.
 */
const narrowed = computed(
  () =>
    shell.hasFacets.value ||
    Boolean(shell.liveQuery.value.expr.trim()) ||
    Boolean(shell.within.value),
)

/**
 * Every entity's own count against the query as it stands, fetched as the
 * picker opens rather than watched — see {@link useEntityCounts}.
 */
const entityCounts = useEntityCounts({
  source: shell.source,
  schema: shell.schema,
  // What each type holds of what is on screen, the draft's results included:
  // a count of the committed query would disagree with the rows under it.
  query: shell.liveQuery,
  entities: shell.entities,
  within: shell.within,
})

/**
 * What a count says before its source has said anything: a mark in the place
 * the number goes, so the list keeps its shape while the numbers arrive.
 */
const COUNTING = '…'

/**
 * How many records a type holds, said beside its name in the list of them.
 *
 * The population is what the schema publishes, and it is what makes that list
 * a chooser rather than a row of names: how many of each of these there are.
 * Once the query narrows anything, every entity says something else instead —
 * how many of it matched. The type in force already has its own live total,
 * the shell's own query; the rest are counted separately as the picker opens,
 * and one still being counted carries a `~`, since the true total may yet
 * grow. One the source has said nothing about yet reads {@link COUNTING}.
 */
function countOf(entity: EntitySchema): string {
  const chosen = entity.key === shell.query.value.entity
  if (chosen && narrowed.value) return formatCount(shell.total.value)
  if (entityCounts.pristine.value) return entityCount(entity)
  const found = entityCounts.counts.value.get(entity.key)
  if (!found) return entityCount(entity)
  // Nothing said yet is not nought matched, and `~0` read as the second.
  if (!found.counted) return COUNTING
  return `${found.pending ? '~' : ''}${formatCount(found.total)}`
}

/**
 * The list the type picker offers: `Everything` first, under the empty key
 * that stands for no type at all, and then each type with its count. Read
 * afresh whenever a count lands, so a list that is already up says the new
 * number in place — see {@link PickControl}.
 */
const entityOptions = computed(() => [
  { key: '', label: 'Everything' },
  ...shell.entities.value.map((entity) => ({
    key: entity.key,
    label: `${entity.label} · ${countOf(entity)}`,
  })),
])

/**
 * Whether the list of types is worth a control of its own.
 *
 * By default only while a type is filtered to: the chooser is then the way to
 * another type, and the way back out to `Everything`. On `Everything` itself
 * the content is what offers the types — each card on the home screen is
 * headed by its own, and the rows of a mixed list each say theirs.
 *
 * `typeChooser: 'always'` keeps it on `Everything` too, for a host whose home
 * screen opens on the records rather than on a card per type.
 */
const showTypes = computed(
  () => props.typeChooser === 'always' || shell.query.value.entity !== null,
)

/** The useful move from one type is almost always another type. */
function chooseEntity(key: string): void {
  shell.setEntity(key || null)
}

/* --------------------------------------------------------- how they are drawn */

const viewOptions = computed<{ key: ViewKind; label: string }[]>(() =>
  (props.views ?? [...VIEW_KINDS]).map((key) => ({ key, label: VIEW_LABELS[key] })),
)

/**
 * Which view is in force. A URL naming one the host withheld draws as the
 * first on offer — {@link resolveView}, the same reading the results area
 * takes — so the chooser says what is on screen rather than sitting blank.
 */
const view = computed(() => resolveView(shell.query.value.view, props.views))

/**
 * A host offering one view has said how the results are drawn, so a chooser
 * of one would be a label posing as a control.
 */
const showViews = computed(() => viewOptions.value.length > 1)

function chooseView(key: string): void {
  shell.setView(key as ViewKind)
}

/* ------------------------------------------------------ what they are ordered by */

/**
 * Whether the order is chosen here. A table's headings offer it, with the
 * column on screen under them; every other view draws the same rows with no
 * headings to press, so the order is chosen beside the view instead. A type
 * that offers no order has nothing to choose.
 */
const showOrder = computed(
  () => records.value && view.value !== 'table' && shell.sorts.value.length > 0,
)

const sortOptions = computed(() =>
  shell.sorts.value.map((sort) => ({ key: sort.key, label: sort.label })),
)

/** One sort on offer is a fact rather than a choice, as one view is. */
const showSorts = computed(() => showOrder.value && sortOptions.value.length > 1)

const descending = computed(() => shell.query.value.dir === 'desc')

/**
 * What the direction button says to a screen reader: the order as it stands,
 * the sort included — where there is one sort on offer, its picker is not
 * drawn and this is the only place it is named.
 */
const directionLabel = computed(
  () => `Sorted by ${shell.sort.value.label}, ${descending.value ? 'descending' : 'ascending'}`,
)

/**
 * The type in force. The operations are its own words, so a mixed result set —
 * where no single type's vocabulary applies — offers none of them.
 */
const entity = computed(() => shell.entity.value)

/**
 * The home screen's cards are per type rather than per record, so there is
 * nothing on that screen a tick or a delete would be about. Every other view
 * is rows.
 */
const records = computed(() => !isTypeCardsQuery(shell.query.value, props.views))

/* ---------------------------------------------------------- what is ticked */

/** How many records are ticked, on this page and every other. */
const count = computed(() => shell.selection.value.ids.length)

/**
 * Nothing to tick until there are rows: while the first page is still on its
 * way, or the query found none, the results under the bar say which, and
 * "None selected" over "Running query…" would be a reading of a page that is
 * not there. Ticks made before the rows went stay counted, and clearable.
 */
const selecting = computed(
  () =>
    records.value &&
    shell.selectable.value &&
    (shell.rows.value.length > 0 || count.value > 0),
)

/**
 * Whether the tick that takes the page is the table's rather than the bar's.
 * A table has a header row, and a tick over the column of ticks it speaks for
 * is where a reader of tables looks for it; the other views have no such row,
 * so theirs stays at the head of the bar. The count and the way to clear it
 * are of the whole selection, and stay on the bar whichever view it is.
 */
const tickInHeader = computed(() => view.value === 'table')

const offered = computed(
  () =>
    showTypes.value ||
    showViews.value ||
    showOrder.value ||
    (records.value &&
      (selecting.value ||
      Boolean(
        entity.value?.create ||
          entity.value?.duplicate ||
          entity.value?.delete ||
          entity.value?.operations?.length,
        ))),
)

/**
 * What the tick says it is counting. The number is of the whole selection
 * rather than of the page, because that is what the operations beside it are
 * for: ticks survive paging, and a delete would take the lot. With nothing
 * ticked the words are the tick's own label where the tick is here, and
 * nothing at all where it is in the table's header — that nothing is ticked
 * is what the unticked boxes already say.
 */
const readout = computed(() => {
  if (count.value) return `${count.value} selected`
  return tickInHeader.value ? '' : 'Select all'
})

/**
 * Whether the count and its Clear sit at the bar's far end, beside the
 * operations they are the count for, with the Clear drawn as one of them.
 * By default they lead the bar, after the choosers, and the Clear is a word.
 */
const selectionAtEnd = computed(() => props.selectionPlacement === 'end')

/** An operation says how many it is for, once there are any. */
function opLabel(label: string): string {
  return count.value ? `${label} ${count.value}` : label
}
</script>

<template>
  <div
    v-if="offered"
    :class="['dc-actions', { 'dc-actions--selection-end': selectionAtEnd }]"
  >
    <!-- Which type, while one is filtered to, with `Everything` in the list
         beside the types so widening back out stays one press. -->
    <PickControl
      v-if="showTypes"
      class="dc-actions__pick dc-actions__type"
      label="Type"
      :model-value="shell.query.value.entity ?? ''"
      :options="entityOptions"
      @open="entityCounts.refresh"
      @close="entityCounts.cancel"
      @update:model-value="chooseEntity"
    />

    <!-- And how they are drawn, wherever the host offers more than one way. -->
    <PickControl
      v-if="showViews"
      class="dc-actions__pick dc-actions__view"
      label="View"
      :model-value="view"
      :options="viewOptions"
      @update:model-value="chooseView"
    />

    <!-- And what they are ordered by, in every view but the table, whose own
         headings offer it with the column on screen under them. -->
    <span
      v-if="showOrder"
      class="dc-actions__order"
    >
      <PickControl
        v-if="showSorts"
        class="dc-actions__pick dc-actions__sort"
        label="Sort"
        :model-value="shell.sort.value.key"
        :options="sortOptions"
        @update:model-value="shell.setSort"
      />
      <button
        type="button"
        class="dc-actions__dir"
        :aria-label="directionLabel"
        :title="directionLabel"
        @click="shell.toggleDirection()"
      >
        {{ descending ? '↓' : '↑' }}
      </button>
    </span>

    <div
      v-if="selecting && readout"
      class="dc-actions__select"
    >
      <!-- The words are part of the control where the tick is here: pressing
           them ticks the page, which is what a label around a checkbox is
           for. Where the table's header holds the tick they are the count
           alone. -->
      <label
        v-if="!tickInHeader"
        class="dc-actions__all"
      >
        <PageTick />
        <span
          class="dc-actions__count"
          aria-live="polite"
        >{{ readout }}</span>
      </label>
      <span
        v-else
        class="dc-actions__count dc-actions__all"
        aria-live="polite"
      >{{ readout }}</span>

      <!-- Only where there is something to clear, and it clears the ticks made
           on other pages too: the selection is one thing, wherever it was made. -->
      <button
        v-if="count"
        type="button"
        :class="['dc-actions__clear', { 'dc-actions__clear--op': selectionAtEnd }]"
        @click="shell.clearSelection()"
      >
        Clear
      </button>
    </div>

    <div class="dc-actions__ops">
      <!-- The same request the type's card on the home screen makes, from the
           type's own list: `create(entity)`, and the shell makes nothing. -->
      <button
        v-if="entity?.create"
        type="button"
        class="dc-actions__op dc-actions__new"
        @click="shell.create(entity)"
      >
        <span
          class="dc-actions__plus"
          aria-hidden="true"
        >+</span>
        {{ entity.create }}
      </button>

      <!-- Both of these operate on the ticks, so with none they have nothing to
           operate on and say so. That is a fact about the selection rather than
           the shell withholding anything — the same way the pager's ‹ is off at
           the first page. -->
      <button
        v-if="entity?.duplicate"
        type="button"
        class="dc-actions__op"
        :disabled="!count"
        @click="shell.duplicate()"
      >
        {{ opLabel(entity.duplicate) }}
      </button>

      <!-- The type's own words for anything else it does to a selection,
           between the copy and the one that cannot be taken back. -->
      <button
        v-for="operation in entity?.operations ?? []"
        :key="operation.key"
        type="button"
        class="dc-actions__op"
        :data-dc-operation="operation.key"
        :disabled="!count"
        @click="shell.operate(operation.key)"
      >
        {{ opLabel(operation.label) }}
      </button>

      <button
        v-if="entity?.delete"
        type="button"
        class="dc-actions__op dc-actions__danger"
        :disabled="!count"
        @click="shell.delete()"
      >
        {{ opLabel(entity.delete) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/*
 * A strip under the header and over the results, drawn as the header's quieter
 * sibling: the same hairline beneath it, and the surface the results sit on
 * rather than the bar's own.
 */
.dc-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  min-height: 38px;
  padding: 5px var(--dc-gutter);
  border-bottom: 1px solid var(--dc-line);
  background: var(--dc-bg-1);
  font-size: var(--dc-text-meta);
}

/* Set as the query's parts are set, being parts of the query too. */
.dc-actions__pick {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  font-size: var(--dc-text-code);
  cursor: pointer;
}

/* The sort and its direction, read as one control. */
.dc-actions__order {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
}

/* Drawn as the picker beside it is, at the size of the one glyph it holds. */
.dc-actions__dir {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  padding: 3px 6px;
  background: var(--dc-accent-bg);
  border: 1px solid var(--dc-accent-dim);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-accent);
  font-family: var(--dc-mono);
  font-size: var(--dc-text-code);
  line-height: 1.5;
  cursor: pointer;
}

.dc-actions__dir:hover {
  border-color: var(--dc-accent);
}

.dc-actions__select {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.dc-actions__all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--dc-fg-2);
}

label.dc-actions__all {
  cursor: pointer;
}

.dc-actions__count {
  white-space: nowrap;
}

.dc-actions__clear {
  padding: 2px 6px;
  border: none;
  background: transparent;
  color: var(--dc-fg-3);
  font-size: var(--dc-text-micro);
  cursor: pointer;
}

.dc-actions__clear:hover {
  color: var(--dc-fg-1);
}

/* At the far end, beside the operations: the space the ops would push across
   goes before the count instead, so the two read as one cluster. */
.dc-actions--selection-end .dc-actions__select {
  margin-left: auto;
}

.dc-actions--selection-end .dc-actions__select + .dc-actions__ops {
  margin-left: 0;
}

/* What to do, at the end of the bar: the far side from the records, so nothing
   destructive sits under the pointer on its way to a row. */
.dc-actions__ops {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.dc-actions__op,
.dc-actions__clear--op {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  background: var(--dc-bg-0);
  color: var(--dc-fg-1);
  font-size: var(--dc-text-meta);
  white-space: nowrap;
  cursor: pointer;
}

.dc-actions__op:hover:not(:disabled),
.dc-actions__clear--op:hover {
  background: var(--dc-bg-2);
  color: var(--dc-fg-0);
}

/* Nothing is ticked, so there is nothing for this to be for. */
.dc-actions__op:disabled {
  opacity: 0.4;
  cursor: default;
}

.dc-actions__new:hover {
  border-color: var(--dc-accent-dim);
  color: var(--dc-accent);
}

.dc-actions__plus {
  font-family: var(--dc-mono);
  color: var(--dc-fg-3);
}

.dc-actions__new:hover .dc-actions__plus {
  color: var(--dc-accent);
}

/*
 * The one operation that cannot be taken back reads as one — where the theme
 * has a colour for it. `minimal` sets `--dc-danger` to the ink it sets
 * everything else to, which is the point of that theme: the words say what the
 * button does.
 */
.dc-actions__danger:not(:disabled) {
  color: var(--dc-danger);
}

.dc-actions__danger:hover:not(:disabled) {
  border-color: var(--dc-danger);
  background: var(--dc-danger-bg);
  color: var(--dc-danger);
}

/* Narrow: the readout goes and the tick stays, the operations saying the count
   anyway once anything is ticked. */
@container (max-width: 560px) {
  .dc-actions__count {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}
</style>
