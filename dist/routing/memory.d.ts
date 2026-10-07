import type { RouteAdapter } from './adapter';
export interface MemoryAdapter extends RouteAdapter {
    /** Every location navigated to, oldest first. Useful in assertions. */
    readonly history: string[];
}
/**
 * An in-memory adapter. Used by tests and by Storybook, where writing to the
 * real address bar would leak state between stories.
 */
export declare function createMemoryAdapter(initialSearch?: string, initialPath?: string): MemoryAdapter;
