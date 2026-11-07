import { describe, expect, it } from 'vitest'
import { pinnedFields, withoutPinned } from '../../src/query/pinned'
import type { ColumnDef, ShellRow } from '../../src/types'

const columns: ColumnDef[] = [
  { kind: 'ordinal' },
  { key: 'title', label: 'Title', role: 'identity' },
  { key: 'category', label: 'Category' },
  { key: 'tags', label: 'Tags' },
  { key: 'rating', label: 'Rating', kind: 'number' },
]

const row = (fields: Record<string, unknown>): ShellRow => ({ id: String(fields.title), entityKey: 'stories', entityLabel: 'Stories', fields })
const rows = [
  row({ title: 'A', category: 'Poetry', tags: ['sea', 'night'], rating: 4.3 }),
  row({ title: 'B', category: 'Poetry', tags: ['night'], rating: 4.4 }),
]
const keys = (kept: ColumnDef[]) => kept.map((column) => column.key ?? column.kind)

describe('pinnedFields', () => {
  it('reads each field ANDed to one value', () => {
    expect([...pinnedFields('category=Poetry night rating>=4 Tags=sea')]).toEqual(['category', 'tags'])
  })

  it('pins nothing it does not hold to one value', () => {
    expect(pinnedFields('category:Poe -author=ann rating=1..5').size).toBe(0)
    expect(pinnedFields('category=Poetry OR category=Drama').size).toBe(0)
  })
})

describe('withoutPinned', () => {
  it('drops a column the query holds to one value', () => {
    expect(keys(withoutPinned(columns, 'category=Poetry', rows))).toEqual(['ordinal', 'title', 'tags', 'rating'])
  })

  it('keeps a column of lists, whose rows still differ', () => {
    expect(keys(withoutPinned(columns, 'tags=night', rows))).toEqual(keys(columns))
  })

  it('keeps the identity, and every column while nothing is pinned', () => {
    expect(keys(withoutPinned(columns, 'title=A', rows))).toEqual(keys(columns))
    expect(keys(withoutPinned(columns, 'category:Poetry', rows))).toEqual(keys(columns))
  })
})
