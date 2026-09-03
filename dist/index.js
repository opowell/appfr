import { ref as W, inject as _t, provide as En, computed as g, toValue as Mt, shallowRef as Xt, watch as xe, onScopeDispose as Es, defineComponent as ce, openBlock as p, createElementBlock as _, createElementVNode as w, toDisplayString as A, createCommentVNode as O, unref as E, renderSlot as Be, Fragment as J, renderList as de, withDirectives as vn, withKeys as jt, withModifiers as qe, vModelText as mn, normalizeClass as Yt, useSlots as Sn, nextTick as zt, createBlock as oe, createVNode as pe, createTextVNode as Re, withCtx as gt, normalizeStyle as Pe, resolveDynamicComponent as Ss, useModel as Qt, onBeforeUnmount as et, useId as Ps, createSlots as cs, mergeModels as Zt, onMounted as Wa, resolveComponent as As, getCurrentScope as Ha, h as Ua } from "vue";
import { r as ze, c as Le, a as zs, f as Wt, b as on, e as Rs, g as Pn, h as Ga, i as Xa, j as ja, k as hn, l as Fs, m as us, n as ds, o as fs } from "./columns.js";
import { E as Bu, G as Wu, p as Hu, d as Uu, q as Gu, s as Xu } from "./columns.js";
const Ts = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Ya() {
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
const Ls = ["list", "cards", "grid", "table", "links", "preview"], ku = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Kt = ["ok", "running", "queued", "review", "failed"], $u = [
  "identity",
  "reference",
  "metric",
  "state",
  "score",
  "updated",
  "tint"
], xu = [480, 620, 760, 900, 1100], Qa = "cards", _n = "updated";
function Ds(e) {
  return typeof e == "string" && Ls.includes(e);
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Ns(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Is(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Os(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Is(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const Za = { key: _n, label: _n };
function lt(e, t, n = null) {
  const s = Os(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === _n) ?? s[0] ?? Za;
}
function An(e) {
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
  for (const n of e?.facets ?? []) t[n.key] = An(n);
  return t;
}
function Vs(e) {
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
function Ks(e) {
  return Object.values(e).some(Vs);
}
function zn(e) {
  return e.entity === null && e.expr.trim() === "" && !Ks(e.facets);
}
function Mu(e) {
  return e.entity !== null;
}
function qs(e) {
  return e.entity === null && e.view === "cards";
}
function Ja(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Rn(e, t = {}) {
  const s = t.landing === "entity" ? Ns(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Ds(t.view) ? t.view : Qa,
    sort: lt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Jt(s),
    page: 1
  };
}
const Bs = ["entity", "sort", "dir", "expr", "facets"];
function ps(e) {
  return Bs.some((t) => t in e);
}
function Ws(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : An(s);
  }
  return n;
}
const el = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function tl(e) {
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
function nl(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of tl(t)) {
    const l = a.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const i = el.exec(a);
    i && i[3] !== "" ? s.push({
      kind: "field",
      field: i[1].toLowerCase(),
      comparator: i[2],
      value: i[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const cn = (e) => e.toLowerCase().replace(/\s+/g, ""), sl = [
  ["status", "state"],
  ["state", "state"],
  ["score", "score"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function al(e, t, n) {
  const s = cn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && cn(u.label) === s
  );
  if (l) return Le(l, t);
  const i = n.facets.find((u) => cn(u.label) === s);
  if (i && i.key in t.fields) return t.fields[i.key];
  const o = sl.find(([u]) => u === s)?.[1];
  if (o) {
    const u = ze(a, o);
    if (u) return Le(u, t);
  }
  const r = /^metric(\d+)$/.exec(s);
  if (r) {
    const u = zs(a, "metric")[Number(r[1]) - 1];
    if (u) return Le(u, t);
  }
}
function un(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function ll(e, t, n) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const r = ze(i, o), u = r ? Le(r, t) : void 0;
      return typeof u == "string" && un(u, e.value);
    });
  }
  const s = al(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((o) => un(String(o), e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const i = e.value.toLowerCase();
      return i === "true" || i === "yes" ? s : i === "false" || i === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const i = Number(e.value);
      return Number.isFinite(i) ? s === i : !0;
    }
    return un(String(s), e.value);
  }
  const a = Number(e.value), l = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(l) ? !0 : rl(e.comparator, l, a);
}
function rl(e, t, n) {
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
function ol(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => ll(a, t, n))) : !0;
}
const vs = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Hs(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const il = 7, cl = 3;
function ul(e, t, n, s) {
  const a = (t * il + Wt(n)) % s, l = [];
  for (let i = 0; i < Math.min(cl, s); i++)
    l.push(Hs(e, (a + i) % s));
  return l;
}
function dl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? fl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function fl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) a.add((s + l) % e.length);
  return [...a].sort((l, i) => l - i).map((l) => e[l]);
}
function pl(e, t) {
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
      return vs[n % vs.length];
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
function vl(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, i = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let r = 0; r < n; r++) {
    const u = l[r % l.length], f = Math.floor(r / l.length), y = Wt(`${s}:${e.key}:${u[0]}:${r}`), h = Hs(e.key, r), m = new Date(a.getTime() - y % 900 * 36e5).toISOString(), k = {};
    for (const x of e.columns ?? []) {
      const b = x.field ?? x.key;
      if (!b || x.value) continue;
      const M = pl(x, {
        hash: Wt(`${y}:${b}`),
        sample: u,
        revision: f,
        updatedAt: m
      });
      M !== void 0 && (k[b] = M);
    }
    for (const x of e.facets)
      k[x.key] = dl(x, Wt(`${y}:${x.key}`));
    for (const [x, b] of i)
      k[x] = b === e.key ? h : ul(b, r, x, n);
    o.push({ id: h, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return o;
}
function ml(e, t) {
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
function hl(e, t) {
  const n = e.find((i) => i.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || s === "score" || n.role === "metric" || n.role === "score", l = s === "date" || n.role === "updated";
  return (i, o) => {
    const r = Le(n, i), u = Le(n, o);
    return a ? Number(u ?? 0) - Number(r ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(r ?? "")) : String(u ?? "").localeCompare(String(r ?? ""));
  };
}
function _l(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const i = e.scopes ?? a.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), o = vl(s, { ...e, scopes: i });
    return t.set(s.key, o), o;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: i, offset: o }) {
      const r = nl(s.expr), u = l ? [l] : a.entities, f = [], y = [];
      for (const k of u)
        for (const x of n(k, a))
          f.push(x), (l ? ml(x, s.facets) : !0) && ol(r, x, k) && y.push(x);
      const h = lt(l, s.sort, a), m = y.sort(hl(Is(l, a), h.key));
      return s.dir === "asc" && m.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: m.slice(o, o + i),
        total: y.length,
        unfiltered: y.length === f.length
      };
    }
  };
}
function gl(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.id.replace(/"/g, "")}"` : null;
}
function yl(e, t) {
  return gl(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function wl(e, t) {
  if (!t) return e;
  const n = e.trim();
  return n ? n.split(/\s+/).includes(t) ? n : `${n} ${t}` : t;
}
function bl(e, t, n) {
  return wl(t.expr, yl(e, n));
}
const Us = Symbol("dc.shellContext");
function kl(e) {
  return En(Us, e), e;
}
function ye() {
  const e = _t(Us, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Fn = "e", Tn = "v", Ln = "s", Dn = "d", Nn = "q", In = "p", On = "f_", Gs = "*", $l = [
  Fn,
  Tn,
  Ln,
  Dn,
  Nn,
  In
], gn = "..", Xs = ",", xl = [
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
function dn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of xl) t = t.replace(n, s);
  return t;
}
function Ke(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function js(e) {
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
function Ml(e) {
  return $l.includes(e) || e.startsWith(On);
}
function ms(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Cl(e, t) {
  const n = Ke(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(Xs).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => s.has(l)) };
    }
    case "range": {
      const s = n.indexOf(gn), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + gn.length)).trim(), i = a === "" ? null : Number(a), o = l === "" ? null : Number(l);
      let r = i !== null && Number.isFinite(i) ? ms(i, e.min, e.max) : null, u = o !== null && Number.isFinite(o) ? ms(o, e.min, e.max) : null;
      return r !== null && u !== null && r > u && ([r, u] = [u, r]), { kind: "range", min: r, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function El(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(Xs) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${gn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Sl(e, t, n = {}) {
  const s = Rn(t, n), a = new Map(js(e)), l = a.get(Fn), i = l === void 0 ? s.entity : Ke(l), o = i === Gs ? null : ft(t, i), r = a.get(Tn), u = r && Ds(Ke(r)) ? Ke(r) : s.view, f = a.get(Ln), y = lt(o, f ? Ke(f) : n.sort, t), h = a.get(Dn), m = h ? Ke(h) === "asc" ? "asc" : "desc" : s.dir, k = a.get(Nn), x = a.get(In), b = x === void 0 ? 1 : Number(Ke(x)), M = Number.isFinite(b) ? Math.max(1, Math.floor(b)) : 1, F = {};
  for (const I of o?.facets ?? []) {
    const R = a.get(`${On}${I.key}`);
    F[I.key] = R === void 0 ? An(I) : Cl(I, R);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: y.key,
    dir: m,
    expr: k === void 0 ? "" : Ke(k),
    facets: Ws(o, F),
    page: M
  };
}
function hs(e, t, n = {}, s = "") {
  const a = Rn(t, n), l = ft(t, e.entity), i = js(s).filter(([y]) => !Ml(y)), o = [], r = (y, h) => o.push([y, dn(h)]), u = l?.key ?? null;
  u !== a.entity && r(Fn, u ?? Gs), e.view !== a.view && r(Tn, e.view), e.sort !== a.sort && r(Ln, e.sort), e.dir !== a.dir && r(Dn, e.dir), e.expr.trim() !== "" && r(Nn, e.expr);
  for (const y of l?.facets ?? []) {
    const h = e.facets[y.key];
    if (!h) continue;
    const m = El(h, y);
    m !== null && o.push([`${On}${y.key}`, dn(m)]);
  }
  e.page > 1 && r(In, String(e.page));
  const f = [
    ...i.map(([y, h]) => [dn(y), h]),
    ...o
  ];
  return f.length ? `?${f.map(([y, h]) => h === "" ? y : `${y}=${h}`).join("&")}` : "";
}
const yn = "entity";
function Pl(e, t) {
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
function Ys(e, t) {
  const n = [];
  t && n.push({
    id: yn,
    label: `entity:${t.key}`,
    facetKey: yn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Vs(a) && n.push(...Pl(s, a));
  }
  return n;
}
function Al(e, t, n = null) {
  if (zn(e)) {
    const l = lt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = Ys(e, t).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function zl(e) {
  const { adapter: t } = e, n = g(() => Mt(e.schema)), s = g(() => Mt(e.defaults) ?? {}), a = g(() => Sl(t.search.value, n.value, s.value)), l = g(() => ft(n.value, a.value.entity)), i = g(() => l.value ?? Ns(n.value, s.value)), o = g(() => Os(l.value, n.value)), r = g(() => lt(l.value, a.value.sort, n.value)), u = (b, M) => {
    const F = hs(b, n.value, s.value, t.search.value);
    F !== t.search.value && (M === "push" ? t.push(F) : t.replace(F));
  }, f = () => Mt(e.navigationMode) ?? "push", y = () => Mt(e.facetNavigationMode) ?? "replace", h = (b, M) => {
    const F = b.page ?? (ps(b) ? 1 : a.value.page);
    u({ ...a.value, ...b, page: F }, M);
  }, m = (b, M) => {
    const F = a.value.facets[b];
    if (!F) return;
    const I = { ...a.value.facets, [b]: M(F) };
    h({ facets: I }, y());
  }, k = (b) => {
    const M = b === null ? null : ft(n.value, b);
    return (M?.key ?? null) === a.value.entity ? {} : {
      entity: M?.key ?? null,
      sort: lt(M, a.value.sort, n.value).key,
      facets: Jt(M)
    };
  }, x = (b) => {
    const M = k(b);
    Object.keys(M).length && h(M, f());
  };
  return {
    query: a,
    entity: l,
    focus: i,
    sort: r,
    sorts: o,
    summary: g(() => Al(a.value, l.value, n.value)),
    terms: g(() => Ys(a.value, l.value)),
    isPristine: g(() => zn(a.value)),
    isEverything: g(() => a.value.entity === null),
    hasFacets: g(() => Ks(a.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(b) {
      h({ view: b }, f());
    },
    setSort(b) {
      h({ sort: lt(l.value, b, n.value).key }, f());
    },
    toggleDirection() {
      h({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(b) {
      h({ expr: b }, f());
    },
    narrow(b, M) {
      h({ expr: b, ...k(M) }, f());
    },
    setPage(b, M) {
      h({ page: Math.max(1, Math.floor(b)) }, M ?? f());
    },
    setFacet(b, M) {
      m(b, () => M);
    },
    toggleChip(b, M) {
      m(b, (F) => F.kind !== "chips" ? F : { kind: "chips", selected: F.selected.includes(M) ? F.selected.filter((R) => R !== M) : [...F.selected, M] });
    },
    setRange(b, M, F) {
      m(b, (I) => I.kind === "range" ? { kind: "range", min: M, max: F } : I);
    },
    toggleFlag(b) {
      m(
        b,
        (M) => M.kind === "toggle" ? { kind: "toggle", on: !M.on } : M
      );
    },
    removeTerm(b) {
      if (b.facetKey === yn) {
        x(null);
        return;
      }
      m(b.facetKey, (M) => M.kind === "chips" && b.option ? { kind: "chips", selected: M.selected.filter((F) => F !== b.option) } : M.kind === "range" ? { kind: "range", min: null, max: null } : M.kind === "toggle" ? { kind: "toggle", on: !1 } : M);
    },
    clearFilters() {
      h({ entity: null, expr: "", facets: Jt(null) }, f());
    },
    reset() {
      u(Rn(n.value, s.value), f());
    },
    hrefFor(b) {
      const M = { ...a.value, ...b };
      return M.page = b.page ?? (ps(b) ? 1 : a.value.page), M.facets = Ws(ft(n.value, M.entity), M.facets), `${t.path.value}${hs(M, n.value, s.value, t.search.value)}`;
    }
  };
}
function Rl(e) {
  const t = Xt([]), n = W(0), s = W(!1), a = Xt(null);
  let l = 0, i = null;
  const o = g(() => (e.query.value.page - 1) * e.limit.value), r = g(() => Ja(n.value, e.limit.value)), u = (x) => {
    t.value = x.rows, n.value = x.total, a.value = null;
  }, f = (x) => {
    a.value = x, t.value = [], n.value = 0;
  }, y = (x, b) => {
    let M = !0;
    const F = () => x === l, I = () => {
      M && (M = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return F();
      },
      insert(R, T) {
        if (!F()) return;
        const V = Array.isArray(R) ? R : [R];
        if (!V.length) return;
        I();
        const $ = [...t.value];
        $.splice(T ?? $.length, 0, ...V), t.value = b > 0 ? $.slice(0, b) : $, n.value += V.length;
      },
      set(R) {
        F() && (R.rows && (I(), t.value = b > 0 ? R.rows.slice(0, b) : R.rows, n.value = R.rows.length), R.total !== void 0 && (n.value = R.total));
      },
      close() {
        F() && (s.value = !1);
      },
      fail(R) {
        F() && (f(R), s.value = !1);
      }
    };
  }, h = () => {
    const x = i;
    i = null, x?.();
  }, m = () => {
    const x = ++l;
    h();
    const b = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, M = e.source.value;
    if (M.stream) {
      s.value = !0;
      try {
        i = M.stream(b, y(x, b.limit)) ?? null;
      } catch (I) {
        f(I), s.value = !1;
      }
      return;
    }
    let F;
    try {
      F = M.query(b);
    } catch (I) {
      f(I);
      return;
    }
    if (!(F instanceof Promise)) {
      u(F), s.value = !1;
      return;
    }
    s.value = !0, F.then((I) => {
      x === l && u(I);
    }).catch((I) => {
      x === l && f(I);
    }).finally(() => {
      x === l && (s.value = !1);
    });
  }, k = g(
    () => `${JSON.stringify(Bs.map((x) => e.query.value[x]))}|${e.query.value.page}`
  );
  return xe([e.source, k, e.schema, e.entity, e.limit], m, {
    immediate: !0
  }), Es(() => {
    l++, h();
  }, !0), { rows: t, total: n, offset: o, pageCount: r, pending: s, error: a, refresh: m };
}
const Fl = ["data-dc-expanded"], Tl = ["aria-expanded", "aria-controls"], Ll = { class: "dc-header__domain" }, Dl = { class: "dc-header__crumb" }, Nl = { class: "dc-header__crumb-root" }, Il = {
  key: 0,
  class: "dc-header__count dc-mono"
}, Ol = { class: "dc-header__query" }, Vl = ["data-dc-active", "title"], Kl = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, ql = { class: "dc-header__sr" }, Bl = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Wl = ["disabled"], Hl = ["title"], Ul = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Gl = ["disabled"], Xl = {
  key: 1,
  class: "dc-header__actions"
}, jl = /* @__PURE__ */ ce({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ye(), l = g(() => a.schema.value), i = g(() => a.entity.value?.label ?? "Everything"), o = g(() => {
      if (n.hideCount) return "";
      const y = a.entity.value;
      return y && !a.hasFacets.value && !a.query.value.expr.trim() ? y.count : String(a.total.value);
    }), r = g(() => a.query.value.page), u = g(
      () => a.pageCount.value > 1 && !qs(a.query.value)
    ), f = g(() => {
      const y = `Page ${r.value} of ${a.pageCount.value}`, h = a.rows.value.length;
      if (!h) return y;
      const m = a.offset.value + 1;
      return `${y} — rows ${m} to ${m + h - 1} of ${a.total.value}`;
    });
    return (y, h) => (p(), _("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      w("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: h[0] || (h[0] = (m) => s("toggle"))
      }, [
        h[4] || (h[4] = w("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        w("span", Ll, A(l.value.label), 1),
        w("span", Dl, [
          w("span", Nl, A(i.value), 1),
          o.value ? (p(), _("span", Il, A(o.value), 1)) : O("", !0)
        ]),
        w("span", Ol, [
          h[3] || (h[3] = w("span", { class: "dc-header__query-label" }, "Query", -1)),
          w("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": E(a).isPristine.value ? "false" : "true",
            title: E(a).summary.value
          }, A(E(a).summary.value), 9, Vl)
        ]),
        w("span", Kl, A(e.expanded ? "▲" : "▼"), 1),
        w("span", ql, A(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, Tl),
      u.value ? (p(), _("nav", Bl, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: r.value <= 1,
          onClick: h[1] || (h[1] = (m) => E(a).setPage(r.value - 1))
        }, [...h[5] || (h[5] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Wl),
        w("span", {
          class: "dc-header__page dc-mono",
          title: f.value,
          "aria-hidden": "true"
        }, A(r.value) + " / " + A(E(a).pageCount.value), 9, Hl),
        w("span", Ul, A(f.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: r.value >= E(a).pageCount.value,
          onClick: h[2] || (h[2] = (m) => E(a).setPage(r.value + 1))
        }, [...h[6] || (h[6] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Gl)
      ])) : O("", !0),
      y.$slots.actions ? (p(), _("div", Xl, [
        Be(y.$slots, "actions", {}, void 0, !0)
      ])) : O("", !0)
    ], 8, Fl));
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, Qs = /* @__PURE__ */ ue(jl, [["__scopeId", "data-v-cdaaadf4"]]), Yl = { class: "dc-facet" }, Ql = { class: "dc-facet__head" }, Zl = ["id"], Jl = { class: "dc-facet__hint dc-mono" }, er = ["aria-labelledby"], tr = ["aria-pressed", "data-dc-active", "onClick"], nr = ["aria-labelledby"], sr = ["aria-label", "placeholder", "onKeydown"], ar = ["aria-label", "placeholder", "onKeydown"], lr = ["aria-checked"], rr = { class: "dc-switch__text" }, or = ["data-dc-active"], ir = /* @__PURE__ */ ce({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = g(() => {
      const { facet: h, value: m } = n;
      return h.kind === "chips" && m.kind === "chips" ? m.selected.length ? `${m.selected.length} of ${h.options.length}` : "any" : h.kind === "range" && m.kind === "range" ? m.min === null && m.max === null ? `${h.min}–${h.max}` : `${m.min ?? h.min}–${m.max ?? h.max}` : m.kind === "toggle" ? m.on ? "on" : "off" : "";
    }), l = g(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function i(h) {
      if (n.value.kind !== "chips") return;
      const m = l.value.has(h) ? n.value.selected.filter((k) => k !== h) : [...n.value.selected, h];
      s("update", { kind: "chips", selected: m });
    }
    const o = W(""), r = W("");
    xe(
      () => n.value,
      (h) => {
        h.kind === "range" && (o.value = h.min === null ? "" : h.min, r.value = h.max === null ? "" : h.max);
      },
      { immediate: !0, deep: !0 }
    );
    function u(h) {
      if (typeof h == "number") return Number.isFinite(h) ? h : null;
      const m = h.trim();
      if (!m) return null;
      const k = Number(m);
      return Number.isFinite(k) ? k : null;
    }
    function f() {
      if (n.value.kind !== "range") return;
      const h = u(o.value), m = u(r.value);
      h === n.value.min && m === n.value.max || s("update", { kind: "range", min: h, max: m });
    }
    function y() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (h, m) => (p(), _("div", Yl, [
      w("div", Ql, [
        w("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, A(e.facet.label), 9, Zl),
        w("span", Jl, A(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (p(), _("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (p(!0), _(J, null, de(e.facet.options, (k) => (p(), _("button", {
          key: k,
          type: "button",
          class: "dc-chip",
          "aria-pressed": l.value.has(k),
          "data-dc-active": l.value.has(k) ? "true" : "false",
          onClick: (x) => i(k)
        }, A(k), 9, tr))), 128))
      ], 8, er)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), _("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        vn(w("input", {
          "onUpdate:modelValue": m[0] || (m[0] = (k) => o.value = k),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: f,
          onBlur: f,
          onKeydown: jt(qe(f, ["prevent"]), ["enter"])
        }, null, 40, sr), [
          [mn, o.value]
        ]),
        m[2] || (m[2] = w("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        vn(w("input", {
          "onUpdate:modelValue": m[1] || (m[1] = (k) => r.value = k),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: f,
          onBlur: f,
          onKeydown: jt(qe(f, ["prevent"]), ["enter"])
        }, null, 40, ar), [
          [mn, r.value]
        ])
      ], 8, nr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), _("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: y
      }, [
        w("span", rr, A(e.facet.text), 1),
        w("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...m[3] || (m[3] = [
          w("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, or)
      ], 8, lr)) : O("", !0)
    ]));
  }
}), Zs = /* @__PURE__ */ ue(ir, [["__scopeId", "data-v-c2efbd0c"]]), cr = ["aria-label"], ur = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], dr = /* @__PURE__ */ ce({
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
    return (i, o) => (p(), _("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (p(!0), _(J, null, de(e.options, (r, u) => (p(), _("button", {
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
      }, A(r.label), 43, ur))), 128))
    ], 8, cr));
  }
}), wn = /* @__PURE__ */ ue(dr, [["__scopeId", "data-v-63fb5482"]]), fr = ["id"], pr = { class: "dc-panel__section" }, vr = { class: "dc-panel__query" }, mr = { class: "dc-panel__expression" }, hr = ["for"], _r = ["id", "placeholder", "onKeydown"], gr = {
  key: 0,
  class: "dc-panel__facets"
}, yr = {
  key: 1,
  class: "dc-panel__hint"
}, wr = { class: "dc-panel__scope" }, br = ["id"], kr = ["aria-labelledby"], $r = ["data-dc-active", "aria-current"], xr = { class: "dc-entity__count dc-mono" }, Mr = ["data-dc-active", "aria-current", "onClick"], Cr = { class: "dc-entity__label" }, Er = { class: "dc-entity__count dc-mono" }, Sr = { class: "dc-panel__actions" }, Pr = ["disabled"], Ar = { class: "dc-panel__section dc-panel__section--row" }, zr = { class: "dc-panel__control" }, Rr = { class: "dc-panel__control" }, Fr = ["title", "aria-label"], Tr = {
  key: 0,
  class: "dc-panel__section"
}, Lr = /* @__PURE__ */ ce({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = Sn(), l = ye(), i = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, o = g(
      () => (n.views ?? [...Ls]).map((x) => ({ key: x, label: i[x] }))
    ), r = g(
      () => l.sorts.value.map((x) => ({ key: x.key, label: x.label }))
    ), u = W(l.query.value.expr), f = W(null);
    xe(
      () => l.query.value.expr,
      (x) => {
        u.value = x;
      }
    );
    const y = g(() => u.value !== l.query.value.expr);
    function h() {
      l.setExpression(u.value), s("close");
    }
    function m() {
      u.value = "", l.clearFilters();
    }
    function k(x, b) {
      l.setFacet(x, b);
    }
    return zt(() => f.value?.focus()), (x, b) => (p(), _("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: b[5] || (b[5] = jt(qe((M) => s("close"), ["stop"]), ["esc"]))
    }, [
      w("section", pr, [
        w("div", vr, [
          w("div", mr, [
            w("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, hr),
            vn(w("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: f,
              "onUpdate:modelValue": b[0] || (b[0] = (M) => u.value = M),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: E(l).schema.value.placeholder,
              onKeydown: jt(qe(h, ["prevent"]), ["enter"])
            }, null, 40, _r), [
              [mn, u.value]
            ])
          ]),
          E(l).entity.value ? (p(), _("div", gr, [
            (p(!0), _(J, null, de(E(l).entity.value.facets, (M) => (p(), oe(Zs, {
              key: M.key,
              facet: M,
              value: E(l).query.value.facets[M.key],
              onUpdate: (F) => k(M.key, F)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (p(), _("p", yr, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ]),
        w("div", wr, [
          w("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, br),
          w("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            w("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": E(l).isEverything.value ? "true" : "false",
              "aria-current": E(l).isEverything.value ? "true" : void 0,
              onClick: b[1] || (b[1] = (M) => E(l).clearEntity())
            }, [
              b[6] || (b[6] = w("span", { class: "dc-entity__label" }, "Everything", -1)),
              w("span", xr, A(E(l).entities.value.length) + " kinds", 1)
            ], 8, $r),
            (p(!0), _(J, null, de(E(l).entities.value, (M) => (p(), _("button", {
              key: M.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": M.key === E(l).entity.value?.key ? "true" : "false",
              "aria-current": M.key === E(l).entity.value?.key ? "true" : void 0,
              onClick: (F) => E(l).setEntity(M.key)
            }, [
              w("span", Cr, A(M.label), 1),
              w("span", Er, A(M.count), 1)
            ], 8, Mr))), 128))
          ], 8, kr)
        ]),
        w("div", Sr, [
          w("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: h
          }, " Run query "),
          w("button", {
            type: "button",
            class: "dc-button",
            disabled: E(l).isPristine.value && !y.value,
            onClick: m
          }, " Reset ", 8, Pr)
        ])
      ]),
      w("section", Ar, [
        w("div", zr, [
          b[7] || (b[7] = w("span", { class: "dc-eyebrow" }, "View", -1)),
          pe(wn, {
            label: "Result view",
            "model-value": E(l).query.value.view,
            options: o.value,
            "onUpdate:modelValue": b[2] || (b[2] = (M) => E(l).setView(M))
          }, null, 8, ["model-value", "options"])
        ]),
        w("div", Rr, [
          b[8] || (b[8] = w("span", { class: "dc-eyebrow" }, "Sort", -1)),
          pe(wn, {
            mono: "",
            label: "Sort field",
            "model-value": E(l).query.value.sort,
            options: r.value,
            "onUpdate:modelValue": b[3] || (b[3] = (M) => E(l).setSort(M))
          }, null, 8, ["model-value", "options"]),
          w("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: E(l).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${E(l).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: b[4] || (b[4] = (M) => E(l).toggleDirection())
          }, A(E(l).query.value.dir === "desc" ? "↓" : "↑"), 9, Fr)
        ])
      ]),
      a["panel-section"] ? (p(), _("section", Tr, [
        Be(x.$slots, "panel-section", {}, void 0, !0)
      ])) : O("", !0)
    ], 40, fr));
  }
}), Js = /* @__PURE__ */ ue(Lr, [["__scopeId", "data-v-d8a6ac01"]]), Dr = (e) => {
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
};
function Nr(e, t) {
  const n = ze(t, "state"), s = ze(t, "score"), a = ze(t, "tint"), l = s ? Dr(Le(s, e)) : null;
  return {
    identity: on(ze(t, "identity"), e),
    reference: on(ze(t, "reference"), e),
    metrics: zs(t, "metric").map((i) => ({
      column: i,
      label: i.label ?? "",
      text: Pn(i, e)
    })),
    state: n ? Le(n, e) ?? null : null,
    score: l,
    percent: l === null ? "" : Rs(l),
    updated: on(ze(t, "updated"), e),
    tint: a ? Le(a, e) ?? null : null
  };
}
function ea(e, t, n, s) {
  const a = n?.columns ?? [];
  return {
    row: e,
    key: Xa(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: a,
    ordinal: Ga(t),
    parts: Nr(e, a),
    pinned: s
  };
}
function wt() {
  const e = ye(), t = g(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return g(
    () => e.rows.value.map(
      (n, s) => ea(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n)
      )
    )
  );
}
const Ir = ["data-dc-status"], Or = /* @__PURE__ */ ce({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (p(), _("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, A(e.status), 9, Ir));
  }
}), Rt = /* @__PURE__ */ ue(Or, [["__scopeId", "data-v-23e59fbf"]]), Vr = ["title"], Kr = { key: 1 }, qr = /* @__PURE__ */ ce({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ye(), s = g(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((r) => r.key === t.column.drill) ?? null), a = g(() => t.column.label ?? ""), l = g(() => Pn(t.column, t.entry.row));
    function i(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (o, r) => s.value ? (p(), _("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: i
    }, [
      Be(o.$slots, "default", {}, () => [
        Re(A(l.value), 1)
      ], !0)
    ], 8, Vr)) : (p(), _("span", Kr, [
      Be(o.$slots, "default", {}, () => [
        Re(A(l.value), 1)
      ], !0)
    ]));
  }
}), Ft = /* @__PURE__ */ ue(qr, [["__scopeId", "data-v-3bd0cbdb"]]), Br = ["data-dc-active", "aria-pressed", "aria-label"], Wr = /* @__PURE__ */ ce({
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
    }, A(e.pinned ? "★" : "☆"), 9, Br));
  }
}), Vn = /* @__PURE__ */ ue(Wr, [["__scopeId", "data-v-ef63d763"]]), Hr = ["title", "aria-label"], Ur = /* @__PURE__ */ ce({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = g(() => t.entry.entity?.scope ?? null);
    function a(l) {
      l.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (l, i) => s.value ? (p(), _("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, Hr)) : O("", !0);
  }
}), Tt = /* @__PURE__ */ ue(Ur, [["__scopeId", "data-v-1d9b1a9f"]]), Gr = { class: "dc-cards" }, Xr = { class: "dc-card__top dc-mono" }, jr = {
  key: 0,
  class: "dc-card__entity"
}, Yr = { class: "dc-card__top-right" }, Qr = ["onClick"], Zr = { class: "dc-card__primary" }, Jr = { class: "dc-card__secondary dc-mono" }, eo = { class: "dc-card__metrics dc-mono" }, to = {
  key: 0,
  class: "dc-card__date"
}, no = /* @__PURE__ */ ce({
  __name: "CardsView",
  setup(e) {
    const t = ye(), n = wt(), s = g(() => t.isEverything.value);
    return (a, l) => (p(), _("div", Gr, [
      (p(!0), _(J, null, de(E(n), (i) => (p(), _("div", {
        key: i.key,
        class: "dc-card"
      }, [
        w("div", Xr, [
          w("span", null, [
            Re(A(i.ordinal) + " ", 1),
            s.value ? (p(), _("span", jr, A(i.entityLabel), 1)) : O("", !0)
          ]),
          w("span", Yr, [
            i.parts.state ? (p(), oe(Rt, {
              key: 0,
              status: i.parts.state
            }, null, 8, ["status"])) : O("", !0),
            pe(Tt, { entry: i }, null, 8, ["entry"]),
            E(t).pinnable.value ? (p(), oe(Vn, {
              key: 1,
              row: i.row,
              name: i.parts.identity,
              pinned: i.pinned
            }, null, 8, ["row", "name", "pinned"])) : O("", !0)
          ])
        ]),
        w("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => E(t).activate(i.row)
        }, [
          w("span", Zr, A(i.parts.identity), 1),
          w("span", Jr, A(i.parts.reference), 1)
        ], 8, Qr),
        w("div", eo, [
          (p(!0), _(J, null, de(i.parts.metrics.slice(0, 2), (o) => (p(), oe(Ft, {
            key: o.column.key ?? o.label,
            entry: i,
            column: o.column
          }, {
            default: gt(() => [
              Re(A(o.label) + " " + A(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          i.parts.updated ? (p(), _("span", to, A(i.parts.updated), 1)) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ta = /* @__PURE__ */ ue(no, [["__scopeId", "data-v-b633cc4d"]]), so = { class: "dc-grid" }, ao = ["onClick"], lo = { class: "dc-tile__scrim" }, ro = { class: "dc-tile__top dc-mono" }, oo = { class: "dc-tile__chip" }, io = {
  key: 0,
  class: "dc-tile__chip"
}, co = { class: "dc-tile__caption" }, uo = { class: "dc-tile__secondary dc-truncate" }, fo = { class: "dc-tile__primary" }, po = /* @__PURE__ */ ce({
  __name: "GridView",
  setup(e) {
    const t = ye(), n = wt();
    return (s, a) => (p(), _("div", so, [
      (p(!0), _(J, null, de(E(n), (l) => (p(), _("button", {
        key: l.key,
        type: "button",
        class: "dc-tile",
        style: Pe({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
        onClick: (i) => E(t).activate(l.row)
      }, [
        w("span", lo, [
          w("span", ro, [
            w("span", oo, A(l.ordinal), 1),
            l.parts.percent ? (p(), _("span", io, A(l.parts.percent), 1)) : O("", !0)
          ]),
          w("span", co, [
            w("span", uo, A(l.parts.reference), 1),
            w("span", fo, A(l.parts.identity), 1)
          ])
        ])
      ], 12, ao))), 128))
    ]));
  }
}), na = /* @__PURE__ */ ue(po, [["__scopeId", "data-v-e3934b3e"]]), vo = { class: "dc-links" }, mo = ["onClick"], ho = { class: "dc-link__primary dc-truncate" }, _o = { class: "dc-link__secondary dc-mono dc-truncate" }, go = /* @__PURE__ */ ce({
  __name: "LinksView",
  setup(e) {
    const t = ye(), n = wt();
    return (s, a) => (p(), _("div", vo, [
      (p(!0), _(J, null, de(E(n), (l) => (p(), _("button", {
        key: l.key,
        type: "button",
        class: "dc-link",
        onClick: (i) => E(t).activate(l.row)
      }, [
        w("span", ho, A(l.parts.identity), 1),
        w("span", _o, A(l.parts.reference), 1)
      ], 8, mo))), 128))
    ]));
  }
}), sa = /* @__PURE__ */ ue(go, [["__scopeId", "data-v-d94cadb6"]]), yo = ["aria-valuenow", "aria-label", "title"], wo = /* @__PURE__ */ ce({
  __name: "ScoreMeter",
  props: {
    value: {},
    label: {}
  },
  setup(e) {
    const t = e, n = g(() => Rs(t.value));
    return (s, a) => (p(), _("span", {
      class: "dc-meter",
      role: "meter",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": Math.round(e.value * 100),
      "aria-label": e.label ?? "Score",
      title: `${e.label ?? "Score"} ${n.value}`
    }, [
      w("span", {
        class: "dc-meter__fill",
        style: Pe({ width: n.value })
      }, null, 4)
    ], 8, yo));
  }
}), Kn = /* @__PURE__ */ ue(wo, [["__scopeId", "data-v-ab794776"]]), bo = {
  class: "dc-list",
  role: "list"
}, ko = ["onClick"], $o = { class: "dc-list__ordinal dc-mono" }, xo = { class: "dc-list__identity" }, Mo = { class: "dc-list__primary dc-truncate" }, Co = { class: "dc-list__secondary dc-mono dc-truncate" }, Eo = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, So = { class: "dc-list__metrics dc-mono" }, Po = { class: "dc-list__trailing" }, Ao = /* @__PURE__ */ ce({
  __name: "ListView",
  setup(e) {
    const t = ye(), n = wt(), s = g(() => t.isEverything.value), a = (l) => ze(l.columns, "score")?.label ?? "Score";
    return (l, i) => (p(), _("div", bo, [
      (p(!0), _(J, null, de(E(n), (o) => (p(), _("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        w("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (r) => E(t).activate(o.row)
        }, [
          w("span", $o, A(o.ordinal), 1),
          w("span", xo, [
            w("span", Mo, A(o.parts.identity), 1),
            w("span", Co, A(o.parts.reference), 1)
          ])
        ], 8, ko),
        s.value ? (p(), _("span", Eo, A(o.entityLabel), 1)) : O("", !0),
        w("span", So, [
          (p(!0), _(J, null, de(o.parts.metrics.slice(0, 2), (r) => (p(), oe(Ft, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128)),
          o.parts.score !== null ? (p(), oe(Kn, {
            key: 0,
            value: o.parts.score,
            label: a(o)
          }, null, 8, ["value", "label"])) : O("", !0)
        ]),
        w("span", Po, [
          o.parts.state ? (p(), oe(Rt, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : O("", !0),
          pe(Tt, { entry: o }, null, 8, ["entry"]),
          E(t).pinnable.value ? (p(), oe(Vn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), bn = /* @__PURE__ */ ue(Ao, [["__scopeId", "data-v-0d372bda"]]), zo = { class: "dc-preview" }, Ro = { class: "dc-preview__pager dc-mono" }, Fo = ["disabled"], To = { "aria-live": "polite" }, Lo = ["disabled"], Do = {
  key: 0,
  class: "dc-preview__card"
}, No = { class: "dc-preview__body" }, Io = { class: "dc-preview__top" }, Oo = { class: "dc-preview__badges" }, Vo = { class: "dc-preview__entity dc-mono" }, Ko = { class: "dc-preview__marks" }, qo = { class: "dc-preview__primary" }, Bo = { class: "dc-preview__secondary dc-mono" }, Wo = { class: "dc-preview__fields" }, Ho = { class: "dc-preview__key" }, Uo = { class: "dc-preview__value dc-mono" }, Go = /* @__PURE__ */ ce({
  __name: "PreviewView",
  setup(e) {
    const t = ye(), n = wt(), s = W(0);
    xe(n, (r) => {
      s.value > r.length - 1 && (s.value = Math.max(0, r.length - 1));
    });
    const a = g(() => n.value[s.value]), l = g(() => {
      const r = a.value;
      if (!r) return [];
      const u = ze(r.columns, "reference"), f = ze(r.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: r.parts.reference, column: null }] : [],
        ...r.parts.metrics.map((y) => ({
          key: y.label,
          value: y.text,
          column: y.column
        })),
        ...f ? [{ key: f.label ?? "Updated", value: r.parts.updated, column: null }] : []
      ];
    }), i = g(() => {
      if (!n.value.length) return "0 / 0";
      const r = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${r}`;
    }), o = (r) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + r)));
    };
    return (r, u) => (p(), _("div", zo, [
      w("div", Ro, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => o(-1))
        }, " ‹ ", 8, Fo),
        w("span", To, A(i.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (f) => o(1))
        }, " › ", 8, Lo)
      ]),
      a.value ? (p(), _("div", Do, [
        w("div", {
          class: "dc-preview__media",
          style: Pe({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        w("div", No, [
          w("div", Io, [
            w("span", Oo, [
              a.value.parts.state ? (p(), oe(Rt, {
                key: 0,
                status: a.value.parts.state
              }, null, 8, ["status"])) : O("", !0),
              w("span", Vo, A(a.value.entityLabel), 1)
            ]),
            w("span", Ko, [
              pe(Tt, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (p(), oe(Vn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : O("", !0)
            ])
          ]),
          w("div", null, [
            w("div", qo, A(a.value.parts.identity), 1),
            w("div", Bo, A(a.value.parts.reference), 1)
          ]),
          w("dl", Wo, [
            (p(!0), _(J, null, de(l.value, (f) => (p(), _("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              w("dt", Ho, A(f.key), 1),
              w("dd", Uo, [
                f.column && a.value ? (p(), oe(Ft, {
                  key: 0,
                  entry: a.value,
                  column: f.column
                }, null, 8, ["entry", "column"])) : (p(), _(J, { key: 1 }, [
                  Re(A(f.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          w("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (f) => E(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : O("", !0)
    ]));
  }
}), aa = /* @__PURE__ */ ue(Go, [["__scopeId", "data-v-8e2c6c48"]]);
function Xo() {
  const e = ye();
  return g(() => ja(e.schema.value, e.entity.value));
}
const jo = ["src", "alt"], Yo = ["title"], Qo = /* @__PURE__ */ ce({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = g(() => t.column.kind ?? "text"), a = g(() => Le(t.column, t.entry.row)), l = g(
      () => s.value === "ordinal" ? t.entry.ordinal : Pn(t.column, t.entry.row)
    ), i = g(() => a.value), o = g(() => {
      const h = Number(a.value);
      return Number.isFinite(h) ? h : 0;
    }), r = g(() => t.column.activate === !0 || !!t.column.click), u = g(() => hn(t.column)), f = g(() => Fs(t.column, t.entry.row));
    function y(h) {
      r.value && (h.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (h, m) => s.value === "component" && e.column.component ? (p(), oe(Ss(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (p(), oe(Rt, {
      key: 1,
      status: i.value
    }, null, 8, ["status"])) : s.value === "score" ? (p(), oe(Kn, {
      key: 2,
      value: o.value,
      label: e.column.label
    }, null, 8, ["value", "label"])) : s.value === "image" ? (p(), _("img", {
      key: 3,
      class: "dc-cell__image",
      src: String(a.value ?? ""),
      alt: e.entry.parts.identity,
      loading: "lazy",
      style: Pe({ maxHeight: e.column.height }),
      onClick: y
    }, null, 12, jo)) : e.column.drill ? (p(), oe(Ft, {
      key: 4,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : r.value ? (p(), _("button", {
      key: 5,
      type: "button",
      class: Yt(["dc-table__open", { "dc-truncate": u.value }]),
      title: f.value,
      onClick: y
    }, A(l.value), 11, Yo)) : (p(), _(J, { key: 6 }, [
      Re(A(l.value), 1)
    ], 64));
  }
}), _s = /* @__PURE__ */ ue(Qo, [["__scopeId", "data-v-6eea4a46"]]), Zo = {
  key: 0,
  class: "dc-table__none"
}, Jo = { class: "dc-table__detail" }, ei = {
  key: 1,
  class: "dc-table"
}, ti = ["data-dc-align", "data-dc-hide", "aria-sort"], ni = ["onClick"], si = ["onClick"], ai = ["data-dc-align", "data-dc-hide", "title"], li = {
  key: 0,
  class: "dc-table__name"
}, ri = /* @__PURE__ */ ce({
  __name: "TableView",
  setup(e) {
    const t = ye(), n = wt(), s = Xo();
    function a(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const l = g(() => t.entity.value?.label ?? "The result set"), i = g(() => new Set(t.sorts.value.map((y) => y.key))), o = (y) => y.sort !== void 0 && i.value.has(y.sort), r = (y) => {
      if (o(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function u(y) {
      return [
        ds(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        hn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function f(y, h) {
      if (!(!hn(y) || y.activate || y.click))
        return Fs(y, h.row);
    }
    return (y, h) => E(s).length ? (p(), _("table", ei, [
      w("thead", null, [
        w("tr", null, [
          (p(!0), _(J, null, de(E(s), (m, k) => (p(), _("th", {
            key: E(fs)(m, k),
            scope: "col",
            class: Yt(E(ds)(m)),
            style: Pe({ width: m.width }),
            "data-dc-align": E(us)(m),
            "data-dc-hide": m.hideBelow,
            "aria-sort": r(m)
          }, [
            o(m) ? (p(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (x) => a(m.sort)
            }, A(m.label), 9, ni)) : (p(), _(J, { key: 1 }, [
              Re(A(m.label), 1)
            ], 64))
          ], 14, ti))), 128))
        ])
      ]),
      w("tbody", null, [
        (p(!0), _(J, null, de(E(n), (m) => (p(), _("tr", {
          key: m.key,
          class: "dc-table__row",
          onClick: (k) => E(t).activate(m.row)
        }, [
          (p(!0), _(J, null, de(E(s), (k, x) => (p(), _("td", {
            key: E(fs)(k, x),
            class: Yt(u(k)),
            "data-dc-align": E(us)(k),
            "data-dc-hide": k.hideBelow,
            title: f(k, m)
          }, [
            k.scope ? (p(), _("span", li, [
              pe(_s, {
                column: k,
                entry: m
              }, null, 8, ["column", "entry"]),
              pe(Tt, { entry: m }, null, 8, ["entry"])
            ])) : (p(), oe(_s, {
              key: 1,
              column: k,
              entry: m
            }, null, 8, ["column", "entry"]))
          ], 10, ai))), 128))
        ], 8, si))), 128))
      ])
    ])) : (p(), _("p", Zo, [
      h[4] || (h[4] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", Jo, [
        Re(A(l.value) + " has no ", 1),
        h[0] || (h[0] = w("code", null, "columns", -1)),
        h[1] || (h[1] = Re(" in the schema, so there is no table to draw. ", -1)),
        h[2] || (h[2] = w("code", null, "defaultColumns()", -1)),
        h[3] || (h[3] = Re(" is the familiar eight. ", -1))
      ])
    ]));
  }
}), la = /* @__PURE__ */ ue(ri, [["__scopeId", "data-v-eb4b7a13"]]);
function oi(e) {
  const t = Xt([]), n = W(!1), s = Xt(null);
  let a = 0;
  const l = (r, u, f) => ({
    entity: r,
    rows: u.rows.map(
      (y, h) => ea(y, h, r, e.isPinned(y.id))
    ),
    total: u.total,
    count: f ? r.count : String(u.total)
  }), i = () => {
    const r = ++a, u = e.query.value, f = e.schema.value, y = e.entities.value, h = e.limit.value, m = zn(u), k = y.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: x.key, facets: Jt(x), page: 1 },
        schema: f,
        entity: x,
        limit: h,
        offset: 0
      })
    }));
    if (k.every(({ outcome: x }) => !(x instanceof Promise))) {
      t.value = k.map(
        ({ entity: x, outcome: b }) => l(x, b, m)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      r === a && (t.value = x.map(
        (b, M) => l(k[M].entity, b, m)
      ), s.value = null);
    }).catch((x) => {
      r === a && (s.value = x, t.value = []);
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
const ii = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, ci = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, ui = ["data-dc-pending"], di = ["data-dc-empty"], fi = ["onClick"], pi = { class: "dc-type__name" }, vi = { class: "dc-type__count dc-mono" }, mi = { class: "dc-type__sr" }, hi = {
  key: 0,
  class: "dc-type__empty"
}, _i = ["onClick"], gi = { class: "dc-type__identity" }, yi = { class: "dc-type__primary dc-truncate" }, wi = { class: "dc-type__secondary dc-mono dc-truncate" }, bi = { class: "dc-type__trailing dc-mono" }, ki = { class: "dc-type__metric-value" }, $i = { class: "dc-type__metric-label" }, xi = {
  key: 0,
  class: "dc-type__date"
}, Mi = ["onClick"], Ci = /* @__PURE__ */ ce({
  __name: "TypeCardsView",
  setup(e) {
    const t = ye(), { previews: n, pending: s, error: a } = oi({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (i) => t.isPinnedId(i)
    }), l = g(() => !t.isPristine.value);
    return (i, o) => E(a) ? (p(), _("p", ii, " Could not load results: " + A(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !E(n).length && E(s) ? (p(), _("p", ci, " Running query… ")) : (p(), _("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      (p(!0), _(J, null, de(E(n), (r) => (p(), _("section", {
        key: r.entity.key,
        class: "dc-type",
        "data-dc-empty": r.rows.length ? "false" : "true"
      }, [
        w("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => E(t).setEntity(r.entity.key)
        }, [
          w("span", pi, A(r.entity.label), 1),
          w("span", vi, A(r.count), 1),
          o[0] || (o[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", mi, "Show only " + A(r.entity.label.toLowerCase()), 1)
        ], 8, fi),
        r.rows.length ? O("", !0) : (p(), _("p", hi, A(l.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), _(J, null, de(r.rows, (u) => (p(), _("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (f) => E(t).activate(u.row)
          }, [
            w("span", gi, [
              w("span", yi, A(u.parts.identity), 1),
              w("span", wi, A(u.parts.reference), 1)
            ])
          ], 8, _i),
          w("span", bi, [
            (p(!0), _(J, null, de(u.parts.metrics.slice(0, 1), (f) => (p(), oe(Ft, {
              key: f.column.key ?? f.label,
              class: "dc-type__metric",
              entry: u,
              column: f.column
            }, {
              default: gt(() => [
                w("span", ki, A(f.text), 1),
                w("span", $i, A(f.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), _("span", xi, A(u.parts.updated), 1)) : O("", !0),
            pe(Tt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        r.entity.create ? (p(), _("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => E(t).create(r.entity)
        }, [
          o[1] || (o[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Re(" " + A(r.entity.create), 1)
        ], 8, Mi)) : O("", !0)
      ], 8, di))), 128))
    ], 8, ui));
  }
}), ra = /* @__PURE__ */ ue(Ci, [["__scopeId", "data-v-b776cfb6"]]), Ei = ["data-dc-pending"], Si = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, Pi = { class: "dc-results__detail" }, Ai = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, zi = {
  key: 3,
  class: "dc-results__state"
}, Ri = { class: "dc-results__detail" }, Fi = /* @__PURE__ */ ce({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), s = {
      list: bn,
      cards: ta,
      grid: na,
      table: la,
      links: sa,
      preview: aa
    }, a = g(() => qs(n.query.value)), l = g(() => {
      const u = n.query.value.view, f = t.views ?? [], [y] = f;
      return y === void 0 || f.includes(u) ? u : y;
    }), i = g(() => s[l.value] ?? bn), o = g(() => n.rows.value.length > 0), r = g(() => n.error.value !== null);
    return (u, f) => (p(), _("div", {
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      r.value ? (p(), _("p", Si, [
        f[1] || (f[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", Pi, A(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), oe(ra, { key: 1 })) : !o.value && E(n).pending.value ? (p(), _("p", Ai, [...f[2] || (f[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (p(), oe(Ss(i.value), { key: 4 })) : (p(), _("div", zi, [
        f[3] || (f[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", Ri, A(E(n).summary.value), 1),
        E(n).isPristine.value ? O("", !0) : (p(), _("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: f[0] || (f[0] = (y) => E(n).clearFilters())
        }, A(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Ei));
  }
}), oa = /* @__PURE__ */ ue(Fi, [["__scopeId", "data-v-c00573c8"]]), Ti = ["data-dc-theme"], Li = ["data-dc-width", "data-dc-align"], Di = { class: "dc-shell__panel" }, Ni = /* @__PURE__ */ ce({
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
    const s = e, a = n, l = Qt(e, "open"), i = Qt(e, "pinned"), o = Sn(), r = _t(Ts, null), u = s.route || r ? null : Ya(), f = s.route ?? r ?? u;
    et(() => u?.dispose?.());
    const y = g(() => _l({ seed: s.schema.key })), h = g(() => s.source ?? y.value), m = zl({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), k = Rl({
      source: h,
      query: m.query,
      schema: g(() => s.schema),
      entity: m.entity,
      limit: g(() => s.limit)
    });
    xe(m.query, ($) => a("query-change", $)), xe(
      [k.pageCount, k.pending, m.query],
      () => {
        if (k.pending.value) return;
        const $ = k.pageCount.value;
        m.query.value.page > $ && m.setPage($, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const x = Ps() ?? "dc-query-panel", b = W(null);
    function M() {
      l.value && (l.value = !1, zt(() => {
        b.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const F = g(() => new Set(i.value));
    function I($) {
      const P = new Set(F.value);
      P.has($.id) ? P.delete($.id) : P.add($.id), i.value = [...P], a("toggle-pin", $);
    }
    function R($, P) {
      m.narrow(bl(s.schema, m.query.value, $), P?.key ?? null), a("drill", $, P);
    }
    const T = kl({
      ...m,
      schema: g(() => s.schema),
      entities: g(() => s.schema.entities),
      rows: k.rows,
      total: k.total,
      limit: g(() => s.limit),
      offset: k.offset,
      pageCount: k.pageCount,
      pending: k.pending,
      error: k.error,
      source: h,
      previewsPerType: g(() => s.previewsPerType),
      pinnable: g(() => s.pinnable === !0),
      isPinned: ($) => F.value.has($.id),
      isPinnedId: ($) => F.value.has($),
      togglePin: I,
      activate: ($) => a("activate", $),
      create: ($) => a("create", $),
      drill: R
    }), V = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: m.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: M
    }), ($, P) => (p(), _("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Pe(V.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(Qs, {
          ref_key: "headerRef",
          ref: b,
          expanded: l.value,
          "panel-id": E(x),
          onToggle: P[0] || (P[0] = (Z) => l.value = !l.value)
        }, cs({ _: 2 }, [
          o.actions ? {
            name: "actions",
            fn: gt(() => [
              Be($.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        l.value ? (p(), _(J, { key: 0 }, [
          w("div", {
            class: "dc-shell__scrim",
            onClick: M
          }),
          w("div", Di, [
            pe(Js, {
              "panel-id": E(x),
              views: e.views,
              onClose: M
            }, cs({ _: 2 }, [
              o["panel-section"] ? {
                name: "panel-section",
                fn: gt(() => [
                  Be($.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : O("", !0)
      ], 8, Li),
      Be($.$slots, "results", {
        rows: E(T).rows.value,
        total: E(T).total.value,
        offset: E(T).offset.value,
        pageCount: E(T).pageCount.value,
        query: E(T).query.value,
        pending: E(T).pending.value
      }, () => [
        pe(oa, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, Ti));
  }
}), Ii = /* @__PURE__ */ ue(Ni, [["__scopeId", "data-v-737c7342"]]), Et = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Oi = ["aria-label"], Vi = ["role", "aria-label"], Ki = ["data-dc-item"], qi = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Bi = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Wi = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Hi = { class: "dc-menu__label dc-truncate" }, Ui = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Gi = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Xi = /* @__PURE__ */ ce({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = W(null), i = W([]), o = W(null), r = W(null), u = W(null), f = W(!1), y = g(
      () => s.items.flatMap(($, P) => Et($) ? [P] : [])
    ), h = g(() => {
      const $ = [{ entries: [] }];
      return s.items.forEach((P, Z) => {
        P.heading ? $.push({ heading: P, entries: [] }) : $[$.length - 1]?.entries.push({ item: P, index: Z });
      }), $.filter((P) => P.entries.length > 0);
    }), m = W({ x: s.at.x, y: s.at.y });
    async function k() {
      m.value = { x: s.at.x, y: s.at.y }, await zt();
      const $ = l.value?.getBoundingClientRect();
      if (!$) return;
      const P = 8;
      let Z = s.at.x, re = s.at.y;
      if (Z + $.width > window.innerWidth - P) {
        const ve = s.at.mirrorX === void 0 ? null : s.at.mirrorX - $.width;
        Z = ve !== null && ve >= P ? ve : window.innerWidth - $.width - P;
      }
      re + $.height > window.innerHeight - P && (re = window.innerHeight - $.height - P), m.value = { x: Math.max(P, Z), y: Math.max(P, re) };
    }
    const x = g(() => ({ left: `${m.value.x}px`, top: `${m.value.y}px` }));
    function b($) {
      o.value = $, $ !== null && zt(() => i.value[$]?.focus());
    }
    function M($, P) {
      const Z = y.value;
      if (Z.length === 0) return null;
      if ($ === null) return P === 1 ? Z[0] ?? null : Z[Z.length - 1] ?? null;
      const re = Z.indexOf($);
      return re === -1 ? Z[0] ?? null : Z[(re + P + Z.length) % Z.length] ?? null;
    }
    function F($, P) {
      if (!s.items[$]?.items?.length) return;
      const re = i.value[$]?.getBoundingClientRect(), ve = l.value?.getBoundingClientRect();
      !re || !ve || (u.value = { x: ve.right - 4, y: re.top - 4, mirrorX: ve.left + 4 }, r.value = $, f.value = P);
    }
    function I($) {
      const P = r.value;
      r.value = null, u.value = null, $ && P !== null && b(P);
    }
    function R($) {
      const P = s.items[$];
      if (!(!P || !Et(P))) {
        if (P.items?.length) {
          F($, !0);
          return;
        }
        a("choose", P);
      }
    }
    function T($) {
      const P = $.key;
      if (P === "Escape") {
        $.preventDefault(), $.stopPropagation(), r.value !== null ? I(!0) : a("dismiss");
        return;
      }
      if (P === "ArrowDown" || P === "ArrowUp") {
        $.preventDefault(), $.stopPropagation(), I(!1), b(M(o.value, P === "ArrowDown" ? 1 : -1));
        return;
      }
      if (P === "Home" || P === "End") {
        $.preventDefault(), $.stopPropagation(), I(!1), b(M(null, P === "Home" ? 1 : -1));
        return;
      }
      if (P === "ArrowRight") {
        const Z = o.value;
        Z !== null && s.items[Z]?.items?.length && ($.preventDefault(), $.stopPropagation(), F(Z, !0));
        return;
      }
      if (P === "ArrowLeft") {
        r.value !== null && ($.preventDefault(), $.stopPropagation(), I(!0));
        return;
      }
      if (P === "Enter" || P === " ") {
        const Z = o.value;
        if (Z === null) return;
        $.preventDefault(), $.stopPropagation(), R(Z);
      }
    }
    function V($) {
      const P = s.items[$];
      !P || !Et(P) || (r.value !== null && r.value !== $ && I(!1), b($), P.items?.length && F($, !1));
    }
    return Wa(() => {
      k(), s.autofocus && b(M(null, 1));
    }), xe(() => s.at, k, { deep: !0 }), xe(() => s.items, () => void k(), { deep: !0 }), et(() => {
      r.value = null;
    }), t({ root: l }), ($, P) => {
      const Z = As("MenuList", !0);
      return p(), _("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Pe(x.value),
        onKeydown: T
      }, [
        (p(!0), _(J, null, de(h.value, (re, ve) => (p(), _("div", {
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
          }, A(re.heading.label), 9, Ki)) : O("", !0),
          (p(!0), _(J, null, de(re.entries, ({ item: Y, index: Me }) => (p(), _(J, {
            key: Y.id ?? `${Me}-${Y.label ?? ""}`
          }, [
            Y.separator ? (p(), _("div", qi)) : (p(), _("button", {
              key: 1,
              ref_for: !0,
              ref: (Ae) => {
                Ae && (i.value[Me] = Ae);
              },
              type: "button",
              class: "dc-menu__item",
              role: Y.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Y.checked === void 0 ? void 0 : Y.checked,
              "aria-haspopup": Y.items?.length ? "menu" : void 0,
              "aria-expanded": Y.items?.length ? r.value === Me : void 0,
              "aria-disabled": Y.disabled ? "true" : void 0,
              disabled: Y.disabled,
              "data-dc-item": Y.id,
              tabindex: "-1",
              onClick: (Ae) => R(Me),
              onMouseenter: (Ae) => V(Me)
            }, [
              w("span", Wi, A(Y.checked ? "✓" : ""), 1),
              w("span", Hi, A(Y.label), 1),
              Y.shortcut ? (p(), _("span", Ui, A(Y.shortcut), 1)) : Y.items?.length ? (p(), _("span", Gi, "›")) : O("", !0)
            ], 40, Bi))
          ], 64))), 128))
        ], 8, Vi))), 128)),
        r.value !== null && u.value ? (p(), oe(Z, {
          key: r.value,
          items: e.items[r.value]?.items ?? [],
          at: u.value,
          label: e.items[r.value]?.label,
          autofocus: f.value,
          onChoose: P[0] || (P[0] = (re) => a("choose", re)),
          onDismiss: P[1] || (P[1] = (re) => I(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
      ], 44, Oi);
    };
  }
}), ia = /* @__PURE__ */ ue(Xi, [["__scopeId", "data-v-9b1413fa"]]), ji = ["data-dc-theme", "aria-label"], Yi = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Qi = /* @__PURE__ */ ce({
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
    }), a = t, l = W(null), i = W([]), o = W(null), r = W(null), u = W(!1), f = g(
      () => n.menus.flatMap((R, T) => Et(R) ? [T] : [])
    );
    function y(R, T) {
      const V = i.value[R]?.getBoundingClientRect(), $ = n.menus[R];
      !V || !$ || !Et($) || (r.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, o.value = R, u.value = T);
    }
    function h(R) {
      const T = o.value;
      o.value = null, r.value = null, R && T !== null && i.value[T]?.focus();
    }
    function m(R) {
      o.value === R ? h(!0) : y(R, !1);
    }
    function k(R) {
      o.value === null || o.value === R || y(R, !1);
    }
    function x(R, T) {
      const V = f.value;
      if (V.length === 0) return null;
      if (R === null) return T === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const $ = V.indexOf(R);
      return $ === -1 ? V[0] ?? null : V[($ + T + V.length) % V.length] ?? null;
    }
    function b(R) {
      const T = R.key;
      if (T === "Escape") {
        if (o.value === null) return;
        R.preventDefault(), h(!0);
        return;
      }
      if (T === "ArrowDown" && o.value === null) {
        const P = M();
        if (P === null) return;
        R.preventDefault(), y(P, !0);
        return;
      }
      if (T !== "ArrowLeft" && T !== "ArrowRight") return;
      const V = o.value ?? M(), $ = x(V, T === "ArrowRight" ? 1 : -1);
      $ !== null && (R.preventDefault(), o.value !== null ? y($, !0) : i.value[$]?.focus());
    }
    function M() {
      const R = i.value.findIndex((T) => T === document.activeElement);
      return R === -1 ? f.value[0] ?? null : R;
    }
    function F(R) {
      const T = R.target;
      !T || l.value?.contains(T) || h(!1);
    }
    xe(o, (R) => {
      R !== null ? window.addEventListener("pointerdown", F, !0) : window.removeEventListener("pointerdown", F, !0);
    }), et(() => window.removeEventListener("pointerdown", F, !0));
    function I(R) {
      h(!0), R.action?.(), a("choose", R);
    }
    return (R, T) => (p(), _("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Pe(s.value),
      onKeydown: b
    }, [
      (p(!0), _(J, null, de(e.menus, (V, $) => (p(), _("button", {
        key: V.id ?? V.label ?? $,
        ref_for: !0,
        ref: (P) => {
          P && (i.value[$] = P);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === $,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: $ === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (P) => m($),
        onMouseenter: (P) => k($)
      }, A(V.label), 41, Yi))), 128)),
      o.value !== null && r.value ? (p(), oe(ia, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: r.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: I,
        onDismiss: T[0] || (T[0] = (V) => h(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 44, ji));
  }
}), Cu = /* @__PURE__ */ ue(Qi, [["__scopeId", "data-v-93dbd2e4"]]), Zi = ["aria-label", "aria-expanded", "disabled"], Ji = { "aria-hidden": "true" }, ec = /* @__PURE__ */ ce({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = W(null), a = W(null), l = W(null), i = W(!1), o = g(() => l.value !== null);
    function r(k) {
      const x = s.value?.getBoundingClientRect();
      x && (l.value = { x: x.left, y: x.bottom + 4, mirrorX: x.right }, i.value = k);
    }
    function u(k) {
      l.value = null, k && s.value?.focus();
    }
    function f() {
      o.value ? u(!0) : r(!1);
    }
    function y(k) {
      k.key !== "ArrowDown" || o.value || (k.preventDefault(), r(!0));
    }
    function h(k) {
      const x = k.target;
      x && (s.value?.contains(x) || a.value?.root?.contains(x) || u(!1));
    }
    xe(o, (k) => {
      k ? window.addEventListener("pointerdown", h, !0) : window.removeEventListener("pointerdown", h, !0);
    }), et(() => window.removeEventListener("pointerdown", h, !0));
    function m(k) {
      u(!0), k.action?.(), n("choose", k);
    }
    return (k, x) => (p(), _(J, null, [
      w("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: y
      }, [
        w("span", Ji, A(e.glyph), 1)
      ], 40, Zi),
      l.value ? (p(), oe(ia, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: i.value,
        onChoose: m,
        onDismiss: x[0] || (x[0] = (b) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 64));
  }
}), qn = /* @__PURE__ */ ue(ec, [["__scopeId", "data-v-48f5ada5"]]), bt = (e) => e.kind === "split", q = (e) => e.kind === "group", G = (e) => e.kind === "float", rt = { x: 16, y: 16, w: 360, h: 260 }, en = 28, ca = 120, kn = 220, ua = 38, dt = 6;
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
function Eu(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ie = (e) => typeof e == "string", Bn = (e) => ie(e) ? De(e) : e, Dt = (e) => ie(e) ? [e] : Ue(e), gs = (e) => e.panels.filter(ie), tc = (e) => e.panels.filter((t) => !ie(t)), Se = (e, t) => e.panels.includes(t);
function Nt(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (ie(l) || !ee(l, t)) return l;
    const i = n(l);
    return i !== l && (s = !0), i;
  });
  return s ? { ...e, panels: a } : e;
}
function nn(e, t) {
  return { node: e, rect: { ...rt, ...t } };
}
function Wn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Hn(e, t) {
  const n = { ...rt, ...t };
  return Wn(
    e.map(
      (s, a) => nn(s, {
        ...n,
        x: n.x + a * en,
        y: n.y + a * en
      })
    )
  );
}
function Un(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Gn = (e, t, n) => Un("row", e, t, n), Su = (e, t, n) => Un("column", e, t, n);
function he(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Pu = (e) => ({ ...e, headless: !0 }), Au = (e) => ({ ...e, fixedView: !0 }), nc = (e) => e === "left" || e === "right" ? "row" : "column";
function Ue(e) {
  return q(e) ? e.panels.flatMap(Dt) : G(e) ? e.frames.flatMap((t) => Ue(t.node)) : e.children.flatMap(Ue);
}
function ee(e, t) {
  return q(e) ? e.panels.some((n) => ie(n) ? n === t : ee(n, t)) : G(e) ? e.frames.some((n) => ee(n.node, t)) : e.children.some((n) => ee(n, t));
}
const da = (e) => Ue(e).length === 0, $n = (e) => !q(e) && ct(e), xn = (e) => da(e) && !$n(e);
function sn(e) {
  return bt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : G(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ie(t) ? [] : [{ node: t, index: n }]);
}
const Xn = (e) => sn(e).map((t) => t.node);
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
function fa(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && ie(t) ? t : "";
}
function ke(e) {
  if (ie(e)) return e;
  if (q(e)) {
    const n = e.panels[ut(e)];
    return n === void 0 ? "" : ke(n);
  }
  if (G(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? ke(n.node) : "";
  }
  const t = e.children[0];
  return t ? ke(t) : "";
}
function pt(e, t) {
  if (q(e) && Se(e, t)) return e;
  for (const n of Xn(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function sc(e) {
  const t = Xn(e).flatMap(sc);
  return q(e) ? [e, ...t] : t;
}
function ge(e, t) {
  if (q(e)) {
    for (const n of tc(e)) {
      const s = ge(n, t);
      if (s) return s;
    }
    return null;
  }
  if (G(e)) {
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
function fn(e, t, n = ca) {
  const s = (o, r) => r > 0 ? Math.max(Math.min(o, r), Math.min(n, r)) : Math.max(o, n), a = s(e.w, t.w), l = s(e.h, t.h), i = (o, r, u) => Math.min(Math.max(o, 0), Math.max(u - r, 0));
  return {
    x: Math.round(i(e.x, a, t.w)),
    y: Math.round(i(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function ys(e, t, n, s, a = ca) {
  let { x: l, y: i, w: o, h: r } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (r = e.h + s), t.includes("n") && (r = e.h - s, i = e.y + s), o < a && (t.includes("w") && (l = e.x + e.w - a), o = a), r < a && (t.includes("n") && (i = e.y + e.h - a), r = a), { x: l, y: i, w: o, h: r };
}
const pa = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (q(e)) return Nt(e, t, (l) => vt(l, t, n));
  if (G(e)) {
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
function ac(e, t, n) {
  return vt(e, t, (s) => pa(s.rect, n) ? s : { ...s, rect: n });
}
const Ze = (e) => e.maximized === !0, va = (e) => (t) => {
  if (Ze(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function lc(e, t, n = !0) {
  return vt(e, t, va(n));
}
function zu(e, t) {
  const n = ge(e, t);
  return n ? lc(e, t, !Ze(n)) : e;
}
const at = (e) => e.minimized === !0, ma = (e) => (t) => {
  if (at(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function rc(e, t, n = !0) {
  return vt(e, t, ma(n));
}
function Ru(e, t) {
  const n = ge(e, t);
  return n ? rc(e, t, !at(n)) : e;
}
function st(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = Je(e, t.slice(0, -1));
  return !s || !G(s) ? null : s.frames[n] ?? null;
}
function Mn(e, t) {
  if (G(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ee(s.node, t)) continue;
      const a = Mn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of sn(e)) {
    if (!ee(n, t)) continue;
    const a = Mn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function jn(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = Je(e, a);
  if (!l || !G(l)) return e;
  const i = l.frames[s];
  if (!i) return e;
  const o = n(i);
  if (o === i) return e;
  const r = [...l.frames];
  return r[s] = o, it(e, a, { ...l, frames: r });
}
function ws(e, t, n) {
  return jn(
    e,
    t,
    (s) => pa(s.rect, n) ? s : { ...s, rect: n }
  );
}
function oc(e, t, n = !0) {
  return jn(e, t, va(n));
}
function ic(e, t, n = !0) {
  return jn(e, t, ma(n));
}
function St(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (G(e)) {
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
function cc(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (G(s) && (n[l] = s.frames.length - 1), s = Je(s, [a]));
  }), n;
}
function Ht(e, t, n, s) {
  if (q(e)) return Nt(e, n, (i) => Ht(i, t, n, s));
  if (G(e)) {
    const i = e.frames.findIndex((r) => ee(r.node, n)), o = e.frames[i];
    if (!o) return e;
    if (ge(o.node, n)) {
      const r = Ht(o.node, t, n, s);
      if (r === o.node) return e;
      const u = [...e.frames];
      return u[i] = { ...o, node: r }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, nn(De(t), s)] };
  }
  if (!ee(e, n)) return e;
  let a = !1;
  const l = e.children.map((i) => {
    const o = Ht(i, t, n, s);
    return o !== i && (a = !0), o;
  });
  return a ? { ...e, children: l } : e;
}
function bs(e, t, n, s) {
  if (t === n || !ee(e, t) || !ee(e, n) || !ge(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const l = Ht(a, t, n, s);
  return l === a ? e : _e(l);
}
function uc(e, t, n) {
  return G(e) ? { ...e, frames: [...e.frames, nn(De(t), n)] } : q(e) ? _a(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, De(t)],
    sizes: [...He(e), 1],
    ...he(e)
  };
}
function ha(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return uc(e, t, s);
  const l = n.slice(1), i = (f, y) => y === a ? ha(f, t, l, s) : ot(f, t);
  if (G(e)) {
    const f = e.frames.flatMap((y, h) => {
      const m = i(y.node, h);
      return m ? [m === y.node ? y : { ...y, node: m }] : [];
    });
    return { ...e, frames: f };
  }
  if (q(e)) {
    const f = ut(e), y = [];
    e.panels.forEach((k, x) => {
      if (ie(k)) {
        k !== t && y.push(k);
        return;
      }
      const b = i(k, x);
      b && y.push(b);
    });
    const m = e.active && y.some((k) => Dt(k).includes(e.active)) ? e.active : ke(y[f] ?? y[y.length - 1]);
    return {
      kind: "group",
      panels: y,
      ...m ? { active: m } : {},
      ...he(e)
    };
  }
  const o = He(e), r = [], u = [];
  return e.children.forEach((f, y) => {
    const h = i(f, y);
    h && (r.push(h), u.push(o[y] ?? 0));
  }), { kind: "split", direction: e.direction, children: r, sizes: u, ...he(e) };
}
function ks(e, t, n, s) {
  const a = Je(e, n);
  return !a || !da(a) || !ee(e, t) ? e : _e(ha(e, t, n, s));
}
function pn(e, t) {
  if (q(e)) return Nt(e, t, (a) => pn(a, t));
  if (G(e)) {
    const a = e.frames.findIndex((u) => ee(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const i = pn(l.node, t), o = i === l.node ? l : { ...l, node: i };
    if (a === e.frames.length - 1 && o === l) return e;
    const r = [...e.frames];
    return r.splice(a, 1), r.push(o), { ...e, frames: r };
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = pn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Yn(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), a = s.reduce((l, i) => l + i, 0);
  return a <= 0 ? n() : s.map((l) => l / a);
}
const He = (e) => Yn(e.children.length, e.sizes), Fe = (e) => {
  const t = q(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function _e(e) {
  if (q(e)) return dc(e);
  if (G(e)) {
    const o = e.frames.flatMap((r) => {
      const u = _e(r.node);
      return xn(u) ? [] : [u === r.node ? r : { ...r, node: u }];
    });
    return o.length === e.frames.length && o.every((r, u) => r === e.frames[u]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = He(e), n = Fe(e), s = [], a = [], l = [];
  e.children.forEach((o, r) => {
    const u = _e(o), f = t[r] ?? 0;
    if (xn(u)) return;
    if (!n && bt(u) && u.direction === e.direction && !Fe(u) && !ct(u)) {
      const h = He(u);
      u.children.forEach((m, k) => {
        s.push(m), a.push(f * (h[k] ?? 0));
      });
      return;
    }
    s.push(u), a.push(f);
    const y = n?.[r];
    y && l.push(y);
  });
  const i = s[0];
  return s.length === 1 && i && !ct(e) ? i : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: Yn(s.length, a),
    ...he(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function dc(e) {
  if (e.panels.every(ie)) return e;
  const t = ke(e), n = Fe(e), s = [], a = [];
  e.panels.forEach((o, r) => {
    const u = n?.[r];
    if (ie(o)) {
      s.push(o), u && a.push(u);
      return;
    }
    const f = _e(o);
    if (!xn(f)) {
      if (q(f) && !ct(f) && !Fe(f)) {
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
  if (G(e)) {
    const i = e.frames.flatMap((o) => {
      const r = ot(o.node, t);
      return r ? [r === o.node ? o : { ...o, node: r }] : [];
    });
    return i.length === 0 && !$n(e) ? null : { ...e, frames: i };
  }
  if (q(e)) {
    if (!ee(e, t)) return e;
    const i = ut(e), o = [];
    for (const f of e.panels) {
      if (ie(f)) {
        f !== t && o.push(f);
        continue;
      }
      const y = ot(f, t);
      y && o.push(y);
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
    return $n(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...he(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !ct(e) ? l : _e({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...he(e)
  });
}
function _a(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...he(e) };
}
function Ct(e, t, n, s, a) {
  const l = (m) => Lt(
    m,
    (k) => ee(k, n) ? Ct(k, t, n, s, a) : k
  );
  if (s === "float") return e;
  const i = (m) => Nt(m, n, (k) => Ct(k, t, n, s, a));
  if (s === "center")
    return q(e) ? Se(e, n) ? _a(e, t, a) : i(e) : G(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (m) => ee(m, n) ? Ct(m, t, n, s, a) : m
      )
    };
  const o = nc(s), r = s === "left" || s === "top", u = (m) => ({
    kind: "split",
    direction: o,
    children: r ? [De(t), m] : [m, De(t)],
    sizes: [0.5, 0.5]
  });
  if (q(e)) return Se(e, n) ? u(e) : i(e);
  if (G(e)) return l(e);
  const f = He(e), y = e.children.findIndex(
    (m) => q(m) && Se(m, n)
  );
  if (y >= 0 && e.direction === o) {
    const m = (f[y] ?? 0) / 2, k = [...e.children], x = [...f];
    return k.splice(r ? y : y + 1, 0, De(t)), x.splice(y, 1, m, m), {
      kind: "split",
      direction: o,
      children: k,
      sizes: x,
      ...he(e)
    };
  }
  const h = e.children.map((m) => ee(m, n) ? q(m) && Se(m, n) ? u(m) : Ct(m, t, n, s) : m);
  return {
    kind: "split",
    direction: e.direction,
    children: h,
    sizes: f,
    ...he(e)
  };
}
function mt(e, t) {
  if (q(e)) {
    if (Se(e, t))
      return fa(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((r) => !ie(r) && ee(r, t)), l = e.panels[a];
    if (l === void 0 || ie(l)) return e;
    const i = mt(l, t);
    if (i === l && e.active === t) return e;
    const o = [...e.panels];
    return o[a] = i, { ...e, panels: o, active: t };
  }
  if (!ee(e, t)) return e;
  if (G(e)) return Lt(e, (a) => mt(a, t));
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
    const i = Fe(e), o = i ? [...i] : void 0;
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
  return ee(e, t) ? G(e) ? Lt(e, (s) => Pt(s, t, n)) : { ...e, children: e.children.map((s) => Pt(s, t, n)) } : e;
}
function Ut(e, t, n) {
  if (t === n) return e;
  if (q(e)) {
    if (!ee(e, t) && !ee(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => ie(l) ? s(l) : Ut(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return G(e) ? Lt(e, (s) => Ut(s, t, n)) : { ...e, children: e.children.map((s) => Ut(s, t, n)) };
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
function ga(e, t, n) {
  if (q(e)) {
    const a = e.panels[t];
    if (a === void 0 || ie(a)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (G(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const l = [...e.frames];
    return l[t] = { ...a, node: n }, { ...e, frames: l };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function It(e, t, n) {
  const s = sn(e);
  if (!q(e) && s.some(({ node: a }) => q(a) && Se(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!ee(a, t)) continue;
    const i = It(a, t, n);
    return i ? ga(e, l, i) : null;
  }
  return null;
}
function Fu(e, t, n) {
  const s = It(
    e,
    t,
    (a) => bt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? _e(s) : e;
}
function ya(e) {
  return G(e) ? [e] : Fe(e) || ct(e) ? [e] : q(e) ? [...e.panels] : e.children.flatMap(ya);
}
function wa(e, t) {
  if (q(e)) return e;
  const n = Xn(e).map(ya), s = n.flat(), a = t && s.some((i) => Dt(i).includes(t)) ? t : void 0, l = fc(e, n);
  return _e({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...he(e),
    ...l ? { places: l } : {}
  });
}
function fc(e, t) {
  const n = G(e) ? e.frames.map(({ node: s, ...a }) => a) : Fe(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function pc(e, t) {
  const n = It(e, t, (s) => wa(s, t));
  return n ? _e(n) : e;
}
function Qn(e, t, n) {
  if (q(e) && Se(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of sn(e)) {
    if (!ee(s, t)) continue;
    const l = Qn(s, t, n);
    return l ? ga(e, a, l) : null;
  }
  return null;
}
function $s(e, t, n) {
  const s = Qn(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const l = Fe(a);
    return {
      ...Un(n, a.panels.map(Bn)),
      ...he(a),
      ...l ? { places: l } : {}
    };
  });
  return s ? _e(s) : e;
}
function Cn(e, t) {
  if (q(e)) return e;
  if (G(e)) {
    const a = e.frames.findIndex(
      (o) => q(o.node) && o.node.panels.includes(t)
    ), l = e.frames[a], i = l && q(l.node) ? l.node : null;
    if (l && i && i.panels.length > 1) {
      const o = Hn(i.panels.map(Bn), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...o, ...e.frames.slice(a + 1)]
      };
    }
    return Lt(e, (o) => Cn(o, t));
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = Cn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function vc(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (ge(e, t)?.node === s) {
    const i = Cn(e, t);
    return i === e ? e : _e(i);
  }
  const l = Qn(e, t, (i) => ({
    ...Wn(ba(i.panels.map(Bn), Fe(i), n)),
    ...he(i)
  }));
  return l ? _e(l) : e;
}
function ba(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Hn(e, n).frames;
}
function ka(e, t) {
  return { ...Wn(ba(e.children, Fe(e), t)), ...he(e) };
}
function Tu(e, t, n) {
  const s = It(
    e,
    t,
    (a) => G(a) ? a : ka(a, n)
  );
  return s ? _e(s) : q(e) && Se(e, t) ? Hn([e], n) : e;
}
function mc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function $a(e, t) {
  const n = mc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...he(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Lu(e, t, n = "row") {
  const s = It(
    e,
    t,
    (a) => G(a) ? $a(a, n) : a
  );
  return s ? _e(s) : e;
}
function xa(e) {
  if (G(e)) return null;
  const t = q(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ie(t) || q(t) && t.panels.length === 1 && ie(t.panels[0]) ? null : t;
}
const hc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function _c(e, t) {
  const n = xa(e);
  return n ? t === "inner" ? n : { ...hc(n), ...he(e) } : e;
}
function yt(e) {
  return e.title ? e.title : q(e) ? "" : G(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function At(e, t) {
  if (q(e)) {
    const s = e.panels[ut(e)];
    return s === void 0 ? "" : ie(s) ? t(s) ?? s : yt(s) || At(s, t);
  }
  if (e.title) return e.title;
  if (G(e)) {
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
    else if (G(n)) n = n.frames[s]?.node;
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
  if (G(e)) {
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
function Gt(e, t, n) {
  if (t.length === 0)
    return bt(e) ? { ...e, sizes: Yn(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (G(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const r = Gt(o.node, a, n);
    if (r === o.node) return e;
    const u = [...e.frames];
    return u[s] = { ...o, node: r }, { ...e, frames: u };
  }
  if (q(e)) {
    const o = e.panels[s];
    if (o === void 0 || ie(o)) return e;
    const r = Gt(o, a, n);
    if (r === o) return e;
    const u = [...e.panels];
    return u[s] = r, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const i = [...e.children];
  return i[s] = Gt(l, a, n), { ...e, children: i };
}
function xs(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const i = a + l;
  if (i < s * 2) return e;
  const o = [...e], r = Math.min(Math.max(a + n, s), i - s);
  return o[t] = r, o[t + 1] = i - r, o;
}
function tn(e) {
  if (!q(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ie(t) ? e : { ...Gn([gc(e)]), ...he(e) };
}
const gc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ms(e) {
  return e.length === 0 ? null : Gn(e.map(De));
}
function yc(e, t) {
  if (!e) return Ms(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const r of Ue(e))
    !n.has(r) || s.has(r) ? a.add(r) : s.add(r);
  let l = e;
  for (const r of a)
    l = l ? ot(l, r) : null;
  const i = new Set(l ? Ue(l) : []), o = t.filter((r) => !i.has(r));
  if (o.length === 0) return l ? tn(_e(l)) : null;
  if (!l) return Ms(o);
  if (G(l)) {
    const r = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (u, f) => nn(De(u), {
            x: rt.x + (r + f) * en,
            y: rt.y + (r + f) * en
          })
        )
      ]
    };
  }
  return tn(_e(Gn([l, ...o.map(De)])));
}
const Zn = Symbol("dc.windowContext");
function wc(e) {
  return En(Zn, e), e;
}
function Jn() {
  const e = _t(Zn, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const bc = ["data-dc-glyph"], kc = { class: "dc-glyph__line" }, $c = ["d"], xc = {
  key: 0,
  class: "dc-glyph__aqua"
}, Mc = ["d"], Cc = /* @__PURE__ */ ce({
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
      w("g", kc, [
        (p(!0), _(J, null, de(t[e.kind], (l) => (p(), _("path", {
          key: l,
          d: l
        }, null, 8, $c))), 128))
      ]),
      n[e.kind] ? (p(), _("g", xc, [
        (p(!0), _(J, null, de(n[e.kind], (l) => (p(), _("path", {
          key: l,
          d: l
        }, null, 8, Mc))), 128))
      ])) : O("", !0)
    ], 8, bc));
  }
}), ht = /* @__PURE__ */ ue(Cc, [["__scopeId", "data-v-4d2872c0"]]), Ec = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Sc = ["data-dc-movable"], Pc = { class: "dc-float__title dc-truncate" }, Ac = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, zc = ["aria-label", "aria-pressed", "data-dc-minimize"], Rc = ["aria-label", "aria-pressed", "data-dc-maximize"], Fc = ["aria-label", "data-dc-close"], Tc = { class: "dc-float__content" }, Lc = ["data-dc-handle", "onPointerdown"], Dc = /* @__PURE__ */ ce({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Jn(), s = g(() => ke(t.frame.node)), a = g(() => n.panelFor(s.value)?.fixed === !0), l = g(() => Ze(t.frame)), i = g(() => at(t.frame)), o = g(() => l.value || i.value), r = g(() => n.resizable.value && !a.value && !o.value), u = g(() => n.movable.value && !a.value && !o.value), f = g(() => {
      const T = Ue(t.frame.node);
      return T.length === 1 ? T[0] ?? null : null;
    }), y = g(() => f.value !== null && n.closable(f.value)), h = g(() => t.frame.node.headless === !0), m = g(
      () => !h.value && (!q(t.frame.node) || i.value)
    ), k = g(
      () => t.frame.title || yt(t.frame.node) || At(t.frame.node, (T) => n.panelFor(T)?.title)
    ), x = g(() => n.spaceMenu(t.path));
    function b(T) {
      T.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, T, "move");
    }
    function M(T) {
      T.target?.closest("button, a, input, select, textarea, label") || (i.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const F = g(() => {
      const T = n.framing.value;
      return T !== null && ee(t.frame.node, T);
    }), I = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : i.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${kn}px`,
        height: `${ua}px`
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
    return (T, V) => (p(), _("div", {
      class: "dc-float",
      style: Pe(I.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": i.value ? "true" : "false",
      "data-dc-dragging": F.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = ($) => E(n).raiseAt(e.path))
    }, [
      m.value ? (p(), _("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: b,
        onDblclick: M
      }, [
        w("span", Pc, A(k.value), 1),
        x.value.length ? (p(), oe(qn, {
          key: 0,
          items: x.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : O("", !0),
        !a.value || i.value && y.value && f.value ? (p(), _("div", Ac, [
          a.value ? O("", !0) : (p(), _("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${i.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": i.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = ($) => E(n).toggleMinimizeAt(e.path))
          }, [
            pe(ht, {
              kind: i.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, zc)),
          a.value ? O("", !0) : (p(), _("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = ($) => E(n).toggleMaximizeAt(e.path))
          }, [
            pe(ht, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Rc)),
          i.value && y.value && f.value ? (p(), _("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": f.value,
            onClick: V[2] || (V[2] = ($) => E(n).close(f.value))
          }, [
            pe(ht, { kind: "close" })
          ], 8, Fc)) : O("", !0)
        ])) : O("", !0)
      ], 40, Sc)) : O("", !0),
      w("div", Tc, [
        Be(T.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), _(J, null, de(r.value ? R : [], ($) => (p(), _("span", {
        key: $,
        class: "dc-float__grip",
        "data-dc-handle": $,
        "aria-hidden": "true",
        onPointerdown: qe((P) => E(n).beginFrameDragAt(e.path, P, $), ["stop"])
      }, null, 40, Lc))), 128))
    ], 44, Ec));
  }
}), Nc = /* @__PURE__ */ ue(Dc, [["__scopeId", "data-v-f035684c"]]), es = Symbol("dc.paneContext");
function Ic(e) {
  return En(es, e), e;
}
function Du() {
  return _t(es, null);
}
function Nu(e) {
  const t = _t(Zn, null), n = _t(es, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Mt(e)
  );
  return Ha() && Es(s), s;
}
const Oc = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Vc = ["data-dc-movable"], Kc = ["aria-label", "aria-pressed"], qc = ["data-dc-space-name"], Bc = { class: "dc-truncate" }, Wc = ["aria-label"], Hc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Uc = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Gc = { class: "dc-tab__name dc-truncate" }, Xc = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, jc = ["aria-label", "data-dc-close", "onClick"], Yc = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Qc = { class: "dc-pane__tools" }, Zc = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Jc = ["aria-label", "data-dc-minimize"], eu = ["aria-label", "aria-pressed", "data-dc-maximize"], tu = ["aria-label", "data-dc-close"], nu = ["id", "role", "aria-labelledby"], su = ["id", "role", "aria-labelledby"], au = ["data-dc-edge"], lu = /* @__PURE__ */ ce({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Jn(), s = Ps() ?? "dc-pane", a = g(
      () => t.group.panels.flatMap((L, K) => {
        if (!ie(L)) {
          const $e = yt(L) || At(L, (we) => n.panelFor(we)?.title);
          return [{ kind: "space", index: K, id: `space-${K}`, title: $e, node: L }];
        }
        const j = n.panelFor(L);
        return j ? [{ kind: "panel", index: K, id: L, title: j.title, panel: j }] : [];
      })
    ), l = g(() => a.value.length > 1), i = g(() => {
      const L = ut(t.group);
      return a.value.find((K) => K.index === L) ?? a.value[0] ?? null;
    }), o = g(() => i.value?.kind === "space" ? i.value.node : null), r = g(() => o.value ? "" : fa(t.group)), u = g(() => o.value ? null : n.panelFor(r.value)), f = g(() => i.value?.title ?? ""), y = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), h = g(() => [...t.path, i.value?.index ?? 0]), m = g(() => r.value || gs(t.group)[0] || ""), k = g(() => n.viewFor(r.value)), x = g(() => t.group.headless === !0), b = g(() => n.focused.value === r.value), M = g(() => n.dragging.value === r.value), F = g(() => n.moving.value === r.value), I = g(() => n.frameOf(m.value) !== null), R = g(() => n.panelFor(m.value)?.fixed === !0), T = g(
      () => !o.value && (n.canMove(r.value) || I.value && n.movable.value && !R.value)
    ), V = g(
      () => o.value ? n.spaceMenu(h.value) : n.menuFor(r.value)
    ), $ = (L) => n.closable(L);
    Ic({ panel: r });
    const P = g(() => n.maximized(m.value)), Z = g(
      () => I.value && !R.value || !l.value && !!u.value && $(u.value.id)
    ), re = (L) => `${s}-tab-${L}`, ve = g(() => `${s}-body`), Y = g(() => {
      const L = n.dropTarget.value;
      return !L || !Se(t.group, L.panel) || L.edge === "float" ? null : L;
    }), Me = g(() => Y.value?.index === void 0 ? Y.value?.edge ?? null : null), Ae = g(() => Y.value?.index ?? null), D = () => u.value ? n.renderContent(u.value, k.value, b.value) ?? null : null, X = () => u.value ? n.renderActions(u.value, k.value, b.value) ?? null : null;
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
      const j = me(K);
      j && n.selectPanel(j);
    }
    function Xe(L) {
      r.value && n.focus(r.value), !L.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (I.value ? n.beginFrameDrag(m.value, L, "move") : n.beginDrag(r.value, L));
    }
    function je(L) {
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
      if (!F.value) return;
      if (L.key === "Escape") {
        L.preventDefault(), n.toggleMoveMode(r.value);
        return;
      }
      const K = Ne[L.key];
      K && (L.preventDefault(), I.value ? n.nudgeFrame(r.value, K, L.shiftKey) : n.nudge(r.value, K, L.shiftKey));
    }
    function Oe(L) {
      !I.value || L.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(m.value);
    }
    function kt(L, K) {
      L.stopPropagation(), te = null, n.close(K);
    }
    function Ot(L, K) {
      const j = a.value.length;
      let $e = null;
      if (L.key === "ArrowRight" ? $e = (K + 1) % j : L.key === "ArrowLeft" ? $e = (K - 1 + j) % j : L.key === "Home" ? $e = 0 : L.key === "End" && ($e = j - 1), $e === null) return;
      L.preventDefault();
      const we = a.value[$e];
      if (!we) return;
      const $t = me(we);
      $t && n.selectPanel($t);
    }
    return (L, K) => i.value ? (p(), _("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": r.value || void 0,
      "data-dc-panels": E(gs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": I.value ? "true" : "false",
      "data-dc-maximized": P.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": b.value ? "true" : "false",
      "data-dc-dragging": M.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: K[7] || (K[7] = (j) => r.value && E(n).focus(r.value))
    }, [
      x.value ? O("", !0) : (p(), _("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": T.value ? "true" : "false",
        onPointerdown: Xe,
        onDblclick: Oe
      }, [
        T.value ? (p(), _("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": F.value,
          onPointerdown: je,
          onClick: Ye,
          onKeydown: Ie
        }, [...K[8] || (K[8] = [
          w("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Kc)) : O("", !0),
        y.value ? (p(), _("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": y.value
        }, [
          w("span", Bc, A(y.value), 1)
        ], 8, qc)) : O("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (p(!0), _(J, null, de(a.value, (j, $e) => (p(), _(J, {
            key: j.id
          }, [
            Ae.value === $e ? (p(), _("span", Hc)) : O("", !0),
            w("button", {
              id: re(j.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": j.kind === "panel" ? j.id : void 0,
              "data-dc-space": j.kind === "space" ? j.title : void 0,
              "aria-selected": j.index === i.value.index,
              "aria-controls": ve.value,
              tabindex: j.index === i.value.index ? 0 : -1,
              onPointerdown: (we) => Ce(we, j),
              onClick: (we) => Ge(we, j),
              onKeydown: (we) => Ot(we, $e)
            }, [
              w("span", Gc, A(j.title), 1),
              j.kind === "panel" && j.panel.subtitle ? (p(), _("span", Xc, A(j.panel.subtitle), 1)) : O("", !0),
              l.value && j.kind === "panel" && $(j.id) ? (p(), _("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${j.title}`,
                "data-dc-close": j.id,
                onPointerdown: K[0] || (K[0] = qe(() => {
                }, ["stop"])),
                onClick: (we) => kt(we, j.id)
              }, [...K[9] || (K[9] = [
                w("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, jc)) : O("", !0)
            ], 40, Uc)
          ], 64))), 128)),
          Ae.value === a.value.length ? (p(), _("span", Yc)) : O("", !0)
        ], 8, Wc),
        w("div", Qc, [
          pe(X),
          V.value.length ? (p(), oe(qn, {
            key: 0,
            items: V.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ]),
        Z.value ? (p(), _("div", Zc, [
          I.value && !R.value ? (p(), _("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": m.value,
            onPointerdown: K[1] || (K[1] = qe(() => {
            }, ["stop"])),
            onClick: K[2] || (K[2] = (j) => E(n).toggleMinimize(m.value))
          }, [
            pe(ht, { kind: "minimize" })
          ], 40, Jc)) : O("", !0),
          I.value && !R.value ? (p(), _("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${P.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": P.value,
            "data-dc-maximize": m.value,
            onPointerdown: K[3] || (K[3] = qe(() => {
            }, ["stop"])),
            onClick: K[4] || (K[4] = (j) => E(n).toggleMaximize(m.value))
          }, [
            pe(ht, {
              kind: P.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, eu)) : O("", !0),
          !l.value && u.value && $(u.value.id) ? (p(), _("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: K[5] || (K[5] = qe(() => {
            }, ["stop"])),
            onClick: K[6] || (K[6] = (j) => E(n).close(u.value.id))
          }, [
            pe(ht, { kind: "close" })
          ], 40, tu)) : O("", !0)
        ])) : O("", !0)
      ], 40, Vc)),
      o.value ? (p(), _("div", {
        key: 1,
        id: ve.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : re(i.value.id)
      }, [
        Be(L.$slots, "space", {
          node: o.value,
          path: h.value
        }, void 0, !0)
      ], 8, nu)) : (p(), _("div", {
        key: 2,
        id: ve.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : re(r.value)
      }, [
        pe(D)
      ], 8, su)),
      Me.value ? (p(), _("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Me.value,
        "aria-hidden": "true"
      }, null, 8, au)) : O("", !0)
    ], 40, Oc)) : O("", !0);
  }
}), Ma = /* @__PURE__ */ ue(lu, [["__scopeId", "data-v-44fd2b2d"]]), ru = ["data-dc-space", "data-dc-path", "aria-label"], ou = {
  key: 0,
  class: "dc-space__head"
}, iu = { class: "dc-space__title dc-truncate" }, cu = ["data-dc-direction"], uu = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, du = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], fu = /* @__PURE__ */ ce({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Jn(), s = W(null), a = g(() => q(t.node) ? t.node : null), l = g(() => bt(t.node) ? t.node : null), i = g(() => G(t.node) ? t.node : null), o = g(
      () => l.value ? l.value.children : i.value?.frames.map((D) => D.node) ?? []
    ), r = g(() => l.value ? He(l.value) : []), u = g(
      () => (i.value?.frames ?? []).map((D, X) => ({
        held: D,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: X,
        key: $(D.node),
        path: [...t.path, X]
      })).sort((D, X) => D.key < X.key ? -1 : D.key > X.key ? 1 : 0)
    ), f = g(() => yt(t.node)), y = g(() => n.spaceMenu(t.path)), h = g(() => t.node.headless === !0), m = g(() => i.value ? "desktop" : l.value?.direction ?? ""), k = W(null), x = W(0);
    let b = null;
    xe(
      k,
      (D) => {
        b?.disconnect(), b = null, !(!D || typeof ResizeObserver > "u") && (x.value = D.clientWidth, b = new ResizeObserver(([X]) => {
          x.value = X?.contentRect.width ?? 0;
        }), b.observe(D));
      },
      { immediate: !0 }
    ), et(() => b?.disconnect());
    const M = g(() => {
      const D = Math.max(
        1,
        Math.floor((x.value + dt) / (kn + dt))
      ), X = /* @__PURE__ */ new Map();
      let te = 0;
      for (const ne of u.value)
        ne.held.minimized === !0 && (X.set(ne.key, {
          x: dt + te % D * (kn + dt),
          bottom: dt + Math.floor(te / D) * (ua + dt)
        }), te += 1);
      return X;
    }), F = (D) => !!D && D.join("/") === t.path.join("/"), I = g(() => {
      const D = n.dropTarget.value, X = i.value;
      if (!X || !D?.rect || D.edge !== "float") return null;
      if (D.space) return F(D.space) ? D.rect : null;
      const te = ge(X, D.panel);
      return te && X.frames.includes(te) ? D.rect : null;
    }), R = g(() => {
      const D = n.dropTarget.value;
      return !!D && !D.rect && F(D.space);
    }), T = g(() => l.value?.direction === "row"), V = g(() => o.value.map((D, X) => [...t.path, X])), $ = (D) => [...Ue(D)].sort().join("/"), P = (D) => {
      const X = Ue(D)[0];
      return (X ? n.panelFor(X)?.title : null) ?? X ?? "panel";
    }, Z = (D) => {
      const X = o.value[D], te = o.value[D + 1];
      return !X || !te ? "Resize panels" : `Resize ${P(X)} and ${P(te)}`;
    }, re = (D) => {
      const X = r.value[D] ?? 0, te = r.value[D + 1] ?? 0, ne = X + te;
      return ne > 0 ? Math.round(X / ne * 100) : 50;
    };
    function ve() {
      const D = s.value, X = D ? T.value ? D.clientWidth : D.clientHeight : 0;
      return X <= 0 ? 0.05 : Math.min(n.minPanelSize.value / X, 0.4);
    }
    let Y = null;
    function Me(D, X) {
      const te = l.value, ne = s.value;
      if (!n.resizable.value || !te || !ne || D.button !== 0) return;
      const me = T.value ? ne.clientWidth : ne.clientHeight;
      if (me <= 0) return;
      const Ce = T.value ? D.clientX : D.clientY, Ge = He(te), Xe = Math.min(n.minPanelSize.value / me, 0.4);
      D.preventDefault();
      const je = (Ie) => {
        const Oe = ((T.value ? Ie.clientX : Ie.clientY) - Ce) / me;
        n.setSizes(t.path, xs(Ge, X, Oe, Xe));
      }, Ye = () => Y?.(), Ne = (Ie) => {
        Ie.key === "Escape" && (n.setSizes(t.path, Ge), Y?.());
      };
      Y = () => {
        window.removeEventListener("pointermove", je), window.removeEventListener("pointerup", Ye), window.removeEventListener("pointercancel", Ye), window.removeEventListener("keydown", Ne), Y = null;
      }, window.addEventListener("pointermove", je), window.addEventListener("pointerup", Ye), window.addEventListener("pointercancel", Ye), window.addEventListener("keydown", Ne);
    }
    et(() => Y?.());
    function Ae(D, X) {
      const te = l.value;
      if (!n.resizable.value || !te) return;
      const ne = T.value ? "ArrowRight" : "ArrowDown", me = T.value ? "ArrowLeft" : "ArrowUp", Ce = D.shiftKey ? 0.1 : 0.02;
      if (D.key !== ne && D.key !== me) return;
      const Ge = D.key === ne ? Ce : -Ce;
      D.preventDefault(), n.setSizes(t.path, xs(He(te), X, Ge, ve()));
    }
    return (D, X) => {
      const te = As("WindowNode", !0);
      return a.value ? (p(), oe(Ma, {
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
        !e.framed && !h.value ? (p(), _("header", ou, [
          w("span", iu, A(f.value), 1),
          y.value.length ? (p(), oe(qn, {
            key: 0,
            items: y.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ])) : O("", !0),
        i.value ? (p(), _("div", {
          key: 1,
          ref_key: "desktop",
          ref: k,
          class: "dc-window__desktop"
        }, [
          I.value ? (p(), _("div", {
            key: 0,
            class: "dc-window__drop",
            style: Pe({
              left: `${I.value.x}px`,
              top: `${I.value.y}px`,
              width: `${I.value.w}px`,
              height: `${I.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          (p(!0), _(J, null, de(u.value, (ne) => (p(), oe(Nc, {
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
        ], 512)) : l.value ? (p(), _("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          R.value ? (p(), _("div", uu)) : O("", !0),
          (p(!0), _(J, null, de(o.value, (ne, me) => (p(), _(J, {
            key: $(ne)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: Pe({ flexGrow: r.value[me] ?? 1 })
            }, [
              pe(te, {
                node: ne,
                path: V.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < o.value.length - 1 ? (p(), _("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": T.value ? "vertical" : "horizontal",
              "aria-label": Z(me),
              "aria-valuenow": re(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Ce) => Me(Ce, me),
              onKeydown: (Ce) => Ae(Ce, me)
            }, null, 40, du)) : O("", !0)
          ], 64))), 128))
        ], 8, cu)) : O("", !0)
      ], 8, ru));
    };
  }
}), pu = /* @__PURE__ */ ue(fu, [["__scopeId", "data-v-fb5b403f"]]), vu = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], mu = {
  key: 1,
  class: "dc-window__empty"
}, hu = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Bt = 16, _u = /* @__PURE__ */ ce({
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
    const s = e, a = n, l = Qt(e, "layout"), i = Qt(e, "views"), o = Sn(), r = g(() => new Map(s.panels.map((c) => [c.id, c]))), u = g(() => s.panels.map((c) => c.id)), f = g(() => yc(l.value, u.value)), y = W(null), h = W(null), m = W(null), k = W(!0), x = W(null), b = W(null), M = W(null), F = W(""), I = W(null);
    function R() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function T(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function V() {
      return R().map((c) => ({ pane: c, order: T(c.element) })).sort((c, d) => {
        const v = Math.max(c.order.length, d.order.length);
        for (let C = 0; C < v; C += 1) {
          const S = (c.order[C] ?? -1) - (d.order[C] ?? -1);
          if (S !== 0) return S;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const $ = (c) => R().find((d) => d.panels.includes(c)) ?? null;
    function P(c) {
      const d = r.value.get(c);
      if (!d) return "";
      const v = i.value[c];
      return v && d.views?.some((C) => C.key === v) ? v : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function Z(c, d) {
      i.value = { ...i.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const re = g(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ve(c) {
      return !s.movable || re.value < 1 || s.panels.length < 2 ? !1 : r.value.get(c)?.fixed !== !0;
    }
    function Y(c, d) {
      const v = f.value;
      !c || !v || c === v || (l.value = c, d && a("panel-move", d));
    }
    function Me(c, d, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const C = (d - c.left) / c.width, S = (v - c.top) / c.height, z = 0.3;
      return C > z && C < 1 - z && S > z && S < 1 - z ? "center" : [
        { edge: "left", distance: C },
        { edge: "right", distance: 1 - C },
        { edge: "top", distance: S },
        { edge: "bottom", distance: 1 - S }
      ].reduce(
        (Q, N) => N.distance < Q.distance ? N : Q
      ).edge;
    }
    function Ae(c, d) {
      const v = [...c.querySelectorAll(".dc-tab")], C = v.findIndex((S) => {
        const z = S.getBoundingClientRect();
        return d < z.left + z.width / 2;
      });
      return C === -1 ? v.length : C;
    }
    function D(c, d, v) {
      for (const { panels: C, element: S } of V().reverse()) {
        const z = S.getBoundingClientRect();
        if (c < z.left || c > z.right || d < z.top || d > z.bottom) continue;
        const ae = C.find((H) => H !== v), Q = S.querySelector(".dc-pane__tabs"), N = Q?.getBoundingClientRect();
        if (Q && N && d >= N.top && d <= N.bottom)
          return ae ? { panel: ae, edge: "center", index: Ae(Q, c) } : null;
        const B = S.querySelector(":scope > .dc-pane__space");
        if (B) {
          const H = B.getBoundingClientRect();
          if (c >= H.left && c <= H.right && d >= H.top && d <= H.bottom) continue;
        }
        return ae ? { panel: ae, edge: Me(z, c, d) } : null;
      }
      return te(c, d, v) ?? Ce(c, d);
    }
    function X() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function te(c, d, v) {
      const C = f.value;
      if (!C) return null;
      for (const S of X()) {
        const z = S.getBoundingClientRect();
        if (c < z.left || c > z.right || d < z.top || d > z.bottom) continue;
        const ae = Ge(S), Q = ae.flatMap((se) => se.panels).find((se) => se !== v);
        if (!Q && ae.length > 0) return null;
        const N = ge(C, v)?.rect, B = fn(
          {
            x: c - z.left - 24,
            y: d - z.top - 12,
            w: N?.w ?? rt.w,
            h: N?.h ?? rt.h
          },
          { w: S.clientWidth, h: S.clientHeight },
          s.minPanelSize
        );
        if (Q) return { panel: Q, edge: "float", rect: B };
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
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((d) => d.closest(".dc-window") === c).filter((d) => !d.querySelector(".dc-pane")).reverse().flatMap((d) => {
        const v = ne(d);
        return v ? [{ element: d, path: v }] : [];
      }) : [];
    }
    function Ce(c, d) {
      for (const { element: v, path: C } of me()) {
        if (v.dataset.dcSpace === "desktop") continue;
        const S = v.getBoundingClientRect();
        if (!(c < S.left || c > S.right || d < S.top || d > S.bottom))
          return { panel: "", space: C, edge: "center" };
      }
      return null;
    }
    function Ge(c) {
      return R().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let Xe = null;
    const je = (c) => c.altKey;
    function Ye(c, d) {
      if (!ve(c) || h.value || b.value || d.button !== 0) return;
      const v = d.clientX, C = d.clientY;
      let S = !1, z = je(d);
      const ae = () => {
        const le = M.value;
        le && (m.value = z ? te(le.x, le.y, c) : D(le.x, le.y, c));
      }, Q = (le) => {
        if (!S) {
          if (Math.hypot(le.clientX - v, le.clientY - C) < 4) return;
          S = !0, h.value = c, x.value = null;
        }
        z = je(le), k.value = !z, M.value = { x: le.clientX, y: le.clientY }, ae();
      }, N = (le) => {
        je(le) !== z && (z = !z, k.value = !z, S && ae());
      }, B = (le) => {
        Xe?.();
        const U = m.value, be = f.value;
        if (le && S && U && be) {
          const Qe = U.space ? ks(be, c, U.space, U.rect) : U.edge === "float" && U.rect ? bs(be, c, U.panel, U.rect) : qt(be, c, U.panel, U.edge, U.index);
          Y(Qe, {
            panel: c,
            target: U.panel,
            edge: U.edge,
            ...U.space === void 0 ? {} : { space: U.space },
            ...U.index === void 0 ? {} : { index: U.index },
            ...U.rect === void 0 ? {} : { rect: U.rect }
          });
        }
        h.value = null, m.value = null, M.value = null, k.value = !0;
      }, H = () => B(!0), se = () => B(!1), fe = (le) => {
        if (le.key === "Escape") {
          B(!1);
          return;
        }
        N(le);
      };
      Xe = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", H), window.removeEventListener("pointercancel", se), window.removeEventListener("keydown", fe), window.removeEventListener("keyup", N), Xe = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", H), window.addEventListener("pointercancel", se), window.addEventListener("keydown", fe), window.addEventListener("keyup", N);
    }
    et(() => Xe?.());
    let Ne = null;
    function Ie(c) {
      const d = I.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((S) => S.closest(".dc-window") === d)?.parentElement ?? null : null;
    }
    function Oe(c) {
      const d = f.value;
      return d ? Mn(d, c) : null;
    }
    function kt(c) {
      const d = f.value;
      if (!d) return;
      const v = St(d, c);
      v !== d && (l.value = v);
    }
    function Ot(c) {
      const d = Oe(c);
      d && kt(d);
    }
    function L(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && Ze(v);
    }
    function K(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && at(v);
    }
    function j(c) {
      const d = f.value, v = d ? st(d, c) : null;
      return v ? ke(v.node) : "";
    }
    function $e(c) {
      const d = f.value, v = d ? st(d, c) : null;
      if (!d || !v) return;
      const C = ke(v.node);
      if (r.value.get(C)?.fixed === !0) return;
      const S = !at(v);
      let z = ic(d, c, S);
      z !== d && (S || (z = St(z, c)), l.value = z, a("frame-minimize", { panel: C, minimized: S }));
    }
    function we(c) {
      const d = Oe(c);
      d && $e(d);
    }
    function $t(c) {
      const d = f.value, v = d ? st(d, c) : null;
      if (!d || !v) return;
      const C = ke(v.node);
      if (r.value.get(C)?.fixed === !0) return;
      const S = !Ze(v);
      let z = oc(d, c, S);
      z !== d && (S && (z = St(z, c)), l.value = z, a("frame-maximize", { panel: C, maximized: S }));
    }
    function ts(c) {
      const d = Oe(c);
      d && $t(d);
    }
    function ns(c, d, v) {
      const C = f.value, S = C ? st(C, c) : null;
      if (!C || !S || d.button !== 0 || h.value || b.value) return;
      const z = ke(S.node);
      if (r.value.get(z)?.fixed === !0 || Ze(S) || at(S) || (v === "move" ? !s.movable : !s.resizable)) return;
      const ae = Ie(c), Q = cc(C, c);
      kt(c);
      const N = { w: ae?.clientWidth ?? 0, h: ae?.clientHeight ?? 0 }, B = { ...S.rect }, H = d.clientX, se = d.clientY, fe = s.minPanelSize;
      b.value = z;
      const le = (Ee) => {
        const Ve = f.value;
        if (!Ve) return;
        const xt = ws(Ve, Q, fn(Ee, N, fe));
        xt !== Ve && (l.value = xt);
      }, U = (Ee) => {
        Ee.preventDefault();
        const Ve = Ee.clientX - H, xt = Ee.clientY - se;
        le(
          v === "move" ? { ...B, x: B.x + Ve, y: B.y + xt } : ys(B, v, Ve, xt, fe)
        );
      }, be = (Ee) => {
        if (Ne?.(), b.value = null, !Ee) {
          le(B);
          return;
        }
        const Ve = f.value ? st(f.value, Q) : null;
        Ve && a("frame-change", { panel: j(Q), rect: Ve.rect });
      }, Qe = () => be(!0), tt = () => be(!1), nt = (Ee) => {
        Ee.key === "Escape" && be(!1);
      };
      Ne = () => {
        window.removeEventListener("pointermove", U), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", tt), window.removeEventListener("keydown", nt), Ne = null;
      }, window.addEventListener("pointermove", U), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", tt), window.addEventListener("keydown", nt);
    }
    function Ca(c, d, v) {
      const C = Oe(c);
      C && ns(C, d, v);
    }
    function Ea(c, d, v = !1) {
      const C = f.value, S = Oe(c), z = C && S ? st(C, S) : null;
      if (!C || !S || !z || r.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Ze(z) || at(z)) {
        F.value = `${Te(c)} is ${Ze(z) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ae = d === "left" ? -Bt : d === "right" ? Bt : 0, Q = d === "up" ? -Bt : d === "down" ? Bt : 0, N = Ie(S), B = { w: N?.clientWidth ?? 0, h: N?.clientHeight ?? 0 }, H = v ? ys(z.rect, "se", ae, Q, s.minPanelSize) : { ...z.rect, x: z.rect.x + ae, y: z.rect.y + Q }, se = ws(C, S, fn(H, B, s.minPanelSize));
      if (se === C) {
        F.value = v ? `${Te(c)} cannot be resized further.` : `${Te(c)} cannot move ${d}.`;
        return;
      }
      l.value = se;
      const fe = st(se, S);
      fe && (a("frame-change", { panel: c, rect: fe.rect }), F.value = v ? `${Te(c)} resized to ${fe.rect.w} by ${fe.rect.h}.` : `${Te(c)} moved to ${fe.rect.x}, ${fe.rect.y}.`);
    }
    et(() => Ne?.());
    function Sa(c, d) {
      const v = $(c), C = v?.element.getBoundingClientRect();
      if (!v || !C) return null;
      const S = d === "left" || d === "right", z = (N) => {
        if (!(S ? N.bottom > C.top + 1 && N.top < C.bottom - 1 : N.right > C.left + 1 && N.left < C.right - 1)) return null;
        const H = d === "left" ? C.left - N.right : d === "right" ? N.left - C.right : d === "up" ? C.top - N.bottom : N.top - C.bottom;
        return H < -1 ? null : H;
      }, ae = [];
      for (const N of R()) {
        if (N === v || N.element === v.element) continue;
        const B = z(N.element.getBoundingClientRect());
        if (B === null) continue;
        const H = N.panels.find((se) => se !== c);
        H && ae.push({ to: { panel: H }, distance: B });
      }
      for (const { element: N, path: B } of me()) {
        const H = z(N.getBoundingClientRect());
        H !== null && ae.push({ to: { space: B }, distance: H });
      }
      return ae.reduce(
        (N, B) => N && N.distance <= B.distance ? N : B,
        null
      )?.to ?? null;
    }
    function Pa(c) {
      const d = f.value ? ge(f.value, c) !== null : !1;
      if (!d && !ve(c)) return;
      x.value = x.value === c ? null : c;
      const v = Te(c);
      if (!x.value) {
        F.value = `${v}: move mode off.`;
        return;
      }
      F.value = d ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Te = (c) => r.value.get(c)?.title ?? c, Aa = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function za(c, d, v = !1) {
      if (!ve(c)) return;
      const C = f.value;
      if (!C) return;
      const S = Te(c), z = pt(C, c);
      if (!v && z && (d === "left" || d === "right") && z.panels.length > 1) {
        const se = z.panels.indexOf(c), fe = d === "left" ? se - 1 : se + 1;
        if (fe >= 0 && fe < z.panels.length) {
          Y(Pt(C, c, fe), { panel: c, target: c, edge: "center", index: fe }), F.value = `${S} moved ${d}, now tab ${fe + 1} of ${z.panels.length}.`, an(c);
          return;
        }
      }
      const Q = Sa(c, d);
      if (!Q || Q.panel !== void 0 && !ve(Q.panel)) {
        F.value = `${S} cannot move ${d}.`;
        return;
      }
      const N = Aa[d];
      if (Q.space) {
        const se = Q.space, fe = Je(C, se), le = ge(C, c)?.rect, U = { ...rt, ...le ? { w: le.w, h: le.h } : {} };
        Y(ks(C, c, se, U), { panel: c, target: "", space: se, edge: N }), F.value = `${S} moved ${d}, into ${fe ? yt(fe) : "the space"}.`, an(c);
        return;
      }
      const B = Q.panel, H = z?.panels.length === 1 && pt(C, B)?.panels.length === 1;
      v ? (Y(qt(C, c, B, "center"), {
        panel: c,
        target: B,
        edge: "center"
      }), F.value = `${S} joined ${Te(B)} as a tab.`) : H ? (Y(Ut(C, c, B), { panel: c, target: B, edge: N }), F.value = `${S} moved ${d}, trading places with ${Te(B)}.`) : (Y(qt(C, c, B, N), { panel: c, target: B, edge: N }), F.value = `${S} moved ${d}, beside ${Te(B)}.`), an(c);
    }
    function an(c) {
      zt(() => {
        $(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Ra(c, d) {
      const v = f.value;
      v && (l.value = Gt(v, c, d));
    }
    function ln(c) {
      const d = f.value;
      if (!d) return;
      const v = mt(d, c);
      v !== d && (l.value = v, a("tab-select", { panel: c }));
    }
    function ss(c) {
      return r.value.get(c)?.closable ?? s.closable;
    }
    function Fa(c) {
      ss(c) && a("panel-close", c);
    }
    const rn = W(/* @__PURE__ */ new Map());
    let Ta = 0;
    function La(c, d) {
      const v = Ta += 1;
      return rn.value.set(v, { panel: c, items: d }), () => {
        rn.value.delete(v);
      };
    }
    function Da(c) {
      const d = [];
      for (const v of rn.value.values())
        v.panel() === c && d.push(...v.items());
      return d;
    }
    function as(c) {
      const d = c.filter((v) => v.items.length > 0);
      return d.length < 2 ? d.flatMap((v) => v.items) : d.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const ls = (c) => c.title || "These tabs";
    function Na(c, d) {
      const v = d.id, C = pt(c, v), S = (C?.panels.length ?? 0) > 1, z = C?.fixedView === !0, ae = (H) => ({
        action: () => {
          H !== c && (l.value = H);
        }
      }), Q = [], N = [], B = d.views ?? [];
      if (B.length > 1 && !z) {
        const H = P(v);
        Q.push({
          id: "view",
          label: "View",
          items: B.map((se) => ({
            id: `view-${se.key}`,
            label: se.label,
            checked: se.key === H,
            action: () => Z(v, se.key)
          }))
        });
      }
      return S && !z && N.push(
        { id: "show-row", label: "Row", checked: !1, ...ae($s(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ae($s(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ae(pc(c, v))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ae(vc(c, v))
        }
      ), S && C && (N.length && N.push({ separator: !0 }), N.push(...rs(C, v))), { panel: Q, tabs: N, tabsTitle: C ? ls(C) : "" };
    }
    function rs(c, d) {
      const v = ut(c), C = (S) => {
        const z = c.panels[(v + S + c.panels.length) % c.panels.length];
        return (z === void 0 ? "" : ke(z)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => ln(C(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => ln(C(-1)) }
      ];
    }
    function Vt(c) {
      return c.title ? c.title : q(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : yt(c);
    }
    function os(c) {
      if (!c || G(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Fe(c)) return null;
      const d = xa(c);
      return d && d.fixedView !== !0 ? d : null;
    }
    function Ia(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const v = Je(d, c);
      if (!v || q(v)) return [];
      if (v.fixedView) return [];
      const C = G(v) ? "desktop" : v.direction, S = (U, be, Qe) => ({
        id: `show-${U}`,
        label: be,
        checked: C === U,
        action: () => {
          const tt = f.value, nt = Qe();
          !tt || nt === v || (l.value = tn(_e(it(tt, c, nt))));
        }
      }), z = () => {
        const U = wa(v, Oa(v));
        if (q(U) && U.panels.length === 0) return v;
        const be = q(U) && U.panels.length === 1 ? U.panels[0] : void 0;
        return be !== void 0 && ie(be) ? v : U;
      }, ae = (U) => () => G(v) ? $a(v, U) : v.direction === U ? v : { ...v, direction: U }, Q = c.slice(0, -1), N = c.length > 0 ? Je(d, Q) : null, B = N && q(N) && N.panels.length > 1 ? N : null, H = N && os(N) === v ? N : null, se = os(v), fe = v.title || "this space", le = (U, be, Qe, tt, nt) => ({
        id: U,
        label: nt,
        action: () => {
          const Ee = f.value;
          Ee && (l.value = tn(_e(it(Ee, be, _c(Qe, tt)))));
        }
      });
      return as([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            S("row", "Row", ae("row")),
            S("column", "Column", ae("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            S("tabs", "Tabs", () => z()),
            S("desktop", "Desktop", () => G(v) ? v : ka(v))
          ]
        },
        {
          id: "about-around",
          title: se ? `Around ${Vt(se)}` : "",
          items: se ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...se.title ? [] : [le("merge-around-keep-this", c, v, "outer", `Keep ${fe}`)],
            ...v.title ? [] : [le("merge-around-keep-that", c, v, "inner", `Keep ${Vt(se)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: H ? `Inside ${Vt(H)}` : "",
          items: H ? [
            ...v.title ? [] : [le("merge-inside-keep-that", Q, H, "outer", `Keep ${Vt(H)}`)],
            ...H.title ? [] : [le("merge-inside-keep-this", Q, H, "inner", `Keep ${fe}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: B ? ls(B) : "",
          items: B ? rs(B, ke(v)) : []
        }
      ]);
    }
    function Oa(c) {
      const d = y.value;
      return d && ee(c, d) ? d : void 0;
    }
    function Va(c) {
      const d = f.value, v = r.value.get(c);
      if (!d || !v) return [];
      const C = s.menu ? Na(d, v) : null, S = Da(c);
      S.length && C?.panel.length && S.push({ separator: !0 }), C && S.push(...C.panel);
      const z = as([
        { id: "about-panel", title: v.title, items: S },
        { id: "about-tabs", title: C?.tabsTitle ?? "", items: C?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, z) : z;
    }
    function Ka(c, d) {
      return o[`${c}-${d}`] ?? o[c];
    }
    function is(c, d, v, C) {
      return Ka(c, d.id)?.({ panel: d, view: v, active: C });
    }
    wc({
      panelFor: (c) => r.value.get(c) ?? null,
      viewFor: P,
      setView: Z,
      movable: g(() => s.movable),
      resizable: g(() => s.resizable),
      minPanelSize: g(() => s.minPanelSize),
      spaceNames: g(() => s.spaceNames),
      focused: y,
      dragging: h,
      dropTarget: m,
      moving: x,
      framing: b,
      canMove: ve,
      focus(c) {
        y.value !== c && (y.value = c, a("panel-activate", c));
      },
      selectPanel: ln,
      beginDrag: Ye,
      toggleMoveMode: Pa,
      nudge: za,
      setSizes: Ra,
      frameOf: (c) => f.value ? ge(f.value, c) : null,
      beginFrameDrag: Ca,
      nudgeFrame: Ea,
      raise: Ot,
      maximized: L,
      toggleMaximize: ts,
      minimized: K,
      toggleMinimize: we,
      beginFrameDragAt: ns,
      raiseAt: kt,
      toggleMaximizeAt: $t,
      toggleMinimizeAt: $e,
      menuFor: Va,
      spaceMenu: Ia,
      registerMenu: La,
      closable: ss,
      close: Fa,
      renderContent: (c, d, v) => is("panel", c, d, v),
      renderActions: (c, d, v) => is("actions", c, d, v),
      layout: f
    });
    const qa = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), Ba = () => {
      const c = h.value, d = M.value;
      return !c || !d ? null : Ua(
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
        const S = f.value;
        S && Y(qt(S, c, d, v, C), {
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
        C && Y(bs(C, c, d, v), {
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
        const C = ac(v, c, d);
        if (C === v) return;
        l.value = C;
        const S = ge(C, c);
        S && a("frame-change", { panel: c, rect: S.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: Z,
      /** Brings a floating frame to the front of its stack. */
      raise: Ot,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ts,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: we
    }), (c, d) => (p(), _("div", {
      ref_key: "root",
      ref: I,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": h.value ? "true" : "false",
      "data-dc-docking": k.value ? "true" : "false",
      style: Pe(qa.value)
    }, [
      f.value ? (p(), oe(pu, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (p(), _("p", mu, " This window has no panels. ")),
      pe(Ba),
      w("p", hu, A(F.value), 1)
    ], 12, vu));
  }
}), gu = /* @__PURE__ */ ue(_u, [["__scopeId", "data-v-711565af"]]);
function Iu(e = "", t = "/") {
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
function Cs(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function Ou(e) {
  const t = W(Cs(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), s = xe(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Cs(a);
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
const yu = {
  DataShell: Ii,
  ShellHeader: Qs,
  QueryPanel: Js,
  ResultsArea: oa,
  FacetControl: Zs,
  SegmentedControl: wn,
  StatusPill: Rt,
  ScoreMeter: Kn,
  WindowFrame: gu,
  WindowPane: Ma,
  ListView: bn,
  CardsView: ta,
  GridView: na,
  TableView: la,
  LinksView: sa,
  PreviewView: aa,
  TypeCardsView: ra
}, Vu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(yu))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ts, t.route);
  }
};
export {
  en as CASCADE_STEP,
  xu as COLUMN_BREAKPOINTS,
  $u as COLUMN_ROLES,
  ta as CardsView,
  _s as ColumnCell,
  rt as DEFAULT_FRAME,
  _n as DEFAULT_SORT,
  Qa as DEFAULT_VIEW,
  Ii as DataShell,
  Bu as EMPTY_CELL,
  Gs as ENTITY_ALL,
  yn as ENTITY_TERM,
  On as FACET_PREFIX,
  Zs as FacetControl,
  Wu as GENERIC_NAMES,
  na as GridView,
  Vu as HeaderContentLayoutPlugin,
  sa as LinksView,
  bn as ListView,
  dt as MINIMIZED_GAP,
  ua as MINIMIZED_HEIGHT,
  kn as MINIMIZED_WIDTH,
  ca as MIN_FRAME,
  vs as MOCK_TINTS,
  Cu as MenuBar,
  qn as MenuButton,
  ia as MenuList,
  Ft as MetricDrill,
  es as PANE_CONTEXT_KEY,
  Dn as PARAM_DIR,
  Fn as PARAM_ENTITY,
  Nn as PARAM_EXPR,
  In as PARAM_PAGE,
  Ln as PARAM_SORT,
  Tn as PARAM_VIEW,
  Vn as PinStar,
  aa as PreviewView,
  Js as QueryPanel,
  Kt as RECORD_STATUSES,
  Bs as RESULT_FIELDS,
  Ts as ROUTE_ADAPTER_KEY,
  oa as ResultsArea,
  Us as SHELL_CONTEXT_KEY,
  ku as SHELL_THEMES,
  Tt as ScopeMark,
  Kn as ScoreMeter,
  wn as SegmentedControl,
  Qs as ShellHeader,
  Rt as StatusPill,
  la as TableView,
  ra as TypeCardsView,
  Ls as VIEW_KINDS,
  Zn as WINDOW_CONTEXT_KEY,
  gu as WindowFrame,
  Ma as WindowPane,
  fa as activePanel,
  ut as activeTab,
  wl as addTerm,
  nc as axisOf,
  Hn as cascade,
  Fs as cellFull,
  Pn as cellText,
  on as cellTextOf,
  Le as cellValue,
  ps as changesResults,
  fn as clampRect,
  wa as collapseSpace,
  pc as collapseToTabs,
  Su as column,
  us as columnAlign,
  ds as columnClass,
  fs as columnKey,
  hn as columnTruncates,
  ja as columnsFor,
  Ja as countPages,
  Ya as createHistoryAdapter,
  Iu as createMemoryAdapter,
  _l as createMockDataSource,
  Ou as createVueRouterAdapter,
  Hu as defaultCellText,
  Uu as defaultColumns,
  Ms as defaultLayout,
  Rn as defaultQuery,
  bl as drillExpression,
  ks as dropIntoSpace,
  Jt as emptyFacetState,
  An as emptyFacetValue,
  ft as findEntity,
  lt as findSort,
  Au as fixedView,
  Wn as float,
  bs as floatPanel,
  ka as floatSplit,
  vc as floatTabs,
  Wt as fnv1a,
  Ns as focusEntity,
  Gu as formatDate,
  Xu as formatMetric,
  Ga as formatOrdinal,
  Rs as formatPercent,
  nn as frame,
  st as frameAt,
  ge as frameOf,
  Mn as framePathOf,
  ke as frontPanel,
  vl as generateRows,
  Eu as group,
  pt as groupOf,
  sc as groups,
  Ks as hasActiveFacets,
  ee as hasPanel,
  Pu as headless,
  Ct as insertPanel,
  Et as isChoosable,
  Mu as isEntityScoped,
  Vs as isFacetActive,
  G as isFloat,
  q as isGroup,
  Ze as isMaximized,
  at as isMinimized,
  ie as isPanelTab,
  zn as isPristineQuery,
  bt as isSplit,
  Se as isTabOf,
  qs as isTypeCardsQuery,
  Ds as isViewKind,
  ol as matchesExpression,
  ml as matchesFacets,
  lc as maximizeFrame,
  oc as maximizeFrameAt,
  _c as mergeSpace,
  rc as minimizeFrame,
  ic as minimizeFrameAt,
  qt as movePanel,
  Pt as moveTab,
  Je as nodeAt,
  At as nodeTitle,
  _e as normalizeLayout,
  We as normalizeSearch,
  Yn as normalizeSizes,
  xa as onlySpace,
  Ue as panelIds,
  De as panelNode,
  gs as panelTabs,
  nl as parseExpression,
  Sl as parseQuery,
  Nr as presentParts,
  ea as presentRow,
  Ic as providePaneContext,
  kl as provideShellContext,
  wc as provideWindowContext,
  pn as raiseFrame,
  St as raiseFrameAt,
  cc as raisedPath,
  Ws as reconcileFacets,
  yc as reconcileLayout,
  ot as removePanel,
  it as replaceAt,
  ys as resizeRect,
  xs as resizeSplit,
  ze as roleColumn,
  zs as roleColumns,
  tn as rootSpace,
  Gn as row,
  Xa as rowKey,
  gl as scopeTerm,
  yl as scopeTermFor,
  hs as serializeQuery,
  mt as setActivePanel,
  ac as setFrameRect,
  ws as setFrameRectAt,
  Gt as setSizesAt,
  Fu as setSplitDirection,
  He as sizesOf,
  Os as sortsFor,
  he as spaceChrome,
  yt as spaceTitle,
  Un as split,
  $s as spreadTabs,
  Al as summarizeQuery,
  Ys as summaryTerms,
  Ut as swapPanels,
  Bn as tabNode,
  Dt as tabPanels,
  $a as tileFloat,
  Tu as toFloat,
  Lu as toTiled,
  zu as toggleMaximized,
  Ru as toggleMinimized,
  Xo as useColumns,
  oi as useEntityPreviews,
  Du as usePaneContext,
  Nu as usePaneMenu,
  wt as usePresentedRows,
  zl as useQueryState,
  Rl as useResults,
  ye as useShellContext,
  Jn as useWindowContext
};
