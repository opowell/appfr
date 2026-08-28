import { describe, expect, it } from 'vitest'
import { createMockDataSource, generateRows, matchesFacets } from '../../src/data/mock'
import { parseQuery } from '../../src/query/codec'
import { defaultQuery, findEntity } from '../../src/query/schema'
import { iRadarSchema, schemaList } from '../../src/fixtures/schemas'
import type { QueryResult } from '../../src/types'

const searches = findEntity(iRadarSchema, 'searches')!
const items = findEntity(iRadarSchema, 'items')!

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
    expect(new Set(rows.map((r) => r.primary)).size).toBe(30)
  })

  it('populates a value for every facet the entity declares', () => {
    const rows = generateRows(items, { seed: 'x', population: 10 })
    for (const row of rows) {
      expect(Object.keys(row.facets).sort()).toEqual(items.facets.map((f) => f.key).sort())
      expect(typeof row.facets.kind).toBe('string')
      expect(typeof row.facets.rank).toBe('number')
      expect(typeof row.facets.seen).toBe('boolean')
    }
  })

  it('keeps range values inside the facet bounds', () => {
    for (const row of generateRows(items, { seed: 'x', population: PER_ENTITY })) {
      expect(row.facets.rank).toBeGreaterThanOrEqual(0)
      expect(row.facets.rank).toBeLessThanOrEqual(100)
    }
  })

  it('dates every row at or before `now`', () => {
    const now = new Date('2026-08-25T00:00:00Z')
    for (const row of generateRows(searches, { seed: 'x', population: 20, now })) {
      expect(Date.parse(row.updatedAt)).toBeLessThanOrEqual(now.getTime())
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
    expect(matchesFacets({ ...subject!, facets: { ...subject!.facets, kind: 'page' } }, facets)).toBe(
      false,
    )
  })

  it('applies range bounds inclusively', () => {
    const row = { ...subject!, facets: { ...subject!.facets, rank: 40 } }
    expect(matchesFacets(row, { rank: { kind: 'range', min: 40, max: 40 } })).toBe(true)
    expect(matchesFacets(row, { rank: { kind: 'range', min: 41, max: null } })).toBe(false)
    expect(matchesFacets(row, { rank: { kind: 'range', min: null, max: 39 } })).toBe(false)
  })

  it('only constrains a toggle when it is on', () => {
    const row = { ...subject!, facets: { ...subject!.facets, seen: false } }
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
    const dates = run('').rows.map((row) => Date.parse(row.updatedAt))
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
    expect(result.rows.every((r) => r.facets.state === 'running')).toBe(true)
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
      both.rows.every((r) => r.facets.state === 'running' && r.facets.schedule === 'daily'),
    ).toBe(true)
  })

  it('combines the expression with the facets', () => {
    const facetOnly = run('?e=items&f_kind=page').total
    const both = run('?e=items&f_kind=page&q=release')
    expect(both.total).toBeLessThanOrEqual(facetOnly)
    expect(
      both.rows.every(
        (r) => r.facets.kind === 'page' && /release/i.test(`${r.primary} ${r.secondary}`),
      ),
    ).toBe(true)
  })

  it('can return nothing', () => {
    const result = run('?q=definitelynotpresentanywhere')
    expect(result.rows).toHaveLength(0)
    expect(result.total).toBe(0)
  })

  it('reverses on ascending', () => {
    const desc = run('?e=searches').rows.map((r) => Date.parse(r.updatedAt))
    const asc = run('?e=searches&d=asc').rows.map((r) => Date.parse(r.updatedAt))
    expect(asc).toEqual([...desc].reverse())
  })

  it('sorts by score', () => {
    const scores = run('?e=searches&s=score').rows.map((r) => r.score)
    expect(scores).toEqual([...scores].sort((a, b) => b - a))
  })

  it('sorts by name A→Z when ascending', () => {
    const names = run('?e=searches&s=name&d=asc').rows.map((r) => r.primary)
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })

  it('sorts by the entity metric', () => {
    const values = run('?e=searches&s=metric1').rows.map((r) => r.metric1)
    expect(values).toEqual([...values].sort((a, b) => b - a))
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
        })
        expect(result.rows.length, `${schema.key}/${entity.key}`).toBe(10)
        expect(result.rows[0]!.primary).toBeTruthy()
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
