import { ref as B, inject as lt, provide as un, computed as _, toValue as pt, shallowRef as Tt, watch as Ee, defineComponent as le, openBlock as m, createElementBlock as h, createElementVNode as p, toDisplayString as M, createCommentVNode as V, unref as C, renderSlot as Xe, Fragment as te, renderList as ue, withDirectives as Zt, withKeys as mt, withModifiers as Se, vModelText as Jt, normalizeClass as da, useSlots as dn, nextTick as wt, createBlock as ge, createVNode as ce, createTextVNode as At, normalizeStyle as ze, resolveDynamicComponent as fa, useModel as Lt, onBeforeUnmount as Ve, useId as rs, createSlots as Wn, withCtx as Dt, mergeModels as It, onMounted as pa, resolveComponent as ls, getCurrentScope as va, onScopeDispose as ma, h as ha } from "vue";
const os = Symbol("dc.routeAdapter");
function Le(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function _a() {
  const e = typeof window < "u", t = B(e ? Le(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), s = () => {
    t.value = Le(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, o) => {
    const i = Le(r);
    if (!e) {
      t.value = i;
      return;
    }
    const l = `${window.location.pathname}${i}${window.location.hash}`;
    o === "push" ? window.history.pushState(window.history.state, "", l) : window.history.replaceState(window.history.state, "", l), t.value = i, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    push: (r) => a(r, "push"),
    replace: (r) => a(r, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", s);
    }
  };
}
const is = ["list", "cards", "grid", "table", "links", "preview"], Ec = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Un = ["ok", "running", "queued", "review", "failed"], ga = "cards", Pc = "updated";
function cs(e) {
  return typeof e == "string" && is.includes(e);
}
function Je(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function us(e, t = {}) {
  const n = Je(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function ds(e) {
  return e?.sorts?.length ? e.sorts : [
    { key: "updated", label: "updated" },
    { key: "score", label: "score" },
    { key: "metric1", label: e ? e.labels.metric1.toLowerCase() : "value" },
    { key: "name", label: "name" }
  ];
}
function Ge(e, t) {
  const n = ds(e);
  return (t ? n.find((a) => a.key === t) : void 0) ?? n[0];
}
function fn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Nt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = fn(n);
  return t;
}
function fs(e) {
  if (!e) return !1;
  switch (e.kind) {
    case "chips":
      return e.selected.length > 0;
    case "range":
      return e.min !== null || e.max !== null;
    case "toggle":
      return e.on;
  }
}
function ps(e) {
  return Object.values(e).some(fs);
}
function pn(e) {
  return e.entity === null && e.expr.trim() === "" && !ps(e.facets);
}
function Sc(e) {
  return e.entity !== null;
}
function vn(e, t = {}) {
  const s = t.landing === "entity" ? us(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && cs(t.view) ? t.view : ga,
    sort: Ge(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Nt(s)
  };
}
function vs(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : fn(s);
  }
  return n;
}
const ya = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function wa(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    if (s) {
      o === s ? s = null : n += o;
      continue;
    }
    if (o === '"' || o === "'") {
      s = o;
      continue;
    }
    if (/\s/.test(o)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(r + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += o;
  }
  return a(), t;
}
function ba(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of wa(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const o = ya.exec(a);
    o && o[3] !== "" ? s.push({
      kind: "field",
      field: o[1].toLowerCase(),
      comparator: o[2],
      value: o[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
function ka(e, t, n) {
  const s = n.labels, a = (i) => i.toLowerCase().replace(/\s+/g, ""), r = e.replace(/\s+/g, "");
  if (r === "entity") return t.entityKey;
  if (r === "status" || r === "state") return t.status;
  if (r === "score") return t.score;
  if (r === "updated" || r === "date") return t.updatedAt;
  if (r === "name" || r === a(s.primary)) return t.primary;
  if (r === "ref" || r === a(s.secondary)) return t.secondary;
  if (r === "metric1" || r === a(s.metric1)) return t.metric1;
  if (r === "metric2" || r === a(s.metric2)) return t.metric2;
  if (e in t.facets) return t.facets[e];
  const o = n.facets.find((i) => a(i.label) === r);
  return o ? t.facets[o.key] : void 0;
}
function Gt(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function $a(e, t, n) {
  if (e.kind === "text")
    return Gt(t.primary, e.value) || Gt(t.secondary, e.value);
  const s = ka(e.field, t, n);
  if (s === void 0) return !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? s : o === "false" || o === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? s === o : !0;
    }
    return Gt(s, e.value);
  }
  const a = Number(e.value), r = typeof s == "number" ? s : Number(s);
  if (!Number.isFinite(a) || !Number.isFinite(r)) return !0;
  switch (e.comparator) {
    case ">":
      return r > a;
    case ">=":
      return r >= a;
    case "<":
      return r < a;
    case "<=":
      return r <= a;
  }
}
function xa(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => $a(a, t, n))) : !0;
}
function Hn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Xn(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Ma(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function Ca(e) {
  return String(e + 1).padStart(2, "0");
}
function ms(e) {
  return `${Math.round(Math.min(1, Math.max(0, e)) * 100)}%`;
}
const Gn = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Ea(e, t) {
  switch (e.kind) {
    case "chips":
      return e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Pa(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples;
  if (!r.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const l = r[i % r.length], u = Math.floor(i / r.length), f = Hn(`${s}:${e.key}:${l[0]}:${i}`), E = {};
    for (const g of e.facets)
      E[g.key] = Ea(g, Hn(`${f}:${g.key}`));
    const w = new Date(a.getTime() - f % 900 * 36e5).toISOString();
    o.push({
      id: `${e.key}_${1e4 + i * 7}`,
      entityKey: e.key,
      entityLabel: e.label,
      primary: u ? `${l[0]} · rev ${u + 1}` : l[0],
      secondary: u ? `${l[1]}-${u + 1}` : l[1],
      status: Un[f % Un.length],
      score: Number((0.35 + f % 64 / 100).toFixed(3)),
      metric1: 1 + f % 940,
      metric2: 1 + (f >> 3) % 320,
      updatedAt: w,
      tint: Gn[f % Gn.length],
      facets: E
    });
  }
  return o;
}
function Sa(e, t) {
  for (const [n, s] of Object.entries(t)) {
    const a = e.facets[n];
    switch (s.kind) {
      case "chips": {
        if (!s.selected.length) break;
        if (typeof a != "string" || !s.selected.includes(a)) return !1;
        break;
      }
      case "range": {
        if (s.min === null && s.max === null) break;
        const r = typeof a == "number" ? a : Number(a);
        if (!Number.isFinite(r) || s.min !== null && r < s.min || s.max !== null && r > s.max) return !1;
        break;
      }
      case "toggle": {
        if (!s.on) break;
        if (a !== !0) return !1;
        break;
      }
    }
  }
  return !0;
}
function Aa(e) {
  switch (e) {
    case "score":
      return (t, n) => n.score - t.score;
    case "metric1":
      return (t, n) => n.metric1 - t.metric1;
    case "metric2":
      return (t, n) => n.metric2 - t.metric2;
    case "name":
      return (t, n) => n.primary.localeCompare(t.primary);
    case "updated":
    default:
      return (t, n) => Date.parse(n.updatedAt) - Date.parse(t.updatedAt);
  }
}
function za(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s) => {
    const a = t.get(s.key);
    if (a) return a;
    const r = Pa(s, e);
    return t.set(s.key, r), r;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: o }) {
      const i = ba(s.expr), l = r ? [r] : a.entities, u = [], f = [];
      for (const g of l)
        for (const $ of n(g))
          u.push($), (r ? Sa($, s.facets) : !0) && xa(i, $, g) && f.push($);
      const E = Ge(r, s.sort), w = f.sort(Aa(E.key));
      return s.dir === "asc" && w.reverse(), {
        rows: w.slice(0, o),
        total: f.length,
        unfiltered: f.length === u.length
      };
    }
  };
}
const hs = Symbol("dc.shellContext");
function Fa(e) {
  return un(hs, e), e;
}
function $e() {
  const e = lt(hs, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const mn = "e", hn = "v", _n = "s", gn = "d", yn = "q", wn = "f_", _s = "*", Ra = [mn, hn, _n, gn, yn], en = "..", gs = ",", Ta = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%2A/g, "*"],
  [/%24/g, "$"],
  [/%28/g, "("],
  [/%29/g, ")"],
  [/%21/g, "!"],
  [/%27/g, "'"],
  [/%20/g, "+"]
];
function Yt(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Ta) t = t.replace(n, s);
  return t;
}
function Ie(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ys(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), o = a === -1 ? "" : s.slice(a + 1);
    n.push([Ie(r), o]);
  }
  return n;
}
function La(e) {
  return Ra.includes(e) || e.startsWith(wn);
}
function Yn(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Da(e, t) {
  const n = Ie(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(gs).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(en), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + en.length)).trim(), o = a === "" ? null : Number(a), i = r === "" ? null : Number(r);
      let l = o !== null && Number.isFinite(o) ? Yn(o, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? Yn(i, e.min, e.max) : null;
      return l !== null && u !== null && l > u && ([l, u] = [u, l]), { kind: "range", min: l, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Ia(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(gs) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${en}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Na(e, t, n = {}) {
  const s = vn(t, n), a = new Map(ys(e)), r = a.get(mn), o = r === void 0 ? s.entity : Ie(r), i = o === _s ? null : Je(t, o), l = a.get(hn), u = l && cs(Ie(l)) ? Ie(l) : s.view, f = a.get(_n), E = Ge(i, f ? Ie(f) : n.sort), w = a.get(gn), g = w ? Ie(w) === "asc" ? "asc" : "desc" : s.dir, $ = a.get(yn), y = {};
  for (const x of i?.facets ?? []) {
    const A = a.get(`${wn}${x.key}`);
    y[x.key] = A === void 0 ? fn(x) : Da(x, A);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: E.key,
    dir: g,
    expr: $ === void 0 ? "" : Ie($),
    facets: vs(i, y)
  };
}
function jn(e, t, n = {}, s = "") {
  const a = vn(t, n), r = Je(t, e.entity), o = ys(s).filter(([E]) => !La(E)), i = [], l = (E, w) => i.push([E, Yt(w)]), u = r?.key ?? null;
  u !== a.entity && l(mn, u ?? _s), e.view !== a.view && l(hn, e.view), e.sort !== a.sort && l(_n, e.sort), e.dir !== a.dir && l(gn, e.dir), e.expr.trim() !== "" && l(yn, e.expr);
  for (const E of r?.facets ?? []) {
    const w = e.facets[E.key];
    if (!w) continue;
    const g = Ia(w, E);
    g !== null && i.push([`${wn}${E.key}`, Yt(g)]);
  }
  const f = [
    ...o.map(([E, w]) => [Yt(E), w]),
    ...i
  ];
  return f.length ? `?${f.map(([E, w]) => w === "" ? E : `${E}=${w}`).join("&")}` : "";
}
const tn = "entity";
function Oa(e, t) {
  const n = e.label.toLowerCase();
  switch (t.kind) {
    case "chips":
      return t.selected.map((s) => ({
        id: `${e.key}:${s}`,
        label: `${n}:${s}`,
        facetKey: e.key,
        option: s
      }));
    case "range": {
      if (t.min === null && t.max === null) return [];
      const s = t.min ?? "", a = t.max ?? "";
      return [{ id: e.key, label: `${n}:${s}..${a}`, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function ws(e, t) {
  const n = [];
  t && n.push({
    id: tn,
    label: `entity:${t.key}`,
    facetKey: tn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && fs(a) && n.push(...Oa(s, a));
  }
  return n;
}
function Va(e, t) {
  if (pn(e)) {
    const a = Ge(t, e.sort);
    return `everything · ${e.view} · ${a.label}`;
  }
  const n = ws(e, t).map((a) => a.label), s = e.expr.trim();
  return s && n.push(`"${s}"`), n.join(" · ");
}
function Ka(e) {
  const { adapter: t } = e, n = _(() => pt(e.schema)), s = _(() => pt(e.defaults) ?? {}), a = _(() => Na(t.search.value, n.value, s.value)), r = _(() => Je(n.value, a.value.entity)), o = _(() => r.value ?? us(n.value, s.value)), i = _(() => ds(r.value)), l = _(() => Ge(r.value, a.value.sort)), u = (y, x) => {
    const A = jn(y, n.value, s.value, t.search.value);
    A !== t.search.value && (x === "push" ? t.push(A) : t.replace(A));
  }, f = () => pt(e.navigationMode) ?? "push", E = () => pt(e.facetNavigationMode) ?? "replace", w = (y, x) => {
    u({ ...a.value, ...y }, x);
  }, g = (y, x) => {
    const A = a.value.facets[y];
    if (!A) return;
    const R = { ...a.value.facets, [y]: x(A) };
    w({ facets: R }, E());
  }, $ = (y) => {
    const x = y === null ? null : Je(n.value, y);
    (x?.key ?? null) !== a.value.entity && w(
      {
        entity: x?.key ?? null,
        sort: Ge(x, a.value.sort).key,
        facets: Nt(x)
      },
      f()
    );
  };
  return {
    query: a,
    entity: r,
    focus: o,
    sort: l,
    sorts: i,
    summary: _(() => Va(a.value, r.value)),
    terms: _(() => ws(a.value, r.value)),
    isPristine: _(() => pn(a.value)),
    isEverything: _(() => a.value.entity === null),
    hasFacets: _(() => ps(a.value.facets)),
    setEntity: $,
    clearEntity: () => $(null),
    setView(y) {
      w({ view: y }, f());
    },
    setSort(y) {
      w({ sort: Ge(r.value, y).key }, f());
    },
    toggleDirection() {
      w({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(y) {
      w({ expr: y }, f());
    },
    setFacet(y, x) {
      g(y, () => x);
    },
    toggleChip(y, x) {
      g(y, (A) => A.kind !== "chips" ? A : { kind: "chips", selected: A.selected.includes(x) ? A.selected.filter((q) => q !== x) : [...A.selected, x] });
    },
    setRange(y, x, A) {
      g(y, (R) => R.kind === "range" ? { kind: "range", min: x, max: A } : R);
    },
    toggleFlag(y) {
      g(
        y,
        (x) => x.kind === "toggle" ? { kind: "toggle", on: !x.on } : x
      );
    },
    removeTerm(y) {
      if (y.facetKey === tn) {
        $(null);
        return;
      }
      g(y.facetKey, (x) => x.kind === "chips" && y.option ? { kind: "chips", selected: x.selected.filter((A) => A !== y.option) } : x.kind === "range" ? { kind: "range", min: null, max: null } : x.kind === "toggle" ? { kind: "toggle", on: !1 } : x);
    },
    clearFilters() {
      w({ entity: null, expr: "", facets: Nt(null) }, f());
    },
    reset() {
      u(vn(n.value, s.value), f());
    },
    hrefFor(y) {
      const x = { ...a.value, ...y };
      return x.facets = vs(Je(n.value, x.entity), x.facets), `${t.path.value}${jn(x, n.value, s.value, t.search.value)}`;
    }
  };
}
function Ba(e) {
  const t = Tt([]), n = B(0), s = B(!1), a = Tt(null);
  let r = 0;
  const o = (l) => {
    t.value = l.rows, n.value = l.total, a.value = null;
  }, i = () => {
    const l = ++r, u = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value
    };
    let f;
    try {
      f = e.source.value.query(u);
    } catch (E) {
      a.value = E, t.value = [], n.value = 0;
      return;
    }
    if (!(f instanceof Promise)) {
      o(f), s.value = !1;
      return;
    }
    s.value = !0, f.then((E) => {
      l === r && o(E);
    }).catch((E) => {
      l === r && (a.value = E, t.value = [], n.value = 0);
    }).finally(() => {
      l === r && (s.value = !1);
    });
  };
  return Ee([e.source, e.query, e.schema, e.entity, e.limit], i, {
    immediate: !0
  }), { rows: t, total: n, pending: s, error: a, refresh: i };
}
const qa = ["data-dc-expanded"], Wa = ["aria-expanded", "aria-controls"], Ua = { class: "dc-header__domain" }, Ha = { class: "dc-header__crumb" }, Xa = { class: "dc-header__crumb-root" }, Ga = {
  key: 0,
  class: "dc-header__count dc-mono"
}, Ya = { class: "dc-header__query" }, ja = ["data-dc-active", "title"], Qa = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Za = { class: "dc-header__sr" }, Ja = {
  key: 0,
  class: "dc-header__actions"
}, er = /* @__PURE__ */ le({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = $e(), r = _(() => a.schema.value), o = _(() => a.entity.value?.label ?? "Everything"), i = _(() => {
      if (n.hideCount) return "";
      const l = a.entity.value;
      return l && !a.hasFacets.value && !a.query.value.expr.trim() ? l.count : String(a.total.value);
    });
    return (l, u) => (m(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      p("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: u[0] || (u[0] = (f) => s("toggle"))
      }, [
        u[2] || (u[2] = p("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        p("span", Ua, M(r.value.label), 1),
        p("span", Ha, [
          p("span", Xa, M(o.value), 1),
          i.value ? (m(), h("span", Ga, M(i.value), 1)) : V("", !0)
        ]),
        p("span", Ya, [
          u[1] || (u[1] = p("span", { class: "dc-header__query-label" }, "Query", -1)),
          p("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": C(a).isPristine.value ? "false" : "true",
            title: C(a).summary.value
          }, M(C(a).summary.value), 9, ja)
        ]),
        p("span", Qa, M(e.expanded ? "▲" : "▼"), 1),
        p("span", Za, M(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, Wa),
      l.$slots.actions ? (m(), h("div", Ja, [
        Xe(l.$slots, "actions", {}, void 0, !0)
      ])) : V("", !0)
    ], 8, qa));
  }
}), oe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, bs = /* @__PURE__ */ oe(er, [["__scopeId", "data-v-1d24c7a9"]]), tr = { class: "dc-facet" }, nr = { class: "dc-facet__head" }, sr = ["id"], ar = { class: "dc-facet__hint dc-mono" }, rr = ["aria-labelledby"], lr = ["aria-pressed", "data-dc-active", "onClick"], or = ["aria-labelledby"], ir = ["aria-label", "placeholder", "onKeydown"], cr = ["aria-label", "placeholder", "onKeydown"], ur = ["aria-checked"], dr = { class: "dc-switch__text" }, fr = ["data-dc-active"], pr = /* @__PURE__ */ le({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = _(() => {
      const { facet: w, value: g } = n;
      return w.kind === "chips" && g.kind === "chips" ? g.selected.length ? `${g.selected.length} of ${w.options.length}` : "any" : w.kind === "range" && g.kind === "range" ? g.min === null && g.max === null ? `${w.min}–${w.max}` : `${g.min ?? w.min}–${g.max ?? w.max}` : g.kind === "toggle" ? g.on ? "on" : "off" : "";
    }), r = _(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function o(w) {
      if (n.value.kind !== "chips") return;
      const g = r.value.has(w) ? n.value.selected.filter(($) => $ !== w) : [...n.value.selected, w];
      s("update", { kind: "chips", selected: g });
    }
    const i = B(""), l = B("");
    Ee(
      () => n.value,
      (w) => {
        w.kind === "range" && (i.value = w.min === null ? "" : w.min, l.value = w.max === null ? "" : w.max);
      },
      { immediate: !0, deep: !0 }
    );
    function u(w) {
      if (typeof w == "number") return Number.isFinite(w) ? w : null;
      const g = w.trim();
      if (!g) return null;
      const $ = Number(g);
      return Number.isFinite($) ? $ : null;
    }
    function f() {
      if (n.value.kind !== "range") return;
      const w = u(i.value), g = u(l.value);
      w === n.value.min && g === n.value.max || s("update", { kind: "range", min: w, max: g });
    }
    function E() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (w, g) => (m(), h("div", tr, [
      p("div", nr, [
        p("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, M(e.facet.label), 9, sr),
        p("span", ar, M(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (m(), h("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (m(!0), h(te, null, ue(e.facet.options, ($) => (m(), h("button", {
          key: $,
          type: "button",
          class: "dc-chip",
          "aria-pressed": r.value.has($),
          "data-dc-active": r.value.has($) ? "true" : "false",
          onClick: (y) => o($)
        }, M($), 9, lr))), 128))
      ], 8, rr)) : e.facet.kind === "range" && e.value.kind === "range" ? (m(), h("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        Zt(p("input", {
          "onUpdate:modelValue": g[0] || (g[0] = ($) => i.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: f,
          onBlur: f,
          onKeydown: mt(Se(f, ["prevent"]), ["enter"])
        }, null, 40, ir), [
          [Jt, i.value]
        ]),
        g[2] || (g[2] = p("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        Zt(p("input", {
          "onUpdate:modelValue": g[1] || (g[1] = ($) => l.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: f,
          onBlur: f,
          onKeydown: mt(Se(f, ["prevent"]), ["enter"])
        }, null, 40, cr), [
          [Jt, l.value]
        ])
      ], 8, or)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (m(), h("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: E
      }, [
        p("span", dr, M(e.facet.text), 1),
        p("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...g[3] || (g[3] = [
          p("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, fr)
      ], 8, ur)) : V("", !0)
    ]));
  }
}), ks = /* @__PURE__ */ oe(pr, [["__scopeId", "data-v-c2efbd0c"]]), vr = ["aria-label"], mr = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], hr = /* @__PURE__ */ le({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = B([]);
    function r(o, i) {
      const l = n.options.length;
      let u = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? u = (i + 1) % l : o.key === "ArrowLeft" || o.key === "ArrowUp" ? u = (i - 1 + l) % l : o.key === "Home" ? u = 0 : o.key === "End" && (u = l - 1), u === null) return;
      o.preventDefault();
      const f = n.options[u];
      f && (s("update:modelValue", f.key), a.value[u]?.focus());
    }
    return (o, i) => (m(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (m(!0), h(te, null, ue(e.options, (l, u) => (m(), h("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: da(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (f) => s("update:modelValue", l.key),
        onKeydown: (f) => r(f, u)
      }, M(l.label), 43, mr))), 128))
    ], 8, vr));
  }
}), nn = /* @__PURE__ */ oe(hr, [["__scopeId", "data-v-63fb5482"]]), _r = ["id"], gr = { class: "dc-panel__section" }, yr = { class: "dc-panel__head" }, wr = { class: "dc-panel__note" }, br = { class: "dc-panel__query" }, kr = { class: "dc-panel__expression" }, $r = ["for"], xr = ["id", "placeholder", "onKeydown"], Mr = { class: "dc-panel__actions" }, Cr = ["disabled"], Er = {
  key: 0,
  class: "dc-panel__facets"
}, Pr = {
  key: 1,
  class: "dc-panel__hint"
}, Sr = { class: "dc-panel__section dc-panel__section--row" }, Ar = { class: "dc-panel__control" }, zr = { class: "dc-panel__control" }, Fr = ["title", "aria-label"], Rr = { class: "dc-panel__section" }, Tr = { class: "dc-panel__head" }, Lr = { class: "dc-panel__note" }, Dr = { class: "dc-panel__entities" }, Ir = ["data-dc-active", "aria-current"], Nr = { class: "dc-entity__head" }, Or = { class: "dc-entity__count dc-mono" }, Vr = ["data-dc-active", "aria-current", "onClick"], Kr = { class: "dc-entity__head" }, Br = { class: "dc-entity__label" }, qr = { class: "dc-entity__count dc-mono" }, Wr = { class: "dc-entity__preview dc-mono" }, Ur = {
  key: 0,
  class: "dc-panel__section"
}, Hr = /* @__PURE__ */ le({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = dn(), r = $e(), o = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, i = _(
      () => (n.views ?? [...is]).map((x) => ({ key: x, label: o[x] }))
    ), l = _(
      () => r.sorts.value.map((x) => ({ key: x.key, label: x.label }))
    ), u = B(r.query.value.expr), f = B(null);
    Ee(
      () => r.query.value.expr,
      (x) => {
        u.value = x;
      }
    );
    const E = _(() => u.value !== r.query.value.expr), w = _(() => {
      const x = r.entity.value;
      return x ? `applies to ${x.label.toLowerCase()} · results stay behind this panel` : "applies to every entity · results stay behind this panel";
    });
    function g() {
      r.setExpression(u.value), s("close");
    }
    function $() {
      u.value = "", r.clearFilters();
    }
    function y(x, A) {
      r.setFacet(x, A);
    }
    return wt(() => f.value?.focus()), (x, A) => (m(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: A[5] || (A[5] = mt(Se((R) => s("close"), ["stop"]), ["esc"]))
    }, [
      p("section", gr, [
        p("header", yr, [
          A[6] || (A[6] = p("span", { class: "dc-eyebrow" }, "Query", -1)),
          p("span", wr, M(w.value), 1)
        ]),
        p("div", br, [
          p("div", kr, [
            p("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, $r),
            Zt(p("textarea", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: f,
              "onUpdate:modelValue": A[0] || (A[0] = (R) => u.value = R),
              class: "dc-textarea dc-mono",
              rows: "4",
              spellcheck: "false",
              placeholder: C(r).schema.value.placeholder,
              onKeydown: [
                mt(Se(g, ["meta", "prevent"]), ["enter"]),
                mt(Se(g, ["ctrl", "prevent"]), ["enter"])
              ]
            }, null, 40, xr), [
              [Jt, u.value]
            ]),
            p("div", Mr, [
              p("button", {
                type: "button",
                class: "dc-button dc-button--primary",
                onClick: g
              }, " Run query "),
              p("button", {
                type: "button",
                class: "dc-button",
                disabled: C(r).isPristine.value && !E.value,
                onClick: $
              }, " Reset ", 8, Cr)
            ])
          ]),
          C(r).entity.value ? (m(), h("div", Er, [
            (m(!0), h(te, null, ue(C(r).entity.value.facets, (R) => (m(), ge(ks, {
              key: R.key,
              facet: R,
              value: C(r).query.value.facets[R.key],
              onUpdate: (q) => y(R.key, q)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (m(), h("p", Pr, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ])
      ]),
      p("section", Sr, [
        p("div", Ar, [
          A[7] || (A[7] = p("span", { class: "dc-eyebrow" }, "View", -1)),
          ce(nn, {
            label: "Result view",
            "model-value": C(r).query.value.view,
            options: i.value,
            "onUpdate:modelValue": A[1] || (A[1] = (R) => C(r).setView(R))
          }, null, 8, ["model-value", "options"])
        ]),
        p("div", zr, [
          A[8] || (A[8] = p("span", { class: "dc-eyebrow" }, "Sort", -1)),
          ce(nn, {
            mono: "",
            label: "Sort field",
            "model-value": C(r).query.value.sort,
            options: l.value,
            "onUpdate:modelValue": A[2] || (A[2] = (R) => C(r).setSort(R))
          }, null, 8, ["model-value", "options"]),
          p("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: C(r).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${C(r).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: A[3] || (A[3] = (R) => C(r).toggleDirection())
          }, M(C(r).query.value.dir === "desc" ? "↓" : "↑"), 9, Fr)
        ])
      ]),
      p("section", Rr, [
        p("header", Tr, [
          A[9] || (A[9] = p("span", { class: "dc-eyebrow" }, "Entities", -1)),
          p("span", Lr, M(C(r).schema.value.kicker), 1)
        ]),
        p("div", Dr, [
          p("button", {
            type: "button",
            class: "dc-entity dc-entity--all",
            "data-dc-active": C(r).isEverything.value ? "true" : "false",
            "aria-current": C(r).isEverything.value ? "true" : void 0,
            onClick: A[4] || (A[4] = (R) => C(r).clearEntity())
          }, [
            p("span", Nr, [
              A[10] || (A[10] = p("span", { class: "dc-entity__label" }, "Everything", -1)),
              p("span", Or, M(C(r).entities.value.length) + " kinds", 1)
            ]),
            A[11] || (A[11] = p("span", { class: "dc-entity__preview dc-mono" }, [
              p("span", { class: "dc-truncate" }, "no entity filter"),
              p("span", { class: "dc-truncate" }, "logs and settings included")
            ], -1))
          ], 8, Ir),
          (m(!0), h(te, null, ue(C(r).entities.value, (R) => (m(), h("button", {
            key: R.key,
            type: "button",
            class: "dc-entity",
            "data-dc-active": R.key === C(r).entity.value?.key ? "true" : "false",
            "aria-current": R.key === C(r).entity.value?.key ? "true" : void 0,
            onClick: (q) => C(r).setEntity(R.key)
          }, [
            p("span", Kr, [
              p("span", Br, M(R.label), 1),
              p("span", qr, M(R.count), 1)
            ]),
            p("span", Wr, [
              (m(!0), h(te, null, ue(R.samples.slice(0, 3), (q) => (m(), h("span", {
                key: q[1],
                class: "dc-truncate"
              }, M(q[1]), 1))), 128))
            ])
          ], 8, Vr))), 128))
        ])
      ]),
      a["panel-section"] ? (m(), h("section", Ur, [
        Xe(x.$slots, "panel-section", {}, void 0, !0)
      ])) : V("", !0)
    ], 40, _r));
  }
}), $s = /* @__PURE__ */ oe(Hr, [["__scopeId", "data-v-c80fd80b"]]), xs = {
  primary: "Item",
  secondary: "Reference",
  metric1: "Metric",
  metric2: "Metric 2"
};
function Xr() {
  const e = $e();
  return _(() => e.entity.value?.labels ?? xs);
}
function Ms(e, t, n, s) {
  return {
    row: e,
    entityLabel: e.entityLabel,
    labels: n,
    ordinal: Ca(t),
    metric1: Xn(e.metric1),
    metric2: Xn(e.metric2),
    date: Ma(e.updatedAt),
    score: e.score.toFixed(2),
    percent: ms(e.score),
    pinned: s
  };
}
function ut() {
  const e = $e(), t = _(
    () => new Map(e.entities.value.map((n) => [n.key, n.labels]))
  );
  return _(
    () => e.rows.value.map(
      (n, s) => Ms(n, s, t.value.get(n.entityKey) ?? xs, e.isPinned(n))
    )
  );
}
const Gr = ["data-dc-status"], Yr = /* @__PURE__ */ le({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (m(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, M(e.status), 9, Gr));
  }
}), bt = /* @__PURE__ */ oe(Yr, [["__scopeId", "data-v-23e59fbf"]]), jr = ["data-dc-active", "aria-pressed", "aria-label"], Qr = /* @__PURE__ */ le({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean }
  },
  setup(e) {
    const t = e, n = $e();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, r) => (m(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.row.primary}` : `Pin ${e.row.primary}`,
      onClick: s
    }, M(e.pinned ? "★" : "☆"), 9, jr));
  }
}), bn = /* @__PURE__ */ oe(Qr, [["__scopeId", "data-v-890e0fb5"]]), Zr = { class: "dc-cards" }, Jr = { class: "dc-card__top dc-mono" }, el = {
  key: 0,
  class: "dc-card__entity"
}, tl = { class: "dc-card__top-right" }, nl = ["onClick"], sl = { class: "dc-card__primary" }, al = { class: "dc-card__secondary dc-mono" }, rl = { class: "dc-card__metrics dc-mono" }, ll = { class: "dc-card__date" }, ol = /* @__PURE__ */ le({
  __name: "CardsView",
  setup(e) {
    const t = $e(), n = ut(), s = _(() => t.isEverything.value);
    return (a, r) => (m(), h("div", Zr, [
      (m(!0), h(te, null, ue(C(n), (o) => (m(), h("div", {
        key: o.row.id,
        class: "dc-card"
      }, [
        p("div", Jr, [
          p("span", null, [
            At(M(o.ordinal) + " ", 1),
            s.value ? (m(), h("span", el, M(o.entityLabel), 1)) : V("", !0)
          ]),
          p("span", tl, [
            ce(bt, {
              status: o.row.status
            }, null, 8, ["status"]),
            C(t).pinnable.value ? (m(), ge(bn, {
              key: 0,
              row: o.row,
              pinned: o.pinned
            }, null, 8, ["row", "pinned"])) : V("", !0)
          ])
        ]),
        p("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => C(t).activate(o.row)
        }, [
          p("span", sl, M(o.row.primary), 1),
          p("span", al, M(o.row.secondary), 1)
        ], 8, nl),
        p("div", rl, [
          p("span", null, M(o.labels.metric1) + " " + M(o.metric1), 1),
          p("span", null, M(o.labels.metric2) + " " + M(o.metric2), 1),
          p("span", ll, M(o.date), 1)
        ])
      ]))), 128))
    ]));
  }
}), Cs = /* @__PURE__ */ oe(ol, [["__scopeId", "data-v-47fffd2f"]]), il = { class: "dc-grid" }, cl = ["onClick"], ul = { class: "dc-tile__scrim" }, dl = { class: "dc-tile__top dc-mono" }, fl = { class: "dc-tile__chip" }, pl = { class: "dc-tile__chip" }, vl = { class: "dc-tile__caption" }, ml = { class: "dc-tile__secondary dc-truncate" }, hl = { class: "dc-tile__primary" }, _l = /* @__PURE__ */ le({
  __name: "GridView",
  setup(e) {
    const t = $e(), n = ut();
    return (s, a) => (m(), h("div", il, [
      (m(!0), h(te, null, ue(C(n), (r) => (m(), h("button", {
        key: r.row.id,
        type: "button",
        class: "dc-tile",
        style: ze({ "--dc-tile-tint": r.row.tint }),
        onClick: (o) => C(t).activate(r.row)
      }, [
        p("span", ul, [
          p("span", dl, [
            p("span", fl, M(r.ordinal), 1),
            p("span", pl, M(r.score), 1)
          ]),
          p("span", vl, [
            p("span", ml, M(r.row.secondary), 1),
            p("span", hl, M(r.row.primary), 1)
          ])
        ])
      ], 12, cl))), 128))
    ]));
  }
}), Es = /* @__PURE__ */ oe(_l, [["__scopeId", "data-v-c39dab2f"]]), gl = { class: "dc-links" }, yl = ["onClick"], wl = { class: "dc-link__primary dc-truncate" }, bl = { class: "dc-link__secondary dc-mono dc-truncate" }, kl = /* @__PURE__ */ le({
  __name: "LinksView",
  setup(e) {
    const t = $e(), n = ut();
    return (s, a) => (m(), h("div", gl, [
      (m(!0), h(te, null, ue(C(n), (r) => (m(), h("button", {
        key: r.row.id,
        type: "button",
        class: "dc-link",
        onClick: (o) => C(t).activate(r.row)
      }, [
        p("span", wl, M(r.row.primary), 1),
        p("span", bl, M(r.row.secondary), 1)
      ], 8, yl))), 128))
    ]));
  }
}), Ps = /* @__PURE__ */ oe(kl, [["__scopeId", "data-v-e21922c7"]]), $l = ["aria-valuenow", "aria-label", "title"], xl = /* @__PURE__ */ le({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = _(() => ms(t.value));
    return (s, a) => (m(), h("span", {
      class: "dc-meter",
      role: "meter",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": Math.round(e.value * 100),
      "aria-label": e.label ?? "Score",
      title: `${e.label ?? "Score"} ${n.value}`
    }, [
      p("span", {
        class: "dc-meter__fill",
        style: ze({ width: n.value })
      }, null, 4)
    ], 8, $l));
  }
}), Ss = /* @__PURE__ */ oe(xl, [["__scopeId", "data-v-ab794776"]]), Ml = {
  class: "dc-list",
  role: "list"
}, Cl = ["onClick"], El = { class: "dc-list__ordinal dc-mono" }, Pl = { class: "dc-list__identity" }, Sl = { class: "dc-list__primary dc-truncate" }, Al = { class: "dc-list__secondary dc-mono dc-truncate" }, zl = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Fl = { class: "dc-list__metrics dc-mono" }, Rl = ["title"], Tl = ["title"], Ll = { class: "dc-list__trailing" }, Dl = /* @__PURE__ */ le({
  __name: "ListView",
  setup(e) {
    const t = $e(), n = ut(), s = _(() => t.isEverything.value);
    return (a, r) => (m(), h("div", Ml, [
      (m(!0), h(te, null, ue(C(n), (o) => (m(), h("div", {
        key: o.row.id,
        class: "dc-list__row",
        role: "listitem"
      }, [
        p("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => C(t).activate(o.row)
        }, [
          p("span", El, M(o.ordinal), 1),
          p("span", Pl, [
            p("span", Sl, M(o.row.primary), 1),
            p("span", Al, M(o.row.secondary), 1)
          ]),
          s.value ? (m(), h("span", zl, M(o.entityLabel), 1)) : V("", !0),
          p("span", Fl, [
            p("span", {
              title: o.labels.metric1
            }, M(o.metric1), 9, Rl),
            p("span", {
              title: o.labels.metric2
            }, M(o.metric2), 9, Tl),
            ce(Ss, {
              value: o.row.score
            }, null, 8, ["value"])
          ])
        ], 8, Cl),
        p("span", Ll, [
          ce(bt, {
            status: o.row.status
          }, null, 8, ["status"]),
          C(t).pinnable.value ? (m(), ge(bn, {
            key: 0,
            row: o.row,
            pinned: o.pinned
          }, null, 8, ["row", "pinned"])) : V("", !0)
        ])
      ]))), 128))
    ]));
  }
}), sn = /* @__PURE__ */ oe(Dl, [["__scopeId", "data-v-922176e3"]]), Il = { class: "dc-preview" }, Nl = { class: "dc-preview__pager dc-mono" }, Ol = ["disabled"], Vl = { "aria-live": "polite" }, Kl = ["disabled"], Bl = {
  key: 0,
  class: "dc-preview__card"
}, ql = { class: "dc-preview__body" }, Wl = { class: "dc-preview__top" }, Ul = { class: "dc-preview__badges" }, Hl = { class: "dc-preview__entity dc-mono" }, Xl = { class: "dc-preview__primary" }, Gl = { class: "dc-preview__secondary dc-mono" }, Yl = { class: "dc-preview__fields" }, jl = { class: "dc-preview__key" }, Ql = { class: "dc-preview__value dc-mono" }, Zl = /* @__PURE__ */ le({
  __name: "PreviewView",
  setup(e) {
    const t = $e(), n = ut(), s = B(0);
    Ee(n, (l) => {
      s.value > l.length - 1 && (s.value = Math.max(0, l.length - 1));
    });
    const a = _(() => n.value[s.value]), r = _(() => {
      const l = a.value;
      return l ? [
        { key: l.labels.secondary, value: l.row.secondary },
        { key: l.labels.metric1, value: l.metric1 },
        { key: l.labels.metric2, value: l.metric2 },
        { key: "Updated", value: l.date }
      ] : [];
    }), o = _(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${l}`;
    }), i = (l) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + l)));
    };
    return (l, u) => (m(), h("div", Il, [
      p("div", Nl, [
        p("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => i(-1))
        }, " ‹ ", 8, Ol),
        p("span", Vl, M(o.value), 1),
        p("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= C(n).length - 1,
          onClick: u[1] || (u[1] = (f) => i(1))
        }, " › ", 8, Kl)
      ]),
      a.value ? (m(), h("div", Bl, [
        p("div", {
          class: "dc-preview__media",
          style: ze({ background: a.value.row.tint }),
          "aria-hidden": "true"
        }, " preview ", 4),
        p("div", ql, [
          p("div", Wl, [
            p("span", Ul, [
              ce(bt, {
                status: a.value.row.status
              }, null, 8, ["status"]),
              p("span", Hl, M(a.value.entityLabel), 1)
            ]),
            C(t).pinnable.value ? (m(), ge(bn, {
              key: 0,
              row: a.value.row,
              pinned: a.value.pinned
            }, null, 8, ["row", "pinned"])) : V("", !0)
          ]),
          p("div", null, [
            p("div", Xl, M(a.value.row.primary), 1),
            p("div", Gl, M(a.value.row.secondary), 1)
          ]),
          p("dl", Yl, [
            (m(!0), h(te, null, ue(r.value, (f) => (m(), h("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              p("dt", jl, M(f.key), 1),
              p("dd", Ql, M(f.value), 1)
            ]))), 128))
          ]),
          p("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (f) => C(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : V("", !0)
    ]));
  }
}), As = /* @__PURE__ */ oe(Zl, [["__scopeId", "data-v-35517a68"]]), Jl = { class: "dc-table" }, eo = ["aria-sort"], to = { scope: "col" }, no = {
  key: 0,
  class: "dc-table__entity",
  scope: "col"
}, so = ["aria-sort"], ao = {
  class: "dc-table__number",
  scope: "col"
}, ro = ["aria-sort"], lo = ["onClick"], oo = { class: "dc-table__num dc-mono" }, io = { class: "dc-table__primary" }, co = ["onClick"], uo = { class: "dc-table__muted dc-mono" }, fo = {
  key: 0,
  class: "dc-table__entity dc-mono"
}, po = { class: "dc-table__number dc-mono" }, vo = { class: "dc-table__number dc-mono" }, mo = { class: "dc-table__muted dc-mono" }, ho = /* @__PURE__ */ le({
  __name: "TableView",
  setup(e) {
    const t = $e(), n = ut(), s = Xr(), a = _(() => t.isEverything.value);
    function r(l) {
      t.query.value.sort === l ? t.toggleDirection() : t.setSort(l);
    }
    const o = (l) => t.query.value.sort !== l ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending", i = _(() => new Set(t.sorts.value.map((l) => l.key)));
    return (l, u) => (m(), h("table", Jl, [
      p("thead", null, [
        p("tr", null, [
          u[3] || (u[3] = p("th", {
            class: "dc-table__num",
            scope: "col"
          }, " # ", -1)),
          p("th", {
            scope: "col",
            "aria-sort": o("name")
          }, [
            i.value.has("name") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: u[0] || (u[0] = (f) => r("name"))
            }, M(C(s).primary), 1)) : (m(), h(te, { key: 1 }, [
              At(M(C(s).primary), 1)
            ], 64))
          ], 8, eo),
          p("th", to, M(C(s).secondary), 1),
          a.value ? (m(), h("th", no, " Entity ")) : V("", !0),
          p("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric1")
          }, [
            i.value.has("metric1") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: u[1] || (u[1] = (f) => r("metric1"))
            }, M(C(s).metric1), 1)) : (m(), h(te, { key: 1 }, [
              At(M(C(s).metric1), 1)
            ], 64))
          ], 8, so),
          p("th", ao, M(C(s).metric2), 1),
          p("th", {
            class: "dc-table__date",
            scope: "col",
            "aria-sort": o("updated")
          }, [
            i.value.has("updated") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: u[2] || (u[2] = (f) => r("updated"))
            }, " Updated ")) : (m(), h(te, { key: 1 }, [
              At(" Updated ")
            ], 64))
          ], 8, ro),
          u[4] || (u[4] = p("th", {
            class: "dc-table__state",
            scope: "col"
          }, " State ", -1))
        ])
      ]),
      p("tbody", null, [
        (m(!0), h(te, null, ue(C(n), (f) => (m(), h("tr", {
          key: f.row.id,
          class: "dc-table__row",
          onClick: (E) => C(t).activate(f.row)
        }, [
          p("td", oo, M(f.ordinal), 1),
          p("td", io, [
            p("button", {
              type: "button",
              class: "dc-table__open",
              onClick: Se((E) => C(t).activate(f.row), ["stop"])
            }, M(f.row.primary), 9, co)
          ]),
          p("td", uo, M(f.row.secondary), 1),
          a.value ? (m(), h("td", fo, M(f.entityLabel), 1)) : V("", !0),
          p("td", po, M(f.metric1), 1),
          p("td", vo, M(f.metric2), 1),
          p("td", mo, M(f.date), 1),
          p("td", null, [
            ce(bt, {
              status: f.row.status
            }, null, 8, ["status"])
          ])
        ], 8, lo))), 128))
      ])
    ]));
  }
}), zs = /* @__PURE__ */ oe(ho, [["__scopeId", "data-v-2b15b09a"]]);
function _o(e) {
  const t = Tt([]), n = B(!1), s = Tt(null);
  let a = 0;
  const r = (l, u, f) => ({
    entity: l,
    rows: u.rows.map(
      (E, w) => Ms(E, w, l.labels, e.isPinned(E.id))
    ),
    total: u.total,
    count: f ? l.count : String(u.total)
  }), o = () => {
    const l = ++a, u = e.query.value, f = e.schema.value, E = e.entities.value, w = e.limit.value, g = pn(u), $ = E.map((y) => ({
      entity: y,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        query: { ...u, entity: y.key, facets: Nt(y) },
        schema: f,
        entity: y,
        limit: w
      })
    }));
    if ($.every(({ outcome: y }) => !(y instanceof Promise))) {
      t.value = $.map(
        ({ entity: y, outcome: x }) => r(y, x, g)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: y }) => Promise.resolve(y))).then((y) => {
      l === a && (t.value = y.map(
        (x, A) => r($[A].entity, x, g)
      ), s.value = null);
    }).catch((y) => {
      l === a && (s.value = y, t.value = []);
    }).finally(() => {
      l === a && (n.value = !1);
    });
  }, i = () => {
    try {
      o();
    } catch (l) {
      s.value = l, t.value = [], n.value = !1;
    }
  };
  return Ee(
    [e.source, e.schema, e.query, e.entities, e.limit],
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: i };
}
const go = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, yo = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, wo = ["data-dc-pending"], bo = ["data-dc-empty"], ko = ["onClick"], $o = { class: "dc-type__name" }, xo = { class: "dc-type__count dc-mono" }, Mo = { class: "dc-type__sr" }, Co = {
  key: 0,
  class: "dc-type__empty"
}, Eo = ["onClick"], Po = { class: "dc-type__identity" }, So = { class: "dc-type__primary dc-truncate" }, Ao = { class: "dc-type__secondary dc-mono dc-truncate" }, zo = { class: "dc-type__trailing dc-mono" }, Fo = { class: "dc-type__metric" }, Ro = { class: "dc-type__metric-value" }, To = { class: "dc-type__metric-label" }, Lo = { class: "dc-type__date" }, Do = /* @__PURE__ */ le({
  __name: "TypeCardsView",
  setup(e) {
    const t = $e(), { previews: n, pending: s, error: a } = _o({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), r = _(() => !t.isPristine.value);
    return (o, i) => C(a) ? (m(), h("p", go, " Could not load results: " + M(C(a) instanceof Error ? C(a).message : "the data source failed."), 1)) : !C(n).length && C(s) ? (m(), h("p", yo, " Running query… ")) : (m(), h("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": C(s) ? "true" : "false"
    }, [
      (m(!0), h(te, null, ue(C(n), (l) => (m(), h("section", {
        key: l.entity.key,
        class: "dc-type",
        "data-dc-empty": l.rows.length ? "false" : "true"
      }, [
        p("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => C(t).setEntity(l.entity.key)
        }, [
          p("span", $o, M(l.entity.label), 1),
          p("span", xo, M(l.count), 1),
          i[0] || (i[0] = p("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          p("span", Mo, "Show only " + M(l.entity.label.toLowerCase()), 1)
        ], 8, ko),
        l.rows.length ? V("", !0) : (m(), h("p", Co, M(r.value ? "No matches" : "Nothing here yet"), 1)),
        (m(!0), h(te, null, ue(l.rows, (u) => (m(), h("button", {
          key: u.row.id,
          type: "button",
          class: "dc-type__row",
          onClick: (f) => C(t).activate(u.row)
        }, [
          p("span", Po, [
            p("span", So, M(u.row.primary), 1),
            p("span", Ao, M(u.row.secondary), 1)
          ]),
          p("span", zo, [
            p("span", Fo, [
              p("span", Ro, M(u.metric1), 1),
              p("span", To, M(u.labels.metric1), 1)
            ]),
            p("span", Lo, M(u.date), 1)
          ])
        ], 8, Eo))), 128))
      ], 8, bo))), 128))
    ], 8, wo));
  }
}), Fs = /* @__PURE__ */ oe(Do, [["__scopeId", "data-v-887d72ab"]]), Io = ["data-dc-pending"], No = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, Oo = { class: "dc-results__detail" }, Vo = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ko = {
  key: 3,
  class: "dc-results__state"
}, Bo = { class: "dc-results__detail" }, qo = /* @__PURE__ */ le({
  __name: "ResultsArea",
  setup(e) {
    const t = $e(), n = {
      list: sn,
      cards: Cs,
      grid: Es,
      table: zs,
      links: Ps,
      preview: As
    }, s = _(
      () => t.isEverything.value && t.query.value.view === "cards"
    ), a = _(() => n[t.query.value.view] ?? sn), r = _(() => t.rows.value.length > 0), o = _(() => t.error.value !== null);
    return (i, l) => (m(), h("div", {
      class: "dc-results",
      "data-dc-pending": C(t).pending.value ? "true" : "false"
    }, [
      o.value ? (m(), h("p", No, [
        l[1] || (l[1] = p("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        p("span", Oo, M(C(t).error.value instanceof Error ? C(t).error.value.message : "The data source failed."), 1)
      ])) : s.value ? (m(), ge(Fs, { key: 1 })) : !r.value && C(t).pending.value ? (m(), h("p", Vo, [...l[2] || (l[2] = [
        p("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (m(), ge(fa(a.value), { key: 4 })) : (m(), h("div", Ko, [
        l[3] || (l[3] = p("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        p("span", Bo, M(C(t).summary.value), 1),
        C(t).isPristine.value ? V("", !0) : (m(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: l[0] || (l[0] = (u) => C(t).clearFilters())
        }, M(C(t).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Io));
  }
}), Rs = /* @__PURE__ */ oe(qo, [["__scopeId", "data-v-85cfe37a"]]), Wo = ["data-dc-theme"], Uo = { class: "dc-shell__head" }, Ho = { class: "dc-shell__panel" }, Xo = /* @__PURE__ */ le({
  __name: "DataShell",
  props: /* @__PURE__ */ It({
    schema: {},
    source: {},
    route: {},
    defaults: {},
    limit: { default: 50 },
    previewsPerType: { default: 3 },
    views: {},
    accent: {},
    tokens: {},
    theme: { default: "minimal" },
    pinnable: { type: Boolean },
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    open: { type: Boolean, default: !1 },
    openModifiers: {},
    pinned: { default: () => [] },
    pinnedModifiers: {}
  }),
  emits: /* @__PURE__ */ It(["activate", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Lt(e, "open"), o = Lt(e, "pinned"), i = dn(), l = lt(os, null), u = s.route || l ? null : _a(), f = s.route ?? l ?? u;
    Ve(() => u?.dispose?.());
    const E = _(() => za({ seed: s.schema.key })), w = _(() => s.source ?? E.value), g = Ka({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), $ = Ba({
      source: w,
      query: g.query,
      schema: _(() => s.schema),
      entity: g.entity,
      limit: _(() => s.limit)
    });
    Ee(g.query, (F) => a("query-change", F));
    const y = rs() ?? "dc-query-panel", x = B(null);
    function A() {
      r.value && (r.value = !1, wt(() => {
        x.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const R = _(() => new Set(o.value));
    function q(F) {
      const k = new Set(R.value);
      k.has(F.id) ? k.delete(F.id) : k.add(F.id), o.value = [...k], a("toggle-pin", F);
    }
    const D = Fa({
      ...g,
      schema: _(() => s.schema),
      entities: _(() => s.schema.entities),
      rows: $.rows,
      total: $.total,
      pending: $.pending,
      error: $.error,
      source: w,
      previewsPerType: _(() => s.previewsPerType),
      pinnable: _(() => s.pinnable === !0),
      isPinned: (F) => R.value.has(F.id),
      isPinnedId: (F) => R.value.has(F),
      togglePin: q,
      activate: (F) => a("activate", F)
    }), I = _(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: g.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: A
    }), (F, k) => (m(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: ze(I.value)
    }, [
      p("div", Uo, [
        ce(bs, {
          ref_key: "headerRef",
          ref: x,
          expanded: r.value,
          "panel-id": C(y),
          onToggle: k[0] || (k[0] = (z) => r.value = !r.value)
        }, Wn({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Dt(() => [
              Xe(F.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        r.value ? (m(), h(te, { key: 0 }, [
          p("div", {
            class: "dc-shell__scrim",
            onClick: A
          }),
          p("div", Ho, [
            ce($s, {
              "panel-id": C(y),
              views: e.views,
              onClose: A
            }, Wn({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Dt(() => [
                  Xe(F.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : V("", !0)
      ]),
      Xe(F.$slots, "results", {
        rows: C(D).rows.value,
        total: C(D).total.value,
        query: C(D).query.value,
        pending: C(D).pending.value
      }, () => [
        ce(Rs)
      ], !0)
    ], 12, Wo));
  }
}), Go = /* @__PURE__ */ oe(Xo, [["__scopeId", "data-v-5738ca29"]]), ht = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Yo = ["aria-label"], jo = ["role", "aria-label"], Qo = ["data-dc-item"], Zo = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Jo = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], ei = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, ti = { class: "dc-menu__label dc-truncate" }, ni = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, si = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, ai = /* @__PURE__ */ le({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = B(null), o = B([]), i = B(null), l = B(null), u = B(null), f = B(!1), E = _(
      () => s.items.flatMap((k, z) => ht(k) ? [z] : [])
    ), w = _(() => {
      const k = [{ entries: [] }];
      return s.items.forEach((z, G) => {
        z.heading ? k.push({ heading: z, entries: [] }) : k[k.length - 1]?.entries.push({ item: z, index: G });
      }), k.filter((z) => z.entries.length > 0);
    }), g = B({ x: s.at.x, y: s.at.y });
    async function $() {
      g.value = { x: s.at.x, y: s.at.y }, await wt();
      const k = r.value?.getBoundingClientRect();
      if (!k) return;
      const z = 8;
      let G = s.at.x, j = s.at.y;
      if (G + k.width > window.innerWidth - z) {
        const de = s.at.mirrorX === void 0 ? null : s.at.mirrorX - k.width;
        G = de !== null && de >= z ? de : window.innerWidth - k.width - z;
      }
      j + k.height > window.innerHeight - z && (j = window.innerHeight - k.height - z), g.value = { x: Math.max(z, G), y: Math.max(z, j) };
    }
    const y = _(() => ({ left: `${g.value.x}px`, top: `${g.value.y}px` }));
    function x(k) {
      i.value = k, k !== null && wt(() => o.value[k]?.focus());
    }
    function A(k, z) {
      const G = E.value;
      if (G.length === 0) return null;
      if (k === null) return z === 1 ? G[0] ?? null : G[G.length - 1] ?? null;
      const j = G.indexOf(k);
      return j === -1 ? G[0] ?? null : G[(j + z + G.length) % G.length] ?? null;
    }
    function R(k, z) {
      if (!s.items[k]?.items?.length) return;
      const j = o.value[k]?.getBoundingClientRect(), de = r.value?.getBoundingClientRect();
      !j || !de || (u.value = { x: de.right - 4, y: j.top - 4, mirrorX: de.left + 4 }, l.value = k, f.value = z);
    }
    function q(k) {
      const z = l.value;
      l.value = null, u.value = null, k && z !== null && x(z);
    }
    function D(k) {
      const z = s.items[k];
      if (!(!z || !ht(z))) {
        if (z.items?.length) {
          R(k, !0);
          return;
        }
        a("choose", z);
      }
    }
    function I(k) {
      const z = k.key;
      if (z === "Escape") {
        k.preventDefault(), k.stopPropagation(), l.value !== null ? q(!0) : a("dismiss");
        return;
      }
      if (z === "ArrowDown" || z === "ArrowUp") {
        k.preventDefault(), k.stopPropagation(), q(!1), x(A(i.value, z === "ArrowDown" ? 1 : -1));
        return;
      }
      if (z === "Home" || z === "End") {
        k.preventDefault(), k.stopPropagation(), q(!1), x(A(null, z === "Home" ? 1 : -1));
        return;
      }
      if (z === "ArrowRight") {
        const G = i.value;
        G !== null && s.items[G]?.items?.length && (k.preventDefault(), k.stopPropagation(), R(G, !0));
        return;
      }
      if (z === "ArrowLeft") {
        l.value !== null && (k.preventDefault(), k.stopPropagation(), q(!0));
        return;
      }
      if (z === "Enter" || z === " ") {
        const G = i.value;
        if (G === null) return;
        k.preventDefault(), k.stopPropagation(), D(G);
      }
    }
    function F(k) {
      const z = s.items[k];
      !z || !ht(z) || (l.value !== null && l.value !== k && q(!1), x(k), z.items?.length && R(k, !1));
    }
    return pa(() => {
      $(), s.autofocus && x(A(null, 1));
    }), Ee(() => s.at, $, { deep: !0 }), Ee(() => s.items, () => void $(), { deep: !0 }), Ve(() => {
      l.value = null;
    }), t({ root: r }), (k, z) => {
      const G = ls("MenuList", !0);
      return m(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: ze(y.value),
        onKeydown: I
      }, [
        (m(!0), h(te, null, ue(w.value, (j, de) => (m(), h("div", {
          key: `${de}-${j.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: j.heading ? "group" : "none",
          "aria-label": j.heading?.label
        }, [
          j.heading ? (m(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": j.heading.id
          }, M(j.heading.label), 9, Qo)) : V("", !0),
          (m(!0), h(te, null, ue(j.entries, ({ item: Z, index: L }) => (m(), h(te, {
            key: Z.id ?? `${L}-${Z.label ?? ""}`
          }, [
            Z.separator ? (m(), h("div", Zo)) : (m(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (K) => {
                K && (o.value[L] = K);
              },
              type: "button",
              class: "dc-menu__item",
              role: Z.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Z.checked === void 0 ? void 0 : Z.checked,
              "aria-haspopup": Z.items?.length ? "menu" : void 0,
              "aria-expanded": Z.items?.length ? l.value === L : void 0,
              "aria-disabled": Z.disabled ? "true" : void 0,
              disabled: Z.disabled,
              "data-dc-item": Z.id,
              tabindex: "-1",
              onClick: (K) => D(L),
              onMouseenter: (K) => F(L)
            }, [
              p("span", ei, M(Z.checked ? "✓" : ""), 1),
              p("span", ti, M(Z.label), 1),
              Z.shortcut ? (m(), h("span", ni, M(Z.shortcut), 1)) : Z.items?.length ? (m(), h("span", si, "›")) : V("", !0)
            ], 40, Jo))
          ], 64))), 128))
        ], 8, jo))), 128)),
        l.value !== null && u.value ? (m(), ge(G, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: u.value,
          label: e.items[l.value]?.label,
          autofocus: f.value,
          onChoose: z[0] || (z[0] = (j) => a("choose", j)),
          onDismiss: z[1] || (z[1] = (j) => q(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : V("", !0)
      ], 44, Yo);
    };
  }
}), Ts = /* @__PURE__ */ oe(ai, [["__scopeId", "data-v-9b1413fa"]]), ri = ["data-dc-theme", "aria-label"], li = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], oi = /* @__PURE__ */ le({
  __name: "MenuBar",
  props: {
    menus: {},
    label: {},
    accent: {},
    tokens: {},
    theme: { default: "minimal" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = e, s = _(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), a = t, r = B(null), o = B([]), i = B(null), l = B(null), u = B(!1), f = _(
      () => n.menus.flatMap((D, I) => ht(D) ? [I] : [])
    );
    function E(D, I) {
      const F = o.value[D]?.getBoundingClientRect(), k = n.menus[D];
      !F || !k || !ht(k) || (l.value = { x: F.left, y: F.bottom + 2, mirrorX: F.right }, i.value = D, u.value = I);
    }
    function w(D) {
      const I = i.value;
      i.value = null, l.value = null, D && I !== null && o.value[I]?.focus();
    }
    function g(D) {
      i.value === D ? w(!0) : E(D, !1);
    }
    function $(D) {
      i.value === null || i.value === D || E(D, !1);
    }
    function y(D, I) {
      const F = f.value;
      if (F.length === 0) return null;
      if (D === null) return I === 1 ? F[0] ?? null : F[F.length - 1] ?? null;
      const k = F.indexOf(D);
      return k === -1 ? F[0] ?? null : F[(k + I + F.length) % F.length] ?? null;
    }
    function x(D) {
      const I = D.key;
      if (I === "Escape") {
        if (i.value === null) return;
        D.preventDefault(), w(!0);
        return;
      }
      if (I === "ArrowDown" && i.value === null) {
        const z = A();
        if (z === null) return;
        D.preventDefault(), E(z, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const F = i.value ?? A(), k = y(F, I === "ArrowRight" ? 1 : -1);
      k !== null && (D.preventDefault(), i.value !== null ? E(k, !0) : o.value[k]?.focus());
    }
    function A() {
      const D = o.value.findIndex((I) => I === document.activeElement);
      return D === -1 ? f.value[0] ?? null : D;
    }
    function R(D) {
      const I = D.target;
      !I || r.value?.contains(I) || w(!1);
    }
    Ee(i, (D) => {
      D !== null ? window.addEventListener("pointerdown", R, !0) : window.removeEventListener("pointerdown", R, !0);
    }), Ve(() => window.removeEventListener("pointerdown", R, !0));
    function q(D) {
      w(!0), D.action?.(), a("choose", D);
    }
    return (D, I) => (m(), h("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: ze(s.value),
      onKeydown: x
    }, [
      (m(!0), h(te, null, ue(e.menus, (F, k) => (m(), h("button", {
        key: F.id ?? F.label ?? k,
        ref_for: !0,
        ref: (z) => {
          z && (o.value[k] = z);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === k,
        "aria-disabled": F.disabled ? "true" : void 0,
        disabled: F.disabled,
        "data-dc-menu": F.id ?? F.label,
        tabindex: k === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (z) => g(k),
        onMouseenter: (z) => $(k)
      }, M(F.label), 41, li))), 128)),
      i.value !== null && l.value ? (m(), ge(Ts, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: l.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: q,
        onDismiss: I[0] || (I[0] = (F) => w(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : V("", !0)
    ], 44, ri));
  }
}), Ac = /* @__PURE__ */ oe(oi, [["__scopeId", "data-v-93dbd2e4"]]), ii = ["aria-label", "aria-expanded", "disabled"], ci = { "aria-hidden": "true" }, ui = /* @__PURE__ */ le({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = B(null), a = B(null), r = B(null), o = B(!1), i = _(() => r.value !== null);
    function l($) {
      const y = s.value?.getBoundingClientRect();
      y && (r.value = { x: y.left, y: y.bottom + 4, mirrorX: y.right }, o.value = $);
    }
    function u($) {
      r.value = null, $ && s.value?.focus();
    }
    function f() {
      i.value ? u(!0) : l(!1);
    }
    function E($) {
      $.key !== "ArrowDown" || i.value || ($.preventDefault(), l(!0));
    }
    function w($) {
      const y = $.target;
      y && (s.value?.contains(y) || a.value?.root?.contains(y) || u(!1));
    }
    Ee(i, ($) => {
      $ ? window.addEventListener("pointerdown", w, !0) : window.removeEventListener("pointerdown", w, !0);
    }), Ve(() => window.removeEventListener("pointerdown", w, !0));
    function g($) {
      u(!0), $.action?.(), n("choose", $);
    }
    return ($, y) => (m(), h(te, null, [
      p("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: E
      }, [
        p("span", ci, M(e.glyph), 1)
      ], 40, ii),
      r.value ? (m(), ge(Ts, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: o.value,
        onChoose: g,
        onDismiss: y[0] || (y[0] = (x) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : V("", !0)
    ], 64));
  }
}), kn = /* @__PURE__ */ oe(ui, [["__scopeId", "data-v-48f5ada5"]]), je = (e) => e.kind === "split", W = (e) => e.kind === "group", X = (e) => e.kind === "float", ot = { x: 16, y: 16, w: 360, h: 260 }, Ot = 28, Ls = 120, an = 220, Ds = 38, Ze = 6;
function kt(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const o = t(a.node, r);
    return o === a.node ? a : (n = !0, { ...a, node: o });
  });
  return n ? { ...e, frames: s } : e;
}
function Oe(e) {
  return { kind: "group", panels: [e] };
}
function zc(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const re = (e) => typeof e == "string", $n = (e) => re(e) ? Oe(e) : e, Vt = (e) => re(e) ? [e] : De(e), Qn = (e) => e.panels.filter(re), di = (e) => e.panels.filter((t) => !re(t)), Ce = (e, t) => e.panels.includes(t);
function $t(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (re(r) || !Q(r, t)) return r;
    const o = n(r);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, panels: a } : e;
}
function xn(e, t) {
  return { node: e, rect: { ...ot, ...t } };
}
function Mn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Cn(e, t) {
  const n = { ...ot, ...t };
  return Mn(
    e.map(
      (s, a) => xn(s, {
        ...n,
        x: n.x + a * Ot,
        y: n.y + a * Ot
      })
    )
  );
}
function En(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Pn = (e, t, n) => En("row", e, t, n), Fc = (e, t, n) => En("column", e, t, n);
function ye(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const it = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Rc = (e) => ({ ...e, headless: !0 }), Tc = (e) => ({ ...e, fixedView: !0 }), fi = (e) => e === "left" || e === "right" ? "row" : "column";
function De(e) {
  return W(e) ? e.panels.flatMap(Vt) : X(e) ? e.frames.flatMap((t) => De(t.node)) : e.children.flatMap(De);
}
function Q(e, t) {
  return W(e) ? e.panels.some((n) => re(n) ? n === t : Q(n, t)) : X(e) ? e.frames.some((n) => Q(n.node, t)) : e.children.some((n) => Q(n, t));
}
const rn = (e) => De(e).length === 0;
function Kt(e) {
  return je(e) ? e.children.map((t, n) => ({ node: t, index: n })) : X(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => re(t) ? [] : [{ node: t, index: n }]);
}
const Sn = (e) => Kt(e).map((t) => t.node);
function dt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => re(s) ? s === t : Q(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Is(e) {
  const t = e.panels[dt(e)];
  return t !== void 0 && re(t) ? t : "";
}
function be(e) {
  if (re(e)) return e;
  if (W(e)) {
    const n = e.panels[dt(e)];
    return n === void 0 ? "" : be(n);
  }
  if (X(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? be(n.node) : "";
  }
  const t = e.children[0];
  return t ? be(t) : "";
}
function et(e, t) {
  if (W(e) && Ce(e, t)) return e;
  for (const n of Sn(e)) {
    const s = et(n, t);
    if (s) return s;
  }
  return null;
}
function pi(e) {
  const t = Sn(e).flatMap(pi);
  return W(e) ? [e, ...t] : t;
}
function me(e, t) {
  if (W(e)) {
    for (const n of di(e)) {
      const s = me(n, t);
      if (s) return s;
    }
    return null;
  }
  if (X(e)) {
    for (const n of e.frames)
      if (Q(n.node, t))
        return me(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = me(n, t);
    if (s) return s;
  }
  return null;
}
function jt(e, t, n = Ls) {
  const s = (i, l) => l > 0 ? Math.max(Math.min(i, l), Math.min(n, l)) : Math.max(i, n), a = s(e.w, t.w), r = s(e.h, t.h), o = (i, l, u) => Math.min(Math.max(i, 0), Math.max(u - l, 0));
  return {
    x: Math.round(o(e.x, a, t.w)),
    y: Math.round(o(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function Zn(e, t, n, s, a = Ls) {
  let { x: r, y: o, w: i, h: l } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + s), t.includes("n") && (l = e.h - s, o = e.y + s), i < a && (t.includes("w") && (r = e.x + e.w - a), i = a), l < a && (t.includes("n") && (o = e.y + e.h - a), l = a), { x: r, y: o, w: i, h: l };
}
const Ns = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function tt(e, t, n) {
  if (W(e)) return $t(e, t, (r) => tt(r, t, n));
  if (X(e)) {
    let r = !1;
    const o = e.frames.map((i) => {
      if (!Q(i.node, t)) return i;
      if (me(i.node, t)) {
        const u = tt(i.node, t, n);
        return u === i.node ? i : (r = !0, { ...i, node: u });
      }
      const l = n(i);
      return l === i ? i : (r = !0, l);
    });
    return r ? { ...e, frames: o } : e;
  }
  if (!Q(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const o = tt(r, t, n);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: a } : e;
}
function vi(e, t, n) {
  return tt(e, t, (s) => Ns(s.rect, n) ? s : { ...s, rect: n });
}
const Ne = (e) => e.maximized === !0, Os = (e) => (t) => {
  if (Ne(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function mi(e, t, n = !0) {
  return tt(e, t, Os(n));
}
function Lc(e, t) {
  const n = me(e, t);
  return n ? mi(e, t, !Ne(n)) : e;
}
const He = (e) => e.minimized === !0, Vs = (e) => (t) => {
  if (He(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function hi(e, t, n = !0) {
  return tt(e, t, Vs(n));
}
function Dc(e, t) {
  const n = me(e, t);
  return n ? hi(e, t, !He(n)) : e;
}
function Ue(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = ct(e, t.slice(0, -1));
  return !s || !X(s) ? null : s.frames[n] ?? null;
}
function ln(e, t) {
  if (X(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!Q(s.node, t)) continue;
      const a = ln(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of Kt(e)) {
    if (!Q(n, t)) continue;
    const a = ln(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function An(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = ct(e, a);
  if (!r || !X(r)) return e;
  const o = r.frames[s];
  if (!o) return e;
  const i = n(o);
  if (i === o) return e;
  const l = [...r.frames];
  return l[s] = i, at(e, a, { ...r, frames: l });
}
function Jn(e, t, n) {
  return An(
    e,
    t,
    (s) => Ns(s.rect, n) ? s : { ...s, rect: n }
  );
}
function _i(e, t, n = !0) {
  return An(e, t, Os(n));
}
function gi(e, t, n = !0) {
  return An(e, t, Vs(n));
}
function _t(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (X(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const i = _t(o.node, s), l = i === o.node ? o : { ...o, node: i };
    if (n === e.frames.length - 1 && l === o) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(l), { ...e, frames: u };
  }
  const a = ct(e, [n]);
  if (!a) return e;
  const r = _t(a, s);
  return r === a ? e : at(e, [n], r);
}
function yi(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (X(s) && (n[r] = s.frames.length - 1), s = ct(s, [a]));
  }), n;
}
function zt(e, t, n, s) {
  if (W(e)) return $t(e, n, (o) => zt(o, t, n, s));
  if (X(e)) {
    const o = e.frames.findIndex((l) => Q(l.node, n)), i = e.frames[o];
    if (!i) return e;
    if (me(i.node, n)) {
      const l = zt(i.node, t, n, s);
      if (l === i.node) return e;
      const u = [...e.frames];
      return u[o] = { ...i, node: l }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, xn(Oe(t), s)] };
  }
  if (!Q(e, n)) return e;
  let a = !1;
  const r = e.children.map((o) => {
    const i = zt(o, t, n, s);
    return i !== o && (a = !0), i;
  });
  return a ? { ...e, children: r } : e;
}
function es(e, t, n, s) {
  if (t === n || !Q(e, t) || !Q(e, n) || !me(e, n)) return e;
  const a = nt(e, t);
  if (!a) return e;
  const r = zt(a, t, n, s);
  return r === a ? e : ve(r);
}
function Qt(e, t) {
  if (W(e)) return $t(e, t, (a) => Qt(a, t));
  if (X(e)) {
    const a = e.frames.findIndex((u) => Q(u.node, t)), r = e.frames[a];
    if (!r) return e;
    const o = Qt(r.node, t), i = o === r.node ? r : { ...r, node: o };
    if (a === e.frames.length - 1 && i === r) return e;
    const l = [...e.frames];
    return l.splice(a, 1), l.push(i), { ...e, frames: l };
  }
  if (!Q(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = Qt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function zn(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, o) => r + o, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const Ye = (e) => zn(e.children.length, e.sizes), Fe = (e) => {
  const t = W(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function ve(e) {
  if (W(e)) return wi(e);
  if (X(e)) {
    const i = e.frames.flatMap((l) => {
      const u = ve(l.node);
      return rn(u) ? [] : [u === l.node ? l : { ...l, node: u }];
    });
    return i.length === e.frames.length && i.every((l, u) => l === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = Ye(e), n = Fe(e), s = [], a = [], r = [];
  e.children.forEach((i, l) => {
    const u = ve(i), f = t[l] ?? 0;
    if (rn(u)) return;
    if (!n && je(u) && u.direction === e.direction && !Fe(u) && !it(u)) {
      const w = Ye(u);
      u.children.forEach((g, $) => {
        s.push(g), a.push(f * (w[$] ?? 0));
      });
      return;
    }
    s.push(u), a.push(f);
    const E = n?.[l];
    E && r.push(E);
  });
  const o = s[0];
  return s.length === 1 && o && !it(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: zn(s.length, a),
    ...ye(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function wi(e) {
  if (e.panels.every(re)) return e;
  const t = be(e), n = Fe(e), s = [], a = [];
  e.panels.forEach((i, l) => {
    const u = n?.[l];
    if (re(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const f = ve(i);
    if (!rn(f)) {
      if (W(f) && !it(f) && !Fe(f)) {
        s.push(...f.panels);
        return;
      }
      s.push(f), u && a.push(u);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !re(r) && !it(e))
    return r;
  if (s.length === e.panels.length && s.every((i, l) => i === e.panels[l]))
    return e;
  const o = t && s.some((i) => Vt(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...o ? { active: o } : {},
    ...ye(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function nt(e, t) {
  if (X(e)) {
    const o = e.frames.flatMap((i) => {
      const l = nt(i.node, t);
      return l ? [l === i.node ? i : { ...i, node: l }] : [];
    });
    return o.length === 0 ? null : { ...e, frames: o };
  }
  if (W(e)) {
    if (!Q(e, t)) return e;
    const o = dt(e), i = [];
    for (const f of e.panels) {
      if (re(f)) {
        f !== t && i.push(f);
        continue;
      }
      const E = nt(f, t);
      E && i.push(E);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((f) => Vt(f).includes(e.active)) ? e.active : be(i[o] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...ye(e) } : { kind: "group", panels: i, ...ye(e) };
  }
  const n = Ye(e), s = [], a = [];
  if (e.children.forEach((o, i) => {
    const l = nt(o, t);
    l && (s.push(l), a.push(n[i] ?? 0));
  }), s.length === 0) return null;
  const r = s[0];
  return s.length === 1 && r && !it(e) ? r : ve({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...ye(e)
  });
}
function bi(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...ye(e) };
}
function vt(e, t, n, s, a) {
  const r = (g) => kt(
    g,
    ($) => Q($, n) ? vt($, t, n, s, a) : $
  );
  if (s === "float") return e;
  const o = (g) => $t(g, n, ($) => vt($, t, n, s, a));
  if (s === "center")
    return W(e) ? Ce(e, n) ? bi(e, t, a) : o(e) : X(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (g) => Q(g, n) ? vt(g, t, n, s, a) : g
      )
    };
  const i = fi(s), l = s === "left" || s === "top", u = (g) => ({
    kind: "split",
    direction: i,
    children: l ? [Oe(t), g] : [g, Oe(t)],
    sizes: [0.5, 0.5]
  });
  if (W(e)) return Ce(e, n) ? u(e) : o(e);
  if (X(e)) return r(e);
  const f = Ye(e), E = e.children.findIndex(
    (g) => W(g) && Ce(g, n)
  );
  if (E >= 0 && e.direction === i) {
    const g = (f[E] ?? 0) / 2, $ = [...e.children], y = [...f];
    return $.splice(l ? E : E + 1, 0, Oe(t)), y.splice(E, 1, g, g), {
      kind: "split",
      direction: i,
      children: $,
      sizes: y,
      ...ye(e)
    };
  }
  const w = e.children.map((g) => Q(g, n) ? W(g) && Ce(g, n) ? u(g) : vt(g, t, n, s) : g);
  return {
    kind: "split",
    direction: e.direction,
    children: w,
    sizes: f,
    ...ye(e)
  };
}
function st(e, t) {
  if (W(e)) {
    if (Ce(e, t))
      return Is(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((l) => !re(l) && Q(l, t)), r = e.panels[a];
    if (r === void 0 || re(r)) return e;
    const o = st(r, t);
    if (o === r && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = o, { ...e, panels: i, active: t };
  }
  if (!Q(e, t)) return e;
  if (X(e)) return kt(e, (a) => st(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = st(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function gt(e, t, n) {
  if (W(e)) {
    if (!Ce(e, t)) return $t(e, t, (u) => gt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const o = Fe(e), i = o ? [...o] : void 0;
    i && i.splice(a, 0, ...i.splice(s, 1));
    const l = be(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...ye(e),
      ...i ? { places: i } : {}
    };
  }
  return Q(e, t) ? X(e) ? kt(e, (s) => gt(s, t, n)) : { ...e, children: e.children.map((s) => gt(s, t, n)) } : e;
}
function Ft(e, t, n) {
  if (t === n) return e;
  if (W(e)) {
    if (!Q(e, t) && !Q(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => re(r) ? s(r) : Ft(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return X(e) ? kt(e, (s) => Ft(s, t, n)) : { ...e, children: e.children.map((s) => Ft(s, t, n)) };
}
function Pt(e, t, n, s, a) {
  if (s === "float" || !Q(e, t) || !Q(e, n)) return e;
  const r = et(e, t);
  if (s === "center" && r && Ce(r, n)) {
    if (a === void 0) return e;
    const i = r.panels.indexOf(t), l = a > i ? a - 1 : a;
    return l === i ? e : st(gt(e, t, l), t);
  }
  if (t === n) return e;
  const o = nt(e, t);
  return o ? ve(vt(o, t, n, s, a)) : e;
}
function Ks(e, t, n) {
  if (W(e)) {
    const a = e.panels[t];
    if (a === void 0 || re(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (X(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const r = [...e.frames];
    return r[t] = { ...a, node: n }, { ...e, frames: r };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function xt(e, t, n) {
  const s = Kt(e);
  if (!W(e) && s.some(({ node: a }) => W(a) && Ce(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!Q(a, t)) continue;
    const o = xt(a, t, n);
    return o ? Ks(e, r, o) : null;
  }
  return null;
}
function Ic(e, t, n) {
  const s = xt(
    e,
    t,
    (a) => je(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? ve(s) : e;
}
function Bs(e) {
  return X(e) ? [e] : Fe(e) || it(e) ? [e] : W(e) ? [...e.panels] : e.children.flatMap(Bs);
}
function qs(e, t) {
  if (W(e)) return e;
  const n = Sn(e).map(Bs), s = n.flat(), a = t && s.some((o) => Vt(o).includes(t)) ? t : void 0, r = ki(e, n);
  return ve({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...ye(e),
    ...r ? { places: r } : {}
  });
}
function ki(e, t) {
  const n = X(e) ? e.frames.map(({ node: s, ...a }) => a) : Fe(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Nc(e, t) {
  const n = xt(e, t, (s) => qs(s, t));
  return n ? ve(n) : e;
}
function Fn(e, t, n) {
  if (W(e) && Ce(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of Kt(e)) {
    if (!Q(s, t)) continue;
    const r = Fn(s, t, n);
    return r ? Ks(e, a, r) : null;
  }
  return null;
}
function ts(e, t, n) {
  const s = Fn(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = Fe(a);
    return {
      ...En(n, a.panels.map($n)),
      ...ye(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? ve(s) : e;
}
function on(e, t) {
  if (W(e)) return e;
  if (X(e)) {
    const a = e.frames.findIndex(
      (i) => W(i.node) && i.node.panels.includes(t)
    ), r = e.frames[a], o = r && W(r.node) ? r.node : null;
    if (r && o && o.panels.length > 1) {
      const i = Cn(o.panels.map($n), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return kt(e, (i) => on(i, t));
  }
  if (!Q(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = on(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function $i(e, t, n) {
  const s = et(e, t);
  if (!s || s.panels.length < 2) return e;
  if (me(e, t)?.node === s) {
    const o = on(e, t);
    return o === e ? e : ve(o);
  }
  const r = Fn(e, t, (o) => ({
    ...Mn(Ws(o.panels.map($n), Fe(o), n)),
    ...ye(o)
  }));
  return r ? ve(r) : e;
}
function Ws(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Cn(e, n).frames;
}
function Us(e, t) {
  return { ...Mn(Ws(e.children, Fe(e), t)), ...ye(e) };
}
function Oc(e, t, n) {
  const s = xt(
    e,
    t,
    (a) => X(a) ? a : Us(a, n)
  );
  return s ? ve(s) : W(e) && Ce(e, t) ? Cn([e], n) : e;
}
function xi(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function Hs(e, t) {
  const n = xi(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...ye(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Vc(e, t, n = "row") {
  const s = xt(
    e,
    t,
    (a) => X(a) ? Hs(a, n) : a
  );
  return s ? ve(s) : e;
}
function Bt(e) {
  return e.title ? e.title : W(e) ? "" : X(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function yt(e, t) {
  if (W(e)) {
    const s = e.panels[dt(e)];
    return s === void 0 ? "" : re(s) ? t(s) ?? s : Bt(s) || yt(s, t);
  }
  if (e.title) return e.title;
  if (X(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? yt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? yt(n, t) : "";
}
function ct(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (je(n)) n = n.children[s];
    else if (X(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || re(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function at(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (X(e)) {
    const l = e.frames[s];
    if (!l) return e;
    const u = at(l.node, a, n);
    if (u === l.node) return e;
    const f = [...e.frames];
    return f[s] = { ...l, node: u }, { ...e, frames: f };
  }
  if (W(e)) {
    const l = e.panels[s];
    if (l === void 0 || re(l)) return e;
    const u = at(l, a, n);
    if (u === l) return e;
    const f = [...e.panels];
    return f[s] = u, { ...e, panels: f };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = at(r, a, n);
  if (o === r) return e;
  const i = [...e.children];
  return i[s] = o, { ...e, children: i };
}
function Rt(e, t, n) {
  if (t.length === 0)
    return je(e) ? { ...e, sizes: zn(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (X(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const l = Rt(i.node, a, n);
    if (l === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: l }, { ...e, frames: u };
  }
  if (W(e)) {
    const i = e.panels[s];
    if (i === void 0 || re(i)) return e;
    const l = Rt(i, a, n);
    if (l === i) return e;
    const u = [...e.panels];
    return u[s] = l, { ...e, panels: u };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = [...e.children];
  return o[s] = Rt(r, a, n), { ...e, children: o };
}
function ns(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const o = a + r;
  if (o < s * 2) return e;
  const i = [...e], l = Math.min(Math.max(a + n, s), o - s);
  return i[t] = l, i[t + 1] = o - l, i;
}
function cn(e) {
  if (!W(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !re(t) ? e : { ...Pn([Mi(e)]), ...ye(e) };
}
const Mi = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ss(e) {
  return e.length === 0 ? null : Pn(e.map(Oe));
}
function Ci(e, t) {
  if (!e) return ss(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const l of De(e))
    !n.has(l) || s.has(l) ? a.add(l) : s.add(l);
  let r = e;
  for (const l of a)
    r = r ? nt(r, l) : null;
  const o = new Set(r ? De(r) : []), i = t.filter((l) => !o.has(l));
  if (i.length === 0) return r ? cn(ve(r)) : null;
  if (!r) return ss(i);
  if (X(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...i.map(
          (u, f) => xn(Oe(u), {
            x: ot.x + (l + f) * Ot,
            y: ot.y + (l + f) * Ot
          })
        )
      ]
    };
  }
  return cn(ve(Pn([r, ...i.map(Oe)])));
}
const Rn = Symbol("dc.windowContext");
function Ei(e) {
  return un(Rn, e), e;
}
function Tn() {
  const e = lt(Rn, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Pi = ["data-dc-glyph"], Si = { class: "dc-glyph__line" }, Ai = ["d"], zi = {
  key: 0,
  class: "dc-glyph__aqua"
}, Fi = ["d"], Ri = /* @__PURE__ */ le({
  __name: "WindowGlyph",
  props: {
    kind: {}
  },
  setup(e) {
    const t = {
      minimize: ["M2 5h6"],
      // Rolled up, the window is its own bar. A second square beside the maximize
      // one would be a riddle at this size; what unrolls is the body coming back
      // down, so that is the mark.
      unroll: ["M2.4 4l2.6 2.6L7.6 4"],
      maximize: ["M2.5 2.5h5v5h-5z"],
      // The near square, with the one it came from behind it.
      restore: ["M2 4.5h3.5V8H2z", "M4 4.5V2h4v4H5.5"],
      close: ["M2.4 2.4l5.2 5.2", "M7.6 2.4l-5.2 5.2"]
    }, n = {
      minimize: ["M2.2 4.3h5.6v1.4H2.2z"],
      unroll: ["M2.2 4.3h5.6v1.4H2.2z"],
      maximize: ["M8.4 1.6v4.2l-4.2-4.2z", "M1.6 8.4v-4.2l4.2 4.2z"],
      restore: ["M5 5h4.2L5 0.8z", "M5 5H0.8L5 9.2z"]
    };
    return (s, a) => (m(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      p("g", Si, [
        (m(!0), h(te, null, ue(t[e.kind], (r) => (m(), h("path", {
          key: r,
          d: r
        }, null, 8, Ai))), 128))
      ]),
      n[e.kind] ? (m(), h("g", zi, [
        (m(!0), h(te, null, ue(n[e.kind], (r) => (m(), h("path", {
          key: r,
          d: r
        }, null, 8, Fi))), 128))
      ])) : V("", !0)
    ], 8, Pi));
  }
}), rt = /* @__PURE__ */ oe(Ri, [["__scopeId", "data-v-4d2872c0"]]), Ti = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Li = ["data-dc-movable"], Di = { class: "dc-float__title dc-truncate" }, Ii = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Ni = ["aria-label", "aria-pressed", "data-dc-minimize"], Oi = ["aria-label", "aria-pressed", "data-dc-maximize"], Vi = ["aria-label", "data-dc-close"], Ki = { class: "dc-float__content" }, Bi = ["data-dc-handle", "onPointerdown"], qi = /* @__PURE__ */ le({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Tn(), s = _(() => be(t.frame.node)), a = _(() => n.panelFor(s.value)?.fixed === !0), r = _(() => Ne(t.frame)), o = _(() => He(t.frame)), i = _(() => r.value || o.value), l = _(() => n.resizable.value && !a.value && !i.value), u = _(() => n.movable.value && !a.value && !i.value), f = _(() => {
      const I = De(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), E = _(() => f.value !== null && n.closable(f.value)), w = _(() => t.frame.node.headless === !0), g = _(
      () => !w.value && (!W(t.frame.node) || o.value)
    ), $ = _(
      () => t.frame.title || Bt(t.frame.node) || yt(t.frame.node, (I) => n.panelFor(I)?.title)
    ), y = _(() => n.spaceMenu(t.path));
    function x(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function A(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const R = _(() => {
      const I = n.framing.value;
      return I !== null && Q(t.frame.node, I);
    }), q = _(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${an}px`,
        height: `${Ds}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), D = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (I, F) => (m(), h("div", {
      class: "dc-float",
      style: ze(q.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": R.value ? "true" : "false",
      onPointerdown: F[3] || (F[3] = (k) => C(n).raiseAt(e.path))
    }, [
      g.value ? (m(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: x,
        onDblclick: A
      }, [
        p("span", Di, M($.value), 1),
        y.value.length ? (m(), ge(kn, {
          key: 0,
          items: y.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : V("", !0),
        !a.value || o.value && E.value && f.value ? (m(), h("div", Ii, [
          a.value ? V("", !0) : (m(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${$.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: F[0] || (F[0] = (k) => C(n).toggleMinimizeAt(e.path))
          }, [
            ce(rt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Ni)),
          a.value ? V("", !0) : (m(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${$.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: F[1] || (F[1] = (k) => C(n).toggleMaximizeAt(e.path))
          }, [
            ce(rt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Oi)),
          o.value && E.value && f.value ? (m(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": f.value,
            onClick: F[2] || (F[2] = (k) => C(n).close(f.value))
          }, [
            ce(rt, { kind: "close" })
          ], 8, Vi)) : V("", !0)
        ])) : V("", !0)
      ], 40, Li)) : V("", !0),
      p("div", Ki, [
        Xe(I.$slots, "default", {}, void 0, !0)
      ]),
      (m(!0), h(te, null, ue(l.value ? D : [], (k) => (m(), h("span", {
        key: k,
        class: "dc-float__grip",
        "data-dc-handle": k,
        "aria-hidden": "true",
        onPointerdown: Se((z) => C(n).beginFrameDragAt(e.path, z, k), ["stop"])
      }, null, 40, Bi))), 128))
    ], 44, Ti));
  }
}), Wi = /* @__PURE__ */ oe(qi, [["__scopeId", "data-v-f035684c"]]), Ln = Symbol("dc.paneContext");
function Ui(e) {
  return un(Ln, e), e;
}
function Kc() {
  return lt(Ln, null);
}
function Bc(e) {
  const t = lt(Rn, null), n = lt(Ln, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => pt(e)
  );
  return va() && ma(s), s;
}
const Hi = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Xi = ["data-dc-movable"], Gi = ["aria-label", "aria-pressed"], Yi = ["data-dc-space-name"], ji = { class: "dc-truncate" }, Qi = ["aria-label"], Zi = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Ji = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], ec = { class: "dc-tab__name dc-truncate" }, tc = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, nc = ["aria-label", "data-dc-close", "onClick"], sc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ac = { class: "dc-pane__tools" }, rc = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, lc = ["aria-label", "data-dc-minimize"], oc = ["aria-label", "aria-pressed", "data-dc-maximize"], ic = ["aria-label", "data-dc-close"], cc = ["id", "role", "aria-labelledby"], uc = ["id", "role", "aria-labelledby"], dc = ["data-dc-edge"], fc = /* @__PURE__ */ le({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Tn(), s = rs() ?? "dc-pane", a = _(
      () => t.group.panels.flatMap((T, O) => {
        if (!re(T)) {
          const we = Bt(T) || yt(T, (he) => n.panelFor(he)?.title);
          return [{ kind: "space", index: O, id: `space-${O}`, title: we, node: T }];
        }
        const U = n.panelFor(T);
        return U ? [{ kind: "panel", index: O, id: T, title: U.title, panel: U }] : [];
      })
    ), r = _(() => a.value.length > 1), o = _(() => {
      const T = dt(t.group);
      return a.value.find((O) => O.index === T) ?? a.value[0] ?? null;
    }), i = _(() => o.value?.kind === "space" ? o.value.node : null), l = _(() => i.value ? "" : Is(t.group)), u = _(() => i.value ? null : n.panelFor(l.value)), f = _(() => o.value?.title ?? ""), E = _(() => n.spaceNames.value ? t.group.title ?? "" : ""), w = _(() => [...t.path, o.value?.index ?? 0]), g = _(() => l.value || Qn(t.group)[0] || ""), $ = _(() => n.viewFor(l.value)), y = _(() => t.group.headless === !0), x = _(() => n.focused.value === l.value), A = _(() => n.dragging.value === l.value), R = _(() => n.moving.value === l.value), q = _(() => n.frameOf(g.value) !== null), D = _(() => n.panelFor(g.value)?.fixed === !0), I = _(
      () => !i.value && (n.canMove(l.value) || q.value && n.movable.value && !D.value)
    ), F = _(
      () => i.value ? n.spaceMenu(w.value) : n.menuFor(l.value)
    ), k = (T) => n.closable(T);
    Ui({ panel: l });
    const z = _(() => n.maximized(g.value)), G = _(
      () => q.value && !D.value || !r.value && !!u.value && k(u.value.id)
    ), j = (T) => `${s}-tab-${T}`, de = _(() => `${s}-body`), Z = _(() => {
      const T = n.dropTarget.value;
      return !T || !Ce(t.group, T.panel) || T.edge === "float" ? null : T;
    }), L = _(() => Z.value?.index === void 0 ? Z.value?.edge ?? null : null), K = _(() => Z.value?.index ?? null), ae = () => u.value ? n.renderContent(u.value, $.value, x.value) ?? null : null, J = () => u.value ? n.renderActions(u.value, $.value, x.value) ?? null : null;
    let se = null;
    function ke(T) {
      const O = se !== null && Math.hypot(T.clientX - se.x, T.clientY - se.y) >= 4;
      return se = null, O;
    }
    const xe = (T) => T.kind === "panel" ? T.id : be(T.node);
    function Ke(T, O) {
      O.kind !== "space" && (n.focus(O.id), se = { x: T.clientX, y: T.clientY }, n.beginDrag(O.id, T));
    }
    function Qe(T, O) {
      if (ke(T)) return;
      const U = xe(O);
      U && n.selectPanel(U);
    }
    function Pe(T) {
      l.value && n.focus(l.value), !T.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (q.value ? n.beginFrameDrag(g.value, T, "move") : n.beginDrag(l.value, T));
    }
    function Be(T) {
      se = { x: T.clientX, y: T.clientY }, n.beginDrag(l.value, T);
    }
    function Me(T) {
      ke(T) || n.toggleMoveMode(l.value);
    }
    const qe = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Mt(T) {
      if (!R.value) return;
      if (T.key === "Escape") {
        T.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const O = qe[T.key];
      O && (T.preventDefault(), q.value ? n.nudgeFrame(l.value, O, T.shiftKey) : n.nudge(l.value, O, T.shiftKey));
    }
    function qt(T) {
      !q.value || T.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(g.value);
    }
    function Wt(T, O) {
      T.stopPropagation(), se = null, n.close(O);
    }
    function Ut(T, O) {
      const U = a.value.length;
      let we = null;
      if (T.key === "ArrowRight" ? we = (O + 1) % U : T.key === "ArrowLeft" ? we = (O - 1 + U) % U : T.key === "Home" ? we = 0 : T.key === "End" && (we = U - 1), we === null) return;
      T.preventDefault();
      const he = a.value[we];
      if (!he) return;
      const Ct = xe(he);
      Ct && n.selectPanel(Ct);
    }
    return (T, O) => o.value ? (m(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": C(Qn)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": q.value ? "true" : "false",
      "data-dc-maximized": z.value ? "true" : "false",
      "data-dc-headless": y.value ? "true" : "false",
      "data-dc-active": x.value ? "true" : "false",
      "data-dc-dragging": A.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: O[7] || (O[7] = (U) => l.value && C(n).focus(l.value))
    }, [
      y.value ? V("", !0) : (m(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": I.value ? "true" : "false",
        onPointerdown: Pe,
        onDblclick: qt
      }, [
        I.value ? (m(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": R.value,
          onPointerdown: Be,
          onClick: Me,
          onKeydown: Mt
        }, [...O[8] || (O[8] = [
          p("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Gi)) : V("", !0),
        E.value ? (m(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": E.value
        }, [
          p("span", ji, M(E.value), 1)
        ], 8, Yi)) : V("", !0),
        p("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (m(!0), h(te, null, ue(a.value, (U, we) => (m(), h(te, {
            key: U.id
          }, [
            K.value === we ? (m(), h("span", Zi)) : V("", !0),
            p("button", {
              id: j(U.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": U.kind === "panel" ? U.id : void 0,
              "data-dc-space": U.kind === "space" ? U.title : void 0,
              "aria-selected": U.index === o.value.index,
              "aria-controls": de.value,
              tabindex: U.index === o.value.index ? 0 : -1,
              onPointerdown: (he) => Ke(he, U),
              onClick: (he) => Qe(he, U),
              onKeydown: (he) => Ut(he, we)
            }, [
              p("span", ec, M(U.title), 1),
              U.kind === "panel" && U.panel.subtitle ? (m(), h("span", tc, M(U.panel.subtitle), 1)) : V("", !0),
              r.value && U.kind === "panel" && k(U.id) ? (m(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${U.title}`,
                "data-dc-close": U.id,
                onPointerdown: O[0] || (O[0] = Se(() => {
                }, ["stop"])),
                onClick: (he) => Wt(he, U.id)
              }, [...O[9] || (O[9] = [
                p("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, nc)) : V("", !0)
            ], 40, Ji)
          ], 64))), 128)),
          K.value === a.value.length ? (m(), h("span", sc)) : V("", !0)
        ], 8, Qi),
        p("div", ac, [
          ce(J),
          F.value.length ? (m(), ge(kn, {
            key: 0,
            items: F.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : V("", !0)
        ]),
        G.value ? (m(), h("div", rc, [
          q.value && !D.value ? (m(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": g.value,
            onPointerdown: O[1] || (O[1] = Se(() => {
            }, ["stop"])),
            onClick: O[2] || (O[2] = (U) => C(n).toggleMinimize(g.value))
          }, [
            ce(rt, { kind: "minimize" })
          ], 40, lc)) : V("", !0),
          q.value && !D.value ? (m(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${z.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": z.value,
            "data-dc-maximize": g.value,
            onPointerdown: O[3] || (O[3] = Se(() => {
            }, ["stop"])),
            onClick: O[4] || (O[4] = (U) => C(n).toggleMaximize(g.value))
          }, [
            ce(rt, {
              kind: z.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, oc)) : V("", !0),
          !r.value && u.value && k(u.value.id) ? (m(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: O[5] || (O[5] = Se(() => {
            }, ["stop"])),
            onClick: O[6] || (O[6] = (U) => C(n).close(u.value.id))
          }, [
            ce(rt, { kind: "close" })
          ], 40, ic)) : V("", !0)
        ])) : V("", !0)
      ], 40, Xi)),
      i.value ? (m(), h("div", {
        key: 1,
        id: de.value,
        class: "dc-pane__space",
        role: y.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value ? void 0 : j(o.value.id)
      }, [
        Xe(T.$slots, "space", {
          node: i.value,
          path: w.value
        }, void 0, !0)
      ], 8, cc)) : (m(), h("div", {
        key: 2,
        id: de.value,
        class: "dc-pane__body",
        role: y.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value ? void 0 : j(l.value)
      }, [
        ce(ae)
      ], 8, uc)),
      L.value ? (m(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": L.value,
        "aria-hidden": "true"
      }, null, 8, dc)) : V("", !0)
    ], 40, Hi)) : V("", !0);
  }
}), Xs = /* @__PURE__ */ oe(fc, [["__scopeId", "data-v-44fd2b2d"]]), pc = ["data-dc-space", "data-dc-path", "aria-label"], vc = {
  key: 0,
  class: "dc-space__head"
}, mc = { class: "dc-space__title dc-truncate" }, hc = ["data-dc-direction"], _c = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], gc = /* @__PURE__ */ le({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Tn(), s = B(null), a = _(() => W(t.node) ? t.node : null), r = _(() => je(t.node) ? t.node : null), o = _(() => X(t.node) ? t.node : null), i = _(
      () => r.value ? r.value.children : o.value?.frames.map((L) => L.node) ?? []
    ), l = _(() => r.value ? Ye(r.value) : []), u = _(
      () => (o.value?.frames ?? []).map((L, K) => ({
        held: L,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: K,
        key: I(L.node),
        path: [...t.path, K]
      })).sort((L, K) => L.key < K.key ? -1 : L.key > K.key ? 1 : 0)
    ), f = _(() => Bt(t.node)), E = _(() => n.spaceMenu(t.path)), w = _(() => t.node.headless === !0), g = _(() => o.value ? "desktop" : r.value?.direction ?? ""), $ = B(null), y = B(0);
    let x = null;
    Ee(
      $,
      (L) => {
        x?.disconnect(), x = null, !(!L || typeof ResizeObserver > "u") && (y.value = L.clientWidth, x = new ResizeObserver(([K]) => {
          y.value = K?.contentRect.width ?? 0;
        }), x.observe(L));
      },
      { immediate: !0 }
    ), Ve(() => x?.disconnect());
    const A = _(() => {
      const L = Math.max(
        1,
        Math.floor((y.value + Ze) / (an + Ze))
      ), K = /* @__PURE__ */ new Map();
      let ae = 0;
      for (const J of u.value)
        J.held.minimized === !0 && (K.set(J.key, {
          x: Ze + ae % L * (an + Ze),
          bottom: Ze + Math.floor(ae / L) * (Ds + Ze)
        }), ae += 1);
      return K;
    }), R = _(() => {
      const L = n.dropTarget.value, K = o.value;
      if (!K || !L?.rect || L.edge !== "float") return null;
      const ae = me(K, L.panel);
      return ae && K.frames.includes(ae) ? L.rect : null;
    }), q = _(() => r.value?.direction === "row"), D = _(() => i.value.map((L, K) => [...t.path, K])), I = (L) => [...De(L)].sort().join("/"), F = (L) => {
      const K = De(L)[0];
      return (K ? n.panelFor(K)?.title : null) ?? K ?? "panel";
    }, k = (L) => {
      const K = i.value[L], ae = i.value[L + 1];
      return !K || !ae ? "Resize panels" : `Resize ${F(K)} and ${F(ae)}`;
    }, z = (L) => {
      const K = l.value[L] ?? 0, ae = l.value[L + 1] ?? 0, J = K + ae;
      return J > 0 ? Math.round(K / J * 100) : 50;
    };
    function G() {
      const L = s.value, K = L ? q.value ? L.clientWidth : L.clientHeight : 0;
      return K <= 0 ? 0.05 : Math.min(n.minPanelSize.value / K, 0.4);
    }
    let j = null;
    function de(L, K) {
      const ae = r.value, J = s.value;
      if (!n.resizable.value || !ae || !J || L.button !== 0) return;
      const se = q.value ? J.clientWidth : J.clientHeight;
      if (se <= 0) return;
      const ke = q.value ? L.clientX : L.clientY, xe = Ye(ae), Ke = Math.min(n.minPanelSize.value / se, 0.4);
      L.preventDefault();
      const Qe = (Me) => {
        const qe = ((q.value ? Me.clientX : Me.clientY) - ke) / se;
        n.setSizes(t.path, ns(xe, K, qe, Ke));
      }, Pe = () => j?.(), Be = (Me) => {
        Me.key === "Escape" && (n.setSizes(t.path, xe), j?.());
      };
      j = () => {
        window.removeEventListener("pointermove", Qe), window.removeEventListener("pointerup", Pe), window.removeEventListener("pointercancel", Pe), window.removeEventListener("keydown", Be), j = null;
      }, window.addEventListener("pointermove", Qe), window.addEventListener("pointerup", Pe), window.addEventListener("pointercancel", Pe), window.addEventListener("keydown", Be);
    }
    Ve(() => j?.());
    function Z(L, K) {
      const ae = r.value;
      if (!n.resizable.value || !ae) return;
      const J = q.value ? "ArrowRight" : "ArrowDown", se = q.value ? "ArrowLeft" : "ArrowUp", ke = L.shiftKey ? 0.1 : 0.02;
      if (L.key !== J && L.key !== se) return;
      const xe = L.key === J ? ke : -ke;
      L.preventDefault(), n.setSizes(t.path, ns(Ye(ae), K, xe, G()));
    }
    return (L, K) => {
      const ae = ls("WindowNode", !0);
      return a.value ? (m(), ge(Xs, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: Dt(({ node: J, path: se }) => [
          ce(ae, {
            node: J,
            path: se,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (m(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": g.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !w.value ? (m(), h("header", vc, [
          p("span", mc, M(f.value), 1),
          E.value.length ? (m(), ge(kn, {
            key: 0,
            items: E.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : V("", !0)
        ])) : V("", !0),
        o.value ? (m(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          R.value ? (m(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: ze({
              left: `${R.value.x}px`,
              top: `${R.value.y}px`,
              width: `${R.value.w}px`,
              height: `${R.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          (m(!0), h(te, null, ue(u.value, (J) => (m(), ge(Wi, {
            key: J.key,
            frame: J.held,
            path: J.path,
            order: J.order,
            place: A.value.get(J.key) ?? null
          }, {
            default: Dt(() => [
              ce(ae, {
                node: J.held.node,
                path: J.path,
                framed: J.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (m(), h("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          (m(!0), h(te, null, ue(i.value, (J, se) => (m(), h(te, {
            key: I(J)
          }, [
            p("div", {
              class: "dc-window__cell",
              style: ze({ flexGrow: l.value[se] ?? 1 })
            }, [
              ce(ae, {
                node: J,
                path: D.value[se] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            se < i.value.length - 1 ? (m(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": q.value ? "vertical" : "horizontal",
              "aria-label": k(se),
              "aria-valuenow": z(se),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": C(n).resizable.value ? void 0 : "true",
              tabindex: C(n).resizable.value ? 0 : -1,
              onPointerdown: (ke) => de(ke, se),
              onKeydown: (ke) => Z(ke, se)
            }, null, 40, _c)) : V("", !0)
          ], 64))), 128))
        ], 8, hc)) : V("", !0)
      ], 8, pc));
    };
  }
}), yc = /* @__PURE__ */ oe(gc, [["__scopeId", "data-v-75dfd4c3"]]), wc = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], bc = {
  key: 1,
  class: "dc-window__empty"
}, kc = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, St = 16, $c = /* @__PURE__ */ le({
  __name: "WindowFrame",
  props: /* @__PURE__ */ It({
    panels: {},
    movable: { type: Boolean, default: !1 },
    resizable: { type: Boolean, default: !0 },
    minPanelSize: { default: 120 },
    closable: { type: Boolean, default: !1 },
    menu: { type: Boolean, default: !0 },
    spaceNames: { type: Boolean, default: !0 },
    paneMenu: {},
    accent: {},
    tokens: {},
    theme: { default: "minimal" }
  }, {
    layout: { default: null },
    layoutModifiers: {},
    views: { default: () => ({}) },
    viewsModifiers: {}
  }),
  emits: /* @__PURE__ */ It(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Lt(e, "layout"), o = Lt(e, "views"), i = dn(), l = _(() => new Map(s.panels.map((c) => [c.id, c]))), u = _(() => s.panels.map((c) => c.id)), f = _(() => Ci(r.value, u.value)), E = B(null), w = B(null), g = B(null), $ = B(!0), y = B(null), x = B(null), A = B(null), R = B(""), q = B(null);
    function D() {
      const c = q.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function I(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function F() {
      return D().map((c) => ({ pane: c, order: I(c.element) })).sort((c, d) => {
        const v = Math.max(c.order.length, d.order.length);
        for (let b = 0; b < v; b += 1) {
          const S = (c.order[b] ?? -1) - (d.order[b] ?? -1);
          if (S !== 0) return S;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const k = (c) => D().find((d) => d.panels.includes(c)) ?? null;
    function z(c) {
      const d = l.value.get(c);
      if (!d) return "";
      const v = o.value[c];
      return v && d.views?.some((b) => b.key === v) ? v : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function G(c, d) {
      o.value = { ...o.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const j = _(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function de(c) {
      return !s.movable || j.value < 1 || s.panels.length < 2 ? !1 : l.value.get(c)?.fixed !== !0;
    }
    function Z(c, d) {
      const v = f.value;
      !c || !v || c === v || (r.value = c, d && a("panel-move", d));
    }
    function L(c, d, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const b = (d - c.left) / c.width, S = (v - c.top) / c.height, P = 0.3;
      return b > P && b < 1 - P && S > P && S < 1 - P ? "center" : [
        { edge: "left", distance: b },
        { edge: "right", distance: 1 - b },
        { edge: "top", distance: S },
        { edge: "bottom", distance: 1 - S }
      ].reduce(
        (N, Y) => Y.distance < N.distance ? Y : N
      ).edge;
    }
    function K(c, d) {
      const v = [...c.querySelectorAll(".dc-tab")], b = v.findIndex((S) => {
        const P = S.getBoundingClientRect();
        return d < P.left + P.width / 2;
      });
      return b === -1 ? v.length : b;
    }
    function ae(c, d, v) {
      for (const { panels: b, element: S } of F().reverse()) {
        const P = S.getBoundingClientRect();
        if (c < P.left || c > P.right || d < P.top || d > P.bottom) continue;
        const ee = b.find((ne) => ne !== v), N = S.querySelector(".dc-pane__tabs"), Y = N?.getBoundingClientRect();
        if (N && Y && d >= Y.top && d <= Y.bottom)
          return ee ? { panel: ee, edge: "center", index: K(N, c) } : null;
        const H = S.querySelector(":scope > .dc-pane__space");
        if (H) {
          const ne = H.getBoundingClientRect();
          if (c >= ne.left && c <= ne.right && d >= ne.top && d <= ne.bottom) continue;
        }
        return ee ? { panel: ee, edge: L(P, c, d) } : null;
      }
      return se(c, d, v);
    }
    function J() {
      const c = q.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function se(c, d, v) {
      const b = f.value;
      if (!b) return null;
      for (const S of J()) {
        const P = S.getBoundingClientRect();
        if (c < P.left || c > P.right || d < P.top || d > P.bottom) continue;
        const ee = ke(S).flatMap((H) => H.panels).find((H) => H !== v);
        if (!ee) return null;
        const N = me(b, v)?.rect, Y = jt(
          {
            x: c - P.left - 24,
            y: d - P.top - 12,
            w: N?.w ?? ot.w,
            h: N?.h ?? ot.h
          },
          { w: S.clientWidth, h: S.clientHeight },
          s.minPanelSize
        );
        return { panel: ee, edge: "float", rect: Y };
      }
      return null;
    }
    function ke(c) {
      return D().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let xe = null;
    const Ke = (c) => c.altKey;
    function Qe(c, d) {
      if (!de(c) || w.value || x.value || d.button !== 0) return;
      const v = d.clientX, b = d.clientY;
      let S = !1, P = Ke(d);
      const ee = () => {
        const fe = A.value;
        fe && (g.value = P ? se(fe.x, fe.y, c) : ae(fe.x, fe.y, c));
      }, N = (fe) => {
        if (!S) {
          if (Math.hypot(fe.clientX - v, fe.clientY - b) < 4) return;
          S = !0, w.value = c, y.value = null;
        }
        P = Ke(fe), $.value = !P, A.value = { x: fe.clientX, y: fe.clientY }, ee();
      }, Y = (fe) => {
        Ke(fe) !== P && (P = !P, $.value = !P, S && ee());
      }, H = (fe) => {
        xe?.();
        const pe = g.value, We = f.value;
        if (fe && S && pe && We) {
          const Et = pe.edge === "float" && pe.rect ? es(We, c, pe.panel, pe.rect) : Pt(We, c, pe.panel, pe.edge, pe.index);
          Z(Et, {
            panel: c,
            target: pe.panel,
            edge: pe.edge,
            ...pe.index === void 0 ? {} : { index: pe.index },
            ...pe.rect === void 0 ? {} : { rect: pe.rect }
          });
        }
        w.value = null, g.value = null, A.value = null, $.value = !0;
      }, ne = () => H(!0), ie = () => H(!1), _e = (fe) => {
        if (fe.key === "Escape") {
          H(!1);
          return;
        }
        Y(fe);
      };
      xe = () => {
        window.removeEventListener("pointermove", N), window.removeEventListener("pointerup", ne), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", _e), window.removeEventListener("keyup", Y), xe = null;
      }, window.addEventListener("pointermove", N), window.addEventListener("pointerup", ne), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", _e), window.addEventListener("keyup", Y);
    }
    Ve(() => xe?.());
    let Pe = null;
    function Be(c) {
      const d = q.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((S) => S.closest(".dc-window") === d)?.parentElement ?? null : null;
    }
    function Me(c) {
      const d = f.value;
      return d ? ln(d, c) : null;
    }
    function qe(c) {
      const d = f.value;
      if (!d) return;
      const v = _t(d, c);
      v !== d && (r.value = v);
    }
    function Mt(c) {
      const d = Me(c);
      d && qe(d);
    }
    function qt(c) {
      const d = f.value, v = d ? me(d, c) : null;
      return v !== null && Ne(v);
    }
    function Wt(c) {
      const d = f.value, v = d ? me(d, c) : null;
      return v !== null && He(v);
    }
    function Ut(c) {
      const d = f.value, v = d ? Ue(d, c) : null;
      return v ? be(v.node) : "";
    }
    function T(c) {
      const d = f.value, v = d ? Ue(d, c) : null;
      if (!d || !v) return;
      const b = be(v.node);
      if (l.value.get(b)?.fixed === !0) return;
      const S = !He(v);
      let P = gi(d, c, S);
      P !== d && (S || (P = _t(P, c)), r.value = P, a("frame-minimize", { panel: b, minimized: S }));
    }
    function O(c) {
      const d = Me(c);
      d && T(d);
    }
    function U(c) {
      const d = f.value, v = d ? Ue(d, c) : null;
      if (!d || !v) return;
      const b = be(v.node);
      if (l.value.get(b)?.fixed === !0) return;
      const S = !Ne(v);
      let P = _i(d, c, S);
      P !== d && (S && (P = _t(P, c)), r.value = P, a("frame-maximize", { panel: b, maximized: S }));
    }
    function we(c) {
      const d = Me(c);
      d && U(d);
    }
    function he(c, d, v) {
      const b = f.value, S = b ? Ue(b, c) : null;
      if (!b || !S || d.button !== 0 || w.value || x.value) return;
      const P = be(S.node);
      if (l.value.get(P)?.fixed === !0 || Ne(S) || He(S) || (v === "move" ? !s.movable : !s.resizable)) return;
      const ee = Be(c), N = yi(b, c);
      qe(c);
      const Y = { w: ee?.clientWidth ?? 0, h: ee?.clientHeight ?? 0 }, H = { ...S.rect }, ne = d.clientX, ie = d.clientY, _e = s.minPanelSize;
      x.value = P;
      const fe = (Re) => {
        const Te = f.value;
        if (!Te) return;
        const ft = Jn(Te, N, jt(Re, Y, _e));
        ft !== Te && (r.value = ft);
      }, pe = (Re) => {
        Re.preventDefault();
        const Te = Re.clientX - ne, ft = Re.clientY - ie;
        fe(
          v === "move" ? { ...H, x: H.x + Te, y: H.y + ft } : Zn(H, v, Te, ft, _e)
        );
      }, We = (Re) => {
        if (Pe?.(), x.value = null, !Re) {
          fe(H);
          return;
        }
        const Te = f.value ? Ue(f.value, N) : null;
        Te && a("frame-change", { panel: Ut(N), rect: Te.rect });
      }, Et = () => We(!0), Bn = () => We(!1), qn = (Re) => {
        Re.key === "Escape" && We(!1);
      };
      Pe = () => {
        window.removeEventListener("pointermove", pe), window.removeEventListener("pointerup", Et), window.removeEventListener("pointercancel", Bn), window.removeEventListener("keydown", qn), Pe = null;
      }, window.addEventListener("pointermove", pe), window.addEventListener("pointerup", Et), window.addEventListener("pointercancel", Bn), window.addEventListener("keydown", qn);
    }
    function Ct(c, d, v) {
      const b = Me(c);
      b && he(b, d, v);
    }
    function Gs(c, d, v = !1) {
      const b = f.value, S = Me(c), P = b && S ? Ue(b, S) : null;
      if (!b || !S || !P || l.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Ne(P) || He(P)) {
        R.value = `${Ae(c)} is ${Ne(P) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ee = d === "left" ? -St : d === "right" ? St : 0, N = d === "up" ? -St : d === "down" ? St : 0, Y = Be(S), H = { w: Y?.clientWidth ?? 0, h: Y?.clientHeight ?? 0 }, ne = v ? Zn(P.rect, "se", ee, N, s.minPanelSize) : { ...P.rect, x: P.rect.x + ee, y: P.rect.y + N }, ie = Jn(b, S, jt(ne, H, s.minPanelSize));
      if (ie === b) {
        R.value = v ? `${Ae(c)} cannot be resized further.` : `${Ae(c)} cannot move ${d}.`;
        return;
      }
      r.value = ie;
      const _e = Ue(ie, S);
      _e && (a("frame-change", { panel: c, rect: _e.rect }), R.value = v ? `${Ae(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${Ae(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    Ve(() => Pe?.());
    function Ys(c, d) {
      const v = k(c), b = v?.element.getBoundingClientRect();
      if (!v || !b) return null;
      const S = d === "left" || d === "right";
      let P = null;
      for (const ee of D()) {
        if (ee === v || ee.element === v.element) continue;
        const N = ee.element.getBoundingClientRect();
        if (!(S ? N.bottom > b.top + 1 && N.top < b.bottom - 1 : N.right > b.left + 1 && N.left < b.right - 1)) continue;
        const H = d === "left" ? b.left - N.right : d === "right" ? N.left - b.right : d === "up" ? b.top - N.bottom : N.top - b.bottom;
        if (H < -1) continue;
        const ne = ee.panels.find((ie) => ie !== c);
        ne && (!P || H < P.distance) && (P = { id: ne, distance: H });
      }
      return P?.id ?? null;
    }
    function js(c) {
      const d = f.value ? me(f.value, c) !== null : !1;
      if (!d && !de(c)) return;
      y.value = y.value === c ? null : c;
      const v = Ae(c);
      if (!y.value) {
        R.value = `${v}: move mode off.`;
        return;
      }
      R.value = d ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ae = (c) => l.value.get(c)?.title ?? c, Qs = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Zs(c, d, v = !1) {
      if (!de(c)) return;
      const b = f.value;
      if (!b) return;
      const S = Ae(c), P = et(b, c);
      if (!v && P && (d === "left" || d === "right") && P.panels.length > 1) {
        const ne = P.panels.indexOf(c), ie = d === "left" ? ne - 1 : ne + 1;
        if (ie >= 0 && ie < P.panels.length) {
          Z(gt(b, c, ie), { panel: c, target: c, edge: "center", index: ie }), R.value = `${S} moved ${d}, now tab ${ie + 1} of ${P.panels.length}.`, Dn(c);
          return;
        }
      }
      const N = Ys(c, d);
      if (!N || !de(N)) {
        R.value = `${S} cannot move ${d}.`;
        return;
      }
      const Y = Qs[d], H = P?.panels.length === 1 && et(b, N)?.panels.length === 1;
      v ? (Z(Pt(b, c, N, "center"), {
        panel: c,
        target: N,
        edge: "center"
      }), R.value = `${S} joined ${Ae(N)} as a tab.`) : H ? (Z(Ft(b, c, N), { panel: c, target: N, edge: Y }), R.value = `${S} moved ${d}, trading places with ${Ae(N)}.`) : (Z(Pt(b, c, N, Y), { panel: c, target: N, edge: Y }), R.value = `${S} moved ${d}, beside ${Ae(N)}.`), Dn(c);
    }
    function Dn(c) {
      wt(() => {
        k(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Js(c, d) {
      const v = f.value;
      v && (r.value = Rt(v, c, d));
    }
    function Ht(c) {
      const d = f.value;
      if (!d) return;
      const v = st(d, c);
      v !== d && (r.value = v, a("tab-select", { panel: c }));
    }
    function In(c) {
      return l.value.get(c)?.closable ?? s.closable;
    }
    function ea(c) {
      In(c) && a("panel-close", c);
    }
    const Xt = B(/* @__PURE__ */ new Map());
    let ta = 0;
    function na(c, d) {
      const v = ta += 1;
      return Xt.value.set(v, { panel: c, items: d }), () => {
        Xt.value.delete(v);
      };
    }
    function sa(c) {
      const d = [];
      for (const v of Xt.value.values())
        v.panel() === c && d.push(...v.items());
      return d;
    }
    function Nn(c) {
      const d = c.filter((v) => v.items.length > 0);
      return d.length < 2 ? d.flatMap((v) => v.items) : d.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const On = (c) => c.title || "These tabs";
    function aa(c, d) {
      const v = d.id, b = et(c, v), S = (b?.panels.length ?? 0) > 1, P = b?.fixedView === !0, ee = (ne) => ({
        disabled: ne === c,
        action: () => {
          ne !== c && (r.value = ne);
        }
      }), N = [], Y = [], H = d.views ?? [];
      if (H.length > 1 && !P) {
        const ne = z(v);
        N.push({
          id: "view",
          label: "View",
          items: H.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === ne,
            action: () => G(v, ie.key)
          }))
        });
      }
      return S && !P && Y.push(
        { id: "show-row", label: "Row", checked: !1, ...ee(ts(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ee(ts(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs.
        { id: "show-tabs", label: "Tabs", checked: !0, disabled: !0 },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ee($i(c, v))
        }
      ), S && b && (Y.length && Y.push({ separator: !0 }), Y.push(...Vn(b, v))), { panel: N, tabs: Y, tabsTitle: b ? On(b) : "" };
    }
    function Vn(c, d) {
      const v = dt(c), b = (S) => {
        const P = c.panels[(v + S + c.panels.length) % c.panels.length];
        return (P === void 0 ? "" : be(P)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Ht(b(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Ht(b(-1)) }
      ];
    }
    function ra(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const v = ct(d, c);
      if (!v || W(v)) return [];
      if (v.fixedView) return [];
      const b = X(v) ? "desktop" : v.direction, S = je(v) && v.children.length === 1, P = (H, ne, ie) => b === H || S && H !== "desktop" ? { id: `show-${H}`, label: ne, checked: b === H, disabled: !0 } : {
        id: `show-${H}`,
        label: ne,
        checked: !1,
        action: () => {
          const _e = f.value;
          _e && (r.value = cn(ve(at(_e, c, ie()))));
        }
      }, ee = (H) => () => X(v) ? Hs(v, H) : { ...v, direction: H }, N = c.length > 0 ? ct(d, c.slice(0, -1)) : null, Y = N && W(N) && N.panels.length > 1 ? N : null;
      return Nn([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            P("row", "Row", ee("row")),
            P("column", "Column", ee("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            P("tabs", "Tabs", () => qs(v, la(v))),
            P("desktop", "Desktop", () => X(v) ? v : Us(v))
          ]
        },
        {
          id: "about-tabs",
          title: Y ? On(Y) : "",
          items: Y ? Vn(Y, be(v)) : []
        }
      ]);
    }
    function la(c) {
      const d = E.value;
      return d && Q(c, d) ? d : void 0;
    }
    function oa(c) {
      const d = f.value, v = l.value.get(c);
      if (!d || !v) return [];
      const b = s.menu ? aa(d, v) : null, S = sa(c);
      S.length && b?.panel.length && S.push({ separator: !0 }), b && S.push(...b.panel);
      const P = Nn([
        { id: "about-panel", title: v.title, items: S },
        { id: "about-tabs", title: b?.tabsTitle ?? "", items: b?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, P) : P;
    }
    function ia(c, d) {
      return i[`${c}-${d}`] ?? i[c];
    }
    function Kn(c, d, v, b) {
      return ia(c, d.id)?.({ panel: d, view: v, active: b });
    }
    Ei({
      panelFor: (c) => l.value.get(c) ?? null,
      viewFor: z,
      setView: G,
      movable: _(() => s.movable),
      resizable: _(() => s.resizable),
      minPanelSize: _(() => s.minPanelSize),
      spaceNames: _(() => s.spaceNames),
      focused: E,
      dragging: w,
      dropTarget: g,
      moving: y,
      framing: x,
      canMove: de,
      focus(c) {
        E.value !== c && (E.value = c, a("panel-activate", c));
      },
      selectPanel: Ht,
      beginDrag: Qe,
      toggleMoveMode: js,
      nudge: Zs,
      setSizes: Js,
      frameOf: (c) => f.value ? me(f.value, c) : null,
      beginFrameDrag: Ct,
      nudgeFrame: Gs,
      raise: Mt,
      maximized: qt,
      toggleMaximize: we,
      minimized: Wt,
      toggleMinimize: O,
      beginFrameDragAt: he,
      raiseAt: qe,
      toggleMaximizeAt: U,
      toggleMinimizeAt: T,
      menuFor: oa,
      spaceMenu: ra,
      registerMenu: na,
      closable: In,
      close: ea,
      renderContent: (c, d, v) => Kn("panel", c, d, v),
      renderActions: (c, d, v) => Kn("actions", c, d, v),
      layout: f
    });
    const ca = _(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), ua = () => {
      const c = w.value, d = A.value;
      return !c || !d ? null : ha(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${d.x}px`, top: `${d.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: f,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, d, v, b) {
        const S = f.value;
        S && Z(Pt(S, c, d, v, b), {
          panel: c,
          target: d,
          edge: v,
          ...b === void 0 ? {} : { index: b }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const d = f.value;
        d && (r.value = st(d, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, d, v) {
        const b = f.value;
        b && Z(es(b, c, d, v), {
          panel: c,
          target: d,
          edge: "float",
          rect: v
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, d) {
        const v = f.value;
        if (!v) return;
        const b = vi(v, c, d);
        if (b === v) return;
        r.value = b;
        const S = me(b, c);
        S && a("frame-change", { panel: c, rect: S.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: G,
      /** Brings a floating frame to the front of its stack. */
      raise: Mt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: we,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: O
    }), (c, d) => (m(), h("div", {
      ref_key: "root",
      ref: q,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": w.value ? "true" : "false",
      "data-dc-docking": $.value ? "true" : "false",
      style: ze(ca.value)
    }, [
      f.value ? (m(), ge(yc, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (m(), h("p", bc, " This window has no panels. ")),
      ce(ua),
      p("p", kc, M(R.value), 1)
    ], 12, wc));
  }
}), xc = /* @__PURE__ */ oe($c, [["__scopeId", "data-v-159bdf48"]]);
function qc(e = "", t = "/") {
  const n = B(Le(e)), s = B(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = Le(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = Le(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function as(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Le(s === -1 ? n : n.slice(0, s));
}
function Wc(e) {
  const t = B(as(e.currentRoute.value.fullPath)), n = _(() => e.currentRoute.value.path), s = Ee(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = as(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${Le(a)}`),
    replace: (a) => e.replace(`${n.value}${Le(a)}`),
    dispose: s
  };
}
const Mc = {
  DataShell: Go,
  ShellHeader: bs,
  QueryPanel: $s,
  ResultsArea: Rs,
  FacetControl: ks,
  SegmentedControl: nn,
  StatusPill: bt,
  ScoreMeter: Ss,
  WindowFrame: xc,
  WindowPane: Xs,
  ListView: sn,
  CardsView: Cs,
  GridView: Es,
  TableView: zs,
  LinksView: Ps,
  PreviewView: As,
  TypeCardsView: Fs
}, Uc = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Mc))
      e.component(`${n}${s}`, a);
    t.route && e.provide(os, t.route);
  }
};
export {
  Ot as CASCADE_STEP,
  Cs as CardsView,
  ot as DEFAULT_FRAME,
  Pc as DEFAULT_SORT,
  ga as DEFAULT_VIEW,
  Go as DataShell,
  _s as ENTITY_ALL,
  tn as ENTITY_TERM,
  wn as FACET_PREFIX,
  ks as FacetControl,
  xs as GENERIC_LABELS,
  Es as GridView,
  Uc as HeaderContentLayoutPlugin,
  Ps as LinksView,
  sn as ListView,
  Ze as MINIMIZED_GAP,
  Ds as MINIMIZED_HEIGHT,
  an as MINIMIZED_WIDTH,
  Ls as MIN_FRAME,
  Gn as MOCK_TINTS,
  Ac as MenuBar,
  kn as MenuButton,
  Ts as MenuList,
  Ln as PANE_CONTEXT_KEY,
  gn as PARAM_DIR,
  mn as PARAM_ENTITY,
  yn as PARAM_EXPR,
  _n as PARAM_SORT,
  hn as PARAM_VIEW,
  bn as PinStar,
  As as PreviewView,
  $s as QueryPanel,
  Un as RECORD_STATUSES,
  os as ROUTE_ADAPTER_KEY,
  Rs as ResultsArea,
  hs as SHELL_CONTEXT_KEY,
  Ec as SHELL_THEMES,
  Ss as ScoreMeter,
  nn as SegmentedControl,
  bs as ShellHeader,
  bt as StatusPill,
  zs as TableView,
  Fs as TypeCardsView,
  is as VIEW_KINDS,
  Rn as WINDOW_CONTEXT_KEY,
  xc as WindowFrame,
  Xs as WindowPane,
  Is as activePanel,
  dt as activeTab,
  fi as axisOf,
  Cn as cascade,
  jt as clampRect,
  qs as collapseSpace,
  Nc as collapseToTabs,
  Fc as column,
  _a as createHistoryAdapter,
  qc as createMemoryAdapter,
  za as createMockDataSource,
  Wc as createVueRouterAdapter,
  ss as defaultLayout,
  vn as defaultQuery,
  Nt as emptyFacetState,
  fn as emptyFacetValue,
  Je as findEntity,
  Ge as findSort,
  Tc as fixedView,
  Mn as float,
  es as floatPanel,
  Us as floatSplit,
  $i as floatTabs,
  Hn as fnv1a,
  us as focusEntity,
  Ma as formatDate,
  Xn as formatMetric,
  Ca as formatOrdinal,
  ms as formatPercent,
  xn as frame,
  Ue as frameAt,
  me as frameOf,
  ln as framePathOf,
  be as frontPanel,
  Pa as generateRows,
  zc as group,
  et as groupOf,
  pi as groups,
  ps as hasActiveFacets,
  Q as hasPanel,
  Rc as headless,
  vt as insertPanel,
  ht as isChoosable,
  Sc as isEntityScoped,
  fs as isFacetActive,
  X as isFloat,
  W as isGroup,
  Ne as isMaximized,
  He as isMinimized,
  re as isPanelTab,
  pn as isPristineQuery,
  je as isSplit,
  Ce as isTabOf,
  cs as isViewKind,
  xa as matchesExpression,
  Sa as matchesFacets,
  mi as maximizeFrame,
  _i as maximizeFrameAt,
  hi as minimizeFrame,
  gi as minimizeFrameAt,
  Pt as movePanel,
  gt as moveTab,
  ct as nodeAt,
  yt as nodeTitle,
  ve as normalizeLayout,
  Le as normalizeSearch,
  zn as normalizeSizes,
  De as panelIds,
  Oe as panelNode,
  Qn as panelTabs,
  ba as parseExpression,
  Na as parseQuery,
  Ms as presentRow,
  Ui as providePaneContext,
  Fa as provideShellContext,
  Ei as provideWindowContext,
  Qt as raiseFrame,
  _t as raiseFrameAt,
  yi as raisedPath,
  vs as reconcileFacets,
  Ci as reconcileLayout,
  nt as removePanel,
  at as replaceAt,
  Zn as resizeRect,
  ns as resizeSplit,
  cn as rootSpace,
  Pn as row,
  jn as serializeQuery,
  st as setActivePanel,
  vi as setFrameRect,
  Jn as setFrameRectAt,
  Rt as setSizesAt,
  Ic as setSplitDirection,
  Ye as sizesOf,
  ds as sortsFor,
  ye as spaceChrome,
  Bt as spaceTitle,
  En as split,
  ts as spreadTabs,
  Va as summarizeQuery,
  ws as summaryTerms,
  Ft as swapPanels,
  $n as tabNode,
  Vt as tabPanels,
  Hs as tileFloat,
  Oc as toFloat,
  Vc as toTiled,
  Lc as toggleMaximized,
  Dc as toggleMinimized,
  _o as useEntityPreviews,
  Kc as usePaneContext,
  Bc as usePaneMenu,
  ut as usePresentedRows,
  Ka as useQueryState,
  Ba as useResults,
  $e as useShellContext,
  Xr as useViewLabels,
  Tn as useWindowContext
};
