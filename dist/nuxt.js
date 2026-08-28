import { defineNuxtModule as r, addComponent as o, addPluginTemplate as n } from "@nuxt/kit";
const u = [
  "DataShell",
  "ShellHeader",
  "QueryPanel",
  "ResultsArea",
  "FacetControl",
  "SegmentedControl",
  "StatusPill",
  "ScoreMeter",
  "WindowFrame",
  "WindowPane",
  "ListView",
  "CardsView",
  "GridView",
  "TableView",
  "LinksView",
  "PreviewView",
  "TypeCardsView"
], l = r({
  meta: {
    name: "header-content-layout",
    configKey: "dataShell",
    compatibility: { nuxt: ">=3.0.0" }
  },
  defaults: {
    css: !0,
    router: !0
  },
  setup(e, a) {
    e.css !== !1 && a.options.css.push("header-content-layout/style.css");
    for (const t of u)
      o({
        name: `${e.prefix ?? ""}${t}`,
        export: t,
        filePath: "header-content-layout"
      });
    e.router !== !1 && n({
      filename: "header-content-layout-router.mjs",
      getContents: () => `
import { defineNuxtPlugin, useRouter } from '#app'
import { ROUTE_ADAPTER_KEY, createVueRouterAdapter } from 'header-content-layout'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ROUTE_ADAPTER_KEY, createVueRouterAdapter(useRouter()))
})
`
    });
  }
});
export {
  l as default
};
