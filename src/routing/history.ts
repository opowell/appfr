import { ref } from 'vue'
import type { RouteAdapter } from './adapter'
import { normalizeSearch } from './adapter'

/**
 * Drives the browser's address bar directly. This is the fallback the shell
 * installs when a host provides no adapter and vue-router is not present.
 *
 * Safe to construct during SSR: it reads nothing at module scope and starts
 * from empty values when `window` is absent.
 */
export function createHistoryAdapter(): RouteAdapter {
  const hasWindow = typeof window !== 'undefined'
  const search = ref(hasWindow ? normalizeSearch(window.location.search) : '')
  const path = ref(hasWindow ? window.location.pathname : '/')

  const sync = () => {
    search.value = normalizeSearch(window.location.search)
    path.value = window.location.pathname
  }

  if (hasWindow) window.addEventListener('popstate', sync)

  const navigate = (next: string, mode: 'push' | 'replace') => {
    const normalized = normalizeSearch(next)
    if (!hasWindow) {
      search.value = normalized
      return
    }
    const target = `${window.location.pathname}${normalized}${window.location.hash}`
    if (mode === 'push') window.history.pushState(window.history.state, '', target)
    else window.history.replaceState(window.history.state, '', target)
    // pushState/replaceState do not fire popstate, so mirror the write.
    search.value = normalized
    path.value = window.location.pathname
  }

  return {
    search,
    path,
    push: (next) => navigate(next, 'push'),
    replace: (next) => navigate(next, 'replace'),
    dispose: () => {
      if (hasWindow) window.removeEventListener('popstate', sync)
    },
  }
}
