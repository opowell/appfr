import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import FacetControl from '../../src/components/FacetControl.vue'
import type { ChipsFacet } from '../../src/types'

let wrapper: VueWrapper | undefined
afterEach(() => wrapper?.unmount())

const options = ['https://a.example/en/one/', 'https://a.example/en/two/', 'b']

function chips(extra: Partial<ChipsFacet> = {}) {
  wrapper = mount(FacetControl, {
    props: {
      facet: { kind: 'chips', key: 'target', label: 'Target', options, ...extra },
      value: { kind: 'chips', selected: [] },
    },
  })
  return wrapper.find('.dc-facet__chips')
}

describe('FacetControl — long chips facets', () => {
  it('says nothing of a cap or a cut where the facet asks for neither', () => {
    const list = chips()
    expect(list.attributes('data-dc-max-rows')).toBeUndefined()
    expect(list.attributes('data-dc-truncate')).toBeUndefined()
    expect(list.attributes('style')).toBeUndefined()
    expect(list.find('.dc-chip').attributes('title')).toBeUndefined()
  })

  it('caps the list at a whole number of rows', () => {
    const list = chips({ maxRows: 6 })
    expect(list.attributes('data-dc-max-rows')).toBe('6')
    expect(list.attributes('style')).toContain('--dc-facet-rows: 6')
  })

  it('takes no cap below one row', () => {
    expect(chips({ maxRows: 0 }).attributes('data-dc-max-rows')).toBeUndefined()
  })

  it('cuts each chip at the end it names, the whole value on hover', () => {
    const list = chips({ truncate: 'start' })
    expect(list.attributes('data-dc-truncate')).toBe('start')
    const first = list.find('.dc-chip')
    expect(first.attributes('title')).toBe(options[0])
    // The text is the chip's own, unwrapped, as it is without a cut.
    expect(first.element.childElementCount).toBe(0)
    expect(first.text()).toBe(options[0])
  })
})
