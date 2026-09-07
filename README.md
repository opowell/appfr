# header-content-layout

A query header over a switchable content area, for data-heavy screens.

The header states what the current query is. Clicking it opens the expanded
query view. The content area shows the matching items in the chosen view and
sort order. **The query lives in the URL**, so every state the shell can be in
is a link someone can paste, bookmark, or reload into.

It is schema-driven: one `DomainSchema` describes the entities, their facets,
what their fields are called, and what the columns of each one's table are. The
same header, panel and six views serve any schema: swapping the schema swaps
the vocabulary, not the component.

For screens that are several things at once there is a second component:
[`<WindowFrame>`](#windows) arranges panels in a recursively split grid, tabbed
or floating where you want them, with a table of items — views and all — being
one thing a panel can hold. [`<MenuBar>`](#menus) is the application menu
over the top of it.

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
┌── Searches      38 ──┐ ┌── Items      9,988 ──┐ ┌── Scrapers      24 ──┐
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

A card's header filters the results to that type; a row opens that record.
`previewsPerType` sets how many rows each card shows (default 3), and each card
is queried on its own, so a quiet type still shows its latest rather than being
crowded out of a global top-N.

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
other five views always show the records themselves, mixed kinds and all.

An expression works across the whole corpus too. Searching from home narrows
every card at once and turns each card's count into how many of that type
matched — so the home screen doubles as a breakdown by kind. `entity:logs`
narrows by kind without leaving home.

A host that would rather open on one entity's list can say so:

```vue
<DataShell :schema="schema" :defaults="{ landing: 'entity', entity: 'items', view: 'list' }" />
```

## Install

```bash
npm install header-content-layout
```

`vue` is a peer dependency. `vue-router` and `@nuxt/kit` are optional peers,
needed only for the router adapter and the Nuxt module.

## Quick start

```vue
<script setup lang="ts">
import { DataShell } from 'header-content-layout'
import { iRadarSchema } from 'header-content-layout/fixtures'
import type { ShellRow } from 'header-content-layout'
import 'header-content-layout/style.css'

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
import type { DataSource } from 'header-content-layout'

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
import type { StreamingDataSource } from 'header-content-layout'

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
import { createVueRouterAdapter, ROUTE_ADAPTER_KEY } from 'header-content-layout'
import { useRouter } from 'vue-router'

// Per shell…
const route = createVueRouterAdapter(useRouter())
// …or app-wide, and every shell picks it up.
app.provide(ROUTE_ADAPTER_KEY, route)
```

### What the URL looks like

```
                                     ← home: nothing filtered, so no parameters
?e=items&v=table&s=metric1&d=asc&q=price+%3C+40&f_kind=page,pdf&f_rank=20..80&f_seen=1&p=3
```

| Key | Meaning |
| --- | --- |
| `e` | entity filter. Absent means every entity — the home screen. `*` says so explicitly, which is only needed when the host lands on an entity by default |
| `v` | view — `list`, `cards`, `grid`, `table`, `links`, `preview`. `cards` at home means a card per type; scoped to an entity it means a card per record |
| `s` | sort field |
| `d` | direction — `asc`, `desc` |
| `q` | expression |
| `f_<facet>` | a facet: `a,b` for chips, `min..max` for ranges (either end may be empty), `1` for toggles. Only meaningful alongside an `e`, since facets belong to an entity |
| `p` | page, 1-based. Absent means the first one. A page of `limit` rows — see [paging](#paging-through-the-results) |

Three things this does on purpose:

- **Anything at its default is omitted**, so a plain view has a clean URL.
- **Parameters the shell does not own are preserved.** Your own `?tab=audit`
  survives every query change.
- **Unparseable input degrades rather than throws.** An unknown entity, view,
  sort or facet value falls back to the schema's default, and range bounds are
  clamped, so a hand-edited URL cannot reach an unrenderable state.

Changing the entity, view, sort, committed expression or page **pushes** a
history entry — those are destinations worth coming back to. Nudging a facet
**replaces**, because one entry per chip click makes the back button useless.
Both are configurable via `navigationMode` and `facetNavigationMode`.

## Schemas

```ts
import type { DomainSchema } from 'header-content-layout'

const schema: DomainSchema = {
  key: 'iRadar',
  label: 'iRadar',
  kicker: 'Web monitoring',
  placeholder: 'site:*.shop AND price < 40 AND seen:false',
  entities: [
    {
      key: 'items',
      label: 'Items',
      count: '9,988',
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

Four worked examples ship in `header-content-layout/fixtures`: `iRadarSchema`,
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
    // No label: a column of pictures says what it is.
    { key: 'image', kind: 'image', width: '56px', height: '28px' },
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

**Roles** are how the other five views read a column set. A card, a tile, a
link row and a preview pane are an identity, a reference, a number or two and a
mark — never a list of columns — so they ask for those parts by name:

| Role | Read by |
| --- | --- |
| `identity` | every view, as the record's name; the drill and pin labels |
| `reference` | the line under it in the list, cards, links, grid and preview |
| `metric` | the numbers on a list row (first two), a card (first two), a home-screen preview row (first one), and every one of them in the preview pane |
| `state` | the pill |
| `updated` | the date on a card, a home-screen row and the preview pane |
| `tint` | the grid tile's background and the preview pane's banner — never drawn as a cell, so the table leaves it out |

A column with no role is a column and nothing else: it is in the table and
nowhere else, which is what most columns are. A role nothing plays is a part
those views leave out — no state column, no pill.

| | |
| --- | --- |
| `key` | identifies the column, and is the field read when nothing else says |
| `label` | the header. A column whose content says what it is leaves it out |
| `kind` | `text` (the default), `number`, `date`, `status`, `image`, `ordinal`, `component` |
| `field` / `value` / `format` | where the value comes from and how it reads |
| `width` / `height` / `align` / `mono` / `muted` / `truncate` | how it is drawn |
| `sort` | the `SortDef` key this header sorts by |
| `activate` / `click` / `drill` / `scope` | what pressing it does |
| `when` | `always`, or only in one of the two scopes |
| `hideBelow` | the container width it stands down at |
| `component` | what a `component` cell renders |

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
same button the query panel's control is, and the sort is in the URL.

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

### A type you can make more of

`create` on an entity names what making a new one of it is called, and puts
that button at the foot of its card on the home screen:

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
| its **name** | opens the record — `activate(row)`, as everywhere else |
| its **metric** | narrows to what its column's `drill` counts: `12` under *Tests* means "show me those twelve" |
| the **→** beside it | narrows to the record itself without picking a type, so every card reports what it holds of it |

Unlike `activate` and `create`, the shell **applies** this one. Those two are
reported and left because the shell has no router and makes nothing; narrowing
is a query change, and the query is the shell's own. The term lands in the
expression field as an ordinary one — visible in the summary, editable, in the
URL, and back-buttonable. A `drill(row, entity)` event still goes out for a
host that wants to follow it; `entity` is null when the → was pressed.

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

Two helpers are exported for a host building its own context or its own
results area, and they are the whole of what applying a drill takes:

```ts
import { drillExpression, scopedEntity, scopeTermFor } from 'header-content-layout'

scopeTermFor(schema, row)              // 'host:"www.example.com"', or null
drillExpression(schema, query, row)    // the expression with that term added
scopedEntity(schema, 'host')           // the entity `host` points at — the inverse
```

A scope key beats a column heading of the same name in the expression field: an
entity heading its identity column *Category* and carrying a `category` join
key means the key. The generic names — `name`, `ref`, `status`, `updated`,
`metric1`… — are a fallback rather than a reservation, so a schema
with a field of that name means its own; only `entity` stays the shell's, so
that any corpus can be narrowed by kind.

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
bare word matches the identity and reference columns; `*` is a wildcard.
`field:value` and `field<op>number` resolve in this order: `entity`, then a
field the row actually carries, then a column by key or heading, then a facet
by heading, then the generic role names (`name`, `ref`, `status`, `updated`,
`metric1`…). So a declared field is never shadowed by a heading or a
convention that happens to read the same. An unrecognised field is ignored
rather than treated as a mismatch, so a half-typed expression keeps showing
results.

A term against a multi-valued facet is satisfied by any one of the row's
values, so `region:eu` keeps a tenant that runs in `eu` and `us` both. A
numeric comparison against one constrains nothing.

`entity:` is what makes kind filterable from the expression alone —
`entity:logs` from home narrows to logs without leaving the whole-corpus view.

### The parts of a query

The header shows a query as the parts it is made of — the entity filter, how
the results are drawn, each active facet, and each term of the expression.
Press a pill and that part comes out; the rest goes on running.

```
[Items · 412 ▾] [List ▾] [year>=1988] [release] or [recall]
                          ^ press: that constraint is gone
```

Two of those parts are choices rather than pills, and neither spends a word of
the bar saying what it is — what each of them holds says that already. The
entity is the first, because the useful move from one type is almost always
another type. It lists every entity the schema declares with `Everything` at
the top, so widening back out is still one press — it is simply not the only
thing on offer. And it is in the bar whether or not anything is filtered: a
query is about something even when that something is everything, so the whole
corpus is a scope like any other rather than the absence of one.

The view is the second, and it is on the bar for the same reason: how the
results are drawn is a part of the query, in the URL with the rest of it, so it
is a choice you make where the query is rather than one you go into the panel
for. The ordering stays in the panel — it is the one part of a query that
already has a control on the results themselves, in the table's own headings.

It says how many, too, because what is being listed and how much of it there is
are one question. Each type carries the population the schema publishes —
`Items · 9,988` — and the type in force says what actually matched the moment a
facet or an expression narrows it, since the population is then no longer what
is on screen. `Everything` carries a count only while it is what is being
listed: the corpus population is the one number no schema publishes, so what
stands there is the size of the result the shell asked for. Both halves of that
label are counts in one control, so the live ones are formatted the way a
schema is expected to publish `count` — `formatCount`, exported, so a host has
the same one rather than a near miss.

The whole bar is the panel's toggle, query and all: press it anywhere and the
panel opens, except on a part — a part is a control of its own and pressing it
lifts that constraint. The chevron at the end is what carries this for anyone
not using a pointer, because a surface is nothing a keyboard can reach.

`OR` groups are alternatives rather than requirements, so the bar says `or`
between them, and lifting the last term of one drops that alternative with it.

A part whose field is some entity's `scope` names a *record* rather than a
value, and an id is a join key rather than something anyone recognises. So the
header looks that record up and says which one it is, keeping the id it was
written with:

```
set:"sets_10007"      as written by a drill, and as it stays in the URL
set:Yellow Castle (sets_10007)      as the header reads it back
```

The lookup is the drill's own term run back against the type it points at —
one query, cached for as long as the shell is up — so a source that already
answers `set:"sets_10007"` needs nothing new to be readable. It does not name
what that query *returns*, though: nothing in this language matches exactly, so
`set:"sets_1000"` is true of `sets_10007` as well, and the record is the row
that **has** the id rather than the first row back. A window of rows is what
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
always quotes and a rewrite quotes only where it has to, so `host:"a.example"`
and `host:a.example` are the same constraint written twice. Drilling into a
record after lifting any other part of the query adds nothing the second time.

A query too long for the bar scrolls rather than wraps, and the row hides its
scrollbar — so the edge with parts behind it is faded, and the row says which
in `data-dc-more` (`start`, `end`, `both`, or empty). It is measured from the
rendered row rather than driven by a scroll timeline: a timeline leaves its end
state applied once the row stops overflowing, which is what lifting a part
does, and the fade would then sit over the label for good.

### The field it is edited in

The panel edits that same expression as a field of parts. A `field:value` term
is a whole constraint on its own — and most of them were written by a drill
rather than typed — so each one stands in the field as a part that comes out
when it is pressed, while the box beside them is left for what a person writes:
the words to look for, or the next term to add.

```
Expression   [set:sets_10007] [year>=1988] | brick                  |
                    ^ press: that part is gone
```

Committing is what turns a typed term into a part: `set:sets_10007 brick` comes
back as one part and one word, because that is what it is made of. The parts
commit as they are pressed and the box is a draft until Run or Enter — so
lifting a part beside half-typed text leaves that text where it is, still
waiting. Backspace in an empty box lifts the part in front of it.

An expression with `OR` in it is the exception and stays in the box whole: its
terms depend on one another, and one of them lifted out of an alternative and
ANDed back on to the query is a different query. The header is where those come
out one at a time. `splitExpression` and `joinExpression` are exported for a
host writing a field of its own.

## Component API

### `<DataShell>`

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `schema` | `DomainSchema` | — | Required. |
| `source` | `DataSource` | mock over the schema | Where rows come from. |
| `route` | `RouteAdapter` | injected, else History API | How the query reaches the URL. |
| `defaults` | `ShellQueryDefaults` | home, `cards`, `updated`, `desc` | Fallbacks when the URL omits a field. `landing: 'entity'` opens on one entity's list instead of home. |
| `previewsPerType` | `number` | `3` | Rows inside each type's card on the home screen. |
| `limit` | `number` | `50` | Rows per page. The header offers the pages this divides the results into. |
| `views` | `ViewKind[]` | all six | Restricts the offered views. A URL naming one that is not on the list renders the first that is, so an old link cannot reach a view the panel has no way back from. |
| `accent` | `string` | — | Overrides `--dc-accent`. Shorthand for `tokens`. |
| `tokens` | `Record<string, string>` | — | Design tokens set on the shell element, e.g. `{ '--dc-surface': '#101418' }`. |
| `theme` | `'minimal' \| 'mono-size' \| 'dark' \| 'light' \| 'auto' \| 'macos' \| 'windows' \| 'inherit'` | `'minimal'` | `minimal` is paper, ink and hairlines with nothing else on — the values the layout stops working without and no more; `mono-size` is that theme with its type scale collapsed too, every word at one size and one weight with only colour and opacity varying; `auto` follows the system setting; `macos` and `windows` wear that system's design language and follow its scheme; `inherit` brings no palette at all. |
| `matchWidth` | `'grow' \| 'shrink'` | `'grow'` | How the header bar and the query panel are brought to one width: `grow` widens the panel to the bar, `shrink` narrows the bar to the panel. |
| `headAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Where the narrowed pair sits across the shell. `shrink` only. |
| `pinnable` | `boolean` | `false` | Offers the star affordance on rows. |
| `open` | `boolean` | — | `v-model:open` to control the panel; omit and the shell holds it. |
| `pinned` | `string[]` | — | `v-model:pinned` to control pinning; omit and the shell holds it. |
| `navigationMode` | `'push' \| 'replace'` | `'push'` | For entity, view, sort and expression. |
| `facetNavigationMode` | `'push' \| 'replace'` | `'replace'` | For individual facet edits. |

**Events** — `activate(row)` when a row is opened, `create(entity)` when a
card's create button is pressed, `drill(row, entity)` when a row is narrowed to
(already applied), `query-change(query)` after the URL has been
updated, `toggle-pin(row)`, plus `update:open` and `update:pinned`.

**Slots** — `actions` for extra controls at the right of the header bar,
`panel-section` for a section of your own at the end of the query panel, and
`results` to replace the content area entirely (receives `rows` — the current
page of them — plus `total`, `offset`, `pageCount`, `query` and `pending`).

`panel-section` is where an application's own commands go when they are not
about the query — the header bar's width belongs to the summary it exists to
show, and it is trimmed before its actions are. The shell renders the section
element, so it sits flush with Query, View and Entities above it and takes the
divider between them; the content is yours, and `dc-eyebrow` is there for a
heading that matches theirs:

```vue
<DataShell :schema="schema">
  <template #panel-section>
    <header class="app-head">
      <span class="dc-eyebrow">App</span>
    </header>
    <button type="button" @click="reload">Reload data</button>
  </template>
</DataShell>
```

### One width for the bar and the panel

The panel drops from the bar and says what the bar summarizes, so the two are
always the same width. Which of them gives way is `matchWidth`:

```
match-width="grow" — the panel widens to the bar
┌──────────────────────────────────────────────────────┐
│ ◆ iRadar │ [Everything · 240 ▾] [Cards ▾]           ▲ │
├──────────────────────────────────────────────────────┤
│ Query · View · Entities                              │
└──────────────────────────────────────────────────────┘
  01  Competitor pricing pages          909  running

match-width="shrink" — the bar comes in to the panel
        ┌──────────────────────────────────────┐
        │ ◆ iRadar │ [Everything · 240 ▾] ▲ │
        ├──────────────────────────────────────┤
        │ Query · View · Entities              │
        └──────────────────────────────────────┘
  01  Competitor pricing pages          909  running
```

`grow` widens the panel to the bar, which spans the shell. `shrink` narrows the
bar to the panel instead — to `--dc-header-width`, 1220px — which keeps a query
off the far edges of a very wide screen; the results below keep the shell's
full width either way. `headAlign` (`left`, `center`, `right`) then says where
that narrowed pair sits, and is the one prop `grow` has nothing to do with.

```vue
<DataShell :schema="schema" match-width="shrink" head-align="left" />
```

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

Four things this does on purpose:

- **The control is only there when there is somewhere to go.** One page of
  results says nothing about pages; the home screen's type cards say nothing
  either, since each card runs its own query and stepping would move nothing.
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
  rather than pushing so Back does not lead straight to it again.

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

Below the widths it needs, columns stand down rather than crowd — each at the
container width its [`hideBelow`](#columns-of-your-own) names. In the default
set that is the metrics first, at the size the list view drops them too, then
the kind, which the query itself usually says, then the date. The name, the
secondary and the state are what is left, and they are what a row is for.

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

Also exported: `useResults` — which is what drives a source, streaming or not,
and hands back `rows`, `total`, `pageCount`, `pending`, `error` and `refresh` —
plus `useColumns` for the scope's column set, `usePresentedRows` for rows with
every role already resolved into `parts`, `useRecordNames` for the names behind
the ids a query narrows by, and `useShellContext`.

## Windows

Some screens are several things at once. `<WindowFrame>` arranges panels in a
grid you can nest as deep as you like, and — if you let it — rearrange by
dragging, the way an editor does.

```
┌───────────────────────────────┬──────────────────────────────┐
│ ⠿ Items  entity:items      ⋯ │ ⠿ Sources │Activity│ Log     │
│                               ├──────────────────────────────┤
│  01  Supplier directory   476 │  09:14:02 index rebuilt      │
│  02  Recall notice · rev 8 311│  09:14:44 scraper → 38 new   │
└───────────────────────────────┴──────────────────────────────┘
```

The arrangement is a tree. Every node is one of three things: a **split** — a
row or a column of further nodes — a **group**, one space shared by one or more
panels as tabs, or a **float**, a space its frames are placed over rather than
divide. Nesting a column inside a row is what makes an arbitrary grid
expressible without the component knowing anything about grids, and it means
the whole layout is data: it round-trips through JSON, can be stored per user,
and is the single thing a drag rewrites.

A lone panel is a group of one, so tabs are not a second thing the tree has to
describe — they are what a group of more than one looks like. A tab is usually
a panel; it can also be a whole space, which is what lets a desktop be tabbed
beside a pane without losing the windows on it (see **Tabs**).

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WindowFrame, group, panelNode, row } from 'header-content-layout'
import type { WindowNode, WindowPanelDef } from 'header-content-layout'

const panels: WindowPanelDef[] = [
  {
    id: 'items',
    title: 'Items',
    subtitle: 'entity:items',
    // Declaring views puts them under *View* in this panel's menu.
    views: [
      { key: 'table', label: 'Table' },
      { key: 'cards', label: 'Cards' },
    ],
  },
  { id: 'sources', title: 'Sources' },
  { id: 'activity', title: 'Activity', subtitle: 'live' },
  { id: 'log', title: 'Log' },
]

const layout = ref<WindowNode>(
  // `panelNode` is a group of one; `group` gives several panels one space.
  row([panelNode('items'), group(['sources', 'activity', 'log'], 'activity')], [0.62, 0.38]),
)
</script>

<template>
  <!-- Like the shell, the window fills the box it is given. -->
  <div style="height: 100vh">
    <WindowFrame v-model:layout="layout" :panels="panels" movable>
      <template #panel-items="{ view }">
        <ItemsTable :view="view" />
      </template>
      <template #panel-sources><SourceList /></template>
      <template #panel-activity><ActivityLog /></template>
      <template #panel-log><LogStream /></template>
    </WindowFrame>
  </div>
</template>
```

Leave `layout` out entirely and every panel goes in one row, which the first
drag replaces with a real tree.

### What a panel contains

Anything. A panel is a title, some optional chrome, and a slot:

| Slot | Renders |
| --- | --- |
| `panel-<id>` | that panel's content |
| `panel` | content for any panel without a slot of its own |
| `actions-<id>` | extra controls at the right of that panel's header |
| `actions` | the same, for any panel without one |

Each receives `panel`, `view` and `active`, so one generic `#panel` slot can
serve every panel by switching on `panel.id`.

Only the panel on top of its group is rendered. A panel that needs to keep
something across tab switches — a scroll position, a half-typed filter — holds
it outside the slot, in the store or composable the slot reads from.

### Tabs

`group(['sources', 'activity', 'log'], 'activity')` puts three panels in one
space and shows the third; a third argument names that space, which the strip
then says in front of its tabs. The strip is an ARIA tablist: click a tab, or use
the arrow keys and Home/End, and the header's menu follows whichever panel is
on top. Which tab that is lives in the tree, so it is persisted and
restored with everything else.

A group of one has no tabs to switch between, so it does not draw any: it shows
the panel's title and subtitle, exactly as a window with no tabs anywhere
always did.

Dragging is how a group gains and loses tabs — the middle of a pane, or its
strip, joins it; an edge splits back out (see below).

**A tab can be a space.** `Tabs` is one of the four ways of showing a space,
and the other three all keep every pane that space holds: shown as a column, a
row is the same panes running the other way; shown as a desktop, the same
panes placed rather than dividing. So the panes of a space stop dividing it and share
one strip — and a **desktop** among them shares the strip whole, as one tab
named `Desktop`, because where each of its windows sits is something a user put
there rather than an arrangement the space was merely being drawn in.

```ts
group(['items', float(frames)])   // two tabs: Items, and the desktop
```

```
┌─────────┬───────────────┐        ┌──────────────────────── ⋯ ─┐
│         │  ┌────────┐   │  Tabs  │ Items │ Desktop │          │
│  items  │  │  log   │   │  ───▶  ├────────────────────────────┤
│         │  └────────┘   │        │  the desktop, its windows  │
└─────────┴───────────────┘        │  exactly where they were   │
  row(items, desktop)              └────────────────────────────┘
```

The strip is that space's only bar while its tab is on top, so it is that
space's bar: it says the space's name, and the menu on it is the space's own
four choices — the same thing a floating window's title bar does for a space
inside it. Choosing `Row` there tiles the desktop *within* its tab; choosing
`Tabs` empties it into the strip, which is the one way its windows become tabs
beside the panes. Everything else inside the tab belongs to the space: its
windows still move, resize, maximize and take drops, and a panel dropped on its
bare desktop becomes a window there.

Panes are only ever an arrangement of the space they are in, so they flatten
however deep they were — a row holding a column of panes is one strip of all of
them. The two splits that are spaces in their own right are not: one that
remembers the desktop it was tiled from carries the way back in its `places`,
and one the host named, or drew `headless` or `fixedView`, has said something
about *that* bar. Each becomes a tab, like a desktop.

A space tab is not a panel, so it is not dragged out of the strip and has no
close: what closes is a panel, and closing the last panel of a space is what
takes its tab away. A strip left holding one space is that space, exactly as a
split of one child is that child.

### Floating windows

A **float** is the third kind of node: its children are not divided out of a
space, they are placed over it. Each frame carries its own position and size,
and their order is a stacking order — the last one is on top.

```
┌─ Desktop ──────────────────────────────── ⋯ ─┐
│  ┌── Items ─────────────┐                    │
│  │ 01  Supplier direct… │── Activity ──────┐ │
│  │ 02  Recall notice  ─┼┤ 09:14:02 index   │ │
│  └─────────────────────┘│ 09:14:44 scraper │ │
│                         └──────────────────┘ │
└──────────────────────────────────────────────┘
```

The desktop is a **panel** in its own right: the same border and header a pane
has, because it is the same kind of thing — [a space that holds
panels](#spaces-and-the-menu-on-them). Its bar is where its menu is, and it
says `Desktop` unless the float is given a `title` of its own. A float has no
tab to take a name from, and the window in front of it is the wrong one to
borrow: it changes every time one is touched.

```ts
import { cascade, float, frame, group, panelNode } from 'header-content-layout'

const layout = ref<WindowNode>(
  float(
    [
      frame(panelNode('items'), { x: 24, y: 24, w: 460, h: 300 }),
      // A frame holds whatever a node can hold — tabs, or a grid of its own.
      frame(group(['sources', 'log']), { x: 300, y: 150, w: 380, h: 260 }),
    ],
    'Workspace', // what its title bar says; `Desktop` when left out
  ),
)

// Or, for a desktop written as what is on it rather than as coordinates:
const stepped = cascade([panelNode('items'), panelNode('sources')], { w: 420, h: 260 })
```

`frame` fills in anything it is not told from `DEFAULT_FRAME`, so a position or
a size alone is enough.

With `movable`, a window drags by its title bar — the part of the tab strip
that is not a tab. With `resizable`, it resizes from any of its eight edges and
corners: the dragged edge follows the pointer and the opposite one stays put.
Both keep the window inside the space it floats over and no smaller than
`minPanelSize`, and Escape mid-drag puts it back. Touching a window anywhere
brings it to the front.

The keyboard gets there too, through the same grip a tiled pane has:

| Key | In a floating window |
| --- | --- |
| an arrow | moves the window 16px that way |
| shift and an arrow | resizes it from the bottom-right corner |
| Escape | puts it down |

A window holding a single group takes its title from the tab on top. One
holding a *grid* has no such tab, so it gets a title bar of its own — which is
also the unambiguous place to take hold of it. What that bar says comes from
`nodeTitle`: a group is named after the tab on top, a split after its first
pane, a float after the window in front. A frame can override it with a `title`
of its own.

### Maximizing

A window fills its float from the button in its title bar or from a
double-click on that bar, and goes back the same two ways. Neither is in a
menu: both are buttons in the very header a menu would open from.

The rect is never overwritten while a window is maximized: it *is* the place it
restores to. So the whole state is one flag in the layout, it survives being
stored and read back, and there is nothing to remember on the side.

```ts
const maxed = maximizeFrame(layout, 'items')   // fills its float
isMaximized(frameOf(maxed, 'items')!)          // true
maximizeFrame(maxed, 'items', false)           // exactly the frame it was
toggleMaximized(layout, 'items')               // whichever it is not
```

Maximizing raises the window too, since one filling its float has to be in
front of what it covers. While it is maximized it offers no resize grips and
will not be dragged — there is nowhere for it to go, and a drag that did
nothing would be worse than one that is not offered. The arrow keys say so
rather than moving it.

`frame-maximize({ panel, maximized })` is emitted either way.

### Minimizing

A window rolls up to its title bar and docks along the bottom of its float —
there is no taskbar, because the bar it rolls up to *is* what you unroll it
from.

```
┌──────────────────────────────────────────────┐
│              ┌── Activity ───────┐           │
│              │ 09:14:02  index   │           │
│              └───────────────────┘           │
│  ┌─ Items ─────── — ▢ ┐┌─ Sources ── — ▢ ┐   │
└──┴────────────────────┴┴─────────────────┴───┘
```

Rolled-up windows sit left to right in the stable order the float renders in —
so raising one moves it up the stack without shuffling the dock — and wrap onto
a second row when they run out of width.

Like maximizing, it leaves the rect alone, so unrolling puts the window back
exactly where it was. The two are exclusive: a window is filling its float, or
rolled up out of the way, or neither, and asking for one clears the other.

```ts
minimizeFrame(layout, 'items')          // rolled up
toggleMinimized(layout, 'items')        // whichever it is not
isMinimized(frameOf(layout, 'items')!)
```

Every window grows a title bar while it is rolled up, since the tab strip that
would otherwise have been its title has rolled away with the rest — and that
bar carries the buttons to unroll it, maximize it, and close it. What rolled
away stays in the DOM, so a window comes back with its scroll position and
whatever else the host put in it.

`frame-minimize({ panel, minimized })` is emitted either way.

Raising a window keeps everything inside it — scroll positions, open menus,
whatever the host rendered. The stack is `z-index` over a render order that
never changes, rather than a DOM order that matches it.

Because a float is a node, floating and tiled arrangements mix: put one in a
split and half the window tiles while the other half is a desktop. Dragging a
window's *tab* out onto a tiled pane docks it into the grid; dragging a tiled
panel onto a window tabs it in. An edge drop inside a window splits that
window, which keeps its place on the desktop.

Dropping a panel on a float's **bare desktop** — anywhere no window covers —
makes it a window of its own, which is the fifth thing a drop can mean:

| Dropped on | Result |
| --- | --- |
| an edge of a pane | splits that pane and takes half of it |
| the middle of a pane | joins that pane as a tab, on top |
| a tab strip | joins it at that position in the strip |
| bare desktop | becomes a floating window there |
| a space with nothing in it | fills it — a window on a desktop, the one pane in a row or a column |

That is how a panel becomes floating without the host rewriting the layout:
drag a tab out of a window and drop it on the desktop beside it, and it keeps
the size of the window it came from. A tiled panel dropped there floats too.
Holding **Alt** mid-drag leaves this as the only drop there is, which is what
moves a window about its desktop without it docking into whatever it passes
over — see [Moving panels](#moving-panels).
The pure operation behind it is `floatPanel(layout, panel, near, rect)`, where
`near` is any panel already on the float — a drop names the desktop by
something on it. A desktop with *nothing* on it has nothing to be named by, so
that drop names the space by where it is instead: `dropIntoSpace(layout, panel,
path, rect?)` — see [a space with nothing in it](#a-space-with-nothing-in-it).

A float has to exist for there to be a desktop to drop on: a host supplies one
in the layout, or builds one with the exported operations. The panel menu that
would switch a pane into a float from nothing is not built yet.

### Spaces, and the menu on them

A node that holds panels is a **panel itself**: a row, a column and a desktop
each draw the same border and the same header a pane does, with a title bar
saying what the space is and a menu of its own on it.

```
┌─ Row ─────────────────────────────────────────────────── ⋯ ─┐
│ ┌─ Items  entity:items ────── ⋯ ─┐┌─ Column ───────── ⋯ ─┐  │
│ │  01  Supplier directory    476 ││ ┌─ Sources ───────┐  │  │
│ │  02  Recall notice · rev 8 311 ││ ├─ Activity ──────┤  │  │
│ └────────────────────────────────┘└──────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

That menu is the one appfr called *display*: how this space shows what is in
it. The four choices are the menu itself rather than an item that opens them —
short enough to read at a glance, and nothing in front of any one of them.

| Shown as | What it does |
| --- | --- |
| Row | the panes in this space run across |
| Column | they run down |
| Tabs | they stop dividing the space and share it — a desktop among them as one tab of its own |
| Desktop | they float over it instead, on a desktop of their own |

Whichever is already true is ticked, and that tick is the whole of the answer:
none of the four is ever hidden, and none of them is ever greyed out. A display
mode greyed out reads as one the space is not allowed to be shown in, which is
the opposite of what a ticked one says — so all four stay where they are, and
choosing one that is already true does nothing.

**A pane of host content offers none of this.** What is in it is content, not
panels, so it has nothing to arrange and nothing to say about the space around
it — that space has a bar of its own to say it from. A pane with **tabs** is
the exception, and not really an exception: a strip of tabs *is* a container of
panels, so its menu is about the tabs in it.

A space held by a floating window draws no second bar inside it: the window's
own title bar is that space's, menu and all.

**A window is named by where it is.** A pane names the frame it is in with a
panel of its own, and the innermost frame holding that panel is the answer — a
float nested inside a frame owns the panels on it more closely than the frame
around them does. A window holding a *desktop* cannot speak that way: every
panel on that desktop is a panel of the window too, so a panel would name one of
the windows inside it, and dragging the bar would move one of them instead. Its
own chrome says where it is — the path it was rendered at, exactly as a space's
bar does for its menu. `frameAt`, `setFrameRectAt`, `maximizeFrameAt`,
`minimizeFrameAt` and `raiseFrameAt` are the path-addressed operations behind
it; `framePathOf` turns a panel into the path of the frame it names, and
`raisedPath` says where a path lands once that frame has been raised, since
raising one is what moves it in the list a path indexes.

Maximize, minimize and close are buttons rather than menu items, for the same
reason: each would sit in a menu opened from the header the button is already
in. With those gone a pane of host content has nothing left to put in a menu
but the views its panel declares — and one that declares none shows no menu
button at all, which is the point: a button that opens nothing but what is next
to it is worse than none.

The three sit together in a group of their own — `.dc-controls`, each button
`.dc-control` — written in one order and drawn wherever the theme wants them.
The marks inside are SVG paths on a shared grid rather than characters, so
their weight does not follow whatever typeface the theme is wearing. That is
what lets `theme="macos"` put traffic lights at the left of the bar, in the
order a Mac uses, and `theme="windows"` run flat buttons into the top right
corner — out of exactly the same markup.

**Every panel sits in a space, the last one included.** A split of one child is
collapsed into that child everywhere else in the model — so an ordinary row is
a lone pane as soon as everything but the last panel has been closed, and that
pane would have nowhere left to be told to float from. `rootSpace` is the one
exception: a lone pane at the root of the layout keeps a row of one around it.
A group of *tabs* is a space already and is left exactly as it is.

```ts
rootSpace(panelNode('items'))       // row([panelNode('items')])
rootSpace(group(['a', 'b']))        // the group it was given, untouched
```

On a space of one pane, "Row", "Column" and "Tabs" all describe what is already
on screen — which is exactly why none of them greys out. Three of the four
going dim at once would read as a menu with one choice left in it, while every
one of the four was perfectly true of that space; the tick says which, and
"Desktop" is the only one that moves anything.

What a space is called is `Row`, `Column` or `Desktop` — how it is shown, which
is what the menu beside the name switches between — unless the node carries a
`title` of its own:

```ts
row([panelNode('items'), sidebar], [0.6, 0.4], 'Workspace')
float(frames, 'Workspace')
group(['sources', 'activity'], undefined, 'Workspace')
```

A name is something said about *that* space, so a named one is kept whole: it
is neither flattened into a space of the same direction around it nor collapsed
into its only child, the way `headless` and `fixedView` are kept. Otherwise a
name would hold only while the shape happened to stay distinguishable from its
parent's — one pane dragged out of `Workspace` and the space would be gone,
name and bar and all, with nothing on screen to say why.

#### A space with nothing in it

Down to the last pane. Drag everything out of a named space and the space is
still there: an empty desktop, or an empty row, with its name on its bar and
its share of the room around it. A space the host named is a place rather than
a container, so it outlives what was in it — and a name that lasted exactly as
long as the last pane in it would be the same disappearing act one step later.

The way back is the other half of that. A drop into a space holding nothing has
no panel there to land against, so it names the space by the path it is
rendered at:

```ts
dropIntoSpace(layout, 'notes', [1])                        // the one pane of a row or column
dropIntoSpace(layout, 'notes', [1], { x: 24, y: 24, w: 320, h: 240 })  // a window on a desktop
```

The drag does it for you — carry a panel over an empty space and the whole of
it lights up, there being no edge in it to land on one side of. `removePanel`
and `normalizeLayout` both keep the space, so a layout that round-trips through
storage comes back with it.

A **strip** is the one shape this does not apply to: what says a strip's name
is its tabs, so a strip with none has no bar left to say anything on and
nothing to drop into. An empty group goes, as it always did — which makes
"Tabs" the one of the four an empty space cannot be shown in, so choosing it
leaves the space as it was rather than taking it away.

**And it survives all four shapes.** A row, a column and a desktop each draw a
header of their own to say the name on; a strip has none — its tabs already say
what is on it — so a named strip says the name in front of them, with a rule
between the two. Without that, "Tabs" would be the one of the four that lost
what the space was: the name first, and the space with it, since a space with
nothing said about it is dissolved into the one around it as soon as it is
spread back out.

```
┌─────────────────────────────────────────────────────────┐
│ Workspace │ Sources │ Activity │                    ⋯   │
├─────────────────────────────────────────────────────────┤
│  the tab on top                                         │
```

A strip carries `places` for the same reason a tiled row does: a desktop shown
as tabs and then as a desktop again puts every window back exactly where it
was. `space-names="false"` keeps the name out of the strip on a window too
narrow to spend width on it — the name is still in the layout, still what makes
that space a space of its own, and still said on the bar the moment it is shown
as a row, a column or a desktop.

Each of the four is a pure operation a host can call directly —
`setSplitDirection`, `collapseToTabs`, `toFloat`, `toTiled`, and `collapseSpace`
/ `tileFloat` / `floatSplit` for a space it already has in hand — so the same
four choices can come from a command palette or a keyboard shortcut instead. `:menu="false"`
takes them away, from a space's bar as well as a pane's; `paneMenu` extends
what a pane offers:

```vue
<WindowFrame
  :panels="panels"
  :pane-menu="(panel, items) => [...items, { separator: true }, { label: `Reload ${panel.title}`, action: () => reload(panel.id) }]"
/>
```

### A space inside a space

A space holding one space is a bar drawn twice. Both are spaces, so both say
what they are called and both offer the same four choices — about the same
panes, since the content under the two of them was only ever the inner one's.

```
┌─ Workspace ──────────────────────┐
│ ┌─ Column ─────────────────────┐ │
│ │ ┌─ Sources ────────────────┐ │ │
│ │ ├─ Activity ───────────────┤ │ │
│ │ └──────────────────────────┘ │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

That pair is the only nesting the model keeps: a split of one child is
collapsed into that child, and a strip whose only tab is a space into that
space, so one that is still there is one the host meant — a space with a name,
a space that draws no bar, or one that remembers the desktop it was tiled from,
each of which is something collapsing it would lose.

Which leaves one question, and the menu on **either** bar asks it: which of the
two stays.

| Item | What it does |
| --- | --- |
| Keep *Workspace* | the outer bar stays, and the content arrives under its name, in the shape the inner space was holding it |

Nothing moves. The panes are the same panes, in the same order, at the same
sizes — the choice is only which of the two bars they are left under, which is
the only thing the two spaces ever said separately.

Only ever the merge that keeps every name there was. Keeping *Column* here
would leave the column and take *Workspace* with the bar that goes, and a name
is the one thing a space is proof against losing everywhere else in the model —
so that item is not offered, and a pair with a name on **both** bars offers
neither and stays a pair. `mergeSpace` still takes either half: a host that
means to drop a name can say so.

The items are headed by *which* pair they are about — *Around Column* on the
outer bar, *Inside Workspace* on the inner one — because a space can be the
inside of one pair and the outside of another, and "keep this space" means a
different thing in each.

`mergeSpace` is the operation and `onlySpace` the pair it acts on, so the same
choice can come from a palette or a shortcut:

```ts
const pair = row([column([panelNode('sources'), panelNode('activity')])], undefined, 'Workspace')

onlySpace(pair)            // the column
mergeSpace(pair, 'outer')  // that column, named Workspace
mergeSpace(pair, 'inner')  // that column, exactly as it was

onlySpace(row([a, b]))     // null — more than one child is an arrangement
```

Neither half is ever a **desktop**: its frames are windows placed over the
space rather than dividing it, so a desktop holding one window is a desktop
with a window on it and not a bar drawn twice. Nor is a lone **pane**, which is
content under a header rather than a space — the same distinction `rootSpace`
draws. A strip of two or more tabs is a space in its own right and counts.

### A space that offers less

`:menu="false"` says it for the whole window. Two fields say it per space, and
they are fields on the *node*, so they are part of the layout: they round-trip
through JSON with everything else, and survive a drop, a close and a change of
shape.

**`fixedView`** takes away the choice of how a space is shown. On a row, a
column or a desktop that is those four choices, and they are the whole of a
space's menu, so its bar keeps the name and shows no button at all. On a pane
it is the views it declares — and they are the whole of that pane's menu, so
its button goes too; on a pane of tabs it is the four again, and the items
about the tabs stay.

```ts
import { fixedView, headless } from 'header-content-layout'

fixedView(row([panelNode('items'), sidebar])) // a row, and only ever a row
fixedView(panelNode('items'))                 // on one view, and no choice
fixedView(group(['sources', 'log']))          // tabs that stay tabs
```

**`headless`** takes the bar itself. Everything on it goes with it: the name,
the tabs, the `actions` slot, the menu — the choice of view, the items the
content registered and the window's own — the close, and, where that bar was a
floating window's, the maximize and minimize buttons and the handle the window
was dragged by.

```ts
headless(panelNode('items'))                  // content, and nothing around it
headless(row([panelNode('items'), sidebar]))  // a space that draws nothing
```

Neither withholds anything the host cannot then do itself, which is the only
reason to say either:

| What was on the bar | How to set it instead |
| --- | --- |
| the view | `v-model:views`, or the exposed `setView(panel, view)` |
| how the space is shown | `setSplitDirection`, `collapseToTabs`, `collapseSpace`, `toFloat`, `toTiled` on `v-model:layout` |
| maximize, minimize | the exposed `toggleMaximize(panel)`, `toggleMinimize(panel)` |
| which tab is on top | the exposed `select(panel)` |
| close | dropping the panel from `panels`, as ever |

A headless space is a space like any other underneath: a panel can still be
dropped on its edges, a floating one still resizes from its edges and comes
forward when it is touched, and what it says survives every operation that
rewrites it — a row drawn without a bar is still without one once it is a
desktop. Two things follow from taking the bar away rather than hiding part of
it. A headless pane has no handle, so only the host moves it; and a headless
window rolled up has nothing left to read, so the host that rolled it up is
what unrolls it.

Both compose, with each other and with the builders:

```ts
headless(fixedView(panelNode('items')))
```

### Items the content registers

Not everything that belongs in a pane's menu is the window's to know. How a
table is showing its rows is the table's business; the window has no name for
it, and the host would have to thread a menu prop through every panel it
declares to say so on its behalf. So the content says it itself:

```vue
<script setup lang="ts">
import { usePaneMenu, VIEW_KINDS } from 'header-content-layout'

const LABELS = { list: 'List', cards: 'Cards', grid: 'Grid', table: 'Table', links: 'Links', preview: 'Preview' }
const view = ref('table')

usePaneMenu(() => [
  {
    id: 'view-type',
    label: 'View type',
    items: VIEW_KINDS.map((kind) => ({
      id: `view-${kind}`,
      label: LABELS[kind],
      checked: view.value === kind,
      action: () => (view.value = kind),
    })),
  },
])
</script>
```

The items land in the menu of whichever panel this content is rendered in —
the pane says which, so nothing has to be handed an id it has no way to know —
and leave again when it does. On a pane of host content that declares no
`views` they are the *whole* menu, since the window contributes nothing else to
one; anywhere else they come above the window's own, because what someone
opened the menu for is far more often what is in the pane than the pane
itself. `:menu="false"` does not take
them away either way: they were never the window's to withhold.

`items` is read every time the menu is built, so a getter or a computed says
what is true at that moment — the tick beside the view actually showing, a
label that follows what is under it. Nothing is pushed back up when it
changes.

Called outside a window it does nothing rather than failing, which is what lets
a component offer menu items without that deciding where it may be rendered:
the same table serves a panel and a page.

This is the other half of the views a panel declares in `views`. A panel whose
views the *window* should own says so in its definition and gets them under
**View** in its menu; a panel whose content owns them registers an item
instead, and needs no `views` at all. Both at once is two items in one menu for
the same thing, which is worth avoiding.

### Closing panels

`closable` gives every panel a close button — one per tab in a tabbed pane,
since a tab that is not on top is otherwise unreachable. The button and nothing
else: a `Close` item would sit in a menu opened from the header the cross is
already in. A panel can opt in or out on its own with `closable` in its
definition.

Closing is a **request**. The window emits `panel-close` and does nothing else:
`panels` belongs to the host, so dropping the panel from it is what actually
removes it, after which the layout reconciles around the gap.

```vue
<WindowFrame
  :panels="panels"
  closable
  @panel-close="(id) => (panels = panels.filter((panel) => panel.id !== id))"
/>
```

### Making panels

The window never creates a panel either, for the same reason. Adding one to
`panels` is the whole of it:

```ts
panels.value = [...panels.value, { id: 'note-1', title: 'Note' }]
```

Where it lands is `reconcileLayout`'s doing: on a grid it is appended as a
pane, and on a desktop it opens as a window stepped clear of the last. Neither
needs the layout to be rewritten, and a `v-model:layout` that was persisted
before the panel existed still renders.

The **Workbench** story is this end to end — a menu bar that makes and closes
panels while the window rearranges around them.

### The views a panel declares

A panel that declares `views` offers them under **View** in its own menu, and
the chosen key is handed to its content slot. The window never interprets it —
which is what lets the same choice drive a table, a chart, or something it has
never heard of.

They are in the menu rather than beside the name for two reasons: a header
carrying a switcher as well as a name, a subtitle, tabs and its buttons spends
most of a narrow pane on chrome, and the views a panel's *content* offers with
[`usePaneMenu`](#items-the-content-registers) were menu items already — one
question with two shapes. A submenu rather than items on the menu itself,
because the four ways of showing a space are already there, and two flat groups
of ticked choices read as one list of eight.

**The menu says which is which by naming them.** A pane's menu is about two
things at once — the panel on top, and the tabs it is one of — so each group
sits under a heading: the panel's own title over its views, and what the tabs
are called over the four shapes and the two steps along them. A strip the
layout named says that name; one it did not is *These tabs*. A space's own menu
names its two the same way, a level up: the space over the four shapes, and the
strip it is a tab of over the steps. A menu with one thing to be about — a pane
of host content offering nothing but its views — is named nothing at all, since
naming the only group there is says nothing the items under it did not.

```vue
<WindowFrame :panels="panels" v-model:views="views" @view-change="remember" />
```

`views` is a map of panel id to view key; a panel not in it shows its
`defaultView`, or the first view it declares. A space marked
[`fixedView`](#a-space-that-offers-less) shows the view it was set to and
offers no choice of it, which is how a host keeps the choice for itself without
taking the views away.

Content that already owns its view — held in its own query, say — can offer the
choice in the pane's menu instead of declaring `views` at all. See [items the
content registers](#items-the-content-registers).

The worked case is a table of items, driven from the panel's menu. Nothing
about it is window-specific — it is `useQueryState` and `useResults` provided
as a context for the bundled views to read, with the panel's chosen view
pushed into the query:

```ts
const adapter = createMemoryAdapter('?e=items')
const query = useQueryState({ schema, adapter })
const results = useResults({ source, query: query.query, schema, entity: query.entity, limit })

provideShellContext({ ...query, schema, rows: results.rows, /* … */ })

// The view the window is on is the query's view.
watch(() => props.view, (view) => query.setView(view), { immediate: true })
```

`<ResultsArea>` then renders whichever of the six views that is. The full
version is in `stories/helpers.ts`, as `ItemsPanel`.

### Moving panels

With `movable`, a panel can be dragged by its header onto any other. Where it
lands is decided by which part of the target it is dropped on:

| Dropped on | Result |
| --- | --- |
| an edge | splits that pane and takes half of it |
| the middle | joins that pane as a tab, on top |
| the tab strip | joins it at that position in the strip |
| a float's bare desktop | becomes a floating window there |

A preview covers the space the panel would take before the button comes up —
over the strip it becomes an insertion mark between two tabs, over bare desktop
the outline of the window it would make — and Escape mid-drag calls it off. A panel marked `fixed` stays where it is while
everything around it moves.

**Alt** turns docking off for as long as it is held: no edge, no middle and no
tab strip is a target while it is down, so the only thing left to drop on is a
float's bare desktop. That is how a window is carried across the windows it
shares a desktop with without joining any of them — hold Alt and the pane under
the pointer stops offering itself, and let go of Alt and it offers again from
the same point, since a modifier moves no pointer. Held over the tiled half of
a window there is nothing to drop on at all, and the release puts the panel
back. The ghost being carried goes dashed to say so, and the window says it as
`data-dc-docking="false"` for a host that wants to say it some other way.

Alt rather than shift, which already means "into the pane that way, as a tab"
on the keyboard — the opposite of this; ctrl and a press is a secondary click on
macOS, and meta belongs to the platform.

Tabs move by the same three rules, which is what makes a tab and a pane the
same thing: drag a tab along its own strip to reorder it, into another pane to
move it there, or out to an edge to give it a pane of its own again. When the
last tab leaves a group, the group goes with it.

The same reach is available from the keyboard: each movable pane has a grip
that picks the panel on top up (`aria-pressed` says so), after which

| Key | Moves the panel |
| --- | --- |
| an arrow | one place that way — along its own tab strip first, then out of the group |
| shift and an arrow | into the pane that way, as a tab |
| Escape | nowhere; it puts the panel down |

Between two panes of one panel each, an arrow trades their places rather than
lifting the panel out and putting it back: that is the same order an edge drop
would give, while leaving every size in the window untouched — otherwise a
panel walked across the grid would leave a trail of resized panes behind it.
Every move is announced.

A [space with nothing in it](#a-space-with-nothing-in-it) is a place that way
like any other, and the one where both arrows mean the same thing: *beside*
what is there and *with* what is there are the same place when there is nothing
there, so shift is not refused — it has nothing extra to say. The move is
announced against the space, since there is no panel in it to announce it
against. A pane exactly as far away wins over an empty space, being the more
particular answer: an edge of it is somewhere to land, where the space is only
itself.

Dropping a panel where it already is, or on itself, is a no-op rather than a
history entry.

### Sizing

Every neighbouring pair gets a splitter: drag it, or focus it and use the arrow
keys (`role="separator"`, so a screen reader calls it what it is). `sizes` on a
split are relative, so `[3, 1]` and `[0.75, 0.25]` are the same window, and
anything unusable — the wrong length, all zeros — falls back to equal shares
rather than rendering nothing. `minPanelSize` is the pixel floor a drag stops
at; `:resizable="false"` holds every boundary where it is.

A floating frame reads the same two: `minPanelSize` is the smallest it may be
dragged to, and `:resizable="false"` takes its grips away while leaving it
movable. `clampRect` and `resizeRect` are the pure functions behind that, so
the arithmetic is testable without a DOM.

### The layout as data

`update:layout` is emitted whether or not you bind `:layout`, so persisting the
arrangement takes one handler:

```vue
<WindowFrame :panels="panels" movable @update:layout="(next) => save(JSON.stringify(next))" />
```

A stored layout is squared with the panels that actually exist before it is
rendered: leaves naming a panel that has gone are dropped, panels the layout
does not mention are appended, and one appearing twice is rebuilt in one place.
A layout saved last release cannot leave a hole in this one.

A layout whose root is a float gains new panels as new windows on it, stepped
clear of the last, rather than as a tiled pane wedged beside the desktop.

The operations behind all of this are exported and pure — `movePanel`,
`insertPanel`, `removePanel`, `swapPanels`, `moveTab`, `setActivePanel`,
`floatPanel`, `dropIntoSpace`, `setFrameRect`, `raiseFrame`, `frameOf`,
`clampRect`, `resizeRect`,
`setSplitDirection`, `collapseToTabs`, `collapseSpace`, `toFloat`, `toTiled`,
`nodeTitle`, `frontPanel`, `activeTab`, `isPanelTab`, `panelTabs`, `tabPanels`,
`headless`, `fixedView`, `spaceChrome`,
`maximizeFrame`, `toggleMaximized`, `isMaximized`, `minimizeFrame`,
`toggleMinimized`, `isMinimized`,
`frameAt`, `framePathOf`, `setFrameRectAt`, `maximizeFrameAt`,
`minimizeFrameAt`, `raiseFrameAt`, `raisedPath`,
`normalizeLayout`, `reconcileLayout`, `resizeSplit` — so a host can rearrange a
window, move a floating frame, or switch a tab from a command palette, a menu,
or a test without going near the DOM.

### `<WindowFrame>`

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `panels` | `WindowPanelDef[]` | — | Required. Id, title, and optional subtitle, views and `fixed`. |
| `layout` | `WindowNode \| null` | one row of every panel | `v-model:layout` to own the arrangement, tabs and their order included. |
| `views` | `Record<string, string>` | each panel's default | `v-model:views` — panel id to view key. |
| `movable` | `boolean` | `false` | Lets panels be dragged into a new part of the grid, and floating windows be moved. |
| `resizable` | `boolean` | `true` | Lets the boundary between two panels be dragged, and floating windows be resized. |
| `minPanelSize` | `number` | `120` | Smallest a panel or a floating window may be resized to, in pixels. |
| `closable` | `boolean` | `false` | Gives every panel a close button, which asks the host to drop it. |
| `menu` | `boolean` | `true` | Whether the *window's* own menu items are offered — how a space is shown, a pane's tabs, its close. Items the content registered stay either way. |
| `spaceNames` | `boolean` | `true` | Whether a strip that *is* a named space says that name beside its tabs. Off, the name is kept in the layout and said on the bar of every other shape. |
| `paneMenu` | `(panel, items) => items` | — | Extends or replaces that menu, given the items it would have had: the content's own, then the window's. |
| `accent`, `tokens`, `theme` | | | The same three the shell takes. |

**Events** — `panel-move({ panel, target, edge, index, rect })` after a panel
has been moved — `edge: 'float'` with a `rect` when it was dropped on bare
desktop, and a `space` path with no `target` when it was dropped into a space
that held nothing — `frame-change({ panel, rect })` after a floating window has been
moved or resized, `frame-maximize({ panel, maximized })`,
`frame-minimize({ panel, minimized })`, `panel-close(id)`
when a close button is pressed — the window has *not* removed it — `tab-select({ panel })`, `view-change({ panel, view })`,
`panel-activate(id)`, plus `update:layout` and `update:views`.

**Exposed** — `layout` (as rendered), `move(panel, target, edge, index?)` to
perform the same move a drag would, `select(panel)` to bring a tab to the top,
`float(panel, near, rect)` to lift a panel onto a float as a window,
`setRect(panel, rect)` to place a floating window, `setView(panel, view)` to put
a panel on one of its views, `raise(panel)` to bring one to the front,
`toggleMaximize(panel)` to fill the float with it, and `toggleMinimize(panel)`
to roll it up.

## Menus

`<MenuBar>` is the application menu the window's own menus are built out of: a
row of names, each opening a menu of any depth.

```vue
<script setup lang="ts">
import { MenuBar } from 'header-content-layout'
import type { MenuItemDef } from 'header-content-layout'

const menus: MenuItemDef[] = [
  {
    label: 'File',
    items: [
      { id: 'new', label: 'New panel', shortcut: 'N', action: addPanel },
      { separator: true },
      { label: 'Open recent', items: [{ label: 'items.json', disabled: true }] },
      { separator: true },
      { id: 'close-all', label: 'Close every panel', disabled: !panels.length, action: closeAll },
    ],
  },
  { label: 'Help', items: [{ label: 'About', checked: true }] },
]
</script>

<template>
  <MenuBar :menus="menus" @choose="(item) => track(item.id)" />
</template>
```

A menu is data: a `label`, an `action`, `items` for a submenu, and `disabled`,
`checked`, `shortcut`, `separator` or `heading` as needed. `shortcut` is
display only — the hint at the right of an item — because only the host knows
what else the key might mean. `heading` names the items that follow it rather
than being one of them, which is what tells two groups of ticked choices apart
when they are about different things; it is drawn as a `role="group"` around
what it named, so the name is heard once and the keyboard steps over it.

It behaves the way a menu bar does. With one menu up, moving the pointer along
the bar swaps to the next rather than asking for another click. The arrow keys
walk the bar at any depth, up and down move within a menu and skip whatever is
disabled, right opens a submenu and left closes it, Escape closes, and a press
anywhere else takes the whole thing down.

Menus are `position: fixed` and measured once they are up, so one opened near
an edge flips to the other side of what opened it rather than being cut off by
the window it belongs to — which hides its own overflow.

`<MenuButton>` is the same menu behind a single button, which is what a pane
uses. Both take the shell's `theme`, `accent` and `tokens`.

## Theming

Six ways in — the first two cost nothing, and the rest run in increasing
order of effort.

Everything below applies to `<WindowFrame>` too: it takes the same three props
and reads the same tokens.

### Nothing

The default is the minimal theme, and it is the bare minimum: white paper,
near black ink, square corners, no shadows, no tracking, no small caps, the
two generic font families the browser already has, and no hue at all — the
accent and the three status colours all resolve to the ink, since a status
pill says which state it is in words and never needed the colour to say it.

What is left is what the layout stops working without: the surface steps, the
only thing separating a hover from a selection once the tints have no colour
in them; the borders — which, with no shadow and no radius helping them, are
weighted a little heavier than the other themes need; and the type scale,
which is the last thing telling a preview's heading from the label under it
once the hue is gone. That is the whole theme; everything else is the same
derivations every theme uses, so a seed or an accent put back on top lands
exactly as it would elsewhere.

### Nothing, and one size

`theme="mono-size"` is the minimal theme with the type scale given up too. Not
one family with a scale on top of it — one size, one weight, one leading, one
width. Every role a scale would separate is the same setting: a preview's
hero line, a column header, the count in a pill, the URL in a links row, a
tag, the expression in the query field. Colour and opacity are the only things
left telling them apart.

```vue
<DataShell :schema="schema" theme="mono-size" />
```

Two things follow from the collapse. The mono slot points at the sans one, so
`.dc-mono` is left lining up numerals and nothing else. And every rung of the
scale resolves to `--dc-font-size`, which the px scale of every other theme
deliberately does not do — so here that one token is *the* size, and moving it
rescales the whole shell:

```vue
<DataShell :schema="schema" theme="mono-size" :tokens="{ '--dc-font-size': '16px' }" />
```

### A palette off the shelf

`theme="dark"` is the shell's own dark palette and `theme="light"` its light
one; `theme="auto"` is whichever of those two the viewer's system asks for.
Each brings a typeface, rounded corners, a shadow under whatever floats, and
colour in the accent and the three states.

```vue
<DataShell :schema="schema" theme="dark" />
```

`theme="macos"` and `theme="windows"` are the same idea wearing somebody else's
design language. Each brings that system's typeface, corner radii, accent and
shadow — Apple's blue on white paper under a soft, oversized popover shadow;
Fluent's tighter corners and a white card floating over a mica grey page — and
each follows that system's light and dark schemes the way `auto` does, since
which of the two the user picked is part of the look.

They also move a window's own furniture. `macos` turns minimize, maximize and
close into traffic lights at the left of the title bar, led by close — lit
whether or not the pointer is near them, and empty until it is, since hovering
any one light is what fills in all three; `windows` leaves them at the right
as wide flat buttons flush into the corner, colourless until hovered and then
red under close alone. `--dc-control-close`, `--dc-control-minimize` and
`--dc-control-zoom` are those colours — the first is also the red a Fluent
close turns.

```vue
<DataShell :schema="schema" theme="macos" />
```

Pinning one of them to a single scheme means saying which: reseed the surface
and the ink, and the surfaces, borders and muted text follow. Add the accent
and the three status hues if that system's other-scheme versions of them matter
too.

```vue
<DataShell
  :schema="schema"
  theme="macos"
  :tokens="{ '--dc-surface': '#1e1e1e', '--dc-ink': '#f5f5f7', '--dc-accent': '#0a84ff' }"
/>
```

### A few tokens

Surfaces, borders, muted text and tinted backgrounds are all *derived* from a
short list of seeds, so moving a seed moves everything keyed to it. Two of them
are a whole theme:

```vue
<DataShell
  :schema="schema"
  :tokens="{
    '--dc-surface': 'oklch(0.21 0.03 300)',
    '--dc-ink': 'oklch(0.95 0.02 300)',
    '--dc-accent': 'oklch(0.8 0.16 340)',
  }"
/>
```

| Seed | Generates |
| --- | --- |
| `--dc-surface` | `--dc-bg-0…3`, the borders, the flat side of every text and tint blend |
| `--dc-ink` | `--dc-fg-0…3`, and the lift in each surface step |
| `--dc-accent` | `--dc-accent-dim`, `--dc-accent-bg`, `--dc-accent-contrast` |
| `--dc-ok`, `--dc-warn`, `--dc-danger` | the matching `-bg` tints |
| `--dc-tint` | how much colour those tints carry (`10%` minimal and `mono-size`, `24%` dark, `14%` light) |
| `--dc-sans`, `--dc-mono`, `--dc-font-size` | typography |
| `--dc-radius-sm`, `--dc-radius`, `--dc-radius-lg` | corners |
| `--dc-shadow`, `--dc-header-height` | — |
| `--dc-header-width` | how wide the bar and panel are under `matchWidth="shrink"` |

### Any single token

The derived tier is plain custom properties, so override the ones you care
about and the rest stay derived: `--dc-bg-0…3`, `--dc-line`, `--dc-line-2`,
`--dc-fg-0…3`, `--dc-accent-dim`, `--dc-accent-bg`, `--dc-accent-contrast`,
`--dc-ok-bg`, `--dc-warn-bg`, `--dc-danger-bg`, `--dc-raised` and
`--dc-raised-ink` (the query panel, which floats over the results and so needs
a background and a text colour that work together), and `--dc-scrim`,
`--dc-scrim-strong`, `--dc-scrim-fg` (over imagery, not over a surface).

Nothing is declared on `:root`, so dropping the shell into an app cannot
recolour anything around it. The library's own declarations sit inside
`:where()` and carry no specificity, so a plain rule wins wherever it loads:

```css
.dc-shell {
  --dc-accent: oklch(0.76 0.14 150);
  --dc-sans: 'Inter', system-ui, sans-serif;
}
```

Custom properties resolve on the element, though, so a token set on an
*ancestor* — `:root`, a wrapper — still loses to the shell's own default. Theme
from a selector that reaches the shell itself, or from the `tokens` prop, which
lands inline and always wins.

### None at all

`theme="inherit"` is the shell with no palette: the surface goes transparent
and the ink becomes `currentColor`, so it arrives wearing the host's
background, text colour and typeface. The derivations still hold — they just
resolve to translucent veils of the host's own ink rather than opaque blends,
which is what works over a background the component cannot know.

```vue
<div class="my-app-panel">
  <DataShell :schema="schema" theme="inherit" />
</div>
```

The three status hues follow the ink as well, so a pill arrives as a veil with
a word in it rather than a green or a red: a fixed mid-lightness hue is not a
promise this theme can keep over a background it has never seen. Set `--dc-ok`,
`--dc-warn` and `--dc-danger` if the host has colours of its own to lend.

Two things it cannot take from `currentColor`: text on the accent, and the
query panel, which floats over the results and has to be opaque. Those come
from the `Canvas`/`CanvasText`/`AccentColor` system colours, which follow the
`color-scheme` the shell inherits — so a host with a dark background should
declare `color-scheme: dark`, which it owes its native controls and scrollbars
anyway. Set `--dc-raised` and `--dc-raised-ink` to your own surface if you
would rather the panel matched the app exactly.

An app with its own design system usually stops at mapping its variables onto
the seeds:

```css
.dc-shell {
  --dc-surface: var(--app-bg);
  --dc-ink: var(--app-text);
  --dc-accent: var(--app-brand);
}
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
<link rel="stylesheet" href="/dist/style.css" />

<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.runtime.esm-browser.prod.js",
      "header-content-layout": "/dist/index.js",
      "header-content-layout/fixtures": "/dist/fixtures.js"
    }
  }
</script>

<script type="module">
  import { createApp, h } from 'vue'
  import { DataShell } from 'header-content-layout'
  import { iRadarSchema } from 'header-content-layout/fixtures'

  createApp(() => h(DataShell, { schema: iRadarSchema })).mount('#app')
</script>
```

`vue` is the only bare specifier the bundle itself imports, and the runtime
build is enough for it — the shell's own templates are compiled already.

### The host's components, compiled in the browser

Render functions get tiresome fast. [vue3-sfc-loader][sfc-loader] compiles
`.vue` files in the tab, so the host can be written as SFCs and served as
source — `<script setup>`, scoped styles, relative imports between them, and
the same bare imports of the shell you would write against a bundler:

```js
const options = {
  // What the loader must not go and fetch. The shell has to be handed the very
  // Vue the page is running, not a second copy of it.
  moduleCache: { vue: Vue, 'header-content-layout': shell },

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
and two hosts written as SFCs of their own. `App.vue` mounts the shell;
`?app=window` compiles `WindowApp.vue` instead and mounts the panel grid, with
two of its panels filled by components the host wrote — one of them running a
real query through `useQueryState`, `useResults` and `ResultsArea`, all from the
same bundle.

The page checks itself — the artifacts import, the SFCs compile after load, the
host mounts with content, the stylesheet applies — and states the verdict across
the top. The **No Build** stories frame it, `MissingStylesheet` among them,
which removes an artifact so you can watch the checks fail.

[sfc-loader]: https://github.com/FranckFreiburger/vue3-sfc-loader

## Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['header-content-layout/nuxt'],
})
```

Auto-imports the components, adds the stylesheet, and — the part worth having —
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
  facet filtering and sorting, the query-state mutations, and the window layout
  tree. Fast, no DOM.
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
release is a tag, and `npm version` is the whole of it:

```bash
git commit -m 'What changed'   # the work, without dist/
npm version minor              # lint, typecheck, build, test, tag, push
```

`npm version` refuses a dirty tree, which is the point — the change lands as its
own commit first, and `Release vX.Y.Z` stays a version bump and the artifacts it
implies. Three hooks do the rest:

| Hook | Does |
| --- | --- |
| `preversion` | lint, typecheck, `build`, then `test`. Building before testing is what lets the No Build stories cover *this* build rather than the last one. |
| `version` | builds again and stages `dist/`, so the artifacts ride in the version commit rather than trailing it |
| `postversion` | `git push origin main --follow-tags` |

Anything red stops it before the version is written, and nothing needs undoing.

Versions are pre-1.0 and the minor is where breaking goes, so `minor` is the
usual argument and `patch` is for a fix that changes nothing a host is holding.

CI runs the same checks on every push and, because a stale `dist/` is invisible
in review, rebuilds and fails if what is committed is not what `src/` builds.
