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

  it('draws each option’s icon beside its name in the list, and the chosen one’s on the button', async () => {
    const icons = { a: 'M2 2h12', b: 'M2 8h12' }
    wrapper = mount(PickControl, {
      props: {
        modelValue: 'b',
        options: options.map((option) => ({ ...option, icon: icons[option.key as 'a' | 'b'] })),
        label: 'View',
      },
      attachTo: document.body,
    })
    expect(wrapper.find('.dc-pick__button .dc-pick__icon path').attributes('d')).toBe(icons.b)
    await wrapper.find('.dc-pick__button').trigger('click')
    for (const key of ['a', 'b'] as const) {
      const path = document.querySelector(`.dc-pick__list [data-dc-item="${key}"] .dc-menu__icon path`)
      expect(path?.getAttribute('d')).toBe(icons[key])
    }
  })

  it('draws no icon where the options name none', async () => {
    const pick = picker()
    expect(pick.find('.dc-pick__icon').exists()).toBe(false)
    await pick.find('.dc-pick__button').trigger('click')
    expect(document.querySelector('.dc-pick__list .dc-menu__icon')).toBeNull()
  })

  it('says nothing of a list that was never up', async () => {
    const pick = picker()
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    expect(pick.emitted('close')).toBeUndefined()
  })
})
