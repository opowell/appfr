import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'
import { chooseView, gotoStory, termBar, scopeSelect } from './story'

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

  test('answers a hover on the header with what the label left out', async ({ page }) => {
    await gotoStory(page, COLUMNS)
    const labels = (await headings(page).allInnerTexts()).map((text) => text.trim())
    const weight = headings(page).nth(labels.indexOf('Weight'))

    await expect(weight).toHaveAttribute('title', 'Grams, from the centigrams the catalogue keeps')
    // And a header with nothing more to say says nothing: a tooltip repeating
    // the label costs a hover and adds no word.
    await expect(headings(page).nth(labels.indexOf('Shape'))).not.toHaveAttribute('title', /.*/)
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
    await expect(colors.locator('button.dc-drill')).toHaveCount(1)
    await colors.locator('button.dc-drill').click()
    // This story holds its query in memory rather than the address bar, so the
    // header's account of it is where the narrowing shows.
    await expect(scopeSelect(page)).toHaveValue('colors')
    await expect(termBar(page)).toContainText('piece:')
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
