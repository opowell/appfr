# appfr

> **Pre-alpha.** Breaking changes go out freely, in any release, with no
> deprecation period and no migration path. Pin an exact tag, and read the
> diff before moving to the next one.

A query bar over a switchable results area, for data-heavy screens.

The bar is where the query is read and edited. A strip over the results
manages the view and holds the type's actions.

It is schema-driven: one `DomainSchema` describes the entities, their facets,
what their fields are called, and what the columns of each one's table are. The
same bar and seven views serve any schema: swapping the schema swaps the
vocabulary, not the component.

```
┌──────────────────────────────────────────────────────────────┐
│ Search…                                           ‹ 1 / 2 ›  │  ← bar
├──────────────────────────────────────────────────────────────┤
│ [Reports · 12 ▾] [List ▾]                     [+ New report] │  ← strip
├──────────────────────────────────────────────────────────────┤
│ 01  Competitor pricing pages      909  104  running          │
│ 02  Security advisories           737  288  running          │  ← results
│ 03  Firmware release notes        173  135  running          │
└──────────────────────────────────────────────────────────────┘
```

## Install

There is no registry release: install a tag of this repository, which carries
the built `dist/`.

```bash
npm install github:opowell/appfr#v0.70.0
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
import { myAppSchema } from './schema'   // a DomainSchema — see docs/schemas.md
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
    <DataShell :schema="myAppSchema" @activate="open" />
  </div>
</template>
```

With no `source` prop, the shell serves deterministic mock rows generated from
the schema's own samples — enough to see and test the whole thing before a
backend exists.

## Wiring it to your data

Implement `DataSource` and pass it as `source`. A row is `{ id, entityKey,
entityLabel, fields }`, with `fields` holding the record under whatever names
its type's columns read.

```ts
import type { DataSource } from 'appfr'

const source: DataSource = {
  // `entity` is null on the home screen, where the query spans every entity.
  async query({ query, schema, entity, limit, offset }) {
    const body = await fetchRecords({ query, entity, limit, offset })
    return { rows: body.rows, total: body.total, unfiltered: body.unfiltered }
  },
}
```

```vue
<DataShell :schema="schema" :source="source" />
```

`stream` pushes rows in as they are found, and `createMemoryDataSource(rows)`
applies the query in the page for an API that returns whole lists — see
[wiring it to your data](docs/data-sources.md).

## Documentation

| Page | Covers |
| --- | --- |
| [The home screen](docs/home-screen.md) | The card per type the shell opens on |
| [Wiring it to your data](docs/data-sources.md) | Sources, streaming, rows already in hand |
| [Routing](docs/routing.md) | Where the query lives, several shells on a page, permalinks, the URL format |
| [Schemas](docs/schemas.md) | Entities, columns and roles, selection and its operations |
| [Records](docs/records.md) | Narrowing to a record, `within`, cards of your own |
| [Card content, layers and controls](docs/cards-and-layers.md) | Facts, pills, code, logs, dialogs, toasts, popovers, `controls.css` |
| [The expression field](docs/query-language.md) | The query language, its terms as parts on the bar, and the field they are edited in |
| [Component API](docs/api.md) | `<DataShell>` props, events, slots; paging; composables |
| [No build step](docs/no-build.md) | `dist/` from a static page |
| [Development](docs/development.md) | Scripts, tests, releasing |

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

## Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['appfr/nuxt'],
})
```

Auto-imports `DataShell`, its parts and its views, adds the stylesheets, and — the part worth having —
registers a plugin that routes shell queries through Nuxt's router, so no page
needs its own adapter wiring. Options under the `dataShell` key: `prefix`,
`css`, `router`.

## Development

```bash
npm install
npm test               # Vitest, then Playwright in Chromium
npm run storybook      # http://localhost:6011
```

The rest — the test layers, and how a release is cut — is in
[development](docs/development.md).
