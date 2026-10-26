import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import ShellCard from '../../src/components/ShellCard.vue'
import StatusPill from '../../src/components/StatusPill.vue'
import ShellFacts from '../../src/components/ShellFacts.vue'
import ShellFact from '../../src/components/ShellFact.vue'
import StatusCounts from '../../src/components/StatusCounts.vue'
import CopyButton from '../../src/components/CopyButton.vue'
import ShellCode from '../../src/components/ShellCode.vue'
import ShellLog from '../../src/components/ShellLog.vue'
import ShellDialog from '../../src/components/ShellDialog.vue'
import ShellToasts from '../../src/components/ShellToasts.vue'
import { TOAST_ERROR_MS, TOAST_MS, useToasts } from '../../src/composables/useToasts'
import type { LogChunk } from '../../src/types'

/*
 * The content parts: what a host puts inside a card of its own, and the two
 * layers that go over the page. Every one of them is new, so the tests that
 * matter most for the two that are not — ShellCard and StatusPill — are the
 * ones that say nothing changes where the new props are not given.
 */

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
  vi.useRealTimers()
})

function track<T extends VueWrapper>(w: T): T {
  wrapper = w
  return w
}

/** The attributes a test sets store by, without the scoped-style id Vue adds. */
function attributes(element: Element): Record<string, string> {
  return Object.fromEntries(
    Array.from(element.attributes)
      .filter((attribute) => !attribute.name.startsWith('data-v-'))
      .map((attribute) => [attribute.name, attribute.value]),
  )
}

describe('ShellCard — identity head', () => {
  it('draws the title as it always has where no name is given', () => {
    const w = track(mount(ShellCard, { props: { title: 'Metadata', count: 3 } }))
    const head = w.find('.dc-shell-card__head')
    expect(head.findAll('h2')).toHaveLength(1)
    expect(attributes(head.find('h2').element)).toEqual({ class: 'dc-shell-card__title' })
    expect(head.find('.dc-shell-card__identity').exists()).toBe(false)
  })

  it('draws the name over the reference, in place of the title', () => {
    const w = track(mount(ShellCard, {
      props: { name: 'Yellow Castle', reference: 'sets/375-2', title: 'ignored', count: 41 },
    }))
    const identity = w.find('.dc-shell-card__identity')
    expect(identity.find('h2').text()).toBe('Yellow Castle')
    expect(identity.find('.dc-shell-card__ref').text()).toBe('sets/375-2')
    expect(identity.find('.dc-shell-card__ref').classes()).toContain('dc-mono')
    expect(w.text()).not.toContain('ignored')
    expect(w.find('.dc-shell-card__count').text()).toBe('41')
  })

  it('heads a card with a name alone, and names the fold toggle with it', () => {
    const w = track(mount(ShellCard, { props: { name: 'Run 12', collapsible: true } }))
    expect(w.find('.dc-shell-card__ref').exists()).toBe(false)
    expect(w.find('.dc-shell-card__sr').text()).toBe('Run 12')
  })

  it('takes the reference from its slot, where it is a link', () => {
    const w = track(mount(ShellCard, {
      props: { name: 'tenant-a' },
      slots: { reference: () => h('a', { href: 'https://a.example' }, 'https://a.example') },
    }))
    expect(w.find('.dc-shell-card__ref a').attributes('href')).toBe('https://a.example')
  })

  it('gives way to the head slot', () => {
    const w = track(mount(ShellCard, {
      props: { name: 'Run 12', reference: 'x' },
      slots: { head: () => h('h3', 'Own head') },
    }))
    expect(w.find('.dc-shell-card__identity').exists()).toBe(false)
    expect(w.find('h3').text()).toBe('Own head')
  })
})

describe('StatusPill', () => {
  it('is exactly what it was with a status alone', () => {
    const w = track(mount(StatusPill, { props: { status: 'failed' } }))
    expect(attributes(w.element)).toEqual({ class: 'dc-pill', 'data-dc-status': 'failed' })
    expect(w.text()).toBe('failed')
  })

  it('says a label in place of the status, in the status’s colour', () => {
    const w = track(mount(StatusPill, { props: { status: 'ok', label: 'passed' } }))
    expect(w.text()).toBe('passed')
    expect(w.attributes('data-dc-status')).toBe('ok')
  })

  it('takes a tone and a label with no status at all', () => {
    const w = track(mount(StatusPill, { props: { tone: 'accent', label: 'crawler-generated' } }))
    expect(w.text()).toBe('crawler-generated')
    expect(w.attributes('data-dc-tone')).toBe('accent')
    expect(w.attributes('data-dc-status')).toBeUndefined()
  })
})

describe('ShellFacts', () => {
  it('draws each item as a label over a value, in a definition list', () => {
    const w = track(mount(ShellFacts, {
      props: {
        items: [
          { label: 'Started', value: '12 Oct 2026', title: 'exact' },
          { label: 'Workers', value: 4 },
        ],
      },
    }))
    expect(w.element.tagName).toBe('DL')
    const facts = w.findAll('.dc-fact')
    expect(facts).toHaveLength(2)
    expect(facts[0]!.find('dt').text()).toBe('Started')
    expect(facts[0]!.find('dd').text()).toBe('12 Oct 2026')
    expect(facts[0]!.find('dd').attributes('title')).toBe('exact')
    expect(facts[1]!.find('dd').text()).toBe('4')
  })

  it('draws a list a line per entry, and nothing as the dash', () => {
    const w = track(mount(ShellFacts, {
      props: {
        items: [
          { label: 'URLs', value: ['https://a.example', 'https://b.example'] },
          { label: 'Tags', value: [] },
          { label: 'Finished', value: null },
          { label: 'Flags', value: '' },
        ],
      },
    }))
    const values = w.findAll('dd')
    expect(values[0]!.findAll('.dc-fact__line').map((line) => line.text())).toEqual([
      'https://a.example',
      'https://b.example',
    ])
    expect(values.slice(1).map((value) => value.text())).toEqual(['—', '—', '—'])
  })

  it('takes a fact of the host’s, with its own label and value, across the row', () => {
    const w = track(mount(ShellFacts, {
      props: { items: [{ label: 'First', value: 'one' }] },
      slots: {
        default: () => h(ShellFact, { wide: true }, {
          label: () => ['Command ', h('button', { class: 'copy' }, 'copy')],
          default: () => h('code', 'npx playwright test'),
        }),
      },
    }))
    const facts = w.findAll('.dc-fact')
    expect(facts).toHaveLength(2)
    expect(facts[1]!.find('dt button.copy').exists()).toBe(true)
    expect(facts[1]!.find('dd code').text()).toBe('npx playwright test')
    expect((facts[1]!.element as HTMLElement).style.gridColumn).toBe('1 / -1')
  })
})

describe('StatusCounts', () => {
  it('says each count with its label, in order, leaving out the zeros', () => {
    const w = track(mount(StatusCounts, {
      props: {
        counts: [
          { label: 'passed', count: 12, tone: 'ok' },
          { label: 'failed', count: 0, tone: 'failed' },
          { label: 'skipped', count: 2 },
        ],
      },
    }))
    const counts = w.findAll('.dc-counts__count')
    expect(counts.map((count) => count.text())).toEqual(['12 passed', '2 skipped'])
    expect(counts.map((count) => count.attributes('data-dc-tone'))).toEqual(['ok', 'neutral'])
  })

  it('says the dash when there is nothing to count', () => {
    const w = track(mount(StatusCounts, { props: { counts: [{ label: 'passed', count: 0 }] } }))
    expect(w.find('.dc-counts__empty').text()).toBe('—')
  })
})

describe('CopyButton', () => {
  function clipboard(writeText: (text: string) => Promise<void>) {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
  }

  it('copies the text and shows the tick, then goes back', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn(async () => {})
    clipboard(writeText)
    const w = track(mount(CopyButton, { props: { text: 'npx run' } }))
    await w.trigger('click')
    await flushPromises()
    expect(writeText).toHaveBeenCalledWith('npx run')
    expect(w.emitted('copied')).toEqual([['npx run']])
    expect(w.attributes('data-dc-copied')).toBe('true')
    vi.advanceTimersByTime(1500)
    await nextTick()
    expect(w.attributes('data-dc-copied')).toBe('false')
  })

  it('reports a clipboard that refuses, and shows no tick', async () => {
    const refused = new Error('denied')
    clipboard(async () => {
      throw refused
    })
    const w = track(mount(CopyButton, { props: { text: 'x' } }))
    await w.trigger('click')
    await flushPromises()
    expect(w.emitted('error')).toEqual([[refused]])
    expect(w.attributes('data-dc-copied')).toBe('false')
  })
})

describe('ShellCode', () => {
  it('bounds the block where asked, and copies what its slot drew', async () => {
    const writeText = vi.fn(async () => {})
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    const w = track(mount(ShellCode, {
      props: { maxHeight: 96, copy: true },
      slots: { default: () => 'line one\nline two' },
    }))
    expect((w.find('pre').element as HTMLElement).style.maxHeight).toBe('96px')
    await w.find('.dc-copy').trigger('click')
    await flushPromises()
    expect(writeText).toHaveBeenCalledWith('line one\nline two')
  })

  it('draws the code prop, with no copy button unless asked', () => {
    const w = track(mount(ShellCode, { props: { code: 'const a = 1' } }))
    expect(w.find('pre').text()).toBe('const a = 1')
    expect(w.find('.dc-copy').exists()).toBe(false)
    expect((w.find('pre').element as HTMLElement).style.maxHeight).toBe('')
  })
})

describe('ShellLog', () => {
  /** A log of fixed chunks, read from wherever the pane asks. */
  function source(chunks: string[]) {
    const text = chunks.join('')
    let served = 0
    return vi.fn(async (offset: number): Promise<LogChunk> => {
      const end = served < chunks.length ? offset + chunks[served++]!.length : offset
      return { chunk: text.slice(offset, end), offset: end }
    })
  }

  it('appends what it has not read, from where it left off', async () => {
    const fetchChunk = source(['one\n', 'two\n'])
    const w = track(mount(ShellLog, { props: { fetchChunk } }))
    const log = w.vm as unknown as { poll(): Promise<void>; reset(): void }
    await log.poll()
    await log.poll()
    await log.poll()
    expect(fetchChunk.mock.calls.map(([offset]) => offset)).toEqual([0, 4, 8])
    expect(w.find('pre').text()).toBe('one\ntwo')
    log.reset()
    await nextTick()
    expect(w.find('pre').text()).toBe('')
  })

  it('reads once for a poll asked for while one is in flight', async () => {
    const fetchChunk = source(['once'])
    const w = track(mount(ShellLog, { props: { fetchChunk } }))
    const log = w.vm as unknown as { poll(): Promise<void> }
    await Promise.all([log.poll(), log.poll()])
    expect(fetchChunk).toHaveBeenCalledTimes(1)
    expect(w.find('pre').text()).toBe('once')
  })

  it('takes out colour codes where asked, even split across two chunks', async () => {
    const fetchChunk = source(['\x1b[31mred\x1b[3', '9m plain'])
    const w = track(mount(ShellLog, { props: { fetchChunk, stripAnsi: true } }))
    const log = w.vm as unknown as { poll(): Promise<void> }
    await log.poll()
    await log.poll()
    expect(w.find('pre').text()).toBe('red plain')
  })
})

describe('ShellDialog', () => {
  const Host = {
    props: { open: { type: Boolean, default: false } },
    emits: ['close'],
    setup(props: { open: boolean }, { emit }: { emit: (event: 'close') => void }) {
      return () =>
        h('div', { class: 'dc-shell', 'data-dc-theme': 'dark', style: '--dc-accent: red' }, [
          h('button', { class: 'opener' }, 'Open'),
          h(ShellDialog, { open: props.open, title: 'Delete?', onClose: () => emit('close') }, {
            default: () => h('p', 'Gone for good.'),
            actions: () => h('button', { class: 'confirm' }, 'Delete'),
          }),
        ])
    },
  }

  const dialog = () => document.body.querySelector<HTMLElement>('.dc-dialog')

  it('draws nothing at all while closed', () => {
    track(mount(Host, { props: { open: false }, attachTo: document.body }))
    expect(dialog()).toBeNull()
  })

  it('goes up in body, dressed as the shell it was opened from', async () => {
    track(mount(Host, { props: { open: true }, attachTo: document.body }))
    await flushPromises()
    const layer = dialog()!
    expect(layer.parentElement).toBe(document.body)
    expect(layer.classList).toContain('dc-shell')
    expect(layer.dataset.dcTheme).toBe('dark')
    expect(layer.style.getPropertyValue('--dc-accent')).toBe('red')
    expect(layer.querySelector('[role="dialog"]')!.getAttribute('aria-labelledby')).toBe(
      layer.querySelector('h2')!.id,
    )
  })

  it('puts the focus in, and gives it back on closing', async () => {
    const w = track(mount(Host, { props: { open: false }, attachTo: document.body }))
    const opener = w.find<HTMLButtonElement>('.opener').element
    opener.focus()
    await w.setProps({ open: true })
    await flushPromises()
    expect(document.activeElement).toBe(dialog()!.querySelector('.confirm'))
    await w.setProps({ open: false })
    await flushPromises()
    expect(document.activeElement).toBe(opener)
  })

  it('asks to close on Escape and on a press of the backdrop, not of the panel', async () => {
    const w = track(mount(Host, { props: { open: true }, attachTo: document.body }))
    await flushPromises()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(w.emitted('close')).toHaveLength(1)

    const panel = dialog()!.querySelector('.dc-dialog__panel')!
    panel.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    panel.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(w.emitted('close')).toHaveLength(1)

    // A drag from inside the panel that ends on the backdrop is not a press of it.
    panel.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    dialog()!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(w.emitted('close')).toHaveLength(1)

    dialog()!.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    dialog()!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(w.emitted('close')).toHaveLength(2)
  })

  it('closes only the one on top on Escape', async () => {
    const closed: string[] = []
    const Pair = {
      setup: () => () => [
        h(ShellDialog, { title: 'Under', onClose: () => closed.push('under') }),
        h(ShellDialog, { title: 'Over', onClose: () => closed.push('over') }),
      ],
    }
    track(mount(Pair, { attachTo: document.body }))
    await flushPromises()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(closed).toEqual(['over'])
  })
})

describe('useToasts', () => {
  it('shares one stack, and takes each toast down after its time', () => {
    vi.useFakeTimers()
    const { toast } = useToasts()
    const { toasts, toastError } = useToasts()
    toast('Saved')
    toastError(new Error('Nope'))
    expect(toasts.value.map((item) => [item.message, item.kind])).toEqual([
      ['Saved', 'ok'],
      ['Nope', 'err'],
    ])
    vi.advanceTimersByTime(TOAST_MS)
    expect(toasts.value.map((item) => item.message)).toEqual(['Nope'])
    vi.advanceTimersByTime(TOAST_ERROR_MS - TOAST_MS)
    expect(toasts.value).toEqual([])
  })

  it('draws the stack in body, in the theme it is given', async () => {
    vi.useFakeTimers()
    track(mount(ShellToasts, { props: { theme: 'dark' }, attachTo: document.body }))
    const { toast, toastError, dismiss, toasts } = useToasts()
    toast('Copied')
    toastError('Plain string')
    await nextTick()
    const stack = document.body.querySelector<HTMLElement>('.dc-toasts')!
    expect(stack.dataset.dcTheme).toBe('dark')
    const items = Array.from(stack.querySelectorAll('.dc-toast'))
    expect(items.map((item) => item.textContent?.trim())).toEqual(['Copied', 'Plain string'])
    expect(items[1]!.getAttribute('role')).toBe('alert')
    for (const item of [...toasts.value]) dismiss(item.id)
    await nextTick()
    expect(stack.querySelectorAll('.dc-toast')).toHaveLength(0)
  })
})
