import { expect, test } from '@playwright/test'
import { chooseView, pickEntity, storyUrl } from './story'

/**
 * The static page under test. It is served by Storybook's `staticDirs` exactly
 * as it sits on disk, so these tests drive it directly rather than through a
 * story — the story only frames it, and the last test here checks that it does.
 *
 * Everything below reads `dist/`. A stale build fails these tests, which is the
 * point of having them.
 */
const PAGE = '/no-build/index.html'

/** Waits for the page to have finished running its own checks. */
const verdict = (page: import('@playwright/test').Page) => page.locator('#verdict[data-done="true"]')

const check = (page: import('@playwright/test').Page, id: string) =>
  page.locator(`.nb-check[data-check="${id}"]`)

test.describe('No build — dist on a static page', () => {
  test('every check the page runs on itself passes', async ({ page }) => {
    await page.goto(PAGE)
    await expect(verdict(page)).toHaveAttribute('data-ok', 'true')
    await expect(page.locator('.nb-check[data-ok="false"]')).toHaveCount(0)

    // Named rather than counted, so a check quietly disappearing is a failure
    // too — an empty checklist would otherwise pass.
    for (const id of ['vue', 'shell', 'fixtures', 'loader', 'compile', 'mount', 'style'])
      await expect(check(page, id)).toHaveAttribute('data-ok', 'true')
  })

  test('the server hands over .vue source, not JavaScript', async ({ page, baseURL }) => {
    const response = await page.request.get(`${baseURL}/no-build/App.vue`)
    expect(response.ok()).toBe(true)

    // What arrives is the file itself: a template to compile, and bare imports
    // that only an import map can resolve. Anything transformed would have
    // neither.
    const body = await response.text()
    expect(body).toContain('<template>')
    expect(body).toContain(`from 'appfr'`)
  })

  test('what it mounts is the real shell, driving the real address bar', async ({ page }) => {
    // The home screen, where a type is chosen from its card: the bar offers no
    // chooser on Everything, and a flat list of everything has no cards.
    await page.goto(`${PAGE}?schema=LEGO`)
    await page.locator('.dc-shell').waitFor({ state: 'visible' })
    await expect(page.locator('.dc-header__domain')).toHaveText('LEGO')

    await pickEntity(page, 'Sets')
    await chooseView(page, 'list')
    await expect(page.locator('.dc-list__row').first()).toBeVisible()

    const params = new URL(page.url()).searchParams
    expect(params.get('e')).toBe('s')
    expect(params.get('v')).toBe('list')
    // The page's own parameter survives the shell writing beside it.
    expect(params.get('schema')).toBe('LEGO')
  })

  test('the host SFC the loader compiled is on screen, scoped style and all', async ({ page }) => {
    await page.goto(`${PAGE}?v=list`)
    const note = page.locator('.host-note')
    await expect(note).toHaveAttribute('data-open', 'false')

    // A scoped style from a runtime-compiled SFC still reaches the element.
    await expect(note).toHaveCSS('border-top-width', '1px')

    await page.locator('.dc-list__row').first().click()
    await expect(note).toHaveAttribute('data-open', 'true')
    await expect(note).toContainText('Opened')
  })

  test('and the checks fail when an artifact is missing', async ({ page }) => {
    await page.goto(`${PAGE}?no-css`)
    await expect(verdict(page)).toHaveAttribute('data-ok', 'false')
    await expect(check(page, 'style')).toHaveAttribute('data-ok', 'false')

    // Only that one: the shell without its stylesheets still loads, compiles
    // and answers the query, which is what makes the failure specific.
    await expect(page.locator('.nb-check[data-ok="false"]')).toHaveCount(1)
    await expect(check(page, 'mount')).toHaveAttribute('data-ok', 'true')
  })

  test('the story frames that same page', async ({ page }) => {
    await page.goto(storyUrl('no-build-static-page--from-dist'))
    const frame = page.frameLocator('iframe[title="appfr with no build step"]')
    await expect(frame.locator('#verdict[data-done="true"]')).toHaveAttribute('data-ok', 'true')
    await expect(frame.locator('.dc-shell')).toBeVisible()
  })
})
