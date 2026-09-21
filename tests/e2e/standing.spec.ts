import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory } from './story'

/**
 * The standing column: where the query stands on each row of a table, as a
 * three-way control on the row — `+` narrows to it, `−` leaves it out, `·`
 * says nothing — and the same control at the head of the column, over every
 * row on the page or over the ticked ones.
 *
 * The lego schema's sets declare a scope, so their table has the column;
 * the story writes the query to the address bar, so each press is read back
 * out of it.
 */

const TABLE = 'shell-data-shell--drillable-table'
const TICKED = 'shell-data-shell--drillable-table-ticked'

const queryOf = (page: Page) => new URL(page.url()).searchParams.get('q')
const entityOf = (page: Page) => new URL(page.url()).searchParams.get('e')

const rows = (page: Page) => page.locator('.dc-table__row')
const cells = (page: Page) => page.locator('td.dc-table__standing')
const head = (page: Page) => page.locator('th.dc-table__standing .dc-standing-control')

/** The sign in one row's control: `in`, `out` or `none`. */
const sign = (page: Page, row: number, standing: 'in' | 'out' | 'none') =>
  cells(page).nth(row).locator(`[data-dc-standing="${standing}"]`)

/**
 * The sign lit on one row, if any. The dot is lit where the query says
 * nothing — the third state of a three-way control — but that is nearly
 * every row of nearly every query, so it is drawn quietly and read past here:
 * what these tests ask is which rows the query *names*.
 */
const LIT = '[data-dc-active="true"]:not([data-dc-standing="none"])'
const lit = (page: Page, row: number) => cells(page).nth(row).locator(LIT)

const litInHead = (page: Page) => head(page).locator('[data-dc-active="true"]')

/** The terms the query holds, as the set of them, in the order written. */
const termsOf = (page: Page) => (queryOf(page) ?? '').split(/\s+/).filter(Boolean)

/** How many sets the table lists — every one the query allows, whatever it says of them. */
const count = async (page: Page) => rows(page).count()

test.describe('The standing column', () => {
  test('is on every row of a type that can be named, with nothing lit', async ({ page }) => {
    await gotoStory(page, TABLE)
    await expect(cells(page)).toHaveCount(await count(page))
    // Every row on the dot: the query names none of them.
    await expect(page.locator(`td.dc-table__standing ${LIT}`)).toHaveCount(0)
    await expect(page.locator('td.dc-table__standing [data-dc-standing="none"][data-dc-active="true"]')).toHaveCount(await count(page))
    await expect(head(page)).toBeVisible()
  })

  test('narrows to the record on +, and the table stays', async ({ page }) => {
    await gotoStory(page, TABLE)
    const before = await count(page)
    await sign(page, 1, 'in').click()
    expect(queryOf(page)).toMatch(/^set:"sets_\d+"$/)
    // The story opens on the sets table, so a URL saying nothing else is one.
    expect(entityOf(page)).toBeNull()
    await expect(page.locator('.dc-table')).toBeVisible()
    await expect(lit(page, 1)).toHaveAttribute('data-dc-standing', 'in')
    // A list of a type does not apply the term on its own scope to itself.
    await expect(rows(page)).toHaveCount(before)
  })

  test('leaves the record out on −, turning a + the other way round', async ({ page }) => {
    await gotoStory(page, TABLE)
    await sign(page, 1, 'in').click()
    const narrowed = queryOf(page)!
    await sign(page, 1, 'out').click()
    expect(queryOf(page)).toBe(`-${narrowed.replace(/"/g, '')}`)
    await expect(lit(page, 1)).toHaveAttribute('data-dc-standing', 'out')
  })

  test('lifts the term on the dot, whichever way it was said', async ({ page }) => {
    await gotoStory(page, TABLE)
    await sign(page, 1, 'out').click()
    expect(queryOf(page)).toMatch(/^-set:"sets_\d+"$/)
    await sign(page, 1, 'none').click()
    expect(queryOf(page)).toBeNull()
    await expect(lit(page, 1)).toHaveCount(0)
  })

  test('does not press the row underneath', async ({ page }) => {
    await gotoStory(page, TABLE)
    await sign(page, 1, 'in').click()
    // A row press would have gone to Everything as cards; the control stays.
    await expect(page.locator('.dc-table')).toBeVisible()
    await expect(page.locator('.dc-types')).toHaveCount(0)
    expect(new URL(page.url()).searchParams.get('v')).toBeNull()
  })
})

test.describe('The head of the standing column', () => {
  test('sets every row on the page at once', async ({ page }) => {
    await gotoStory(page, TABLE)
    const n = await count(page)
    await head(page).locator('[data-dc-standing="out"]').click()
    const terms = termsOf(page)
    expect(terms).toHaveLength(n)
    for (const term of terms) expect(term).toMatch(/^-set:"sets_\d+"$/)
    await expect(page.locator(`td.dc-table__standing ${LIT}`)).toHaveCount(n)
    await expect(litInHead(page)).toHaveAttribute('data-dc-standing', 'out')
  })

  test('is lit only where the rows agree', async ({ page }) => {
    await gotoStory(page, TABLE)
    await expect(litInHead(page)).toHaveAttribute('data-dc-standing', 'none')
    await sign(page, 0, 'out').click()
    await expect(litInHead(page)).toHaveCount(0)
  })

  test('lifts every term on the dot', async ({ page }) => {
    await gotoStory(page, TABLE)
    await head(page).locator('[data-dc-standing="out"]').click()
    expect(termsOf(page).length).toBeGreaterThan(1)
    await head(page).locator('[data-dc-standing="none"]').click()
    expect(queryOf(page)).toBeNull()
  })

  test('speaks for the ticked rows, where any are', async ({ page }) => {
    await gotoStory(page, TICKED)
    await rows(page).nth(0).locator('.dc-tick').check()
    await rows(page).nth(2).locator('.dc-tick').check()
    await expect(head(page)).toHaveAttribute('aria-label', /ticked rows/)
    await head(page).locator('[data-dc-standing="out"]').click()
    expect(termsOf(page)).toHaveLength(2)
    await expect(lit(page, 0)).toHaveAttribute('data-dc-standing', 'out')
    await expect(lit(page, 1)).toHaveCount(0)
    await expect(lit(page, 2)).toHaveAttribute('data-dc-standing', 'out')
    // And reads its own standing off those two, not off the page.
    await expect(litInHead(page)).toHaveAttribute('data-dc-standing', 'out')
  })
})
