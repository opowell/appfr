import type {
  ColumnDef,
  DomainSchema,
  EntitySchema,
  FacetDef,
  FacetState,
  FacetValue,
  ShellQuery,
  ShellQueryDefaults,
  SortDef,
  ViewKind,
} from '../types'
import { VIEW_KINDS } from '../types'

/**
 * Cards. On the home screen — where no entity is filtered to — that means a
 * card per item type rather than per record: what each type is, how many of it
 * there are, and its most recently updated few.
 */
export const DEFAULT_VIEW: ViewKind = 'cards'
export const DEFAULT_SORT = 'updated'

export function isViewKind(value: unknown): value is ViewKind {
  return typeof value === 'string' && (VIEW_KINDS as readonly string[]).includes(value)
}

/** The entity a key names, or `null` when it names none. */
export function findEntity(schema: DomainSchema, key: string | null | undefined): EntitySchema | null {
  if (!key) return null
  return schema.entities.find((entity) => entity.key === key) ?? null
}

/**
 * The entity the query panel configures. With no entity selected there is
 * still one in focus — the schema's first, or whichever the host nominated —
 * so the panel and the home screen's search box have somewhere to go.
 */
export function focusEntity(schema: DomainSchema, defaults: ShellQueryDefaults = {}): EntitySchema {
  const nominated = findEntity(schema, defaults.entity)
  const first = schema.entities[0]
  if (!nominated && !first) throw new Error(`Schema "${schema.key}" declares no entities`)
  return nominated ?? (first as EntitySchema)
}

/**
 * The columns an ordering can be read out of: the entity's own where one is
 * filtered to, and the schema's across every entity — where no one type's
 * columns describe the rows, exactly as the table finds its headings.
 */
export function columnsForSort(
  entity: EntitySchema | null,
  schema: DomainSchema | null = null,
): ColumnDef[] {
  return entity?.columns ?? schema?.columns ?? []
}

/**
 * The sorts on offer: one per column that names a {@link ColumnDef.sort},
 * labelled with that column's own heading, in the order the schema declared
 * them. A column is what knows both what it holds and what ordering it means,
 * so the panel and the table headers are offering one list rather than two.
 *
 * An entity may state its own set instead, for an ordering no column shows.
 */
export function sortsFor(
  entity: EntitySchema | null,
  schema: DomainSchema | null = null,
): SortDef[] {
  if (entity?.sorts?.length) return entity.sorts
  const seen = new Set<string>()
  const sorts: SortDef[] = []
  for (const column of columnsForSort(entity, schema)) {
    if (!column.sort || seen.has(column.sort)) continue
    seen.add(column.sort)
    sorts.push({ key: column.sort, label: (column.label ?? column.sort).toLowerCase() })
  }
  return sorts
}

/** The ordering a query falls back to, where the columns offer it. */
const FALLBACK_SORT: SortDef = { key: DEFAULT_SORT, label: DEFAULT_SORT }

/**
 * The sort a key names.
 *
 * Falling back to the recency sort rather than to the first declared, because
 * the first column of a set is the identity and landing on a corpus ordered
 * A-to-Z says less than landing on what changed last. Where nothing is
 * offered at all — a type with no columns — the key stands on its own, so a
 * URL and a request still say something a source can act on.
 */
export function findSort(
  entity: EntitySchema | null,
  key: string | undefined,
  schema: DomainSchema | null = null,
): SortDef {
  const sorts = sortsFor(entity, schema)
  const found = key ? sorts.find((sort) => sort.key === key) : undefined
  return (
    found ??
    sorts.find((sort) => sort.key === DEFAULT_SORT) ??
    sorts[0] ??
    FALLBACK_SORT
  )
}

/** The neutral value for a facet — the state in which it narrows nothing. */
export function emptyFacetValue(facet: FacetDef): FacetValue {
  switch (facet.kind) {
    case 'chips':
      return { kind: 'chips', selected: [] }
    case 'range':
      return { kind: 'range', min: null, max: null }
    case 'toggle':
      return { kind: 'toggle', on: false }
  }
}

export function emptyFacetState(entity: EntitySchema | null): FacetState {
  const state: FacetState = {}
  for (const facet of entity?.facets ?? []) state[facet.key] = emptyFacetValue(facet)
  return state
}

export function isFacetActive(value: FacetValue | undefined): boolean {
  if (!value) return false
  switch (value.kind) {
    case 'chips':
      return value.selected.length > 0
    case 'range':
      return value.min !== null || value.max !== null
    case 'toggle':
      return value.on
  }
}

export function hasActiveFacets(facets: FacetState): boolean {
  return Object.values(facets).some(isFacetActive)
}

/**
 * True when nothing narrows the corpus: no entity chosen, no facets, no
 * expression. This is the home screen.
 */
export function isPristineQuery(query: ShellQuery): boolean {
  return (
    query.entity === null && query.expr.trim() === '' && !hasActiveFacets(query.facets)
  )
}

/** True when an entity has been picked out of the whole corpus. */
export function isEntityScoped(query: ShellQuery): boolean {
  return query.entity !== null
}

/**
 * True when the results are a card per *type* rather than per record — cards
 * with no entity filter, which is the home screen. Those cards run their own
 * per-entity queries, so the shell's single result set is not what is on
 * screen and nothing pages through it.
 */
export function isTypeCardsQuery(query: ShellQuery): boolean {
  return query.entity === null && query.view === 'cards'
}

/**
 * How many pages of `limit` rows `total` rows come to. Always at least one:
 * an empty result set is one empty page, not none.
 */
export function countPages(total: number, limit: number): number {
  if (limit <= 0) return 1
  return Math.max(1, Math.ceil(total / limit))
}

/**
 * The query an empty URL means. By default that is the home screen: every
 * entity, nothing filtered, in the preview view. A host can land on a single
 * entity's list instead with `landing: 'entity'`.
 */
export function defaultQuery(schema: DomainSchema, defaults: ShellQueryDefaults = {}): ShellQuery {
  const landsOnEntity = defaults.landing === 'entity'
  const entity = landsOnEntity ? focusEntity(schema, defaults) : null
  return {
    entity: entity?.key ?? null,
    view: defaults.view && isViewKind(defaults.view) ? defaults.view : DEFAULT_VIEW,
    sort: findSort(entity, defaults.sort).key,
    dir: defaults.dir === 'asc' ? 'asc' : 'desc',
    expr: '',
    facets: emptyFacetState(entity),
    page: 1,
  }
}

/**
 * The query fields that decide *which* rows matched and in what order. A
 * change to any of them makes the page someone was on a position in a result
 * set that no longer exists, so the shell returns to the first page. `view` is
 * deliberately not among them: the same rows drawn another way are still the
 * same rows, and page 3 of them is still page 3.
 */
export const RESULT_FIELDS = ['entity', 'sort', 'dir', 'expr', 'facets'] as const

/** True when a patch touches any of {@link RESULT_FIELDS}. */
export function changesResults(patch: Partial<ShellQuery>): boolean {
  return RESULT_FIELDS.some((field) => field in patch)
}

/**
 * Drops facet values the entity does not declare and fills in the ones it
 * does. Called after every parse and on every entity change, so a stale or
 * hand-edited URL can never put the shell into a state its schema disallows.
 * With no entity selected there are no per-entity facets to keep.
 */
export function reconcileFacets(entity: EntitySchema | null, facets: FacetState): FacetState {
  const next: FacetState = {}
  for (const facet of entity?.facets ?? []) {
    const current = facets[facet.key]
    next[facet.key] = current && current.kind === facet.kind ? current : emptyFacetValue(facet)
  }
  return next
}
