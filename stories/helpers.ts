import { h } from 'vue'
import type { Component } from 'vue'
import DataShell from '../src/components/DataShell.vue'
import { SHELL_THEMES } from 'themes'
import type { ShellTheme } from 'themes'
import { createMemoryAdapter } from '../src/routing/memory'
import { createHistoryAdapter } from '../src/routing/history'
import { createMockDataSource } from '../src/data/mock'
import { iRadarSchema } from '../src/fixtures/schemas'
import type {
  ColumnDef,
  DataSource,
  DomainSchema,
  EntitySchema,
  Selection,
  ShellQueryDefaults,
  ShellRow,
  StreamingDataSource,
  ViewsOption,
} from '../src/types'
import SelectCell from './cells/SelectCell.vue'
import SelectHeader from './cells/SelectHeader.vue'
import { selectedRows } from './selection'

export { selectedRows }

/**
 * `theme` is one of a fixed set, so the control is a picker rather than the
 * text field Storybook infers from a string arg — a typo in an open field just
 * falls through to the default and looks like the theme doing nothing.
 *
 * Spread into the meta of any story that renders a themed component.
 */
export const themeArgTypes = {
  theme: {
    control: { type: 'select' as const },
    options: [...SHELL_THEMES],
    description: 'Which shipped palette the component wears.',
    table: { defaultValue: { summary: 'minimal' } },
  },
}

export interface ShellStoryArgs {
  /** Initial query, as it would appear in the URL. */
  search?: string
  schema?: DomainSchema
  source?: DataSource
  defaults?: ShellQueryDefaults
  /** An expression the whole shell is read inside — its scope, not its query. */
  within?: string
  /** What pressing a row means: narrow to the record, or report it. */
  rowPress?: 'open' | 'narrow'
  /** Every table row a link all the way across, rather than its name alone. */
  rowLinks?: boolean
  pinnable?: boolean
  /** Offers the tick on rows even where the type names nothing to do with one. */
  selectable?: boolean
  theme?: ShellTheme
  accent?: string
  /** Token overrides passed straight to the shell. */
  tokens?: Record<string, string>
  limit?: number
  /** What the count is short of, in the host's words, under the pager's hover. */
  pagesNote?: string
  /** Rows inside each type's card on the home screen. */
  previewsPerType?: number
  /**
   * Restricts the offered result views — or works them out per screen. Every
   * one of them when unset.
   */
  views?: ViewsOption
  /** A component per record the query narrows to, by type — see `recordCards`. */
  recordCards?: Record<string, Component>
  /** Where the bar offers the list of types: only once one is chosen, or always. */
  typeChooser?: 'scoped' | 'always'
  /** Which end of the strip the count of ticks and its Clear sit at. */
  selectionPlacement?: 'start' | 'end'
  /**
   * Drive the real address bar instead of an in-memory route. Off by default so
   * stories stay isolated from each other; the routing stories turn it on.
   */
  liveUrl?: boolean
  /** Render inside a fixed-size box rather than filling the frame. */
  inset?: boolean
  /**
   * Wrap the shell in a host with its own background, text colour and font —
   * what the `inherit` theme has to blend into.
   */
  host?: 'paper' | 'slate'
  /** Slot content, for the stories about what a host puts into the shell. */
  slots?: Record<string, () => unknown>
  /** What the host does with a press it is handed — see `rowPress: 'open'`. */
  onActivate?: (row: ShellRow) => void
  /**
   * What the host does when a card's `create` button is pressed. The shell
   * makes nothing itself, so a story that offers the button needs one of
   * these for anything to come of it.
   */
  onCreate?: (entity: EntitySchema) => void
  /**
   * And what it does when the two operations on a selection are asked for.
   * Reported exactly as `create` is — the shell copies nothing and deletes
   * nothing — so a story that offers the buttons answers them here.
   */
  onDuplicate?: (selection: Selection) => void
  onDelete?: (selection: Selection) => void
  /** And when one of the type's own `operations` is, by its key. */
  onOperate?: (key: string, selection: Selection) => void
}

/**
 * Renders a shell for a story. Each story gets its own route adapter, so one
 * story's query cannot leak into the next.
 */
export function renderShell(args: ShellStoryArgs) {
  const schema = args.schema ?? iRadarSchema
  return {
    setup() {
      const adapter = args.liveUrl
        ? createHistoryAdapter()
        : createMemoryAdapter(args.search ?? '')

      const shell = () =>
        h(DataShell, {
          schema,
          route: adapter,
          source: args.source ?? createMockDataSource({ seed: schema.key }),
          limit: args.limit ?? 50,
          previewsPerType: args.previewsPerType ?? 3,
          pinnable: args.pinnable ?? false,
          selectable: args.selectable ?? false,
          theme: args.theme ?? 'minimal',
          ...(args.views ? { views: args.views } : {}),
          ...(args.recordCards ? { recordCards: args.recordCards } : {}),
          ...(args.typeChooser ? { typeChooser: args.typeChooser } : {}),
          ...(args.selectionPlacement ? { selectionPlacement: args.selectionPlacement } : {}),
          ...(args.pagesNote ? { pagesNote: args.pagesNote } : {}),
          ...(args.within ? { within: args.within } : {}),
          ...(args.rowPress ? { rowPress: args.rowPress } : {}),
          ...(args.rowLinks ? { rowLinks: args.rowLinks } : {}),
          ...(args.defaults ? { defaults: args.defaults } : {}),
          ...(args.accent ? { accent: args.accent } : {}),
          ...(args.tokens ? { tokens: args.tokens } : {}),
          ...(args.onActivate ? { onActivate: args.onActivate } : {}),
          ...(args.onCreate ? { onCreate: args.onCreate } : {}),
          ...(args.onDuplicate ? { onDuplicate: args.onDuplicate } : {}),
          ...(args.onDelete ? { onDelete: args.onDelete } : {}),
          ...(args.onOperate ? { onOperate: args.onOperate } : {}),
        }, args.slots)

      const hosted = () =>
        args.host ? h('div', { class: `sb-host sb-host--${args.host}` }, [shell()]) : shell()

      return () =>
        args.inset
          ? h('div', { class: 'sb-inset' }, [hosted()])
          : h('div', { class: 'sb-frame' }, [hosted()])
    },
  }
}

/**
 * Wraps a bare part in the shell surface so its design tokens resolve. Parts
 * do not need the shell's context, only its `.dc-shell` scope.
 *
 * `extraStyle` lands on the shell element itself, which is a full-height flex
 * *column* — so a row of parts has to say `flex-direction:row` as well as
 * `display:flex`, and `align-items:flex-start` with it, or each part stretches
 * to the height of the page.
 */
export function partSurface(children: unknown[], extraStyle = '') {
  return h(
    'div',
    { class: 'dc-shell', style: `padding:24px; min-height:100%; ${extraStyle}` },
    children as never,
  )
}

/** A source that answers after a delay, for exercising the pending state. */
export function delayedSource(ms: number, seed = 'iRadar'): DataSource {
  const inner = createMockDataSource({ seed })
  return {
    query: (request) =>
      new Promise((resolve) => setTimeout(() => resolve(inner.query(request)), ms)),
  }
}

/**
 * The mock source with names and paths long enough to overrun any column.
 *
 * What a real corpus looks like once its records are files: a name that is a
 * sentence and a secondary that is the path it came from, both far past what a
 * column can hold. The views have to stay inside the shell's width regardless,
 * so this is what the ones with columns are tested against.
 */
export function longValueSource(seed = 'iRadar'): DataSource {
  const inner = createMockDataSource({ seed })
  const PREFIX = 'packages/test-tooling/record-test/.crawl-runs/2026-08-29T20-08-58'
  return {
    query: (request) => {
      const result = inner.query(request)
      return {
        ...result,
        // iRadar's rows read their identity and reference from `primary` and
        // `secondary`, which is what the fixture schemas name those fields.
        rows: result.rows.map((row) => ({
          ...row,
          fields: {
            ...row.fields,
            primary: `${String(row.fields.primary)} — every word of a name nobody thought would be shown in a column`,
            secondary: `${PREFIX}/${row.id}/${String(row.fields.secondary)}`,
          },
        })),
      }
    },
  }
}

/**
 * A source that finds its rows over time rather than all at once — a crawl, a
 * scan, a scroll of pages fetched one after another.
 *
 * The shell prefers `stream` where a source declares it, and renders every
 * push, so the rows appear as they are found. `query` is still here because
 * the home screen's per-type cards each run one of their own.
 */
export function streamingSource(
  options: {
    chunk?: number
    every?: number
    newestFirst?: boolean
    seed?: string
    /**
     * Find the whole match rather than the page asked for — what a scan does,
     * having no way to skip to page three. The shell keeps a page of it and
     * counts the rest, so the pager grows as the rows land.
     */
    whole?: boolean
  } = {},
): StreamingDataSource {
  const { chunk = 4, every = 140, newestFirst = false, seed = 'iRadar', whole = false } = options
  const inner = createMockDataSource({ seed })
  return {
    query: (request) => inner.query(request),
    stream(request, sink) {
      const found = inner.query(
        whole ? { ...request, offset: 0, limit: Number.MAX_SAFE_INTEGER } : request,
      )
      let next = 0
      const timer = setInterval(() => {
        // `open` goes false the moment the query moves on, and a source doing
        // real work should stop rather than keep pushing into nothing.
        if (!sink.open || next >= found.rows.length) {
          clearInterval(timer)
          // The count the source really knows, now that it has finished
          // counting — the running total was only what it had found so far.
          sink.set({ total: found.total })
          sink.close()
          return
        }
        sink.insert(found.rows.slice(next, next + chunk), newestFirst ? 0 : undefined)
        next += chunk
      }, every)
      return () => clearInterval(timer)
    },
  }
}

/** A stream that fails part of the way through, rather than at the outset. */
export function failingStreamSource(after = 8): StreamingDataSource {
  const inner = createMockDataSource({ seed: 'iRadar' })
  return {
    query: (request) => inner.query(request),
    stream(request, sink) {
      const found = inner.query(request)
      sink.insert(found.rows.slice(0, after))
      const timer = setTimeout(() => sink.fail(new Error('The crawl stopped responding')), 400)
      return () => clearTimeout(timer)
    },
  }
}

/** A source that always fails, for exercising the error state. */
export function failingSource(message = 'The results service is unavailable'): DataSource {
  return {
    query: () => {
      throw new Error(message)
    },
  }
}

/* ----------------------------------------------------------------- columns */

/**
 * iRadar's items with a column set of the host's own: a checkbox in front, the
 * kind and the rank the facets already carry, and the date and state behind —
 * nine columns where the labels describe four.
 */
export function selectableSchema(): DomainSchema {
  const columns: ColumnDef[] = [
    // The tick, and over it the control for every tick at once — a header of
    // the host's own, which is what `header` is for.
    { key: 'select', kind: 'component', component: SelectCell, header: SelectHeader, width: '36px' },
    { key: 'ordinal', kind: 'ordinal', label: '#', width: '48px' },
    { key: 'primary', role: 'identity', label: 'Item', sort: 'name', activate: true, scope: true },
    { key: 'secondary', role: 'reference', label: 'URL', mono: true, muted: true, hideBelow: 620 },
    { key: 'kind', label: 'Kind', width: '80px' },
    { key: 'rank', label: 'Rank', width: '72px', align: 'right', mono: true, hideBelow: 760 },
    {
      key: 'metric1',
      role: 'metric',
      kind: 'number',
      label: 'Links',
      width: '80px',
      sort: 'metric1',
      hideBelow: 900,
    },
    {
      key: 'updatedAt',
      role: 'updated',
      kind: 'date',
      label: 'Updated',
      sort: 'updated',
      width: '116px',
      mono: true,
      muted: true,
      hideBelow: 900,
    },
    { key: 'status', role: 'state', kind: 'status', label: 'State', width: '104px' },
  ]
  return {
    ...iRadarSchema,
    entities: iRadarSchema.entities.map((entity) =>
      entity.key === 'items' ? { ...entity, columns } : entity,
    ),
  }
}

/**
 * A type that has not said what its table is.
 *
 * The shell invents no columns, so this one has no table — it says so rather
 * than drawing an empty frame, which is what a silent `v-for` over nothing
 * gets you and reads as the data having gone missing.
 */
export function noColumnsSchema(): DomainSchema {
  return {
    ...iRadarSchema,
    entities: iRadarSchema.entities.map((entity) => {
      if (entity.key !== 'searches') return entity
      const bare = { ...entity }
      delete bare.columns
      return bare
    }),
  }
}

/**
 * Columns for the mixed result set: every entity at once, where no single
 * type's vocabulary applies and one set of headings has to serve rows of every
 * kind. Declared on the schema rather than on any entity — the type leads,
 * because across kinds it is the column that tells you most.
 */
export function everythingColumnsSchema(): DomainSchema {
  return {
    ...iRadarSchema,
    columns: [
      { key: 'ordinal', kind: 'ordinal', label: '#', width: '48px' },
      { key: 'entityLabel', label: 'Kind', width: '120px', mono: true, when: 'everything' },
      { key: 'primary', role: 'identity', label: 'Record', sort: 'name', activate: true, scope: true },
      { key: 'secondary', role: 'reference', label: 'Reference', mono: true, muted: true, hideBelow: 620 },
      {
        key: 'updatedAt',
        role: 'updated',
        kind: 'date',
        label: 'Updated',
        sort: 'updated',
        width: '116px',
        mono: true,
        muted: true,
        hideBelow: 900,
      },
      { key: 'status', role: 'state', kind: 'status', label: 'State', width: '104px' },
    ],
  }
}
