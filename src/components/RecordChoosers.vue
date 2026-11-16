<script setup lang="ts">
import { computed } from 'vue'
import type { EntitySchema, ViewKind } from '../types'
import { VIEW_KINDS } from '../types'
import { useShellContext } from '../composables/context'
import { useEntityCounts } from '../composables/useEntityCounts'
import { formatCount } from '../data/format'
import { VIEW_ICONS, VIEW_LABELS, entityCount, resolveView } from '../query/schema'
import PickControl from './PickControl.vue'
import PressLink from './views/PressLink.vue'

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

const viewOptions = computed<{ key: ViewKind; label: string; icon: string }[]>(() =>
  (props.views ?? [...VIEW_KINDS]).map((key) => ({
    key,
    label: key === 'record' ? (shell.recordView.value?.label ?? VIEW_LABELS.record) : VIEW_LABELS[key],
    icon: VIEW_ICONS[key],
  })),
)

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

function chooseView(key: string): void {
  shell.setView(key as ViewKind)
}
</script>

<template>
  <div
    v-if="showTypes || showViews"
    class="dc-choosers"
    :class="{ 'dc-choosers--stacked': stacked }"
  >
    <!-- Which type, while one is filtered to, with `Everything` in the list
         beside the types so widening back out stays one press. -->
    <PickControl
      v-if="showTypes"
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
      <span
        :id="showAsId"
        class="dc-show-as__label"
      >Show as</span>
      <div
        class="dc-show-as__group"
        :style="{ '--dc-views': viewOptions.length }"
        role="group"
        :aria-labelledby="showAsId"
      >
        <PressLink
          v-for="option in viewOptions"
          :key="option.key"
          class="dc-show-as__option"
          :class="{ 'dc-show-as__option--on': option.key === view }"
          :aria-current="option.key === view ? 'true' : undefined"
          :href="shell.hrefFor({ view: option.key })"
          @press="chooseView(option.key)"
        >
          {{ option.label }}
        </PressLink>
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
/* Every view at once, four to a row where there are more. */
.dc-show-as__group {
  display: grid;
  grid-template-columns: repeat(min(4, var(--dc-views, 4)), minmax(0, 1fr));
  gap: 2px;
  padding: 3px;
  border-radius: var(--dc-radius);
  background: var(--dc-bg-3);
}

.dc-show-as__option {
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: var(--dc-control-height);
  padding: 0 6px;
  overflow: hidden;
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-2);
  font-size: var(--dc-text-meta);
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dc-show-as__option:hover {
  color: var(--dc-fg-0);
}

.dc-show-as__option--on {
  background: var(--dc-bg-0);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.14);
  color: var(--dc-fg-0);
  font-weight: 500;
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
