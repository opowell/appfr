import { afterEach, describe, expect, it } from 'vitest'
import { computed, h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import DataShell from '../../src/components/DataShell.vue'
import { createMemoryAdapter } from '../../src/routing/memory'
import type { MemoryAdapter } from '../../src/routing/memory'
import { createHistoryAdapter } from '../../src/routing/history'
import { createVueRouterAdapter } from '../../src/routing/vueRouter'
import { detachableAdapter } from '../../src/routing/detached'
import type { DataSource, DomainSchema, EntitySchema, QueryRequest, ShellQuery, ShellRow } from '../../src/types'

/*
 * A page under the shell's bar that is not about the query: the bar reads the
 * pristine corpus rather than the page's own parameters, and the first edit to
 * it is a way back to the list, with that edit applied.
 */

const identity = { key: 'name', role: 'identity' as const, label: 'Name', activate: true }

function entity(key: string): EntitySchema {
  return { key, label: key, count: '0', facets: [], tabs: [], samples: [], columns: [identity] }
}

const schema: DomainSchema = {
  key: 'unit',
  label: 'Unit',
  kicker: '',
  placeholder: '',
  columns: [identity],
  entities: [entity('tests'), entity('runs')],
}

const source: DataSource = {
  query(request: QueryRequest) {
    const rows: ShellRow[] = Array.from({ length: 5 }, (_, at) => ({
      id: `${request.entity?.key ?? 'tests'}-${at}`,
      entityKey: request.entity?.key ?? 'tests',
      entityLabel: 'x',
      fields: { name: `row ${at}` },
    }))
    return { rows, total: rows.length, unfiltered: true }
  },
}

let wrapper: VueWrapper | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

/**
 * A host as the test-ui is one: one shell for every route, a page under its
 * bar wherever the path is not the list's, and whether that page is about the
 * query decided per page.
 */
function host(adapter: MemoryAdapter, pageQuery: 'shell' | 'detached' | undefined) {
  const seen = ref<ShellQuery | null>(null)
  const Host = {
    setup() {
      const onPage = computed(() => adapter.path.value !== '/')
      return () =>
        h(
          DataShell,
          { schema, route: adapter, source, ...(pageQuery ? { pageQuery } : {}) },
          onPage.value
            ? {
                page: ({ query }: { query: ShellQuery }) => {
                  seen.value = query
                  return h('form', { class: 'host-page' }, adapter.search.value)
                },
              }
            : {},
        )
    },
  }
  wrapper = mount(Host, { attachTo: document.body })
  return { w: wrapper, seen }
}

async function commitSearch(w: VueWrapper, text: string) {
  const box = w.find('.dc-header__search')
  await box.setValue(text)
  await box.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  await nextTick()
}

describe('DataShell — a page that is not about the query', () => {
  it('reads the pristine query rather than the page’s own parameters', async () => {
    const adapter = createMemoryAdapter('?crawl=run-1&e=tests&q=checkout', '/crawl-report')
    const { w, seen } = host(adapter, 'detached')
    await flushPromises()

    expect(w.find('.host-page').text()).toBe('?crawl=run-1&e=tests&q=checkout')
    expect(w.findAll('.dc-term')).toHaveLength(0)
    expect(seen.value?.entity).toBeNull()
    expect(seen.value?.expr).toBe('')
    // Nothing was written: the page's URL is the page's.
    expect(adapter.history).toEqual(['/crawl-report?crawl=run-1&e=tests&q=checkout'])
  })

  it('takes the first edit back to the list, applied, and pushes so Back returns to the page', async () => {
    const adapter = createMemoryAdapter('?crawl=run-1', '/crawl-report')
    const { w } = host(adapter, 'detached')
    await flushPromises()

    await commitSearch(w, 'digest')
    expect(adapter.path.value).toBe('/')
    expect(adapter.search.value).toBe('?q=digest')
    expect(adapter.history).toEqual(['/crawl-report?crawl=run-1', '/?q=digest'])
    expect(w.find('.host-page').exists()).toBe(false)
    expect(w.find('.dc-results').exists()).toBe(true)
    expect(w.findAll('.dc-term').map((term) => term.text())).toEqual(['digest'])
  })

  it('lands on the list path it is given', async () => {
    const adapter = createMemoryAdapter('', '/app/crawls/new')
    const Host = {
      setup: () => () =>
        h(
          DataShell,
          { schema, route: adapter, source, pageQuery: 'detached', listPath: '/app' },
          adapter.path.value === '/app' ? {} : { page: () => h('form', { class: 'host-page' }) },
        ),
    }
    wrapper = mount(Host, { attachTo: document.body })
    await flushPromises()
    await commitSearch(wrapper, 'digest')
    expect(adapter.history.at(-1)).toBe('/app?q=digest')
  })

  it('is the shell’s query by default, and an edit stays on the page', async () => {
    const adapter = createMemoryAdapter('?e=tests&q=checkout', '/runs/new')
    const { w, seen } = host(adapter, undefined)
    await flushPromises()
    expect(seen.value?.expr).toBe('checkout')
    expect(w.findAll('.dc-term').map((term) => term.text())).toEqual(['checkout'])

    await commitSearch(w, 'digest')
    expect(adapter.path.value).toBe('/runs/new')
    expect(w.find('.host-page').exists()).toBe(true)
    expect(seen.value?.expr).toBe('checkout digest')
  })

  it('means nothing without a page: the list reads its URL as ever', async () => {
    const adapter = createMemoryAdapter('?e=tests&q=checkout', '/')
    const { w } = host(adapter, 'detached')
    await flushPromises()
    expect(w.find('.host-page').exists()).toBe(false)
    expect(w.findAll('.dc-term').map((term) => term.text())).toEqual(['checkout'])
  })
})

describe('detachableAdapter', () => {
  it('is the adapter itself while attached', () => {
    const inner = createMemoryAdapter('?q=a', '/page')
    const adapter = detachableAdapter(inner, { detached: () => false, path: () => '/' })
    expect(adapter.search.value).toBe('?q=a')
    expect(adapter.path.value).toBe('/page')
    adapter.replace('?q=b')
    expect(inner.history).toEqual(['/page?q=b'])
    expect(adapter.href?.('?q=c')).toBe('/page?q=c')
  })

  it('reads nothing while detached, and writes to the list path, pushing', () => {
    const inner = createMemoryAdapter('?crawl=x', '/page')
    const detached = ref(true)
    const adapter = detachableAdapter(inner, { detached: () => detached.value, path: () => '/list' })
    expect(adapter.search.value).toBe('')
    expect(adapter.path.value).toBe('/list')
    expect(adapter.href?.('?q=c')).toBe('/list?q=c')

    adapter.replace('?q=b')
    expect(inner.history).toEqual(['/page?crawl=x', '/list?q=b'])

    detached.value = false
    expect(adapter.search.value).toBe('?q=b')
    expect(adapter.path.value).toBe('/list')
  })
})

describe('route adapters — a path to go to', () => {
  it('memory: moves to the path, and links to it', () => {
    const adapter = createMemoryAdapter('?a=1', '/page')
    expect(adapter.href?.('?q=x', '/')).toBe('/?q=x')
    adapter.push('?q=x', '/')
    expect(adapter.path.value).toBe('/')
    expect(adapter.history).toEqual(['/page?a=1', '/?q=x'])
  })

  it('history: moves to the path, leaving the page’s hash behind; keeps it on the same path', () => {
    window.history.replaceState(null, '', '/page?crawl=x#top')
    const adapter = createHistoryAdapter()
    expect(adapter.href?.('?q=x', '/list')).toBe('/list?q=x')
    adapter.push('?q=x', '/list')
    expect(window.location.pathname).toBe('/list')
    expect(window.location.search).toBe('?q=x')
    expect(window.location.hash).toBe('')
    expect(adapter.path.value).toBe('/list')

    window.history.replaceState(null, '', '/list#keep')
    adapter.replace('?q=y', '/list')
    expect(window.location.hash).toBe('#keep')
    adapter.dispose?.()
  })

  it('vue-router: navigates to the path through the router', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:pathMatch(.*)*', component: { render: () => h('div') } }],
    })
    await router.push('/crawls/new')
    const adapter = createVueRouterAdapter(router)
    expect(adapter.href?.('?q=x', '/')).toBe(router.resolve('/?q=x').href)
    adapter.push('?q=x', '/')
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/?q=x')
    adapter.dispose?.()
  })
})
