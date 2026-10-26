import type { RouteAdapter } from './adapter';
export interface DetachableAdapterOptions {
    /**
     * Whether the adapter is detached right now — read afresh on every use, so
     * it can follow a route, a prop or a slot.
     */
    detached: () => boolean;
    /** Where a detached adapter's first navigation lands: the list's own path. */
    path: () => string;
}
/**
 * An adapter that can stand apart from the URL it is given.
 *
 * Attached, it *is* `adapter`: every read and every write passes straight
 * through. Detached, it reads a location with nothing in it — the pristine
 * query, whatever the URL's own parameters are, since those belong to the
 * page on screen and not to the shell — and it writes to `path` rather than
 * to the path it is on: the first change made to that query is a way back to
 * the list, with the change applied.
 *
 * A detached write always pushes. Leaving a page for the list is a move to
 * another destination, and Back should return to the page, not lose it to a
 * facet edit that would otherwise have replaced it.
 *
 * The path reaches the adapter as the second argument of `push`, `replace`
 * and `href`, which the shell's three adapters all take. An adapter of your
 * own that ignores it lands the change on the path it is on.
 */
export declare function detachableAdapter(adapter: RouteAdapter, options: DetachableAdapterOptions): RouteAdapter;
