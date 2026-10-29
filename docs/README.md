# appfr documentation

Start with the [README](../README.md) for install and a first shell. These
pages cover the rest, roughly in the order a host needs them:

| Page | Covers |
| --- | --- |
| [The home screen](home-screen.md) | The card per type the shell opens on, and why entity is a filter rather than a mode |
| [Wiring it to your data](data-sources.md) | `DataSource`, streaming results with `stream`, and `createMemoryDataSource` for rows already in hand |
| [Routing](routing.md) | Route adapters, permalink redirects, the URL format and its shortcuts |
| [Schemas](schemas.md) | `DomainSchema`, columns and their roles, column factories, `create` / `duplicate` / `delete` and the selection, multi-valued facets |
| [Records](records.md) | Narrowing to one record, `href`, the `+ · −` standing marks, `strictScopes`, `within`, and cards of your own |
| [Card content, layers and controls](cards-and-layers.md) | `ShellFacts`, `StatusPill`, `ShellCode`, `ShellLog`, dialogs, toasts, popovers, `controls.css` |
| [The expression field](query-language.md) | The query language, the parts on the bar, and the draft box |
| [Component API](api.md) | `<DataShell>` props, events and slots, the `page` slot, paging, table layout, composables |
| [No build step](no-build.md) | Using `dist/` from a static page, with SFCs compiled in the browser |
| [Development](development.md) | Scripts, the two test layers, and releasing |
