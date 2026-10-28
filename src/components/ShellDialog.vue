<script lang="ts">
/*
 * Every dialog that is up, the latest last — in a plain `<script>` because it
 * is one list for every dialog, and what `<script setup>` declares is each
 * instance's own. A dialog can open another, a confirmation over the form it
 * confirms, and Escape is for the one on top, not for all of them at once.
 */
const stack: symbol[] = []
</script>

<script setup lang="ts">
/*
 * A modal dialog: a question the page waits on — are you sure, what should
 * the copy be called, which tenants.
 *
 * Teleported to `body`, so no ancestor's `overflow` can clip it and no
 * stacking context can put it under something — a card's body hides its
 * overflow, and a shell hides its own. And it renders *nothing* while closed,
 * not a hidden backdrop: a backdrop left in the layout with `hidden` is one
 * whose `display: flex` beats the attribute, and an invisible overlay
 * swallows every click on the page.
 *
 * Being in `body` puts it outside the shell its tokens are declared on, so it
 * is a `.dc-shell` of its own, dressed as the shell it was opened from — see
 * {@link useLayerTheme}. Being one also means `controls.css`, where a host
 * uses it, styles the buttons and fields in it as it does those in the shell.
 *
 * Escape closes it, and so does a press on the backdrop; neither closes it
 * itself, but asks — `close`, and `update:open` for a `v-model:open` — since
 * the host owns whether it is open. Opening puts the focus on the first thing
 * in it that takes focus, and closing gives the focus back to wherever it was.
 */
import '../style/shell.css'

import { nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useLayerTheme } from '../composables/useLayerTheme'
import type { ShellTheme } from 'themes'

const props = withDefaults(defineProps<{
  /**
   * Whether the dialog is up. On unless told otherwise, so a dialog can be
   * put up and taken down with a `v-if` on it as well as with this.
   */
  open?: boolean
  /** The dialog's heading, which also names it for a screen reader. */
  title?: string
  /** Names a dialog with no `title`, for a screen reader. */
  label?: string
  /** Where the dialog is drawn. `body` unless the host has a layer of its own. */
  to?: string | HTMLElement
  /**
   * The theme, where it is not the shell's the dialog was opened from — or
   * where it was opened from no shell at all. Minimal then, as ever.
   */
  theme?: ShellTheme
  /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
  accent?: string
  /** Design tokens, over those of the shell the dialog was opened from. */
  tokens?: Record<string, string>
  /**
   * Classes for the panel, the box the dialog is drawn in — a wider one, say.
   * Anything a `class` binding takes. The dialog is teleported, so a class
   * on the component itself has no element of the dialog's to land on.
   */
  panelClass?: string | string[] | Record<string, boolean>
  /** Classes for the body, around the default slot — for what the host puts in it. */
  bodyClass?: string | string[] | Record<string, boolean>
}>(), {
  open: true,
  panelClass: undefined,
  bodyClass: undefined,
  title: undefined,
  label: undefined,
  to: 'body',
  theme: undefined,
  accent: undefined,
  tokens: undefined,
})

const emit = defineEmits<{
  /** Escape, or a press on the backdrop: the reader asks to be let out. */
  close: []
  /** The same request, for `v-model:open`. */
  'update:open': [open: boolean]
}>()

defineSlots<{
  /** What the dialog says and asks. */
  default?: () => unknown
  /** Its buttons, at the bottom right. */
  actions?: () => unknown
}>()

const { theme, style, adopt } = useLayerTheme(props)

const titleId = `${useId() ?? 'dc-dialog'}-title`
const panel = ref<HTMLElement | null>(null)

function dismiss(): void {
  emit('close')
  emit('update:open', false)
}

/* ------------------------------------------------------------- the stack */

const me = Symbol('dc-dialog')

function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Escape' || event.defaultPrevented) return
  if (stack[stack.length - 1] !== me) return
  event.preventDefault()
  dismiss()
}

/* -------------------------------------------------------------- backdrop */

/*
 * A press is on the backdrop only if it *began* there. A drag that starts on
 * a word in the dialog and ends past its edge — selecting a path to copy —
 * clicks the backdrop too, as far as the browser is concerned, and would
 * close the dialog under the selection.
 */
let downOnBackdrop = false

function onPointerDown(event: PointerEvent): void {
  downOnBackdrop = event.target === event.currentTarget
}

function onBackdropClick(event: MouseEvent): void {
  if (event.target === event.currentTarget && downOnBackdrop) dismiss()
  downOnBackdrop = false
}

/* ----------------------------------------------------------------- focus */

const FOCUSABLE = [
  '[autofocus]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/** Where the focus was before the dialog took it, to be given back. */
let returnTo: HTMLElement | null = null

async function rise(): Promise<void> {
  stack.push(me)
  document.addEventListener('keydown', onKeydown)
  returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
  adopt()
  await nextTick()
  // `[autofocus]` leads the list, so a host's choice beats document order.
  const first = panel.value?.querySelector<HTMLElement>('[autofocus]') ??
    panel.value?.querySelector<HTMLElement>(FOCUSABLE)
  ;(first ?? panel.value)?.focus()
}

function fall(): void {
  const at = stack.indexOf(me)
  if (at === -1) return
  stack.splice(at, 1)
  document.removeEventListener('keydown', onKeydown)
  if (returnTo?.isConnected) returnTo.focus()
  returnTo = null
}

onMounted(() => {
  if (props.open) void rise()
})

watch(
  () => props.open,
  (open) => {
    if (open) void rise()
    else fall()
  },
)

onBeforeUnmount(fall)
</script>

<template>
  <Teleport
    v-if="open"
    :to="to"
  >
    <div
      class="dc-shell dc-layer dc-dialog"
      :data-dc-theme="theme"
      :style="style"
      @pointerdown="onPointerDown"
      @click="onBackdropClick"
    >
      <div
        ref="panel"
        class="dc-dialog__panel"
        :class="panelClass"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        :aria-labelledby="title ? titleId : undefined"
        :aria-label="title ? undefined : label"
      >
        <h2
          v-if="title"
          :id="titleId"
          class="dc-dialog__title"
        >
          {{ title }}
        </h2>
        <div
          class="dc-dialog__body"
          :class="bodyClass"
        >
          <slot />
        </div>
        <div
          v-if="$slots.actions"
          class="dc-dialog__actions"
        >
          <slot name="actions" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/*
 * Two classes rather than one, as `<MenuBar>` has: `.dc-shell` brings the
 * palette, and also says "fill the box you are given" and paints the
 * surface, neither of which a backdrop wants. `.dc-layer` gives most of that
 * back already; this says it again at a weight no load order can undo.
 */
.dc-dialog.dc-shell {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: auto;
  container-type: normal;
  background: var(--dc-scrim);
}

.dc-dialog__panel {
  display: flex;
  flex-direction: column;
  width: min(560px, 100%);
  max-height: 86vh;
  overflow: auto;
  padding: 20px;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-lg);
  background: var(--dc-raised);
  color: var(--dc-raised-ink);
  box-shadow: var(--dc-shadow);
  font-size: var(--dc-text-body);
  animation: dc-pop-in 0.12s ease-out;
}

/* Focused only so the focus has somewhere to be when nothing in it takes
   it; that is not a press, and needs no ring. */
.dc-dialog__panel:focus {
  outline: none;
}

.dc-dialog__title {
  margin: 0 0 10px;
  font-size: var(--dc-text-title);
  font-weight: var(--dc-weight-semibold);
  letter-spacing: var(--dc-tracking-tight);
  color: var(--dc-fg-0);
}

.dc-dialog__body {
  min-width: 0;
  color: var(--dc-fg-1);
}

.dc-dialog__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 18px;
}
</style>
