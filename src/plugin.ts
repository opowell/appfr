import type { App, Plugin } from 'vue'
import DataShell from './components/DataShell.vue'
import FacetControl from './components/FacetControl.vue'
import QueryPanel from './components/QueryPanel.vue'
import RecordActions from './components/RecordActions.vue'
import ResultsArea from './components/ResultsArea.vue'
import SegmentedControl from './components/SegmentedControl.vue'
import ShellHeader from './components/ShellHeader.vue'
import StatusPill from './components/StatusPill.vue'
import WindowFrame from './components/WindowFrame.vue'
import WindowPane from './components/WindowPane.vue'
import CardsView from './components/views/CardsView.vue'
import GridView from './components/views/GridView.vue'
import LinksView from './components/views/LinksView.vue'
import ListView from './components/views/ListView.vue'
import PreviewView from './components/views/PreviewView.vue'
import TableView from './components/views/TableView.vue'
import TypeCardsView from './components/views/TypeCardsView.vue'
import type { RouteAdapter } from './routing/adapter'
import { ROUTE_ADAPTER_KEY } from './routing/adapter'

export interface HeaderContentLayoutOptions {
  /** Prefix for the globally registered component names. */
  prefix?: string
  /**
   * Route adapter every shell in the app should use. Provide the vue-router
   * one here and individual shells need no `route` prop.
   */
  route?: RouteAdapter
}

const COMPONENTS = {
  DataShell,
  ShellHeader,
  QueryPanel,
  RecordActions,
  ResultsArea,
  FacetControl,
  SegmentedControl,
  StatusPill,
  WindowFrame,
  WindowPane,
  ListView,
  CardsView,
  GridView,
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
  },
}

export default plugin
