import { describe, expect, it, vi } from 'vitest'
import { computed, effectScope, nextTick, ref } from 'vue'
import { useRecordNames } from '../../src/composables/useRecordNames'
import type { RecordNamesState } from '../../src/composables/useRecordNames'
import { createMockDataSource } from '../../src/data/mock'
import { parseQuery } from '../../src/query/codec'
import { findEntity } from '../../src/query/schema'
import { summaryTerms } from '../../src/query/summary'
import { legoSchema } from '../../src/fixtures/schemas'
import type { DataSource, QueryRequest, QueryResult, ShellQuery } from '../../src/types'

/**
 * `sets_10007` is the second set the mock generates, which its samples name
 * *Yellow Castle*. A drill writes `set:"sets_10007"`, and that id is all the
 * header has to go on until this puts a name to it.
 */
const YELLOW_CASTLE = 'set%3A%22sets_10007%22'

function setup(search: string, source?: DataSource) {
  const query = ref<ShellQuery>(parseQuery(search, legoSchema))
  const scope = effectScope()
  const state = scope.run(() =>
    useRecordNames({
      source: computed(() => source ?? createMockDataSource({ seed: 'LEGO' })),
      schema: computed(() => legoSchema),
      query: computed(() => query.value),
      terms: computed(() =>
        summaryTerms(query.value, findEntity(legoSchema, query.value.entity)),
      ),
    }),
  ) as RecordNamesState

  /** The terms as the header reads them: what each one would say. */
  const labels = () =>
    summaryTerms(query.value, findEntity(legoSchema, query.value.entity)).map((term) => {
      const name = state.nameOf(term)
      return name ? `${term.field}:${name} (${term.value})` : term.label
    })

  return { state, query, labels, scope }
}

describe('useRecordNames', () => {
  it('names the record an id-valued term narrows to', () => {
    const { labels } = setup(`?e=pieces&q=${YELLOW_CASTLE}`)
    expect(labels()).toEqual(['entity:pieces', 'set:Yellow Castle (sets_10007)'])
  })

  it('answers within the tick when the source does, so a rendered header has the name', () => {
    // No `await` anywhere above: a synchronous source is what lets the first
    // paint — and a server-rendered one — carry the name rather than the id.
    const { state, query } = setup(`?e=pieces&q=${YELLOW_CASTLE}`)
    const term = summaryTerms(query.value, findEntity(legoSchema, 'pieces')).at(-1)!
    expect(state.nameOf(term)).toBe('Yellow Castle')
  })

  it('leaves a term that constrains a value rather than naming a record', () => {
    // `theme` is a facet of sets, not a type anything points at.
    const { labels } = setup('?e=sets&q=theme%3Acastle')
    expect(labels()).toEqual(['entity:sets', 'theme:castle'])
  })

  it('leaves a bare word alone, having no field to resolve it under', () => {
    const { labels } = setup('?e=sets&q=castle')
    expect(labels()).toEqual(['entity:sets', 'castle'])
  })

  it('names every reference in a query that carries several', () => {
    const { labels } = setup(`?e=inventories&q=${YELLOW_CASTLE}+piece%3A%22pieces_10007%22`)
    expect(labels()).toEqual([
      'entity:inventories',
      'set:Yellow Castle (sets_10007)',
      'piece:Plate 1 x 2 (pieces_10007)',
    ])
  })

  it('asks the source once per record, however often the query changes', async () => {
    const source = createMockDataSource({ seed: 'LEGO' })
    const asked = vi.fn((request: QueryRequest): QueryResult => source.query(request))
    const { query, labels } = setup(`?e=pieces&q=${YELLOW_CASTLE}`, { query: asked })

    expect(asked).toHaveBeenCalledTimes(1)
    // The same term, in a query that has changed around it: paging, sorting
    // and switching view say nothing new about what a set is called.
    query.value = { ...query.value, page: 2, view: 'list' }
    await nextTick()
    expect(labels()).toEqual(['entity:pieces', 'set:Yellow Castle (sets_10007)'])
    expect(asked).toHaveBeenCalledTimes(1)
  })

  it('asks for the one record, scoped to its own type', () => {
    const source = createMockDataSource({ seed: 'LEGO' })
    const asked = vi.fn((request: QueryRequest): QueryResult => source.query(request))
    setup(`?e=pieces&q=${YELLOW_CASTLE}`, { query: asked })

    const request = asked.mock.calls[0]![0]
    expect(request.entity?.key).toBe('sets')
    expect(request.query.expr).toBe('set:"sets_10007"')
    expect(request.limit).toBe(1)
    // The facets of the type on screen have nothing to say about this one.
    expect(request.query.facets).toEqual({
      theme: { kind: 'chips', selected: [] },
      year: { kind: 'range', min: null, max: null },
      owned: { kind: 'toggle', on: false },
    })
  })

  it('waits for a source that answers late, and says nothing until it does', async () => {
    const source = createMockDataSource({ seed: 'LEGO' })
    const slow: DataSource = {
      query: (request) => Promise.resolve(source.query(request)),
    }
    const { labels } = setup(`?e=pieces&q=${YELLOW_CASTLE}`, slow)

    expect(labels()).toEqual(['entity:pieces', 'set:sets_10007'])
    await nextTick()
    await nextTick()
    expect(labels()).toEqual(['entity:pieces', 'set:Yellow Castle (sets_10007)'])
  })

  it('keeps showing the id where the source knows no such record', () => {
    const empty: DataSource = { query: () => ({ rows: [], total: 0, unfiltered: false }) }
    const { labels } = setup('?e=pieces&q=set%3A%22sets_99999%22', empty)
    expect(labels()).toEqual(['entity:pieces', 'set:sets_99999'])
  })

  it('does not ask twice about a record the source has already denied', async () => {
    const asked = vi.fn((): QueryResult => ({ rows: [], total: 0, unfiltered: false }))
    const { query } = setup('?e=pieces&q=set%3A%22sets_99999%22', { query: asked })
    query.value = { ...query.value, page: 3 }
    await nextTick()
    expect(asked).toHaveBeenCalledTimes(1)
  })

  it('survives a source that throws, and says what the query says', () => {
    const angry: DataSource = {
      query: () => {
        throw new Error('no')
      },
    }
    const { labels } = setup(`?e=pieces&q=${YELLOW_CASTLE}`, angry)
    expect(labels()).toEqual(['entity:pieces', 'set:sets_10007'])
  })
})
