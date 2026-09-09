<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnDef } from '../../types'
import { useShellContext } from '../../composables/context'
import { useColumns } from '../../composables/useColumns'
import { usePresentedRows } from '../../composables/usePresentedRows'
import type { PresentedRow } from '../../composables/usePresentedRows'
import { cellFull, columnAlign, columnClass, columnKey, columnTruncates } from '../../query/columns'
import ColumnCell from './ColumnCell.vue'
import ScopeMark from './ScopeMark.vue'
import SelectTick from './SelectTick.vue'

const shell = useShellContext()
const rows = usePresentedRows()
/**
 * What the table shows, as data: the columns this scope declared, in order,
 * and nothing else. A scope that declared none has no table, since the shell
 * reads one out of nothing and keeps no set of its own to fall back on.
 */
const columns = useColumns()

/**
 * Whether a text cell may wrap, which is to say whether this table's rows are
 * already taller than a line of text: a column drawing a picture, or any
 * column that states a height, which is the same thing said in CSS. That
 * depth is paid for whether the words use it or not, so in such a table a
 * long value runs on to `--dc-table-lines` lines before it is cut short
 * rather than stopping at the end of the first.
 *
 * Every other table keeps the single line it always had. Wrapping there would
 * buy nothing and cost the one thing a table of one-line rows is for: rows
 * that are all the same depth, so the eye can run down a column.
 */
const wraps = computed(() =>
  columns.value.some((column) => column.kind === 'image' || column.height !== undefined),
)

/**
 * Clicking a header cell sorts by it, and clicking the active one reverses —
 * the same two operations the query panel offers, at the point of use.
 */
function sortBy(key: string | undefined) {
  if (!key) return
  if (shell.query.value.sort === key) shell.toggleDirection()
  else shell.setSort(key)
}

/** What to call the scope in the message above, which names what is missing. */
const scopeName = computed(() => shell.entity.value?.label ?? 'The result set')

/**
 * The sorts the entity actually offers. A column may name one the entity does
 * not declare — a set written for several types, a sort taken away — and its
 * header is then a label rather than a button, so the table never offers an
 * ordering the query has no way to hold.
 */
const sortable = computed(() => new Set(shell.sorts.value.map((sort) => sort.key)))

const isSortable = (column: ColumnDef) =>
  column.sort !== undefined && sortable.value.has(column.sort)

/**
 * Only a column that offers a sort says anything about one: `none` on a column
 * that cannot be sorted is a promise the header does not keep.
 */
const ariaSort = (column: ColumnDef) => {
  if (!isSortable(column)) return undefined
  if (shell.query.value.sort !== column.sort) return 'none'
  return shell.query.value.dir === 'desc' ? 'descending' : 'ascending'
}

/** The classes a cell wears for what its value *is*, rather than what it does. */
function cellClass(column: ColumnDef): string {
  return [
    columnClass(column),
    column.muted ? 'dc-table__muted' : '',
    column.mono ? 'dc-mono' : '',
    columnTruncates(column) ? 'dc-truncate' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

/**
 * The whole of a value, on hover: every digit of a number the cell rounded to
 * `1.3k`, and the rest of a name the width cut off. A pressable cell carries
 * its own — on the button, where the pointer actually is — so the cell around
 * it does not repeat it.
 */
function cellTitle(column: ColumnDef, entry: PresentedRow): string | undefined {
  if (!columnTruncates(column) || column.activate || column.click) return undefined
  return cellFull(column, entry.row)
}
</script>

<template>
  <!-- Said rather than drawn as a blank box: a table of no columns is a
       schema that has not described this type's table yet, and a silently
       empty frame reads as the data having gone missing. -->
  <p
    v-if="!columns.length"
    class="dc-table__none"
  >
    <span class="dc-table__headline">No columns declared</span>
    <span class="dc-table__detail">
      {{ scopeName }} has no <code>columns</code> in the schema, so there is no
      table to draw.
    </span>
  </p>

  <table
    v-else
    class="dc-table"
    :data-dc-wrap="wraps ? '' : undefined"
  >
    <thead>
      <tr>
        <!-- Not a column: the shell declares none, and this is an affordance
             rather than a field of the record — the same tick the other views
             put on a row, in the place a table has for it. The heading is for
             a screen reader, the control that ticks the page being on the bar
             above with the operations it is for. -->
        <th
          v-if="shell.selectable.value"
          class="dc-table__pick"
          scope="col"
        >
          <span class="dc-table__sr">Select</span>
        </th>
        <!-- The hint sits on the cell rather than on the button inside it, so
             a sortable header and a plain one answer a hover the same way. -->
        <th
          v-for="(column, index) in columns"
          :key="columnKey(column, index)"
          scope="col"
          :class="columnClass(column)"
          :style="{ width: column.width }"
          :data-dc-align="columnAlign(column)"
          :data-dc-hide="column.hideBelow"
          :aria-sort="ariaSort(column)"
          :title="column.hint"
        >
          <button
            v-if="isSortable(column)"
            type="button"
            class="dc-table__sort"
            @click="sortBy(column.sort)"
          >
            {{ column.label }}
          </button>
          <template v-else>
            {{ column.label }}
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="entry in rows"
        :key="entry.key"
        class="dc-table__row"
        @click="shell.activate(entry.row)"
      >
        <td
          v-if="shell.selectable.value"
          class="dc-table__pick"
        >
          <SelectTick
            :row="entry.row"
            :selected="entry.selected"
            :name="entry.parts.identity"
          />
        </td>
        <td
          v-for="(column, index) in columns"
          :key="columnKey(column, index)"
          :class="cellClass(column)"
          :data-dc-align="columnAlign(column)"
          :data-dc-hide="column.hideBelow"
          :title="cellTitle(column, entry)"
        >
          <!-- The narrowing arrow is a sibling of the value, not a wrapper
               around it: a mark that leads somewhere else cannot sit inside
               the button that opens this record. -->
          <span
            v-if="column.scope"
            class="dc-table__name"
          >
            <ColumnCell
              :column="column"
              :entry="entry"
            />
            <ScopeMark :entry="entry" />
          </span>
          <ColumnCell
            v-else
            :column="column"
            :entry="entry"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
/* Drawn exactly as the results area draws its own states — an empty result and
   a failed query already say themselves here, and this is a third of those. */
.dc-table__none {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  padding: 40px 24px;
}

.dc-table__headline {
  color: var(--dc-fg-1);
  font-size: var(--dc-text-title);
  font-weight: var(--dc-weight-semibold);
}

.dc-table__detail {
  color: var(--dc-fg-3);
  font-family: var(--dc-mono);
  font-size: var(--dc-text-meta);
}

/*
 * Fixed layout, because a table that lays itself out by its content is a table
 * that scrolls sideways: one long name or one long path and every other column
 * is pushed off the right edge, where the state and the date — the two things a
 * row is scanned for — are the first to go. Fixed hands each column the width
 * declared for it and lets the ones that declare none share the rest, so the
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

/* Held to the tick's own width, since `table-layout: fixed` shares out only
   what the columns did not claim. */
.dc-table th.dc-table__pick,
.dc-table td.dc-table__pick {
  width: 36px;
  padding-right: 0;
}

.dc-table__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
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

/* Where a column sits in its width. Numbers to the right, and everything else
   from the left, unless the column says otherwise. */
.dc-table [data-dc-align='right'] {
  text-align: right;
}

.dc-table [data-dc-align='center'] {
  text-align: center;
}

/* What a column *is*, as against what it holds: the four kinds the shell knows
   how to draw, plus the two the default set names for itself. */
.dc-table th.dc-table__num,
.dc-table td.dc-table__num {
  color: var(--dc-fg-3);
  font-size: var(--dc-text-meta);
}

.dc-table th.dc-table__number,
.dc-table td.dc-table__number {
  color: var(--dc-fg-2);
}

.dc-table th.dc-table__entity,
.dc-table td.dc-table__entity {
  color: var(--dc-fg-2);
  font-size: var(--dc-text-meta);
}

.dc-table__muted {
  color: var(--dc-fg-3);
  font-size: var(--dc-text-meta);
}

/* The value shrinks and the mark does not: whatever room is left over is the
   value's, and the arrow stays put at the end of it. */
.dc-table__name {
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}

/*
 * Where the rows are tall enough for the name to wrap, the mark beside it goes
 * to the first line rather than to the middle of however many there turn out
 * to be: it points at the record the name starts with, and a reader running
 * down the column finds both at the same height.
 */
.dc-table[data-dc-wrap] .dc-table__name {
  align-items: baseline;
}

/*
 * Columns leave in order of what a narrow table can do without, each at the
 * width its `hideBelow` names.
 *
 * Fixed layout keeps the declared widths whatever the shell's width is, so past
 * a point they are most of it and the name and the path are slivers. In the
 * default set the metrics go first — the list view drops them at the same size
 * — then the type, which the query itself usually says, then the date. The
 * name, the path and the state are what is left, and they are what a row is
 * for.
 *
 * A ladder of rungs rather than a number per column: this is a container query,
 * and a stylesheet cannot be handed an arbitrary breakpoint at runtime.
 */
@container (max-width: 1100px) {
  .dc-table [data-dc-hide='1100'] {
    display: none;
  }
}

@container (max-width: 900px) {
  .dc-table [data-dc-hide='900'] {
    display: none;
  }
}

@container (max-width: 760px) {
  .dc-table [data-dc-hide='760'] {
    display: none;
  }
}

@container (max-width: 620px) {
  .dc-table [data-dc-hide='620'] {
    display: none;
  }
}

@container (max-width: 480px) {
  .dc-table [data-dc-hide='480'] {
    display: none;
  }
}
</style>
