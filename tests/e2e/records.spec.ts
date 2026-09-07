import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { chooseScope, gotoStory, listRows, stepPage, viewSelect } from './story'

/**
 * The bar over a type's own list: make one, tick some, and copy or delete what
 * is ticked. Every control on it is named by the entity, and the shell carries
 * none of them out — each is a request, reported with the selection it is for.
 */

const ACTIONS = 'shell-data-shell--entity-actions'
const TABLE = 'shell-data-shell--entity-actions-table'
const GRID = 'shell-data-shell--entity-actions-grid'
const PAGED = 'shell-data-shell--entity-actions-paged'
const CREATE_ONLY = 'shell-data-shell--entity-actions-create-only'
const SELECTABLE = 'shell-data-shell--selectable-rows'
const HOME = 'shell-data-shell--home'
const ENTITY = 'shell-data-shell--entity-list'

const bar = (page: Page) => page.locator('.dc-actions')
const ops = (page: Page) => bar(page).locator('.dc-actions__op')
const op = (page: Page, name: string) => bar(page).getByRole('button', { name })
const readout = (page: Page) => bar(page).locator('.dc-actions__count')
const allTick = (page: Page) => bar(page).locator('.dc-tick')
const rowTicks = (page: Page) => page.locator('.dc-list__row .dc-tick')

/** What the story says it was last asked to do, from the header bar. */
const asked = (page: Page) => page.locator('.sb-asked')

test.describe('Records — the bar is what the type says it is', () => {
  test('a type that names all three offers all three', async ({ page }) => {
    await gotoStory(page, ACTIONS)
    await expect(ops(page)).toHaveText(['+ Start new…', 'Duplicate', 'Delete'])
  })

  test('a type that names only making one offers only that, and no ticks', async ({ page }) => {
    await gotoStory(page, CREATE_ONLY)
    await expect(ops(page)).toHaveText(['+ Add a scraper'])
    await expect(rowTicks(page)).toHaveCount(0)
    await expect(allTick(page)).toHaveCount(0)
  })

  test('a schema that names nothing has no bar at all', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await expect(bar(page)).toHaveCount(0)
  })

  test('the home screen has none either: its cards are types, not records', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(bar(page)).toHaveCount(0)
  })

  test('naming an operation for a selection is what offers the ticks', async ({ page }) => {
    await gotoStory(page, ACTIONS)
    const rows = await listRows(page).count()
    expect(rows).toBeGreaterThan(0)
    await expect(rowTicks(page)).toHaveCount(rows)
  })
})

test.describe('Records — ticking', () => {
  test('a tick does not open the record it is on', async ({ page }) => {
    await gotoStory(page, ACTIONS)
    await rowTicks(page).first().click()
    await expect(readout(page)).toHaveText('1 selected')
    // Still the list: the click stopped at the tick.
    await expect(page.locator('.dc-list')).toBeVisible()
  })

  test('the count is of the records ticked, and clearing empties it', async ({ page }) => {
    await gotoStory(page, ACTIONS)
    await expect(readout(page)).toHaveText('Select all')

    await rowTicks(page).nth(0).click()
    await rowTicks(page).nth(1).click()
    await expect(readout(page)).toHaveText('2 selected')

    await bar(page).getByRole('button', { name: 'Clear' }).click()
    await expect(readout(page)).toHaveText('Select all')
    await expect(rowTicks(page).nth(0)).not.toBeChecked()
  })

  test('the tick at the head of the bar takes the whole page, and gives it back', async ({
    page,
  }) => {
    await gotoStory(page, ACTIONS)
    const rows = await listRows(page).count()

    await allTick(page).click()
    await expect(readout(page)).toHaveText(`${rows} selected`)
    await expect(rowTicks(page).nth(0)).toBeChecked()
    await expect(rowTicks(page).last()).toBeChecked()

    await allTick(page).click()
    await expect(readout(page)).toHaveText('Select all')
    await expect(rowTicks(page).nth(0)).not.toBeChecked()
  })

  test('part of a page ticked is neither checked nor unchecked', async ({ page }) => {
    await gotoStory(page, ACTIONS)
    await rowTicks(page).first().click()
    expect(await allTick(page).evaluate((el) => (el as HTMLInputElement).indeterminate)).toBe(true)

    await allTick(page).click()
    expect(await allTick(page).evaluate((el) => (el as HTMLInputElement).indeterminate)).toBe(false)
    await expect(allTick(page)).toBeChecked()
  })
})

test.describe('Records — a selection is of records, not of what is on screen', () => {
  test('it survives a change of view', async ({ page }) => {
    await gotoStory(page, ACTIONS)
    await rowTicks(page).nth(0).click()
    await rowTicks(page).nth(1).click()

    await viewSelect(page).selectOption('table')
    await expect(page.locator('.dc-table')).toBeVisible()
    await expect(readout(page)).toHaveText('2 selected')
    await expect(page.locator('.dc-table__row .dc-tick').nth(0)).toBeChecked()
  })

  test('it survives paging, and the page tick then speaks for the page alone', async ({ page }) => {
    await gotoStory(page, PAGED)
    await rowTicks(page).first().click()
    await expect(readout(page)).toHaveText('1 selected')

    await stepPage(page, 'Next')
    // The ticked record is on the page behind; this page holds none of it.
    await expect(readout(page)).toHaveText('1 selected')
    await expect(rowTicks(page).first()).not.toBeChecked()
    await expect(allTick(page)).not.toBeChecked()
  })

  test('listing another type empties it, the operations being that type’s own', async ({
    page,
  }) => {
    await gotoStory(page, ACTIONS)
    await rowTicks(page).first().click()
    await expect(readout(page)).toHaveText('1 selected')

    await chooseScope(page, 'Scrapers')
    await expect(viewSelect(page)).toBeVisible()

    await chooseScope(page, 'Searches')
    await expect(readout(page)).toHaveText('Select all')
  })
})

test.describe('Records — the operations are requests', () => {
  test('with nothing ticked they say so rather than pretending', async ({ page }) => {
    await gotoStory(page, ACTIONS)
    await expect(op(page, 'Duplicate')).toBeDisabled()
    await expect(op(page, 'Delete')).toBeDisabled()

    await rowTicks(page).first().click()
    await expect(op(page, 'Duplicate 1')).toBeEnabled()
    await expect(op(page, 'Delete 1')).toBeEnabled()
  })

  test('each reports the selection it is for, and the shell does nothing else', async ({ page }) => {
    await gotoStory(page, ACTIONS)
    await expect(asked(page)).toHaveText('nothing asked for yet')

    const before = await listRows(page).count()
    await rowTicks(page).nth(0).click()
    await rowTicks(page).nth(1).click()

    await op(page, 'Delete 2').click()
    await expect(asked(page)).toHaveText('asked to delete 2')
    // Nothing was deleted: the shell reported the request and stopped.
    await expect(listRows(page)).toHaveCount(before)
    await expect(readout(page)).toHaveText('2 selected')

    await op(page, 'Duplicate 2').click()
    await expect(asked(page)).toHaveText('asked to duplicate 2')
    await expect(listRows(page)).toHaveCount(before)
  })

  test('making one is the same request the type’s card makes', async ({ page }) => {
    await gotoStory(page, ACTIONS)
    // The `+` is aria-hidden, so what names this button is the label alone.
    await op(page, 'Start new…').click()
    await expect(asked(page)).toHaveText('asked for a new Searches')
    // Still listing searches: the button neither opened nor navigated.
    await expect(page.locator('.dc-list')).toBeVisible()
  })
})

test.describe('Records — ticks in every view that draws rows', () => {
  test('a table gets a tick cell of its own, ahead of the declared columns', async ({ page }) => {
    await gotoStory(page, TABLE)
    const rows = await page.locator('.dc-table__row').count()
    await expect(page.locator('.dc-table__row .dc-tick')).toHaveCount(rows)
    // First cell of the row, and not one of the schema's columns.
    await expect(page.locator('.dc-table__row').first().locator('td').first()).toHaveClass(
      /dc-table__pick/,
    )
  })

  test('a table row still opens when the cell beside the tick is pressed', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('.dc-table__primary').click()
    // Reported, so nothing moves — and nothing was ticked by the press.
    await expect(readout(page)).toHaveText('Select all')
  })

  test('a card, a link and the one record a preview shows each carry one', async ({ page }) => {
    await gotoStory(page, ACTIONS)

    await viewSelect(page).selectOption('cards')
    const cards = await page.locator('.dc-card').count()
    expect(cards).toBeGreaterThan(0)
    await expect(page.locator('.dc-card .dc-tick')).toHaveCount(cards)

    await viewSelect(page).selectOption('links')
    const links = await page.locator('.dc-link').count()
    expect(links).toBeGreaterThan(0)
    await expect(page.locator('.dc-links__item .dc-tick')).toHaveCount(links)

    await viewSelect(page).selectOption('preview')
    // One record at a time, so one tick — and ticking it counts that record.
    await expect(page.locator('.dc-preview__card .dc-tick')).toHaveCount(1)
    await page.locator('.dc-preview__card .dc-tick').click()
    await expect(readout(page)).toHaveText('1 selected')
  })

  test('a tile carries one in its corner', async ({ page }) => {
    await gotoStory(page, GRID)
    const tiles = await page.locator('.dc-tile').count()
    expect(tiles).toBeGreaterThan(0)
    await expect(page.locator('.dc-grid__tick')).toHaveCount(tiles)

    await page.locator('.dc-grid__tick').first().click()
    await expect(readout(page)).toHaveText('1 selected')
  })
})

test.describe('Records — ticks a host asked for outright', () => {
  test('`selectable` offers them where the schema names no operation', async ({ page }) => {
    await gotoStory(page, SELECTABLE)
    await expect(bar(page)).toBeVisible()
    await expect(ops(page)).toHaveCount(0)

    await rowTicks(page).first().click()
    await expect(readout(page)).toHaveText('1 selected')
  })
})
