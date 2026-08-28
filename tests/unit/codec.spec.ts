import { describe, expect, it } from 'vitest'
import { ENTITY_ALL, parseQuery, serializeQuery } from '../../src/query/codec'
import { defaultQuery, findEntity } from '../../src/query/schema'
import { iRadarSchema, legoSchema } from '../../src/fixtures/schemas'
import type { ShellQuery } from '../../src/types'

const items = findEntity(iRadarSchema, 'items')!

describe('parseQuery', () => {
  it('reads an empty search as the home screen: everything, in cards', () => {
    const query = parseQuery('', iRadarSchema)
    expect(query).toEqual(defaultQuery(iRadarSchema))
    expect(query.entity).toBeNull()
    expect(query.view).toBe('cards')
    expect(query.sort).toBe('updated')
    expect(query.dir).toBe('desc')
    expect(query.facets).toEqual({})
  })

  it('reads every owned parameter', () => {
    const query = parseQuery('?e=items&v=table&s=score&d=asc&q=price', iRadarSchema)
    expect(query).toMatchObject({
      entity: 'items',
      view: 'table',
      sort: 'score',
      dir: 'asc',
      expr: 'price',
    })
  })

  it('reads chips, ranges and toggles', () => {
    const query = parseQuery('?e=items&f_kind=pdf,page&f_rank=20..80&f_seen=1', iRadarSchema)
    expect(query.facets.kind).toEqual({ kind: 'chips', selected: ['page', 'pdf'] })
    expect(query.facets.rank).toEqual({ kind: 'range', min: 20, max: 80 })
    expect(query.facets.seen).toEqual({ kind: 'toggle', on: true })
  })

  it('accepts half-open ranges', () => {
    expect(parseQuery('?e=items&f_rank=..80', iRadarSchema).facets.rank).toEqual({
      kind: 'range',
      min: null,
      max: 80,
    })
    expect(parseQuery('?e=items&f_rank=20..', iRadarSchema).facets.rank).toEqual({
      kind: 'range',
      min: 20,
      max: null,
    })
  })

  it('orders chips by the schema rather than the URL', () => {
    const query = parseQuery('?e=items&f_kind=image,page,feed', iRadarSchema)
    // The schema lists page, pdf, feed, image.
    expect(query.facets.kind).toEqual({ kind: 'chips', selected: ['page', 'feed', 'image'] })
  })

  it('drops chip values the schema no longer offers', () => {
    const query = parseQuery('?e=items&f_kind=page,sausage', iRadarSchema)
    expect(query.facets.kind).toEqual({ kind: 'chips', selected: ['page'] })
  })

  it('clamps range bounds to the facet and swaps an inverted pair', () => {
    const clamped = parseQuery('?e=items&f_rank=-40..900', iRadarSchema)
    expect(clamped.facets.rank).toEqual({ kind: 'range', min: 0, max: 100 })

    const swapped = parseQuery('?e=items&f_rank=80..20', iRadarSchema)
    expect(swapped.facets.rank).toEqual({ kind: 'range', min: 20, max: 80 })
  })

  it('falls back to the whole corpus for an entity the schema does not have', () => {
    const query = parseQuery('?e=nope', iRadarSchema)
    expect(query.entity).toBeNull()
  })

  it('ignores unknown views and sorts', () => {
    const query = parseQuery('?e=items&v=hologram&s=vibes', iRadarSchema)
    expect(query.view).toBe('cards')
    expect(query.sort).toBe('updated')
  })

  it('carries no facets when no entity is selected', () => {
    // Facet parameters are meaningless across every entity at once.
    const query = parseQuery('?f_kind=page', iRadarSchema)
    expect(query.entity).toBeNull()
    expect(query.facets).toEqual({})
  })

  it('drops facet parameters belonging to another entity', () => {
    // `theme` is a LEGO facet, not an iRadar one.
    const query = parseQuery('?e=items&f_theme=space', iRadarSchema)
    expect(query.facets).not.toHaveProperty('theme')
    expect(Object.keys(query.facets).sort()).toEqual(items.facets.map((f) => f.key).sort())
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
    expect(Object.keys(query.facets).sort()).toEqual(['kind', 'rank', 'seen'])
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
    expect(serializeQuery(scoped, iRadarSchema)).toBe('?e=items')
    expect(serializeQuery({ ...scoped, entity: null }, iRadarSchema)).toBe('')
  })

  it('keeps readable separators in facet values', () => {
    const query = parseQuery('?e=items&f_kind=page,pdf&f_rank=20..80', iRadarSchema)
    const search = serializeQuery(query, iRadarSchema)
    expect(search).toContain('f_kind=page,pdf')
    expect(search).toContain('f_rank=20..80')
  })

  it('preserves query parameters the shell does not own', () => {
    const query = parseQuery('?tab=audit&e=items&highlight=42', iRadarSchema)
    const search = serializeQuery(query, iRadarSchema, {}, '?tab=audit&e=items&highlight=42')
    expect(search).toContain('tab=audit')
    expect(search).toContain('highlight=42')
    expect(search).toContain('e=items')
  })

  it('drops a neutral facet rather than writing an empty value', () => {
    const query = parseQuery('?e=items&f_kind=page', iRadarSchema)
    const cleared = {
      ...query,
      facets: { ...query.facets, kind: { kind: 'chips' as const, selected: [] } },
    }
    expect(serializeQuery(cleared, iRadarSchema)).toBe('?e=items')
  })

  it('honours caller-supplied defaults when deciding what to omit', () => {
    const defaults = { landing: 'entity' as const, entity: 'items', view: 'table' as const }
    const query = parseQuery('', iRadarSchema, defaults)
    expect(serializeQuery(query, iRadarSchema, defaults)).toBe('')
    // Without those defaults the same query is not the default any more.
    expect(serializeQuery(query, iRadarSchema)).toBe('?e=items&v=table')
  })

  it('spells out the whole corpus when the default is an entity', () => {
    const defaults = { landing: 'entity' as const, entity: 'items' }
    const everything = { ...parseQuery('', iRadarSchema, defaults), entity: null }
    expect(serializeQuery(everything, iRadarSchema, defaults)).toBe(`?e=${ENTITY_ALL}`)
  })
})

describe('round trip', () => {
  const cases: string[] = [
    '',
    '?v=cards',
    '?e=items&v=table&s=score&d=asc',
    '?e=items&f_kind=page,feed&f_rank=10..90&f_seen=1',
    '?q=site:*.shop+AND+price+%3C+40',
    '?e=scrapers&f_engine=headless&q=reddit',
    '?e=logs&f_level=error',
    '?e=settings&f_section=access',
  ]

  it.each(cases)('parse then serialize is stable for %s', (search) => {
    const query = parseQuery(search, iRadarSchema)
    const written = serializeQuery(query, iRadarSchema, {}, search)
    expect(parseQuery(written, iRadarSchema)).toEqual(query)
  })

  it('is stable across a second schema', () => {
    const search = '?e=pieces&v=grid&f_category=brick,plate&f_firstYear=1970..1990'
    const query = parseQuery(search, legoSchema)
    const written = serializeQuery(query, legoSchema, {}, search)
    expect(parseQuery(written, legoSchema)).toEqual(query)
    expect(written).toContain('f_firstYear=1970..1990')
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
