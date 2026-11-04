import { expect, test } from '@playwright/test'
import { gotoStory, terms } from './story'

/**
 * A value in a table cell narrows the list to the rows sharing it: a number
 * keeps its end of the range, anything else keeps that value. What a press
 * would add stands faintly in the search bar first.
 */

/** Searches as a table: `New` and `Results` are numbers that count nothing listable. */
const TABLE = 'shell-data-shell--table-view'

const rows = (page: import('@playwright/test').Page) => page.locator('.dc-table__row')
const narrows = (page: import('@playwright/test').Page) => page.locator('.dc-table .dc-narrow', { hasText: /^\d/ })
const texts = (page: import('@playwright/test').Page) => page.locator('.dc-table .dc-narrow', { hasText: /^\D/ })

test.describe('Table — a value narrows to the rows like it', () => {
  test('is tinted under the pointer', async ({ page }) => {
    await gotoStory(page, TABLE)
    const value = narrows(page).first()
    const tint = () => value.evaluate((element) => getComputedStyle(element).backgroundColor)
    const before = await tint()
    await value.hover()
    await expect.poll(tint).not.toBe(before)
  })

  test('a press on text adds the value, whole', async ({ page }) => {
    await gotoStory(page, TABLE)
    const value = (await texts(page).first().innerText()).trim()
    await texts(page).first().click()
    await expect(terms(page)).toHaveCount(1)
    await expect(terms(page).first()).toContainText(value)
    await expect(page.locator('.dc-table')).toBeVisible()
  })

  test('says what a press would add while the pointer is on the value', async ({ page }) => {
    await gotoStory(page, TABLE)
    const preview = page.locator('.dc-term--preview')
    await expect(preview).toHaveCount(0)
    const value = narrows(page).first()
    await value.hover()
    await expect(preview).toHaveText(/^\S+ [≤≥] \d+(\.\d+)?$/)
    await page.locator('.dc-table thead').hover()
    await expect(preview).toHaveCount(0)
  })

  test('says it for the name of a record too, and goes when it is pressed', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--drillable-table')
    const preview = page.locator('.dc-term--preview')
    const name = page.locator('.dc-table__open').first()
    await name.hover()
    await expect(preview).toHaveCount(1)
    await name.click()
    await expect(preview).toHaveCount(0)
    await expect(terms(page)).toHaveCount(1)
  })

  test('dragging across a value selects it and presses nothing', async ({ page }) => {
    await gotoStory(page, TABLE)
    const value = texts(page).first()
    const box = (await value.boundingBox())!
    const y = box.y + box.height / 2
    await page.mouse.move(box.x + 1, y)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width - 1, y, { steps: 6 })
    await page.mouse.up()
    expect((await page.evaluate(() => getSelection()!.toString())).length).toBeGreaterThan(0)
    await expect(terms(page)).toHaveCount(0)
  })

  test('a press on the row itself does nothing unless the host asks for it', async ({ page }) => {
    await gotoStory(page, TABLE)
    await rows(page).first().locator('td').first().click()
    await expect(terms(page)).toHaveCount(0)
    await expect(rows(page).first()).toBeVisible()
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
