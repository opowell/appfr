# The home screen

The shell opens on **Home**: nothing is filtered, so every entity the schema
declares is in the result set, logs and settings included. The default view is
**a card per type**: the type's name, its count, and its most recently updated
few records.

```
┌── Searches      38 ──┐ ┌── Items        10k ──┐ ┌── Scrapers      24 ──┐
│ Security advisories  │ │ Supplier directory   │ │ Hacker News          │
│   cve OR advisory    │ │   example.com/eu     │ │   news.ycombinator   │
│            350 NEW   │ │           476 LINKS  │ │          629 RULES   │
│ Job postings         │ │ Recall notice        │ │ RSS bridge           │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘
```

- A card's header filters to that type, which opens as a **table**; a row opens
  that record.
- A view the URL leaves out is the default *for what is shown*: cards across
  types, a table within one. So a view nobody chose follows a change of type,
  and one somebody chose survives it.
- `previewsPerType` sets the rows per card (default 3). Each card is queried on
  its own, so a quiet type still shows its latest. `0` draws only each card's
  heading (type and count, no `create` button) in narrow wrapping columns.

**Entity is a filter, not a mode.** There is no separate logs or settings
screen: those are records like any other until a filter excludes them. The
filter is the first part of the query on the bar (`Logs · 184k`, with
`Everything` among the choices), and choosing a type reveals its facets.

```
Home            →  everything · cards · updated     a card per type
Pick an entity  →  entity:logs                            48 records
Add a facet     →  entity:logs · level:error              11 records
Lift the entity →  everything · cards · updated     a card per type
```

Filtered to one entity, cards are one per record; across every entity they are
one per type. The other six views always show the records themselves, mixed
types and all.

An expression from home narrows every card at once, and each card's count
becomes how many of that type matched, so home doubles as a breakdown by type.
`entity:logs` narrows by type without leaving home.

A type's card is dropped when its single remaining record is the one the
expression **named** (what pressing a row writes), since the card would repeat
the header — see [the rule in full](records.md#a-shell-about-one-record).

To open on one entity's list instead:

```vue
<DataShell :schema="schema" :defaults="{ landing: 'entity', entity: 'items', view: 'list' }" />
```
