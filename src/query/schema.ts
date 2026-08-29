import type {
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
 * Sort options. Across every entity the metric columns have no single name, so
 * the metric sorts are labelled generically; inside one entity each takes that
 * entity's own column name.
 */
export function sortsFor(entity: EntitySchema | null): SortDef[] {
  if (entity?.sorts?.length) return entity.sorts
  return [
    { key: 'updated', label: 'updated' },
    { key: 'score', label: 'score' },
    { key: 'metric1', label: entity ? entity.labels.metric1.toLowerCase() : 'value' },
    { key: 'metric2', label: entity ? entity.labels.metric2.toLowerCase() : 'second value' },
    { key: 'name', label: 'name' },
  ]
}

export function findSort(entity: EntitySchema | null, key: string | undefined): SortDef {
  const sorts = sortsFor(entity)
  const found = key ? sorts.find((sort) => sort.key === key) : undefined
  return found ?? (sorts[0] as SortDef)
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
  }
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
