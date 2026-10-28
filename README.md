# appfr

> **Pre-alpha.** Breaking changes go out freely, in any release, with no
> deprecation period and no migration path. Pin an exact tag, and read the
> diff before moving to the next one.

A query header over a switchable content area, for data-heavy screens.

The header states what the current query is. Clicking it opens the expanded
query view. The content area shows the matching items in the chosen view and
sort order. **The query lives in the URL**, so every state the shell can be in
is a link someone can paste, bookmark, or reload into.

It is schema-driven: one `DomainSchema` describes the entities, their facets,
what their fields are called, and what the columns of each one's table are. The
same header and seven views serve any schema: swapping the schema swaps
the vocabulary, not the component.

For screens that are several things at once there is
[window-frame](https://github.com/opowell/window-frame): panels in a
recursively split grid, tabbed or floating where you want them, with a table
of items — views and all — being one thing a panel can hold.
[menu-bar](https://github.com/opowell/menu-bar) is the application menu over
the top of it. Both are packages of their own, and wear the same
[themes](https://github.com/opowell/themes).

```
┌──────────────────────────────────────────────────────────────┐
│ ◆ iRadar │ [Searches · 38 ▾] [List ▾] [state:running]          ▼│  ← header
├──────────────────────────────────────────────────────────────┤
│ 01  Competitor pricing pages      909  104  ▬▬▬▬   running   │
│ 02  Firmware release notes        737  288  ▬▬     ok        │  ← content
│ 03  Regulatory filings            173  135  ▬▬▬              │
└──────────────────────────────────────────────────────────────┘
```

## The home screen

The shell opens on **Home**: nothing is filtered, so *everything* is in the
result set — every entity the schema declares, logs and settings among them.
The default view shows it as **a card per item type**: the type's name, how
many of it there are, and its most recently updated few.

```
┌── Searches      38 ──┐ ┌── Items        10k ──┐ ┌── Scrapers      24 ──┐
│ Security advisories  │ │ Supplier directory   │ │ Hacker News          │
│   cve OR advisory    │ │   example.com/eu     │ │   news.ycombinator   │
│            350 NEW   │ │           476 LINKS  │ │          629 RULES   │
│ Job postings         │ │ Recall notice        │ │ RSS bridge           │
│ Competitor pricing   │ │ Recall notice · rev2 │ │ Hacker News · rev 4  │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘
┌── Logs       184k ───┐ ┌── Settings      20 ──┐
│ Index rebuilt        │ │ Digest schedule      │
│ …                    │ │ …                    │
└──────────────────────┘ └──────────────────────┘
```

A card's header filters the results to that type, which opens as a **table** of
its records; a row opens that record. The view a URL leaves out is the default
*for what it shows*, cards across types and a table within one, so a view nobody
chose follows a change of type while one somebody chose survives it.
`previewsPerType` sets how many rows each card shows (default 3), and each card
is queried on its own, so a quiet type still shows its latest rather than being
crowded out of a global top-N. `0` makes each card just its heading — the type
and its count, no `create` button — and wraps them in narrow columns, for a corpus whose types are
read by how many there are rather than by their latest few.

Entity is a filter, not a mode. There is no separate logs screen and no
separate settings screen: those are records with the same shape as any other,
in the same result set, until a filter excludes them. That filter is the first
part of the query in the header — `Logs · 184k`, a choice among the schema's
types with `Everything` among them — and choosing one is what reveals that
entity's own facets.

```
Home            →  everything · cards · updated     a card per type
Pick an entity  →  entity:logs                            48 records
Add a facet     →  entity:logs · level:error              11 records
Lift the entity →  everything · cards · updated     a card per type
```

Cards mean different things at different scopes, which is the point: filtered
to one entity they are one card per record; across every entity a card per
record would be a wall of mixed things, so it is a card per type instead. The
other six views always show the records themselves, mixed kinds and all.

An expression works across the whole corpus too. Searching from home narrows
every card at once and turns each card's count into how many of that type
matched — so the home screen doubles as a breakdown by kind. `entity:logs`
narrows by kind without leaving home.

One type can drop off that wall: the one whose single remaining record is the
one the expression **named**, which is what pressing a row writes. Its card
would be the term in the header drawn a second time a little lower down — see
[the rule in full](#a-shell-about-one-record).

A host that would rather open on one entity's list can say so:

```vue
<DataShell :schema="schema" :defaults="{ landing: 'entity', entity: 'items', view: 'list' }" />
```

## Install

```bash
npm install appfr
```

`vue` is a peer dependency. `vue-router` and `@nuxt/kit` are optional peers,
needed only for the router adapter and the Nuxt module.
[`themes`](https://github.com/opowell/themes), the tokens the shell resolves
against, and [`menu-bar`](https://github.com/opowell/menu-bar), whose menus its
pickers open, come with it.

Each of those ships its own stylesheet and none carries another's, so a page
loads the tokens once and then the sheet of every package on it, in this
order:

```ts
import 'themes/tokens.css'
import 'menu-bar/style.css'
import 'appfr/style.css'
```

## Quick start

```vue
<script setup lang="ts">
import { DataShell } from 'appfr'
import { iRadarSchema } from 'appfr/fixtures'
import type { ShellRow } from 'appfr'
import 'themes/tokens.css'
import 'menu-bar/style.css'
import 'appfr/style.css'

function open(row: ShellRow) {
  console.log('open', row.id)
}
</script>

<template>
  <!-- The shell fills the box it is given, so give it a height. -->
  <div style="height: 100vh">
    <DataShell :schema="iRadarSchema" @activate="open" />
  </div>
</template>
```

With no `source` prop, the shell serves deterministic mock rows generated from
the schema's own samples — enough to see and test the whole thing before a
backend exists.

## Wiring it to your data

Implement `DataSource`. The shell calls nothing else — `query` for a result
that arrives at once, and [`stream`](#results-that-arrive-over-time) for one
that arrives over time.

```ts
import type { DataSource } from 'appfr'

const source: DataSource = {
  // `entity` is null on the home screen, where the query spans every entity in
  // the schema. `schema` is passed so you can enumerate them.
  // `limit` is one page of rows and `offset` is where that page starts —
  // `(query.page - 1) * limit`, worked out for you.
  async query({ query, schema, entity, limit, offset }) {
    const response = await fetch(`/api/records?${new URLSearchParams({
      kinds: (entity ? [entity] : schema.entities).map((e) => e.key).join(','),
      q: query.expr,
      sort: query.sort,
      dir: query.dir,
      limit: String(limit),
      offset: String(offset),
    })}`)
    const body = await response.json()
    return { rows: body.rows, total: body.total, unfiltered: body.unfiltered }
    // A row is `{ id, entityKey, entityLabel, fields }` — `fields` holding the
    // record under whatever names this type's columns read.
  },
}
```

`total` is the whole match, before `limit` and `offset` picked a page out of
it — the shell counts pages with it, and the header states them.

Each row it returns carries its own `entityKey` and `entityLabel`, which is
what lets a mixed result set read every record in its own entity's vocabulary —
a log entry headed "Trace id" beside a LEGO set headed "Set number", each
resolved through that type's own [`columns`](#columns-of-your-own).

```vue
<DataShell :schema="schema" :source="source" />
```

A synchronous source is applied in the same tick, so SSR emits complete markup
and tests can assert without awaiting. An async source gets a pending state,
and slow responses can never overwrite newer ones.

### Results that arrive over time

A `query` answers once and is done, which is the wrong shape for a result that
takes seconds to assemble — a crawl, a scan, a set of pages fetched one after
another. A source can declare `stream` as well, and push rows in as it finds
them:

```ts
import type { StreamingDataSource } from 'appfr'

const source: StreamingDataSource = {
  query: (request) => fetchPage(request),          // still needed — see below

  stream({ query, entity, limit, offset }, sink) {
    const socket = new WebSocket(`/api/crawl?q=${encodeURIComponent(query.expr)}`)

    socket.onmessage = (event) => {
      const found = JSON.parse(event.data)
      sink.insert(found.rows)                      // at the end of the page
      // or sink.insert(found.rows, 0)             // newest first
    }
    socket.onerror = () => sink.fail(new Error('The crawl stopped responding'))
    socket.onclose = () => {
      sink.set({ total: 1_284 })                   // what it turned out to be
      sink.close()                                 // no longer pending
    }

    return () => socket.close()                    // the shell calls this
  },
}
```

Four methods and a flag, and they are the whole of it:

| | |
| --- | --- |
| `insert(rows, at?)` | rows found, put at `at` — the end of the page when left out, `0` for a scan that finds the newest first. The running total goes up by what was inserted |
| `set({ rows, total })` | what is known, rather than more of it: the page as it now stands, or the real total once the source has counted |
| `close()` | nothing more is coming; the shell stops reporting the query as pending |
| `fail(error)` | reported exactly as a rejected `query` is |
| `open` | false once the shell has moved on. A source doing real work should stop |

**The page still holds `limit` rows.** An insert past the end is dropped — it
is page two's, and a `query` for this page would never have returned it — while
the total goes on counting, so the pager grows as more is found. Insert at `0`
on a full page and the last row falls off the bottom onto page two, which is
where it belongs.

**The first row-bearing push replaces; the rest add.** So paging or re-sorting
does not flash empty: the rows of the query you just left stay up until the new
stream has some of its own, exactly as they do while an async `query` is in
flight.

**The query still owns the stream.** Change the entity, the sort, the
expression, a facet or the page and the sink closes — `open` goes false, every
method on it becomes a no-op, your teardown runs, and a new stream starts for
the new query. Rows from the query someone just left cannot land in the one
they are looking at. Changing the *view* does not restart it: the same rows
drawn as a table are the same rows, and re-crawling to redraw them would be
absurd.

**`query` is still required.** The home screen's cards each run their own
per-entity query — five types, five queries, answered at once — and `stream` is
what the result *list* is made of. A source that can only stream should answer
`query` with an empty page and let the cards fill in when a type is picked.

This is the streaming Brickzuke's `addRow(item, index)` was reaching for —
`sink.insert(row, index)` is the same call — with the two things a component
ref could not give it: rows that stop arriving when the query they belong to is
gone, and a page whose size the table still decides.

### Rows you already have

An API that returns whole lists — no filtering, no paging — leaves the query
to be applied in the page. `createMemoryDataSource(rows)` is that source: the
expression, the facets, the sort and the page, by the same code the bundled
mock runs, so every term reads exactly as it does there. It is synchronous,
which the shell applies in the same tick — rows are on screen from the first
render, and the pending state stays reserved for the fetch.

```ts
import { createMemoryDataSource, queryAll, useStableSchema } from 'appfr'

// A new array is a new source, and a new source is what re-runs the query.
const source = computed(() => createMemoryDataSource(toRows(payloads.value)))

// Every spec the query matches, not a page of them — what a "Run all" acts on.
const specs = queryAll(source.value, { query, schema, entity: findEntity(schema, 'specs') })
```

Two things it reads differently from the mock, because its rows are real:

- **A row with no date under a date sort goes last, in both directions.** A
  column of `kind: 'date'` or `role: 'updated'` holding `''` or anything that
  does not parse says nothing about where the row belongs — a host never
  crawled, a spec never run — so it is held out of the sort rather than
  floated to the top of an ascending list, where it would push the answers
  off the first screen.
- **A `limit` of 0 is no limit**, as the shell's own sink reads it. The mock
  reads it as a page of nothing and goes on doing so, which is why `queryAll`
  asks for a page no corpus reaches instead: that is every row to either.

A schema built from that data has facets that are the data's — the values a
chips facet offers, the ceiling of a range — and those are built from the rows
too:

```ts
import { chipsFrom, rangeFrom, toggleFacet, usefulFacets } from 'appfr'

facets: usefulFacets([
  chipsFrom(specRows, 'tag', 'Tags', { multiple: true }),  // every value held, A to Z
  rangeFrom(specRows, 'cases', 'Cases'),                    // 0 to niceMax(the largest)
  toggleFacet('failing', 'Failing', 'Only specs some run has failed'),
]),
```

`usefulFacets` drops what cannot change the result — a chips facet with one
option, a range from 0 to 0 — and `niceMax` is the rounding a range's ceiling
gets, the next 1, 2 or 5 step, so the schema does not change every time a
running duration ticks one second further.

It still changes more often than it says anything new: a poll lands, a case
flips, and the counts and options stand still. `useStableSchema(build)` re-runs
`build` whenever what it reads changes and hands over the result only when it
differs *by value* — `JSON.stringify`, or a `key` of your own — so the shell is
not handed a new schema, and does not rebuild what it draws from it, for nothing.
Functions in the schema, a column's `format` or `value`, are not part of that
comparison: one that reads changing data should read it when called.

```ts
const schema = useStableSchema(() => buildSchema(payloads.value))
```

## Routing

The query is derived from the route's search string and written back on every
change — there is no second copy of the state to fall out of sync. How it
reaches the URL is pluggable:

| Adapter | Use it for |
| --- | --- |
| `createHistoryAdapter()` | Plain History API. The default when nothing is provided. |
| `createVueRouterAdapter(router)` | vue-router / Nuxt, so a query change is an ordinary navigation. |
| `createMemoryAdapter(search?)` | Tests and Storybook, where the address bar must stay untouched. |

```ts
import { createVueRouterAdapter, ROUTE_ADAPTER_KEY } from 'appfr'
import { useRouter } from 'vue-router'

// Per shell…
const route = createVueRouterAdapter(useRouter())
// …or app-wide, and every shell picks it up.
app.provide(ROUTE_ADAPTER_KEY, route)
```

An adapter is a search string and a path: `search` and `path` are what it
reads, and `push(search, path?)`, `replace(search, path?)` and
`href(search, path?)` what it writes. The shell writes the search alone,
which stays on the path it is on — except from [a page that is not about the
query](#a-page-that-is-not-about-the-query), whose first edit goes to the
list's path and names it. All three adapters take it: the History one leaves
the page's hash behind on a move to another path, and the vue-router one
navigates through the router (so its `base` and hash history apply). An
adapter of your own that ignores the second argument stays where it is.

### Permalinks to a record

Where a press narrows, a record has no page of its own: the screen about it
is the shell with its term in the query. Its address is then a way *into* the
shell — and two vue-router `redirect` helpers build those:

```ts
import { entityRedirect, recordRedirect } from 'appfr'

const routes = [
  { path: '/', component: ShellView },
  // `/tests` → `/?e=tests`: a type's old list address.
  { path: '/tests', redirect: entityRedirect('tests') },
  // `/tests/:id` → `/?q=test="<id>"`: the record's own.
  { path: '/tests/:id', redirect: recordRedirect('test', 'id') },
]
```

`recordRedirect(scopeField, param)` writes the same term a press writes —
`field="id"`, quoted — so a record reached by its address reads, and lifts,
exactly like one reached from a list. The query the address arrived with is
kept and the term ANDed on to its expression, once however often the link is
followed, so `/tests/x?e=runs` lands on that record's runs. `entityRedirect`
keeps it too, so `/tests?q=checkout` lands on the same search. Both take the
path the shell is mounted at as a last argument, `/` unless you say.

### What the URL looks like

```
                                     ← home: nothing filtered, so no parameters
?e=i&v=table&s=l&d=asc&q=s%3E40+kind=page+kind=pdf+rank:20..80+seen:true&p=3
```

| Key | Meaning |
| --- | --- |
| `e` | entity filter, by its shortcut or its key. Absent means every entity — the home screen. `*` says so explicitly, which is only needed when the host lands on an entity by default |
| `v` | view — `list`, `cards`, `grid`, `images`, `table`, `links`, `preview`. `cards` at home means a card per type; scoped to an entity it means a card per record |
| `s` | sort, by its shortcut or its key |
| `d` | direction — `asc`, `desc` |
| `q` | expression, its columns by their shortcuts — and the facets with it: `field=a field=b` for chips, `field:min..max` for a range (either end may be empty), `field:true` for a toggle |
| `p` | page, 1-based. Absent means the first one. A page of `limit` rows — see [paging](#paging-through-the-results) |

**Shortcuts.** The address names a type, a sort and a column by the first
letter of each word of its label — **Items** is `i`, a sort labelled
**Links** is `l`, a **Price ratio** column is `pr` — so it reads as what was
typed: `p<5` stays `p<5` rather than becoming `pricevalue<5`. Where two share
initials, the one declared first has them and the other is written by its
key; initials that are another one's key are nobody's. A join key — some
entity's `scope` — is never shortened, since it reads the same on every type
and a shortcut is one type's. Reading an address takes keys and shortcuts
alike, and the query the shell holds and hands your source is in keys
throughout: only the address is shortened.

**Facets are terms.** A facet has no parameter and no control of its own:
it names a field the query can be narrowed on, and what it is set to is the
terms on that field in `q` — typed in the bar as `rank:20..80`, shown as the
part `20 ≤ rank ≤ 80`, the address form on hover. `facetValue(expr, facet)`
and `withFacetValue(expr, facet, value)` read and write them, and
`setFacet`, `toggleChip`, `setRange` and `toggleFlag` on the query state do
it through the URL.

Three things this does on purpose:

- **Anything at its default is omitted**, so a plain view has a clean URL.
- **Parameters the shell does not own are preserved.** Your own `?tab=audit`
  survives every query change.
- **Unparseable input degrades rather than throws.** An unknown entity, view
  or sort falls back to the schema's default, and a term on a field nothing
  has narrows nothing, so a hand-edited URL cannot reach an unrenderable state.

Changing the entity, view, sort, committed expression or page **pushes** a
history entry — those are destinations worth coming back to. Nudging a facet
**replaces**, because one entry per chip click makes the back button useless.
Both are configurable via `navigationMode` and `facetNavigationMode`.

### The URL outside the shell

A redirect, a guard or a page beside the shell has the router's query object
in hand rather than the adapter's search string. `searchFromQuery(route.query)`
is that object as the search `parseQuery` reads — a repeated parameter kept,
a `null` one dropped — and `readExpression(search, schema?)` is the expression
alone, decoded exactly as `parseQuery` decodes it: with the schema, its
shortcuts written out as `parseQuery` writes them; without, as the address
has them, which still names every record, join keys never being shortened:

```ts
import { readExpression, searchFromQuery } from 'appfr'

const search = searchFromQuery(route.query)   // '?e=tests&q=host%3D%22a.example%22'
readExpression(search)                        // 'host="a.example"'
```

## Schemas

```ts
import type { DomainSchema } from 'appfr'

const schema: DomainSchema = {
  key: 'iRadar',
  label: 'iRadar',
  kicker: 'Web monitoring',
  placeholder: 'site:*.shop AND price < 40 AND seen:false',
  entities: [
    {
      key: 'items',
      label: 'Items',
      count: 9988,
      // Views read these instead of hard-coding column names.
      // What this type is: every field the shell shows, and which of them a
      // card, a tile and a preview pane are made of. The shell has no set of
      // its own — a type that declares none has nothing to draw.
      columns: [
        { key: 'ordinal', kind: 'ordinal', label: '#', width: '52px' },
        { key: 'primary', role: 'identity', label: 'Item', sort: 'name', activate: true, scope: true },
        { key: 'secondary', role: 'reference', label: 'URL', mono: true, muted: true },
        { key: 'metric1', role: 'metric', kind: 'number', label: 'Links', sort: 'metric1', drill: 'links' },
        { key: 'updatedAt', role: 'updated', kind: 'date', label: 'Updated', sort: 'updated' },
        { key: 'status', role: 'state', kind: 'status', label: 'State', width: '110px' },
      ],
      facets: [
        { kind: 'chips', key: 'kind', label: 'Kind', options: ['page', 'pdf', 'feed'] },
        { kind: 'range', key: 'rank', label: 'Rank', min: 0, max: 100 },
        { kind: 'toggle', key: 'seen', label: 'Seen', text: 'Hide items already seen' },
      ],
      tabs: ['Information', 'Content', 'Links'],
      samples: [['Q3 price list', 'shop.example.com/pricing']],
      // Optional: offers a button on this type's card that asks for a new one.
      create: 'Add an item',
    },
  ],
}
```

A row is three fields the shell owns and one bag it does not: an `id`, an
`entityKey`, an `entityLabel`, and `fields` holding the record itself under
whatever names the columns read. What each type *is* — how many fields, what
they are called, which of them is the name and which the state — is
[`columns`](#columns-of-your-own), and the shell invents none of it. That is
what lets one set of renderers serve every schema, and what lets records of
different types share a result set.

Four worked examples ship in `appfr/fixtures`: `iRadarSchema`,
`legoSchema`, `commerceSchema`, `battleSimSchema`. Each also gets `logsEntity`
and `settingsEntity`, which are exported on their own and are entities like any
other — no special casing anywhere in the shell. Each entity writes out its
own table: all but one take the familiar nine those fixtures build for
themselves, and `legoSchema`'s pieces are the worked set of twelve.

### Columns of your own

An entity's `columns` are what it *is*: every field the shell shows, in the
order a table shows them, with a `role` saying which of them the views that are
not tables are made of.

**The shell invents none.** A type that declares nothing has nothing to draw
anywhere — no table, and no identity for a card to head. Which fields a record
has is the schema's to say, and a set of columns nobody asked for would be the
component deciding what your data is, which is the same line it does not cross
for `create` or for a drill.

```ts
{
  key: 'pieces',
  columns: [
    { key: 'ordinal', kind: 'ordinal', label: '#', width: '48px' },
    // No label: a column of pictures says what it is. The role carries it out
    // of the table too — onto the card and the tile.
    { key: 'image', role: 'image', kind: 'image', width: '56px', height: '28px' },
    { key: 'name', role: 'identity', label: 'Piece', sort: 'name', activate: true, scope: true },
    { key: 'partNo', role: 'reference', label: 'Part no.', width: '104px', mono: true },
    { key: 'shape', label: 'Shape', width: '92px', hideBelow: 620 },
    // A year is a number and not a quantity: 1988, never 2.0k.
    { key: 'firstYear', label: 'First year', width: '88px', align: 'right', format: String },
    { key: 'colors', role: 'metric', kind: 'number', label: 'Colors', sort: 'colors', drill: 'colors' },
    { key: 'cg', label: 'Weight', format: grams, align: 'right' },
    { key: 'state', role: 'state', kind: 'status', label: 'State', width: '104px' },
    // A background is not a value, so the table leaves this one out.
    { key: 'colour', role: 'tint' },
  ],
}
```

There is no set to fall back on. The library ships no `defaultColumns`, and a
type that leaves `columns` out gets an empty results area saying so rather than
a table of headings it never asked for. The four shipped fixtures show the
familiar shape — ordinal, identity pair, type, two metrics, date, state and
tint, over the fields `primary`, `secondary`, `metric1`, `metric2`,
`updatedAt`, `status` and `tint` — as a helper of their own in
`src/fixtures/schemas.ts`, which is a set to copy rather than one to import.

**Where a value comes from**, in order: the column's own `value(row)` if it has
one; otherwise the field it names — `field`, or its `key` — read off
`row.fields`, and then off the row's own `id`, `entityKey` and `entityLabel`.
The bag comes first, because those names are the schema's: a type with a field
called `id` of its own means that one.

```ts
{ key: 'shape' }                                  // row.fields.shape
{ key: 'year', field: 'firstYear' }               // row.fields.firstYear, under another name
{ key: 'entityLabel', label: 'Kind' }             // the row's own type
{ key: 'label', value: (row) => `${row.fields.name} (${row.id})` }
```

**Roles** are how the other six views read a column set. A card, a tile, a
link row and a preview pane are an identity, a reference, a number or two and a
mark — never a list of columns — so they ask for those parts by name:

| Role | Read by |
| --- | --- |
| `identity` | every view, as the record's name; the drill and pin labels |
| `reference` | the line under it in the list, cards, links, grid and preview |
| `metric` | the numbers on a list row (first two), a card (first two), a home-screen preview row (first one), and every one of them in the preview pane |
| `state` | the pill |
| `updated` | the date on a card, a home-screen row and the preview pane |
| `image` | the picture beside the name on a card, behind the caption on a grid tile, and the whole of the images view — a value like any other, so the column is still a cell in the table. A row holding none is a card and a tile drawn without one, and a square with the name on in the images view, where a record dropped from the wall would be a result gone missing; so is a source that fails to load: a catalogue addresses pictures it does not host |
| `tint` | the grid tile's background and the preview pane's banner — never drawn as a cell, so the table leaves it out |

A column with no role is a column and nothing else: it is in the table and
nowhere else, which is what most columns are. A role nothing plays is a part
those views leave out — no state column, no pill.

| | |
| --- | --- |
| `key` | identifies the column, and is the field read when nothing else says |
| `label` | the header. A column whose content says what it is leaves it out |
| `hint` | what the header says on hover — the sentence the label had no room for, such as the currency a column of prices is in |
| `kind` | `text` (the default), `number`, `date`, `status`, `image`, `ordinal`, `component` |
| `field` / `value` / `format` | where the value comes from and how it reads |
| `width` / `height` / `align` / `mono` / `muted` / `truncate` | how it is drawn |
| `sort` | the `SortDef` key this header sorts by |
| `activate` / `click` / `drill` / `scope` | what pressing it does |
| `when` | `always`, or only in one of the two scopes |
| `hideBelow` | the container width it stands down at |
| `component` | what a `component` cell renders |
| `header` | a component of your own after the header's label, for a control over the whole column |

**What pressing a cell means** is said per column rather than per table.
`activate` opens the record — `activate(row)`, as everywhere else. `drill`
names the entity the value counts, and pressing `12` under *Colors* means "show
me those twelve", exactly as `drills` does for the two metrics and under the
same condition: the row's entity has to declare a `scope`, or nothing on the
far side says which record it belongs to. `scope` puts the → beside the value.
`click` is called with the row, for a column that means something only you
know.

**Sorting** is offered where the column names a sort the entity actually
declares, so a set written for several types cannot offer an ordering the query
has no way to hold. Everything else about it is unchanged: the header is the
same button the bar's own sort chooser is, and the sort is in the URL.

**Standing down.** `hideBelow` names the container width a column leaves at,
from the ladder `480 | 620 | 760 | 900 | 1100` — a ladder rather than a free
number because the rule is a container query in a stylesheet, and a stylesheet
cannot be handed an arbitrary breakpoint per column. Columns that name none are
always on screen.

**A cell of your own.** `kind: 'component'` hands the cell to a component of
yours, given `{ row, entry, value, column }` — a sparkline, a thumbnail stack,
a row of buttons, the checkbox a table that selects rows needs. The shell has
no selection model and does not need one: it passes the row, and what a tick
means is yours. Whatever you render has to stop the click reaching the row,
which would open the record.

```ts
{ key: 'select', kind: 'component', component: SelectCell, width: '36px' }
```

**A header of your own.** `header` puts a component of yours in the column's
header cell, after the label and its sort button, given `{ column, entity }`.
It is for what is about the whole column rather than any one cell — the
button that clears every tick the cells above made, the one that fills every
box in the column, a picker of the unit a column of figures is read in. The
cell above ticks a row; this clears them all:

```ts
{ key: 'select', kind: 'component', component: SelectCell, header: SelectHeader, width: '36px' }
```

There is deliberately no HTML-string cell. A column that wants markup gets a
component, which is the same expressiveness without a `v-html` in the middle of
a table of other people's data.

**Keys have a fallback; nothing else does.** A `key` is what a rendered column
is tracked by, so it has to be there and it has to be distinct — two columns
keyed alike are two the renderer cannot tell apart, and a column keyed
`undefined` is every column at once. A column that named its field or computed
its value has already said enough, so `key` is optional and falls back along a
chain that always ends somewhere: the key, then `field`, then `label`, then its
position.

```ts
{ key: 'shape' }                        // 'shape'
{ field: 'firstYear', label: 'Year' }   // 'firstYear'
{ label: 'Weight', value: grams }       // 'Weight'
{ kind: 'ordinal' }                     // 'column-0'
```

The same one level up: a row is tracked by `row.id`, and a source that returns
none gets the row's place in the result instead — `pieces-4`. Rows keyed alike
are rows a renderer reuses for each other, which is a checkbox ticked against
the row that replaced it and an open row that stays open under a different
record. `columnKey(column, index)` and `rowKey(row, index)` are both exported,
and `PresentedRow.key` is the resolved one the views actually use.

**Across every entity** — the mixed result set — an entity's own columns would
be describing the wrong rows, so the set comes from the schema instead:

```ts
const schema: DomainSchema = {
  /* … */
  columns: [
    { key: 'ordinal', kind: 'ordinal', label: '#', width: '48px' },
    // Across kinds, the type is the column that tells you most.
    { key: 'entityLabel', label: 'Kind', width: '120px', when: 'everything' },
    { key: 'primary', label: 'Record', sort: 'name', activate: true, scope: true },
    { key: 'status', kind: 'status', label: 'State', width: '104px' },
  ],
}
```

`when` is what lets one set carry a column that only means something in one of
the two scopes — the row's type across every entity, and nothing there when the
results are already of one.

`columnsFor`, `roleColumn`, `roleColumns`, `cellValue`, `cellText` and the rest
of the resolvers are exported for a host rendering its own views; `useColumns()`
is the scope's set inside a shell, and `PresentedRow.parts` is a row with every
role already resolved.

#### Columns most types have

Still nothing the shell falls back on — but a host writing several types'
columns writes the same identity, date and state into each, and one type's
table should not disagree with the card beside it. These are those columns as
factories, over the field names the fixtures use, each taking a
`Partial<ColumnDef>` last for whatever this type says differently:

```ts
import {
  dateColumn, entityColumn, identityColumn, metricColumn, ordinalColumn,
  referenceColumn, stateColumn, tintColumn, bytesCell,
} from 'appfr'

columns: [
  ordinalColumn(),                                         // #
  identityColumn('Spec', { scope: true }),                 // primary — the → only where asked
  referenceColumn('Path'),                                 // secondary
  metricColumn('metric1', 'Cases', { drill: 'cases' }),
  metricColumn('metric2', 'Size', { format: bytesCell }),
  dateColumn('lastUpdated', 'Last updated', { role: 'updated', sort: 'updated' }),
  stateColumn(),                                           // status
  tintColumn(),
]
```

| | |
| --- | --- |
| `ordinalColumn` / `stateColumn` / `tintColumn` / `pictureColumn` | the row's place; the pill (`status`); the tile's colour (`tint`); the picture (`picture`) |
| `identityColumn(label)` / `referenceColumn(label)` | `primary`, opening the record and sorting by `name`; `secondary`, mono and muted |
| `metricColumn(key, label)` / `dateColumn(key, label)` | a number or a date, sorted by its own key |
| `entityColumn()` | the row's type, for the mixed set — `dc-table__entity` |
| `facetColumn(key, label)` | a field of this type alone, under its facet's key |
| `flagColumn(key, label, names)` | the true ones of a row's boolean fields, named: `crawled, recorded` |

Each is a fresh object, so changing one set changes no other.

**Formatting what a tool measures.** `formatBytes` (`28.0 kB`, decimal units),
`formatDuration` from milliseconds (`640ms`, `12.4s`, `3m 7s`), `formatElapsed`
from seconds (`1:42`), `formatPercent` from a share (`50%`), `formatDateTime`
(a date and its time in the reader's locale, where `formatDate` is fixed and in
UTC) and `stripAnsi` take the value they say and write `—` for a missing one.
A cell holds whatever the row holds, so `bytesCell`, `durationCell`,
`elapsedCell` and `percentCell` are the same as a column's `format`: anything
in, a number held as text counted, and `EMPTY_CELL` for the rest — and for a
size or a time of `0`, which in a column means nothing measured.

`tintFor(id)` is a tile colour for a record that has none — one of
`MOCK_TINTS`, by a hash of the id, so the same every time. Nothing fills it in
for you; a `tint` field holds it where a source puts it.

### A type whose card is its picture

A card is a record to read: its row number and state, its name and reference,
two numbers and a date. Some types are not read that way. A game, a piece, a
product is told apart by what it looks like, and a wall of their cards is a
wall of things to pick one from. `card: 'picture'` makes each card the picture,
edge to edge and square, and the name under it, and nothing else:

```ts
{ key: 'games', label: 'Games', card: 'picture', /* … */ }
```

Only the card changes. The row number, the state, the reference and the counts
are still in the table, and the list, the grid, the links and the preview read
the roles as they always do. A record with no picture is its name, in the
middle of the same card. The tick, the star and the query's marks stay on the
card wherever the host offers them, over the picture's corner. With nothing
but picture cards on the screen the columns narrow to `--dc-card-picture`
(160px) each, against a record card's 320px. `--dc-card-image` is how large
a record card's picture is drawn (64px).

### A type you can make more of

`create` on an entity names what making a new one of it is called, and puts
that button at the foot of its card on the home screen — and on the bar over
that type's own list, which is the other place you find there is nothing here
yet:

```ts
{ key: 'crawls', label: 'Crawls', create: 'Start new…', /* … */ }
```

Types that name nothing do not offer it, so the schema is where creatable and
listed-only are told apart. The shell makes nothing itself: pressing the button
emits `create(entity)` and stops there, exactly as opening a row emits
`activate(row)` — where a new one is made is the host's to decide, and is
usually a form on a route of its own.

```vue
<DataShell :schema="schema" @create="entity => router.push(`/${entity.key}/new`)" />
```

It sits under the records rather than beside the count, which is also what
makes it worth having on a type with none: a card that would otherwise be a
dead end says what to do about it.

### Records you can copy and delete

Two more labels, read the same way: an entity that names an operation offers
it, and one that says nothing is not that kind of type.

```ts
{
  key: 'searches',
  label: 'Searches',
  create: 'Start new…',
  duplicate: 'Duplicate',
  delete: 'Delete',
  /* … */
}
```

That puts a bar over the records themselves, under the query that found them:

```
┌──────────────────────────────────────────────────────────────────┐
│ ◆ iRadar │ [Searches · 38 ▾] [List ▾]                          ▼ │
├──────────────────────────────────────────────────────────────────┤
│ ▣ 2 selected  Clear        + Start new…   Duplicate 2   Delete 2 │
├──────────────────────────────────────────────────────────────────┤
│ ☑ 01  Security advisories · rev 8        807  308   ok           │
│ ☐ 02  Job postings — platform · rev 6    664  223   review       │
│ ☑ 03  Competitor pricing pages · rev 2    12  511   ok           │
└──────────────────────────────────────────────────────────────────┘
```

**Naming an operation on a selection is what offers the ticks.** A tick with
nothing to do to what it ticks is a control that leads nowhere, so a type that
names neither `duplicate` nor `delete` has no ticks — and a type that names
`create` alone has the bar with one button on it and nothing to select.

| | |
| --- | --- |
| the **tick on a row** | puts that record in the selection. It stops there: the row underneath still opens on any other press |
| the **tick for the page** | takes the whole page, and gives it back. Part of a page ticked shows as neither on nor off, which is what that third state is for. It heads the bar — except in the table, where it heads the column of ticks it speaks for, and the bar reads the count alone |
| **Duplicate** / **Delete** | report the selection they are for, and say how many that is. With nothing ticked there is nothing for them to be for, and they say so |
| **Clear** | unticks everything, including what was ticked on a page you have since left |

Ticks appear in every view that draws records — the list, the cards, the tiles,
the links, the one record a preview is showing, and a leading cell of the
table's own, ahead of the columns the schema declared. The home screen has
none: its cards are types rather than records.

The shell carries none of the three out. Each is reported with the selection it
is for, exactly as an opened row and a new record are:

```vue
<DataShell
  :schema="schema"
  @create="entity => router.push(`/${entity.key}/new`)"
  @duplicate="({ ids }) => api.copy(ids)"
  @delete="({ ids, rows, entity }) => confirmThenDelete(entity, ids)"
/>
```

A selection is **of records**, so it is held as ids:

```ts
interface Selection {
  ids: string[]              // every ticked id, across every page one was made on
  rows: ShellRow[]           // the ticked rows this page still holds
  entity: EntitySchema | null
}
```

Which is to say it survives the sort, the page and the view — none of those
change which records they are — and `rows` is the part of it the shell has in
hand rather than the whole of it. A host that needs the rest reads them back by
id, being the only side that can.

The one thing that does empty it is **listing another type**: the operations
are the entity's own words, so a selection of searches must never be offered to
the scrapers' *Delete*. Narrowing and widening leave it alone.

Nothing else empties it either — including the delete you just carried out,
which the shell has no way to know has gone through. Hold the ticks yourself
where that matters:

```vue
<DataShell v-model:selected="selected" @delete="remove" />
```

```ts
const selected = ref<string[]>([])

async function remove({ ids }: Selection) {
  await api.delete(ids)
  selected.value = []
}
```

The rows themselves go when the source stops returning them, which is the same
thing that happens to a record deleted from anywhere else.

`selectable` offers the ticks where the schema names no operation at all — for
an application whose bulk action is its own, which then reads
`v-model:selected` and does the rest. The bar is the count and a way to clear
it.

### Narrowing to one record

A record is often not just something to open — it is what the other records are
*about*. A tenant's specs, profiles and runs each name the host they belong to;
a category's pieces each name the category. Two fields say so:

```ts
{
  key: 'tenants',
  // The field every other record carries this one's id in.
  scope: 'host',
  columns: [
    { key: 'primary', role: 'identity', label: 'Domain', sort: 'name', activate: true, scope: true },
    { key: 'secondary', role: 'reference', label: 'Crawled as', mono: true, muted: true },
    // What each number counts, as the key of the entity counted.
    { key: 'metric1', role: 'metric', kind: 'number', label: 'Tests', sort: 'metric1', drill: 'tests' },
    { key: 'metric2', role: 'metric', kind: 'number', label: 'URLs', sort: 'metric2', drill: 'urls' },
  ],
}
```

That makes a row two things rather than one:

| | |
| --- | --- |
| its **name** | narrows to the record itself without picking a type, and draws the results as cards, so every card reports what it holds of it — every card but its own type's, which would report the record just pressed |
| its **metric** | narrows to what its column's `drill` counts: `12` under *Tests* means "show me those twelve", in the view it was pressed in |

Unlike `activate` and `create`, the shell **applies** both. Those two are
reported and left because the shell has no router and makes nothing; narrowing
is a query change, and the query is the shell's own. The term lands in the
expression field as an ordinary one — visible in the summary, editable, in the
URL, and back-buttonable. A `drill(row, entity)` event still goes out for a
host that wants to follow it; `entity` is null when the row itself was pressed.

Narrowing to a record **takes the view with it**, which is the difference
between the two rows above. In a list, one record is a one-row list of the row
just pressed — the press going nowhere — and the screen narrowing to a record is
worth making is the card per type, where every card says what it holds of it. A
metric names the type it is going to a list *of*, so that one keeps the view it
was pressed in.

**A press means the other thing under `rowPress: 'open'`**, for a host that
routes to a page of its own: the press is reported as `activate(row)`, the shell
applies nothing, and a **→** appears beside every name that can be narrowed to,
so both moves are still on the row. That was the only arrangement before
v0.21.0, and it is one prop away.

```vue
<DataShell :schema="schema" row-press="open" @activate="row => router.push(pageFor(row))" />
```

A row whose type declares no `scope` cannot be narrowed to whatever the prop
says — nothing carries its id — so those presses are reported either way. A
host whose leaves are the only records with somewhere to go (a URL opens in a
new tab; a file opens in an editor) can leave `rowPress` alone and handle
`activate` for exactly those.

**A record that lives somewhere opens there.** A type whose records each have
a page elsewhere — a site, a page of the host's — says where with `href`:

```ts
{ key: 'urls', label: 'URLs', scope: 'url', href: (row) => row.id, /* … */ }
```

What it does depends on what a press on the row already means:

| The press | With `href` |
| --- | --- |
| is reported (`rowPress: 'open'`, or a type with no `scope`) | the row's name is a link to the record's page, a plain press opens it in a new tab, and `activate` is **not** emitted for it — a host that would only have called `window.open` in its handler need not have one |
| narrows (the default, on a type with a `scope`) | it goes on narrowing, and a **↗** beside the name opens the record's page in a new tab — where the `→` stands when the roles are the other way round |

It is on the type rather than on a column because a press belongs to the row:
every view reads it through the one place a press is read, the cards, tiles
and previews included, and none of those is made of columns. In a table the
`↗` sits beside the column that asked for the `→` (`scope: true`), or else
beside the one that opens the record (`activate: true`). A new tab rather
than this one, because a page elsewhere is a detour from the query rather
than a step in it; ⌘-click, a middle click and the context menu work on both
links as on any other. `shell.recordHref(row)` is the URL, for a view of your
own, and `<OpenMark :entry>` is the `↗`.

**A press with ⌥ (Alt) held leaves the record out instead.** Every press
that narrows — a row, the `→`, a metric, a card's preview row — writes
`-host="www.example.com"` rather than `host="www.example.com"` when the
modifier is down, and the screen stays where it is: taking one record out of a
list is a refinement of that list, not a move to another, so the type and the
view are kept, and only a metric still pivots to what it counts. A press on a
record the query already narrows to turns the term round rather than adding
its opposite beside it — a query saying both says nothing — and the part on
the bar keeps its sign in front of the name: `-set:Yellow Castle (sets_10007)`.
`pressOptions(event)` is the reading of the modifier, exported so a host's own
cells can answer it the same way, and it is what `click(row, options)` and
`drill(row, entity, options)` carry.

**A press that leads somewhere is a link.** A row's name, a metric, the `→`,
a type card's heading and a card's preview rows are `<a href>`s to the query
they lead to (`PressLink`), so the browser treats them as it treats any link:
⌘/Ctrl-click opens it in a new tab, ⇧-click in a new window, a middle click in
a background tab, and the context menu offers to open or copy it. A plain click
— or one with ⌥ — is the shell's, and navigates in place as before. That is why
leaving a record out is ⌥: it is the one modifier a link has no use for (it
would download it, which the press stops). A table row is not a link — its
cells hold controls of their own — so a modified click on the row does by hand
what the browser does for its name. `shell.pressHref(row)` and
`shell.drillHref(row, entity)` are those hrefs, built through the route
adapter's `href(search)`: the History adapter keeps the page's path and hash,
the vue-router one asks `router.resolve` (so a hash-history app links to its
`#/…`), and `isBrowserPress(event)` is the test for a press to leave alone.

**A row the query names says so.** A record the query narrows to wears a
green `+` beside its name, and one the query leaves out a red `−` — in every
view that draws records, next to the `→` where there is one and beside the
name where there is not. Most rows wear nothing: the query
says nothing about them. Where it shows is exactly where it is needed — a
list of a type does not apply the term on its own scope to itself, so a
categories table narrowed to one category lists every category, and the mark
is what says which. Pressing it lifts the term, whichever way round it was
said, and the screen stays where it is; `termStanding(expr, term)` and
`liftTerm(expr, term)` are the two halves of that, exported for a host's own
cells. The marks say what a press would do before it is made: the `+` or `−`
fades under the pointer, the way a part on the bar does, and the `→` turns
green, or red the moment ⌥ is held over it — the colour of the mark the press
would leave on the row.

**A list row and a card carry the control too.** Leaving a record out by a
key nobody has been told about is a feature nobody finds, so a list row (in
front of its name) and a card (beside its state) carry the same `+ · −` the
table has — `RowStanding`, the control wired to one row — and that lit sign is
their mark of where the query stands. ⌥-click on the name still does the `−`.
The glance rows on a type's card and the preview pane keep the quieter mark.

**The table has a column for it.** Every row of a table whose type can be named wears the same three-way control
— `+` narrows to the record, `·` says nothing about it, `−` leaves it out —
lit where the query stands, in a column of its own after the ticks and before
the first column the schema declared. At its head is the same control over
every row on the page at once, or over the ticked rows where any are; it is
lit where those rows agree and unlit where they do not. Each press is one
change to the expression and the table stays where it is — the column is for
saying where the query stands on many records without leaving the list.
`withStanding(expr, term, standing)` is what one press writes, exported with
the rest, and `StandingControl` is the control itself. `+` over a page is
`set:a set:b …`, which the language reads as any of them — see the
expression field below — and `−` over a page is the page left out.

A host applying one itself wants `narrow(expr, entityKey)` from `useQueryState`, not
`setExpression` followed by `setEntity`: each of those serialises from the query the URL
currently holds, and a route change is not synchronous, so the second writes over the first
before it has arrived.

A number whose count has no entity behind it names no `drill` and stays the
plain number it was, and a type that declares no `scope` offers no → at all.

**Every entity must carry the join key**, including the ones that declare no
scope of their own. An unresolved field in this language *matches* — that is
what keeps a half-typed expression from emptying the screen — so an entity
whose rows have never heard of `host` comes through `host:"example.com"`
completely unfiltered. Give those rows an empty list rather than nothing:

```ts
{ id: 'crawl_1', fields: { host: [] }, /* … */ }   // correctly excluded
{ id: 'crawl_1', fields: {}, /* … */ }             // silently included
```

The bundled mock source does this for you: it reads the `scope` fields off the
schema and gives every generated row a membership in each, so a drill through
generated data returns rows rather than nothing.

**Or say so once, with `strictScopes: true`** on the schema. A term on a join
key then leaves out a row that does not carry the field — and `-host="…"` keeps
it, the same fact turned round — while every other unknown field still
constrains nothing, half-typed or not. Off unless set, since a schema that
pads its rows already gets this and one that relies on the old reading keeps
it. `matchesExpression` reads it off a schema handed to it as a fourth
argument; the memory and mock sources both hand theirs over, and a source of
your own does the same:

```ts
matchesExpression(parseExpression(query.expr), row, entity, schema)
```

Two helpers are exported for a host building its own context or its own
results area, and they are the whole of what applying a drill takes:

```ts
import { drillExpression, scopedEntity, scopeTermFor } from 'appfr'

scopeTermFor(schema, row)              // 'host="www.example.com"', or null
excludingTerm(scopeTermFor(schema, row))  // '-host="www.example.com"', or null
drillExpression(schema, query, row)    // the expression with that term added
drillExpression(schema, query, row, { exclude: true })  // …or with the record left out
scopedEntity(schema, 'host')           // the entity `host` points at — the inverse
```

And for a host that names records without a row in hand — a permalink, a
record card, a selection handed to another page:

```ts
fieldTerm('host', 'www.example.com')   // 'host="www.example.com"' — what recordTerm writes
idsExpression('test', ['a.ts', 'b.ts'])  // 'test="a.ts" test="b.ts"' — any of them; null for none
recordsIn(schema, [readExpression(search)])  // [{ entityKey: 'tenants', id: 'www.example.com' }]
router.push({ query: { ...route.query, ...narrowPatch(expr, term) } })  // what a press on the name does
```

`idsExpression` relies on two positive `=` terms on one field reading as any of
them, which holds within a group: hand it over as the whole of a query, since
ANDed on to one that already names a record on that field it widens rather
than narrows. It is null rather than `''` for no ids, an empty expression being
every row. `recordsIn` reads the terms the header puts names to — the
positive ones, an excluded record being no record the screen is about — deduped
by type and id in the order written; it is what the `record` slot is filled from. `narrowPatch` adds the
term, drops the type and the page and writes the cards view (or the one you
pass), with `undefined` for a parameter to take off.

A scope key beats a column heading of the same name in the expression field: an
entity heading its identity column *Category* and carrying a `category` join
key means the key. The generic names — `name`, `ref`, `status`, `updated`,
`metric1`… — are a fallback rather than a reservation, so a schema
with a field of that name means its own; only `entity` stays the shell's, so
that any corpus can be narrowed by kind.

### A shell about one record

Narrowing puts a record's id in the query, which is right when someone reached
it by pressing a number. A record's own *page* is the other way round: the
record is what the page is, it came from the route rather than from the query,
and there is nothing behind it to widen back out to. `within` is that — an
expression the whole shell is read inside, held by the host:

```vue
<DataShell
  :schema="schema"
  :source="source"
  :within="`test:&quot;${route.params.id}&quot;`"
/>
```

It is ANDed on to every query the shell runs — the result set, the per-type
cards, and the count beside each type — so `Everything` means everything *about
this record*, and each type reports how many of it are in scope rather than the
population the schema publishes. Nothing of it reaches the URL: the query the
reader owns goes on working exactly as it did, inside this.

```
◆ LEGO │ set:Yellow Castle (sets_10007) │ [Everything · 41 ▾] [Cards ▾]  [1978]
         ^ the scope: not a pill, because there is nothing to lift it to        ^ the query
```

The bar states it at its head, before the query and outside the row of parts
that scrolls, and reads it the way it reads a narrowing term: where the scope
names a record, it says which record. An `OR` in the query is multiplied out
rather than appended to — this language has no brackets, so `a OR b` inside
`set:x` is asked as `a set:x OR b set:x`. `andExpression(one, other)` is that
rule, exported.

With `Cards` drawn and `Everything` chosen, what comes out is a card per type
of everything that names the record — which is most of a detail view already.

#### Cards of your own

What is missing from it is the record itself, and the two slots are for that:

```vue
<DataShell :schema="schema" :within="scope">
  <template #cards-before>
    <ShellCard span="all">
      <template #head><h2>{{ record.title }}</h2></template>
      <template #aside><button @click="duplicate">Duplicate</button></template>
    </ShellCard>
    <ShellCard title="Run">…the form that acts on it…</ShellCard>
  </template>

  <template #cards-after>
    <ShellCard title="Metadata" :count="`${fields.length} fields`">…</ShellCard>
    <ShellCard title="Source" span="all" flush><pre>{{ record.source }}</pre></ShellCard>
  </template>
</DataShell>
```

```
┌── Yellow Castle · 375-2 ───────────────────── [Duplicate] [Delete] ──┐  cards-before
├──────────────────────────────────────────────────────────────────────┤
┌── Build ─────────────┐ ┌── Pieces     41 ─────┐ ┌── Colors     12 ──┐
│ …                    │ │ Brick 2x4            │ │ Yellow            │  the types
│                      │ │ Plate 1x2            │ │ Red               │
└──────────────────────┘ └──────────────────────┘ └───────────────────┘
┌── Metadata  6 fields ┐
│ theme:castle …       │                                                  cards-after
└──────────────────────┘
┌── Source ────────────────────────────────────────────────────────────┐
│ { "set": "375-2", … }                                                │
└──────────────────────────────────────────────────────────────────────┘
```

They are cells of the same grid as the type cards — as many columns as fit
comfortably, and every card in a row the height of that row, so a type with ten
rows beside one with two leaves no card floating over whitespace. `<ShellCard>`
is what makes one look like the cards it sits among; the shell's own card chrome
is scoped CSS a host cannot reach. Its props are `title`, `count`, `span`
(`'all'`, for a card a share of a row would cut short — a record's own heading,
a block of source, a wide table), `flush` for content that draws its own edges,
`muted`, `name` and `reference` (below), and `collapsible`, `collapsed` and
`defaultCollapsed` (further down); its slots are `head`, `aside`, the default
body, `foot` and `reference`. Nothing in it reads the shell's context, so it works anywhere inside a
`.dc-shell` element — including a page of your own with no query at all:

```vue
<div class="dc-shell" data-dc-theme="dark">
  <ShellCard title="New run">…</ShellCard>
</div>
```

The card a record's page leads with is headed by the record itself: its name,
and under it whatever tells it from another of the same name — an id, a path,
a URL. `name` and `reference` are that head, so it need not be written out in
the `head` slot:

```vue
<ShellCard :name="spec.title" :reference="spec.file" span="all">
  <template #aside><button @click="duplicate">Duplicate</button></template>
</ShellCard>

<!-- A reference that is a link: the slot says it instead. -->
<ShellCard :name="tenant.id">
  <template #reference><a :href="tenant.baseUrl">{{ tenant.baseUrl }}</a></template>
</ShellCard>
```

```
┌── Pays with a voucher ────────────────────── [failed] [Duplicate] ──┐
│   tests/specs/flow-2.spec.ts                                        │
```

The name is set as a title is; the reference is mono, muted, and breaks
anywhere, since a path has nowhere else to break and must not push the aside
off the card. `name` takes the place of `title` where both are given — a card
is headed by one thing, and the name is the more particular — and names the
fold toggle in its place too; `count` stays beside it either way, and the
`head` slot still replaces the lot. A `reference` with no `name` is not drawn.

A page of cards about one record is a page some of which the reader wants out
of the way — the source, once it has been read; the metadata nobody asked
for — so a card can fold to its head:

```vue
<ShellCard title="Metadata" collapsible default-collapsed>…</ShellCard>
<ShellCard title="Source" collapsible v-model:collapsed="sourceFolded">…</ShellCard>
```

```
┌── › Metadata  6 fields ──────────┐      folded: the head alone, at its own
└──────────────────────────────────┘      height rather than the row's
┌── ⌄ Source ──────────────────────────────────────────────────────────┐
│ { "set": "375-2", … }                                                │
└──────────────────────────────────────────────────────────────────────┘
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `collapsible` | `boolean` | `false` | A press anywhere on the head folds the card to the head alone, and another opens it. |
| `collapsed` | `boolean` | — | `v-model:collapsed` to own the state — to remember it, or fold every card at once. Emits `update:collapsed` on every press; bound, the card shows what you write back. |
| `defaultCollapsed` | `boolean` | `false` | Where nothing binds `collapsed`: whether the card starts folded. The card then holds the state itself. |

It is off unless asked for. A head is where a host puts its own controls, and a
card that began folding on every press of its head would be a card whose head
every host had to audit; off, nothing anyone already has changes. Turned on,
the head is the toggle's *surface*, as the shell's own header bar is: a press
on a control in it — a link, a button, a field, anything with a role that is
pressed — belongs to that control and folds nothing, and neither does the
click that ends a drag across the title to copy it. The chevron at the head's
start is a real button carrying the same press for a keyboard, named for the
card's `title`, with `aria-expanded` and `aria-controls` naming the body and
foot it folds. Those are hidden rather than taken out, so what is in them —
a half-filled form, a log scrolled to where it was being read — is as it was
when the card opens again. A card with no head does not fold whatever it is
asked: folded, it would be a hairline with no way back out.

The shell's own type cards do not fold. Their head is already a button — the
way into that type's list — and a second meaning for the same press would make
one of the two a guess.

Only the per-type screen draws the slots, that being the only view made of
cards rather than of records: choose a type, or another view, and the cards go
and the records are what is on screen. A view of your own reads
`useShellContext().within` for the scope, which is not part of `query`.

Three things the bar does differently once it is read inside something, all of
them the same rule — a control over nothing is not worth its room:

- **No ordering.** A scope holds a handful of rows of each type and the cards
  show all of them, so which end comes first decides nothing.
- **No list of types while `Everything` is chosen and `Cards` drawn.** The page
  is about one record, every type of it is on screen headed by its own name, and
  pressing that heading is the same move — so the chooser would be the choice
  offered twice and its `Everything · 6` a number the cards already break down.
  It is back the moment a type is filtered to, which is when there is something
  to widen out of, and it never leaves the views that draw records rather than
  types. Outside a scope it never leaves at all: there the count beside
  `Everything` is the only statement of how big the corpus is.
- **No card for a type that holds nothing**, unless the type names `create` —
  an empty card is where that button does the most work. A heading, a zero and
  the words *No matches* are three ways of saying the same nothing, and inside
  one record most of the types say it.
- **No card for the type the query has named the one record of**, which is why
  there is no `Sets` card above. It would be a heading, a count of one and the
  row the header is already naming, drawn again a little lower down — a card is
  a look inside a type, and the type the reader has picked the one record of
  has nothing left inside it. Unlike the rule before it, this one takes the
  card away even where the type names `create`: that button is on the type's
  own list, a press away, and the card is not empty but redundant. The record
  is still in the results — choose that type and there it is, on its own.

  Both halves of *named* are load-bearing. One match is not enough on its own:
  a query can land on a single record by **asking** something — `name:"Brick"`
  leaving one category — and that row is the answer rather than a restatement
  of the question, which is the whole of what a card is for. So what is asked
  is whether the row is the one the query **named**: the term a press on it
  would add, already written. That test is `addTerm`, the same one a press goes
  through, so the two agree about `set:sets_1` and `set:"sets_1"` being one
  term. It reads the scope and the query as one expression, so a record's own
  page drops the card on the same terms as a query narrowed to it by hand.

### Cards for the records the query names

`within` is for a page that *is* one record. The other way a screen comes to be
about a record is the one a press makes: the record's term in the query, put
there by pressing its row and lifted by pressing its part on the bar. The
`record` slot draws cards of your own for each record named that way — once
per record, in the order the query names them, ahead of `cards-before`:

```vue
<DataShell :schema="schema" :views="views">
  <template #record="{ entity, id }">
    <component :is="CARD_SETS[entity.key]" :id="id" />
  </template>
</DataShell>
```

So a record's cards follow the query rather than a route: press a row and its
cards arrive with its term, lift the term and they go, narrow to two records
and both sets are on screen. A record is a positive term on a field some type
declares as its `scope`; a negated one leaves the record out, which is not the
screen being about it, and the same record written twice — in two cases, or in
two alternatives — is one record. The committed query is what is read, not a
draft in the box: the screen does not change what it is about under each
keystroke. Like `cards-before`, the slot is drawn on the per-type screen only.

Where the slot would only look a component up, `recordCards` is the shorthand —
a component per type, rendered with the record's `id`; a type with no entry
has no cards of its own, and the slot wins where both are given:

```vue
<DataShell :schema="schema" :record-cards="{ tests: TestCards, runs: RunCards }" />
```

`views` can follow the same reading. A function is asked with the type being
listed and the records the query names, and offers what it returns — so a
host need not read the query back out of the URL to decide what each screen
draws:

```ts
const views = ({ entity, records }: ViewsContext): ViewKind[] =>
  entity ? ['table'] : records.length ? ['cards'] : ['table', 'cards']
```

A type's own list is a table; a screen about a record is cards alone, its own
cards being drawn there and nowhere else; and the corpus offers both. One view
on offer is what takes the chooser off the bar.

### What goes in a card

A page about one record is mostly a host's own content in those cards — the
record's facts, a table of what it said, its source, its log — and the same
handful of pieces turn up on every such page. These are those pieces. Each is
a plain component with no context to read, styled in the shell's tokens, so
it takes the theme wherever it is put inside a `.dc-shell`.

#### Facts

`<ShellFacts>` is a record's metadata, as a grid of labels over values: as
many columns as fit at `min` (`200px` by default), so a full-width card on a
desktop holds five and the same card on a phone one. It is a `<dl>` — a `div`
per fact, holding its `dt` and `dd` — with small labels in the caps a theme
sets small labels in, and mono values that may break anywhere.

```vue
<ShellFacts :items="[
  { label: 'Started', value: fmtDate(run.startedAt) },
  { label: 'Size', value: fmtBytes(spec.bytes), title: `${spec.bytes} bytes` },
  { label: 'Recorded URLs', value: spec.flowUrls },   /* a line apiece */
  { label: 'Finished', value: run.finishedAt },       /* null: drawn as — */
]">
  <!-- A fact that is more than text: the label and the value are slots. -->
  <ShellFact wide>
    <template #label>Command <CopyButton :text="run.command" /></template>
    <ShellCode :code="run.command" :max-height="96" />
  </ShellFact>
</ShellFacts>
```

| `ShellFactItem` | Type | Notes |
| --- | --- | --- |
| `label` | `string` | |
| `value` | `string \| number \| null \| (string \| number)[]` | A list is a line per entry. Nothing, `''` or `[]` is the shell's `—`. |
| `title` | `string` | The value's tooltip. |
| `wide` | `boolean` | Takes the whole row, for a command line or a sentence. |

`<ShellFact>` takes the same four as props, plus a `label` slot and a default
slot for the value. The items come first, then the children.

#### Pills and counts

`<StatusPill>` was a record's status and nothing else. It now also takes a
`label` — the words, in place of the status's own — and a `tone`, the colour
chosen outright, so a word that is not a status can wear the pill without
pretending to be one. `status` may be left out wherever one of the other two
is given:

```vue
<StatusPill status="failed" />                              <!-- as ever -->
<StatusPill status="ok" label="passed" />                   <!-- a run's word for ok -->
<StatusPill tone="accent" label="crawler-generated" />
<StatusPill tone="review" label="live — no profile" />
<StatusPill tone="neutral" label="hand-written" />
```

The tones are the five statuses — `ok`, `running`, `review`, `failed` and
`queued`, each in the colour that status has always had — plus `neutral`,
which is `queued`'s no-colour said on purpose, and `accent`, which is the
shell's own and the one a running record wears. `PillTone` and `PILL_TONES`
are exported. A tone given beside a status wins.

`<StatusCounts>` is what a run came to, in the space of a table cell —
`12 passed · 1 failed · 2 skipped`, each count in its tone:

```vue
<StatusCounts :counts="[
  { label: 'passed', count: stats.passed, tone: 'ok' },
  { label: 'failed', count: stats.failed, tone: 'failed' },
  { label: 'flaky', count: stats.flaky, tone: 'review' },
  { label: 'skipped', count: stats.skipped },              /* neutral */
  { label: 'running', count: stats.running, tone: 'running' },
]" />
```

Words rather than a pill apiece, since six pills in a cell is a cell made of
chrome. A count of nothing is left out, and a row with nothing to count is
`empty` (`—`). The counts are a list rather than a map from tone to number
because two of them can share a colour, and the order is the host's.

#### Code, and copying it

`<ShellCode>` is a block of code or machine text — a spec's source, an
error, a command line:

```vue
<ShellCard title="Source" span="all" flush>
  <ShellCode :code="spec.source" :max-height="460" copy @error="toastError" />
</ShellCard>

<ShellCard title="Error" flush>
  <ShellCode :code="result.error" tone="danger" />
</ShellCard>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `code` | `string` | — | The text. The default slot gives it instead. |
| `maxHeight` | `string \| number` | — | The tallest it grows before it scrolls in place — with `overscroll-behavior: contain`, so reading to its end does not start scrolling the page. A number is pixels. |
| `copy` | `boolean` | `false` | A copy button in its top right corner. |
| `copyLabel` | `string` | `'Copy to clipboard'` | The button's tooltip and accessible name. |
| `wrap` | `boolean` | `true` | Long lines wrap. Off for text whose columns mean something. |
| `tone` | `'danger'` | — | A red rule down its side and a red tint, for an error. |

It emits `copied` and `error` from the button. In a `flush` card body it *is*
the body — no border, no corner, no margin — and anywhere else it is an inset
box with a hairline round it.

`<CopyButton>` is that button on its own, for text shown somewhere a block
would be too much — beside a fact's label, say. `text` is a string, or a
function for text only known at the press; `label` names it. It shows a tick
for a moment once the text is on the clipboard and emits `copied`; where the
clipboard refuses — an insecure origin, a permission denied — it emits `error`
with the reason and shows nothing, since how a failure is told is the host's.

#### A log that is still being written

`<ShellLog>` is a run's output while the run is going: it reads only what it
has not read yet, and follows the tail the way a terminal does — until the
reader scrolls up, so reading back through a failure is not yanked away by the
next chunk. Scrolling back to the end picks the tail up again.

```vue
<script setup lang="ts">
const log = ref<InstanceType<typeof ShellLog> | null>(null)
// On whatever beat the host already polls the run on:
await log.value?.poll()
</script>

<template>
  <ShellCard title="Output" span="all" flush>
    <ShellLog ref="log" :fetch-chunk="(offset) => api.runLog(id, offset)" strip-ansi />
  </ShellCard>
</template>
```

`fetchChunk(offset)` answers with `{ chunk, offset }` (`LogChunk`): the text
written after `offset`, and where it ends. When to ask is the host's, through
the exposed `poll()`; a poll while one is in flight is that one, rather than a
second read of the same text. `reset()` forgets what was read. `stripAnsi`
takes out a terminal's colour codes, which in a page are not colour but
`[31m` in the middle of a line. `maxHeight` is `460px` unless given — a log
has to scroll inside something to have a tail to follow. It is drawn as
`<ShellCode>` is, flush card bodies and all.

### Dialogs and toasts

`<ShellDialog>` is a modal: a question the page waits on.

```vue
<ShellDialog v-model:open="deleting" title="Delete 3 tests?">
  <p>This removes the specs and their fixtures.</p>
  <template #actions>
    <button @click="deleting = false">Cancel</button>
    <button class="danger" @click="remove">Delete</button>
  </template>
</ShellDialog>
```

It is teleported to `body` (`to` moves it), so no card's or shell's
`overflow` clips it, and it renders nothing at all while closed — no hidden
backdrop to swallow clicks. `open` is `true` unless given, so it can as well be
put up with a `v-if` on it. Escape and a press on the backdrop ask to close it,
with `close` and `update:open`; only the dialog on top hears Escape, and a drag
that starts inside the panel and ends on the backdrop is not a press of it.
Opening puts the focus on the first thing in it that takes focus — or on the
one marked `autofocus` — and closing gives the focus back where it was. It
does not trap the focus.

The dialog's parts are public classes, for styling what goes in it:
`.dc-dialog__panel` (the box), `.dc-dialog__title`, `.dc-dialog__body` (around
the default slot) and `.dc-dialog__actions`. `panelClass` and `bodyClass` put
classes of the host's on the panel and the body — anything a `class` binding
takes — since a `class` on the component itself has no element to land on, the
dialog being teleported.

```vue
<ShellDialog title="Delete 3 tests?" panel-class="wide-dialog" body-class="file-list">…</ShellDialog>
```

#### Which theme a layer wears

Being in `body` puts a dialog outside every `.dc-shell`, where the tokens are.
So it is a layer: an element that wears `class="dc-shell dc-layer"` — the
shell's palette, its type, and every rule a host has written against
`.dc-shell`, with `.dc-layer` giving back the shell's *layout*, none of which a
layer wants (see below). Toasts and popovers are layers too. What it is
dressed as, first match wins:

1. **Its own `theme`, `accent` and `tokens` props**, field by field.
2. **The nearest `DataShell` it is rendered inside**, as a component — the
   shell's `theme`, `accent` and `tokens`, followed as they change.
3. **The app's default**, set with `provideShellTheme` or the plugin.
4. **The nearest `.dc-shell` element above it in the page** — that element's
   `data-dc-theme` and the tokens on its `style`. This is what reaches a
   `<div class="dc-shell" data-dc-theme="dark">` of the host's own.
5. **The minimal theme.**

Where 4 finds a `.dc-shell` of the host's *inside* the `DataShell` of 2, that
one is the nearer and wins. A dialog written *beside* a shell rather than in
it — a sibling of `<DataShell>`, or at the root of an app with the toasts — is
neither a descendant of the shell nor inside it in the page, so the app's
default is what dresses it:

```ts
// main.ts
app.use(HeaderContentLayoutPlugin, { theme: 'dark', tokens: { '--dc-accent': '#6aa9ff' } })
```

```ts
// or in the root component's setup — refs and getters are followed
provideShellTheme({ theme: 'dark', tokens: () => palette.value })
```

Either sets only what layers fall back to: a shell is still themed by its own
`theme` prop. A host stylesheet's rule on `.dc-shell` — `.dc-shell {
--dc-surface: … }` — reaches every layer as it reaches every shell, being a rule
on a class they all wear. `useLayerTheme(props)` is the resolution itself,
exported for a host building a layer of its own; `SHELL_THEME_KEY` is what is
provided.

Toasts are short messages in a corner that go away on their own. `useToasts()`
is one stack for the whole app — a toast raised in a dialog survives the
dialog — and `<ShellToasts>` draws it; mount that once, anywhere:

```ts
const { toast, toastError } = useToasts()
toast('Saved')                         // 'ok', up for TOAST_MS (4.5s)
try { await api.save() } catch (error) {
  toastError(error)                    // 'err', up for TOAST_ERROR_MS (9s)
}
```

```vue
<ShellToasts theme="dark" />
```

`toastError` takes anything thrown: an `Error`'s message, or the thing said as
a string. `dismiss(id)` takes one down early, and `toasts` is the stack itself
for a host drawing its own. `<ShellToasts>` is teleported and dressed exactly
as the dialog is; written outside any shell, which is usual, it takes its
`theme`, `accent` and `tokens` from its props or the app's default. The stack
is a polite live region, and an error toast is an alert.

#### Popovers, and layers of your own

`<ShellPopover>` is a box of the host's own opened against a control — a
multi-select's grid of toggles, a filter, a date picker; the shell's menus are
a list of items, and this is for everything that is not.

```vue
<button ref="trigger" :aria-expanded="open" @click="open = !open">{{ summary }}</button>
<ShellPopover
  v-model:open="open"
  :anchor="trigger"
  :max-height="340"
  class="tenant-picker"
  role="dialog"
  aria-label="Tenants"
>
  <input v-model="filter" type="search" placeholder="filter…" />
  <button v-for="t in shown" :key="t.id" :aria-pressed="has(t)" @click="toggle(t)">{{ t.label }}</button>
</ShellPopover>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | `v-model:open`. A press outside it and its anchor, or Escape, emits `update:open` with `false` (and `close`). |
| `anchor` | `HTMLElement \| null` | — | What it opens against. |
| `side` | `'below' \| 'above'` | `'below'` | The side it opens on when that side has the room. |
| `align` | `'start' \| 'end'` | `'start'` | Its left edge on the anchor's, or its right edge on the anchor's. |
| `maxHeight` | `number` | — | The tallest it grows; the room on its side caps it too. |
| `to` | `string \| HTMLElement` | `'body'` | Where it is drawn. |
| `theme`, `accent`, `tokens` | | | As a dialog's, above. |

It is teleported to `body` and placed with `position: fixed` from the anchor's
box: below it, or above where below has less than 180px and above has more;
at least as wide as the anchor and no wider than the window; never taller than
the room its side has, the rest scrolling in place. Scrolling anything under it
or resizing the window moves it with the anchor, and so does its own content
changing size. Escape takes down the popover on top and nothing else — a
popover in a dialog closes before the dialog does — and gives the focus back
to the anchor if it was inside. A press inside a popover opened from inside
this one counts as inside. Any attribute given to it — a class, a `role`, an
`aria-label`, a `style` — lands on the box, and its look (surface, border,
radius, shadow, `10px` of padding) is at no weight, so a class of the host's
restyles it whichever sheet loads first. `placePopover(anchorRect, width,
viewport, options)` is the placement arithmetic on its own.

A layer of your own — anything else drawn in `body` that should look as
though it belongs to the shell — is an element wearing `class="dc-shell
dc-layer"` and a `data-dc-theme`. `.dc-layer` keeps the palette and gives back
what `.dc-shell` says about layout: `display`, `flex`, `overflow`, the
background — painted only if `--dc-layer-bg` is set — and above all
`container-type`. The shell is a size container, and a size container is the
containing block of its `position: fixed` descendants: a fixed element inside
a `.dc-shell` is placed against the shell, not the window, which is why a
layer is drawn in `body` and not teleported into the shell. `.dc-layer` is at
the weight of `.dc-shell` itself, so any class of yours on the same element
outranks it.

### Controls of your own

The shell draws its own controls in scoped CSS, so a host's `<button>` in one
of its cards is the browser's grey box beside the shell's token-coloured ones.
`controls.css` is the sheet that closes that gap — opt in, and imported after
`style.css`:

```ts
import 'appfr/style.css'
import 'appfr/controls.css'
```

```vue
<button class="primary">Run</button>     <!-- filled with the accent -->
<button>Duplicate</button>
<button class="danger">Delete</button>   <!-- drawn in the danger colour -->
<button class="link">Open</button>       <!-- reads as a link -->
<select>…</select> <input type="text"> <textarea /> <table>…</table>
<p class="dc-hint">What a choice will do.</p>
<p class="dc-hint dc-hint--warn">Leaves each browser window open.</p>
<p class="dc-hint dc-hint--danger">The server said no.</p>
```

It styles buttons, `select`, text-like inputs, `textarea`, a plain `table`
and `.dc-hint` inside a `.dc-shell` — which a `<ShellDialog>` is — in the
shell's tokens, so they follow the theme. It never touches the shell's own
controls: everything the shell draws carries a `dc-` class, and an element
with one is left alone (so a host element can opt out the same way). Every
rule is in `:where()` and carries no specificity, so any rule of the host's
beats it — except the variants' text colours, which have to match
`style.css`'s `.dc-shell button { color: inherit }` and so are at that weight;
loading this second is what lets them win. `style.css` does not import it, so
nothing changes for a host that does not.

The other side of carrying no weight: *any* plain rule of the host's on an
element — a global `button { … }` or `select { … }` — beats it everywhere,
including inside the shell. A host adopting `controls.css` has to remove its
own global control styles, not layer this sheet under them.

Inside a dialog's body it also sets out the two things a dialog usually says:
a `ul` or `ol` is indented as a list, and a `label` is a row — a checkbox
beside the sentence it answers. A card's body is left alone.

### A facet a row holds several of

A chips facet is one value per row by default. Mark it `multiple` and a row may
hold a list instead, and it answers to each of its values on its own:

```ts
{ kind: 'chips', key: 'region', label: 'Region', options: ['eu', 'us', 'apac'], multiple: true }
```

```ts
{ id: 'acme', fields: { primary: 'Acme Retail', region: ['eu', 'us'] }, /* … */ }
```

That tenant is in `eu`'s set and in `us`'s, so the chips overlap rather than
partition the population — the three of them together account for more rows
than there are. Without it a row belonging to two values has to carry a
combined value of its own (`eu + us`), which becomes a chip in its own right
that nobody thinks to click, and `eu` then quietly means "eu and nowhere else".

Nothing else changes: the URL, the summary and the controls are the same, and
filtering follows whatever the row holds — a source may return a list whether
or not the schema declares one. The flag is what says so in the schema, and
what the bundled mock source generates against.

## The expression field

A small query language, evaluated by the bundled mock source and exported for
your own use (`parseExpression`, `matchesExpression`):

```
site:*.shop AND price < 40 AND seen:false
theme:space year>=1988 parts>300
cve OR advisory
"platform engineer"
```

Whitespace means AND (the keyword is accepted too); `OR` splits alternatives; a
bare word matches the identity and reference columns; `*` is a wildcard. Two
`field:value` terms on one field are any-of rather than both — `category:5
category:7` is the rows filed under either, since no row is filed under both,
and it is what pressing two categories writes; only a positive `:` or `=`
reads so, a range like `year>=1988 year<=1990` staying two constraints and
`-set:a -set:b` both sets left out. A
leading `-` turns a term round — `-theme:space` keeps every row the plain term
would have dropped — and it turns only the *match*: an unknown field or a
number compared against a word constrains nothing either way, so a half-typed
term with a dash in front of it is still half-typed rather than an empty
screen.
`field:value` and `field<op>number` resolve in this order: `entity`, then a
field the row actually carries, then a column by key or heading, then a facet
by heading, then the generic role names (`name`, `ref`, `status`, `updated`,
`metric1`…). So a declared field is never shadowed by a heading or a
convention that happens to read the same. An unrecognised field is ignored
rather than treated as a mismatch, so a half-typed expression keeps showing
results — except a join key under
[`strictScopes`](#narrowing-to-one-record), which a row has to carry.

A heading of more than one word is written run together and in any case —
`priceratio<0.5` for **Price ratio** — or by its shortcut, the first letter of
each word: `pr<0.5`, `p>2` for **Price**, `mp` for **Mod. price**. A shortcut is
written out as the column's key when the query is committed, so the address,
the pill and the host's source all see `ratio<0.5`; the host never has to know
shortcuts exist (`expandShortcuts`, `columnShortcut`). Where two headings share
one, it is the first column's, in the order the entity declares them, and the
other is reached by its heading. A table header's hover title names its
column's shortcut after the hint (`columnShortcutOf`). A shortcut never stands in for a name the
query could already say — a column's key or heading, a facet, `entity`, a
generic name — so nothing written before shortcuts changes meaning. A column
key is matched whatever its case, since the parse lowercases every field.

A term against a multi-valued facet is satisfied by any one of the row's
values, so `region:eu` keeps a tenant that runs in `eu` and `us` both. A
numeric comparison against one constrains nothing.

`entity:` is what makes kind filterable from the expression alone —
`entity:logs` from home narrows to logs without leaving the whole-corpus view.

### The parts of a query

The header shows a query as the parts it is made of — the entity filter, how
the results are drawn, and each term of the expression, facets among them.
Press a pill and that part comes out; the rest goes on running.

```
[Items · 412 ▾] [List ▾] [updated ▾] [↓] [year>=1988] [release] or [recall]
                                          ^ press: that constraint is gone
```

Three of those parts are choices rather than pills, and none of them spends a
word of the bar saying what it is — what each of them holds says that already. The
entity is the first, because the useful move from one type is almost always
another type. It lists every entity the schema declares with `Everything` at
the top, so widening back out is still one press — it is simply not the only
thing on offer. And it is in the bar whether or not anything is filtered: a
query is about something even when that something is everything, so the whole
corpus is a scope like any other rather than the absence of one.

The view is the second, and the ordering is the third, and both are on the bar
for the same reason: how the results are drawn and what they are ordered by are
parts of the query, in the URL with the rest of it, so they are choices you
make where the query is. The sort
lists the columns that offer an ordering, named as those columns are named, so
the bar and the table's own headings offer one list rather than two; the arrow
beside it is that same ordering the other way about, which is a press rather
than another entry in the list. What narrows a type — its facets, and
anything else — is the expression, in the field beside them.

The ordering waits for a type, though. A mixed result set has only the
schema-level `columns` to be ordered by — generic headings a row of any type
can fill — and a column that holds a different thing in every row is not
something to put a result in order of: a colour's parts ranked against a log's
duration is one list of two measurements that were never the same measurement.
So on `Everything` the chooser and its arrow are off the bar, and choosing a
type brings back that type's own orderings, which is the same moment they start
meaning something. A mixed table's own headings still sort — there the column
is on screen with its rows under it, so pressing it orders what is in front of
you rather than picking a generic name out of a list.

It says how many, too, because what is being listed and how much of it there is
are one question. Each type carries the population the schema publishes —
`Items · 10k` — and the type in force says what actually matched the moment a
facet or an expression narrows it, since the population is then no longer what
is on screen. `Everything` carries a count only while it is what is being
listed: the corpus population is the one number no schema publishes, so what
stands there is the size of the result the shell asked for. Both halves of that
label are counts in one control, so the shell writes both: a schema publishes
`count` as a number and the shell abbreviates it with `formatCount`, the same
function the live counts go through — `9988` reads `Items · 10k`, since a
population is read for its size. A string is shown as given, for a count that
is not a number yet (`~1.2k` while it is estimated, `''` while it is unknown).
`formatInteger` is the exact, grouped form the pager writes page and row
numbers in.

A part is a control of its own: pressing it lifts that constraint.

`OR` groups are alternatives rather than requirements, so the bar says `or`
between them, and lifting the last term of one drops that alternative with it.

A part whose field is some entity's `scope` names a *record* rather than a
value, and an id is a join key rather than something anyone recognises. So the
header looks that record up and says which one it is, keeping the id it was
written with:

```
set="sets_10007"      as written by a drill, and as it stays in the URL
set:Yellow Castle (sets_10007)      as the header reads it back
```

**A drill's term is exact.** It is `=`, not `:`, because ids nest and `:`
matches by containment: `test:"ticket-3.0/x.spec.ts"` is true of
`pre-ticket-3.0/x.spec.ts` too, so narrowing to one record used to bring its
namesake's rows along. `=` compares each id whole, entry by entry in a list.
A query still holding the old `field:"id"` spelling — a bookmark, a host
writing its own — is read as naming the same record by `addTerm`,
`termStanding`, `liftTerm` and `withStanding`; it keeps its own containment
match until one of them rewrites it.

The lookup is the drill's own term run back against the type it points at —
one query, cached for as long as the shell is up — so a source that already
answers `set="sets_10007"` needs nothing new to be readable. The record is
still picked out as the row that **has** the id rather than the first row back,
since a source that ignores the `=` — or a term in the old `:` spelling —
returns every row the id is part of. A window of rows is what
the lookup asks for and the record is picked out of it; an id that is part of
more ids than that keeps showing as an id, and so does one no row carries.

A name that is the id is not a name either. Plenty of types are called what
they are keyed by — a tenant by its host, a profile by its directory — and
`host:www.example.com (www.example.com)` is one fact said twice, so the part
stays the plain term it was. A type that gives no column the `identity` role
leaves the id showing for the same reason.

`useRecordNames` is exported for a host reading terms out somewhere else, and
`scopedEntity(schema, field)` is the half of it that says which type a field
points at.

Lifting a part writes the expression back out from what it parsed to, so
`Theme:space AND price < 40` returns as `theme:space price<40` — the parse
keeps neither the case nor the spacing it was written with. `formatExpression`
and `withoutTerm` are exported for a host doing the same thing itself, as are
`summaryTerms(query, entity)` for the list and `removeTerm(term)` for the press.

That rewriting is why `addTerm` compares terms rather than text: `scopeTerm`
always quotes and a rewrite quotes only where it has to, so `host="a.example"`
and `host=a.example` are the same constraint written twice. Drilling into a
record after lifting any other part of the query adds nothing the second time.

A query too long for the bar scrolls rather than wraps, and the row hides its
scrollbar — so the edge with parts behind it is faded, and the row says which
in `data-dc-more` (`start`, `end`, `both`, or empty). It is measured from the
rendered row rather than driven by a scroll timeline: a timeline leaves its end
state applied once the row stops overflowing, which is what lifting a part
does, and the fade would then sit over the label for good.

### The field it is edited in

The bar is where the query is edited, and the only place: the parts stand in
the field in front of a box, and the box is where the next one is written — a
word to look for, or a term like `p<5` or `quantity:100..`.

The box is a draft and nothing else: Enter ANDs what was typed on to the query as it stands
(`refineExpression`, so a word added to `release OR recall` is added to each
alternative, and `-set:a` typed on to `set:a` turns the term round rather than
leaving the query saying both), the new part takes its place beside the box as
a pill, and the box is empty again for the next. Escape gives the draft up.
The parts are in the field the way characters are in a line of text: the arrow
keys step the box past them one at a time, Backspace at the start of the box
lifts the part in front of it and Delete at its end the one after. Wherever the
box is, what Enter commits lands at the end of the query.

```
[Items ▾] [List ▾] [year ≥ 1988] | brick        |
                                   ^ Enter: [brick] joins the row
```

It is a draft the results already answer, though. What is typed narrows them
as it is typed — the query AND the draft, read after a pause of
`DRAFT_DELAY` (150ms) so that a word typed faster than a source answers is one
query rather than one per letter — and everything that says what matched goes
with it: the rows, the total and the pager, the card per type and the count on
each, the counts in the type picker. Nothing reaches the URL while it does.
The history holds the queries that were asked rather than every prefix of them
on the way, so Back from a committed `brick` goes to before it, not to `bric`.
Enter commits it exactly as it always did, Escape gives it up and the results
are the query's again at once, and a box emptied by hand is read at once too:
there is nothing to wait for in going back.

A few things follow from the draft not being in the URL:

- **Its pages are its own.** The results start at page one whatever page the
  query was on, and the pager pages the draft's results — held beside the
  draft rather than written to the address, and back at page one whenever the
  draft changes. Escape returns to the query's own page.
- **A term on its way to being one reads as nothing yet.** `status:` is a word
  to the parse — a field with no value — and a word no record's name contains
  would empty the screen on exactly the keystroke a reader pauses on before
  the value. So a field with its operator and nothing after it, and the lone
  `-` every turned term starts with, are left out of what is read until they
  are terms (`readDraft`). Enter still commits what was typed: a reader who
  presses Enter on `status:` asked for that. Everything else already degrades
  on its own — an unknown field constrains nothing, and a quote not yet closed
  runs to the end of the box.
- **A press on a record the draft found takes the draft with it.** Narrowing
  to a record is what the draft was looking for, and the words that found it,
  ANDed on to the record's own screen, would hide most of what it is about.
  Leaving a record *out* (⌥-press) keeps the draft, being a refinement of the
  very list the draft drew; so does every other change to the query — a sort,
  a view, a pill lifted.
- **Nothing on screen flashes back.** Enter and a press empty the box at once,
  but the draft's results stay up until the new query lands, so a router that
  writes the URL a tick later (vue-router, Nuxt) goes from the draft's results
  to the committed query's without the query-without-it in between.

The context carries the draft for a view of your own: `draft` (the box's
text), `liveQuery` (the query the results are read under — `query` itself
whenever nothing is typed), `drafting`, `commitDraft` and `abandonDraft`. A
view that runs its own query against the source should read `liveQuery`, or it
goes on showing what the reader is typing their way out of. `useDraft` is the
same thing as a composable, for a host putting the header over results of its
own.

## Component API

### `<DataShell>`

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `schema` | `DomainSchema` | — | Required. |
| `source` | `DataSource` | mock over the schema | Where rows come from. |
| `route` | `RouteAdapter` | injected, else History API | How the query reaches the URL. |
| `defaults` | `ShellQueryDefaults` | home, `cards` (one type: `table`), `updated`, `desc` | Fallbacks when the URL omits a field. `landing: 'entity'` opens on one entity's list instead of home, in `view`. `entityView` is the view one type opens in. |
| `within` | `string` | — | An expression the whole shell is read inside — its scope, held here rather than in the URL. See [a shell about one record](#a-shell-about-one-record). |
| `previewsPerType` | `number` | `3` | Rows inside each type's card on the home screen. `0` draws only each card's heading (name and count, no `create` button), in narrower wrapping columns. |
| `typeChooser` | `'scoped' \| 'always'` | `'scoped'` | When the strip over the results offers the list of types. `scoped` only once one is filtered to, the home screen's cards naming the types already; `always` keeps it on `Everything` too, for a home screen that opens on records rather than on a card per type. |
| `selectionPlacement` | `'start' \| 'end'` | `'start'` | Where the strip over the results says how many are ticked, and offers to clear them. `start` leads the strip, after the type and view choosers, with Clear as a quiet word; `end` sets both at the far end beside Duplicate, Delete and the rest, Clear drawn as one of their buttons. |
| `limit` | `number` | `50` | Rows per page. The header offers the pages this divides the results into. |
| `pagesNote` | `string` | — | What the count is short of, in your words — `first 1,200 of 30,200 lots`. Goes under the pager's hover text, and keeps the pager up on a single page. See [paging through the results](#paging-through-the-results). |
| `views` | `ViewKind[] \| ((context: ViewsContext) => ViewKind[])` | all seven | Restricts the offered views. A URL naming one that is not on the list renders the first that is, so an old link cannot reach a view the bar has no way back from. With one on the list there is no View chooser over the results — pass a reactive list to draw each screen one fixed way (`cards` across the corpus, `table` on a type), or a function of `{ entity, records }` and the shell works the screen out for you — see [cards for the records the query names](#cards-for-the-records-the-query-names). |
| `loading` | `boolean` | `false` | The source's answers are not yet the data. The results area says *Loading…*, the pager is off the bar, and nothing is corrected from a count until it turns false — see [while the data is on its way](#while-the-data-is-on-its-way). |
| `recordCards` | `Record<string, Component>` | — | A component per record the query names, by the record's type, given `id` — the shorthand for the `record` slot. See [cards for the records the query names](#cards-for-the-records-the-query-names). |
| `pageQuery` | `'shell' \| 'detached'` | `'shell'` | Whether a `page` is about the query. `detached`: the bar reads the pristine query, not the page's URL, and its first edit goes to `listPath`. Read only while a `page` is provided — see [a page that is not about the query](#a-page-that-is-not-about-the-query). |
| `listPath` | `string` | `'/'` | Where a detached page's first edit lands. |
| `accent` | `string` | — | Overrides `--dc-accent`. Shorthand for `tokens`. |
| `tokens` | `Record<string, string>` | — | Design tokens set on the shell element, e.g. `{ '--dc-surface': '#101418' }`. |
| `theme` | `'minimal' \| 'mono-size' \| 'dark' \| 'light' \| 'auto' \| 'macos' \| 'windows' \| 'inherit'` | `'minimal'` | `minimal` is paper, ink and hairlines with nothing else on — the values the layout stops working without and no more; `auto` follows the system setting; `macos` and `windows` wear that system's design language and follow its scheme; `inherit` brings no palette at all; `mono-size` is `inherit` with the type scale given up too, every word at the host's one size and one weight with only colour and opacity varying. |
| `rowPress` | `'open' \| 'narrow'` | `'narrow'` | What pressing a row means: add that record to the query, or report it as `activate` and apply nothing. See [narrowing to one record](#narrowing-to-one-record). |
| `rowLinks` | `boolean` | `false` | Makes every table row a real link to where pressing it goes, so a middle click, the context menu and the address on hover work anywhere on the row rather than on the name alone. Each data cell holds an `<a>` under what it draws; the ticks, the `+ · −`, a count's drill and the marks stay pressable above it, and one link per row (the identity column's) is in the tab order. For a host whose name column is no link of its own (`activate: false`). |
| `pinnable` | `boolean` | `false` | Offers the star affordance on rows. |
| `selectable` | `boolean` | `false` | Offers the tick on rows even where the type names no operation for a selection. A type naming `duplicate` or `delete` offers them anyway. |
| `pinned` | `string[]` | — | `v-model:pinned` to control pinning; omit and the shell holds it. |
| `selected` | `string[]` | — | `v-model:selected` to control which records are ticked; omit and the shell holds it. |
| `navigationMode` | `'push' \| 'replace'` | `'push'` | For entity, view, sort and expression. |
| `facetNavigationMode` | `'push' \| 'replace'` | `'replace'` | For a facet set through `setFacet` and its kin. |

**Events** — `activate(row)` when a row is opened, `create(entity)` when a
create button is pressed, `duplicate(selection)` and `delete(selection)` when
the ticked records are to be copied or deleted, `drill(row, entity)` when a row
is narrowed to (already applied), `query-change(query)` after the URL has been
updated, `toggle-pin(row)`, plus `update:pinned` and `update:selected`.

**Slots** — `actions` for extra controls at the right of the header bar,
`brand` for a mark in place of the domain's name at its left (see
[a mark for the name](#a-mark-for-the-name)), `cards-before` and `cards-after` for
[cards of your own](#cards-of-your-own) above and below the card-per-type
screen, `record` for cards about [each record the query
names](#cards-for-the-records-the-query-names) (receives `entity` and `id`),
`page` for [a page of your own](#a-page-of-your-own-under-the-bar) under the
same bar (receives `query`), and `results` to replace the content area
entirely (receives `rows` — the current page of them — plus `total`,
`offset`, `pageCount`, `query`, `pending` and `loading`). That `query` is the
one the rows answer, which is the committed query with whatever is being typed
in the header's box ANDed on — see [the field it is edited in](#the-field-it-is-edited-in).

### A mark for the name

The domain's name at the left of the bar is the way home, drawn as a button:
pressed, it returns
the shell to the schema's defaults, as `reset()` does — a step the back button
undoes. The `brand` slot draws a
mark in its place — a logo, an icon — and the name stays the bar's accessible
text, read out where the mark is drawn, so `schema.label` is still the one
place the name is written:

```vue
<DataShell :schema="schema">
  <template #brand>
    <svg viewBox="0 0 16 16" width="18" height="18">…</svg>
  </template>
</DataShell>
```

The mark is hidden from assistive technology, which reads the name on the
button it is drawn in, and goes home when pressed as the name does. It takes
the name's colour (`currentColor`)
and goes where the name goes on a narrow shell. The slot is handed `label`,
for a mark that wants to say the name too.

### A page of your own under the bar

Not every screen of an application is a list. A form that acts on what the
query matches — run every spec it names, export every row — or a report about
it is still *about the query*, and belongs under the same bar rather than
under a second one of the application's own. The `page` slot is that: it
takes the room the results would have, and the bar above it goes on showing
the query and editing it.

```vue
<DataShell :schema="schema" :route="route">
  <template v-if="$route.name === 'run-new'" #page="{ query }">
    <RunForm :query="query" />
  </template>
</DataShell>
```

How it differs from `results`, which also replaces the content area: `results`
is handed the rows and draws them its own way, so everything that acts on rows
stays. A page is not a drawing of the rows, so under it

- the bar carries **no pager**, and there is **no strip over the results** —
  no Type or View chooser and none of the type's
  [operations](#records-you-can-copy-and-delete): there is nothing under it to
  page through or draw another way, and *Delete* over a form deletes nothing
  the reader can see;
- **nothing corrects the URL's page** from a count, so `p` is where it was when
  the slot goes and the list comes back.

Provide it conditionally — `v-if` on the `<template>` — and the shell is the
list again the moment it is not. The source still runs the query, which is what
the count beside the type on the bar says: how many the page would act on.

#### A page that is not about the query

The run form above is about the query: its input *is* the query, and an edit
on the bar narrows what it will run. Some pages only share the bar — a form
making a new record, a report on one run. Their URL's parameters are their
own (`/crawl-report/x?crawl=run-7`), and read as a query they would put
pills on the bar that mean nothing. `pageQuery="detached"` says so:

- the bar reads the **pristine query** — `Everything`, nothing narrowing it —
  whatever the page's URL holds, and the page is handed that as its `query`;
- the **first edit** to it — a word typed and Enter, a type chosen, an
  term committed from the bar — is a way back to the list: it navigates to `listPath` (`/`
  unless you say) with that edit applied, and pushes, so Back returns to the
  page;
- nothing is written while the reader only reads: the page's URL is the
  page's.

It is read only while a `page` is provided, so one shell can carry it for
every route and it means nothing on the list itself.

A recipe — one shell for every route, as an app with a form that runs the
query, a form that makes a record and a report would have it:

```ts
// router.ts — every route renders the shell, so moving between them keeps it.
const ShellView = () => import('./ShellView.vue')
const routes = [
  { path: '/', name: 'shell', component: ShellView },
  { path: '/runs/new', name: 'run-new', component: ShellView },
  { path: '/crawls/new', name: 'crawl-new', component: ShellView },
  { path: '/crawl-report/:dir', name: 'crawl-report', component: ShellView },
]
```

```vue
<!-- ShellView.vue -->
<script setup lang="ts">
const router = useRouter()
const route = createVueRouterAdapter(router)

const PAGES = { 'run-new': RunStartView, 'crawl-new': CrawlStartView, 'crawl-report': CrawlReportView }
/** The pages whose input is the query: the run form runs every spec it matches. */
const ABOUT_THE_QUERY = new Set(['run-new'])

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

On `/runs/new?e=tests&q=checkout` the bar reads `Tests · checkout`, an edit
stays on the form and narrows the run. On `/crawls/new` and
`/crawl-report/x?crawl=run-7` it reads `Everything`, and typing `checkout`
and Enter lands on `/?q=checkout`. No wrapping of the router in a
`currentRoute` that pretends to be `/` is needed.

`detachableAdapter(adapter, { detached, path })` is the adapter that does
this, exported for a host wiring `useQueryState` to chrome of its own.

### Paging through the results

`limit` is a page rather than a ceiling. When the results run past it the
header gains a step either side of where it is, and the page is in the URL as
`p` — so a page is a link like every other state the shell can be in.

```
┌──────────────────────────────────────────────────────────────┐
│ ◆ iRadar │ [Searches · 38 ▾] [List ▾]           ▼ │ ‹ 3 / 4 › │
└──────────────────────────────────────────────────────────────┘
  25  Security advisories             716    5  ▬▬▬▬   ok
  26  Security advisories · rev 4     556  260  ▬▬▬    ok
  27  Regulatory filings              682  116  ▬▬     running
```

What this does on purpose:

- **The control is only there when there is somewhere to go.** One page of
  results says nothing about pages; the home screen's type cards say nothing
  either, since each card runs its own query and stepping would move nothing.
- **The page is typed as well as stepped.** The number between the steps is a
  box: click it, type a page and press Enter, and page 30 is one number rather
  than twenty-nine presses. An emptied box, or Escape, leaves the page where it
  was.
- **The rows keep counting.** Page three of twelve opens at 25, so a row's
  number is its place in the result rather than its place on screen.
- **A change to what matched returns to the first page.** The entity, the
  facets, the expression, the sort and the direction all do this: a page is a
  position in a result set, and a different result set makes the position
  meaningless. Changing the *view* does not — the same rows drawn another way
  are still the same rows, and page three of them is still page three.
- **A page past the end lands on the last one there is.** How many pages there
  are is a count only the source knows, so the codec cannot clamp `p` the way
  it clamps a range; the shell corrects it when the results arrive, replacing
  rather than pushing so Back does not lead straight to it again. A page typed
  into the box never gets that far — the count is on screen beside it, so the
  jump is clamped before it is made.
- **A count still being made says so.** While the source is working — an
  async `query` in flight, a [stream](#results-that-arrive-over-time) not yet
  closed — the total is what it has found so far, so the pager reads `1 / ~4`
  and settles to `1 / 4` when the source closes.
- **What the count is short of is said on hover.** The shell counts pages from
  the rows its source reported, and a source that stopped part way — a
  seller's first twelve pages of sixty-three — has reported fewer than there
  are. `pages-note="first 1,200 of 30,200 lots"` puts your line under the
  pager's tooltip (`Page 1 of 12 — rows 1 to 100 of 1,200`), where the number
  it qualifies is, and keeps the pager up on a single page so the line has
  somewhere to be.

#### While the data is on its way

A synchronous source over payloads that have not landed yet answers what it
holds — no rows, nought of nought — and the shell believes a count: a link to
`?p=7` opened before the rows it names had arrived would be corrected to page
one, and the reader would never see them. `loading` is the host saying the
answers are not yet the data:

```vue
<DataShell :schema="schema" :source="source" :loading="!ready" />
```

While it is true the results area says *Loading…* in place of anything it
would otherwise draw, the pager is off the bar, and nothing is corrected from
the count. The bar is up the whole time, so the query can be read and edited.
When it turns false the shell reads the URL against the results as if it had
only just been mounted: `p=7` stays where there are seven pages, and lands on
the last page where there are fewer. It saves mounting the shell behind a
`v-if` of your own, which is the same thing with the bar missing.

A source is handed `offset` alongside `limit` and reports `total` for the whole
match — see [wiring it to your data](#wiring-it-to-your-data). Building your
own chrome instead? `useShellContext()` carries `limit`, `offset`, `pageCount`
and `total`, and `setPage` is on the query state:

```ts
const shell = useShellContext()
shell.pageCount.value          // 4
shell.query.value.page         // 3
shell.setPage(shell.query.value.page + 1)
shell.hrefFor({ page: 4 })     // a link, without navigating
```

### The table stays inside the shell

The table view lays out fixed: every column that names a `width` keeps it, and
the ones that name none share whatever is left. So it is exactly as wide as the
shell however long a value is, and what does not fit is truncated with the
whole of it on hover. (In the fixtures' set that means the metrics, the date,
the kind and the state are fixed, and the name and the secondary share the
rest.)

Hovering says the whole of the *value*, not the whole of the text: a metric
the cell rounds to `1.2k` — the shell's own compact numbers, or a `format` of
yours that shortens — hovers as the 1240 the row holds, and a name the width
cut off hovers as the name. `cellFull(column, row)` is that string, where a
cell of your own wants it too.

```
  15  Regulatory filings, every word of a name nob…   .crawl-runs/2026-08…  682  116  29 Aug  ok
  16  Security advisories, every word of a name no…   .crawl-runs/2026-08…  556  260  29 Aug  running
```

A table laid out by its content instead is as wide as its longest cell, which
puts the date and the state off the right-hand edge — the two columns a row is
scanned for — and a wrapped path makes one row four lines deep and the row
under it one.

**Except where the depth is already paid for.** A table with a picture in it —
a column of `kind: 'image'`, or any column stating a `height` — has rows taller
than a line whether the words beside them use it or not, so there a long value
runs on to `--dc-table-lines` lines (3) before it is cut short. The name is
included, mark and all: the column whose values are longest is the one this is
for. Every other table keeps its single line, because rows that are all one
depth is what a table of them is for.

Below the widths it needs, columns stand down rather than crowd — each at the
container width its [`hideBelow`](#columns-of-your-own) names. In the default
set that is the metrics first, at the size the list view drops them too, then
the kind, which the query itself usually says, then the date. The name, the
secondary and the state are what is left, and they are what a row is for.

### Where the results go on

The results scroll in a box of their own, and an overlay scrollbar is invisible
until the pointer is over it — so a table cut off at a row boundary reads as
the end of the table, and one scrolled down reads as its start. Each edge with
more behind it is faded instead, the way the bar's is, and the box lists which
in `data-dc-more` (any of `top right bottom left`, space-separated, or empty —
match one with `~=`). The fade stops short of a classic scrollbar rather than
fading it too, and it is measured from the box and what is in it, so each edge
lets go once the results are scrolled to it or stop overflowing.

### Composables

`useQueryState` is the whole query model without any of the markup — useful if
you want the URL binding but your own chrome:

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
state.setPage(3)        // paging, which any filter change returns to page 1
state.hrefFor({ view: 'grid' })   // build a link without navigating
```

`usePoll(tick, intervalMs)` keeps payloads fresh behind a source of your own:
`tick` resolves to whether to go on, the next tick is scheduled only once the
last has answered — a slow response never queues up overlapping requests —
and it stops with the component it was made in. A tick that throws stops it;
catch in `tick` and return `true` to poll through failures.

```ts
const poll = usePoll(async () => {
  payload.value = await api.load()
  return true
}, 5000)
onMounted(poll.start)  // poll.stop(), poll.polling
```

Also exported: `useResults` — which is what drives a source, streaming or not,
and hands back `rows`, `total`, `pageCount`, `pending`, `error` and `refresh` —
plus `useColumns` for the scope's column set, `usePresentedRows` for rows with
every role already resolved into `parts`, `useRecordNames` for the names behind
the ids a query narrows by, `useStableSchema` for a schema rebuilt from live
data (see [rows you already have](#rows-you-already-have)), and
`useShellContext`.

The context carries the selection as well — `selectable`, `selection`,
`isSelected`, `toggleSelect`, `selectPage` and `clearSelection`, plus `create`,
`duplicate` and `delete` — so a view of your own can offer the ticks the
shipped seven do, and `<RecordActions>` — the strip over the results, with the
Type and View choosers — is exported for a host laying the parts
out itself. `within` is on it too, for a view that says what narrowed the
results: it is the shell's scope rather than part of its query, so it is not on
`query`. `useResults` and `useEntityPreviews` each take it as an option, which
is how a host wiring its own results area keeps them inside the same scope.

So is `liveQuery`, the query as the results are read under it while a draft is
being typed in the header's box, and the draft's own `draft`, `drafting`,
`commitDraft` and `abandonDraft`. A host that builds its own context with
`provideShellContext` may leave all five out, and gets the box as it was
before it was read live — a draft Enter commits and that narrows nothing until
then — since its own results were wired to `query` and the header's counts
would otherwise disagree with them. To have it read live, make the draft with
`useDraft({ query, entity, setExpression })`, hand its `live` to `useResults`
as the query, provide its parts on the context, and send `setPage` to the
draft's own while it is `drafting` — `DataShell` is the worked example.

## Windows and menus

Panels in a split grid and the application menu over them are packages of
their own: [window-frame](https://github.com/opowell/window-frame) and
[menu-bar](https://github.com/opowell/menu-bar). A shell is one thing a
window's panel can hold — `ResultsArea` with `useQueryState` and `useResults`
behind it is the usual way, so the window's menu can switch the panel's view.

## Theming

The shell's tokens and its eight palettes are the
[themes](https://github.com/opowell/themes) package, and its README is the
theming guide. In short: `theme` picks a palette, `accent` sets the accent,
and `tokens` overrides any token, on `<DataShell>` and on every layer it opens.

```vue
<DataShell :schema="schema" theme="dark" accent="#6aa9ff" />
```

## Embedding

The shell sets `container-type: inline-size` on itself, so the header and views
respond to the shell's own width rather than the viewport — it behaves the same
in a side panel as it does full-screen. It declares `flex: 1 1 auto`, so inside
a flex column it grows to the available height rather than collapsing to its
content; give its container a height and the shell fills it.

## No build step

`dist/` is plain ES modules and one plain stylesheet, so a static page can use
the shell with nothing installed and nothing compiled. Name the artifacts in an
import map and load them:

```html
<link rel="stylesheet" href="/vendor/themes/tokens.css" />
<link rel="stylesheet" href="/vendor/menu-bar/style.css" />
<link rel="stylesheet" href="/dist/style.css" />

<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.runtime.esm-browser.prod.js",
      "menu-bar": "/vendor/menu-bar/index.js",
      "appfr": "/dist/index.js",
      "appfr/fixtures": "/dist/fixtures.js"
    }
  }
</script>

<script type="module">
  import { createApp, h } from 'vue'
  import { DataShell } from 'appfr'
  import { iRadarSchema } from 'appfr/fixtures'

  createApp(() => h(DataShell, { schema: iRadarSchema })).mount('#app')
</script>
```

`vue` and `menu-bar` are the only bare specifiers the bundle itself imports, and
the runtime build of Vue is enough — the shell's own templates are compiled
already.

### The host's components, compiled in the browser

Render functions get tiresome fast. [vue3-sfc-loader][sfc-loader] compiles
`.vue` files in the tab, so the host can be written as SFCs and served as
source — `<script setup>`, scoped styles, relative imports between them, and
the same bare imports of the shell you would write against a bundler:

```js
const options = {
  // What the loader must not go and fetch. The shell has to be handed the very
  // Vue the page is running, not a second copy of it.
  moduleCache: { vue: Vue, appfr: shell },

  async getFile(url) {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${response.status} ${url}`)
    const text = await response.text()
    return { getContentData: () => text }
  },

  addStyle(css) {
    document.head.append(Object.assign(document.createElement('style'), { textContent: css }))
  },

  // A bare specifier is a module name, so it goes to `moduleCache` above; the
  // rest resolve as URLs. The loader's own default joins them as strings, which
  // folds `http://` down to `http:/`.
  pathResolve({ refPath, relPath }) {
    if (relPath === '.') return refPath
    if (!relPath.startsWith('.') && !relPath.startsWith('/')) return relPath
    return new URL(relPath, refPath ?? document.baseURI).href
  },
}

createApp(await loadModule('/App.vue', options)).mount('#app')
```

A working page is in [`stories/no-build/`](stories/no-build): one `index.html`,
and a host written as SFCs of its own — `App.vue`, which mounts the shell, and
`OpenedRow.vue`, which it imports.

The page checks itself — the artifacts import, the SFCs compile after load, the
host mounts with content, the stylesheets apply — and states the verdict across
the top. The **No Build** stories frame it, `MissingStylesheet` among them,
which removes the stylesheets so you can watch the checks fail.

[sfc-loader]: https://github.com/FranckFreiburger/vue3-sfc-loader

## Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['appfr/nuxt'],
})
```

Auto-imports the components, adds the stylesheets, and — the part worth having —
registers a plugin that routes shell queries through Nuxt's router, so no page
needs its own adapter wiring. Options under the `dataShell` key: `prefix`,
`css`, `router`.

## Development

```bash
npm install
npm run typecheck      # vue-tsc
npm run test:unit      # Vitest — codec, expression, mock source, query state, routing
npm run test:e2e       # Playwright in Chrome Beta, against the real stories
npm run test           # both
npm run storybook      # http://localhost:6011
npm run build          # dist/ + declarations
```

Two test layers, deliberately split:

- **Vitest** covers the pure logic — URL round-trips, the expression evaluator,
  facet filtering and sorting, and the query-state mutations. Fast, no DOM.
- **Playwright** covers the component, driving the real Storybook stories in
  Chrome Beta. Behaviour that only exists in a browser is tested where it
  exists: focus return, stacking and click interception, container queries,
  computed styles, and — importantly — the real address bar across reload,
  Back and Forward.

The **No Build** stories stand apart from both: they load `dist/` over HTTP into
a page of their own, so what they cover is the *built* artifacts rather than the
source. Run `npm run build` first, or they are testing the build before this one.

Storybook runs on **6011** rather than the default 6006, so it does not collide
with another project's server on the same machine.

### Releasing

There is no registry in the middle: a consumer names a tag of this repository
and gets `dist/` out of the tarball, which is why `dist/` is committed. So a
release is a tag, and `npm version` cuts it; `npm run release` publishes it:

```bash
git commit -m 'What changed'   # the work, without dist/
npm version minor              # lint, typecheck, build, test, commit, tag
npm run release                # git push origin main --follow-tags
```

`npm version` refuses a dirty tree, which is the point — the change lands as its
own commit first, and `Release vX.Y.Z` stays a version bump and the artifacts it
implies. Two hooks do the rest:

| Hook | Does |
| --- | --- |
| `preversion` | lint, typecheck, `build`, then `test`. Building before testing is what lets the No Build stories cover *this* build rather than the last one. |
| `version` | builds again and stages `dist/`, so the artifacts ride in the version commit rather than trailing it |

Anything red stops it before the version is written, and nothing needs undoing.
The push is deliberately not a hook: everything up to it is local and can be
undone with a `git reset` and `git tag -d`, and the push is the one step that
cannot — so it is its own command, run on purpose. A consumer can only name
the tag once it is on the remote.

Versions are pre-1.0 and the minor is where breaking goes, so `minor` is the
usual argument and `patch` is for a fix that changes nothing a host is holding.

CI runs the same checks on every push and, because a stale `dist/` is invisible
in review, rebuilds and fails if what is committed is not what `src/` builds.
