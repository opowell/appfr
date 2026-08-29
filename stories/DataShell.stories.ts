import { h } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DataShell from '../src/components/DataShell.vue'
import { delayedSource, failingSource, renderShell, themeArgTypes } from './helpers'
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

/* --------------------------------------------------------------- the views */

export const CardsView = story({ search: '?e=searches&v=cards' })
export const GridView = story({ search: '?e=items&v=grid' })
export const TableView = story({ search: '?e=searches&v=table' })
export const LinksView = story({ search: '?e=items&v=links' })
export const PreviewView = story({ search: '?e=items&v=preview' })

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
 * `theme="mono-size"` gives up the last of those too. Every word in the shell
 * is set at one size and one weight, the query field included, so the only
 * things separating a preview's heading from the label under it are colour
 * and opacity.
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
