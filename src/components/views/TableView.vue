<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'
import { usePresentedRows, useViewLabels } from '../../composables/usePresentedRows'
import StatusPill from '../StatusPill.vue'
import MetricDrill from './MetricDrill.vue'
import ScopeMark from './ScopeMark.vue'

const shell = useShellContext()
const rows = usePresentedRows()
const labels = useViewLabels()
/* Across every entity, a row's kind is the column that tells you most. */
const showEntity = computed(() => shell.isEverything.value)

/**
 * Clicking a header cell sorts by it, and clicking the active one reverses —
 * the same two operations the query panel offers, at the point of use.
 */
function sortBy(key: string) {
  if (shell.query.value.sort === key) shell.toggleDirection()
  else shell.setSort(key)
}

const ariaSort = (key: string) => {
  if (shell.query.value.sort !== key) return 'none'
  return shell.query.value.dir === 'desc' ? 'descending' : 'ascending'
}

const sortable = computed(() => new Set(shell.sorts.value.map((sort) => sort.key)))
</script>

<template>
  <table class="dc-table">
    <thead>
      <tr>
        <th
          class="dc-table__num"
          scope="col"
        >
          #
        </th>
        <th
          scope="col"
          :aria-sort="ariaSort('name')"
        >
          <button
            v-if="sortable.has('name')"
            type="button"
            class="dc-table__sort"
            @click="sortBy('name')"
          >
            {{ labels.primary }}
          </button>
          <template v-else>
            {{ labels.primary }}
          </template>
        </th>
        <th scope="col">
          {{ labels.secondary }}
        </th>
        <th
          v-if="showEntity"
          class="dc-table__entity"
          scope="col"
        >
          Entity
        </th>
        <th
          class="dc-table__number"
          scope="col"
          :aria-sort="ariaSort('metric1')"
        >
          <button
            v-if="sortable.has('metric1')"
            type="button"
            class="dc-table__sort"
            @click="sortBy('metric1')"
          >
            {{ labels.metric1 }}
          </button>
          <template v-else>
            {{ labels.metric1 }}
          </template>
        </th>
        <th
          class="dc-table__number"
          scope="col"
          :aria-sort="ariaSort('metric2')"
        >
          <button
            v-if="sortable.has('metric2')"
            type="button"
            class="dc-table__sort"
            @click="sortBy('metric2')"
          >
            {{ labels.metric2 }}
          </button>
          <template v-else>
            {{ labels.metric2 }}
          </template>
        </th>
        <th
          class="dc-table__date"
          scope="col"
          :aria-sort="ariaSort('updated')"
        >
          <button
            v-if="sortable.has('updated')"
            type="button"
            class="dc-table__sort"
            @click="sortBy('updated')"
          >
            Updated
          </button>
          <template v-else>
            Updated
          </template>
        </th>
        <th
          class="dc-table__state"
          scope="col"
        >
          State
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="entry in rows"
        :key="entry.row.id"
        class="dc-table__row"
        @click="shell.activate(entry.row)"
      >
        <td class="dc-table__num dc-mono">
          {{ entry.ordinal }}
        </td>
        <td class="dc-table__primary">
          <div class="dc-table__name">
            <button
              type="button"
              class="dc-table__open dc-truncate"
              :title="entry.row.primary"
              @click.stop="shell.activate(entry.row)"
            >
              {{ entry.row.primary }}
            </button>
            <ScopeMark :entry="entry" />
          </div>
        </td>
        <td
          class="dc-table__muted dc-truncate dc-mono"
          :title="entry.row.secondary"
        >
          {{ entry.row.secondary }}
        </td>
        <td
          v-if="showEntity"
          class="dc-table__entity dc-truncate dc-mono"
        >
          {{ entry.entityLabel }}
        </td>
        <td class="dc-table__number dc-mono">
          <MetricDrill
            :entry="entry"
            metric="metric1"
          />
        </td>
        <td class="dc-table__number dc-mono">
          <MetricDrill
            :entry="entry"
            metric="metric2"
          />
        </td>
        <td class="dc-table__muted dc-table__date dc-mono">
          {{ entry.date }}
        </td>
        <td><StatusPill :status="entry.row.status" /></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
/*
 * Fixed layout, because a table that lays itself out by its content is a table
 * that scrolls sideways: one long name or one long path and every other column
 * is pushed off the right edge, where the state and the date — the two things a
 * row is scanned for — are the first to go. Fixed hands each column the width
 * declared for it below and lets the two open-ended ones share the rest, so the
 * table is exactly as wide as the shell however long a value gets. What no
 * longer fits is truncated with the whole of it on hover.
 */
.dc-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: var(--dc-text-body);
}

.dc-table th {
  padding: 10px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid var(--dc-line);
  background: var(--dc-bg-1);
  color: var(--dc-fg-2);
  font-size: var(--dc-text-micro);
  font-weight: var(--dc-weight-semibold);
  text-align: left;
  text-transform: var(--dc-caps);
  letter-spacing: var(--dc-tracking-caps);
  white-space: nowrap;
}

.dc-table td {
  padding: 9px 12px;
  border-bottom: 1px solid var(--dc-line);
  white-space: nowrap;
}

.dc-table__row {
  cursor: pointer;
}

.dc-table__row:hover {
  background: var(--dc-bg-1);
}

.dc-table__sort {
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  cursor: pointer;
}

.dc-table__sort:hover {
  color: var(--dc-fg-0);
}

.dc-table th[aria-sort='descending'] .dc-table__sort::after {
  content: ' ↓';
}

.dc-table th[aria-sort='ascending'] .dc-table__sort::after {
  content: ' ↑';
}

.dc-table th.dc-table__num,
.dc-table td.dc-table__num {
  width: 52px;
  text-align: right;
  color: var(--dc-fg-3);
  font-size: var(--dc-text-meta);
}

.dc-table th.dc-table__number,
.dc-table td.dc-table__number {
  width: 110px;
  text-align: right;
  color: var(--dc-fg-2);
}

.dc-table__date {
  width: 120px;
}

.dc-table th.dc-table__entity,
.dc-table td.dc-table__entity {
  width: 130px;
  color: var(--dc-fg-2);
  font-size: var(--dc-text-meta);
}

.dc-table__state {
  width: 110px;
}

.dc-table__muted {
  color: var(--dc-fg-3);
  font-size: var(--dc-text-meta);
}

.dc-table__open {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--dc-accent);
  font: inherit;
  font-weight: var(--dc-weight-medium);
  text-align: left;
  cursor: pointer;
}

/* The name shrinks and the mark does not: whatever room is left over is the
   name's, and the arrow stays put at the end of it. */
.dc-table__name {
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}

.dc-table__open:hover {
  text-decoration: underline;
}

/*
 * Columns leave in order of what a narrow table can do without.
 *
 * Fixed layout keeps the declared widths whatever the shell's width is, so past
 * a point they are most of it and the name and the path are slivers. The metrics
 * go first — the list view drops them at the same size — then the type, which
 * the query itself usually says, then the date. The name, the path and the state
 * are what is left, and they are what a row is for.
 */
@container (max-width: 900px) {
  .dc-table th.dc-table__entity,
  .dc-table td.dc-table__entity {
    display: none;
  }
}

@container (max-width: 760px) {
  .dc-table th.dc-table__number,
  .dc-table td.dc-table__number {
    display: none;
  }
}

@container (max-width: 620px) {
  .dc-table th.dc-table__date,
  .dc-table td.dc-table__date {
    display: none;
  }
}
</style>
