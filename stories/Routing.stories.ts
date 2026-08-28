import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DataShell from '../src/components/DataShell.vue'
import { renderShell, themeArgTypes } from './helpers'
import type { ShellStoryArgs } from './helpers'

const meta = {
  title: 'Routing / URL Bound',
  component: DataShell,
  argTypes: {
    ...themeArgTypes,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'These stories drive the real address bar instead of an in-memory',
          'route, so the query is visible in the URL as you change it.',
          '',
          'Note what happens to the `id` parameter Storybook itself puts in the',
          'URL: the shell writes its own parameters alongside it and leaves it',
          'untouched, which is why reloading keeps both the story and the query.',
          '',
          'Changing the entity, view, sort or committed expression pushes a',
          'history entry, so Back returns to the previous query. Nudging a',
          'facet replaces instead — otherwise every chip click would need its',
          'own press of Back.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof DataShell>

export default meta

type Story = StoryObj<ShellStoryArgs>

const story = (args: ShellStoryArgs): Story => ({
  args,
  render: (storyArgs: ShellStoryArgs) => renderShell(storyArgs),
})

/** Open the panel, change something, and watch the address bar. */
export const LiveUrl = story({ liveUrl: true })

/** The same thing with the panel already open. */
export const LiveUrlPanelOpen = story({ liveUrl: true, open: true })

/**
 * In the list view, where an entity filter's effect on the rows is obvious.
 * The view comes from `defaults` rather than the URL, so the address bar stays
 * clean and only what you change shows up in it.
 */
export const LiveUrlList = story({ liveUrl: true, defaults: { view: 'list' } })

/** Pinning is app state, not query state — it stays out of the URL. */
export const LiveUrlPinnable = story({
  liveUrl: true,
  defaults: { view: 'list' },
  pinnable: true,
})

/**
 * A host that lands on an entity rather than home. Its URL is clean, and the
 * whole corpus is spelled out as `e=*` when you widen back out.
 */
export const LiveUrlLandsOnEntity = story({
  liveUrl: true,
  defaults: { landing: 'entity', entity: 'searches', view: 'list' },
})
