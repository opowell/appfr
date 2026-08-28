import type { InjectionKey, Ref } from 'vue'

/**
 * The shell's entire dependency on routing. Hosts supply an implementation so
 * the component works under vue-router, Nuxt, a bare History API page, or a
 * test — without the library depending on any of them.
 */
export interface RouteAdapter {
  /** Current search string including the leading `?`, or `''` when empty. */
  readonly search: Ref<string>
  /** Current path, used when building a full location to navigate to. */
  readonly path: Ref<string>
  /** Navigate, adding a history entry. */
  push(search: string): void
  /** Navigate, replacing the current history entry. */
  replace(search: string): void
  /** Release any listeners. Called on unmount for adapters the shell created. */
  dispose?(): void
}

export const ROUTE_ADAPTER_KEY: InjectionKey<RouteAdapter> = Symbol('dc.routeAdapter')

/** Normalises `''`, `'?'`, `'a=b'` and `'?a=b'` to `''` or `'?a=b'`. */
export function normalizeSearch(search: string | undefined): string {
  if (!search) return ''
  const body = search.replace(/^[?]/, '')
  return body ? `?${body}` : ''
}
