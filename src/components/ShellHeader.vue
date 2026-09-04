<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../composables/context'
import { isTypeCardsQuery } from '../query/schema'

const props = defineProps<{
  expanded: boolean
  /** Id of the panel this bar controls, for `aria-controls`. */
  panelId: string
  /** Hide the breadcrumb's record count, e.g. while a detail view is open. */
  hideCount?: boolean
}>()

const emit = defineEmits<{ toggle: [] }>()

const shell = useShellContext()

const domain = computed(() => shell.schema.value)

/**
 * What the results are scoped to. With no entity filter this is the whole
 * corpus — logs and settings included — so it says so rather than naming one
 * kind of record.
 */
const scope = computed(() => shell.entity.value?.label ?? 'Everything')

/**
 * The count beside the breadcrumb. A narrowed query reports how many rows
 * matched; an unfiltered entity reports the population the schema publishes,
 * which is the real total rather than a page size.
 */
const count = computed(() => {
  if (props.hideCount) return ''
  const entity = shell.entity.value
  if (entity && !shell.hasFacets.value && !shell.query.value.expr.trim()) return entity.count
  return String(shell.total.value)
})

/**
 * The parts of the query, each one liftable on its own — the entity filter,
 * every active facet, and every term of the expression.
 *
 * `or` marks a term that starts a new alternative. An expression's `OR` groups
 * are alternatives, and a plain row of pills would otherwise read them as one
 * list of things that all have to hold.
 */
const terms = computed(() =>
  shell.terms.value.map((term, at, all) => {
    const before = all[at - 1]
    return {
      term,
      or: before?.group !== undefined && term.group !== undefined && term.group !== before.group,
    }
  }),
)

/* -------------------------------------------------------------------- pages */

const page = computed(() => shell.query.value.page)

/**
 * Pages are offered when there is more than one and when the results below are
 * what would be paged. The home screen's cards are the exception: a card per
 * type runs its own per-entity query, so the shell's single result set is not
 * what is on screen and stepping through it would move nothing.
 */
const paged = computed(
  () => shell.pageCount.value > 1 && !isTypeCardsQuery(shell.query.value),
)

/**
 * Where this page sits in the whole result. The bar shows the short form and
 * says this much to a tooltip and a screen reader, since `2 / 5` on its own
 * does not say what it is counting.
 */
const position = computed(() => {
  const place = `Page ${page.value} of ${shell.pageCount.value}`
  const shown = shell.rows.value.length
  if (!shown) return place
  const first = shell.offset.value + 1
  return `${place} — rows ${first} to ${first + shown - 1} of ${shell.total.value}`
})
</script>

<template>
  <div
    class="dc-header"
    :data-dc-expanded="expanded ? 'true' : 'false'"
  >
    <button
      type="button"
      class="dc-header__trigger"
      :aria-expanded="expanded"
      :aria-controls="panelId"
      @click="emit('toggle')"
    >
      <span
        class="dc-header__badge"
        aria-hidden="true"
      >◆</span>
      <span class="dc-header__domain">{{ domain.label }}</span>

      <span class="dc-header__crumb">
        <span class="dc-header__crumb-root">{{ scope }}</span>
        <span
          v-if="count"
          class="dc-header__count dc-mono"
        >{{ count }}</span>
      </span>

      <span
        v-if="!terms.length"
        class="dc-header__query"
      >
        <span class="dc-header__query-label">Query</span>
        <span
          class="dc-header__summary dc-mono dc-truncate"
          :data-dc-active="shell.isPristine.value ? 'false' : 'true'"
          :title="shell.summary.value"
        >{{ shell.summary.value }}</span>
      </span>

      <span
        class="dc-header__chevron"
        aria-hidden="true"
      >{{ expanded ? '▲' : '▼' }}</span>
      <span class="dc-header__sr">{{ expanded ? 'Hide query panel' : 'Edit query' }}</span>
    </button>

    <!-- Outside the trigger for the same reason the pager is: each part of the
         query is a button of its own, and a button cannot hold another. The
         summary above says the same thing in one line, and gives way to these
         as soon as there is a part to lift. -->
    <div
      v-if="terms.length"
      class="dc-header__query dc-header__terms"
    >
      <span class="dc-header__query-label">Query</span>
      <template
        v-for="entry in terms"
        :key="entry.term.id"
      >
        <span
          v-if="entry.or"
          class="dc-header__or dc-mono"
          aria-hidden="true"
        >or</span>
        <button
          type="button"
          class="dc-term dc-mono"
          :title="`Remove ${entry.term.label}`"
          :aria-label="`Remove ${entry.term.label}`"
          @click="shell.removeTerm(entry.term)"
        >
          {{ entry.term.label }}
        </button>
      </template>
    </div>

    <!-- Outside the trigger, which is itself a button: these are controls of
         their own, and a button cannot hold another. -->
    <nav
      v-if="paged"
      class="dc-header__pages"
      aria-label="Pages"
    >
      <button
        type="button"
        class="dc-header__step"
        aria-label="Previous page"
        :disabled="page <= 1"
        @click="shell.setPage(page - 1)"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <span
        class="dc-header__page dc-mono"
        :title="position"
        aria-hidden="true"
      >{{ page }} / {{ shell.pageCount.value }}</span>
      <span
        class="dc-header__sr"
        aria-live="polite"
      >{{ position }}</span>

      <button
        type="button"
        class="dc-header__step"
        aria-label="Next page"
        :disabled="page >= shell.pageCount.value"
        @click="shell.setPage(page + 1)"
      >
        <span aria-hidden="true">›</span>
      </button>
    </nav>

    <div
      v-if="$slots.actions"
      class="dc-header__actions"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.dc-header {
  /* Above the query panel's scrim, so the trigger keeps working while the
     panel is open — `aria-expanded` promises it toggles. */
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;
  height: var(--dc-header-height);
  padding: 0 14px;
  border-bottom: 1px solid var(--dc-line);
  background: var(--dc-bg-0);
}

.dc-header[data-dc-expanded='true'] {
  background: var(--dc-bg-1);
}

.dc-header__trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  margin-left: -8px;
  padding: 6px 8px;
  border: none;
  border-radius: var(--dc-radius);
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.dc-header__trigger:hover {
  background: var(--dc-bg-1);
}

.dc-header[data-dc-expanded='true'] .dc-header__trigger:hover {
  background: var(--dc-bg-2);
}

.dc-header__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: var(--dc-radius-sm);
  background: var(--dc-accent-bg);
  color: var(--dc-accent);
  font-size: var(--dc-text-meta);
}

.dc-header__domain {
  flex: 0 0 auto;
  font-size: var(--dc-text-body);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-1);
}

.dc-header__crumb {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  padding-left: 12px;
  border-left: 1px solid var(--dc-line);
  font-size: var(--dc-text-body);
  white-space: nowrap;
}

.dc-header__crumb-root {
  color: var(--dc-fg-0);
  font-weight: var(--dc-weight-semibold);
}

.dc-header__count {
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

.dc-header__query {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
  padding-left: 12px;
  border-left: 1px solid var(--dc-line);
}

/*
 * The parts take the space the summary had, since they are what replaced it:
 * the trigger keeps the domain and the scope and no longer stretches.
 */
.dc-header__terms {
  flex: 1;
  gap: 5px;
  /* One line, scrolled rather than wrapped: the bar is one row high, and a
     query long enough to wrap would push the pager off it. */
  overflow-x: auto;
  scrollbar-width: none;
  white-space: nowrap;
}

.dc-header__terms::-webkit-scrollbar {
  display: none;
}

.dc-header:has(.dc-header__terms) .dc-header__trigger {
  flex: 0 1 auto;
}

/*
 * A part of the query, and pressing it takes that part out. The strikethrough
 * on hover is the promise: this is the term, and this is it gone.
 */
.dc-term {
  flex: 0 0 auto;
  padding: 3px 8px;
  background: var(--dc-accent-bg);
  border: 1px solid var(--dc-accent-dim);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-accent);
  font-size: var(--dc-text-code);
  line-height: 1.5;
  cursor: pointer;
}

.dc-term:hover,
.dc-term:focus-visible {
  opacity: 0.5;
  text-decoration: line-through;
}

/* The one thing here that is not a term: what separates two alternatives. */
.dc-header__or {
  flex: 0 0 auto;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

.dc-header__query-label {
  flex: 0 0 auto;
  font-size: var(--dc-text-eyebrow);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-3);
  text-transform: var(--dc-caps);
  letter-spacing: var(--dc-tracking-caps-wide);
}

.dc-header__summary {
  font-size: var(--dc-text-code);
  color: var(--dc-fg-3);
}

.dc-header__summary[data-dc-active='true'] {
  color: var(--dc-accent);
}

.dc-header__chevron {
  flex: 0 0 auto;
  margin-left: auto;
  font-size: var(--dc-text-eyebrow);
  color: var(--dc-fg-3);
}

.dc-header__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.dc-header__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  min-width: 0;
}

/*
 * The same divider the crumb and the query take, so the bar reads as one row
 * of instruments rather than a summary with something stuck on the end.
 */
.dc-header__pages {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
  padding-left: 12px;
  border-left: 1px solid var(--dc-line);
}

.dc-header__step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: var(--dc-bg-0);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-1);
  font-size: var(--dc-text-meta);
  line-height: 1;
  cursor: pointer;
}

.dc-header__step:hover:not(:disabled) {
  background: var(--dc-bg-2);
  color: var(--dc-fg-0);
}

/*
 * There is no page before the first, and the button says so. This is not the
 * shell forbidding a move — it is the end of the results, which is a fact
 * about them and reads as one.
 */
.dc-header__step:disabled {
  opacity: 0.4;
  cursor: default;
}

.dc-header__page {
  /* Held to a width, so stepping 9 → 10 does not shuffle the buttons. */
  min-width: 46px;
  text-align: center;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

/*
 * Narrow: drop the domain name, keep the entity. The entity is what the reader
 * needs — a narrowed query's summary is its terms, so it no longer says what
 * is being listed.
 */
@container (max-width: 720px) {
  .dc-header__domain {
    display: none;
  }

  .dc-header__crumb {
    padding-left: 0;
    border-left: none;
  }
}
</style>
