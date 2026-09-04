import { computed, toValue } from 'vue'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type {
  DomainSchema,
  EntitySchema,
  FacetState,
  FacetValue,
  ShellQuery,
  ShellQueryDefaults,
  SortDef,
  ViewKind,
} from '../types'
import type { RouteAdapter } from '../routing/adapter'
import { parseQuery, serializeQuery } from '../query/codec'
import {
  changesResults,
  defaultQuery,
  emptyFacetState,
  findEntity,
  findSort,
  focusEntity,
  hasActiveFacets,
  isPristineQuery,
  reconcileFacets,
  sortsFor,
} from '../query/schema'
import type { SummaryTerm } from '../query/summary'
import { ENTITY_TERM, EXPRESSION_TERM, summarizeQuery, summaryTerms } from '../query/summary'
import { formatExpression, parseExpression, withoutTerm } from '../data/expression'

export type NavigationMode = 'push' | 'replace'

export interface UseQueryStateOptions {
  schema: MaybeRefOrGetter<DomainSchema>
  adapter: RouteAdapter
  defaults?: MaybeRefOrGetter<ShellQueryDefaults | undefined>
  /**
   * How a change to the entity, view, sort or committed expression navigates.
   * These are destinations someone may want to come back to, so they push by
   * default.
   */
  navigationMode?: MaybeRefOrGetter<NavigationMode>
  /**
   * How an individual facet edit navigates. Adjusting facets is exploratory
   * and one history entry per chip makes the back button useless, so these
   * replace by default.
   */
  facetNavigationMode?: MaybeRefOrGetter<NavigationMode>
}

export interface QueryState {
  /** The live query, derived from the URL. */
  query: ComputedRef<ShellQuery>
  /** The entity the query is scoped to, or `null` for the whole corpus. */
  entity: ComputedRef<EntitySchema | null>
  /**
   * The entity the panel configures. Equals {@link QueryState.entity} when one
   * is selected, and the host's nominated entity otherwise, so the home
   * screen's search box has somewhere to go.
   */
  focus: ComputedRef<EntitySchema>
  sort: ComputedRef<SortDef>
  sorts: ComputedRef<SortDef[]>
  /** One-line description of the query, as shown in the header. */
  summary: ComputedRef<string>
  /** The individually removable terms behind that summary. */
  terms: ComputedRef<SummaryTerm[]>
  /** True on the home screen: no entity, no facets, no expression. */
  isPristine: ComputedRef<boolean>
  /** True when no entity filter is applied — every entity is in the results. */
  isEverything: ComputedRef<boolean>
  hasFacets: ComputedRef<boolean>

  /** Filters to one entity, or back to the whole corpus with `null`. */
  setEntity(key: string | null): void
  /** Clears the entity filter — back to everything. */
  clearEntity(): void
  setView(view: ViewKind): void
  setSort(key: string): void
  toggleDirection(): void
  setExpression(expr: string): void
  /**
   * The expression *and* the entity to list, in one navigation.
   *
   * Calling {@link QueryState.setExpression} and {@link QueryState.setEntity}
   * in turn would not do it: each serialises from the query the URL currently
   * holds, and a route change is not synchronous — so the second would write
   * over the first before it had arrived. This is what narrowing to a record
   * needs, since that is both at once.
   */
  narrow(expr: string, entityKey: string | null): void
  /**
   * Moves to a page of the current results, 1-based and clamped there. What
   * the last page is depends on a count this composable has no sight of — the
   * shell knows it, from the total its source reported, and offers the control
   * accordingly; `mode` is how it corrects a page past the end, which replaces
   * rather than pushes so the back button does not lead straight back to it.
   */
  setPage(page: number, mode?: NavigationMode): void
  setFacet(key: string, value: FacetValue): void
  toggleChip(key: string, option: string): void
  setRange(key: string, min: number | null, max: number | null): void
  toggleFlag(key: string): void
  removeTerm(term: SummaryTerm): void
  /** Clears the entity filter, the expression and every facet. */
  clearFilters(): void
  /** Returns everything to the schema's defaults — the home screen. */
  reset(): void
  /** The `href` a given query change would navigate to. */
  hrefFor(patch: Partial<ShellQuery>): string
}

/**
 * Holds the shell's query in the URL and nowhere else.
 *
 * The query is a `computed` over the route's search string, so the address bar
 * is the single source of truth: a mutation serialises and navigates, and the
 * new state arrives back through the same derivation. Back, forward, reload
 * and a pasted link all behave identically because they are the same path.
 */
export function useQueryState(options: UseQueryStateOptions): QueryState {
  const { adapter } = options
  const schema = computed(() => toValue(options.schema))
  const defaults = computed(() => toValue(options.defaults) ?? {})

  const query = computed(() => parseQuery(adapter.search.value, schema.value, defaults.value))
  const entity = computed(() => findEntity(schema.value, query.value.entity))
  const focus = computed(() => entity.value ?? focusEntity(schema.value, defaults.value))
  const sorts = computed(() => sortsFor(entity.value, schema.value))
  const sort = computed(() => findSort(entity.value, query.value.sort, schema.value))

  const navigate = (next: ShellQuery, mode: NavigationMode) => {
    const search = serializeQuery(next, schema.value, defaults.value, adapter.search.value)
    if (search === adapter.search.value) return
    if (mode === 'push') adapter.push(search)
    else adapter.replace(search)
  }

  const primaryMode = () => toValue(options.navigationMode) ?? 'push'
  const facetMode = () => toValue(options.facetNavigationMode) ?? 'replace'

  /**
   * Applies a change to the query, returning to the first page whenever the
   * change is to what matched — a page is a position in a result set, and a
   * different result set makes the position meaningless. A patch that names a
   * page is saying where to go, so it is left alone.
   */
  const commit = (patch: Partial<ShellQuery>, mode: NavigationMode) => {
    const page = patch.page ?? (changesResults(patch) ? 1 : query.value.page)
    navigate({ ...query.value, ...patch, page }, mode)
  }

  const patchFacets = (key: string, produce: (current: FacetValue) => FacetValue) => {
    const current = query.value.facets[key]
    if (!current) return
    const facets: FacetState = { ...query.value.facets, [key]: produce(current) }
    commit({ facets }, facetMode())
  }

  /**
   * What changing the listed entity does to the rest of the query. A different
   * entity has different facets and its own sort set, so only what still
   * applies is carried over and the URL stays self-consistent.
   *
   * Empty when the entity is already that one, so a caller can spread it into
   * a larger patch without it clearing facets that were never going to change.
   */
  const entityPatch = (key: string | null): Partial<ShellQuery> => {
    const next = key === null ? null : findEntity(schema.value, key)
    if ((next?.key ?? null) === query.value.entity) return {}
    return {
      entity: next?.key ?? null,
      sort: findSort(next, query.value.sort, schema.value).key,
      facets: emptyFacetState(next),
    }
  }

  const setEntity = (key: string | null) => {
    const patch = entityPatch(key)
    if (!Object.keys(patch).length) return
    commit(patch, primaryMode())
  }

  return {
    query,
    entity,
    focus,
    sort,
    sorts,
    summary: computed(() => summarizeQuery(query.value, entity.value, schema.value)),
    terms: computed(() => summaryTerms(query.value, entity.value)),
    isPristine: computed(() => isPristineQuery(query.value)),
    isEverything: computed(() => query.value.entity === null),
    hasFacets: computed(() => hasActiveFacets(query.value.facets)),

    setEntity,
    clearEntity: () => setEntity(null),
    setView(view) {
      commit({ view }, primaryMode())
    },
    setSort(key) {
      commit({ sort: findSort(entity.value, key, schema.value).key }, primaryMode())
    },
    toggleDirection() {
      commit({ dir: query.value.dir === 'desc' ? 'asc' : 'desc' }, primaryMode())
    },
    setExpression(expr) {
      commit({ expr }, primaryMode())
    },
    narrow(expr, entityKey) {
      commit({ expr, ...entityPatch(entityKey) }, primaryMode())
    },
    setPage(page, mode) {
      commit({ page: Math.max(1, Math.floor(page)) }, mode ?? primaryMode())
    },
    setFacet(key, value) {
      patchFacets(key, () => value)
    },
    toggleChip(key, option) {
      patchFacets(key, (current) => {
        if (current.kind !== 'chips') return current
        const selected = current.selected.includes(option)
          ? current.selected.filter((item) => item !== option)
          : [...current.selected, option]
        return { kind: 'chips', selected }
      })
    },
    setRange(key, min, max) {
      patchFacets(key, (current) => (current.kind === 'range' ? { kind: 'range', min, max } : current))
    },
    toggleFlag(key) {
      patchFacets(key, (current) =>
        current.kind === 'toggle' ? { kind: 'toggle', on: !current.on } : current,
      )
    },
    removeTerm(term) {
      // The entity filter is a term like any other, so lifting it widens the
      // results back out to every entity rather than doing something special.
      if (term.facetKey === ENTITY_TERM) {
        setEntity(null)
        return
      }
      // A part of the expression is lifted by writing the expression back
      // without it. What returns is normalized rather than the text as typed —
      // the parse keeps neither case nor spacing — which is the price of the
      // expression being a set of parts rather than a string.
      if (term.facetKey === EXPRESSION_TERM) {
        const rest = withoutTerm(parseExpression(query.value.expr), term.group ?? 0, term.index ?? 0)
        commit({ expr: formatExpression(rest) }, primaryMode())
        return
      }
      patchFacets(term.facetKey, (current) => {
        if (current.kind === 'chips' && term.option) {
          return { kind: 'chips', selected: current.selected.filter((o) => o !== term.option) }
        }
        if (current.kind === 'range') return { kind: 'range', min: null, max: null }
        if (current.kind === 'toggle') return { kind: 'toggle', on: false }
        return current
      })
    },
    clearFilters() {
      commit({ entity: null, expr: '', facets: emptyFacetState(null) }, primaryMode())
    },
    reset() {
      navigate(defaultQuery(schema.value, defaults.value), primaryMode())
    },
    hrefFor(patch) {
      const next = { ...query.value, ...patch }
      // The same rule the mutations follow, so a link built for a change goes
      // exactly where clicking through to that change would have gone.
      next.page = patch.page ?? (changesResults(patch) ? 1 : query.value.page)
      // Keep the facets legal for whichever entity the patch lands on.
      next.facets = reconcileFacets(findEntity(schema.value, next.entity), next.facets)
      return `${adapter.path.value}${serializeQuery(next, schema.value, defaults.value, adapter.search.value)}`
    },
  }
}
