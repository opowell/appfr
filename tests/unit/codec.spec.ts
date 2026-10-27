import { describe, expect, it } from 'vitest'
import {
  ENTITY_ALL,
  entityAddress,
  findEntityByAddress,
  parseQuery,
  readExpression,
  serializeQuery,
} from '../../src/query/codec'
import { defaultQuery, findEntity } from '../../src/query/schema'
import { facetValue } from '../../src/query/facetTerms'
import { iRadarSchema, legoSchema } from '../../src/fixtures/schemas'
import type { DomainSchema, FacetDef, ShellQuery } from '../../src/types'

const items = findEntity(iRadarSchema, 'items')!

describe('parseQuery', () => {
  it('reads an empty search as the home screen: everything, in cards', () => {
    const query = parseQuery('', iRadarSchema)
    expect(query).toEqual(defaultQuery(iRadarSchema))
    expect(query.entity).toBeNull()
    expect(query.view).toBe('cards')
    expect(query.sort).toBe('updated')
    expect(query.dir).toBe('desc')
    expect(query.expr).toBe('')
  })

  it('reads every owned parameter', () => {
    const query = parseQuery('?e=items&v=table&s=metric1&d=asc&q=price', iRadarSchema)
    expect(query).toMatchObject({
      entity: 'items',
      view: 'table',
      sort: 'metric1',
      dir: 'asc',
      expr: 'price',
    })
  })

  it('reads the facets out of the expression', () => {
    const query = parseQuery('?e=i&q=kind=pdf+kind=page+rank:20..80+seen:true', iRadarSchema)
    const facet = (key: string) => items.facets.find((candidate) => candidate.key === key) as FacetDef
    expect(facetValue(query.expr, facet('kind'))).toEqual({ kind: 'chips', selected: ['page', 'pdf'] })
    expect(facetValue(query.expr, facet('rank'))).toEqual({ kind: 'range', min: 20, max: 80 })
    expect(facetValue(query.expr, facet('seen'))).toEqual({ kind: 'toggle', on: true })
  })

  /*
   * A card per type is the home screen's whole point; one type's records are rows of the same
   * columns, which is what a table is for. So the view a URL leaves out depends on whether it
   * names a type.
   */
  it('reads one type with no view as its table, and the whole corpus as cards', () => {
    expect(parseQuery('?e=items', iRadarSchema).view).toBe('table')
    expect(parseQuery(`?e=${ENTITY_ALL}`, iRadarSchema, { landing: 'entity' }).view).toBe('cards')
    expect(parseQuery('?e=items&v=cards', iRadarSchema).view).toBe('cards')
  })

  it('lets a host choose the view a single type opens in', () => {
    expect(parseQuery('?e=items', iRadarSchema, { entityView: 'list' }).view).toBe('list')
    // …which leaves the home screen's view alone.
    expect(parseQuery('', iRadarSchema, { entityView: 'list' }).view).toBe('cards')
  })

  it('still opens a host that lands on a type in the view it names', () => {
    const defaults = { landing: 'entity' as const, entity: 'items', view: 'list' as const }
    expect(parseQuery('', iRadarSchema, defaults).view).toBe('list')
    expect(parseQuery('?e=logs', iRadarSchema, defaults).view).toBe('list')
    expect(parseQuery('', iRadarSchema, { ...defaults, entityView: 'grid' }).view).toBe('grid')
  })

  it('falls back to the whole corpus for an entity the schema does not have', () => {
    const query = parseQuery('?e=nope', iRadarSchema)
    expect(query.entity).toBeNull()
  })

  it('ignores unknown views and sorts', () => {
    const query = parseQuery('?e=items&v=hologram&s=vibes', iRadarSchema)
    expect(query.view).toBe('table')
    expect(query.sort).toBe('updated')
  })

  it('leaves a parameter it does not own alone, an old facet one among them', () => {
    const search = '?e=items&f_kind=page'
    const query = parseQuery(search, iRadarSchema)
    expect(query.expr).toBe('')
    expect(serializeQuery(query, iRadarSchema, {}, search)).toBe('?f_kind=page&e=i')
  })

  it('survives a mangled escape sequence', () => {
    const query = parseQuery('?q=%E0%A4%A', iRadarSchema)
    expect(query.expr).toBe('%E0%A4%A')
  })

  it('decodes + as a space, so expressions survive the round trip', () => {
    expect(parseQuery('?q=price+%3C+40', iRadarSchema).expr).toBe('price < 40')
  })
})

describe('parseQuery — landing on an entity', () => {
  const defaults = { landing: 'entity' as const, entity: 'items' }

  it('reads an empty search as that entity', () => {
    const query = parseQuery('', iRadarSchema, defaults)
    expect(query.entity).toBe('items')
  })

  it('still lets the whole corpus be named explicitly', () => {
    const query = parseQuery(`?e=${ENTITY_ALL}`, iRadarSchema, defaults)
    expect(query.entity).toBeNull()
  })
})

describe('serializeQuery', () => {
  it('omits everything at its default, so the home screen has a clean URL', () => {
    expect(serializeQuery(defaultQuery(iRadarSchema), iRadarSchema)).toBe('')
  })

  it('writes only what differs from the default', () => {
    const query: ShellQuery = { ...defaultQuery(iRadarSchema), view: 'grid' }
    expect(serializeQuery(query, iRadarSchema)).toBe('?v=grid')
  })

  it('writes the entity filter, and drops it again when lifted', () => {
    const scoped = parseQuery('?e=items', iRadarSchema)
    expect(serializeQuery(scoped, iRadarSchema)).toBe('?e=i')
    expect(serializeQuery({ ...scoped, entity: null, view: 'cards' }, iRadarSchema)).toBe('')
  })

  it('omits a type\'s table, and spells out its cards', () => {
    const items = parseQuery('?e=items', iRadarSchema)
    expect(serializeQuery({ ...items, view: 'table' }, iRadarSchema)).toBe('?e=i')
    expect(serializeQuery({ ...items, view: 'cards' }, iRadarSchema)).toBe('?e=i&v=cards')
  })

  it('keeps a range and a chip readable in the expression', () => {
    const query = parseQuery('?e=items&q=kind=page+rank:20..80', iRadarSchema)
    expect(serializeQuery(query, iRadarSchema)).toBe('?e=i&q=kind=page+rank:20..80')
  })

  it('preserves query parameters the shell does not own', () => {
    const query = parseQuery('?tab=audit&e=items&highlight=42', iRadarSchema)
    const search = serializeQuery(query, iRadarSchema, {}, '?tab=audit&e=items&highlight=42')
    expect(search).toContain('tab=audit')
    expect(search).toContain('highlight=42')
    expect(search).toContain('e=i')
  })

  it('honours caller-supplied defaults when deciding what to omit', () => {
    const defaults = { landing: 'entity' as const, entity: 'items', entityView: 'list' as const }
    const query = parseQuery('', iRadarSchema, defaults)
    expect(serializeQuery(query, iRadarSchema, defaults)).toBe('')
    // Without those defaults the same query is not the default any more.
    expect(serializeQuery(query, iRadarSchema)).toBe('?e=i&v=list')
  })

  it('spells out the whole corpus when the default is an entity', () => {
    const defaults = { landing: 'entity' as const, entity: 'items' }
    const everything = { ...parseQuery('', iRadarSchema, defaults), entity: null, view: 'cards' as const }
    expect(serializeQuery(everything, iRadarSchema, defaults)).toBe(`?e=${ENTITY_ALL}`)
  })
})

describe('the page parameter', () => {
  it('reads a URL with no page as the first one', () => {
    expect(parseQuery('', iRadarSchema).page).toBe(1)
    expect(parseQuery('?e=items&v=list', iRadarSchema).page).toBe(1)
  })

  it('reads the page it names', () => {
    expect(parseQuery('?e=items&p=4', iRadarSchema).page).toBe(4)
  })

  it('degrades a page nobody can be on to the first', () => {
    for (const search of ['?p=0', '?p=-3', '?p=sausage', '?p=', '?p=1.5']) {
      expect(parseQuery(search, iRadarSchema).page, search).toBe(1)
    }
  })

  it('omits the first page, which is what an unpaged URL means', () => {
    const query = parseQuery('?e=items', iRadarSchema)
    expect(serializeQuery(query, iRadarSchema)).toBe('?e=i')
  })

  it('writes the page last, after the terms being paged through', () => {
    const query = parseQuery('?e=items&q=kind=page&p=3', iRadarSchema)
    expect(serializeQuery(query, iRadarSchema)).toBe('?e=i&q=kind=page&p=3')
  })

  it('is a parameter the shell owns, so it is not mistaken for the host\'s', () => {
    const query = parseQuery('?tab=audit&p=2', iRadarSchema)
    // Rewritten by the shell rather than carried through as foreign state.
    expect(serializeQuery(query, iRadarSchema, {}, '?tab=audit&p=2')).toBe('?tab=audit&p=2')
    expect(serializeQuery({ ...query, page: 1 }, iRadarSchema, {}, '?tab=audit&p=2')).toBe('?tab=audit')
  })
})

describe('round trip', () => {
  const cases: string[] = [
    '',
    '?v=cards',
    '?e=items&v=table&s=metric1&d=asc',
    '?e=items&v=cards',
    '?e=items&v=list&p=7',
    '?e=items&q=kind=page&p=2',
    '?e=items&q=kind=page+kind=feed+rank:10..90+seen:true',
    '?e=i&s=l&q=s>5+u:example',
    '?q=site:*.shop+AND+price+%3C+40',
    '?e=scrapers&q=engine=headless+reddit',
    '?e=logs&q=level=error',
    '?e=settings&q=section=access',
  ]

  it.each(cases)('parse then serialize is stable for %s', (search) => {
    const query = parseQuery(search, iRadarSchema)
    const written = serializeQuery(query, iRadarSchema, {}, search)
    expect(parseQuery(written, iRadarSchema)).toEqual(query)
  })

  it('is stable across a second schema', () => {
    const search = '?e=pieces&v=grid&q=category=brick+category=plate+firstyear:1970..1990'
    const query = parseQuery(search, legoSchema)
    const written = serializeQuery(query, legoSchema, {}, search)
    expect(parseQuery(written, legoSchema)).toEqual(query)
    expect(written).toContain('1970..1990')
  })

  it('is stable when the host lands on an entity', () => {
    const defaults = { landing: 'entity' as const }
    for (const search of ['', `?e=${ENTITY_ALL}`, '?e=items&v=list']) {
      const query = parseQuery(search, iRadarSchema, defaults)
      const written = serializeQuery(query, iRadarSchema, defaults, search)
      expect(parseQuery(written, iRadarSchema, defaults)).toEqual(query)
    }
  })
})

describe('shortcuts in the address', () => {
  it('writes a type, a sort and a column by their initials', () => {
    const query: ShellQuery = {
      ...parseQuery('?e=items', iRadarSchema),
      sort: 'metric1',
      expr: 'metric2>5',
    }
    expect(serializeQuery(query, iRadarSchema)).toBe('?e=i&s=l&q=s%3E5')
  })

  it('reads keys and initials as the same query', () => {
    expect(parseQuery('?e=i&s=l&q=s>5', iRadarSchema)).toEqual(
      parseQuery('?e=items&s=metric1&q=metric2>5', iRadarSchema),
    )
    expect(parseQuery('?e=i&s=l&q=s>5', iRadarSchema).expr).toBe('metric2>5')
  })

  it('gives shared initials to the type declared first, and writes the rest by key', () => {
    const searches = findEntity(iRadarSchema, 'searches')!
    const scrapers = findEntity(iRadarSchema, 'scrapers')!
    expect(entityAddress(searches, iRadarSchema)).toBe('s')
    expect(entityAddress(scrapers, iRadarSchema)).toBe('scrapers')
    expect(findEntityByAddress(iRadarSchema, 's')?.key).toBe('searches')
    expect(findEntityByAddress(iRadarSchema, 'scrapers')?.key).toBe('scrapers')
  })

  it('never shortens a join key, which reads the same on every type', () => {
    const schema: DomainSchema = {
      ...iRadarSchema,
      entities: [
        {
          key: 'stores',
          label: 'Stores',
          scope: 'store',
          count: '',
          facets: [],
          tabs: [],
          samples: [],
          columns: [
            { key: 'store', label: 'Store' },
            { key: 'priceValue', label: 'Price' },
          ],
        },
      ],
    }
    const query = { ...parseQuery('?e=stores', schema), expr: 'store:a pricevalue<5' }
    expect(serializeQuery(query, schema)).toBe('?e=s&q=store:a+p%3C5')
    expect(parseQuery('?e=s&q=store:a+p<5', schema).expr).toBe('store:a pricevalue<5')
  })

  it('reads the expression with its shortcuts written out, given the schema', () => {
    expect(readExpression('?e=i&q=s>5', iRadarSchema)).toBe('metric2>5')
    expect(readExpression('?e=i&q=s>5')).toBe('s>5')
  })
})
