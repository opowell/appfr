import { describe, expect, it } from 'vitest'
import { computed, effectScope, nextTick, ref } from 'vue'
import { useResults } from '../../src/composables/useResults'
import { defaultQuery } from '../../src/query/schema'
import { iRadarSchema } from '../../src/fixtures/schemas'
import type {
  DataSource,
  QueryRequest,
  QuerySink,
  ShellQuery,
  ShellRow,
} from '../../src/types'

const searches = iRadarSchema.entities.find((entity) => entity.key === 'searches')!

const row = (id: string): ShellRow => ({
  id,
  entityKey: 'searches',
  entityLabel: 'Searches',
  fields: { primary: id, secondary: id },
})

const rows = (...ids: string[]) => ids.map(row)

/** A source that hands its sink straight back, so a test can push by hand. */
function handSource(options: { teardown?: () => void } = {}) {
  const sinks: QuerySink[] = []
  const requests: QueryRequest[] = []
  const source: DataSource = {
    query: () => ({ rows: [], total: 0, unfiltered: true }),
    stream(request, sink) {
      requests.push(request)
      sinks.push(sink)
      return options.teardown
    },
  }
  return {
    source,
    requests,
    /** The sink of the stream now running. */
    get sink() {
      return sinks[sinks.length - 1] as QuerySink
    },
    get started() {
      return sinks.length
    },
  }
}

/**
 * `useResults` in an owned scope, so a test can dispose it the way unmounting
 * the shell would. `limit` and the query are writable, for the tests about a
 * stream that outlives the query it was started for.
 */
function mount(source: DataSource, limit = 4) {
  const query = ref<ShellQuery>(defaultQuery(iRadarSchema, { entity: 'searches', landing: 'entity' }))
  const scope = effectScope()
  const state = scope.run(() =>
    useResults({
      source: computed(() => source),
      query: computed(() => query.value),
      schema: computed(() => iRadarSchema),
      entity: computed(() => searches),
      limit: computed(() => limit),
    }),
  )!
  return { state, query, scope }
}

describe('a streaming source', () => {
  it('is preferred over query, and is pending until it closes', () => {
    const hand = handSource()
    const { state } = mount(hand.source)

    expect(hand.started).toBe(1)
    expect(state.pending.value).toBe(true)

    hand.sink.close()
    expect(state.pending.value).toBe(false)
  })

  it('is handed the same request a query would have been', () => {
    const hand = handSource()
    mount(hand.source, 25)
    const [request] = hand.requests
    expect(request?.limit).toBe(25)
    expect(request?.offset).toBe(0)
    expect(request?.entity?.key).toBe('searches')
  })

  it('renders every push, and counts what it has found so far', () => {
    const hand = handSource()
    const { state } = mount(hand.source)

    hand.sink.insert(rows('a', 'b'))
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['a', 'b'])
    expect(state.total.value).toBe(2)

    hand.sink.insert(row('c'))
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['a', 'b', 'c'])
    expect(state.total.value).toBe(3)
  })

  it('inserts where it is told, for a scan that finds the newest first', () => {
    const hand = handSource()
    const { state } = mount(hand.source)

    hand.sink.insert(row('a'))
    hand.sink.insert(row('b'), 0)
    hand.sink.insert(row('c'), 0)
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['c', 'b', 'a'])
  })

  it('holds one page, and goes on counting past the end of it', () => {
    const hand = handSource()
    const { state } = mount(hand.source, 3)

    hand.sink.insert(rows('a', 'b', 'c', 'd', 'e'))
    // What the page cannot hold is page two's, and a `query` for this page
    // would never have returned it.
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['a', 'b', 'c'])
    expect(state.total.value).toBe(5)
    expect(state.pageCount.value).toBe(2)
  })

  it('drops the last row of a full page when one is inserted at the front', () => {
    const hand = handSource()
    const { state } = mount(hand.source, 3)

    hand.sink.insert(rows('a', 'b', 'c'))
    hand.sink.insert(row('new'), 0)
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['new', 'a', 'b'])
    expect(state.total.value).toBe(4)
  })

  it('does not spend its first push on having found nothing', () => {
    const hand = handSource()
    const { state } = mount(hand.source)

    hand.sink.insert(rows('a'))
    hand.sink.insert([])
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['a'])
    expect(state.total.value).toBe(1)
  })

  it('takes a stated page and a stated total over a running count', () => {
    const hand = handSource()
    const { state } = mount(hand.source, 10)

    hand.sink.insert(rows('a', 'b'))
    hand.sink.set({ rows: rows('x', 'y', 'z'), total: 900 })
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['x', 'y', 'z'])
    expect(state.total.value).toBe(900)

    // A total on its own leaves the page alone.
    hand.sink.set({ total: 12 })
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['x', 'y', 'z'])
    expect(state.total.value).toBe(12)
  })

  it('reports a failure the way a rejected query is reported', () => {
    const hand = handSource()
    const { state } = mount(hand.source)

    hand.sink.insert(rows('a'))
    hand.sink.fail(new Error('the crawl stopped responding'))
    expect(state.error.value).toBeInstanceOf(Error)
    expect(state.rows.value).toEqual([])
    expect(state.pending.value).toBe(false)
  })

  it('surfaces a source that throws on being asked to stream', () => {
    const source: DataSource = {
      query: () => ({ rows: [], total: 0, unfiltered: true }),
      stream() {
        throw new Error('no crawler available')
      },
    }
    const { state } = mount(source)
    expect(state.error.value).toBeInstanceOf(Error)
    expect(state.pending.value).toBe(false)
  })
})

describe('a stream and the query that outran it', () => {
  it('closes the sink and tears the stream down when the query changes', async () => {
    let torn = 0
    const hand = handSource({ teardown: () => void torn++ })
    const { state, query } = mount(hand.source)

    hand.sink.insert(rows('a', 'b'))
    const stale = hand.sink

    query.value = { ...query.value, sort: 'name' }
    await nextTick()

    expect(hand.started).toBe(2)
    expect(torn).toBe(1)
    expect(stale.open).toBe(false)

    // The rows of the query just left stay up until the new one has its own —
    // the same as while an async query is in flight.
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['a', 'b'])

    // And nothing the stale stream pushes can reach the screen.
    stale.insert(rows('ghost'))
    stale.set({ total: 999 })
    stale.fail(new Error('too late'))
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['a', 'b'])
    expect(state.total.value).toBe(2)
    expect(state.error.value).toBeNull()

    // The new stream's first push is what replaces them.
    hand.sink.insert(rows('c'))
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['c'])
    expect(state.total.value).toBe(1)
  })

  it('cannot be left pending by a stale stream closing', async () => {
    const hand = handSource()
    const { state, query } = mount(hand.source)
    const stale = hand.sink

    query.value = { ...query.value, sort: 'name' }
    await nextTick()

    stale.close()
    expect(state.pending.value).toBe(true)

    hand.sink.close()
    expect(state.pending.value).toBe(false)
  })

  it('is torn down when the shell goes away', () => {
    let torn = 0
    const hand = handSource({ teardown: () => void torn++ })
    const { state, scope } = mount(hand.source)
    const sink = hand.sink

    scope.stop()
    expect(torn).toBe(1)
    expect(sink.open).toBe(false)

    sink.insert(rows('ghost'))
    expect(state.rows.value).toEqual([])
  })

  it('restarts on refresh, tearing the running one down first', () => {
    let torn = 0
    const hand = handSource({ teardown: () => void torn++ })
    const { state } = mount(hand.source)

    hand.sink.insert(rows('a'))
    state.refresh()

    expect(torn).toBe(1)
    expect(hand.started).toBe(2)
    hand.sink.insert(rows('b'))
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['b'])
  })
})

describe('paging a query already counted', () => {
  /** A query of nine rows, pushed and closed. */
  function counted(limit = 4) {
    const hand = handSource()
    const mounted = mount(hand.source, limit)
    hand.sink.insert(rows('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'))
    expect(mounted.state.counting.value).toBe(true)
    hand.sink.close()
    return { hand, ...mounted }
  }

  it('is not counting again, and keeps the total, while the next page arrives', async () => {
    const { hand, state, query } = counted()
    expect(state.counting.value).toBe(false)

    query.value = { ...query.value, page: 2 }
    await nextTick()
    expect(state.pending.value).toBe(true)
    expect(state.counting.value).toBe(false)
    expect(state.total.value).toBe(9)
    expect(state.pageCount.value).toBe(3)

    // A source that counts as it goes starts again from its page; the pager
    // does not follow it down.
    hand.sink.set({ rows: rows('e', 'f', 'g', 'h'), total: 4 })
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['e', 'f', 'g', 'h'])
    expect(state.total.value).toBe(9)

    hand.sink.set({ total: 9 })
    hand.sink.close()
    expect(state.total.value).toBe(9)
    expect(state.pending.value).toBe(false)
  })

  it('takes what the source counted once it closes, where that changed', async () => {
    const { hand, state, query } = counted()
    query.value = { ...query.value, page: 2 }
    await nextTick()
    hand.sink.set({ rows: rows('e', 'f', 'g', 'h'), total: 10 })
    expect(state.total.value).toBe(9)
    hand.sink.close()
    expect(state.total.value).toBe(10)
  })

  it('keeps the total when the page is only made longer', async () => {
    const hand = handSource()
    const limit = ref(4)
    const query = ref<ShellQuery>(defaultQuery(iRadarSchema, { entity: 'searches', landing: 'entity' }))
    const state = effectScope().run(() =>
      useResults({
        source: computed(() => hand.source),
        query: computed(() => query.value),
        schema: computed(() => iRadarSchema),
        entity: computed(() => searches),
        limit: computed(() => limit.value),
      }),
    )!
    hand.sink.insert(rows('a', 'b', 'c', 'd', 'e', 'f'))
    hand.sink.close()

    limit.value = 5
    await nextTick()
    expect(state.counting.value).toBe(false)
    expect(state.total.value).toBe(6)
  })

  it('is still counting a query that had not finished counting', async () => {
    const hand = handSource()
    const { state, query } = mount(hand.source)
    hand.sink.insert(rows('a', 'b', 'c', 'd', 'e'))

    query.value = { ...query.value, page: 2 }
    await nextTick()
    expect(state.counting.value).toBe(true)
  })

  it('counts a different query afresh', async () => {
    const { hand, state, query } = counted()
    query.value = { ...query.value, sort: 'name' }
    await nextTick()
    expect(state.counting.value).toBe(true)
    hand.sink.insert(rows('a'))
    expect(state.total.value).toBe(1)
  })

  it('counts afresh after a failure', async () => {
    const { hand, state, query } = counted()
    query.value = { ...query.value, page: 2 }
    await nextTick()
    hand.sink.fail(new Error('gone'))
    expect(state.counting.value).toBe(false)

    query.value = { ...query.value, page: 1 }
    await nextTick()
    expect(state.counting.value).toBe(true)
  })

  it('holds for a source with no stream as well', async () => {
    let answer: (total: number) => void = () => {}
    const source: DataSource = {
      query: () => new Promise((resolve) => {
        answer = (total) => resolve({ rows: rows('a'), total, unfiltered: true })
      }),
    }
    const { state, query } = mount(source)
    expect(state.counting.value).toBe(true)
    answer(12)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(state.counting.value).toBe(false)

    query.value = { ...query.value, page: 2 }
    await nextTick()
    expect(state.pending.value).toBe(true)
    expect(state.counting.value).toBe(false)
    expect(state.total.value).toBe(12)
  })
})

describe('a source with no stream', () => {
  it('is asked its query, exactly as before', () => {
    const source: DataSource = {
      query: () => ({ rows: rows('a', 'b'), total: 2, unfiltered: true }),
    }
    const { state } = mount(source)
    expect(state.rows.value.map((entry) => entry.id)).toEqual(['a', 'b'])
    expect(state.pending.value).toBe(false)
  })
})
