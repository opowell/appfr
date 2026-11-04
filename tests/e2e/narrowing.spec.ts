import { expect, test } from '@playwright/test'
import { gotoStory, terms } from './story'

/**
 * A value in a table cell narrows the list to the rows sharing it: a number
 * keeps its end of the range, a facet's value keeps that value. Underlined
 * dotted, as a count that drills is.
 */

/** Searches as a table: `New` and `Results` are numbers that count nothing listable. */
const TABLE = 'shell-data-shell--table-view'

const rows = (page: import('@playwright/test').Page) => page.locator('.dc-table__row')
const narrows = (page: import('@playwright/test').Page) => page.locator('.dc-table .dc-narrow')

test.describe('Table — a value narrows to the rows like it', () => {
  test('is drawn with the dotted underline a drilling count has', async ({ page }) => {
    await gotoStory(page, TABLE)
    const link = narrows(page).first()
    await expect(link).toBeVisible()
    expect(await link.evaluate((element) => getComputedStyle(element).textDecorationStyle)).toBe('dotted')
  })

  test('a press adds a bound on that end of the range, and stays on the list', async ({ page }) => {
    await gotoStory(page, TABLE)
    const before = await rows(page).count()
    const heading = await page.locator('.dc-table thead th').allInnerTexts()

    await narrows(page).first().click()
    await expect(terms(page)).toHaveCount(1)
    // The part says the column's heading and the bound: `New ≤ 3`, `Results ≥ 12`.
    await expect(terms(page).first()).toHaveText(/^\S+ [≤≥] \d+(\.\d+)?$/)
    await expect(terms(page).first()).toHaveAttribute('title', /Written \S+(<=|>=)\d/)
    // The list it was pressed in, narrowed: the same table, not the record's page.
    expect(await page.locator('.dc-table thead th').allInnerTexts()).toEqual(heading)
    await expect.poll(() => rows(page).count()).toBeLessThanOrEqual(before)
    await expect(rows(page).first()).toBeVisible()
  })

  test('with ⌥ held, leaves those rows out instead', async ({ page }) => {
    await gotoStory(page, TABLE)
    await narrows(page).first().click({ modifiers: ['Alt'] })
    await expect(terms(page)).toHaveCount(1)
    await expect(terms(page).first()).toHaveText(/^-/)
  })
})
