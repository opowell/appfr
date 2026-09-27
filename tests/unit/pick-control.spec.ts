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

  it('draws its list at the shell root, out of the row whose fade would clip it', async () => {
    const shell = document.createElement('div')
    shell.className = 'dc-shell'
    const row = document.createElement('div')
    row.className = 'dc-header__terms'
    shell.append(row)
    document.body.append(shell)
    wrapper = mount(PickControl, {
      props: { modelValue: 'a', options, label: 'Type' },
      attachTo: row,
    })
    await wrapper.find('.dc-pick__button').trigger('click')
    const list = document.querySelector('.dc-pick__list')!
    expect(list.parentElement).toBe(shell)
    expect(row.contains(list)).toBe(false)
    wrapper.unmount()
    wrapper = undefined
    shell.remove()
  })

  it('says nothing of a list that was never up', async () => {
    const pick = picker()
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    expect(pick.emitted('close')).toBeUndefined()
  })
})
