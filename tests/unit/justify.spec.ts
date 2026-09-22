import { describe, expect, it } from 'vitest'
import { justify } from '../../src/data/justify'

/** The width a row is drawn at: every box's width at the row's height, and the gaps. */
const rowWidth = (row: { items: number[]; height: number }, gap: number) =>
  row.items.reduce((sum, ratio) => sum + ratio * row.height, 0) + gap * (row.items.length - 1)

const same = (ratio: number) => ratio

describe('justify — rows of pictures brought to one width', () => {
  it('packs a row until the next picture would take it under its aim', () => {
    // Four squares fill 500 at 117.5 tall; five fill it at 92, which is the
    // nearer to 100, so the fifth joins them.
    const rows = justify([1, 1, 1, 1, 1, 1], same, { width: 500, height: 100, gap: 10 })
    expect(rows.map((row) => row.items.length)).toEqual([5, 1])
    expect(rows[0]!.filled).toBe(true)
    expect(rowWidth(rows[0]!, 10)).toBeCloseTo(500)
  })

  it('keeps every filled row exactly the width, whatever shapes are in it', () => {
    const shapes = [1.5, 0.7, 2.2, 1, 1.3, 0.5, 1.8, 1, 1, 2.5, 0.8, 1.1]
    const rows = justify(shapes, same, { width: 640, height: 180, gap: 8 })
    expect(rows.length).toBeGreaterThan(1)
    for (const row of rows.filter((r) => r.filled)) expect(rowWidth(row, 8)).toBeCloseTo(640)
    // And in the reader's order, none dropped and none repeated.
    expect(rows.flatMap((row) => row.items)).toEqual(shapes)
  })

  it('closes a row without the picture when that leaves it nearer its aim', () => {
    // Two 2:1 pictures fill 420 at 102.5 tall; with a square as well they fill
    // it at 80. 102.5 is the nearer to 100, so the square starts the next row.
    const rows = justify([2, 2, 1], same, { width: 420, height: 100, gap: 10 })
    expect(rows[0]!.items).toEqual([2, 2])
    expect(rows[0]!.height).toBeCloseTo(102.5)
  })

  it('leaves the last row short, at the aim, rather than stretch it to the edge', () => {
    const rows = justify([1, 1, 1, 1, 1], same, { width: 400, height: 100, gap: 0 })
    const last = rows.at(-1)!
    expect(last.items).toEqual([1])
    expect(last.filled).toBe(false)
    expect(last.height).toBe(100)
  })

  it('gives a picture wider than the wall a row of its own, scaled down to it', () => {
    const rows = justify([10, 1], same, { width: 500, height: 100, gap: 0 })
    expect(rows.map((row) => row.items)).toEqual([[10], [1]])
    expect(rows[0]!.height).toBeCloseTo(50)
    expect(rows[0]!.filled).toBe(true)
  })

  it('is one unfilled row of everything until the wall has a width', () => {
    const rows = justify([1, 2, 3], same, { width: 0, height: 100 })
    expect(rows).toEqual([{ items: [1, 2, 3], height: 100, filled: false }])
  })

  it('is nothing for nothing', () => {
    expect(justify([], same, { width: 500, height: 100 })).toEqual([])
  })
})
