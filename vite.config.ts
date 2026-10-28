import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

const entry = (path: string) => fileURLToPath(new URL(path, import.meta.url))

/**
 * `controls.css`, shipped beside `style.css` as a file of its own.
 *
 * It cannot go through the bundle the way the components' styles do: every
 * stylesheet a module imports is collected into the one `style.css`
 * (`cssCodeSplit` is off, and has to be for that file to be whole), and this
 * one must stay out of it — it styles elements by tag, and is only for a host
 * that asks for it. Nothing imports it, so it is copied across as it is,
 * comments and all, which is also what lets a reader see why each rule is
 * there. Only for the library build: the stories and the tests have no `dist`.
 */
function controlsStylesheet(): Plugin {
  let library = false
  return {
    name: 'appfr:controls-css',
    apply: 'build',
    configResolved(config) {
      library = Boolean(config.build.lib)
    },
    generateBundle() {
      if (!library) return
      this.emitFile({
        type: 'asset',
        fileName: 'controls.css',
        source: readFileSync(entry('./src/style/controls.css'), 'utf8'),
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), controlsStylesheet()],
  resolve: {
    alias: {
      'appfr/fixtures': entry('./src/fixtures/index.ts'),
      appfr: entry('./src/index.ts'),
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    lib: {
      entry: {
        index: entry('./src/index.ts'),
        fixtures: entry('./src/fixtures/index.ts'),
        nuxt: entry('./src/nuxt.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      /*
       * `themes` and `menu-bar` are dependencies rather than parts: their
       * modules are imported, and their stylesheets are the page's to load
       * once beside this one rather than copies inside it.
       */
      external: ['vue', 'vue-router', '@nuxt/kit', /^themes(\/|$)/, /^menu-bar(\/|$)/],
      output: {
        assetFileNames: 'style.css',
        /*
         * Stable names for the chunks two entry points share — `columns.js`,
         * imported by both `index.js` and `fixtures.js`. Hashed, every edit to
         * a shared module would rename its file, and `dist/` is committed.
         */
        chunkFileNames: '[name].js',
      },
    },
  },
  test: {
    // Unit tests only. Component behaviour is covered by the Playwright specs
    // in tests/e2e, which drive the real stories in a real browser.
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.spec.ts'],
    restoreMocks: true,
  },
})
