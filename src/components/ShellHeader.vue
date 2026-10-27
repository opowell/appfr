<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useShellContext } from '../composables/context'
import { useRecordNames } from '../composables/useRecordNames'
import { scopedEntity } from '../query/drill'
import { isTypeCardsQuery } from '../query/schema'
import { formatCount } from '../data/format'
import { ENTITY_TERM, summaryTerms } from '../query/summary'
import type { SummaryTerm } from '../query/summary'
import type { ViewKind } from '../types'

const props = defineProps<{
  /** Views to offer, when the host restricts them. Defaults to all six. */
  views?: ViewKind[]
  /**
   * What the count is short of, in the host's words — `first 1,200 of 30,200
   * lots`. Said where the count is, which is the pager's hover text, rather
   * than on the bar beside it.
   */
  pagesNote?: string
  /**
   * Leave the pager off the bar — while the results are not yet the data
   * (`loading` on `DataShell`), or under a page of the host's, where there
   * is nothing to page.
   */
  hidePages?: boolean
}>()

const slots = defineSlots<{
  /** Extra controls at the right end of the bar. */
  actions?: () => unknown
  /**
   * The domain's mark, drawn in place of its name — see `brand` on
   * `DataShell`. The name stays the bar's accessible text.
   */
  brand?: (props: { label: string }) => unknown
}>()

const shell = useShellContext()

const domain = computed(() => shell.schema.value)

/* --------------------------------------------------------- what this is about */

/**
 * The scope the shell is read inside, as the parts it is written with.
 *
 * Read through the same machinery as the query's own terms — an expression
 * broken into parts, each looked up where it names a record — so a scope that
 * is a join key comes out as the record it points at rather than as an id.
 * What it is *not* is a term to lift: it did not come from the URL and there
 * is nothing behind it to go back to, so it sits at the head of the bar as the
 * thing the page is about and the query goes on beside it.
 */
const scopeTerms = computed<SummaryTerm[]>(() => {
  const within = shell.within.value.trim()
  if (!within) return []
  return summaryTerms({ ...shell.query.value, expr: within }, null)
})

/**
 * The parts of the query the bar offers as pills — every active facet and
 * every term of the expression. The entity filter is not among them: it is a
 * choice rather than a thing to take off, and it has its own control over the
 * results — see `RecordActions`.
 *
 * `or` marks a term that starts a new alternative. An expression's `OR` groups
 * are alternatives, and a plain row of pills would otherwise read them as one
 * list of things that all have to hold.
 *
 * `idle` marks a term on the listed entity's own scope field — `condition:N`
 * while Conditions are what is listed. The list does not apply it to itself
 * (see `withoutOwnScope`), so the pill says so rather than promising a
 * narrowing the rows do not show; it is still the query's, still there to
 * lift, and applies again the moment another type is listed. A type that
 * keeps its scope has no idle term: the list does apply it.
 */
const terms = computed(() => {
  const entity = shell.entity.value
  const own = entity?.keepsScope ? undefined : entity?.scope?.toLowerCase()
  return shell.terms.value.filter((term) => term.facetKey !== ENTITY_TERM).map((term, at, all) => {
    const before = all[at - 1]
    return {
      term,
      or: before?.group !== undefined && term.group !== undefined && term.group !== before.group,
      idle: Boolean(own) && term.field?.toLowerCase() === own,
    }
  })
})

/* ------------------------------------------------------ what a part reads as */

/**
 * The record each `field:value` part of the query narrows to, where it narrows
 * to one — see {@link useRecordNames}.
 */
const records = useRecordNames({
  source: shell.source,
  schema: shell.schema,
  query: shell.query,
  // The scope's parts as well as the query's: it names a record more often
  // than a typed term does, being what a record's own page is built on.
  terms: computed(() => [...scopeTerms.value, ...shell.terms.value]),
})

/**
 * The word in front of a resolved part's name — the field it was written
 * with, or {@link EntitySchema.scopeLabel} where that field reads poorly on
 * its own (`id` naming an item is not a word a reader recognises; `item` is).
 */
function fieldLabelOf(field: string): string {
  return scopedEntity(domain.value, field)?.scopeLabel ?? field
}

/**
 * A name however it happens to have its own record's id folded into it —
 * `'Yellow Castle (sets_10007)'`, a row drawing its own identity column the
 * way a table wants it read. The header already says which record this is by
 * naming it at all, so a second id trailing the name is noise rather than
 * information.
 */
function withoutOwnId(name: string): string {
  return name.replace(/\s*\([^()]*\)\s*$/, '')
}

/**
 * What a part says. `set:"sets_10007"` is what the query *is*, and a join key
 * is not something anyone recognises — so where the id turns out to name a
 * record, the part says which record: `set: Yellow Castle`.
 */
function labelOf(term: SummaryTerm): string {
  const name = records.nameOf(term)
  if (!name) return term.label
  // The sign stays in front of the name as it stood in front of the id: what
  // the part says is that this record is out, and the name only says which.
  const sign = term.negated ? '-' : ''
  return `${sign}${fieldLabelOf(term.field!)}: ${withoutOwnId(name)}`
}

/**
 * What a part says on hover: that pressing it takes it out — or, for an idle
 * one, that it is not applied here — and, where the part says its field by
 * the name on screen, how the address and the box write it, which is what to
 * type to say it again.
 */
function titleOf(entry: { term: SummaryTerm; idle: boolean }): string {
  const label = labelOf(entry.term)
  const action = entry.idle
    ? `Not applied to ${shell.entity.value?.label} — remove ${label}`
    : `Remove ${label}`
  const address = entry.term.address
  return address && address !== label ? `${action}\nWritten ${address} in the address and the search box` : action
}

/* ------------------------------------------------------- adding to the query */

/**
 * The box after the parts, where the next one is written.
 *
 * The bar shows the query as the parts it is made of, and each of them comes
 * out when it is pressed — so the row reads as a field of parts, and a field
 * of parts has a box at the end of it, and it is the one place the query is
 * written: most of what anyone types is a name to look for, and the rest is
 * a term — `p<5`, `quantity:100..` — written the same way.
 *
 * The box is a draft. It never holds the query's own text — what is committed
 * shows as pills beside it, like every other part — so Enter ANDs what was
 * typed on to the query as it stands, and the box empties to take the next.
 * `refineExpression` rather than a plain join, because a query with `OR` in
 * it is alternatives, and a word added to it is added to each of them — and
 * because a term typed the other way round from one the query holds turns it,
 * as a press on the record would, rather than leaving the query saying both.
 *
 * It is a draft the results already answer, though: what is typed narrows
 * them as it is typed, the URL untouched until Enter — see `liveQuery` on the
 * context. The text is the shell's rather than this component's for that
 * reason: the results are read under it, and a press on one of them is what
 * gives it up.
 */
const searchBox = ref<HTMLInputElement | null>(null)

/* A function rather than a name: a `ref` inside a `v-for` collects an array,
   and the box is drawn inside the loop over the runs of parts. */
function keepBox(element: unknown): void {
  searchBox.value = element instanceof HTMLInputElement ? element : null
}

/** Escape gives up on what is half-typed: the query stands as it was. */
function abandonSearch(): void {
  shell.abandonDraft()
  searchBox.value?.blur()
}

/** Enter adds what is typed on to the query, and the part lands at the end. */
function commitSearch(): void {
  caret.value = null
  shell.commitDraft()
}

/* ------------------------------------------------- where the box sits */

/**
 * Where the box sits among the parts, counted in parts: `0` is in front of the
 * first, and `null` is after the last, which is where it is until someone
 * moves it.
 *
 * The parts are in the field the way characters are in a line of text. The
 * arrow keys step the box past them one at a time, Backspace takes out the one
 * in front of it and Delete the one after. A box with something typed in it
 * steps only from the edge its caret is at, and takes what is typed with it:
 * a part is one character, and the draft is the word being written.
 *
 * Where a part goes in an expression changes nothing about what it matches,
 * so a part committed from the middle still lands at the end. Only where the
 * box is drawn moves. The parts move around the box rather than the box
 * among them: a focused field taken out of the document loses its focus, and
 * everything typed into it with that.
 */
const caret = ref<number | null>(null)

const at = computed(() => Math.min(caret.value ?? Infinity, terms.value.length))

/** The parts in front of the box and the parts after it. */
const runs = computed(() => [
  { key: 'before', entries: terms.value.slice(0, at.value) },
  { key: 'after', entries: terms.value.slice(at.value) },
])

/** Whether the box is between two parts rather than at the end of them. */
const between = computed(() => at.value < terms.value.length)

/*
 * A query changed from somewhere else (a press in the results, Back) can
 * leave the caret counting parts that are gone.
 */
watch(terms, (now) => {
  if (caret.value !== null && caret.value >= now.length) caret.value = null
})

/**
 * Puts the box in front of part `to`, with the caret at the edge it came in
 * by, so that holding the key keeps going the same way.
 */
function moveBox(to: number, edge: 'start' | 'end'): void {
  caret.value = to >= terms.value.length ? null : Math.max(0, to)
  void nextTick(() => {
    const box = searchBox.value
    if (!box) return
    const place = edge === 'start' ? 0 : box.value.length
    box.setSelectionRange(place, place)
    box.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    measureTerms()
  })
}

/** Whether the caret is at one edge of what is typed, nothing selected. */
function caretAt(edge: 'start' | 'end'): boolean {
  const box = searchBox.value
  if (!box || box.selectionStart !== box.selectionEnd) return false
  return box.selectionStart === (edge === 'start' ? 0 : box.value.length)
}

function stepBack(event: KeyboardEvent): void {
  if (at.value === 0 || !caretAt('start')) return
  event.preventDefault()
  moveBox(event.key === 'Home' ? 0 : at.value - 1, 'start')
}

function stepOn(event: KeyboardEvent): void {
  if (!between.value || !caretAt('end')) return
  event.preventDefault()
  moveBox(event.key === 'End' ? terms.value.length : at.value + 1, 'end')
}

/** Backspace at the start of the box lifts the part in front of it. */
function backspaceSearch(event: KeyboardEvent): void {
  if (at.value === 0 || !caretAt('start')) return
  event.preventDefault()
  lift(terms.value[at.value - 1]!.term, true)
}

/** And Delete at the end of it, the part after it. */
function deleteSearch(event: KeyboardEvent): void {
  if (!between.value || !caretAt('end')) return
  event.preventDefault()
  lift(terms.value[at.value]!.term, false)
}

/*
 * One listener for the keys that step through the field. Vue's `.delete`
 * modifier answers Backspace as well as Delete, which here would be two parts
 * lifted for one press.
 */
function stepThrough(event: KeyboardEvent): void {
  if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if (event.key === 'ArrowLeft' || event.key === 'Home') stepBack(event)
  else if (event.key === 'ArrowRight' || event.key === 'End') stepOn(event)
  else if (event.key === 'Backspace') backspaceSearch(event)
  else if (event.key === 'Delete') deleteSearch(event)
}

/** Takes a part out. One in front of the box takes the box back a place. */
function lift(term: SummaryTerm, inFront: boolean): void {
  if (inFront && caret.value !== null) caret.value = Math.max(0, caret.value - 1)
  shell.removeTerm(term)
}

/**
 * A press on the field where there is no part is a press on the box. The
 * caret goes to the end, as it does in a text field pressed past its text.
 */
function pressField(event: MouseEvent): void {
  if ((event.target as HTMLElement | null)?.closest('button, input')) return
  event.preventDefault()
  searchBox.value?.focus()
  moveBox(terms.value.length, 'end')
}

/** Nothing typed and nowhere to be: the box goes back to the end. */
function leaveSearch(): void {
  if (!shell.draft.value) caret.value = null
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
watch([terms, at], measureTerms, { flush: 'post' })

onBeforeUnmount(() => watching?.disconnect())

/* -------------------------------------------------------------------- pages */

/** The page on screen — the draft's own, while one is being typed. */
const page = computed(() => shell.liveQuery.value.page)

/**
 * Pages are offered when there is more than one and when the results below are
 * what would be paged. The home screen's cards are the exception: a card per
 * type runs its own per-entity query, so the shell's single result set is not
 * what is on screen and stepping through it would move nothing.
 *
 * A note from the host is the other reason to be there: it says the count is
 * short, and the count is what the pager hovers as — so a single page with
 * more of it to come is still worth the readout, steps and all.
 */
const paged = computed(
  () =>
    !props.hidePages &&
    (shell.pageCount.value > 1 || Boolean(props.pagesNote)) &&
    !isTypeCardsQuery(shell.query.value, props.views),
)

/**
 * How many pages there are, as far as is known. While the source is still
 * counting the total is what it has found so far, and a streaming source finds
 * more — so the count is said as one that may yet grow, `~4` rather than `4`.
 * Not while it only fetches another page of a query it has counted: the rows
 * are on their way, but the number of pages is known.
 */
const pages = computed(() =>
  `${shell.counting.value ? '~' : ''}${formatCount(shell.pageCount.value)}`,
)

/**
 * Where this page sits in the whole result. The bar shows the short form and
 * says this much to a tooltip and a screen reader, since `2 / 5` on its own
 * does not say what it is counting — and the host's note under it, since what
 * the count is short of is a fact about the same number.
 */
const position = computed(() => {
  let place = `Page ${formatCount(page.value)} of ${pages.value}`
  const shown = shell.rows.value.length
  if (shown) {
    const first = shell.offset.value + 1
    const total = `${shell.counting.value ? '~' : ''}${formatCount(shell.total.value)}`
    place += ` — rows ${formatCount(first)} to ${formatCount(first + shown - 1)} of ${total}`
  }
  return props.pagesNote ? `${place}\n${props.pagesNote}` : place
})

/**
 * What the box holds: the page being typed while it is being typed, and the
 * query's own page at every other moment. Nothing tells the box to catch up
 * after a step, a new query or a Back — it was never holding its own number.
 */
const draft = ref<string | null>(null)
const typed = computed(() => draft.value ?? String(page.value))

/**
 * Room for the last page's digits and no more, so the field neither grows
 * under the typing hand nor leaves the steps sitting apart from it. The
 * padding is added back on: the shell borders every box, so the width it is
 * given is the outside of one and the digits would be squeezed out of it.
 */
const boxWidth = computed(
  () => `calc(${Math.max(2, String(shell.pageCount.value).length)}ch + 10px)`,
)

/** Typing over the number is the point, so a click offers it up whole. */
function offerAll(event: FocusEvent): void {
  const box = event.target as HTMLInputElement
  box.select()
}

/** Pages are counted in digits, and the box holds nothing else. */
function keepDigits(event: Event): void {
  const box = event.target as HTMLInputElement
  const digits = box.value.replace(/[^0-9]/g, '')
  /* Held in the element as well as the ref: Vue re-renders from `typed`, which
     a rejected keystroke leaves unchanged, and the box would keep it. */
  if (box.value !== digits) box.value = digits
  draft.value = digits
}

/**
 * A typed page lands on one that exists. Past the end is the last page, the
 * same place the steps stop at; a box left empty, or holding what is not a
 * page at all, is a page not asked for and leaves this one where it is.
 */
function jumpToTyped(event: Event): void {
  const box = event.target as HTMLInputElement
  const wanted = Number(draft.value)
  draft.value = null
  const landed =
    Number.isFinite(wanted) && wanted >= 1
      ? Math.min(Math.trunc(wanted), Math.max(1, shell.pageCount.value))
      : page.value
  box.value = String(landed)
  if (landed !== page.value) shell.setPage(landed)
}

/** Escape is the way out of a half-typed number: the page it left stands. */
function abandonTyped(event: Event): void {
  const box = event.target as HTMLInputElement
  draft.value = null
  box.value = String(page.value)
  box.blur()
}
</script>

<template>
  <div class="dc-header">
    <!-- The domain, and the query as it stands: where the query is read and
         edited, and the only place it is. -->
    <div class="dc-header__main">
      <!-- The name, which is the way home. A host's mark, where it has one,
           is drawn for the eye and hidden from assistive technology, which
           reads the name it stands for. -->
      <button
        v-if="slots.brand"
        type="button"
        class="dc-header__domain"
        data-dc-brand
        title="Home"
        @click="shell.reset()"
      >
        <span
          class="dc-header__brand"
          aria-hidden="true"
        >
          <slot
            name="brand"
            :label="domain.label"
          />
        </span>
        <span class="dc-header__sr">{{ domain.label }}</span>
      </button>
      <button
        v-else
        type="button"
        class="dc-header__domain"
        title="Home"
        @click="shell.reset()"
      >
        {{ domain.label }}
      </button>

      <!-- What the shell is read inside, where it is read inside anything: not
           a part of the query and not something to take off, so it sits before
           the query rather than in the row of parts that scrolls. -->
      <span
        v-if="scopeTerms.length"
        class="dc-header__within"
      >
        <span class="dc-header__sr">Within</span>
        <span
          v-for="term in scopeTerms"
          :key="`scope:${term.id}`"
          class="dc-within dc-mono dc-truncate"
          :title="labelOf(term)"
        >{{ labelOf(term) }}</span>
      </span>

      <!-- The query: everything narrowing what is listed. Which type it is,
           and how it is drawn, are chosen over the results — see
           `RecordActions`. -->
      <div class="dc-header__query">
        <!-- The search field, with the parts already in it: each one a
             button that takes itself out, and the box wherever the caret has
             been stepped to among them. A press on a part keeps the focus in
             the box, so typing goes on where it was. -->
        <div
          class="dc-header__field"
          @mousedown="pressField"
        >
          <div
            ref="termBar"
            class="dc-header__terms"
            :data-dc-more="more"
            :title="shell.summary.value"
            @scroll="measureTerms"
          >
            <template
              v-for="run in runs"
              :key="run.key"
            >
              <span class="dc-header__run">
                <template
                  v-for="entry in run.entries"
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
                    :class="{ 'dc-term--idle': entry.idle }"
                    :title="titleOf(entry)"
                    :aria-label="`Remove ${labelOf(entry.term)}`"
                    @mousedown.prevent
                    @click="lift(entry.term, run.key === 'before')"
                  >
                    {{ labelOf(entry.term) }}
                  </button>
                </template>
              </span>

              <!-- Between the two runs, and the same element wherever the
                   caret is. What it holds is a draft the results are already
                   read under: Enter adds it to the query, and it then stands
                   in the field as a part. -->
              <input
                v-if="run.key === 'before'"
                :ref="keepBox"
                v-model="shell.draft.value"
                class="dc-header__search dc-mono"
                :class="{ 'dc-header__search--between': between }"
                :style="{ '--dc-typed': String(Math.max(1, shell.draft.value.length)) }"
                type="text"
                autocomplete="off"
                spellcheck="false"
                :placeholder="between ? '' : 'Search…'"
                aria-label="Search"
                @keydown.enter.prevent="commitSearch"
                @keydown.esc.prevent="abandonSearch"
                @keydown="stepThrough"
                @blur="leaveSearch"
              >
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Beside the query rather than in it: stepping through pages is not
         part of the query. -->
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
      >
        <!-- The page is typed as well as stepped: page 30 is twenty-nine
             presses away and one number wide. A text box rather than a number
             one, because the spinner a number box brings is already here,
             either side of it, counting in pages it knows the end of. -->
        <input
          class="dc-header__page-box dc-mono"
          type="text"
          inputmode="numeric"
          autocomplete="off"
          aria-label="Page"
          :style="{ width: boxWidth }"
          :value="typed"
          @focus="offerAll"
          @input="keepDigits"
          @keydown.enter.prevent="jumpToTyped"
          @keydown.esc.prevent="abandonTyped"
          @blur="jumpToTyped"
        >
        <span
          class="dc-header__page-total"
          aria-hidden="true"
        >/ {{ pages }}</span>
      </span>
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
      v-if="slots.actions"
      class="dc-header__actions"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.dc-header {
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

.dc-header__main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  margin-left: -8px;
  padding: 6px 8px;
  border-radius: var(--dc-radius);
}

/*
 * The name, and the way home. Set as the name always was rather than as a
 * button, being the domain's name first; the press shows itself only on the
 * way past, with room made for its tint that the margin takes back, so the
 * name does not move to make it.
 */
.dc-header__domain {
  flex: 0 0 auto;
  margin: -3px -6px;
  padding: 3px 6px;
  border: none;
  border-radius: var(--dc-radius-sm);
  background: transparent;
  font: inherit;
  font-size: var(--dc-text-body);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-1);
  cursor: pointer;
}

.dc-header__domain:hover {
  background: var(--dc-bg-2);
}

/* A mark sits on the bar's centre line, as the name's text does; its size is
   its own, and its colour the name's unless it says otherwise. */
.dc-header__domain[data-dc-brand],
.dc-header__brand {
  display: inline-flex;
  align-items: center;
}

.dc-header__query {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 6px;
  min-width: 0;
  padding-left: 12px;
  border-left: 1px solid var(--dc-line);
}

/*
 * The search field, with the parts in it. It takes the rest of the bar,
 * because what the query is is the longest thing on it.
 *
 * Bare unless a host says otherwise, so that an empty one is the rest of the
 * row rather than a widget on it. A dark surface can leave a bare field a
 * faint smudge, and a resting fill and edge make it read as one. The tokens
 * are the host's and unset here, and the fallbacks are the field as it has
 * always been. Focus anywhere in it swaps in the accent edge.
 */
.dc-header__field {
  display: flex;
  flex: 1 1 auto;
  min-width: 12ch;
  padding: 0 3px;
  background: var(--dc-search-fill, none);
  border: 1px solid var(--dc-search-border, transparent);
  border-radius: var(--dc-radius-sm);
  cursor: text;
}

.dc-header__field:focus-within {
  border-color: var(--dc-accent-dim);
  background: var(--dc-bg-0);
}

.dc-header__terms {
  /* How much of the edge the cue below softens — a good part of a pill, so
     that what is cut off reads as cut off rather than as ending there. */
  --dc-terms-cue: 32px;

  display: flex;
  align-items: center;
  flex: 1;
  gap: 5px;
  min-width: 0;
  padding: 2px 0;
  /* One line, scrolled rather than wrapped: the bar is one row high, and a
     query long enough to wrap would push the pager off it. */
  overflow-x: auto;
  scrollbar-width: none;
  white-space: nowrap;
}

/* The parts in front of the box and after it, laid out as one row. */
.dc-header__run {
  display: contents;
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
 * The box the next part is typed into, drawn as nothing: the field around it
 * is the edge, and the placeholder is what says it is there. At the end of the
 * parts it takes whatever room they leave and never less than a few
 * characters, so a long query scrolls the parts rather than squeezing the box
 * out of the row.
 */
.dc-header__search {
  flex: 1 1 auto;
  min-width: 8ch;
  padding: 3px 3px;
  background: none;
  border: none;
  color: var(--dc-fg-1);
  font-size: var(--dc-text-code);
  line-height: 1.5;
  outline: none;
  cursor: text;
}

.dc-header__search::placeholder {
  color: var(--dc-search-placeholder, var(--dc-fg-3));
}

/*
 * Between two parts it is as wide as what is typed in it and no wider, the
 * way a caret between two characters takes no room of its own. `--dc-typed`
 * is the number of characters, for a browser that cannot size a field by its
 * content.
 */
.dc-header__search--between {
  flex: 0 0 auto;
  min-width: 0;
  width: calc(var(--dc-typed, 1) * 1ch + 6px);
}

@supports (field-sizing: content) {
  .dc-header__search--between {
    field-sizing: content;
    width: auto;
    min-width: 1ch;
  }
}

/*
 * A term the listed type does not apply to itself. Drawn as a part of the
 * query still — the same pill, in the same row, lifted the same way — but
 * hollow, so it reads as held rather than in force.
 */
.dc-term--idle {
  background: transparent;
  border-style: dashed;
  color: var(--dc-fg-2);
}

/*
 * What the shell is read inside — a part of the query, drawn as one.
 *
 * It constrains the results exactly as a term does and reads as the same kind
 * of thing, so it is the same pill. What it has not got is the press: there is
 * nothing to lift, because it did not come from the query and the page would
 * not be this page without it.
 */
.dc-header__within {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: 0 1 auto;
  min-width: 0;
  padding-left: 12px;
  border-left: 1px solid var(--dc-line);
}

.dc-within {
  max-width: 34ch;
  padding: 3px 8px;
  background: var(--dc-accent-bg);
  border: 1px solid var(--dc-accent-dim);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-accent);
  font-size: var(--dc-text-code);
  line-height: 1.5;
}

/* The one thing here that is not a term: what separates two alternatives. */
.dc-header__or {
  flex: 0 0 auto;
  font-size: var(--dc-text-micro);
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
  display: inline-flex;
  align-items: center;
  gap: 4px;
  /* Held to a width, so stepping 9 → 10 does not shuffle the buttons. */
  min-width: 46px;
  justify-content: center;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

/*
 * A number on the bar until it is used: no frame, no fill, sized to its digits.
 * The readout is what it has to look like, because that is what it is for all
 * but the few seconds a page is being typed into it.
 */
.dc-header__page-box {
  min-width: 0;
  padding: 1px 2px;
  background: none;
  border: 1px solid transparent;
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-1);
  font-size: var(--dc-text-micro);
  line-height: 1;
  text-align: center;
}

.dc-header__page-box:hover {
  border-color: var(--dc-line);
}

/* Under the caret it is a field and is filled like one. The accent ring is the
   shell's own, which every focused thing here wears, so the border stays the
   quiet one rather than doubling it. */
.dc-header__page-box:focus {
  background: var(--dc-bg-0);
  border-color: var(--dc-line);
  color: var(--dc-fg-0);
}

/*
 * Narrow: drop the domain name, keep the query. What is being listed is in the
 * query itself — the type, its count, and whatever narrows it — so the name of
 * the domain is the one thing here that can go.
 */
@container (max-width: 720px) {
  .dc-header__domain,
  .dc-header__domain[data-dc-brand] {
    display: none;
  }

  /* With the domain gone, whatever is first on the bar has nothing to its
     left to be divided from — and the scope, where there is one, is what the
     query is then divided from instead. */
  .dc-header__within,
  .dc-header__query {
    padding-left: 0;
    border-left: none;
  }

  .dc-header__within + .dc-header__query {
    padding-left: 12px;
    border-left: 1px solid var(--dc-line);
  }

  .dc-within {
    max-width: 20ch;
  }
}
</style>
