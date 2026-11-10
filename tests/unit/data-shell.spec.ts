import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, markRaw, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import DataShell from '../../src/components/DataShell.vue'
import { createMemoryAdapter } from '../../src/routing/memory'
import { VIEW_ICONS } from '../../src/query/schema'
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
    expect(w.find('.dc-pager').exists()).toBe(false)

    // The data lands, and with it the pages the link was to.
    await w.setProps({ source: source(100), loading: false })
    await flushPromises()
    expect(param(adapter, 'p')).toBe('7')
    expect(w.find('.dc-results__state--loading').exists()).toBe(false)
    expect(w.find('.dc-pager__box').element).toHaveProperty('value', '7')
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

  it('offers a record view of the host\'s own, for one record of a type it names', async () => {
    const TestReader = {
      props: { id: { type: String, required: true } },
      setup: (props: { id: string }) => () => h('div', { class: 'test-reader' }, props.id),
    }
    const recordViews = markRaw({ tests: { label: 'Read', component: TestReader } })
    const adapter = createMemoryAdapter('?q=test%3D%22a.spec%22')
    const w = shell(adapter, { recordViews })
    await flushPromises()

    // Offered last, under the host's label, and not drawn until chosen.
    const options = w.findAllComponents({ name: 'PickControl' })
      .find((pick) => pick.props('label') === 'View')!
      .props('options') as { key: string; label: string }[]
    expect(options.at(-1)).toEqual({ key: 'record', label: 'Read', icon: VIEW_ICONS.record })
    expect(w.find('.test-reader').exists()).toBe(false)

    adapter.push('?q=test%3D%22a.spec%22&v=record')
    await flushPromises()
    expect(w.find('.test-reader').text()).toBe('a.spec')
    expect(w.find('.dc-types').exists()).toBe(false)

    // Two records are no one record's screen: the link draws the default.
    adapter.push('?q=test%3D%22a.spec%22 test%3D%22b.spec%22&v=record')
    await flushPromises()
    expect(w.find('.test-reader').exists()).toBe(false)
    expect(w.find('.dc-types').exists()).toBe(true)
  })

  it('reads the type listed a record at a time, in the place the list was at', async () => {
    const TestReader = {
      props: { id: { type: String, required: true } },
      setup: (props: { id: string }) => () => h('div', { class: 'test-reader' }, props.id),
    }
    const recordViews = markRaw({ tests: { label: 'Read', component: TestReader } })
    const adapter = createMemoryAdapter('?e=tests&v=list&p=2')
    const w = shell(adapter, { recordViews })
    await flushPromises()

    const viewPick = () => w.findAllComponents({ name: 'PickControl' })
      .find((pick) => pick.props('label') === 'View')!
    expect((viewPick().props('options') as { key: string }[]).at(-1)).toMatchObject({ key: 'record', label: 'Read' })

    // From the second page of ten, the first row on it.
    viewPick().vm.$emit('update:modelValue', 'record')
    await flushPromises()
    expect(param(adapter, 'v')).toBe('record')
    expect(param(adapter, 'p')).toBe('11')
    expect(w.find('.test-reader').text()).toBe('tests-10')

    // The pager steps a record at a time, through the same query's rows.
    expect(w.find('.dc-pager__total').text()).toBe('/ 30')
    expect(w.find('.dc-pager__page').attributes('title')).toBe('Record 11 of 30')
    await w.find('[aria-label="Next page"]').trigger('click')
    await flushPromises()
    expect(w.find('.test-reader').text()).toBe('tests-11')

    // And back to the list, on the page that record is on.
    viewPick().vm.$emit('update:modelValue', 'list')
    await flushPromises()
    expect(param(adapter, 'p')).toBe('2')
  })

  it('reads a row pressed in a list of a type with a view of its own', async () => {
    const TestReader = {
      props: { id: { type: String, required: true } },
      setup: (props: { id: string }) => () => h('div', { class: 'test-reader' }, props.id),
    }
    const recordViews = markRaw({ notes: { label: 'Read', component: TestReader } })
    const adapter = createMemoryAdapter('?e=notes&v=list&p=3')
    const w = shell(adapter, { recordViews })
    await flushPromises()

    const third = w.findAll('.dc-list__open')[2]!
    expect(third.attributes('href')).toContain('p=23')
    await third.trigger('click')
    await flushPromises()
    expect(param(adapter, 'v')).toBe('record')
    expect(w.find('.test-reader').text()).toBe('notes-22')
    expect(w.emitted('activate')).toBeUndefined()
  })

  describe('holding the record being read while the rows change', () => {
    const TestReader = {
      props: { id: { type: String, required: true } },
      setup: (props: { id: string }) => () => h('div', { class: 'test-reader' }, props.id),
    }
    const recordViews = markRaw({ tests: { label: 'Read', component: TestReader } })

    /** A source of exactly these rows, in this order. */
    const listing = (ids: string[]): DataSource => ({
      query: ({ offset, limit }: QueryRequest) => ({
        rows: ids.slice(offset, offset + limit).map((id) => row('tests', id)),
        total: ids.length,
        unfiltered: true,
      }),
    })
    const ids = ['a', 'b', 'c', 'd', 'e']
    const read = async (page: number, from = ids) => {
      const adapter = createMemoryAdapter(`?e=tests&v=record&p=${page}`)
      const w = shell(adapter, { recordViews, source: listing(from) })
      await flushPromises()
      return { adapter, w }
    }
    const reading = (w: VueWrapper) => w.find('.test-reader').text()
    const place = (w: VueWrapper) => (w.find('.dc-pager__box').element as HTMLInputElement).value
    const count = (w: VueWrapper) => w.find('.dc-pager__total').text()
    const next = (w: VueWrapper) => w.find('[aria-label="Next page"]')
    const previous = (w: VueWrapper) => w.find('[aria-label="Previous page"]')

    it('stays on a record that leaves the results, however often they change', async () => {
      const { adapter, w } = await read(3)
      await w.setProps({ source: listing(['a', 'b', 'd', 'e']) })
      await flushPromises()
      await w.setProps({ source: listing(['a', 'b', 'd', 'e']) })
      await flushPromises()

      expect(reading(w)).toBe('c')
      expect(param(adapter, 'p')).toBe('3')
      // Still counted, so nothing is stepped over.
      expect(count(w)).toBe('/ 5')
    })

    it('steps from a record that has gone to the ones either side of it', async () => {
      const { adapter, w } = await read(3)
      await w.setProps({ source: listing(['a', 'b', 'd', 'e']) })
      await flushPromises()

      await next(w).trigger('click')
      await flushPromises()
      expect(reading(w)).toBe('d')
      expect(param(adapter, 'p')).toBe('3')
      expect(count(w)).toBe('/ 4')

      await w.setProps({ source: listing(['a', 'b', 'e']) })
      await flushPromises()
      await previous(w).trigger('click')
      await flushPromises()
      expect(reading(w)).toBe('b')
      expect(param(adapter, 'p')).toBe('2')
    })

    it('steps on one record at a time as each read leaves the results', async () => {
      const { w } = await read(1)
      const seen = [reading(w)]
      let left = ids
      for (let at = 0; at < 4; at++) {
        left = left.slice(1)
        await w.setProps({ source: listing(left) })
        await flushPromises()
        expect(reading(w)).toBe(seen.at(-1))
        await next(w).trigger('click')
        await flushPromises()
        seen.push(reading(w))
      }
      expect(seen).toEqual(ids)
    })

    it('stays on the last record when it leaves, and goes back from there', async () => {
      const { adapter, w } = await read(5)
      await w.setProps({ source: listing(['a', 'b', 'c', 'd']) })
      await flushPromises()
      expect(reading(w)).toBe('e')
      expect(param(adapter, 'p')).toBe('5')
      expect(next(w).attributes('disabled')).toBeDefined()

      await previous(w).trigger('click')
      await flushPromises()
      expect(reading(w)).toBe('d')
    })

    it('moves the place with the record when rows land before it, without a step in history', async () => {
      const { adapter, w } = await read(2)
      const push = vi.spyOn(adapter, 'push')
      await w.setProps({ source: listing(['new', 'a', 'b', 'c', 'd', 'e']) })
      await flushPromises()

      expect(reading(w)).toBe('b')
      expect(param(adapter, 'p')).toBe('3')
      expect(push).not.toHaveBeenCalled()

      await next(w).trigger('click')
      await flushPromises()
      expect(reading(w)).toBe('c')
    })

    it('steps on past a record that has gone, though rows have landed before it since', async () => {
      const { adapter, w } = await read(3)
      await w.setProps({ source: listing(['a', 'b', 'd', 'e']) })
      await flushPromises()
      await w.setProps({ source: listing(['new', 'a', 'b', 'd', 'e']) })
      await flushPromises()
      expect(reading(w)).toBe('c')
      expect(param(adapter, 'p')).toBe('4')

      await next(w).trigger('click')
      await flushPromises()
      expect(reading(w)).toBe('d')
    })

    it('holds a record that moved further than it looks, as one that has gone', async () => {
      const filler = Array.from({ length: 200 }, (_, at) => `row-${at}`)
      const { adapter, w } = await read(1)
      await w.setProps({ source: listing([...filler, ...ids]) })
      await flushPromises()
      expect(reading(w)).toBe('a')
      expect(param(adapter, 'p')).toBe('1')
    })

    it('lets go when the reader moves, or the list is another', async () => {
      const { adapter, w } = await read(2)
      adapter.push('?e=tests&v=record&p=4')
      await flushPromises()
      expect(reading(w)).toBe('d')

      adapter.push('?e=tests&v=record&p=4&s=name&d=asc')
      await flushPromises()
      await w.setProps({ source: listing([...ids].reverse()) })
      await flushPromises()
      expect(reading(w)).toBe('d')
      expect(place(w)).toBe('2')
    })
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

  it('links a reported row to the host’s activateHref, and still reports a plain press', async () => {
    const plain: DomainSchema = { ...schema, entities: [entity('plain')] }
    const w = shell(createMemoryAdapter('?e=plain&v=list'), {
      schema: plain,
      source: source(3, plain),
      activateHref: (row: ShellRow) => `#/plain/${row.id}`,
    })
    await flushPromises()
    const link = w.find('.dc-list__open')
    expect(link.element.tagName).toBe('A')
    expect(link.attributes('href')).toBe('#/plain/plain-0')
    await link.trigger('click')
    expect(w.emitted('activate')).toHaveLength(1)
  })

  it('makes every cell of a reported row a link under rowLinks', async () => {
    const plain: DomainSchema = { ...schema, entities: [entity('plain', { columns: [{ ...identity, activate: false }] })] }
    const w = shell(createMemoryAdapter('?e=plain&v=table'), {
      schema: plain,
      source: source(3, plain),
      rowLinks: true,
      activateHref: (row: ShellRow) => `#/plain/${row.id}`,
    })
    await flushPromises()
    const link = w.find('.dc-table__row .dc-table__cell-link')
    expect(link.attributes('href')).toBe('#/plain/plain-0')
  })
})

describe('DataShell — presses that change the URL are links', () => {
  it('links the name home, the pager to its pages and New to the host’s form', async () => {
    const creatable: DomainSchema = { ...schema, entities: [entity('tests', { scope: 'test', create: 'New test…' })] }
    const w = shell(createMemoryAdapter('?e=tests&v=list&p=2'), {
      schema: creatable,
      source: source(120, creatable),
      createHref: () => '#/tests/new',
    })
    await flushPromises()
    expect(w.find('.dc-header__domain').attributes('href')).toBe('/')
    const [previous, next] = w.findAll('.dc-pager__step')
    expect(previous!.attributes('href')).toBe('/?e=t&v=list')
    expect(next!.attributes('href')).toBe('/?e=t&v=list&p=3')
    expect(w.find('.dc-actions__new').attributes('href')).toBe('#/tests/new')
  })

  /** Tests whose `Runs` count and `Name` the host presses for, linked where `clickHref` is given. */
  function counted(click: (row: ShellRow) => void, clickHref?: (row: ShellRow) => string) {
    const runs = { key: 'runs', role: 'metric' as const, kind: 'number' as const, label: 'Runs', value: () => 7, click, clickHref }
    const named = { key: 'named', label: 'Named', value: (row: ShellRow) => row.id, click, clickHref }
    const counting: DomainSchema = { ...schema, entities: [entity('tests', { scope: 'test', columns: [identity, named, runs] })] }
    return { schema: counting, source: source(3, counting) }
  }

  it('draws a metric with a click as a drill, linked to its clickHref, a plain press still the host’s', async () => {
    const click = vi.fn()
    const w = shell(createMemoryAdapter('?e=tests&v=table'), counted(click, (row) => `#/runs/${row.id}`))
    await flushPromises()
    const count = w.find('.dc-table__row .dc-drill')
    expect(count.element.tagName).toBe('A')
    expect(count.attributes('href')).toBe('#/runs/tests-0')
    expect(count.text()).toBe('7')
    await count.trigger('click')
    expect(click).toHaveBeenCalledWith(expect.objectContaining({ id: 'tests-0' }), expect.anything())
    expect(w.emitted('activate')).toBeUndefined()
  })

  it('presses a metric’s click off the table too, as a button without a clickHref', async () => {
    const click = vi.fn()
    const w = shell(createMemoryAdapter('?e=tests&v=list'), counted(click))
    await flushPromises()
    const count = w.find('.dc-list__metrics .dc-drill')
    expect(count.element.tagName).toBe('BUTTON')
    await count.trigger('click')
    expect(click).toHaveBeenCalledWith(expect.objectContaining({ id: 'tests-0' }), expect.anything())
  })

  it('links a click column that is no metric to its clickHref', async () => {
    const w = shell(createMemoryAdapter('?e=tests&v=table'), counted(vi.fn(), (row) => `#/named/${row.id}`))
    await flushPromises()
    const link = w.find('.dc-table__row .dc-table__open[href^="#/named/"]')
    expect(link.attributes('href')).toBe('#/named/tests-0')
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
    expect(w.find('.dc-pager').exists()).toBe(false)
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

describe('DataShell — the order, off the table', () => {
  const sorted: DomainSchema = {
    ...schema,
    entities: [
      entity('tests', {
        columns: [
          { ...identity, sort: 'name' },
          { key: 'updated', kind: 'date', label: 'Updated', sort: 'updated' },
        ],
      }),
    ],
  }

  const sortPick = (w: VueWrapper) => w.find('.dc-actions__sort .dc-pick__button')
  const direction = (w: VueWrapper) => w.find('.dc-actions__dir')

  it('offers the sorts beside the view, with the one in force chosen', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=list')
    const w = shell(adapter, { schema: sorted, source: source(3, sorted) })
    await flushPromises()

    // Labelled as the columns are, and opening on the recency sort.
    const labels = sorted.entities[0]!.columns!.map((column) => column.label!.toLowerCase())
    expect(sortPick(w).text()).toBe(labels[1]!)
    await sortPick(w).trigger('click')
    const items = [...document.querySelectorAll<HTMLElement>('.dc-pick__list .dc-menu__item')]
    expect(items.map((item) => item.querySelector('.dc-menu__label')?.textContent)).toEqual(labels)
    items[0]!.click()
    await flushPromises()
    expect(param(adapter, 's')).not.toBeNull()
    expect(sortPick(w).text()).toBe(labels[0]!)
  })

  it('reverses the order from the button beside it', async () => {
    const adapter = createMemoryAdapter('?e=tests&v=cards')
    const w = shell(adapter, { schema: sorted, source: source(3, sorted) })
    await flushPromises()

    expect(direction(w).attributes('aria-label')).toContain('descending')
    await direction(w).trigger('click')
    await flushPromises()
    expect(param(adapter, 'd')).toBe('asc')
    expect(direction(w).attributes('aria-label')).toContain('ascending')
  })

  it('leaves the order to the headings on a table', async () => {
    const w = shell(createMemoryAdapter('?e=tests&v=table'), { schema: sorted, source: source(3, sorted) })
    await flushPromises()
    expect(w.find('.dc-actions__sort').exists()).toBe(false)
    expect(direction(w).exists()).toBe(false)
  })

  it('offers no order where the type has none', async () => {
    const w = shell(createMemoryAdapter('?e=tests&v=list'))
    await flushPromises()
    expect(w.find('.dc-actions__sort').exists()).toBe(false)
    expect(direction(w).exists()).toBe(false)
  })
})

describe('DataShell — operations on the type as a whole', () => {
  const exportable: DomainSchema = {
    ...schema,
    entities: [entity('tests', {
      scope: 'test',
      operations: [{ key: 'export', label: 'Export all', selection: false }],
    })],
  }

  it('offers the button with nothing ticked, names no count and offers no ticks', async () => {
    const w = shell(createMemoryAdapter('?e=tests&v=list'), { schema: exportable, source: source(3, exportable) })
    await flushPromises()
    const button = w.find('[data-dc-operation="export"]')
    expect(button.text()).toBe('Export all')
    expect(button.attributes('disabled')).toBeUndefined()
    expect(w.find('input[type="checkbox"]').exists()).toBe(false)
    await button.trigger('click')
    expect(w.emitted('operate')?.[0]).toEqual(['export', { ids: [], rows: [], entity: exportable.entities[0] }])
  })
})
