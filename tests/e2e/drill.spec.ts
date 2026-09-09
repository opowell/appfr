import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import {
  expressionBox,
  gotoStory,
  openPanel,
  parts,
  scopeSelect,
  termBar,
  terms,
  viewSelect,
} from './story'

/**
 * Narrowing to one record.
 *
 * Pressing a row adds that record to the query — everything about it, of every
 * type — and pressing a metric narrows to what that number counts. The shell
 * applies both, so these tests press and then read the query back out of the
 * address bar.
 *
 * `rowPress: 'open'` is the other arrangement, where a press is reported to the
 * host instead and the `→` on the row is what narrows. It has a section of its
 * own at the foot.
 */

const HOME = 'shell-data-shell--home-drillable'
const OPENS = 'shell-data-shell--home-drillable-opens'
const TABLE = 'shell-data-shell--drillable-table'

const card = (page: Page, label: string) =>
  page.locator('.dc-type').filter({
    has: page.locator('.dc-type__name', { hasText: new RegExp(`^${label}$`) }),
  })

/** Presses the first row of one type's card, which narrows to that record. */
const press = (page: Page, label: string) =>
  card(page, label).locator('.dc-type__open').first().click()

/** The shell writes its query into the story frame's own search string. */
const queryOf = (page: Page) => new URL(page.url()).searchParams.get('q')
const entityOf = (page: Page) => new URL(page.url()).searchParams.get('e')

test.describe('A metric that counts something listable', () => {
  test('is a button, and a metric that counts nothing is not', async ({ page }) => {
    await gotoStory(page, TABLE)
    const first = page.locator('.dc-table__row').first()
    // Sets: metric1 is Parts and leads to pieces; metric2 is Minifigs, which
    // this schema does not list, so that number stays plain text.
    await expect(first.locator('td').nth(3).locator('button.dc-drill')).toHaveCount(1)
    await expect(first.locator('td').nth(4).locator('button.dc-drill')).toHaveCount(0)
  })

  test('narrows to that type, scoped to the record pressed', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('button.dc-drill').first().click()
    expect(queryOf(page)).toMatch(/^set:"sets_\d+"$/)
    expect(entityOf(page)).toBe('pieces')
    await expect(scopeSelect(page)).toHaveValue('pieces')
    // A metric names the type it is going to a list of, so it keeps the view it was drawn in.
    await expect(page.locator('.dc-table')).toBeVisible()
  })

  test('leaves fewer rows than the type has in total', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('button.dc-drill').first().click()
    const narrowed = await page.locator('.dc-table__row').count()
    expect(narrowed).toBeGreaterThan(0)
    // The mock generates 48 of each type, so a scoped set of pieces is fewer.
    expect(narrowed).toBeLessThan(48)
  })

  test('does not open the record it was pressed on', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('button.dc-drill').first().click()
    // Still a list of rows: the click never reached the row behind it.
    await expect(page.locator('.dc-table')).toBeVisible()
  })
})

test.describe('Pressing a row', () => {
  /*
   * In a list, one record is a one-row list of the row just pressed — the press going nowhere.
   * The screen narrowing to a record is worth making is the card per type.
   */
  test('brings the cards with it from a view of records', async ({ page }) => {
    await gotoStory(page, HOME, '&e=sets&v=list')
    await page.locator('.dc-list__open').first().click()
    await expect(page.locator('.dc-types')).toBeVisible()
    // `cards` is the default view, so the URL says it by leaving it out.
    await expect(viewSelect(page)).toHaveValue('cards')
    // And the type goes with it: a record is not of one type, it is what every type holds of it.
    expect(entityOf(page)).toBeNull()
  })

  /* A type that declares no scope has nothing to narrow to, so its rows are reported instead. */
  test('is reported, not applied, on a type nothing carries the id of', async ({ page }) => {
    await gotoStory(page, OPENS, '&e=inventories&v=list')
    await page.locator('.dc-list__open').first().click()
    expect(queryOf(page)).toBeNull()
    await expect(page.locator('.sb-asked')).toContainText('opened')
  })

  test('narrows every card at once, without picking a type', async ({ page }) => {
    await gotoStory(page, HOME)
    await press(page, 'Sets')
    expect(queryOf(page)).toMatch(/^set:"sets_\d+"$/)
    expect(entityOf(page)).toBeNull()
    await expect(page.locator('.dc-types')).toBeVisible()
  })

  test('leaves the record itself among the results', async ({ page }) => {
    await gotoStory(page, HOME)
    const name = await card(page, 'Sets').locator('.dc-type__primary').first().innerText()
    await press(page, 'Sets')
    await expect(card(page, 'Sets').locator('.dc-type__primary').first()).toHaveText(name)
  })

  /*
   * The row does the narrowing, so a second control for the same move would be
   * a second control for the same move — and the smaller of the two.
   */
  test('leaves no → on the row, the row being it', async ({ page }) => {
    await gotoStory(page, HOME)
    await expect(page.locator('.dc-scope')).toHaveCount(0)
  })
})

test.describe('A narrowed query', () => {
  test('is an ordinary expression, in the header and in the panel', async ({ page }) => {
    await gotoStory(page, HOME)
    await press(page, 'Sets')
    const term = queryOf(page)!
    await expect(termBar(page)).toContainText('set:')

    // Nobody typed it, so the panel does not offer it back as text: it is a
    // part of the query there, the same pill the header lifts it with.
    await openPanel(page)
    await expect(parts(page)).toHaveText([term.replace(/"/g, '')])
    await expect(expressionBox(page)).toHaveValue('')
  })

  test('does not carry the same term twice', async ({ page }) => {
    await gotoStory(page, HOME)
    await press(page, 'Sets')
    const once = queryOf(page)
    await press(page, 'Sets')
    expect(queryOf(page)).toBe(once)
  })

  /*
   * The same constraint has two spellings, and both are the shell's own: a
   * press writes it quoted, while lifting any *other* part of the query writes
   * the rest back out unquoted. Pressing again after a lift was adding a second
   * copy of a term that was already there.
   */
  test('does not carry it twice once another part has been lifted', async ({ page }) => {
    await gotoStory(page, HOME, '&q=theme%3Aspace')
    await press(page, 'Sets')
    const scoped = queryOf(page)!
    expect(scoped).toContain('theme:space')

    await terms(page).filter({ hasText: 'theme:space' }).click()
    const lifted = queryOf(page)!
    // Rewritten from what it parsed to, which is where the second spelling
    // comes from: the quotes the → wrote are not in it any more.
    expect(lifted).not.toBe(scoped)
    expect(lifted).toMatch(/^set:sets_\d+$/)

    await press(page, 'Sets')
    expect(queryOf(page)).toBe(lifted)
    await expect(terms(page)).toHaveCount(1)
  })

  test('narrows types that declare no scope of their own too', async ({ page }) => {
    await gotoStory(page, HOME)
    const before = await card(page, 'Inventories').locator('.dc-type__count').innerText()
    await press(page, 'Sets')
    // The count switches from the schema's published population to what
    // matched, and an entity carrying the join key is genuinely filtered.
    await expect(card(page, 'Inventories').locator('.dc-type__count')).not.toHaveText(before)
  })
})

/*
 * `rowPress: 'open'`, the other arrangement: the press is reported and the
 * shell applies nothing, so the → is back as the way to narrow to a record.
 */
test.describe('A shell whose rows open instead', () => {
  test('reports the press and changes no query', async ({ page }) => {
    await gotoStory(page, OPENS)
    await card(page, 'Sets').locator('.dc-type__open').first().click()
    expect(queryOf(page)).toBeNull()
    await expect(page.locator('.sb-asked')).toContainText('opened sets_')
  })

  test('offers the → again, on the types that declare a scope', async ({ page }) => {
    await gotoStory(page, OPENS)
    await expect(card(page, 'Sets').locator('.dc-scope')).not.toHaveCount(0)
    // And nowhere else: nothing carries an inventory's id.
    await expect(card(page, 'Inventories').locator('.dc-scope')).toHaveCount(0)
  })

  test('and that → narrows without opening anything', async ({ page }) => {
    await gotoStory(page, OPENS)
    await card(page, 'Sets').locator('.dc-scope').first().click()
    expect(queryOf(page)).toMatch(/^set:"sets_\d+"$/)
    await expect(page.locator('.sb-asked')).toHaveText('nothing opened yet')
  })
})
