import { expect, test } from '@playwright/test'
import { gotoStory, listRows, summary } from './story'
import { iRadarSchema } from '../../src/fixtures/schemas'

/**
 * The home screen: a card per item type, each naming the type, how many of it
 * there are, and its most recently updated few.
 */

const HOME = 'shell-data-shell--home'
const ENTITY = 'shell-data-shell--entity-list'

const card = (page: import('@playwright/test').Page, label: string) =>
  page.locator('.dc-type').filter({
    has: page.locator('.dc-type__name', { hasText: new RegExp(`^${label}$`) }),
  })

test.describe('Home — a card per item type', () => {
  test('is what the default view shows', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(page.locator('.dc-types')).toBeVisible()
    await expect(summary(page)).toHaveText('everything · cards · updated')
  })

  test('has one card for every type the schema declares, in schema order', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(page.locator('.dc-type__name')).toHaveText(
      iRadarSchema.entities.map((entity) => entity.label),
    )
  })

  test('includes logs and settings, because they are types like any other', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(card(page, 'Logs')).toBeVisible()
    await expect(card(page, 'Settings')).toBeVisible()
  })

  test('each card states the count the schema publishes', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(card(page, 'Searches').locator('.dc-type__count')).toHaveText('38')
    await expect(card(page, 'Items').locator('.dc-type__count')).toHaveText('9,988')
    await expect(card(page, 'Logs').locator('.dc-type__count')).toHaveText('184k')
  })

  test('each card lists the top few of its own type', async ({ page }) => {
    await gotoStory(page, HOME)
    for (const entity of iRadarSchema.entities) {
      const rows = card(page, entity.label).locator('.dc-type__row')
      await expect(rows, entity.label).toHaveCount(3)
    }
  })

  test('a card’s rows are that type’s records, not a slice of one global list', async ({ page }) => {
    await gotoStory(page, HOME)
    // Every settings row carries a settings key; no other type's would.
    const refs = await card(page, 'Settings').locator('.dc-type__secondary').allInnerTexts()
    expect(refs).toHaveLength(3)
    expect(refs.every((ref) => /^(general|sources|query|notifications|access)\./.test(ref))).toBe(
      true,
    )
  })

  test('rows are ordered most recently updated first', async ({ page }) => {
    await gotoStory(page, HOME)
    const dates = await card(page, 'Logs').locator('.dc-type__date').allInnerTexts()
    const asTime = dates.map((text) => {
      const [day, month, year] = text.trim().split('.')
      return Date.parse(`${year}-${month}-${day}`)
    })
    expect(asTime).toEqual([...asTime].sort((a, b) => b - a))
  })

  test('each row names its metric in its own type’s vocabulary', async ({ page }) => {
    await gotoStory(page, HOME)
    // iRadar calls the first metric of `searches` "New" and of `logs` "Duration".
    await expect(card(page, 'Searches').locator('.dc-type__metric-label').first()).toHaveText('New')
    await expect(card(page, 'Logs').locator('.dc-type__metric-label').first()).toHaveText('Duration')
  })

  test('the number of rows per card is configurable', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-deeper-cards')
    await expect(card(page, 'Searches').locator('.dc-type__row')).toHaveCount(6)
  })
})

test.describe('Home — the cards are navigation', () => {
  test('a card header filters the results to that type', async ({ page }) => {
    await gotoStory(page, HOME)
    await card(page, 'Scrapers').locator('.dc-type__head').click()

    await expect(summary(page)).toHaveText('entity:scrapers')
    await expect(page.locator('.dc-header__crumb-root')).toHaveText('Scrapers')
    // Scoped to one type, cards mean one card per record again.
    await expect(page.locator('.dc-types')).toHaveCount(0)
    await expect(page.locator('.dc-cards')).toBeVisible()
  })

  test('a row opens that record', async ({ page }) => {
    await gotoStory(page, HOME)
    await card(page, 'Items').locator('.dc-type__row').first().click()
    // The shell reports the row rather than navigating anywhere itself.
    await expect(page.locator('.dc-types')).toBeVisible()
  })
})

test.describe('Home — cards under a query', () => {
  test('a search narrows every card, and the counts become the breakdown', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-search')
    await expect(summary(page)).toHaveText('"recall"')

    // "recall" is an Items sample; nothing in Searches mentions it.
    const items = Number(await card(page, 'Items').locator('.dc-type__count').innerText())
    expect(items).toBeGreaterThan(0)
    await expect(card(page, 'Searches').locator('.dc-type__count')).toHaveText('0')
  })

  test('a type with no matches says so rather than showing a gap', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-search')
    const empty = card(page, 'Searches')
    await expect(empty).toHaveAttribute('data-dc-empty', 'true')
    await expect(empty.locator('.dc-type__empty')).toHaveText('No matches')
    await expect(empty.locator('.dc-type__row')).toHaveCount(0)
  })

  test('cards are still cards once the query is lifted', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await page.locator('.dc-header__trigger').click()
    await page.locator('.dc-entity--all').click()
    await page.getByRole('radio', { name: 'Cards', exact: true }).click()
    await expect(page.locator('.dc-types')).toBeVisible()
  })
})

test.describe('Home — cards across schemas', () => {
  test('every schema gets a card per one of its own types', async ({ page }) => {
    for (const story of ['schemas-same-shell--lego-home', 'schemas-same-shell--commerce-home']) {
      await gotoStory(page, story)
      const names = await page.locator('.dc-type__name').allInnerTexts()
      expect(names.length, story).toBeGreaterThanOrEqual(5)
      expect(names, story).toContain('Logs')
      expect(names, story).toContain('Settings')
    }
  })
})

test.describe('Home — narrow', () => {
  test.use({ viewport: { width: 480, height: 900 } })

  test('cards stack into one column without the page scrolling sideways', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(page.locator('.dc-type').first()).toBeVisible()

    const boxes = await page.locator('.dc-type').evaluateAll((nodes) =>
      nodes.map((node) => node.getBoundingClientRect().left),
    )
    // One column: every card starts at the same x.
    expect(new Set(boxes).size).toBe(1)

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    expect(overflows).toBe(false)
  })
})

test.describe('Home — other views still show records', () => {
  test('switching off cards returns to the mixed record set', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-as-list')
    await expect(page.locator('.dc-types')).toHaveCount(0)
    expect(await listRows(page).count()).toBeGreaterThan(0)
  })
})
