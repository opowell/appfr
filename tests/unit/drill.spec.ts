import { describe, expect, it } from 'vitest'
import {
  addTerm,
  drillExpression,
  excludingTerm,
  pressOptions,
  recordTerm,
  scopedEntity,
  scopeTerm,
  scopeTermFor,
  withoutOwnScope,
} from '../../src/query/drill'
import { createMockDataSource, generateRows } from '../../src/data/mock'
import { formatExpression, parseExpression } from '../../src/data/expression'
import { defaultQuery, findEntity } from '../../src/query/schema'
import { legoSchema } from '../../src/fixtures/schemas'
import type { ShellRow } from '../../src/types'

const categories = findEntity(legoSchema, 'categories')!
const inventories = findEntity(legoSchema, 'inventories')!

const row = (overrides: Partial<ShellRow> = {}): ShellRow => ({
  id: 'categories_10007',
  entityKey: 'categories',
  entityLabel: 'Categories',
  fields: { primary: 'Bricks', secondary: 'bricks' },
  ...overrides,
})

describe('scopedEntity', () => {
  it('names the type a scope field points at — the inverse of scopeTerm', () => {
    expect(scopedEntity(legoSchema, 'category')?.key).toBe('categories')
    expect(scopedEntity(legoSchema, 'set')?.key).toBe('sets')
  })

  it('reads a field as the parse left it, which is lowercased', () => {
    expect(scopedEntity(legoSchema, 'Set')?.key).toBe('sets')
  })

  it('is null for a field no type claims — a value, not a reference', () => {
    // `theme` is a facet of sets: an ordinary constraint on a field, and
    // nothing anyone can look up a record by.
    expect(scopedEntity(legoSchema, 'theme')).toBeNull()
    expect(scopedEntity(legoSchema, 'inventory')).toBeNull()
  })
})

describe('withoutOwnScope', () => {
  const sets = findEntity(legoSchema, 'sets')!

  it('lifts the term on the type\'s own scope field and keeps the rest', () => {
    expect(withoutOwnScope(sets, 'set:"sets_10007" theme:space')).toBe('theme:space')
  })

  it('lifts a negated term too, and an alternative left empty with it', () => {
    expect(withoutOwnScope(sets, '-set:"sets_10007" OR set:"sets_10008"')).toBe('')
    expect(withoutOwnScope(sets, 'set:a theme:space OR set:b')).toBe('theme:space')
  })

  it('reads the field however it was capitalized', () => {
    expect(withoutOwnScope(sets, 'Set:"sets_10007"')).toBe('')
  })

  it('leaves an expression with nothing of its own in it exactly as written', () => {
    const written = 'Color:"colors_10000"  castle'
    expect(withoutOwnScope(sets, written)).toBe(written)
    expect(withoutOwnScope(inventories, 'set:"sets_10007"')).toBe('set:"sets_10007"')
    expect(withoutOwnScope(null, 'set:"sets_10007"')).toBe('set:"sets_10007"')
  })
})

describe('recordTerm', () => {
  it('is scopeTerm for a record named by its id alone', () => {
    expect(recordTerm(categories, 'categories_10007')).toBe('category:"categories_10007"')
    expect(recordTerm(categories, 'categories_10007')).toBe(scopeTerm(categories, row()))
  })

  it('is null where the entity declares no scope', () => {
    expect(recordTerm(inventories, 'inventories_10007')).toBeNull()
  })
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

  /*
   * The same constraint has more than one spelling, and both are ours: this
   * writes the term quoted, while lifting any *other* part of the query writes
   * the rest back out unquoted. A drill after a lift was adding a second copy.
   */
  it('does not add a term the expression already holds in another spelling', () => {
    const lifted = formatExpression(parseExpression('theme:space color:"colors_10000"'))
    expect(lifted).toBe('theme:space color:colors_10000')
    expect(addTerm(lifted, 'color:"colors_10000"')).toBe(lifted)
  })

  it('reads case the way matching does, which is not at all', () => {
    expect(addTerm('theme:Space', 'theme:space')).toBe('theme:Space')
  })

  it('tells two constraints on one field apart', () => {
    expect(addTerm('year>=1988', 'year>=1999')).toBe('year>=1988 year>=1999')
    expect(addTerm('year>=1988', 'year<=1988')).toBe('year>=1988 year<=1988')
  })

  it('tells a bare word from a field of the same name', () => {
    expect(addTerm('recall', 'kind:recall')).toBe('recall kind:recall')
  })

  it('finds the term in whichever alternative holds it', () => {
    expect(addTerm('release OR recall', 'recall')).toBe('release OR recall')
  })

  it('leaves the expression alone when the row is unscopable', () => {
    expect(addTerm('theme:space', null)).toBe('theme:space')
  })

  /*
   * A query that both narrows to a record and leaves it out says nothing, so
   * the press that would make one is read as a change of mind instead.
   */
  it('turns a term the expression holds the other way round', () => {
    expect(addTerm('theme:space color:"colors_10000"', '-color:"colors_10000"')).toBe(
      'theme:space -color:colors_10000',
    )
    expect(addTerm('-color:colors_10000', 'color:"colors_10000"')).toBe('color:colors_10000')
  })

  it('turns it in whichever alternative holds it, and adds it to no other', () => {
    expect(addTerm('release color:x OR recall', '-color:"x"')).toBe('release -color:x OR recall')
  })
})

describe('excludingTerm', () => {
  it('is the scope term with a dash in front of it', () => {
    expect(excludingTerm('category:"categories_10007"')).toBe('-category:"categories_10007"')
    expect(excludingTerm(scopeTerm(categories, row()))).toBe('-category:"categories_10007"')
  })

  it('is null for null, as a row with no scope gives', () => {
    expect(excludingTerm(null)).toBeNull()
  })
})

describe('pressOptions', () => {
  const press = (init: MouseEventInit) => pressOptions(new MouseEvent('click', init))

  it('reads ⌘ and Ctrl alike as "leave it out"', () => {
    expect(press({ metaKey: true })).toEqual({ exclude: true })
    expect(press({ ctrlKey: true })).toEqual({ exclude: true })
  })

  it('reads a plain press, and any other modifier, as nothing at all', () => {
    expect(press({})).toEqual({})
    expect(press({ shiftKey: true, altKey: true })).toEqual({})
  })
})

describe('drillExpression', () => {
  it('narrows an existing query rather than replacing it', () => {
    const query = { ...defaultQuery(legoSchema), expr: 'theme:space' }
    expect(drillExpression(legoSchema, query, row())).toBe('theme:space category:"categories_10007"')
  })

  it('leaves the row out instead when the press says so', () => {
    const query = { ...defaultQuery(legoSchema), expr: 'theme:space' }
    expect(drillExpression(legoSchema, query, row(), { exclude: true })).toBe(
      'theme:space -category:"categories_10007"',
    )
  })

  it('leaves an unscopable row out of nothing, as it narrows to nothing', () => {
    const query = { ...defaultQuery(legoSchema), expr: 'theme:space' }
    expect(drillExpression(legoSchema, query, row({ entityKey: 'inventories' }), { exclude: true })).toBe(
      'theme:space',
    )
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
      expect(found.fields.category).toContain('categories_10007')
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
        for (const field of scopes) expect(generated.fields[field]).toBeTruthy()
      }
    }
  })
})
