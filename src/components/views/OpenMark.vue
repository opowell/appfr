<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'
import type { PresentedRow } from '../../composables/usePresentedRows'

/**
 * "Open where it lives" — offered on a row whose type says its records live
 * somewhere outside the shell ({@link EntitySchema.href}), where a press on
 * the row is not already the way there.
 *
 * Which is only where the press narrows: a type with a `scope`, under the
 * default `rowPress`. There the row's name is spent on narrowing to the
 * record, and the record's own page — a site, a page of the host's — needs a
 * press of its own. Everywhere else the name *is* the link (see `pressHref`),
 * and a second control for the same move would be the smaller one of two.
 *
 * A plain link, in a new tab: nothing of the shell's is done on the way, so
 * there is no press to intercept — the browser's own ways of opening a link
 * all work on it as they do anywhere — and a page elsewhere is a detour from
 * the query, not a step in it.
 */
const props = defineProps<{ entry: PresentedRow }>()

const shell = useShellContext()

const href = computed<string | null>(() => {
  const row = props.entry.row
  const away = shell.recordHref?.(row) ?? null
  if (!away) return null
  // Where the press already goes there, the name is the link.
  return shell.pressHref(row) === away ? null : away
})
</script>

<template>
  <a
    v-if="href"
    class="dc-open"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :title="href"
    :aria-label="`Open ${entry.parts.identity} in a new tab`"
    @click.stop
  >↗</a>
</template>

<style scoped>
/* The `→` beside it, drawn the same: a mark rather than a button. */
.dc-open {
  flex: 0 0 auto;
  padding: 2px 4px;
  color: var(--dc-fg-3);
  font-size: var(--dc-text-body);
  line-height: var(--dc-leading-flat);
  text-decoration: none;
  cursor: pointer;
}

.dc-open:hover,
.dc-open:focus-visible {
  color: var(--dc-accent);
}
</style>
