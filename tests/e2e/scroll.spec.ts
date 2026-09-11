import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory } from './story'

/**
 * The shell scrolls its results and leaves the page alone.
 *
 * A host gives the shell a full-height box and the shell clips itself inside
 * it, so a corpus taller than the screen should move one scrollbar: the
 * results area's. What used to move two was the sr-only recipe — a 1px
 * `position: absolute` box, which every view here uses to announce what a
 * press does. The cards and rows holding those spans declare no `position` of
 * their own, so their containing block was the document: they were laid out at
 * their static position far down the scrolled content, escaped every
 * `overflow` on the way up, and made the *page* taller than the viewport.
 */

/** A card per type, tall enough at the default viewport to scroll. */
const CARDS = 'shell-data-shell--home-deeper-cards'
/** And the same screen with a host's own cards among them. */
const RECORD = 'shell-data-shell--record-page'
const HOME = 'shell-data-shell--home'

/** How far the page itself can be scrolled — 0 when the host's box is the box. */
function pageOverhang(page: Page): Promise<number> {
  return page.evaluate(() => document.documentElement.scrollHeight - document.documentElement.clientHeight)
}

/** And how far the results area can, which is what the screen is really made of. */
function resultsOverhang(page: Page): Promise<number> {
  return page.locator('.dc-results').evaluate((el) => el.scrollHeight - el.clientHeight)
}

/** What the browser does when something asks the window to scroll. */
async function scrollThePage(page: Page): Promise<number> {
  return page.evaluate(() => {
    window.scrollTo(0, 3000)
    const moved = window.scrollY
    window.scrollTo(0, 0)
    return moved
  })
}

for (const [what, id] of [
  ['the card screen', CARDS],
  ["a record's page", RECORD],
] as const) {
  test.describe(`Scrolling — ${what}`, () => {
    test('has more results than fit, which is what makes the rest worth asserting', async ({
      page,
    }) => {
      await gotoStory(page, id)
      expect(await resultsOverhang(page)).toBeGreaterThan(0)
    })

    test('leaves the page with nothing to scroll', async ({ page }) => {
      await gotoStory(page, id)
      expect(await pageOverhang(page)).toBe(0)
      expect(await scrollThePage(page)).toBe(0)
    })

    test('keeps its announcements inside the box that scrolls', async ({ page }) => {
      await gotoStory(page, id)
      const results = await page.locator('.dc-type__sr').evaluateAll((spans) =>
        spans.map((span) => (span as HTMLElement).offsetParent?.className ?? 'none'),
      )
      expect(results.length).toBeGreaterThan(0)
      for (const parent of results) expect(parent).toContain('dc-results')
    })
  })
}

/**
 * Narrow enough that the cards come down to one column, which is the shape
 * that overflowed hardest — and the one a host reaches by widening its rows.
 */
test.describe('Scrolling — a narrow screen', () => {
  test.use({ viewport: { width: 720, height: 620 } })

  test('stacks the cards without handing the page a scrollbar', async ({ page }) => {
    await gotoStory(page, HOME)
    expect(await resultsOverhang(page)).toBeGreaterThan(0)
    expect(await pageOverhang(page)).toBe(0)
    expect(await scrollThePage(page)).toBe(0)
  })
})
