import { ref as O, inject as at, provide as un, computed as _, toValue as ft, shallowRef as Rt, watch as Ce, defineComponent as se, openBlock as m, createElementBlock as h, createElementVNode as p, toDisplayString as C, createCommentVNode as V, unref as E, renderSlot as wt, Fragment as Q, renderList as ce, withDirectives as Qt, withKeys as vt, withModifiers as Ae, vModelText as Zt, normalizeClass as oa, nextTick as yt, createBlock as ge, createVNode as le, createTextVNode as At, normalizeStyle as ze, resolveDynamicComponent as ia, useModel as Lt, useSlots as Jn, onBeforeUnmount as Oe, useId as es, createSlots as ca, withCtx as Jt, mergeModels as Dt, onMounted as ua, resolveComponent as ts, getCurrentScope as da, onScopeDispose as fa, h as pa } from "vue";
const ns = Symbol("dc.routeAdapter");
function Le(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function va() {
  const e = typeof window < "u", t = O(e ? Le(window.location.search) : ""), n = O(e ? window.location.pathname : "/"), s = () => {
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
const ss = ["list", "cards", "grid", "table", "links", "preview"], _c = [
  "minimal",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], On = ["ok", "running", "queued", "review", "failed"], ma = "cards", gc = "updated";
function as(e) {
  return typeof e == "string" && ss.includes(e);
}
function Qe(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function rs(e, t = {}) {
  const n = Qe(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function ls(e) {
  return e?.sorts?.length ? e.sorts : [
    { key: "updated", label: "updated" },
    { key: "score", label: "score" },
    { key: "metric1", label: e ? e.labels.metric1.toLowerCase() : "value" },
    { key: "name", label: "name" }
  ];
}
function He(e, t) {
  const n = ls(e);
  return (t ? n.find((a) => a.key === t) : void 0) ?? n[0];
}
function dn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Tt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = dn(n);
  return t;
}
function os(e) {
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
function is(e) {
  return Object.values(e).some(os);
}
function fn(e) {
  return e.entity === null && e.expr.trim() === "" && !is(e.facets);
}
function wc(e) {
  return e.entity !== null;
}
function pn(e, t = {}) {
  const s = t.landing === "entity" ? rs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && as(t.view) ? t.view : ma,
    sort: He(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Tt(s)
  };
}
function cs(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : dn(s);
  }
  return n;
}
const ha = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function _a(e) {
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
function ga(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of _a(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const o = ha.exec(a);
    o && o[3] !== "" ? s.push({
      kind: "field",
      field: o[1].toLowerCase(),
      comparator: o[2],
      value: o[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
function wa(e, t, n) {
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
function Xt(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function ya(e, t, n) {
  if (e.kind === "text")
    return Xt(t.primary, e.value) || Xt(t.secondary, e.value);
  const s = wa(e.field, t, n);
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
    return Xt(s, e.value);
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
function ba(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => ya(a, t, n))) : !0;
}
function Vn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Kn(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function ka(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function $a(e) {
  return String(e + 1).padStart(2, "0");
}
function us(e) {
  return `${Math.round(Math.min(1, Math.max(0, e)) * 100)}%`;
}
const qn = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function xa(e, t) {
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
function Ma(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples;
  if (!r.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const l = r[i % r.length], d = Math.floor(i / r.length), f = Vn(`${s}:${e.key}:${l[0]}:${i}`), S = {};
    for (const b of e.facets)
      S[b.key] = xa(b, Vn(`${f}:${b.key}`));
    const y = new Date(a.getTime() - f % 900 * 36e5).toISOString();
    o.push({
      id: `${e.key}_${1e4 + i * 7}`,
      entityKey: e.key,
      entityLabel: e.label,
      primary: d ? `${l[0]} · rev ${d + 1}` : l[0],
      secondary: d ? `${l[1]}-${d + 1}` : l[1],
      status: On[f % On.length],
      score: Number((0.35 + f % 64 / 100).toFixed(3)),
      metric1: 1 + f % 940,
      metric2: 1 + (f >> 3) % 320,
      updatedAt: y,
      tint: qn[f % qn.length],
      facets: S
    });
  }
  return o;
}
function Ca(e, t) {
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
function Ea(e) {
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
function Sa(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s) => {
    const a = t.get(s.key);
    if (a) return a;
    const r = Ma(s, e);
    return t.set(s.key, r), r;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: o }) {
      const i = ga(s.expr), l = r ? [r] : a.entities, d = [], f = [];
      for (const b of l)
        for (const x of n(b))
          d.push(x), (r ? Ca(x, s.facets) : !0) && ba(i, x, b) && f.push(x);
      const S = He(r, s.sort), y = f.sort(Ea(S.key));
      return s.dir === "asc" && y.reverse(), {
        rows: y.slice(0, o),
        total: f.length,
        unfiltered: f.length === d.length
      };
    }
  };
}
const ds = Symbol("dc.shellContext");
function Aa(e) {
  return un(ds, e), e;
}
function ke() {
  const e = at(ds, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const vn = "e", mn = "v", hn = "s", _n = "d", gn = "q", wn = "f_", fs = "*", Pa = [vn, mn, hn, _n, gn], en = "..", ps = ",", za = [
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
function Gt(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of za) t = t.replace(n, s);
  return t;
}
function Te(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function vs(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), o = a === -1 ? "" : s.slice(a + 1);
    n.push([Te(r), o]);
  }
  return n;
}
function Fa(e) {
  return Pa.includes(e) || e.startsWith(wn);
}
function Bn(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Ra(e, t) {
  const n = Te(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(ps).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(en), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + en.length)).trim(), o = a === "" ? null : Number(a), i = r === "" ? null : Number(r);
      let l = o !== null && Number.isFinite(o) ? Bn(o, e.min, e.max) : null, d = i !== null && Number.isFinite(i) ? Bn(i, e.min, e.max) : null;
      return l !== null && d !== null && l > d && ([l, d] = [d, l]), { kind: "range", min: l, max: d };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function La(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(ps) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${en}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Da(e, t, n = {}) {
  const s = pn(t, n), a = new Map(vs(e)), r = a.get(vn), o = r === void 0 ? s.entity : Te(r), i = o === fs ? null : Qe(t, o), l = a.get(mn), d = l && as(Te(l)) ? Te(l) : s.view, f = a.get(hn), S = He(i, f ? Te(f) : n.sort), y = a.get(_n), b = y ? Te(y) === "asc" ? "asc" : "desc" : s.dir, x = a.get(gn), g = {};
  for (const k of i?.facets ?? []) {
    const z = a.get(`${wn}${k.key}`);
    g[k.key] = z === void 0 ? dn(k) : Ra(k, z);
  }
  return {
    entity: i?.key ?? null,
    view: d,
    sort: S.key,
    dir: b,
    expr: x === void 0 ? "" : Te(x),
    facets: cs(i, g)
  };
}
function Wn(e, t, n = {}, s = "") {
  const a = pn(t, n), r = Qe(t, e.entity), o = vs(s).filter(([S]) => !Fa(S)), i = [], l = (S, y) => i.push([S, Gt(y)]), d = r?.key ?? null;
  d !== a.entity && l(vn, d ?? fs), e.view !== a.view && l(mn, e.view), e.sort !== a.sort && l(hn, e.sort), e.dir !== a.dir && l(_n, e.dir), e.expr.trim() !== "" && l(gn, e.expr);
  for (const S of r?.facets ?? []) {
    const y = e.facets[S.key];
    if (!y) continue;
    const b = La(y, S);
    b !== null && i.push([`${wn}${S.key}`, Gt(b)]);
  }
  const f = [
    ...o.map(([S, y]) => [Gt(S), y]),
    ...i
  ];
  return f.length ? `?${f.map(([S, y]) => y === "" ? S : `${S}=${y}`).join("&")}` : "";
}
const tn = "entity";
function Ta(e, t) {
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
function ms(e, t) {
  const n = [];
  t && n.push({
    id: tn,
    label: `entity:${t.key}`,
    facetKey: tn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && os(a) && n.push(...Ta(s, a));
  }
  return n;
}
function Ia(e, t) {
  if (fn(e)) {
    const a = He(t, e.sort);
    return `everything · ${e.view} · ${a.label}`;
  }
  const n = ms(e, t).map((a) => a.label), s = e.expr.trim();
  return s && n.push(`"${s}"`), n.join(" · ");
}
function Na(e) {
  const { adapter: t } = e, n = _(() => ft(e.schema)), s = _(() => ft(e.defaults) ?? {}), a = _(() => Da(t.search.value, n.value, s.value)), r = _(() => Qe(n.value, a.value.entity)), o = _(() => r.value ?? rs(n.value, s.value)), i = _(() => ls(r.value)), l = _(() => He(r.value, a.value.sort)), d = (g, k) => {
    const z = Wn(g, n.value, s.value, t.search.value);
    z !== t.search.value && (k === "push" ? t.push(z) : t.replace(z));
  }, f = () => ft(e.navigationMode) ?? "push", S = () => ft(e.facetNavigationMode) ?? "replace", y = (g, k) => {
    d({ ...a.value, ...g }, k);
  }, b = (g, k) => {
    const z = a.value.facets[g];
    if (!z) return;
    const R = { ...a.value.facets, [g]: k(z) };
    y({ facets: R }, S());
  }, x = (g) => {
    const k = g === null ? null : Qe(n.value, g);
    (k?.key ?? null) !== a.value.entity && y(
      {
        entity: k?.key ?? null,
        sort: He(k, a.value.sort).key,
        facets: Tt(k)
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
    summary: _(() => Ia(a.value, r.value)),
    terms: _(() => ms(a.value, r.value)),
    isPristine: _(() => fn(a.value)),
    isEverything: _(() => a.value.entity === null),
    hasFacets: _(() => is(a.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(g) {
      y({ view: g }, f());
    },
    setSort(g) {
      y({ sort: He(r.value, g).key }, f());
    },
    toggleDirection() {
      y({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(g) {
      y({ expr: g }, f());
    },
    setFacet(g, k) {
      b(g, () => k);
    },
    toggleChip(g, k) {
      b(g, (z) => z.kind !== "chips" ? z : { kind: "chips", selected: z.selected.includes(k) ? z.selected.filter((Z) => Z !== k) : [...z.selected, k] });
    },
    setRange(g, k, z) {
      b(g, (R) => R.kind === "range" ? { kind: "range", min: k, max: z } : R);
    },
    toggleFlag(g) {
      b(
        g,
        (k) => k.kind === "toggle" ? { kind: "toggle", on: !k.on } : k
      );
    },
    removeTerm(g) {
      if (g.facetKey === tn) {
        x(null);
        return;
      }
      b(g.facetKey, (k) => k.kind === "chips" && g.option ? { kind: "chips", selected: k.selected.filter((z) => z !== g.option) } : k.kind === "range" ? { kind: "range", min: null, max: null } : k.kind === "toggle" ? { kind: "toggle", on: !1 } : k);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Tt(null) }, f());
    },
    reset() {
      d(pn(n.value, s.value), f());
    },
    hrefFor(g) {
      const k = { ...a.value, ...g };
      return k.facets = cs(Qe(n.value, k.entity), k.facets), `${t.path.value}${Wn(k, n.value, s.value, t.search.value)}`;
    }
  };
}
function Oa(e) {
  const t = Rt([]), n = O(0), s = O(!1), a = Rt(null);
  let r = 0;
  const o = (l) => {
    t.value = l.rows, n.value = l.total, a.value = null;
  }, i = () => {
    const l = ++r, d = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value
    };
    let f;
    try {
      f = e.source.value.query(d);
    } catch (S) {
      a.value = S, t.value = [], n.value = 0;
      return;
    }
    if (!(f instanceof Promise)) {
      o(f), s.value = !1;
      return;
    }
    s.value = !0, f.then((S) => {
      l === r && o(S);
    }).catch((S) => {
      l === r && (a.value = S, t.value = [], n.value = 0);
    }).finally(() => {
      l === r && (s.value = !1);
    });
  };
  return Ce([e.source, e.query, e.schema, e.entity, e.limit], i, {
    immediate: !0
  }), { rows: t, total: n, pending: s, error: a, refresh: i };
}
const Va = ["data-dc-expanded"], Ka = ["aria-expanded", "aria-controls"], qa = { class: "dc-header__domain" }, Ba = { class: "dc-header__crumb" }, Wa = { class: "dc-header__crumb-root" }, Ua = {
  key: 0,
  class: "dc-header__count dc-mono"
}, Ha = { class: "dc-header__query" }, Xa = ["data-dc-active", "title"], Ga = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Ya = { class: "dc-header__sr" }, ja = {
  key: 0,
  class: "dc-header__actions"
}, Qa = /* @__PURE__ */ se({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ke(), r = _(() => a.schema.value), o = _(() => a.entity.value?.label ?? "Everything"), i = _(() => {
      if (n.hideCount) return "";
      const l = a.entity.value;
      return l && !a.hasFacets.value && !a.query.value.expr.trim() ? l.count : String(a.total.value);
    });
    return (l, d) => (m(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      p("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: d[0] || (d[0] = (f) => s("toggle"))
      }, [
        d[2] || (d[2] = p("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        p("span", qa, C(r.value.label), 1),
        p("span", Ba, [
          p("span", Wa, C(o.value), 1),
          i.value ? (m(), h("span", Ua, C(i.value), 1)) : V("", !0)
        ]),
        p("span", Ha, [
          d[1] || (d[1] = p("span", { class: "dc-header__query-label" }, "Query", -1)),
          p("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": E(a).isPristine.value ? "false" : "true",
            title: E(a).summary.value
          }, C(E(a).summary.value), 9, Xa)
        ]),
        p("span", Ga, C(e.expanded ? "▲" : "▼"), 1),
        p("span", Ya, C(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, Ka),
      l.$slots.actions ? (m(), h("div", ja, [
        wt(l.$slots, "actions", {}, void 0, !0)
      ])) : V("", !0)
    ], 8, Va));
  }
}), ae = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, hs = /* @__PURE__ */ ae(Qa, [["__scopeId", "data-v-74095a78"]]), Za = { class: "dc-facet" }, Ja = { class: "dc-facet__head" }, er = ["id"], tr = { class: "dc-facet__hint dc-mono" }, nr = ["aria-labelledby"], sr = ["aria-pressed", "data-dc-active", "onClick"], ar = ["aria-labelledby"], rr = ["aria-label", "placeholder", "onKeydown"], lr = ["aria-label", "placeholder", "onKeydown"], or = ["aria-checked"], ir = { class: "dc-switch__text" }, cr = ["data-dc-active"], ur = /* @__PURE__ */ se({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = _(() => {
      const { facet: y, value: b } = n;
      return y.kind === "chips" && b.kind === "chips" ? b.selected.length ? `${b.selected.length} of ${y.options.length}` : "any" : y.kind === "range" && b.kind === "range" ? b.min === null && b.max === null ? `${y.min}–${y.max}` : `${b.min ?? y.min}–${b.max ?? y.max}` : b.kind === "toggle" ? b.on ? "on" : "off" : "";
    }), r = _(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function o(y) {
      if (n.value.kind !== "chips") return;
      const b = r.value.has(y) ? n.value.selected.filter((x) => x !== y) : [...n.value.selected, y];
      s("update", { kind: "chips", selected: b });
    }
    const i = O(""), l = O("");
    Ce(
      () => n.value,
      (y) => {
        y.kind === "range" && (i.value = y.min === null ? "" : y.min, l.value = y.max === null ? "" : y.max);
      },
      { immediate: !0, deep: !0 }
    );
    function d(y) {
      if (typeof y == "number") return Number.isFinite(y) ? y : null;
      const b = y.trim();
      if (!b) return null;
      const x = Number(b);
      return Number.isFinite(x) ? x : null;
    }
    function f() {
      if (n.value.kind !== "range") return;
      const y = d(i.value), b = d(l.value);
      y === n.value.min && b === n.value.max || s("update", { kind: "range", min: y, max: b });
    }
    function S() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (y, b) => (m(), h("div", Za, [
      p("div", Ja, [
        p("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, C(e.facet.label), 9, er),
        p("span", tr, C(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (m(), h("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (m(!0), h(Q, null, ce(e.facet.options, (x) => (m(), h("button", {
          key: x,
          type: "button",
          class: "dc-chip",
          "aria-pressed": r.value.has(x),
          "data-dc-active": r.value.has(x) ? "true" : "false",
          onClick: (g) => o(x)
        }, C(x), 9, sr))), 128))
      ], 8, nr)) : e.facet.kind === "range" && e.value.kind === "range" ? (m(), h("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        Qt(p("input", {
          "onUpdate:modelValue": b[0] || (b[0] = (x) => i.value = x),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: f,
          onBlur: f,
          onKeydown: vt(Ae(f, ["prevent"]), ["enter"])
        }, null, 40, rr), [
          [Zt, i.value]
        ]),
        b[2] || (b[2] = p("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        Qt(p("input", {
          "onUpdate:modelValue": b[1] || (b[1] = (x) => l.value = x),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: f,
          onBlur: f,
          onKeydown: vt(Ae(f, ["prevent"]), ["enter"])
        }, null, 40, lr), [
          [Zt, l.value]
        ])
      ], 8, ar)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (m(), h("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: S
      }, [
        p("span", ir, C(e.facet.text), 1),
        p("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...b[3] || (b[3] = [
          p("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, cr)
      ], 8, or)) : V("", !0)
    ]));
  }
}), _s = /* @__PURE__ */ ae(ur, [["__scopeId", "data-v-2807e0ec"]]), dr = ["aria-label"], fr = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], pr = /* @__PURE__ */ se({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = O([]);
    function r(o, i) {
      const l = n.options.length;
      let d = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? d = (i + 1) % l : o.key === "ArrowLeft" || o.key === "ArrowUp" ? d = (i - 1 + l) % l : o.key === "Home" ? d = 0 : o.key === "End" && (d = l - 1), d === null) return;
      o.preventDefault();
      const f = n.options[d];
      f && (s("update:modelValue", f.key), a.value[d]?.focus());
    }
    return (o, i) => (m(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (m(!0), h(Q, null, ce(e.options, (l, d) => (m(), h("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: oa(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (f) => s("update:modelValue", l.key),
        onKeydown: (f) => r(f, d)
      }, C(l.label), 43, fr))), 128))
    ], 8, dr));
  }
}), nn = /* @__PURE__ */ ae(pr, [["__scopeId", "data-v-fed6f974"]]), vr = ["id"], mr = { class: "dc-panel__section" }, hr = { class: "dc-panel__head" }, _r = { class: "dc-panel__note" }, gr = { class: "dc-panel__query" }, wr = { class: "dc-panel__expression" }, yr = ["for"], br = ["id", "placeholder", "onKeydown"], kr = { class: "dc-panel__actions" }, $r = ["disabled"], xr = {
  key: 0,
  class: "dc-panel__facets"
}, Mr = {
  key: 1,
  class: "dc-panel__hint"
}, Cr = { class: "dc-panel__section dc-panel__section--row" }, Er = { class: "dc-panel__control" }, Sr = { class: "dc-panel__control" }, Ar = ["title", "aria-label"], Pr = { class: "dc-panel__section" }, zr = { class: "dc-panel__head" }, Fr = { class: "dc-panel__note" }, Rr = { class: "dc-panel__entities" }, Lr = ["data-dc-active", "aria-current"], Dr = { class: "dc-entity__head" }, Tr = { class: "dc-entity__count dc-mono" }, Ir = ["data-dc-active", "aria-current", "onClick"], Nr = { class: "dc-entity__head" }, Or = { class: "dc-entity__label" }, Vr = { class: "dc-entity__count dc-mono" }, Kr = { class: "dc-entity__preview dc-mono" }, qr = /* @__PURE__ */ se({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ke(), r = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, o = _(
      () => (n.views ?? [...ss]).map((g) => ({ key: g, label: r[g] }))
    ), i = _(
      () => a.sorts.value.map((g) => ({ key: g.key, label: g.label }))
    ), l = O(a.query.value.expr), d = O(null);
    Ce(
      () => a.query.value.expr,
      (g) => {
        l.value = g;
      }
    );
    const f = _(() => l.value !== a.query.value.expr), S = _(() => {
      const g = a.entity.value;
      return g ? `applies to ${g.label.toLowerCase()} · results stay behind this panel` : "applies to every entity · results stay behind this panel";
    });
    function y() {
      a.setExpression(l.value), s("close");
    }
    function b() {
      l.value = "", a.clearFilters();
    }
    function x(g, k) {
      a.setFacet(g, k);
    }
    return yt(() => d.value?.focus()), (g, k) => (m(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: k[5] || (k[5] = vt(Ae((z) => s("close"), ["stop"]), ["esc"]))
    }, [
      p("section", mr, [
        p("header", hr, [
          k[6] || (k[6] = p("span", { class: "dc-eyebrow" }, "Query", -1)),
          p("span", _r, C(S.value), 1)
        ]),
        p("div", gr, [
          p("div", wr, [
            p("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, yr),
            Qt(p("textarea", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: d,
              "onUpdate:modelValue": k[0] || (k[0] = (z) => l.value = z),
              class: "dc-textarea dc-mono",
              rows: "4",
              spellcheck: "false",
              placeholder: E(a).schema.value.placeholder,
              onKeydown: [
                vt(Ae(y, ["meta", "prevent"]), ["enter"]),
                vt(Ae(y, ["ctrl", "prevent"]), ["enter"])
              ]
            }, null, 40, br), [
              [Zt, l.value]
            ]),
            p("div", kr, [
              p("button", {
                type: "button",
                class: "dc-button dc-button--primary",
                onClick: y
              }, " Run query "),
              p("button", {
                type: "button",
                class: "dc-button",
                disabled: E(a).isPristine.value && !f.value,
                onClick: b
              }, " Reset ", 8, $r)
            ])
          ]),
          E(a).entity.value ? (m(), h("div", xr, [
            (m(!0), h(Q, null, ce(E(a).entity.value.facets, (z) => (m(), ge(_s, {
              key: z.key,
              facet: z,
              value: E(a).query.value.facets[z.key],
              onUpdate: (R) => x(z.key, R)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (m(), h("p", Mr, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ])
      ]),
      p("section", Cr, [
        p("div", Er, [
          k[7] || (k[7] = p("span", { class: "dc-eyebrow" }, "View", -1)),
          le(nn, {
            label: "Result view",
            "model-value": E(a).query.value.view,
            options: o.value,
            "onUpdate:modelValue": k[1] || (k[1] = (z) => E(a).setView(z))
          }, null, 8, ["model-value", "options"])
        ]),
        p("div", Sr, [
          k[8] || (k[8] = p("span", { class: "dc-eyebrow" }, "Sort", -1)),
          le(nn, {
            mono: "",
            label: "Sort field",
            "model-value": E(a).query.value.sort,
            options: i.value,
            "onUpdate:modelValue": k[2] || (k[2] = (z) => E(a).setSort(z))
          }, null, 8, ["model-value", "options"]),
          p("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: E(a).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${E(a).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: k[3] || (k[3] = (z) => E(a).toggleDirection())
          }, C(E(a).query.value.dir === "desc" ? "↓" : "↑"), 9, Ar)
        ])
      ]),
      p("section", Pr, [
        p("header", zr, [
          k[9] || (k[9] = p("span", { class: "dc-eyebrow" }, "Entities", -1)),
          p("span", Fr, C(E(a).schema.value.kicker), 1)
        ]),
        p("div", Rr, [
          p("button", {
            type: "button",
            class: "dc-entity dc-entity--all",
            "data-dc-active": E(a).isEverything.value ? "true" : "false",
            "aria-current": E(a).isEverything.value ? "true" : void 0,
            onClick: k[4] || (k[4] = (z) => E(a).clearEntity())
          }, [
            p("span", Dr, [
              k[10] || (k[10] = p("span", { class: "dc-entity__label" }, "Everything", -1)),
              p("span", Tr, C(E(a).entities.value.length) + " kinds", 1)
            ]),
            k[11] || (k[11] = p("span", { class: "dc-entity__preview dc-mono" }, [
              p("span", { class: "dc-truncate" }, "no entity filter"),
              p("span", { class: "dc-truncate" }, "logs and settings included")
            ], -1))
          ], 8, Lr),
          (m(!0), h(Q, null, ce(E(a).entities.value, (z) => (m(), h("button", {
            key: z.key,
            type: "button",
            class: "dc-entity",
            "data-dc-active": z.key === E(a).entity.value?.key ? "true" : "false",
            "aria-current": z.key === E(a).entity.value?.key ? "true" : void 0,
            onClick: (R) => E(a).setEntity(z.key)
          }, [
            p("span", Nr, [
              p("span", Or, C(z.label), 1),
              p("span", Vr, C(z.count), 1)
            ]),
            p("span", Kr, [
              (m(!0), h(Q, null, ce(z.samples.slice(0, 3), (R) => (m(), h("span", {
                key: R[1],
                class: "dc-truncate"
              }, C(R[1]), 1))), 128))
            ])
          ], 8, Ir))), 128))
        ])
      ])
    ], 40, vr));
  }
}), gs = /* @__PURE__ */ ae(qr, [["__scopeId", "data-v-22794f9b"]]), ws = {
  primary: "Item",
  secondary: "Reference",
  metric1: "Metric",
  metric2: "Metric 2"
};
function Br() {
  const e = ke();
  return _(() => e.entity.value?.labels ?? ws);
}
function ys(e, t, n, s) {
  return {
    row: e,
    entityLabel: e.entityLabel,
    labels: n,
    ordinal: $a(t),
    metric1: Kn(e.metric1),
    metric2: Kn(e.metric2),
    date: ka(e.updatedAt),
    score: e.score.toFixed(2),
    percent: us(e.score),
    pinned: s
  };
}
function it() {
  const e = ke(), t = _(
    () => new Map(e.entities.value.map((n) => [n.key, n.labels]))
  );
  return _(
    () => e.rows.value.map(
      (n, s) => ys(n, s, t.value.get(n.entityKey) ?? ws, e.isPinned(n))
    )
  );
}
const Wr = ["data-dc-status"], Ur = /* @__PURE__ */ se({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (m(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, C(e.status), 9, Wr));
  }
}), bt = /* @__PURE__ */ ae(Ur, [["__scopeId", "data-v-b16f539c"]]), Hr = ["data-dc-active", "aria-pressed", "aria-label"], Xr = /* @__PURE__ */ se({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ke();
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
    }, C(e.pinned ? "★" : "☆"), 9, Hr));
  }
}), yn = /* @__PURE__ */ ae(Xr, [["__scopeId", "data-v-c6e964e2"]]), Gr = { class: "dc-cards" }, Yr = { class: "dc-card__top dc-mono" }, jr = {
  key: 0,
  class: "dc-card__entity"
}, Qr = { class: "dc-card__top-right" }, Zr = ["onClick"], Jr = { class: "dc-card__primary" }, el = { class: "dc-card__secondary dc-mono" }, tl = { class: "dc-card__metrics dc-mono" }, nl = { class: "dc-card__date" }, sl = /* @__PURE__ */ se({
  __name: "CardsView",
  setup(e) {
    const t = ke(), n = it(), s = _(() => t.isEverything.value);
    return (a, r) => (m(), h("div", Gr, [
      (m(!0), h(Q, null, ce(E(n), (o) => (m(), h("div", {
        key: o.row.id,
        class: "dc-card"
      }, [
        p("div", Yr, [
          p("span", null, [
            At(C(o.ordinal) + " ", 1),
            s.value ? (m(), h("span", jr, C(o.entityLabel), 1)) : V("", !0)
          ]),
          p("span", Qr, [
            le(bt, {
              status: o.row.status
            }, null, 8, ["status"]),
            E(t).pinnable.value ? (m(), ge(yn, {
              key: 0,
              row: o.row,
              pinned: o.pinned
            }, null, 8, ["row", "pinned"])) : V("", !0)
          ])
        ]),
        p("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => E(t).activate(o.row)
        }, [
          p("span", Jr, C(o.row.primary), 1),
          p("span", el, C(o.row.secondary), 1)
        ], 8, Zr),
        p("div", tl, [
          p("span", null, C(o.labels.metric1) + " " + C(o.metric1), 1),
          p("span", null, C(o.labels.metric2) + " " + C(o.metric2), 1),
          p("span", nl, C(o.date), 1)
        ])
      ]))), 128))
    ]));
  }
}), bs = /* @__PURE__ */ ae(sl, [["__scopeId", "data-v-8d6c13ad"]]), al = { class: "dc-grid" }, rl = ["onClick"], ll = { class: "dc-tile__scrim" }, ol = { class: "dc-tile__top dc-mono" }, il = { class: "dc-tile__chip" }, cl = { class: "dc-tile__chip" }, ul = { class: "dc-tile__caption" }, dl = { class: "dc-tile__secondary dc-truncate" }, fl = { class: "dc-tile__primary" }, pl = /* @__PURE__ */ se({
  __name: "GridView",
  setup(e) {
    const t = ke(), n = it();
    return (s, a) => (m(), h("div", al, [
      (m(!0), h(Q, null, ce(E(n), (r) => (m(), h("button", {
        key: r.row.id,
        type: "button",
        class: "dc-tile",
        style: ze({ "--dc-tile-tint": r.row.tint }),
        onClick: (o) => E(t).activate(r.row)
      }, [
        p("span", ll, [
          p("span", ol, [
            p("span", il, C(r.ordinal), 1),
            p("span", cl, C(r.score), 1)
          ]),
          p("span", ul, [
            p("span", dl, C(r.row.secondary), 1),
            p("span", fl, C(r.row.primary), 1)
          ])
        ])
      ], 12, rl))), 128))
    ]));
  }
}), ks = /* @__PURE__ */ ae(pl, [["__scopeId", "data-v-6f365890"]]), vl = { class: "dc-links" }, ml = ["onClick"], hl = { class: "dc-link__primary dc-truncate" }, _l = { class: "dc-link__secondary dc-mono dc-truncate" }, gl = /* @__PURE__ */ se({
  __name: "LinksView",
  setup(e) {
    const t = ke(), n = it();
    return (s, a) => (m(), h("div", vl, [
      (m(!0), h(Q, null, ce(E(n), (r) => (m(), h("button", {
        key: r.row.id,
        type: "button",
        class: "dc-link",
        onClick: (o) => E(t).activate(r.row)
      }, [
        p("span", hl, C(r.row.primary), 1),
        p("span", _l, C(r.row.secondary), 1)
      ], 8, ml))), 128))
    ]));
  }
}), $s = /* @__PURE__ */ ae(gl, [["__scopeId", "data-v-87c439df"]]), wl = ["aria-valuenow", "aria-label", "title"], yl = /* @__PURE__ */ se({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = _(() => us(t.value));
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
    ], 8, wl));
  }
}), xs = /* @__PURE__ */ ae(yl, [["__scopeId", "data-v-ab794776"]]), bl = {
  class: "dc-list",
  role: "list"
}, kl = ["onClick"], $l = { class: "dc-list__ordinal dc-mono" }, xl = { class: "dc-list__identity" }, Ml = { class: "dc-list__primary dc-truncate" }, Cl = { class: "dc-list__secondary dc-mono dc-truncate" }, El = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Sl = { class: "dc-list__metrics dc-mono" }, Al = ["title"], Pl = ["title"], zl = { class: "dc-list__trailing" }, Fl = /* @__PURE__ */ se({
  __name: "ListView",
  setup(e) {
    const t = ke(), n = it(), s = _(() => t.isEverything.value);
    return (a, r) => (m(), h("div", bl, [
      (m(!0), h(Q, null, ce(E(n), (o) => (m(), h("div", {
        key: o.row.id,
        class: "dc-list__row",
        role: "listitem"
      }, [
        p("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => E(t).activate(o.row)
        }, [
          p("span", $l, C(o.ordinal), 1),
          p("span", xl, [
            p("span", Ml, C(o.row.primary), 1),
            p("span", Cl, C(o.row.secondary), 1)
          ]),
          s.value ? (m(), h("span", El, C(o.entityLabel), 1)) : V("", !0),
          p("span", Sl, [
            p("span", {
              title: o.labels.metric1
            }, C(o.metric1), 9, Al),
            p("span", {
              title: o.labels.metric2
            }, C(o.metric2), 9, Pl),
            le(xs, {
              value: o.row.score
            }, null, 8, ["value"])
          ])
        ], 8, kl),
        p("span", zl, [
          le(bt, {
            status: o.row.status
          }, null, 8, ["status"]),
          E(t).pinnable.value ? (m(), ge(yn, {
            key: 0,
            row: o.row,
            pinned: o.pinned
          }, null, 8, ["row", "pinned"])) : V("", !0)
        ])
      ]))), 128))
    ]));
  }
}), sn = /* @__PURE__ */ ae(Fl, [["__scopeId", "data-v-c9a5f09e"]]), Rl = { class: "dc-preview" }, Ll = { class: "dc-preview__pager dc-mono" }, Dl = ["disabled"], Tl = { "aria-live": "polite" }, Il = ["disabled"], Nl = {
  key: 0,
  class: "dc-preview__card"
}, Ol = { class: "dc-preview__body" }, Vl = { class: "dc-preview__top" }, Kl = { class: "dc-preview__badges" }, ql = { class: "dc-preview__entity dc-mono" }, Bl = { class: "dc-preview__primary" }, Wl = { class: "dc-preview__secondary dc-mono" }, Ul = { class: "dc-preview__fields" }, Hl = { class: "dc-preview__key" }, Xl = { class: "dc-preview__value dc-mono" }, Gl = /* @__PURE__ */ se({
  __name: "PreviewView",
  setup(e) {
    const t = ke(), n = it(), s = O(0);
    Ce(n, (l) => {
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
      const d = n.value.length;
      d && (s.value = Math.min(d - 1, Math.max(0, s.value + l)));
    };
    return (l, d) => (m(), h("div", Rl, [
      p("div", Ll, [
        p("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: d[0] || (d[0] = (f) => i(-1))
        }, " ‹ ", 8, Dl),
        p("span", Tl, C(o.value), 1),
        p("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: d[1] || (d[1] = (f) => i(1))
        }, " › ", 8, Il)
      ]),
      a.value ? (m(), h("div", Nl, [
        p("div", {
          class: "dc-preview__media",
          style: ze({ background: a.value.row.tint }),
          "aria-hidden": "true"
        }, " preview ", 4),
        p("div", Ol, [
          p("div", Vl, [
            p("span", Kl, [
              le(bt, {
                status: a.value.row.status
              }, null, 8, ["status"]),
              p("span", ql, C(a.value.entityLabel), 1)
            ]),
            E(t).pinnable.value ? (m(), ge(yn, {
              key: 0,
              row: a.value.row,
              pinned: a.value.pinned
            }, null, 8, ["row", "pinned"])) : V("", !0)
          ]),
          p("div", null, [
            p("div", Bl, C(a.value.row.primary), 1),
            p("div", Wl, C(a.value.row.secondary), 1)
          ]),
          p("dl", Ul, [
            (m(!0), h(Q, null, ce(r.value, (f) => (m(), h("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              p("dt", Hl, C(f.key), 1),
              p("dd", Xl, C(f.value), 1)
            ]))), 128))
          ]),
          p("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: d[2] || (d[2] = (f) => E(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : V("", !0)
    ]));
  }
}), Ms = /* @__PURE__ */ ae(Gl, [["__scopeId", "data-v-a320e3e4"]]), Yl = { class: "dc-table" }, jl = ["aria-sort"], Ql = { scope: "col" }, Zl = {
  key: 0,
  class: "dc-table__entity",
  scope: "col"
}, Jl = ["aria-sort"], eo = {
  class: "dc-table__number",
  scope: "col"
}, to = ["aria-sort"], no = ["onClick"], so = { class: "dc-table__num dc-mono" }, ao = { class: "dc-table__primary" }, ro = ["onClick"], lo = { class: "dc-table__muted dc-mono" }, oo = {
  key: 0,
  class: "dc-table__entity dc-mono"
}, io = { class: "dc-table__number dc-mono" }, co = { class: "dc-table__number dc-mono" }, uo = { class: "dc-table__muted dc-mono" }, fo = /* @__PURE__ */ se({
  __name: "TableView",
  setup(e) {
    const t = ke(), n = it(), s = Br(), a = _(() => t.isEverything.value);
    function r(l) {
      t.query.value.sort === l ? t.toggleDirection() : t.setSort(l);
    }
    const o = (l) => t.query.value.sort !== l ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending", i = _(() => new Set(t.sorts.value.map((l) => l.key)));
    return (l, d) => (m(), h("table", Yl, [
      p("thead", null, [
        p("tr", null, [
          d[3] || (d[3] = p("th", {
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
              onClick: d[0] || (d[0] = (f) => r("name"))
            }, C(E(s).primary), 1)) : (m(), h(Q, { key: 1 }, [
              At(C(E(s).primary), 1)
            ], 64))
          ], 8, jl),
          p("th", Ql, C(E(s).secondary), 1),
          a.value ? (m(), h("th", Zl, " Entity ")) : V("", !0),
          p("th", {
            class: "dc-table__number",
            scope: "col",
            "aria-sort": o("metric1")
          }, [
            i.value.has("metric1") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: d[1] || (d[1] = (f) => r("metric1"))
            }, C(E(s).metric1), 1)) : (m(), h(Q, { key: 1 }, [
              At(C(E(s).metric1), 1)
            ], 64))
          ], 8, Jl),
          p("th", eo, C(E(s).metric2), 1),
          p("th", {
            class: "dc-table__date",
            scope: "col",
            "aria-sort": o("updated")
          }, [
            i.value.has("updated") ? (m(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: d[2] || (d[2] = (f) => r("updated"))
            }, " Updated ")) : (m(), h(Q, { key: 1 }, [
              At(" Updated ")
            ], 64))
          ], 8, to),
          d[4] || (d[4] = p("th", {
            class: "dc-table__state",
            scope: "col"
          }, " State ", -1))
        ])
      ]),
      p("tbody", null, [
        (m(!0), h(Q, null, ce(E(n), (f) => (m(), h("tr", {
          key: f.row.id,
          class: "dc-table__row",
          onClick: (S) => E(t).activate(f.row)
        }, [
          p("td", so, C(f.ordinal), 1),
          p("td", ao, [
            p("button", {
              type: "button",
              class: "dc-table__open",
              onClick: Ae((S) => E(t).activate(f.row), ["stop"])
            }, C(f.row.primary), 9, ro)
          ]),
          p("td", lo, C(f.row.secondary), 1),
          a.value ? (m(), h("td", oo, C(f.entityLabel), 1)) : V("", !0),
          p("td", io, C(f.metric1), 1),
          p("td", co, C(f.metric2), 1),
          p("td", uo, C(f.date), 1),
          p("td", null, [
            le(bt, {
              status: f.row.status
            }, null, 8, ["status"])
          ])
        ], 8, no))), 128))
      ])
    ]));
  }
}), Cs = /* @__PURE__ */ ae(fo, [["__scopeId", "data-v-f0240384"]]);
function po(e) {
  const t = Rt([]), n = O(!1), s = Rt(null);
  let a = 0;
  const r = (l, d, f) => ({
    entity: l,
    rows: d.rows.map(
      (S, y) => ys(S, y, l.labels, e.isPinned(S.id))
    ),
    total: d.total,
    count: f ? l.count : String(d.total)
  }), o = () => {
    const l = ++a, d = e.query.value, f = e.schema.value, S = e.entities.value, y = e.limit.value, b = fn(d), x = S.map((g) => ({
      entity: g,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        query: { ...d, entity: g.key, facets: Tt(g) },
        schema: f,
        entity: g,
        limit: y
      })
    }));
    if (x.every(({ outcome: g }) => !(g instanceof Promise))) {
      t.value = x.map(
        ({ entity: g, outcome: k }) => r(g, k, b)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(x.map(({ outcome: g }) => Promise.resolve(g))).then((g) => {
      l === a && (t.value = g.map(
        (k, z) => r(x[z].entity, k, b)
      ), s.value = null);
    }).catch((g) => {
      l === a && (s.value = g, t.value = []);
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
  return Ce(
    [e.source, e.schema, e.query, e.entities, e.limit],
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: i };
}
const vo = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, mo = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, ho = ["data-dc-pending"], _o = ["data-dc-empty"], go = ["onClick"], wo = { class: "dc-type__name" }, yo = { class: "dc-type__count dc-mono" }, bo = { class: "dc-type__sr" }, ko = {
  key: 0,
  class: "dc-type__empty"
}, $o = ["onClick"], xo = { class: "dc-type__identity" }, Mo = { class: "dc-type__primary dc-truncate" }, Co = { class: "dc-type__secondary dc-mono dc-truncate" }, Eo = { class: "dc-type__trailing dc-mono" }, So = { class: "dc-type__metric" }, Ao = { class: "dc-type__metric-value" }, Po = { class: "dc-type__metric-label" }, zo = { class: "dc-type__date" }, Fo = /* @__PURE__ */ se({
  __name: "TypeCardsView",
  setup(e) {
    const t = ke(), { previews: n, pending: s, error: a } = po({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), r = _(() => !t.isPristine.value);
    return (o, i) => E(a) ? (m(), h("p", vo, " Could not load results: " + C(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !E(n).length && E(s) ? (m(), h("p", mo, " Running query… ")) : (m(), h("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      (m(!0), h(Q, null, ce(E(n), (l) => (m(), h("section", {
        key: l.entity.key,
        class: "dc-type",
        "data-dc-empty": l.rows.length ? "false" : "true"
      }, [
        p("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => E(t).setEntity(l.entity.key)
        }, [
          p("span", wo, C(l.entity.label), 1),
          p("span", yo, C(l.count), 1),
          i[0] || (i[0] = p("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          p("span", bo, "Show only " + C(l.entity.label.toLowerCase()), 1)
        ], 8, go),
        l.rows.length ? V("", !0) : (m(), h("p", ko, C(r.value ? "No matches" : "Nothing here yet"), 1)),
        (m(!0), h(Q, null, ce(l.rows, (d) => (m(), h("button", {
          key: d.row.id,
          type: "button",
          class: "dc-type__row",
          onClick: (f) => E(t).activate(d.row)
        }, [
          p("span", xo, [
            p("span", Mo, C(d.row.primary), 1),
            p("span", Co, C(d.row.secondary), 1)
          ]),
          p("span", Eo, [
            p("span", So, [
              p("span", Ao, C(d.metric1), 1),
              p("span", Po, C(d.labels.metric1), 1)
            ]),
            p("span", zo, C(d.date), 1)
          ])
        ], 8, $o))), 128))
      ], 8, _o))), 128))
    ], 8, ho));
  }
}), Es = /* @__PURE__ */ ae(Fo, [["__scopeId", "data-v-5be878e3"]]), Ro = ["data-dc-pending"], Lo = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, Do = { class: "dc-results__detail" }, To = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Io = {
  key: 3,
  class: "dc-results__state"
}, No = { class: "dc-results__detail" }, Oo = /* @__PURE__ */ se({
  __name: "ResultsArea",
  setup(e) {
    const t = ke(), n = {
      list: sn,
      cards: bs,
      grid: ks,
      table: Cs,
      links: $s,
      preview: Ms
    }, s = _(
      () => t.isEverything.value && t.query.value.view === "cards"
    ), a = _(() => n[t.query.value.view] ?? sn), r = _(() => t.rows.value.length > 0), o = _(() => t.error.value !== null);
    return (i, l) => (m(), h("div", {
      class: "dc-results",
      "data-dc-pending": E(t).pending.value ? "true" : "false"
    }, [
      o.value ? (m(), h("p", Lo, [
        l[1] || (l[1] = p("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        p("span", Do, C(E(t).error.value instanceof Error ? E(t).error.value.message : "The data source failed."), 1)
      ])) : s.value ? (m(), ge(Es, { key: 1 })) : !r.value && E(t).pending.value ? (m(), h("p", To, [...l[2] || (l[2] = [
        p("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (m(), ge(ia(a.value), { key: 4 })) : (m(), h("div", Io, [
        l[3] || (l[3] = p("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        p("span", No, C(E(t).summary.value), 1),
        E(t).isPristine.value ? V("", !0) : (m(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: l[0] || (l[0] = (d) => E(t).clearFilters())
        }, C(E(t).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Ro));
  }
}), Ss = /* @__PURE__ */ ae(Oo, [["__scopeId", "data-v-1221783d"]]), Vo = ["data-dc-theme"], Ko = { class: "dc-shell__head" }, qo = { class: "dc-shell__panel" }, Bo = /* @__PURE__ */ se({
  __name: "DataShell",
  props: /* @__PURE__ */ Dt({
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
  emits: /* @__PURE__ */ Dt(["activate", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Lt(e, "open"), o = Lt(e, "pinned"), i = Jn(), l = at(ns, null), d = s.route || l ? null : va(), f = s.route ?? l ?? d;
    Oe(() => d?.dispose?.());
    const S = _(() => Sa({ seed: s.schema.key })), y = _(() => s.source ?? S.value), b = Na({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), x = Oa({
      source: y,
      query: b.query,
      schema: _(() => s.schema),
      entity: b.entity,
      limit: _(() => s.limit)
    });
    Ce(b.query, (w) => a("query-change", w));
    const g = es() ?? "dc-query-panel", k = O(null);
    function z() {
      r.value && (r.value = !1, yt(() => {
        k.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const R = _(() => new Set(o.value));
    function Z(w) {
      const M = new Set(R.value);
      M.has(w.id) ? M.delete(w.id) : M.add(w.id), o.value = [...M], a("toggle-pin", w);
    }
    const D = Aa({
      ...b,
      schema: _(() => s.schema),
      entities: _(() => s.schema.entities),
      rows: x.rows,
      total: x.total,
      pending: x.pending,
      error: x.error,
      source: y,
      previewsPerType: _(() => s.previewsPerType),
      pinnable: _(() => s.pinnable === !0),
      isPinned: (w) => R.value.has(w.id),
      isPinnedId: (w) => R.value.has(w),
      togglePin: Z,
      activate: (w) => a("activate", w)
    }), I = _(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: z
    }), (w, M) => (m(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: ze(I.value)
    }, [
      p("div", Ko, [
        le(hs, {
          ref_key: "headerRef",
          ref: k,
          expanded: r.value,
          "panel-id": E(g),
          onToggle: M[0] || (M[0] = (K) => r.value = !r.value)
        }, ca({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Jt(() => [
              wt(w.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        r.value ? (m(), h(Q, { key: 0 }, [
          p("div", {
            class: "dc-shell__scrim",
            onClick: z
          }),
          p("div", qo, [
            le(gs, {
              "panel-id": E(g),
              views: e.views,
              onClose: z
            }, null, 8, ["panel-id", "views"])
          ])
        ], 64)) : V("", !0)
      ]),
      wt(w.$slots, "results", {
        rows: E(D).rows.value,
        total: E(D).total.value,
        query: E(D).query.value,
        pending: E(D).pending.value
      }, () => [
        le(Ss)
      ], !0)
    ], 12, Vo));
  }
}), Wo = /* @__PURE__ */ ae(Bo, [["__scopeId", "data-v-dc3528cf"]]), mt = (e) => e.separator !== !0 && e.disabled !== !0, Uo = ["aria-label"], Ho = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Xo = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Go = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Yo = { class: "dc-menu__label dc-truncate" }, jo = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Qo = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Zo = /* @__PURE__ */ se({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = O(null), o = O([]), i = O(null), l = O(null), d = O(null), f = O(!1), S = _(
      () => s.items.flatMap((w, M) => mt(w) ? [M] : [])
    ), y = O({ x: s.at.x, y: s.at.y });
    async function b() {
      y.value = { x: s.at.x, y: s.at.y }, await yt();
      const w = r.value?.getBoundingClientRect();
      if (!w) return;
      const M = 8;
      let K = s.at.x, q = s.at.y;
      if (K + w.width > window.innerWidth - M) {
        const te = s.at.mirrorX === void 0 ? null : s.at.mirrorX - w.width;
        K = te !== null && te >= M ? te : window.innerWidth - w.width - M;
      }
      q + w.height > window.innerHeight - M && (q = window.innerHeight - w.height - M), y.value = { x: Math.max(M, K), y: Math.max(M, q) };
    }
    const x = _(() => ({ left: `${y.value.x}px`, top: `${y.value.y}px` }));
    function g(w) {
      i.value = w, w !== null && yt(() => o.value[w]?.focus());
    }
    function k(w, M) {
      const K = S.value;
      if (K.length === 0) return null;
      if (w === null) return M === 1 ? K[0] ?? null : K[K.length - 1] ?? null;
      const q = K.indexOf(w);
      return q === -1 ? K[0] ?? null : K[(q + M + K.length) % K.length] ?? null;
    }
    function z(w, M) {
      if (!s.items[w]?.items?.length) return;
      const q = o.value[w]?.getBoundingClientRect(), te = r.value?.getBoundingClientRect();
      !q || !te || (d.value = { x: te.right - 4, y: q.top - 4, mirrorX: te.left + 4 }, l.value = w, f.value = M);
    }
    function R(w) {
      const M = l.value;
      l.value = null, d.value = null, w && M !== null && g(M);
    }
    function Z(w) {
      const M = s.items[w];
      if (!(!M || !mt(M))) {
        if (M.items?.length) {
          z(w, !0);
          return;
        }
        a("choose", M);
      }
    }
    function D(w) {
      const M = w.key;
      if (M === "Escape") {
        w.preventDefault(), w.stopPropagation(), l.value !== null ? R(!0) : a("dismiss");
        return;
      }
      if (M === "ArrowDown" || M === "ArrowUp") {
        w.preventDefault(), w.stopPropagation(), R(!1), g(k(i.value, M === "ArrowDown" ? 1 : -1));
        return;
      }
      if (M === "Home" || M === "End") {
        w.preventDefault(), w.stopPropagation(), R(!1), g(k(null, M === "Home" ? 1 : -1));
        return;
      }
      if (M === "ArrowRight") {
        const K = i.value;
        K !== null && s.items[K]?.items?.length && (w.preventDefault(), w.stopPropagation(), z(K, !0));
        return;
      }
      if (M === "ArrowLeft") {
        l.value !== null && (w.preventDefault(), w.stopPropagation(), R(!0));
        return;
      }
      if (M === "Enter" || M === " ") {
        const K = i.value;
        if (K === null) return;
        w.preventDefault(), w.stopPropagation(), Z(K);
      }
    }
    function I(w) {
      const M = s.items[w];
      !M || !mt(M) || (l.value !== null && l.value !== w && R(!1), g(w), M.items?.length && z(w, !1));
    }
    return ua(() => {
      b(), s.autofocus && g(k(null, 1));
    }), Ce(() => s.at, b, { deep: !0 }), Ce(() => s.items, () => void b(), { deep: !0 }), Oe(() => {
      l.value = null;
    }), t({ root: r }), (w, M) => {
      const K = ts("MenuList", !0);
      return m(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: ze(x.value),
        onKeydown: D
      }, [
        (m(!0), h(Q, null, ce(e.items, (q, te) => (m(), h(Q, {
          key: q.id ?? `${te}-${q.label ?? ""}`
        }, [
          q.separator ? (m(), h("div", Ho)) : (m(), h("button", {
            key: 1,
            ref_for: !0,
            ref: (ve) => {
              ve && (o.value[te] = ve);
            },
            type: "button",
            class: "dc-menu__item",
            role: q.checked === void 0 ? "menuitem" : "menuitemcheckbox",
            "aria-checked": q.checked === void 0 ? void 0 : q.checked,
            "aria-haspopup": q.items?.length ? "menu" : void 0,
            "aria-expanded": q.items?.length ? l.value === te : void 0,
            "aria-disabled": q.disabled ? "true" : void 0,
            disabled: q.disabled,
            "data-dc-item": q.id,
            tabindex: "-1",
            onClick: (ve) => Z(te),
            onMouseenter: (ve) => I(te)
          }, [
            p("span", Go, C(q.checked ? "✓" : ""), 1),
            p("span", Yo, C(q.label), 1),
            q.shortcut ? (m(), h("span", jo, C(q.shortcut), 1)) : q.items?.length ? (m(), h("span", Qo, "›")) : V("", !0)
          ], 40, Xo))
        ], 64))), 128)),
        l.value !== null && d.value ? (m(), ge(K, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: d.value,
          label: e.items[l.value]?.label,
          autofocus: f.value,
          onChoose: M[0] || (M[0] = (q) => a("choose", q)),
          onDismiss: M[1] || (M[1] = (q) => R(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : V("", !0)
      ], 44, Uo);
    };
  }
}), As = /* @__PURE__ */ ae(Zo, [["__scopeId", "data-v-eaba2383"]]), Jo = ["data-dc-theme", "aria-label"], ei = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], ti = /* @__PURE__ */ se({
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
    }), a = t, r = O(null), o = O([]), i = O(null), l = O(null), d = O(!1), f = _(
      () => n.menus.flatMap((D, I) => mt(D) ? [I] : [])
    );
    function S(D, I) {
      const w = o.value[D]?.getBoundingClientRect(), M = n.menus[D];
      !w || !M || !mt(M) || (l.value = { x: w.left, y: w.bottom + 2, mirrorX: w.right }, i.value = D, d.value = I);
    }
    function y(D) {
      const I = i.value;
      i.value = null, l.value = null, D && I !== null && o.value[I]?.focus();
    }
    function b(D) {
      i.value === D ? y(!0) : S(D, !1);
    }
    function x(D) {
      i.value === null || i.value === D || S(D, !1);
    }
    function g(D, I) {
      const w = f.value;
      if (w.length === 0) return null;
      if (D === null) return I === 1 ? w[0] ?? null : w[w.length - 1] ?? null;
      const M = w.indexOf(D);
      return M === -1 ? w[0] ?? null : w[(M + I + w.length) % w.length] ?? null;
    }
    function k(D) {
      const I = D.key;
      if (I === "Escape") {
        if (i.value === null) return;
        D.preventDefault(), y(!0);
        return;
      }
      if (I === "ArrowDown" && i.value === null) {
        const K = z();
        if (K === null) return;
        D.preventDefault(), S(K, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const w = i.value ?? z(), M = g(w, I === "ArrowRight" ? 1 : -1);
      M !== null && (D.preventDefault(), i.value !== null ? S(M, !0) : o.value[M]?.focus());
    }
    function z() {
      const D = o.value.findIndex((I) => I === document.activeElement);
      return D === -1 ? f.value[0] ?? null : D;
    }
    function R(D) {
      const I = D.target;
      !I || r.value?.contains(I) || y(!1);
    }
    Ce(i, (D) => {
      D !== null ? window.addEventListener("pointerdown", R, !0) : window.removeEventListener("pointerdown", R, !0);
    }), Oe(() => window.removeEventListener("pointerdown", R, !0));
    function Z(D) {
      y(!0), D.action?.(), a("choose", D);
    }
    return (D, I) => (m(), h("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: ze(s.value),
      onKeydown: k
    }, [
      (m(!0), h(Q, null, ce(e.menus, (w, M) => (m(), h("button", {
        key: w.id ?? w.label ?? M,
        ref_for: !0,
        ref: (K) => {
          K && (o.value[M] = K);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === M,
        "aria-disabled": w.disabled ? "true" : void 0,
        disabled: w.disabled,
        "data-dc-menu": w.id ?? w.label,
        tabindex: M === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (K) => b(M),
        onMouseenter: (K) => x(M)
      }, C(w.label), 41, ei))), 128)),
      i.value !== null && l.value ? (m(), ge(As, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: l.value,
        label: e.menus[i.value]?.label,
        autofocus: d.value,
        onChoose: Z,
        onDismiss: I[0] || (I[0] = (w) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : V("", !0)
    ], 44, Jo));
  }
}), yc = /* @__PURE__ */ ae(ti, [["__scopeId", "data-v-07a53eb5"]]), ni = ["aria-label", "aria-expanded", "disabled"], si = { "aria-hidden": "true" }, ai = /* @__PURE__ */ se({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = O(null), a = O(null), r = O(null), o = O(!1), i = _(() => r.value !== null);
    function l(x) {
      const g = s.value?.getBoundingClientRect();
      g && (r.value = { x: g.left, y: g.bottom + 4, mirrorX: g.right }, o.value = x);
    }
    function d(x) {
      r.value = null, x && s.value?.focus();
    }
    function f() {
      i.value ? d(!0) : l(!1);
    }
    function S(x) {
      x.key !== "ArrowDown" || i.value || (x.preventDefault(), l(!0));
    }
    function y(x) {
      const g = x.target;
      g && (s.value?.contains(g) || a.value?.root?.contains(g) || d(!1));
    }
    Ce(i, (x) => {
      x ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), Oe(() => window.removeEventListener("pointerdown", y, !0));
    function b(x) {
      d(!0), x.action?.(), n("choose", x);
    }
    return (x, g) => (m(), h(Q, null, [
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
        onKeydown: S
      }, [
        p("span", si, C(e.glyph), 1)
      ], 40, ni),
      r.value ? (m(), ge(As, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: o.value,
        onChoose: b,
        onDismiss: g[0] || (g[0] = (k) => d(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : V("", !0)
    ], 64));
  }
}), bn = /* @__PURE__ */ ae(ai, [["__scopeId", "data-v-cb7cace1"]]), Ge = (e) => e.kind === "split", W = (e) => e.kind === "group", G = (e) => e.kind === "float", rt = { x: 16, y: 16, w: 360, h: 260 }, It = 28, Ps = 120, an = 220, zs = 38, je = 6;
function kt(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const o = t(a.node, r);
    return o === a.node ? a : (n = !0, { ...a, node: o });
  });
  return n ? { ...e, frames: s } : e;
}
function Ne(e) {
  return { kind: "group", panels: [e] };
}
function bc(e, t) {
  return t ? { kind: "group", panels: e, active: t } : { kind: "group", panels: e };
}
const re = (e) => typeof e == "string", kn = (e) => re(e) ? Ne(e) : e, Ot = (e) => re(e) ? [e] : De(e), Un = (e) => e.panels.filter(re), ri = (e) => e.panels.filter((t) => !re(t)), Me = (e, t) => e.panels.includes(t);
function $t(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (re(r) || !Y(r, t)) return r;
    const o = n(r);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, panels: a } : e;
}
function $n(e, t) {
  return { node: e, rect: { ...rt, ...t } };
}
function Fs(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Vt(e, t) {
  const n = { ...rt, ...t };
  return Fs(
    e.map(
      (s, a) => $n(s, {
        ...n,
        x: n.x + a * It,
        y: n.y + a * It
      })
    )
  );
}
function xn(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Mn = (e, t, n) => xn("row", e, t, n), kc = (e, t, n) => xn("column", e, t, n);
function fe(e) {
  return {
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const lt = (e) => e.fixedView === !0 || e.headless === !0 || !W(e) && !!e.title, $c = (e) => ({ ...e, headless: !0 }), xc = (e) => ({ ...e, fixedView: !0 }), li = (e) => e === "left" || e === "right" ? "row" : "column";
function De(e) {
  return W(e) ? e.panels.flatMap(Ot) : G(e) ? e.frames.flatMap((t) => De(t.node)) : e.children.flatMap(De);
}
function Y(e, t) {
  return W(e) ? e.panels.some((n) => re(n) ? n === t : Y(n, t)) : G(e) ? e.frames.some((n) => Y(n.node, t)) : e.children.some((n) => Y(n, t));
}
const rn = (e) => De(e).length === 0;
function Kt(e) {
  return Ge(e) ? e.children.map((t, n) => ({ node: t, index: n })) : G(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => re(t) ? [] : [{ node: t, index: n }]);
}
const Cn = (e) => Kt(e).map((t) => t.node);
function ct(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => re(s) ? s === t : Y(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Rs(e) {
  const t = e.panels[ct(e)];
  return t !== void 0 && re(t) ? t : "";
}
function ye(e) {
  if (re(e)) return e;
  if (W(e)) {
    const n = e.panels[ct(e)];
    return n === void 0 ? "" : ye(n);
  }
  if (G(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? ye(n.node) : "";
  }
  const t = e.children[0];
  return t ? ye(t) : "";
}
function Ze(e, t) {
  if (W(e) && Me(e, t)) return e;
  for (const n of Cn(e)) {
    const s = Ze(n, t);
    if (s) return s;
  }
  return null;
}
function oi(e) {
  const t = Cn(e).flatMap(oi);
  return W(e) ? [e, ...t] : t;
}
function me(e, t) {
  if (W(e)) {
    for (const n of ri(e)) {
      const s = me(n, t);
      if (s) return s;
    }
    return null;
  }
  if (G(e)) {
    for (const n of e.frames)
      if (Y(n.node, t))
        return me(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = me(n, t);
    if (s) return s;
  }
  return null;
}
function Yt(e, t, n = Ps) {
  const s = (i, l) => l > 0 ? Math.max(Math.min(i, l), Math.min(n, l)) : Math.max(i, n), a = s(e.w, t.w), r = s(e.h, t.h), o = (i, l, d) => Math.min(Math.max(i, 0), Math.max(d - l, 0));
  return {
    x: Math.round(o(e.x, a, t.w)),
    y: Math.round(o(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function Hn(e, t, n, s, a = Ps) {
  let { x: r, y: o, w: i, h: l } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + s), t.includes("n") && (l = e.h - s, o = e.y + s), i < a && (t.includes("w") && (r = e.x + e.w - a), i = a), l < a && (t.includes("n") && (o = e.y + e.h - a), l = a), { x: r, y: o, w: i, h: l };
}
const Ls = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function Je(e, t, n) {
  if (W(e)) return $t(e, t, (r) => Je(r, t, n));
  if (G(e)) {
    let r = !1;
    const o = e.frames.map((i) => {
      if (!Y(i.node, t)) return i;
      if (me(i.node, t)) {
        const d = Je(i.node, t, n);
        return d === i.node ? i : (r = !0, { ...i, node: d });
      }
      const l = n(i);
      return l === i ? i : (r = !0, l);
    });
    return r ? { ...e, frames: o } : e;
  }
  if (!Y(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const o = Je(r, t, n);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: a } : e;
}
function ii(e, t, n) {
  return Je(e, t, (s) => Ls(s.rect, n) ? s : { ...s, rect: n });
}
const Ie = (e) => e.maximized === !0, Ds = (e) => (t) => {
  if (Ie(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function ci(e, t, n = !0) {
  return Je(e, t, Ds(n));
}
function Mc(e, t) {
  const n = me(e, t);
  return n ? ci(e, t, !Ie(n)) : e;
}
const Ue = (e) => e.minimized === !0, Ts = (e) => (t) => {
  if (Ue(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function ui(e, t, n = !0) {
  return Je(e, t, Ts(n));
}
function Cc(e, t) {
  const n = me(e, t);
  return n ? ui(e, t, !Ue(n)) : e;
}
function We(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = ot(e, t.slice(0, -1));
  return !s || !G(s) ? null : s.frames[n] ?? null;
}
function ln(e, t) {
  if (G(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!Y(s.node, t)) continue;
      const a = ln(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of Kt(e)) {
    if (!Y(n, t)) continue;
    const a = ln(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function En(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = ot(e, a);
  if (!r || !G(r)) return e;
  const o = r.frames[s];
  if (!o) return e;
  const i = n(o);
  if (i === o) return e;
  const l = [...r.frames];
  return l[s] = i, nt(e, a, { ...r, frames: l });
}
function Xn(e, t, n) {
  return En(
    e,
    t,
    (s) => Ls(s.rect, n) ? s : { ...s, rect: n }
  );
}
function di(e, t, n = !0) {
  return En(e, t, Ds(n));
}
function fi(e, t, n = !0) {
  return En(e, t, Ts(n));
}
function ht(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (G(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const i = ht(o.node, s), l = i === o.node ? o : { ...o, node: i };
    if (n === e.frames.length - 1 && l === o) return e;
    const d = [...e.frames];
    return d.splice(n, 1), d.push(l), { ...e, frames: d };
  }
  const a = ot(e, [n]);
  if (!a) return e;
  const r = ht(a, s);
  return r === a ? e : nt(e, [n], r);
}
function pi(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (G(s) && (n[r] = s.frames.length - 1), s = ot(s, [a]));
  }), n;
}
function Pt(e, t, n, s) {
  if (W(e)) return $t(e, n, (o) => Pt(o, t, n, s));
  if (G(e)) {
    const o = e.frames.findIndex((l) => Y(l.node, n)), i = e.frames[o];
    if (!i) return e;
    if (me(i.node, n)) {
      const l = Pt(i.node, t, n, s);
      if (l === i.node) return e;
      const d = [...e.frames];
      return d[o] = { ...i, node: l }, { ...e, frames: d };
    }
    return { ...e, frames: [...e.frames, $n(Ne(t), s)] };
  }
  if (!Y(e, n)) return e;
  let a = !1;
  const r = e.children.map((o) => {
    const i = Pt(o, t, n, s);
    return i !== o && (a = !0), i;
  });
  return a ? { ...e, children: r } : e;
}
function Gn(e, t, n, s) {
  if (t === n || !Y(e, t) || !Y(e, n) || !me(e, n)) return e;
  const a = et(e, t);
  if (!a) return e;
  const r = Pt(a, t, n, s);
  return r === a ? e : pe(r);
}
function jt(e, t) {
  if (W(e)) return $t(e, t, (a) => jt(a, t));
  if (G(e)) {
    const a = e.frames.findIndex((d) => Y(d.node, t)), r = e.frames[a];
    if (!r) return e;
    const o = jt(r.node, t), i = o === r.node ? r : { ...r, node: o };
    if (a === e.frames.length - 1 && i === r) return e;
    const l = [...e.frames];
    return l.splice(a, 1), l.push(i), { ...e, frames: l };
  }
  if (!Y(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = jt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Sn(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, o) => r + o, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const Xe = (e) => Sn(e.children.length, e.sizes), Nt = (e) => e.places?.length === e.children.length ? e.places : void 0;
function pe(e) {
  if (W(e)) return vi(e);
  if (G(e)) {
    const i = e.frames.flatMap((l) => {
      const d = pe(l.node);
      return rn(d) ? [] : [d === l.node ? l : { ...l, node: d }];
    });
    return i.length === e.frames.length && i.every((l, d) => l === e.frames[d]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = Xe(e), n = Nt(e), s = [], a = [], r = [];
  e.children.forEach((i, l) => {
    const d = pe(i), f = t[l] ?? 0;
    if (rn(d)) return;
    if (!n && Ge(d) && d.direction === e.direction && !Nt(d) && !lt(d)) {
      const y = Xe(d);
      d.children.forEach((b, x) => {
        s.push(b), a.push(f * (y[x] ?? 0));
      });
      return;
    }
    s.push(d), a.push(f);
    const S = n?.[l];
    S && r.push(S);
  });
  const o = s[0];
  return s.length === 1 && o && !lt(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: Sn(s.length, a),
    ...e.title ? { title: e.title } : {},
    ...fe(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function vi(e) {
  if (e.panels.every(re)) return e;
  const t = ye(e), n = [];
  for (const r of e.panels) {
    if (re(r)) {
      n.push(r);
      continue;
    }
    const o = pe(r);
    if (!rn(o)) {
      if (W(o) && !lt(o)) {
        n.push(...o.panels);
        continue;
      }
      n.push(o);
    }
  }
  const s = n[0];
  if (n.length === 1 && s !== void 0 && !re(s) && !lt(e))
    return s;
  if (n.length === e.panels.length && n.every((r, o) => r === e.panels[o]))
    return e;
  const a = t && n.some((r) => Ot(r).includes(t)) ? t : void 0;
  return { kind: "group", panels: n, ...a ? { active: a } : {}, ...fe(e) };
}
function et(e, t) {
  if (G(e)) {
    const o = e.frames.flatMap((i) => {
      const l = et(i.node, t);
      return l ? [l === i.node ? i : { ...i, node: l }] : [];
    });
    return o.length === 0 ? null : { ...e, frames: o };
  }
  if (W(e)) {
    if (!Y(e, t)) return e;
    const o = ct(e), i = [];
    for (const f of e.panels) {
      if (re(f)) {
        f !== t && i.push(f);
        continue;
      }
      const S = et(f, t);
      S && i.push(S);
    }
    if (i.length === 0) return null;
    const d = e.active && i.some((f) => Ot(f).includes(e.active)) ? e.active : ye(i[o] ?? i[i.length - 1]);
    return d ? { kind: "group", panels: i, active: d, ...fe(e) } : { kind: "group", panels: i, ...fe(e) };
  }
  const n = Xe(e), s = [], a = [];
  if (e.children.forEach((o, i) => {
    const l = et(o, t);
    l && (s.push(l), a.push(n[i] ?? 0));
  }), s.length === 0) return null;
  const r = s[0];
  return s.length === 1 && r && !lt(e) ? r : pe({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...e.title ? { title: e.title } : {},
    ...fe(e)
  });
}
function mi(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...fe(e) };
}
function pt(e, t, n, s, a) {
  const r = (b) => kt(
    b,
    (x) => Y(x, n) ? pt(x, t, n, s, a) : x
  );
  if (s === "float") return e;
  const o = (b) => $t(b, n, (x) => pt(x, t, n, s, a));
  if (s === "center")
    return W(e) ? Me(e, n) ? mi(e, t, a) : o(e) : G(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (b) => Y(b, n) ? pt(b, t, n, s, a) : b
      )
    };
  const i = li(s), l = s === "left" || s === "top", d = (b) => ({
    kind: "split",
    direction: i,
    children: l ? [Ne(t), b] : [b, Ne(t)],
    sizes: [0.5, 0.5]
  });
  if (W(e)) return Me(e, n) ? d(e) : o(e);
  if (G(e)) return r(e);
  const f = Xe(e), S = e.children.findIndex(
    (b) => W(b) && Me(b, n)
  );
  if (S >= 0 && e.direction === i) {
    const b = (f[S] ?? 0) / 2, x = [...e.children], g = [...f];
    return x.splice(l ? S : S + 1, 0, Ne(t)), g.splice(S, 1, b, b), {
      kind: "split",
      direction: i,
      children: x,
      sizes: g,
      ...e.title ? { title: e.title } : {},
      ...fe(e)
    };
  }
  const y = e.children.map((b) => Y(b, n) ? W(b) && Me(b, n) ? d(b) : pt(b, t, n, s) : b);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: f,
    ...e.title ? { title: e.title } : {},
    ...fe(e)
  };
}
function tt(e, t) {
  if (W(e)) {
    if (Me(e, t))
      return Rs(e) === t ? e : { kind: "group", panels: e.panels, active: t, ...fe(e) };
    const a = e.panels.findIndex((l) => !re(l) && Y(l, t)), r = e.panels[a];
    if (r === void 0 || re(r)) return e;
    const o = tt(r, t);
    if (o === r && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = o, { kind: "group", panels: i, active: t, ...fe(e) };
  }
  if (!Y(e, t)) return e;
  if (G(e)) return kt(e, (a) => tt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = tt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function _t(e, t, n) {
  if (W(e)) {
    if (!Me(e, t)) return $t(e, t, (i) => _t(i, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const o = ye(e);
    return { kind: "group", panels: r, ...o ? { active: o } : {}, ...fe(e) };
  }
  return Y(e, t) ? G(e) ? kt(e, (s) => _t(s, t, n)) : { ...e, children: e.children.map((s) => _t(s, t, n)) } : e;
}
function zt(e, t, n) {
  if (t === n) return e;
  if (W(e)) {
    if (!Y(e, t) && !Y(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => re(r) ? s(r) : zt(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return G(e) ? kt(e, (s) => zt(s, t, n)) : { ...e, children: e.children.map((s) => zt(s, t, n)) };
}
function Et(e, t, n, s, a) {
  if (s === "float" || !Y(e, t) || !Y(e, n)) return e;
  const r = Ze(e, t);
  if (s === "center" && r && Me(r, n)) {
    if (a === void 0) return e;
    const i = r.panels.indexOf(t), l = a > i ? a - 1 : a;
    return l === i ? e : tt(_t(e, t, l), t);
  }
  if (t === n) return e;
  const o = et(e, t);
  return o ? pe(pt(o, t, n, s, a)) : e;
}
function Is(e, t, n) {
  if (W(e)) {
    const a = e.panels[t];
    if (a === void 0 || re(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (G(e)) {
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
  if (!W(e) && s.some(({ node: a }) => W(a) && Me(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!Y(a, t)) continue;
    const o = xt(a, t, n);
    return o ? Is(e, r, o) : null;
  }
  return null;
}
function Ec(e, t, n) {
  const s = xt(
    e,
    t,
    (a) => Ge(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? pe(s) : e;
}
function Ns(e) {
  return W(e) ? [...e.panels] : G(e) || Nt(e) || lt(e) ? [e] : e.children.flatMap(Ns);
}
function Os(e, t) {
  if (W(e)) return e;
  const n = Cn(e).flatMap(Ns), s = t && n.some((a) => Ot(a).includes(t)) ? t : void 0;
  return pe({
    kind: "group",
    panels: n,
    ...s ? { active: s } : {},
    ...fe(e)
  });
}
function Sc(e, t) {
  const n = xt(e, t, (s) => Os(s, t));
  return n ? pe(n) : e;
}
function An(e, t, n) {
  if (W(e) && Me(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of Kt(e)) {
    if (!Y(s, t)) continue;
    const r = An(s, t, n);
    return r ? Is(e, a, r) : null;
  }
  return null;
}
function Yn(e, t, n) {
  const s = An(
    e,
    t,
    (a) => a.panels.length > 1 ? { ...xn(n, a.panels.map(kn)), ...fe(a) } : a
  );
  return s ? pe(s) : e;
}
function on(e, t) {
  if (W(e)) return e;
  if (G(e)) {
    const a = e.frames.findIndex(
      (i) => W(i.node) && i.node.panels.includes(t)
    ), r = e.frames[a], o = r && W(r.node) ? r.node : null;
    if (r && o && o.panels.length > 1) {
      const i = Vt(o.panels.map(kn), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return kt(e, (i) => on(i, t));
  }
  if (!Y(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = on(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function hi(e, t, n) {
  const s = Ze(e, t);
  if (!s || s.panels.length < 2) return e;
  if (me(e, t)?.node === s) {
    const o = on(e, t);
    return o === e ? e : pe(o);
  }
  const r = An(e, t, (o) => ({
    ...Vt(o.panels.map(kn), n),
    ...fe(o)
  }));
  return r ? pe(r) : e;
}
function Vs(e, t) {
  const n = Nt(e), s = n ? e.children.map((a, r) => ({ ...n[r], node: a })) : Vt(e.children, t).frames;
  return { ...Fs(s, e.title), ...fe(e) };
}
function Ac(e, t, n) {
  const s = xt(
    e,
    t,
    (a) => G(a) ? a : Vs(a, n)
  );
  return s ? pe(s) : W(e) && Me(e, t) ? Vt([e], n) : e;
}
function _i(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function Ks(e, t) {
  const n = _i(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...e.title ? { title: e.title } : {},
    ...fe(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Pc(e, t, n = "row") {
  const s = xt(
    e,
    t,
    (a) => G(a) ? Ks(a, n) : a
  );
  return s ? pe(s) : e;
}
function qt(e) {
  return W(e) ? "" : e.title ? e.title : G(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function gt(e, t) {
  if (W(e)) {
    const s = e.panels[ct(e)];
    return s === void 0 ? "" : re(s) ? t(s) ?? s : qt(s) || gt(s, t);
  }
  if (e.title) return e.title;
  if (G(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? gt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? gt(n, t) : "";
}
function ot(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (Ge(n)) n = n.children[s];
    else if (G(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || re(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function nt(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (G(e)) {
    const l = e.frames[s];
    if (!l) return e;
    const d = nt(l.node, a, n);
    if (d === l.node) return e;
    const f = [...e.frames];
    return f[s] = { ...l, node: d }, { ...e, frames: f };
  }
  if (W(e)) {
    const l = e.panels[s];
    if (l === void 0 || re(l)) return e;
    const d = nt(l, a, n);
    if (d === l) return e;
    const f = [...e.panels];
    return f[s] = d, { ...e, panels: f };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = nt(r, a, n);
  if (o === r) return e;
  const i = [...e.children];
  return i[s] = o, { ...e, children: i };
}
function Ft(e, t, n) {
  if (t.length === 0)
    return Ge(e) ? { ...e, sizes: Sn(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (G(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const l = Ft(i.node, a, n);
    if (l === i.node) return e;
    const d = [...e.frames];
    return d[s] = { ...i, node: l }, { ...e, frames: d };
  }
  if (W(e)) {
    const i = e.panels[s];
    if (i === void 0 || re(i)) return e;
    const l = Ft(i, a, n);
    if (l === i) return e;
    const d = [...e.panels];
    return d[s] = l, { ...e, panels: d };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = [...e.children];
  return o[s] = Ft(r, a, n), { ...e, children: o };
}
function jn(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const o = a + r;
  if (o < s * 2) return e;
  const i = [...e], l = Math.min(Math.max(a + n, s), o - s);
  return i[t] = l, i[t + 1] = o - l, i;
}
function cn(e) {
  return !W(e) || e.panels.length >= 2 ? e : { ...Mn([e]), ...fe(e) };
}
function Qn(e) {
  return e.length === 0 ? null : Mn(e.map(Ne));
}
function gi(e, t) {
  if (!e) return Qn(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const l of De(e))
    !n.has(l) || s.has(l) ? a.add(l) : s.add(l);
  let r = e;
  for (const l of a)
    r = r ? et(r, l) : null;
  const o = new Set(r ? De(r) : []), i = t.filter((l) => !o.has(l));
  if (i.length === 0) return r ? cn(pe(r)) : null;
  if (!r) return Qn(i);
  if (G(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...i.map(
          (d, f) => $n(Ne(d), {
            x: rt.x + (l + f) * It,
            y: rt.y + (l + f) * It
          })
        )
      ]
    };
  }
  return cn(pe(Mn([r, ...i.map(Ne)])));
}
const Pn = Symbol("dc.windowContext");
function wi(e) {
  return un(Pn, e), e;
}
function zn() {
  const e = at(Pn, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const yi = ["data-dc-glyph"], bi = { class: "dc-glyph__line" }, ki = ["d"], $i = {
  key: 0,
  class: "dc-glyph__aqua"
}, xi = ["d"], Mi = /* @__PURE__ */ se({
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
      p("g", bi, [
        (m(!0), h(Q, null, ce(t[e.kind], (r) => (m(), h("path", {
          key: r,
          d: r
        }, null, 8, ki))), 128))
      ]),
      n[e.kind] ? (m(), h("g", $i, [
        (m(!0), h(Q, null, ce(n[e.kind], (r) => (m(), h("path", {
          key: r,
          d: r
        }, null, 8, xi))), 128))
      ])) : V("", !0)
    ], 8, yi));
  }
}), st = /* @__PURE__ */ ae(Mi, [["__scopeId", "data-v-4d2872c0"]]), Ci = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Ei = ["data-dc-movable"], Si = { class: "dc-float__title dc-truncate" }, Ai = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Pi = ["aria-label", "aria-pressed", "data-dc-minimize"], zi = ["aria-label", "aria-pressed", "data-dc-maximize"], Fi = ["aria-label", "data-dc-close"], Ri = { class: "dc-float__content" }, Li = ["data-dc-handle", "onPointerdown"], Di = /* @__PURE__ */ se({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = zn(), s = _(() => ye(t.frame.node)), a = _(() => n.panelFor(s.value)?.fixed === !0), r = _(() => Ie(t.frame)), o = _(() => Ue(t.frame)), i = _(() => r.value || o.value), l = _(() => n.resizable.value && !a.value && !i.value), d = _(() => n.movable.value && !a.value && !i.value), f = _(() => {
      const I = De(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), S = _(() => f.value !== null && n.closable(f.value)), y = _(() => t.frame.node.headless === !0), b = _(
      () => !y.value && (!W(t.frame.node) || o.value)
    ), x = _(
      () => t.frame.title || qt(t.frame.node) || gt(t.frame.node, (I) => n.panelFor(I)?.title)
    ), g = _(() => n.spaceMenu(t.path));
    function k(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function z(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const R = _(() => {
      const I = n.framing.value;
      return I !== null && Y(t.frame.node, I);
    }), Z = _(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${an}px`,
        height: `${zs}px`
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
    return (I, w) => (m(), h("div", {
      class: "dc-float",
      style: ze(Z.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": R.value ? "true" : "false",
      onPointerdown: w[3] || (w[3] = (M) => E(n).raiseAt(e.path))
    }, [
      b.value ? (m(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": d.value ? "true" : "false",
        onPointerdown: k,
        onDblclick: z
      }, [
        p("span", Si, C(x.value), 1),
        g.value.length ? (m(), ge(bn, {
          key: 0,
          items: g.value,
          label: `${x.value} menu`
        }, null, 8, ["items", "label"])) : V("", !0),
        !a.value || o.value && S.value && f.value ? (m(), h("div", Ai, [
          a.value ? V("", !0) : (m(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${x.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: w[0] || (w[0] = (M) => E(n).toggleMinimizeAt(e.path))
          }, [
            le(st, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Pi)),
          a.value ? V("", !0) : (m(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${x.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: w[1] || (w[1] = (M) => E(n).toggleMaximizeAt(e.path))
          }, [
            le(st, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, zi)),
          o.value && S.value && f.value ? (m(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${x.value}`,
            "data-dc-close": f.value,
            onClick: w[2] || (w[2] = (M) => E(n).close(f.value))
          }, [
            le(st, { kind: "close" })
          ], 8, Fi)) : V("", !0)
        ])) : V("", !0)
      ], 40, Ei)) : V("", !0),
      p("div", Ri, [
        wt(I.$slots, "default", {}, void 0, !0)
      ]),
      (m(!0), h(Q, null, ce(l.value ? D : [], (M) => (m(), h("span", {
        key: M,
        class: "dc-float__grip",
        "data-dc-handle": M,
        "aria-hidden": "true",
        onPointerdown: Ae((K) => E(n).beginFrameDragAt(e.path, K, M), ["stop"])
      }, null, 40, Li))), 128))
    ], 44, Ci));
  }
}), Ti = /* @__PURE__ */ ae(Di, [["__scopeId", "data-v-f5f7ad79"]]), Fn = Symbol("dc.paneContext");
function Ii(e) {
  return un(Fn, e), e;
}
function zc() {
  return at(Fn, null);
}
function Fc(e) {
  const t = at(Pn, null), n = at(Fn, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => ft(e)
  );
  return da() && fa(s), s;
}
const Ni = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Oi = ["data-dc-movable"], Vi = ["aria-label", "aria-pressed"], Ki = ["aria-label"], qi = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Bi = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Wi = { class: "dc-tab__name dc-truncate" }, Ui = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Hi = ["aria-label", "data-dc-close", "onClick"], Xi = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Gi = { class: "dc-pane__tools" }, Yi = {
  key: 1,
  class: "dc-pane__controls dc-controls"
}, ji = ["aria-label", "data-dc-minimize"], Qi = ["aria-label", "aria-pressed", "data-dc-maximize"], Zi = ["aria-label", "data-dc-close"], Ji = ["id", "role", "aria-labelledby"], ec = ["id", "role", "aria-labelledby"], tc = ["data-dc-edge"], nc = /* @__PURE__ */ se({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = zn(), s = es() ?? "dc-pane", a = _(
      () => t.group.panels.flatMap((F, N) => {
        if (!re(F)) {
          const we = qt(F) || gt(F, (he) => n.panelFor(he)?.title);
          return [{ kind: "space", index: N, id: `space-${N}`, title: we, node: F }];
        }
        const H = n.panelFor(F);
        return H ? [{ kind: "panel", index: N, id: F, title: H.title, panel: H }] : [];
      })
    ), r = _(() => a.value.length > 1), o = _(() => {
      const F = ct(t.group);
      return a.value.find((N) => N.index === F) ?? a.value[0] ?? null;
    }), i = _(() => o.value?.kind === "space" ? o.value.node : null), l = _(() => i.value ? "" : Rs(t.group)), d = _(() => i.value ? null : n.panelFor(l.value)), f = _(() => o.value?.title ?? ""), S = _(() => [...t.path, o.value?.index ?? 0]), y = _(() => l.value || Un(t.group)[0] || ""), b = _(() => n.viewFor(l.value)), x = _(() => t.group.headless === !0), g = _(() => n.focused.value === l.value), k = _(() => n.dragging.value === l.value), z = _(() => n.moving.value === l.value), R = _(() => n.frameOf(y.value) !== null), Z = _(() => n.panelFor(y.value)?.fixed === !0), D = _(
      () => !i.value && (n.canMove(l.value) || R.value && n.movable.value && !Z.value)
    ), I = _(
      () => i.value ? n.spaceMenu(S.value) : n.menuFor(l.value)
    ), w = (F) => n.closable(F);
    Ii({ panel: l });
    const M = _(() => n.maximized(y.value)), K = _(
      () => R.value && !Z.value || !r.value && !!d.value && w(d.value.id)
    ), q = (F) => `${s}-tab-${F}`, te = _(() => `${s}-body`), ve = _(() => {
      const F = n.dropTarget.value;
      return !F || !Me(t.group, F.panel) || F.edge === "float" ? null : F;
    }), $e = _(() => ve.value?.index === void 0 ? ve.value?.edge ?? null : null), T = _(() => ve.value?.index ?? null), U = () => d.value ? n.renderContent(d.value, b.value, g.value) ?? null : null, ne = () => d.value ? n.renderActions(d.value, b.value, g.value) ?? null : null;
    let X = null;
    function oe(F) {
      const N = X !== null && Math.hypot(F.clientX - X.x, F.clientY - X.y) >= 4;
      return X = null, N;
    }
    const be = (F) => F.kind === "panel" ? F.id : ye(F.node);
    function Ee(F, N) {
      N.kind !== "space" && (n.focus(N.id), X = { x: F.clientX, y: F.clientY }, n.beginDrag(N.id, F));
    }
    function Ve(F, N) {
      if (oe(F)) return;
      const H = be(N);
      H && n.selectPanel(H);
    }
    function Ye(F) {
      l.value && n.focus(l.value), !F.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (R.value ? n.beginFrameDrag(y.value, F, "move") : n.beginDrag(l.value, F));
    }
    function Se(F) {
      X = { x: F.clientX, y: F.clientY }, n.beginDrag(l.value, F);
    }
    function Ke(F) {
      oe(F) || n.toggleMoveMode(l.value);
    }
    const xe = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function qe(F) {
      if (!z.value) return;
      if (F.key === "Escape") {
        F.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const N = xe[F.key];
      N && (F.preventDefault(), R.value ? n.nudgeFrame(l.value, N, F.shiftKey) : n.nudge(l.value, N, F.shiftKey));
    }
    function Mt(F) {
      !R.value || F.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(y.value);
    }
    function Bt(F, N) {
      F.stopPropagation(), X = null, n.close(N);
    }
    function Wt(F, N) {
      const H = a.value.length;
      let we = null;
      if (F.key === "ArrowRight" ? we = (N + 1) % H : F.key === "ArrowLeft" ? we = (N - 1 + H) % H : F.key === "Home" ? we = 0 : F.key === "End" && (we = H - 1), we === null) return;
      F.preventDefault();
      const he = a.value[we];
      if (!he) return;
      const ut = be(he);
      ut && n.selectPanel(ut);
    }
    return (F, N) => o.value ? (m(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": E(Un)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": R.value ? "true" : "false",
      "data-dc-maximized": M.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": g.value ? "true" : "false",
      "data-dc-dragging": k.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: N[7] || (N[7] = (H) => l.value && E(n).focus(l.value))
    }, [
      x.value ? V("", !0) : (m(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": D.value ? "true" : "false",
        onPointerdown: Ye,
        onDblclick: Mt
      }, [
        D.value ? (m(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": z.value,
          onPointerdown: Se,
          onClick: Ke,
          onKeydown: qe
        }, [...N[8] || (N[8] = [
          p("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Vi)) : V("", !0),
        p("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (m(!0), h(Q, null, ce(a.value, (H, we) => (m(), h(Q, {
            key: H.id
          }, [
            T.value === we ? (m(), h("span", qi)) : V("", !0),
            p("button", {
              id: q(H.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": H.kind === "panel" ? H.id : void 0,
              "data-dc-space": H.kind === "space" ? H.title : void 0,
              "aria-selected": H.index === o.value.index,
              "aria-controls": te.value,
              tabindex: H.index === o.value.index ? 0 : -1,
              onPointerdown: (he) => Ee(he, H),
              onClick: (he) => Ve(he, H),
              onKeydown: (he) => Wt(he, we)
            }, [
              p("span", Wi, C(H.title), 1),
              H.kind === "panel" && H.panel.subtitle ? (m(), h("span", Ui, C(H.panel.subtitle), 1)) : V("", !0),
              r.value && H.kind === "panel" && w(H.id) ? (m(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${H.title}`,
                "data-dc-close": H.id,
                onPointerdown: N[0] || (N[0] = Ae(() => {
                }, ["stop"])),
                onClick: (he) => Bt(he, H.id)
              }, [...N[9] || (N[9] = [
                p("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Hi)) : V("", !0)
            ], 40, Bi)
          ], 64))), 128)),
          T.value === a.value.length ? (m(), h("span", Xi)) : V("", !0)
        ], 8, Ki),
        p("div", Gi, [
          le(ne),
          I.value.length ? (m(), ge(bn, {
            key: 0,
            items: I.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : V("", !0)
        ]),
        K.value ? (m(), h("div", Yi, [
          R.value && !Z.value ? (m(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: N[1] || (N[1] = Ae(() => {
            }, ["stop"])),
            onClick: N[2] || (N[2] = (H) => E(n).toggleMinimize(y.value))
          }, [
            le(st, { kind: "minimize" })
          ], 40, ji)) : V("", !0),
          R.value && !Z.value ? (m(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${M.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": M.value,
            "data-dc-maximize": y.value,
            onPointerdown: N[3] || (N[3] = Ae(() => {
            }, ["stop"])),
            onClick: N[4] || (N[4] = (H) => E(n).toggleMaximize(y.value))
          }, [
            le(st, {
              kind: M.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Qi)) : V("", !0),
          !r.value && d.value && w(d.value.id) ? (m(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": d.value.id,
            onPointerdown: N[5] || (N[5] = Ae(() => {
            }, ["stop"])),
            onClick: N[6] || (N[6] = (H) => E(n).close(d.value.id))
          }, [
            le(st, { kind: "close" })
          ], 40, Zi)) : V("", !0)
        ])) : V("", !0)
      ], 40, Oi)),
      i.value ? (m(), h("div", {
        key: 1,
        id: te.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : q(o.value.id)
      }, [
        wt(F.$slots, "space", {
          node: i.value,
          path: S.value
        }, void 0, !0)
      ], 8, Ji)) : (m(), h("div", {
        key: 2,
        id: te.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : q(l.value)
      }, [
        le(U)
      ], 8, ec)),
      $e.value ? (m(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": $e.value,
        "aria-hidden": "true"
      }, null, 8, tc)) : V("", !0)
    ], 40, Ni)) : V("", !0);
  }
}), qs = /* @__PURE__ */ ae(nc, [["__scopeId", "data-v-07195c22"]]), sc = ["data-dc-space", "data-dc-path", "aria-label"], ac = {
  key: 0,
  class: "dc-space__head"
}, rc = { class: "dc-space__title dc-truncate" }, lc = ["data-dc-direction"], oc = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], ic = /* @__PURE__ */ se({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = zn(), s = O(null), a = _(() => W(t.node) ? t.node : null), r = _(() => Ge(t.node) ? t.node : null), o = _(() => G(t.node) ? t.node : null), i = _(
      () => r.value ? r.value.children : o.value?.frames.map((T) => T.node) ?? []
    ), l = _(() => r.value ? Xe(r.value) : []), d = _(
      () => (o.value?.frames ?? []).map((T, U) => ({
        held: T,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: U,
        key: I(T.node),
        path: [...t.path, U]
      })).sort((T, U) => T.key < U.key ? -1 : T.key > U.key ? 1 : 0)
    ), f = _(() => qt(t.node)), S = _(() => n.spaceMenu(t.path)), y = _(() => t.node.headless === !0), b = _(() => o.value ? "desktop" : r.value?.direction ?? ""), x = O(null), g = O(0);
    let k = null;
    Ce(
      x,
      (T) => {
        k?.disconnect(), k = null, !(!T || typeof ResizeObserver > "u") && (g.value = T.clientWidth, k = new ResizeObserver(([U]) => {
          g.value = U?.contentRect.width ?? 0;
        }), k.observe(T));
      },
      { immediate: !0 }
    ), Oe(() => k?.disconnect());
    const z = _(() => {
      const T = Math.max(
        1,
        Math.floor((g.value + je) / (an + je))
      ), U = /* @__PURE__ */ new Map();
      let ne = 0;
      for (const X of d.value)
        X.held.minimized === !0 && (U.set(X.key, {
          x: je + ne % T * (an + je),
          bottom: je + Math.floor(ne / T) * (zs + je)
        }), ne += 1);
      return U;
    }), R = _(() => {
      const T = n.dropTarget.value, U = o.value;
      if (!U || !T?.rect || T.edge !== "float") return null;
      const ne = me(U, T.panel);
      return ne && U.frames.includes(ne) ? T.rect : null;
    }), Z = _(() => r.value?.direction === "row"), D = _(() => i.value.map((T, U) => [...t.path, U])), I = (T) => [...De(T)].sort().join("/"), w = (T) => {
      const U = De(T)[0];
      return (U ? n.panelFor(U)?.title : null) ?? U ?? "panel";
    }, M = (T) => {
      const U = i.value[T], ne = i.value[T + 1];
      return !U || !ne ? "Resize panels" : `Resize ${w(U)} and ${w(ne)}`;
    }, K = (T) => {
      const U = l.value[T] ?? 0, ne = l.value[T + 1] ?? 0, X = U + ne;
      return X > 0 ? Math.round(U / X * 100) : 50;
    };
    function q() {
      const T = s.value, U = T ? Z.value ? T.clientWidth : T.clientHeight : 0;
      return U <= 0 ? 0.05 : Math.min(n.minPanelSize.value / U, 0.4);
    }
    let te = null;
    function ve(T, U) {
      const ne = r.value, X = s.value;
      if (!n.resizable.value || !ne || !X || T.button !== 0) return;
      const oe = Z.value ? X.clientWidth : X.clientHeight;
      if (oe <= 0) return;
      const be = Z.value ? T.clientX : T.clientY, Ee = Xe(ne), Ve = Math.min(n.minPanelSize.value / oe, 0.4);
      T.preventDefault();
      const Ye = (xe) => {
        const qe = ((Z.value ? xe.clientX : xe.clientY) - be) / oe;
        n.setSizes(t.path, jn(Ee, U, qe, Ve));
      }, Se = () => te?.(), Ke = (xe) => {
        xe.key === "Escape" && (n.setSizes(t.path, Ee), te?.());
      };
      te = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se), window.removeEventListener("keydown", Ke), te = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Se), window.addEventListener("pointercancel", Se), window.addEventListener("keydown", Ke);
    }
    Oe(() => te?.());
    function $e(T, U) {
      const ne = r.value;
      if (!n.resizable.value || !ne) return;
      const X = Z.value ? "ArrowRight" : "ArrowDown", oe = Z.value ? "ArrowLeft" : "ArrowUp", be = T.shiftKey ? 0.1 : 0.02;
      if (T.key !== X && T.key !== oe) return;
      const Ee = T.key === X ? be : -be;
      T.preventDefault(), n.setSizes(t.path, jn(Xe(ne), U, Ee, q()));
    }
    return (T, U) => {
      const ne = ts("WindowNode", !0);
      return a.value ? (m(), ge(qs, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: Jt(({ node: X, path: oe }) => [
          le(ne, {
            node: X,
            path: oe,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (m(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": b.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !y.value ? (m(), h("header", ac, [
          p("span", rc, C(f.value), 1),
          S.value.length ? (m(), ge(bn, {
            key: 0,
            items: S.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : V("", !0)
        ])) : V("", !0),
        o.value ? (m(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: x,
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
          (m(!0), h(Q, null, ce(d.value, (X) => (m(), ge(Ti, {
            key: X.key,
            frame: X.held,
            path: X.path,
            order: X.order,
            place: z.value.get(X.key) ?? null
          }, {
            default: Jt(() => [
              le(ne, {
                node: X.held.node,
                path: X.path,
                framed: X.held.node.kind !== "group"
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
          (m(!0), h(Q, null, ce(i.value, (X, oe) => (m(), h(Q, {
            key: I(X)
          }, [
            p("div", {
              class: "dc-window__cell",
              style: ze({ flexGrow: l.value[oe] ?? 1 })
            }, [
              le(ne, {
                node: X,
                path: D.value[oe] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            oe < i.value.length - 1 ? (m(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": Z.value ? "vertical" : "horizontal",
              "aria-label": M(oe),
              "aria-valuenow": K(oe),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (be) => ve(be, oe),
              onKeydown: (be) => $e(be, oe)
            }, null, 40, oc)) : V("", !0)
          ], 64))), 128))
        ], 8, lc)) : V("", !0)
      ], 8, sc));
    };
  }
}), cc = /* @__PURE__ */ ae(ic, [["__scopeId", "data-v-2fca5360"]]), uc = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], dc = {
  key: 1,
  class: "dc-window__empty"
}, fc = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, St = 16, pc = /* @__PURE__ */ se({
  __name: "WindowFrame",
  props: /* @__PURE__ */ Dt({
    panels: {},
    movable: { type: Boolean, default: !1 },
    resizable: { type: Boolean, default: !0 },
    minPanelSize: { default: 120 },
    closable: { type: Boolean, default: !1 },
    menu: { type: Boolean, default: !0 },
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
  emits: /* @__PURE__ */ Dt(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Lt(e, "layout"), o = Lt(e, "views"), i = Jn(), l = _(() => new Map(s.panels.map((c) => [c.id, c]))), d = _(() => s.panels.map((c) => c.id)), f = _(() => gi(r.value, d.value)), S = O(null), y = O(null), b = O(null), x = O(!0), g = O(null), k = O(null), z = O(null), R = O(""), Z = O(null);
    function D() {
      const c = Z.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function I(c) {
      const u = [];
      let v = c.closest(".dc-float");
      for (; v; )
        u.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return u;
    }
    function w() {
      return D().map((c) => ({ pane: c, order: I(c.element) })).sort((c, u) => {
        const v = Math.max(c.order.length, u.order.length);
        for (let $ = 0; $ < v; $ += 1) {
          const P = (c.order[$] ?? -1) - (u.order[$] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const M = (c) => D().find((u) => u.panels.includes(c)) ?? null;
    function K(c) {
      const u = l.value.get(c);
      if (!u) return "";
      const v = o.value[c];
      return v && u.views?.some(($) => $.key === v) ? v : u.defaultView ?? u.views?.[0]?.key ?? "";
    }
    function q(c, u) {
      o.value = { ...o.value, [c]: u }, a("view-change", { panel: c, view: u });
    }
    const te = _(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ve(c) {
      return !s.movable || te.value < 1 || s.panels.length < 2 ? !1 : l.value.get(c)?.fixed !== !0;
    }
    function $e(c, u) {
      const v = f.value;
      !c || !v || c === v || (r.value = c, u && a("panel-move", u));
    }
    function T(c, u, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const $ = (u - c.left) / c.width, P = (v - c.top) / c.height, A = 0.3;
      return $ > A && $ < 1 - A && P > A && P < 1 - A ? "center" : [
        { edge: "left", distance: $ },
        { edge: "right", distance: 1 - $ },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (L, J) => J.distance < L.distance ? J : L
      ).edge;
    }
    function U(c, u) {
      const v = [...c.querySelectorAll(".dc-tab")], $ = v.findIndex((P) => {
        const A = P.getBoundingClientRect();
        return u < A.left + A.width / 2;
      });
      return $ === -1 ? v.length : $;
    }
    function ne(c, u, v) {
      for (const { panels: $, element: P } of w().reverse()) {
        const A = P.getBoundingClientRect();
        if (c < A.left || c > A.right || u < A.top || u > A.bottom) continue;
        const j = $.find((ee) => ee !== v), L = P.querySelector(".dc-pane__tabs"), J = L?.getBoundingClientRect();
        if (L && J && u >= J.top && u <= J.bottom)
          return j ? { panel: j, edge: "center", index: U(L, c) } : null;
        const B = P.querySelector(":scope > .dc-pane__space");
        if (B) {
          const ee = B.getBoundingClientRect();
          if (c >= ee.left && c <= ee.right && u >= ee.top && u <= ee.bottom) continue;
        }
        return j ? { panel: j, edge: T(A, c, u) } : null;
      }
      return oe(c, u, v);
    }
    function X() {
      const c = Z.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((u) => u.closest(".dc-window") === c).reverse() : [];
    }
    function oe(c, u, v) {
      const $ = f.value;
      if (!$) return null;
      for (const P of X()) {
        const A = P.getBoundingClientRect();
        if (c < A.left || c > A.right || u < A.top || u > A.bottom) continue;
        const j = be(P).flatMap((B) => B.panels).find((B) => B !== v);
        if (!j) return null;
        const L = me($, v)?.rect, J = Yt(
          {
            x: c - A.left - 24,
            y: u - A.top - 12,
            w: L?.w ?? rt.w,
            h: L?.h ?? rt.h
          },
          { w: P.clientWidth, h: P.clientHeight },
          s.minPanelSize
        );
        return { panel: j, edge: "float", rect: J };
      }
      return null;
    }
    function be(c) {
      return D().filter(
        (u) => u.element.closest(".dc-window__desktop") === c
      );
    }
    let Ee = null;
    const Ve = (c) => c.altKey;
    function Ye(c, u) {
      if (!ve(c) || y.value || k.value || u.button !== 0) return;
      const v = u.clientX, $ = u.clientY;
      let P = !1, A = Ve(u);
      const j = () => {
        const ie = z.value;
        ie && (b.value = A ? oe(ie.x, ie.y, c) : ne(ie.x, ie.y, c));
      }, L = (ie) => {
        if (!P) {
          if (Math.hypot(ie.clientX - v, ie.clientY - $) < 4) return;
          P = !0, y.value = c, g.value = null;
        }
        A = Ve(ie), x.value = !A, z.value = { x: ie.clientX, y: ie.clientY }, j();
      }, J = (ie) => {
        Ve(ie) !== A && (A = !A, x.value = !A, P && j());
      }, B = (ie) => {
        Ee?.();
        const de = b.value, Be = f.value;
        if (ie && P && de && Be) {
          const Ct = de.edge === "float" && de.rect ? Gn(Be, c, de.panel, de.rect) : Et(Be, c, de.panel, de.edge, de.index);
          $e(Ct, {
            panel: c,
            target: de.panel,
            edge: de.edge,
            ...de.index === void 0 ? {} : { index: de.index },
            ...de.rect === void 0 ? {} : { rect: de.rect }
          });
        }
        y.value = null, b.value = null, z.value = null, x.value = !0;
      }, ee = () => B(!0), ue = () => B(!1), _e = (ie) => {
        if (ie.key === "Escape") {
          B(!1);
          return;
        }
        J(ie);
      };
      Ee = () => {
        window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", ee), window.removeEventListener("pointercancel", ue), window.removeEventListener("keydown", _e), window.removeEventListener("keyup", J), Ee = null;
      }, window.addEventListener("pointermove", L), window.addEventListener("pointerup", ee), window.addEventListener("pointercancel", ue), window.addEventListener("keydown", _e), window.addEventListener("keyup", J);
    }
    Oe(() => Ee?.());
    let Se = null;
    function Ke(c) {
      const u = Z.value;
      return u ? [...u.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((P) => P.closest(".dc-window") === u)?.parentElement ?? null : null;
    }
    function xe(c) {
      const u = f.value;
      return u ? ln(u, c) : null;
    }
    function qe(c) {
      const u = f.value;
      if (!u) return;
      const v = ht(u, c);
      v !== u && (r.value = v);
    }
    function Mt(c) {
      const u = xe(c);
      u && qe(u);
    }
    function Bt(c) {
      const u = f.value, v = u ? me(u, c) : null;
      return v !== null && Ie(v);
    }
    function Wt(c) {
      const u = f.value, v = u ? me(u, c) : null;
      return v !== null && Ue(v);
    }
    function F(c) {
      const u = f.value, v = u ? We(u, c) : null;
      return v ? ye(v.node) : "";
    }
    function N(c) {
      const u = f.value, v = u ? We(u, c) : null;
      if (!u || !v) return;
      const $ = ye(v.node);
      if (l.value.get($)?.fixed === !0) return;
      const P = !Ue(v);
      let A = fi(u, c, P);
      A !== u && (P || (A = ht(A, c)), r.value = A, a("frame-minimize", { panel: $, minimized: P }));
    }
    function H(c) {
      const u = xe(c);
      u && N(u);
    }
    function we(c) {
      const u = f.value, v = u ? We(u, c) : null;
      if (!u || !v) return;
      const $ = ye(v.node);
      if (l.value.get($)?.fixed === !0) return;
      const P = !Ie(v);
      let A = di(u, c, P);
      A !== u && (P && (A = ht(A, c)), r.value = A, a("frame-maximize", { panel: $, maximized: P }));
    }
    function he(c) {
      const u = xe(c);
      u && we(u);
    }
    function ut(c, u, v) {
      const $ = f.value, P = $ ? We($, c) : null;
      if (!$ || !P || u.button !== 0 || y.value || k.value) return;
      const A = ye(P.node);
      if (l.value.get(A)?.fixed === !0 || Ie(P) || Ue(P) || (v === "move" ? !s.movable : !s.resizable)) return;
      const j = Ke(c), L = pi($, c);
      qe(c);
      const J = { w: j?.clientWidth ?? 0, h: j?.clientHeight ?? 0 }, B = { ...P.rect }, ee = u.clientX, ue = u.clientY, _e = s.minPanelSize;
      k.value = A;
      const ie = (Fe) => {
        const Re = f.value;
        if (!Re) return;
        const dt = Xn(Re, L, Yt(Fe, J, _e));
        dt !== Re && (r.value = dt);
      }, de = (Fe) => {
        Fe.preventDefault();
        const Re = Fe.clientX - ee, dt = Fe.clientY - ue;
        ie(
          v === "move" ? { ...B, x: B.x + Re, y: B.y + dt } : Hn(B, v, Re, dt, _e)
        );
      }, Be = (Fe) => {
        if (Se?.(), k.value = null, !Fe) {
          ie(B);
          return;
        }
        const Re = f.value ? We(f.value, L) : null;
        Re && a("frame-change", { panel: F(L), rect: Re.rect });
      }, Ct = () => Be(!0), In = () => Be(!1), Nn = (Fe) => {
        Fe.key === "Escape" && Be(!1);
      };
      Se = () => {
        window.removeEventListener("pointermove", de), window.removeEventListener("pointerup", Ct), window.removeEventListener("pointercancel", In), window.removeEventListener("keydown", Nn), Se = null;
      }, window.addEventListener("pointermove", de), window.addEventListener("pointerup", Ct), window.addEventListener("pointercancel", In), window.addEventListener("keydown", Nn);
    }
    function Bs(c, u, v) {
      const $ = xe(c);
      $ && ut($, u, v);
    }
    function Ws(c, u, v = !1) {
      const $ = f.value, P = xe(c), A = $ && P ? We($, P) : null;
      if (!$ || !P || !A || l.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Ie(A) || Ue(A)) {
        R.value = `${Pe(c)} is ${Ie(A) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const j = u === "left" ? -St : u === "right" ? St : 0, L = u === "up" ? -St : u === "down" ? St : 0, J = Ke(P), B = { w: J?.clientWidth ?? 0, h: J?.clientHeight ?? 0 }, ee = v ? Hn(A.rect, "se", j, L, s.minPanelSize) : { ...A.rect, x: A.rect.x + j, y: A.rect.y + L }, ue = Xn($, P, Yt(ee, B, s.minPanelSize));
      if (ue === $) {
        R.value = v ? `${Pe(c)} cannot be resized further.` : `${Pe(c)} cannot move ${u}.`;
        return;
      }
      r.value = ue;
      const _e = We(ue, P);
      _e && (a("frame-change", { panel: c, rect: _e.rect }), R.value = v ? `${Pe(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${Pe(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    Oe(() => Se?.());
    function Us(c, u) {
      const v = M(c), $ = v?.element.getBoundingClientRect();
      if (!v || !$) return null;
      const P = u === "left" || u === "right";
      let A = null;
      for (const j of D()) {
        if (j === v || j.element === v.element) continue;
        const L = j.element.getBoundingClientRect();
        if (!(P ? L.bottom > $.top + 1 && L.top < $.bottom - 1 : L.right > $.left + 1 && L.left < $.right - 1)) continue;
        const B = u === "left" ? $.left - L.right : u === "right" ? L.left - $.right : u === "up" ? $.top - L.bottom : L.top - $.bottom;
        if (B < -1) continue;
        const ee = j.panels.find((ue) => ue !== c);
        ee && (!A || B < A.distance) && (A = { id: ee, distance: B });
      }
      return A?.id ?? null;
    }
    function Hs(c) {
      const u = f.value ? me(f.value, c) !== null : !1;
      if (!u && !ve(c)) return;
      g.value = g.value === c ? null : c;
      const v = Pe(c);
      if (!g.value) {
        R.value = `${v}: move mode off.`;
        return;
      }
      R.value = u ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Pe = (c) => l.value.get(c)?.title ?? c, Xs = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Gs(c, u, v = !1) {
      if (!ve(c)) return;
      const $ = f.value;
      if (!$) return;
      const P = Pe(c), A = Ze($, c);
      if (!v && A && (u === "left" || u === "right") && A.panels.length > 1) {
        const ee = A.panels.indexOf(c), ue = u === "left" ? ee - 1 : ee + 1;
        if (ue >= 0 && ue < A.panels.length) {
          $e(_t($, c, ue), { panel: c, target: c, edge: "center", index: ue }), R.value = `${P} moved ${u}, now tab ${ue + 1} of ${A.panels.length}.`, Rn(c);
          return;
        }
      }
      const L = Us(c, u);
      if (!L || !ve(L)) {
        R.value = `${P} cannot move ${u}.`;
        return;
      }
      const J = Xs[u], B = A?.panels.length === 1 && Ze($, L)?.panels.length === 1;
      v ? ($e(Et($, c, L, "center"), {
        panel: c,
        target: L,
        edge: "center"
      }), R.value = `${P} joined ${Pe(L)} as a tab.`) : B ? ($e(zt($, c, L), { panel: c, target: L, edge: J }), R.value = `${P} moved ${u}, trading places with ${Pe(L)}.`) : ($e(Et($, c, L, J), { panel: c, target: L, edge: J }), R.value = `${P} moved ${u}, beside ${Pe(L)}.`), Rn(c);
    }
    function Rn(c) {
      yt(() => {
        M(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Ys(c, u) {
      const v = f.value;
      v && (r.value = Ft(v, c, u));
    }
    function Ut(c) {
      const u = f.value;
      if (!u) return;
      const v = tt(u, c);
      v !== u && (r.value = v, a("tab-select", { panel: c }));
    }
    function Ln(c) {
      return l.value.get(c)?.closable ?? s.closable;
    }
    function js(c) {
      Ln(c) && a("panel-close", c);
    }
    const Ht = O(/* @__PURE__ */ new Map());
    let Qs = 0;
    function Zs(c, u) {
      const v = Qs += 1;
      return Ht.value.set(v, { panel: c, items: u }), () => {
        Ht.value.delete(v);
      };
    }
    function Js(c) {
      const u = [];
      for (const v of Ht.value.values())
        v.panel() === c && u.push(...v.items());
      return u;
    }
    function ea(c, u) {
      const v = u.id, $ = Ze(c, v), P = ($?.panels.length ?? 0) > 1, A = $?.fixedView === !0, j = (B) => ({
        disabled: B === c,
        action: () => {
          B !== c && (r.value = B);
        }
      }), L = [], J = u.views ?? [];
      if (J.length > 1 && !A) {
        const B = K(v);
        L.push({
          id: "view",
          label: "View",
          items: J.map((ee) => ({
            id: `view-${ee.key}`,
            label: ee.label,
            checked: ee.key === B,
            action: () => q(v, ee.key)
          }))
        });
      }
      return P && !A && (L.length && L.push({ separator: !0 }), L.push(
        { id: "show-row", label: "Row", checked: !1, ...j(Yn(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...j(Yn(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs.
        { id: "show-tabs", label: "Tabs", checked: !0, disabled: !0 },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...j(hi(c, v))
        }
      )), P && $ && (L.length && L.push({ separator: !0 }), L.push(...Dn($, v))), L;
    }
    function Dn(c, u) {
      const v = ct(c), $ = (P) => {
        const A = c.panels[(v + P + c.panels.length) % c.panels.length];
        return (A === void 0 ? "" : ye(A)) || u;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Ut($(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Ut($(-1)) }
      ];
    }
    function ta(c) {
      const u = f.value;
      if (!s.menu || !u) return [];
      const v = ot(u, c);
      if (!v || W(v)) return [];
      if (v.fixedView) return [];
      const $ = G(v) ? "desktop" : v.direction, P = Ge(v) && v.children.length === 1, A = (B, ee, ue) => $ === B || P && B !== "desktop" ? { id: `show-${B}`, label: ee, checked: $ === B, disabled: !0 } : {
        id: `show-${B}`,
        label: ee,
        checked: !1,
        action: () => {
          const _e = f.value;
          _e && (r.value = cn(pe(nt(_e, c, ue()))));
        }
      }, j = (B) => () => G(v) ? Ks(v, B) : { ...v, direction: B }, L = c.length > 0 ? ot(u, c.slice(0, -1)) : null, J = L && W(L) && L.panels.length > 1 ? [{ separator: !0 }, ...Dn(L, ye(v))] : [];
      return [
        A("row", "Row", j("row")),
        A("column", "Column", j("column")),
        // Everything in this space in one strip: the panes as tabs, and a desktop
        // among them as a tab of its own, keeping the windows on it.
        A("tabs", "Tabs", () => Os(v, na(v))),
        A("desktop", "Desktop", () => G(v) ? v : Vs(v)),
        ...J
      ];
    }
    function na(c) {
      const u = S.value;
      return u && Y(c, u) ? u : void 0;
    }
    function sa(c) {
      const u = f.value, v = l.value.get(c);
      if (!u || !v) return [];
      const $ = Js(c);
      if (s.menu) {
        const P = ea(u, v);
        $.length && P.length && $.push({ separator: !0 }), $.push(...P);
      }
      return s.paneMenu ? s.paneMenu(v, $) : $;
    }
    function aa(c, u) {
      return i[`${c}-${u}`] ?? i[c];
    }
    function Tn(c, u, v, $) {
      return aa(c, u.id)?.({ panel: u, view: v, active: $ });
    }
    wi({
      panelFor: (c) => l.value.get(c) ?? null,
      viewFor: K,
      setView: q,
      movable: _(() => s.movable),
      resizable: _(() => s.resizable),
      minPanelSize: _(() => s.minPanelSize),
      focused: S,
      dragging: y,
      dropTarget: b,
      moving: g,
      framing: k,
      canMove: ve,
      focus(c) {
        S.value !== c && (S.value = c, a("panel-activate", c));
      },
      selectPanel: Ut,
      beginDrag: Ye,
      toggleMoveMode: Hs,
      nudge: Gs,
      setSizes: Ys,
      frameOf: (c) => f.value ? me(f.value, c) : null,
      beginFrameDrag: Bs,
      nudgeFrame: Ws,
      raise: Mt,
      maximized: Bt,
      toggleMaximize: he,
      minimized: Wt,
      toggleMinimize: H,
      beginFrameDragAt: ut,
      raiseAt: qe,
      toggleMaximizeAt: we,
      toggleMinimizeAt: N,
      menuFor: sa,
      spaceMenu: ta,
      registerMenu: Zs,
      closable: Ln,
      close: js,
      renderContent: (c, u, v) => Tn("panel", c, u, v),
      renderActions: (c, u, v) => Tn("actions", c, u, v),
      layout: f
    });
    const ra = _(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), la = () => {
      const c = y.value, u = z.value;
      return !c || !u ? null : pa(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${u.x}px`, top: `${u.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: f,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, u, v, $) {
        const P = f.value;
        P && $e(Et(P, c, u, v, $), {
          panel: c,
          target: u,
          edge: v,
          ...$ === void 0 ? {} : { index: $ }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const u = f.value;
        u && (r.value = tt(u, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, u, v) {
        const $ = f.value;
        $ && $e(Gn($, c, u, v), {
          panel: c,
          target: u,
          edge: "float",
          rect: v
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, u) {
        const v = f.value;
        if (!v) return;
        const $ = ii(v, c, u);
        if ($ === v) return;
        r.value = $;
        const P = me($, c);
        P && a("frame-change", { panel: c, rect: P.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: q,
      /** Brings a floating frame to the front of its stack. */
      raise: Mt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: he,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: H
    }), (c, u) => (m(), h("div", {
      ref_key: "root",
      ref: Z,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": x.value ? "true" : "false",
      style: ze(ra.value)
    }, [
      f.value ? (m(), ge(cc, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (m(), h("p", dc, " This window has no panels. ")),
      le(la),
      p("p", fc, C(R.value), 1)
    ], 12, uc));
  }
}), vc = /* @__PURE__ */ ae(pc, [["__scopeId", "data-v-cb65424f"]]);
function Rc(e = "", t = "/") {
  const n = O(Le(e)), s = O(t), a = [`${s.value}${n.value}`];
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
function Zn(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Le(s === -1 ? n : n.slice(0, s));
}
function Lc(e) {
  const t = O(Zn(e.currentRoute.value.fullPath)), n = _(() => e.currentRoute.value.path), s = Ce(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Zn(a);
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
const mc = {
  DataShell: Wo,
  ShellHeader: hs,
  QueryPanel: gs,
  ResultsArea: Ss,
  FacetControl: _s,
  SegmentedControl: nn,
  StatusPill: bt,
  ScoreMeter: xs,
  WindowFrame: vc,
  WindowPane: qs,
  ListView: sn,
  CardsView: bs,
  GridView: ks,
  TableView: Cs,
  LinksView: $s,
  PreviewView: Ms,
  TypeCardsView: Es
}, Dc = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(mc))
      e.component(`${n}${s}`, a);
    t.route && e.provide(ns, t.route);
  }
};
export {
  It as CASCADE_STEP,
  bs as CardsView,
  rt as DEFAULT_FRAME,
  gc as DEFAULT_SORT,
  ma as DEFAULT_VIEW,
  Wo as DataShell,
  fs as ENTITY_ALL,
  tn as ENTITY_TERM,
  wn as FACET_PREFIX,
  _s as FacetControl,
  ws as GENERIC_LABELS,
  ks as GridView,
  Dc as HeaderContentLayoutPlugin,
  $s as LinksView,
  sn as ListView,
  je as MINIMIZED_GAP,
  zs as MINIMIZED_HEIGHT,
  an as MINIMIZED_WIDTH,
  Ps as MIN_FRAME,
  qn as MOCK_TINTS,
  yc as MenuBar,
  bn as MenuButton,
  As as MenuList,
  Fn as PANE_CONTEXT_KEY,
  _n as PARAM_DIR,
  vn as PARAM_ENTITY,
  gn as PARAM_EXPR,
  hn as PARAM_SORT,
  mn as PARAM_VIEW,
  yn as PinStar,
  Ms as PreviewView,
  gs as QueryPanel,
  On as RECORD_STATUSES,
  ns as ROUTE_ADAPTER_KEY,
  Ss as ResultsArea,
  ds as SHELL_CONTEXT_KEY,
  _c as SHELL_THEMES,
  xs as ScoreMeter,
  nn as SegmentedControl,
  hs as ShellHeader,
  bt as StatusPill,
  Cs as TableView,
  Es as TypeCardsView,
  ss as VIEW_KINDS,
  Pn as WINDOW_CONTEXT_KEY,
  vc as WindowFrame,
  qs as WindowPane,
  Rs as activePanel,
  ct as activeTab,
  li as axisOf,
  Vt as cascade,
  Yt as clampRect,
  Os as collapseSpace,
  Sc as collapseToTabs,
  kc as column,
  va as createHistoryAdapter,
  Rc as createMemoryAdapter,
  Sa as createMockDataSource,
  Lc as createVueRouterAdapter,
  Qn as defaultLayout,
  pn as defaultQuery,
  Tt as emptyFacetState,
  dn as emptyFacetValue,
  Qe as findEntity,
  He as findSort,
  xc as fixedView,
  Fs as float,
  Gn as floatPanel,
  Vs as floatSplit,
  hi as floatTabs,
  Vn as fnv1a,
  rs as focusEntity,
  ka as formatDate,
  Kn as formatMetric,
  $a as formatOrdinal,
  us as formatPercent,
  $n as frame,
  We as frameAt,
  me as frameOf,
  ln as framePathOf,
  ye as frontPanel,
  Ma as generateRows,
  bc as group,
  Ze as groupOf,
  oi as groups,
  is as hasActiveFacets,
  Y as hasPanel,
  $c as headless,
  pt as insertPanel,
  mt as isChoosable,
  wc as isEntityScoped,
  os as isFacetActive,
  G as isFloat,
  W as isGroup,
  Ie as isMaximized,
  Ue as isMinimized,
  re as isPanelTab,
  fn as isPristineQuery,
  Ge as isSplit,
  Me as isTabOf,
  as as isViewKind,
  ba as matchesExpression,
  Ca as matchesFacets,
  ci as maximizeFrame,
  di as maximizeFrameAt,
  ui as minimizeFrame,
  fi as minimizeFrameAt,
  Et as movePanel,
  _t as moveTab,
  ot as nodeAt,
  gt as nodeTitle,
  pe as normalizeLayout,
  Le as normalizeSearch,
  Sn as normalizeSizes,
  De as panelIds,
  Ne as panelNode,
  Un as panelTabs,
  ga as parseExpression,
  Da as parseQuery,
  ys as presentRow,
  Ii as providePaneContext,
  Aa as provideShellContext,
  wi as provideWindowContext,
  jt as raiseFrame,
  ht as raiseFrameAt,
  pi as raisedPath,
  cs as reconcileFacets,
  gi as reconcileLayout,
  et as removePanel,
  nt as replaceAt,
  Hn as resizeRect,
  jn as resizeSplit,
  cn as rootSpace,
  Mn as row,
  Wn as serializeQuery,
  tt as setActivePanel,
  ii as setFrameRect,
  Xn as setFrameRectAt,
  Ft as setSizesAt,
  Ec as setSplitDirection,
  Xe as sizesOf,
  ls as sortsFor,
  fe as spaceChrome,
  qt as spaceTitle,
  xn as split,
  Yn as spreadTabs,
  Ia as summarizeQuery,
  ms as summaryTerms,
  zt as swapPanels,
  kn as tabNode,
  Ot as tabPanels,
  Ks as tileFloat,
  Ac as toFloat,
  Pc as toTiled,
  Mc as toggleMaximized,
  Cc as toggleMinimized,
  po as useEntityPreviews,
  zc as usePaneContext,
  Fc as usePaneMenu,
  it as usePresentedRows,
  Na as useQueryState,
  Oa as useResults,
  ke as useShellContext,
  Br as useViewLabels,
  zn as useWindowContext
};
