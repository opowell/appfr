import { describe, expect, it } from 'vitest'
import { effectScope, nextTick } from 'vue'
import { useQueryState } from '../../src/composables/useQueryState'
import type { QueryState } from '../../src/composables/useQueryState'
import { createMemoryAdapter } from '../../src/routing/memory'
import type { MemoryAdapter } from '../../src/routing/memory'
import { iRadarSchema } from '../../src/fixtures/schemas'

function setup(search = '', options: Partial<Parameters<typeof useQueryState>[0]> = {}) {
  const adapter = createMemoryAdapter(search)
  const scope = effectScope()
  const state = scope.run(() => useQueryState({ schema: iRadarSchema, adapter, ...options })) as QueryState
  return { state, adapter: adapter as MemoryAdapter, scope }
}

describe('useQueryState — the home screen', () => {
  it('starts on everything, in cards, with no entity', () => {
    const { state } = setup('')
    expect(state.entity.value).toBeNull()
    expect(state.isEverything.value).toBe(true)
    expect(state.isPristine.value).toBe(true)
    expect(state.query.value.view).toBe('cards')
    expect(state.summary.value).toBe('everything · cards · updated')
  })

  it('keeps a focus entity for the panel even with none selected', () => {
    const { state } = setup('')
    expect(state.entity.value).toBeNull()
    expect(state.focus.value.key).toBe('searches')
  })

  it('names the metric sort generically until an entity is chosen', () => {
    const { state } = setup('')
    expect(state.sorts.value.map((sort) => sort.label)).toEqual([
      'updated',
      'score',
      'value',
      'name',
    ])

    state.setEntity('searches')
    // `searches` calls its first metric "New".
    expect(state.sorts.value.map((sort) => sort.label)).toEqual([
      'updated',
      'score',
      'new',
      'name',
    ])
  })
})

describe('useQueryState — the entity filter', () => {
  it('scoping to an entity is a filter, written to the URL', () => {
    const { state, adapter } = setup('')
    state.setEntity('items')
    expect(adapter.search.value).toBe('?e=items')
    expect(state.entity.value?.key).toBe('items')
    expect(state.isEverything.value).toBe(false)
    expect(state.isPristine.value).toBe(false)
  })

  it('appears in the summary as a liftable term', () => {
    const { state } = setup('?e=logs')
    expect(state.summary.value).toBe('entity:logs')
    expect(state.terms.value.map((term) => term.label)).toEqual(['entity:logs'])
  })

  it('lifting the entity term widens back out to everything', () => {
    const { state, adapter } = setup('?e=settings')
    state.removeTerm(state.terms.value[0]!)
    expect(adapter.search.value).toBe('')
    expect(state.isEverything.value).toBe(true)
  })

  it('clearEntity does the same', () => {
    const { state, adapter } = setup('?e=logs&v=table')
    state.clearEntity()
    expect(adapter.search.value).toBe('?v=table')
    expect(state.entity.value).toBeNull()
  })

  it('carries the entity term ahead of that entity’s own facets', () => {
    const { state } = setup('?e=searches&f_state=running')
    expect(state.terms.value.map((term) => term.label)).toEqual([
      'entity:searches',
      'state:running',
    ])
  })

  it('logs and settings are entities like any other', () => {
    const { state, adapter } = setup('')
    state.setEntity('settings')
    expect(adapter.search.value).toBe('?e=settings')
    expect(state.entity.value?.label).toBe('Settings')
    expect(state.entity.value?.facets.map((f) => f.key)).toEqual(['section', 'type', 'changed'])
  })

  it('gains no facets while unscoped', () => {
    const { state } = setup('')
    expect(state.query.value.facets).toEqual({})
    expect(state.hasFacets.value).toBe(false)
  })
})

describe('useQueryState — reading and writing the URL', () => {
  it('derives the query from the URL', () => {
    const { state } = setup('?e=items&v=table')
    expect(state.query.value.entity).toBe('items')
    expect(state.query.value.view).toBe('table')
    expect(state.entity.value?.label).toBe('Items')
  })

  it('follows the URL when it changes underneath it', async () => {
    const { state, adapter } = setup('')
    expect(state.query.value.view).toBe('cards')
    adapter.search.value = '?v=grid'
    await nextTick()
    expect(state.query.value.view).toBe('grid')
  })

  it('writes a view change to the URL', () => {
    const { state, adapter } = setup('')
    state.setView('list')
    expect(adapter.search.value).toBe('?v=list')
    expect(state.query.value.view).toBe('list')
  })

  it('pushes a history entry for a destination change', () => {
    const { state, adapter } = setup('')
    const before = adapter.history.length
    state.setView('list')
    expect(adapter.history).toHaveLength(before + 1)
  })

  it('replaces rather than pushes while facets are being adjusted', () => {
    const { state, adapter } = setup('?e=searches')
    const before = adapter.history.length
    state.toggleChip('state', 'running')
    state.toggleChip('schedule', 'daily')
    expect(adapter.history).toHaveLength(before)
    expect(adapter.search.value).toContain('f_state=running')
    expect(adapter.search.value).toContain('f_schedule=daily')
  })

  it('honours an overridden navigation mode', () => {
    const { state, adapter } = setup('?e=searches', { facetNavigationMode: 'push' })
    const before = adapter.history.length
    state.toggleChip('state', 'running')
    expect(adapter.history).toHaveLength(before + 1)
  })

  it('toggles a chip off again', () => {
    const { state, adapter } = setup('?e=searches')
    state.toggleChip('state', 'running')
    state.toggleChip('state', 'running')
    expect(adapter.search.value).toBe('?e=searches')
    expect(state.hasFacets.value).toBe(false)
  })

  it('reverses the sort direction', () => {
    const { state, adapter } = setup('')
    state.toggleDirection()
    expect(adapter.search.value).toBe('?d=asc')
    state.toggleDirection()
    expect(adapter.search.value).toBe('')
  })

  it('drops facets that do not survive an entity switch', () => {
    const { state, adapter } = setup('?e=searches')
    state.toggleChip('schedule', 'daily')
    expect(adapter.search.value).toContain('f_schedule=daily')

    state.setEntity('items')
    expect(adapter.search.value).toBe('?e=items')
    expect(Object.keys(state.query.value.facets).sort()).toEqual(['kind', 'rank', 'seen'])
  })

  it('keeps a sort that both entities share', () => {
    const { state } = setup('?s=score')
    state.setEntity('items')
    expect(state.query.value.sort).toBe('score')
  })

  it('sets and clears a range', () => {
    const { state, adapter } = setup('?e=items')
    state.setRange('rank', 20, 80)
    expect(adapter.search.value).toContain('f_rank=20..80')
    state.setRange('rank', null, null)
    expect(adapter.search.value).toBe('?e=items')
  })

  it('flips a toggle facet', () => {
    const { state, adapter } = setup('?e=items')
    state.toggleFlag('seen')
    expect(adapter.search.value).toContain('f_seen=1')
    state.toggleFlag('seen')
    expect(adapter.search.value).toBe('?e=items')
  })

  it('commits an expression', () => {
    const { state, adapter } = setup('')
    state.setExpression('price < 40')
    expect(adapter.search.value).toContain('q=price+%3C+40')
    expect(state.query.value.expr).toBe('price < 40')
  })

  it('clears the entity, the expression and every facet, keeping view and sort', () => {
    const { state, adapter } = setup('?e=items&v=table&s=score&f_kind=page&q=release')
    state.clearFilters()
    expect(adapter.search.value).toBe('?v=table&s=score')
    expect(state.isEverything.value).toBe(true)
    expect(state.isPristine.value).toBe(true)
  })

  it('resets everything back to the home screen', () => {
    const { state, adapter } = setup('?e=items&v=table&s=score&f_kind=page')
    state.reset()
    expect(adapter.search.value).toBe('')
    expect(state.isPristine.value).toBe(true)
  })

  it('summarises a narrowed query by its terms', () => {
    const { state } = setup('?e=searches&f_state=running,paused&f_hits=1&q=pricing')
    expect(state.summary.value).toBe(
      'entity:searches · state:running · state:paused · results:on · "pricing"',
    )
  })

  it('lists each term so it can be lifted individually', () => {
    const { state, adapter } = setup('?e=searches&f_state=running,paused')
    expect(state.terms.value.map((t) => t.label)).toEqual([
      'entity:searches',
      'state:running',
      'state:paused',
    ])

    state.removeTerm(state.terms.value[1]!)
    expect(adapter.search.value).toBe('?e=searches&f_state=paused')
  })

  it('builds an href for a prospective change without navigating', () => {
    const { state, adapter } = setup('')
    expect(state.hrefFor({ view: 'grid' })).toBe('/?v=grid')
    expect(state.hrefFor({ entity: 'items' })).toBe('/?e=items')
    expect(adapter.search.value).toBe('')
  })

  it('leaves foreign query parameters alone', () => {
    const { state, adapter } = setup('?tab=audit')
    state.setView('grid')
    expect(adapter.search.value).toBe('?tab=audit&v=grid')
  })

  it('does not navigate when a change is a no-op', () => {
    const { state, adapter } = setup('?v=grid')
    const before = adapter.history.length
    state.setView('grid')
    expect(adapter.history).toHaveLength(before)
  })
})

describe('useQueryState — landing on an entity instead', () => {
  const defaults = { landing: 'entity' as const, entity: 'items' }

  it('opens on that entity, with a clean URL', () => {
    const { state, adapter } = setup('', { defaults })
    expect(state.entity.value?.key).toBe('items')
    expect(adapter.search.value).toBe('')
  })

  it('can still widen out to everything, and says so in the URL', () => {
    const { state, adapter } = setup('', { defaults })
    state.clearEntity()
    expect(state.isEverything.value).toBe(true)
    expect(adapter.search.value).toBe('?e=*')
  })
})
