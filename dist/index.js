import { ref as W, inject as _t, provide as Sn, computed as _, toValue as Mt, shallowRef as Gt, watch as xe, onScopeDispose as As, defineComponent as ue, openBlock as p, createElementBlock as h, createElementVNode as y, toDisplayString as A, createCommentVNode as N, unref as E, Fragment as Y, renderList as ce, renderSlot as Be, withDirectives as mn, withKeys as Xt, withModifiers as qe, vModelText as hn, normalizeClass as Yt, useSlots as Pn, nextTick as zt, createBlock as oe, createVNode as pe, createTextVNode as Re, withCtx as gt, normalizeStyle as Pe, resolveDynamicComponent as zs, useModel as Qt, onBeforeUnmount as et, useId as Rs, createSlots as ds, mergeModels as Zt, onMounted as Ga, resolveComponent as Ts, getCurrentScope as Xa, h as Ya } from "vue";
import { r as ze, c as Le, a as Fs, f as Wt, b as cn, e as Ls, g as An, h as Qa, i as Za, j as Ja, k as _n, l as Ds, m as fs, n as ps, o as vs } from "./columns.js";
import { E as Qu, G as Zu, p as Ju, d as ed, q as td, s as nd } from "./columns.js";
const Ns = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function el() {
  const e = typeof window < "u", t = W(e ? We(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), s = () => {
    t.value = We(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (l, i) => {
    const o = We(l);
    if (!e) {
      t.value = o;
      return;
    }
    const r = `${window.location.pathname}${o}${window.location.hash}`;
    i === "push" ? window.history.pushState(window.history.state, "", r) : window.history.replaceState(window.history.state, "", r), t.value = o, n.value = window.location.pathname;
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
const Is = ["list", "cards", "grid", "table", "links", "preview"], Au = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Kt = ["ok", "running", "queued", "review", "failed"], zu = [
  "identity",
  "reference",
  "metric",
  "state",
  "score",
  "updated",
  "tint"
], Ru = [480, 620, 760, 900, 1100], tl = "cards", gn = "updated";
function Os(e) {
  return typeof e == "string" && Is.includes(e);
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Vs(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Ks(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function qs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Ks(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const nl = { key: gn, label: gn };
function lt(e, t, n = null) {
  const s = qs(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === gn) ?? s[0] ?? nl;
}
function zn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Jt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = zn(n);
  return t;
}
function Bs(e) {
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
function Ws(e) {
  return Object.values(e).some(Bs);
}
function Rn(e) {
  return e.entity === null && e.expr.trim() === "" && !Ws(e.facets);
}
function Tu(e) {
  return e.entity !== null;
}
function Hs(e) {
  return e.entity === null && e.view === "cards";
}
function sl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Tn(e, t = {}) {
  const s = t.landing === "entity" ? Vs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Os(t.view) ? t.view : tl,
    sort: lt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Jt(s),
    page: 1
  };
}
const Us = ["entity", "sort", "dir", "expr", "facets"];
function ms(e) {
  return Us.some((t) => t in e);
}
function js(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : zn(s);
  }
  return n;
}
const al = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function ll(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const i = e[l];
    if (s) {
      i === s ? s = null : n += i;
      continue;
    }
    if (i === '"' || i === "'") {
      s = i;
      continue;
    }
    if (/\s/.test(i)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += i;
  }
  return a(), t;
}
function Fn(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of ll(t)) {
    const l = a.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const i = al.exec(a);
    i && i[3] !== "" ? s.push({
      kind: "field",
      field: i[1].toLowerCase(),
      comparator: i[2],
      value: i[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const un = (e) => e.toLowerCase().replace(/\s+/g, ""), rl = [
  ["status", "state"],
  ["state", "state"],
  ["score", "score"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function ol(e, t, n) {
  const s = un(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && un(u.label) === s
  );
  if (l) return Le(l, t);
  const i = n.facets.find((u) => un(u.label) === s);
  if (i && i.key in t.fields) return t.fields[i.key];
  const o = rl.find(([u]) => u === s)?.[1];
  if (o) {
    const u = ze(a, o);
    if (u) return Le(u, t);
  }
  const r = /^metric(\d+)$/.exec(s);
  if (r) {
    const u = Fs(a, "metric")[Number(r[1]) - 1];
    if (u) return Le(u, t);
  }
}
function dn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function il(e, t, n) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const r = ze(i, o), u = r ? Le(r, t) : void 0;
      return typeof u == "string" && dn(u, e.value);
    });
  }
  const s = ol(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((o) => dn(String(o), e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const i = e.value.toLowerCase();
      return i === "true" || i === "yes" ? s : i === "false" || i === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const i = Number(e.value);
      return Number.isFinite(i) ? s === i : !0;
    }
    return dn(String(s), e.value);
  }
  const a = Number(e.value), l = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(l) ? !0 : cl(e.comparator, l, a);
}
function cl(e, t, n) {
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
function ul(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => il(a, t, n))) : !0;
}
function hs(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Gs(e) {
  return e.kind === "text" ? hs(e.value) : `${e.field}${e.comparator}${hs(e.value)}`;
}
function dl(e) {
  return e.filter((t) => t.length).map((t) => t.map(Gs).join(" ")).join(" OR ");
}
function fl(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, i) => i !== n) : s).filter((s) => s.length);
}
const _s = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Xs(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const pl = 7, vl = 3;
function ml(e, t, n, s) {
  const a = (t * pl + Wt(n)) % s, l = [];
  for (let i = 0; i < Math.min(vl, s); i++)
    l.push(Xs(e, (a + i) % s));
  return l;
}
function hl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? _l(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function _l(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) a.add((s + l) % e.length);
  return [...a].sort((l, i) => l - i).map((l) => e[l]);
}
function gl(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: l } = t, i = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${i}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return Kt[n % Kt.length];
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
      return Kt[n % Kt.length];
    case "score":
      return Number((0.35 + n % 64 / 100).toFixed(3));
    case "date":
      return l;
    default:
      return;
  }
}
function yl(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, i = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let r = 0; r < n; r++) {
    const u = l[r % l.length], f = Math.floor(r / l.length), b = Wt(`${s}:${e.key}:${u[0]}:${r}`), g = Xs(e.key, r), v = new Date(a.getTime() - b % 900 * 36e5).toISOString(), w = {};
    for (const $ of e.columns ?? []) {
      const k = $.field ?? $.key;
      if (!k || $.value) continue;
      const M = gl($, {
        hash: Wt(`${b}:${k}`),
        sample: u,
        revision: f,
        updatedAt: v
      });
      M !== void 0 && (w[k] = M);
    }
    for (const $ of e.facets)
      w[$.key] = hl($, Wt(`${b}:${$.key}`));
    for (const [$, k] of i)
      w[$] = k === e.key ? g : ml(k, r, $, n);
    o.push({ id: g, entityKey: e.key, entityLabel: e.label, fields: w });
  }
  return o;
}
function wl(e, t) {
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
function bl(e, t) {
  const n = e.find((i) => i.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || s === "score" || n.role === "metric" || n.role === "score", l = s === "date" || n.role === "updated";
  return (i, o) => {
    const r = Le(n, i), u = Le(n, o);
    return a ? Number(u ?? 0) - Number(r ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(r ?? "")) : String(u ?? "").localeCompare(String(r ?? ""));
  };
}
function kl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const i = e.scopes ?? a.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), o = yl(s, { ...e, scopes: i });
    return t.set(s.key, o), o;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: i, offset: o }) {
      const r = Fn(s.expr), u = l ? [l] : a.entities, f = [], b = [];
      for (const w of u)
        for (const $ of n(w, a))
          f.push($), (l ? wl($, s.facets) : !0) && ul(r, $, w) && b.push($);
      const g = lt(l, s.sort, a), v = b.sort(bl(Ks(l, a), g.key));
      return s.dir === "asc" && v.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: v.slice(o, o + i),
        total: b.length,
        unfiltered: b.length === f.length
      };
    }
  };
}
function $l(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.id.replace(/"/g, "")}"` : null;
}
function xl(e, t) {
  return $l(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Ml(e, t) {
  if (!t) return e;
  const n = e.trim();
  return n ? n.split(/\s+/).includes(t) ? n : `${n} ${t}` : t;
}
function Cl(e, t, n) {
  return Ml(t.expr, xl(e, n));
}
const Ys = Symbol("dc.shellContext");
function El(e) {
  return Sn(Ys, e), e;
}
function ye() {
  const e = _t(Ys, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Ln = "e", Dn = "v", Nn = "s", In = "d", On = "q", Vn = "p", Kn = "f_", Qs = "*", Sl = [
  Ln,
  Dn,
  Nn,
  In,
  On,
  Vn
], yn = "..", Zs = ",", Pl = [
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
function fn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Pl) t = t.replace(n, s);
  return t;
}
function Ke(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Js(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), l = a === -1 ? s : s.slice(0, a), i = a === -1 ? "" : s.slice(a + 1);
    n.push([Ke(l), i]);
  }
  return n;
}
function Al(e) {
  return Sl.includes(e) || e.startsWith(Kn);
}
function gs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function zl(e, t) {
  const n = Ke(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(Zs).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => s.has(l)) };
    }
    case "range": {
      const s = n.indexOf(yn), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + yn.length)).trim(), i = a === "" ? null : Number(a), o = l === "" ? null : Number(l);
      let r = i !== null && Number.isFinite(i) ? gs(i, e.min, e.max) : null, u = o !== null && Number.isFinite(o) ? gs(o, e.min, e.max) : null;
      return r !== null && u !== null && r > u && ([r, u] = [u, r]), { kind: "range", min: r, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Rl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(Zs) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${yn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Tl(e, t, n = {}) {
  const s = Tn(t, n), a = new Map(Js(e)), l = a.get(Ln), i = l === void 0 ? s.entity : Ke(l), o = i === Qs ? null : ft(t, i), r = a.get(Dn), u = r && Os(Ke(r)) ? Ke(r) : s.view, f = a.get(Nn), b = lt(o, f ? Ke(f) : n.sort, t), g = a.get(In), v = g ? Ke(g) === "asc" ? "asc" : "desc" : s.dir, w = a.get(On), $ = a.get(Vn), k = $ === void 0 ? 1 : Number(Ke($)), M = Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 1, T = {};
  for (const O of o?.facets ?? []) {
    const R = a.get(`${Kn}${O.key}`);
    T[O.key] = R === void 0 ? zn(O) : zl(O, R);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: b.key,
    dir: v,
    expr: w === void 0 ? "" : Ke(w),
    facets: js(o, T),
    page: M
  };
}
function ys(e, t, n = {}, s = "") {
  const a = Tn(t, n), l = ft(t, e.entity), i = Js(s).filter(([b]) => !Al(b)), o = [], r = (b, g) => o.push([b, fn(g)]), u = l?.key ?? null;
  u !== a.entity && r(Ln, u ?? Qs), e.view !== a.view && r(Dn, e.view), e.sort !== a.sort && r(Nn, e.sort), e.dir !== a.dir && r(In, e.dir), e.expr.trim() !== "" && r(On, e.expr);
  for (const b of l?.facets ?? []) {
    const g = e.facets[b.key];
    if (!g) continue;
    const v = Rl(g, b);
    v !== null && o.push([`${Kn}${b.key}`, fn(v)]);
  }
  e.page > 1 && r(Vn, String(e.page));
  const f = [
    ...i.map(([b, g]) => [fn(b), g]),
    ...o
  ];
  return f.length ? `?${f.map(([b, g]) => g === "" ? b : `${b}=${g}`).join("&")}` : "";
}
const wn = "entity", en = "expr";
function Fl(e, t) {
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
function ea(e, t) {
  const n = [];
  t && n.push({
    id: wn,
    label: `entity:${t.key}`,
    facetKey: wn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Bs(a) && n.push(...Fl(s, a));
  }
  return Fn(e.expr).forEach((s, a) => {
    s.forEach((l, i) => {
      n.push({
        id: `${en}:${a}:${i}`,
        label: Gs(l),
        facetKey: en,
        group: a,
        index: i
      });
    });
  }), n;
}
function Ll(e, t, n = null) {
  if (Rn(e)) {
    const l = lt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = ea(e, t).filter((l) => l.facetKey !== en).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function Dl(e) {
  const { adapter: t } = e, n = _(() => Mt(e.schema)), s = _(() => Mt(e.defaults) ?? {}), a = _(() => Tl(t.search.value, n.value, s.value)), l = _(() => ft(n.value, a.value.entity)), i = _(() => l.value ?? Vs(n.value, s.value)), o = _(() => qs(l.value, n.value)), r = _(() => lt(l.value, a.value.sort, n.value)), u = (k, M) => {
    const T = ys(k, n.value, s.value, t.search.value);
    T !== t.search.value && (M === "push" ? t.push(T) : t.replace(T));
  }, f = () => Mt(e.navigationMode) ?? "push", b = () => Mt(e.facetNavigationMode) ?? "replace", g = (k, M) => {
    const T = k.page ?? (ms(k) ? 1 : a.value.page);
    u({ ...a.value, ...k, page: T }, M);
  }, v = (k, M) => {
    const T = a.value.facets[k];
    if (!T) return;
    const O = { ...a.value.facets, [k]: M(T) };
    g({ facets: O }, b());
  }, w = (k) => {
    const M = k === null ? null : ft(n.value, k);
    return (M?.key ?? null) === a.value.entity ? {} : {
      entity: M?.key ?? null,
      sort: lt(M, a.value.sort, n.value).key,
      facets: Jt(M)
    };
  }, $ = (k) => {
    const M = w(k);
    Object.keys(M).length && g(M, f());
  };
  return {
    query: a,
    entity: l,
    focus: i,
    sort: r,
    sorts: o,
    summary: _(() => Ll(a.value, l.value, n.value)),
    terms: _(() => ea(a.value, l.value)),
    isPristine: _(() => Rn(a.value)),
    isEverything: _(() => a.value.entity === null),
    hasFacets: _(() => Ws(a.value.facets)),
    setEntity: $,
    clearEntity: () => $(null),
    setView(k) {
      g({ view: k }, f());
    },
    setSort(k) {
      g({ sort: lt(l.value, k, n.value).key }, f());
    },
    toggleDirection() {
      g({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(k) {
      g({ expr: k }, f());
    },
    narrow(k, M) {
      g({ expr: k, ...w(M) }, f());
    },
    setPage(k, M) {
      g({ page: Math.max(1, Math.floor(k)) }, M ?? f());
    },
    setFacet(k, M) {
      v(k, () => M);
    },
    toggleChip(k, M) {
      v(k, (T) => T.kind !== "chips" ? T : { kind: "chips", selected: T.selected.includes(M) ? T.selected.filter((R) => R !== M) : [...T.selected, M] });
    },
    setRange(k, M, T) {
      v(k, (O) => O.kind === "range" ? { kind: "range", min: M, max: T } : O);
    },
    toggleFlag(k) {
      v(
        k,
        (M) => M.kind === "toggle" ? { kind: "toggle", on: !M.on } : M
      );
    },
    removeTerm(k) {
      if (k.facetKey === wn) {
        $(null);
        return;
      }
      if (k.facetKey === en) {
        const M = fl(Fn(a.value.expr), k.group ?? 0, k.index ?? 0);
        g({ expr: dl(M) }, f());
        return;
      }
      v(k.facetKey, (M) => M.kind === "chips" && k.option ? { kind: "chips", selected: M.selected.filter((T) => T !== k.option) } : M.kind === "range" ? { kind: "range", min: null, max: null } : M.kind === "toggle" ? { kind: "toggle", on: !1 } : M);
    },
    clearFilters() {
      g({ entity: null, expr: "", facets: Jt(null) }, f());
    },
    reset() {
      u(Tn(n.value, s.value), f());
    },
    hrefFor(k) {
      const M = { ...a.value, ...k };
      return M.page = k.page ?? (ms(k) ? 1 : a.value.page), M.facets = js(ft(n.value, M.entity), M.facets), `${t.path.value}${ys(M, n.value, s.value, t.search.value)}`;
    }
  };
}
function Nl(e) {
  const t = Gt([]), n = W(0), s = W(!1), a = Gt(null);
  let l = 0, i = null;
  const o = _(() => (e.query.value.page - 1) * e.limit.value), r = _(() => sl(n.value, e.limit.value)), u = ($) => {
    t.value = $.rows, n.value = $.total, a.value = null;
  }, f = ($) => {
    a.value = $, t.value = [], n.value = 0;
  }, b = ($, k) => {
    let M = !0;
    const T = () => $ === l, O = () => {
      M && (M = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return T();
      },
      insert(R, F) {
        if (!T()) return;
        const V = Array.isArray(R) ? R : [R];
        if (!V.length) return;
        O();
        const x = [...t.value];
        x.splice(F ?? x.length, 0, ...V), t.value = k > 0 ? x.slice(0, k) : x, n.value += V.length;
      },
      set(R) {
        T() && (R.rows && (O(), t.value = k > 0 ? R.rows.slice(0, k) : R.rows, n.value = R.rows.length), R.total !== void 0 && (n.value = R.total));
      },
      close() {
        T() && (s.value = !1);
      },
      fail(R) {
        T() && (f(R), s.value = !1);
      }
    };
  }, g = () => {
    const $ = i;
    i = null, $?.();
  }, v = () => {
    const $ = ++l;
    g();
    const k = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, M = e.source.value;
    if (M.stream) {
      s.value = !0;
      try {
        i = M.stream(k, b($, k.limit)) ?? null;
      } catch (O) {
        f(O), s.value = !1;
      }
      return;
    }
    let T;
    try {
      T = M.query(k);
    } catch (O) {
      f(O);
      return;
    }
    if (!(T instanceof Promise)) {
      u(T), s.value = !1;
      return;
    }
    s.value = !0, T.then((O) => {
      $ === l && u(O);
    }).catch((O) => {
      $ === l && f(O);
    }).finally(() => {
      $ === l && (s.value = !1);
    });
  }, w = _(
    () => `${JSON.stringify(Us.map(($) => e.query.value[$]))}|${e.query.value.page}`
  );
  return xe([e.source, w, e.schema, e.entity, e.limit], v, {
    immediate: !0
  }), As(() => {
    l++, g();
  }, !0), { rows: t, total: n, offset: o, pageCount: r, pending: s, error: a, refresh: v };
}
const Il = ["data-dc-expanded"], Ol = ["aria-expanded", "aria-controls"], Vl = { class: "dc-header__domain" }, Kl = { class: "dc-header__crumb" }, ql = { class: "dc-header__crumb-root" }, Bl = {
  key: 0,
  class: "dc-header__count dc-mono"
}, Wl = {
  key: 0,
  class: "dc-header__query"
}, Hl = ["data-dc-active", "title"], Ul = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, jl = { class: "dc-header__sr" }, Gl = {
  key: 0,
  class: "dc-header__query dc-header__terms"
}, Xl = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Yl = ["title", "aria-label", "onClick"], Ql = {
  key: 1,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Zl = ["disabled"], Jl = ["title"], er = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, tr = ["disabled"], nr = {
  key: 2,
  class: "dc-header__actions"
}, sr = /* @__PURE__ */ ue({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ye(), l = _(() => a.schema.value), i = _(() => a.entity.value?.label ?? "Everything"), o = _(() => {
      if (n.hideCount) return "";
      const g = a.entity.value;
      return g && !a.hasFacets.value && !a.query.value.expr.trim() ? g.count : String(a.total.value);
    }), r = _(
      () => a.terms.value.map((g, v, w) => {
        const $ = w[v - 1];
        return {
          term: g,
          or: $?.group !== void 0 && g.group !== void 0 && g.group !== $.group
        };
      })
    ), u = _(() => a.query.value.page), f = _(
      () => a.pageCount.value > 1 && !Hs(a.query.value)
    ), b = _(() => {
      const g = `Page ${u.value} of ${a.pageCount.value}`, v = a.rows.value.length;
      if (!v) return g;
      const w = a.offset.value + 1;
      return `${g} — rows ${w} to ${w + v - 1} of ${a.total.value}`;
    });
    return (g, v) => (p(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      y("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: v[0] || (v[0] = (w) => s("toggle"))
      }, [
        v[4] || (v[4] = y("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        y("span", Vl, A(l.value.label), 1),
        y("span", Kl, [
          y("span", ql, A(i.value), 1),
          o.value ? (p(), h("span", Bl, A(o.value), 1)) : N("", !0)
        ]),
        r.value.length ? N("", !0) : (p(), h("span", Wl, [
          v[3] || (v[3] = y("span", { class: "dc-header__query-label" }, "Query", -1)),
          y("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": E(a).isPristine.value ? "false" : "true",
            title: E(a).summary.value
          }, A(E(a).summary.value), 9, Hl)
        ])),
        y("span", Ul, A(e.expanded ? "▲" : "▼"), 1),
        y("span", jl, A(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, Ol),
      r.value.length ? (p(), h("div", Gl, [
        v[5] || (v[5] = y("span", { class: "dc-header__query-label" }, "Query", -1)),
        (p(!0), h(Y, null, ce(r.value, (w) => (p(), h(Y, {
          key: w.term.id
        }, [
          w.or ? (p(), h("span", Xl, "or")) : N("", !0),
          y("button", {
            type: "button",
            class: "dc-term dc-mono",
            title: `Remove ${w.term.label}`,
            "aria-label": `Remove ${w.term.label}`,
            onClick: ($) => E(a).removeTerm(w.term)
          }, A(w.term.label), 9, Yl)
        ], 64))), 128))
      ])) : N("", !0),
      f.value ? (p(), h("nav", Ql, [
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: u.value <= 1,
          onClick: v[1] || (v[1] = (w) => E(a).setPage(u.value - 1))
        }, [...v[6] || (v[6] = [
          y("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Zl),
        y("span", {
          class: "dc-header__page dc-mono",
          title: b.value,
          "aria-hidden": "true"
        }, A(u.value) + " / " + A(E(a).pageCount.value), 9, Jl),
        y("span", er, A(b.value), 1),
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: u.value >= E(a).pageCount.value,
          onClick: v[2] || (v[2] = (w) => E(a).setPage(u.value + 1))
        }, [...v[7] || (v[7] = [
          y("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, tr)
      ])) : N("", !0),
      g.$slots.actions ? (p(), h("div", nr, [
        Be(g.$slots, "actions", {}, void 0, !0)
      ])) : N("", !0)
    ], 8, Il));
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ta = /* @__PURE__ */ de(sr, [["__scopeId", "data-v-11acffe5"]]), ar = { class: "dc-facet" }, lr = { class: "dc-facet__head" }, rr = ["id"], or = { class: "dc-facet__hint dc-mono" }, ir = ["aria-labelledby"], cr = ["aria-pressed", "data-dc-active", "onClick"], ur = ["aria-labelledby"], dr = ["aria-label", "placeholder", "onKeydown"], fr = ["aria-label", "placeholder", "onKeydown"], pr = ["aria-checked"], vr = { class: "dc-switch__text" }, mr = ["data-dc-active"], hr = /* @__PURE__ */ ue({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = _(() => {
      const { facet: g, value: v } = n;
      return g.kind === "chips" && v.kind === "chips" ? v.selected.length ? `${v.selected.length} of ${g.options.length}` : "any" : g.kind === "range" && v.kind === "range" ? v.min === null && v.max === null ? `${g.min}–${g.max}` : `${v.min ?? g.min}–${v.max ?? g.max}` : v.kind === "toggle" ? v.on ? "on" : "off" : "";
    }), l = _(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function i(g) {
      if (n.value.kind !== "chips") return;
      const v = l.value.has(g) ? n.value.selected.filter((w) => w !== g) : [...n.value.selected, g];
      s("update", { kind: "chips", selected: v });
    }
    const o = W(""), r = W("");
    xe(
      () => n.value,
      (g) => {
        g.kind === "range" && (o.value = g.min === null ? "" : g.min, r.value = g.max === null ? "" : g.max);
      },
      { immediate: !0, deep: !0 }
    );
    function u(g) {
      if (typeof g == "number") return Number.isFinite(g) ? g : null;
      const v = g.trim();
      if (!v) return null;
      const w = Number(v);
      return Number.isFinite(w) ? w : null;
    }
    function f() {
      if (n.value.kind !== "range") return;
      const g = u(o.value), v = u(r.value);
      g === n.value.min && v === n.value.max || s("update", { kind: "range", min: g, max: v });
    }
    function b() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (g, v) => (p(), h("div", ar, [
      y("div", lr, [
        y("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, A(e.facet.label), 9, rr),
        y("span", or, A(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (p(), h("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (p(!0), h(Y, null, ce(e.facet.options, (w) => (p(), h("button", {
          key: w,
          type: "button",
          class: "dc-chip",
          "aria-pressed": l.value.has(w),
          "data-dc-active": l.value.has(w) ? "true" : "false",
          onClick: ($) => i(w)
        }, A(w), 9, cr))), 128))
      ], 8, ir)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), h("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        mn(y("input", {
          "onUpdate:modelValue": v[0] || (v[0] = (w) => o.value = w),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: f,
          onBlur: f,
          onKeydown: Xt(qe(f, ["prevent"]), ["enter"])
        }, null, 40, dr), [
          [hn, o.value]
        ]),
        v[2] || (v[2] = y("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        mn(y("input", {
          "onUpdate:modelValue": v[1] || (v[1] = (w) => r.value = w),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: f,
          onBlur: f,
          onKeydown: Xt(qe(f, ["prevent"]), ["enter"])
        }, null, 40, fr), [
          [hn, r.value]
        ])
      ], 8, ur)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), h("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: b
      }, [
        y("span", vr, A(e.facet.text), 1),
        y("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...v[3] || (v[3] = [
          y("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, mr)
      ], 8, pr)) : N("", !0)
    ]));
  }
}), na = /* @__PURE__ */ de(hr, [["__scopeId", "data-v-c2efbd0c"]]), _r = ["aria-label"], gr = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], yr = /* @__PURE__ */ ue({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = W([]);
    function l(i, o) {
      const r = n.options.length;
      let u = null;
      if (i.key === "ArrowRight" || i.key === "ArrowDown" ? u = (o + 1) % r : i.key === "ArrowLeft" || i.key === "ArrowUp" ? u = (o - 1 + r) % r : i.key === "Home" ? u = 0 : i.key === "End" && (u = r - 1), u === null) return;
      i.preventDefault();
      const f = n.options[u];
      f && (s("update:modelValue", f.key), a.value[u]?.focus());
    }
    return (i, o) => (p(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (p(!0), h(Y, null, ce(e.options, (r, u) => (p(), h("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: Yt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (f) => s("update:modelValue", r.key),
        onKeydown: (f) => l(f, u)
      }, A(r.label), 43, gr))), 128))
    ], 8, _r));
  }
}), bn = /* @__PURE__ */ de(yr, [["__scopeId", "data-v-63fb5482"]]), wr = ["id"], br = { class: "dc-panel__section" }, kr = { class: "dc-panel__query" }, $r = { class: "dc-panel__expression" }, xr = ["for"], Mr = ["id", "placeholder", "onKeydown"], Cr = {
  key: 0,
  class: "dc-panel__facets"
}, Er = {
  key: 1,
  class: "dc-panel__hint"
}, Sr = { class: "dc-panel__scope" }, Pr = ["id"], Ar = ["aria-labelledby"], zr = ["data-dc-active", "aria-current"], Rr = { class: "dc-entity__count dc-mono" }, Tr = ["data-dc-active", "aria-current", "onClick"], Fr = { class: "dc-entity__label" }, Lr = { class: "dc-entity__count dc-mono" }, Dr = { class: "dc-panel__actions" }, Nr = ["disabled"], Ir = { class: "dc-panel__section dc-panel__section--row" }, Or = { class: "dc-panel__control" }, Vr = { class: "dc-panel__control" }, Kr = ["title", "aria-label"], qr = {
  key: 0,
  class: "dc-panel__section"
}, Br = /* @__PURE__ */ ue({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = Pn(), l = ye(), i = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, o = _(
      () => (n.views ?? [...Is]).map(($) => ({ key: $, label: i[$] }))
    ), r = _(
      () => l.sorts.value.map(($) => ({ key: $.key, label: $.label }))
    ), u = W(l.query.value.expr), f = W(null);
    xe(
      () => l.query.value.expr,
      ($) => {
        u.value = $;
      }
    );
    const b = _(() => u.value !== l.query.value.expr);
    function g() {
      l.setExpression(u.value), s("close");
    }
    function v() {
      u.value = "", l.clearFilters();
    }
    function w($, k) {
      l.setFacet($, k);
    }
    return zt(() => f.value?.focus()), ($, k) => (p(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: k[5] || (k[5] = Xt(qe((M) => s("close"), ["stop"]), ["esc"]))
    }, [
      y("section", br, [
        y("div", kr, [
          y("div", $r, [
            y("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, xr),
            mn(y("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: f,
              "onUpdate:modelValue": k[0] || (k[0] = (M) => u.value = M),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: E(l).schema.value.placeholder,
              onKeydown: Xt(qe(g, ["prevent"]), ["enter"])
            }, null, 40, Mr), [
              [hn, u.value]
            ])
          ]),
          E(l).entity.value ? (p(), h("div", Cr, [
            (p(!0), h(Y, null, ce(E(l).entity.value.facets, (M) => (p(), oe(na, {
              key: M.key,
              facet: M,
              value: E(l).query.value.facets[M.key],
              onUpdate: (T) => w(M.key, T)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (p(), h("p", Er, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ]),
        y("div", Sr, [
          y("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, Pr),
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
              onClick: k[1] || (k[1] = (M) => E(l).clearEntity())
            }, [
              k[6] || (k[6] = y("span", { class: "dc-entity__label" }, "Everything", -1)),
              y("span", Rr, A(E(l).entities.value.length) + " kinds", 1)
            ], 8, zr),
            (p(!0), h(Y, null, ce(E(l).entities.value, (M) => (p(), h("button", {
              key: M.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": M.key === E(l).entity.value?.key ? "true" : "false",
              "aria-current": M.key === E(l).entity.value?.key ? "true" : void 0,
              onClick: (T) => E(l).setEntity(M.key)
            }, [
              y("span", Fr, A(M.label), 1),
              y("span", Lr, A(M.count), 1)
            ], 8, Tr))), 128))
          ], 8, Ar)
        ]),
        y("div", Dr, [
          y("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: g
          }, " Run query "),
          y("button", {
            type: "button",
            class: "dc-button",
            disabled: E(l).isPristine.value && !b.value,
            onClick: v
          }, " Reset ", 8, Nr)
        ])
      ]),
      y("section", Ir, [
        y("div", Or, [
          k[7] || (k[7] = y("span", { class: "dc-eyebrow" }, "View", -1)),
          pe(bn, {
            label: "Result view",
            "model-value": E(l).query.value.view,
            options: o.value,
            "onUpdate:modelValue": k[2] || (k[2] = (M) => E(l).setView(M))
          }, null, 8, ["model-value", "options"])
        ]),
        y("div", Vr, [
          k[8] || (k[8] = y("span", { class: "dc-eyebrow" }, "Sort", -1)),
          pe(bn, {
            mono: "",
            label: "Sort field",
            "model-value": E(l).query.value.sort,
            options: r.value,
            "onUpdate:modelValue": k[3] || (k[3] = (M) => E(l).setSort(M))
          }, null, 8, ["model-value", "options"]),
          y("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: E(l).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${E(l).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: k[4] || (k[4] = (M) => E(l).toggleDirection())
          }, A(E(l).query.value.dir === "desc" ? "↓" : "↑"), 9, Kr)
        ])
      ]),
      a["panel-section"] ? (p(), h("section", qr, [
        Be($.$slots, "panel-section", {}, void 0, !0)
      ])) : N("", !0)
    ], 40, wr));
  }
}), sa = /* @__PURE__ */ de(Br, [["__scopeId", "data-v-d8a6ac01"]]), Wr = (e) => {
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
};
function Hr(e, t) {
  const n = ze(t, "state"), s = ze(t, "score"), a = ze(t, "tint"), l = s ? Wr(Le(s, e)) : null;
  return {
    identity: cn(ze(t, "identity"), e),
    reference: cn(ze(t, "reference"), e),
    metrics: Fs(t, "metric").map((i) => ({
      column: i,
      label: i.label ?? "",
      text: An(i, e)
    })),
    state: n ? Le(n, e) ?? null : null,
    score: l,
    percent: l === null ? "" : Ls(l),
    updated: cn(ze(t, "updated"), e),
    tint: a ? Le(a, e) ?? null : null
  };
}
function aa(e, t, n, s) {
  const a = n?.columns ?? [];
  return {
    row: e,
    key: Za(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: a,
    ordinal: Qa(t),
    parts: Hr(e, a),
    pinned: s
  };
}
function wt() {
  const e = ye(), t = _(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return _(
    () => e.rows.value.map(
      (n, s) => aa(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n)
      )
    )
  );
}
const Ur = ["data-dc-status"], jr = /* @__PURE__ */ ue({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (p(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, A(e.status), 9, Ur));
  }
}), Rt = /* @__PURE__ */ de(jr, [["__scopeId", "data-v-23e59fbf"]]), Gr = ["title"], Xr = { key: 1 }, Yr = /* @__PURE__ */ ue({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ye(), s = _(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((r) => r.key === t.column.drill) ?? null), a = _(() => t.column.label ?? ""), l = _(() => An(t.column, t.entry.row));
    function i(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (o, r) => s.value ? (p(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: i
    }, [
      Be(o.$slots, "default", {}, () => [
        Re(A(l.value), 1)
      ], !0)
    ], 8, Gr)) : (p(), h("span", Xr, [
      Be(o.$slots, "default", {}, () => [
        Re(A(l.value), 1)
      ], !0)
    ]));
  }
}), Tt = /* @__PURE__ */ de(Yr, [["__scopeId", "data-v-3bd0cbdb"]]), Qr = ["data-dc-active", "aria-pressed", "aria-label"], Zr = /* @__PURE__ */ ue({
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
    return (a, l) => (p(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, A(e.pinned ? "★" : "☆"), 9, Qr));
  }
}), qn = /* @__PURE__ */ de(Zr, [["__scopeId", "data-v-ef63d763"]]), Jr = ["title", "aria-label"], eo = /* @__PURE__ */ ue({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = _(() => t.entry.entity?.scope ?? null);
    function a(l) {
      l.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (l, i) => s.value ? (p(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, Jr)) : N("", !0);
  }
}), Ft = /* @__PURE__ */ de(eo, [["__scopeId", "data-v-1d9b1a9f"]]), to = { class: "dc-cards" }, no = { class: "dc-card__top dc-mono" }, so = {
  key: 0,
  class: "dc-card__entity"
}, ao = { class: "dc-card__top-right" }, lo = ["onClick"], ro = { class: "dc-card__primary" }, oo = { class: "dc-card__secondary dc-mono" }, io = { class: "dc-card__metrics dc-mono" }, co = {
  key: 0,
  class: "dc-card__date"
}, uo = /* @__PURE__ */ ue({
  __name: "CardsView",
  setup(e) {
    const t = ye(), n = wt(), s = _(() => t.isEverything.value);
    return (a, l) => (p(), h("div", to, [
      (p(!0), h(Y, null, ce(E(n), (i) => (p(), h("div", {
        key: i.key,
        class: "dc-card"
      }, [
        y("div", no, [
          y("span", null, [
            Re(A(i.ordinal) + " ", 1),
            s.value ? (p(), h("span", so, A(i.entityLabel), 1)) : N("", !0)
          ]),
          y("span", ao, [
            i.parts.state ? (p(), oe(Rt, {
              key: 0,
              status: i.parts.state
            }, null, 8, ["status"])) : N("", !0),
            pe(Ft, { entry: i }, null, 8, ["entry"]),
            E(t).pinnable.value ? (p(), oe(qn, {
              key: 1,
              row: i.row,
              name: i.parts.identity,
              pinned: i.pinned
            }, null, 8, ["row", "name", "pinned"])) : N("", !0)
          ])
        ]),
        y("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => E(t).activate(i.row)
        }, [
          y("span", ro, A(i.parts.identity), 1),
          y("span", oo, A(i.parts.reference), 1)
        ], 8, lo),
        y("div", io, [
          (p(!0), h(Y, null, ce(i.parts.metrics.slice(0, 2), (o) => (p(), oe(Tt, {
            key: o.column.key ?? o.label,
            entry: i,
            column: o.column
          }, {
            default: gt(() => [
              Re(A(o.label) + " " + A(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          i.parts.updated ? (p(), h("span", co, A(i.parts.updated), 1)) : N("", !0)
        ])
      ]))), 128))
    ]));
  }
}), la = /* @__PURE__ */ de(uo, [["__scopeId", "data-v-b633cc4d"]]), fo = { class: "dc-grid" }, po = ["onClick"], vo = { class: "dc-tile__scrim" }, mo = { class: "dc-tile__top dc-mono" }, ho = { class: "dc-tile__chip" }, _o = {
  key: 0,
  class: "dc-tile__chip"
}, go = { class: "dc-tile__caption" }, yo = { class: "dc-tile__secondary dc-truncate" }, wo = { class: "dc-tile__primary" }, bo = /* @__PURE__ */ ue({
  __name: "GridView",
  setup(e) {
    const t = ye(), n = wt();
    return (s, a) => (p(), h("div", fo, [
      (p(!0), h(Y, null, ce(E(n), (l) => (p(), h("button", {
        key: l.key,
        type: "button",
        class: "dc-tile",
        style: Pe({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
        onClick: (i) => E(t).activate(l.row)
      }, [
        y("span", vo, [
          y("span", mo, [
            y("span", ho, A(l.ordinal), 1),
            l.parts.percent ? (p(), h("span", _o, A(l.parts.percent), 1)) : N("", !0)
          ]),
          y("span", go, [
            y("span", yo, A(l.parts.reference), 1),
            y("span", wo, A(l.parts.identity), 1)
          ])
        ])
      ], 12, po))), 128))
    ]));
  }
}), ra = /* @__PURE__ */ de(bo, [["__scopeId", "data-v-e3934b3e"]]), ko = { class: "dc-links" }, $o = ["onClick"], xo = { class: "dc-link__primary dc-truncate" }, Mo = { class: "dc-link__secondary dc-mono dc-truncate" }, Co = /* @__PURE__ */ ue({
  __name: "LinksView",
  setup(e) {
    const t = ye(), n = wt();
    return (s, a) => (p(), h("div", ko, [
      (p(!0), h(Y, null, ce(E(n), (l) => (p(), h("button", {
        key: l.key,
        type: "button",
        class: "dc-link",
        onClick: (i) => E(t).activate(l.row)
      }, [
        y("span", xo, A(l.parts.identity), 1),
        y("span", Mo, A(l.parts.reference), 1)
      ], 8, $o))), 128))
    ]));
  }
}), oa = /* @__PURE__ */ de(Co, [["__scopeId", "data-v-d94cadb6"]]), Eo = ["aria-valuenow", "aria-label", "title"], So = /* @__PURE__ */ ue({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = _(() => Ls(t.value));
    return (s, a) => (p(), h("span", {
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
    ], 8, Eo));
  }
}), Bn = /* @__PURE__ */ de(So, [["__scopeId", "data-v-ab794776"]]), Po = {
  class: "dc-list",
  role: "list"
}, Ao = ["onClick"], zo = { class: "dc-list__ordinal dc-mono" }, Ro = { class: "dc-list__identity" }, To = { class: "dc-list__primary dc-truncate" }, Fo = { class: "dc-list__secondary dc-mono dc-truncate" }, Lo = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Do = { class: "dc-list__metrics dc-mono" }, No = { class: "dc-list__trailing" }, Io = /* @__PURE__ */ ue({
  __name: "ListView",
  setup(e) {
    const t = ye(), n = wt(), s = _(() => t.isEverything.value), a = (l) => ze(l.columns, "score")?.label ?? "Score";
    return (l, i) => (p(), h("div", Po, [
      (p(!0), h(Y, null, ce(E(n), (o) => (p(), h("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        y("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (r) => E(t).activate(o.row)
        }, [
          y("span", zo, A(o.ordinal), 1),
          y("span", Ro, [
            y("span", To, A(o.parts.identity), 1),
            y("span", Fo, A(o.parts.reference), 1)
          ])
        ], 8, Ao),
        s.value ? (p(), h("span", Lo, A(o.entityLabel), 1)) : N("", !0),
        y("span", Do, [
          (p(!0), h(Y, null, ce(o.parts.metrics.slice(0, 2), (r) => (p(), oe(Tt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128)),
          o.parts.score !== null ? (p(), oe(Bn, {
            key: 0,
            value: o.parts.score,
            label: a(o)
          }, null, 8, ["value", "label"])) : N("", !0)
        ]),
        y("span", No, [
          o.parts.state ? (p(), oe(Rt, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : N("", !0),
          pe(Ft, { entry: o }, null, 8, ["entry"]),
          E(t).pinnable.value ? (p(), oe(qn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : N("", !0)
        ])
      ]))), 128))
    ]));
  }
}), kn = /* @__PURE__ */ de(Io, [["__scopeId", "data-v-0d372bda"]]), Oo = { class: "dc-preview" }, Vo = { class: "dc-preview__pager dc-mono" }, Ko = ["disabled"], qo = { "aria-live": "polite" }, Bo = ["disabled"], Wo = {
  key: 0,
  class: "dc-preview__card"
}, Ho = { class: "dc-preview__body" }, Uo = { class: "dc-preview__top" }, jo = { class: "dc-preview__badges" }, Go = { class: "dc-preview__entity dc-mono" }, Xo = { class: "dc-preview__marks" }, Yo = { class: "dc-preview__primary" }, Qo = { class: "dc-preview__secondary dc-mono" }, Zo = { class: "dc-preview__fields" }, Jo = { class: "dc-preview__key" }, ei = { class: "dc-preview__value dc-mono" }, ti = /* @__PURE__ */ ue({
  __name: "PreviewView",
  setup(e) {
    const t = ye(), n = wt(), s = W(0);
    xe(n, (r) => {
      s.value > r.length - 1 && (s.value = Math.max(0, r.length - 1));
    });
    const a = _(() => n.value[s.value]), l = _(() => {
      const r = a.value;
      if (!r) return [];
      const u = ze(r.columns, "reference"), f = ze(r.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: r.parts.reference, column: null }] : [],
        ...r.parts.metrics.map((b) => ({
          key: b.label,
          value: b.text,
          column: b.column
        })),
        ...f ? [{ key: f.label ?? "Updated", value: r.parts.updated, column: null }] : []
      ];
    }), i = _(() => {
      if (!n.value.length) return "0 / 0";
      const r = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${r}`;
    }), o = (r) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + r)));
    };
    return (r, u) => (p(), h("div", Oo, [
      y("div", Vo, [
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => o(-1))
        }, " ‹ ", 8, Ko),
        y("span", qo, A(i.value), 1),
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (f) => o(1))
        }, " › ", 8, Bo)
      ]),
      a.value ? (p(), h("div", Wo, [
        y("div", {
          class: "dc-preview__media",
          style: Pe({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        y("div", Ho, [
          y("div", Uo, [
            y("span", jo, [
              a.value.parts.state ? (p(), oe(Rt, {
                key: 0,
                status: a.value.parts.state
              }, null, 8, ["status"])) : N("", !0),
              y("span", Go, A(a.value.entityLabel), 1)
            ]),
            y("span", Xo, [
              pe(Ft, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (p(), oe(qn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : N("", !0)
            ])
          ]),
          y("div", null, [
            y("div", Yo, A(a.value.parts.identity), 1),
            y("div", Qo, A(a.value.parts.reference), 1)
          ]),
          y("dl", Zo, [
            (p(!0), h(Y, null, ce(l.value, (f) => (p(), h("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              y("dt", Jo, A(f.key), 1),
              y("dd", ei, [
                f.column && a.value ? (p(), oe(Tt, {
                  key: 0,
                  entry: a.value,
                  column: f.column
                }, null, 8, ["entry", "column"])) : (p(), h(Y, { key: 1 }, [
                  Re(A(f.value), 1)
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
      ])) : N("", !0)
    ]));
  }
}), ia = /* @__PURE__ */ de(ti, [["__scopeId", "data-v-8e2c6c48"]]);
function ni() {
  const e = ye();
  return _(() => Ja(e.schema.value, e.entity.value));
}
const si = ["src", "alt"], ai = ["title"], li = /* @__PURE__ */ ue({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = _(() => t.column.kind ?? "text"), a = _(() => Le(t.column, t.entry.row)), l = _(
      () => s.value === "ordinal" ? t.entry.ordinal : An(t.column, t.entry.row)
    ), i = _(() => a.value), o = _(() => {
      const g = Number(a.value);
      return Number.isFinite(g) ? g : 0;
    }), r = _(() => t.column.activate === !0 || !!t.column.click), u = _(() => _n(t.column)), f = _(() => Ds(t.column, t.entry.row));
    function b(g) {
      r.value && (g.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (g, v) => s.value === "component" && e.column.component ? (p(), oe(zs(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (p(), oe(Rt, {
      key: 1,
      status: i.value
    }, null, 8, ["status"])) : s.value === "score" ? (p(), oe(Bn, {
      key: 2,
      value: o.value,
      label: e.column.label
    }, null, 8, ["value", "label"])) : s.value === "image" ? (p(), h("img", {
      key: 3,
      class: "dc-cell__image",
      src: String(a.value ?? ""),
      alt: e.entry.parts.identity,
      loading: "lazy",
      style: Pe({ maxHeight: e.column.height }),
      onClick: b
    }, null, 12, si)) : e.column.drill ? (p(), oe(Tt, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : r.value ? (p(), h("button", {
      key: 5,
      type: "button",
      class: Yt(["dc-table__open", { "dc-truncate": u.value }]),
      title: f.value,
      onClick: b
    }, A(l.value), 11, ai)) : (p(), h(Y, { key: 6 }, [
      Re(A(l.value), 1)
    ], 64));
  }
}), ws = /* @__PURE__ */ de(li, [["__scopeId", "data-v-6eea4a46"]]), ri = {
  key: 0,
  class: "dc-table__none"
}, oi = { class: "dc-table__detail" }, ii = {
  key: 1,
  class: "dc-table"
}, ci = ["data-dc-align", "data-dc-hide", "aria-sort"], ui = ["onClick"], di = ["onClick"], fi = ["data-dc-align", "data-dc-hide", "title"], pi = {
  key: 0,
  class: "dc-table__name"
}, vi = /* @__PURE__ */ ue({
  __name: "TableView",
  setup(e) {
    const t = ye(), n = wt(), s = ni();
    function a(b) {
      b && (t.query.value.sort === b ? t.toggleDirection() : t.setSort(b));
    }
    const l = _(() => t.entity.value?.label ?? "The result set"), i = _(() => new Set(t.sorts.value.map((b) => b.key))), o = (b) => b.sort !== void 0 && i.value.has(b.sort), r = (b) => {
      if (o(b))
        return t.query.value.sort !== b.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function u(b) {
      return [
        ps(b),
        b.muted ? "dc-table__muted" : "",
        b.mono ? "dc-mono" : "",
        _n(b) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function f(b, g) {
      if (!(!_n(b) || b.activate || b.click))
        return Ds(b, g.row);
    }
    return (b, g) => E(s).length ? (p(), h("table", ii, [
      y("thead", null, [
        y("tr", null, [
          (p(!0), h(Y, null, ce(E(s), (v, w) => (p(), h("th", {
            key: E(vs)(v, w),
            scope: "col",
            class: Yt(E(ps)(v)),
            style: Pe({ width: v.width }),
            "data-dc-align": E(fs)(v),
            "data-dc-hide": v.hideBelow,
            "aria-sort": r(v)
          }, [
            o(v) ? (p(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: ($) => a(v.sort)
            }, A(v.label), 9, ui)) : (p(), h(Y, { key: 1 }, [
              Re(A(v.label), 1)
            ], 64))
          ], 14, ci))), 128))
        ])
      ]),
      y("tbody", null, [
        (p(!0), h(Y, null, ce(E(n), (v) => (p(), h("tr", {
          key: v.key,
          class: "dc-table__row",
          onClick: (w) => E(t).activate(v.row)
        }, [
          (p(!0), h(Y, null, ce(E(s), (w, $) => (p(), h("td", {
            key: E(vs)(w, $),
            class: Yt(u(w)),
            "data-dc-align": E(fs)(w),
            "data-dc-hide": w.hideBelow,
            title: f(w, v)
          }, [
            w.scope ? (p(), h("span", pi, [
              pe(ws, {
                column: w,
                entry: v
              }, null, 8, ["column", "entry"]),
              pe(Ft, { entry: v }, null, 8, ["entry"])
            ])) : (p(), oe(ws, {
              key: 1,
              column: w,
              entry: v
            }, null, 8, ["column", "entry"]))
          ], 10, fi))), 128))
        ], 8, di))), 128))
      ])
    ])) : (p(), h("p", ri, [
      g[4] || (g[4] = y("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      y("span", oi, [
        Re(A(l.value) + " has no ", 1),
        g[0] || (g[0] = y("code", null, "columns", -1)),
        g[1] || (g[1] = Re(" in the schema, so there is no table to draw. ", -1)),
        g[2] || (g[2] = y("code", null, "defaultColumns()", -1)),
        g[3] || (g[3] = Re(" is the familiar eight. ", -1))
      ])
    ]));
  }
}), ca = /* @__PURE__ */ de(vi, [["__scopeId", "data-v-eb4b7a13"]]);
function mi(e) {
  const t = Gt([]), n = W(!1), s = Gt(null);
  let a = 0;
  const l = (r, u, f) => ({
    entity: r,
    rows: u.rows.map(
      (b, g) => aa(b, g, r, e.isPinned(b.id))
    ),
    total: u.total,
    count: f ? r.count : String(u.total)
  }), i = () => {
    const r = ++a, u = e.query.value, f = e.schema.value, b = e.entities.value, g = e.limit.value, v = Rn(u), w = b.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: $.key, facets: Jt($), page: 1 },
        schema: f,
        entity: $,
        limit: g,
        offset: 0
      })
    }));
    if (w.every(({ outcome: $ }) => !($ instanceof Promise))) {
      t.value = w.map(
        ({ entity: $, outcome: k }) => l($, k, v)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(w.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      r === a && (t.value = $.map(
        (k, M) => l(w[M].entity, k, v)
      ), s.value = null);
    }).catch(($) => {
      r === a && (s.value = $, t.value = []);
    }).finally(() => {
      r === a && (n.value = !1);
    });
  }, o = () => {
    try {
      i();
    } catch (r) {
      s.value = r, t.value = [], n.value = !1;
    }
  };
  return xe(
    [e.source, e.schema, e.query, e.entities, e.limit],
    o,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: o };
}
const hi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, _i = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, gi = ["data-dc-pending"], yi = ["data-dc-empty"], wi = ["onClick"], bi = { class: "dc-type__name" }, ki = { class: "dc-type__count dc-mono" }, $i = { class: "dc-type__sr" }, xi = {
  key: 0,
  class: "dc-type__empty"
}, Mi = ["onClick"], Ci = { class: "dc-type__identity" }, Ei = { class: "dc-type__primary dc-truncate" }, Si = { class: "dc-type__secondary dc-mono dc-truncate" }, Pi = { class: "dc-type__trailing dc-mono" }, Ai = { class: "dc-type__metric-value" }, zi = { class: "dc-type__metric-label" }, Ri = {
  key: 0,
  class: "dc-type__date"
}, Ti = ["onClick"], Fi = /* @__PURE__ */ ue({
  __name: "TypeCardsView",
  setup(e) {
    const t = ye(), { previews: n, pending: s, error: a } = mi({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (i) => t.isPinnedId(i)
    }), l = _(() => !t.isPristine.value);
    return (i, o) => E(a) ? (p(), h("p", hi, " Could not load results: " + A(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !E(n).length && E(s) ? (p(), h("p", _i, " Running query… ")) : (p(), h("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      (p(!0), h(Y, null, ce(E(n), (r) => (p(), h("section", {
        key: r.entity.key,
        class: "dc-type",
        "data-dc-empty": r.rows.length ? "false" : "true"
      }, [
        y("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => E(t).setEntity(r.entity.key)
        }, [
          y("span", bi, A(r.entity.label), 1),
          y("span", ki, A(r.count), 1),
          o[0] || (o[0] = y("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          y("span", $i, "Show only " + A(r.entity.label.toLowerCase()), 1)
        ], 8, wi),
        r.rows.length ? N("", !0) : (p(), h("p", xi, A(l.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), h(Y, null, ce(r.rows, (u) => (p(), h("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          y("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (f) => E(t).activate(u.row)
          }, [
            y("span", Ci, [
              y("span", Ei, A(u.parts.identity), 1),
              y("span", Si, A(u.parts.reference), 1)
            ])
          ], 8, Mi),
          y("span", Pi, [
            (p(!0), h(Y, null, ce(u.parts.metrics.slice(0, 1), (f) => (p(), oe(Tt, {
              key: f.column.key ?? f.label,
              class: "dc-type__metric",
              entry: u,
              column: f.column
            }, {
              default: gt(() => [
                y("span", Ai, A(f.text), 1),
                y("span", zi, A(f.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), h("span", Ri, A(u.parts.updated), 1)) : N("", !0),
            pe(Ft, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        r.entity.create ? (p(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => E(t).create(r.entity)
        }, [
          o[1] || (o[1] = y("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Re(" " + A(r.entity.create), 1)
        ], 8, Ti)) : N("", !0)
      ], 8, yi))), 128))
    ], 8, gi));
  }
}), ua = /* @__PURE__ */ de(Fi, [["__scopeId", "data-v-b776cfb6"]]), Li = ["data-dc-pending"], Di = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, Ni = { class: "dc-results__detail" }, Ii = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Oi = {
  key: 3,
  class: "dc-results__state"
}, Vi = { class: "dc-results__detail" }, Ki = /* @__PURE__ */ ue({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), s = {
      list: kn,
      cards: la,
      grid: ra,
      table: ca,
      links: oa,
      preview: ia
    }, a = _(() => Hs(n.query.value)), l = _(() => {
      const u = n.query.value.view, f = t.views ?? [], [b] = f;
      return b === void 0 || f.includes(u) ? u : b;
    }), i = _(() => s[l.value] ?? kn), o = _(() => n.rows.value.length > 0), r = _(() => n.error.value !== null);
    return (u, f) => (p(), h("div", {
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      r.value ? (p(), h("p", Di, [
        f[1] || (f[1] = y("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        y("span", Ni, A(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), oe(ua, { key: 1 })) : !o.value && E(n).pending.value ? (p(), h("p", Ii, [...f[2] || (f[2] = [
        y("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (p(), oe(zs(i.value), { key: 4 })) : (p(), h("div", Oi, [
        f[3] || (f[3] = y("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        y("span", Vi, A(E(n).summary.value), 1),
        E(n).isPristine.value ? N("", !0) : (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: f[0] || (f[0] = (b) => E(n).clearFilters())
        }, A(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Li));
  }
}), da = /* @__PURE__ */ de(Ki, [["__scopeId", "data-v-c00573c8"]]), qi = ["data-dc-theme"], Bi = ["data-dc-width", "data-dc-align"], Wi = { class: "dc-shell__panel" }, Hi = /* @__PURE__ */ ue({
  __name: "DataShell",
  props: /* @__PURE__ */ Zt({
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
  emits: /* @__PURE__ */ Zt(["activate", "create", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = Qt(e, "open"), i = Qt(e, "pinned"), o = Pn(), r = _t(Ns, null), u = s.route || r ? null : el(), f = s.route ?? r ?? u;
    et(() => u?.dispose?.());
    const b = _(() => kl({ seed: s.schema.key })), g = _(() => s.source ?? b.value), v = Dl({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), w = Nl({
      source: g,
      query: v.query,
      schema: _(() => s.schema),
      entity: v.entity,
      limit: _(() => s.limit)
    });
    xe(v.query, (x) => a("query-change", x)), xe(
      [w.pageCount, w.pending, v.query],
      () => {
        if (w.pending.value) return;
        const x = w.pageCount.value;
        v.query.value.page > x && v.setPage(x, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Rs() ?? "dc-query-panel", k = W(null);
    function M() {
      l.value && (l.value = !1, zt(() => {
        k.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const T = _(() => new Set(i.value));
    function O(x) {
      const P = new Set(T.value);
      P.has(x.id) ? P.delete(x.id) : P.add(x.id), i.value = [...P], a("toggle-pin", x);
    }
    function R(x, P) {
      v.narrow(Cl(s.schema, v.query.value, x), P?.key ?? null), a("drill", x, P);
    }
    const F = El({
      ...v,
      schema: _(() => s.schema),
      entities: _(() => s.schema.entities),
      rows: w.rows,
      total: w.total,
      limit: _(() => s.limit),
      offset: w.offset,
      pageCount: w.pageCount,
      pending: w.pending,
      error: w.error,
      source: g,
      previewsPerType: _(() => s.previewsPerType),
      pinnable: _(() => s.pinnable === !0),
      isPinned: (x) => T.value.has(x.id),
      isPinnedId: (x) => T.value.has(x),
      togglePin: O,
      activate: (x) => a("activate", x),
      create: (x) => a("create", x),
      drill: R
    }), V = _(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: v.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: M
    }), (x, P) => (p(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Pe(V.value)
    }, [
      y("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(ta, {
          ref_key: "headerRef",
          ref: k,
          expanded: l.value,
          "panel-id": E($),
          onToggle: P[0] || (P[0] = (J) => l.value = !l.value)
        }, ds({ _: 2 }, [
          o.actions ? {
            name: "actions",
            fn: gt(() => [
              Be(x.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        l.value ? (p(), h(Y, { key: 0 }, [
          y("div", {
            class: "dc-shell__scrim",
            onClick: M
          }),
          y("div", Wi, [
            pe(sa, {
              "panel-id": E($),
              views: e.views,
              onClose: M
            }, ds({ _: 2 }, [
              o["panel-section"] ? {
                name: "panel-section",
                fn: gt(() => [
                  Be(x.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : N("", !0)
      ], 8, Bi),
      Be(x.$slots, "results", {
        rows: E(F).rows.value,
        total: E(F).total.value,
        offset: E(F).offset.value,
        pageCount: E(F).pageCount.value,
        query: E(F).query.value,
        pending: E(F).pending.value
      }, () => [
        pe(da, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, qi));
  }
}), Ui = /* @__PURE__ */ de(Hi, [["__scopeId", "data-v-737c7342"]]), Et = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, ji = ["aria-label"], Gi = ["role", "aria-label"], Xi = ["data-dc-item"], Yi = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Qi = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Zi = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Ji = { class: "dc-menu__label dc-truncate" }, ec = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, tc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, nc = /* @__PURE__ */ ue({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = W(null), i = W([]), o = W(null), r = W(null), u = W(null), f = W(!1), b = _(
      () => s.items.flatMap((x, P) => Et(x) ? [P] : [])
    ), g = _(() => {
      const x = [{ entries: [] }];
      return s.items.forEach((P, J) => {
        P.heading ? x.push({ heading: P, entries: [] }) : x[x.length - 1]?.entries.push({ item: P, index: J });
      }), x.filter((P) => P.entries.length > 0);
    }), v = W({ x: s.at.x, y: s.at.y });
    async function w() {
      v.value = { x: s.at.x, y: s.at.y }, await zt();
      const x = l.value?.getBoundingClientRect();
      if (!x) return;
      const P = 8;
      let J = s.at.x, re = s.at.y;
      if (J + x.width > window.innerWidth - P) {
        const ve = s.at.mirrorX === void 0 ? null : s.at.mirrorX - x.width;
        J = ve !== null && ve >= P ? ve : window.innerWidth - x.width - P;
      }
      re + x.height > window.innerHeight - P && (re = window.innerHeight - x.height - P), v.value = { x: Math.max(P, J), y: Math.max(P, re) };
    }
    const $ = _(() => ({ left: `${v.value.x}px`, top: `${v.value.y}px` }));
    function k(x) {
      o.value = x, x !== null && zt(() => i.value[x]?.focus());
    }
    function M(x, P) {
      const J = b.value;
      if (J.length === 0) return null;
      if (x === null) return P === 1 ? J[0] ?? null : J[J.length - 1] ?? null;
      const re = J.indexOf(x);
      return re === -1 ? J[0] ?? null : J[(re + P + J.length) % J.length] ?? null;
    }
    function T(x, P) {
      if (!s.items[x]?.items?.length) return;
      const re = i.value[x]?.getBoundingClientRect(), ve = l.value?.getBoundingClientRect();
      !re || !ve || (u.value = { x: ve.right - 4, y: re.top - 4, mirrorX: ve.left + 4 }, r.value = x, f.value = P);
    }
    function O(x) {
      const P = r.value;
      r.value = null, u.value = null, x && P !== null && k(P);
    }
    function R(x) {
      const P = s.items[x];
      if (!(!P || !Et(P))) {
        if (P.items?.length) {
          T(x, !0);
          return;
        }
        a("choose", P);
      }
    }
    function F(x) {
      const P = x.key;
      if (P === "Escape") {
        x.preventDefault(), x.stopPropagation(), r.value !== null ? O(!0) : a("dismiss");
        return;
      }
      if (P === "ArrowDown" || P === "ArrowUp") {
        x.preventDefault(), x.stopPropagation(), O(!1), k(M(o.value, P === "ArrowDown" ? 1 : -1));
        return;
      }
      if (P === "Home" || P === "End") {
        x.preventDefault(), x.stopPropagation(), O(!1), k(M(null, P === "Home" ? 1 : -1));
        return;
      }
      if (P === "ArrowRight") {
        const J = o.value;
        J !== null && s.items[J]?.items?.length && (x.preventDefault(), x.stopPropagation(), T(J, !0));
        return;
      }
      if (P === "ArrowLeft") {
        r.value !== null && (x.preventDefault(), x.stopPropagation(), O(!0));
        return;
      }
      if (P === "Enter" || P === " ") {
        const J = o.value;
        if (J === null) return;
        x.preventDefault(), x.stopPropagation(), R(J);
      }
    }
    function V(x) {
      const P = s.items[x];
      !P || !Et(P) || (r.value !== null && r.value !== x && O(!1), k(x), P.items?.length && T(x, !1));
    }
    return Ga(() => {
      w(), s.autofocus && k(M(null, 1));
    }), xe(() => s.at, w, { deep: !0 }), xe(() => s.items, () => void w(), { deep: !0 }), et(() => {
      r.value = null;
    }), t({ root: l }), (x, P) => {
      const J = Ts("MenuList", !0);
      return p(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Pe($.value),
        onKeydown: F
      }, [
        (p(!0), h(Y, null, ce(g.value, (re, ve) => (p(), h("div", {
          key: `${ve}-${re.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: re.heading ? "group" : "none",
          "aria-label": re.heading?.label
        }, [
          re.heading ? (p(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": re.heading.id
          }, A(re.heading.label), 9, Xi)) : N("", !0),
          (p(!0), h(Y, null, ce(re.entries, ({ item: Q, index: Me }) => (p(), h(Y, {
            key: Q.id ?? `${Me}-${Q.label ?? ""}`
          }, [
            Q.separator ? (p(), h("div", Yi)) : (p(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (Ae) => {
                Ae && (i.value[Me] = Ae);
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
              onClick: (Ae) => R(Me),
              onMouseenter: (Ae) => V(Me)
            }, [
              y("span", Zi, A(Q.checked ? "✓" : ""), 1),
              y("span", Ji, A(Q.label), 1),
              Q.shortcut ? (p(), h("span", ec, A(Q.shortcut), 1)) : Q.items?.length ? (p(), h("span", tc, "›")) : N("", !0)
            ], 40, Qi))
          ], 64))), 128))
        ], 8, Gi))), 128)),
        r.value !== null && u.value ? (p(), oe(J, {
          key: r.value,
          items: e.items[r.value]?.items ?? [],
          at: u.value,
          label: e.items[r.value]?.label,
          autofocus: f.value,
          onChoose: P[0] || (P[0] = (re) => a("choose", re)),
          onDismiss: P[1] || (P[1] = (re) => O(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
      ], 44, ji);
    };
  }
}), fa = /* @__PURE__ */ de(nc, [["__scopeId", "data-v-9b1413fa"]]), sc = ["data-dc-theme", "aria-label"], ac = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], lc = /* @__PURE__ */ ue({
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
    }), a = t, l = W(null), i = W([]), o = W(null), r = W(null), u = W(!1), f = _(
      () => n.menus.flatMap((R, F) => Et(R) ? [F] : [])
    );
    function b(R, F) {
      const V = i.value[R]?.getBoundingClientRect(), x = n.menus[R];
      !V || !x || !Et(x) || (r.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, o.value = R, u.value = F);
    }
    function g(R) {
      const F = o.value;
      o.value = null, r.value = null, R && F !== null && i.value[F]?.focus();
    }
    function v(R) {
      o.value === R ? g(!0) : b(R, !1);
    }
    function w(R) {
      o.value === null || o.value === R || b(R, !1);
    }
    function $(R, F) {
      const V = f.value;
      if (V.length === 0) return null;
      if (R === null) return F === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const x = V.indexOf(R);
      return x === -1 ? V[0] ?? null : V[(x + F + V.length) % V.length] ?? null;
    }
    function k(R) {
      const F = R.key;
      if (F === "Escape") {
        if (o.value === null) return;
        R.preventDefault(), g(!0);
        return;
      }
      if (F === "ArrowDown" && o.value === null) {
        const P = M();
        if (P === null) return;
        R.preventDefault(), b(P, !0);
        return;
      }
      if (F !== "ArrowLeft" && F !== "ArrowRight") return;
      const V = o.value ?? M(), x = $(V, F === "ArrowRight" ? 1 : -1);
      x !== null && (R.preventDefault(), o.value !== null ? b(x, !0) : i.value[x]?.focus());
    }
    function M() {
      const R = i.value.findIndex((F) => F === document.activeElement);
      return R === -1 ? f.value[0] ?? null : R;
    }
    function T(R) {
      const F = R.target;
      !F || l.value?.contains(F) || g(!1);
    }
    xe(o, (R) => {
      R !== null ? window.addEventListener("pointerdown", T, !0) : window.removeEventListener("pointerdown", T, !0);
    }), et(() => window.removeEventListener("pointerdown", T, !0));
    function O(R) {
      g(!0), R.action?.(), a("choose", R);
    }
    return (R, F) => (p(), h("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Pe(s.value),
      onKeydown: k
    }, [
      (p(!0), h(Y, null, ce(e.menus, (V, x) => (p(), h("button", {
        key: V.id ?? V.label ?? x,
        ref_for: !0,
        ref: (P) => {
          P && (i.value[x] = P);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === x,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: x === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (P) => v(x),
        onMouseenter: (P) => w(x)
      }, A(V.label), 41, ac))), 128)),
      o.value !== null && r.value ? (p(), oe(fa, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: r.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: O,
        onDismiss: F[0] || (F[0] = (V) => g(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
    ], 44, sc));
  }
}), Fu = /* @__PURE__ */ de(lc, [["__scopeId", "data-v-93dbd2e4"]]), rc = ["aria-label", "aria-expanded", "disabled"], oc = { "aria-hidden": "true" }, ic = /* @__PURE__ */ ue({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = W(null), a = W(null), l = W(null), i = W(!1), o = _(() => l.value !== null);
    function r(w) {
      const $ = s.value?.getBoundingClientRect();
      $ && (l.value = { x: $.left, y: $.bottom + 4, mirrorX: $.right }, i.value = w);
    }
    function u(w) {
      l.value = null, w && s.value?.focus();
    }
    function f() {
      o.value ? u(!0) : r(!1);
    }
    function b(w) {
      w.key !== "ArrowDown" || o.value || (w.preventDefault(), r(!0));
    }
    function g(w) {
      const $ = w.target;
      $ && (s.value?.contains($) || a.value?.root?.contains($) || u(!1));
    }
    xe(o, (w) => {
      w ? window.addEventListener("pointerdown", g, !0) : window.removeEventListener("pointerdown", g, !0);
    }), et(() => window.removeEventListener("pointerdown", g, !0));
    function v(w) {
      u(!0), w.action?.(), n("choose", w);
    }
    return (w, $) => (p(), h(Y, null, [
      y("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: b
      }, [
        y("span", oc, A(e.glyph), 1)
      ], 40, rc),
      l.value ? (p(), oe(fa, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: i.value,
        onChoose: v,
        onDismiss: $[0] || ($[0] = (k) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : N("", !0)
    ], 64));
  }
}), Wn = /* @__PURE__ */ de(ic, [["__scopeId", "data-v-48f5ada5"]]), bt = (e) => e.kind === "split", q = (e) => e.kind === "group", j = (e) => e.kind === "float", rt = { x: 16, y: 16, w: 360, h: 260 }, tn = 28, pa = 120, $n = 220, va = 38, dt = 6;
function Lt(e, t) {
  let n = !1;
  const s = e.frames.map((a, l) => {
    const i = t(a.node, l);
    return i === a.node ? a : (n = !0, { ...a, node: i });
  });
  return n ? { ...e, frames: s } : e;
}
function De(e) {
  return { kind: "group", panels: [e] };
}
function Lu(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ie = (e) => typeof e == "string", Hn = (e) => ie(e) ? De(e) : e, Dt = (e) => ie(e) ? [e] : Ue(e), bs = (e) => e.panels.filter(ie), cc = (e) => e.panels.filter((t) => !ie(t)), Se = (e, t) => e.panels.includes(t);
function Nt(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (ie(l) || !ee(l, t)) return l;
    const i = n(l);
    return i !== l && (s = !0), i;
  });
  return s ? { ...e, panels: a } : e;
}
function sn(e, t) {
  return { node: e, rect: { ...rt, ...t } };
}
function Un(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function jn(e, t) {
  const n = { ...rt, ...t };
  return Un(
    e.map(
      (s, a) => sn(s, {
        ...n,
        x: n.x + a * tn,
        y: n.y + a * tn
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
const Xn = (e, t, n) => Gn("row", e, t, n), Du = (e, t, n) => Gn("column", e, t, n);
function he(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Nu = (e) => ({ ...e, headless: !0 }), Iu = (e) => ({ ...e, fixedView: !0 }), uc = (e) => e === "left" || e === "right" ? "row" : "column";
function Ue(e) {
  return q(e) ? e.panels.flatMap(Dt) : j(e) ? e.frames.flatMap((t) => Ue(t.node)) : e.children.flatMap(Ue);
}
function ee(e, t) {
  return q(e) ? e.panels.some((n) => ie(n) ? n === t : ee(n, t)) : j(e) ? e.frames.some((n) => ee(n.node, t)) : e.children.some((n) => ee(n, t));
}
const ma = (e) => Ue(e).length === 0, xn = (e) => !q(e) && ct(e), Mn = (e) => ma(e) && !xn(e);
function an(e) {
  return bt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : j(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ie(t) ? [] : [{ node: t, index: n }]);
}
const Yn = (e) => an(e).map((t) => t.node);
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
function ha(e) {
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
function dc(e) {
  const t = Yn(e).flatMap(dc);
  return q(e) ? [e, ...t] : t;
}
function ge(e, t) {
  if (q(e)) {
    for (const n of cc(e)) {
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
function pn(e, t, n = pa) {
  const s = (o, r) => r > 0 ? Math.max(Math.min(o, r), Math.min(n, r)) : Math.max(o, n), a = s(e.w, t.w), l = s(e.h, t.h), i = (o, r, u) => Math.min(Math.max(o, 0), Math.max(u - r, 0));
  return {
    x: Math.round(i(e.x, a, t.w)),
    y: Math.round(i(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function ks(e, t, n, s, a = pa) {
  let { x: l, y: i, w: o, h: r } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (r = e.h + s), t.includes("n") && (r = e.h - s, i = e.y + s), o < a && (t.includes("w") && (l = e.x + e.w - a), o = a), r < a && (t.includes("n") && (i = e.y + e.h - a), r = a), { x: l, y: i, w: o, h: r };
}
const _a = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (q(e)) return Nt(e, t, (l) => vt(l, t, n));
  if (j(e)) {
    let l = !1;
    const i = e.frames.map((o) => {
      if (!ee(o.node, t)) return o;
      if (ge(o.node, t)) {
        const u = vt(o.node, t, n);
        return u === o.node ? o : (l = !0, { ...o, node: u });
      }
      const r = n(o);
      return r === o ? o : (l = !0, r);
    });
    return l ? { ...e, frames: i } : e;
  }
  if (!ee(e, t)) return e;
  let s = !1;
  const a = e.children.map((l) => {
    const i = vt(l, t, n);
    return i !== l && (s = !0), i;
  });
  return s ? { ...e, children: a } : e;
}
function fc(e, t, n) {
  return vt(e, t, (s) => _a(s.rect, n) ? s : { ...s, rect: n });
}
const Ze = (e) => e.maximized === !0, ga = (e) => (t) => {
  if (Ze(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function pc(e, t, n = !0) {
  return vt(e, t, ga(n));
}
function Ou(e, t) {
  const n = ge(e, t);
  return n ? pc(e, t, !Ze(n)) : e;
}
const at = (e) => e.minimized === !0, ya = (e) => (t) => {
  if (at(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function vc(e, t, n = !0) {
  return vt(e, t, ya(n));
}
function Vu(e, t) {
  const n = ge(e, t);
  return n ? vc(e, t, !at(n)) : e;
}
function st(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = Je(e, t.slice(0, -1));
  return !s || !j(s) ? null : s.frames[n] ?? null;
}
function Cn(e, t) {
  if (j(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ee(s.node, t)) continue;
      const a = Cn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of an(e)) {
    if (!ee(n, t)) continue;
    const a = Cn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function Qn(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = Je(e, a);
  if (!l || !j(l)) return e;
  const i = l.frames[s];
  if (!i) return e;
  const o = n(i);
  if (o === i) return e;
  const r = [...l.frames];
  return r[s] = o, it(e, a, { ...l, frames: r });
}
function $s(e, t, n) {
  return Qn(
    e,
    t,
    (s) => _a(s.rect, n) ? s : { ...s, rect: n }
  );
}
function mc(e, t, n = !0) {
  return Qn(e, t, ga(n));
}
function hc(e, t, n = !0) {
  return Qn(e, t, ya(n));
}
function St(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (j(e)) {
    const i = e.frames[n];
    if (!i) return e;
    const o = St(i.node, s), r = o === i.node ? i : { ...i, node: o };
    if (n === e.frames.length - 1 && r === i) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(r), { ...e, frames: u };
  }
  const a = Je(e, [n]);
  if (!a) return e;
  const l = St(a, s);
  return l === a ? e : it(e, [n], l);
}
function _c(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (j(s) && (n[l] = s.frames.length - 1), s = Je(s, [a]));
  }), n;
}
function Ht(e, t, n, s) {
  if (q(e)) return Nt(e, n, (i) => Ht(i, t, n, s));
  if (j(e)) {
    const i = e.frames.findIndex((r) => ee(r.node, n)), o = e.frames[i];
    if (!o) return e;
    if (ge(o.node, n)) {
      const r = Ht(o.node, t, n, s);
      if (r === o.node) return e;
      const u = [...e.frames];
      return u[i] = { ...o, node: r }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, sn(De(t), s)] };
  }
  if (!ee(e, n)) return e;
  let a = !1;
  const l = e.children.map((i) => {
    const o = Ht(i, t, n, s);
    return o !== i && (a = !0), o;
  });
  return a ? { ...e, children: l } : e;
}
function xs(e, t, n, s) {
  if (t === n || !ee(e, t) || !ee(e, n) || !ge(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const l = Ht(a, t, n, s);
  return l === a ? e : _e(l);
}
function gc(e, t, n) {
  return j(e) ? { ...e, frames: [...e.frames, sn(De(t), n)] } : q(e) ? ba(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, De(t)],
    sizes: [...He(e), 1],
    ...he(e)
  };
}
function wa(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return gc(e, t, s);
  const l = n.slice(1), i = (f, b) => b === a ? wa(f, t, l, s) : ot(f, t);
  if (j(e)) {
    const f = e.frames.flatMap((b, g) => {
      const v = i(b.node, g);
      return v ? [v === b.node ? b : { ...b, node: v }] : [];
    });
    return { ...e, frames: f };
  }
  if (q(e)) {
    const f = ut(e), b = [];
    e.panels.forEach((w, $) => {
      if (ie(w)) {
        w !== t && b.push(w);
        return;
      }
      const k = i(w, $);
      k && b.push(k);
    });
    const v = e.active && b.some((w) => Dt(w).includes(e.active)) ? e.active : ke(b[f] ?? b[b.length - 1]);
    return {
      kind: "group",
      panels: b,
      ...v ? { active: v } : {},
      ...he(e)
    };
  }
  const o = He(e), r = [], u = [];
  return e.children.forEach((f, b) => {
    const g = i(f, b);
    g && (r.push(g), u.push(o[b] ?? 0));
  }), { kind: "split", direction: e.direction, children: r, sizes: u, ...he(e) };
}
function Ms(e, t, n, s) {
  const a = Je(e, n);
  return !a || !ma(a) || !ee(e, t) ? e : _e(wa(e, t, n, s));
}
function vn(e, t) {
  if (q(e)) return Nt(e, t, (a) => vn(a, t));
  if (j(e)) {
    const a = e.frames.findIndex((u) => ee(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const i = vn(l.node, t), o = i === l.node ? l : { ...l, node: i };
    if (a === e.frames.length - 1 && o === l) return e;
    const r = [...e.frames];
    return r.splice(a, 1), r.push(o), { ...e, frames: r };
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = vn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Zn(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), a = s.reduce((l, i) => l + i, 0);
  return a <= 0 ? n() : s.map((l) => l / a);
}
const He = (e) => Zn(e.children.length, e.sizes), Te = (e) => {
  const t = q(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function _e(e) {
  if (q(e)) return yc(e);
  if (j(e)) {
    const o = e.frames.flatMap((r) => {
      const u = _e(r.node);
      return Mn(u) ? [] : [u === r.node ? r : { ...r, node: u }];
    });
    return o.length === e.frames.length && o.every((r, u) => r === e.frames[u]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = He(e), n = Te(e), s = [], a = [], l = [];
  e.children.forEach((o, r) => {
    const u = _e(o), f = t[r] ?? 0;
    if (Mn(u)) return;
    if (!n && bt(u) && u.direction === e.direction && !Te(u) && !ct(u)) {
      const g = He(u);
      u.children.forEach((v, w) => {
        s.push(v), a.push(f * (g[w] ?? 0));
      });
      return;
    }
    s.push(u), a.push(f);
    const b = n?.[r];
    b && l.push(b);
  });
  const i = s[0];
  return s.length === 1 && i && !ct(e) ? i : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: Zn(s.length, a),
    ...he(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function yc(e) {
  if (e.panels.every(ie)) return e;
  const t = ke(e), n = Te(e), s = [], a = [];
  e.panels.forEach((o, r) => {
    const u = n?.[r];
    if (ie(o)) {
      s.push(o), u && a.push(u);
      return;
    }
    const f = _e(o);
    if (!Mn(f)) {
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
  if (s.length === e.panels.length && s.every((o, r) => o === e.panels[r]))
    return e;
  const i = t && s.some((o) => Dt(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...i ? { active: i } : {},
    ...he(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ot(e, t) {
  if (j(e)) {
    const i = e.frames.flatMap((o) => {
      const r = ot(o.node, t);
      return r ? [r === o.node ? o : { ...o, node: r }] : [];
    });
    return i.length === 0 && !xn(e) ? null : { ...e, frames: i };
  }
  if (q(e)) {
    if (!ee(e, t)) return e;
    const i = ut(e), o = [];
    for (const f of e.panels) {
      if (ie(f)) {
        f !== t && o.push(f);
        continue;
      }
      const b = ot(f, t);
      b && o.push(b);
    }
    if (o.length === 0) return null;
    const u = e.active && o.some((f) => Dt(f).includes(e.active)) ? e.active : ke(o[i] ?? o[o.length - 1]);
    return u ? { kind: "group", panels: o, active: u, ...he(e) } : { kind: "group", panels: o, ...he(e) };
  }
  const n = He(e), s = [], a = [];
  if (e.children.forEach((i, o) => {
    const r = ot(i, t);
    r && (s.push(r), a.push(n[o] ?? 0));
  }), s.length === 0)
    return xn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...he(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !ct(e) ? l : _e({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...he(e)
  });
}
function ba(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...he(e) };
}
function Ct(e, t, n, s, a) {
  const l = (v) => Lt(
    v,
    (w) => ee(w, n) ? Ct(w, t, n, s, a) : w
  );
  if (s === "float") return e;
  const i = (v) => Nt(v, n, (w) => Ct(w, t, n, s, a));
  if (s === "center")
    return q(e) ? Se(e, n) ? ba(e, t, a) : i(e) : j(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (v) => ee(v, n) ? Ct(v, t, n, s, a) : v
      )
    };
  const o = uc(s), r = s === "left" || s === "top", u = (v) => ({
    kind: "split",
    direction: o,
    children: r ? [De(t), v] : [v, De(t)],
    sizes: [0.5, 0.5]
  });
  if (q(e)) return Se(e, n) ? u(e) : i(e);
  if (j(e)) return l(e);
  const f = He(e), b = e.children.findIndex(
    (v) => q(v) && Se(v, n)
  );
  if (b >= 0 && e.direction === o) {
    const v = (f[b] ?? 0) / 2, w = [...e.children], $ = [...f];
    return w.splice(r ? b : b + 1, 0, De(t)), $.splice(b, 1, v, v), {
      kind: "split",
      direction: o,
      children: w,
      sizes: $,
      ...he(e)
    };
  }
  const g = e.children.map((v) => ee(v, n) ? q(v) && Se(v, n) ? u(v) : Ct(v, t, n, s) : v);
  return {
    kind: "split",
    direction: e.direction,
    children: g,
    sizes: f,
    ...he(e)
  };
}
function mt(e, t) {
  if (q(e)) {
    if (Se(e, t))
      return ha(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((r) => !ie(r) && ee(r, t)), l = e.panels[a];
    if (l === void 0 || ie(l)) return e;
    const i = mt(l, t);
    if (i === l && e.active === t) return e;
    const o = [...e.panels];
    return o[a] = i, { ...e, panels: o, active: t };
  }
  if (!ee(e, t)) return e;
  if (j(e)) return Lt(e, (a) => mt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = mt(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Pt(e, t, n) {
  if (q(e)) {
    if (!Se(e, t)) return Nt(e, t, (u) => Pt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const l = [...e.panels];
    l.splice(s, 1), l.splice(a, 0, t);
    const i = Te(e), o = i ? [...i] : void 0;
    o && o.splice(a, 0, ...o.splice(s, 1));
    const r = ke(e);
    return {
      kind: "group",
      panels: l,
      ...r ? { active: r } : {},
      ...he(e),
      ...o ? { places: o } : {}
    };
  }
  return ee(e, t) ? j(e) ? Lt(e, (s) => Pt(s, t, n)) : { ...e, children: e.children.map((s) => Pt(s, t, n)) } : e;
}
function Ut(e, t, n) {
  if (t === n) return e;
  if (q(e)) {
    if (!ee(e, t) && !ee(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => ie(l) ? s(l) : Ut(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return j(e) ? Lt(e, (s) => Ut(s, t, n)) : { ...e, children: e.children.map((s) => Ut(s, t, n)) };
}
function qt(e, t, n, s, a) {
  if (s === "float" || !ee(e, t) || !ee(e, n)) return e;
  const l = pt(e, t);
  if (s === "center" && l && Se(l, n)) {
    if (a === void 0) return e;
    const o = l.panels.indexOf(t), r = a > o ? a - 1 : a;
    return r === o ? e : mt(Pt(e, t, r), t);
  }
  if (t === n) return e;
  const i = ot(e, t);
  return i ? _e(Ct(i, t, n, s, a)) : e;
}
function ka(e, t, n) {
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
function It(e, t, n) {
  const s = an(e);
  if (!q(e) && s.some(({ node: a }) => q(a) && Se(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!ee(a, t)) continue;
    const i = It(a, t, n);
    return i ? ka(e, l, i) : null;
  }
  return null;
}
function Ku(e, t, n) {
  const s = It(
    e,
    t,
    (a) => bt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? _e(s) : e;
}
function $a(e) {
  return j(e) ? [e] : Te(e) || ct(e) ? [e] : q(e) ? [...e.panels] : e.children.flatMap($a);
}
function xa(e, t) {
  if (q(e)) return e;
  const n = Yn(e).map($a), s = n.flat(), a = t && s.some((i) => Dt(i).includes(t)) ? t : void 0, l = wc(e, n);
  return _e({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...he(e),
    ...l ? { places: l } : {}
  });
}
function wc(e, t) {
  const n = j(e) ? e.frames.map(({ node: s, ...a }) => a) : Te(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function bc(e, t) {
  const n = It(e, t, (s) => xa(s, t));
  return n ? _e(n) : e;
}
function Jn(e, t, n) {
  if (q(e) && Se(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of an(e)) {
    if (!ee(s, t)) continue;
    const l = Jn(s, t, n);
    return l ? ka(e, a, l) : null;
  }
  return null;
}
function Cs(e, t, n) {
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
function En(e, t) {
  if (q(e)) return e;
  if (j(e)) {
    const a = e.frames.findIndex(
      (o) => q(o.node) && o.node.panels.includes(t)
    ), l = e.frames[a], i = l && q(l.node) ? l.node : null;
    if (l && i && i.panels.length > 1) {
      const o = jn(i.panels.map(Hn), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...o, ...e.frames.slice(a + 1)]
      };
    }
    return Lt(e, (o) => En(o, t));
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = En(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function kc(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (ge(e, t)?.node === s) {
    const i = En(e, t);
    return i === e ? e : _e(i);
  }
  const l = Jn(e, t, (i) => ({
    ...Un(Ma(i.panels.map(Hn), Te(i), n)),
    ...he(i)
  }));
  return l ? _e(l) : e;
}
function Ma(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : jn(e, n).frames;
}
function Ca(e, t) {
  return { ...Un(Ma(e.children, Te(e), t)), ...he(e) };
}
function qu(e, t, n) {
  const s = It(
    e,
    t,
    (a) => j(a) ? a : Ca(a, n)
  );
  return s ? _e(s) : q(e) && Se(e, t) ? jn([e], n) : e;
}
function $c(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function Ea(e, t) {
  const n = $c(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...he(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Bu(e, t, n = "row") {
  const s = It(
    e,
    t,
    (a) => j(a) ? Ea(a, n) : a
  );
  return s ? _e(s) : e;
}
function Sa(e) {
  if (j(e)) return null;
  const t = q(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ie(t) || q(t) && t.panels.length === 1 && ie(t.panels[0]) ? null : t;
}
const xc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Mc(e, t) {
  const n = Sa(e);
  return n ? t === "inner" ? n : { ...xc(n), ...he(e) } : e;
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
function Je(e, t) {
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
  const i = it(l, a, n);
  if (i === l) return e;
  const o = [...e.children];
  return o[s] = i, { ...e, children: o };
}
function jt(e, t, n) {
  if (t.length === 0)
    return bt(e) ? { ...e, sizes: Zn(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (j(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const r = jt(o.node, a, n);
    if (r === o.node) return e;
    const u = [...e.frames];
    return u[s] = { ...o, node: r }, { ...e, frames: u };
  }
  if (q(e)) {
    const o = e.panels[s];
    if (o === void 0 || ie(o)) return e;
    const r = jt(o, a, n);
    if (r === o) return e;
    const u = [...e.panels];
    return u[s] = r, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const i = [...e.children];
  return i[s] = jt(l, a, n), { ...e, children: i };
}
function Es(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const i = a + l;
  if (i < s * 2) return e;
  const o = [...e], r = Math.min(Math.max(a + n, s), i - s);
  return o[t] = r, o[t + 1] = i - r, o;
}
function nn(e) {
  if (!q(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ie(t) ? e : { ...Xn([Cc(e)]), ...he(e) };
}
const Cc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ss(e) {
  return e.length === 0 ? null : Xn(e.map(De));
}
function Ec(e, t) {
  if (!e) return Ss(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const r of Ue(e))
    !n.has(r) || s.has(r) ? a.add(r) : s.add(r);
  let l = e;
  for (const r of a)
    l = l ? ot(l, r) : null;
  const i = new Set(l ? Ue(l) : []), o = t.filter((r) => !i.has(r));
  if (o.length === 0) return l ? nn(_e(l)) : null;
  if (!l) return Ss(o);
  if (j(l)) {
    const r = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (u, f) => sn(De(u), {
            x: rt.x + (r + f) * tn,
            y: rt.y + (r + f) * tn
          })
        )
      ]
    };
  }
  return nn(_e(Xn([l, ...o.map(De)])));
}
const es = Symbol("dc.windowContext");
function Sc(e) {
  return Sn(es, e), e;
}
function ts() {
  const e = _t(es, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Pc = ["data-dc-glyph"], Ac = { class: "dc-glyph__line" }, zc = ["d"], Rc = {
  key: 0,
  class: "dc-glyph__aqua"
}, Tc = ["d"], Fc = /* @__PURE__ */ ue({
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
    return (s, a) => (p(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      y("g", Ac, [
        (p(!0), h(Y, null, ce(t[e.kind], (l) => (p(), h("path", {
          key: l,
          d: l
        }, null, 8, zc))), 128))
      ]),
      n[e.kind] ? (p(), h("g", Rc, [
        (p(!0), h(Y, null, ce(n[e.kind], (l) => (p(), h("path", {
          key: l,
          d: l
        }, null, 8, Tc))), 128))
      ])) : N("", !0)
    ], 8, Pc));
  }
}), ht = /* @__PURE__ */ de(Fc, [["__scopeId", "data-v-4d2872c0"]]), Lc = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Dc = ["data-dc-movable"], Nc = { class: "dc-float__title dc-truncate" }, Ic = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Oc = ["aria-label", "aria-pressed", "data-dc-minimize"], Vc = ["aria-label", "aria-pressed", "data-dc-maximize"], Kc = ["aria-label", "data-dc-close"], qc = { class: "dc-float__content" }, Bc = ["data-dc-handle", "onPointerdown"], Wc = /* @__PURE__ */ ue({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ts(), s = _(() => ke(t.frame.node)), a = _(() => n.panelFor(s.value)?.fixed === !0), l = _(() => Ze(t.frame)), i = _(() => at(t.frame)), o = _(() => l.value || i.value), r = _(() => n.resizable.value && !a.value && !o.value), u = _(() => n.movable.value && !a.value && !o.value), f = _(() => {
      const F = Ue(t.frame.node);
      return F.length === 1 ? F[0] ?? null : null;
    }), b = _(() => f.value !== null && n.closable(f.value)), g = _(() => t.frame.node.headless === !0), v = _(
      () => !g.value && (!q(t.frame.node) || i.value)
    ), w = _(
      () => t.frame.title || yt(t.frame.node) || At(t.frame.node, (F) => n.panelFor(F)?.title)
    ), $ = _(() => n.spaceMenu(t.path));
    function k(F) {
      F.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, F, "move");
    }
    function M(F) {
      F.target?.closest("button, a, input, select, textarea, label") || (i.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const T = _(() => {
      const F = n.framing.value;
      return F !== null && ee(t.frame.node, F);
    }), O = _(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : i.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${$n}px`,
        height: `${va}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), R = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (F, V) => (p(), h("div", {
      class: "dc-float",
      style: Pe(O.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": i.value ? "true" : "false",
      "data-dc-dragging": T.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (x) => E(n).raiseAt(e.path))
    }, [
      v.value ? (p(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: k,
        onDblclick: M
      }, [
        y("span", Nc, A(w.value), 1),
        $.value.length ? (p(), oe(Wn, {
          key: 0,
          items: $.value,
          label: `${w.value} menu`
        }, null, 8, ["items", "label"])) : N("", !0),
        !a.value || i.value && b.value && f.value ? (p(), h("div", Ic, [
          a.value ? N("", !0) : (p(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${i.value ? "Unroll" : "Minimize"} ${w.value}`,
            "aria-pressed": i.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (x) => E(n).toggleMinimizeAt(e.path))
          }, [
            pe(ht, {
              kind: i.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Oc)),
          a.value ? N("", !0) : (p(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${w.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (x) => E(n).toggleMaximizeAt(e.path))
          }, [
            pe(ht, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Vc)),
          i.value && b.value && f.value ? (p(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${w.value}`,
            "data-dc-close": f.value,
            onClick: V[2] || (V[2] = (x) => E(n).close(f.value))
          }, [
            pe(ht, { kind: "close" })
          ], 8, Kc)) : N("", !0)
        ])) : N("", !0)
      ], 40, Dc)) : N("", !0),
      y("div", qc, [
        Be(F.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), h(Y, null, ce(r.value ? R : [], (x) => (p(), h("span", {
        key: x,
        class: "dc-float__grip",
        "data-dc-handle": x,
        "aria-hidden": "true",
        onPointerdown: qe((P) => E(n).beginFrameDragAt(e.path, P, x), ["stop"])
      }, null, 40, Bc))), 128))
    ], 44, Lc));
  }
}), Hc = /* @__PURE__ */ de(Wc, [["__scopeId", "data-v-f035684c"]]), ns = Symbol("dc.paneContext");
function Uc(e) {
  return Sn(ns, e), e;
}
function Wu() {
  return _t(ns, null);
}
function Hu(e) {
  const t = _t(es, null), n = _t(ns, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Mt(e)
  );
  return Xa() && As(s), s;
}
const jc = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Gc = ["data-dc-movable"], Xc = ["aria-label", "aria-pressed"], Yc = ["data-dc-space-name"], Qc = { class: "dc-truncate" }, Zc = ["aria-label"], Jc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, eu = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], tu = { class: "dc-tab__name dc-truncate" }, nu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, su = ["aria-label", "data-dc-close", "onClick"], au = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, lu = { class: "dc-pane__tools" }, ru = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, ou = ["aria-label", "data-dc-minimize"], iu = ["aria-label", "aria-pressed", "data-dc-maximize"], cu = ["aria-label", "data-dc-close"], uu = ["id", "role", "aria-labelledby"], du = ["id", "role", "aria-labelledby"], fu = ["data-dc-edge"], pu = /* @__PURE__ */ ue({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ts(), s = Rs() ?? "dc-pane", a = _(
      () => t.group.panels.flatMap((L, K) => {
        if (!ie(L)) {
          const $e = yt(L) || At(L, (we) => n.panelFor(we)?.title);
          return [{ kind: "space", index: K, id: `space-${K}`, title: $e, node: L }];
        }
        const X = n.panelFor(L);
        return X ? [{ kind: "panel", index: K, id: L, title: X.title, panel: X }] : [];
      })
    ), l = _(() => a.value.length > 1), i = _(() => {
      const L = ut(t.group);
      return a.value.find((K) => K.index === L) ?? a.value[0] ?? null;
    }), o = _(() => i.value?.kind === "space" ? i.value.node : null), r = _(() => o.value ? "" : ha(t.group)), u = _(() => o.value ? null : n.panelFor(r.value)), f = _(() => i.value?.title ?? ""), b = _(() => n.spaceNames.value ? t.group.title ?? "" : ""), g = _(() => [...t.path, i.value?.index ?? 0]), v = _(() => r.value || bs(t.group)[0] || ""), w = _(() => n.viewFor(r.value)), $ = _(() => t.group.headless === !0), k = _(() => n.focused.value === r.value), M = _(() => n.dragging.value === r.value), T = _(() => n.moving.value === r.value), O = _(() => n.frameOf(v.value) !== null), R = _(() => n.panelFor(v.value)?.fixed === !0), F = _(
      () => !o.value && (n.canMove(r.value) || O.value && n.movable.value && !R.value)
    ), V = _(
      () => o.value ? n.spaceMenu(g.value) : n.menuFor(r.value)
    ), x = (L) => n.closable(L);
    Uc({ panel: r });
    const P = _(() => n.maximized(v.value)), J = _(
      () => O.value && !R.value || !l.value && !!u.value && x(u.value.id)
    ), re = (L) => `${s}-tab-${L}`, ve = _(() => `${s}-body`), Q = _(() => {
      const L = n.dropTarget.value;
      return !L || !Se(t.group, L.panel) || L.edge === "float" ? null : L;
    }), Me = _(() => Q.value?.index === void 0 ? Q.value?.edge ?? null : null), Ae = _(() => Q.value?.index ?? null), D = () => u.value ? n.renderContent(u.value, w.value, k.value) ?? null : null, G = () => u.value ? n.renderActions(u.value, w.value, k.value) ?? null : null;
    let te = null;
    function ne(L) {
      const K = te !== null && Math.hypot(L.clientX - te.x, L.clientY - te.y) >= 4;
      return te = null, K;
    }
    const me = (L) => L.kind === "panel" ? L.id : ke(L.node);
    function Ce(L, K) {
      K.kind !== "space" && (n.focus(K.id), te = { x: L.clientX, y: L.clientY }, n.beginDrag(K.id, L));
    }
    function je(L, K) {
      if (ne(L)) return;
      const X = me(K);
      X && n.selectPanel(X);
    }
    function Ge(L) {
      r.value && n.focus(r.value), !L.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (O.value ? n.beginFrameDrag(v.value, L, "move") : n.beginDrag(r.value, L));
    }
    function Xe(L) {
      te = { x: L.clientX, y: L.clientY }, n.beginDrag(r.value, L);
    }
    function Ye(L) {
      ne(L) || n.toggleMoveMode(r.value);
    }
    const Ne = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ie(L) {
      if (!T.value) return;
      if (L.key === "Escape") {
        L.preventDefault(), n.toggleMoveMode(r.value);
        return;
      }
      const K = Ne[L.key];
      K && (L.preventDefault(), O.value ? n.nudgeFrame(r.value, K, L.shiftKey) : n.nudge(r.value, K, L.shiftKey));
    }
    function Oe(L) {
      !O.value || L.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(v.value);
    }
    function kt(L, K) {
      L.stopPropagation(), te = null, n.close(K);
    }
    function Ot(L, K) {
      const X = a.value.length;
      let $e = null;
      if (L.key === "ArrowRight" ? $e = (K + 1) % X : L.key === "ArrowLeft" ? $e = (K - 1 + X) % X : L.key === "Home" ? $e = 0 : L.key === "End" && ($e = X - 1), $e === null) return;
      L.preventDefault();
      const we = a.value[$e];
      if (!we) return;
      const $t = me(we);
      $t && n.selectPanel($t);
    }
    return (L, K) => i.value ? (p(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": r.value || void 0,
      "data-dc-panels": E(bs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": O.value ? "true" : "false",
      "data-dc-maximized": P.value ? "true" : "false",
      "data-dc-headless": $.value ? "true" : "false",
      "data-dc-active": k.value ? "true" : "false",
      "data-dc-dragging": M.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: K[7] || (K[7] = (X) => r.value && E(n).focus(r.value))
    }, [
      $.value ? N("", !0) : (p(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": F.value ? "true" : "false",
        onPointerdown: Ge,
        onDblclick: Oe
      }, [
        F.value ? (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": T.value,
          onPointerdown: Xe,
          onClick: Ye,
          onKeydown: Ie
        }, [...K[8] || (K[8] = [
          y("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Xc)) : N("", !0),
        b.value ? (p(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": b.value
        }, [
          y("span", Qc, A(b.value), 1)
        ], 8, Yc)) : N("", !0),
        y("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (p(!0), h(Y, null, ce(a.value, (X, $e) => (p(), h(Y, {
            key: X.id
          }, [
            Ae.value === $e ? (p(), h("span", Jc)) : N("", !0),
            y("button", {
              id: re(X.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": X.kind === "panel" ? X.id : void 0,
              "data-dc-space": X.kind === "space" ? X.title : void 0,
              "aria-selected": X.index === i.value.index,
              "aria-controls": ve.value,
              tabindex: X.index === i.value.index ? 0 : -1,
              onPointerdown: (we) => Ce(we, X),
              onClick: (we) => je(we, X),
              onKeydown: (we) => Ot(we, $e)
            }, [
              y("span", tu, A(X.title), 1),
              X.kind === "panel" && X.panel.subtitle ? (p(), h("span", nu, A(X.panel.subtitle), 1)) : N("", !0),
              l.value && X.kind === "panel" && x(X.id) ? (p(), h("span", {
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
              ])], 40, su)) : N("", !0)
            ], 40, eu)
          ], 64))), 128)),
          Ae.value === a.value.length ? (p(), h("span", au)) : N("", !0)
        ], 8, Zc),
        y("div", lu, [
          pe(G),
          V.value.length ? (p(), oe(Wn, {
            key: 0,
            items: V.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : N("", !0)
        ]),
        J.value ? (p(), h("div", ru, [
          O.value && !R.value ? (p(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": v.value,
            onPointerdown: K[1] || (K[1] = qe(() => {
            }, ["stop"])),
            onClick: K[2] || (K[2] = (X) => E(n).toggleMinimize(v.value))
          }, [
            pe(ht, { kind: "minimize" })
          ], 40, ou)) : N("", !0),
          O.value && !R.value ? (p(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${P.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": P.value,
            "data-dc-maximize": v.value,
            onPointerdown: K[3] || (K[3] = qe(() => {
            }, ["stop"])),
            onClick: K[4] || (K[4] = (X) => E(n).toggleMaximize(v.value))
          }, [
            pe(ht, {
              kind: P.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, iu)) : N("", !0),
          !l.value && u.value && x(u.value.id) ? (p(), h("button", {
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
          ], 40, cu)) : N("", !0)
        ])) : N("", !0)
      ], 40, Gc)),
      o.value ? (p(), h("div", {
        key: 1,
        id: ve.value,
        class: "dc-pane__space",
        role: $.value ? void 0 : "tabpanel",
        "aria-labelledby": $.value ? void 0 : re(i.value.id)
      }, [
        Be(L.$slots, "space", {
          node: o.value,
          path: g.value
        }, void 0, !0)
      ], 8, uu)) : (p(), h("div", {
        key: 2,
        id: ve.value,
        class: "dc-pane__body",
        role: $.value ? void 0 : "tabpanel",
        "aria-labelledby": $.value ? void 0 : re(r.value)
      }, [
        pe(D)
      ], 8, du)),
      Me.value ? (p(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Me.value,
        "aria-hidden": "true"
      }, null, 8, fu)) : N("", !0)
    ], 40, jc)) : N("", !0);
  }
}), Pa = /* @__PURE__ */ de(pu, [["__scopeId", "data-v-44fd2b2d"]]), vu = ["data-dc-space", "data-dc-path", "aria-label"], mu = {
  key: 0,
  class: "dc-space__head"
}, hu = { class: "dc-space__title dc-truncate" }, _u = ["data-dc-direction"], gu = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, yu = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], wu = /* @__PURE__ */ ue({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ts(), s = W(null), a = _(() => q(t.node) ? t.node : null), l = _(() => bt(t.node) ? t.node : null), i = _(() => j(t.node) ? t.node : null), o = _(
      () => l.value ? l.value.children : i.value?.frames.map((D) => D.node) ?? []
    ), r = _(() => l.value ? He(l.value) : []), u = _(
      () => (i.value?.frames ?? []).map((D, G) => ({
        held: D,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: G,
        key: x(D.node),
        path: [...t.path, G]
      })).sort((D, G) => D.key < G.key ? -1 : D.key > G.key ? 1 : 0)
    ), f = _(() => yt(t.node)), b = _(() => n.spaceMenu(t.path)), g = _(() => t.node.headless === !0), v = _(() => i.value ? "desktop" : l.value?.direction ?? ""), w = W(null), $ = W(0);
    let k = null;
    xe(
      w,
      (D) => {
        k?.disconnect(), k = null, !(!D || typeof ResizeObserver > "u") && ($.value = D.clientWidth, k = new ResizeObserver(([G]) => {
          $.value = G?.contentRect.width ?? 0;
        }), k.observe(D));
      },
      { immediate: !0 }
    ), et(() => k?.disconnect());
    const M = _(() => {
      const D = Math.max(
        1,
        Math.floor(($.value + dt) / ($n + dt))
      ), G = /* @__PURE__ */ new Map();
      let te = 0;
      for (const ne of u.value)
        ne.held.minimized === !0 && (G.set(ne.key, {
          x: dt + te % D * ($n + dt),
          bottom: dt + Math.floor(te / D) * (va + dt)
        }), te += 1);
      return G;
    }), T = (D) => !!D && D.join("/") === t.path.join("/"), O = _(() => {
      const D = n.dropTarget.value, G = i.value;
      if (!G || !D?.rect || D.edge !== "float") return null;
      if (D.space) return T(D.space) ? D.rect : null;
      const te = ge(G, D.panel);
      return te && G.frames.includes(te) ? D.rect : null;
    }), R = _(() => {
      const D = n.dropTarget.value;
      return !!D && !D.rect && T(D.space);
    }), F = _(() => l.value?.direction === "row"), V = _(() => o.value.map((D, G) => [...t.path, G])), x = (D) => [...Ue(D)].sort().join("/"), P = (D) => {
      const G = Ue(D)[0];
      return (G ? n.panelFor(G)?.title : null) ?? G ?? "panel";
    }, J = (D) => {
      const G = o.value[D], te = o.value[D + 1];
      return !G || !te ? "Resize panels" : `Resize ${P(G)} and ${P(te)}`;
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
      const Ce = F.value ? D.clientX : D.clientY, je = He(te), Ge = Math.min(n.minPanelSize.value / me, 0.4);
      D.preventDefault();
      const Xe = (Ie) => {
        const Oe = ((F.value ? Ie.clientX : Ie.clientY) - Ce) / me;
        n.setSizes(t.path, Es(je, G, Oe, Ge));
      }, Ye = () => Q?.(), Ne = (Ie) => {
        Ie.key === "Escape" && (n.setSizes(t.path, je), Q?.());
      };
      Q = () => {
        window.removeEventListener("pointermove", Xe), window.removeEventListener("pointerup", Ye), window.removeEventListener("pointercancel", Ye), window.removeEventListener("keydown", Ne), Q = null;
      }, window.addEventListener("pointermove", Xe), window.addEventListener("pointerup", Ye), window.addEventListener("pointercancel", Ye), window.addEventListener("keydown", Ne);
    }
    et(() => Q?.());
    function Ae(D, G) {
      const te = l.value;
      if (!n.resizable.value || !te) return;
      const ne = F.value ? "ArrowRight" : "ArrowDown", me = F.value ? "ArrowLeft" : "ArrowUp", Ce = D.shiftKey ? 0.1 : 0.02;
      if (D.key !== ne && D.key !== me) return;
      const je = D.key === ne ? Ce : -Ce;
      D.preventDefault(), n.setSizes(t.path, Es(He(te), G, je, ve()));
    }
    return (D, G) => {
      const te = Ts("WindowNode", !0);
      return a.value ? (p(), oe(Pa, {
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
      }, 8, ["group", "path"])) : (p(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": v.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !g.value ? (p(), h("header", mu, [
          y("span", hu, A(f.value), 1),
          b.value.length ? (p(), oe(Wn, {
            key: 0,
            items: b.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : N("", !0)
        ])) : N("", !0),
        i.value ? (p(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: w,
          class: "dc-window__desktop"
        }, [
          O.value ? (p(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Pe({
              left: `${O.value.x}px`,
              top: `${O.value.y}px`,
              width: `${O.value.w}px`,
              height: `${O.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : N("", !0),
          (p(!0), h(Y, null, ce(u.value, (ne) => (p(), oe(Hc, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: M.value.get(ne.key) ?? null
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
        ], 512)) : l.value ? (p(), h("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          R.value ? (p(), h("div", gu)) : N("", !0),
          (p(!0), h(Y, null, ce(o.value, (ne, me) => (p(), h(Y, {
            key: x(ne)
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
            me < o.value.length - 1 ? (p(), h("div", {
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
            }, null, 40, yu)) : N("", !0)
          ], 64))), 128))
        ], 8, _u)) : N("", !0)
      ], 8, vu));
    };
  }
}), bu = /* @__PURE__ */ de(wu, [["__scopeId", "data-v-fb5b403f"]]), ku = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], $u = {
  key: 1,
  class: "dc-window__empty"
}, xu = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Bt = 16, Mu = /* @__PURE__ */ ue({
  __name: "WindowFrame",
  props: /* @__PURE__ */ Zt({
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
  emits: /* @__PURE__ */ Zt(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = Qt(e, "layout"), i = Qt(e, "views"), o = Pn(), r = _(() => new Map(s.panels.map((c) => [c.id, c]))), u = _(() => s.panels.map((c) => c.id)), f = _(() => Ec(l.value, u.value)), b = W(null), g = W(null), v = W(null), w = W(!0), $ = W(null), k = W(null), M = W(null), T = W(""), O = W(null);
    function R() {
      const c = O.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((m) => m.closest(".dc-window") === c).map((m) => ({ panels: (m.dataset.dcPanels ?? "").split(" "), element: m })) : [];
    }
    function F(c) {
      const d = [];
      let m = c.closest(".dc-float");
      for (; m; )
        d.unshift(Number(m.dataset.dcOrder ?? 0)), m = m.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function V() {
      return R().map((c) => ({ pane: c, order: F(c.element) })).sort((c, d) => {
        const m = Math.max(c.order.length, d.order.length);
        for (let C = 0; C < m; C += 1) {
          const S = (c.order[C] ?? -1) - (d.order[C] ?? -1);
          if (S !== 0) return S;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const x = (c) => R().find((d) => d.panels.includes(c)) ?? null;
    function P(c) {
      const d = r.value.get(c);
      if (!d) return "";
      const m = i.value[c];
      return m && d.views?.some((C) => C.key === m) ? m : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function J(c, d) {
      i.value = { ...i.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const re = _(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ve(c) {
      return !s.movable || re.value < 1 || s.panels.length < 2 ? !1 : r.value.get(c)?.fixed !== !0;
    }
    function Q(c, d) {
      const m = f.value;
      !c || !m || c === m || (l.value = c, d && a("panel-move", d));
    }
    function Me(c, d, m) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const C = (d - c.left) / c.width, S = (m - c.top) / c.height, z = 0.3;
      return C > z && C < 1 - z && S > z && S < 1 - z ? "center" : [
        { edge: "left", distance: C },
        { edge: "right", distance: 1 - C },
        { edge: "top", distance: S },
        { edge: "bottom", distance: 1 - S }
      ].reduce(
        (Z, I) => I.distance < Z.distance ? I : Z
      ).edge;
    }
    function Ae(c, d) {
      const m = [...c.querySelectorAll(".dc-tab")], C = m.findIndex((S) => {
        const z = S.getBoundingClientRect();
        return d < z.left + z.width / 2;
      });
      return C === -1 ? m.length : C;
    }
    function D(c, d, m) {
      for (const { panels: C, element: S } of V().reverse()) {
        const z = S.getBoundingClientRect();
        if (c < z.left || c > z.right || d < z.top || d > z.bottom) continue;
        const ae = C.find((H) => H !== m), Z = S.querySelector(".dc-pane__tabs"), I = Z?.getBoundingClientRect();
        if (Z && I && d >= I.top && d <= I.bottom)
          return ae ? { panel: ae, edge: "center", index: Ae(Z, c) } : null;
        const B = S.querySelector(":scope > .dc-pane__space");
        if (B) {
          const H = B.getBoundingClientRect();
          if (c >= H.left && c <= H.right && d >= H.top && d <= H.bottom) continue;
        }
        return ae ? { panel: ae, edge: Me(z, c, d) } : null;
      }
      return te(c, d, m) ?? Ce(c, d);
    }
    function G() {
      const c = O.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function te(c, d, m) {
      const C = f.value;
      if (!C) return null;
      for (const S of G()) {
        const z = S.getBoundingClientRect();
        if (c < z.left || c > z.right || d < z.top || d > z.bottom) continue;
        const ae = je(S), Z = ae.flatMap((se) => se.panels).find((se) => se !== m);
        if (!Z && ae.length > 0) return null;
        const I = ge(C, m)?.rect, B = pn(
          {
            x: c - z.left - 24,
            y: d - z.top - 12,
            w: I?.w ?? rt.w,
            h: I?.h ?? rt.h
          },
          { w: S.clientWidth, h: S.clientHeight },
          s.minPanelSize
        );
        if (Z) return { panel: Z, edge: "float", rect: B };
        const H = ne(S);
        return H ? { panel: "", space: H, edge: "float", rect: B } : null;
      }
      return null;
    }
    function ne(c) {
      const d = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return d == null ? null : d === "" ? [] : d.split("/").map(Number);
    }
    function me() {
      const c = O.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((d) => d.closest(".dc-window") === c).filter((d) => !d.querySelector(".dc-pane")).reverse().flatMap((d) => {
        const m = ne(d);
        return m ? [{ element: d, path: m }] : [];
      }) : [];
    }
    function Ce(c, d) {
      for (const { element: m, path: C } of me()) {
        if (m.dataset.dcSpace === "desktop") continue;
        const S = m.getBoundingClientRect();
        if (!(c < S.left || c > S.right || d < S.top || d > S.bottom))
          return { panel: "", space: C, edge: "center" };
      }
      return null;
    }
    function je(c) {
      return R().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let Ge = null;
    const Xe = (c) => c.altKey;
    function Ye(c, d) {
      if (!ve(c) || g.value || k.value || d.button !== 0) return;
      const m = d.clientX, C = d.clientY;
      let S = !1, z = Xe(d);
      const ae = () => {
        const le = M.value;
        le && (v.value = z ? te(le.x, le.y, c) : D(le.x, le.y, c));
      }, Z = (le) => {
        if (!S) {
          if (Math.hypot(le.clientX - m, le.clientY - C) < 4) return;
          S = !0, g.value = c, $.value = null;
        }
        z = Xe(le), w.value = !z, M.value = { x: le.clientX, y: le.clientY }, ae();
      }, I = (le) => {
        Xe(le) !== z && (z = !z, w.value = !z, S && ae());
      }, B = (le) => {
        Ge?.();
        const U = v.value, be = f.value;
        if (le && S && U && be) {
          const Qe = U.space ? Ms(be, c, U.space, U.rect) : U.edge === "float" && U.rect ? xs(be, c, U.panel, U.rect) : qt(be, c, U.panel, U.edge, U.index);
          Q(Qe, {
            panel: c,
            target: U.panel,
            edge: U.edge,
            ...U.space === void 0 ? {} : { space: U.space },
            ...U.index === void 0 ? {} : { index: U.index },
            ...U.rect === void 0 ? {} : { rect: U.rect }
          });
        }
        g.value = null, v.value = null, M.value = null, w.value = !0;
      }, H = () => B(!0), se = () => B(!1), fe = (le) => {
        if (le.key === "Escape") {
          B(!1);
          return;
        }
        I(le);
      };
      Ge = () => {
        window.removeEventListener("pointermove", Z), window.removeEventListener("pointerup", H), window.removeEventListener("pointercancel", se), window.removeEventListener("keydown", fe), window.removeEventListener("keyup", I), Ge = null;
      }, window.addEventListener("pointermove", Z), window.addEventListener("pointerup", H), window.addEventListener("pointercancel", se), window.addEventListener("keydown", fe), window.addEventListener("keyup", I);
    }
    et(() => Ge?.());
    let Ne = null;
    function Ie(c) {
      const d = O.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((S) => S.closest(".dc-window") === d)?.parentElement ?? null : null;
    }
    function Oe(c) {
      const d = f.value;
      return d ? Cn(d, c) : null;
    }
    function kt(c) {
      const d = f.value;
      if (!d) return;
      const m = St(d, c);
      m !== d && (l.value = m);
    }
    function Ot(c) {
      const d = Oe(c);
      d && kt(d);
    }
    function L(c) {
      const d = f.value, m = d ? ge(d, c) : null;
      return m !== null && Ze(m);
    }
    function K(c) {
      const d = f.value, m = d ? ge(d, c) : null;
      return m !== null && at(m);
    }
    function X(c) {
      const d = f.value, m = d ? st(d, c) : null;
      return m ? ke(m.node) : "";
    }
    function $e(c) {
      const d = f.value, m = d ? st(d, c) : null;
      if (!d || !m) return;
      const C = ke(m.node);
      if (r.value.get(C)?.fixed === !0) return;
      const S = !at(m);
      let z = hc(d, c, S);
      z !== d && (S || (z = St(z, c)), l.value = z, a("frame-minimize", { panel: C, minimized: S }));
    }
    function we(c) {
      const d = Oe(c);
      d && $e(d);
    }
    function $t(c) {
      const d = f.value, m = d ? st(d, c) : null;
      if (!d || !m) return;
      const C = ke(m.node);
      if (r.value.get(C)?.fixed === !0) return;
      const S = !Ze(m);
      let z = mc(d, c, S);
      z !== d && (S && (z = St(z, c)), l.value = z, a("frame-maximize", { panel: C, maximized: S }));
    }
    function ss(c) {
      const d = Oe(c);
      d && $t(d);
    }
    function as(c, d, m) {
      const C = f.value, S = C ? st(C, c) : null;
      if (!C || !S || d.button !== 0 || g.value || k.value) return;
      const z = ke(S.node);
      if (r.value.get(z)?.fixed === !0 || Ze(S) || at(S) || (m === "move" ? !s.movable : !s.resizable)) return;
      const ae = Ie(c), Z = _c(C, c);
      kt(c);
      const I = { w: ae?.clientWidth ?? 0, h: ae?.clientHeight ?? 0 }, B = { ...S.rect }, H = d.clientX, se = d.clientY, fe = s.minPanelSize;
      k.value = z;
      const le = (Ee) => {
        const Ve = f.value;
        if (!Ve) return;
        const xt = $s(Ve, Z, pn(Ee, I, fe));
        xt !== Ve && (l.value = xt);
      }, U = (Ee) => {
        Ee.preventDefault();
        const Ve = Ee.clientX - H, xt = Ee.clientY - se;
        le(
          m === "move" ? { ...B, x: B.x + Ve, y: B.y + xt } : ks(B, m, Ve, xt, fe)
        );
      }, be = (Ee) => {
        if (Ne?.(), k.value = null, !Ee) {
          le(B);
          return;
        }
        const Ve = f.value ? st(f.value, Z) : null;
        Ve && a("frame-change", { panel: X(Z), rect: Ve.rect });
      }, Qe = () => be(!0), tt = () => be(!1), nt = (Ee) => {
        Ee.key === "Escape" && be(!1);
      };
      Ne = () => {
        window.removeEventListener("pointermove", U), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", tt), window.removeEventListener("keydown", nt), Ne = null;
      }, window.addEventListener("pointermove", U), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", tt), window.addEventListener("keydown", nt);
    }
    function Aa(c, d, m) {
      const C = Oe(c);
      C && as(C, d, m);
    }
    function za(c, d, m = !1) {
      const C = f.value, S = Oe(c), z = C && S ? st(C, S) : null;
      if (!C || !S || !z || r.value.get(c)?.fixed === !0 || (m ? !s.resizable : !s.movable)) return;
      if (Ze(z) || at(z)) {
        T.value = `${Fe(c)} is ${Ze(z) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ae = d === "left" ? -Bt : d === "right" ? Bt : 0, Z = d === "up" ? -Bt : d === "down" ? Bt : 0, I = Ie(S), B = { w: I?.clientWidth ?? 0, h: I?.clientHeight ?? 0 }, H = m ? ks(z.rect, "se", ae, Z, s.minPanelSize) : { ...z.rect, x: z.rect.x + ae, y: z.rect.y + Z }, se = $s(C, S, pn(H, B, s.minPanelSize));
      if (se === C) {
        T.value = m ? `${Fe(c)} cannot be resized further.` : `${Fe(c)} cannot move ${d}.`;
        return;
      }
      l.value = se;
      const fe = st(se, S);
      fe && (a("frame-change", { panel: c, rect: fe.rect }), T.value = m ? `${Fe(c)} resized to ${fe.rect.w} by ${fe.rect.h}.` : `${Fe(c)} moved to ${fe.rect.x}, ${fe.rect.y}.`);
    }
    et(() => Ne?.());
    function Ra(c, d) {
      const m = x(c), C = m?.element.getBoundingClientRect();
      if (!m || !C) return null;
      const S = d === "left" || d === "right", z = (I) => {
        if (!(S ? I.bottom > C.top + 1 && I.top < C.bottom - 1 : I.right > C.left + 1 && I.left < C.right - 1)) return null;
        const H = d === "left" ? C.left - I.right : d === "right" ? I.left - C.right : d === "up" ? C.top - I.bottom : I.top - C.bottom;
        return H < -1 ? null : H;
      }, ae = [];
      for (const I of R()) {
        if (I === m || I.element === m.element) continue;
        const B = z(I.element.getBoundingClientRect());
        if (B === null) continue;
        const H = I.panels.find((se) => se !== c);
        H && ae.push({ to: { panel: H }, distance: B });
      }
      for (const { element: I, path: B } of me()) {
        const H = z(I.getBoundingClientRect());
        H !== null && ae.push({ to: { space: B }, distance: H });
      }
      return ae.reduce(
        (I, B) => I && I.distance <= B.distance ? I : B,
        null
      )?.to ?? null;
    }
    function Ta(c) {
      const d = f.value ? ge(f.value, c) !== null : !1;
      if (!d && !ve(c)) return;
      $.value = $.value === c ? null : c;
      const m = Fe(c);
      if (!$.value) {
        T.value = `${m}: move mode off.`;
        return;
      }
      T.value = d ? `${m}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${m}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Fe = (c) => r.value.get(c)?.title ?? c, Fa = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function La(c, d, m = !1) {
      if (!ve(c)) return;
      const C = f.value;
      if (!C) return;
      const S = Fe(c), z = pt(C, c);
      if (!m && z && (d === "left" || d === "right") && z.panels.length > 1) {
        const se = z.panels.indexOf(c), fe = d === "left" ? se - 1 : se + 1;
        if (fe >= 0 && fe < z.panels.length) {
          Q(Pt(C, c, fe), { panel: c, target: c, edge: "center", index: fe }), T.value = `${S} moved ${d}, now tab ${fe + 1} of ${z.panels.length}.`, ln(c);
          return;
        }
      }
      const Z = Ra(c, d);
      if (!Z || Z.panel !== void 0 && !ve(Z.panel)) {
        T.value = `${S} cannot move ${d}.`;
        return;
      }
      const I = Fa[d];
      if (Z.space) {
        const se = Z.space, fe = Je(C, se), le = ge(C, c)?.rect, U = { ...rt, ...le ? { w: le.w, h: le.h } : {} };
        Q(Ms(C, c, se, U), { panel: c, target: "", space: se, edge: I }), T.value = `${S} moved ${d}, into ${fe ? yt(fe) : "the space"}.`, ln(c);
        return;
      }
      const B = Z.panel, H = z?.panels.length === 1 && pt(C, B)?.panels.length === 1;
      m ? (Q(qt(C, c, B, "center"), {
        panel: c,
        target: B,
        edge: "center"
      }), T.value = `${S} joined ${Fe(B)} as a tab.`) : H ? (Q(Ut(C, c, B), { panel: c, target: B, edge: I }), T.value = `${S} moved ${d}, trading places with ${Fe(B)}.`) : (Q(qt(C, c, B, I), { panel: c, target: B, edge: I }), T.value = `${S} moved ${d}, beside ${Fe(B)}.`), ln(c);
    }
    function ln(c) {
      zt(() => {
        x(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Da(c, d) {
      const m = f.value;
      m && (l.value = jt(m, c, d));
    }
    function rn(c) {
      const d = f.value;
      if (!d) return;
      const m = mt(d, c);
      m !== d && (l.value = m, a("tab-select", { panel: c }));
    }
    function ls(c) {
      return r.value.get(c)?.closable ?? s.closable;
    }
    function Na(c) {
      ls(c) && a("panel-close", c);
    }
    const on = W(/* @__PURE__ */ new Map());
    let Ia = 0;
    function Oa(c, d) {
      const m = Ia += 1;
      return on.value.set(m, { panel: c, items: d }), () => {
        on.value.delete(m);
      };
    }
    function Va(c) {
      const d = [];
      for (const m of on.value.values())
        m.panel() === c && d.push(...m.items());
      return d;
    }
    function rs(c) {
      const d = c.filter((m) => m.items.length > 0);
      return d.length < 2 ? d.flatMap((m) => m.items) : d.flatMap((m) => [
        { id: m.id, heading: !0, label: m.title },
        ...m.items
      ]);
    }
    const os = (c) => c.title || "These tabs";
    function Ka(c, d) {
      const m = d.id, C = pt(c, m), S = (C?.panels.length ?? 0) > 1, z = C?.fixedView === !0, ae = (H) => ({
        action: () => {
          H !== c && (l.value = H);
        }
      }), Z = [], I = [], B = d.views ?? [];
      if (B.length > 1 && !z) {
        const H = P(m);
        Z.push({
          id: "view",
          label: "View",
          items: B.map((se) => ({
            id: `view-${se.key}`,
            label: se.label,
            checked: se.key === H,
            action: () => J(m, se.key)
          }))
        });
      }
      return S && !z && I.push(
        { id: "show-row", label: "Row", checked: !1, ...ae(Cs(c, m, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ae(Cs(c, m, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ae(bc(c, m))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ae(kc(c, m))
        }
      ), S && C && (I.length && I.push({ separator: !0 }), I.push(...is(C, m))), { panel: Z, tabs: I, tabsTitle: C ? os(C) : "" };
    }
    function is(c, d) {
      const m = ut(c), C = (S) => {
        const z = c.panels[(m + S + c.panels.length) % c.panels.length];
        return (z === void 0 ? "" : ke(z)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => rn(C(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => rn(C(-1)) }
      ];
    }
    function Vt(c) {
      return c.title ? c.title : q(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : yt(c);
    }
    function cs(c) {
      if (!c || j(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Te(c)) return null;
      const d = Sa(c);
      return d && d.fixedView !== !0 ? d : null;
    }
    function qa(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const m = Je(d, c);
      if (!m || q(m)) return [];
      if (m.fixedView) return [];
      const C = j(m) ? "desktop" : m.direction, S = (U, be, Qe) => ({
        id: `show-${U}`,
        label: be,
        checked: C === U,
        action: () => {
          const tt = f.value, nt = Qe();
          !tt || nt === m || (l.value = nn(_e(it(tt, c, nt))));
        }
      }), z = () => {
        const U = xa(m, Ba(m));
        if (q(U) && U.panels.length === 0) return m;
        const be = q(U) && U.panels.length === 1 ? U.panels[0] : void 0;
        return be !== void 0 && ie(be) ? m : U;
      }, ae = (U) => () => j(m) ? Ea(m, U) : m.direction === U ? m : { ...m, direction: U }, Z = c.slice(0, -1), I = c.length > 0 ? Je(d, Z) : null, B = I && q(I) && I.panels.length > 1 ? I : null, H = I && cs(I) === m ? I : null, se = cs(m), fe = m.title || "this space", le = (U, be, Qe, tt, nt) => ({
        id: U,
        label: nt,
        action: () => {
          const Ee = f.value;
          Ee && (l.value = nn(_e(it(Ee, be, Mc(Qe, tt)))));
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
          title: m.title || "This space",
          items: [
            S("row", "Row", ae("row")),
            S("column", "Column", ae("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            S("tabs", "Tabs", () => z()),
            S("desktop", "Desktop", () => j(m) ? m : Ca(m))
          ]
        },
        {
          id: "about-around",
          title: se ? `Around ${Vt(se)}` : "",
          items: se ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...se.title ? [] : [le("merge-around-keep-this", c, m, "outer", `Keep ${fe}`)],
            ...m.title ? [] : [le("merge-around-keep-that", c, m, "inner", `Keep ${Vt(se)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: H ? `Inside ${Vt(H)}` : "",
          items: H ? [
            ...m.title ? [] : [le("merge-inside-keep-that", Z, H, "outer", `Keep ${Vt(H)}`)],
            ...H.title ? [] : [le("merge-inside-keep-this", Z, H, "inner", `Keep ${fe}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: B ? os(B) : "",
          items: B ? is(B, ke(m)) : []
        }
      ]);
    }
    function Ba(c) {
      const d = b.value;
      return d && ee(c, d) ? d : void 0;
    }
    function Wa(c) {
      const d = f.value, m = r.value.get(c);
      if (!d || !m) return [];
      const C = s.menu ? Ka(d, m) : null, S = Va(c);
      S.length && C?.panel.length && S.push({ separator: !0 }), C && S.push(...C.panel);
      const z = rs([
        { id: "about-panel", title: m.title, items: S },
        { id: "about-tabs", title: C?.tabsTitle ?? "", items: C?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(m, z) : z;
    }
    function Ha(c, d) {
      return o[`${c}-${d}`] ?? o[c];
    }
    function us(c, d, m, C) {
      return Ha(c, d.id)?.({ panel: d, view: m, active: C });
    }
    Sc({
      panelFor: (c) => r.value.get(c) ?? null,
      viewFor: P,
      setView: J,
      movable: _(() => s.movable),
      resizable: _(() => s.resizable),
      minPanelSize: _(() => s.minPanelSize),
      spaceNames: _(() => s.spaceNames),
      focused: b,
      dragging: g,
      dropTarget: v,
      moving: $,
      framing: k,
      canMove: ve,
      focus(c) {
        b.value !== c && (b.value = c, a("panel-activate", c));
      },
      selectPanel: rn,
      beginDrag: Ye,
      toggleMoveMode: Ta,
      nudge: La,
      setSizes: Da,
      frameOf: (c) => f.value ? ge(f.value, c) : null,
      beginFrameDrag: Aa,
      nudgeFrame: za,
      raise: Ot,
      maximized: L,
      toggleMaximize: ss,
      minimized: K,
      toggleMinimize: we,
      beginFrameDragAt: as,
      raiseAt: kt,
      toggleMaximizeAt: $t,
      toggleMinimizeAt: $e,
      menuFor: Wa,
      spaceMenu: qa,
      registerMenu: Oa,
      closable: ls,
      close: Na,
      renderContent: (c, d, m) => us("panel", c, d, m),
      renderActions: (c, d, m) => us("actions", c, d, m),
      layout: f
    });
    const Ua = _(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), ja = () => {
      const c = g.value, d = M.value;
      return !c || !d ? null : Ya(
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
      move(c, d, m, C) {
        const S = f.value;
        S && Q(qt(S, c, d, m, C), {
          panel: c,
          target: d,
          edge: m,
          ...C === void 0 ? {} : { index: C }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const d = f.value;
        d && (l.value = mt(d, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, d, m) {
        const C = f.value;
        C && Q(xs(C, c, d, m), {
          panel: c,
          target: d,
          edge: "float",
          rect: m
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, d) {
        const m = f.value;
        if (!m) return;
        const C = fc(m, c, d);
        if (C === m) return;
        l.value = C;
        const S = ge(C, c);
        S && a("frame-change", { panel: c, rect: S.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: J,
      /** Brings a floating frame to the front of its stack. */
      raise: Ot,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ss,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: we
    }), (c, d) => (p(), h("div", {
      ref_key: "root",
      ref: O,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": g.value ? "true" : "false",
      "data-dc-docking": w.value ? "true" : "false",
      style: Pe(Ua.value)
    }, [
      f.value ? (p(), oe(bu, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (p(), h("p", $u, " This window has no panels. ")),
      pe(ja),
      y("p", xu, A(T.value), 1)
    ], 12, ku));
  }
}), Cu = /* @__PURE__ */ de(Mu, [["__scopeId", "data-v-711565af"]]);
function Uu(e = "", t = "/") {
  const n = W(We(e)), s = W(t), a = [`${s.value}${n.value}`];
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
function Ps(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function ju(e) {
  const t = W(Ps(e.currentRoute.value.fullPath)), n = _(() => e.currentRoute.value.path), s = xe(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Ps(a);
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
const Eu = {
  DataShell: Ui,
  ShellHeader: ta,
  QueryPanel: sa,
  ResultsArea: da,
  FacetControl: na,
  SegmentedControl: bn,
  StatusPill: Rt,
  ScoreMeter: Bn,
  WindowFrame: Cu,
  WindowPane: Pa,
  ListView: kn,
  CardsView: la,
  GridView: ra,
  TableView: ca,
  LinksView: oa,
  PreviewView: ia,
  TypeCardsView: ua
}, Gu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Eu))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ns, t.route);
  }
};
export {
  tn as CASCADE_STEP,
  Ru as COLUMN_BREAKPOINTS,
  zu as COLUMN_ROLES,
  la as CardsView,
  ws as ColumnCell,
  rt as DEFAULT_FRAME,
  gn as DEFAULT_SORT,
  tl as DEFAULT_VIEW,
  Ui as DataShell,
  Qu as EMPTY_CELL,
  Qs as ENTITY_ALL,
  wn as ENTITY_TERM,
  en as EXPRESSION_TERM,
  Kn as FACET_PREFIX,
  na as FacetControl,
  Zu as GENERIC_NAMES,
  ra as GridView,
  Gu as HeaderContentLayoutPlugin,
  oa as LinksView,
  kn as ListView,
  dt as MINIMIZED_GAP,
  va as MINIMIZED_HEIGHT,
  $n as MINIMIZED_WIDTH,
  pa as MIN_FRAME,
  _s as MOCK_TINTS,
  Fu as MenuBar,
  Wn as MenuButton,
  fa as MenuList,
  Tt as MetricDrill,
  ns as PANE_CONTEXT_KEY,
  In as PARAM_DIR,
  Ln as PARAM_ENTITY,
  On as PARAM_EXPR,
  Vn as PARAM_PAGE,
  Nn as PARAM_SORT,
  Dn as PARAM_VIEW,
  qn as PinStar,
  ia as PreviewView,
  sa as QueryPanel,
  Kt as RECORD_STATUSES,
  Us as RESULT_FIELDS,
  Ns as ROUTE_ADAPTER_KEY,
  da as ResultsArea,
  Ys as SHELL_CONTEXT_KEY,
  Au as SHELL_THEMES,
  Ft as ScopeMark,
  Bn as ScoreMeter,
  bn as SegmentedControl,
  ta as ShellHeader,
  Rt as StatusPill,
  ca as TableView,
  ua as TypeCardsView,
  Is as VIEW_KINDS,
  es as WINDOW_CONTEXT_KEY,
  Cu as WindowFrame,
  Pa as WindowPane,
  ha as activePanel,
  ut as activeTab,
  Ml as addTerm,
  uc as axisOf,
  jn as cascade,
  Ds as cellFull,
  An as cellText,
  cn as cellTextOf,
  Le as cellValue,
  ms as changesResults,
  pn as clampRect,
  xa as collapseSpace,
  bc as collapseToTabs,
  Du as column,
  fs as columnAlign,
  ps as columnClass,
  vs as columnKey,
  _n as columnTruncates,
  Ja as columnsFor,
  sl as countPages,
  el as createHistoryAdapter,
  Uu as createMemoryAdapter,
  kl as createMockDataSource,
  ju as createVueRouterAdapter,
  Ju as defaultCellText,
  ed as defaultColumns,
  Ss as defaultLayout,
  Tn as defaultQuery,
  Cl as drillExpression,
  Ms as dropIntoSpace,
  Jt as emptyFacetState,
  zn as emptyFacetValue,
  ft as findEntity,
  lt as findSort,
  Iu as fixedView,
  Un as float,
  xs as floatPanel,
  Ca as floatSplit,
  kc as floatTabs,
  Wt as fnv1a,
  Vs as focusEntity,
  td as formatDate,
  dl as formatExpression,
  nd as formatMetric,
  Qa as formatOrdinal,
  Ls as formatPercent,
  Gs as formatTerm,
  sn as frame,
  st as frameAt,
  ge as frameOf,
  Cn as framePathOf,
  ke as frontPanel,
  yl as generateRows,
  Lu as group,
  pt as groupOf,
  dc as groups,
  Ws as hasActiveFacets,
  ee as hasPanel,
  Nu as headless,
  Ct as insertPanel,
  Et as isChoosable,
  Tu as isEntityScoped,
  Bs as isFacetActive,
  j as isFloat,
  q as isGroup,
  Ze as isMaximized,
  at as isMinimized,
  ie as isPanelTab,
  Rn as isPristineQuery,
  bt as isSplit,
  Se as isTabOf,
  Hs as isTypeCardsQuery,
  Os as isViewKind,
  ul as matchesExpression,
  wl as matchesFacets,
  pc as maximizeFrame,
  mc as maximizeFrameAt,
  Mc as mergeSpace,
  vc as minimizeFrame,
  hc as minimizeFrameAt,
  qt as movePanel,
  Pt as moveTab,
  Je as nodeAt,
  At as nodeTitle,
  _e as normalizeLayout,
  We as normalizeSearch,
  Zn as normalizeSizes,
  Sa as onlySpace,
  Ue as panelIds,
  De as panelNode,
  bs as panelTabs,
  Fn as parseExpression,
  Tl as parseQuery,
  Hr as presentParts,
  aa as presentRow,
  Uc as providePaneContext,
  El as provideShellContext,
  Sc as provideWindowContext,
  vn as raiseFrame,
  St as raiseFrameAt,
  _c as raisedPath,
  js as reconcileFacets,
  Ec as reconcileLayout,
  ot as removePanel,
  it as replaceAt,
  ks as resizeRect,
  Es as resizeSplit,
  ze as roleColumn,
  Fs as roleColumns,
  nn as rootSpace,
  Xn as row,
  Za as rowKey,
  $l as scopeTerm,
  xl as scopeTermFor,
  ys as serializeQuery,
  mt as setActivePanel,
  fc as setFrameRect,
  $s as setFrameRectAt,
  jt as setSizesAt,
  Ku as setSplitDirection,
  He as sizesOf,
  qs as sortsFor,
  he as spaceChrome,
  yt as spaceTitle,
  Gn as split,
  Cs as spreadTabs,
  Ll as summarizeQuery,
  ea as summaryTerms,
  Ut as swapPanels,
  Hn as tabNode,
  Dt as tabPanels,
  Ea as tileFloat,
  qu as toFloat,
  Bu as toTiled,
  Ou as toggleMaximized,
  Vu as toggleMinimized,
  ni as useColumns,
  mi as useEntityPreviews,
  Wu as usePaneContext,
  Hu as usePaneMenu,
  wt as usePresentedRows,
  Dl as useQueryState,
  Nl as useResults,
  ye as useShellContext,
  ts as useWindowContext,
  fl as withoutTerm
};
