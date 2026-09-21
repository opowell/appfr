import { describe, expect, it, vi } from 'vitest'
import { computed, effectScope, ref } from 'vue'
import { useEntityCounts } from '../../src/composables/useEntityCounts'
import type { EntityCountsState } from '../../src/composables/useEntityCounts'
import { createMockDataSource } from '../../src/data/mock'
import { parseQuery } from '../../src/query/codec'
import { iRadarSchema, legoSchema } from '../../src/fixtures/schemas'
import type { DataSource, QueryResult, ShellQuery } from '../../src/types'

function setup(search = '', overrides: { source?: DataSource } = {}) {
  const query = ref<ShellQuery>(parseQuery(search, iRadarSchema))
  const scope = effectScope()
  const state = scope.run(() =>
    useEntityCounts({
      source: computed(() => overrides.source ?? createMockDataSource({ seed: 'iRadar' })),
      schema: computed(() => iRadarSchema),
      query: computed(() => query.value),
      entities: computed(() => iRadarSchema.entities),
    }),
  ) as EntityCountsState
  return { state, query, scope }
}

describe('useEntityCounts', () => {
  it('counts nothing until refresh is called — the picker opens far less than the query changes', () => {
    const { state } = setup()
    expect(state.counts.value.size).toBe(0)
  })

  it('counts every entity once refreshed, in schema order of appearance', () => {
    const { state } = setup()
    state.refresh()
    const keys = [...state.counts.value.keys()]
    expect(keys).toEqual(iRadarSchema.entities.map((entity) => entity.key))
  })

  it('marks the query pristine when nothing narrows it', () => {
    const { state } = setup()
    state.refresh()
    expect(state.pristine.value).toBe(true)
  })

  it('and still pristine with a type in force, that being no narrowing of the others', () => {
    const { state } = setup('?e=searches&f_state=running')
    state.refresh()
    expect(state.pristine.value).toBe(true)
  })

  it('reports the match count once the query narrows, per entity', () => {
    const { state } = setup('?q=digest')
    state.refresh()
    expect(state.pristine.value).toBe(false)
    // "digest" only appears among settings.
    expect(state.counts.value.get('settings')!.total).toBeGreaterThan(0)
    expect(state.counts.value.get('searches')!.total).toBe(0)
  })

  it('drops facets, which belong to one entity, but keeps the expression', () => {
    const seen: string[] = []
    const inner = createMockDataSource({ seed: 'iRadar' })
    const source: DataSource = {
      query: (request) => {
        seen.push(request.query.expr)
        expect(request.entity).not.toBeNull()
        expect(request.query.entity).toBe(request.entity!.key)
        return inner.query(request)
      },
    }
    const { state } = setup('?q=recall', { source })
    state.refresh()

    expect(seen).toHaveLength(iRadarSchema.entities.length)
    expect(seen.every((expr) => expr === 'recall')).toBe(true)
  })

  it('counts a type named by a term of the query without that term, as choosing it lists', () => {
    const seen = new Map<string, string>()
    const source: DataSource = {
      query: (request) => {
        seen.set(request.entity!.key, request.query.expr)
        return { rows: [], total: 0, unfiltered: false }
      },
    }
    const query = ref<ShellQuery>(parseQuery('?e=pieces&q=set%3A%22sets_1%22+theme%3Aspace', legoSchema))
    const scope = effectScope()
    const state = scope.run(() =>
      useEntityCounts({
        source: computed(() => source),
        schema: computed(() => legoSchema),
        query: computed(() => query.value),
        entities: computed(() => legoSchema.entities),
      }),
    ) as EntityCountsState
    state.refresh()

    expect(seen.get('sets')).toBe('theme:space')
    expect(seen.get('pieces')).toBe('set:"sets_1" theme:space')
  })

  it('re-counts on the next refresh, following a change of query', () => {
    const { state, query } = setup()
    state.refresh()
    const before = state.counts.value.get('settings')!.total
    query.value = parseQuery('?q=digest', iRadarSchema)
    state.refresh()
    expect(state.counts.value.get('settings')!.total).not.toBe(before)
  })

  it('applies a synchronous source in the same tick, with nothing pending', () => {
    const { state } = setup()
    state.refresh()
    expect([...state.counts.value.values()].every((count) => !count.pending)).toBe(true)
  })

  it('marks every entity pending for an async source, then fills each in', async () => {
    const inner = createMockDataSource({ seed: 'iRadar' })
    const source: DataSource = { query: (request) => Promise.resolve(inner.query(request)) }
    const { state } = setup('', { source })
    state.refresh()

    expect([...state.counts.value.values()].every((count) => count.pending)).toBe(true)

    await vi.waitFor(() =>
      expect([...state.counts.value.values()].every((count) => !count.pending)).toBe(true),
    )
    expect(state.counts.value.size).toBe(iRadarSchema.entities.length)
  })

  it('ignores a stale async response', async () => {
    let resolveFirst: (value: QueryResult) => void = () => {}
    let call = 0
    const inner = createMockDataSource({ seed: 'iRadar' })
    const source: DataSource = {
      query: (request) => {
        call += 1
        // Hold the very first request open; later ones resolve immediately.
        if (call === 1) return new Promise<QueryResult>((resolve) => (resolveFirst = resolve))
        return Promise.resolve(inner.query(request))
      },
    }

    const { state, query } = setup('', { source })
    state.refresh()
    query.value = parseQuery('?q=digest', iRadarSchema)
    state.refresh()

    // The stale first response lands late and must not overwrite the newer one.
    const firstEntity = iRadarSchema.entities[0]!.key
    resolveFirst({ rows: [], total: 999_999, unfiltered: false })
    await vi.waitFor(() =>
      expect([...state.counts.value.values()].every((count) => !count.pending)).toBe(true),
    )
    expect(state.counts.value.get(firstEntity)!.total).not.toBe(999_999)
  })
})
