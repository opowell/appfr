# Schemas

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
      // Every field the shell shows. The shell has no set of its own.
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
      // Optional: a button on this type's card that asks for a new one.
      create: 'Add an item',
    },
  ],
}
```

A row is `{ id, entityKey, entityLabel, fields }`: three fields the shell owns,
and `fields` holding the record under whatever names the columns read. What
each type *is* — its fields, which is the name, which the state — is its
[`columns`](#columns-of-your-own). That is what lets one set of renderers
serve every schema, and records of different types share a result set.

`appfr/fixtures` ships four worked schemas — `iRadarSchema`, `legoSchema`,
`commerceSchema`, `battleSimSchema` — plus `logsEntity` and `settingsEntity`,
which are ordinary entities with no special casing in the shell.

## Columns of your own

An entity's `columns` are every field the shell shows, in table order, with a
`role` saying which of them the non-table views are made of.

**The shell invents none.** There is no `defaultColumns`: a type that leaves
`columns` out gets an empty results area saying so. The fixtures' familiar set
— ordinal, identity pair, type, two metrics, date, state and tint, over
`primary`, `secondary`, `metric1`, `metric2`, `updatedAt`, `status` and `tint`
— is a helper in `src/fixtures/schemas.ts` to copy, not to import.

```ts
{
  key: 'pieces',
  columns: [
    { key: 'ordinal', kind: 'ordinal', label: '#', width: '48px' },
    // No label: a column of pictures says what it is.
    { key: 'image', role: 'image', kind: 'image', width: '56px', height: '28px' },
    { key: 'name', role: 'identity', label: 'Piece', sort: 'name', activate: true, scope: true },
    { key: 'partNo', role: 'reference', label: 'Part no.', width: '104px', mono: true },
    { key: 'shape', label: 'Shape', width: '92px', hideBelow: 620 },
    // A year is a number, not a quantity: 1988, never 2.0k.
    { key: 'firstYear', label: 'First year', width: '88px', align: 'right', format: String },
    { key: 'colors', role: 'metric', kind: 'number', label: 'Colors', sort: 'colors', drill: 'colors' },
    { key: 'cg', label: 'Weight', format: grams, align: 'right' },
    { key: 'state', role: 'state', kind: 'status', label: 'State', width: '104px' },
    // A background, not a value: the table leaves it out.
    { key: 'colour', role: 'tint' },
  ],
}
```

**Where a value comes from**, in order: the column's `value(row)`; else the
field it names (`field`, or its `key`) on `row.fields`; else the row's own
`id`, `entityKey` and `entityLabel`. The bag wins, so a type with an `id`
field of its own means that one.

```ts
{ key: 'shape' }                                  // row.fields.shape
{ key: 'year', field: 'firstYear' }               // row.fields.firstYear
{ key: 'entityLabel', label: 'Kind' }             // the row's own type
{ key: 'label', value: (row) => `${row.fields.name} (${row.id})` }
```

**Roles** are how the other six views pick parts out of a column set:

| Role | Read by |
| --- | --- |
| `identity` | every view, as the record's name; the drill and pin labels |
| `reference` | the line under it in the list, cards, links, grid and preview |
| `metric` | a list row and a card (first two), a home-screen preview row (first one), the preview pane (all) |
| `state` | the pill |
| `updated` | the date on a card, a home-screen row and the preview pane |
| `image` | beside the name on a card, behind the caption on a grid tile, and the whole images view; still a table cell. A row with no picture, or one that fails to load, is drawn without it — a square with the name in the images view |
| `tint` | the grid tile's background and the preview pane's banner; never a table cell |

A column with no role appears in the table only. A role no column plays is a
part those views leave out.

| | |
| --- | --- |
| `key` | identifies the column; the field read when nothing else says |
| `label` | the header; leave it out where the content says what it is |
| `hint` | the header's hover text, e.g. the currency of a price column |
| `kind` | `text` (default), `number`, `date`, `status`, `image`, `ordinal`, `component` |
| `field` / `value` / `format` | where the value comes from and how it reads |
| `width` / `height` / `align` / `mono` / `muted` / `truncate` | how it is drawn |
| `sort` | the `SortDef` key this header sorts by |
| `activate` / `click` / `drill` / `scope` | what pressing it does |
| `when` | `always`, or only in one of the two scopes |
| `hideBelow` | the container width it stands down at |
| `component` | what a `component` cell renders |
| `header` | a component after the header's label, for a control over the whole column |

**Pressing a cell** is set per column. `activate` opens the record
(`activate(row)`). `drill` names the entity the value counts, so pressing `12`
under *Colors* lists those twelve — only where the row's entity declares a
`scope`. `scope` puts the → beside the value. `click(row)` is yours.

**Sorting** is offered only where `sort` names a sort the entity declares.
Pressing the header sorts by it, and pressing it again reverses the direction.
The table's headers are the only sort control; the sort is in the URL.

**Standing down.** `hideBelow` takes a container width from the ladder
`480 | 620 | 760 | 900 | 1100` (a fixed ladder because the rule is a container
query in the stylesheet). Columns without it are always shown.

**A cell of your own.** `kind: 'component'` renders your component with
`{ row, entry, value, column }` — a sparkline, a thumbnail stack, a checkbox.
The shell has no selection model here; it passes the row. Your component must
stop the click reaching the row, or the record opens.

**A header of your own.** `header` renders your component in the header cell,
after the label and sort button, with `{ column, entity }` — for controls over
the whole column, such as clearing every tick:

```ts
{ key: 'select', kind: 'component', component: SelectCell, header: SelectHeader, width: '36px' }
```

There is no HTML-string cell; use a component rather than `v-html` over other
people's data.

**Keys.** A rendered column is tracked by its key, so keys must be present and
distinct. `key` is optional and falls back to `field`, then `label`, then
position:

```ts
{ key: 'shape' }                        // 'shape'
{ field: 'firstYear', label: 'Year' }   // 'firstYear'
{ label: 'Weight', value: grams }       // 'Weight'
{ kind: 'ordinal' }                     // 'column-0'
```

Rows are tracked by `row.id`, falling back to the row's place (`pieces-4`).
Duplicate row ids make the renderer reuse rows for each other — a tick or an
open row lands on the wrong record. `columnKey(column, index)` and
`rowKey(row, index)` are exported; `PresentedRow.key` is the resolved one.

**Across every entity**, the mixed result set uses the schema's own `columns`:

```ts
const schema: DomainSchema = {
  /* … */
  columns: [
    { key: 'ordinal', kind: 'ordinal', label: '#', width: '48px' },
    { key: 'entityLabel', label: 'Kind', width: '120px', when: 'everything' },
    { key: 'primary', label: 'Record', sort: 'name', activate: true, scope: true },
    { key: 'status', kind: 'status', label: 'State', width: '104px' },
  ],
}
```

`when` limits a column to one scope — here, the row's type only across every
entity.

`columnsFor`, `roleColumn`, `roleColumns`, `cellValue`, `cellText` and the
other resolvers are exported for hosts rendering their own views;
`useColumns()` is the scope's set inside a shell, and `PresentedRow.parts` is a
row with every role resolved.

### Columns most types have

Factories for the columns most types repeat, over the fixtures' field names.
Each takes a `Partial<ColumnDef>` last for overrides, and returns a fresh
object:

```ts
import {
  dateColumn, entityColumn, identityColumn, metricColumn, ordinalColumn,
  referenceColumn, stateColumn, tintColumn, bytesCell,
} from 'appfr'

columns: [
  ordinalColumn(),                                         // #
  identityColumn('Spec', { scope: true }),                 // primary
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

**Formatters.** `formatBytes` (`28.0 kB`, decimal), `formatDuration` from ms
(`640ms`, `12.4s`, `3m 7s`), `formatElapsed` from seconds (`1:42`),
`formatPercent` from a share (`50%`), `formatDateTime` (reader's locale;
`formatDate` is fixed, UTC) and `stripAnsi` write `—` for a missing value. As
a column's `format`: `bytesCell`, `durationCell`, `elapsedCell` and
`percentCell` accept anything, count a number held as text, and write
`EMPTY_CELL` otherwise — including for a size or time of `0`.

`tintFor(id)` is a stable tile colour from `MOCK_TINTS` by hash of the id.
Nothing applies it for you; put it in a `tint` field.

## A type whose card is its picture

`card: 'picture'` draws each card as the picture — square, edge to edge — with
the name under it and nothing else. For types told apart by how they look:

```ts
{ key: 'games', label: 'Games', card: 'picture', /* … */ }
```

Only the card changes; the table and the other views read the roles as usual.
A record with no picture shows its name in the card. Ticks, stars and query
marks sit over the picture's corner. With only picture cards on screen, columns
narrow to `--dc-card-picture` (160px; a record card is 320px).
`--dc-card-image` sizes a record card's picture (64px).

## A type you can make more of

`create` names the action of making one, and puts that button at the foot of
the type's home-screen card and on the strip over its list:

```ts
{ key: 'crawls', label: 'Crawls', create: 'Start new…', /* … */ }
```

Types without it don't offer it. The shell makes nothing: the button emits
`create(entity)`, and the host decides where — usually a form on its own route:

```vue
<DataShell :schema="schema" @create="entity => router.push(`/${entity.key}/new`)" />
```

## Records you can copy and delete

`duplicate` and `delete` work the same way: an entity that names an operation
offers it.

```ts
{ key: 'searches', label: 'Searches', create: 'Start new…', duplicate: 'Duplicate', delete: 'Delete', /* … */ }
```

That puts a bar over the records:

```
┌──────────────────────────────────────────────────────────────────┐
│ ▣ 2 selected  Clear        + Start new…   Duplicate 2   Delete 2 │
├──────────────────────────────────────────────────────────────────┤
│ ☑ 01  Security advisories · rev 8        807  308   ok           │
│ ☐ 02  Job postings — platform · rev 6    664  223   review       │
│ ☑ 03  Competitor pricing pages · rev 2    12  511   ok           │
└──────────────────────────────────────────────────────────────────┘
```

**Ticks appear only where a type names `duplicate` or `delete`.** A type with
only `create` gets the bar with one button and nothing to select.

| | |
| --- | --- |
| the **tick on a row** | adds the record to the selection; any other press on the row still opens it |
| the **tick for the page** | selects or clears the whole page; a partly ticked page shows the mixed state. It heads the bar, except in the table, where it heads the tick column |
| **Duplicate** / **Delete** | show how many are selected; disabled with nothing ticked |
| **Clear** | unticks everything, including on pages you have left |

Ticks appear in every view that draws records — list, cards, tiles, links, the
preview's record, and a leading table cell before the schema's columns. The
home screen has none.

The shell carries none of the operations out; each is emitted with its
selection:

```vue
<DataShell
  :schema="schema"
  @create="entity => router.push(`/${entity.key}/new`)"
  @duplicate="({ ids }) => api.copy(ids)"
  @delete="({ ids, rows, entity }) => confirmThenDelete(entity, ids)"
/>
```

```ts
interface Selection {
  ids: string[]              // every ticked id, across every page
  rows: ShellRow[]           // the ticked rows this page still holds
  entity: EntitySchema | null
}
```

The selection survives sort, page and view changes, and narrowing or widening.
Read rows beyond `rows` back by id. **Listing another type empties it**, so a
selection of one type is never offered to another's *Delete*.

Nothing else empties it — not even a completed delete, which the shell can't
see. Hold the ticks yourself to clear them:

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

Deleted rows disappear when the source stops returning them.

`selectable` offers ticks where the schema names no operation, for a host whose
bulk action is its own: it reads `v-model:selected`, and the bar shows only the
count and Clear.

## A facet a row holds several of

A chips facet is one value per row unless marked `multiple`; then a row may
hold a list and matches each of its values:

```ts
{ kind: 'chips', key: 'region', label: 'Region', options: ['eu', 'us', 'apac'], multiple: true }
```

```ts
{ id: 'acme', fields: { primary: 'Acme Retail', region: ['eu', 'us'] }, /* … */ }
```

That tenant is in both `eu` and `us`, so the chips overlap rather than
partition. Without `multiple`, a row in two regions would need a combined value
(`eu + us`) that becomes its own chip, and `eu` would silently mean "eu only".

The URL, summary and controls are unchanged, and filtering follows whatever the
row holds — a source may return a list either way. The flag declares it in the
schema and is what the mock source generates against.
