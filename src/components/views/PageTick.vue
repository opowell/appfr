<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'

/**
 * The tick that takes the whole page, and gives it back.
 *
 * One control drawn in two places: at the head of the table, over the column
 * of ticks it speaks for, and at the head of the bar in every other view —
 * which have no header row to put it in. What it says is about the page alone,
 * since a page is all the shell has in hand: ticks made on other pages are
 * neither counted here nor touched by a press.
 */
const shell = useShellContext()

/** How many of the rows on screen are ticked. */
const onPage = computed(() => shell.rows.value.filter((row) => shell.isSelected(row)).length)

const allOnPage = computed(
  () => shell.rows.value.length > 0 && onPage.value === shell.rows.value.length,
)

/**
 * Some of the page but not all of it, which is neither checked nor unchecked —
 * the third state a checkbox has for exactly this.
 */
const someOnPage = computed(() => onPage.value > 0 && !allOnPage.value)
</script>

<template>
  <input
    class="dc-tick"
    type="checkbox"
    :checked="allOnPage"
    :indeterminate="someOnPage"
    aria-label="Select every row on this page"
    title="Select every row on this page"
    @change="shell.selectPage(!allOnPage)"
  >
</template>
