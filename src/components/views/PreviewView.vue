<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useShellContext } from '../../composables/context'
import { usePresentedRows } from '../../composables/usePresentedRows'
import { roleColumn } from '../../query/columns'
import StatusPill from '../StatusPill.vue'
import MetricDrill from './MetricDrill.vue'
import PinStar from './PinStar.vue'
import ScopeMark from './ScopeMark.vue'
import SelectTick from './SelectTick.vue'

const shell = useShellContext()
const rows = usePresentedRows()

const index = ref(0)

// A new result set invalidates the cursor; clamp rather than reset so paging
// through a live-updating list does not jump back to the top.
watch(rows, (list) => {
  if (index.value > list.length - 1) index.value = Math.max(0, list.length - 1)
})

const current = computed(() => rows.value[index.value])

/**
 * The record, field by field, in its own type's vocabulary — so a preview
 * reads as that type even when the result set is of mixed kinds.
 *
 * The reference, then every number the type declared, then the date. A number
 * carries its column so it renders as the drill it may be rather than as text.
 */
const fields = computed(() => {
  const entry = current.value
  if (!entry) return []
  const reference = roleColumn(entry.columns, 'reference')
  const updated = roleColumn(entry.columns, 'updated')
  return [
    ...(reference
      ? [{ key: reference.label ?? 'Reference', value: entry.parts.reference, column: null }]
      : []),
    ...entry.parts.metrics.map((metric) => ({
      key: metric.label,
      value: metric.text,
      column: metric.column,
    })),
    ...(updated ? [{ key: updated.label ?? 'Updated', value: entry.parts.updated, column: null }] : []),
  ]
})

/**
 * The pager counts what has been loaded, and says so when the query matched
 * more than the page holds — otherwise "1 / 50" looks like the whole corpus.
 */
const position = computed(() => {
  if (!rows.value.length) return '0 / 0'
  const of = shell.total.value > rows.value.length ? ` of ${shell.total.value}` : ''
  return `${index.value + 1} / ${rows.value.length}${of}`
})

const step = (delta: number) => {
  const count = rows.value.length
  if (!count) return
  index.value = Math.min(count - 1, Math.max(0, index.value + delta))
}
</script>

<template>
  <div class="dc-preview">
    <div class="dc-preview__pager dc-mono">
      <button
        type="button"
        class="dc-preview__step"
        aria-label="Previous result"
        :disabled="index === 0"
        @click="step(-1)"
      >
        ‹
      </button>
      <span aria-live="polite">{{ position }}</span>
      <button
        type="button"
        class="dc-preview__step"
        aria-label="Next result"
        :disabled="index >= rows.length - 1"
        @click="step(1)"
      >
        ›
      </button>
    </div>

    <div
      v-if="current"
      class="dc-preview__card"
    >
      <div
        class="dc-preview__media"
        :style="{ background: current.parts.tint ?? undefined }"
        aria-hidden="true"
      >
        preview
      </div>
      <div class="dc-preview__body">
        <div class="dc-preview__top">
          <span class="dc-preview__badges">
            <!-- One record at a time here, so the tick is for the one on
                 screen; the count on the bar above is of all of them. -->
            <SelectTick
              v-if="shell.selectable.value"
              :row="current.row"
              :selected="current.selected"
              :name="current.parts.identity"
            />
            <StatusPill
              v-if="current.parts.state"
              :status="current.parts.state"
            />
            <!-- Preview is the home view, where records are of mixed kinds, so
                 each one says which it is. -->
            <span class="dc-preview__entity dc-mono">{{ current.entityLabel }}</span>
          </span>
          <span class="dc-preview__marks">
            <ScopeMark :entry="current" />
            <PinStar
              v-if="shell.pinnable.value"
              :row="current.row"
              :name="current.parts.identity"
              :pinned="current.pinned"
            />
          </span>
        </div>
        <div>
          <div class="dc-preview__primary">
            {{ current.parts.identity }}
          </div>
          <div class="dc-preview__secondary dc-mono">
            {{ current.parts.reference }}
          </div>
        </div>
        <dl class="dc-preview__fields">
          <div
            v-for="field in fields"
            :key="field.key"
            class="dc-preview__field"
          >
            <dt class="dc-preview__key">
              {{ field.key }}
            </dt>
            <dd class="dc-preview__value dc-mono">
              <MetricDrill
                v-if="field.column && current"
                :entry="current"
                :column="field.column"
              />
              <template v-else>
                {{ field.value }}
              </template>
            </dd>
          </div>
        </dl>
        <button
          type="button"
          class="dc-preview__open"
          @click="shell.activate(current.row)"
        >
          Open record →
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Preview is the home view, so it fills the content area rather than sitting
   as a short card at the top of an empty screen. */
.dc-preview {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100%;
  padding: 16px;
}

.dc-preview__pager {
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 10px;
  font-size: var(--dc-text-meta);
  color: var(--dc-fg-2);
}

.dc-preview__step {
  padding: 4px 10px;
  background: var(--dc-bg-2);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-1);
  cursor: pointer;
}

.dc-preview__step:disabled {
  opacity: 0.4;
  cursor: default;
}

.dc-preview__card {
  display: grid;
  grid-template-columns: minmax(280px, 0.8fr) 1fr;
  flex: 1;
  min-height: 340px;
  background: var(--dc-bg-1);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-lg);
  overflow: hidden;
}

.dc-preview__media {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--dc-line);
  color: color-mix(in oklab, var(--dc-scrim-fg) 40%, transparent);
  font-family: var(--dc-mono);
  font-size: var(--dc-text-micro);
  text-transform: var(--dc-caps);
  letter-spacing: var(--dc-tracking-caps-wider);
}

.dc-preview__body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  padding: 20px 22px;
}

.dc-preview__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.dc-preview__marks {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.dc-preview__badges {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dc-preview__entity {
  padding: 2px 8px;
  border: 1px solid var(--dc-line);
  border-radius: 999px;
  color: var(--dc-fg-2);
  font-size: var(--dc-text-micro);
}

.dc-preview__primary {
  font-size: var(--dc-text-hero);
  font-weight: var(--dc-weight-bold);
  line-height: var(--dc-leading-hero);
  letter-spacing: var(--dc-tracking-hero);
}

.dc-preview__secondary {
  margin-top: 6px;
  font-size: var(--dc-text-meta);
  color: var(--dc-accent);
  word-break: break-all;
}

/* Fields sit under the title rather than pinned to the bottom: the card grows
   to fill the screen, and bottom-alignment would strand them below a void. */
.dc-preview__fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  margin: 0;
}

.dc-preview__field {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.dc-preview__key {
  font-size: var(--dc-text-eyebrow);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-3);
  text-transform: var(--dc-caps);
  letter-spacing: var(--dc-tracking-caps);
}

.dc-preview__value {
  margin: 0;
  font-size: var(--dc-text-body);
  color: var(--dc-fg-0);
}

.dc-preview__open {
  align-self: flex-start;
  margin-top: auto;
  padding: 7px 14px;
  background: var(--dc-bg-2);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-0);
  font-weight: var(--dc-weight-medium);
  cursor: pointer;
}

.dc-preview__open:hover {
  background: var(--dc-bg-3);
}

@container (max-width: 700px) {
  .dc-preview__card {
    grid-template-columns: 1fr;
  }

  .dc-preview__media {
    min-height: 160px;
    border-right: none;
    border-bottom: 1px solid var(--dc-line);
  }
}
</style>
