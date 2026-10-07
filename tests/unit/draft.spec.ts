import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, effectScope, nextTick, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { useQueryState } from '../../src/composables/useQueryState'
import { DRAFT_DELAY, useDraft } from '../../src/composables/useDraft'
import { createMemoryAdapter } from '../../src/routing/memory'
import type { RouteAdapter } from '../../src/routing/adapter'
import { normalizeSearch } from '../../src/routing/adapter'
import { iRadarSchema } from '../../src/fixtures/schemas'
import { findEntity } from '../../src/query/schema'
import type { EntitySchema, ShellQuery } from '../../src/types'

const items = findEntity(iRadarSchema, 'items')!

/**
 * A router that lands a navigation later rather than inside the call — which
 * is what vue-router does, and what Nuxt hosts run under.
 */
function deferredAdapter(initial = '') {
  const search = ref(normalizeSearch(initial))
  const queued: string[] = []
  const adapter: RouteAdapter = {
    search,
    path: ref('/'),
    push: (next) => void queued.push(next),
    replace: (next) => void queued.push(next),
  }
  const land = () => {
    const next = queued.shift()
    if (next !== undefined) search.value = normalizeSearch(next)
  }
  return { adapter, land, queued }
}

function setup(search = '', adapter: RouteAdapter = createMemoryAdapter(search)) {
  const scope = effectScope()
  const result = scope.run(() => {
    const state = useQueryState({ schema: iRadarSchema, adapter })
    const draft = useDraft({
      query: state.query,
      entity: state.entity,
      setExpression: state.setExpression,
    })
    return { state, draft }
  })!
  return { ...result, adapter, scope }
}

/** A draft over a fixed query, listing an entity of the test's own. */
function setupWith(entity: ComputedRef<EntitySchema>) {
  const query = computed<ShellQuery>(() => ({
    entity: entity.value.key,
    view: 'list',
    sort: 'updated',
    dir: 'desc',
    expr: '',
    facets: {},
    page: 1,
  }))
  const scope = effectScope()
  const draft = scope.run(() => useDraft({ query, entity, setExpression: () => false }))!
  return { draft, scope }
}

/** Types into the box, and waits out the pause it is read after. */
async function type(draft: ReturnType<typeof setup>['draft'], text: string) {
  draft.text.value = text
  await nextTick()
  vi.advanceTimersByTime(DRAFT_DELAY)
}

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('useDraft — read as it is typed', () => {
  it('is the committed query until something is typed', () => {
    const { state, draft } = setup('?e=items&v=list&q=recall')
    expect(draft.drafting.value).toBe(false)
    expect(draft.live.value).toBe(state.query.value)
  })

  it('ANDs what is typed on to the query, without writing the URL', async () => {
    const { draft, adapter } = setup('?e=items&v=list&q=recall')
    const url = adapter.search.value
    await type(draft, 'notice')
    expect(draft.drafting.value).toBe(true)
    expect(draft.live.value.expr).toBe('recall notice')
    expect(adapter.search.value).toBe(url)
  })

  it('waits for a pause before reading, and reads only the last of it', async () => {
    const { draft } = setup('?e=items&v=list')
    draft.text.value = 'not'
    await nextTick()
    vi.advanceTimersByTime(DRAFT_DELAY - 1)
    expect(draft.drafting.value).toBe(false)
    draft.text.value = 'notice'
    await nextTick()
    vi.advanceTimersByTime(DRAFT_DELAY - 1)
    expect(draft.drafting.value).toBe(false)
    vi.advanceTimersByTime(1)
    expect(draft.live.value.expr).toBe('notice')
  })

  it('adds to each alternative of a query that has them', async () => {
    const { draft } = setup('?e=items&v=list&q=release+OR+recall')
    await type(draft, 'notice')
    expect(draft.live.value.expr).toBe('release notice OR recall notice')
  })

  it('leaves out a term not yet finished, rather than emptying the screen on it', async () => {
    const { draft } = setup('?e=items&v=list')
    await type(draft, 'notice status:')
    expect(draft.live.value.expr).toBe('notice')
    await type(draft, 'status:')
    expect(draft.drafting.value).toBe(false)
  })

  it('writes a column shortcut out, as a committed term is', async () => {
    const { draft } = setupWith(
      computed(() => ({
        ...items,
        columns: [{ key: 'ratio', label: 'Price ratio' }],
      })),
    )
    await type(draft, 'pr<0.5')
    expect(draft.live.value.expr).toBe('ratio<0.5')
  })

  it('shows the first page of what it found, whatever page the query was on', async () => {
    const { draft } = setup('?e=items&v=list&p=3')
    await type(draft, 'notice')
    expect(draft.live.value.page).toBe(1)
  })

  it('pages on its own, back to the first when the draft changes', async () => {
    const { draft, adapter } = setup('?e=items&v=list')
    const url = adapter.search.value
    await type(draft, 'notice')
    draft.setPage(2)
    expect(draft.live.value.page).toBe(2)
    expect(adapter.search.value).toBe(url)
    await type(draft, 'notices')
    expect(draft.live.value.page).toBe(1)
  })
})

describe('useDraft — Enter, Escape and a press', () => {
  it('Enter makes it a part of the query, and empties the box', async () => {
    const { draft, state } = setup('?e=items&v=list&q=recall')
    await type(draft, 'notice')
    draft.commit()
    expect(state.query.value.expr).toBe('recall notice')
    expect(draft.text.value).toBe('')
    expect(draft.drafting.value).toBe(false)
    expect(draft.live.value.expr).toBe('recall notice')
  })

  it('Enter commits what was typed, before the pause has read it', async () => {
    const { draft, state } = setup('?e=items&v=list')
    draft.text.value = 'notice'
    await nextTick()
    draft.commit()
    expect(state.query.value.expr).toBe('notice')
    vi.advanceTimersByTime(DRAFT_DELAY)
    expect(draft.drafting.value).toBe(false)
  })

  it('Escape gives it up, and the results are the query’s again at once', async () => {
    const { draft, state } = setup('?e=items&v=list&q=recall')
    await type(draft, 'notice')
    draft.abandon()
    expect(draft.text.value).toBe('')
    expect(draft.live.value).toBe(state.query.value)
  })

  it('holds the draft’s results up until a router that lands later has landed', async () => {
    const { adapter, land } = deferredAdapter('?e=items&v=list')
    const { draft, state } = setup('', adapter)
    await type(draft, 'notice')
    draft.commit()
    await nextTick()
    // The box is empty, and the URL has not caught up — so what is on screen
    // is still what was typed rather than the query without it.
    expect(draft.text.value).toBe('')
    expect(state.query.value.expr).toBe('')
    expect(draft.live.value.expr).toBe('notice')
    land()
    expect(state.query.value.expr).toBe('notice')
    expect(draft.drafting.value).toBe(false)
    expect(draft.live.value).toBe(state.query.value)
  })

  it('lets go at once where the part is already on the query, there being nothing to wait for', async () => {
    const { adapter, queued } = deferredAdapter('?e=items&v=list&q=notice')
    const { draft } = setup('', adapter)
    await type(draft, 'notice')
    draft.commit()
    expect(queued).toHaveLength(0)
    expect(draft.drafting.value).toBe(false)
  })

  it('a release keeps the results up until the navigation it made lands', async () => {
    const { adapter, land } = deferredAdapter('?v=list')
    const { draft, state } = setup('', adapter)
    await type(draft, 'notice')
    draft.release(() => state.narrow('set:"a"', null, 'cards'))
    await nextTick()
    expect(draft.text.value).toBe('')
    expect(draft.live.value.expr).toBe('notice')
    land()
    // The draft went with the press: what is listed is the record, not the
    // record and the words that found it.
    expect(draft.live.value.expr).toBe('set:"a"')
  })

  it('a draft outlives a change to the query that is not its own', async () => {
    const { draft, state } = setup('?e=items&v=list')
    await type(draft, 'notice')
    state.setView('table')
    expect(draft.live.value.expr).toBe('notice')
    expect(draft.live.value.view).toBe('table')
  })
})
