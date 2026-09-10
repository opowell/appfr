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
 *
 * The two slots are for the cards no type holds. A shell read inside one
 * record has a card's worth to say about the record itself — its name, what
 * can be done with it, its metadata, its source — and those sit in the same
 * grid as the types, before them and after them, so one screen comes out of
 * it rather than a header, a panel and then some cards.
 */
const shell = useShellContext()

defineSlots<{
  /** Cards of the host's own, above the types. */
  before?: () => unknown
  /** And below them. */
  after?: () => unknown
}>()

const { previews: found, pending, error } = useEntityPreviews({
  source: shell.source,
  schema: shell.schema,
  query: shell.query,
  entities: shell.entities,
  limit: shell.previewsPerType,
  within: shell.within,
  isPinned: (id) => shell.isPinnedId(id),
})

/**
 * With a query running, say which types it excluded rather than showing gaps.
 * A scope the shell is read inside counts: the URL may hold no query at all,
 * and a type with nothing in it still has nothing that *matched*.
 */
const narrowed = computed(() => !shell.isPristine.value || Boolean(shell.within.value))

/**
 * The cards worth drawing: the types that hold something, and the types that
 * offer something to do about holding nothing.
 *
 * A card with no records and no button is a heading, a count of zero and the
 * words *No matches* — three ways of saying the same nothing, and on a screen
 * read inside one record most of the types say it. So those go, and what is
 * left is what the record actually has. A type whose schema names `create`
 * stays either way: an empty card is where that button does the most work,
 * being the one place that says what to do about the emptiness.
 *
 * And the type at the other end of that screen goes too: the one whose single
 * row is the record the query named, which since a press narrows is the type
 * the reader just pressed in. A card restating the header is the same nothing
 * as a card with no rows in it — see the preview's `pinned`.
 *
 * That one goes even where the type names `create`, which is the one place
 * this rule and the rule above it disagree. An empty card is kept *for* that
 * button, being the only thing on screen that says what to do about the
 * emptiness; a pinned card has a record in it and nothing to say about, and
 * `RecordActions` offers the same button on the type's own list a press away.
 */
const previews = computed(() =>
  found.value.filter(
    (preview) => !preview.pinned && (preview.rows.length > 0 || preview.entity.create),
  ),
)
</script>

<template>
  <!--
    The grid is always here, because the cards in the two slots are the host's
    and are not waiting on anything: a per-type query that has not answered or
    has failed says what it has to say among them rather than in place of them.
  -->
  <div
    class="dc-types"
    :data-dc-pending="pending ? 'true' : 'false'"
  >
    <slot name="before" />

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

    <!-- Every type held nothing, so every card went. Said rather than left
         blank: a screen with the host's cards and no types on it otherwise
         reads as a screen that failed to load its own. -->
    <p
      v-else-if="!previews.length"
      class="dc-types__state"
    >
      {{ narrowed ? 'Nothing matches this query' : 'Nothing here yet' }}
    </p>

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
        :key="entry.key"
        class="dc-type__row"
      >
        <button
          type="button"
          class="dc-type__open"
          @click="shell.activate(entry.row)"
        >
          <span class="dc-type__identity">
            <span class="dc-type__primary dc-truncate">{{ entry.parts.identity }}</span>
            <span class="dc-type__secondary dc-mono dc-truncate">{{ entry.parts.reference }}</span>
          </span>
        </button>
        <!-- One number, the first this type declared: a preview row is a
             glance, and the type's own list is where the rest of them are. -->
        <span class="dc-type__trailing dc-mono">
          <MetricDrill
            v-for="metric in entry.parts.metrics.slice(0, 1)"
            :key="metric.column.key ?? metric.label"
            class="dc-type__metric"
            :entry="entry"
            :column="metric.column"
          >
            <span class="dc-type__metric-value">{{ metric.text }}</span>
            <span class="dc-type__metric-label">{{ metric.label }}</span>
          </MetricDrill>
          <span
            v-if="entry.parts.updated"
            class="dc-type__date"
          >{{ entry.parts.updated }}</span>
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

    <slot name="after" />
  </div>
</template>

<style scoped>
.dc-types {
  display: grid;
  /*
   * As many columns as fit comfortably and no more: three or so on a laptop,
   * one on a phone, six on a very wide screen. A narrower track would fit
   * more of them and cut every card's rows to a few words.
   */
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 12px;
  padding: 16px;
  transition: opacity 0.12s ease-out;
}

/*
 * Every card in a row is the height of that row.
 *
 * Sized to their content instead — `align-items: start`, which this had — a
 * type with ten rows beside one with none left the short cards floating over
 * a column of whitespace, and the screen read as a ragged wall rather than a
 * grid. The cards are flex columns, so the room a stretched one gains goes
 * under its last child.
 */
.dc-types > * {
  align-self: stretch;
}

.dc-types[data-dc-pending='true'] {
  opacity: 0.6;
}

/* Across the grid rather than in one of its columns: this is a sentence about
   the whole result, not a card. */
.dc-types__state {
  grid-column: 1 / -1;
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
