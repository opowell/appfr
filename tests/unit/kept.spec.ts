import { describe, expect, it } from 'vitest'
import { computed, effectScope, ref } from 'vue'
import { useResults } from '../../src/composables/useResults'
import type { ResultsState } from '../../src/composables/useResults'
import { useEntityCounts } from '../../src/composables/useEntityCounts'
import type { EntityCountsState } from '../../src/composables/useEntityCounts'
import { parseQuery } from '../../src/query/codec'
import { findEntity } from '../../src/query/schema'
import { iRadarSchema } from '../../src/fixtures/schemas'
import type { DataSource, ShellQuery, ShellRow } from '../../src/types'

// A source listing five rows, two of which it only keeps at their places.
const ROWS: ShellRow[] = Array.from({ length: 5 }, (_, i) => ({
  id: String(i),
  entityKey: iRadarSchema.entities[0]!.key,
  entityLabel: iRadarSchema.entities[0]!.label,
  fields: {},
}))
const source: DataSource = {
  query: ({ limit, offset }) => ({
    rows: ROWS.slice(offset, offset + limit),
    total: ROWS.length,
    kept: 2,
    unfiltered: false,
  }),
}

describe('rows a source keeps at their places', () => {
  it('count for the pages but not for what matches', () => {
    const query = ref<ShellQuery>(parseQuery(`?e=${iRadarSchema.entities[0]!.key}&q=x`, iRadarSchema))
    const state = effectScope().run(() =>
      useResults({
        source: computed(() => source),
        query: computed(() => query.value),
        schema: computed(() => iRadarSchema),
        entity: computed(() => findEntity(iRadarSchema, query.value.entity)),
        limit: computed(() => 1),
      }),
    ) as ResultsState
    expect(state.total.value).toBe(5)
    expect(state.pageCount.value).toBe(5)
    expect(state.matched.value).toBe(3)
  })

  it('are left out of a type\'s count', () => {
    const counts = effectScope().run(() =>
      useEntityCounts({
        source: computed(() => source),
        schema: computed(() => iRadarSchema),
        query: computed(() => parseQuery('?q=x', iRadarSchema)),
        entities: computed(() => iRadarSchema.entities.slice(0, 1)),
      }),
    ) as EntityCountsState
    counts.refresh()
    expect(counts.counts.value.get(iRadarSchema.entities[0]!.key)?.total).toBe(3)
  })
})
