import { ref as W, inject as _t, provide as Rn, computed as g, toValue as Mt, shallowRef as Tt, watch as ye, onScopeDispose as Ts, defineComponent as ue, onBeforeUnmount as je, openBlock as p, createElementBlock as _, createElementVNode as w, toDisplayString as T, unref as P, Fragment as Y, renderList as oe, createCommentVNode as K, renderSlot as qe, withDirectives as yn, withKeys as St, withModifiers as Le, vModelText as wn, normalizeClass as nn, useSlots as Tn, nextTick as Ft, createBlock as ce, createVNode as pe, createTextVNode as De, withCtx as gt, normalizeStyle as ze, resolveDynamicComponent as Fs, useModel as sn, useId as Ls, createSlots as fs, mergeModels as an, onMounted as Ya, resolveComponent as Ds, getCurrentScope as Qa, h as Za } from "vue";
const Ns = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Ja() {
  const e = typeof window < "u", t = W(e ? We(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), s = () => {
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
const Is = ["list", "cards", "grid", "table", "links", "preview"], Nu = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Xt = ["ok", "running", "queued", "review", "failed"], Iu = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "tint"
], Ou = [480, 620, 760, 900, 1100], er = "cards", bn = "updated";
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
function Bs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Ks(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const tr = { key: bn, label: bn };
function Ue(e, t, n = null) {
  const s = Bs(e, n);
  return (t ? s.find((r) => r.key === t) : void 0) ?? s.find((r) => r.key === bn) ?? s[0] ?? tr;
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
function Lt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Fn(n);
  return t;
}
function qs(e) {
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
  return Object.values(e).some(qs);
}
function Ln(e) {
  return e.entity === null && e.expr.trim() === "" && !Ws(e.facets);
}
function Vu(e) {
  return e.entity !== null;
}
function Us(e) {
  return e.entity === null && e.view === "cards";
}
function nr(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Dn(e, t = {}) {
  const s = t.landing === "entity" ? Vs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Os(t.view) ? t.view : er,
    sort: Ue(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Lt(s),
    page: 1
  };
}
const Hs = ["entity", "sort", "dir", "expr", "facets"];
function ps(e) {
  return Hs.some((t) => t in e);
}
function js(e, t) {
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
function sr(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function ar(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function rr(e) {
  return String(e + 1).padStart(2, "0");
}
const kn = "—";
function Fe(e, t) {
  return e.find((n) => n.role === t);
}
function Xs(e, t) {
  return e.filter((n) => n.role === t);
}
function lr(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const or = ["id", "entityKey", "entityLabel"];
function Ae(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (or.includes(n))
      return t[n];
  }
}
function vs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function ir(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function cr(e, t) {
  if (e == null || e === "") return kn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? sr(n) : String(e);
  }
  return t === "date" ? ar(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : kn : String(e);
}
function Nt(e, t) {
  const n = Ae(e, t);
  return e.format ? e.format(n, t) : cr(n, e.kind);
}
function ur(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Gs(e, t) {
  const n = Nt(e, t), s = ur(Ae(e, t));
  return s && s !== n ? s : n;
}
function Zt(e, t) {
  return e ? Nt(e, t) : "";
}
function ms(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const dr = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function hs(e) {
  return [dr[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function $n(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const fr = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function pr(e) {
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
  for (const a of pr(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const l = fr.exec(a);
    l && l[3] !== "" ? s.push({
      kind: "field",
      field: l[1].toLowerCase(),
      comparator: l[2],
      value: l[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const vn = (e) => e.toLowerCase().replace(/\s+/g, ""), vr = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function mr(e, t, n) {
  const s = vn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && vn(u.label) === s
  );
  if (r) return Ae(r, t);
  const l = n.facets.find((u) => vn(u.label) === s);
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = vr.find(([u]) => u === s)?.[1];
  if (i) {
    const u = Fe(a, i);
    if (u) return Ae(u, t);
  }
  const o = /^metric(\d+)$/.exec(s);
  if (o) {
    const u = Xs(a, "metric")[Number(o[1]) - 1];
    if (u) return Ae(u, t);
  }
}
function mn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function hr(e, t, n) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const o = Fe(l, i), u = o ? Ae(o, t) : void 0;
      return typeof u == "string" && mn(u, e.value);
    });
  }
  const s = mr(e.field, t, n);
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
  return !Number.isFinite(a) || !Number.isFinite(r) ? !0 : _r(e.comparator, r, a);
}
function _r(e, t, n) {
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
function gr(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => hr(a, t, n))) : !0;
}
function _s(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function It(e) {
  return e.kind === "text" ? _s(e.value) : `${e.field}${e.comparator}${_s(e.value)}`;
}
function yr(e) {
  return e.filter((t) => t.length).map((t) => t.map(It).join(" ")).join(" OR ");
}
function wr(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((r, l) => l !== n) : s).filter((s) => s.length);
}
function br(e) {
  const t = yt(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(It).join(" ")
  };
}
function gs(e, t) {
  return [...e.map(It), t.trim()].filter(Boolean).join(" ");
}
const ys = [
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
const kr = 7, $r = 3;
function xr(e, t, n, s) {
  const a = (t * kr + Qt(n)) % s, r = [];
  for (let l = 0; l < Math.min($r, s); l++)
    r.push(Ys(e, (a + l) % s));
  return r;
}
function Cr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Mr(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Mr(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, l) => r - l).map((r) => e[r]);
}
function Er(e, t) {
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
      return ys[n % ys.length];
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
function Sr(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, l = t.scopes ?? [];
  if (!r.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const u = r[o % r.length], f = Math.floor(o / r.length), h = Qt(`${s}:${e.key}:${u[0]}:${o}`), k = Ys(e.key, o), y = new Date(a.getTime() - h % 900 * 36e5).toISOString(), $ = {};
    for (const x of e.columns ?? []) {
      const C = x.field ?? x.key;
      if (!C || x.value) continue;
      const A = Er(x, {
        hash: Qt(`${h}:${C}`),
        sample: u,
        revision: f,
        updatedAt: y
      });
      A !== void 0 && ($[C] = A);
    }
    for (const x of e.facets)
      $[x.key] = Cr(x, Qt(`${h}:${x.key}`));
    for (const [x, C] of l)
      $[x] = C === e.key ? k : xr(C, o, x, n);
    i.push({ id: k, entityKey: e.key, entityLabel: e.label, fields: $ });
  }
  return i;
}
function Pr(e, t) {
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
function Ar(e, t) {
  const n = e.find((l) => l.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", r = s === "date" || n.role === "updated";
  return (l, i) => {
    const o = Ae(n, l), u = Ae(n, i);
    return a ? Number(u ?? 0) - Number(o ?? 0) : r ? Date.parse(String(u ?? "")) - Date.parse(String(o ?? "")) : String(u ?? "").localeCompare(String(o ?? ""));
  };
}
function zr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const r = t.get(s.key);
    if (r) return r;
    const l = e.scopes ?? a.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = Sr(s, { ...e, scopes: l });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: l, offset: i }) {
      const o = yt(s.expr), u = r ? [r] : a.entities, f = [], h = [];
      for (const $ of u)
        for (const x of n($, a))
          f.push(x), (r ? Pr(x, s.facets) : !0) && gr(o, x, $) && h.push(x);
      const k = Ue(r, s.sort, a), y = h.sort(Ar(Ks(r, a), k.key));
      return s.dir === "asc" && y.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: y.slice(i, i + l),
        total: h.length,
        unfiltered: h.length === f.length
      };
    }
  };
}
function Rr(e, t) {
  return Qs(e, t.id);
}
function Qs(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Tr(e, t) {
  return Rr(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
const ws = (e, t) => e.toLowerCase() === t.toLowerCase();
function Fr(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && ws(e.value, t.value) : t.kind === "text" && ws(e.value, t.value);
}
function Lr(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = yt(t).flat();
  return s ? yt(n).some(
    (r) => r.some((l) => Fr(l, s))
  ) ? n : `${n} ${t}` : n;
}
function Dr(e, t, n) {
  return Lr(t.expr, Tr(e, n));
}
function Nr(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const Zs = Symbol("dc.shellContext");
function Ir(e) {
  return Rn(Zs, e), e;
}
function we() {
  const e = _t(Zs, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Nn = "e", In = "v", On = "s", Vn = "d", Kn = "q", Bn = "p", qn = "f_", Js = "*", Or = [
  Nn,
  In,
  On,
  Vn,
  Kn,
  Bn
], xn = "..", ea = ",", Vr = [
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
  for (const [n, s] of Vr) t = t.replace(n, s);
  return t;
}
function Be(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ta(e) {
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
function Kr(e) {
  return Or.includes(e) || e.startsWith(qn);
}
function bs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Br(e, t) {
  const n = Be(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(ea).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(xn), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + xn.length)).trim(), l = a === "" ? null : Number(a), i = r === "" ? null : Number(r);
      let o = l !== null && Number.isFinite(l) ? bs(l, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? bs(i, e.min, e.max) : null;
      return o !== null && u !== null && o > u && ([o, u] = [u, o]), { kind: "range", min: o, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function qr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(ea) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${xn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Wr(e, t, n = {}) {
  const s = Dn(t, n), a = new Map(ta(e)), r = a.get(Nn), l = r === void 0 ? s.entity : Be(r), i = l === Js ? null : ft(t, l), o = a.get(In), u = o && Os(Be(o)) ? Be(o) : s.view, f = a.get(On), h = Ue(i, f ? Be(f) : n.sort, t), k = a.get(Vn), y = k ? Be(k) === "asc" ? "asc" : "desc" : s.dir, $ = a.get(Kn), x = a.get(Bn), C = x === void 0 ? 1 : Number(Be(x)), A = Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 1, F = {};
  for (const R of i?.facets ?? []) {
    const M = a.get(`${qn}${R.key}`);
    F[R.key] = M === void 0 ? Fn(R) : Br(R, M);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: h.key,
    dir: y,
    expr: $ === void 0 ? "" : Be($),
    facets: js(i, F),
    page: A
  };
}
function ks(e, t, n = {}, s = "") {
  const a = Dn(t, n), r = ft(t, e.entity), l = ta(s).filter(([h]) => !Kr(h)), i = [], o = (h, k) => i.push([h, hn(k)]), u = r?.key ?? null;
  u !== a.entity && o(Nn, u ?? Js), e.view !== a.view && o(In, e.view), e.sort !== a.sort && o(On, e.sort), e.dir !== a.dir && o(Vn, e.dir), e.expr.trim() !== "" && o(Kn, e.expr);
  for (const h of r?.facets ?? []) {
    const k = e.facets[h.key];
    if (!k) continue;
    const y = qr(k, h);
    y !== null && i.push([`${qn}${h.key}`, hn(y)]);
  }
  e.page > 1 && o(Bn, String(e.page));
  const f = [
    ...l.map(([h, k]) => [hn(h), k]),
    ...i
  ];
  return f.length ? `?${f.map(([h, k]) => k === "" ? h : `${h}=${k}`).join("&")}` : "";
}
const rn = "entity", Dt = "expr";
function Ur(e, t) {
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
function na(e, t) {
  const n = [];
  t && n.push({
    id: rn,
    label: `entity:${t.key}`,
    facetKey: rn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && qs(a) && n.push(...Ur(s, a));
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
function Hr(e, t, n = null) {
  if (Ln(e)) {
    const r = Ue(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const s = na(e, t).filter((r) => r.facetKey !== Dt).map((r) => r.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function jr(e) {
  const { adapter: t } = e, n = g(() => Mt(e.schema)), s = g(() => Mt(e.defaults) ?? {}), a = g(() => Wr(t.search.value, n.value, s.value)), r = g(() => ft(n.value, a.value.entity)), l = g(() => r.value ?? Vs(n.value, s.value)), i = g(() => Bs(r.value, n.value)), o = g(() => Ue(r.value, a.value.sort, n.value)), u = (C, A) => {
    const F = ks(C, n.value, s.value, t.search.value);
    F !== t.search.value && (A === "push" ? t.push(F) : t.replace(F));
  }, f = () => Mt(e.navigationMode) ?? "push", h = () => Mt(e.facetNavigationMode) ?? "replace", k = (C, A) => {
    const F = C.page ?? (ps(C) ? 1 : a.value.page);
    u({ ...a.value, ...C, page: F }, A);
  }, y = (C, A) => {
    const F = a.value.facets[C];
    if (!F) return;
    const R = { ...a.value.facets, [C]: A(F) };
    k({ facets: R }, h());
  }, $ = (C) => {
    const A = C === null ? null : ft(n.value, C);
    return (A?.key ?? null) === a.value.entity ? {} : {
      entity: A?.key ?? null,
      sort: Ue(A, a.value.sort, n.value).key,
      facets: Lt(A)
    };
  }, x = (C) => {
    const A = $(C);
    Object.keys(A).length && k(A, f());
  };
  return {
    query: a,
    entity: r,
    focus: l,
    sort: o,
    sorts: i,
    summary: g(() => Hr(a.value, r.value, n.value)),
    terms: g(() => na(a.value, r.value)),
    isPristine: g(() => Ln(a.value)),
    isEverything: g(() => a.value.entity === null),
    hasFacets: g(() => Ws(a.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(C) {
      k({ view: C }, f());
    },
    setSort(C) {
      k({ sort: Ue(r.value, C, n.value).key }, f());
    },
    toggleDirection() {
      k({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(C) {
      k({ expr: C }, f());
    },
    narrow(C, A) {
      k({ expr: C, ...$(A) }, f());
    },
    setPage(C, A) {
      k({ page: Math.max(1, Math.floor(C)) }, A ?? f());
    },
    setFacet(C, A) {
      y(C, () => A);
    },
    toggleChip(C, A) {
      y(C, (F) => F.kind !== "chips" ? F : { kind: "chips", selected: F.selected.includes(A) ? F.selected.filter((M) => M !== A) : [...F.selected, A] });
    },
    setRange(C, A, F) {
      y(C, (R) => R.kind === "range" ? { kind: "range", min: A, max: F } : R);
    },
    toggleFlag(C) {
      y(
        C,
        (A) => A.kind === "toggle" ? { kind: "toggle", on: !A.on } : A
      );
    },
    removeTerm(C) {
      if (C.facetKey === rn) {
        x(null);
        return;
      }
      if (C.facetKey === Dt) {
        const A = wr(yt(a.value.expr), C.group ?? 0, C.index ?? 0);
        k({ expr: yr(A) }, f());
        return;
      }
      y(C.facetKey, (A) => A.kind === "chips" && C.option ? { kind: "chips", selected: A.selected.filter((F) => F !== C.option) } : A.kind === "range" ? { kind: "range", min: null, max: null } : A.kind === "toggle" ? { kind: "toggle", on: !1 } : A);
    },
    clearFilters() {
      k({ entity: null, expr: "", facets: Lt(null) }, f());
    },
    reset() {
      u(Dn(n.value, s.value), f());
    },
    hrefFor(C) {
      const A = { ...a.value, ...C };
      return A.page = C.page ?? (ps(C) ? 1 : a.value.page), A.facets = js(ft(n.value, A.entity), A.facets), `${t.path.value}${ks(A, n.value, s.value, t.search.value)}`;
    }
  };
}
function Xr(e) {
  const t = Tt([]), n = W(0), s = W(!1), a = Tt(null);
  let r = 0, l = null;
  const i = g(() => (e.query.value.page - 1) * e.limit.value), o = g(() => nr(n.value, e.limit.value)), u = (x) => {
    t.value = x.rows, n.value = x.total, a.value = null;
  }, f = (x) => {
    a.value = x, t.value = [], n.value = 0;
  }, h = (x, C) => {
    let A = !0;
    const F = () => x === r, R = () => {
      A && (A = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return F();
      },
      insert(M, S) {
        if (!F()) return;
        const D = Array.isArray(M) ? M : [M];
        if (!D.length) return;
        R();
        const m = [...t.value];
        m.splice(S ?? m.length, 0, ...D), t.value = C > 0 ? m.slice(0, C) : m, n.value += D.length;
      },
      set(M) {
        F() && (M.rows && (R(), t.value = C > 0 ? M.rows.slice(0, C) : M.rows, n.value = M.rows.length), M.total !== void 0 && (n.value = M.total));
      },
      close() {
        F() && (s.value = !1);
      },
      fail(M) {
        F() && (f(M), s.value = !1);
      }
    };
  }, k = () => {
    const x = l;
    l = null, x?.();
  }, y = () => {
    const x = ++r;
    k();
    const C = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, A = e.source.value;
    if (A.stream) {
      s.value = !0;
      try {
        l = A.stream(C, h(x, C.limit)) ?? null;
      } catch (R) {
        f(R), s.value = !1;
      }
      return;
    }
    let F;
    try {
      F = A.query(C);
    } catch (R) {
      f(R);
      return;
    }
    if (!(F instanceof Promise)) {
      u(F), s.value = !1;
      return;
    }
    s.value = !0, F.then((R) => {
      x === r && u(R);
    }).catch((R) => {
      x === r && f(R);
    }).finally(() => {
      x === r && (s.value = !1);
    });
  }, $ = g(
    () => `${JSON.stringify(Hs.map((x) => e.query.value[x]))}|${e.query.value.page}`
  );
  return ye([e.source, $, e.schema, e.entity, e.limit], y, {
    immediate: !0
  }), Ts(() => {
    r++, k();
  }, !0), { rows: t, total: n, offset: i, pageCount: o, pending: s, error: a, refresh: y };
}
function Gr(e) {
  const t = Tt(/* @__PURE__ */ new Map()), n = (l) => {
    if (l.facetKey !== Dt || !l.field || !l.value) return null;
    const i = Nr(e.schema.value, l.field);
    return i ? { entity: i, id: l.value, key: `${i.key}:${l.value}` } : null;
  }, s = (l) => {
    const { entity: i, id: o } = l, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Qs(i, o) ?? "",
        facets: Lt(i),
        sort: Ue(i, u.sort, e.schema.value).key,
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
      u.forEach((h, k) => {
        const { reference: y } = i[k], $ = h.rows[0];
        f.set(y.key, $ ? a(y.entity, $) : "");
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
const Yr = ["data-dc-expanded"], Qr = { class: "dc-header__domain" }, Zr = ["data-dc-more"], Jr = { class: "dc-header__view" }, el = { class: "dc-header__view-box" }, tl = ["value"], nl = { value: "" }, sl = ["value"], al = ["title"], rl = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, ll = ["title", "aria-label", "onClick"], ol = ["aria-expanded", "aria-controls"], il = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, cl = { class: "dc-header__sr" }, ul = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, dl = ["disabled"], fl = ["title"], pl = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, vl = ["disabled"], ml = {
  key: 1,
  class: "dc-header__actions"
}, hl = /* @__PURE__ */ ue({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = we(), r = g(() => a.schema.value), l = g(() => a.hasFacets.value || !!a.query.value.expr.trim());
    function i(m) {
      return m.key === a.query.value.entity && l.value && !n.hideCount ? String(a.total.value) : m.count;
    }
    function o(m) {
      return `${m.label} · ${i(m)}`;
    }
    const u = g(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${a.total.value}`), f = g(() => {
      const m = a.query.value, b = Ue(a.entity.value, m.sort, a.schema.value);
      return `${m.view} · ${b.label}`;
    }), h = g(
      () => a.terms.value.filter((m) => m.facetKey !== rn).map((m, b, V) => {
        const te = V[b - 1];
        return {
          term: m,
          or: te?.group !== void 0 && m.group !== void 0 && m.group !== te.group
        };
      })
    ), k = Gr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      terms: a.terms
    });
    function y(m) {
      const b = k.nameOf(m);
      return b ? `${m.field}:${b} (${m.value})` : m.label;
    }
    function $(m) {
      const b = m.target.value;
      a.setEntity(b || null);
    }
    function x(m) {
      m.target?.closest("button, select, label") || s("toggle");
    }
    const C = W(null), A = W("");
    function F() {
      const m = C.value;
      if (!m) {
        A.value = "";
        return;
      }
      const b = m.scrollLeft > 1, V = m.scrollWidth - m.clientWidth - m.scrollLeft > 1;
      A.value = b && V ? "both" : b ? "start" : V ? "end" : "";
    }
    let R = null;
    ye(
      C,
      (m) => {
        R?.disconnect(), R = null, F(), !(!m || typeof ResizeObserver > "u") && (R = new ResizeObserver(F), R.observe(m));
      },
      { flush: "post" }
    ), ye(h, F, { flush: "post" }), je(() => R?.disconnect());
    const M = g(() => a.query.value.page), S = g(
      () => a.pageCount.value > 1 && !Us(a.query.value)
    ), D = g(() => {
      const m = `Page ${M.value} of ${a.pageCount.value}`, b = a.rows.value.length;
      if (!b) return m;
      const V = a.offset.value + 1;
      return `${m} — rows ${V} to ${V + b - 1} of ${a.total.value}`;
    });
    return (m, b) => (p(), _("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      w("div", {
        class: "dc-header__trigger",
        onClick: x
      }, [
        b[5] || (b[5] = w("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        w("span", Qr, T(r.value.label), 1),
        w("div", {
          ref_key: "termBar",
          ref: C,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": A.value,
          onScroll: F
        }, [
          w("label", Jr, [
            b[4] || (b[4] = w("span", { class: "dc-header__view-label" }, "View:", -1)),
            w("span", el, [
              w("select", {
                class: "dc-header__view-select",
                value: P(a).query.value.entity ?? "",
                onChange: $
              }, [
                w("option", nl, T(u.value), 1),
                (p(!0), _(Y, null, oe(P(a).entities.value, (V) => (p(), _("option", {
                  key: V.key,
                  value: V.key
                }, T(o(V)), 9, sl))), 128))
              ], 40, tl),
              b[3] || (b[3] = w("span", {
                class: "dc-header__view-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          P(a).isPristine.value ? (p(), _("span", {
            key: 0,
            class: "dc-header__summary dc-mono dc-truncate",
            title: P(a).summary.value
          }, T(f.value), 9, al)) : K("", !0),
          (p(!0), _(Y, null, oe(h.value, (V) => (p(), _(Y, {
            key: V.term.id
          }, [
            V.or ? (p(), _("span", rl, "or")) : K("", !0),
            w("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${y(V.term)}`,
              "aria-label": `Remove ${y(V.term)}`,
              onClick: (te) => P(a).removeTerm(V.term)
            }, T(y(V.term)), 9, ll)
          ], 64))), 128))
        ], 40, Zr),
        w("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: b[0] || (b[0] = (V) => s("toggle"))
        }, [
          w("span", il, T(e.expanded ? "▲" : "▼"), 1),
          w("span", cl, T(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, ol)
      ]),
      S.value ? (p(), _("nav", ul, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: M.value <= 1,
          onClick: b[1] || (b[1] = (V) => P(a).setPage(M.value - 1))
        }, [...b[6] || (b[6] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, dl),
        w("span", {
          class: "dc-header__page dc-mono",
          title: D.value,
          "aria-hidden": "true"
        }, T(M.value) + " / " + T(P(a).pageCount.value), 9, fl),
        w("span", pl, T(D.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: M.value >= P(a).pageCount.value,
          onClick: b[2] || (b[2] = (V) => P(a).setPage(M.value + 1))
        }, [...b[7] || (b[7] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, vl)
      ])) : K("", !0),
      m.$slots.actions ? (p(), _("div", ml, [
        qe(m.$slots, "actions", {}, void 0, !0)
      ])) : K("", !0)
    ], 8, Yr));
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, sa = /* @__PURE__ */ de(hl, [["__scopeId", "data-v-537246bc"]]), _l = { class: "dc-facet" }, gl = ["id"], yl = { class: "dc-facet__body" }, wl = ["aria-labelledby"], bl = ["aria-pressed", "data-dc-active", "onClick"], kl = ["aria-labelledby"], $l = ["aria-label", "placeholder", "onKeydown"], xl = ["aria-label", "placeholder", "onKeydown"], Cl = ["aria-checked"], Ml = { class: "dc-switch__text" }, El = ["data-dc-active"], Sl = /* @__PURE__ */ ue({
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
    function r(h) {
      if (n.value.kind !== "chips") return;
      const k = a.value.has(h) ? n.value.selected.filter((y) => y !== h) : [...n.value.selected, h];
      s("update", { kind: "chips", selected: k });
    }
    const l = W(""), i = W("");
    ye(
      () => n.value,
      (h) => {
        h.kind === "range" && (l.value = h.min === null ? "" : h.min, i.value = h.max === null ? "" : h.max);
      },
      { immediate: !0, deep: !0 }
    );
    function o(h) {
      if (typeof h == "number") return Number.isFinite(h) ? h : null;
      const k = h.trim();
      if (!k) return null;
      const y = Number(k);
      return Number.isFinite(y) ? y : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const h = o(l.value), k = o(i.value);
      h === n.value.min && k === n.value.max || s("update", { kind: "range", min: h, max: k });
    }
    function f() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (h, k) => (p(), _("div", _l, [
      w("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, T(e.facet.label), 9, gl),
      w("div", yl, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (p(), _("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (p(!0), _(Y, null, oe(e.facet.options, (y) => (p(), _("button", {
            key: y,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(y),
            "data-dc-active": a.value.has(y) ? "true" : "false",
            onClick: ($) => r(y)
          }, T(y), 9, bl))), 128))
        ], 8, wl)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), _("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          yn(w("input", {
            "onUpdate:modelValue": k[0] || (k[0] = (y) => l.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: St(Le(u, ["prevent"]), ["enter"])
          }, null, 40, $l), [
            [wn, l.value]
          ]),
          k[2] || (k[2] = w("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          yn(w("input", {
            "onUpdate:modelValue": k[1] || (k[1] = (y) => i.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: St(Le(u, ["prevent"]), ["enter"])
          }, null, 40, xl), [
            [wn, i.value]
          ])
        ], 8, kl)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), _("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: f
        }, [
          w("span", Ml, T(e.facet.text), 1),
          w("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...k[3] || (k[3] = [
            w("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, El)
        ], 8, Cl)) : K("", !0)
      ])
    ]));
  }
}), aa = /* @__PURE__ */ de(Sl, [["__scopeId", "data-v-36d1334b"]]), Pl = ["aria-label"], Al = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], zl = /* @__PURE__ */ ue({
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
    function r(l, i) {
      const o = n.options.length;
      let u = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? u = (i + 1) % o : l.key === "ArrowLeft" || l.key === "ArrowUp" ? u = (i - 1 + o) % o : l.key === "Home" ? u = 0 : l.key === "End" && (u = o - 1), u === null) return;
      l.preventDefault();
      const f = n.options[u];
      f && (s("update:modelValue", f.key), a.value[u]?.focus());
    }
    return (l, i) => (p(), _("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (p(!0), _(Y, null, oe(e.options, (o, u) => (p(), _("button", {
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
      }, T(o.label), 43, Al))), 128))
    ], 8, Pl));
  }
}), Cn = /* @__PURE__ */ de(zl, [["__scopeId", "data-v-63fb5482"]]), Rl = ["id"], Tl = { class: "dc-panel__section dc-panel__rows" }, Fl = { class: "dc-panel__row" }, Ll = ["for"], Dl = ["title", "aria-label", "onClick"], Nl = ["id", "placeholder", "onKeydown"], Il = { class: "dc-panel__row" }, Ol = ["id"], Vl = ["aria-labelledby"], Kl = ["data-dc-active", "aria-current"], Bl = { class: "dc-entity__count dc-mono" }, ql = ["data-dc-active", "aria-current", "onClick"], Wl = { class: "dc-entity__label" }, Ul = { class: "dc-entity__count dc-mono" }, Hl = { class: "dc-panel__actions" }, jl = ["disabled"], Xl = { class: "dc-panel__section dc-panel__rows" }, Gl = { class: "dc-panel__row" }, Yl = { class: "dc-panel__control" }, Ql = { class: "dc-panel__row" }, Zl = { class: "dc-panel__control" }, Jl = ["title", "aria-label"], eo = {
  key: 0,
  class: "dc-panel__section"
}, to = /* @__PURE__ */ ue({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = Tn(), r = we(), l = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, i = g(
      () => (n.views ?? [...Is]).map((R) => ({ key: R, label: l[R] }))
    ), o = g(
      () => r.sorts.value.map((R) => ({ key: R.key, label: R.label }))
    ), u = g(() => br(r.query.value.expr)), f = g(() => u.value.parts.map(It)), h = W(u.value.text), k = W(null);
    ye(
      () => u.value.text,
      (R) => {
        h.value = R;
      }
    );
    const y = g(() => h.value !== u.value.text);
    function $() {
      y.value && r.setExpression(gs(u.value.parts, h.value)), s("close");
    }
    function x(R) {
      const { parts: M, text: S } = u.value;
      r.setExpression(gs(M.filter((D, m) => m !== R), S));
    }
    function C(R) {
      const { parts: M } = u.value;
      h.value || !M.length || (R.preventDefault(), x(M.length - 1));
    }
    function A() {
      h.value = "", r.clearFilters();
    }
    function F(R, M) {
      r.setFacet(R, M);
    }
    return Ft(() => k.value?.focus()), (R, M) => (p(), _("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: M[6] || (M[6] = St(Le((S) => s("close"), ["stop"]), ["esc"]))
    }, [
      w("section", Tl, [
        w("div", Fl, [
          w("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, Ll),
          w("div", {
            class: "dc-field",
            onMousedown: M[1] || (M[1] = Le((S) => k.value?.focus(), ["self", "prevent"]))
          }, [
            (p(!0), _(Y, null, oe(f.value, (S, D) => (p(), _("button", {
              key: `${D}:${S}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${S}`,
              "aria-label": `Remove ${S}`,
              onClick: (m) => x(D)
            }, T(S), 9, Dl))), 128)),
            yn(w("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: k,
              "onUpdate:modelValue": M[0] || (M[0] = (S) => h.value = S),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: f.value.length ? "" : P(r).schema.value.placeholder,
              onKeydown: [
                St(Le($, ["prevent"]), ["enter"]),
                St(C, ["backspace"])
              ]
            }, null, 40, Nl), [
              [wn, h.value]
            ])
          ], 32)
        ]),
        P(r).entity.value ? (p(!0), _(Y, { key: 0 }, oe(P(r).entity.value.facets, (S) => (p(), ce(aa, {
          key: S.key,
          facet: S,
          value: P(r).query.value.facets[S.key],
          onUpdate: (D) => F(S.key, D)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : K("", !0),
        w("div", Il, [
          w("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, Ol),
          w("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            w("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": P(r).isEverything.value ? "true" : "false",
              "aria-current": P(r).isEverything.value ? "true" : void 0,
              onClick: M[2] || (M[2] = (S) => P(r).clearEntity())
            }, [
              M[7] || (M[7] = w("span", { class: "dc-entity__label" }, "Everything", -1)),
              w("span", Bl, T(P(r).entities.value.length) + " kinds", 1)
            ], 8, Kl),
            (p(!0), _(Y, null, oe(P(r).entities.value, (S) => (p(), _("button", {
              key: S.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": S.key === P(r).entity.value?.key ? "true" : "false",
              "aria-current": S.key === P(r).entity.value?.key ? "true" : void 0,
              onClick: (D) => P(r).setEntity(S.key)
            }, [
              w("span", Wl, T(S.label), 1),
              w("span", Ul, T(S.count), 1)
            ], 8, ql))), 128))
          ], 8, Vl)
        ]),
        w("div", Hl, [
          w("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: $
          }, " Run query "),
          w("button", {
            type: "button",
            class: "dc-button",
            disabled: P(r).isPristine.value && !y.value,
            onClick: A
          }, " Reset ", 8, jl)
        ])
      ]),
      w("section", Xl, [
        w("div", Gl, [
          M[8] || (M[8] = w("span", { class: "dc-panel__field-label" }, "View", -1)),
          w("div", Yl, [
            pe(Cn, {
              label: "Result view",
              "model-value": P(r).query.value.view,
              options: i.value,
              "onUpdate:modelValue": M[3] || (M[3] = (S) => P(r).setView(S))
            }, null, 8, ["model-value", "options"])
          ])
        ]),
        w("div", Ql, [
          M[9] || (M[9] = w("span", { class: "dc-panel__field-label" }, "Sort", -1)),
          w("div", Zl, [
            pe(Cn, {
              mono: "",
              label: "Sort field",
              "model-value": P(r).query.value.sort,
              options: o.value,
              "onUpdate:modelValue": M[4] || (M[4] = (S) => P(r).setSort(S))
            }, null, 8, ["model-value", "options"]),
            w("button", {
              type: "button",
              class: "dc-button dc-button--icon dc-mono",
              title: P(r).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${P(r).query.value.dir === "desc" ? "descending" : "ascending"}`,
              onClick: M[5] || (M[5] = (S) => P(r).toggleDirection())
            }, T(P(r).query.value.dir === "desc" ? "↓" : "↑"), 9, Jl)
          ])
        ])
      ]),
      a["panel-section"] ? (p(), _("section", eo, [
        qe(R.$slots, "panel-section", {}, void 0, !0)
      ])) : K("", !0)
    ], 40, Rl));
  }
}), ra = /* @__PURE__ */ de(to, [["__scopeId", "data-v-667e48a4"]]);
function no(e, t) {
  const n = Fe(t, "state"), s = Fe(t, "tint");
  return {
    identity: Zt(Fe(t, "identity"), e),
    reference: Zt(Fe(t, "reference"), e),
    metrics: Xs(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Nt(a, e)
    })),
    state: n ? Ae(n, e) ?? null : null,
    updated: Zt(Fe(t, "updated"), e),
    tint: s ? Ae(s, e) ?? null : null
  };
}
function la(e, t, n, s) {
  const a = n?.columns ?? [];
  return {
    row: e,
    key: ir(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: a,
    ordinal: rr(t),
    parts: no(e, a),
    pinned: s
  };
}
function bt() {
  const e = we(), t = g(
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
const so = ["data-dc-status"], ao = /* @__PURE__ */ ue({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (p(), _("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, T(e.status), 9, so));
  }
}), Ot = /* @__PURE__ */ de(ao, [["__scopeId", "data-v-23e59fbf"]]), ro = ["title"], lo = { key: 1 }, oo = /* @__PURE__ */ ue({
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
    return (i, o) => s.value ? (p(), _("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: l
    }, [
      qe(i.$slots, "default", {}, () => [
        De(T(r.value), 1)
      ], !0)
    ], 8, ro)) : (p(), _("span", lo, [
      qe(i.$slots, "default", {}, () => [
        De(T(r.value), 1)
      ], !0)
    ]));
  }
}), Vt = /* @__PURE__ */ de(oo, [["__scopeId", "data-v-3bd0cbdb"]]), io = ["data-dc-active", "aria-pressed", "aria-label"], co = /* @__PURE__ */ ue({
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
    return (a, r) => (p(), _("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, T(e.pinned ? "★" : "☆"), 9, io));
  }
}), Wn = /* @__PURE__ */ de(co, [["__scopeId", "data-v-ef63d763"]]), uo = ["title", "aria-label"], fo = /* @__PURE__ */ ue({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), s = g(() => t.entry.entity?.scope ?? null);
    function a(r) {
      r.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (r, l) => s.value ? (p(), _("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, uo)) : K("", !0);
  }
}), Kt = /* @__PURE__ */ de(fo, [["__scopeId", "data-v-1d9b1a9f"]]), po = { class: "dc-cards" }, vo = { class: "dc-card__top dc-mono" }, mo = {
  key: 0,
  class: "dc-card__entity"
}, ho = { class: "dc-card__top-right" }, _o = ["onClick"], go = { class: "dc-card__primary" }, yo = { class: "dc-card__secondary dc-mono" }, wo = { class: "dc-card__metrics dc-mono" }, bo = {
  key: 0,
  class: "dc-card__date"
}, ko = /* @__PURE__ */ ue({
  __name: "CardsView",
  setup(e) {
    const t = we(), n = bt(), s = g(() => t.isEverything.value);
    return (a, r) => (p(), _("div", po, [
      (p(!0), _(Y, null, oe(P(n), (l) => (p(), _("div", {
        key: l.key,
        class: "dc-card"
      }, [
        w("div", vo, [
          w("span", null, [
            De(T(l.ordinal) + " ", 1),
            s.value ? (p(), _("span", mo, T(l.entityLabel), 1)) : K("", !0)
          ]),
          w("span", ho, [
            l.parts.state ? (p(), ce(Ot, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : K("", !0),
            pe(Kt, { entry: l }, null, 8, ["entry"]),
            P(t).pinnable.value ? (p(), ce(Wn, {
              key: 1,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : K("", !0)
          ])
        ]),
        w("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => P(t).activate(l.row)
        }, [
          w("span", go, T(l.parts.identity), 1),
          w("span", yo, T(l.parts.reference), 1)
        ], 8, _o),
        w("div", wo, [
          (p(!0), _(Y, null, oe(l.parts.metrics.slice(0, 2), (i) => (p(), ce(Vt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, {
            default: gt(() => [
              De(T(i.label) + " " + T(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (p(), _("span", bo, T(l.parts.updated), 1)) : K("", !0)
        ])
      ]))), 128))
    ]));
  }
}), oa = /* @__PURE__ */ de(ko, [["__scopeId", "data-v-b633cc4d"]]), $o = { class: "dc-grid" }, xo = ["onClick"], Co = { class: "dc-tile__scrim" }, Mo = { class: "dc-tile__top dc-mono" }, Eo = { class: "dc-tile__chip" }, So = { class: "dc-tile__caption" }, Po = { class: "dc-tile__secondary dc-truncate" }, Ao = { class: "dc-tile__primary" }, zo = /* @__PURE__ */ ue({
  __name: "GridView",
  setup(e) {
    const t = we(), n = bt();
    return (s, a) => (p(), _("div", $o, [
      (p(!0), _(Y, null, oe(P(n), (r) => (p(), _("button", {
        key: r.key,
        type: "button",
        class: "dc-tile",
        style: ze({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
        onClick: (l) => P(t).activate(r.row)
      }, [
        w("span", Co, [
          w("span", Mo, [
            w("span", Eo, T(r.ordinal), 1)
          ]),
          w("span", So, [
            w("span", Po, T(r.parts.reference), 1),
            w("span", Ao, T(r.parts.identity), 1)
          ])
        ])
      ], 12, xo))), 128))
    ]));
  }
}), ia = /* @__PURE__ */ de(zo, [["__scopeId", "data-v-ddbd0e17"]]), Ro = { class: "dc-links" }, To = ["onClick"], Fo = { class: "dc-link__primary dc-truncate" }, Lo = { class: "dc-link__secondary dc-mono dc-truncate" }, Do = /* @__PURE__ */ ue({
  __name: "LinksView",
  setup(e) {
    const t = we(), n = bt();
    return (s, a) => (p(), _("div", Ro, [
      (p(!0), _(Y, null, oe(P(n), (r) => (p(), _("button", {
        key: r.key,
        type: "button",
        class: "dc-link",
        onClick: (l) => P(t).activate(r.row)
      }, [
        w("span", Fo, T(r.parts.identity), 1),
        w("span", Lo, T(r.parts.reference), 1)
      ], 8, To))), 128))
    ]));
  }
}), ca = /* @__PURE__ */ de(Do, [["__scopeId", "data-v-d94cadb6"]]), No = {
  class: "dc-list",
  role: "list"
}, Io = ["onClick"], Oo = { class: "dc-list__ordinal dc-mono" }, Vo = { class: "dc-list__identity" }, Ko = { class: "dc-list__primary dc-truncate" }, Bo = { class: "dc-list__secondary dc-mono dc-truncate" }, qo = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Wo = { class: "dc-list__metrics dc-mono" }, Uo = { class: "dc-list__trailing" }, Ho = /* @__PURE__ */ ue({
  __name: "ListView",
  setup(e) {
    const t = we(), n = bt(), s = g(() => t.isEverything.value);
    return (a, r) => (p(), _("div", No, [
      (p(!0), _(Y, null, oe(P(n), (l) => (p(), _("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        w("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => P(t).activate(l.row)
        }, [
          w("span", Oo, T(l.ordinal), 1),
          w("span", Vo, [
            w("span", Ko, T(l.parts.identity), 1),
            w("span", Bo, T(l.parts.reference), 1)
          ])
        ], 8, Io),
        s.value ? (p(), _("span", qo, T(l.entityLabel), 1)) : K("", !0),
        w("span", Wo, [
          (p(!0), _(Y, null, oe(l.parts.metrics.slice(0, 2), (i) => (p(), ce(Vt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", Uo, [
          l.parts.state ? (p(), ce(Ot, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : K("", !0),
          pe(Kt, { entry: l }, null, 8, ["entry"]),
          P(t).pinnable.value ? (p(), ce(Wn, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : K("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Mn = /* @__PURE__ */ de(Ho, [["__scopeId", "data-v-7ef881bb"]]), jo = { class: "dc-preview" }, Xo = { class: "dc-preview__pager dc-mono" }, Go = ["disabled"], Yo = { "aria-live": "polite" }, Qo = ["disabled"], Zo = {
  key: 0,
  class: "dc-preview__card"
}, Jo = { class: "dc-preview__body" }, ei = { class: "dc-preview__top" }, ti = { class: "dc-preview__badges" }, ni = { class: "dc-preview__entity dc-mono" }, si = { class: "dc-preview__marks" }, ai = { class: "dc-preview__primary" }, ri = { class: "dc-preview__secondary dc-mono" }, li = { class: "dc-preview__fields" }, oi = { class: "dc-preview__key" }, ii = { class: "dc-preview__value dc-mono" }, ci = /* @__PURE__ */ ue({
  __name: "PreviewView",
  setup(e) {
    const t = we(), n = bt(), s = W(0);
    ye(n, (o) => {
      s.value > o.length - 1 && (s.value = Math.max(0, o.length - 1));
    });
    const a = g(() => n.value[s.value]), r = g(() => {
      const o = a.value;
      if (!o) return [];
      const u = Fe(o.columns, "reference"), f = Fe(o.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((h) => ({
          key: h.label,
          value: h.text,
          column: h.column
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
    return (o, u) => (p(), _("div", jo, [
      w("div", Xo, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => i(-1))
        }, " ‹ ", 8, Go),
        w("span", Yo, T(l.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= P(n).length - 1,
          onClick: u[1] || (u[1] = (f) => i(1))
        }, " › ", 8, Qo)
      ]),
      a.value ? (p(), _("div", Zo, [
        w("div", {
          class: "dc-preview__media",
          style: ze({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        w("div", Jo, [
          w("div", ei, [
            w("span", ti, [
              a.value.parts.state ? (p(), ce(Ot, {
                key: 0,
                status: a.value.parts.state
              }, null, 8, ["status"])) : K("", !0),
              w("span", ni, T(a.value.entityLabel), 1)
            ]),
            w("span", si, [
              pe(Kt, { entry: a.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (p(), ce(Wn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : K("", !0)
            ])
          ]),
          w("div", null, [
            w("div", ai, T(a.value.parts.identity), 1),
            w("div", ri, T(a.value.parts.reference), 1)
          ]),
          w("dl", li, [
            (p(!0), _(Y, null, oe(r.value, (f) => (p(), _("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              w("dt", oi, T(f.key), 1),
              w("dd", ii, [
                f.column && a.value ? (p(), ce(Vt, {
                  key: 0,
                  entry: a.value,
                  column: f.column
                }, null, 8, ["entry", "column"])) : (p(), _(Y, { key: 1 }, [
                  De(T(f.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          w("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (f) => P(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : K("", !0)
    ]));
  }
}), ua = /* @__PURE__ */ de(ci, [["__scopeId", "data-v-8e2c6c48"]]);
function ui() {
  const e = we();
  return g(() => lr(e.schema.value, e.entity.value));
}
const di = ["src", "alt"], fi = ["title"], pi = /* @__PURE__ */ ue({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), s = g(() => t.column.kind ?? "text"), a = g(() => Ae(t.column, t.entry.row)), r = g(
      () => s.value === "ordinal" ? t.entry.ordinal : Nt(t.column, t.entry.row)
    ), l = g(() => a.value), i = g(() => t.column.activate === !0 || !!t.column.click), o = g(() => $n(t.column)), u = g(() => Gs(t.column, t.entry.row));
    function f(h) {
      i.value && (h.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (h, k) => s.value === "component" && e.column.component ? (p(), ce(Fs(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (p(), ce(Ot, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : s.value === "image" ? (p(), _("img", {
      key: 2,
      class: "dc-cell__image",
      src: String(a.value ?? ""),
      alt: e.entry.parts.identity,
      loading: "lazy",
      style: ze({ maxHeight: e.column.height }),
      onClick: f
    }, null, 12, di)) : e.column.drill ? (p(), ce(Vt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (p(), _("button", {
      key: 4,
      type: "button",
      class: nn(["dc-table__open", { "dc-truncate": o.value }]),
      title: u.value,
      onClick: f
    }, T(r.value), 11, fi)) : (p(), _(Y, { key: 5 }, [
      De(T(r.value), 1)
    ], 64));
  }
}), $s = /* @__PURE__ */ de(pi, [["__scopeId", "data-v-8a010beb"]]), vi = {
  key: 0,
  class: "dc-table__none"
}, mi = { class: "dc-table__detail" }, hi = {
  key: 1,
  class: "dc-table"
}, _i = ["data-dc-align", "data-dc-hide", "aria-sort"], gi = ["onClick"], yi = ["onClick"], wi = ["data-dc-align", "data-dc-hide", "title"], bi = {
  key: 0,
  class: "dc-table__name"
}, ki = /* @__PURE__ */ ue({
  __name: "TableView",
  setup(e) {
    const t = we(), n = bt(), s = ui();
    function a(h) {
      h && (t.query.value.sort === h ? t.toggleDirection() : t.setSort(h));
    }
    const r = g(() => t.entity.value?.label ?? "The result set"), l = g(() => new Set(t.sorts.value.map((h) => h.key))), i = (h) => h.sort !== void 0 && l.value.has(h.sort), o = (h) => {
      if (i(h))
        return t.query.value.sort !== h.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function u(h) {
      return [
        hs(h),
        h.muted ? "dc-table__muted" : "",
        h.mono ? "dc-mono" : "",
        $n(h) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function f(h, k) {
      if (!(!$n(h) || h.activate || h.click))
        return Gs(h, k.row);
    }
    return (h, k) => P(s).length ? (p(), _("table", hi, [
      w("thead", null, [
        w("tr", null, [
          (p(!0), _(Y, null, oe(P(s), (y, $) => (p(), _("th", {
            key: P(vs)(y, $),
            scope: "col",
            class: nn(P(hs)(y)),
            style: ze({ width: y.width }),
            "data-dc-align": P(ms)(y),
            "data-dc-hide": y.hideBelow,
            "aria-sort": o(y)
          }, [
            i(y) ? (p(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (x) => a(y.sort)
            }, T(y.label), 9, gi)) : (p(), _(Y, { key: 1 }, [
              De(T(y.label), 1)
            ], 64))
          ], 14, _i))), 128))
        ])
      ]),
      w("tbody", null, [
        (p(!0), _(Y, null, oe(P(n), (y) => (p(), _("tr", {
          key: y.key,
          class: "dc-table__row",
          onClick: ($) => P(t).activate(y.row)
        }, [
          (p(!0), _(Y, null, oe(P(s), ($, x) => (p(), _("td", {
            key: P(vs)($, x),
            class: nn(u($)),
            "data-dc-align": P(ms)($),
            "data-dc-hide": $.hideBelow,
            title: f($, y)
          }, [
            $.scope ? (p(), _("span", bi, [
              pe($s, {
                column: $,
                entry: y
              }, null, 8, ["column", "entry"]),
              pe(Kt, { entry: y }, null, 8, ["entry"])
            ])) : (p(), ce($s, {
              key: 1,
              column: $,
              entry: y
            }, null, 8, ["column", "entry"]))
          ], 10, wi))), 128))
        ], 8, yi))), 128))
      ])
    ])) : (p(), _("p", vi, [
      k[2] || (k[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", mi, [
        De(T(r.value) + " has no ", 1),
        k[0] || (k[0] = w("code", null, "columns", -1)),
        k[1] || (k[1] = De(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), da = /* @__PURE__ */ de(ki, [["__scopeId", "data-v-d6cf251d"]]);
function $i(e) {
  const t = Tt([]), n = W(!1), s = Tt(null);
  let a = 0;
  const r = (o, u, f) => ({
    entity: o,
    rows: u.rows.map(
      (h, k) => la(h, k, o, e.isPinned(h.id))
    ),
    total: u.total,
    count: f ? o.count : String(u.total)
  }), l = () => {
    const o = ++a, u = e.query.value, f = e.schema.value, h = e.entities.value, k = e.limit.value, y = Ln(u), $ = h.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: x.key, facets: Lt(x), page: 1 },
        schema: f,
        entity: x,
        limit: k,
        offset: 0
      })
    }));
    if ($.every(({ outcome: x }) => !(x instanceof Promise))) {
      t.value = $.map(
        ({ entity: x, outcome: C }) => r(x, C, y)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      o === a && (t.value = x.map(
        (C, A) => r($[A].entity, C, y)
      ), s.value = null);
    }).catch((x) => {
      o === a && (s.value = x, t.value = []);
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
const xi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Ci = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Mi = ["data-dc-pending"], Ei = ["data-dc-empty"], Si = ["onClick"], Pi = { class: "dc-type__name" }, Ai = { class: "dc-type__count dc-mono" }, zi = { class: "dc-type__sr" }, Ri = {
  key: 0,
  class: "dc-type__empty"
}, Ti = ["onClick"], Fi = { class: "dc-type__identity" }, Li = { class: "dc-type__primary dc-truncate" }, Di = { class: "dc-type__secondary dc-mono dc-truncate" }, Ni = { class: "dc-type__trailing dc-mono" }, Ii = { class: "dc-type__metric-value" }, Oi = { class: "dc-type__metric-label" }, Vi = {
  key: 0,
  class: "dc-type__date"
}, Ki = ["onClick"], Bi = /* @__PURE__ */ ue({
  __name: "TypeCardsView",
  setup(e) {
    const t = we(), { previews: n, pending: s, error: a } = $i({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (l) => t.isPinnedId(l)
    }), r = g(() => !t.isPristine.value);
    return (l, i) => P(a) ? (p(), _("p", xi, " Could not load results: " + T(P(a) instanceof Error ? P(a).message : "the data source failed."), 1)) : !P(n).length && P(s) ? (p(), _("p", Ci, " Running query… ")) : (p(), _("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": P(s) ? "true" : "false"
    }, [
      (p(!0), _(Y, null, oe(P(n), (o) => (p(), _("section", {
        key: o.entity.key,
        class: "dc-type",
        "data-dc-empty": o.rows.length ? "false" : "true"
      }, [
        w("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => P(t).setEntity(o.entity.key)
        }, [
          w("span", Pi, T(o.entity.label), 1),
          w("span", Ai, T(o.count), 1),
          i[0] || (i[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", zi, "Show only " + T(o.entity.label.toLowerCase()), 1)
        ], 8, Si),
        o.rows.length ? K("", !0) : (p(), _("p", Ri, T(r.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), _(Y, null, oe(o.rows, (u) => (p(), _("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (f) => P(t).activate(u.row)
          }, [
            w("span", Fi, [
              w("span", Li, T(u.parts.identity), 1),
              w("span", Di, T(u.parts.reference), 1)
            ])
          ], 8, Ti),
          w("span", Ni, [
            (p(!0), _(Y, null, oe(u.parts.metrics.slice(0, 1), (f) => (p(), ce(Vt, {
              key: f.column.key ?? f.label,
              class: "dc-type__metric",
              entry: u,
              column: f.column
            }, {
              default: gt(() => [
                w("span", Ii, T(f.text), 1),
                w("span", Oi, T(f.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), _("span", Vi, T(u.parts.updated), 1)) : K("", !0),
            pe(Kt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        o.entity.create ? (p(), _("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => P(t).create(o.entity)
        }, [
          i[1] || (i[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          De(" " + T(o.entity.create), 1)
        ], 8, Ki)) : K("", !0)
      ], 8, Ei))), 128))
    ], 8, Mi));
  }
}), fa = /* @__PURE__ */ de(Bi, [["__scopeId", "data-v-b776cfb6"]]), qi = ["data-dc-pending"], Wi = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, Ui = { class: "dc-results__detail" }, Hi = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, ji = {
  key: 3,
  class: "dc-results__state"
}, Xi = { class: "dc-results__detail" }, Gi = /* @__PURE__ */ ue({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = we(), s = {
      list: Mn,
      cards: oa,
      grid: ia,
      table: da,
      links: ca,
      preview: ua
    }, a = g(() => Us(n.query.value)), r = g(() => {
      const u = n.query.value.view, f = t.views ?? [], [h] = f;
      return h === void 0 || f.includes(u) ? u : h;
    }), l = g(() => s[r.value] ?? Mn), i = g(() => n.rows.value.length > 0), o = g(() => n.error.value !== null);
    return (u, f) => (p(), _("div", {
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      o.value ? (p(), _("p", Wi, [
        f[1] || (f[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", Ui, T(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), ce(fa, { key: 1 })) : !i.value && P(n).pending.value ? (p(), _("p", Hi, [...f[2] || (f[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (p(), ce(Fs(l.value), { key: 4 })) : (p(), _("div", ji, [
        f[3] || (f[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", Xi, T(P(n).summary.value), 1),
        P(n).isPristine.value ? K("", !0) : (p(), _("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: f[0] || (f[0] = (h) => P(n).clearFilters())
        }, T(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, qi));
  }
}), pa = /* @__PURE__ */ de(Gi, [["__scopeId", "data-v-c00573c8"]]), Yi = ["data-dc-theme"], Qi = ["data-dc-width", "data-dc-align"], Zi = { class: "dc-shell__panel" }, Ji = /* @__PURE__ */ ue({
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
    const s = e, a = n, r = sn(e, "open"), l = sn(e, "pinned"), i = Tn(), o = _t(Ns, null), u = s.route || o ? null : Ja(), f = s.route ?? o ?? u;
    je(() => u?.dispose?.());
    const h = g(() => zr({ seed: s.schema.key })), k = g(() => s.source ?? h.value), y = jr({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), $ = Xr({
      source: k,
      query: y.query,
      schema: g(() => s.schema),
      entity: y.entity,
      limit: g(() => s.limit)
    });
    ye(y.query, (m) => a("query-change", m)), ye(
      [$.pageCount, $.pending, y.query],
      () => {
        if ($.pending.value) return;
        const m = $.pageCount.value;
        y.query.value.page > m && y.setPage(m, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const x = Ls() ?? "dc-query-panel", C = W(null);
    function A() {
      r.value && (r.value = !1, Ft(() => {
        C.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const F = g(() => new Set(l.value));
    function R(m) {
      const b = new Set(F.value);
      b.has(m.id) ? b.delete(m.id) : b.add(m.id), l.value = [...b], a("toggle-pin", m);
    }
    function M(m, b) {
      y.narrow(Dr(s.schema, y.query.value, m), b?.key ?? null), a("drill", m, b);
    }
    const S = Ir({
      ...y,
      schema: g(() => s.schema),
      entities: g(() => s.schema.entities),
      rows: $.rows,
      total: $.total,
      limit: g(() => s.limit),
      offset: $.offset,
      pageCount: $.pageCount,
      pending: $.pending,
      error: $.error,
      source: k,
      previewsPerType: g(() => s.previewsPerType),
      pinnable: g(() => s.pinnable === !0),
      isPinned: (m) => F.value.has(m.id),
      isPinnedId: (m) => F.value.has(m),
      togglePin: R,
      activate: (m) => a("activate", m),
      create: (m) => a("create", m),
      drill: M
    }), D = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: y.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: A
    }), (m, b) => (p(), _("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: ze(D.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(sa, {
          ref_key: "headerRef",
          ref: C,
          expanded: r.value,
          "panel-id": P(x),
          onToggle: b[0] || (b[0] = (V) => r.value = !r.value)
        }, fs({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: gt(() => [
              qe(m.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        r.value ? (p(), _(Y, { key: 0 }, [
          w("div", {
            class: "dc-shell__scrim",
            onClick: A
          }),
          w("div", Zi, [
            pe(ra, {
              "panel-id": P(x),
              views: e.views,
              onClose: A
            }, fs({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: gt(() => [
                  qe(m.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : K("", !0)
      ], 8, Qi),
      qe(m.$slots, "results", {
        rows: P(S).rows.value,
        total: P(S).total.value,
        offset: P(S).offset.value,
        pageCount: P(S).pageCount.value,
        query: P(S).query.value,
        pending: P(S).pending.value
      }, () => [
        pe(pa, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, Yi));
  }
}), ec = /* @__PURE__ */ de(Ji, [["__scopeId", "data-v-3e1b67a5"]]), Pt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, tc = ["aria-label"], nc = ["role", "aria-label"], sc = ["data-dc-item"], ac = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, rc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], lc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, oc = { class: "dc-menu__label dc-truncate" }, ic = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, cc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, uc = /* @__PURE__ */ ue({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = W(null), l = W([]), i = W(null), o = W(null), u = W(null), f = W(!1), h = g(
      () => s.items.flatMap((m, b) => Pt(m) ? [b] : [])
    ), k = g(() => {
      const m = [{ entries: [] }];
      return s.items.forEach((b, V) => {
        b.heading ? m.push({ heading: b, entries: [] }) : m[m.length - 1]?.entries.push({ item: b, index: V });
      }), m.filter((b) => b.entries.length > 0);
    }), y = W({ x: s.at.x, y: s.at.y });
    async function $() {
      y.value = { x: s.at.x, y: s.at.y }, await Ft();
      const m = r.value?.getBoundingClientRect();
      if (!m) return;
      const b = 8;
      let V = s.at.x, te = s.at.y;
      if (V + m.width > window.innerWidth - b) {
        const ve = s.at.mirrorX === void 0 ? null : s.at.mirrorX - m.width;
        V = ve !== null && ve >= b ? ve : window.innerWidth - m.width - b;
      }
      te + m.height > window.innerHeight - b && (te = window.innerHeight - m.height - b), y.value = { x: Math.max(b, V), y: Math.max(b, te) };
    }
    const x = g(() => ({ left: `${y.value.x}px`, top: `${y.value.y}px` }));
    function C(m) {
      i.value = m, m !== null && Ft(() => l.value[m]?.focus());
    }
    function A(m, b) {
      const V = h.value;
      if (V.length === 0) return null;
      if (m === null) return b === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const te = V.indexOf(m);
      return te === -1 ? V[0] ?? null : V[(te + b + V.length) % V.length] ?? null;
    }
    function F(m, b) {
      if (!s.items[m]?.items?.length) return;
      const te = l.value[m]?.getBoundingClientRect(), ve = r.value?.getBoundingClientRect();
      !te || !ve || (u.value = { x: ve.right - 4, y: te.top - 4, mirrorX: ve.left + 4 }, o.value = m, f.value = b);
    }
    function R(m) {
      const b = o.value;
      o.value = null, u.value = null, m && b !== null && C(b);
    }
    function M(m) {
      const b = s.items[m];
      if (!(!b || !Pt(b))) {
        if (b.items?.length) {
          F(m, !0);
          return;
        }
        a("choose", b);
      }
    }
    function S(m) {
      const b = m.key;
      if (b === "Escape") {
        m.preventDefault(), m.stopPropagation(), o.value !== null ? R(!0) : a("dismiss");
        return;
      }
      if (b === "ArrowDown" || b === "ArrowUp") {
        m.preventDefault(), m.stopPropagation(), R(!1), C(A(i.value, b === "ArrowDown" ? 1 : -1));
        return;
      }
      if (b === "Home" || b === "End") {
        m.preventDefault(), m.stopPropagation(), R(!1), C(A(null, b === "Home" ? 1 : -1));
        return;
      }
      if (b === "ArrowRight") {
        const V = i.value;
        V !== null && s.items[V]?.items?.length && (m.preventDefault(), m.stopPropagation(), F(V, !0));
        return;
      }
      if (b === "ArrowLeft") {
        o.value !== null && (m.preventDefault(), m.stopPropagation(), R(!0));
        return;
      }
      if (b === "Enter" || b === " ") {
        const V = i.value;
        if (V === null) return;
        m.preventDefault(), m.stopPropagation(), M(V);
      }
    }
    function D(m) {
      const b = s.items[m];
      !b || !Pt(b) || (o.value !== null && o.value !== m && R(!1), C(m), b.items?.length && F(m, !1));
    }
    return Ya(() => {
      $(), s.autofocus && C(A(null, 1));
    }), ye(() => s.at, $, { deep: !0 }), ye(() => s.items, () => void $(), { deep: !0 }), je(() => {
      o.value = null;
    }), t({ root: r }), (m, b) => {
      const V = Ds("MenuList", !0);
      return p(), _("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: ze(x.value),
        onKeydown: S
      }, [
        (p(!0), _(Y, null, oe(k.value, (te, ve) => (p(), _("div", {
          key: `${ve}-${te.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: te.heading ? "group" : "none",
          "aria-label": te.heading?.label
        }, [
          te.heading ? (p(), _("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": te.heading.id
          }, T(te.heading.label), 9, sc)) : K("", !0),
          (p(!0), _(Y, null, oe(te.entries, ({ item: Z, index: Ce }) => (p(), _(Y, {
            key: Z.id ?? `${Ce}-${Z.label ?? ""}`
          }, [
            Z.separator ? (p(), _("div", ac)) : (p(), _("button", {
              key: 1,
              ref_for: !0,
              ref: (Pe) => {
                Pe && (l.value[Ce] = Pe);
              },
              type: "button",
              class: "dc-menu__item",
              role: Z.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Z.checked === void 0 ? void 0 : Z.checked,
              "aria-haspopup": Z.items?.length ? "menu" : void 0,
              "aria-expanded": Z.items?.length ? o.value === Ce : void 0,
              "aria-disabled": Z.disabled ? "true" : void 0,
              disabled: Z.disabled,
              "data-dc-item": Z.id,
              tabindex: "-1",
              onClick: (Pe) => M(Ce),
              onMouseenter: (Pe) => D(Ce)
            }, [
              w("span", lc, T(Z.checked ? "✓" : ""), 1),
              w("span", oc, T(Z.label), 1),
              Z.shortcut ? (p(), _("span", ic, T(Z.shortcut), 1)) : Z.items?.length ? (p(), _("span", cc, "›")) : K("", !0)
            ], 40, rc))
          ], 64))), 128))
        ], 8, nc))), 128)),
        o.value !== null && u.value ? (p(), ce(V, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: u.value,
          label: e.items[o.value]?.label,
          autofocus: f.value,
          onChoose: b[0] || (b[0] = (te) => a("choose", te)),
          onDismiss: b[1] || (b[1] = (te) => R(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : K("", !0)
      ], 44, tc);
    };
  }
}), va = /* @__PURE__ */ de(uc, [["__scopeId", "data-v-9b1413fa"]]), dc = ["data-dc-theme", "aria-label"], fc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], pc = /* @__PURE__ */ ue({
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
    }), a = t, r = W(null), l = W([]), i = W(null), o = W(null), u = W(!1), f = g(
      () => n.menus.flatMap((M, S) => Pt(M) ? [S] : [])
    );
    function h(M, S) {
      const D = l.value[M]?.getBoundingClientRect(), m = n.menus[M];
      !D || !m || !Pt(m) || (o.value = { x: D.left, y: D.bottom + 2, mirrorX: D.right }, i.value = M, u.value = S);
    }
    function k(M) {
      const S = i.value;
      i.value = null, o.value = null, M && S !== null && l.value[S]?.focus();
    }
    function y(M) {
      i.value === M ? k(!0) : h(M, !1);
    }
    function $(M) {
      i.value === null || i.value === M || h(M, !1);
    }
    function x(M, S) {
      const D = f.value;
      if (D.length === 0) return null;
      if (M === null) return S === 1 ? D[0] ?? null : D[D.length - 1] ?? null;
      const m = D.indexOf(M);
      return m === -1 ? D[0] ?? null : D[(m + S + D.length) % D.length] ?? null;
    }
    function C(M) {
      const S = M.key;
      if (S === "Escape") {
        if (i.value === null) return;
        M.preventDefault(), k(!0);
        return;
      }
      if (S === "ArrowDown" && i.value === null) {
        const b = A();
        if (b === null) return;
        M.preventDefault(), h(b, !0);
        return;
      }
      if (S !== "ArrowLeft" && S !== "ArrowRight") return;
      const D = i.value ?? A(), m = x(D, S === "ArrowRight" ? 1 : -1);
      m !== null && (M.preventDefault(), i.value !== null ? h(m, !0) : l.value[m]?.focus());
    }
    function A() {
      const M = l.value.findIndex((S) => S === document.activeElement);
      return M === -1 ? f.value[0] ?? null : M;
    }
    function F(M) {
      const S = M.target;
      !S || r.value?.contains(S) || k(!1);
    }
    ye(i, (M) => {
      M !== null ? window.addEventListener("pointerdown", F, !0) : window.removeEventListener("pointerdown", F, !0);
    }), je(() => window.removeEventListener("pointerdown", F, !0));
    function R(M) {
      k(!0), M.action?.(), a("choose", M);
    }
    return (M, S) => (p(), _("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: ze(s.value),
      onKeydown: C
    }, [
      (p(!0), _(Y, null, oe(e.menus, (D, m) => (p(), _("button", {
        key: D.id ?? D.label ?? m,
        ref_for: !0,
        ref: (b) => {
          b && (l.value[m] = b);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === m,
        "aria-disabled": D.disabled ? "true" : void 0,
        disabled: D.disabled,
        "data-dc-menu": D.id ?? D.label,
        tabindex: m === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (b) => y(m),
        onMouseenter: (b) => $(m)
      }, T(D.label), 41, fc))), 128)),
      i.value !== null && o.value ? (p(), ce(va, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: R,
        onDismiss: S[0] || (S[0] = (D) => k(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : K("", !0)
    ], 44, dc));
  }
}), Ku = /* @__PURE__ */ de(pc, [["__scopeId", "data-v-93dbd2e4"]]), vc = ["aria-label", "aria-expanded", "disabled"], mc = { "aria-hidden": "true" }, hc = /* @__PURE__ */ ue({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = W(null), a = W(null), r = W(null), l = W(!1), i = g(() => r.value !== null);
    function o($) {
      const x = s.value?.getBoundingClientRect();
      x && (r.value = { x: x.left, y: x.bottom + 4, mirrorX: x.right }, l.value = $);
    }
    function u($) {
      r.value = null, $ && s.value?.focus();
    }
    function f() {
      i.value ? u(!0) : o(!1);
    }
    function h($) {
      $.key !== "ArrowDown" || i.value || ($.preventDefault(), o(!0));
    }
    function k($) {
      const x = $.target;
      x && (s.value?.contains(x) || a.value?.root?.contains(x) || u(!1));
    }
    ye(i, ($) => {
      $ ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), je(() => window.removeEventListener("pointerdown", k, !0));
    function y($) {
      u(!0), $.action?.(), n("choose", $);
    }
    return ($, x) => (p(), _(Y, null, [
      w("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: h
      }, [
        w("span", mc, T(e.glyph), 1)
      ], 40, vc),
      r.value ? (p(), ce(va, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: l.value,
        onChoose: y,
        onDismiss: x[0] || (x[0] = (C) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : K("", !0)
    ], 64));
  }
}), Un = /* @__PURE__ */ de(hc, [["__scopeId", "data-v-48f5ada5"]]), kt = (e) => e.kind === "split", q = (e) => e.kind === "group", X = (e) => e.kind === "float", lt = { x: 16, y: 16, w: 360, h: 260 }, ln = 28, ma = 120, En = 220, ha = 38, dt = 6;
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
function Bu(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ie = (e) => typeof e == "string", Hn = (e) => ie(e) ? Ne(e) : e, qt = (e) => ie(e) ? [e] : Xe(e), xs = (e) => e.panels.filter(ie), _c = (e) => e.panels.filter((t) => !ie(t)), Se = (e, t) => e.panels.includes(t);
function Wt(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (ie(r) || !ee(r, t)) return r;
    const l = n(r);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, panels: a } : e;
}
function cn(e, t) {
  return { node: e, rect: { ...lt, ...t } };
}
function jn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Xn(e, t) {
  const n = { ...lt, ...t };
  return jn(
    e.map(
      (s, a) => cn(s, {
        ...n,
        x: n.x + a * ln,
        y: n.y + a * ln
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
const Yn = (e, t, n) => Gn("row", e, t, n), qu = (e, t, n) => Gn("column", e, t, n);
function he(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Wu = (e) => ({ ...e, headless: !0 }), Uu = (e) => ({ ...e, fixedView: !0 }), gc = (e) => e === "left" || e === "right" ? "row" : "column";
function Xe(e) {
  return q(e) ? e.panels.flatMap(qt) : X(e) ? e.frames.flatMap((t) => Xe(t.node)) : e.children.flatMap(Xe);
}
function ee(e, t) {
  return q(e) ? e.panels.some((n) => ie(n) ? n === t : ee(n, t)) : X(e) ? e.frames.some((n) => ee(n.node, t)) : e.children.some((n) => ee(n, t));
}
const _a = (e) => Xe(e).length === 0, Sn = (e) => !q(e) && ct(e), Pn = (e) => _a(e) && !Sn(e);
function un(e) {
  return kt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : X(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ie(t) ? [] : [{ node: t, index: n }]);
}
const Qn = (e) => un(e).map((t) => t.node);
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
function ga(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && ie(t) ? t : "";
}
function $e(e) {
  if (ie(e)) return e;
  if (q(e)) {
    const n = e.panels[ut(e)];
    return n === void 0 ? "" : $e(n);
  }
  if (X(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? $e(n.node) : "";
  }
  const t = e.children[0];
  return t ? $e(t) : "";
}
function pt(e, t) {
  if (q(e) && Se(e, t)) return e;
  for (const n of Qn(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function yc(e) {
  const t = Qn(e).flatMap(yc);
  return q(e) ? [e, ...t] : t;
}
function ge(e, t) {
  if (q(e)) {
    for (const n of _c(e)) {
      const s = ge(n, t);
      if (s) return s;
    }
    return null;
  }
  if (X(e)) {
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
function _n(e, t, n = ma) {
  const s = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), a = s(e.w, t.w), r = s(e.h, t.h), l = (i, o, u) => Math.min(Math.max(i, 0), Math.max(u - o, 0));
  return {
    x: Math.round(l(e.x, a, t.w)),
    y: Math.round(l(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function Cs(e, t, n, s, a = ma) {
  let { x: r, y: l, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (o = e.h + s), t.includes("n") && (o = e.h - s, l = e.y + s), i < a && (t.includes("w") && (r = e.x + e.w - a), i = a), o < a && (t.includes("n") && (l = e.y + e.h - a), o = a), { x: r, y: l, w: i, h: o };
}
const ya = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (q(e)) return Wt(e, t, (r) => vt(r, t, n));
  if (X(e)) {
    let r = !1;
    const l = e.frames.map((i) => {
      if (!ee(i.node, t)) return i;
      if (ge(i.node, t)) {
        const u = vt(i.node, t, n);
        return u === i.node ? i : (r = !0, { ...i, node: u });
      }
      const o = n(i);
      return o === i ? i : (r = !0, o);
    });
    return r ? { ...e, frames: l } : e;
  }
  if (!ee(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const l = vt(r, t, n);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, children: a } : e;
}
function wc(e, t, n) {
  return vt(e, t, (s) => ya(s.rect, n) ? s : { ...s, rect: n });
}
const et = (e) => e.maximized === !0, wa = (e) => (t) => {
  if (et(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function bc(e, t, n = !0) {
  return vt(e, t, wa(n));
}
function Hu(e, t) {
  const n = ge(e, t);
  return n ? bc(e, t, !et(n)) : e;
}
const rt = (e) => e.minimized === !0, ba = (e) => (t) => {
  if (rt(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function kc(e, t, n = !0) {
  return vt(e, t, ba(n));
}
function ju(e, t) {
  const n = ge(e, t);
  return n ? kc(e, t, !rt(n)) : e;
}
function at(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = tt(e, t.slice(0, -1));
  return !s || !X(s) ? null : s.frames[n] ?? null;
}
function An(e, t) {
  if (X(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ee(s.node, t)) continue;
      const a = An(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of un(e)) {
    if (!ee(n, t)) continue;
    const a = An(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function Zn(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = tt(e, a);
  if (!r || !X(r)) return e;
  const l = r.frames[s];
  if (!l) return e;
  const i = n(l);
  if (i === l) return e;
  const o = [...r.frames];
  return o[s] = i, it(e, a, { ...r, frames: o });
}
function Ms(e, t, n) {
  return Zn(
    e,
    t,
    (s) => ya(s.rect, n) ? s : { ...s, rect: n }
  );
}
function $c(e, t, n = !0) {
  return Zn(e, t, wa(n));
}
function xc(e, t, n = !0) {
  return Zn(e, t, ba(n));
}
function At(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (X(e)) {
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
function Cc(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (X(s) && (n[r] = s.frames.length - 1), s = tt(s, [a]));
  }), n;
}
function Jt(e, t, n, s) {
  if (q(e)) return Wt(e, n, (l) => Jt(l, t, n, s));
  if (X(e)) {
    const l = e.frames.findIndex((o) => ee(o.node, n)), i = e.frames[l];
    if (!i) return e;
    if (ge(i.node, n)) {
      const o = Jt(i.node, t, n, s);
      if (o === i.node) return e;
      const u = [...e.frames];
      return u[l] = { ...i, node: o }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, cn(Ne(t), s)] };
  }
  if (!ee(e, n)) return e;
  let a = !1;
  const r = e.children.map((l) => {
    const i = Jt(l, t, n, s);
    return i !== l && (a = !0), i;
  });
  return a ? { ...e, children: r } : e;
}
function Es(e, t, n, s) {
  if (t === n || !ee(e, t) || !ee(e, n) || !ge(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const r = Jt(a, t, n, s);
  return r === a ? e : _e(r);
}
function Mc(e, t, n) {
  return X(e) ? { ...e, frames: [...e.frames, cn(Ne(t), n)] } : q(e) ? $a(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ne(t)],
    sizes: [...He(e), 1],
    ...he(e)
  };
}
function ka(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return Mc(e, t, s);
  const r = n.slice(1), l = (f, h) => h === a ? ka(f, t, r, s) : ot(f, t);
  if (X(e)) {
    const f = e.frames.flatMap((h, k) => {
      const y = l(h.node, k);
      return y ? [y === h.node ? h : { ...h, node: y }] : [];
    });
    return { ...e, frames: f };
  }
  if (q(e)) {
    const f = ut(e), h = [];
    e.panels.forEach(($, x) => {
      if (ie($)) {
        $ !== t && h.push($);
        return;
      }
      const C = l($, x);
      C && h.push(C);
    });
    const y = e.active && h.some(($) => qt($).includes(e.active)) ? e.active : $e(h[f] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...y ? { active: y } : {},
      ...he(e)
    };
  }
  const i = He(e), o = [], u = [];
  return e.children.forEach((f, h) => {
    const k = l(f, h);
    k && (o.push(k), u.push(i[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: u, ...he(e) };
}
function Ss(e, t, n, s) {
  const a = tt(e, n);
  return !a || !_a(a) || !ee(e, t) ? e : _e(ka(e, t, n, s));
}
function gn(e, t) {
  if (q(e)) return Wt(e, t, (a) => gn(a, t));
  if (X(e)) {
    const a = e.frames.findIndex((u) => ee(u.node, t)), r = e.frames[a];
    if (!r) return e;
    const l = gn(r.node, t), i = l === r.node ? r : { ...r, node: l };
    if (a === e.frames.length - 1 && i === r) return e;
    const o = [...e.frames];
    return o.splice(a, 1), o.push(i), { ...e, frames: o };
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = gn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Jn(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, l) => r + l, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const He = (e) => Jn(e.children.length, e.sizes), Re = (e) => {
  const t = q(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function _e(e) {
  if (q(e)) return Ec(e);
  if (X(e)) {
    const i = e.frames.flatMap((o) => {
      const u = _e(o.node);
      return Pn(u) ? [] : [u === o.node ? o : { ...o, node: u }];
    });
    return i.length === e.frames.length && i.every((o, u) => o === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = He(e), n = Re(e), s = [], a = [], r = [];
  e.children.forEach((i, o) => {
    const u = _e(i), f = t[o] ?? 0;
    if (Pn(u)) return;
    if (!n && kt(u) && u.direction === e.direction && !Re(u) && !ct(u)) {
      const k = He(u);
      u.children.forEach((y, $) => {
        s.push(y), a.push(f * (k[$] ?? 0));
      });
      return;
    }
    s.push(u), a.push(f);
    const h = n?.[o];
    h && r.push(h);
  });
  const l = s[0];
  return s.length === 1 && l && !ct(e) ? l : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: Jn(s.length, a),
    ...he(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function Ec(e) {
  if (e.panels.every(ie)) return e;
  const t = $e(e), n = Re(e), s = [], a = [];
  e.panels.forEach((i, o) => {
    const u = n?.[o];
    if (ie(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const f = _e(i);
    if (!Pn(f)) {
      if (q(f) && !ct(f) && !Re(f)) {
        s.push(...f.panels);
        return;
      }
      s.push(f), u && a.push(u);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !ie(r) && !ct(e))
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
  if (X(e)) {
    const l = e.frames.flatMap((i) => {
      const o = ot(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return l.length === 0 && !Sn(e) ? null : { ...e, frames: l };
  }
  if (q(e)) {
    if (!ee(e, t)) return e;
    const l = ut(e), i = [];
    for (const f of e.panels) {
      if (ie(f)) {
        f !== t && i.push(f);
        continue;
      }
      const h = ot(f, t);
      h && i.push(h);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((f) => qt(f).includes(e.active)) ? e.active : $e(i[l] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...he(e) } : { kind: "group", panels: i, ...he(e) };
  }
  const n = He(e), s = [], a = [];
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
function $a(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...he(e) };
}
function Et(e, t, n, s, a) {
  const r = (y) => Bt(
    y,
    ($) => ee($, n) ? Et($, t, n, s, a) : $
  );
  if (s === "float") return e;
  const l = (y) => Wt(y, n, ($) => Et($, t, n, s, a));
  if (s === "center")
    return q(e) ? Se(e, n) ? $a(e, t, a) : l(e) : X(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (y) => ee(y, n) ? Et(y, t, n, s, a) : y
      )
    };
  const i = gc(s), o = s === "left" || s === "top", u = (y) => ({
    kind: "split",
    direction: i,
    children: o ? [Ne(t), y] : [y, Ne(t)],
    sizes: [0.5, 0.5]
  });
  if (q(e)) return Se(e, n) ? u(e) : l(e);
  if (X(e)) return r(e);
  const f = He(e), h = e.children.findIndex(
    (y) => q(y) && Se(y, n)
  );
  if (h >= 0 && e.direction === i) {
    const y = (f[h] ?? 0) / 2, $ = [...e.children], x = [...f];
    return $.splice(o ? h : h + 1, 0, Ne(t)), x.splice(h, 1, y, y), {
      kind: "split",
      direction: i,
      children: $,
      sizes: x,
      ...he(e)
    };
  }
  const k = e.children.map((y) => ee(y, n) ? q(y) && Se(y, n) ? u(y) : Et(y, t, n, s) : y);
  return {
    kind: "split",
    direction: e.direction,
    children: k,
    sizes: f,
    ...he(e)
  };
}
function mt(e, t) {
  if (q(e)) {
    if (Se(e, t))
      return ga(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((o) => !ie(o) && ee(o, t)), r = e.panels[a];
    if (r === void 0 || ie(r)) return e;
    const l = mt(r, t);
    if (l === r && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = l, { ...e, panels: i, active: t };
  }
  if (!ee(e, t)) return e;
  if (X(e)) return Bt(e, (a) => mt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = mt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function zt(e, t, n) {
  if (q(e)) {
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
  return ee(e, t) ? X(e) ? Bt(e, (s) => zt(s, t, n)) : { ...e, children: e.children.map((s) => zt(s, t, n)) } : e;
}
function en(e, t, n) {
  if (t === n) return e;
  if (q(e)) {
    if (!ee(e, t) && !ee(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => ie(r) ? s(r) : en(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return X(e) ? Bt(e, (s) => en(s, t, n)) : { ...e, children: e.children.map((s) => en(s, t, n)) };
}
function Gt(e, t, n, s, a) {
  if (s === "float" || !ee(e, t) || !ee(e, n)) return e;
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
function xa(e, t, n) {
  if (q(e)) {
    const a = e.panels[t];
    if (a === void 0 || ie(a)) return e;
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
function Ut(e, t, n) {
  const s = un(e);
  if (!q(e) && s.some(({ node: a }) => q(a) && Se(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!ee(a, t)) continue;
    const l = Ut(a, t, n);
    return l ? xa(e, r, l) : null;
  }
  return null;
}
function Xu(e, t, n) {
  const s = Ut(
    e,
    t,
    (a) => kt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? _e(s) : e;
}
function Ca(e) {
  return X(e) ? [e] : Re(e) || ct(e) ? [e] : q(e) ? [...e.panels] : e.children.flatMap(Ca);
}
function Ma(e, t) {
  if (q(e)) return e;
  const n = Qn(e).map(Ca), s = n.flat(), a = t && s.some((l) => qt(l).includes(t)) ? t : void 0, r = Sc(e, n);
  return _e({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...he(e),
    ...r ? { places: r } : {}
  });
}
function Sc(e, t) {
  const n = X(e) ? e.frames.map(({ node: s, ...a }) => a) : Re(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Pc(e, t) {
  const n = Ut(e, t, (s) => Ma(s, t));
  return n ? _e(n) : e;
}
function es(e, t, n) {
  if (q(e) && Se(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of un(e)) {
    if (!ee(s, t)) continue;
    const r = es(s, t, n);
    return r ? xa(e, a, r) : null;
  }
  return null;
}
function Ps(e, t, n) {
  const s = es(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = Re(a);
    return {
      ...Gn(n, a.panels.map(Hn)),
      ...he(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? _e(s) : e;
}
function zn(e, t) {
  if (q(e)) return e;
  if (X(e)) {
    const a = e.frames.findIndex(
      (i) => q(i.node) && i.node.panels.includes(t)
    ), r = e.frames[a], l = r && q(r.node) ? r.node : null;
    if (r && l && l.panels.length > 1) {
      const i = Xn(l.panels.map(Hn), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return Bt(e, (i) => zn(i, t));
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = zn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Ac(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (ge(e, t)?.node === s) {
    const l = zn(e, t);
    return l === e ? e : _e(l);
  }
  const r = es(e, t, (l) => ({
    ...jn(Ea(l.panels.map(Hn), Re(l), n)),
    ...he(l)
  }));
  return r ? _e(r) : e;
}
function Ea(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Xn(e, n).frames;
}
function Sa(e, t) {
  return { ...jn(Ea(e.children, Re(e), t)), ...he(e) };
}
function Gu(e, t, n) {
  const s = Ut(
    e,
    t,
    (a) => X(a) ? a : Sa(a, n)
  );
  return s ? _e(s) : q(e) && Se(e, t) ? Xn([e], n) : e;
}
function zc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function Pa(e, t) {
  const n = zc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...he(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Yu(e, t, n = "row") {
  const s = Ut(
    e,
    t,
    (a) => X(a) ? Pa(a, n) : a
  );
  return s ? _e(s) : e;
}
function Aa(e) {
  if (X(e)) return null;
  const t = q(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ie(t) || q(t) && t.panels.length === 1 && ie(t.panels[0]) ? null : t;
}
const Rc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Tc(e, t) {
  const n = Aa(e);
  return n ? t === "inner" ? n : { ...Rc(n), ...he(e) } : e;
}
function wt(e) {
  return e.title ? e.title : q(e) ? "" : X(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Rt(e, t) {
  if (q(e)) {
    const s = e.panels[ut(e)];
    return s === void 0 ? "" : ie(s) ? t(s) ?? s : wt(s) || Rt(s, t);
  }
  if (e.title) return e.title;
  if (X(e)) {
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
    else if (X(n)) n = n.frames[s]?.node;
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
  if (X(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const u = it(o.node, a, n);
    if (u === o.node) return e;
    const f = [...e.frames];
    return f[s] = { ...o, node: u }, { ...e, frames: f };
  }
  if (q(e)) {
    const o = e.panels[s];
    if (o === void 0 || ie(o)) return e;
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
    return kt(e) ? { ...e, sizes: Jn(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (X(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const o = tn(i.node, a, n);
    if (o === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: o }, { ...e, frames: u };
  }
  if (q(e)) {
    const i = e.panels[s];
    if (i === void 0 || ie(i)) return e;
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
function As(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const l = a + r;
  if (l < s * 2) return e;
  const i = [...e], o = Math.min(Math.max(a + n, s), l - s);
  return i[t] = o, i[t + 1] = l - o, i;
}
function on(e) {
  if (!q(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ie(t) ? e : { ...Yn([Fc(e)]), ...he(e) };
}
const Fc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function zs(e) {
  return e.length === 0 ? null : Yn(e.map(Ne));
}
function Lc(e, t) {
  if (!e) return zs(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const o of Xe(e))
    !n.has(o) || s.has(o) ? a.add(o) : s.add(o);
  let r = e;
  for (const o of a)
    r = r ? ot(r, o) : null;
  const l = new Set(r ? Xe(r) : []), i = t.filter((o) => !l.has(o));
  if (i.length === 0) return r ? on(_e(r)) : null;
  if (!r) return zs(i);
  if (X(r)) {
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
  return on(_e(Yn([r, ...i.map(Ne)])));
}
const ts = Symbol("dc.windowContext");
function Dc(e) {
  return Rn(ts, e), e;
}
function ns() {
  const e = _t(ts, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Nc = ["data-dc-glyph"], Ic = { class: "dc-glyph__line" }, Oc = ["d"], Vc = {
  key: 0,
  class: "dc-glyph__aqua"
}, Kc = ["d"], Bc = /* @__PURE__ */ ue({
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
      w("g", Ic, [
        (p(!0), _(Y, null, oe(t[e.kind], (r) => (p(), _("path", {
          key: r,
          d: r
        }, null, 8, Oc))), 128))
      ]),
      n[e.kind] ? (p(), _("g", Vc, [
        (p(!0), _(Y, null, oe(n[e.kind], (r) => (p(), _("path", {
          key: r,
          d: r
        }, null, 8, Kc))), 128))
      ])) : K("", !0)
    ], 8, Nc));
  }
}), ht = /* @__PURE__ */ de(Bc, [["__scopeId", "data-v-4d2872c0"]]), qc = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Wc = ["data-dc-movable"], Uc = { class: "dc-float__title dc-truncate" }, Hc = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, jc = ["aria-label", "aria-pressed", "data-dc-minimize"], Xc = ["aria-label", "aria-pressed", "data-dc-maximize"], Gc = ["aria-label", "data-dc-close"], Yc = { class: "dc-float__content" }, Qc = ["data-dc-handle", "onPointerdown"], Zc = /* @__PURE__ */ ue({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ns(), s = g(() => $e(t.frame.node)), a = g(() => n.panelFor(s.value)?.fixed === !0), r = g(() => et(t.frame)), l = g(() => rt(t.frame)), i = g(() => r.value || l.value), o = g(() => n.resizable.value && !a.value && !i.value), u = g(() => n.movable.value && !a.value && !i.value), f = g(() => {
      const S = Xe(t.frame.node);
      return S.length === 1 ? S[0] ?? null : null;
    }), h = g(() => f.value !== null && n.closable(f.value)), k = g(() => t.frame.node.headless === !0), y = g(
      () => !k.value && (!q(t.frame.node) || l.value)
    ), $ = g(
      () => t.frame.title || wt(t.frame.node) || Rt(t.frame.node, (S) => n.panelFor(S)?.title)
    ), x = g(() => n.spaceMenu(t.path));
    function C(S) {
      S.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, S, "move");
    }
    function A(S) {
      S.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const F = g(() => {
      const S = n.framing.value;
      return S !== null && ee(t.frame.node, S);
    }), R = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${En}px`,
        height: `${ha}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), M = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (S, D) => (p(), _("div", {
      class: "dc-float",
      style: ze(R.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": l.value ? "true" : "false",
      "data-dc-dragging": F.value ? "true" : "false",
      onPointerdown: D[3] || (D[3] = (m) => P(n).raiseAt(e.path))
    }, [
      y.value ? (p(), _("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: C,
        onDblclick: A
      }, [
        w("span", Uc, T($.value), 1),
        x.value.length ? (p(), ce(Un, {
          key: 0,
          items: x.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : K("", !0),
        !a.value || l.value && h.value && f.value ? (p(), _("div", Hc, [
          a.value ? K("", !0) : (p(), _("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Unroll" : "Minimize"} ${$.value}`,
            "aria-pressed": l.value,
            "data-dc-minimize": s.value,
            onClick: D[0] || (D[0] = (m) => P(n).toggleMinimizeAt(e.path))
          }, [
            pe(ht, {
              kind: l.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, jc)),
          a.value ? K("", !0) : (p(), _("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${$.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: D[1] || (D[1] = (m) => P(n).toggleMaximizeAt(e.path))
          }, [
            pe(ht, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Xc)),
          l.value && h.value && f.value ? (p(), _("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": f.value,
            onClick: D[2] || (D[2] = (m) => P(n).close(f.value))
          }, [
            pe(ht, { kind: "close" })
          ], 8, Gc)) : K("", !0)
        ])) : K("", !0)
      ], 40, Wc)) : K("", !0),
      w("div", Yc, [
        qe(S.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), _(Y, null, oe(o.value ? M : [], (m) => (p(), _("span", {
        key: m,
        class: "dc-float__grip",
        "data-dc-handle": m,
        "aria-hidden": "true",
        onPointerdown: Le((b) => P(n).beginFrameDragAt(e.path, b, m), ["stop"])
      }, null, 40, Qc))), 128))
    ], 44, qc));
  }
}), Jc = /* @__PURE__ */ de(Zc, [["__scopeId", "data-v-f035684c"]]), ss = Symbol("dc.paneContext");
function eu(e) {
  return Rn(ss, e), e;
}
function Qu() {
  return _t(ss, null);
}
function Zu(e) {
  const t = _t(ts, null), n = _t(ss, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Mt(e)
  );
  return Qa() && Ts(s), s;
}
const tu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], nu = ["data-dc-movable"], su = ["aria-label", "aria-pressed"], au = ["data-dc-space-name"], ru = { class: "dc-truncate" }, lu = ["aria-label"], ou = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, iu = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], cu = { class: "dc-tab__name dc-truncate" }, uu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, du = ["aria-label", "data-dc-close", "onClick"], fu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, pu = { class: "dc-pane__tools" }, vu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, mu = ["aria-label", "data-dc-minimize"], hu = ["aria-label", "aria-pressed", "data-dc-maximize"], _u = ["aria-label", "data-dc-close"], gu = ["id", "role", "aria-labelledby"], yu = ["id", "role", "aria-labelledby"], wu = ["data-dc-edge"], bu = /* @__PURE__ */ ue({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ns(), s = Ls() ?? "dc-pane", a = g(
      () => t.group.panels.flatMap((N, B) => {
        if (!ie(N)) {
          const xe = wt(N) || Rt(N, (be) => n.panelFor(be)?.title);
          return [{ kind: "space", index: B, id: `space-${B}`, title: xe, node: N }];
        }
        const Q = n.panelFor(N);
        return Q ? [{ kind: "panel", index: B, id: N, title: Q.title, panel: Q }] : [];
      })
    ), r = g(() => a.value.length > 1), l = g(() => {
      const N = ut(t.group);
      return a.value.find((B) => B.index === N) ?? a.value[0] ?? null;
    }), i = g(() => l.value?.kind === "space" ? l.value.node : null), o = g(() => i.value ? "" : ga(t.group)), u = g(() => i.value ? null : n.panelFor(o.value)), f = g(() => l.value?.title ?? ""), h = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), k = g(() => [...t.path, l.value?.index ?? 0]), y = g(() => o.value || xs(t.group)[0] || ""), $ = g(() => n.viewFor(o.value)), x = g(() => t.group.headless === !0), C = g(() => n.focused.value === o.value), A = g(() => n.dragging.value === o.value), F = g(() => n.moving.value === o.value), R = g(() => n.frameOf(y.value) !== null), M = g(() => n.panelFor(y.value)?.fixed === !0), S = g(
      () => !i.value && (n.canMove(o.value) || R.value && n.movable.value && !M.value)
    ), D = g(
      () => i.value ? n.spaceMenu(k.value) : n.menuFor(o.value)
    ), m = (N) => n.closable(N);
    eu({ panel: o });
    const b = g(() => n.maximized(y.value)), V = g(
      () => R.value && !M.value || !r.value && !!u.value && m(u.value.id)
    ), te = (N) => `${s}-tab-${N}`, ve = g(() => `${s}-body`), Z = g(() => {
      const N = n.dropTarget.value;
      return !N || !Se(t.group, N.panel) || N.edge === "float" ? null : N;
    }), Ce = g(() => Z.value?.index === void 0 ? Z.value?.edge ?? null : null), Pe = g(() => Z.value?.index ?? null), I = () => u.value ? n.renderContent(u.value, $.value, C.value) ?? null : null, G = () => u.value ? n.renderActions(u.value, $.value, C.value) ?? null : null;
    let ne = null;
    function se(N) {
      const B = ne !== null && Math.hypot(N.clientX - ne.x, N.clientY - ne.y) >= 4;
      return ne = null, B;
    }
    const me = (N) => N.kind === "panel" ? N.id : $e(N.node);
    function Me(N, B) {
      B.kind !== "space" && (n.focus(B.id), ne = { x: N.clientX, y: N.clientY }, n.beginDrag(B.id, N));
    }
    function Ge(N, B) {
      if (se(N)) return;
      const Q = me(B);
      Q && n.selectPanel(Q);
    }
    function Ye(N) {
      o.value && n.focus(o.value), !N.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (R.value ? n.beginFrameDrag(y.value, N, "move") : n.beginDrag(o.value, N));
    }
    function Qe(N) {
      ne = { x: N.clientX, y: N.clientY }, n.beginDrag(o.value, N);
    }
    function Ze(N) {
      se(N) || n.toggleMoveMode(o.value);
    }
    const Ie = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Oe(N) {
      if (!F.value) return;
      if (N.key === "Escape") {
        N.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const B = Ie[N.key];
      B && (N.preventDefault(), R.value ? n.nudgeFrame(o.value, B, N.shiftKey) : n.nudge(o.value, B, N.shiftKey));
    }
    function Ve(N) {
      !R.value || N.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(y.value);
    }
    function $t(N, B) {
      N.stopPropagation(), ne = null, n.close(B);
    }
    function Ht(N, B) {
      const Q = a.value.length;
      let xe = null;
      if (N.key === "ArrowRight" ? xe = (B + 1) % Q : N.key === "ArrowLeft" ? xe = (B - 1 + Q) % Q : N.key === "Home" ? xe = 0 : N.key === "End" && (xe = Q - 1), xe === null) return;
      N.preventDefault();
      const be = a.value[xe];
      if (!be) return;
      const xt = me(be);
      xt && n.selectPanel(xt);
    }
    return (N, B) => l.value ? (p(), _("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": P(xs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": R.value ? "true" : "false",
      "data-dc-maximized": b.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": C.value ? "true" : "false",
      "data-dc-dragging": A.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: B[7] || (B[7] = (Q) => o.value && P(n).focus(o.value))
    }, [
      x.value ? K("", !0) : (p(), _("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": S.value ? "true" : "false",
        onPointerdown: Ye,
        onDblclick: Ve
      }, [
        S.value ? (p(), _("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": F.value,
          onPointerdown: Qe,
          onClick: Ze,
          onKeydown: Oe
        }, [...B[8] || (B[8] = [
          w("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, su)) : K("", !0),
        h.value ? (p(), _("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          w("span", ru, T(h.value), 1)
        ], 8, au)) : K("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (p(!0), _(Y, null, oe(a.value, (Q, xe) => (p(), _(Y, {
            key: Q.id
          }, [
            Pe.value === xe ? (p(), _("span", ou)) : K("", !0),
            w("button", {
              id: te(Q.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": Q.kind === "panel" ? Q.id : void 0,
              "data-dc-space": Q.kind === "space" ? Q.title : void 0,
              "aria-selected": Q.index === l.value.index,
              "aria-controls": ve.value,
              tabindex: Q.index === l.value.index ? 0 : -1,
              onPointerdown: (be) => Me(be, Q),
              onClick: (be) => Ge(be, Q),
              onKeydown: (be) => Ht(be, xe)
            }, [
              w("span", cu, T(Q.title), 1),
              Q.kind === "panel" && Q.panel.subtitle ? (p(), _("span", uu, T(Q.panel.subtitle), 1)) : K("", !0),
              r.value && Q.kind === "panel" && m(Q.id) ? (p(), _("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${Q.title}`,
                "data-dc-close": Q.id,
                onPointerdown: B[0] || (B[0] = Le(() => {
                }, ["stop"])),
                onClick: (be) => $t(be, Q.id)
              }, [...B[9] || (B[9] = [
                w("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, du)) : K("", !0)
            ], 40, iu)
          ], 64))), 128)),
          Pe.value === a.value.length ? (p(), _("span", fu)) : K("", !0)
        ], 8, lu),
        w("div", pu, [
          pe(G),
          D.value.length ? (p(), ce(Un, {
            key: 0,
            items: D.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : K("", !0)
        ]),
        V.value ? (p(), _("div", vu, [
          R.value && !M.value ? (p(), _("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: B[1] || (B[1] = Le(() => {
            }, ["stop"])),
            onClick: B[2] || (B[2] = (Q) => P(n).toggleMinimize(y.value))
          }, [
            pe(ht, { kind: "minimize" })
          ], 40, mu)) : K("", !0),
          R.value && !M.value ? (p(), _("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${b.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": b.value,
            "data-dc-maximize": y.value,
            onPointerdown: B[3] || (B[3] = Le(() => {
            }, ["stop"])),
            onClick: B[4] || (B[4] = (Q) => P(n).toggleMaximize(y.value))
          }, [
            pe(ht, {
              kind: b.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, hu)) : K("", !0),
          !r.value && u.value && m(u.value.id) ? (p(), _("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: B[5] || (B[5] = Le(() => {
            }, ["stop"])),
            onClick: B[6] || (B[6] = (Q) => P(n).close(u.value.id))
          }, [
            pe(ht, { kind: "close" })
          ], 40, _u)) : K("", !0)
        ])) : K("", !0)
      ], 40, nu)),
      i.value ? (p(), _("div", {
        key: 1,
        id: ve.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : te(l.value.id)
      }, [
        qe(N.$slots, "space", {
          node: i.value,
          path: k.value
        }, void 0, !0)
      ], 8, gu)) : (p(), _("div", {
        key: 2,
        id: ve.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : te(o.value)
      }, [
        pe(I)
      ], 8, yu)),
      Ce.value ? (p(), _("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Ce.value,
        "aria-hidden": "true"
      }, null, 8, wu)) : K("", !0)
    ], 40, tu)) : K("", !0);
  }
}), za = /* @__PURE__ */ de(bu, [["__scopeId", "data-v-44fd2b2d"]]), ku = ["data-dc-space", "data-dc-path", "aria-label"], $u = {
  key: 0,
  class: "dc-space__head"
}, xu = { class: "dc-space__title dc-truncate" }, Cu = ["data-dc-direction"], Mu = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Eu = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Su = /* @__PURE__ */ ue({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ns(), s = W(null), a = g(() => q(t.node) ? t.node : null), r = g(() => kt(t.node) ? t.node : null), l = g(() => X(t.node) ? t.node : null), i = g(
      () => r.value ? r.value.children : l.value?.frames.map((I) => I.node) ?? []
    ), o = g(() => r.value ? He(r.value) : []), u = g(
      () => (l.value?.frames ?? []).map((I, G) => ({
        held: I,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: G,
        key: m(I.node),
        path: [...t.path, G]
      })).sort((I, G) => I.key < G.key ? -1 : I.key > G.key ? 1 : 0)
    ), f = g(() => wt(t.node)), h = g(() => n.spaceMenu(t.path)), k = g(() => t.node.headless === !0), y = g(() => l.value ? "desktop" : r.value?.direction ?? ""), $ = W(null), x = W(0);
    let C = null;
    ye(
      $,
      (I) => {
        C?.disconnect(), C = null, !(!I || typeof ResizeObserver > "u") && (x.value = I.clientWidth, C = new ResizeObserver(([G]) => {
          x.value = G?.contentRect.width ?? 0;
        }), C.observe(I));
      },
      { immediate: !0 }
    ), je(() => C?.disconnect());
    const A = g(() => {
      const I = Math.max(
        1,
        Math.floor((x.value + dt) / (En + dt))
      ), G = /* @__PURE__ */ new Map();
      let ne = 0;
      for (const se of u.value)
        se.held.minimized === !0 && (G.set(se.key, {
          x: dt + ne % I * (En + dt),
          bottom: dt + Math.floor(ne / I) * (ha + dt)
        }), ne += 1);
      return G;
    }), F = (I) => !!I && I.join("/") === t.path.join("/"), R = g(() => {
      const I = n.dropTarget.value, G = l.value;
      if (!G || !I?.rect || I.edge !== "float") return null;
      if (I.space) return F(I.space) ? I.rect : null;
      const ne = ge(G, I.panel);
      return ne && G.frames.includes(ne) ? I.rect : null;
    }), M = g(() => {
      const I = n.dropTarget.value;
      return !!I && !I.rect && F(I.space);
    }), S = g(() => r.value?.direction === "row"), D = g(() => i.value.map((I, G) => [...t.path, G])), m = (I) => [...Xe(I)].sort().join("/"), b = (I) => {
      const G = Xe(I)[0];
      return (G ? n.panelFor(G)?.title : null) ?? G ?? "panel";
    }, V = (I) => {
      const G = i.value[I], ne = i.value[I + 1];
      return !G || !ne ? "Resize panels" : `Resize ${b(G)} and ${b(ne)}`;
    }, te = (I) => {
      const G = o.value[I] ?? 0, ne = o.value[I + 1] ?? 0, se = G + ne;
      return se > 0 ? Math.round(G / se * 100) : 50;
    };
    function ve() {
      const I = s.value, G = I ? S.value ? I.clientWidth : I.clientHeight : 0;
      return G <= 0 ? 0.05 : Math.min(n.minPanelSize.value / G, 0.4);
    }
    let Z = null;
    function Ce(I, G) {
      const ne = r.value, se = s.value;
      if (!n.resizable.value || !ne || !se || I.button !== 0) return;
      const me = S.value ? se.clientWidth : se.clientHeight;
      if (me <= 0) return;
      const Me = S.value ? I.clientX : I.clientY, Ge = He(ne), Ye = Math.min(n.minPanelSize.value / me, 0.4);
      I.preventDefault();
      const Qe = (Oe) => {
        const Ve = ((S.value ? Oe.clientX : Oe.clientY) - Me) / me;
        n.setSizes(t.path, As(Ge, G, Ve, Ye));
      }, Ze = () => Z?.(), Ie = (Oe) => {
        Oe.key === "Escape" && (n.setSizes(t.path, Ge), Z?.());
      };
      Z = () => {
        window.removeEventListener("pointermove", Qe), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", Ze), window.removeEventListener("keydown", Ie), Z = null;
      }, window.addEventListener("pointermove", Qe), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", Ze), window.addEventListener("keydown", Ie);
    }
    je(() => Z?.());
    function Pe(I, G) {
      const ne = r.value;
      if (!n.resizable.value || !ne) return;
      const se = S.value ? "ArrowRight" : "ArrowDown", me = S.value ? "ArrowLeft" : "ArrowUp", Me = I.shiftKey ? 0.1 : 0.02;
      if (I.key !== se && I.key !== me) return;
      const Ge = I.key === se ? Me : -Me;
      I.preventDefault(), n.setSizes(t.path, As(He(ne), G, Ge, ve()));
    }
    return (I, G) => {
      const ne = Ds("WindowNode", !0);
      return a.value ? (p(), ce(za, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: gt(({ node: se, path: me }) => [
          pe(ne, {
            node: se,
            path: me,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (p(), _("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": y.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !k.value ? (p(), _("header", $u, [
          w("span", xu, T(f.value), 1),
          h.value.length ? (p(), ce(Un, {
            key: 0,
            items: h.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : K("", !0)
        ])) : K("", !0),
        l.value ? (p(), _("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          R.value ? (p(), _("div", {
            key: 0,
            class: "dc-window__drop",
            style: ze({
              left: `${R.value.x}px`,
              top: `${R.value.y}px`,
              width: `${R.value.w}px`,
              height: `${R.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : K("", !0),
          (p(!0), _(Y, null, oe(u.value, (se) => (p(), ce(Jc, {
            key: se.key,
            frame: se.held,
            path: se.path,
            order: se.order,
            place: A.value.get(se.key) ?? null
          }, {
            default: gt(() => [
              pe(ne, {
                node: se.held.node,
                path: se.path,
                framed: se.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (p(), _("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          M.value ? (p(), _("div", Mu)) : K("", !0),
          (p(!0), _(Y, null, oe(i.value, (se, me) => (p(), _(Y, {
            key: m(se)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: ze({ flexGrow: o.value[me] ?? 1 })
            }, [
              pe(ne, {
                node: se,
                path: D.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < i.value.length - 1 ? (p(), _("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": S.value ? "vertical" : "horizontal",
              "aria-label": V(me),
              "aria-valuenow": te(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Me) => Ce(Me, me),
              onKeydown: (Me) => Pe(Me, me)
            }, null, 40, Eu)) : K("", !0)
          ], 64))), 128))
        ], 8, Cu)) : K("", !0)
      ], 8, ku));
    };
  }
}), Pu = /* @__PURE__ */ de(Su, [["__scopeId", "data-v-fb5b403f"]]), Au = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], zu = {
  key: 1,
  class: "dc-window__empty"
}, Ru = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Yt = 16, Tu = /* @__PURE__ */ ue({
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
    const s = e, a = n, r = sn(e, "layout"), l = sn(e, "views"), i = Tn(), o = g(() => new Map(s.panels.map((c) => [c.id, c]))), u = g(() => s.panels.map((c) => c.id)), f = g(() => Lc(r.value, u.value)), h = W(null), k = W(null), y = W(null), $ = W(!0), x = W(null), C = W(null), A = W(null), F = W(""), R = W(null);
    function M() {
      const c = R.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function S(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function D() {
      return M().map((c) => ({ pane: c, order: S(c.element) })).sort((c, d) => {
        const v = Math.max(c.order.length, d.order.length);
        for (let E = 0; E < v; E += 1) {
          const z = (c.order[E] ?? -1) - (d.order[E] ?? -1);
          if (z !== 0) return z;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const m = (c) => M().find((d) => d.panels.includes(c)) ?? null;
    function b(c) {
      const d = o.value.get(c);
      if (!d) return "";
      const v = l.value[c];
      return v && d.views?.some((E) => E.key === v) ? v : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function V(c, d) {
      l.value = { ...l.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const te = g(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ve(c) {
      return !s.movable || te.value < 1 || s.panels.length < 2 ? !1 : o.value.get(c)?.fixed !== !0;
    }
    function Z(c, d) {
      const v = f.value;
      !c || !v || c === v || (r.value = c, d && a("panel-move", d));
    }
    function Ce(c, d, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const E = (d - c.left) / c.width, z = (v - c.top) / c.height, L = 0.3;
      return E > L && E < 1 - L && z > L && z < 1 - L ? "center" : [
        { edge: "left", distance: E },
        { edge: "right", distance: 1 - E },
        { edge: "top", distance: z },
        { edge: "bottom", distance: 1 - z }
      ].reduce(
        (J, O) => O.distance < J.distance ? O : J
      ).edge;
    }
    function Pe(c, d) {
      const v = [...c.querySelectorAll(".dc-tab")], E = v.findIndex((z) => {
        const L = z.getBoundingClientRect();
        return d < L.left + L.width / 2;
      });
      return E === -1 ? v.length : E;
    }
    function I(c, d, v) {
      for (const { panels: E, element: z } of D().reverse()) {
        const L = z.getBoundingClientRect();
        if (c < L.left || c > L.right || d < L.top || d > L.bottom) continue;
        const re = E.find((H) => H !== v), J = z.querySelector(".dc-pane__tabs"), O = J?.getBoundingClientRect();
        if (J && O && d >= O.top && d <= O.bottom)
          return re ? { panel: re, edge: "center", index: Pe(J, c) } : null;
        const U = z.querySelector(":scope > .dc-pane__space");
        if (U) {
          const H = U.getBoundingClientRect();
          if (c >= H.left && c <= H.right && d >= H.top && d <= H.bottom) continue;
        }
        return re ? { panel: re, edge: Ce(L, c, d) } : null;
      }
      return ne(c, d, v) ?? Me(c, d);
    }
    function G() {
      const c = R.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function ne(c, d, v) {
      const E = f.value;
      if (!E) return null;
      for (const z of G()) {
        const L = z.getBoundingClientRect();
        if (c < L.left || c > L.right || d < L.top || d > L.bottom) continue;
        const re = Ge(z), J = re.flatMap((ae) => ae.panels).find((ae) => ae !== v);
        if (!J && re.length > 0) return null;
        const O = ge(E, v)?.rect, U = _n(
          {
            x: c - L.left - 24,
            y: d - L.top - 12,
            w: O?.w ?? lt.w,
            h: O?.h ?? lt.h
          },
          { w: z.clientWidth, h: z.clientHeight },
          s.minPanelSize
        );
        if (J) return { panel: J, edge: "float", rect: U };
        const H = se(z);
        return H ? { panel: "", space: H, edge: "float", rect: U } : null;
      }
      return null;
    }
    function se(c) {
      const d = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return d == null ? null : d === "" ? [] : d.split("/").map(Number);
    }
    function me() {
      const c = R.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((d) => d.closest(".dc-window") === c).filter((d) => !d.querySelector(".dc-pane")).reverse().flatMap((d) => {
        const v = se(d);
        return v ? [{ element: d, path: v }] : [];
      }) : [];
    }
    function Me(c, d) {
      for (const { element: v, path: E } of me()) {
        if (v.dataset.dcSpace === "desktop") continue;
        const z = v.getBoundingClientRect();
        if (!(c < z.left || c > z.right || d < z.top || d > z.bottom))
          return { panel: "", space: E, edge: "center" };
      }
      return null;
    }
    function Ge(c) {
      return M().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let Ye = null;
    const Qe = (c) => c.altKey;
    function Ze(c, d) {
      if (!ve(c) || k.value || C.value || d.button !== 0) return;
      const v = d.clientX, E = d.clientY;
      let z = !1, L = Qe(d);
      const re = () => {
        const le = A.value;
        le && (y.value = L ? ne(le.x, le.y, c) : I(le.x, le.y, c));
      }, J = (le) => {
        if (!z) {
          if (Math.hypot(le.clientX - v, le.clientY - E) < 4) return;
          z = !0, k.value = c, x.value = null;
        }
        L = Qe(le), $.value = !L, A.value = { x: le.clientX, y: le.clientY }, re();
      }, O = (le) => {
        Qe(le) !== L && (L = !L, $.value = !L, z && re());
      }, U = (le) => {
        Ye?.();
        const j = y.value, ke = f.value;
        if (le && z && j && ke) {
          const Je = j.space ? Ss(ke, c, j.space, j.rect) : j.edge === "float" && j.rect ? Es(ke, c, j.panel, j.rect) : Gt(ke, c, j.panel, j.edge, j.index);
          Z(Je, {
            panel: c,
            target: j.panel,
            edge: j.edge,
            ...j.space === void 0 ? {} : { space: j.space },
            ...j.index === void 0 ? {} : { index: j.index },
            ...j.rect === void 0 ? {} : { rect: j.rect }
          });
        }
        k.value = null, y.value = null, A.value = null, $.value = !0;
      }, H = () => U(!0), ae = () => U(!1), fe = (le) => {
        if (le.key === "Escape") {
          U(!1);
          return;
        }
        O(le);
      };
      Ye = () => {
        window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", H), window.removeEventListener("pointercancel", ae), window.removeEventListener("keydown", fe), window.removeEventListener("keyup", O), Ye = null;
      }, window.addEventListener("pointermove", J), window.addEventListener("pointerup", H), window.addEventListener("pointercancel", ae), window.addEventListener("keydown", fe), window.addEventListener("keyup", O);
    }
    je(() => Ye?.());
    let Ie = null;
    function Oe(c) {
      const d = R.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((z) => z.closest(".dc-window") === d)?.parentElement ?? null : null;
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
    function N(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && et(v);
    }
    function B(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && rt(v);
    }
    function Q(c) {
      const d = f.value, v = d ? at(d, c) : null;
      return v ? $e(v.node) : "";
    }
    function xe(c) {
      const d = f.value, v = d ? at(d, c) : null;
      if (!d || !v) return;
      const E = $e(v.node);
      if (o.value.get(E)?.fixed === !0) return;
      const z = !rt(v);
      let L = xc(d, c, z);
      L !== d && (z || (L = At(L, c)), r.value = L, a("frame-minimize", { panel: E, minimized: z }));
    }
    function be(c) {
      const d = Ve(c);
      d && xe(d);
    }
    function xt(c) {
      const d = f.value, v = d ? at(d, c) : null;
      if (!d || !v) return;
      const E = $e(v.node);
      if (o.value.get(E)?.fixed === !0) return;
      const z = !et(v);
      let L = $c(d, c, z);
      L !== d && (z && (L = At(L, c)), r.value = L, a("frame-maximize", { panel: E, maximized: z }));
    }
    function as(c) {
      const d = Ve(c);
      d && xt(d);
    }
    function rs(c, d, v) {
      const E = f.value, z = E ? at(E, c) : null;
      if (!E || !z || d.button !== 0 || k.value || C.value) return;
      const L = $e(z.node);
      if (o.value.get(L)?.fixed === !0 || et(z) || rt(z) || (v === "move" ? !s.movable : !s.resizable)) return;
      const re = Oe(c), J = Cc(E, c);
      $t(c);
      const O = { w: re?.clientWidth ?? 0, h: re?.clientHeight ?? 0 }, U = { ...z.rect }, H = d.clientX, ae = d.clientY, fe = s.minPanelSize;
      C.value = L;
      const le = (Ee) => {
        const Ke = f.value;
        if (!Ke) return;
        const Ct = Ms(Ke, J, _n(Ee, O, fe));
        Ct !== Ke && (r.value = Ct);
      }, j = (Ee) => {
        Ee.preventDefault();
        const Ke = Ee.clientX - H, Ct = Ee.clientY - ae;
        le(
          v === "move" ? { ...U, x: U.x + Ke, y: U.y + Ct } : Cs(U, v, Ke, Ct, fe)
        );
      }, ke = (Ee) => {
        if (Ie?.(), C.value = null, !Ee) {
          le(U);
          return;
        }
        const Ke = f.value ? at(f.value, J) : null;
        Ke && a("frame-change", { panel: Q(J), rect: Ke.rect });
      }, Je = () => ke(!0), nt = () => ke(!1), st = (Ee) => {
        Ee.key === "Escape" && ke(!1);
      };
      Ie = () => {
        window.removeEventListener("pointermove", j), window.removeEventListener("pointerup", Je), window.removeEventListener("pointercancel", nt), window.removeEventListener("keydown", st), Ie = null;
      }, window.addEventListener("pointermove", j), window.addEventListener("pointerup", Je), window.addEventListener("pointercancel", nt), window.addEventListener("keydown", st);
    }
    function Ra(c, d, v) {
      const E = Ve(c);
      E && rs(E, d, v);
    }
    function Ta(c, d, v = !1) {
      const E = f.value, z = Ve(c), L = E && z ? at(E, z) : null;
      if (!E || !z || !L || o.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (et(L) || rt(L)) {
        F.value = `${Te(c)} is ${et(L) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const re = d === "left" ? -Yt : d === "right" ? Yt : 0, J = d === "up" ? -Yt : d === "down" ? Yt : 0, O = Oe(z), U = { w: O?.clientWidth ?? 0, h: O?.clientHeight ?? 0 }, H = v ? Cs(L.rect, "se", re, J, s.minPanelSize) : { ...L.rect, x: L.rect.x + re, y: L.rect.y + J }, ae = Ms(E, z, _n(H, U, s.minPanelSize));
      if (ae === E) {
        F.value = v ? `${Te(c)} cannot be resized further.` : `${Te(c)} cannot move ${d}.`;
        return;
      }
      r.value = ae;
      const fe = at(ae, z);
      fe && (a("frame-change", { panel: c, rect: fe.rect }), F.value = v ? `${Te(c)} resized to ${fe.rect.w} by ${fe.rect.h}.` : `${Te(c)} moved to ${fe.rect.x}, ${fe.rect.y}.`);
    }
    je(() => Ie?.());
    function Fa(c, d) {
      const v = m(c), E = v?.element.getBoundingClientRect();
      if (!v || !E) return null;
      const z = d === "left" || d === "right", L = (O) => {
        if (!(z ? O.bottom > E.top + 1 && O.top < E.bottom - 1 : O.right > E.left + 1 && O.left < E.right - 1)) return null;
        const H = d === "left" ? E.left - O.right : d === "right" ? O.left - E.right : d === "up" ? E.top - O.bottom : O.top - E.bottom;
        return H < -1 ? null : H;
      }, re = [];
      for (const O of M()) {
        if (O === v || O.element === v.element) continue;
        const U = L(O.element.getBoundingClientRect());
        if (U === null) continue;
        const H = O.panels.find((ae) => ae !== c);
        H && re.push({ to: { panel: H }, distance: U });
      }
      for (const { element: O, path: U } of me()) {
        const H = L(O.getBoundingClientRect());
        H !== null && re.push({ to: { space: U }, distance: H });
      }
      return re.reduce(
        (O, U) => O && O.distance <= U.distance ? O : U,
        null
      )?.to ?? null;
    }
    function La(c) {
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
    const Te = (c) => o.value.get(c)?.title ?? c, Da = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Na(c, d, v = !1) {
      if (!ve(c)) return;
      const E = f.value;
      if (!E) return;
      const z = Te(c), L = pt(E, c);
      if (!v && L && (d === "left" || d === "right") && L.panels.length > 1) {
        const ae = L.panels.indexOf(c), fe = d === "left" ? ae - 1 : ae + 1;
        if (fe >= 0 && fe < L.panels.length) {
          Z(zt(E, c, fe), { panel: c, target: c, edge: "center", index: fe }), F.value = `${z} moved ${d}, now tab ${fe + 1} of ${L.panels.length}.`, dn(c);
          return;
        }
      }
      const J = Fa(c, d);
      if (!J || J.panel !== void 0 && !ve(J.panel)) {
        F.value = `${z} cannot move ${d}.`;
        return;
      }
      const O = Da[d];
      if (J.space) {
        const ae = J.space, fe = tt(E, ae), le = ge(E, c)?.rect, j = { ...lt, ...le ? { w: le.w, h: le.h } : {} };
        Z(Ss(E, c, ae, j), { panel: c, target: "", space: ae, edge: O }), F.value = `${z} moved ${d}, into ${fe ? wt(fe) : "the space"}.`, dn(c);
        return;
      }
      const U = J.panel, H = L?.panels.length === 1 && pt(E, U)?.panels.length === 1;
      v ? (Z(Gt(E, c, U, "center"), {
        panel: c,
        target: U,
        edge: "center"
      }), F.value = `${z} joined ${Te(U)} as a tab.`) : H ? (Z(en(E, c, U), { panel: c, target: U, edge: O }), F.value = `${z} moved ${d}, trading places with ${Te(U)}.`) : (Z(Gt(E, c, U, O), { panel: c, target: U, edge: O }), F.value = `${z} moved ${d}, beside ${Te(U)}.`), dn(c);
    }
    function dn(c) {
      Ft(() => {
        m(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Ia(c, d) {
      const v = f.value;
      v && (r.value = tn(v, c, d));
    }
    function fn(c) {
      const d = f.value;
      if (!d) return;
      const v = mt(d, c);
      v !== d && (r.value = v, a("tab-select", { panel: c }));
    }
    function ls(c) {
      return o.value.get(c)?.closable ?? s.closable;
    }
    function Oa(c) {
      ls(c) && a("panel-close", c);
    }
    const pn = W(/* @__PURE__ */ new Map());
    let Va = 0;
    function Ka(c, d) {
      const v = Va += 1;
      return pn.value.set(v, { panel: c, items: d }), () => {
        pn.value.delete(v);
      };
    }
    function Ba(c) {
      const d = [];
      for (const v of pn.value.values())
        v.panel() === c && d.push(...v.items());
      return d;
    }
    function os(c) {
      const d = c.filter((v) => v.items.length > 0);
      return d.length < 2 ? d.flatMap((v) => v.items) : d.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const is = (c) => c.title || "These tabs";
    function qa(c, d) {
      const v = d.id, E = pt(c, v), z = (E?.panels.length ?? 0) > 1, L = E?.fixedView === !0, re = (H) => ({
        action: () => {
          H !== c && (r.value = H);
        }
      }), J = [], O = [], U = d.views ?? [];
      if (U.length > 1 && !L) {
        const H = b(v);
        J.push({
          id: "view",
          label: "View",
          items: U.map((ae) => ({
            id: `view-${ae.key}`,
            label: ae.label,
            checked: ae.key === H,
            action: () => V(v, ae.key)
          }))
        });
      }
      return z && !L && O.push(
        { id: "show-row", label: "Row", checked: !1, ...re(Ps(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...re(Ps(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...re(Pc(c, v))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...re(Ac(c, v))
        }
      ), z && E && (O.length && O.push({ separator: !0 }), O.push(...cs(E, v))), { panel: J, tabs: O, tabsTitle: E ? is(E) : "" };
    }
    function cs(c, d) {
      const v = ut(c), E = (z) => {
        const L = c.panels[(v + z + c.panels.length) % c.panels.length];
        return (L === void 0 ? "" : $e(L)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => fn(E(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => fn(E(-1)) }
      ];
    }
    function jt(c) {
      return c.title ? c.title : q(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : wt(c);
    }
    function us(c) {
      if (!c || X(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Re(c)) return null;
      const d = Aa(c);
      return d && d.fixedView !== !0 ? d : null;
    }
    function Wa(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const v = tt(d, c);
      if (!v || q(v)) return [];
      if (v.fixedView) return [];
      const E = X(v) ? "desktop" : v.direction, z = (j, ke, Je) => ({
        id: `show-${j}`,
        label: ke,
        checked: E === j,
        action: () => {
          const nt = f.value, st = Je();
          !nt || st === v || (r.value = on(_e(it(nt, c, st))));
        }
      }), L = () => {
        const j = Ma(v, Ua(v));
        if (q(j) && j.panels.length === 0) return v;
        const ke = q(j) && j.panels.length === 1 ? j.panels[0] : void 0;
        return ke !== void 0 && ie(ke) ? v : j;
      }, re = (j) => () => X(v) ? Pa(v, j) : v.direction === j ? v : { ...v, direction: j }, J = c.slice(0, -1), O = c.length > 0 ? tt(d, J) : null, U = O && q(O) && O.panels.length > 1 ? O : null, H = O && us(O) === v ? O : null, ae = us(v), fe = v.title || "this space", le = (j, ke, Je, nt, st) => ({
        id: j,
        label: st,
        action: () => {
          const Ee = f.value;
          Ee && (r.value = on(_e(it(Ee, ke, Tc(Je, nt)))));
        }
      });
      return os([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            z("row", "Row", re("row")),
            z("column", "Column", re("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            z("tabs", "Tabs", () => L()),
            z("desktop", "Desktop", () => X(v) ? v : Sa(v))
          ]
        },
        {
          id: "about-around",
          title: ae ? `Around ${jt(ae)}` : "",
          items: ae ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ae.title ? [] : [le("merge-around-keep-this", c, v, "outer", `Keep ${fe}`)],
            ...v.title ? [] : [le("merge-around-keep-that", c, v, "inner", `Keep ${jt(ae)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: H ? `Inside ${jt(H)}` : "",
          items: H ? [
            ...v.title ? [] : [le("merge-inside-keep-that", J, H, "outer", `Keep ${jt(H)}`)],
            ...H.title ? [] : [le("merge-inside-keep-this", J, H, "inner", `Keep ${fe}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: U ? is(U) : "",
          items: U ? cs(U, $e(v)) : []
        }
      ]);
    }
    function Ua(c) {
      const d = h.value;
      return d && ee(c, d) ? d : void 0;
    }
    function Ha(c) {
      const d = f.value, v = o.value.get(c);
      if (!d || !v) return [];
      const E = s.menu ? qa(d, v) : null, z = Ba(c);
      z.length && E?.panel.length && z.push({ separator: !0 }), E && z.push(...E.panel);
      const L = os([
        { id: "about-panel", title: v.title, items: z },
        { id: "about-tabs", title: E?.tabsTitle ?? "", items: E?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, L) : L;
    }
    function ja(c, d) {
      return i[`${c}-${d}`] ?? i[c];
    }
    function ds(c, d, v, E) {
      return ja(c, d.id)?.({ panel: d, view: v, active: E });
    }
    Dc({
      panelFor: (c) => o.value.get(c) ?? null,
      viewFor: b,
      setView: V,
      movable: g(() => s.movable),
      resizable: g(() => s.resizable),
      minPanelSize: g(() => s.minPanelSize),
      spaceNames: g(() => s.spaceNames),
      focused: h,
      dragging: k,
      dropTarget: y,
      moving: x,
      framing: C,
      canMove: ve,
      focus(c) {
        h.value !== c && (h.value = c, a("panel-activate", c));
      },
      selectPanel: fn,
      beginDrag: Ze,
      toggleMoveMode: La,
      nudge: Na,
      setSizes: Ia,
      frameOf: (c) => f.value ? ge(f.value, c) : null,
      beginFrameDrag: Ra,
      nudgeFrame: Ta,
      raise: Ht,
      maximized: N,
      toggleMaximize: as,
      minimized: B,
      toggleMinimize: be,
      beginFrameDragAt: rs,
      raiseAt: $t,
      toggleMaximizeAt: xt,
      toggleMinimizeAt: xe,
      menuFor: Ha,
      spaceMenu: Wa,
      registerMenu: Ka,
      closable: ls,
      close: Oa,
      renderContent: (c, d, v) => ds("panel", c, d, v),
      renderActions: (c, d, v) => ds("actions", c, d, v),
      layout: f
    });
    const Xa = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), Ga = () => {
      const c = k.value, d = A.value;
      return !c || !d ? null : Za(
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
      move(c, d, v, E) {
        const z = f.value;
        z && Z(Gt(z, c, d, v, E), {
          panel: c,
          target: d,
          edge: v,
          ...E === void 0 ? {} : { index: E }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const d = f.value;
        d && (r.value = mt(d, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, d, v) {
        const E = f.value;
        E && Z(Es(E, c, d, v), {
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
        const E = wc(v, c, d);
        if (E === v) return;
        r.value = E;
        const z = ge(E, c);
        z && a("frame-change", { panel: c, rect: z.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: V,
      /** Brings a floating frame to the front of its stack. */
      raise: Ht,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: as,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: be
    }), (c, d) => (p(), _("div", {
      ref_key: "root",
      ref: R,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": k.value ? "true" : "false",
      "data-dc-docking": $.value ? "true" : "false",
      style: ze(Xa.value)
    }, [
      f.value ? (p(), ce(Pu, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (p(), _("p", zu, " This window has no panels. ")),
      pe(Ga),
      w("p", Ru, T(F.value), 1)
    ], 12, Au));
  }
}), Fu = /* @__PURE__ */ de(Tu, [["__scopeId", "data-v-711565af"]]);
function Ju(e = "", t = "/") {
  const n = W(We(e)), s = W(t), a = [`${s.value}${n.value}`];
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
function Rs(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function ed(e) {
  const t = W(Rs(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), s = ye(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Rs(a);
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
const Lu = {
  DataShell: ec,
  ShellHeader: sa,
  QueryPanel: ra,
  ResultsArea: pa,
  FacetControl: aa,
  SegmentedControl: Cn,
  StatusPill: Ot,
  WindowFrame: Fu,
  WindowPane: za,
  ListView: Mn,
  CardsView: oa,
  GridView: ia,
  TableView: da,
  LinksView: ca,
  PreviewView: ua,
  TypeCardsView: fa
}, td = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Lu))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ns, t.route);
  }
};
export {
  ln as CASCADE_STEP,
  Ou as COLUMN_BREAKPOINTS,
  Iu as COLUMN_ROLES,
  oa as CardsView,
  $s as ColumnCell,
  lt as DEFAULT_FRAME,
  bn as DEFAULT_SORT,
  er as DEFAULT_VIEW,
  ec as DataShell,
  kn as EMPTY_CELL,
  Js as ENTITY_ALL,
  rn as ENTITY_TERM,
  Dt as EXPRESSION_TERM,
  qn as FACET_PREFIX,
  aa as FacetControl,
  ia as GridView,
  td as HeaderContentLayoutPlugin,
  ca as LinksView,
  Mn as ListView,
  dt as MINIMIZED_GAP,
  ha as MINIMIZED_HEIGHT,
  En as MINIMIZED_WIDTH,
  ma as MIN_FRAME,
  ys as MOCK_TINTS,
  Ku as MenuBar,
  Un as MenuButton,
  va as MenuList,
  Vt as MetricDrill,
  ss as PANE_CONTEXT_KEY,
  Vn as PARAM_DIR,
  Nn as PARAM_ENTITY,
  Kn as PARAM_EXPR,
  Bn as PARAM_PAGE,
  On as PARAM_SORT,
  In as PARAM_VIEW,
  Wn as PinStar,
  ua as PreviewView,
  ra as QueryPanel,
  Xt as RECORD_STATUSES,
  Hs as RESULT_FIELDS,
  Ns as ROUTE_ADAPTER_KEY,
  pa as ResultsArea,
  Zs as SHELL_CONTEXT_KEY,
  Nu as SHELL_THEMES,
  Kt as ScopeMark,
  Cn as SegmentedControl,
  sa as ShellHeader,
  Ot as StatusPill,
  da as TableView,
  fa as TypeCardsView,
  Is as VIEW_KINDS,
  ts as WINDOW_CONTEXT_KEY,
  Fu as WindowFrame,
  za as WindowPane,
  ga as activePanel,
  ut as activeTab,
  Lr as addTerm,
  gc as axisOf,
  Xn as cascade,
  Gs as cellFull,
  Nt as cellText,
  Zt as cellTextOf,
  Ae as cellValue,
  ps as changesResults,
  _n as clampRect,
  Ma as collapseSpace,
  Pc as collapseToTabs,
  qu as column,
  ms as columnAlign,
  hs as columnClass,
  vs as columnKey,
  $n as columnTruncates,
  lr as columnsFor,
  nr as countPages,
  Ja as createHistoryAdapter,
  Ju as createMemoryAdapter,
  zr as createMockDataSource,
  ed as createVueRouterAdapter,
  cr as defaultCellText,
  zs as defaultLayout,
  Dn as defaultQuery,
  Dr as drillExpression,
  Ss as dropIntoSpace,
  Lt as emptyFacetState,
  Fn as emptyFacetValue,
  ft as findEntity,
  Ue as findSort,
  Uu as fixedView,
  jn as float,
  Es as floatPanel,
  Sa as floatSplit,
  Ac as floatTabs,
  Qt as fnv1a,
  Vs as focusEntity,
  ar as formatDate,
  yr as formatExpression,
  sr as formatMetric,
  rr as formatOrdinal,
  It as formatTerm,
  cn as frame,
  at as frameAt,
  ge as frameOf,
  An as framePathOf,
  $e as frontPanel,
  Sr as generateRows,
  Bu as group,
  pt as groupOf,
  yc as groups,
  Ws as hasActiveFacets,
  ee as hasPanel,
  Wu as headless,
  Et as insertPanel,
  Pt as isChoosable,
  Vu as isEntityScoped,
  qs as isFacetActive,
  X as isFloat,
  q as isGroup,
  et as isMaximized,
  rt as isMinimized,
  ie as isPanelTab,
  Ln as isPristineQuery,
  kt as isSplit,
  Se as isTabOf,
  Us as isTypeCardsQuery,
  Os as isViewKind,
  gs as joinExpression,
  gr as matchesExpression,
  Pr as matchesFacets,
  bc as maximizeFrame,
  $c as maximizeFrameAt,
  Tc as mergeSpace,
  kc as minimizeFrame,
  xc as minimizeFrameAt,
  Gt as movePanel,
  zt as moveTab,
  tt as nodeAt,
  Rt as nodeTitle,
  _e as normalizeLayout,
  We as normalizeSearch,
  Jn as normalizeSizes,
  Aa as onlySpace,
  Xe as panelIds,
  Ne as panelNode,
  xs as panelTabs,
  yt as parseExpression,
  Wr as parseQuery,
  no as presentParts,
  la as presentRow,
  eu as providePaneContext,
  Ir as provideShellContext,
  Dc as provideWindowContext,
  gn as raiseFrame,
  At as raiseFrameAt,
  Cc as raisedPath,
  js as reconcileFacets,
  Lc as reconcileLayout,
  Qs as recordTerm,
  ot as removePanel,
  it as replaceAt,
  Cs as resizeRect,
  As as resizeSplit,
  Fe as roleColumn,
  Xs as roleColumns,
  on as rootSpace,
  Yn as row,
  ir as rowKey,
  Rr as scopeTerm,
  Tr as scopeTermFor,
  Nr as scopedEntity,
  ks as serializeQuery,
  mt as setActivePanel,
  wc as setFrameRect,
  Ms as setFrameRectAt,
  tn as setSizesAt,
  Xu as setSplitDirection,
  He as sizesOf,
  Bs as sortsFor,
  he as spaceChrome,
  wt as spaceTitle,
  Gn as split,
  br as splitExpression,
  Ps as spreadTabs,
  Hr as summarizeQuery,
  na as summaryTerms,
  en as swapPanels,
  Hn as tabNode,
  qt as tabPanels,
  Pa as tileFloat,
  Gu as toFloat,
  Yu as toTiled,
  Hu as toggleMaximized,
  ju as toggleMinimized,
  ui as useColumns,
  $i as useEntityPreviews,
  Qu as usePaneContext,
  Zu as usePaneMenu,
  bt as usePresentedRows,
  jr as useQueryState,
  Gr as useRecordNames,
  Xr as useResults,
  we as useShellContext,
  ns as useWindowContext,
  wr as withoutTerm
};
