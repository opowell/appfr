<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'
import { useEntityPreviews } from '../../composables/useEntityPreviews'
import MetricDrill from './MetricDrill.vue'
import ScopeMark from './ScopeMark.vue'

/**
 * The home screen: one card per item type, each naming the type, how many of
 * it there are, and its most recently updated few.
 *
 * A card's header filters the results to that type; a row's name opens that
 * record and its metric narrows to what the number counts; and a type the
 * schema gave a `create` label to ends with the button that asks for a new
 * one.
 */
const shell = useShellContext()

const { previews, pending, error } = useEntityPreviews({
  source: shell.source,
  schema: shell.schema,
  query: shell.query,
  entities: shell.entities,
  limit: shell.previewsPerType,
  isPinned: (id) => shell.isPinnedId(id),
})

/** With a query running, say which types it excluded rather than showing gaps. */
const narrowed = computed(() => !shell.isPristine.value)
</script>

<template>
  <!-- Before the first response there are no cards to dim, so say what is
       happening rather than showing an empty screen. -->
  <p
    v-if="error"
    class="dc-types__state"
    role="alert"
  >
    Could not load results: {{ error instanceof Error ? error.message : 'the data source failed.' }}
  </p>

  <p
    v-else-if="!previews.length && pending"
    class="dc-types__state"
    aria-live="polite"
  >
    Running query…
  </p>

  <div
    v-else
    class="dc-types"
    :data-dc-pending="pending ? 'true' : 'false'"
  >
    <section
      v-for="preview in previews"
      :key="preview.entity.key"
      class="dc-type"
      :data-dc-empty="preview.rows.length ? 'false' : 'true'"
    >
      <button
        type="button"
        class="dc-type__head"
        @click="shell.setEntity(preview.entity.key)"
      >
        <span class="dc-type__name">{{ preview.entity.label }}</span>
        <span class="dc-type__count dc-mono">{{ preview.count }}</span>
        <span
          class="dc-type__go"
          aria-hidden="true"
        >→</span>
        <span class="dc-type__sr">Show only {{ preview.entity.label.toLowerCase() }}</span>
      </button>

      <p
        v-if="!preview.rows.length"
        class="dc-type__empty"
      >
        {{ narrowed ? 'No matches' : 'Nothing here yet' }}
      </p>

      <!-- Not one button around the row: the name opens the record and the
           metric beside it narrows to what that number counts, and the two
           cannot nest. -->
      <div
        v-for="entry in preview.rows"
        :key="entry.row.id"
        class="dc-type__row"
      >
        <button
          type="button"
          class="dc-type__open"
          @click="shell.activate(entry.row)"
        >
          <span class="dc-type__identity">
            <span class="dc-type__primary dc-truncate">{{ entry.row.primary }}</span>
            <span class="dc-type__secondary dc-mono dc-truncate">{{ entry.row.secondary }}</span>
          </span>
        </button>
        <span class="dc-type__trailing dc-mono">
          <MetricDrill
            class="dc-type__metric"
            :entry="entry"
            metric="metric1"
          >
            <span class="dc-type__metric-value">{{ entry.metric1 }}</span>
            <span class="dc-type__metric-label">{{ entry.labels.metric1 }}</span>
          </MetricDrill>
          <span class="dc-type__date">{{ entry.date }}</span>
          <ScopeMark :entry="entry" />
        </span>
      </div>

      <!-- Under the records rather than beside the count: making one more is
           what comes after the ones there are, and an empty card is then the
           card that most obviously offers it. -->
      <button
        v-if="preview.entity.create"
        type="button"
        class="dc-type__new"
        @click="shell.create(preview.entity)"
      >
        <span
          class="dc-type__plus"
          aria-hidden="true"
        >+</span>
        {{ preview.entity.create }}
      </button>
    </section>
  </div>
</template>

<style scoped>
.dc-types {
  display: grid;
  /* Cards size to their content and sit at the top of their row, so a type
     with three items does not stretch to match one with ten. */
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  align-items: start;
  gap: 12px;
  padding: 16px;
  transition: opacity 0.12s ease-out;
}

.dc-types[data-dc-pending='true'] {
  opacity: 0.6;
}

.dc-types__state {
  margin: 0;
  padding: 40px 24px;
  color: var(--dc-fg-3);
  font-family: var(--dc-mono);
  font-size: var(--dc-text-meta);
}

.dc-type {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--dc-bg-1);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  overflow: hidden;
}

.dc-type[data-dc-empty='true'] {
  opacity: 0.7;
}

/* Every seam in the card, from one rule: head to rows, row to row, and the
   last of them to the button at the foot. Drawn between the children rather
   than under each of them, so whichever of them is last has nothing under it
   however the card is made up. */
.dc-type > * + * {
  border-top: 1px solid var(--dc-line);
}

.dc-type__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 14px 16px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.dc-type__head:hover {
  background: var(--dc-bg-2);
}

.dc-type__name {
  font-size: var(--dc-text-title);
  font-weight: var(--dc-weight-semibold);
  letter-spacing: var(--dc-tracking-tight);
}

.dc-type__count {
  font-size: var(--dc-text-meta);
  color: var(--dc-fg-3);
}

.dc-type__go {
  margin-left: auto;
  color: var(--dc-fg-3);
  font-size: var(--dc-text-meta);
  opacity: 0;
}

.dc-type__head:hover .dc-type__go,
.dc-type__head:focus-visible .dc-type__go {
  opacity: 1;
}

.dc-type__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.dc-type__empty {
  margin: 0;
  padding: 16px;
  color: var(--dc-fg-3);
  font-size: var(--dc-text-body);
  font-style: var(--dc-italic);
}

.dc-type__row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 54px;
  padding-right: 16px;
}

.dc-type__row:hover {
  background: var(--dc-bg-2);
}

/* The row's own padding, so the whole strip left of the metric opens the
   record rather than only the words in it. */
.dc-type__open {
  display: flex;
  flex: 1;
  min-width: 0;
  padding: 10px 0 10px 16px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.dc-type__identity {
  flex: 1;
  min-width: 0;
}

.dc-type__primary {
  display: block;
  font-size: var(--dc-text-body);
  color: var(--dc-fg-0);
}

.dc-type__secondary {
  display: block;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

.dc-type__trailing {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex: 0 0 auto;
  white-space: nowrap;
}

.dc-type__metric {
  align-self: center;
}

.dc-type__metric-value {
  font-size: var(--dc-text-body);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-accent);
}

.dc-type__metric-label {
  margin-left: 4px;
  color: var(--dc-fg-3);
  font-size: var(--dc-text-eyebrow);
  text-transform: var(--dc-caps);
  letter-spacing: var(--dc-tracking-caps);
}

.dc-type__date {
  color: var(--dc-fg-3);
  font-size: var(--dc-text-micro);
}

/* Quieter than a row until it is reached: the records are what the card is
   for, and this is the thing to do about them. */
.dc-type__new {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: var(--dc-fg-2);
  font-size: var(--dc-text-body);
  text-align: left;
  cursor: pointer;
}

.dc-type__new:hover {
  background: var(--dc-bg-2);
  color: var(--dc-accent);
}

.dc-type__plus {
  font-family: var(--dc-mono);
  color: var(--dc-fg-3);
}

.dc-type__new:hover .dc-type__plus {
  color: var(--dc-accent);
}

/* In a narrow shell the date is the first thing worth dropping: the card is
   already ordered by recency. */
@container (max-width: 560px) {
  .dc-type__date {
    display: none;
  }
}
</style>
