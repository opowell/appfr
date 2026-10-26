<script setup lang="ts">
/*
 * A record's status, as a pill — and, given a `tone` or a `label`, any short
 * word that wants the same treatment: `crawler-generated`, `live — no
 * profile`, a run's `passed`. Those are not statuses a row is in, so they get
 * a colour named for what it means rather than a status they would be
 * pretending to be.
 *
 * With only `status`, the pill is exactly what it always was — the status in
 * its own words, coloured by it, and not one attribute more — so nothing a
 * host already draws changes.
 */
import { computed } from 'vue'
import type { PillTone, RecordStatus } from '../types'

/*
 * One of the three is enough to say something, and nothing at all is a pill
 * with no words in it — so `status` may be left out only where a `tone` or a
 * `label` stands in for it.
 */
type Props =
  | {
    /** The status, which is both the pill's words and its colour. */
    status: RecordStatus
    tone?: PillTone
    label?: string
  }
  | {
    status?: RecordStatus
    /**
     * The colour, chosen outright: a status's own, `neutral` for none, or
     * `accent` for the shell's. Wins over `status` where both are given.
     */
    tone: PillTone
    label?: string
  }
  | {
    status?: RecordStatus
    tone?: PillTone
    /** The words, in place of the status's own. */
    label: string
  }

const props = defineProps<Props>()

const words = computed(() => props.label ?? props.status ?? '')
</script>

<template>
  <span
    class="dc-pill"
    :data-dc-status="status"
    :data-dc-tone="tone"
  >{{ words }}</span>
</template>

<style scoped>
.dc-pill {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: var(--dc-text-micro);
  font-weight: var(--dc-weight-semibold);
  white-space: nowrap;
  background: var(--dc-bg-2);
  color: var(--dc-fg-2);
}

.dc-pill[data-dc-status='ok'] {
  background: var(--dc-ok-bg);
  color: var(--dc-ok);
}

.dc-pill[data-dc-status='running'] {
  background: var(--dc-accent-bg);
  color: var(--dc-accent);
}

.dc-pill[data-dc-status='review'] {
  background: var(--dc-warn-bg);
  color: var(--dc-warn);
}

.dc-pill[data-dc-status='failed'] {
  background: var(--dc-danger-bg);
  color: var(--dc-danger);
}

/*
 * The tones, after the statuses and at the same weight, so a tone given
 * beside a status is the one that shows. `neutral` and `queued` say so
 * outright rather than leaving it to the base rule, which a status's colour
 * above would otherwise outrank.
 */
.dc-pill[data-dc-tone='neutral'],
.dc-pill[data-dc-tone='queued'] {
  background: var(--dc-bg-2);
  color: var(--dc-fg-2);
}

.dc-pill[data-dc-tone='ok'] {
  background: var(--dc-ok-bg);
  color: var(--dc-ok);
}

.dc-pill[data-dc-tone='running'],
.dc-pill[data-dc-tone='accent'] {
  background: var(--dc-accent-bg);
  color: var(--dc-accent);
}

.dc-pill[data-dc-tone='review'] {
  background: var(--dc-warn-bg);
  color: var(--dc-warn);
}

.dc-pill[data-dc-tone='failed'] {
  background: var(--dc-danger-bg);
  color: var(--dc-danger);
}
</style>
