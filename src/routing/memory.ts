import { ref } from 'vue'
import type { RouteAdapter } from './adapter'
import { normalizeSearch } from './adapter'

export interface MemoryAdapter extends RouteAdapter {
  /** Every location navigated to, oldest first. Useful in assertions. */
  readonly history: string[]
  /** Every location opened in a new tab, oldest first — none of them navigated to. */
  readonly opened: string[]
}

/**
 * An in-memory adapter. Used by tests and by Storybook, where writing to the
 * real address bar would leak state between stories.
 */
export function createMemoryAdapter(initialSearch = '', initialPath = '/'): MemoryAdapter {
  const search = ref(normalizeSearch(initialSearch))
  const path = ref(initialPath)
  const history: string[] = [`${path.value}${search.value}`]
  const opened: string[] = []

  return {
    search,
    path,
    history,
    opened,
    open(next) {
      opened.push(`${path.value}${normalizeSearch(next)}`)
    },
    push(next) {
      search.value = normalizeSearch(next)
      history.push(`${path.value}${search.value}`)
    },
    replace(next) {
      search.value = normalizeSearch(next)
      history[history.length - 1] = `${path.value}${search.value}`
    },
  }
}
