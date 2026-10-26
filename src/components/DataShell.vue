<script setup lang="ts">
/*
 * The shell's tokens and shared utilities, all namespaced under `.dc-shell`.
 * Imported here rather than from `src/index.ts` so the emitted declaration
 * files stay free of a CSS module consumers cannot resolve; the built package
 * still collects every rule into a single `style.css`.
 */
import '../style/tokens.css'

import { computed, inject, nextTick, onBeforeUnmount, onBeforeUpdate, ref, useId, watch } from 'vue'
import type { Component } from 'vue'
import type {
  DataSource,
  DomainSchema,
  EntitySchema,
  NarrowedRecord,
  PressOptions,
  Selection,
  ShellAlign,
  ShellQuery,
  ShellQueryDefaults,
  ShellRow,
  ShellTheme,
  ShellWidthMatch,
  ViewKind,
  ViewsOption,
} from '../types'
import type { RouteAdapter } from '../routing/adapter'
import { ROUTE_ADAPTER_KEY } from '../routing/adapter'
import { createHistoryAdapter } from '../routing/history'
import { detachableAdapter } from '../routing/detached'
import { createMockDataSource } from '../data/mock'
import { drillExpression, recordsIn, scopeTermFor } from '../query/drill'
import { provideShellContext } from '../composables/context'
import { useQueryState } from '../composables/useQueryState'
import type { NavigationMode } from '../composables/useQueryState'
import { useResults } from '../composables/useResults'
import { useDraft } from '../composables/useDraft'
import ShellHeader from './ShellHeader.vue'
import QueryPanel from './QueryPanel.vue'
import RecordActions from './RecordActions.vue'
import ResultsArea from './ResultsArea.vue'

const props = withDefaults(
  defineProps<{
    /** The vocabulary the shell renders: entities, facets, labels, samples. */
    schema: DomainSchema
    /**
     * Where rows come from. Defaults to a deterministic mock source over the
     * schema's own samples, so the shell is demonstrable — and testable — with
     * nothing behind it.
     */
    source?: DataSource
    /**
     * How the query reaches the URL. Defaults to an injected adapter, or a
     * History API adapter when nothing is provided.
     */
    route?: RouteAdapter
    /** Query fields to fall back to when the URL omits them. */
    defaults?: ShellQueryDefaults
    /**
     * An expression the whole shell is read *inside* — its scope, held here
     * rather than in the URL.
     *
     * It is ANDed on to every query the shell runs: the result set, the
     * per-type cards on the home screen, and the counts beside each type. So
     * the header says what matched *within* it, and no part of the bar lifts
     * it, because it is not something the reader asked for — it is what this
     * shell is about. A page for one record is the case it exists for:
     * `within="test:&quot;x.spec.ts&quot;"` and the home screen becomes a card
     * per type of everything that names that record.
     *
     * The query the reader does own goes on working as it always did, inside
     * this. Nothing here reaches the URL, so the same URL under a different
     * scope is a different set of rows — which is right for a scope that comes
     * from the route rather than from the query.
     */
    within?: string
    /**
     * Rows per page: the most the source is asked for at once. The header
     * offers the pages this divides the results into, and the page itself is
     * in the URL.
     */
    limit?: number
    /**
     * Rows shown inside each type's card on the home screen — the most
     * recently updated few, under the current sort. `0` draws each card as its
     * heading alone, the type and its count, in narrower columns that wrap.
     */
    previewsPerType?: number
    /**
     * Restricts the offered result views. One on offer leaves the bar without
     * a View chooser.
     *
     * Or a function of what the query is about, for a host whose screens each
     * want their own — asked again whenever the type in force or the records
     * the query narrows to change, with both: `({ entity, records }) =>
     * entity ? ['table'] : records.length ? ['cards'] : ['table', 'cards']`.
     * It saves the host reading the query back out of the URL to decide, and
     * the shell has already read it.
     */
    views?: ViewsOption
    /**
     * Whether what the source answers is not yet the data: the host's
     * payloads are still on their way, and a synchronous source over none of
     * them says, truthfully, "no rows, nought of nought".
     *
     * The shell believes a count — it corrects a page past the end of the
     * results to the last page there is — so a link to `?p=7` opened before
     * the rows had landed would be rewritten to page 1, and the rows it named
     * never seen. While this is true the results area says it is loading
     * rather than what matched, and nothing is corrected from a count; when
     * it turns false the shell reads the URL against the results as if it had
     * only just been mounted, and corrects then if there is anything to.
     *
     * The header stays up the whole time, so the query can still be read and
     * edited — what it cannot yet say is how many matched, so the pager is off
     * the bar until it can.
     */
    loading?: boolean
    /**
     * Whether a `page` is about the query. Read only while one is provided.
     *
     * `shell`, the default, is a page whose input the query is — a form that
     * runs every spec the query matches: the bar reads the URL the page is
     * on, and an edit to it stays on that page, narrowing what it acts on.
     *
     * `detached` is a page that is about something else — a form making a
     * new record, a report on one run — and only shares the bar. Its URL's
     * parameters are the page's own (`?crawl=…`), not a query, so the bar
     * reads the pristine one, `Everything`; and the first edit to it is a way
     * back to the list — it navigates to {@link listPath} with that edit
     * applied, pushing, so Back returns to the page.
     */
    pageQuery?: 'shell' | 'detached'
    /**
     * Where a detached page's first edit to the bar lands — the path the
     * list is at. `/` unless it says otherwise: the root of a vue-router app
     * (its `base` and hash are the router's to add) and of a memory adapter.
     * A shell mounted below the root under the History API says its own.
     */
    listPath?: string
    /**
     * A card set of the host's own per record the query narrows to, by the
     * record's type — `{ tests: TestCards }` — rendered as `<component :is
     * :id>` where the `record` slot would be. The shorthand for a slot that
     * would only look the component up; a type with no entry here has no
     * cards of its own. The slot wins where both are given.
     */
    recordCards?: Record<string, Component>
    /**
     * Where the bar offers the list of types. `scoped`, the default, only
     * while one is filtered to — on `Everything` the home screen's cards are
     * each headed by their type already. `always` keeps it on `Everything`
     * too, for a home screen that opens as records rather than as type cards.
     */
    typeChooser?: 'scoped' | 'always'
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string
    /**
     * Design tokens set on the shell element — `{ '--dc-surface': '#101418' }`.
     * Setting a seed (`--dc-surface`, `--dc-ink`, `--dc-accent`) moves every
     * value derived from it; setting a derived token overrides just that one.
     */
    tokens?: Record<string, string>
    /**
     * `minimal`, the default, is paper, ink and hairlines with nothing else
     * on: no hue, no shadow, no rounded corner — the values the layout stops
     * working without and no more. `auto` follows the system setting. `macos`
     * and `windows` wear that system's typography, corners and accent, and
     * follow its scheme too.
     * `inherit` brings no palette at all: the shell takes the host's
     * background, text colour and font. `mono-size` is `inherit` with the
     * type scale given up as well — every word, headings and URLs and inputs
     * and tags alike, set at the host's one size and one weight — for a host
     * that has already decided how text looks.
     */
    theme?: ShellTheme
    /**
     * How the header bar and the panel that drops from it are brought to one
     * width. `grow`, the default, widens the panel to the bar, so the query
     * opens over exactly what it summarizes however wide the shell is.
     * `shrink` brings the bar in to the panel instead — to `--dc-header-width`
     * — which keeps a query off the far edges of a very wide screen.
     */
    matchWidth?: ShellWidthMatch
    /**
     * Where that narrowed pair sits across the shell. Only `shrink` leaves
     * anything to align: a panel grown to a full-width bar already spans it.
     */
    headAlign?: ShellAlign
    /** Offers the star affordance on rows. */
    pinnable?: boolean
    /**
     * Offers the tick on rows whether or not the type being listed names an
     * operation for a selection. A type that names `duplicate` or `delete`
     * offers ticks anyway — this is for a host whose bulk action is its own,
     * reading `v-model:selected` and doing the rest itself.
     */
    selectable?: boolean
    /**
     * What pressing a row means.
     *
     * `narrow`, the default, adds that record to the query: everything about
     * it, of every type, and the record's own name in the bar saying so. It is
     * the move the `→` used to be on its own — so where a press narrows, the
     * rows carry no `→`, the row being it.
     *
     * `open` reports the press as {@link activate} and applies nothing, for a
     * host that routes to a page of its own instead.
     *
     * A row whose type declares no {@link EntitySchema.scope} cannot be
     * narrowed to at all — nothing carries its id — so those are reported
     * either way, and a host that only handles those need do nothing else.
     */
    rowPress?: 'open' | 'narrow'
    /**
     * What the count is short of, in the host's words — `first 1,200 of
     * 30,200 lots` for a seller whose pages are still being fetched, or were
     * given up on part way. The shell counts pages from the rows its source
     * has reported, so the pager reads as if that were all of them; this goes
     * under the pager's hover text, which is where that count is explained.
     * Empty says nothing.
     */
    pagesNote?: string
    navigationMode?: NavigationMode
    facetNavigationMode?: NavigationMode
  }>(),
  {
    rowPress: 'narrow',
    loading: false,
    pageQuery: 'shell',
    listPath: '/',
    limit: 50,
    previewsPerType: 3,
    typeChooser: 'scoped',
    theme: 'minimal',
    matchWidth: 'grow',
    headAlign: 'center',
    navigationMode: 'push',
    facetNavigationMode: 'replace',
  },
)

const emit = defineEmits<{
  /** A row was opened. */
  activate: [row: ShellRow]
  /**
   * A new record of this type was asked for, from the button the entity's
   * `create` label puts on its card. Nothing has been made: this is the
   * request.
   */
  create: [entity: EntitySchema]
  /**
   * The ticked records were to be copied, or deleted — the two operations the
   * entity's own `duplicate` and `delete` labels named. Nothing has been
   * copied and nothing has been deleted: this is the request, as `create` is.
   */
  duplicate: [selection: Selection]
  delete: [selection: Selection]
  /**
   * One of the entity's own `operations` was asked for, by its key. Reported
   * as the two above are, and nothing else happens.
   */
  operate: [key: string, selection: Selection]
  /**
   * Narrowing to one record was asked for: from the affordance an entity's
   * `scope` puts on its rows, or from a metric its `drills` named an entity
   * for. `entity` is what to list afterwards, null when the row itself was
   * pressed. The query is unchanged — this is the request.
   */
  drill: [row: ShellRow, entity: EntitySchema | null, options: PressOptions]
  /** The query changed. The URL has already been updated. */
  'query-change': [query: ShellQuery]
  'toggle-pin': [row: ShellRow]
}>()

/**
 * Each of these is optionally controlled: bind `v-model:open`,
 * `v-model:pinned` or `v-model:selected` to own the state, or leave them alone
 * and the shell keeps it internally. `defineModel` distinguishes the two by
 * whether the prop was actually passed, which a plain boolean prop cannot do —
 * Vue casts an absent boolean to `false`.
 */
const panelOpen = defineModel<boolean>('open', { default: false })
const pinned = defineModel<string[]>('pinned', { default: () => [] })
/** Which records are ticked, by id — see the `Selection` an operation carries. */
const selected = defineModel<string[]>('selected', { default: () => [] })

const slots = defineSlots<{
  /** Extra controls at the right end of the header bar. */
  actions?: () => unknown
  /**
   * The domain's mark at the left end of the bar, drawn in place of its name
   * — a logo, an icon. The name stays the bar's accessible text, read out
   * where the mark is drawn, so the label is still the one place the name is
   * written; the mark itself is hidden from assistive technology.
   *
   * A mark rather than a control: the whole bar is the query panel's toggle,
   * and a link inside it would be a second press on the same surface.
   */
  brand?: (props: {
    /** {@link DomainSchema.label}, for a mark that wants to say it too. */
    label: string
  }) => unknown
  /**
   * A section of your own at the end of the query panel — for the controls
   * that belong to the application rather than to the query, which the header
   * bar would otherwise have to carry beside the summary it is there to show.
   */
  'panel-section'?: () => unknown
  /**
   * Cards of the host's own, above and below the card-per-type screen — the
   * things a shell read inside one record has to say that no type of record
   * holds. They are grid cells of the same grid, so `<ShellCard>` is what
   * makes one look like the cards it sits among, and `span` is how one takes
   * more of the row than a type card does.
   *
   * Only the per-type screen has them, that being the only view made of cards
   * rather than of records: `Everything` chosen, `Cards` drawn.
   */
  'cards-before'?: () => unknown
  'cards-after'?: () => unknown
  /**
   * Cards of the host's own about each record the query narrows to — once
   * per record, in the order the query names them, before `cards-before`.
   *
   * A record named in the query is what the screen is *about*: pressing a
   * row puts its term there, and lifting the term takes it away. The per-type
   * cards say what the corpus holds of it; what no type holds — the form that
   * acts on it, its metadata, its log — is the host's, and this is where it
   * goes, so a record's cards follow the query rather than a route. A record
   * is a positive term on a field some type declares as its `scope`;
   * repeated names count once, case aside.
   *
   * Only on the per-type screen, as `cards-before` is.
   */
  record?: (props: { entity: EntitySchema; id: string }) => unknown
  /**
   * A page of the host's own in place of the results, under the same header
   * — for the screens of an application that are not lists (a form, a
   * report) but are still about the query: the header shows it, and editing
   * it there edits it here.
   *
   * Unlike `results`, which is handed the rows to draw in its own way, a page
   * is not a drawing of the rows: the bar carries no pager and no View
   * chooser, there being nothing under it to page or to draw differently;
   * the type's operations are not offered over it; and nothing corrects the
   * URL's page from a count. Provide it conditionally — `<template v-if="…"
   * #page>` — and the shell is the list again the moment it is not.
   *
   * A page that is not about the query at all says so with `pageQuery`.
   */
  page?: (props: {
    /** The committed query, as the URL has it — pristine on a detached page. */
    query: ShellQuery
  }) => unknown
  /** Replaces the entire results area. */
  results?: (props: {
    /** The current page of rows, not the whole result. */
    rows: ShellRow[]
    /** Rows matching the query, across every page of them. */
    total: number
    /** Rows before the first of `rows` — for numbering that keeps counting. */
    offset: number
    pageCount: number
    /**
     * The query these rows answer: the committed one, with whatever is being
     * typed in the header's box ANDed on — see `liveQuery` on the context.
     */
    query: ShellQuery
    pending: boolean
    /** The `loading` prop: what the source answers is not yet the data. */
    loading: boolean
  }) => unknown
}>()

/* ------------------------------------------------------------------- route */

/**
 * Resolved once: an adapter is infrastructure, not reactive state. When the
 * shell has to create its own it also owns tearing it down.
 */
const injectedAdapter = inject(ROUTE_ADAPTER_KEY, null)
const ownedAdapter = props.route || injectedAdapter ? null : createHistoryAdapter()
const adapter: RouteAdapter = props.route ?? injectedAdapter ?? (ownedAdapter as RouteAdapter)

onBeforeUnmount(() => ownedAdapter?.dispose?.())

/**
 * Whether the area under the bar is a page of the host's — see the `page`
 * slot. A ref brought up to date before each render rather than a computed,
 * because a slot passed conditionally comes and goes with the parent's render
 * and nothing reactive says so; the correction below watches this.
 */
const hasPage = ref(Boolean(slots.page))
onBeforeUpdate(() => {
  hasPage.value = Boolean(slots.page)
})

/**
 * The adapter the query is read through: the host's own, or — under a page
 * that is not about the query — one standing apart from the URL, reading the
 * pristine query and writing its first change to the list. See `pageQuery`.
 */
const queryAdapter = detachableAdapter(adapter, {
  detached: () => hasPage.value && props.pageQuery === 'detached',
  path: () => props.listPath,
})

/* ------------------------------------------------------------------- state */

const fallbackSource = computed<DataSource>(() => createMockDataSource({ seed: props.schema.key }))
const source = computed<DataSource>(() => props.source ?? fallbackSource.value)

const query = useQueryState({
  schema: () => props.schema,
  adapter: queryAdapter,
  defaults: () => props.defaults,
  navigationMode: () => props.navigationMode,
  facetNavigationMode: () => props.facetNavigationMode,
})

/** Trimmed once: an empty scope and no scope at all are the same shell. */
const within = computed(() => props.within?.trim() ?? '')

/**
 * What is typed in the header's box, read as it is typed — see
 * {@link useDraft}. The results are asked the query it makes, `live`, which
 * is the committed query itself whenever the box is empty.
 */
const draft = useDraft({
  query: query.query,
  entity: query.entity,
  setExpression: query.setExpression,
})

const results = useResults({
  source,
  query: draft.live,
  schema: computed(() => props.schema),
  entity: query.entity,
  limit: computed(() => props.limit),
  within,
})

watch(query.query, (value) => emit('query-change', value))

/* ----------------------------------------------------------------- records */

/**
 * The records the committed query narrows to, in the order it names them.
 *
 * A positive term whose field is some type's `scope` is a term *about a
 * record* — that is what a scope declares, and it is the reading the header
 * takes to put a name to the id in a pill. A negated one leaves the record
 * out, which is not the screen being about it; every other term is a
 * constraint on a value and names nothing. The same record named twice — in
 * two alternatives, or in two cases — is one record.
 *
 * The committed query rather than the live one: a draft is a search in
 * progress, and a record's own cards coming and going under each keystroke
 * would be the screen changing what it is about while it is being typed at.
 */
const records = computed<NarrowedRecord[]>(() => recordsIn(props.schema, [query.query.value.expr]))

/** Each record with its type, for the `record` slot and `recordCards`. */
const recordEntries = computed(() =>
  records.value.flatMap((record) => {
    const entity = props.schema.entities.find((candidate) => candidate.key === record.entityKey)
    return entity ? [{ ...record, entity }] : []
  }),
)

/**
 * The records there are cards of the host's own for: every one, for the slot,
 * and those of the types the map names, for the map. A function rather than a
 * computed, because whether a slot was passed is read off the render and is
 * not something a computed can watch.
 */
function cardedRecords() {
  if (slots.record) return recordEntries.value
  const cards = props.recordCards
  if (!cards) return []
  return recordEntries.value.filter((record) => cards[record.entityKey])
}

/* ------------------------------------------------------------------ views */

/**
 * The views on offer, as every part reads them: the host's list as it is, or
 * what its function says of this screen. Asked afresh only when the type or
 * the records change, being all the function is told.
 */
const offeredViews = computed<ViewKind[] | undefined>(() => {
  const offered = props.views
  if (typeof offered !== 'function') return offered
  return offered({ entity: query.entity.value, records: records.value })
})

/*
 * A page past the end of the results — a bookmark to a query that has since
 * shrunk, or a hand-edited URL — lands on the last page there is. The codec
 * cannot do this: how many pages there are is a count only the source knows,
 * and it arrives with the results rather than with the URL.
 *
 * It replaces rather than pushes, so the back button does not lead straight
 * back to the page that was corrected and forward again.
 */
watch(
  [results.pageCount, results.pending, query.query, draft.drafting, () => props.loading, hasPage],
  () => {
    // A draft's pages are the draft's: the count is of its results, not of
    // the query's, and correcting the URL by it would write a page the query
    // never had — on a keystroke, which is the one thing a draft never does.
    if (results.pending.value || draft.drafting.value) return
    // Nor while the source is not yet answering with the data (`loading`):
    // its count is of nothing, and the page in the URL is the one the data
    // will have. Watched, so the correction is made when it lands — the
    // same as on a mount. A page of the host's pages nothing, so the URL's
    // page is left for the list to read when it is back.
    if (props.loading || hasPage.value) return
    const last = results.pageCount.value
    if (query.query.value.page > last) query.setPage(last, 'replace')
  },
  // Immediately, since a pasted URL is past the end before anything changes;
  // and after the render, so the correction is a navigation the mounted shell
  // makes rather than one it makes on the way up. An async source is still
  // pending here and corrects itself when its count lands.
  { immediate: true, flush: 'post' },
)

/* -------------------------------------------------------------- panel open */

const panelId = useId() ?? 'dc-query-panel'
const headerRef = ref<InstanceType<typeof ShellHeader> | null>(null)

function closePanel() {
  if (!panelOpen.value) return
  panelOpen.value = false
  // Return focus to the control that opened the panel rather than dropping
  // keyboard users at the top of the document.
  void nextTick(() => {
    const root = headerRef.value?.$el as HTMLElement | undefined
    root?.querySelector<HTMLElement>('.dc-header__toggle')?.focus()
  })
}

/* ----------------------------------------------------------------- pinning */

const pinnedIds = computed(() => new Set(pinned.value))

function togglePin(row: ShellRow) {
  const next = new Set(pinnedIds.value)
  if (next.has(row.id)) next.delete(row.id)
  else next.add(row.id)
  pinned.value = [...next]
  emit('toggle-pin', row)
}

/* --------------------------------------------------------------- selecting */

/**
 * Whether records may be ticked. The type in force naming something to do to a
 * selection is what usually says so — a tick with nothing to do to what it
 * ticks is a control that leads nowhere — and the prop offers them anyway, for
 * a host whose bulk action is its own.
 */
const selectable = computed(() => {
  if (props.selectable === true) return true
  const entity = query.entity.value
  return Boolean(entity?.duplicate || entity?.delete || entity?.operations?.length)
})

const selectedIds = computed(() => new Set(selected.value))

function toggleSelect(row: ShellRow) {
  const next = new Set(selectedIds.value)
  if (next.has(row.id)) next.delete(row.id)
  else next.add(row.id)
  selected.value = [...next]
}

function selectPage(on: boolean) {
  const next = new Set(selectedIds.value)
  for (const row of results.rows.value) {
    if (on) next.add(row.id)
    else next.delete(row.id)
  }
  selected.value = [...next]
}

function clearSelection() {
  if (selected.value.length) selected.value = []
}

/**
 * What an operation is asked of. The ids are the whole of it — a tick outlives
 * the page, the sort and the view it was made on — and the rows are the ticked
 * ones the current page happens to hold, handed over because a host that has
 * them need not fetch them again.
 */
const selection = computed<Selection>(() => ({
  ids: [...selected.value],
  rows: results.rows.value.filter((row) => selectedIds.value.has(row.id)),
  entity: query.entity.value,
}))

/*
 * Listing another type empties the selection.
 *
 * Ticks survive a sort, a page and a change of view, because none of those
 * changes which records they are. A change of type does: the operations are
 * named by the entity, so a selection of searches would be offered to the
 * scrapers' *Delete* — which is the one mistake here that cannot be taken
 * back. Narrowing and widening leave it alone; only the type does this.
 */
watch(() => query.query.value.entity, clearSelection)

/* ---------------------------------------------------------------- drilling */

/**
 * Narrowing to one record, applied here rather than reported and left.
 *
 * `activate` and `create` are reported because the shell cannot carry them out
 * — it has no router and makes nothing. This one it can: the schema already
 * says which field carries a record's id (`scope`) and what each metric counts
 * (`drills`), and the rest is a query change, which is the shell's own. The
 * event still goes out, so a host can follow it; it does not have to.
 */
function drill(row: ShellRow, entity: EntitySchema | null, options: PressOptions = {}) {
  /*
   * One navigation, not two: a route change is not synchronous, so setting the expression and
   * then the entity would serialise the second from the query the first had not yet written.
   *
   * Narrowing to a record *without* pivoting to a type takes the view with it, which is the
   * third thing in that one navigation. In a list, one record is a one-row list of the row just
   * pressed — the press going nowhere — and the screen narrowing to a record is worth making is
   * the card per type, where every card reports what it holds of it. A metric drill names a type
   * and is going to a list of it, so that one keeps the view it was drawn in.
   *
   * Leaving a record out goes nowhere at all: the list it was pressed in is the list it is now
   * missing from, the same type in the same view, one row shorter. Only a metric still pivots,
   * being a press on what the number counts — those tests, without this host's.
   */
  const expr = drillExpression(props.schema, query.query.value, row, options)
  if (options.exclude) {
    query.narrow(expr, entity?.key ?? query.query.value.entity)
  } else {
    /*
     * A record pressed while a draft is live is what the draft was looking
     * for: the answer to it rather than a refinement of it. So the draft goes
     * with the press — the words were how the record was found, and ANDed on
     * to the record's own screen they would hide most of what it is about.
     * Leaving one out keeps it, that being a refinement of the very list the
     * draft drew.
     */
    draft.release(() => query.narrow(expr, entity?.key ?? null, entity ? undefined : 'cards'))
  }
  emit('drill', row, entity, options)
}

/* ----------------------------------------------------------------- context */

/** Whether a press on the row narrows to it — the default, for a type with a scope. */
function narrowsHere(row: ShellRow): boolean {
  return props.rowPress === 'narrow' && scopeTermFor(props.schema, row) !== null
}

/** Where the row's record lives outside the shell — see `EntitySchema.href`. */
function recordHref(row: ShellRow): string | null {
  const entity = props.schema.entities.find((candidate) => candidate.key === row.entityKey)
  return entity?.href?.(row) || null
}

const shell = provideShellContext({
  ...query,
  draft: draft.text,
  liveQuery: draft.live,
  drafting: draft.drafting,
  commitDraft: draft.commit,
  abandonDraft: draft.abandon,
  /*
   * A page of what is on screen: the draft's, while one is live, which are
   * held beside it rather than in the URL — see `liveQuery`.
   */
  setPage: (page, mode) => {
    if (draft.drafting.value) draft.setPage(page)
    else query.setPage(page, mode)
  },
  schema: computed(() => props.schema),
  entities: computed(() => props.schema.entities),
  rows: results.rows,
  total: results.total,
  limit: computed(() => props.limit),
  offset: results.offset,
  pageCount: results.pageCount,
  pending: results.pending,
  counting: results.counting,
  error: results.error,
  source,
  previewsPerType: computed(() => props.previewsPerType),
  within,
  pinnable: computed(() => props.pinnable === true),
  isPinned: (row) => pinnedIds.value.has(row.id),
  isPinnedId: (id) => pinnedIds.value.has(id),
  togglePin,
  selectable,
  selection,
  isSelected: (row) => selectedIds.value.has(row.id),
  toggleSelect,
  selectPage,
  clearSelection,
  narrowsOnPress: computed(() => props.rowPress === 'narrow'),
  /*
   * The one place a press is read, so every view gets the same answer without
   * knowing which of the two it is: they all call this.
   */
  activate: (row, options = {}) => {
    if (narrowsHere(row)) {
      drill(row, null, options)
      return
    }
    // A record that lives somewhere opens there rather than being reported —
    // beside the shell, which keeps the reader's place in it.
    const away = recordHref(row)
    if (away) {
      window.open(away, '_blank', 'noopener')
      return
    }
    emit('activate', row)
  },
  pressHref: (row) =>
    narrowsHere(row)
      ? query.narrowHref(drillExpression(props.schema, query.query.value, row), null, 'cards')
      : recordHref(row),
  recordHref,
  drillHref: (row, entity) =>
    scopeTermFor(props.schema, row)
      ? query.narrowHref(
          drillExpression(props.schema, query.query.value, row),
          entity?.key ?? null,
          entity ? undefined : 'cards',
        )
      : null,
  create: (entity) => emit('create', entity),
  duplicate: () => emit('duplicate', selection.value),
  delete: () => emit('delete', selection.value),
  operate: (key) => emit('operate', key, selection.value),
  drill,
})

/*
 * Inline so it beats the stylesheet without the host needing a selector that
 * reaches the shell — the one place token overrides are guaranteed to win.
 */
const style = computed(() => {
  if (!props.accent && !props.tokens) return undefined
  return { ...props.tokens, ...(props.accent ? { '--dc-accent': props.accent } : {}) }
})

defineExpose({
  query: query.query,
  openPanel: () => {
    panelOpen.value = true
  },
  closePanel,
})
</script>

<template>
  <div
    class="dc-shell"
    :data-dc-theme="theme"
    :style="style"
  >
    <div
      class="dc-shell__head"
      :data-dc-width="matchWidth"
      :data-dc-align="matchWidth === 'shrink' ? headAlign : undefined"
    >
      <ShellHeader
        ref="headerRef"
        :expanded="panelOpen"
        :panel-id="panelId"
        :views="offeredViews"
        :type-chooser="typeChooser"
        :pages-note="pagesNote"
        :hide-pages="loading || hasPage"
        :hide-views="hasPage"
        @toggle="panelOpen = !panelOpen"
      >
        <template
          v-if="slots.brand"
          #brand="brandProps"
        >
          <slot
            name="brand"
            v-bind="brandProps"
          />
        </template>
        <template
          v-if="slots.actions"
          #actions
        >
          <slot name="actions" />
        </template>
      </ShellHeader>

      <template v-if="panelOpen">
        <!-- Full-bleed catcher: a click anywhere outside dismisses the panel
             without the results underneath also receiving it. -->
        <div
          class="dc-shell__scrim"
          @click="closePanel"
        />
        <div class="dc-shell__panel">
          <QueryPanel
            :panel-id="panelId"
            @close="closePanel"
          >
            <template
              v-if="slots['panel-section']"
              #panel-section
            >
              <slot name="panel-section" />
            </template>
          </QueryPanel>
        </div>
      </template>
    </div>


    <!-- A page of the host's, under the same bar: not a drawing of the rows,
         so none of what acts on them is offered over it. -->
    <div
      v-if="slots.page"
      class="dc-shell__page"
    >
      <slot
        name="page"
        :query="shell.query.value"
      />
    </div>

    <!-- What can be done with the records of the type being listed, over the
         records themselves and under the query that found them. It renders
         nothing where the type offers nothing, and stays put while the results
         scroll. -->
    <RecordActions
      v-if="!slots.page"
      :views="offeredViews"
    />

    <slot
      v-if="!slots.page"
      name="results"
      :rows="shell.rows.value"
      :total="shell.total.value"
      :offset="shell.offset.value"
      :page-count="shell.pageCount.value"
      :query="shell.liveQuery.value"
      :pending="shell.pending.value"
      :loading="loading"
    >
      <ResultsArea
        :views="offeredViews"
        :loading="loading"
      >
        <template
          v-if="slots['cards-before'] || cardedRecords().length"
          #cards-before
        >
          <!-- The records the query is about, before anything else the host
               puts among the cards: the screen is about them first. -->
          <template
            v-for="record in cardedRecords()"
            :key="`${record.entityKey}:${record.id}`"
          >
            <slot
              v-if="slots.record"
              :id="record.id"
              name="record"
              :entity="record.entity"
            />
            <component
              :is="recordCards?.[record.entityKey]"
              v-else
              :id="record.id"
            />
          </template>
          <slot name="cards-before" />
        </template>
        <template
          v-if="slots['cards-after']"
          #cards-after
        >
          <slot name="cards-after" />
        </template>
      </ResultsArea>
    </slot>
  </div>
</template>

<style scoped>
/*
 * A host's page takes the room the results would have, and scrolls in it the
 * way they do — the bar staying put above it.
 */
.dc-shell__page {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.dc-shell__head {
  position: relative;
  z-index: 30;
  flex: 0 0 auto;
}

/*
 * The bar and the panel are one width, and this is which of them gives way.
 * `grow` is the default and needs no rule: the bar already spans the shell and
 * the panel is pinned to the head's own edges below.
 *
 * `shrink` caps the head instead, which carries the bar and the panel with it,
 * and `align-self` moves the pair across the shell as one — the head is a flex
 * item of the shell's column, so this is its cross-axis alignment.
 */
.dc-shell__head[data-dc-width='shrink'] {
  width: 100%;
  max-width: var(--dc-header-width, 1220px);
}

.dc-shell__head[data-dc-align='left'] {
  align-self: flex-start;
}

.dc-shell__head[data-dc-align='center'] {
  align-self: center;
}

.dc-shell__head[data-dc-align='right'] {
  align-self: flex-end;
}

/*
 * Layering inside the head, which is itself above the content area:
 * the scrim covers the results, the panel sits over the scrim, and the header
 * bar sits over both so its trigger stays clickable while the panel is open.
 */
.dc-shell__scrim {
  position: fixed;
  inset: 0;
  z-index: 1;
}

.dc-shell__panel {
  position: absolute;
  top: calc(100% + 6px);
  /* The bar's own edges, whichever mode brought them here: the panel says what
     the bar says, so it is measured against the bar and nothing else. */
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  /* Constrains the panel so its own `overflow: auto` engages instead of the
     panel running off the bottom of a short container. */
  max-height: calc(100vh - var(--dc-header-height) - 24px);
}
</style>
