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
 */
import { Comment, Fragment, Text, computed } from 'vue'
import type { VNode } from 'vue'

const props = defineProps<{
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
}>()

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
</script>

<template>
  <section
    class="dc-shell-card"
    :style="style"
    :data-dc-muted="muted ? 'true' : 'false'"
  >
    <header
      v-if="hasHead"
      class="dc-shell-card__head"
    >
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

    <div
      v-if="hasBody"
      class="dc-shell-card__body"
      :data-dc-flush="flush ? 'true' : 'false'"
    >
      <slot />
    </div>

    <footer
      v-if="hasFoot"
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
