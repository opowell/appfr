<script setup lang="ts">
import { ref, watch } from 'vue'

/**
 * The picture a record's `image` column names, wherever a view draws one.
 *
 * Two things every view of a picture needs and none of them should repeat.
 * A source that does not load leaves nothing behind rather than the browser's
 * broken-image mark: a catalogue addresses pictures it does not host, so a
 * record whose picture has moved is a card without one, which is what a record
 * that never had one already is.
 *
 * And no alternative text. The name is beside it in every view that draws
 * this, so a screen reader that read the picture as well would read the record
 * twice — see {@link https://www.w3.org/WAI/tutorials/images/decorative/}.
 */
const props = defineProps<{
  /** The `src`, which the view resolved from the row's `image` role. */
  src: string
}>()

const broken = ref(false)

// A new picture is a picture that has not failed. The views draw these in a
// list keyed by row, so an element is reused for another record as the results
// page and sort.
watch(
  () => props.src,
  () => {
    broken.value = false
  },
)
</script>

<template>
  <img
    v-if="!broken"
    class="dc-picture"
    :src="src"
    alt=""
    loading="lazy"
    decoding="async"
    @error="broken = true"
  >
</template>

<style scoped>
/*
 * Whole, rather than filling its box: a catalogue's pictures are of things,
 * and a part cropped to a square is the wrong part.
 */
.dc-picture {
  display: block;
  object-fit: contain;
}
</style>
