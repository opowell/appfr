import { expect, test } from '@playwright/test'
import {
  clearScope,
  expressionBox,
  gotoStory,
  listRows,
  openPanel,
  panel,
  parts,
  pickEntity,
  scopeSelect,
  termBar,
  terms,
  viewSelect,
} from './story'
import { commerceSchema } from '../../src/fixtures/schemas'
import { findEntity } from '../../src/query/schema'
import type { ChipsFacet } from '../../src/types'

const HOME_OPEN = 'shell-data-shell--home-panel-open'
const REGIONS = 'schemas-same-shell--commerce-regions'

/** The fixture's multi-valued facet: a tenant runs in one region or several. */
const REGION = findEntity(commerceSchema, 'tenants')!.facets.find(
  (facet) => facet.key === 'region',
) as ChipsFacet
const HOST_SECTION = 'shell-data-shell--host-panel-section'
const ENTITY = 'shell-data-shell--entity-list'

/** Where a drill lands: one term in the query, and nobody typed it. */
const DRILLED = 'shell-data-shell--drilled-into-pieces'

/** A term and a row of words together, which is what a real query looks like. */
const LONG = 'shell-data-shell--long-query'

/*
 * What is listed, how it is drawn and what it is ordered by are chosen on the
 * bar — they are the parts of a query that are chosen rather than lifted, and
 * they are said where the rest of the query is said. What is left here is what
 * narrows a type: its facets, and the expression.
 */
test.describe('Query panel — the facets of the type in force', () => {
  test('holds the query alone, the choosers being on the bar', async ({ page }) => {
    await gotoStory(page, HOME_OPEN)
    await expect(panel(page).locator('.dc-entity')).toHaveCount(0)
    await expect(panel(page).getByRole('radiogroup')).toHaveCount(0)
  })

  test('offers no facets until an entity is picked', async ({ page }) => {
    await gotoStory(page, HOME_OPEN)
    await expect(page.locator('.dc-facet__label')).toHaveCount(0)
  })

  test('picking an entity narrows the results and reveals its facets', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-as-list')
    const before = await listRows(page).count()

    await openPanel(page)
    await pickEntity(page, 'Searches')

    await expect(page.locator('.dc-facet__label')).toHaveText(['State', 'Schedule', 'Results'])
    const after = await listRows(page).count()
    expect(after).toBeLessThan(before)
    await expect(scopeSelect(page)).toHaveValue('searches')
  })

  test('Everything puts every kind back in the results', async ({ page }) => {
    await gotoStory(page, ENTITY)
    const scoped = await listRows(page).count()

    await openPanel(page)
    await clearScope(page)

    await expect(page.locator('.dc-facet__label')).toHaveCount(0)
    expect(await listRows(page).count()).toBeGreaterThan(scoped)
    await expect(viewSelect(page)).toHaveValue('list')
  })

  test('re-shapes its facets when the entity changes', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)
    await pickEntity(page, 'Items')
    await expect(page.locator('.dc-facet__label')).toHaveText(['Kind', 'Rank', 'Seen'])
  })

  test('renders each facet kind with its own control', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)
    await pickEntity(page, 'Items')

    await expect(page.locator('.dc-chip').first()).toBeVisible()
    await expect(page.locator('.dc-facet__range input')).toHaveCount(2)
    await expect(page.locator('.dc-switch[role="switch"]')).toHaveCount(1)
  })
})

test.describe('Query panel — narrowing the result set', () => {
  test('a chip narrows the content and updates the header', async ({ page }) => {
    await gotoStory(page, ENTITY)
    const before = await listRows(page).count()

    await openPanel(page)
    await page.locator('.dc-chip', { hasText: 'running' }).first().click()

    await expect(terms(page)).toHaveText(['state:running'])
    const after = await listRows(page).count()
    expect(after).toBeGreaterThan(0)
    expect(after).toBeLessThan(before)
  })

  test('two chips in one facet widen the set again', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)

    await page.locator('.dc-chip', { hasText: 'running' }).first().click()
    const one = await listRows(page).count()

    await page.locator('.dc-chip', { hasText: 'paused' }).first().click()
    const two = await listRows(page).count()

    expect(two).toBeGreaterThan(one)
    await expect(terms(page)).toHaveText(['state:running', 'state:paused'])
  })

  test('a chip keeps the rows holding its value among several', async ({ page }) => {
    await gotoStory(page, REGIONS)
    const all = await listRows(page).count()
    await openPanel(page)

    const chip = (option: string) =>
      page.locator('.dc-chip').filter({ hasText: new RegExp(`^${option}$`) }).first()

    let summed = 0
    for (const option of REGION.options) {
      await chip(option).click()
      await expect(terms(page)).toHaveText([`${REGION.key}:${option}`])
      const narrowed = await listRows(page).count()
      expect(narrowed).toBeGreaterThan(0)
      expect(narrowed).toBeLessThan(all)
      summed += narrowed
      await chip(option).click()
    }

    // Only possible because a row sits in more than one chip's set.
    expect(summed).toBeGreaterThan(all)
  })

  test('chips in different facets intersect', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)

    await page.locator('.dc-chip', { hasText: 'running' }).first().click()
    const one = await listRows(page).count()

    await page.locator('.dc-chip', { hasText: 'daily' }).first().click()
    expect(await listRows(page).count()).toBeLessThanOrEqual(one)
  })

  test('a chip reports its own state and toggles off', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)
    const chip = page.locator('.dc-chip', { hasText: 'running' }).first()

    await expect(chip).toHaveAttribute('aria-pressed', 'false')
    await chip.click()
    await expect(chip).toHaveAttribute('aria-pressed', 'true')
    await chip.click()
    await expect(chip).toHaveAttribute('aria-pressed', 'false')
    await expect(terms(page)).toHaveCount(0)
  })

  test('a range narrows on commit, not on keystroke', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--grid-view')
    await openPanel(page)

    const min = page.locator('.dc-facet__range input').first()
    await min.fill('90')
    await expect(terms(page)).toHaveCount(0)

    await min.press('Enter')
    await expect(terms(page)).toHaveText(['rank:90..'])
  })

  test('a toggle narrows to the rows carrying its flag', async ({ page }) => {
    await gotoStory(page, ENTITY)
    const before = await listRows(page).count()

    await openPanel(page)
    const flag = page.locator('.dc-switch[role="switch"]')
    await expect(flag).toHaveAttribute('aria-checked', 'false')
    await flag.click()

    await expect(flag).toHaveAttribute('aria-checked', 'true')
    await expect(terms(page)).toHaveText(['results:on'])
    expect(await listRows(page).count()).toBeLessThan(before)
  })

  test('an expression commits on the button, not while typing', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)

    await page.locator('.dc-expression').fill('regulatory')
    await expect(terms(page)).toHaveCount(0)

    await page.locator('.dc-button--primary').click()
    await expect(terms(page)).toHaveText(['regulatory'])
    await expect(listRows(page)).toHaveCount(8)
  })

  test('an expression from home searches every kind at once', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home-as-list')
    await openPanel(page)
    await page.locator('.dc-expression').fill('digest')
    await page.locator('.dc-button--primary').click()

    await expect(terms(page)).toHaveText(['digest'])
    const kinds = new Set(await page.locator('.dc-list__entity').allInnerTexts())
    expect(kinds).toEqual(new Set(['Settings']))
  })

  test('an expression commits on Enter', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)
    await page.locator('.dc-expression').fill('firmware')
    await page.locator('.dc-expression').press('Enter')
    await expect(terms(page)).toHaveText(['firmware'])
  })

  test('an expression also commits on Meta+Enter', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)
    await page.locator('.dc-expression').fill('firmware')
    await page.locator('.dc-expression').press('Meta+Enter')
    await expect(terms(page)).toHaveText(['firmware'])
  })

  test('committing the expression closes the panel, so results are visible', async ({ page }) => {
    await gotoStory(page, ENTITY)
    await openPanel(page)
    await page.locator('.dc-expression').fill('regulatory')
    await page.locator('.dc-button--primary').click()
    await expect(panel(page)).toHaveCount(0)
  })

  test('Reset lifts the entity, the facets and the expression at once', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--facets-and-expression')
    await expect(scopeSelect(page)).toHaveValue('items')

    await openPanel(page)
    await page.locator('.dc-panel__actions button', { hasText: 'Reset' }).click()
    await expect(viewSelect(page)).toHaveValue('list')
  })

  test('Reset is unavailable at home, where there is nothing to reset', async ({ page }) => {
    await gotoStory(page, HOME_OPEN)
    await expect(page.locator('.dc-panel__actions button', { hasText: 'Reset' })).toBeDisabled()
  })
})

/*
 * The field the expression is written in.
 *
 * A `field:value` term is a whole constraint on its own, and most of them were
 * written by a drill rather than typed — so the field shows each of those as a
 * part that comes out when it is pressed, and keeps the box for what a person
 * writes into it: the words to look for, or the next part to add.
 */
test.describe('Query panel — the parts of an expression', () => {
  test('shows a term the query already names as a part, not as text', async ({ page }) => {
    await gotoStory(page, DRILLED)
    await openPanel(page)

    await expect(parts(page)).toHaveText(['set:sets_10007'])
    await expect(expressionBox(page)).toHaveValue('')
  })

  test('keeps the words beside the parts, in the box', async ({ page }) => {
    await gotoStory(page, LONG)
    await openPanel(page)

    await expect(parts(page)).toHaveText(['year>=1988'])
    await expect(expressionBox(page)).toHaveValue(
      'example.com digest advisory recall bulletin retraction erratum notice revision',
    )
  })

  test('leaves an expression of alternatives whole, in the box', async ({ page }) => {
    // `release` lifted out of `release OR recall` and ANDed back on to the
    // whole is a different query, so this one is not taken apart here.
    await gotoStory(page, 'shell-data-shell--expression-query')
    await openPanel(page)

    await expect(parts(page)).toHaveCount(0)
    await expect(expressionBox(page)).toHaveValue('release OR recall')
  })

  test('pressing a part takes it out, and the rest goes on running', async ({ page }) => {
    await gotoStory(page, DRILLED)
    const scoped = await page.locator('.dc-table__row').count()

    await openPanel(page)
    await parts(page).first().click()

    await expect(parts(page)).toHaveCount(0)
    // Only that part: the pieces are still what is listed, and there are more
    // of them now that they are not one set's.
    await expect(scopeSelect(page)).toHaveValue('pieces')
    expect(await page.locator('.dc-table__row').count()).toBeGreaterThan(scoped)
  })

  test('pressing a part leaves the words beside it in the query', async ({ page }) => {
    await gotoStory(page, LONG)
    await openPanel(page)
    const words = await expressionBox(page).inputValue()

    await parts(page).first().click()

    // The box still holds them, and it is filled from the committed query —
    // so they are still in it.
    await expect(parts(page)).toHaveCount(0)
    await expect(expressionBox(page)).toHaveValue(words)
    await expect(termBar(page)).toContainText('example.com')
  })

  test('pressing a part keeps what is half typed beside it', async ({ page }) => {
    await gotoStory(page, DRILLED)
    await openPanel(page)
    await expressionBox(page).fill('brick')

    await parts(page).first().click()

    // The part is gone; the typing is still a draft, waiting for Run.
    await expect(parts(page)).toHaveCount(0)
    await expect(expressionBox(page)).toHaveValue('brick')
    await expect(termBar(page)).not.toContainText('brick')
  })

  test('backspacing an empty box lifts the part in front of it', async ({ page }) => {
    await gotoStory(page, DRILLED)
    const scoped = await page.locator('.dc-table__row').count()
    await openPanel(page)

    await expressionBox(page).press('Backspace')

    await expect(parts(page)).toHaveCount(0)
    expect(await page.locator('.dc-table__row').count()).toBeGreaterThan(scoped)
  })

  test('backspacing over typed text lifts nothing', async ({ page }) => {
    await gotoStory(page, DRILLED)
    await openPanel(page)
    await expressionBox(page).fill('brick')

    await expressionBox(page).press('Backspace')

    await expect(expressionBox(page)).toHaveValue('bric')
    await expect(parts(page)).toHaveText(['set:sets_10007'])
  })

  test('a term typed into the box becomes a part of its own', async ({ page }) => {
    await gotoStory(page, ENTITY)
    const before = await listRows(page).count()

    await openPanel(page)
    await expressionBox(page).fill('state:running')
    await expressionBox(page).press('Enter')
    expect(await listRows(page).count()).toBeLessThan(before)

    // Committed, so it is one of the query's parts now rather than text.
    await openPanel(page)
    await expect(parts(page)).toHaveText(['state:running'])
    await expect(expressionBox(page)).toHaveValue('')
  })

  test('a word typed beside a part joins it rather than replacing it', async ({ page }) => {
    await gotoStory(page, DRILLED)
    await openPanel(page)
    await expressionBox(page).fill('brick')
    await expressionBox(page).press('Enter')

    await openPanel(page)
    await expect(parts(page)).toHaveText(['set:sets_10007'])
    await expect(expressionBox(page)).toHaveValue('brick')
  })
})

test.describe('Query panel — host section', () => {
  test('renders a host section last, inside the panel', async ({ page }) => {
    await gotoStory(page, HOST_SECTION)
    const sections = panel(page).locator('> .dc-panel__section')
    await expect(sections).toHaveCount(2)
    await expect(sections.last()).toContainText('App')
    await expect(sections.last().getByRole('button', { name: 'Reload data' })).toBeVisible()
  })

  test('adds no section when the host gives none', async ({ page }) => {
    await gotoStory(page, HOME_OPEN)
    await expect(panel(page).locator('> .dc-panel__section')).toHaveCount(1)
  })
})
