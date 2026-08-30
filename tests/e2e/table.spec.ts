import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'
import { gotoStory } from './story'

/**
 * The table against a corpus whose names are sentences and whose secondaries
 * are file paths — what it looks like once it is pointed at a real one.
 */
const LONG = 'shell-data-shell--table-view-long-values'

const results = (page: Page) => page.locator('.dc-results')
const table = (page: Page) => page.locator('.dc-table')

/** How far a box can be scrolled sideways inside itself. */
function overhang(target: Locator): Promise<number> {
  return target.evaluate((element) => element.scrollWidth - element.clientWidth)
}

/** True when the cell is showing less than it holds — the ellipsis is on. */
function truncated(cell: Locator): Promise<boolean> {
  return cell.evaluate((element) => element.scrollWidth > element.clientWidth)
}

test.describe('Table — as wide as the shell, never wider', () => {
  test('does not scroll sideways however long the values are', async ({ page }) => {
    await gotoStory(page, LONG)
    await expect(table(page)).toBeVisible()

    expect(await overhang(results(page))).toBe(0)
    expect(await overhang(table(page))).toBe(0)
  })

  test('the table is exactly the width it is given', async ({ page }) => {
    await gotoStory(page, LONG)
    const [area, drawn] = await Promise.all([
      results(page).evaluate((element) => element.clientWidth),
      table(page).evaluate((element) => element.getBoundingClientRect().width),
    ])
    expect(drawn).toBeLessThanOrEqual(area)
  })

  test('truncates the name and the path rather than wrapping them', async ({ page }) => {
    await gotoStory(page, LONG)
    const row = page.locator('.dc-table__row').first()

    expect(await truncated(row.locator('.dc-table__open'))).toBe(true)
    expect(await truncated(row.locator('.dc-table__muted').first())).toBe(true)

    // One line each, so every row is the same depth. Wrapping is what made a
    // row holding a long path four deep and the row under it one.
    const heights = await page
      .locator('.dc-table__row')
      .evaluateAll((rows) => rows.map((element) => Math.round(element.getBoundingClientRect().height)))
    expect(heights.length).toBeGreaterThan(1)
    expect(new Set(heights).size).toBe(1)
  })

  test('keeps the whole of a truncated value on hover', async ({ page }) => {
    await gotoStory(page, LONG)
    const name = page.locator('.dc-table__open').first()
    await expect(name).toHaveAttribute('title', (await name.textContent())?.trim() ?? '')
  })

  test('still fits once the shell is too narrow for every column', async ({ page }) => {
    await gotoStory(page, LONG)

    for (const width of [900, 760, 620, 480]) {
      await page.setViewportSize({ width, height: 720 })
      // The columns stand down at container widths, so let the query settle.
      await expect(table(page)).toBeVisible()
      expect(await overhang(results(page))).toBe(0)
    }
  })

  test('drops the metrics, then the date, as the room runs out', async ({ page }) => {
    await gotoStory(page, LONG)
    const metrics = page.locator('.dc-table th.dc-table__number')
    const date = page.locator('.dc-table th.dc-table__date')

    await expect(metrics.first()).toBeVisible()
    await expect(date).toBeVisible()

    await page.setViewportSize({ width: 700, height: 720 })
    await expect(metrics.first()).toBeHidden()
    await expect(date).toBeVisible()

    await page.setViewportSize({ width: 560, height: 720 })
    await expect(date).toBeHidden()

    // What is left is what a row is for: its name, its path and its state.
    await expect(page.locator('.dc-table__open').first()).toBeVisible()
    await expect(page.locator('.dc-table th.dc-table__state')).toBeVisible()
  })
})
