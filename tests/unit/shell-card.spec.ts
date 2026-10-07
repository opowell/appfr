import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import ShellCard from '../../src/components/ShellCard.vue'

let wrapper: VueWrapper | undefined

const TITLE = 'Metadata'
const BODY = 'theme:castle'

function card(props: Record<string, unknown> = {}, slots: Record<string, () => unknown> = {}) {
  wrapper = mount(ShellCard, {
    props: { title: TITLE, ...props },
    slots: {
      default: () => h('p', { class: 'body' }, BODY),
      foot: () => h('button', { type: 'button', class: 'foot-action' }, 'Run'),
      ...slots,
    },
    attachTo: document.body,
  })
  return wrapper
}

const body = (w: VueWrapper) => w.find('.dc-shell-card__body')
const foot = (w: VueWrapper) => w.find('.dc-shell-card__foot')
const toggle = (w: VueWrapper) => w.find('.dc-shell-card__toggle')
const shown = (w: VueWrapper, find: (w: VueWrapper) => ReturnType<VueWrapper['find']>) =>
  (find(w).element as HTMLElement).style.display !== 'none'

afterEach(() => wrapper?.unmount())

describe('ShellCard — folding', () => {
  it('does not fold unless asked to, so a host’s head is untouched', async () => {
    const w = card()
    expect(toggle(w).exists()).toBe(false)
    await w.find('.dc-shell-card__head').trigger('click')
    expect(shown(w, body)).toBe(true)
    expect(w.emitted('update:collapsed')).toBeUndefined()
  })

  it('folds to its head on a press of the head, and opens again on another', async () => {
    const w = card({ collapsible: true })
    await w.find('.dc-shell-card__title').trigger('click')
    expect(shown(w, body)).toBe(false)
    expect(shown(w, foot)).toBe(false)
    expect(w.find('.dc-shell-card__head').isVisible()).toBe(true)
    expect(w.attributes('data-dc-collapsed')).toBe('true')

    await w.find('.dc-shell-card__title').trigger('click')
    expect(shown(w, body)).toBe(true)
    expect(w.emitted('update:collapsed')).toEqual([[true], [false]])
  })

  it('carries the fold on a real button, saying what it folds and whether it is', async () => {
    const w = card({ collapsible: true })
    const button = toggle(w)
    expect(button.element.tagName).toBe('BUTTON')
    expect(button.attributes('aria-expanded')).toBe('true')
    const controlled = button.attributes('aria-controls')!.split(' ')
    expect(controlled).toEqual([body(w).attributes('id'), foot(w).attributes('id')])
    expect(button.text()).toContain(TITLE)

    await button.trigger('click')
    // Once, not twice: the button is in the head, and a press on it is its own.
    expect(w.emitted('update:collapsed')).toEqual([[true]])
    expect(button.attributes('aria-expanded')).toBe('false')
  })

  it('leaves a press on a control in the head to that control', async () => {
    const w = card(
      { collapsible: true },
      {
        aside: () => h('button', { type: 'button', class: 'aside-action' }, 'Duplicate'),
        head: () => [h('h2', null, TITLE), h('a', { href: '#record', class: 'head-link' }, 'open')],
      },
    )
    await w.find('.aside-action').trigger('click')
    await w.find('.head-link').trigger('click')
    expect(shown(w, body)).toBe(true)
    expect(w.emitted('update:collapsed')).toBeUndefined()
  })

  it('starts folded where asked to, holding the state itself', async () => {
    const w = card({ collapsible: true, defaultCollapsed: true })
    expect(shown(w, body)).toBe(false)
    await toggle(w).trigger('click')
    expect(shown(w, body)).toBe(true)
  })

  it('follows v-model:collapsed where it is bound', async () => {
    const w = card({ collapsible: true, collapsed: true, 'onUpdate:collapsed': () => {} })
    expect(shown(w, body)).toBe(false)
    await w.setProps({ collapsed: false })
    expect(shown(w, body)).toBe(true)
    // Controlled, a press asks rather than tells: nothing changes until the
    // owner writes the new value back.
    await toggle(w).trigger('click')
    expect(w.emitted('update:collapsed')).toEqual([[true]])
    expect(shown(w, body)).toBe(true)
  })

  it('does not fold a card with no head, which would leave no way back out', () => {
    const w = card({ collapsible: true, title: undefined, defaultCollapsed: true })
    expect(w.find('.dc-shell-card__head').exists()).toBe(false)
    expect(shown(w, body)).toBe(true)
  })

  it('keeps what is in the body while folded, rather than drawing it afresh', async () => {
    const w = card({ collapsible: true })
    const before = w.find('.body').element
    await toggle(w).trigger('click')
    await toggle(w).trigger('click')
    expect(w.find('.body').element).toBe(before)
  })
})
