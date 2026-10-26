import { describe, expect, it } from 'vitest'
import {
  bytesCell,
  dateColumn,
  durationCell,
  elapsedCell,
  entityColumn,
  facetColumn,
  flagColumn,
  identityColumn,
  metricColumn,
  ordinalColumn,
  percentCell,
  pictureColumn,
  referenceColumn,
  stateColumn,
  tintColumn,
} from '../../src/query/presets'
import { cellText, cellValue, columnClass, columnsFor, EMPTY_CELL } from '../../src/query/columns'
import { tintFor, MOCK_TINTS } from '../../src/data/mock'
import type { ShellRow } from '../../src/types'

const row: ShellRow = {
  id: 'x.spec.ts',
  entityKey: 'tests',
  entityLabel: 'Tests',
  fields: {
    primary: 'Checkout',
    secondary: 'tests/x.spec.ts',
    metric1: 12,
    status: 'ok',
    lastUpdated: '2026-10-01T00:00:00Z',
    crawled: true,
    recorded: false,
    stub: true,
  },
}

describe('column presets', () => {
  it('read the familiar fields under their roles', () => {
    expect(cellValue(identityColumn('Spec'), row)).toBe('Checkout')
    expect(cellValue(referenceColumn('Path'), row)).toBe('tests/x.spec.ts')
    expect(cellValue(metricColumn('metric1', 'Cases'), row)).toBe(12)
    expect(cellValue(stateColumn(), row)).toBe('ok')
    expect(cellValue(entityColumn(), row)).toBe('Tests')
    expect(identityColumn('Spec')).toMatchObject({ role: 'identity', sort: 'name', activate: true })
    expect(identityColumn('Spec').scope).toBeUndefined()
    expect(metricColumn('metric1', 'Cases')).toMatchObject({ role: 'metric', kind: 'number', sort: 'metric1' })
    expect(dateColumn('lastUpdated', 'Last updated')).toMatchObject({ kind: 'date', sort: 'lastUpdated' })
  })

  it('take what a type says differently over their defaults', () => {
    expect(identityColumn('Spec', { scope: true }).scope).toBe(true)
    expect(metricColumn('metric1', 'Cases', { drill: 'cases', width: '80px' })).toMatchObject({
      drill: 'cases',
      width: '80px',
      hideBelow: 760,
    })
    expect(dateColumn('lastUpdated', 'Last updated', { role: 'updated', sort: 'updated' })).toMatchObject({
      role: 'updated',
      sort: 'updated',
    })
    expect(stateColumn({ width: '90px' }).width).toBe('90px')
  })

  it('are a fresh object each time', () => {
    const one = ordinalColumn()
    one.width = '1px'
    expect(ordinalColumn().width).toBe('52px')
  })

  it('keep the table class on the entity column', () => {
    expect(columnClass(entityColumn())).toBe('dc-table__entity')
  })

  it('leave the tint out of the table, and keep the picture in it', () => {
    const set = columnsFor(null, {
      key: 'tests',
      label: 'Tests',
      count: '1',
      facets: [],
      tabs: [],
      samples: [],
      columns: [pictureColumn(), identityColumn('Spec'), tintColumn()],
    })
    expect(set.map((column) => column.role)).toEqual(['image', 'identity'])
  })

  it('say a field of its own by its facet key', () => {
    expect(facetColumn('host', 'Host')).toMatchObject({ key: 'host', label: 'Host', truncate: true })
  })

  it('name the true flags, in the order given', () => {
    const flags = flagColumn('flags', 'Flags', { stub: 'stub', crawled: 'crawled', recorded: 'recorded' })
    expect(cellValue(flags, row)).toEqual(['stub', 'crawled'])
    expect(cellText(flags, row)).toBe('stub, crawled')
    expect(cellText(flags, { ...row, fields: {} })).toBe(EMPTY_CELL)
  })
})

describe('cell formats', () => {
  it('format a number held however a row holds it', () => {
    expect(bytesCell(28_000)).toBe('28.0 kB')
    expect(bytesCell('1200000')).toBe('1.2 MB')
    expect(durationCell(640)).toBe('640ms')
    expect(elapsedCell(102)).toBe('1:42')
    expect(percentCell(0.5)).toBe('50%')
    expect(percentCell(0)).toBe('0%')
  })

  it('draw the empty cell for what is no number, and for nothing', () => {
    for (const format of [bytesCell, durationCell, elapsedCell, percentCell]) {
      expect(format(null)).toBe(EMPTY_CELL)
      expect(format(undefined)).toBe(EMPTY_CELL)
      expect(format('')).toBe(EMPTY_CELL)
      expect(format('soon')).toBe(EMPTY_CELL)
    }
    expect(bytesCell(0)).toBe(EMPTY_CELL)
    expect(elapsedCell(0)).toBe(EMPTY_CELL)
    expect(durationCell(0)).toBe(EMPTY_CELL)
  })

  it('are a column format', () => {
    const column = metricColumn('metric1', 'Size', { format: bytesCell })
    expect(cellText(column, { ...row, fields: { metric1: 4_500_000 } })).toBe('4.5 MB')
  })
})

describe('tintFor', () => {
  it('is one of the palette, the same every time', () => {
    expect(MOCK_TINTS).toContain(tintFor('x.spec.ts'))
    expect(tintFor('x.spec.ts')).toBe(tintFor('x.spec.ts'))
    const spread = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(tintFor))
    expect(spread.size).toBeGreaterThan(1)
  })
})
