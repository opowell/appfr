import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import {
  clickOutsidePanel,
  gotoStory,
  header,
  listRows,
  openPanel,
  pageReadout,
  pageStep,
  pager,
  panel,
  pickEntity,
  rowOrdinals,
  stepPage,
  summary,
  trigger,
} from './story'

const HOME = 'shell-data-shell--home'
const HOME_OPEN = 'shell-data-shell--home-panel-open'
const ENTITY = 'shell-data-shell--entity-list'

test.describe('Header — summary of the current query', () => {
  test('names the domain and what the results are scoped to', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(header(page)).toContainText('iRadar')
    // Nothing is filtered, so the scope is the whole corpus.
    await expect(page.locator('.dc-header__crumb-root')).toHaveText('Everything')
  })

  test('describes the home screen by what it is showing', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(summary(page)).toHaveText('everything · cards · updated')
    await expect(summary(page)).toHaveAttribute('data-dc-active', 'false')
  })

  test('names the entity once one is filtered to', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await expect(page.locator('.dc-header__crumb-root')).toHaveText('Searches')
    await expect(summary(page)).toHaveText('entity:searches')
    await expect(summary(page)).toHaveAttribute('data-dc-active', 'true')
  })

  test('describes a narrowed query by its terms', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--filtered-query')
    await expect(summary(page)).toHaveText('entity:searches · state:running · schedule:daily')
  })

  test('includes a committed expression in the summary', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--expression-query')
    await expect(summary(page)).toHaveText('entity:items · "release OR recall"')
  })

  test('counts the whole corpus at home and the entity population when scoped', async ({ page }) => {
    await gotoStory(page, HOME)
    // Five entities of forty-eight generated rows each.
    await expect(page.locator('.dc-header__count')).toHaveText('240')

    await gotoStory(page, ENTITY)
    await expect(page.locator('.dc-header__count')).toHaveText('38')
  })

  test('reports the match count once a facet narrows the entity', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--filtered-query')
    const filtered = Number(await page.locator('.dc-header__count').innerText())
    expect(filtered).toBeGreaterThan(0)
    expect(filtered).toBeLessThan(48)
  })

  test('follows the scope when it changes', async ({ page }) => {
    await gotoStory(page, HOME)
    await openPanel(page)
    await pickEntity(page, 'Items')
    await expect(page.locator('.dc-header__crumb-root')).toHaveText('Items')
    await expect(summary(page)).toHaveText('entity:items')
  })

  test('widens back to everything when the scope is lifted', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)
    await page.locator('.dc-entity--all').click()
    await expect(page.locator('.dc-header__crumb-root')).toHaveText('Everything')
    await expect(summary(page)).toHaveText('everything · list · updated')
  })
})

test.describe('Header — opening the expanded query view', () => {
  test('starts closed', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(panel(page)).toHaveCount(0)
    await expect(trigger(page)).toHaveAttribute('aria-expanded', 'false')
  })

  test('a click on the header opens the panel', async ({ page }) => {
    await gotoStory(page, HOME)
    await trigger(page).click()
    await expect(panel(page)).toBeVisible()
    await expect(trigger(page)).toHaveAttribute('aria-expanded', 'true')
  })

  test('the trigger points at the panel it controls', async ({ page }) => {
    await gotoStory(page, HOME)
    await openPanel(page)
    const controls = await trigger(page).getAttribute('aria-controls')
    expect(controls).toBeTruthy()
    await expect(panel(page)).toHaveAttribute('id', controls!)
  })

  test('a second click closes it', async ({ page }) => {
    await gotoStory(page, HOME)
    await openPanel(page)
    await trigger(page).click()
    await expect(panel(page)).toHaveCount(0)
  })

  test('a click outside closes it', async ({ page }) => {
    await gotoStory(page, HOME)
    await openPanel(page)
    await clickOutsidePanel(page)
    await expect(panel(page)).toHaveCount(0)
  })

  test('Escape closes it and focus returns to the header', async ({ page }) => {
    await gotoStory(page, HOME)
    await openPanel(page)
    await page.keyboard.press('Escape')
    await expect(panel(page)).toHaveCount(0)
    await expect(trigger(page)).toBeFocused()
  })

  test('the header is reachable and operable from the keyboard alone', async ({ page }) => {
    await gotoStory(page, HOME)
    await page.keyboard.press('Tab')
    await expect(trigger(page)).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(panel(page)).toBeVisible()
  })

  test('results stay behind the open panel rather than being replaced', async ({ page }) => {
    await gotoStory(page, HOME_OPEN)
    await expect(panel(page)).toBeVisible()
    await expect(page.locator('.dc-type').first()).toBeVisible()
  })
})

test.describe('Header — paging through the results', () => {
  /** Forty-eight searches, twelve to a page: four pages. */
  const PAGED = 'shell-data-shell--paged'
  const LATER = 'shell-data-shell--later-page'
  const LAST = 'shell-data-shell--last-page'

  test('says nothing about pages when the results are one page', async ({ page }) => {
    // The same query at the default limit of fifty: all forty-eight fit.
    await gotoStory(page, ENTITY)
    await expect(pager(page)).toHaveCount(0)
  })

  test('offers a step either side of where it is, and says which page that is', async ({ page }) => {
    await gotoStory(page, PAGED)
    await expect(pager(page)).toBeVisible()
    await expect(pageReadout(page)).toHaveText('1 / 4')
    await expect(listRows(page)).toHaveCount(12)
  })

  test('stepping forward brings the next page of rows', async ({ page }) => {
    await gotoStory(page, PAGED)
    const first = await listRows(page).first().innerText()

    await stepPage(page, 'Next')
    await expect(pageReadout(page)).toHaveText('2 / 4')
    await expect(listRows(page)).toHaveCount(12)
    expect(await listRows(page).first().innerText()).not.toBe(first)

    await stepPage(page, 'Previous')
    await expect(pageReadout(page)).toHaveText('1 / 4')
    expect(await listRows(page).first().innerText()).toBe(first)
  })

  test('there is no page before the first, and none after the last', async ({ page }) => {
    await gotoStory(page, PAGED)
    await expect(pageStep(page, 'Previous')).toBeDisabled()
    await expect(pageStep(page, 'Next')).toBeEnabled()

    await gotoStory(page, LAST)
    await expect(pageReadout(page)).toHaveText('4 / 4')
    await expect(pageStep(page, 'Previous')).toBeEnabled()
    await expect(pageStep(page, 'Next')).toBeDisabled()
  })

  test('the rows go on counting across the pages', async ({ page }) => {
    await gotoStory(page, PAGED)
    expect(await rowOrdinals(page)).toEqual(
      ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    )

    // Page three of twelve opens at 25, not back at 01.
    await gotoStory(page, LATER)
    expect((await rowOrdinals(page))[0]).toBe('25')
    expect((await rowOrdinals(page)).at(-1)).toBe('36')
  })

  test('the last page is as short as the rows left over', async ({ page }) => {
    await gotoStory(page, LAST)
    await expect(listRows(page)).toHaveCount(12)
    expect((await rowOrdinals(page)).at(-1)).toBe('48')
  })

  test('the page says where it is to a screen reader, in words', async ({ page }) => {
    await gotoStory(page, LATER)
    await expect(page.getByText('Page 3 of 4 — rows 25 to 36 of 48')).toBeAttached()
  })

  test('narrowing the query returns to the first page', async ({ page }) => {
    await gotoStory(page, PAGED)
    await stepPage(page, 'Next')
    await expect(pageReadout(page)).toHaveText('2 / 4')

    await openPanel(page)
    await page.getByRole('button', { name: 'running' }).first().click()
    await clickOutsidePanel(page)

    // Fewer pages, and back at the first of them.
    await expect(pageReadout(page)).toHaveText(/^1 \/ /)
  })

  test('a page past the end lands on the last one there is', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--page-past-the-end')
    await expect(pageReadout(page)).toHaveText('4 / 4')
    await expect(listRows(page)).toHaveCount(12)
  })

  test('the home screen\'s type cards do not page', async ({ page }) => {
    // The corpus is 240 rows against a limit of 50, so the shell's own result
    // set has pages — but a card per type is not what pages through them.
    await gotoStory(page, HOME)
    await expect(page.locator('.dc-type').first()).toBeVisible()
    await expect(pager(page)).toHaveCount(0)

    // The same query as a list does page.
    await gotoStory(page, 'shell-data-shell--home-as-list')
    await expect(pager(page)).toBeVisible()
  })
})

test.describe('Header — the width the bar and the panel share', () => {
  /** The three boxes the width rules are about, in viewport coordinates. */
  async function boxes(page: Page) {
    const shell = await page.locator('.dc-shell').boundingBox()
    const bar = await header(page).boundingBox()
    const sheet = await panel(page).boundingBox()
    if (!shell || !bar || !sheet) throw new Error('The shell, bar and panel are not all on screen')
    return { shell, bar, sheet }
  }

  test('the panel grows to the bar by default', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--panel-fills-the-bar')
    const { shell, bar, sheet } = await boxes(page)

    expect(Math.abs(sheet.width - bar.width)).toBeLessThanOrEqual(1)
    expect(Math.abs(sheet.x - bar.x)).toBeLessThanOrEqual(1)
    // And the bar is still the whole shell, so nothing was narrowed to match.
    expect(Math.abs(bar.width - shell.width)).toBeLessThanOrEqual(1)
  })

  test('shrink brings the bar in to the panel, and centres the pair', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--bar-comes-in-to-the-panel')
    const { shell, bar, sheet } = await boxes(page)

    expect(Math.abs(sheet.width - bar.width)).toBeLessThanOrEqual(1)
    expect(bar.width).toBeLessThan(shell.width)
    // Equal gutters either side.
    const left = bar.x - shell.x
    const right = shell.x + shell.width - (bar.x + bar.width)
    expect(left).toBeGreaterThan(0)
    expect(Math.abs(left - right)).toBeLessThanOrEqual(1)
  })

  test('the narrowed pair can be held to either edge instead', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--bar-comes-in-left')
    {
      const { shell, bar, sheet } = await boxes(page)
      expect(Math.abs(sheet.x - bar.x)).toBeLessThanOrEqual(1)
      expect(Math.abs(bar.x - shell.x)).toBeLessThanOrEqual(1)
      expect(bar.width).toBeLessThan(shell.width)
    }

    await gotoStory(page, 'shell-data-shell--bar-comes-in-right')
    {
      const { shell, bar, sheet } = await boxes(page)
      const barRight = bar.x + bar.width
      expect(Math.abs(sheet.x + sheet.width - barRight)).toBeLessThanOrEqual(1)
      expect(Math.abs(barRight - (shell.x + shell.width))).toBeLessThanOrEqual(1)
      expect(bar.width).toBeLessThan(shell.width)
    }
  })
})
