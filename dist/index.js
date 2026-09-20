import { ref as q, inject as St, provide as Un, computed as v, toValue as Dt, shallowRef as Et, watch as ke, onScopeDispose as Ga, defineComponent as ce, onMounted as ml, onBeforeUnmount as Qe, resolveComponent as Ya, openBlock as f, createElementBlock as g, normalizeStyle as Le, Fragment as ne, renderList as ve, toDisplayString as F, createCommentVNode as R, createElementVNode as w, createBlock as se, nextTick as Wt, useId as Hn, unref as M, normalizeClass as Pt, createVNode as pe, withDirectives as vn, withKeys as Xe, withModifiers as Re, vModelText as mn, renderSlot as be, useSlots as Ht, createTextVNode as We, withCtx as Ge, resolveDynamicComponent as jn, createSlots as on, useModel as Ot, mergeModels as hn, Comment as hl, Text as gl, getCurrentScope as _l, h as yl } from "vue";
const Qa = Symbol("dc.routeAdapter");
function tt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function wl() {
  const e = typeof window < "u", t = q(e ? tt(window.location.search) : ""), n = q(e ? window.location.pathname : "/"), a = () => {
    t.value = tt(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, r) => {
    const o = tt(l);
    if (!e) {
      t.value = o;
      return;
    }
    const i = `${window.location.pathname}${o}${window.location.hash}`;
    r === "push" ? window.history.pushState(window.history.state, "", i) : window.history.replaceState(window.history.state, "", i), t.value = o, n.value = window.location.pathname;
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
const Za = ["list", "cards", "grid", "table", "links", "preview"], Ad = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], sn = ["ok", "running", "queued", "review", "failed"], Td = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], zd = [480, 620, 760, 900, 1100], kl = "cards", Fn = "updated";
function Ja(e) {
  return typeof e == "string" && Za.includes(e);
}
const bl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function es(e, t) {
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
const $l = { key: Fn, label: Fn };
function rt(e, t, n = null) {
  const a = as(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Fn) ?? a[0] ?? $l;
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
function Rd(e) {
  return e.entity !== null;
}
function Gn(e) {
  return e.entity === null && e.view === "cards";
}
function xl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Yn(e, t = {}) {
  const a = t.landing === "entity" ? ts(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && Ja(t.view) ? t.view : kl,
    sort: rt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: At(a),
    page: 1
  };
}
const rs = ["entity", "sort", "dir", "expr", "facets"];
function Ea(e) {
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
function cn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Cl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function wt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Ml(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Sl(e) {
  return String(e + 1).padStart(2, "0");
}
const Nn = "—";
function Ie(e, t) {
  return e.find((n) => n.role === t);
}
function is(e, t) {
  return e.filter((n) => n.role === t);
}
function El(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Pl = ["id", "entityKey", "entityLabel"];
function Be(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Pl.includes(n))
      return t[n];
  }
}
function Pa(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Al(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Tl(e, t) {
  if (e == null || e === "") return Nn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Cl(n) : String(e);
  }
  return t === "date" ? Ml(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Nn : String(e);
}
function jt(e, t) {
  const n = Be(e, t);
  return e.format ? e.format(n, t) : Tl(n, e.kind);
}
function zl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function cs(e, t) {
  const n = jt(e, t), a = zl(Be(e, t));
  return a && a !== n ? a : n;
}
function un(e, t) {
  return e ? jt(e, t) : "";
}
function Aa(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Rl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Ta(e) {
  return [Rl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Dn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ll = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Fl(e) {
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
  for (const s of Fl(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), o = r ? s.slice(1) : s, i = r ? { negated: !0 } : {}, u = Ll.exec(o);
    u && u[3] !== "" ? a.push({
      kind: "field",
      field: u[1].toLowerCase(),
      comparator: u[2],
      value: u[3],
      ...i
    }) : a.push({ kind: "text", value: o, ...i });
  }
  return a.length && n.push(a), n;
}
const Pn = (e) => e.toLowerCase().replace(/\s+/g, ""), Nl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Dl(e, t, n) {
  const a = Pn(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && Pn(u.label) === a
  );
  if (l) return Be(l, t);
  const r = n.facets.find((u) => Pn(u.label) === a);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = Nl.find(([u]) => u === a)?.[1];
  if (o) {
    const u = Ie(s, o);
    if (u) return Be(u, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const u = is(s, "metric")[Number(i[1]) - 1];
    if (u) return Be(u, t);
  }
}
function An(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function za(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Il(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = Ie(r, o), u = i ? Be(i, t) : void 0;
      return typeof u == "string" && An(u, e.value);
    });
  }
  const a = Dl(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (o) => e.comparator === "=" ? za(String(o), e.value) : An(String(o), e.value)
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
    return e.comparator === "=" ? za(String(a), e.value) : An(String(a), e.value);
  }
  const s = Number(e.value), l = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(l) ? null : Bl(e.comparator, l, s);
}
function Ol(e, t, n) {
  const a = Il(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function Bl(e, t, n) {
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
function Kl(e, t, n) {
  return e.length ? e.some((a) => a.every((s) => Ol(s, t, n))) : !0;
}
function Ra(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Xt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ra(e.value) : `${t}${e.field}${e.comparator}${Ra(e.value)}`;
}
function Ld(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function pt(e) {
  return e.filter((t) => t.length).map((t) => t.map(Xt).join(" ")).join(" OR ");
}
function Vl(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function ql(e) {
  const t = Fe(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(Xt).join(" ")
  };
}
function La(e, t) {
  return [...e.map(Xt), t.trim()].filter(Boolean).join(" ");
}
const Fa = (e, t) => e.toLowerCase() === t.toLowerCase();
function bn(e, t) {
  return !!e.negated == !!t.negated && us(e, t);
}
function gn(e, t) {
  return !!e.negated != !!t.negated && us(e, t);
}
function us(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Fa(e.value, t.value) : t.kind === "text" && Fa(e.value, t.value);
}
function Wl(e, t) {
  return t.filter((n) => !e.some((a) => bn(a, n)));
}
function $n(e, t) {
  const n = Fe(e), a = Fe(t);
  return n.length ? a.length ? pt(
    n.flatMap((s) => a.map((l) => [...s, ...Wl(s, l)]))
  ) : pt(n) : pt(a);
}
const Na = [
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
const Ul = 7, Hl = 3;
function jl(e, t, n, a) {
  const s = (t * Ul + cn(n)) % a, l = [];
  for (let r = 0; r < Math.min(Hl, a); r++)
    l.push(ds(e, (s + r) % a));
  return l;
}
function Xl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Gl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Gl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function Yl(e, t) {
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
      return Na[n % Na.length];
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
function Ql(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const u = l[i % l.length], d = Math.floor(i / l.length), m = cn(`${a}:${e.key}:${u[0]}:${i}`), b = ds(e.key, i), y = new Date(s.getTime() - m % 900 * 36e5).toISOString(), k = {};
    for (const x of e.columns ?? []) {
      const _ = x.field ?? x.key;
      if (!_ || x.value) continue;
      const $ = Yl(x, {
        hash: cn(`${m}:${_}`),
        sample: u,
        revision: d,
        updatedAt: y
      });
      $ !== void 0 && (k[_] = $);
    }
    for (const x of e.facets)
      k[x.key] = Xl(x, cn(`${m}:${x.key}`));
    for (const [x, _] of r)
      k[x] = _ === e.key ? b : jl(_, i, x, n);
    o.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return o;
}
function Zl(e, t) {
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
function Jl(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", l = a === "date" || n.role === "updated";
  return (r, o) => {
    const i = Be(n, r), u = Be(n, o);
    return s ? Number(u ?? 0) - Number(i ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(i ?? "")) : String(u ?? "").localeCompare(String(i ?? ""));
  };
}
function er(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = Ql(a, { ...e, scopes: r });
    return t.set(a.key, o), o;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: r, offset: o }) {
      const i = Fe(a.expr), u = l ? [l] : s.entities, d = [], m = [];
      for (const k of u)
        for (const x of n(k, s))
          d.push(x), (l ? Zl(x, a.facets) : !0) && Kl(i, x, k) && m.push(x);
      const b = rt(l, a.sort, s), y = m.sort(Jl(ns(l, s), b.key));
      return a.dir === "asc" && y.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: y.slice(o, o + r),
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
function Qn(e, t) {
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
  return s.some((o) => o.some((i) => bn(i, a))) ? n : s.some((o) => o.some((i) => gn(i, a))) ? pt(
    s.map(
      (o) => o.map((i) => gn(i, a) ? a : i)
    )
  ) : `${n} ${t}`;
}
function tr(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function nr(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Fe(t).flat();
  if (!n) return null;
  const a = Fe(e).flat();
  return a.some((s) => bn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => gn(s, n)) ? n.negated ? "in" : "out" : null;
}
function ar(e, t) {
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
function sr(e, t, n, a = {}) {
  const s = Qn(e, n);
  return vs(t.expr, a.exclude ? tr(s) : s);
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
function lr(e) {
  return Un(gs, e), e;
}
function xe() {
  const e = St(gs, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Zn = "e", Jn = "v", ea = "s", ta = "d", na = "q", aa = "p", sa = "f_", _s = "*", rr = [
  Zn,
  Jn,
  ea,
  ta,
  na,
  aa
], In = "..", ys = ",", or = [
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
  for (const [n, a] of or) t = t.replace(n, a);
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
function ir(e) {
  return rr.includes(e) || e.startsWith(sa);
}
function Da(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function cr(e, t) {
  const n = et(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(ys).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => a.has(l)) };
    }
    case "range": {
      const a = n.indexOf(In), s = (a === -1 ? n : n.slice(0, a)).trim(), l = (a === -1 ? "" : n.slice(a + In.length)).trim(), r = s === "" ? null : Number(s), o = l === "" ? null : Number(l);
      let i = r !== null && Number.isFinite(r) ? Da(r, e.min, e.max) : null, u = o !== null && Number.isFinite(o) ? Da(o, e.min, e.max) : null;
      return i !== null && u !== null && i > u && ([i, u] = [u, i]), { kind: "range", min: i, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function ur(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(ys) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${In}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function dr(e, t, n = {}) {
  const a = Yn(t, n), s = new Map(ws(e)), l = s.get(Zn), r = l === void 0 ? a.entity : et(l), o = r === _s ? null : bt(t, r), i = s.get(Jn), u = i && Ja(et(i)) ? et(i) : a.view, d = s.get(ea), m = rt(o, d ? et(d) : n.sort, t), b = s.get(ta), y = b ? et(b) === "asc" ? "asc" : "desc" : a.dir, k = s.get(na), x = s.get(aa), _ = x === void 0 ? 1 : Number(et(x)), $ = Number.isFinite(_) ? Math.max(1, Math.floor(_)) : 1, z = {};
  for (const P of o?.facets ?? []) {
    const A = s.get(`${sa}${P.key}`);
    z[P.key] = A === void 0 ? Xn(P) : cr(P, A);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: m.key,
    dir: y,
    expr: k === void 0 ? "" : et(k),
    facets: os(o, z),
    page: $
  };
}
function Ia(e, t, n = {}, a = "") {
  const s = Yn(t, n), l = bt(t, e.entity), r = ws(a).filter(([m]) => !ir(m)), o = [], i = (m, b) => o.push([m, Tn(b)]), u = l?.key ?? null;
  u !== s.entity && i(Zn, u ?? _s), e.view !== s.view && i(Jn, e.view), e.sort !== s.sort && i(ea, e.sort), e.dir !== s.dir && i(ta, e.dir), e.expr.trim() !== "" && i(na, e.expr);
  for (const m of l?.facets ?? []) {
    const b = e.facets[m.key];
    if (!b) continue;
    const y = ur(b, m);
    y !== null && o.push([`${sa}${m.key}`, Tn(y)]);
  }
  e.page > 1 && i(aa, String(e.page));
  const d = [
    ...r.map(([m, b]) => [Tn(m), b]),
    ...o
  ];
  return d.length ? `?${d.map(([m, b]) => b === "" ? m : `${m}=${b}`).join("&")}` : "";
}
const _n = "entity", Ut = "expr";
function fr(e, t) {
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
function la(e, t) {
  const n = [];
  t && n.push({
    id: _n,
    label: `entity:${t.key}`,
    facetKey: _n
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && ss(s) && n.push(...fr(a, s));
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
function pr(e, t, n = null) {
  if (kn(e)) {
    const l = rt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = la(e, t).filter((l) => l.facetKey !== Ut).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function vr(e) {
  const { adapter: t } = e, n = v(() => Dt(e.schema)), a = v(() => Dt(e.defaults) ?? {}), s = v(() => dr(t.search.value, n.value, a.value)), l = v(() => bt(n.value, s.value.entity)), r = v(() => l.value ?? ts(n.value, a.value)), o = v(() => as(l.value, n.value)), i = v(() => rt(l.value, s.value.sort, n.value)), u = (_, $) => {
    const z = Ia(_, n.value, a.value, t.search.value);
    z !== t.search.value && ($ === "push" ? t.push(z) : t.replace(z));
  }, d = () => Dt(e.navigationMode) ?? "push", m = () => Dt(e.facetNavigationMode) ?? "replace", b = (_, $) => {
    const z = _.page ?? (Ea(_) ? 1 : s.value.page);
    u({ ...s.value, ..._, page: z }, $);
  }, y = (_, $) => {
    const z = s.value.facets[_];
    if (!z) return;
    const P = { ...s.value.facets, [_]: $(z) };
    b({ facets: P }, m());
  }, k = (_) => {
    const $ = _ === null ? null : bt(n.value, _);
    return ($?.key ?? null) === s.value.entity ? {} : {
      entity: $?.key ?? null,
      sort: rt($, s.value.sort, n.value).key,
      facets: At($)
    };
  }, x = (_) => {
    const $ = k(_);
    Object.keys($).length && b($, d());
  };
  return {
    query: s,
    entity: l,
    focus: r,
    sort: i,
    sorts: o,
    summary: v(() => pr(s.value, l.value, n.value)),
    terms: v(() => la(s.value, l.value)),
    isPristine: v(() => kn(s.value)),
    isEverything: v(() => s.value.entity === null),
    hasFacets: v(() => ls(s.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(_) {
      b({ view: _ }, d());
    },
    setSort(_) {
      b({ sort: rt(l.value, _, n.value).key }, d());
    },
    toggleDirection() {
      b({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(_) {
      b({ expr: _ }, d());
    },
    narrow(_, $, z) {
      b({ expr: _, ...k($), ...z ? { view: z } : {} }, d());
    },
    setPage(_, $) {
      b({ page: Math.max(1, Math.floor(_)) }, $ ?? d());
    },
    setFacet(_, $) {
      y(_, () => $);
    },
    toggleChip(_, $) {
      y(_, (z) => z.kind !== "chips" ? z : { kind: "chips", selected: z.selected.includes($) ? z.selected.filter((A) => A !== $) : [...z.selected, $] });
    },
    setRange(_, $, z) {
      y(_, (P) => P.kind === "range" ? { kind: "range", min: $, max: z } : P);
    },
    toggleFlag(_) {
      y(
        _,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(_) {
      if (_.facetKey === _n) {
        x(null);
        return;
      }
      if (_.facetKey === Ut) {
        const $ = Vl(Fe(s.value.expr), _.group ?? 0, _.index ?? 0);
        b({ expr: pt($) }, d());
        return;
      }
      y(_.facetKey, ($) => $.kind === "chips" && _.option ? { kind: "chips", selected: $.selected.filter((z) => z !== _.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      b({ entity: null, expr: "", facets: At(null) }, d());
    },
    reset() {
      u(Yn(n.value, a.value), d());
    },
    hrefFor(_) {
      const $ = { ...s.value, ..._ };
      return $.page = _.page ?? (Ea(_) ? 1 : s.value.page), $.facets = os(bt(n.value, $.entity), $.facets), `${t.path.value}${Ia($, n.value, a.value, t.search.value)}`;
    }
  };
}
function mr(e) {
  const t = Et([]), n = q(0), a = q(!1), s = Et(null);
  let l = 0, r = null;
  const o = v(() => (e.query.value.page - 1) * e.limit.value), i = v(() => xl(n.value, e.limit.value)), u = () => {
    const _ = e.query.value, $ = e.within?.value.trim(), z = ms(e.entity.value, _.expr);
    return $ ? { ..._, expr: $n($, z) } : z === _.expr ? _ : { ..._, expr: z };
  }, d = (_) => {
    t.value = _.rows, n.value = _.total, s.value = null;
  }, m = (_) => {
    s.value = _, t.value = [], n.value = 0;
  }, b = (_, $) => {
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
        N.splice(W ?? N.length, 0, ...E), t.value = $ > 0 ? N.slice(0, $) : N, n.value += E.length;
      },
      set(D) {
        P() && (D.rows && (A(), t.value = $ > 0 ? D.rows.slice(0, $) : D.rows, n.value = D.rows.length), D.total !== void 0 && (n.value = D.total));
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
  }, k = () => {
    const _ = ++l;
    y();
    const $ = {
      query: u(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, z = e.source.value;
    if (z.stream) {
      a.value = !0;
      try {
        r = z.stream($, b(_, $.limit)) ?? null;
      } catch (A) {
        m(A), a.value = !1;
      }
      return;
    }
    let P;
    try {
      P = z.query($);
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
  return ke([e.source, x, e.limit], k, {
    immediate: !0
  }), Ga(() => {
    l++, y();
  }, !0), { rows: t, total: n, offset: o, pageCount: i, pending: a, error: s, refresh: k };
}
const Bt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, hr = ["aria-label"], gr = ["role", "aria-label"], _r = ["data-dc-item"], yr = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, wr = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], kr = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, br = { class: "dc-menu__label dc-truncate" }, $r = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, xr = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Cr = /* @__PURE__ */ ce({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = q(null), r = q([]), o = q(null), i = q(null), u = q(null), d = q(!1), m = v(
      () => a.items.flatMap((E, N) => Bt(E) ? [N] : [])
    ), b = v(() => {
      const E = [{ entries: [] }];
      return a.items.forEach((N, le) => {
        N.heading ? E.push({ heading: N, entries: [] }) : E[E.length - 1]?.entries.push({ item: N, index: le });
      }), E.filter((N) => N.entries.length > 0);
    }), y = q({ x: a.at.x, y: a.at.y });
    async function k() {
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
      o.value = E, E !== null && Wt(() => r.value[E]?.focus());
    }
    function $(E, N) {
      const le = m.value;
      if (le.length === 0) return null;
      if (E === null) return N === 1 ? le[0] ?? null : le[le.length - 1] ?? null;
      const ae = le.indexOf(E);
      return ae === -1 ? le[0] ?? null : le[(ae + N + le.length) % le.length] ?? null;
    }
    function z(E, N) {
      if (!a.items[E]?.items?.length) return;
      const ae = r.value[E]?.getBoundingClientRect(), he = l.value?.getBoundingClientRect();
      !ae || !he || (u.value = { x: he.right - 4, y: ae.top - 4, mirrorX: he.left + 4 }, i.value = E, d.value = N);
    }
    function P(E) {
      const N = i.value;
      i.value = null, u.value = null, E && N !== null && _(N);
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
        E.preventDefault(), E.stopPropagation(), i.value !== null ? P(!0) : s("dismiss");
        return;
      }
      if (N === "ArrowDown" || N === "ArrowUp") {
        E.preventDefault(), E.stopPropagation(), P(!1), _($(o.value, N === "ArrowDown" ? 1 : -1));
        return;
      }
      if (N === "Home" || N === "End") {
        E.preventDefault(), E.stopPropagation(), P(!1), _($(null, N === "Home" ? 1 : -1));
        return;
      }
      if (N === "ArrowRight") {
        const le = o.value;
        le !== null && a.items[le]?.items?.length && (E.preventDefault(), E.stopPropagation(), z(le, !0));
        return;
      }
      if (N === "ArrowLeft") {
        i.value !== null && (E.preventDefault(), E.stopPropagation(), P(!0));
        return;
      }
      if (N === "Enter" || N === " ") {
        const le = o.value;
        if (le === null) return;
        E.preventDefault(), E.stopPropagation(), A(le);
      }
    }
    function W(E) {
      const N = a.items[E];
      !N || !Bt(N) || (i.value !== null && i.value !== E && P(!1), _(E), N.items?.length && z(E, !1));
    }
    return ml(() => {
      k(), a.autofocus && _($(null, 1));
    }), ke(() => a.at, k, { deep: !0 }), ke(() => a.items, () => void k(), { deep: !0 }), Qe(() => {
      i.value = null;
    }), t({ root: l }), (E, N) => {
      const le = Ya("MenuList", !0);
      return f(), g("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Le(x.value),
        onKeydown: D
      }, [
        (f(!0), g(ne, null, ve(b.value, (ae, he) => (f(), g("div", {
          key: `${he}-${ae.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: ae.heading ? "group" : "none",
          "aria-label": ae.heading?.label
        }, [
          ae.heading ? (f(), g("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": ae.heading.id
          }, F(ae.heading.label), 9, _r)) : R("", !0),
          (f(!0), g(ne, null, ve(ae.entries, ({ item: X, index: ye }) => (f(), g(ne, {
            key: X.id ?? `${ye}-${X.label ?? ""}`
          }, [
            X.separator ? (f(), g("div", yr)) : (f(), g("button", {
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
              "aria-expanded": X.items?.length ? i.value === ye : void 0,
              "aria-disabled": X.disabled ? "true" : void 0,
              disabled: X.disabled,
              "data-dc-item": X.id,
              tabindex: "-1",
              onClick: (Ee) => A(ye),
              onMouseenter: (Ee) => W(ye)
            }, [
              w("span", kr, F(X.checked ? "✓" : ""), 1),
              w("span", br, F(X.label), 1),
              X.shortcut ? (f(), g("span", $r, F(X.shortcut), 1)) : X.items?.length ? (f(), g("span", xr, "›")) : R("", !0)
            ], 40, wr))
          ], 64))), 128))
        ], 8, gr))), 128)),
        i.value !== null && u.value ? (f(), se(le, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: u.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: N[0] || (N[0] = (ae) => s("choose", ae)),
          onDismiss: N[1] || (N[1] = (ae) => P(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
      ], 44, hr);
    };
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ra = /* @__PURE__ */ ue(Cr, [["__scopeId", "data-v-9b1413fa"]]), Mr = { class: "dc-pick" }, Sr = ["id"], Er = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Pr = { class: "dc-pick__label" }, Ar = /* @__PURE__ */ ce({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Hn() ?? "dc-pick", l = q(null), r = q(null), o = q(null), i = q(!1), u = v(() => o.value !== null), d = v(
      () => n.options.find((P) => P.key === n.modelValue) ?? n.options[0]
    ), m = v(
      () => n.options.map((P) => ({
        id: P.key,
        label: P.label,
        checked: P.key === n.modelValue
      }))
    ), b = v(
      () => o.value ? { maxHeight: `${window.innerHeight - o.value.y - 8}px` } : void 0
    );
    function y(P) {
      const A = l.value?.getBoundingClientRect();
      A && (o.value = { x: A.left, y: A.bottom + 4, mirrorX: A.right }, i.value = P, a("open"));
    }
    function k(P) {
      o.value = null, P && l.value?.focus();
    }
    function x() {
      u.value ? k(!0) : y(!1);
    }
    function _(P) {
      P.key !== "ArrowDown" && P.key !== "ArrowUp" || u.value || (P.preventDefault(), y(!0));
    }
    function $(P) {
      const A = P.target;
      A && (l.value?.contains(A) || r.value?.root?.contains(A) || k(!1));
    }
    ke(u, (P) => {
      P ? window.addEventListener("pointerdown", $, !0) : window.removeEventListener("pointerdown", $, !0);
    }), Qe(() => window.removeEventListener("pointerdown", $, !0));
    function z(P) {
      k(!0), !(P.id === void 0 || P.id === n.modelValue) && a("update:modelValue", P.id);
    }
    return (P, A) => (f(), g("span", Mr, [
      w("span", {
        id: `${M(s)}-name`,
        class: "dc-pick__name"
      }, F(e.label), 9, Sr),
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
        w("span", Pr, F(d.value?.label), 1)
      ], 42, Er),
      A[1] || (A[1] = w("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      o.value ? (f(), se(ra, {
        key: 0,
        ref_key: "menu",
        ref: r,
        class: "dc-pick__list",
        style: Le(b.value),
        items: m.value,
        at: o.value,
        label: e.label,
        autofocus: i.value,
        onChoose: z,
        onDismiss: A[0] || (A[0] = (D) => k(!0))
      }, null, 8, ["style", "items", "at", "label", "autofocus"])) : R("", !0)
    ]));
  }
}), zn = /* @__PURE__ */ ue(Ar, [["__scopeId", "data-v-86680e46"]]);
function Tr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = q(!0);
  let a = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++a, r = e.query.value, o = e.schema.value, i = e.entities.value, u = e.within?.value.trim() ?? "";
    n.value = kn(r) && !u;
    const d = /* @__PURE__ */ new Map();
    for (const m of i) {
      const b = ms(m, r.expr), y = u ? $n(u, b) : b, k = e.source.value.query({
        query: { ...r, entity: m.key, expr: y, facets: At(m), page: 1 },
        schema: o,
        entity: m,
        limit: 0,
        offset: 0
      });
      k instanceof Promise ? (d.set(m.key, { total: 0, pending: !0 }), k.then((x) => {
        if (l !== a) return;
        const _ = new Map(t.value);
        _.set(m.key, { total: x.total, pending: !1 }), t.value = _;
      })) : d.set(m.key, { total: k.total, pending: !1 });
    }
    t.value = d;
  } };
}
const zr = 25, ks = (e, t) => e.toLowerCase() === t.toLowerCase();
function Rr(e, t) {
  return e.find((n) => ks(n.id, t));
}
function Lr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (o) => {
    if (o.facetKey !== Ut || !o.field || !o.value) return null;
    const i = hs(e.schema.value, o.field);
    return i ? { entity: i, id: o.value, key: `${i.key}:${o.value}` } : null;
  }, s = (o) => {
    const { entity: i, id: u } = o, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ps(i, u) ?? "",
        facets: At(i),
        sort: rt(i, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: zr,
      offset: 0
    });
  }, l = (o, i) => {
    const u = un(Ie(o.columns ?? [], "identity"), i);
    return u === Nn || ks(u, i.id) ? "" : u;
  }, r = () => {
    const o = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = a(d);
      m && !t.value.has(m.key) && !n.has(m.key) && o.set(m.key, m);
    }
    if (!o.size) return;
    const i = [...o.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), u = (d) => {
      const m = new Map(t.value);
      d.forEach((b, y) => {
        const { reference: k } = i[y], x = Rr(b.rows, k.id);
        m.set(k.key, x ? l(k.entity, x) : "");
      }), t.value = m;
    };
    if (i.every(({ outcome: d }) => !(d instanceof Promise))) {
      u(i.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of i) n.add(d.key);
    Promise.all(i.map(({ outcome: d }) => Promise.resolve(d))).then(u).catch(() => {
    }).finally(() => {
      for (const { reference: d } of i) n.delete(d.key);
    });
  };
  return ke([e.source, e.schema, e.terms], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(o) {
      const i = a(o);
      return i && t.value.get(i.key) || null;
    }
  };
}
const Fr = ["data-dc-expanded"], Nr = { class: "dc-header__domain" }, Dr = {
  key: 0,
  class: "dc-header__within"
}, Ir = ["title"], Or = ["data-dc-more", "title"], Br = ["title", "aria-label"], Kr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Vr = ["title", "aria-label", "onClick"], qr = ["onKeydown"], Wr = ["aria-expanded", "aria-controls"], Ur = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Hr = { class: "dc-header__sr" }, jr = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Xr = ["disabled"], Gr = ["title"], Yr = ["value", "onKeydown"], Qr = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Zr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Jr = ["disabled"], eo = {
  key: 1,
  class: "dc-header__actions"
}, to = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = xe(), l = v(() => s.schema.value), r = v(
      () => s.hasFacets.value || !!s.query.value.expr.trim() || !!s.within.value
    ), o = v(() => l.value.formatCount ?? wt), i = Tr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      entities: s.entities,
      within: s.within
    });
    function u(T) {
      if (n.hideCount) return T.count;
      if (T.key === s.query.value.entity && r.value) return o.value(s.total.value);
      if (i.pristine.value) return T.count;
      const j = i.counts.value.get(T.key);
      return j ? `${j.pending ? "~" : ""}${o.value(j.total)}` : T.count;
    }
    function d(T) {
      return `${T.label} · ${u(T)}`;
    }
    const m = v(() => s.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${o.value(s.total.value)}`), b = v(() => [
      { key: "", label: m.value },
      ...s.entities.value.map((T) => ({ key: T.key, label: d(T) }))
    ]), y = v(() => {
      const T = s.within.value.trim();
      return T ? la({ ...s.query.value, expr: T, facets: {} }, null) : [];
    }), k = v(
      () => (n.views ?? [...Za]).map((T) => ({ key: T, label: bl[T] }))
    ), x = v(() => es(s.query.value.view, n.views)), _ = v(
      () => !(s.within.value && s.query.value.entity === null && x.value === "cards")
    );
    function $(T) {
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
    }), E = Lr({
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
    return (T, K) => (f(), g("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      w("div", {
        class: "dc-header__trigger",
        onClick: Y
      }, [
        w("span", Nr, F(l.value.label), 1),
        y.value.length ? (f(), g("span", Dr, [
          K[5] || (K[5] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), g(ne, null, ve(y.value, (j) => (f(), g("span", {
            key: `scope:${j.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: ae(j)
          }, F(ae(j)), 9, Ir))), 128))
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
            options: b.value,
            onOpen: M(i).refresh,
            "onUpdate:modelValue": he
          }, null, 8, ["model-value", "options", "onOpen"])) : R("", !0),
          pe(zn, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": x.value,
            options: k.value,
            "onUpdate:modelValue": $
          }, null, 8, ["model-value", "options"]),
          P.value ? (f(), g(ne, { key: 1 }, [
            pe(zn, {
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
            }, F(D.value ? "↓" : "↑"), 9, Br)
          ], 64)) : R("", !0),
          (f(!0), g(ne, null, ve(W.value, (j) => (f(), g(ne, {
            key: j.term.id
          }, [
            j.or ? (f(), g("span", Kr, "or")) : R("", !0),
            w("button", {
              type: "button",
              class: Pt(["dc-term dc-mono", { "dc-term--idle": j.idle }]),
              title: j.idle ? `Not applied to ${M(s).entity.value?.label} — remove ${ae(j.term)}` : `Remove ${ae(j.term)}`,
              "aria-label": `Remove ${ae(j.term)}`,
              onClick: (qe) => M(s).removeTerm(j.term)
            }, F(ae(j.term)), 11, Vr)
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
          }, null, 40, qr), [
            [mn, X.value]
          ])
        ], 40, Or),
        w("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: K[2] || (K[2] = (j) => a("toggle"))
        }, [
          w("span", Ur, F(e.expanded ? "▲" : "▼"), 1),
          w("span", Hr, F(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Wr)
      ]),
      He.value ? (f(), g("nav", jr, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: Ce.value <= 1,
          onClick: K[3] || (K[3] = (j) => M(s).setPage(Ce.value - 1))
        }, [...K[6] || (K[6] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Xr),
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
          }, null, 44, Yr),
          w("span", Qr, "/ " + F(Ke.value), 1)
        ], 8, Gr),
        w("span", Zr, F(Ne.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: Ce.value >= M(s).pageCount.value,
          onClick: K[4] || (K[4] = (j) => M(s).setPage(Ce.value + 1))
        }, [...K[7] || (K[7] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Jr)
      ])) : R("", !0),
      T.$slots.actions ? (f(), g("div", eo, [
        be(T.$slots, "actions", {}, void 0, !0)
      ])) : R("", !0)
    ], 8, Fr));
  }
}), bs = /* @__PURE__ */ ue(to, [["__scopeId", "data-v-ed64bdd6"]]), no = { class: "dc-facet" }, ao = ["id"], so = { class: "dc-facet__body" }, lo = ["aria-labelledby"], ro = ["aria-pressed", "data-dc-active", "onClick"], oo = ["aria-labelledby"], io = ["aria-label", "placeholder", "onKeydown"], co = ["aria-label", "placeholder", "onKeydown"], uo = ["aria-checked"], fo = { class: "dc-switch__text" }, po = ["data-dc-active"], vo = /* @__PURE__ */ ce({
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
      const b = s.value.has(m) ? n.value.selected.filter((y) => y !== m) : [...n.value.selected, m];
      a("update", { kind: "chips", selected: b });
    }
    const r = q(""), o = q("");
    ke(
      () => n.value,
      (m) => {
        m.kind === "range" && (r.value = m.min === null ? "" : m.min, o.value = m.max === null ? "" : m.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(m) {
      if (typeof m == "number") return Number.isFinite(m) ? m : null;
      const b = m.trim();
      if (!b) return null;
      const y = Number(b);
      return Number.isFinite(y) ? y : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const m = i(r.value), b = i(o.value);
      m === n.value.min && b === n.value.max || a("update", { kind: "range", min: m, max: b });
    }
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (m, b) => (f(), g("div", no, [
      w("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, F(e.facet.label), 9, ao),
      w("div", so, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), g("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), g(ne, null, ve(e.facet.options, (y) => (f(), g("button", {
            key: y,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(y),
            "data-dc-active": s.value.has(y) ? "true" : "false",
            onClick: (k) => l(y)
          }, F(y), 9, ro))), 128))
        ], 8, lo)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), g("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          vn(w("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (y) => r.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: Xe(Re(u, ["prevent"]), ["enter"])
          }, null, 40, io), [
            [mn, r.value]
          ]),
          b[2] || (b[2] = w("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          vn(w("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (y) => o.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: Xe(Re(u, ["prevent"]), ["enter"])
          }, null, 40, co), [
            [mn, o.value]
          ])
        ], 8, oo)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), g("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          w("span", fo, F(e.facet.text), 1),
          w("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...b[3] || (b[3] = [
            w("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, po)
        ], 8, uo)) : R("", !0)
      ])
    ]));
  }
}), $s = /* @__PURE__ */ ue(vo, [["__scopeId", "data-v-36d1334b"]]), mo = ["id"], ho = { class: "dc-panel__section dc-panel__rows" }, go = { class: "dc-panel__row" }, _o = ["for"], yo = ["title", "aria-label", "onClick"], wo = ["id", "placeholder", "onKeydown"], ko = { class: "dc-panel__actions" }, bo = ["disabled"], $o = {
  key: 0,
  class: "dc-panel__section"
}, xo = /* @__PURE__ */ ce({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Ht(), s = xe(), l = v(() => ql(s.query.value.expr)), r = v(() => l.value.parts.map(Xt)), o = q(l.value.text), i = q(null);
    ke(
      () => l.value.text,
      (x) => {
        o.value = x;
      }
    );
    const u = v(() => o.value !== l.value.text);
    function d() {
      u.value && s.setExpression(La(l.value.parts, o.value)), n("close");
    }
    function m(x) {
      const { parts: _, text: $ } = l.value;
      s.setExpression(La(_.filter((z, P) => P !== x), $));
    }
    function b(x) {
      const { parts: _ } = l.value;
      o.value || !_.length || (x.preventDefault(), m(_.length - 1));
    }
    function y() {
      o.value = "", s.clearFilters();
    }
    function k(x, _) {
      s.setFacet(x, _);
    }
    return Wt(() => i.value?.focus()), (x, _) => (f(), g("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: _[2] || (_[2] = Xe(Re(($) => n("close"), ["stop"]), ["esc"]))
    }, [
      w("section", ho, [
        w("div", go, [
          w("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, _o),
          w("div", {
            class: "dc-field",
            onMousedown: _[1] || (_[1] = Re(($) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), g(ne, null, ve(r.value, ($, z) => (f(), g("button", {
              key: `${z}:${$}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${$}`,
              "aria-label": `Remove ${$}`,
              onClick: (P) => m(z)
            }, F($), 9, yo))), 128)),
            vn(w("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": _[0] || (_[0] = ($) => o.value = $),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : M(s).schema.value.placeholder,
              onKeydown: [
                Xe(Re(d, ["prevent"]), ["enter"]),
                Xe(b, ["backspace"])
              ]
            }, null, 40, wo), [
              [mn, o.value]
            ])
          ], 32)
        ]),
        M(s).entity.value ? (f(!0), g(ne, { key: 0 }, ve(M(s).entity.value.facets, ($) => (f(), se($s, {
          key: $.key,
          facet: $,
          value: M(s).query.value.facets[$.key],
          onUpdate: (z) => k($.key, z)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : R("", !0),
        w("div", ko, [
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
          }, " Reset ", 8, bo)
        ])
      ]),
      a["panel-section"] ? (f(), g("section", $o, [
        be(x.$slots, "panel-section", {}, void 0, !0)
      ])) : R("", !0)
    ], 40, mo));
  }
}), xs = /* @__PURE__ */ ue(xo, [["__scopeId", "data-v-2642c02d"]]), Co = {
  key: 0,
  class: "dc-actions"
}, Mo = {
  key: 0,
  class: "dc-actions__select"
}, So = { class: "dc-actions__all" }, Eo = ["checked", "indeterminate"], Po = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Ao = { class: "dc-actions__ops" }, To = ["disabled"], zo = ["disabled"], Ro = /* @__PURE__ */ ce({
  __name: "RecordActions",
  setup(e) {
    const t = xe(), n = v(() => t.entity.value), a = v(() => !Gn(t.query.value)), s = v(() => a.value && t.selectable.value), l = v(
      () => a.value && (s.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), r = v(() => t.selection.value.ids.length), o = v(() => t.rows.value.filter((b) => t.isSelected(b)).length), i = v(
      () => t.rows.value.length > 0 && o.value === t.rows.value.length
    ), u = v(() => o.value > 0 && !i.value), d = v(() => r.value ? `${r.value} selected` : "Select all");
    function m(b) {
      return r.value ? `${b} ${r.value}` : b;
    }
    return (b, y) => l.value ? (f(), g("div", Co, [
      s.value ? (f(), g("div", Mo, [
        w("label", So, [
          w("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: i.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: y[0] || (y[0] = (k) => M(t).selectPage(!i.value))
          }, null, 40, Eo),
          w("span", Po, F(d.value), 1)
        ]),
        r.value ? (f(), g("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[1] || (y[1] = (k) => M(t).clearSelection())
        }, " Clear ")) : R("", !0)
      ])) : R("", !0),
      w("div", Ao, [
        n.value?.create ? (f(), g("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: y[2] || (y[2] = (k) => M(t).create(n.value))
        }, [
          y[5] || (y[5] = w("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + F(n.value.create), 1)
        ])) : R("", !0),
        n.value?.duplicate ? (f(), g("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !r.value,
          onClick: y[3] || (y[3] = (k) => M(t).duplicate())
        }, F(m(n.value.duplicate)), 9, To)) : R("", !0),
        n.value?.delete ? (f(), g("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !r.value,
          onClick: y[4] || (y[4] = (k) => M(t).delete())
        }, F(m(n.value.delete)), 9, zo)) : R("", !0)
      ])
    ])) : R("", !0);
  }
}), Cs = /* @__PURE__ */ ue(Ro, [["__scopeId", "data-v-ca4aca14"]]);
function Lo(e, t) {
  if (!e) return null;
  const n = Be(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Fo(e, t) {
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
    image: Lo(Ie(t, "image"), e),
    tint: a ? Be(a, e) ?? null : null
  };
}
function Ms(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Al(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: Sl(t),
    parts: Fo(e, l),
    pinned: a,
    selected: s
  };
}
function zt() {
  const e = xe(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, a) => Ms(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const No = ["data-dc-status"], Do = /* @__PURE__ */ ce({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), g("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, F(e.status), 9, No));
  }
}), Gt = /* @__PURE__ */ ue(Do, [["__scopeId", "data-v-23e59fbf"]]), Io = ["title"], Oo = { key: 1 }, Bo = /* @__PURE__ */ ce({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = xe(), a = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), s = v(() => t.column.label ?? ""), l = v(() => jt(t.column, t.entry.row));
    function r(o) {
      o.stopPropagation(), a.value && n.drill(t.entry.row, a.value, Ze(o));
    }
    return (o, i) => a.value ? (f(), g("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onClick: r
    }, [
      be(o.$slots, "default", {}, () => [
        We(F(l.value), 1)
      ], !0)
    ], 8, Io)) : (f(), g("span", Oo, [
      be(o.$slots, "default", {}, () => [
        We(F(l.value), 1)
      ], !0)
    ]));
  }
}), Yt = /* @__PURE__ */ ue(Bo, [["__scopeId", "data-v-f2501b17"]]), Ko = ["data-dc-active", "aria-pressed", "aria-label"], Vo = /* @__PURE__ */ ce({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = xe();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, l) => (f(), g("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, F(e.pinned ? "★" : "☆"), 9, Ko));
  }
}), oa = /* @__PURE__ */ ue(Vo, [["__scopeId", "data-v-ef63d763"]]), qo = ["src"], Wo = /* @__PURE__ */ ce({
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
    ), (a, s) => e.src.trim() && !n.value ? (f(), g("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, qo)) : R("", !0);
  }
}), ia = /* @__PURE__ */ ue(Wo, [["__scopeId", "data-v-afaab300"]]), Uo = ["data-dc-standing", "title", "aria-label"], Ho = /* @__PURE__ */ ce({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = xe(), a = v(() => fs(t.entry.entity, t.entry.row)), s = v(() => nr(n.query.value.expr, a.value)), l = v(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(o) {
      o.stopPropagation(), n.setExpression(ar(n.query.value.expr, a.value));
    }
    return (o, i) => s.value ? (f(), g("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, F(s.value === "in" ? "+" : "−"), 9, Uo)) : R("", !0);
  }
}), Qt = /* @__PURE__ */ ue(Ho, [["__scopeId", "data-v-29cbf9c3"]]), jo = ["title", "aria-label"], Xo = /* @__PURE__ */ ce({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = xe(), a = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    );
    function s(l) {
      l.stopPropagation(), n.drill(t.entry.row, null, Ze(l));
    }
    return (l, r) => a.value ? (f(), g("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: s
    }, " → ", 8, jo)) : R("", !0);
  }
}), Zt = /* @__PURE__ */ ue(Xo, [["__scopeId", "data-v-feb1c62d"]]), Go = ["checked", "aria-label"], Rt = /* @__PURE__ */ ce({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = xe();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, l) => (f(), g("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Go));
  }
}), Yo = { class: "dc-cards" }, Qo = { class: "dc-card__top dc-mono" }, Zo = { class: "dc-card__lead" }, Jo = {
  key: 1,
  class: "dc-card__entity"
}, ei = { class: "dc-card__top-right" }, ti = ["onClick"], ni = { class: "dc-card__names" }, ai = { class: "dc-card__primary" }, si = { class: "dc-card__secondary dc-mono" }, li = { class: "dc-card__metrics dc-mono" }, ri = {
  key: 0,
  class: "dc-card__date"
}, oi = /* @__PURE__ */ ce({
  __name: "CardsView",
  setup(e) {
    const t = xe(), n = zt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), g("div", Yo, [
      (f(!0), g(ne, null, ve(M(n), (r) => (f(), g("div", {
        key: r.key,
        class: "dc-card"
      }, [
        w("div", Qo, [
          w("span", Zo, [
            M(t).selectable.value ? (f(), se(Rt, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : R("", !0),
            We(" " + F(r.ordinal) + " ", 1),
            a.value ? (f(), g("span", Jo, F(r.entityLabel), 1)) : R("", !0)
          ]),
          w("span", ei, [
            r.parts.state ? (f(), se(Gt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : R("", !0),
            pe(Qt, { entry: r }, null, 8, ["entry"]),
            pe(Zt, { entry: r }, null, 8, ["entry"]),
            M(t).pinnable.value ? (f(), se(oa, {
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
          onClick: (o) => M(t).activate(r.row, M(Ze)(o))
        }, [
          r.parts.image ? (f(), se(ia, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : R("", !0),
          w("span", ni, [
            w("span", ai, F(r.parts.identity), 1),
            w("span", si, F(r.parts.reference), 1)
          ])
        ], 8, ti),
        w("div", li, [
          (f(!0), g(ne, null, ve(r.parts.metrics.slice(0, 2), (o) => (f(), se(Yt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: Ge(() => [
              We(F(o.label) + " " + F(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), g("span", ri, F(r.parts.updated), 1)) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Ss = /* @__PURE__ */ ue(oi, [["__scopeId", "data-v-28581543"]]), ii = { class: "dc-grid" }, ci = ["onClick"], ui = { class: "dc-tile__scrim" }, di = { class: "dc-tile__top dc-mono" }, fi = { class: "dc-tile__chip" }, pi = { class: "dc-tile__caption" }, vi = { class: "dc-tile__secondary dc-truncate" }, mi = { class: "dc-tile__primary" }, hi = /* @__PURE__ */ ce({
  __name: "GridView",
  setup(e) {
    const t = xe(), n = zt();
    return (a, s) => (f(), g("div", ii, [
      (f(!0), g(ne, null, ve(M(n), (l) => (f(), g("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        w("button", {
          type: "button",
          class: "dc-tile",
          style: Le({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => M(t).activate(l.row, M(Ze)(r))
        }, [
          l.parts.image ? (f(), se(ia, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : R("", !0),
          w("span", ui, [
            w("span", di, [
              w("span", fi, F(l.ordinal), 1)
            ]),
            w("span", pi, [
              w("span", vi, F(l.parts.reference), 1),
              w("span", mi, F(l.parts.identity), 1)
            ])
          ])
        ], 12, ci),
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
}), Es = /* @__PURE__ */ ue(hi, [["__scopeId", "data-v-7df25d40"]]), gi = { class: "dc-links" }, _i = ["onClick"], yi = { class: "dc-link__primary dc-truncate" }, wi = { class: "dc-link__secondary dc-mono dc-truncate" }, ki = /* @__PURE__ */ ce({
  __name: "LinksView",
  setup(e) {
    const t = xe(), n = zt();
    return (a, s) => (f(), g("div", gi, [
      (f(!0), g(ne, null, ve(M(n), (l) => (f(), g("span", {
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
          w("span", yi, F(l.parts.identity), 1),
          w("span", wi, F(l.parts.reference), 1)
        ], 8, _i)
      ]))), 128))
    ]));
  }
}), Ps = /* @__PURE__ */ ue(ki, [["__scopeId", "data-v-08d0266c"]]), bi = {
  class: "dc-list",
  role: "list"
}, $i = ["onClick"], xi = { class: "dc-list__ordinal dc-mono" }, Ci = { class: "dc-list__identity" }, Mi = { class: "dc-list__primary dc-truncate" }, Si = { class: "dc-list__secondary dc-mono dc-truncate" }, Ei = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Pi = { class: "dc-list__metrics dc-mono" }, Ai = { class: "dc-list__trailing" }, Ti = /* @__PURE__ */ ce({
  __name: "ListView",
  setup(e) {
    const t = xe(), n = zt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), g("div", bi, [
      (f(!0), g(ne, null, ve(M(n), (r) => (f(), g("div", {
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
          onClick: (o) => M(t).activate(r.row, M(Ze)(o))
        }, [
          w("span", xi, F(r.ordinal), 1),
          w("span", Ci, [
            w("span", Mi, F(r.parts.identity), 1),
            w("span", Si, F(r.parts.reference), 1)
          ])
        ], 8, $i),
        a.value ? (f(), g("span", Ei, F(r.entityLabel), 1)) : R("", !0),
        w("span", Pi, [
          (f(!0), g(ne, null, ve(r.parts.metrics.slice(0, 2), (o) => (f(), se(Yt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", Ai, [
          r.parts.state ? (f(), se(Gt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : R("", !0),
          pe(Qt, { entry: r }, null, 8, ["entry"]),
          pe(Zt, { entry: r }, null, 8, ["entry"]),
          M(t).pinnable.value ? (f(), se(oa, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), On = /* @__PURE__ */ ue(Ti, [["__scopeId", "data-v-11b9f46c"]]), zi = { class: "dc-preview" }, Ri = { class: "dc-preview__pager dc-mono" }, Li = ["disabled"], Fi = { "aria-live": "polite" }, Ni = ["disabled"], Di = {
  key: 0,
  class: "dc-preview__card"
}, Ii = ["src"], Oi = { class: "dc-preview__body" }, Bi = { class: "dc-preview__top" }, Ki = { class: "dc-preview__badges" }, Vi = { class: "dc-preview__entity dc-mono" }, qi = { class: "dc-preview__marks" }, Wi = { class: "dc-preview__primary" }, Ui = { class: "dc-preview__secondary dc-mono" }, Hi = { class: "dc-preview__fields" }, ji = { class: "dc-preview__key" }, Xi = { class: "dc-preview__value dc-mono" }, Gi = /* @__PURE__ */ ce({
  __name: "PreviewView",
  setup(e) {
    const t = xe(), n = zt(), a = q(0);
    ke(n, (i) => {
      a.value > i.length - 1 && (a.value = Math.max(0, i.length - 1));
    });
    const s = v(() => n.value[a.value]), l = v(() => {
      const i = s.value;
      if (!i) return [];
      const u = Ie(i.columns, "reference"), d = Ie(i.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), r = v(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${i}`;
    }), o = (i) => {
      const u = n.value.length;
      u && (a.value = Math.min(u - 1, Math.max(0, a.value + i)));
    };
    return (i, u) => (f(), g("div", zi, [
      w("div", Ri, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: u[0] || (u[0] = (d) => o(-1))
        }, " ‹ ", 8, Li),
        w("span", Fi, F(r.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= M(n).length - 1,
          onClick: u[1] || (u[1] = (d) => o(1))
        }, " › ", 8, Ni)
      ]),
      s.value ? (f(), g("div", Di, [
        w("div", {
          class: "dc-preview__media",
          style: Le({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), g("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Ii)) : (f(), g(ne, { key: 1 }, [
            We(" preview ")
          ], 64))
        ], 4),
        w("div", Oi, [
          w("div", Bi, [
            w("span", Ki, [
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
              w("span", Vi, F(s.value.entityLabel), 1)
            ]),
            w("span", qi, [
              pe(Qt, { entry: s.value }, null, 8, ["entry"]),
              pe(Zt, { entry: s.value }, null, 8, ["entry"]),
              M(t).pinnable.value ? (f(), se(oa, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : R("", !0)
            ])
          ]),
          w("div", null, [
            w("div", Wi, F(s.value.parts.identity), 1),
            w("div", Ui, F(s.value.parts.reference), 1)
          ]),
          w("dl", Hi, [
            (f(!0), g(ne, null, ve(l.value, (d) => (f(), g("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", ji, F(d.key), 1),
              w("dd", Xi, [
                d.column && s.value ? (f(), se(Yt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), g(ne, { key: 1 }, [
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
}), As = /* @__PURE__ */ ue(Gi, [["__scopeId", "data-v-6be41155"]]);
function Yi() {
  const e = xe();
  return v(() => El(e.schema.value, e.entity.value));
}
const Qi = ["title"], Zi = {
  key: 5,
  class: "dc-cell__text"
}, Ji = /* @__PURE__ */ ce({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = xe(), a = v(() => t.column.kind ?? "text"), s = v(() => Be(t.column, t.entry.row)), l = v(
      () => a.value === "ordinal" ? t.entry.ordinal : jt(t.column, t.entry.row)
    ), r = v(() => s.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => Dn(t.column)), u = v(() => cs(t.column, t.entry.row));
    function d(m) {
      if (!o.value) return;
      m.stopPropagation();
      const b = Ze(m);
      t.column.click?.(t.entry.row, b), t.column.activate && n.activate(t.entry.row, b);
    }
    return (m, b) => a.value === "component" && e.column.component ? (f(), se(jn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), se(Gt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), se(ia, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Le({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), se(Yt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), g("button", {
      key: 4,
      type: "button",
      class: Pt(["dc-table__open", { "dc-truncate": i.value }]),
      title: u.value,
      onClick: d
    }, F(l.value), 11, Qi)) : (f(), g("span", Zi, F(l.value), 1));
  }
}), Oa = /* @__PURE__ */ ue(Ji, [["__scopeId", "data-v-70ba8aa2"]]), ec = {
  key: 0,
  class: "dc-table__none"
}, tc = { class: "dc-table__detail" }, nc = ["data-dc-wrap"], ac = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, sc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], lc = ["onClick"], rc = {
  key: 2,
  class: "dc-table__head"
}, oc = ["onClick"], ic = {
  key: 0,
  class: "dc-table__pick"
}, cc = ["data-dc-align", "data-dc-hide", "title"], uc = {
  key: 0,
  class: "dc-table__name"
}, dc = /* @__PURE__ */ ce({
  __name: "TableView",
  setup(e) {
    const t = xe(), n = zt(), a = Yi(), s = v(
      () => a.value.find((y) => y.scope) ?? Ie(a.value, "identity")
    ), l = v(
      () => a.value.some((y) => y.kind === "image" || y.height !== void 0)
    );
    function r(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const o = v(() => t.entity.value?.label ?? "The result set"), i = v(() => new Set(t.sorts.value.map((y) => y.key))), u = (y) => y.sort !== void 0 && i.value.has(y.sort), d = (y) => {
      if (u(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function m(y) {
      return [
        Ta(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        Dn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function b(y, k) {
      if (!(!Dn(y) || y.activate || y.click))
        return cs(y, k.row);
    }
    return (y, k) => M(a).length ? (f(), g("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": l.value ? "" : void 0
    }, [
      w("thead", null, [
        w("tr", null, [
          M(t).selectable.value ? (f(), g("th", ac, [...k[3] || (k[3] = [
            w("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : R("", !0),
          (f(!0), g(ne, null, ve(M(a), (x, _) => (f(), g("th", {
            key: M(Pa)(x, _),
            scope: "col",
            class: Pt(M(Ta)(x)),
            style: Le({ width: x.width }),
            "data-dc-align": M(Aa)(x),
            "data-dc-hide": x.hideBelow,
            "aria-sort": d(x),
            title: x.hint
          }, [
            u(x) ? (f(), g("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: ($) => r(x.sort)
            }, F(x.label), 9, lc)) : (f(), g(ne, { key: 1 }, [
              We(F(x.label), 1)
            ], 64)),
            x.header ? (f(), g("span", rc, [
              (f(), se(jn(x.header), {
                column: x,
                entity: M(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : R("", !0)
          ], 14, sc))), 128))
        ])
      ]),
      w("tbody", null, [
        (f(!0), g(ne, null, ve(M(n), (x) => (f(), g("tr", {
          key: x.key,
          class: "dc-table__row",
          onClick: (_) => M(t).activate(x.row, M(Ze)(_))
        }, [
          M(t).selectable.value ? (f(), g("td", ic, [
            pe(Rt, {
              row: x.row,
              selected: x.selected,
              name: x.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : R("", !0),
          (f(!0), g(ne, null, ve(M(a), (_, $) => (f(), g("td", {
            key: M(Pa)(_, $),
            class: Pt(m(_)),
            "data-dc-align": M(Aa)(_),
            "data-dc-hide": _.hideBelow,
            title: b(_, x)
          }, [
            _ === s.value ? (f(), g("span", uc, [
              pe(Oa, {
                column: _,
                entry: x
              }, null, 8, ["column", "entry"]),
              pe(Qt, { entry: x }, null, 8, ["entry"]),
              _.scope ? (f(), se(Zt, {
                key: 0,
                entry: x
              }, null, 8, ["entry"])) : R("", !0)
            ])) : (f(), se(Oa, {
              key: 1,
              column: _,
              entry: x
            }, null, 8, ["column", "entry"]))
          ], 10, cc))), 128))
        ], 8, oc))), 128))
      ])
    ], 8, nc)) : (f(), g("p", ec, [
      k[2] || (k[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", tc, [
        We(F(o.value) + " has no ", 1),
        k[0] || (k[0] = w("code", null, "columns", -1)),
        k[1] || (k[1] = We(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ts = /* @__PURE__ */ ue(dc, [["__scopeId", "data-v-25677138"]]);
function fc(e) {
  const t = Et([]), n = q(!1), a = Et(null);
  let s = 0;
  const l = (i, u, d, m, b) => ({
    entity: i,
    rows: u.rows.map(
      (y, k) => Ms(y, k, i, e.isPinned(y.id))
    ),
    total: u.total,
    count: d ? i.count : String(u.total),
    pinned: pc(m, u, b)
  }), r = () => {
    const i = ++s, u = e.query.value, d = e.schema.value, m = e.entities.value, b = e.limit.value, y = e.within?.value.trim() ?? "", k = kn(u) && !y, x = y ? $n(y, u.expr) : u.expr, _ = m.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: $.key, expr: x, facets: At($), page: 1 },
        schema: d,
        entity: $,
        limit: b,
        offset: 0
      })
    }));
    if (_.every(({ outcome: $ }) => !($ instanceof Promise))) {
      t.value = _.map(
        ({ entity: $, outcome: z }) => l($, z, k, d, x)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(_.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      i === s && (t.value = $.map(
        (z, P) => l(_[P].entity, z, k, d, x)
      ), a.value = null);
    }).catch(($) => {
      i === s && (a.value = $, t.value = []);
    }).finally(() => {
      i === s && (n.value = !1);
    });
  }, o = () => {
    try {
      r();
    } catch (i) {
      a.value = i, t.value = [], n.value = !1;
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
    o,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: o };
}
function pc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Qn(e, a);
  return !!l && vs(s, l) === s;
}
const vc = ["data-dc-pending"], mc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, hc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, gc = {
  key: 2,
  class: "dc-types__state"
}, _c = ["data-dc-empty"], yc = ["onClick"], wc = { class: "dc-type__name" }, kc = { class: "dc-type__count dc-mono" }, bc = { class: "dc-type__sr" }, $c = {
  key: 0,
  class: "dc-type__empty"
}, xc = ["onClick"], Cc = { class: "dc-type__identity" }, Mc = { class: "dc-type__primary dc-truncate" }, Sc = { class: "dc-type__secondary dc-mono dc-truncate" }, Ec = { class: "dc-type__trailing dc-mono" }, Pc = { class: "dc-type__metric-value" }, Ac = { class: "dc-type__metric-label" }, Tc = {
  key: 0,
  class: "dc-type__date"
}, zc = ["onClick"], Rc = /* @__PURE__ */ ce({
  __name: "TypeCardsView",
  setup(e) {
    const t = xe(), { previews: n, pending: a, error: s } = fc({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (o) => t.isPinnedId(o)
    }), l = v(() => !t.isPristine.value || !!t.within.value), r = v(
      () => n.value.filter(
        (o) => !o.pinned && (o.rows.length > 0 || o.entity.create)
      )
    );
    return (o, i) => (f(), g("div", {
      class: "dc-types",
      "data-dc-pending": M(a) ? "true" : "false"
    }, [
      be(o.$slots, "before", {}, void 0, !0),
      M(s) ? (f(), g("p", mc, " Could not load results: " + F(M(s) instanceof Error ? M(s).message : "the data source failed."), 1)) : !r.value.length && M(a) ? (f(), g("p", hc, " Running query… ")) : r.value.length ? R("", !0) : (f(), g("p", gc, F(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), g(ne, null, ve(r.value, (u) => (f(), g("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        w("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => M(t).setEntity(u.entity.key)
        }, [
          w("span", wc, F(u.entity.label), 1),
          w("span", kc, F(u.count), 1),
          i[0] || (i[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", bc, "Show only " + F(u.entity.label.toLowerCase()), 1)
        ], 8, yc),
        u.rows.length ? R("", !0) : (f(), g("p", $c, F(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), g(ne, null, ve(u.rows, (d) => (f(), g("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (m) => M(t).activate(d.row, M(Ze)(m))
          }, [
            w("span", Cc, [
              w("span", Mc, F(d.parts.identity), 1),
              w("span", Sc, F(d.parts.reference), 1)
            ])
          ], 8, xc),
          w("span", Ec, [
            (f(!0), g(ne, null, ve(d.parts.metrics.slice(0, 1), (m) => (f(), se(Yt, {
              key: m.column.key ?? m.label,
              class: "dc-type__metric",
              entry: d,
              column: m.column
            }, {
              default: Ge(() => [
                w("span", Pc, F(m.text), 1),
                w("span", Ac, F(m.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), g("span", Tc, F(d.parts.updated), 1)) : R("", !0),
            pe(Qt, { entry: d }, null, 8, ["entry"]),
            pe(Zt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), g("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => M(t).create(u.entity)
        }, [
          i[1] || (i[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + F(u.entity.create), 1)
        ], 8, zc)) : R("", !0)
      ], 8, _c))), 128)),
      be(o.$slots, "after", {}, void 0, !0)
    ], 8, vc));
  }
}), zs = /* @__PURE__ */ ue(Rc, [["__scopeId", "data-v-c7b8f990"]]), Lc = ["data-dc-pending"], Fc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Nc = { class: "dc-results__detail" }, Dc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ic = {
  key: 3,
  class: "dc-results__state"
}, Oc = { class: "dc-results__detail" }, Bc = /* @__PURE__ */ ce({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = xe(), a = Ht(), s = {
      list: On,
      cards: Ss,
      grid: Es,
      table: Ts,
      links: Ps,
      preview: As
    }, l = v(() => Gn(n.query.value)), r = v(() => es(n.query.value.view, t.views)), o = v(() => s[r.value] ?? On), i = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = q(null);
    return ke(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (m, b) => (f(), g("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": M(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), se(zs, { key: 0 }, on({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Ge(() => [
            be(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Ge(() => [
            be(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), g("p", Fc, [
        b[1] || (b[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", Nc, F(M(n).error.value instanceof Error ? M(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && M(n).pending.value ? (f(), g("p", Dc, [...b[2] || (b[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), se(jn(o.value), { key: 4 })) : (f(), g("div", Ic, [
        b[3] || (b[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", Oc, F(M(n).summary.value), 1),
        M(n).isPristine.value ? R("", !0) : (f(), g("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: b[0] || (b[0] = (y) => M(n).clearFilters())
        }, F(M(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Lc));
  }
}), Rs = /* @__PURE__ */ ue(Bc, [["__scopeId", "data-v-41f54508"]]), Kc = ["data-dc-theme"], Vc = ["data-dc-width", "data-dc-align"], qc = { class: "dc-shell__panel" }, Wc = /* @__PURE__ */ ce({
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
    const a = e, s = n, l = Ot(e, "open"), r = Ot(e, "pinned"), o = Ot(e, "selected"), i = Ht(), u = St(Qa, null), d = a.route || u ? null : wl(), m = a.route ?? u ?? d;
    Qe(() => d?.dispose?.());
    const b = v(() => er({ seed: a.schema.key })), y = v(() => a.source ?? b.value), k = vr({
      schema: () => a.schema,
      adapter: m,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), x = v(() => a.within?.trim() ?? ""), _ = mr({
      source: y,
      query: k.query,
      schema: v(() => a.schema),
      entity: k.entity,
      limit: v(() => a.limit),
      within: x
    });
    ke(k.query, (C) => s("query-change", C)), ke(
      [_.pageCount, _.pending, k.query],
      () => {
        if (_.pending.value) return;
        const C = _.pageCount.value;
        k.query.value.page > C && k.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Hn() ?? "dc-query-panel", z = q(null);
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
      const C = k.entity.value;
      return !!(C?.duplicate || C?.delete);
    }), E = v(() => new Set(o.value));
    function N(C) {
      const O = new Set(E.value);
      O.has(C.id) ? O.delete(C.id) : O.add(C.id), o.value = [...O];
    }
    function le(C) {
      const O = new Set(E.value);
      for (const Y of _.rows.value)
        C ? O.add(Y.id) : O.delete(Y.id);
      o.value = [...O];
    }
    function ae() {
      o.value.length && (o.value = []);
    }
    const he = v(() => ({
      ids: [...o.value],
      rows: _.rows.value.filter((C) => E.value.has(C.id)),
      entity: k.entity.value
    }));
    ke(() => k.query.value.entity, ae);
    function X(C, O, Y = {}) {
      const ee = sr(a.schema, k.query.value, C, Y);
      Y.exclude ? k.narrow(ee, O?.key ?? k.query.value.entity) : k.narrow(ee, O?.key ?? null, O ? void 0 : "cards"), s("drill", C, O, Y);
    }
    const ye = lr({
      ...k,
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
        if (a.rowPress === "narrow" && Qn(a.schema, C)) {
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
      query: k.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: P
    }), (C, O) => (f(), g("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Le(Ee.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(bs, {
          ref_key: "headerRef",
          ref: z,
          expanded: l.value,
          "panel-id": M($),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: O[0] || (O[0] = (Y) => l.value = !l.value)
        }, on({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Ge(() => [
              be(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), g(ne, { key: 0 }, [
          w("div", {
            class: "dc-shell__scrim",
            onClick: P
          }),
          w("div", qc, [
            pe(xs, {
              "panel-id": M($),
              onClose: P
            }, on({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Ge(() => [
                  be(C.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : R("", !0)
      ], 8, Vc),
      pe(Cs),
      be(C.$slots, "results", {
        rows: M(ye).rows.value,
        total: M(ye).total.value,
        offset: M(ye).offset.value,
        pageCount: M(ye).pageCount.value,
        query: M(ye).query.value,
        pending: M(ye).pending.value
      }, () => [
        pe(Rs, { views: e.views }, on({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: Ge(() => [
              be(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Ge(() => [
              be(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Kc));
  }
}), Uc = /* @__PURE__ */ ue(Wc, [["__scopeId", "data-v-7b71d70f"]]), Hc = ["data-dc-muted"], jc = {
  key: 0,
  class: "dc-shell-card__head"
}, Xc = { class: "dc-shell-card__title" }, Gc = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Yc = {
  key: 0,
  class: "dc-shell-card__aside"
}, Qc = ["data-dc-flush"], Zc = {
  key: 2,
  class: "dc-shell-card__foot"
}, Jc = /* @__PURE__ */ ce({
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
      return d.some((m) => m.type === hl ? !1 : m.type === gl ? String(m.children ?? "").trim().length > 0 : m.type === ne ? l(m.children ?? []) : !0);
    }
    const r = v(() => !!t.title || o.value || s(a.head)), o = v(() => s(a.aside)), i = v(() => s(a.default)), u = v(() => s(a.foot));
    return (d, m) => (f(), g("section", {
      class: "dc-shell-card",
      style: Le(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), g("header", jc, [
        be(d.$slots, "head", {}, () => [
          w("h2", Xc, F(e.title), 1),
          e.count !== void 0 ? (f(), g("span", Gc, F(e.count), 1)) : R("", !0)
        ], !0),
        o.value ? (f(), g("span", Yc, [
          be(d.$slots, "aside", {}, void 0, !0)
        ])) : R("", !0)
      ])) : R("", !0),
      i.value ? (f(), g("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        be(d.$slots, "default", {}, void 0, !0)
      ], 8, Qc)) : R("", !0),
      u.value ? (f(), g("footer", Zc, [
        be(d.$slots, "foot", {}, void 0, !0)
      ])) : R("", !0)
    ], 12, Hc));
  }
}), Fd = /* @__PURE__ */ ue(Jc, [["__scopeId", "data-v-75f2ef0b"]]), eu = ["aria-label"], tu = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], nu = /* @__PURE__ */ ce({
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
    function l(r, o) {
      const i = n.options.length;
      let u = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? u = (o + 1) % i : r.key === "ArrowLeft" || r.key === "ArrowUp" ? u = (o - 1 + i) % i : r.key === "Home" ? u = 0 : r.key === "End" && (u = i - 1), u === null) return;
      r.preventDefault();
      const d = n.options[u];
      d && (a("update:modelValue", d.key), s.value[u]?.focus());
    }
    return (r, o) => (f(), g("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), g(ne, null, ve(e.options, (i, u) => (f(), g("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: Pt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", i.key),
        onKeydown: (d) => l(d, u)
      }, F(i.label), 43, tu))), 128))
    ], 8, eu));
  }
}), au = /* @__PURE__ */ ue(nu, [["__scopeId", "data-v-63fb5482"]]), su = ["data-dc-theme", "aria-label"], lu = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], ru = /* @__PURE__ */ ce({
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
    }), s = t, l = q(null), r = q([]), o = q(null), i = q(null), u = q(!1), d = v(
      () => n.menus.flatMap((A, D) => Bt(A) ? [D] : [])
    );
    function m(A, D) {
      const W = r.value[A]?.getBoundingClientRect(), E = n.menus[A];
      !W || !E || !Bt(E) || (i.value = { x: W.left, y: W.bottom + 2, mirrorX: W.right }, o.value = A, u.value = D);
    }
    function b(A) {
      const D = o.value;
      o.value = null, i.value = null, A && D !== null && r.value[D]?.focus();
    }
    function y(A) {
      o.value === A ? b(!0) : m(A, !1);
    }
    function k(A) {
      o.value === null || o.value === A || m(A, !1);
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
        if (o.value === null) return;
        A.preventDefault(), b(!0);
        return;
      }
      if (D === "ArrowDown" && o.value === null) {
        const N = $();
        if (N === null) return;
        A.preventDefault(), m(N, !0);
        return;
      }
      if (D !== "ArrowLeft" && D !== "ArrowRight") return;
      const W = o.value ?? $(), E = x(W, D === "ArrowRight" ? 1 : -1);
      E !== null && (A.preventDefault(), o.value !== null ? m(E, !0) : r.value[E]?.focus());
    }
    function $() {
      const A = r.value.findIndex((D) => D === document.activeElement);
      return A === -1 ? d.value[0] ?? null : A;
    }
    function z(A) {
      const D = A.target;
      !D || l.value?.contains(D) || b(!1);
    }
    ke(o, (A) => {
      A !== null ? window.addEventListener("pointerdown", z, !0) : window.removeEventListener("pointerdown", z, !0);
    }), Qe(() => window.removeEventListener("pointerdown", z, !0));
    function P(A) {
      b(!0), A.action?.(), s("choose", A);
    }
    return (A, D) => (f(), g("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Le(a.value),
      onKeydown: _
    }, [
      (f(!0), g(ne, null, ve(e.menus, (W, E) => (f(), g("button", {
        key: W.id ?? W.label ?? E,
        ref_for: !0,
        ref: (N) => {
          N && (r.value[E] = N);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === E,
        "aria-disabled": W.disabled ? "true" : void 0,
        disabled: W.disabled,
        "data-dc-menu": W.id ?? W.label,
        tabindex: E === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (N) => y(E),
        onMouseenter: (N) => k(E)
      }, F(W.label), 41, lu))), 128)),
      o.value !== null && i.value ? (f(), se(ra, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: P,
        onDismiss: D[0] || (D[0] = (W) => b(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 44, su));
  }
}), Nd = /* @__PURE__ */ ue(ru, [["__scopeId", "data-v-93dbd2e4"]]), ou = ["aria-label", "aria-expanded", "disabled"], iu = { "aria-hidden": "true" }, cu = /* @__PURE__ */ ce({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = q(null), s = q(null), l = q(null), r = q(!1), o = v(() => l.value !== null);
    function i(k) {
      const x = a.value?.getBoundingClientRect();
      x && (l.value = { x: x.left, y: x.bottom + 4, mirrorX: x.right }, r.value = k);
    }
    function u(k) {
      l.value = null, k && a.value?.focus();
    }
    function d() {
      o.value ? u(!0) : i(!1);
    }
    function m(k) {
      k.key !== "ArrowDown" || o.value || (k.preventDefault(), i(!0));
    }
    function b(k) {
      const x = k.target;
      x && (a.value?.contains(x) || s.value?.root?.contains(x) || u(!1));
    }
    ke(o, (k) => {
      k ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), Qe(() => window.removeEventListener("pointerdown", b, !0));
    function y(k) {
      u(!0), k.action?.(), n("choose", k);
    }
    return (k, x) => (f(), g(ne, null, [
      w("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: m
      }, [
        w("span", iu, F(e.glyph), 1)
      ], 40, ou),
      l.value ? (f(), se(ra, {
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
}), ca = /* @__PURE__ */ ue(cu, [["__scopeId", "data-v-48f5ada5"]]), Lt = (e) => e.kind === "split", H = (e) => e.kind === "group", J = (e) => e.kind === "float", vt = { x: 16, y: 16, w: 360, h: 260 }, yn = 28, Ls = 120, Bn = 220, Fs = 38, kt = 6;
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
function Dd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const me = (e) => typeof e == "string", ua = (e) => me(e) ? Ye(e) : e, en = (e) => me(e) ? [e] : at(e), Ba = (e) => e.panels.filter(me), uu = (e) => e.panels.filter((t) => !me(t)), Oe = (e, t) => e.panels.includes(t);
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
function da(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function fa(e, t) {
  const n = { ...vt, ...t };
  return da(
    e.map(
      (a, s) => xn(a, {
        ...n,
        x: n.x + s * yn,
        y: n.y + s * yn
      })
    )
  );
}
function pa(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const va = (e, t, n) => pa("row", e, t, n), Id = (e, t, n) => pa("column", e, t, n);
function we(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const gt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Od = (e) => ({ ...e, headless: !0 }), Bd = (e) => ({ ...e, fixedView: !0 }), du = (e) => e === "left" || e === "right" ? "row" : "column";
function at(e) {
  return H(e) ? e.panels.flatMap(en) : J(e) ? e.frames.flatMap((t) => at(t.node)) : e.children.flatMap(at);
}
function oe(e, t) {
  return H(e) ? e.panels.some((n) => me(n) ? n === t : oe(n, t)) : J(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Ns = (e) => at(e).length === 0, Kn = (e) => !H(e) && gt(e), Vn = (e) => Ns(e) && !Kn(e);
function Cn(e) {
  return Lt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : J(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => me(t) ? [] : [{ node: t, index: n }]);
}
const ma = (e) => Cn(e).map((t) => t.node);
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
function Ds(e) {
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
  for (const n of ma(e)) {
    const a = $t(n, t);
    if (a) return a;
  }
  return null;
}
function fu(e) {
  const t = ma(e).flatMap(fu);
  return H(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (H(e)) {
    for (const n of uu(e)) {
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
function Rn(e, t, n = Ls) {
  const a = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), s = a(e.w, t.w), l = a(e.h, t.h), r = (o, i, u) => Math.min(Math.max(o, 0), Math.max(u - i, 0));
  return {
    x: Math.round(r(e.x, s, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function Ka(e, t, n, a, s = Ls) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + a), t.includes("n") && (i = e.h - a, r = e.y + a), o < s && (t.includes("w") && (l = e.x + e.w - s), o = s), i < s && (t.includes("n") && (r = e.y + e.h - s), i = s), { x: l, y: r, w: o, h: i };
}
const Is = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function xt(e, t, n) {
  if (H(e)) return tn(e, t, (l) => xt(l, t, n));
  if (J(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!oe(o.node, t)) return o;
      if (Se(o.node, t)) {
        const u = xt(o.node, t, n);
        return u === o.node ? o : (l = !0, { ...o, node: u });
      }
      const i = n(o);
      return i === o ? o : (l = !0, i);
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
function pu(e, t, n) {
  return xt(e, t, (a) => Is(a.rect, n) ? a : { ...a, rect: n });
}
const lt = (e) => e.maximized === !0, Os = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function vu(e, t, n = !0) {
  return xt(e, t, Os(n));
}
function Kd(e, t) {
  const n = Se(e, t);
  return n ? vu(e, t, !lt(n)) : e;
}
const ft = (e) => e.minimized === !0, Bs = (e) => (t) => {
  if (ft(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function mu(e, t, n = !0) {
  return xt(e, t, Bs(n));
}
function Vd(e, t) {
  const n = Se(e, t);
  return n ? mu(e, t, !ft(n)) : e;
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
function ha(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), l = ot(e, s);
  if (!l || !J(l)) return e;
  const r = l.frames[a];
  if (!r) return e;
  const o = n(r);
  if (o === r) return e;
  const i = [...l.frames];
  return i[a] = o, ht(e, s, { ...l, frames: i });
}
function Va(e, t, n) {
  return ha(
    e,
    t,
    (a) => Is(a.rect, n) ? a : { ...a, rect: n }
  );
}
function hu(e, t, n = !0) {
  return ha(e, t, Os(n));
}
function gu(e, t, n = !0) {
  return ha(e, t, Bs(n));
}
function Kt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (J(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const o = Kt(r.node, a), i = o === r.node ? r : { ...r, node: o };
    if (n === e.frames.length - 1 && i === r) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(i), { ...e, frames: u };
  }
  const s = ot(e, [n]);
  if (!s) return e;
  const l = Kt(s, a);
  return l === s ? e : ht(e, [n], l);
}
function _u(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (J(a) && (n[l] = a.frames.length - 1), a = ot(a, [s]));
  }), n;
}
function dn(e, t, n, a) {
  if (H(e)) return tn(e, n, (r) => dn(r, t, n, a));
  if (J(e)) {
    const r = e.frames.findIndex((i) => oe(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if (Se(o.node, n)) {
      const i = dn(o.node, t, n, a);
      if (i === o.node) return e;
      const u = [...e.frames];
      return u[r] = { ...o, node: i }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, xn(Ye(t), a)] };
  }
  if (!oe(e, n)) return e;
  let s = !1;
  const l = e.children.map((r) => {
    const o = dn(r, t, n, a);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: l } : e;
}
function qa(e, t, n, a) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Se(e, n)) return e;
  const s = mt(e, t);
  if (!s) return e;
  const l = dn(s, t, n, a);
  return l === s ? e : $e(l);
}
function yu(e, t, n) {
  return J(e) ? { ...e, frames: [...e.frames, xn(Ye(t), n)] } : H(e) ? Vs(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ye(t)],
    sizes: [...nt(e), 1],
    ...we(e)
  };
}
function Ks(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return yu(e, t, a);
  const l = n.slice(1), r = (d, m) => m === s ? Ks(d, t, l, a) : mt(d, t);
  if (J(e)) {
    const d = e.frames.flatMap((m, b) => {
      const y = r(m.node, b);
      return y ? [y === m.node ? m : { ...m, node: y }] : [];
    });
    return { ...e, frames: d };
  }
  if (H(e)) {
    const d = _t(e), m = [];
    e.panels.forEach((k, x) => {
      if (me(k)) {
        k !== t && m.push(k);
        return;
      }
      const _ = r(k, x);
      _ && m.push(_);
    });
    const y = e.active && m.some((k) => en(k).includes(e.active)) ? e.active : Te(m[d] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...y ? { active: y } : {},
      ...we(e)
    };
  }
  const o = nt(e), i = [], u = [];
  return e.children.forEach((d, m) => {
    const b = r(d, m);
    b && (i.push(b), u.push(o[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: u, ...we(e) };
}
function Wa(e, t, n, a) {
  const s = ot(e, n);
  return !s || !Ns(s) || !oe(e, t) ? e : $e(Ks(e, t, n, a));
}
function Ln(e, t) {
  if (H(e)) return tn(e, t, (s) => Ln(s, t));
  if (J(e)) {
    const s = e.frames.findIndex((u) => oe(u.node, t)), l = e.frames[s];
    if (!l) return e;
    const r = Ln(l.node, t), o = r === l.node ? l : { ...l, node: r };
    if (s === e.frames.length - 1 && o === l) return e;
    const i = [...e.frames];
    return i.splice(s, 1), i.push(o), { ...e, frames: i };
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = Ln(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function ga(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), s = a.reduce((l, r) => l + r, 0);
  return s <= 0 ? n() : a.map((l) => l / s);
}
const nt = (e) => ga(e.children.length, e.sizes), Ue = (e) => {
  const t = H(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function $e(e) {
  if (H(e)) return wu(e);
  if (J(e)) {
    const o = e.frames.flatMap((i) => {
      const u = $e(i.node);
      return Vn(u) ? [] : [u === i.node ? i : { ...i, node: u }];
    });
    return o.length === e.frames.length && o.every((i, u) => i === e.frames[u]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = nt(e), n = Ue(e), a = [], s = [], l = [];
  e.children.forEach((o, i) => {
    const u = $e(o), d = t[i] ?? 0;
    if (Vn(u)) return;
    if (!n && Lt(u) && u.direction === e.direction && !Ue(u) && !gt(u)) {
      const b = nt(u);
      u.children.forEach((y, k) => {
        a.push(y), s.push(d * (b[k] ?? 0));
      });
      return;
    }
    a.push(u), s.push(d);
    const m = n?.[i];
    m && l.push(m);
  });
  const r = a[0];
  return a.length === 1 && r && !gt(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: ga(a.length, s),
    ...we(e),
    ...l.length === a.length && l.length > 0 ? { places: l } : {}
  };
}
function wu(e) {
  if (e.panels.every(me)) return e;
  const t = Te(e), n = Ue(e), a = [], s = [];
  e.panels.forEach((o, i) => {
    const u = n?.[i];
    if (me(o)) {
      a.push(o), u && s.push(u);
      return;
    }
    const d = $e(o);
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
  if (a.length === e.panels.length && a.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && a.some((o) => en(o).includes(t)) ? t : void 0;
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
    const r = e.frames.flatMap((o) => {
      const i = mt(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !Kn(e) ? null : { ...e, frames: r };
  }
  if (H(e)) {
    if (!oe(e, t)) return e;
    const r = _t(e), o = [];
    for (const d of e.panels) {
      if (me(d)) {
        d !== t && o.push(d);
        continue;
      }
      const m = mt(d, t);
      m && o.push(m);
    }
    if (o.length === 0) return null;
    const u = e.active && o.some((d) => en(d).includes(e.active)) ? e.active : Te(o[r] ?? o[o.length - 1]);
    return u ? { kind: "group", panels: o, active: u, ...we(e) } : { kind: "group", panels: o, ...we(e) };
  }
  const n = nt(e), a = [], s = [];
  if (e.children.forEach((r, o) => {
    const i = mt(r, t);
    i && (a.push(i), s.push(n[o] ?? 0));
  }), a.length === 0)
    return Kn(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...we(e) } : null;
  const l = a[0];
  return a.length === 1 && l && !gt(e) ? l : $e({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...we(e)
  });
}
function Vs(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...we(e) };
}
function It(e, t, n, a, s) {
  const l = (y) => Jt(
    y,
    (k) => oe(k, n) ? It(k, t, n, a, s) : k
  );
  if (a === "float") return e;
  const r = (y) => tn(y, n, (k) => It(k, t, n, a, s));
  if (a === "center")
    return H(e) ? Oe(e, n) ? Vs(e, t, s) : r(e) : J(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (y) => oe(y, n) ? It(y, t, n, a, s) : y
      )
    };
  const o = du(a), i = a === "left" || a === "top", u = (y) => ({
    kind: "split",
    direction: o,
    children: i ? [Ye(t), y] : [y, Ye(t)],
    sizes: [0.5, 0.5]
  });
  if (H(e)) return Oe(e, n) ? u(e) : r(e);
  if (J(e)) return l(e);
  const d = nt(e), m = e.children.findIndex(
    (y) => H(y) && Oe(y, n)
  );
  if (m >= 0 && e.direction === o) {
    const y = (d[m] ?? 0) / 2, k = [...e.children], x = [...d];
    return k.splice(i ? m : m + 1, 0, Ye(t)), x.splice(m, 1, y, y), {
      kind: "split",
      direction: o,
      children: k,
      sizes: x,
      ...we(e)
    };
  }
  const b = e.children.map((y) => oe(y, n) ? H(y) && Oe(y, n) ? u(y) : It(y, t, n, a) : y);
  return {
    kind: "split",
    direction: e.direction,
    children: b,
    sizes: d,
    ...we(e)
  };
}
function Ct(e, t) {
  if (H(e)) {
    if (Oe(e, t))
      return Ds(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((i) => !me(i) && oe(i, t)), l = e.panels[s];
    if (l === void 0 || me(l)) return e;
    const r = Ct(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[s] = r, { ...e, panels: o, active: t };
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
    const r = Ue(e), o = r ? [...r] : void 0;
    o && o.splice(s, 0, ...o.splice(a, 1));
    const i = Te(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ...we(e),
      ...o ? { places: o } : {}
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
    const o = l.panels.indexOf(t), i = s > o ? s - 1 : s;
    return i === o ? e : Ct(Vt(e, t, i), t);
  }
  if (t === n) return e;
  const r = mt(e, t);
  return r ? $e(It(r, t, n, a, s)) : e;
}
function qs(e, t, n) {
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
    return r ? qs(e, l, r) : null;
  }
  return null;
}
function qd(e, t, n) {
  const a = nn(
    e,
    t,
    (s) => Lt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? $e(a) : e;
}
function Ws(e) {
  return J(e) ? [e] : Ue(e) || gt(e) ? [e] : H(e) ? [...e.panels] : e.children.flatMap(Ws);
}
function Us(e, t) {
  if (H(e)) return e;
  const n = ma(e).map(Ws), a = n.flat(), s = t && a.some((r) => en(r).includes(t)) ? t : void 0, l = ku(e, n);
  return $e({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function ku(e, t) {
  const n = J(e) ? e.frames.map(({ node: a, ...s }) => s) : Ue(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function bu(e, t) {
  const n = nn(e, t, (a) => Us(a, t));
  return n ? $e(n) : e;
}
function _a(e, t, n) {
  if (H(e) && Oe(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Cn(e)) {
    if (!oe(a, t)) continue;
    const l = _a(a, t, n);
    return l ? qs(e, s, l) : null;
  }
  return null;
}
function Ua(e, t, n) {
  const a = _a(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const l = Ue(s);
    return {
      ...pa(n, s.panels.map(ua)),
      ...we(s),
      ...l ? { places: l } : {}
    };
  });
  return a ? $e(a) : e;
}
function Wn(e, t) {
  if (H(e)) return e;
  if (J(e)) {
    const s = e.frames.findIndex(
      (o) => H(o.node) && o.node.panels.includes(t)
    ), l = e.frames[s], r = l && H(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const o = fa(r.panels.map(ua), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...o, ...e.frames.slice(s + 1)]
      };
    }
    return Jt(e, (o) => Wn(o, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = Wn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function $u(e, t, n) {
  const a = $t(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const r = Wn(e, t);
    return r === e ? e : $e(r);
  }
  const l = _a(e, t, (r) => ({
    ...da(Hs(r.panels.map(ua), Ue(r), n)),
    ...we(r)
  }));
  return l ? $e(l) : e;
}
function Hs(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : fa(e, n).frames;
}
function js(e, t) {
  return { ...da(Hs(e.children, Ue(e), t)), ...we(e) };
}
function Wd(e, t, n) {
  const a = nn(
    e,
    t,
    (s) => J(s) ? s : js(s, n)
  );
  return a ? $e(a) : H(e) && Oe(e, t) ? fa([e], n) : e;
}
function xu(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function Xs(e, t) {
  const n = xu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...we(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function Ud(e, t, n = "row") {
  const a = nn(
    e,
    t,
    (s) => J(s) ? Xs(s, n) : s
  );
  return a ? $e(a) : e;
}
function Gs(e) {
  if (J(e)) return null;
  const t = H(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || me(t) || H(t) && t.panels.length === 1 && me(t.panels[0]) ? null : t;
}
const Cu = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Mu(e, t) {
  const n = Gs(e);
  return n ? t === "inner" ? n : { ...Cu(n), ...we(e) } : e;
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
    const i = e.frames[a];
    if (!i) return e;
    const u = ht(i.node, s, n);
    if (u === i.node) return e;
    const d = [...e.frames];
    return d[a] = { ...i, node: u }, { ...e, frames: d };
  }
  if (H(e)) {
    const i = e.panels[a];
    if (i === void 0 || me(i)) return e;
    const u = ht(i, s, n);
    if (u === i) return e;
    const d = [...e.panels];
    return d[a] = u, { ...e, panels: d };
  }
  const l = e.children[a];
  if (!l) return e;
  const r = ht(l, s, n);
  if (r === l) return e;
  const o = [...e.children];
  return o[a] = r, { ...e, children: o };
}
function pn(e, t, n) {
  if (t.length === 0)
    return Lt(e) ? { ...e, sizes: ga(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (J(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const i = pn(o.node, s, n);
    if (i === o.node) return e;
    const u = [...e.frames];
    return u[a] = { ...o, node: i }, { ...e, frames: u };
  }
  if (H(e)) {
    const o = e.panels[a];
    if (o === void 0 || me(o)) return e;
    const i = pn(o, s, n);
    if (i === o) return e;
    const u = [...e.panels];
    return u[a] = i, { ...e, panels: u };
  }
  const l = e.children[a];
  if (!l) return e;
  const r = [...e.children];
  return r[a] = pn(l, s, n), { ...e, children: r };
}
function Ha(e, t, n, a = 0.02) {
  const s = e[t], l = e[t + 1];
  if (s === void 0 || l === void 0) return e;
  const r = s + l;
  if (r < a * 2) return e;
  const o = [...e], i = Math.min(Math.max(s + n, a), r - a);
  return o[t] = i, o[t + 1] = r - i, o;
}
function wn(e) {
  if (!H(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !me(t) ? e : { ...va([Su(e)]), ...we(e) };
}
const Su = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ja(e) {
  return e.length === 0 ? null : va(e.map(Ye));
}
function Eu(e, t) {
  if (!e) return ja(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const i of at(e))
    !n.has(i) || a.has(i) ? s.add(i) : a.add(i);
  let l = e;
  for (const i of s)
    l = l ? mt(l, i) : null;
  const r = new Set(l ? at(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? wn($e(l)) : null;
  if (!l) return ja(o);
  if (J(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (u, d) => xn(Ye(u), {
            x: vt.x + (i + d) * yn,
            y: vt.y + (i + d) * yn
          })
        )
      ]
    };
  }
  return wn($e(va([l, ...o.map(Ye)])));
}
const ya = Symbol("dc.windowContext");
function Pu(e) {
  return Un(ya, e), e;
}
function wa() {
  const e = St(ya, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Au = ["data-dc-glyph"], Tu = { class: "dc-glyph__line" }, zu = ["d"], Ru = {
  key: 0,
  class: "dc-glyph__aqua"
}, Lu = ["d"], Fu = /* @__PURE__ */ ce({
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
    return (a, s) => (f(), g("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      w("g", Tu, [
        (f(!0), g(ne, null, ve(t[e.kind], (l) => (f(), g("path", {
          key: l,
          d: l
        }, null, 8, zu))), 128))
      ]),
      n[e.kind] ? (f(), g("g", Ru, [
        (f(!0), g(ne, null, ve(n[e.kind], (l) => (f(), g("path", {
          key: l,
          d: l
        }, null, 8, Lu))), 128))
      ])) : R("", !0)
    ], 8, Au));
  }
}), Mt = /* @__PURE__ */ ue(Fu, [["__scopeId", "data-v-4d2872c0"]]), Nu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Du = ["data-dc-movable"], Iu = { class: "dc-float__title dc-truncate" }, Ou = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Bu = ["aria-label", "aria-pressed", "data-dc-minimize"], Ku = ["aria-label", "aria-pressed", "data-dc-maximize"], Vu = ["aria-label", "data-dc-close"], qu = { class: "dc-float__content" }, Wu = ["data-dc-handle", "onPointerdown"], Uu = /* @__PURE__ */ ce({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = wa(), a = v(() => Te(t.frame.node)), s = v(() => n.panelFor(a.value)?.fixed === !0), l = v(() => lt(t.frame)), r = v(() => ft(t.frame)), o = v(() => l.value || r.value), i = v(() => n.resizable.value && !s.value && !o.value), u = v(() => n.movable.value && !s.value && !o.value), d = v(() => {
      const D = at(t.frame.node);
      return D.length === 1 ? D[0] ?? null : null;
    }), m = v(() => d.value !== null && n.closable(d.value)), b = v(() => t.frame.node.headless === !0), y = v(
      () => !b.value && (!H(t.frame.node) || r.value)
    ), k = v(
      () => t.frame.title || Tt(t.frame.node) || qt(t.frame.node, (D) => n.panelFor(D)?.title)
    ), x = v(() => n.spaceMenu(t.path));
    function _(D) {
      D.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, D, "move");
    }
    function $(D) {
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
        height: `${Fs}px`
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
    return (D, W) => (f(), g("div", {
      class: "dc-float",
      style: Le(P.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": z.value ? "true" : "false",
      onPointerdown: W[3] || (W[3] = (E) => M(n).raiseAt(e.path))
    }, [
      y.value ? (f(), g("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: _,
        onDblclick: $
      }, [
        w("span", Iu, F(k.value), 1),
        x.value.length ? (f(), se(ca, {
          key: 0,
          items: x.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : R("", !0),
        !s.value || r.value && m.value && d.value ? (f(), g("div", Ou, [
          s.value ? R("", !0) : (f(), g("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": a.value,
            onClick: W[0] || (W[0] = (E) => M(n).toggleMinimizeAt(e.path))
          }, [
            pe(Mt, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Bu)),
          s.value ? R("", !0) : (f(), g("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: W[1] || (W[1] = (E) => M(n).toggleMaximizeAt(e.path))
          }, [
            pe(Mt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Ku)),
          r.value && m.value && d.value ? (f(), g("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": d.value,
            onClick: W[2] || (W[2] = (E) => M(n).close(d.value))
          }, [
            pe(Mt, { kind: "close" })
          ], 8, Vu)) : R("", !0)
        ])) : R("", !0)
      ], 40, Du)) : R("", !0),
      w("div", qu, [
        be(D.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), g(ne, null, ve(i.value ? A : [], (E) => (f(), g("span", {
        key: E,
        class: "dc-float__grip",
        "data-dc-handle": E,
        "aria-hidden": "true",
        onPointerdown: Re((N) => M(n).beginFrameDragAt(e.path, N, E), ["stop"])
      }, null, 40, Wu))), 128))
    ], 44, Nu));
  }
}), Hu = /* @__PURE__ */ ue(Uu, [["__scopeId", "data-v-f035684c"]]), ka = Symbol("dc.paneContext");
function ju(e) {
  return Un(ka, e), e;
}
function Hd() {
  return St(ka, null);
}
function jd(e) {
  const t = St(ya, null), n = St(ka, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Dt(e)
  );
  return _l() && Ga(a), a;
}
const Xu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Gu = ["data-dc-movable"], Yu = ["aria-label", "aria-pressed"], Qu = ["data-dc-space-name"], Zu = { class: "dc-truncate" }, Ju = ["aria-label"], ed = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, td = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], nd = { class: "dc-tab__name dc-truncate" }, ad = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, sd = ["aria-label", "data-dc-close", "onClick"], ld = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, rd = { class: "dc-pane__tools" }, od = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, id = ["aria-label", "data-dc-minimize"], cd = ["aria-label", "aria-pressed", "data-dc-maximize"], ud = ["aria-label", "data-dc-close"], dd = ["id", "role", "aria-labelledby"], fd = ["id", "role", "aria-labelledby"], pd = ["data-dc-edge"], vd = /* @__PURE__ */ ce({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = wa(), a = Hn() ?? "dc-pane", s = v(
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
    }), o = v(() => r.value?.kind === "space" ? r.value.node : null), i = v(() => o.value ? "" : Ds(t.group)), u = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => r.value?.title ?? ""), m = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), b = v(() => [...t.path, r.value?.index ?? 0]), y = v(() => i.value || Ba(t.group)[0] || ""), k = v(() => n.viewFor(i.value)), x = v(() => t.group.headless === !0), _ = v(() => n.focused.value === i.value), $ = v(() => n.dragging.value === i.value), z = v(() => n.moving.value === i.value), P = v(() => n.frameOf(y.value) !== null), A = v(() => n.panelFor(y.value)?.fixed === !0), D = v(
      () => !o.value && (n.canMove(i.value) || P.value && n.movable.value && !A.value)
    ), W = v(
      () => o.value ? n.spaceMenu(b.value) : n.menuFor(i.value)
    ), E = (B) => n.closable(B);
    ju({ panel: i });
    const N = v(() => n.maximized(y.value)), le = v(
      () => P.value && !A.value || !l.value && !!u.value && E(u.value.id)
    ), ae = (B) => `${a}-tab-${B}`, he = v(() => `${a}-body`), X = v(() => {
      const B = n.dropTarget.value;
      return !B || !Oe(t.group, B.panel) || B.edge === "float" ? null : B;
    }), ye = v(() => X.value?.index === void 0 ? X.value?.edge ?? null : null), Ee = v(() => X.value?.index ?? null), C = () => u.value ? n.renderContent(u.value, k.value, _.value) ?? null : null, O = () => u.value ? n.renderActions(u.value, k.value, _.value) ?? null : null;
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
      i.value && n.focus(i.value), !B.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (P.value ? n.beginFrameDrag(y.value, B, "move") : n.beginDrag(i.value, B));
    }
    function He(B) {
      Y = { x: B.clientX, y: B.clientY }, n.beginDrag(i.value, B);
    }
    function Ke(B) {
      ee(B) || n.toggleMoveMode(i.value);
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
        B.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const U = Ne[B.key];
      U && (B.preventDefault(), P.value ? n.nudgeFrame(i.value, U, B.shiftKey) : n.nudge(i.value, U, B.shiftKey));
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
    return (B, U) => r.value ? (f(), g("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": M(Ba)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": P.value ? "true" : "false",
      "data-dc-maximized": N.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": _.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: U[7] || (U[7] = (te) => i.value && M(n).focus(i.value))
    }, [
      x.value ? R("", !0) : (f(), g("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": D.value ? "true" : "false",
        onPointerdown: Ce,
        onDblclick: Ve
      }, [
        D.value ? (f(), g("button", {
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
        ])], 40, Yu)) : R("", !0),
        m.value ? (f(), g("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          w("span", Zu, F(m.value), 1)
        ], 8, Qu)) : R("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), g(ne, null, ve(s.value, (te, T) => (f(), g(ne, {
            key: te.id
          }, [
            Ee.value === T ? (f(), g("span", ed)) : R("", !0),
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
              w("span", nd, F(te.title), 1),
              te.kind === "panel" && te.panel.subtitle ? (f(), g("span", ad, F(te.panel.subtitle), 1)) : R("", !0),
              l.value && te.kind === "panel" && E(te.id) ? (f(), g("span", {
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
              ])], 40, sd)) : R("", !0)
            ], 40, td)
          ], 64))), 128)),
          Ee.value === s.value.length ? (f(), g("span", ld)) : R("", !0)
        ], 8, Ju),
        w("div", rd, [
          pe(O),
          W.value.length ? (f(), se(ca, {
            key: 0,
            items: W.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ]),
        le.value ? (f(), g("div", od, [
          P.value && !A.value ? (f(), g("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: U[1] || (U[1] = Re(() => {
            }, ["stop"])),
            onClick: U[2] || (U[2] = (te) => M(n).toggleMinimize(y.value))
          }, [
            pe(Mt, { kind: "minimize" })
          ], 40, id)) : R("", !0),
          P.value && !A.value ? (f(), g("button", {
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
            pe(Mt, {
              kind: N.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, cd)) : R("", !0),
          !l.value && u.value && E(u.value.id) ? (f(), g("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: U[5] || (U[5] = Re(() => {
            }, ["stop"])),
            onClick: U[6] || (U[6] = (te) => M(n).close(u.value.id))
          }, [
            pe(Mt, { kind: "close" })
          ], 40, ud)) : R("", !0)
        ])) : R("", !0)
      ], 40, Gu)),
      o.value ? (f(), g("div", {
        key: 1,
        id: he.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : ae(r.value.id)
      }, [
        be(B.$slots, "space", {
          node: o.value,
          path: b.value
        }, void 0, !0)
      ], 8, dd)) : (f(), g("div", {
        key: 2,
        id: he.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : ae(i.value)
      }, [
        pe(C)
      ], 8, fd)),
      ye.value ? (f(), g("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ye.value,
        "aria-hidden": "true"
      }, null, 8, pd)) : R("", !0)
    ], 40, Xu)) : R("", !0);
  }
}), Ys = /* @__PURE__ */ ue(vd, [["__scopeId", "data-v-44fd2b2d"]]), md = ["data-dc-space", "data-dc-path", "aria-label"], hd = {
  key: 0,
  class: "dc-space__head"
}, gd = { class: "dc-space__title dc-truncate" }, _d = ["data-dc-direction"], yd = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, wd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], kd = /* @__PURE__ */ ce({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = wa(), a = q(null), s = v(() => H(t.node) ? t.node : null), l = v(() => Lt(t.node) ? t.node : null), r = v(() => J(t.node) ? t.node : null), o = v(
      () => l.value ? l.value.children : r.value?.frames.map((C) => C.node) ?? []
    ), i = v(() => l.value ? nt(l.value) : []), u = v(
      () => (r.value?.frames ?? []).map((C, O) => ({
        held: C,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: O,
        key: E(C.node),
        path: [...t.path, O]
      })).sort((C, O) => C.key < O.key ? -1 : C.key > O.key ? 1 : 0)
    ), d = v(() => Tt(t.node)), m = v(() => n.spaceMenu(t.path)), b = v(() => t.node.headless === !0), y = v(() => r.value ? "desktop" : l.value?.direction ?? ""), k = q(null), x = q(0);
    let _ = null;
    ke(
      k,
      (C) => {
        _?.disconnect(), _ = null, !(!C || typeof ResizeObserver > "u") && (x.value = C.clientWidth, _ = new ResizeObserver(([O]) => {
          x.value = O?.contentRect.width ?? 0;
        }), _.observe(C));
      },
      { immediate: !0 }
    ), Qe(() => _?.disconnect());
    const $ = v(() => {
      const C = Math.max(
        1,
        Math.floor((x.value + kt) / (Bn + kt))
      ), O = /* @__PURE__ */ new Map();
      let Y = 0;
      for (const ee of u.value)
        ee.held.minimized === !0 && (O.set(ee.key, {
          x: kt + Y % C * (Bn + kt),
          bottom: kt + Math.floor(Y / C) * (Fs + kt)
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
    }), D = v(() => l.value?.direction === "row"), W = v(() => o.value.map((C, O) => [...t.path, O])), E = (C) => [...at(C)].sort().join("/"), N = (C) => {
      const O = at(C)[0];
      return (O ? n.panelFor(O)?.title : null) ?? O ?? "panel";
    }, le = (C) => {
      const O = o.value[C], Y = o.value[C + 1];
      return !O || !Y ? "Resize panels" : `Resize ${N(O)} and ${N(Y)}`;
    }, ae = (C) => {
      const O = i.value[C] ?? 0, Y = i.value[C + 1] ?? 0, ee = O + Y;
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
        n.setSizes(t.path, Ha(ze, O, Ve, Ce));
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
      C.preventDefault(), n.setSizes(t.path, Ha(nt(Y), O, ze, he()));
    }
    return (C, O) => {
      const Y = Ya("WindowNode", !0);
      return s.value ? (f(), se(Ys, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Ge(({ node: ee, path: ge }) => [
          pe(Y, {
            node: ee,
            path: ge,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), g("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": y.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !b.value ? (f(), g("header", hd, [
          w("span", gd, F(d.value), 1),
          m.value.length ? (f(), se(ca, {
            key: 0,
            items: m.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ])) : R("", !0),
        r.value ? (f(), g("div", {
          key: 1,
          ref_key: "desktop",
          ref: k,
          class: "dc-window__desktop"
        }, [
          P.value ? (f(), g("div", {
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
          (f(!0), g(ne, null, ve(u.value, (ee) => (f(), se(Hu, {
            key: ee.key,
            frame: ee.held,
            path: ee.path,
            order: ee.order,
            place: $.value.get(ee.key) ?? null
          }, {
            default: Ge(() => [
              pe(Y, {
                node: ee.held.node,
                path: ee.path,
                framed: ee.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (f(), g("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          A.value ? (f(), g("div", yd)) : R("", !0),
          (f(!0), g(ne, null, ve(o.value, (ee, ge) => (f(), g(ne, {
            key: E(ee)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: Le({ flexGrow: i.value[ge] ?? 1 })
            }, [
              pe(Y, {
                node: ee,
                path: W.value[ge] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ge < o.value.length - 1 ? (f(), g("div", {
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
            }, null, 40, wd)) : R("", !0)
          ], 64))), 128))
        ], 8, _d)) : R("", !0)
      ], 8, md));
    };
  }
}), bd = /* @__PURE__ */ ue(kd, [["__scopeId", "data-v-fb5b403f"]]), $d = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], xd = {
  key: 1,
  class: "dc-window__empty"
}, Cd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, rn = 16, Md = /* @__PURE__ */ ce({
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
    const a = e, s = n, l = Ot(e, "layout"), r = Ot(e, "views"), o = Ht(), i = v(() => new Map(a.panels.map((c) => [c.id, c]))), u = v(() => a.panels.map((c) => c.id)), d = v(() => Eu(l.value, u.value)), m = q(null), b = q(null), y = q(null), k = q(!0), x = q(null), _ = q(null), $ = q(null), z = q(""), P = q(null);
    function A() {
      const c = P.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((h) => h.closest(".dc-window") === c).map((h) => ({ panels: (h.dataset.dcPanels ?? "").split(" "), element: h })) : [];
    }
    function D(c) {
      const p = [];
      let h = c.closest(".dc-float");
      for (; h; )
        p.unshift(Number(h.dataset.dcOrder ?? 0)), h = h.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function W() {
      return A().map((c) => ({ pane: c, order: D(c.element) })).sort((c, p) => {
        const h = Math.max(c.order.length, p.order.length);
        for (let S = 0; S < h; S += 1) {
          const L = (c.order[S] ?? -1) - (p.order[S] ?? -1);
          if (L !== 0) return L;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const E = (c) => A().find((p) => p.panels.includes(c)) ?? null;
    function N(c) {
      const p = i.value.get(c);
      if (!p) return "";
      const h = r.value[c];
      return h && p.views?.some((S) => S.key === h) ? h : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function le(c, p) {
      r.value = { ...r.value, [c]: p }, s("view-change", { panel: c, view: p });
    }
    const ae = v(
      () => a.panels.filter((c) => c.fixed !== !0).length
    );
    function he(c) {
      return !a.movable || ae.value < 1 || a.panels.length < 2 ? !1 : i.value.get(c)?.fixed !== !0;
    }
    function X(c, p) {
      const h = d.value;
      !c || !h || c === h || (l.value = c, p && s("panel-move", p));
    }
    function ye(c, p, h) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const S = (p - c.left) / c.width, L = (h - c.top) / c.height, I = 0.3;
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
      const h = [...c.querySelectorAll(".dc-tab")], S = h.findIndex((L) => {
        const I = L.getBoundingClientRect();
        return p < I.left + I.width / 2;
      });
      return S === -1 ? h.length : S;
    }
    function C(c, p, h) {
      for (const { panels: S, element: L } of W().reverse()) {
        const I = L.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const de = S.find((Q) => Q !== h), re = L.querySelector(".dc-pane__tabs"), V = re?.getBoundingClientRect();
        if (re && V && p >= V.top && p <= V.bottom)
          return de ? { panel: de, edge: "center", index: Ee(re, c) } : null;
        const G = L.querySelector(":scope > .dc-pane__space");
        if (G) {
          const Q = G.getBoundingClientRect();
          if (c >= Q.left && c <= Q.right && p >= Q.top && p <= Q.bottom) continue;
        }
        return de ? { panel: de, edge: ye(I, c, p) } : null;
      }
      return Y(c, p, h) ?? Me(c, p);
    }
    function O() {
      const c = P.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function Y(c, p, h) {
      const S = d.value;
      if (!S) return null;
      for (const L of O()) {
        const I = L.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const de = ze(L), re = de.flatMap((ie) => ie.panels).find((ie) => ie !== h);
        if (!re && de.length > 0) return null;
        const V = Se(S, h)?.rect, G = Rn(
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
        const h = ee(p);
        return h ? [{ element: p, path: h }] : [];
      }) : [];
    }
    function Me(c, p) {
      for (const { element: h, path: S } of ge()) {
        if (h.dataset.dcSpace === "desktop") continue;
        const L = h.getBoundingClientRect();
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
      if (!he(c) || b.value || _.value || p.button !== 0) return;
      const h = p.clientX, S = p.clientY;
      let L = !1, I = He(p);
      const de = () => {
        const fe = $.value;
        fe && (y.value = I ? Y(fe.x, fe.y, c) : C(fe.x, fe.y, c));
      }, re = (fe) => {
        if (!L) {
          if (Math.hypot(fe.clientX - h, fe.clientY - S) < 4) return;
          L = !0, b.value = c, x.value = null;
        }
        I = He(fe), k.value = !I, $.value = { x: fe.clientX, y: fe.clientY }, de();
      }, V = (fe) => {
        He(fe) !== I && (I = !I, k.value = !I, L && de());
      }, G = (fe) => {
        Ce?.();
        const Z = y.value, Ae = d.value;
        if (fe && L && Z && Ae) {
          const st = Z.space ? Wa(Ae, c, Z.space, Z.rect) : Z.edge === "float" && Z.rect ? qa(Ae, c, Z.panel, Z.rect) : ln(Ae, c, Z.panel, Z.edge, Z.index);
          X(st, {
            panel: c,
            target: Z.panel,
            edge: Z.edge,
            ...Z.space === void 0 ? {} : { space: Z.space },
            ...Z.index === void 0 ? {} : { index: Z.index },
            ...Z.rect === void 0 ? {} : { rect: Z.rect }
          });
        }
        b.value = null, y.value = null, $.value = null, k.value = !0;
      }, Q = () => G(!0), ie = () => G(!1), _e = (fe) => {
        if (fe.key === "Escape") {
          G(!1);
          return;
        }
        V(fe);
      };
      Ce = () => {
        window.removeEventListener("pointermove", re), window.removeEventListener("pointerup", Q), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", _e), window.removeEventListener("keyup", V), Ce = null;
      }, window.addEventListener("pointermove", re), window.addEventListener("pointerup", Q), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", _e), window.addEventListener("keyup", V);
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
      const h = Kt(p, c);
      h !== p && (l.value = h);
    }
    function yt(c) {
      const p = Ve(c);
      p && it(p);
    }
    function B(c) {
      const p = d.value, h = p ? Se(p, c) : null;
      return h !== null && lt(h);
    }
    function U(c) {
      const p = d.value, h = p ? Se(p, c) : null;
      return h !== null && ft(h);
    }
    function te(c) {
      const p = d.value, h = p ? dt(p, c) : null;
      return h ? Te(h.node) : "";
    }
    function T(c) {
      const p = d.value, h = p ? dt(p, c) : null;
      if (!p || !h) return;
      const S = Te(h.node);
      if (i.value.get(S)?.fixed === !0) return;
      const L = !ft(h);
      let I = gu(p, c, L);
      I !== p && (L || (I = Kt(I, c)), l.value = I, s("frame-minimize", { panel: S, minimized: L }));
    }
    function K(c) {
      const p = Ve(c);
      p && T(p);
    }
    function j(c) {
      const p = d.value, h = p ? dt(p, c) : null;
      if (!p || !h) return;
      const S = Te(h.node);
      if (i.value.get(S)?.fixed === !0) return;
      const L = !lt(h);
      let I = hu(p, c, L);
      I !== p && (L && (I = Kt(I, c)), l.value = I, s("frame-maximize", { panel: S, maximized: L }));
    }
    function qe(c) {
      const p = Ve(c);
      p && j(p);
    }
    function Ft(c, p, h) {
      const S = d.value, L = S ? dt(S, c) : null;
      if (!S || !L || p.button !== 0 || b.value || _.value) return;
      const I = Te(L.node);
      if (i.value.get(I)?.fixed === !0 || lt(L) || ft(L) || (h === "move" ? !a.movable : !a.resizable)) return;
      const de = Pe(c), re = _u(S, c);
      it(c);
      const V = { w: de?.clientWidth ?? 0, h: de?.clientHeight ?? 0 }, G = { ...L.rect }, Q = p.clientX, ie = p.clientY, _e = a.minPanelSize;
      _.value = I;
      const fe = (De) => {
        const Je = d.value;
        if (!Je) return;
        const Nt = Va(Je, re, Rn(De, V, _e));
        Nt !== Je && (l.value = Nt);
      }, Z = (De) => {
        De.preventDefault();
        const Je = De.clientX - Q, Nt = De.clientY - ie;
        fe(
          h === "move" ? { ...G, x: G.x + Je, y: G.y + Nt } : Ka(G, h, Je, Nt, _e)
        );
      }, Ae = (De) => {
        if (Ne?.(), _.value = null, !De) {
          fe(G);
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
    function Qs(c, p, h) {
      const S = Ve(c);
      S && Ft(S, p, h);
    }
    function Zs(c, p, h = !1) {
      const S = d.value, L = Ve(c), I = S && L ? dt(S, L) : null;
      if (!S || !L || !I || i.value.get(c)?.fixed === !0 || (h ? !a.resizable : !a.movable)) return;
      if (lt(I) || ft(I)) {
        z.value = `${je(c)} is ${lt(I) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const de = p === "left" ? -rn : p === "right" ? rn : 0, re = p === "up" ? -rn : p === "down" ? rn : 0, V = Pe(L), G = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, Q = h ? Ka(I.rect, "se", de, re, a.minPanelSize) : { ...I.rect, x: I.rect.x + de, y: I.rect.y + re }, ie = Va(S, L, Rn(Q, G, a.minPanelSize));
      if (ie === S) {
        z.value = h ? `${je(c)} cannot be resized further.` : `${je(c)} cannot move ${p}.`;
        return;
      }
      l.value = ie;
      const _e = dt(ie, L);
      _e && (s("frame-change", { panel: c, rect: _e.rect }), z.value = h ? `${je(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${je(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    Qe(() => Ne?.());
    function Js(c, p) {
      const h = E(c), S = h?.element.getBoundingClientRect();
      if (!h || !S) return null;
      const L = p === "left" || p === "right", I = (V) => {
        if (!(L ? V.bottom > S.top + 1 && V.top < S.bottom - 1 : V.right > S.left + 1 && V.left < S.right - 1)) return null;
        const Q = p === "left" ? S.left - V.right : p === "right" ? V.left - S.right : p === "up" ? S.top - V.bottom : V.top - S.bottom;
        return Q < -1 ? null : Q;
      }, de = [];
      for (const V of A()) {
        if (V === h || V.element === h.element) continue;
        const G = I(V.element.getBoundingClientRect());
        if (G === null) continue;
        const Q = V.panels.find((ie) => ie !== c);
        Q && de.push({ to: { panel: Q }, distance: G });
      }
      for (const { element: V, path: G } of ge()) {
        const Q = I(V.getBoundingClientRect());
        Q !== null && de.push({ to: { space: G }, distance: Q });
      }
      return de.reduce(
        (V, G) => V && V.distance <= G.distance ? V : G,
        null
      )?.to ?? null;
    }
    function el(c) {
      const p = d.value ? Se(d.value, c) !== null : !1;
      if (!p && !he(c)) return;
      x.value = x.value === c ? null : c;
      const h = je(c);
      if (!x.value) {
        z.value = `${h}: move mode off.`;
        return;
      }
      z.value = p ? `${h}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${h}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const je = (c) => i.value.get(c)?.title ?? c, tl = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function nl(c, p, h = !1) {
      if (!he(c)) return;
      const S = d.value;
      if (!S) return;
      const L = je(c), I = $t(S, c);
      if (!h && I && (p === "left" || p === "right") && I.panels.length > 1) {
        const ie = I.panels.indexOf(c), _e = p === "left" ? ie - 1 : ie + 1;
        if (_e >= 0 && _e < I.panels.length) {
          X(Vt(S, c, _e), { panel: c, target: c, edge: "center", index: _e }), z.value = `${L} moved ${p}, now tab ${_e + 1} of ${I.panels.length}.`, Mn(c);
          return;
        }
      }
      const re = Js(c, p);
      if (!re || re.panel !== void 0 && !he(re.panel)) {
        z.value = `${L} cannot move ${p}.`;
        return;
      }
      const V = tl[p];
      if (re.space) {
        const ie = re.space, _e = ot(S, ie), fe = Se(S, c)?.rect, Z = { ...vt, ...fe ? { w: fe.w, h: fe.h } : {} };
        X(Wa(S, c, ie, Z), { panel: c, target: "", space: ie, edge: V }), z.value = `${L} moved ${p}, into ${_e ? Tt(_e) : "the space"}.`, Mn(c);
        return;
      }
      const G = re.panel, Q = I?.panels.length === 1 && $t(S, G)?.panels.length === 1;
      h ? (X(ln(S, c, G, "center"), {
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
    function al(c, p) {
      const h = d.value;
      h && (l.value = pn(h, c, p));
    }
    function Sn(c) {
      const p = d.value;
      if (!p) return;
      const h = Ct(p, c);
      h !== p && (l.value = h, s("tab-select", { panel: c }));
    }
    function ba(c) {
      return i.value.get(c)?.closable ?? a.closable;
    }
    function sl(c) {
      ba(c) && s("panel-close", c);
    }
    const En = q(/* @__PURE__ */ new Map());
    let ll = 0;
    function rl(c, p) {
      const h = ll += 1;
      return En.value.set(h, { panel: c, items: p }), () => {
        En.value.delete(h);
      };
    }
    function ol(c) {
      const p = [];
      for (const h of En.value.values())
        h.panel() === c && p.push(...h.items());
      return p;
    }
    function $a(c) {
      const p = c.filter((h) => h.items.length > 0);
      return p.length < 2 ? p.flatMap((h) => h.items) : p.flatMap((h) => [
        { id: h.id, heading: !0, label: h.title },
        ...h.items
      ]);
    }
    const xa = (c) => c.title || "These tabs";
    function il(c, p) {
      const h = p.id, S = $t(c, h), L = (S?.panels.length ?? 0) > 1, I = S?.fixedView === !0, de = (Q) => ({
        action: () => {
          Q !== c && (l.value = Q);
        }
      }), re = [], V = [], G = p.views ?? [];
      if (G.length > 1 && !I) {
        const Q = N(h);
        re.push({
          id: "view",
          label: "View",
          items: G.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === Q,
            action: () => le(h, ie.key)
          }))
        });
      }
      return L && !I && V.push(
        { id: "show-row", label: "Row", checked: !1, ...de(Ua(c, h, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...de(Ua(c, h, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...de(bu(c, h))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...de($u(c, h))
        }
      ), L && S && (V.length && V.push({ separator: !0 }), V.push(...Ca(S, h))), { panel: re, tabs: V, tabsTitle: S ? xa(S) : "" };
    }
    function Ca(c, p) {
      const h = _t(c), S = (L) => {
        const I = c.panels[(h + L + c.panels.length) % c.panels.length];
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
    function Ma(c) {
      if (!c || J(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Ue(c)) return null;
      const p = Gs(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function cl(c) {
      const p = d.value;
      if (!a.menu || !p) return [];
      const h = ot(p, c);
      if (!h || H(h)) return [];
      if (h.fixedView) return [];
      const S = J(h) ? "desktop" : h.direction, L = (Z, Ae, st) => ({
        id: `show-${Z}`,
        label: Ae,
        checked: S === Z,
        action: () => {
          const ct = d.value, ut = st();
          !ct || ut === h || (l.value = wn($e(ht(ct, c, ut))));
        }
      }), I = () => {
        const Z = Us(h, ul(h));
        if (H(Z) && Z.panels.length === 0) return h;
        const Ae = H(Z) && Z.panels.length === 1 ? Z.panels[0] : void 0;
        return Ae !== void 0 && me(Ae) ? h : Z;
      }, de = (Z) => () => J(h) ? Xs(h, Z) : h.direction === Z ? h : { ...h, direction: Z }, re = c.slice(0, -1), V = c.length > 0 ? ot(p, re) : null, G = V && H(V) && V.panels.length > 1 ? V : null, Q = V && Ma(V) === h ? V : null, ie = Ma(h), _e = h.title || "this space", fe = (Z, Ae, st, ct, ut) => ({
        id: Z,
        label: ut,
        action: () => {
          const De = d.value;
          De && (l.value = wn($e(ht(De, Ae, Mu(st, ct)))));
        }
      });
      return $a([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: h.title || "This space",
          items: [
            L("row", "Row", de("row")),
            L("column", "Column", de("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            L("tabs", "Tabs", () => I()),
            L("desktop", "Desktop", () => J(h) ? h : js(h))
          ]
        },
        {
          id: "about-around",
          title: ie ? `Around ${an(ie)}` : "",
          items: ie ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ie.title ? [] : [fe("merge-around-keep-this", c, h, "outer", `Keep ${_e}`)],
            ...h.title ? [] : [fe("merge-around-keep-that", c, h, "inner", `Keep ${an(ie)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Q ? `Inside ${an(Q)}` : "",
          items: Q ? [
            ...h.title ? [] : [fe("merge-inside-keep-that", re, Q, "outer", `Keep ${an(Q)}`)],
            ...Q.title ? [] : [fe("merge-inside-keep-this", re, Q, "inner", `Keep ${_e}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: G ? xa(G) : "",
          items: G ? Ca(G, Te(h)) : []
        }
      ]);
    }
    function ul(c) {
      const p = m.value;
      return p && oe(c, p) ? p : void 0;
    }
    function dl(c) {
      const p = d.value, h = i.value.get(c);
      if (!p || !h) return [];
      const S = a.menu ? il(p, h) : null, L = ol(c);
      L.length && S?.panel.length && L.push({ separator: !0 }), S && L.push(...S.panel);
      const I = $a([
        { id: "about-panel", title: h.title, items: L },
        { id: "about-tabs", title: S?.tabsTitle ?? "", items: S?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(h, I) : I;
    }
    function fl(c, p) {
      return o[`${c}-${p}`] ?? o[c];
    }
    function Sa(c, p, h, S) {
      return fl(c, p.id)?.({ panel: p, view: h, active: S });
    }
    Pu({
      panelFor: (c) => i.value.get(c) ?? null,
      viewFor: N,
      setView: le,
      movable: v(() => a.movable),
      resizable: v(() => a.resizable),
      minPanelSize: v(() => a.minPanelSize),
      spaceNames: v(() => a.spaceNames),
      focused: m,
      dragging: b,
      dropTarget: y,
      moving: x,
      framing: _,
      canMove: he,
      focus(c) {
        m.value !== c && (m.value = c, s("panel-activate", c));
      },
      selectPanel: Sn,
      beginDrag: Ke,
      toggleMoveMode: el,
      nudge: nl,
      setSizes: al,
      frameOf: (c) => d.value ? Se(d.value, c) : null,
      beginFrameDrag: Qs,
      nudgeFrame: Zs,
      raise: yt,
      maximized: B,
      toggleMaximize: qe,
      minimized: U,
      toggleMinimize: K,
      beginFrameDragAt: Ft,
      raiseAt: it,
      toggleMaximizeAt: j,
      toggleMinimizeAt: T,
      menuFor: dl,
      spaceMenu: cl,
      registerMenu: rl,
      closable: ba,
      close: sl,
      renderContent: (c, p, h) => Sa("panel", c, p, h),
      renderActions: (c, p, h) => Sa("actions", c, p, h),
      layout: d
    });
    const pl = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), vl = () => {
      const c = b.value, p = $.value;
      return !c || !p ? null : yl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${p.x}px`, top: `${p.y}px` },
          "aria-hidden": "true"
        },
        i.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, p, h, S) {
        const L = d.value;
        L && X(ln(L, c, p, h, S), {
          panel: c,
          target: p,
          edge: h,
          ...S === void 0 ? {} : { index: S }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (l.value = Ct(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, h) {
        const S = d.value;
        S && X(qa(S, c, p, h), {
          panel: c,
          target: p,
          edge: "float",
          rect: h
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, p) {
        const h = d.value;
        if (!h) return;
        const S = pu(h, c, p);
        if (S === h) return;
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
    }), (c, p) => (f(), g("div", {
      ref_key: "root",
      ref: P,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": b.value ? "true" : "false",
      "data-dc-docking": k.value ? "true" : "false",
      style: Le(pl.value)
    }, [
      d.value ? (f(), se(bd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), g("p", xd, " This window has no panels. ")),
      pe(vl),
      w("p", Cd, F(z.value), 1)
    ], 12, $d));
  }
}), Sd = /* @__PURE__ */ ue(Md, [["__scopeId", "data-v-711565af"]]);
function Xd(e = "", t = "/") {
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
function Xa(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return tt(a === -1 ? n : n.slice(0, a));
}
function Gd(e) {
  const t = q(Xa(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), a = ke(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Xa(s);
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
const Ed = {
  DataShell: Uc,
  ShellHeader: bs,
  QueryPanel: xs,
  RecordActions: Cs,
  ResultsArea: Rs,
  FacetControl: $s,
  SegmentedControl: au,
  StatusPill: Gt,
  WindowFrame: Sd,
  WindowPane: Ys,
  ListView: On,
  CardsView: Ss,
  GridView: Es,
  TableView: Ts,
  LinksView: Ps,
  PreviewView: As,
  TypeCardsView: zs
}, Yd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Ed))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Qa, t.route);
  }
};
export {
  yn as CASCADE_STEP,
  zd as COLUMN_BREAKPOINTS,
  Td as COLUMN_ROLES,
  Ss as CardsView,
  Oa as ColumnCell,
  vt as DEFAULT_FRAME,
  Fn as DEFAULT_SORT,
  kl as DEFAULT_VIEW,
  Uc as DataShell,
  Nn as EMPTY_CELL,
  _s as ENTITY_ALL,
  _n as ENTITY_TERM,
  Ut as EXPRESSION_TERM,
  sa as FACET_PREFIX,
  $s as FacetControl,
  Es as GridView,
  Yd as HeaderContentLayoutPlugin,
  Ps as LinksView,
  On as ListView,
  kt as MINIMIZED_GAP,
  Fs as MINIMIZED_HEIGHT,
  Bn as MINIMIZED_WIDTH,
  Ls as MIN_FRAME,
  Na as MOCK_TINTS,
  Nd as MenuBar,
  ca as MenuButton,
  ra as MenuList,
  Yt as MetricDrill,
  ka as PANE_CONTEXT_KEY,
  ta as PARAM_DIR,
  Zn as PARAM_ENTITY,
  na as PARAM_EXPR,
  aa as PARAM_PAGE,
  ea as PARAM_SORT,
  Jn as PARAM_VIEW,
  oa as PinStar,
  As as PreviewView,
  Qt as QueryMark,
  xs as QueryPanel,
  sn as RECORD_STATUSES,
  rs as RESULT_FIELDS,
  Qa as ROUTE_ADAPTER_KEY,
  Cs as RecordActions,
  Rs as ResultsArea,
  gs as SHELL_CONTEXT_KEY,
  Ad as SHELL_THEMES,
  Zt as ScopeMark,
  au as SegmentedControl,
  Rt as SelectTick,
  Fd as ShellCard,
  bs as ShellHeader,
  Gt as StatusPill,
  Ts as TableView,
  zs as TypeCardsView,
  Za as VIEW_KINDS,
  bl as VIEW_LABELS,
  ya as WINDOW_CONTEXT_KEY,
  Sd as WindowFrame,
  Ys as WindowPane,
  Ds as activePanel,
  _t as activeTab,
  vs as addTerm,
  $n as andExpression,
  du as axisOf,
  fa as cascade,
  cs as cellFull,
  jt as cellText,
  un as cellTextOf,
  Be as cellValue,
  Ea as changesResults,
  Rn as clampRect,
  Us as collapseSpace,
  bu as collapseToTabs,
  Id as column,
  Aa as columnAlign,
  Ta as columnClass,
  Pa as columnKey,
  Dn as columnTruncates,
  El as columnsFor,
  xl as countPages,
  wl as createHistoryAdapter,
  Xd as createMemoryAdapter,
  er as createMockDataSource,
  Gd as createVueRouterAdapter,
  Tl as defaultCellText,
  ja as defaultLayout,
  Yn as defaultQuery,
  sr as drillExpression,
  Wa as dropIntoSpace,
  At as emptyFacetState,
  Xn as emptyFacetValue,
  tr as excludingTerm,
  bt as findEntity,
  rt as findSort,
  Bd as fixedView,
  da as float,
  qa as floatPanel,
  js as floatSplit,
  $u as floatTabs,
  cn as fnv1a,
  ts as focusEntity,
  wt as formatCount,
  Ml as formatDate,
  pt as formatExpression,
  Cl as formatMetric,
  Sl as formatOrdinal,
  Xt as formatTerm,
  xn as frame,
  dt as frameAt,
  Se as frameOf,
  qn as framePathOf,
  Te as frontPanel,
  Ql as generateRows,
  Dd as group,
  $t as groupOf,
  fu as groups,
  ls as hasActiveFacets,
  oe as hasPanel,
  Od as headless,
  It as insertPanel,
  Bt as isChoosable,
  Rd as isEntityScoped,
  ss as isFacetActive,
  J as isFloat,
  H as isGroup,
  lt as isMaximized,
  ft as isMinimized,
  me as isPanelTab,
  kn as isPristineQuery,
  Lt as isSplit,
  Oe as isTabOf,
  Gn as isTypeCardsQuery,
  Ja as isViewKind,
  La as joinExpression,
  ar as liftTerm,
  Kl as matchesExpression,
  Zl as matchesFacets,
  vu as maximizeFrame,
  hu as maximizeFrameAt,
  Mu as mergeSpace,
  mu as minimizeFrame,
  gu as minimizeFrameAt,
  ln as movePanel,
  Vt as moveTab,
  Ld as negateTerm,
  ot as nodeAt,
  qt as nodeTitle,
  $e as normalizeLayout,
  tt as normalizeSearch,
  ga as normalizeSizes,
  Gs as onlySpace,
  gn as oppositeTerm,
  at as panelIds,
  Ye as panelNode,
  Ba as panelTabs,
  Fe as parseExpression,
  dr as parseQuery,
  Fo as presentParts,
  Ms as presentRow,
  Ze as pressOptions,
  ju as providePaneContext,
  lr as provideShellContext,
  Pu as provideWindowContext,
  Ln as raiseFrame,
  Kt as raiseFrameAt,
  _u as raisedPath,
  os as reconcileFacets,
  Eu as reconcileLayout,
  ps as recordTerm,
  mt as removePanel,
  ht as replaceAt,
  Ka as resizeRect,
  Ha as resizeSplit,
  es as resolveView,
  Ie as roleColumn,
  is as roleColumns,
  wn as rootSpace,
  va as row,
  Al as rowKey,
  bn as sameTerm,
  fs as scopeTerm,
  Qn as scopeTermFor,
  hs as scopedEntity,
  Ia as serializeQuery,
  Ct as setActivePanel,
  pu as setFrameRect,
  Va as setFrameRectAt,
  pn as setSizesAt,
  qd as setSplitDirection,
  nt as sizesOf,
  as as sortsFor,
  we as spaceChrome,
  Tt as spaceTitle,
  pa as split,
  ql as splitExpression,
  Ua as spreadTabs,
  pr as summarizeQuery,
  la as summaryTerms,
  fn as swapPanels,
  ua as tabNode,
  en as tabPanels,
  nr as termStanding,
  Xs as tileFloat,
  Wd as toFloat,
  Ud as toTiled,
  Kd as toggleMaximized,
  Vd as toggleMinimized,
  Yi as useColumns,
  Tr as useEntityCounts,
  fc as useEntityPreviews,
  Hd as usePaneContext,
  jd as usePaneMenu,
  zt as usePresentedRows,
  vr as useQueryState,
  Lr as useRecordNames,
  mr as useResults,
  xe as useShellContext,
  wa as useWindowContext,
  ms as withoutOwnScope,
  Vl as withoutTerm
};
