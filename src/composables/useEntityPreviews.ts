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
import { addTerm, scopeTermFor } from '../query/drill'
import { andExpression } from '../data/expression'
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
  /**
   * Whether the whole of what this type matched is the one record the query
   * already names — see {@link namesItsOnlyRow}. Such a card says nothing the
   * header has not said, so the home screen leaves it off.
   */
  pinned: boolean
}

export interface UseEntityPreviewsOptions {
  source: ComputedRef<DataSource>
  schema: ComputedRef<DomainSchema>
  query: ComputedRef<ShellQuery>
  entities: ComputedRef<EntitySchema[]>
  /** Rows to show inside each type's card. */
  limit: ComputedRef<number>
  /**
   * An expression every card is read inside — see {@link UseResultsOptions.within}.
   * A card's count is then how many of its type are in *that* scope, which is
   * why a scoped shell never reports the population the schema publishes.
   */
  within?: ComputedRef<string>
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

  const buildPreview = (
    entity: EntitySchema,
    result: QueryResult,
    pristine: boolean,
    schema: DomainSchema,
    expr: string,
  ): EntityPreview => ({
    entity,
    rows: result.rows.map((row, index) =>
      presentRow(row, index, entity, options.isPinned(row.id)),
    ),
    total: result.total,
    count: pristine ? entity.count : String(result.total),
    pinned: namesItsOnlyRow(schema, result, expr),
  })

  const run = () => {
    const current = ++token
    const query = options.query.value
    const schema = options.schema.value
    const entities = options.entities.value
    const limit = options.limit.value
    const within = options.within?.value.trim() ?? ''
    /*
     * A scope is a narrowing like any other, whatever the URL says: the query
     * may be untouched, but the cards are not showing the whole of each type,
     * so the count each of them reports has to be what matched.
     */
    const pristine = isPristineQuery(query) && !within
    const expr = within ? andExpression(within, query.expr) : query.expr

    const requests = entities.map((entity) => ({
      entity,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: options.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...query, entity: entity.key, expr, facets: emptyFacetState(entity), page: 1 },
        schema,
        entity,
        limit,
        offset: 0,
      }),
    }))

    if (requests.every(({ outcome }) => !(outcome instanceof Promise))) {
      previews.value = requests.map(({ entity, outcome }) =>
        buildPreview(entity, outcome as QueryResult, pristine, schema, expr),
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
          buildPreview(requests[index]!.entity, result, pristine, schema, expr),
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
    [
      options.source,
      options.schema,
      options.query,
      options.entities,
      options.limit,
      () => options.within?.value,
    ],
    guarded,
    { immediate: true },
  )

  return { previews, pending, error, refresh: guarded }
}

/**
 * Whether a type's card would say nothing but what the query already says.
 *
 * Narrow to one record and that record's own type comes back holding it and
 * nothing else: a heading, a count of one, and the row the header is already
 * naming, drawn again a little lower down. A card is a look inside a type, and
 * a type the reader has picked the one record of has nothing left inside it.
 *
 * Both halves are needed, and the second is the one that is easy to miss. One
 * match is not enough on its own — a query can land on a single record by
 * *asking* something, and that row is then the answer rather than a
 * restatement of the question, which is the whole of what the card is for. So
 * what is asked here is whether the row is the one the query *named*: the term
 * a press on it would add, already written. {@link addTerm} is what decides
 * that, and it is the same `addTerm` the press goes through, so the two agree
 * about `category:5` and `category:"5"` being one term.
 *
 * The expression is the scope and the query joined, so a shell read inside a
 * record drops the card on the same terms as one narrowed to it by hand.
 */
function namesItsOnlyRow(schema: DomainSchema, result: QueryResult, expr: string): boolean {
  const only = result.rows[0]
  if (result.total !== 1 || result.rows.length !== 1 || !only) {
    return false
  }
  const written = expr.trim()
  if (!written) {
    return false
  }
  const term = scopeTermFor(schema, only)
  return Boolean(term) && addTerm(written, term) === written
}
