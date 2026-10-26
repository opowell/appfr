import { describe, expect, it } from 'vitest'
import { chipsFrom, niceMax, rangeFrom, toggleFacet, usefulFacets } from '../../src/query/facets'
import type { FacetDef } from '../../src/types'

const rows = [
  { fields: { kind: 'pdf', tag: ['smoke', 'nightly'], cases: 17 } },
  { fields: { kind: 'page', tag: ['smoke'], cases: 3 } },
  { fields: { kind: '', tag: [], cases: '40' } },
  { fields: { tag: null } },
]

describe('niceMax', () => {
  it('rounds up to the next 1, 2 or 5 step', () => {
    expect(niceMax(17)).toBe(20)
    expect(niceMax(20)).toBe(20)
    expect(niceMax(21)).toBe(50)
    expect(niceMax(312)).toBe(500)
    expect(niceMax(501)).toBe(1000)
    expect(niceMax(1)).toBe(1)
    expect(niceMax(0.3)).toBe(0.5)
  })

  it('is 0 for nothing, or less', () => {
    expect(niceMax(0)).toBe(0)
    expect(niceMax(-4)).toBe(0)
  })
})

describe('chipsFrom', () => {
  it('offers every value the rows hold, A to Z, blanks left out', () => {
    expect(chipsFrom(rows, 'kind', 'Kind')).toEqual({
      kind: 'chips',
      key: 'kind',
      label: 'Kind',
      options: ['page', 'pdf'],
    })
  })

  it('takes every member of a list as an option, and says so when asked', () => {
    expect(chipsFrom(rows, 'tag', 'Tags', { multiple: true })).toEqual({
      kind: 'chips',
      key: 'tag',
      label: 'Tags',
      options: ['nightly', 'smoke'],
      multiple: true,
    })
  })
})

describe('rangeFrom', () => {
  it('runs from 0 to the largest number, rounded up — a number held as text is not one', () => {
    expect(rangeFrom(rows, 'cases', 'Cases')).toEqual({
      kind: 'range',
      key: 'cases',
      label: 'Cases',
      min: 0,
      max: 20,
    })
  })

  it('is a range of nothing where no row holds a number', () => {
    expect(rangeFrom(rows, 'kind', 'Kind').max).toBe(0)
  })
})

describe('usefulFacets', () => {
  it('drops the controls that cannot change the result, keeping the order', () => {
    const facets: FacetDef[] = [
      toggleFacet('failing', 'Failing', 'Only cases some run has failed'),
      chipsFrom(rows, 'kind', 'Kind'),
      chipsFrom([rows[1]!], 'kind', 'Only one'),
      rangeFrom(rows, 'cases', 'Cases'),
      rangeFrom(rows, 'none', 'Nothing'),
    ]
    expect(usefulFacets(facets).map((facet) => facet.label)).toEqual(['Failing', 'Kind', 'Cases'])
  })
})
