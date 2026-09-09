<script setup lang="ts">
import { computed } from 'vue'
import type { ShellRow } from '../../types'
import { useShellContext } from '../../composables/context'
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

/** Stops the click reaching the row, which would open the record instead. */
function narrow(event: MouseEvent) {
  event.stopPropagation()
  shell.drill(props.entry.row as ShellRow, null)
}
</script>

<template>
  <button
    v-if="scope"
    type="button"
    class="dc-scope"
    :title="`Narrow everything to ${scope}: ${entry.row.id}`"
    :aria-label="`Narrow everything to ${entry.parts.identity}`"
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

.dc-scope:hover {
  color: var(--dc-accent);
}
</style>
