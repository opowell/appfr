import { describe, expect, it } from 'vitest'
import { effectScope, nextTick } from 'vue'
import { useQueryState } from '../../src/composables/useQueryState'
import type { QueryState } from '../../src/composables/useQueryState'
import { createMemoryAdapter } from '../../src/routing/memory'
import type { MemoryAdapter } from '../../src/routing/memory'
import { iRadarSchema, legoSchema } from '../../src/fixtures/schemas'

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

  /*
   * The sorts are the columns that offer one, named as those columns are named
   * — so the list is the schema's own vocabulary, and it is generic across
   * every entity only because the schema's own set of columns is.
   */
  it('names the sorts as the columns naming them are named', () => {
    const { state } = setup('')
    expect(state.sorts.value.map((sort) => sort.label)).toEqual([
      'item',
      'metric',
      'metric 2',
      'updated',
    ])

    state.setEntity('searches')
    // `searches` calls its identity "Search" and its metrics "New" and "Results".
    expect(state.sorts.value.map((sort) => sort.label)).toEqual([
      'search',
      'new',
      'results',
      'updated',
    ])
  })

  /* Recency, not the first column declared: a corpus ordered A→Z on arrival
     says less than one showing what changed last. */
  it('still lands on the recency sort, wherever it sits in the set', () => {
    expect(setup('').state.query.value.sort).toBe('updated')
    expect(setup('?e=searches').state.query.value.sort).toBe('updated')
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
    const { state } = setup('?s=metric1')
    state.setEntity('items')
    expect(state.query.value.sort).toBe('metric1')
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
    const { state, adapter } = setup('?e=items&v=table&s=metric1&f_kind=page&q=release')
    state.clearFilters()
    expect(adapter.search.value).toBe('?v=table&s=metric1')
    expect(state.isEverything.value).toBe(true)
    expect(state.isPristine.value).toBe(true)
  })

  it('resets everything back to the home screen', () => {
    const { state, adapter } = setup('?e=items&v=table&s=metric1&f_kind=page')
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

  /*
   * The expression is not one term but as many as it was written with: a query
   * someone assembled a piece at a time comes apart the same way.
   */
  it('lists each part of the expression as a term of its own', () => {
    const { state } = setup('?e=items&q=theme:space+year>=1988')
    expect(state.terms.value.map((t) => t.label)).toEqual([
      'entity:items',
      'theme:space',
      'year>=1988',
    ])
  })

  it('lifting one part leaves the rest of the expression running', () => {
    const { state, adapter } = setup('?e=items&q=theme:space+year>=1988')
    state.removeTerm(state.terms.value[1]!)
    expect(adapter.search.value).toBe('?e=items&q=year%3E%3D1988')
    expect(state.query.value.expr).toBe('year>=1988')
  })

  it('lifting the last part leaves no expression at all', () => {
    const { state, adapter } = setup('?e=items&q=recall')
    state.removeTerm(state.terms.value[1]!)
    expect(adapter.search.value).toBe('?e=items')
  })

  /* Which alternative a term is in is part of its address, so lifting one of
     two identical words takes out the one that was pressed. */
  it('lifts a part from the alternative it is in', () => {
    const { state } = setup('?e=items&q=recall+OR+theme:space+recall')
    const terms = state.terms.value.filter((term) => term.facetKey === 'expr')
    expect(terms.map((term) => [term.group, term.index])).toEqual([
      [0, 0],
      [1, 0],
      [1, 1],
    ])
    state.removeTerm(terms[2]!)
    expect(state.query.value.expr).toBe('recall OR theme:space')
  })

  it('summarises the expression whole, however many parts it has', () => {
    const { state } = setup('?e=items&q=release+OR+recall')
    expect(state.summary.value).toBe('entity:items · "release OR recall"')
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

describe('useQueryState — the page', () => {
  it('starts on the first page, which the URL does not spell out', () => {
    const { state, adapter } = setup('?e=items&v=list')
    expect(state.query.value.page).toBe(1)
    expect(adapter.search.value).toBe('?e=items&v=list')
  })

  it('moves to a page, and says so in the URL', () => {
    const { state, adapter } = setup('?e=items&v=list')
    state.setPage(3)
    expect(state.query.value.page).toBe(3)
    expect(adapter.search.value).toBe('?e=items&v=list&p=3')
  })

  it('clamps to the first page rather than below it', () => {
    const { state, adapter } = setup('?e=items&p=2')
    state.setPage(0)
    expect(state.query.value.page).toBe(1)
    expect(adapter.search.value).toBe('?e=items')
  })

  it('pushes by default, so paging is a destination the back button reaches', () => {
    const { state, adapter } = setup('?e=items')
    const before = adapter.history.length
    state.setPage(2)
    expect(adapter.history.length).toBe(before + 1)
  })

  it('replaces when told to — how a page past the end is corrected', () => {
    const { state, adapter } = setup('?e=items&p=99')
    const before = adapter.history.length
    state.setPage(4, 'replace')
    expect(adapter.search.value).toBe('?e=items&p=4')
    expect(adapter.history.length).toBe(before)
  })
})

describe('useQueryState — what returns to the first page', () => {
  /** Every change to what matched, or to the order it matched in. */
  it('the entity filter', () => {
    const { state, adapter } = setup('?e=items&p=5')
    state.setEntity('logs')
    expect(adapter.search.value).toBe('?e=logs')
  })

  it('lifting the entity filter', () => {
    const { state, adapter } = setup('?e=items&p=5')
    state.clearEntity()
    expect(adapter.search.value).toBe('')
  })

  it('the sort field, and the direction', () => {
    const { state, adapter } = setup('?e=items&p=5')
    state.setSort('metric1')
    expect(adapter.search.value).toBe('?e=items&s=metric1')

    state.setPage(5)
    state.toggleDirection()
    expect(adapter.search.value).toBe('?e=items&s=metric1&d=asc')
  })

  it('the expression', () => {
    const { state, adapter } = setup('?e=items&p=5')
    state.setExpression('recall')
    expect(adapter.search.value).toBe('?e=items&q=recall')
  })

  it('a facet, however it is edited', () => {
    const { state, adapter } = setup('?e=items&p=5')
    state.toggleChip('kind', 'page')
    expect(adapter.search.value).toBe('?e=items&f_kind=page')

    state.setPage(5)
    state.setRange('rank', 20, 80)
    expect(adapter.search.value).toBe('?e=items&f_kind=page&f_rank=20..80')
  })

  it('lifting a term, and clearing the filters', () => {
    const { state, adapter } = setup('?e=items&f_kind=page&p=5')
    state.removeTerm(state.terms.value[1]!)
    expect(adapter.search.value).toBe('?e=items')

    const cleared = setup('?e=items&f_kind=page&p=5')
    cleared.state.clearFilters()
    expect(cleared.adapter.search.value).toBe('')
  })

  it('but not the view: the same rows drawn another way are the same rows', () => {
    const { state, adapter } = setup('?e=items&v=list&p=5')
    state.setView('grid')
    expect(adapter.search.value).toBe('?e=items&v=grid&p=5')
    expect(state.query.value.page).toBe(5)
  })

  it('and an href agrees with the click it stands in for', () => {
    const { state } = setup('?e=items&v=list&p=5')
    expect(state.hrefFor({ view: 'grid' })).toBe('/?e=items&v=grid&p=5')
    expect(state.hrefFor({ sort: 'metric1' })).toBe('/?e=items&v=list&s=metric1')
    expect(state.hrefFor({ page: 2 })).toBe('/?e=items&v=list&p=2')
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

describe('narrow', () => {
  /*
   * The bug this exists for: two commits in a row each serialise from the query the URL
   * currently holds, and a route change is not synchronous — so setting the expression and then
   * the entity wrote the entity over an expression that had not arrived.
   */
  it('writes the expression and the entity in one navigation', () => {
    const adapter = createMemoryAdapter('')
    const state = useQueryState({ schema: () => legoSchema, adapter })
    const before = adapter.history.length

    state.narrow('set:"sets_10007"', 'pieces')

    expect(state.query.value.expr).toBe('set:"sets_10007"')
    expect(state.query.value.entity).toBe('pieces')
    // One entry, not two. This adapter happens to update synchronously, so two commits would
    // still come out right here — a router's would not, and the count is what says which
    // happened either way.
    expect(adapter.history.length).toBe(before + 1)
    expect(adapter.history.at(-1)).toContain('q=set')
    expect(adapter.history.at(-1)).toContain('e=pieces')
  })

  it('narrows without picking a type when the entity is null', () => {
    const adapter = createMemoryAdapter('?e=sets')
    const state = useQueryState({ schema: () => legoSchema, adapter })

    state.narrow('set:"sets_10007"', null)

    expect(state.query.value.entity).toBeNull()
    expect(state.query.value.expr).toBe('set:"sets_10007"')
  })

  it('leaves the entity alone when it is already the one asked for', () => {
    const adapter = createMemoryAdapter('?e=pieces&f_shape=brick')
    const state = useQueryState({ schema: () => legoSchema, adapter })

    state.narrow('color:"colors_10000"', 'pieces')

    expect(state.query.value.expr).toBe('color:"colors_10000"')
    expect(state.query.value.facets.shape).toEqual({ kind: 'chips', selected: ['brick'] })
  })
})
