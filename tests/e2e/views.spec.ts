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
  test('a card of a pictured type carries its picture', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    const cards = page.locator('.dc-card')
    const pictured = cards.filter({ has: page.locator('.dc-card__image') })
    expect(await cards.count()).toBeGreaterThan(0)
    expect(await pictured.count()).toBeGreaterThan(0)
    // Beside the name rather than instead of it: a card still reads as a card.
    await expect(pictured.first().locator('.dc-card__primary')).not.toBeEmpty()
  })

  /*
   * And a record of that same type with nothing under the column is the card
   * without a picture — the rare pieces are the ones nobody photographed, so
   * one type shows both. A catalogue addresses pictures it does not hold, and
   * a record it holds none for is the commonest case there is.
   */
  test('a record of a pictured type that has none is the same card without one', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    const cards = page.locator('.dc-card')
    const bare = cards.filter({ hasNot: page.locator('.dc-card__image') })
    expect(await bare.count()).toBeGreaterThan(0)
    await expect(bare.first().locator('.dc-card__primary')).not.toBeEmpty()
  })

  test('a type with no picture is the same card without one', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--cards-view')
    expect(await page.locator('.dc-card').count()).toBeGreaterThan(0)
    await expect(page.locator('.dc-card__image')).toHaveCount(0)
  })

  test('a tile is the picture, with its caption over it', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-grid')
    const tiles = page.locator('.dc-tile')
    const pictured = tiles.filter({ has: page.locator('.dc-tile__image') })
    expect(await tiles.count()).toBeGreaterThan(0)
    expect(await pictured.count()).toBeGreaterThan(0)
    await expect(pictured.first().locator('.dc-tile__primary')).not.toBeEmpty()
    // And a tile with no picture is the tint it always was, caption and all.
    const bare = tiles.filter({ hasNot: page.locator('.dc-tile__image') })
    expect(await bare.count()).toBeGreaterThan(0)
    await expect(bare.first().locator('.dc-tile__primary')).not.toBeEmpty()
  })

  test('the picture is inside the press that opens the record', async ({ page }) => {
    // The shell only reports an activation, so what is assertable here is the
    // structure that makes the press one: the picture is in the button, not
    // beside it.
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    await expect(page.locator('.dc-card__open .dc-card__image').first()).toBeVisible()
  })

  /*
   * A source that does not load is the same nothing as a source that was never
   * there. A catalogue's pictures are somebody else's files, so this is what a
   * record whose picture has moved looks like — not the browser's broken-image
   * mark in the middle of a wall of cards.
   */
  test('a picture that fails to load leaves the card without one', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    const cards = page.locator('.dc-card')
    const pictures = page.locator('.dc-card__image')
    const drawn = await pictures.count()
    expect(drawn).toBeGreaterThan(0)

    // The fixture's pictures are data URIs, so failing one means saying what
    // the browser would have said about a file that had moved.
    await pictures.first().evaluate((image) => image.dispatchEvent(new Event('error')))

    await expect(pictures).toHaveCount(drawn - 1)
    // And every card is still a card, the one that lost its picture included.
    await expect(page.locator('.dc-card__primary')).toHaveCount(await cards.count())
  })
})
