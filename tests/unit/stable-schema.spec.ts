import { describe, expect, it } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { useStableSchema } from '../../src/composables/useStableSchema'
import type { DomainSchema } from '../../src/types'

/** A schema whose one live part is a count, the way a polled one is. */
function schemaOf(count: number, tick: number): DomainSchema {
  return {
    key: 'live',
    label: 'Live',
    kicker: '',
    placeholder: '',
    entities: [
      {
        key: 'runs',
        label: 'Runs',
        count: String(count),
        facets: [],
        tabs: [],
        samples: [],
        // A function reads the data too, and is no part of the comparison.
        columns: [{ key: 'seconds', format: () => String(tick) }],
      },
    ],
  }
}

describe('useStableSchema', () => {
  it('holds a schema as soon as it is made, built once', () => {
    let builds = 0
    const scope = effectScope()
    const schema = scope.run(() => useStableSchema(() => (builds++, schemaOf(1, 0))))!
    expect(schema.value.entities[0]!.count).toBe('1')
    expect(builds).toBe(1)
    scope.stop()
  })

  it('keeps the object it holds while the rebuild comes out the same', async () => {
    const data = ref({ count: 1, tick: 0 })
    const scope = effectScope()
    const schema = scope.run(() =>
      useStableSchema(() => schemaOf(data.value.count, data.value.tick)),
    )!
    const first = schema.value

    data.value = { count: 1, tick: 1 }
    await nextTick()
    expect(schema.value).toBe(first)

    data.value = { count: 2, tick: 1 }
    await nextTick()
    expect(schema.value).not.toBe(first)
    expect(schema.value.entities[0]!.count).toBe('2')
    scope.stop()
  })

  it('compares by the key it is given', async () => {
    const data = ref({ count: 1, tick: 0 })
    const scope = effectScope()
    const schema = scope.run(() =>
      useStableSchema(() => schemaOf(data.value.count, data.value.tick), {
        key: () => String(data.value.tick),
      }),
    )!
    const first = schema.value

    data.value = { count: 5, tick: 0 }
    await nextTick()
    expect(schema.value).toBe(first)

    data.value = { count: 5, tick: 1 }
    await nextTick()
    expect(schema.value).not.toBe(first)
    scope.stop()
  })

  it('stops with its scope', async () => {
    const data = ref(1)
    const scope = effectScope()
    const schema = scope.run(() => useStableSchema(() => schemaOf(data.value, 0)))!
    scope.stop()
    data.value = 2
    await nextTick()
    expect(schema.value.entities[0]!.count).toBe('1')
  })
})
