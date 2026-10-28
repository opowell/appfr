import type { App, Plugin } from 'vue'
import DataShell from './components/DataShell.vue'
import RecordActions from './components/RecordActions.vue'
import ResultsArea from './components/ResultsArea.vue'
import SegmentedControl from './components/SegmentedControl.vue'
import ShellHeader from './components/ShellHeader.vue'
import StatusPill from './components/StatusPill.vue'
import CardsView from './components/views/CardsView.vue'
import GridView from './components/views/GridView.vue'
import ImagesView from './components/views/ImagesView.vue'
import LinksView from './components/views/LinksView.vue'
import ListView from './components/views/ListView.vue'
import PreviewView from './components/views/PreviewView.vue'
import TableView from './components/views/TableView.vue'
import TypeCardsView from './components/views/TypeCardsView.vue'
import type { RouteAdapter } from './routing/adapter'
import { ROUTE_ADAPTER_KEY } from './routing/adapter'
import { provideShellTheme } from './composables/useLayerTheme'
import type { ShellTheme } from 'themes'

export interface HeaderContentLayoutOptions {
  /** Prefix for the globally registered component names. */
  prefix?: string
  /**
   * Route adapter every shell in the app should use. Provide the vue-router
   * one here and individual shells need no `route` prop.
   */
  route?: RouteAdapter
  /**
   * The theme dialogs, toasts and popovers wear where nothing nearer says —
   * one written beside a shell rather than inside it, or in no shell at all.
   * Shells themselves are still themed by their own `theme` prop.
   */
  theme?: ShellTheme
  /** The accent those layers wear, as `theme` above. */
  accent?: string
  /** Design tokens for those layers, as `theme` above. */
  tokens?: Record<string, string>
}

const COMPONENTS = {
  DataShell,
  ShellHeader,
  RecordActions,
  ResultsArea,
  SegmentedControl,
  StatusPill,
  ListView,
  CardsView,
  GridView,
  ImagesView,
  TableView,
  LinksView,
  PreviewView,
  TypeCardsView,
}

/**
 * Registers every component globally. Optional — importing `DataShell`
 * directly is the smaller default. Reach for this when the shell is used
 * across many templates, or to set one route adapter app-wide.
 */
const plugin: Plugin<[HeaderContentLayoutOptions?]> = {
  install(app: App, options: HeaderContentLayoutOptions = {}) {
    const prefix = options.prefix ?? ''
    for (const [name, component] of Object.entries(COMPONENTS)) {
      app.component(`${prefix}${name}`, component)
    }
    if (options.route) app.provide(ROUTE_ADAPTER_KEY, options.route)
    if (options.theme || options.accent || options.tokens) {
      provideShellTheme({ theme: options.theme, accent: options.accent, tokens: options.tokens }, app)
    }
  },
}

export default plugin
