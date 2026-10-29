import type { Plugin } from 'vue';
import type { RouteAdapter } from './routing/adapter';
import type { ShellTheme } from 'themes';
export interface HeaderContentLayoutOptions {
    /** Prefix for the globally registered component names. */
    prefix?: string;
    /**
     * Route adapter every shell in the app should use. Provide the vue-router
     * one here and individual shells need no `route` prop.
     */
    route?: RouteAdapter;
    /**
     * The theme dialogs, toasts and popovers wear where nothing nearer says —
     * one written beside a shell rather than inside it, or in no shell at all.
     * Shells themselves are still themed by their own `theme` prop.
     */
    theme?: ShellTheme;
    /** The accent those layers wear, as `theme` above. */
    accent?: string;
    /** Design tokens for those layers, as `theme` above. */
    tokens?: Record<string, string>;
}
/**
 * Registers every component globally. Optional — importing `DataShell`
 * directly is the smaller default. Reach for this when the shell is used
 * across many templates, or to set one route adapter app-wide.
 */
declare const plugin: Plugin<[HeaderContentLayoutOptions?]>;
export default plugin;
