import { ref as q, inject as St, provide as Un, computed as v, toValue as Dt, shallowRef as Et, watch as ke, onScopeDispose as Ya, defineComponent as ie, onMounted as hl, onBeforeUnmount as Qe, resolveComponent as Qa, openBlock as f, createElementBlock as h, normalizeStyle as Le, Fragment as ne, renderList as ve, toDisplayString as F, createCommentVNode as R, createElementVNode as w, createBlock as se, nextTick as Wt, useId as Hn, unref as M, normalizeClass as Pt, createVNode as ue, withDirectives as vn, withKeys as Xe, withModifiers as Re, vModelText as mn, renderSlot as $e, useSlots as Ht, createTextVNode as We, withCtx as Ge, resolveDynamicComponent as jn, createSlots as on, useModel as Ot, mergeModels as hn, Comment as gl, Text as _l, getCurrentScope as yl, h as wl } from "vue";
const Za = Symbol("dc.routeAdapter");
function tt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function kl() {
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
const Ja = ["list", "cards", "grid", "table", "links", "preview"], zd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], sn = ["ok", "running", "queued", "review", "failed"], Rd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Ld = [480, 620, 760, 900, 1100], bl = "cards", Fn = "updated";
function es(e) {
  return typeof e == "string" && Ja.includes(e);
}
const $l = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Xn(e, t) {
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
const xl = { key: Fn, label: Fn };
function rt(e, t, n = null) {
  const a = as(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Fn) ?? a[0] ?? xl;
}
function Gn(e) {
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
  for (const n of e?.facets ?? []) t[n.key] = Gn(n);
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
function Fd(e) {
  return e.entity !== null;
}
function Yn(e) {
  return e.entity === null && e.view === "cards";
}
function Cl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Qn(e, t = {}) {
  const a = t.landing === "entity" ? ts(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && es(t.view) ? t.view : bl,
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
    n[a.key] = s && s.kind === a.kind ? s : Gn(a);
  }
  return n;
}
function cn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Ml(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function wt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Sl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function El(e) {
  return String(e + 1).padStart(2, "0");
}
const Nn = "—";
function Ie(e, t) {
  return e.find((n) => n.role === t);
}
function is(e, t) {
  return e.filter((n) => n.role === t);
}
function Pl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Al = ["id", "entityKey", "entityLabel"];
function Be(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Al.includes(n))
      return t[n];
  }
}
function Aa(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Tl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function zl(e, t) {
  if (e == null || e === "") return Nn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Ml(n) : String(e);
  }
  return t === "date" ? Sl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Nn : String(e);
}
function jt(e, t) {
  const n = Be(e, t);
  return e.format ? e.format(n, t) : zl(n, e.kind);
}
function Rl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function cs(e, t) {
  const n = jt(e, t), a = Rl(Be(e, t));
  return a && a !== n ? a : n;
}
function un(e, t) {
  return e ? jt(e, t) : "";
}
function Ta(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ll = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function za(e) {
  return [Ll[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Dn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Fl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Nl(e) {
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
  for (const s of Nl(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), i = r ? s.slice(1) : s, o = r ? { negated: !0 } : {}, u = Fl.exec(i);
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
const Pn = (e) => e.toLowerCase().replace(/\s+/g, ""), Dl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Il(e, t, n) {
  const a = Pn(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && Pn(u.label) === a
  );
  if (l) return Be(l, t);
  const r = n.facets.find((u) => Pn(u.label) === a);
  if (r && r.key in t.fields) return t.fields[r.key];
  const i = Dl.find(([u]) => u === a)?.[1];
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
function An(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Ra(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Ol(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const o = Ie(r, i), u = o ? Be(o, t) : void 0;
      return typeof u == "string" && An(u, e.value);
    });
  }
  const a = Il(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (i) => e.comparator === "=" ? Ra(String(i), e.value) : An(String(i), e.value)
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
    return e.comparator === "=" ? Ra(String(a), e.value) : An(String(a), e.value);
  }
  const s = Number(e.value), l = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(l) ? null : Kl(e.comparator, l, s);
}
function Bl(e, t, n) {
  const a = Ol(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function Kl(e, t, n) {
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
function Vl(e, t, n) {
  return e.length ? e.some((a) => a.every((s) => Bl(s, t, n))) : !0;
}
function La(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Xt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + La(e.value) : `${t}${e.field}${e.comparator}${La(e.value)}`;
}
function Nd(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function pt(e) {
  return e.filter((t) => t.length).map((t) => t.map(Xt).join(" ")).join(" OR ");
}
function ql(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function Wl(e) {
  const t = Fe(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(Xt).join(" ")
  };
}
function Fa(e, t) {
  return [...e.map(Xt), t.trim()].filter(Boolean).join(" ");
}
const Na = (e, t) => e.toLowerCase() === t.toLowerCase();
function bn(e, t) {
  return !!e.negated == !!t.negated && us(e, t);
}
function gn(e, t) {
  return !!e.negated != !!t.negated && us(e, t);
}
function us(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Na(e.value, t.value) : t.kind === "text" && Na(e.value, t.value);
}
function Ul(e, t) {
  return t.filter((n) => !e.some((a) => bn(a, n)));
}
function $n(e, t) {
  const n = Fe(e), a = Fe(t);
  return n.length ? a.length ? pt(
    n.flatMap((s) => a.map((l) => [...s, ...Ul(s, l)]))
  ) : pt(n) : pt(a);
}
const Da = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function ds(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Hl = 7, jl = 3;
function Xl(e, t, n, a) {
  const s = (t * Hl + cn(n)) % a, l = [];
  for (let r = 0; r < Math.min(jl, a); r++)
    l.push(ds(e, (s + r) % a));
  return l;
}
function Gl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Yl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Yl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function Ql(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, r = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${r}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return sn[n % sn.length];
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
      return sn[n % sn.length];
    case "date":
      return l;
    default:
      return;
  }
}
function Zl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const u = l[o % l.length], d = Math.floor(o / l.length), m = cn(`${a}:${e.key}:${u[0]}:${o}`), k = ds(e.key, o), y = new Date(s.getTime() - m % 900 * 36e5).toISOString(), $ = {};
    for (const x of e.columns ?? []) {
      const _ = x.field ?? x.key;
      if (!_ || x.value) continue;
      const b = Ql(x, {
        hash: cn(`${m}:${_}`),
        sample: u,
        revision: d,
        updatedAt: y
      });
      b !== void 0 && ($[_] = b);
    }
    for (const x of e.facets)
      $[x.key] = Gl(x, cn(`${m}:${x.key}`));
    for (const [x, _] of r)
      $[x] = _ === e.key ? k : Xl(_, o, x, n);
    i.push({ id: k, entityKey: e.key, entityLabel: e.label, fields: $ });
  }
  return i;
}
function Jl(e, t) {
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
function er(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", l = a === "date" || n.role === "updated";
  return (r, i) => {
    const o = Be(n, r), u = Be(n, i);
    return s ? Number(u ?? 0) - Number(o ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(o ?? "")) : String(u ?? "").localeCompare(String(o ?? ""));
  };
}
function tr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = Zl(a, { ...e, scopes: r });
    return t.set(a.key, i), i;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: r, offset: i }) {
      const o = Fe(a.expr), u = l ? [l] : s.entities, d = [], m = [];
      for (const $ of u)
        for (const x of n($, s))
          d.push(x), (l ? Jl(x, a.facets) : !0) && Vl(o, x, $) && m.push(x);
      const k = rt(l, a.sort, s), y = m.sort(er(ns(l, s), k.key));
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
function fs(e, t) {
  return ps(e, t.id);
}
function ps(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Zn(e, t) {
  return fs(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function vs(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Fe(t).flat();
  if (!a) return n;
  const s = Fe(n);
  return s.some((i) => i.some((o) => bn(o, a))) ? n : s.some((i) => i.some((o) => gn(o, a))) ? pt(
    s.map(
      (i) => i.map((o) => gn(o, a) ? a : o)
    )
  ) : `${n} ${t}`;
}
function nr(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function ar(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Fe(t).flat();
  if (!n) return null;
  const a = Fe(e).flat();
  return a.some((s) => bn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => gn(s, n)) ? n.negated ? "in" : "out" : null;
}
function sr(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Fe(t).flat();
  if (!n) return e;
  const a = Fe(e), s = a.map(
    (l) => l.filter((r) => !bn(r, n) && !gn(r, n))
  );
  return s.every((l, r) => l.length === a[r]?.length) ? e : pt(s);
}
function Ze(e) {
  return e.metaKey || e.ctrlKey ? { exclude: !0 } : {};
}
function lr(e, t, n, a = {}) {
  const s = Zn(e, n);
  return vs(t.expr, a.exclude ? nr(s) : s);
}
function ms(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || !t.trim()) return t;
  const a = Fe(t), s = a.map(
    (l) => l.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((l, r) => l.length === a[r]?.length) ? t : pt(s);
}
function hs(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const gs = Symbol("dc.shellContext");
function rr(e) {
  return Un(gs, e), e;
}
function be() {
  const e = St(gs, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Jn = "e", ea = "v", ta = "s", na = "d", aa = "q", sa = "p", la = "f_", _s = "*", or = [
  Jn,
  ea,
  ta,
  na,
  aa,
  sa
], In = "..", ys = ",", ir = [
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
function Tn(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of ir) t = t.replace(n, a);
  return t;
}
function et(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ws(e) {
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
function cr(e) {
  return or.includes(e) || e.startsWith(la);
}
function Ia(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function ur(e, t) {
  const n = et(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(ys).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => a.has(l)) };
    }
    case "range": {
      const a = n.indexOf(In), s = (a === -1 ? n : n.slice(0, a)).trim(), l = (a === -1 ? "" : n.slice(a + In.length)).trim(), r = s === "" ? null : Number(s), i = l === "" ? null : Number(l);
      let o = r !== null && Number.isFinite(r) ? Ia(r, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? Ia(i, e.min, e.max) : null;
      return o !== null && u !== null && o > u && ([o, u] = [u, o]), { kind: "range", min: o, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function dr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(ys) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${In}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function fr(e, t, n = {}) {
  const a = Qn(t, n), s = new Map(ws(e)), l = s.get(Jn), r = l === void 0 ? a.entity : et(l), i = r === _s ? null : bt(t, r), o = s.get(ea), u = o && es(et(o)) ? et(o) : a.view, d = s.get(ta), m = rt(i, d ? et(d) : n.sort, t), k = s.get(na), y = k ? et(k) === "asc" ? "asc" : "desc" : a.dir, $ = s.get(aa), x = s.get(sa), _ = x === void 0 ? 1 : Number(et(x)), b = Number.isFinite(_) ? Math.max(1, Math.floor(_)) : 1, z = {};
  for (const P of i?.facets ?? []) {
    const A = s.get(`${la}${P.key}`);
    z[P.key] = A === void 0 ? Gn(P) : ur(P, A);
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
  const s = Qn(t, n), l = bt(t, e.entity), r = ws(a).filter(([m]) => !cr(m)), i = [], o = (m, k) => i.push([m, Tn(k)]), u = l?.key ?? null;
  u !== s.entity && o(Jn, u ?? _s), e.view !== s.view && o(ea, e.view), e.sort !== s.sort && o(ta, e.sort), e.dir !== s.dir && o(na, e.dir), e.expr.trim() !== "" && o(aa, e.expr);
  for (const m of l?.facets ?? []) {
    const k = e.facets[m.key];
    if (!k) continue;
    const y = dr(k, m);
    y !== null && i.push([`${la}${m.key}`, Tn(y)]);
  }
  e.page > 1 && o(sa, String(e.page));
  const d = [
    ...r.map(([m, k]) => [Tn(m), k]),
    ...i
  ];
  return d.length ? `?${d.map(([m, k]) => k === "" ? m : `${m}=${k}`).join("&")}` : "";
}
const _n = "entity", Ut = "expr";
function pr(e, t) {
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
    s && ss(s) && n.push(...pr(a, s));
  }
  return Fe(e.expr).forEach((a, s) => {
    a.forEach((l, r) => {
      n.push({
        id: `${Ut}:${s}:${r}`,
        label: Xt(l),
        facetKey: Ut,
        group: s,
        index: r,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function vr(e, t, n = null) {
  if (kn(e)) {
    const l = rt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = ra(e, t).filter((l) => l.facetKey !== Ut).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function mr(e) {
  const { adapter: t } = e, n = v(() => Dt(e.schema)), a = v(() => Dt(e.defaults) ?? {}), s = v(() => fr(t.search.value, n.value, a.value)), l = v(() => bt(n.value, s.value.entity)), r = v(() => l.value ?? ts(n.value, a.value)), i = v(() => as(l.value, n.value)), o = v(() => rt(l.value, s.value.sort, n.value)), u = (_, b) => {
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
    summary: v(() => vr(s.value, l.value, n.value)),
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
      if (_.facetKey === Ut) {
        const b = ql(Fe(s.value.expr), _.group ?? 0, _.index ?? 0);
        k({ expr: pt(b) }, d());
        return;
      }
      y(_.facetKey, (b) => b.kind === "chips" && _.option ? { kind: "chips", selected: b.selected.filter((z) => z !== _.option) } : b.kind === "range" ? { kind: "range", min: null, max: null } : b.kind === "toggle" ? { kind: "toggle", on: !1 } : b);
    },
    clearFilters() {
      k({ entity: null, expr: "", facets: At(null) }, d());
    },
    reset() {
      u(Qn(n.value, a.value), d());
    },
    hrefFor(_) {
      const b = { ...s.value, ..._ };
      return b.page = _.page ?? (Pa(_) ? 1 : s.value.page), b.facets = os(bt(n.value, b.entity), b.facets), `${t.path.value}${Oa(b, n.value, a.value, t.search.value)}`;
    }
  };
}
function hr(e) {
  const t = Et([]), n = q(0), a = q(!1), s = Et(null);
  let l = 0, r = null;
  const i = v(() => (e.query.value.page - 1) * e.limit.value), o = v(() => Cl(n.value, e.limit.value)), u = () => {
    const _ = e.query.value, b = e.within?.value.trim(), z = ms(e.entity.value, _.expr);
    return b ? { ..._, expr: $n(b, z) } : z === _.expr ? _ : { ..._, expr: z };
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
const Bt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, gr = ["aria-label"], _r = ["role", "aria-label"], yr = ["data-dc-item"], wr = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, kr = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], br = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, $r = { class: "dc-menu__label dc-truncate" }, xr = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Cr = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Mr = /* @__PURE__ */ ie({
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
    return hl(() => {
      $(), a.autofocus && _(b(null, 1));
    }), ke(() => a.at, $, { deep: !0 }), ke(() => a.items, () => void $(), { deep: !0 }), Qe(() => {
      o.value = null;
    }), t({ root: l }), (E, N) => {
      const le = Qa("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Le(x.value),
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
          }, F(ae.heading.label), 9, yr)) : R("", !0),
          (f(!0), h(ne, null, ve(ae.entries, ({ item: X, index: ye }) => (f(), h(ne, {
            key: X.id ?? `${ye}-${X.label ?? ""}`
          }, [
            X.separator ? (f(), h("div", wr)) : (f(), h("button", {
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
              w("span", br, F(X.checked ? "✓" : ""), 1),
              w("span", $r, F(X.label), 1),
              X.shortcut ? (f(), h("span", xr, F(X.shortcut), 1)) : X.items?.length ? (f(), h("span", Cr, "›")) : R("", !0)
            ], 40, kr))
          ], 64))), 128))
        ], 8, _r))), 128)),
        o.value !== null && u.value ? (f(), se(le, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: u.value,
          label: e.items[o.value]?.label,
          autofocus: d.value,
          onChoose: N[0] || (N[0] = (ae) => s("choose", ae)),
          onDismiss: N[1] || (N[1] = (ae) => P(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
      ], 44, gr);
    };
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, oa = /* @__PURE__ */ de(Mr, [["__scopeId", "data-v-9b1413fa"]]), Sr = { class: "dc-pick" }, Er = ["id"], Pr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Ar = { class: "dc-pick__label" }, Tr = /* @__PURE__ */ ie({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Hn() ?? "dc-pick", l = q(null), r = q(null), i = q(null), o = q(!1), u = v(() => i.value !== null), d = v(
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
    }), Qe(() => window.removeEventListener("pointerdown", b, !0));
    function z(P) {
      $(!0), !(P.id === void 0 || P.id === n.modelValue) && a("update:modelValue", P.id);
    }
    return (P, A) => (f(), h("span", Sr, [
      w("span", {
        id: `${M(s)}-name`,
        class: "dc-pick__name"
      }, F(e.label), 9, Er),
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
        w("span", Ar, F(d.value?.label), 1)
      ], 42, Pr),
      A[1] || (A[1] = w("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      i.value ? (f(), se(oa, {
        key: 0,
        ref_key: "menu",
        ref: r,
        class: "dc-pick__list",
        style: Le(k.value),
        items: m.value,
        at: i.value,
        label: e.label,
        autofocus: o.value,
        onChoose: z,
        onDismiss: A[0] || (A[0] = (D) => $(!0))
      }, null, 8, ["style", "items", "at", "label", "autofocus"])) : R("", !0)
    ]));
  }
}), zn = /* @__PURE__ */ de(Tr, [["__scopeId", "data-v-86680e46"]]);
function zr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = q(!0);
  let a = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++a, r = e.query.value, i = e.schema.value, o = e.entities.value, u = e.within?.value.trim() ?? "";
    n.value = kn(r) && !u;
    const d = /* @__PURE__ */ new Map();
    for (const m of o) {
      const k = ms(m, r.expr), y = u ? $n(u, k) : k, $ = e.source.value.query({
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
const Rr = 25, ks = (e, t) => e.toLowerCase() === t.toLowerCase();
function Lr(e, t) {
  return e.find((n) => ks(n.id, t));
}
function Fr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== Ut || !i.field || !i.value) return null;
    const o = hs(e.schema.value, i.field);
    return o ? { entity: o, id: i.value, key: `${o.key}:${i.value}` } : null;
  }, s = (i) => {
    const { entity: o, id: u } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ps(o, u) ?? "",
        facets: At(o),
        sort: rt(o, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: Rr,
      offset: 0
    });
  }, l = (i, o) => {
    const u = un(Ie(i.columns ?? [], "identity"), o);
    return u === Nn || ks(u, o.id) ? "" : u;
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
        const { reference: $ } = o[y], x = Lr(k.rows, $.id);
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
const Nr = ["data-dc-expanded"], Dr = { class: "dc-header__domain" }, Ir = {
  key: 0,
  class: "dc-header__within"
}, Or = ["title"], Br = ["data-dc-more", "title"], Kr = ["title", "aria-label"], Vr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, qr = ["title", "aria-label", "onClick"], Wr = ["onKeydown"], Ur = ["aria-expanded", "aria-controls"], Hr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, jr = { class: "dc-header__sr" }, Xr = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Gr = ["disabled"], Yr = ["title"], Qr = ["value", "onKeydown"], Zr = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Jr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, eo = ["disabled"], to = {
  key: 1,
  class: "dc-header__actions"
}, no = /* @__PURE__ */ ie({
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
    ), i = v(() => l.value.formatCount ?? wt), o = zr({
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
      () => (n.views ?? [...Ja]).map((T) => ({ key: T, label: $l[T] }))
    ), x = v(() => Xn(s.query.value.view, n.views)), _ = v(
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
    }), E = Fr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...y.value, ...s.terms.value])
    });
    function N(T) {
      return hs(l.value, T)?.scopeLabel ?? T;
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
      T && (s.setExpression($n(s.query.value.expr, T)), X.value = "");
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
    ), ke(W, Me, { flush: "post" }), Qe(() => ze?.disconnect());
    const Ce = v(() => s.query.value.page), He = v(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !Yn(s.query.value)
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
        w("span", Dr, F(l.value.label), 1),
        y.value.length ? (f(), h("span", Ir, [
          K[5] || (K[5] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(ne, null, ve(y.value, (j) => (f(), h("span", {
            key: `scope:${j.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: ae(j)
          }, F(ae(j)), 9, Or))), 128))
        ])) : R("", !0),
        w("div", {
          ref_key: "termBar",
          ref: ee,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ge.value,
          title: M(s).summary.value,
          onScroll: Me
        }, [
          _.value ? (f(), se(zn, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": M(s).query.value.entity ?? "",
            options: k.value,
            onOpen: M(o).refresh,
            "onUpdate:modelValue": he
          }, null, 8, ["model-value", "options", "onOpen"])) : R("", !0),
          ue(zn, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": x.value,
            options: $.value,
            "onUpdate:modelValue": b
          }, null, 8, ["model-value", "options"]),
          P.value ? (f(), h(ne, { key: 1 }, [
            ue(zn, {
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
            }, F(D.value ? "↓" : "↑"), 9, Kr)
          ], 64)) : R("", !0),
          (f(!0), h(ne, null, ve(W.value, (j) => (f(), h(ne, {
            key: j.term.id
          }, [
            j.or ? (f(), h("span", Vr, "or")) : R("", !0),
            w("button", {
              type: "button",
              class: Pt(["dc-term dc-mono", { "dc-term--idle": j.idle }]),
              title: j.idle ? `Not applied to ${M(s).entity.value?.label} — remove ${ae(j.term)}` : `Remove ${ae(j.term)}`,
              "aria-label": `Remove ${ae(j.term)}`,
              onClick: (qe) => M(s).removeTerm(j.term)
            }, F(ae(j.term)), 11, qr)
          ], 64))), 128)),
          vn(w("input", {
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
              Xe(Re(Ee, ["prevent"]), ["enter"]),
              Xe(Re(C, ["prevent"]), ["esc"]),
              Xe(O, ["backspace"])
            ]
          }, null, 40, Wr), [
            [mn, X.value]
          ])
        ], 40, Br),
        w("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: K[2] || (K[2] = (j) => a("toggle"))
        }, [
          w("span", Hr, F(e.expanded ? "▲" : "▼"), 1),
          w("span", jr, F(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Ur)
      ]),
      He.value ? (f(), h("nav", Xr, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: Ce.value <= 1,
          onClick: K[3] || (K[3] = (j) => M(s).setPage(Ce.value - 1))
        }, [...K[6] || (K[6] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Gr),
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
            style: Le({ width: it.value }),
            value: Ve.value,
            onFocus: yt,
            onInput: B,
            onKeydown: [
              Xe(Re(U, ["prevent"]), ["enter"]),
              Xe(Re(te, ["prevent"]), ["esc"])
            ],
            onBlur: U
          }, null, 44, Qr),
          w("span", Zr, "/ " + F(Ke.value), 1)
        ], 8, Yr),
        w("span", Jr, F(Ne.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: Ce.value >= M(s).pageCount.value,
          onClick: K[4] || (K[4] = (j) => M(s).setPage(Ce.value + 1))
        }, [...K[7] || (K[7] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, eo)
      ])) : R("", !0),
      T.$slots.actions ? (f(), h("div", to, [
        $e(T.$slots, "actions", {}, void 0, !0)
      ])) : R("", !0)
    ], 8, Nr));
  }
}), bs = /* @__PURE__ */ de(no, [["__scopeId", "data-v-ed64bdd6"]]), ao = { class: "dc-facet" }, so = ["id"], lo = { class: "dc-facet__body" }, ro = ["aria-labelledby"], oo = ["aria-pressed", "data-dc-active", "onClick"], io = ["aria-labelledby"], co = ["aria-label", "placeholder", "onKeydown"], uo = ["aria-label", "placeholder", "onKeydown"], fo = ["aria-checked"], po = { class: "dc-switch__text" }, vo = ["data-dc-active"], mo = /* @__PURE__ */ ie({
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
    return (m, k) => (f(), h("div", ao, [
      w("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, F(e.facet.label), 9, so),
      w("div", lo, [
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
          }, F(y), 9, oo))), 128))
        ], 8, ro)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          vn(w("input", {
            "onUpdate:modelValue": k[0] || (k[0] = (y) => r.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: Xe(Re(u, ["prevent"]), ["enter"])
          }, null, 40, co), [
            [mn, r.value]
          ]),
          k[2] || (k[2] = w("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          vn(w("input", {
            "onUpdate:modelValue": k[1] || (k[1] = (y) => i.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: Xe(Re(u, ["prevent"]), ["enter"])
          }, null, 40, uo), [
            [mn, i.value]
          ])
        ], 8, io)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          w("span", po, F(e.facet.text), 1),
          w("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...k[3] || (k[3] = [
            w("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, vo)
        ], 8, fo)) : R("", !0)
      ])
    ]));
  }
}), $s = /* @__PURE__ */ de(mo, [["__scopeId", "data-v-36d1334b"]]), ho = ["id"], go = { class: "dc-panel__section dc-panel__rows" }, _o = { class: "dc-panel__row" }, yo = ["for"], wo = ["title", "aria-label", "onClick"], ko = ["id", "placeholder", "onKeydown"], bo = { class: "dc-panel__actions" }, $o = ["disabled"], xo = {
  key: 0,
  class: "dc-panel__section"
}, Co = /* @__PURE__ */ ie({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Ht(), s = be(), l = v(() => Wl(s.query.value.expr)), r = v(() => l.value.parts.map(Xt)), i = q(l.value.text), o = q(null);
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
      onKeydown: _[2] || (_[2] = Xe(Re((b) => n("close"), ["stop"]), ["esc"]))
    }, [
      w("section", go, [
        w("div", _o, [
          w("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, yo),
          w("div", {
            class: "dc-field",
            onMousedown: _[1] || (_[1] = Re((b) => o.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(ne, null, ve(r.value, (b, z) => (f(), h("button", {
              key: `${z}:${b}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${b}`,
              "aria-label": `Remove ${b}`,
              onClick: (P) => m(z)
            }, F(b), 9, wo))), 128)),
            vn(w("input", {
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
                Xe(Re(d, ["prevent"]), ["enter"]),
                Xe(k, ["backspace"])
              ]
            }, null, 40, ko), [
              [mn, i.value]
            ])
          ], 32)
        ]),
        M(s).entity.value ? (f(!0), h(ne, { key: 0 }, ve(M(s).entity.value.facets, (b) => (f(), se($s, {
          key: b.key,
          facet: b,
          value: M(s).query.value.facets[b.key],
          onUpdate: (z) => $(b.key, z)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : R("", !0),
        w("div", bo, [
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
          }, " Reset ", 8, $o)
        ])
      ]),
      a["panel-section"] ? (f(), h("section", xo, [
        $e(x.$slots, "panel-section", {}, void 0, !0)
      ])) : R("", !0)
    ], 40, ho));
  }
}), xs = /* @__PURE__ */ de(Co, [["__scopeId", "data-v-2642c02d"]]), Mo = ["checked", "indeterminate"], Cs = /* @__PURE__ */ ie({
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
    }, null, 40, Mo));
  }
}), So = {
  key: 0,
  class: "dc-actions"
}, Eo = {
  key: 0,
  class: "dc-actions__select"
}, Po = {
  key: 0,
  class: "dc-actions__all"
}, Ao = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, To = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, zo = { class: "dc-actions__ops" }, Ro = ["disabled"], Lo = ["disabled"], Fo = /* @__PURE__ */ ie({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => n.entity.value), s = v(() => !Yn(n.query.value)), l = v(() => s.value && n.selectable.value), r = v(
      () => Xn(n.query.value.view, t.views) === "table"
    ), i = v(
      () => s.value && (l.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), o = v(() => n.selection.value.ids.length), u = v(() => o.value ? `${o.value} selected` : r.value ? "None selected" : "Select all");
    function d(m) {
      return o.value ? `${m} ${o.value}` : m;
    }
    return (m, k) => i.value ? (f(), h("div", So, [
      l.value ? (f(), h("div", Eo, [
        r.value ? (f(), h("span", To, F(u.value), 1)) : (f(), h("label", Po, [
          ue(Cs),
          w("span", Ao, F(u.value), 1)
        ])),
        o.value ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[0] || (k[0] = (y) => M(n).clearSelection())
        }, " Clear ")) : R("", !0)
      ])) : R("", !0),
      w("div", zo, [
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
        ])) : R("", !0),
        a.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !o.value,
          onClick: k[2] || (k[2] = (y) => M(n).duplicate())
        }, F(d(a.value.duplicate)), 9, Ro)) : R("", !0),
        a.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !o.value,
          onClick: k[3] || (k[3] = (y) => M(n).delete())
        }, F(d(a.value.delete)), 9, Lo)) : R("", !0)
      ])
    ])) : R("", !0);
  }
}), Ms = /* @__PURE__ */ de(Fo, [["__scopeId", "data-v-03ff2a91"]]);
function No(e, t) {
  if (!e) return null;
  const n = Be(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Do(e, t) {
  const n = Ie(t, "state"), a = Ie(t, "tint");
  return {
    identity: un(Ie(t, "identity"), e),
    reference: un(Ie(t, "reference"), e),
    metrics: is(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: jt(s, e)
    })),
    state: n ? Be(n, e) ?? null : null,
    updated: un(Ie(t, "updated"), e),
    image: No(Ie(t, "image"), e),
    tint: a ? Be(a, e) ?? null : null
  };
}
function Ss(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Tl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: El(t),
    parts: Do(e, l),
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
      (n, a) => Ss(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Io = ["data-dc-status"], Oo = /* @__PURE__ */ ie({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, F(e.status), 9, Io));
  }
}), Gt = /* @__PURE__ */ de(Oo, [["__scopeId", "data-v-23e59fbf"]]), Bo = ["title"], Ko = { key: 1 }, Vo = /* @__PURE__ */ ie({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((o) => o.key === t.column.drill) ?? null), s = v(() => t.column.label ?? ""), l = v(() => jt(t.column, t.entry.row));
    function r(i) {
      i.stopPropagation(), a.value && n.drill(t.entry.row, a.value, Ze(i));
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
    ], 8, Bo)) : (f(), h("span", Ko, [
      $e(i.$slots, "default", {}, () => [
        We(F(l.value), 1)
      ], !0)
    ]));
  }
}), Yt = /* @__PURE__ */ de(Vo, [["__scopeId", "data-v-f2501b17"]]), qo = ["data-dc-active", "aria-pressed", "aria-label"], Wo = /* @__PURE__ */ ie({
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
    }, F(e.pinned ? "★" : "☆"), 9, qo));
  }
}), ia = /* @__PURE__ */ de(Wo, [["__scopeId", "data-v-ef63d763"]]), Uo = ["src"], Ho = /* @__PURE__ */ ie({
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
    }, null, 40, Uo)) : R("", !0);
  }
}), ca = /* @__PURE__ */ de(Ho, [["__scopeId", "data-v-afaab300"]]), jo = ["data-dc-standing", "title", "aria-label"], Xo = /* @__PURE__ */ ie({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => fs(t.entry.entity, t.entry.row)), s = v(() => ar(n.query.value.expr, a.value)), l = v(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(i) {
      i.stopPropagation(), n.setExpression(sr(n.query.value.expr, a.value));
    }
    return (i, o) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, F(s.value === "in" ? "+" : "−"), 9, jo)) : R("", !0);
  }
}), Qt = /* @__PURE__ */ de(Xo, [["__scopeId", "data-v-29cbf9c3"]]), Go = ["title", "aria-label"], Yo = /* @__PURE__ */ ie({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    );
    function s(l) {
      l.stopPropagation(), n.drill(t.entry.row, null, Ze(l));
    }
    return (l, r) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: s
    }, " → ", 8, Go)) : R("", !0);
  }
}), Zt = /* @__PURE__ */ de(Yo, [["__scopeId", "data-v-feb1c62d"]]), Qo = ["checked", "aria-label"], Rt = /* @__PURE__ */ ie({
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
    }, null, 8, Qo));
  }
}), Zo = { class: "dc-cards" }, Jo = { class: "dc-card__top dc-mono" }, ei = { class: "dc-card__lead" }, ti = {
  key: 1,
  class: "dc-card__entity"
}, ni = { class: "dc-card__top-right" }, ai = ["onClick"], si = { class: "dc-card__names" }, li = { class: "dc-card__primary" }, ri = { class: "dc-card__secondary dc-mono" }, oi = { class: "dc-card__metrics dc-mono" }, ii = {
  key: 0,
  class: "dc-card__date"
}, ci = /* @__PURE__ */ ie({
  __name: "CardsView",
  setup(e) {
    const t = be(), n = zt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", Zo, [
      (f(!0), h(ne, null, ve(M(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-card"
      }, [
        w("div", Jo, [
          w("span", ei, [
            M(t).selectable.value ? (f(), se(Rt, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : R("", !0),
            We(" " + F(r.ordinal) + " ", 1),
            a.value ? (f(), h("span", ti, F(r.entityLabel), 1)) : R("", !0)
          ]),
          w("span", ni, [
            r.parts.state ? (f(), se(Gt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : R("", !0),
            ue(Qt, { entry: r }, null, 8, ["entry"]),
            ue(Zt, { entry: r }, null, 8, ["entry"]),
            M(t).pinnable.value ? (f(), se(ia, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : R("", !0)
          ])
        ]),
        w("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => M(t).activate(r.row, M(Ze)(i))
        }, [
          r.parts.image ? (f(), se(ca, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : R("", !0),
          w("span", si, [
            w("span", li, F(r.parts.identity), 1),
            w("span", ri, F(r.parts.reference), 1)
          ])
        ], 8, ai),
        w("div", oi, [
          (f(!0), h(ne, null, ve(r.parts.metrics.slice(0, 2), (i) => (f(), se(Yt, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, {
            default: Ge(() => [
              We(F(i.label) + " " + F(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), h("span", ii, F(r.parts.updated), 1)) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Es = /* @__PURE__ */ de(ci, [["__scopeId", "data-v-28581543"]]), ui = { class: "dc-grid" }, di = ["onClick"], fi = { class: "dc-tile__scrim" }, pi = { class: "dc-tile__top dc-mono" }, vi = { class: "dc-tile__chip" }, mi = { class: "dc-tile__caption" }, hi = { class: "dc-tile__secondary dc-truncate" }, gi = { class: "dc-tile__primary" }, _i = /* @__PURE__ */ ie({
  __name: "GridView",
  setup(e) {
    const t = be(), n = zt();
    return (a, s) => (f(), h("div", ui, [
      (f(!0), h(ne, null, ve(M(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        w("button", {
          type: "button",
          class: "dc-tile",
          style: Le({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => M(t).activate(l.row, M(Ze)(r))
        }, [
          l.parts.image ? (f(), se(ca, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : R("", !0),
          w("span", fi, [
            w("span", pi, [
              w("span", vi, F(l.ordinal), 1)
            ]),
            w("span", mi, [
              w("span", hi, F(l.parts.reference), 1),
              w("span", gi, F(l.parts.identity), 1)
            ])
          ])
        ], 12, di),
        M(t).selectable.value ? (f(), se(Rt, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0)
      ]))), 128))
    ]));
  }
}), Ps = /* @__PURE__ */ de(_i, [["__scopeId", "data-v-7df25d40"]]), yi = { class: "dc-links" }, wi = ["onClick"], ki = { class: "dc-link__primary dc-truncate" }, bi = { class: "dc-link__secondary dc-mono dc-truncate" }, $i = /* @__PURE__ */ ie({
  __name: "LinksView",
  setup(e) {
    const t = be(), n = zt();
    return (a, s) => (f(), h("div", yi, [
      (f(!0), h(ne, null, ve(M(n), (l) => (f(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        M(t).selectable.value ? (f(), se(Rt, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        w("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => M(t).activate(l.row, M(Ze)(r))
        }, [
          w("span", ki, F(l.parts.identity), 1),
          w("span", bi, F(l.parts.reference), 1)
        ], 8, wi)
      ]))), 128))
    ]));
  }
}), As = /* @__PURE__ */ de($i, [["__scopeId", "data-v-08d0266c"]]), xi = {
  class: "dc-list",
  role: "list"
}, Ci = ["onClick"], Mi = { class: "dc-list__ordinal dc-mono" }, Si = { class: "dc-list__identity" }, Ei = { class: "dc-list__primary dc-truncate" }, Pi = { class: "dc-list__secondary dc-mono dc-truncate" }, Ai = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Ti = { class: "dc-list__metrics dc-mono" }, zi = { class: "dc-list__trailing" }, Ri = /* @__PURE__ */ ie({
  __name: "ListView",
  setup(e) {
    const t = be(), n = zt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", xi, [
      (f(!0), h(ne, null, ve(M(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        M(t).selectable.value ? (f(), se(Rt, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        w("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => M(t).activate(r.row, M(Ze)(i))
        }, [
          w("span", Mi, F(r.ordinal), 1),
          w("span", Si, [
            w("span", Ei, F(r.parts.identity), 1),
            w("span", Pi, F(r.parts.reference), 1)
          ])
        ], 8, Ci),
        a.value ? (f(), h("span", Ai, F(r.entityLabel), 1)) : R("", !0),
        w("span", Ti, [
          (f(!0), h(ne, null, ve(r.parts.metrics.slice(0, 2), (i) => (f(), se(Yt, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", zi, [
          r.parts.state ? (f(), se(Gt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : R("", !0),
          ue(Qt, { entry: r }, null, 8, ["entry"]),
          ue(Zt, { entry: r }, null, 8, ["entry"]),
          M(t).pinnable.value ? (f(), se(ia, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), On = /* @__PURE__ */ de(Ri, [["__scopeId", "data-v-11b9f46c"]]), Li = { class: "dc-preview" }, Fi = { class: "dc-preview__pager dc-mono" }, Ni = ["disabled"], Di = { "aria-live": "polite" }, Ii = ["disabled"], Oi = {
  key: 0,
  class: "dc-preview__card"
}, Bi = ["src"], Ki = { class: "dc-preview__body" }, Vi = { class: "dc-preview__top" }, qi = { class: "dc-preview__badges" }, Wi = { class: "dc-preview__entity dc-mono" }, Ui = { class: "dc-preview__marks" }, Hi = { class: "dc-preview__primary" }, ji = { class: "dc-preview__secondary dc-mono" }, Xi = { class: "dc-preview__fields" }, Gi = { class: "dc-preview__key" }, Yi = { class: "dc-preview__value dc-mono" }, Qi = /* @__PURE__ */ ie({
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
    return (o, u) => (f(), h("div", Li, [
      w("div", Fi, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: u[0] || (u[0] = (d) => i(-1))
        }, " ‹ ", 8, Ni),
        w("span", Di, F(r.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= M(n).length - 1,
          onClick: u[1] || (u[1] = (d) => i(1))
        }, " › ", 8, Ii)
      ]),
      s.value ? (f(), h("div", Oi, [
        w("div", {
          class: "dc-preview__media",
          style: Le({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Bi)) : (f(), h(ne, { key: 1 }, [
            We(" preview ")
          ], 64))
        ], 4),
        w("div", Ki, [
          w("div", Vi, [
            w("span", qi, [
              M(t).selectable.value ? (f(), se(Rt, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : R("", !0),
              s.value.parts.state ? (f(), se(Gt, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : R("", !0),
              w("span", Wi, F(s.value.entityLabel), 1)
            ]),
            w("span", Ui, [
              ue(Qt, { entry: s.value }, null, 8, ["entry"]),
              ue(Zt, { entry: s.value }, null, 8, ["entry"]),
              M(t).pinnable.value ? (f(), se(ia, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : R("", !0)
            ])
          ]),
          w("div", null, [
            w("div", Hi, F(s.value.parts.identity), 1),
            w("div", ji, F(s.value.parts.reference), 1)
          ]),
          w("dl", Xi, [
            (f(!0), h(ne, null, ve(l.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", Gi, F(d.key), 1),
              w("dd", Yi, [
                d.column && s.value ? (f(), se(Yt, {
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
            onClick: u[2] || (u[2] = (d) => M(t).activate(s.value.row, M(Ze)(d)))
          }, " Open record → ")
        ])
      ])) : R("", !0)
    ]));
  }
}), Ts = /* @__PURE__ */ de(Qi, [["__scopeId", "data-v-6be41155"]]);
function Zi() {
  const e = be();
  return v(() => Pl(e.schema.value, e.entity.value));
}
const Ji = ["title"], ec = {
  key: 5,
  class: "dc-cell__text"
}, tc = /* @__PURE__ */ ie({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => t.column.kind ?? "text"), s = v(() => Be(t.column, t.entry.row)), l = v(
      () => a.value === "ordinal" ? t.entry.ordinal : jt(t.column, t.entry.row)
    ), r = v(() => s.value), i = v(() => t.column.activate === !0 || !!t.column.click), o = v(() => Dn(t.column)), u = v(() => cs(t.column, t.entry.row));
    function d(m) {
      if (!i.value) return;
      m.stopPropagation();
      const k = Ze(m);
      t.column.click?.(t.entry.row, k), t.column.activate && n.activate(t.entry.row, k);
    }
    return (m, k) => a.value === "component" && e.column.component ? (f(), se(jn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), se(Gt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), se(ca, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Le({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), se(Yt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: Pt(["dc-table__open", { "dc-truncate": o.value }]),
      title: u.value,
      onClick: d
    }, F(l.value), 11, Ji)) : (f(), h("span", ec, F(l.value), 1));
  }
}), Ba = /* @__PURE__ */ de(tc, [["__scopeId", "data-v-70ba8aa2"]]), nc = {
  key: 0,
  class: "dc-table__none"
}, ac = { class: "dc-table__detail" }, sc = ["data-dc-wrap"], lc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, rc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], oc = ["onClick"], ic = {
  key: 2,
  class: "dc-table__head"
}, cc = ["onClick"], uc = {
  key: 0,
  class: "dc-table__pick"
}, dc = ["data-dc-align", "data-dc-hide", "title"], fc = {
  key: 0,
  class: "dc-table__name"
}, pc = /* @__PURE__ */ ie({
  __name: "TableView",
  setup(e) {
    const t = be(), n = zt(), a = Zi(), s = v(
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
        Dn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function k(y, $) {
      if (!(!Dn(y) || y.activate || y.click))
        return cs(y, $.row);
    }
    return (y, $) => M(a).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": l.value ? "" : void 0
    }, [
      w("thead", null, [
        w("tr", null, [
          M(t).selectable.value ? (f(), h("th", lc, [
            ue(Cs)
          ])) : R("", !0),
          (f(!0), h(ne, null, ve(M(a), (x, _) => (f(), h("th", {
            key: M(Aa)(x, _),
            scope: "col",
            class: Pt(M(za)(x)),
            style: Le({ width: x.width }),
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
            }, F(x.label), 9, oc)) : (f(), h(ne, { key: 1 }, [
              We(F(x.label), 1)
            ], 64)),
            x.header ? (f(), h("span", ic, [
              (f(), se(jn(x.header), {
                column: x,
                entity: M(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : R("", !0)
          ], 14, rc))), 128))
        ])
      ]),
      w("tbody", null, [
        (f(!0), h(ne, null, ve(M(n), (x) => (f(), h("tr", {
          key: x.key,
          class: "dc-table__row",
          onClick: (_) => M(t).activate(x.row, M(Ze)(_))
        }, [
          M(t).selectable.value ? (f(), h("td", uc, [
            ue(Rt, {
              row: x.row,
              selected: x.selected,
              name: x.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : R("", !0),
          (f(!0), h(ne, null, ve(M(a), (_, b) => (f(), h("td", {
            key: M(Aa)(_, b),
            class: Pt(m(_)),
            "data-dc-align": M(Ta)(_),
            "data-dc-hide": _.hideBelow,
            title: k(_, x)
          }, [
            _ === s.value ? (f(), h("span", fc, [
              ue(Ba, {
                column: _,
                entry: x
              }, null, 8, ["column", "entry"]),
              ue(Qt, { entry: x }, null, 8, ["entry"]),
              _.scope ? (f(), se(Zt, {
                key: 0,
                entry: x
              }, null, 8, ["entry"])) : R("", !0)
            ])) : (f(), se(Ba, {
              key: 1,
              column: _,
              entry: x
            }, null, 8, ["column", "entry"]))
          ], 10, dc))), 128))
        ], 8, cc))), 128))
      ])
    ], 8, sc)) : (f(), h("p", nc, [
      $[2] || ($[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", ac, [
        We(F(i.value) + " has no ", 1),
        $[0] || ($[0] = w("code", null, "columns", -1)),
        $[1] || ($[1] = We(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), zs = /* @__PURE__ */ de(pc, [["__scopeId", "data-v-d92f9701"]]);
function vc(e) {
  const t = Et([]), n = q(!1), a = Et(null);
  let s = 0;
  const l = (o, u, d, m, k) => ({
    entity: o,
    rows: u.rows.map(
      (y, $) => Ss(y, $, o, e.isPinned(y.id))
    ),
    total: u.total,
    count: d ? o.count : String(u.total),
    pinned: mc(m, u, k)
  }), r = () => {
    const o = ++s, u = e.query.value, d = e.schema.value, m = e.entities.value, k = e.limit.value, y = e.within?.value.trim() ?? "", $ = kn(u) && !y, x = y ? $n(y, u.expr) : u.expr, _ = m.map((b) => ({
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
function mc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Zn(e, a);
  return !!l && vs(s, l) === s;
}
const hc = ["data-dc-pending"], gc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, _c = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, yc = {
  key: 2,
  class: "dc-types__state"
}, wc = ["data-dc-empty"], kc = ["onClick"], bc = { class: "dc-type__name" }, $c = { class: "dc-type__count dc-mono" }, xc = { class: "dc-type__sr" }, Cc = {
  key: 0,
  class: "dc-type__empty"
}, Mc = ["onClick"], Sc = { class: "dc-type__identity" }, Ec = { class: "dc-type__primary dc-truncate" }, Pc = { class: "dc-type__secondary dc-mono dc-truncate" }, Ac = { class: "dc-type__trailing dc-mono" }, Tc = { class: "dc-type__metric-value" }, zc = { class: "dc-type__metric-label" }, Rc = {
  key: 0,
  class: "dc-type__date"
}, Lc = ["onClick"], Fc = /* @__PURE__ */ ie({
  __name: "TypeCardsView",
  setup(e) {
    const t = be(), { previews: n, pending: a, error: s } = vc({
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
      M(s) ? (f(), h("p", gc, " Could not load results: " + F(M(s) instanceof Error ? M(s).message : "the data source failed."), 1)) : !r.value.length && M(a) ? (f(), h("p", _c, " Running query… ")) : r.value.length ? R("", !0) : (f(), h("p", yc, F(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
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
          w("span", bc, F(u.entity.label), 1),
          w("span", $c, F(u.count), 1),
          o[0] || (o[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", xc, "Show only " + F(u.entity.label.toLowerCase()), 1)
        ], 8, kc),
        u.rows.length ? R("", !0) : (f(), h("p", Cc, F(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(ne, null, ve(u.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (m) => M(t).activate(d.row, M(Ze)(m))
          }, [
            w("span", Sc, [
              w("span", Ec, F(d.parts.identity), 1),
              w("span", Pc, F(d.parts.reference), 1)
            ])
          ], 8, Mc),
          w("span", Ac, [
            (f(!0), h(ne, null, ve(d.parts.metrics.slice(0, 1), (m) => (f(), se(Yt, {
              key: m.column.key ?? m.label,
              class: "dc-type__metric",
              entry: d,
              column: m.column
            }, {
              default: Ge(() => [
                w("span", Tc, F(m.text), 1),
                w("span", zc, F(m.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", Rc, F(d.parts.updated), 1)) : R("", !0),
            ue(Qt, { entry: d }, null, 8, ["entry"]),
            ue(Zt, { entry: d }, null, 8, ["entry"])
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
        ], 8, Lc)) : R("", !0)
      ], 8, wc))), 128)),
      $e(i.$slots, "after", {}, void 0, !0)
    ], 8, hc));
  }
}), Rs = /* @__PURE__ */ de(Fc, [["__scopeId", "data-v-c7b8f990"]]), Nc = ["data-dc-pending"], Dc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Ic = { class: "dc-results__detail" }, Oc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Bc = {
  key: 3,
  class: "dc-results__state"
}, Kc = { class: "dc-results__detail" }, Vc = /* @__PURE__ */ ie({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = Ht(), s = {
      list: On,
      cards: Es,
      grid: Ps,
      table: zs,
      links: As,
      preview: Ts
    }, l = v(() => Yn(n.query.value)), r = v(() => Xn(n.query.value.view, t.views)), i = v(() => s[r.value] ?? On), o = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = q(null);
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
      l.value ? (f(), se(Rs, { key: 0 }, on({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Ge(() => [
            $e(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Ge(() => [
            $e(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), h("p", Dc, [
        k[1] || (k[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", Ic, F(M(n).error.value instanceof Error ? M(n).error.value.message : "The data source failed."), 1)
      ])) : !o.value && M(n).pending.value ? (f(), h("p", Oc, [...k[2] || (k[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (f(), se(jn(i.value), { key: 4 })) : (f(), h("div", Bc, [
        k[3] || (k[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", Kc, F(M(n).summary.value), 1),
        M(n).isPristine.value ? R("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: k[0] || (k[0] = (y) => M(n).clearFilters())
        }, F(M(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Nc));
  }
}), Ls = /* @__PURE__ */ de(Vc, [["__scopeId", "data-v-41f54508"]]), qc = ["data-dc-theme"], Wc = ["data-dc-width", "data-dc-align"], Uc = { class: "dc-shell__panel" }, Hc = /* @__PURE__ */ ie({
  __name: "DataShell",
  props: /* @__PURE__ */ hn({
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
  emits: /* @__PURE__ */ hn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Ot(e, "open"), r = Ot(e, "pinned"), i = Ot(e, "selected"), o = Ht(), u = St(Za, null), d = a.route || u ? null : kl(), m = a.route ?? u ?? d;
    Qe(() => d?.dispose?.());
    const k = v(() => tr({ seed: a.schema.key })), y = v(() => a.source ?? k.value), $ = mr({
      schema: () => a.schema,
      adapter: m,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), x = v(() => a.within?.trim() ?? ""), _ = hr({
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
    const b = Hn() ?? "dc-query-panel", z = q(null);
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
      const ee = lr(a.schema, $.query.value, C, Y);
      Y.exclude ? $.narrow(ee, O?.key ?? $.query.value.entity) : $.narrow(ee, O?.key ?? null, O ? void 0 : "cards"), s("drill", C, O, Y);
    }
    const ye = rr({
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
      style: Le(Ee.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ue(bs, {
          ref_key: "headerRef",
          ref: z,
          expanded: l.value,
          "panel-id": M(b),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: O[0] || (O[0] = (Y) => l.value = !l.value)
        }, on({ _: 2 }, [
          o.actions ? {
            name: "actions",
            fn: Ge(() => [
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
          w("div", Uc, [
            ue(xs, {
              "panel-id": M(b),
              onClose: P
            }, on({ _: 2 }, [
              o["panel-section"] ? {
                name: "panel-section",
                fn: Ge(() => [
                  $e(C.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : R("", !0)
      ], 8, Wc),
      ue(Ms, { views: e.views }, null, 8, ["views"]),
      $e(C.$slots, "results", {
        rows: M(ye).rows.value,
        total: M(ye).total.value,
        offset: M(ye).offset.value,
        pageCount: M(ye).pageCount.value,
        query: M(ye).query.value,
        pending: M(ye).pending.value
      }, () => [
        ue(Ls, { views: e.views }, on({ _: 2 }, [
          o["cards-before"] ? {
            name: "cards-before",
            fn: Ge(() => [
              $e(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          o["cards-after"] ? {
            name: "cards-after",
            fn: Ge(() => [
              $e(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, qc));
  }
}), jc = /* @__PURE__ */ de(Hc, [["__scopeId", "data-v-68ec86d9"]]), Xc = ["data-dc-muted"], Gc = {
  key: 0,
  class: "dc-shell-card__head"
}, Yc = { class: "dc-shell-card__title" }, Qc = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Zc = {
  key: 0,
  class: "dc-shell-card__aside"
}, Jc = ["data-dc-flush"], eu = {
  key: 2,
  class: "dc-shell-card__foot"
}, tu = /* @__PURE__ */ ie({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), a = Ht();
    function s(d) {
      return l(d?.() ?? []);
    }
    function l(d) {
      return d.some((m) => m.type === gl ? !1 : m.type === _l ? String(m.children ?? "").trim().length > 0 : m.type === ne ? l(m.children ?? []) : !0);
    }
    const r = v(() => !!t.title || i.value || s(a.head)), i = v(() => s(a.aside)), o = v(() => s(a.default)), u = v(() => s(a.foot));
    return (d, m) => (f(), h("section", {
      class: "dc-shell-card",
      style: Le(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), h("header", Gc, [
        $e(d.$slots, "head", {}, () => [
          w("h2", Yc, F(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Qc, F(e.count), 1)) : R("", !0)
        ], !0),
        i.value ? (f(), h("span", Zc, [
          $e(d.$slots, "aside", {}, void 0, !0)
        ])) : R("", !0)
      ])) : R("", !0),
      o.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        $e(d.$slots, "default", {}, void 0, !0)
      ], 8, Jc)) : R("", !0),
      u.value ? (f(), h("footer", eu, [
        $e(d.$slots, "foot", {}, void 0, !0)
      ])) : R("", !0)
    ], 12, Xc));
  }
}), Dd = /* @__PURE__ */ de(tu, [["__scopeId", "data-v-75f2ef0b"]]), nu = ["aria-label"], au = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], su = /* @__PURE__ */ ie({
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
      }, F(o.label), 43, au))), 128))
    ], 8, nu));
  }
}), lu = /* @__PURE__ */ de(su, [["__scopeId", "data-v-63fb5482"]]), ru = ["data-dc-theme", "aria-label"], ou = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], iu = /* @__PURE__ */ ie({
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
    }), Qe(() => window.removeEventListener("pointerdown", z, !0));
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
      style: Le(a.value),
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
      }, F(W.label), 41, ou))), 128)),
      i.value !== null && o.value ? (f(), se(oa, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: P,
        onDismiss: D[0] || (D[0] = (W) => k(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 44, ru));
  }
}), Id = /* @__PURE__ */ de(iu, [["__scopeId", "data-v-93dbd2e4"]]), cu = ["aria-label", "aria-expanded", "disabled"], uu = { "aria-hidden": "true" }, du = /* @__PURE__ */ ie({
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
    }), Qe(() => window.removeEventListener("pointerdown", k, !0));
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
        w("span", uu, F(e.glyph), 1)
      ], 40, cu),
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
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 64));
  }
}), ua = /* @__PURE__ */ de(du, [["__scopeId", "data-v-48f5ada5"]]), Lt = (e) => e.kind === "split", H = (e) => e.kind === "group", J = (e) => e.kind === "float", vt = { x: 16, y: 16, w: 360, h: 260 }, yn = 28, Fs = 120, Bn = 220, Ns = 38, kt = 6;
function Jt(e, t) {
  let n = !1;
  const a = e.frames.map((s, l) => {
    const r = t(s.node, l);
    return r === s.node ? s : (n = !0, { ...s, node: r });
  });
  return n ? { ...e, frames: a } : e;
}
function Ye(e) {
  return { kind: "group", panels: [e] };
}
function Od(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const me = (e) => typeof e == "string", da = (e) => me(e) ? Ye(e) : e, en = (e) => me(e) ? [e] : at(e), Ka = (e) => e.panels.filter(me), fu = (e) => e.panels.filter((t) => !me(t)), Oe = (e, t) => e.panels.includes(t);
function tn(e, t, n) {
  let a = !1;
  const s = e.panels.map((l) => {
    if (me(l) || !oe(l, t)) return l;
    const r = n(l);
    return r !== l && (a = !0), r;
  });
  return a ? { ...e, panels: s } : e;
}
function xn(e, t) {
  return { node: e, rect: { ...vt, ...t } };
}
function fa(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function pa(e, t) {
  const n = { ...vt, ...t };
  return fa(
    e.map(
      (a, s) => xn(a, {
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
const ma = (e, t, n) => va("row", e, t, n), Bd = (e, t, n) => va("column", e, t, n);
function we(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const gt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Kd = (e) => ({ ...e, headless: !0 }), Vd = (e) => ({ ...e, fixedView: !0 }), pu = (e) => e === "left" || e === "right" ? "row" : "column";
function at(e) {
  return H(e) ? e.panels.flatMap(en) : J(e) ? e.frames.flatMap((t) => at(t.node)) : e.children.flatMap(at);
}
function oe(e, t) {
  return H(e) ? e.panels.some((n) => me(n) ? n === t : oe(n, t)) : J(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Ds = (e) => at(e).length === 0, Kn = (e) => !H(e) && gt(e), Vn = (e) => Ds(e) && !Kn(e);
function Cn(e) {
  return Lt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : J(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => me(t) ? [] : [{ node: t, index: n }]);
}
const ha = (e) => Cn(e).map((t) => t.node);
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
function Is(e) {
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
function vu(e) {
  const t = ha(e).flatMap(vu);
  return H(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (H(e)) {
    for (const n of fu(e)) {
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
function Rn(e, t, n = Fs) {
  const a = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), s = a(e.w, t.w), l = a(e.h, t.h), r = (i, o, u) => Math.min(Math.max(i, 0), Math.max(u - o, 0));
  return {
    x: Math.round(r(e.x, s, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function Va(e, t, n, a, s = Fs) {
  let { x: l, y: r, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, l = e.x + n), t.includes("s") && (o = e.h + a), t.includes("n") && (o = e.h - a, r = e.y + a), i < s && (t.includes("w") && (l = e.x + e.w - s), i = s), o < s && (t.includes("n") && (r = e.y + e.h - s), o = s), { x: l, y: r, w: i, h: o };
}
const Os = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function xt(e, t, n) {
  if (H(e)) return tn(e, t, (l) => xt(l, t, n));
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
function mu(e, t, n) {
  return xt(e, t, (a) => Os(a.rect, n) ? a : { ...a, rect: n });
}
const lt = (e) => e.maximized === !0, Bs = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function hu(e, t, n = !0) {
  return xt(e, t, Bs(n));
}
function qd(e, t) {
  const n = Se(e, t);
  return n ? hu(e, t, !lt(n)) : e;
}
const ft = (e) => e.minimized === !0, Ks = (e) => (t) => {
  if (ft(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function gu(e, t, n = !0) {
  return xt(e, t, Ks(n));
}
function Wd(e, t) {
  const n = Se(e, t);
  return n ? gu(e, t, !ft(n)) : e;
}
function dt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = ot(e, t.slice(0, -1));
  return !a || !J(a) ? null : a.frames[n] ?? null;
}
function qn(e, t) {
  if (J(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!oe(a.node, t)) continue;
      const s = qn(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of Cn(e)) {
    if (!oe(n, t)) continue;
    const s = qn(n, t);
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
    (a) => Os(a.rect, n) ? a : { ...a, rect: n }
  );
}
function _u(e, t, n = !0) {
  return ga(e, t, Bs(n));
}
function yu(e, t, n = !0) {
  return ga(e, t, Ks(n));
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
function wu(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (J(a) && (n[l] = a.frames.length - 1), a = ot(a, [s]));
  }), n;
}
function dn(e, t, n, a) {
  if (H(e)) return tn(e, n, (r) => dn(r, t, n, a));
  if (J(e)) {
    const r = e.frames.findIndex((o) => oe(o.node, n)), i = e.frames[r];
    if (!i) return e;
    if (Se(i.node, n)) {
      const o = dn(i.node, t, n, a);
      if (o === i.node) return e;
      const u = [...e.frames];
      return u[r] = { ...i, node: o }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, xn(Ye(t), a)] };
  }
  if (!oe(e, n)) return e;
  let s = !1;
  const l = e.children.map((r) => {
    const i = dn(r, t, n, a);
    return i !== r && (s = !0), i;
  });
  return s ? { ...e, children: l } : e;
}
function Wa(e, t, n, a) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Se(e, n)) return e;
  const s = mt(e, t);
  if (!s) return e;
  const l = dn(s, t, n, a);
  return l === s ? e : xe(l);
}
function ku(e, t, n) {
  return J(e) ? { ...e, frames: [...e.frames, xn(Ye(t), n)] } : H(e) ? qs(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ye(t)],
    sizes: [...nt(e), 1],
    ...we(e)
  };
}
function Vs(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return ku(e, t, a);
  const l = n.slice(1), r = (d, m) => m === s ? Vs(d, t, l, a) : mt(d, t);
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
    const y = e.active && m.some(($) => en($).includes(e.active)) ? e.active : Te(m[d] ?? m[m.length - 1]);
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
  return !s || !Ds(s) || !oe(e, t) ? e : xe(Vs(e, t, n, a));
}
function Ln(e, t) {
  if (H(e)) return tn(e, t, (s) => Ln(s, t));
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
const nt = (e) => _a(e.children.length, e.sizes), Ue = (e) => {
  const t = H(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function xe(e) {
  if (H(e)) return bu(e);
  if (J(e)) {
    const i = e.frames.flatMap((o) => {
      const u = xe(o.node);
      return Vn(u) ? [] : [u === o.node ? o : { ...o, node: u }];
    });
    return i.length === e.frames.length && i.every((o, u) => o === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = nt(e), n = Ue(e), a = [], s = [], l = [];
  e.children.forEach((i, o) => {
    const u = xe(i), d = t[o] ?? 0;
    if (Vn(u)) return;
    if (!n && Lt(u) && u.direction === e.direction && !Ue(u) && !gt(u)) {
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
function bu(e) {
  if (e.panels.every(me)) return e;
  const t = Te(e), n = Ue(e), a = [], s = [];
  e.panels.forEach((i, o) => {
    const u = n?.[o];
    if (me(i)) {
      a.push(i), u && s.push(u);
      return;
    }
    const d = xe(i);
    if (!Vn(d)) {
      if (H(d) && !gt(d) && !Ue(d)) {
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
  const r = t && a.some((i) => en(i).includes(t)) ? t : void 0;
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
    return r.length === 0 && !Kn(e) ? null : { ...e, frames: r };
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
    const u = e.active && i.some((d) => en(d).includes(e.active)) ? e.active : Te(i[r] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...we(e) } : { kind: "group", panels: i, ...we(e) };
  }
  const n = nt(e), a = [], s = [];
  if (e.children.forEach((r, i) => {
    const o = mt(r, t);
    o && (a.push(o), s.push(n[i] ?? 0));
  }), a.length === 0)
    return Kn(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...we(e) } : null;
  const l = a[0];
  return a.length === 1 && l && !gt(e) ? l : xe({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...we(e)
  });
}
function qs(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...we(e) };
}
function It(e, t, n, a, s) {
  const l = (y) => Jt(
    y,
    ($) => oe($, n) ? It($, t, n, a, s) : $
  );
  if (a === "float") return e;
  const r = (y) => tn(y, n, ($) => It($, t, n, a, s));
  if (a === "center")
    return H(e) ? Oe(e, n) ? qs(e, t, s) : r(e) : J(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (y) => oe(y, n) ? It(y, t, n, a, s) : y
      )
    };
  const i = pu(a), o = a === "left" || a === "top", u = (y) => ({
    kind: "split",
    direction: i,
    children: o ? [Ye(t), y] : [y, Ye(t)],
    sizes: [0.5, 0.5]
  });
  if (H(e)) return Oe(e, n) ? u(e) : r(e);
  if (J(e)) return l(e);
  const d = nt(e), m = e.children.findIndex(
    (y) => H(y) && Oe(y, n)
  );
  if (m >= 0 && e.direction === i) {
    const y = (d[m] ?? 0) / 2, $ = [...e.children], x = [...d];
    return $.splice(o ? m : m + 1, 0, Ye(t)), x.splice(m, 1, y, y), {
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
      return Is(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((o) => !me(o) && oe(o, t)), l = e.panels[s];
    if (l === void 0 || me(l)) return e;
    const r = Ct(l, t);
    if (r === l && e.active === t) return e;
    const i = [...e.panels];
    return i[s] = r, { ...e, panels: i, active: t };
  }
  if (!oe(e, t)) return e;
  if (J(e)) return Jt(e, (s) => Ct(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const l = Ct(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Vt(e, t, n) {
  if (H(e)) {
    if (!Oe(e, t)) return tn(e, t, (u) => Vt(u, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const l = [...e.panels];
    l.splice(a, 1), l.splice(s, 0, t);
    const r = Ue(e), i = r ? [...r] : void 0;
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
  return oe(e, t) ? J(e) ? Jt(e, (a) => Vt(a, t, n)) : { ...e, children: e.children.map((a) => Vt(a, t, n)) } : e;
}
function fn(e, t, n) {
  if (t === n) return e;
  if (H(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const a = (l) => l === t ? n : l === n ? t : l, s = e.panels.map((l) => me(l) ? a(l) : fn(l, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return J(e) ? Jt(e, (a) => fn(a, t, n)) : { ...e, children: e.children.map((a) => fn(a, t, n)) };
}
function ln(e, t, n, a, s) {
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
function Ws(e, t, n) {
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
function nn(e, t, n) {
  const a = Cn(e);
  if (!H(e) && a.some(({ node: s }) => H(s) && Oe(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: l } of a) {
    if (!oe(s, t)) continue;
    const r = nn(s, t, n);
    return r ? Ws(e, l, r) : null;
  }
  return null;
}
function Ud(e, t, n) {
  const a = nn(
    e,
    t,
    (s) => Lt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? xe(a) : e;
}
function Us(e) {
  return J(e) ? [e] : Ue(e) || gt(e) ? [e] : H(e) ? [...e.panels] : e.children.flatMap(Us);
}
function Hs(e, t) {
  if (H(e)) return e;
  const n = ha(e).map(Us), a = n.flat(), s = t && a.some((r) => en(r).includes(t)) ? t : void 0, l = $u(e, n);
  return xe({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function $u(e, t) {
  const n = J(e) ? e.frames.map(({ node: a, ...s }) => s) : Ue(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function xu(e, t) {
  const n = nn(e, t, (a) => Hs(a, t));
  return n ? xe(n) : e;
}
function ya(e, t, n) {
  if (H(e) && Oe(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Cn(e)) {
    if (!oe(a, t)) continue;
    const l = ya(a, t, n);
    return l ? Ws(e, s, l) : null;
  }
  return null;
}
function Ha(e, t, n) {
  const a = ya(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const l = Ue(s);
    return {
      ...va(n, s.panels.map(da)),
      ...we(s),
      ...l ? { places: l } : {}
    };
  });
  return a ? xe(a) : e;
}
function Wn(e, t) {
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
    return Jt(e, (i) => Wn(i, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = Wn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Cu(e, t, n) {
  const a = $t(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const r = Wn(e, t);
    return r === e ? e : xe(r);
  }
  const l = ya(e, t, (r) => ({
    ...fa(js(r.panels.map(da), Ue(r), n)),
    ...we(r)
  }));
  return l ? xe(l) : e;
}
function js(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : pa(e, n).frames;
}
function Xs(e, t) {
  return { ...fa(js(e.children, Ue(e), t)), ...we(e) };
}
function Hd(e, t, n) {
  const a = nn(
    e,
    t,
    (s) => J(s) ? s : Xs(s, n)
  );
  return a ? xe(a) : H(e) && Oe(e, t) ? pa([e], n) : e;
}
function Mu(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function Gs(e, t) {
  const n = Mu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...we(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function jd(e, t, n = "row") {
  const a = nn(
    e,
    t,
    (s) => J(s) ? Gs(s, n) : s
  );
  return a ? xe(a) : e;
}
function Ys(e) {
  if (J(e)) return null;
  const t = H(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || me(t) || H(t) && t.panels.length === 1 && me(t.panels[0]) ? null : t;
}
const Su = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Eu(e, t) {
  const n = Ys(e);
  return n ? t === "inner" ? n : { ...Su(n), ...we(e) } : e;
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
    if (Lt(n)) n = n.children[a];
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
function pn(e, t, n) {
  if (t.length === 0)
    return Lt(e) ? { ...e, sizes: _a(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (J(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const o = pn(i.node, s, n);
    if (o === i.node) return e;
    const u = [...e.frames];
    return u[a] = { ...i, node: o }, { ...e, frames: u };
  }
  if (H(e)) {
    const i = e.panels[a];
    if (i === void 0 || me(i)) return e;
    const o = pn(i, s, n);
    if (o === i) return e;
    const u = [...e.panels];
    return u[a] = o, { ...e, panels: u };
  }
  const l = e.children[a];
  if (!l) return e;
  const r = [...e.children];
  return r[a] = pn(l, s, n), { ...e, children: r };
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
  return t !== void 0 && !me(t) ? e : { ...ma([Pu(e)]), ...we(e) };
}
const Pu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Xa(e) {
  return e.length === 0 ? null : ma(e.map(Ye));
}
function Au(e, t) {
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
          (u, d) => xn(Ye(u), {
            x: vt.x + (o + d) * yn,
            y: vt.y + (o + d) * yn
          })
        )
      ]
    };
  }
  return wn(xe(ma([l, ...i.map(Ye)])));
}
const wa = Symbol("dc.windowContext");
function Tu(e) {
  return Un(wa, e), e;
}
function ka() {
  const e = St(wa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const zu = ["data-dc-glyph"], Ru = { class: "dc-glyph__line" }, Lu = ["d"], Fu = {
  key: 0,
  class: "dc-glyph__aqua"
}, Nu = ["d"], Du = /* @__PURE__ */ ie({
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
      w("g", Ru, [
        (f(!0), h(ne, null, ve(t[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, Lu))), 128))
      ]),
      n[e.kind] ? (f(), h("g", Fu, [
        (f(!0), h(ne, null, ve(n[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, Nu))), 128))
      ])) : R("", !0)
    ], 8, zu));
  }
}), Mt = /* @__PURE__ */ de(Du, [["__scopeId", "data-v-4d2872c0"]]), Iu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Ou = ["data-dc-movable"], Bu = { class: "dc-float__title dc-truncate" }, Ku = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Vu = ["aria-label", "aria-pressed", "data-dc-minimize"], qu = ["aria-label", "aria-pressed", "data-dc-maximize"], Wu = ["aria-label", "data-dc-close"], Uu = { class: "dc-float__content" }, Hu = ["data-dc-handle", "onPointerdown"], ju = /* @__PURE__ */ ie({
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
        width: `${Bn}px`,
        height: `${Ns}px`
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
      style: Le(P.value),
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
        w("span", Bu, F($.value), 1),
        x.value.length ? (f(), se(ua, {
          key: 0,
          items: x.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : R("", !0),
        !s.value || r.value && m.value && d.value ? (f(), h("div", Ku, [
          s.value ? R("", !0) : (f(), h("button", {
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
          ], 8, Vu)),
          s.value ? R("", !0) : (f(), h("button", {
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
          ], 8, qu)),
          r.value && m.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": d.value,
            onClick: W[2] || (W[2] = (E) => M(n).close(d.value))
          }, [
            ue(Mt, { kind: "close" })
          ], 8, Wu)) : R("", !0)
        ])) : R("", !0)
      ], 40, Ou)) : R("", !0),
      w("div", Uu, [
        $e(D.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(ne, null, ve(o.value ? A : [], (E) => (f(), h("span", {
        key: E,
        class: "dc-float__grip",
        "data-dc-handle": E,
        "aria-hidden": "true",
        onPointerdown: Re((N) => M(n).beginFrameDragAt(e.path, N, E), ["stop"])
      }, null, 40, Hu))), 128))
    ], 44, Iu));
  }
}), Xu = /* @__PURE__ */ de(ju, [["__scopeId", "data-v-f035684c"]]), ba = Symbol("dc.paneContext");
function Gu(e) {
  return Un(ba, e), e;
}
function Xd() {
  return St(ba, null);
}
function Gd(e) {
  const t = St(wa, null), n = St(ba, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Dt(e)
  );
  return yl() && Ya(a), a;
}
const Yu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Qu = ["data-dc-movable"], Zu = ["aria-label", "aria-pressed"], Ju = ["data-dc-space-name"], ed = { class: "dc-truncate" }, td = ["aria-label"], nd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ad = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], sd = { class: "dc-tab__name dc-truncate" }, ld = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, rd = ["aria-label", "data-dc-close", "onClick"], od = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, id = { class: "dc-pane__tools" }, cd = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, ud = ["aria-label", "data-dc-minimize"], dd = ["aria-label", "aria-pressed", "data-dc-maximize"], fd = ["aria-label", "data-dc-close"], pd = ["id", "role", "aria-labelledby"], vd = ["id", "role", "aria-labelledby"], md = ["data-dc-edge"], hd = /* @__PURE__ */ ie({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ka(), a = Hn() ?? "dc-pane", s = v(
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
    }), i = v(() => r.value?.kind === "space" ? r.value.node : null), o = v(() => i.value ? "" : Is(t.group)), u = v(() => i.value ? null : n.panelFor(o.value)), d = v(() => r.value?.title ?? ""), m = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), k = v(() => [...t.path, r.value?.index ?? 0]), y = v(() => o.value || Ka(t.group)[0] || ""), $ = v(() => n.viewFor(o.value)), x = v(() => t.group.headless === !0), _ = v(() => n.focused.value === o.value), b = v(() => n.dragging.value === o.value), z = v(() => n.moving.value === o.value), P = v(() => n.frameOf(y.value) !== null), A = v(() => n.panelFor(y.value)?.fixed === !0), D = v(
      () => !i.value && (n.canMove(o.value) || P.value && n.movable.value && !A.value)
    ), W = v(
      () => i.value ? n.spaceMenu(k.value) : n.menuFor(o.value)
    ), E = (B) => n.closable(B);
    Gu({ panel: o });
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
    function He(B) {
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
      x.value ? R("", !0) : (f(), h("header", {
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
          onPointerdown: He,
          onClick: Ke,
          onKeydown: Pe
        }, [...U[8] || (U[8] = [
          w("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Zu)) : R("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          w("span", ed, F(m.value), 1)
        ], 8, Ju)) : R("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(ne, null, ve(s.value, (te, T) => (f(), h(ne, {
            key: te.id
          }, [
            Ee.value === T ? (f(), h("span", nd)) : R("", !0),
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
              w("span", sd, F(te.title), 1),
              te.kind === "panel" && te.panel.subtitle ? (f(), h("span", ld, F(te.panel.subtitle), 1)) : R("", !0),
              l.value && te.kind === "panel" && E(te.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${te.title}`,
                "data-dc-close": te.id,
                onPointerdown: U[0] || (U[0] = Re(() => {
                }, ["stop"])),
                onClick: (K) => it(K, te.id)
              }, [...U[9] || (U[9] = [
                w("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, rd)) : R("", !0)
            ], 40, ad)
          ], 64))), 128)),
          Ee.value === s.value.length ? (f(), h("span", od)) : R("", !0)
        ], 8, td),
        w("div", id, [
          ue(O),
          W.value.length ? (f(), se(ua, {
            key: 0,
            items: W.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ]),
        le.value ? (f(), h("div", cd, [
          P.value && !A.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: U[1] || (U[1] = Re(() => {
            }, ["stop"])),
            onClick: U[2] || (U[2] = (te) => M(n).toggleMinimize(y.value))
          }, [
            ue(Mt, { kind: "minimize" })
          ], 40, ud)) : R("", !0),
          P.value && !A.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${N.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": N.value,
            "data-dc-maximize": y.value,
            onPointerdown: U[3] || (U[3] = Re(() => {
            }, ["stop"])),
            onClick: U[4] || (U[4] = (te) => M(n).toggleMaximize(y.value))
          }, [
            ue(Mt, {
              kind: N.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, dd)) : R("", !0),
          !l.value && u.value && E(u.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: U[5] || (U[5] = Re(() => {
            }, ["stop"])),
            onClick: U[6] || (U[6] = (te) => M(n).close(u.value.id))
          }, [
            ue(Mt, { kind: "close" })
          ], 40, fd)) : R("", !0)
        ])) : R("", !0)
      ], 40, Qu)),
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
      ], 8, pd)) : (f(), h("div", {
        key: 2,
        id: he.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : ae(o.value)
      }, [
        ue(C)
      ], 8, vd)),
      ye.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ye.value,
        "aria-hidden": "true"
      }, null, 8, md)) : R("", !0)
    ], 40, Yu)) : R("", !0);
  }
}), Qs = /* @__PURE__ */ de(hd, [["__scopeId", "data-v-44fd2b2d"]]), gd = ["data-dc-space", "data-dc-path", "aria-label"], _d = {
  key: 0,
  class: "dc-space__head"
}, yd = { class: "dc-space__title dc-truncate" }, wd = ["data-dc-direction"], kd = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, bd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], $d = /* @__PURE__ */ ie({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ka(), a = q(null), s = v(() => H(t.node) ? t.node : null), l = v(() => Lt(t.node) ? t.node : null), r = v(() => J(t.node) ? t.node : null), i = v(
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
    ), Qe(() => _?.disconnect());
    const b = v(() => {
      const C = Math.max(
        1,
        Math.floor((x.value + kt) / (Bn + kt))
      ), O = /* @__PURE__ */ new Map();
      let Y = 0;
      for (const ee of u.value)
        ee.held.minimized === !0 && (O.set(ee.key, {
          x: kt + Y % C * (Bn + kt),
          bottom: kt + Math.floor(Y / C) * (Ns + kt)
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
      const He = (Pe) => {
        const Ve = ((D.value ? Pe.clientX : Pe.clientY) - Me) / ge;
        n.setSizes(t.path, ja(ze, O, Ve, Ce));
      }, Ke = () => X?.(), Ne = (Pe) => {
        Pe.key === "Escape" && (n.setSizes(t.path, ze), X?.());
      };
      X = () => {
        window.removeEventListener("pointermove", He), window.removeEventListener("pointerup", Ke), window.removeEventListener("pointercancel", Ke), window.removeEventListener("keydown", Ne), X = null;
      }, window.addEventListener("pointermove", He), window.addEventListener("pointerup", Ke), window.addEventListener("pointercancel", Ke), window.addEventListener("keydown", Ne);
    }
    Qe(() => X?.());
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
      return s.value ? (f(), se(Qs, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Ge(({ node: ee, path: ge }) => [
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
        !e.framed && !k.value ? (f(), h("header", _d, [
          w("span", yd, F(d.value), 1),
          m.value.length ? (f(), se(ua, {
            key: 0,
            items: m.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ])) : R("", !0),
        r.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          P.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Le({
              left: `${P.value.x}px`,
              top: `${P.value.y}px`,
              width: `${P.value.w}px`,
              height: `${P.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : R("", !0),
          (f(!0), h(ne, null, ve(u.value, (ee) => (f(), se(Xu, {
            key: ee.key,
            frame: ee.held,
            path: ee.path,
            order: ee.order,
            place: b.value.get(ee.key) ?? null
          }, {
            default: Ge(() => [
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
          A.value ? (f(), h("div", kd)) : R("", !0),
          (f(!0), h(ne, null, ve(i.value, (ee, ge) => (f(), h(ne, {
            key: E(ee)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: Le({ flexGrow: o.value[ge] ?? 1 })
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
            }, null, 40, bd)) : R("", !0)
          ], 64))), 128))
        ], 8, wd)) : R("", !0)
      ], 8, gd));
    };
  }
}), xd = /* @__PURE__ */ de($d, [["__scopeId", "data-v-fb5b403f"]]), Cd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Md = {
  key: 1,
  class: "dc-window__empty"
}, Sd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, rn = 16, Ed = /* @__PURE__ */ ie({
  __name: "WindowFrame",
  props: /* @__PURE__ */ hn({
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
  emits: /* @__PURE__ */ hn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Ot(e, "layout"), r = Ot(e, "views"), i = Ht(), o = v(() => new Map(a.panels.map((c) => [c.id, c]))), u = v(() => a.panels.map((c) => c.id)), d = v(() => Au(l.value, u.value)), m = q(null), k = q(null), y = q(null), $ = q(!0), x = q(null), _ = q(null), b = q(null), z = q(""), P = q(null);
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
          const L = (c.order[S] ?? -1) - (p.order[S] ?? -1);
          if (L !== 0) return L;
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
      const S = (p - c.left) / c.width, L = (g - c.top) / c.height, I = 0.3;
      return S > I && S < 1 - I && L > I && L < 1 - I ? "center" : [
        { edge: "left", distance: S },
        { edge: "right", distance: 1 - S },
        { edge: "top", distance: L },
        { edge: "bottom", distance: 1 - L }
      ].reduce(
        (re, V) => V.distance < re.distance ? V : re
      ).edge;
    }
    function Ee(c, p) {
      const g = [...c.querySelectorAll(".dc-tab")], S = g.findIndex((L) => {
        const I = L.getBoundingClientRect();
        return p < I.left + I.width / 2;
      });
      return S === -1 ? g.length : S;
    }
    function C(c, p, g) {
      for (const { panels: S, element: L } of W().reverse()) {
        const I = L.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const fe = S.find((Q) => Q !== g), re = L.querySelector(".dc-pane__tabs"), V = re?.getBoundingClientRect();
        if (re && V && p >= V.top && p <= V.bottom)
          return fe ? { panel: fe, edge: "center", index: Ee(re, c) } : null;
        const G = L.querySelector(":scope > .dc-pane__space");
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
      for (const L of O()) {
        const I = L.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const fe = ze(L), re = fe.flatMap((ce) => ce.panels).find((ce) => ce !== g);
        if (!re && fe.length > 0) return null;
        const V = Se(S, g)?.rect, G = Rn(
          {
            x: c - I.left - 24,
            y: p - I.top - 12,
            w: V?.w ?? vt.w,
            h: V?.h ?? vt.h
          },
          { w: L.clientWidth, h: L.clientHeight },
          a.minPanelSize
        );
        if (re) return { panel: re, edge: "float", rect: G };
        const Q = ee(L);
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
        const L = g.getBoundingClientRect();
        if (!(c < L.left || c > L.right || p < L.top || p > L.bottom))
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
    const He = (c) => c.altKey;
    function Ke(c, p) {
      if (!he(c) || k.value || _.value || p.button !== 0) return;
      const g = p.clientX, S = p.clientY;
      let L = !1, I = He(p);
      const fe = () => {
        const pe = b.value;
        pe && (y.value = I ? Y(pe.x, pe.y, c) : C(pe.x, pe.y, c));
      }, re = (pe) => {
        if (!L) {
          if (Math.hypot(pe.clientX - g, pe.clientY - S) < 4) return;
          L = !0, k.value = c, x.value = null;
        }
        I = He(pe), $.value = !I, b.value = { x: pe.clientX, y: pe.clientY }, fe();
      }, V = (pe) => {
        He(pe) !== I && (I = !I, $.value = !I, L && fe());
      }, G = (pe) => {
        Ce?.();
        const Z = y.value, Ae = d.value;
        if (pe && L && Z && Ae) {
          const st = Z.space ? Ua(Ae, c, Z.space, Z.rect) : Z.edge === "float" && Z.rect ? Wa(Ae, c, Z.panel, Z.rect) : ln(Ae, c, Z.panel, Z.edge, Z.index);
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
    Qe(() => Ce?.());
    let Ne = null;
    function Pe(c) {
      const p = P.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((L) => L.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ve(c) {
      const p = d.value;
      return p ? qn(p, c) : null;
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
      const L = !ft(g);
      let I = yu(p, c, L);
      I !== p && (L || (I = Kt(I, c)), l.value = I, s("frame-minimize", { panel: S, minimized: L }));
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
      const L = !lt(g);
      let I = _u(p, c, L);
      I !== p && (L && (I = Kt(I, c)), l.value = I, s("frame-maximize", { panel: S, maximized: L }));
    }
    function qe(c) {
      const p = Ve(c);
      p && j(p);
    }
    function Ft(c, p, g) {
      const S = d.value, L = S ? dt(S, c) : null;
      if (!S || !L || p.button !== 0 || k.value || _.value) return;
      const I = Te(L.node);
      if (o.value.get(I)?.fixed === !0 || lt(L) || ft(L) || (g === "move" ? !a.movable : !a.resizable)) return;
      const fe = Pe(c), re = wu(S, c);
      it(c);
      const V = { w: fe?.clientWidth ?? 0, h: fe?.clientHeight ?? 0 }, G = { ...L.rect }, Q = p.clientX, ce = p.clientY, _e = a.minPanelSize;
      _.value = I;
      const pe = (De) => {
        const Je = d.value;
        if (!Je) return;
        const Nt = qa(Je, re, Rn(De, V, _e));
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
    function Zs(c, p, g) {
      const S = Ve(c);
      S && Ft(S, p, g);
    }
    function Js(c, p, g = !1) {
      const S = d.value, L = Ve(c), I = S && L ? dt(S, L) : null;
      if (!S || !L || !I || o.value.get(c)?.fixed === !0 || (g ? !a.resizable : !a.movable)) return;
      if (lt(I) || ft(I)) {
        z.value = `${je(c)} is ${lt(I) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const fe = p === "left" ? -rn : p === "right" ? rn : 0, re = p === "up" ? -rn : p === "down" ? rn : 0, V = Pe(L), G = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, Q = g ? Va(I.rect, "se", fe, re, a.minPanelSize) : { ...I.rect, x: I.rect.x + fe, y: I.rect.y + re }, ce = qa(S, L, Rn(Q, G, a.minPanelSize));
      if (ce === S) {
        z.value = g ? `${je(c)} cannot be resized further.` : `${je(c)} cannot move ${p}.`;
        return;
      }
      l.value = ce;
      const _e = dt(ce, L);
      _e && (s("frame-change", { panel: c, rect: _e.rect }), z.value = g ? `${je(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${je(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    Qe(() => Ne?.());
    function el(c, p) {
      const g = E(c), S = g?.element.getBoundingClientRect();
      if (!g || !S) return null;
      const L = p === "left" || p === "right", I = (V) => {
        if (!(L ? V.bottom > S.top + 1 && V.top < S.bottom - 1 : V.right > S.left + 1 && V.left < S.right - 1)) return null;
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
    function tl(c) {
      const p = d.value ? Se(d.value, c) !== null : !1;
      if (!p && !he(c)) return;
      x.value = x.value === c ? null : c;
      const g = je(c);
      if (!x.value) {
        z.value = `${g}: move mode off.`;
        return;
      }
      z.value = p ? `${g}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${g}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const je = (c) => o.value.get(c)?.title ?? c, nl = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function al(c, p, g = !1) {
      if (!he(c)) return;
      const S = d.value;
      if (!S) return;
      const L = je(c), I = $t(S, c);
      if (!g && I && (p === "left" || p === "right") && I.panels.length > 1) {
        const ce = I.panels.indexOf(c), _e = p === "left" ? ce - 1 : ce + 1;
        if (_e >= 0 && _e < I.panels.length) {
          X(Vt(S, c, _e), { panel: c, target: c, edge: "center", index: _e }), z.value = `${L} moved ${p}, now tab ${_e + 1} of ${I.panels.length}.`, Mn(c);
          return;
        }
      }
      const re = el(c, p);
      if (!re || re.panel !== void 0 && !he(re.panel)) {
        z.value = `${L} cannot move ${p}.`;
        return;
      }
      const V = nl[p];
      if (re.space) {
        const ce = re.space, _e = ot(S, ce), pe = Se(S, c)?.rect, Z = { ...vt, ...pe ? { w: pe.w, h: pe.h } : {} };
        X(Ua(S, c, ce, Z), { panel: c, target: "", space: ce, edge: V }), z.value = `${L} moved ${p}, into ${_e ? Tt(_e) : "the space"}.`, Mn(c);
        return;
      }
      const G = re.panel, Q = I?.panels.length === 1 && $t(S, G)?.panels.length === 1;
      g ? (X(ln(S, c, G, "center"), {
        panel: c,
        target: G,
        edge: "center"
      }), z.value = `${L} joined ${je(G)} as a tab.`) : Q ? (X(fn(S, c, G), { panel: c, target: G, edge: V }), z.value = `${L} moved ${p}, trading places with ${je(G)}.`) : (X(ln(S, c, G, V), { panel: c, target: G, edge: V }), z.value = `${L} moved ${p}, beside ${je(G)}.`), Mn(c);
    }
    function Mn(c) {
      Wt(() => {
        E(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function sl(c, p) {
      const g = d.value;
      g && (l.value = pn(g, c, p));
    }
    function Sn(c) {
      const p = d.value;
      if (!p) return;
      const g = Ct(p, c);
      g !== p && (l.value = g, s("tab-select", { panel: c }));
    }
    function $a(c) {
      return o.value.get(c)?.closable ?? a.closable;
    }
    function ll(c) {
      $a(c) && s("panel-close", c);
    }
    const En = q(/* @__PURE__ */ new Map());
    let rl = 0;
    function ol(c, p) {
      const g = rl += 1;
      return En.value.set(g, { panel: c, items: p }), () => {
        En.value.delete(g);
      };
    }
    function il(c) {
      const p = [];
      for (const g of En.value.values())
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
    function cl(c, p) {
      const g = p.id, S = $t(c, g), L = (S?.panels.length ?? 0) > 1, I = S?.fixedView === !0, fe = (Q) => ({
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
      return L && !I && V.push(
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
          ...fe(xu(c, g))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...fe(Cu(c, g))
        }
      ), L && S && (V.length && V.push({ separator: !0 }), V.push(...Ma(S, g))), { panel: re, tabs: V, tabsTitle: S ? Ca(S) : "" };
    }
    function Ma(c, p) {
      const g = _t(c), S = (L) => {
        const I = c.panels[(g + L + c.panels.length) % c.panels.length];
        return (I === void 0 ? "" : Te(I)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Sn(S(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Sn(S(-1)) }
      ];
    }
    function an(c) {
      return c.title ? c.title : H(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : Tt(c);
    }
    function Sa(c) {
      if (!c || J(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Ue(c)) return null;
      const p = Ys(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function ul(c) {
      const p = d.value;
      if (!a.menu || !p) return [];
      const g = ot(p, c);
      if (!g || H(g)) return [];
      if (g.fixedView) return [];
      const S = J(g) ? "desktop" : g.direction, L = (Z, Ae, st) => ({
        id: `show-${Z}`,
        label: Ae,
        checked: S === Z,
        action: () => {
          const ct = d.value, ut = st();
          !ct || ut === g || (l.value = wn(xe(ht(ct, c, ut))));
        }
      }), I = () => {
        const Z = Hs(g, dl(g));
        if (H(Z) && Z.panels.length === 0) return g;
        const Ae = H(Z) && Z.panels.length === 1 ? Z.panels[0] : void 0;
        return Ae !== void 0 && me(Ae) ? g : Z;
      }, fe = (Z) => () => J(g) ? Gs(g, Z) : g.direction === Z ? g : { ...g, direction: Z }, re = c.slice(0, -1), V = c.length > 0 ? ot(p, re) : null, G = V && H(V) && V.panels.length > 1 ? V : null, Q = V && Sa(V) === g ? V : null, ce = Sa(g), _e = g.title || "this space", pe = (Z, Ae, st, ct, ut) => ({
        id: Z,
        label: ut,
        action: () => {
          const De = d.value;
          De && (l.value = wn(xe(ht(De, Ae, Eu(st, ct)))));
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
            L("row", "Row", fe("row")),
            L("column", "Column", fe("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            L("tabs", "Tabs", () => I()),
            L("desktop", "Desktop", () => J(g) ? g : Xs(g))
          ]
        },
        {
          id: "about-around",
          title: ce ? `Around ${an(ce)}` : "",
          items: ce ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ce.title ? [] : [pe("merge-around-keep-this", c, g, "outer", `Keep ${_e}`)],
            ...g.title ? [] : [pe("merge-around-keep-that", c, g, "inner", `Keep ${an(ce)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Q ? `Inside ${an(Q)}` : "",
          items: Q ? [
            ...g.title ? [] : [pe("merge-inside-keep-that", re, Q, "outer", `Keep ${an(Q)}`)],
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
    function dl(c) {
      const p = m.value;
      return p && oe(c, p) ? p : void 0;
    }
    function fl(c) {
      const p = d.value, g = o.value.get(c);
      if (!p || !g) return [];
      const S = a.menu ? cl(p, g) : null, L = il(c);
      L.length && S?.panel.length && L.push({ separator: !0 }), S && L.push(...S.panel);
      const I = xa([
        { id: "about-panel", title: g.title, items: L },
        { id: "about-tabs", title: S?.tabsTitle ?? "", items: S?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(g, I) : I;
    }
    function pl(c, p) {
      return i[`${c}-${p}`] ?? i[c];
    }
    function Ea(c, p, g, S) {
      return pl(c, p.id)?.({ panel: p, view: g, active: S });
    }
    Tu({
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
      selectPanel: Sn,
      beginDrag: Ke,
      toggleMoveMode: tl,
      nudge: al,
      setSizes: sl,
      frameOf: (c) => d.value ? Se(d.value, c) : null,
      beginFrameDrag: Zs,
      nudgeFrame: Js,
      raise: yt,
      maximized: B,
      toggleMaximize: qe,
      minimized: U,
      toggleMinimize: K,
      beginFrameDragAt: Ft,
      raiseAt: it,
      toggleMaximizeAt: j,
      toggleMinimizeAt: T,
      menuFor: fl,
      spaceMenu: ul,
      registerMenu: ol,
      closable: $a,
      close: ll,
      renderContent: (c, p, g) => Ea("panel", c, p, g),
      renderActions: (c, p, g) => Ea("actions", c, p, g),
      layout: d
    });
    const vl = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), ml = () => {
      const c = k.value, p = b.value;
      return !c || !p ? null : wl(
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
        const L = d.value;
        L && X(ln(L, c, p, g, S), {
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
        const S = mu(g, c, p);
        if (S === g) return;
        l.value = S;
        const L = Se(S, c);
        L && s("frame-change", { panel: c, rect: L.rect });
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
      style: Le(vl.value)
    }, [
      d.value ? (f(), se(xd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", Md, " This window has no panels. ")),
      ue(ml),
      w("p", Sd, F(z.value), 1)
    ], 12, Cd));
  }
}), Pd = /* @__PURE__ */ de(Ed, [["__scopeId", "data-v-711565af"]]);
function Yd(e = "", t = "/") {
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
function Qd(e) {
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
const Ad = {
  DataShell: jc,
  ShellHeader: bs,
  QueryPanel: xs,
  RecordActions: Ms,
  ResultsArea: Ls,
  FacetControl: $s,
  SegmentedControl: lu,
  StatusPill: Gt,
  WindowFrame: Pd,
  WindowPane: Qs,
  ListView: On,
  CardsView: Es,
  GridView: Ps,
  TableView: zs,
  LinksView: As,
  PreviewView: Ts,
  TypeCardsView: Rs
}, Zd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Ad))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Za, t.route);
  }
};
export {
  yn as CASCADE_STEP,
  Ld as COLUMN_BREAKPOINTS,
  Rd as COLUMN_ROLES,
  Es as CardsView,
  Ba as ColumnCell,
  vt as DEFAULT_FRAME,
  Fn as DEFAULT_SORT,
  bl as DEFAULT_VIEW,
  jc as DataShell,
  Nn as EMPTY_CELL,
  _s as ENTITY_ALL,
  _n as ENTITY_TERM,
  Ut as EXPRESSION_TERM,
  la as FACET_PREFIX,
  $s as FacetControl,
  Ps as GridView,
  Zd as HeaderContentLayoutPlugin,
  As as LinksView,
  On as ListView,
  kt as MINIMIZED_GAP,
  Ns as MINIMIZED_HEIGHT,
  Bn as MINIMIZED_WIDTH,
  Fs as MIN_FRAME,
  Da as MOCK_TINTS,
  Id as MenuBar,
  ua as MenuButton,
  oa as MenuList,
  Yt as MetricDrill,
  ba as PANE_CONTEXT_KEY,
  na as PARAM_DIR,
  Jn as PARAM_ENTITY,
  aa as PARAM_EXPR,
  sa as PARAM_PAGE,
  ta as PARAM_SORT,
  ea as PARAM_VIEW,
  ia as PinStar,
  Ts as PreviewView,
  Qt as QueryMark,
  xs as QueryPanel,
  sn as RECORD_STATUSES,
  rs as RESULT_FIELDS,
  Za as ROUTE_ADAPTER_KEY,
  Ms as RecordActions,
  Ls as ResultsArea,
  gs as SHELL_CONTEXT_KEY,
  zd as SHELL_THEMES,
  Zt as ScopeMark,
  lu as SegmentedControl,
  Rt as SelectTick,
  Dd as ShellCard,
  bs as ShellHeader,
  Gt as StatusPill,
  zs as TableView,
  Rs as TypeCardsView,
  Ja as VIEW_KINDS,
  $l as VIEW_LABELS,
  wa as WINDOW_CONTEXT_KEY,
  Pd as WindowFrame,
  Qs as WindowPane,
  Is as activePanel,
  _t as activeTab,
  vs as addTerm,
  $n as andExpression,
  pu as axisOf,
  pa as cascade,
  cs as cellFull,
  jt as cellText,
  un as cellTextOf,
  Be as cellValue,
  Pa as changesResults,
  Rn as clampRect,
  Hs as collapseSpace,
  xu as collapseToTabs,
  Bd as column,
  Ta as columnAlign,
  za as columnClass,
  Aa as columnKey,
  Dn as columnTruncates,
  Pl as columnsFor,
  Cl as countPages,
  kl as createHistoryAdapter,
  Yd as createMemoryAdapter,
  tr as createMockDataSource,
  Qd as createVueRouterAdapter,
  zl as defaultCellText,
  Xa as defaultLayout,
  Qn as defaultQuery,
  lr as drillExpression,
  Ua as dropIntoSpace,
  At as emptyFacetState,
  Gn as emptyFacetValue,
  nr as excludingTerm,
  bt as findEntity,
  rt as findSort,
  Vd as fixedView,
  fa as float,
  Wa as floatPanel,
  Xs as floatSplit,
  Cu as floatTabs,
  cn as fnv1a,
  ts as focusEntity,
  wt as formatCount,
  Sl as formatDate,
  pt as formatExpression,
  Ml as formatMetric,
  El as formatOrdinal,
  Xt as formatTerm,
  xn as frame,
  dt as frameAt,
  Se as frameOf,
  qn as framePathOf,
  Te as frontPanel,
  Zl as generateRows,
  Od as group,
  $t as groupOf,
  vu as groups,
  ls as hasActiveFacets,
  oe as hasPanel,
  Kd as headless,
  It as insertPanel,
  Bt as isChoosable,
  Fd as isEntityScoped,
  ss as isFacetActive,
  J as isFloat,
  H as isGroup,
  lt as isMaximized,
  ft as isMinimized,
  me as isPanelTab,
  kn as isPristineQuery,
  Lt as isSplit,
  Oe as isTabOf,
  Yn as isTypeCardsQuery,
  es as isViewKind,
  Fa as joinExpression,
  sr as liftTerm,
  Vl as matchesExpression,
  Jl as matchesFacets,
  hu as maximizeFrame,
  _u as maximizeFrameAt,
  Eu as mergeSpace,
  gu as minimizeFrame,
  yu as minimizeFrameAt,
  ln as movePanel,
  Vt as moveTab,
  Nd as negateTerm,
  ot as nodeAt,
  qt as nodeTitle,
  xe as normalizeLayout,
  tt as normalizeSearch,
  _a as normalizeSizes,
  Ys as onlySpace,
  gn as oppositeTerm,
  at as panelIds,
  Ye as panelNode,
  Ka as panelTabs,
  Fe as parseExpression,
  fr as parseQuery,
  Do as presentParts,
  Ss as presentRow,
  Ze as pressOptions,
  Gu as providePaneContext,
  rr as provideShellContext,
  Tu as provideWindowContext,
  Ln as raiseFrame,
  Kt as raiseFrameAt,
  wu as raisedPath,
  os as reconcileFacets,
  Au as reconcileLayout,
  ps as recordTerm,
  mt as removePanel,
  ht as replaceAt,
  Va as resizeRect,
  ja as resizeSplit,
  Xn as resolveView,
  Ie as roleColumn,
  is as roleColumns,
  wn as rootSpace,
  ma as row,
  Tl as rowKey,
  bn as sameTerm,
  fs as scopeTerm,
  Zn as scopeTermFor,
  hs as scopedEntity,
  Oa as serializeQuery,
  Ct as setActivePanel,
  mu as setFrameRect,
  qa as setFrameRectAt,
  pn as setSizesAt,
  Ud as setSplitDirection,
  nt as sizesOf,
  as as sortsFor,
  we as spaceChrome,
  Tt as spaceTitle,
  va as split,
  Wl as splitExpression,
  Ha as spreadTabs,
  vr as summarizeQuery,
  ra as summaryTerms,
  fn as swapPanels,
  da as tabNode,
  en as tabPanels,
  ar as termStanding,
  Gs as tileFloat,
  Hd as toFloat,
  jd as toTiled,
  qd as toggleMaximized,
  Wd as toggleMinimized,
  Zi as useColumns,
  zr as useEntityCounts,
  vc as useEntityPreviews,
  Xd as usePaneContext,
  Gd as usePaneMenu,
  zt as usePresentedRows,
  mr as useQueryState,
  Fr as useRecordNames,
  hr as useResults,
  be as useShellContext,
  ka as useWindowContext,
  ms as withoutOwnScope,
  ql as withoutTerm
};
