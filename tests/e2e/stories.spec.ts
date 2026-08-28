import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory } from './story'

/**
 * Walks every story in the Storybook index. This is the net that catches a
 * schema, view or state combination nobody wrote a specific test for: each
 * story must render its shell and must not log an error while doing so.
 */

interface IndexEntry {
  id: string
  type: string
  title: string
  name: string
}

async function storyIds(page: Page): Promise<IndexEntry[]> {
  const response = await page.request.get('/index.json')
  expect(response.ok()).toBe(true)
  const index = (await response.json()) as { entries: Record<string, IndexEntry> }
  return Object.values(index.entries).filter((entry) => entry.type === 'story')
}

test('the index lists the expected story groups', async ({ page }) => {
  const stories = await storyIds(page)
  const titles = new Set(stories.map((story) => story.title))
  expect(titles).toEqual(
    new Set([
      'Shell / Data Shell',
      'Schemas / Same Shell',
      'Routing / URL Bound',
      'Parts / Controls',
      'Window / Panel Grid',
    ]),
  )
  expect(stories.length).toBeGreaterThanOrEqual(30)
})

test('every story renders without logging an error', async ({ page }) => {
  const stories = await storyIds(page)
  const failures: string[] = []

  for (const story of stories) {
    const problems: string[] = []
    const onConsole = (message: { type(): string; text(): string }) => {
      if (message.type() === 'error') problems.push(message.text())
    }
    const onPageError = (error: Error) => problems.push(error.message)

    page.on('console', onConsole)
    page.on('pageerror', onPageError)

    try {
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story`)
      // Parts stories render a bare control, but still inside `.dc-shell` for
      // its tokens, so one selector covers every story.
      await page.locator('.dc-shell').first().waitFor({ state: 'visible', timeout: 15_000 })
    } catch (error) {
      problems.push(`did not render: ${(error as Error).message}`)
    } finally {
      page.off('console', onConsole)
      page.off('pageerror', onPageError)
    }

    // Vite's dev-server noise is not the component's fault.
    const real = problems.filter(
      (text) => !/favicon|Failed to load resource: the server responded with a status of 404/i.test(text),
    )
    if (real.length) failures.push(`${story.id}: ${real.join(' | ')}`)
  }

  expect(failures, failures.join('\n')).toEqual([])
})

test('every schema story renders rows with its own vocabulary', async ({ page }) => {
  const cases: Array<[string, string[]]> = [
    // Unscoped stories say "Everything"; the rest name the entity filtered to.
    ['schemas-same-shell--i-radar', ['iRadar', 'Everything']],
    ['schemas-same-shell--everything-across-kinds', ['Commerce', 'Everything']],
    ['schemas-same-shell--lego', ['LEGO', 'Sets']],
    ['schemas-same-shell--commerce', ['Commerce', 'Test results']],
    ['schemas-same-shell--battle-sim', ['Battle-sim', 'Runs']],
    ['schemas-same-shell--lego-grid', ['LEGO', 'Colors']],
    ['schemas-same-shell--shared-logs-entity', ['Commerce', 'Logs']],
    ['schemas-same-shell--shared-settings-entity', ['LEGO', 'Settings']],
  ]

  for (const [id, expected] of cases) {
    await gotoStory(page, id)
    for (const text of expected) {
      await expect(page.locator('.dc-header'), id).toContainText(text)
    }
    // Something is actually listed, in whichever view the story chose.
    const rendered = page.locator(
      '.dc-list__row, .dc-card, .dc-tile, .dc-table tbody tr, .dc-link, .dc-preview__card, .dc-type__row',
    )
    expect(await rendered.count(), id).toBeGreaterThan(0)
  }
})

test('no story makes the page scroll sideways', async ({ page }) => {
  const stories = await storyIds(page)
  const offenders: string[] = []

  for (const story of stories) {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`)
    await page.locator('.dc-shell').first().waitFor({ state: 'visible' })
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    if (overflows) offenders.push(story.id)
  }

  expect(offenders, offenders.join(', ')).toEqual([])
})

test.describe('narrow viewport', () => {
  test.use({ viewport: { width: 420, height: 780 } })

  test('the header stays usable and the panel still opens', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-as-list')
    await expect(page.locator('.dc-header__summary')).toBeVisible()
    // The scope survives the narrow layout even though the domain name does not.
    await expect(page.locator('.dc-header__crumb-root')).toBeVisible()

    await page.locator('.dc-header__trigger').click()
    await expect(page.locator('.dc-panel')).toBeVisible()

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    expect(overflows).toBe(false)
  })

  test('the table view scrolls in its own box, not the page', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--table-view')
    await expect(page.locator('.dc-table')).toBeVisible()
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    expect(overflows).toBe(false)
  })
})
