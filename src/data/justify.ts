/**
 * Pictures of different shapes brought to rows of one width.
 *
 * A wall of pictures cannot wrap the way cards do: a card is a box the view
 * chose the size of, and a picture is the size it is. Tiles the same size
 * would have to crop or letterbox, and a part cropped to a square is the wrong
 * part. So instead every row is scaled to exactly the width on offer — the
 * boxes in it share a height, each as wide as its picture's shape says it is
 * at that height, and the row is packed until the next picture would take it
 * under the height it aims for. The reader's order is kept, left to right and
 * then down, which a masonry of columns would not.
 *
 * And nothing is ever drawn larger than it is, which is the other half of how
 * a row's height is chosen: a row aims no higher than its *tallest* picture.
 * A row of thumbnails is a row of thumbnails — more of them, smaller, filling
 * the width at the size they actually are, rather than a few floating in the
 * middle of boxes nothing can fill. A small picture beside a large one is the
 * case the row cannot answer, and does not try to: the row keeps the height
 * its tallest can carry and the small one sits in its box, which is the
 * view's to draw.
 *
 * Pure, so a test can hang a wall without a browser: the caller measures the
 * width and the shapes, and lays out what comes back.
 */

export interface PictureShape {
  /** Width over height — the shape, whatever size it is drawn at. */
  ratio: number
  /**
   * Its own height in pixels, once known. Left out for a picture not yet
   * loaded and for a record with no picture at all: neither says a row must
   * be smaller, so a row of them aims as high as it would anyway.
   */
  height?: number
}

export interface JustifiedRow<T> {
  items: T[]
  /** How tall every box in the row is drawn, in the width's units. */
  height: number
  /**
   * Whether the row reaches the far edge. The last row is the one that may
   * not: with too few pictures left to fill it at anything near the height
   * the others have, it keeps its aim and ends where it ends — never
   * stretched to the edge, a few huge boxes being no way to end a wall.
   */
  filled: boolean
}

export interface JustifyOptions {
  /** The width every filled row measures. */
  width: number
  /** The height a row aims for, and the most any row is drawn at. */
  height: number
  /** Between boxes in a row, and so part of what a row's width is spent on. */
  gap?: number
}

/**
 * The width a row of these shapes has at a height of one — the ratios summed —
 * and so the height that brings it to `width` is `width` over this.
 */
function fillHeight(ratioSum: number, count: number, width: number, gap: number): number {
  return (width - gap * (count - 1)) / ratioSum
}

/** What a row of pictures this tall is aiming for: the shell's aim, or them. */
function aimOf(tallest: number, aim: number): number {
  return tallest > 0 ? Math.min(aim, tallest) : aim
}

/**
 * The most such a row may be drawn at — its tallest picture's own height, and
 * no limit while none of them has said. Above the aim, which is the room a
 * row has to close early: a row of 600-pixel pictures may overshoot a 240 aim
 * without anything in it being enlarged, and a row of 80-pixel ones may not.
 */
function capOf(tallest: number): number {
  return tallest > 0 ? tallest : Infinity
}

/**
 * Packs `items` into rows, `shapeOf(item)` being the shape each picture is
 * and, once it is known, how tall it is.
 *
 * Greedy, one pass: a picture joins the row until the row would be under its
 * aim with it in, and then it goes whichever side leaves the row's height
 * nearer that aim. A width of nothing — a wall not yet measured — is one
 * unfilled row of everything, which is what the caller can draw before it
 * knows better.
 */
export function justify<T>(
  items: readonly T[],
  shapeOf: (item: T) => PictureShape,
  options: JustifyOptions,
): JustifiedRow<T>[] {
  const { width, height, gap = 0 } = options
  if (!items.length) return []
  if (!(width > 0) || !(height > 0)) return [{ items: [...items], height, filled: false }]

  const rows: JustifiedRow<T>[] = []
  let pending: T[] = []
  let ratioSum = 0
  // The tallest picture in the pending row, or 0 while none of them has said.
  let tallest = 0

  for (const item of items) {
    const shape = shapeOf(item)
    const ratio = Math.max(shape.ratio, Number.EPSILON)
    const grown = shape.height && shape.height > 0 ? Math.max(tallest, shape.height) : tallest

    const aimWith = aimOf(grown, height)
    const withHeight = fillHeight(ratioSum + ratio, pending.length + 1, width, gap)
    if (withHeight > aimWith) {
      pending.push(item)
      ratioSum += ratio
      tallest = grown
      continue
    }

    // The row is full with this in it. Full without it too, only taller — and
    // the taller one is the row when it is the nearer to its own aim, and
    // when its own pictures have the pixels to be drawn that tall. A row
    // closed early is a row above its aim, which is free where the pictures
    // are larger than the wall draws them and is an enlargement where they
    // are not: a row of thumbnails takes the next picture instead.
    const aimWithout = aimOf(tallest, height)
    const withoutHeight = pending.length ? fillHeight(ratioSum, pending.length, width, gap) : Infinity
    if (withoutHeight <= capOf(tallest) && withoutHeight - aimWithout < aimWith - withHeight) {
      rows.push({ items: pending, height: withoutHeight, filled: true })
      pending = [item]
      ratioSum = ratio
      tallest = shape.height && shape.height > 0 ? shape.height : 0
    } else {
      rows.push({ items: [...pending, item], height: withHeight, filled: true })
      pending = []
      ratioSum = 0
      tallest = 0
    }
  }

  if (pending.length) rows.push({ items: pending, height: aimOf(tallest, height), filled: false })
  return rows
}
