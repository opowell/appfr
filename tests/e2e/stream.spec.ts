import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory, listRows, openPanel, pageReadout, termBar } from './story'

/**
 * Results that arrive over time.
 *
 * A source declaring `stream` is handed a sink and pushes into it for as long
 * as it has anything to say, and the shell renders every push. These watch the
 * rows land, and then watch what happens to a stream whose query has moved on
 * — which is the half Brickzuke's imperative `addRow` had no answer for.
 */

const STREAMED = 'shell-data-shell--streamed-results'
const NEWEST_FIRST = 'shell-data-shell--streamed-newest-first'
const FAILURE = 'shell-data-shell--stream-failure'
const HOME = 'shell-data-shell--streamed-home'

const results = (page: Page) => page.locator('.dc-results')
const tableRows = (page: Page) => page.locator('.dc-table__row')
const count = (page: Page) => page.locator('.dc-header__count')

/** The rows on screen right now, however many that happens to be. */
const rowCount = (page: Page) => tableRows(page).count()

test.describe('A streaming source', () => {
  test('fills the table in as the rows are found', async ({ page }) => {
    await gotoStory(page, STREAMED)

    // Something is on screen before the stream has finished.
    await expect(tableRows(page).first()).toBeVisible()
    const early = await rowCount(page)

    await expect
      .poll(() => rowCount(page), { message: 'rows keep arriving' })
      .toBeGreaterThan(early)

    // And it settles on the whole result rather than stopping part way — the
    // mock's population, not the count the schema publishes.
    await expect.poll(() => rowCount(page)).toBe(48)
  })

  test('offers more pages as more is found', async ({ page }) => {
    await gotoStory(page, NEWEST_FIRST)

    // 48 rows at 12 a page, arriving two at a time: the pager has to grow with
    // the total rather than being told it up front.
    await expect.poll(() => pageReadout(page).innerText()).toContain('/ 4')
  })

  test('reports itself as pending until it closes', async ({ page }) => {
    await gotoStory(page, STREAMED)
    await expect(results(page)).toHaveAttribute('data-dc-pending', 'true')
    await expect(results(page)).toHaveAttribute('data-dc-pending', 'false', { timeout: 15_000 })
  })

  test('inserts at the front for a scan that finds the newest first', async ({ page }) => {
    await gotoStory(page, NEWEST_FIRST)
    await expect(listRows(page).first()).toBeVisible()

    const first = await listRows(page).first().innerText()
    // The row at the top is replaced by each new find, rather than added below.
    await expect.poll(() => listRows(page).first().innerText()).not.toBe(first)
  })

  test('holds one page however much it finds, and pages the rest', async ({ page }) => {
    await gotoStory(page, NEWEST_FIRST)
    await expect(listRows(page).first()).toBeVisible()

    // `limit` is 12 in this story, and the page never grows past it.
    await expect.poll(() => listRows(page).count()).toBe(12)
    await expect(pageReadout(page)).toContainText('/')

    // Then it holds there, with the overflow counted as further pages.
    await expect.poll(() => listRows(page).count(), { timeout: 5_000 }).toBe(12)
  })
})

test.describe('A stream and a change of query', () => {
  test('goes on filling through a change of view, rather than starting again', async ({ page }) => {
    await gotoStory(page, STREAMED)
    await expect(tableRows(page).first()).toBeVisible()

    // Switch the view while the crawl is still running. The same rows drawn
    // another way are the same rows, so the stream is not asked again — it
    // keeps landing, into the list this time.
    await openPanel(page)
    await page
      .locator('.dc-panel [aria-label="Result view"]')
      .getByRole('radio', { name: 'List' })
      .click()
    await page.keyboard.press('Escape')

    await expect(page.locator('.dc-table')).toHaveCount(0)
    await expect(listRows(page).first()).toBeVisible()
    await expect.poll(() => listRows(page).count()).toBe(48)
  })

  test('is restarted by a filter, and lands on the narrowed set', async ({ page }) => {
    await gotoStory(page, STREAMED)
    await expect(tableRows(page).first()).toBeVisible()

    await openPanel(page)
    await page.locator('.dc-panel').getByRole('button', { name: 'running' }).first().click()
    await page.keyboard.press('Escape')

    await expect(termBar(page)).toContainText('running')
    // Fewer than the whole population, and every row of it the new query's.
    await expect.poll(() => rowCount(page), { timeout: 15_000 }).toBeGreaterThan(0)
    expect(await rowCount(page)).toBeLessThan(48)

    // A narrowed query reports what matched rather than what the schema
    // publishes, so the count is the stream's own running one.
    await expect(count(page)).toHaveText(String(await rowCount(page)))
  })
})

test.describe('A stream that fails', () => {
  test('surfaces the failure as an alert, like a rejected query', async ({ page }) => {
    await gotoStory(page, FAILURE)
    const alert = page.getByRole('alert')
    await expect(alert).toContainText('Could not load results')
    await expect(alert).toContainText('The crawl stopped responding')
    await expect(results(page)).toHaveAttribute('data-dc-pending', 'false')
  })
})

test.describe('The home screen against a streaming source', () => {
  test('answers its per-type cards from query, all at once', async ({ page }) => {
    await gotoStory(page, HOME)
    // Every type of the schema has a card, filled rather than waiting on a
    // stream: the cards each run a query of their own.
    await expect(page.locator('.dc-type')).toHaveCount(5)
    await expect(page.locator('.dc-type__row').first()).toBeVisible()
  })
})
