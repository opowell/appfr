import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { gotoStory, grip, openPanel, pane, paneHead, panel, trigger } from './story'

type Rgba = [number, number, number, number]

/**
 * The colour a token actually paints, in sRGB. Read off a probe *inside* the
 * shell rather than out of the custom property directly: Chrome hands back
 * `color-mix(…)` unresolved from `getPropertyValue`, and a probe in place also
 * inherits the same `color` the real elements do — which is the whole point in
 * the `inherit` theme, where the ramp is built out of `currentColor`.
 */
async function paint(page: Page, token: string, host = '.dc-shell'): Promise<Rgba> {
  return page.locator(host).first().evaluate((el, name) => {
    const probe = document.createElement('div')
    probe.style.backgroundColor = `var(${name})`
    el.append(probe)
    const resolved = getComputedStyle(probe).backgroundColor
    probe.remove()

    // A canvas is the one thing that flattens every serialisation Chrome uses
    // — `oklab()`, `oklch()`, `rgb()` — into comparable numbers.
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = resolved
    ctx.fillRect(0, 0, 1, 1)
    const pixel = ctx.getImageData(0, 0, 1, 1).data
    return [pixel[0]!, pixel[1]!, pixel[2]!, pixel[3]! / 255] as [number, number, number, number]
  }, token)
}

/** Perceived lightness, 0–1. Enough to say which way a ramp runs. */
const luma = ([r, g, b]: Rgba) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

const styleOf = (page: Page, selector: string, property: string) =>
  page
    .locator(selector)
    .first()
    .evaluate(
      (el, name) => getComputedStyle(el).getPropertyValue(name),
      property,
    )

test.describe('Theming — the shipped themes', () => {
  test('minimal by default, with an opaque surface of its own', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home')
    await expect(page.locator('.dc-shell')).toHaveAttribute('data-dc-theme', 'minimal')
    const surface = await paint(page, '--dc-bg-0')
    expect(surface[3]).toBe(1)
    expect(luma(surface)).toBeGreaterThan(0.95)
  })

  test('the dark theme flips the surface', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--dark-theme')
    const surface = await paint(page, '--dc-bg-0')
    expect(surface[3]).toBe(1)
    expect(luma(surface)).toBeLessThan(0.2)
    expect(luma(await paint(page, '--dc-fg-0'))).toBeGreaterThan(0.9)
  })

  test('the light theme flips the surface', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--light-theme')
    await expect(page.locator('.dc-shell')).toHaveAttribute('data-dc-theme', 'light')

    const surface = await paint(page, '--dc-bg-0')
    expect(surface[3]).toBe(1)
    expect(luma(surface)).toBeGreaterThan(0.9)
    expect(luma(await paint(page, '--dc-fg-0'))).toBeLessThan(0.3)
  })

  test('the default theme drops everything but the structure', async ({ page }) => {
    // A list, since the assertion below is about a row's status pill.
    await gotoStory(page, 'shell-data-shell--home-as-list')
    await expect(page.locator('.dc-shell')).toHaveAttribute('data-dc-theme', 'minimal')

    // No corners and no shadow — the two things a border would otherwise share
    // the job of separating surfaces with.
    expect(await styleOf(page, '.dc-header__trigger', 'border-radius')).toBe('0px')
    expect((await styleOf(page, '.dc-shell', '--dc-shadow')).trim()).toBe('none')

    // One ink for everything that carried a hue: the accent and all three
    // status colours resolve to the same grey.
    const accent = await paint(page, '--dc-accent')
    for (const token of ['--dc-ok', '--dc-warn', '--dc-danger']) {
      expect(await paint(page, token)).toEqual(accent)
    }

    // Which leaves the border doing the separating, so it has to be visible
    // against the surface it sits on rather than a hairline nobody can see.
    const surface = luma(await paint(page, '--dc-bg-0'))
    expect(surface - luma(await paint(page, '--dc-line'))).toBeGreaterThan(0.1)

    // A status still says which it is, colour or no colour.
    await expect(page.locator('.dc-pill').first()).not.toBeEmpty()
  })

  test('auto follows the system setting, both ways', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await gotoStory(page, 'shell-data-shell--auto-theme')
    expect(luma(await paint(page, '--dc-bg-0'))).toBeGreaterThan(0.9)

    await page.emulateMedia({ colorScheme: 'dark' })
    expect(luma(await paint(page, '--dc-bg-0'))).toBeLessThan(0.2)
  })

  test('macos wears the system’s furniture, in either scheme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await gotoStory(page, 'shell-data-shell--macos-theme')

    // Apple's blue rather than the shell's own accent, and — unlike every
    // theme that lets the contrast colour follow the surface — white type on
    // it whichever scheme the Mac is in.
    expect(await paint(page, '--dc-accent')).toEqual([0, 122, 255, 1])
    expect(await paint(page, '--dc-accent-contrast')).toEqual([255, 255, 255, 1])

    expect(await styleOf(page, '.dc-shell', 'font-family')).toContain('-apple-system')
    expect(await styleOf(page, '.dc-shell', 'font-size')).toBe('13px')
    expect(await styleOf(page, '.dc-header__trigger', 'border-radius')).toBe('8px')
    expect(luma(await paint(page, '--dc-bg-0'))).toBeGreaterThan(0.9)

    // An operating system's look includes which of its schemes the user is in,
    // so this one follows the system the way `auto` does.
    await page.emulateMedia({ colorScheme: 'dark' })
    expect(luma(await paint(page, '--dc-bg-0'))).toBeLessThan(0.2)
    expect(luma(await paint(page, '--dc-fg-0'))).toBeGreaterThan(0.9)
    expect(await paint(page, '--dc-accent-contrast')).toEqual([255, 255, 255, 1])
  })

  test('windows floats a card that lifts off its mica page', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await gotoStory(page, 'shell-data-shell--windows-theme')

    expect(await styleOf(page, '.dc-shell', 'font-family')).toContain('Segoe UI')
    expect(await styleOf(page, '.dc-header__trigger', 'border-radius')).toBe('6px')

    // The page is Fluent's grey, not paper — and the panel that floats over it
    // is *lighter*, which the derived ramp cannot do on a light surface: every
    // step it takes is towards the ink.
    const surface = luma(await paint(page, '--dc-bg-0'))
    expect(surface).toBeGreaterThan(0.85)
    expect(surface).toBeLessThan(0.98)
    expect(luma(await paint(page, '--dc-bg-1'))).toBeLessThan(surface)
    expect(luma(await paint(page, '--dc-raised'))).toBeGreaterThan(surface)

    // In dark the ramp lifts on its own, so the panel is handed back to it.
    await page.emulateMedia({ colorScheme: 'dark' })
    const dark = luma(await paint(page, '--dc-bg-0'))
    expect(dark).toBeLessThan(0.2)
    expect(luma(await paint(page, '--dc-raised'))).toBeGreaterThan(dark)
  })
})

test.describe('Theming — the palette is derived from a few seeds', () => {
  /*
   * Read on the dark theme, where a step *towards the ink* is a step towards
   * lighter and the numbers can be compared as they are. The same steps run
   * the other way on paper, which is the point of deriving them.
   */
  test('surfaces step towards the ink and text recedes towards the surface', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--dark-theme')
    const step = async (token: string) => luma(await paint(page, token))

    const [bg0, bg1, bg2, bg3] = [
      await step('--dc-bg-0'),
      await step('--dc-bg-1'),
      await step('--dc-bg-2'),
      await step('--dc-bg-3'),
    ]
    expect(bg0).toBeLessThan(bg1)
    expect(bg1).toBeLessThan(bg2)
    expect(bg2).toBeLessThan(bg3)

    const [fg0, fg1, fg2, fg3] = [
      await step('--dc-fg-0'),
      await step('--dc-fg-1'),
      await step('--dc-fg-2'),
      await step('--dc-fg-3'),
    ]
    expect(fg0).toBeGreaterThan(fg1)
    expect(fg1).toBeGreaterThan(fg2)
    expect(fg2).toBeGreaterThan(fg3)
    // The dimmest text still has to clear the brightest surface it sits on.
    expect(fg3).toBeGreaterThan(bg3)
  })

  test('reseeding the surface and the ink moves everything derived from them', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home')
    const stock = await paint(page, '--dc-line')

    await gotoStory(page, 'shell-data-shell--reseeded-theme')
    const surface = await paint(page, '--dc-bg-0')
    const line = await paint(page, '--dc-line')
    const ink = await paint(page, '--dc-fg-0')

    // The seed is a violet, so the border it generates has to be one too —
    // and has to sit between the surface and the ink rather than beside them.
    expect(line).not.toEqual(stock)
    expect(line[0]).toBeGreaterThan(line[1])
    expect(line[2]).toBeGreaterThan(line[1])
    expect(luma(line)).toBeGreaterThan(luma(surface))
    expect(luma(line)).toBeLessThan(luma(ink))

    // Non-colour tokens are set the same way.
    expect(await styleOf(page, '.dc-header__trigger', 'border-radius')).toBe('2px')
  })

  test('a custom accent reaches the rows', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--custom-accent')
    const declared = await styleOf(page, '.dc-shell', '--dc-accent')
    expect(declared.trim()).toBe('oklch(0.76 0.14 150)')
    await expect(page.locator('.dc-list__primary').first()).toBeVisible()
  })

  test('a host stylesheet wins without needing a stronger selector', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--home')

    // Prepended, so the shell's own rules come *after* it. Only the library's
    // zero-specificity `:where()` lets this plain `.dc-shell` rule through.
    await page.evaluate(() => {
      const style = document.createElement('style')
      style.textContent = '.dc-shell { --dc-surface: rgb(24, 48, 72); }'
      document.head.prepend(style)
    })

    expect(await paint(page, '--dc-bg-0')).toEqual([24, 48, 72, 1])
    // And the derived tier follows the override rather than the default.
    const line = await paint(page, '--dc-line')
    expect(line[2]).toBeGreaterThan(line[0])
  })
})

test.describe('Theming — inherit brings no palette', () => {
  test('the shell paints nothing over its host', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--inherits-a-light-host')
    expect(await styleOf(page, '.dc-shell', 'background-color')).toBe('rgba(0, 0, 0, 0)')
  })

  test('text colour and typeface come from the host', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--inherits-a-light-host')
    const host = await styleOf(page, '.sb-host', 'color')
    expect(await styleOf(page, '.dc-shell', 'color')).toBe(host)
    expect(await styleOf(page, '.dc-list__primary', 'font-family')).toContain('Georgia')
  })

  test('its surfaces become translucent veils of the host’s own ink', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--inherits-a-light-host')
    for (const token of ['--dc-bg-1', '--dc-bg-2', '--dc-bg-3', '--dc-line']) {
      const alpha = (await paint(page, token))[3]
      expect(alpha).toBeGreaterThan(0)
      expect(alpha).toBeLessThan(1)
    }
  })

  test('the same shell reads correctly over a dark host', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--inherits-a-dark-host')
    const host = await styleOf(page, '.sb-host', 'color')
    expect(await styleOf(page, '.dc-shell', 'color')).toBe(host)
    // Light text on a dark host: the shell took the host's ink, not its own.
    expect(luma(await paint(page, '--dc-fg-0'))).toBeGreaterThan(0.6)
    expect(await styleOf(page, '.dc-shell', 'background-color')).toBe('rgba(0, 0, 0, 0)')
  })

  test('one token is enough to brand an otherwise unthemed shell', async ({ page }) => {
    await gotoStory(page, 'shell-data-shell--inherits-with-a-brand-accent')
    expect(await paint(page, '--dc-accent')).toEqual([180, 68, 31, 1])
    await expect(trigger(page)).toBeVisible()
  })
})

test.describe('Theming — surfaces that float', () => {
  /*
   * The query panel is the one surface with results underneath it. In the
   * `inherit` theme the in-flow surfaces are translucent veils, so the panel
   * has to be told to be something else — and its own text colour with it, or
   * a host whose ink is light would write light text on the panel's light
   * background.
   */
  const stories = [
    ['minimal, the default', 'shell-data-shell--home'],
    ['dark', 'shell-data-shell--dark-theme'],
    ['light', 'shell-data-shell--light-theme'],
    ['macos', 'shell-data-shell--macos-theme'],
    ['windows', 'shell-data-shell--windows-theme'],
    ['inherit over a light host', 'shell-data-shell--inherits-a-light-host'],
    ['inherit over a dark host', 'shell-data-shell--inherits-a-dark-host'],
  ] as const

  for (const [name, id] of stories) {
    test(`the query panel is opaque and legible — ${name}`, async ({ page }) => {
      await gotoStory(page, id)
      await openPanel(page)

      const surface = await paint(page, '--dc-raised', '.dc-panel')
      expect(surface[3]).toBe(1)

      const ink = await paint(page, '--dc-raised-ink', '.dc-panel')
      expect(ink[3]).toBe(1)
      // Text and background have to land on opposite sides of mid-grey, or the
      // panel is unreadable whatever else is right about it.
      expect(Math.abs(luma(surface) - luma(ink))).toBeGreaterThan(0.5)

      await expect(panel(page)).toBeVisible()
    })
  }
})

/*
 * The three buttons a window is closed, rolled up and zoomed by. They are one
 * group in the markup, written in one order — minimize, maximize, close — and
 * what each theme does with that group is the whole of the difference.
 */
test.describe('Theming — the window controls each system draws', () => {
  const control = (page: Page, kind: 'close' | 'minimize' | 'maximize') =>
    pane(page, 'activity').locator(`[data-dc-${kind}]`)

  const selector = (kind: string) => `.dc-pane[data-dc-panels~="activity"] [data-dc-${kind}]`

  const leftEdge = async (page: Page, kind: 'close' | 'minimize' | 'maximize') => {
    const box = await control(page, kind).boundingBox()
    if (!box) throw new Error(`No ${kind} control on screen`)
    return box.x
  }

  test('a Mac wears traffic lights, at the left of the bar and led by close', async ({ page }) => {
    await gotoStory(page, 'window-panel-grid--floating-on-macos')

    // Close, minimize, zoom: the order a Mac has always put them in, which is
    // the reverse of the order they are written in.
    expect(await leftEdge(page, 'close')).toBeLessThan(await leftEdge(page, 'minimize'))
    expect(await leftEdge(page, 'minimize')).toBeLessThan(await leftEdge(page, 'maximize'))

    // And the group ahead of everything else on the bar, grip included.
    const handle = await grip(page, 'activity').boundingBox()
    expect(await leftEdge(page, 'maximize')).toBeLessThan(handle!.x)

    // Each lit in its own colour, and round, with the pointer nowhere near.
    expect(await styleOf(page, selector('close'), 'background-color')).toBe('rgb(255, 95, 87)')
    expect(await styleOf(page, selector('minimize'), 'background-color')).toBe('rgb(254, 188, 46)')
    expect(await styleOf(page, selector('maximize'), 'background-color')).toBe('rgb(40, 200, 64)')
    expect(await styleOf(page, selector('close'), 'border-radius')).toBe('50%')

    // Lit but empty: at rest the bar carries three colours, not three symbols.
    for (const kind of ['close', 'minimize', 'maximize'] as const) {
      await expect(control(page, kind).locator('.dc-glyph')).toHaveCSS('opacity', '0')
    }

    // The pointer on any one of them fills in all three, as a Mac does.
    await control(page, 'minimize').hover()
    for (const kind of ['close', 'minimize', 'maximize'] as const) {
      await expect(control(page, kind).locator('.dc-glyph')).toHaveCSS('opacity', '1')
    }
  })

  test('Windows keeps them square, in the corner, and reddens the close', async ({ page }) => {
    await gotoStory(page, 'window-panel-grid--floating-on-windows')

    // The other way round: close is the outermost, at the right hand end.
    expect(await leftEdge(page, 'minimize')).toBeLessThan(await leftEdge(page, 'maximize'))
    expect(await leftEdge(page, 'maximize')).toBeLessThan(await leftEdge(page, 'close'))

    // Flush into the corner and the full height of the bar, as Fluent draws
    // them — the bar's own padding is taken back off for it.
    const bar = await paneHead(page, 'activity').boundingBox()
    const close = await control(page, 'close').boundingBox()
    expect(Math.abs(close!.x + close!.width - (bar!.x + bar!.width))).toBeLessThan(1.5)
    expect(Math.abs(close!.height - bar!.height)).toBeLessThan(1.5)
    expect(await styleOf(page, selector('close'), 'border-radius')).toBe('0px')

    // Nothing carries a colour until the pointer arrives, and then only close.
    expect(await styleOf(page, selector('close'), 'background-color')).toBe('rgba(0, 0, 0, 0)')
    await control(page, 'close').hover()
    expect(await styleOf(page, selector('close'), 'background-color')).toBe('rgb(196, 43, 28)')
    expect(await styleOf(page, selector('close'), 'color')).toBe('rgb(255, 255, 255)')
  })

  test('the marks are drawn, and a Mac swaps the one it draws differently', async ({ page }) => {
    await gotoStory(page, 'window-panel-grid--floating')

    // A path rather than a character, so a theme's typeface cannot reweigh it.
    await expect(control(page, 'maximize').locator('svg.dc-glyph')).toHaveCount(1)
    await expect(control(page, 'maximize')).toHaveText('')

    // Everyone draws a square to maximize with…
    expect(await styleOf(page, `${selector('maximize')} .dc-glyph__line`, 'display')).not.toBe('none')
    expect(await styleOf(page, `${selector('maximize')} .dc-glyph__aqua`, 'display')).toBe('none')

    // …and a Mac a pair of arrowheads, out of the same markup.
    await gotoStory(page, 'window-panel-grid--floating-on-macos')
    expect(await styleOf(page, `${selector('maximize')} .dc-glyph__line`, 'display')).toBe('none')
    expect(await styleOf(page, `${selector('maximize')} .dc-glyph__aqua`, 'display')).not.toBe('none')
  })
})
