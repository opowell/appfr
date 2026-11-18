import { describe, expect, it } from 'vitest'
import { parseQuery } from '../../src/query/codec'
import { isTypeCardsQuery, isViewKind, resolveView } from '../../src/query/schema'
import { iRadarSchema } from '../../src/fixtures/schemas'

describe('resolveView', () => {
  it('draws what is asked when the host restricts nothing', () => {
    expect(resolveView('grid', undefined)).toBe('grid')
  })

  it('draws the first on offer when what is asked is withheld', () => {
    expect(resolveView('list', ['table'])).toBe('table')
  })

  it("draws a host's view where it is offered, and the default where none is", () => {
    expect(resolveView('hackernews', ['list', 'hackernews'])).toBe('hackernews')
    expect(resolveView('hackernews', ['list', 'table'])).toBe('list')
    expect(resolveView('hackernews', undefined)).toBe('cards')
  })
})

describe('isViewKind', () => {
  it("takes the shell's views and any word naming a host's", () => {
    expect(isViewKind('table')).toBe(true)
    expect(isViewKind('the-guardian')).toBe(true)
    expect(isViewKind('Not a view!')).toBe(false)
  })

  it('reads a view of the host\'s from the URL', () => {
    expect(parseQuery('?e=items&v=hackernews', iRadarSchema).view).toBe('hackernews')
  })
})

describe('isTypeCardsQuery', () => {
  it('is the home screen in cards', () => {
    expect(isTypeCardsQuery(parseQuery('', iRadarSchema))).toBe(true)
  })

  it('is not a type in cards', () => {
    expect(isTypeCardsQuery(parseQuery('?e=items&v=cards', iRadarSchema))).toBe(false)
  })

  it('reads the view drawn, not the one a link asks for', () => {
    const asksTable = parseQuery('?v=table', iRadarSchema)
    expect(isTypeCardsQuery(asksTable)).toBe(false)
    expect(isTypeCardsQuery(asksTable, ['cards'])).toBe(true)
    expect(isTypeCardsQuery(parseQuery('', iRadarSchema), ['table'])).toBe(false)
  })
})
