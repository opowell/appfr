import type { InjectionKey, Ref } from 'vue';
/**
 * The shell's entire dependency on routing. Hosts supply an implementation so
 * the component works under vue-router, Nuxt, a bare History API page, or a
 * test — without the library depending on any of them.
 */
export interface RouteAdapter {
    /** Current search string including the leading `?`, or `''` when empty. */
    readonly search: Ref<string>;
    /** Current path, used when building a full location to navigate to. */
    readonly path: Ref<string>;
    /** Navigate, adding a history entry. */
    push(search: string): void;
    /** Navigate, replacing the current history entry. */
    replace(search: string): void;
    /** Release any listeners. Called on unmount for adapters the shell created. */
    dispose?(): void;
}
export declare const ROUTE_ADAPTER_KEY: InjectionKey<RouteAdapter>;
/** Normalises `''`, `'?'`, `'a=b'` and `'?a=b'` to `''` or `'?a=b'`. */
export declare function normalizeSearch(search: string | undefined): string;
