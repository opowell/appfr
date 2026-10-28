import { h, onMounted, ref } from 'vue'
import ShellCard from '../src/components/ShellCard.vue'
import ShellFacts from '../src/components/ShellFacts.vue'
import ShellFact from '../src/components/ShellFact.vue'
import StatusPill from '../src/components/StatusPill.vue'
import StatusCounts from '../src/components/StatusCounts.vue'
import ShellCode from '../src/components/ShellCode.vue'
import CopyButton from '../src/components/CopyButton.vue'
import ShellLog from '../src/components/ShellLog.vue'
import ShellDialog from '../src/components/ShellDialog.vue'
import ShellToasts from '../src/components/ShellToasts.vue'
import { useToasts } from '../src/composables/useToasts'
import type { ShellTheme } from 'themes'
import type { LogChunk, PillTone, RecordStatus, StatusCount } from '../src/types'
/*
 * Inlined rather than imported for its side effect: an imported stylesheet
 * stays in the story frame for every story shown after it, and this one styles
 * buttons by tag. As a `<style>` the story renders, it goes when the story does.
 */
import controlsCss from '../src/style/controls.css?inline'

/** `controls.css`, for the stories of a host's own markup. */
export const controlsStyle = () => h('style', { 'data-story-controls': '' }, controlsCss)

/** The card grid a page about one record lays its cards out in. */
function cardGrid(children: unknown[]) {
  return h(
    'div',
    {
      style:
        'display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:16px; align-items:stretch',
    },
    children as never,
  )
}

const COMMAND =
  'npx playwright test ' +
  Array.from({ length: 40 }, (_, index) => `tests/specs/flow-${index + 1}.spec.ts`).join(' ')

const SOURCE = Array.from(
  { length: 60 },
  (_, index) => `  await page.getByRole('button', { name: 'Step ${index + 1}' }).click()`,
).join('\n')

const ERROR = [
  'Error: expect(locator).toBeVisible() failed',
  '',
  "Locator: getByRole('heading', { name: 'Checkout' })",
  'Expected: visible',
  'Received: <element(s) not found>',
  '    at tests/specs/flow-3.spec.ts:41:7',
].join('\n')

const RESULTS: { title: string; file: string; status: RecordStatus; label: string }[] = [
  { title: 'books a ski pass', file: 'flow-1.spec.ts', status: 'ok', label: 'passed' },
  { title: 'pays with a voucher', file: 'flow-2.spec.ts', status: 'failed', label: 'failed' },
  { title: 'adds insurance', file: 'flow-3.spec.ts', status: 'running', label: 'running' },
  { title: 'changes the date', file: 'flow-4.spec.ts', status: 'queued', label: 'pending' },
]

const COUNTS: StatusCount[] = [
  { label: 'passed', count: 12, tone: 'ok' },
  { label: 'failed', count: 1, tone: 'failed' },
  { label: 'flaky', count: 2, tone: 'review' },
  { label: 'skipped', count: 3 },
  { label: 'running', count: 1, tone: 'running' },
  { label: 'pending', count: 0 },
]

/**
 * A log that grows when told to, so a test can say exactly when there is more
 * of it and where the reader is when it arrives.
 */
function growingLog() {
  const lines: string[] = []
  const write = (count: number) => {
    const start = lines.length
    for (let index = 0; index < count; index += 1) {
      const n = start + index + 1
      lines.push(n % 7 === 0 ? `\x1b[31mline ${n}: failed\x1b[39m\n` : `line ${n}: ok\n`)
    }
  }
  const fetchChunk = async (offset: number): Promise<LogChunk> => {
    const text = lines.join('')
    return { chunk: text.slice(offset), offset: text.length }
  }
  return { write, fetchChunk }
}

/**
 * The cards a page about one run would show, built from nothing but the
 * library's parts and `controls.css` — the page the content parts exist for.
 */
export function recordPage(theme: ShellTheme = 'dark') {
  return {
    setup() {
      const { toast, toastError } = useToasts()
      const log = ref<{ poll(): Promise<void> } | null>(null)
      const growing = growingLog()
      growing.write(30)
      onMounted(() => log.value?.poll())

      const append = async () => {
        growing.write(30)
        await log.value?.poll()
      }

      return () =>
        h('div', { class: 'dc-shell', 'data-dc-theme': theme, style: 'padding:24px; overflow:auto' }, [
          controlsStyle(),
          cardGrid([
            h(ShellCard, { name: 'Run 2026-10-26-0912', reference: 'https://shop.example.com/en/pages/skipass', span: 'all' }, {
              aside: () => [
                h(StatusPill, { tone: 'accent', label: 'crawler-generated' }),
                h(StatusPill, { tone: 'review', label: 'live — no profile' }),
                h(StatusPill, { status: 'failed' }),
                h('button', { type: 'button', class: 'host-plain' }, 'Duplicate'),
                h('button', { type: 'button', class: 'danger' }, 'Delete'),
                h('button', { type: 'button', class: 'primary' }, 'Run again'),
              ],
              default: () => [
                h('p', { class: 'dc-hint', style: 'margin:0' }, 'Started from the command line on the dev server.'),
                h('p', { class: 'dc-hint dc-hint--warn' }, 'This run leaves each browser window open once it finishes.'),
              ],
            }),
            h(ShellCard, { title: 'Summary', span: 'all', collapsible: true, class: 'story-summary' }, {
              default: () =>
                h(ShellFacts, {
                  items: [
                    { label: 'Started', value: '26 Oct 2026, 09:12', title: '2026-10-26T09:12:04Z' },
                    { label: 'Finished', value: null },
                    { label: 'Target', value: 'https://shop.example.com' },
                    { label: 'Browser', value: 'chromium' },
                    { label: 'Recorded URLs', value: ['https://shop.example.com/en/a', 'https://shop.example.com/en/b'] },
                  ],
                }, {
                  default: () => [
                    h(ShellFact, { label: 'Cases' }, {
                      default: () => h(StatusCounts, { counts: COUNTS }),
                    }),
                    h(ShellFact, { wide: true, class: 'story-command' }, {
                      label: () => [
                        'Command',
                        h(CopyButton, { text: COMMAND, label: 'Copy the command', onError: toastError }),
                      ],
                      default: () => h(ShellCode, { code: COMMAND, maxHeight: 96 }),
                    }),
                  ],
                }),
            }),
            h(ShellCard, { title: 'Results', count: RESULTS.length, span: 'all', flush: true, class: 'story-results' }, {
              default: () =>
                h('table', [
                  h('thead', h('tr', [h('th', 'Result'), h('th', 'Case'), h('th', '')])),
                  h('tbody', RESULTS.map((result) =>
                    h('tr', { key: result.file }, [
                      h('td', h(StatusPill, { status: result.status, label: result.label })),
                      h('td', [h('div', result.title), h('div', { class: 'dc-mono', style: 'color:var(--dc-fg-3); font-size:var(--dc-text-meta)' }, result.file)]),
                      h('td', { style: 'text-align:right' }, h('button', { type: 'button', class: 'link' }, 'Open')),
                    ]),
                  )),
                ]),
            }),
            h(ShellCard, { title: 'Error', span: 'all', flush: true, class: 'story-error' }, {
              default: () => h(ShellCode, { code: ERROR, tone: 'danger' }),
            }),
            h(ShellCard, { title: 'Source', span: 'all', flush: true, class: 'story-source' }, {
              default: () =>
                h(ShellCode, {
                  code: SOURCE,
                  maxHeight: 200,
                  copy: true,
                  copyLabel: 'Copy the source',
                  onCopied: () => toast('Source copied'),
                  onError: toastError,
                }),
            }),
            h(ShellCard, { title: 'Output', span: 'all', flush: true, class: 'story-output' }, {
              aside: () => h('button', { type: 'button', class: 'story-append', onClick: append }, 'Write 30 more lines'),
              default: () => h(ShellLog, { ref: log, fetchChunk: growing.fetchChunk, stripAnsi: true, maxHeight: 160 }),
            }),
          ]),
          h(ShellToasts),
        ])
    },
  }
}

/** Every tone a pill comes in, and a row of counts. */
export function pillTones() {
  return {
    setup() {
      const tones: PillTone[] = ['ok', 'failed', 'running', 'review', 'queued', 'neutral', 'accent']
      return () =>
        h('div', { class: 'dc-shell', 'data-dc-theme': 'dark', style: 'padding:24px; display:flex; flex-direction:column; gap:16px' }, [
          h('div', { style: 'display:flex; gap:8px; flex-wrap:wrap' },
            tones.map((tone) => h(StatusPill, { tone, label: tone }))),
          h('div', { style: 'display:flex; gap:8px; flex-wrap:wrap' }, [
            h(StatusPill, { status: 'ok', label: 'passed' }),
            h(StatusPill, { tone: 'accent', label: 'crawler-generated' }),
            h(StatusPill, { tone: 'neutral', label: 'hand-written' }),
            h(StatusPill, { tone: 'review', label: 'live — no profile' }),
          ]),
          h(StatusCounts, { counts: COUNTS }),
          h(StatusCounts, { counts: [] }),
        ])
    },
  }
}

/**
 * A dialog opened from a button in a shell, which asks before acting and
 * raises a toast when it has. Rendered inside a dark shell, so the dialog
 * and the toast — both drawn in `body` — show whether they took its theme.
 */
export function dialogDemo() {
  return {
    setup() {
      const open = ref(false)
      const name = ref('flow-1 copy')
      const { toast, toastError } = useToasts()

      const confirm = () => {
        open.value = false
        toast(`Duplicated as “${name.value}”`)
      }

      return () =>
        h('div', { class: 'dc-shell', 'data-dc-theme': 'dark', style: 'padding:24px; gap:12px; align-items:flex-start' }, [
          controlsStyle(),
          h('button', { type: 'button', class: 'story-open', onClick: () => { open.value = true } }, 'Duplicate…'),
          h('button', { type: 'button', class: 'story-fail', onClick: () => toastError(new Error('The server said no')) }, 'Fail'),
          h(ShellDialog, {
            open: open.value,
            title: 'Duplicate test',
            'onUpdate:open': (next: boolean) => { open.value = next },
          }, {
            default: () => [
              h('p', { style: 'margin:0 0 10px' }, 'The copy is a new spec beside the original, with its own name.'),
              h('label', { style: 'display:flex; flex-direction:column; gap:6px' }, [
                h('span', 'Name'),
                h('input', {
                  type: 'text',
                  class: 'story-name',
                  value: name.value,
                  onInput: (event: Event) => { name.value = (event.target as HTMLInputElement).value },
                }),
              ]),
              h('p', { class: 'dc-hint' }, 'Names are unique within a folder.'),
            ],
            actions: () => [
              h('button', { type: 'button', onClick: () => { open.value = false } }, 'Cancel'),
              h('button', { type: 'button', class: 'primary story-confirm', onClick: confirm }, 'Duplicate'),
            ],
          }),
          h(ShellToasts),
        ])
    },
  }
}
