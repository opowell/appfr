import { describe, expect, it } from 'vitest'
import { matchesExpression, parseExpression } from '../../src/data/expression'
import {
  addTerm,
  fieldTerm,
  idsExpression,
  narrowPatch,
  recordsIn,
  recordTerm,
} from '../../src/query/drill'
import {
  PARAM_ENTITY,
  PARAM_EXPR,
  PARAM_PAGE,
  PARAM_VIEW,
  parseQuery,
  readExpression,
  searchFromQuery,
} from '../../src/query/codec'
import { findEntity } from '../../src/query/schema'
import { legoSchema } from '../../src/fixtures/schemas'
import type { DomainSchema, EntitySchema, ShellRow } from '../../src/types'

const sets = findEntity(legoSchema, 'sets')!
const pieces = findEntity(legoSchema, 'pieces')!
const inventories = findEntity(legoSchema, 'inventories')!

const piece = (fields: ShellRow['fields']): ShellRow => ({
  id: 'pieces_1',
  entityKey: 'pieces',
  entityLabel: 'Pieces',
  fields,
})

const matches = (expr: string, row: ShellRow, entity: EntitySchema, schema?: DomainSchema) =>
  matchesExpression(parseExpression(expr), row, entity, schema)

describe('strictScopes', () => {
  const strict: DomainSchema = { ...legoSchema, strictScopes: true }
  const bare = piece({ primary: 'Brick 2x4' })

  it('is off unless asked for: a row without the join key comes through', () => {
    expect(matches('set="sets_10007"', bare, pieces)).toBe(true)
    expect(matches('set="sets_10007"', bare, pieces, legoSchema)).toBe(true)
  })

  it('leaves out a row that does not carry the join key', () => {
    expect(matches('set="sets_10007"', bare, pieces, strict)).toBe(false)
    expect(matches('SET:sets_10007', bare, pieces, strict)).toBe(false)
  })

  it('keeps it under the term turned round, which is the same fact', () => {
    expect(matches('-set="sets_10007"', bare, pieces, strict)).toBe(true)
  })

  it('reads a row that carries the key as it always did', () => {
    const member = piece({ primary: 'Brick 2x4', set: ['sets_10007'] })
    expect(matches('set="sets_10007"', member, pieces, strict)).toBe(true)
    expect(matches('set="sets_10014"', member, pieces, strict)).toBe(false)
    expect(matches('set="sets_10014" set="sets_10007"', member, pieces, strict)).toBe(true)
  })

  it('holds only the join keys to it: any other unknown field still constrains nothing', () => {
    expect(matches('nosuchfield:x', bare, pieces, strict)).toBe(true)
    expect(matches('nosuchfield:x set="sets_10007"', bare, pieces, strict)).toBe(false)
  })
})

describe('fieldTerm', () => {
  it('is the quoted, whole-value term recordTerm writes', () => {
    expect(fieldTerm('set', 'sets_10007')).toBe('set="sets_10007"')
    expect(fieldTerm('set', 'sets_10007')).toBe(recordTerm(sets, 'sets_10007'))
  })

  it('drops quotes inside the id rather than ending the value early', () => {
    expect(fieldTerm('test', 'a "b".spec.ts')).toBe('test="a b.spec.ts"')
    expect(parseExpression(fieldTerm('test', 'a "b".spec.ts'))).toEqual([
      [{ kind: 'field', field: 'test', comparator: '=', value: 'a b.spec.ts' }],
    ])
  })
})

describe('idsExpression', () => {
  const member = (set: string[]) => piece({ primary: 'Brick', set })

  it('names exactly those records, as any of them', () => {
    const expr = idsExpression('set', ['sets_10007', 'sets_10014'])!
    expect(expr).toBe('set="sets_10007" set="sets_10014"')
    expect(matches(expr, member(['sets_10007']), pieces)).toBe(true)
    expect(matches(expr, member(['sets_10014']), pieces)).toBe(true)
    expect(matches(expr, member(['sets_10021']), pieces)).toBe(false)
    // `=` rather than `:`, so an id is not found inside a longer one.
    expect(matches(expr, member(['sets_100071']), pieces)).toBe(false)
  })

  it("is written on an entity's own scope", () => {
    expect(idsExpression(sets, ['sets_10007'])).toBe('set="sets_10007"')
  })

  it('is null where nothing can be named, rather than the empty query that is everything', () => {
    expect(idsExpression('set', [])).toBeNull()
    expect(idsExpression('set', ['""'])).toBeNull()
    expect(idsExpression(inventories, ['inventories_1'])).toBeNull()
    expect(idsExpression(null, ['x'])).toBeNull()
  })
})

describe('recordsIn', () => {
  it('reads the scope terms, in the order written', () => {
    expect(
      recordsIn(legoSchema, ['theme:space piece="pieces_3" set="sets_10007"']),
    ).toEqual([
      { entityKey: 'pieces', id: 'pieces_3' },
      { entityKey: 'sets', id: 'sets_10007' },
    ])
  })

  it('dedupes across expressions, whatever the case, keeping the first spelling', () => {
    expect(
      recordsIn(legoSchema, ['set="Sets_10007"', 'set:sets_10007 OR SET="sets_10014"']),
    ).toEqual([
      { entityKey: 'sets', id: 'Sets_10007' },
      { entityKey: 'sets', id: 'sets_10014' },
    ])
  })

  it('names no record for a constraint on a value', () => {
    expect(recordsIn(legoSchema, ['theme:space year>=1988 castle', ''])).toEqual([])
  })

  it('counts a record left out as one the query names', () => {
    expect(recordsIn(legoSchema, ['-set="sets_10007"'])).toEqual([
      { entityKey: 'sets', id: 'sets_10007' },
    ])
  })
})

describe('narrowPatch', () => {
  it('adds the term, drops the type and the page, and writes cards', () => {
    expect(narrowPatch('theme:space', 'set="sets_10007"')).toEqual({
      [PARAM_EXPR]: 'theme:space set="sets_10007"',
      [PARAM_ENTITY]: undefined,
      [PARAM_VIEW]: 'cards',
      [PARAM_PAGE]: undefined,
    })
  })

  it('stacks on the last narrowing without doubling it', () => {
    const once = narrowPatch('', 'set="sets_10007"')[PARAM_EXPR]!
    expect(narrowPatch(once, 'set:"sets_10007"')[PARAM_EXPR]).toBe(once)
    expect(narrowPatch(once, 'set="sets_10007"')[PARAM_EXPR]).toBe(addTerm(once, 'set="sets_10007"'))
  })

  it('takes another view where asked', () => {
    expect(narrowPatch('', 'set="sets_10007"', 'table')[PARAM_VIEW]).toBe('table')
  })

  it('drops the expression where there is none', () => {
    expect(narrowPatch('', null)[PARAM_EXPR]).toBeUndefined()
  })
})

describe('searchFromQuery and readExpression', () => {
  it('writes a route query as the codec reads it', () => {
    const search = searchFromQuery({ e: 'sets', q: 'set="sets_10007" theme:space', v: undefined })
    expect(search.startsWith('?')).toBe(true)
    const query = parseQuery(search, legoSchema)
    expect(query.entity).toBe('sets')
    expect(query.expr).toBe('set="sets_10007" theme:space')
  })

  it('keeps every value of a repeated parameter and drops the empty ones', () => {
    expect(searchFromQuery({ tag: ['a', null, 'b'], flag: null, blank: '' })).toBe(
      '?tag=a&tag=b&blank',
    )
    expect(searchFromQuery({})).toBe('')
  })

  it('round-trips characters the codec has to escape', () => {
    const expr = 'name:"a&b" price<40 x+y'
    expect(readExpression(searchFromQuery({ q: expr }))).toBe(expr)
  })

  it('reads the expression out of any spelling of a search', () => {
    const expr = 'set="sets_10007" theme:space'
    const plain = new URLSearchParams({ q: expr }).toString()
    expect(readExpression(plain)).toBe(expr)
    expect(readExpression(`?${plain}`)).toBe(expr)
    expect(readExpression('?e=sets')).toBe('')
    expect(readExpression('')).toBe('')
  })

  it('agrees with parseQuery, even on a repeated parameter', () => {
    const search = '?q=first&e=sets&q=second'
    expect(readExpression(search)).toBe(parseQuery(search, legoSchema).expr)
  })
})
