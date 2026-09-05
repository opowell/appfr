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
  termBar,
  terms,
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
    // A query with something in it is shown as the parts it is made of, and
    // the one-line summary gives way to them.
    await expect(summary(page)).toHaveCount(0)
    await expect(terms(page)).toHaveText(['entity:searches'])
  })

  test('describes a narrowed query by its terms', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--filtered-query')
    await expect(terms(page)).toHaveText(['entity:searches', 'state:running', 'schedule:daily'])
  })

  test('breaks a committed expression into its own parts', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--expression-query')
    await expect(terms(page)).toHaveText(['entity:items', 'release', 'recall'])
    // Two alternatives rather than two requirements, and the bar says which.
    await expect(termBar(page)).toContainText('or')
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
    await expect(terms(page)).toHaveText(['entity:items'])
  })

  test('widens back to everything when the scope is lifted', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)
    await page.locator('.dc-entity--all').click()
    await expect(page.locator('.dc-header__crumb-root')).toHaveText('Everything')
    await expect(summary(page)).toHaveText('everything · list · updated')
  })
})

test.describe('Header — lifting a part of the query', () => {
  test('pressing a part of the expression takes that part out', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--expression-query')
    const before = await listRows(page).count()

    await terms(page).filter({ hasText: 'release' }).click()

    await expect(terms(page)).toHaveText(['entity:items', 'recall'])
    // One alternative gone rather than one requirement lifted, so the results
    // narrow rather than widen.
    expect(await listRows(page).count()).toBeLessThan(before)
  })

  test('pressing the last part of the expression leaves the entity behind', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--expression-query')
    await terms(page).filter({ hasText: 'release' }).click()
    await terms(page).filter({ hasText: 'recall' }).click()
    await expect(terms(page)).toHaveText(['entity:items'])
  })

  test('pressing the entity widens back to everything, and the summary returns', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await terms(page).first().click()
    await expect(terms(page)).toHaveCount(0)
    await expect(summary(page)).toHaveText('everything · list · updated')
  })

  test('says what pressing one does before it is pressed', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--filtered-query')
    const running = terms(page).filter({ hasText: 'state:running' })
    await expect(running).toHaveAttribute('aria-label', 'Remove state:running')

    // Struck through and faded on hover: this is the term, and this is it gone.
    await running.hover()
    await expect(running).toHaveCSS('text-decoration-line', 'line-through')
    await expect(running).toHaveCSS('opacity', '0.5')
  })
})

/*
 * A query the bar cannot hold is scrolled rather than wrapped, and the row
 * hides its scrollbar — so the fade at whichever edge has parts behind it is
 * the whole of what says the query goes on. `data-dc-more` is what draws it,
 * and it is measured from the rendered row rather than animated: a scroll
 * timeline leaves its end state applied once the row stops overflowing, which
 * is exactly what lifting a part does.
 */
test.describe('Header — a query longer than the bar', () => {
  const LONG = 'shell-data-shell--long-query'

  // Narrow enough that a real query is longer than the row, which at a desktop
  // width takes more parts than anyone assembles by hand.
  test.use({ viewport: { width: 760, height: 720 } })

  /** Scrolls the row of parts and waits for the cue to catch up. */
  const scrollTerms = async (page: Page, to: 'start' | 'middle' | 'end') => {
    await termBar(page).evaluate((element, where) => {
      const max = element.scrollWidth - element.clientWidth
      element.scrollLeft = where === 'start' ? 0 : where === 'end' ? max : max / 2
    }, to)
  }

  test('says there is more of it off the end', async ({ page }) => {
    await gotoStory(page, LONG)
    await expect(termBar(page)).toHaveAttribute('data-dc-more', 'end')
  })

  test('says which side the rest of it is on, as it is scrolled', async ({ page }) => {
    await gotoStory(page, LONG)
    await scrollTerms(page, 'middle')
    await expect(termBar(page)).toHaveAttribute('data-dc-more', 'both')
    await scrollTerms(page, 'end')
    await expect(termBar(page)).toHaveAttribute('data-dc-more', 'start')
  })

  test('softens the edge it says has more behind it', async ({ page }) => {
    await gotoStory(page, LONG)
    await expect(termBar(page)).toHaveCSS('mask-image', /linear-gradient/)
  })

  test('says nothing at all when the whole query fits', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--filtered-query')
    await expect(termBar(page)).toHaveAttribute('data-dc-more', '')
    await expect(termBar(page)).toHaveCSS('mask-image', 'none')
  })

  /*
   * The row keeps its element while its parts change, so nothing about its own
   * size changes when a query stops overflowing — and a cue left behind sits
   * over the label for as long as the query lasts.
   */
  test('stops saying it once enough parts have been lifted', async ({ page }) => {
    // A dozen lifts, and each one is a navigation and a requery.
    test.slow()
    await gotoStory(page, LONG)
    await expect(termBar(page)).toHaveAttribute('data-dc-more', 'end')

    while ((await terms(page).count()) > 2) {
      await terms(page).last().click()
    }

    await expect(termBar(page)).toHaveAttribute('data-dc-more', '')
    await expect(termBar(page)).toHaveCSS('mask-image', 'none')
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
