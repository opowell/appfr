import { describe, expect, it } from 'vitest'
import {
  formatBytes,
  formatCount,
  formatDateTime,
  formatDigits,
  formatDuration,
  formatElapsed,
  formatInteger,
  formatMetric,
  formatOrdinal,
  formatPercent,
  stripAnsi,
} from '../../src/data/format'

/**
 * The counts in the header's list of types come from two places — the
 * population each type publishes and the live size of what matched — so they
 * have to be formatted the same way or one control says `2,641` beside `2.6k`.
 */
describe('formatCount', () => {
  it('abbreviates a population the way a schema is expected to publish one', () => {
    expect(formatCount(240)).toBe('240')
    expect(formatCount(1700)).toBe('1.7k')
    expect(formatCount(3214)).toBe('3.2k')
    expect(formatCount(198_689)).toBe('199k')
    expect(formatCount(23_500_000)).toBe('24m')
  })

  it('rolls over at the rounding rather than at the bound', () => {
    expect(formatCount(999)).toBe('999')
    expect(formatCount(9949)).toBe('9.9k')
    expect(formatCount(9988)).toBe('10k')
    expect(formatCount(999_499)).toBe('999k')
    expect(formatCount(999_600)).toBe('1.0m')
    expect(formatCount(9_949_000)).toBe('9.9m')
    expect(formatCount(9_988_000)).toBe('10m')
  })

  it('says nothing of a number that is not one', () => {
    expect(formatCount(Number.NaN)).toBe('—')
    expect(formatCount(Number.POSITIVE_INFINITY)).toBe('—')
  })
})

describe('formatInteger', () => {
  it('groups an exact number', () => {
    expect(formatInteger(240)).toBe('240')
    expect(formatInteger(3214)).toBe('3,214')
    expect(formatInteger(198_689)).toBe('198,689')
  })

  it('says nothing of a number that is not one', () => {
    expect(formatInteger(Number.NaN)).toBe('—')
  })
})

/** The leading column of the list and table views counts from one, unpadded. */
describe('formatOrdinal', () => {
  it('counts from one', () => {
    expect(formatOrdinal(0)).toBe('1')
    expect(formatOrdinal(9)).toBe('10')
    expect(formatOrdinal(99)).toBe('100')
  })
})

describe('formatDigits', () => {
  it('keeps two significant digits, at any size below the whole ones', () => {
    expect(formatDigits(2.5882)).toBe('2.6')
    expect(formatDigits(2.04)).toBe('2.0')
    expect(formatDigits(0.041_27)).toBe('0.041')
    expect(formatDigits(12.4)).toBe('12')
    expect(formatDigits(-2.5882)).toBe('-2.6')
  })

  it('never gives up a whole digit to get there', () => {
    expect(formatDigits(99.6)).toBe('100')
    expect(formatDigits(243.4)).toBe('243')
  })

  it('says nothing of a number that is not one', () => {
    expect(formatDigits(Number.NaN)).toBe('—')
  })
})

describe('formatMetric', () => {
  it('keeps the digits of a fraction, which rounding to a whole would lose', () => {
    expect(formatMetric(2.5882)).toBe('2.6')
    expect(formatMetric(0.5)).toBe('0.50')
  })

  it('leaves a whole number whole', () => {
    expect(formatMetric(3)).toBe('3')
    expect(formatMetric(940)).toBe('940')
  })

  it('abbreviates past a thousand as a count does', () => {
    expect(formatMetric(999.6)).toBe('1.0k')
    expect(formatMetric(1_240)).toBe('1.2k')
    expect(formatMetric(12_345)).toBe('12k')
    expect(formatMetric(3_400_000)).toBe('3.4m')
  })

  it('says nothing of a number that is not one', () => {
    expect(formatMetric(Number.POSITIVE_INFINITY)).toBe('—')
  })
})

describe('formatBytes', () => {
  it('writes a size in decimal units, a decimal place below 100 of one', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(999)).toBe('999 B')
    expect(formatBytes(1000)).toBe('1.0 kB')
    expect(formatBytes(28_000)).toBe('28 kB')
    expect(formatBytes(123_456)).toBe('123 kB')
    expect(formatBytes(1_200_000)).toBe('1.2 MB')
    expect(formatBytes(3.4e9)).toBe('3.4 GB')
    expect(formatBytes(5e15)).toBe('5000 TB')
  })

  it('says nothing of a size that is missing or negative', () => {
    expect(formatBytes(null)).toBe('—')
    expect(formatBytes(undefined)).toBe('—')
    expect(formatBytes(-1)).toBe('—')
    expect(formatBytes(Number.NaN)).toBe('—')
  })
})

describe('formatDuration', () => {
  it('keeps the precision that is read', () => {
    expect(formatDuration(640.4)).toBe('640ms')
    expect(formatDuration(1_240)).toBe('1.2s')
    expect(formatDuration(12_400)).toBe('12s')
    expect(formatDuration(187_000)).toBe('3m 7s')
  })

  it('says nothing of nothing', () => {
    expect(formatDuration(0)).toBe('—')
    expect(formatDuration(null)).toBe('—')
    expect(formatDuration(undefined)).toBe('—')
  })
})

describe('formatElapsed', () => {
  it('reads as a clock', () => {
    expect(formatElapsed(42)).toBe('42s')
    expect(formatElapsed(102)).toBe('1:42')
    expect(formatElapsed(60)).toBe('1:00')
    expect(formatElapsed(3665)).toBe('61:05')
  })

  it('says nothing of nothing, or less', () => {
    expect(formatElapsed(0)).toBe('—')
    expect(formatElapsed(-3)).toBe('—')
    expect(formatElapsed(null)).toBe('—')
  })
})

describe('formatPercent', () => {
  it('writes a share as a whole percentage', () => {
    expect(formatPercent(0.5)).toBe('50%')
    expect(formatPercent(0)).toBe('0%')
    expect(formatPercent(0.666)).toBe('67%')
    expect(formatPercent(null)).toBe('—')
    expect(formatPercent(Number.NaN)).toBe('—')
  })
})

describe('formatDateTime', () => {
  it('writes a date and its time in the locale asked for', () => {
    const written = formatDateTime('2026-10-26T09:14:00Z', 'en-US')
    expect(written).toMatch(/Oct 26, 2026/)
    expect(written).toMatch(/\d{2}:14/)
  })

  it('says nothing of nothing, or of what does not parse', () => {
    expect(formatDateTime('')).toBe('—')
    expect(formatDateTime(null)).toBe('—')
    expect(formatDateTime('not a date')).toBe('—')
  })
})

describe('stripAnsi', () => {
  it("takes the terminal's colours out of the text", () => {
    expect(stripAnsi('\x1b[31mexpected\x1b[39m 1 \x1b[1;32mreceived\x1b[0m')).toBe('expected 1 received')
    expect(stripAnsi('plain')).toBe('plain')
  })
})
