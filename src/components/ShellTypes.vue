<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import type { EntitySchema } from '../types'
import { useShellContext } from '../composables/context'
import { useEntityCounts } from '../composables/useEntityCounts'
import { formatCount } from '../data/format'
import { formatExpression, parseExpression } from '../data/expression'
import { entityCount } from '../query/schema'

/**
 * Which types are listed, as a box ticked per type: in a side panel, where
 * the whole corpus is read as one list. All ticked is every type; one is that
 * type's own list, with its own columns and operations; some is the whole
 * corpus with the others left out, `-entity:logs` in the query. Each says how
 * many of it match what else the query asks.
 */

const shell = useShellContext()

/** The query's parts but the ones about type, which the boxes say. */
function withoutTypes(expr: string): string {
  return formatExpression(
    parseExpression(expr)
      .map((group) => group.filter((term) => !(term.kind === 'field' && term.field === 'entity')))
      .filter((group) => group.length > 0),
  )
}

/** The types left out by the query, where it says so in one alternative. */
const excluded = computed(() => {
  const groups = parseExpression(shell.query.value.expr)
  if (groups.length !== 1) return new Set<string>()
  return new Set(
    groups[0]!.flatMap((term) =>
      term.kind === 'field' && term.field === 'entity' && term.negated ? [term.value.toLowerCase()] : [],
    ),
  )
})

const rest = computed(() => withoutTypes(shell.query.value.expr))

const counts = useEntityCounts({
  source: shell.source,
  schema: shell.schema,
  query: computed(() => ({ ...shell.liveQuery.value, expr: withoutTypes(shell.liveQuery.value.expr) })),
  entities: shell.entities,
  within: shell.within,
})
onMounted(() => counts.refresh())
watch(() => [rest.value, shell.within.value, shell.source.value], () => counts.refresh())

/** What a type's box says it holds: what matches, else everything it has. */
function countOf(entity: EntitySchema): string {
  if (counts.pristine.value) return entityCount(entity)
  const found = counts.counts.value.get(entity.key)
  if (!found?.counted) return entityCount(entity)
  return `${found.pending ? '~' : ''}${formatCount(found.total)}`
}

/** A type worth a box: one with records, or one the query lists. */
const shown = computed(() =>
  shell.entities.value.filter(
    (entity) =>
      entity.key === shell.query.value.entity ||
      (typeof entity.count === 'number' ? entity.count > 0 : Boolean(entity.count)),
  ),
)

function ticked(entity: EntitySchema): boolean {
  const listed = shell.query.value.entity
  return listed ? listed === entity.key : !excluded.value.has(entity.key.toLowerCase())
}

/** The query that lists exactly these types. */
function listing(keys: string[]): { expr: string; entity: string | null } {
  const all = shown.value.map((entity) => entity.key)
  if (keys.length === 1) return { expr: rest.value, entity: keys[0]! }
  const out = all.filter((key) => !keys.includes(key))
  const terms = out.map((key) => `-entity:${key}`).join(' ')
  return { expr: [rest.value, terms].filter(Boolean).join(' '), entity: null }
}

function toggle(entity: EntitySchema): void {
  const now = shown.value.filter((candidate) => ticked(candidate)).map((candidate) => candidate.key)
  const next = now.includes(entity.key) ? now.filter((key) => key !== entity.key) : [...now, entity.key]
  // None at all lists nothing, which is no list: the one unticked last stays.
  if (next.length === 0) return
  const { expr, entity: key } = listing(next)
  shell.narrow(expr, key)
}

/** Only this type: pressing its name rather than its box. */
function only(entity: EntitySchema): void {
  const { expr, entity: key } = listing([entity.key])
  shell.narrow(expr, key)
}

const headingId = `dc-types-${Math.random().toString(36).slice(2, 8)}`
</script>

<template>
  <section
    v-if="shown.length > 1"
    class="dc-types-panel"
    :aria-labelledby="headingId"
  >
    <h3
      :id="headingId"
      class="dc-types-panel__heading"
    >
      Types
    </h3>
    <ul class="dc-types-panel__list">
      <li
        v-for="entity in shown"
        :key="entity.key"
        class="dc-types-panel__type"
      >
        <input
          :id="`${headingId}-${entity.key}`"
          type="checkbox"
          class="dc-types-panel__box"
          :checked="ticked(entity)"
          @change="toggle(entity)"
        >
        <label
          :for="`${headingId}-${entity.key}`"
          class="dc-types-panel__name"
        >{{ entity.label }}</label>
        <button
          type="button"
          class="dc-types-panel__only"
          :title="`Only ${entity.label}`"
          @click="only(entity)"
        >
          only
        </button>
        <span class="dc-types-panel__count dc-mono">{{ countOf(entity) }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.dc-types-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--dc-line);
}

.dc-types-panel__heading {
  margin: 0;
  color: var(--dc-fg-2);
  font-size: var(--dc-text-meta);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.dc-types-panel__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dc-types-panel__type {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
}

.dc-types-panel__box {
  margin: 0;
  accent-color: var(--dc-accent);
}

.dc-types-panel__name {
  flex: 1 1 auto;
  min-width: 0;
  cursor: pointer;
}

/* Offered where the pointer is, as a list's "only" is. */
.dc-types-panel__only {
  padding: 0 6px;
  border: 0;
  background: none;
  color: var(--dc-accent);
  font: inherit;
  font-size: var(--dc-text-meta);
  cursor: pointer;
  opacity: 0;
}

.dc-types-panel__type:hover .dc-types-panel__only,
.dc-types-panel__only:focus-visible {
  opacity: 1;
}

.dc-types-panel__count {
  color: var(--dc-fg-2);
  font-size: var(--dc-text-meta);
}
</style>
