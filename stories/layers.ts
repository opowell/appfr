import { computed, h, ref } from 'vue'
import ShellDialog from '../src/components/ShellDialog.vue'
import ShellPopover from '../src/components/ShellPopover.vue'
import ShellToasts from '../src/components/ShellToasts.vue'
import { provideShellTheme } from '../src/composables/useLayerTheme'
import { useToasts } from '../src/composables/useToasts'
import { controlsStyle } from './content'

const TENANTS = Array.from({ length: 48 }, (_, index) => `tenant-${String(index + 1).padStart(2, '0')}`)

/**
 * A multi-select built on `<ShellPopover>`, the way a host would: a button
 * that says what is chosen, and a box of toggles under it with a filter.
 */
function picker(name: string) {
  const open = ref(false)
  const anchor = ref<HTMLElement | null>(null)
  const chosen = ref<string[]>([])
  const filter = ref('')

  const shown = computed(() => TENANTS.filter((tenant) => tenant.includes(filter.value.trim())))
  const summary = computed(() =>
    chosen.value.length ? `${chosen.value.length} tenant(s): ${chosen.value.join(', ')}` : 'all tenants',
  )

  function toggle(tenant: string) {
    chosen.value = chosen.value.includes(tenant)
      ? chosen.value.filter((entry) => entry !== tenant)
      : [...chosen.value, tenant]
  }

  const button = () =>
    h('button', {
      ref: anchor,
      type: 'button',
      class: `story-pick story-pick--${name}`,
      'aria-expanded': open.value ? 'true' : 'false',
      onClick: () => {
        open.value = !open.value
      },
    }, summary.value)

  const box = () =>
    h(ShellPopover, {
      open: open.value,
      anchor: anchor.value,
      maxHeight: 300,
      class: `story-tenants story-tenants--${name}`,
      role: 'dialog',
      'aria-label': 'Tenants',
      style: 'width: 420px',
      'onUpdate:open': (next: boolean) => {
        open.value = next
      },
    }, {
      default: () => [
        h('input', {
          type: 'search',
          class: 'story-filter',
          placeholder: 'filter…',
          value: filter.value,
          style: 'width: 100%; margin-bottom: 8px',
          onInput: (event: Event) => {
            filter.value = (event.target as HTMLInputElement).value
          },
        }),
        h('div', { style: 'display:flex; flex-wrap:wrap; gap:4px' }, shown.value.map((tenant) =>
          h('button', {
            key: tenant,
            type: 'button',
            class: chosen.value.includes(tenant) ? 'primary story-option' : 'story-option',
            'aria-pressed': chosen.value.includes(tenant) ? 'true' : 'false',
            onClick: () => toggle(tenant),
          }, tenant),
        )),
      ],
    })

  return { button, box }
}

/**
 * Layers written *beside* a shell rather than inside it, which is where an
 * app's dialogs and toasts usually are: no `.dc-shell` above them in the page
 * and no `DataShell` above them as components. The app's default theme
 * (`provideShellTheme`) is what dresses them — dark, beside a light shell.
 */
export function layersBeside() {
  return {
    setup() {
      provideShellTheme({ theme: 'dark' })
      const { toast } = useToasts()
      const top = picker('top')
      const low = picker('low')
      const inDialog = picker('dialog')
      const dialogOpen = ref(false)

      return () =>
        h('div', { style: 'display:flex; flex-direction:column; height:100%' }, [
          controlsStyle(),
          h('div', {
            class: 'dc-shell story-shell',
            'data-dc-theme': 'light',
            style: 'padding:24px; gap:12px; align-items:flex-start',
          }, [
            h('button', {
              type: 'button',
              class: 'story-open-dialog',
              onClick: () => {
                dialogOpen.value = true
              },
            }, 'Start a crawl…'),
            top.button(),
            h('div', { style: 'margin-top:auto' }, low.button()),
          ]),
          top.box(),
          low.box(),
          h(ShellDialog, {
            open: dialogOpen.value,
            title: 'Start a crawl',
            bodyClass: 'story-dialog-body',
            'onUpdate:open': (next: boolean) => {
              dialogOpen.value = next
            },
          }, {
            default: () => [
              h('p', { style: 'margin:0' }, 'Which tenants the crawl visits — none chosen is every one.'),
              h('label', [h('input', { type: 'checkbox', class: 'story-headed' }), 'Headed browser']),
              h('ul', [h('li', 'tenants.json'), h('li', 'targets.json')]),
              inDialog.button(),
              inDialog.box(),
            ],
            actions: () => [
              h('button', {
                type: 'button',
                class: 'primary',
                onClick: () => {
                  dialogOpen.value = false
                  toast('Crawl started')
                },
              }, 'Start'),
            ],
          }),
          h(ShellToasts),
        ])
    },
  }
}
