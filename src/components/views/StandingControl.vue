<script setup lang="ts">
import { computed } from 'vue'
import type { TermStanding } from '../../query/drill'

/**
 * Where the query stands on a record, as a thing to set: `+` narrows to it,
 * `−` leaves it out, and the dot between them says nothing about it — which
 * is where nearly every record of nearly every query stands.
 *
 * One control drawn in two places: on every row of a table whose type can be
 * named, and at the head of that column, where the same three presses reach
 * every row on the page at once — or the ticked ones, where any are. The
 * head's `standing` is then what those rows agree on, and `mixed` where they
 * do not, in which case none of the three is lit.
 */
const props = defineProps<{
  standing: TermStanding | null
  /** The rows this speaks for do not all stand the same way. */
  mixed?: boolean
  /** What the record, or the rows, are called — for the three hints. */
  name: string
}>()

const emit = defineEmits<{ set: [standing: TermStanding | null] }>()

interface Choice {
  standing: TermStanding | null
  sign: string
  hint: string
}

const choices = computed<Choice[]>(() => [
  { standing: 'in', sign: '+', hint: `Narrow the query to ${props.name}` },
  { standing: null, sign: '·', hint: `Let the query say nothing about ${props.name}` },
  { standing: 'out', sign: '−', hint: `Leave ${props.name} out of the query` },
])

const lit = (standing: TermStanding | null) => !props.mixed && props.standing === standing

/** Stops the click reaching the row, which would open or narrow to the record instead. */
function choose(event: MouseEvent, standing: TermStanding | null) {
  event.stopPropagation()
  emit('set', standing)
}
</script>

<template>
  <span
    class="dc-standing-control"
    role="radiogroup"
    :aria-label="`Where the query stands on ${name}`"
  >
    <button
      v-for="choice in choices"
      :key="choice.sign"
      type="button"
      role="radio"
      class="dc-standing-control__choice"
      :data-dc-standing="choice.standing ?? 'none'"
      :data-dc-active="lit(choice.standing) ? 'true' : 'false'"
      :aria-checked="lit(choice.standing)"
      :title="choice.hint"
      :aria-label="choice.hint"
      @click="choose($event, choice.standing)"
    >
      {{ choice.sign }}
    </button>
  </span>
</template>

<style scoped>
/* Three signs in one box, so the row reads as a choice among them rather
   than three buttons that happen to sit together. */
.dc-standing-control {
  display: inline-flex;
  flex: 0 0 auto;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  background: var(--dc-bg-0);
  line-height: var(--dc-leading-flat);
  vertical-align: middle;
}

.dc-standing-control__choice {
  min-width: 1.5em;
  padding: 1px 3px;
  border: none;
  background: transparent;
  color: var(--dc-fg-3);
  font-size: var(--dc-text-meta);
  font-weight: var(--dc-weight-semibold);
  text-align: center;
  cursor: pointer;
}

.dc-standing-control__choice + .dc-standing-control__choice {
  border-left: 1px solid var(--dc-line);
}

/* The sign lit in the colour the query's own pills give it, and — under the
   pointer — in that colour before it is, so the press says which way it goes. */
.dc-standing-control__choice[data-dc-standing='in']:hover,
.dc-standing-control__choice[data-dc-standing='in']:focus-visible,
.dc-standing-control__choice[data-dc-standing='in'][data-dc-active='true'] {
  color: var(--dc-ok);
}

.dc-standing-control__choice[data-dc-standing='out']:hover,
.dc-standing-control__choice[data-dc-standing='out']:focus-visible,
.dc-standing-control__choice[data-dc-standing='out'][data-dc-active='true'] {
  color: var(--dc-danger);
}

.dc-standing-control__choice[data-dc-standing='none']:hover,
.dc-standing-control__choice[data-dc-standing='none']:focus-visible,
.dc-standing-control__choice[data-dc-standing='none'][data-dc-active='true'] {
  color: var(--dc-fg-1);
}

.dc-standing-control__choice[data-dc-standing='in'][data-dc-active='true'] {
  background: var(--dc-ok-bg);
}

.dc-standing-control__choice[data-dc-standing='out'][data-dc-active='true'] {
  background: var(--dc-danger-bg);
}

.dc-standing-control__choice[data-dc-standing='none'][data-dc-active='true'] {
  background: var(--dc-bg-2);
}
</style>
