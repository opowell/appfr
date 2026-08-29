import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'

/**
 * Nothing in this file may import from `../src` — that would put the library
 * back through Storybook's bundler and quietly test the source instead of the
 * artifacts. The subject is the static page at `stories/no-build/index.html`,
 * which is served untouched and framed here in an iframe of its own.
 */
const NoBuildPage = defineComponent({
  name: 'NoBuildPage',
  props: {
    /** Query string handed to the page, and on to the shell inside it. */
    search: { type: String, default: '' },
  },
  setup(props) {
    return () =>
      h('div', { class: 'sb-frame' }, [
        h('iframe', {
          // Keyed on the search, so changing a control reloads the page rather
          // than leaving the previous run's checklist on screen.
          key: props.search,
          src: `/no-build/index.html${props.search}`,
          title: 'header-content-layout with no build step',
          style: 'flex:1; min-height:0; width:100%; border:0',
        }),
      ])
  },
})

const meta = {
  title: 'No Build / Static Page',
  component: NoBuildPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Proof that `dist/` is usable with no build step at all. The frame',
          'below is a plain HTML file — `stories/no-build/index.html` — served',
          'as it sits on disk. It has an import map, one `<script type=module>`',
          'and a `<link>` to the shipped stylesheet, and that is the whole of',
          'its machinery.',
          '',
          'The host application is written as a real SFC. It is fetched as',
          '`.vue` *source* and compiled in the browser by vue3-sfc-loader, so',
          'the code in it is the same code you would write against a bundler —',
          'bare `import` of `header-content-layout`, `<script setup>`, a scoped',
          'style, a relative import of a second component.',
          '',
          'Both of the components a host mounts at its root are covered. The',
          'first stories mount `DataShell`; the `PanelGrid` ones mount',
          '`WindowFrame` from the same bundle, with two of its panels filled by',
          'components of the host\'s own — separate `.vue` files, compiled in',
          'the page, one of them driving real results through the library\'s',
          'composables.',
          '',
          'The strip across the top is the verification. Each line is a check',
          'the page ran on itself: the artifacts imported, the SFCs compiled',
          'after load, the shell mounted with results, and the stylesheet',
          'actually applied. `MissingStylesheet` is the negative control — it',
          'removes one artifact so you can see the checks fail.',
          '',
          'These stories read `dist/`, not `src/`. Run `npm run build` first,',
          'or you are looking at the artifacts from the last build.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof NoBuildPage>

export default meta

type Story = StoryObj<typeof meta>

/** The page as it comes: seven checks, then the shell it mounted. */
export const FromDist: Story = { args: { search: '' } }

/**
 * The same page under a different schema, which only the URL decides. Proves
 * the `fixtures` subpath export resolves through the import map too, and that
 * the shell reads its own query — entity and view — from the address bar with
 * no router in the page.
 */
export const AnotherSchema: Story = { args: { search: '?schema=LEGO&e=sets&v=list' } }

/**
 * With the text the browser was handed shown beside what it became. Every
 * character on the left arrived over HTTP after the page had loaded; the
 * running shell on the right is what the loader made of it in the tab.
 */
export const WithHostSource: Story = { args: { search: '?source&e=searches&v=list' } }

/**
 * The negative control. `?no-css` removes the `<link>` to `dist/style.css`
 * before it can apply, and the checklist says so: the shell still mounts and
 * still answers the query, but it has no tokens and is not a query container.
 * A checklist that cannot fail is decoration — this is what makes the rest of
 * them mean something.
 */
export const MissingStylesheet: Story = { args: { search: '?no-css' } }

/** One of the shipped palettes, to show theming needs no build step either. */
export const Themed: Story = { args: { search: '?schema=Commerce&theme=macos&v=table' } }

/* ------------------------------------------------------------- panel grid */

/**
 * The other root component, and the more demanding of the two: a panel grid,
 * dragged and resized and closed, all of it from `dist/index.js`.
 *
 * Two of the three panels are filled by components the host wrote as its own
 * `.vue` files. `ItemsPanel.vue` is the worked one — it provides the shell
 * context from `useQueryState` and `useResults` and renders `ResultsArea`
 * inside the pane, so what is in that panel is a real query against real rows.
 * `SourcesPanel.vue` is the plainer kind: its own markup, a `StatusPill` from
 * the bundle, and a scoped style the loader injects. The third panel is markup
 * in the slot, to show a panel needs no component at all.
 *
 * Everything the window does is here: drag a header onto another panel, pull a
 * boundary, take the menu on a pane, close one.
 */
export const PanelGrid: Story = { args: { search: '?app=window' } }

/**
 * The same window with the items panel opened on a different view. The choice
 * is the panel's own — declared in `WindowApp.vue`, offered under *View* in that
 * pane's menu, and handed to the slot, which passes it to `ItemsPanel.vue`.
 */
export const PanelGridAsCards: Story = { args: { search: '?app=window&view=cards' } }

/**
 * With the three files the loader compiled shown beside the window they
 * became: the entry, and the two panel components it imports.
 */
export const PanelGridWithHostSource: Story = { args: { search: '?app=window&source' } }

/** And under a shipped palette, which the window takes the same way the shell does. */
export const PanelGridThemed: Story = { args: { search: '?app=window&theme=windows' } }
