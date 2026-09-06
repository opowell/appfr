<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { FacetValue, ViewKind } from '../types'
import { VIEW_KINDS } from '../types'
import { useShellContext } from '../composables/context'
import { formatTerm, joinExpression, splitExpression } from '../data/expression'
import FacetControl from './FacetControl.vue'
import SegmentedControl from './SegmentedControl.vue'

const props = defineProps<{
  panelId: string
  /** Views to offer. Defaults to all six. */
  views?: ViewKind[]
}>()

const emit = defineEmits<{ close: [] }>()

const slots = defineSlots<{
  /**
   * A section of the host application's own, after the panel's. The section
   * element and its rules are the panel's, so it sits flush with the rest;
   * what goes inside it is the host's business.
   */
  'panel-section'?: () => unknown
}>()

const shell = useShellContext()

const VIEW_LABELS: Record<ViewKind, string> = {
  list: 'List',
  cards: 'Cards',
  grid: 'Grid',
  table: 'Table',
  links: 'Links',
  preview: 'Preview',
}

const viewOptions = computed(() =>
  (props.views ?? [...VIEW_KINDS]).map((key) => ({ key, label: VIEW_LABELS[key] })),
)

const sortOptions = computed(() =>
  shell.sorts.value.map((sort) => ({ key: sort.key, label: sort.label })),
)

/*
 * The expression, in the two halves this panel edits it as: the constraints it
 * already names, and the text beside them. A `field:value` term is a whole
 * constraint on its own — most of them were written by a drill rather than
 * typed — so each is shown as a part that comes out when it is pressed, and
 * the box is left for what a person writes: the words to look for, or the next
 * part to add.
 */
const expression = computed(() => splitExpression(shell.query.value.expr))

/** Each part, as the source it parses back to — which is what its button says. */
const parts = computed(() => expression.value.parts.map(formatTerm))

/* The text is edited as a draft. Committing on every keystroke would put a
   history entry behind each character; it commits on Run or Enter. The parts
   are not typed, so they commit as they are pressed. */
const draft = ref(expression.value.text)
const expressionField = ref<HTMLInputElement | null>(null)

/* The text half rather than the whole expression: taking a part out changes
   only the other half, and what someone is halfway through typing beside the
   parts should live through that. */
watch(
  () => expression.value.text,
  (text) => {
    draft.value = text
  },
)

const dirty = computed(() => draft.value !== expression.value.text)

function run() {
  // The parts are committed as they are pressed, so the text is the only thing
  // ever pending here — and rewriting an expression nobody has touched would
  // push a history entry for a query that has not changed.
  if (dirty.value) shell.setExpression(joinExpression(expression.value.parts, draft.value))
  emit('close')
}

/** Lifts one part, leaving the text beside it — draft and all — as it stands. */
function removePart(at: number) {
  const { parts: current, text } = expression.value
  shell.setExpression(joinExpression(current.filter((_, index) => index !== at), text))
}

/* An empty box backspaces into the parts in front of it, as a field made of
   parts is expected to. */
function backspace(event: KeyboardEvent) {
  const { parts: current } = expression.value
  if (draft.value || !current.length) return
  event.preventDefault()
  removePart(current.length - 1)
}

function reset() {
  draft.value = ''
  shell.clearFilters()
}

function onFacetUpdate(key: string, value: FacetValue) {
  shell.setFacet(key, value)
}

// Focus the expression field on open: the panel exists to edit the query, and
// the query starts with its expression.
void nextTick(() => expressionField.value?.focus())
</script>

<template>
  <div
    :id="panelId"
    class="dc-panel"
    role="dialog"
    aria-label="Query"
    @keydown.esc.stop="emit('close')"
  >
    <section class="dc-panel__section dc-panel__rows">
      <div class="dc-panel__row">
        <label
          class="dc-panel__field-label"
          :for="`${panelId}-expr`"
        >Expression</label>

        <!-- The parts and the box are one field: what the query already names
             stands in front, each part a button that takes itself out, and the
             box is where the next one is written. -->
        <div
          class="dc-field"
          @mousedown.self.prevent="expressionField?.focus()"
        >
          <button
            v-for="(part, at) in parts"
            :key="`${at}:${part}`"
            type="button"
            class="dc-part dc-mono"
            :title="`Remove ${part}`"
            :aria-label="`Remove ${part}`"
            @click="removePart(at)"
          >
            {{ part }}
          </button>

          <input
            :id="`${panelId}-expr`"
            ref="expressionField"
            v-model="draft"
            class="dc-expression dc-mono"
            type="text"
            autocomplete="off"
            spellcheck="false"
            :placeholder="parts.length ? '' : shell.schema.value.placeholder"
            @keydown.enter.prevent="run"
            @keydown.backspace="backspace"
          >
        </div>
      </div>

      <!-- Each facet is a row of its own, so its title lines up under the
           expression's and its control starts where the expression does. -->
      <template v-if="shell.entity.value">
        <FacetControl
          v-for="facet in shell.entity.value.facets"
          :key="facet.key"
          :facet="facet"
          :value="shell.query.value.facets[facet.key]!"
          @update="onFacetUpdate(facet.key, $event)"
        />
      </template>

      <!-- The entity picker is part of the query, not a topic beside it:
           narrowing to an entity is what gives the facets above something to
           filter, so the two are read as one. -->
      <div class="dc-panel__row">
        <span
          :id="`${panelId}-entities`"
          class="dc-panel__field-label"
        >Entities</span>

        <div
          class="dc-panel__entities"
          role="group"
          :aria-labelledby="`${panelId}-entities`"
        >
          <!-- Lifting the entity filter is an option beside the entities, not a
               separate control: "everything" is just no filter. -->
          <button
            type="button"
            class="dc-entity dc-entity--all"
            :data-dc-active="shell.isEverything.value ? 'true' : 'false'"
            :aria-current="shell.isEverything.value ? 'true' : undefined"
            @click="shell.clearEntity()"
          >
            <span class="dc-entity__label">Everything</span>
            <span class="dc-entity__count dc-mono">{{ shell.entities.value.length }} kinds</span>
          </button>

          <button
            v-for="candidate in shell.entities.value"
            :key="candidate.key"
            type="button"
            class="dc-entity"
            :data-dc-active="candidate.key === shell.entity.value?.key ? 'true' : 'false'"
            :aria-current="candidate.key === shell.entity.value?.key ? 'true' : undefined"
            @click="shell.setEntity(candidate.key)"
          >
            <span class="dc-entity__label">{{ candidate.label }}</span>
            <span class="dc-entity__count dc-mono">{{ candidate.count }}</span>
          </button>
        </div>
      </div>

      <div class="dc-panel__actions">
        <button
          type="button"
          class="dc-button dc-button--primary"
          @click="run"
        >
          Run query
        </button>
        <button
          type="button"
          class="dc-button"
          :disabled="shell.isPristine.value && !dirty"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </section>

    <section class="dc-panel__section dc-panel__rows">
      <div class="dc-panel__row">
        <span class="dc-panel__field-label">View</span>
        <div class="dc-panel__control">
          <SegmentedControl
            label="Result view"
            :model-value="shell.query.value.view"
            :options="viewOptions"
            @update:model-value="shell.setView($event as ViewKind)"
          />
        </div>
      </div>

      <div class="dc-panel__row">
        <span class="dc-panel__field-label">Sort</span>
        <div class="dc-panel__control">
          <SegmentedControl
            mono
            label="Sort field"
            :model-value="shell.query.value.sort"
            :options="sortOptions"
            @update:model-value="shell.setSort($event)"
          />
          <button
            type="button"
            class="dc-button dc-button--icon dc-mono"
            :title="shell.query.value.dir === 'desc' ? 'Descending — click to reverse' : 'Ascending — click to reverse'"
            :aria-label="`Sort direction: ${shell.query.value.dir === 'desc' ? 'descending' : 'ascending'}`"
            @click="shell.toggleDirection()"
          >
            {{ shell.query.value.dir === 'desc' ? '↓' : '↑' }}
          </button>
        </div>
      </div>
    </section>

    <!-- Last, so the panel's own vocabulary is read before the host's, and so
         `:last-child` moves the closing border onto it. -->
    <section
      v-if="slots['panel-section']"
      class="dc-panel__section"
    >
      <slot name="panel-section" />
    </section>
  </div>
</template>

<style scoped>
.dc-panel {
  /* Floats over the results, so it takes the raised pair rather than a surface
     from the flow — under `theme="inherit"` an in-flow surface is a translucent
     veil, and the rows would read straight through the panel. Setting the text
     colour alongside it re-anchors everything inside, which in that theme is
     derived from `currentColor`. */
  background: var(--dc-raised);
  color: var(--dc-raised-ink);
  border: 1px solid var(--dc-line-2);
  border-radius: var(--dc-radius-lg);
  box-shadow: var(--dc-shadow);
  overflow: hidden auto;
  animation: dc-pop-in 0.14s ease-out;

  /* Two columns for the whole panel: what a control is called, then the
     control. The tracks are owned here rather than by each section so that
     every title down the panel starts at the same place and every control
     starts at the same place — across the section borders as well as within
     one. The sections carry the same side padding for that reason. */
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  column-gap: 16px;
}

.dc-panel__section {
  grid-column: 1 / -1;
  padding: 14px 18px 16px;
  border-bottom: 1px solid var(--dc-line);
}

.dc-panel__section:last-child {
  border-bottom: none;
}

/* A section of label/control rows takes the panel's tracks rather than tracks
   of its own; a host's section is left alone as the block it was. */
.dc-panel__rows {
  display: grid;
  grid-template-columns: subgrid;
  row-gap: 13px;
}

.dc-panel__row {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  align-items: baseline;
  row-gap: 6px;
}

.dc-panel__field-label {
  font-size: var(--dc-text-micro);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-1);
  white-space: nowrap;
}

/* The field the expression is written in, parts and box together inside one
   border — so a constraint that is already there reads as being in the field
   rather than as a label above it. Wrapping, because a query can name more
   parts than a line holds. */
.dc-field {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
  padding: 5px 6px;
  background: var(--dc-bg-0);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  /* Bare field between the parts is still field: pressing it starts typing. */
  cursor: text;
}

.dc-field:focus-within {
  border-color: var(--dc-accent-dim);
}

/* Takes what the parts leave of the line, and keeps a usable box when they
   have taken most of it — below that it wraps to a line of its own. */
.dc-expression {
  flex: 1 1 18ch;
  min-width: 0;
  padding: 4px 5px;
  background: none;
  border: none;
  color: var(--dc-fg-0);
  font-size: var(--dc-text-input);
  line-height: var(--dc-leading-input);
  outline: none;
}

/*
 * A part of the query, and pressing it takes that part out — the same pill the
 * header lifts terms with, in the field the query is written in. The
 * strikethrough on hover is the promise: this is the term, and this is it gone.
 */
.dc-part {
  flex: 0 0 auto;
  padding: 3px 8px;
  background: var(--dc-accent-bg);
  border: 1px solid var(--dc-accent-dim);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-accent);
  font-size: var(--dc-text-code);
  line-height: 1.5;
  white-space: nowrap;
  cursor: pointer;
}

.dc-part:hover,
.dc-part:focus-visible {
  opacity: 0.5;
  text-decoration: line-through;
}

/* Run and Reset start where the controls above them start: they answer the
   column of controls, not the panel. */
.dc-panel__actions {
  display: flex;
  grid-column: 2;
  gap: 8px;
  margin-top: 5px;
}

.dc-entity--all .dc-entity__label {
  color: var(--dc-fg-0);
}

.dc-entity--all[data-dc-active='true'] .dc-entity__label {
  color: var(--dc-accent);
}

.dc-panel__control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dc-button {
  padding: 8px 12px;
  background: var(--dc-bg-2);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  color: var(--dc-fg-1);
  cursor: pointer;
}

.dc-button:hover:not(:disabled) {
  background: var(--dc-bg-3);
}

.dc-button:disabled {
  opacity: 0.45;
  cursor: default;
}

.dc-button--primary {
  padding: 8px 14px;
  background: var(--dc-accent);
  border-color: var(--dc-accent);
  color: var(--dc-accent-contrast);
  font-weight: var(--dc-weight-semibold);
}

.dc-button--primary:hover:not(:disabled) {
  background: var(--dc-accent);
  filter: brightness(1.08);
}

.dc-button--icon {
  padding: 5px 10px;
  background: var(--dc-bg-0);
  font-size: var(--dc-text-meta);
}

/* A row of buttons rather than a grid of cards: picking an entity is a
   filter, and a filter is a control the width of its own name. */
.dc-panel__entities {
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  gap: 8px;
}

.dc-entity {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  padding: 7px 11px;
  background: var(--dc-bg-0);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
}

.dc-entity:hover {
  border-color: var(--dc-line-2);
}

.dc-entity[data-dc-active='true'] {
  background: var(--dc-accent-bg);
  border-color: var(--dc-accent-dim);
}

.dc-entity__label {
  font-size: var(--dc-text-body);
  font-weight: var(--dc-weight-semibold);
  letter-spacing: var(--dc-tracking-tight);
}

.dc-entity[data-dc-active='true'] .dc-entity__label {
  color: var(--dc-accent);
}

.dc-entity__count {
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

/* Too narrow for a title beside its control: the panel drops to one track, and
   every row — being a subgrid of it — stacks its title over its control. */
@container (max-width: 620px) {
  .dc-panel {
    grid-template-columns: minmax(0, 1fr);
  }

  .dc-panel__actions {
    grid-column: 1 / -1;
  }
}
</style>
