import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import {
  chooseScope,
  clickOutsidePanel,
  gotoStory,
  header,
  listRows,
  openPanel,
  pager,
  pageReadout,
  pageStep,
  panel,
  pickEntity,
  rowOrdinals,
  scopeLabel,
  scopeSelect,
  stepPage,
  termBar,
  terms,
  trigger,
  viewSelect,
} from './story'

const HOME = 'shell-data-shell--home'
const HOME_OPEN = 'shell-data-shell--home-panel-open'
const ENTITY = 'shell-data-shell--entity-list'

test.describe('Header — the query as it stands', () => {
  test('names the domain, and says the whole corpus is what is listed', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(header(page)).toContainText('iRadar')
    // Nothing is filtered, so the scope is the whole corpus — and the control
    // that says so says how much of it there is. Five entities of forty-eight
    // generated rows each.
    await expect(scopeSelect(page)).toHaveValue('')
    expect(await scopeLabel(page)).toBe('Everything · 240')
  })

  test('describes the home screen by what it is showing', async ({ page }) => {
    await gotoStory(page, HOME)
    // How they are drawn is the second of the two choosers, beside the scope.
    await expect(viewSelect(page)).toHaveValue('cards')
    // The whole sentence — the ordering included — is still the row's title.
    await expect(termBar(page)).toHaveAttribute('title', 'everything · cards · updated')
  })

  test('names the entity once one is filtered to', async ({ page }) => {
    await gotoStory(page, ENTITY)
    // A query with something in it is shown as the parts it is made of, and
    // the choosers stay on the bar beside them.
    await expect(viewSelect(page)).toHaveValue('list')
    // The entity is the first of those parts, and the only one that is a
    // choice rather than a pill. It is also what says which type is listed,
    // and how many of them there are.
    await expect(scopeSelect(page)).toHaveValue('searches')
    expect(await scopeLabel(page)).toBe('Searches · 38')
    await expect(terms(page)).toHaveCount(0)
  })

  test('describes a narrowed query by its terms', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--filtered-query')
    await expect(scopeSelect(page)).toHaveValue('searches')
    await expect(terms(page)).toHaveText(['state:running', 'schedule:daily'])
  })

  test('breaks a committed expression into its own parts', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--expression-query')
    await expect(terms(page)).toHaveText(['release', 'recall'])
    // Two alternatives rather than two requirements, and the bar says which.
    await expect(termBar(page)).toContainText('or')
  })

  test('the type in force says its population, and what matched once narrowed', async ({ page }) => {
    // Nothing but the type is asked for, so the count is the population the
    // schema publishes.
    await gotoStory(page, ENTITY)
    expect(await scopeLabel(page)).toBe('Searches · 38')

    // A facet narrows it, and the count is what actually matched — the whole
    // population is no longer what is being listed.
    await gotoStory(page, 'shell-data-shell--filtered-query')
    // Both halves of that label are formatted counts, so the digits are what
    // there is to read: a live count past a thousand comes out grouped.
    const matched = Number((await scopeLabel(page)).split(' · ')[1]?.replace(/,/g, ''))
    expect(matched).toBeGreaterThan(0)
    expect(matched).toBeLessThan(48)
  })

  test('follows the scope when it changes', async ({ page }) => {
    await gotoStory(page, HOME)
    await openPanel(page)
    await pickEntity(page, 'Items')
    await expect(scopeSelect(page)).toHaveValue('items')
    await expect.poll(() => scopeLabel(page)).toBe('Items · 9,988')
  })

  test('widens back to everything when the scope is lifted', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)
    await page.locator('.dc-entity--all').click()
    await expect(scopeSelect(page)).toHaveValue('')
    expect(await scopeLabel(page)).toBe('Everything · 240')
    await expect(viewSelect(page)).toHaveValue('list')
  })
})

test.describe('Header — lifting a part of the query', () => {
  test('pressing a part of the expression takes that part out', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--expression-query')
    const before = await listRows(page).count()

    await terms(page).filter({ hasText: 'release' }).click()

    await expect(terms(page)).toHaveText(['recall'])
    // One alternative gone rather than one requirement lifted, so the results
    // narrow rather than widen.
    expect(await listRows(page).count()).toBeLessThan(before)
  })

  test('pressing the last part of the expression leaves the entity behind', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--expression-query')
    await terms(page).filter({ hasText: 'release' }).click()
    await terms(page).filter({ hasText: 'recall' }).click()
    await expect(terms(page)).toHaveCount(0)
    await expect(scopeSelect(page)).toHaveValue('items')
  })

  test('choosing Everything widens back out, and how it is drawn stands', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await scopeSelect(page).selectOption('')
    await expect(terms(page)).toHaveCount(0)
    await expect(scopeSelect(page)).toHaveValue('')
    await expect(viewSelect(page)).toHaveValue('list')
  })

  test('offers every type the schema declares, and Everything among them', async ({ page }) => {
    await gotoStory(page, ENTITY)
    // Each with how many records it holds, which is what makes the list a
    // chooser rather than a row of names. `Everything` is the one option with
    // no count to give: how big the corpus is is not something the schema
    // publishes, and the shell knows a result's size only once it asks.
    await expect(scopeSelect(page).locator('option')).toHaveText([
      'Everything',
      'Searches · 38',
      'Items · 9,988',
      'Scrapers · 24',
      'Logs · 184k',
      'Settings · 20',
    ])
    // Neither chooser spends a word of the bar saying what it is: what they
    // hold says that already. The name is there for anyone who cannot see it.
    await expect(page.getByRole('combobox', { name: 'Type' })).toBeVisible()
    await expect(page.getByRole('combobox', { name: 'View' })).toBeVisible()
  })

  test('choosing another type lists that one instead', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await chooseScope(page, 'Items')
    await expect(scopeSelect(page)).toHaveValue('items')
    await expect.poll(() => scopeLabel(page)).toBe('Items · 9,988')
    // The entity's own facets went with it: they belong to the type that had
    // them, and this is a different type.
    await expect(terms(page)).toHaveCount(0)
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
 * A drill writes a join key — `set:"sets_10007"` — which is exactly right as a
 * query and unreadable as a label. The header is where someone has to
 * recognise what they are looking at, so it names the record and keeps the id.
 */
test.describe('Header — a part that names a record', () => {
  const DRILLED = 'shell-data-shell--drilled-into-pieces'

  test('says which record the id belongs to, and keeps the id', async ({ page }) => {
    await gotoStory(page, DRILLED)
    await expect(terms(page)).toHaveText(['set:Yellow Castle (sets_10007)'])
  })

  test('lifts by what it says, not by what the expression holds', async ({ page }) => {
    await gotoStory(page, DRILLED)
    const part = terms(page).first()
    await expect(part).toHaveAttribute('aria-label', 'Remove set:Yellow Castle (sets_10007)')

    await part.click()
    await expect(terms(page)).toHaveCount(0)
    await expect(scopeSelect(page)).toHaveValue('pieces')
  })

  test('leaves a part that constrains a value rather than naming a record', async ({ page }) => {
    // The same schema, whose `theme` is a facet of sets: a value to match, and
    // nothing anyone can look a record up by.
    await gotoStory(page, 'shell-data-shell--home-drillable', '&e=sets&q=theme%3Acastle')
    await expect(terms(page)).toHaveText(['theme:castle'])
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

    while ((await terms(page).count()) > 1) {
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

  /*
   * The query sits on the bar now, so the bar is the toggle's surface rather
   * than the toggle itself: a press anywhere on it opens the panel, and a
   * press that lands on a part of the query belongs to that part instead.
   */
  test('a press anywhere on the bar opens the panel', async ({ page }) => {
    await gotoStory(page, HOME)
    await page.locator('.dc-header__domain').click()
    await expect(panel(page)).toBeVisible()
  })

  test('a press on a part of the query lifts it rather than opening the panel', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--filtered-query')
    await terms(page).filter({ hasText: 'state:running' }).click()

    await expect(terms(page)).toHaveText(['schedule:daily'])
    await expect(panel(page)).toHaveCount(0)
  })

  test('a press on the view control opens its own list, not the panel', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await scopeSelect(page).click()
    await expect(panel(page)).toHaveCount(0)
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
    // The query comes first, since it is what the bar is mostly made of: which
    // type is listed, how it is drawn, and then the button that opens the rest
    // of the query.
    await page.keyboard.press('Tab')
    await expect(scopeSelect(page)).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(viewSelect(page)).toBeFocused()
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
