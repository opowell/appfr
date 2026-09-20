<script setup lang="ts">
import { computed } from 'vue'
import type { ViewKind } from '../types'
import { useShellContext } from '../composables/context'
import { isTypeCardsQuery, resolveView } from '../query/schema'
import PageTick from './views/PageTick.vue'

/**
 * What can be done with the records of the type being listed: make one, tick
 * some, and copy or delete what is ticked.
 *
 * The bar over the results rather than a menu on each row, because three of
 * the four are about a *set* of records — and the fourth, making one, is what
 * you reach for from the same place, having found there is nothing here yet.
 *
 * Every one of them is named by the entity rather than assumed: a type that
 * says nothing about deleting is a type that is not deleted from here, and the
 * bar is one control shorter. A type that says nothing at all has no bar.
 */
const props = defineProps<{
  /** The views on offer, as `DataShell` was told them — see `ResultsArea`. */
  views?: ViewKind[]
}>()

const shell = useShellContext()

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
const records = computed(() => !isTypeCardsQuery(shell.query.value))

const selecting = computed(() => records.value && shell.selectable.value)

/**
 * Whether the tick that takes the page is the table's rather than the bar's.
 * A table has a header row, and a tick over the column of ticks it speaks for
 * is where a reader of tables looks for it; the other views have no such row,
 * so theirs stays at the head of the bar. The count and the way to clear it
 * are of the whole selection, and stay on the bar whichever view it is.
 */
const tickInHeader = computed(
  () => resolveView(shell.query.value.view, props.views) === 'table',
)

const offered = computed(
  () =>
    records.value &&
    (selecting.value ||
      Boolean(entity.value?.create || entity.value?.duplicate || entity.value?.delete)),
)

/* ---------------------------------------------------------- what is ticked */

/** How many records are ticked, on this page and every other. */
const count = computed(() => shell.selection.value.ids.length)

/**
 * What the tick says it is counting. The number is of the whole selection
 * rather than of the page, because that is what the operations beside it are
 * for: ticks survive paging, and a delete would take the lot. With nothing
 * ticked the words are the tick's own label where the tick is here, and a
 * plain reading of the state where it is in the table's header — so the bar
 * says the same thing at the same place whichever view is showing, and the
 * rows never move when the first tick is made.
 */
const readout = computed(() => {
  if (count.value) return `${count.value} selected`
  return tickInHeader.value ? 'None selected' : 'Select all'
})

/** An operation says how many it is for, once there are any. */
function opLabel(label: string): string {
  return count.value ? `${label} ${count.value}` : label
}
</script>

<template>
  <div
    v-if="offered"
    class="dc-actions"
  >
    <div
      v-if="selecting"
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
        class="dc-actions__clear"
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
  padding: 5px 16px;
  border-bottom: 1px solid var(--dc-line);
  background: var(--dc-bg-1);
  font-size: var(--dc-text-meta);
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
  text-decoration: underline;
  cursor: pointer;
}

.dc-actions__clear:hover {
  color: var(--dc-fg-1);
}

/* What to do, at the end of the bar: the far side from the records, so nothing
   destructive sits under the pointer on its way to a row. */
.dc-actions__ops {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.dc-actions__op {
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

.dc-actions__op:hover:not(:disabled) {
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
