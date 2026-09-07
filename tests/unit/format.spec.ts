import { describe, expect, it } from 'vitest'
import { formatCount } from '../../src/data/format'

/**
 * The counts in the header's list of types come from two places — the
 * population each type publishes and the live size of what matched — so they
 * have to be formatted the same way or one control says `2,641` beside `3214`.
 */
describe('formatCount', () => {
  it('groups a population the way a schema is expected to publish one', () => {
    expect(formatCount(240)).toBe('240')
    expect(formatCount(3214)).toBe('3,214')
    expect(formatCount(9988)).toBe('9,988')
  })

  it('says nothing of a number that is not one', () => {
    expect(formatCount(Number.NaN)).toBe('—')
    expect(formatCount(Number.POSITIVE_INFINITY)).toBe('—')
  })
})
