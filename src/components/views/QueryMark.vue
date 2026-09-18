<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'
import { liftTerm, scopeTerm, termStanding } from '../../query/drill'
import type { PresentedRow } from '../../composables/usePresentedRows'

/**
 * Where the query stands on this record: a `+` where it narrows to it, a `−`
 * where it leaves it out, and nothing at all for the rows — nearly all of
 * them — the query says nothing about.
 *
 * A list of a type does not apply the term on its own scope to itself, so a
 * categories table narrowed to one category lists every category, and this
 * is what says which. Pressing it lifts the term, whichever way round it was
 * said: the record goes back to being one the query does not mention, and
 * the screen stays where it is. Adding the term is the row's own press, or
 * the `→` beside it, and is not repeated here.
 */
const props = defineProps<{ entry: PresentedRow }>()

const shell = useShellContext()

/** The term that would name this record, or null where nothing could. */
const term = computed(() => scopeTerm(props.entry.entity, props.entry.row))

const standing = computed(() => termStanding(shell.query.value.expr, term.value))

const hint = computed(() =>
  standing.value === 'in'
    ? `The query narrows to ${props.entry.parts.identity} — press to lift that`
    : `The query leaves out ${props.entry.parts.identity} — press to lift that`,
)

/** Stops the click reaching the row, which would open or narrow to the record instead. */
function lift(event: MouseEvent) {
  event.stopPropagation()
  shell.setExpression(liftTerm(shell.query.value.expr, term.value))
}
</script>

<template>
  <button
    v-if="standing"
    type="button"
    class="dc-standing"
    :data-dc-standing="standing"
    :title="hint"
    :aria-label="hint"
    @click="lift"
  >
    {{ standing === 'in' ? '+' : '−' }}
  </button>
</template>

<style scoped>
/* The sign of the term as the bar draws it, in the colour a state pill gives
   that sign; a box round it so it reads as a control and not as part of the
   name it sits beside. */
.dc-standing {
  flex: 0 0 auto;
  min-width: 1.4em;
  padding: 0 4px;
  border: 1px solid currentColor;
  border-radius: var(--dc-radius-sm);
  background: transparent;
  font-size: var(--dc-text-meta);
  font-weight: var(--dc-weight-semibold);
  line-height: var(--dc-leading-flat);
  text-align: center;
  cursor: pointer;
}

.dc-standing[data-dc-standing='in'] {
  color: var(--dc-ok);
  background: var(--dc-ok-bg);
}

.dc-standing[data-dc-standing='out'] {
  color: var(--dc-danger);
  background: var(--dc-danger-bg);
}

.dc-standing:hover {
  color: var(--dc-fg-0);
}
</style>
