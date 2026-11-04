import { describe, expect, it } from 'vitest'
import { cellNarrowings, columnNarrows, numberRange } from '../../src/query/narrowing'
import { chipsFrom, rangeFrom, toggleFacet } from '../../src/query/facets'
import { facetColumn, flagColumn, metricColumn, percentCell } from '../../src/query/presets'
import { formatTerm } from '../../src/data/expression'
import type { ColumnDef, EntitySchema, ShellRow } from '../../src/types'

const row = (fields: Record<string, unknown>, id = 'a'): ShellRow => ({
  id,
  entityKey: 'tenants',
  entityLabel: 'Tenants',
  fields,
})

const rows = [
  row({ recorded: 0, tests: 55, container: 'dO', deployed: true, covered: false, ran: true }, 'a'),
  row({ recorded: 0.9912087912, tests: 3, container: ['dO', 'l2'], deployed: true, covered: true }, 'b'),
  row({ recorded: 1, tests: 0, container: 'l2' }, 'c'),
]

const entity: EntitySchema = {
  key: 'tenants',
  label: 'Tenants',
  count: rows.length,
  facets: [
    chipsFrom(rows, 'container', 'Container', { multiple: true }),
    toggleFacet('deployed', 'Deployed', 'Only deployed hosts'),
    rangeFrom(rows, 'tests', 'Tests'),
  ],
  tabs: [],
  samples: [],
}

const recorded: ColumnDef = { key: 'recorded', kind: 'number', label: 'Recorded', format: percentCell }
const coverage = flagColumn('reach', 'Coverage', { deployed: 'deployed', covered: 'covered', ran: 'run' })

/** What a press on each part of the cell adds, written as the query writes it. */
function terms(column: ColumnDef, at: ShellRow): Array<[string | null, string]> {
  return cellNarrowings(column, at, entity, numberRange(column, rows)).map((n) => [n.label, formatTerm(n.term)])
}

describe('narrowing from a cell', () => {
  it('keeps the low end for a number nearer the bottom of its range', () => {
    expect(terms(recorded, rows[0]!)).toEqual([[null, 'recorded<=0']])
  })

  it('keeps the high end for one nearer the top, rounded outwards so the row stays in', () => {
    expect(terms(recorded, rows[1]!)).toEqual([[null, 'recorded>=0.9912']])
    expect(terms(recorded, rows[2]!)).toEqual([[null, 'recorded>=1']])
  })

  it('measures against the column’s range facet where it has one, not the rows', () => {
    // 3 of a facet running 0..100 is near the bottom, though it is mid-way between 0 and 55.
    expect(terms(metricColumn('tests', 'Tests'), rows[1]!)).toEqual([[null, 'tests<=3']])
  })

  it('names each set flag as a press of its own', () => {
    expect(terms(coverage, rows[0]!)).toEqual([['deployed', 'deployed:true'], ['run', 'ran:true']])
    expect(terms(coverage, rows[2]!)).toEqual([])
  })

  it('narrows to a chips facet’s value, and to each of several', () => {
    const container = facetColumn('container', 'Container')
    expect(terms(container, rows[0]!)).toEqual([[null, 'container=dO']])
    expect(terms(container, rows[1]!)).toEqual([['dO', 'container=dO'], ['l2', 'container=l2']])
  })

  it('offers nothing for text no facet holds, nor for a date', () => {
    expect(terms({ key: 'host', label: 'Host' }, row({ host: 'a.example' }))).toEqual([])
    expect(columnNarrows({ key: 'updatedAt', kind: 'date' })).toBe(false)
  })

  it('leaves a column pressed for something else, or one that says not to, alone', () => {
    expect(columnNarrows(metricColumn('tests', 'Tests', { drill: 'tests' }))).toBe(false)
    expect(columnNarrows({ key: 'name', activate: true })).toBe(false)
    expect(columnNarrows({ ...recorded, narrow: false })).toBe(false)
    expect(columnNarrows(recorded)).toBe(true)
  })

  it('reads the range of a column over the rows, and none where no row holds a number', () => {
    expect(numberRange(recorded, rows)).toEqual({ min: 0, max: 1 })
    expect(numberRange({ key: 'missing', kind: 'number' }, rows)).toBeNull()
  })
})
