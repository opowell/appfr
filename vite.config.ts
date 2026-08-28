import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const entry = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'header-content-layout/fixtures': entry('./src/fixtures/index.ts'),
      'header-content-layout': entry('./src/index.ts'),
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
      external: ['vue', 'vue-router', '@nuxt/kit'],
      output: {
        assetFileNames: 'style.css',
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
