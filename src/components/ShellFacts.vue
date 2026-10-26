<script setup lang="ts">
/*
 * A record's facts, as a grid of labels over values — the metadata a page
 * about one record shows beside what can be done with it.
 *
 * As many columns as fit at a minimum width, rather than a number of them,
 * because the grid sits in a card whose width is the card grid's business: a
 * full-width card on a desktop holds five, the same card on a phone one, and
 * neither should have to say so.
 *
 * The facts come as `items` where they are text, which is most of them, and
 * as `<ShellFact>` children where one is more — a list of links, a block of
 * code with a copy button on its label. Both may be given; the items come
 * first.
 */
import { computed } from 'vue'
import ShellFact from './ShellFact.vue'
import type { ShellFactItem } from '../types'

const props = withDefaults(defineProps<{
  /** The facts that are text, in order. */
  items?: ShellFactItem[]
  /**
   * The narrowest a column may be before the grid drops one — any CSS
   * length. Wide enough for a date and time with its label above.
   */
  min?: string
}>(), {
  items: () => [],
  min: '200px',
})

defineSlots<{
  /** `<ShellFact>` children, after the items. */
  default?: () => unknown
}>()

const style = computed(() => ({ '--dc-facts-min': props.min }))
</script>

<template>
  <dl
    class="dc-facts"
    :style="style"
  >
    <ShellFact
      v-for="(item, index) in items"
      :key="`${index}:${item.label}`"
      :label="item.label"
      :value="item.value"
      :title="item.title"
      :wide="item.wide"
    />
    <slot />
  </dl>
</template>

<style scoped>
/* `min()` keeps a column no wider than the card, so a minimum wider than a
   phone is one column there rather than a grid running off the card. */
.dc-facts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(var(--dc-facts-min), 100%), 1fr));
  gap: 14px 24px;
  margin: 0;
  min-width: 0;
}
</style>
