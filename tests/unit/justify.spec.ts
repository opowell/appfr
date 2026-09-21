import { describe, expect, it } from 'vitest'
import { justify } from '../../src/data/justify'
import type { PictureShape } from '../../src/data/justify'

/** A picture whose shape is all that is known of it. */
const shape = (ratio: number): PictureShape => ({ ratio })

/** The width a row is drawn at: every picture's width at the row's height, and the gaps. */
const rowWidth = (row: { items: PictureShape[]; height: number }, gap: number) =>
  row.items.reduce((sum, item) => sum + item.ratio * row.height, 0) + gap * (row.items.length - 1)

const same = (item: PictureShape) => item

describe('justify — rows of pictures brought to one width', () => {
  it('packs a row until it reaches the edge at or under its aim', () => {
    // Four squares fill 500 at 117.5 tall, which is over the aim; five fill
    // it at 92, which is under it, and that is the row.
    const rows = justify([1, 1, 1, 1, 1, 1].map(shape), same, { width: 500, height: 100, gap: 10 })
    expect(rows.map((row) => row.items.length)).toEqual([5, 1])
    expect(rows[0]!.filled).toBe(true)
    expect(rows[0]!.height).toBeCloseTo(92)
    expect(rowWidth(rows[0]!, 10)).toBeCloseTo(500)
  })

  it('keeps every filled row exactly the width, whatever shapes are in it', () => {
    const shapes = [1.5, 0.7, 2.2, 1, 1.3, 0.5, 1.8, 1, 1, 2.5, 0.8, 1.1].map(shape)
    const rows = justify(shapes, same, { width: 640, height: 180, gap: 8 })
    expect(rows.length).toBeGreaterThan(1)
    for (const row of rows.filter((r) => r.filled)) {
      expect(rowWidth(row, 8)).toBeCloseTo(640)
      expect(row.height).toBeLessThanOrEqual(180)
    }
    // And in the reader's order, none dropped and none repeated.
    expect(rows.flatMap((row) => row.items)).toEqual(shapes)
  })

  it('never draws a picture taller than it is', () => {
    // Two 2:1 pictures would fill 400 at 100 tall, but one of them is only 60
    // tall: the row waits for a third, and fills at 400 / 5 = 80 — still over
    // 60, so a fourth, at 400 / 6 ≈ 67 — still over; a fifth brings it to 57.
    const items: PictureShape[] = [
      { ratio: 2, height: 200 },
      { ratio: 2, height: 60 },
      { ratio: 1 },
      { ratio: 1 },
      { ratio: 1 },
      { ratio: 1 },
    ]
    const rows = justify(items, same, { width: 400, height: 100 })
    expect(rows[0]!.items).toHaveLength(5)
    expect(rows[0]!.height).toBeCloseTo(400 / 7)
    expect(rows[0]!.filled).toBe(true)
  })

  it('leaves the last row short, at the height its pictures allow, rather than stretch it', () => {
    const rows = justify([shape(1), shape(1), { ratio: 1, height: 70 }], same, { width: 400, height: 100 })
    expect(rows).toHaveLength(1)
    expect(rows[0]!.filled).toBe(false)
    expect(rows[0]!.height).toBe(70)
  })

  it('leaves a last row of pictures whose size is not yet known at the aim', () => {
    const rows = justify([1, 1, 1, 1, 1].map(shape), same, { width: 400, height: 100, gap: 0 })
    const last = rows.at(-1)!
    expect(last.items).toHaveLength(1)
    expect(last.filled).toBe(false)
    expect(last.height).toBe(100)
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
    expect(rows).toEqual([{ items, height: 40, filled: false }])
  })

  it('is nothing for nothing', () => {
    expect(justify([], same, { width: 500, height: 100 })).toEqual([])
  })
})
