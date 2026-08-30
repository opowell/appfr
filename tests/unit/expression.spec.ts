import { describe, expect, it } from 'vitest'
import { matchesExpression, parseExpression } from '../../src/data/expression'
import { generateRows } from '../../src/data/mock'
import { findEntity } from '../../src/query/schema'
import { iRadarSchema, legoSchema } from '../../src/fixtures/schemas'
import type { ShellRow } from '../../src/types'

const items = findEntity(iRadarSchema, 'items')!
const sets = findEntity(legoSchema, 'sets')!

const row = (overrides: Partial<ShellRow> = {}): ShellRow => ({
  id: 'items_1',
  entityKey: 'items',
  entityLabel: 'Items',
  primary: 'Q3 price list',
  secondary: 'shop.example.com/pricing',
  status: 'ok',
  score: 0.6,
  metric1: 120,
  metric2: 8,
  updatedAt: '2026-08-20T00:00:00.000Z',
  tint: 'oklch(0.36 0.06 240)',
  facets: { kind: 'pdf', rank: 55, seen: true },
  ...overrides,
})

const matches = (expr: string, subject = row(), entity = items) =>
  matchesExpression(parseExpression(expr), subject, entity)

describe('field precedence', () => {
  /*
   * A declared key beats a name derived from a column heading. The LEGO
   * categories entity heads its primary column "Category" *and* carries a
   * `category` join key, and the query has to mean the key.
   */
  const categories = findEntity(legoSchema, 'categories')!

  const category = (facets: ShellRow['facets']) =>
    row({ entityKey: 'categories', primary: 'Bricks', facets })

  it('resolves a facet key over a same-named label alias', () => {
    const subject = category({ category: 'categories_10007' })
    expect(matches('category:categories_10007', subject, categories)).toBe(true)
    expect(matches('category:Bricks', subject, categories)).toBe(false)
  })

  it('still falls back to the label alias when no such key exists', () => {
    expect(matches('category:Bricks', category({}), categories)).toBe(true)
  })

  it('keeps the generic names reserved whatever the schema carries', () => {
    const subject = category({ name: 'not the primary', category: 'categories_10007' })
    expect(matches('name:Bricks', subject, categories)).toBe(true)
  })
})

describe('parseExpression', () => {
  it('returns nothing for blank input', () => {
    expect(parseExpression('   ')).toEqual([])
  })

  it('treats whitespace as AND and accepts the literal keyword', () => {
    expect(parseExpression('kind:pdf rank>10')).toEqual(parseExpression('kind:pdf AND rank>10'))
  })

  it('splits on OR into alternative groups', () => {
    expect(parseExpression('cve OR advisory')).toEqual([
      [{ kind: 'text', value: 'cve' }],
      [{ kind: 'text', value: 'advisory' }],
    ])
  })

  it('keeps a spaced-out comparison together', () => {
    expect(parseExpression('price < 40')).toEqual([
      [{ kind: 'field', field: 'price', comparator: '<', value: '40' }],
    ])
  })

  it('keeps a quoted phrase intact', () => {
    expect(parseExpression('"platform engineer"')).toEqual([
      [{ kind: 'text', value: 'platform engineer' }],
    ])
  })
})

describe('matchesExpression', () => {
  it('matches everything when empty', () => {
    expect(matches('')).toBe(true)
  })

  it('matches a bare word against the identity fields', () => {
    expect(matches('price')).toBe(true)
    expect(matches('pricing')).toBe(true)
    expect(matches('teardown')).toBe(false)
  })

  it('is case-insensitive', () => {
    expect(matches('Q3 PRICE')).toBe(true)
  })

  it('supports wildcards', () => {
    expect(matches('*.example.com/*')).toBe(true)
    expect(matches('*.shop')).toBe(false)
  })

  it('matches a facet by key', () => {
    expect(matches('kind:pdf')).toBe(true)
    expect(matches('kind:feed')).toBe(false)
  })

  it('matches a multi-valued facet on any one of its values', () => {
    const multi = row({ facets: { kind: ['pdf', 'feed'], rank: 55, seen: true } })
    expect(matches('kind:pdf', multi)).toBe(true)
    expect(matches('kind:feed', multi)).toBe(true)
    expect(matches('kind:image', multi)).toBe(false)
    expect(matches('kind:pdf AND kind:feed', multi)).toBe(true)
  })

  it('treats a comparison against a multi-valued facet as no constraint', () => {
    const multi = row({ facets: { kind: ['pdf'], rank: 55, seen: true } })
    expect(matches('kind>2', multi)).toBe(true)
  })

  it('matches a facet by its label, spaces removed', () => {
    const piece = row({ facets: { category: 'brick', firstYear: 1974, rarity: false } })
    expect(matches('firstyear>=1970', piece, findEntity(legoSchema, 'pieces')!)).toBe(true)
    expect(matches('firstyear>=1980', piece, findEntity(legoSchema, 'pieces')!)).toBe(false)
  })

  it('matches a metric by the entity label the schema gives it', () => {
    // `items` names metric1 "Links".
    expect(matches('links>100')).toBe(true)
    expect(matches('links>200')).toBe(false)
    expect(matches('metric1<=120')).toBe(true)
  })

  it('handles status and score', () => {
    expect(matches('status:ok')).toBe(true)
    expect(matches('state:failed')).toBe(false)
    expect(matches('score>=0.5')).toBe(true)
  })

  it('reads booleans on either spelling', () => {
    expect(matches('seen:true')).toBe(true)
    expect(matches('seen:false')).toBe(false)
    expect(matches('seen:no')).toBe(false)
  })

  it('ignores a field the schema does not know, rather than excluding the row', () => {
    expect(matches('sausage:brown')).toBe(true)
    expect(matches('sausage:brown AND kind:pdf')).toBe(true)
    expect(matches('sausage:brown AND kind:feed')).toBe(false)
  })

  it('requires every term in a group', () => {
    expect(matches('kind:pdf rank>50')).toBe(true)
    expect(matches('kind:pdf rank>90')).toBe(false)
  })

  it('requires only one satisfied group across OR', () => {
    expect(matches('kind:feed OR kind:pdf')).toBe(true)
    expect(matches('kind:feed OR kind:image')).toBe(false)
  })

  it('narrows a real generated population', () => {
    const rows = generateRows(sets, { seed: 'LEGO', population: 48 })
    const all = rows.filter((r) => matchesExpression(parseExpression(''), r, sets))
    const spaceOnly = rows.filter((r) =>
      matchesExpression(parseExpression('theme:space'), r, sets),
    )
    expect(all).toHaveLength(48)
    expect(spaceOnly.length).toBeGreaterThan(0)
    expect(spaceOnly.length).toBeLessThan(48)
    expect(spaceOnly.every((r) => r.facets.theme === 'space')).toBe(true)
  })

  it('evaluates the schema placeholder expression without throwing', () => {
    const rows = generateRows(sets, { seed: 'LEGO', population: 24 })
    const expression = parseExpression(legoSchema.placeholder)
    expect(() => rows.map((r) => matchesExpression(expression, r, sets))).not.toThrow()
  })
})
