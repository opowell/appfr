import { ref, shallowRef } from 'vue'
import type { ComputedRef, Ref, ShallowRef } from 'vue'
import type { DataSource, DomainSchema, EntitySchema, ShellQuery } from '../types'
import { emptyFacetState } from '../query/schema'
import { andExpression } from '../data/expression'
import { withoutOwnScope } from '../query/drill'

/** How many rows of one entity currently match, for the type picker. */
export interface EntityCount {
  /**
   * Rows of this entity matching the query, once resolved — or as many as the
   * source has counted so far, while it is still {@link pending}.
   */
  total: number
  /** Still being counted — {@link total} may yet grow. */
  pending: boolean
  /**
   * Whether {@link total} is anything the source said. False while a count is
   * pending and the source has not yet reported any of it — the `0` then is a
   * placeholder, and a very different thing from having counted none.
   */
  counted: boolean
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
 *
 * A slow count is not left blank until it lands: each request carries a
 * {@link QueryRequest.progress}, and what a source says through it stands as
 * the count, still pending, until the answer replaces it.
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
    let building = true
    for (const entity of entities) {
      // Each count is what choosing that entity would list, which for the
      // type a term of the query names is every one of them, not the one.
      const own = withoutOwnScope(entity, query.expr)
      const expr = within ? andExpression(within, own) : own
      let settled = false
      const land = (count: EntityCount): void => {
        if (current !== token) return
        // Said while the list is still being asked for, it goes into the one
        // about to be published rather than the one it would replace.
        if (building) {
          next.set(entity.key, count)
          return
        }
        const updated = new Map(counts.value)
        updated.set(entity.key, count)
        counts.value = updated
      }
      const outcome = options.source.value.query({
        query: { ...query, entity: entity.key, expr, facets: emptyFacetState(entity), page: 1 },
        schema,
        entity,
        limit: 0,
        offset: 0,
        progress: (total) => {
          // Said after the answer, or by a source answering in the same tick,
          // it would stand over a count that is already whole.
          if (settled) return
          land({ total, pending: true, counted: true })
        },
      })
      if (outcome instanceof Promise) {
        if (!next.has(entity.key)) next.set(entity.key, { total: 0, pending: true, counted: false })
        outcome.then((result) => {
          settled = true
          land({ total: result.total, pending: false, counted: true })
        })
      } else {
        settled = true
        next.set(entity.key, { total: outcome.total, pending: false, counted: true })
      }
    }
    building = false
    counts.value = next
  }

  return { counts, pristine, refresh }
}
