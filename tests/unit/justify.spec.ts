import { describe, expect, it } from 'vitest'
import { justify } from '../../src/data/justify'
import type { PictureShape } from '../../src/data/justify'

/** A picture whose shape is all that is known of it — not yet loaded. */
const shape = (ratio: number): PictureShape => ({ ratio })

/** The width a row is drawn at: every box's width at the row's height, and the gaps. */
const rowWidth = (row: { items: PictureShape[]; height: number }, gap: number) =>
  row.items.reduce((sum, item) => sum + item.ratio * row.height, 0) + gap * (row.items.length - 1)

const same = (item: PictureShape) => item

describe('justify — rows of pictures brought to one width', () => {
  it('packs a row until the next picture would take it under its aim', () => {
    // Four squares fill 500 at 117.5 tall; five fill it at 92, which is the
    // nearer to 100, so the fifth joins them.
    const rows = justify([1, 1, 1, 1, 1, 1].map(shape), same, { width: 500, height: 100, gap: 10 })
    expect(rows.map((row) => row.items.length)).toEqual([5, 1])
    expect(rows[0]!.filled).toBe(true)
    expect(rowWidth(rows[0]!, 10)).toBeCloseTo(500)
  })

  it('keeps every filled row exactly the width, whatever shapes are in it', () => {
    const shapes = [1.5, 0.7, 2.2, 1, 1.3, 0.5, 1.8, 1, 1, 2.5, 0.8, 1.1].map(shape)
    const rows = justify(shapes, same, { width: 640, height: 180, gap: 8 })
    expect(rows.length).toBeGreaterThan(1)
    for (const row of rows.filter((r) => r.filled)) expect(rowWidth(row, 8)).toBeCloseTo(640)
    // And in the reader's order, none dropped and none repeated.
    expect(rows.flatMap((row) => row.items)).toEqual(shapes)
  })

  it('closes a row without the picture when that leaves it nearer its aim', () => {
    // Two 2:1 pictures fill 420 at 102.5 tall; with a square as well they fill
    // it at 80. 102.5 is the nearer to 100, so the square starts the next row.
    const rows = justify([2, 2, 1].map(shape), same, { width: 420, height: 100, gap: 10 })
    expect(rows[0]!.items).toHaveLength(2)
    expect(rows[0]!.height).toBeCloseTo(102.5)
  })

  it('aims no higher than the tallest picture in the row, so a row of small ones is small', () => {
    // Squares 80 pixels tall. At the 240 aim, three of them would fill 740 —
    // each drawn three times its size. The row aims at 80 instead, and takes
    // nine of them to fill the width at it.
    const small = { ratio: 1, height: 80 }
    const rows = justify(Array.from({ length: 20 }, () => small), same, {
      width: 740,
      height: 240,
      gap: 8,
    })
    expect(rows[0]!.items.length).toBeGreaterThan(3)
    expect(rows[0]!.height).toBeLessThanOrEqual(80)
    expect(rowWidth(rows[0]!, 8)).toBeCloseTo(740)
  })

  it('keeps the height its tallest can carry when a small picture is beside a large one', () => {
    // The tall one can be drawn at 240; the row aims there and the small one
    // sits in its box, which is the view's to draw.
    const rows = justify(
      [
        { ratio: 1, height: 600 },
        { ratio: 1, height: 80 },
        { ratio: 1, height: 600 },
        { ratio: 1, height: 600 },
      ],
      same,
      { width: 740, height: 240, gap: 8 },
    )
    expect(rows[0]!.items).toHaveLength(3)
    expect(rows[0]!.height).toBeCloseTo((740 - 16) / 3)
  })

  it('never draws a row taller than its tallest picture', () => {
    const shapes: PictureShape[] = [
      { ratio: 2, height: 90 },
      { ratio: 1, height: 120 },
      { ratio: 1.4, height: 60 },
      { ratio: 0.8, height: 300 },
      { ratio: 1, height: 75 },
      { ratio: 3, height: 110 },
      { ratio: 1, height: 95 },
      { ratio: 1.2, height: 480 },
    ]
    const rows = justify(shapes, same, { width: 900, height: 240, gap: 8 })
    for (const row of rows) {
      const tallest = Math.max(...row.items.map((item) => item.height ?? 0))
      expect(row.height).toBeLessThanOrEqual(tallest + 0.001)
    }
  })

  it('aims as high as ever while the pictures have not said their size', () => {
    // A wall drawn before anything has loaded is not a wall of thumbnails.
    const rows = justify([1, 1, 1, 1].map(shape), same, { width: 740, height: 240, gap: 8 })
    expect(rows[0]!.items).toHaveLength(3)
    expect(rows[0]!.height).toBeCloseTo((740 - 16) / 3)
  })

  it('leaves the last row short, at its aim, rather than stretch it to the edge', () => {
    const rows = justify([1, 1, 1, 1, 1].map(shape), same, { width: 400, height: 100, gap: 0 })
    const last = rows.at(-1)!
    expect(last.items).toHaveLength(1)
    expect(last.filled).toBe(false)
    expect(last.height).toBe(100)
  })

  it('leaves a last row of small pictures at their own size', () => {
    const rows = justify([{ ratio: 1, height: 60 }], same, { width: 400, height: 240 })
    expect(rows).toEqual([{ items: [{ ratio: 1, height: 60 }], height: 60, filled: false }])
  })

  it('gives a picture wider than the wall a row of its own, scaled down to it', () => {
    const rows = justify([10, 1].map(shape), same, { width: 500, height: 100, gap: 0 })
    expect(rows.map((row) => row.items.length)).toEqual([1, 1])
    expect(rows[0]!.height).toBeCloseTo(50)
    expect(rows[0]!.filled).toBe(true)
  })

  it('is one unfilled row of everything until the wall has a width', () => {
    const items = [shape(1), { ratio: 2, height: 40 }, shape(3)]
    const rows = justify(items, same, { width: 0, height: 100 })
    expect(rows).toEqual([{ items, height: 100, filled: false }])
  })

  it('is nothing for nothing', () => {
    expect(justify([], same, { width: 500, height: 100 })).toEqual([])
  })
})
