<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import type { ShellRow } from '../../types'
import { useShellContext } from '../../composables/context'
import { pressOptions } from '../../query/drill'
import type { PresentedRow } from '../../composables/usePresentedRows'

/**
 * "Narrow to this one" — offered on a row whose entity declares `scope`, which
 * is the entity saying that every other record names this one.
 *
 * The arrow is the same mark the home screen's card headers wear for narrowing
 * to a type, so the gesture reads the same at both scales: there it is "only
 * tenants", here it is "only this tenant". Opening the record is still the
 * name beside it — this is the other half of a row, not a second way in.
 *
 * Which is why it is not there at all where a press on the row *is* the
 * narrowing (`rowPress: 'narrow'`, the default): the row and the arrow would
 * be two controls for one move, and the smaller of them the harder to hit.
 */
const props = defineProps<{ entry: PresentedRow }>()

const shell = useShellContext()

/** The field the other records carry this one's id in — null when unscopable. */
const scope = computed<string | null>(() =>
  shell.narrowsOnPress.value ? null : (props.entry.entity?.scope ?? null),
)

/**
 * Which way the press under the pointer would go — `in` narrows to the
 * record, `out` leaves it out — and null while nothing is over the mark.
 *
 * The same press means two things depending on a key, and the mark says
 * which before it is made, in the colours the `+` and `−` beside it wear
 * afterwards. The key is read off the pointer as it arrives and moves, and
 * off the keyboard while the pointer stays, so pressing ⌘ over a still mark
 * turns it red without a nudge.
 */
const pending = ref<'in' | 'out' | null>(null)

function read(event: MouseEvent | KeyboardEvent) {
  pending.value = pressOptions(event).exclude ? 'out' : 'in'
}

function enter(event: MouseEvent) {
  read(event)
  window.addEventListener('keydown', read)
  window.addEventListener('keyup', read)
}

function leave() {
  pending.value = null
  window.removeEventListener('keydown', read)
  window.removeEventListener('keyup', read)
}

onBeforeUnmount(leave)

/** Stops the click reaching the row, which would open the record instead. */
function narrow(event: MouseEvent) {
  event.stopPropagation()
  shell.drill(props.entry.row as ShellRow, null, pressOptions(event))
}
</script>

<template>
  <button
    v-if="scope"
    type="button"
    class="dc-scope"
    :data-dc-pending="pending ?? undefined"
    :title="`Narrow everything to ${scope}: ${entry.row.id} — ⌘-click to leave it out`"
    :aria-label="`Narrow everything to ${entry.parts.identity}`"
    @pointerenter="enter"
    @pointermove="read"
    @pointerleave="leave"
    @click="narrow"
  >
    →
  </button>
</template>

<style scoped>
.dc-scope {
  flex: 0 0 auto;
  padding: 2px 4px;
  border: none;
  background: transparent;
  color: var(--dc-fg-3);
  font-size: var(--dc-text-body);
  line-height: var(--dc-leading-flat);
  cursor: pointer;
}

/* The colour of the mark the press would leave behind: green for the `+` a
   narrowing puts on the row, red for the `−` a ⌘-press does. */
.dc-scope[data-dc-pending='in'] {
  color: var(--dc-ok);
}

.dc-scope[data-dc-pending='out'] {
  color: var(--dc-danger);
}

.dc-scope:focus-visible {
  color: var(--dc-accent);
}
</style>
