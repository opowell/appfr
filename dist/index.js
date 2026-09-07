import { ref as H, inject as _t, provide as Rn, computed as g, toValue as Mt, shallowRef as Tt, watch as ye, onScopeDispose as Fs, defineComponent as de, onBeforeUnmount as He, openBlock as p, createElementBlock as h, createElementVNode as _, toDisplayString as T, unref as E, Fragment as Z, renderList as ie, createCommentVNode as B, renderSlot as qe, withDirectives as yn, withKeys as St, withModifiers as Fe, vModelText as wn, normalizeClass as nn, useSlots as Tn, nextTick as Lt, createBlock as ue, createVNode as ve, createTextVNode as De, withCtx as gt, normalizeStyle as ze, resolveDynamicComponent as Ds, useModel as sn, useId as Ns, createSlots as ps, mergeModels as an, onMounted as er, resolveComponent as Is, getCurrentScope as tr, h as nr } from "vue";
const Os = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function sr() {
  const e = typeof window < "u", t = H(e ? We(window.location.search) : ""), n = H(e ? window.location.pathname : "/"), s = () => {
    t.value = We(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, l) => {
    const i = We(r);
    if (!e) {
      t.value = i;
      return;
    }
    const o = `${window.location.pathname}${i}${window.location.hash}`;
    l === "push" ? window.history.pushState(window.history.state, "", o) : window.history.replaceState(window.history.state, "", o), t.value = i, n.value = window.location.pathname;
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
const Ln = ["list", "cards", "grid", "table", "links", "preview"], Hu = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Xt = ["ok", "running", "queued", "review", "failed"], ju = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "tint"
], Xu = [480, 620, 760, 900, 1100], ar = "cards", bn = "updated";
function Vs(e) {
  return typeof e == "string" && Ln.includes(e);
}
const Ks = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Bs(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function qs(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Ws(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Us(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Ws(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const rr = { key: bn, label: bn };
function et(e, t, n = null) {
  const s = Us(e, n);
  return (t ? s.find((r) => r.key === t) : void 0) ?? s.find((r) => r.key === bn) ?? s[0] ?? rr;
}
function Fn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Ft(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Fn(n);
  return t;
}
function Hs(e) {
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
function js(e) {
  return Object.values(e).some(Hs);
}
function Dn(e) {
  return e.entity === null && e.expr.trim() === "" && !js(e.facets);
}
function Gu(e) {
  return e.entity !== null;
}
function Xs(e) {
  return e.entity === null && e.view === "cards";
}
function lr(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Nn(e, t = {}) {
  const s = t.landing === "entity" ? qs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Vs(t.view) ? t.view : ar,
    sort: et(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Ft(s),
    page: 1
  };
}
const Gs = ["entity", "sort", "dir", "expr", "facets"];
function vs(e) {
  return Gs.some((t) => t in e);
}
function Ys(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Fn(s);
  }
  return n;
}
function Qt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function or(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function ms(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function ir(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function cr(e) {
  return String(e + 1).padStart(2, "0");
}
const kn = "—";
function Le(e, t) {
  return e.find((n) => n.role === t);
}
function Qs(e, t) {
  return e.filter((n) => n.role === t);
}
function ur(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const dr = ["id", "entityKey", "entityLabel"];
function Ae(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (dr.includes(n))
      return t[n];
  }
}
function hs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function fr(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function pr(e, t) {
  if (e == null || e === "") return kn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? or(n) : String(e);
  }
  return t === "date" ? ir(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : kn : String(e);
}
function Nt(e, t) {
  const n = Ae(e, t);
  return e.format ? e.format(n, t) : pr(n, e.kind);
}
function vr(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Zs(e, t) {
  const n = Nt(e, t), s = vr(Ae(e, t));
  return s && s !== n ? s : n;
}
function Zt(e, t) {
  return e ? Nt(e, t) : "";
}
function _s(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const mr = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function gs(e) {
  return [mr[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function $n(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const hr = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function _r(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let r = 0; r < e.length; r++) {
    const l = e[r];
    if (s) {
      l === s ? s = null : n += l;
      continue;
    }
    if (l === '"' || l === "'") {
      s = l;
      continue;
    }
    if (/\s/.test(l)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(r + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += l;
  }
  return a(), t;
}
function yt(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of _r(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const l = hr.exec(a);
    l && l[3] !== "" ? s.push({
      kind: "field",
      field: l[1].toLowerCase(),
      comparator: l[2],
      value: l[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const vn = (e) => e.toLowerCase().replace(/\s+/g, ""), gr = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function yr(e, t, n) {
  const s = vn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && vn(u.label) === s
  );
  if (r) return Ae(r, t);
  const l = n.facets.find((u) => vn(u.label) === s);
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = gr.find(([u]) => u === s)?.[1];
  if (i) {
    const u = Le(a, i);
    if (u) return Ae(u, t);
  }
  const o = /^metric(\d+)$/.exec(s);
  if (o) {
    const u = Qs(a, "metric")[Number(o[1]) - 1];
    if (u) return Ae(u, t);
  }
}
function mn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function wr(e, t, n) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const o = Le(l, i), u = o ? Ae(o, t) : void 0;
      return typeof u == "string" && mn(u, e.value);
    });
  }
  const s = yr(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((i) => mn(String(i), e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const l = e.value.toLowerCase();
      return l === "true" || l === "yes" ? s : l === "false" || l === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const l = Number(e.value);
      return Number.isFinite(l) ? s === l : !0;
    }
    return mn(String(s), e.value);
  }
  const a = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(r) ? !0 : br(e.comparator, r, a);
}
function br(e, t, n) {
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
function kr(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => wr(a, t, n))) : !0;
}
function ys(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function It(e) {
  return e.kind === "text" ? ys(e.value) : `${e.field}${e.comparator}${ys(e.value)}`;
}
function $r(e) {
  return e.filter((t) => t.length).map((t) => t.map(It).join(" ")).join(" OR ");
}
function xr(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((r, l) => l !== n) : s).filter((s) => s.length);
}
function Cr(e) {
  const t = yt(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(It).join(" ")
  };
}
function ws(e, t) {
  return [...e.map(It), t.trim()].filter(Boolean).join(" ");
}
const bs = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Js(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Mr = 7, Er = 3;
function Sr(e, t, n, s) {
  const a = (t * Mr + Qt(n)) % s, r = [];
  for (let l = 0; l < Math.min(Er, s); l++)
    r.push(Js(e, (a + l) % s));
  return r;
}
function Pr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ar(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ar(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, l) => r - l).map((r) => e[r]);
}
function zr(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: r } = t, l = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${l}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return Xt[n % Xt.length];
    case "updated":
      return r;
    case "tint":
      return bs[n % bs.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Xt[n % Xt.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Rr(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, l = t.scopes ?? [];
  if (!r.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const u = r[o % r.length], f = Math.floor(o / r.length), m = Qt(`${s}:${e.key}:${u[0]}:${o}`), b = Js(e.key, o), y = new Date(a.getTime() - m % 900 * 36e5).toISOString(), k = {};
    for (const $ of e.columns ?? []) {
      const x = $.field ?? $.key;
      if (!x || $.value) continue;
      const z = zr($, {
        hash: Qt(`${m}:${x}`),
        sample: u,
        revision: f,
        updatedAt: y
      });
      z !== void 0 && (k[x] = z);
    }
    for (const $ of e.facets)
      k[$.key] = Pr($, Qt(`${m}:${$.key}`));
    for (const [$, x] of l)
      k[$] = x === e.key ? b : Sr(x, o, $, n);
    i.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return i;
}
function Tr(e, t) {
  for (const [n, s] of Object.entries(t)) {
    const a = e.fields[n];
    switch (s.kind) {
      case "chips": {
        if (!s.selected.length) break;
        if (Array.isArray(a)) {
          if (!a.some((r) => s.selected.includes(String(r)))) return !1;
          break;
        }
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
function Lr(e, t) {
  const n = e.find((l) => l.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", r = s === "date" || n.role === "updated";
  return (l, i) => {
    const o = Ae(n, l), u = Ae(n, i);
    return a ? Number(u ?? 0) - Number(o ?? 0) : r ? Date.parse(String(u ?? "")) - Date.parse(String(o ?? "")) : String(u ?? "").localeCompare(String(o ?? ""));
  };
}
function Fr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const r = t.get(s.key);
    if (r) return r;
    const l = e.scopes ?? a.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = Rr(s, { ...e, scopes: l });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: l, offset: i }) {
      const o = yt(s.expr), u = r ? [r] : a.entities, f = [], m = [];
      for (const k of u)
        for (const $ of n(k, a))
          f.push($), (r ? Tr($, s.facets) : !0) && kr(o, $, k) && m.push($);
      const b = et(r, s.sort, a), y = m.sort(Lr(Ws(r, a), b.key));
      return s.dir === "asc" && y.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: y.slice(i, i + l),
        total: m.length,
        unfiltered: m.length === f.length
      };
    }
  };
}
function Dr(e, t) {
  return ea(e, t.id);
}
function ea(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Nr(e, t) {
  return Dr(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
const ks = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ir(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && ks(e.value, t.value) : t.kind === "text" && ks(e.value, t.value);
}
function Or(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = yt(t).flat();
  return s ? yt(n).some(
    (r) => r.some((l) => Ir(l, s))
  ) ? n : `${n} ${t}` : n;
}
function Vr(e, t, n) {
  return Or(t.expr, Nr(e, n));
}
function Kr(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const ta = Symbol("dc.shellContext");
function Br(e) {
  return Rn(ta, e), e;
}
function we() {
  const e = _t(ta, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const In = "e", On = "v", Vn = "s", Kn = "d", Bn = "q", qn = "p", Wn = "f_", na = "*", qr = [
  In,
  On,
  Vn,
  Kn,
  Bn,
  qn
], xn = "..", sa = ",", Wr = [
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
function hn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Wr) t = t.replace(n, s);
  return t;
}
function Be(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function aa(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), l = a === -1 ? "" : s.slice(a + 1);
    n.push([Be(r), l]);
  }
  return n;
}
function Ur(e) {
  return qr.includes(e) || e.startsWith(Wn);
}
function $s(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Hr(e, t) {
  const n = Be(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(sa).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(xn), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + xn.length)).trim(), l = a === "" ? null : Number(a), i = r === "" ? null : Number(r);
      let o = l !== null && Number.isFinite(l) ? $s(l, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? $s(i, e.min, e.max) : null;
      return o !== null && u !== null && o > u && ([o, u] = [u, o]), { kind: "range", min: o, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function jr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(sa) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${xn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Xr(e, t, n = {}) {
  const s = Nn(t, n), a = new Map(aa(e)), r = a.get(In), l = r === void 0 ? s.entity : Be(r), i = l === na ? null : ft(t, l), o = a.get(On), u = o && Vs(Be(o)) ? Be(o) : s.view, f = a.get(Vn), m = et(i, f ? Be(f) : n.sort, t), b = a.get(Kn), y = b ? Be(b) === "asc" ? "asc" : "desc" : s.dir, k = a.get(Bn), $ = a.get(qn), x = $ === void 0 ? 1 : Number(Be($)), z = Number.isFinite(x) ? Math.max(1, Math.floor(x)) : 1, P = {};
  for (const S of i?.facets ?? []) {
    const C = a.get(`${Wn}${S.key}`);
    P[S.key] = C === void 0 ? Fn(S) : Hr(S, C);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: m.key,
    dir: y,
    expr: k === void 0 ? "" : Be(k),
    facets: Ys(i, P),
    page: z
  };
}
function xs(e, t, n = {}, s = "") {
  const a = Nn(t, n), r = ft(t, e.entity), l = aa(s).filter(([m]) => !Ur(m)), i = [], o = (m, b) => i.push([m, hn(b)]), u = r?.key ?? null;
  u !== a.entity && o(In, u ?? na), e.view !== a.view && o(On, e.view), e.sort !== a.sort && o(Vn, e.sort), e.dir !== a.dir && o(Kn, e.dir), e.expr.trim() !== "" && o(Bn, e.expr);
  for (const m of r?.facets ?? []) {
    const b = e.facets[m.key];
    if (!b) continue;
    const y = jr(b, m);
    y !== null && i.push([`${Wn}${m.key}`, hn(y)]);
  }
  e.page > 1 && o(qn, String(e.page));
  const f = [
    ...l.map(([m, b]) => [hn(m), b]),
    ...i
  ];
  return f.length ? `?${f.map(([m, b]) => b === "" ? m : `${m}=${b}`).join("&")}` : "";
}
const rn = "entity", Dt = "expr";
function Gr(e, t) {
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
function ra(e, t) {
  const n = [];
  t && n.push({
    id: rn,
    label: `entity:${t.key}`,
    facetKey: rn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Hs(a) && n.push(...Gr(s, a));
  }
  return yt(e.expr).forEach((s, a) => {
    s.forEach((r, l) => {
      n.push({
        id: `${Dt}:${a}:${l}`,
        label: It(r),
        facetKey: Dt,
        group: a,
        index: l,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {}
      });
    });
  }), n;
}
function Yr(e, t, n = null) {
  if (Dn(e)) {
    const r = et(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const s = ra(e, t).filter((r) => r.facetKey !== Dt).map((r) => r.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function Qr(e) {
  const { adapter: t } = e, n = g(() => Mt(e.schema)), s = g(() => Mt(e.defaults) ?? {}), a = g(() => Xr(t.search.value, n.value, s.value)), r = g(() => ft(n.value, a.value.entity)), l = g(() => r.value ?? qs(n.value, s.value)), i = g(() => Us(r.value, n.value)), o = g(() => et(r.value, a.value.sort, n.value)), u = (x, z) => {
    const P = xs(x, n.value, s.value, t.search.value);
    P !== t.search.value && (z === "push" ? t.push(P) : t.replace(P));
  }, f = () => Mt(e.navigationMode) ?? "push", m = () => Mt(e.facetNavigationMode) ?? "replace", b = (x, z) => {
    const P = x.page ?? (vs(x) ? 1 : a.value.page);
    u({ ...a.value, ...x, page: P }, z);
  }, y = (x, z) => {
    const P = a.value.facets[x];
    if (!P) return;
    const S = { ...a.value.facets, [x]: z(P) };
    b({ facets: S }, m());
  }, k = (x) => {
    const z = x === null ? null : ft(n.value, x);
    return (z?.key ?? null) === a.value.entity ? {} : {
      entity: z?.key ?? null,
      sort: et(z, a.value.sort, n.value).key,
      facets: Ft(z)
    };
  }, $ = (x) => {
    const z = k(x);
    Object.keys(z).length && b(z, f());
  };
  return {
    query: a,
    entity: r,
    focus: l,
    sort: o,
    sorts: i,
    summary: g(() => Yr(a.value, r.value, n.value)),
    terms: g(() => ra(a.value, r.value)),
    isPristine: g(() => Dn(a.value)),
    isEverything: g(() => a.value.entity === null),
    hasFacets: g(() => js(a.value.facets)),
    setEntity: $,
    clearEntity: () => $(null),
    setView(x) {
      b({ view: x }, f());
    },
    setSort(x) {
      b({ sort: et(r.value, x, n.value).key }, f());
    },
    toggleDirection() {
      b({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(x) {
      b({ expr: x }, f());
    },
    narrow(x, z) {
      b({ expr: x, ...k(z) }, f());
    },
    setPage(x, z) {
      b({ page: Math.max(1, Math.floor(x)) }, z ?? f());
    },
    setFacet(x, z) {
      y(x, () => z);
    },
    toggleChip(x, z) {
      y(x, (P) => P.kind !== "chips" ? P : { kind: "chips", selected: P.selected.includes(z) ? P.selected.filter((C) => C !== z) : [...P.selected, z] });
    },
    setRange(x, z, P) {
      y(x, (S) => S.kind === "range" ? { kind: "range", min: z, max: P } : S);
    },
    toggleFlag(x) {
      y(
        x,
        (z) => z.kind === "toggle" ? { kind: "toggle", on: !z.on } : z
      );
    },
    removeTerm(x) {
      if (x.facetKey === rn) {
        $(null);
        return;
      }
      if (x.facetKey === Dt) {
        const z = xr(yt(a.value.expr), x.group ?? 0, x.index ?? 0);
        b({ expr: $r(z) }, f());
        return;
      }
      y(x.facetKey, (z) => z.kind === "chips" && x.option ? { kind: "chips", selected: z.selected.filter((P) => P !== x.option) } : z.kind === "range" ? { kind: "range", min: null, max: null } : z.kind === "toggle" ? { kind: "toggle", on: !1 } : z);
    },
    clearFilters() {
      b({ entity: null, expr: "", facets: Ft(null) }, f());
    },
    reset() {
      u(Nn(n.value, s.value), f());
    },
    hrefFor(x) {
      const z = { ...a.value, ...x };
      return z.page = x.page ?? (vs(x) ? 1 : a.value.page), z.facets = Ys(ft(n.value, z.entity), z.facets), `${t.path.value}${xs(z, n.value, s.value, t.search.value)}`;
    }
  };
}
function Zr(e) {
  const t = Tt([]), n = H(0), s = H(!1), a = Tt(null);
  let r = 0, l = null;
  const i = g(() => (e.query.value.page - 1) * e.limit.value), o = g(() => lr(n.value, e.limit.value)), u = ($) => {
    t.value = $.rows, n.value = $.total, a.value = null;
  }, f = ($) => {
    a.value = $, t.value = [], n.value = 0;
  }, m = ($, x) => {
    let z = !0;
    const P = () => $ === r, S = () => {
      z && (z = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return P();
      },
      insert(C, L) {
        if (!P()) return;
        const I = Array.isArray(C) ? C : [C];
        if (!I.length) return;
        S();
        const w = [...t.value];
        w.splice(L ?? w.length, 0, ...I), t.value = x > 0 ? w.slice(0, x) : w, n.value += I.length;
      },
      set(C) {
        P() && (C.rows && (S(), t.value = x > 0 ? C.rows.slice(0, x) : C.rows, n.value = C.rows.length), C.total !== void 0 && (n.value = C.total));
      },
      close() {
        P() && (s.value = !1);
      },
      fail(C) {
        P() && (f(C), s.value = !1);
      }
    };
  }, b = () => {
    const $ = l;
    l = null, $?.();
  }, y = () => {
    const $ = ++r;
    b();
    const x = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, z = e.source.value;
    if (z.stream) {
      s.value = !0;
      try {
        l = z.stream(x, m($, x.limit)) ?? null;
      } catch (S) {
        f(S), s.value = !1;
      }
      return;
    }
    let P;
    try {
      P = z.query(x);
    } catch (S) {
      f(S);
      return;
    }
    if (!(P instanceof Promise)) {
      u(P), s.value = !1;
      return;
    }
    s.value = !0, P.then((S) => {
      $ === r && u(S);
    }).catch((S) => {
      $ === r && f(S);
    }).finally(() => {
      $ === r && (s.value = !1);
    });
  }, k = g(
    () => `${JSON.stringify(Gs.map(($) => e.query.value[$]))}|${e.query.value.page}`
  );
  return ye([e.source, k, e.schema, e.entity, e.limit], y, {
    immediate: !0
  }), Fs(() => {
    r++, b();
  }, !0), { rows: t, total: n, offset: i, pageCount: o, pending: s, error: a, refresh: y };
}
const Jr = 25, la = (e, t) => e.toLowerCase() === t.toLowerCase();
function el(e, t) {
  return e.find((n) => la(n.id, t));
}
function tl(e) {
  const t = Tt(/* @__PURE__ */ new Map()), n = (l) => {
    if (l.facetKey !== Dt || !l.field || !l.value) return null;
    const i = Kr(e.schema.value, l.field);
    return i ? { entity: i, id: l.value, key: `${i.key}:${l.value}` } : null;
  }, s = (l) => {
    const { entity: i, id: o } = l, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ea(i, o) ?? "",
        facets: Ft(i),
        sort: et(i, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Jr,
      offset: 0
    });
  }, a = (l, i) => {
    const o = Zt(Le(l.columns ?? [], "identity"), i);
    return o === kn || la(o, i.id) ? "" : o;
  }, r = () => {
    const l = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const f = n(u);
      f && !t.value.has(f.key) && l.set(f.key, f);
    }
    if (!l.size) return;
    const i = [...l.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), o = (u) => {
      const f = new Map(t.value);
      u.forEach((m, b) => {
        const { reference: y } = i[b], k = el(m.rows, y.id);
        f.set(y.key, k ? a(y.entity, k) : "");
      }), t.value = f;
    };
    if (i.every(({ outcome: u }) => !(u instanceof Promise))) {
      o(i.map(({ outcome: u }) => u));
      return;
    }
    Promise.all(i.map(({ outcome: u }) => Promise.resolve(u))).then(o).catch(() => {
    });
  };
  return ye([e.source, e.schema, e.terms], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(l) {
      const i = n(l);
      return i && t.value.get(i.key) || null;
    }
  };
}
const nl = ["data-dc-expanded"], sl = { class: "dc-header__domain" }, al = ["data-dc-more", "title"], rl = { class: "dc-header__pick" }, ll = { class: "dc-header__pick-box" }, ol = ["value"], il = { value: "" }, cl = ["value"], ul = { class: "dc-header__pick" }, dl = { class: "dc-header__pick-box" }, fl = ["value"], pl = ["value"], vl = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, ml = ["title", "aria-label", "onClick"], hl = ["aria-expanded", "aria-controls"], _l = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, gl = { class: "dc-header__sr" }, yl = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, wl = ["disabled"], bl = ["title"], kl = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, $l = ["disabled"], xl = {
  key: 1,
  class: "dc-header__actions"
}, Cl = /* @__PURE__ */ de({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean },
    views: {}
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = we(), r = g(() => a.schema.value), l = g(() => a.hasFacets.value || !!a.query.value.expr.trim());
    function i(F) {
      return F.key === a.query.value.entity && l.value && !n.hideCount ? ms(a.total.value) : F.count;
    }
    function o(F) {
      return `${F.label} · ${i(F)}`;
    }
    const u = g(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${ms(a.total.value)}`), f = g(
      () => (n.views ?? [...Ln]).map((F) => ({ key: F, label: Ks[F] }))
    ), m = g(() => Bs(a.query.value.view, n.views));
    function b(F) {
      a.setView(F.target.value);
    }
    const y = g(
      () => a.terms.value.filter((F) => F.facetKey !== rn).map((F, N, q) => {
        const Q = q[N - 1];
        return {
          term: F,
          or: Q?.group !== void 0 && F.group !== void 0 && F.group !== Q.group
        };
      })
    ), k = tl({
      source: a.source,
      schema: a.schema,
      query: a.query,
      terms: a.terms
    });
    function $(F) {
      const N = k.nameOf(F);
      return N ? `${F.field}:${N} (${F.value})` : F.label;
    }
    function x(F) {
      const N = F.target.value;
      a.setEntity(N || null);
    }
    function z(F) {
      F.target?.closest("button, select, label") || s("toggle");
    }
    const P = H(null), S = H("");
    function C() {
      const F = P.value;
      if (!F) {
        S.value = "";
        return;
      }
      const N = F.scrollLeft > 1, q = F.scrollWidth - F.clientWidth - F.scrollLeft > 1;
      S.value = N && q ? "both" : N ? "start" : q ? "end" : "";
    }
    let L = null;
    ye(
      P,
      (F) => {
        L?.disconnect(), L = null, C(), !(!F || typeof ResizeObserver > "u") && (L = new ResizeObserver(C), L.observe(F));
      },
      { flush: "post" }
    ), ye(y, C, { flush: "post" }), He(() => L?.disconnect());
    const I = g(() => a.query.value.page), w = g(
      () => a.pageCount.value > 1 && !Xs(a.query.value)
    ), A = g(() => {
      const F = `Page ${I.value} of ${a.pageCount.value}`, N = a.rows.value.length;
      if (!N) return F;
      const q = a.offset.value + 1;
      return `${F} — rows ${q} to ${q + N - 1} of ${a.total.value}`;
    });
    return (F, N) => (p(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      _("div", {
        class: "dc-header__trigger",
        onClick: z
      }, [
        N[7] || (N[7] = _("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        _("span", sl, T(r.value.label), 1),
        _("div", {
          ref_key: "termBar",
          ref: P,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": S.value,
          title: E(a).summary.value,
          onScroll: C
        }, [
          _("label", rl, [
            N[4] || (N[4] = _("span", { class: "dc-header__sr" }, "Type", -1)),
            _("span", ll, [
              _("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: E(a).query.value.entity ?? "",
                onChange: x
              }, [
                _("option", il, T(u.value), 1),
                (p(!0), h(Z, null, ie(E(a).entities.value, (q) => (p(), h("option", {
                  key: q.key,
                  value: q.key
                }, T(o(q)), 9, cl))), 128))
              ], 40, ol),
              N[3] || (N[3] = _("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          _("label", ul, [
            N[6] || (N[6] = _("span", { class: "dc-header__sr" }, "View", -1)),
            _("span", dl, [
              _("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: m.value,
                onChange: b
              }, [
                (p(!0), h(Z, null, ie(f.value, (q) => (p(), h("option", {
                  key: q.key,
                  value: q.key
                }, T(q.label), 9, pl))), 128))
              ], 40, fl),
              N[5] || (N[5] = _("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          (p(!0), h(Z, null, ie(y.value, (q) => (p(), h(Z, {
            key: q.term.id
          }, [
            q.or ? (p(), h("span", vl, "or")) : B("", !0),
            _("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${$(q.term)}`,
              "aria-label": `Remove ${$(q.term)}`,
              onClick: (Q) => E(a).removeTerm(q.term)
            }, T($(q.term)), 9, ml)
          ], 64))), 128))
        ], 40, al),
        _("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: N[0] || (N[0] = (q) => s("toggle"))
        }, [
          _("span", _l, T(e.expanded ? "▲" : "▼"), 1),
          _("span", gl, T(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, hl)
      ]),
      w.value ? (p(), h("nav", yl, [
        _("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: I.value <= 1,
          onClick: N[1] || (N[1] = (q) => E(a).setPage(I.value - 1))
        }, [...N[8] || (N[8] = [
          _("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, wl),
        _("span", {
          class: "dc-header__page dc-mono",
          title: A.value,
          "aria-hidden": "true"
        }, T(I.value) + " / " + T(E(a).pageCount.value), 9, bl),
        _("span", kl, T(A.value), 1),
        _("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: I.value >= E(a).pageCount.value,
          onClick: N[2] || (N[2] = (q) => E(a).setPage(I.value + 1))
        }, [...N[9] || (N[9] = [
          _("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, $l)
      ])) : B("", !0),
      F.$slots.actions ? (p(), h("div", xl, [
        qe(F.$slots, "actions", {}, void 0, !0)
      ])) : B("", !0)
    ], 8, nl));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, oa = /* @__PURE__ */ fe(Cl, [["__scopeId", "data-v-66000c16"]]), Ml = { class: "dc-facet" }, El = ["id"], Sl = { class: "dc-facet__body" }, Pl = ["aria-labelledby"], Al = ["aria-pressed", "data-dc-active", "onClick"], zl = ["aria-labelledby"], Rl = ["aria-label", "placeholder", "onKeydown"], Tl = ["aria-label", "placeholder", "onKeydown"], Ll = ["aria-checked"], Fl = { class: "dc-switch__text" }, Dl = ["data-dc-active"], Nl = /* @__PURE__ */ de({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = g(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function r(m) {
      if (n.value.kind !== "chips") return;
      const b = a.value.has(m) ? n.value.selected.filter((y) => y !== m) : [...n.value.selected, m];
      s("update", { kind: "chips", selected: b });
    }
    const l = H(""), i = H("");
    ye(
      () => n.value,
      (m) => {
        m.kind === "range" && (l.value = m.min === null ? "" : m.min, i.value = m.max === null ? "" : m.max);
      },
      { immediate: !0, deep: !0 }
    );
    function o(m) {
      if (typeof m == "number") return Number.isFinite(m) ? m : null;
      const b = m.trim();
      if (!b) return null;
      const y = Number(b);
      return Number.isFinite(y) ? y : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const m = o(l.value), b = o(i.value);
      m === n.value.min && b === n.value.max || s("update", { kind: "range", min: m, max: b });
    }
    function f() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (m, b) => (p(), h("div", Ml, [
      _("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, T(e.facet.label), 9, El),
      _("div", Sl, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (p(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (p(!0), h(Z, null, ie(e.facet.options, (y) => (p(), h("button", {
            key: y,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(y),
            "data-dc-active": a.value.has(y) ? "true" : "false",
            onClick: (k) => r(y)
          }, T(y), 9, Al))), 128))
        ], 8, Pl)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          yn(_("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (y) => l.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: St(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, Rl), [
            [wn, l.value]
          ]),
          b[2] || (b[2] = _("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          yn(_("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (y) => i.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: St(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, Tl), [
            [wn, i.value]
          ])
        ], 8, zl)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: f
        }, [
          _("span", Fl, T(e.facet.text), 1),
          _("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...b[3] || (b[3] = [
            _("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Dl)
        ], 8, Ll)) : B("", !0)
      ])
    ]));
  }
}), ia = /* @__PURE__ */ fe(Nl, [["__scopeId", "data-v-36d1334b"]]), Il = ["aria-label"], Ol = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Vl = /* @__PURE__ */ de({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = H([]);
    function r(l, i) {
      const o = n.options.length;
      let u = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? u = (i + 1) % o : l.key === "ArrowLeft" || l.key === "ArrowUp" ? u = (i - 1 + o) % o : l.key === "Home" ? u = 0 : l.key === "End" && (u = o - 1), u === null) return;
      l.preventDefault();
      const f = n.options[u];
      f && (s("update:modelValue", f.key), a.value[u]?.focus());
    }
    return (l, i) => (p(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (p(!0), h(Z, null, ie(e.options, (o, u) => (p(), h("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: nn(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (f) => s("update:modelValue", o.key),
        onKeydown: (f) => r(f, u)
      }, T(o.label), 43, Ol))), 128))
    ], 8, Il));
  }
}), Cn = /* @__PURE__ */ fe(Vl, [["__scopeId", "data-v-63fb5482"]]), Kl = ["id"], Bl = { class: "dc-panel__section dc-panel__rows" }, ql = { class: "dc-panel__row" }, Wl = ["for"], Ul = ["title", "aria-label", "onClick"], Hl = ["id", "placeholder", "onKeydown"], jl = { class: "dc-panel__row" }, Xl = ["id"], Gl = ["aria-labelledby"], Yl = ["data-dc-active", "aria-current"], Ql = { class: "dc-entity__count dc-mono" }, Zl = ["data-dc-active", "aria-current", "onClick"], Jl = { class: "dc-entity__label" }, eo = { class: "dc-entity__count dc-mono" }, to = { class: "dc-panel__actions" }, no = ["disabled"], so = { class: "dc-panel__section dc-panel__rows" }, ao = { class: "dc-panel__row" }, ro = { class: "dc-panel__control" }, lo = { class: "dc-panel__row" }, oo = { class: "dc-panel__control" }, io = ["title", "aria-label"], co = {
  key: 0,
  class: "dc-panel__section"
}, uo = /* @__PURE__ */ de({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = Tn(), r = we(), l = g(
      () => (n.views ?? [...Ln]).map((P) => ({ key: P, label: Ks[P] }))
    ), i = g(
      () => r.sorts.value.map((P) => ({ key: P.key, label: P.label }))
    ), o = g(() => Cr(r.query.value.expr)), u = g(() => o.value.parts.map(It)), f = H(o.value.text), m = H(null);
    ye(
      () => o.value.text,
      (P) => {
        f.value = P;
      }
    );
    const b = g(() => f.value !== o.value.text);
    function y() {
      b.value && r.setExpression(ws(o.value.parts, f.value)), s("close");
    }
    function k(P) {
      const { parts: S, text: C } = o.value;
      r.setExpression(ws(S.filter((L, I) => I !== P), C));
    }
    function $(P) {
      const { parts: S } = o.value;
      f.value || !S.length || (P.preventDefault(), k(S.length - 1));
    }
    function x() {
      f.value = "", r.clearFilters();
    }
    function z(P, S) {
      r.setFacet(P, S);
    }
    return Lt(() => m.value?.focus()), (P, S) => (p(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: S[6] || (S[6] = St(Fe((C) => s("close"), ["stop"]), ["esc"]))
    }, [
      _("section", Bl, [
        _("div", ql, [
          _("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, Wl),
          _("div", {
            class: "dc-field",
            onMousedown: S[1] || (S[1] = Fe((C) => m.value?.focus(), ["self", "prevent"]))
          }, [
            (p(!0), h(Z, null, ie(u.value, (C, L) => (p(), h("button", {
              key: `${L}:${C}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${C}`,
              "aria-label": `Remove ${C}`,
              onClick: (I) => k(L)
            }, T(C), 9, Ul))), 128)),
            yn(_("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: m,
              "onUpdate:modelValue": S[0] || (S[0] = (C) => f.value = C),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: u.value.length ? "" : E(r).schema.value.placeholder,
              onKeydown: [
                St(Fe(y, ["prevent"]), ["enter"]),
                St($, ["backspace"])
              ]
            }, null, 40, Hl), [
              [wn, f.value]
            ])
          ], 32)
        ]),
        E(r).entity.value ? (p(!0), h(Z, { key: 0 }, ie(E(r).entity.value.facets, (C) => (p(), ue(ia, {
          key: C.key,
          facet: C,
          value: E(r).query.value.facets[C.key],
          onUpdate: (L) => z(C.key, L)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : B("", !0),
        _("div", jl, [
          _("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, Xl),
          _("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            _("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": E(r).isEverything.value ? "true" : "false",
              "aria-current": E(r).isEverything.value ? "true" : void 0,
              onClick: S[2] || (S[2] = (C) => E(r).clearEntity())
            }, [
              S[7] || (S[7] = _("span", { class: "dc-entity__label" }, "Everything", -1)),
              _("span", Ql, T(E(r).entities.value.length) + " kinds", 1)
            ], 8, Yl),
            (p(!0), h(Z, null, ie(E(r).entities.value, (C) => (p(), h("button", {
              key: C.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": C.key === E(r).entity.value?.key ? "true" : "false",
              "aria-current": C.key === E(r).entity.value?.key ? "true" : void 0,
              onClick: (L) => E(r).setEntity(C.key)
            }, [
              _("span", Jl, T(C.label), 1),
              _("span", eo, T(C.count), 1)
            ], 8, Zl))), 128))
          ], 8, Gl)
        ]),
        _("div", to, [
          _("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: y
          }, " Run query "),
          _("button", {
            type: "button",
            class: "dc-button",
            disabled: E(r).isPristine.value && !b.value,
            onClick: x
          }, " Reset ", 8, no)
        ])
      ]),
      _("section", so, [
        _("div", ao, [
          S[8] || (S[8] = _("span", { class: "dc-panel__field-label" }, "View", -1)),
          _("div", ro, [
            ve(Cn, {
              label: "Result view",
              "model-value": E(r).query.value.view,
              options: l.value,
              "onUpdate:modelValue": S[3] || (S[3] = (C) => E(r).setView(C))
            }, null, 8, ["model-value", "options"])
          ])
        ]),
        _("div", lo, [
          S[9] || (S[9] = _("span", { class: "dc-panel__field-label" }, "Sort", -1)),
          _("div", oo, [
            ve(Cn, {
              mono: "",
              label: "Sort field",
              "model-value": E(r).query.value.sort,
              options: i.value,
              "onUpdate:modelValue": S[4] || (S[4] = (C) => E(r).setSort(C))
            }, null, 8, ["model-value", "options"]),
            _("button", {
              type: "button",
              class: "dc-button dc-button--icon dc-mono",
              title: E(r).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${E(r).query.value.dir === "desc" ? "descending" : "ascending"}`,
              onClick: S[5] || (S[5] = (C) => E(r).toggleDirection())
            }, T(E(r).query.value.dir === "desc" ? "↓" : "↑"), 9, io)
          ])
        ])
      ]),
      a["panel-section"] ? (p(), h("section", co, [
        qe(P.$slots, "panel-section", {}, void 0, !0)
      ])) : B("", !0)
    ], 40, Kl));
  }
}), ca = /* @__PURE__ */ fe(uo, [["__scopeId", "data-v-171cb4db"]]);
function fo(e, t) {
  const n = Le(t, "state"), s = Le(t, "tint");
  return {
    identity: Zt(Le(t, "identity"), e),
    reference: Zt(Le(t, "reference"), e),
    metrics: Qs(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Nt(a, e)
    })),
    state: n ? Ae(n, e) ?? null : null,
    updated: Zt(Le(t, "updated"), e),
    tint: s ? Ae(s, e) ?? null : null
  };
}
function ua(e, t, n, s) {
  const a = n?.columns ?? [];
  return {
    row: e,
    key: fr(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: a,
    ordinal: cr(t),
    parts: fo(e, a),
    pinned: s
  };
}
function bt() {
  const e = we(), t = g(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return g(
    () => e.rows.value.map(
      (n, s) => ua(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n)
      )
    )
  );
}
const po = ["data-dc-status"], vo = /* @__PURE__ */ de({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (p(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, T(e.status), 9, po));
  }
}), Ot = /* @__PURE__ */ fe(vo, [["__scopeId", "data-v-23e59fbf"]]), mo = ["title"], ho = { key: 1 }, _o = /* @__PURE__ */ de({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = we(), s = g(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((o) => o.key === t.column.drill) ?? null), a = g(() => t.column.label ?? ""), r = g(() => Nt(t.column, t.entry.row));
    function l(i) {
      i.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (i, o) => s.value ? (p(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: l
    }, [
      qe(i.$slots, "default", {}, () => [
        De(T(r.value), 1)
      ], !0)
    ], 8, mo)) : (p(), h("span", ho, [
      qe(i.$slots, "default", {}, () => [
        De(T(r.value), 1)
      ], !0)
    ]));
  }
}), Vt = /* @__PURE__ */ fe(_o, [["__scopeId", "data-v-3bd0cbdb"]]), go = ["data-dc-active", "aria-pressed", "aria-label"], yo = /* @__PURE__ */ de({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = we();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, r) => (p(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, T(e.pinned ? "★" : "☆"), 9, go));
  }
}), Un = /* @__PURE__ */ fe(yo, [["__scopeId", "data-v-ef63d763"]]), wo = ["title", "aria-label"], bo = /* @__PURE__ */ de({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), s = g(() => t.entry.entity?.scope ?? null);
    function a(r) {
      r.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (r, l) => s.value ? (p(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, wo)) : B("", !0);
  }
}), Kt = /* @__PURE__ */ fe(bo, [["__scopeId", "data-v-1d9b1a9f"]]), ko = { class: "dc-cards" }, $o = { class: "dc-card__top dc-mono" }, xo = {
  key: 0,
  class: "dc-card__entity"
}, Co = { class: "dc-card__top-right" }, Mo = ["onClick"], Eo = { class: "dc-card__primary" }, So = { class: "dc-card__secondary dc-mono" }, Po = { class: "dc-card__metrics dc-mono" }, Ao = {
  key: 0,
  class: "dc-card__date"
}, zo = /* @__PURE__ */ de({
  __name: "CardsView",
  setup(e) {
    const t = we(), n = bt(), s = g(() => t.isEverything.value);
    return (a, r) => (p(), h("div", ko, [
      (p(!0), h(Z, null, ie(E(n), (l) => (p(), h("div", {
        key: l.key,
        class: "dc-card"
      }, [
        _("div", $o, [
          _("span", null, [
            De(T(l.ordinal) + " ", 1),
            s.value ? (p(), h("span", xo, T(l.entityLabel), 1)) : B("", !0)
          ]),
          _("span", Co, [
            l.parts.state ? (p(), ue(Ot, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : B("", !0),
            ve(Kt, { entry: l }, null, 8, ["entry"]),
            E(t).pinnable.value ? (p(), ue(Un, {
              key: 1,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : B("", !0)
          ])
        ]),
        _("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => E(t).activate(l.row)
        }, [
          _("span", Eo, T(l.parts.identity), 1),
          _("span", So, T(l.parts.reference), 1)
        ], 8, Mo),
        _("div", Po, [
          (p(!0), h(Z, null, ie(l.parts.metrics.slice(0, 2), (i) => (p(), ue(Vt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, {
            default: gt(() => [
              De(T(i.label) + " " + T(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (p(), h("span", Ao, T(l.parts.updated), 1)) : B("", !0)
        ])
      ]))), 128))
    ]));
  }
}), da = /* @__PURE__ */ fe(zo, [["__scopeId", "data-v-b633cc4d"]]), Ro = { class: "dc-grid" }, To = ["onClick"], Lo = { class: "dc-tile__scrim" }, Fo = { class: "dc-tile__top dc-mono" }, Do = { class: "dc-tile__chip" }, No = { class: "dc-tile__caption" }, Io = { class: "dc-tile__secondary dc-truncate" }, Oo = { class: "dc-tile__primary" }, Vo = /* @__PURE__ */ de({
  __name: "GridView",
  setup(e) {
    const t = we(), n = bt();
    return (s, a) => (p(), h("div", Ro, [
      (p(!0), h(Z, null, ie(E(n), (r) => (p(), h("button", {
        key: r.key,
        type: "button",
        class: "dc-tile",
        style: ze({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
        onClick: (l) => E(t).activate(r.row)
      }, [
        _("span", Lo, [
          _("span", Fo, [
            _("span", Do, T(r.ordinal), 1)
          ]),
          _("span", No, [
            _("span", Io, T(r.parts.reference), 1),
            _("span", Oo, T(r.parts.identity), 1)
          ])
        ])
      ], 12, To))), 128))
    ]));
  }
}), fa = /* @__PURE__ */ fe(Vo, [["__scopeId", "data-v-ddbd0e17"]]), Ko = { class: "dc-links" }, Bo = ["onClick"], qo = { class: "dc-link__primary dc-truncate" }, Wo = { class: "dc-link__secondary dc-mono dc-truncate" }, Uo = /* @__PURE__ */ de({
  __name: "LinksView",
  setup(e) {
    const t = we(), n = bt();
    return (s, a) => (p(), h("div", Ko, [
      (p(!0), h(Z, null, ie(E(n), (r) => (p(), h("button", {
        key: r.key,
        type: "button",
        class: "dc-link",
        onClick: (l) => E(t).activate(r.row)
      }, [
        _("span", qo, T(r.parts.identity), 1),
        _("span", Wo, T(r.parts.reference), 1)
      ], 8, Bo))), 128))
    ]));
  }
}), pa = /* @__PURE__ */ fe(Uo, [["__scopeId", "data-v-d94cadb6"]]), Ho = {
  class: "dc-list",
  role: "list"
}, jo = ["onClick"], Xo = { class: "dc-list__ordinal dc-mono" }, Go = { class: "dc-list__identity" }, Yo = { class: "dc-list__primary dc-truncate" }, Qo = { class: "dc-list__secondary dc-mono dc-truncate" }, Zo = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Jo = { class: "dc-list__metrics dc-mono" }, ei = { class: "dc-list__trailing" }, ti = /* @__PURE__ */ de({
  __name: "ListView",
  setup(e) {
    const t = we(), n = bt(), s = g(() => t.isEverything.value);
    return (a, r) => (p(), h("div", Ho, [
      (p(!0), h(Z, null, ie(E(n), (l) => (p(), h("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        _("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => E(t).activate(l.row)
        }, [
          _("span", Xo, T(l.ordinal), 1),
          _("span", Go, [
            _("span", Yo, T(l.parts.identity), 1),
            _("span", Qo, T(l.parts.reference), 1)
          ])
        ], 8, jo),
        s.value ? (p(), h("span", Zo, T(l.entityLabel), 1)) : B("", !0),
        _("span", Jo, [
          (p(!0), h(Z, null, ie(l.parts.metrics.slice(0, 2), (i) => (p(), ue(Vt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        _("span", ei, [
          l.parts.state ? (p(), ue(Ot, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : B("", !0),
          ve(Kt, { entry: l }, null, 8, ["entry"]),
          E(t).pinnable.value ? (p(), ue(Un, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : B("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Mn = /* @__PURE__ */ fe(ti, [["__scopeId", "data-v-7ef881bb"]]), ni = { class: "dc-preview" }, si = { class: "dc-preview__pager dc-mono" }, ai = ["disabled"], ri = { "aria-live": "polite" }, li = ["disabled"], oi = {
  key: 0,
  class: "dc-preview__card"
}, ii = { class: "dc-preview__body" }, ci = { class: "dc-preview__top" }, ui = { class: "dc-preview__badges" }, di = { class: "dc-preview__entity dc-mono" }, fi = { class: "dc-preview__marks" }, pi = { class: "dc-preview__primary" }, vi = { class: "dc-preview__secondary dc-mono" }, mi = { class: "dc-preview__fields" }, hi = { class: "dc-preview__key" }, _i = { class: "dc-preview__value dc-mono" }, gi = /* @__PURE__ */ de({
  __name: "PreviewView",
  setup(e) {
    const t = we(), n = bt(), s = H(0);
    ye(n, (o) => {
      s.value > o.length - 1 && (s.value = Math.max(0, o.length - 1));
    });
    const a = g(() => n.value[s.value]), r = g(() => {
      const o = a.value;
      if (!o) return [];
      const u = Le(o.columns, "reference"), f = Le(o.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...f ? [{ key: f.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), l = g(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + o)));
    };
    return (o, u) => (p(), h("div", ni, [
      _("div", si, [
        _("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => i(-1))
        }, " ‹ ", 8, ai),
        _("span", ri, T(l.value), 1),
        _("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (f) => i(1))
        }, " › ", 8, li)
      ]),
      a.value ? (p(), h("div", oi, [
        _("div", {
          class: "dc-preview__media",
          style: ze({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        _("div", ii, [
          _("div", ci, [
            _("span", ui, [
              a.value.parts.state ? (p(), ue(Ot, {
                key: 0,
                status: a.value.parts.state
              }, null, 8, ["status"])) : B("", !0),
              _("span", di, T(a.value.entityLabel), 1)
            ]),
            _("span", fi, [
              ve(Kt, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (p(), ue(Un, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : B("", !0)
            ])
          ]),
          _("div", null, [
            _("div", pi, T(a.value.parts.identity), 1),
            _("div", vi, T(a.value.parts.reference), 1)
          ]),
          _("dl", mi, [
            (p(!0), h(Z, null, ie(r.value, (f) => (p(), h("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              _("dt", hi, T(f.key), 1),
              _("dd", _i, [
                f.column && a.value ? (p(), ue(Vt, {
                  key: 0,
                  entry: a.value,
                  column: f.column
                }, null, 8, ["entry", "column"])) : (p(), h(Z, { key: 1 }, [
                  De(T(f.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          _("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (f) => E(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : B("", !0)
    ]));
  }
}), va = /* @__PURE__ */ fe(gi, [["__scopeId", "data-v-8e2c6c48"]]);
function yi() {
  const e = we();
  return g(() => ur(e.schema.value, e.entity.value));
}
const wi = ["src", "alt"], bi = ["title"], ki = /* @__PURE__ */ de({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), s = g(() => t.column.kind ?? "text"), a = g(() => Ae(t.column, t.entry.row)), r = g(
      () => s.value === "ordinal" ? t.entry.ordinal : Nt(t.column, t.entry.row)
    ), l = g(() => a.value), i = g(() => t.column.activate === !0 || !!t.column.click), o = g(() => $n(t.column)), u = g(() => Zs(t.column, t.entry.row));
    function f(m) {
      i.value && (m.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (m, b) => s.value === "component" && e.column.component ? (p(), ue(Ds(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (p(), ue(Ot, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : s.value === "image" ? (p(), h("img", {
      key: 2,
      class: "dc-cell__image",
      src: String(a.value ?? ""),
      alt: e.entry.parts.identity,
      loading: "lazy",
      style: ze({ maxHeight: e.column.height }),
      onClick: f
    }, null, 12, wi)) : e.column.drill ? (p(), ue(Vt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (p(), h("button", {
      key: 4,
      type: "button",
      class: nn(["dc-table__open", { "dc-truncate": o.value }]),
      title: u.value,
      onClick: f
    }, T(r.value), 11, bi)) : (p(), h(Z, { key: 5 }, [
      De(T(r.value), 1)
    ], 64));
  }
}), Cs = /* @__PURE__ */ fe(ki, [["__scopeId", "data-v-8a010beb"]]), $i = {
  key: 0,
  class: "dc-table__none"
}, xi = { class: "dc-table__detail" }, Ci = {
  key: 1,
  class: "dc-table"
}, Mi = ["data-dc-align", "data-dc-hide", "aria-sort"], Ei = ["onClick"], Si = ["onClick"], Pi = ["data-dc-align", "data-dc-hide", "title"], Ai = {
  key: 0,
  class: "dc-table__name"
}, zi = /* @__PURE__ */ de({
  __name: "TableView",
  setup(e) {
    const t = we(), n = bt(), s = yi();
    function a(m) {
      m && (t.query.value.sort === m ? t.toggleDirection() : t.setSort(m));
    }
    const r = g(() => t.entity.value?.label ?? "The result set"), l = g(() => new Set(t.sorts.value.map((m) => m.key))), i = (m) => m.sort !== void 0 && l.value.has(m.sort), o = (m) => {
      if (i(m))
        return t.query.value.sort !== m.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function u(m) {
      return [
        gs(m),
        m.muted ? "dc-table__muted" : "",
        m.mono ? "dc-mono" : "",
        $n(m) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function f(m, b) {
      if (!(!$n(m) || m.activate || m.click))
        return Zs(m, b.row);
    }
    return (m, b) => E(s).length ? (p(), h("table", Ci, [
      _("thead", null, [
        _("tr", null, [
          (p(!0), h(Z, null, ie(E(s), (y, k) => (p(), h("th", {
            key: E(hs)(y, k),
            scope: "col",
            class: nn(E(gs)(y)),
            style: ze({ width: y.width }),
            "data-dc-align": E(_s)(y),
            "data-dc-hide": y.hideBelow,
            "aria-sort": o(y)
          }, [
            i(y) ? (p(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: ($) => a(y.sort)
            }, T(y.label), 9, Ei)) : (p(), h(Z, { key: 1 }, [
              De(T(y.label), 1)
            ], 64))
          ], 14, Mi))), 128))
        ])
      ]),
      _("tbody", null, [
        (p(!0), h(Z, null, ie(E(n), (y) => (p(), h("tr", {
          key: y.key,
          class: "dc-table__row",
          onClick: (k) => E(t).activate(y.row)
        }, [
          (p(!0), h(Z, null, ie(E(s), (k, $) => (p(), h("td", {
            key: E(hs)(k, $),
            class: nn(u(k)),
            "data-dc-align": E(_s)(k),
            "data-dc-hide": k.hideBelow,
            title: f(k, y)
          }, [
            k.scope ? (p(), h("span", Ai, [
              ve(Cs, {
                column: k,
                entry: y
              }, null, 8, ["column", "entry"]),
              ve(Kt, { entry: y }, null, 8, ["entry"])
            ])) : (p(), ue(Cs, {
              key: 1,
              column: k,
              entry: y
            }, null, 8, ["column", "entry"]))
          ], 10, Pi))), 128))
        ], 8, Si))), 128))
      ])
    ])) : (p(), h("p", $i, [
      b[2] || (b[2] = _("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      _("span", xi, [
        De(T(r.value) + " has no ", 1),
        b[0] || (b[0] = _("code", null, "columns", -1)),
        b[1] || (b[1] = De(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ma = /* @__PURE__ */ fe(zi, [["__scopeId", "data-v-d6cf251d"]]);
function Ri(e) {
  const t = Tt([]), n = H(!1), s = Tt(null);
  let a = 0;
  const r = (o, u, f) => ({
    entity: o,
    rows: u.rows.map(
      (m, b) => ua(m, b, o, e.isPinned(m.id))
    ),
    total: u.total,
    count: f ? o.count : String(u.total)
  }), l = () => {
    const o = ++a, u = e.query.value, f = e.schema.value, m = e.entities.value, b = e.limit.value, y = Dn(u), k = m.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: $.key, facets: Ft($), page: 1 },
        schema: f,
        entity: $,
        limit: b,
        offset: 0
      })
    }));
    if (k.every(({ outcome: $ }) => !($ instanceof Promise))) {
      t.value = k.map(
        ({ entity: $, outcome: x }) => r($, x, y)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      o === a && (t.value = $.map(
        (x, z) => r(k[z].entity, x, y)
      ), s.value = null);
    }).catch(($) => {
      o === a && (s.value = $, t.value = []);
    }).finally(() => {
      o === a && (n.value = !1);
    });
  }, i = () => {
    try {
      l();
    } catch (o) {
      s.value = o, t.value = [], n.value = !1;
    }
  };
  return ye(
    [e.source, e.schema, e.query, e.entities, e.limit],
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: i };
}
const Ti = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Li = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Fi = ["data-dc-pending"], Di = ["data-dc-empty"], Ni = ["onClick"], Ii = { class: "dc-type__name" }, Oi = { class: "dc-type__count dc-mono" }, Vi = { class: "dc-type__sr" }, Ki = {
  key: 0,
  class: "dc-type__empty"
}, Bi = ["onClick"], qi = { class: "dc-type__identity" }, Wi = { class: "dc-type__primary dc-truncate" }, Ui = { class: "dc-type__secondary dc-mono dc-truncate" }, Hi = { class: "dc-type__trailing dc-mono" }, ji = { class: "dc-type__metric-value" }, Xi = { class: "dc-type__metric-label" }, Gi = {
  key: 0,
  class: "dc-type__date"
}, Yi = ["onClick"], Qi = /* @__PURE__ */ de({
  __name: "TypeCardsView",
  setup(e) {
    const t = we(), { previews: n, pending: s, error: a } = Ri({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (l) => t.isPinnedId(l)
    }), r = g(() => !t.isPristine.value);
    return (l, i) => E(a) ? (p(), h("p", Ti, " Could not load results: " + T(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !E(n).length && E(s) ? (p(), h("p", Li, " Running query… ")) : (p(), h("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      (p(!0), h(Z, null, ie(E(n), (o) => (p(), h("section", {
        key: o.entity.key,
        class: "dc-type",
        "data-dc-empty": o.rows.length ? "false" : "true"
      }, [
        _("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => E(t).setEntity(o.entity.key)
        }, [
          _("span", Ii, T(o.entity.label), 1),
          _("span", Oi, T(o.count), 1),
          i[0] || (i[0] = _("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          _("span", Vi, "Show only " + T(o.entity.label.toLowerCase()), 1)
        ], 8, Ni),
        o.rows.length ? B("", !0) : (p(), h("p", Ki, T(r.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), h(Z, null, ie(o.rows, (u) => (p(), h("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          _("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (f) => E(t).activate(u.row)
          }, [
            _("span", qi, [
              _("span", Wi, T(u.parts.identity), 1),
              _("span", Ui, T(u.parts.reference), 1)
            ])
          ], 8, Bi),
          _("span", Hi, [
            (p(!0), h(Z, null, ie(u.parts.metrics.slice(0, 1), (f) => (p(), ue(Vt, {
              key: f.column.key ?? f.label,
              class: "dc-type__metric",
              entry: u,
              column: f.column
            }, {
              default: gt(() => [
                _("span", ji, T(f.text), 1),
                _("span", Xi, T(f.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), h("span", Gi, T(u.parts.updated), 1)) : B("", !0),
            ve(Kt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        o.entity.create ? (p(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => E(t).create(o.entity)
        }, [
          i[1] || (i[1] = _("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          De(" " + T(o.entity.create), 1)
        ], 8, Yi)) : B("", !0)
      ], 8, Di))), 128))
    ], 8, Fi));
  }
}), ha = /* @__PURE__ */ fe(Qi, [["__scopeId", "data-v-b776cfb6"]]), Zi = ["data-dc-pending"], Ji = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, ec = { class: "dc-results__detail" }, tc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, nc = {
  key: 3,
  class: "dc-results__state"
}, sc = { class: "dc-results__detail" }, ac = /* @__PURE__ */ de({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = we(), s = {
      list: Mn,
      cards: da,
      grid: fa,
      table: ma,
      links: pa,
      preview: va
    }, a = g(() => Xs(n.query.value)), r = g(() => Bs(n.query.value.view, t.views)), l = g(() => s[r.value] ?? Mn), i = g(() => n.rows.value.length > 0), o = g(() => n.error.value !== null);
    return (u, f) => (p(), h("div", {
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      o.value ? (p(), h("p", Ji, [
        f[1] || (f[1] = _("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        _("span", ec, T(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), ue(ha, { key: 1 })) : !i.value && E(n).pending.value ? (p(), h("p", tc, [...f[2] || (f[2] = [
        _("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (p(), ue(Ds(l.value), { key: 4 })) : (p(), h("div", nc, [
        f[3] || (f[3] = _("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        _("span", sc, T(E(n).summary.value), 1),
        E(n).isPristine.value ? B("", !0) : (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: f[0] || (f[0] = (m) => E(n).clearFilters())
        }, T(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Zi));
  }
}), _a = /* @__PURE__ */ fe(ac, [["__scopeId", "data-v-4b83efc2"]]), rc = ["data-dc-theme"], lc = ["data-dc-width", "data-dc-align"], oc = { class: "dc-shell__panel" }, ic = /* @__PURE__ */ de({
  __name: "DataShell",
  props: /* @__PURE__ */ an({
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
  emits: /* @__PURE__ */ an(["activate", "create", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = sn(e, "open"), l = sn(e, "pinned"), i = Tn(), o = _t(Os, null), u = s.route || o ? null : sr(), f = s.route ?? o ?? u;
    He(() => u?.dispose?.());
    const m = g(() => Fr({ seed: s.schema.key })), b = g(() => s.source ?? m.value), y = Qr({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), k = Zr({
      source: b,
      query: y.query,
      schema: g(() => s.schema),
      entity: y.entity,
      limit: g(() => s.limit)
    });
    ye(y.query, (w) => a("query-change", w)), ye(
      [k.pageCount, k.pending, y.query],
      () => {
        if (k.pending.value) return;
        const w = k.pageCount.value;
        y.query.value.page > w && y.setPage(w, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Ns() ?? "dc-query-panel", x = H(null);
    function z() {
      r.value && (r.value = !1, Lt(() => {
        x.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const P = g(() => new Set(l.value));
    function S(w) {
      const A = new Set(P.value);
      A.has(w.id) ? A.delete(w.id) : A.add(w.id), l.value = [...A], a("toggle-pin", w);
    }
    function C(w, A) {
      y.narrow(Vr(s.schema, y.query.value, w), A?.key ?? null), a("drill", w, A);
    }
    const L = Br({
      ...y,
      schema: g(() => s.schema),
      entities: g(() => s.schema.entities),
      rows: k.rows,
      total: k.total,
      limit: g(() => s.limit),
      offset: k.offset,
      pageCount: k.pageCount,
      pending: k.pending,
      error: k.error,
      source: b,
      previewsPerType: g(() => s.previewsPerType),
      pinnable: g(() => s.pinnable === !0),
      isPinned: (w) => P.value.has(w.id),
      isPinnedId: (w) => P.value.has(w),
      togglePin: S,
      activate: (w) => a("activate", w),
      create: (w) => a("create", w),
      drill: C
    }), I = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: y.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: z
    }), (w, A) => (p(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: ze(I.value)
    }, [
      _("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ve(oa, {
          ref_key: "headerRef",
          ref: x,
          expanded: r.value,
          "panel-id": E($),
          views: e.views,
          onToggle: A[0] || (A[0] = (F) => r.value = !r.value)
        }, ps({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: gt(() => [
              qe(w.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views"]),
        r.value ? (p(), h(Z, { key: 0 }, [
          _("div", {
            class: "dc-shell__scrim",
            onClick: z
          }),
          _("div", oc, [
            ve(ca, {
              "panel-id": E($),
              views: e.views,
              onClose: z
            }, ps({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: gt(() => [
                  qe(w.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : B("", !0)
      ], 8, lc),
      qe(w.$slots, "results", {
        rows: E(L).rows.value,
        total: E(L).total.value,
        offset: E(L).offset.value,
        pageCount: E(L).pageCount.value,
        query: E(L).query.value,
        pending: E(L).pending.value
      }, () => [
        ve(_a, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, rc));
  }
}), cc = /* @__PURE__ */ fe(ic, [["__scopeId", "data-v-dea6c736"]]), Pt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, uc = ["aria-label"], dc = ["role", "aria-label"], fc = ["data-dc-item"], pc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, vc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], mc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, hc = { class: "dc-menu__label dc-truncate" }, _c = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, gc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, yc = /* @__PURE__ */ de({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = H(null), l = H([]), i = H(null), o = H(null), u = H(null), f = H(!1), m = g(
      () => s.items.flatMap((w, A) => Pt(w) ? [A] : [])
    ), b = g(() => {
      const w = [{ entries: [] }];
      return s.items.forEach((A, F) => {
        A.heading ? w.push({ heading: A, entries: [] }) : w[w.length - 1]?.entries.push({ item: A, index: F });
      }), w.filter((A) => A.entries.length > 0);
    }), y = H({ x: s.at.x, y: s.at.y });
    async function k() {
      y.value = { x: s.at.x, y: s.at.y }, await Lt();
      const w = r.value?.getBoundingClientRect();
      if (!w) return;
      const A = 8;
      let F = s.at.x, N = s.at.y;
      if (F + w.width > window.innerWidth - A) {
        const q = s.at.mirrorX === void 0 ? null : s.at.mirrorX - w.width;
        F = q !== null && q >= A ? q : window.innerWidth - w.width - A;
      }
      N + w.height > window.innerHeight - A && (N = window.innerHeight - w.height - A), y.value = { x: Math.max(A, F), y: Math.max(A, N) };
    }
    const $ = g(() => ({ left: `${y.value.x}px`, top: `${y.value.y}px` }));
    function x(w) {
      i.value = w, w !== null && Lt(() => l.value[w]?.focus());
    }
    function z(w, A) {
      const F = m.value;
      if (F.length === 0) return null;
      if (w === null) return A === 1 ? F[0] ?? null : F[F.length - 1] ?? null;
      const N = F.indexOf(w);
      return N === -1 ? F[0] ?? null : F[(N + A + F.length) % F.length] ?? null;
    }
    function P(w, A) {
      if (!s.items[w]?.items?.length) return;
      const N = l.value[w]?.getBoundingClientRect(), q = r.value?.getBoundingClientRect();
      !N || !q || (u.value = { x: q.right - 4, y: N.top - 4, mirrorX: q.left + 4 }, o.value = w, f.value = A);
    }
    function S(w) {
      const A = o.value;
      o.value = null, u.value = null, w && A !== null && x(A);
    }
    function C(w) {
      const A = s.items[w];
      if (!(!A || !Pt(A))) {
        if (A.items?.length) {
          P(w, !0);
          return;
        }
        a("choose", A);
      }
    }
    function L(w) {
      const A = w.key;
      if (A === "Escape") {
        w.preventDefault(), w.stopPropagation(), o.value !== null ? S(!0) : a("dismiss");
        return;
      }
      if (A === "ArrowDown" || A === "ArrowUp") {
        w.preventDefault(), w.stopPropagation(), S(!1), x(z(i.value, A === "ArrowDown" ? 1 : -1));
        return;
      }
      if (A === "Home" || A === "End") {
        w.preventDefault(), w.stopPropagation(), S(!1), x(z(null, A === "Home" ? 1 : -1));
        return;
      }
      if (A === "ArrowRight") {
        const F = i.value;
        F !== null && s.items[F]?.items?.length && (w.preventDefault(), w.stopPropagation(), P(F, !0));
        return;
      }
      if (A === "ArrowLeft") {
        o.value !== null && (w.preventDefault(), w.stopPropagation(), S(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const F = i.value;
        if (F === null) return;
        w.preventDefault(), w.stopPropagation(), C(F);
      }
    }
    function I(w) {
      const A = s.items[w];
      !A || !Pt(A) || (o.value !== null && o.value !== w && S(!1), x(w), A.items?.length && P(w, !1));
    }
    return er(() => {
      k(), s.autofocus && x(z(null, 1));
    }), ye(() => s.at, k, { deep: !0 }), ye(() => s.items, () => void k(), { deep: !0 }), He(() => {
      o.value = null;
    }), t({ root: r }), (w, A) => {
      const F = Is("MenuList", !0);
      return p(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: ze($.value),
        onKeydown: L
      }, [
        (p(!0), h(Z, null, ie(b.value, (N, q) => (p(), h("div", {
          key: `${q}-${N.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: N.heading ? "group" : "none",
          "aria-label": N.heading?.label
        }, [
          N.heading ? (p(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": N.heading.id
          }, T(N.heading.label), 9, fc)) : B("", !0),
          (p(!0), h(Z, null, ie(N.entries, ({ item: Q, index: Ce }) => (p(), h(Z, {
            key: Q.id ?? `${Ce}-${Q.label ?? ""}`
          }, [
            Q.separator ? (p(), h("div", pc)) : (p(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (Pe) => {
                Pe && (l.value[Ce] = Pe);
              },
              type: "button",
              class: "dc-menu__item",
              role: Q.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Q.checked === void 0 ? void 0 : Q.checked,
              "aria-haspopup": Q.items?.length ? "menu" : void 0,
              "aria-expanded": Q.items?.length ? o.value === Ce : void 0,
              "aria-disabled": Q.disabled ? "true" : void 0,
              disabled: Q.disabled,
              "data-dc-item": Q.id,
              tabindex: "-1",
              onClick: (Pe) => C(Ce),
              onMouseenter: (Pe) => I(Ce)
            }, [
              _("span", mc, T(Q.checked ? "✓" : ""), 1),
              _("span", hc, T(Q.label), 1),
              Q.shortcut ? (p(), h("span", _c, T(Q.shortcut), 1)) : Q.items?.length ? (p(), h("span", gc, "›")) : B("", !0)
            ], 40, vc))
          ], 64))), 128))
        ], 8, dc))), 128)),
        o.value !== null && u.value ? (p(), ue(F, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: u.value,
          label: e.items[o.value]?.label,
          autofocus: f.value,
          onChoose: A[0] || (A[0] = (N) => a("choose", N)),
          onDismiss: A[1] || (A[1] = (N) => S(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : B("", !0)
      ], 44, uc);
    };
  }
}), ga = /* @__PURE__ */ fe(yc, [["__scopeId", "data-v-9b1413fa"]]), wc = ["data-dc-theme", "aria-label"], bc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], kc = /* @__PURE__ */ de({
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
    }), a = t, r = H(null), l = H([]), i = H(null), o = H(null), u = H(!1), f = g(
      () => n.menus.flatMap((C, L) => Pt(C) ? [L] : [])
    );
    function m(C, L) {
      const I = l.value[C]?.getBoundingClientRect(), w = n.menus[C];
      !I || !w || !Pt(w) || (o.value = { x: I.left, y: I.bottom + 2, mirrorX: I.right }, i.value = C, u.value = L);
    }
    function b(C) {
      const L = i.value;
      i.value = null, o.value = null, C && L !== null && l.value[L]?.focus();
    }
    function y(C) {
      i.value === C ? b(!0) : m(C, !1);
    }
    function k(C) {
      i.value === null || i.value === C || m(C, !1);
    }
    function $(C, L) {
      const I = f.value;
      if (I.length === 0) return null;
      if (C === null) return L === 1 ? I[0] ?? null : I[I.length - 1] ?? null;
      const w = I.indexOf(C);
      return w === -1 ? I[0] ?? null : I[(w + L + I.length) % I.length] ?? null;
    }
    function x(C) {
      const L = C.key;
      if (L === "Escape") {
        if (i.value === null) return;
        C.preventDefault(), b(!0);
        return;
      }
      if (L === "ArrowDown" && i.value === null) {
        const A = z();
        if (A === null) return;
        C.preventDefault(), m(A, !0);
        return;
      }
      if (L !== "ArrowLeft" && L !== "ArrowRight") return;
      const I = i.value ?? z(), w = $(I, L === "ArrowRight" ? 1 : -1);
      w !== null && (C.preventDefault(), i.value !== null ? m(w, !0) : l.value[w]?.focus());
    }
    function z() {
      const C = l.value.findIndex((L) => L === document.activeElement);
      return C === -1 ? f.value[0] ?? null : C;
    }
    function P(C) {
      const L = C.target;
      !L || r.value?.contains(L) || b(!1);
    }
    ye(i, (C) => {
      C !== null ? window.addEventListener("pointerdown", P, !0) : window.removeEventListener("pointerdown", P, !0);
    }), He(() => window.removeEventListener("pointerdown", P, !0));
    function S(C) {
      b(!0), C.action?.(), a("choose", C);
    }
    return (C, L) => (p(), h("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: ze(s.value),
      onKeydown: x
    }, [
      (p(!0), h(Z, null, ie(e.menus, (I, w) => (p(), h("button", {
        key: I.id ?? I.label ?? w,
        ref_for: !0,
        ref: (A) => {
          A && (l.value[w] = A);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === w,
        "aria-disabled": I.disabled ? "true" : void 0,
        disabled: I.disabled,
        "data-dc-menu": I.id ?? I.label,
        tabindex: w === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (A) => y(w),
        onMouseenter: (A) => k(w)
      }, T(I.label), 41, bc))), 128)),
      i.value !== null && o.value ? (p(), ue(ga, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: S,
        onDismiss: L[0] || (L[0] = (I) => b(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : B("", !0)
    ], 44, wc));
  }
}), Yu = /* @__PURE__ */ fe(kc, [["__scopeId", "data-v-93dbd2e4"]]), $c = ["aria-label", "aria-expanded", "disabled"], xc = { "aria-hidden": "true" }, Cc = /* @__PURE__ */ de({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = H(null), a = H(null), r = H(null), l = H(!1), i = g(() => r.value !== null);
    function o(k) {
      const $ = s.value?.getBoundingClientRect();
      $ && (r.value = { x: $.left, y: $.bottom + 4, mirrorX: $.right }, l.value = k);
    }
    function u(k) {
      r.value = null, k && s.value?.focus();
    }
    function f() {
      i.value ? u(!0) : o(!1);
    }
    function m(k) {
      k.key !== "ArrowDown" || i.value || (k.preventDefault(), o(!0));
    }
    function b(k) {
      const $ = k.target;
      $ && (s.value?.contains($) || a.value?.root?.contains($) || u(!1));
    }
    ye(i, (k) => {
      k ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), He(() => window.removeEventListener("pointerdown", b, !0));
    function y(k) {
      u(!0), k.action?.(), n("choose", k);
    }
    return (k, $) => (p(), h(Z, null, [
      _("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: m
      }, [
        _("span", xc, T(e.glyph), 1)
      ], 40, $c),
      r.value ? (p(), ue(ga, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: l.value,
        onChoose: y,
        onDismiss: $[0] || ($[0] = (x) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : B("", !0)
    ], 64));
  }
}), Hn = /* @__PURE__ */ fe(Cc, [["__scopeId", "data-v-48f5ada5"]]), kt = (e) => e.kind === "split", U = (e) => e.kind === "group", Y = (e) => e.kind === "float", lt = { x: 16, y: 16, w: 360, h: 260 }, ln = 28, ya = 120, En = 220, wa = 38, dt = 6;
function Bt(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const l = t(a.node, r);
    return l === a.node ? a : (n = !0, { ...a, node: l });
  });
  return n ? { ...e, frames: s } : e;
}
function Ne(e) {
  return { kind: "group", panels: [e] };
}
function Qu(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ce = (e) => typeof e == "string", jn = (e) => ce(e) ? Ne(e) : e, qt = (e) => ce(e) ? [e] : je(e), Ms = (e) => e.panels.filter(ce), Mc = (e) => e.panels.filter((t) => !ce(t)), Se = (e, t) => e.panels.includes(t);
function Wt(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (ce(r) || !ne(r, t)) return r;
    const l = n(r);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, panels: a } : e;
}
function cn(e, t) {
  return { node: e, rect: { ...lt, ...t } };
}
function Xn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Gn(e, t) {
  const n = { ...lt, ...t };
  return Xn(
    e.map(
      (s, a) => cn(s, {
        ...n,
        x: n.x + a * ln,
        y: n.y + a * ln
      })
    )
  );
}
function Yn(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Qn = (e, t, n) => Yn("row", e, t, n), Zu = (e, t, n) => Yn("column", e, t, n);
function he(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Ju = (e) => ({ ...e, headless: !0 }), ed = (e) => ({ ...e, fixedView: !0 }), Ec = (e) => e === "left" || e === "right" ? "row" : "column";
function je(e) {
  return U(e) ? e.panels.flatMap(qt) : Y(e) ? e.frames.flatMap((t) => je(t.node)) : e.children.flatMap(je);
}
function ne(e, t) {
  return U(e) ? e.panels.some((n) => ce(n) ? n === t : ne(n, t)) : Y(e) ? e.frames.some((n) => ne(n.node, t)) : e.children.some((n) => ne(n, t));
}
const ba = (e) => je(e).length === 0, Sn = (e) => !U(e) && ct(e), Pn = (e) => ba(e) && !Sn(e);
function un(e) {
  return kt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : Y(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ce(t) ? [] : [{ node: t, index: n }]);
}
const Zn = (e) => un(e).map((t) => t.node);
function ut(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => ce(s) ? s === t : ne(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function ka(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && ce(t) ? t : "";
}
function $e(e) {
  if (ce(e)) return e;
  if (U(e)) {
    const n = e.panels[ut(e)];
    return n === void 0 ? "" : $e(n);
  }
  if (Y(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? $e(n.node) : "";
  }
  const t = e.children[0];
  return t ? $e(t) : "";
}
function pt(e, t) {
  if (U(e) && Se(e, t)) return e;
  for (const n of Zn(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function Sc(e) {
  const t = Zn(e).flatMap(Sc);
  return U(e) ? [e, ...t] : t;
}
function ge(e, t) {
  if (U(e)) {
    for (const n of Mc(e)) {
      const s = ge(n, t);
      if (s) return s;
    }
    return null;
  }
  if (Y(e)) {
    for (const n of e.frames)
      if (ne(n.node, t))
        return ge(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = ge(n, t);
    if (s) return s;
  }
  return null;
}
function _n(e, t, n = ya) {
  const s = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), a = s(e.w, t.w), r = s(e.h, t.h), l = (i, o, u) => Math.min(Math.max(i, 0), Math.max(u - o, 0));
  return {
    x: Math.round(l(e.x, a, t.w)),
    y: Math.round(l(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function Es(e, t, n, s, a = ya) {
  let { x: r, y: l, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (o = e.h + s), t.includes("n") && (o = e.h - s, l = e.y + s), i < a && (t.includes("w") && (r = e.x + e.w - a), i = a), o < a && (t.includes("n") && (l = e.y + e.h - a), o = a), { x: r, y: l, w: i, h: o };
}
const $a = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (U(e)) return Wt(e, t, (r) => vt(r, t, n));
  if (Y(e)) {
    let r = !1;
    const l = e.frames.map((i) => {
      if (!ne(i.node, t)) return i;
      if (ge(i.node, t)) {
        const u = vt(i.node, t, n);
        return u === i.node ? i : (r = !0, { ...i, node: u });
      }
      const o = n(i);
      return o === i ? i : (r = !0, o);
    });
    return r ? { ...e, frames: l } : e;
  }
  if (!ne(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const l = vt(r, t, n);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, children: a } : e;
}
function Pc(e, t, n) {
  return vt(e, t, (s) => $a(s.rect, n) ? s : { ...s, rect: n });
}
const Je = (e) => e.maximized === !0, xa = (e) => (t) => {
  if (Je(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function Ac(e, t, n = !0) {
  return vt(e, t, xa(n));
}
function td(e, t) {
  const n = ge(e, t);
  return n ? Ac(e, t, !Je(n)) : e;
}
const rt = (e) => e.minimized === !0, Ca = (e) => (t) => {
  if (rt(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function zc(e, t, n = !0) {
  return vt(e, t, Ca(n));
}
function nd(e, t) {
  const n = ge(e, t);
  return n ? zc(e, t, !rt(n)) : e;
}
function at(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = tt(e, t.slice(0, -1));
  return !s || !Y(s) ? null : s.frames[n] ?? null;
}
function An(e, t) {
  if (Y(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ne(s.node, t)) continue;
      const a = An(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of un(e)) {
    if (!ne(n, t)) continue;
    const a = An(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function Jn(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = tt(e, a);
  if (!r || !Y(r)) return e;
  const l = r.frames[s];
  if (!l) return e;
  const i = n(l);
  if (i === l) return e;
  const o = [...r.frames];
  return o[s] = i, it(e, a, { ...r, frames: o });
}
function Ss(e, t, n) {
  return Jn(
    e,
    t,
    (s) => $a(s.rect, n) ? s : { ...s, rect: n }
  );
}
function Rc(e, t, n = !0) {
  return Jn(e, t, xa(n));
}
function Tc(e, t, n = !0) {
  return Jn(e, t, Ca(n));
}
function At(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (Y(e)) {
    const l = e.frames[n];
    if (!l) return e;
    const i = At(l.node, s), o = i === l.node ? l : { ...l, node: i };
    if (n === e.frames.length - 1 && o === l) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(o), { ...e, frames: u };
  }
  const a = tt(e, [n]);
  if (!a) return e;
  const r = At(a, s);
  return r === a ? e : it(e, [n], r);
}
function Lc(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (Y(s) && (n[r] = s.frames.length - 1), s = tt(s, [a]));
  }), n;
}
function Jt(e, t, n, s) {
  if (U(e)) return Wt(e, n, (l) => Jt(l, t, n, s));
  if (Y(e)) {
    const l = e.frames.findIndex((o) => ne(o.node, n)), i = e.frames[l];
    if (!i) return e;
    if (ge(i.node, n)) {
      const o = Jt(i.node, t, n, s);
      if (o === i.node) return e;
      const u = [...e.frames];
      return u[l] = { ...i, node: o }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, cn(Ne(t), s)] };
  }
  if (!ne(e, n)) return e;
  let a = !1;
  const r = e.children.map((l) => {
    const i = Jt(l, t, n, s);
    return i !== l && (a = !0), i;
  });
  return a ? { ...e, children: r } : e;
}
function Ps(e, t, n, s) {
  if (t === n || !ne(e, t) || !ne(e, n) || !ge(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const r = Jt(a, t, n, s);
  return r === a ? e : _e(r);
}
function Fc(e, t, n) {
  return Y(e) ? { ...e, frames: [...e.frames, cn(Ne(t), n)] } : U(e) ? Ea(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ne(t)],
    sizes: [...Ue(e), 1],
    ...he(e)
  };
}
function Ma(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return Fc(e, t, s);
  const r = n.slice(1), l = (f, m) => m === a ? Ma(f, t, r, s) : ot(f, t);
  if (Y(e)) {
    const f = e.frames.flatMap((m, b) => {
      const y = l(m.node, b);
      return y ? [y === m.node ? m : { ...m, node: y }] : [];
    });
    return { ...e, frames: f };
  }
  if (U(e)) {
    const f = ut(e), m = [];
    e.panels.forEach((k, $) => {
      if (ce(k)) {
        k !== t && m.push(k);
        return;
      }
      const x = l(k, $);
      x && m.push(x);
    });
    const y = e.active && m.some((k) => qt(k).includes(e.active)) ? e.active : $e(m[f] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...y ? { active: y } : {},
      ...he(e)
    };
  }
  const i = Ue(e), o = [], u = [];
  return e.children.forEach((f, m) => {
    const b = l(f, m);
    b && (o.push(b), u.push(i[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: u, ...he(e) };
}
function As(e, t, n, s) {
  const a = tt(e, n);
  return !a || !ba(a) || !ne(e, t) ? e : _e(Ma(e, t, n, s));
}
function gn(e, t) {
  if (U(e)) return Wt(e, t, (a) => gn(a, t));
  if (Y(e)) {
    const a = e.frames.findIndex((u) => ne(u.node, t)), r = e.frames[a];
    if (!r) return e;
    const l = gn(r.node, t), i = l === r.node ? r : { ...r, node: l };
    if (a === e.frames.length - 1 && i === r) return e;
    const o = [...e.frames];
    return o.splice(a, 1), o.push(i), { ...e, frames: o };
  }
  if (!ne(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = gn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function es(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, l) => r + l, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const Ue = (e) => es(e.children.length, e.sizes), Re = (e) => {
  const t = U(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function _e(e) {
  if (U(e)) return Dc(e);
  if (Y(e)) {
    const i = e.frames.flatMap((o) => {
      const u = _e(o.node);
      return Pn(u) ? [] : [u === o.node ? o : { ...o, node: u }];
    });
    return i.length === e.frames.length && i.every((o, u) => o === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = Ue(e), n = Re(e), s = [], a = [], r = [];
  e.children.forEach((i, o) => {
    const u = _e(i), f = t[o] ?? 0;
    if (Pn(u)) return;
    if (!n && kt(u) && u.direction === e.direction && !Re(u) && !ct(u)) {
      const b = Ue(u);
      u.children.forEach((y, k) => {
        s.push(y), a.push(f * (b[k] ?? 0));
      });
      return;
    }
    s.push(u), a.push(f);
    const m = n?.[o];
    m && r.push(m);
  });
  const l = s[0];
  return s.length === 1 && l && !ct(e) ? l : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: es(s.length, a),
    ...he(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function Dc(e) {
  if (e.panels.every(ce)) return e;
  const t = $e(e), n = Re(e), s = [], a = [];
  e.panels.forEach((i, o) => {
    const u = n?.[o];
    if (ce(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const f = _e(i);
    if (!Pn(f)) {
      if (U(f) && !ct(f) && !Re(f)) {
        s.push(...f.panels);
        return;
      }
      s.push(f), u && a.push(u);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !ce(r) && !ct(e))
    return r;
  if (s.length === e.panels.length && s.every((i, o) => i === e.panels[o]))
    return e;
  const l = t && s.some((i) => qt(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...l ? { active: l } : {},
    ...he(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ot(e, t) {
  if (Y(e)) {
    const l = e.frames.flatMap((i) => {
      const o = ot(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return l.length === 0 && !Sn(e) ? null : { ...e, frames: l };
  }
  if (U(e)) {
    if (!ne(e, t)) return e;
    const l = ut(e), i = [];
    for (const f of e.panels) {
      if (ce(f)) {
        f !== t && i.push(f);
        continue;
      }
      const m = ot(f, t);
      m && i.push(m);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((f) => qt(f).includes(e.active)) ? e.active : $e(i[l] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...he(e) } : { kind: "group", panels: i, ...he(e) };
  }
  const n = Ue(e), s = [], a = [];
  if (e.children.forEach((l, i) => {
    const o = ot(l, t);
    o && (s.push(o), a.push(n[i] ?? 0));
  }), s.length === 0)
    return Sn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...he(e) } : null;
  const r = s[0];
  return s.length === 1 && r && !ct(e) ? r : _e({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...he(e)
  });
}
function Ea(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...he(e) };
}
function Et(e, t, n, s, a) {
  const r = (y) => Bt(
    y,
    (k) => ne(k, n) ? Et(k, t, n, s, a) : k
  );
  if (s === "float") return e;
  const l = (y) => Wt(y, n, (k) => Et(k, t, n, s, a));
  if (s === "center")
    return U(e) ? Se(e, n) ? Ea(e, t, a) : l(e) : Y(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (y) => ne(y, n) ? Et(y, t, n, s, a) : y
      )
    };
  const i = Ec(s), o = s === "left" || s === "top", u = (y) => ({
    kind: "split",
    direction: i,
    children: o ? [Ne(t), y] : [y, Ne(t)],
    sizes: [0.5, 0.5]
  });
  if (U(e)) return Se(e, n) ? u(e) : l(e);
  if (Y(e)) return r(e);
  const f = Ue(e), m = e.children.findIndex(
    (y) => U(y) && Se(y, n)
  );
  if (m >= 0 && e.direction === i) {
    const y = (f[m] ?? 0) / 2, k = [...e.children], $ = [...f];
    return k.splice(o ? m : m + 1, 0, Ne(t)), $.splice(m, 1, y, y), {
      kind: "split",
      direction: i,
      children: k,
      sizes: $,
      ...he(e)
    };
  }
  const b = e.children.map((y) => ne(y, n) ? U(y) && Se(y, n) ? u(y) : Et(y, t, n, s) : y);
  return {
    kind: "split",
    direction: e.direction,
    children: b,
    sizes: f,
    ...he(e)
  };
}
function mt(e, t) {
  if (U(e)) {
    if (Se(e, t))
      return ka(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((o) => !ce(o) && ne(o, t)), r = e.panels[a];
    if (r === void 0 || ce(r)) return e;
    const l = mt(r, t);
    if (l === r && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = l, { ...e, panels: i, active: t };
  }
  if (!ne(e, t)) return e;
  if (Y(e)) return Bt(e, (a) => mt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = mt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function zt(e, t, n) {
  if (U(e)) {
    if (!Se(e, t)) return Wt(e, t, (u) => zt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const l = Re(e), i = l ? [...l] : void 0;
    i && i.splice(a, 0, ...i.splice(s, 1));
    const o = $e(e);
    return {
      kind: "group",
      panels: r,
      ...o ? { active: o } : {},
      ...he(e),
      ...i ? { places: i } : {}
    };
  }
  return ne(e, t) ? Y(e) ? Bt(e, (s) => zt(s, t, n)) : { ...e, children: e.children.map((s) => zt(s, t, n)) } : e;
}
function en(e, t, n) {
  if (t === n) return e;
  if (U(e)) {
    if (!ne(e, t) && !ne(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => ce(r) ? s(r) : en(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return Y(e) ? Bt(e, (s) => en(s, t, n)) : { ...e, children: e.children.map((s) => en(s, t, n)) };
}
function Gt(e, t, n, s, a) {
  if (s === "float" || !ne(e, t) || !ne(e, n)) return e;
  const r = pt(e, t);
  if (s === "center" && r && Se(r, n)) {
    if (a === void 0) return e;
    const i = r.panels.indexOf(t), o = a > i ? a - 1 : a;
    return o === i ? e : mt(zt(e, t, o), t);
  }
  if (t === n) return e;
  const l = ot(e, t);
  return l ? _e(Et(l, t, n, s, a)) : e;
}
function Sa(e, t, n) {
  if (U(e)) {
    const a = e.panels[t];
    if (a === void 0 || ce(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (Y(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const r = [...e.frames];
    return r[t] = { ...a, node: n }, { ...e, frames: r };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function Ut(e, t, n) {
  const s = un(e);
  if (!U(e) && s.some(({ node: a }) => U(a) && Se(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!ne(a, t)) continue;
    const l = Ut(a, t, n);
    return l ? Sa(e, r, l) : null;
  }
  return null;
}
function sd(e, t, n) {
  const s = Ut(
    e,
    t,
    (a) => kt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? _e(s) : e;
}
function Pa(e) {
  return Y(e) ? [e] : Re(e) || ct(e) ? [e] : U(e) ? [...e.panels] : e.children.flatMap(Pa);
}
function Aa(e, t) {
  if (U(e)) return e;
  const n = Zn(e).map(Pa), s = n.flat(), a = t && s.some((l) => qt(l).includes(t)) ? t : void 0, r = Nc(e, n);
  return _e({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...he(e),
    ...r ? { places: r } : {}
  });
}
function Nc(e, t) {
  const n = Y(e) ? e.frames.map(({ node: s, ...a }) => a) : Re(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Ic(e, t) {
  const n = Ut(e, t, (s) => Aa(s, t));
  return n ? _e(n) : e;
}
function ts(e, t, n) {
  if (U(e) && Se(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of un(e)) {
    if (!ne(s, t)) continue;
    const r = ts(s, t, n);
    return r ? Sa(e, a, r) : null;
  }
  return null;
}
function zs(e, t, n) {
  const s = ts(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = Re(a);
    return {
      ...Yn(n, a.panels.map(jn)),
      ...he(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? _e(s) : e;
}
function zn(e, t) {
  if (U(e)) return e;
  if (Y(e)) {
    const a = e.frames.findIndex(
      (i) => U(i.node) && i.node.panels.includes(t)
    ), r = e.frames[a], l = r && U(r.node) ? r.node : null;
    if (r && l && l.panels.length > 1) {
      const i = Gn(l.panels.map(jn), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return Bt(e, (i) => zn(i, t));
  }
  if (!ne(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = zn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Oc(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (ge(e, t)?.node === s) {
    const l = zn(e, t);
    return l === e ? e : _e(l);
  }
  const r = ts(e, t, (l) => ({
    ...Xn(za(l.panels.map(jn), Re(l), n)),
    ...he(l)
  }));
  return r ? _e(r) : e;
}
function za(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Gn(e, n).frames;
}
function Ra(e, t) {
  return { ...Xn(za(e.children, Re(e), t)), ...he(e) };
}
function ad(e, t, n) {
  const s = Ut(
    e,
    t,
    (a) => Y(a) ? a : Ra(a, n)
  );
  return s ? _e(s) : U(e) && Se(e, t) ? Gn([e], n) : e;
}
function Vc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function Ta(e, t) {
  const n = Vc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...he(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function rd(e, t, n = "row") {
  const s = Ut(
    e,
    t,
    (a) => Y(a) ? Ta(a, n) : a
  );
  return s ? _e(s) : e;
}
function La(e) {
  if (Y(e)) return null;
  const t = U(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ce(t) || U(t) && t.panels.length === 1 && ce(t.panels[0]) ? null : t;
}
const Kc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Bc(e, t) {
  const n = La(e);
  return n ? t === "inner" ? n : { ...Kc(n), ...he(e) } : e;
}
function wt(e) {
  return e.title ? e.title : U(e) ? "" : Y(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Rt(e, t) {
  if (U(e)) {
    const s = e.panels[ut(e)];
    return s === void 0 ? "" : ce(s) ? t(s) ?? s : wt(s) || Rt(s, t);
  }
  if (e.title) return e.title;
  if (Y(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Rt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Rt(n, t) : "";
}
function tt(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (kt(n)) n = n.children[s];
    else if (Y(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || ce(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function it(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (Y(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const u = it(o.node, a, n);
    if (u === o.node) return e;
    const f = [...e.frames];
    return f[s] = { ...o, node: u }, { ...e, frames: f };
  }
  if (U(e)) {
    const o = e.panels[s];
    if (o === void 0 || ce(o)) return e;
    const u = it(o, a, n);
    if (u === o) return e;
    const f = [...e.panels];
    return f[s] = u, { ...e, panels: f };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = it(r, a, n);
  if (l === r) return e;
  const i = [...e.children];
  return i[s] = l, { ...e, children: i };
}
function tn(e, t, n) {
  if (t.length === 0)
    return kt(e) ? { ...e, sizes: es(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (Y(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const o = tn(i.node, a, n);
    if (o === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: o }, { ...e, frames: u };
  }
  if (U(e)) {
    const i = e.panels[s];
    if (i === void 0 || ce(i)) return e;
    const o = tn(i, a, n);
    if (o === i) return e;
    const u = [...e.panels];
    return u[s] = o, { ...e, panels: u };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = [...e.children];
  return l[s] = tn(r, a, n), { ...e, children: l };
}
function Rs(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const l = a + r;
  if (l < s * 2) return e;
  const i = [...e], o = Math.min(Math.max(a + n, s), l - s);
  return i[t] = o, i[t + 1] = l - o, i;
}
function on(e) {
  if (!U(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ce(t) ? e : { ...Qn([qc(e)]), ...he(e) };
}
const qc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ts(e) {
  return e.length === 0 ? null : Qn(e.map(Ne));
}
function Wc(e, t) {
  if (!e) return Ts(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const o of je(e))
    !n.has(o) || s.has(o) ? a.add(o) : s.add(o);
  let r = e;
  for (const o of a)
    r = r ? ot(r, o) : null;
  const l = new Set(r ? je(r) : []), i = t.filter((o) => !l.has(o));
  if (i.length === 0) return r ? on(_e(r)) : null;
  if (!r) return Ts(i);
  if (Y(r)) {
    const o = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...i.map(
          (u, f) => cn(Ne(u), {
            x: lt.x + (o + f) * ln,
            y: lt.y + (o + f) * ln
          })
        )
      ]
    };
  }
  return on(_e(Qn([r, ...i.map(Ne)])));
}
const ns = Symbol("dc.windowContext");
function Uc(e) {
  return Rn(ns, e), e;
}
function ss() {
  const e = _t(ns, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Hc = ["data-dc-glyph"], jc = { class: "dc-glyph__line" }, Xc = ["d"], Gc = {
  key: 0,
  class: "dc-glyph__aqua"
}, Yc = ["d"], Qc = /* @__PURE__ */ de({
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
      _("g", jc, [
        (p(!0), h(Z, null, ie(t[e.kind], (r) => (p(), h("path", {
          key: r,
          d: r
        }, null, 8, Xc))), 128))
      ]),
      n[e.kind] ? (p(), h("g", Gc, [
        (p(!0), h(Z, null, ie(n[e.kind], (r) => (p(), h("path", {
          key: r,
          d: r
        }, null, 8, Yc))), 128))
      ])) : B("", !0)
    ], 8, Hc));
  }
}), ht = /* @__PURE__ */ fe(Qc, [["__scopeId", "data-v-4d2872c0"]]), Zc = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Jc = ["data-dc-movable"], eu = { class: "dc-float__title dc-truncate" }, tu = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, nu = ["aria-label", "aria-pressed", "data-dc-minimize"], su = ["aria-label", "aria-pressed", "data-dc-maximize"], au = ["aria-label", "data-dc-close"], ru = { class: "dc-float__content" }, lu = ["data-dc-handle", "onPointerdown"], ou = /* @__PURE__ */ de({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ss(), s = g(() => $e(t.frame.node)), a = g(() => n.panelFor(s.value)?.fixed === !0), r = g(() => Je(t.frame)), l = g(() => rt(t.frame)), i = g(() => r.value || l.value), o = g(() => n.resizable.value && !a.value && !i.value), u = g(() => n.movable.value && !a.value && !i.value), f = g(() => {
      const L = je(t.frame.node);
      return L.length === 1 ? L[0] ?? null : null;
    }), m = g(() => f.value !== null && n.closable(f.value)), b = g(() => t.frame.node.headless === !0), y = g(
      () => !b.value && (!U(t.frame.node) || l.value)
    ), k = g(
      () => t.frame.title || wt(t.frame.node) || Rt(t.frame.node, (L) => n.panelFor(L)?.title)
    ), $ = g(() => n.spaceMenu(t.path));
    function x(L) {
      L.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, L, "move");
    }
    function z(L) {
      L.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const P = g(() => {
      const L = n.framing.value;
      return L !== null && ne(t.frame.node, L);
    }), S = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${En}px`,
        height: `${wa}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), C = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (L, I) => (p(), h("div", {
      class: "dc-float",
      style: ze(S.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": l.value ? "true" : "false",
      "data-dc-dragging": P.value ? "true" : "false",
      onPointerdown: I[3] || (I[3] = (w) => E(n).raiseAt(e.path))
    }, [
      y.value ? (p(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: x,
        onDblclick: z
      }, [
        _("span", eu, T(k.value), 1),
        $.value.length ? (p(), ue(Hn, {
          key: 0,
          items: $.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : B("", !0),
        !a.value || l.value && m.value && f.value ? (p(), h("div", tu, [
          a.value ? B("", !0) : (p(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": l.value,
            "data-dc-minimize": s.value,
            onClick: I[0] || (I[0] = (w) => E(n).toggleMinimizeAt(e.path))
          }, [
            ve(ht, {
              kind: l.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, nu)),
          a.value ? B("", !0) : (p(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: I[1] || (I[1] = (w) => E(n).toggleMaximizeAt(e.path))
          }, [
            ve(ht, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, su)),
          l.value && m.value && f.value ? (p(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": f.value,
            onClick: I[2] || (I[2] = (w) => E(n).close(f.value))
          }, [
            ve(ht, { kind: "close" })
          ], 8, au)) : B("", !0)
        ])) : B("", !0)
      ], 40, Jc)) : B("", !0),
      _("div", ru, [
        qe(L.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), h(Z, null, ie(o.value ? C : [], (w) => (p(), h("span", {
        key: w,
        class: "dc-float__grip",
        "data-dc-handle": w,
        "aria-hidden": "true",
        onPointerdown: Fe((A) => E(n).beginFrameDragAt(e.path, A, w), ["stop"])
      }, null, 40, lu))), 128))
    ], 44, Zc));
  }
}), iu = /* @__PURE__ */ fe(ou, [["__scopeId", "data-v-f035684c"]]), as = Symbol("dc.paneContext");
function cu(e) {
  return Rn(as, e), e;
}
function ld() {
  return _t(as, null);
}
function od(e) {
  const t = _t(ns, null), n = _t(as, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Mt(e)
  );
  return tr() && Fs(s), s;
}
const uu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], du = ["data-dc-movable"], fu = ["aria-label", "aria-pressed"], pu = ["data-dc-space-name"], vu = { class: "dc-truncate" }, mu = ["aria-label"], hu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, _u = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], gu = { class: "dc-tab__name dc-truncate" }, yu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, wu = ["aria-label", "data-dc-close", "onClick"], bu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ku = { class: "dc-pane__tools" }, $u = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, xu = ["aria-label", "data-dc-minimize"], Cu = ["aria-label", "aria-pressed", "data-dc-maximize"], Mu = ["aria-label", "data-dc-close"], Eu = ["id", "role", "aria-labelledby"], Su = ["id", "role", "aria-labelledby"], Pu = ["data-dc-edge"], Au = /* @__PURE__ */ de({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ss(), s = Ns() ?? "dc-pane", a = g(
      () => t.group.panels.flatMap((O, W) => {
        if (!ce(O)) {
          const xe = wt(O) || Rt(O, (be) => n.panelFor(be)?.title);
          return [{ kind: "space", index: W, id: `space-${W}`, title: xe, node: O }];
        }
        const ee = n.panelFor(O);
        return ee ? [{ kind: "panel", index: W, id: O, title: ee.title, panel: ee }] : [];
      })
    ), r = g(() => a.value.length > 1), l = g(() => {
      const O = ut(t.group);
      return a.value.find((W) => W.index === O) ?? a.value[0] ?? null;
    }), i = g(() => l.value?.kind === "space" ? l.value.node : null), o = g(() => i.value ? "" : ka(t.group)), u = g(() => i.value ? null : n.panelFor(o.value)), f = g(() => l.value?.title ?? ""), m = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), b = g(() => [...t.path, l.value?.index ?? 0]), y = g(() => o.value || Ms(t.group)[0] || ""), k = g(() => n.viewFor(o.value)), $ = g(() => t.group.headless === !0), x = g(() => n.focused.value === o.value), z = g(() => n.dragging.value === o.value), P = g(() => n.moving.value === o.value), S = g(() => n.frameOf(y.value) !== null), C = g(() => n.panelFor(y.value)?.fixed === !0), L = g(
      () => !i.value && (n.canMove(o.value) || S.value && n.movable.value && !C.value)
    ), I = g(
      () => i.value ? n.spaceMenu(b.value) : n.menuFor(o.value)
    ), w = (O) => n.closable(O);
    cu({ panel: o });
    const A = g(() => n.maximized(y.value)), F = g(
      () => S.value && !C.value || !r.value && !!u.value && w(u.value.id)
    ), N = (O) => `${s}-tab-${O}`, q = g(() => `${s}-body`), Q = g(() => {
      const O = n.dropTarget.value;
      return !O || !Se(t.group, O.panel) || O.edge === "float" ? null : O;
    }), Ce = g(() => Q.value?.index === void 0 ? Q.value?.edge ?? null : null), Pe = g(() => Q.value?.index ?? null), V = () => u.value ? n.renderContent(u.value, k.value, x.value) ?? null : null, J = () => u.value ? n.renderActions(u.value, k.value, x.value) ?? null : null;
    let se = null;
    function ae(O) {
      const W = se !== null && Math.hypot(O.clientX - se.x, O.clientY - se.y) >= 4;
      return se = null, W;
    }
    const me = (O) => O.kind === "panel" ? O.id : $e(O.node);
    function Me(O, W) {
      W.kind !== "space" && (n.focus(W.id), se = { x: O.clientX, y: O.clientY }, n.beginDrag(W.id, O));
    }
    function Xe(O, W) {
      if (ae(O)) return;
      const ee = me(W);
      ee && n.selectPanel(ee);
    }
    function Ge(O) {
      o.value && n.focus(o.value), !O.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (S.value ? n.beginFrameDrag(y.value, O, "move") : n.beginDrag(o.value, O));
    }
    function Ye(O) {
      se = { x: O.clientX, y: O.clientY }, n.beginDrag(o.value, O);
    }
    function Qe(O) {
      ae(O) || n.toggleMoveMode(o.value);
    }
    const Ie = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Oe(O) {
      if (!P.value) return;
      if (O.key === "Escape") {
        O.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const W = Ie[O.key];
      W && (O.preventDefault(), S.value ? n.nudgeFrame(o.value, W, O.shiftKey) : n.nudge(o.value, W, O.shiftKey));
    }
    function Ve(O) {
      !S.value || O.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(y.value);
    }
    function $t(O, W) {
      O.stopPropagation(), se = null, n.close(W);
    }
    function Ht(O, W) {
      const ee = a.value.length;
      let xe = null;
      if (O.key === "ArrowRight" ? xe = (W + 1) % ee : O.key === "ArrowLeft" ? xe = (W - 1 + ee) % ee : O.key === "Home" ? xe = 0 : O.key === "End" && (xe = ee - 1), xe === null) return;
      O.preventDefault();
      const be = a.value[xe];
      if (!be) return;
      const xt = me(be);
      xt && n.selectPanel(xt);
    }
    return (O, W) => l.value ? (p(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": E(Ms)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": S.value ? "true" : "false",
      "data-dc-maximized": A.value ? "true" : "false",
      "data-dc-headless": $.value ? "true" : "false",
      "data-dc-active": x.value ? "true" : "false",
      "data-dc-dragging": z.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: W[7] || (W[7] = (ee) => o.value && E(n).focus(o.value))
    }, [
      $.value ? B("", !0) : (p(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": L.value ? "true" : "false",
        onPointerdown: Ge,
        onDblclick: Ve
      }, [
        L.value ? (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": P.value,
          onPointerdown: Ye,
          onClick: Qe,
          onKeydown: Oe
        }, [...W[8] || (W[8] = [
          _("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, fu)) : B("", !0),
        m.value ? (p(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          _("span", vu, T(m.value), 1)
        ], 8, pu)) : B("", !0),
        _("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (p(!0), h(Z, null, ie(a.value, (ee, xe) => (p(), h(Z, {
            key: ee.id
          }, [
            Pe.value === xe ? (p(), h("span", hu)) : B("", !0),
            _("button", {
              id: N(ee.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ee.kind === "panel" ? ee.id : void 0,
              "data-dc-space": ee.kind === "space" ? ee.title : void 0,
              "aria-selected": ee.index === l.value.index,
              "aria-controls": q.value,
              tabindex: ee.index === l.value.index ? 0 : -1,
              onPointerdown: (be) => Me(be, ee),
              onClick: (be) => Xe(be, ee),
              onKeydown: (be) => Ht(be, xe)
            }, [
              _("span", gu, T(ee.title), 1),
              ee.kind === "panel" && ee.panel.subtitle ? (p(), h("span", yu, T(ee.panel.subtitle), 1)) : B("", !0),
              r.value && ee.kind === "panel" && w(ee.id) ? (p(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ee.title}`,
                "data-dc-close": ee.id,
                onPointerdown: W[0] || (W[0] = Fe(() => {
                }, ["stop"])),
                onClick: (be) => $t(be, ee.id)
              }, [...W[9] || (W[9] = [
                _("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, wu)) : B("", !0)
            ], 40, _u)
          ], 64))), 128)),
          Pe.value === a.value.length ? (p(), h("span", bu)) : B("", !0)
        ], 8, mu),
        _("div", ku, [
          ve(J),
          I.value.length ? (p(), ue(Hn, {
            key: 0,
            items: I.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : B("", !0)
        ]),
        F.value ? (p(), h("div", $u, [
          S.value && !C.value ? (p(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: W[1] || (W[1] = Fe(() => {
            }, ["stop"])),
            onClick: W[2] || (W[2] = (ee) => E(n).toggleMinimize(y.value))
          }, [
            ve(ht, { kind: "minimize" })
          ], 40, xu)) : B("", !0),
          S.value && !C.value ? (p(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": y.value,
            onPointerdown: W[3] || (W[3] = Fe(() => {
            }, ["stop"])),
            onClick: W[4] || (W[4] = (ee) => E(n).toggleMaximize(y.value))
          }, [
            ve(ht, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Cu)) : B("", !0),
          !r.value && u.value && w(u.value.id) ? (p(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: W[5] || (W[5] = Fe(() => {
            }, ["stop"])),
            onClick: W[6] || (W[6] = (ee) => E(n).close(u.value.id))
          }, [
            ve(ht, { kind: "close" })
          ], 40, Mu)) : B("", !0)
        ])) : B("", !0)
      ], 40, du)),
      i.value ? (p(), h("div", {
        key: 1,
        id: q.value,
        class: "dc-pane__space",
        role: $.value ? void 0 : "tabpanel",
        "aria-labelledby": $.value ? void 0 : N(l.value.id)
      }, [
        qe(O.$slots, "space", {
          node: i.value,
          path: b.value
        }, void 0, !0)
      ], 8, Eu)) : (p(), h("div", {
        key: 2,
        id: q.value,
        class: "dc-pane__body",
        role: $.value ? void 0 : "tabpanel",
        "aria-labelledby": $.value ? void 0 : N(o.value)
      }, [
        ve(V)
      ], 8, Su)),
      Ce.value ? (p(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Ce.value,
        "aria-hidden": "true"
      }, null, 8, Pu)) : B("", !0)
    ], 40, uu)) : B("", !0);
  }
}), Fa = /* @__PURE__ */ fe(Au, [["__scopeId", "data-v-44fd2b2d"]]), zu = ["data-dc-space", "data-dc-path", "aria-label"], Ru = {
  key: 0,
  class: "dc-space__head"
}, Tu = { class: "dc-space__title dc-truncate" }, Lu = ["data-dc-direction"], Fu = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Du = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Nu = /* @__PURE__ */ de({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ss(), s = H(null), a = g(() => U(t.node) ? t.node : null), r = g(() => kt(t.node) ? t.node : null), l = g(() => Y(t.node) ? t.node : null), i = g(
      () => r.value ? r.value.children : l.value?.frames.map((V) => V.node) ?? []
    ), o = g(() => r.value ? Ue(r.value) : []), u = g(
      () => (l.value?.frames ?? []).map((V, J) => ({
        held: V,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: J,
        key: w(V.node),
        path: [...t.path, J]
      })).sort((V, J) => V.key < J.key ? -1 : V.key > J.key ? 1 : 0)
    ), f = g(() => wt(t.node)), m = g(() => n.spaceMenu(t.path)), b = g(() => t.node.headless === !0), y = g(() => l.value ? "desktop" : r.value?.direction ?? ""), k = H(null), $ = H(0);
    let x = null;
    ye(
      k,
      (V) => {
        x?.disconnect(), x = null, !(!V || typeof ResizeObserver > "u") && ($.value = V.clientWidth, x = new ResizeObserver(([J]) => {
          $.value = J?.contentRect.width ?? 0;
        }), x.observe(V));
      },
      { immediate: !0 }
    ), He(() => x?.disconnect());
    const z = g(() => {
      const V = Math.max(
        1,
        Math.floor(($.value + dt) / (En + dt))
      ), J = /* @__PURE__ */ new Map();
      let se = 0;
      for (const ae of u.value)
        ae.held.minimized === !0 && (J.set(ae.key, {
          x: dt + se % V * (En + dt),
          bottom: dt + Math.floor(se / V) * (wa + dt)
        }), se += 1);
      return J;
    }), P = (V) => !!V && V.join("/") === t.path.join("/"), S = g(() => {
      const V = n.dropTarget.value, J = l.value;
      if (!J || !V?.rect || V.edge !== "float") return null;
      if (V.space) return P(V.space) ? V.rect : null;
      const se = ge(J, V.panel);
      return se && J.frames.includes(se) ? V.rect : null;
    }), C = g(() => {
      const V = n.dropTarget.value;
      return !!V && !V.rect && P(V.space);
    }), L = g(() => r.value?.direction === "row"), I = g(() => i.value.map((V, J) => [...t.path, J])), w = (V) => [...je(V)].sort().join("/"), A = (V) => {
      const J = je(V)[0];
      return (J ? n.panelFor(J)?.title : null) ?? J ?? "panel";
    }, F = (V) => {
      const J = i.value[V], se = i.value[V + 1];
      return !J || !se ? "Resize panels" : `Resize ${A(J)} and ${A(se)}`;
    }, N = (V) => {
      const J = o.value[V] ?? 0, se = o.value[V + 1] ?? 0, ae = J + se;
      return ae > 0 ? Math.round(J / ae * 100) : 50;
    };
    function q() {
      const V = s.value, J = V ? L.value ? V.clientWidth : V.clientHeight : 0;
      return J <= 0 ? 0.05 : Math.min(n.minPanelSize.value / J, 0.4);
    }
    let Q = null;
    function Ce(V, J) {
      const se = r.value, ae = s.value;
      if (!n.resizable.value || !se || !ae || V.button !== 0) return;
      const me = L.value ? ae.clientWidth : ae.clientHeight;
      if (me <= 0) return;
      const Me = L.value ? V.clientX : V.clientY, Xe = Ue(se), Ge = Math.min(n.minPanelSize.value / me, 0.4);
      V.preventDefault();
      const Ye = (Oe) => {
        const Ve = ((L.value ? Oe.clientX : Oe.clientY) - Me) / me;
        n.setSizes(t.path, Rs(Xe, J, Ve, Ge));
      }, Qe = () => Q?.(), Ie = (Oe) => {
        Oe.key === "Escape" && (n.setSizes(t.path, Xe), Q?.());
      };
      Q = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", Qe), window.removeEventListener("keydown", Ie), Q = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", Qe), window.addEventListener("keydown", Ie);
    }
    He(() => Q?.());
    function Pe(V, J) {
      const se = r.value;
      if (!n.resizable.value || !se) return;
      const ae = L.value ? "ArrowRight" : "ArrowDown", me = L.value ? "ArrowLeft" : "ArrowUp", Me = V.shiftKey ? 0.1 : 0.02;
      if (V.key !== ae && V.key !== me) return;
      const Xe = V.key === ae ? Me : -Me;
      V.preventDefault(), n.setSizes(t.path, Rs(Ue(se), J, Xe, q()));
    }
    return (V, J) => {
      const se = Is("WindowNode", !0);
      return a.value ? (p(), ue(Fa, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: gt(({ node: ae, path: me }) => [
          ve(se, {
            node: ae,
            path: me,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (p(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": y.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !b.value ? (p(), h("header", Ru, [
          _("span", Tu, T(f.value), 1),
          m.value.length ? (p(), ue(Hn, {
            key: 0,
            items: m.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : B("", !0)
        ])) : B("", !0),
        l.value ? (p(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: k,
          class: "dc-window__desktop"
        }, [
          S.value ? (p(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: ze({
              left: `${S.value.x}px`,
              top: `${S.value.y}px`,
              width: `${S.value.w}px`,
              height: `${S.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : B("", !0),
          (p(!0), h(Z, null, ie(u.value, (ae) => (p(), ue(iu, {
            key: ae.key,
            frame: ae.held,
            path: ae.path,
            order: ae.order,
            place: z.value.get(ae.key) ?? null
          }, {
            default: gt(() => [
              ve(se, {
                node: ae.held.node,
                path: ae.path,
                framed: ae.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (p(), h("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          C.value ? (p(), h("div", Fu)) : B("", !0),
          (p(!0), h(Z, null, ie(i.value, (ae, me) => (p(), h(Z, {
            key: w(ae)
          }, [
            _("div", {
              class: "dc-window__cell",
              style: ze({ flexGrow: o.value[me] ?? 1 })
            }, [
              ve(se, {
                node: ae,
                path: I.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < i.value.length - 1 ? (p(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": L.value ? "vertical" : "horizontal",
              "aria-label": F(me),
              "aria-valuenow": N(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Me) => Ce(Me, me),
              onKeydown: (Me) => Pe(Me, me)
            }, null, 40, Du)) : B("", !0)
          ], 64))), 128))
        ], 8, Lu)) : B("", !0)
      ], 8, zu));
    };
  }
}), Iu = /* @__PURE__ */ fe(Nu, [["__scopeId", "data-v-fb5b403f"]]), Ou = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Vu = {
  key: 1,
  class: "dc-window__empty"
}, Ku = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Yt = 16, Bu = /* @__PURE__ */ de({
  __name: "WindowFrame",
  props: /* @__PURE__ */ an({
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
  emits: /* @__PURE__ */ an(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = sn(e, "layout"), l = sn(e, "views"), i = Tn(), o = g(() => new Map(s.panels.map((c) => [c.id, c]))), u = g(() => s.panels.map((c) => c.id)), f = g(() => Wc(r.value, u.value)), m = H(null), b = H(null), y = H(null), k = H(!0), $ = H(null), x = H(null), z = H(null), P = H(""), S = H(null);
    function C() {
      const c = S.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function L(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function I() {
      return C().map((c) => ({ pane: c, order: L(c.element) })).sort((c, d) => {
        const v = Math.max(c.order.length, d.order.length);
        for (let M = 0; M < v; M += 1) {
          const R = (c.order[M] ?? -1) - (d.order[M] ?? -1);
          if (R !== 0) return R;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const w = (c) => C().find((d) => d.panels.includes(c)) ?? null;
    function A(c) {
      const d = o.value.get(c);
      if (!d) return "";
      const v = l.value[c];
      return v && d.views?.some((M) => M.key === v) ? v : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function F(c, d) {
      l.value = { ...l.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const N = g(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function q(c) {
      return !s.movable || N.value < 1 || s.panels.length < 2 ? !1 : o.value.get(c)?.fixed !== !0;
    }
    function Q(c, d) {
      const v = f.value;
      !c || !v || c === v || (r.value = c, d && a("panel-move", d));
    }
    function Ce(c, d, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (d - c.left) / c.width, R = (v - c.top) / c.height, D = 0.3;
      return M > D && M < 1 - D && R > D && R < 1 - D ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: R },
        { edge: "bottom", distance: 1 - R }
      ].reduce(
        (te, K) => K.distance < te.distance ? K : te
      ).edge;
    }
    function Pe(c, d) {
      const v = [...c.querySelectorAll(".dc-tab")], M = v.findIndex((R) => {
        const D = R.getBoundingClientRect();
        return d < D.left + D.width / 2;
      });
      return M === -1 ? v.length : M;
    }
    function V(c, d, v) {
      for (const { panels: M, element: R } of I().reverse()) {
        const D = R.getBoundingClientRect();
        if (c < D.left || c > D.right || d < D.top || d > D.bottom) continue;
        const le = M.find((X) => X !== v), te = R.querySelector(".dc-pane__tabs"), K = te?.getBoundingClientRect();
        if (te && K && d >= K.top && d <= K.bottom)
          return le ? { panel: le, edge: "center", index: Pe(te, c) } : null;
        const j = R.querySelector(":scope > .dc-pane__space");
        if (j) {
          const X = j.getBoundingClientRect();
          if (c >= X.left && c <= X.right && d >= X.top && d <= X.bottom) continue;
        }
        return le ? { panel: le, edge: Ce(D, c, d) } : null;
      }
      return se(c, d, v) ?? Me(c, d);
    }
    function J() {
      const c = S.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function se(c, d, v) {
      const M = f.value;
      if (!M) return null;
      for (const R of J()) {
        const D = R.getBoundingClientRect();
        if (c < D.left || c > D.right || d < D.top || d > D.bottom) continue;
        const le = Xe(R), te = le.flatMap((re) => re.panels).find((re) => re !== v);
        if (!te && le.length > 0) return null;
        const K = ge(M, v)?.rect, j = _n(
          {
            x: c - D.left - 24,
            y: d - D.top - 12,
            w: K?.w ?? lt.w,
            h: K?.h ?? lt.h
          },
          { w: R.clientWidth, h: R.clientHeight },
          s.minPanelSize
        );
        if (te) return { panel: te, edge: "float", rect: j };
        const X = ae(R);
        return X ? { panel: "", space: X, edge: "float", rect: j } : null;
      }
      return null;
    }
    function ae(c) {
      const d = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return d == null ? null : d === "" ? [] : d.split("/").map(Number);
    }
    function me() {
      const c = S.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((d) => d.closest(".dc-window") === c).filter((d) => !d.querySelector(".dc-pane")).reverse().flatMap((d) => {
        const v = ae(d);
        return v ? [{ element: d, path: v }] : [];
      }) : [];
    }
    function Me(c, d) {
      for (const { element: v, path: M } of me()) {
        if (v.dataset.dcSpace === "desktop") continue;
        const R = v.getBoundingClientRect();
        if (!(c < R.left || c > R.right || d < R.top || d > R.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Xe(c) {
      return C().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let Ge = null;
    const Ye = (c) => c.altKey;
    function Qe(c, d) {
      if (!q(c) || b.value || x.value || d.button !== 0) return;
      const v = d.clientX, M = d.clientY;
      let R = !1, D = Ye(d);
      const le = () => {
        const oe = z.value;
        oe && (y.value = D ? se(oe.x, oe.y, c) : V(oe.x, oe.y, c));
      }, te = (oe) => {
        if (!R) {
          if (Math.hypot(oe.clientX - v, oe.clientY - M) < 4) return;
          R = !0, b.value = c, $.value = null;
        }
        D = Ye(oe), k.value = !D, z.value = { x: oe.clientX, y: oe.clientY }, le();
      }, K = (oe) => {
        Ye(oe) !== D && (D = !D, k.value = !D, R && le());
      }, j = (oe) => {
        Ge?.();
        const G = y.value, ke = f.value;
        if (oe && R && G && ke) {
          const Ze = G.space ? As(ke, c, G.space, G.rect) : G.edge === "float" && G.rect ? Ps(ke, c, G.panel, G.rect) : Gt(ke, c, G.panel, G.edge, G.index);
          Q(Ze, {
            panel: c,
            target: G.panel,
            edge: G.edge,
            ...G.space === void 0 ? {} : { space: G.space },
            ...G.index === void 0 ? {} : { index: G.index },
            ...G.rect === void 0 ? {} : { rect: G.rect }
          });
        }
        b.value = null, y.value = null, z.value = null, k.value = !0;
      }, X = () => j(!0), re = () => j(!1), pe = (oe) => {
        if (oe.key === "Escape") {
          j(!1);
          return;
        }
        K(oe);
      };
      Ge = () => {
        window.removeEventListener("pointermove", te), window.removeEventListener("pointerup", X), window.removeEventListener("pointercancel", re), window.removeEventListener("keydown", pe), window.removeEventListener("keyup", K), Ge = null;
      }, window.addEventListener("pointermove", te), window.addEventListener("pointerup", X), window.addEventListener("pointercancel", re), window.addEventListener("keydown", pe), window.addEventListener("keyup", K);
    }
    He(() => Ge?.());
    let Ie = null;
    function Oe(c) {
      const d = S.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((R) => R.closest(".dc-window") === d)?.parentElement ?? null : null;
    }
    function Ve(c) {
      const d = f.value;
      return d ? An(d, c) : null;
    }
    function $t(c) {
      const d = f.value;
      if (!d) return;
      const v = At(d, c);
      v !== d && (r.value = v);
    }
    function Ht(c) {
      const d = Ve(c);
      d && $t(d);
    }
    function O(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && Je(v);
    }
    function W(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && rt(v);
    }
    function ee(c) {
      const d = f.value, v = d ? at(d, c) : null;
      return v ? $e(v.node) : "";
    }
    function xe(c) {
      const d = f.value, v = d ? at(d, c) : null;
      if (!d || !v) return;
      const M = $e(v.node);
      if (o.value.get(M)?.fixed === !0) return;
      const R = !rt(v);
      let D = Tc(d, c, R);
      D !== d && (R || (D = At(D, c)), r.value = D, a("frame-minimize", { panel: M, minimized: R }));
    }
    function be(c) {
      const d = Ve(c);
      d && xe(d);
    }
    function xt(c) {
      const d = f.value, v = d ? at(d, c) : null;
      if (!d || !v) return;
      const M = $e(v.node);
      if (o.value.get(M)?.fixed === !0) return;
      const R = !Je(v);
      let D = Rc(d, c, R);
      D !== d && (R && (D = At(D, c)), r.value = D, a("frame-maximize", { panel: M, maximized: R }));
    }
    function rs(c) {
      const d = Ve(c);
      d && xt(d);
    }
    function ls(c, d, v) {
      const M = f.value, R = M ? at(M, c) : null;
      if (!M || !R || d.button !== 0 || b.value || x.value) return;
      const D = $e(R.node);
      if (o.value.get(D)?.fixed === !0 || Je(R) || rt(R) || (v === "move" ? !s.movable : !s.resizable)) return;
      const le = Oe(c), te = Lc(M, c);
      $t(c);
      const K = { w: le?.clientWidth ?? 0, h: le?.clientHeight ?? 0 }, j = { ...R.rect }, X = d.clientX, re = d.clientY, pe = s.minPanelSize;
      x.value = D;
      const oe = (Ee) => {
        const Ke = f.value;
        if (!Ke) return;
        const Ct = Ss(Ke, te, _n(Ee, K, pe));
        Ct !== Ke && (r.value = Ct);
      }, G = (Ee) => {
        Ee.preventDefault();
        const Ke = Ee.clientX - X, Ct = Ee.clientY - re;
        oe(
          v === "move" ? { ...j, x: j.x + Ke, y: j.y + Ct } : Es(j, v, Ke, Ct, pe)
        );
      }, ke = (Ee) => {
        if (Ie?.(), x.value = null, !Ee) {
          oe(j);
          return;
        }
        const Ke = f.value ? at(f.value, te) : null;
        Ke && a("frame-change", { panel: ee(te), rect: Ke.rect });
      }, Ze = () => ke(!0), nt = () => ke(!1), st = (Ee) => {
        Ee.key === "Escape" && ke(!1);
      };
      Ie = () => {
        window.removeEventListener("pointermove", G), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", nt), window.removeEventListener("keydown", st), Ie = null;
      }, window.addEventListener("pointermove", G), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", nt), window.addEventListener("keydown", st);
    }
    function Da(c, d, v) {
      const M = Ve(c);
      M && ls(M, d, v);
    }
    function Na(c, d, v = !1) {
      const M = f.value, R = Ve(c), D = M && R ? at(M, R) : null;
      if (!M || !R || !D || o.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Je(D) || rt(D)) {
        P.value = `${Te(c)} is ${Je(D) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const le = d === "left" ? -Yt : d === "right" ? Yt : 0, te = d === "up" ? -Yt : d === "down" ? Yt : 0, K = Oe(R), j = { w: K?.clientWidth ?? 0, h: K?.clientHeight ?? 0 }, X = v ? Es(D.rect, "se", le, te, s.minPanelSize) : { ...D.rect, x: D.rect.x + le, y: D.rect.y + te }, re = Ss(M, R, _n(X, j, s.minPanelSize));
      if (re === M) {
        P.value = v ? `${Te(c)} cannot be resized further.` : `${Te(c)} cannot move ${d}.`;
        return;
      }
      r.value = re;
      const pe = at(re, R);
      pe && (a("frame-change", { panel: c, rect: pe.rect }), P.value = v ? `${Te(c)} resized to ${pe.rect.w} by ${pe.rect.h}.` : `${Te(c)} moved to ${pe.rect.x}, ${pe.rect.y}.`);
    }
    He(() => Ie?.());
    function Ia(c, d) {
      const v = w(c), M = v?.element.getBoundingClientRect();
      if (!v || !M) return null;
      const R = d === "left" || d === "right", D = (K) => {
        if (!(R ? K.bottom > M.top + 1 && K.top < M.bottom - 1 : K.right > M.left + 1 && K.left < M.right - 1)) return null;
        const X = d === "left" ? M.left - K.right : d === "right" ? K.left - M.right : d === "up" ? M.top - K.bottom : K.top - M.bottom;
        return X < -1 ? null : X;
      }, le = [];
      for (const K of C()) {
        if (K === v || K.element === v.element) continue;
        const j = D(K.element.getBoundingClientRect());
        if (j === null) continue;
        const X = K.panels.find((re) => re !== c);
        X && le.push({ to: { panel: X }, distance: j });
      }
      for (const { element: K, path: j } of me()) {
        const X = D(K.getBoundingClientRect());
        X !== null && le.push({ to: { space: j }, distance: X });
      }
      return le.reduce(
        (K, j) => K && K.distance <= j.distance ? K : j,
        null
      )?.to ?? null;
    }
    function Oa(c) {
      const d = f.value ? ge(f.value, c) !== null : !1;
      if (!d && !q(c)) return;
      $.value = $.value === c ? null : c;
      const v = Te(c);
      if (!$.value) {
        P.value = `${v}: move mode off.`;
        return;
      }
      P.value = d ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Te = (c) => o.value.get(c)?.title ?? c, Va = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Ka(c, d, v = !1) {
      if (!q(c)) return;
      const M = f.value;
      if (!M) return;
      const R = Te(c), D = pt(M, c);
      if (!v && D && (d === "left" || d === "right") && D.panels.length > 1) {
        const re = D.panels.indexOf(c), pe = d === "left" ? re - 1 : re + 1;
        if (pe >= 0 && pe < D.panels.length) {
          Q(zt(M, c, pe), { panel: c, target: c, edge: "center", index: pe }), P.value = `${R} moved ${d}, now tab ${pe + 1} of ${D.panels.length}.`, dn(c);
          return;
        }
      }
      const te = Ia(c, d);
      if (!te || te.panel !== void 0 && !q(te.panel)) {
        P.value = `${R} cannot move ${d}.`;
        return;
      }
      const K = Va[d];
      if (te.space) {
        const re = te.space, pe = tt(M, re), oe = ge(M, c)?.rect, G = { ...lt, ...oe ? { w: oe.w, h: oe.h } : {} };
        Q(As(M, c, re, G), { panel: c, target: "", space: re, edge: K }), P.value = `${R} moved ${d}, into ${pe ? wt(pe) : "the space"}.`, dn(c);
        return;
      }
      const j = te.panel, X = D?.panels.length === 1 && pt(M, j)?.panels.length === 1;
      v ? (Q(Gt(M, c, j, "center"), {
        panel: c,
        target: j,
        edge: "center"
      }), P.value = `${R} joined ${Te(j)} as a tab.`) : X ? (Q(en(M, c, j), { panel: c, target: j, edge: K }), P.value = `${R} moved ${d}, trading places with ${Te(j)}.`) : (Q(Gt(M, c, j, K), { panel: c, target: j, edge: K }), P.value = `${R} moved ${d}, beside ${Te(j)}.`), dn(c);
    }
    function dn(c) {
      Lt(() => {
        w(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Ba(c, d) {
      const v = f.value;
      v && (r.value = tn(v, c, d));
    }
    function fn(c) {
      const d = f.value;
      if (!d) return;
      const v = mt(d, c);
      v !== d && (r.value = v, a("tab-select", { panel: c }));
    }
    function os(c) {
      return o.value.get(c)?.closable ?? s.closable;
    }
    function qa(c) {
      os(c) && a("panel-close", c);
    }
    const pn = H(/* @__PURE__ */ new Map());
    let Wa = 0;
    function Ua(c, d) {
      const v = Wa += 1;
      return pn.value.set(v, { panel: c, items: d }), () => {
        pn.value.delete(v);
      };
    }
    function Ha(c) {
      const d = [];
      for (const v of pn.value.values())
        v.panel() === c && d.push(...v.items());
      return d;
    }
    function is(c) {
      const d = c.filter((v) => v.items.length > 0);
      return d.length < 2 ? d.flatMap((v) => v.items) : d.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const cs = (c) => c.title || "These tabs";
    function ja(c, d) {
      const v = d.id, M = pt(c, v), R = (M?.panels.length ?? 0) > 1, D = M?.fixedView === !0, le = (X) => ({
        action: () => {
          X !== c && (r.value = X);
        }
      }), te = [], K = [], j = d.views ?? [];
      if (j.length > 1 && !D) {
        const X = A(v);
        te.push({
          id: "view",
          label: "View",
          items: j.map((re) => ({
            id: `view-${re.key}`,
            label: re.label,
            checked: re.key === X,
            action: () => F(v, re.key)
          }))
        });
      }
      return R && !D && K.push(
        { id: "show-row", label: "Row", checked: !1, ...le(zs(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...le(zs(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...le(Ic(c, v))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...le(Oc(c, v))
        }
      ), R && M && (K.length && K.push({ separator: !0 }), K.push(...us(M, v))), { panel: te, tabs: K, tabsTitle: M ? cs(M) : "" };
    }
    function us(c, d) {
      const v = ut(c), M = (R) => {
        const D = c.panels[(v + R + c.panels.length) % c.panels.length];
        return (D === void 0 ? "" : $e(D)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => fn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => fn(M(-1)) }
      ];
    }
    function jt(c) {
      return c.title ? c.title : U(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : wt(c);
    }
    function ds(c) {
      if (!c || Y(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Re(c)) return null;
      const d = La(c);
      return d && d.fixedView !== !0 ? d : null;
    }
    function Xa(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const v = tt(d, c);
      if (!v || U(v)) return [];
      if (v.fixedView) return [];
      const M = Y(v) ? "desktop" : v.direction, R = (G, ke, Ze) => ({
        id: `show-${G}`,
        label: ke,
        checked: M === G,
        action: () => {
          const nt = f.value, st = Ze();
          !nt || st === v || (r.value = on(_e(it(nt, c, st))));
        }
      }), D = () => {
        const G = Aa(v, Ga(v));
        if (U(G) && G.panels.length === 0) return v;
        const ke = U(G) && G.panels.length === 1 ? G.panels[0] : void 0;
        return ke !== void 0 && ce(ke) ? v : G;
      }, le = (G) => () => Y(v) ? Ta(v, G) : v.direction === G ? v : { ...v, direction: G }, te = c.slice(0, -1), K = c.length > 0 ? tt(d, te) : null, j = K && U(K) && K.panels.length > 1 ? K : null, X = K && ds(K) === v ? K : null, re = ds(v), pe = v.title || "this space", oe = (G, ke, Ze, nt, st) => ({
        id: G,
        label: st,
        action: () => {
          const Ee = f.value;
          Ee && (r.value = on(_e(it(Ee, ke, Bc(Ze, nt)))));
        }
      });
      return is([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            R("row", "Row", le("row")),
            R("column", "Column", le("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            R("tabs", "Tabs", () => D()),
            R("desktop", "Desktop", () => Y(v) ? v : Ra(v))
          ]
        },
        {
          id: "about-around",
          title: re ? `Around ${jt(re)}` : "",
          items: re ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...re.title ? [] : [oe("merge-around-keep-this", c, v, "outer", `Keep ${pe}`)],
            ...v.title ? [] : [oe("merge-around-keep-that", c, v, "inner", `Keep ${jt(re)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: X ? `Inside ${jt(X)}` : "",
          items: X ? [
            ...v.title ? [] : [oe("merge-inside-keep-that", te, X, "outer", `Keep ${jt(X)}`)],
            ...X.title ? [] : [oe("merge-inside-keep-this", te, X, "inner", `Keep ${pe}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: j ? cs(j) : "",
          items: j ? us(j, $e(v)) : []
        }
      ]);
    }
    function Ga(c) {
      const d = m.value;
      return d && ne(c, d) ? d : void 0;
    }
    function Ya(c) {
      const d = f.value, v = o.value.get(c);
      if (!d || !v) return [];
      const M = s.menu ? ja(d, v) : null, R = Ha(c);
      R.length && M?.panel.length && R.push({ separator: !0 }), M && R.push(...M.panel);
      const D = is([
        { id: "about-panel", title: v.title, items: R },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, D) : D;
    }
    function Qa(c, d) {
      return i[`${c}-${d}`] ?? i[c];
    }
    function fs(c, d, v, M) {
      return Qa(c, d.id)?.({ panel: d, view: v, active: M });
    }
    Uc({
      panelFor: (c) => o.value.get(c) ?? null,
      viewFor: A,
      setView: F,
      movable: g(() => s.movable),
      resizable: g(() => s.resizable),
      minPanelSize: g(() => s.minPanelSize),
      spaceNames: g(() => s.spaceNames),
      focused: m,
      dragging: b,
      dropTarget: y,
      moving: $,
      framing: x,
      canMove: q,
      focus(c) {
        m.value !== c && (m.value = c, a("panel-activate", c));
      },
      selectPanel: fn,
      beginDrag: Qe,
      toggleMoveMode: Oa,
      nudge: Ka,
      setSizes: Ba,
      frameOf: (c) => f.value ? ge(f.value, c) : null,
      beginFrameDrag: Da,
      nudgeFrame: Na,
      raise: Ht,
      maximized: O,
      toggleMaximize: rs,
      minimized: W,
      toggleMinimize: be,
      beginFrameDragAt: ls,
      raiseAt: $t,
      toggleMaximizeAt: xt,
      toggleMinimizeAt: xe,
      menuFor: Ya,
      spaceMenu: Xa,
      registerMenu: Ua,
      closable: os,
      close: qa,
      renderContent: (c, d, v) => fs("panel", c, d, v),
      renderActions: (c, d, v) => fs("actions", c, d, v),
      layout: f
    });
    const Za = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), Ja = () => {
      const c = b.value, d = z.value;
      return !c || !d ? null : nr(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${d.x}px`, top: `${d.y}px` },
          "aria-hidden": "true"
        },
        o.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: f,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, d, v, M) {
        const R = f.value;
        R && Q(Gt(R, c, d, v, M), {
          panel: c,
          target: d,
          edge: v,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const d = f.value;
        d && (r.value = mt(d, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, d, v) {
        const M = f.value;
        M && Q(Ps(M, c, d, v), {
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
        const M = Pc(v, c, d);
        if (M === v) return;
        r.value = M;
        const R = ge(M, c);
        R && a("frame-change", { panel: c, rect: R.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: F,
      /** Brings a floating frame to the front of its stack. */
      raise: Ht,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: rs,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: be
    }), (c, d) => (p(), h("div", {
      ref_key: "root",
      ref: S,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": b.value ? "true" : "false",
      "data-dc-docking": k.value ? "true" : "false",
      style: ze(Za.value)
    }, [
      f.value ? (p(), ue(Iu, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (p(), h("p", Vu, " This window has no panels. ")),
      ve(Ja),
      _("p", Ku, T(P.value), 1)
    ], 12, Ou));
  }
}), qu = /* @__PURE__ */ fe(Bu, [["__scopeId", "data-v-711565af"]]);
function id(e = "", t = "/") {
  const n = H(We(e)), s = H(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = We(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = We(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Ls(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function cd(e) {
  const t = H(Ls(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), s = ye(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Ls(a);
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
const Wu = {
  DataShell: cc,
  ShellHeader: oa,
  QueryPanel: ca,
  ResultsArea: _a,
  FacetControl: ia,
  SegmentedControl: Cn,
  StatusPill: Ot,
  WindowFrame: qu,
  WindowPane: Fa,
  ListView: Mn,
  CardsView: da,
  GridView: fa,
  TableView: ma,
  LinksView: pa,
  PreviewView: va,
  TypeCardsView: ha
}, ud = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Wu))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Os, t.route);
  }
};
export {
  ln as CASCADE_STEP,
  Xu as COLUMN_BREAKPOINTS,
  ju as COLUMN_ROLES,
  da as CardsView,
  Cs as ColumnCell,
  lt as DEFAULT_FRAME,
  bn as DEFAULT_SORT,
  ar as DEFAULT_VIEW,
  cc as DataShell,
  kn as EMPTY_CELL,
  na as ENTITY_ALL,
  rn as ENTITY_TERM,
  Dt as EXPRESSION_TERM,
  Wn as FACET_PREFIX,
  ia as FacetControl,
  fa as GridView,
  ud as HeaderContentLayoutPlugin,
  pa as LinksView,
  Mn as ListView,
  dt as MINIMIZED_GAP,
  wa as MINIMIZED_HEIGHT,
  En as MINIMIZED_WIDTH,
  ya as MIN_FRAME,
  bs as MOCK_TINTS,
  Yu as MenuBar,
  Hn as MenuButton,
  ga as MenuList,
  Vt as MetricDrill,
  as as PANE_CONTEXT_KEY,
  Kn as PARAM_DIR,
  In as PARAM_ENTITY,
  Bn as PARAM_EXPR,
  qn as PARAM_PAGE,
  Vn as PARAM_SORT,
  On as PARAM_VIEW,
  Un as PinStar,
  va as PreviewView,
  ca as QueryPanel,
  Xt as RECORD_STATUSES,
  Gs as RESULT_FIELDS,
  Os as ROUTE_ADAPTER_KEY,
  _a as ResultsArea,
  ta as SHELL_CONTEXT_KEY,
  Hu as SHELL_THEMES,
  Kt as ScopeMark,
  Cn as SegmentedControl,
  oa as ShellHeader,
  Ot as StatusPill,
  ma as TableView,
  ha as TypeCardsView,
  Ln as VIEW_KINDS,
  Ks as VIEW_LABELS,
  ns as WINDOW_CONTEXT_KEY,
  qu as WindowFrame,
  Fa as WindowPane,
  ka as activePanel,
  ut as activeTab,
  Or as addTerm,
  Ec as axisOf,
  Gn as cascade,
  Zs as cellFull,
  Nt as cellText,
  Zt as cellTextOf,
  Ae as cellValue,
  vs as changesResults,
  _n as clampRect,
  Aa as collapseSpace,
  Ic as collapseToTabs,
  Zu as column,
  _s as columnAlign,
  gs as columnClass,
  hs as columnKey,
  $n as columnTruncates,
  ur as columnsFor,
  lr as countPages,
  sr as createHistoryAdapter,
  id as createMemoryAdapter,
  Fr as createMockDataSource,
  cd as createVueRouterAdapter,
  pr as defaultCellText,
  Ts as defaultLayout,
  Nn as defaultQuery,
  Vr as drillExpression,
  As as dropIntoSpace,
  Ft as emptyFacetState,
  Fn as emptyFacetValue,
  ft as findEntity,
  et as findSort,
  ed as fixedView,
  Xn as float,
  Ps as floatPanel,
  Ra as floatSplit,
  Oc as floatTabs,
  Qt as fnv1a,
  qs as focusEntity,
  ms as formatCount,
  ir as formatDate,
  $r as formatExpression,
  or as formatMetric,
  cr as formatOrdinal,
  It as formatTerm,
  cn as frame,
  at as frameAt,
  ge as frameOf,
  An as framePathOf,
  $e as frontPanel,
  Rr as generateRows,
  Qu as group,
  pt as groupOf,
  Sc as groups,
  js as hasActiveFacets,
  ne as hasPanel,
  Ju as headless,
  Et as insertPanel,
  Pt as isChoosable,
  Gu as isEntityScoped,
  Hs as isFacetActive,
  Y as isFloat,
  U as isGroup,
  Je as isMaximized,
  rt as isMinimized,
  ce as isPanelTab,
  Dn as isPristineQuery,
  kt as isSplit,
  Se as isTabOf,
  Xs as isTypeCardsQuery,
  Vs as isViewKind,
  ws as joinExpression,
  kr as matchesExpression,
  Tr as matchesFacets,
  Ac as maximizeFrame,
  Rc as maximizeFrameAt,
  Bc as mergeSpace,
  zc as minimizeFrame,
  Tc as minimizeFrameAt,
  Gt as movePanel,
  zt as moveTab,
  tt as nodeAt,
  Rt as nodeTitle,
  _e as normalizeLayout,
  We as normalizeSearch,
  es as normalizeSizes,
  La as onlySpace,
  je as panelIds,
  Ne as panelNode,
  Ms as panelTabs,
  yt as parseExpression,
  Xr as parseQuery,
  fo as presentParts,
  ua as presentRow,
  cu as providePaneContext,
  Br as provideShellContext,
  Uc as provideWindowContext,
  gn as raiseFrame,
  At as raiseFrameAt,
  Lc as raisedPath,
  Ys as reconcileFacets,
  Wc as reconcileLayout,
  ea as recordTerm,
  ot as removePanel,
  it as replaceAt,
  Es as resizeRect,
  Rs as resizeSplit,
  Bs as resolveView,
  Le as roleColumn,
  Qs as roleColumns,
  on as rootSpace,
  Qn as row,
  fr as rowKey,
  Dr as scopeTerm,
  Nr as scopeTermFor,
  Kr as scopedEntity,
  xs as serializeQuery,
  mt as setActivePanel,
  Pc as setFrameRect,
  Ss as setFrameRectAt,
  tn as setSizesAt,
  sd as setSplitDirection,
  Ue as sizesOf,
  Us as sortsFor,
  he as spaceChrome,
  wt as spaceTitle,
  Yn as split,
  Cr as splitExpression,
  zs as spreadTabs,
  Yr as summarizeQuery,
  ra as summaryTerms,
  en as swapPanels,
  jn as tabNode,
  qt as tabPanels,
  Ta as tileFloat,
  ad as toFloat,
  rd as toTiled,
  td as toggleMaximized,
  nd as toggleMinimized,
  yi as useColumns,
  Ri as useEntityPreviews,
  ld as usePaneContext,
  od as usePaneMenu,
  bt as usePresentedRows,
  Qr as useQueryState,
  tl as useRecordNames,
  Zr as useResults,
  we as useShellContext,
  ss as useWindowContext,
  xr as withoutTerm
};
