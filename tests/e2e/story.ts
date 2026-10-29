import { expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

/**
 * Storybook renders each story in an iframe at `/iframe.html?id=<story-id>`.
 * Driving that directly rather than the manager UI keeps the tests about the
 * component, and lets a test read and assert on the page's own URL.
 */
export function storyUrl(id: string, extraSearch = ''): string {
  return `/iframe.html?id=${id}&viewMode=story${extraSearch}`
}

/** Navigates to a story and waits for the shell to be on screen. */
export async function gotoStory(page: Page, id: string, extraSearch = ''): Promise<void> {
  await page.goto(storyUrl(id, extraSearch))
  await page.locator('.dc-shell').first().waitFor({ state: 'visible' })
}

export const header = (page: Page) => page.locator('.dc-header')

/** The bar's own row: the domain, and the query as it stands. */
export const headerBar = (page: Page) => page.locator('.dc-header__main')
/** The row of parts inside the search field, a pill per part of the query. */
export const termBar = (page: Page) => page.locator('.dc-header__terms')

/** The search field itself, whose edge and fill go round the parts and the box. */
export const searchField = (page: Page) => page.locator('.dc-header__field')

/** Each part, as its own button. Pressing one takes that part out of the query. */
export const terms = (page: Page) => page.locator('.dc-term')

/**
 * The box in that row, where the next part is written: a draft the results
 * are read under as it is typed, that Enter ANDs on to the query, and that
 * empties as the part it made takes its place beside it. At the end of the
 * parts until the arrow keys step it in among them.
 */
export const searchBox = (page: Page) => page.locator('.dc-header__search')

/**
 * One of the two parts of the query that are not pills: which type is being
 * listed, offered as a choice among the schema's own — `Everything` among them.
 * On the bar only while a type is chosen: on `Everything` the content names
 * the types, and the bar leaves the choice to it.
 *
 * Each is the shell's own picker rather than a `<select>`: the button that
 * says the choice and opens the list, carrying the chosen key as
 * `data-dc-value`. What it offers is read through {@link pickOptions}.
 */
export const scopeSelect = (page: Page) => page.locator('.dc-actions__type .dc-pick__button')

/** The second: how the results are drawn. */
export const viewSelect = (page: Page) => page.locator('.dc-actions__view .dc-pick__button')

/**
 * What they are ordered by is not on the bar at all. On a table its own
 * headings offer it, with the column on screen under them. This is the button
 * in the heading named `label`, which orders by that column — and, pressed
 * again, runs the same order the other way.
 */
export const sortHeading = (page: Page, label: string): Locator =>
  page.locator('.dc-table__sort', { hasText: new RegExp(`^${label}$`) })

/**
 * In every other view there are no headings to press, so the strip offers the
 * order beside the view: a picker of the sorts, and a button that reverses
 * the one in force.
 */
export const sortSelect = (page: Page) => page.locator('.dc-actions__sort .dc-pick__button')
export const sortDirection = (page: Page) => page.locator('.dc-actions__dir')

/** What a picker calls its list, which is what the choice is *of*. */
export type PickName = 'Type' | 'View' | 'Sort'

/** The list one of the pickers has put up. Nothing until the picker is pressed. */
export const pickList = (page: Page, name: PickName): Locator =>
  page.locator(`.dc-menu[aria-label="${name}"]`)

/**
 * What that list offers, one label each, in the order it offers them — the
 * options of the picker, once it is open.
 */
export const pickOptions = (page: Page, name: PickName): Locator =>
  pickList(page, name).locator('.dc-menu__label')

/** Puts a picker's list up, when it is not up already. */
export async function openPick(page: Page, button: Locator, name: PickName): Promise<void> {
  if (await pickList(page, name).count()) return
  await button.click()
  await expect(pickList(page, name)).toBeVisible()
}

/** Chooses from a picker by the key of the option, which is what the URL holds. */
async function pick(page: Page, button: Locator, name: PickName, key: string): Promise<void> {
  await openPick(page, button, name)
  await pickList(page, name).locator(`[data-dc-item="${key}"]`).click()
}

/** Draws the results another way, by the view's own key. */
export async function chooseView(page: Page, key: string): Promise<void> {
  await pick(page, viewSelect(page), 'View', key)
}

/** Orders the results another way, off the table, by the sort's own key. */
export async function chooseSort(page: Page, key: string): Promise<void> {
  await pick(page, sortSelect(page), 'Sort', key)
}

/**
 * What the type control says it is listing: the type's name and, after it, how
 * many records that is.
 */
export async function scopeLabel(page: Page): Promise<string> {
  return ((await scopeSelect(page).textContent()) ?? '').trim()
}

/**
 * Lists another type, by the name the schema gave it — however the screen
 * offers it.
 *
 * With a type chosen that is the bar's chooser, and the option says a count
 * after the name, so the match is on the name alone. On `Everything` there is
 * no chooser: every card of the home screen is headed by its type and pressing
 * that heading is the move, which is also the path a reader takes.
 */
export async function chooseScope(page: Page, label: string): Promise<void> {
  if (await scopeSelect(page).count()) {
    await openPick(page, scopeSelect(page), 'Type')
    await pickOptions(page, 'Type').filter({ hasText: label }).first().click()
    return
  }
  await typeCardHead(page, label).click()
}

/** The heading of one type's card, which filters the results to that type. */
export const typeCardHead = (page: Page, label: string): Locator =>
  page
    .locator('.dc-type')
    .filter({ has: page.locator('.dc-type__name', { hasText: new RegExp(`^${label}$`) }) })
    .locator('.dc-type__head')

/** Widens back out to the whole corpus, which is the scope chooser's first option. */
export async function clearScope(page: Page): Promise<void> {
  await pick(page, scopeSelect(page), 'Type', '')
}

export const listRows = (page: Page) => page.locator('.dc-list__row')

/**
 * The header's paging control, which is only in the bar when there is more
 * than one page — so its absence is an assertion worth making too.
 */
export const pager = (page: Page) => page.locator('.dc-header__pages')

/**
 * Its readout, which carries the hover text — but not, any more, the page it
 * is on: that half of `3 / 4` is a box with a number in it.
 */
export const pageReadout = (page: Page) => page.locator('.dc-header__page')

/** The box the page is in, and the count it is out of, beside it. */
export const pageBox = (page: Page) => page.locator('.dc-header__page-box')
export const pageTotal = (page: Page) => page.locator('.dc-header__page-total')

/** The readout as the bar says it — the box's number and the total together. */
export async function expectPage(
  page: Page,
  reads: string | RegExp,
  options?: { timeout?: number },
): Promise<void> {
  const readout = expect.poll(
    async () => `${await pageBox(page).inputValue()} ${(await pageTotal(page).innerText()).trim()}`,
    options,
  )
  if (typeof reads === 'string') await readout.toBe(reads)
  else await readout.toMatch(reads)
}

/** Types a page into the box and presses Enter, the way a jump is made. */
export async function typePage(page: Page, wanted: string): Promise<void> {
  await pageBox(page).fill(wanted)
  await pageBox(page).press('Enter')
}

export const pageStep = (page: Page, which: 'Previous' | 'Next') =>
  pager(page).getByRole('button', { name: `${which} page` })

/** Steps a page and waits for the readout to say it has moved. */
export async function stepPage(page: Page, which: 'Previous' | 'Next'): Promise<void> {
  const before = await pageBox(page).inputValue()
  await pageStep(page, which).click()
  await expect(pageBox(page)).not.toHaveValue(before)
}

/** The leading ordinal of each row on screen, which counts the whole result. */
export function rowOrdinals(page: Page): Promise<string[]> {
  return listRows(page).locator('.dc-list__ordinal').allTextContents()
}

/**
 * Filters the results to one entity, by the name the schema gave it — the same
 * move as {@link chooseScope}, kept under the name the tests that narrow to a
 * type read better with.
 */
export async function pickEntity(page: Page, label: string): Promise<void> {
  await chooseScope(page, label)
}

/** The shell's own query parameters, with Storybook's stripped out. */
export function shellParams(url: string): Record<string, string> {
  const params = new URL(url).searchParams
  const own: Record<string, string> = {}
  for (const [key, value] of params) {
    if (key === 'id' || key === 'viewMode' || key === 'globals') continue
    own[key] = value
  }
  return own
}
