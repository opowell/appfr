# Records: narrowing, scopes and their cards

## Narrowing to one record

A record is often what other records are *about*: a tenant's specs and runs
each name its host. Two schema fields say so — `scope` on the entity, and
`drill` on a metric column:

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

| Pressing | Does |
| --- | --- |
| the row's **name** | narrows to the record without picking a type, and switches to the cards view, so each type's card reports what it holds of the record |
| a **metric** | narrows to what its column's `drill` counts (`12` under *Tests* lists those twelve), keeping the current view |

The shell **applies** both, unlike `activate` and `create`: narrowing is a
query change, and the term lands in the expression as an ordinary one — on the
bar, editable, in the URL, undoable with Back. A `drill(row, entity)` event
still goes out; `entity` is null when the row itself was pressed.

**`rowPress: 'open'`** reverses this for a host that routes to a page of its
own: a press is reported as `activate(row)` and nothing is applied, and a
**→** beside each narrowable name keeps the narrowing one press away. (Before
v0.21.0 this was the only behaviour.)

```vue
<DataShell :schema="schema" row-press="open" @activate="row => router.push(pageFor(row))" />
```

A row whose type declares no `scope` can't be narrowed to, so its presses are
always reported as `activate`.

**`href` — a record that lives somewhere else:**

```ts
{ key: 'urls', label: 'URLs', scope: 'url', href: (row) => row.id, /* … */ }
```

| When a press | With `href` |
| --- | --- |
| is reported (`rowPress: 'open'`, or no `scope`) | the name is a link to the page; a plain press opens it in a new tab and `activate` is **not** emitted |
| narrows (the default, with a `scope`) | it still narrows, and a **↗** beside the name opens the page in a new tab |

`href` is on the type rather than a column because every view reads it — cards,
tiles and previews included. In a table the `↗` sits beside the `scope: true`
column, else the `activate: true` one. `shell.recordHref(row)` is the URL and
`<OpenMark :entry>` is the `↗`, for views of your own.

**⌥ (Alt) leaves the record out.** Any narrowing press — a row, the `→`, a
metric, a card's preview row — writes `-host="www.example.com"` instead, and
keeps the type and view (only a metric still pivots to what it counts). On a
record the query already names, it turns the term round rather than adding
the opposite beside it; the bar shows the sign: `-set:Yellow Castle (sets_10007)`.
`pressOptions(event)` reads the modifier for a host's own cells, and is what
`click(row, options)` and `drill(row, entity, options)` carry.

**Presses are links.** A row's name, a metric, the `→`, a type card's heading
and a card's preview rows are `<a href>`s (`PressLink`), so ⌘/Ctrl-click opens a
new tab, ⇧-click a new window, a middle click a background tab, and the context
menu works. A plain or ⌥ click is the shell's and navigates in place — which is
why exclusion is ⌥, the one modifier a link doesn't use. Table rows aren't
links (their cells hold controls), so the row handles modified clicks by hand;
`rowLinks` makes every cell a link instead. `shell.pressHref(row)` and
`shell.drillHref(row, entity)` build these hrefs through the route adapter's
`href(search)`: the History adapter keeps the page's path and hash, and the
vue-router one asks `router.resolve` (so a hash-history app links to its `#/…`).

**Marks say where the query stands.** A record the query narrows to wears a
green `+` beside its name; one it excludes, a red `−`; most rows wear nothing.
This matters because a type's own list doesn't apply a term on its own scope —
a categories table narrowed to one category still lists them all, and the mark
says which. Pressing the mark lifts the term (`termStanding(expr, term)` and
`liftTerm(expr, term)`). On hover the mark fades and the `→` turns green, or red
with ⌥ held — previewing the press.

**`+ · −` controls.** A list row (before the name) and a card (beside its
state) carry `RowStanding`, the three-way control for one row; ⌥-click on the
name still does the `−`. A type card's glance rows and the preview pane keep
the quieter mark. A table whose type can be named gets a column of
`StandingControl`s after the ticks: `+` narrows to the record, `·` says
nothing, `−` excludes it. The column head applies the same to every row on the
page, or to the ticked rows if any, and is lit only where they agree. Each
press is one expression change; the table stays put. `withStanding(expr, term,
standing)` is what one press writes. `+` over a page writes `set:a set:b …`,
which reads as any of them — see [the expression field](query-language.md).

A host applying a narrowing itself should call `narrow(expr, entityKey)` from
`useQueryState`, not `setExpression` then `setEntity`: each serialises from the
URL's current query, and route changes aren't synchronous, so the second
overwrites the first.

A metric column with no `drill` stays a plain number.

**Every entity must carry the join key**, even ones without a `scope`. An
unresolved field *matches* in this language (so a half-typed expression doesn't
empty the screen), so a row that lacks `host` passes `host:"example.com"`
unfiltered. Give such rows an empty list:

```ts
{ id: 'crawl_1', fields: { host: [] }, /* … */ }   // correctly excluded
{ id: 'crawl_1', fields: {}, /* … */ }             // silently included
```

The bundled mock source does this for you.

**Or set `strictScopes: true`** on the schema: a term on a join key then
excludes rows that lack the field (and `-host="…"` keeps them), while other
unknown fields still match. Off by default. `matchesExpression` takes the
schema as a fourth argument to honour it; the memory and mock sources pass
theirs, and a source of your own should too:

```ts
matchesExpression(parseExpression(query.expr), row, entity, schema)
```

Helpers for a host building its own context or results area:

```ts
import { drillExpression, scopedEntity, scopeTermFor } from 'appfr'

scopeTermFor(schema, row)              // 'host="www.example.com"', or null
excludingTerm(scopeTermFor(schema, row))  // '-host="www.example.com"', or null
drillExpression(schema, query, row)    // the expression with that term added
drillExpression(schema, query, row, { exclude: true })  // …or with the record left out
scopedEntity(schema, 'host')           // the entity `host` points at — the inverse
```

And for naming records without a row in hand — a permalink, a record card, a
selection passed to another page:

```ts
fieldTerm('host', 'www.example.com')   // 'host="www.example.com"' — what recordTerm writes
idsExpression('test', ['a.ts', 'b.ts'])  // 'test="a.ts" test="b.ts"' — any of them; null for none
recordsIn(schema, [readExpression(search)])  // [{ entityKey: 'tenants', id: 'www.example.com' }]
router.push({ query: { ...route.query, ...narrowPatch(expr, term) } })  // what a press on the name does
```

- `idsExpression` relies on same-field `=` terms reading as any-of, so use it as
  the whole query: ANDed onto one that already names a record on that field, it
  widens. It returns null, not `''`, for no ids (`''` is every row).
- `recordsIn` reads the positive record terms, deduped by type and id in
  written order. It fills the `record` slot.
- `narrowPatch` adds the term, drops the type and page, and sets the cards view
  (or the one you pass); `undefined` marks a parameter to remove.

In the expression field a scope key beats a column heading of the same name. The
generic names (`name`, `ref`, `status`, `updated`, `metric1`…) are fallbacks, so a
schema field of that name wins; only `entity` is reserved.

## A shell about one record

Narrowing puts a record in the query. A record's own *page* is different: the
record comes from the route and there's nothing to widen back out to. `within`
is an expression the whole shell is read inside, held by the host:

```vue
<DataShell
  :schema="schema"
  :source="source"
  :within="`test:&quot;${route.params.id}&quot;`"
/>
```

It is ANDed onto every query — the results, the per-type cards and the type
counts — so `Everything` means everything about this record. It never reaches
the URL; the reader's own query works as usual inside it. The bar states it at
its head, outside the scrolling parts and not as a liftable pill, naming the
record where it can (`set:Yellow Castle (sets_10007)`).

An `OR` in the query is multiplied out (`a OR b` inside `set:x` becomes
`a set:x OR b set:x`), since the language has no brackets;
`andExpression(one, other)` is that rule. With `Cards` and `Everything`, the
result is a card per type of everything naming the record — most of a detail
view already.

### Cards of your own

The two slots add the record itself:

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

They are cells of the same grid as the type cards: as many columns as fit, each
row as tall as its tallest card. `<ShellCard>` gives them the shell's card
chrome, which is scoped CSS a host can't otherwise reach.

| Prop | Notes |
| --- | --- |
| `title`, `count` | The heading and the count beside it. |
| `name`, `reference` | A record's name, with the id/path/URL under it (mono, muted, breaks anywhere). `name` replaces `title`; a `reference` without a `name` is not drawn. |
| `span` | `'all'` takes a whole row — a record's heading, source, a wide table. |
| `flush` | No body padding, for content that draws its own edges. |
| `muted` | A quieter card. |
| `collapsible`, `collapsed`, `defaultCollapsed` | Folding, below. |

Slots: `head` (replaces the whole head), `aside`, the default body, `foot`,
`reference`. `count` stays beside the name; the `head` slot replaces both.

```vue
<!-- :reference="spec.file" for plain text; the slot for a link. -->
<ShellCard :name="tenant.id" span="all">
  <template #reference><a :href="tenant.baseUrl">{{ tenant.baseUrl }}</a></template>
</ShellCard>
```

`ShellCard` reads no shell context, so it works anywhere inside a `.dc-shell`
element (e.g. `<div class="dc-shell" data-dc-theme="dark">`), including a page
with no query.

**Folding.** A card can fold to its head:

```vue
<ShellCard title="Metadata" collapsible default-collapsed>…</ShellCard>
<ShellCard title="Source" collapsible v-model:collapsed="sourceFolded">…</ShellCard>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `collapsible` | `boolean` | `false` | A press on the head folds the card to the head alone; another opens it. |
| `collapsed` | `boolean` | — | `v-model:collapsed` to own the state. Emits `update:collapsed` on every press; when bound, the card shows what you write back. |
| `defaultCollapsed` | `boolean` | `false` | Unbound: whether the card starts folded. |

It is off by default so existing head controls don't change meaning. When on,
a press on a control in the head (link, button, field, anything with a pressed
role) belongs to that control, and so does the click ending a text-selection
drag. The chevron is a real button for keyboards, named by `title`, with
`aria-expanded` and `aria-controls`. The body and foot are hidden, not
removed, so a half-filled form or a scrolled log is intact when reopened. A
card with no head never folds. The shell's own type cards don't fold: their
head already opens the type's list.

Only the per-type cards screen draws these slots; choose a type or another view
and the records replace them. A view of your own reads the scope from
`useShellContext().within` — it is not part of `query`.

The per-type screen, inside a scope or not, leaves out cards that would say
nothing:

- **No card for a type with no matches**, unless the type names `create`.
- **No card for the type whose one record the query has named** — even with
  `create`. It would repeat the record the bar already names; choose that type
  and the record is listed.

That last rule needs the record to be *named*, not merely the only match:
`name:"Brick"` leaving one category is an answer and keeps its card. "Named"
means the query already holds the term a press on the row would add, tested
with `addTerm` (so `set:sets_1` and `set:"sets_1"` agree). Scope and query are
read as one expression, so a record's page and a hand-narrowed query behave
alike.

## Cards for the records the query names

The `record` slot draws your cards for each record the query names — the way a
press makes a screen about a record, as opposed to `within`. It renders once
per record, in query order, ahead of `cards-before`:

```vue
<DataShell :schema="schema" :views="views">
  <template #record="{ entity, id }">
    <component :is="CARD_SETS[entity.key]" :id="id" />
  </template>
</DataShell>
```

So the cards follow the query: press a row and they arrive, lift the term and
they go, narrow to two records and both sets show. A record is a positive term
on some type's `scope` field; negated terms don't count, and duplicates (case
or alternatives) are one record. The committed query is read, not the draft in
the box. Like `cards-before`, it draws on the per-type screen only.

`recordCards` is the shorthand — a component per type, given the record's `id`;
types without an entry get none, and the slot wins if both are given:

```vue
<DataShell :schema="schema" :record-cards="{ tests: TestCards, runs: RunCards }" />
```

`views` can be a function of the type being listed and the named records:

```ts
const views = ({ entity, records }: ViewsContext): ViewKind[] =>
  entity ? ['table'] : records.length ? ['cards'] : ['table', 'cards']
```

Here a type's list is a table, a screen about a record is cards (where its own
cards draw), and the corpus offers both. With one view on offer, the view
picker leaves the strip.
