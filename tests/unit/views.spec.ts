import { describe, expect, it } from 'vitest'
import { parseQuery } from '../../src/query/codec'
import { isTypeCardsQuery, resolveView } from '../../src/query/schema'
import { iRadarSchema } from '../../src/fixtures/schemas'

describe('resolveView', () => {
  it('draws what is asked when the host restricts nothing', () => {
    expect(resolveView('grid', undefined)).toBe('grid')
  })

  it('draws the first on offer when what is asked is withheld', () => {
    expect(resolveView('list', ['table'])).toBe('table')
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
