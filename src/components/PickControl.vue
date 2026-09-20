<script setup lang="ts">
/*
 * A choice among a few named things, drawn as the shell's own control rather
 * than as the browser's `<select>`.
 *
 * The browser's was the first draft, and it has one failing that matters
 * here: its list is the browser's window, not the page's, and the moment an
 * option under it is rewritten the browser takes the list down. The type
 * picker rewrites its options as a matter of course — it counts every type
 * against the query as it opens, and each count lands beside its name as the
 * source answers — so the list closed itself while the reader was looking at
 * it, and took the focus with it. This one is a button and a {@link MenuList},
 * which is the page's own: the items are keyed by what they stand for, so a
 * label that changes changes in place, and the list stays where it was.
 */
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import type { MenuAnchor, MenuItemDef } from '../menu/types'
import MenuList from './MenuList.vue'

export interface PickOption {
  key: string
  label: string
}

const props = defineProps<{
  modelValue: string
  options: PickOption[]
  /** Names the list for a screen reader — what the choice is *of*. */
  label: string
  /** Render in the monospace face, as the sort picker is. */
  mono?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  /**
   * The list has just gone up. What is in it may be worth refreshing at that
   * moment rather than watched — see {@link useEntityCounts}.
   */
  open: []
}>()

const uid = useId() ?? 'dc-pick'

const trigger = ref<HTMLButtonElement | null>(null)
const menu = ref<{ root: HTMLElement | null } | null>(null)
const anchor = ref<MenuAnchor | null>(null)
/** Set when the list was opened by a key, which also moves the focus into it. */
const byKey = ref(false)

const open = computed(() => anchor.value !== null)

/** What the button says: the chosen option's own label, as it stands now. */
const chosen = computed(
  () => props.options.find((option) => option.key === props.modelValue) ?? props.options[0],
)

/**
 * The options as the menu draws them. The key is the item's id, which is what
 * the menu keys its buttons by — so a label that changes while the list is up
 * is the same button saying something else, not a new button in its place.
 */
const items = computed<MenuItemDef[]>(() =>
  props.options.map((option) => ({
    id: option.key,
    label: option.label,
    checked: option.key === props.modelValue,
  })),
)

/**
 * How tall the list may be: the room under the button, less the margin the
 * menu keeps from the window's edge. Capped so that it scrolls rather than
 * grows — a list that does not fit is otherwise pushed up over the bar it
 * opened from, since the menu measures itself for a place to fit whole.
 */
const listStyle = computed(() =>
  anchor.value ? { maxHeight: `${window.innerHeight - anchor.value.y - 8}px` } : undefined,
)

function show(fromKey: boolean) {
  const box = trigger.value?.getBoundingClientRect()
  if (!box) return
  // Below the button, and mirrored to end at its right edge if it cannot fit.
  anchor.value = { x: box.left, y: box.bottom + 4, mirrorX: box.right }
  byKey.value = fromKey
  emit('open')
}

function hide(refocus: boolean) {
  anchor.value = null
  if (refocus) trigger.value?.focus()
}

function onClick() {
  if (open.value) hide(true)
  else show(false)
}

/** The arrow keys open the list with the focus already in it, as a select's do. */
function onKeydown(event: KeyboardEvent) {
  if ((event.key !== 'ArrowDown' && event.key !== 'ArrowUp') || open.value) return
  event.preventDefault()
  show(true)
}

/*
 * A press anywhere else takes the list down — on the way *down*, so the list
 * is gone before whatever was pressed acts. Measured against this button and
 * its own list, so a press on another picker's list closes this one.
 */
function onPointerDown(event: PointerEvent) {
  const target = event.target as Node | null
  if (!target) return
  if (trigger.value?.contains(target) || menu.value?.root?.contains(target)) return
  hide(false)
}

watch(open, (is) => {
  if (is) window.addEventListener('pointerdown', onPointerDown, true)
  else window.removeEventListener('pointerdown', onPointerDown, true)
})

onBeforeUnmount(() => window.removeEventListener('pointerdown', onPointerDown, true))

function choose(item: MenuItemDef) {
  hide(true)
  if (item.id === undefined || item.id === props.modelValue) return
  emit('update:modelValue', item.id)
}
</script>

<template>
  <span class="dc-pick">
    <!-- The button says the choice, not what it is a choice of: that is for
         anyone who cannot see it, and it comes first in the name — `Type,
         Searches · 38` — so a screen reader hears both. -->
    <span
      :id="`${uid}-name`"
      class="dc-pick__name"
    >{{ label }}</span>
    <button
      :id="`${uid}-value`"
      ref="trigger"
      type="button"
      class="dc-pick__button"
      :class="{ 'dc-mono': mono }"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-labelledby="`${uid}-name ${uid}-value`"
      :data-dc-value="modelValue"
      @click="onClick"
      @keydown="onKeydown"
    >
      <span class="dc-pick__label">{{ chosen?.label }}</span>
    </button>
    <span
      class="dc-pick__mark"
      aria-hidden="true"
    >▾</span>

    <MenuList
      v-if="anchor"
      ref="menu"
      class="dc-pick__list"
      :style="listStyle"
      :items="items"
      :at="anchor"
      :label="label"
      :autofocus="byKey"
      @choose="choose"
      @dismiss="hide(true)"
    />
  </span>
</template>

<style scoped>
.dc-pick {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* Read, not seen. */
.dc-pick__name {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/*
 * Drawn as the shell draws the rest of its controls, so that the pills beside
 * it and the box around it are recognisably one row of the same instrument.
 */
.dc-pick__button {
  display: inline-flex;
  align-items: center;
  max-width: 24ch;
  padding: 3px 20px 3px 8px;
  background: var(--dc-accent-bg);
  border: 1px solid var(--dc-accent-dim);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-accent);
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
}

.dc-pick__button:hover,
.dc-pick__button[aria-expanded='true'] {
  border-color: var(--dc-accent);
}

.dc-pick__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*
 * A list of types can be longer than the room under the button — a schema
 * with a couple of dozen of them, on a short screen. This one scrolls within
 * that room (`max-height`, set as the list goes up) rather than growing.
 */
.dc-pick__list {
  overflow-y: auto;
}

/* The mark that says there is a list behind the button. It belongs to the
   button, so it never takes the press that should open it. */
.dc-pick__mark {
  position: absolute;
  right: 7px;
  color: var(--dc-accent);
  font-size: var(--dc-text-eyebrow);
  line-height: 1;
  pointer-events: none;
}
</style>
