import { describe, expect, it, vi } from 'vitest'
import { computed, effectScope, nextTick, ref } from 'vue'
import { useEntityPreviews } from '../../src/composables/useEntityPreviews'
import type { EntityPreviewsState } from '../../src/composables/useEntityPreviews'
import { createMockDataSource } from '../../src/data/mock'
import { parseQuery } from '../../src/query/codec'
import { scopeTermFor } from '../../src/query/drill'
import { iRadarSchema, legoSchema } from '../../src/fixtures/schemas'
import type { DataSource, QueryRequest, QueryResult, ShellQuery } from '../../src/types'

function setup(search = '', overrides: { source?: DataSource; limit?: number } = {}) {
  const query = ref<ShellQuery>(parseQuery(search, iRadarSchema))
  const limit = ref(overrides.limit ?? 3)
  const scope = effectScope()
  const state = scope.run(() =>
    useEntityPreviews({
      source: computed(() => overrides.source ?? createMockDataSource({ seed: 'iRadar' })),
      schema: computed(() => iRadarSchema),
      query: computed(() => query.value),
      entities: computed(() => iRadarSchema.entities),
      limit: computed(() => limit.value),
      isPinned: () => false,
    }),
  ) as EntityPreviewsState
  return { state, query, limit, scope }
}

describe('useEntityPreviews', () => {
  it('returns one preview per entity, in schema order', () => {
    const { state } = setup()
    expect(state.previews.value.map((p) => p.entity.key)).toEqual(
      iRadarSchema.entities.map((entity) => entity.key),
    )
  })

  it('includes logs and settings, because they are entities like any other', () => {
    const keys = setup().state.previews.value.map((p) => p.entity.key)
    expect(keys).toContain('logs')
    expect(keys).toContain('settings')
  })

  it('gives each entity its own top rows rather than a slice of one global list', () => {
    const { state } = setup()
    for (const preview of state.previews.value) {
      expect(preview.rows, preview.entity.key).toHaveLength(3)
      expect(
        preview.rows.every((entry) => entry.row.entityKey === preview.entity.key),
        preview.entity.key,
      ).toBe(true)
    }
  })

  it('orders each card by the query’s sort — recency by default', () => {
    const { state } = setup()
    for (const preview of state.previews.value) {
      const dates = preview.rows.map((entry) => Date.parse(String(entry.row.fields.updatedAt)))
      expect(dates, preview.entity.key).toEqual([...dates].sort((a, b) => b - a))
    }
  })

  it('follows a change of sort', () => {
    const { state } = setup('?s=name&d=asc')
    for (const preview of state.previews.value) {
      const names = preview.rows.map((entry) => entry.parts.identity)
      expect(names, preview.entity.key).toEqual([...names].sort((a, b) => a.localeCompare(b)))
    }
  })

  it('honours the row limit', () => {
    const { state } = setup('', { limit: 5 })
    for (const preview of state.previews.value) expect(preview.rows).toHaveLength(5)
  })

  it('reports the published population while the query is untouched', () => {
    const byKey = new Map(setup().state.previews.value.map((p) => [p.entity.key, p.count]))
    expect(byKey.get('searches')).toBe('38')
    expect(byKey.get('items')).toBe('9,988')
    expect(byKey.get('logs')).toBe('184k')
  })

  it('reports the match count once the query narrows', () => {
    const { state } = setup('?q=digest')
    const byKey = new Map(state.previews.value.map((p) => [p.entity.key, p]))
    // "digest" only appears among settings.
    expect(byKey.get('settings')!.total).toBeGreaterThan(0)
    expect(byKey.get('settings')!.count).toBe(String(byKey.get('settings')!.total))
    expect(byKey.get('searches')!.count).toBe('0')
    expect(byKey.get('searches')!.rows).toHaveLength(0)
  })

  it('presents rows in their own entity’s vocabulary', () => {
    const byKey = new Map(setup().state.previews.value.map((p) => [p.entity.key, p]))
    // Each row's parts come from its own type's columns, so a log entry is
    // read as a log entry while a search beside it is read as a search.
    expect(byKey.get('logs')!.rows[0]!.parts.metrics[0]!.label).toBe('Duration')
    expect(byKey.get('searches')!.rows[0]!.parts.metrics[0]!.label).toBe('New')
  })

  it('drops facets, which belong to one entity, but keeps the expression', () => {
    const seen: QueryRequest[] = []
    const inner = createMockDataSource({ seed: 'iRadar' })
    const source: DataSource = {
      query: (request) => {
        seen.push(request)
        return inner.query(request)
      },
    }
    setup('?q=recall', { source })

    expect(seen).toHaveLength(iRadarSchema.entities.length)
    for (const request of seen) {
      expect(request.entity).not.toBeNull()
      expect(request.query.entity).toBe(request.entity!.key)
      expect(request.query.expr).toBe('recall')
      // Each entity's facets are present but neutral.
      expect(Object.values(request.query.facets).every((value) => {
        if (value.kind === 'chips') return value.selected.length === 0
        if (value.kind === 'range') return value.min === null && value.max === null
        return value.on === false
      })).toBe(true)
    }
  })

  it('re-queries when the query changes', async () => {
    const { state, query } = setup()
    const before = state.previews.value.find((p) => p.entity.key === 'settings')!.count
    query.value = parseQuery('?q=digest', iRadarSchema)
    await nextTick()
    expect(state.previews.value.find((p) => p.entity.key === 'settings')!.count).not.toBe(before)
  })

  it('applies a synchronous source in the same tick, with nothing pending', () => {
    const { state } = setup()
    expect(state.pending.value).toBe(false)
    expect(state.previews.value.length).toBeGreaterThan(0)
  })

  it('waits for an async source, then fills in', async () => {
    const inner = createMockDataSource({ seed: 'iRadar' })
    const source: DataSource = { query: (request) => Promise.resolve(inner.query(request)) }
    const { state } = setup('', { source })

    expect(state.pending.value).toBe(true)
    expect(state.previews.value).toEqual([])

    await vi.waitFor(() => expect(state.pending.value).toBe(false))
    expect(state.previews.value).toHaveLength(iRadarSchema.entities.length)
  })

  it('surfaces a source failure instead of throwing', () => {
    const source: DataSource = {
      query: () => {
        throw new Error('backend unavailable')
      },
    }
    const { state } = setup('', { source })
    expect((state.error.value as Error).message).toBe('backend unavailable')
    expect(state.previews.value).toEqual([])
  })

  it('ignores a stale async response', async () => {
    let resolveFirst: (value: QueryResult) => void = () => {}
    let call = 0
    const inner = createMockDataSource({ seed: 'iRadar' })
    const source: DataSource = {
      query: (request) => {
        call += 1
        // Hold the very first batch open; later batches resolve immediately.
        if (call === 1) return new Promise<QueryResult>((resolve) => (resolveFirst = resolve))
        return Promise.resolve(inner.query(request))
      },
    }

    const { state, query } = setup('', { source })
    query.value = parseQuery('?q=digest', iRadarSchema)
    await nextTick()

    // The stale first batch lands late and must not overwrite the newer one.
    resolveFirst({ rows: [], total: 999, unfiltered: false })
    await vi.waitFor(() => expect(state.pending.value).toBe(false))
    expect(state.previews.value.some((p) => p.count === '999')).toBe(false)
  })
})


/* ------------------------------------------------- the type the query named */

/**
 * The LEGO fixture rather than iRadar's, because this rule needs a type with a
 * `scope`: a type nothing carries the id of cannot be narrowed to, so there is
 * no term for a card to be a restatement of.
 */
function lego(search = '', within = '') {
  const query = ref<ShellQuery>(parseQuery(search, legoSchema))
  const scope = effectScope()
  const state = scope.run(() =>
    useEntityPreviews({
      source: computed(() => createMockDataSource({ seed: 'LEGO' })),
      schema: computed(() => legoSchema),
      query: computed(() => query.value),
      entities: computed(() => legoSchema.entities),
      limit: computed(() => 3),
      within: computed(() => within),
      isPinned: () => false,
    }),
  ) as EntityPreviewsState
  return { state, query, scope }
}

/** What `sets` came back as, which is the type these all narrow to. */
function setsPreview(state: EntityPreviewsState) {
  return state.previews.value.find((preview) => preview.entity.key === 'sets')!
}

/** The term a press on the first set would add — how these queries are built. */
function firstSetTerm(): string {
  return scopeTermFor(legoSchema, setsPreview(lego().state).rows[0]!.row)!
}

describe('a type the query has already named', () => {
  it('is pinned when its one row is the record the query named', () => {
    const { state } = lego(`?q=${encodeURIComponent(firstSetTerm())}`)
    const sets = setsPreview(state)
    expect(sets.total).toBe(1)
    expect(sets.pinned).toBe(true)
  })

  it('stays where its one row is the answer rather than the question', () => {
    // One set again, and this time nobody has named it — the card is what says
    // which one the query found, which is the whole of what a card is for.
    const only = setsPreview(lego().state).rows[0]!.row
    const { state } = lego(`?q=${encodeURIComponent(`secondary:"${only.fields.secondary}"`)}`)
    const sets = setsPreview(state)
    expect(sets.total).toBe(1)
    expect(sets.pinned).toBe(false)
  })

  it('reads the naming term however it was spelled', () => {
    // A term is quoted where it has to be and bare where it does not, and the
    // same narrowing is written both ways — so what decides this is the parsed
    // term, not its text.
    const bare = firstSetTerm().replace(/"/g, '')
    expect(setsPreview(lego(`?q=${encodeURIComponent(bare)}`).state).pinned).toBe(true)
  })

  it('is pinned by a scope the shell is read inside, which the URL never carries', () => {
    // A record's own page holds the term outside the query, so a card would
    // otherwise restate the header on exactly the screen built to show it.
    expect(setsPreview(lego('', firstSetTerm()).state).pinned).toBe(true)
  })

  it('leaves the types the query only narrowed alone', () => {
    // Everything else under that term holds rows it did not name, and those
    // are what the screen is read for.
    const { state } = lego(`?q=${encodeURIComponent(firstSetTerm())}`)
    for (const preview of state.previews.value) {
      if (preview.entity.key === 'sets') continue
      expect(preview.pinned, preview.entity.key).toBe(false)
    }
  })

  it('is not pinned by a term that leaves the type holding more than one', () => {
    // Two sets named at once is a card listing both, which is a comparison
    // rather than a restatement — and nothing else on the screen shows it.
    const rows = lego().state.previews.value.find((p) => p.entity.key === 'sets')!.rows
    const both = `${scopeTermFor(legoSchema, rows[0]!.row)} OR ${scopeTermFor(legoSchema, rows[1]!.row)}`
    const sets = setsPreview(lego(`?q=${encodeURIComponent(both)}`).state)
    expect(sets.total).toBe(2)
    expect(sets.pinned).toBe(false)
  })

  it('says nothing is pinned while the query is untouched', () => {
    for (const preview of lego().state.previews.value) {
      expect(preview.pinned, preview.entity.key).toBe(false)
    }
  })
})
