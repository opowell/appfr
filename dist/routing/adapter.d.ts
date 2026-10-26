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
    /**
     * Navigate, adding a history entry. `path`, where given, is where to go
     * instead of the current path — how a page under the shell's bar that is
     * not about the query hands the first change to it back to the list (see
     * `pageQuery` on `DataShell`). The shell's own adapters all take it; one of
     * yours that does not stays on the path it is on.
     */
    push(search: string, path?: string): void;
    /** Navigate, replacing the current history entry — `path` as for `push`. */
    replace(search: string, path?: string): void;
    /**
     * The `href` the browser would load for a search — what a press that leads
     * somewhere puts on its link, so ⌘/Ctrl-click, Shift-click, a middle click
     * and *Open link in new tab* all do what they do on any other link.
     * Optional: without it a link is the path and the search as they stand.
     */
    href?(search: string, path?: string): string;
    /** Release any listeners. Called on unmount for adapters the shell created. */
    dispose?(): void;
}
export declare const ROUTE_ADAPTER_KEY: InjectionKey<RouteAdapter>;
/** Normalises `''`, `'?'`, `'a=b'` and `'?a=b'` to `''` or `'?a=b'`. */
export declare function normalizeSearch(search: string | undefined): string;
