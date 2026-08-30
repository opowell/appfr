import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory, openPanel } from './story'

const RESTRICTED = 'shell-data-shell--restricted-views'
const UNOFFERED_LINK = 'shell-data-shell--restricted-views-unoffered-link'

/** The panel's View control — the first radiogroup in it, by its own label. */
const viewControl = (page: Page) => page.locator('.dc-panel [aria-label="Result view"]')

test.describe('Views — a host may offer fewer than six', () => {
  test('the View control offers only what the host listed', async ({ page }) => {
    await gotoStory(page, RESTRICTED)
    await expect(viewControl(page).locator('.dc-segmented__item')).toHaveText(['List', 'Table'])
  })

  test('what is left still switches the results', async ({ page }) => {
    await gotoStory(page, RESTRICTED)
    await expect(page.locator('.dc-table')).toBeVisible()

    await viewControl(page).getByRole('radio', { name: 'List' }).click()
    await expect(page.locator('.dc-list')).toBeVisible()
    await expect(page.locator('.dc-table')).toHaveCount(0)
  })

  test('a link to a view the host took off lands on one it offers', async ({ page }) => {
    await gotoStory(page, UNOFFERED_LINK)
    await expect(page.locator('.dc-tile')).toHaveCount(0)
    await expect(page.locator('.dc-list')).toBeVisible()
  })

  test('the panel is still reachable from that fallback', async ({ page }) => {
    await gotoStory(page, UNOFFERED_LINK)
    await openPanel(page)
    await expect(viewControl(page).locator('.dc-segmented__item')).toHaveText(['List', 'Table'])
  })
})

test.describe('Views — every one of them, when the host says nothing', () => {
  test('the View control offers all six', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-panel-open')
    await expect(viewControl(page).locator('.dc-segmented__item')).toHaveText([
      'List',
      'Cards',
      'Grid',
      'Table',
      'Links',
      'Preview',
    ])
  })
})
