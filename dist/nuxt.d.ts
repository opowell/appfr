export interface ModuleOptions {
    /** Prefix for auto-imported component names. Defaults to none. */
    prefix?: string;
    /** Adds the package stylesheet to the app. Defaults to true. */
    css?: boolean;
    /**
     * Registers a plugin that routes shell queries through the app's router, so
     * a query change is an ordinary Nuxt navigation. Defaults to true.
     */
    router?: boolean;
}
/**
 * Nuxt module for the data shell.
 *
 * Auto-imports the components, adds the stylesheet, and — the part worth
 * having — wires the shell's route adapter to Nuxt's router so queries become
 * real navigations without any per-page setup.
 *
 * ```ts
 * // nuxt.config.ts
 * export default defineNuxtConfig({
 *   modules: ['header-content-layout/nuxt'],
 * })
 * ```
 */
declare const _default: NuxtModule<TOptions, TOptions, false>;
export default _default;
