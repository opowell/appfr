import { computed, onScopeDispose, ref, shallowRef, watch } from 'vue'
import type { ComputedRef, Ref, ShallowRef } from 'vue'
import type {
  DataSource,
  DomainSchema,
  EntitySchema,
  QueryRequest,
  QueryResult,
  QuerySink,
  QueryUpdate,
  ShellQuery,
  ShellRow,
} from '../types'
import { countPages, RESULT_FIELDS } from '../query/schema'
import { andExpression } from '../data/expression'

export interface UseResultsOptions {
  source: ComputedRef<DataSource>
  query: ComputedRef<ShellQuery>
  schema: ComputedRef<DomainSchema>
  /** `null` when the query spans every entity. */
  entity: ComputedRef<EntitySchema | null>
  /** Rows per page — the most the source is asked for at once. */
  limit: ComputedRef<number>
  /**
   * An expression the query is read *inside* — the shell's own scope, which
   * the host holds rather than the URL. It is ANDed on to whatever the query
   * asks, so the source is handed one expression and never needs to know that
   * part of it was not typed.
   */
  within?: ComputedRef<string>
}

export interface ResultsState {
  rows: ShallowRef<ShellRow[]>
  /** Rows matching the query, of which the current page is one `limit`. */
  total: Ref<number>
  /** Rows skipped to reach the current page — where its first row sits. */
  offset: ComputedRef<number>
  /** How many pages of `limit` the total comes to. Never fewer than one. */
  pageCount: ComputedRef<number>
  /**
   * True while the source is still working: an async `query` in flight, or a
   * `stream` that has not closed. Never true for a sync source.
   */
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
 * response can never overwrite a newer one, and a streaming source is held to
 * the same rule: its sink stops accepting the moment the query moves on.
 */
export function useResults(options: UseResultsOptions): ResultsState {
  const rows = shallowRef<ShellRow[]>([])
  const total = ref(0)
  const pending = ref(false)
  const error = shallowRef<unknown>(null)
  let token = 0
  /** Teardown for the stream now running, if the source returned one. */
  let stop: (() => void) | null = null

  const offset = computed(() => (options.query.value.page - 1) * options.limit.value)
  const pageCount = computed(() => countPages(total.value, options.limit.value))

  /**
   * The query as the source is asked it: the one in the URL, narrowed by the
   * scope the shell is read inside. Everything else — the header, the panel,
   * the pager — reads the query itself, so the fixed part is never something
   * a reader can lift.
   */
  const asks = (): ShellQuery => {
    const query = options.query.value
    const within = options.within?.value.trim()
    return within ? { ...query, expr: andExpression(within, query.expr) } : query
  }

  const apply = (result: QueryResult) => {
    rows.value = result.rows
    total.value = result.total
    error.value = null
  }

  const failed = (thrown: unknown) => {
    error.value = thrown
    rows.value = []
    total.value = 0
  }

  /**
   * The sink for one request.
   *
   * Its first row-bearing push *replaces* what is on screen and every one
   * after that adds to it. That is what keeps a stream from flashing empty on
   * every paging step or sort: the rows of the query just left stay up until
   * the new query has some of its own, exactly as they do while an async
   * `query` is in flight.
   */
  const sinkFor = (current: number, limit: number): QuerySink => {
    let fresh = true
    const live = () => current === token

    /** Clears the query just left, the first time this one has anything. */
    const begin = () => {
      if (fresh) {
        fresh = false
        rows.value = []
        total.value = 0
      }
      error.value = null
    }

    return {
      get open() {
        return live()
      },
      insert(incoming: ShellRow | ShellRow[], at?: number) {
        if (!live()) return
        const added = Array.isArray(incoming) ? incoming : [incoming]
        // Nothing found is not the same as a push: it must not spend the
        // freshness and clear the rows still on screen.
        if (!added.length) return
        begin()
        const next = [...rows.value]
        // Past the end means the end, and a negative index means the start —
        // the same reading `splice` gives them.
        next.splice(at ?? next.length, 0, ...added)
        // A page is `limit` rows. What an insert pushes off the end is page
        // two's, and a `query` for this page would never have returned it.
        rows.value = limit > 0 ? next.slice(0, limit) : next
        total.value += added.length
      },
      set(update: QueryUpdate) {
        if (!live()) return
        if (update.rows) {
          begin()
          rows.value = limit > 0 ? update.rows.slice(0, limit) : update.rows
          total.value = update.rows.length
        }
        // Stated after, so a source that hands over a page and its real total
        // in one call gets the total it said rather than the page's length.
        if (update.total !== undefined) total.value = update.total
      },
      close() {
        if (live()) pending.value = false
      },
      fail(thrown: unknown) {
        if (!live()) return
        failed(thrown)
        pending.value = false
      },
    }
  }

  /** Ends the stream now running, so a new query starts against nothing. */
  const teardown = () => {
    const previous = stop
    stop = null
    previous?.()
  }

  const run = () => {
    const current = ++token
    // Before the source is asked anything: the token is what closes the last
    // sink, and a teardown that runs after the new stream started would take
    // the new one down with it.
    teardown()

    const request: QueryRequest = {
      query: asks(),
      schema: options.schema.value,
      entity: options.entity.value,
      limit: options.limit.value,
      offset: offset.value,
    }

    const source = options.source.value

    if (source.stream) {
      // True first, so a stream that finds everything synchronously and closes
      // inside the call still ends up not pending.
      pending.value = true
      try {
        stop = source.stream(request, sinkFor(current, request.limit)) ?? null
      } catch (thrown) {
        failed(thrown)
        pending.value = false
      }
      return
    }

    let outcome: QueryResult | Promise<QueryResult>
    try {
      outcome = source.query(request)
    } catch (thrown) {
      failed(thrown)
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
        failed(thrown)
      })
      .finally(() => {
        if (current === token) pending.value = false
      })
  }

  /**
   * What the source is actually being asked: the query fields that decide
   * which rows match and in what order, plus the page cut out of them.
   *
   * Watching this rather than the whole query is what keeps a view switch from
   * re-running it. The same rows drawn as a table are the same rows, and for a
   * source that streams, re-running would mean restarting a crawl to change
   * how its results are drawn.
   */
  const asked = computed(() => {
    const query = asks()
    return `${JSON.stringify(RESULT_FIELDS.map((field) => query[field]))}|${query.page}`
  })

  watch([options.source, asked, options.schema, options.entity, options.limit], run, {
    immediate: true,
  })

  /*
   * A stream outlives a render, so it has to be ended when the shell goes.
   * Silent where there is no scope to hang it on: this composable is exported,
   * and a host calling it outside a component is not making a mistake.
   */
  onScopeDispose(() => {
    token++
    teardown()
  }, true)

  return { rows, total, offset, pageCount, pending, error, refresh: run }
}
