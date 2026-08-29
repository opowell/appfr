import { computed, ref, shallowRef, watch } from 'vue'
import type { ComputedRef, Ref, ShallowRef } from 'vue'
import type {
  DataSource,
  DomainSchema,
  EntitySchema,
  QueryResult,
  ShellQuery,
  ShellRow,
} from '../types'
import { countPages } from '../query/schema'

export interface UseResultsOptions {
  source: ComputedRef<DataSource>
  query: ComputedRef<ShellQuery>
  schema: ComputedRef<DomainSchema>
  /** `null` when the query spans every entity. */
  entity: ComputedRef<EntitySchema | null>
  /** Rows per page — the most the source is asked for at once. */
  limit: ComputedRef<number>
}

export interface ResultsState {
  rows: ShallowRef<ShellRow[]>
  /** Rows matching the query, of which the current page is one `limit`. */
  total: Ref<number>
  /** Rows skipped to reach the current page — where its first row sits. */
  offset: ComputedRef<number>
  /** How many pages of `limit` the total comes to. Never fewer than one. */
  pageCount: ComputedRef<number>
  /** True while an async source is in flight. Never true for a sync source. */
  pending: Ref<boolean>
  error: ShallowRef<unknown>
  refresh(): void
}

/**
 * Runs the current query against the data source.
 *
 * A synchronous source is applied during the same tick, so the first render
 * already has rows — which keeps SSR output complete and lets component tests
 * assert without awaiting. Async sources are sequenced by a token so a slow
 * response can never overwrite a newer one.
 */
export function useResults(options: UseResultsOptions): ResultsState {
  const rows = shallowRef<ShellRow[]>([])
  const total = ref(0)
  const pending = ref(false)
  const error = shallowRef<unknown>(null)
  let token = 0

  const offset = computed(() => (options.query.value.page - 1) * options.limit.value)
  const pageCount = computed(() => countPages(total.value, options.limit.value))

  const apply = (result: QueryResult) => {
    rows.value = result.rows
    total.value = result.total
    error.value = null
  }

  const run = () => {
    const current = ++token
    const request = {
      query: options.query.value,
      schema: options.schema.value,
      entity: options.entity.value,
      limit: options.limit.value,
      offset: offset.value,
    }

    let outcome: QueryResult | Promise<QueryResult>
    try {
      outcome = options.source.value.query(request)
    } catch (thrown) {
      error.value = thrown
      rows.value = []
      total.value = 0
      return
    }

    if (!(outcome instanceof Promise)) {
      apply(outcome)
      pending.value = false
      return
    }

    pending.value = true
    outcome
      .then((result) => {
        if (current !== token) return
        apply(result)
      })
      .catch((thrown) => {
        if (current !== token) return
        error.value = thrown
        rows.value = []
        total.value = 0
      })
      .finally(() => {
        if (current === token) pending.value = false
      })
  }

  watch([options.source, options.query, options.schema, options.entity, options.limit], run, {
    immediate: true,
  })

  return { rows, total, offset, pageCount, pending, error, refresh: run }
}
