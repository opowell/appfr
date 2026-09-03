import { describe, expect, it } from 'vitest'
import {
  cellFull,
  cellText,
  cellValue,
  columnAlign,
  columnClass,
  columnKey,
  columnsFor,
  roleColumn,
  roleColumns,
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

/**
 * A row is an id, a type and a bag. What is in the bag is whatever the
 * schema's columns say this type holds — here, the fields `defaultColumns`
 * names plus the ones LEGO's pieces add.
 */
const row = (fields: Record<string, unknown> = {}): ShellRow => ({
  id: 'pieces_10007',
  entityKey: 'pieces',
  entityLabel: 'Pieces',
  fields: {
    primary: 'Brick 2 x 4',
    secondary: '3001',
    status: 'ok',
    score: 0.6,
    metric1: 1240,
    metric2: 8,
    updatedAt: '2026-08-20T00:00:00.000Z',
    tint: 'oklch(0.36 0.06 240)',
    shape: 'brick',
    firstYear: 1958,
    rarity: true,
    colors: ['red', 'blue'],
    ...fields,
  },
})

const keys = (columns: ColumnDef[]) => columns.map((column) => column.key ?? '')

const named = (columns: ColumnDef[], key: string) => columns.find((column) => column.key === key)

describe('defaultColumns', () => {
  it('is the familiar set, and says what each of its columns is for', () => {
    const columns = defaultColumns({ identity: 'Search', reference: 'Query' })
    expect(keys(columns)).toEqual([
      'ordinal',
      'primary',
      'secondary',
      'entityLabel',
      'metric1',
      'metric2',
      'updatedAt',
      'status',
      'score',
      'tint',
    ])
    // The roles are what a card, a tile and a preview pane read.
    expect(columns.map((column) => column.role)).toEqual([
      undefined,
      'identity',
      'reference',
      undefined,
      'metric',
      'metric',
      'updated',
      'state',
      'score',
      'tint',
    ])
  })

  it('heads the identity, reference and metric columns as it was told', () => {
    const columns = defaultColumns({
      identity: 'Search',
      reference: 'Query',
      metrics: ['Hits', 'Sources'],
    })
    expect(named(columns, 'primary')?.label).toBe('Search')
    expect(named(columns, 'secondary')?.label).toBe('Query')
    expect(named(columns, 'metric1')?.label).toBe('Hits')
    expect(named(columns, 'metric2')?.label).toBe('Sources')
  })

  it('is the generic set when it is told nothing', () => {
    const columns = defaultColumns()
    expect(named(columns, 'primary')?.label).toBe('Item')
    expect(named(columns, 'metric1')?.label).toBe('Metric')
  })

  it('takes as many metrics as it is given, or none at all', () => {
    expect(keys(defaultColumns({ metrics: [] })).filter((key) => key.startsWith('metric'))).toEqual([])
    const three = defaultColumns({ metrics: ['One', 'Two', 'Three'] })
    expect(keys(three).filter((key) => key.startsWith('metric'))).toEqual([
      'metric1',
      'metric2',
      'metric3',
    ])
  })

  it('makes a metric pressable where it is told what the number counts', () => {
    const columns = defaultColumns({
      metrics: [{ label: 'Parts', drill: 'pieces' }, { label: 'Minifigs' }],
    })
    // Parts leads to the pieces; minifigs counts nothing this schema lists.
    expect(named(columns, 'metric1')?.drill).toBe('pieces')
    expect(named(columns, 'metric2')?.drill).toBeUndefined()
  })

  it('reads the fields the row shape used to fix, so a source can move over', () => {
    const fields = defaultColumns().map((column) => column.field ?? column.key)
    expect(fields).toContain('primary')
    expect(fields).toContain('updatedAt')
    expect(fields).toContain('status')
  })
})

describe('roles', () => {
  it('finds the column playing a part, and every column playing one', () => {
    const columns = defaultColumns({ metrics: ['One', 'Two'] })
    expect(roleColumn(columns, 'identity')?.key).toBe('primary')
    expect(roleColumns(columns, 'metric').map((column) => column.key)).toEqual([
      'metric1',
      'metric2',
    ])
  })

  it('is undefined for a part the schema gave to nothing', () => {
    expect(roleColumn([{ key: 'name' }], 'identity')).toBeUndefined()
    expect(roleColumns([{ key: 'name' }], 'metric')).toEqual([])
  })

  it('keeps the tint out of the table, a colour being no kind of cell', () => {
    const entity: EntitySchema = { ...searches, columns: defaultColumns() }
    expect(keys(columnsFor(iRadarSchema, entity))).not.toContain('tint')
    expect(roleColumn(entity.columns!, 'tint')?.key).toBe('tint')
  })
})

describe('columnsFor', () => {
  it('keeps the row’s type only where the results are of several', () => {
    expect(keys(columnsFor(iRadarSchema, null))).toContain('entityLabel')
    expect(keys(columnsFor(iRadarSchema, searches))).not.toContain('entityLabel')
  })

  it('takes the entity’s own set over the familiar one', () => {
    // Every column of it but the tint, which is a colour rather than a cell.
    expect(keys(columnsFor(legoSchema, pieces))).toEqual(
      keys(pieces.columns!.filter((column) => column.role !== 'tint')),
    )
    expect(keys(columnsFor(legoSchema, pieces))).not.toEqual(keys(defaultColumns()))
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

  it('asks for the familiar set by name, rather than being given it', () => {
    const entity: EntitySchema = { ...searches, columns: defaultColumns() }
    expect(keys(columnsFor(iRadarSchema, entity))).toEqual([
      'ordinal',
      'primary',
      'secondary',
      'metric1',
      'metric2',
      'updatedAt',
      'status',
      'score',
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
  const idless = (id: string, entityKey = 'pieces'): ShellRow => ({
    ...row(),
    id,
    entityKey,
  })



  it('is the id wherever there is one', () => {
    expect(rowKey(row(), 4)).toBe('pieces_10007')
  })

  it('falls back to where the row sits in the result', () => {
    expect(rowKey(idless(''), 4)).toBe('pieces-4')
    expect(rowKey(idless('   '), 0)).toBe('pieces-0')
    expect(rowKey(idless('', ''), 1)).toBe('row-1')
  })

  it('tells apart a page of rows that came back with no ids at all', () => {
    const page = [idless(''), idless(''), idless('')]
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
      value: (given) => `${String(given.fields.primary)} (${String(given.fields.secondary)})`,
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

describe('cellFull', () => {
  it('is every digit of a number the cell rounded', () => {
    expect(cellFull({ key: 'metric1', kind: 'number' }, row())).toBe('1240')
  })

  it('undoes a host’s own shortening, whatever the kind says', () => {
    const column: ColumnDef = { key: 'metric1', format: (value) => `${Number(value) / 1000}k` }
    expect(cellText(column, row())).toBe('1.24k')
    expect(cellFull(column, row())).toBe('1240')
  })

  it('is the cell’s own words where the value is already what it shows', () => {
    // The whole of a name the column's width cut off, and a year that was
    // never shortened — both hover as exactly what the cell says.
    expect(cellFull({ key: 'primary' }, row())).toBe('Brick 2 x 4')
    expect(cellFull({ key: 'firstYear' }, row())).toBe('1958')
    expect(cellFull({ key: 'colors' }, row())).toBe('red, blue')
  })

  it('is the stored date behind the day the cell reads', () => {
    expect(cellFull({ key: 'updatedAt', kind: 'date' }, row())).toBe('2026-08-20T00:00:00.000Z')
  })

  it('says a value is absent where the cell does, having none to expand', () => {
    expect(cellFull({ key: 'missing' }, row())).toBe(EMPTY_CELL)
    expect(cellFull({ key: 'status', kind: 'status' }, row())).toBe('ok')
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

  it('reads a year as a year', () => {
    expect(cellText(find('firstYear'), row())).toBe('1958')
  })

  it('reads a weight in the unit the number is actually in', () => {
    const weight = find('weight')
    expect(cellText(weight, row({ score: 0.008 }))).toBe('40cg')
    expect(cellText(weight, row({ score: 0.6 }))).toBe('30.0g')
    expect(cellText(weight, row({ score: 400 }))).toBe('20.0kg')
  })

  it('is more columns than the familiar set has', () => {
    expect(columns.length).toBeGreaterThan(defaultColumns().length)
  })

  it('says which pieces are rare, rather than printing a boolean', () => {
    const rarity = find('rarity')
    expect(cellText(rarity, row())).toBe('rare')
    expect(cellText(rarity, row({ rarity: false }))).toBe(EMPTY_CELL)
  })

  it('gives the picture a source that needs no network', () => {
    expect(String(cellValue(find('thumb'), row()))).toMatch(/^data:image\/svg\+xml,/)
  })

  it('sends each count to what it counts', () => {
    expect(find('metric1').drill).toBe('colors')
    expect(find('metric2').drill).toBe('sets')
  })
})
