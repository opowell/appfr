import { describe, expect, it } from 'vitest'
import { createMemoryDataSource, queryAll } from '../../src/data/memory'
import { createMockDataSource } from '../../src/data/mock'
import { parseQuery } from '../../src/query/codec'
import { findEntity } from '../../src/query/schema'
import { iRadarSchema } from '../../src/fixtures/schemas'
import type { DomainSchema, EntitySchema, QueryResult, ShellRow } from '../../src/types'

/**
 * A corpus the way a host whose API returns whole lists has one: real rows,
 * some of them never crawled — no date under the date that orders them.
 */
const hosts: EntitySchema = {
  key: 'hosts',
  label: 'Hosts',
  count: '5',
  scope: 'host',
  tabs: [],
  samples: [],
  facets: [{ kind: 'chips', key: 'region', label: 'Region', options: ['eu', 'us'] }],
  columns: [
    { key: 'primary', role: 'identity', label: 'Host', sort: 'name' },
    { key: 'metric1', role: 'metric', kind: 'number', label: 'URLs', sort: 'metric1' },
    { key: 'crawled', role: 'updated', kind: 'date', label: 'Crawled', sort: 'updated' },
  ],
}

const specs: EntitySchema = {
  key: 'specs',
  label: 'Specs',
  count: '2',
  tabs: [],
  samples: [],
  facets: [],
  columns: [
    { key: 'primary', role: 'identity', label: 'Spec', sort: 'name' },
    { key: 'crawled', kind: 'date', label: 'Written', sort: 'updated' },
  ],
}

const schema: DomainSchema = {
  key: 'test-ui',
  label: 'Test UI',
  kicker: '',
  placeholder: '',
  entities: [hosts, specs],
  columns: [
    { key: 'primary', role: 'identity', label: 'Name', sort: 'name' },
    { key: 'crawled', role: 'updated', kind: 'date', label: 'Updated', sort: 'updated' },
  ],
}

const row = (entity: EntitySchema, id: string, fields: ShellRow['fields']): ShellRow => ({
  id,
  entityKey: entity.key,
  entityLabel: entity.label,
  fields: { primary: id, ...fields },
})

const rows: ShellRow[] = [
  row(hosts, 'a.example', { crawled: '2026-03-01T00:00:00Z', metric1: 4, region: 'eu', host: ['a.example'] }),
  row(hosts, 'b.example', { crawled: '', metric1: 0, region: 'us', host: ['b.example'] }),
  row(hosts, 'c.example', { crawled: '2026-05-01T00:00:00Z', metric1: 9, region: 'eu', host: ['c.example'] }),
  row(hosts, 'd.example', { metric1: 2, region: 'us', host: ['d.example'] }),
  row(hosts, 'e.example', { crawled: '2026-01-01T00:00:00Z', metric1: 1, region: 'eu', host: ['e.example'] }),
  row(specs, 'x.spec.ts', { crawled: '2026-04-01T00:00:00Z', host: ['a.example'] }),
  row(specs, 'y.spec.ts', { crawled: '2026-02-01T00:00:00Z', host: ['c.example'] }),
  // A type the schema does not declare is no part of any answer.
  { id: 'stray', entityKey: 'strays', entityLabel: 'Strays', fields: { primary: 'stray' } },
]

const source = createMemoryDataSource(rows)

const run = (search: string, limit = 50, offset = 0): QueryResult => {
  const query = parseQuery(search, schema)
  return source.query({ query, schema, entity: findEntity(schema, query.entity), limit, offset })
}

const ids = (result: QueryResult) => result.rows.map((entry) => entry.id)

describe('createMemoryDataSource', () => {
  it('answers in the same tick', () => {
    expect(run('?e=hosts')).not.toBeInstanceOf(Promise)
  })

  it('spans every declared type at home, and none it does not declare', () => {
    const result = run('')
    expect(result.total).toBe(7)
    expect(ids(result)).not.toContain('stray')
    expect(result.unfiltered).toBe(true)
  })

  it('orders dates newest first, and the undated last', () => {
    expect(ids(run('?e=hosts&s=updated'))).toEqual([
      'c.example',
      'a.example',
      'e.example',
      'b.example',
      'd.example',
    ])
  })

  it('keeps the undated last when the direction is turned', () => {
    expect(ids(run('?e=hosts&s=updated&d=asc'))).toEqual([
      'e.example',
      'a.example',
      'c.example',
      'b.example',
      'd.example',
    ])
  })

  it('holds out only under a date: a metric of 0 is a value, and sorts', () => {
    expect(ids(run('?e=hosts&s=metric1&d=asc'))).toEqual([
      'b.example',
      'e.example',
      'd.example',
      'a.example',
      'c.example',
    ])
  })

  it("orders the whole corpus by the schema's own date column, the undated last", () => {
    expect(ids(run('?s=updated'))).toEqual([
      'c.example',
      'x.spec.ts',
      'a.example',
      'y.spec.ts',
      'e.example',
      'b.example',
      'd.example',
    ])
  })

  it('reads a limit of 0 as every row', () => {
    expect(run('?e=hosts', 0).rows).toHaveLength(5)
    expect(run('?e=hosts', 0, 3).rows).toHaveLength(2)
  })

  it('pages with the total still the whole match', () => {
    const result = run('?e=hosts&s=updated', 2, 2)
    expect(ids(result)).toEqual(['e.example', 'b.example'])
    expect(result.total).toBe(5)
  })

  it("applies a type's facets only to that type", () => {
    const result = run('?e=hosts&q=region=eu')
    expect(result.total).toBe(3)
    expect(result.unfiltered).toBe(false)
  })

  it('applies the expression, joins and all', () => {
    expect(ids(run('?e=specs&q=host%3D%22a.example%22'))).toEqual(['x.spec.ts'])
  })
})

describe('queryAll', () => {
  it('is every row a query matches, in its order', () => {
    const query = parseQuery('?e=hosts&s=updated', schema)
    const all = queryAll(source, { query, schema, entity: hosts })
    expect(all.map((entry) => entry.id)).toEqual(ids(run('?e=hosts&s=updated', 0)))
  })

  it('is every row of a source that reads a limit of 0 as nothing', () => {
    const mock = createMockDataSource({ seed: 'iRadar' })
    const query = parseQuery('?e=items', iRadarSchema)
    const entity = findEntity(iRadarSchema, 'items')
    // The mock's reading of 0 is the one it always had.
    expect(mock.query({ query, schema: iRadarSchema, entity, limit: 0, offset: 0 }).rows).toEqual([])
    expect(queryAll(mock, { query, schema: iRadarSchema, entity })).toHaveLength(48)
  })
})
