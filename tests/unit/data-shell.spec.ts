import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, markRaw, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import DataShell from '../../src/components/DataShell.vue'
import { createMemoryAdapter } from '../../src/routing/memory'
import type { MemoryAdapter } from '../../src/routing/memory'
import type {
  DataSource,
  DomainSchema,
  EntitySchema,
  QueryRequest,
  ShellRow,
  ViewsContext,
} from '../../src/types'

/*
 * The shell's own opt-in behaviour, mounted whole: a sync source, an adapter
 * held in memory, and a schema small enough to read. Everything here is a
 * prop, a slot or a schema field a host has to ask for — so each test also
 * says what a host that asks for nothing still gets.
 */

const identity = { key: 'name', role: 'identity' as const, label: 'Name', activate: true, scope: true }

function entity(key: string, extra: Partial<EntitySchema> = {}): EntitySchema {
  return {
    key,
    label: key[0]!.toUpperCase() + key.slice(1),
    count: '0',
    facets: [],
    tabs: [],
    samples: [],
    columns: [identity],
    ...extra,
  }
}

const schema: DomainSchema = {
  key: 'unit',
  label: 'Unit Domain',
  kicker: '',
  placeholder: '',
  columns: [identity],
  entities: [
    entity('tests', { scope: 'test' }),
    entity('urls', { scope: 'url', href: (row) => row.id }),
    entity('notes', { href: (row) => `https://notes.example/${row.id}` }),
  ],
}

function row(entityKey: string, id: string): ShellRow {
  return { id, entityKey, entityLabel: entityKey, fields: { name: id } }
}

/** `count` rows of each type, paged as the request asks. */
function source(count: number, over: DomainSchema = schema): DataSource {
  const all = over.entities.flatMap((type) =>
    Array.from({ length: count }, (_, at) => row(type.key, `${type.key}-${at}`)),
  )
  return {
    query(request: QueryRequest) {
      const rows = request.entity ? all.filter((r) => r.entityKey === request.entity!.key) : all
      return {
        rows: rows.slice(request.offset, request.offset + request.limit),
        total: rows.length,
        unfiltered: true,
      }
    },
  }
}

let wrapper: VueWrapper | undefined
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

function shell(
  adapter: MemoryAdapter,
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
) {
  wrapper = mount(DataShell, {
    props: { schema, route: adapter, source: source(30), limit: 10, ...props },
    slots: slots as never,
    attachTo: document.body,
  })
  return wrapper
}

const param = (adapter: MemoryAdapter, name: string) =>
  new URLSearchParams(adapter.search.value).get(name)

describe('DataShell — loading', () => {
  it('leaves a page the data has not reached yet in the URL', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list&p=7')
    const w = shell(adapter, { loading: true, source: source(0) })
    await flushPromises()

    expect(param(adapter, 'p')).toBe('7')
    expect(w.find('.dc-results__state--loading').text()).toBe('Loading…')
    // Nor is the pager on the bar, saying `7 / 1` of a count of nothing.
    expect(w.find('.dc-header__pages').exists()).toBe(false)

    // The data lands, and with it the pages the link was to.
    await w.setProps({ source: source(100), loading: false })
    await flushPromises()
    expect(param(adapter, 'p')).toBe('7')
    expect(w.find('.dc-results__state--loading').exists()).toBe(false)
    expect(w.find('.dc-header__page-box').element).toHaveProperty('value', '7')
  })

  it('corrects the page once loading ends, as on a mount, where the data is short of it', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list&p=7')
    const w = shell(adapter, { loading: true, source: source(0) })
    await flushPromises()
    expect(param(adapter, 'p')).toBe('7')

    await w.setProps({ source: source(25), loading: false })
    await flushPromises()
    expect(param(adapter, 'p')).toBe('3')
  })

  it('corrects at once without it, as it always has', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list&p=7')
    const w = shell(adapter, { source: source(0) })
    await flushPromises()
    expect(param(adapter, 'p')).toBeNull()
    expect(w.find('.dc-results__state--loading').exists()).toBe(false)
  })
})

describe('DataShell — a record’s own cards', () => {
  const recordSlot = vi.fn((props: { entity: EntitySchema; id: string }) =>
    h('div', { class: 'record-card' }, `${props.entity.key}:${props.id}`),
  )

  it('draws one per record the query narrows to, in order, before cards-before', async () => {
    const adapter = createMemoryAdapter(
      '?v=cards&q=url%3D%22https%3A%2F%2Fa%22 test%3D%22b.spec%22 -test%3D%22c.spec%22 TEST%3D%22B.SPEC%22 owner%3Dme',
    )
    const w = shell(adapter, {}, {
      record: recordSlot,
      'cards-before': () => h('div', { class: 'host-card' }, 'host'),
    })
    await flushPromises()

    const cards = w.findAll('.record-card, .host-card').map((card) => card.text())
    // The negated term leaves its record out, the second spelling of `b.spec`
    // is the same record, and `owner` is no type's scope.
    expect(cards).toEqual(['urls:https://a', 'tests:b.spec', 'host'])
  })

  it('renders a component per record from recordCards, for the types it names', async () => {
    const TestCards = {
      props: { id: { type: String, required: true } },
      setup: (props: { id: string }) => () => h('div', { class: 'test-cards' }, props.id),
    }
    const adapter = createMemoryAdapter('?v=cards&q=test%3D%22a.spec%22 url%3D%22https%3A%2F%2Fa%22')
    // Raw, as a host's constant map is: the mount's props are made deeply
    // reactive, and a component is not something to proxy.
    const w = shell(adapter, { recordCards: markRaw({ tests: TestCards }) })
    await flushPromises()

    expect(w.findAll('.test-cards').map((card) => card.text())).toEqual(['a.spec'])
  })

  it('draws nothing of its own where the query names no record', async () => {
    const adapter = createMemoryAdapter('?v=cards')
    const w = shell(adapter, {}, { record: recordSlot })
    await flushPromises()
    expect(w.findAll('.record-card')).toHaveLength(0)
  })
})

describe('DataShell — views as a function', () => {
  const views = vi.fn(({ entity, records }: ViewsContext) =>
    entity ? ['table' as const] : records.length ? ['cards' as const] : ['table' as const, 'cards' as const],
  )

  it('is asked with the type and the records, and offers what it says', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list')
    const w = shell(adapter, { views })
    await flushPromises()

    expect(views).toHaveBeenLastCalledWith({ entity: schema.entities[0], records: [] })
    // One view on offer: no chooser, and a link to another draws that one.
    expect(w.find('.dc-actions__view').exists()).toBe(false)
    expect(w.find('.dc-table').exists()).toBe(true)

    adapter.push('?q=test%3D%22a.spec%22')
    await flushPromises()
    expect(views).toHaveBeenLastCalledWith({
      entity: null,
      records: [{ entityKey: 'tests', id: 'a.spec' }],
    })
    expect(w.find('.dc-types').exists()).toBe(true)

    adapter.push('?v=table')
    await flushPromises()
    expect(w.find('.dc-actions__view').exists()).toBe(true)
  })

  it('takes a list exactly as before', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list')
    const w = shell(adapter, { views: ['list', 'table'] })
    await flushPromises()
    expect(w.find('.dc-list').exists()).toBe(true)
    expect(w.find('.dc-actions__view').exists()).toBe(true)
  })
})

describe('DataShell — brand', () => {
  it('draws the mark in place of the name, which stays the accessible text', async () => {
    const adapter = createMemoryAdapter('')
    const w = shell(adapter, {}, {
      brand: ({ label }: { label: string }) => h('svg', { class: 'mark', 'data-label': label }),
    })
    await flushPromises()

    const domain = w.find('.dc-header__domain')
    expect(domain.find('.dc-header__brand').attributes('aria-hidden')).toBe('true')
    expect(domain.find('.mark').attributes('data-label')).toBe('Unit Domain')
    expect(domain.find('.dc-header__sr').text()).toBe('Unit Domain')
  })

  it('is the name as text without it', async () => {
    const w = shell(createMemoryAdapter(''))
    await flushPromises()
    const domain = w.find('.dc-header__domain')
    expect(domain.element.children).toHaveLength(0)
    expect(domain.text()).toBe('Unit Domain')
    expect(domain.attributes('data-dc-brand')).toBeUndefined()
  })

  it('goes home when pressed', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list&q=tests-1&p=2&host=1')
    const w = shell(adapter)
    await flushPromises()

    await w.find('.dc-header__domain').trigger('click')
    await flushPromises()
    expect(param(adapter, 'e')).toBeNull()
    expect(param(adapter, 'q')).toBeNull()
    expect(param(adapter, 'p')).toBeNull()
    // What the shell does not read is the host's, and stays.
    expect(param(adapter, 'host')).toBe('1')
    // A step like any other: Back returns to the table.
    expect(adapter.history).toHaveLength(2)
  })

  it('goes home from the mark too', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list')
    const w = shell(adapter, {}, { brand: () => h('svg', { class: 'mark' }) })
    await flushPromises()

    await w.find('.mark').trigger('click')
    await flushPromises()
    expect(param(adapter, 'e')).toBeNull()
  })

  it('leaves the name off the bar where the schema has none', async () => {
    const { label: _, ...unnamed } = schema
    const w = shell(createMemoryAdapter(''), { schema: unnamed })
    await flushPromises()
    expect(w.find('.dc-header__domain').exists()).toBe(false)
    expect(w.find('.dc-header__search').exists()).toBe(true)
  })

  it('draws no mark without a name for it to stand for', async () => {
    const { label: _, ...unnamed } = schema
    const w = shell(createMemoryAdapter(''), { schema: unnamed }, { brand: () => h('svg', { class: 'mark' }) })
    await flushPromises()
    expect(w.find('.dc-header__domain').exists()).toBe(false)
    expect(w.find('.mark').exists()).toBe(false)
  })
})

describe('DataShell — rows that live somewhere', () => {
  it('opens a reported row’s href instead of emitting activate', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    const w = shell(createMemoryAdapter('?e=notes&v=list'))
    await flushPromises()

    const link = w.find('.dc-list__open')
    expect(link.attributes('href')).toBe('https://notes.example/notes-0')
    await link.trigger('click')
    expect(open).toHaveBeenCalledWith('https://notes.example/notes-0', '_blank', 'noopener')
    expect(w.emitted('activate')).toBeUndefined()
    // The name is the way there, so no second mark beside it.
    expect(w.find('.dc-open').exists()).toBe(false)
  })

  it('goes on narrowing a type with a scope, and offers ↗ beside the name', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    const adapter = createMemoryAdapter('?e=urls&v=list')
    const w = shell(adapter)
    await flushPromises()

    const mark = w.find('.dc-open')
    expect(mark.attributes('href')).toBe('urls-0')
    expect(mark.attributes('target')).toBe('_blank')
    expect(mark.attributes('rel')).toBe('noopener noreferrer')

    await w.find('.dc-list__open').trigger('click')
    expect(open).not.toHaveBeenCalled()
    expect(param(adapter, 'q')).toBe('url="urls-0"')
  })

  it('opens the href under rowPress open, with the → for narrowing', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    const w = shell(createMemoryAdapter('?e=urls&v=list'), { rowPress: 'open' })
    await flushPromises()

    expect(w.find('.dc-scope').exists()).toBe(true)
    expect(w.find('.dc-open').exists()).toBe(false)
    await w.find('.dc-list__open').trigger('click')
    expect(open).toHaveBeenCalledWith('urls-0', '_blank', 'noopener')
    expect(w.emitted('activate')).toBeUndefined()
  })

  it('still reports a type with no href', async () => {
    const plain: DomainSchema = { ...schema, entities: [entity('plain')] }
    const w = shell(createMemoryAdapter('?e=plain&v=list'), { schema: plain, source: source(3, plain) })
    await flushPromises()
    await w.find('.dc-list__open').trigger('click')
    expect(w.emitted('activate')).toHaveLength(1)
  })
})

describe('DataShell — a page of the host’s', () => {
  it('replaces the results under the same bar, with nothing that acts on rows', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list&p=7')
    const w = shell(adapter, { source: source(0) }, {
      page: ({ query }: { query: { entity: string | null } }) =>
        h('form', { class: 'host-page' }, `for ${query.entity}`),
    })
    await flushPromises()

    expect(w.find('.dc-header').exists()).toBe(true)
    expect(w.find('.dc-shell__page .host-page').text()).toBe('for tests')
    expect(w.find('.dc-results').exists()).toBe(false)
    expect(w.find('.dc-actions__view').exists()).toBe(false)
    expect(w.find('.dc-header__pages').exists()).toBe(false)
    // A page pages nothing, so the URL's page is not corrected under it.
    expect(param(adapter, 'p')).toBe('7')
  })

  it('is the list again when the slot goes, and corrects then', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list&p=7')
    const Host = {
      props: { paged: Boolean },
      setup(props: { paged: boolean }) {
        return () =>
          h(
            DataShell,
            { schema, route: adapter, source: source(25), limit: 10 },
            props.paged ? { page: () => h('form', { class: 'host-page' }) } : {},
          )
      },
    }
    wrapper = mount(Host, { props: { paged: true }, attachTo: document.body })
    await flushPromises()
    expect(param(adapter, 'p')).toBe('7')

    await wrapper.setProps({ paged: false })
    await flushPromises()
    await nextTick()
    expect(wrapper.find('.host-page').exists()).toBe(false)
    expect(wrapper.find('.dc-results').exists()).toBe(true)
    expect(param(adapter, 'p')).toBe('3')
  })
})
