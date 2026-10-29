# Card content, layers and controls

## What goes in a card

The pieces a page about one record keeps needing. Each is a plain component
with no context to read, styled in the shell's tokens, so it takes the theme
anywhere inside a `.dc-shell`.

### Facts

`<ShellFacts>` is a record's metadata as a grid of labels over values, as many
columns as fit at `min` (default `200px`). It renders a `<dl>` with a `div` per
fact; values are mono and may break anywhere.

```vue
<ShellFacts :items="[
  { label: 'Started', value: fmtDate(run.startedAt) },
  { label: 'Size', value: fmtBytes(spec.bytes), title: `${spec.bytes} bytes` },
  { label: 'Recorded URLs', value: spec.flowUrls },   /* a line apiece */
  { label: 'Finished', value: run.finishedAt },       /* null: drawn as — */
]">
  <!-- A fact that is more than text: the label and the value are slots. -->
  <ShellFact wide>
    <template #label>Command <CopyButton :text="run.command" /></template>
    <ShellCode :code="run.command" :max-height="96" />
  </ShellFact>
</ShellFacts>
```

| `ShellFactItem` | Type | Notes |
| --- | --- | --- |
| `label` | `string` | |
| `value` | `string \| number \| null \| (string \| number)[]` | A list is a line per entry. Nothing, `''` or `[]` draws `—`. |
| `title` | `string` | The value's tooltip. |
| `wide` | `boolean` | Takes the whole row. |

`<ShellFact>` takes the same four as props, plus a `label` slot and a default
slot for the value. Items render first, then children.

### Pills and counts

`<StatusPill>` takes a `status`, plus an optional `label` (words in place of the
status's own) and `tone` (the colour, chosen outright). `status` may be left
out when either of the others is given; a `tone` beside a `status` wins.

```vue
<StatusPill status="failed" />
<StatusPill status="ok" label="passed" />
<StatusPill tone="accent" label="crawler-generated" />
<StatusPill tone="neutral" label="hand-written" />
```

Tones are the five statuses (`ok`, `running`, `review`, `failed`, `queued`),
plus `neutral` (no colour) and `accent` (the shell's, as a running record
wears). `PillTone` and `PILL_TONES` are exported.

`<StatusCounts>` is a run's outcome in a table cell, as
`12 passed · 1 failed · 2 skipped`, each count in its tone:

```vue
<StatusCounts :counts="[
  { label: 'passed', count: stats.passed, tone: 'ok' },
  { label: 'failed', count: stats.failed, tone: 'failed' },
  { label: 'skipped', count: stats.skipped },              /* neutral */
]" />
```

Zero counts are left out; a row with nothing to count shows `empty` (`—`).
`counts` is an ordered list rather than a map because two counts can share a
tone.

### Code, and copying it

`<ShellCode>` is a block of code or machine text: source, an error, a command.

```vue
<ShellCard title="Source" span="all" flush>
  <ShellCode :code="spec.source" :max-height="460" copy @error="toastError" />
</ShellCard>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `code` | `string` | — | The text, or use the default slot. |
| `maxHeight` | `string \| number` | — | Scrolls in place beyond this, without scroll chaining to the page. A number is pixels. |
| `copy` | `boolean` | `false` | A copy button, top right. |
| `copyLabel` | `string` | `'Copy to clipboard'` | The button's tooltip and accessible name. |
| `wrap` | `boolean` | `true` | Wrap long lines. Turn off for columnar text. |
| `tone` | `'danger'` | — | Red rule and tint, for an error. |

It emits `copied` and `error` from the button. In a `flush` card body it is the
body itself (no border or margin); elsewhere it is an inset box.

`<CopyButton>` is the button alone. `text` is a string, or a function for text
known only at press time; `label` names it. It shows a tick on success and
emits `copied`. If the clipboard refuses (insecure origin, permission denied),
it emits `error` with the reason and shows nothing: reporting it is the host's
job.

### A log that is still being written

`<ShellLog>` shows a running process's output. It fetches only what it has not
read yet, and follows the tail until the reader scrolls up; scrolling back to
the end resumes following.

```vue
<script setup lang="ts">
const log = ref<InstanceType<typeof ShellLog> | null>(null)
// On whatever beat the host already polls the run on:
await log.value?.poll()
</script>

<template>
  <ShellCard title="Output" span="all" flush>
    <ShellLog ref="log" :fetch-chunk="(offset) => api.runLog(id, offset)" strip-ansi />
  </ShellCard>
</template>
```

- `fetchChunk(offset)` returns `{ chunk, offset }` (`LogChunk`): the text after
  `offset`, and where it ends.
- The host decides when to read, through the exposed `poll()`. A poll while one
  is in flight joins it. `reset()` forgets what was read.
- `stripAnsi` removes terminal colour codes.
- `maxHeight` defaults to `460px`. It is drawn as `<ShellCode>` is.

## Dialogs and toasts

`<ShellDialog>` is a modal.

```vue
<ShellDialog v-model:open="deleting" title="Delete 3 tests?">
  <p>This removes the specs and their fixtures.</p>
  <template #actions>
    <button @click="deleting = false">Cancel</button>
    <button class="danger" @click="remove">Delete</button>
  </template>
</ShellDialog>
```

- Teleported to `body` (`to` moves it), so no `overflow` clips it. Renders
  nothing while closed.
- `open` defaults to `true`, so a `v-if` works too.
- Escape and a backdrop press emit `close` and `update:open`. Only the topmost
  dialog hears Escape; a drag from the panel ending on the backdrop is not a
  press.
- Opening focuses the first focusable element (or the one marked `autofocus`);
  closing restores focus. Focus is not trapped.
- Public classes for styling content: `.dc-dialog__panel`, `.dc-dialog__title`,
  `.dc-dialog__body`, `.dc-dialog__actions`. Because the dialog is teleported,
  a `class` on the component lands nowhere; use `panelClass` and `bodyClass`
  (anything a `class` binding takes).

```vue
<ShellDialog title="Delete 3 tests?" panel-class="wide-dialog" body-class="file-list">…</ShellDialog>
```

### Which theme a layer wears

A dialog in `body` sits outside every `.dc-shell`, where the tokens are. So it
is a **layer**: an element with `class="dc-shell dc-layer"`, which gets the
shell's palette, type and any host rules on `.dc-shell`, while `.dc-layer`
undoes the shell's layout. Toasts and popovers are layers too. Its theme is
resolved from, first match wins:

1. **Its own `theme`, `accent` and `tokens` props**, field by field.
2. **The nearest `DataShell` it is rendered inside** (as a component), followed
   as it changes.
3. **The app's default**, set with `provideShellTheme` or the plugin.
4. **The nearest `.dc-shell` element above it in the page**: its
   `data-dc-theme` and the tokens on its `style`.
5. **The minimal theme.**

A host `.dc-shell` element inside the `DataShell` of 2 is nearer and wins. A
dialog *beside* a shell (a sibling of `<DataShell>`, or at the app root) gets
the app's default:

```ts
// main.ts
app.use(HeaderContentLayoutPlugin, { theme: 'dark', tokens: { '--dc-accent': '#6aa9ff' } })

// or in the root component's setup — refs and getters are followed
provideShellTheme({ theme: 'dark', tokens: () => palette.value })
```

Either sets only what layers fall back to; a shell still follows its own
`theme` prop. A host rule on `.dc-shell` reaches every layer too.
`useLayerTheme(props)` is the resolution itself, for a layer of your own;
`SHELL_THEME_KEY` is what is provided.

**Toasts.** `useToasts()` is one app-wide stack (a toast raised in a dialog
outlives it), drawn by `<ShellToasts>`, mounted once anywhere:

```ts
const { toast, toastError } = useToasts()
toast('Saved')                         // 'ok', up for TOAST_MS (4.5s)
try { await api.save() } catch (error) {
  toastError(error)                    // 'err', up for TOAST_ERROR_MS (9s)
}
```

```vue
<ShellToasts theme="dark" />
```

`toastError` takes anything thrown (an `Error`'s message, or a string).
`dismiss(id)` removes one early; `toasts` is the stack, for drawing your own.
`<ShellToasts>` is teleported and themed like the dialog, usually from its
props or the app default. The stack is a polite live region; error toasts are
alerts.

### Popovers, and layers of your own

`<ShellPopover>` is a box of the host's own opened against a control (a
multi-select, a filter, a date picker), for anything that is not a plain menu.

```vue
<button ref="trigger" :aria-expanded="open" @click="open = !open">{{ summary }}</button>
<ShellPopover
  v-model:open="open"
  :anchor="trigger"
  :max-height="340"
  class="tenant-picker"
  role="dialog"
  aria-label="Tenants"
>
  <input v-model="filter" type="search" placeholder="filter…" />
  <button v-for="t in shown" :key="t.id" :aria-pressed="has(t)" @click="toggle(t)">{{ t.label }}</button>
</ShellPopover>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | `v-model:open`. A press outside it and its anchor, or Escape, emits `update:open` `false` and `close`. |
| `anchor` | `HTMLElement \| null` | — | What it opens against. |
| `side` | `'below' \| 'above'` | `'below'` | Preferred side, when it has room. |
| `align` | `'start' \| 'end'` | `'start'` | Align the left edges, or the right edges. |
| `maxHeight` | `number` | — | Tallest it grows; the room on its side caps it too. |
| `to` | `string \| HTMLElement` | `'body'` | Teleport target. |
| `theme`, `accent`, `tokens` | | | As a dialog's. |

- Placed `position: fixed` from the anchor's box: below, or above when below
  has under 180px and above has more. At least as wide as the anchor, no wider
  than the window, never taller than its side's room (the rest scrolls).
- Follows the anchor on scroll, resize and its own content resizing.
- Escape closes only the topmost popover (one in a dialog closes before the
  dialog) and returns focus to the anchor if focus was inside. Presses in a
  nested popover count as inside.
- Attributes (`class`, `role`, `aria-*`, `style`) land on the box. Its look
  (surface, border, radius, shadow, `10px` padding) has zero specificity, so a
  host class restyles it.
- `placePopover(anchorRect, width, viewport, options)` is the placement maths
  alone.

**A layer of your own** is an element in `body` with `class="dc-shell dc-layer"`
and a `data-dc-theme`. `.dc-layer` keeps the palette and resets the shell's
`display`, `flex`, `overflow`, background (painted only if `--dc-layer-bg` is
set) and `container-type`. That last one matters: the shell is a size
container, which is the containing block of its `position: fixed`
descendants, so a fixed element inside `.dc-shell` is placed against the shell.
That is why layers are drawn in `body`. `.dc-layer` has the weight of
`.dc-shell`, so any class of yours on the element outranks it.

## Controls of your own

The shell styles its own controls in scoped CSS, so a host `<button>` in a card
is the browser's default. `controls.css` fixes that. It is opt-in and must be
imported after `style.css`:

```ts
import 'appfr/style.css'
import 'appfr/controls.css'
```

```vue
<button class="primary">Run</button>     <!-- filled with the accent -->
<button>Duplicate</button>
<button class="danger">Delete</button>
<button class="link">Open</button>       <!-- reads as a link -->
<select>…</select> <input type="text"> <textarea /> <table>…</table>
<p class="dc-hint">What a choice will do.</p>
<p class="dc-hint dc-hint--warn">Leaves each browser window open.</p>
<p class="dc-hint dc-hint--danger">The server said no.</p>
```

- It styles buttons, `select`, text-like inputs, `textarea`, plain `table` and
  `.dc-hint` inside a `.dc-shell` (which includes `<ShellDialog>`), in the
  shell's tokens.
- It skips any element with a `dc-` class, so the shell's own controls are
  untouched and a host element can opt out the same way.
- Every rule is in `:where()` with no specificity, except the variants' text
  colours, which must match `style.css`'s `.dc-shell button { color: inherit }`;
  loading second is what lets them win.
- Any global host rule (`button { … }`) beats it everywhere, inside the shell
  too. Remove your own global control styles when adopting it.
- In a dialog body, `ul`/`ol` are indented as lists and a `label` is a row (a
  checkbox beside its sentence). Card bodies are left alone.
