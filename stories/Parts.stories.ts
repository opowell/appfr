import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h, ref } from 'vue'
import SegmentedControl from '../src/components/SegmentedControl.vue'
import StatusPill from '../src/components/StatusPill.vue'
import { RECORD_STATUSES } from '../src/types'
import { partSurface, statefulFacet } from './helpers'
import { dialogDemo, pillTones, recordPage } from './content'

const meta = {
  title: 'Parts / Controls',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'The pieces the header and query panel are built from. Each is',
          'exported and usable on its own; none needs the surrounding shell',
          'except for its design tokens.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj

/** Every status a row can be in. */
export const StatusPills: Story = {
  render: () => ({
    setup: () => () =>
      partSurface(
        RECORD_STATUSES.map((status) => h(StatusPill, { status })),
        'display:flex; flex-direction:row; align-items:flex-start; gap:8px',
      ),
  }),
}

/** A single-choice switch. One tab stop; arrow keys move between segments. */
export const Segmented: Story = {
  render: () => ({
    setup() {
      const view = ref('list')
      const sort = ref('updated')
      return () =>
        partSurface(
          [
            h(SegmentedControl, {
              label: 'Result view',
              modelValue: view.value,
              options: [
                { key: 'list', label: 'List' },
                { key: 'cards', label: 'Cards' },
                { key: 'grid', label: 'Grid' },
                { key: 'table', label: 'Table' },
              ],
              'onUpdate:modelValue': (next: string) => {
                view.value = next
              },
            }),
            h(SegmentedControl, {
              label: 'Sort field',
              mono: true,
              modelValue: sort.value,
              options: [
                { key: 'updated', label: 'updated' },
                { key: 'metric1', label: 'metric1' },
                { key: 'name', label: 'name' },
              ],
              'onUpdate:modelValue': (next: string) => {
                sort.value = next
              },
            }),
          ],
          'display:flex; flex-direction:column; align-items:flex-start; gap:16px',
        )
    },
  }),
}

/** A multi-select facet. */
export const ChipsFacet: Story = {
  render: () =>
    statefulFacet(
      { kind: 'chips', key: 'state', label: 'State', options: ['running', 'paused', 'failed'] },
      { kind: 'chips', selected: ['running'] },
    ),
}

/** A numeric window. Either bound may be left open. */
export const RangeFacet: Story = {
  render: () =>
    statefulFacet(
      { kind: 'range', key: 'rank', label: 'Rank', min: 0, max: 100 },
      { kind: 'range', min: 20, max: 80 },
    ),
}

/** A single boolean predicate, described by its own text. */
export const ToggleFacet: Story = {
  render: () =>
    statefulFacet(
      { kind: 'toggle', key: 'seen', label: 'Seen', text: 'Hide items already seen' },
      { kind: 'toggle', on: false },
    ),
}

/**
 * A page about one run, made of the content parts: a card headed by the
 * record's name over its reference, its facts, a table of results with a pill
 * apiece, an error, a source to copy and a log that follows its tail — with
 * `controls.css` dressing the host's own buttons, fields and table.
 */
export const RecordContent: Story = {
  render: () => recordPage(),
}

/** The same page in the minimal theme, where the tones resolve to ink. */
export const RecordContentMinimal: Story = {
  render: () => recordPage('minimal'),
}

/** Every tone a pill comes in, words of a host's own, and a row of counts. */
export const PillTonesAndCounts: Story = {
  render: pillTones,
}

/**
 * A dialog opened from a dark shell, and the toast it raises — both drawn in
 * `body`, outside the shell, and both in its theme.
 */
export const DialogAndToasts: Story = {
  render: dialogDemo,
}
