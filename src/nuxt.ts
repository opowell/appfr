import { addComponent, addPluginTemplate, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  /** Prefix for auto-imported component names. Defaults to none. */
  prefix?: string
  /**
   * Adds the stylesheets to the app — the tokens, the menus' and the shell's
   * own, in that order. Defaults to true.
   */
  css?: boolean
  /**
   * Registers a plugin that routes shell queries through the app's router, so
   * a query change is an ordinary Nuxt navigation. Defaults to true.
   */
  router?: boolean
}

const COMPONENTS = [
  'DataShell',
  'ShellHeader',
  'ResultsArea',
  'SegmentedControl',
  'StatusPill',
  'ListView',
  'CardsView',
  'GridView',
  'ImagesView',
  'TableView',
  'LinksView',
  'PreviewView',
  'TypeCardsView',
]

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
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'appfr',
    configKey: 'dataShell',
    compatibility: { nuxt: '>=3.0.0' },
  },
  defaults: {
    css: true,
    router: true,
  },
  setup(options: ModuleOptions, nuxt: { options: { css: string[] } }) {
    if (options.css !== false) {
      nuxt.options.css.push('themes/tokens.css', 'menu-bar/style.css', 'appfr/style.css')
    }

    for (const name of COMPONENTS) {
      addComponent({
        name: `${options.prefix ?? ''}${name}`,
        export: name,
        filePath: 'appfr',
      })
    }

    if (options.router !== false) {
      addPluginTemplate({
        filename: 'appfr-router.mjs',
        getContents: () => `
import { defineNuxtPlugin, useRouter } from '#app'
import { ROUTE_ADAPTER_KEY, createVueRouterAdapter } from 'appfr'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ROUTE_ADAPTER_KEY, createVueRouterAdapter(useRouter()))
})
`,
      })
    }
  },
})
