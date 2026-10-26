<script setup lang="ts">
/*
 * The stack {@link useToasts} raises toasts on, drawn in the bottom right
 * corner. Mount it once, anywhere — at the root of the app is usual.
 *
 * Teleported to `body` for the same reasons a dialog is, and dressed the same
 * way: a `.dc-shell` of its own, in the theme of the shell it was written in
 * if it was written in one, or of its own `theme` and `tokens` props if not —
 * see {@link useLayerTheme}.
 *
 * The stack is a polite live region, there from the start rather than put up
 * with the first toast, since a region that appears with its message in it is
 * one a screen reader may never announce. An error is an alert, which is.
 */
import '../style/tokens.css'

import { onMounted } from 'vue'
import { useLayerTheme } from '../composables/useLayerTheme'
import { useToasts } from '../composables/useToasts'
import type { ShellTheme } from '../types'

const props = withDefaults(defineProps<{
  /** Where the stack is drawn. */
  to?: string | HTMLElement
  /** The theme, where it is not the shell's the stack is written in. */
  theme?: ShellTheme
  /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
  accent?: string
  /** Design tokens, over those of the shell the stack is written in. */
  tokens?: Record<string, string>
}>(), {
  to: 'body',
  theme: undefined,
  accent: undefined,
  tokens: undefined,
})

const { toasts } = useToasts()
const { theme, style, adopt } = useLayerTheme(props)

onMounted(adopt)
</script>

<template>
  <Teleport :to="to">
    <div
      class="dc-shell dc-layer dc-toasts"
      :data-dc-theme="theme"
      :style="style"
      aria-live="polite"
    >
      <div
        v-for="item in toasts"
        :key="item.id"
        class="dc-toast"
        :data-dc-kind="item.kind"
        :role="item.kind === 'err' ? 'alert' : undefined"
      >
        {{ item.message }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* `.dc-shell` for the palette, and none of its filling or painting: the
   stack is the size of its toasts, and passes a press anywhere else through
   to the page under it. */
.dc-toasts.dc-shell {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  max-width: calc(100vw - 32px);
  overflow: visible;
  container-type: normal;
  background: transparent;
  pointer-events: none;
}

.dc-toast {
  max-width: 420px;
  padding: 10px 14px;
  border: 1px solid var(--dc-line);
  border-left: 3px solid var(--dc-line-2);
  border-radius: var(--dc-radius);
  background: var(--dc-raised);
  color: var(--dc-raised-ink);
  box-shadow: var(--dc-shadow);
  font-size: var(--dc-text-body);
  overflow-wrap: anywhere;
  pointer-events: auto;
  animation: dc-pop-in 0.12s ease-out;
}

.dc-toast[data-dc-kind='ok'] {
  border-left-color: var(--dc-ok);
}

.dc-toast[data-dc-kind='err'] {
  border-left-color: var(--dc-danger);
}
</style>
