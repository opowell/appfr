import { addComponent, addPluginTemplate, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  /** Prefix for auto-imported component names. Defaults to none. */
  prefix?: string
  /** Adds the package stylesheet to the app. Defaults to true. */
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
  'QueryPanel',
  'ResultsArea',
  'FacetControl',
  'SegmentedControl',
  'StatusPill',
  'WindowFrame',
  'WindowPane',
  'ListView',
  'CardsView',
  'GridView',
  'TableView',
  'LinksView',
  'PreviewView',
  'TypeCardsView',
]

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
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'header-content-layout',
    configKey: 'dataShell',
    compatibility: { nuxt: '>=3.0.0' },
  },
  defaults: {
    css: true,
    router: true,
  },
  setup(options: ModuleOptions, nuxt: { options: { css: string[] } }) {
    if (options.css !== false) {
      nuxt.options.css.push('header-content-layout/style.css')
    }

    for (const name of COMPONENTS) {
      addComponent({
        name: `${options.prefix ?? ''}${name}`,
        export: name,
        filePath: 'header-content-layout',
      })
    }

    if (options.router !== false) {
      addPluginTemplate({
        filename: 'header-content-layout-router.mjs',
        getContents: () => `
import { defineNuxtPlugin, useRouter } from '#app'
import { ROUTE_ADAPTER_KEY, createVueRouterAdapter } from 'header-content-layout'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ROUTE_ADAPTER_KEY, createVueRouterAdapter(useRouter()))
})
`,
      })
    }
  },
})
