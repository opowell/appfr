<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EntitySchema, ViewKind } from '../types'
import { VIEW_KINDS } from '../types'
import { useShellContext } from '../composables/context'
import { useEntityCounts } from '../composables/useEntityCounts'
import { formatCount } from '../data/format'
import { VIEW_ICONS, VIEW_LABELS, entityCount, isBuiltinView, resolveView } from '../query/schema'
import PickControl from './PickControl.vue'

/**
 * Which type the results are, and how they are drawn: the two choices about
 * the results as a whole rather than about which of them match, set before
 * the query on the bar. Renders nothing where there is nothing to choose.
 */
const props = defineProps<{
  /** The views on offer, as `DataShell` was told them — see `ResultsArea`. */
  views?: ViewKind[]
  /** Where the list of types is a control on the bar — see `showTypes`. */
  typeChooser?: 'scoped' | 'always'
  /**
   * Drawn in a side panel rather than on a bar: one under the other, and the
   * views as a row of every one on offer rather than a list that opens.
   */
  stacked?: boolean
  /** The host's own names for views, over the shell's — `{ grid: 'Tiles' }`. */
  labels?: Partial<Record<ViewKind, string>>
  /** A line under each view's name in the stacked list — `{ cards: 'Like Reddit' }`. */
  hints?: Partial<Record<ViewKind, string>>
}>()

const showAsId = `dc-show-as-${Math.random().toString(36).slice(2, 8)}`

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
  if (chosen && narrowed.value) return formatCount((shell.matched ?? shell.total).value)
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

const viewOptions = computed<{ key: ViewKind; label: string; icon: string; hint?: string }[]>(() => {
  const views = props.views ?? [...VIEW_KINDS]
  // In a panel the record itself comes first, as the one thing rather than a
  // way of listing several.
  const ordered = props.stacked && views.includes('record') ? ['record' as const, ...views.filter((key) => key !== 'record')] : views
  return ordered.map((key) => {
    const host = isBuiltinView(key) ? undefined : shell.hostViews.value[key]
    return {
      key,
      label:
        props.labels?.[key] ??
        (key === 'record'
          ? (shell.recordView.value?.label ?? VIEW_LABELS.record)
          : isBuiltinView(key)
            ? VIEW_LABELS[key]
            : (host?.label ?? key)),
      icon: isBuiltinView(key) ? VIEW_ICONS[key] : (host?.icon ?? VIEW_ICONS.list),
      hint: props.hints?.[key] ?? host?.hint,
    }
  })
})

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

/** Stacked, the type is a part of the query in the field above, so nothing here says it. */
const showsAnything = computed(() => showViews.value || (showTypes.value && !props.stacked))

function chooseView(key: string): void {
  shell.setView(key as ViewKind)
}

/* ------------------------------------------- Show as, a field in a panel */

/*
 * A field naming the view in force, its icon before it, opening the views
 * under it: typing narrows them by name or hint, Up and Down move, Enter takes
 * the one marked (the first that matches), Escape puts the list away.
 */
const showBox = ref<HTMLInputElement | null>(null)
const showOpen = ref(false)
const showText = ref('')
const showActive = ref(0)
const chosenOption = computed(() => viewOptions.value.find((option) => option.key === view.value))
const showMatches = computed(() => {
  const typed = showText.value.trim().toLowerCase()
  if (!typed) return viewOptions.value
  return viewOptions.value.filter(
    (option) => option.label.toLowerCase().includes(typed) || Boolean(option.hint?.toLowerCase().includes(typed)),
  )
})

function openShow(): void {
  showOpen.value = true
  showActive.value = Math.max(0, showMatches.value.findIndex((option) => option.key === view.value))
}

function closeShow(): void {
  showOpen.value = false
  showText.value = ''
}

function toggleShow(): void {
  if (showOpen.value) {
    showBox.value?.blur()
  } else {
    showBox.value?.focus()
  }
}

function pickShow(key: ViewKind): void {
  if (key !== view.value) chooseView(key)
  showBox.value?.blur()
}

function showKey(event: KeyboardEvent): void {
  const count = showMatches.value.length
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!showOpen.value) {
      openShow()
      return
    }
    if (count) showActive.value = (showActive.value + (event.key === 'ArrowDown' ? 1 : -1) + count) % count
  } else if (event.key === 'Enter') {
    event.preventDefault()
    const option = showMatches.value[showActive.value]
    if (option) pickShow(option.key)
  } else if (event.key === 'Escape') {
    event.preventDefault()
    showBox.value?.blur()
  }
}
</script>

<template>
  <div
    v-if="showsAnything"
    class="dc-choosers"
    :class="{ 'dc-choosers--stacked': stacked }"
  >
    <!-- Which type, while one is filtered to, with `Everything` in the list
         beside the types so widening back out stays one press. -->
    <PickControl
      v-if="showTypes && !stacked"
      class="dc-actions__pick dc-actions__type"
      label="Type"
      :model-value="shell.query.value.entity ?? ''"
      :options="entityOptions"
      @open="entityCounts.refresh"
      @close="entityCounts.cancel"
      @update:model-value="chooseEntity"
    />

    <!-- And how they are drawn, wherever the host offers more than one way:
         in a side panel every way at once, as a row of links, the one in
         force pressed in. -->
    <div
      v-if="showViews && stacked"
      class="dc-show-as"
    >
      <label
        :for="showAsId"
        class="dc-show-as__label"
      >Show as <span class="dc-mono">(u)</span></label>
      <div
        class="dc-show-as__field"
        :class="{ 'dc-show-as__field--open': showOpen }"
      >
        <svg
          class="dc-show-as__icon"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        ><path :d="chosenOption?.icon" /></svg>
        <input
          :id="showAsId"
          ref="showBox"
          v-model="showText"
          class="dc-show-as__input"
          type="text"
          role="combobox"
          autocomplete="off"
          spellcheck="false"
          aria-autocomplete="list"
          :aria-expanded="showOpen"
          :aria-controls="`${showAsId}-list`"
          :aria-activedescendant="showOpen && showMatches.length ? `${showAsId}-${showMatches[showActive]?.key}` : undefined"
          :placeholder="chosenOption?.label"
          @focus="openShow"
          @blur="closeShow"
          @input="showActive = 0; showOpen = true"
          @keydown="showKey"
        >
        <button
          type="button"
          class="dc-show-as__toggle"
          tabindex="-1"
          aria-label="Open Show as"
          @mousedown.prevent="toggleShow"
        >
          <span
            class="dc-show-as__caret"
            aria-hidden="true"
          >▾</span>
        </button>
        <ul
          v-if="showOpen"
          :id="`${showAsId}-list`"
          class="dc-show-as__list"
          role="listbox"
          aria-label="Show as"
        >
          <li
            v-for="(option, place) in showMatches"
            :id="`${showAsId}-${option.key}`"
            :key="option.key"
            class="dc-show-as__option"
            :class="{ 'dc-show-as__option--active': place === showActive, 'dc-show-as__option--on': option.key === view }"
            :style="{ animationDelay: `${place * 30}ms` }"
            role="option"
            :aria-selected="option.key === view"
            @mousedown.prevent="pickShow(option.key)"
            @mousemove="showActive = place"
          >
            <svg
              class="dc-show-as__icon"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            ><path :d="option.icon" /></svg>
            <span class="dc-show-as__text">
              <span class="dc-show-as__name">{{ option.label }}</span>
              <span
                v-if="option.hint"
                class="dc-show-as__hint"
              >{{ option.hint }}</span>
            </span>
            <span
              class="dc-show-as__check"
              aria-hidden="true"
            >{{ option.key === view ? '✓' : '' }}</span>
          </li>
          <li
            v-if="!showMatches.length"
            class="dc-show-as__none"
            role="presentation"
          >
            No format matches “{{ showText }}”
          </li>
        </ul>
      </div>
    </div>
    <PickControl
      v-else-if="showViews"
      class="dc-actions__pick dc-actions__view"
      label="View"
      :model-value="view"
      :options="viewOptions"
      @update:model-value="chooseView"
    />
  </div>
</template>

<style scoped>
.dc-choosers {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}

/* In a side panel, one under the other, as wide as the panel. */
.dc-choosers--stacked {
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
}

/* The type a list of, as wide as it says. */
.dc-choosers--stacked > .dc-actions__type {
  align-self: flex-start;
}

.dc-show-as {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dc-show-as__label {
  color: var(--dc-fg-2);
  font-size: var(--dc-text-meta);
}

/* The one in force raised out of the groove they sit in. */
/* The field: the view in force, its icon first, the edge the accent while open. */
.dc-show-as__field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: calc(var(--dc-control-height) + 4px);
  padding: 0 4px 0 10px;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  background: var(--dc-field, var(--dc-bg-0));
  transition: border-color 0.2s, box-shadow 0.2s;
}

.dc-show-as__field:focus-within {
  border-color: var(--dc-accent-dim, var(--dc-accent));
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--dc-accent) 14%, transparent);
}

.dc-show-as__icon {
  flex-shrink: 0;
  color: var(--dc-fg-2);
}

.dc-show-as__input {
  flex: 1 1 auto;
  min-width: 0;
  height: var(--dc-control-height);
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--dc-fg-0);
  font: inherit;
}

.dc-show-as__input::placeholder {
  color: var(--dc-fg-0);
}

.dc-show-as__input:focus::placeholder {
  color: var(--dc-fg-3);
}

.dc-show-as__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--dc-fg-2);
  cursor: pointer;
}

.dc-show-as__caret {
  display: inline-block;
  transition: transform 0.2s;
}

.dc-show-as__field--open .dc-show-as__caret {
  transform: rotate(180deg);
}

/* The views, dropped under the field, over what is under it. */
.dc-show-as__list {
  position: absolute;
  z-index: 40;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 6px;
  list-style: none;
  border: 1px solid var(--dc-line);
  border-radius: calc(var(--dc-radius) + 4px);
  background: var(--dc-bg-0);
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.16);
  animation: dc-show-drop 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.dc-show-as__option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--dc-radius);
  cursor: pointer;
  animation: dc-show-rise 0.22s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.dc-show-as__option--active {
  background: var(--dc-accent-bg, var(--dc-bg-2));
}

.dc-show-as__option--on .dc-show-as__icon,
.dc-show-as__check {
  color: var(--dc-accent);
}

.dc-show-as__option--on .dc-show-as__name {
  font-weight: 600;
}

.dc-show-as__text {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
}

.dc-show-as__hint {
  color: var(--dc-fg-2);
  font-size: var(--dc-text-meta);
}

.dc-show-as__check {
  flex-shrink: 0;
  width: 1em;
}

.dc-show-as__none {
  padding: 8px 10px;
  color: var(--dc-fg-2);
}

@keyframes dc-show-drop {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@keyframes dc-show-rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dc-show-as__list,
  .dc-show-as__option {
    animation: none;
  }

  .dc-show-as__caret,
  .dc-show-as__field {
    transition: none;
  }
}

/* At the type size of the query's parts, sitting beside them. */
.dc-actions__pick {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  font-size: var(--dc-text-code);
  cursor: pointer;
}
</style>
