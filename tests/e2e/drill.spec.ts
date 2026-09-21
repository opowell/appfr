import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import {
  chooseScope,
  chooseView,
  expressionBox,
  gotoStory,
  listRows,
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
const NAMED = 'shell-data-shell--drilled-everything'

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

/**
 * Presses the record the query already names, a second time.
 *
 * Its own type's card comes off the screen the moment the query names it, so
 * there is nowhere on the home screen left to press — the record is still
 * there, in that type's own list, which is a scope and a view away. That list
 * does not apply the term to itself, so it holds every record of the type,
 * and the one to press is found by its name.
 */
async function pressAgain(page: Page, label: string, name: string): Promise<void> {
  await chooseScope(page, label)
  await chooseView(page, 'list')
  await listRows(page)
    .filter({ has: page.locator('.dc-list__primary', { hasText: name }) })
    .locator('.dc-list__open')
    .click()
}

test.describe('A metric that counts something listable', () => {
  test('is a button, and a metric that counts nothing is not', async ({ page }) => {
    await gotoStory(page, TABLE)
    const first = page.locator('.dc-table__row').first()
    // Sets: metric1 is Parts and leads to pieces; metric2 is Minifigs, which
    // this schema does not list, so that number stays plain text.
    // One further along than the columns say: the standing column comes first.
    await expect(first.locator('td').nth(4).locator('button.dc-drill')).toHaveCount(1)
    await expect(first.locator('td').nth(5).locator('button.dc-drill')).toHaveCount(0)
  })

  test('narrows to that type, scoped to the record pressed', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('button.dc-drill').first().click()
    expect(queryOf(page)).toMatch(/^set:"sets_\d+"$/)
    expect(entityOf(page)).toBe('pieces')
    await expect(scopeSelect(page)).toHaveAttribute('data-dc-value', 'pieces')
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
    await expect(viewSelect(page)).toHaveAttribute('data-dc-value', 'cards')
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

  /*
   * The card of the type just pressed would be a heading, a count of one and
   * the row that was pressed — the header's own term, drawn again a little
   * lower down. What is worth seeing is every *other* type's cards, which is
   * what the press was for.
   */
  test('takes that type’s own card off the screen, having named its one record', async ({ page }) => {
    await gotoStory(page, HOME)
    await press(page, 'Sets')
    await expect(card(page, 'Sets')).toHaveCount(0)
    await expect(termBar(page)).toContainText('set:')
  })

  /*
   * The card went; the record did not, and choosing its type is where the
   * other sets are, beside it. A list of one set would be the header's own
   * term drawn again — what is wanted from Sets, with a set already named, is
   * every set the rest of the query allows, so the list leaves that one term
   * unapplied. The query keeps it: it is still on the bar, drawn as held
   * rather than in force, and pieces are that set's again once listed.
   */
  test('lists every record of the type once that type is chosen', async ({ page }) => {
    await gotoStory(page, HOME, '&q=theme%3Aspace')
    const count = await card(page, 'Sets').locator('.dc-type__count').innerText()
    const name = await card(page, 'Sets').locator('.dc-type__primary').first().innerText()
    await press(page, 'Sets')
    const narrowed = queryOf(page)!
    await chooseScope(page, 'Sets')
    await chooseView(page, 'list')
    expect(queryOf(page)).toBe(narrowed)
    await expect(listRows(page)).toHaveCount(Number(count))
    await expect(page.locator('.dc-list__primary').first()).toHaveText(name)
    await expect(terms(page).filter({ hasText: 'set:' })).toHaveClass(/dc-term--idle/)
    await expect(terms(page).filter({ hasText: 'theme:' })).not.toHaveClass(/dc-term--idle/)
  })

  test('applies the term again the moment another type is listed', async ({ page }) => {
    await gotoStory(page, HOME)
    await press(page, 'Sets')
    const narrowed = queryOf(page)!
    await chooseScope(page, 'Sets')
    await chooseScope(page, 'Pieces')
    expect(queryOf(page)).toBe(narrowed)
    await expect(terms(page).filter({ hasText: 'set:' })).not.toHaveClass(/dc-term--idle/)
  })

  /*
   * Only the type the query named. Everything else holds rows it did not name,
   * and those cards are the whole of what the screen is read for.
   */
  test('leaves every other type’s card where it was', async ({ page }) => {
    await gotoStory(page, HOME)
    await press(page, 'Sets')
    for (const label of ['Pieces', 'Colors', 'Inventories', 'Categories']) {
      await expect(card(page, label), label).toHaveCount(1)
    }
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

/*
 * The same press with ⌘ held, which leaves the record out rather than
 * narrowing to it — and stays put, a list missing one row being the same
 * list. Ctrl is the same key on the machines that have no ⌘, and Playwright
 * has to be told which one it is; `Meta` is used here and read as either.
 */
test.describe('Pressing a row with ⌘ held', () => {
  test('writes the record out of the query and keeps the list', async ({ page }) => {
    await gotoStory(page, HOME, '&e=sets&v=list')
    const before = await listRows(page).count()
    const name = await page.locator('.dc-list__primary').first().innerText()
    await page.locator('.dc-list__open').first().click({ modifiers: ['Meta'] })
    expect(queryOf(page)).toMatch(/^-set:"sets_\d+"$/)
    // Where it was: the same type, the same view — and the same rows. The
    // term leaves that set's pieces, colors and inventories out; the list of
    // sets is where that set is put out and taken back, so it stays in it.
    expect(entityOf(page)).toBe('sets')
    await expect(viewSelect(page)).toHaveAttribute('data-dc-value', 'list')
    await expect(listRows(page)).toHaveCount(before)
    await expect(page.locator('.dc-list__primary').filter({ hasText: name })).toHaveCount(1)
    await expect(terms(page).filter({ hasText: 'set:' })).toHaveClass(/dc-term--idle/)
  })

  test('leaves the record out of every other type', async ({ page }) => {
    await gotoStory(page, HOME, '&e=sets&v=list')
    await page.locator('.dc-list__open').first().click({ modifiers: ['Meta'] })
    const term = queryOf(page)!
    await chooseScope(page, 'Pieces')
    expect(queryOf(page)).toBe(term)
    await expect(terms(page).filter({ hasText: 'set:' })).not.toHaveClass(/dc-term--idle/)
  })

  test('says which record is out, on the bar, with its sign', async ({ page }) => {
    await gotoStory(page, HOME, '&e=sets&v=list')
    const name = await page.locator('.dc-list__primary').first().innerText()
    await page.locator('.dc-list__open').first().click({ modifiers: ['Meta'] })
    await expect(termBar(page)).toContainText(`-set: ${name}`)
  })

  test('turns the term round on a record the query already narrows to', async ({ page }) => {
    await gotoStory(page, HOME)
    await press(page, 'Sets')
    const narrowed = queryOf(page)
    expect(narrowed).toMatch(/^set:"sets_\d+"$/)
    await chooseScope(page, 'Sets')
    await chooseView(page, 'list')
    await page.locator('.dc-list__open').first().click({ modifiers: ['Meta'] })
    // One term, the other way about — not the two of them side by side.
    expect(queryOf(page)).toBe(`-${narrowed!.replace(/"/g, '')}`)
  })

  test('leaves a metric pivoting to what it counts, minus the record', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('button.dc-drill').first().click({ modifiers: ['Meta'] })
    expect(queryOf(page)).toMatch(/^-set:"sets_\d+"$/)
    expect(entityOf(page)).toBe('pieces')
  })
})

/*
 * The mark a row wears where the query names it: a list of a type does not
 * apply the term on its own scope to itself, so every set is listed however
 * the query stands on one of them, and the mark is what says which.
 */
test.describe('A row the query names', () => {
  const marks = (page: Page) => page.locator('.dc-standing')

  test('wears a + where the query narrows to it, and nothing elsewhere', async ({ page }) => {
    await gotoStory(page, HOME)
    await press(page, 'Sets')
    await chooseScope(page, 'Sets')
    await chooseView(page, 'list')
    await expect(marks(page)).toHaveCount(1)
    await expect(marks(page)).toHaveAttribute('data-dc-standing', 'in')
    await expect(marks(page)).toHaveText('+')
  })

  test('wears a − where the query leaves it out', async ({ page }) => {
    await gotoStory(page, HOME, '&e=sets&v=list')
    const name = await page.locator('.dc-list__primary').first().innerText()
    await page.locator('.dc-list__open').first().click({ modifiers: ['Meta'] })
    await expect(marks(page)).toHaveCount(1)
    await expect(marks(page)).toHaveAttribute('data-dc-standing', 'out')
    await expect(listRows(page).filter({ has: marks(page) }).locator('.dc-list__primary')).toHaveText(name)
  })

  test('lifts the term when the mark is pressed, and stays where it is', async ({ page }) => {
    await gotoStory(page, HOME, '&e=sets&v=list')
    const before = await listRows(page).count()
    await page.locator('.dc-list__open').first().click({ modifiers: ['Meta'] })
    expect(queryOf(page)).toMatch(/^-set:"sets_\d+"$/)
    await marks(page).click()
    expect(queryOf(page)).toBeNull()
    expect(entityOf(page)).toBe('sets')
    await expect(viewSelect(page)).toHaveAttribute('data-dc-value', 'list')
    await expect(listRows(page)).toHaveCount(before)
    await expect(marks(page)).toHaveCount(0)
  })

  test('shows it in the table as the lit sign of its standing column', async ({ page }) => {
    await gotoStory(page, TABLE)
    await page.locator('.dc-table__row').first().locator('button.dc-drill').first().click({ modifiers: ['Meta'] })
    await chooseScope(page, 'Sets')
    await chooseView(page, 'table')
    // Not the mark beside the name — a table has a column for this, on
    // every row, and the one the query leaves out is the one row lit `−`.
    await expect(marks(page)).toHaveCount(0)
    const lit = page.locator(
      'td.dc-table__standing [data-dc-active="true"]:not([data-dc-standing="none"])',
    )
    await expect(lit).toHaveCount(1)
    await expect(lit).toHaveAttribute('data-dc-standing', 'out')
  })
})

/*
 * The same rule arrived at rather than pressed into. A URL naming a record is
 * what a shared link is, and a host reading its shell inside one — a record's
 * own page — writes the term itself; neither goes through a press, and the
 * screen has to come out the same.
 */
test.describe('A home screen that arrives already naming a record', () => {
  test('does not draw the card of the type it names', async ({ page }) => {
    await gotoStory(page, NAMED)
    await expect(page.locator('.dc-types')).toBeVisible()
    await expect(card(page, 'Sets')).toHaveCount(0)
  })

  test('draws every other type, which is what it is read for', async ({ page }) => {
    await gotoStory(page, NAMED)
    await expect(card(page, 'Pieces')).toHaveCount(1)
    await expect(card(page, 'Colors')).toHaveCount(1)
    await expect(card(page, 'Inventories')).toHaveCount(1)
  })

  test('still holds the record, among every other of its type', async ({ page }) => {
    await gotoStory(page, NAMED)
    await chooseScope(page, 'Sets')
    await chooseView(page, 'list')
    await expect(termBar(page)).toContainText('set:')
    await expect(listRows(page).nth(1)).toBeVisible()
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
    const name = await card(page, 'Sets').locator('.dc-type__primary').first().innerText()
    await press(page, 'Sets')
    const once = queryOf(page)
    await pressAgain(page, 'Sets', name)
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
    const name = await card(page, 'Sets').locator('.dc-type__primary').first().innerText()
    await press(page, 'Sets')
    const scoped = queryOf(page)!
    expect(scoped).toContain('theme:space')

    await terms(page).filter({ hasText: 'theme:space' }).click()
    const lifted = queryOf(page)!
    // Rewritten from what it parsed to, which is where the second spelling
    // comes from: the quotes the → wrote are not in it any more.
    expect(lifted).not.toBe(scoped)
    expect(lifted).toMatch(/^set:sets_\d+$/)

    await pressAgain(page, 'Sets', name)
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
