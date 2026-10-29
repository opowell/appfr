export interface ModuleOptions {
    /** Prefix for auto-imported component names. Defaults to none. */
    prefix?: string;
    /**
     * Adds the stylesheets to the app — the tokens, the menus' and the shell's
     * own, in that order. Defaults to true.
     */
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
 * Auto-imports the components, adds the stylesheets, and — the part worth
 * having — wires the shell's route adapter to Nuxt's router so queries become
 * real navigations without any per-page setup.
 *
 * ```ts
 * // nuxt.config.ts
 * export default defineNuxtConfig({
 *   modules: ['appfr/nuxt'],
 * })
 * ```
 */
declare const _default: NuxtModule<TOptions, TOptions, false>;
export default _default;
