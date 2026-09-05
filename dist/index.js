import { ref as B, inject as _t, provide as Pn, computed as g, toValue as Mt, shallowRef as Xt, watch as $e, onScopeDispose as zs, defineComponent as ue, onBeforeUnmount as Ue, openBlock as p, createElementBlock as _, createElementVNode as y, toDisplayString as z, createCommentVNode as I, unref as E, Fragment as Y, renderList as ce, renderSlot as Be, withDirectives as hn, withKeys as Yt, withModifiers as qe, vModelText as _n, normalizeClass as Qt, useSlots as An, nextTick as zt, createBlock as oe, createVNode as pe, createTextVNode as Re, withCtx as gt, normalizeStyle as Pe, resolveDynamicComponent as Rs, useModel as Zt, useId as Ts, createSlots as ds, mergeModels as Jt, onMounted as Xa, resolveComponent as Fs, getCurrentScope as Ya, h as Qa } from "vue";
import { r as ze, c as Le, a as Ls, f as Ht, b as un, e as Ds, g as zn, h as Za, i as Ja, j as el, k as gn, l as Ns, m as fs, n as ps, o as vs } from "./columns.js";
import { E as Ju, G as ed, p as td, d as nd, q as sd, s as ad } from "./columns.js";
const Is = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function tl() {
  const e = typeof window < "u", t = B(e ? We(window.location.search) : ""), n = B(e ? window.location.pathname : "/"), s = () => {
    t.value = We(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (l, o) => {
    const i = We(l);
    if (!e) {
      t.value = i;
      return;
    }
    const r = `${window.location.pathname}${i}${window.location.hash}`;
    o === "push" ? window.history.pushState(window.history.state, "", r) : window.history.replaceState(window.history.state, "", r), t.value = i, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    push: (l) => a(l, "push"),
    replace: (l) => a(l, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", s);
    }
  };
}
const Os = ["list", "cards", "grid", "table", "links", "preview"], Ru = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], qt = ["ok", "running", "queued", "review", "failed"], Tu = [
  "identity",
  "reference",
  "metric",
  "state",
  "score",
  "updated",
  "tint"
], Fu = [480, 620, 760, 900, 1100], nl = "cards", yn = "updated";
function Vs(e) {
  return typeof e == "string" && Os.includes(e);
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Ks(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function qs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Bs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of qs(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const sl = { key: yn, label: yn };
function lt(e, t, n = null) {
  const s = Bs(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === yn) ?? s[0] ?? sl;
}
function Rn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function en(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Rn(n);
  return t;
}
function Ws(e) {
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
function Hs(e) {
  return Object.values(e).some(Ws);
}
function Tn(e) {
  return e.entity === null && e.expr.trim() === "" && !Hs(e.facets);
}
function Lu(e) {
  return e.entity !== null;
}
function Us(e) {
  return e.entity === null && e.view === "cards";
}
function al(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Fn(e, t = {}) {
  const s = t.landing === "entity" ? Ks(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Vs(t.view) ? t.view : nl,
    sort: lt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: en(s),
    page: 1
  };
}
const js = ["entity", "sort", "dir", "expr", "facets"];
function ms(e) {
  return js.some((t) => t in e);
}
function Gs(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Rn(s);
  }
  return n;
}
const ll = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function rl(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const o = e[l];
    if (s) {
      o === s ? s = null : n += o;
      continue;
    }
    if (o === '"' || o === "'") {
      s = o;
      continue;
    }
    if (/\s/.test(o)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += o;
  }
  return a(), t;
}
function Rt(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of rl(t)) {
    const l = a.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const o = ll.exec(a);
    o && o[3] !== "" ? s.push({
      kind: "field",
      field: o[1].toLowerCase(),
      comparator: o[2],
      value: o[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const dn = (e) => e.toLowerCase().replace(/\s+/g, ""), ol = [
  ["status", "state"],
  ["state", "state"],
  ["score", "score"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function il(e, t, n) {
  const s = dn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && dn(u.label) === s
  );
  if (l) return Le(l, t);
  const o = n.facets.find((u) => dn(u.label) === s);
  if (o && o.key in t.fields) return t.fields[o.key];
  const i = ol.find(([u]) => u === s)?.[1];
  if (i) {
    const u = ze(a, i);
    if (u) return Le(u, t);
  }
  const r = /^metric(\d+)$/.exec(s);
  if (r) {
    const u = Ls(a, "metric")[Number(r[1]) - 1];
    if (u) return Le(u, t);
  }
}
function fn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function cl(e, t, n) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const r = ze(o, i), u = r ? Le(r, t) : void 0;
      return typeof u == "string" && fn(u, e.value);
    });
  }
  const s = il(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((i) => fn(String(i), e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? s : o === "false" || o === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? s === o : !0;
    }
    return fn(String(s), e.value);
  }
  const a = Number(e.value), l = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(l) ? !0 : ul(e.comparator, l, a);
}
function ul(e, t, n) {
  switch (e) {
    case ">":
      return t > n;
    case ">=":
      return t >= n;
    case "<":
      return t < n;
    case "<=":
      return t <= n;
    default:
      return t === n;
  }
}
function dl(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => cl(a, t, n))) : !0;
}
function hs(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Xs(e) {
  return e.kind === "text" ? hs(e.value) : `${e.field}${e.comparator}${hs(e.value)}`;
}
function fl(e) {
  return e.filter((t) => t.length).map((t) => t.map(Xs).join(" ")).join(" OR ");
}
function pl(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, o) => o !== n) : s).filter((s) => s.length);
}
const _s = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Ys(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const vl = 7, ml = 3;
function hl(e, t, n, s) {
  const a = (t * vl + Ht(n)) % s, l = [];
  for (let o = 0; o < Math.min(ml, s); o++)
    l.push(Ys(e, (a + o) % s));
  return l;
}
function _l(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? gl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function gl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) a.add((s + l) % e.length);
  return [...a].sort((l, o) => l - o).map((l) => e[l]);
}
function yl(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: l } = t, o = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${o}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return qt[n % qt.length];
    case "score":
      return Number((0.35 + n % 64 / 100).toFixed(3));
    case "updated":
      return l;
    case "tint":
      return _s[n % _s.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return qt[n % qt.length];
    case "score":
      return Number((0.35 + n % 64 / 100).toFixed(3));
    case "date":
      return l;
    default:
      return;
  }
}
function wl(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const u = l[r % l.length], f = Math.floor(r / l.length), w = Ht(`${s}:${e.key}:${u[0]}:${r}`), b = Ys(e.key, r), m = new Date(a.getTime() - w % 900 * 36e5).toISOString(), $ = {};
    for (const x of e.columns ?? []) {
      const h = x.field ?? x.key;
      if (!h || x.value) continue;
      const k = yl(x, {
        hash: Ht(`${w}:${h}`),
        sample: u,
        revision: f,
        updatedAt: m
      });
      k !== void 0 && ($[h] = k);
    }
    for (const x of e.facets)
      $[x.key] = _l(x, Ht(`${w}:${x.key}`));
    for (const [x, h] of o)
      $[x] = h === e.key ? b : hl(h, r, x, n);
    i.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: $ });
  }
  return i;
}
function bl(e, t) {
  for (const [n, s] of Object.entries(t)) {
    const a = e.fields[n];
    switch (s.kind) {
      case "chips": {
        if (!s.selected.length) break;
        if (Array.isArray(a)) {
          if (!a.some((l) => s.selected.includes(String(l)))) return !1;
          break;
        }
        if (typeof a != "string" || !s.selected.includes(a)) return !1;
        break;
      }
      case "range": {
        if (s.min === null && s.max === null) break;
        const l = typeof a == "number" ? a : Number(a);
        if (!Number.isFinite(l) || s.min !== null && l < s.min || s.max !== null && l > s.max) return !1;
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
function kl(e, t) {
  const n = e.find((o) => o.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || s === "score" || n.role === "metric" || n.role === "score", l = s === "date" || n.role === "updated";
  return (o, i) => {
    const r = Le(n, o), u = Le(n, i);
    return a ? Number(u ?? 0) - Number(r ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(r ?? "")) : String(u ?? "").localeCompare(String(r ?? ""));
  };
}
function $l(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const o = e.scopes ?? a.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = wl(s, { ...e, scopes: o });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: o, offset: i }) {
      const r = Rt(s.expr), u = l ? [l] : a.entities, f = [], w = [];
      for (const $ of u)
        for (const x of n($, a))
          f.push(x), (l ? bl(x, s.facets) : !0) && dl(r, x, $) && w.push(x);
      const b = lt(l, s.sort, a), m = w.sort(kl(qs(l, a), b.key));
      return s.dir === "asc" && m.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: m.slice(i, i + o),
        total: w.length,
        unfiltered: w.length === f.length
      };
    }
  };
}
function xl(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.id.replace(/"/g, "")}"` : null;
}
function Ml(e, t) {
  return xl(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
const gs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Cl(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && gs(e.value, t.value) : t.kind === "text" && gs(e.value, t.value);
}
function El(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = Rt(t).flat();
  return s ? Rt(n).some(
    (l) => l.some((o) => Cl(o, s))
  ) ? n : `${n} ${t}` : n;
}
function Sl(e, t, n) {
  return El(t.expr, Ml(e, n));
}
const Qs = Symbol("dc.shellContext");
function Pl(e) {
  return Pn(Qs, e), e;
}
function ye() {
  const e = _t(Qs, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Ln = "e", Dn = "v", Nn = "s", In = "d", On = "q", Vn = "p", Kn = "f_", Zs = "*", Al = [
  Ln,
  Dn,
  Nn,
  In,
  On,
  Vn
], wn = "..", Js = ",", zl = [
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
function pn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of zl) t = t.replace(n, s);
  return t;
}
function Ke(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ea(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), l = a === -1 ? s : s.slice(0, a), o = a === -1 ? "" : s.slice(a + 1);
    n.push([Ke(l), o]);
  }
  return n;
}
function Rl(e) {
  return Al.includes(e) || e.startsWith(Kn);
}
function ys(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Tl(e, t) {
  const n = Ke(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(Js).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => s.has(l)) };
    }
    case "range": {
      const s = n.indexOf(wn), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + wn.length)).trim(), o = a === "" ? null : Number(a), i = l === "" ? null : Number(l);
      let r = o !== null && Number.isFinite(o) ? ys(o, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? ys(i, e.min, e.max) : null;
      return r !== null && u !== null && r > u && ([r, u] = [u, r]), { kind: "range", min: r, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Fl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(Js) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${wn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Ll(e, t, n = {}) {
  const s = Fn(t, n), a = new Map(ea(e)), l = a.get(Ln), o = l === void 0 ? s.entity : Ke(l), i = o === Zs ? null : ft(t, o), r = a.get(Dn), u = r && Vs(Ke(r)) ? Ke(r) : s.view, f = a.get(Nn), w = lt(i, f ? Ke(f) : n.sort, t), b = a.get(In), m = b ? Ke(b) === "asc" ? "asc" : "desc" : s.dir, $ = a.get(On), x = a.get(Vn), h = x === void 0 ? 1 : Number(Ke(x)), k = Number.isFinite(h) ? Math.max(1, Math.floor(h)) : 1, S = {};
  for (const N of i?.facets ?? []) {
    const T = a.get(`${Kn}${N.key}`);
    S[N.key] = T === void 0 ? Rn(N) : Tl(N, T);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: w.key,
    dir: m,
    expr: $ === void 0 ? "" : Ke($),
    facets: Gs(i, S),
    page: k
  };
}
function ws(e, t, n = {}, s = "") {
  const a = Fn(t, n), l = ft(t, e.entity), o = ea(s).filter(([w]) => !Rl(w)), i = [], r = (w, b) => i.push([w, pn(b)]), u = l?.key ?? null;
  u !== a.entity && r(Ln, u ?? Zs), e.view !== a.view && r(Dn, e.view), e.sort !== a.sort && r(Nn, e.sort), e.dir !== a.dir && r(In, e.dir), e.expr.trim() !== "" && r(On, e.expr);
  for (const w of l?.facets ?? []) {
    const b = e.facets[w.key];
    if (!b) continue;
    const m = Fl(b, w);
    m !== null && i.push([`${Kn}${w.key}`, pn(m)]);
  }
  e.page > 1 && r(Vn, String(e.page));
  const f = [
    ...o.map(([w, b]) => [pn(w), b]),
    ...i
  ];
  return f.length ? `?${f.map(([w, b]) => b === "" ? w : `${w}=${b}`).join("&")}` : "";
}
const bn = "entity", tn = "expr";
function Dl(e, t) {
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
function ta(e, t) {
  const n = [];
  t && n.push({
    id: bn,
    label: `entity:${t.key}`,
    facetKey: bn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Ws(a) && n.push(...Dl(s, a));
  }
  return Rt(e.expr).forEach((s, a) => {
    s.forEach((l, o) => {
      n.push({
        id: `${tn}:${a}:${o}`,
        label: Xs(l),
        facetKey: tn,
        group: a,
        index: o
      });
    });
  }), n;
}
function Nl(e, t, n = null) {
  if (Tn(e)) {
    const l = lt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = ta(e, t).filter((l) => l.facetKey !== tn).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function Il(e) {
  const { adapter: t } = e, n = g(() => Mt(e.schema)), s = g(() => Mt(e.defaults) ?? {}), a = g(() => Ll(t.search.value, n.value, s.value)), l = g(() => ft(n.value, a.value.entity)), o = g(() => l.value ?? Ks(n.value, s.value)), i = g(() => Bs(l.value, n.value)), r = g(() => lt(l.value, a.value.sort, n.value)), u = (h, k) => {
    const S = ws(h, n.value, s.value, t.search.value);
    S !== t.search.value && (k === "push" ? t.push(S) : t.replace(S));
  }, f = () => Mt(e.navigationMode) ?? "push", w = () => Mt(e.facetNavigationMode) ?? "replace", b = (h, k) => {
    const S = h.page ?? (ms(h) ? 1 : a.value.page);
    u({ ...a.value, ...h, page: S }, k);
  }, m = (h, k) => {
    const S = a.value.facets[h];
    if (!S) return;
    const N = { ...a.value.facets, [h]: k(S) };
    b({ facets: N }, w());
  }, $ = (h) => {
    const k = h === null ? null : ft(n.value, h);
    return (k?.key ?? null) === a.value.entity ? {} : {
      entity: k?.key ?? null,
      sort: lt(k, a.value.sort, n.value).key,
      facets: en(k)
    };
  }, x = (h) => {
    const k = $(h);
    Object.keys(k).length && b(k, f());
  };
  return {
    query: a,
    entity: l,
    focus: o,
    sort: r,
    sorts: i,
    summary: g(() => Nl(a.value, l.value, n.value)),
    terms: g(() => ta(a.value, l.value)),
    isPristine: g(() => Tn(a.value)),
    isEverything: g(() => a.value.entity === null),
    hasFacets: g(() => Hs(a.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(h) {
      b({ view: h }, f());
    },
    setSort(h) {
      b({ sort: lt(l.value, h, n.value).key }, f());
    },
    toggleDirection() {
      b({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(h) {
      b({ expr: h }, f());
    },
    narrow(h, k) {
      b({ expr: h, ...$(k) }, f());
    },
    setPage(h, k) {
      b({ page: Math.max(1, Math.floor(h)) }, k ?? f());
    },
    setFacet(h, k) {
      m(h, () => k);
    },
    toggleChip(h, k) {
      m(h, (S) => S.kind !== "chips" ? S : { kind: "chips", selected: S.selected.includes(k) ? S.selected.filter((T) => T !== k) : [...S.selected, k] });
    },
    setRange(h, k, S) {
      m(h, (N) => N.kind === "range" ? { kind: "range", min: k, max: S } : N);
    },
    toggleFlag(h) {
      m(
        h,
        (k) => k.kind === "toggle" ? { kind: "toggle", on: !k.on } : k
      );
    },
    removeTerm(h) {
      if (h.facetKey === bn) {
        x(null);
        return;
      }
      if (h.facetKey === tn) {
        const k = pl(Rt(a.value.expr), h.group ?? 0, h.index ?? 0);
        b({ expr: fl(k) }, f());
        return;
      }
      m(h.facetKey, (k) => k.kind === "chips" && h.option ? { kind: "chips", selected: k.selected.filter((S) => S !== h.option) } : k.kind === "range" ? { kind: "range", min: null, max: null } : k.kind === "toggle" ? { kind: "toggle", on: !1 } : k);
    },
    clearFilters() {
      b({ entity: null, expr: "", facets: en(null) }, f());
    },
    reset() {
      u(Fn(n.value, s.value), f());
    },
    hrefFor(h) {
      const k = { ...a.value, ...h };
      return k.page = h.page ?? (ms(h) ? 1 : a.value.page), k.facets = Gs(ft(n.value, k.entity), k.facets), `${t.path.value}${ws(k, n.value, s.value, t.search.value)}`;
    }
  };
}
function Ol(e) {
  const t = Xt([]), n = B(0), s = B(!1), a = Xt(null);
  let l = 0, o = null;
  const i = g(() => (e.query.value.page - 1) * e.limit.value), r = g(() => al(n.value, e.limit.value)), u = (x) => {
    t.value = x.rows, n.value = x.total, a.value = null;
  }, f = (x) => {
    a.value = x, t.value = [], n.value = 0;
  }, w = (x, h) => {
    let k = !0;
    const S = () => x === l, N = () => {
      k && (k = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return S();
      },
      insert(T, F) {
        if (!S()) return;
        const V = Array.isArray(T) ? T : [T];
        if (!V.length) return;
        N();
        const M = [...t.value];
        M.splice(F ?? M.length, 0, ...V), t.value = h > 0 ? M.slice(0, h) : M, n.value += V.length;
      },
      set(T) {
        S() && (T.rows && (N(), t.value = h > 0 ? T.rows.slice(0, h) : T.rows, n.value = T.rows.length), T.total !== void 0 && (n.value = T.total));
      },
      close() {
        S() && (s.value = !1);
      },
      fail(T) {
        S() && (f(T), s.value = !1);
      }
    };
  }, b = () => {
    const x = o;
    o = null, x?.();
  }, m = () => {
    const x = ++l;
    b();
    const h = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, k = e.source.value;
    if (k.stream) {
      s.value = !0;
      try {
        o = k.stream(h, w(x, h.limit)) ?? null;
      } catch (N) {
        f(N), s.value = !1;
      }
      return;
    }
    let S;
    try {
      S = k.query(h);
    } catch (N) {
      f(N);
      return;
    }
    if (!(S instanceof Promise)) {
      u(S), s.value = !1;
      return;
    }
    s.value = !0, S.then((N) => {
      x === l && u(N);
    }).catch((N) => {
      x === l && f(N);
    }).finally(() => {
      x === l && (s.value = !1);
    });
  }, $ = g(
    () => `${JSON.stringify(js.map((x) => e.query.value[x]))}|${e.query.value.page}`
  );
  return $e([e.source, $, e.schema, e.entity, e.limit], m, {
    immediate: !0
  }), zs(() => {
    l++, b();
  }, !0), { rows: t, total: n, offset: i, pageCount: r, pending: s, error: a, refresh: m };
}
const Vl = ["data-dc-expanded"], Kl = ["aria-expanded", "aria-controls"], ql = { class: "dc-header__domain" }, Bl = { class: "dc-header__crumb" }, Wl = { class: "dc-header__crumb-root" }, Hl = {
  key: 0,
  class: "dc-header__count dc-mono"
}, Ul = {
  key: 0,
  class: "dc-header__query"
}, jl = ["data-dc-active", "title"], Gl = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Xl = { class: "dc-header__sr" }, Yl = ["data-dc-more"], Ql = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Zl = ["title", "aria-label", "onClick"], Jl = {
  key: 1,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, er = ["disabled"], tr = ["title"], nr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, sr = ["disabled"], ar = {
  key: 2,
  class: "dc-header__actions"
}, lr = /* @__PURE__ */ ue({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ye(), l = g(() => a.schema.value), o = g(() => a.entity.value?.label ?? "Everything"), i = g(() => {
      if (n.hideCount) return "";
      const h = a.entity.value;
      return h && !a.hasFacets.value && !a.query.value.expr.trim() ? h.count : String(a.total.value);
    }), r = g(
      () => a.terms.value.map((h, k, S) => {
        const N = S[k - 1];
        return {
          term: h,
          or: N?.group !== void 0 && h.group !== void 0 && h.group !== N.group
        };
      })
    ), u = B(null), f = B("");
    function w() {
      const h = u.value;
      if (!h) {
        f.value = "";
        return;
      }
      const k = h.scrollLeft > 1, S = h.scrollWidth - h.clientWidth - h.scrollLeft > 1;
      f.value = k && S ? "both" : k ? "start" : S ? "end" : "";
    }
    let b = null;
    $e(
      u,
      (h) => {
        b?.disconnect(), b = null, w(), !(!h || typeof ResizeObserver > "u") && (b = new ResizeObserver(w), b.observe(h));
      },
      { flush: "post" }
    ), $e(r, w, { flush: "post" }), Ue(() => b?.disconnect());
    const m = g(() => a.query.value.page), $ = g(
      () => a.pageCount.value > 1 && !Us(a.query.value)
    ), x = g(() => {
      const h = `Page ${m.value} of ${a.pageCount.value}`, k = a.rows.value.length;
      if (!k) return h;
      const S = a.offset.value + 1;
      return `${h} — rows ${S} to ${S + k - 1} of ${a.total.value}`;
    });
    return (h, k) => (p(), _("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      y("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: k[0] || (k[0] = (S) => s("toggle"))
      }, [
        k[4] || (k[4] = y("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        y("span", ql, z(l.value.label), 1),
        y("span", Bl, [
          y("span", Wl, z(o.value), 1),
          i.value ? (p(), _("span", Hl, z(i.value), 1)) : I("", !0)
        ]),
        r.value.length ? I("", !0) : (p(), _("span", Ul, [
          k[3] || (k[3] = y("span", { class: "dc-header__query-label" }, "Query", -1)),
          y("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": E(a).isPristine.value ? "false" : "true",
            title: E(a).summary.value
          }, z(E(a).summary.value), 9, jl)
        ])),
        y("span", Gl, z(e.expanded ? "▲" : "▼"), 1),
        y("span", Xl, z(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, Kl),
      r.value.length ? (p(), _("div", {
        key: 0,
        ref_key: "termBar",
        ref: u,
        class: "dc-header__query dc-header__terms",
        "data-dc-more": f.value,
        onScroll: w
      }, [
        k[5] || (k[5] = y("span", { class: "dc-header__query-label" }, "Query", -1)),
        (p(!0), _(Y, null, ce(r.value, (S) => (p(), _(Y, {
          key: S.term.id
        }, [
          S.or ? (p(), _("span", Ql, "or")) : I("", !0),
          y("button", {
            type: "button",
            class: "dc-term dc-mono",
            title: `Remove ${S.term.label}`,
            "aria-label": `Remove ${S.term.label}`,
            onClick: (N) => E(a).removeTerm(S.term)
          }, z(S.term.label), 9, Zl)
        ], 64))), 128))
      ], 40, Yl)) : I("", !0),
      $.value ? (p(), _("nav", Jl, [
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: m.value <= 1,
          onClick: k[1] || (k[1] = (S) => E(a).setPage(m.value - 1))
        }, [...k[6] || (k[6] = [
          y("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, er),
        y("span", {
          class: "dc-header__page dc-mono",
          title: x.value,
          "aria-hidden": "true"
        }, z(m.value) + " / " + z(E(a).pageCount.value), 9, tr),
        y("span", nr, z(x.value), 1),
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: m.value >= E(a).pageCount.value,
          onClick: k[2] || (k[2] = (S) => E(a).setPage(m.value + 1))
        }, [...k[7] || (k[7] = [
          y("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, sr)
      ])) : I("", !0),
      h.$slots.actions ? (p(), _("div", ar, [
        Be(h.$slots, "actions", {}, void 0, !0)
      ])) : I("", !0)
    ], 8, Vl));
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, na = /* @__PURE__ */ de(lr, [["__scopeId", "data-v-d377c169"]]), rr = { class: "dc-facet" }, or = { class: "dc-facet__head" }, ir = ["id"], cr = { class: "dc-facet__hint dc-mono" }, ur = ["aria-labelledby"], dr = ["aria-pressed", "data-dc-active", "onClick"], fr = ["aria-labelledby"], pr = ["aria-label", "placeholder", "onKeydown"], vr = ["aria-label", "placeholder", "onKeydown"], mr = ["aria-checked"], hr = { class: "dc-switch__text" }, _r = ["data-dc-active"], gr = /* @__PURE__ */ ue({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = g(() => {
      const { facet: b, value: m } = n;
      return b.kind === "chips" && m.kind === "chips" ? m.selected.length ? `${m.selected.length} of ${b.options.length}` : "any" : b.kind === "range" && m.kind === "range" ? m.min === null && m.max === null ? `${b.min}–${b.max}` : `${m.min ?? b.min}–${m.max ?? b.max}` : m.kind === "toggle" ? m.on ? "on" : "off" : "";
    }), l = g(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function o(b) {
      if (n.value.kind !== "chips") return;
      const m = l.value.has(b) ? n.value.selected.filter(($) => $ !== b) : [...n.value.selected, b];
      s("update", { kind: "chips", selected: m });
    }
    const i = B(""), r = B("");
    $e(
      () => n.value,
      (b) => {
        b.kind === "range" && (i.value = b.min === null ? "" : b.min, r.value = b.max === null ? "" : b.max);
      },
      { immediate: !0, deep: !0 }
    );
    function u(b) {
      if (typeof b == "number") return Number.isFinite(b) ? b : null;
      const m = b.trim();
      if (!m) return null;
      const $ = Number(m);
      return Number.isFinite($) ? $ : null;
    }
    function f() {
      if (n.value.kind !== "range") return;
      const b = u(i.value), m = u(r.value);
      b === n.value.min && m === n.value.max || s("update", { kind: "range", min: b, max: m });
    }
    function w() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (b, m) => (p(), _("div", rr, [
      y("div", or, [
        y("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, z(e.facet.label), 9, ir),
        y("span", cr, z(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (p(), _("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (p(!0), _(Y, null, ce(e.facet.options, ($) => (p(), _("button", {
          key: $,
          type: "button",
          class: "dc-chip",
          "aria-pressed": l.value.has($),
          "data-dc-active": l.value.has($) ? "true" : "false",
          onClick: (x) => o($)
        }, z($), 9, dr))), 128))
      ], 8, ur)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), _("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        hn(y("input", {
          "onUpdate:modelValue": m[0] || (m[0] = ($) => i.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: f,
          onBlur: f,
          onKeydown: Yt(qe(f, ["prevent"]), ["enter"])
        }, null, 40, pr), [
          [_n, i.value]
        ]),
        m[2] || (m[2] = y("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        hn(y("input", {
          "onUpdate:modelValue": m[1] || (m[1] = ($) => r.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: f,
          onBlur: f,
          onKeydown: Yt(qe(f, ["prevent"]), ["enter"])
        }, null, 40, vr), [
          [_n, r.value]
        ])
      ], 8, fr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), _("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: w
      }, [
        y("span", hr, z(e.facet.text), 1),
        y("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...m[3] || (m[3] = [
          y("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, _r)
      ], 8, mr)) : I("", !0)
    ]));
  }
}), sa = /* @__PURE__ */ de(gr, [["__scopeId", "data-v-c2efbd0c"]]), yr = ["aria-label"], wr = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], br = /* @__PURE__ */ ue({
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
    function l(o, i) {
      const r = n.options.length;
      let u = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? u = (i + 1) % r : o.key === "ArrowLeft" || o.key === "ArrowUp" ? u = (i - 1 + r) % r : o.key === "Home" ? u = 0 : o.key === "End" && (u = r - 1), u === null) return;
      o.preventDefault();
      const f = n.options[u];
      f && (s("update:modelValue", f.key), a.value[u]?.focus());
    }
    return (o, i) => (p(), _("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (p(!0), _(Y, null, ce(e.options, (r, u) => (p(), _("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: Qt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (f) => s("update:modelValue", r.key),
        onKeydown: (f) => l(f, u)
      }, z(r.label), 43, wr))), 128))
    ], 8, yr));
  }
}), kn = /* @__PURE__ */ de(br, [["__scopeId", "data-v-63fb5482"]]), kr = ["id"], $r = { class: "dc-panel__section" }, xr = { class: "dc-panel__query" }, Mr = { class: "dc-panel__expression" }, Cr = ["for"], Er = ["id", "placeholder", "onKeydown"], Sr = {
  key: 0,
  class: "dc-panel__facets"
}, Pr = {
  key: 1,
  class: "dc-panel__hint"
}, Ar = { class: "dc-panel__scope" }, zr = ["id"], Rr = ["aria-labelledby"], Tr = ["data-dc-active", "aria-current"], Fr = { class: "dc-entity__count dc-mono" }, Lr = ["data-dc-active", "aria-current", "onClick"], Dr = { class: "dc-entity__label" }, Nr = { class: "dc-entity__count dc-mono" }, Ir = { class: "dc-panel__actions" }, Or = ["disabled"], Vr = { class: "dc-panel__section dc-panel__section--row" }, Kr = { class: "dc-panel__control" }, qr = { class: "dc-panel__control" }, Br = ["title", "aria-label"], Wr = {
  key: 0,
  class: "dc-panel__section"
}, Hr = /* @__PURE__ */ ue({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = An(), l = ye(), o = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, i = g(
      () => (n.views ?? [...Os]).map((x) => ({ key: x, label: o[x] }))
    ), r = g(
      () => l.sorts.value.map((x) => ({ key: x.key, label: x.label }))
    ), u = B(l.query.value.expr), f = B(null);
    $e(
      () => l.query.value.expr,
      (x) => {
        u.value = x;
      }
    );
    const w = g(() => u.value !== l.query.value.expr);
    function b() {
      l.setExpression(u.value), s("close");
    }
    function m() {
      u.value = "", l.clearFilters();
    }
    function $(x, h) {
      l.setFacet(x, h);
    }
    return zt(() => f.value?.focus()), (x, h) => (p(), _("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: h[5] || (h[5] = Yt(qe((k) => s("close"), ["stop"]), ["esc"]))
    }, [
      y("section", $r, [
        y("div", xr, [
          y("div", Mr, [
            y("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, Cr),
            hn(y("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: f,
              "onUpdate:modelValue": h[0] || (h[0] = (k) => u.value = k),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: E(l).schema.value.placeholder,
              onKeydown: Yt(qe(b, ["prevent"]), ["enter"])
            }, null, 40, Er), [
              [_n, u.value]
            ])
          ]),
          E(l).entity.value ? (p(), _("div", Sr, [
            (p(!0), _(Y, null, ce(E(l).entity.value.facets, (k) => (p(), oe(sa, {
              key: k.key,
              facet: k,
              value: E(l).query.value.facets[k.key],
              onUpdate: (S) => $(k.key, S)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (p(), _("p", Pr, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ]),
        y("div", Ar, [
          y("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, zr),
          y("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            y("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": E(l).isEverything.value ? "true" : "false",
              "aria-current": E(l).isEverything.value ? "true" : void 0,
              onClick: h[1] || (h[1] = (k) => E(l).clearEntity())
            }, [
              h[6] || (h[6] = y("span", { class: "dc-entity__label" }, "Everything", -1)),
              y("span", Fr, z(E(l).entities.value.length) + " kinds", 1)
            ], 8, Tr),
            (p(!0), _(Y, null, ce(E(l).entities.value, (k) => (p(), _("button", {
              key: k.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": k.key === E(l).entity.value?.key ? "true" : "false",
              "aria-current": k.key === E(l).entity.value?.key ? "true" : void 0,
              onClick: (S) => E(l).setEntity(k.key)
            }, [
              y("span", Dr, z(k.label), 1),
              y("span", Nr, z(k.count), 1)
            ], 8, Lr))), 128))
          ], 8, Rr)
        ]),
        y("div", Ir, [
          y("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: b
          }, " Run query "),
          y("button", {
            type: "button",
            class: "dc-button",
            disabled: E(l).isPristine.value && !w.value,
            onClick: m
          }, " Reset ", 8, Or)
        ])
      ]),
      y("section", Vr, [
        y("div", Kr, [
          h[7] || (h[7] = y("span", { class: "dc-eyebrow" }, "View", -1)),
          pe(kn, {
            label: "Result view",
            "model-value": E(l).query.value.view,
            options: i.value,
            "onUpdate:modelValue": h[2] || (h[2] = (k) => E(l).setView(k))
          }, null, 8, ["model-value", "options"])
        ]),
        y("div", qr, [
          h[8] || (h[8] = y("span", { class: "dc-eyebrow" }, "Sort", -1)),
          pe(kn, {
            mono: "",
            label: "Sort field",
            "model-value": E(l).query.value.sort,
            options: r.value,
            "onUpdate:modelValue": h[3] || (h[3] = (k) => E(l).setSort(k))
          }, null, 8, ["model-value", "options"]),
          y("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: E(l).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${E(l).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: h[4] || (h[4] = (k) => E(l).toggleDirection())
          }, z(E(l).query.value.dir === "desc" ? "↓" : "↑"), 9, Br)
        ])
      ]),
      a["panel-section"] ? (p(), _("section", Wr, [
        Be(x.$slots, "panel-section", {}, void 0, !0)
      ])) : I("", !0)
    ], 40, kr));
  }
}), aa = /* @__PURE__ */ de(Hr, [["__scopeId", "data-v-d8a6ac01"]]), Ur = (e) => {
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
};
function jr(e, t) {
  const n = ze(t, "state"), s = ze(t, "score"), a = ze(t, "tint"), l = s ? Ur(Le(s, e)) : null;
  return {
    identity: un(ze(t, "identity"), e),
    reference: un(ze(t, "reference"), e),
    metrics: Ls(t, "metric").map((o) => ({
      column: o,
      label: o.label ?? "",
      text: zn(o, e)
    })),
    state: n ? Le(n, e) ?? null : null,
    score: l,
    percent: l === null ? "" : Ds(l),
    updated: un(ze(t, "updated"), e),
    tint: a ? Le(a, e) ?? null : null
  };
}
function la(e, t, n, s) {
  const a = n?.columns ?? [];
  return {
    row: e,
    key: Ja(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: a,
    ordinal: Za(t),
    parts: jr(e, a),
    pinned: s
  };
}
function wt() {
  const e = ye(), t = g(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return g(
    () => e.rows.value.map(
      (n, s) => la(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n)
      )
    )
  );
}
const Gr = ["data-dc-status"], Xr = /* @__PURE__ */ ue({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (p(), _("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, z(e.status), 9, Gr));
  }
}), Tt = /* @__PURE__ */ de(Xr, [["__scopeId", "data-v-23e59fbf"]]), Yr = ["title"], Qr = { key: 1 }, Zr = /* @__PURE__ */ ue({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ye(), s = g(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((r) => r.key === t.column.drill) ?? null), a = g(() => t.column.label ?? ""), l = g(() => zn(t.column, t.entry.row));
    function o(i) {
      i.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (i, r) => s.value ? (p(), _("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: o
    }, [
      Be(i.$slots, "default", {}, () => [
        Re(z(l.value), 1)
      ], !0)
    ], 8, Yr)) : (p(), _("span", Qr, [
      Be(i.$slots, "default", {}, () => [
        Re(z(l.value), 1)
      ], !0)
    ]));
  }
}), Ft = /* @__PURE__ */ de(Zr, [["__scopeId", "data-v-3bd0cbdb"]]), Jr = ["data-dc-active", "aria-pressed", "aria-label"], eo = /* @__PURE__ */ ue({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ye();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, l) => (p(), _("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, z(e.pinned ? "★" : "☆"), 9, Jr));
  }
}), qn = /* @__PURE__ */ de(eo, [["__scopeId", "data-v-ef63d763"]]), to = ["title", "aria-label"], no = /* @__PURE__ */ ue({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = g(() => t.entry.entity?.scope ?? null);
    function a(l) {
      l.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (l, o) => s.value ? (p(), _("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, to)) : I("", !0);
  }
}), Lt = /* @__PURE__ */ de(no, [["__scopeId", "data-v-1d9b1a9f"]]), so = { class: "dc-cards" }, ao = { class: "dc-card__top dc-mono" }, lo = {
  key: 0,
  class: "dc-card__entity"
}, ro = { class: "dc-card__top-right" }, oo = ["onClick"], io = { class: "dc-card__primary" }, co = { class: "dc-card__secondary dc-mono" }, uo = { class: "dc-card__metrics dc-mono" }, fo = {
  key: 0,
  class: "dc-card__date"
}, po = /* @__PURE__ */ ue({
  __name: "CardsView",
  setup(e) {
    const t = ye(), n = wt(), s = g(() => t.isEverything.value);
    return (a, l) => (p(), _("div", so, [
      (p(!0), _(Y, null, ce(E(n), (o) => (p(), _("div", {
        key: o.key,
        class: "dc-card"
      }, [
        y("div", ao, [
          y("span", null, [
            Re(z(o.ordinal) + " ", 1),
            s.value ? (p(), _("span", lo, z(o.entityLabel), 1)) : I("", !0)
          ]),
          y("span", ro, [
            o.parts.state ? (p(), oe(Tt, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : I("", !0),
            pe(Lt, { entry: o }, null, 8, ["entry"]),
            E(t).pinnable.value ? (p(), oe(qn, {
              key: 1,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : I("", !0)
          ])
        ]),
        y("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => E(t).activate(o.row)
        }, [
          y("span", io, z(o.parts.identity), 1),
          y("span", co, z(o.parts.reference), 1)
        ], 8, oo),
        y("div", uo, [
          (p(!0), _(Y, null, ce(o.parts.metrics.slice(0, 2), (i) => (p(), oe(Ft, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, {
            default: gt(() => [
              Re(z(i.label) + " " + z(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (p(), _("span", fo, z(o.parts.updated), 1)) : I("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ra = /* @__PURE__ */ de(po, [["__scopeId", "data-v-b633cc4d"]]), vo = { class: "dc-grid" }, mo = ["onClick"], ho = { class: "dc-tile__scrim" }, _o = { class: "dc-tile__top dc-mono" }, go = { class: "dc-tile__chip" }, yo = {
  key: 0,
  class: "dc-tile__chip"
}, wo = { class: "dc-tile__caption" }, bo = { class: "dc-tile__secondary dc-truncate" }, ko = { class: "dc-tile__primary" }, $o = /* @__PURE__ */ ue({
  __name: "GridView",
  setup(e) {
    const t = ye(), n = wt();
    return (s, a) => (p(), _("div", vo, [
      (p(!0), _(Y, null, ce(E(n), (l) => (p(), _("button", {
        key: l.key,
        type: "button",
        class: "dc-tile",
        style: Pe({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
        onClick: (o) => E(t).activate(l.row)
      }, [
        y("span", ho, [
          y("span", _o, [
            y("span", go, z(l.ordinal), 1),
            l.parts.percent ? (p(), _("span", yo, z(l.parts.percent), 1)) : I("", !0)
          ]),
          y("span", wo, [
            y("span", bo, z(l.parts.reference), 1),
            y("span", ko, z(l.parts.identity), 1)
          ])
        ])
      ], 12, mo))), 128))
    ]));
  }
}), oa = /* @__PURE__ */ de($o, [["__scopeId", "data-v-e3934b3e"]]), xo = { class: "dc-links" }, Mo = ["onClick"], Co = { class: "dc-link__primary dc-truncate" }, Eo = { class: "dc-link__secondary dc-mono dc-truncate" }, So = /* @__PURE__ */ ue({
  __name: "LinksView",
  setup(e) {
    const t = ye(), n = wt();
    return (s, a) => (p(), _("div", xo, [
      (p(!0), _(Y, null, ce(E(n), (l) => (p(), _("button", {
        key: l.key,
        type: "button",
        class: "dc-link",
        onClick: (o) => E(t).activate(l.row)
      }, [
        y("span", Co, z(l.parts.identity), 1),
        y("span", Eo, z(l.parts.reference), 1)
      ], 8, Mo))), 128))
    ]));
  }
}), ia = /* @__PURE__ */ de(So, [["__scopeId", "data-v-d94cadb6"]]), Po = ["aria-valuenow", "aria-label", "title"], Ao = /* @__PURE__ */ ue({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = g(() => Ds(t.value));
    return (s, a) => (p(), _("span", {
      class: "dc-meter",
      role: "meter",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": Math.round(e.value * 100),
      "aria-label": e.label ?? "Score",
      title: `${e.label ?? "Score"} ${n.value}`
    }, [
      y("span", {
        class: "dc-meter__fill",
        style: Pe({ width: n.value })
      }, null, 4)
    ], 8, Po));
  }
}), Bn = /* @__PURE__ */ de(Ao, [["__scopeId", "data-v-ab794776"]]), zo = {
  class: "dc-list",
  role: "list"
}, Ro = ["onClick"], To = { class: "dc-list__ordinal dc-mono" }, Fo = { class: "dc-list__identity" }, Lo = { class: "dc-list__primary dc-truncate" }, Do = { class: "dc-list__secondary dc-mono dc-truncate" }, No = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Io = { class: "dc-list__metrics dc-mono" }, Oo = { class: "dc-list__trailing" }, Vo = /* @__PURE__ */ ue({
  __name: "ListView",
  setup(e) {
    const t = ye(), n = wt(), s = g(() => t.isEverything.value), a = (l) => ze(l.columns, "score")?.label ?? "Score";
    return (l, o) => (p(), _("div", zo, [
      (p(!0), _(Y, null, ce(E(n), (i) => (p(), _("div", {
        key: i.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        y("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (r) => E(t).activate(i.row)
        }, [
          y("span", To, z(i.ordinal), 1),
          y("span", Fo, [
            y("span", Lo, z(i.parts.identity), 1),
            y("span", Do, z(i.parts.reference), 1)
          ])
        ], 8, Ro),
        s.value ? (p(), _("span", No, z(i.entityLabel), 1)) : I("", !0),
        y("span", Io, [
          (p(!0), _(Y, null, ce(i.parts.metrics.slice(0, 2), (r) => (p(), oe(Ft, {
            key: r.column.key ?? r.label,
            entry: i,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128)),
          i.parts.score !== null ? (p(), oe(Bn, {
            key: 0,
            value: i.parts.score,
            label: a(i)
          }, null, 8, ["value", "label"])) : I("", !0)
        ]),
        y("span", Oo, [
          i.parts.state ? (p(), oe(Tt, {
            key: 0,
            status: i.parts.state
          }, null, 8, ["status"])) : I("", !0),
          pe(Lt, { entry: i }, null, 8, ["entry"]),
          E(t).pinnable.value ? (p(), oe(qn, {
            key: 1,
            row: i.row,
            name: i.parts.identity,
            pinned: i.pinned
          }, null, 8, ["row", "name", "pinned"])) : I("", !0)
        ])
      ]))), 128))
    ]));
  }
}), $n = /* @__PURE__ */ de(Vo, [["__scopeId", "data-v-0d372bda"]]), Ko = { class: "dc-preview" }, qo = { class: "dc-preview__pager dc-mono" }, Bo = ["disabled"], Wo = { "aria-live": "polite" }, Ho = ["disabled"], Uo = {
  key: 0,
  class: "dc-preview__card"
}, jo = { class: "dc-preview__body" }, Go = { class: "dc-preview__top" }, Xo = { class: "dc-preview__badges" }, Yo = { class: "dc-preview__entity dc-mono" }, Qo = { class: "dc-preview__marks" }, Zo = { class: "dc-preview__primary" }, Jo = { class: "dc-preview__secondary dc-mono" }, ei = { class: "dc-preview__fields" }, ti = { class: "dc-preview__key" }, ni = { class: "dc-preview__value dc-mono" }, si = /* @__PURE__ */ ue({
  __name: "PreviewView",
  setup(e) {
    const t = ye(), n = wt(), s = B(0);
    $e(n, (r) => {
      s.value > r.length - 1 && (s.value = Math.max(0, r.length - 1));
    });
    const a = g(() => n.value[s.value]), l = g(() => {
      const r = a.value;
      if (!r) return [];
      const u = ze(r.columns, "reference"), f = ze(r.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: r.parts.reference, column: null }] : [],
        ...r.parts.metrics.map((w) => ({
          key: w.label,
          value: w.text,
          column: w.column
        })),
        ...f ? [{ key: f.label ?? "Updated", value: r.parts.updated, column: null }] : []
      ];
    }), o = g(() => {
      if (!n.value.length) return "0 / 0";
      const r = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${r}`;
    }), i = (r) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + r)));
    };
    return (r, u) => (p(), _("div", Ko, [
      y("div", qo, [
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => i(-1))
        }, " ‹ ", 8, Bo),
        y("span", Wo, z(o.value), 1),
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (f) => i(1))
        }, " › ", 8, Ho)
      ]),
      a.value ? (p(), _("div", Uo, [
        y("div", {
          class: "dc-preview__media",
          style: Pe({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        y("div", jo, [
          y("div", Go, [
            y("span", Xo, [
              a.value.parts.state ? (p(), oe(Tt, {
                key: 0,
                status: a.value.parts.state
              }, null, 8, ["status"])) : I("", !0),
              y("span", Yo, z(a.value.entityLabel), 1)
            ]),
            y("span", Qo, [
              pe(Lt, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (p(), oe(qn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : I("", !0)
            ])
          ]),
          y("div", null, [
            y("div", Zo, z(a.value.parts.identity), 1),
            y("div", Jo, z(a.value.parts.reference), 1)
          ]),
          y("dl", ei, [
            (p(!0), _(Y, null, ce(l.value, (f) => (p(), _("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              y("dt", ti, z(f.key), 1),
              y("dd", ni, [
                f.column && a.value ? (p(), oe(Ft, {
                  key: 0,
                  entry: a.value,
                  column: f.column
                }, null, 8, ["entry", "column"])) : (p(), _(Y, { key: 1 }, [
                  Re(z(f.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          y("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (f) => E(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : I("", !0)
    ]));
  }
}), ca = /* @__PURE__ */ de(si, [["__scopeId", "data-v-8e2c6c48"]]);
function ai() {
  const e = ye();
  return g(() => el(e.schema.value, e.entity.value));
}
const li = ["src", "alt"], ri = ["title"], oi = /* @__PURE__ */ ue({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = g(() => t.column.kind ?? "text"), a = g(() => Le(t.column, t.entry.row)), l = g(
      () => s.value === "ordinal" ? t.entry.ordinal : zn(t.column, t.entry.row)
    ), o = g(() => a.value), i = g(() => {
      const b = Number(a.value);
      return Number.isFinite(b) ? b : 0;
    }), r = g(() => t.column.activate === !0 || !!t.column.click), u = g(() => gn(t.column)), f = g(() => Ns(t.column, t.entry.row));
    function w(b) {
      r.value && (b.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (b, m) => s.value === "component" && e.column.component ? (p(), oe(Rs(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (p(), oe(Tt, {
      key: 1,
      status: o.value
    }, null, 8, ["status"])) : s.value === "score" ? (p(), oe(Bn, {
      key: 2,
      value: i.value,
      label: e.column.label
    }, null, 8, ["value", "label"])) : s.value === "image" ? (p(), _("img", {
      key: 3,
      class: "dc-cell__image",
      src: String(a.value ?? ""),
      alt: e.entry.parts.identity,
      loading: "lazy",
      style: Pe({ maxHeight: e.column.height }),
      onClick: w
    }, null, 12, li)) : e.column.drill ? (p(), oe(Ft, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : r.value ? (p(), _("button", {
      key: 5,
      type: "button",
      class: Qt(["dc-table__open", { "dc-truncate": u.value }]),
      title: f.value,
      onClick: w
    }, z(l.value), 11, ri)) : (p(), _(Y, { key: 6 }, [
      Re(z(l.value), 1)
    ], 64));
  }
}), bs = /* @__PURE__ */ de(oi, [["__scopeId", "data-v-6eea4a46"]]), ii = {
  key: 0,
  class: "dc-table__none"
}, ci = { class: "dc-table__detail" }, ui = {
  key: 1,
  class: "dc-table"
}, di = ["data-dc-align", "data-dc-hide", "aria-sort"], fi = ["onClick"], pi = ["onClick"], vi = ["data-dc-align", "data-dc-hide", "title"], mi = {
  key: 0,
  class: "dc-table__name"
}, hi = /* @__PURE__ */ ue({
  __name: "TableView",
  setup(e) {
    const t = ye(), n = wt(), s = ai();
    function a(w) {
      w && (t.query.value.sort === w ? t.toggleDirection() : t.setSort(w));
    }
    const l = g(() => t.entity.value?.label ?? "The result set"), o = g(() => new Set(t.sorts.value.map((w) => w.key))), i = (w) => w.sort !== void 0 && o.value.has(w.sort), r = (w) => {
      if (i(w))
        return t.query.value.sort !== w.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function u(w) {
      return [
        ps(w),
        w.muted ? "dc-table__muted" : "",
        w.mono ? "dc-mono" : "",
        gn(w) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function f(w, b) {
      if (!(!gn(w) || w.activate || w.click))
        return Ns(w, b.row);
    }
    return (w, b) => E(s).length ? (p(), _("table", ui, [
      y("thead", null, [
        y("tr", null, [
          (p(!0), _(Y, null, ce(E(s), (m, $) => (p(), _("th", {
            key: E(vs)(m, $),
            scope: "col",
            class: Qt(E(ps)(m)),
            style: Pe({ width: m.width }),
            "data-dc-align": E(fs)(m),
            "data-dc-hide": m.hideBelow,
            "aria-sort": r(m)
          }, [
            i(m) ? (p(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (x) => a(m.sort)
            }, z(m.label), 9, fi)) : (p(), _(Y, { key: 1 }, [
              Re(z(m.label), 1)
            ], 64))
          ], 14, di))), 128))
        ])
      ]),
      y("tbody", null, [
        (p(!0), _(Y, null, ce(E(n), (m) => (p(), _("tr", {
          key: m.key,
          class: "dc-table__row",
          onClick: ($) => E(t).activate(m.row)
        }, [
          (p(!0), _(Y, null, ce(E(s), ($, x) => (p(), _("td", {
            key: E(vs)($, x),
            class: Qt(u($)),
            "data-dc-align": E(fs)($),
            "data-dc-hide": $.hideBelow,
            title: f($, m)
          }, [
            $.scope ? (p(), _("span", mi, [
              pe(bs, {
                column: $,
                entry: m
              }, null, 8, ["column", "entry"]),
              pe(Lt, { entry: m }, null, 8, ["entry"])
            ])) : (p(), oe(bs, {
              key: 1,
              column: $,
              entry: m
            }, null, 8, ["column", "entry"]))
          ], 10, vi))), 128))
        ], 8, pi))), 128))
      ])
    ])) : (p(), _("p", ii, [
      b[4] || (b[4] = y("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      y("span", ci, [
        Re(z(l.value) + " has no ", 1),
        b[0] || (b[0] = y("code", null, "columns", -1)),
        b[1] || (b[1] = Re(" in the schema, so there is no table to draw. ", -1)),
        b[2] || (b[2] = y("code", null, "defaultColumns()", -1)),
        b[3] || (b[3] = Re(" is the familiar eight. ", -1))
      ])
    ]));
  }
}), ua = /* @__PURE__ */ de(hi, [["__scopeId", "data-v-eb4b7a13"]]);
function _i(e) {
  const t = Xt([]), n = B(!1), s = Xt(null);
  let a = 0;
  const l = (r, u, f) => ({
    entity: r,
    rows: u.rows.map(
      (w, b) => la(w, b, r, e.isPinned(w.id))
    ),
    total: u.total,
    count: f ? r.count : String(u.total)
  }), o = () => {
    const r = ++a, u = e.query.value, f = e.schema.value, w = e.entities.value, b = e.limit.value, m = Tn(u), $ = w.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: x.key, facets: en(x), page: 1 },
        schema: f,
        entity: x,
        limit: b,
        offset: 0
      })
    }));
    if ($.every(({ outcome: x }) => !(x instanceof Promise))) {
      t.value = $.map(
        ({ entity: x, outcome: h }) => l(x, h, m)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      r === a && (t.value = x.map(
        (h, k) => l($[k].entity, h, m)
      ), s.value = null);
    }).catch((x) => {
      r === a && (s.value = x, t.value = []);
    }).finally(() => {
      r === a && (n.value = !1);
    });
  }, i = () => {
    try {
      o();
    } catch (r) {
      s.value = r, t.value = [], n.value = !1;
    }
  };
  return $e(
    [e.source, e.schema, e.query, e.entities, e.limit],
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: i };
}
const gi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, yi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, wi = ["data-dc-pending"], bi = ["data-dc-empty"], ki = ["onClick"], $i = { class: "dc-type__name" }, xi = { class: "dc-type__count dc-mono" }, Mi = { class: "dc-type__sr" }, Ci = {
  key: 0,
  class: "dc-type__empty"
}, Ei = ["onClick"], Si = { class: "dc-type__identity" }, Pi = { class: "dc-type__primary dc-truncate" }, Ai = { class: "dc-type__secondary dc-mono dc-truncate" }, zi = { class: "dc-type__trailing dc-mono" }, Ri = { class: "dc-type__metric-value" }, Ti = { class: "dc-type__metric-label" }, Fi = {
  key: 0,
  class: "dc-type__date"
}, Li = ["onClick"], Di = /* @__PURE__ */ ue({
  __name: "TypeCardsView",
  setup(e) {
    const t = ye(), { previews: n, pending: s, error: a } = _i({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (o) => t.isPinnedId(o)
    }), l = g(() => !t.isPristine.value);
    return (o, i) => E(a) ? (p(), _("p", gi, " Could not load results: " + z(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !E(n).length && E(s) ? (p(), _("p", yi, " Running query… ")) : (p(), _("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      (p(!0), _(Y, null, ce(E(n), (r) => (p(), _("section", {
        key: r.entity.key,
        class: "dc-type",
        "data-dc-empty": r.rows.length ? "false" : "true"
      }, [
        y("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => E(t).setEntity(r.entity.key)
        }, [
          y("span", $i, z(r.entity.label), 1),
          y("span", xi, z(r.count), 1),
          i[0] || (i[0] = y("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          y("span", Mi, "Show only " + z(r.entity.label.toLowerCase()), 1)
        ], 8, ki),
        r.rows.length ? I("", !0) : (p(), _("p", Ci, z(l.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), _(Y, null, ce(r.rows, (u) => (p(), _("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          y("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (f) => E(t).activate(u.row)
          }, [
            y("span", Si, [
              y("span", Pi, z(u.parts.identity), 1),
              y("span", Ai, z(u.parts.reference), 1)
            ])
          ], 8, Ei),
          y("span", zi, [
            (p(!0), _(Y, null, ce(u.parts.metrics.slice(0, 1), (f) => (p(), oe(Ft, {
              key: f.column.key ?? f.label,
              class: "dc-type__metric",
              entry: u,
              column: f.column
            }, {
              default: gt(() => [
                y("span", Ri, z(f.text), 1),
                y("span", Ti, z(f.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), _("span", Fi, z(u.parts.updated), 1)) : I("", !0),
            pe(Lt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        r.entity.create ? (p(), _("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => E(t).create(r.entity)
        }, [
          i[1] || (i[1] = y("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Re(" " + z(r.entity.create), 1)
        ], 8, Li)) : I("", !0)
      ], 8, bi))), 128))
    ], 8, wi));
  }
}), da = /* @__PURE__ */ de(Di, [["__scopeId", "data-v-b776cfb6"]]), Ni = ["data-dc-pending"], Ii = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, Oi = { class: "dc-results__detail" }, Vi = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ki = {
  key: 3,
  class: "dc-results__state"
}, qi = { class: "dc-results__detail" }, Bi = /* @__PURE__ */ ue({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), s = {
      list: $n,
      cards: ra,
      grid: oa,
      table: ua,
      links: ia,
      preview: ca
    }, a = g(() => Us(n.query.value)), l = g(() => {
      const u = n.query.value.view, f = t.views ?? [], [w] = f;
      return w === void 0 || f.includes(u) ? u : w;
    }), o = g(() => s[l.value] ?? $n), i = g(() => n.rows.value.length > 0), r = g(() => n.error.value !== null);
    return (u, f) => (p(), _("div", {
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      r.value ? (p(), _("p", Ii, [
        f[1] || (f[1] = y("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        y("span", Oi, z(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), oe(da, { key: 1 })) : !i.value && E(n).pending.value ? (p(), _("p", Vi, [...f[2] || (f[2] = [
        y("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (p(), oe(Rs(o.value), { key: 4 })) : (p(), _("div", Ki, [
        f[3] || (f[3] = y("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        y("span", qi, z(E(n).summary.value), 1),
        E(n).isPristine.value ? I("", !0) : (p(), _("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: f[0] || (f[0] = (w) => E(n).clearFilters())
        }, z(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Ni));
  }
}), fa = /* @__PURE__ */ de(Bi, [["__scopeId", "data-v-c00573c8"]]), Wi = ["data-dc-theme"], Hi = ["data-dc-width", "data-dc-align"], Ui = { class: "dc-shell__panel" }, ji = /* @__PURE__ */ ue({
  __name: "DataShell",
  props: /* @__PURE__ */ Jt({
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
    matchWidth: { default: "grow" },
    headAlign: { default: "center" },
    pinnable: { type: Boolean },
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    open: { type: Boolean, default: !1 },
    openModifiers: {},
    pinned: { default: () => [] },
    pinnedModifiers: {}
  }),
  emits: /* @__PURE__ */ Jt(["activate", "create", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = Zt(e, "open"), o = Zt(e, "pinned"), i = An(), r = _t(Is, null), u = s.route || r ? null : tl(), f = s.route ?? r ?? u;
    Ue(() => u?.dispose?.());
    const w = g(() => $l({ seed: s.schema.key })), b = g(() => s.source ?? w.value), m = Il({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), $ = Ol({
      source: b,
      query: m.query,
      schema: g(() => s.schema),
      entity: m.entity,
      limit: g(() => s.limit)
    });
    $e(m.query, (M) => a("query-change", M)), $e(
      [$.pageCount, $.pending, m.query],
      () => {
        if ($.pending.value) return;
        const M = $.pageCount.value;
        m.query.value.page > M && m.setPage(M, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const x = Ts() ?? "dc-query-panel", h = B(null);
    function k() {
      l.value && (l.value = !1, zt(() => {
        h.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const S = g(() => new Set(o.value));
    function N(M) {
      const A = new Set(S.value);
      A.has(M.id) ? A.delete(M.id) : A.add(M.id), o.value = [...A], a("toggle-pin", M);
    }
    function T(M, A) {
      m.narrow(Sl(s.schema, m.query.value, M), A?.key ?? null), a("drill", M, A);
    }
    const F = Pl({
      ...m,
      schema: g(() => s.schema),
      entities: g(() => s.schema.entities),
      rows: $.rows,
      total: $.total,
      limit: g(() => s.limit),
      offset: $.offset,
      pageCount: $.pageCount,
      pending: $.pending,
      error: $.error,
      source: b,
      previewsPerType: g(() => s.previewsPerType),
      pinnable: g(() => s.pinnable === !0),
      isPinned: (M) => S.value.has(M.id),
      isPinnedId: (M) => S.value.has(M),
      togglePin: N,
      activate: (M) => a("activate", M),
      create: (M) => a("create", M),
      drill: T
    }), V = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: m.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: k
    }), (M, A) => (p(), _("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Pe(V.value)
    }, [
      y("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(na, {
          ref_key: "headerRef",
          ref: h,
          expanded: l.value,
          "panel-id": E(x),
          onToggle: A[0] || (A[0] = (J) => l.value = !l.value)
        }, ds({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: gt(() => [
              Be(M.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        l.value ? (p(), _(Y, { key: 0 }, [
          y("div", {
            class: "dc-shell__scrim",
            onClick: k
          }),
          y("div", Ui, [
            pe(aa, {
              "panel-id": E(x),
              views: e.views,
              onClose: k
            }, ds({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: gt(() => [
                  Be(M.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : I("", !0)
      ], 8, Hi),
      Be(M.$slots, "results", {
        rows: E(F).rows.value,
        total: E(F).total.value,
        offset: E(F).offset.value,
        pageCount: E(F).pageCount.value,
        query: E(F).query.value,
        pending: E(F).pending.value
      }, () => [
        pe(fa, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, Wi));
  }
}), Gi = /* @__PURE__ */ de(ji, [["__scopeId", "data-v-737c7342"]]), Et = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Xi = ["aria-label"], Yi = ["role", "aria-label"], Qi = ["data-dc-item"], Zi = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Ji = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], ec = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, tc = { class: "dc-menu__label dc-truncate" }, nc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, sc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, ac = /* @__PURE__ */ ue({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = B(null), o = B([]), i = B(null), r = B(null), u = B(null), f = B(!1), w = g(
      () => s.items.flatMap((M, A) => Et(M) ? [A] : [])
    ), b = g(() => {
      const M = [{ entries: [] }];
      return s.items.forEach((A, J) => {
        A.heading ? M.push({ heading: A, entries: [] }) : M[M.length - 1]?.entries.push({ item: A, index: J });
      }), M.filter((A) => A.entries.length > 0);
    }), m = B({ x: s.at.x, y: s.at.y });
    async function $() {
      m.value = { x: s.at.x, y: s.at.y }, await zt();
      const M = l.value?.getBoundingClientRect();
      if (!M) return;
      const A = 8;
      let J = s.at.x, re = s.at.y;
      if (J + M.width > window.innerWidth - A) {
        const ve = s.at.mirrorX === void 0 ? null : s.at.mirrorX - M.width;
        J = ve !== null && ve >= A ? ve : window.innerWidth - M.width - A;
      }
      re + M.height > window.innerHeight - A && (re = window.innerHeight - M.height - A), m.value = { x: Math.max(A, J), y: Math.max(A, re) };
    }
    const x = g(() => ({ left: `${m.value.x}px`, top: `${m.value.y}px` }));
    function h(M) {
      i.value = M, M !== null && zt(() => o.value[M]?.focus());
    }
    function k(M, A) {
      const J = w.value;
      if (J.length === 0) return null;
      if (M === null) return A === 1 ? J[0] ?? null : J[J.length - 1] ?? null;
      const re = J.indexOf(M);
      return re === -1 ? J[0] ?? null : J[(re + A + J.length) % J.length] ?? null;
    }
    function S(M, A) {
      if (!s.items[M]?.items?.length) return;
      const re = o.value[M]?.getBoundingClientRect(), ve = l.value?.getBoundingClientRect();
      !re || !ve || (u.value = { x: ve.right - 4, y: re.top - 4, mirrorX: ve.left + 4 }, r.value = M, f.value = A);
    }
    function N(M) {
      const A = r.value;
      r.value = null, u.value = null, M && A !== null && h(A);
    }
    function T(M) {
      const A = s.items[M];
      if (!(!A || !Et(A))) {
        if (A.items?.length) {
          S(M, !0);
          return;
        }
        a("choose", A);
      }
    }
    function F(M) {
      const A = M.key;
      if (A === "Escape") {
        M.preventDefault(), M.stopPropagation(), r.value !== null ? N(!0) : a("dismiss");
        return;
      }
      if (A === "ArrowDown" || A === "ArrowUp") {
        M.preventDefault(), M.stopPropagation(), N(!1), h(k(i.value, A === "ArrowDown" ? 1 : -1));
        return;
      }
      if (A === "Home" || A === "End") {
        M.preventDefault(), M.stopPropagation(), N(!1), h(k(null, A === "Home" ? 1 : -1));
        return;
      }
      if (A === "ArrowRight") {
        const J = i.value;
        J !== null && s.items[J]?.items?.length && (M.preventDefault(), M.stopPropagation(), S(J, !0));
        return;
      }
      if (A === "ArrowLeft") {
        r.value !== null && (M.preventDefault(), M.stopPropagation(), N(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const J = i.value;
        if (J === null) return;
        M.preventDefault(), M.stopPropagation(), T(J);
      }
    }
    function V(M) {
      const A = s.items[M];
      !A || !Et(A) || (r.value !== null && r.value !== M && N(!1), h(M), A.items?.length && S(M, !1));
    }
    return Xa(() => {
      $(), s.autofocus && h(k(null, 1));
    }), $e(() => s.at, $, { deep: !0 }), $e(() => s.items, () => void $(), { deep: !0 }), Ue(() => {
      r.value = null;
    }), t({ root: l }), (M, A) => {
      const J = Fs("MenuList", !0);
      return p(), _("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Pe(x.value),
        onKeydown: F
      }, [
        (p(!0), _(Y, null, ce(b.value, (re, ve) => (p(), _("div", {
          key: `${ve}-${re.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: re.heading ? "group" : "none",
          "aria-label": re.heading?.label
        }, [
          re.heading ? (p(), _("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": re.heading.id
          }, z(re.heading.label), 9, Qi)) : I("", !0),
          (p(!0), _(Y, null, ce(re.entries, ({ item: Q, index: Me }) => (p(), _(Y, {
            key: Q.id ?? `${Me}-${Q.label ?? ""}`
          }, [
            Q.separator ? (p(), _("div", Zi)) : (p(), _("button", {
              key: 1,
              ref_for: !0,
              ref: (Ae) => {
                Ae && (o.value[Me] = Ae);
              },
              type: "button",
              class: "dc-menu__item",
              role: Q.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Q.checked === void 0 ? void 0 : Q.checked,
              "aria-haspopup": Q.items?.length ? "menu" : void 0,
              "aria-expanded": Q.items?.length ? r.value === Me : void 0,
              "aria-disabled": Q.disabled ? "true" : void 0,
              disabled: Q.disabled,
              "data-dc-item": Q.id,
              tabindex: "-1",
              onClick: (Ae) => T(Me),
              onMouseenter: (Ae) => V(Me)
            }, [
              y("span", ec, z(Q.checked ? "✓" : ""), 1),
              y("span", tc, z(Q.label), 1),
              Q.shortcut ? (p(), _("span", nc, z(Q.shortcut), 1)) : Q.items?.length ? (p(), _("span", sc, "›")) : I("", !0)
            ], 40, Ji))
          ], 64))), 128))
        ], 8, Yi))), 128)),
        r.value !== null && u.value ? (p(), oe(J, {
          key: r.value,
          items: e.items[r.value]?.items ?? [],
          at: u.value,
          label: e.items[r.value]?.label,
          autofocus: f.value,
          onChoose: A[0] || (A[0] = (re) => a("choose", re)),
          onDismiss: A[1] || (A[1] = (re) => N(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
      ], 44, Xi);
    };
  }
}), pa = /* @__PURE__ */ de(ac, [["__scopeId", "data-v-9b1413fa"]]), lc = ["data-dc-theme", "aria-label"], rc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], oc = /* @__PURE__ */ ue({
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
    const n = e, s = g(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), a = t, l = B(null), o = B([]), i = B(null), r = B(null), u = B(!1), f = g(
      () => n.menus.flatMap((T, F) => Et(T) ? [F] : [])
    );
    function w(T, F) {
      const V = o.value[T]?.getBoundingClientRect(), M = n.menus[T];
      !V || !M || !Et(M) || (r.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, i.value = T, u.value = F);
    }
    function b(T) {
      const F = i.value;
      i.value = null, r.value = null, T && F !== null && o.value[F]?.focus();
    }
    function m(T) {
      i.value === T ? b(!0) : w(T, !1);
    }
    function $(T) {
      i.value === null || i.value === T || w(T, !1);
    }
    function x(T, F) {
      const V = f.value;
      if (V.length === 0) return null;
      if (T === null) return F === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const M = V.indexOf(T);
      return M === -1 ? V[0] ?? null : V[(M + F + V.length) % V.length] ?? null;
    }
    function h(T) {
      const F = T.key;
      if (F === "Escape") {
        if (i.value === null) return;
        T.preventDefault(), b(!0);
        return;
      }
      if (F === "ArrowDown" && i.value === null) {
        const A = k();
        if (A === null) return;
        T.preventDefault(), w(A, !0);
        return;
      }
      if (F !== "ArrowLeft" && F !== "ArrowRight") return;
      const V = i.value ?? k(), M = x(V, F === "ArrowRight" ? 1 : -1);
      M !== null && (T.preventDefault(), i.value !== null ? w(M, !0) : o.value[M]?.focus());
    }
    function k() {
      const T = o.value.findIndex((F) => F === document.activeElement);
      return T === -1 ? f.value[0] ?? null : T;
    }
    function S(T) {
      const F = T.target;
      !F || l.value?.contains(F) || b(!1);
    }
    $e(i, (T) => {
      T !== null ? window.addEventListener("pointerdown", S, !0) : window.removeEventListener("pointerdown", S, !0);
    }), Ue(() => window.removeEventListener("pointerdown", S, !0));
    function N(T) {
      b(!0), T.action?.(), a("choose", T);
    }
    return (T, F) => (p(), _("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Pe(s.value),
      onKeydown: h
    }, [
      (p(!0), _(Y, null, ce(e.menus, (V, M) => (p(), _("button", {
        key: V.id ?? V.label ?? M,
        ref_for: !0,
        ref: (A) => {
          A && (o.value[M] = A);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === M,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: M === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (A) => m(M),
        onMouseenter: (A) => $(M)
      }, z(V.label), 41, rc))), 128)),
      i.value !== null && r.value ? (p(), oe(pa, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: r.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: N,
        onDismiss: F[0] || (F[0] = (V) => b(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
    ], 44, lc));
  }
}), Du = /* @__PURE__ */ de(oc, [["__scopeId", "data-v-93dbd2e4"]]), ic = ["aria-label", "aria-expanded", "disabled"], cc = { "aria-hidden": "true" }, uc = /* @__PURE__ */ ue({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = B(null), a = B(null), l = B(null), o = B(!1), i = g(() => l.value !== null);
    function r($) {
      const x = s.value?.getBoundingClientRect();
      x && (l.value = { x: x.left, y: x.bottom + 4, mirrorX: x.right }, o.value = $);
    }
    function u($) {
      l.value = null, $ && s.value?.focus();
    }
    function f() {
      i.value ? u(!0) : r(!1);
    }
    function w($) {
      $.key !== "ArrowDown" || i.value || ($.preventDefault(), r(!0));
    }
    function b($) {
      const x = $.target;
      x && (s.value?.contains(x) || a.value?.root?.contains(x) || u(!1));
    }
    $e(i, ($) => {
      $ ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), Ue(() => window.removeEventListener("pointerdown", b, !0));
    function m($) {
      u(!0), $.action?.(), n("choose", $);
    }
    return ($, x) => (p(), _(Y, null, [
      y("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: w
      }, [
        y("span", cc, z(e.glyph), 1)
      ], 40, ic),
      l.value ? (p(), oe(pa, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: o.value,
        onChoose: m,
        onDismiss: x[0] || (x[0] = (h) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
    ], 64));
  }
}), Wn = /* @__PURE__ */ de(uc, [["__scopeId", "data-v-48f5ada5"]]), bt = (e) => e.kind === "split", q = (e) => e.kind === "group", j = (e) => e.kind === "float", rt = { x: 16, y: 16, w: 360, h: 260 }, nn = 28, va = 120, xn = 220, ma = 38, dt = 6;
function Dt(e, t) {
  let n = !1;
  const s = e.frames.map((a, l) => {
    const o = t(a.node, l);
    return o === a.node ? a : (n = !0, { ...a, node: o });
  });
  return n ? { ...e, frames: s } : e;
}
function De(e) {
  return { kind: "group", panels: [e] };
}
function Nu(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ie = (e) => typeof e == "string", Hn = (e) => ie(e) ? De(e) : e, Nt = (e) => ie(e) ? [e] : je(e), ks = (e) => e.panels.filter(ie), dc = (e) => e.panels.filter((t) => !ie(t)), Se = (e, t) => e.panels.includes(t);
function It(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (ie(l) || !ee(l, t)) return l;
    const o = n(l);
    return o !== l && (s = !0), o;
  });
  return s ? { ...e, panels: a } : e;
}
function an(e, t) {
  return { node: e, rect: { ...rt, ...t } };
}
function Un(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function jn(e, t) {
  const n = { ...rt, ...t };
  return Un(
    e.map(
      (s, a) => an(s, {
        ...n,
        x: n.x + a * nn,
        y: n.y + a * nn
      })
    )
  );
}
function Gn(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Xn = (e, t, n) => Gn("row", e, t, n), Iu = (e, t, n) => Gn("column", e, t, n);
function he(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Ou = (e) => ({ ...e, headless: !0 }), Vu = (e) => ({ ...e, fixedView: !0 }), fc = (e) => e === "left" || e === "right" ? "row" : "column";
function je(e) {
  return q(e) ? e.panels.flatMap(Nt) : j(e) ? e.frames.flatMap((t) => je(t.node)) : e.children.flatMap(je);
}
function ee(e, t) {
  return q(e) ? e.panels.some((n) => ie(n) ? n === t : ee(n, t)) : j(e) ? e.frames.some((n) => ee(n.node, t)) : e.children.some((n) => ee(n, t));
}
const ha = (e) => je(e).length === 0, Mn = (e) => !q(e) && ct(e), Cn = (e) => ha(e) && !Mn(e);
function ln(e) {
  return bt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : j(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ie(t) ? [] : [{ node: t, index: n }]);
}
const Yn = (e) => ln(e).map((t) => t.node);
function ut(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => ie(s) ? s === t : ee(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function _a(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && ie(t) ? t : "";
}
function ke(e) {
  if (ie(e)) return e;
  if (q(e)) {
    const n = e.panels[ut(e)];
    return n === void 0 ? "" : ke(n);
  }
  if (j(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? ke(n.node) : "";
  }
  const t = e.children[0];
  return t ? ke(t) : "";
}
function pt(e, t) {
  if (q(e) && Se(e, t)) return e;
  for (const n of Yn(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function pc(e) {
  const t = Yn(e).flatMap(pc);
  return q(e) ? [e, ...t] : t;
}
function ge(e, t) {
  if (q(e)) {
    for (const n of dc(e)) {
      const s = ge(n, t);
      if (s) return s;
    }
    return null;
  }
  if (j(e)) {
    for (const n of e.frames)
      if (ee(n.node, t))
        return ge(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = ge(n, t);
    if (s) return s;
  }
  return null;
}
function vn(e, t, n = va) {
  const s = (i, r) => r > 0 ? Math.max(Math.min(i, r), Math.min(n, r)) : Math.max(i, n), a = s(e.w, t.w), l = s(e.h, t.h), o = (i, r, u) => Math.min(Math.max(i, 0), Math.max(u - r, 0));
  return {
    x: Math.round(o(e.x, a, t.w)),
    y: Math.round(o(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function $s(e, t, n, s, a = va) {
  let { x: l, y: o, w: i, h: r } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, l = e.x + n), t.includes("s") && (r = e.h + s), t.includes("n") && (r = e.h - s, o = e.y + s), i < a && (t.includes("w") && (l = e.x + e.w - a), i = a), r < a && (t.includes("n") && (o = e.y + e.h - a), r = a), { x: l, y: o, w: i, h: r };
}
const ga = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (q(e)) return It(e, t, (l) => vt(l, t, n));
  if (j(e)) {
    let l = !1;
    const o = e.frames.map((i) => {
      if (!ee(i.node, t)) return i;
      if (ge(i.node, t)) {
        const u = vt(i.node, t, n);
        return u === i.node ? i : (l = !0, { ...i, node: u });
      }
      const r = n(i);
      return r === i ? i : (l = !0, r);
    });
    return l ? { ...e, frames: o } : e;
  }
  if (!ee(e, t)) return e;
  let s = !1;
  const a = e.children.map((l) => {
    const o = vt(l, t, n);
    return o !== l && (s = !0), o;
  });
  return s ? { ...e, children: a } : e;
}
function vc(e, t, n) {
  return vt(e, t, (s) => ga(s.rect, n) ? s : { ...s, rect: n });
}
const Je = (e) => e.maximized === !0, ya = (e) => (t) => {
  if (Je(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function mc(e, t, n = !0) {
  return vt(e, t, ya(n));
}
function Ku(e, t) {
  const n = ge(e, t);
  return n ? mc(e, t, !Je(n)) : e;
}
const at = (e) => e.minimized === !0, wa = (e) => (t) => {
  if (at(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function hc(e, t, n = !0) {
  return vt(e, t, wa(n));
}
function qu(e, t) {
  const n = ge(e, t);
  return n ? hc(e, t, !at(n)) : e;
}
function st(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = et(e, t.slice(0, -1));
  return !s || !j(s) ? null : s.frames[n] ?? null;
}
function En(e, t) {
  if (j(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ee(s.node, t)) continue;
      const a = En(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of ln(e)) {
    if (!ee(n, t)) continue;
    const a = En(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function Qn(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = et(e, a);
  if (!l || !j(l)) return e;
  const o = l.frames[s];
  if (!o) return e;
  const i = n(o);
  if (i === o) return e;
  const r = [...l.frames];
  return r[s] = i, it(e, a, { ...l, frames: r });
}
function xs(e, t, n) {
  return Qn(
    e,
    t,
    (s) => ga(s.rect, n) ? s : { ...s, rect: n }
  );
}
function _c(e, t, n = !0) {
  return Qn(e, t, ya(n));
}
function gc(e, t, n = !0) {
  return Qn(e, t, wa(n));
}
function St(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (j(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const i = St(o.node, s), r = i === o.node ? o : { ...o, node: i };
    if (n === e.frames.length - 1 && r === o) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(r), { ...e, frames: u };
  }
  const a = et(e, [n]);
  if (!a) return e;
  const l = St(a, s);
  return l === a ? e : it(e, [n], l);
}
function yc(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (j(s) && (n[l] = s.frames.length - 1), s = et(s, [a]));
  }), n;
}
function Ut(e, t, n, s) {
  if (q(e)) return It(e, n, (o) => Ut(o, t, n, s));
  if (j(e)) {
    const o = e.frames.findIndex((r) => ee(r.node, n)), i = e.frames[o];
    if (!i) return e;
    if (ge(i.node, n)) {
      const r = Ut(i.node, t, n, s);
      if (r === i.node) return e;
      const u = [...e.frames];
      return u[o] = { ...i, node: r }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, an(De(t), s)] };
  }
  if (!ee(e, n)) return e;
  let a = !1;
  const l = e.children.map((o) => {
    const i = Ut(o, t, n, s);
    return i !== o && (a = !0), i;
  });
  return a ? { ...e, children: l } : e;
}
function Ms(e, t, n, s) {
  if (t === n || !ee(e, t) || !ee(e, n) || !ge(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const l = Ut(a, t, n, s);
  return l === a ? e : _e(l);
}
function wc(e, t, n) {
  return j(e) ? { ...e, frames: [...e.frames, an(De(t), n)] } : q(e) ? ka(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, De(t)],
    sizes: [...He(e), 1],
    ...he(e)
  };
}
function ba(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return wc(e, t, s);
  const l = n.slice(1), o = (f, w) => w === a ? ba(f, t, l, s) : ot(f, t);
  if (j(e)) {
    const f = e.frames.flatMap((w, b) => {
      const m = o(w.node, b);
      return m ? [m === w.node ? w : { ...w, node: m }] : [];
    });
    return { ...e, frames: f };
  }
  if (q(e)) {
    const f = ut(e), w = [];
    e.panels.forEach(($, x) => {
      if (ie($)) {
        $ !== t && w.push($);
        return;
      }
      const h = o($, x);
      h && w.push(h);
    });
    const m = e.active && w.some(($) => Nt($).includes(e.active)) ? e.active : ke(w[f] ?? w[w.length - 1]);
    return {
      kind: "group",
      panels: w,
      ...m ? { active: m } : {},
      ...he(e)
    };
  }
  const i = He(e), r = [], u = [];
  return e.children.forEach((f, w) => {
    const b = o(f, w);
    b && (r.push(b), u.push(i[w] ?? 0));
  }), { kind: "split", direction: e.direction, children: r, sizes: u, ...he(e) };
}
function Cs(e, t, n, s) {
  const a = et(e, n);
  return !a || !ha(a) || !ee(e, t) ? e : _e(ba(e, t, n, s));
}
function mn(e, t) {
  if (q(e)) return It(e, t, (a) => mn(a, t));
  if (j(e)) {
    const a = e.frames.findIndex((u) => ee(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const o = mn(l.node, t), i = o === l.node ? l : { ...l, node: o };
    if (a === e.frames.length - 1 && i === l) return e;
    const r = [...e.frames];
    return r.splice(a, 1), r.push(i), { ...e, frames: r };
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = mn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Zn(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), a = s.reduce((l, o) => l + o, 0);
  return a <= 0 ? n() : s.map((l) => l / a);
}
const He = (e) => Zn(e.children.length, e.sizes), Te = (e) => {
  const t = q(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function _e(e) {
  if (q(e)) return bc(e);
  if (j(e)) {
    const i = e.frames.flatMap((r) => {
      const u = _e(r.node);
      return Cn(u) ? [] : [u === r.node ? r : { ...r, node: u }];
    });
    return i.length === e.frames.length && i.every((r, u) => r === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = He(e), n = Te(e), s = [], a = [], l = [];
  e.children.forEach((i, r) => {
    const u = _e(i), f = t[r] ?? 0;
    if (Cn(u)) return;
    if (!n && bt(u) && u.direction === e.direction && !Te(u) && !ct(u)) {
      const b = He(u);
      u.children.forEach((m, $) => {
        s.push(m), a.push(f * (b[$] ?? 0));
      });
      return;
    }
    s.push(u), a.push(f);
    const w = n?.[r];
    w && l.push(w);
  });
  const o = s[0];
  return s.length === 1 && o && !ct(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: Zn(s.length, a),
    ...he(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function bc(e) {
  if (e.panels.every(ie)) return e;
  const t = ke(e), n = Te(e), s = [], a = [];
  e.panels.forEach((i, r) => {
    const u = n?.[r];
    if (ie(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const f = _e(i);
    if (!Cn(f)) {
      if (q(f) && !ct(f) && !Te(f)) {
        s.push(...f.panels);
        return;
      }
      s.push(f), u && a.push(u);
    }
  });
  const l = s[0];
  if (s.length === 1 && l !== void 0 && !ie(l) && !ct(e))
    return l;
  if (s.length === e.panels.length && s.every((i, r) => i === e.panels[r]))
    return e;
  const o = t && s.some((i) => Nt(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...o ? { active: o } : {},
    ...he(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ot(e, t) {
  if (j(e)) {
    const o = e.frames.flatMap((i) => {
      const r = ot(i.node, t);
      return r ? [r === i.node ? i : { ...i, node: r }] : [];
    });
    return o.length === 0 && !Mn(e) ? null : { ...e, frames: o };
  }
  if (q(e)) {
    if (!ee(e, t)) return e;
    const o = ut(e), i = [];
    for (const f of e.panels) {
      if (ie(f)) {
        f !== t && i.push(f);
        continue;
      }
      const w = ot(f, t);
      w && i.push(w);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((f) => Nt(f).includes(e.active)) ? e.active : ke(i[o] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...he(e) } : { kind: "group", panels: i, ...he(e) };
  }
  const n = He(e), s = [], a = [];
  if (e.children.forEach((o, i) => {
    const r = ot(o, t);
    r && (s.push(r), a.push(n[i] ?? 0));
  }), s.length === 0)
    return Mn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...he(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !ct(e) ? l : _e({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...he(e)
  });
}
function ka(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...he(e) };
}
function Ct(e, t, n, s, a) {
  const l = (m) => Dt(
    m,
    ($) => ee($, n) ? Ct($, t, n, s, a) : $
  );
  if (s === "float") return e;
  const o = (m) => It(m, n, ($) => Ct($, t, n, s, a));
  if (s === "center")
    return q(e) ? Se(e, n) ? ka(e, t, a) : o(e) : j(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (m) => ee(m, n) ? Ct(m, t, n, s, a) : m
      )
    };
  const i = fc(s), r = s === "left" || s === "top", u = (m) => ({
    kind: "split",
    direction: i,
    children: r ? [De(t), m] : [m, De(t)],
    sizes: [0.5, 0.5]
  });
  if (q(e)) return Se(e, n) ? u(e) : o(e);
  if (j(e)) return l(e);
  const f = He(e), w = e.children.findIndex(
    (m) => q(m) && Se(m, n)
  );
  if (w >= 0 && e.direction === i) {
    const m = (f[w] ?? 0) / 2, $ = [...e.children], x = [...f];
    return $.splice(r ? w : w + 1, 0, De(t)), x.splice(w, 1, m, m), {
      kind: "split",
      direction: i,
      children: $,
      sizes: x,
      ...he(e)
    };
  }
  const b = e.children.map((m) => ee(m, n) ? q(m) && Se(m, n) ? u(m) : Ct(m, t, n, s) : m);
  return {
    kind: "split",
    direction: e.direction,
    children: b,
    sizes: f,
    ...he(e)
  };
}
function mt(e, t) {
  if (q(e)) {
    if (Se(e, t))
      return _a(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((r) => !ie(r) && ee(r, t)), l = e.panels[a];
    if (l === void 0 || ie(l)) return e;
    const o = mt(l, t);
    if (o === l && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = o, { ...e, panels: i, active: t };
  }
  if (!ee(e, t)) return e;
  if (j(e)) return Dt(e, (a) => mt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = mt(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Pt(e, t, n) {
  if (q(e)) {
    if (!Se(e, t)) return It(e, t, (u) => Pt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const l = [...e.panels];
    l.splice(s, 1), l.splice(a, 0, t);
    const o = Te(e), i = o ? [...o] : void 0;
    i && i.splice(a, 0, ...i.splice(s, 1));
    const r = ke(e);
    return {
      kind: "group",
      panels: l,
      ...r ? { active: r } : {},
      ...he(e),
      ...i ? { places: i } : {}
    };
  }
  return ee(e, t) ? j(e) ? Dt(e, (s) => Pt(s, t, n)) : { ...e, children: e.children.map((s) => Pt(s, t, n)) } : e;
}
function jt(e, t, n) {
  if (t === n) return e;
  if (q(e)) {
    if (!ee(e, t) && !ee(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => ie(l) ? s(l) : jt(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return j(e) ? Dt(e, (s) => jt(s, t, n)) : { ...e, children: e.children.map((s) => jt(s, t, n)) };
}
function Bt(e, t, n, s, a) {
  if (s === "float" || !ee(e, t) || !ee(e, n)) return e;
  const l = pt(e, t);
  if (s === "center" && l && Se(l, n)) {
    if (a === void 0) return e;
    const i = l.panels.indexOf(t), r = a > i ? a - 1 : a;
    return r === i ? e : mt(Pt(e, t, r), t);
  }
  if (t === n) return e;
  const o = ot(e, t);
  return o ? _e(Ct(o, t, n, s, a)) : e;
}
function $a(e, t, n) {
  if (q(e)) {
    const a = e.panels[t];
    if (a === void 0 || ie(a)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (j(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const l = [...e.frames];
    return l[t] = { ...a, node: n }, { ...e, frames: l };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function Ot(e, t, n) {
  const s = ln(e);
  if (!q(e) && s.some(({ node: a }) => q(a) && Se(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!ee(a, t)) continue;
    const o = Ot(a, t, n);
    return o ? $a(e, l, o) : null;
  }
  return null;
}
function Bu(e, t, n) {
  const s = Ot(
    e,
    t,
    (a) => bt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? _e(s) : e;
}
function xa(e) {
  return j(e) ? [e] : Te(e) || ct(e) ? [e] : q(e) ? [...e.panels] : e.children.flatMap(xa);
}
function Ma(e, t) {
  if (q(e)) return e;
  const n = Yn(e).map(xa), s = n.flat(), a = t && s.some((o) => Nt(o).includes(t)) ? t : void 0, l = kc(e, n);
  return _e({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...he(e),
    ...l ? { places: l } : {}
  });
}
function kc(e, t) {
  const n = j(e) ? e.frames.map(({ node: s, ...a }) => a) : Te(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function $c(e, t) {
  const n = Ot(e, t, (s) => Ma(s, t));
  return n ? _e(n) : e;
}
function Jn(e, t, n) {
  if (q(e) && Se(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of ln(e)) {
    if (!ee(s, t)) continue;
    const l = Jn(s, t, n);
    return l ? $a(e, a, l) : null;
  }
  return null;
}
function Es(e, t, n) {
  const s = Jn(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const l = Te(a);
    return {
      ...Gn(n, a.panels.map(Hn)),
      ...he(a),
      ...l ? { places: l } : {}
    };
  });
  return s ? _e(s) : e;
}
function Sn(e, t) {
  if (q(e)) return e;
  if (j(e)) {
    const a = e.frames.findIndex(
      (i) => q(i.node) && i.node.panels.includes(t)
    ), l = e.frames[a], o = l && q(l.node) ? l.node : null;
    if (l && o && o.panels.length > 1) {
      const i = jn(o.panels.map(Hn), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return Dt(e, (i) => Sn(i, t));
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = Sn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function xc(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (ge(e, t)?.node === s) {
    const o = Sn(e, t);
    return o === e ? e : _e(o);
  }
  const l = Jn(e, t, (o) => ({
    ...Un(Ca(o.panels.map(Hn), Te(o), n)),
    ...he(o)
  }));
  return l ? _e(l) : e;
}
function Ca(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : jn(e, n).frames;
}
function Ea(e, t) {
  return { ...Un(Ca(e.children, Te(e), t)), ...he(e) };
}
function Wu(e, t, n) {
  const s = Ot(
    e,
    t,
    (a) => j(a) ? a : Ea(a, n)
  );
  return s ? _e(s) : q(e) && Se(e, t) ? jn([e], n) : e;
}
function Mc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function Sa(e, t) {
  const n = Mc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...he(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Hu(e, t, n = "row") {
  const s = Ot(
    e,
    t,
    (a) => j(a) ? Sa(a, n) : a
  );
  return s ? _e(s) : e;
}
function Pa(e) {
  if (j(e)) return null;
  const t = q(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ie(t) || q(t) && t.panels.length === 1 && ie(t.panels[0]) ? null : t;
}
const Cc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Ec(e, t) {
  const n = Pa(e);
  return n ? t === "inner" ? n : { ...Cc(n), ...he(e) } : e;
}
function yt(e) {
  return e.title ? e.title : q(e) ? "" : j(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function At(e, t) {
  if (q(e)) {
    const s = e.panels[ut(e)];
    return s === void 0 ? "" : ie(s) ? t(s) ?? s : yt(s) || At(s, t);
  }
  if (e.title) return e.title;
  if (j(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? At(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? At(n, t) : "";
}
function et(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (bt(n)) n = n.children[s];
    else if (j(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || ie(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function it(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (j(e)) {
    const r = e.frames[s];
    if (!r) return e;
    const u = it(r.node, a, n);
    if (u === r.node) return e;
    const f = [...e.frames];
    return f[s] = { ...r, node: u }, { ...e, frames: f };
  }
  if (q(e)) {
    const r = e.panels[s];
    if (r === void 0 || ie(r)) return e;
    const u = it(r, a, n);
    if (u === r) return e;
    const f = [...e.panels];
    return f[s] = u, { ...e, panels: f };
  }
  const l = e.children[s];
  if (!l) return e;
  const o = it(l, a, n);
  if (o === l) return e;
  const i = [...e.children];
  return i[s] = o, { ...e, children: i };
}
function Gt(e, t, n) {
  if (t.length === 0)
    return bt(e) ? { ...e, sizes: Zn(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (j(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const r = Gt(i.node, a, n);
    if (r === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: r }, { ...e, frames: u };
  }
  if (q(e)) {
    const i = e.panels[s];
    if (i === void 0 || ie(i)) return e;
    const r = Gt(i, a, n);
    if (r === i) return e;
    const u = [...e.panels];
    return u[s] = r, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const o = [...e.children];
  return o[s] = Gt(l, a, n), { ...e, children: o };
}
function Ss(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const o = a + l;
  if (o < s * 2) return e;
  const i = [...e], r = Math.min(Math.max(a + n, s), o - s);
  return i[t] = r, i[t + 1] = o - r, i;
}
function sn(e) {
  if (!q(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ie(t) ? e : { ...Xn([Sc(e)]), ...he(e) };
}
const Sc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ps(e) {
  return e.length === 0 ? null : Xn(e.map(De));
}
function Pc(e, t) {
  if (!e) return Ps(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const r of je(e))
    !n.has(r) || s.has(r) ? a.add(r) : s.add(r);
  let l = e;
  for (const r of a)
    l = l ? ot(l, r) : null;
  const o = new Set(l ? je(l) : []), i = t.filter((r) => !o.has(r));
  if (i.length === 0) return l ? sn(_e(l)) : null;
  if (!l) return Ps(i);
  if (j(l)) {
    const r = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...i.map(
          (u, f) => an(De(u), {
            x: rt.x + (r + f) * nn,
            y: rt.y + (r + f) * nn
          })
        )
      ]
    };
  }
  return sn(_e(Xn([l, ...i.map(De)])));
}
const es = Symbol("dc.windowContext");
function Ac(e) {
  return Pn(es, e), e;
}
function ts() {
  const e = _t(es, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const zc = ["data-dc-glyph"], Rc = { class: "dc-glyph__line" }, Tc = ["d"], Fc = {
  key: 0,
  class: "dc-glyph__aqua"
}, Lc = ["d"], Dc = /* @__PURE__ */ ue({
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
    return (s, a) => (p(), _("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      y("g", Rc, [
        (p(!0), _(Y, null, ce(t[e.kind], (l) => (p(), _("path", {
          key: l,
          d: l
        }, null, 8, Tc))), 128))
      ]),
      n[e.kind] ? (p(), _("g", Fc, [
        (p(!0), _(Y, null, ce(n[e.kind], (l) => (p(), _("path", {
          key: l,
          d: l
        }, null, 8, Lc))), 128))
      ])) : I("", !0)
    ], 8, zc));
  }
}), ht = /* @__PURE__ */ de(Dc, [["__scopeId", "data-v-4d2872c0"]]), Nc = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Ic = ["data-dc-movable"], Oc = { class: "dc-float__title dc-truncate" }, Vc = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Kc = ["aria-label", "aria-pressed", "data-dc-minimize"], qc = ["aria-label", "aria-pressed", "data-dc-maximize"], Bc = ["aria-label", "data-dc-close"], Wc = { class: "dc-float__content" }, Hc = ["data-dc-handle", "onPointerdown"], Uc = /* @__PURE__ */ ue({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ts(), s = g(() => ke(t.frame.node)), a = g(() => n.panelFor(s.value)?.fixed === !0), l = g(() => Je(t.frame)), o = g(() => at(t.frame)), i = g(() => l.value || o.value), r = g(() => n.resizable.value && !a.value && !i.value), u = g(() => n.movable.value && !a.value && !i.value), f = g(() => {
      const F = je(t.frame.node);
      return F.length === 1 ? F[0] ?? null : null;
    }), w = g(() => f.value !== null && n.closable(f.value)), b = g(() => t.frame.node.headless === !0), m = g(
      () => !b.value && (!q(t.frame.node) || o.value)
    ), $ = g(
      () => t.frame.title || yt(t.frame.node) || At(t.frame.node, (F) => n.panelFor(F)?.title)
    ), x = g(() => n.spaceMenu(t.path));
    function h(F) {
      F.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, F, "move");
    }
    function k(F) {
      F.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const S = g(() => {
      const F = n.framing.value;
      return F !== null && ee(t.frame.node, F);
    }), N = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${xn}px`,
        height: `${ma}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), T = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (F, V) => (p(), _("div", {
      class: "dc-float",
      style: Pe(N.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": S.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (M) => E(n).raiseAt(e.path))
    }, [
      m.value ? (p(), _("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: h,
        onDblclick: k
      }, [
        y("span", Oc, z($.value), 1),
        x.value.length ? (p(), oe(Wn, {
          key: 0,
          items: x.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : I("", !0),
        !a.value || o.value && w.value && f.value ? (p(), _("div", Vc, [
          a.value ? I("", !0) : (p(), _("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${$.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (M) => E(n).toggleMinimizeAt(e.path))
          }, [
            pe(ht, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Kc)),
          a.value ? I("", !0) : (p(), _("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${$.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (M) => E(n).toggleMaximizeAt(e.path))
          }, [
            pe(ht, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, qc)),
          o.value && w.value && f.value ? (p(), _("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": f.value,
            onClick: V[2] || (V[2] = (M) => E(n).close(f.value))
          }, [
            pe(ht, { kind: "close" })
          ], 8, Bc)) : I("", !0)
        ])) : I("", !0)
      ], 40, Ic)) : I("", !0),
      y("div", Wc, [
        Be(F.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), _(Y, null, ce(r.value ? T : [], (M) => (p(), _("span", {
        key: M,
        class: "dc-float__grip",
        "data-dc-handle": M,
        "aria-hidden": "true",
        onPointerdown: qe((A) => E(n).beginFrameDragAt(e.path, A, M), ["stop"])
      }, null, 40, Hc))), 128))
    ], 44, Nc));
  }
}), jc = /* @__PURE__ */ de(Uc, [["__scopeId", "data-v-f035684c"]]), ns = Symbol("dc.paneContext");
function Gc(e) {
  return Pn(ns, e), e;
}
function Uu() {
  return _t(ns, null);
}
function ju(e) {
  const t = _t(es, null), n = _t(ns, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Mt(e)
  );
  return Ya() && zs(s), s;
}
const Xc = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Yc = ["data-dc-movable"], Qc = ["aria-label", "aria-pressed"], Zc = ["data-dc-space-name"], Jc = { class: "dc-truncate" }, eu = ["aria-label"], tu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, nu = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], su = { class: "dc-tab__name dc-truncate" }, au = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, lu = ["aria-label", "data-dc-close", "onClick"], ru = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ou = { class: "dc-pane__tools" }, iu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, cu = ["aria-label", "data-dc-minimize"], uu = ["aria-label", "aria-pressed", "data-dc-maximize"], du = ["aria-label", "data-dc-close"], fu = ["id", "role", "aria-labelledby"], pu = ["id", "role", "aria-labelledby"], vu = ["data-dc-edge"], mu = /* @__PURE__ */ ue({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ts(), s = Ts() ?? "dc-pane", a = g(
      () => t.group.panels.flatMap((L, K) => {
        if (!ie(L)) {
          const xe = yt(L) || At(L, (we) => n.panelFor(we)?.title);
          return [{ kind: "space", index: K, id: `space-${K}`, title: xe, node: L }];
        }
        const X = n.panelFor(L);
        return X ? [{ kind: "panel", index: K, id: L, title: X.title, panel: X }] : [];
      })
    ), l = g(() => a.value.length > 1), o = g(() => {
      const L = ut(t.group);
      return a.value.find((K) => K.index === L) ?? a.value[0] ?? null;
    }), i = g(() => o.value?.kind === "space" ? o.value.node : null), r = g(() => i.value ? "" : _a(t.group)), u = g(() => i.value ? null : n.panelFor(r.value)), f = g(() => o.value?.title ?? ""), w = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), b = g(() => [...t.path, o.value?.index ?? 0]), m = g(() => r.value || ks(t.group)[0] || ""), $ = g(() => n.viewFor(r.value)), x = g(() => t.group.headless === !0), h = g(() => n.focused.value === r.value), k = g(() => n.dragging.value === r.value), S = g(() => n.moving.value === r.value), N = g(() => n.frameOf(m.value) !== null), T = g(() => n.panelFor(m.value)?.fixed === !0), F = g(
      () => !i.value && (n.canMove(r.value) || N.value && n.movable.value && !T.value)
    ), V = g(
      () => i.value ? n.spaceMenu(b.value) : n.menuFor(r.value)
    ), M = (L) => n.closable(L);
    Gc({ panel: r });
    const A = g(() => n.maximized(m.value)), J = g(
      () => N.value && !T.value || !l.value && !!u.value && M(u.value.id)
    ), re = (L) => `${s}-tab-${L}`, ve = g(() => `${s}-body`), Q = g(() => {
      const L = n.dropTarget.value;
      return !L || !Se(t.group, L.panel) || L.edge === "float" ? null : L;
    }), Me = g(() => Q.value?.index === void 0 ? Q.value?.edge ?? null : null), Ae = g(() => Q.value?.index ?? null), D = () => u.value ? n.renderContent(u.value, $.value, h.value) ?? null : null, G = () => u.value ? n.renderActions(u.value, $.value, h.value) ?? null : null;
    let te = null;
    function ne(L) {
      const K = te !== null && Math.hypot(L.clientX - te.x, L.clientY - te.y) >= 4;
      return te = null, K;
    }
    const me = (L) => L.kind === "panel" ? L.id : ke(L.node);
    function Ce(L, K) {
      K.kind !== "space" && (n.focus(K.id), te = { x: L.clientX, y: L.clientY }, n.beginDrag(K.id, L));
    }
    function Ge(L, K) {
      if (ne(L)) return;
      const X = me(K);
      X && n.selectPanel(X);
    }
    function Xe(L) {
      r.value && n.focus(r.value), !L.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (N.value ? n.beginFrameDrag(m.value, L, "move") : n.beginDrag(r.value, L));
    }
    function Ye(L) {
      te = { x: L.clientX, y: L.clientY }, n.beginDrag(r.value, L);
    }
    function Qe(L) {
      ne(L) || n.toggleMoveMode(r.value);
    }
    const Ne = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ie(L) {
      if (!S.value) return;
      if (L.key === "Escape") {
        L.preventDefault(), n.toggleMoveMode(r.value);
        return;
      }
      const K = Ne[L.key];
      K && (L.preventDefault(), N.value ? n.nudgeFrame(r.value, K, L.shiftKey) : n.nudge(r.value, K, L.shiftKey));
    }
    function Oe(L) {
      !N.value || L.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(m.value);
    }
    function kt(L, K) {
      L.stopPropagation(), te = null, n.close(K);
    }
    function Vt(L, K) {
      const X = a.value.length;
      let xe = null;
      if (L.key === "ArrowRight" ? xe = (K + 1) % X : L.key === "ArrowLeft" ? xe = (K - 1 + X) % X : L.key === "Home" ? xe = 0 : L.key === "End" && (xe = X - 1), xe === null) return;
      L.preventDefault();
      const we = a.value[xe];
      if (!we) return;
      const $t = me(we);
      $t && n.selectPanel($t);
    }
    return (L, K) => o.value ? (p(), _("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": r.value || void 0,
      "data-dc-panels": E(ks)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": N.value ? "true" : "false",
      "data-dc-maximized": A.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": h.value ? "true" : "false",
      "data-dc-dragging": k.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: K[7] || (K[7] = (X) => r.value && E(n).focus(r.value))
    }, [
      x.value ? I("", !0) : (p(), _("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": F.value ? "true" : "false",
        onPointerdown: Xe,
        onDblclick: Oe
      }, [
        F.value ? (p(), _("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": S.value,
          onPointerdown: Ye,
          onClick: Qe,
          onKeydown: Ie
        }, [...K[8] || (K[8] = [
          y("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Qc)) : I("", !0),
        w.value ? (p(), _("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": w.value
        }, [
          y("span", Jc, z(w.value), 1)
        ], 8, Zc)) : I("", !0),
        y("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (p(!0), _(Y, null, ce(a.value, (X, xe) => (p(), _(Y, {
            key: X.id
          }, [
            Ae.value === xe ? (p(), _("span", tu)) : I("", !0),
            y("button", {
              id: re(X.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": X.kind === "panel" ? X.id : void 0,
              "data-dc-space": X.kind === "space" ? X.title : void 0,
              "aria-selected": X.index === o.value.index,
              "aria-controls": ve.value,
              tabindex: X.index === o.value.index ? 0 : -1,
              onPointerdown: (we) => Ce(we, X),
              onClick: (we) => Ge(we, X),
              onKeydown: (we) => Vt(we, xe)
            }, [
              y("span", su, z(X.title), 1),
              X.kind === "panel" && X.panel.subtitle ? (p(), _("span", au, z(X.panel.subtitle), 1)) : I("", !0),
              l.value && X.kind === "panel" && M(X.id) ? (p(), _("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${X.title}`,
                "data-dc-close": X.id,
                onPointerdown: K[0] || (K[0] = qe(() => {
                }, ["stop"])),
                onClick: (we) => kt(we, X.id)
              }, [...K[9] || (K[9] = [
                y("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, lu)) : I("", !0)
            ], 40, nu)
          ], 64))), 128)),
          Ae.value === a.value.length ? (p(), _("span", ru)) : I("", !0)
        ], 8, eu),
        y("div", ou, [
          pe(G),
          V.value.length ? (p(), oe(Wn, {
            key: 0,
            items: V.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : I("", !0)
        ]),
        J.value ? (p(), _("div", iu, [
          N.value && !T.value ? (p(), _("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": m.value,
            onPointerdown: K[1] || (K[1] = qe(() => {
            }, ["stop"])),
            onClick: K[2] || (K[2] = (X) => E(n).toggleMinimize(m.value))
          }, [
            pe(ht, { kind: "minimize" })
          ], 40, cu)) : I("", !0),
          N.value && !T.value ? (p(), _("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": m.value,
            onPointerdown: K[3] || (K[3] = qe(() => {
            }, ["stop"])),
            onClick: K[4] || (K[4] = (X) => E(n).toggleMaximize(m.value))
          }, [
            pe(ht, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, uu)) : I("", !0),
          !l.value && u.value && M(u.value.id) ? (p(), _("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: K[5] || (K[5] = qe(() => {
            }, ["stop"])),
            onClick: K[6] || (K[6] = (X) => E(n).close(u.value.id))
          }, [
            pe(ht, { kind: "close" })
          ], 40, du)) : I("", !0)
        ])) : I("", !0)
      ], 40, Yc)),
      i.value ? (p(), _("div", {
        key: 1,
        id: ve.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : re(o.value.id)
      }, [
        Be(L.$slots, "space", {
          node: i.value,
          path: b.value
        }, void 0, !0)
      ], 8, fu)) : (p(), _("div", {
        key: 2,
        id: ve.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : re(r.value)
      }, [
        pe(D)
      ], 8, pu)),
      Me.value ? (p(), _("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Me.value,
        "aria-hidden": "true"
      }, null, 8, vu)) : I("", !0)
    ], 40, Xc)) : I("", !0);
  }
}), Aa = /* @__PURE__ */ de(mu, [["__scopeId", "data-v-44fd2b2d"]]), hu = ["data-dc-space", "data-dc-path", "aria-label"], _u = {
  key: 0,
  class: "dc-space__head"
}, gu = { class: "dc-space__title dc-truncate" }, yu = ["data-dc-direction"], wu = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, bu = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], ku = /* @__PURE__ */ ue({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ts(), s = B(null), a = g(() => q(t.node) ? t.node : null), l = g(() => bt(t.node) ? t.node : null), o = g(() => j(t.node) ? t.node : null), i = g(
      () => l.value ? l.value.children : o.value?.frames.map((D) => D.node) ?? []
    ), r = g(() => l.value ? He(l.value) : []), u = g(
      () => (o.value?.frames ?? []).map((D, G) => ({
        held: D,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: G,
        key: M(D.node),
        path: [...t.path, G]
      })).sort((D, G) => D.key < G.key ? -1 : D.key > G.key ? 1 : 0)
    ), f = g(() => yt(t.node)), w = g(() => n.spaceMenu(t.path)), b = g(() => t.node.headless === !0), m = g(() => o.value ? "desktop" : l.value?.direction ?? ""), $ = B(null), x = B(0);
    let h = null;
    $e(
      $,
      (D) => {
        h?.disconnect(), h = null, !(!D || typeof ResizeObserver > "u") && (x.value = D.clientWidth, h = new ResizeObserver(([G]) => {
          x.value = G?.contentRect.width ?? 0;
        }), h.observe(D));
      },
      { immediate: !0 }
    ), Ue(() => h?.disconnect());
    const k = g(() => {
      const D = Math.max(
        1,
        Math.floor((x.value + dt) / (xn + dt))
      ), G = /* @__PURE__ */ new Map();
      let te = 0;
      for (const ne of u.value)
        ne.held.minimized === !0 && (G.set(ne.key, {
          x: dt + te % D * (xn + dt),
          bottom: dt + Math.floor(te / D) * (ma + dt)
        }), te += 1);
      return G;
    }), S = (D) => !!D && D.join("/") === t.path.join("/"), N = g(() => {
      const D = n.dropTarget.value, G = o.value;
      if (!G || !D?.rect || D.edge !== "float") return null;
      if (D.space) return S(D.space) ? D.rect : null;
      const te = ge(G, D.panel);
      return te && G.frames.includes(te) ? D.rect : null;
    }), T = g(() => {
      const D = n.dropTarget.value;
      return !!D && !D.rect && S(D.space);
    }), F = g(() => l.value?.direction === "row"), V = g(() => i.value.map((D, G) => [...t.path, G])), M = (D) => [...je(D)].sort().join("/"), A = (D) => {
      const G = je(D)[0];
      return (G ? n.panelFor(G)?.title : null) ?? G ?? "panel";
    }, J = (D) => {
      const G = i.value[D], te = i.value[D + 1];
      return !G || !te ? "Resize panels" : `Resize ${A(G)} and ${A(te)}`;
    }, re = (D) => {
      const G = r.value[D] ?? 0, te = r.value[D + 1] ?? 0, ne = G + te;
      return ne > 0 ? Math.round(G / ne * 100) : 50;
    };
    function ve() {
      const D = s.value, G = D ? F.value ? D.clientWidth : D.clientHeight : 0;
      return G <= 0 ? 0.05 : Math.min(n.minPanelSize.value / G, 0.4);
    }
    let Q = null;
    function Me(D, G) {
      const te = l.value, ne = s.value;
      if (!n.resizable.value || !te || !ne || D.button !== 0) return;
      const me = F.value ? ne.clientWidth : ne.clientHeight;
      if (me <= 0) return;
      const Ce = F.value ? D.clientX : D.clientY, Ge = He(te), Xe = Math.min(n.minPanelSize.value / me, 0.4);
      D.preventDefault();
      const Ye = (Ie) => {
        const Oe = ((F.value ? Ie.clientX : Ie.clientY) - Ce) / me;
        n.setSizes(t.path, Ss(Ge, G, Oe, Xe));
      }, Qe = () => Q?.(), Ne = (Ie) => {
        Ie.key === "Escape" && (n.setSizes(t.path, Ge), Q?.());
      };
      Q = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", Qe), window.removeEventListener("keydown", Ne), Q = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", Qe), window.addEventListener("keydown", Ne);
    }
    Ue(() => Q?.());
    function Ae(D, G) {
      const te = l.value;
      if (!n.resizable.value || !te) return;
      const ne = F.value ? "ArrowRight" : "ArrowDown", me = F.value ? "ArrowLeft" : "ArrowUp", Ce = D.shiftKey ? 0.1 : 0.02;
      if (D.key !== ne && D.key !== me) return;
      const Ge = D.key === ne ? Ce : -Ce;
      D.preventDefault(), n.setSizes(t.path, Ss(He(te), G, Ge, ve()));
    }
    return (D, G) => {
      const te = Fs("WindowNode", !0);
      return a.value ? (p(), oe(Aa, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: gt(({ node: ne, path: me }) => [
          pe(te, {
            node: ne,
            path: me,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (p(), _("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": m.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !b.value ? (p(), _("header", _u, [
          y("span", gu, z(f.value), 1),
          w.value.length ? (p(), oe(Wn, {
            key: 0,
            items: w.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : I("", !0)
        ])) : I("", !0),
        o.value ? (p(), _("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          N.value ? (p(), _("div", {
            key: 0,
            class: "dc-window__drop",
            style: Pe({
              left: `${N.value.x}px`,
              top: `${N.value.y}px`,
              width: `${N.value.w}px`,
              height: `${N.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : I("", !0),
          (p(!0), _(Y, null, ce(u.value, (ne) => (p(), oe(jc, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: k.value.get(ne.key) ?? null
          }, {
            default: gt(() => [
              pe(te, {
                node: ne.held.node,
                path: ne.path,
                framed: ne.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (p(), _("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          T.value ? (p(), _("div", wu)) : I("", !0),
          (p(!0), _(Y, null, ce(i.value, (ne, me) => (p(), _(Y, {
            key: M(ne)
          }, [
            y("div", {
              class: "dc-window__cell",
              style: Pe({ flexGrow: r.value[me] ?? 1 })
            }, [
              pe(te, {
                node: ne,
                path: V.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < i.value.length - 1 ? (p(), _("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": F.value ? "vertical" : "horizontal",
              "aria-label": J(me),
              "aria-valuenow": re(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Ce) => Me(Ce, me),
              onKeydown: (Ce) => Ae(Ce, me)
            }, null, 40, bu)) : I("", !0)
          ], 64))), 128))
        ], 8, yu)) : I("", !0)
      ], 8, hu));
    };
  }
}), $u = /* @__PURE__ */ de(ku, [["__scopeId", "data-v-fb5b403f"]]), xu = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Mu = {
  key: 1,
  class: "dc-window__empty"
}, Cu = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Wt = 16, Eu = /* @__PURE__ */ ue({
  __name: "WindowFrame",
  props: /* @__PURE__ */ Jt({
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
  emits: /* @__PURE__ */ Jt(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = Zt(e, "layout"), o = Zt(e, "views"), i = An(), r = g(() => new Map(s.panels.map((c) => [c.id, c]))), u = g(() => s.panels.map((c) => c.id)), f = g(() => Pc(l.value, u.value)), w = B(null), b = B(null), m = B(null), $ = B(!0), x = B(null), h = B(null), k = B(null), S = B(""), N = B(null);
    function T() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function F(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function V() {
      return T().map((c) => ({ pane: c, order: F(c.element) })).sort((c, d) => {
        const v = Math.max(c.order.length, d.order.length);
        for (let C = 0; C < v; C += 1) {
          const P = (c.order[C] ?? -1) - (d.order[C] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const M = (c) => T().find((d) => d.panels.includes(c)) ?? null;
    function A(c) {
      const d = r.value.get(c);
      if (!d) return "";
      const v = o.value[c];
      return v && d.views?.some((C) => C.key === v) ? v : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function J(c, d) {
      o.value = { ...o.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const re = g(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ve(c) {
      return !s.movable || re.value < 1 || s.panels.length < 2 ? !1 : r.value.get(c)?.fixed !== !0;
    }
    function Q(c, d) {
      const v = f.value;
      !c || !v || c === v || (l.value = c, d && a("panel-move", d));
    }
    function Me(c, d, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const C = (d - c.left) / c.width, P = (v - c.top) / c.height, R = 0.3;
      return C > R && C < 1 - R && P > R && P < 1 - R ? "center" : [
        { edge: "left", distance: C },
        { edge: "right", distance: 1 - C },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (Z, O) => O.distance < Z.distance ? O : Z
      ).edge;
    }
    function Ae(c, d) {
      const v = [...c.querySelectorAll(".dc-tab")], C = v.findIndex((P) => {
        const R = P.getBoundingClientRect();
        return d < R.left + R.width / 2;
      });
      return C === -1 ? v.length : C;
    }
    function D(c, d, v) {
      for (const { panels: C, element: P } of V().reverse()) {
        const R = P.getBoundingClientRect();
        if (c < R.left || c > R.right || d < R.top || d > R.bottom) continue;
        const ae = C.find((H) => H !== v), Z = P.querySelector(".dc-pane__tabs"), O = Z?.getBoundingClientRect();
        if (Z && O && d >= O.top && d <= O.bottom)
          return ae ? { panel: ae, edge: "center", index: Ae(Z, c) } : null;
        const W = P.querySelector(":scope > .dc-pane__space");
        if (W) {
          const H = W.getBoundingClientRect();
          if (c >= H.left && c <= H.right && d >= H.top && d <= H.bottom) continue;
        }
        return ae ? { panel: ae, edge: Me(R, c, d) } : null;
      }
      return te(c, d, v) ?? Ce(c, d);
    }
    function G() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function te(c, d, v) {
      const C = f.value;
      if (!C) return null;
      for (const P of G()) {
        const R = P.getBoundingClientRect();
        if (c < R.left || c > R.right || d < R.top || d > R.bottom) continue;
        const ae = Ge(P), Z = ae.flatMap((se) => se.panels).find((se) => se !== v);
        if (!Z && ae.length > 0) return null;
        const O = ge(C, v)?.rect, W = vn(
          {
            x: c - R.left - 24,
            y: d - R.top - 12,
            w: O?.w ?? rt.w,
            h: O?.h ?? rt.h
          },
          { w: P.clientWidth, h: P.clientHeight },
          s.minPanelSize
        );
        if (Z) return { panel: Z, edge: "float", rect: W };
        const H = ne(P);
        return H ? { panel: "", space: H, edge: "float", rect: W } : null;
      }
      return null;
    }
    function ne(c) {
      const d = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return d == null ? null : d === "" ? [] : d.split("/").map(Number);
    }
    function me() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((d) => d.closest(".dc-window") === c).filter((d) => !d.querySelector(".dc-pane")).reverse().flatMap((d) => {
        const v = ne(d);
        return v ? [{ element: d, path: v }] : [];
      }) : [];
    }
    function Ce(c, d) {
      for (const { element: v, path: C } of me()) {
        if (v.dataset.dcSpace === "desktop") continue;
        const P = v.getBoundingClientRect();
        if (!(c < P.left || c > P.right || d < P.top || d > P.bottom))
          return { panel: "", space: C, edge: "center" };
      }
      return null;
    }
    function Ge(c) {
      return T().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let Xe = null;
    const Ye = (c) => c.altKey;
    function Qe(c, d) {
      if (!ve(c) || b.value || h.value || d.button !== 0) return;
      const v = d.clientX, C = d.clientY;
      let P = !1, R = Ye(d);
      const ae = () => {
        const le = k.value;
        le && (m.value = R ? te(le.x, le.y, c) : D(le.x, le.y, c));
      }, Z = (le) => {
        if (!P) {
          if (Math.hypot(le.clientX - v, le.clientY - C) < 4) return;
          P = !0, b.value = c, x.value = null;
        }
        R = Ye(le), $.value = !R, k.value = { x: le.clientX, y: le.clientY }, ae();
      }, O = (le) => {
        Ye(le) !== R && (R = !R, $.value = !R, P && ae());
      }, W = (le) => {
        Xe?.();
        const U = m.value, be = f.value;
        if (le && P && U && be) {
          const Ze = U.space ? Cs(be, c, U.space, U.rect) : U.edge === "float" && U.rect ? Ms(be, c, U.panel, U.rect) : Bt(be, c, U.panel, U.edge, U.index);
          Q(Ze, {
            panel: c,
            target: U.panel,
            edge: U.edge,
            ...U.space === void 0 ? {} : { space: U.space },
            ...U.index === void 0 ? {} : { index: U.index },
            ...U.rect === void 0 ? {} : { rect: U.rect }
          });
        }
        b.value = null, m.value = null, k.value = null, $.value = !0;
      }, H = () => W(!0), se = () => W(!1), fe = (le) => {
        if (le.key === "Escape") {
          W(!1);
          return;
        }
        O(le);
      };
      Xe = () => {
        window.removeEventListener("pointermove", Z), window.removeEventListener("pointerup", H), window.removeEventListener("pointercancel", se), window.removeEventListener("keydown", fe), window.removeEventListener("keyup", O), Xe = null;
      }, window.addEventListener("pointermove", Z), window.addEventListener("pointerup", H), window.addEventListener("pointercancel", se), window.addEventListener("keydown", fe), window.addEventListener("keyup", O);
    }
    Ue(() => Xe?.());
    let Ne = null;
    function Ie(c) {
      const d = N.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((P) => P.closest(".dc-window") === d)?.parentElement ?? null : null;
    }
    function Oe(c) {
      const d = f.value;
      return d ? En(d, c) : null;
    }
    function kt(c) {
      const d = f.value;
      if (!d) return;
      const v = St(d, c);
      v !== d && (l.value = v);
    }
    function Vt(c) {
      const d = Oe(c);
      d && kt(d);
    }
    function L(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && Je(v);
    }
    function K(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && at(v);
    }
    function X(c) {
      const d = f.value, v = d ? st(d, c) : null;
      return v ? ke(v.node) : "";
    }
    function xe(c) {
      const d = f.value, v = d ? st(d, c) : null;
      if (!d || !v) return;
      const C = ke(v.node);
      if (r.value.get(C)?.fixed === !0) return;
      const P = !at(v);
      let R = gc(d, c, P);
      R !== d && (P || (R = St(R, c)), l.value = R, a("frame-minimize", { panel: C, minimized: P }));
    }
    function we(c) {
      const d = Oe(c);
      d && xe(d);
    }
    function $t(c) {
      const d = f.value, v = d ? st(d, c) : null;
      if (!d || !v) return;
      const C = ke(v.node);
      if (r.value.get(C)?.fixed === !0) return;
      const P = !Je(v);
      let R = _c(d, c, P);
      R !== d && (P && (R = St(R, c)), l.value = R, a("frame-maximize", { panel: C, maximized: P }));
    }
    function ss(c) {
      const d = Oe(c);
      d && $t(d);
    }
    function as(c, d, v) {
      const C = f.value, P = C ? st(C, c) : null;
      if (!C || !P || d.button !== 0 || b.value || h.value) return;
      const R = ke(P.node);
      if (r.value.get(R)?.fixed === !0 || Je(P) || at(P) || (v === "move" ? !s.movable : !s.resizable)) return;
      const ae = Ie(c), Z = yc(C, c);
      kt(c);
      const O = { w: ae?.clientWidth ?? 0, h: ae?.clientHeight ?? 0 }, W = { ...P.rect }, H = d.clientX, se = d.clientY, fe = s.minPanelSize;
      h.value = R;
      const le = (Ee) => {
        const Ve = f.value;
        if (!Ve) return;
        const xt = xs(Ve, Z, vn(Ee, O, fe));
        xt !== Ve && (l.value = xt);
      }, U = (Ee) => {
        Ee.preventDefault();
        const Ve = Ee.clientX - H, xt = Ee.clientY - se;
        le(
          v === "move" ? { ...W, x: W.x + Ve, y: W.y + xt } : $s(W, v, Ve, xt, fe)
        );
      }, be = (Ee) => {
        if (Ne?.(), h.value = null, !Ee) {
          le(W);
          return;
        }
        const Ve = f.value ? st(f.value, Z) : null;
        Ve && a("frame-change", { panel: X(Z), rect: Ve.rect });
      }, Ze = () => be(!0), tt = () => be(!1), nt = (Ee) => {
        Ee.key === "Escape" && be(!1);
      };
      Ne = () => {
        window.removeEventListener("pointermove", U), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", tt), window.removeEventListener("keydown", nt), Ne = null;
      }, window.addEventListener("pointermove", U), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", tt), window.addEventListener("keydown", nt);
    }
    function za(c, d, v) {
      const C = Oe(c);
      C && as(C, d, v);
    }
    function Ra(c, d, v = !1) {
      const C = f.value, P = Oe(c), R = C && P ? st(C, P) : null;
      if (!C || !P || !R || r.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Je(R) || at(R)) {
        S.value = `${Fe(c)} is ${Je(R) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ae = d === "left" ? -Wt : d === "right" ? Wt : 0, Z = d === "up" ? -Wt : d === "down" ? Wt : 0, O = Ie(P), W = { w: O?.clientWidth ?? 0, h: O?.clientHeight ?? 0 }, H = v ? $s(R.rect, "se", ae, Z, s.minPanelSize) : { ...R.rect, x: R.rect.x + ae, y: R.rect.y + Z }, se = xs(C, P, vn(H, W, s.minPanelSize));
      if (se === C) {
        S.value = v ? `${Fe(c)} cannot be resized further.` : `${Fe(c)} cannot move ${d}.`;
        return;
      }
      l.value = se;
      const fe = st(se, P);
      fe && (a("frame-change", { panel: c, rect: fe.rect }), S.value = v ? `${Fe(c)} resized to ${fe.rect.w} by ${fe.rect.h}.` : `${Fe(c)} moved to ${fe.rect.x}, ${fe.rect.y}.`);
    }
    Ue(() => Ne?.());
    function Ta(c, d) {
      const v = M(c), C = v?.element.getBoundingClientRect();
      if (!v || !C) return null;
      const P = d === "left" || d === "right", R = (O) => {
        if (!(P ? O.bottom > C.top + 1 && O.top < C.bottom - 1 : O.right > C.left + 1 && O.left < C.right - 1)) return null;
        const H = d === "left" ? C.left - O.right : d === "right" ? O.left - C.right : d === "up" ? C.top - O.bottom : O.top - C.bottom;
        return H < -1 ? null : H;
      }, ae = [];
      for (const O of T()) {
        if (O === v || O.element === v.element) continue;
        const W = R(O.element.getBoundingClientRect());
        if (W === null) continue;
        const H = O.panels.find((se) => se !== c);
        H && ae.push({ to: { panel: H }, distance: W });
      }
      for (const { element: O, path: W } of me()) {
        const H = R(O.getBoundingClientRect());
        H !== null && ae.push({ to: { space: W }, distance: H });
      }
      return ae.reduce(
        (O, W) => O && O.distance <= W.distance ? O : W,
        null
      )?.to ?? null;
    }
    function Fa(c) {
      const d = f.value ? ge(f.value, c) !== null : !1;
      if (!d && !ve(c)) return;
      x.value = x.value === c ? null : c;
      const v = Fe(c);
      if (!x.value) {
        S.value = `${v}: move mode off.`;
        return;
      }
      S.value = d ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Fe = (c) => r.value.get(c)?.title ?? c, La = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Da(c, d, v = !1) {
      if (!ve(c)) return;
      const C = f.value;
      if (!C) return;
      const P = Fe(c), R = pt(C, c);
      if (!v && R && (d === "left" || d === "right") && R.panels.length > 1) {
        const se = R.panels.indexOf(c), fe = d === "left" ? se - 1 : se + 1;
        if (fe >= 0 && fe < R.panels.length) {
          Q(Pt(C, c, fe), { panel: c, target: c, edge: "center", index: fe }), S.value = `${P} moved ${d}, now tab ${fe + 1} of ${R.panels.length}.`, rn(c);
          return;
        }
      }
      const Z = Ta(c, d);
      if (!Z || Z.panel !== void 0 && !ve(Z.panel)) {
        S.value = `${P} cannot move ${d}.`;
        return;
      }
      const O = La[d];
      if (Z.space) {
        const se = Z.space, fe = et(C, se), le = ge(C, c)?.rect, U = { ...rt, ...le ? { w: le.w, h: le.h } : {} };
        Q(Cs(C, c, se, U), { panel: c, target: "", space: se, edge: O }), S.value = `${P} moved ${d}, into ${fe ? yt(fe) : "the space"}.`, rn(c);
        return;
      }
      const W = Z.panel, H = R?.panels.length === 1 && pt(C, W)?.panels.length === 1;
      v ? (Q(Bt(C, c, W, "center"), {
        panel: c,
        target: W,
        edge: "center"
      }), S.value = `${P} joined ${Fe(W)} as a tab.`) : H ? (Q(jt(C, c, W), { panel: c, target: W, edge: O }), S.value = `${P} moved ${d}, trading places with ${Fe(W)}.`) : (Q(Bt(C, c, W, O), { panel: c, target: W, edge: O }), S.value = `${P} moved ${d}, beside ${Fe(W)}.`), rn(c);
    }
    function rn(c) {
      zt(() => {
        M(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Na(c, d) {
      const v = f.value;
      v && (l.value = Gt(v, c, d));
    }
    function on(c) {
      const d = f.value;
      if (!d) return;
      const v = mt(d, c);
      v !== d && (l.value = v, a("tab-select", { panel: c }));
    }
    function ls(c) {
      return r.value.get(c)?.closable ?? s.closable;
    }
    function Ia(c) {
      ls(c) && a("panel-close", c);
    }
    const cn = B(/* @__PURE__ */ new Map());
    let Oa = 0;
    function Va(c, d) {
      const v = Oa += 1;
      return cn.value.set(v, { panel: c, items: d }), () => {
        cn.value.delete(v);
      };
    }
    function Ka(c) {
      const d = [];
      for (const v of cn.value.values())
        v.panel() === c && d.push(...v.items());
      return d;
    }
    function rs(c) {
      const d = c.filter((v) => v.items.length > 0);
      return d.length < 2 ? d.flatMap((v) => v.items) : d.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const os = (c) => c.title || "These tabs";
    function qa(c, d) {
      const v = d.id, C = pt(c, v), P = (C?.panels.length ?? 0) > 1, R = C?.fixedView === !0, ae = (H) => ({
        action: () => {
          H !== c && (l.value = H);
        }
      }), Z = [], O = [], W = d.views ?? [];
      if (W.length > 1 && !R) {
        const H = A(v);
        Z.push({
          id: "view",
          label: "View",
          items: W.map((se) => ({
            id: `view-${se.key}`,
            label: se.label,
            checked: se.key === H,
            action: () => J(v, se.key)
          }))
        });
      }
      return P && !R && O.push(
        { id: "show-row", label: "Row", checked: !1, ...ae(Es(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ae(Es(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ae($c(c, v))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ae(xc(c, v))
        }
      ), P && C && (O.length && O.push({ separator: !0 }), O.push(...is(C, v))), { panel: Z, tabs: O, tabsTitle: C ? os(C) : "" };
    }
    function is(c, d) {
      const v = ut(c), C = (P) => {
        const R = c.panels[(v + P + c.panels.length) % c.panels.length];
        return (R === void 0 ? "" : ke(R)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => on(C(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => on(C(-1)) }
      ];
    }
    function Kt(c) {
      return c.title ? c.title : q(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : yt(c);
    }
    function cs(c) {
      if (!c || j(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Te(c)) return null;
      const d = Pa(c);
      return d && d.fixedView !== !0 ? d : null;
    }
    function Ba(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const v = et(d, c);
      if (!v || q(v)) return [];
      if (v.fixedView) return [];
      const C = j(v) ? "desktop" : v.direction, P = (U, be, Ze) => ({
        id: `show-${U}`,
        label: be,
        checked: C === U,
        action: () => {
          const tt = f.value, nt = Ze();
          !tt || nt === v || (l.value = sn(_e(it(tt, c, nt))));
        }
      }), R = () => {
        const U = Ma(v, Wa(v));
        if (q(U) && U.panels.length === 0) return v;
        const be = q(U) && U.panels.length === 1 ? U.panels[0] : void 0;
        return be !== void 0 && ie(be) ? v : U;
      }, ae = (U) => () => j(v) ? Sa(v, U) : v.direction === U ? v : { ...v, direction: U }, Z = c.slice(0, -1), O = c.length > 0 ? et(d, Z) : null, W = O && q(O) && O.panels.length > 1 ? O : null, H = O && cs(O) === v ? O : null, se = cs(v), fe = v.title || "this space", le = (U, be, Ze, tt, nt) => ({
        id: U,
        label: nt,
        action: () => {
          const Ee = f.value;
          Ee && (l.value = sn(_e(it(Ee, be, Ec(Ze, tt)))));
        }
      });
      return rs([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            P("row", "Row", ae("row")),
            P("column", "Column", ae("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            P("tabs", "Tabs", () => R()),
            P("desktop", "Desktop", () => j(v) ? v : Ea(v))
          ]
        },
        {
          id: "about-around",
          title: se ? `Around ${Kt(se)}` : "",
          items: se ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...se.title ? [] : [le("merge-around-keep-this", c, v, "outer", `Keep ${fe}`)],
            ...v.title ? [] : [le("merge-around-keep-that", c, v, "inner", `Keep ${Kt(se)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: H ? `Inside ${Kt(H)}` : "",
          items: H ? [
            ...v.title ? [] : [le("merge-inside-keep-that", Z, H, "outer", `Keep ${Kt(H)}`)],
            ...H.title ? [] : [le("merge-inside-keep-this", Z, H, "inner", `Keep ${fe}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: W ? os(W) : "",
          items: W ? is(W, ke(v)) : []
        }
      ]);
    }
    function Wa(c) {
      const d = w.value;
      return d && ee(c, d) ? d : void 0;
    }
    function Ha(c) {
      const d = f.value, v = r.value.get(c);
      if (!d || !v) return [];
      const C = s.menu ? qa(d, v) : null, P = Ka(c);
      P.length && C?.panel.length && P.push({ separator: !0 }), C && P.push(...C.panel);
      const R = rs([
        { id: "about-panel", title: v.title, items: P },
        { id: "about-tabs", title: C?.tabsTitle ?? "", items: C?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, R) : R;
    }
    function Ua(c, d) {
      return i[`${c}-${d}`] ?? i[c];
    }
    function us(c, d, v, C) {
      return Ua(c, d.id)?.({ panel: d, view: v, active: C });
    }
    Ac({
      panelFor: (c) => r.value.get(c) ?? null,
      viewFor: A,
      setView: J,
      movable: g(() => s.movable),
      resizable: g(() => s.resizable),
      minPanelSize: g(() => s.minPanelSize),
      spaceNames: g(() => s.spaceNames),
      focused: w,
      dragging: b,
      dropTarget: m,
      moving: x,
      framing: h,
      canMove: ve,
      focus(c) {
        w.value !== c && (w.value = c, a("panel-activate", c));
      },
      selectPanel: on,
      beginDrag: Qe,
      toggleMoveMode: Fa,
      nudge: Da,
      setSizes: Na,
      frameOf: (c) => f.value ? ge(f.value, c) : null,
      beginFrameDrag: za,
      nudgeFrame: Ra,
      raise: Vt,
      maximized: L,
      toggleMaximize: ss,
      minimized: K,
      toggleMinimize: we,
      beginFrameDragAt: as,
      raiseAt: kt,
      toggleMaximizeAt: $t,
      toggleMinimizeAt: xe,
      menuFor: Ha,
      spaceMenu: Ba,
      registerMenu: Va,
      closable: ls,
      close: Ia,
      renderContent: (c, d, v) => us("panel", c, d, v),
      renderActions: (c, d, v) => us("actions", c, d, v),
      layout: f
    });
    const ja = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), Ga = () => {
      const c = b.value, d = k.value;
      return !c || !d ? null : Qa(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${d.x}px`, top: `${d.y}px` },
          "aria-hidden": "true"
        },
        r.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: f,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, d, v, C) {
        const P = f.value;
        P && Q(Bt(P, c, d, v, C), {
          panel: c,
          target: d,
          edge: v,
          ...C === void 0 ? {} : { index: C }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const d = f.value;
        d && (l.value = mt(d, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, d, v) {
        const C = f.value;
        C && Q(Ms(C, c, d, v), {
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
        const C = vc(v, c, d);
        if (C === v) return;
        l.value = C;
        const P = ge(C, c);
        P && a("frame-change", { panel: c, rect: P.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: J,
      /** Brings a floating frame to the front of its stack. */
      raise: Vt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ss,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: we
    }), (c, d) => (p(), _("div", {
      ref_key: "root",
      ref: N,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": b.value ? "true" : "false",
      "data-dc-docking": $.value ? "true" : "false",
      style: Pe(ja.value)
    }, [
      f.value ? (p(), oe($u, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (p(), _("p", Mu, " This window has no panels. ")),
      pe(Ga),
      y("p", Cu, z(S.value), 1)
    ], 12, xu));
  }
}), Su = /* @__PURE__ */ de(Eu, [["__scopeId", "data-v-711565af"]]);
function Gu(e = "", t = "/") {
  const n = B(We(e)), s = B(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(l) {
      n.value = We(l), a.push(`${s.value}${n.value}`);
    },
    replace(l) {
      n.value = We(l), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function As(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function Xu(e) {
  const t = B(As(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), s = $e(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = As(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${We(a)}`),
    replace: (a) => e.replace(`${n.value}${We(a)}`),
    dispose: s
  };
}
const Pu = {
  DataShell: Gi,
  ShellHeader: na,
  QueryPanel: aa,
  ResultsArea: fa,
  FacetControl: sa,
  SegmentedControl: kn,
  StatusPill: Tt,
  ScoreMeter: Bn,
  WindowFrame: Su,
  WindowPane: Aa,
  ListView: $n,
  CardsView: ra,
  GridView: oa,
  TableView: ua,
  LinksView: ia,
  PreviewView: ca,
  TypeCardsView: da
}, Yu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Pu))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Is, t.route);
  }
};
export {
  nn as CASCADE_STEP,
  Fu as COLUMN_BREAKPOINTS,
  Tu as COLUMN_ROLES,
  ra as CardsView,
  bs as ColumnCell,
  rt as DEFAULT_FRAME,
  yn as DEFAULT_SORT,
  nl as DEFAULT_VIEW,
  Gi as DataShell,
  Ju as EMPTY_CELL,
  Zs as ENTITY_ALL,
  bn as ENTITY_TERM,
  tn as EXPRESSION_TERM,
  Kn as FACET_PREFIX,
  sa as FacetControl,
  ed as GENERIC_NAMES,
  oa as GridView,
  Yu as HeaderContentLayoutPlugin,
  ia as LinksView,
  $n as ListView,
  dt as MINIMIZED_GAP,
  ma as MINIMIZED_HEIGHT,
  xn as MINIMIZED_WIDTH,
  va as MIN_FRAME,
  _s as MOCK_TINTS,
  Du as MenuBar,
  Wn as MenuButton,
  pa as MenuList,
  Ft as MetricDrill,
  ns as PANE_CONTEXT_KEY,
  In as PARAM_DIR,
  Ln as PARAM_ENTITY,
  On as PARAM_EXPR,
  Vn as PARAM_PAGE,
  Nn as PARAM_SORT,
  Dn as PARAM_VIEW,
  qn as PinStar,
  ca as PreviewView,
  aa as QueryPanel,
  qt as RECORD_STATUSES,
  js as RESULT_FIELDS,
  Is as ROUTE_ADAPTER_KEY,
  fa as ResultsArea,
  Qs as SHELL_CONTEXT_KEY,
  Ru as SHELL_THEMES,
  Lt as ScopeMark,
  Bn as ScoreMeter,
  kn as SegmentedControl,
  na as ShellHeader,
  Tt as StatusPill,
  ua as TableView,
  da as TypeCardsView,
  Os as VIEW_KINDS,
  es as WINDOW_CONTEXT_KEY,
  Su as WindowFrame,
  Aa as WindowPane,
  _a as activePanel,
  ut as activeTab,
  El as addTerm,
  fc as axisOf,
  jn as cascade,
  Ns as cellFull,
  zn as cellText,
  un as cellTextOf,
  Le as cellValue,
  ms as changesResults,
  vn as clampRect,
  Ma as collapseSpace,
  $c as collapseToTabs,
  Iu as column,
  fs as columnAlign,
  ps as columnClass,
  vs as columnKey,
  gn as columnTruncates,
  el as columnsFor,
  al as countPages,
  tl as createHistoryAdapter,
  Gu as createMemoryAdapter,
  $l as createMockDataSource,
  Xu as createVueRouterAdapter,
  td as defaultCellText,
  nd as defaultColumns,
  Ps as defaultLayout,
  Fn as defaultQuery,
  Sl as drillExpression,
  Cs as dropIntoSpace,
  en as emptyFacetState,
  Rn as emptyFacetValue,
  ft as findEntity,
  lt as findSort,
  Vu as fixedView,
  Un as float,
  Ms as floatPanel,
  Ea as floatSplit,
  xc as floatTabs,
  Ht as fnv1a,
  Ks as focusEntity,
  sd as formatDate,
  fl as formatExpression,
  ad as formatMetric,
  Za as formatOrdinal,
  Ds as formatPercent,
  Xs as formatTerm,
  an as frame,
  st as frameAt,
  ge as frameOf,
  En as framePathOf,
  ke as frontPanel,
  wl as generateRows,
  Nu as group,
  pt as groupOf,
  pc as groups,
  Hs as hasActiveFacets,
  ee as hasPanel,
  Ou as headless,
  Ct as insertPanel,
  Et as isChoosable,
  Lu as isEntityScoped,
  Ws as isFacetActive,
  j as isFloat,
  q as isGroup,
  Je as isMaximized,
  at as isMinimized,
  ie as isPanelTab,
  Tn as isPristineQuery,
  bt as isSplit,
  Se as isTabOf,
  Us as isTypeCardsQuery,
  Vs as isViewKind,
  dl as matchesExpression,
  bl as matchesFacets,
  mc as maximizeFrame,
  _c as maximizeFrameAt,
  Ec as mergeSpace,
  hc as minimizeFrame,
  gc as minimizeFrameAt,
  Bt as movePanel,
  Pt as moveTab,
  et as nodeAt,
  At as nodeTitle,
  _e as normalizeLayout,
  We as normalizeSearch,
  Zn as normalizeSizes,
  Pa as onlySpace,
  je as panelIds,
  De as panelNode,
  ks as panelTabs,
  Rt as parseExpression,
  Ll as parseQuery,
  jr as presentParts,
  la as presentRow,
  Gc as providePaneContext,
  Pl as provideShellContext,
  Ac as provideWindowContext,
  mn as raiseFrame,
  St as raiseFrameAt,
  yc as raisedPath,
  Gs as reconcileFacets,
  Pc as reconcileLayout,
  ot as removePanel,
  it as replaceAt,
  $s as resizeRect,
  Ss as resizeSplit,
  ze as roleColumn,
  Ls as roleColumns,
  sn as rootSpace,
  Xn as row,
  Ja as rowKey,
  xl as scopeTerm,
  Ml as scopeTermFor,
  ws as serializeQuery,
  mt as setActivePanel,
  vc as setFrameRect,
  xs as setFrameRectAt,
  Gt as setSizesAt,
  Bu as setSplitDirection,
  He as sizesOf,
  Bs as sortsFor,
  he as spaceChrome,
  yt as spaceTitle,
  Gn as split,
  Es as spreadTabs,
  Nl as summarizeQuery,
  ta as summaryTerms,
  jt as swapPanels,
  Hn as tabNode,
  Nt as tabPanels,
  Sa as tileFloat,
  Wu as toFloat,
  Hu as toTiled,
  Ku as toggleMaximized,
  qu as toggleMinimized,
  ai as useColumns,
  _i as useEntityPreviews,
  Uu as usePaneContext,
  ju as usePaneMenu,
  wt as usePresentedRows,
  Il as useQueryState,
  Ol as useResults,
  ye as useShellContext,
  ts as useWindowContext,
  pl as withoutTerm
};
