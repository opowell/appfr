<script setup lang="ts">
/**
 * A card of the host's own, drawn as the shell draws a type's.
 *
 * The home screen is a card per type, and a shell that is *about* something —
 * one record, read across every type — usually has things to say that no type
 * holds: the record's own name, the form that acts on it, its metadata, its
 * source. Those go in the [`cards-before`](../../README.md#cards-of-your-own)
 * and `cards-after` slots, and they have to look like the cards they sit
 * among; the shell's own card chrome is scoped CSS a host cannot reach, so
 * this is that chrome as a component.
 *
 * Everything is a slot, because a card of the host's is the host's. The head
 * is a heading, an optional count beside it and whatever else the `aside` slot
 * puts at its right end; the body is the content; and the seams between them
 * are the card's, so a card with no head and a card with three sections both
 * come out right.
 *
 * A `collapsible` card folds to its head when the head is pressed — see
 * {@link toggle} for what a press on the head is and is not.
 */
import { Comment, Fragment, Text, computed, ref, useId } from 'vue'
import type { VNode } from 'vue'

const props = withDefaults(defineProps<{
  /** The card's heading. Left out where the `head` slot says it instead. */
  title?: string
  /**
   * The number beside the heading, as a type card carries its population.
   * A string, so it is formatted the way the host formats its own counts.
   */
  count?: string | number
  /**
   * Takes the whole width of the card grid, however many columns that is —
   * for the cards a share of a row would cut short: a record's own heading,
   * a block of source, a wide table.
   *
   * `'all'` is the only value, and deliberately: a card asking for *two* of
   * however many columns there are forces a second column into existence
   * when the grid has room for one, so a phone got two tracks of which the
   * second was 56px wide. `1 / -1` spans whatever is there and can never
   * add to it.
   */
  span?: 'all'
  /**
   * Drops the body's padding, for content that draws its own edges — a
   * table, a `<pre>`, a log pane.
   */
  flush?: boolean
  /**
   * Draws the card as the shell draws a type with nothing in it: present,
   * and quieter than the cards that hold something.
   */
  muted?: boolean
  /**
   * A press on the head folds the card to the head alone, and another opens
   * it again — for a page of cards the reader wants to put some of out of the
   * way without losing their place among the rest.
   *
   * Off unless asked for. A head is where a host puts its own controls, and a
   * card that started folding on every press of its head would be a card
   * whose head a host had to audit: off, nothing a host already has changes.
   */
  collapsible?: boolean
  /**
   * Whether the card is folded, for a host that owns that: bind
   * `v-model:collapsed` to remember it, or to fold every card at once. Left
   * unbound, the card holds it itself, starting from {@link defaultCollapsed}.
   */
  collapsed?: boolean
  /**
   * Whether a collapsible card starts folded, where nothing binds
   * `collapsed` — the card then holds the state itself, from here.
   */
  defaultCollapsed?: boolean
}>(), {
  /*
   * `undefined` rather than `false` when nothing is bound, which is how the
   * card tells the two apart: Vue casts an absent boolean prop to `false`
   * unless it is given a default, and that would make every card a
   * controlled one that nobody is controlling.
   */
  collapsed: undefined,
})

const emit = defineEmits<{
  /** The head was pressed: the card folded, or asks to where it is bound. */
  'update:collapsed': [collapsed: boolean]
}>()

/** The card's own state, for when nothing binds `collapsed`. */
const own = ref(props.defaultCollapsed === true)

/** Stated as a line range, the only way to say "however many there are". */
const style = computed(() => (props.span === 'all' ? { gridColumn: '1 / -1' } : undefined))

const slots = defineSlots<{
  /** The whole head, replacing the title and count. */
  head?: () => unknown
  /** The right end of the head — a link, a badge, a button. */
  aside?: () => unknown
  /** The card's content. */
  default?: () => unknown
  /** A row under the content, drawn as the type card's own button is. */
  foot?: () => unknown
}>()

/**
 * Whether a slot actually draws anything.
 *
 * A slot that was passed and renders nothing is the common case here, not an
 * odd one: a card's body is a `v-if` over a warning that is usually not there,
 * and its head's aside is a set of controls that appear once the record has
 * loaded. Rendered as a strip either way, that is an empty band with a hairline
 * over it — a section of the card that says nothing.
 *
 * So the slot is called and its result read: a comment is what a `v-if` leaves
 * behind, whitespace is what the template's own indentation leaves, and a
 * fragment is what a `v-for` or a bare `<template>` wraps its children in.
 */
function filled(slot?: () => unknown): boolean {
  return drawn((slot?.() ?? []) as VNode[])
}

function drawn(nodes: VNode[]): boolean {
  return nodes.some((node) => {
    if (node.type === Comment) return false
    if (node.type === Text) return String(node.children ?? '').trim().length > 0
    if (node.type === Fragment) return drawn((node.children ?? []) as VNode[])
    return true
  })
}

const hasHead = computed(() => Boolean(props.title) || hasAside.value || filled(slots.head))
const hasAside = computed(() => filled(slots.aside))
const hasBody = computed(() => filled(slots.default))
const hasFoot = computed(() => filled(slots.foot))

/* ---------------------------------------------------------------- folding */

/**
 * Whether the card folds at all. A head is what it folds to and what is
 * pressed to unfold it, so a card without one does not fold whatever it was
 * asked: folded, it would be a hairline with no way back out.
 */
const foldable = computed(() => props.collapsible === true && hasHead.value)

/** Folded right now: the head alone on screen. */
const shut = computed(() => foldable.value && (props.collapsed ?? own.value))

function toggle(): void {
  const next = !shut.value
  own.value = next
  emit('update:collapsed', next)
}

const id = useId() ?? 'dc-shell-card'
const bodyId = `${id}-body`
const footId = `${id}-foot`

/** What the toggle folds away, for `aria-controls`: the parts there are. */
const controls = computed(() =>
  [hasBody.value ? bodyId : '', hasFoot.value ? footId : ''].filter(Boolean).join(' ') ||
  undefined,
)

/**
 * Anything in a head that does something of its own when it is pressed. The
 * head is the host's — a link to the record, a button that acts on it, a
 * field — and a press on one of those is for that, not for the card.
 */
const INTERACTIVE = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  'summary',
  '[contenteditable]:not([contenteditable="false"])',
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="switch"]',
  '[role="tab"]',
  '[role="menuitem"]',
].join(', ')

const head = ref<HTMLElement | null>(null)

/**
 * A press on the head folds or unfolds the card.
 *
 * The head is the toggle's *surface* rather than the toggle itself, as the
 * shell's own header bar is, and for the same reason: a host's head holds
 * controls of its own, and a button cannot hold another. So a press that
 * landed on one of them belongs to it and stops there — only within the head,
 * since a card sitting inside something pressable is not inside its own
 * control — and the chevron is a real button carrying what the surface does
 * for anyone not using a pointer. The chevron's own press is one of those
 * controls too, which is what keeps it from toggling twice.
 *
 * Nor is a drag across the title to copy it a press on the card: the click
 * that ends one arrives with the text selected, and folding the card under
 * the selection would take the text away mid-copy.
 */
function pressHead(event: MouseEvent): void {
  if (!foldable.value) return
  const hit = (event.target as HTMLElement | null)?.closest(INTERACTIVE)
  if (hit && head.value?.contains(hit)) return
  if (typeof window !== 'undefined' && window.getSelection()?.toString()) return
  toggle()
}
</script>

<template>
  <section
    class="dc-shell-card"
    :style="style"
    :data-dc-muted="muted ? 'true' : 'false'"
    :data-dc-collapsed="shut ? 'true' : 'false'"
  >
    <header
      v-if="hasHead"
      ref="head"
      class="dc-shell-card__head"
      :data-dc-collapsible="foldable ? 'true' : 'false'"
      @click="pressHead"
    >
      <!-- What the surface does, for anyone not using a pointer, and the mark
           that says the card folds at all. First, where a disclosure's mark
           is looked for, and named for the card it folds. -->
      <button
        v-if="foldable"
        type="button"
        class="dc-shell-card__toggle"
        :aria-expanded="shut ? 'false' : 'true'"
        :aria-controls="controls"
        @click="toggle"
      >
        <svg
          class="dc-shell-card__chevron"
          viewBox="0 0 10 10"
          aria-hidden="true"
        ><path d="M2 3.5 5 6.5 8 3.5" /></svg>
        <span class="dc-shell-card__sr">{{ title || 'Card' }}</span>
      </button>
      <slot name="head">
        <h2 class="dc-shell-card__title">
          {{ title }}
        </h2>
        <span
          v-if="count !== undefined"
          class="dc-shell-card__count dc-mono"
        >{{ count }}</span>
      </slot>
      <span
        v-if="hasAside"
        class="dc-shell-card__aside"
      >
        <slot name="aside" />
      </span>
    </header>

    <!-- Folded away rather than taken out, so what a host put in here keeps
         its own state — a half-filled form, a log scrolled to where it was
         being read — for when the card is opened again. -->
    <div
      v-if="hasBody"
      v-show="!shut"
      :id="bodyId"
      class="dc-shell-card__body"
      :data-dc-flush="flush ? 'true' : 'false'"
    >
      <slot />
    </div>

    <footer
      v-if="hasFoot"
      v-show="!shut"
      :id="footId"
      class="dc-shell-card__foot"
    >
      <slot name="foot" />
    </footer>
  </section>
</template>

<style scoped>
.dc-shell-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--dc-bg-1);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  overflow: hidden;
}

.dc-shell-card[data-dc-muted='true'] {
  opacity: 0.7;
}

/* Every seam in the card, from one rule — the same way a type card draws its
   own: between the children rather than under each of them, so whichever of
   them is last has nothing under it however the card is made up. */
.dc-shell-card > * + * {
  border-top: 1px solid var(--dc-line);
}

.dc-shell-card__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 14px 16px;
}

/* The whole head lights up, because the whole head folds the card — except
   while the pointer is over the aside, whose controls are their own. */
.dc-shell-card__head[data-dc-collapsible='true'] {
  cursor: pointer;
}

.dc-shell-card__head[data-dc-collapsible='true']:hover:not(:has(.dc-shell-card__aside:hover)) {
  background: var(--dc-bg-2);
}

/* Folded, a card is its head and nothing under it — and that is all the
   height it takes, rather than stretching to the row of open cards beside it
   and leaving the room it gave up as a blank card. */
.dc-shell-card[data-dc-collapsed='true'] {
  align-self: start;
}

.dc-shell-card__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  align-self: center;
  width: 18px;
  height: 18px;
  margin: 0 -4px 0 -6px;
  padding: 0;
  border: none;
  border-radius: var(--dc-radius-sm);
  background: transparent;
  color: var(--dc-fg-2);
  cursor: pointer;
}

/* Drawn rather than set as a glyph: a triangle out of the font comes out at
   whatever size and on whatever baseline that font gives it, and the shell is
   set in the host's font as often as its own. */
.dc-shell-card__chevron {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.12s ease-out;
}

/* Pointing along the head when folded, down into the body when open — the
   way a disclosure's mark has always said which of the two it is. */
.dc-shell-card[data-dc-collapsed='true'] .dc-shell-card__chevron {
  transform: rotate(-90deg);
}

@media (prefers-reduced-motion: reduce) {
  .dc-shell-card__chevron {
    transition: none;
  }
}

.dc-shell-card__sr {
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

.dc-shell-card__title {
  margin: 0;
  font-size: var(--dc-text-title);
  font-weight: var(--dc-weight-semibold);
  letter-spacing: var(--dc-tracking-tight);
  color: var(--dc-fg-0);
}

.dc-shell-card__count {
  font-size: var(--dc-text-meta);
  color: var(--dc-fg-3);
}

/* Pushed to the right end of the head, and free to be anything: the head's
   own words are laid out on the baseline, so a control here centres itself. */
.dc-shell-card__aside {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  align-self: center;
  min-width: 0;
}

.dc-shell-card__body {
  padding: 14px 16px;
  min-width: 0;
  font-size: var(--dc-text-body);
  color: var(--dc-fg-1);
}

/* Content that draws its own edges: a table to the card's borders, a log pane
   to its corners. The card keeps the seam above it either way. */
.dc-shell-card__body[data-dc-flush='true'] {
  padding: 0;
  overflow: auto;
}

.dc-shell-card__foot {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
}
</style>
