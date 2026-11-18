import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory } from './story'

/**
 * Where the query stands on a record, set from the bar: rows of a type that
 * can be named are ticked, and Include narrows the query to the ticked ones,
 * Exclude leaves them out. No row carries a control of its own for it — only
 * the mark on a row the query names, which lifts the term when pressed.
 *
 * The lego schema's sets declare a scope; the story writes the query to the
 * address bar, so each press is read back out of it.
 */

const TABLE = 'shell-data-shell--drillable-table'
const HOME = 'shell-data-shell--home-drillable'

const queryOf = (page: Page) => new URL(page.url()).searchParams.get('q')

const rows = (page: Page) => page.locator('.dc-table__row')
const include = (page: Page) => page.locator('.dc-actions__op[data-dc-operation="include"]')
const exclude = (page: Page) => page.locator('.dc-actions__op[data-dc-operation="exclude"]')
const marks = (page: Page) => page.locator('td.dc-table__standing .dc-standing')

/** The terms the query holds, in the order written. */
const termsOf = (page: Page) => (queryOf(page) ?? '').split(/\s+/).filter(Boolean)

test.describe('Including and excluding ticked rows', () => {
  test('rows of a type that can be named are ticked, with no + · − on them', async ({ page }) => {
    await gotoStory(page, TABLE)
    await expect(rows(page).first().locator('.dc-tick')).toBeVisible()
    await expect(page.locator('.dc-standing-control')).toHaveCount(0)
    // The query names nothing, so there is no column of marks.
    await expect(page.locator('.dc-table__standing')).toHaveCount(0)
    await expect(include(page)).toBeDisabled()
    await expect(exclude(page)).toBeDisabled()
  })

  test('Include narrows the query to the ticked rows, and unticks them', async ({ page }) => {
    await gotoStory(page, TABLE)
    const before = await rows(page).count()
    await rows(page).nth(0).locator('.dc-tick').check()
    await rows(page).nth(2).locator('.dc-tick').check()
    await expect(include(page)).toHaveText('Include 2')
    await include(page).click()
    const terms = termsOf(page)
    expect(terms).toHaveLength(2)
    for (const term of terms) expect(term).toMatch(/^set="sets_\d+"$/)
    await expect(page.locator('.dc-tick:checked')).toHaveCount(0)
    // A list of a type does not apply the term on its own scope to itself.
    await expect(rows(page)).toHaveCount(before)
    await expect(marks(page)).toHaveCount(2)
    await expect(marks(page).first()).toHaveText('+')
  })

  test('Exclude leaves them out, turning an include the other way round', async ({ page }) => {
    await gotoStory(page, TABLE)
    await rows(page).nth(1).locator('.dc-tick').check()
    await include(page).click()
    const included = queryOf(page)!
    await rows(page).nth(1).locator('.dc-tick').check()
    await exclude(page).click()
    expect(queryOf(page)).toBe(`-${included.replace(/"/g, '')}`)
    await expect(marks(page)).toHaveCount(1)
    await expect(marks(page)).toHaveAttribute('data-dc-standing', 'out')
  })

  test('the mark lifts the term', async ({ page }) => {
    await gotoStory(page, TABLE)
    await rows(page).nth(1).locator('.dc-tick').check()
    await exclude(page).click()
    expect(queryOf(page)).toMatch(/^-set="sets_\d+"$/)
    await marks(page).click()
    expect(queryOf(page)).toBeNull()
    await expect(page.locator('.dc-table__standing')).toHaveCount(0)
  })

  for (const [view, row] of [
    ['list', '.dc-list__row'],
    ['cards', '.dc-card'],
  ] as const) {
    test(`works from a ${view}, whose rows carry only a tick`, async ({ page }) => {
      await gotoStory(page, HOME, `&e=sets&v=${view}`)
      const first = page.locator(row).first()
      await expect(page.locator('.dc-standing-control')).toHaveCount(0)
      await first.locator('.dc-tick').check()
      await exclude(page).click()
      expect(queryOf(page)).toMatch(/^-set="sets_\d+"$/)
      await expect(first.locator('.dc-standing')).toHaveText('−')
    })
  }
})
