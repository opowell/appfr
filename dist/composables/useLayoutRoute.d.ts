import type { MaybeRefOrGetter, Ref } from 'vue';
import type { RouteAdapter } from '../routing/adapter';
import type { WindowNode } from '../window/types';
export interface UseLayoutRouteOptions {
    /**
     * The route the layout is written to. Give it the same adapter as the
     * `DataShell` in the window — provided under `ROUTE_ADAPTER_KEY`, or passed
     * as its `route` — so each sees the other's parameters and keeps them: two
     * adapters over one address bar each write from a search the other has
     * since changed.
     */
    adapter: RouteAdapter;
    /** The query parameter the layout is held in. `w` by default. */
    param?: string;
    /**
     * The layout the window opens with. While the window is in it the parameter
     * is left out, so an untouched window has the URL it had before, and a URL
     * that loses the parameter — back to before anything was opened — goes back
     * to it.
     */
    home?: MaybeRefOrGetter<WindowNode | null | undefined>;
    /**
     * Milliseconds a change waits before it is written. A splitter dragged
     * across the screen is a change per frame, and browsers refuse a page that
     * rewrites its address that fast.
     */
    delay?: number;
}
export interface LayoutRoute {
    /** Writes a change still waiting out {@link UseLayoutRouteOptions.delay} now. */
    flush(): void;
}
/**
 * Holds a window's layout in the URL: which panels are open, how they are
 * arranged and which tab is on top, so a reload — or a link someone was sent —
 * opens the window as it was.
 *
 * The layout is read from the URL once, now, and again whenever the parameter
 * changes under it (back and forward); every change to the layout is written
 * back, replacing the current history entry rather than adding one — moving a
 * splitter is not somewhere to go back to. Call it before the window renders,
 * so the first layout drawn is the URL's.
 *
 * The URL names panels, not what is in them: a host whose panels come and go
 * (a record opened beside a list) re-creates them from the ids in the layout,
 * which `panelIds(layout.value)` lists once this has run.
 */
export declare function useLayoutRoute(layout: Ref<WindowNode | null>, options: UseLayoutRouteOptions): LayoutRoute;
