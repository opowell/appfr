import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'
import { chooseView, expectPage, gotoStory, stepPage, termBar, terms, scopeSelect } from './story'

/**
 * The table against a corpus whose names are sentences and whose secondaries
 * are file paths — what it looks like once it is pointed at a real one.
 */
const LONG = 'shell-data-shell--table-view-long-values'

const results = (page: Page) => page.locator('.dc-results')
const table = (page: Page) => page.locator('.dc-table')

/** How far a box can be scrolled sideways inside itself. */
function overhang(target: Locator): Promise<number> {
  return target.evaluate((element) => element.scrollWidth - element.clientWidth)
}

/** True when the cell is showing less than it holds — the ellipsis is on. */
function truncated(cell: Locator): Promise<boolean> {
  return cell.evaluate((element) => element.scrollWidth > element.clientWidth)
}

test.describe('Table — as wide as the shell, never wider', () => {
  test('does not scroll sideways however long the values are', async ({ page }) => {
    await gotoStory(page, LONG)
    await expect(table(page)).toBeVisible()

    expect(await overhang(results(page))).toBe(0)
    expect(await overhang(table(page))).toBe(0)
  })

  test('the table is exactly the width it is given', async ({ page }) => {
    await gotoStory(page, LONG)
    const [area, drawn] = await Promise.all([
      results(page).evaluate((element) => element.clientWidth),
      table(page).evaluate((element) => element.getBoundingClientRect().width),
    ])
    expect(drawn).toBeLessThanOrEqual(area)
  })

  test('truncates the name and the path rather than wrapping them', async ({ page }) => {
    await gotoStory(page, LONG)
    const row = page.locator('.dc-table__row').first()

    expect(await truncated(row.locator('.dc-table__open'))).toBe(true)
    expect(await truncated(row.locator('.dc-table__muted').first())).toBe(true)

    // One line each, so every row is the same depth. Wrapping is what made a
    // row holding a long path four deep and the row under it one.
    const heights = await page
      .locator('.dc-table__row')
      .evaluateAll((rows) => rows.map((element) => Math.round(element.getBoundingClientRect().height)))
    expect(heights.length).toBeGreaterThan(1)
    expect(new Set(heights).size).toBe(1)
  })

  test('keeps the whole of a truncated value on hover', async ({ page }) => {
    await gotoStory(page, LONG)
    const name = page.locator('.dc-table__open').first()
    await expect(name).toHaveAttribute('title', (await name.textContent())?.trim() ?? '')
  })

  test('keeps every digit of a rounded number on hover', async ({ page }) => {
    await gotoStory(page, LONG)
    const cells = page.locator('.dc-table td.dc-table__number')
    const shown = await cells.evaluateAll((elements) =>
      elements.map((element) => ({
        text: (element.textContent ?? '').trim(),
        title: element.getAttribute('title'),
      })),
    )

    expect(shown.length).toBeGreaterThan(0)
    for (const cell of shown) {
      // Every digit, and nothing the cell did to them: a number the column
      // rounded to `1.2k` hovers as the 1240 the row holds.
      expect(cell.title).toMatch(/^-?\d+(\.\d+)?$/)
      if (/[km]$/.test(cell.text)) expect(cell.title).not.toBe(cell.text)
    }
  })

  test('still fits once the shell is too narrow for every column', async ({ page }) => {
    await gotoStory(page, LONG)

    for (const width of [900, 760, 620, 480]) {
      await page.setViewportSize({ width, height: 720 })
      // The columns stand down at container widths, so let the query settle.
      await expect(table(page)).toBeVisible()
      expect(await overhang(results(page))).toBe(0)
    }
  })

  test('drops the metrics, then the date, as the room runs out', async ({ page }) => {
    await gotoStory(page, LONG)
    const metrics = page.locator('.dc-table th.dc-table__number')
    const date = page.locator('.dc-table th.dc-table__date')

    await expect(metrics.first()).toBeVisible()
    await expect(date).toBeVisible()

    await page.setViewportSize({ width: 700, height: 720 })
    await expect(metrics.first()).toBeHidden()
    await expect(date).toBeVisible()

    await page.setViewportSize({ width: 560, height: 720 })
    await expect(date).toBeHidden()

    // What is left is what a row is for: its name, its path and its state.
    await expect(page.locator('.dc-table__open').first()).toBeVisible()
    await expect(page.locator('.dc-table th.dc-table__state')).toBeVisible()
  })
})

/*
 * Columns.
 *
 * The default table is eight columns derived from an entity's four labels; a
 * schema that says otherwise gets exactly what it declared, in the order it
 * declared it, however many that is. These press the schema in the fixtures —
 * a LEGO catalogue piece, which is twelve.
 */

const COLUMNS = 'shell-data-shell--table-columns'
const SELECTION = 'shell-data-shell--table-columns-with-selection'
const EVERYTHING = 'shell-data-shell--table-columns-everything'
const NONE = 'shell-data-shell--table-no-columns'

const headings = (page: Page) => page.locator('.dc-table thead th')

/** The cells of one column, found by what its header says. */
async function column(page: Page, label: string): Promise<Locator> {
  const labels = await headings(page).allInnerTexts()
  const index = labels.findIndex((text) => text.trim() === label)
  expect(index, `no column headed "${label}" in ${labels.join(' | ')}`).toBeGreaterThan(-1)
  return page.locator(`.dc-table tbody td:nth-child(${index + 1})`)
}

test.describe('Columns — as many as the schema declares', () => {
  test('draws the declared set, in order, and nothing the shell added', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    const labels = (await headings(page).allInnerTexts()).map((text) => text.trim())
    // The one thing the shell adds, ahead of the declared set: the column
    // saying where the query stands on each row, since pieces can be named.
    // Headed by the same control the rows wear, not by a label.
    expect(labels.shift()).toMatch(/^\+\s*·\s*−$/)
    expect(labels).toEqual([
      '#',
      // The picture column heads nothing: a column of pictures says what it is.
      '',
      'Piece',
      'Part no.',
      'Shape',
      'First year',
      'Colors',
      'In sets',
      'Weight',
      'Rare',
      'State',
    ])
  })

  test('formats each column the way that column says', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    // A year is a number and not a quantity: 1988, never 2.0k.
    await expect((await column(page, 'First year')).first()).toHaveText(/^\d{4}$/)
    // A weight is read in whatever unit the number is actually in.
    await expect((await column(page, 'Weight')).first()).toHaveText(/^[\d.]+(cg|g|kg)$/)
    // And a count is still counted the way every other view counts it.
    await expect((await column(page, 'Colors')).first()).toHaveText(/^\d+(\.\d)?[km]?$/)
  })

  test('answers a hover on the header with what the label left out, and its shortcut', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    const labels = (await headings(page).allInnerTexts()).map((text) => text.trim())
    const weight = headings(page).nth(labels.indexOf('Weight'))

    await expect(weight).toHaveAttribute(
      'title',
      'Grams, from the centigrams the catalogue keeps\nShortcut: w',
    )
    // The shortcut alone where there is no hint, and only on the column that
    // owns it: State's initials are Shape's, Shape being declared first.
    await expect(headings(page).nth(labels.indexOf('Shape'))).toHaveAttribute(
      'title',
      'Shortcut: s',
    )
    await expect(headings(page).nth(labels.indexOf('First year'))).toHaveAttribute(
      'title',
      'Shortcut: fy',
    )
    // And a header with nothing more to say says nothing: a tooltip repeating
    // the label costs a hover and adds no word.
    await expect(headings(page).nth(labels.indexOf('State'))).not.toHaveAttribute('title', /.*/)
  })

  test('draws the marks a column asks for — a picture and a pill', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    // The first row that has a picture, since the rare pieces have none: what
    // is asserted here is that a picture column draws one, not which records
    // the fixture photographed.
    const row = page.locator('.dc-table__row').filter({ has: page.locator('img') }).first()
    await expect(row.locator('img')).toHaveCount(1)
    await expect(row.locator('.dc-pill')).toHaveCount(1)
    // And the pill is on every row, picture or no.
    await expect(page.locator('.dc-table__row .dc-pill')).toHaveCount(
      await page.locator('.dc-table__row').count(),
    )
  })

  test('a column that says what its value counts still leads there', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    const colors = (await column(page, 'Colors')).first()
    await expect(colors.locator('.dc-drill')).toHaveCount(1)
    await colors.locator('.dc-drill').click()
    // This story holds its query in memory rather than the address bar, so the
    // header's account of it is where the narrowing shows.
    await expect(scopeSelect(page)).toHaveAttribute('data-dc-value', 'colors')
    await expect(termBar(page)).toContainText('Piece:')
  })

  test('heads a column with a button only where that sort is offered', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    // `sort` is declared on Piece, Colors and In sets; Shape names none.
    await expect(headings(page).filter({ hasText: 'Piece' }).locator('button')).toHaveCount(1)
    await expect(headings(page).filter({ hasText: 'Shape' }).locator('button')).toHaveCount(0)
  })

  test('columns still stand down in the order the schema put them in', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    const weight = headings(page).filter({ hasText: 'Weight' })
    const colors = headings(page).filter({ hasText: 'Colors' })
    await expect(weight).toBeVisible()

    // Weight declares 1100 and Colors 900, so the wide one goes first.
    await page.setViewportSize({ width: 1000, height: 720 })
    await expect(weight).toBeHidden()
    await expect(colors).toBeVisible()

    await page.setViewportSize({ width: 860, height: 720 })
    await expect(colors).toBeHidden()

    // Whatever goes, the identity and the state stay, and nothing overhangs.
    await expect(headings(page).filter({ hasText: 'Piece' })).toBeVisible()
    await expect(headings(page).filter({ hasText: 'State' })).toBeVisible()
    expect(await overhang(results(page))).toBe(0)
  })

  test('a cell of the host’s own keeps state the table knows nothing about', async ({ page }) => {
    await gotoStory(page, SELECTION)
    const first = page.locator('.dc-table__row').first().locator('input[type="checkbox"]')
    await expect(first).toHaveCount(1)
    await first.check()

    // Re-sorting rebuilds the rows; the tick is the host's state, not theirs.
    await headings(page).filter({ hasText: 'Links' }).locator('button').click()
    await expect(page.locator('.dc-table input[type="checkbox"]:checked')).toHaveCount(1)
  })

  test('a header of the host’s own stands over the whole column', async ({ page }) => {
    await gotoStory(page, SELECTION)
    const head = page.locator('.dc-table thead th').first().locator('.dc-table__head')
    // Nothing ticked, nothing to clear: the header draws what its state says.
    await expect(head.locator('button')).toHaveCount(0)

    const rows = page.locator('.dc-table__row')
    await rows.nth(0).locator('input[type="checkbox"]').check()
    await rows.nth(1).locator('input[type="checkbox"]').check()
    await expect(head.locator('button')).toHaveText('Clear 2')

    // One press on the header undoes every tick the cells made.
    await head.locator('button').click()
    await expect(page.locator('.dc-table input[type="checkbox"]:checked')).toHaveCount(0)
    await expect(head.locator('button')).toHaveCount(0)
    // And it was a press on the header, not on the sort or on any row.
    await expect(table(page)).toBeVisible()
  })

  test('ticking a row does not open it', async ({ page }) => {
    await gotoStory(page, SELECTION)
    const before = page.url()
    await page.locator('.dc-table__row').first().locator('input[type="checkbox"]').check()
    expect(page.url()).toBe(before)
    await expect(table(page)).toBeVisible()
  })

  test('a type that declared none has no table, and says so', async ({ page }) => {
    await gotoStory(page, NONE)
    await expect(table(page)).toHaveCount(0)
    await expect(page.locator('.dc-table__none')).toContainText('No columns declared')
    // Named, so it is clear which type of the schema is the one missing them.
    await expect(page.locator('.dc-table__none')).toContainText('Searches')
    // And nothing overhangs where a table would have been.
    expect(await overhang(results(page))).toBe(0)
  })

  test('and the other views go on working, being made of the labels', async ({ page }) => {
    await gotoStory(page, NONE)
    await expect(page.locator('.dc-table__none')).toBeVisible()

    await chooseView(page, 'list')
    await expect(page.locator('.dc-list__row').first()).toBeVisible()
  })

  /*
   * The picture column, which is two things at once: a cell like any other
   * value, and the reason this table's rows are taller than a line of text.
   * LEGO's rare pieces are the ones nobody photographed, so the same table
   * holds both cases.
   */
  test('draws a picture for the pieces that have one, and an empty cell for the rest', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    const rows = await page.locator('.dc-table__row').count()
    const pictures = await page.locator('.dc-table img').count()

    expect(pictures).toBeGreaterThan(0)
    expect(pictures).toBeLessThan(rows)
  })

  test('asks for nothing where the row holds no picture', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    // An empty `src` is a second request for the page itself, which loads and
    // so never fails: a row without a picture has to draw no image at all.
    const sources = await page
      .locator('.dc-table img')
      .evaluateAll((images) => images.map((image) => image.getAttribute('src') ?? ''))
    expect(sources.length).toBeGreaterThan(0)
    for (const source of sources) expect(source.trim()).not.toBe('')
  })

  test('lets a name wrap into the depth the picture paid for', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    await expect(table(page)).toHaveAttribute('data-dc-wrap', '')

    // Narrow enough that the names no longer fit their column. The one that
    // does not fit is the one carrying the narrowing mark beside it, so this
    // is also the case a rule reaching only the cell's own children misses.
    await page.setViewportSize({ width: 480, height: 900 })
    const name = page.locator('.dc-table__name .dc-table__open').first()
    await expect(name).toBeVisible()

    const lines = await name.evaluate((element) => {
      const style = getComputedStyle(element)
      return {
        drawn: Math.round(element.clientHeight / parseFloat(style.lineHeight)),
        clamp: Number(style.webkitLineClamp),
        whole: element.scrollHeight <= element.clientHeight,
      }
    })
    expect(lines.drawn).toBeGreaterThan(1)
    expect(lines.drawn).toBeLessThanOrEqual(lines.clamp)
    expect(lines.whole).toBe(true)
  })

  test('and a table with no picture in it keeps its single line', async ({ page }) => {
    // The depth a wrap spends is the picture's; a table of one-line rows has
    // none going spare, and rows all one depth is what it is for.
    await gotoStory(page, LONG)
    await expect(table(page)).not.toHaveAttribute('data-dc-wrap', '')
  })

  test('the schema’s own set serves the mixed result', async ({ page }) => {
    await gotoStory(page, EVERYTHING)
    const labels = (await headings(page).allInnerTexts()).map((text) => text.trim())
    // The type leads, because across kinds it is the column that tells you most.
    expect(labels.slice(0, 3)).toEqual(['#', 'Kind', 'Record'])
    const kinds = await (await column(page, 'Kind')).allInnerTexts()
    expect(new Set(kinds.map((text) => text.trim())).size).toBeGreaterThan(1)
  })
})

/*
 * The headings say what each column is, and a column scrolled away from its
 * heading is a column of numbers nobody can read. So they stay at the top of
 * the results, outside the box the rows scroll in — the scrollbar runs beside
 * the rows alone — and the fade that says more is above starts under them.
 */
test.describe('Table — headings that stay put', () => {
  test.use({ viewport: { width: 1100, height: 420 } })

  const body = (page: Page) => table(page).locator('tbody')
  const scrollBody = (page: Page, to: number) =>
    body(page).evaluate((element, top) => {
      element.scrollTop = top
    }, to)

  test('stay at the top of the results as the rows scroll below them', async ({ page }) => {
    await gotoStory(page, LONG)
    const heading = table(page).locator('th').first()
    const top = async () =>
      Math.round(
        (await heading.boundingBox())!.y - (await results(page).boundingBox())!.y,
      )
    expect(await top()).toBe(0)
    await scrollBody(page, 200)
    await expect(results(page)).toHaveAttribute('data-dc-more', /top/)
    expect(await top()).toBe(0)
  })

  test('stand outside the box that scrolls, which starts under them', async ({ page }) => {
    await gotoStory(page, LONG)
    await expect(table(page)).toBeVisible()
    // The rows overrun the box, and it is the body that takes them in.
    expect(await body(page).evaluate((element) => element.scrollHeight - element.clientHeight))
      .toBeGreaterThan(0)
    expect(await results(page).evaluate((element) => element.scrollHeight - element.clientHeight))
      .toBe(0)
    const [head, rows] = await Promise.all([
      table(page).locator('thead').boundingBox(),
      body(page).boundingBox(),
    ])
    expect(Math.round(rows!.y)).toBe(Math.round(head!.y + head!.height))
  })

  test('stand over the columns they name', async ({ page }) => {
    await gotoStory(page, LONG)
    const edges = (cells: Locator) =>
      cells.evaluateAll((elements) =>
        elements
          .filter((element) => getComputedStyle(element).display !== 'none')
          .map((element) => {
            const box = element.getBoundingClientRect()
            return [Math.round(box.left), Math.round(box.width)]
          }),
      )
    const heads = await edges(table(page).locator('th'))
    expect(heads.length).toBeGreaterThan(2)
    expect(await edges(body(page).locator('tr').first().locator('td'))).toEqual(heads)
    expect(await edges(body(page).locator('tr').last().locator('td'))).toEqual(heads)
  })

  test('start the fade over the rows under them, not over themselves', async ({ page }) => {
    await gotoStory(page, LONG)
    await scrollBody(page, 200)
    await expect(results(page)).toHaveAttribute('data-dc-more', /top/)
    const [stuck, head] = await Promise.all([
      results(page).evaluate((element) => getComputedStyle(element).getPropertyValue('--dc-results-stuck')),
      table(page).locator('thead').evaluate((element) => (element as HTMLElement).offsetHeight),
    ])
    expect(stuck).toBe(`${head}px`)
  })

  test('let go of the fade once the rows are scrolled to the end', async ({ page }) => {
    await gotoStory(page, LONG)
    await expect(results(page)).toHaveAttribute('data-dc-more', 'bottom')
    await scrollBody(page, 100000)
    await expect(results(page)).toHaveAttribute('data-dc-more', 'top')
  })

  test('open a new page at its first row', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--paged-in-the-table-view')
    await expectPage(page, '2 / 4')
    await scrollBody(page, 100000)
    expect(await body(page).evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    await stepPage(page, 'Next')
    await expectPage(page, '3 / 4')
    expect(await body(page).evaluate((element) => element.scrollTop)).toBe(0)
  })
})

/*
 * `rowLinks`: a row that is a link all the way across, so what a browser does
 * with a link — a middle click, the context menu, the address on hover — it
 * does anywhere on the row, and not on the name alone.
 */
const ROW_LINKS = 'shell-data-shell--table-view-row-links'

test.describe('Table — rows that are links', () => {
  test('are not, unless the host asks', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--table-view')
    await expect(page.locator('.dc-table__cell-link')).toHaveCount(0)
  })

  test('put the row’s one address on every cell, and one link in the tab order', async ({ page }) => {
    await gotoStory(page, ROW_LINKS)
    const row = page.locator('.dc-table__row').first()
    const links = row.locator('.dc-table__cell-link')
    const hrefs = await links.evaluateAll((elements) => elements.map((element) => element.getAttribute('href')))
    expect(hrefs.length).toBe(await row.locator('td:not(.dc-table__pick):not(.dc-table__standing)').count())
    expect(new Set(hrefs).size).toBe(1)
    expect(hrefs[0]).toBeTruthy()
    await expect(row.locator('.dc-table__cell-link:not([tabindex="-1"])')).toHaveCount(1)
  })

  test('take a press on a plain value, and narrow to the record', async ({ page }) => {
    await gotoStory(page, ROW_LINKS)
    const row = page.locator('.dc-table__row').first()
    // Under the pointer at the middle of a plain value is the row's link, not the text.
    const plain = row.locator('td:has(> .dc-cell__text)').first()
    const hit = await plain.evaluate((element) => {
      const box = element.getBoundingClientRect()
      return document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)?.className ?? ''
    })
    expect(hit).toContain('dc-table__cell-link')
    await expect(terms(page)).toHaveCount(0)
    await plain.click()
    await expect(terms(page)).toHaveCount(1)
  })

  test('leave a count pressable above the link, as itself', async ({ page }) => {
    await gotoStory(page, ROW_LINKS)
    const drill = page.locator('.dc-table__row').first().locator('.dc-drill').first()
    const hit = await drill.evaluate((element) => {
      const box = element.getBoundingClientRect()
      return element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2))
    })
    expect(hit).toBe(true)
    // A count leads to what it counts, so the list it opens is of another type.
    await drill.click()
    await expect(page.locator('.dc-table')).toBeVisible()
    expect(new URL(page.url()).searchParams.get('e')).not.toBe('pieces')
  })
})
