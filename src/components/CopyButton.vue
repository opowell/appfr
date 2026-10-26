<script setup lang="ts">
/*
 * Puts a piece of text on the clipboard, and says so in place.
 *
 * For the text a card shows in order to be pasted somewhere else — a run's
 * command line, which for a run of many specs is thousands of characters in a
 * box that scrolls, and so is not something anyone selects by hand. The tick
 * is the confirmation: a toast would say the same thing from the far corner
 * of the screen, and the eye is on the button.
 *
 * A clipboard that refuses — an insecure origin, a permission denied — is
 * reported with `error` rather than shown, because how a failure is told is
 * the host's: a toast, a line under the field, nothing.
 */
import { onBeforeUnmount, ref } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * What is copied. A function where the text is only known at the moment of
   * the press — what a block of code holds in its slot, read off the page.
   */
  text: string | (() => string)
  /** What the button copies, for its tooltip and for a screen reader. */
  label?: string
}>(), {
  label: 'Copy to clipboard',
})

const emit = defineEmits<{
  /** The text is on the clipboard. */
  copied: [text: string]
  /** The clipboard refused it, or there is no clipboard to ask. */
  error: [error: unknown]
}>()

/** How long the tick stays, in milliseconds: long enough to be seen. */
const CONFIRM_MS = 1500

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy(): Promise<void> {
  const text = typeof props.text === 'function' ? props.text() : props.text
  try {
    if (!navigator.clipboard) throw new Error('The clipboard is not available here')
    await navigator.clipboard.writeText(text)
  } catch (error) {
    emit('error', error)
    return
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    copied.value = false
  }, CONFIRM_MS)
  emit('copied', text)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <button
    type="button"
    class="dc-copy"
    :data-dc-copied="copied ? 'true' : 'false'"
    :title="copied ? 'Copied' : label"
    :aria-label="label"
    @click="copy"
  >
    <!-- Two sheets, one over the other: the usual mark for "copy", and a
         tick once it has. Drawn, so it takes the button's colour. -->
    <svg
      v-if="!copied"
      class="dc-copy__mark"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <rect
        x="5.5"
        y="5.5"
        width="8"
        height="9"
        rx="1.5"
      />
      <path d="M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" />
    </svg>
    <svg
      v-else
      class="dc-copy__mark"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  </button>
</template>

<style scoped>
.dc-copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 3px;
  border: none;
  border-radius: var(--dc-radius-sm);
  background: none;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  vertical-align: middle;
}

.dc-copy:hover,
.dc-copy:focus-visible {
  opacity: 1;
}

.dc-copy[data-dc-copied='true'] {
  color: var(--dc-ok);
  opacity: 1;
}

.dc-copy__mark {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
