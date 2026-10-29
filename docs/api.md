# Component API

## `<DataShell>`

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `schema` | `DomainSchema` | — | Required. |
| `source` | `DataSource` | mock over the schema | Where rows come from. |
| `route` | `RouteAdapter` | injected, else History API | How the query reaches the URL. |
| `defaults` | `ShellQueryDefaults` | home, `cards` (one type: `table`), `updated`, `desc` | Fallbacks for fields the URL omits. `landing: 'entity'` opens on one entity's list in `view`; `entityView` is the view a type opens in. |
| `within` | `string` | — | An expression every query is read inside, held here rather than in the URL. See [a shell about one record](records.md#a-shell-about-one-record). |
| `previewsPerType` | `number` | `3` | Rows in each home-screen type card. `0` draws headings only (name and count, no `create`), in narrower wrapping columns. |
| `typeChooser` | `'scoped' \| 'always'` | `'scoped'` | `scoped` offers the type list only once a type is filtered to; `always` offers it on `Everything` too. |
| `selectionPlacement` | `'start' \| 'end'` | `'start'` | Where the ticked count and Clear sit: leading the strip, or at its end beside the operations. |
| `limit` | `number` | `50` | Rows per page. |
| `pagesNote` | `string` | — | What the count is short of (`first 1,200 of 30,200 lots`). Shown in the pager's tooltip; keeps the pager up on a single page. See [paging](#paging-through-the-results). |
| `views` | `ViewKind[] \| ((context: ViewsContext) => ViewKind[])` | all seven | The offered views. A URL naming one not offered renders the first that is. One view hides the View chooser. A function gets `{ entity, records }` — see [cards for the records the query names](records.md#cards-for-the-records-the-query-names). |
| `loading` | `boolean` | `false` | The source's answers are not yet the data: shows *Loading…*, hides the pager, corrects nothing from a count. See [while the data is on its way](#while-the-data-is-on-its-way). |
| `recordCards` | `Record<string, Component>` | — | A component per type, given `id`, for each record the query names. Shorthand for the `record` slot — see [cards for the records the query names](records.md#cards-for-the-records-the-query-names). |
| `pageQuery` | `'shell' \| 'detached'` | `'shell'` | Whether a `page` is about the query. `detached` shows the pristine query and sends the first edit to `listPath`. Read only while a `page` is provided — see [a page that is not about the query](#a-page-that-is-not-about-the-query). |
| `listPath` | `string` | `'/'` | Where a detached page's first edit lands. |
| `accent` | `string` | — | Overrides `--dc-accent`. Shorthand for `tokens`. |
| `tokens` | `Record<string, string>` | — | Tokens set on the shell element, e.g. `{ '--dc-surface': '#101418' }`. |
| `theme` | `'minimal' \| 'mono-size' \| 'dark' \| 'light' \| 'auto' \| 'macos' \| 'windows' \| 'inherit'` | `'minimal'` | `minimal`: paper, ink and hairlines only. `auto` follows the system. `macos` / `windows` wear that system's look and scheme. `inherit` brings no palette; `mono-size` also drops the type scale (one size, one weight). |
| `rowPress` | `'open' \| 'narrow'` | `'narrow'` | Pressing a row adds the record to the query, or (`open`) emits `activate` and applies nothing. See [narrowing to one record](records.md#narrowing-to-one-record). |
| `rowLinks` | `boolean` | `false` | Makes every table cell a real link to where pressing the row goes, so middle click and the context menu work anywhere on the row. Controls in the row stay pressable; one link per row is tabbable. For a name column with `activate: false`. |
| `pinnable` | `boolean` | `false` | Offers the star on rows. |
| `selectable` | `boolean` | `false` | Offers ticks even where the type names no operation. A type naming `duplicate` or `delete` offers them anyway. |
| `pinned` | `string[]` | — | `v-model:pinned`; omit and the shell holds it. |
| `selected` | `string[]` | — | `v-model:selected`; omit and the shell holds it. |
| `navigationMode` | `'push' \| 'replace'` | `'push'` | For entity, view, sort and expression. |
| `facetNavigationMode` | `'push' \| 'replace'` | `'replace'` | For a facet set through `setFacet` and its kin. |

**Events**

| Event | When |
| --- | --- |
| `activate(row)` | a row is opened |
| `create(entity)` | a create button is pressed |
| `duplicate(selection)` / `delete(selection)` | the ticked records are to be copied or deleted |
| `drill(row, entity)` | a row was narrowed to (already applied) |
| `query-change(query)` | after the URL was updated |
| `toggle-pin(row)`, `update:pinned`, `update:selected` | |

**Slots**

| Slot | Props | For |
| --- | --- | --- |
| `actions` | | extra controls at the right of the bar |
| `brand` | `label` | a mark in place of the domain's name — see [a mark for the name](#a-mark-for-the-name) |
| `cards-before` / `cards-after` | | [cards of your own](records.md#cards-of-your-own) around the card-per-type screen |
| `record` | `entity`, `id` | cards about [each record the query names](records.md#cards-for-the-records-the-query-names) |
| `page` | `query` | [a page of your own](#a-page-of-your-own-under-the-bar) under the bar |
| `results` | `rows`, `total`, `offset`, `pageCount`, `query`, `pending`, `loading` | replaces the content area. `rows` is the current page; `query` is the committed query with the box's draft ANDed on — see [the field it is edited in](query-language.md#the-field-it-is-edited-in) |

## A mark for the name

The domain's name at the left of the bar is a button that resets the shell to
the schema's defaults, as `reset()` does. The `brand` slot draws a mark in its
place; the name stays the accessible text, and the mark takes `currentColor`
and is handed `label`.

```vue
<DataShell :schema="schema">
  <template #brand>
    <svg viewBox="0 0 16 16" width="18" height="18">…</svg>
  </template>
</DataShell>
```

## A page of your own under the bar

The `page` slot replaces the results under the same bar, for a form or
report about the query (run every spec it matches, export every row).

```vue
<DataShell :schema="schema" :route="route">
  <template v-if="$route.name === 'run-new'" #page="{ query }">
    <RunForm :query="query" />
  </template>
</DataShell>
```

Unlike `results`, a page does not draw the rows. While it is provided:

- the bar has **no pager**, and there is **no strip over the results** (no
  Type or View chooser, no [operations](schemas.md#records-you-can-copy-and-delete));
- **nothing corrects the URL's page** from a count, so `p` is intact when the
  list comes back.

Provide it with `v-if`; without it the shell is the list again. The query
still runs, so `total` on the context is how many the page would act on.

### A page that is not about the query

For a page that only shares the bar — a new-record form, a run report — whose
URL parameters are its own (`/crawl-report/x?crawl=run-7`), set
`pageQuery="detached"`:

- the bar reads the **pristine query** (`Everything`), and the page is handed
  that as `query`;
- the **first edit** — a word and Enter, a type chosen, a term committed —
  navigates to `listPath` (`/` by default) with that edit applied, pushing, so
  Back returns to the page;
- nothing is written while the reader only reads.

It is read only while a `page` is provided, so one shell can carry it on
every route. With every route rendering the same `ShellView`:

```vue
<script setup lang="ts">
const router = useRouter()
const route = createVueRouterAdapter(router)
const PAGES = { 'run-new': RunStartView, 'crawl-report': CrawlReportView }
const ABOUT_THE_QUERY = new Set(['run-new'])   // the run form runs what the query matches

const name = computed(() => String(router.currentRoute.value.name))
const page = computed(() => PAGES[name.value] ?? null)
</script>

<template>
  <DataShell
    :schema="schema"
    :route="route"
    :page-query="ABOUT_THE_QUERY.has(name) ? 'shell' : 'detached'"
  >
    <template v-if="page" #page>
      <component :is="page" v-bind="router.currentRoute.value.params" />
    </template>
  </DataShell>
</template>
```

On `/runs/new?e=tests&q=checkout` the bar reads `Tests · checkout` and an edit
narrows the run. On `/crawl-report/x?crawl=run-7` it reads `Everything`, and
`checkout` + Enter lands on `/?q=checkout`.

`detachableAdapter(adapter, { detached, path })` is the adapter that does
this, for a host wiring `useQueryState` to its own chrome.

## Paging through the results

`limit` is a page size, not a ceiling. When results run past it the bar gains
a pager (`‹ 3 / 4 ›`), and the page is in the URL as `p`.

- **Shown only when there is somewhere to go** — not for one page, and not on
  the home screen's type cards.
- **Typed as well as stepped.** Click the number, type a page, Enter. Empty or
  Escape leaves it.
- **Row numbers keep counting** across pages (page three of 12-row pages opens
  at 25).
- **A change to what matched returns to page one** — entity, facets,
  expression, sort, direction. Changing the view does not.
- **A page past the end lands on the last page** once results arrive,
  replacing rather than pushing. A typed page is clamped before navigating.
- **A count still being made says so** — `1 / ~4` while an async `query` is in
  flight or a [stream](data-sources.md#results-that-arrive-over-time) is
  open, `1 / 4` once it closes.
- **`pagesNote`** puts your line under the pager's tooltip (`Page 1 of 12 —
  rows 1 to 100 of 1,200`) for a source that stopped part way, and keeps the
  pager up on a single page.

### While the data is on its way

Until a synchronous source's payloads land it answers "no rows", and the shell
would correct `?p=7` to page one. Pass `loading` until then:

```vue
<DataShell :schema="schema" :source="source" :loading="!ready" />
```

While it is true the results say *Loading…*, the pager is hidden and nothing
is corrected; the bar stays usable. When it turns false the URL is read
against the results as if just mounted: `p=7` stays if there are seven pages,
else lands on the last.

A source gets `offset` and `limit` and reports `total` for the whole match —
see [wiring it to your data](data-sources.md#wiring-it-to-your-data). For your
own chrome, `useShellContext()` carries `limit`, `offset`, `pageCount` and
`total`, and the query state has `setPage`:

```ts
const shell = useShellContext()
shell.pageCount.value          // 4
shell.query.value.page         // 3
shell.setPage(shell.query.value.page + 1)
shell.hrefFor({ page: 4 })     // a link, without navigating
```

## The table stays inside the shell

The table lays out fixed: columns with a `width` keep it, the rest share what
is left, so it is never wider than the shell. Overflow is truncated, and hover
shows the full *value* — `1.2k` hovers as `1240`. `cellFull(column, row)` is
that string, for a cell of your own.

**Except where the depth is already paid for.** A table with an image column
(`kind: 'image'`) or any column stating a `height` lets long values run to
`--dc-table-lines` lines (3) before truncating. Every other table keeps one
line per row.

Below the widths it needs, columns stand down at the container width their
[`hideBelow`](schemas.md#columns-of-your-own) names. In the fixtures' set the
metrics go first, then the kind, then the date; name, secondary and state
remain.

## Where the results go on

The results scroll in their own box, and each edge with more behind it is
faded. The box lists those edges in `data-dc-more` (any of `top right bottom
left`, space-separated, or empty — match with `~=`). The fade stops short of a
classic scrollbar and clears once the box is scrolled to that edge or stops
overflowing.

## Composables

`useQueryState` is the query model without the markup — the URL binding for
your own chrome:

```ts
const state = useQueryState({ schema, adapter, defaults })
state.query.value       // the live ShellQuery, derived from the URL
state.entity.value      // the EntitySchema filtered to, or null for everything
state.isEverything.value
state.summary.value     // 'entity:searches · state:running'
state.terms.value       // the removable parts: entity, facets, expression terms
state.setEntity('logs')
state.clearEntity()     // back to everything
state.toggleChip('state', 'running')
state.setPage(3)        // any filter change returns to page 1
state.hrefFor({ view: 'grid' })   // build a link without navigating
```

`usePoll(tick, intervalMs)` polls behind a source of your own. `tick` resolves
to whether to continue; ticks never overlap, and polling stops with the
component. A throwing tick stops it — catch and return `true` to keep going.

```ts
const poll = usePoll(async () => {
  payload.value = await api.load()
  return true
}, 5000)
onMounted(poll.start)  // poll.stop(), poll.polling
```

Also exported:

| | |
| --- | --- |
| `useResults` | drives a source, streaming or not: `rows`, `total`, `pageCount`, `pending`, `error`, `refresh` |
| `useColumns` | the scope's column set |
| `usePresentedRows` | rows with every role resolved into `parts` |
| `useRecordNames` | the names behind the ids a query narrows by |
| `useStableSchema` | a schema rebuilt from live data — see [rows you already have](data-sources.md#rows-you-already-have) |
| `useShellContext` | the shell's context, below |

The context also carries:

- **the selection** — `selectable`, `selection`, `isSelected`, `toggleSelect`,
  `selectPage`, `clearSelection`, plus `create`, `duplicate` and `delete`, so
  a view of your own can offer ticks. `<RecordActions>` is the strip over the
  results (Type and View choosers) for a host laying out the parts itself;
- **`within`**, the shell's scope, which is not on `query`. `useResults` and
  `useEntityPreviews` take it as an option, to keep your own results area in
  the same scope;
- **the draft** — `liveQuery` (the query results are read under while a draft
  is typed), `draft`, `drafting`, `commitDraft`, `abandonDraft`.

With `provideShellContext` the five draft members are optional; without them
the box narrows nothing until Enter. To read it live: make it with
`useDraft({ query, entity, setExpression })`, pass its `live` to `useResults`,
provide its parts on the context, and route `setPage` to the draft's while
`drafting`. `DataShell` is the worked example.
