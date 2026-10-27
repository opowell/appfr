import { expect, test } from '@playwright/test'
import {
  expectPage,
  gotoStory,
  listRows,
  pager,
  rowOrdinals,
  searchBox,
  searchField,
  terms,
  viewSelect,
} from './story'

/*
 * What a host can ask the shell for and gets nothing of unless it does: a
 * loading state, a record's own cards, views per screen, a brand mark, rows
 * that live somewhere, a page of its own under the bar, a search field with
 * an edge, and long chips facets that stay a panel's height.
 */

const LOADING = 'shell-data-shell--loading-keeps-the-page'
const RECORD_SLOT = 'shell-data-shell--record-slot'
const BRAND = 'shell-data-shell--brand-mark'
const LINK_ROWS = 'shell-data-shell--link-rows'
const LINK_ROWS_NARROW = 'shell-data-shell--link-rows-that-narrow'
const HOST_PAGE = 'shell-data-shell--host-page'
const SEARCH_TOKENS = 'shell-data-shell--search-field-tokens'
const ENTITY_LIST = 'shell-data-shell--entity-list'

test.describe('loading', () => {
  test('a link’s page survives the data still being on its way', async ({ page }) => {
    await gotoStory(page, LOADING)
    await expect(page.locator('.dc-results__state--loading')).toHaveText('Loading…')
    await expect(pager(page)).toHaveCount(0)

    // The payloads land: the page the link named, not page 1.
    await expectPage(page, '3 / 4')
    await expect(page.locator('.dc-results__state--loading')).toHaveCount(0)
    await expect(listRows(page)).toHaveCount(12)
    expect((await rowOrdinals(page))[0]).toBe('25')
  })
})

test.describe('a record’s own cards', () => {
  test('one per record the query names, in its order, on a screen offering cards alone', async ({ page }) => {
    await gotoStory(page, RECORD_SLOT)
    const cards = page.locator('.sb-record-card')
    await expect(cards).toHaveCount(2)
    await expect(cards.nth(0)).toContainText('Sets: sets_10007')
    await expect(cards.nth(1)).toContainText('Sets: sets_10404')
    // The views function said cards, and one view is no chooser.
    await expect(page.locator('.dc-types')).toBeVisible()
    await expect(page.locator('.dc-header__view-select')).toHaveCount(0)
  })

  test('lifting a record’s part takes its card with it', async ({ page }) => {
    await gotoStory(page, RECORD_SLOT)
    await terms(page).first().click()
    const cards = page.locator('.sb-record-card')
    await expect(cards).toHaveCount(1)
    await expect(cards).toContainText('Sets: sets_10404')

    await terms(page).first().click()
    await expect(cards).toHaveCount(0)
    // Nothing named, so the function offers both again.
    await expect(viewSelect(page)).toBeVisible()
  })
})

test.describe('brand', () => {
  test('the mark is drawn in place of the name, which is still the bar’s text', async ({ page }) => {
    await gotoStory(page, BRAND)
    const domain = page.locator('.dc-header__domain')
    await expect(domain.locator('svg.sb-brand')).toBeVisible()
    await expect(domain.locator('.dc-header__brand')).toHaveAttribute('aria-hidden', 'true')
    await expect(domain).toHaveText('iRadar')
    // Only the mark takes room, and the room its hover tint is drawn in: the
    // name is visually hidden.
    const box = await domain.boundingBox()
    const mark = await domain.locator('svg.sb-brand').boundingBox()
    expect(box!.width - mark!.width).toBeLessThanOrEqual(12)
  })

  test('without it the name is drawn as text, as it always was', async ({ page }) => {
    await gotoStory(page, ENTITY_LIST)
    const domain = page.locator('.dc-header__domain')
    await expect(domain).toHaveText('iRadar')
    await expect(domain.locator('*')).toHaveCount(0)
  })
})

test.describe('rows that live somewhere', () => {
  test.beforeEach(async ({ context }) => {
    await context.route('https://example.com/**', (route) =>
      route.fulfill({ status: 200, contentType: 'text/html', body: '<title>away</title>' }),
    )
  })

  test('a type that is reported opens the record where it lives, in a new tab', async ({ page, context }) => {
    await gotoStory(page, LINK_ROWS)
    const name = page.locator('.dc-list__open').first()
    await expect(name).toHaveAttribute('href', /^https:\/\/example\.com\/items\//)
    const href = await name.getAttribute('href')

    const opened = context.waitForEvent('page')
    await name.click()
    const away = await opened
    await expect.poll(() => away.url()).toBe(href)
    // The shell stayed where it was, and no `↗` doubles the name.
    expect(page.url()).toContain('link-rows')
    await expect(page.locator('.dc-open')).toHaveCount(0)
  })

  test('a type that narrows goes on narrowing, with ↗ beside the name', async ({ page }) => {
    await gotoStory(page, LINK_ROWS_NARROW)
    const mark = page.locator('.dc-table__name .dc-open').first()
    await expect(mark).toHaveAttribute('href', /^https:\/\/example\.com\/sets\//)
    await expect(mark).toHaveAttribute('target', '_blank')

    await page.locator('.dc-table__name .dc-table__open').first().click()
    await expect(terms(page)).toHaveCount(1)
  })
})

test.describe('a page of the host’s', () => {
  test('replaces the results under the same bar, which still edits the query', async ({ page }) => {
    await gotoStory(page, HOST_PAGE)
    await expect(page.locator('.sb-host-page')).toBeVisible()
    await expect(page.locator('.dc-results')).toHaveCount(0)
    await expect(pager(page)).toHaveCount(0)
    await expect(page.locator('.dc-header__view-select')).toHaveCount(0)
    await expect(page.locator('.sb-host-page__query')).toHaveText('e=searches q=recall')

    await terms(page).filter({ hasText: 'recall' }).click()
    await expect(page.locator('.sb-host-page__query')).toHaveText('e=searches q=')
  })
})

test.describe('search field tokens', () => {
  test('the box takes the host’s fill, edge and placeholder', async ({ page }) => {
    await gotoStory(page, SEARCH_TOKENS)
    const shell = page.locator('.dc-shell')
    const expected = await shell.evaluate((element) => {
      const probe = document.createElement('div')
      probe.style.background = 'var(--dc-bg-1)'
      probe.style.borderColor = 'var(--dc-line)'
      element.append(probe)
      const style = getComputedStyle(probe)
      const read = { fill: style.backgroundColor, border: style.borderTopColor }
      probe.remove()
      return read
    })
    const box = await searchField(page).evaluate((element) => {
      const style = getComputedStyle(element)
      return { fill: style.backgroundColor, border: style.borderTopColor }
    })
    expect(box).toEqual(expected)
  })

  test('without them the box is bare, as it always was', async ({ page }) => {
    await gotoStory(page, ENTITY_LIST)
    const box = await searchField(page).evaluate((element) => {
      const style = getComputedStyle(element)
      return { fill: style.backgroundColor, border: style.borderTopColor, image: style.backgroundImage }
    })
    expect(box).toEqual({ fill: 'rgba(0, 0, 0, 0)', border: 'rgba(0, 0, 0, 0)', image: 'none' })
  })
})

test.describe('brand on a narrow shell', () => {
  test.use({ viewport: { width: 640, height: 700 } })

  test('goes where the name goes', async ({ page }) => {
    await gotoStory(page, BRAND)
    await expect(page.locator('.dc-header__domain')).toBeHidden()
  })
})

test.describe('a page that is not about the query', () => {
  const DETACHED = 'shell-data-shell--detached-page'

  test('the bar reads Everything, not the page’s own parameters', async ({ page }) => {
    await gotoStory(page, DETACHED)
    await expect(page.locator('.sb-detached-page h2')).toHaveText('Coverage report — run-7')
    await expect(page.locator('.sb-host-page__location')).toHaveText('/crawl-report?crawl=run-7&q=recall')
    await expect(terms(page)).toHaveCount(0)
    await expect(page.locator('.dc-results')).toHaveCount(0)
  })

  test('the first edit to the bar goes back to the list, with it applied', async ({ page }) => {
    await gotoStory(page, DETACHED)
    await searchBox(page).fill('digest')
    await searchBox(page).press('Enter')

    await expect(page.locator('.sb-detached-page')).toHaveCount(0)
    await expect(page.locator('.dc-results')).toBeVisible()
    await expect(terms(page)).toHaveText(['digest'])
  })
})
