# Wiring it to your data

Implement `DataSource`. The shell calls nothing else: `query` for a result that
arrives at once, and [`stream`](#results-that-arrive-over-time) for one that
arrives over time.

```ts
import type { DataSource } from 'appfr'

const source: DataSource = {
  // `entity` is null on the home screen, where the query spans every entity in
  // the schema. `offset` is `(query.page - 1) * limit`, worked out for you.
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
  },
}
```

```vue
<DataShell :schema="schema" :source="source" />
```

- A row is `{ id, entityKey, entityLabel, fields }`. Each row carries its own
  entity, so a mixed result set reads every record through its own type's
  [`columns`](schemas.md#columns-of-your-own).
- `total` is the whole match before `limit` and `offset`; the shell counts
  pages with it. `unfiltered` is true when nothing narrowed the population.
- A synchronous source is applied in the same tick, so SSR emits complete
  markup and tests can assert without awaiting. An async source gets a pending
  state, and a slow response never overwrites a newer one.

## Results that arrive over time

For a result that takes seconds to assemble — a crawl, a scan — declare
`stream` as well and push rows in as they are found:

```ts
import type { StreamingDataSource } from 'appfr'

const source: StreamingDataSource = {
  query: (request) => fetchPage(request),          // still required — see below

  stream({ query, entity, limit, offset }, sink) {
    const socket = new WebSocket(`/api/crawl?q=${encodeURIComponent(query.expr)}`)
    socket.onmessage = (event) => sink.insert(JSON.parse(event.data).rows)
    socket.onerror = () => sink.fail(new Error('The crawl stopped responding'))
    socket.onclose = () => {
      sink.set({ total: 1_284 })
      sink.close()
    }
    return () => socket.close()                    // the shell calls this
  },
}
```

| | |
| --- | --- |
| `insert(rows, at?)` | Adds rows at `at` — the end of the page by default, `0` for newest first. The running total grows by what was inserted |
| `set({ rows, total })` | Replaces what is known: the page as it now stands, or the real total once counted |
| `close()` | Nothing more is coming; the query stops being pending |
| `fail(error)` | Reported as a rejected `query` is |
| `open` | False once the shell has moved on; stop working when it is |

- **The page still holds `limit` rows.** An insert past the end is dropped
  (it belongs to page two) while the total keeps counting. Inserting at `0` on
  a full page pushes the last row onto page two.
- **The first push with rows replaces; later ones add**, so the previous
  query's rows stay up until the new stream has some.
- **The query owns the stream.** Changing the entity, sort, expression, a
  facet or the page closes the sink — `open` goes false, its methods become
  no-ops, your teardown runs — and starts a new stream. Changing the view does
  not.
- **`query` is still required.** The home screen's per-type cards each run
  their own `query`; `stream` only feeds the result list. A source that can
  only stream should answer `query` with an empty page.

## Rows you already have

For an API that returns whole lists, `createMemoryDataSource(rows)` applies the
expression, facets, sort and page in the page, with the same code as the
bundled mock. It is synchronous, so rows are on screen from the first render.

```ts
import { createMemoryDataSource, queryAll, useStableSchema } from 'appfr'

// A new array is a new source, and a new source re-runs the query.
const source = computed(() => createMemoryDataSource(toRows(payloads.value)))

// Every row the query matches, not one page — for a "Run all".
const specs = queryAll(source.value, { query, schema, entity: findEntity(schema, 'specs') })
```

Two differences from the mock:

- **A row with no date sorts last under a date sort, in both directions.** That
  applies to a `kind: 'date'` or `role: 'updated'` column holding `''` or an
  unparseable value.
- **A `limit` of 0 is no limit.** The mock reads it as an empty page, which is
  why `queryAll` asks for a page no corpus reaches instead.

Facets built from the data come from the rows too:

```ts
import { chipsFrom, rangeFrom, toggleFacet, usefulFacets } from 'appfr'

facets: usefulFacets([
  chipsFrom(specRows, 'tag', 'Tags', { multiple: true }),  // every value held, A to Z
  rangeFrom(specRows, 'cases', 'Cases'),                    // 0 to niceMax(the largest)
  toggleFacet('failing', 'Failing', 'Only specs some run has failed'),
]),
```

`usefulFacets` drops facets that cannot change the result (one chip option, a
range from 0 to 0). `niceMax` rounds a range's ceiling up to the next 1, 2 or 5
step, so the schema doesn't change on every tick.

`useStableSchema(build)` re-runs `build` when what it reads changes, and hands
over a new schema only when it differs by value (`JSON.stringify`, or a `key`
of your own), so the shell doesn't rebuild for nothing. Functions in the schema
(`format`, `value`) are not compared, so one that reads changing data should
read it when called.

```ts
const schema = useStableSchema(() => buildSchema(payloads.value))
```
