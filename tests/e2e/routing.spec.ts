import { expect, test } from '@playwright/test'
import {
  gotoStory,
  listRows,
  openPanel,
  pageReadout,
  pickEntity,
  scopeSelect,
  shellParams,
  stepPage,
  terms,
  trigger,
  viewSelect,
} from './story'

/**
 * These run against the `Routing / URL Bound` stories, which drive the real
 * address bar. Everything here is checked against `page.url()` — the actual
 * browser location, not an internal ref.
 */

const LIVE = 'routing-url-bound--live-url'
const LIVE_OPEN = 'routing-url-bound--live-url-panel-open'

test.describe('URL — the query is the route', () => {
  test('the home screen has no parameters of its own', async ({ page }) => {
    await gotoStory(page, LIVE)
    expect(shellParams(page.url())).toEqual({})
    await expect(viewSelect(page)).toHaveValue('cards')
  })

  test('a view change appears in the URL', async ({ page }) => {
    await gotoStory(page, LIVE)
    await openPanel(page)
    await page.getByRole('radio', { name: 'Table', exact: true }).click()
    await expect(page.locator('.dc-table')).toBeVisible()
    expect(shellParams(page.url())).toEqual({ v: 'table' })
  })

  test('an entity filter appears in the URL, and lifting it removes it', async ({ page }) => {
    await gotoStory(page, LIVE)
    await openPanel(page)

    await pickEntity(page, 'Scrapers')
    await expect(scopeSelect(page)).toHaveValue('scrapers')
    expect(shellParams(page.url())).toEqual({ e: 'scrapers' })

    await page.locator('.dc-entity--all').click()
    await expect(viewSelect(page)).toHaveValue('cards')
    expect(shellParams(page.url())).toEqual({})
  })

  test('logs and settings are filtered to like any other entity', async ({ page }) => {
    await gotoStory(page, LIVE)
    await openPanel(page)

    await pickEntity(page, 'Settings')
    expect(shellParams(page.url())).toEqual({ e: 'settings' })
    await expect(scopeSelect(page)).toHaveValue('settings')
  })

  test('facets appear in the URL, with readable separators', async ({ page }) => {
    await gotoStory(page, LIVE_OPEN)
    await pickEntity(page, 'Searches')
    await page.locator('.dc-chip', { hasText: 'running' }).first().click()
    await page.locator('.dc-chip', { hasText: 'paused' }).first().click()
    await expect(scopeSelect(page)).toHaveValue('searches')
    await expect(terms(page)).toHaveText(['state:running', 'state:paused'])

    expect(shellParams(page.url())).toEqual({ e: 'searches', f_state: 'running,paused' })
    // The comma is left literal rather than percent-encoded.
    expect(page.url()).toContain('f_state=running,paused')
  })

  test('a committed expression appears in the URL', async ({ page }) => {
    await gotoStory(page, LIVE_OPEN)
    await page.locator('.dc-expression').fill('price < 40')
    await page.locator('.dc-button--primary').click()
    // Three tokens as typed, one term as parsed: `price < 40` is a comparison.
    await expect(terms(page)).toHaveText(['price<40'])
    expect(shellParams(page.url()).q).toBe('price < 40')
  })

  test('sort field and direction appear in the URL', async ({ page }) => {
    await gotoStory(page, LIVE_OPEN)
    await page.getByRole('radio', { name: 'metric', exact: true }).click()
    await page.locator('.dc-button--icon').click()
    expect(shellParams(page.url())).toEqual({ s: 'metric1', d: 'asc' })
  })

  test('leaves the parameters it does not own alone', async ({ page }) => {
    // Storybook's own `id` and `viewMode` live in the same query string.
    await gotoStory(page, LIVE)
    await openPanel(page)
    await page.getByRole('radio', { name: 'Table', exact: true }).click()

    const params = new URL(page.url()).searchParams
    expect(params.get('id')).toBe(LIVE)
    expect(params.get('viewMode')).toBe('story')
    expect(params.get('v')).toBe('table')
  })
})

test.describe('URL — reload and history', () => {
  test('a reload restores the same query', async ({ page }) => {
    await gotoStory(page, LIVE_OPEN)
    await pickEntity(page, 'Searches')
    await page.locator('.dc-chip', { hasText: 'running' }).first().click()
    await page.getByRole('radio', { name: 'Table', exact: true }).click()
    const before = page.url()

    await page.reload()
    await page.locator('.dc-shell').first().waitFor({ state: 'visible' })

    expect(page.url()).toBe(before)
    await expect(page.locator('.dc-table')).toBeVisible()
    await expect(scopeSelect(page)).toHaveValue('searches')
    await expect(terms(page)).toHaveText(['state:running'])
  })

  test('a pasted URL renders that query without any interaction', async ({ page }) => {
    await gotoStory(page, LIVE, '&e=items&v=grid&f_kind=pdf&s=metric1')
    await expect(page.locator('.dc-grid')).toBeVisible()
    await expect(scopeSelect(page)).toHaveValue('items')
    await expect(terms(page)).toHaveText(['kind:pdf'])
  })

  test('Back returns to the previous query', async ({ page }) => {
    await gotoStory(page, LIVE)
    await openPanel(page)

    await page.getByRole('radio', { name: 'List', exact: true }).click()
    await expect(page.locator('.dc-list')).toBeVisible()

    await page.getByRole('radio', { name: 'Table', exact: true }).click()
    await expect(page.locator('.dc-table')).toBeVisible()

    await page.goBack()
    await expect(page.locator('.dc-list')).toBeVisible()
    expect(shellParams(page.url())).toEqual({ v: 'list' })

    await page.goForward()
    await expect(page.locator('.dc-table')).toBeVisible()
  })

  test('Back undoes an entity filter, returning to everything', async ({ page }) => {
    await gotoStory(page, 'routing-url-bound--live-url-list')
    const everything = await listRows(page).count()

    await openPanel(page)
    await pickEntity(page, 'Logs')
    await expect(scopeSelect(page)).toHaveValue('logs')

    await page.goBack()
    await expect(viewSelect(page)).toHaveValue('list')
    await expect(listRows(page)).toHaveCount(everything)
  })

  test('nudging facets does not fill the history with one entry per chip', async ({ page }) => {
    await gotoStory(page, LIVE)
    await openPanel(page)
    // One pushed entry for the entity, then three facet edits that replace.
    await pickEntity(page, 'Searches')
    await expect(scopeSelect(page)).toHaveValue('searches')

    await page.locator('.dc-chip', { hasText: 'running' }).first().click()
    await page.locator('.dc-chip', { hasText: 'paused' }).first().click()
    await page.locator('.dc-chip', { hasText: 'hourly' }).first().click()
    await expect(terms(page)).toHaveText([
      'state:running',
      'state:paused',
      'schedule:hourly',
    ])

    // A single Back should land before the facets, not step through them.
    await page.goBack()
    await expect(viewSelect(page)).toHaveValue('cards')
    expect(shellParams(page.url())).toEqual({})
  })
})

test.describe('URL — the page is in it too', () => {
  const PAGED = 'routing-url-bound--live-url-paged'

  test('paging writes p, and the first page is its absence', async ({ page }) => {
    await gotoStory(page, PAGED)
    // Twelve of forty-eight searches, and a clean URL on the first page.
    await expect(listRows(page)).toHaveCount(12)
    await expect(pageReadout(page)).toHaveText('1 / 4')
    expect(shellParams(page.url())).toEqual({})

    await stepPage(page, 'Next')
    expect(shellParams(page.url())).toEqual({ p: '2' })

    await stepPage(page, 'Previous')
    expect(shellParams(page.url())).toEqual({})
  })

  test('a page is a destination, so Back returns to the one before', async ({ page }) => {
    await gotoStory(page, PAGED)
    await stepPage(page, 'Next')
    await stepPage(page, 'Next')
    expect(shellParams(page.url())).toEqual({ p: '3' })

    await page.goBack()
    await expect(pageReadout(page)).toHaveText('2 / 4')
    expect(shellParams(page.url())).toEqual({ p: '2' })
  })

  test('a pasted page loads straight into it', async ({ page }) => {
    await gotoStory(page, PAGED, '&p=3')
    await expect(pageReadout(page)).toHaveText('3 / 4')
    expect(shellParams(page.url())).toEqual({ p: '3' })
  })

  test('a change to what matched drops the page from the URL', async ({ page }) => {
    await gotoStory(page, PAGED, '&p=3')
    await openPanel(page)
    await page.locator('.dc-chip', { hasText: 'running' }).first().click()
    // Back to the first page of the narrowed results, so `p` goes with it.
    expect(shellParams(page.url())).toEqual({ f_state: 'running' })
  })
})

test.describe('URL — what stays out of it', () => {
  test('pinning is app state and does not touch the URL', async ({ page }) => {
    await gotoStory(page, 'routing-url-bound--live-url-pinnable')
    const star = page.locator('.dc-star').first()
    await star.click()
    await expect(star).toHaveAttribute('aria-pressed', 'true')
    expect(shellParams(page.url())).toEqual({})
  })

  test('opening the panel is ephemeral and does not touch the URL', async ({ page }) => {
    await gotoStory(page, LIVE)
    await trigger(page).click()
    await expect(page.locator('.dc-panel')).toBeVisible()
    expect(shellParams(page.url())).toEqual({})
  })
})

test.describe('URL — landing on an entity instead of home', () => {
  test('opens on that entity with a clean URL, and can still widen out', async ({ page }) => {
    await gotoStory(page, 'routing-url-bound--live-url-lands-on-entity')
    await expect(scopeSelect(page)).toHaveValue('searches')
    expect(shellParams(page.url())).toEqual({})

    await openPanel(page)
    await page.locator('.dc-entity--all').click()
    await expect(scopeSelect(page)).toHaveValue('')
    // The whole corpus has to be spelled out when an entity is the default.
    expect(shellParams(page.url())).toEqual({ e: '*' })
  })
})
