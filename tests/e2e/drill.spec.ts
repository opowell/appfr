import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory, openPanel, termBar } from './story'

/**
 * Narrowing to one record.
 *
 * A row is two things: its name opens the record, its metric narrows to what
 * that number counts, and the → beside it narrows to the record itself without
 * picking a type. The shell applies all of it, so these tests press and then
 * read the query back out of the address bar.
 */

const HOME = 'shell-data-shell--home-drillable'
const TABLE = 'shell-data-shell--drillable-table'

const card = (page: Page, label: string) =>
  page.locator('.dc-type').filter({
    has: page.locator('.dc-type__name', { hasText: new RegExp(`^${label}$`) }),
  })

/** The shell writes its query into the story frame's own search string. */
const queryOf = (page: Page) => new URL(page.url()).searchParams.get('q')
const entityOf = (page: Page) => new URL(page.url()).searchParams.get('e')

test.describe('A metric that counts something listable', () => {
  test('is a button, and a metric that counts nothing is not', async ({ page }) => {
    await gotoStory(page, TABLE)
    const first = page.locator('.dc-table__row').first()
    // Sets: metric1 is Parts and leads to pieces; metric2 is Minifigs, which
    // this schema does not list, so that number stays plain text.
    await expect(first.locator('td').nth(3).locator('button.dc-drill')).toHaveCount(1)
    await expect(first.locator('td').nth(4).locator('button.dc-drill')).toHaveCount(0)
  })

  test('narrows to that type, scoped to the record pressed', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('button.dc-drill').first().click()
    expect(queryOf(page)).toMatch(/^set:"sets_\d+"$/)
    expect(entityOf(page)).toBe('pieces')
    await expect(termBar(page)).toContainText('pieces')
  })

  test('leaves fewer rows than the type has in total', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('button.dc-drill').first().click()
    const narrowed = await page.locator('.dc-table__row').count()
    expect(narrowed).toBeGreaterThan(0)
    // The mock generates 48 of each type, so a scoped set of pieces is fewer.
    expect(narrowed).toBeLessThan(48)
  })

  test('does not open the record it was pressed on', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('button.dc-drill').first().click()
    // Still a list of rows: the click never reached the row behind it.
    await expect(page.locator('.dc-table')).toBeVisible()
  })
})

test.describe('The → on a row', () => {
  test('narrows every card at once, without picking a type', async ({ page }) => {
    await gotoStory(page, HOME)
    await card(page, 'Sets').locator('.dc-scope').first().click()
    expect(queryOf(page)).toMatch(/^set:"sets_\d+"$/)
    expect(entityOf(page)).toBeNull()
    await expect(page.locator('.dc-types')).toBeVisible()
  })

  test('leaves the record itself among the results', async ({ page }) => {
    await gotoStory(page, HOME)
    const name = await card(page, 'Sets').locator('.dc-type__primary').first().innerText()
    await card(page, 'Sets').locator('.dc-scope').first().click()
    await expect(card(page, 'Sets').locator('.dc-type__primary').first()).toHaveText(name)
  })

  test('is not offered on a type that declares no scope', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(card(page, 'Inventories').locator('.dc-scope')).toHaveCount(0)
    await expect(card(page, 'Sets').locator('.dc-scope')).not.toHaveCount(0)
  })
})

test.describe('A narrowed query', () => {
  test('is an ordinary expression, in the header and in the panel', async ({ page }) => {
    await gotoStory(page, HOME)
    await card(page, 'Sets').locator('.dc-scope').first().click()
    const term = queryOf(page)!
    await expect(termBar(page)).toContainText('set:')
    await openPanel(page)
    await expect(page.locator('.dc-panel input[type="search"], .dc-panel input[type="text"]').first())
      .toHaveValue(term)
  })

  test('does not carry the same term twice', async ({ page }) => {
    await gotoStory(page, HOME)
    await card(page, 'Sets').locator('.dc-scope').first().click()
    const once = queryOf(page)
    await card(page, 'Sets').locator('.dc-scope').first().click()
    expect(queryOf(page)).toBe(once)
  })

  test('narrows types that declare no scope of their own too', async ({ page }) => {
    await gotoStory(page, HOME)
    const before = await card(page, 'Inventories').locator('.dc-type__count').innerText()
    await card(page, 'Sets').locator('.dc-scope').first().click()
    // The count switches from the schema's published population to what
    // matched, and an entity carrying the join key is genuinely filtered.
    await expect(card(page, 'Inventories').locator('.dc-type__count')).not.toHaveText(before)
  })
})
