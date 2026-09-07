/*
 * The tokens stylesheet is pulled in by `DataShell.vue` itself rather than
 * here: a CSS import from the type-bearing entry point ends up in the emitted
 * `.d.ts` as a module consumers cannot resolve. Built output still collects
 * every rule into a single `style.css` — see the README on importing it.
 */

/* Components */
export { default as DataShell } from './components/DataShell.vue'
export { default as ShellHeader } from './components/ShellHeader.vue'
export { default as QueryPanel } from './components/QueryPanel.vue'
export { default as RecordActions } from './components/RecordActions.vue'
export { default as ResultsArea } from './components/ResultsArea.vue'
export { default as FacetControl } from './components/FacetControl.vue'
export { default as SegmentedControl } from './components/SegmentedControl.vue'
export { default as MenuBar } from './components/MenuBar.vue'
export { default as MenuButton } from './components/MenuButton.vue'
export { default as MenuList } from './components/MenuList.vue'
export { default as StatusPill } from './components/StatusPill.vue'

/* Window */
export { default as WindowFrame } from './components/WindowFrame.vue'
/* `WindowNode.vue`, the recursive node renderer, `WindowFloat.vue`, one frame
   of a float, and `WindowGlyph.vue`, the mark inside a window control, are
   implementation details of the frame — and their names belong to the tree
   types below. */
export { default as WindowPane } from './components/WindowPane.vue'

/* Views */
export { default as ListView } from './components/views/ListView.vue'
export { default as TypeCardsView } from './components/views/TypeCardsView.vue'
export { default as CardsView } from './components/views/CardsView.vue'
export { default as GridView } from './components/views/GridView.vue'
export { default as TableView } from './components/views/TableView.vue'
export { default as LinksView } from './components/views/LinksView.vue'
export { default as PreviewView } from './components/views/PreviewView.vue'
export { default as PinStar } from './components/views/PinStar.vue'
export { default as SelectTick } from './components/views/SelectTick.vue'
export { default as ScopeMark } from './components/views/ScopeMark.vue'
export { default as MetricDrill } from './components/views/MetricDrill.vue'
export { default as ColumnCell } from './components/views/ColumnCell.vue'

/* Composables */
export { provideShellContext, useShellContext, SHELL_CONTEXT_KEY } from './composables/context'
export type { ShellContext } from './composables/context'
export { useQueryState } from './composables/useQueryState'
export type { NavigationMode, QueryState, UseQueryStateOptions } from './composables/useQueryState'
export { useResults } from './composables/useResults'
export type { ResultsState, UseResultsOptions } from './composables/useResults'
export { presentParts, presentRow, usePresentedRows } from './composables/usePresentedRows'
export type { PresentedRow, RowMetric, RowParts } from './composables/usePresentedRows'
export { useColumns } from './composables/useColumns'
export { useEntityPreviews } from './composables/useEntityPreviews'
export { useRecordNames } from './composables/useRecordNames'
export type { RecordNamesState, UseRecordNamesOptions } from './composables/useRecordNames'
export type {
  EntityPreview,
  EntityPreviewsState,
  UseEntityPreviewsOptions,
} from './composables/useEntityPreviews'

/* Window model */
export {
  activePanel,
  activeTab,
  axisOf,
  cascade,
  CASCADE_STEP,
  clampRect,
  collapseSpace,
  collapseToTabs,
  column,
  defaultLayout,
  DEFAULT_FRAME,
  dropIntoSpace,
  fixedView,
  float,
  floatPanel,
  floatSplit,
  floatTabs,
  frame,
  frameAt,
  frameOf,
  framePathOf,
  frontPanel,
  group,
  groupOf,
  groups,
  hasPanel,
  headless,
  insertPanel,
  isFloat,
  isGroup,
  isMaximized,
  isMinimized,
  isPanelTab,
  isSplit,
  isTabOf,
  maximizeFrame,
  maximizeFrameAt,
  mergeSpace,
  MIN_FRAME,
  MINIMIZED_GAP,
  MINIMIZED_HEIGHT,
  MINIMIZED_WIDTH,
  minimizeFrame,
  minimizeFrameAt,
  movePanel,
  moveTab,
  nodeAt,
  nodeTitle,
  normalizeLayout,
  normalizeSizes,
  onlySpace,
  panelIds,
  panelNode,
  panelTabs,
  raisedPath,
  raiseFrame,
  raiseFrameAt,
  reconcileLayout,
  removePanel,
  replaceAt,
  resizeRect,
  resizeSplit,
  rootSpace,
  row,
  setActivePanel,
  setFrameRect,
  setFrameRectAt,
  setSizesAt,
  setSplitDirection,
  sizesOf,
  spaceChrome,
  spaceTitle,
  split,
  spreadTabs,
  swapPanels,
  tabNode,
  tabPanels,
  tileFloat,
  toFloat,
  toggleMaximized,
  toggleMinimized,
  toTiled,
} from './window/layout'
export type {
  DropEdge,
  FloatFrame,
  FloatRect,
  FrameChange,
  FrameGrip,
  FrameHandle,
  PanelMove,
  SplitDirection,
  SplitEdge,
  WindowFloat,
  WindowGroup,
  WindowNode,
  WindowPanelDef,
  WindowSpace,
  WindowSplit,
  WindowTab,
  WindowView,
} from './window/types'
/* Menu model */
export { isChoosable } from './menu/types'
export type { MenuAnchor, MenuItemDef } from './menu/types'

export {
  provideWindowContext,
  useWindowContext,
  WINDOW_CONTEXT_KEY,
} from './composables/windowContext'
export type { DropTarget, MoveDirection, WindowContext } from './composables/windowContext'
export {
  PANE_CONTEXT_KEY,
  providePaneContext,
  usePaneContext,
  usePaneMenu,
} from './composables/paneMenu'
export type { PaneContext } from './composables/paneMenu'

/* Query model */
export {
  ENTITY_ALL,
  FACET_PREFIX,
  PARAM_DIR,
  PARAM_ENTITY,
  PARAM_EXPR,
  PARAM_PAGE,
  PARAM_SORT,
  PARAM_VIEW,
  parseQuery,
  serializeQuery,
} from './query/codec'
export {
  changesResults,
  countPages,
  DEFAULT_SORT,
  DEFAULT_VIEW,
  defaultQuery,
  emptyFacetState,
  emptyFacetValue,
  findEntity,
  findSort,
  focusEntity,
  hasActiveFacets,
  isEntityScoped,
  isFacetActive,
  isPristineQuery,
  isTypeCardsQuery,
  isViewKind,
  reconcileFacets,
  resolveView,
  RESULT_FIELDS,
  sortsFor,
  VIEW_LABELS,
} from './query/schema'
export {
  cellFull,
  cellText,
  cellTextOf,
  cellValue,
  columnAlign,
  columnClass,
  columnKey,
  columnsFor,
  columnTruncates,
  defaultCellText,
  EMPTY_CELL,
  roleColumn,
  roleColumns,
  rowKey,
} from './query/columns'
export {
  addTerm,
  drillExpression,
  recordTerm,
  scopedEntity,
  scopeTerm,
  scopeTermFor,
} from './query/drill'
export { ENTITY_TERM, EXPRESSION_TERM, summarizeQuery, summaryTerms } from './query/summary'
export type { SummaryTerm } from './query/summary'

/* Routing */
export { normalizeSearch, ROUTE_ADAPTER_KEY } from './routing/adapter'
export type { RouteAdapter } from './routing/adapter'
export { createHistoryAdapter } from './routing/history'
export { createMemoryAdapter } from './routing/memory'
export type { MemoryAdapter } from './routing/memory'
export { createVueRouterAdapter } from './routing/vueRouter'
export type { RouterLike } from './routing/vueRouter'

/* Data */
export { createMockDataSource, generateRows, matchesFacets, MOCK_TINTS } from './data/mock'
export type { MockSourceOptions } from './data/mock'
export {
  formatExpression,
  formatTerm,
  joinExpression,
  matchesExpression,
  parseExpression,
  splitExpression,
  withoutTerm,
} from './data/expression'
export type {
  Comparator,
  Expression,
  ExpressionSplit,
  FieldTerm,
  Term,
  TextTerm,
} from './data/expression'
export { fnv1a, formatCount, formatDate, formatMetric, formatOrdinal } from './data/format'

/* Types */
export {
  COLUMN_BREAKPOINTS,
  COLUMN_ROLES,
  RECORD_STATUSES,
  SHELL_THEMES,
  VIEW_KINDS,
} from './types'
export type {
  ChipsFacet,
  ColumnAlign,
  ColumnBreakpoint,
  ColumnDef,
  ColumnKind,
  ColumnRole,
  DataSource,
  DomainSchema,
  EntitySchema,
  FacetDef,
  FacetState,
  FacetValue,
  QueryRequest,
  QueryResult,
  QuerySink,
  QueryUpdate,
  RangeFacet,
  RecordStatus,
  Selection,
  ShellAlign,
  ShellQuery,
  ShellQueryDefaults,
  ShellRow,
  ShellTheme,
  ShellWidthMatch,
  SortDef,
  SortDirection,
  StreamingDataSource,
  SyncDataSource,
  ToggleFacet,
  ViewKind,
} from './types'

export { default as HeaderContentLayoutPlugin } from './plugin'
