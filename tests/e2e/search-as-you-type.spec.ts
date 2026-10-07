import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import {
  gotoStory,
  listRows,
  pageBox,
  searchBox,
  shellParams,
  terms,
} from './story'

/**
 * The header's box narrows the results as it is typed: committed query AND
 * draft, read after a short pause, with nothing written to the URL until
 * Enter makes the draft a part of the query.
 */

const ENTITY = 'shell-data-shell--entity-list'
const HOME = 'shell-data-shell--home'
/** The home screen with `recall` already committed — what typing it should come to. */
const HOME_SEARCHED = 'shell-data-shell--home-search'
const LATER_PAGE = 'shell-data-shell--later-page'
const LIVE = 'routing-url-bound--live-url'

/** Each type card's name and count, as the home screen says them. */
async function cardCounts(page: Page): Promise<string[]> {
  return page.locator('.dc-type__head').evaluateAll((heads) =>
    heads.map((head) => {
      const name = head.querySelector('.dc-type__name')?.textContent?.trim()
      const count = head.querySelector('.dc-type__count')?.textContent?.trim()
      return `${name} ${count}`
    }),
  )
}

test.describe('Search box — the results follow what is typed', () => {
  test('narrows the list before Enter, and adds no part while it does', async ({ page }) => {
    await gotoStory(page, ENTITY)
    const before = await listRows(page).count()

    await searchBox(page).pressSequentially('regulatory')

    // Narrowed, with nothing committed: the bar has no new pill, and the
    // word is still in the box waiting for Enter.
    await expect.poll(() => listRows(page).count()).toBeLessThan(before)
    await expect(terms(page)).toHaveCount(0)
    await expect(searchBox(page)).toHaveValue('regulatory')
  })

  test('narrows to what Enter would have committed', async ({ page }) => {
    await gotoStory(page, ENTITY)
    const before = await listRows(page).count()
    await searchBox(page).fill('regulatory')
    await expect.poll(() => listRows(page).count()).toBeLessThan(before)
    const live = await listRows(page).allInnerTexts()

    await searchBox(page).press('Enter')
    await expect(terms(page)).toHaveText(['regulatory'])
    await expect(searchBox(page)).toHaveValue('')
    expect(await listRows(page).allInnerTexts()).toEqual(live)
  })

  test('Escape gives the draft up, and the results are the query’s again', async ({ page }) => {
    await gotoStory(page, ENTITY)
    const before = await listRows(page).allInnerTexts()

    await searchBox(page).fill('regulatory')
    await expect.poll(() => listRows(page).count()).toBeLessThan(before.length)
    await searchBox(page).press('Escape')

    await expect(searchBox(page)).toHaveValue('')
    await expect.poll(() => listRows(page).allInnerTexts()).toEqual(before)
  })

  test('a term not yet finished does not empty the screen', async ({ page }) => {
    await gotoStory(page, ENTITY)
    const before = await listRows(page).count()

    // `state:` on its way to `state:running` reads as nothing yet, rather
    // than as a word no record's name contains.
    await searchBox(page).fill('state:')
    await page.waitForTimeout(400)
    await expect(listRows(page)).toHaveCount(before)

    // And it reads the moment it is one.
    await searchBox(page).pressSequentially('running')
    await expect.poll(() => listRows(page).count()).toBeLessThan(before)
  })

  test('the type cards are counted against it, as they are against a committed query', async ({
    page,
  }) => {
    await gotoStory(page, HOME_SEARCHED)
    const committed = await cardCounts(page)

    await gotoStory(page, HOME)
    const untouched = await cardCounts(page)
    await searchBox(page).fill('recall')

    await expect.poll(() => cardCounts(page)).toEqual(committed)
    expect(committed).not.toEqual(untouched)
    await expect(terms(page)).toHaveCount(0)
  })

  test('shows the first page of what it found, without moving the query’s', async ({ page }) => {
    await gotoStory(page, LATER_PAGE)
    const was = await pageBox(page).inputValue()
    expect(Number(was)).toBeGreaterThan(1)

    await searchBox(page).fill('e')
    await expect(pageBox(page)).toHaveValue('1')

    // Given up, the query is where it was, on the page it was on.
    await searchBox(page).press('Escape')
    await expect(pageBox(page)).toHaveValue(was)
  })
})

test.describe('Search box — a press on what it found', () => {
  const DRILLABLE = 'shell-data-shell--home-drillable'

  test('narrowing to a record takes the draft with it', async ({ page }) => {
    await gotoStory(page, DRILLABLE, '&e=sets&v=list')
    const rows = await listRows(page).count()
    // A word out of the first set's own name, so the record is among what it finds.
    const name = (await page.locator('.dc-list__open').first().innerText()).trim()
    const word = name.split(/\s+/)[0]!
    await searchBox(page).fill(word)
    await expect.poll(() => listRows(page).count()).toBeLessThan(rows)

    await page.locator('.dc-list__open').first().click()

    // The record is the answer to the draft: the box is empty, and the query
    // is the record alone rather than the record and the word that found it.
    await expect(page.locator('.dc-types')).toBeVisible()
    await expect(searchBox(page)).toHaveValue('')
    expect(shellParams(page.url()).q).toMatch(/^set:"sets_\d+"$/)
  })
})

test.describe('Search box — the URL', () => {
  test('is not written while typing, and is once Enter commits', async ({ page }) => {
    await gotoStory(page, LIVE, '&e=items&v=list')
    const before = shellParams(page.url())
    const entries = await page.evaluate(() => history.length)
    const rows = await listRows(page).count()

    await searchBox(page).pressSequentially('regulatory')
    await expect.poll(() => listRows(page).count()).toBeLessThan(rows)
    expect(shellParams(page.url())).toEqual(before)
    expect(await page.evaluate(() => history.length)).toBe(entries)

    await searchBox(page).press('Enter')
    await expect(terms(page)).toHaveText(['regulatory'])
    expect(shellParams(page.url())).toEqual({ ...before, q: 'regulatory' })
    expect(await page.evaluate(() => history.length)).toBe(entries + 1)
  })
})
