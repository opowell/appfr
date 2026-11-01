<script setup lang="ts">
import { computed, ref } from 'vue'
import { useShellContext } from '../composables/context'
import PressLink from './views/PressLink.vue'
import { formatInteger } from '../data/format'

/**
 * Stepping through the pages of the results: `‹ 3 / 4 ›`, the number typed as
 * well as stepped. Drawn on the bar over the results — see `RecordActions`,
 * which decides when there is anything to page.
 */
const props = defineProps<{
  /**
   * What the count is short of, in the host's words — `first 1,200 of 30,200
   * lots`. Said where the count is, which is the pager's hover text, rather
   * than on the bar beside it.
   */
  pagesNote?: string
}>()

const shell = useShellContext()

/** The page on screen — the draft's own, while one is being typed. */
const page = computed(() => shell.liveQuery.value.page)

/**
 * How many pages there are, as far as is known. While the source is still
 * counting the total is what it has found so far, and a streaming source finds
 * more — so the count is said as one that may yet grow, `~4` rather than `4`.
 * Not while it only fetches another page of a query it has counted: the rows
 * are on their way, but the number of pages is known.
 */
const pages = computed(() =>
  `${shell.counting.value ? '~' : ''}${formatInteger(shell.pageCount.value)}`,
)

/**
 * Where this page sits in the whole result. The bar shows the short form and
 * says this much to a tooltip and a screen reader, since `2 / 5` on its own
 * does not say what it is counting — and the host's note under it, since what
 * the count is short of is a fact about the same number.
 */
const position = computed(() => {
  let place = `Page ${formatInteger(page.value)} of ${pages.value}`
  const shown = shell.rows.value.length
  if (shown) {
    const first = shell.offset.value + 1
    const total = `${shell.counting.value ? '~' : ''}${formatInteger(shell.total.value)}`
    place += ` — rows ${formatInteger(first)} to ${formatInteger(first + shown - 1)} of ${total}`
  }
  return props.pagesNote ? `${place}\n${props.pagesNote}` : place
})

/**
 * What the box holds: the page being typed while it is being typed, and the
 * query's own page at every other moment. Nothing tells the box to catch up
 * after a step, a new query or a Back — it was never holding its own number.
 */
const draft = ref<string | null>(null)
const typed = computed(() => draft.value ?? String(page.value))

/**
 * Room for the last page's digits and no more, so the field neither grows
 * under the typing hand nor leaves the steps sitting apart from it. The
 * padding is added back on: the shell borders every box, so the width it is
 * given is the outside of one and the digits would be squeezed out of it.
 */
const boxWidth = computed(
  () => `calc(${Math.max(2, String(shell.pageCount.value).length)}ch + 10px)`,
)

/** Typing over the number is the point, so a click offers it up whole. */
function offerAll(event: FocusEvent): void {
  const box = event.target as HTMLInputElement
  box.select()
}

/** Pages are counted in digits, and the box holds nothing else. */
function keepDigits(event: Event): void {
  const box = event.target as HTMLInputElement
  const digits = box.value.replace(/[^0-9]/g, '')
  /* Held in the element as well as the ref: Vue re-renders from `typed`, which
     a rejected keystroke leaves unchanged, and the box would keep it. */
  if (box.value !== digits) box.value = digits
  draft.value = digits
}

/**
 * A typed page lands on one that exists. Past the end is the last page, the
 * same place the steps stop at; a box left empty, or holding what is not a
 * page at all, is a page not asked for and leaves this one where it is.
 */
function jumpToTyped(event: Event): void {
  const box = event.target as HTMLInputElement
  const wanted = Number(draft.value)
  draft.value = null
  const landed =
    Number.isFinite(wanted) && wanted >= 1
      ? Math.min(Math.trunc(wanted), Math.max(1, shell.pageCount.value))
      : page.value
  box.value = String(landed)
  if (landed !== page.value) shell.setPage(landed)
}

/** Escape is the way out of a half-typed number: the page it left stands. */
function abandonTyped(event: Event): void {
  const box = event.target as HTMLInputElement
  draft.value = null
  box.value = String(page.value)
  box.blur()
}
</script>

<template>
  <nav
    class="dc-pager"
    aria-label="Pages"
  >
    <!-- Links while there is a page to go to, and a disabled button at the
         end, where there is none: a link cannot be turned off. -->
    <PressLink
      class="dc-pager__step"
      aria-label="Previous page"
      :href="page > 1 ? shell.hrefFor({ page: page - 1 }) : null"
      :disabled="page <= 1"
      @press="shell.setPage(page - 1)"
    >
      <span aria-hidden="true">‹</span>
    </PressLink>

    <span
      class="dc-pager__page dc-mono"
      :title="position"
    >
      <!-- The page is typed as well as stepped: page 30 is twenty-nine
           presses away and one number wide. A text box rather than a number
           one, because the spinner a number box brings is already here,
           either side of it, counting in pages it knows the end of. -->
      <input
        class="dc-pager__box dc-mono"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        aria-label="Page"
        :style="{ width: boxWidth }"
        :value="typed"
        @focus="offerAll"
        @input="keepDigits"
        @keydown.enter.prevent="jumpToTyped"
        @keydown.esc.prevent="abandonTyped"
        @blur="jumpToTyped"
      >
      <span
        class="dc-pager__total"
        aria-hidden="true"
      >/ {{ pages }}</span>
    </span>
    <span
      class="dc-pager__sr"
      aria-live="polite"
    >{{ position }}</span>

    <PressLink
      class="dc-pager__step"
      aria-label="Next page"
      :href="page < shell.pageCount.value ? shell.hrefFor({ page: page + 1 }) : null"
      :disabled="page >= shell.pageCount.value"
      @press="shell.setPage(page + 1)"
    >
      <span aria-hidden="true">›</span>
    </PressLink>
  </nav>
</template>

<style scoped>
.dc-pager {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
}

.dc-pager__step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: var(--dc-bg-0);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-1);
  font-size: var(--dc-text-meta);
  line-height: 1;
  cursor: pointer;
}

.dc-pager__step:hover:not(:disabled) {
  background: var(--dc-bg-2);
  color: var(--dc-fg-0);
}

/*
 * There is no page before the first, and the button says so. This is not the
 * shell forbidding a move — it is the end of the results, which is a fact
 * about them and reads as one.
 */
.dc-pager__step:disabled {
  opacity: 0.4;
  cursor: default;
}

.dc-pager__page {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  /* Held to a width, so stepping 9 → 10 does not shuffle the buttons. */
  min-width: 46px;
  justify-content: center;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

/*
 * A number on the bar until it is used: no frame, no fill, sized to its digits.
 * The readout is what it has to look like, because that is what it is for all
 * but the few seconds a page is being typed into it.
 */
.dc-pager__box {
  min-width: 0;
  padding: 1px 2px;
  background: none;
  border: 1px solid transparent;
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-1);
  font-size: var(--dc-text-micro);
  line-height: 1;
  text-align: center;
}

.dc-pager__box:hover {
  border-color: var(--dc-line);
}

/* Under the caret it is a field and is filled like one. The accent ring is the
   shell's own, which every focused thing here wears, so the border stays the
   quiet one rather than doubling it. */
.dc-pager__box:focus {
  background: var(--dc-bg-0);
  border-color: var(--dc-line);
  color: var(--dc-fg-0);
}

.dc-pager__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
</style>
