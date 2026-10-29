import { defineNuxtModule as a, addComponent as s, addPluginTemplate as p } from "@nuxt/kit";
const u = [
  "DataShell",
  "ShellHeader",
  "ResultsArea",
  "SegmentedControl",
  "StatusPill",
  "ListView",
  "CardsView",
  "GridView",
  "ImagesView",
  "TableView",
  "LinksView",
  "PreviewView",
  "TypeCardsView"
], o = a({
  meta: {
    name: "appfr",
    configKey: "dataShell",
    compatibility: { nuxt: ">=3.0.0" }
  },
  defaults: {
    css: !0,
    router: !0
  },
  setup(e, r) {
    e.css !== !1 && r.options.css.push("themes/tokens.css", "menu-bar/style.css", "appfr/style.css");
    for (const t of u)
      s({
        name: `${e.prefix ?? ""}${t}`,
        export: t,
        filePath: "appfr"
      });
    e.router !== !1 && p({
      filename: "appfr-router.mjs",
      getContents: () => `
import { defineNuxtPlugin, useRouter } from '#app'
import { ROUTE_ADAPTER_KEY, createVueRouterAdapter } from 'appfr'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ROUTE_ADAPTER_KEY, createVueRouterAdapter(useRouter()))
})
`
    });
  }
});
export {
  o as default
};
