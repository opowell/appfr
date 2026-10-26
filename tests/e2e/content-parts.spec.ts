import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'
import { gotoStory } from './story'

/**
 * The content parts, in the page they exist for: a run's cards, built from
 * the library's parts with `controls.css` dressing the host's own markup —
 * and the dialog and toasts that are drawn in `body`, outside the shell.
 */

const RECORD = 'parts-controls--record-content'
const RECORD_MINIMAL = 'parts-controls--record-content-minimal'
const PILLS = 'parts-controls--pill-tones-and-counts'
const DIALOG = 'parts-controls--dialog-and-toasts'

const card = (page: Page, cls: string) => page.locator(`.dc-shell-card.${cls}`)

/** A colour as the browser resolves it, from a probe element wearing it. */
async function resolved(page: Page, color: string): Promise<string> {
  return page.evaluate((value) => {
    const shell = document.querySelector('.dc-shell')!
    const probe = document.createElement('span')
    probe.style.color = value
    shell.append(probe)
    const out = getComputedStyle(probe).color
    probe.remove()
    return out
  }, color)
}

const style = (locator: Locator, property: string) =>
  locator.evaluate((element, name) => getComputedStyle(element).getPropertyValue(name), property)

test.describe('ShellCard — identity head', () => {
  test('heads the card with the name over a muted, mono reference', async ({ page }) => {
    await gotoStory(page, RECORD)
    const head = page.locator('.dc-shell-card__identity').first()
    await expect(head.locator('h2')).toHaveText('Run 2026-10-26-0912')
    const reference = head.locator('.dc-shell-card__ref')
    await expect(reference).toHaveText('https://shop.example.com/en/pages/skipass')
    const nameBox = await head.locator('h2').boundingBox()
    const refBox = await reference.boundingBox()
    expect(refBox!.y).toBeGreaterThan(nameBox!.y)
    expect(await style(reference, 'color')).not.toBe(await style(head.locator('h2'), 'color'))
  })

  test('a long reference wraps on a phone rather than running out of the card', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await gotoStory(page, RECORD)
    const first = page.locator('.dc-shell-card').first()
    const reference = first.locator('.dc-shell-card__ref')
    expect(await reference.evaluate((element) => element.scrollWidth - element.clientWidth)).toBe(0)
    const lines = await reference.evaluate(
      (element) => element.getClientRects().length > 1 ||
        element.getBoundingClientRect().height > parseFloat(getComputedStyle(element).lineHeight) * 1.5,
    )
    expect(lines).toBe(true)
    const box = await reference.boundingBox()
    const cardBox = await first.boundingBox()
    expect(box!.x + box!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width)
  })
})

test.describe('ShellFacts', () => {
  test('lays the facts out in columns, a wide one across the row', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await gotoStory(page, RECORD)
    const summary = card(page, 'story-summary')
    const facts = summary.locator('.dc-fact')
    const one = await facts.nth(0).boundingBox()
    const two = await facts.nth(1).boundingBox()
    expect(Math.abs(one!.y - two!.y)).toBeLessThan(1)
    expect(two!.x).toBeGreaterThan(one!.x)

    const grid = await summary.locator('.dc-facts').boundingBox()
    const command = await summary.locator('.story-command').boundingBox()
    expect(Math.abs(command!.width - grid!.width)).toBeLessThan(1)

    // A list is a line per entry; nothing is the dash.
    await expect(facts.nth(4).locator('.dc-fact__line')).toHaveCount(2)
    await expect(facts.nth(1).locator('dd')).toHaveText('—')
    // The dark theme sets its small labels in caps.
    expect(await style(facts.nth(0).locator('dt'), 'text-transform')).toBe('uppercase')
  })
})

test.describe('ShellCode', () => {
  test('is the body of a flush card, and an inset box anywhere else', async ({ page }) => {
    await gotoStory(page, RECORD)
    const source = card(page, 'story-source').locator('.dc-code')
    expect(await style(source, 'border-top-width')).toBe('0px')
    const command = card(page, 'story-summary').locator('.dc-code')
    expect(await style(command, 'border-top-width')).toBe('1px')
  })

  test('scrolls in place under its ceiling, keeping the wheel to itself', async ({ page }) => {
    await gotoStory(page, RECORD)
    const pre = card(page, 'story-source').locator('pre')
    const box = await pre.boundingBox()
    expect(Math.round(box!.height)).toBe(200)
    expect(await pre.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true)
    expect(await style(pre, 'overscroll-behavior-y')).toBe('contain')
  })

  test('an error wears the danger rule down its side, flush or not', async ({ page }) => {
    await gotoStory(page, RECORD)
    const error = card(page, 'story-error').locator('.dc-code')
    expect(await style(error, 'box-shadow')).toContain('inset')
  })

  test('copies its text, ticks, and the host can say so with a toast', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await gotoStory(page, RECORD)
    const copy = card(page, 'story-source').locator('.dc-copy')
    await expect(copy).toHaveAccessibleName('Copy the source')
    await copy.click()
    await expect(copy).toHaveAttribute('data-dc-copied', 'true')
    const copied = await page.evaluate(() => navigator.clipboard.readText())
    expect(copied.startsWith("  await page.getByRole('button', { name: 'Step 1' })")).toBe(true)
    await expect(copy).toHaveAttribute('data-dc-copied', 'false', { timeout: 3000 })

    const toast = page.locator('body > .dc-toasts .dc-toast')
    await expect(toast).toHaveText('Source copied')
    await expect(page.locator('body > .dc-toasts')).toHaveAttribute('data-dc-theme', 'dark')
  })
})

test.describe('ShellLog', () => {
  const pane = (page: Page) => card(page, 'story-output').locator('.dc-log')
  const atEnd = (log: Locator) =>
    log.evaluate((element) => element.scrollTop + element.clientHeight >= element.scrollHeight - 2)

  test('shows the log without its colour codes, at its tail', async ({ page }) => {
    await gotoStory(page, RECORD)
    const log = pane(page)
    await expect(log).toContainText('line 30: ok')
    expect(await log.textContent()).not.toContain('[31m')
    expect(await atEnd(log)).toBe(true)
  })

  test('follows the tail, until the reader scrolls up', async ({ page }) => {
    await gotoStory(page, RECORD)
    const log = pane(page)
    const append = card(page, 'story-output').locator('.story-append')
    await expect(log).toContainText('line 30: ok')

    await append.click()
    await expect(log).toContainText('line 60: ok')
    expect(await atEnd(log)).toBe(true)

    await log.evaluate((element) => {
      element.scrollTop = 0
    })
    await append.click()
    await expect(log).toContainText('line 90: ok')
    expect(await log.evaluate((element) => element.scrollTop)).toBe(0)
  })
})

test.describe('controls.css', () => {
  test('dresses the host’s buttons in the theme, and leaves the shell’s own alone', async ({ page }) => {
    await gotoStory(page, RECORD)
    const head = page.locator('.dc-shell-card').first()
    const primary = head.locator('button.primary')
    const plain = head.locator('button.host-plain')
    const danger = head.locator('button.danger')

    expect(await style(primary, 'background-color')).toBe(await resolved(page, 'var(--dc-accent)'))
    expect(await style(primary, 'color')).toBe(await resolved(page, 'var(--dc-accent-contrast)'))
    expect(await style(danger, 'color')).toBe(await resolved(page, 'var(--dc-danger)'))
    expect(await style(plain, 'border-top-width')).toBe('1px')
    expect(await style(plain, 'background-color')).toBe(await resolved(page, 'var(--dc-bg-2)'))

    // The fold toggle is the shell's, and has a `dc-` class: untouched.
    const toggle = card(page, 'story-summary').locator('.dc-shell-card__toggle')
    expect(await style(toggle, 'border-top-width')).toBe('0px')
    expect(await style(toggle, 'background-color')).toBe('rgba(0, 0, 0, 0)')
  })

  test('draws a host table and the hints in the shell’s tokens', async ({ page }) => {
    await gotoStory(page, RECORD)
    const th = card(page, 'story-results').locator('th').first()
    expect(await style(th, 'text-transform')).toBe('uppercase')
    expect(await style(th, 'color')).toBe(await resolved(page, 'var(--dc-fg-2)'))
    const warn = page.locator('.dc-hint--warn')
    expect(await style(warn, 'color')).toBe(await resolved(page, 'var(--dc-warn)'))
  })

  test('the minimal theme keeps its square corners on the host’s buttons', async ({ page }) => {
    await gotoStory(page, RECORD_MINIMAL)
    const plain = page.locator('button.host-plain')
    expect(await style(plain, 'border-top-left-radius')).toBe('0px')
  })
})

test.describe('StatusPill and StatusCounts', () => {
  test('a tone wears the status colour it is named for', async ({ page }) => {
    await gotoStory(page, PILLS)
    const pill = (tone: string) => page.locator(`.dc-pill[data-dc-tone="${tone}"]`).first()
    expect(await style(pill('accent'), 'color')).toBe(await style(pill('running'), 'color'))
    expect(await style(pill('neutral'), 'color')).toBe(await style(pill('queued'), 'color'))
    expect(await style(pill('failed'), 'color')).not.toBe(await style(pill('ok'), 'color'))
    await expect(page.locator('.dc-pill', { hasText: 'live — no profile' })).toBeVisible()
  })

  test('counts leave out the zeros, and an empty row is the dash', async ({ page }) => {
    await gotoStory(page, PILLS)
    const rows = page.locator('.dc-counts')
    await expect(rows.first().locator('.dc-counts__count')).toHaveText([
      '12 passed',
      '1 failed',
      '2 flaky',
      '3 skipped',
      '1 running',
    ])
    // The separator is drawn between them, in the row's quiet colour.
    const second = rows.first().locator('.dc-counts__count').nth(1)
    expect(await second.evaluate((element) => getComputedStyle(element, '::before').content)).toBe('" · "')
    expect(await second.evaluate((element) => getComputedStyle(element, '::before').color)).toBe(
      await style(rows.first(), 'color'),
    )
    await expect(rows.nth(1)).toHaveText('—')
  })
})

test.describe('ShellDialog and ShellToasts', () => {
  const dialog = (page: Page) => page.locator('body > .dc-dialog')

  test('is drawn in body, in the theme of the shell it was opened from', async ({ page }) => {
    await gotoStory(page, DIALOG)
    await expect(dialog(page)).toHaveCount(0)
    await page.locator('.story-open').click()
    await expect(page.getByRole('dialog', { name: 'Duplicate test' })).toBeVisible()
    await expect(dialog(page)).toHaveAttribute('data-dc-theme', 'dark')
    // Dark, not the white of a shell with no theme: the tokens reached it.
    const panel = dialog(page).locator('.dc-dialog__panel')
    expect(await style(panel, 'background-color')).not.toBe('rgb(255, 255, 255)')
    // And controls.css dresses its buttons as it does the shell's.
    const confirm = dialog(page).locator('button.primary')
    expect(await style(confirm, 'background-color')).toBe(await resolved(page, 'var(--dc-accent)'))
  })

  test('takes the focus, and gives it back when Escape closes it', async ({ page }) => {
    await gotoStory(page, DIALOG)
    const opener = page.locator('.story-open')
    await opener.click()
    await expect(dialog(page).locator('.story-name')).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(dialog(page)).toHaveCount(0)
    await expect(opener).toBeFocused()
  })

  test('closes on a press of the backdrop, not of the panel', async ({ page }) => {
    await gotoStory(page, DIALOG)
    await page.locator('.story-open').click()
    await dialog(page).locator('.dc-dialog__title').click()
    await expect(dialog(page)).toHaveCount(1)
    await dialog(page).click({ position: { x: 5, y: 5 } })
    await expect(dialog(page)).toHaveCount(0)
  })

  test('raises a toast that goes away on its own; an error is an alert', async ({ page }) => {
    await gotoStory(page, DIALOG)
    await page.locator('.story-open').click()
    await dialog(page).locator('.story-name').fill('flow-9')
    await dialog(page).locator('.story-confirm').click()
    await expect(dialog(page)).toHaveCount(0)
    const toast = page.locator('body > .dc-toasts .dc-toast')
    await expect(toast).toHaveText('Duplicated as “flow-9”')
    await expect(toast).toHaveAttribute('data-dc-kind', 'ok')

    await page.locator('.story-fail').click()
    await expect(page.getByRole('alert')).toHaveText('The server said no')
    // The ok toast's 4.5s, not the error's 9s.
    await expect(page.locator('.dc-toast[data-dc-kind="ok"]')).toHaveCount(0, { timeout: 7000 })
    await expect(page.getByRole('alert')).toBeVisible()
  })
})
