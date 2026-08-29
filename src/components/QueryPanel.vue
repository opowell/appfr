<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { FacetValue, ViewKind } from '../types'
import { VIEW_KINDS } from '../types'
import { useShellContext } from '../composables/context'
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

/* The expression is edited as a draft. Committing on every keystroke would put
   a history entry behind each character; it commits on Run or Enter. */
const draft = ref(shell.query.value.expr)
const expressionField = ref<HTMLInputElement | null>(null)

watch(
  () => shell.query.value.expr,
  (expr) => {
    draft.value = expr
  },
)

const dirty = computed(() => draft.value !== shell.query.value.expr)

function run() {
  shell.setExpression(draft.value)
  emit('close')
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
    <section class="dc-panel__section">
      <div class="dc-panel__query">
        <div class="dc-panel__expression">
          <label
            class="dc-panel__field-label"
            :for="`${panelId}-expr`"
          >Expression</label>
          <input
            :id="`${panelId}-expr`"
            ref="expressionField"
            v-model="draft"
            class="dc-expression dc-mono"
            type="text"
            autocomplete="off"
            spellcheck="false"
            :placeholder="shell.schema.value.placeholder"
            @keydown.enter.prevent="run"
          >
        </div>

        <div
          v-if="shell.entity.value"
          class="dc-panel__facets"
        >
          <FacetControl
            v-for="facet in shell.entity.value.facets"
            :key="facet.key"
            :facet="facet"
            :value="shell.query.value.facets[facet.key]!"
            @update="onFacetUpdate(facet.key, $event)"
          />
        </div>
        <p
          v-else
          class="dc-panel__hint"
        >
          Results span every entity — logs and settings included. Pick one below
          to narrow to it and to get its own filters.
        </p>
      </div>

      <!-- The entity picker is part of the query, not a topic beside it:
           narrowing to an entity is what gives the facets above something to
           filter, so the two are read as one. -->
      <div class="dc-panel__scope">
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

    <section class="dc-panel__section dc-panel__section--row">
      <div class="dc-panel__control">
        <span class="dc-eyebrow">View</span>
        <SegmentedControl
          label="Result view"
          :model-value="shell.query.value.view"
          :options="viewOptions"
          @update:model-value="shell.setView($event as ViewKind)"
        />
      </div>

      <div class="dc-panel__control">
        <span class="dc-eyebrow">Sort</span>
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
}

.dc-panel__section {
  padding: 14px 18px 16px;
  border-bottom: 1px solid var(--dc-line);
}

.dc-panel__section:last-child {
  border-bottom: none;
}

.dc-panel__section--row {
  display: flex;
  align-items: center;
  gap: 26px;
  flex-wrap: wrap;
  padding: 12px 18px 14px;
}

.dc-panel__query {
  display: grid;
  grid-template-columns: minmax(280px, 1.1fr) 2fr;
  gap: 18px;
  align-items: start;
}

.dc-panel__field-label {
  display: block;
  margin-bottom: 6px;
  font-size: var(--dc-text-micro);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-1);
}

/* Whitespace alone divides the query from the entities under it — a rule here
   would put back the section border the merge took out. */
.dc-panel__scope {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-top: 16px;
}

.dc-panel__scope .dc-panel__field-label {
  margin-bottom: 0;
  white-space: nowrap;
}

.dc-expression {
  width: 100%;
  min-width: 0;
  padding: 9px 11px;
  background: var(--dc-bg-0);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  color: var(--dc-fg-0);
  font-size: var(--dc-text-input);
  line-height: var(--dc-leading-input);
  outline: none;
}

.dc-expression:focus {
  border-color: var(--dc-accent-dim);
}

.dc-panel__actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
}

.dc-panel__facets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;
}

.dc-panel__hint {
  max-width: 46ch;
  margin: 0;
  color: var(--dc-fg-3);
  font-size: var(--dc-text-meta);
  line-height: var(--dc-leading-prose);
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
  flex: 1;
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

@container (max-width: 760px) {
  .dc-panel__query {
    grid-template-columns: 1fr;
  }
}
</style>
