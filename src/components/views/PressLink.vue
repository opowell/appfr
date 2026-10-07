<script setup lang="ts">
import type { PressOptions } from '../../types'
import { isBrowserPress, pressOptions } from '../../query/drill'

/**
 * A press that leads somewhere, as a real link.
 *
 * With an `href` it is an `<a>`, so everything the browser does with a link
 * it does with this one: ⌘/Ctrl-click opens it in a new tab, ⇧-click in a new
 * window, a middle click in a background tab, and the context menu offers to
 * copy it. A plain click — and one with ⌥ held — is the shell's: the default
 * is stopped and `press` is emitted with the {@link pressOptions} it carried,
 * so the shell navigates in place as it always did.
 *
 * Without an `href` there is nowhere for a link to go — the press is reported
 * to the host rather than applied — so it is a button, as before.
 */

const props = defineProps<{ href?: string | null }>()

const emit = defineEmits<{ press: [options: PressOptions, event: MouseEvent] }>()

function click(event: MouseEvent) {
  if (props.href && isBrowserPress(event)) {
    // The browser's: it opens the link elsewhere, and this screen stays put.
    event.stopPropagation()
    return
  }
  event.preventDefault()
  emit('press', pressOptions(event), event)
}
</script>

<template>
  <a
    v-if="href"
    :href="href"
    class="dc-press"
    @click="click"
  ><slot /></a>
  <button
    v-else
    type="button"
    class="dc-press"
    @click="click"
  >
    <slot />
  </button>
</template>

<style scoped>
/*
 * A link laid out as the button it replaced: `:where()` keeps these at no
 * specificity, so whatever the view says about its own class wins.
 */
:where(a.dc-press) {
  display: inline-block;
  cursor: pointer;
}
</style>

<style>
/*
 * What a host's own link styles would otherwise put on these — `a { color }`
 * and `a:hover { text-decoration: underline }` are in nearly every page — undone.
 *
 * Global and exactly this specific on purpose: `html a.dc-press` (0,1,2) beats
 * a host's `a` and `a:hover` (0,1,1), and loses to every rule a view scopes
 * to its own class (0,2,0 and up) — so a metric keeps its dotted underline and
 * its hover colour, and a type's name stops turning into a hover-underlined
 * link the moment it became one.
 */
html a.dc-press {
  color: inherit;
  text-decoration: none;
}
</style>
