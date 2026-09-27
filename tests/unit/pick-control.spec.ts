import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import PickControl from '../../src/components/PickControl.vue'

const options = [
  { key: 'a', label: 'Alpha' },
  { key: 'b', label: 'Beta' },
]

let wrapper: VueWrapper | undefined

function picker() {
  wrapper = mount(PickControl, {
    props: { modelValue: 'a', options, label: 'Type' },
    attachTo: document.body,
  })
  return wrapper
}

afterEach(() => wrapper?.unmount())

describe('PickControl', () => {
  it('says the list has come down when pressed shut, so what it set going can stop', async () => {
    const pick = picker()
    await pick.find('.dc-pick__button').trigger('click')
    expect(pick.emitted('open')).toHaveLength(1)
    expect(pick.emitted('close')).toBeUndefined()
    await pick.find('.dc-pick__button').trigger('click')
    expect(pick.emitted('close')).toHaveLength(1)
  })

  it('and when a press elsewhere takes it down', async () => {
    const pick = picker()
    await pick.find('.dc-pick__button').trigger('click')
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    expect(pick.emitted('close')).toHaveLength(1)
  })

  it('says nothing of a list that was never up', async () => {
    const pick = picker()
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    expect(pick.emitted('close')).toBeUndefined()
  })
})
