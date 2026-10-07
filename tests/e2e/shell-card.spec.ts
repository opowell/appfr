import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'
import { gotoStory } from './story'

/**
 * A host's own cards that fold: a press on a `collapsible` card's head folds
 * it to the head alone, and the chevron at its start is the same press for a
 * keyboard.
 */

const FOLDING = 'shell-data-shell--record-page-folding-cards'
const RECORD = 'shell-data-shell--record-page'

/** A host card, by its heading — the record's own card is headed by its name. */
const hostCard = (page: Page, heading: string): Locator =>
  page.locator('.dc-shell-card').filter({
    has: page.locator('.dc-shell-card__head h2', { hasText: heading }),
  })

const cardBody = (card: Locator) => card.locator('.dc-shell-card__body')
const cardFoot = (card: Locator) => card.locator('.dc-shell-card__foot')
const cardToggle = (card: Locator) => card.locator('.dc-shell-card__toggle')

test.describe('ShellCard — folding', () => {
  test('a press on the head folds the card to the head, and another opens it', async ({ page }) => {
    await gotoStory(page, FOLDING)
    const build = hostCard(page, 'Build')
    const open = await build.boundingBox()

    await build.locator('.dc-shell-card__title').click()
    await expect(cardBody(build)).toBeHidden()
    await expect(cardFoot(build)).toBeHidden()
    await expect(build.locator('.dc-shell-card__head')).toBeVisible()
    await expect(cardToggle(build)).toHaveAttribute('aria-expanded', 'false')
    // The head and no more: not stretched to the open cards beside it.
    const folded = await build.boundingBox()
    expect(folded!.height).toBeLessThan(open!.height)
    const head = await build.locator('.dc-shell-card__head').boundingBox()
    expect(Math.abs(folded!.height - head!.height)).toBeLessThanOrEqual(2)

    await build.locator('.dc-shell-card__head').click({ position: { x: 200, y: 10 } })
    await expect(cardBody(build)).toBeVisible()
    await expect(cardToggle(build)).toHaveAttribute('aria-expanded', 'true')
  })

  test('the chevron is a button a keyboard reaches, naming what it folds', async ({ page }) => {
    await gotoStory(page, FOLDING)
    const build = hostCard(page, 'Build')
    const toggle = cardToggle(build)

    await expect(toggle).toHaveAccessibleName('Build')
    const controls = (await toggle.getAttribute('aria-controls'))!.split(' ')
    expect(controls).toEqual([
      await cardBody(build).getAttribute('id'),
      await cardFoot(build).getAttribute('id'),
    ])

    await toggle.focus()
    await page.keyboard.press('Enter')
    await expect(cardBody(build)).toBeHidden()
    await page.keyboard.press('Space')
    await expect(cardBody(build)).toBeVisible()
  })

  test('a press on a control in the head is that control’s, and folds nothing', async ({
    page,
  }) => {
    await gotoStory(page, FOLDING)
    const record = page.locator('.dc-shell-card').filter({ has: page.locator('.sb-record__duplicate') })
    await record.locator('.sb-record__duplicate').click()
    await expect(cardBody(record)).toBeVisible()
    await expect(cardToggle(record)).toHaveAttribute('aria-expanded', 'true')
  })

  test('a card asked to start folded does, and opens on a press', async ({ page }) => {
    await gotoStory(page, FOLDING)
    const metadata = hostCard(page, 'Metadata')
    await expect(cardBody(metadata)).toBeHidden()
    await cardToggle(metadata).click()
    await expect(cardBody(metadata)).toBeVisible()
  })

  test('a card bound with v-model:collapsed follows its owner both ways', async ({ page }) => {
    await gotoStory(page, FOLDING)
    const source = hostCard(page, 'Source')
    const fromOutside = page.locator('.sb-record__fold-source')

    await fromOutside.click()
    await expect(cardBody(source)).toBeHidden()
    await cardToggle(source).click()
    await expect(cardBody(source)).toBeVisible()
    // The owner heard the press, so its own control says the same thing.
    await expect(fromOutside).toHaveText(/Hide/)
  })

  test('a card not asked to fold does not, and offers no chevron', async ({ page }) => {
    await gotoStory(page, RECORD)
    const build = hostCard(page, 'Build')
    await expect(cardToggle(build)).toHaveCount(0)
    await build.locator('.dc-shell-card__title').click()
    await expect(cardBody(build)).toBeVisible()
  })
})
