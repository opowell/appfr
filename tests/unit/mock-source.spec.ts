import { describe, expect, it } from 'vitest'
import { createMockDataSource, generateRows, matchesFacets } from '../../src/data/mock'
import { parseQuery } from '../../src/query/codec'
import { defaultQuery, findEntity } from '../../src/query/schema'
import { commerceSchema, iRadarSchema, schemaList } from '../../src/fixtures/schemas'
import type { ChipsFacet, QueryResult, ShellRow } from '../../src/types'

const searches = findEntity(iRadarSchema, 'searches')!
const items = findEntity(iRadarSchema, 'items')!
const tenants = findEntity(commerceSchema, 'tenants')!

/** The fixture's multi-valued facet: a tenant runs in one region or several. */
const REGION = tenants.facets.find((facet) => facet.key === 'region') as ChipsFacet

/** Rows generated per entity by the source under test. */
const PER_ENTITY = 48
const ENTITY_COUNT = iRadarSchema.entities.length
const CORPUS = PER_ENTITY * ENTITY_COUNT

const run = (search: string, limit = 500): QueryResult => {
  const query = parseQuery(search, iRadarSchema)
  return createMockDataSource({ seed: 'iRadar' }).query({
    query,
    schema: iRadarSchema,
    entity: findEntity(iRadarSchema, query.entity),
    limit,
    // What the shell derives, so `?p=` in a search string pages here too.
    offset: (query.page - 1) * limit,
  })
}

describe('generateRows', () => {
  it('is deterministic for a given seed', () => {
    const a = generateRows(searches, { seed: 'x', population: 12 })
    const b = generateRows(searches, { seed: 'x', population: 12 })
    expect(a).toEqual(b)
  })

  it('varies with the seed', () => {
    const a = generateRows(searches, { seed: 'x', population: 12 })
    const b = generateRows(searches, { seed: 'y', population: 12 })
    expect(a).not.toEqual(b)
  })

  it('stamps every row with the entity it came from', () => {
    for (const row of generateRows(items, { seed: 'x', population: 5 })) {
      expect(row.entityKey).toBe('items')
      expect(row.entityLabel).toBe('Items')
    }
  })

  it('gives every row a unique id and identity', () => {
    const rows = generateRows(searches, { seed: 'x', population: 30 })
    expect(new Set(rows.map((r) => r.id)).size).toBe(30)
    expect(new Set(rows.map((r) => r.fields.primary)).size).toBe(30)
  })

  it('populates a value for every facet the entity declares', () => {
    const rows = generateRows(items, { seed: 'x', population: 10 })
    for (const row of rows) {
      // The bag holds the columns' fields too, so this asks that the facets
      // are among them rather than that they are all of them.
      for (const facet of items.facets) expect(row.fields).toHaveProperty(facet.key)
      expect(typeof row.fields.kind).toBe('string')
      expect(typeof row.fields.rank).toBe('number')
      expect(typeof row.fields.seen).toBe('boolean')
    }
  })

  it('draws a multi-valued chips facet as a list of its options', () => {
    const options = new Set(REGION.options)
    let sawSeveral = false
    for (const row of generateRows(tenants, { seed: 'x', population: PER_ENTITY })) {
      const values = row.fields[REGION.key]
      expect(Array.isArray(values)).toBe(true)
      const list = values as string[]
      expect(list.length).toBeGreaterThan(0)
      expect(new Set(list).size).toBe(list.length)
      for (const value of list) expect(options.has(value)).toBe(true)
      if (list.length > 1) sawSeveral = true
    }
    expect(sawSeveral).toBe(true)
  })

  it('keeps range values inside the facet bounds', () => {
    for (const row of generateRows(items, { seed: 'x', population: PER_ENTITY })) {
      expect(row.fields.rank).toBeGreaterThanOrEqual(0)
      expect(row.fields.rank).toBeLessThanOrEqual(100)
    }
  })

  it('dates every row at or before `now`', () => {
    const now = new Date('2026-08-25T00:00:00Z')
    for (const row of generateRows(searches, { seed: 'x', population: 20, now })) {
      expect(Date.parse(String(row.fields.updatedAt))).toBeLessThanOrEqual(now.getTime())
    }
  })
})

describe('matchesFacets', () => {
  const [subject] = generateRows(items, { seed: 'x', population: 1 })

  it('lets everything through when facets are neutral', () => {
    expect(matchesFacets(subject!, {})).toBe(true)
  })

  it('excludes a row outside a selected chip set', () => {
    const facets = { kind: { kind: 'chips' as const, selected: ['feed'] } }
    expect(matchesFacets({ ...subject!, fields: { ...subject!.fields, kind: 'page' } }, facets)).toBe(
      false,
    )
  })

  it('keeps a row holding a selected value among several', () => {
    const row = { ...subject!, fields: { ...subject!.fields, kind: ['feed', 'page'] } }
    expect(matchesFacets(row, { kind: { kind: 'chips' as const, selected: ['feed'] } })).toBe(true)
    expect(matchesFacets(row, { kind: { kind: 'chips' as const, selected: ['image'] } })).toBe(false)
  })

  it('excludes a row holding no value at all for a selected chip set', () => {
    const row = { ...subject!, fields: { ...subject!.fields, kind: [] } }
    expect(matchesFacets(row, { kind: { kind: 'chips' as const, selected: ['feed'] } })).toBe(false)
  })

  it('applies range bounds inclusively', () => {
    const row = { ...subject!, fields: { ...subject!.fields, rank: 40 } }
    expect(matchesFacets(row, { rank: { kind: 'range', min: 40, max: 40 } })).toBe(true)
    expect(matchesFacets(row, { rank: { kind: 'range', min: 41, max: null } })).toBe(false)
    expect(matchesFacets(row, { rank: { kind: 'range', min: null, max: 39 } })).toBe(false)
  })

  it('only constrains a toggle when it is on', () => {
    const row = { ...subject!, fields: { ...subject!.fields, seen: false } }
    expect(matchesFacets(row, { seen: { kind: 'toggle', on: false } })).toBe(true)
    expect(matchesFacets(row, { seen: { kind: 'toggle', on: true } })).toBe(false)
  })
})

describe('createMockDataSource — the whole corpus', () => {
  it('returns every entity when none is selected', () => {
    const result = run('')
    expect(result.total).toBe(CORPUS)
    expect(result.unfiltered).toBe(true)
  })

  it('includes logs and settings, because they are entities like any other', () => {
    const kinds = new Set(run('').rows.map((row) => row.entityKey))
    expect(kinds).toEqual(new Set(iRadarSchema.entities.map((entity) => entity.key)))
    expect(kinds).toContain('logs')
    expect(kinds).toContain('settings')
  })

  it('filters them out only when asked, by entity', () => {
    const scoped = run('?e=searches')
    expect(scoped.total).toBe(PER_ENTITY)
    expect(new Set(scoped.rows.map((row) => row.entityKey))).toEqual(new Set(['searches']))
  })

  it('filters them out by expression too', () => {
    const logsOnly = run('?q=entity:logs')
    expect(logsOnly.total).toBe(PER_ENTITY)
    expect(logsOnly.rows.every((row) => row.entityKey === 'logs')).toBe(true)

    const settingsOnly = run('?q=entity:settings')
    expect(settingsOnly.rows.every((row) => row.entityKey === 'settings')).toBe(true)
  })

  it('searches across entities at once', () => {
    // A word that only appears among settings still finds them from home.
    const result = run('?q=digest')
    expect(result.total).toBeGreaterThan(0)
    expect(result.rows.every((row) => row.entityKey === 'settings')).toBe(true)
  })

  it('ignores facet values while unscoped, since facets are per entity', () => {
    // `f_kind` belongs to `items`; with no entity selected it is not parsed.
    expect(run('?f_kind=page').total).toBe(CORPUS)
  })

  it('sorts a mixed result set by date', () => {
    const dates = run('').rows.map((row) => Date.parse(String(row.fields.updatedAt)))
    expect(dates).toEqual([...dates].sort((a, b) => b - a))
  })
})

describe('createMockDataSource — one entity', () => {
  it('applies the limit without changing the total', () => {
    const result = run('?e=searches', 5)
    expect(result.rows).toHaveLength(5)
    expect(result.total).toBe(PER_ENTITY)
  })

  it('narrows on a chip facet', () => {
    const result = run('?e=searches&f_state=running')
    expect(result.total).toBeGreaterThan(0)
    expect(result.total).toBeLessThan(PER_ENTITY)
    expect(result.rows.every((r) => r.fields.state === 'running')).toBe(true)
    expect(result.unfiltered).toBe(false)
  })

  it('widens as more chips are selected', () => {
    const one = run('?e=searches&f_state=running').total
    const two = run('?e=searches&f_state=running,paused').total
    expect(two).toBeGreaterThan(one)
  })

  it('intersects independent facets', () => {
    const state = run('?e=searches&f_state=running').total
    const both = run('?e=searches&f_state=running&f_schedule=daily')
    expect(both.total).toBeLessThanOrEqual(state)
    expect(
      both.rows.every((r) => r.fields.state === 'running' && r.fields.schedule === 'daily'),
    ).toBe(true)
  })

  it('combines the expression with the facets', () => {
    const facetOnly = run('?e=items&f_kind=page').total
    const both = run('?e=items&f_kind=page&q=release')
    expect(both.total).toBeLessThanOrEqual(facetOnly)
    expect(
      both.rows.every(
        (r) => r.fields.kind === 'page' && /release/i.test(`${r.fields.primary} ${r.fields.secondary}`),
      ),
    ).toBe(true)
  })

  it('can return nothing', () => {
    const result = run('?q=definitelynotpresentanywhere')
    expect(result.rows).toHaveLength(0)
    expect(result.total).toBe(0)
  })

  it('reverses on ascending', () => {
    const parseDate = (row: ShellRow) => Date.parse(String(row.fields.updatedAt))
    const desc = run('?e=searches').rows.map(parseDate)
    const asc = run('?e=searches&d=asc').rows.map(parseDate)
    expect(asc).toEqual([...desc].reverse())
  })

  it('sorts by score', () => {
    const scores = run('?e=searches&s=score').rows.map((r) => Number(r.fields.score))
    expect(scores).toEqual([...scores].sort((a, b) => b - a))
  })

  it('sorts by name A→Z when ascending', () => {
    const names = run('?e=searches&s=name&d=asc').rows.map((r) => String(r.fields.primary))
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })

  it('sorts by the entity metric', () => {
    const values = run('?e=searches&s=metric1').rows.map((r) => Number(r.fields.metric1))
    expect(values).toEqual([...values].sort((a, b) => b - a))
  })
})

describe('createMockDataSource — paging', () => {
  it('returns the page the offset asks for, without changing the total', () => {
    const first = run('?e=searches', 10)
    const second = run('?e=searches&p=2', 10)

    expect(second.rows).toHaveLength(10)
    expect(second.total).toBe(PER_ENTITY)
    // A different slice of the same ordering, not the same rows again.
    expect(second.rows.map((r) => r.id)).not.toEqual(first.rows.map((r) => r.id))
  })

  it('pages cover the result set once, in order and with no repeats', () => {
    const whole = run('?e=searches').rows.map((r) => r.id)
    const paged = [1, 2, 3, 4, 5].flatMap((page) => run(`?e=searches&p=${page}`, 10).rows.map((r) => r.id))

    expect(paged).toEqual(whole)
    expect(new Set(paged).size).toBe(whole.length)
  })

  it('the last page is short when the total does not divide evenly', () => {
    // Forty-eight rows, ten to a page: five pages, the last of eight.
    expect(run('?e=searches&p=5', 10).rows).toHaveLength(PER_ENTITY - 40)
  })

  it('a page past the end is empty, and still reports the whole match', () => {
    const result = run('?e=searches&p=99', 10)
    expect(result.rows).toHaveLength(0)
    expect(result.total).toBe(PER_ENTITY)
  })

  it('pages the whole corpus the same way', () => {
    const result = run('?p=3', 50)
    expect(result.rows).toHaveLength(50)
    expect(result.total).toBe(CORPUS)
  })
})

describe('createMockDataSource — a multi-valued facet', () => {
  const commerce = (search: string): QueryResult => {
    const query = parseQuery(search, commerceSchema)
    return createMockDataSource({ seed: 'Commerce' }).query({
      query,
      schema: commerceSchema,
      entity: findEntity(commerceSchema, query.entity),
      limit: 500,
      offset: 0,
    })
  }

  const ALL = `?e=${tenants.key}`
  const withRegions = (...values: string[]) => `${ALL}&f_${REGION.key}=${values.join(',')}`

  it('counts a row under every value it holds, so the buckets overlap', () => {
    const total = commerce(ALL).total
    const summed = REGION.options.reduce((sum, value) => sum + commerce(withRegions(value)).total, 0)

    // Impossible if each row sat in exactly one bucket, which is the point.
    expect(summed).toBeGreaterThan(total)
    for (const value of REGION.options) {
      expect(commerce(withRegions(value)).total, value).toBeGreaterThan(0)
      expect(commerce(withRegions(value)).total, value).toBeLessThan(total)
    }
  })

  it('narrows to the rows holding either value when two are selected', () => {
    const [first, second] = REGION.options as [string, string]
    const either = commerce(withRegions(first, second)).total

    expect(either).toBeGreaterThanOrEqual(commerce(withRegions(first)).total)
    expect(either).toBeLessThanOrEqual(
      commerce(withRegions(first)).total + commerce(withRegions(second)).total,
    )
  })

  it('selects everything back when every value is chosen', () => {
    expect(commerce(withRegions(...REGION.options)).total).toBe(commerce(ALL).total)
  })
})

describe('createMockDataSource — every bundled schema', () => {
  it('serves the whole corpus and each entity in turn', () => {
    for (const schema of schemaList) {
      const source = createMockDataSource({ seed: schema.key })

      const everything = source.query({
        query: defaultQuery(schema),
        schema,
        entity: null,
        limit: 10,
        offset: 0,
      })
      expect(everything.rows.length, `${schema.key}/everything`).toBe(10)
      expect(everything.total, `${schema.key}/everything`).toBe(
        PER_ENTITY * schema.entities.length,
      )

      for (const entity of schema.entities) {
        const result = source.query({
          query: { ...defaultQuery(schema), entity: entity.key },
          schema,
          entity,
          limit: 10,
          offset: 0,
        })
        expect(result.rows.length, `${schema.key}/${entity.key}`).toBe(10)
        expect(result.rows[0]!.fields.primary).toBeTruthy()
      }
    }
  })

  it('gives every schema a logs and a settings entity', () => {
    for (const schema of schemaList) {
      const keys = schema.entities.map((entity) => entity.key)
      expect(keys, schema.key).toContain('logs')
      expect(keys, schema.key).toContain('settings')
    }
  })
})
