import { h, ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DataShell from '../src/components/DataShell.vue'
import { iRadarSchema, legoSchema } from '../src/fixtures/schemas'
import type { DomainSchema } from '../src/types'
import {
  abbreviatedCountsSchema,
  abbreviatedCountsSource,
  delayedSource,
  everythingColumnsSchema,
  failingSource,
  failingStreamSource,
  longValueSource,
  noColumnsSchema,
  renderShell,
  selectableSchema,
  streamingSource,
  themeArgTypes,
} from './helpers'
import type { ShellStoryArgs } from './helpers'

const meta = {
  title: 'Shell / Data Shell',
  component: DataShell,
  argTypes: {
    ...themeArgTypes,
    matchWidth: {
      control: { type: 'select' as const },
      options: ['grow', 'shrink'],
      description: 'Whether the panel grows to the bar, or the bar comes in to the panel.',
      table: { defaultValue: { summary: 'grow' } },
    },
    headAlign: {
      control: { type: 'select' as const },
      options: ['left', 'center', 'right'],
      description: 'Where the pair sits once `shrink` has narrowed them.',
      table: { defaultValue: { summary: 'center' } },
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'A query header over a switchable content area.',
          '',
          'The header states what the current query is; clicking it opens the',
          'expanded query view. The content area renders the matching items in',
          'the chosen view and sort order. The query itself lives in the URL,',
          'so every state here is linkable and survives a reload.',
          '',
          'The shell opens on **Home**: no entity filter, so every kind of',
          'record is in the result set — logs and settings included — shown in',
          'the preview view. Picking an entity is an ordinary filter you can',
          'lift again, not a mode you have to leave.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof DataShell>

export default meta

type Story = StoryObj<ShellStoryArgs>

const story = (args: ShellStoryArgs): Story => ({
  args,
  render: (storyArgs: ShellStoryArgs) => renderShell(storyArgs),
})

/**
 * The default, and the home screen: a card per item type — what it is, how
 * many of it there are, and its most recently updated few. Every type the
 * schema declares is here, logs and settings among them.
 *
 * A card's header filters the results to that type; a row opens that record.
 */
export const Home = story({})

/** Home with the query panel open, showing what narrowing is available. */
export const HomePanelOpen = story({ open: true })

/**
 * A host's own section at the end of the panel, through the `panel-section`
 * slot. The section is the panel's — same metrics, same divider — and what
 * goes in it is the host's, which is why this one styles its own heading with
 * the `dc-eyebrow` utility and lays out its own controls.
 *
 * It is where an application's commands go when they are not about the query:
 * the header bar's width belongs to the summary it exists to show.
 */
export const HostPanelSection = story({
  open: true,
  slots: {
    'panel-section': () => [
      h('header', { class: 'sb-panel-section__head' }, [
        h('span', { class: 'dc-eyebrow' }, 'App'),
        h('span', { class: 'sb-panel-section__note' }, 'the host\u2019s own controls, not the query'),
      ]),
      h('div', { class: 'sb-panel-section__actions' }, [
        h('button', { type: 'button' }, 'Reload data'),
        h('button', { type: 'button' }, 'Sign out'),
      ]),
    ],
  },
})

/** More of each type per card. */
export const HomeDeeperCards = story({ previewsPerType: 6 })

/* ------------------------------------------------ a type you can make more of */

/** iRadar, with two of its types made from the shell and the rest not. */
const creatableSchema: DomainSchema = {
  ...iRadarSchema,
  entities: iRadarSchema.entities.map((entity) => {
    if (entity.key === 'searches') return { ...entity, create: 'Start new…' }
    if (entity.key === 'scrapers') return { ...entity, create: 'Add a scraper' }
    return entity
  }),
}

/** What the host was last asked for — this story's whole answer to `create`. */
const asked = ref('nothing asked for yet')

const creatable = (args: ShellStoryArgs): Story =>
  story({
    ...args,
    schema: creatableSchema,
    onCreate: (entity) => {
      asked.value = `asked for a new ${entity.label}`
    },
    slots: {
      actions: () => h('span', { class: 'sb-asked dc-mono' }, asked.value),
    },
  })

/**
 * `create` on an entity names what making a new one is called, and puts that
 * button at the foot of its card. The types that named nothing do not offer
 * it — the shell makes nothing itself, so the button is a request the host
 * answers, the way an opened row is.
 */
export const HomeCreatable = creatable({})

/**
 * The same button on a type with nothing in it, which is where it does the
 * most: a card that would otherwise be a dead end says what to do about it.
 */
export const HomeCreatableEmpty = creatable({ search: '?q=recall' })

/* ------------------------------------------- what can be done with the records */

/**
 * iRadar with one type that says what can be done with it: made, copied and
 * deleted. The other creatable type names making one only, which is what makes
 * the bar over its list one button long.
 */
const manageableSchema: DomainSchema = {
  ...iRadarSchema,
  entities: iRadarSchema.entities.map((entity) => {
    if (entity.key === 'searches') {
      return { ...entity, create: 'Start new…', duplicate: 'Duplicate', delete: 'Delete' }
    }
    if (entity.key === 'scrapers') return { ...entity, create: 'Add a scraper' }
    return entity
  }),
}

/** What the host was last asked to do — this story's whole answer to the bar. */
const acted = ref('nothing asked for yet')

const managed = (args: ShellStoryArgs): Story =>
  story({
    ...args,
    schema: args.schema ?? manageableSchema,
    onCreate: (entity) => {
      acted.value = `asked for a new ${entity.label}`
    },
    onDuplicate: (selection) => {
      acted.value = `asked to duplicate ${selection.ids.length}`
    },
    onDelete: (selection) => {
      acted.value = `asked to delete ${selection.ids.length}`
    },
    slots: {
      actions: () => h('span', { class: 'sb-asked dc-mono' }, acted.value),
    },
  })

/**
 * The bar over a type's own list: make one, tick some, and copy or delete what
 * is ticked.
 *
 * Every control on it is named by the entity — `create`, `duplicate`,
 * `delete` — so a type that says nothing about deleting is not deleted from
 * here, and a type that says nothing at all has no bar. Naming an operation on
 * a selection is also what offers the ticks: a tick with nothing to do to what
 * it ticks would lead nowhere.
 *
 * The shell carries none of them out. Each is reported with the selection it
 * is for — the ids, and the rows of them the page still holds — exactly as an
 * opened row and a new record are.
 */
export const EntityActions = managed({ search: '?e=searches&v=list' })

/** The same bar over the same records as a table, where the tick leads. */
export const EntityActionsTable = managed({ search: '?e=searches&v=table' })

/**
 * And over tiles, where a tick sits in the corner of the picture. Ticks are of
 * records rather than of what is on screen, so they survive the change of view
 * that got here — and the sort, and the page.
 */
export const EntityActionsGrid = managed({ search: '?e=searches&v=grid' })

/**
 * A short page, so that a selection can be watched surviving a step through
 * the pages: a tick is of a record, and a record is not where it happens to be
 * in the results.
 */
export const EntityActionsPaged = managed({ search: '?e=searches&v=list', limit: 12 })

/**
 * A type that names making one and nothing else: one button, no ticks. This is
 * the same request the type's card on the home screen makes, offered from the
 * type's own list as well — which is where you are when you find there is
 * nothing here yet.
 */
export const EntityActionsCreateOnly = managed({ search: '?e=scrapers&v=list' })

/**
 * Ticks a host asked for outright, on a schema that names no operation at all.
 *
 * `selectable` offers them without the two buttons, for an application whose
 * bulk action is its own: it binds `v-model:selected` and does the rest. The
 * bar is then the count and a way to clear it.
 */
export const SelectableRows = story({ search: '?e=items&v=list', selectable: true })

/* ---------------------------------------------------- narrowing to a record */

/**
 * The LEGO schema, where four of the types say how the rest reach them:
 * `scope` names the field every other record carries their id in, and `drills`
 * says what each metric column counts.
 *
 * That makes a row two things rather than one. Its **name** opens the record,
 * as everywhere else. Its **metric** narrows to what the number counts —
 * pressing `312` under *Parts* on a set means "show me those 312 pieces" —
 * and the **→** beside it narrows to the record itself without picking a type,
 * so every card reports what it holds of that one set.
 *
 * The shell applies both itself. `activate` and `create` are reported and left
 * because the shell has no router and makes nothing; this is a query change,
 * and the query is the shell's own. The term lands in the expression field as
 * an ordinary one, removable from the header like any other.
 */
export const HomeDrillable = story({ schema: legoSchema, liveUrl: true })

/** The same rows as a table, where both metric columns are pressable. */
export const DrillableTable = story({
  schema: legoSchema,
  liveUrl: true,
  defaults: { entity: 'sets', landing: 'entity', view: 'table' },
})

/**
 * Where a drill lands: the pieces of one set, reached by pressing that set's
 * *Parts*. Nothing here was typed — the expression is what the press wrote.
 *
 * The query holds a join key, `set:"sets_10007"`, and the header reads it back
 * as the record it names: **set:Yellow Castle (sets_10007)**. The id stays,
 * because it is what the expression field holds and what a shared URL carries.
 */
export const DrilledIntoPieces = story({
  schema: legoSchema,
  search: '?e=pieces&v=table&q=set%3A%22sets_10007%22',
})

/**
 * The same drill with the panel open, which is where that term is edited: it
 * is a part of the expression field rather than text in it, and the box beside
 * it is where the next one is written — a word to search for, or a term of its
 * own.
 */
export const DrilledPanelOpen = story({
  schema: legoSchema,
  search: '?e=pieces&v=table&q=set%3A%22sets_10007%22',
  open: true,
})

/**
 * The other half: narrowed to one set without pivoting to a type, which is
 * what the → on a row does. Every card is now that set's — its pieces, its
 * colors, its inventories — and the set itself is still among them.
 */
export const DrilledEverything = story({
  schema: legoSchema,
  search: '?q=set%3A%22sets_10007%22',
})

/**
 * A search from home narrows every card at once, and each card's count becomes
 * how many of that type matched — so it doubles as a breakdown by kind.
 */
export const HomeSearch = story({ search: '?q=recall' })

/** Home in the list view, where each row says which kind of record it is. */
export const HomeAsList = story({ search: '?v=list' })

/** Home in the table view, which gains an Entity column across kinds. */
export const HomeAsTable = story({ search: '?v=table' })

/** Home in the preview view, reading the whole corpus one record at a time. */
export const HomeAsPreview = story({ search: '?v=preview' })

/** Searching the whole corpus at once: this term only matches settings. */
export const SearchEverything = story({ search: '?v=list&q=digest' })

/** Filtering by kind from the expression alone, without leaving home. */
export const ExcludeByExpression = story({ search: '?v=list&q=entity:logs' })

/**
 * A host that writes its counts its own way, and the list of types reading in
 * one hand because of it.
 *
 * The populations in that list are the host's, already formatted; the count on
 * `Everything`, and on the type in force once a query narrows it, is the one
 * number the shell works out for itself. `formatCount` on the schema is how
 * the host says which hand to write it in — here `2.0k` rather than `2,000`,
 * so the two halves of one control cannot disagree about what a number looks
 * like.
 */
export const HostWrittenCounts = story({
  schema: abbreviatedCountsSchema(),
  source: abbreviatedCountsSource(),
})

/* ------------------------------------------------- scoped to one entity */

/** One entity picked out of the corpus. The header says so as a term. */
export const EntityList = story({ search: '?e=searches&v=list' })

/** Logs are records like any other, with their own facets once scoped. */
export const LogsEntity = story({ search: '?e=logs&v=list' })

/** So are settings. */
export const SettingsEntity = story({ search: '?e=settings&v=list' })

/** A narrowed query inside one entity. */
export const FilteredQuery = story({ search: '?e=searches&v=list&f_state=running&f_schedule=daily' })

/** An expression rather than facets. */
export const ExpressionQuery = story({ search: '?e=items&v=list&q=release+OR+recall' })

/** Both at once, which is how a real query usually looks. */
export const FacetsAndExpression = story({
  search: '?e=items&v=list&f_kind=page,pdf&f_rank=40..100&q=example.com',
})

/**
 * More parts than the bar has room for.
 *
 * The row scrolls rather than wraps and hides its scrollbar, so the fade at
 * whichever edge has parts behind it is the only thing saying the query goes
 * on past the end of the bar.
 */
export const LongQuery = story({
  search:
    '?e=items&v=list&f_kind=page,pdf&f_rank=40..100' +
    '&q=example.com+year>=1988+digest+advisory+recall+bulletin+retraction+erratum+notice+revision',
})

/* --------------------------------------------------------------- the views */

export const CardsView = story({ search: '?e=searches&v=cards' })
export const GridView = story({ search: '?e=items&v=grid' })

/**
 * The same two views of a type that has pictures.
 *
 * A card and a tile are an identity, a reference and a number or two, and a
 * catalogue's records are none of those first: what a piece is, is what it
 * looks like. The `image` role is how a schema says which column holds that —
 * beside the name on a card, and the whole of a tile with the caption over it.
 * LEGO's pieces name theirs; iRadar's searches have none, and their cards and
 * tiles above are the same views without a picture in them.
 */
export const PicturedCards = story({
  schema: legoSchema,
  search: '?e=pieces&v=cards',
})

export const PicturedGrid = story({
  schema: legoSchema,
  search: '?e=pieces&v=grid',
})
export const TableView = story({ search: '?e=searches&v=table' })
export const LinksView = story({ search: '?e=items&v=links' })
export const PreviewView = story({ search: '?e=items&v=preview' })

/**
 * The table against values no column can hold. Fixed layout keeps it exactly as
 * wide as the shell however long a name or a path gets: what does not fit is
 * truncated, with the whole of it on hover, and every row stays one line deep.
 * The alternative — a table as wide as its longest cell — puts the date and the
 * state off the right-hand edge, which are the two columns a row is scanned for.
 */
export const TableViewLongValues = story({
  search: '?e=searches&v=table',
  source: longValueSource(),
})

/* ------------------------------------------------------------------ columns */

/**
 * A table of the schema's own columns rather than the default eight.
 *
 * The four `labels` describe a shape — an identity pair and two metrics — that
 * a card and a tile really are, and that a catalogue is not. LEGO's pieces
 * declare `columns` instead: a picture, a shape, a first year that is a year
 * and not a quantity, two counts that each lead to what they count, a weight
 * in whatever unit the number is actually in, and a rarity flag. Twelve
 * columns, and the shell knows what none of them mean.
 */
export const TableColumns = story({
  schema: legoSchema,
  search: '?e=pieces&v=table',
})

/**
 * A cell of the host's own. `kind: 'component'` hands the cell whatever you
 * give it — here the row checkbox a table that selects rows needs, which the
 * shell has no opinion about: it passes the row, and what a tick means is the
 * host's. Ticks survive sorting, paging and a change of view, because they are
 * the host's state and not the table's.
 */
export const TableColumnsWithSelection = story({
  schema: selectableSchema(),
  search: '?e=items&v=table',
})

/**
 * And a type that has not said what its table is.
 *
 * The shell renders the columns it is given and invents none, so this one has
 * no table. It says which type and what would fix it, rather than drawing an
 * empty frame — the other views still work, because a card and a tile are made
 * of the labels rather than of columns.
 */
export const TableNoColumns = story({
  schema: noColumnsSchema(),
  search: '?e=searches&v=table',
})

/**
 * Columns for the mixed result set — every entity at once, where an entity's
 * own set would be describing the wrong rows. Declared on the schema rather
 * than on any one type, and the row's kind earns a column of its own.
 */
export const TableColumnsEverything = story({
  schema: everythingColumnsSchema(),
  search: '?v=table',
})

/* ---------------------------------------------------------------- streaming */

/**
 * Results that arrive over time rather than all at once.
 *
 * A source that declares `stream` is handed a sink and pushes into it for as
 * long as it has anything to say — `insert` for rows found, `set` for what it
 * now knows, `close` when it is done. The shell renders every push, so the
 * table fills in as the crawl runs and the count in the header climbs with it.
 *
 * The query is still the query: change a facet, a sort or a page and the sink
 * closes, the source is torn down, and a new one starts. Rows from the query
 * you just left cannot land in the one you are looking at.
 */
export const StreamedResults = story({
  search: '?e=searches&v=table',
  source: streamingSource(),
})

/**
 * The same, inserting at the front — what a scan that finds the newest first
 * looks like. A page holds `limit` rows, so each insert at 0 pushes the last
 * row of the page onto page two, which is where a `query` for this page would
 * have left it anyway.
 */
export const StreamedNewestFirst = story({
  search: '?e=searches&v=list',
  source: streamingSource({ newestFirst: true, chunk: 2, every: 200 }),
  limit: 12,
})

/** A stream that fails part of the way in, reported the way a rejected query is. */
export const StreamFailure = story({
  search: '?e=searches&v=list',
  source: failingStreamSource(),
})

/**
 * The home screen against a streaming source. Each type's card runs its own
 * `query`, so the cards are answered at once and the stream is what the result
 * list is made of.
 */
export const StreamedHome = story({ source: streamingSource() })

/* ------------------------------------------------------- restricting the views */

/**
 * `views` says which of the six are on offer. A host that has no use for some
 * of them takes them off the View control rather than leaving a click to find
 * out — and a link naming one that is not on the list lands on the first that
 * is, so an old bookmark cannot reach a view the panel has no way back from.
 */
export const RestrictedViews = story({
  search: '?e=searches&v=table',
  views: ['list', 'table'],
  open: true,
})

/** A link to a view this shell does not offer: it renders the first it does. */
export const RestrictedViewsUnofferedLink = story({
  search: '?e=items&v=grid',
  views: ['list', 'table'],
})

/** Ascending order, to show the direction control taking effect. */
export const SortedByNameAscending = story({ search: '?e=searches&v=list&s=name&d=asc' })

/* -------------------------------------------------------------- edge states */

/** No matches anywhere in the corpus. */
export const NoResults = story({ search: '?v=list&q=nothingmatchesthis' })

/**
 * No matches inside one entity. Because the entity is just a filter, the way
 * out is to lift it and search everything instead.
 */
export const ScopedNoResults = story({ search: '?e=searches&v=list&q=nothingmatchesthis' })

/** A short page, so the limit is visible in the rows themselves. */
export const ShortPage = story({ search: '?e=searches&v=list', limit: 6 })

/** An async source mid-flight, with the home cards still to arrive. */
export const Loading = story({ source: delayedSource(100_000) })

/** The same, in a record view. */
export const LoadingAsList = story({ search: '?v=list', source: delayedSource(100_000) })

/** A source that fails. The shell reports it rather than showing an empty list. */
export const SourceError = story({ source: failingSource() })

/* ----------------------------------------------------------------- paging */

/**
 * Forty-eight searches, twelve to a page. The header gains a step either side
 * of where it is — `‹ 1 / 4 ›` — and the page it is on is in the URL as `p`,
 * so a page is a link like every other state the shell can be in.
 *
 * There is no control until there is somewhere to go: at the default limit of
 * fifty this same query is one page, and the bar says nothing about pages.
 */
export const Paged = story({ search: '?e=searches&v=list', limit: 12 })

/**
 * Further in. The list's leading column goes on counting — page three of
 * twelve opens at 25, not back at 01 — so a row's number means its place in
 * the whole result rather than its place on screen.
 */
export const LaterPage = story({ search: '?e=searches&v=list&p=3', limit: 12 })

/** The end of the results, where the step forward has nowhere to go. */
export const LastPage = story({ search: '?e=searches&v=list&p=4', limit: 12 })

/**
 * A page past the end — a bookmark to a query that has since shrunk, or a
 * hand-edited URL. How many pages there are is a count only the source knows,
 * so the shell corrects it once the results are in: this lands on page four
 * with `p=4` in the URL, rather than on an empty list reading "nothing
 * matches".
 */
export const PagePastTheEnd = story({ search: '?e=searches&v=list&p=99', limit: 12 })

/**
 * Paging is a position in a result set, so a change to what matched returns to
 * the first page: open the panel here and pick a facet, and the page goes back
 * to one. Changing the *view* does not — the same rows drawn another way are
 * still the same rows, and page two of them is still page two.
 */
export const PagedInTheTableView = story({ search: '?e=items&v=table&p=2', limit: 12 })

/* --------------------------------------------- the width the two of them share */

/**
 * The default. The panel grows to the bar it drops from, so the query opens
 * over exactly the width of the summary it came from — at any size of shell,
 * and with nothing left over at either end.
 */
export const PanelFillsTheBar = story({ open: true })

/**
 * The other way round: `matchWidth="shrink"` brings the *bar* in to the width
 * the panel wants — `--dc-header-width`, 1220px — so the pair still measure
 * the same, and a query on a very wide screen is not read corner to corner.
 * The results below keep the shell's full width.
 */
export const BarComesInToThePanel = story({ open: true, matchWidth: 'shrink' })

/** The narrowed pair held to the left of the shell rather than centred. */
export const BarComesInLeft = story({ open: true, matchWidth: 'shrink', headAlign: 'left' })

/** And to the right. */
export const BarComesInRight = story({ open: true, matchWidth: 'shrink', headAlign: 'right' })

/* ------------------------------------------------------------------ variants */

/** Rows gain a star, and the shell tracks which are pinned. */
export const Pinnable = story({ search: '?v=list', pinnable: true })

/**
 * Every story above is the default theme, which is the minimal one: paper, ink
 * and hairlines, with no hue, no shadow and no rounded corner. What is left
 * holding the layout together is the borders, the surface steps and the type
 * scale — and a status still says which it is in words.
 *
 * `theme="mono-size"` gives up the last of those too, and the palette with
 * it: every word in the shell is set at one size and one weight, the query
 * field included, so the only things separating a preview's heading from the
 * label under it are colour and opacity — and the colour is the host's, this
 * theme taking its surface and ink from the page the way `inherit` does.
 */
export const MonoSizeTheme = story({ search: '?v=list', theme: 'mono-size' })

/**
 * `theme="dark"` is the palette that used to be the default — and, with
 * `light`, what the sliding scale of seeds and tokens was tuned against.
 */
export const DarkTheme = story({ search: '?v=list', theme: 'dark' })

export const LightTheme = story({ search: '?v=list', theme: 'light' })

/** Whichever of those two the viewer's system asks for. */
export const AutoTheme = story({ search: '?v=list', theme: 'auto' })

/**
 * The two themes wearing an operating system's design language rather than the
 * shell's: its typeface, its corner radii, its accent, the shadow it casts —
 * and, like `auto`, whichever of that system's two schemes the viewer is in.
 * Toggle the preview's colour scheme and both follow it.
 */
export const MacosTheme = story({ search: '?v=list', theme: 'macos' })

export const WindowsTheme = story({ search: '?v=list', theme: 'windows' })

export const CustomAccent = story({ search: '?v=list', accent: 'oklch(0.76 0.14 150)' })

/**
 * A whole theme from two tokens. Surfaces, borders, muted text and tinted
 * backgrounds are all derived from the surface and the ink, so moving those
 * moves the palette with them — no token-by-token retheme.
 */
export const ReseededTheme = story({
  search: '?v=list',
  tokens: {
    '--dc-surface': 'oklch(0.21 0.03 300)',
    '--dc-ink': 'oklch(0.95 0.02 300)',
    '--dc-accent': 'oklch(0.8 0.16 340)',
    '--dc-radius': '2px',
    '--dc-radius-sm': '2px',
    '--dc-radius-lg': '3px',
  },
})

/**
 * `theme="inherit"`: no palette at all. The surface goes transparent and the
 * ink becomes `currentColor`, so the shell arrives wearing the host's
 * background, text colour and typeface, with its own tints derived from them.
 */
export const InheritsALightHost = story({ search: '?v=list', theme: 'inherit', host: 'paper' })

/** The same shell, the same code, a dark host. */
export const InheritsADarkHost = story({ search: '?v=list', theme: 'inherit', host: 'slate' })

/**
 * Unthemed, then given one token. An app with its own design system maps its
 * variables onto the shell's seeds and stops there.
 */
export const InheritsWithABrandAccent = story({
  search: '?v=list',
  theme: 'inherit',
  host: 'paper',
  tokens: { '--dc-accent': '#b4441f' },
})

/**
 * A host that would rather open on one entity's list than on home. The whole
 * corpus is still reachable — the panel's "Everything" card writes `e=*`.
 */
export const LandsOnAnEntity = story({
  defaults: { landing: 'entity', entity: 'searches', view: 'list' },
})

/**
 * Not full-screen. The shell fills whatever box it is given and its container
 * queries respond to that box, not the viewport.
 */
export const Embedded = story({ search: '?v=list', inset: true, limit: 12 })
