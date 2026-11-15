<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'
import { standingTerm, termStanding, withStanding } from '../../query/drill'
import type { TermStanding } from '../../query/drill'
import type { PresentedRow } from '../../composables/usePresentedRows'
import StandingControl from './StandingControl.vue'

/**
 * The table's `+ · −` on one row of a list or a card: where the query stands
 * on this record, as a thing to set.
 *
 * It is the way to leave a record out — or take it back — without knowing a
 * key for it: ⌥-click does the same from the row's name, but a modifier nobody
 * has been told about is a feature nobody finds. And it says where the query
 * stands as it does, the lit sign being the mark a row the query names wears.
 *
 * Nothing for a row of a type that declares no scope, as no term can name
 * it, or that says `standing: false`.
 */
const props = defineProps<{ entry: PresentedRow }>()

const shell = useShellContext()

const term = computed(() => standingTerm(props.entry.entity, props.entry.row))

const standing = computed(() => termStanding(shell.query.value.expr, term.value))

function set(next: TermStanding | null) {
  shell.setExpression(withStanding(shell.query.value.expr, term.value, next))
}
</script>

<template>
  <StandingControl
    v-if="term !== null"
    class="dc-row-standing"
    :standing="standing"
    :name="entry.parts.identity"
    @set="set"
  />
</template>
