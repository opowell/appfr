import { describe, expect, it } from 'vitest'
import { addTerm, drillExpression, scopeTerm, scopeTermFor } from '../../src/query/drill'
import { createMockDataSource, generateRows } from '../../src/data/mock'
import { defaultQuery, findEntity } from '../../src/query/schema'
import { legoSchema } from '../../src/fixtures/schemas'
import type { ShellRow } from '../../src/types'

const categories = findEntity(legoSchema, 'categories')!
const inventories = findEntity(legoSchema, 'inventories')!

const row = (overrides: Partial<ShellRow> = {}): ShellRow => ({
  id: 'categories_10007',
  entityKey: 'categories',
  entityLabel: 'Categories',
  primary: 'Bricks',
  secondary: 'bricks',
  status: 'ok',
  score: 0.6,
  metric1: 120,
  metric2: 8,
  updatedAt: '2026-08-20T00:00:00.000Z',
  tint: 'oklch(0.36 0.06 240)',
  facets: {},
  ...overrides,
})

describe('scopeTerm', () => {
  it('names the field the entity declares, quoting the id', () => {
    expect(scopeTerm(categories, row())).toBe('category:"categories_10007"')
  })

  it('is null for an entity that declares no scope', () => {
    expect(scopeTerm(inventories, row())).toBeNull()
    expect(scopeTerm(null, row())).toBeNull()
  })

  it('quotes an id that would otherwise tokenize as several terms', () => {
    const term = scopeTerm(categories, row({ id: 'ticket 3.0/booking.spec.ts' }))
    expect(term).toBe('category:"ticket 3.0/booking.spec.ts"')
  })

  it('resolves the entity out of the schema', () => {
    expect(scopeTermFor(legoSchema, row())).toBe('category:"categories_10007"')
    expect(scopeTermFor(legoSchema, row({ entityKey: 'inventories' }))).toBeNull()
  })
})

describe('addTerm', () => {
  it('is the term alone when there is no expression yet', () => {
    expect(addTerm('', 'color:"colors_10000"')).toBe('color:"colors_10000"')
  })

  it('appends to what is already there', () => {
    expect(addTerm('theme:space', 'color:"colors_10000"')).toBe('theme:space color:"colors_10000"')
  })

  it('does not add the same term twice', () => {
    const once = addTerm('theme:space', 'color:"colors_10000"')
    expect(addTerm(once, 'color:"colors_10000"')).toBe(once)
  })

  it('leaves the expression alone when the row is unscopable', () => {
    expect(addTerm('theme:space', null)).toBe('theme:space')
  })
})

describe('drillExpression', () => {
  it('narrows an existing query rather than replacing it', () => {
    const query = { ...defaultQuery(legoSchema), expr: 'theme:space' }
    expect(drillExpression(legoSchema, query, row())).toBe('theme:space category:"categories_10007"')
  })
})

/*
 * The half that is easy to get wrong: a term naming a field a row has never
 * heard of *matches*, so an entity left without the join key comes through a
 * narrowed query completely unfiltered.
 */
describe('a drilled query, against the mock source', () => {
  const source = createMockDataSource({ seed: legoSchema.key })
  const pieces = findEntity(legoSchema, 'pieces')!

  const run = (expr: string, entity = pieces) =>
    source.query({
      query: { ...defaultQuery(legoSchema), entity: entity.key, expr },
      schema: legoSchema,
      entity,
      limit: 200,
      offset: 0,
    })

  it('finds the records that belong to the drilled one', () => {
    const term = scopeTerm(categories, row())!
    const result = run(term)
    expect(result.total).toBeGreaterThan(0)
    expect(result.total).toBeLessThan(run('').total)
    for (const found of result.rows) {
      // Several memberships per row, so this is one of them rather than it.
      expect(found.facets.category).toContain('categories_10007')
    }
  })

  it('narrows every entity, including those that declare no scope of their own', () => {
    const all = run(scopeTerm(categories, row())!, inventories)
    expect(all.total).toBeGreaterThan(0)
    expect(all.total).toBeLessThan(run('', inventories).total)
  })

  it('leaves the drilled record itself in the results', () => {
    const term = scopeTerm(categories, row())!
    const found = run(term, categories).rows.map((entry) => entry.id)
    expect(found).toContain('categories_10007')
  })

  it('gives every generated row every join key', () => {
    const scopes = legoSchema.entities.flatMap((entity) => (entity.scope ? [entity.scope] : []))
    expect(scopes.length).toBeGreaterThan(1)
    for (const entity of legoSchema.entities) {
      for (const generated of generateRows(entity, {
        seed: legoSchema.key,
        scopes: legoSchema.entities.flatMap((candidate) =>
          candidate.scope ? [[candidate.scope, candidate.key] as const] : [],
        ),
      })) {
        // Its own id, or the ids of the records it belongs to — never absent.
        for (const field of scopes) expect(generated.facets[field]).toBeTruthy()
      }
    }
  })
})
