import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'
import { gotoStory } from './story'

/**
 * Layers written beside a shell rather than inside it: a popover a host
 * builds its own control on, one inside a dialog, and the dialog and toasts
 * themselves — all dressed by the app's default theme, dark beside a light
 * shell, and all drawn in `body`.
 */

const STORY = 'parts-controls--layers-beside-a-shell'

const style = (locator: Locator, property: string) =>
  locator.evaluate((element, name) => getComputedStyle(element).getPropertyValue(name), property)

/** A colour as the browser resolves it inside an element — that element's tokens. */
const resolvedIn = (locator: Locator, property: string, value: string) =>
  locator.evaluate(
    (element, [name, wanted]) => {
      const probe = document.createElement('span')
      probe.style.setProperty(name!, wanted!)
      element.append(probe)
      const out = getComputedStyle(probe).getPropertyValue(name!)
      probe.remove()
      return out
    },
    [property, value],
  )

/** Waits out the pop-in, whose transform would otherwise be in the box measured. */
const settled = (locator: Locator) =>
  locator.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)))

const box = (page: Page, name: string) => page.locator(`body > .dc-popover.story-tenants--${name}`)
const pick = (page: Page, name: string) => page.locator(`.story-pick--${name}`)

test.describe('ShellPopover', () => {
  test('opens in body under its anchor, as wide as it at least, in the app’s theme', async ({ page }) => {
    await gotoStory(page, STORY)
    await pick(page, 'top').click()
    const popover = box(page, 'top')
    await expect(popover).toBeVisible()
    await expect(popover).toHaveAttribute('data-dc-theme', 'dark')
    await expect(popover).toHaveAttribute('data-dc-side', 'below')
    await expect(popover).toHaveClass(/dc-shell/)
    await settled(popover)

    const anchor = (await pick(page, 'top').boundingBox())!
    const at = (await popover.boundingBox())!
    expect(Math.round(at.y)).toBe(Math.round(anchor.y + anchor.height + 4))
    expect(Math.round(at.x)).toBe(Math.round(anchor.x))
    expect(at.width).toBeGreaterThanOrEqual(anchor.width - 1)

    // A layer: the shell's palette and none of its layout.
    expect(await style(popover, 'display')).toBe('block')
    expect(await style(popover, 'container-type')).toBe('normal')
    expect(await style(popover, 'background-color')).toBe(
      await resolvedIn(popover, 'background-color', 'var(--dc-raised)'),
    )
    // Dark, beside a light shell.
    expect(await style(popover, 'background-color')).not.toBe(
      await style(page.locator('.story-shell'), 'background-color'),
    )
  })

  test('opens above an anchor too near the bottom, and scrolls what does not fit', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 600 })
    await gotoStory(page, STORY)
    await pick(page, 'low').click()
    const popover = box(page, 'low')
    await expect(popover).toHaveAttribute('data-dc-side', 'above')
    await settled(popover)
    const anchor = (await pick(page, 'low').boundingBox())!
    const at = (await popover.boundingBox())!
    expect(Math.round(at.y + at.height)).toBe(Math.round(anchor.y - 4))
    expect(at.height).toBeLessThanOrEqual(300)
    expect(await popover.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true)
  })

  test('follows its anchor when the window changes size', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 600 })
    await gotoStory(page, STORY)
    await pick(page, 'low').click()
    const popover = box(page, 'low')
    await expect(popover).toBeVisible()
    await page.setViewportSize({ width: 1000, height: 760 })
    const anchor = (await pick(page, 'low').boundingBox())!
    await expect
      .poll(async () => {
        const at = (await popover.boundingBox())!
        return Math.round(at.y + at.height)
      })
      .toBe(Math.round(anchor.y - 4))
  })

  test('stays up for presses inside it and closes on one outside', async ({ page }) => {
    await gotoStory(page, STORY)
    await pick(page, 'top').click()
    const popover = box(page, 'top')
    const option = popover.locator('.story-option').first()
    await option.click()
    await expect(option).toHaveAttribute('aria-pressed', 'true')
    await expect(popover).toBeVisible()
    await expect(pick(page, 'top')).toContainText('1 tenant(s): tenant-01')

    await page.locator('.story-shell').click({ position: { x: 600, y: 300 } })
    await expect(popover).toHaveCount(0)
  })

  test('closes on Escape, giving the focus back to its anchor', async ({ page }) => {
    await gotoStory(page, STORY)
    await pick(page, 'top').click()
    await box(page, 'top').locator('.story-filter').fill('2')
    await page.keyboard.press('Escape')
    await expect(box(page, 'top')).toHaveCount(0)
    await expect(pick(page, 'top')).toBeFocused()
  })
})

test.describe('ShellDialog beside a shell', () => {
  const dialog = (page: Page) => page.locator('body > .dc-dialog')

  test('wears the app’s theme, and controls.css sets out its list and its label', async ({ page }) => {
    await gotoStory(page, STORY)
    await page.locator('.story-open-dialog').click()
    await expect(dialog(page)).toHaveAttribute('data-dc-theme', 'dark')
    const body = dialog(page).locator('.dc-dialog__body')
    await expect(body).toHaveClass(/story-dialog-body/)
    expect(await style(body.locator('ul'), 'padding-left')).toBe('20px')
    expect(await style(body.locator('label'), 'display')).toBe('flex')
  })

  test('a popover in it opens over it, and Escape takes the popover down first', async ({ page }) => {
    await gotoStory(page, STORY)
    await page.locator('.story-open-dialog').click()
    await pick(page, 'dialog').click()
    const popover = box(page, 'dialog')
    await expect(popover).toBeVisible()
    // Over the dialog: a press on one of its options lands on it.
    await popover.locator('.story-option').nth(2).click()
    await expect(pick(page, 'dialog')).toContainText('tenant-03')

    await page.keyboard.press('Escape')
    await expect(popover).toHaveCount(0)
    await expect(dialog(page)).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog(page)).toHaveCount(0)
  })

  test('raises a toast in the app’s theme', async ({ page }) => {
    await gotoStory(page, STORY)
    await page.locator('.story-open-dialog').click()
    await dialog(page).locator('button.primary').click()
    await expect(page.locator('body > .dc-toasts .dc-toast')).toHaveText('Crawl started')
    await expect(page.locator('body > .dc-toasts')).toHaveAttribute('data-dc-theme', 'dark')
  })
})
