<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useShellContext } from '../composables/context'
import { useRecordNames } from '../composables/useRecordNames'
import { VIEW_LABELS, isTypeCardsQuery, resolveView } from '../query/schema'
import { formatCount } from '../data/format'
import { ENTITY_TERM } from '../query/summary'
import type { SummaryTerm } from '../query/summary'
import type { EntitySchema, ViewKind } from '../types'
import { VIEW_KINDS } from '../types'

const props = defineProps<{
  expanded: boolean
  /** Id of the panel this bar controls, for `aria-controls`. */
  panelId: string
  /**
   * Leave the live match count off the type in force, e.g. while a detail view
   * is open: the list of types then says what each of them holds, rather than
   * what the query behind the detail matched.
   */
  hideCount?: boolean
  /** Views to offer, when the host restricts them. Defaults to all six. */
  views?: ViewKind[]
}>()

const emit = defineEmits<{ toggle: [] }>()

const shell = useShellContext()

const domain = computed(() => shell.schema.value)

/* ------------------------------------------------------- how many there are */

/** Whether the query says more than which type: a facet, or an expression. */
const narrowed = computed(() => shell.hasFacets.value || Boolean(shell.query.value.expr.trim()))

/**
 * How many records a type holds, said beside its name in the list of them.
 *
 * The population is what the schema publishes, and it is what makes that list
 * a chooser rather than a row of names: how many of each of these there are.
 * The type in force says something else as soon as the query narrows it — how
 * many rows matched — because that is the count that is true of what is on
 * screen, and the whole result is no longer what is being listed.
 */
function countOf(entity: EntitySchema): string {
  const chosen = entity.key === shell.query.value.entity
  if (chosen && narrowed.value && !props.hideCount) return formatCount(shell.total.value)
  return entity.count
}

/** A type as the list offers it: what it is called, and how many there are. */
function optionLabel(entity: EntitySchema): string {
  return `${entity.label} · ${countOf(entity)}`
}

/**
 * `Everything`, and how much of it there is while it is what is being listed.
 *
 * The corpus population is the one count no schema publishes, so the number
 * here is the only one the shell has: the size of the result it asked for.
 * Listing a type instead leaves this a plain name — how big the whole corpus
 * is is then a question nobody has put to the source.
 */
const everythingLabel = computed(() => {
  if (shell.query.value.entity !== null || props.hideCount) return 'Everything'
  return `Everything · ${formatCount(shell.total.value)}`
})

/* ------------------------------------------------------- how they are drawn */

/**
 * The views on offer, as the chooser beside the type lists them.
 *
 * How the results are drawn used to be said here rather than chosen — the tail
 * of the one-line summary, and then only on a query with nothing in it to
 * lift. It is a part of the query like the type is, so it is a control like
 * the type is, and it stays on the bar however narrow the query gets. The
 * whole sentence is still there as the row's title.
 */
const viewOptions = computed<{ key: ViewKind; label: string }[]>(() =>
  (props.views ?? [...VIEW_KINDS]).map((key) => ({ key, label: VIEW_LABELS[key] })),
)

/**
 * Which of them is in force. A URL naming a view the host withheld draws as
 * the first on offer — {@link resolveView}, the same reading the results area
 * takes — so the chooser says what is on screen rather than sitting blank.
 */
const view = computed(() => resolveView(shell.query.value.view, props.views))

function chooseView(event: Event): void {
  shell.setView((event.target as HTMLSelectElement).value as ViewKind)
}

/**
 * The parts of the query the bar offers as pills — every active facet and
 * every term of the expression. The entity filter is not among them: it is a
 * choice rather than a thing to take off, and it has the control at the head
 * of the row to itself.
 *
 * `or` marks a term that starts a new alternative. An expression's `OR` groups
 * are alternatives, and a plain row of pills would otherwise read them as one
 * list of things that all have to hold.
 */
const terms = computed(() =>
  shell.terms.value.filter((term) => term.facetKey !== ENTITY_TERM).map((term, at, all) => {
    const before = all[at - 1]
    return {
      term,
      or: before?.group !== undefined && term.group !== undefined && term.group !== before.group,
    }
  }),
)

/* ------------------------------------------------------ what a part reads as */

/**
 * The record each `field:value` part of the query narrows to, where it narrows
 * to one — see {@link useRecordNames}.
 */
const records = useRecordNames({
  source: shell.source,
  schema: shell.schema,
  query: shell.query,
  terms: shell.terms,
})

/**
 * What a part says. `set:"sets_10007"` is what the query *is*, and a join key
 * is not something anyone recognises — so where the id turns out to name a
 * record, the part says which record: `set:Yellow Castle (sets_10007)`. The id
 * stays, because it is what the expression field holds and what a shared URL
 * carries; the name is what makes it readable.
 */
function labelOf(term: SummaryTerm): string {
  const name = records.nameOf(term)
  return name ? `${term.field}:${name} (${term.value})` : term.label
}

/* ---------------------------------------------------------- what is listed */

/**
 * Which type the results are, as the choice it is rather than as a part to
 * take off: the useful move from one entity is almost always another entity,
 * and lifting the filter altogether is one option among them rather than the
 * only one on offer.
 */
function chooseEntity(event: Event): void {
  const key = (event.target as HTMLSelectElement).value
  shell.setEntity(key || null)
}

/* ------------------------------------------------------------ pressing the bar */

/**
 * A press on the bar opens the query panel.
 *
 * The bar is the toggle's *surface* rather than the toggle itself, because the
 * query now sits on it and each part of a query is a control of its own — a
 * button cannot hold another. So a press that landed on one of them belongs to
 * it and stops there, and the chevron at the end is a real button carrying
 * what the surface does for anyone not using a pointer.
 */
function pressBar(event: MouseEvent): void {
  if ((event.target as HTMLElement | null)?.closest('button, select, label')) return
  emit('toggle')
}

/* --------------------------------------------------------- parts off the end */

const termBar = ref<HTMLElement | null>(null)

/**
 * Which side of the row has parts on it that are not on screen — `start`,
 * `end`, `both`, or nothing at all.
 *
 * The row scrolls rather than wraps and its scrollbar is hidden, so without
 * this a long query is silently cut: constraints the results are already
 * filtered by, with nothing on screen to say they are there. The edge with
 * more behind it is softened instead, which is what the attribute drives.
 */
const more = ref<'' | 'start' | 'end' | 'both'>('')

function measureTerms(): void {
  const element = termBar.value
  if (!element) {
    more.value = ''
    return
  }
  // A fraction of a pixel is not somewhere anyone can scroll to, and flex
  // rounding leaves one about as often as not.
  const before = element.scrollLeft > 1
  const after = element.scrollWidth - element.clientWidth - element.scrollLeft > 1
  more.value = before && after ? 'both' : before ? 'start' : after ? 'end' : ''
}

/*
 * Measured rather than derived, because whether the parts fit is a fact about
 * the rendered row: the width of the bar, the length of every label, and the
 * font they came out in. Watched only while there is a row to watch.
 */
let watching: ResizeObserver | null = null
watch(
  termBar,
  (element) => {
    watching?.disconnect()
    watching = null
    measureTerms()
    if (!element || typeof ResizeObserver === 'undefined') return
    watching = new ResizeObserver(measureTerms)
    watching.observe(element)
  },
  { flush: 'post' },
)

/*
 * The row keeps its element while its contents change — lifting a part of a
 * query that stays narrowed — and the observer sees no resize in that, since
 * what changed is inside it.
 */
watch(terms, measureTerms, { flush: 'post' })

onBeforeUnmount(() => watching?.disconnect())

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
    <!-- The whole of this is the toggle: the domain it opens on, the query as
         it stands, and the chevron that says which way it goes. -->
    <div
      class="dc-header__trigger"
      @click="pressBar"
    >
      <span
        class="dc-header__badge"
        aria-hidden="true"
      >◆</span>
      <span class="dc-header__domain">{{ domain.label }}</span>

      <!-- The query: what is being listed, and everything narrowing it. -->
      <div
        ref="termBar"
        class="dc-header__query dc-header__terms"
        :data-dc-more="more"
        :title="shell.summary.value"
        @scroll="measureTerms"
      >
        <!-- Which type, always — a query is about something even when nothing
             is filtered, and the whole corpus is a scope like any other. It is
             the one part of a query that is a choice rather than a thing to
             take off, so `Everything` is in the list beside the types and
             widening back out stays one press. -->
        <label class="dc-header__pick">
          <span class="dc-header__sr">Type</span>
          <span class="dc-header__pick-box">
            <select
              class="dc-header__pick-select dc-header__scope-select"
              :value="shell.query.value.entity ?? ''"
              @change="chooseEntity"
            >
              <option value="">{{ everythingLabel }}</option>
              <option
                v-for="option in shell.entities.value"
                :key="option.key"
                :value="option.key"
              >{{ optionLabel(option) }}</option>
            </select>
            <span
              class="dc-header__pick-mark"
              aria-hidden="true"
            >▾</span>
          </span>
        </label>

        <!-- And how they are drawn, always as well, for the same reason: it is
             a part of the query, so it is on the bar whatever else is. -->
        <label class="dc-header__pick">
          <span class="dc-header__sr">View</span>
          <span class="dc-header__pick-box">
            <select
              class="dc-header__pick-select dc-header__view-select"
              :value="view"
              @change="chooseView"
            >
              <option
                v-for="option in viewOptions"
                :key="option.key"
                :value="option.key"
              >{{ option.label }}</option>
            </select>
            <span
              class="dc-header__pick-mark"
              aria-hidden="true"
            >▾</span>
          </span>
        </label>

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
            :title="`Remove ${labelOf(entry.term)}`"
            :aria-label="`Remove ${labelOf(entry.term)}`"
            @click="shell.removeTerm(entry.term)"
          >
            {{ labelOf(entry.term) }}
          </button>
        </template>
      </div>

      <!-- What the surface does, for anyone not using a pointer: a surface is
           nothing a keyboard can reach, so the press itself is a button. -->
      <button
        type="button"
        class="dc-header__toggle"
        :aria-expanded="expanded"
        :aria-controls="panelId"
        @click="emit('toggle')"
      >
        <span
          class="dc-header__chevron"
          aria-hidden="true"
        >{{ expanded ? '▲' : '▼' }}</span>
        <span class="dc-header__sr">{{ expanded ? 'Hide query panel' : 'Edit query' }}</span>
      </button>
    </div>

    <!-- Off the trigger's surface, because stepping through pages is not part
         of the query and pressing here should not open the panel. -->
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
  border-radius: var(--dc-radius);
  cursor: pointer;
}

/*
 * The whole surface lights up, because the whole surface opens the panel —
 * except while the pointer is over a part of the query, which is a control of
 * its own and does something else entirely when it is pressed.
 */
.dc-header__trigger:hover:not(:has(.dc-term:hover, .dc-header__pick:hover)) {
  background: var(--dc-bg-1);
}

.dc-header[data-dc-expanded='true']
  .dc-header__trigger:hover:not(:has(.dc-term:hover, .dc-header__pick:hover)) {
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
 * The parts take the rest of the bar: what the query is is the longest thing
 * on it, and the chevron is held to the end by the toggle beside them.
 */
.dc-header__terms {
  /* How much of the edge the cue below softens — a good part of a pill, so
     that what is cut off reads as cut off rather than as ending there. */
  --dc-terms-cue: 32px;

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

/*
 * And the cut says that it is one.
 *
 * A scrollbar is what would otherwise say there is more, and this row hides
 * its own — so the edge with parts behind it is softened instead. Which edge
 * that is is measured rather than animated: a scroll timeline leaves its end
 * state applied once the row stops overflowing, which is exactly what lifting
 * a part does, and the fade would sit over a full row for good.
 */
.dc-header__terms[data-dc-more='start'] {
  mask-image: linear-gradient(to right, transparent, #000 var(--dc-terms-cue));
}

.dc-header__terms[data-dc-more='end'] {
  mask-image: linear-gradient(to left, transparent, #000 var(--dc-terms-cue));
}

.dc-header__terms[data-dc-more='both'] {
  mask-image:
    linear-gradient(to right, transparent, #000 var(--dc-terms-cue)),
    linear-gradient(to left, transparent, #000 var(--dc-terms-cue));
  mask-composite: intersect;
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

/*
 * The two parts of the query that are chosen rather than lifted: which type is
 * being listed, and how it is drawn. They sit in the row of parts because that
 * is what they are — terms of the query — and read as ones, so the bar is
 * still one line of the same thing rather than widgets with pills after them.
 */
.dc-header__pick {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  font-size: var(--dc-text-code);
  cursor: pointer;
}

.dc-header__pick-box {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/*
 * Drawn as the shell draws the rest of its controls rather than as the
 * operating system draws a select, so that the pills beside it and the box
 * around it are recognisably one row of the same instrument.
 */
.dc-header__pick-select {
  appearance: none;
  max-width: 24ch;
  padding: 3px 20px 3px 8px;
  background: var(--dc-accent-bg);
  border: 1px solid var(--dc-accent-dim);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-accent);
  font-family: inherit;
  font-size: var(--dc-text-code);
  line-height: 1.5;
  text-overflow: ellipsis;
  cursor: pointer;
}

.dc-header__pick-select:hover {
  border-color: var(--dc-accent);
}

/* The mark the appearance above took away. It belongs to the select, so it
   never takes the press that should open it. */
.dc-header__pick-mark {
  position: absolute;
  right: 7px;
  color: var(--dc-accent);
  font-size: var(--dc-text-eyebrow);
  line-height: 1;
  pointer-events: none;
}

/* The one thing here that is not a term: what separates two alternatives. */
.dc-header__or {
  flex: 0 0 auto;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

/*
 * The press itself. It carries what the bar does — `aria-expanded`, the panel
 * it controls, and a name saying which way it goes — and is drawn as nothing
 * but the chevron, because the surface around it is the button as far as a
 * pointer is concerned.
 */
.dc-header__toggle {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  margin-left: auto;
  padding: 4px;
  border: none;
  border-radius: var(--dc-radius-sm);
  background: transparent;
  cursor: pointer;
}

.dc-header__chevron {
  font-size: var(--dc-text-eyebrow);
  line-height: 1;
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
 * The same divider the query takes, so the bar reads as one row of instruments
 * rather than a summary with something stuck on the end.
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
 * Narrow: drop the domain name, keep the query. What is being listed is in the
 * query itself — the type, its count, and whatever narrows it — so the name of
 * the domain is the one thing here that can go.
 */
@container (max-width: 720px) {
  .dc-header__domain {
    display: none;
  }

  .dc-header__query {
    padding-left: 0;
    border-left: none;
  }
}
</style>
