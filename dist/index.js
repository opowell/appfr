import { ref as q, inject as St, provide as Wn, computed as v, toValue as Dt, shallowRef as Et, watch as ke, onScopeDispose as Ya, defineComponent as ie, onMounted as gl, onBeforeUnmount as Ue, resolveComponent as Qa, openBlock as f, createElementBlock as h, normalizeStyle as Re, Fragment as ne, renderList as ve, toDisplayString as F, createCommentVNode as L, createElementVNode as w, createBlock as se, nextTick as Wt, useId as Un, unref as M, normalizeClass as Pt, createVNode as ue, withDirectives as mn, withKeys as Ye, withModifiers as Le, vModelText as hn, renderSlot as $e, useSlots as jt, createTextVNode as We, withCtx as Qe, resolveDynamicComponent as Hn, createSlots as cn, useModel as Ot, mergeModels as gn, Comment as _l, Text as yl, getCurrentScope as wl, h as kl } from "vue";
const Za = Symbol("dc.routeAdapter");
function tt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function bl() {
  const e = typeof window < "u", t = q(e ? tt(window.location.search) : ""), n = q(e ? window.location.pathname : "/"), a = () => {
    t.value = tt(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, r) => {
    const i = tt(l);
    if (!e) {
      t.value = i;
      return;
    }
    const o = `${window.location.pathname}${i}${window.location.hash}`;
    r === "push" ? window.history.pushState(window.history.state, "", o) : window.history.replaceState(window.history.state, "", o), t.value = i, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    push: (l) => s(l, "push"),
    replace: (l) => s(l, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
const Ja = ["list", "cards", "grid", "table", "links", "preview"], Rd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], ln = ["ok", "running", "queued", "review", "failed"], Fd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Nd = [480, 620, 760, 900, 1100], $l = "cards", Rn = "updated";
function es(e) {
  return typeof e == "string" && Ja.includes(e);
}
const xl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function jn(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function bt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function ts(e, t = {}) {
  const n = bt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ns(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function as(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of ns(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Cl = { key: Rn, label: Rn };
function rt(e, t, n = null) {
  const a = as(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Rn) ?? a[0] ?? Cl;
}
function Xn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function At(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Xn(n);
  return t;
}
function ss(e) {
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
function ls(e) {
  return Object.values(e).some(ss);
}
function kn(e) {
  return e.entity === null && e.expr.trim() === "" && !ls(e.facets);
}
function Dd(e) {
  return e.entity !== null;
}
function Gn(e) {
  return e.entity === null && e.view === "cards";
}
function Ml(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Yn(e, t = {}) {
  const a = t.landing === "entity" ? ts(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && es(t.view) ? t.view : $l,
    sort: rt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: At(a),
    page: 1
  };
}
const rs = ["entity", "sort", "dir", "expr", "facets"];
function Pa(e) {
  return rs.some((t) => t in e);
}
function os(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : Xn(a);
  }
  return n;
}
function un(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Sl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function wt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function El(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Pl(e) {
  return String(e + 1).padStart(2, "0");
}
const Fn = "—";
function Ie(e, t) {
  return e.find((n) => n.role === t);
}
function is(e, t) {
  return e.filter((n) => n.role === t);
}
function Al(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Tl = ["id", "entityKey", "entityLabel"];
function Be(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Tl.includes(n))
      return t[n];
  }
}
function Aa(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function zl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ll(e, t) {
  if (e == null || e === "") return Fn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Sl(n) : String(e);
  }
  return t === "date" ? El(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Fn : String(e);
}
function Xt(e, t) {
  const n = Be(e, t);
  return e.format ? e.format(n, t) : Ll(n, e.kind);
}
function Rl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function cs(e, t) {
  const n = Xt(e, t), a = Rl(Be(e, t));
  return a && a !== n ? a : n;
}
function dn(e, t) {
  return e ? Xt(e, t) : "";
}
function Ta(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Fl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function za(e) {
  return [Fl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Nn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Nl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Dl(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const r = e[l];
    if (a) {
      r === a ? a = null : n += r;
      continue;
    }
    if (r === '"' || r === "'") {
      a = r;
      continue;
    }
    if (/\s/.test(r)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += r;
  }
  return s(), t;
}
function Fe(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Dl(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), i = r ? s.slice(1) : s, o = r ? { negated: !0 } : {}, u = Nl.exec(i);
    u && u[3] !== "" ? a.push({
      kind: "field",
      field: u[1].toLowerCase(),
      comparator: u[2],
      value: u[3],
      ...o
    }) : a.push({ kind: "text", value: i, ...o });
  }
  return a.length && n.push(a), n;
}
const En = (e) => e.toLowerCase().replace(/\s+/g, ""), Il = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Ol(e, t, n) {
  const a = En(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && En(u.label) === a
  );
  if (l) return Be(l, t);
  const r = n.facets.find((u) => En(u.label) === a);
  if (r && r.key in t.fields) return t.fields[r.key];
  const i = Il.find(([u]) => u === a)?.[1];
  if (i) {
    const u = Ie(s, i);
    if (u) return Be(u, t);
  }
  const o = /^metric(\d+)$/.exec(a);
  if (o) {
    const u = is(s, "metric")[Number(o[1]) - 1];
    if (u) return Be(u, t);
  }
}
function Pn(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function La(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Bl(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const o = Ie(r, i), u = o ? Be(o, t) : void 0;
      return typeof u == "string" && Pn(u, e.value);
    });
  }
  const a = Ol(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (i) => e.comparator === "=" ? La(String(i), e.value) : Pn(String(i), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof a == "boolean") {
      const r = e.value.toLowerCase();
      return r === "true" || r === "yes" ? a : r === "false" || r === "no" ? !a : null;
    }
    if (typeof a == "number") {
      const r = Number(e.value);
      return Number.isFinite(r) ? a === r : null;
    }
    return e.comparator === "=" ? La(String(a), e.value) : Pn(String(a), e.value);
  }
  const s = Number(e.value), l = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(l) ? null : Vl(e.comparator, l, s);
}
function Kl(e, t, n) {
  const a = Bl(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function Vl(e, t, n) {
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
function ql(e, t, n) {
  return e.length ? e.some((a) => a.every((s) => Kl(s, t, n))) : !0;
}
function Ra(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Gt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ra(e.value) : `${t}${e.field}${e.comparator}${Ra(e.value)}`;
}
function Id(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function pt(e) {
  return e.filter((t) => t.length).map((t) => t.map(Gt).join(" ")).join(" OR ");
}
function Wl(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function Ul(e) {
  const t = Fe(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(Gt).join(" ")
  };
}
function Fa(e, t) {
  return [...e.map(Gt), t.trim()].filter(Boolean).join(" ");
}
const Na = (e, t) => e.toLowerCase() === t.toLowerCase();
function bn(e, t) {
  return !!e.negated == !!t.negated && us(e, t);
}
function Ut(e, t) {
  return !!e.negated != !!t.negated && us(e, t);
}
function us(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Na(e.value, t.value) : t.kind === "text" && Na(e.value, t.value);
}
function Hl(e, t) {
  return t.filter((n) => !e.some((a) => bn(a, n)));
}
function Qn(e, t) {
  return ds(e, t, (n) => n);
}
function jl(e, t) {
  return ds(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Ut(s, l)))
  );
}
function ds(e, t, n) {
  const a = Fe(e), s = Fe(t);
  return a.length ? s.length ? pt(
    a.flatMap(
      (l) => s.map((r) => [...n(l, r), ...Hl(l, r)])
    )
  ) : pt(a) : pt(s);
}
const Da = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function fs(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Xl = 7, Gl = 3;
function Yl(e, t, n, a) {
  const s = (t * Xl + un(n)) % a, l = [];
  for (let r = 0; r < Math.min(Gl, a); r++)
    l.push(fs(e, (s + r) % a));
  return l;
}
function Ql(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Zl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Zl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function Jl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, r = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${r}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return ln[n % ln.length];
    case "updated":
      return l;
    case "tint":
      return Da[n % Da.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return ln[n % ln.length];
    case "date":
      return l;
    default:
      return;
  }
}
function er(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const u = l[o % l.length], d = Math.floor(o / l.length), m = un(`${a}:${e.key}:${u[0]}:${o}`), k = fs(e.key, o), y = new Date(s.getTime() - m % 900 * 36e5).toISOString(), $ = {};
    for (const x of e.columns ?? []) {
      const _ = x.field ?? x.key;
      if (!_ || x.value) continue;
      const b = Jl(x, {
        hash: un(`${m}:${_}`),
        sample: u,
        revision: d,
        updatedAt: y
      });
      b !== void 0 && ($[_] = b);
    }
    for (const x of e.facets)
      $[x.key] = Ql(x, un(`${m}:${x.key}`));
    for (const [x, _] of r)
      $[x] = _ === e.key ? k : Yl(_, o, x, n);
    i.push({ id: k, entityKey: e.key, entityLabel: e.label, fields: $ });
  }
  return i;
}
function tr(e, t) {
  for (const [n, a] of Object.entries(t)) {
    const s = e.fields[n];
    switch (a.kind) {
      case "chips": {
        if (!a.selected.length) break;
        if (Array.isArray(s)) {
          if (!s.some((l) => a.selected.includes(String(l)))) return !1;
          break;
        }
        if (typeof s != "string" || !a.selected.includes(s)) return !1;
        break;
      }
      case "range": {
        if (a.min === null && a.max === null) break;
        const l = typeof s == "number" ? s : Number(s);
        if (!Number.isFinite(l) || a.min !== null && l < a.min || a.max !== null && l > a.max) return !1;
        break;
      }
      case "toggle": {
        if (!a.on) break;
        if (s !== !0) return !1;
        break;
      }
    }
  }
  return !0;
}
function nr(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", l = a === "date" || n.role === "updated";
  return (r, i) => {
    const o = Be(n, r), u = Be(n, i);
    return s ? Number(u ?? 0) - Number(o ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(o ?? "")) : String(u ?? "").localeCompare(String(o ?? ""));
  };
}
function ar(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = er(a, { ...e, scopes: r });
    return t.set(a.key, i), i;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: r, offset: i }) {
      const o = Fe(a.expr), u = l ? [l] : s.entities, d = [], m = [];
      for (const $ of u)
        for (const x of n($, s))
          d.push(x), (l ? tr(x, a.facets) : !0) && ql(o, x, $) && m.push(x);
      const k = rt(l, a.sort, s), y = m.sort(nr(ns(l, s), k.key));
      return a.dir === "asc" && y.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: y.slice(i, i + r),
        total: m.length,
        unfiltered: m.length === d.length
      };
    }
  };
}
function ps(e, t) {
  return vs(e, t.id);
}
function vs(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Zn(e, t) {
  return ps(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ms(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Fe(t).flat();
  if (!a) return n;
  const s = Fe(n);
  return s.some((i) => i.some((o) => bn(o, a))) ? n : s.some((i) => i.some((o) => Ut(o, a))) ? pt(
    s.map(
      (i) => i.map((o) => Ut(o, a) ? a : o)
    )
  ) : `${n} ${t}`;
}
function sr(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function lr(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Fe(t).flat();
  if (!n) return null;
  const a = Fe(e).flat();
  return a.some((s) => bn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Ut(s, n)) ? n.negated ? "in" : "out" : null;
}
function rr(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Fe(t).flat();
  if (!n) return e;
  const a = Fe(e), s = a.map(
    (l) => l.filter((r) => !bn(r, n) && !Ut(r, n))
  );
  return s.every((l, r) => l.length === a[r]?.length) ? e : pt(s);
}
function He(e) {
  return e.metaKey || e.ctrlKey ? { exclude: !0 } : {};
}
function or(e, t, n, a = {}) {
  const s = Zn(e, n);
  return ms(t.expr, a.exclude ? sr(s) : s);
}
function hs(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || !t.trim()) return t;
  const a = Fe(t), s = a.map(
    (l) => l.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((l, r) => l.length === a[r]?.length) ? t : pt(s);
}
function gs(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const _s = Symbol("dc.shellContext");
function ir(e) {
  return Wn(_s, e), e;
}
function be() {
  const e = St(_s, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Jn = "e", ea = "v", ta = "s", na = "d", aa = "q", sa = "p", la = "f_", ys = "*", cr = [
  Jn,
  ea,
  ta,
  na,
  aa,
  sa
], Dn = "..", ws = ",", ur = [
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
function An(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of ur) t = t.replace(n, a);
  return t;
}
function et(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ks(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), r = s === -1 ? "" : a.slice(s + 1);
    n.push([et(l), r]);
  }
  return n;
}
function dr(e) {
  return cr.includes(e) || e.startsWith(la);
}
function Ia(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function fr(e, t) {
  const n = et(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(ws).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => a.has(l)) };
    }
    case "range": {
      const a = n.indexOf(Dn), s = (a === -1 ? n : n.slice(0, a)).trim(), l = (a === -1 ? "" : n.slice(a + Dn.length)).trim(), r = s === "" ? null : Number(s), i = l === "" ? null : Number(l);
      let o = r !== null && Number.isFinite(r) ? Ia(r, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? Ia(i, e.min, e.max) : null;
      return o !== null && u !== null && o > u && ([o, u] = [u, o]), { kind: "range", min: o, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function pr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(ws) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Dn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function vr(e, t, n = {}) {
  const a = Yn(t, n), s = new Map(ks(e)), l = s.get(Jn), r = l === void 0 ? a.entity : et(l), i = r === ys ? null : bt(t, r), o = s.get(ea), u = o && es(et(o)) ? et(o) : a.view, d = s.get(ta), m = rt(i, d ? et(d) : n.sort, t), k = s.get(na), y = k ? et(k) === "asc" ? "asc" : "desc" : a.dir, $ = s.get(aa), x = s.get(sa), _ = x === void 0 ? 1 : Number(et(x)), b = Number.isFinite(_) ? Math.max(1, Math.floor(_)) : 1, z = {};
  for (const P of i?.facets ?? []) {
    const A = s.get(`${la}${P.key}`);
    z[P.key] = A === void 0 ? Xn(P) : fr(P, A);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: m.key,
    dir: y,
    expr: $ === void 0 ? "" : et($),
    facets: os(i, z),
    page: b
  };
}
function Oa(e, t, n = {}, a = "") {
  const s = Yn(t, n), l = bt(t, e.entity), r = ks(a).filter(([m]) => !dr(m)), i = [], o = (m, k) => i.push([m, An(k)]), u = l?.key ?? null;
  u !== s.entity && o(Jn, u ?? ys), e.view !== s.view && o(ea, e.view), e.sort !== s.sort && o(ta, e.sort), e.dir !== s.dir && o(na, e.dir), e.expr.trim() !== "" && o(aa, e.expr);
  for (const m of l?.facets ?? []) {
    const k = e.facets[m.key];
    if (!k) continue;
    const y = pr(k, m);
    y !== null && i.push([`${la}${m.key}`, An(y)]);
  }
  e.page > 1 && o(sa, String(e.page));
  const d = [
    ...r.map(([m, k]) => [An(m), k]),
    ...i
  ];
  return d.length ? `?${d.map(([m, k]) => k === "" ? m : `${m}=${k}`).join("&")}` : "";
}
const _n = "entity", Ht = "expr";
function mr(e, t) {
  const n = e.label.toLowerCase();
  switch (t.kind) {
    case "chips":
      return t.selected.map((a) => ({
        id: `${e.key}:${a}`,
        label: `${n}:${a}`,
        facetKey: e.key,
        option: a
      }));
    case "range": {
      if (t.min === null && t.max === null) return [];
      const a = t.min !== null && t.max !== null ? `${t.min} ≤ ${n} ≤ ${t.max}` : t.max !== null ? `${n} ≤ ${t.max}` : `${n} ≥ ${t.min}`;
      return [{ id: e.key, label: a, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function ra(e, t) {
  const n = [];
  t && n.push({
    id: _n,
    label: `entity:${t.key}`,
    facetKey: _n
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && ss(s) && n.push(...mr(a, s));
  }
  return Fe(e.expr).forEach((a, s) => {
    a.forEach((l, r) => {
      n.push({
        id: `${Ht}:${s}:${r}`,
        label: Gt(l),
        facetKey: Ht,
        group: s,
        index: r,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function hr(e, t, n = null) {
  if (kn(e)) {
    const l = rt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = ra(e, t).filter((l) => l.facetKey !== Ht).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function gr(e) {
  const { adapter: t } = e, n = v(() => Dt(e.schema)), a = v(() => Dt(e.defaults) ?? {}), s = v(() => vr(t.search.value, n.value, a.value)), l = v(() => bt(n.value, s.value.entity)), r = v(() => l.value ?? ts(n.value, a.value)), i = v(() => as(l.value, n.value)), o = v(() => rt(l.value, s.value.sort, n.value)), u = (_, b) => {
    const z = Oa(_, n.value, a.value, t.search.value);
    z !== t.search.value && (b === "push" ? t.push(z) : t.replace(z));
  }, d = () => Dt(e.navigationMode) ?? "push", m = () => Dt(e.facetNavigationMode) ?? "replace", k = (_, b) => {
    const z = _.page ?? (Pa(_) ? 1 : s.value.page);
    u({ ...s.value, ..._, page: z }, b);
  }, y = (_, b) => {
    const z = s.value.facets[_];
    if (!z) return;
    const P = { ...s.value.facets, [_]: b(z) };
    k({ facets: P }, m());
  }, $ = (_) => {
    const b = _ === null ? null : bt(n.value, _);
    return (b?.key ?? null) === s.value.entity ? {} : {
      entity: b?.key ?? null,
      sort: rt(b, s.value.sort, n.value).key,
      facets: At(b)
    };
  }, x = (_) => {
    const b = $(_);
    Object.keys(b).length && k(b, d());
  };
  return {
    query: s,
    entity: l,
    focus: r,
    sort: o,
    sorts: i,
    summary: v(() => hr(s.value, l.value, n.value)),
    terms: v(() => ra(s.value, l.value)),
    isPristine: v(() => kn(s.value)),
    isEverything: v(() => s.value.entity === null),
    hasFacets: v(() => ls(s.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(_) {
      k({ view: _ }, d());
    },
    setSort(_) {
      k({ sort: rt(l.value, _, n.value).key }, d());
    },
    toggleDirection() {
      k({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(_) {
      k({ expr: _ }, d());
    },
    narrow(_, b, z) {
      k({ expr: _, ...$(b), ...z ? { view: z } : {} }, d());
    },
    setPage(_, b) {
      k({ page: Math.max(1, Math.floor(_)) }, b ?? d());
    },
    setFacet(_, b) {
      y(_, () => b);
    },
    toggleChip(_, b) {
      y(_, (z) => z.kind !== "chips" ? z : { kind: "chips", selected: z.selected.includes(b) ? z.selected.filter((A) => A !== b) : [...z.selected, b] });
    },
    setRange(_, b, z) {
      y(_, (P) => P.kind === "range" ? { kind: "range", min: b, max: z } : P);
    },
    toggleFlag(_) {
      y(
        _,
        (b) => b.kind === "toggle" ? { kind: "toggle", on: !b.on } : b
      );
    },
    removeTerm(_) {
      if (_.facetKey === _n) {
        x(null);
        return;
      }
      if (_.facetKey === Ht) {
        const b = Wl(Fe(s.value.expr), _.group ?? 0, _.index ?? 0);
        k({ expr: pt(b) }, d());
        return;
      }
      y(_.facetKey, (b) => b.kind === "chips" && _.option ? { kind: "chips", selected: b.selected.filter((z) => z !== _.option) } : b.kind === "range" ? { kind: "range", min: null, max: null } : b.kind === "toggle" ? { kind: "toggle", on: !1 } : b);
    },
    clearFilters() {
      k({ entity: null, expr: "", facets: At(null) }, d());
    },
    reset() {
      u(Yn(n.value, a.value), d());
    },
    hrefFor(_) {
      const b = { ...s.value, ..._ };
      return b.page = _.page ?? (Pa(_) ? 1 : s.value.page), b.facets = os(bt(n.value, b.entity), b.facets), `${t.path.value}${Oa(b, n.value, a.value, t.search.value)}`;
    }
  };
}
function _r(e) {
  const t = Et([]), n = q(0), a = q(!1), s = Et(null);
  let l = 0, r = null;
  const i = v(() => (e.query.value.page - 1) * e.limit.value), o = v(() => Ml(n.value, e.limit.value)), u = () => {
    const _ = e.query.value, b = e.within?.value.trim(), z = hs(e.entity.value, _.expr);
    return b ? { ..._, expr: Qn(b, z) } : z === _.expr ? _ : { ..._, expr: z };
  }, d = (_) => {
    t.value = _.rows, n.value = _.total, s.value = null;
  }, m = (_) => {
    s.value = _, t.value = [], n.value = 0;
  }, k = (_, b) => {
    let z = !0;
    const P = () => _ === l, A = () => {
      z && (z = !1, t.value = [], n.value = 0), s.value = null;
    };
    return {
      get open() {
        return P();
      },
      insert(D, W) {
        if (!P()) return;
        const E = Array.isArray(D) ? D : [D];
        if (!E.length) return;
        A();
        const N = [...t.value];
        N.splice(W ?? N.length, 0, ...E), t.value = b > 0 ? N.slice(0, b) : N, n.value += E.length;
      },
      set(D) {
        P() && (D.rows && (A(), t.value = b > 0 ? D.rows.slice(0, b) : D.rows, n.value = D.rows.length), D.total !== void 0 && (n.value = D.total));
      },
      close() {
        P() && (a.value = !1);
      },
      fail(D) {
        P() && (m(D), a.value = !1);
      }
    };
  }, y = () => {
    const _ = r;
    r = null, _?.();
  }, $ = () => {
    const _ = ++l;
    y();
    const b = {
      query: u(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, z = e.source.value;
    if (z.stream) {
      a.value = !0;
      try {
        r = z.stream(b, k(_, b.limit)) ?? null;
      } catch (A) {
        m(A), a.value = !1;
      }
      return;
    }
    let P;
    try {
      P = z.query(b);
    } catch (A) {
      m(A);
      return;
    }
    if (!(P instanceof Promise)) {
      d(P), a.value = !1;
      return;
    }
    a.value = !0, P.then((A) => {
      _ === l && d(A);
    }).catch((A) => {
      _ === l && m(A);
    }).finally(() => {
      _ === l && (a.value = !1);
    });
  }, x = v(() => {
    const _ = u();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(rs.map((z) => _[z]))}|${_.page}`;
  });
  return ke([e.source, x, e.limit], $, {
    immediate: !0
  }), Ya(() => {
    l++, y();
  }, !0), { rows: t, total: n, offset: i, pageCount: o, pending: a, error: s, refresh: $ };
}
const Bt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, yr = ["aria-label"], wr = ["role", "aria-label"], kr = ["data-dc-item"], br = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, $r = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], xr = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Cr = { class: "dc-menu__label dc-truncate" }, Mr = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Sr = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Er = /* @__PURE__ */ ie({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = q(null), r = q([]), i = q(null), o = q(null), u = q(null), d = q(!1), m = v(
      () => a.items.flatMap((E, N) => Bt(E) ? [N] : [])
    ), k = v(() => {
      const E = [{ entries: [] }];
      return a.items.forEach((N, le) => {
        N.heading ? E.push({ heading: N, entries: [] }) : E[E.length - 1]?.entries.push({ item: N, index: le });
      }), E.filter((N) => N.entries.length > 0);
    }), y = q({ x: a.at.x, y: a.at.y });
    async function $() {
      y.value = { x: a.at.x, y: a.at.y }, await Wt();
      const E = l.value?.getBoundingClientRect();
      if (!E) return;
      const N = 8;
      let le = a.at.x, ae = a.at.y;
      if (le + E.width > window.innerWidth - N) {
        const he = a.at.mirrorX === void 0 ? null : a.at.mirrorX - E.width;
        le = he !== null && he >= N ? he : window.innerWidth - E.width - N;
      }
      ae + E.height > window.innerHeight - N && (ae = window.innerHeight - E.height - N), y.value = { x: Math.max(N, le), y: Math.max(N, ae) };
    }
    const x = v(() => ({ left: `${y.value.x}px`, top: `${y.value.y}px` }));
    function _(E) {
      i.value = E, E !== null && Wt(() => r.value[E]?.focus());
    }
    function b(E, N) {
      const le = m.value;
      if (le.length === 0) return null;
      if (E === null) return N === 1 ? le[0] ?? null : le[le.length - 1] ?? null;
      const ae = le.indexOf(E);
      return ae === -1 ? le[0] ?? null : le[(ae + N + le.length) % le.length] ?? null;
    }
    function z(E, N) {
      if (!a.items[E]?.items?.length) return;
      const ae = r.value[E]?.getBoundingClientRect(), he = l.value?.getBoundingClientRect();
      !ae || !he || (u.value = { x: he.right - 4, y: ae.top - 4, mirrorX: he.left + 4 }, o.value = E, d.value = N);
    }
    function P(E) {
      const N = o.value;
      o.value = null, u.value = null, E && N !== null && _(N);
    }
    function A(E) {
      const N = a.items[E];
      if (!(!N || !Bt(N))) {
        if (N.items?.length) {
          z(E, !0);
          return;
        }
        s("choose", N);
      }
    }
    function D(E) {
      const N = E.key;
      if (N === "Escape") {
        E.preventDefault(), E.stopPropagation(), o.value !== null ? P(!0) : s("dismiss");
        return;
      }
      if (N === "ArrowDown" || N === "ArrowUp") {
        E.preventDefault(), E.stopPropagation(), P(!1), _(b(i.value, N === "ArrowDown" ? 1 : -1));
        return;
      }
      if (N === "Home" || N === "End") {
        E.preventDefault(), E.stopPropagation(), P(!1), _(b(null, N === "Home" ? 1 : -1));
        return;
      }
      if (N === "ArrowRight") {
        const le = i.value;
        le !== null && a.items[le]?.items?.length && (E.preventDefault(), E.stopPropagation(), z(le, !0));
        return;
      }
      if (N === "ArrowLeft") {
        o.value !== null && (E.preventDefault(), E.stopPropagation(), P(!0));
        return;
      }
      if (N === "Enter" || N === " ") {
        const le = i.value;
        if (le === null) return;
        E.preventDefault(), E.stopPropagation(), A(le);
      }
    }
    function W(E) {
      const N = a.items[E];
      !N || !Bt(N) || (o.value !== null && o.value !== E && P(!1), _(E), N.items?.length && z(E, !1));
    }
    return gl(() => {
      $(), a.autofocus && _(b(null, 1));
    }), ke(() => a.at, $, { deep: !0 }), ke(() => a.items, () => void $(), { deep: !0 }), Ue(() => {
      o.value = null;
    }), t({ root: l }), (E, N) => {
      const le = Qa("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(x.value),
        onKeydown: D
      }, [
        (f(!0), h(ne, null, ve(k.value, (ae, he) => (f(), h("div", {
          key: `${he}-${ae.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: ae.heading ? "group" : "none",
          "aria-label": ae.heading?.label
        }, [
          ae.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": ae.heading.id
          }, F(ae.heading.label), 9, kr)) : L("", !0),
          (f(!0), h(ne, null, ve(ae.entries, ({ item: X, index: ye }) => (f(), h(ne, {
            key: X.id ?? `${ye}-${X.label ?? ""}`
          }, [
            X.separator ? (f(), h("div", br)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (Ee) => {
                Ee && (r.value[ye] = Ee);
              },
              type: "button",
              class: "dc-menu__item",
              role: X.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": X.checked === void 0 ? void 0 : X.checked,
              "aria-haspopup": X.items?.length ? "menu" : void 0,
              "aria-expanded": X.items?.length ? o.value === ye : void 0,
              "aria-disabled": X.disabled ? "true" : void 0,
              disabled: X.disabled,
              "data-dc-item": X.id,
              tabindex: "-1",
              onClick: (Ee) => A(ye),
              onMouseenter: (Ee) => W(ye)
            }, [
              w("span", xr, F(X.checked ? "✓" : ""), 1),
              w("span", Cr, F(X.label), 1),
              X.shortcut ? (f(), h("span", Mr, F(X.shortcut), 1)) : X.items?.length ? (f(), h("span", Sr, "›")) : L("", !0)
            ], 40, $r))
          ], 64))), 128))
        ], 8, wr))), 128)),
        o.value !== null && u.value ? (f(), se(le, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: u.value,
          label: e.items[o.value]?.label,
          autofocus: d.value,
          onChoose: N[0] || (N[0] = (ae) => s("choose", ae)),
          onDismiss: N[1] || (N[1] = (ae) => P(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
      ], 44, yr);
    };
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, oa = /* @__PURE__ */ de(Er, [["__scopeId", "data-v-9b1413fa"]]), Pr = { class: "dc-pick" }, Ar = ["id"], Tr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], zr = { class: "dc-pick__label" }, Lr = /* @__PURE__ */ ie({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Un() ?? "dc-pick", l = q(null), r = q(null), i = q(null), o = q(!1), u = v(() => i.value !== null), d = v(
      () => n.options.find((P) => P.key === n.modelValue) ?? n.options[0]
    ), m = v(
      () => n.options.map((P) => ({
        id: P.key,
        label: P.label,
        checked: P.key === n.modelValue
      }))
    ), k = v(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function y(P) {
      const A = l.value?.getBoundingClientRect();
      A && (i.value = { x: A.left, y: A.bottom + 4, mirrorX: A.right }, o.value = P, a("open"));
    }
    function $(P) {
      i.value = null, P && l.value?.focus();
    }
    function x() {
      u.value ? $(!0) : y(!1);
    }
    function _(P) {
      P.key !== "ArrowDown" && P.key !== "ArrowUp" || u.value || (P.preventDefault(), y(!0));
    }
    function b(P) {
      const A = P.target;
      A && (l.value?.contains(A) || r.value?.root?.contains(A) || $(!1));
    }
    ke(u, (P) => {
      P ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), Ue(() => window.removeEventListener("pointerdown", b, !0));
    function z(P) {
      $(!0), !(P.id === void 0 || P.id === n.modelValue) && a("update:modelValue", P.id);
    }
    return (P, A) => (f(), h("span", Pr, [
      w("span", {
        id: `${M(s)}-name`,
        class: "dc-pick__name"
      }, F(e.label), 9, Ar),
      w("button", {
        id: `${M(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: Pt(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": u.value,
        "aria-labelledby": `${M(s)}-name ${M(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: x,
        onKeydown: _
      }, [
        w("span", zr, F(d.value?.label), 1)
      ], 42, Tr),
      A[1] || (A[1] = w("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      i.value ? (f(), se(oa, {
        key: 0,
        ref_key: "menu",
        ref: r,
        class: "dc-pick__list",
        style: Re(k.value),
        items: m.value,
        at: i.value,
        label: e.label,
        autofocus: o.value,
        onChoose: z,
        onDismiss: A[0] || (A[0] = (D) => $(!0))
      }, null, 8, ["style", "items", "at", "label", "autofocus"])) : L("", !0)
    ]));
  }
}), Tn = /* @__PURE__ */ de(Lr, [["__scopeId", "data-v-86680e46"]]);
function Rr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = q(!0);
  let a = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++a, r = e.query.value, i = e.schema.value, o = e.entities.value, u = e.within?.value.trim() ?? "";
    n.value = kn(r) && !u;
    const d = /* @__PURE__ */ new Map();
    for (const m of o) {
      const k = hs(m, r.expr), y = u ? Qn(u, k) : k, $ = e.source.value.query({
        query: { ...r, entity: m.key, expr: y, facets: At(m), page: 1 },
        schema: i,
        entity: m,
        limit: 0,
        offset: 0
      });
      $ instanceof Promise ? (d.set(m.key, { total: 0, pending: !0 }), $.then((x) => {
        if (l !== a) return;
        const _ = new Map(t.value);
        _.set(m.key, { total: x.total, pending: !1 }), t.value = _;
      })) : d.set(m.key, { total: $.total, pending: !1 });
    }
    t.value = d;
  } };
}
const Fr = 25, bs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Nr(e, t) {
  return e.find((n) => bs(n.id, t));
}
function Dr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== Ht || !i.field || !i.value) return null;
    const o = gs(e.schema.value, i.field);
    return o ? { entity: o, id: i.value, key: `${o.key}:${i.value}` } : null;
  }, s = (i) => {
    const { entity: o, id: u } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: vs(o, u) ?? "",
        facets: At(o),
        sort: rt(o, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: Fr,
      offset: 0
    });
  }, l = (i, o) => {
    const u = dn(Ie(i.columns ?? [], "identity"), o);
    return u === Fn || bs(u, o.id) ? "" : u;
  }, r = () => {
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = a(d);
      m && !t.value.has(m.key) && !n.has(m.key) && i.set(m.key, m);
    }
    if (!i.size) return;
    const o = [...i.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), u = (d) => {
      const m = new Map(t.value);
      d.forEach((k, y) => {
        const { reference: $ } = o[y], x = Nr(k.rows, $.id);
        m.set($.key, x ? l($.entity, x) : "");
      }), t.value = m;
    };
    if (o.every(({ outcome: d }) => !(d instanceof Promise))) {
      u(o.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of o) n.add(d.key);
    Promise.all(o.map(({ outcome: d }) => Promise.resolve(d))).then(u).catch(() => {
    }).finally(() => {
      for (const { reference: d } of o) n.delete(d.key);
    });
  };
  return ke([e.source, e.schema, e.terms], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const o = a(i);
      return o && t.value.get(o.key) || null;
    }
  };
}
const Ir = ["data-dc-expanded"], Or = { class: "dc-header__domain" }, Br = {
  key: 0,
  class: "dc-header__within"
}, Kr = ["title"], Vr = ["data-dc-more", "title"], qr = ["title", "aria-label"], Wr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Ur = ["title", "aria-label", "onClick"], Hr = ["onKeydown"], jr = ["aria-expanded", "aria-controls"], Xr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Gr = { class: "dc-header__sr" }, Yr = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Qr = ["disabled"], Zr = ["title"], Jr = ["value", "onKeydown"], eo = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, to = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, no = ["disabled"], ao = {
  key: 1,
  class: "dc-header__actions"
}, so = /* @__PURE__ */ ie({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean },
    views: {},
    pagesNote: {}
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = be(), l = v(() => s.schema.value), r = v(
      () => s.hasFacets.value || !!s.query.value.expr.trim() || !!s.within.value
    ), i = v(() => l.value.formatCount ?? wt), o = Rr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      entities: s.entities,
      within: s.within
    });
    function u(T) {
      if (n.hideCount) return T.count;
      if (T.key === s.query.value.entity && r.value) return i.value(s.total.value);
      if (o.pristine.value) return T.count;
      const j = o.counts.value.get(T.key);
      return j ? `${j.pending ? "~" : ""}${i.value(j.total)}` : T.count;
    }
    function d(T) {
      return `${T.label} · ${u(T)}`;
    }
    const m = v(() => s.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${i.value(s.total.value)}`), k = v(() => [
      { key: "", label: m.value },
      ...s.entities.value.map((T) => ({ key: T.key, label: d(T) }))
    ]), y = v(() => {
      const T = s.within.value.trim();
      return T ? ra({ ...s.query.value, expr: T, facets: {} }, null) : [];
    }), $ = v(
      () => (n.views ?? [...Ja]).map((T) => ({ key: T, label: xl[T] }))
    ), x = v(() => jn(s.query.value.view, n.views)), _ = v(
      () => !(s.within.value && s.query.value.entity === null && x.value === "cards")
    );
    function b(T) {
      s.setView(T);
    }
    const z = v(
      () => s.sorts.value.map((T) => ({ key: T.key, label: T.label }))
    ), P = v(
      () => z.value.length > 0 && s.query.value.entity !== null && !s.within.value
    );
    function A(T) {
      s.setSort(T);
    }
    const D = v(() => s.query.value.dir === "desc"), W = v(() => {
      const T = s.entity.value?.scope?.toLowerCase();
      return s.terms.value.filter((K) => K.facetKey !== _n).map((K, j, qe) => {
        const Ft = qe[j - 1];
        return {
          term: K,
          or: Ft?.group !== void 0 && K.group !== void 0 && K.group !== Ft.group,
          idle: !!T && K.field?.toLowerCase() === T
        };
      });
    }), E = Dr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...y.value, ...s.terms.value])
    });
    function N(T) {
      return gs(l.value, T)?.scopeLabel ?? T;
    }
    function le(T) {
      return T.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function ae(T) {
      const K = E.nameOf(T);
      return K ? `${T.negated ? "-" : ""}${N(T.field)}: ${le(K)}` : T.label;
    }
    function he(T) {
      s.setEntity(T || null);
    }
    const X = q(""), ye = q(null);
    function Ee() {
      const T = X.value.trim();
      T && (s.setExpression(jl(s.query.value.expr, T)), X.value = "");
    }
    function C() {
      X.value = "", ye.value?.blur();
    }
    function O(T) {
      if (X.value) return;
      const K = W.value.at(-1);
      K && (T.preventDefault(), s.removeTerm(K.term));
    }
    function Y(T) {
      T.target?.closest("button, select, label, input") || a("toggle");
    }
    const ee = q(null), ge = q("");
    function Me() {
      const T = ee.value;
      if (!T) {
        ge.value = "";
        return;
      }
      const K = T.scrollLeft > 1, j = T.scrollWidth - T.clientWidth - T.scrollLeft > 1;
      ge.value = K && j ? "both" : K ? "start" : j ? "end" : "";
    }
    let ze = null;
    ke(
      ee,
      (T) => {
        ze?.disconnect(), ze = null, Me(), !(!T || typeof ResizeObserver > "u") && (ze = new ResizeObserver(Me), ze.observe(T));
      },
      { flush: "post" }
    ), ke(W, Me, { flush: "post" }), Ue(() => ze?.disconnect());
    const Ce = v(() => s.query.value.page), Xe = v(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !Gn(s.query.value)
    ), Ke = v(
      () => `${s.pending.value ? "~" : ""}${wt(s.pageCount.value)}`
    ), Ne = v(() => {
      let T = `Page ${wt(Ce.value)} of ${Ke.value}`;
      const K = s.rows.value.length;
      if (K) {
        const j = s.offset.value + 1, qe = `${s.pending.value ? "~" : ""}${wt(s.total.value)}`;
        T += ` — rows ${wt(j)} to ${wt(j + K - 1)} of ${qe}`;
      }
      return n.pagesNote ? `${T}
${n.pagesNote}` : T;
    }), Pe = q(null), Ve = v(() => Pe.value ?? String(Ce.value)), it = v(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function yt(T) {
      T.target.select();
    }
    function B(T) {
      const K = T.target, j = K.value.replace(/[^0-9]/g, "");
      K.value !== j && (K.value = j), Pe.value = j;
    }
    function U(T) {
      const K = T.target, j = Number(Pe.value);
      Pe.value = null;
      const qe = Number.isFinite(j) && j >= 1 ? Math.min(Math.trunc(j), Math.max(1, s.pageCount.value)) : Ce.value;
      K.value = String(qe), qe !== Ce.value && s.setPage(qe);
    }
    function te(T) {
      const K = T.target;
      Pe.value = null, K.value = String(Ce.value), K.blur();
    }
    return (T, K) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      w("div", {
        class: "dc-header__trigger",
        onClick: Y
      }, [
        w("span", Or, F(l.value.label), 1),
        y.value.length ? (f(), h("span", Br, [
          K[5] || (K[5] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(ne, null, ve(y.value, (j) => (f(), h("span", {
            key: `scope:${j.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: ae(j)
          }, F(ae(j)), 9, Kr))), 128))
        ])) : L("", !0),
        w("div", {
          ref_key: "termBar",
          ref: ee,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ge.value,
          title: M(s).summary.value,
          onScroll: Me
        }, [
          _.value ? (f(), se(Tn, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": M(s).query.value.entity ?? "",
            options: k.value,
            onOpen: M(o).refresh,
            "onUpdate:modelValue": he
          }, null, 8, ["model-value", "options", "onOpen"])) : L("", !0),
          ue(Tn, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": x.value,
            options: $.value,
            "onUpdate:modelValue": b
          }, null, 8, ["model-value", "options"]),
          P.value ? (f(), h(ne, { key: 1 }, [
            ue(Tn, {
              class: "dc-header__pick dc-header__sort-select",
              label: "Sort",
              mono: "",
              "model-value": M(s).sort.value.key,
              options: z.value,
              "onUpdate:modelValue": A
            }, null, 8, ["model-value", "options"]),
            w("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: D.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${D.value ? "descending" : "ascending"}`,
              onClick: K[0] || (K[0] = (j) => M(s).toggleDirection())
            }, F(D.value ? "↓" : "↑"), 9, qr)
          ], 64)) : L("", !0),
          (f(!0), h(ne, null, ve(W.value, (j) => (f(), h(ne, {
            key: j.term.id
          }, [
            j.or ? (f(), h("span", Wr, "or")) : L("", !0),
            w("button", {
              type: "button",
              class: Pt(["dc-term dc-mono", { "dc-term--idle": j.idle }]),
              title: j.idle ? `Not applied to ${M(s).entity.value?.label} — remove ${ae(j.term)}` : `Remove ${ae(j.term)}`,
              "aria-label": `Remove ${ae(j.term)}`,
              onClick: (qe) => M(s).removeTerm(j.term)
            }, F(ae(j.term)), 11, Ur)
          ], 64))), 128)),
          mn(w("input", {
            ref_key: "searchBox",
            ref: ye,
            "onUpdate:modelValue": K[1] || (K[1] = (j) => X.value = j),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Ye(Le(Ee, ["prevent"]), ["enter"]),
              Ye(Le(C, ["prevent"]), ["esc"]),
              Ye(O, ["backspace"])
            ]
          }, null, 40, Hr), [
            [hn, X.value]
          ])
        ], 40, Vr),
        w("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: K[2] || (K[2] = (j) => a("toggle"))
        }, [
          w("span", Xr, F(e.expanded ? "▲" : "▼"), 1),
          w("span", Gr, F(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, jr)
      ]),
      Xe.value ? (f(), h("nav", Yr, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: Ce.value <= 1,
          onClick: K[3] || (K[3] = (j) => M(s).setPage(Ce.value - 1))
        }, [...K[6] || (K[6] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Qr),
        w("span", {
          class: "dc-header__page dc-mono",
          title: Ne.value
        }, [
          w("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Re({ width: it.value }),
            value: Ve.value,
            onFocus: yt,
            onInput: B,
            onKeydown: [
              Ye(Le(U, ["prevent"]), ["enter"]),
              Ye(Le(te, ["prevent"]), ["esc"])
            ],
            onBlur: U
          }, null, 44, Jr),
          w("span", eo, "/ " + F(Ke.value), 1)
        ], 8, Zr),
        w("span", to, F(Ne.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: Ce.value >= M(s).pageCount.value,
          onClick: K[4] || (K[4] = (j) => M(s).setPage(Ce.value + 1))
        }, [...K[7] || (K[7] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, no)
      ])) : L("", !0),
      T.$slots.actions ? (f(), h("div", ao, [
        $e(T.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ], 8, Ir));
  }
}), $s = /* @__PURE__ */ de(so, [["__scopeId", "data-v-3af95220"]]), lo = { class: "dc-facet" }, ro = ["id"], oo = { class: "dc-facet__body" }, io = ["aria-labelledby"], co = ["aria-pressed", "data-dc-active", "onClick"], uo = ["aria-labelledby"], fo = ["aria-label", "placeholder", "onKeydown"], po = ["aria-label", "placeholder", "onKeydown"], vo = ["aria-checked"], mo = { class: "dc-switch__text" }, ho = ["data-dc-active"], go = /* @__PURE__ */ ie({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = v(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function l(m) {
      if (n.value.kind !== "chips") return;
      const k = s.value.has(m) ? n.value.selected.filter((y) => y !== m) : [...n.value.selected, m];
      a("update", { kind: "chips", selected: k });
    }
    const r = q(""), i = q("");
    ke(
      () => n.value,
      (m) => {
        m.kind === "range" && (r.value = m.min === null ? "" : m.min, i.value = m.max === null ? "" : m.max);
      },
      { immediate: !0, deep: !0 }
    );
    function o(m) {
      if (typeof m == "number") return Number.isFinite(m) ? m : null;
      const k = m.trim();
      if (!k) return null;
      const y = Number(k);
      return Number.isFinite(y) ? y : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const m = o(r.value), k = o(i.value);
      m === n.value.min && k === n.value.max || a("update", { kind: "range", min: m, max: k });
    }
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (m, k) => (f(), h("div", lo, [
      w("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, F(e.facet.label), 9, ro),
      w("div", oo, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), h(ne, null, ve(e.facet.options, (y) => (f(), h("button", {
            key: y,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(y),
            "data-dc-active": s.value.has(y) ? "true" : "false",
            onClick: ($) => l(y)
          }, F(y), 9, co))), 128))
        ], 8, io)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          mn(w("input", {
            "onUpdate:modelValue": k[0] || (k[0] = (y) => r.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: Ye(Le(u, ["prevent"]), ["enter"])
          }, null, 40, fo), [
            [hn, r.value]
          ]),
          k[2] || (k[2] = w("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          mn(w("input", {
            "onUpdate:modelValue": k[1] || (k[1] = (y) => i.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: Ye(Le(u, ["prevent"]), ["enter"])
          }, null, 40, po), [
            [hn, i.value]
          ])
        ], 8, uo)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          w("span", mo, F(e.facet.text), 1),
          w("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...k[3] || (k[3] = [
            w("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, ho)
        ], 8, vo)) : L("", !0)
      ])
    ]));
  }
}), xs = /* @__PURE__ */ de(go, [["__scopeId", "data-v-36d1334b"]]), _o = ["id"], yo = { class: "dc-panel__section dc-panel__rows" }, wo = { class: "dc-panel__row" }, ko = ["for"], bo = ["title", "aria-label", "onClick"], $o = ["id", "placeholder", "onKeydown"], xo = { class: "dc-panel__actions" }, Co = ["disabled"], Mo = {
  key: 0,
  class: "dc-panel__section"
}, So = /* @__PURE__ */ ie({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = jt(), s = be(), l = v(() => Ul(s.query.value.expr)), r = v(() => l.value.parts.map(Gt)), i = q(l.value.text), o = q(null);
    ke(
      () => l.value.text,
      (x) => {
        i.value = x;
      }
    );
    const u = v(() => i.value !== l.value.text);
    function d() {
      u.value && s.setExpression(Fa(l.value.parts, i.value)), n("close");
    }
    function m(x) {
      const { parts: _, text: b } = l.value;
      s.setExpression(Fa(_.filter((z, P) => P !== x), b));
    }
    function k(x) {
      const { parts: _ } = l.value;
      i.value || !_.length || (x.preventDefault(), m(_.length - 1));
    }
    function y() {
      i.value = "", s.clearFilters();
    }
    function $(x, _) {
      s.setFacet(x, _);
    }
    return Wt(() => o.value?.focus()), (x, _) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: _[2] || (_[2] = Ye(Le((b) => n("close"), ["stop"]), ["esc"]))
    }, [
      w("section", yo, [
        w("div", wo, [
          w("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, ko),
          w("div", {
            class: "dc-field",
            onMousedown: _[1] || (_[1] = Le((b) => o.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(ne, null, ve(r.value, (b, z) => (f(), h("button", {
              key: `${z}:${b}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${b}`,
              "aria-label": `Remove ${b}`,
              onClick: (P) => m(z)
            }, F(b), 9, bo))), 128)),
            mn(w("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: o,
              "onUpdate:modelValue": _[0] || (_[0] = (b) => i.value = b),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : M(s).schema.value.placeholder,
              onKeydown: [
                Ye(Le(d, ["prevent"]), ["enter"]),
                Ye(k, ["backspace"])
              ]
            }, null, 40, $o), [
              [hn, i.value]
            ])
          ], 32)
        ]),
        M(s).entity.value ? (f(!0), h(ne, { key: 0 }, ve(M(s).entity.value.facets, (b) => (f(), se(xs, {
          key: b.key,
          facet: b,
          value: M(s).query.value.facets[b.key],
          onUpdate: (z) => $(b.key, z)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : L("", !0),
        w("div", xo, [
          w("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          w("button", {
            type: "button",
            class: "dc-button",
            disabled: M(s).isPristine.value && !u.value,
            onClick: y
          }, " Reset ", 8, Co)
        ])
      ]),
      a["panel-section"] ? (f(), h("section", Mo, [
        $e(x.$slots, "panel-section", {}, void 0, !0)
      ])) : L("", !0)
    ], 40, _o));
  }
}), Cs = /* @__PURE__ */ de(So, [["__scopeId", "data-v-2642c02d"]]), Eo = ["checked", "indeterminate"], Ms = /* @__PURE__ */ ie({
  __name: "PageTick",
  setup(e) {
    const t = be(), n = v(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = v(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = v(() => n.value > 0 && !a.value);
    return (l, r) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: r[0] || (r[0] = (i) => M(t).selectPage(!a.value))
    }, null, 40, Eo));
  }
}), Po = {
  key: 0,
  class: "dc-actions"
}, Ao = {
  key: 0,
  class: "dc-actions__select"
}, To = {
  key: 0,
  class: "dc-actions__all"
}, zo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Lo = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Ro = { class: "dc-actions__ops" }, Fo = ["disabled"], No = ["disabled"], Do = /* @__PURE__ */ ie({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => n.entity.value), s = v(() => !Gn(n.query.value)), l = v(() => s.value && n.selectable.value), r = v(
      () => jn(n.query.value.view, t.views) === "table"
    ), i = v(
      () => s.value && (l.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), o = v(() => n.selection.value.ids.length), u = v(() => o.value ? `${o.value} selected` : r.value ? "None selected" : "Select all");
    function d(m) {
      return o.value ? `${m} ${o.value}` : m;
    }
    return (m, k) => i.value ? (f(), h("div", Po, [
      l.value ? (f(), h("div", Ao, [
        r.value ? (f(), h("span", Lo, F(u.value), 1)) : (f(), h("label", To, [
          ue(Ms),
          w("span", zo, F(u.value), 1)
        ])),
        o.value ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[0] || (k[0] = (y) => M(n).clearSelection())
        }, " Clear ")) : L("", !0)
      ])) : L("", !0),
      w("div", Ro, [
        a.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: k[1] || (k[1] = (y) => M(n).create(a.value))
        }, [
          k[4] || (k[4] = w("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + F(a.value.create), 1)
        ])) : L("", !0),
        a.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !o.value,
          onClick: k[2] || (k[2] = (y) => M(n).duplicate())
        }, F(d(a.value.duplicate)), 9, Fo)) : L("", !0),
        a.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !o.value,
          onClick: k[3] || (k[3] = (y) => M(n).delete())
        }, F(d(a.value.delete)), 9, No)) : L("", !0)
      ])
    ])) : L("", !0);
  }
}), Ss = /* @__PURE__ */ de(Do, [["__scopeId", "data-v-03ff2a91"]]);
function Io(e, t) {
  if (!e) return null;
  const n = Be(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Oo(e, t) {
  const n = Ie(t, "state"), a = Ie(t, "tint");
  return {
    identity: dn(Ie(t, "identity"), e),
    reference: dn(Ie(t, "reference"), e),
    metrics: is(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Xt(s, e)
    })),
    state: n ? Be(n, e) ?? null : null,
    updated: dn(Ie(t, "updated"), e),
    image: Io(Ie(t, "image"), e),
    tint: a ? Be(a, e) ?? null : null
  };
}
function Es(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: zl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: Pl(t),
    parts: Oo(e, l),
    pinned: a,
    selected: s
  };
}
function zt() {
  const e = be(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, a) => Es(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Bo = ["data-dc-status"], Ko = /* @__PURE__ */ ie({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, F(e.status), 9, Bo));
  }
}), Yt = /* @__PURE__ */ de(Ko, [["__scopeId", "data-v-23e59fbf"]]), Vo = ["title"], qo = { key: 1 }, Wo = /* @__PURE__ */ ie({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((o) => o.key === t.column.drill) ?? null), s = v(() => t.column.label ?? ""), l = v(() => Xt(t.column, t.entry.row));
    function r(i) {
      i.stopPropagation(), a.value && n.drill(t.entry.row, a.value, He(i));
    }
    return (i, o) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onClick: r
    }, [
      $e(i.$slots, "default", {}, () => [
        We(F(l.value), 1)
      ], !0)
    ], 8, Vo)) : (f(), h("span", qo, [
      $e(i.$slots, "default", {}, () => [
        We(F(l.value), 1)
      ], !0)
    ]));
  }
}), Qt = /* @__PURE__ */ de(Wo, [["__scopeId", "data-v-f2501b17"]]), Uo = ["data-dc-active", "aria-pressed", "aria-label"], Ho = /* @__PURE__ */ ie({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, l) => (f(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, F(e.pinned ? "★" : "☆"), 9, Uo));
  }
}), ia = /* @__PURE__ */ de(Ho, [["__scopeId", "data-v-ef63d763"]]), jo = ["src"], Xo = /* @__PURE__ */ ie({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = q(!1);
    return ke(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (f(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, jo)) : L("", !0);
  }
}), ca = /* @__PURE__ */ de(Xo, [["__scopeId", "data-v-afaab300"]]), Go = ["data-dc-standing", "title", "aria-label"], Yo = /* @__PURE__ */ ie({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => ps(t.entry.entity, t.entry.row)), s = v(() => lr(n.query.value.expr, a.value)), l = v(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(i) {
      i.stopPropagation(), n.setExpression(rr(n.query.value.expr, a.value));
    }
    return (i, o) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, F(s.value === "in" ? "+" : "−"), 9, Go)) : L("", !0);
  }
}), Zt = /* @__PURE__ */ de(Yo, [["__scopeId", "data-v-4b8d4166"]]), Qo = ["data-dc-pending", "title", "aria-label"], Zo = /* @__PURE__ */ ie({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = q(null);
    function l(u) {
      s.value = He(u).exclude ? "out" : "in";
    }
    function r(u) {
      l(u), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function i() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    Ue(i);
    function o(u) {
      u.stopPropagation(), n.drill(t.entry.row, null, He(u));
    }
    return (u, d) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: r,
      onPointermove: l,
      onPointerleave: i,
      onClick: o
    }, " → ", 40, Qo)) : L("", !0);
  }
}), Jt = /* @__PURE__ */ de(Zo, [["__scopeId", "data-v-9efd42ac"]]), Jo = ["checked", "aria-label"], Lt = /* @__PURE__ */ ie({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, l) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Jo));
  }
}), ei = { class: "dc-cards" }, ti = { class: "dc-card__top dc-mono" }, ni = { class: "dc-card__lead" }, ai = {
  key: 1,
  class: "dc-card__entity"
}, si = { class: "dc-card__top-right" }, li = ["onClick"], ri = { class: "dc-card__names" }, oi = { class: "dc-card__primary" }, ii = { class: "dc-card__secondary dc-mono" }, ci = { class: "dc-card__metrics dc-mono" }, ui = {
  key: 0,
  class: "dc-card__date"
}, di = /* @__PURE__ */ ie({
  __name: "CardsView",
  setup(e) {
    const t = be(), n = zt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", ei, [
      (f(!0), h(ne, null, ve(M(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-card"
      }, [
        w("div", ti, [
          w("span", ni, [
            M(t).selectable.value ? (f(), se(Lt, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            We(" " + F(r.ordinal) + " ", 1),
            a.value ? (f(), h("span", ai, F(r.entityLabel), 1)) : L("", !0)
          ]),
          w("span", si, [
            r.parts.state ? (f(), se(Yt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : L("", !0),
            ue(Zt, { entry: r }, null, 8, ["entry"]),
            ue(Jt, { entry: r }, null, 8, ["entry"]),
            M(t).pinnable.value ? (f(), se(ia, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        w("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => M(t).activate(r.row, M(He)(i))
        }, [
          r.parts.image ? (f(), se(ca, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : L("", !0),
          w("span", ri, [
            w("span", oi, F(r.parts.identity), 1),
            w("span", ii, F(r.parts.reference), 1)
          ])
        ], 8, li),
        w("div", ci, [
          (f(!0), h(ne, null, ve(r.parts.metrics.slice(0, 2), (i) => (f(), se(Qt, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, {
            default: Qe(() => [
              We(F(i.label) + " " + F(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), h("span", ui, F(r.parts.updated), 1)) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Ps = /* @__PURE__ */ de(di, [["__scopeId", "data-v-28581543"]]), fi = { class: "dc-grid" }, pi = ["onClick"], vi = { class: "dc-tile__scrim" }, mi = { class: "dc-tile__top dc-mono" }, hi = { class: "dc-tile__chip" }, gi = { class: "dc-tile__caption" }, _i = { class: "dc-tile__secondary dc-truncate" }, yi = { class: "dc-tile__primary" }, wi = /* @__PURE__ */ ie({
  __name: "GridView",
  setup(e) {
    const t = be(), n = zt();
    return (a, s) => (f(), h("div", fi, [
      (f(!0), h(ne, null, ve(M(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        w("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => M(t).activate(l.row, M(He)(r))
        }, [
          l.parts.image ? (f(), se(ca, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : L("", !0),
          w("span", vi, [
            w("span", mi, [
              w("span", hi, F(l.ordinal), 1)
            ]),
            w("span", gi, [
              w("span", _i, F(l.parts.reference), 1),
              w("span", yi, F(l.parts.identity), 1)
            ])
          ])
        ], 12, pi),
        M(t).selectable.value ? (f(), se(Lt, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), As = /* @__PURE__ */ de(wi, [["__scopeId", "data-v-7df25d40"]]), ki = { class: "dc-links" }, bi = ["onClick"], $i = { class: "dc-link__primary dc-truncate" }, xi = { class: "dc-link__secondary dc-mono dc-truncate" }, Ci = /* @__PURE__ */ ie({
  __name: "LinksView",
  setup(e) {
    const t = be(), n = zt();
    return (a, s) => (f(), h("div", ki, [
      (f(!0), h(ne, null, ve(M(n), (l) => (f(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        M(t).selectable.value ? (f(), se(Lt, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        w("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => M(t).activate(l.row, M(He)(r))
        }, [
          w("span", $i, F(l.parts.identity), 1),
          w("span", xi, F(l.parts.reference), 1)
        ], 8, bi)
      ]))), 128))
    ]));
  }
}), Ts = /* @__PURE__ */ de(Ci, [["__scopeId", "data-v-08d0266c"]]), Mi = {
  class: "dc-list",
  role: "list"
}, Si = ["onClick"], Ei = { class: "dc-list__ordinal dc-mono" }, Pi = { class: "dc-list__identity" }, Ai = { class: "dc-list__primary dc-truncate" }, Ti = { class: "dc-list__secondary dc-mono dc-truncate" }, zi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Li = { class: "dc-list__metrics dc-mono" }, Ri = { class: "dc-list__trailing" }, Fi = /* @__PURE__ */ ie({
  __name: "ListView",
  setup(e) {
    const t = be(), n = zt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", Mi, [
      (f(!0), h(ne, null, ve(M(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        M(t).selectable.value ? (f(), se(Lt, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        w("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => M(t).activate(r.row, M(He)(i))
        }, [
          w("span", Ei, F(r.ordinal), 1),
          w("span", Pi, [
            w("span", Ai, F(r.parts.identity), 1),
            w("span", Ti, F(r.parts.reference), 1)
          ])
        ], 8, Si),
        a.value ? (f(), h("span", zi, F(r.entityLabel), 1)) : L("", !0),
        w("span", Li, [
          (f(!0), h(ne, null, ve(r.parts.metrics.slice(0, 2), (i) => (f(), se(Qt, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", Ri, [
          r.parts.state ? (f(), se(Yt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : L("", !0),
          ue(Zt, { entry: r }, null, 8, ["entry"]),
          ue(Jt, { entry: r }, null, 8, ["entry"]),
          M(t).pinnable.value ? (f(), se(ia, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), In = /* @__PURE__ */ de(Fi, [["__scopeId", "data-v-11b9f46c"]]), Ni = { class: "dc-preview" }, Di = { class: "dc-preview__pager dc-mono" }, Ii = ["disabled"], Oi = { "aria-live": "polite" }, Bi = ["disabled"], Ki = {
  key: 0,
  class: "dc-preview__card"
}, Vi = ["src"], qi = { class: "dc-preview__body" }, Wi = { class: "dc-preview__top" }, Ui = { class: "dc-preview__badges" }, Hi = { class: "dc-preview__entity dc-mono" }, ji = { class: "dc-preview__marks" }, Xi = { class: "dc-preview__primary" }, Gi = { class: "dc-preview__secondary dc-mono" }, Yi = { class: "dc-preview__fields" }, Qi = { class: "dc-preview__key" }, Zi = { class: "dc-preview__value dc-mono" }, Ji = /* @__PURE__ */ ie({
  __name: "PreviewView",
  setup(e) {
    const t = be(), n = zt(), a = q(0);
    ke(n, (o) => {
      a.value > o.length - 1 && (a.value = Math.max(0, o.length - 1));
    });
    const s = v(() => n.value[a.value]), l = v(() => {
      const o = s.value;
      if (!o) return [];
      const u = Ie(o.columns, "reference"), d = Ie(o.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), r = v(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const u = n.value.length;
      u && (a.value = Math.min(u - 1, Math.max(0, a.value + o)));
    };
    return (o, u) => (f(), h("div", Ni, [
      w("div", Di, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: u[0] || (u[0] = (d) => i(-1))
        }, " ‹ ", 8, Ii),
        w("span", Oi, F(r.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= M(n).length - 1,
          onClick: u[1] || (u[1] = (d) => i(1))
        }, " › ", 8, Bi)
      ]),
      s.value ? (f(), h("div", Ki, [
        w("div", {
          class: "dc-preview__media",
          style: Re({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Vi)) : (f(), h(ne, { key: 1 }, [
            We(" preview ")
          ], 64))
        ], 4),
        w("div", qi, [
          w("div", Wi, [
            w("span", Ui, [
              M(t).selectable.value ? (f(), se(Lt, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              s.value.parts.state ? (f(), se(Yt, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              w("span", Hi, F(s.value.entityLabel), 1)
            ]),
            w("span", ji, [
              ue(Zt, { entry: s.value }, null, 8, ["entry"]),
              ue(Jt, { entry: s.value }, null, 8, ["entry"]),
              M(t).pinnable.value ? (f(), se(ia, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          w("div", null, [
            w("div", Xi, F(s.value.parts.identity), 1),
            w("div", Gi, F(s.value.parts.reference), 1)
          ]),
          w("dl", Yi, [
            (f(!0), h(ne, null, ve(l.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", Qi, F(d.key), 1),
              w("dd", Zi, [
                d.column && s.value ? (f(), se(Qt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(ne, { key: 1 }, [
                  We(F(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          w("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => M(t).activate(s.value.row, M(He)(d)))
          }, " Open record → ")
        ])
      ])) : L("", !0)
    ]));
  }
}), zs = /* @__PURE__ */ de(Ji, [["__scopeId", "data-v-6be41155"]]);
function ec() {
  const e = be();
  return v(() => Al(e.schema.value, e.entity.value));
}
const tc = ["title"], nc = {
  key: 5,
  class: "dc-cell__text"
}, ac = /* @__PURE__ */ ie({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => t.column.kind ?? "text"), s = v(() => Be(t.column, t.entry.row)), l = v(
      () => a.value === "ordinal" ? t.entry.ordinal : Xt(t.column, t.entry.row)
    ), r = v(() => s.value), i = v(() => t.column.activate === !0 || !!t.column.click), o = v(() => Nn(t.column)), u = v(() => cs(t.column, t.entry.row));
    function d(m) {
      if (!i.value) return;
      m.stopPropagation();
      const k = He(m);
      t.column.click?.(t.entry.row, k), t.column.activate && n.activate(t.entry.row, k);
    }
    return (m, k) => a.value === "component" && e.column.component ? (f(), se(Hn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), se(Yt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), se(ca, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Re({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), se(Qt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: Pt(["dc-table__open", { "dc-truncate": o.value }]),
      title: u.value,
      onClick: d
    }, F(l.value), 11, tc)) : (f(), h("span", nc, F(l.value), 1));
  }
}), Ba = /* @__PURE__ */ de(ac, [["__scopeId", "data-v-70ba8aa2"]]), sc = {
  key: 0,
  class: "dc-table__none"
}, lc = { class: "dc-table__detail" }, rc = ["data-dc-wrap"], oc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, ic = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], cc = ["onClick"], uc = {
  key: 2,
  class: "dc-table__head"
}, dc = ["onClick"], fc = {
  key: 0,
  class: "dc-table__pick"
}, pc = ["data-dc-align", "data-dc-hide", "title"], vc = {
  key: 0,
  class: "dc-table__name"
}, mc = /* @__PURE__ */ ie({
  __name: "TableView",
  setup(e) {
    const t = be(), n = zt(), a = ec(), s = v(
      () => a.value.find((y) => y.scope) ?? Ie(a.value, "identity")
    ), l = v(
      () => a.value.some((y) => y.kind === "image" || y.height !== void 0)
    );
    function r(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const i = v(() => t.entity.value?.label ?? "The result set"), o = v(() => new Set(t.sorts.value.map((y) => y.key))), u = (y) => y.sort !== void 0 && o.value.has(y.sort), d = (y) => {
      if (u(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function m(y) {
      return [
        za(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        Nn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function k(y, $) {
      if (!(!Nn(y) || y.activate || y.click))
        return cs(y, $.row);
    }
    return (y, $) => M(a).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": l.value ? "" : void 0
    }, [
      w("thead", null, [
        w("tr", null, [
          M(t).selectable.value ? (f(), h("th", oc, [
            ue(Ms)
          ])) : L("", !0),
          (f(!0), h(ne, null, ve(M(a), (x, _) => (f(), h("th", {
            key: M(Aa)(x, _),
            scope: "col",
            class: Pt(M(za)(x)),
            style: Re({ width: x.width }),
            "data-dc-align": M(Ta)(x),
            "data-dc-hide": x.hideBelow,
            "aria-sort": d(x),
            title: x.hint
          }, [
            u(x) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (b) => r(x.sort)
            }, F(x.label), 9, cc)) : (f(), h(ne, { key: 1 }, [
              We(F(x.label), 1)
            ], 64)),
            x.header ? (f(), h("span", uc, [
              (f(), se(Hn(x.header), {
                column: x,
                entity: M(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, ic))), 128))
        ])
      ]),
      w("tbody", null, [
        (f(!0), h(ne, null, ve(M(n), (x) => (f(), h("tr", {
          key: x.key,
          class: "dc-table__row",
          onClick: (_) => M(t).activate(x.row, M(He)(_))
        }, [
          M(t).selectable.value ? (f(), h("td", fc, [
            ue(Lt, {
              row: x.row,
              selected: x.selected,
              name: x.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          (f(!0), h(ne, null, ve(M(a), (_, b) => (f(), h("td", {
            key: M(Aa)(_, b),
            class: Pt(m(_)),
            "data-dc-align": M(Ta)(_),
            "data-dc-hide": _.hideBelow,
            title: k(_, x)
          }, [
            _ === s.value ? (f(), h("span", vc, [
              ue(Ba, {
                column: _,
                entry: x
              }, null, 8, ["column", "entry"]),
              ue(Zt, { entry: x }, null, 8, ["entry"]),
              _.scope ? (f(), se(Jt, {
                key: 0,
                entry: x
              }, null, 8, ["entry"])) : L("", !0)
            ])) : (f(), se(Ba, {
              key: 1,
              column: _,
              entry: x
            }, null, 8, ["column", "entry"]))
          ], 10, pc))), 128))
        ], 8, dc))), 128))
      ])
    ], 8, rc)) : (f(), h("p", sc, [
      $[2] || ($[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", lc, [
        We(F(i.value) + " has no ", 1),
        $[0] || ($[0] = w("code", null, "columns", -1)),
        $[1] || ($[1] = We(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ls = /* @__PURE__ */ de(mc, [["__scopeId", "data-v-d92f9701"]]);
function hc(e) {
  const t = Et([]), n = q(!1), a = Et(null);
  let s = 0;
  const l = (o, u, d, m, k) => ({
    entity: o,
    rows: u.rows.map(
      (y, $) => Es(y, $, o, e.isPinned(y.id))
    ),
    total: u.total,
    count: d ? o.count : String(u.total),
    pinned: gc(m, u, k)
  }), r = () => {
    const o = ++s, u = e.query.value, d = e.schema.value, m = e.entities.value, k = e.limit.value, y = e.within?.value.trim() ?? "", $ = kn(u) && !y, x = y ? Qn(y, u.expr) : u.expr, _ = m.map((b) => ({
      entity: b,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: b.key, expr: x, facets: At(b), page: 1 },
        schema: d,
        entity: b,
        limit: k,
        offset: 0
      })
    }));
    if (_.every(({ outcome: b }) => !(b instanceof Promise))) {
      t.value = _.map(
        ({ entity: b, outcome: z }) => l(b, z, $, d, x)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(_.map(({ outcome: b }) => Promise.resolve(b))).then((b) => {
      o === s && (t.value = b.map(
        (z, P) => l(_[P].entity, z, $, d, x)
      ), a.value = null);
    }).catch((b) => {
      o === s && (a.value = b, t.value = []);
    }).finally(() => {
      o === s && (n.value = !1);
    });
  }, i = () => {
    try {
      r();
    } catch (o) {
      a.value = o, t.value = [], n.value = !1;
    }
  };
  return ke(
    [
      e.source,
      e.schema,
      e.query,
      e.entities,
      e.limit,
      () => e.within?.value
    ],
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: i };
}
function gc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Zn(e, a);
  return !!l && ms(s, l) === s;
}
const _c = ["data-dc-pending"], yc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, wc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, kc = {
  key: 2,
  class: "dc-types__state"
}, bc = ["data-dc-empty"], $c = ["onClick"], xc = { class: "dc-type__name" }, Cc = { class: "dc-type__count dc-mono" }, Mc = { class: "dc-type__sr" }, Sc = {
  key: 0,
  class: "dc-type__empty"
}, Ec = ["onClick"], Pc = { class: "dc-type__identity" }, Ac = { class: "dc-type__primary dc-truncate" }, Tc = { class: "dc-type__secondary dc-mono dc-truncate" }, zc = { class: "dc-type__trailing dc-mono" }, Lc = { class: "dc-type__metric-value" }, Rc = { class: "dc-type__metric-label" }, Fc = {
  key: 0,
  class: "dc-type__date"
}, Nc = ["onClick"], Dc = /* @__PURE__ */ ie({
  __name: "TypeCardsView",
  setup(e) {
    const t = be(), { previews: n, pending: a, error: s } = hc({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (i) => t.isPinnedId(i)
    }), l = v(() => !t.isPristine.value || !!t.within.value), r = v(
      () => n.value.filter(
        (i) => !i.pinned && (i.rows.length > 0 || i.entity.create)
      )
    );
    return (i, o) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": M(a) ? "true" : "false"
    }, [
      $e(i.$slots, "before", {}, void 0, !0),
      M(s) ? (f(), h("p", yc, " Could not load results: " + F(M(s) instanceof Error ? M(s).message : "the data source failed."), 1)) : !r.value.length && M(a) ? (f(), h("p", wc, " Running query… ")) : r.value.length ? L("", !0) : (f(), h("p", kc, F(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(ne, null, ve(r.value, (u) => (f(), h("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        w("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => M(t).setEntity(u.entity.key)
        }, [
          w("span", xc, F(u.entity.label), 1),
          w("span", Cc, F(u.count), 1),
          o[0] || (o[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", Mc, "Show only " + F(u.entity.label.toLowerCase()), 1)
        ], 8, $c),
        u.rows.length ? L("", !0) : (f(), h("p", Sc, F(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(ne, null, ve(u.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (m) => M(t).activate(d.row, M(He)(m))
          }, [
            w("span", Pc, [
              w("span", Ac, F(d.parts.identity), 1),
              w("span", Tc, F(d.parts.reference), 1)
            ])
          ], 8, Ec),
          w("span", zc, [
            (f(!0), h(ne, null, ve(d.parts.metrics.slice(0, 1), (m) => (f(), se(Qt, {
              key: m.column.key ?? m.label,
              class: "dc-type__metric",
              entry: d,
              column: m.column
            }, {
              default: Qe(() => [
                w("span", Lc, F(m.text), 1),
                w("span", Rc, F(m.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", Fc, F(d.parts.updated), 1)) : L("", !0),
            ue(Zt, { entry: d }, null, 8, ["entry"]),
            ue(Jt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => M(t).create(u.entity)
        }, [
          o[1] || (o[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + F(u.entity.create), 1)
        ], 8, Nc)) : L("", !0)
      ], 8, bc))), 128)),
      $e(i.$slots, "after", {}, void 0, !0)
    ], 8, _c));
  }
}), Rs = /* @__PURE__ */ de(Dc, [["__scopeId", "data-v-c7b8f990"]]), Ic = ["data-dc-pending"], Oc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Bc = { class: "dc-results__detail" }, Kc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Vc = {
  key: 3,
  class: "dc-results__state"
}, qc = { class: "dc-results__detail" }, Wc = /* @__PURE__ */ ie({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = jt(), s = {
      list: In,
      cards: Ps,
      grid: As,
      table: Ls,
      links: Ts,
      preview: zs
    }, l = v(() => Gn(n.query.value)), r = v(() => jn(n.query.value.view, t.views)), i = v(() => s[r.value] ?? In), o = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = q(null);
    return ke(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (m, k) => (f(), h("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": M(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), se(Rs, { key: 0 }, cn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Qe(() => [
            $e(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Qe(() => [
            $e(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), h("p", Oc, [
        k[1] || (k[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", Bc, F(M(n).error.value instanceof Error ? M(n).error.value.message : "The data source failed."), 1)
      ])) : !o.value && M(n).pending.value ? (f(), h("p", Kc, [...k[2] || (k[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (f(), se(Hn(i.value), { key: 4 })) : (f(), h("div", Vc, [
        k[3] || (k[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", qc, F(M(n).summary.value), 1),
        M(n).isPristine.value ? L("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: k[0] || (k[0] = (y) => M(n).clearFilters())
        }, F(M(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Ic));
  }
}), Fs = /* @__PURE__ */ de(Wc, [["__scopeId", "data-v-41f54508"]]), Uc = ["data-dc-theme"], Hc = ["data-dc-width", "data-dc-align"], jc = { class: "dc-shell__panel" }, Xc = /* @__PURE__ */ ie({
  __name: "DataShell",
  props: /* @__PURE__ */ gn({
    schema: {},
    source: {},
    route: {},
    defaults: {},
    within: {},
    limit: { default: 50 },
    previewsPerType: { default: 3 },
    views: {},
    accent: {},
    tokens: {},
    theme: { default: "minimal" },
    matchWidth: { default: "grow" },
    headAlign: { default: "center" },
    pinnable: { type: Boolean },
    selectable: { type: Boolean },
    rowPress: { default: "narrow" },
    pagesNote: {},
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    open: { type: Boolean, default: !1 },
    openModifiers: {},
    pinned: { default: () => [] },
    pinnedModifiers: {},
    selected: { default: () => [] },
    selectedModifiers: {}
  }),
  emits: /* @__PURE__ */ gn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Ot(e, "open"), r = Ot(e, "pinned"), i = Ot(e, "selected"), o = jt(), u = St(Za, null), d = a.route || u ? null : bl(), m = a.route ?? u ?? d;
    Ue(() => d?.dispose?.());
    const k = v(() => ar({ seed: a.schema.key })), y = v(() => a.source ?? k.value), $ = gr({
      schema: () => a.schema,
      adapter: m,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), x = v(() => a.within?.trim() ?? ""), _ = _r({
      source: y,
      query: $.query,
      schema: v(() => a.schema),
      entity: $.entity,
      limit: v(() => a.limit),
      within: x
    });
    ke($.query, (C) => s("query-change", C)), ke(
      [_.pageCount, _.pending, $.query],
      () => {
        if (_.pending.value) return;
        const C = _.pageCount.value;
        $.query.value.page > C && $.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const b = Un() ?? "dc-query-panel", z = q(null);
    function P() {
      l.value && (l.value = !1, Wt(() => {
        z.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const A = v(() => new Set(r.value));
    function D(C) {
      const O = new Set(A.value);
      O.has(C.id) ? O.delete(C.id) : O.add(C.id), r.value = [...O], s("toggle-pin", C);
    }
    const W = v(() => {
      if (a.selectable === !0) return !0;
      const C = $.entity.value;
      return !!(C?.duplicate || C?.delete);
    }), E = v(() => new Set(i.value));
    function N(C) {
      const O = new Set(E.value);
      O.has(C.id) ? O.delete(C.id) : O.add(C.id), i.value = [...O];
    }
    function le(C) {
      const O = new Set(E.value);
      for (const Y of _.rows.value)
        C ? O.add(Y.id) : O.delete(Y.id);
      i.value = [...O];
    }
    function ae() {
      i.value.length && (i.value = []);
    }
    const he = v(() => ({
      ids: [...i.value],
      rows: _.rows.value.filter((C) => E.value.has(C.id)),
      entity: $.entity.value
    }));
    ke(() => $.query.value.entity, ae);
    function X(C, O, Y = {}) {
      const ee = or(a.schema, $.query.value, C, Y);
      Y.exclude ? $.narrow(ee, O?.key ?? $.query.value.entity) : $.narrow(ee, O?.key ?? null, O ? void 0 : "cards"), s("drill", C, O, Y);
    }
    const ye = ir({
      ...$,
      schema: v(() => a.schema),
      entities: v(() => a.schema.entities),
      rows: _.rows,
      total: _.total,
      limit: v(() => a.limit),
      offset: _.offset,
      pageCount: _.pageCount,
      pending: _.pending,
      error: _.error,
      source: y,
      previewsPerType: v(() => a.previewsPerType),
      within: x,
      pinnable: v(() => a.pinnable === !0),
      isPinned: (C) => A.value.has(C.id),
      isPinnedId: (C) => A.value.has(C),
      togglePin: D,
      selectable: W,
      selection: he,
      isSelected: (C) => E.value.has(C.id),
      toggleSelect: N,
      selectPage: le,
      clearSelection: ae,
      narrowsOnPress: v(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C, O = {}) => {
        if (a.rowPress === "narrow" && Zn(a.schema, C)) {
          X(C, null, O);
          return;
        }
        s("activate", C);
      },
      create: (C) => s("create", C),
      duplicate: () => s("duplicate", he.value),
      delete: () => s("delete", he.value),
      drill: X
    }), Ee = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: $.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: P
    }), (C, O) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re(Ee.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ue($s, {
          ref_key: "headerRef",
          ref: z,
          expanded: l.value,
          "panel-id": M(b),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: O[0] || (O[0] = (Y) => l.value = !l.value)
        }, cn({ _: 2 }, [
          o.actions ? {
            name: "actions",
            fn: Qe(() => [
              $e(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), h(ne, { key: 0 }, [
          w("div", {
            class: "dc-shell__scrim",
            onClick: P
          }),
          w("div", jc, [
            ue(Cs, {
              "panel-id": M(b),
              onClose: P
            }, cn({ _: 2 }, [
              o["panel-section"] ? {
                name: "panel-section",
                fn: Qe(() => [
                  $e(C.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : L("", !0)
      ], 8, Hc),
      ue(Ss, { views: e.views }, null, 8, ["views"]),
      $e(C.$slots, "results", {
        rows: M(ye).rows.value,
        total: M(ye).total.value,
        offset: M(ye).offset.value,
        pageCount: M(ye).pageCount.value,
        query: M(ye).query.value,
        pending: M(ye).pending.value
      }, () => [
        ue(Fs, { views: e.views }, cn({ _: 2 }, [
          o["cards-before"] ? {
            name: "cards-before",
            fn: Qe(() => [
              $e(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          o["cards-after"] ? {
            name: "cards-after",
            fn: Qe(() => [
              $e(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Uc));
  }
}), Gc = /* @__PURE__ */ de(Xc, [["__scopeId", "data-v-68ec86d9"]]), Yc = ["data-dc-muted"], Qc = {
  key: 0,
  class: "dc-shell-card__head"
}, Zc = { class: "dc-shell-card__title" }, Jc = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, eu = {
  key: 0,
  class: "dc-shell-card__aside"
}, tu = ["data-dc-flush"], nu = {
  key: 2,
  class: "dc-shell-card__foot"
}, au = /* @__PURE__ */ ie({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), a = jt();
    function s(d) {
      return l(d?.() ?? []);
    }
    function l(d) {
      return d.some((m) => m.type === _l ? !1 : m.type === yl ? String(m.children ?? "").trim().length > 0 : m.type === ne ? l(m.children ?? []) : !0);
    }
    const r = v(() => !!t.title || i.value || s(a.head)), i = v(() => s(a.aside)), o = v(() => s(a.default)), u = v(() => s(a.foot));
    return (d, m) => (f(), h("section", {
      class: "dc-shell-card",
      style: Re(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), h("header", Qc, [
        $e(d.$slots, "head", {}, () => [
          w("h2", Zc, F(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Jc, F(e.count), 1)) : L("", !0)
        ], !0),
        i.value ? (f(), h("span", eu, [
          $e(d.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ])) : L("", !0),
      o.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        $e(d.$slots, "default", {}, void 0, !0)
      ], 8, tu)) : L("", !0),
      u.value ? (f(), h("footer", nu, [
        $e(d.$slots, "foot", {}, void 0, !0)
      ])) : L("", !0)
    ], 12, Yc));
  }
}), Od = /* @__PURE__ */ de(au, [["__scopeId", "data-v-75f2ef0b"]]), su = ["aria-label"], lu = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], ru = /* @__PURE__ */ ie({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = q([]);
    function l(r, i) {
      const o = n.options.length;
      let u = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? u = (i + 1) % o : r.key === "ArrowLeft" || r.key === "ArrowUp" ? u = (i - 1 + o) % o : r.key === "Home" ? u = 0 : r.key === "End" && (u = o - 1), u === null) return;
      r.preventDefault();
      const d = n.options[u];
      d && (a("update:modelValue", d.key), s.value[u]?.focus());
    }
    return (r, i) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(ne, null, ve(e.options, (o, u) => (f(), h("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: Pt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", o.key),
        onKeydown: (d) => l(d, u)
      }, F(o.label), 43, lu))), 128))
    ], 8, su));
  }
}), ou = /* @__PURE__ */ de(ru, [["__scopeId", "data-v-63fb5482"]]), iu = ["data-dc-theme", "aria-label"], cu = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], uu = /* @__PURE__ */ ie({
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
    const n = e, a = v(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), s = t, l = q(null), r = q([]), i = q(null), o = q(null), u = q(!1), d = v(
      () => n.menus.flatMap((A, D) => Bt(A) ? [D] : [])
    );
    function m(A, D) {
      const W = r.value[A]?.getBoundingClientRect(), E = n.menus[A];
      !W || !E || !Bt(E) || (o.value = { x: W.left, y: W.bottom + 2, mirrorX: W.right }, i.value = A, u.value = D);
    }
    function k(A) {
      const D = i.value;
      i.value = null, o.value = null, A && D !== null && r.value[D]?.focus();
    }
    function y(A) {
      i.value === A ? k(!0) : m(A, !1);
    }
    function $(A) {
      i.value === null || i.value === A || m(A, !1);
    }
    function x(A, D) {
      const W = d.value;
      if (W.length === 0) return null;
      if (A === null) return D === 1 ? W[0] ?? null : W[W.length - 1] ?? null;
      const E = W.indexOf(A);
      return E === -1 ? W[0] ?? null : W[(E + D + W.length) % W.length] ?? null;
    }
    function _(A) {
      const D = A.key;
      if (D === "Escape") {
        if (i.value === null) return;
        A.preventDefault(), k(!0);
        return;
      }
      if (D === "ArrowDown" && i.value === null) {
        const N = b();
        if (N === null) return;
        A.preventDefault(), m(N, !0);
        return;
      }
      if (D !== "ArrowLeft" && D !== "ArrowRight") return;
      const W = i.value ?? b(), E = x(W, D === "ArrowRight" ? 1 : -1);
      E !== null && (A.preventDefault(), i.value !== null ? m(E, !0) : r.value[E]?.focus());
    }
    function b() {
      const A = r.value.findIndex((D) => D === document.activeElement);
      return A === -1 ? d.value[0] ?? null : A;
    }
    function z(A) {
      const D = A.target;
      !D || l.value?.contains(D) || k(!1);
    }
    ke(i, (A) => {
      A !== null ? window.addEventListener("pointerdown", z, !0) : window.removeEventListener("pointerdown", z, !0);
    }), Ue(() => window.removeEventListener("pointerdown", z, !0));
    function P(A) {
      k(!0), A.action?.(), s("choose", A);
    }
    return (A, D) => (f(), h("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Re(a.value),
      onKeydown: _
    }, [
      (f(!0), h(ne, null, ve(e.menus, (W, E) => (f(), h("button", {
        key: W.id ?? W.label ?? E,
        ref_for: !0,
        ref: (N) => {
          N && (r.value[E] = N);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === E,
        "aria-disabled": W.disabled ? "true" : void 0,
        disabled: W.disabled,
        "data-dc-menu": W.id ?? W.label,
        tabindex: E === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (N) => y(E),
        onMouseenter: (N) => $(E)
      }, F(W.label), 41, cu))), 128)),
      i.value !== null && o.value ? (f(), se(oa, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: P,
        onDismiss: D[0] || (D[0] = (W) => k(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
    ], 44, iu));
  }
}), Bd = /* @__PURE__ */ de(uu, [["__scopeId", "data-v-93dbd2e4"]]), du = ["aria-label", "aria-expanded", "disabled"], fu = { "aria-hidden": "true" }, pu = /* @__PURE__ */ ie({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = q(null), s = q(null), l = q(null), r = q(!1), i = v(() => l.value !== null);
    function o($) {
      const x = a.value?.getBoundingClientRect();
      x && (l.value = { x: x.left, y: x.bottom + 4, mirrorX: x.right }, r.value = $);
    }
    function u($) {
      l.value = null, $ && a.value?.focus();
    }
    function d() {
      i.value ? u(!0) : o(!1);
    }
    function m($) {
      $.key !== "ArrowDown" || i.value || ($.preventDefault(), o(!0));
    }
    function k($) {
      const x = $.target;
      x && (a.value?.contains(x) || s.value?.root?.contains(x) || u(!1));
    }
    ke(i, ($) => {
      $ ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), Ue(() => window.removeEventListener("pointerdown", k, !0));
    function y($) {
      u(!0), $.action?.(), n("choose", $);
    }
    return ($, x) => (f(), h(ne, null, [
      w("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: m
      }, [
        w("span", fu, F(e.glyph), 1)
      ], 40, du),
      l.value ? (f(), se(oa, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: y,
        onDismiss: x[0] || (x[0] = (_) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
    ], 64));
  }
}), ua = /* @__PURE__ */ de(pu, [["__scopeId", "data-v-48f5ada5"]]), Rt = (e) => e.kind === "split", H = (e) => e.kind === "group", J = (e) => e.kind === "float", vt = { x: 16, y: 16, w: 360, h: 260 }, yn = 28, Ns = 120, On = 220, Ds = 38, kt = 6;
function en(e, t) {
  let n = !1;
  const a = e.frames.map((s, l) => {
    const r = t(s.node, l);
    return r === s.node ? s : (n = !0, { ...s, node: r });
  });
  return n ? { ...e, frames: a } : e;
}
function Ze(e) {
  return { kind: "group", panels: [e] };
}
function Kd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const me = (e) => typeof e == "string", da = (e) => me(e) ? Ze(e) : e, tn = (e) => me(e) ? [e] : at(e), Ka = (e) => e.panels.filter(me), vu = (e) => e.panels.filter((t) => !me(t)), Oe = (e, t) => e.panels.includes(t);
function nn(e, t, n) {
  let a = !1;
  const s = e.panels.map((l) => {
    if (me(l) || !oe(l, t)) return l;
    const r = n(l);
    return r !== l && (a = !0), r;
  });
  return a ? { ...e, panels: s } : e;
}
function $n(e, t) {
  return { node: e, rect: { ...vt, ...t } };
}
function fa(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function pa(e, t) {
  const n = { ...vt, ...t };
  return fa(
    e.map(
      (a, s) => $n(a, {
        ...n,
        x: n.x + s * yn,
        y: n.y + s * yn
      })
    )
  );
}
function va(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const ma = (e, t, n) => va("row", e, t, n), Vd = (e, t, n) => va("column", e, t, n);
function we(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const gt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, qd = (e) => ({ ...e, headless: !0 }), Wd = (e) => ({ ...e, fixedView: !0 }), mu = (e) => e === "left" || e === "right" ? "row" : "column";
function at(e) {
  return H(e) ? e.panels.flatMap(tn) : J(e) ? e.frames.flatMap((t) => at(t.node)) : e.children.flatMap(at);
}
function oe(e, t) {
  return H(e) ? e.panels.some((n) => me(n) ? n === t : oe(n, t)) : J(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Is = (e) => at(e).length === 0, Bn = (e) => !H(e) && gt(e), Kn = (e) => Is(e) && !Bn(e);
function xn(e) {
  return Rt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : J(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => me(t) ? [] : [{ node: t, index: n }]);
}
const ha = (e) => xn(e).map((t) => t.node);
function _t(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => me(a) ? a === t : oe(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Os(e) {
  const t = e.panels[_t(e)];
  return t !== void 0 && me(t) ? t : "";
}
function Te(e) {
  if (me(e)) return e;
  if (H(e)) {
    const n = e.panels[_t(e)];
    return n === void 0 ? "" : Te(n);
  }
  if (J(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Te(n.node) : "";
  }
  const t = e.children[0];
  return t ? Te(t) : "";
}
function $t(e, t) {
  if (H(e) && Oe(e, t)) return e;
  for (const n of ha(e)) {
    const a = $t(n, t);
    if (a) return a;
  }
  return null;
}
function hu(e) {
  const t = ha(e).flatMap(hu);
  return H(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (H(e)) {
    for (const n of vu(e)) {
      const a = Se(n, t);
      if (a) return a;
    }
    return null;
  }
  if (J(e)) {
    for (const n of e.frames)
      if (oe(n.node, t))
        return Se(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Se(n, t);
    if (a) return a;
  }
  return null;
}
function zn(e, t, n = Ns) {
  const a = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), s = a(e.w, t.w), l = a(e.h, t.h), r = (i, o, u) => Math.min(Math.max(i, 0), Math.max(u - o, 0));
  return {
    x: Math.round(r(e.x, s, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function Va(e, t, n, a, s = Ns) {
  let { x: l, y: r, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, l = e.x + n), t.includes("s") && (o = e.h + a), t.includes("n") && (o = e.h - a, r = e.y + a), i < s && (t.includes("w") && (l = e.x + e.w - s), i = s), o < s && (t.includes("n") && (r = e.y + e.h - s), o = s), { x: l, y: r, w: i, h: o };
}
const Bs = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function xt(e, t, n) {
  if (H(e)) return nn(e, t, (l) => xt(l, t, n));
  if (J(e)) {
    let l = !1;
    const r = e.frames.map((i) => {
      if (!oe(i.node, t)) return i;
      if (Se(i.node, t)) {
        const u = xt(i.node, t, n);
        return u === i.node ? i : (l = !0, { ...i, node: u });
      }
      const o = n(i);
      return o === i ? i : (l = !0, o);
    });
    return l ? { ...e, frames: r } : e;
  }
  if (!oe(e, t)) return e;
  let a = !1;
  const s = e.children.map((l) => {
    const r = xt(l, t, n);
    return r !== l && (a = !0), r;
  });
  return a ? { ...e, children: s } : e;
}
function gu(e, t, n) {
  return xt(e, t, (a) => Bs(a.rect, n) ? a : { ...a, rect: n });
}
const lt = (e) => e.maximized === !0, Ks = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function _u(e, t, n = !0) {
  return xt(e, t, Ks(n));
}
function Ud(e, t) {
  const n = Se(e, t);
  return n ? _u(e, t, !lt(n)) : e;
}
const ft = (e) => e.minimized === !0, Vs = (e) => (t) => {
  if (ft(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function yu(e, t, n = !0) {
  return xt(e, t, Vs(n));
}
function Hd(e, t) {
  const n = Se(e, t);
  return n ? yu(e, t, !ft(n)) : e;
}
function dt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = ot(e, t.slice(0, -1));
  return !a || !J(a) ? null : a.frames[n] ?? null;
}
function Vn(e, t) {
  if (J(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!oe(a.node, t)) continue;
      const s = Vn(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of xn(e)) {
    if (!oe(n, t)) continue;
    const s = Vn(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function ga(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), l = ot(e, s);
  if (!l || !J(l)) return e;
  const r = l.frames[a];
  if (!r) return e;
  const i = n(r);
  if (i === r) return e;
  const o = [...l.frames];
  return o[a] = i, ht(e, s, { ...l, frames: o });
}
function qa(e, t, n) {
  return ga(
    e,
    t,
    (a) => Bs(a.rect, n) ? a : { ...a, rect: n }
  );
}
function wu(e, t, n = !0) {
  return ga(e, t, Ks(n));
}
function ku(e, t, n = !0) {
  return ga(e, t, Vs(n));
}
function Kt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (J(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const i = Kt(r.node, a), o = i === r.node ? r : { ...r, node: i };
    if (n === e.frames.length - 1 && o === r) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(o), { ...e, frames: u };
  }
  const s = ot(e, [n]);
  if (!s) return e;
  const l = Kt(s, a);
  return l === s ? e : ht(e, [n], l);
}
function bu(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (J(a) && (n[l] = a.frames.length - 1), a = ot(a, [s]));
  }), n;
}
function fn(e, t, n, a) {
  if (H(e)) return nn(e, n, (r) => fn(r, t, n, a));
  if (J(e)) {
    const r = e.frames.findIndex((o) => oe(o.node, n)), i = e.frames[r];
    if (!i) return e;
    if (Se(i.node, n)) {
      const o = fn(i.node, t, n, a);
      if (o === i.node) return e;
      const u = [...e.frames];
      return u[r] = { ...i, node: o }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, $n(Ze(t), a)] };
  }
  if (!oe(e, n)) return e;
  let s = !1;
  const l = e.children.map((r) => {
    const i = fn(r, t, n, a);
    return i !== r && (s = !0), i;
  });
  return s ? { ...e, children: l } : e;
}
function Wa(e, t, n, a) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Se(e, n)) return e;
  const s = mt(e, t);
  if (!s) return e;
  const l = fn(s, t, n, a);
  return l === s ? e : xe(l);
}
function $u(e, t, n) {
  return J(e) ? { ...e, frames: [...e.frames, $n(Ze(t), n)] } : H(e) ? Ws(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ze(t)],
    sizes: [...nt(e), 1],
    ...we(e)
  };
}
function qs(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return $u(e, t, a);
  const l = n.slice(1), r = (d, m) => m === s ? qs(d, t, l, a) : mt(d, t);
  if (J(e)) {
    const d = e.frames.flatMap((m, k) => {
      const y = r(m.node, k);
      return y ? [y === m.node ? m : { ...m, node: y }] : [];
    });
    return { ...e, frames: d };
  }
  if (H(e)) {
    const d = _t(e), m = [];
    e.panels.forEach(($, x) => {
      if (me($)) {
        $ !== t && m.push($);
        return;
      }
      const _ = r($, x);
      _ && m.push(_);
    });
    const y = e.active && m.some(($) => tn($).includes(e.active)) ? e.active : Te(m[d] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...y ? { active: y } : {},
      ...we(e)
    };
  }
  const i = nt(e), o = [], u = [];
  return e.children.forEach((d, m) => {
    const k = r(d, m);
    k && (o.push(k), u.push(i[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: u, ...we(e) };
}
function Ua(e, t, n, a) {
  const s = ot(e, n);
  return !s || !Is(s) || !oe(e, t) ? e : xe(qs(e, t, n, a));
}
function Ln(e, t) {
  if (H(e)) return nn(e, t, (s) => Ln(s, t));
  if (J(e)) {
    const s = e.frames.findIndex((u) => oe(u.node, t)), l = e.frames[s];
    if (!l) return e;
    const r = Ln(l.node, t), i = r === l.node ? l : { ...l, node: r };
    if (s === e.frames.length - 1 && i === l) return e;
    const o = [...e.frames];
    return o.splice(s, 1), o.push(i), { ...e, frames: o };
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = Ln(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function _a(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), s = a.reduce((l, r) => l + r, 0);
  return s <= 0 ? n() : a.map((l) => l / s);
}
const nt = (e) => _a(e.children.length, e.sizes), je = (e) => {
  const t = H(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function xe(e) {
  if (H(e)) return xu(e);
  if (J(e)) {
    const i = e.frames.flatMap((o) => {
      const u = xe(o.node);
      return Kn(u) ? [] : [u === o.node ? o : { ...o, node: u }];
    });
    return i.length === e.frames.length && i.every((o, u) => o === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = nt(e), n = je(e), a = [], s = [], l = [];
  e.children.forEach((i, o) => {
    const u = xe(i), d = t[o] ?? 0;
    if (Kn(u)) return;
    if (!n && Rt(u) && u.direction === e.direction && !je(u) && !gt(u)) {
      const k = nt(u);
      u.children.forEach((y, $) => {
        a.push(y), s.push(d * (k[$] ?? 0));
      });
      return;
    }
    a.push(u), s.push(d);
    const m = n?.[o];
    m && l.push(m);
  });
  const r = a[0];
  return a.length === 1 && r && !gt(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: _a(a.length, s),
    ...we(e),
    ...l.length === a.length && l.length > 0 ? { places: l } : {}
  };
}
function xu(e) {
  if (e.panels.every(me)) return e;
  const t = Te(e), n = je(e), a = [], s = [];
  e.panels.forEach((i, o) => {
    const u = n?.[o];
    if (me(i)) {
      a.push(i), u && s.push(u);
      return;
    }
    const d = xe(i);
    if (!Kn(d)) {
      if (H(d) && !gt(d) && !je(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), u && s.push(u);
    }
  });
  const l = a[0];
  if (a.length === 1 && l !== void 0 && !me(l) && !gt(e))
    return l;
  if (a.length === e.panels.length && a.every((i, o) => i === e.panels[o]))
    return e;
  const r = t && a.some((i) => tn(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...r ? { active: r } : {},
    ...we(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function mt(e, t) {
  if (J(e)) {
    const r = e.frames.flatMap((i) => {
      const o = mt(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return r.length === 0 && !Bn(e) ? null : { ...e, frames: r };
  }
  if (H(e)) {
    if (!oe(e, t)) return e;
    const r = _t(e), i = [];
    for (const d of e.panels) {
      if (me(d)) {
        d !== t && i.push(d);
        continue;
      }
      const m = mt(d, t);
      m && i.push(m);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((d) => tn(d).includes(e.active)) ? e.active : Te(i[r] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...we(e) } : { kind: "group", panels: i, ...we(e) };
  }
  const n = nt(e), a = [], s = [];
  if (e.children.forEach((r, i) => {
    const o = mt(r, t);
    o && (a.push(o), s.push(n[i] ?? 0));
  }), a.length === 0)
    return Bn(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...we(e) } : null;
  const l = a[0];
  return a.length === 1 && l && !gt(e) ? l : xe({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...we(e)
  });
}
function Ws(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...we(e) };
}
function It(e, t, n, a, s) {
  const l = (y) => en(
    y,
    ($) => oe($, n) ? It($, t, n, a, s) : $
  );
  if (a === "float") return e;
  const r = (y) => nn(y, n, ($) => It($, t, n, a, s));
  if (a === "center")
    return H(e) ? Oe(e, n) ? Ws(e, t, s) : r(e) : J(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (y) => oe(y, n) ? It(y, t, n, a, s) : y
      )
    };
  const i = mu(a), o = a === "left" || a === "top", u = (y) => ({
    kind: "split",
    direction: i,
    children: o ? [Ze(t), y] : [y, Ze(t)],
    sizes: [0.5, 0.5]
  });
  if (H(e)) return Oe(e, n) ? u(e) : r(e);
  if (J(e)) return l(e);
  const d = nt(e), m = e.children.findIndex(
    (y) => H(y) && Oe(y, n)
  );
  if (m >= 0 && e.direction === i) {
    const y = (d[m] ?? 0) / 2, $ = [...e.children], x = [...d];
    return $.splice(o ? m : m + 1, 0, Ze(t)), x.splice(m, 1, y, y), {
      kind: "split",
      direction: i,
      children: $,
      sizes: x,
      ...we(e)
    };
  }
  const k = e.children.map((y) => oe(y, n) ? H(y) && Oe(y, n) ? u(y) : It(y, t, n, a) : y);
  return {
    kind: "split",
    direction: e.direction,
    children: k,
    sizes: d,
    ...we(e)
  };
}
function Ct(e, t) {
  if (H(e)) {
    if (Oe(e, t))
      return Os(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((o) => !me(o) && oe(o, t)), l = e.panels[s];
    if (l === void 0 || me(l)) return e;
    const r = Ct(l, t);
    if (r === l && e.active === t) return e;
    const i = [...e.panels];
    return i[s] = r, { ...e, panels: i, active: t };
  }
  if (!oe(e, t)) return e;
  if (J(e)) return en(e, (s) => Ct(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const l = Ct(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Vt(e, t, n) {
  if (H(e)) {
    if (!Oe(e, t)) return nn(e, t, (u) => Vt(u, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const l = [...e.panels];
    l.splice(a, 1), l.splice(s, 0, t);
    const r = je(e), i = r ? [...r] : void 0;
    i && i.splice(s, 0, ...i.splice(a, 1));
    const o = Te(e);
    return {
      kind: "group",
      panels: l,
      ...o ? { active: o } : {},
      ...we(e),
      ...i ? { places: i } : {}
    };
  }
  return oe(e, t) ? J(e) ? en(e, (a) => Vt(a, t, n)) : { ...e, children: e.children.map((a) => Vt(a, t, n)) } : e;
}
function pn(e, t, n) {
  if (t === n) return e;
  if (H(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const a = (l) => l === t ? n : l === n ? t : l, s = e.panels.map((l) => me(l) ? a(l) : pn(l, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return J(e) ? en(e, (a) => pn(a, t, n)) : { ...e, children: e.children.map((a) => pn(a, t, n)) };
}
function rn(e, t, n, a, s) {
  if (a === "float" || !oe(e, t) || !oe(e, n)) return e;
  const l = $t(e, t);
  if (a === "center" && l && Oe(l, n)) {
    if (s === void 0) return e;
    const i = l.panels.indexOf(t), o = s > i ? s - 1 : s;
    return o === i ? e : Ct(Vt(e, t, o), t);
  }
  if (t === n) return e;
  const r = mt(e, t);
  return r ? xe(It(r, t, n, a, s)) : e;
}
function Us(e, t, n) {
  if (H(e)) {
    const s = e.panels[t];
    if (s === void 0 || me(s)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (J(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const l = [...e.frames];
    return l[t] = { ...s, node: n }, { ...e, frames: l };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function an(e, t, n) {
  const a = xn(e);
  if (!H(e) && a.some(({ node: s }) => H(s) && Oe(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: l } of a) {
    if (!oe(s, t)) continue;
    const r = an(s, t, n);
    return r ? Us(e, l, r) : null;
  }
  return null;
}
function jd(e, t, n) {
  const a = an(
    e,
    t,
    (s) => Rt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? xe(a) : e;
}
function Hs(e) {
  return J(e) ? [e] : je(e) || gt(e) ? [e] : H(e) ? [...e.panels] : e.children.flatMap(Hs);
}
function js(e, t) {
  if (H(e)) return e;
  const n = ha(e).map(Hs), a = n.flat(), s = t && a.some((r) => tn(r).includes(t)) ? t : void 0, l = Cu(e, n);
  return xe({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function Cu(e, t) {
  const n = J(e) ? e.frames.map(({ node: a, ...s }) => s) : je(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function Mu(e, t) {
  const n = an(e, t, (a) => js(a, t));
  return n ? xe(n) : e;
}
function ya(e, t, n) {
  if (H(e) && Oe(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of xn(e)) {
    if (!oe(a, t)) continue;
    const l = ya(a, t, n);
    return l ? Us(e, s, l) : null;
  }
  return null;
}
function Ha(e, t, n) {
  const a = ya(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const l = je(s);
    return {
      ...va(n, s.panels.map(da)),
      ...we(s),
      ...l ? { places: l } : {}
    };
  });
  return a ? xe(a) : e;
}
function qn(e, t) {
  if (H(e)) return e;
  if (J(e)) {
    const s = e.frames.findIndex(
      (i) => H(i.node) && i.node.panels.includes(t)
    ), l = e.frames[s], r = l && H(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const i = pa(r.panels.map(da), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...i, ...e.frames.slice(s + 1)]
      };
    }
    return en(e, (i) => qn(i, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = qn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Su(e, t, n) {
  const a = $t(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const r = qn(e, t);
    return r === e ? e : xe(r);
  }
  const l = ya(e, t, (r) => ({
    ...fa(Xs(r.panels.map(da), je(r), n)),
    ...we(r)
  }));
  return l ? xe(l) : e;
}
function Xs(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : pa(e, n).frames;
}
function Gs(e, t) {
  return { ...fa(Xs(e.children, je(e), t)), ...we(e) };
}
function Xd(e, t, n) {
  const a = an(
    e,
    t,
    (s) => J(s) ? s : Gs(s, n)
  );
  return a ? xe(a) : H(e) && Oe(e, t) ? pa([e], n) : e;
}
function Eu(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function Ys(e, t) {
  const n = Eu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...we(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function Gd(e, t, n = "row") {
  const a = an(
    e,
    t,
    (s) => J(s) ? Ys(s, n) : s
  );
  return a ? xe(a) : e;
}
function Qs(e) {
  if (J(e)) return null;
  const t = H(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || me(t) || H(t) && t.panels.length === 1 && me(t.panels[0]) ? null : t;
}
const Pu = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Au(e, t) {
  const n = Qs(e);
  return n ? t === "inner" ? n : { ...Pu(n), ...we(e) } : e;
}
function Tt(e) {
  return e.title ? e.title : H(e) ? "" : J(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function qt(e, t) {
  if (H(e)) {
    const a = e.panels[_t(e)];
    return a === void 0 ? "" : me(a) ? t(a) ?? a : Tt(a) || qt(a, t);
  }
  if (e.title) return e.title;
  if (J(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? qt(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? qt(n, t) : "";
}
function ot(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (Rt(n)) n = n.children[a];
    else if (J(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || me(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function ht(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (J(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const u = ht(o.node, s, n);
    if (u === o.node) return e;
    const d = [...e.frames];
    return d[a] = { ...o, node: u }, { ...e, frames: d };
  }
  if (H(e)) {
    const o = e.panels[a];
    if (o === void 0 || me(o)) return e;
    const u = ht(o, s, n);
    if (u === o) return e;
    const d = [...e.panels];
    return d[a] = u, { ...e, panels: d };
  }
  const l = e.children[a];
  if (!l) return e;
  const r = ht(l, s, n);
  if (r === l) return e;
  const i = [...e.children];
  return i[a] = r, { ...e, children: i };
}
function vn(e, t, n) {
  if (t.length === 0)
    return Rt(e) ? { ...e, sizes: _a(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (J(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const o = vn(i.node, s, n);
    if (o === i.node) return e;
    const u = [...e.frames];
    return u[a] = { ...i, node: o }, { ...e, frames: u };
  }
  if (H(e)) {
    const i = e.panels[a];
    if (i === void 0 || me(i)) return e;
    const o = vn(i, s, n);
    if (o === i) return e;
    const u = [...e.panels];
    return u[a] = o, { ...e, panels: u };
  }
  const l = e.children[a];
  if (!l) return e;
  const r = [...e.children];
  return r[a] = vn(l, s, n), { ...e, children: r };
}
function ja(e, t, n, a = 0.02) {
  const s = e[t], l = e[t + 1];
  if (s === void 0 || l === void 0) return e;
  const r = s + l;
  if (r < a * 2) return e;
  const i = [...e], o = Math.min(Math.max(s + n, a), r - a);
  return i[t] = o, i[t + 1] = r - o, i;
}
function wn(e) {
  if (!H(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !me(t) ? e : { ...ma([Tu(e)]), ...we(e) };
}
const Tu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Xa(e) {
  return e.length === 0 ? null : ma(e.map(Ze));
}
function zu(e, t) {
  if (!e) return Xa(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const o of at(e))
    !n.has(o) || a.has(o) ? s.add(o) : a.add(o);
  let l = e;
  for (const o of s)
    l = l ? mt(l, o) : null;
  const r = new Set(l ? at(l) : []), i = t.filter((o) => !r.has(o));
  if (i.length === 0) return l ? wn(xe(l)) : null;
  if (!l) return Xa(i);
  if (J(l)) {
    const o = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...i.map(
          (u, d) => $n(Ze(u), {
            x: vt.x + (o + d) * yn,
            y: vt.y + (o + d) * yn
          })
        )
      ]
    };
  }
  return wn(xe(ma([l, ...i.map(Ze)])));
}
const wa = Symbol("dc.windowContext");
function Lu(e) {
  return Wn(wa, e), e;
}
function ka() {
  const e = St(wa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Ru = ["data-dc-glyph"], Fu = { class: "dc-glyph__line" }, Nu = ["d"], Du = {
  key: 0,
  class: "dc-glyph__aqua"
}, Iu = ["d"], Ou = /* @__PURE__ */ ie({
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
    return (a, s) => (f(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      w("g", Fu, [
        (f(!0), h(ne, null, ve(t[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, Nu))), 128))
      ]),
      n[e.kind] ? (f(), h("g", Du, [
        (f(!0), h(ne, null, ve(n[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, Iu))), 128))
      ])) : L("", !0)
    ], 8, Ru));
  }
}), Mt = /* @__PURE__ */ de(Ou, [["__scopeId", "data-v-4d2872c0"]]), Bu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Ku = ["data-dc-movable"], Vu = { class: "dc-float__title dc-truncate" }, qu = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Wu = ["aria-label", "aria-pressed", "data-dc-minimize"], Uu = ["aria-label", "aria-pressed", "data-dc-maximize"], Hu = ["aria-label", "data-dc-close"], ju = { class: "dc-float__content" }, Xu = ["data-dc-handle", "onPointerdown"], Gu = /* @__PURE__ */ ie({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ka(), a = v(() => Te(t.frame.node)), s = v(() => n.panelFor(a.value)?.fixed === !0), l = v(() => lt(t.frame)), r = v(() => ft(t.frame)), i = v(() => l.value || r.value), o = v(() => n.resizable.value && !s.value && !i.value), u = v(() => n.movable.value && !s.value && !i.value), d = v(() => {
      const D = at(t.frame.node);
      return D.length === 1 ? D[0] ?? null : null;
    }), m = v(() => d.value !== null && n.closable(d.value)), k = v(() => t.frame.node.headless === !0), y = v(
      () => !k.value && (!H(t.frame.node) || r.value)
    ), $ = v(
      () => t.frame.title || Tt(t.frame.node) || qt(t.frame.node, (D) => n.panelFor(D)?.title)
    ), x = v(() => n.spaceMenu(t.path));
    function _(D) {
      D.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, D, "move");
    }
    function b(D) {
      D.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const z = v(() => {
      const D = n.framing.value;
      return D !== null && oe(t.frame.node, D);
    }), P = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${On}px`,
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
    })), A = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (D, W) => (f(), h("div", {
      class: "dc-float",
      style: Re(P.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": z.value ? "true" : "false",
      onPointerdown: W[3] || (W[3] = (E) => M(n).raiseAt(e.path))
    }, [
      y.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: _,
        onDblclick: b
      }, [
        w("span", Vu, F($.value), 1),
        x.value.length ? (f(), se(ua, {
          key: 0,
          items: x.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : L("", !0),
        !s.value || r.value && m.value && d.value ? (f(), h("div", qu, [
          s.value ? L("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${$.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": a.value,
            onClick: W[0] || (W[0] = (E) => M(n).toggleMinimizeAt(e.path))
          }, [
            ue(Mt, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Wu)),
          s.value ? L("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${$.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: W[1] || (W[1] = (E) => M(n).toggleMaximizeAt(e.path))
          }, [
            ue(Mt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Uu)),
          r.value && m.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": d.value,
            onClick: W[2] || (W[2] = (E) => M(n).close(d.value))
          }, [
            ue(Mt, { kind: "close" })
          ], 8, Hu)) : L("", !0)
        ])) : L("", !0)
      ], 40, Ku)) : L("", !0),
      w("div", ju, [
        $e(D.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(ne, null, ve(o.value ? A : [], (E) => (f(), h("span", {
        key: E,
        class: "dc-float__grip",
        "data-dc-handle": E,
        "aria-hidden": "true",
        onPointerdown: Le((N) => M(n).beginFrameDragAt(e.path, N, E), ["stop"])
      }, null, 40, Xu))), 128))
    ], 44, Bu));
  }
}), Yu = /* @__PURE__ */ de(Gu, [["__scopeId", "data-v-f035684c"]]), ba = Symbol("dc.paneContext");
function Qu(e) {
  return Wn(ba, e), e;
}
function Yd() {
  return St(ba, null);
}
function Qd(e) {
  const t = St(wa, null), n = St(ba, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Dt(e)
  );
  return wl() && Ya(a), a;
}
const Zu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Ju = ["data-dc-movable"], ed = ["aria-label", "aria-pressed"], td = ["data-dc-space-name"], nd = { class: "dc-truncate" }, ad = ["aria-label"], sd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ld = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], rd = { class: "dc-tab__name dc-truncate" }, od = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, id = ["aria-label", "data-dc-close", "onClick"], cd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ud = { class: "dc-pane__tools" }, dd = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, fd = ["aria-label", "data-dc-minimize"], pd = ["aria-label", "aria-pressed", "data-dc-maximize"], vd = ["aria-label", "data-dc-close"], md = ["id", "role", "aria-labelledby"], hd = ["id", "role", "aria-labelledby"], gd = ["data-dc-edge"], _d = /* @__PURE__ */ ie({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ka(), a = Un() ?? "dc-pane", s = v(
      () => t.group.panels.flatMap((B, U) => {
        if (!me(B)) {
          const T = Tt(B) || qt(B, (K) => n.panelFor(K)?.title);
          return [{ kind: "space", index: U, id: `space-${U}`, title: T, node: B }];
        }
        const te = n.panelFor(B);
        return te ? [{ kind: "panel", index: U, id: B, title: te.title, panel: te }] : [];
      })
    ), l = v(() => s.value.length > 1), r = v(() => {
      const B = _t(t.group);
      return s.value.find((U) => U.index === B) ?? s.value[0] ?? null;
    }), i = v(() => r.value?.kind === "space" ? r.value.node : null), o = v(() => i.value ? "" : Os(t.group)), u = v(() => i.value ? null : n.panelFor(o.value)), d = v(() => r.value?.title ?? ""), m = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), k = v(() => [...t.path, r.value?.index ?? 0]), y = v(() => o.value || Ka(t.group)[0] || ""), $ = v(() => n.viewFor(o.value)), x = v(() => t.group.headless === !0), _ = v(() => n.focused.value === o.value), b = v(() => n.dragging.value === o.value), z = v(() => n.moving.value === o.value), P = v(() => n.frameOf(y.value) !== null), A = v(() => n.panelFor(y.value)?.fixed === !0), D = v(
      () => !i.value && (n.canMove(o.value) || P.value && n.movable.value && !A.value)
    ), W = v(
      () => i.value ? n.spaceMenu(k.value) : n.menuFor(o.value)
    ), E = (B) => n.closable(B);
    Qu({ panel: o });
    const N = v(() => n.maximized(y.value)), le = v(
      () => P.value && !A.value || !l.value && !!u.value && E(u.value.id)
    ), ae = (B) => `${a}-tab-${B}`, he = v(() => `${a}-body`), X = v(() => {
      const B = n.dropTarget.value;
      return !B || !Oe(t.group, B.panel) || B.edge === "float" ? null : B;
    }), ye = v(() => X.value?.index === void 0 ? X.value?.edge ?? null : null), Ee = v(() => X.value?.index ?? null), C = () => u.value ? n.renderContent(u.value, $.value, _.value) ?? null : null, O = () => u.value ? n.renderActions(u.value, $.value, _.value) ?? null : null;
    let Y = null;
    function ee(B) {
      const U = Y !== null && Math.hypot(B.clientX - Y.x, B.clientY - Y.y) >= 4;
      return Y = null, U;
    }
    const ge = (B) => B.kind === "panel" ? B.id : Te(B.node);
    function Me(B, U) {
      U.kind !== "space" && (n.focus(U.id), Y = { x: B.clientX, y: B.clientY }, n.beginDrag(U.id, B));
    }
    function ze(B, U) {
      if (ee(B)) return;
      const te = ge(U);
      te && n.selectPanel(te);
    }
    function Ce(B) {
      o.value && n.focus(o.value), !B.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (P.value ? n.beginFrameDrag(y.value, B, "move") : n.beginDrag(o.value, B));
    }
    function Xe(B) {
      Y = { x: B.clientX, y: B.clientY }, n.beginDrag(o.value, B);
    }
    function Ke(B) {
      ee(B) || n.toggleMoveMode(o.value);
    }
    const Ne = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Pe(B) {
      if (!z.value) return;
      if (B.key === "Escape") {
        B.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const U = Ne[B.key];
      U && (B.preventDefault(), P.value ? n.nudgeFrame(o.value, U, B.shiftKey) : n.nudge(o.value, U, B.shiftKey));
    }
    function Ve(B) {
      !P.value || B.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(y.value);
    }
    function it(B, U) {
      B.stopPropagation(), Y = null, n.close(U);
    }
    function yt(B, U) {
      const te = s.value.length;
      let T = null;
      if (B.key === "ArrowRight" ? T = (U + 1) % te : B.key === "ArrowLeft" ? T = (U - 1 + te) % te : B.key === "Home" ? T = 0 : B.key === "End" && (T = te - 1), T === null) return;
      B.preventDefault();
      const K = s.value[T];
      if (!K) return;
      const j = ge(K);
      j && n.selectPanel(j);
    }
    return (B, U) => r.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": M(Ka)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": P.value ? "true" : "false",
      "data-dc-maximized": N.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": _.value ? "true" : "false",
      "data-dc-dragging": b.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: U[7] || (U[7] = (te) => o.value && M(n).focus(o.value))
    }, [
      x.value ? L("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": D.value ? "true" : "false",
        onPointerdown: Ce,
        onDblclick: Ve
      }, [
        D.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": z.value,
          onPointerdown: Xe,
          onClick: Ke,
          onKeydown: Pe
        }, [...U[8] || (U[8] = [
          w("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, ed)) : L("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          w("span", nd, F(m.value), 1)
        ], 8, td)) : L("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(ne, null, ve(s.value, (te, T) => (f(), h(ne, {
            key: te.id
          }, [
            Ee.value === T ? (f(), h("span", sd)) : L("", !0),
            w("button", {
              id: ae(te.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": te.kind === "panel" ? te.id : void 0,
              "data-dc-space": te.kind === "space" ? te.title : void 0,
              "aria-selected": te.index === r.value.index,
              "aria-controls": he.value,
              tabindex: te.index === r.value.index ? 0 : -1,
              onPointerdown: (K) => Me(K, te),
              onClick: (K) => ze(K, te),
              onKeydown: (K) => yt(K, T)
            }, [
              w("span", rd, F(te.title), 1),
              te.kind === "panel" && te.panel.subtitle ? (f(), h("span", od, F(te.panel.subtitle), 1)) : L("", !0),
              l.value && te.kind === "panel" && E(te.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${te.title}`,
                "data-dc-close": te.id,
                onPointerdown: U[0] || (U[0] = Le(() => {
                }, ["stop"])),
                onClick: (K) => it(K, te.id)
              }, [...U[9] || (U[9] = [
                w("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, id)) : L("", !0)
            ], 40, ld)
          ], 64))), 128)),
          Ee.value === s.value.length ? (f(), h("span", cd)) : L("", !0)
        ], 8, ad),
        w("div", ud, [
          ue(O),
          W.value.length ? (f(), se(ua, {
            key: 0,
            items: W.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : L("", !0)
        ]),
        le.value ? (f(), h("div", dd, [
          P.value && !A.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: U[1] || (U[1] = Le(() => {
            }, ["stop"])),
            onClick: U[2] || (U[2] = (te) => M(n).toggleMinimize(y.value))
          }, [
            ue(Mt, { kind: "minimize" })
          ], 40, fd)) : L("", !0),
          P.value && !A.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${N.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": N.value,
            "data-dc-maximize": y.value,
            onPointerdown: U[3] || (U[3] = Le(() => {
            }, ["stop"])),
            onClick: U[4] || (U[4] = (te) => M(n).toggleMaximize(y.value))
          }, [
            ue(Mt, {
              kind: N.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, pd)) : L("", !0),
          !l.value && u.value && E(u.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: U[5] || (U[5] = Le(() => {
            }, ["stop"])),
            onClick: U[6] || (U[6] = (te) => M(n).close(u.value.id))
          }, [
            ue(Mt, { kind: "close" })
          ], 40, vd)) : L("", !0)
        ])) : L("", !0)
      ], 40, Ju)),
      i.value ? (f(), h("div", {
        key: 1,
        id: he.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : ae(r.value.id)
      }, [
        $e(B.$slots, "space", {
          node: i.value,
          path: k.value
        }, void 0, !0)
      ], 8, md)) : (f(), h("div", {
        key: 2,
        id: he.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : ae(o.value)
      }, [
        ue(C)
      ], 8, hd)),
      ye.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ye.value,
        "aria-hidden": "true"
      }, null, 8, gd)) : L("", !0)
    ], 40, Zu)) : L("", !0);
  }
}), Zs = /* @__PURE__ */ de(_d, [["__scopeId", "data-v-44fd2b2d"]]), yd = ["data-dc-space", "data-dc-path", "aria-label"], wd = {
  key: 0,
  class: "dc-space__head"
}, kd = { class: "dc-space__title dc-truncate" }, bd = ["data-dc-direction"], $d = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, xd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Cd = /* @__PURE__ */ ie({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ka(), a = q(null), s = v(() => H(t.node) ? t.node : null), l = v(() => Rt(t.node) ? t.node : null), r = v(() => J(t.node) ? t.node : null), i = v(
      () => l.value ? l.value.children : r.value?.frames.map((C) => C.node) ?? []
    ), o = v(() => l.value ? nt(l.value) : []), u = v(
      () => (r.value?.frames ?? []).map((C, O) => ({
        held: C,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: O,
        key: E(C.node),
        path: [...t.path, O]
      })).sort((C, O) => C.key < O.key ? -1 : C.key > O.key ? 1 : 0)
    ), d = v(() => Tt(t.node)), m = v(() => n.spaceMenu(t.path)), k = v(() => t.node.headless === !0), y = v(() => r.value ? "desktop" : l.value?.direction ?? ""), $ = q(null), x = q(0);
    let _ = null;
    ke(
      $,
      (C) => {
        _?.disconnect(), _ = null, !(!C || typeof ResizeObserver > "u") && (x.value = C.clientWidth, _ = new ResizeObserver(([O]) => {
          x.value = O?.contentRect.width ?? 0;
        }), _.observe(C));
      },
      { immediate: !0 }
    ), Ue(() => _?.disconnect());
    const b = v(() => {
      const C = Math.max(
        1,
        Math.floor((x.value + kt) / (On + kt))
      ), O = /* @__PURE__ */ new Map();
      let Y = 0;
      for (const ee of u.value)
        ee.held.minimized === !0 && (O.set(ee.key, {
          x: kt + Y % C * (On + kt),
          bottom: kt + Math.floor(Y / C) * (Ds + kt)
        }), Y += 1);
      return O;
    }), z = (C) => !!C && C.join("/") === t.path.join("/"), P = v(() => {
      const C = n.dropTarget.value, O = r.value;
      if (!O || !C?.rect || C.edge !== "float") return null;
      if (C.space) return z(C.space) ? C.rect : null;
      const Y = Se(O, C.panel);
      return Y && O.frames.includes(Y) ? C.rect : null;
    }), A = v(() => {
      const C = n.dropTarget.value;
      return !!C && !C.rect && z(C.space);
    }), D = v(() => l.value?.direction === "row"), W = v(() => i.value.map((C, O) => [...t.path, O])), E = (C) => [...at(C)].sort().join("/"), N = (C) => {
      const O = at(C)[0];
      return (O ? n.panelFor(O)?.title : null) ?? O ?? "panel";
    }, le = (C) => {
      const O = i.value[C], Y = i.value[C + 1];
      return !O || !Y ? "Resize panels" : `Resize ${N(O)} and ${N(Y)}`;
    }, ae = (C) => {
      const O = o.value[C] ?? 0, Y = o.value[C + 1] ?? 0, ee = O + Y;
      return ee > 0 ? Math.round(O / ee * 100) : 50;
    };
    function he() {
      const C = a.value, O = C ? D.value ? C.clientWidth : C.clientHeight : 0;
      return O <= 0 ? 0.05 : Math.min(n.minPanelSize.value / O, 0.4);
    }
    let X = null;
    function ye(C, O) {
      const Y = l.value, ee = a.value;
      if (!n.resizable.value || !Y || !ee || C.button !== 0) return;
      const ge = D.value ? ee.clientWidth : ee.clientHeight;
      if (ge <= 0) return;
      const Me = D.value ? C.clientX : C.clientY, ze = nt(Y), Ce = Math.min(n.minPanelSize.value / ge, 0.4);
      C.preventDefault();
      const Xe = (Pe) => {
        const Ve = ((D.value ? Pe.clientX : Pe.clientY) - Me) / ge;
        n.setSizes(t.path, ja(ze, O, Ve, Ce));
      }, Ke = () => X?.(), Ne = (Pe) => {
        Pe.key === "Escape" && (n.setSizes(t.path, ze), X?.());
      };
      X = () => {
        window.removeEventListener("pointermove", Xe), window.removeEventListener("pointerup", Ke), window.removeEventListener("pointercancel", Ke), window.removeEventListener("keydown", Ne), X = null;
      }, window.addEventListener("pointermove", Xe), window.addEventListener("pointerup", Ke), window.addEventListener("pointercancel", Ke), window.addEventListener("keydown", Ne);
    }
    Ue(() => X?.());
    function Ee(C, O) {
      const Y = l.value;
      if (!n.resizable.value || !Y) return;
      const ee = D.value ? "ArrowRight" : "ArrowDown", ge = D.value ? "ArrowLeft" : "ArrowUp", Me = C.shiftKey ? 0.1 : 0.02;
      if (C.key !== ee && C.key !== ge) return;
      const ze = C.key === ee ? Me : -Me;
      C.preventDefault(), n.setSizes(t.path, ja(nt(Y), O, ze, he()));
    }
    return (C, O) => {
      const Y = Qa("WindowNode", !0);
      return s.value ? (f(), se(Zs, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Qe(({ node: ee, path: ge }) => [
          ue(Y, {
            node: ee,
            path: ge,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": y.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !k.value ? (f(), h("header", wd, [
          w("span", kd, F(d.value), 1),
          m.value.length ? (f(), se(ua, {
            key: 0,
            items: m.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : L("", !0)
        ])) : L("", !0),
        r.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          P.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${P.value.x}px`,
              top: `${P.value.y}px`,
              width: `${P.value.w}px`,
              height: `${P.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : L("", !0),
          (f(!0), h(ne, null, ve(u.value, (ee) => (f(), se(Yu, {
            key: ee.key,
            frame: ee.held,
            path: ee.path,
            order: ee.order,
            place: b.value.get(ee.key) ?? null
          }, {
            default: Qe(() => [
              ue(Y, {
                node: ee.held.node,
                path: ee.path,
                framed: ee.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (f(), h("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          A.value ? (f(), h("div", $d)) : L("", !0),
          (f(!0), h(ne, null, ve(i.value, (ee, ge) => (f(), h(ne, {
            key: E(ee)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: o.value[ge] ?? 1 })
            }, [
              ue(Y, {
                node: ee,
                path: W.value[ge] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ge < i.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": D.value ? "vertical" : "horizontal",
              "aria-label": le(ge),
              "aria-valuenow": ae(ge),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": M(n).resizable.value ? void 0 : "true",
              tabindex: M(n).resizable.value ? 0 : -1,
              onPointerdown: (Me) => ye(Me, ge),
              onKeydown: (Me) => Ee(Me, ge)
            }, null, 40, xd)) : L("", !0)
          ], 64))), 128))
        ], 8, bd)) : L("", !0)
      ], 8, yd));
    };
  }
}), Md = /* @__PURE__ */ de(Cd, [["__scopeId", "data-v-fb5b403f"]]), Sd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Ed = {
  key: 1,
  class: "dc-window__empty"
}, Pd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, on = 16, Ad = /* @__PURE__ */ ie({
  __name: "WindowFrame",
  props: /* @__PURE__ */ gn({
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
  emits: /* @__PURE__ */ gn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Ot(e, "layout"), r = Ot(e, "views"), i = jt(), o = v(() => new Map(a.panels.map((c) => [c.id, c]))), u = v(() => a.panels.map((c) => c.id)), d = v(() => zu(l.value, u.value)), m = q(null), k = q(null), y = q(null), $ = q(!0), x = q(null), _ = q(null), b = q(null), z = q(""), P = q(null);
    function A() {
      const c = P.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((g) => g.closest(".dc-window") === c).map((g) => ({ panels: (g.dataset.dcPanels ?? "").split(" "), element: g })) : [];
    }
    function D(c) {
      const p = [];
      let g = c.closest(".dc-float");
      for (; g; )
        p.unshift(Number(g.dataset.dcOrder ?? 0)), g = g.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function W() {
      return A().map((c) => ({ pane: c, order: D(c.element) })).sort((c, p) => {
        const g = Math.max(c.order.length, p.order.length);
        for (let S = 0; S < g; S += 1) {
          const R = (c.order[S] ?? -1) - (p.order[S] ?? -1);
          if (R !== 0) return R;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const E = (c) => A().find((p) => p.panels.includes(c)) ?? null;
    function N(c) {
      const p = o.value.get(c);
      if (!p) return "";
      const g = r.value[c];
      return g && p.views?.some((S) => S.key === g) ? g : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function le(c, p) {
      r.value = { ...r.value, [c]: p }, s("view-change", { panel: c, view: p });
    }
    const ae = v(
      () => a.panels.filter((c) => c.fixed !== !0).length
    );
    function he(c) {
      return !a.movable || ae.value < 1 || a.panels.length < 2 ? !1 : o.value.get(c)?.fixed !== !0;
    }
    function X(c, p) {
      const g = d.value;
      !c || !g || c === g || (l.value = c, p && s("panel-move", p));
    }
    function ye(c, p, g) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const S = (p - c.left) / c.width, R = (g - c.top) / c.height, I = 0.3;
      return S > I && S < 1 - I && R > I && R < 1 - I ? "center" : [
        { edge: "left", distance: S },
        { edge: "right", distance: 1 - S },
        { edge: "top", distance: R },
        { edge: "bottom", distance: 1 - R }
      ].reduce(
        (re, V) => V.distance < re.distance ? V : re
      ).edge;
    }
    function Ee(c, p) {
      const g = [...c.querySelectorAll(".dc-tab")], S = g.findIndex((R) => {
        const I = R.getBoundingClientRect();
        return p < I.left + I.width / 2;
      });
      return S === -1 ? g.length : S;
    }
    function C(c, p, g) {
      for (const { panels: S, element: R } of W().reverse()) {
        const I = R.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const fe = S.find((Q) => Q !== g), re = R.querySelector(".dc-pane__tabs"), V = re?.getBoundingClientRect();
        if (re && V && p >= V.top && p <= V.bottom)
          return fe ? { panel: fe, edge: "center", index: Ee(re, c) } : null;
        const G = R.querySelector(":scope > .dc-pane__space");
        if (G) {
          const Q = G.getBoundingClientRect();
          if (c >= Q.left && c <= Q.right && p >= Q.top && p <= Q.bottom) continue;
        }
        return fe ? { panel: fe, edge: ye(I, c, p) } : null;
      }
      return Y(c, p, g) ?? Me(c, p);
    }
    function O() {
      const c = P.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function Y(c, p, g) {
      const S = d.value;
      if (!S) return null;
      for (const R of O()) {
        const I = R.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const fe = ze(R), re = fe.flatMap((ce) => ce.panels).find((ce) => ce !== g);
        if (!re && fe.length > 0) return null;
        const V = Se(S, g)?.rect, G = zn(
          {
            x: c - I.left - 24,
            y: p - I.top - 12,
            w: V?.w ?? vt.w,
            h: V?.h ?? vt.h
          },
          { w: R.clientWidth, h: R.clientHeight },
          a.minPanelSize
        );
        if (re) return { panel: re, edge: "float", rect: G };
        const Q = ee(R);
        return Q ? { panel: "", space: Q, edge: "float", rect: G } : null;
      }
      return null;
    }
    function ee(c) {
      const p = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function ge() {
      const c = P.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === c).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const g = ee(p);
        return g ? [{ element: p, path: g }] : [];
      }) : [];
    }
    function Me(c, p) {
      for (const { element: g, path: S } of ge()) {
        if (g.dataset.dcSpace === "desktop") continue;
        const R = g.getBoundingClientRect();
        if (!(c < R.left || c > R.right || p < R.top || p > R.bottom))
          return { panel: "", space: S, edge: "center" };
      }
      return null;
    }
    function ze(c) {
      return A().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let Ce = null;
    const Xe = (c) => c.altKey;
    function Ke(c, p) {
      if (!he(c) || k.value || _.value || p.button !== 0) return;
      const g = p.clientX, S = p.clientY;
      let R = !1, I = Xe(p);
      const fe = () => {
        const pe = b.value;
        pe && (y.value = I ? Y(pe.x, pe.y, c) : C(pe.x, pe.y, c));
      }, re = (pe) => {
        if (!R) {
          if (Math.hypot(pe.clientX - g, pe.clientY - S) < 4) return;
          R = !0, k.value = c, x.value = null;
        }
        I = Xe(pe), $.value = !I, b.value = { x: pe.clientX, y: pe.clientY }, fe();
      }, V = (pe) => {
        Xe(pe) !== I && (I = !I, $.value = !I, R && fe());
      }, G = (pe) => {
        Ce?.();
        const Z = y.value, Ae = d.value;
        if (pe && R && Z && Ae) {
          const st = Z.space ? Ua(Ae, c, Z.space, Z.rect) : Z.edge === "float" && Z.rect ? Wa(Ae, c, Z.panel, Z.rect) : rn(Ae, c, Z.panel, Z.edge, Z.index);
          X(st, {
            panel: c,
            target: Z.panel,
            edge: Z.edge,
            ...Z.space === void 0 ? {} : { space: Z.space },
            ...Z.index === void 0 ? {} : { index: Z.index },
            ...Z.rect === void 0 ? {} : { rect: Z.rect }
          });
        }
        k.value = null, y.value = null, b.value = null, $.value = !0;
      }, Q = () => G(!0), ce = () => G(!1), _e = (pe) => {
        if (pe.key === "Escape") {
          G(!1);
          return;
        }
        V(pe);
      };
      Ce = () => {
        window.removeEventListener("pointermove", re), window.removeEventListener("pointerup", Q), window.removeEventListener("pointercancel", ce), window.removeEventListener("keydown", _e), window.removeEventListener("keyup", V), Ce = null;
      }, window.addEventListener("pointermove", re), window.addEventListener("pointerup", Q), window.addEventListener("pointercancel", ce), window.addEventListener("keydown", _e), window.addEventListener("keyup", V);
    }
    Ue(() => Ce?.());
    let Ne = null;
    function Pe(c) {
      const p = P.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((R) => R.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ve(c) {
      const p = d.value;
      return p ? Vn(p, c) : null;
    }
    function it(c) {
      const p = d.value;
      if (!p) return;
      const g = Kt(p, c);
      g !== p && (l.value = g);
    }
    function yt(c) {
      const p = Ve(c);
      p && it(p);
    }
    function B(c) {
      const p = d.value, g = p ? Se(p, c) : null;
      return g !== null && lt(g);
    }
    function U(c) {
      const p = d.value, g = p ? Se(p, c) : null;
      return g !== null && ft(g);
    }
    function te(c) {
      const p = d.value, g = p ? dt(p, c) : null;
      return g ? Te(g.node) : "";
    }
    function T(c) {
      const p = d.value, g = p ? dt(p, c) : null;
      if (!p || !g) return;
      const S = Te(g.node);
      if (o.value.get(S)?.fixed === !0) return;
      const R = !ft(g);
      let I = ku(p, c, R);
      I !== p && (R || (I = Kt(I, c)), l.value = I, s("frame-minimize", { panel: S, minimized: R }));
    }
    function K(c) {
      const p = Ve(c);
      p && T(p);
    }
    function j(c) {
      const p = d.value, g = p ? dt(p, c) : null;
      if (!p || !g) return;
      const S = Te(g.node);
      if (o.value.get(S)?.fixed === !0) return;
      const R = !lt(g);
      let I = wu(p, c, R);
      I !== p && (R && (I = Kt(I, c)), l.value = I, s("frame-maximize", { panel: S, maximized: R }));
    }
    function qe(c) {
      const p = Ve(c);
      p && j(p);
    }
    function Ft(c, p, g) {
      const S = d.value, R = S ? dt(S, c) : null;
      if (!S || !R || p.button !== 0 || k.value || _.value) return;
      const I = Te(R.node);
      if (o.value.get(I)?.fixed === !0 || lt(R) || ft(R) || (g === "move" ? !a.movable : !a.resizable)) return;
      const fe = Pe(c), re = bu(S, c);
      it(c);
      const V = { w: fe?.clientWidth ?? 0, h: fe?.clientHeight ?? 0 }, G = { ...R.rect }, Q = p.clientX, ce = p.clientY, _e = a.minPanelSize;
      _.value = I;
      const pe = (De) => {
        const Je = d.value;
        if (!Je) return;
        const Nt = qa(Je, re, zn(De, V, _e));
        Nt !== Je && (l.value = Nt);
      }, Z = (De) => {
        De.preventDefault();
        const Je = De.clientX - Q, Nt = De.clientY - ce;
        pe(
          g === "move" ? { ...G, x: G.x + Je, y: G.y + Nt } : Va(G, g, Je, Nt, _e)
        );
      }, Ae = (De) => {
        if (Ne?.(), _.value = null, !De) {
          pe(G);
          return;
        }
        const Je = d.value ? dt(d.value, re) : null;
        Je && s("frame-change", { panel: te(re), rect: Je.rect });
      }, st = () => Ae(!0), ct = () => Ae(!1), ut = (De) => {
        De.key === "Escape" && Ae(!1);
      };
      Ne = () => {
        window.removeEventListener("pointermove", Z), window.removeEventListener("pointerup", st), window.removeEventListener("pointercancel", ct), window.removeEventListener("keydown", ut), Ne = null;
      }, window.addEventListener("pointermove", Z), window.addEventListener("pointerup", st), window.addEventListener("pointercancel", ct), window.addEventListener("keydown", ut);
    }
    function Js(c, p, g) {
      const S = Ve(c);
      S && Ft(S, p, g);
    }
    function el(c, p, g = !1) {
      const S = d.value, R = Ve(c), I = S && R ? dt(S, R) : null;
      if (!S || !R || !I || o.value.get(c)?.fixed === !0 || (g ? !a.resizable : !a.movable)) return;
      if (lt(I) || ft(I)) {
        z.value = `${Ge(c)} is ${lt(I) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const fe = p === "left" ? -on : p === "right" ? on : 0, re = p === "up" ? -on : p === "down" ? on : 0, V = Pe(R), G = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, Q = g ? Va(I.rect, "se", fe, re, a.minPanelSize) : { ...I.rect, x: I.rect.x + fe, y: I.rect.y + re }, ce = qa(S, R, zn(Q, G, a.minPanelSize));
      if (ce === S) {
        z.value = g ? `${Ge(c)} cannot be resized further.` : `${Ge(c)} cannot move ${p}.`;
        return;
      }
      l.value = ce;
      const _e = dt(ce, R);
      _e && (s("frame-change", { panel: c, rect: _e.rect }), z.value = g ? `${Ge(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${Ge(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    Ue(() => Ne?.());
    function tl(c, p) {
      const g = E(c), S = g?.element.getBoundingClientRect();
      if (!g || !S) return null;
      const R = p === "left" || p === "right", I = (V) => {
        if (!(R ? V.bottom > S.top + 1 && V.top < S.bottom - 1 : V.right > S.left + 1 && V.left < S.right - 1)) return null;
        const Q = p === "left" ? S.left - V.right : p === "right" ? V.left - S.right : p === "up" ? S.top - V.bottom : V.top - S.bottom;
        return Q < -1 ? null : Q;
      }, fe = [];
      for (const V of A()) {
        if (V === g || V.element === g.element) continue;
        const G = I(V.element.getBoundingClientRect());
        if (G === null) continue;
        const Q = V.panels.find((ce) => ce !== c);
        Q && fe.push({ to: { panel: Q }, distance: G });
      }
      for (const { element: V, path: G } of ge()) {
        const Q = I(V.getBoundingClientRect());
        Q !== null && fe.push({ to: { space: G }, distance: Q });
      }
      return fe.reduce(
        (V, G) => V && V.distance <= G.distance ? V : G,
        null
      )?.to ?? null;
    }
    function nl(c) {
      const p = d.value ? Se(d.value, c) !== null : !1;
      if (!p && !he(c)) return;
      x.value = x.value === c ? null : c;
      const g = Ge(c);
      if (!x.value) {
        z.value = `${g}: move mode off.`;
        return;
      }
      z.value = p ? `${g}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${g}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ge = (c) => o.value.get(c)?.title ?? c, al = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function sl(c, p, g = !1) {
      if (!he(c)) return;
      const S = d.value;
      if (!S) return;
      const R = Ge(c), I = $t(S, c);
      if (!g && I && (p === "left" || p === "right") && I.panels.length > 1) {
        const ce = I.panels.indexOf(c), _e = p === "left" ? ce - 1 : ce + 1;
        if (_e >= 0 && _e < I.panels.length) {
          X(Vt(S, c, _e), { panel: c, target: c, edge: "center", index: _e }), z.value = `${R} moved ${p}, now tab ${_e + 1} of ${I.panels.length}.`, Cn(c);
          return;
        }
      }
      const re = tl(c, p);
      if (!re || re.panel !== void 0 && !he(re.panel)) {
        z.value = `${R} cannot move ${p}.`;
        return;
      }
      const V = al[p];
      if (re.space) {
        const ce = re.space, _e = ot(S, ce), pe = Se(S, c)?.rect, Z = { ...vt, ...pe ? { w: pe.w, h: pe.h } : {} };
        X(Ua(S, c, ce, Z), { panel: c, target: "", space: ce, edge: V }), z.value = `${R} moved ${p}, into ${_e ? Tt(_e) : "the space"}.`, Cn(c);
        return;
      }
      const G = re.panel, Q = I?.panels.length === 1 && $t(S, G)?.panels.length === 1;
      g ? (X(rn(S, c, G, "center"), {
        panel: c,
        target: G,
        edge: "center"
      }), z.value = `${R} joined ${Ge(G)} as a tab.`) : Q ? (X(pn(S, c, G), { panel: c, target: G, edge: V }), z.value = `${R} moved ${p}, trading places with ${Ge(G)}.`) : (X(rn(S, c, G, V), { panel: c, target: G, edge: V }), z.value = `${R} moved ${p}, beside ${Ge(G)}.`), Cn(c);
    }
    function Cn(c) {
      Wt(() => {
        E(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function ll(c, p) {
      const g = d.value;
      g && (l.value = vn(g, c, p));
    }
    function Mn(c) {
      const p = d.value;
      if (!p) return;
      const g = Ct(p, c);
      g !== p && (l.value = g, s("tab-select", { panel: c }));
    }
    function $a(c) {
      return o.value.get(c)?.closable ?? a.closable;
    }
    function rl(c) {
      $a(c) && s("panel-close", c);
    }
    const Sn = q(/* @__PURE__ */ new Map());
    let ol = 0;
    function il(c, p) {
      const g = ol += 1;
      return Sn.value.set(g, { panel: c, items: p }), () => {
        Sn.value.delete(g);
      };
    }
    function cl(c) {
      const p = [];
      for (const g of Sn.value.values())
        g.panel() === c && p.push(...g.items());
      return p;
    }
    function xa(c) {
      const p = c.filter((g) => g.items.length > 0);
      return p.length < 2 ? p.flatMap((g) => g.items) : p.flatMap((g) => [
        { id: g.id, heading: !0, label: g.title },
        ...g.items
      ]);
    }
    const Ca = (c) => c.title || "These tabs";
    function ul(c, p) {
      const g = p.id, S = $t(c, g), R = (S?.panels.length ?? 0) > 1, I = S?.fixedView === !0, fe = (Q) => ({
        action: () => {
          Q !== c && (l.value = Q);
        }
      }), re = [], V = [], G = p.views ?? [];
      if (G.length > 1 && !I) {
        const Q = N(g);
        re.push({
          id: "view",
          label: "View",
          items: G.map((ce) => ({
            id: `view-${ce.key}`,
            label: ce.label,
            checked: ce.key === Q,
            action: () => le(g, ce.key)
          }))
        });
      }
      return R && !I && V.push(
        { id: "show-row", label: "Row", checked: !1, ...fe(Ha(c, g, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...fe(Ha(c, g, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...fe(Mu(c, g))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...fe(Su(c, g))
        }
      ), R && S && (V.length && V.push({ separator: !0 }), V.push(...Ma(S, g))), { panel: re, tabs: V, tabsTitle: S ? Ca(S) : "" };
    }
    function Ma(c, p) {
      const g = _t(c), S = (R) => {
        const I = c.panels[(g + R + c.panels.length) % c.panels.length];
        return (I === void 0 ? "" : Te(I)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Mn(S(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Mn(S(-1)) }
      ];
    }
    function sn(c) {
      return c.title ? c.title : H(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : Tt(c);
    }
    function Sa(c) {
      if (!c || J(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || je(c)) return null;
      const p = Qs(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function dl(c) {
      const p = d.value;
      if (!a.menu || !p) return [];
      const g = ot(p, c);
      if (!g || H(g)) return [];
      if (g.fixedView) return [];
      const S = J(g) ? "desktop" : g.direction, R = (Z, Ae, st) => ({
        id: `show-${Z}`,
        label: Ae,
        checked: S === Z,
        action: () => {
          const ct = d.value, ut = st();
          !ct || ut === g || (l.value = wn(xe(ht(ct, c, ut))));
        }
      }), I = () => {
        const Z = js(g, fl(g));
        if (H(Z) && Z.panels.length === 0) return g;
        const Ae = H(Z) && Z.panels.length === 1 ? Z.panels[0] : void 0;
        return Ae !== void 0 && me(Ae) ? g : Z;
      }, fe = (Z) => () => J(g) ? Ys(g, Z) : g.direction === Z ? g : { ...g, direction: Z }, re = c.slice(0, -1), V = c.length > 0 ? ot(p, re) : null, G = V && H(V) && V.panels.length > 1 ? V : null, Q = V && Sa(V) === g ? V : null, ce = Sa(g), _e = g.title || "this space", pe = (Z, Ae, st, ct, ut) => ({
        id: Z,
        label: ut,
        action: () => {
          const De = d.value;
          De && (l.value = wn(xe(ht(De, Ae, Au(st, ct)))));
        }
      });
      return xa([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: g.title || "This space",
          items: [
            R("row", "Row", fe("row")),
            R("column", "Column", fe("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            R("tabs", "Tabs", () => I()),
            R("desktop", "Desktop", () => J(g) ? g : Gs(g))
          ]
        },
        {
          id: "about-around",
          title: ce ? `Around ${sn(ce)}` : "",
          items: ce ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ce.title ? [] : [pe("merge-around-keep-this", c, g, "outer", `Keep ${_e}`)],
            ...g.title ? [] : [pe("merge-around-keep-that", c, g, "inner", `Keep ${sn(ce)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Q ? `Inside ${sn(Q)}` : "",
          items: Q ? [
            ...g.title ? [] : [pe("merge-inside-keep-that", re, Q, "outer", `Keep ${sn(Q)}`)],
            ...Q.title ? [] : [pe("merge-inside-keep-this", re, Q, "inner", `Keep ${_e}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: G ? Ca(G) : "",
          items: G ? Ma(G, Te(g)) : []
        }
      ]);
    }
    function fl(c) {
      const p = m.value;
      return p && oe(c, p) ? p : void 0;
    }
    function pl(c) {
      const p = d.value, g = o.value.get(c);
      if (!p || !g) return [];
      const S = a.menu ? ul(p, g) : null, R = cl(c);
      R.length && S?.panel.length && R.push({ separator: !0 }), S && R.push(...S.panel);
      const I = xa([
        { id: "about-panel", title: g.title, items: R },
        { id: "about-tabs", title: S?.tabsTitle ?? "", items: S?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(g, I) : I;
    }
    function vl(c, p) {
      return i[`${c}-${p}`] ?? i[c];
    }
    function Ea(c, p, g, S) {
      return vl(c, p.id)?.({ panel: p, view: g, active: S });
    }
    Lu({
      panelFor: (c) => o.value.get(c) ?? null,
      viewFor: N,
      setView: le,
      movable: v(() => a.movable),
      resizable: v(() => a.resizable),
      minPanelSize: v(() => a.minPanelSize),
      spaceNames: v(() => a.spaceNames),
      focused: m,
      dragging: k,
      dropTarget: y,
      moving: x,
      framing: _,
      canMove: he,
      focus(c) {
        m.value !== c && (m.value = c, s("panel-activate", c));
      },
      selectPanel: Mn,
      beginDrag: Ke,
      toggleMoveMode: nl,
      nudge: sl,
      setSizes: ll,
      frameOf: (c) => d.value ? Se(d.value, c) : null,
      beginFrameDrag: Js,
      nudgeFrame: el,
      raise: yt,
      maximized: B,
      toggleMaximize: qe,
      minimized: U,
      toggleMinimize: K,
      beginFrameDragAt: Ft,
      raiseAt: it,
      toggleMaximizeAt: j,
      toggleMinimizeAt: T,
      menuFor: pl,
      spaceMenu: dl,
      registerMenu: il,
      closable: $a,
      close: rl,
      renderContent: (c, p, g) => Ea("panel", c, p, g),
      renderActions: (c, p, g) => Ea("actions", c, p, g),
      layout: d
    });
    const ml = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), hl = () => {
      const c = k.value, p = b.value;
      return !c || !p ? null : kl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${p.x}px`, top: `${p.y}px` },
          "aria-hidden": "true"
        },
        o.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, p, g, S) {
        const R = d.value;
        R && X(rn(R, c, p, g, S), {
          panel: c,
          target: p,
          edge: g,
          ...S === void 0 ? {} : { index: S }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (l.value = Ct(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, g) {
        const S = d.value;
        S && X(Wa(S, c, p, g), {
          panel: c,
          target: p,
          edge: "float",
          rect: g
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, p) {
        const g = d.value;
        if (!g) return;
        const S = gu(g, c, p);
        if (S === g) return;
        l.value = S;
        const R = Se(S, c);
        R && s("frame-change", { panel: c, rect: R.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: le,
      /** Brings a floating frame to the front of its stack. */
      raise: yt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: qe,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: K
    }), (c, p) => (f(), h("div", {
      ref_key: "root",
      ref: P,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": k.value ? "true" : "false",
      "data-dc-docking": $.value ? "true" : "false",
      style: Re(ml.value)
    }, [
      d.value ? (f(), se(Md, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", Ed, " This window has no panels. ")),
      ue(hl),
      w("p", Pd, F(z.value), 1)
    ], 12, Sd));
  }
}), Td = /* @__PURE__ */ de(Ad, [["__scopeId", "data-v-711565af"]]);
function Zd(e = "", t = "/") {
  const n = q(tt(e)), a = q(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    push(l) {
      n.value = tt(l), s.push(`${a.value}${n.value}`);
    },
    replace(l) {
      n.value = tt(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Ga(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return tt(a === -1 ? n : n.slice(0, a));
}
function Jd(e) {
  const t = q(Ga(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), a = ke(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Ga(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${tt(s)}`),
    replace: (s) => e.replace(`${n.value}${tt(s)}`),
    dispose: a
  };
}
const zd = {
  DataShell: Gc,
  ShellHeader: $s,
  QueryPanel: Cs,
  RecordActions: Ss,
  ResultsArea: Fs,
  FacetControl: xs,
  SegmentedControl: ou,
  StatusPill: Yt,
  WindowFrame: Td,
  WindowPane: Zs,
  ListView: In,
  CardsView: Ps,
  GridView: As,
  TableView: Ls,
  LinksView: Ts,
  PreviewView: zs,
  TypeCardsView: Rs
}, ef = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(zd))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Za, t.route);
  }
};
export {
  yn as CASCADE_STEP,
  Nd as COLUMN_BREAKPOINTS,
  Fd as COLUMN_ROLES,
  Ps as CardsView,
  Ba as ColumnCell,
  vt as DEFAULT_FRAME,
  Rn as DEFAULT_SORT,
  $l as DEFAULT_VIEW,
  Gc as DataShell,
  Fn as EMPTY_CELL,
  ys as ENTITY_ALL,
  _n as ENTITY_TERM,
  Ht as EXPRESSION_TERM,
  la as FACET_PREFIX,
  xs as FacetControl,
  As as GridView,
  ef as HeaderContentLayoutPlugin,
  Ts as LinksView,
  In as ListView,
  kt as MINIMIZED_GAP,
  Ds as MINIMIZED_HEIGHT,
  On as MINIMIZED_WIDTH,
  Ns as MIN_FRAME,
  Da as MOCK_TINTS,
  Bd as MenuBar,
  ua as MenuButton,
  oa as MenuList,
  Qt as MetricDrill,
  ba as PANE_CONTEXT_KEY,
  na as PARAM_DIR,
  Jn as PARAM_ENTITY,
  aa as PARAM_EXPR,
  sa as PARAM_PAGE,
  ta as PARAM_SORT,
  ea as PARAM_VIEW,
  ia as PinStar,
  zs as PreviewView,
  Zt as QueryMark,
  Cs as QueryPanel,
  ln as RECORD_STATUSES,
  rs as RESULT_FIELDS,
  Za as ROUTE_ADAPTER_KEY,
  Ss as RecordActions,
  Fs as ResultsArea,
  _s as SHELL_CONTEXT_KEY,
  Rd as SHELL_THEMES,
  Jt as ScopeMark,
  ou as SegmentedControl,
  Lt as SelectTick,
  Od as ShellCard,
  $s as ShellHeader,
  Yt as StatusPill,
  Ls as TableView,
  Rs as TypeCardsView,
  Ja as VIEW_KINDS,
  xl as VIEW_LABELS,
  wa as WINDOW_CONTEXT_KEY,
  Td as WindowFrame,
  Zs as WindowPane,
  Os as activePanel,
  _t as activeTab,
  ms as addTerm,
  Qn as andExpression,
  mu as axisOf,
  pa as cascade,
  cs as cellFull,
  Xt as cellText,
  dn as cellTextOf,
  Be as cellValue,
  Pa as changesResults,
  zn as clampRect,
  js as collapseSpace,
  Mu as collapseToTabs,
  Vd as column,
  Ta as columnAlign,
  za as columnClass,
  Aa as columnKey,
  Nn as columnTruncates,
  Al as columnsFor,
  Ml as countPages,
  bl as createHistoryAdapter,
  Zd as createMemoryAdapter,
  ar as createMockDataSource,
  Jd as createVueRouterAdapter,
  Ll as defaultCellText,
  Xa as defaultLayout,
  Yn as defaultQuery,
  or as drillExpression,
  Ua as dropIntoSpace,
  At as emptyFacetState,
  Xn as emptyFacetValue,
  sr as excludingTerm,
  bt as findEntity,
  rt as findSort,
  Wd as fixedView,
  fa as float,
  Wa as floatPanel,
  Gs as floatSplit,
  Su as floatTabs,
  un as fnv1a,
  ts as focusEntity,
  wt as formatCount,
  El as formatDate,
  pt as formatExpression,
  Sl as formatMetric,
  Pl as formatOrdinal,
  Gt as formatTerm,
  $n as frame,
  dt as frameAt,
  Se as frameOf,
  Vn as framePathOf,
  Te as frontPanel,
  er as generateRows,
  Kd as group,
  $t as groupOf,
  hu as groups,
  ls as hasActiveFacets,
  oe as hasPanel,
  qd as headless,
  It as insertPanel,
  Bt as isChoosable,
  Dd as isEntityScoped,
  ss as isFacetActive,
  J as isFloat,
  H as isGroup,
  lt as isMaximized,
  ft as isMinimized,
  me as isPanelTab,
  kn as isPristineQuery,
  Rt as isSplit,
  Oe as isTabOf,
  Gn as isTypeCardsQuery,
  es as isViewKind,
  Fa as joinExpression,
  rr as liftTerm,
  ql as matchesExpression,
  tr as matchesFacets,
  _u as maximizeFrame,
  wu as maximizeFrameAt,
  Au as mergeSpace,
  yu as minimizeFrame,
  ku as minimizeFrameAt,
  rn as movePanel,
  Vt as moveTab,
  Id as negateTerm,
  ot as nodeAt,
  qt as nodeTitle,
  xe as normalizeLayout,
  tt as normalizeSearch,
  _a as normalizeSizes,
  Qs as onlySpace,
  Ut as oppositeTerm,
  at as panelIds,
  Ze as panelNode,
  Ka as panelTabs,
  Fe as parseExpression,
  vr as parseQuery,
  Oo as presentParts,
  Es as presentRow,
  He as pressOptions,
  Qu as providePaneContext,
  ir as provideShellContext,
  Lu as provideWindowContext,
  Ln as raiseFrame,
  Kt as raiseFrameAt,
  bu as raisedPath,
  os as reconcileFacets,
  zu as reconcileLayout,
  vs as recordTerm,
  jl as refineExpression,
  mt as removePanel,
  ht as replaceAt,
  Va as resizeRect,
  ja as resizeSplit,
  jn as resolveView,
  Ie as roleColumn,
  is as roleColumns,
  wn as rootSpace,
  ma as row,
  zl as rowKey,
  bn as sameTerm,
  ps as scopeTerm,
  Zn as scopeTermFor,
  gs as scopedEntity,
  Oa as serializeQuery,
  Ct as setActivePanel,
  gu as setFrameRect,
  qa as setFrameRectAt,
  vn as setSizesAt,
  jd as setSplitDirection,
  nt as sizesOf,
  as as sortsFor,
  we as spaceChrome,
  Tt as spaceTitle,
  va as split,
  Ul as splitExpression,
  Ha as spreadTabs,
  hr as summarizeQuery,
  ra as summaryTerms,
  pn as swapPanels,
  da as tabNode,
  tn as tabPanels,
  lr as termStanding,
  Ys as tileFloat,
  Xd as toFloat,
  Gd as toTiled,
  Ud as toggleMaximized,
  Hd as toggleMinimized,
  ec as useColumns,
  Rr as useEntityCounts,
  hc as useEntityPreviews,
  Yd as usePaneContext,
  Qd as usePaneMenu,
  zt as usePresentedRows,
  gr as useQueryState,
  Dr as useRecordNames,
  _r as useResults,
  be as useShellContext,
  ka as useWindowContext,
  hs as withoutOwnScope,
  Wl as withoutTerm
};
