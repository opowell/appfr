import { expect, test } from '@playwright/test'
import { gotoStory, listRows } from './story'

const HOME = 'shell-data-shell--home'
const HOME_PREVIEW = 'shell-data-shell--home-as-preview'
const ENTITY = 'shell-data-shell--entity-list'

test.describe('Content — everything is in the results by default', () => {
  test('home shows records of every kind, logs and settings included', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-as-table')
    const kinds = new Set(await page.locator('.dc-table__entity').allInnerTexts())
    kinds.delete('Entity') // the column header
    expect(kinds).toContain('Searches')
    expect(kinds).toContain('Items')
    expect(kinds).toContain('Logs')
    expect(kinds).toContain('Settings')
  })

  test('the table gains an Entity column only when kinds are mixed', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-as-table')
    await expect(page.locator('.dc-table th.dc-table__entity')).toHaveCount(1)

    await gotoStory(page, 'shell-data-shell--table-view')
    await expect(page.locator('.dc-table th.dc-table__entity')).toHaveCount(0)
  })

  test('list rows carry their kind at home and drop it when scoped', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-as-list')
    expect(await page.locator('.dc-list__entity').count()).toBeGreaterThan(0)

    await gotoStory(page, ENTITY)
    await expect(page.locator('.dc-list__entity')).toHaveCount(0)
  })

  test('the preview card names the kind of the record it is showing', async ({ page }) => {
    await gotoStory(page, HOME_PREVIEW)
    await expect(page.locator('.dc-preview__entity')).toBeVisible()
    await expect(page.locator('.dc-preview__entity')).not.toBeEmpty()
  })

  test('a preview labels its fields in its own entity’s vocabulary', async ({ page }) => {
    await gotoStory(page, HOME_PREVIEW)
    const kind = await page.locator('.dc-preview__entity').innerText()
    const keys = await page.locator('.dc-preview__key').allInnerTexts()

    // Whatever kind came first, its field names are that entity's, not generic.
    // Compared upper-cased: whether a label is capsed is `--dc-caps`, a theme's
    // business, and this is about which words are there.
    const expected: Record<string, string> = {
      Logs: 'TRACE ID',
      Settings: 'KEY',
      Searches: 'EXPRESSION',
      Items: 'URL',
      Scrapers: 'HOST',
    }
    const said = keys.map((key) => key.toUpperCase())
    expect(said[0], `first record was ${kind}`).toBe(expected[kind])
    expect(said).not.toContain('REFERENCE')
  })

  test('the preview pager admits it is paging a subset of the matches', async ({ page }) => {
    await gotoStory(page, HOME_PREVIEW)
    // Fifty rows loaded out of two hundred and forty matched.
    await expect(page.locator('.dc-preview__pager')).toContainText('1 / 50 of 240')
  })

  test('the preview fills the content area rather than floating at the top', async ({ page }) => {
    await gotoStory(page, HOME_PREVIEW)
    const results = await page.locator('.dc-results').boundingBox()
    const card = await page.locator('.dc-preview__card').boundingBox()
    // Allow for the pager row and the view's own padding.
    expect(card!.height).toBeGreaterThan(results!.height - 120)
  })

  test('a search from home reaches records of any kind', async ({ page }) => {
    // "digest" only appears among settings.
    await gotoStory(page, 'shell-data-shell--search-everything')
    const entities = new Set(await page.locator('.dc-list__entity').allInnerTexts())
    expect(entities).toEqual(new Set(['Settings']))
    expect(await listRows(page).count()).toBeGreaterThan(0)
  })

  test('an expression can filter a kind out without leaving home', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--exclude-by-expression')
    const entities = new Set(await page.locator('.dc-list__entity').allInnerTexts())
    expect(entities).toEqual(new Set(['Logs']))
  })
})

test.describe('Content — the view renders what the query asked for', () => {
  const views: Array<[string, string, string]> = [
    ['list', ENTITY, '.dc-list'],
    ['cards', 'shell-data-shell--cards-view', '.dc-cards'],
    ['grid', 'shell-data-shell--grid-view', '.dc-grid'],
    ['table', 'shell-data-shell--table-view', '.dc-table'],
    ['links', 'shell-data-shell--links-view', '.dc-links'],
    ['preview', 'shell-data-shell--preview-view', '.dc-preview'],
  ]

  for (const [name, story, selector] of views) {
    test(`the ${name} view renders its own markup and no other`, async ({ page }) => {
      await gotoStory(page, story)
      await expect(page.locator(selector)).toBeVisible()

      for (const [otherName, , otherSelector] of views) {
        if (otherName === name) continue
        await expect(page.locator(otherSelector)).toHaveCount(0)
      }
    })
  }

  test('the default view is a card per type', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(page.locator('.dc-types')).toBeVisible()
    await expect(page.locator('.dc-preview')).toHaveCount(0)
  })

  test('the list view shows an ordinal, an identity pair, metrics and a state', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--short-page')
    const row = listRows(page).first()
    await expect(row.locator('.dc-list__ordinal')).toHaveText('01')
    await expect(row.locator('.dc-list__primary')).not.toBeEmpty()
    await expect(row.locator('.dc-list__secondary')).not.toBeEmpty()
    await expect(row.locator('.dc-meter')).toBeVisible()
    await expect(row.locator('.dc-pill')).toBeVisible()
  })

  test('honours the row limit', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--short-page')
    await expect(listRows(page)).toHaveCount(6)
  })
})

test.describe('Content — columns come from the schema', () => {
  test('the table names iRadar columns', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--table-view')
    const head = page.locator('.dc-table thead')
    await expect(head).toContainText('Search')
    await expect(head).toContainText('Expression')
    await expect(head).toContainText('New')
    await expect(head).toContainText('Results')
  })

  test('the same table names Commerce columns under a different schema', async ({ page }) => {
    await gotoStory(page, 'schemas-same-shell--commerce')
    const head = page.locator('.dc-table thead')
    await expect(head).toContainText('Result')
    await expect(head).toContainText('Result id')
    await expect(head).toContainText('Duration')
    await expect(head).toContainText('Diffs')
  })

  test('falls back to generic column names across every entity', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-as-table')
    const head = page.locator('.dc-table thead')
    await expect(head).toContainText('Item')
    await expect(head).toContainText('Reference')
    await expect(head).toContainText('Metric')
  })
})

test.describe('Content — sort order', () => {
  test('lists by recency descending by default', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--table-view')
    const dates = await page.locator('.dc-table tbody tr td:nth-child(6)').allInnerTexts()
    const asTime = dates.map((text) => {
      const [day, month, year] = text.trim().split('.')
      return Date.parse(`${year}-${month}-${day}`)
    })
    expect(asTime).toEqual([...asTime].sort((a, b) => b - a))
  })

  test('sorts names A→Z when ascending', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--sorted-by-name-ascending')
    const names = await page.locator('.dc-list__primary').allInnerTexts()
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })

  test('a table header click sorts by that column and reverses on a second', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--table-view')
    const nameHeader = page.locator('.dc-table th', { hasText: 'Search' }).first()

    await nameHeader.locator('.dc-table__sort').click()
    await expect(nameHeader).toHaveAttribute('aria-sort', 'descending')

    await nameHeader.locator('.dc-table__sort').click()
    await expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')

    const names = await page.locator('.dc-table__open').allInnerTexts()
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })

  test('sorts by either metric column, highest first', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--table-view')

    for (const [label, column] of [
      ['New', 4],
      ['Results', 5],
    ] as const) {
      const header = page.locator('.dc-table th', { hasText: label }).first()
      await header.locator('.dc-table__sort').click()
      await expect(header).toHaveAttribute('aria-sort', 'descending')

      const cells = await page.locator(`.dc-table tbody tr td:nth-child(${column})`).allInnerTexts()
      const values = cells.map((text) => Number(text.trim()))
      expect(values).toEqual([...values].sort((a, b) => b - a))
    }
  })
})

test.describe('Content — states other than a full result set', () => {
  test('reports no matches, and offers a way back', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--no-results')
    await expect(page.locator('.dc-results__state')).toContainText('Nothing matches this query')
    await expect(listRows(page)).toHaveCount(0)

    await page.locator('.dc-results__clear').click()
    await expect(listRows(page).first()).toBeVisible()
  })

  test('offers to widen to everything when a scoped query finds nothing', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--scoped-no-results')
    await expect(page.locator('.dc-results__clear')).toHaveText('Search everything instead')

    await page.locator('.dc-results__clear').click()
    await expect(page.locator('.dc-header__crumb-root')).toHaveText('Everything')
    await expect(listRows(page).first()).toBeVisible()
  })

  test('says it is working while an async source is in flight', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--loading-as-list')
    await expect(page.locator('.dc-results__state')).toContainText('Running query…')
  })

  test('the home cards say so too, rather than rendering blank', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--loading')
    await expect(page.locator('.dc-types__state')).toContainText('Running query…')
  })

  test('surfaces a source failure as an alert', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--source-error')
    const alert = page.getByRole('alert')
    await expect(alert).toContainText('Could not load results')
    await expect(alert).toContainText('The results service is unavailable')
  })
})

test.describe('Content — pinning', () => {
  test('offers no star unless the shell is pinnable', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await expect(page.locator('.dc-star')).toHaveCount(0)
  })

  test('a star toggles without opening the row', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pinnable')
    const star = page.locator('.dc-star').first()
    await expect(star).toHaveAttribute('aria-pressed', 'false')

    await star.click()
    await expect(star).toHaveAttribute('aria-pressed', 'true')
    // Still on the list: the click did not navigate anywhere.
    await expect(listRows(page).first()).toBeVisible()

    await star.click()
    await expect(star).toHaveAttribute('aria-pressed', 'false')
  })
})

test.describe('Content — embedding', () => {
  test('works in a box smaller than the page, without the page scrolling sideways', async ({
    page,
  }) => {
    await gotoStory(page, 'shell-data-shell--embedded')
    const shell = page.locator('.dc-shell')
    await expect(shell).toBeVisible()

    const box = await shell.boundingBox()
    expect(box!.height).toBeLessThan(500)

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflows).toBe(false)
  })
})
