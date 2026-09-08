import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { chooseView, gotoStory, viewSelect } from './story'

const RESTRICTED = 'shell-data-shell--restricted-views'
const UNOFFERED_LINK = 'shell-data-shell--restricted-views-unoffered-link'

/** What the header's View chooser is offering, in the order it offers them. */
const viewOptions = (page: Page) => viewSelect(page).locator('option')

test.describe('Views — a host may offer fewer than six', () => {
  test('the View control offers only what the host listed', async ({ page }) => {
    await gotoStory(page, RESTRICTED)
    await expect(viewOptions(page)).toHaveText(['List', 'Table'])
  })

  test('what is left still switches the results', async ({ page }) => {
    await gotoStory(page, RESTRICTED)
    await expect(page.locator('.dc-table')).toBeVisible()

    await chooseView(page, 'list')
    await expect(page.locator('.dc-list')).toBeVisible()
    await expect(page.locator('.dc-table')).toHaveCount(0)
  })

  test('a link to a view the host took off lands on one it offers', async ({ page }) => {
    await gotoStory(page, UNOFFERED_LINK)
    await expect(page.locator('.dc-tile')).toHaveCount(0)
    await expect(page.locator('.dc-list')).toBeVisible()
  })

  test('the chooser still offers that host’s set from the fallback', async ({ page }) => {
    await gotoStory(page, UNOFFERED_LINK)
    await expect(viewOptions(page)).toHaveText(['List', 'Table'])
  })
})

test.describe('Views — every one of them, when the host says nothing', () => {
  test('the View control offers all six', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-panel-open')
    await expect(viewOptions(page)).toHaveText([
      'List',
      'Cards',
      'Grid',
      'Table',
      'Links',
      'Preview',
    ])
  })
})

test.describe('Views — the picture a type has, where it has one', () => {
  test('every card of a pictured type carries its picture', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    const cards = page.locator('.dc-card')
    expect(await cards.count()).toBeGreaterThan(0)
    await expect(cards.locator('.dc-card__image')).toHaveCount(await cards.count())
    // Beside the name rather than instead of it: a card still reads as a card.
    await expect(cards.first().locator('.dc-card__primary')).not.toBeEmpty()
  })

  test('a type with no picture is the same card without one', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--cards-view')
    expect(await page.locator('.dc-card').count()).toBeGreaterThan(0)
    await expect(page.locator('.dc-card__image')).toHaveCount(0)
  })

  test('a tile is the picture, with its caption over it', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-grid')
    const tiles = page.locator('.dc-tile')
    expect(await tiles.count()).toBeGreaterThan(0)
    await expect(tiles.locator('.dc-tile__image')).toHaveCount(await tiles.count())
    await expect(tiles.first().locator('.dc-tile__primary')).not.toBeEmpty()
  })

  test('the picture is inside the press that opens the record', async ({ page }) => {
    // The shell only reports an activation, so what is assertable here is the
    // structure that makes the press one: the picture is in the button, not
    // beside it.
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    await expect(page.locator('.dc-card__open .dc-card__image').first()).toBeVisible()
  })
})
