import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DataShell from '../src/components/DataShell.vue'
import {
  battleSimSchema,
  commerceSchema,
  iRadarSchema,
  legoSchema,
} from '../src/fixtures/schemas'
import { renderShell, themeArgTypes } from './helpers'
import type { ShellStoryArgs } from './helpers'

const meta = {
  title: 'Schemas / Same Shell',
  component: DataShell,
  argTypes: {
    ...themeArgTypes,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'One shell, four vocabularies. Every entity in every schema has the',
          'same shape — an identity pair, two named metrics, a date, a state',
          'and a score — so the same header, panel and views serve all of them.',
          'Nothing below is a different component; only the schema differs.',
          '',
          'Each opens on its home screen: no entity filter, so every kind of',
          'record in that schema is in the results.',
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

/** Web monitoring: searches, items, scrapers — plus logs and settings. */
export const IRadar = story({ schema: iRadarSchema, pinnable: true })

/** The home screen under a schema with six kinds rather than five. */
export const LegoHome = story({ schema: legoSchema })

/** And under one whose entity names are the longest of the four. */
export const CommerceHome = story({ schema: commerceSchema })

/** Catalogue and inventory: sets, pieces, colors, inventories, categories. */
export const Lego = story({ schema: legoSchema, search: '?e=sets&v=list&f_theme=space' })

/** Crawl and test platform: tenants, crawls, tests, results. */
export const Commerce = story({ schema: commerceSchema, search: '?e=testresults&v=table' })

/** Simulation runs: units, factions, scenarios, runs. */
export const BattleSim = story({ schema: battleSimSchema, search: '?e=runs&v=list&s=metric1' })

/** The same LEGO schema in the grid view, showing labels follow the schema. */
export const LegoGrid = story({ schema: legoSchema, search: '?e=colors&v=grid' })

/**
 * Every schema's home screen mixes its own entities with logs and settings in
 * one result set — here as a table, so the Entity column is visible.
 */
export const EverythingAcrossKinds = story({ schema: commerceSchema, search: '?v=table' })

/** The shared Logs entity, filtered to on its own. */
export const SharedLogsEntity = story({ schema: commerceSchema, search: '?e=logs&v=table' })

/** The shared Settings entity, which is queryable like any other. */
export const SharedSettingsEntity = story({ schema: legoSchema, search: '?e=settings&v=list' })
