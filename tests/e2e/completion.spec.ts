import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory, listRows, searchBox, terms } from './story'

/**
 * The box offers the listed type's facets as the word is typed — every one
 * with nothing typed, a field's values once it is named — and puts a pick in
 * the box rather than on the query, so the results show it before Enter.
 */

/** Searches: `state` and `schedule` chips, and the `hits` toggle headed Results. */
const ENTITY = 'shell-data-shell--entity-list'
const HOME = 'shell-data-shell--home'

const list = (page: Page) => page.getByRole('listbox', { name: 'Completions' })
const options = (page: Page) => list(page).getByRole('option')
const offered = (page: Page) => options(page).locator('.dc-completion__term')

test.describe('Search box — completions', () => {
  test('lists the type’s facets as the box is focused', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await searchBox(page).focus()
    await expect(offered(page)).toHaveText(['state:', 'schedule:', 'hits:'])
    await expect(options(page).nth(2)).toContainText('Only searches with new hits')
    await expect(searchBox(page)).toHaveAttribute('aria-expanded', 'true')
  })

  test('offers none on the home screen, which lists no one type', async ({ page }) => {
    await gotoStory(page, HOME)
    await searchBox(page).focus()
    await expect(list(page)).toHaveCount(0)
  })

  test('narrows to a facet, then to its values, and a press puts the term in the box', async ({ page }) => {
    await gotoStory(page, ENTITY)
    const before = await listRows(page).count()
    await searchBox(page).pressSequentially('sch')
    await expect(offered(page)).toHaveText(['schedule:'])

    await options(page).first().click()
    await expect(searchBox(page)).toHaveValue('schedule:')
    await expect(offered(page)).toHaveText(['schedule:hourly', 'schedule:daily', 'schedule:weekly'])

    await options(page).nth(1).click()
    await expect(searchBox(page)).toHaveValue('schedule:daily')
    await expect(searchBox(page)).toBeFocused()
    await expect(list(page)).toHaveCount(0)
    // In the box, not on the query — but the results already answer it.
    await expect(terms(page)).toHaveCount(0)
    await expect.poll(() => listRows(page).count()).toBeLessThan(before)

    // The part reads with the facet's heading, as every part does.
    await searchBox(page).press('Enter')
    await expect(terms(page)).toHaveText(['Schedule:daily'])
  })

  test('steps through with the arrow keys, and Enter picks the one stepped to', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await searchBox(page).pressSequentially('hits:')
    await expect(offered(page)).toHaveText(['hits:true', 'hits:false'])

    await searchBox(page).press('ArrowDown')
    await searchBox(page).press('ArrowDown')
    await expect(options(page).nth(1)).toHaveAttribute('aria-selected', 'true')
    await searchBox(page).press('Enter')
    await expect(searchBox(page)).toHaveValue('hits:false')
    await expect(terms(page)).toHaveCount(0)

    await searchBox(page).press('Enter')
    await expect(terms(page)).toHaveText(['Results:false'])
  })

  test('Enter with nothing stepped to commits what is typed, as it always did', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await searchBox(page).pressSequentially('sch')
    await expect(list(page)).toBeVisible()
    await searchBox(page).press('Enter')
    await expect(terms(page)).toHaveText(['sch'])
    await expect(list(page)).toHaveCount(0)
  })

  test('Escape gives up the draft, and the list goes with it', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await searchBox(page).pressSequentially('sta')
    await expect(list(page)).toBeVisible()

    await searchBox(page).press('Escape')
    await expect(list(page)).toHaveCount(0)
    await expect(searchBox(page)).toHaveValue('')
  })
})
