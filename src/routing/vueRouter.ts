import { computed, ref, watch } from 'vue'
import type { RouteAdapter } from './adapter'
import { normalizeSearch } from './adapter'
import { PARAM_ENTITY, PARAM_EXPR } from '../query/codec'
import { addTerm } from '../query/drill'

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
   * history, `#/` and all. What a link needs, and present on every real
   * `Router`; without it a link is the path as it stands.
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
    push: (next, to) => router.push(`${to ?? path.value}${normalizeSearch(next)}`),
    replace: (next, to) => router.replace(`${to ?? path.value}${normalizeSearch(next)}`),
    href: (next, to) => {
      const location = `${to ?? path.value}${normalizeSearch(next)}`
      return router.resolve?.(location).href ?? location
    },
    dispose: stop,
  }
}

/* ------------------------------------------------------------- redirects */

/**
 * The slice of a vue-router location a redirect reads: the path's params and
 * the query it arrived with. Structural, as {@link RouterLike} is, so these
 * helpers type-check without the package's types naming `vue-router`.
 */
export interface RedirectFrom {
  params: Record<string, string | string[] | undefined>
  query: Record<string, string | null | (string | null)[] | undefined>
}

/** Where a redirect lands: a path, with the query it should carry. */
export interface RedirectTo {
  path: string
  query: Record<string, string | null | (string | null)[] | undefined>
}

/**
 * A record's permalink, as a vue-router `redirect`: `/tests/:id` landing on
 * the shell narrowed to that record —
 * `{ path: '/tests/:id', redirect: recordRedirect('test', 'id') }`.
 *
 * A record has no page of its own in a shell that narrows on a press: the
 * press puts the record's term in the query and the screen is about it from
 * then on. So its address is a way into the shell with that term already
 * there — the same term a press writes, `field="id"`, so a record reached by
 * its address reads, and lifts, exactly like one reached from a list. The
 * query the address arrived with is kept, and the term ANDed on to whatever
 * expression it held — once, however often the permalink is followed — so
 * `/tests/x?e=runs` lands on that record's runs.
 *
 * `scopeField` is the field the record's type declares as its
 * {@link EntitySchema.scope}; `param` the route param holding the id. `path`
 * is where the shell is mounted, `/` unless it says otherwise.
 */
export function recordRedirect(
  scopeField: string,
  param: string,
  path = '/',
): (to: RedirectFrom) => RedirectTo {
  return (to) => {
    const raw = to.params[param]
    const id = Array.isArray(raw) ? raw.join('/') : (raw ?? '')
    const current = to.query[PARAM_EXPR]
    const expr = typeof current === 'string' ? current : ''
    // Quoted as a drill quotes it: an id is opaque, a path or a URL as often
    // as a name, and a quote inside it would end the term early.
    const term = `${scopeField}="${id.replace(/"/g, '')}"`
    return { path, query: { ...to.query, [PARAM_EXPR]: addTerm(expr, term) } }
  }
}

/**
 * A type's old list address, as a vue-router `redirect`: `/tests` landing on
 * the shell listing tests — `{ path: '/tests', redirect: entityRedirect('tests') }`.
 *
 * For a host that had a page per list before it had a shell, whose links and
 * bookmarks still name them. The query the address arrived with is kept, so
 * a `/tests?q=checkout` someone saved lands on the same search.
 */
export function entityRedirect(entityKey: string, path = '/'): (to: RedirectFrom) => RedirectTo {
  return (to) => ({ path, query: { ...to.query, [PARAM_ENTITY]: entityKey } })
}
