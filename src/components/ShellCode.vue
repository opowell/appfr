<script setup lang="ts">
/*
 * A block of code or machine text in a card: a spec's source, an error's
 * stack, a command line.
 *
 * What it adds over a bare `<pre>` is the three things every one of those
 * ended up needing by hand. A ceiling, so a 900-line source is a box that
 * scrolls rather than a card taller than the page — and one that keeps the
 * wheel to itself at its ends, so reading to the bottom of it does not start
 * scrolling the page under the pointer. A copy button, for the text that is
 * shown to be pasted somewhere else. And edges that know where they are: in a
 * `flush` card body the block *is* the body, so it draws no border or margin
 * of its own, while anywhere else it is an inset box.
 */
import { computed, ref } from 'vue'
import CopyButton from './CopyButton.vue'

const props = withDefaults(defineProps<{
  /** The text. The default slot gives it instead. */
  code?: string
  /**
   * The tallest the block grows before it scrolls in place — a CSS length,
   * or a number of pixels. Unbounded where left out.
   */
  maxHeight?: string | number
  /** Puts a copy button at the block's top right corner. */
  copy?: boolean
  /** What the copy button copies, for its tooltip and for a screen reader. */
  copyLabel?: string
  /**
   * Long lines wrap rather than scroll sideways — on by default, since most
   * of what lands here is read rather than lined up. Off for text whose
   * columns mean something.
   */
  wrap?: boolean
  /** `danger` for an error: a red rule down its side and a red tint. */
  tone?: 'danger'
}>(), {
  code: undefined,
  maxHeight: undefined,
  copyLabel: 'Copy to clipboard',
  wrap: true,
  tone: undefined,
})

const emit = defineEmits<{
  /** The copy button put the text on the clipboard. */
  copied: [text: string]
  /** The clipboard refused the copy — see `<CopyButton>`. */
  error: [error: unknown]
}>()

defineSlots<{
  /** The text, where it is not the `code` prop. */
  default?: () => unknown
}>()

const pre = ref<HTMLElement | null>(null)

const style = computed(() => {
  if (props.maxHeight === undefined) return undefined
  const height = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  return { maxHeight: height }
})

/** What the slot drew, read off the page at the press — it has no string of its own. */
function text(): string {
  return props.code ?? pre.value?.textContent ?? ''
}
</script>

<template>
  <div
    class="dc-code"
    :data-dc-copy="copy ? 'true' : 'false'"
    :data-dc-wrap="wrap ? 'true' : 'false'"
    :data-dc-tone="tone"
  >
    <pre
      ref="pre"
      class="dc-code__text dc-mono"
      :style="style"
    ><slot>{{ code }}</slot></pre>
    <CopyButton
      v-if="copy"
      class="dc-code__copy"
      :text="text"
      :label="copyLabel"
      @copied="emit('copied', $event)"
      @error="emit('error', $event)"
    />
  </div>
</template>

<style scoped>
/* The positioning box for the copy button, so the button stays at the
   corner while what is under it scrolls. */
.dc-code {
  position: relative;
  min-width: 0;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  background: var(--dc-bg-0);
  overflow: hidden;
}

/* In a flush body the block is the body: the card's own edges are its
   edges, and a border or a corner of its own would draw a second frame
   inside the first. Descended into, as a block often sits in a `<details>`
   that folds it. */
.dc-shell-card__body[data-dc-flush='true'] .dc-code {
  border: none;
  border-radius: 0;
}

.dc-code__text {
  margin: 0;
  padding: 14px 16px;
  font-size: var(--dc-text-code);
  line-height: var(--dc-leading-prose);
  color: var(--dc-fg-1);
  white-space: pre;
  overflow: auto;
  overscroll-behavior: contain;
}

.dc-code[data-dc-wrap='true'] .dc-code__text {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

/* Room at the right for the button, so the first line is not under it. */
.dc-code[data-dc-copy='true'] .dc-code__text {
  padding-right: 40px;
}

.dc-code__copy {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--dc-bg-0);
  color: var(--dc-fg-2);
}

/* The rule is a shadow rather than a border, so it is still there in a flush
   body, where the block's borders are not. */
.dc-code[data-dc-tone='danger'] {
  background: var(--dc-danger-bg);
  box-shadow: inset 2px 0 0 var(--dc-danger);
}

.dc-code[data-dc-tone='danger'] .dc-code__copy {
  background: var(--dc-danger-bg);
}
</style>
