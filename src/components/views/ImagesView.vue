<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { useShellContext } from '../../composables/context'
import { pressOptions } from '../../query/drill'
import { usePresentedRows } from '../../composables/usePresentedRows'
import type { PresentedRow } from '../../composables/usePresentedRows'
import { justify } from '../../data/justify'
import type { PictureShape } from '../../data/justify'
import RowPicture from './RowPicture.vue'
import SelectTick from './SelectTick.vue'

/**
 * The results as their pictures and nothing else: a wall of them, each drawn
 * large, in rows brought to the width of the results — see {@link justify}.
 *
 * A picture is the size it is, so the rows cannot be a grid: pictures of
 * different shapes in boxes of one shape are either cropped or floating in
 * blank, and a wall with blank in it is not a wall. Each row here shares one
 * height, at which every box in it is as wide as its picture's shape says,
 * and the height is whatever brings that row to the edge. The shapes come
 * from the pictures themselves as they load, a picture not yet loaded
 * standing as a square until it says otherwise; the wall is laid again each
 * time one does.
 *
 * And nothing is ever drawn larger than it is. A picture has only so many
 * pixels, and a box reached by blowing one up is a box with a blur in it. So
 * a row aims no higher than its tallest picture — a page of thumbnails is
 * more of them per row, at the size they are, rather than a few floating in
 * boxes nothing can fill — and a picture smaller than the box it did get sits
 * at its own size in the middle of it. The row answers a page whose pictures
 * are all small; the box answers the small one beside a large one, which no
 * row height can.
 *
 * Every picture opens its record, as a tile does, and says which record it is
 * on hover and to a screen reader. A record with no picture — none stored, or
 * one that would not load — is a square in its place with its name on: the
 * wall is still the result set, in the result's order, and a record left out
 * of it is a number that no longer adds up.
 */

const shell = useShellContext()
const rows = usePresentedRows()

/**
 * The height a row aims for, and the most a row is ever drawn at. Large,
 * being the point of the view — as large as the pictures allow, that is.
 */
const ROW_HEIGHT = 240
const GAP = 8
/** A picture that has not said its shape yet, and a record with no picture. */
const SQUARE = 1

/** What a picture is, once it has loaded: its own pixels. */
interface Natural {
  width: number
  height: number
}

/**
 * Each picture's own size, by its `src`, learnt as it loads. Keyed by the
 * address rather than the row, so a picture the next page or sort draws again
 * is laid at its shape at once rather than as a square that corrects itself.
 */
const naturals = reactive(new Map<string, Natural>())

/** The pictures that would not load, drawn as the record's name instead. */
const broken = reactive(new Set<string>())

function measured(src: string, event: Event) {
  const image = event.target as HTMLImageElement
  if (image.naturalWidth > 0 && image.naturalHeight > 0) {
    naturals.set(src, { width: image.naturalWidth, height: image.naturalHeight })
  }
}

/** The address of the picture a row draws, or null where it draws its name. */
function pictureOf(entry: PresentedRow): string | null {
  const src = entry.parts.image
  return src && !broken.has(src) ? src : null
}

function naturalOf(entry: PresentedRow): Natural | undefined {
  const src = pictureOf(entry)
  return src ? naturals.get(src) : undefined
}

/** The shape a row is laid from, and the size once the picture has said it. */
function shapeOf(entry: PresentedRow): PictureShape {
  const natural = naturalOf(entry)
  return natural ? { ratio: natural.width / natural.height, height: natural.height } : { ratio: SQUARE }
}

/*
 * The width the rows are laid to: the wall's own, watched, since the results
 * area is whatever the window and the panel leave it. Zero until mounted, when
 * the wall is one short row nobody sees before the first measure lands.
 */
const wall = ref<HTMLElement | null>(null)
const width = ref(0)

let watching: ResizeObserver | null = null

function measureWall() {
  width.value = wall.value?.clientWidth ?? 0
}

onMounted(() => {
  measureWall()
  if (!wall.value || typeof ResizeObserver === 'undefined') return
  watching = new ResizeObserver(measureWall)
  watching.observe(wall.value)
})

onBeforeUnmount(() => {
  watching?.disconnect()
  watching = null
})

interface Placed {
  entry: PresentedRow
  /** The box: where it is on the wall, and how big. */
  style: CSSProperties
  /**
   * The picture in it: the whole box, or — for one with fewer pixels than
   * the box has room for — its own size, centred by the box.
   */
  picture: CSSProperties
}

/**
 * Every picture's box, placed, and how tall the wall they make is. Absolute
 * boxes rather than rows of flex items, so a picture that moves between rows
 * as the shapes come in keeps its element — and the `<img>` inside it, which
 * is not fetched again — and so a row's widths can sum to the edge without a
 * rounding error wrapping the last box.
 */
const layout = computed<{ boxes: Placed[]; height: number }>(() => {
  const laid = justify(rows.value, shapeOf, {
    width: width.value,
    height: ROW_HEIGHT,
    gap: GAP,
  })
  const boxes: Placed[] = []
  let top = 0
  for (const row of laid) {
    let left = 0
    for (const entry of row.items) {
      const boxWidth = shapeOf(entry).ratio * row.height
      const natural = naturalOf(entry)
      const smaller = natural !== undefined && natural.height < row.height
      boxes.push({
        entry,
        style: {
          top: `${top}px`,
          left: `${left}px`,
          width: `${boxWidth}px`,
          height: `${row.height}px`,
        },
        picture: smaller
          ? { width: `${natural.width}px`, height: `${natural.height}px` }
          : { width: '100%', height: '100%' },
      })
      left += boxWidth + GAP
    }
    top += row.height + GAP
  }
  // The rows and the gaps between them, and no gap after the last.
  return { boxes, height: laid.length ? top - GAP : 0 }
})
</script>

<template>
  <div class="dc-images">
    <div
      ref="wall"
      class="dc-images__wall"
      :style="{ height: `${layout.height}px` }"
    >
      <div
        v-for="{ entry, style, picture } in layout.boxes"
        :key="entry.key"
        class="dc-images__cell"
        :style="style"
      >
        <button
          type="button"
          class="dc-images__open"
          :title="entry.parts.identity"
          :aria-label="entry.parts.identity"
          @click="shell.activate(entry.row, pressOptions($event))"
        >
          <RowPicture
            v-if="pictureOf(entry)"
            class="dc-images__picture"
            :style="picture"
            :src="pictureOf(entry)!"
            @load="measured(pictureOf(entry)!, $event)"
            @error="broken.add(pictureOf(entry)!)"
          />
          <span
            v-else
            class="dc-images__blank"
            aria-hidden="true"
          >{{ entry.parts.identity }}</span>
        </button>

        <!-- Over the picture, in the corner, as on a grid tile: the box is one
             button and the tick cannot be inside it. -->
        <SelectTick
          v-if="shell.selectable.value"
          class="dc-images__tick"
          :row="entry.row"
          :selected="entry.selected"
          :name="entry.parts.identity"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dc-images {
  padding: 16px;
}

/* The boxes are placed within it, so it is what they are placed within. */
.dc-images__wall {
  position: relative;
}

.dc-images__cell {
  position: absolute;
  box-sizing: border-box;
}

/*
 * The whole box, and its own faint ground: a part photographed on white and
 * one cut out to nothing are the same picture here; a picture that has not
 * loaded is a box that is visibly waiting rather than a hole in the wall; and
 * a picture smaller than its box is centred on it.
 */
.dc-images__open {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  overflow: hidden;
  background: var(--dc-bg-2);
  cursor: pointer;
}

.dc-images__open:hover {
  border-color: var(--dc-line-2);
}

/* Sized by the layout: the box, or the picture's own pixels within it. */
.dc-images__picture {
  flex: none;
  max-width: 100%;
  max-height: 100%;
}

/*
 * A record's name where its picture would be, centred in the square it keeps
 * and cut to a few lines with a mark saying so: a long name clipped at both
 * ends by the square reads as a fragment of something else.
 */
.dc-images__blank {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  /* A margin, not padding: the clip is at the padding edge, and a fourth
     line would show through padding. */
  margin: 12px;
  max-height: calc(100% - 24px);
  overflow: hidden;
  color: var(--dc-fg-2);
  font-size: var(--dc-text-meta);
  font-weight: var(--dc-weight-medium);
  line-height: var(--dc-leading-tight);
  text-align: center;
}

.dc-images__tick {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
