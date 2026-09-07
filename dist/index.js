import { ref as H, inject as _t, provide as Rn, computed as g, toValue as Mt, shallowRef as Tt, watch as ye, onScopeDispose as Fs, defineComponent as de, onBeforeUnmount as He, openBlock as p, createElementBlock as h, createElementVNode as _, toDisplayString as T, unref as E, Fragment as Z, renderList as ie, createCommentVNode as B, renderSlot as qe, withDirectives as yn, withKeys as St, withModifiers as Le, vModelText as wn, normalizeClass as nn, useSlots as Tn, nextTick as Ft, createBlock as ue, createVNode as ve, createTextVNode as De, withCtx as gt, normalizeStyle as ze, resolveDynamicComponent as Ls, useModel as sn, useId as Ds, createSlots as ps, mergeModels as an, onMounted as Za, resolveComponent as Ns, getCurrentScope as Ja, h as er } from "vue";
const Is = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function tr() {
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
const Fn = ["list", "cards", "grid", "table", "links", "preview"], Bu = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Xt = ["ok", "running", "queued", "review", "failed"], qu = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "tint"
], Wu = [480, 620, 760, 900, 1100], nr = "cards", bn = "updated";
function Os(e) {
  return typeof e == "string" && Fn.includes(e);
}
const Vs = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Ks(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Bs(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function qs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Ws(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of qs(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const sr = { key: bn, label: bn };
function et(e, t, n = null) {
  const s = Ws(e, n);
  return (t ? s.find((r) => r.key === t) : void 0) ?? s.find((r) => r.key === bn) ?? s[0] ?? sr;
}
function Ln(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Lt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Ln(n);
  return t;
}
function Us(e) {
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
  return Object.values(e).some(Us);
}
function Dn(e) {
  return e.entity === null && e.expr.trim() === "" && !Hs(e.facets);
}
function Uu(e) {
  return e.entity !== null;
}
function js(e) {
  return e.entity === null && e.view === "cards";
}
function ar(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Nn(e, t = {}) {
  const s = t.landing === "entity" ? Bs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Os(t.view) ? t.view : nr,
    sort: et(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Lt(s),
    page: 1
  };
}
const Xs = ["entity", "sort", "dir", "expr", "facets"];
function vs(e) {
  return Xs.some((t) => t in e);
}
function Gs(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Ln(s);
  }
  return n;
}
function Qt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function rr(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function lr(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function or(e) {
  return String(e + 1).padStart(2, "0");
}
const kn = "—";
function Fe(e, t) {
  return e.find((n) => n.role === t);
}
function Ys(e, t) {
  return e.filter((n) => n.role === t);
}
function ir(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const cr = ["id", "entityKey", "entityLabel"];
function Ae(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (cr.includes(n))
      return t[n];
  }
}
function ms(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function ur(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function dr(e, t) {
  if (e == null || e === "") return kn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? rr(n) : String(e);
  }
  return t === "date" ? lr(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : kn : String(e);
}
function Nt(e, t) {
  const n = Ae(e, t);
  return e.format ? e.format(n, t) : dr(n, e.kind);
}
function fr(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Qs(e, t) {
  const n = Nt(e, t), s = fr(Ae(e, t));
  return s && s !== n ? s : n;
}
function Zt(e, t) {
  return e ? Nt(e, t) : "";
}
function hs(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const pr = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function _s(e) {
  return [pr[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function $n(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const vr = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function mr(e) {
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
  for (const a of mr(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const l = vr.exec(a);
    l && l[3] !== "" ? s.push({
      kind: "field",
      field: l[1].toLowerCase(),
      comparator: l[2],
      value: l[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const vn = (e) => e.toLowerCase().replace(/\s+/g, ""), hr = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function _r(e, t, n) {
  const s = vn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && vn(u.label) === s
  );
  if (r) return Ae(r, t);
  const l = n.facets.find((u) => vn(u.label) === s);
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = hr.find(([u]) => u === s)?.[1];
  if (i) {
    const u = Fe(a, i);
    if (u) return Ae(u, t);
  }
  const o = /^metric(\d+)$/.exec(s);
  if (o) {
    const u = Ys(a, "metric")[Number(o[1]) - 1];
    if (u) return Ae(u, t);
  }
}
function mn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function gr(e, t, n) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const o = Fe(l, i), u = o ? Ae(o, t) : void 0;
      return typeof u == "string" && mn(u, e.value);
    });
  }
  const s = _r(e.field, t, n);
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
  return !Number.isFinite(a) || !Number.isFinite(r) ? !0 : yr(e.comparator, r, a);
}
function yr(e, t, n) {
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
function wr(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => gr(a, t, n))) : !0;
}
function gs(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function It(e) {
  return e.kind === "text" ? gs(e.value) : `${e.field}${e.comparator}${gs(e.value)}`;
}
function br(e) {
  return e.filter((t) => t.length).map((t) => t.map(It).join(" ")).join(" OR ");
}
function kr(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((r, l) => l !== n) : s).filter((s) => s.length);
}
function $r(e) {
  const t = yt(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(It).join(" ")
  };
}
function ys(e, t) {
  return [...e.map(It), t.trim()].filter(Boolean).join(" ");
}
const ws = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Zs(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const xr = 7, Cr = 3;
function Mr(e, t, n, s) {
  const a = (t * xr + Qt(n)) % s, r = [];
  for (let l = 0; l < Math.min(Cr, s); l++)
    r.push(Zs(e, (a + l) % s));
  return r;
}
function Er(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Sr(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Sr(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, l) => r - l).map((r) => e[r]);
}
function Pr(e, t) {
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
      return ws[n % ws.length];
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
function Ar(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, l = t.scopes ?? [];
  if (!r.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const u = r[o % r.length], f = Math.floor(o / r.length), m = Qt(`${s}:${e.key}:${u[0]}:${o}`), b = Zs(e.key, o), y = new Date(a.getTime() - m % 900 * 36e5).toISOString(), k = {};
    for (const $ of e.columns ?? []) {
      const x = $.field ?? $.key;
      if (!x || $.value) continue;
      const z = Pr($, {
        hash: Qt(`${m}:${x}`),
        sample: u,
        revision: f,
        updatedAt: y
      });
      z !== void 0 && (k[x] = z);
    }
    for (const $ of e.facets)
      k[$.key] = Er($, Qt(`${m}:${$.key}`));
    for (const [$, x] of l)
      k[$] = x === e.key ? b : Mr(x, o, $, n);
    i.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return i;
}
function zr(e, t) {
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
function Rr(e, t) {
  const n = e.find((l) => l.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", r = s === "date" || n.role === "updated";
  return (l, i) => {
    const o = Ae(n, l), u = Ae(n, i);
    return a ? Number(u ?? 0) - Number(o ?? 0) : r ? Date.parse(String(u ?? "")) - Date.parse(String(o ?? "")) : String(u ?? "").localeCompare(String(o ?? ""));
  };
}
function Tr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const r = t.get(s.key);
    if (r) return r;
    const l = e.scopes ?? a.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = Ar(s, { ...e, scopes: l });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: l, offset: i }) {
      const o = yt(s.expr), u = r ? [r] : a.entities, f = [], m = [];
      for (const k of u)
        for (const $ of n(k, a))
          f.push($), (r ? zr($, s.facets) : !0) && wr(o, $, k) && m.push($);
      const b = et(r, s.sort, a), y = m.sort(Rr(qs(r, a), b.key));
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
function Fr(e, t) {
  return Js(e, t.id);
}
function Js(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Lr(e, t) {
  return Fr(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
const bs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Dr(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && bs(e.value, t.value) : t.kind === "text" && bs(e.value, t.value);
}
function Nr(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = yt(t).flat();
  return s ? yt(n).some(
    (r) => r.some((l) => Dr(l, s))
  ) ? n : `${n} ${t}` : n;
}
function Ir(e, t, n) {
  return Nr(t.expr, Lr(e, n));
}
function Or(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const ea = Symbol("dc.shellContext");
function Vr(e) {
  return Rn(ea, e), e;
}
function we() {
  const e = _t(ea, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const In = "e", On = "v", Vn = "s", Kn = "d", Bn = "q", qn = "p", Wn = "f_", ta = "*", Kr = [
  In,
  On,
  Vn,
  Kn,
  Bn,
  qn
], xn = "..", na = ",", Br = [
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
  for (const [n, s] of Br) t = t.replace(n, s);
  return t;
}
function Be(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function sa(e) {
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
function qr(e) {
  return Kr.includes(e) || e.startsWith(Wn);
}
function ks(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Wr(e, t) {
  const n = Be(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(na).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(xn), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + xn.length)).trim(), l = a === "" ? null : Number(a), i = r === "" ? null : Number(r);
      let o = l !== null && Number.isFinite(l) ? ks(l, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? ks(i, e.min, e.max) : null;
      return o !== null && u !== null && o > u && ([o, u] = [u, o]), { kind: "range", min: o, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Ur(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(na) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${xn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Hr(e, t, n = {}) {
  const s = Nn(t, n), a = new Map(sa(e)), r = a.get(In), l = r === void 0 ? s.entity : Be(r), i = l === ta ? null : ft(t, l), o = a.get(On), u = o && Os(Be(o)) ? Be(o) : s.view, f = a.get(Vn), m = et(i, f ? Be(f) : n.sort, t), b = a.get(Kn), y = b ? Be(b) === "asc" ? "asc" : "desc" : s.dir, k = a.get(Bn), $ = a.get(qn), x = $ === void 0 ? 1 : Number(Be($)), z = Number.isFinite(x) ? Math.max(1, Math.floor(x)) : 1, P = {};
  for (const S of i?.facets ?? []) {
    const C = a.get(`${Wn}${S.key}`);
    P[S.key] = C === void 0 ? Ln(S) : Wr(S, C);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: m.key,
    dir: y,
    expr: k === void 0 ? "" : Be(k),
    facets: Gs(i, P),
    page: z
  };
}
function $s(e, t, n = {}, s = "") {
  const a = Nn(t, n), r = ft(t, e.entity), l = sa(s).filter(([m]) => !qr(m)), i = [], o = (m, b) => i.push([m, hn(b)]), u = r?.key ?? null;
  u !== a.entity && o(In, u ?? ta), e.view !== a.view && o(On, e.view), e.sort !== a.sort && o(Vn, e.sort), e.dir !== a.dir && o(Kn, e.dir), e.expr.trim() !== "" && o(Bn, e.expr);
  for (const m of r?.facets ?? []) {
    const b = e.facets[m.key];
    if (!b) continue;
    const y = Ur(b, m);
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
function jr(e, t) {
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
function aa(e, t) {
  const n = [];
  t && n.push({
    id: rn,
    label: `entity:${t.key}`,
    facetKey: rn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Us(a) && n.push(...jr(s, a));
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
function Xr(e, t, n = null) {
  if (Dn(e)) {
    const r = et(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const s = aa(e, t).filter((r) => r.facetKey !== Dt).map((r) => r.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function Gr(e) {
  const { adapter: t } = e, n = g(() => Mt(e.schema)), s = g(() => Mt(e.defaults) ?? {}), a = g(() => Hr(t.search.value, n.value, s.value)), r = g(() => ft(n.value, a.value.entity)), l = g(() => r.value ?? Bs(n.value, s.value)), i = g(() => Ws(r.value, n.value)), o = g(() => et(r.value, a.value.sort, n.value)), u = (x, z) => {
    const P = $s(x, n.value, s.value, t.search.value);
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
      facets: Lt(z)
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
    summary: g(() => Xr(a.value, r.value, n.value)),
    terms: g(() => aa(a.value, r.value)),
    isPristine: g(() => Dn(a.value)),
    isEverything: g(() => a.value.entity === null),
    hasFacets: g(() => Hs(a.value.facets)),
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
        const z = kr(yt(a.value.expr), x.group ?? 0, x.index ?? 0);
        b({ expr: br(z) }, f());
        return;
      }
      y(x.facetKey, (z) => z.kind === "chips" && x.option ? { kind: "chips", selected: z.selected.filter((P) => P !== x.option) } : z.kind === "range" ? { kind: "range", min: null, max: null } : z.kind === "toggle" ? { kind: "toggle", on: !1 } : z);
    },
    clearFilters() {
      b({ entity: null, expr: "", facets: Lt(null) }, f());
    },
    reset() {
      u(Nn(n.value, s.value), f());
    },
    hrefFor(x) {
      const z = { ...a.value, ...x };
      return z.page = x.page ?? (vs(x) ? 1 : a.value.page), z.facets = Gs(ft(n.value, z.entity), z.facets), `${t.path.value}${$s(z, n.value, s.value, t.search.value)}`;
    }
  };
}
function Yr(e) {
  const t = Tt([]), n = H(0), s = H(!1), a = Tt(null);
  let r = 0, l = null;
  const i = g(() => (e.query.value.page - 1) * e.limit.value), o = g(() => ar(n.value, e.limit.value)), u = ($) => {
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
      insert(C, F) {
        if (!P()) return;
        const I = Array.isArray(C) ? C : [C];
        if (!I.length) return;
        S();
        const w = [...t.value];
        w.splice(F ?? w.length, 0, ...I), t.value = x > 0 ? w.slice(0, x) : w, n.value += I.length;
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
    () => `${JSON.stringify(Xs.map(($) => e.query.value[$]))}|${e.query.value.page}`
  );
  return ye([e.source, k, e.schema, e.entity, e.limit], y, {
    immediate: !0
  }), Fs(() => {
    r++, b();
  }, !0), { rows: t, total: n, offset: i, pageCount: o, pending: s, error: a, refresh: y };
}
function Qr(e) {
  const t = Tt(/* @__PURE__ */ new Map()), n = (l) => {
    if (l.facetKey !== Dt || !l.field || !l.value) return null;
    const i = Or(e.schema.value, l.field);
    return i ? { entity: i, id: l.value, key: `${i.key}:${l.value}` } : null;
  }, s = (l) => {
    const { entity: i, id: o } = l, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Js(i, o) ?? "",
        facets: Lt(i),
        sort: et(i, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: 1,
      offset: 0
    });
  }, a = (l, i) => {
    const o = Zt(Fe(l.columns ?? [], "identity"), i);
    return o === kn ? "" : o;
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
        const { reference: y } = i[b], k = m.rows[0];
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
const Zr = ["data-dc-expanded"], Jr = { class: "dc-header__domain" }, el = ["data-dc-more", "title"], tl = { class: "dc-header__pick" }, nl = { class: "dc-header__pick-box" }, sl = ["value"], al = { value: "" }, rl = ["value"], ll = { class: "dc-header__pick" }, ol = { class: "dc-header__pick-box" }, il = ["value"], cl = ["value"], ul = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, dl = ["title", "aria-label", "onClick"], fl = ["aria-expanded", "aria-controls"], pl = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, vl = { class: "dc-header__sr" }, ml = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, hl = ["disabled"], _l = ["title"], gl = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, yl = ["disabled"], wl = {
  key: 1,
  class: "dc-header__actions"
}, bl = /* @__PURE__ */ de({
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
    function i(L) {
      return L.key === a.query.value.entity && l.value && !n.hideCount ? String(a.total.value) : L.count;
    }
    function o(L) {
      return `${L.label} · ${i(L)}`;
    }
    const u = g(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${a.total.value}`), f = g(
      () => (n.views ?? [...Fn]).map((L) => ({ key: L, label: Vs[L] }))
    ), m = g(() => Ks(a.query.value.view, n.views));
    function b(L) {
      a.setView(L.target.value);
    }
    const y = g(
      () => a.terms.value.filter((L) => L.facetKey !== rn).map((L, N, q) => {
        const Q = q[N - 1];
        return {
          term: L,
          or: Q?.group !== void 0 && L.group !== void 0 && L.group !== Q.group
        };
      })
    ), k = Qr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      terms: a.terms
    });
    function $(L) {
      const N = k.nameOf(L);
      return N ? `${L.field}:${N} (${L.value})` : L.label;
    }
    function x(L) {
      const N = L.target.value;
      a.setEntity(N || null);
    }
    function z(L) {
      L.target?.closest("button, select, label") || s("toggle");
    }
    const P = H(null), S = H("");
    function C() {
      const L = P.value;
      if (!L) {
        S.value = "";
        return;
      }
      const N = L.scrollLeft > 1, q = L.scrollWidth - L.clientWidth - L.scrollLeft > 1;
      S.value = N && q ? "both" : N ? "start" : q ? "end" : "";
    }
    let F = null;
    ye(
      P,
      (L) => {
        F?.disconnect(), F = null, C(), !(!L || typeof ResizeObserver > "u") && (F = new ResizeObserver(C), F.observe(L));
      },
      { flush: "post" }
    ), ye(y, C, { flush: "post" }), He(() => F?.disconnect());
    const I = g(() => a.query.value.page), w = g(
      () => a.pageCount.value > 1 && !js(a.query.value)
    ), A = g(() => {
      const L = `Page ${I.value} of ${a.pageCount.value}`, N = a.rows.value.length;
      if (!N) return L;
      const q = a.offset.value + 1;
      return `${L} — rows ${q} to ${q + N - 1} of ${a.total.value}`;
    });
    return (L, N) => (p(), h("div", {
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
        _("span", Jr, T(r.value.label), 1),
        _("div", {
          ref_key: "termBar",
          ref: P,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": S.value,
          title: E(a).summary.value,
          onScroll: C
        }, [
          _("label", tl, [
            N[4] || (N[4] = _("span", { class: "dc-header__sr" }, "Type", -1)),
            _("span", nl, [
              _("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: E(a).query.value.entity ?? "",
                onChange: x
              }, [
                _("option", al, T(u.value), 1),
                (p(!0), h(Z, null, ie(E(a).entities.value, (q) => (p(), h("option", {
                  key: q.key,
                  value: q.key
                }, T(o(q)), 9, rl))), 128))
              ], 40, sl),
              N[3] || (N[3] = _("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          _("label", ll, [
            N[6] || (N[6] = _("span", { class: "dc-header__sr" }, "View", -1)),
            _("span", ol, [
              _("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: m.value,
                onChange: b
              }, [
                (p(!0), h(Z, null, ie(f.value, (q) => (p(), h("option", {
                  key: q.key,
                  value: q.key
                }, T(q.label), 9, cl))), 128))
              ], 40, il),
              N[5] || (N[5] = _("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          (p(!0), h(Z, null, ie(y.value, (q) => (p(), h(Z, {
            key: q.term.id
          }, [
            q.or ? (p(), h("span", ul, "or")) : B("", !0),
            _("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${$(q.term)}`,
              "aria-label": `Remove ${$(q.term)}`,
              onClick: (Q) => E(a).removeTerm(q.term)
            }, T($(q.term)), 9, dl)
          ], 64))), 128))
        ], 40, el),
        _("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: N[0] || (N[0] = (q) => s("toggle"))
        }, [
          _("span", pl, T(e.expanded ? "▲" : "▼"), 1),
          _("span", vl, T(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, fl)
      ]),
      w.value ? (p(), h("nav", ml, [
        _("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: I.value <= 1,
          onClick: N[1] || (N[1] = (q) => E(a).setPage(I.value - 1))
        }, [...N[8] || (N[8] = [
          _("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, hl),
        _("span", {
          class: "dc-header__page dc-mono",
          title: A.value,
          "aria-hidden": "true"
        }, T(I.value) + " / " + T(E(a).pageCount.value), 9, _l),
        _("span", gl, T(A.value), 1),
        _("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: I.value >= E(a).pageCount.value,
          onClick: N[2] || (N[2] = (q) => E(a).setPage(I.value + 1))
        }, [...N[9] || (N[9] = [
          _("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, yl)
      ])) : B("", !0),
      L.$slots.actions ? (p(), h("div", wl, [
        qe(L.$slots, "actions", {}, void 0, !0)
      ])) : B("", !0)
    ], 8, Zr));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ra = /* @__PURE__ */ fe(bl, [["__scopeId", "data-v-39331721"]]), kl = { class: "dc-facet" }, $l = ["id"], xl = { class: "dc-facet__body" }, Cl = ["aria-labelledby"], Ml = ["aria-pressed", "data-dc-active", "onClick"], El = ["aria-labelledby"], Sl = ["aria-label", "placeholder", "onKeydown"], Pl = ["aria-label", "placeholder", "onKeydown"], Al = ["aria-checked"], zl = { class: "dc-switch__text" }, Rl = ["data-dc-active"], Tl = /* @__PURE__ */ de({
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
    return (m, b) => (p(), h("div", kl, [
      _("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, T(e.facet.label), 9, $l),
      _("div", xl, [
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
          }, T(y), 9, Ml))), 128))
        ], 8, Cl)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), h("div", {
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
            onKeydown: St(Le(u, ["prevent"]), ["enter"])
          }, null, 40, Sl), [
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
            onKeydown: St(Le(u, ["prevent"]), ["enter"])
          }, null, 40, Pl), [
            [wn, i.value]
          ])
        ], 8, El)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: f
        }, [
          _("span", zl, T(e.facet.text), 1),
          _("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...b[3] || (b[3] = [
            _("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Rl)
        ], 8, Al)) : B("", !0)
      ])
    ]));
  }
}), la = /* @__PURE__ */ fe(Tl, [["__scopeId", "data-v-36d1334b"]]), Fl = ["aria-label"], Ll = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Dl = /* @__PURE__ */ de({
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
      }, T(o.label), 43, Ll))), 128))
    ], 8, Fl));
  }
}), Cn = /* @__PURE__ */ fe(Dl, [["__scopeId", "data-v-63fb5482"]]), Nl = ["id"], Il = { class: "dc-panel__section dc-panel__rows" }, Ol = { class: "dc-panel__row" }, Vl = ["for"], Kl = ["title", "aria-label", "onClick"], Bl = ["id", "placeholder", "onKeydown"], ql = { class: "dc-panel__row" }, Wl = ["id"], Ul = ["aria-labelledby"], Hl = ["data-dc-active", "aria-current"], jl = { class: "dc-entity__count dc-mono" }, Xl = ["data-dc-active", "aria-current", "onClick"], Gl = { class: "dc-entity__label" }, Yl = { class: "dc-entity__count dc-mono" }, Ql = { class: "dc-panel__actions" }, Zl = ["disabled"], Jl = { class: "dc-panel__section dc-panel__rows" }, eo = { class: "dc-panel__row" }, to = { class: "dc-panel__control" }, no = { class: "dc-panel__row" }, so = { class: "dc-panel__control" }, ao = ["title", "aria-label"], ro = {
  key: 0,
  class: "dc-panel__section"
}, lo = /* @__PURE__ */ de({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = Tn(), r = we(), l = g(
      () => (n.views ?? [...Fn]).map((P) => ({ key: P, label: Vs[P] }))
    ), i = g(
      () => r.sorts.value.map((P) => ({ key: P.key, label: P.label }))
    ), o = g(() => $r(r.query.value.expr)), u = g(() => o.value.parts.map(It)), f = H(o.value.text), m = H(null);
    ye(
      () => o.value.text,
      (P) => {
        f.value = P;
      }
    );
    const b = g(() => f.value !== o.value.text);
    function y() {
      b.value && r.setExpression(ys(o.value.parts, f.value)), s("close");
    }
    function k(P) {
      const { parts: S, text: C } = o.value;
      r.setExpression(ys(S.filter((F, I) => I !== P), C));
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
    return Ft(() => m.value?.focus()), (P, S) => (p(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: S[6] || (S[6] = St(Le((C) => s("close"), ["stop"]), ["esc"]))
    }, [
      _("section", Il, [
        _("div", Ol, [
          _("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, Vl),
          _("div", {
            class: "dc-field",
            onMousedown: S[1] || (S[1] = Le((C) => m.value?.focus(), ["self", "prevent"]))
          }, [
            (p(!0), h(Z, null, ie(u.value, (C, F) => (p(), h("button", {
              key: `${F}:${C}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${C}`,
              "aria-label": `Remove ${C}`,
              onClick: (I) => k(F)
            }, T(C), 9, Kl))), 128)),
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
                St(Le(y, ["prevent"]), ["enter"]),
                St($, ["backspace"])
              ]
            }, null, 40, Bl), [
              [wn, f.value]
            ])
          ], 32)
        ]),
        E(r).entity.value ? (p(!0), h(Z, { key: 0 }, ie(E(r).entity.value.facets, (C) => (p(), ue(la, {
          key: C.key,
          facet: C,
          value: E(r).query.value.facets[C.key],
          onUpdate: (F) => z(C.key, F)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : B("", !0),
        _("div", ql, [
          _("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, Wl),
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
              _("span", jl, T(E(r).entities.value.length) + " kinds", 1)
            ], 8, Hl),
            (p(!0), h(Z, null, ie(E(r).entities.value, (C) => (p(), h("button", {
              key: C.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": C.key === E(r).entity.value?.key ? "true" : "false",
              "aria-current": C.key === E(r).entity.value?.key ? "true" : void 0,
              onClick: (F) => E(r).setEntity(C.key)
            }, [
              _("span", Gl, T(C.label), 1),
              _("span", Yl, T(C.count), 1)
            ], 8, Xl))), 128))
          ], 8, Ul)
        ]),
        _("div", Ql, [
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
          }, " Reset ", 8, Zl)
        ])
      ]),
      _("section", Jl, [
        _("div", eo, [
          S[8] || (S[8] = _("span", { class: "dc-panel__field-label" }, "View", -1)),
          _("div", to, [
            ve(Cn, {
              label: "Result view",
              "model-value": E(r).query.value.view,
              options: l.value,
              "onUpdate:modelValue": S[3] || (S[3] = (C) => E(r).setView(C))
            }, null, 8, ["model-value", "options"])
          ])
        ]),
        _("div", no, [
          S[9] || (S[9] = _("span", { class: "dc-panel__field-label" }, "Sort", -1)),
          _("div", so, [
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
            }, T(E(r).query.value.dir === "desc" ? "↓" : "↑"), 9, ao)
          ])
        ])
      ]),
      a["panel-section"] ? (p(), h("section", ro, [
        qe(P.$slots, "panel-section", {}, void 0, !0)
      ])) : B("", !0)
    ], 40, Nl));
  }
}), oa = /* @__PURE__ */ fe(lo, [["__scopeId", "data-v-171cb4db"]]);
function oo(e, t) {
  const n = Fe(t, "state"), s = Fe(t, "tint");
  return {
    identity: Zt(Fe(t, "identity"), e),
    reference: Zt(Fe(t, "reference"), e),
    metrics: Ys(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Nt(a, e)
    })),
    state: n ? Ae(n, e) ?? null : null,
    updated: Zt(Fe(t, "updated"), e),
    tint: s ? Ae(s, e) ?? null : null
  };
}
function ia(e, t, n, s) {
  const a = n?.columns ?? [];
  return {
    row: e,
    key: ur(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: a,
    ordinal: or(t),
    parts: oo(e, a),
    pinned: s
  };
}
function bt() {
  const e = we(), t = g(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return g(
    () => e.rows.value.map(
      (n, s) => ia(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n)
      )
    )
  );
}
const io = ["data-dc-status"], co = /* @__PURE__ */ de({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (p(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, T(e.status), 9, io));
  }
}), Ot = /* @__PURE__ */ fe(co, [["__scopeId", "data-v-23e59fbf"]]), uo = ["title"], fo = { key: 1 }, po = /* @__PURE__ */ de({
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
    ], 8, uo)) : (p(), h("span", fo, [
      qe(i.$slots, "default", {}, () => [
        De(T(r.value), 1)
      ], !0)
    ]));
  }
}), Vt = /* @__PURE__ */ fe(po, [["__scopeId", "data-v-3bd0cbdb"]]), vo = ["data-dc-active", "aria-pressed", "aria-label"], mo = /* @__PURE__ */ de({
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
    }, T(e.pinned ? "★" : "☆"), 9, vo));
  }
}), Un = /* @__PURE__ */ fe(mo, [["__scopeId", "data-v-ef63d763"]]), ho = ["title", "aria-label"], _o = /* @__PURE__ */ de({
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
    }, " → ", 8, ho)) : B("", !0);
  }
}), Kt = /* @__PURE__ */ fe(_o, [["__scopeId", "data-v-1d9b1a9f"]]), go = { class: "dc-cards" }, yo = { class: "dc-card__top dc-mono" }, wo = {
  key: 0,
  class: "dc-card__entity"
}, bo = { class: "dc-card__top-right" }, ko = ["onClick"], $o = { class: "dc-card__primary" }, xo = { class: "dc-card__secondary dc-mono" }, Co = { class: "dc-card__metrics dc-mono" }, Mo = {
  key: 0,
  class: "dc-card__date"
}, Eo = /* @__PURE__ */ de({
  __name: "CardsView",
  setup(e) {
    const t = we(), n = bt(), s = g(() => t.isEverything.value);
    return (a, r) => (p(), h("div", go, [
      (p(!0), h(Z, null, ie(E(n), (l) => (p(), h("div", {
        key: l.key,
        class: "dc-card"
      }, [
        _("div", yo, [
          _("span", null, [
            De(T(l.ordinal) + " ", 1),
            s.value ? (p(), h("span", wo, T(l.entityLabel), 1)) : B("", !0)
          ]),
          _("span", bo, [
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
          _("span", $o, T(l.parts.identity), 1),
          _("span", xo, T(l.parts.reference), 1)
        ], 8, ko),
        _("div", Co, [
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
          l.parts.updated ? (p(), h("span", Mo, T(l.parts.updated), 1)) : B("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ca = /* @__PURE__ */ fe(Eo, [["__scopeId", "data-v-b633cc4d"]]), So = { class: "dc-grid" }, Po = ["onClick"], Ao = { class: "dc-tile__scrim" }, zo = { class: "dc-tile__top dc-mono" }, Ro = { class: "dc-tile__chip" }, To = { class: "dc-tile__caption" }, Fo = { class: "dc-tile__secondary dc-truncate" }, Lo = { class: "dc-tile__primary" }, Do = /* @__PURE__ */ de({
  __name: "GridView",
  setup(e) {
    const t = we(), n = bt();
    return (s, a) => (p(), h("div", So, [
      (p(!0), h(Z, null, ie(E(n), (r) => (p(), h("button", {
        key: r.key,
        type: "button",
        class: "dc-tile",
        style: ze({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
        onClick: (l) => E(t).activate(r.row)
      }, [
        _("span", Ao, [
          _("span", zo, [
            _("span", Ro, T(r.ordinal), 1)
          ]),
          _("span", To, [
            _("span", Fo, T(r.parts.reference), 1),
            _("span", Lo, T(r.parts.identity), 1)
          ])
        ])
      ], 12, Po))), 128))
    ]));
  }
}), ua = /* @__PURE__ */ fe(Do, [["__scopeId", "data-v-ddbd0e17"]]), No = { class: "dc-links" }, Io = ["onClick"], Oo = { class: "dc-link__primary dc-truncate" }, Vo = { class: "dc-link__secondary dc-mono dc-truncate" }, Ko = /* @__PURE__ */ de({
  __name: "LinksView",
  setup(e) {
    const t = we(), n = bt();
    return (s, a) => (p(), h("div", No, [
      (p(!0), h(Z, null, ie(E(n), (r) => (p(), h("button", {
        key: r.key,
        type: "button",
        class: "dc-link",
        onClick: (l) => E(t).activate(r.row)
      }, [
        _("span", Oo, T(r.parts.identity), 1),
        _("span", Vo, T(r.parts.reference), 1)
      ], 8, Io))), 128))
    ]));
  }
}), da = /* @__PURE__ */ fe(Ko, [["__scopeId", "data-v-d94cadb6"]]), Bo = {
  class: "dc-list",
  role: "list"
}, qo = ["onClick"], Wo = { class: "dc-list__ordinal dc-mono" }, Uo = { class: "dc-list__identity" }, Ho = { class: "dc-list__primary dc-truncate" }, jo = { class: "dc-list__secondary dc-mono dc-truncate" }, Xo = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Go = { class: "dc-list__metrics dc-mono" }, Yo = { class: "dc-list__trailing" }, Qo = /* @__PURE__ */ de({
  __name: "ListView",
  setup(e) {
    const t = we(), n = bt(), s = g(() => t.isEverything.value);
    return (a, r) => (p(), h("div", Bo, [
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
          _("span", Wo, T(l.ordinal), 1),
          _("span", Uo, [
            _("span", Ho, T(l.parts.identity), 1),
            _("span", jo, T(l.parts.reference), 1)
          ])
        ], 8, qo),
        s.value ? (p(), h("span", Xo, T(l.entityLabel), 1)) : B("", !0),
        _("span", Go, [
          (p(!0), h(Z, null, ie(l.parts.metrics.slice(0, 2), (i) => (p(), ue(Vt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        _("span", Yo, [
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
}), Mn = /* @__PURE__ */ fe(Qo, [["__scopeId", "data-v-7ef881bb"]]), Zo = { class: "dc-preview" }, Jo = { class: "dc-preview__pager dc-mono" }, ei = ["disabled"], ti = { "aria-live": "polite" }, ni = ["disabled"], si = {
  key: 0,
  class: "dc-preview__card"
}, ai = { class: "dc-preview__body" }, ri = { class: "dc-preview__top" }, li = { class: "dc-preview__badges" }, oi = { class: "dc-preview__entity dc-mono" }, ii = { class: "dc-preview__marks" }, ci = { class: "dc-preview__primary" }, ui = { class: "dc-preview__secondary dc-mono" }, di = { class: "dc-preview__fields" }, fi = { class: "dc-preview__key" }, pi = { class: "dc-preview__value dc-mono" }, vi = /* @__PURE__ */ de({
  __name: "PreviewView",
  setup(e) {
    const t = we(), n = bt(), s = H(0);
    ye(n, (o) => {
      s.value > o.length - 1 && (s.value = Math.max(0, o.length - 1));
    });
    const a = g(() => n.value[s.value]), r = g(() => {
      const o = a.value;
      if (!o) return [];
      const u = Fe(o.columns, "reference"), f = Fe(o.columns, "updated");
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
    return (o, u) => (p(), h("div", Zo, [
      _("div", Jo, [
        _("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => i(-1))
        }, " ‹ ", 8, ei),
        _("span", ti, T(l.value), 1),
        _("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (f) => i(1))
        }, " › ", 8, ni)
      ]),
      a.value ? (p(), h("div", si, [
        _("div", {
          class: "dc-preview__media",
          style: ze({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        _("div", ai, [
          _("div", ri, [
            _("span", li, [
              a.value.parts.state ? (p(), ue(Ot, {
                key: 0,
                status: a.value.parts.state
              }, null, 8, ["status"])) : B("", !0),
              _("span", oi, T(a.value.entityLabel), 1)
            ]),
            _("span", ii, [
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
            _("div", ci, T(a.value.parts.identity), 1),
            _("div", ui, T(a.value.parts.reference), 1)
          ]),
          _("dl", di, [
            (p(!0), h(Z, null, ie(r.value, (f) => (p(), h("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              _("dt", fi, T(f.key), 1),
              _("dd", pi, [
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
}), fa = /* @__PURE__ */ fe(vi, [["__scopeId", "data-v-8e2c6c48"]]);
function mi() {
  const e = we();
  return g(() => ir(e.schema.value, e.entity.value));
}
const hi = ["src", "alt"], _i = ["title"], gi = /* @__PURE__ */ de({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), s = g(() => t.column.kind ?? "text"), a = g(() => Ae(t.column, t.entry.row)), r = g(
      () => s.value === "ordinal" ? t.entry.ordinal : Nt(t.column, t.entry.row)
    ), l = g(() => a.value), i = g(() => t.column.activate === !0 || !!t.column.click), o = g(() => $n(t.column)), u = g(() => Qs(t.column, t.entry.row));
    function f(m) {
      i.value && (m.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (m, b) => s.value === "component" && e.column.component ? (p(), ue(Ls(e.column.component), {
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
    }, null, 12, hi)) : e.column.drill ? (p(), ue(Vt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (p(), h("button", {
      key: 4,
      type: "button",
      class: nn(["dc-table__open", { "dc-truncate": o.value }]),
      title: u.value,
      onClick: f
    }, T(r.value), 11, _i)) : (p(), h(Z, { key: 5 }, [
      De(T(r.value), 1)
    ], 64));
  }
}), xs = /* @__PURE__ */ fe(gi, [["__scopeId", "data-v-8a010beb"]]), yi = {
  key: 0,
  class: "dc-table__none"
}, wi = { class: "dc-table__detail" }, bi = {
  key: 1,
  class: "dc-table"
}, ki = ["data-dc-align", "data-dc-hide", "aria-sort"], $i = ["onClick"], xi = ["onClick"], Ci = ["data-dc-align", "data-dc-hide", "title"], Mi = {
  key: 0,
  class: "dc-table__name"
}, Ei = /* @__PURE__ */ de({
  __name: "TableView",
  setup(e) {
    const t = we(), n = bt(), s = mi();
    function a(m) {
      m && (t.query.value.sort === m ? t.toggleDirection() : t.setSort(m));
    }
    const r = g(() => t.entity.value?.label ?? "The result set"), l = g(() => new Set(t.sorts.value.map((m) => m.key))), i = (m) => m.sort !== void 0 && l.value.has(m.sort), o = (m) => {
      if (i(m))
        return t.query.value.sort !== m.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function u(m) {
      return [
        _s(m),
        m.muted ? "dc-table__muted" : "",
        m.mono ? "dc-mono" : "",
        $n(m) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function f(m, b) {
      if (!(!$n(m) || m.activate || m.click))
        return Qs(m, b.row);
    }
    return (m, b) => E(s).length ? (p(), h("table", bi, [
      _("thead", null, [
        _("tr", null, [
          (p(!0), h(Z, null, ie(E(s), (y, k) => (p(), h("th", {
            key: E(ms)(y, k),
            scope: "col",
            class: nn(E(_s)(y)),
            style: ze({ width: y.width }),
            "data-dc-align": E(hs)(y),
            "data-dc-hide": y.hideBelow,
            "aria-sort": o(y)
          }, [
            i(y) ? (p(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: ($) => a(y.sort)
            }, T(y.label), 9, $i)) : (p(), h(Z, { key: 1 }, [
              De(T(y.label), 1)
            ], 64))
          ], 14, ki))), 128))
        ])
      ]),
      _("tbody", null, [
        (p(!0), h(Z, null, ie(E(n), (y) => (p(), h("tr", {
          key: y.key,
          class: "dc-table__row",
          onClick: (k) => E(t).activate(y.row)
        }, [
          (p(!0), h(Z, null, ie(E(s), (k, $) => (p(), h("td", {
            key: E(ms)(k, $),
            class: nn(u(k)),
            "data-dc-align": E(hs)(k),
            "data-dc-hide": k.hideBelow,
            title: f(k, y)
          }, [
            k.scope ? (p(), h("span", Mi, [
              ve(xs, {
                column: k,
                entry: y
              }, null, 8, ["column", "entry"]),
              ve(Kt, { entry: y }, null, 8, ["entry"])
            ])) : (p(), ue(xs, {
              key: 1,
              column: k,
              entry: y
            }, null, 8, ["column", "entry"]))
          ], 10, Ci))), 128))
        ], 8, xi))), 128))
      ])
    ])) : (p(), h("p", yi, [
      b[2] || (b[2] = _("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      _("span", wi, [
        De(T(r.value) + " has no ", 1),
        b[0] || (b[0] = _("code", null, "columns", -1)),
        b[1] || (b[1] = De(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), pa = /* @__PURE__ */ fe(Ei, [["__scopeId", "data-v-d6cf251d"]]);
function Si(e) {
  const t = Tt([]), n = H(!1), s = Tt(null);
  let a = 0;
  const r = (o, u, f) => ({
    entity: o,
    rows: u.rows.map(
      (m, b) => ia(m, b, o, e.isPinned(m.id))
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
        query: { ...u, entity: $.key, facets: Lt($), page: 1 },
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
const Pi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Ai = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, zi = ["data-dc-pending"], Ri = ["data-dc-empty"], Ti = ["onClick"], Fi = { class: "dc-type__name" }, Li = { class: "dc-type__count dc-mono" }, Di = { class: "dc-type__sr" }, Ni = {
  key: 0,
  class: "dc-type__empty"
}, Ii = ["onClick"], Oi = { class: "dc-type__identity" }, Vi = { class: "dc-type__primary dc-truncate" }, Ki = { class: "dc-type__secondary dc-mono dc-truncate" }, Bi = { class: "dc-type__trailing dc-mono" }, qi = { class: "dc-type__metric-value" }, Wi = { class: "dc-type__metric-label" }, Ui = {
  key: 0,
  class: "dc-type__date"
}, Hi = ["onClick"], ji = /* @__PURE__ */ de({
  __name: "TypeCardsView",
  setup(e) {
    const t = we(), { previews: n, pending: s, error: a } = Si({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (l) => t.isPinnedId(l)
    }), r = g(() => !t.isPristine.value);
    return (l, i) => E(a) ? (p(), h("p", Pi, " Could not load results: " + T(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !E(n).length && E(s) ? (p(), h("p", Ai, " Running query… ")) : (p(), h("div", {
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
          _("span", Fi, T(o.entity.label), 1),
          _("span", Li, T(o.count), 1),
          i[0] || (i[0] = _("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          _("span", Di, "Show only " + T(o.entity.label.toLowerCase()), 1)
        ], 8, Ti),
        o.rows.length ? B("", !0) : (p(), h("p", Ni, T(r.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), h(Z, null, ie(o.rows, (u) => (p(), h("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          _("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (f) => E(t).activate(u.row)
          }, [
            _("span", Oi, [
              _("span", Vi, T(u.parts.identity), 1),
              _("span", Ki, T(u.parts.reference), 1)
            ])
          ], 8, Ii),
          _("span", Bi, [
            (p(!0), h(Z, null, ie(u.parts.metrics.slice(0, 1), (f) => (p(), ue(Vt, {
              key: f.column.key ?? f.label,
              class: "dc-type__metric",
              entry: u,
              column: f.column
            }, {
              default: gt(() => [
                _("span", qi, T(f.text), 1),
                _("span", Wi, T(f.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), h("span", Ui, T(u.parts.updated), 1)) : B("", !0),
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
        ], 8, Hi)) : B("", !0)
      ], 8, Ri))), 128))
    ], 8, zi));
  }
}), va = /* @__PURE__ */ fe(ji, [["__scopeId", "data-v-b776cfb6"]]), Xi = ["data-dc-pending"], Gi = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, Yi = { class: "dc-results__detail" }, Qi = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Zi = {
  key: 3,
  class: "dc-results__state"
}, Ji = { class: "dc-results__detail" }, ec = /* @__PURE__ */ de({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = we(), s = {
      list: Mn,
      cards: ca,
      grid: ua,
      table: pa,
      links: da,
      preview: fa
    }, a = g(() => js(n.query.value)), r = g(() => Ks(n.query.value.view, t.views)), l = g(() => s[r.value] ?? Mn), i = g(() => n.rows.value.length > 0), o = g(() => n.error.value !== null);
    return (u, f) => (p(), h("div", {
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      o.value ? (p(), h("p", Gi, [
        f[1] || (f[1] = _("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        _("span", Yi, T(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), ue(va, { key: 1 })) : !i.value && E(n).pending.value ? (p(), h("p", Qi, [...f[2] || (f[2] = [
        _("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (p(), ue(Ls(l.value), { key: 4 })) : (p(), h("div", Zi, [
        f[3] || (f[3] = _("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        _("span", Ji, T(E(n).summary.value), 1),
        E(n).isPristine.value ? B("", !0) : (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: f[0] || (f[0] = (m) => E(n).clearFilters())
        }, T(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Xi));
  }
}), ma = /* @__PURE__ */ fe(ec, [["__scopeId", "data-v-4b83efc2"]]), tc = ["data-dc-theme"], nc = ["data-dc-width", "data-dc-align"], sc = { class: "dc-shell__panel" }, ac = /* @__PURE__ */ de({
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
    const s = e, a = n, r = sn(e, "open"), l = sn(e, "pinned"), i = Tn(), o = _t(Is, null), u = s.route || o ? null : tr(), f = s.route ?? o ?? u;
    He(() => u?.dispose?.());
    const m = g(() => Tr({ seed: s.schema.key })), b = g(() => s.source ?? m.value), y = Gr({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), k = Yr({
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
    const $ = Ds() ?? "dc-query-panel", x = H(null);
    function z() {
      r.value && (r.value = !1, Ft(() => {
        x.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const P = g(() => new Set(l.value));
    function S(w) {
      const A = new Set(P.value);
      A.has(w.id) ? A.delete(w.id) : A.add(w.id), l.value = [...A], a("toggle-pin", w);
    }
    function C(w, A) {
      y.narrow(Ir(s.schema, y.query.value, w), A?.key ?? null), a("drill", w, A);
    }
    const F = Vr({
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
        ve(ra, {
          ref_key: "headerRef",
          ref: x,
          expanded: r.value,
          "panel-id": E($),
          views: e.views,
          onToggle: A[0] || (A[0] = (L) => r.value = !r.value)
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
          _("div", sc, [
            ve(oa, {
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
      ], 8, nc),
      qe(w.$slots, "results", {
        rows: E(F).rows.value,
        total: E(F).total.value,
        offset: E(F).offset.value,
        pageCount: E(F).pageCount.value,
        query: E(F).query.value,
        pending: E(F).pending.value
      }, () => [
        ve(ma, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, tc));
  }
}), rc = /* @__PURE__ */ fe(ac, [["__scopeId", "data-v-dea6c736"]]), Pt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, lc = ["aria-label"], oc = ["role", "aria-label"], ic = ["data-dc-item"], cc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, uc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], dc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, fc = { class: "dc-menu__label dc-truncate" }, pc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, vc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, mc = /* @__PURE__ */ de({
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
      return s.items.forEach((A, L) => {
        A.heading ? w.push({ heading: A, entries: [] }) : w[w.length - 1]?.entries.push({ item: A, index: L });
      }), w.filter((A) => A.entries.length > 0);
    }), y = H({ x: s.at.x, y: s.at.y });
    async function k() {
      y.value = { x: s.at.x, y: s.at.y }, await Ft();
      const w = r.value?.getBoundingClientRect();
      if (!w) return;
      const A = 8;
      let L = s.at.x, N = s.at.y;
      if (L + w.width > window.innerWidth - A) {
        const q = s.at.mirrorX === void 0 ? null : s.at.mirrorX - w.width;
        L = q !== null && q >= A ? q : window.innerWidth - w.width - A;
      }
      N + w.height > window.innerHeight - A && (N = window.innerHeight - w.height - A), y.value = { x: Math.max(A, L), y: Math.max(A, N) };
    }
    const $ = g(() => ({ left: `${y.value.x}px`, top: `${y.value.y}px` }));
    function x(w) {
      i.value = w, w !== null && Ft(() => l.value[w]?.focus());
    }
    function z(w, A) {
      const L = m.value;
      if (L.length === 0) return null;
      if (w === null) return A === 1 ? L[0] ?? null : L[L.length - 1] ?? null;
      const N = L.indexOf(w);
      return N === -1 ? L[0] ?? null : L[(N + A + L.length) % L.length] ?? null;
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
    function F(w) {
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
        const L = i.value;
        L !== null && s.items[L]?.items?.length && (w.preventDefault(), w.stopPropagation(), P(L, !0));
        return;
      }
      if (A === "ArrowLeft") {
        o.value !== null && (w.preventDefault(), w.stopPropagation(), S(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const L = i.value;
        if (L === null) return;
        w.preventDefault(), w.stopPropagation(), C(L);
      }
    }
    function I(w) {
      const A = s.items[w];
      !A || !Pt(A) || (o.value !== null && o.value !== w && S(!1), x(w), A.items?.length && P(w, !1));
    }
    return Za(() => {
      k(), s.autofocus && x(z(null, 1));
    }), ye(() => s.at, k, { deep: !0 }), ye(() => s.items, () => void k(), { deep: !0 }), He(() => {
      o.value = null;
    }), t({ root: r }), (w, A) => {
      const L = Ns("MenuList", !0);
      return p(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: ze($.value),
        onKeydown: F
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
          }, T(N.heading.label), 9, ic)) : B("", !0),
          (p(!0), h(Z, null, ie(N.entries, ({ item: Q, index: Ce }) => (p(), h(Z, {
            key: Q.id ?? `${Ce}-${Q.label ?? ""}`
          }, [
            Q.separator ? (p(), h("div", cc)) : (p(), h("button", {
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
              _("span", dc, T(Q.checked ? "✓" : ""), 1),
              _("span", fc, T(Q.label), 1),
              Q.shortcut ? (p(), h("span", pc, T(Q.shortcut), 1)) : Q.items?.length ? (p(), h("span", vc, "›")) : B("", !0)
            ], 40, uc))
          ], 64))), 128))
        ], 8, oc))), 128)),
        o.value !== null && u.value ? (p(), ue(L, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: u.value,
          label: e.items[o.value]?.label,
          autofocus: f.value,
          onChoose: A[0] || (A[0] = (N) => a("choose", N)),
          onDismiss: A[1] || (A[1] = (N) => S(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : B("", !0)
      ], 44, lc);
    };
  }
}), ha = /* @__PURE__ */ fe(mc, [["__scopeId", "data-v-9b1413fa"]]), hc = ["data-dc-theme", "aria-label"], _c = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], gc = /* @__PURE__ */ de({
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
      () => n.menus.flatMap((C, F) => Pt(C) ? [F] : [])
    );
    function m(C, F) {
      const I = l.value[C]?.getBoundingClientRect(), w = n.menus[C];
      !I || !w || !Pt(w) || (o.value = { x: I.left, y: I.bottom + 2, mirrorX: I.right }, i.value = C, u.value = F);
    }
    function b(C) {
      const F = i.value;
      i.value = null, o.value = null, C && F !== null && l.value[F]?.focus();
    }
    function y(C) {
      i.value === C ? b(!0) : m(C, !1);
    }
    function k(C) {
      i.value === null || i.value === C || m(C, !1);
    }
    function $(C, F) {
      const I = f.value;
      if (I.length === 0) return null;
      if (C === null) return F === 1 ? I[0] ?? null : I[I.length - 1] ?? null;
      const w = I.indexOf(C);
      return w === -1 ? I[0] ?? null : I[(w + F + I.length) % I.length] ?? null;
    }
    function x(C) {
      const F = C.key;
      if (F === "Escape") {
        if (i.value === null) return;
        C.preventDefault(), b(!0);
        return;
      }
      if (F === "ArrowDown" && i.value === null) {
        const A = z();
        if (A === null) return;
        C.preventDefault(), m(A, !0);
        return;
      }
      if (F !== "ArrowLeft" && F !== "ArrowRight") return;
      const I = i.value ?? z(), w = $(I, F === "ArrowRight" ? 1 : -1);
      w !== null && (C.preventDefault(), i.value !== null ? m(w, !0) : l.value[w]?.focus());
    }
    function z() {
      const C = l.value.findIndex((F) => F === document.activeElement);
      return C === -1 ? f.value[0] ?? null : C;
    }
    function P(C) {
      const F = C.target;
      !F || r.value?.contains(F) || b(!1);
    }
    ye(i, (C) => {
      C !== null ? window.addEventListener("pointerdown", P, !0) : window.removeEventListener("pointerdown", P, !0);
    }), He(() => window.removeEventListener("pointerdown", P, !0));
    function S(C) {
      b(!0), C.action?.(), a("choose", C);
    }
    return (C, F) => (p(), h("div", {
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
      }, T(I.label), 41, _c))), 128)),
      i.value !== null && o.value ? (p(), ue(ha, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: S,
        onDismiss: F[0] || (F[0] = (I) => b(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : B("", !0)
    ], 44, hc));
  }
}), Hu = /* @__PURE__ */ fe(gc, [["__scopeId", "data-v-93dbd2e4"]]), yc = ["aria-label", "aria-expanded", "disabled"], wc = { "aria-hidden": "true" }, bc = /* @__PURE__ */ de({
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
        _("span", wc, T(e.glyph), 1)
      ], 40, yc),
      r.value ? (p(), ue(ha, {
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
}), Hn = /* @__PURE__ */ fe(bc, [["__scopeId", "data-v-48f5ada5"]]), kt = (e) => e.kind === "split", U = (e) => e.kind === "group", Y = (e) => e.kind === "float", lt = { x: 16, y: 16, w: 360, h: 260 }, ln = 28, _a = 120, En = 220, ga = 38, dt = 6;
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
function ju(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ce = (e) => typeof e == "string", jn = (e) => ce(e) ? Ne(e) : e, qt = (e) => ce(e) ? [e] : je(e), Cs = (e) => e.panels.filter(ce), kc = (e) => e.panels.filter((t) => !ce(t)), Se = (e, t) => e.panels.includes(t);
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
const Qn = (e, t, n) => Yn("row", e, t, n), Xu = (e, t, n) => Yn("column", e, t, n);
function he(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Gu = (e) => ({ ...e, headless: !0 }), Yu = (e) => ({ ...e, fixedView: !0 }), $c = (e) => e === "left" || e === "right" ? "row" : "column";
function je(e) {
  return U(e) ? e.panels.flatMap(qt) : Y(e) ? e.frames.flatMap((t) => je(t.node)) : e.children.flatMap(je);
}
function ne(e, t) {
  return U(e) ? e.panels.some((n) => ce(n) ? n === t : ne(n, t)) : Y(e) ? e.frames.some((n) => ne(n.node, t)) : e.children.some((n) => ne(n, t));
}
const ya = (e) => je(e).length === 0, Sn = (e) => !U(e) && ct(e), Pn = (e) => ya(e) && !Sn(e);
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
function wa(e) {
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
function xc(e) {
  const t = Zn(e).flatMap(xc);
  return U(e) ? [e, ...t] : t;
}
function ge(e, t) {
  if (U(e)) {
    for (const n of kc(e)) {
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
function _n(e, t, n = _a) {
  const s = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), a = s(e.w, t.w), r = s(e.h, t.h), l = (i, o, u) => Math.min(Math.max(i, 0), Math.max(u - o, 0));
  return {
    x: Math.round(l(e.x, a, t.w)),
    y: Math.round(l(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function Ms(e, t, n, s, a = _a) {
  let { x: r, y: l, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (o = e.h + s), t.includes("n") && (o = e.h - s, l = e.y + s), i < a && (t.includes("w") && (r = e.x + e.w - a), i = a), o < a && (t.includes("n") && (l = e.y + e.h - a), o = a), { x: r, y: l, w: i, h: o };
}
const ba = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
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
function Cc(e, t, n) {
  return vt(e, t, (s) => ba(s.rect, n) ? s : { ...s, rect: n });
}
const Je = (e) => e.maximized === !0, ka = (e) => (t) => {
  if (Je(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function Mc(e, t, n = !0) {
  return vt(e, t, ka(n));
}
function Qu(e, t) {
  const n = ge(e, t);
  return n ? Mc(e, t, !Je(n)) : e;
}
const rt = (e) => e.minimized === !0, $a = (e) => (t) => {
  if (rt(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function Ec(e, t, n = !0) {
  return vt(e, t, $a(n));
}
function Zu(e, t) {
  const n = ge(e, t);
  return n ? Ec(e, t, !rt(n)) : e;
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
function Es(e, t, n) {
  return Jn(
    e,
    t,
    (s) => ba(s.rect, n) ? s : { ...s, rect: n }
  );
}
function Sc(e, t, n = !0) {
  return Jn(e, t, ka(n));
}
function Pc(e, t, n = !0) {
  return Jn(e, t, $a(n));
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
function Ac(e, t) {
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
function Ss(e, t, n, s) {
  if (t === n || !ne(e, t) || !ne(e, n) || !ge(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const r = Jt(a, t, n, s);
  return r === a ? e : _e(r);
}
function zc(e, t, n) {
  return Y(e) ? { ...e, frames: [...e.frames, cn(Ne(t), n)] } : U(e) ? Ca(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ne(t)],
    sizes: [...Ue(e), 1],
    ...he(e)
  };
}
function xa(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return zc(e, t, s);
  const r = n.slice(1), l = (f, m) => m === a ? xa(f, t, r, s) : ot(f, t);
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
function Ps(e, t, n, s) {
  const a = tt(e, n);
  return !a || !ya(a) || !ne(e, t) ? e : _e(xa(e, t, n, s));
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
  if (U(e)) return Rc(e);
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
function Rc(e) {
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
function Ca(e, t, n) {
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
    return U(e) ? Se(e, n) ? Ca(e, t, a) : l(e) : Y(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (y) => ne(y, n) ? Et(y, t, n, s, a) : y
      )
    };
  const i = $c(s), o = s === "left" || s === "top", u = (y) => ({
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
      return wa(e) === t ? e : { ...e, active: t };
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
function Ma(e, t, n) {
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
    return l ? Ma(e, r, l) : null;
  }
  return null;
}
function Ju(e, t, n) {
  const s = Ut(
    e,
    t,
    (a) => kt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? _e(s) : e;
}
function Ea(e) {
  return Y(e) ? [e] : Re(e) || ct(e) ? [e] : U(e) ? [...e.panels] : e.children.flatMap(Ea);
}
function Sa(e, t) {
  if (U(e)) return e;
  const n = Zn(e).map(Ea), s = n.flat(), a = t && s.some((l) => qt(l).includes(t)) ? t : void 0, r = Tc(e, n);
  return _e({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...he(e),
    ...r ? { places: r } : {}
  });
}
function Tc(e, t) {
  const n = Y(e) ? e.frames.map(({ node: s, ...a }) => a) : Re(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Fc(e, t) {
  const n = Ut(e, t, (s) => Sa(s, t));
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
    return r ? Ma(e, a, r) : null;
  }
  return null;
}
function As(e, t, n) {
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
function Lc(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (ge(e, t)?.node === s) {
    const l = zn(e, t);
    return l === e ? e : _e(l);
  }
  const r = ts(e, t, (l) => ({
    ...Xn(Pa(l.panels.map(jn), Re(l), n)),
    ...he(l)
  }));
  return r ? _e(r) : e;
}
function Pa(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Gn(e, n).frames;
}
function Aa(e, t) {
  return { ...Xn(Pa(e.children, Re(e), t)), ...he(e) };
}
function ed(e, t, n) {
  const s = Ut(
    e,
    t,
    (a) => Y(a) ? a : Aa(a, n)
  );
  return s ? _e(s) : U(e) && Se(e, t) ? Gn([e], n) : e;
}
function Dc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function za(e, t) {
  const n = Dc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...he(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function td(e, t, n = "row") {
  const s = Ut(
    e,
    t,
    (a) => Y(a) ? za(a, n) : a
  );
  return s ? _e(s) : e;
}
function Ra(e) {
  if (Y(e)) return null;
  const t = U(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ce(t) || U(t) && t.panels.length === 1 && ce(t.panels[0]) ? null : t;
}
const Nc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Ic(e, t) {
  const n = Ra(e);
  return n ? t === "inner" ? n : { ...Nc(n), ...he(e) } : e;
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
function zs(e, t, n, s = 0.02) {
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
  return t !== void 0 && !ce(t) ? e : { ...Qn([Oc(e)]), ...he(e) };
}
const Oc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Rs(e) {
  return e.length === 0 ? null : Qn(e.map(Ne));
}
function Vc(e, t) {
  if (!e) return Rs(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const o of je(e))
    !n.has(o) || s.has(o) ? a.add(o) : s.add(o);
  let r = e;
  for (const o of a)
    r = r ? ot(r, o) : null;
  const l = new Set(r ? je(r) : []), i = t.filter((o) => !l.has(o));
  if (i.length === 0) return r ? on(_e(r)) : null;
  if (!r) return Rs(i);
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
function Kc(e) {
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
const Bc = ["data-dc-glyph"], qc = { class: "dc-glyph__line" }, Wc = ["d"], Uc = {
  key: 0,
  class: "dc-glyph__aqua"
}, Hc = ["d"], jc = /* @__PURE__ */ de({
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
      _("g", qc, [
        (p(!0), h(Z, null, ie(t[e.kind], (r) => (p(), h("path", {
          key: r,
          d: r
        }, null, 8, Wc))), 128))
      ]),
      n[e.kind] ? (p(), h("g", Uc, [
        (p(!0), h(Z, null, ie(n[e.kind], (r) => (p(), h("path", {
          key: r,
          d: r
        }, null, 8, Hc))), 128))
      ])) : B("", !0)
    ], 8, Bc));
  }
}), ht = /* @__PURE__ */ fe(jc, [["__scopeId", "data-v-4d2872c0"]]), Xc = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Gc = ["data-dc-movable"], Yc = { class: "dc-float__title dc-truncate" }, Qc = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Zc = ["aria-label", "aria-pressed", "data-dc-minimize"], Jc = ["aria-label", "aria-pressed", "data-dc-maximize"], eu = ["aria-label", "data-dc-close"], tu = { class: "dc-float__content" }, nu = ["data-dc-handle", "onPointerdown"], su = /* @__PURE__ */ de({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ss(), s = g(() => $e(t.frame.node)), a = g(() => n.panelFor(s.value)?.fixed === !0), r = g(() => Je(t.frame)), l = g(() => rt(t.frame)), i = g(() => r.value || l.value), o = g(() => n.resizable.value && !a.value && !i.value), u = g(() => n.movable.value && !a.value && !i.value), f = g(() => {
      const F = je(t.frame.node);
      return F.length === 1 ? F[0] ?? null : null;
    }), m = g(() => f.value !== null && n.closable(f.value)), b = g(() => t.frame.node.headless === !0), y = g(
      () => !b.value && (!U(t.frame.node) || l.value)
    ), k = g(
      () => t.frame.title || wt(t.frame.node) || Rt(t.frame.node, (F) => n.panelFor(F)?.title)
    ), $ = g(() => n.spaceMenu(t.path));
    function x(F) {
      F.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, F, "move");
    }
    function z(F) {
      F.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const P = g(() => {
      const F = n.framing.value;
      return F !== null && ne(t.frame.node, F);
    }), S = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${En}px`,
        height: `${ga}px`
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
    return (F, I) => (p(), h("div", {
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
        _("span", Yc, T(k.value), 1),
        $.value.length ? (p(), ue(Hn, {
          key: 0,
          items: $.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : B("", !0),
        !a.value || l.value && m.value && f.value ? (p(), h("div", Qc, [
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
          ], 8, Zc)),
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
          ], 8, Jc)),
          l.value && m.value && f.value ? (p(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": f.value,
            onClick: I[2] || (I[2] = (w) => E(n).close(f.value))
          }, [
            ve(ht, { kind: "close" })
          ], 8, eu)) : B("", !0)
        ])) : B("", !0)
      ], 40, Gc)) : B("", !0),
      _("div", tu, [
        qe(F.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), h(Z, null, ie(o.value ? C : [], (w) => (p(), h("span", {
        key: w,
        class: "dc-float__grip",
        "data-dc-handle": w,
        "aria-hidden": "true",
        onPointerdown: Le((A) => E(n).beginFrameDragAt(e.path, A, w), ["stop"])
      }, null, 40, nu))), 128))
    ], 44, Xc));
  }
}), au = /* @__PURE__ */ fe(su, [["__scopeId", "data-v-f035684c"]]), as = Symbol("dc.paneContext");
function ru(e) {
  return Rn(as, e), e;
}
function nd() {
  return _t(as, null);
}
function sd(e) {
  const t = _t(ns, null), n = _t(as, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Mt(e)
  );
  return Ja() && Fs(s), s;
}
const lu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], ou = ["data-dc-movable"], iu = ["aria-label", "aria-pressed"], cu = ["data-dc-space-name"], uu = { class: "dc-truncate" }, du = ["aria-label"], fu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, pu = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], vu = { class: "dc-tab__name dc-truncate" }, mu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, hu = ["aria-label", "data-dc-close", "onClick"], _u = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, gu = { class: "dc-pane__tools" }, yu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, wu = ["aria-label", "data-dc-minimize"], bu = ["aria-label", "aria-pressed", "data-dc-maximize"], ku = ["aria-label", "data-dc-close"], $u = ["id", "role", "aria-labelledby"], xu = ["id", "role", "aria-labelledby"], Cu = ["data-dc-edge"], Mu = /* @__PURE__ */ de({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ss(), s = Ds() ?? "dc-pane", a = g(
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
    }), i = g(() => l.value?.kind === "space" ? l.value.node : null), o = g(() => i.value ? "" : wa(t.group)), u = g(() => i.value ? null : n.panelFor(o.value)), f = g(() => l.value?.title ?? ""), m = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), b = g(() => [...t.path, l.value?.index ?? 0]), y = g(() => o.value || Cs(t.group)[0] || ""), k = g(() => n.viewFor(o.value)), $ = g(() => t.group.headless === !0), x = g(() => n.focused.value === o.value), z = g(() => n.dragging.value === o.value), P = g(() => n.moving.value === o.value), S = g(() => n.frameOf(y.value) !== null), C = g(() => n.panelFor(y.value)?.fixed === !0), F = g(
      () => !i.value && (n.canMove(o.value) || S.value && n.movable.value && !C.value)
    ), I = g(
      () => i.value ? n.spaceMenu(b.value) : n.menuFor(o.value)
    ), w = (O) => n.closable(O);
    ru({ panel: o });
    const A = g(() => n.maximized(y.value)), L = g(
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
      "data-dc-panels": E(Cs)(e.group).join(" ") || void 0,
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
        "data-dc-movable": F.value ? "true" : "false",
        onPointerdown: Ge,
        onDblclick: Ve
      }, [
        F.value ? (p(), h("button", {
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
        ])], 40, iu)) : B("", !0),
        m.value ? (p(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          _("span", uu, T(m.value), 1)
        ], 8, cu)) : B("", !0),
        _("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (p(!0), h(Z, null, ie(a.value, (ee, xe) => (p(), h(Z, {
            key: ee.id
          }, [
            Pe.value === xe ? (p(), h("span", fu)) : B("", !0),
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
              _("span", vu, T(ee.title), 1),
              ee.kind === "panel" && ee.panel.subtitle ? (p(), h("span", mu, T(ee.panel.subtitle), 1)) : B("", !0),
              r.value && ee.kind === "panel" && w(ee.id) ? (p(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ee.title}`,
                "data-dc-close": ee.id,
                onPointerdown: W[0] || (W[0] = Le(() => {
                }, ["stop"])),
                onClick: (be) => $t(be, ee.id)
              }, [...W[9] || (W[9] = [
                _("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, hu)) : B("", !0)
            ], 40, pu)
          ], 64))), 128)),
          Pe.value === a.value.length ? (p(), h("span", _u)) : B("", !0)
        ], 8, du),
        _("div", gu, [
          ve(J),
          I.value.length ? (p(), ue(Hn, {
            key: 0,
            items: I.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : B("", !0)
        ]),
        L.value ? (p(), h("div", yu, [
          S.value && !C.value ? (p(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: W[1] || (W[1] = Le(() => {
            }, ["stop"])),
            onClick: W[2] || (W[2] = (ee) => E(n).toggleMinimize(y.value))
          }, [
            ve(ht, { kind: "minimize" })
          ], 40, wu)) : B("", !0),
          S.value && !C.value ? (p(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": y.value,
            onPointerdown: W[3] || (W[3] = Le(() => {
            }, ["stop"])),
            onClick: W[4] || (W[4] = (ee) => E(n).toggleMaximize(y.value))
          }, [
            ve(ht, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, bu)) : B("", !0),
          !r.value && u.value && w(u.value.id) ? (p(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: W[5] || (W[5] = Le(() => {
            }, ["stop"])),
            onClick: W[6] || (W[6] = (ee) => E(n).close(u.value.id))
          }, [
            ve(ht, { kind: "close" })
          ], 40, ku)) : B("", !0)
        ])) : B("", !0)
      ], 40, ou)),
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
      ], 8, $u)) : (p(), h("div", {
        key: 2,
        id: q.value,
        class: "dc-pane__body",
        role: $.value ? void 0 : "tabpanel",
        "aria-labelledby": $.value ? void 0 : N(o.value)
      }, [
        ve(V)
      ], 8, xu)),
      Ce.value ? (p(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Ce.value,
        "aria-hidden": "true"
      }, null, 8, Cu)) : B("", !0)
    ], 40, lu)) : B("", !0);
  }
}), Ta = /* @__PURE__ */ fe(Mu, [["__scopeId", "data-v-44fd2b2d"]]), Eu = ["data-dc-space", "data-dc-path", "aria-label"], Su = {
  key: 0,
  class: "dc-space__head"
}, Pu = { class: "dc-space__title dc-truncate" }, Au = ["data-dc-direction"], zu = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Ru = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Tu = /* @__PURE__ */ de({
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
          bottom: dt + Math.floor(se / V) * (ga + dt)
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
    }), F = g(() => r.value?.direction === "row"), I = g(() => i.value.map((V, J) => [...t.path, J])), w = (V) => [...je(V)].sort().join("/"), A = (V) => {
      const J = je(V)[0];
      return (J ? n.panelFor(J)?.title : null) ?? J ?? "panel";
    }, L = (V) => {
      const J = i.value[V], se = i.value[V + 1];
      return !J || !se ? "Resize panels" : `Resize ${A(J)} and ${A(se)}`;
    }, N = (V) => {
      const J = o.value[V] ?? 0, se = o.value[V + 1] ?? 0, ae = J + se;
      return ae > 0 ? Math.round(J / ae * 100) : 50;
    };
    function q() {
      const V = s.value, J = V ? F.value ? V.clientWidth : V.clientHeight : 0;
      return J <= 0 ? 0.05 : Math.min(n.minPanelSize.value / J, 0.4);
    }
    let Q = null;
    function Ce(V, J) {
      const se = r.value, ae = s.value;
      if (!n.resizable.value || !se || !ae || V.button !== 0) return;
      const me = F.value ? ae.clientWidth : ae.clientHeight;
      if (me <= 0) return;
      const Me = F.value ? V.clientX : V.clientY, Xe = Ue(se), Ge = Math.min(n.minPanelSize.value / me, 0.4);
      V.preventDefault();
      const Ye = (Oe) => {
        const Ve = ((F.value ? Oe.clientX : Oe.clientY) - Me) / me;
        n.setSizes(t.path, zs(Xe, J, Ve, Ge));
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
      const ae = F.value ? "ArrowRight" : "ArrowDown", me = F.value ? "ArrowLeft" : "ArrowUp", Me = V.shiftKey ? 0.1 : 0.02;
      if (V.key !== ae && V.key !== me) return;
      const Xe = V.key === ae ? Me : -Me;
      V.preventDefault(), n.setSizes(t.path, zs(Ue(se), J, Xe, q()));
    }
    return (V, J) => {
      const se = Ns("WindowNode", !0);
      return a.value ? (p(), ue(Ta, {
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
        !e.framed && !b.value ? (p(), h("header", Su, [
          _("span", Pu, T(f.value), 1),
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
          (p(!0), h(Z, null, ie(u.value, (ae) => (p(), ue(au, {
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
          C.value ? (p(), h("div", zu)) : B("", !0),
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
              "aria-orientation": F.value ? "vertical" : "horizontal",
              "aria-label": L(me),
              "aria-valuenow": N(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Me) => Ce(Me, me),
              onKeydown: (Me) => Pe(Me, me)
            }, null, 40, Ru)) : B("", !0)
          ], 64))), 128))
        ], 8, Au)) : B("", !0)
      ], 8, Eu));
    };
  }
}), Fu = /* @__PURE__ */ fe(Tu, [["__scopeId", "data-v-fb5b403f"]]), Lu = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Du = {
  key: 1,
  class: "dc-window__empty"
}, Nu = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Yt = 16, Iu = /* @__PURE__ */ de({
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
    const s = e, a = n, r = sn(e, "layout"), l = sn(e, "views"), i = Tn(), o = g(() => new Map(s.panels.map((c) => [c.id, c]))), u = g(() => s.panels.map((c) => c.id)), f = g(() => Vc(r.value, u.value)), m = H(null), b = H(null), y = H(null), k = H(!0), $ = H(null), x = H(null), z = H(null), P = H(""), S = H(null);
    function C() {
      const c = S.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function F(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function I() {
      return C().map((c) => ({ pane: c, order: F(c.element) })).sort((c, d) => {
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
    function L(c, d) {
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
          const Ze = G.space ? Ps(ke, c, G.space, G.rect) : G.edge === "float" && G.rect ? Ss(ke, c, G.panel, G.rect) : Gt(ke, c, G.panel, G.edge, G.index);
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
      let D = Pc(d, c, R);
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
      let D = Sc(d, c, R);
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
      const le = Oe(c), te = Ac(M, c);
      $t(c);
      const K = { w: le?.clientWidth ?? 0, h: le?.clientHeight ?? 0 }, j = { ...R.rect }, X = d.clientX, re = d.clientY, pe = s.minPanelSize;
      x.value = D;
      const oe = (Ee) => {
        const Ke = f.value;
        if (!Ke) return;
        const Ct = Es(Ke, te, _n(Ee, K, pe));
        Ct !== Ke && (r.value = Ct);
      }, G = (Ee) => {
        Ee.preventDefault();
        const Ke = Ee.clientX - X, Ct = Ee.clientY - re;
        oe(
          v === "move" ? { ...j, x: j.x + Ke, y: j.y + Ct } : Ms(j, v, Ke, Ct, pe)
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
    function Fa(c, d, v) {
      const M = Ve(c);
      M && ls(M, d, v);
    }
    function La(c, d, v = !1) {
      const M = f.value, R = Ve(c), D = M && R ? at(M, R) : null;
      if (!M || !R || !D || o.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Je(D) || rt(D)) {
        P.value = `${Te(c)} is ${Je(D) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const le = d === "left" ? -Yt : d === "right" ? Yt : 0, te = d === "up" ? -Yt : d === "down" ? Yt : 0, K = Oe(R), j = { w: K?.clientWidth ?? 0, h: K?.clientHeight ?? 0 }, X = v ? Ms(D.rect, "se", le, te, s.minPanelSize) : { ...D.rect, x: D.rect.x + le, y: D.rect.y + te }, re = Es(M, R, _n(X, j, s.minPanelSize));
      if (re === M) {
        P.value = v ? `${Te(c)} cannot be resized further.` : `${Te(c)} cannot move ${d}.`;
        return;
      }
      r.value = re;
      const pe = at(re, R);
      pe && (a("frame-change", { panel: c, rect: pe.rect }), P.value = v ? `${Te(c)} resized to ${pe.rect.w} by ${pe.rect.h}.` : `${Te(c)} moved to ${pe.rect.x}, ${pe.rect.y}.`);
    }
    He(() => Ie?.());
    function Da(c, d) {
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
    function Na(c) {
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
    const Te = (c) => o.value.get(c)?.title ?? c, Ia = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Oa(c, d, v = !1) {
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
      const te = Da(c, d);
      if (!te || te.panel !== void 0 && !q(te.panel)) {
        P.value = `${R} cannot move ${d}.`;
        return;
      }
      const K = Ia[d];
      if (te.space) {
        const re = te.space, pe = tt(M, re), oe = ge(M, c)?.rect, G = { ...lt, ...oe ? { w: oe.w, h: oe.h } : {} };
        Q(Ps(M, c, re, G), { panel: c, target: "", space: re, edge: K }), P.value = `${R} moved ${d}, into ${pe ? wt(pe) : "the space"}.`, dn(c);
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
      Ft(() => {
        w(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Va(c, d) {
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
    function Ka(c) {
      os(c) && a("panel-close", c);
    }
    const pn = H(/* @__PURE__ */ new Map());
    let Ba = 0;
    function qa(c, d) {
      const v = Ba += 1;
      return pn.value.set(v, { panel: c, items: d }), () => {
        pn.value.delete(v);
      };
    }
    function Wa(c) {
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
    function Ua(c, d) {
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
            action: () => L(v, re.key)
          }))
        });
      }
      return R && !D && K.push(
        { id: "show-row", label: "Row", checked: !1, ...le(As(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...le(As(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...le(Fc(c, v))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...le(Lc(c, v))
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
      const d = Ra(c);
      return d && d.fixedView !== !0 ? d : null;
    }
    function Ha(c) {
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
        const G = Sa(v, ja(v));
        if (U(G) && G.panels.length === 0) return v;
        const ke = U(G) && G.panels.length === 1 ? G.panels[0] : void 0;
        return ke !== void 0 && ce(ke) ? v : G;
      }, le = (G) => () => Y(v) ? za(v, G) : v.direction === G ? v : { ...v, direction: G }, te = c.slice(0, -1), K = c.length > 0 ? tt(d, te) : null, j = K && U(K) && K.panels.length > 1 ? K : null, X = K && ds(K) === v ? K : null, re = ds(v), pe = v.title || "this space", oe = (G, ke, Ze, nt, st) => ({
        id: G,
        label: st,
        action: () => {
          const Ee = f.value;
          Ee && (r.value = on(_e(it(Ee, ke, Ic(Ze, nt)))));
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
            R("desktop", "Desktop", () => Y(v) ? v : Aa(v))
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
    function ja(c) {
      const d = m.value;
      return d && ne(c, d) ? d : void 0;
    }
    function Xa(c) {
      const d = f.value, v = o.value.get(c);
      if (!d || !v) return [];
      const M = s.menu ? Ua(d, v) : null, R = Wa(c);
      R.length && M?.panel.length && R.push({ separator: !0 }), M && R.push(...M.panel);
      const D = is([
        { id: "about-panel", title: v.title, items: R },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, D) : D;
    }
    function Ga(c, d) {
      return i[`${c}-${d}`] ?? i[c];
    }
    function fs(c, d, v, M) {
      return Ga(c, d.id)?.({ panel: d, view: v, active: M });
    }
    Kc({
      panelFor: (c) => o.value.get(c) ?? null,
      viewFor: A,
      setView: L,
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
      toggleMoveMode: Na,
      nudge: Oa,
      setSizes: Va,
      frameOf: (c) => f.value ? ge(f.value, c) : null,
      beginFrameDrag: Fa,
      nudgeFrame: La,
      raise: Ht,
      maximized: O,
      toggleMaximize: rs,
      minimized: W,
      toggleMinimize: be,
      beginFrameDragAt: ls,
      raiseAt: $t,
      toggleMaximizeAt: xt,
      toggleMinimizeAt: xe,
      menuFor: Xa,
      spaceMenu: Ha,
      registerMenu: qa,
      closable: os,
      close: Ka,
      renderContent: (c, d, v) => fs("panel", c, d, v),
      renderActions: (c, d, v) => fs("actions", c, d, v),
      layout: f
    });
    const Ya = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), Qa = () => {
      const c = b.value, d = z.value;
      return !c || !d ? null : er(
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
        M && Q(Ss(M, c, d, v), {
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
        const M = Cc(v, c, d);
        if (M === v) return;
        r.value = M;
        const R = ge(M, c);
        R && a("frame-change", { panel: c, rect: R.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: L,
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
      style: ze(Ya.value)
    }, [
      f.value ? (p(), ue(Fu, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (p(), h("p", Du, " This window has no panels. ")),
      ve(Qa),
      _("p", Nu, T(P.value), 1)
    ], 12, Lu));
  }
}), Ou = /* @__PURE__ */ fe(Iu, [["__scopeId", "data-v-711565af"]]);
function ad(e = "", t = "/") {
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
function Ts(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function rd(e) {
  const t = H(Ts(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), s = ye(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Ts(a);
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
const Vu = {
  DataShell: rc,
  ShellHeader: ra,
  QueryPanel: oa,
  ResultsArea: ma,
  FacetControl: la,
  SegmentedControl: Cn,
  StatusPill: Ot,
  WindowFrame: Ou,
  WindowPane: Ta,
  ListView: Mn,
  CardsView: ca,
  GridView: ua,
  TableView: pa,
  LinksView: da,
  PreviewView: fa,
  TypeCardsView: va
}, ld = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Vu))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Is, t.route);
  }
};
export {
  ln as CASCADE_STEP,
  Wu as COLUMN_BREAKPOINTS,
  qu as COLUMN_ROLES,
  ca as CardsView,
  xs as ColumnCell,
  lt as DEFAULT_FRAME,
  bn as DEFAULT_SORT,
  nr as DEFAULT_VIEW,
  rc as DataShell,
  kn as EMPTY_CELL,
  ta as ENTITY_ALL,
  rn as ENTITY_TERM,
  Dt as EXPRESSION_TERM,
  Wn as FACET_PREFIX,
  la as FacetControl,
  ua as GridView,
  ld as HeaderContentLayoutPlugin,
  da as LinksView,
  Mn as ListView,
  dt as MINIMIZED_GAP,
  ga as MINIMIZED_HEIGHT,
  En as MINIMIZED_WIDTH,
  _a as MIN_FRAME,
  ws as MOCK_TINTS,
  Hu as MenuBar,
  Hn as MenuButton,
  ha as MenuList,
  Vt as MetricDrill,
  as as PANE_CONTEXT_KEY,
  Kn as PARAM_DIR,
  In as PARAM_ENTITY,
  Bn as PARAM_EXPR,
  qn as PARAM_PAGE,
  Vn as PARAM_SORT,
  On as PARAM_VIEW,
  Un as PinStar,
  fa as PreviewView,
  oa as QueryPanel,
  Xt as RECORD_STATUSES,
  Xs as RESULT_FIELDS,
  Is as ROUTE_ADAPTER_KEY,
  ma as ResultsArea,
  ea as SHELL_CONTEXT_KEY,
  Bu as SHELL_THEMES,
  Kt as ScopeMark,
  Cn as SegmentedControl,
  ra as ShellHeader,
  Ot as StatusPill,
  pa as TableView,
  va as TypeCardsView,
  Fn as VIEW_KINDS,
  Vs as VIEW_LABELS,
  ns as WINDOW_CONTEXT_KEY,
  Ou as WindowFrame,
  Ta as WindowPane,
  wa as activePanel,
  ut as activeTab,
  Nr as addTerm,
  $c as axisOf,
  Gn as cascade,
  Qs as cellFull,
  Nt as cellText,
  Zt as cellTextOf,
  Ae as cellValue,
  vs as changesResults,
  _n as clampRect,
  Sa as collapseSpace,
  Fc as collapseToTabs,
  Xu as column,
  hs as columnAlign,
  _s as columnClass,
  ms as columnKey,
  $n as columnTruncates,
  ir as columnsFor,
  ar as countPages,
  tr as createHistoryAdapter,
  ad as createMemoryAdapter,
  Tr as createMockDataSource,
  rd as createVueRouterAdapter,
  dr as defaultCellText,
  Rs as defaultLayout,
  Nn as defaultQuery,
  Ir as drillExpression,
  Ps as dropIntoSpace,
  Lt as emptyFacetState,
  Ln as emptyFacetValue,
  ft as findEntity,
  et as findSort,
  Yu as fixedView,
  Xn as float,
  Ss as floatPanel,
  Aa as floatSplit,
  Lc as floatTabs,
  Qt as fnv1a,
  Bs as focusEntity,
  lr as formatDate,
  br as formatExpression,
  rr as formatMetric,
  or as formatOrdinal,
  It as formatTerm,
  cn as frame,
  at as frameAt,
  ge as frameOf,
  An as framePathOf,
  $e as frontPanel,
  Ar as generateRows,
  ju as group,
  pt as groupOf,
  xc as groups,
  Hs as hasActiveFacets,
  ne as hasPanel,
  Gu as headless,
  Et as insertPanel,
  Pt as isChoosable,
  Uu as isEntityScoped,
  Us as isFacetActive,
  Y as isFloat,
  U as isGroup,
  Je as isMaximized,
  rt as isMinimized,
  ce as isPanelTab,
  Dn as isPristineQuery,
  kt as isSplit,
  Se as isTabOf,
  js as isTypeCardsQuery,
  Os as isViewKind,
  ys as joinExpression,
  wr as matchesExpression,
  zr as matchesFacets,
  Mc as maximizeFrame,
  Sc as maximizeFrameAt,
  Ic as mergeSpace,
  Ec as minimizeFrame,
  Pc as minimizeFrameAt,
  Gt as movePanel,
  zt as moveTab,
  tt as nodeAt,
  Rt as nodeTitle,
  _e as normalizeLayout,
  We as normalizeSearch,
  es as normalizeSizes,
  Ra as onlySpace,
  je as panelIds,
  Ne as panelNode,
  Cs as panelTabs,
  yt as parseExpression,
  Hr as parseQuery,
  oo as presentParts,
  ia as presentRow,
  ru as providePaneContext,
  Vr as provideShellContext,
  Kc as provideWindowContext,
  gn as raiseFrame,
  At as raiseFrameAt,
  Ac as raisedPath,
  Gs as reconcileFacets,
  Vc as reconcileLayout,
  Js as recordTerm,
  ot as removePanel,
  it as replaceAt,
  Ms as resizeRect,
  zs as resizeSplit,
  Ks as resolveView,
  Fe as roleColumn,
  Ys as roleColumns,
  on as rootSpace,
  Qn as row,
  ur as rowKey,
  Fr as scopeTerm,
  Lr as scopeTermFor,
  Or as scopedEntity,
  $s as serializeQuery,
  mt as setActivePanel,
  Cc as setFrameRect,
  Es as setFrameRectAt,
  tn as setSizesAt,
  Ju as setSplitDirection,
  Ue as sizesOf,
  Ws as sortsFor,
  he as spaceChrome,
  wt as spaceTitle,
  Yn as split,
  $r as splitExpression,
  As as spreadTabs,
  Xr as summarizeQuery,
  aa as summaryTerms,
  en as swapPanels,
  jn as tabNode,
  qt as tabPanels,
  za as tileFloat,
  ed as toFloat,
  td as toTiled,
  Qu as toggleMaximized,
  Zu as toggleMinimized,
  mi as useColumns,
  Si as useEntityPreviews,
  nd as usePaneContext,
  sd as usePaneMenu,
  bt as usePresentedRows,
  Gr as useQueryState,
  Qr as useRecordNames,
  Yr as useResults,
  we as useShellContext,
  ss as useWindowContext,
  kr as withoutTerm
};
