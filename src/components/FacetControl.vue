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
      >
        <button
          v-for="option in facet.options"
          :key="option"
          type="button"
          class="dc-chip"
          :aria-pressed="selected.has(option)"
          :data-dc-active="selected.has(option) ? 'true' : 'false'"
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
