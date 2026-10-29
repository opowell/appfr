# No build step

`dist/` is plain ES modules and one stylesheet, so a static page can use the
shell with nothing installed or compiled. Map the artifacts in an import map:

```html
<link rel="stylesheet" href="/vendor/themes/tokens.css" />
<link rel="stylesheet" href="/vendor/menu-bar/style.css" />
<link rel="stylesheet" href="/dist/style.css" />

<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.runtime.esm-browser.prod.js",
      "menu-bar": "/vendor/menu-bar/index.js",
      "appfr": "/dist/index.js",
      "appfr/fixtures": "/dist/fixtures.js"
    }
  }
</script>

<script type="module">
  import { createApp, h } from 'vue'
  import { DataShell } from 'appfr'
  import { iRadarSchema } from 'appfr/fixtures'

  createApp(() => h(DataShell, { schema: iRadarSchema })).mount('#app')
</script>
```

`vue` and `menu-bar` are the only bare specifiers the bundle imports, and Vue's
runtime build is enough: the shell's templates are precompiled.

## The host's components, compiled in the browser

[vue3-sfc-loader][sfc-loader] compiles `.vue` files in the tab, so the host can
be written as SFCs — `<script setup>`, scoped styles, relative imports, and the
same bare imports of the shell as with a bundler:

```js
const options = {
  // Not fetched: the shell must get the page's own Vue, not a second copy.
  moduleCache: { vue: Vue, appfr: shell },

  async getFile(url) {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${response.status} ${url}`)
    const text = await response.text()
    return { getContentData: () => text }
  },

  addStyle(css) {
    document.head.append(Object.assign(document.createElement('style'), { textContent: css }))
  },

  // Bare specifiers go to `moduleCache`; the rest resolve as URLs. (The
  // loader's default joins strings and folds `http://` to `http:/`.)
  pathResolve({ refPath, relPath }) {
    if (relPath === '.') return refPath
    if (!relPath.startsWith('.') && !relPath.startsWith('/')) return relPath
    return new URL(relPath, refPath ?? document.baseURI).href
  },
}

createApp(await loadModule('/App.vue', options)).mount('#app')
```

[`stories/no-build/`](../stories/no-build) is a working page: `index.html`,
`App.vue` (mounts the shell) and `OpenedRow.vue` (imported by it). The page
checks itself — the artifacts import, the SFCs compile, the host mounts with
content, the stylesheets apply — and shows the verdict at the top. The **No
Build** stories frame it; `MissingStylesheet` removes the stylesheets so the
checks fail.

[sfc-loader]: https://github.com/FranckFreiburger/vue3-sfc-loader
