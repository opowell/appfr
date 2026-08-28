import { expect, test } from '@playwright/test'
import { clickOutsidePanel, gotoStory, header, openPanel, panel, pickEntity, summary, trigger } from './story'

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
