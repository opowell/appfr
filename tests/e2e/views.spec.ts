import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { chooseView, gotoStory, openPick, pickOptions, viewSelect } from './story'

const RESTRICTED = 'shell-data-shell--restricted-views'
const UNOFFERED_LINK = 'shell-data-shell--restricted-views-unoffered-link'

/** What the header's View chooser is offering, in the order it offers them. */
async function viewOptions(page: Page) {
  await openPick(page, viewSelect(page), 'View')
  return pickOptions(page, 'View')
}

test.describe('Views — a host may offer fewer than seven', () => {
  test('the View control offers only what the host listed', async ({ page }) => {
    await gotoStory(page, RESTRICTED)
    await expect(await viewOptions(page)).toHaveText(['List', 'Table'])
  })

  test('what is left still switches the results', async ({ page }) => {
    await gotoStory(page, RESTRICTED)
    await expect(page.locator('.dc-table')).toBeVisible()

    await chooseView(page, 'list')
    await expect(page.locator('.dc-list')).toBeVisible()
    await expect(page.locator('.dc-table')).toHaveCount(0)
  })

  test('a link to a view the host took off lands on one it offers', async ({ page }) => {
    await gotoStory(page, UNOFFERED_LINK)
    await expect(page.locator('.dc-tile')).toHaveCount(0)
    await expect(page.locator('.dc-list')).toBeVisible()
  })

  test('the chooser still offers that host’s set from the fallback', async ({ page }) => {
    await gotoStory(page, UNOFFERED_LINK)
    await expect(await viewOptions(page)).toHaveText(['List', 'Table'])
  })
})

test.describe('Views — every one of them, when the host says nothing', () => {
  test('the View control offers all seven', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-panel-open')
    await expect(await viewOptions(page)).toHaveText([
      'List',
      'Cards',
      'Grid',
      'Images',
      'Table',
      'Links',
      'Preview',
    ])
  })
})

test.describe('Views — the picture a type has, where it has one', () => {
  test('a card of a pictured type carries its picture', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    const cards = page.locator('.dc-card')
    const pictured = cards.filter({ has: page.locator('.dc-card__image') })
    expect(await cards.count()).toBeGreaterThan(0)
    expect(await pictured.count()).toBeGreaterThan(0)
    // Beside the name rather than instead of it: a card still reads as a card.
    await expect(pictured.first().locator('.dc-card__primary')).not.toBeEmpty()
  })

  /*
   * And a record of that same type with nothing under the column is the card
   * without a picture — the rare pieces are the ones nobody photographed, so
   * one type shows both. A catalogue addresses pictures it does not hold, and
   * a record it holds none for is the commonest case there is.
   */
  test('a record of a pictured type that has none is the same card without one', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    const cards = page.locator('.dc-card')
    const bare = cards.filter({ hasNot: page.locator('.dc-card__image') })
    expect(await bare.count()).toBeGreaterThan(0)
    await expect(bare.first().locator('.dc-card__primary')).not.toBeEmpty()
  })

  test('a type with no picture is the same card without one', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--cards-view')
    expect(await page.locator('.dc-card').count()).toBeGreaterThan(0)
    await expect(page.locator('.dc-card__image')).toHaveCount(0)
  })

  test('a tile is the picture, with its caption over it', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-grid')
    const tiles = page.locator('.dc-tile')
    const pictured = tiles.filter({ has: page.locator('.dc-tile__image') })
    expect(await tiles.count()).toBeGreaterThan(0)
    expect(await pictured.count()).toBeGreaterThan(0)
    await expect(pictured.first().locator('.dc-tile__primary')).not.toBeEmpty()
    // And a tile with no picture is the tint it always was, caption and all.
    const bare = tiles.filter({ hasNot: page.locator('.dc-tile__image') })
    expect(await bare.count()).toBeGreaterThan(0)
    await expect(bare.first().locator('.dc-tile__primary')).not.toBeEmpty()
  })

  test('the picture is inside the press that opens the record', async ({ page }) => {
    // The shell only reports an activation, so what is assertable here is the
    // structure that makes the press one: the picture is in the button, not
    // beside it.
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    await expect(page.locator('.dc-card__open .dc-card__image').first()).toBeVisible()
  })

  /*
   * A source that does not load is the same nothing as a source that was never
   * there. A catalogue's pictures are somebody else's files, so this is what a
   * record whose picture has moved looks like — not the browser's broken-image
   * mark in the middle of a wall of cards.
   */
  test('a picture that fails to load leaves the card without one', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--pictured-cards')
    const cards = page.locator('.dc-card')
    const pictures = page.locator('.dc-card__image')
    const drawn = await pictures.count()
    expect(drawn).toBeGreaterThan(0)

    // The fixture's pictures are data URIs, so failing one means saying what
    // the browser would have said about a file that had moved.
    await pictures.first().evaluate((image) => image.dispatchEvent(new Event('error')))

    await expect(pictures).toHaveCount(drawn - 1)
    // And every card is still a card, the one that lost its picture included.
    await expect(page.locator('.dc-card__primary')).toHaveCount(await cards.count())
  })
})

/*
 * The images view: the pictures alone, in rows brought to the width of the
 * results. Every row but the last reaches the edge; no picture is drawn
 * larger than it is; and the records keep their order and their number, a
 * record with no picture holding its place as a square with its name on.
 */
test.describe('Views — the pictures alone', () => {
  const IMAGES = 'shell-data-shell--images-view'

  /** Every box on the wall, as laid: where it is, how big, and what is in it. */
  async function boxes(page: Page) {
    return page.locator('.dc-images__cell').evaluateAll((cells) =>
      cells.map((cell) => {
        const image = cell.querySelector('img')
        return {
          top: parseFloat((cell as HTMLElement).style.top),
          left: parseFloat((cell as HTMLElement).style.left),
          width: parseFloat((cell as HTMLElement).style.width),
          height: parseFloat((cell as HTMLElement).style.height),
          natural: image ? { width: image.naturalWidth, height: image.naturalHeight } : null,
          name: cell.querySelector('button')?.title ?? '',
        }
      }),
    )
  }

  /**
   * Once every picture has said its shape — the rows are laid again as each
   * loads, and a wall still settling is not the wall. The pictures load
   * lazily, so the wall is scrolled through once to ask for all of them.
   */
  async function settled(page: Page) {
    await expect(page.locator('.dc-images__cell img').first()).toBeVisible()
    await page.locator('.dc-results').evaluate(async (scroller) => {
      for (let y = 0; y <= scroller.scrollHeight; y += scroller.clientHeight) {
        scroller.scrollTop = y
        await new Promise((tick) => setTimeout(tick, 50))
      }
      scroller.scrollTop = 0
    })
    await page.waitForFunction(() =>
      [...document.querySelectorAll<HTMLImageElement>('.dc-images__cell img')].every((image) => image.complete),
    )
  }

  test('every row but the last reaches the far edge', async ({ page }) => {
    await gotoStory(page, IMAGES)
    await settled(page)
    const wallWidth = await page.locator('.dc-images__wall').evaluate((wall) => wall.clientWidth)
    const laid = await boxes(page)
    const rows = [...new Set(laid.map((box) => box.top))].sort((a, b) => a - b)
    expect(rows.length).toBeGreaterThan(2)
    for (const top of rows.slice(0, -1)) {
      const right = Math.max(...laid.filter((box) => box.top === top).map((box) => box.left + box.width))
      expect(right).toBeCloseTo(wallWidth, 0)
    }
  })

  test('no picture is drawn larger than it is, and each box is the shape of its picture', async ({ page }) => {
    await gotoStory(page, IMAGES)
    await settled(page)
    const drawn = await page.locator('.dc-images__cell img').evaluateAll((images) =>
      (images as HTMLImageElement[]).map((image) => {
        const shown = image.getBoundingClientRect()
        const box = image.closest('.dc-images__cell')!.getBoundingClientRect()
        return {
          shown: { width: shown.width, height: shown.height },
          natural: { width: image.naturalWidth, height: image.naturalHeight },
          box: { width: box.width, height: box.height },
        }
      }),
    )
    expect(drawn.length).toBeGreaterThan(0)
    // The fixture has pictures both taller and shorter than a row, so both
    // cases are on the wall: scaled down to the box, and sat inside it.
    expect(drawn.some((picture) => picture.shown.height < picture.box.height - 1)).toBe(true)
    expect(drawn.some((picture) => picture.shown.height > picture.box.height - 3)).toBe(true)
    for (const picture of drawn) {
      expect(picture.shown.height).toBeLessThanOrEqual(picture.natural.height + 0.5)
      expect(picture.shown.width).toBeLessThanOrEqual(picture.natural.width + 0.5)
      expect(picture.box.width / picture.box.height).toBeCloseTo(picture.natural.width / picture.natural.height, 1)
    }
  })

  test('a record with no picture keeps its place as a square with its name on', async ({ page }) => {
    await gotoStory(page, IMAGES)
    const blanks = page.locator('.dc-images__blank')
    expect(await blanks.count()).toBeGreaterThan(0)
    await expect(blanks.first()).not.toBeEmpty()
    // As many boxes as the list view has rows: the wall is the result set.
    const drawn = await page.locator('.dc-images__cell').count()
    await chooseView(page, 'list')
    await expect(page.locator('.dc-list__row')).toHaveCount(drawn)
  })

  test('a picture that fails to load becomes the record’s name, not a hole', async ({ page }) => {
    await gotoStory(page, IMAGES)
    const pictures = page.locator('.dc-images__cell img')
    await expect(pictures.first()).toBeVisible()
    const drawn = await pictures.count()
    const blanks = await page.locator('.dc-images__blank').count()
    // A picture is known by its address, so every record drawing the one that
    // failed loses it — the fixture's pieces of one tint and shape share one.
    const src = await pictures.first().getAttribute('src')
    const sharing = await pictures.evaluateAll((images, failed) => images.filter((image) => image.getAttribute('src') === failed).length, src)
    await pictures.first().evaluate((image) => image.dispatchEvent(new Event('error')))
    await expect(pictures).toHaveCount(drawn - sharing)
    await expect(page.locator('.dc-images__blank')).toHaveCount(blanks + sharing)
  })

  test('a picture opens its record', async ({ page }) => {
    await gotoStory(page, IMAGES)
    await expect(page.locator('.dc-images__open img').first()).toBeVisible()
    await expect(page.locator('.dc-images__open').first()).toHaveAttribute('title', /.+/)
  })
})
