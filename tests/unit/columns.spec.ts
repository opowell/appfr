import { describe, expect, it } from 'vitest'
import {
  cellText,
  cellValue,
  columnAlign,
  columnClass,
  columnKey,
  columnsFor,
  columnTruncates,
  defaultCellText,
  defaultColumns,
  EMPTY_CELL,
  rowKey,
} from '../../src/query/columns'
import { findEntity } from '../../src/query/schema'
import { iRadarSchema, legoSchema } from '../../src/fixtures/schemas'
import type { ColumnDef, DomainSchema, EntitySchema, ShellRow } from '../../src/types'

const searches = findEntity(iRadarSchema, 'searches')!
const pieces = findEntity(legoSchema, 'pieces')!

const row = (overrides: Partial<ShellRow> = {}): ShellRow => ({
  id: 'pieces_10007',
  entityKey: 'pieces',
  entityLabel: 'Pieces',
  primary: 'Brick 2 x 4',
  secondary: '3001',
  status: 'ok',
  score: 0.6,
  metric1: 1240,
  metric2: 8,
  updatedAt: '2026-08-20T00:00:00.000Z',
  tint: 'oklch(0.36 0.06 240)',
  facets: { shape: 'brick', firstYear: 1958, rarity: true, colors: ['red', 'blue'] },
  ...overrides,
})

const keys = (columns: ColumnDef[]) => columns.map((column) => column.key)

describe('defaultColumns', () => {
  it('is the eight the shell drew before columns existed', () => {
    expect(keys(defaultColumns(searches))).toEqual([
      'ordinal',
      'primary',
      'secondary',
      'entityLabel',
      'metric1',
      'metric2',
      'updatedAt',
      'status',
    ])
  })

  it('heads the identity and metric columns with the entity’s own labels', () => {
    const columns = defaultColumns(searches)
    expect(columns.find((column) => column.key === 'primary')?.label).toBe(searches.labels.primary)
    expect(columns.find((column) => column.key === 'metric1')?.label).toBe(searches.labels.metric1)
  })

  it('falls back to generic labels across every entity', () => {
    const columns = defaultColumns(null)
    expect(columns.find((column) => column.key === 'primary')?.label).toBe('Item')
    expect(columns.find((column) => column.key === 'metric1')?.label).toBe('Metric')
  })

  it('makes a metric pressable only where the entity says what it counts', () => {
    const sets = findEntity(legoSchema, 'sets')!
    const columns = defaultColumns(sets)
    // Parts leads to the pieces; minifigs counts nothing this schema lists.
    expect(columns.find((column) => column.key === 'metric1')?.drill).toBe('pieces')
    expect(columns.find((column) => column.key === 'metric2')?.drill).toBeUndefined()
  })
})

describe('columnsFor', () => {
  it('keeps the row’s type only where the results are of several', () => {
    expect(keys(columnsFor(iRadarSchema, null))).toContain('entityLabel')
    expect(keys(columnsFor(iRadarSchema, searches))).not.toContain('entityLabel')
  })

  it('takes the entity’s own set over the default one', () => {
    expect(keys(columnsFor(legoSchema, pieces))).toEqual(keys(pieces.columns!))
    expect(keys(columnsFor(legoSchema, pieces))).not.toEqual(keys(defaultColumns(pieces)))
  })

  it('takes the schema’s set across every entity', () => {
    const schema: DomainSchema = {
      ...iRadarSchema,
      columns: [{ key: 'primary' }, { key: 'entityLabel', label: 'Kind' }],
    }
    expect(keys(columnsFor(schema, null))).toEqual(['primary', 'entityLabel'])
    // An entity's own list is still the default set: the schema's is for the
    // mixed result, where no single entity's vocabulary applies.
    expect(keys(columnsFor(schema, searches))).toEqual(keys(columnsFor(iRadarSchema, searches)))
  })

  it('drops the columns this scope is not the one for', () => {
    const entity: EntitySchema = {
      ...searches,
      columns: [
        { key: 'primary' },
        { key: 'entityLabel', when: 'everything' },
        { key: 'secondary', when: 'scoped' },
      ],
    }
    expect(keys(columnsFor(iRadarSchema, entity))).toEqual(['primary', 'secondary'])
  })

  /*
   * The shell invents no columns. A type that has not said what its table is
   * has no table, the same way a type that names no `create` offers no button:
   * reading one out of the labels would be the component deciding what the
   * data is.
   */
  it('is nothing at all where nothing was declared', () => {
    const bare: EntitySchema = { ...searches }
    delete bare.columns
    expect(columnsFor(iRadarSchema, bare)).toEqual([])

    const empty: EntitySchema = { ...searches, columns: [] }
    expect(columnsFor(iRadarSchema, empty)).toEqual([])

    const schema: DomainSchema = { ...iRadarSchema }
    delete schema.columns
    expect(columnsFor(schema, null)).toEqual([])
  })

  it('asks for the familiar eight by name, rather than being given them', () => {
    const entity: EntitySchema = { ...searches, columns: defaultColumns(searches) }
    expect(keys(columnsFor(iRadarSchema, entity))).toEqual([
      'ordinal',
      'primary',
      'secondary',
      'metric1',
      'metric2',
      'updatedAt',
      'status',
    ])
  })
})

describe('a key for a column that named none', () => {
  it('is the key, then the field, then the label, then the position', () => {
    expect(columnKey({ key: 'shape', field: 'form', label: 'Shape' }, 0)).toBe('shape')
    expect(columnKey({ field: 'form', label: 'Shape' }, 0)).toBe('form')
    expect(columnKey({ label: 'Shape' }, 0)).toBe('Shape')
    expect(columnKey({ kind: 'ordinal' }, 3)).toBe('column-3')
  })

  it('never lets whitespace stand in for a name', () => {
    expect(columnKey({ key: '  ' }, 2)).toBe('column-2')
    expect(columnKey({ label: ' Shape ' }, 2)).toBe('Shape')
  })

  it('tells apart every column of a set that named none of them', () => {
    const columns: ColumnDef[] = [{ kind: 'ordinal' }, { kind: 'status' }, { kind: 'score' }]
    const named = columns.map((column, index) => columnKey(column, index))
    expect(new Set(named).size).toBe(columns.length)
  })
})

describe('a key for a row that came back without an id', () => {
  it('is the id wherever there is one', () => {
    expect(rowKey(row(), 4)).toBe('pieces_10007')
  })

  it('falls back to where the row sits in the result', () => {
    expect(rowKey(row({ id: '' }), 4)).toBe('pieces-4')
    expect(rowKey(row({ id: '   ' }), 0)).toBe('pieces-0')
    expect(rowKey(row({ id: '', entityKey: '' }), 1)).toBe('row-1')
  })

  it('tells apart a page of rows that came back with no ids at all', () => {
    const page = [row({ id: '' }), row({ id: '' }), row({ id: '' })]
    expect(new Set(page.map((entry, index) => rowKey(entry, index))).size).toBe(3)
  })
})

describe('cellValue', () => {
  it('reads the column’s own key off the row', () => {
    expect(cellValue({ key: 'primary' }, row())).toBe('Brick 2 x 4')
  })

  it('reads the field named, when the column is not called that', () => {
    expect(cellValue({ key: 'name', field: 'primary' }, row())).toBe('Brick 2 x 4')
  })

  it('falls through to the facets, which is where a column of anything lives', () => {
    expect(cellValue({ key: 'shape' }, row())).toBe('brick')
    expect(cellValue({ key: 'year', field: 'firstYear' }, row())).toBe(1958)
  })

  it('is undefined for a field neither the row nor its facets carry', () => {
    expect(cellValue({ key: 'nothing' }, row())).toBeUndefined()
  })

  it('lets the column compute its own, over everything else', () => {
    const column: ColumnDef = {
      key: 'primary',
      value: (given) => `${given.primary} (${given.secondary})`,
    }
    expect(cellValue(column, row())).toBe('Brick 2 x 4 (3001)')
  })
})

describe('cellText', () => {
  it('counts a number rather than printing it', () => {
    expect(cellText({ key: 'metric1', kind: 'number' }, row())).toBe('1.2k')
  })

  it('reads a date the way every other view does', () => {
    expect(cellText({ key: 'updatedAt', kind: 'date' }, row())).toBe('20.08.2026')
  })

  it('joins the several values a row may hold of one facet', () => {
    expect(cellText({ key: 'colors' }, row())).toBe('red, blue')
  })

  it('says a value is absent rather than leaving the cell blank', () => {
    expect(cellText({ key: 'missing' }, row())).toBe(EMPTY_CELL)
    expect(defaultCellText([], 'text')).toBe(EMPTY_CELL)
    expect(defaultCellText(false, 'text')).toBe('false')
  })

  it('leaves a number alone when the kind is not number', () => {
    // A year is a number and not a quantity — the case `format` exists for.
    expect(cellText({ key: 'firstYear' }, row())).toBe('1958')
  })

  it('lets the column format its own value, over the kind’s formatting', () => {
    const column: ColumnDef = {
      key: 'metric1',
      kind: 'number',
      format: (value) => `${value} colours`,
    }
    expect(cellText(column, row())).toBe('1240 colours')
  })
})

describe('a column’s drawing', () => {
  it('puts numbers to the right and everything else to the left', () => {
    expect(columnAlign({ key: 'metric1', kind: 'number' })).toBe('right')
    expect(columnAlign({ key: 'ordinal', kind: 'ordinal' })).toBe('right')
    expect(columnAlign({ key: 'primary' })).toBe('left')
    expect(columnAlign({ key: 'metric1', kind: 'number', align: 'left' })).toBe('left')
  })

  it('names the kind, so a host’s own number column is drawn like the shell’s', () => {
    expect(columnClass({ key: 'metric1', kind: 'number' })).toBe('dc-table__number')
    expect(columnClass({ key: 'status', kind: 'status' })).toBe('dc-table__state')
    expect(columnClass({ key: 'shape' })).toBe('')
    expect(columnClass({ key: 'shape', class: 'mine' })).toBe('mine')
  })

  it('truncates the values and leaves the marks their own size', () => {
    expect(columnTruncates({ key: 'primary' })).toBe(true)
    expect(columnTruncates({ key: 'metric1', kind: 'number' })).toBe(true)
    expect(columnTruncates({ key: 'score', kind: 'score' })).toBe(false)
    expect(columnTruncates({ key: 'thumb', kind: 'image' })).toBe(false)
    expect(columnTruncates({ key: 'primary', truncate: false })).toBe(false)
  })
})

/**
 * The fixture the whole feature is for: a catalogue piece, which is a picture,
 * a shape, a year, two counts that each lead somewhere, a weight and a flag.
 */
describe('the worked column set on LEGO pieces', () => {
  const columns = pieces.columns!
  const find = (key: string) => columns.find((column) => column.key === key)!

  it('is more columns than the four labels can describe', () => {
    expect(columns.length).toBeGreaterThan(defaultColumns(pieces).length)
  })

  it('reads a year as a year', () => {
    expect(cellText(find('firstYear'), row())).toBe('1958')
  })

  it('reads a weight in the unit the number is actually in', () => {
    const weight = find('weight')
    expect(cellText(weight, row({ score: 0.008 }))).toBe('40cg')
    expect(cellText(weight, row({ score: 0.6 }))).toBe('30.0g')
    expect(cellText(weight, row({ score: 400 }))).toBe('20.0kg')
  })

  it('says which pieces are rare, rather than printing a boolean', () => {
    const rarity = find('rarity')
    expect(cellText(rarity, row())).toBe('rare')
    expect(cellText(rarity, row({ facets: { rarity: false } }))).toBe(EMPTY_CELL)
  })

  it('gives the picture a source that needs no network', () => {
    expect(String(cellValue(find('thumb'), row()))).toMatch(/^data:image\/svg\+xml,/)
  })

  it('sends each count to what it counts', () => {
    expect(find('metric1').drill).toBe('colors')
    expect(find('metric2').drill).toBe('sets')
  })
})
