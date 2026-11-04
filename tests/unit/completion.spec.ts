import { describe, expect, it } from 'vitest'
import { completeDraft } from '../../src/query/completion'
import { findEntity } from '../../src/query/schema'
import { iRadarSchema } from '../../src/fixtures/schemas'
import { chipsFrom, toggleFacet } from '../../src/query/facets'

const items = findEntity(iRadarSchema, 'items')!
const labels = (draft: string) => completeDraft(draft, items.facets).map((offer) => offer.label)

describe('completing the draft', () => {
  it('offers every facet, in the schema order, with nothing typed', () => {
    expect(labels('')).toEqual(['kind:', 'rank:', 'seen:'])
  })

  it('offers the facets the word could be, by key or by label', () => {
    expect(labels('se')).toEqual(['seen:'])
    expect(labels('RAN')).toEqual(['rank:'])
  })

  it('says what each facet takes', () => {
    const [kind, rank, seen] = completeDraft('', items.facets)
    expect(kind!.hint).toBe('page · pdf · feed · image')
    expect(rank!.hint).toBe('0..100')
    expect(seen!.hint).toBe('Hide items already seen')
    expect(seen!.complete).toBe(false)
  })

  it('offers a toggle as true or false once it is named', () => {
    expect(labels('seen:')).toEqual(['seen:true', 'seen:false'])
    expect(labels('seen:f')).toEqual(['seen:false'])
  })

  it('offers the values of a chips facet with the comparator typed', () => {
    expect(labels('kind=p')).toEqual(['kind=page', 'kind=pdf'])
    expect(labels('kind:im')).toEqual(['kind:image'])
  })

  it('lists nothing for a range, whose value is typed', () => {
    expect(labels('rank:')).toEqual([])
  })

  it('completes only the last word, keeping what is before it', () => {
    const [offer] = completeDraft('recall seen:t', items.facets)
    expect(offer).toEqual({ draft: 'recall seen:true', label: 'seen:true', hint: 'Hide items already seen', complete: true })
    expect(completeDraft('recall ', items.facets).map((o) => o.draft)).toEqual(['recall kind:', 'recall rank:', 'recall seen:'])
  })

  it('keeps a turned term turned', () => {
    expect(labels('-se')).toEqual(['-seen:'])
    expect(labels('-seen:f')).toEqual(['-seen:false'])
  })

  it('quotes a value with a space in it, and reads an open quote as the value being typed', () => {
    const region = chipsFrom([{ fields: { region: 'North Sea' } }, { fields: { region: 'Alps' } }], 'region', 'Region')
    expect(completeDraft('region:"north', [region]).map((o) => o.draft)).toEqual(['region:"North Sea"'])
  })

  it('names a facet by its label run together', () => {
    const facet = toggleFacet('hasHits', 'New hits', 'Only searches with new hits')
    expect(completeDraft('newhits:', [facet]).map((o) => o.label)).toEqual(['hashits:true', 'hashits:false'])
  })

  it('offers nothing for a field no facet names, or a comparison being written', () => {
    expect(labels('title:')).toEqual([])
    expect(labels('rank>5')).toEqual([])
  })

  it('leaves out what the word already is', () => {
    expect(labels('seen:true')).toEqual([])
    expect(labels('seen:')).not.toContain('seen:')
  })
})
