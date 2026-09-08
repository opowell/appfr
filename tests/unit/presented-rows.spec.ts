import { describe, expect, it } from 'vitest'
import { presentParts } from '../../src/composables/usePresentedRows'
import { findEntity } from '../../src/query/schema'
import { iRadarSchema, legoSchema } from '../../src/fixtures/schemas'
import type { ColumnDef, ShellRow } from '../../src/types'

const pieces = findEntity(legoSchema, 'pieces')!
const searches = findEntity(iRadarSchema, 'searches')!

const row = (fields: Record<string, unknown> = {}): ShellRow => ({
  id: 'pieces_10007',
  entityKey: 'pieces',
  entityLabel: 'Pieces',
  fields: {
    primary: 'Brick 2 x 4',
    secondary: '3001',
    tint: 'oklch(0.36 0.06 240)',
    ...fields,
  },
})

/** A type declaring one picture column and nothing else worth reading. */
const pictured = (column: Partial<ColumnDef> = {}): ColumnDef[] => [
  { key: 'primary', role: 'identity' },
  { key: 'image', role: 'image', kind: 'image', ...column },
]

describe('the picture a card and a tile draw', () => {
  it('is the src the type’s image column names', () => {
    const parts = presentParts(row({ image: 'https://example.test/3001.png' }), pictured())
    expect(parts.image).toBe('https://example.test/3001.png')
  })

  it('is what a column computing its own resolves to', () => {
    // LEGO's pieces draw theirs from the tint, as a data URI — a picture a
    // fixture can carry without a network behind it.
    expect(presentParts(row(), pieces.columns!).image).toMatch(/^data:image\/svg\+xml,/)
  })

  it('is nothing where the type declares no picture at all', () => {
    expect(presentParts(row(), searches.columns!).image).toBeNull()
  })

  it('is nothing where the type declares one and the row holds none', () => {
    expect(presentParts(row(), pictured()).image).toBeNull()
    expect(presentParts(row({ image: '' }), pictured()).image).toBeNull()
    expect(presentParts(row({ image: '   ' }), pictured()).image).toBeNull()
  })

  it('is nothing where the value is not something an img could be given', () => {
    expect(presentParts(row({ image: 3001 }), pictured()).image).toBeNull()
    expect(presentParts(row({ image: { src: 'x.png' } }), pictured()).image).toBeNull()
  })

  it('is the value rather than the cell’s words, a picture being addressed', () => {
    const parts = presentParts(
      row({ image: 'x.png' }),
      pictured({ format: () => 'A picture of a brick' }),
    )
    expect(parts.image).toBe('x.png')
  })

  it('leaves the parts a card was already made of alone', () => {
    const parts = presentParts(row(), pieces.columns!)
    expect(parts.identity).toBe('Brick 2 x 4')
    expect(parts.reference).toBe('3001')
    expect(parts.tint).toBe('oklch(0.36 0.06 240)')
  })
})
