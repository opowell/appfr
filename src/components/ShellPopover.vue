<script lang="ts">
/*
 * Every popover that is up, the latest last — one list for all of them, so a
 * popover opened from inside another treats a press in the inner one as a
 * press inside itself, and Escape takes down the inner one alone.
 */
const stack: { root: () => HTMLElement | null }[] = []
</script>

<script setup lang="ts">
/*
 * A box of the host's own, opened against the control that opened it: a
 * multi-select's grid of toggles, a filter, a date picker. The shell's menus
 * are a list of items; this is for everything that is not.
 *
 * Teleported to `body`, as a dialog is, because a card's body clips what
 * overflows it and a popover is exactly what overflows. And positioned with
 * `position: fixed` from the anchor's box, since in `body` there is nothing
 * else to be positioned against — which is also why it is not drawn inside
 * the shell: the shell is a size container, and a size container is the
 * containing block of its fixed descendants, so a popover in it would be
 * placed against the shell instead of the window.
 *
 * It opens below the anchor, or above where below has too little room and
 * above has more, at least as wide as the anchor and never taller than the
 * room it has — the rest scrolls. Scrolling anything under it or resizing
 * the window moves it with the anchor. A press anywhere outside it and the
 * anchor, or Escape, asks to close it.
 *
 * Its palette is the one a dialog finds — see {@link useLayerTheme}. Any
 * attribute given to it — a class, a role, a label — lands on the box.
 */
import '../style/tokens.css'

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLayerTheme } from '../composables/useLayerTheme'
import { placePopover } from '../menu/popover'
import type { PopoverPlacement } from '../menu/popover'
import type { ShellTheme } from '../types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  /** Whether it is up. Bind `v-model:open`. */
  open?: boolean
  /** The element it opens against — the button that opened it, usually. */
  anchor?: HTMLElement | null
  /** The side it opens on when that side has the room. */
  side?: 'below' | 'above'
  /** Lines its left edge up with the anchor's (`start`), or its right (`end`). */
  align?: 'start' | 'end'
  /** The tallest it grows, in pixels, before the room it has cuts it down. */
  maxHeight?: number
  /** Where it is drawn. */
  to?: string | HTMLElement
  /** The theme, where it is not the one {@link useLayerTheme} finds. */
  theme?: ShellTheme
  /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
  accent?: string
  /** Design tokens, over those it finds. */
  tokens?: Record<string, string>
}>(), {
  open: false,
  anchor: null,
  side: 'below',
  align: 'start',
  maxHeight: undefined,
  to: 'body',
  theme: undefined,
  accent: undefined,
  tokens: undefined,
})

const emit = defineEmits<{
  /** A press outside, or Escape: asks to be closed. */
  'update:open': [open: boolean]
  /** The same request, for a host not binding `v-model:open`. */
  close: []
}>()

defineSlots<{
  default?: () => unknown
}>()

const { theme, style: themeStyle, adopt } = useLayerTheme(props)

const root = ref<HTMLElement | null>(null)
const placed = ref<PopoverPlacement | null>(null)
const me = { root: () => root.value }

function place(): void {
  const anchor = props.anchor
  if (!anchor) return
  placed.value = placePopover(
    anchor.getBoundingClientRect(),
    root.value?.offsetWidth ?? 0,
    { width: window.innerWidth, height: window.innerHeight },
    { side: props.side, align: props.align, maxHeight: props.maxHeight },
  )
}

/*
 * Inline, beside the theme's tokens: where it is is measured, and has to win
 * over anything. `overflow` is here too, being what `maxHeight` is for.
 */
const style = computed<Record<string, string>>(() => {
  const at = placed.value
  const position: Record<string, string> = at
    ? {
      position: 'fixed',
      left: `${at.left}px`,
      ...(at.top !== undefined ? { top: `${at.top}px` } : {}),
      ...(at.bottom !== undefined ? { bottom: `${at.bottom}px` } : {}),
      minWidth: `${at.minWidth}px`,
      maxWidth: `${at.maxWidth}px`,
      maxHeight: `${at.maxHeight}px`,
      overflowY: 'auto',
    }
    : { position: 'fixed', visibility: 'hidden' }
  return { ...themeStyle.value, ...position }
})

function dismiss(): void {
  emit('update:open', false)
  emit('close')
}

/** Inside: this box, the anchor, or a popover opened from inside this one. */
function inside(target: Node): boolean {
  if (root.value?.contains(target) || props.anchor?.contains(target)) return true
  const after = stack.slice(stack.indexOf(me) + 1)
  return after.some((entry) => entry.root()?.contains(target))
}

function onPointerDown(event: PointerEvent): void {
  const target = event.target as Node | null
  if (target && !inside(target)) dismiss()
}

/*
 * Listened for on the way *down*, so it is heard before a dialog's own
 * Escape — which leaves an Escape that has been dealt with alone. Only the
 * popover on top answers.
 */
function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Escape' || event.defaultPrevented) return
  if (stack[stack.length - 1] !== me) return
  event.preventDefault()
  // The focus was in the box that is going: back to what opened it.
  if (root.value?.contains(document.activeElement)) props.anchor?.focus()
  dismiss()
}

let observer: ResizeObserver | null = null

async function rise(): Promise<void> {
  if (stack.includes(me)) return
  stack.push(me)
  adopt()
  placed.value = null
  await nextTick()
  place()
  window.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('keydown', onKeydown, true)
  window.addEventListener('resize', place)
  // Captured, so a scroll of any ancestor of the anchor moves it, not only the page's.
  window.addEventListener('scroll', place, true)
  if (typeof ResizeObserver !== 'undefined' && root.value) {
    observer = new ResizeObserver(() => place())
    observer.observe(root.value)
  }
}

function fall(): void {
  const at = stack.indexOf(me)
  if (at === -1) return
  stack.splice(at, 1)
  window.removeEventListener('pointerdown', onPointerDown, true)
  document.removeEventListener('keydown', onKeydown, true)
  window.removeEventListener('resize', place)
  window.removeEventListener('scroll', place, true)
  observer?.disconnect()
  observer = null
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

/* A popover whose anchor is swapped while it is up follows the new one. */
watch(() => props.anchor, () => {
  if (props.open) place()
})

onBeforeUnmount(fall)
</script>

<template>
  <Teleport
    v-if="open"
    :to="to"
  >
    <div
      ref="root"
      v-bind="$attrs"
      class="dc-shell dc-layer dc-popover"
      :data-dc-theme="theme"
      :data-dc-side="placed?.side"
      :style="style"
    >
      <slot />
    </div>
  </Teleport>
</template>

<style scoped>
/*
 * All of it at no weight, so a class of the host's on the box — a width, a
 * padding of its own — wins whichever sheet loads first. The surface is set
 * through `--dc-layer-bg` rather than as `background` for the same reason:
 * see `.dc-layer` in the tokens.
 */
:where(.dc-popover) {
  --dc-layer-bg: var(--dc-raised);

  z-index: 95;
  /* `.dc-shell *` reaches what is in it, not the box itself — and the widths
     set on it inline are of the whole box, border and all. */
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  box-shadow: var(--dc-shadow);
  overscroll-behavior: contain;
  animation: dc-pop-in 0.12s ease-out;
}
</style>
