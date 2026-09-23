import { ref as W, inject as Mt, provide as Vn, computed as v, toValue as Ft, shallowRef as Et, watch as be, onScopeDispose as rs, defineComponent as re, onMounted as os, onBeforeUnmount as De, resolveComponent as is, openBlock as f, createElementBlock as m, normalizeStyle as Me, Fragment as te, renderList as he, toDisplayString as O, createCommentVNode as F, createElementVNode as $, createBlock as Z, nextTick as Kt, useId as Wn, unref as P, normalizeClass as Pt, createVNode as ve, withDirectives as pn, withKeys as Ye, withModifiers as Le, vModelText as vn, renderSlot as $e, useSlots as Ht, createTextVNode as We, withCtx as Qe, reactive as za, resolveDynamicComponent as Hn, createSlots as rn, useModel as It, mergeModels as hn, Comment as Al, Text as Tl, getCurrentScope as zl, h as Ll } from "vue";
const cs = Symbol("dc.routeAdapter");
function tt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Rl() {
  const e = typeof window < "u", t = W(e ? tt(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), a = () => {
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
const us = ["list", "cards", "grid", "images", "table", "links", "preview"], tf = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], nn = ["ok", "running", "queued", "review", "failed"], nf = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], af = [480, 620, 760, 900, 1100], Fl = "cards", Ln = "updated";
function ds(e) {
  return typeof e == "string" && us.includes(e);
}
const Nl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Un(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function bt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function fs(e, t = {}) {
  const n = bt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ps(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function vs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of ps(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Il = { key: Ln, label: Ln };
function rt(e, t, n = null) {
  const a = vs(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === Ln) ?? a[0] ?? Il;
}
function jn(e) {
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
  for (const n of e?.facets ?? []) t[n.key] = jn(n);
  return t;
}
function hs(e) {
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
function ms(e) {
  return Object.values(e).some(hs);
}
function Gn(e) {
  return e.entity === null && e.expr.trim() === "" && !ms(e.facets);
}
function sf(e) {
  return e.entity !== null;
}
function Xn(e) {
  return e.entity === null && e.view === "cards";
}
function Ol(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Yn(e, t = {}) {
  const a = t.landing === "entity" ? fs(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && ds(t.view) ? t.view : Fl,
    sort: rt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: At(a),
    page: 1
  };
}
const gs = ["entity", "sort", "dir", "expr", "facets"];
function La(e) {
  return gs.some((t) => t in e);
}
function _s(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : jn(a);
  }
  return n;
}
function on(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Dl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function wt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Bl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function ql(e) {
  return String(e + 1).padStart(2, "0");
}
const Rn = "—";
function Ve(e, t) {
  return e.find((n) => n.role === t);
}
function ys(e, t) {
  return e.filter((n) => n.role === t);
}
function Kl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Vl = ["id", "entityKey", "entityLabel"];
function Oe(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Vl.includes(n))
      return t[n];
  }
}
function Ra(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Wl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Hl(e, t) {
  if (e == null || e === "") return Rn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Dl(n) : String(e);
  }
  return t === "date" ? Bl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Rn : String(e);
}
function Ut(e, t) {
  const n = Oe(e, t);
  return e.format ? e.format(n, t) : Hl(n, e.kind);
}
function Ul(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ws(e, t) {
  const n = Ut(e, t), a = Ul(Oe(e, t));
  return a && a !== n ? a : n;
}
function cn(e, t) {
  return e ? Ut(e, t) : "";
}
function Fa(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const jl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Na(e) {
  return [jl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Fn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Gl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Xl(e) {
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
function Re(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Xl(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), o = r ? s.slice(1) : s, i = r ? { negated: !0 } : {}, c = Gl.exec(o);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...i
    }) : a.push({ kind: "text", value: o, ...i });
  }
  return a.length && n.push(a), n;
}
const Mn = (e) => e.toLowerCase().replace(/\s+/g, ""), Yl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Ql(e, t, n) {
  const a = Mn(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key === e || c.field === e || c.label !== void 0 && Mn(c.label) === a
  );
  if (l) return Oe(l, t);
  const r = n.facets.find((c) => Mn(c.label) === a);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = Yl.find(([c]) => c === a)?.[1];
  if (o) {
    const c = Ve(s, o);
    if (c) return Oe(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = ys(s, "metric")[Number(i[1]) - 1];
    if (c) return Oe(c, t);
  }
}
function En(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Ia(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Zl(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = Ve(r, o), c = i ? Oe(i, t) : void 0;
      return typeof c == "string" && En(c, e.value);
    });
  }
  const a = Ql(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (o) => e.comparator === "=" ? Ia(String(o), e.value) : En(String(o), e.value)
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
    return e.comparator === "=" ? Ia(String(a), e.value) : En(String(a), e.value);
  }
  const s = Number(e.value), l = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(l) ? null : Jl(e.comparator, l, s);
}
function Oa(e, t, n) {
  const a = Zl(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function Jl(e, t, n) {
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
function Da(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
function er(e, t, n) {
  return e.length ? e.some((a) => {
    const s = /* @__PURE__ */ new Map();
    for (const l of a)
      Da(l) && s.set(l.field, (s.get(l.field) ?? !1) || Oa(l, t, n));
    return a.every(
      (l) => Da(l) ? s.get(l.field) === !0 : Oa(l, t, n)
    );
  }) : !0;
}
function Ba(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function jt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ba(e.value) : `${t}${e.field}${e.comparator}${Ba(e.value)}`;
}
function lf(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ft(e) {
  return e.filter((t) => t.length).map((t) => t.map(jt).join(" ")).join(" OR ");
}
function tr(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function nr(e) {
  const t = Re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(jt).join(" ")
  };
}
function qa(e, t) {
  return [...e.map(jt), t.trim()].filter(Boolean).join(" ");
}
const Ka = (e, t) => e.toLowerCase() === t.toLowerCase();
function yn(e, t) {
  return !!e.negated == !!t.negated && ks(e, t);
}
function Vt(e, t) {
  return !!e.negated != !!t.negated && ks(e, t);
}
function ks(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Ka(e.value, t.value) : t.kind === "text" && Ka(e.value, t.value);
}
function ar(e, t) {
  return t.filter((n) => !e.some((a) => yn(a, n)));
}
function Qn(e, t) {
  return bs(e, t, (n) => n);
}
function sr(e, t) {
  return bs(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Vt(s, l)))
  );
}
function bs(e, t, n) {
  const a = Re(e), s = Re(t);
  return a.length ? s.length ? ft(
    a.flatMap(
      (l) => s.map((r) => [...n(l, r), ...ar(l, r)])
    )
  ) : ft(a) : ft(s);
}
const Va = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function $s(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const lr = 7, rr = 3;
function or(e, t, n, a) {
  const s = (t * lr + on(n)) % a, l = [];
  for (let r = 0; r < Math.min(rr, a); r++)
    l.push($s(e, (s + r) % a));
  return l;
}
function ir(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? cr(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function cr(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function ur(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, r = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${r}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return nn[n % nn.length];
    case "updated":
      return l;
    case "tint":
      return Va[n % Va.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return nn[n % nn.length];
    case "date":
      return l;
    default:
      return;
  }
}
function dr(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], d = Math.floor(i / l.length), h = on(`${a}:${e.key}:${c[0]}:${i}`), w = $s(e.key, i), k = new Date(s.getTime() - h % 900 * 36e5).toISOString(), x = {};
    for (const C of e.columns ?? []) {
      const _ = C.field ?? C.key;
      if (!_ || C.value) continue;
      const b = ur(C, {
        hash: on(`${h}:${_}`),
        sample: c,
        revision: d,
        updatedAt: k
      });
      b !== void 0 && (x[_] = b);
    }
    for (const C of e.facets)
      x[C.key] = ir(C, on(`${h}:${C.key}`));
    for (const [C, _] of r)
      x[C] = _ === e.key ? w : or(_, i, C, n);
    o.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: x });
  }
  return o;
}
function fr(e, t) {
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
function pr(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", l = a === "date" || n.role === "updated";
  return (r, o) => {
    const i = Oe(n, r), c = Oe(n, o);
    return s ? Number(c ?? 0) - Number(i ?? 0) : l ? Date.parse(String(c ?? "")) - Date.parse(String(i ?? "")) : String(c ?? "").localeCompare(String(i ?? ""));
  };
}
function vr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = dr(a, { ...e, scopes: r });
    return t.set(a.key, o), o;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: r, offset: o }) {
      const i = Re(a.expr), c = l ? [l] : s.entities, d = [], h = [];
      for (const x of c)
        for (const C of n(x, s))
          d.push(C), (l ? fr(C, a.facets) : !0) && er(i, C, x) && h.push(C);
      const w = rt(l, a.sort, s), k = h.sort(pr(ps(l, s), w.key));
      return a.dir === "asc" && k.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: k.slice(o, o + r),
        total: h.length,
        unfiltered: h.length === d.length
      };
    }
  };
}
function Zn(e, t) {
  return xs(e, t.id);
}
function xs(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Jn(e, t) {
  return Zn(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ea(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Re(t).flat();
  if (!a) return n;
  const s = Re(n);
  return s.some((o) => o.some((i) => yn(i, a))) ? n : s.some((o) => o.some((i) => Vt(i, a))) ? ft(
    s.map(
      (o) => o.map((i) => Vt(i, a) ? a : i)
    )
  ) : `${n} ${t}`;
}
function Cs(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Ss(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Re(t).flat();
  if (!n) return null;
  const a = Re(e).flat();
  return a.some((s) => yn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Vt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Ms(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Re(t).flat();
  if (!n) return e;
  const a = Re(e), s = a.map(
    (l) => l.filter((r) => !yn(r, n) && !Vt(r, n))
  );
  return s.every((l, r) => l.length === a[r]?.length) ? e : ft(s);
}
function Wa(e, t, n) {
  return t ? n === null ? Ms(e, t) : ea(e, n === "out" ? Cs(t) : t) : e;
}
function Be(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey ? { exclude: !0 } : {};
}
function hr(e, t, n, a = {}) {
  const s = Jn(e, n);
  return ea(t.expr, a.exclude ? Cs(s) : s);
}
function Es(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Re(t), s = a.map(
    (l) => l.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((l, r) => l.length === a[r]?.length) ? t : ft(s);
}
function Ps(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const As = Symbol("dc.shellContext");
function mr(e) {
  return Vn(As, e), e;
}
function we() {
  const e = Mt(As, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const ta = "e", na = "v", aa = "s", sa = "d", la = "q", ra = "p", oa = "f_", Ts = "*", gr = [
  ta,
  na,
  aa,
  sa,
  la,
  ra
], Nn = "..", zs = ",", _r = [
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
function Pn(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of _r) t = t.replace(n, a);
  return t;
}
function et(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Ls(e) {
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
function yr(e) {
  return gr.includes(e) || e.startsWith(oa);
}
function Ha(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function wr(e, t) {
  const n = et(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(zs).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => a.has(l)) };
    }
    case "range": {
      const a = n.indexOf(Nn), s = (a === -1 ? n : n.slice(0, a)).trim(), l = (a === -1 ? "" : n.slice(a + Nn.length)).trim(), r = s === "" ? null : Number(s), o = l === "" ? null : Number(l);
      let i = r !== null && Number.isFinite(r) ? Ha(r, e.min, e.max) : null, c = o !== null && Number.isFinite(o) ? Ha(o, e.min, e.max) : null;
      return i !== null && c !== null && i > c && ([i, c] = [c, i]), { kind: "range", min: i, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function kr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(zs) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Nn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function br(e, t, n = {}) {
  const a = Yn(t, n), s = new Map(Ls(e)), l = s.get(ta), r = l === void 0 ? a.entity : et(l), o = r === Ts ? null : bt(t, r), i = s.get(na), c = i && ds(et(i)) ? et(i) : a.view, d = s.get(aa), h = rt(o, d ? et(d) : n.sort, t), w = s.get(sa), k = w ? et(w) === "asc" ? "asc" : "desc" : a.dir, x = s.get(la), C = s.get(ra), _ = C === void 0 ? 1 : Number(et(C)), b = Number.isFinite(_) ? Math.max(1, Math.floor(_)) : 1, L = {};
  for (const z of o?.facets ?? []) {
    const E = s.get(`${oa}${z.key}`);
    L[z.key] = E === void 0 ? jn(z) : wr(z, E);
  }
  return {
    entity: o?.key ?? null,
    view: c,
    sort: h.key,
    dir: k,
    expr: x === void 0 ? "" : et(x),
    facets: _s(o, L),
    page: b
  };
}
function Ua(e, t, n = {}, a = "") {
  const s = Yn(t, n), l = bt(t, e.entity), r = Ls(a).filter(([h]) => !yr(h)), o = [], i = (h, w) => o.push([h, Pn(w)]), c = l?.key ?? null;
  c !== s.entity && i(ta, c ?? Ts), e.view !== s.view && i(na, e.view), e.sort !== s.sort && i(aa, e.sort), e.dir !== s.dir && i(sa, e.dir), e.expr.trim() !== "" && i(la, e.expr);
  for (const h of l?.facets ?? []) {
    const w = e.facets[h.key];
    if (!w) continue;
    const k = kr(w, h);
    k !== null && o.push([`${oa}${h.key}`, Pn(k)]);
  }
  e.page > 1 && i(ra, String(e.page));
  const d = [
    ...r.map(([h, w]) => [Pn(h), w]),
    ...o
  ];
  return d.length ? `?${d.map(([h, w]) => w === "" ? h : `${h}=${w}`).join("&")}` : "";
}
const mn = "entity", Wt = "expr";
function $r(e, t) {
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
function ia(e, t) {
  const n = [];
  t && n.push({
    id: mn,
    label: `entity:${t.key}`,
    facetKey: mn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && hs(s) && n.push(...$r(a, s));
  }
  return Re(e.expr).forEach((a, s) => {
    a.forEach((l, r) => {
      n.push({
        id: `${Wt}:${s}:${r}`,
        label: jt(l),
        facetKey: Wt,
        group: s,
        index: r,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function xr(e, t, n = null) {
  if (Gn(e)) {
    const l = rt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = ia(e, t).filter((l) => l.facetKey !== Wt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Cr(e) {
  const { adapter: t } = e, n = v(() => Ft(e.schema)), a = v(() => Ft(e.defaults) ?? {}), s = v(() => br(t.search.value, n.value, a.value)), l = v(() => bt(n.value, s.value.entity)), r = v(() => l.value ?? fs(n.value, a.value)), o = v(() => vs(l.value, n.value)), i = v(() => rt(l.value, s.value.sort, n.value)), c = (_, b) => {
    const L = Ua(_, n.value, a.value, t.search.value);
    L !== t.search.value && (b === "push" ? t.push(L) : t.replace(L));
  }, d = () => Ft(e.navigationMode) ?? "push", h = () => Ft(e.facetNavigationMode) ?? "replace", w = (_, b) => {
    const L = _.page ?? (La(_) ? 1 : s.value.page);
    c({ ...s.value, ..._, page: L }, b);
  }, k = (_, b) => {
    const L = s.value.facets[_];
    if (!L) return;
    const z = { ...s.value.facets, [_]: b(L) };
    w({ facets: z }, h());
  }, x = (_) => {
    const b = _ === null ? null : bt(n.value, _);
    return (b?.key ?? null) === s.value.entity ? {} : {
      entity: b?.key ?? null,
      sort: rt(b, s.value.sort, n.value).key,
      facets: At(b)
    };
  }, C = (_) => {
    const b = x(_);
    Object.keys(b).length && w(b, d());
  };
  return {
    query: s,
    entity: l,
    focus: r,
    sort: i,
    sorts: o,
    summary: v(() => xr(s.value, l.value, n.value)),
    terms: v(() => ia(s.value, l.value)),
    isPristine: v(() => Gn(s.value)),
    isEverything: v(() => s.value.entity === null),
    hasFacets: v(() => ms(s.value.facets)),
    setEntity: C,
    clearEntity: () => C(null),
    setView(_) {
      w({ view: _ }, d());
    },
    setSort(_) {
      w({ sort: rt(l.value, _, n.value).key }, d());
    },
    toggleDirection() {
      w({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(_) {
      w({ expr: _ }, d());
    },
    narrow(_, b, L) {
      w({ expr: _, ...x(b), ...L ? { view: L } : {} }, d());
    },
    setPage(_, b) {
      w({ page: Math.max(1, Math.floor(_)) }, b ?? d());
    },
    setFacet(_, b) {
      k(_, () => b);
    },
    toggleChip(_, b) {
      k(_, (L) => L.kind !== "chips" ? L : { kind: "chips", selected: L.selected.includes(b) ? L.selected.filter((E) => E !== b) : [...L.selected, b] });
    },
    setRange(_, b, L) {
      k(_, (z) => z.kind === "range" ? { kind: "range", min: b, max: L } : z);
    },
    toggleFlag(_) {
      k(
        _,
        (b) => b.kind === "toggle" ? { kind: "toggle", on: !b.on } : b
      );
    },
    removeTerm(_) {
      if (_.facetKey === mn) {
        C(null);
        return;
      }
      if (_.facetKey === Wt) {
        const b = tr(Re(s.value.expr), _.group ?? 0, _.index ?? 0);
        w({ expr: ft(b) }, d());
        return;
      }
      k(_.facetKey, (b) => b.kind === "chips" && _.option ? { kind: "chips", selected: b.selected.filter((L) => L !== _.option) } : b.kind === "range" ? { kind: "range", min: null, max: null } : b.kind === "toggle" ? { kind: "toggle", on: !1 } : b);
    },
    clearFilters() {
      w({ entity: null, expr: "", facets: At(null) }, d());
    },
    reset() {
      c(Yn(n.value, a.value), d());
    },
    hrefFor(_) {
      const b = { ...s.value, ..._ };
      return b.page = _.page ?? (La(_) ? 1 : s.value.page), b.facets = _s(bt(n.value, b.entity), b.facets), `${t.path.value}${Ua(b, n.value, a.value, t.search.value)}`;
    }
  };
}
function Sr(e) {
  const t = Et([]), n = W(0), a = W(!1), s = W(!1), l = Et(null);
  let r = 0, o = null, i = null;
  const c = v(() => (e.query.value.page - 1) * e.limit.value), d = v(() => Ol(n.value, e.limit.value)), h = () => {
    const E = e.query.value, R = e.within?.value.trim(), K = Es(e.entity.value, E.expr);
    return R ? { ...E, expr: Qn(R, K) } : K === E.expr ? E : { ...E, expr: K };
  }, w = (E, R) => {
    t.value = E.rows, n.value = E.total, l.value = null, k(R);
  }, k = (E) => {
    o = { key: E, total: n.value }, s.value = !1;
  }, x = (E) => {
    l.value = E, t.value = [], n.value = 0, o = null, s.value = !1;
  }, C = (E, R, K, y) => {
    let A = !0;
    const N = () => E === r;
    let V = 0, oe = !1;
    const X = (ie) => {
      V = ie, oe = !0, y === void 0 && (n.value = ie);
    }, ge = () => {
      A && (A = !1, t.value = [], X(0)), l.value = null;
    };
    return {
      get open() {
        return N();
      },
      insert(ie, S) {
        if (!N()) return;
        const D = Array.isArray(ie) ? ie : [ie];
        if (!D.length) return;
        ge();
        const j = [...t.value];
        j.splice(S ?? j.length, 0, ...D), t.value = R > 0 ? j.slice(0, R) : j, X(V + D.length);
      },
      set(ie) {
        N() && (ie.rows && (ge(), t.value = R > 0 ? ie.rows.slice(0, R) : ie.rows, X(ie.rows.length)), ie.total !== void 0 && X(ie.total));
      },
      close() {
        N() && (a.value = !1, oe && (n.value = V), k(K));
      },
      fail(ie) {
        N() && (x(ie), a.value = !1);
      }
    };
  }, _ = () => {
    const E = i;
    i = null, E?.();
  }, b = () => {
    const E = ++r;
    _();
    const R = L.value, K = o?.key === R ? o.total : void 0;
    s.value = K === void 0;
    const y = {
      query: h(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, A = e.source.value;
    if (A.stream) {
      a.value = !0;
      try {
        i = A.stream(y, C(E, y.limit, R, K)) ?? null;
      } catch (V) {
        x(V), a.value = !1;
      }
      return;
    }
    let N;
    try {
      N = A.query(y);
    } catch (V) {
      x(V);
      return;
    }
    if (!(N instanceof Promise)) {
      w(N, R), a.value = !1;
      return;
    }
    a.value = !0, N.then((V) => {
      E === r && w(V, R);
    }).catch((V) => {
      E === r && x(V);
    }).finally(() => {
      E === r && (a.value = !1);
    });
  }, L = v(() => {
    const E = h();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(gs.map((K) => E[K]))}`;
  }), z = v(() => `${L.value}|${e.query.value.page}`);
  return be([e.source, z, e.limit], b, {
    immediate: !0
  }), rs(() => {
    r++, _();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: l, refresh: b };
}
const Ot = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Mr = ["aria-label"], Er = ["role", "aria-label"], Pr = ["data-dc-item"], Ar = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Tr = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], zr = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Lr = { class: "dc-menu__label dc-truncate" }, Rr = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Fr = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Nr = /* @__PURE__ */ re({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = W(null), r = W([]), o = W(null), i = W(null), c = W(null), d = W(!1), h = v(
      () => a.items.flatMap((y, A) => Ot(y) ? [A] : [])
    ), w = v(() => {
      const y = [{ entries: [] }];
      return a.items.forEach((A, N) => {
        A.heading ? y.push({ heading: A, entries: [] }) : y[y.length - 1]?.entries.push({ item: A, index: N });
      }), y.filter((A) => A.entries.length > 0);
    }), k = W({ x: a.at.x, y: a.at.y });
    async function x() {
      k.value = { x: a.at.x, y: a.at.y }, await Kt();
      const y = l.value?.getBoundingClientRect();
      if (!y) return;
      const A = 8;
      let N = a.at.x, V = a.at.y;
      if (N + y.width > window.innerWidth - A) {
        const oe = a.at.mirrorX === void 0 ? null : a.at.mirrorX - y.width;
        N = oe !== null && oe >= A ? oe : window.innerWidth - y.width - A;
      }
      V + y.height > window.innerHeight - A && (V = window.innerHeight - y.height - A), k.value = { x: Math.max(A, N), y: Math.max(A, V) };
    }
    const C = v(() => ({ left: `${k.value.x}px`, top: `${k.value.y}px` }));
    function _(y) {
      o.value = y, y !== null && Kt(() => r.value[y]?.focus());
    }
    function b(y, A) {
      const N = h.value;
      if (N.length === 0) return null;
      if (y === null) return A === 1 ? N[0] ?? null : N[N.length - 1] ?? null;
      const V = N.indexOf(y);
      return V === -1 ? N[0] ?? null : N[(V + A + N.length) % N.length] ?? null;
    }
    function L(y, A) {
      if (!a.items[y]?.items?.length) return;
      const V = r.value[y]?.getBoundingClientRect(), oe = l.value?.getBoundingClientRect();
      !V || !oe || (c.value = { x: oe.right - 4, y: V.top - 4, mirrorX: oe.left + 4 }, i.value = y, d.value = A);
    }
    function z(y) {
      const A = i.value;
      i.value = null, c.value = null, y && A !== null && _(A);
    }
    function E(y) {
      const A = a.items[y];
      if (!(!A || !Ot(A))) {
        if (A.items?.length) {
          L(y, !0);
          return;
        }
        s("choose", A);
      }
    }
    function R(y) {
      const A = y.key;
      if (A === "Escape") {
        y.preventDefault(), y.stopPropagation(), i.value !== null ? z(!0) : s("dismiss");
        return;
      }
      if (A === "ArrowDown" || A === "ArrowUp") {
        y.preventDefault(), y.stopPropagation(), z(!1), _(b(o.value, A === "ArrowDown" ? 1 : -1));
        return;
      }
      if (A === "Home" || A === "End") {
        y.preventDefault(), y.stopPropagation(), z(!1), _(b(null, A === "Home" ? 1 : -1));
        return;
      }
      if (A === "ArrowRight") {
        const N = o.value;
        N !== null && a.items[N]?.items?.length && (y.preventDefault(), y.stopPropagation(), L(N, !0));
        return;
      }
      if (A === "ArrowLeft") {
        i.value !== null && (y.preventDefault(), y.stopPropagation(), z(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const N = o.value;
        if (N === null) return;
        y.preventDefault(), y.stopPropagation(), E(N);
      }
    }
    function K(y) {
      const A = a.items[y];
      !A || !Ot(A) || (i.value !== null && i.value !== y && z(!1), _(y), A.items?.length && L(y, !1));
    }
    return os(() => {
      x(), a.autofocus && _(b(null, 1));
    }), be(() => a.at, x, { deep: !0 }), be(() => a.items, () => void x(), { deep: !0 }), De(() => {
      i.value = null;
    }), t({ root: l }), (y, A) => {
      const N = is("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Me(C.value),
        onKeydown: R
      }, [
        (f(!0), m(te, null, he(w.value, (V, oe) => (f(), m("div", {
          key: `${oe}-${V.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: V.heading ? "group" : "none",
          "aria-label": V.heading?.label
        }, [
          V.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": V.heading.id
          }, O(V.heading.label), 9, Pr)) : F("", !0),
          (f(!0), m(te, null, he(V.entries, ({ item: X, index: ge }) => (f(), m(te, {
            key: X.id ?? `${ge}-${X.label ?? ""}`
          }, [
            X.separator ? (f(), m("div", Ar)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (ie) => {
                ie && (r.value[ge] = ie);
              },
              type: "button",
              class: "dc-menu__item",
              role: X.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": X.checked === void 0 ? void 0 : X.checked,
              "aria-haspopup": X.items?.length ? "menu" : void 0,
              "aria-expanded": X.items?.length ? i.value === ge : void 0,
              "aria-disabled": X.disabled ? "true" : void 0,
              disabled: X.disabled,
              "data-dc-item": X.id,
              tabindex: "-1",
              onClick: (ie) => E(ge),
              onMouseenter: (ie) => K(ge)
            }, [
              $("span", zr, O(X.checked ? "✓" : ""), 1),
              $("span", Lr, O(X.label), 1),
              X.shortcut ? (f(), m("span", Rr, O(X.shortcut), 1)) : X.items?.length ? (f(), m("span", Fr, "›")) : F("", !0)
            ], 40, Tr))
          ], 64))), 128))
        ], 8, Er))), 128)),
        i.value !== null && c.value ? (f(), Z(N, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: c.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: A[0] || (A[0] = (V) => s("choose", V)),
          onDismiss: A[1] || (A[1] = (V) => z(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : F("", !0)
      ], 44, Mr);
    };
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ca = /* @__PURE__ */ ue(Nr, [["__scopeId", "data-v-9b1413fa"]]), Ir = { class: "dc-pick" }, Or = ["id"], Dr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Br = { class: "dc-pick__label" }, qr = /* @__PURE__ */ re({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Wn() ?? "dc-pick", l = W(null), r = W(null), o = W(null), i = W(!1), c = v(() => o.value !== null), d = v(
      () => n.options.find((z) => z.key === n.modelValue) ?? n.options[0]
    ), h = v(
      () => n.options.map((z) => ({
        id: z.key,
        label: z.label,
        checked: z.key === n.modelValue
      }))
    ), w = v(
      () => o.value ? { maxHeight: `${window.innerHeight - o.value.y - 8}px` } : void 0
    );
    function k(z) {
      const E = l.value?.getBoundingClientRect();
      E && (o.value = { x: E.left, y: E.bottom + 4, mirrorX: E.right }, i.value = z, a("open"));
    }
    function x(z) {
      o.value = null, z && l.value?.focus();
    }
    function C() {
      c.value ? x(!0) : k(!1);
    }
    function _(z) {
      z.key !== "ArrowDown" && z.key !== "ArrowUp" || c.value || (z.preventDefault(), k(!0));
    }
    function b(z) {
      const E = z.target;
      E && (l.value?.contains(E) || r.value?.root?.contains(E) || x(!1));
    }
    be(c, (z) => {
      z ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), De(() => window.removeEventListener("pointerdown", b, !0));
    function L(z) {
      x(!0), !(z.id === void 0 || z.id === n.modelValue) && a("update:modelValue", z.id);
    }
    return (z, E) => (f(), m("span", Ir, [
      $("span", {
        id: `${P(s)}-name`,
        class: "dc-pick__name"
      }, O(e.label), 9, Or),
      $("button", {
        id: `${P(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: Pt(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${P(s)}-name ${P(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: C,
        onKeydown: _
      }, [
        $("span", Br, O(d.value?.label), 1)
      ], 42, Dr),
      E[1] || (E[1] = $("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      o.value ? (f(), Z(ca, {
        key: 0,
        ref_key: "menu",
        ref: r,
        class: "dc-pick__list",
        style: Me(w.value),
        items: h.value,
        at: o.value,
        label: e.label,
        autofocus: i.value,
        onChoose: L,
        onDismiss: E[0] || (E[0] = (R) => x(!0))
      }, null, 8, ["style", "items", "at", "label", "autofocus"])) : F("", !0)
    ]));
  }
}), ja = /* @__PURE__ */ ue(qr, [["__scopeId", "data-v-b2ce0fd5"]]);
function Kr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = W(!0);
  let a = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++a, r = e.query.value, o = e.schema.value, i = e.entities.value, c = e.within?.value.trim() ?? "";
    n.value = r.expr.trim() === "" && !c;
    const d = /* @__PURE__ */ new Map();
    let h = !0;
    for (const w of i) {
      const k = Es(w, r.expr), x = c ? Qn(c, k) : k;
      let C = !1;
      const _ = (L) => {
        if (l !== a) return;
        if (h) {
          d.set(w.key, L);
          return;
        }
        const z = new Map(t.value);
        z.set(w.key, L), t.value = z;
      }, b = e.source.value.query({
        query: { ...r, entity: w.key, expr: x, facets: At(w), page: 1 },
        schema: o,
        entity: w,
        limit: 0,
        offset: 0,
        progress: (L) => {
          C || _({ total: L, pending: !0, counted: !0 });
        }
      });
      b instanceof Promise ? (d.has(w.key) || d.set(w.key, { total: 0, pending: !0, counted: !1 }), b.then((L) => {
        C = !0, _({ total: L.total, pending: !1, counted: !0 });
      })) : (C = !0, d.set(w.key, { total: b.total, pending: !1, counted: !0 }));
    }
    h = !1, t.value = d;
  } };
}
const Vr = 25, Rs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Wr(e, t) {
  return e.find((n) => Rs(n.id, t));
}
function Hr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (o) => {
    if (o.facetKey !== Wt || !o.field || !o.value) return null;
    const i = Ps(e.schema.value, o.field);
    return i ? { entity: i, id: o.value, key: `${i.key}:${o.value}` } : null;
  }, s = (o) => {
    const { entity: i, id: c } = o, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: xs(i, c) ?? "",
        facets: At(i),
        sort: rt(i, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Vr,
      offset: 0
    });
  }, l = (o, i) => {
    const c = cn(Ve(o.columns ?? [], "identity"), i);
    return c === Rn || Rs(c, i.id) ? "" : c;
  }, r = () => {
    const o = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const h = a(d);
      h && !t.value.has(h.key) && !n.has(h.key) && o.set(h.key, h);
    }
    if (!o.size) return;
    const i = [...o.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const h = new Map(t.value);
      d.forEach((w, k) => {
        const { reference: x } = i[k], C = Wr(w.rows, x.id);
        h.set(x.key, C ? l(x.entity, C) : "");
      }), t.value = h;
    };
    if (i.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(i.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of i) n.add(d.key);
    Promise.all(i.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of i) n.delete(d.key);
    });
  };
  return be([e.source, e.schema, e.terms], () => {
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
const Ur = ["data-dc-expanded"], jr = { class: "dc-header__domain" }, Gr = {
  key: 0,
  class: "dc-header__within"
}, Xr = ["title"], Yr = ["data-dc-more", "title"], Qr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Zr = ["title", "aria-label", "onClick"], Jr = ["onKeydown"], eo = ["aria-expanded", "aria-controls"], to = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, no = { class: "dc-header__sr" }, ao = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, so = ["disabled"], lo = ["title"], ro = ["value", "onKeydown"], oo = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, io = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, co = ["disabled"], uo = {
  key: 1,
  class: "dc-header__actions"
}, fo = "…", po = /* @__PURE__ */ re({
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
    const n = e, a = t, s = we(), l = v(() => s.schema.value), r = v(
      () => s.hasFacets.value || !!s.query.value.expr.trim() || !!s.within.value
    ), o = v(() => l.value.formatCount ?? wt), i = Kr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      entities: s.entities,
      within: s.within
    });
    function c(B) {
      if (n.hideCount) return B.count;
      if (B.key === s.query.value.entity && r.value) return o.value(s.total.value);
      if (i.pristine.value) return B.count;
      const M = i.counts.value.get(B.key);
      return M ? M.counted ? `${M.pending ? "~" : ""}${o.value(M.total)}` : fo : B.count;
    }
    function d(B) {
      return `${B.label} · ${c(B)}`;
    }
    const h = v(() => [
      { key: "", label: "Everything" },
      ...s.entities.value.map((B) => ({ key: B.key, label: d(B) }))
    ]), w = v(() => {
      const B = s.within.value.trim();
      return B ? ia({ ...s.query.value, expr: B, facets: {} }, null) : [];
    }), k = v(
      () => (n.views ?? [...us]).map((B) => ({ key: B, label: Nl[B] }))
    ), x = v(() => Un(s.query.value.view, n.views)), C = v(() => s.query.value.entity !== null);
    function _(B) {
      s.setView(B);
    }
    const b = v(() => {
      const B = s.entity.value, Y = B?.keepsScope ? void 0 : B?.scope?.toLowerCase();
      return s.terms.value.filter((M) => M.facetKey !== mn).map((M, U, ae) => {
        const Ce = ae[U - 1];
        return {
          term: M,
          or: Ce?.group !== void 0 && M.group !== void 0 && M.group !== Ce.group,
          idle: !!Y && M.field?.toLowerCase() === Y
        };
      });
    }), L = Hr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...w.value, ...s.terms.value])
    });
    function z(B) {
      return Ps(l.value, B)?.scopeLabel ?? B;
    }
    function E(B) {
      return B.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function R(B) {
      const Y = L.nameOf(B);
      return Y ? `${B.negated ? "-" : ""}${z(B.field)}: ${E(Y)}` : B.label;
    }
    function K(B) {
      s.setEntity(B || null);
    }
    const y = W(""), A = W(null);
    function N() {
      const B = y.value.trim();
      B && (s.setExpression(sr(s.query.value.expr, B)), y.value = "");
    }
    function V() {
      y.value = "", A.value?.blur();
    }
    function oe(B) {
      if (y.value) return;
      const Y = b.value.at(-1);
      Y && (B.preventDefault(), s.removeTerm(Y.term));
    }
    function X(B) {
      B.target?.closest("button, select, label, input") || a("toggle");
    }
    const ge = W(null), ie = W("");
    function S() {
      const B = ge.value;
      if (!B) {
        ie.value = "";
        return;
      }
      const Y = B.scrollLeft > 1, M = B.scrollWidth - B.clientWidth - B.scrollLeft > 1;
      ie.value = Y && M ? "both" : Y ? "start" : M ? "end" : "";
    }
    let D = null;
    be(
      ge,
      (B) => {
        D?.disconnect(), D = null, S(), !(!B || typeof ResizeObserver > "u") && (D = new ResizeObserver(S), D.observe(B));
      },
      { flush: "post" }
    ), be(b, S, { flush: "post" }), De(() => D?.disconnect());
    const j = v(() => s.query.value.page), se = v(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !Xn(s.query.value)
    ), _e = v(
      () => `${s.counting.value ? "~" : ""}${wt(s.pageCount.value)}`
    ), Ee = v(() => {
      let B = `Page ${wt(j.value)} of ${_e.value}`;
      const Y = s.rows.value.length;
      if (Y) {
        const M = s.offset.value + 1, U = `${s.counting.value ? "~" : ""}${wt(s.total.value)}`;
        B += ` — rows ${wt(M)} to ${wt(M + Y - 1)} of ${U}`;
      }
      return n.pagesNote ? `${B}
${n.pagesNote}` : B;
    }), ze = W(null), Ue = v(() => ze.value ?? String(j.value)), je = v(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function Ge(B) {
      B.target.select();
    }
    function qe(B) {
      const Y = B.target, M = Y.value.replace(/[^0-9]/g, "");
      Y.value !== M && (Y.value = M), ze.value = M;
    }
    function Fe(B) {
      const Y = B.target, M = Number(ze.value);
      ze.value = null;
      const U = Number.isFinite(M) && M >= 1 ? Math.min(Math.trunc(M), Math.max(1, s.pageCount.value)) : j.value;
      Y.value = String(U), U !== j.value && s.setPage(U);
    }
    function Ke(B) {
      const Y = B.target;
      ze.value = null, Y.value = String(j.value), Y.blur();
    }
    return (B, Y) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      $("div", {
        class: "dc-header__trigger",
        onClick: X
      }, [
        $("span", jr, O(l.value.label), 1),
        w.value.length ? (f(), m("span", Gr, [
          Y[4] || (Y[4] = $("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(te, null, he(w.value, (M) => (f(), m("span", {
            key: `scope:${M.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: R(M)
          }, O(R(M)), 9, Xr))), 128))
        ])) : F("", !0),
        $("div", {
          ref_key: "termBar",
          ref: ge,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ie.value,
          title: P(s).summary.value,
          onScroll: S
        }, [
          C.value ? (f(), Z(ja, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": P(s).query.value.entity ?? "",
            options: h.value,
            onOpen: P(i).refresh,
            "onUpdate:modelValue": K
          }, null, 8, ["model-value", "options", "onOpen"])) : F("", !0),
          ve(ja, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": x.value,
            options: k.value,
            "onUpdate:modelValue": _
          }, null, 8, ["model-value", "options"]),
          (f(!0), m(te, null, he(b.value, (M) => (f(), m(te, {
            key: M.term.id
          }, [
            M.or ? (f(), m("span", Qr, "or")) : F("", !0),
            $("button", {
              type: "button",
              class: Pt(["dc-term dc-mono", { "dc-term--idle": M.idle }]),
              title: M.idle ? `Not applied to ${P(s).entity.value?.label} — remove ${R(M.term)}` : `Remove ${R(M.term)}`,
              "aria-label": `Remove ${R(M.term)}`,
              onClick: (U) => P(s).removeTerm(M.term)
            }, O(R(M.term)), 11, Zr)
          ], 64))), 128)),
          pn($("input", {
            ref_key: "searchBox",
            ref: A,
            "onUpdate:modelValue": Y[0] || (Y[0] = (M) => y.value = M),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Ye(Le(N, ["prevent"]), ["enter"]),
              Ye(Le(V, ["prevent"]), ["esc"]),
              Ye(oe, ["backspace"])
            ]
          }, null, 40, Jr), [
            [vn, y.value]
          ])
        ], 40, Yr),
        $("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: Y[1] || (Y[1] = (M) => a("toggle"))
        }, [
          $("span", to, O(e.expanded ? "▲" : "▼"), 1),
          $("span", no, O(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, eo)
      ]),
      se.value ? (f(), m("nav", ao, [
        $("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: j.value <= 1,
          onClick: Y[2] || (Y[2] = (M) => P(s).setPage(j.value - 1))
        }, [...Y[5] || (Y[5] = [
          $("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, so),
        $("span", {
          class: "dc-header__page dc-mono",
          title: Ee.value
        }, [
          $("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Me({ width: je.value }),
            value: Ue.value,
            onFocus: Ge,
            onInput: qe,
            onKeydown: [
              Ye(Le(Fe, ["prevent"]), ["enter"]),
              Ye(Le(Ke, ["prevent"]), ["esc"])
            ],
            onBlur: Fe
          }, null, 44, ro),
          $("span", oo, "/ " + O(_e.value), 1)
        ], 8, lo),
        $("span", io, O(Ee.value), 1),
        $("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: j.value >= P(s).pageCount.value,
          onClick: Y[3] || (Y[3] = (M) => P(s).setPage(j.value + 1))
        }, [...Y[6] || (Y[6] = [
          $("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, co)
      ])) : F("", !0),
      B.$slots.actions ? (f(), m("div", uo, [
        $e(B.$slots, "actions", {}, void 0, !0)
      ])) : F("", !0)
    ], 8, Ur));
  }
}), Fs = /* @__PURE__ */ ue(po, [["__scopeId", "data-v-2d94e880"]]), vo = { class: "dc-facet" }, ho = ["id"], mo = { class: "dc-facet__body" }, go = ["aria-labelledby"], _o = ["aria-pressed", "data-dc-active", "onClick"], yo = ["aria-labelledby"], wo = ["aria-label", "placeholder", "onKeydown"], ko = ["aria-label", "placeholder", "onKeydown"], bo = ["aria-checked"], $o = { class: "dc-switch__text" }, xo = ["data-dc-active"], Co = /* @__PURE__ */ re({
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
    function l(h) {
      if (n.value.kind !== "chips") return;
      const w = s.value.has(h) ? n.value.selected.filter((k) => k !== h) : [...n.value.selected, h];
      a("update", { kind: "chips", selected: w });
    }
    const r = W(""), o = W("");
    be(
      () => n.value,
      (h) => {
        h.kind === "range" && (r.value = h.min === null ? "" : h.min, o.value = h.max === null ? "" : h.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(h) {
      if (typeof h == "number") return Number.isFinite(h) ? h : null;
      const w = h.trim();
      if (!w) return null;
      const k = Number(w);
      return Number.isFinite(k) ? k : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const h = i(r.value), w = i(o.value);
      h === n.value.min && w === n.value.max || a("update", { kind: "range", min: h, max: w });
    }
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (h, w) => (f(), m("div", vo, [
      $("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, O(e.facet.label), 9, ho),
      $("div", mo, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), m(te, null, he(e.facet.options, (k) => (f(), m("button", {
            key: k,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(k),
            "data-dc-active": s.value.has(k) ? "true" : "false",
            onClick: (x) => l(k)
          }, O(k), 9, _o))), 128))
        ], 8, go)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          pn($("input", {
            "onUpdate:modelValue": w[0] || (w[0] = (k) => r.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(Le(c, ["prevent"]), ["enter"])
          }, null, 40, wo), [
            [vn, r.value]
          ]),
          w[2] || (w[2] = $("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          pn($("input", {
            "onUpdate:modelValue": w[1] || (w[1] = (k) => o.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(Le(c, ["prevent"]), ["enter"])
          }, null, 40, ko), [
            [vn, o.value]
          ])
        ], 8, yo)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          $("span", $o, O(e.facet.text), 1),
          $("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...w[3] || (w[3] = [
            $("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, xo)
        ], 8, bo)) : F("", !0)
      ])
    ]));
  }
}), Ns = /* @__PURE__ */ ue(Co, [["__scopeId", "data-v-36d1334b"]]), So = ["id"], Mo = { class: "dc-panel__section dc-panel__rows" }, Eo = { class: "dc-panel__row" }, Po = ["for"], Ao = ["title", "aria-label", "onClick"], To = ["id", "placeholder", "onKeydown"], zo = { class: "dc-panel__actions" }, Lo = ["disabled"], Ro = {
  key: 0,
  class: "dc-panel__section"
}, Fo = /* @__PURE__ */ re({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Ht(), s = we(), l = v(() => nr(s.query.value.expr)), r = v(() => l.value.parts.map(jt)), o = W(l.value.text), i = W(null);
    be(
      () => l.value.text,
      (C) => {
        o.value = C;
      }
    );
    const c = v(() => o.value !== l.value.text);
    function d() {
      c.value && s.setExpression(qa(l.value.parts, o.value)), n("close");
    }
    function h(C) {
      const { parts: _, text: b } = l.value;
      s.setExpression(qa(_.filter((L, z) => z !== C), b));
    }
    function w(C) {
      const { parts: _ } = l.value;
      o.value || !_.length || (C.preventDefault(), h(_.length - 1));
    }
    function k() {
      o.value = "", s.clearFilters();
    }
    function x(C, _) {
      s.setFacet(C, _);
    }
    return Kt(() => i.value?.focus()), (C, _) => (f(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: _[2] || (_[2] = Ye(Le((b) => n("close"), ["stop"]), ["esc"]))
    }, [
      $("section", Mo, [
        $("div", Eo, [
          $("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, Po),
          $("div", {
            class: "dc-field",
            onMousedown: _[1] || (_[1] = Le((b) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(te, null, he(r.value, (b, L) => (f(), m("button", {
              key: `${L}:${b}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${b}`,
              "aria-label": `Remove ${b}`,
              onClick: (z) => h(L)
            }, O(b), 9, Ao))), 128)),
            pn($("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": _[0] || (_[0] = (b) => o.value = b),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : P(s).schema.value.placeholder,
              onKeydown: [
                Ye(Le(d, ["prevent"]), ["enter"]),
                Ye(w, ["backspace"])
              ]
            }, null, 40, To), [
              [vn, o.value]
            ])
          ], 32)
        ]),
        P(s).entity.value ? (f(!0), m(te, { key: 0 }, he(P(s).entity.value.facets, (b) => (f(), Z(Ns, {
          key: b.key,
          facet: b,
          value: P(s).query.value.facets[b.key],
          onUpdate: (L) => x(b.key, L)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : F("", !0),
        $("div", zo, [
          $("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          $("button", {
            type: "button",
            class: "dc-button",
            disabled: P(s).isPristine.value && !c.value,
            onClick: k
          }, " Reset ", 8, Lo)
        ])
      ]),
      a["panel-section"] ? (f(), m("section", Ro, [
        $e(C.$slots, "panel-section", {}, void 0, !0)
      ])) : F("", !0)
    ], 40, So));
  }
}), Is = /* @__PURE__ */ ue(Fo, [["__scopeId", "data-v-2642c02d"]]), No = ["checked", "indeterminate"], Os = /* @__PURE__ */ re({
  __name: "PageTick",
  setup(e) {
    const t = we(), n = v(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = v(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = v(() => n.value > 0 && !a.value);
    return (l, r) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: r[0] || (r[0] = (o) => P(t).selectPage(!a.value))
    }, null, 40, No));
  }
}), Io = {
  key: 0,
  class: "dc-actions"
}, Oo = {
  key: 0,
  class: "dc-actions__select"
}, Do = {
  key: 0,
  class: "dc-actions__all"
}, Bo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, qo = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Ko = { class: "dc-actions__ops" }, Vo = ["disabled"], Wo = ["disabled"], Ho = /* @__PURE__ */ re({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(() => n.entity.value), s = v(() => !Xn(n.query.value)), l = v(() => s.value && n.selectable.value), r = v(
      () => Un(n.query.value.view, t.views) === "table"
    ), o = v(
      () => s.value && (l.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), i = v(() => n.selection.value.ids.length), c = v(() => i.value ? `${i.value} selected` : r.value ? "None selected" : "Select all");
    function d(h) {
      return i.value ? `${h} ${i.value}` : h;
    }
    return (h, w) => o.value ? (f(), m("div", Io, [
      l.value ? (f(), m("div", Oo, [
        r.value ? (f(), m("span", qo, O(c.value), 1)) : (f(), m("label", Do, [
          ve(Os),
          $("span", Bo, O(c.value), 1)
        ])),
        i.value ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: w[0] || (w[0] = (k) => P(n).clearSelection())
        }, " Clear ")) : F("", !0)
      ])) : F("", !0),
      $("div", Ko, [
        a.value?.create ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: w[1] || (w[1] = (k) => P(n).create(a.value))
        }, [
          w[4] || (w[4] = $("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + O(a.value.create), 1)
        ])) : F("", !0),
        a.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !i.value,
          onClick: w[2] || (w[2] = (k) => P(n).duplicate())
        }, O(d(a.value.duplicate)), 9, Vo)) : F("", !0),
        a.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !i.value,
          onClick: w[3] || (w[3] = (k) => P(n).delete())
        }, O(d(a.value.delete)), 9, Wo)) : F("", !0)
      ])
    ])) : F("", !0);
  }
}), Ds = /* @__PURE__ */ ue(Ho, [["__scopeId", "data-v-03ff2a91"]]);
function Uo(e, t) {
  if (!e) return null;
  const n = Oe(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function jo(e, t) {
  const n = Ve(t, "state"), a = Ve(t, "tint");
  return {
    identity: cn(Ve(t, "identity"), e),
    reference: cn(Ve(t, "reference"), e),
    metrics: ys(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ut(s, e)
    })),
    state: n ? Oe(n, e) ?? null : null,
    updated: cn(Ve(t, "updated"), e),
    image: Uo(Ve(t, "image"), e),
    tint: a ? Oe(a, e) ?? null : null
  };
}
function Bs(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Wl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: ql(t),
    parts: jo(e, l),
    pinned: a,
    selected: s
  };
}
function gt() {
  const e = we(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, a) => Bs(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Go = ["data-dc-status"], Xo = /* @__PURE__ */ re({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, O(e.status), 9, Go));
  }
}), Gt = /* @__PURE__ */ ue(Xo, [["__scopeId", "data-v-23e59fbf"]]), Yo = ["title"], Qo = { key: 1 }, Zo = /* @__PURE__ */ re({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), s = v(() => t.column.label ?? ""), l = v(() => Ut(t.column, t.entry.row));
    function r(o) {
      o.stopPropagation(), a.value && n.drill(t.entry.row, a.value, Be(o));
    }
    return (o, i) => a.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onClick: r
    }, [
      $e(o.$slots, "default", {}, () => [
        We(O(l.value), 1)
      ], !0)
    ], 8, Yo)) : (f(), m("span", Qo, [
      $e(o.$slots, "default", {}, () => [
        We(O(l.value), 1)
      ], !0)
    ]));
  }
}), Xt = /* @__PURE__ */ ue(Zo, [["__scopeId", "data-v-f2501b17"]]), Jo = ["data-dc-active", "aria-pressed", "aria-label"], ei = /* @__PURE__ */ re({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = we();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, l) => (f(), m("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, O(e.pinned ? "★" : "☆"), 9, Jo));
  }
}), ua = /* @__PURE__ */ ue(ei, [["__scopeId", "data-v-ef63d763"]]), ti = ["src"], ni = /* @__PURE__ */ re({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = W(!1);
    return be(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (f(), m("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, ti)) : F("", !0);
  }
}), wn = /* @__PURE__ */ ue(ni, [["__scopeId", "data-v-afaab300"]]), ai = ["data-dc-standing", "title", "aria-label"], si = /* @__PURE__ */ re({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(() => Zn(t.entry.entity, t.entry.row)), s = v(() => Ss(n.query.value.expr, a.value)), l = v(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(o) {
      o.stopPropagation(), n.setExpression(Ms(n.query.value.expr, a.value));
    }
    return (o, i) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, O(s.value === "in" ? "+" : "−"), 9, ai)) : F("", !0);
  }
}), kn = /* @__PURE__ */ ue(si, [["__scopeId", "data-v-4b8d4166"]]), li = ["data-dc-pending", "title", "aria-label"], ri = /* @__PURE__ */ re({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = W(null);
    function l(c) {
      s.value = Be(c).exclude ? "out" : "in";
    }
    function r(c) {
      l(c), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function o() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    De(o);
    function i(c) {
      c.stopPropagation(), n.drill(t.entry.row, null, Be(c));
    }
    return (c, d) => a.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: r,
      onPointermove: l,
      onPointerleave: o,
      onClick: i
    }, " → ", 40, li)) : F("", !0);
  }
}), Yt = /* @__PURE__ */ ue(ri, [["__scopeId", "data-v-9efd42ac"]]), oi = ["checked", "aria-label"], _t = /* @__PURE__ */ re({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = we();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, l) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, oi));
  }
}), ii = { class: "dc-cards" }, ci = { class: "dc-card__top dc-mono" }, ui = { class: "dc-card__lead" }, di = {
  key: 1,
  class: "dc-card__entity"
}, fi = { class: "dc-card__top-right" }, pi = ["onClick"], vi = { class: "dc-card__names" }, hi = { class: "dc-card__primary" }, mi = { class: "dc-card__secondary dc-mono" }, gi = { class: "dc-card__metrics dc-mono" }, _i = {
  key: 0,
  class: "dc-card__date"
}, yi = /* @__PURE__ */ re({
  __name: "CardsView",
  setup(e) {
    const t = we(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), m("div", ii, [
      (f(!0), m(te, null, he(P(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-card"
      }, [
        $("div", ci, [
          $("span", ui, [
            P(t).selectable.value ? (f(), Z(_t, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : F("", !0),
            We(" " + O(r.ordinal) + " ", 1),
            a.value ? (f(), m("span", di, O(r.entityLabel), 1)) : F("", !0)
          ]),
          $("span", fi, [
            r.parts.state ? (f(), Z(Gt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : F("", !0),
            ve(kn, { entry: r }, null, 8, ["entry"]),
            ve(Yt, { entry: r }, null, 8, ["entry"]),
            P(t).pinnable.value ? (f(), Z(ua, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : F("", !0)
          ])
        ]),
        $("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => P(t).activate(r.row, P(Be)(o))
        }, [
          r.parts.image ? (f(), Z(wn, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : F("", !0),
          $("span", vi, [
            $("span", hi, O(r.parts.identity), 1),
            $("span", mi, O(r.parts.reference), 1)
          ])
        ], 8, pi),
        $("div", gi, [
          (f(!0), m(te, null, he(r.parts.metrics.slice(0, 2), (o) => (f(), Z(Xt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: Qe(() => [
              We(O(o.label) + " " + O(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), m("span", _i, O(r.parts.updated), 1)) : F("", !0)
        ])
      ]))), 128))
    ]));
  }
}), qs = /* @__PURE__ */ ue(yi, [["__scopeId", "data-v-28581543"]]), wi = { class: "dc-grid" }, ki = ["onClick"], bi = { class: "dc-tile__scrim" }, $i = { class: "dc-tile__top dc-mono" }, xi = { class: "dc-tile__chip" }, Ci = { class: "dc-tile__caption" }, Si = { class: "dc-tile__secondary dc-truncate" }, Mi = { class: "dc-tile__primary" }, Ei = /* @__PURE__ */ re({
  __name: "GridView",
  setup(e) {
    const t = we(), n = gt();
    return (a, s) => (f(), m("div", wi, [
      (f(!0), m(te, null, he(P(n), (l) => (f(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        $("button", {
          type: "button",
          class: "dc-tile",
          style: Me({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => P(t).activate(l.row, P(Be)(r))
        }, [
          l.parts.image ? (f(), Z(wn, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : F("", !0),
          $("span", bi, [
            $("span", $i, [
              $("span", xi, O(l.ordinal), 1)
            ]),
            $("span", Ci, [
              $("span", Si, O(l.parts.reference), 1),
              $("span", Mi, O(l.parts.identity), 1)
            ])
          ])
        ], 12, ki),
        P(t).selectable.value ? (f(), Z(_t, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : F("", !0)
      ]))), 128))
    ]));
  }
}), Ks = /* @__PURE__ */ ue(Ei, [["__scopeId", "data-v-7df25d40"]]);
function Ga(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function An(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Pi(e) {
  return e > 0 ? e : 1 / 0;
}
function Ai(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const r = [];
  let o = [], i = 0, c = 0;
  for (const d of e) {
    const h = t(d), w = Math.max(h.ratio, Number.EPSILON), k = h.height && h.height > 0 ? Math.max(c, h.height) : c, x = An(k, s), C = Ga(i + w, o.length + 1, a, l);
    if (C > x) {
      o.push(d), i += w, c = k;
      continue;
    }
    const _ = An(c, s), b = o.length ? Ga(i, o.length, a, l) : 1 / 0;
    b <= Pi(c) && b - _ < x - C ? (r.push({ items: o, height: b, filled: !0 }), o = [d], i = w, c = h.height && h.height > 0 ? h.height : 0) : (r.push({ items: [...o, d], height: C, filled: !0 }), o = [], i = 0, c = 0);
  }
  return o.length && r.push({ items: o, height: An(c, s), filled: !1 }), r;
}
const Ti = { class: "dc-images" }, zi = ["title", "aria-label", "onClick"], Li = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Ri = 240, an = 8, Fi = 1, Ni = /* @__PURE__ */ re({
  __name: "ImagesView",
  setup(e) {
    const t = we(), n = gt(), a = za(/* @__PURE__ */ new Map()), s = za(/* @__PURE__ */ new Set());
    function l(x, C) {
      const _ = C.target;
      _.naturalWidth > 0 && _.naturalHeight > 0 && a.set(x, { width: _.naturalWidth, height: _.naturalHeight });
    }
    function r(x) {
      const C = x.parts.image;
      return C && !s.has(C) ? C : null;
    }
    function o(x) {
      const C = r(x);
      return C ? a.get(C) : void 0;
    }
    function i(x) {
      const C = o(x);
      return C ? { ratio: C.width / C.height, height: C.height } : { ratio: Fi };
    }
    const c = W(null), d = W(0);
    let h = null;
    function w() {
      d.value = c.value?.clientWidth ?? 0;
    }
    os(() => {
      w(), !(!c.value || typeof ResizeObserver > "u") && (h = new ResizeObserver(w), h.observe(c.value));
    }), De(() => {
      h?.disconnect(), h = null;
    });
    const k = v(() => {
      const x = Ai(n.value, i, {
        width: d.value,
        height: Ri,
        gap: an
      }), C = [];
      let _ = 0;
      for (const b of x) {
        let L = 0;
        for (const z of b.items) {
          const E = i(z).ratio * b.height, R = o(z), K = R !== void 0 && R.height < b.height;
          C.push({
            entry: z,
            style: {
              top: `${_}px`,
              left: `${L}px`,
              width: `${E}px`,
              height: `${b.height}px`
            },
            picture: K ? { width: `${R.width}px`, height: `${R.height}px` } : { width: "100%", height: "100%" }
          }), L += E + an;
        }
        _ += b.height + an;
      }
      return { boxes: C, height: x.length ? _ - an : 0 };
    });
    return (x, C) => (f(), m("div", Ti, [
      $("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Me({ height: `${k.value.height}px` })
      }, [
        (f(!0), m(te, null, he(k.value.boxes, ({ entry: _, style: b, picture: L }) => (f(), m("div", {
          key: _.key,
          class: "dc-images__cell",
          style: Me(b)
        }, [
          $("button", {
            type: "button",
            class: "dc-images__open",
            title: _.parts.identity,
            "aria-label": _.parts.identity,
            onClick: (z) => P(t).activate(_.row, P(Be)(z))
          }, [
            r(_) ? (f(), Z(wn, {
              key: 0,
              class: "dc-images__picture",
              style: Me(L),
              src: r(_),
              onLoad: (z) => l(r(_), z),
              onError: (z) => s.add(r(_))
            }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), m("span", Li, O(_.parts.identity), 1))
          ], 8, zi),
          P(t).selectable.value ? (f(), Z(_t, {
            key: 0,
            class: "dc-images__tick",
            row: _.row,
            selected: _.selected,
            name: _.parts.identity
          }, null, 8, ["row", "selected", "name"])) : F("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Vs = /* @__PURE__ */ ue(Ni, [["__scopeId", "data-v-f708d83f"]]), Ii = { class: "dc-links" }, Oi = ["onClick"], Di = { class: "dc-link__primary dc-truncate" }, Bi = { class: "dc-link__secondary dc-mono dc-truncate" }, qi = /* @__PURE__ */ re({
  __name: "LinksView",
  setup(e) {
    const t = we(), n = gt();
    return (a, s) => (f(), m("div", Ii, [
      (f(!0), m(te, null, he(P(n), (l) => (f(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (f(), Z(_t, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : F("", !0),
        $("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => P(t).activate(l.row, P(Be)(r))
        }, [
          $("span", Di, O(l.parts.identity), 1),
          $("span", Bi, O(l.parts.reference), 1)
        ], 8, Oi)
      ]))), 128))
    ]));
  }
}), Ws = /* @__PURE__ */ ue(qi, [["__scopeId", "data-v-08d0266c"]]), Ki = {
  class: "dc-list",
  role: "list"
}, Vi = ["onClick"], Wi = { class: "dc-list__ordinal dc-mono" }, Hi = { class: "dc-list__identity" }, Ui = { class: "dc-list__primary dc-truncate" }, ji = { class: "dc-list__secondary dc-mono dc-truncate" }, Gi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Xi = { class: "dc-list__metrics dc-mono" }, Yi = { class: "dc-list__trailing" }, Qi = /* @__PURE__ */ re({
  __name: "ListView",
  setup(e) {
    const t = we(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), m("div", Ki, [
      (f(!0), m(te, null, he(P(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (f(), Z(_t, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : F("", !0),
        $("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => P(t).activate(r.row, P(Be)(o))
        }, [
          $("span", Wi, O(r.ordinal), 1),
          $("span", Hi, [
            $("span", Ui, O(r.parts.identity), 1),
            $("span", ji, O(r.parts.reference), 1)
          ])
        ], 8, Vi),
        a.value ? (f(), m("span", Gi, O(r.entityLabel), 1)) : F("", !0),
        $("span", Xi, [
          (f(!0), m(te, null, he(r.parts.metrics.slice(0, 2), (o) => (f(), Z(Xt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        $("span", Yi, [
          r.parts.state ? (f(), Z(Gt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : F("", !0),
          ve(kn, { entry: r }, null, 8, ["entry"]),
          ve(Yt, { entry: r }, null, 8, ["entry"]),
          P(t).pinnable.value ? (f(), Z(ua, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : F("", !0)
        ])
      ]))), 128))
    ]));
  }
}), In = /* @__PURE__ */ ue(Qi, [["__scopeId", "data-v-11b9f46c"]]), Zi = { class: "dc-preview" }, Ji = { class: "dc-preview__pager dc-mono" }, ec = ["disabled"], tc = { "aria-live": "polite" }, nc = ["disabled"], ac = {
  key: 0,
  class: "dc-preview__card"
}, sc = ["src"], lc = { class: "dc-preview__body" }, rc = { class: "dc-preview__top" }, oc = { class: "dc-preview__badges" }, ic = { class: "dc-preview__entity dc-mono" }, cc = { class: "dc-preview__marks" }, uc = { class: "dc-preview__primary" }, dc = { class: "dc-preview__secondary dc-mono" }, fc = { class: "dc-preview__fields" }, pc = { class: "dc-preview__key" }, vc = { class: "dc-preview__value dc-mono" }, hc = /* @__PURE__ */ re({
  __name: "PreviewView",
  setup(e) {
    const t = we(), n = gt(), a = W(0);
    be(n, (i) => {
      a.value > i.length - 1 && (a.value = Math.max(0, i.length - 1));
    });
    const s = v(() => n.value[a.value]), l = v(() => {
      const i = s.value;
      if (!i) return [];
      const c = Ve(i.columns, "reference"), d = Ve(i.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((h) => ({
          key: h.label,
          value: h.text,
          column: h.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), r = v(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${i}`;
    }), o = (i) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + i)));
    };
    return (i, c) => (f(), m("div", Zi, [
      $("div", Ji, [
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => o(-1))
        }, " ‹ ", 8, ec),
        $("span", tc, O(r.value), 1),
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= P(n).length - 1,
          onClick: c[1] || (c[1] = (d) => o(1))
        }, " › ", 8, nc)
      ]),
      s.value ? (f(), m("div", ac, [
        $("div", {
          class: "dc-preview__media",
          style: Me({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), m("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, sc)) : (f(), m(te, { key: 1 }, [
            We(" preview ")
          ], 64))
        ], 4),
        $("div", lc, [
          $("div", rc, [
            $("span", oc, [
              P(t).selectable.value ? (f(), Z(_t, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : F("", !0),
              s.value.parts.state ? (f(), Z(Gt, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : F("", !0),
              $("span", ic, O(s.value.entityLabel), 1)
            ]),
            $("span", cc, [
              ve(kn, { entry: s.value }, null, 8, ["entry"]),
              ve(Yt, { entry: s.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (f(), Z(ua, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : F("", !0)
            ])
          ]),
          $("div", null, [
            $("div", uc, O(s.value.parts.identity), 1),
            $("div", dc, O(s.value.parts.reference), 1)
          ]),
          $("dl", fc, [
            (f(!0), m(te, null, he(l.value, (d) => (f(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              $("dt", pc, O(d.key), 1),
              $("dd", vc, [
                d.column && s.value ? (f(), Z(Xt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), m(te, { key: 1 }, [
                  We(O(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          $("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: c[2] || (c[2] = (d) => P(t).activate(s.value.row, P(Be)(d)))
          }, " Open record → ")
        ])
      ])) : F("", !0)
    ]));
  }
}), Hs = /* @__PURE__ */ ue(hc, [["__scopeId", "data-v-6be41155"]]);
function mc() {
  const e = we();
  return v(() => Kl(e.schema.value, e.entity.value));
}
const gc = ["title"], _c = {
  key: 5,
  class: "dc-cell__text"
}, yc = /* @__PURE__ */ re({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(() => t.column.kind ?? "text"), s = v(() => Oe(t.column, t.entry.row)), l = v(
      () => a.value === "ordinal" ? t.entry.ordinal : Ut(t.column, t.entry.row)
    ), r = v(() => s.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => Fn(t.column)), c = v(() => ws(t.column, t.entry.row));
    function d(h) {
      if (!o.value) return;
      h.stopPropagation();
      const w = Be(h);
      t.column.click?.(t.entry.row, w), t.column.activate && n.activate(t.entry.row, w);
    }
    return (h, w) => a.value === "component" && e.column.component ? (f(), Z(Hn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), Z(Gt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), Z(wn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Me({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), Z(Xt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), m("button", {
      key: 4,
      type: "button",
      class: Pt(["dc-table__open", { "dc-truncate": i.value }]),
      title: c.value,
      onClick: d
    }, O(l.value), 11, gc)) : (f(), m("span", _c, O(l.value), 1));
  }
}), Xa = /* @__PURE__ */ ue(yc, [["__scopeId", "data-v-70ba8aa2"]]), wc = ["aria-label"], kc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], bc = /* @__PURE__ */ re({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = v(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), l = (o) => !n.mixed && n.standing === o;
    function r(o, i) {
      o.stopPropagation(), a("set", i);
    }
    return (o, i) => (f(), m("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (f(!0), m(te, null, he(s.value, (c) => (f(), m("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": l(c.standing) ? "true" : "false",
        "aria-checked": l(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => r(d, c.standing)
      }, O(c.sign), 9, kc))), 128))
    ], 8, wc));
  }
}), Ya = /* @__PURE__ */ ue(bc, [["__scopeId", "data-v-adaa8412"]]), $c = {
  key: 0,
  class: "dc-table__none"
}, xc = { class: "dc-table__detail" }, Cc = ["data-dc-wrap"], Sc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Mc = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Ec = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Pc = ["onClick"], Ac = {
  key: 2,
  class: "dc-table__head"
}, Tc = ["onClick"], zc = {
  key: 0,
  class: "dc-table__pick"
}, Lc = {
  key: 1,
  class: "dc-table__standing"
}, Rc = ["data-dc-align", "data-dc-hide", "title"], Fc = {
  key: 0,
  class: "dc-table__name"
}, Nc = /* @__PURE__ */ re({
  __name: "TableView",
  setup(e) {
    const t = we(), n = gt(), a = mc(), s = v(
      () => a.value.find((y) => y.scope)
    ), l = v(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((y) => y.scope)
    ), r = (y) => Zn(y.entity, y.row), o = (y) => Ss(t.query.value.expr, r(y));
    function i(y, A) {
      t.setExpression(Wa(t.query.value.expr, r(y), A));
    }
    const c = v(() => {
      const y = n.value.filter((N) => r(N) !== null), A = y.filter((N) => N.selected);
      return A.length ? A : y;
    }), d = v(() => c.value.some((y) => y.selected)), h = v(() => {
      const y = c.value[0];
      return y ? o(y) : null;
    }), w = v(
      () => c.value.some((y) => o(y) !== h.value)
    ), k = v(
      () => d.value ? "the ticked rows" : "every row on this page"
    );
    function x(y) {
      t.setExpression(
        c.value.reduce(
          (A, N) => Wa(A, r(N), y),
          t.query.value.expr
        )
      );
    }
    const C = v(
      () => a.value.some((y) => y.kind === "image" || y.height !== void 0)
    );
    function _(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const b = v(() => t.entity.value?.label ?? "The result set"), L = v(() => new Set(t.sorts.value.map((y) => y.key))), z = (y) => y.sort !== void 0 && L.value.has(y.sort), E = (y) => {
      if (z(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function R(y) {
      return [
        Na(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        Fn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function K(y, A) {
      if (!(!Fn(y) || y.activate || y.click))
        return ws(y, A.row);
    }
    return (y, A) => P(a).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": C.value ? "" : void 0
    }, [
      $("thead", null, [
        $("tr", null, [
          P(t).selectable.value ? (f(), m("th", Sc, [
            ve(Os)
          ])) : F("", !0),
          l.value ? (f(), m("th", Mc, [
            c.value.length ? (f(), Z(Ya, {
              key: 0,
              standing: h.value,
              mixed: w.value,
              name: k.value,
              onSet: x
            }, null, 8, ["standing", "mixed", "name"])) : F("", !0)
          ])) : F("", !0),
          (f(!0), m(te, null, he(P(a), (N, V) => (f(), m("th", {
            key: P(Ra)(N, V),
            scope: "col",
            class: Pt(P(Na)(N)),
            style: Me({ width: N.width }),
            "data-dc-align": P(Fa)(N),
            "data-dc-hide": N.hideBelow,
            "aria-sort": E(N),
            title: N.hint
          }, [
            z(N) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (oe) => _(N.sort)
            }, O(N.label), 9, Pc)) : (f(), m(te, { key: 1 }, [
              We(O(N.label), 1)
            ], 64)),
            N.header ? (f(), m("span", Ac, [
              (f(), Z(Hn(N.header), {
                column: N,
                entity: P(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : F("", !0)
          ], 14, Ec))), 128))
        ])
      ]),
      $("tbody", null, [
        (f(!0), m(te, null, he(P(n), (N) => (f(), m("tr", {
          key: N.key,
          class: "dc-table__row",
          onClick: (V) => P(t).activate(N.row, P(Be)(V))
        }, [
          P(t).selectable.value ? (f(), m("td", zc, [
            ve(_t, {
              row: N.row,
              selected: N.selected,
              name: N.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : F("", !0),
          l.value ? (f(), m("td", Lc, [
            r(N) !== null ? (f(), Z(Ya, {
              key: 0,
              standing: o(N),
              name: N.parts.identity,
              onSet: (V) => i(N, V)
            }, null, 8, ["standing", "name", "onSet"])) : F("", !0)
          ])) : F("", !0),
          (f(!0), m(te, null, he(P(a), (V, oe) => (f(), m("td", {
            key: P(Ra)(V, oe),
            class: Pt(R(V)),
            "data-dc-align": P(Fa)(V),
            "data-dc-hide": V.hideBelow,
            title: K(V, N)
          }, [
            V === s.value ? (f(), m("span", Fc, [
              ve(Xa, {
                column: V,
                entry: N
              }, null, 8, ["column", "entry"]),
              ve(Yt, { entry: N }, null, 8, ["entry"])
            ])) : (f(), Z(Xa, {
              key: 1,
              column: V,
              entry: N
            }, null, 8, ["column", "entry"]))
          ], 10, Rc))), 128))
        ], 8, Tc))), 128))
      ])
    ], 8, Cc)) : (f(), m("p", $c, [
      A[2] || (A[2] = $("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      $("span", xc, [
        We(O(b.value) + " has no ", 1),
        A[0] || (A[0] = $("code", null, "columns", -1)),
        A[1] || (A[1] = We(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Us = /* @__PURE__ */ ue(Nc, [["__scopeId", "data-v-c8a96457"]]);
function Ic(e) {
  const t = Et([]), n = W(!1), a = Et(null);
  let s = 0;
  const l = (i, c, d, h, w) => ({
    entity: i,
    rows: c.rows.map(
      (k, x) => Bs(k, x, i, e.isPinned(k.id))
    ),
    total: c.total,
    count: d ? i.count : String(c.total),
    pinned: Oc(h, c, w)
  }), r = () => {
    const i = ++s, c = e.query.value, d = e.schema.value, h = e.entities.value, w = e.limit.value, k = e.within?.value.trim() ?? "", x = Gn(c) && !k, C = k ? Qn(k, c.expr) : c.expr, _ = h.map((b) => ({
      entity: b,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: b.key, expr: C, facets: At(b), page: 1 },
        schema: d,
        entity: b,
        limit: w,
        offset: 0
      })
    }));
    if (_.every(({ outcome: b }) => !(b instanceof Promise))) {
      t.value = _.map(
        ({ entity: b, outcome: L }) => l(b, L, x, d, C)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(_.map(({ outcome: b }) => Promise.resolve(b))).then((b) => {
      i === s && (t.value = b.map(
        (L, z) => l(_[z].entity, L, x, d, C)
      ), a.value = null);
    }).catch((b) => {
      i === s && (a.value = b, t.value = []);
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
  return be(
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
function Oc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Jn(e, a);
  return !!l && ea(s, l) === s;
}
const Dc = ["data-dc-pending"], Bc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, qc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Kc = {
  key: 2,
  class: "dc-types__state"
}, Vc = ["data-dc-empty"], Wc = ["onClick"], Hc = { class: "dc-type__name" }, Uc = { class: "dc-type__count dc-mono" }, jc = { class: "dc-type__sr" }, Gc = {
  key: 0,
  class: "dc-type__empty"
}, Xc = ["onClick"], Yc = { class: "dc-type__identity" }, Qc = { class: "dc-type__primary dc-truncate" }, Zc = { class: "dc-type__secondary dc-mono dc-truncate" }, Jc = { class: "dc-type__trailing dc-mono" }, eu = { class: "dc-type__metric-value" }, tu = { class: "dc-type__metric-label" }, nu = {
  key: 0,
  class: "dc-type__date"
}, au = ["onClick"], su = /* @__PURE__ */ re({
  __name: "TypeCardsView",
  setup(e) {
    const t = we(), { previews: n, pending: a, error: s } = Ic({
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
    return (o, i) => (f(), m("div", {
      class: "dc-types",
      "data-dc-pending": P(a) ? "true" : "false"
    }, [
      $e(o.$slots, "before", {}, void 0, !0),
      P(s) ? (f(), m("p", Bc, " Could not load results: " + O(P(s) instanceof Error ? P(s).message : "the data source failed."), 1)) : !r.value.length && P(a) ? (f(), m("p", qc, " Running query… ")) : r.value.length ? F("", !0) : (f(), m("p", Kc, O(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(te, null, he(r.value, (c) => (f(), m("section", {
        key: c.entity.key,
        class: "dc-type",
        "data-dc-empty": c.rows.length ? "false" : "true"
      }, [
        $("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => P(t).setEntity(c.entity.key)
        }, [
          $("span", Hc, O(c.entity.label), 1),
          $("span", Uc, O(c.count), 1),
          i[0] || (i[0] = $("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          $("span", jc, "Show only " + O(c.entity.label.toLowerCase()), 1)
        ], 8, Wc),
        c.rows.length ? F("", !0) : (f(), m("p", Gc, O(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(te, null, he(c.rows, (d) => (f(), m("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          $("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (h) => P(t).activate(d.row, P(Be)(h))
          }, [
            $("span", Yc, [
              $("span", Qc, O(d.parts.identity), 1),
              $("span", Zc, O(d.parts.reference), 1)
            ])
          ], 8, Xc),
          $("span", Jc, [
            (f(!0), m(te, null, he(d.parts.metrics.slice(0, 1), (h) => (f(), Z(Xt, {
              key: h.column.key ?? h.label,
              class: "dc-type__metric",
              entry: d,
              column: h.column
            }, {
              default: Qe(() => [
                $("span", eu, O(h.text), 1),
                $("span", tu, O(h.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), m("span", nu, O(d.parts.updated), 1)) : F("", !0),
            ve(kn, { entry: d }, null, 8, ["entry"]),
            ve(Yt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        c.entity.create ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => P(t).create(c.entity)
        }, [
          i[1] || (i[1] = $("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + O(c.entity.create), 1)
        ], 8, au)) : F("", !0)
      ], 8, Vc))), 128)),
      $e(o.$slots, "after", {}, void 0, !0)
    ], 8, Dc));
  }
}), js = /* @__PURE__ */ ue(su, [["__scopeId", "data-v-c7b8f990"]]), lu = ["data-dc-pending"], ru = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, ou = { class: "dc-results__detail" }, iu = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, cu = {
  key: 3,
  class: "dc-results__state"
}, uu = { class: "dc-results__detail" }, du = /* @__PURE__ */ re({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = we(), a = Ht(), s = {
      list: In,
      cards: qs,
      grid: Ks,
      images: Vs,
      table: Us,
      links: Ws,
      preview: Hs
    }, l = v(() => Xn(n.query.value)), r = v(() => Un(n.query.value.view, t.views)), o = v(() => s[r.value] ?? In), i = v(() => n.rows.value.length > 0), c = v(() => n.error.value !== null), d = W(null);
    return be(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (h, w) => (f(), m("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), Z(js, { key: 0 }, rn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Qe(() => [
            $e(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Qe(() => [
            $e(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), m("p", ru, [
        w[1] || (w[1] = $("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        $("span", ou, O(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && P(n).pending.value ? (f(), m("p", iu, [...w[2] || (w[2] = [
        $("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), Z(Hn(o.value), { key: 4 })) : (f(), m("div", cu, [
        w[3] || (w[3] = $("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        $("span", uu, O(P(n).summary.value), 1),
        P(n).isPristine.value ? F("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: w[0] || (w[0] = (k) => P(n).clearFilters())
        }, O(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, lu));
  }
}), Gs = /* @__PURE__ */ ue(du, [["__scopeId", "data-v-c131c5c3"]]), fu = ["data-dc-theme"], pu = ["data-dc-width", "data-dc-align"], vu = { class: "dc-shell__panel" }, hu = /* @__PURE__ */ re({
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
    const a = e, s = n, l = It(e, "open"), r = It(e, "pinned"), o = It(e, "selected"), i = Ht(), c = Mt(cs, null), d = a.route || c ? null : Rl(), h = a.route ?? c ?? d;
    De(() => d?.dispose?.());
    const w = v(() => vr({ seed: a.schema.key })), k = v(() => a.source ?? w.value), x = Cr({
      schema: () => a.schema,
      adapter: h,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), C = v(() => a.within?.trim() ?? ""), _ = Sr({
      source: k,
      query: x.query,
      schema: v(() => a.schema),
      entity: x.entity,
      limit: v(() => a.limit),
      within: C
    });
    be(x.query, (S) => s("query-change", S)), be(
      [_.pageCount, _.pending, x.query],
      () => {
        if (_.pending.value) return;
        const S = _.pageCount.value;
        x.query.value.page > S && x.setPage(S, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const b = Wn() ?? "dc-query-panel", L = W(null);
    function z() {
      l.value && (l.value = !1, Kt(() => {
        L.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const E = v(() => new Set(r.value));
    function R(S) {
      const D = new Set(E.value);
      D.has(S.id) ? D.delete(S.id) : D.add(S.id), r.value = [...D], s("toggle-pin", S);
    }
    const K = v(() => {
      if (a.selectable === !0) return !0;
      const S = x.entity.value;
      return !!(S?.duplicate || S?.delete);
    }), y = v(() => new Set(o.value));
    function A(S) {
      const D = new Set(y.value);
      D.has(S.id) ? D.delete(S.id) : D.add(S.id), o.value = [...D];
    }
    function N(S) {
      const D = new Set(y.value);
      for (const j of _.rows.value)
        S ? D.add(j.id) : D.delete(j.id);
      o.value = [...D];
    }
    function V() {
      o.value.length && (o.value = []);
    }
    const oe = v(() => ({
      ids: [...o.value],
      rows: _.rows.value.filter((S) => y.value.has(S.id)),
      entity: x.entity.value
    }));
    be(() => x.query.value.entity, V);
    function X(S, D, j = {}) {
      const se = hr(a.schema, x.query.value, S, j);
      j.exclude ? x.narrow(se, D?.key ?? x.query.value.entity) : x.narrow(se, D?.key ?? null, D ? void 0 : "cards"), s("drill", S, D, j);
    }
    const ge = mr({
      ...x,
      schema: v(() => a.schema),
      entities: v(() => a.schema.entities),
      rows: _.rows,
      total: _.total,
      limit: v(() => a.limit),
      offset: _.offset,
      pageCount: _.pageCount,
      pending: _.pending,
      counting: _.counting,
      error: _.error,
      source: k,
      previewsPerType: v(() => a.previewsPerType),
      within: C,
      pinnable: v(() => a.pinnable === !0),
      isPinned: (S) => E.value.has(S.id),
      isPinnedId: (S) => E.value.has(S),
      togglePin: R,
      selectable: K,
      selection: oe,
      isSelected: (S) => y.value.has(S.id),
      toggleSelect: A,
      selectPage: N,
      clearSelection: V,
      narrowsOnPress: v(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (S, D = {}) => {
        if (a.rowPress === "narrow" && Jn(a.schema, S)) {
          X(S, null, D);
          return;
        }
        s("activate", S);
      },
      create: (S) => s("create", S),
      duplicate: () => s("duplicate", oe.value),
      delete: () => s("delete", oe.value),
      drill: X
    }), ie = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: x.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: z
    }), (S, D) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Me(ie.value)
    }, [
      $("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ve(Fs, {
          ref_key: "headerRef",
          ref: L,
          expanded: l.value,
          "panel-id": P(b),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: D[0] || (D[0] = (j) => l.value = !l.value)
        }, rn({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Qe(() => [
              $e(S.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), m(te, { key: 0 }, [
          $("div", {
            class: "dc-shell__scrim",
            onClick: z
          }),
          $("div", vu, [
            ve(Is, {
              "panel-id": P(b),
              onClose: z
            }, rn({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Qe(() => [
                  $e(S.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : F("", !0)
      ], 8, pu),
      ve(Ds, { views: e.views }, null, 8, ["views"]),
      $e(S.$slots, "results", {
        rows: P(ge).rows.value,
        total: P(ge).total.value,
        offset: P(ge).offset.value,
        pageCount: P(ge).pageCount.value,
        query: P(ge).query.value,
        pending: P(ge).pending.value
      }, () => [
        ve(Gs, { views: e.views }, rn({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: Qe(() => [
              $e(S.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Qe(() => [
              $e(S.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, fu));
  }
}), mu = /* @__PURE__ */ ue(hu, [["__scopeId", "data-v-a366aa47"]]), gu = ["data-dc-muted"], _u = {
  key: 0,
  class: "dc-shell-card__head"
}, yu = { class: "dc-shell-card__title" }, wu = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, ku = {
  key: 0,
  class: "dc-shell-card__aside"
}, bu = ["data-dc-flush"], $u = {
  key: 2,
  class: "dc-shell-card__foot"
}, xu = /* @__PURE__ */ re({
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
      return d.some((h) => h.type === Al ? !1 : h.type === Tl ? String(h.children ?? "").trim().length > 0 : h.type === te ? l(h.children ?? []) : !0);
    }
    const r = v(() => !!t.title || o.value || s(a.head)), o = v(() => s(a.aside)), i = v(() => s(a.default)), c = v(() => s(a.foot));
    return (d, h) => (f(), m("section", {
      class: "dc-shell-card",
      style: Me(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), m("header", _u, [
        $e(d.$slots, "head", {}, () => [
          $("h2", yu, O(e.title), 1),
          e.count !== void 0 ? (f(), m("span", wu, O(e.count), 1)) : F("", !0)
        ], !0),
        o.value ? (f(), m("span", ku, [
          $e(d.$slots, "aside", {}, void 0, !0)
        ])) : F("", !0)
      ])) : F("", !0),
      i.value ? (f(), m("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        $e(d.$slots, "default", {}, void 0, !0)
      ], 8, bu)) : F("", !0),
      c.value ? (f(), m("footer", $u, [
        $e(d.$slots, "foot", {}, void 0, !0)
      ])) : F("", !0)
    ], 12, gu));
  }
}), rf = /* @__PURE__ */ ue(xu, [["__scopeId", "data-v-75f2ef0b"]]), Cu = ["aria-label"], Su = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Mu = /* @__PURE__ */ re({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = W([]);
    function l(r, o) {
      const i = n.options.length;
      let c = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? c = (o + 1) % i : r.key === "ArrowLeft" || r.key === "ArrowUp" ? c = (o - 1 + i) % i : r.key === "Home" ? c = 0 : r.key === "End" && (c = i - 1), c === null) return;
      r.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (r, o) => (f(), m("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), m(te, null, he(e.options, (i, c) => (f(), m("button", {
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
        onKeydown: (d) => l(d, c)
      }, O(i.label), 43, Su))), 128))
    ], 8, Cu));
  }
}), Eu = /* @__PURE__ */ ue(Mu, [["__scopeId", "data-v-63fb5482"]]), Pu = ["data-dc-theme", "aria-label"], Au = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Tu = /* @__PURE__ */ re({
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
    }), s = t, l = W(null), r = W([]), o = W(null), i = W(null), c = W(!1), d = v(
      () => n.menus.flatMap((E, R) => Ot(E) ? [R] : [])
    );
    function h(E, R) {
      const K = r.value[E]?.getBoundingClientRect(), y = n.menus[E];
      !K || !y || !Ot(y) || (i.value = { x: K.left, y: K.bottom + 2, mirrorX: K.right }, o.value = E, c.value = R);
    }
    function w(E) {
      const R = o.value;
      o.value = null, i.value = null, E && R !== null && r.value[R]?.focus();
    }
    function k(E) {
      o.value === E ? w(!0) : h(E, !1);
    }
    function x(E) {
      o.value === null || o.value === E || h(E, !1);
    }
    function C(E, R) {
      const K = d.value;
      if (K.length === 0) return null;
      if (E === null) return R === 1 ? K[0] ?? null : K[K.length - 1] ?? null;
      const y = K.indexOf(E);
      return y === -1 ? K[0] ?? null : K[(y + R + K.length) % K.length] ?? null;
    }
    function _(E) {
      const R = E.key;
      if (R === "Escape") {
        if (o.value === null) return;
        E.preventDefault(), w(!0);
        return;
      }
      if (R === "ArrowDown" && o.value === null) {
        const A = b();
        if (A === null) return;
        E.preventDefault(), h(A, !0);
        return;
      }
      if (R !== "ArrowLeft" && R !== "ArrowRight") return;
      const K = o.value ?? b(), y = C(K, R === "ArrowRight" ? 1 : -1);
      y !== null && (E.preventDefault(), o.value !== null ? h(y, !0) : r.value[y]?.focus());
    }
    function b() {
      const E = r.value.findIndex((R) => R === document.activeElement);
      return E === -1 ? d.value[0] ?? null : E;
    }
    function L(E) {
      const R = E.target;
      !R || l.value?.contains(R) || w(!1);
    }
    be(o, (E) => {
      E !== null ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), De(() => window.removeEventListener("pointerdown", L, !0));
    function z(E) {
      w(!0), E.action?.(), s("choose", E);
    }
    return (E, R) => (f(), m("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Me(a.value),
      onKeydown: _
    }, [
      (f(!0), m(te, null, he(e.menus, (K, y) => (f(), m("button", {
        key: K.id ?? K.label ?? y,
        ref_for: !0,
        ref: (A) => {
          A && (r.value[y] = A);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === y,
        "aria-disabled": K.disabled ? "true" : void 0,
        disabled: K.disabled,
        "data-dc-menu": K.id ?? K.label,
        tabindex: y === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (A) => k(y),
        onMouseenter: (A) => x(y)
      }, O(K.label), 41, Au))), 128)),
      o.value !== null && i.value ? (f(), Z(ca, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: c.value,
        onChoose: z,
        onDismiss: R[0] || (R[0] = (K) => w(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : F("", !0)
    ], 44, Pu));
  }
}), of = /* @__PURE__ */ ue(Tu, [["__scopeId", "data-v-93dbd2e4"]]), zu = ["aria-label", "aria-expanded", "disabled"], Lu = { "aria-hidden": "true" }, Ru = /* @__PURE__ */ re({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = W(null), s = W(null), l = W(null), r = W(!1), o = v(() => l.value !== null);
    function i(x) {
      const C = a.value?.getBoundingClientRect();
      C && (l.value = { x: C.left, y: C.bottom + 4, mirrorX: C.right }, r.value = x);
    }
    function c(x) {
      l.value = null, x && a.value?.focus();
    }
    function d() {
      o.value ? c(!0) : i(!1);
    }
    function h(x) {
      x.key !== "ArrowDown" || o.value || (x.preventDefault(), i(!0));
    }
    function w(x) {
      const C = x.target;
      C && (a.value?.contains(C) || s.value?.root?.contains(C) || c(!1));
    }
    be(o, (x) => {
      x ? window.addEventListener("pointerdown", w, !0) : window.removeEventListener("pointerdown", w, !0);
    }), De(() => window.removeEventListener("pointerdown", w, !0));
    function k(x) {
      c(!0), x.action?.(), n("choose", x);
    }
    return (x, C) => (f(), m(te, null, [
      $("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: h
      }, [
        $("span", Lu, O(e.glyph), 1)
      ], 40, zu),
      l.value ? (f(), Z(ca, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: k,
        onDismiss: C[0] || (C[0] = (_) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : F("", !0)
    ], 64));
  }
}), da = /* @__PURE__ */ ue(Ru, [["__scopeId", "data-v-48f5ada5"]]), zt = (e) => e.kind === "split", G = (e) => e.kind === "group", ne = (e) => e.kind === "float", pt = { x: 16, y: 16, w: 360, h: 260 }, gn = 28, Xs = 120, On = 220, Ys = 38, kt = 6;
function Qt(e, t) {
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
function cf(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const me = (e) => typeof e == "string", fa = (e) => me(e) ? Ze(e) : e, Zt = (e) => me(e) ? [e] : at(e), Qa = (e) => e.panels.filter(me), Fu = (e) => e.panels.filter((t) => !me(t)), Ie = (e, t) => e.panels.includes(t);
function Jt(e, t, n) {
  let a = !1;
  const s = e.panels.map((l) => {
    if (me(l) || !ce(l, t)) return l;
    const r = n(l);
    return r !== l && (a = !0), r;
  });
  return a ? { ...e, panels: s } : e;
}
function bn(e, t) {
  return { node: e, rect: { ...pt, ...t } };
}
function pa(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function va(e, t) {
  const n = { ...pt, ...t };
  return pa(
    e.map(
      (a, s) => bn(a, {
        ...n,
        x: n.x + s * gn,
        y: n.y + s * gn
      })
    )
  );
}
function ha(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const ma = (e, t, n) => ha("row", e, t, n), uf = (e, t, n) => ha("column", e, t, n);
function ke(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const mt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, df = (e) => ({ ...e, headless: !0 }), ff = (e) => ({ ...e, fixedView: !0 }), Nu = (e) => e === "left" || e === "right" ? "row" : "column";
function at(e) {
  return G(e) ? e.panels.flatMap(Zt) : ne(e) ? e.frames.flatMap((t) => at(t.node)) : e.children.flatMap(at);
}
function ce(e, t) {
  return G(e) ? e.panels.some((n) => me(n) ? n === t : ce(n, t)) : ne(e) ? e.frames.some((n) => ce(n.node, t)) : e.children.some((n) => ce(n, t));
}
const Qs = (e) => at(e).length === 0, Dn = (e) => !G(e) && mt(e), Bn = (e) => Qs(e) && !Dn(e);
function $n(e) {
  return zt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ne(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => me(t) ? [] : [{ node: t, index: n }]);
}
const ga = (e) => $n(e).map((t) => t.node);
function yt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => me(a) ? a === t : ce(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Zs(e) {
  const t = e.panels[yt(e)];
  return t !== void 0 && me(t) ? t : "";
}
function Te(e) {
  if (me(e)) return e;
  if (G(e)) {
    const n = e.panels[yt(e)];
    return n === void 0 ? "" : Te(n);
  }
  if (ne(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Te(n.node) : "";
  }
  const t = e.children[0];
  return t ? Te(t) : "";
}
function $t(e, t) {
  if (G(e) && Ie(e, t)) return e;
  for (const n of ga(e)) {
    const a = $t(n, t);
    if (a) return a;
  }
  return null;
}
function Iu(e) {
  const t = ga(e).flatMap(Iu);
  return G(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (G(e)) {
    for (const n of Fu(e)) {
      const a = Se(n, t);
      if (a) return a;
    }
    return null;
  }
  if (ne(e)) {
    for (const n of e.frames)
      if (ce(n.node, t))
        return Se(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Se(n, t);
    if (a) return a;
  }
  return null;
}
function Tn(e, t, n = Xs) {
  const a = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), s = a(e.w, t.w), l = a(e.h, t.h), r = (o, i, c) => Math.min(Math.max(o, 0), Math.max(c - i, 0));
  return {
    x: Math.round(r(e.x, s, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function Za(e, t, n, a, s = Xs) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + a), t.includes("n") && (i = e.h - a, r = e.y + a), o < s && (t.includes("w") && (l = e.x + e.w - s), o = s), i < s && (t.includes("n") && (r = e.y + e.h - s), i = s), { x: l, y: r, w: o, h: i };
}
const Js = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function xt(e, t, n) {
  if (G(e)) return Jt(e, t, (l) => xt(l, t, n));
  if (ne(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!ce(o.node, t)) return o;
      if (Se(o.node, t)) {
        const c = xt(o.node, t, n);
        return c === o.node ? o : (l = !0, { ...o, node: c });
      }
      const i = n(o);
      return i === o ? o : (l = !0, i);
    });
    return l ? { ...e, frames: r } : e;
  }
  if (!ce(e, t)) return e;
  let a = !1;
  const s = e.children.map((l) => {
    const r = xt(l, t, n);
    return r !== l && (a = !0), r;
  });
  return a ? { ...e, children: s } : e;
}
function Ou(e, t, n) {
  return xt(e, t, (a) => Js(a.rect, n) ? a : { ...a, rect: n });
}
const lt = (e) => e.maximized === !0, el = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Du(e, t, n = !0) {
  return xt(e, t, el(n));
}
function pf(e, t) {
  const n = Se(e, t);
  return n ? Du(e, t, !lt(n)) : e;
}
const dt = (e) => e.minimized === !0, tl = (e) => (t) => {
  if (dt(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function Bu(e, t, n = !0) {
  return xt(e, t, tl(n));
}
function vf(e, t) {
  const n = Se(e, t);
  return n ? Bu(e, t, !dt(n)) : e;
}
function ut(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = ot(e, t.slice(0, -1));
  return !a || !ne(a) ? null : a.frames[n] ?? null;
}
function qn(e, t) {
  if (ne(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!ce(a.node, t)) continue;
      const s = qn(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of $n(e)) {
    if (!ce(n, t)) continue;
    const s = qn(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function _a(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), l = ot(e, s);
  if (!l || !ne(l)) return e;
  const r = l.frames[a];
  if (!r) return e;
  const o = n(r);
  if (o === r) return e;
  const i = [...l.frames];
  return i[a] = o, ht(e, s, { ...l, frames: i });
}
function Ja(e, t, n) {
  return _a(
    e,
    t,
    (a) => Js(a.rect, n) ? a : { ...a, rect: n }
  );
}
function qu(e, t, n = !0) {
  return _a(e, t, el(n));
}
function Ku(e, t, n = !0) {
  return _a(e, t, tl(n));
}
function Dt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (ne(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const o = Dt(r.node, a), i = o === r.node ? r : { ...r, node: o };
    if (n === e.frames.length - 1 && i === r) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(i), { ...e, frames: c };
  }
  const s = ot(e, [n]);
  if (!s) return e;
  const l = Dt(s, a);
  return l === s ? e : ht(e, [n], l);
}
function Vu(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (ne(a) && (n[l] = a.frames.length - 1), a = ot(a, [s]));
  }), n;
}
function un(e, t, n, a) {
  if (G(e)) return Jt(e, n, (r) => un(r, t, n, a));
  if (ne(e)) {
    const r = e.frames.findIndex((i) => ce(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if (Se(o.node, n)) {
      const i = un(o.node, t, n, a);
      if (i === o.node) return e;
      const c = [...e.frames];
      return c[r] = { ...o, node: i }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, bn(Ze(t), a)] };
  }
  if (!ce(e, n)) return e;
  let s = !1;
  const l = e.children.map((r) => {
    const o = un(r, t, n, a);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: l } : e;
}
function es(e, t, n, a) {
  if (t === n || !ce(e, t) || !ce(e, n) || !Se(e, n)) return e;
  const s = vt(e, t);
  if (!s) return e;
  const l = un(s, t, n, a);
  return l === s ? e : xe(l);
}
function Wu(e, t, n) {
  return ne(e) ? { ...e, frames: [...e.frames, bn(Ze(t), n)] } : G(e) ? al(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ze(t)],
    sizes: [...nt(e), 1],
    ...ke(e)
  };
}
function nl(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Wu(e, t, a);
  const l = n.slice(1), r = (d, h) => h === s ? nl(d, t, l, a) : vt(d, t);
  if (ne(e)) {
    const d = e.frames.flatMap((h, w) => {
      const k = r(h.node, w);
      return k ? [k === h.node ? h : { ...h, node: k }] : [];
    });
    return { ...e, frames: d };
  }
  if (G(e)) {
    const d = yt(e), h = [];
    e.panels.forEach((x, C) => {
      if (me(x)) {
        x !== t && h.push(x);
        return;
      }
      const _ = r(x, C);
      _ && h.push(_);
    });
    const k = e.active && h.some((x) => Zt(x).includes(e.active)) ? e.active : Te(h[d] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...k ? { active: k } : {},
      ...ke(e)
    };
  }
  const o = nt(e), i = [], c = [];
  return e.children.forEach((d, h) => {
    const w = r(d, h);
    w && (i.push(w), c.push(o[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: c, ...ke(e) };
}
function ts(e, t, n, a) {
  const s = ot(e, n);
  return !s || !Qs(s) || !ce(e, t) ? e : xe(nl(e, t, n, a));
}
function zn(e, t) {
  if (G(e)) return Jt(e, t, (s) => zn(s, t));
  if (ne(e)) {
    const s = e.frames.findIndex((c) => ce(c.node, t)), l = e.frames[s];
    if (!l) return e;
    const r = zn(l.node, t), o = r === l.node ? l : { ...l, node: r };
    if (s === e.frames.length - 1 && o === l) return e;
    const i = [...e.frames];
    return i.splice(s, 1), i.push(o), { ...e, frames: i };
  }
  if (!ce(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = zn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function ya(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), s = a.reduce((l, r) => l + r, 0);
  return s <= 0 ? n() : a.map((l) => l / s);
}
const nt = (e) => ya(e.children.length, e.sizes), He = (e) => {
  const t = G(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function xe(e) {
  if (G(e)) return Hu(e);
  if (ne(e)) {
    const o = e.frames.flatMap((i) => {
      const c = xe(i.node);
      return Bn(c) ? [] : [c === i.node ? i : { ...i, node: c }];
    });
    return o.length === e.frames.length && o.every((i, c) => i === e.frames[c]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = nt(e), n = He(e), a = [], s = [], l = [];
  e.children.forEach((o, i) => {
    const c = xe(o), d = t[i] ?? 0;
    if (Bn(c)) return;
    if (!n && zt(c) && c.direction === e.direction && !He(c) && !mt(c)) {
      const w = nt(c);
      c.children.forEach((k, x) => {
        a.push(k), s.push(d * (w[x] ?? 0));
      });
      return;
    }
    a.push(c), s.push(d);
    const h = n?.[i];
    h && l.push(h);
  });
  const r = a[0];
  return a.length === 1 && r && !mt(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: ya(a.length, s),
    ...ke(e),
    ...l.length === a.length && l.length > 0 ? { places: l } : {}
  };
}
function Hu(e) {
  if (e.panels.every(me)) return e;
  const t = Te(e), n = He(e), a = [], s = [];
  e.panels.forEach((o, i) => {
    const c = n?.[i];
    if (me(o)) {
      a.push(o), c && s.push(c);
      return;
    }
    const d = xe(o);
    if (!Bn(d)) {
      if (G(d) && !mt(d) && !He(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), c && s.push(c);
    }
  });
  const l = a[0];
  if (a.length === 1 && l !== void 0 && !me(l) && !mt(e))
    return l;
  if (a.length === e.panels.length && a.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && a.some((o) => Zt(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...r ? { active: r } : {},
    ...ke(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function vt(e, t) {
  if (ne(e)) {
    const r = e.frames.flatMap((o) => {
      const i = vt(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !Dn(e) ? null : { ...e, frames: r };
  }
  if (G(e)) {
    if (!ce(e, t)) return e;
    const r = yt(e), o = [];
    for (const d of e.panels) {
      if (me(d)) {
        d !== t && o.push(d);
        continue;
      }
      const h = vt(d, t);
      h && o.push(h);
    }
    if (o.length === 0) return null;
    const c = e.active && o.some((d) => Zt(d).includes(e.active)) ? e.active : Te(o[r] ?? o[o.length - 1]);
    return c ? { kind: "group", panels: o, active: c, ...ke(e) } : { kind: "group", panels: o, ...ke(e) };
  }
  const n = nt(e), a = [], s = [];
  if (e.children.forEach((r, o) => {
    const i = vt(r, t);
    i && (a.push(i), s.push(n[o] ?? 0));
  }), a.length === 0)
    return Dn(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...ke(e) } : null;
  const l = a[0];
  return a.length === 1 && l && !mt(e) ? l : xe({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...ke(e)
  });
}
function al(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...ke(e) };
}
function Nt(e, t, n, a, s) {
  const l = (k) => Qt(
    k,
    (x) => ce(x, n) ? Nt(x, t, n, a, s) : x
  );
  if (a === "float") return e;
  const r = (k) => Jt(k, n, (x) => Nt(x, t, n, a, s));
  if (a === "center")
    return G(e) ? Ie(e, n) ? al(e, t, s) : r(e) : ne(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (k) => ce(k, n) ? Nt(k, t, n, a, s) : k
      )
    };
  const o = Nu(a), i = a === "left" || a === "top", c = (k) => ({
    kind: "split",
    direction: o,
    children: i ? [Ze(t), k] : [k, Ze(t)],
    sizes: [0.5, 0.5]
  });
  if (G(e)) return Ie(e, n) ? c(e) : r(e);
  if (ne(e)) return l(e);
  const d = nt(e), h = e.children.findIndex(
    (k) => G(k) && Ie(k, n)
  );
  if (h >= 0 && e.direction === o) {
    const k = (d[h] ?? 0) / 2, x = [...e.children], C = [...d];
    return x.splice(i ? h : h + 1, 0, Ze(t)), C.splice(h, 1, k, k), {
      kind: "split",
      direction: o,
      children: x,
      sizes: C,
      ...ke(e)
    };
  }
  const w = e.children.map((k) => ce(k, n) ? G(k) && Ie(k, n) ? c(k) : Nt(k, t, n, a) : k);
  return {
    kind: "split",
    direction: e.direction,
    children: w,
    sizes: d,
    ...ke(e)
  };
}
function Ct(e, t) {
  if (G(e)) {
    if (Ie(e, t))
      return Zs(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((i) => !me(i) && ce(i, t)), l = e.panels[s];
    if (l === void 0 || me(l)) return e;
    const r = Ct(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[s] = r, { ...e, panels: o, active: t };
  }
  if (!ce(e, t)) return e;
  if (ne(e)) return Qt(e, (s) => Ct(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const l = Ct(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Bt(e, t, n) {
  if (G(e)) {
    if (!Ie(e, t)) return Jt(e, t, (c) => Bt(c, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const l = [...e.panels];
    l.splice(a, 1), l.splice(s, 0, t);
    const r = He(e), o = r ? [...r] : void 0;
    o && o.splice(s, 0, ...o.splice(a, 1));
    const i = Te(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ...ke(e),
      ...o ? { places: o } : {}
    };
  }
  return ce(e, t) ? ne(e) ? Qt(e, (a) => Bt(a, t, n)) : { ...e, children: e.children.map((a) => Bt(a, t, n)) } : e;
}
function dn(e, t, n) {
  if (t === n) return e;
  if (G(e)) {
    if (!ce(e, t) && !ce(e, n)) return e;
    const a = (l) => l === t ? n : l === n ? t : l, s = e.panels.map((l) => me(l) ? a(l) : dn(l, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return ne(e) ? Qt(e, (a) => dn(a, t, n)) : { ...e, children: e.children.map((a) => dn(a, t, n)) };
}
function sn(e, t, n, a, s) {
  if (a === "float" || !ce(e, t) || !ce(e, n)) return e;
  const l = $t(e, t);
  if (a === "center" && l && Ie(l, n)) {
    if (s === void 0) return e;
    const o = l.panels.indexOf(t), i = s > o ? s - 1 : s;
    return i === o ? e : Ct(Bt(e, t, i), t);
  }
  if (t === n) return e;
  const r = vt(e, t);
  return r ? xe(Nt(r, t, n, a, s)) : e;
}
function sl(e, t, n) {
  if (G(e)) {
    const s = e.panels[t];
    if (s === void 0 || me(s)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (ne(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const l = [...e.frames];
    return l[t] = { ...s, node: n }, { ...e, frames: l };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function en(e, t, n) {
  const a = $n(e);
  if (!G(e) && a.some(({ node: s }) => G(s) && Ie(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: l } of a) {
    if (!ce(s, t)) continue;
    const r = en(s, t, n);
    return r ? sl(e, l, r) : null;
  }
  return null;
}
function hf(e, t, n) {
  const a = en(
    e,
    t,
    (s) => zt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? xe(a) : e;
}
function ll(e) {
  return ne(e) ? [e] : He(e) || mt(e) ? [e] : G(e) ? [...e.panels] : e.children.flatMap(ll);
}
function rl(e, t) {
  if (G(e)) return e;
  const n = ga(e).map(ll), a = n.flat(), s = t && a.some((r) => Zt(r).includes(t)) ? t : void 0, l = Uu(e, n);
  return xe({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...ke(e),
    ...l ? { places: l } : {}
  });
}
function Uu(e, t) {
  const n = ne(e) ? e.frames.map(({ node: a, ...s }) => s) : He(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function ju(e, t) {
  const n = en(e, t, (a) => rl(a, t));
  return n ? xe(n) : e;
}
function wa(e, t, n) {
  if (G(e) && Ie(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of $n(e)) {
    if (!ce(a, t)) continue;
    const l = wa(a, t, n);
    return l ? sl(e, s, l) : null;
  }
  return null;
}
function ns(e, t, n) {
  const a = wa(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const l = He(s);
    return {
      ...ha(n, s.panels.map(fa)),
      ...ke(s),
      ...l ? { places: l } : {}
    };
  });
  return a ? xe(a) : e;
}
function Kn(e, t) {
  if (G(e)) return e;
  if (ne(e)) {
    const s = e.frames.findIndex(
      (o) => G(o.node) && o.node.panels.includes(t)
    ), l = e.frames[s], r = l && G(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const o = va(r.panels.map(fa), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...o, ...e.frames.slice(s + 1)]
      };
    }
    return Qt(e, (o) => Kn(o, t));
  }
  if (!ce(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = Kn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Gu(e, t, n) {
  const a = $t(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const r = Kn(e, t);
    return r === e ? e : xe(r);
  }
  const l = wa(e, t, (r) => ({
    ...pa(ol(r.panels.map(fa), He(r), n)),
    ...ke(r)
  }));
  return l ? xe(l) : e;
}
function ol(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : va(e, n).frames;
}
function il(e, t) {
  return { ...pa(ol(e.children, He(e), t)), ...ke(e) };
}
function mf(e, t, n) {
  const a = en(
    e,
    t,
    (s) => ne(s) ? s : il(s, n)
  );
  return a ? xe(a) : G(e) && Ie(e, t) ? va([e], n) : e;
}
function Xu(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function cl(e, t) {
  const n = Xu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...ke(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function gf(e, t, n = "row") {
  const a = en(
    e,
    t,
    (s) => ne(s) ? cl(s, n) : s
  );
  return a ? xe(a) : e;
}
function ul(e) {
  if (ne(e)) return null;
  const t = G(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || me(t) || G(t) && t.panels.length === 1 && me(t.panels[0]) ? null : t;
}
const Yu = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Qu(e, t) {
  const n = ul(e);
  return n ? t === "inner" ? n : { ...Yu(n), ...ke(e) } : e;
}
function Tt(e) {
  return e.title ? e.title : G(e) ? "" : ne(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function qt(e, t) {
  if (G(e)) {
    const a = e.panels[yt(e)];
    return a === void 0 ? "" : me(a) ? t(a) ?? a : Tt(a) || qt(a, t);
  }
  if (e.title) return e.title;
  if (ne(e)) {
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
    if (zt(n)) n = n.children[a];
    else if (ne(n)) n = n.frames[a]?.node;
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
  if (ne(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const c = ht(i.node, s, n);
    if (c === i.node) return e;
    const d = [...e.frames];
    return d[a] = { ...i, node: c }, { ...e, frames: d };
  }
  if (G(e)) {
    const i = e.panels[a];
    if (i === void 0 || me(i)) return e;
    const c = ht(i, s, n);
    if (c === i) return e;
    const d = [...e.panels];
    return d[a] = c, { ...e, panels: d };
  }
  const l = e.children[a];
  if (!l) return e;
  const r = ht(l, s, n);
  if (r === l) return e;
  const o = [...e.children];
  return o[a] = r, { ...e, children: o };
}
function fn(e, t, n) {
  if (t.length === 0)
    return zt(e) ? { ...e, sizes: ya(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ne(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const i = fn(o.node, s, n);
    if (i === o.node) return e;
    const c = [...e.frames];
    return c[a] = { ...o, node: i }, { ...e, frames: c };
  }
  if (G(e)) {
    const o = e.panels[a];
    if (o === void 0 || me(o)) return e;
    const i = fn(o, s, n);
    if (i === o) return e;
    const c = [...e.panels];
    return c[a] = i, { ...e, panels: c };
  }
  const l = e.children[a];
  if (!l) return e;
  const r = [...e.children];
  return r[a] = fn(l, s, n), { ...e, children: r };
}
function as(e, t, n, a = 0.02) {
  const s = e[t], l = e[t + 1];
  if (s === void 0 || l === void 0) return e;
  const r = s + l;
  if (r < a * 2) return e;
  const o = [...e], i = Math.min(Math.max(s + n, a), r - a);
  return o[t] = i, o[t + 1] = r - i, o;
}
function _n(e) {
  if (!G(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !me(t) ? e : { ...ma([Zu(e)]), ...ke(e) };
}
const Zu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ss(e) {
  return e.length === 0 ? null : ma(e.map(Ze));
}
function Ju(e, t) {
  if (!e) return ss(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const i of at(e))
    !n.has(i) || a.has(i) ? s.add(i) : a.add(i);
  let l = e;
  for (const i of s)
    l = l ? vt(l, i) : null;
  const r = new Set(l ? at(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? _n(xe(l)) : null;
  if (!l) return ss(o);
  if (ne(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (c, d) => bn(Ze(c), {
            x: pt.x + (i + d) * gn,
            y: pt.y + (i + d) * gn
          })
        )
      ]
    };
  }
  return _n(xe(ma([l, ...o.map(Ze)])));
}
const ka = Symbol("dc.windowContext");
function ed(e) {
  return Vn(ka, e), e;
}
function ba() {
  const e = Mt(ka, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const td = ["data-dc-glyph"], nd = { class: "dc-glyph__line" }, ad = ["d"], sd = {
  key: 0,
  class: "dc-glyph__aqua"
}, ld = ["d"], rd = /* @__PURE__ */ re({
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
    return (a, s) => (f(), m("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      $("g", nd, [
        (f(!0), m(te, null, he(t[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, ad))), 128))
      ]),
      n[e.kind] ? (f(), m("g", sd, [
        (f(!0), m(te, null, he(n[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, ld))), 128))
      ])) : F("", !0)
    ], 8, td));
  }
}), St = /* @__PURE__ */ ue(rd, [["__scopeId", "data-v-4d2872c0"]]), od = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], id = ["data-dc-movable"], cd = { class: "dc-float__title dc-truncate" }, ud = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, dd = ["aria-label", "aria-pressed", "data-dc-minimize"], fd = ["aria-label", "aria-pressed", "data-dc-maximize"], pd = ["aria-label", "data-dc-close"], vd = { class: "dc-float__content" }, hd = ["data-dc-handle", "onPointerdown"], md = /* @__PURE__ */ re({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ba(), a = v(() => Te(t.frame.node)), s = v(() => n.panelFor(a.value)?.fixed === !0), l = v(() => lt(t.frame)), r = v(() => dt(t.frame)), o = v(() => l.value || r.value), i = v(() => n.resizable.value && !s.value && !o.value), c = v(() => n.movable.value && !s.value && !o.value), d = v(() => {
      const R = at(t.frame.node);
      return R.length === 1 ? R[0] ?? null : null;
    }), h = v(() => d.value !== null && n.closable(d.value)), w = v(() => t.frame.node.headless === !0), k = v(
      () => !w.value && (!G(t.frame.node) || r.value)
    ), x = v(
      () => t.frame.title || Tt(t.frame.node) || qt(t.frame.node, (R) => n.panelFor(R)?.title)
    ), C = v(() => n.spaceMenu(t.path));
    function _(R) {
      R.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, R, "move");
    }
    function b(R) {
      R.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const L = v(() => {
      const R = n.framing.value;
      return R !== null && ce(t.frame.node, R);
    }), z = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${On}px`,
        height: `${Ys}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), E = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (R, K) => (f(), m("div", {
      class: "dc-float",
      style: Me(z.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": L.value ? "true" : "false",
      onPointerdown: K[3] || (K[3] = (y) => P(n).raiseAt(e.path))
    }, [
      k.value ? (f(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: _,
        onDblclick: b
      }, [
        $("span", cd, O(x.value), 1),
        C.value.length ? (f(), Z(da, {
          key: 0,
          items: C.value,
          label: `${x.value} menu`
        }, null, 8, ["items", "label"])) : F("", !0),
        !s.value || r.value && h.value && d.value ? (f(), m("div", ud, [
          s.value ? F("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${x.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": a.value,
            onClick: K[0] || (K[0] = (y) => P(n).toggleMinimizeAt(e.path))
          }, [
            ve(St, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, dd)),
          s.value ? F("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${x.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: K[1] || (K[1] = (y) => P(n).toggleMaximizeAt(e.path))
          }, [
            ve(St, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, fd)),
          r.value && h.value && d.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${x.value}`,
            "data-dc-close": d.value,
            onClick: K[2] || (K[2] = (y) => P(n).close(d.value))
          }, [
            ve(St, { kind: "close" })
          ], 8, pd)) : F("", !0)
        ])) : F("", !0)
      ], 40, id)) : F("", !0),
      $("div", vd, [
        $e(R.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(te, null, he(i.value ? E : [], (y) => (f(), m("span", {
        key: y,
        class: "dc-float__grip",
        "data-dc-handle": y,
        "aria-hidden": "true",
        onPointerdown: Le((A) => P(n).beginFrameDragAt(e.path, A, y), ["stop"])
      }, null, 40, hd))), 128))
    ], 44, od));
  }
}), gd = /* @__PURE__ */ ue(md, [["__scopeId", "data-v-f035684c"]]), $a = Symbol("dc.paneContext");
function _d(e) {
  return Vn($a, e), e;
}
function _f() {
  return Mt($a, null);
}
function yf(e) {
  const t = Mt(ka, null), n = Mt($a, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Ft(e)
  );
  return zl() && rs(a), a;
}
const yd = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], wd = ["data-dc-movable"], kd = ["aria-label", "aria-pressed"], bd = ["data-dc-space-name"], $d = { class: "dc-truncate" }, xd = ["aria-label"], Cd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Sd = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Md = { class: "dc-tab__name dc-truncate" }, Ed = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Pd = ["aria-label", "data-dc-close", "onClick"], Ad = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Td = { class: "dc-pane__tools" }, zd = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Ld = ["aria-label", "data-dc-minimize"], Rd = ["aria-label", "aria-pressed", "data-dc-maximize"], Fd = ["aria-label", "data-dc-close"], Nd = ["id", "role", "aria-labelledby"], Id = ["id", "role", "aria-labelledby"], Od = ["data-dc-edge"], Dd = /* @__PURE__ */ re({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ba(), a = Wn() ?? "dc-pane", s = v(
      () => t.group.panels.flatMap((M, U) => {
        if (!me(M)) {
          const Ce = Tt(M) || qt(M, (Pe) => n.panelFor(Pe)?.title);
          return [{ kind: "space", index: U, id: `space-${U}`, title: Ce, node: M }];
        }
        const ae = n.panelFor(M);
        return ae ? [{ kind: "panel", index: U, id: M, title: ae.title, panel: ae }] : [];
      })
    ), l = v(() => s.value.length > 1), r = v(() => {
      const M = yt(t.group);
      return s.value.find((U) => U.index === M) ?? s.value[0] ?? null;
    }), o = v(() => r.value?.kind === "space" ? r.value.node : null), i = v(() => o.value ? "" : Zs(t.group)), c = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => r.value?.title ?? ""), h = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), w = v(() => [...t.path, r.value?.index ?? 0]), k = v(() => i.value || Qa(t.group)[0] || ""), x = v(() => n.viewFor(i.value)), C = v(() => t.group.headless === !0), _ = v(() => n.focused.value === i.value), b = v(() => n.dragging.value === i.value), L = v(() => n.moving.value === i.value), z = v(() => n.frameOf(k.value) !== null), E = v(() => n.panelFor(k.value)?.fixed === !0), R = v(
      () => !o.value && (n.canMove(i.value) || z.value && n.movable.value && !E.value)
    ), K = v(
      () => o.value ? n.spaceMenu(w.value) : n.menuFor(i.value)
    ), y = (M) => n.closable(M);
    _d({ panel: i });
    const A = v(() => n.maximized(k.value)), N = v(
      () => z.value && !E.value || !l.value && !!c.value && y(c.value.id)
    ), V = (M) => `${a}-tab-${M}`, oe = v(() => `${a}-body`), X = v(() => {
      const M = n.dropTarget.value;
      return !M || !Ie(t.group, M.panel) || M.edge === "float" ? null : M;
    }), ge = v(() => X.value?.index === void 0 ? X.value?.edge ?? null : null), ie = v(() => X.value?.index ?? null), S = () => c.value ? n.renderContent(c.value, x.value, _.value) ?? null : null, D = () => c.value ? n.renderActions(c.value, x.value, _.value) ?? null : null;
    let j = null;
    function se(M) {
      const U = j !== null && Math.hypot(M.clientX - j.x, M.clientY - j.y) >= 4;
      return j = null, U;
    }
    const _e = (M) => M.kind === "panel" ? M.id : Te(M.node);
    function Ee(M, U) {
      U.kind !== "space" && (n.focus(U.id), j = { x: M.clientX, y: M.clientY }, n.beginDrag(U.id, M));
    }
    function ze(M, U) {
      if (se(M)) return;
      const ae = _e(U);
      ae && n.selectPanel(ae);
    }
    function Ue(M) {
      i.value && n.focus(i.value), !M.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (z.value ? n.beginFrameDrag(k.value, M, "move") : n.beginDrag(i.value, M));
    }
    function je(M) {
      j = { x: M.clientX, y: M.clientY }, n.beginDrag(i.value, M);
    }
    function Ge(M) {
      se(M) || n.toggleMoveMode(i.value);
    }
    const qe = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Fe(M) {
      if (!L.value) return;
      if (M.key === "Escape") {
        M.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const U = qe[M.key];
      U && (M.preventDefault(), z.value ? n.nudgeFrame(i.value, U, M.shiftKey) : n.nudge(i.value, U, M.shiftKey));
    }
    function Ke(M) {
      !z.value || M.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(k.value);
    }
    function B(M, U) {
      M.stopPropagation(), j = null, n.close(U);
    }
    function Y(M, U) {
      const ae = s.value.length;
      let Ce = null;
      if (M.key === "ArrowRight" ? Ce = (U + 1) % ae : M.key === "ArrowLeft" ? Ce = (U - 1 + ae) % ae : M.key === "Home" ? Ce = 0 : M.key === "End" && (Ce = ae - 1), Ce === null) return;
      M.preventDefault();
      const Pe = s.value[Ce];
      if (!Pe) return;
      const Lt = _e(Pe);
      Lt && n.selectPanel(Lt);
    }
    return (M, U) => r.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": P(Qa)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": z.value ? "true" : "false",
      "data-dc-maximized": A.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": _.value ? "true" : "false",
      "data-dc-dragging": b.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: U[7] || (U[7] = (ae) => i.value && P(n).focus(i.value))
    }, [
      C.value ? F("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": R.value ? "true" : "false",
        onPointerdown: Ue,
        onDblclick: Ke
      }, [
        R.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": L.value,
          onPointerdown: je,
          onClick: Ge,
          onKeydown: Fe
        }, [...U[8] || (U[8] = [
          $("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, kd)) : F("", !0),
        h.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          $("span", $d, O(h.value), 1)
        ], 8, bd)) : F("", !0),
        $("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), m(te, null, he(s.value, (ae, Ce) => (f(), m(te, {
            key: ae.id
          }, [
            ie.value === Ce ? (f(), m("span", Cd)) : F("", !0),
            $("button", {
              id: V(ae.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ae.kind === "panel" ? ae.id : void 0,
              "data-dc-space": ae.kind === "space" ? ae.title : void 0,
              "aria-selected": ae.index === r.value.index,
              "aria-controls": oe.value,
              tabindex: ae.index === r.value.index ? 0 : -1,
              onPointerdown: (Pe) => Ee(Pe, ae),
              onClick: (Pe) => ze(Pe, ae),
              onKeydown: (Pe) => Y(Pe, Ce)
            }, [
              $("span", Md, O(ae.title), 1),
              ae.kind === "panel" && ae.panel.subtitle ? (f(), m("span", Ed, O(ae.panel.subtitle), 1)) : F("", !0),
              l.value && ae.kind === "panel" && y(ae.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ae.title}`,
                "data-dc-close": ae.id,
                onPointerdown: U[0] || (U[0] = Le(() => {
                }, ["stop"])),
                onClick: (Pe) => B(Pe, ae.id)
              }, [...U[9] || (U[9] = [
                $("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Pd)) : F("", !0)
            ], 40, Sd)
          ], 64))), 128)),
          ie.value === s.value.length ? (f(), m("span", Ad)) : F("", !0)
        ], 8, xd),
        $("div", Td, [
          ve(D),
          K.value.length ? (f(), Z(da, {
            key: 0,
            items: K.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : F("", !0)
        ]),
        N.value ? (f(), m("div", zd, [
          z.value && !E.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": k.value,
            onPointerdown: U[1] || (U[1] = Le(() => {
            }, ["stop"])),
            onClick: U[2] || (U[2] = (ae) => P(n).toggleMinimize(k.value))
          }, [
            ve(St, { kind: "minimize" })
          ], 40, Ld)) : F("", !0),
          z.value && !E.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": k.value,
            onPointerdown: U[3] || (U[3] = Le(() => {
            }, ["stop"])),
            onClick: U[4] || (U[4] = (ae) => P(n).toggleMaximize(k.value))
          }, [
            ve(St, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Rd)) : F("", !0),
          !l.value && c.value && y(c.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: U[5] || (U[5] = Le(() => {
            }, ["stop"])),
            onClick: U[6] || (U[6] = (ae) => P(n).close(c.value.id))
          }, [
            ve(St, { kind: "close" })
          ], 40, Fd)) : F("", !0)
        ])) : F("", !0)
      ], 40, wd)),
      o.value ? (f(), m("div", {
        key: 1,
        id: oe.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : V(r.value.id)
      }, [
        $e(M.$slots, "space", {
          node: o.value,
          path: w.value
        }, void 0, !0)
      ], 8, Nd)) : (f(), m("div", {
        key: 2,
        id: oe.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : V(i.value)
      }, [
        ve(S)
      ], 8, Id)),
      ge.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ge.value,
        "aria-hidden": "true"
      }, null, 8, Od)) : F("", !0)
    ], 40, yd)) : F("", !0);
  }
}), dl = /* @__PURE__ */ ue(Dd, [["__scopeId", "data-v-44fd2b2d"]]), Bd = ["data-dc-space", "data-dc-path", "aria-label"], qd = {
  key: 0,
  class: "dc-space__head"
}, Kd = { class: "dc-space__title dc-truncate" }, Vd = ["data-dc-direction"], Wd = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Hd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Ud = /* @__PURE__ */ re({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ba(), a = W(null), s = v(() => G(t.node) ? t.node : null), l = v(() => zt(t.node) ? t.node : null), r = v(() => ne(t.node) ? t.node : null), o = v(
      () => l.value ? l.value.children : r.value?.frames.map((S) => S.node) ?? []
    ), i = v(() => l.value ? nt(l.value) : []), c = v(
      () => (r.value?.frames ?? []).map((S, D) => ({
        held: S,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: D,
        key: y(S.node),
        path: [...t.path, D]
      })).sort((S, D) => S.key < D.key ? -1 : S.key > D.key ? 1 : 0)
    ), d = v(() => Tt(t.node)), h = v(() => n.spaceMenu(t.path)), w = v(() => t.node.headless === !0), k = v(() => r.value ? "desktop" : l.value?.direction ?? ""), x = W(null), C = W(0);
    let _ = null;
    be(
      x,
      (S) => {
        _?.disconnect(), _ = null, !(!S || typeof ResizeObserver > "u") && (C.value = S.clientWidth, _ = new ResizeObserver(([D]) => {
          C.value = D?.contentRect.width ?? 0;
        }), _.observe(S));
      },
      { immediate: !0 }
    ), De(() => _?.disconnect());
    const b = v(() => {
      const S = Math.max(
        1,
        Math.floor((C.value + kt) / (On + kt))
      ), D = /* @__PURE__ */ new Map();
      let j = 0;
      for (const se of c.value)
        se.held.minimized === !0 && (D.set(se.key, {
          x: kt + j % S * (On + kt),
          bottom: kt + Math.floor(j / S) * (Ys + kt)
        }), j += 1);
      return D;
    }), L = (S) => !!S && S.join("/") === t.path.join("/"), z = v(() => {
      const S = n.dropTarget.value, D = r.value;
      if (!D || !S?.rect || S.edge !== "float") return null;
      if (S.space) return L(S.space) ? S.rect : null;
      const j = Se(D, S.panel);
      return j && D.frames.includes(j) ? S.rect : null;
    }), E = v(() => {
      const S = n.dropTarget.value;
      return !!S && !S.rect && L(S.space);
    }), R = v(() => l.value?.direction === "row"), K = v(() => o.value.map((S, D) => [...t.path, D])), y = (S) => [...at(S)].sort().join("/"), A = (S) => {
      const D = at(S)[0];
      return (D ? n.panelFor(D)?.title : null) ?? D ?? "panel";
    }, N = (S) => {
      const D = o.value[S], j = o.value[S + 1];
      return !D || !j ? "Resize panels" : `Resize ${A(D)} and ${A(j)}`;
    }, V = (S) => {
      const D = i.value[S] ?? 0, j = i.value[S + 1] ?? 0, se = D + j;
      return se > 0 ? Math.round(D / se * 100) : 50;
    };
    function oe() {
      const S = a.value, D = S ? R.value ? S.clientWidth : S.clientHeight : 0;
      return D <= 0 ? 0.05 : Math.min(n.minPanelSize.value / D, 0.4);
    }
    let X = null;
    function ge(S, D) {
      const j = l.value, se = a.value;
      if (!n.resizable.value || !j || !se || S.button !== 0) return;
      const _e = R.value ? se.clientWidth : se.clientHeight;
      if (_e <= 0) return;
      const Ee = R.value ? S.clientX : S.clientY, ze = nt(j), Ue = Math.min(n.minPanelSize.value / _e, 0.4);
      S.preventDefault();
      const je = (Fe) => {
        const Ke = ((R.value ? Fe.clientX : Fe.clientY) - Ee) / _e;
        n.setSizes(t.path, as(ze, D, Ke, Ue));
      }, Ge = () => X?.(), qe = (Fe) => {
        Fe.key === "Escape" && (n.setSizes(t.path, ze), X?.());
      };
      X = () => {
        window.removeEventListener("pointermove", je), window.removeEventListener("pointerup", Ge), window.removeEventListener("pointercancel", Ge), window.removeEventListener("keydown", qe), X = null;
      }, window.addEventListener("pointermove", je), window.addEventListener("pointerup", Ge), window.addEventListener("pointercancel", Ge), window.addEventListener("keydown", qe);
    }
    De(() => X?.());
    function ie(S, D) {
      const j = l.value;
      if (!n.resizable.value || !j) return;
      const se = R.value ? "ArrowRight" : "ArrowDown", _e = R.value ? "ArrowLeft" : "ArrowUp", Ee = S.shiftKey ? 0.1 : 0.02;
      if (S.key !== se && S.key !== _e) return;
      const ze = S.key === se ? Ee : -Ee;
      S.preventDefault(), n.setSizes(t.path, as(nt(j), D, ze, oe()));
    }
    return (S, D) => {
      const j = is("WindowNode", !0);
      return s.value ? (f(), Z(dl, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Qe(({ node: se, path: _e }) => [
          ve(j, {
            node: se,
            path: _e,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), m("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": k.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !w.value ? (f(), m("header", qd, [
          $("span", Kd, O(d.value), 1),
          h.value.length ? (f(), Z(da, {
            key: 0,
            items: h.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : F("", !0)
        ])) : F("", !0),
        r.value ? (f(), m("div", {
          key: 1,
          ref_key: "desktop",
          ref: x,
          class: "dc-window__desktop"
        }, [
          z.value ? (f(), m("div", {
            key: 0,
            class: "dc-window__drop",
            style: Me({
              left: `${z.value.x}px`,
              top: `${z.value.y}px`,
              width: `${z.value.w}px`,
              height: `${z.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : F("", !0),
          (f(!0), m(te, null, he(c.value, (se) => (f(), Z(gd, {
            key: se.key,
            frame: se.held,
            path: se.path,
            order: se.order,
            place: b.value.get(se.key) ?? null
          }, {
            default: Qe(() => [
              ve(j, {
                node: se.held.node,
                path: se.path,
                framed: se.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (f(), m("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          E.value ? (f(), m("div", Wd)) : F("", !0),
          (f(!0), m(te, null, he(o.value, (se, _e) => (f(), m(te, {
            key: y(se)
          }, [
            $("div", {
              class: "dc-window__cell",
              style: Me({ flexGrow: i.value[_e] ?? 1 })
            }, [
              ve(j, {
                node: se,
                path: K.value[_e] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            _e < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": R.value ? "vertical" : "horizontal",
              "aria-label": N(_e),
              "aria-valuenow": V(_e),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Ee) => ge(Ee, _e),
              onKeydown: (Ee) => ie(Ee, _e)
            }, null, 40, Hd)) : F("", !0)
          ], 64))), 128))
        ], 8, Vd)) : F("", !0)
      ], 8, Bd));
    };
  }
}), jd = /* @__PURE__ */ ue(Ud, [["__scopeId", "data-v-fb5b403f"]]), Gd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Xd = {
  key: 1,
  class: "dc-window__empty"
}, Yd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, ln = 16, Qd = /* @__PURE__ */ re({
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
    const a = e, s = n, l = It(e, "layout"), r = It(e, "views"), o = Ht(), i = v(() => new Map(a.panels.map((u) => [u.id, u]))), c = v(() => a.panels.map((u) => u.id)), d = v(() => Ju(l.value, c.value)), h = W(null), w = W(null), k = W(null), x = W(!0), C = W(null), _ = W(null), b = W(null), L = W(""), z = W(null);
    function E() {
      const u = z.value;
      return u ? [...u.querySelectorAll(".dc-pane[data-dc-panels]")].filter((g) => g.closest(".dc-window") === u).map((g) => ({ panels: (g.dataset.dcPanels ?? "").split(" "), element: g })) : [];
    }
    function R(u) {
      const p = [];
      let g = u.closest(".dc-float");
      for (; g; )
        p.unshift(Number(g.dataset.dcOrder ?? 0)), g = g.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function K() {
      return E().map((u) => ({ pane: u, order: R(u.element) })).sort((u, p) => {
        const g = Math.max(u.order.length, p.order.length);
        for (let T = 0; T < g; T += 1) {
          const I = (u.order[T] ?? -1) - (p.order[T] ?? -1);
          if (I !== 0) return I;
        }
        return 0;
      }).map((u) => u.pane);
    }
    const y = (u) => E().find((p) => p.panels.includes(u)) ?? null;
    function A(u) {
      const p = i.value.get(u);
      if (!p) return "";
      const g = r.value[u];
      return g && p.views?.some((T) => T.key === g) ? g : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function N(u, p) {
      r.value = { ...r.value, [u]: p }, s("view-change", { panel: u, view: p });
    }
    const V = v(
      () => a.panels.filter((u) => u.fixed !== !0).length
    );
    function oe(u) {
      return !a.movable || V.value < 1 || a.panels.length < 2 ? !1 : i.value.get(u)?.fixed !== !0;
    }
    function X(u, p) {
      const g = d.value;
      !u || !g || u === g || (l.value = u, p && s("panel-move", p));
    }
    function ge(u, p, g) {
      if (u.width <= 0 || u.height <= 0) return "center";
      const T = (p - u.left) / u.width, I = (g - u.top) / u.height, q = 0.3;
      return T > q && T < 1 - q && I > q && I < 1 - q ? "center" : [
        { edge: "left", distance: T },
        { edge: "right", distance: 1 - T },
        { edge: "top", distance: I },
        { edge: "bottom", distance: 1 - I }
      ].reduce(
        (le, H) => H.distance < le.distance ? H : le
      ).edge;
    }
    function ie(u, p) {
      const g = [...u.querySelectorAll(".dc-tab")], T = g.findIndex((I) => {
        const q = I.getBoundingClientRect();
        return p < q.left + q.width / 2;
      });
      return T === -1 ? g.length : T;
    }
    function S(u, p, g) {
      for (const { panels: T, element: I } of K().reverse()) {
        const q = I.getBoundingClientRect();
        if (u < q.left || u > q.right || p < q.top || p > q.bottom) continue;
        const fe = T.find((J) => J !== g), le = I.querySelector(".dc-pane__tabs"), H = le?.getBoundingClientRect();
        if (le && H && p >= H.top && p <= H.bottom)
          return fe ? { panel: fe, edge: "center", index: ie(le, u) } : null;
        const Q = I.querySelector(":scope > .dc-pane__space");
        if (Q) {
          const J = Q.getBoundingClientRect();
          if (u >= J.left && u <= J.right && p >= J.top && p <= J.bottom) continue;
        }
        return fe ? { panel: fe, edge: ge(q, u, p) } : null;
      }
      return j(u, p, g) ?? Ee(u, p);
    }
    function D() {
      const u = z.value;
      return u ? [...u.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === u).reverse() : [];
    }
    function j(u, p, g) {
      const T = d.value;
      if (!T) return null;
      for (const I of D()) {
        const q = I.getBoundingClientRect();
        if (u < q.left || u > q.right || p < q.top || p > q.bottom) continue;
        const fe = ze(I), le = fe.flatMap((de) => de.panels).find((de) => de !== g);
        if (!le && fe.length > 0) return null;
        const H = Se(T, g)?.rect, Q = Tn(
          {
            x: u - q.left - 24,
            y: p - q.top - 12,
            w: H?.w ?? pt.w,
            h: H?.h ?? pt.h
          },
          { w: I.clientWidth, h: I.clientHeight },
          a.minPanelSize
        );
        if (le) return { panel: le, edge: "float", rect: Q };
        const J = se(I);
        return J ? { panel: "", space: J, edge: "float", rect: Q } : null;
      }
      return null;
    }
    function se(u) {
      const p = u.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function _e() {
      const u = z.value;
      return u ? [...u.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === u).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const g = se(p);
        return g ? [{ element: p, path: g }] : [];
      }) : [];
    }
    function Ee(u, p) {
      for (const { element: g, path: T } of _e()) {
        if (g.dataset.dcSpace === "desktop") continue;
        const I = g.getBoundingClientRect();
        if (!(u < I.left || u > I.right || p < I.top || p > I.bottom))
          return { panel: "", space: T, edge: "center" };
      }
      return null;
    }
    function ze(u) {
      return E().filter(
        (p) => p.element.closest(".dc-window__desktop") === u
      );
    }
    let Ue = null;
    const je = (u) => u.altKey;
    function Ge(u, p) {
      if (!oe(u) || w.value || _.value || p.button !== 0) return;
      const g = p.clientX, T = p.clientY;
      let I = !1, q = je(p);
      const fe = () => {
        const pe = b.value;
        pe && (k.value = q ? j(pe.x, pe.y, u) : S(pe.x, pe.y, u));
      }, le = (pe) => {
        if (!I) {
          if (Math.hypot(pe.clientX - g, pe.clientY - T) < 4) return;
          I = !0, w.value = u, C.value = null;
        }
        q = je(pe), x.value = !q, b.value = { x: pe.clientX, y: pe.clientY }, fe();
      }, H = (pe) => {
        je(pe) !== q && (q = !q, x.value = !q, I && fe());
      }, Q = (pe) => {
        Ue?.();
        const ee = k.value, Ae = d.value;
        if (pe && I && ee && Ae) {
          const st = ee.space ? ts(Ae, u, ee.space, ee.rect) : ee.edge === "float" && ee.rect ? es(Ae, u, ee.panel, ee.rect) : sn(Ae, u, ee.panel, ee.edge, ee.index);
          X(st, {
            panel: u,
            target: ee.panel,
            edge: ee.edge,
            ...ee.space === void 0 ? {} : { space: ee.space },
            ...ee.index === void 0 ? {} : { index: ee.index },
            ...ee.rect === void 0 ? {} : { rect: ee.rect }
          });
        }
        w.value = null, k.value = null, b.value = null, x.value = !0;
      }, J = () => Q(!0), de = () => Q(!1), ye = (pe) => {
        if (pe.key === "Escape") {
          Q(!1);
          return;
        }
        H(pe);
      };
      Ue = () => {
        window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", J), window.removeEventListener("pointercancel", de), window.removeEventListener("keydown", ye), window.removeEventListener("keyup", H), Ue = null;
      }, window.addEventListener("pointermove", le), window.addEventListener("pointerup", J), window.addEventListener("pointercancel", de), window.addEventListener("keydown", ye), window.addEventListener("keyup", H);
    }
    De(() => Ue?.());
    let qe = null;
    function Fe(u) {
      const p = z.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${u.join("/")}"]`
      )].find((I) => I.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ke(u) {
      const p = d.value;
      return p ? qn(p, u) : null;
    }
    function B(u) {
      const p = d.value;
      if (!p) return;
      const g = Dt(p, u);
      g !== p && (l.value = g);
    }
    function Y(u) {
      const p = Ke(u);
      p && B(p);
    }
    function M(u) {
      const p = d.value, g = p ? Se(p, u) : null;
      return g !== null && lt(g);
    }
    function U(u) {
      const p = d.value, g = p ? Se(p, u) : null;
      return g !== null && dt(g);
    }
    function ae(u) {
      const p = d.value, g = p ? ut(p, u) : null;
      return g ? Te(g.node) : "";
    }
    function Ce(u) {
      const p = d.value, g = p ? ut(p, u) : null;
      if (!p || !g) return;
      const T = Te(g.node);
      if (i.value.get(T)?.fixed === !0) return;
      const I = !dt(g);
      let q = Ku(p, u, I);
      q !== p && (I || (q = Dt(q, u)), l.value = q, s("frame-minimize", { panel: T, minimized: I }));
    }
    function Pe(u) {
      const p = Ke(u);
      p && Ce(p);
    }
    function Lt(u) {
      const p = d.value, g = p ? ut(p, u) : null;
      if (!p || !g) return;
      const T = Te(g.node);
      if (i.value.get(T)?.fixed === !0) return;
      const I = !lt(g);
      let q = qu(p, u, I);
      q !== p && (I && (q = Dt(q, u)), l.value = q, s("frame-maximize", { panel: T, maximized: I }));
    }
    function xa(u) {
      const p = Ke(u);
      p && Lt(p);
    }
    function Ca(u, p, g) {
      const T = d.value, I = T ? ut(T, u) : null;
      if (!T || !I || p.button !== 0 || w.value || _.value) return;
      const q = Te(I.node);
      if (i.value.get(q)?.fixed === !0 || lt(I) || dt(I) || (g === "move" ? !a.movable : !a.resizable)) return;
      const fe = Fe(u), le = Vu(T, u);
      B(u);
      const H = { w: fe?.clientWidth ?? 0, h: fe?.clientHeight ?? 0 }, Q = { ...I.rect }, J = p.clientX, de = p.clientY, ye = a.minPanelSize;
      _.value = q;
      const pe = (Ne) => {
        const Je = d.value;
        if (!Je) return;
        const Rt = Ja(Je, le, Tn(Ne, H, ye));
        Rt !== Je && (l.value = Rt);
      }, ee = (Ne) => {
        Ne.preventDefault();
        const Je = Ne.clientX - J, Rt = Ne.clientY - de;
        pe(
          g === "move" ? { ...Q, x: Q.x + Je, y: Q.y + Rt } : Za(Q, g, Je, Rt, ye)
        );
      }, Ae = (Ne) => {
        if (qe?.(), _.value = null, !Ne) {
          pe(Q);
          return;
        }
        const Je = d.value ? ut(d.value, le) : null;
        Je && s("frame-change", { panel: ae(le), rect: Je.rect });
      }, st = () => Ae(!0), it = () => Ae(!1), ct = (Ne) => {
        Ne.key === "Escape" && Ae(!1);
      };
      qe = () => {
        window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", st), window.removeEventListener("pointercancel", it), window.removeEventListener("keydown", ct), qe = null;
      }, window.addEventListener("pointermove", ee), window.addEventListener("pointerup", st), window.addEventListener("pointercancel", it), window.addEventListener("keydown", ct);
    }
    function fl(u, p, g) {
      const T = Ke(u);
      T && Ca(T, p, g);
    }
    function pl(u, p, g = !1) {
      const T = d.value, I = Ke(u), q = T && I ? ut(T, I) : null;
      if (!T || !I || !q || i.value.get(u)?.fixed === !0 || (g ? !a.resizable : !a.movable)) return;
      if (lt(q) || dt(q)) {
        L.value = `${Xe(u)} is ${lt(q) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const fe = p === "left" ? -ln : p === "right" ? ln : 0, le = p === "up" ? -ln : p === "down" ? ln : 0, H = Fe(I), Q = { w: H?.clientWidth ?? 0, h: H?.clientHeight ?? 0 }, J = g ? Za(q.rect, "se", fe, le, a.minPanelSize) : { ...q.rect, x: q.rect.x + fe, y: q.rect.y + le }, de = Ja(T, I, Tn(J, Q, a.minPanelSize));
      if (de === T) {
        L.value = g ? `${Xe(u)} cannot be resized further.` : `${Xe(u)} cannot move ${p}.`;
        return;
      }
      l.value = de;
      const ye = ut(de, I);
      ye && (s("frame-change", { panel: u, rect: ye.rect }), L.value = g ? `${Xe(u)} resized to ${ye.rect.w} by ${ye.rect.h}.` : `${Xe(u)} moved to ${ye.rect.x}, ${ye.rect.y}.`);
    }
    De(() => qe?.());
    function vl(u, p) {
      const g = y(u), T = g?.element.getBoundingClientRect();
      if (!g || !T) return null;
      const I = p === "left" || p === "right", q = (H) => {
        if (!(I ? H.bottom > T.top + 1 && H.top < T.bottom - 1 : H.right > T.left + 1 && H.left < T.right - 1)) return null;
        const J = p === "left" ? T.left - H.right : p === "right" ? H.left - T.right : p === "up" ? T.top - H.bottom : H.top - T.bottom;
        return J < -1 ? null : J;
      }, fe = [];
      for (const H of E()) {
        if (H === g || H.element === g.element) continue;
        const Q = q(H.element.getBoundingClientRect());
        if (Q === null) continue;
        const J = H.panels.find((de) => de !== u);
        J && fe.push({ to: { panel: J }, distance: Q });
      }
      for (const { element: H, path: Q } of _e()) {
        const J = q(H.getBoundingClientRect());
        J !== null && fe.push({ to: { space: Q }, distance: J });
      }
      return fe.reduce(
        (H, Q) => H && H.distance <= Q.distance ? H : Q,
        null
      )?.to ?? null;
    }
    function hl(u) {
      const p = d.value ? Se(d.value, u) !== null : !1;
      if (!p && !oe(u)) return;
      C.value = C.value === u ? null : u;
      const g = Xe(u);
      if (!C.value) {
        L.value = `${g}: move mode off.`;
        return;
      }
      L.value = p ? `${g}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${g}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Xe = (u) => i.value.get(u)?.title ?? u, ml = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function gl(u, p, g = !1) {
      if (!oe(u)) return;
      const T = d.value;
      if (!T) return;
      const I = Xe(u), q = $t(T, u);
      if (!g && q && (p === "left" || p === "right") && q.panels.length > 1) {
        const de = q.panels.indexOf(u), ye = p === "left" ? de - 1 : de + 1;
        if (ye >= 0 && ye < q.panels.length) {
          X(Bt(T, u, ye), { panel: u, target: u, edge: "center", index: ye }), L.value = `${I} moved ${p}, now tab ${ye + 1} of ${q.panels.length}.`, xn(u);
          return;
        }
      }
      const le = vl(u, p);
      if (!le || le.panel !== void 0 && !oe(le.panel)) {
        L.value = `${I} cannot move ${p}.`;
        return;
      }
      const H = ml[p];
      if (le.space) {
        const de = le.space, ye = ot(T, de), pe = Se(T, u)?.rect, ee = { ...pt, ...pe ? { w: pe.w, h: pe.h } : {} };
        X(ts(T, u, de, ee), { panel: u, target: "", space: de, edge: H }), L.value = `${I} moved ${p}, into ${ye ? Tt(ye) : "the space"}.`, xn(u);
        return;
      }
      const Q = le.panel, J = q?.panels.length === 1 && $t(T, Q)?.panels.length === 1;
      g ? (X(sn(T, u, Q, "center"), {
        panel: u,
        target: Q,
        edge: "center"
      }), L.value = `${I} joined ${Xe(Q)} as a tab.`) : J ? (X(dn(T, u, Q), { panel: u, target: Q, edge: H }), L.value = `${I} moved ${p}, trading places with ${Xe(Q)}.`) : (X(sn(T, u, Q, H), { panel: u, target: Q, edge: H }), L.value = `${I} moved ${p}, beside ${Xe(Q)}.`), xn(u);
    }
    function xn(u) {
      Kt(() => {
        y(u)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function _l(u, p) {
      const g = d.value;
      g && (l.value = fn(g, u, p));
    }
    function Cn(u) {
      const p = d.value;
      if (!p) return;
      const g = Ct(p, u);
      g !== p && (l.value = g, s("tab-select", { panel: u }));
    }
    function Sa(u) {
      return i.value.get(u)?.closable ?? a.closable;
    }
    function yl(u) {
      Sa(u) && s("panel-close", u);
    }
    const Sn = W(/* @__PURE__ */ new Map());
    let wl = 0;
    function kl(u, p) {
      const g = wl += 1;
      return Sn.value.set(g, { panel: u, items: p }), () => {
        Sn.value.delete(g);
      };
    }
    function bl(u) {
      const p = [];
      for (const g of Sn.value.values())
        g.panel() === u && p.push(...g.items());
      return p;
    }
    function Ma(u) {
      const p = u.filter((g) => g.items.length > 0);
      return p.length < 2 ? p.flatMap((g) => g.items) : p.flatMap((g) => [
        { id: g.id, heading: !0, label: g.title },
        ...g.items
      ]);
    }
    const Ea = (u) => u.title || "These tabs";
    function $l(u, p) {
      const g = p.id, T = $t(u, g), I = (T?.panels.length ?? 0) > 1, q = T?.fixedView === !0, fe = (J) => ({
        action: () => {
          J !== u && (l.value = J);
        }
      }), le = [], H = [], Q = p.views ?? [];
      if (Q.length > 1 && !q) {
        const J = A(g);
        le.push({
          id: "view",
          label: "View",
          items: Q.map((de) => ({
            id: `view-${de.key}`,
            label: de.label,
            checked: de.key === J,
            action: () => N(g, de.key)
          }))
        });
      }
      return I && !q && H.push(
        { id: "show-row", label: "Row", checked: !1, ...fe(ns(u, g, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...fe(ns(u, g, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...fe(ju(u, g))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...fe(Gu(u, g))
        }
      ), I && T && (H.length && H.push({ separator: !0 }), H.push(...Pa(T, g))), { panel: le, tabs: H, tabsTitle: T ? Ea(T) : "" };
    }
    function Pa(u, p) {
      const g = yt(u), T = (I) => {
        const q = u.panels[(g + I + u.panels.length) % u.panels.length];
        return (q === void 0 ? "" : Te(q)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Cn(T(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Cn(T(-1)) }
      ];
    }
    function tn(u) {
      return u.title ? u.title : G(u) ? u.panels.length > 1 ? "these tabs" : "the strip" : Tt(u);
    }
    function Aa(u) {
      if (!u || ne(u) || u.fixedView === !0 || !u.title && u.headless !== !0 || He(u)) return null;
      const p = ul(u);
      return p && p.fixedView !== !0 ? p : null;
    }
    function xl(u) {
      const p = d.value;
      if (!a.menu || !p) return [];
      const g = ot(p, u);
      if (!g || G(g)) return [];
      if (g.fixedView) return [];
      const T = ne(g) ? "desktop" : g.direction, I = (ee, Ae, st) => ({
        id: `show-${ee}`,
        label: Ae,
        checked: T === ee,
        action: () => {
          const it = d.value, ct = st();
          !it || ct === g || (l.value = _n(xe(ht(it, u, ct))));
        }
      }), q = () => {
        const ee = rl(g, Cl(g));
        if (G(ee) && ee.panels.length === 0) return g;
        const Ae = G(ee) && ee.panels.length === 1 ? ee.panels[0] : void 0;
        return Ae !== void 0 && me(Ae) ? g : ee;
      }, fe = (ee) => () => ne(g) ? cl(g, ee) : g.direction === ee ? g : { ...g, direction: ee }, le = u.slice(0, -1), H = u.length > 0 ? ot(p, le) : null, Q = H && G(H) && H.panels.length > 1 ? H : null, J = H && Aa(H) === g ? H : null, de = Aa(g), ye = g.title || "this space", pe = (ee, Ae, st, it, ct) => ({
        id: ee,
        label: ct,
        action: () => {
          const Ne = d.value;
          Ne && (l.value = _n(xe(ht(Ne, Ae, Qu(st, it)))));
        }
      });
      return Ma([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: g.title || "This space",
          items: [
            I("row", "Row", fe("row")),
            I("column", "Column", fe("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            I("tabs", "Tabs", () => q()),
            I("desktop", "Desktop", () => ne(g) ? g : il(g))
          ]
        },
        {
          id: "about-around",
          title: de ? `Around ${tn(de)}` : "",
          items: de ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...de.title ? [] : [pe("merge-around-keep-this", u, g, "outer", `Keep ${ye}`)],
            ...g.title ? [] : [pe("merge-around-keep-that", u, g, "inner", `Keep ${tn(de)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: J ? `Inside ${tn(J)}` : "",
          items: J ? [
            ...g.title ? [] : [pe("merge-inside-keep-that", le, J, "outer", `Keep ${tn(J)}`)],
            ...J.title ? [] : [pe("merge-inside-keep-this", le, J, "inner", `Keep ${ye}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: Q ? Ea(Q) : "",
          items: Q ? Pa(Q, Te(g)) : []
        }
      ]);
    }
    function Cl(u) {
      const p = h.value;
      return p && ce(u, p) ? p : void 0;
    }
    function Sl(u) {
      const p = d.value, g = i.value.get(u);
      if (!p || !g) return [];
      const T = a.menu ? $l(p, g) : null, I = bl(u);
      I.length && T?.panel.length && I.push({ separator: !0 }), T && I.push(...T.panel);
      const q = Ma([
        { id: "about-panel", title: g.title, items: I },
        { id: "about-tabs", title: T?.tabsTitle ?? "", items: T?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(g, q) : q;
    }
    function Ml(u, p) {
      return o[`${u}-${p}`] ?? o[u];
    }
    function Ta(u, p, g, T) {
      return Ml(u, p.id)?.({ panel: p, view: g, active: T });
    }
    ed({
      panelFor: (u) => i.value.get(u) ?? null,
      viewFor: A,
      setView: N,
      movable: v(() => a.movable),
      resizable: v(() => a.resizable),
      minPanelSize: v(() => a.minPanelSize),
      spaceNames: v(() => a.spaceNames),
      focused: h,
      dragging: w,
      dropTarget: k,
      moving: C,
      framing: _,
      canMove: oe,
      focus(u) {
        h.value !== u && (h.value = u, s("panel-activate", u));
      },
      selectPanel: Cn,
      beginDrag: Ge,
      toggleMoveMode: hl,
      nudge: gl,
      setSizes: _l,
      frameOf: (u) => d.value ? Se(d.value, u) : null,
      beginFrameDrag: fl,
      nudgeFrame: pl,
      raise: Y,
      maximized: M,
      toggleMaximize: xa,
      minimized: U,
      toggleMinimize: Pe,
      beginFrameDragAt: Ca,
      raiseAt: B,
      toggleMaximizeAt: Lt,
      toggleMinimizeAt: Ce,
      menuFor: Sl,
      spaceMenu: xl,
      registerMenu: kl,
      closable: Sa,
      close: yl,
      renderContent: (u, p, g) => Ta("panel", u, p, g),
      renderActions: (u, p, g) => Ta("actions", u, p, g),
      layout: d
    });
    const El = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Pl = () => {
      const u = w.value, p = b.value;
      return !u || !p ? null : Ll(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${p.x}px`, top: `${p.y}px` },
          "aria-hidden": "true"
        },
        i.value.get(u)?.title ?? u
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(u, p, g, T) {
        const I = d.value;
        I && X(sn(I, u, p, g, T), {
          panel: u,
          target: p,
          edge: g,
          ...T === void 0 ? {} : { index: T }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(u) {
        const p = d.value;
        p && (l.value = Ct(p, u));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(u, p, g) {
        const T = d.value;
        T && X(es(T, u, p, g), {
          panel: u,
          target: p,
          edge: "float",
          rect: g
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(u, p) {
        const g = d.value;
        if (!g) return;
        const T = Ou(g, u, p);
        if (T === g) return;
        l.value = T;
        const I = Se(T, u);
        I && s("frame-change", { panel: u, rect: I.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: N,
      /** Brings a floating frame to the front of its stack. */
      raise: Y,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: xa,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Pe
    }), (u, p) => (f(), m("div", {
      ref_key: "root",
      ref: z,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": w.value ? "true" : "false",
      "data-dc-docking": x.value ? "true" : "false",
      style: Me(El.value)
    }, [
      d.value ? (f(), Z(jd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", Xd, " This window has no panels. ")),
      ve(Pl),
      $("p", Yd, O(L.value), 1)
    ], 12, Gd));
  }
}), Zd = /* @__PURE__ */ ue(Qd, [["__scopeId", "data-v-711565af"]]);
function wf(e = "", t = "/") {
  const n = W(tt(e)), a = W(t), s = [`${a.value}${n.value}`];
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
function ls(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return tt(a === -1 ? n : n.slice(0, a));
}
function kf(e) {
  const t = W(ls(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), a = be(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = ls(s);
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
const Jd = {
  DataShell: mu,
  ShellHeader: Fs,
  QueryPanel: Is,
  RecordActions: Ds,
  ResultsArea: Gs,
  FacetControl: Ns,
  SegmentedControl: Eu,
  StatusPill: Gt,
  WindowFrame: Zd,
  WindowPane: dl,
  ListView: In,
  CardsView: qs,
  GridView: Ks,
  ImagesView: Vs,
  TableView: Us,
  LinksView: Ws,
  PreviewView: Hs,
  TypeCardsView: js
}, bf = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Jd))
      e.component(`${n}${a}`, s);
    t.route && e.provide(cs, t.route);
  }
};
export {
  gn as CASCADE_STEP,
  af as COLUMN_BREAKPOINTS,
  nf as COLUMN_ROLES,
  qs as CardsView,
  Xa as ColumnCell,
  pt as DEFAULT_FRAME,
  Ln as DEFAULT_SORT,
  Fl as DEFAULT_VIEW,
  mu as DataShell,
  Rn as EMPTY_CELL,
  Ts as ENTITY_ALL,
  mn as ENTITY_TERM,
  Wt as EXPRESSION_TERM,
  oa as FACET_PREFIX,
  Ns as FacetControl,
  Ks as GridView,
  bf as HeaderContentLayoutPlugin,
  Vs as ImagesView,
  Ws as LinksView,
  In as ListView,
  kt as MINIMIZED_GAP,
  Ys as MINIMIZED_HEIGHT,
  On as MINIMIZED_WIDTH,
  Xs as MIN_FRAME,
  Va as MOCK_TINTS,
  of as MenuBar,
  da as MenuButton,
  ca as MenuList,
  Xt as MetricDrill,
  $a as PANE_CONTEXT_KEY,
  sa as PARAM_DIR,
  ta as PARAM_ENTITY,
  la as PARAM_EXPR,
  ra as PARAM_PAGE,
  aa as PARAM_SORT,
  na as PARAM_VIEW,
  ua as PinStar,
  Hs as PreviewView,
  kn as QueryMark,
  Is as QueryPanel,
  nn as RECORD_STATUSES,
  gs as RESULT_FIELDS,
  cs as ROUTE_ADAPTER_KEY,
  Ds as RecordActions,
  Gs as ResultsArea,
  As as SHELL_CONTEXT_KEY,
  tf as SHELL_THEMES,
  Yt as ScopeMark,
  Eu as SegmentedControl,
  _t as SelectTick,
  rf as ShellCard,
  Fs as ShellHeader,
  Ya as StandingControl,
  Gt as StatusPill,
  Us as TableView,
  js as TypeCardsView,
  us as VIEW_KINDS,
  Nl as VIEW_LABELS,
  ka as WINDOW_CONTEXT_KEY,
  Zd as WindowFrame,
  dl as WindowPane,
  Zs as activePanel,
  yt as activeTab,
  ea as addTerm,
  Qn as andExpression,
  Nu as axisOf,
  va as cascade,
  ws as cellFull,
  Ut as cellText,
  cn as cellTextOf,
  Oe as cellValue,
  La as changesResults,
  Tn as clampRect,
  rl as collapseSpace,
  ju as collapseToTabs,
  uf as column,
  Fa as columnAlign,
  Na as columnClass,
  Ra as columnKey,
  Fn as columnTruncates,
  Kl as columnsFor,
  Ol as countPages,
  Rl as createHistoryAdapter,
  wf as createMemoryAdapter,
  vr as createMockDataSource,
  kf as createVueRouterAdapter,
  Hl as defaultCellText,
  ss as defaultLayout,
  Yn as defaultQuery,
  hr as drillExpression,
  ts as dropIntoSpace,
  At as emptyFacetState,
  jn as emptyFacetValue,
  Cs as excludingTerm,
  bt as findEntity,
  rt as findSort,
  ff as fixedView,
  pa as float,
  es as floatPanel,
  il as floatSplit,
  Gu as floatTabs,
  on as fnv1a,
  fs as focusEntity,
  wt as formatCount,
  Bl as formatDate,
  ft as formatExpression,
  Dl as formatMetric,
  ql as formatOrdinal,
  jt as formatTerm,
  bn as frame,
  ut as frameAt,
  Se as frameOf,
  qn as framePathOf,
  Te as frontPanel,
  dr as generateRows,
  cf as group,
  $t as groupOf,
  Iu as groups,
  ms as hasActiveFacets,
  ce as hasPanel,
  df as headless,
  Nt as insertPanel,
  Ot as isChoosable,
  sf as isEntityScoped,
  hs as isFacetActive,
  ne as isFloat,
  G as isGroup,
  lt as isMaximized,
  dt as isMinimized,
  me as isPanelTab,
  Gn as isPristineQuery,
  zt as isSplit,
  Ie as isTabOf,
  Xn as isTypeCardsQuery,
  ds as isViewKind,
  qa as joinExpression,
  Ms as liftTerm,
  er as matchesExpression,
  fr as matchesFacets,
  Du as maximizeFrame,
  qu as maximizeFrameAt,
  Qu as mergeSpace,
  Bu as minimizeFrame,
  Ku as minimizeFrameAt,
  sn as movePanel,
  Bt as moveTab,
  lf as negateTerm,
  ot as nodeAt,
  qt as nodeTitle,
  xe as normalizeLayout,
  tt as normalizeSearch,
  ya as normalizeSizes,
  ul as onlySpace,
  Vt as oppositeTerm,
  at as panelIds,
  Ze as panelNode,
  Qa as panelTabs,
  Re as parseExpression,
  br as parseQuery,
  jo as presentParts,
  Bs as presentRow,
  Be as pressOptions,
  _d as providePaneContext,
  mr as provideShellContext,
  ed as provideWindowContext,
  zn as raiseFrame,
  Dt as raiseFrameAt,
  Vu as raisedPath,
  _s as reconcileFacets,
  Ju as reconcileLayout,
  xs as recordTerm,
  sr as refineExpression,
  vt as removePanel,
  ht as replaceAt,
  Za as resizeRect,
  as as resizeSplit,
  Un as resolveView,
  Ve as roleColumn,
  ys as roleColumns,
  _n as rootSpace,
  ma as row,
  Wl as rowKey,
  yn as sameTerm,
  Zn as scopeTerm,
  Jn as scopeTermFor,
  Ps as scopedEntity,
  Ua as serializeQuery,
  Ct as setActivePanel,
  Ou as setFrameRect,
  Ja as setFrameRectAt,
  fn as setSizesAt,
  hf as setSplitDirection,
  nt as sizesOf,
  vs as sortsFor,
  ke as spaceChrome,
  Tt as spaceTitle,
  ha as split,
  nr as splitExpression,
  ns as spreadTabs,
  xr as summarizeQuery,
  ia as summaryTerms,
  dn as swapPanels,
  fa as tabNode,
  Zt as tabPanels,
  Ss as termStanding,
  cl as tileFloat,
  mf as toFloat,
  gf as toTiled,
  pf as toggleMaximized,
  vf as toggleMinimized,
  mc as useColumns,
  Kr as useEntityCounts,
  Ic as useEntityPreviews,
  _f as usePaneContext,
  yf as usePaneMenu,
  gt as usePresentedRows,
  Cr as useQueryState,
  Hr as useRecordNames,
  Sr as useResults,
  we as useShellContext,
  ba as useWindowContext,
  Wa as withStanding,
  Es as withoutOwnScope,
  tr as withoutTerm
};
