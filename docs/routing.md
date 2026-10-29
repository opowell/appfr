# Routing

The query is read from the route's search string and written back on every
change; there is no second copy of the state. How it reaches the URL is
pluggable:

| Adapter | Use it for |
| --- | --- |
| `createHistoryAdapter()` | Plain History API. The default when nothing is provided. |
| `createVueRouterAdapter(router)` | vue-router / Nuxt, so a query change is an ordinary navigation. |
| `createMemoryAdapter(search?)` | Tests and Storybook, where the address bar must stay untouched. |

```ts
import { createVueRouterAdapter, ROUTE_ADAPTER_KEY } from 'appfr'
import { useRouter } from 'vue-router'

const route = createVueRouterAdapter(useRouter())   // per shell, as `route`…
app.provide(ROUTE_ADAPTER_KEY, route)                // …or app-wide
```

An adapter reads `search` and `path`, and writes with `push(search, path?)`,
`replace(search, path?)` and `href(search, path?)`. The shell writes the search
alone, staying on the current path — except from [a page that is not about the
query](api.md#a-page-that-is-not-about-the-query), whose first edit goes to the
list's path. The History adapter drops the hash on a move to another path; the
vue-router one navigates through the router, so its `base` and hash history
apply. A custom adapter that ignores `path` stays where it is.

## Permalinks to a record

Where a press narrows, a record has no page of its own: its screen is the shell
with its term in the query. Two vue-router `redirect` helpers turn old
addresses into that:

```ts
import { entityRedirect, recordRedirect } from 'appfr'

const routes = [
  { path: '/', component: ShellView },
  { path: '/tests', redirect: entityRedirect('tests') },              // → /?e=tests
  { path: '/tests/:id', redirect: recordRedirect('test', 'id') },     // → /?q=test="<id>"
]
```

`recordRedirect(scopeField, param)` writes the same `field="id"` term a press
writes. Both helpers keep the incoming query — `recordRedirect` ANDs its term
on once, so `/tests/x?e=runs` lands on that record's runs — and take the
shell's mount path as a last argument (`/` by default).

## What the URL looks like

```
                                     ← home: nothing filtered, so no parameters
?e=i&v=table&s=l&d=asc&q=s%3E40+kind=page+kind=pdf+rank:20..80+seen:true&p=3
```

| Key | Meaning |
| --- | --- |
| `e` | Entity, by shortcut or key. Absent: every entity (home). `*` says so explicitly, needed only when the host lands on an entity by default |
| `v` | View: `list`, `cards`, `grid`, `images`, `table`, `links`, `preview`. `cards` at home is a card per type; on an entity, a card per record |
| `s` | Sort, by shortcut or key |
| `d` | Direction: `asc`, `desc` |
| `q` | Expression, columns by shortcut, facets included: `field=a field=b` (chips), `field:min..max` (range, either end optional), `field:true` (toggle) |
| `p` | Page, 1-based; absent is the first. See [paging](api.md#paging-through-the-results) |

**Shortcuts.** Types, sorts and columns are addressed by the first letter of
each word of their label — **Items** is `i`, **Price ratio** is `pr` — so `p<5`
stays `p<5`. Where two share initials the first declared gets them and the
other is written by key; initials that are another's key belong to nobody.
Join keys (any entity's `scope`) are never shortened. Reading accepts keys and
shortcuts alike, and the query handed to your source is always in keys.

**Facets are terms.** A facet has no parameter of its own: its value is the
terms on its field in `q` — typed as `rank:20..80`, shown as `20 ≤ rank ≤ 80`.
`facetValue(expr, facet)` and `withFacetValue(expr, facet, value)` read and
write them; `setFacet`, `toggleChip`, `setRange` and `toggleFlag` on the query
state do it through the URL.

- **Defaults are omitted**, so a plain view has a clean URL.
- **Parameters the shell does not own are preserved** (`?tab=audit` survives).
- **Bad input degrades rather than throws.** An unknown entity, view or sort
  falls back to the default; a term on an unknown field narrows nothing.

Changing the entity, view, sort, committed expression or page **pushes** a
history entry; nudging a facet **replaces**. Configure with `navigationMode`
and `facetNavigationMode`.

## The URL outside the shell

For a redirect, guard or page beside the shell holding the router's query
object: `searchFromQuery(route.query)` turns it into the search string
`parseQuery` reads (repeated parameters kept, `null` ones dropped), and
`readExpression(search, schema?)` decodes just the expression — with the
schema, shortcuts expanded to keys; without, as written (which still names
every record, since join keys are never shortened).

```ts
import { readExpression, searchFromQuery } from 'appfr'

const search = searchFromQuery(route.query)   // '?e=tests&q=host%3D%22a.example%22'
readExpression(search)                        // 'host="a.example"'
```
