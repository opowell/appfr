import { ref, shallowRef, watch } from 'vue'
import type { ComputedRef, Ref, ShallowRef } from 'vue'
import type {
  DataSource,
  DomainSchema,
  EntitySchema,
  QueryResult,
  ShellQuery,
} from '../types'
import { emptyFacetState, isPristineQuery } from '../query/schema'
import type { PresentedRow } from './usePresentedRows'
import { presentRow } from './usePresentedRows'

/** One entity type, summarised: what it is, how many, and its latest few. */
export interface EntityPreview {
  entity: EntitySchema
  /** The top rows for this entity under the current sort. */
  rows: PresentedRow[]
  /** Rows of this entity matching the query. */
  total: number
  /**
   * The count to show. An untouched query reports the population the schema
   * publishes; a narrowed one reports how many actually matched.
   */
  count: string
}

export interface UseEntityPreviewsOptions {
  source: ComputedRef<DataSource>
  schema: ComputedRef<DomainSchema>
  query: ComputedRef<ShellQuery>
  entities: ComputedRef<EntitySchema[]>
  /** Rows to show inside each type's card. */
  limit: ComputedRef<number>
  isPinned: (id: string) => boolean
}

export interface EntityPreviewsState {
  previews: ShallowRef<EntityPreview[]>
  pending: Ref<boolean>
  error: ShallowRef<unknown>
  refresh(): void
}

/**
 * Queries each entity separately so the home screen can show a card per type.
 *
 * One query across everything would not do: sorted globally, a quiet entity
 * would contribute no rows at all and its card would come up empty. Each type
 * gets its own top-N instead. The expression, sort and direction carry over —
 * facets do not, since those belong to a single entity.
 */
export function useEntityPreviews(options: UseEntityPreviewsOptions): EntityPreviewsState {
  const previews = shallowRef<EntityPreview[]>([])
  const pending = ref(false)
  const error = shallowRef<unknown>(null)
  let token = 0

  const buildPreview = (entity: EntitySchema, result: QueryResult, pristine: boolean): EntityPreview => ({
    entity,
    rows: result.rows.map((row, index) =>
      presentRow(row, index, entity.labels, options.isPinned(row.id)),
    ),
    total: result.total,
    count: pristine ? entity.count : String(result.total),
  })

  const run = () => {
    const current = ++token
    const query = options.query.value
    const schema = options.schema.value
    const entities = options.entities.value
    const limit = options.limit.value
    const pristine = isPristineQuery(query)

    const requests = entities.map((entity) => ({
      entity,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: options.source.value.query({
        query: { ...query, entity: entity.key, facets: emptyFacetState(entity) },
        schema,
        entity,
        limit,
      }),
    }))

    if (requests.every(({ outcome }) => !(outcome instanceof Promise))) {
      previews.value = requests.map(({ entity, outcome }) =>
        buildPreview(entity, outcome as QueryResult, pristine),
      )
      error.value = null
      pending.value = false
      return
    }

    pending.value = true
    Promise.all(requests.map(({ outcome }) => Promise.resolve(outcome)))
      .then((results) => {
        if (current !== token) return
        previews.value = results.map((result, index) =>
          buildPreview(requests[index]!.entity, result, pristine),
        )
        error.value = null
      })
      .catch((thrown) => {
        if (current !== token) return
        error.value = thrown
        previews.value = []
      })
      .finally(() => {
        if (current === token) pending.value = false
      })
  }

  const guarded = () => {
    try {
      run()
    } catch (thrown) {
      error.value = thrown
      previews.value = []
      pending.value = false
    }
  }

  watch(
    [options.source, options.schema, options.query, options.entities, options.limit],
    guarded,
    { immediate: true },
  )

  return { previews, pending, error, refresh: guarded }
}
