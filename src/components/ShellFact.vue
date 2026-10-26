<script setup lang="ts">
/*
 * One fact in a {@link ShellFacts} grid: a label over a value.
 *
 * A component rather than markup a host writes, because a definition list's
 * shape is easy to get subtly wrong — a `dd` without its `dt`, or a pair not
 * wrapped in the `div` that makes it one cell of the grid — and every one of
 * those comes out as a grid whose labels and values drift apart.
 *
 * The value is a slot as well as a prop, since what a fact holds is as often
 * a list of links or a block of code as a word; the label is too, for the one
 * that carries a control of its own beside it — a copy button by "Command".
 */
import { computed } from 'vue'
import { EMPTY_CELL } from '../query/columns'
import type { ShellFactValue } from '../types'

const props = defineProps<{
  /** What the value is. The `label` slot says it instead where given. */
  label?: string
  /**
   * The value, where it is text. A list is a line per entry — the URLs a
   * spec recorded, the files a profile holds — and nothing at all, an empty
   * string or an empty list is the shell's dash, so a fact that is absent
   * still says so. The default slot replaces it.
   */
  value?: ShellFactValue
  /** The value's tooltip — the exact figure behind a rounded one, say. */
  title?: string
  /**
   * Takes a whole row of the grid — for a value a column would wrap into a
   * paragraph: a command line, a sentence.
   */
  wide?: boolean
}>()

defineSlots<{
  /** The label, where it is more than words. */
  label?: () => unknown
  /** The value, where it is more than text. */
  default?: () => unknown
}>()

/** The value as the lines it is drawn in. */
const lines = computed<string[]>(() => {
  const value = props.value
  if (value === null || value === undefined || value === '') return [EMPTY_CELL]
  if (Array.isArray(value)) {
    const listed = value.filter((entry) => entry !== null && entry !== undefined && entry !== '')
    return listed.length ? listed.map(String) : [EMPTY_CELL]
  }
  return [String(value)]
})

/** Stated as a line range, as a wide card is: "however many columns there are". */
const style = computed(() => (props.wide ? { gridColumn: '1 / -1' } : undefined))
</script>

<template>
  <div
    class="dc-fact"
    :style="style"
  >
    <dt class="dc-fact__label">
      <slot name="label">
        {{ label }}
      </slot>
    </dt>
    <dd
      class="dc-fact__value dc-mono"
      :title="title"
    >
      <slot>
        <template v-if="lines.length === 1">
          {{ lines[0] }}
        </template>
        <span
          v-for="(line, index) in lines"
          v-else
          :key="index"
          class="dc-fact__line"
        >{{ line }}</span>
      </slot>
    </dd>
  </div>
</template>

<style scoped>
.dc-fact {
  min-width: 0;
}

/* A label is small and quiet, in the caps a theme sets its small labels in —
   which the minimal theme sets in none. The row is a flex one so a control
   beside the words, a copy button, sits on their line. */
.dc-fact__label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-2);
  text-transform: var(--dc-caps);
  letter-spacing: var(--dc-tracking-caps);
}

/* Values are mono: most of them are dates, ids, paths and counts, which
   line up and read better in it. A path has nowhere to break, so it may
   break anywhere rather than run out of its cell. */
.dc-fact__value {
  margin: 2px 0 0;
  min-width: 0;
  font-size: var(--dc-text-meta);
  color: var(--dc-fg-1);
  overflow-wrap: anywhere;
}

/* A line per entry, and the same for a list of links in the slot. */
.dc-fact__line,
.dc-fact__value > :deep(a) {
  display: block;
}
</style>
