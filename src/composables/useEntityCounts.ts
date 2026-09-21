import { ref, shallowRef } from 'vue'
import type { ComputedRef, Ref, ShallowRef } from 'vue'
import type { DataSource, DomainSchema, EntitySchema, ShellQuery } from '../types'
import { emptyFacetState } from '../query/schema'
import { andExpression } from '../data/expression'
import { withoutOwnScope } from '../query/drill'

/** How many rows of one entity currently match, for the type picker. */
export interface EntityCount {
  /** Rows of this entity matching the query, once resolved. */
  total: number
  /** Still being counted — {@link total} may yet grow. */
  pending: boolean
}

export interface UseEntityCountsOptions {
  source: ComputedRef<DataSource>
  schema: ComputedRef<DomainSchema>
  query: ComputedRef<ShellQuery>
  entities: ComputedRef<EntitySchema[]>
  /** An expression every count is read inside — see {@link UseResultsOptions.within}. */
  within?: ComputedRef<string>
}

export interface EntityCountsState {
  /** Keyed by {@link EntitySchema.key}. Empty until {@link refresh} has run. */
  counts: ShallowRef<Map<string, EntityCount>>
  /**
   * Whether the query behind the last {@link refresh} narrowed nothing but
   * the type listed — a caller then has nothing truer to show than each
   * entity's own population. The type in force is no narrowing of the others,
   * and its facets are its own (see {@link refresh}), so only an expression,
   * or a scope the whole shell is read inside, makes a count worth reading.
   */
  pristine: Ref<boolean>
  /** Counts every entity against the query as it stands right now. */
  refresh(): void
}

/**
 * Counts each entity separately against the current query, for the type
 * picker's dropdown — the same per-entity fan-out {@link useEntityPreviews}
 * runs for the home screen's cards, but asking each entity for a total alone
 * (`limit: 0`) rather than a page of rows to show.
 *
 * Left for the caller to trigger rather than watched: a scan of a large entity
 * is real work, and the picker is open far less often than the query changes
 * underneath it. {@link refresh} is meant to be called as the picker opens.
 */
export function useEntityCounts(options: UseEntityCountsOptions): EntityCountsState {
  const counts = shallowRef<Map<string, EntityCount>>(new Map())
  const pristine = ref(true)
  let token = 0

  const refresh = (): void => {
    const current = ++token
    const query = options.query.value
    const schema = options.schema.value
    const entities = options.entities.value
    const within = options.within?.value.trim() ?? ''
    pristine.value = query.expr.trim() === '' && !within
    const next = new Map<string, EntityCount>()
    for (const entity of entities) {
      // Each count is what choosing that entity would list, which for the
      // type a term of the query names is every one of them, not the one.
      const own = withoutOwnScope(entity, query.expr)
      const expr = within ? andExpression(within, own) : own
      const outcome = options.source.value.query({
        query: { ...query, entity: entity.key, expr, facets: emptyFacetState(entity), page: 1 },
        schema,
        entity,
        limit: 0,
        offset: 0,
      })
      if (outcome instanceof Promise) {
        next.set(entity.key, { total: 0, pending: true })
        outcome.then((result) => {
          if (current !== token) return
          const settled = new Map(counts.value)
          settled.set(entity.key, { total: result.total, pending: false })
          counts.value = settled
        })
      } else {
        next.set(entity.key, { total: outcome.total, pending: false })
      }
    }
    counts.value = next
  }

  return { counts, pristine, refresh }
}
