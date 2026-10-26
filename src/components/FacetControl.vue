<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { FacetDef, FacetValue } from '../types'

const props = defineProps<{ facet: FacetDef; value: FacetValue }>()
const emit = defineEmits<{ update: [value: FacetValue] }>()

const selected = computed(() =>
  props.value.kind === 'chips' ? new Set(props.value.selected) : new Set<string>(),
)

function toggleChip(option: string) {
  if (props.value.kind !== 'chips') return
  const next = selected.value.has(option)
    ? props.value.selected.filter((item) => item !== option)
    : [...props.value.selected, option]
  emit('update', { kind: 'chips', selected: next })
}

/* Range bounds are edited as drafts so a half-typed number does not navigate
   on every keystroke; they commit on change, blur or Enter.

   The drafts are `string | number` rather than `string`: Vue's `v-model`
   coerces the value of a `type="number"` input to a number on its own, so the
   ref holds whichever the last write produced. */
type RangeDraft = string | number

const minDraft = ref<RangeDraft>('')
const maxDraft = ref<RangeDraft>('')

watch(
  () => props.value,
  (value) => {
    if (value.kind !== 'range') return
    minDraft.value = value.min === null ? '' : value.min
    maxDraft.value = value.max === null ? '' : value.max
  },
  { immediate: true, deep: true },
)

function parseBound(raw: RangeDraft): number | null {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null
  const trimmed = raw.trim()
  if (!trimmed) return null
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : null
}

function commitRange() {
  if (props.value.kind !== 'range') return
  const min = parseBound(minDraft.value)
  const max = parseBound(maxDraft.value)
  if (min === props.value.min && max === props.value.max) return
  emit('update', { kind: 'range', min, max })
}

/**
 * The cap a chips facet asks for, as a whole number of rows, or null for none
 * — see {@link ChipsFacet.maxRows}. Nothing below one is a cap anyone meant.
 */
const maxRows = computed<number | null>(() => {
  if (props.facet.kind !== 'chips' || props.facet.maxRows === undefined) return null
  const rows = Math.floor(props.facet.maxRows)
  return Number.isFinite(rows) && rows >= 1 ? rows : null
})

/** Which end a chip's value is cut at, if it is — see {@link ChipsFacet.truncate}. */
const truncate = computed(() => (props.facet.kind === 'chips' ? props.facet.truncate : undefined))

function flip() {
  if (props.value.kind !== 'toggle') return
  emit('update', { kind: 'toggle', on: !props.value.on })
}
</script>

<template>
  <div class="dc-facet">
    <span
      :id="`dc-facet-${facet.key}`"
      class="dc-facet__label"
    >{{ facet.label }}</span>

    <div class="dc-facet__body">
      <div
        v-if="facet.kind === 'chips' && value.kind === 'chips'"
        class="dc-facet__chips"
        role="group"
        :aria-labelledby="`dc-facet-${facet.key}`"
        :data-dc-max-rows="maxRows ?? undefined"
        :data-dc-truncate="truncate"
        :style="maxRows ? { '--dc-facet-rows': maxRows } : undefined"
      >
        <button
          v-for="option in facet.options"
          :key="option"
          type="button"
          class="dc-chip"
          :aria-pressed="selected.has(option)"
          :data-dc-active="selected.has(option) ? 'true' : 'false'"
          :title="truncate ? option : undefined"
          @click="toggleChip(option)"
        >
          {{ option }}
        </button>
      </div>

      <div
        v-else-if="facet.kind === 'range' && value.kind === 'range'"
        class="dc-facet__range"
        role="group"
        :aria-labelledby="`dc-facet-${facet.key}`"
      >
        <input
          v-model="minDraft"
          class="dc-input dc-mono"
          type="number"
          inputmode="numeric"
          :aria-label="`${facet.label} minimum`"
          :placeholder="String(facet.min)"
          @change="commitRange"
          @blur="commitRange"
          @keydown.enter.prevent="commitRange"
        >
        <span
          class="dc-facet__dash"
          aria-hidden="true"
        >–</span>
        <input
          v-model="maxDraft"
          class="dc-input dc-mono"
          type="number"
          inputmode="numeric"
          :aria-label="`${facet.label} maximum`"
          :placeholder="String(facet.max)"
          @change="commitRange"
          @blur="commitRange"
          @keydown.enter.prevent="commitRange"
        >
      </div>

      <button
        v-else-if="facet.kind === 'toggle' && value.kind === 'toggle'"
        type="button"
        class="dc-switch"
        role="switch"
        :aria-checked="value.on"
        @click="flip"
      >
        <span class="dc-switch__text">{{ facet.text }}</span>
        <span
          class="dc-switch__track"
          :data-dc-active="value.on ? 'true' : 'false'"
          aria-hidden="true"
        >
          <span class="dc-switch__knob" />
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* One row of the panel's label/control grid: the title in the first column,
   everything the facet is edited with in the second. Standing on its own —
   outside that grid — `subgrid` is `none`, and the two stack as they did. */
.dc-facet {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  align-items: baseline;
  row-gap: 7px;
}

/* A facet's controls sit in one row that wraps, so a long set of chips runs
   on to a second line rather than widening the panel. */
.dc-facet__body {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 14px;
  min-width: 0;
}

.dc-facet__label {
  font-size: var(--dc-text-micro);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-1);
  white-space: nowrap;
}

.dc-facet__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.dc-chip {
  padding: 4px 10px;
  border: 1px solid var(--dc-line);
  border-radius: 999px;
  background: var(--dc-bg-1);
  color: var(--dc-fg-2);
  font-family: var(--dc-mono);
  font-size: var(--dc-text-code);
  font-weight: var(--dc-weight-medium);
  cursor: pointer;
}

.dc-chip:hover {
  border-color: var(--dc-line-2);
  color: var(--dc-fg-1);
}

.dc-chip[data-dc-active='true'] {
  background: var(--dc-accent-bg);
  border-color: var(--dc-accent-dim);
  color: var(--dc-accent);
}

/*
 * A facet capped at a number of rows (`maxRows`) scrolls past them.
 *
 * The height is a whole number of chips, so the cut falls between two rows
 * rather than through one. A chip is a line of its text, 4px of padding above
 * and below and a 1px border each side; rows are 5px apart. The line is read
 * as `1lh` of this box, which is set in the chip's own type for exactly that
 * — the chips set theirs, so the box's own is not drawn anywhere — and so the
 * cap follows a theme or a token that changes the type.
 */
.dc-facet__chips[data-dc-max-rows] {
  max-height: calc(
    var(--dc-facet-rows) * (1lh + 10px) + (var(--dc-facet-rows) - 1) * 5px
  );
  overflow-y: auto;
  overscroll-behavior: contain;
  font-family: var(--dc-mono);
  font-size: var(--dc-text-code);
}

/*
 * And the cut says that it is one.
 *
 * A cap that hides options silently is worse than a tall panel: twenty hosts
 * would read as six. Overlay scrollbars are invisible until the pointer is in
 * the box, so the edge with more behind it is softened instead. Which edge
 * that is is the scroll position, so it comes from a scroll timeline — and a
 * facet that fits has no scrollable overflow, so no timeline, so no fade: both
 * lengths stay at the 0 they are registered with, and a gradient 0px long is
 * not a gradient at all.
 *
 * Only where motion is welcome: under `reduce` the shell caps every animation
 * at 0.01ms, which on a timeline puts all of it on the first pixel of scroll.
 */
@property --dc-facet-cue-top {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --dc-facet-cue-bottom {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@keyframes dc-facet-cue {
  from {
    --dc-facet-cue-top: 0px;
    --dc-facet-cue-bottom: 22px;
  }

  to {
    --dc-facet-cue-top: 22px;
    --dc-facet-cue-bottom: 0px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .dc-facet__chips[data-dc-max-rows] {
    mask-image:
      linear-gradient(to bottom, transparent, #000 var(--dc-facet-cue-top)),
      linear-gradient(to top, transparent, #000 var(--dc-facet-cue-bottom));
    mask-composite: intersect;
    animation: dc-facet-cue linear both;
    animation-timeline: scroll(self);
  }
}

/*
 * One line per chip (`truncate`), never wider than the facet, ellipsised at
 * the end the facet names — the whole value on hover.
 */
.dc-facet__chips[data-dc-truncate] {
  min-width: 0;
}

.dc-facet__chips[data-dc-truncate] .dc-chip {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*
 * Cut at the start, the chip is set right to left, which is all that moves
 * the ellipsis to the head of the value; the text is still one left-to-right
 * run. The marks either side keep it one: a `/` at the end of a URL is
 * neutral, and in a right-to-left line a neutral at the edge goes with the
 * line rather than the text — it would be drawn at the far end. Between two
 * left-to-right marks it is part of the run it was written in.
 */
.dc-facet__chips[data-dc-truncate='start'] .dc-chip {
  direction: rtl;
}

.dc-facet__chips[data-dc-truncate='start'] .dc-chip::before,
.dc-facet__chips[data-dc-truncate='start'] .dc-chip::after {
  content: '\200E';
}

.dc-facet__range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dc-facet__dash {
  color: var(--dc-fg-3);
  font-size: var(--dc-text-meta);
}

/* Wide enough for a bound and no wider: in a row of its own the pair would
   otherwise stretch the width of the panel. */
.dc-input {
  width: 11ch;
  min-width: 0;
  padding: 6px 10px;
  background: var(--dc-bg-0);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  color: var(--dc-fg-0);
  font-size: var(--dc-text-meta);
  outline: none;
}

.dc-input:focus {
  border-color: var(--dc-accent-dim);
}

.dc-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 7px 11px;
  background: var(--dc-bg-0);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  color: var(--dc-fg-1);
  font-size: var(--dc-text-meta);
  text-align: left;
  cursor: pointer;
}

.dc-switch:hover {
  border-color: var(--dc-line-2);
}

.dc-switch__track {
  position: relative;
  flex: 0 0 auto;
  width: 34px;
  height: 19px;
  border: 1px solid var(--dc-line);
  border-radius: 999px;
  background: var(--dc-bg-3);
}

.dc-switch__track[data-dc-active='true'] {
  background: var(--dc-accent);
  border-color: var(--dc-accent);
}

.dc-switch__knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 13px;
  height: 13px;
  border-radius: 999px;
  background: var(--dc-fg-1);
  transition: transform 0.18s;
}

.dc-switch__track[data-dc-active='true'] .dc-switch__knob {
  background: var(--dc-accent-contrast);
  transform: translateX(15px);
}
</style>
