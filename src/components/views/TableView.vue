<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'
import { usePresentedRows, useViewLabels } from '../../composables/usePresentedRows'
import StatusPill from '../StatusPill.vue'

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
          <button
            type="button"
            class="dc-table__open"
            @click.stop="shell.activate(entry.row)"
          >
            {{ entry.row.primary }}
          </button>
        </td>
        <td class="dc-table__muted dc-mono">
          {{ entry.row.secondary }}
        </td>
        <td
          v-if="showEntity"
          class="dc-table__entity dc-mono"
        >
          {{ entry.entityLabel }}
        </td>
        <td class="dc-table__number dc-mono">
          {{ entry.metric1 }}
        </td>
        <td class="dc-table__number dc-mono">
          {{ entry.metric2 }}
        </td>
        <td class="dc-table__muted dc-mono">
          {{ entry.date }}
        </td>
        <td><StatusPill :status="entry.row.status" /></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.dc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--dc-text-body);
}

.dc-table th {
  padding: 10px 12px;
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

.dc-table__open:hover {
  text-decoration: underline;
}
</style>
