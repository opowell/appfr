import { computed, ref, watch } from 'vue'
import type { RouteAdapter } from './adapter'
import { normalizeSearch } from './adapter'

/**
 * The slice of a vue-router `Router` this adapter needs. Typed structurally so
 * the package's public types never reference `vue-router`, which is an
 * optional peer — consumers without it still get a clean typecheck.
 */
export interface RouterLike {
  currentRoute: { value: { path: string; fullPath: string } }
  push(to: string): unknown
  replace(to: string): unknown
  /**
   * Turns a location into the `href` the browser would load for it — under hash
   * history, `#/` and all. What opening a query in a new tab needs, and present
   * on every real `Router`; without it a new tab gets the path as it stands.
   */
  resolve?(to: string): { href: string }
}

function searchOf(fullPath: string): string {
  const cut = fullPath.indexOf('?')
  if (cut === -1) return ''
  const rest = fullPath.slice(cut)
  const hash = rest.indexOf('#')
  return normalizeSearch(hash === -1 ? rest : rest.slice(0, hash))
}

/**
 * Routes shell queries through vue-router, so a query change is an ordinary
 * navigation: guards run, back/forward work, and `<RouterLink>` targets stay
 * consistent with what the shell writes.
 */
export function createVueRouterAdapter(router: RouterLike): RouteAdapter {
  const search = ref(searchOf(router.currentRoute.value.fullPath))
  const path = computed(() => router.currentRoute.value.path)

  const stop = watch(
    () => router.currentRoute.value.fullPath,
    (fullPath) => {
      search.value = searchOf(fullPath)
    },
  )

  return {
    search,
    path: path as RouteAdapter['path'],
    push: (next) => router.push(`${path.value}${normalizeSearch(next)}`),
    replace: (next) => router.replace(`${path.value}${normalizeSearch(next)}`),
    open: (next) => {
      if (typeof window === 'undefined') return
      const to = `${path.value}${normalizeSearch(next)}`
      window.open(router.resolve?.(to).href ?? to, '_blank', 'noopener')
    },
    dispose: stop,
  }
}
