import type { Plugin } from 'vue';
import type { RouteAdapter } from './routing/adapter';
export interface HeaderContentLayoutOptions {
    /** Prefix for the globally registered component names. */
    prefix?: string;
    /**
     * Route adapter every shell in the app should use. Provide the vue-router
     * one here and individual shells need no `route` prop.
     */
    route?: RouteAdapter;
}
/**
 * Registers every component globally. Optional — importing `DataShell`
 * directly is the smaller default. Reach for this when the shell is used
 * across many templates, or to set one route adapter app-wide.
 */
declare const plugin: Plugin<[HeaderContentLayoutOptions?]>;
export default plugin;
