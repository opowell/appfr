import { describe, expect, it } from 'vitest'
import { facetValue, hasActiveFacets, withFacetValue } from '../../src/query/facetTerms'
import { findEntity } from '../../src/query/schema'
import { iRadarSchema } from '../../src/fixtures/schemas'
import type { FacetDef } from '../../src/types'

const items = findEntity(iRadarSchema, 'items')!
const facet = (key: string) => items.facets.find((candidate) => candidate.key === key) as FacetDef

describe('a facet, read off the expression', () => {
  it('reads a range from one term or from two comparisons', () => {
    expect(facetValue('rank:20..80', facet('rank'))).toEqual({ kind: 'range', min: 20, max: 80 })
    expect(facetValue('rank>=20 rank<=80', facet('rank'))).toEqual({ kind: 'range', min: 20, max: 80 })
    expect(facetValue('rank:..80', facet('rank'))).toEqual({ kind: 'range', min: null, max: 80 })
  })

  it('reads the chips the terms name, in the order the facet offers them', () => {
    expect(facetValue('kind=image kind:PAGE recall', facet('kind'))).toEqual({
      kind: 'chips',
      selected: ['page', 'image'],
    })
  })

  it('does not read a turned term as a chip', () => {
    expect(facetValue('-kind=page', facet('kind'))).toEqual({ kind: 'chips', selected: [] })
  })

  it('reads a toggle as on where its field is true', () => {
    expect(facetValue('seen:true', facet('seen'))).toEqual({ kind: 'toggle', on: true })
    expect(facetValue('', facet('seen'))).toEqual({ kind: 'toggle', on: false })
  })
})

describe('a facet, written into the expression', () => {
  it('replaces the terms it reads and leaves the rest', () => {
    const expr = withFacetValue('rank>=10 recall', facet('rank'), { kind: 'range', min: 20, max: null })
    expect(expr).toBe('recall rank:20..')
  })

  it('writes a chip as the whole value', () => {
    expect(withFacetValue('', facet('kind'), { kind: 'chips', selected: ['page', 'pdf'] })).toBe(
      'kind=page kind=pdf',
    )
  })

  it('writes nothing for a value that narrows nothing', () => {
    expect(withFacetValue('rank:1..5', facet('rank'), { kind: 'range', min: null, max: null })).toBe('')
  })

  it('writes into each alternative', () => {
    expect(withFacetValue('a OR b', facet('seen'), { kind: 'toggle', on: true })).toBe(
      'a seen:true OR b seen:true',
    )
  })

  it('says whether any facet is set', () => {
    expect(hasActiveFacets('recall', items)).toBe(false)
    expect(hasActiveFacets('rank:1..', items)).toBe(true)
  })
})
