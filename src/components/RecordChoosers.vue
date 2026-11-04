<script setup lang="ts">
import { computed } from 'vue'
import type { EntitySchema, ViewKind } from '../types'
import { VIEW_KINDS } from '../types'
import { useShellContext } from '../composables/context'
import { useEntityCounts } from '../composables/useEntityCounts'
import { formatCount } from '../data/format'
import { VIEW_ICONS, VIEW_LABELS, entityCount, resolveView } from '../query/schema'
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
}>()

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
  if (chosen && narrowed.value) return formatCount(shell.total.value)
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

    <!-- And how they are drawn, wherever the host offers more than one way. -->
    <PickControl
      v-if="showViews"
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

/* At the type size of the query's parts, sitting beside them. */
.dc-actions__pick {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  font-size: var(--dc-text-code);
  cursor: pointer;
}
</style>
