import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { normalizeSearch } from '../../src/routing/adapter'
import { createHistoryAdapter } from '../../src/routing/history'
import { createMemoryAdapter } from '../../src/routing/memory'
import { createVueRouterAdapter } from '../../src/routing/vueRouter'

describe('normalizeSearch', () => {
  it.each([
    ['', ''],
    [undefined, ''],
    ['?', ''],
    ['a=b', '?a=b'],
    ['?a=b', '?a=b'],
  ])('normalises %s to %s', (input, expected) => {
    expect(normalizeSearch(input)).toBe(expected)
  })
})

describe('memory adapter', () => {
  it('starts from the given search and records navigations', () => {
    const adapter = createMemoryAdapter('?a=1', '/things')
    expect(adapter.search.value).toBe('?a=1')
    expect(adapter.history).toEqual(['/things?a=1'])

    adapter.push('?a=2')
    expect(adapter.history).toEqual(['/things?a=1', '/things?a=2'])

    adapter.replace('?a=3')
    expect(adapter.history).toEqual(['/things?a=1', '/things?a=3'])
    expect(adapter.search.value).toBe('?a=3')
  })
})

describe('history adapter', () => {
  it('reads the current address bar', () => {
    window.history.replaceState(null, '', '/dash?v=grid')
    const adapter = createHistoryAdapter()
    expect(adapter.search.value).toBe('?v=grid')
    expect(adapter.path.value).toBe('/dash')
    adapter.dispose?.()
  })

  it('writes pushes to the address bar and mirrors them', () => {
    window.history.replaceState(null, '', '/dash')
    const adapter = createHistoryAdapter()

    adapter.push('?v=cards')
    expect(window.location.search).toBe('?v=cards')
    expect(adapter.search.value).toBe('?v=cards')

    adapter.replace('?v=table')
    expect(window.location.search).toBe('?v=table')
    expect(adapter.search.value).toBe('?v=table')
    adapter.dispose?.()
  })

  it('preserves the hash when navigating', () => {
    window.history.replaceState(null, '', '/dash#section')
    const adapter = createHistoryAdapter()
    adapter.push('?v=cards')
    expect(window.location.hash).toBe('#section')
    adapter.dispose?.()
  })

  it('picks up a popstate', async () => {
    window.history.replaceState(null, '', '/dash?v=list')
    const adapter = createHistoryAdapter()

    window.history.replaceState(null, '', '/dash?v=grid')
    window.dispatchEvent(new PopStateEvent('popstate'))
    await nextTick()

    expect(adapter.search.value).toBe('?v=grid')
    adapter.dispose?.()
  })

  it('stops listening after dispose', async () => {
    window.history.replaceState(null, '', '/dash?v=list')
    const adapter = createHistoryAdapter()
    adapter.dispose?.()

    window.history.replaceState(null, '', '/dash?v=grid')
    window.dispatchEvent(new PopStateEvent('popstate'))
    await nextTick()

    expect(adapter.search.value).toBe('?v=list')
  })
})

describe('vue-router adapter', () => {
  const Blank = defineComponent({ render: () => h('div') })

  /** Router navigation resolves asynchronously; let it settle. */
  const flush = async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
  }

  const makeRouter = () =>
    createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:pathMatch(.*)*', component: Blank }],
    })

  it('reads the search out of the current route', async () => {
    const router = makeRouter()
    await router.push('/dash?v=table')
    const adapter = createVueRouterAdapter(router)

    expect(adapter.search.value).toBe('?v=table')
    expect(adapter.path.value).toBe('/dash')
    adapter.dispose?.()
  })

  it('navigates through the router, keeping the path', async () => {
    const router = makeRouter()
    await router.push('/dash')
    const adapter = createVueRouterAdapter(router)

    adapter.push('?v=cards')
    await flush()

    expect(router.currentRoute.value.path).toBe('/dash')
    expect(router.currentRoute.value.query.v).toBe('cards')
    expect(adapter.search.value).toBe('?v=cards')
    adapter.dispose?.()
  })

  it('follows navigations it did not initiate, including back', async () => {
    const router = makeRouter()
    await router.push('/dash')
    const adapter = createVueRouterAdapter(router)

    await router.push('/dash?v=grid')
    await nextTick()
    expect(adapter.search.value).toBe('?v=grid')

    router.back()
    await flush()
    expect(adapter.search.value).toBe('')
    adapter.dispose?.()
  })

  it('ignores the hash when reading the search', async () => {
    const router = makeRouter()
    await router.push('/dash?v=links#anchor')
    const adapter = createVueRouterAdapter(router)
    expect(adapter.search.value).toBe('?v=links')
    adapter.dispose?.()
  })
})
