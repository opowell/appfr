import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick, ref } from 'vue'
import type { Ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import ShellDialog from '../../src/components/ShellDialog.vue'
import ShellPopover from '../../src/components/ShellPopover.vue'
import ShellToasts from '../../src/components/ShellToasts.vue'
import plugin from '../../src/plugin'
import { provideShellOwnTheme, provideShellTheme } from '../../src/composables/useLayerTheme'
import { placePopover } from '../../src/menu/popover'
import type { ShellTheme } from '../../src/types'

/*
 * The layers drawn in `body`: where they find their theme when they are not
 * inside the shell they belong to, the popover a host builds its own controls
 * on, and the dialog's hooks for what goes in it.
 */

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
})

function track<T extends VueWrapper>(w: T): T {
  wrapper = w
  return w
}

const layer = (selector: string) => document.body.querySelector<HTMLElement>(`body > ${selector}`)

describe('placePopover', () => {
  const viewport = { width: 1000, height: 800 }
  const anchor = (top: number, left = 100, width = 200, height = 30) => ({
    top,
    bottom: top + height,
    left,
    right: left + width,
    width,
  })

  it('opens below, at least as wide as the anchor, in the room there is', () => {
    const at = placePopover(anchor(100), 0, viewport)
    expect(at).toMatchObject({ side: 'below', top: 134, left: 100, minWidth: 200, maxWidth: 984 })
    expect(at.maxHeight).toBe(800 - 130 - 4 - 8)
  })

  it('caps the height at maxHeight where there is more room than that', () => {
    expect(placePopover(anchor(100), 0, viewport, { maxHeight: 340 }).maxHeight).toBe(340)
  })

  it('flips above where below is short and above has more', () => {
    const at = placePopover(anchor(700), 0, viewport)
    expect(at.side).toBe('above')
    expect(at.bottom).toBe(800 - 700 + 4)
    expect(at.top).toBeUndefined()
    expect(at.maxHeight).toBe(700 - 4 - 8)
  })

  it('stays below where above is shorter still, taking what room there is', () => {
    const short = { width: 1000, height: 200 }
    const at = placePopover(anchor(20), 0, short)
    expect(at.side).toBe('below')
    expect(at.maxHeight).toBe(200 - 50 - 4 - 8)
  })

  it('opens above where asked, and below where above has no room', () => {
    expect(placePopover(anchor(500), 0, viewport, { side: 'above' }).side).toBe('above')
    expect(placePopover(anchor(40), 0, viewport, { side: 'above' }).side).toBe('below')
  })

  it('keeps clear of the right edge, and lines up with the anchor’s end where asked', () => {
    expect(placePopover(anchor(100, 900, 80), 520, viewport).left).toBe(1000 - 520 - 8)
    expect(placePopover(anchor(100, 500, 200), 300, viewport, { align: 'end' }).left).toBe(400)
  })

  it('is never wider than the window less its margins', () => {
    const at = placePopover(anchor(100, 0, 2000), 0, viewport)
    expect(at.minWidth).toBe(984)
    expect(at.left).toBe(8)
  })
})

/**
 * Stands in for `DataShell`: a `.dc-shell` that provides its own theme, the
 * one call `DataShell` makes.
 */
function fakeShell(theme: Ref<ShellTheme>, children: () => unknown, tokens?: Record<string, string>) {
  return {
    setup() {
      provideShellOwnTheme({ theme, tokens: () => tokens, accent: () => undefined })
      return () => h('div', { class: 'dc-shell', 'data-dc-theme': theme.value }, children() as never)
    },
  }
}

describe('Layer theme — where a layer finds its theme', () => {
  it('takes the shell it is rendered inside, and follows it as it changes', async () => {
    const theme = ref<ShellTheme>('dark')
    track(mount(fakeShell(theme, () => h(ShellDialog, { title: 'In' }), { '--dc-accent': 'red' }), {
      attachTo: document.body,
    }))
    await flushPromises()
    expect(layer('.dc-dialog')!.dataset.dcTheme).toBe('dark')
    expect(layer('.dc-dialog')!.style.getPropertyValue('--dc-accent')).toBe('red')
    theme.value = 'light'
    await nextTick()
    expect(layer('.dc-dialog')!.dataset.dcTheme).toBe('light')
  })

  it('takes the app’s default beside a shell rather than inside it', async () => {
    const App = {
      setup() {
        provideShellTheme({ theme: 'dark', tokens: { '--dc-surface': '#14161a' } })
        return () => [
          h('div', { class: 'dc-shell', 'data-dc-theme': 'light' }, 'the shell'),
          h(ShellDialog, { title: 'Beside' }),
          h(ShellToasts),
        ]
      },
    }
    track(mount(App, { attachTo: document.body }))
    await flushPromises()
    expect(layer('.dc-dialog')!.dataset.dcTheme).toBe('dark')
    expect(layer('.dc-dialog')!.style.getPropertyValue('--dc-surface')).toBe('#14161a')
    expect(layer('.dc-toasts')!.dataset.dcTheme).toBe('dark')
  })

  it('takes the plugin’s theme, app-wide', async () => {
    track(mount({ render: () => h(ShellDialog, { title: 'Plugged' }) }, {
      attachTo: document.body,
      global: { plugins: [[plugin, { theme: 'dark', accent: '#6aa9ff' }]] },
    }))
    await flushPromises()
    expect(layer('.dc-dialog')!.dataset.dcTheme).toBe('dark')
    expect(layer('.dc-dialog')!.style.getPropertyValue('--dc-accent')).toBe('#6aa9ff')
  })

  it('beats the app’s default with a shell it is inside, and both with its own props', async () => {
    const App = {
      setup() {
        provideShellTheme({ theme: 'dark' })
        return () => [
          h(fakeShell(ref('light'), () => [
            h(ShellDialog, { title: 'Shell' }),
            h(ShellDialog, { title: 'Own', theme: 'macos' }),
          ])),
        ]
      },
    }
    track(mount(App, { attachTo: document.body }))
    await flushPromises()
    const themes = Array.from(document.body.querySelectorAll<HTMLElement>('body > .dc-dialog')).map(
      (dialog) => dialog.dataset.dcTheme,
    )
    expect(themes).toEqual(['light', 'macos'])
  })

  it('wears a host’s own shell nested inside the DataShell, which is the nearer', async () => {
    track(mount(fakeShell(ref('light'), () =>
      h('div', { class: 'dc-shell', 'data-dc-theme': 'windows', style: '--dc-accent: teal' }, [
        h(ShellDialog, { title: 'Nested' }),
      ])), { attachTo: document.body }))
    await flushPromises()
    expect(layer('.dc-dialog')!.dataset.dcTheme).toBe('windows')
    expect(layer('.dc-dialog')!.style.getPropertyValue('--dc-accent')).toBe('teal')
  })

  it('is minimal with nothing to go on', async () => {
    track(mount({ render: () => h(ShellDialog, { title: 'Alone' }) }, { attachTo: document.body }))
    await flushPromises()
    expect(layer('.dc-dialog')!.dataset.dcTheme).toBe('minimal')
  })
})

describe('ShellDialog — hooks for its content', () => {
  it('is a layer, and puts the host’s classes on its panel and body', async () => {
    track(mount(ShellDialog, {
      props: { title: 'Wide', panelClass: 'wide', bodyClass: { listing: true } },
      slots: { default: () => h('ul', h('li', 'a.spec.ts')) },
      attachTo: document.body,
    }))
    await flushPromises()
    const dialog = layer('.dc-dialog')!
    expect(dialog.classList).toContain('dc-layer')
    expect(dialog.querySelector('.dc-dialog__panel')!.classList).toContain('wide')
    expect(dialog.querySelector('.dc-dialog__body')!.classList).toContain('listing')
  })
})

describe('ShellPopover', () => {
  /** An anchor whose box is wherever a test says. */
  function anchorAt(top: number): HTMLButtonElement {
    const button = document.createElement('button')
    button.className = 'anchor'
    button.getBoundingClientRect = () =>
      ({ top, bottom: top + 30, left: 40, right: 240, width: 200, height: 30 }) as DOMRect
    document.body.append(button)
    return button
  }

  function popover(props: Record<string, unknown>, content = () => h('input', { class: 'filter' })) {
    return track(mount(ShellPopover, {
      props,
      attrs: { class: 'tenants', role: 'dialog', 'aria-label': 'Tenants' },
      slots: { default: content },
      attachTo: document.body,
    }))
  }

  const box = () => layer('.dc-popover')

  it('draws nothing while closed', () => {
    popover({ open: false, anchor: anchorAt(100) })
    expect(box()).toBeNull()
  })

  it('opens in body as a layer, against its anchor, with the host’s attributes on it', async () => {
    popover({ open: true, anchor: anchorAt(100) })
    await flushPromises()
    const element = box()!
    expect([...element.classList]).toEqual(expect.arrayContaining(['dc-shell', 'dc-layer', 'dc-popover', 'tenants']))
    expect(element.getAttribute('role')).toBe('dialog')
    expect(element.getAttribute('aria-label')).toBe('Tenants')
    expect(element.style.position).toBe('fixed')
    expect(element.style.top).toBe('134px')
    expect(element.style.minWidth).toBe('200px')
    expect(element.dataset.dcSide).toBe('below')
  })

  it('asks to close on a press outside it and its anchor, and not on one inside either', async () => {
    const anchor = anchorAt(100)
    const w = popover({ open: true, anchor })
    await flushPromises()
    box()!.querySelector('.filter')!.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    anchor.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    expect(w.emitted('update:open')).toBeUndefined()
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    expect(w.emitted('update:open')).toEqual([[false]])
    expect(w.emitted('close')).toHaveLength(1)
  })

  it('takes Escape before a dialog it is in, which stays up', async () => {
    const closed: string[] = []
    const anchor = anchorAt(100)
    track(mount({
      render: () =>
        h(ShellDialog, { title: 'Crawl', onClose: () => closed.push('dialog') }, {
          default: () => h(ShellPopover, { open: true, anchor, onClose: () => closed.push('popover') }),
        }),
    }, { attachTo: document.body }))
    await flushPromises()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    expect(closed).toEqual(['popover'])
  })

  it('counts a press in a popover opened from inside it as inside', async () => {
    const outer = anchorAt(100)
    const inner = anchorAt(300)
    const closed: string[] = []
    track(mount({
      render: () => [
        h(ShellPopover, { open: true, anchor: outer, class: 'outer', onClose: () => closed.push('outer') }),
        h(ShellPopover, { open: true, anchor: inner, class: 'inner', onClose: () => closed.push('inner') }, {
          default: () => h('span', { class: 'deep' }, 'deep'),
        }),
      ],
    }, { attachTo: document.body }))
    await flushPromises()
    document.body.querySelector('.deep')!.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    expect(closed).toEqual([])
  })
})
