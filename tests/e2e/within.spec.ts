import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory, listRows, pickEntity, scopeLabel, terms } from './story'
import { legoSchema } from '../../src/fixtures/schemas'

/**
 * A shell read inside one record: `within` at the head of the bar, a card per
 * type of what matched inside it, and the host's own cards among them.
 */

const RECORD = 'shell-data-shell--record-page'
const NARROWED = 'shell-data-shell--record-page-narrowed'
const ENTITY = 'shell-data-shell--record-page-entity'
const HOME = 'shell-data-shell--home-drillable'

/** The fixed part at the head of the bar — the scope, not a term. */
const scope = (page: Page) => page.locator('.dc-within')

const typeCard = (page: Page, label: string) =>
  page.locator('.dc-type').filter({
    has: page.locator('.dc-type__name', { hasText: new RegExp(`^${label}$`) }),
  })

const hostCards = (page: Page) => page.locator('.dc-shell-card')

test.describe('within — the scope on the bar', () => {
  test('is stated at the head of the bar', async ({ page }) => {
    await gotoStory(page, RECORD)
    await expect(scope(page)).toHaveCount(1)
  })

  test('names the record it points at rather than only its id', async ({ page }) => {
    await gotoStory(page, RECORD)
    await expect(scope(page)).toHaveText('set:Yellow Castle (sets_10007)')
  })

  test('is not a term: there is nothing on the bar to lift it with', async ({ page }) => {
    await gotoStory(page, RECORD)
    await expect(terms(page)).toHaveCount(0)
    await expect(scope(page).locator('button')).toHaveCount(0)
  })

  test('a query of its own is still a term beside it', async ({ page }) => {
    await gotoStory(page, NARROWED)
    await expect(scope(page)).toHaveCount(1)
    await expect(terms(page)).toHaveCount(1)
    await expect(terms(page)).toHaveText('1978')
  })

  test('lifting that term leaves the scope in place', async ({ page }) => {
    await gotoStory(page, NARROWED)
    await terms(page).first().click()
    await expect(terms(page)).toHaveCount(0)
    await expect(scope(page)).toHaveCount(1)
  })

  test('a shell read inside nothing has no scope on its bar', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(scope(page)).toHaveCount(0)
  })
})

test.describe('within — what the counts say', () => {
  test('Everything counts what is in the scope, not the corpus', async ({ page }) => {
    await gotoStory(page, HOME)
    const whole = await scopeLabel(page)
    await gotoStory(page, RECORD)
    const inside = await scopeLabel(page)
    expect(inside).toMatch(/^Everything · [\d,]+$/)
    expect(inside).not.toBe(whole)
  })

  test('a type card reports its matches rather than its published population', async ({ page }) => {
    await gotoStory(page, RECORD)
    const published = legoSchema.entities.map((entity) => entity.count)
    const shown = await page.locator('.dc-type__count').allInnerTexts()
    expect(shown).not.toEqual(published)
  })

  test('a type with nothing in the scope says so', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--record-page-mostly-empty')
    await expect(page.locator('.dc-type__empty').first()).toHaveText('No matches')
  })

  test('a type listed inside the scope reports only what is in it', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await expect(listRows(page).first()).toBeVisible()

    const pieces = legoSchema.entities.find((entity) => entity.key === 'pieces')
    const published = Number((pieces?.count ?? '0').replace(/\D/g, ''))
    const label = await scopeLabel(page)
    expect(label).toMatch(/^Pieces · [\d,]+$/)
    expect(Number(label.replace(/\D/g, ''))).toBeLessThan(published)
  })
})

test.describe('cards of the host’s own', () => {
  test('sit in the same grid as the type cards', async ({ page }) => {
    await gotoStory(page, RECORD)
    await expect(page.locator('.dc-types .dc-shell-card')).toHaveCount(4)
  })

  test('come before and after them, in that order', async ({ page }) => {
    await gotoStory(page, RECORD)
    const order = await page
      .locator('.dc-types > *')
      .evaluateAll((nodes) => nodes.map((node) => node.className.split(' ')[0]))
    const first = order.indexOf('dc-type')
    const last = order.lastIndexOf('dc-type')
    expect(order.slice(0, first).every((name) => name === 'dc-shell-card')).toBe(true)
    expect(order.slice(last + 1).every((name) => name === 'dc-shell-card')).toBe(true)
  })

  test('a card can span the whole grid', async ({ page }) => {
    await gotoStory(page, RECORD)
    const grid = await page.locator('.dc-types').boundingBox()
    const wide = await hostCards(page).first().boundingBox()
    expect(wide?.width).toBeGreaterThan((grid?.width ?? 0) - 40)
  })

  /*
   * A body that is a `v-if` over a warning, and an aside that is a row of
   * controls the record has not loaded yet: passed, and rendering nothing.
   */
  test('draw no strip for a slot that renders nothing', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--record-page-empty-slots')
    const card = page.locator('.dc-shell-card').first()
    await expect(card.locator('.dc-shell-card__head')).toHaveCount(1)
    await expect(card.locator('.dc-shell-card__aside')).toHaveCount(0)
    await expect(card.locator('.dc-shell-card__body')).toHaveCount(0)
    await expect(card.locator('.dc-shell-card__foot')).toHaveCount(0)
  })

  test('are gone once a type is being listed, that view being records', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await expect(hostCards(page)).toHaveCount(0)
  })

  test('and come back when Everything is chosen again', async ({ page }) => {
    await gotoStory(page, RECORD)
    await pickEntity(page, 'Pieces')
    await expect(hostCards(page)).toHaveCount(0)
    await page.locator('.dc-header__scope-select').selectOption('')
    await expect(typeCard(page, 'Sets')).toBeVisible()
    await expect(hostCards(page)).toHaveCount(4)
  })
})
