import { describe, expect, it } from 'vitest'
import { computed, effectScope, nextTick, ref } from 'vue'
import { andExpression, parseExpression } from '../../src/data/expression'
import { useResults } from '../../src/composables/useResults'
import type { ResultsState } from '../../src/composables/useResults'
import { useEntityPreviews } from '../../src/composables/useEntityPreviews'
import type { EntityPreviewsState } from '../../src/composables/useEntityPreviews'
import { createMockDataSource } from '../../src/data/mock'
import { parseQuery } from '../../src/query/codec'
import { defaultQuery } from '../../src/query/schema'
import { iRadarSchema } from '../../src/fixtures/schemas'
import type { DataSource, QueryRequest, ShellQuery } from '../../src/types'

/** A source that records what it was asked and answers with nothing. */
function spySource() {
  const requests: QueryRequest[] = []
  const source: DataSource = {
    query(request) {
      requests.push(request)
      return { rows: [], total: 0, unfiltered: true }
    },
  }
  return { source, requests }
}

describe('andExpression', () => {
  it('is the other side when one of them is empty', () => {
    expect(andExpression('', 'level:error')).toBe('level:error')
    expect(andExpression('level:error', '')).toBe('level:error')
    expect(andExpression('', '')).toBe('')
  })

  it('ANDs two conjunctions into one', () => {
    expect(andExpression('set:"sets_1"', 'level:error')).toBe('set:sets_1 level:error')
  })

  it('multiplies alternatives out rather than appending to the last of them', () => {
    // Appending would read as `cve OR (advisory scope)`, which is a weaker
    // query than was asked for: this language has no brackets.
    expect(andExpression('cve OR advisory', 'level:error')).toBe(
      'cve level:error OR advisory level:error',
    )
  })

  it('multiplies both sides when both hold alternatives', () => {
    expect(andExpression('a OR b', 'c OR d')).toBe('a c OR a d OR b c OR b d')
  })

  it('does not repeat a constraint a group already says, however it was written', () => {
    expect(andExpression('host:"a.example"', 'host:a.example')).toBe('host:a.example')
  })

  it('parses back to a disjunction of conjunctions', () => {
    expect(parseExpression(andExpression('cve OR advisory', 'level:error'))).toHaveLength(2)
  })
})

/* --------------------------------------------------------------- useResults */

function results(within = '', search = '') {
  const { source, requests } = spySource()
  const query = ref<ShellQuery>(parseQuery(search, iRadarSchema))
  const scope = ref(within)
  const running = effectScope()
  const state = running.run(() =>
    useResults({
      source: computed(() => source),
      query: computed(() => query.value),
      schema: computed(() => iRadarSchema),
      entity: computed(() => null),
      limit: computed(() => 50),
      within: computed(() => scope.value),
    }),
  ) as ResultsState
  return { state, requests, query, scope, running }
}

describe('useResults within a scope', () => {
  it('asks the source for the query inside the scope', () => {
    const { requests } = results('set:"sets_1"')
    expect(requests).toHaveLength(1)
    expect(requests[0]?.query.expr).toBe('set:sets_1')
  })

  it('ANDs the scope on to what the reader typed', () => {
    const { requests } = results('set:"sets_1"', '?q=level%3Aerror')
    expect(requests[0]?.query.expr).toBe('set:sets_1 level:error')
  })

  it('leaves the query alone when there is no scope', () => {
    const { requests } = results('', '?q=level%3Aerror')
    expect(requests[0]?.query.expr).toBe('level:error')
  })

  it('re-runs when the scope changes, because that is a different result set', async () => {
    const { requests, scope } = results('set:"sets_1"')
    scope.value = 'set:"sets_2"'
    await nextTick()
    expect(requests).toHaveLength(2)
    expect(requests[1]?.query.expr).toBe('set:sets_2')
  })

  it('does not re-run when the scope comes out the same', async () => {
    const { requests, scope } = results('set:"sets_1"')
    scope.value = '  set:"sets_1"  '
    await nextTick()
    expect(requests).toHaveLength(1)
  })
})

/* -------------------------------------------------------- useEntityPreviews */

function previews(within: string) {
  const running = effectScope()
  const state = running.run(() =>
    useEntityPreviews({
      source: computed(() => createMockDataSource({ seed: 'iRadar' })),
      schema: computed(() => iRadarSchema),
      query: computed(() => defaultQuery(iRadarSchema)),
      entities: computed(() => iRadarSchema.entities),
      limit: computed(() => 3),
      within: computed(() => within),
      isPinned: () => false,
    }),
  ) as EntityPreviewsState
  return { state, running }
}

describe('useEntityPreviews within a scope', () => {
  it('reports what matched rather than the population the schema publishes', () => {
    const { state } = previews('level:error')
    const published = iRadarSchema.entities.map((entity) => entity.count)
    expect(state.previews.value.map((preview) => preview.count)).not.toEqual(published)
    for (const preview of state.previews.value) {
      expect(preview.count).toBe(String(preview.total))
    }
  })

  it('publishes the population again once nothing scopes it', () => {
    const { state } = previews('')
    expect(state.previews.value.map((preview) => preview.count)).toEqual(
      iRadarSchema.entities.map((entity) => entity.count),
    )
  })

  it('narrows every card, not only the one the scope belongs to', () => {
    const wide = previews('').state.previews.value
    const narrow = previews('level:error').state.previews.value
    const shrunk = narrow.filter(
      (preview, at) => preview.total < (wide[at] as { total: number }).total,
    )
    expect(shrunk.length).toBeGreaterThan(0)
  })
})
