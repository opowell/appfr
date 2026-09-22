import { ref as K, inject as Mt, provide as Kn, computed as v, toValue as Ft, shallowRef as Et, watch as ke, onScopeDispose as ls, defineComponent as re, onMounted as rs, onBeforeUnmount as De, resolveComponent as os, openBlock as f, createElementBlock as m, normalizeStyle as Me, Fragment as te, renderList as ve, toDisplayString as I, createCommentVNode as R, createElementVNode as b, createBlock as Q, nextTick as Kt, useId as Vn, unref as P, normalizeClass as Pt, createVNode as pe, withDirectives as pn, withKeys as Ye, withModifiers as Le, vModelText as vn, renderSlot as be, useSlots as Ht, createTextVNode as We, withCtx as Qe, reactive as Ta, resolveDynamicComponent as Wn, createSlots as rn, useModel as It, mergeModels as hn, Comment as Pl, Text as Al, getCurrentScope as Tl, h as zl } from "vue";
const is = Symbol("dc.routeAdapter");
function tt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Ll() {
  const e = typeof window < "u", t = K(e ? tt(window.location.search) : ""), n = K(e ? window.location.pathname : "/"), a = () => {
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
const cs = ["list", "cards", "grid", "images", "table", "links", "preview"], Zd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], nn = ["ok", "running", "queued", "review", "failed"], Jd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], ef = [480, 620, 760, 900, 1100], Rl = "cards", zn = "updated";
function us(e) {
  return typeof e == "string" && cs.includes(e);
}
const Fl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Hn(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function bt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function ds(e, t = {}) {
  const n = bt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function fs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function ps(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of fs(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Nl = { key: zn, label: zn };
function rt(e, t, n = null) {
  const a = ps(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === zn) ?? a[0] ?? Nl;
}
function Un(e) {
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
  for (const n of e?.facets ?? []) t[n.key] = Un(n);
  return t;
}
function vs(e) {
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
function hs(e) {
  return Object.values(e).some(vs);
}
function jn(e) {
  return e.entity === null && e.expr.trim() === "" && !hs(e.facets);
}
function tf(e) {
  return e.entity !== null;
}
function Xn(e) {
  return e.entity === null && e.view === "cards";
}
function Il(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Gn(e, t = {}) {
  const a = t.landing === "entity" ? ds(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && us(t.view) ? t.view : Rl,
    sort: rt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: At(a),
    page: 1
  };
}
const ms = ["entity", "sort", "dir", "expr", "facets"];
function za(e) {
  return ms.some((t) => t in e);
}
function gs(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : Un(a);
  }
  return n;
}
function on(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Ol(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function wt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Dl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Bl(e) {
  return String(e + 1).padStart(2, "0");
}
const Ln = "—";
function Ve(e, t) {
  return e.find((n) => n.role === t);
}
function _s(e, t) {
  return e.filter((n) => n.role === t);
}
function ql(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Kl = ["id", "entityKey", "entityLabel"];
function Oe(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Kl.includes(n))
      return t[n];
  }
}
function La(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Vl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Wl(e, t) {
  if (e == null || e === "") return Ln;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Ol(n) : String(e);
  }
  return t === "date" ? Dl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Ln : String(e);
}
function Ut(e, t) {
  const n = Oe(e, t);
  return e.format ? e.format(n, t) : Wl(n, e.kind);
}
function Hl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ys(e, t) {
  const n = Ut(e, t), a = Hl(Oe(e, t));
  return a && a !== n ? a : n;
}
function cn(e, t) {
  return e ? Ut(e, t) : "";
}
function Ra(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Ul = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Fa(e) {
  return [Ul[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Rn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const jl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
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
    const r = s.length > 1 && s.startsWith("-"), o = r ? s.slice(1) : s, i = r ? { negated: !0 } : {}, c = jl.exec(o);
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
const Mn = (e) => e.toLowerCase().replace(/\s+/g, ""), Gl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Yl(e, t, n) {
  const a = Mn(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key === e || c.field === e || c.label !== void 0 && Mn(c.label) === a
  );
  if (l) return Oe(l, t);
  const r = n.facets.find((c) => Mn(c.label) === a);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = Gl.find(([c]) => c === a)?.[1];
  if (o) {
    const c = Ve(s, o);
    if (c) return Oe(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = _s(s, "metric")[Number(i[1]) - 1];
    if (c) return Oe(c, t);
  }
}
function En(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Na(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Ql(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = Ve(r, o), c = i ? Oe(i, t) : void 0;
      return typeof c == "string" && En(c, e.value);
    });
  }
  const a = Yl(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (o) => e.comparator === "=" ? Na(String(o), e.value) : En(String(o), e.value)
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
    return e.comparator === "=" ? Na(String(a), e.value) : En(String(a), e.value);
  }
  const s = Number(e.value), l = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(l) ? null : Zl(e.comparator, l, s);
}
function Ia(e, t, n) {
  const a = Ql(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function Zl(e, t, n) {
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
function Oa(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
function Jl(e, t, n) {
  return e.length ? e.some((a) => {
    const s = /* @__PURE__ */ new Map();
    for (const l of a)
      Oa(l) && s.set(l.field, (s.get(l.field) ?? !1) || Ia(l, t, n));
    return a.every(
      (l) => Oa(l) ? s.get(l.field) === !0 : Ia(l, t, n)
    );
  }) : !0;
}
function Da(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function jt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Da(e.value) : `${t}${e.field}${e.comparator}${Da(e.value)}`;
}
function nf(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ft(e) {
  return e.filter((t) => t.length).map((t) => t.map(jt).join(" ")).join(" OR ");
}
function er(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function tr(e) {
  const t = Re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(jt).join(" ")
  };
}
function Ba(e, t) {
  return [...e.map(jt), t.trim()].filter(Boolean).join(" ");
}
const qa = (e, t) => e.toLowerCase() === t.toLowerCase();
function yn(e, t) {
  return !!e.negated == !!t.negated && ws(e, t);
}
function Vt(e, t) {
  return !!e.negated != !!t.negated && ws(e, t);
}
function ws(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && qa(e.value, t.value) : t.kind === "text" && qa(e.value, t.value);
}
function nr(e, t) {
  return t.filter((n) => !e.some((a) => yn(a, n)));
}
function Yn(e, t) {
  return ks(e, t, (n) => n);
}
function ar(e, t) {
  return ks(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Vt(s, l)))
  );
}
function ks(e, t, n) {
  const a = Re(e), s = Re(t);
  return a.length ? s.length ? ft(
    a.flatMap(
      (l) => s.map((r) => [...n(l, r), ...nr(l, r)])
    )
  ) : ft(a) : ft(s);
}
const Ka = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function bs(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const sr = 7, lr = 3;
function rr(e, t, n, a) {
  const s = (t * sr + on(n)) % a, l = [];
  for (let r = 0; r < Math.min(lr, a); r++)
    l.push(bs(e, (s + r) % a));
  return l;
}
function or(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? ir(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function ir(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function cr(e, t) {
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
      return Ka[n % Ka.length];
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
function ur(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], d = Math.floor(i / l.length), h = on(`${a}:${e.key}:${c[0]}:${i}`), w = bs(e.key, i), $ = new Date(s.getTime() - h % 900 * 36e5).toISOString(), x = {};
    for (const C of e.columns ?? []) {
      const g = C.field ?? C.key;
      if (!g || C.value) continue;
      const k = cr(C, {
        hash: on(`${h}:${g}`),
        sample: c,
        revision: d,
        updatedAt: $
      });
      k !== void 0 && (x[g] = k);
    }
    for (const C of e.facets)
      x[C.key] = or(C, on(`${h}:${C.key}`));
    for (const [C, g] of r)
      x[C] = g === e.key ? w : rr(g, i, C, n);
    o.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: x });
  }
  return o;
}
function dr(e, t) {
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
function fr(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", l = a === "date" || n.role === "updated";
  return (r, o) => {
    const i = Oe(n, r), c = Oe(n, o);
    return s ? Number(c ?? 0) - Number(i ?? 0) : l ? Date.parse(String(c ?? "")) - Date.parse(String(i ?? "")) : String(c ?? "").localeCompare(String(i ?? ""));
  };
}
function pr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = ur(a, { ...e, scopes: r });
    return t.set(a.key, o), o;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: r, offset: o }) {
      const i = Re(a.expr), c = l ? [l] : s.entities, d = [], h = [];
      for (const x of c)
        for (const C of n(x, s))
          d.push(C), (l ? dr(C, a.facets) : !0) && Jl(i, C, x) && h.push(C);
      const w = rt(l, a.sort, s), $ = h.sort(fr(fs(l, s), w.key));
      return a.dir === "asc" && $.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: $.slice(o, o + r),
        total: h.length,
        unfiltered: h.length === d.length
      };
    }
  };
}
function Qn(e, t) {
  return $s(e, t.id);
}
function $s(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Zn(e, t) {
  return Qn(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Jn(e, t) {
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
function xs(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Cs(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Re(t).flat();
  if (!n) return null;
  const a = Re(e).flat();
  return a.some((s) => yn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Vt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Ss(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Re(t).flat();
  if (!n) return e;
  const a = Re(e), s = a.map(
    (l) => l.filter((r) => !yn(r, n) && !Vt(r, n))
  );
  return s.every((l, r) => l.length === a[r]?.length) ? e : ft(s);
}
function Va(e, t, n) {
  return t ? n === null ? Ss(e, t) : Jn(e, n === "out" ? xs(t) : t) : e;
}
function Be(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey ? { exclude: !0 } : {};
}
function vr(e, t, n, a = {}) {
  const s = Zn(e, n);
  return Jn(t.expr, a.exclude ? xs(s) : s);
}
function Ms(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Re(t), s = a.map(
    (l) => l.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((l, r) => l.length === a[r]?.length) ? t : ft(s);
}
function Es(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const Ps = Symbol("dc.shellContext");
function hr(e) {
  return Kn(Ps, e), e;
}
function ye() {
  const e = Mt(Ps, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const ea = "e", ta = "v", na = "s", aa = "d", sa = "q", la = "p", ra = "f_", As = "*", mr = [
  ea,
  ta,
  na,
  aa,
  sa,
  la
], Fn = "..", Ts = ",", gr = [
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
  for (const [n, a] of gr) t = t.replace(n, a);
  return t;
}
function et(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function zs(e) {
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
function _r(e) {
  return mr.includes(e) || e.startsWith(ra);
}
function Wa(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function yr(e, t) {
  const n = et(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(Ts).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => a.has(l)) };
    }
    case "range": {
      const a = n.indexOf(Fn), s = (a === -1 ? n : n.slice(0, a)).trim(), l = (a === -1 ? "" : n.slice(a + Fn.length)).trim(), r = s === "" ? null : Number(s), o = l === "" ? null : Number(l);
      let i = r !== null && Number.isFinite(r) ? Wa(r, e.min, e.max) : null, c = o !== null && Number.isFinite(o) ? Wa(o, e.min, e.max) : null;
      return i !== null && c !== null && i > c && ([i, c] = [c, i]), { kind: "range", min: i, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function wr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(Ts) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Fn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function kr(e, t, n = {}) {
  const a = Gn(t, n), s = new Map(zs(e)), l = s.get(ea), r = l === void 0 ? a.entity : et(l), o = r === As ? null : bt(t, r), i = s.get(ta), c = i && us(et(i)) ? et(i) : a.view, d = s.get(na), h = rt(o, d ? et(d) : n.sort, t), w = s.get(aa), $ = w ? et(w) === "asc" ? "asc" : "desc" : a.dir, x = s.get(sa), C = s.get(la), g = C === void 0 ? 1 : Number(et(C)), k = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1, z = {};
  for (const E of o?.facets ?? []) {
    const L = s.get(`${ra}${E.key}`);
    z[E.key] = L === void 0 ? Un(E) : yr(E, L);
  }
  return {
    entity: o?.key ?? null,
    view: c,
    sort: h.key,
    dir: $,
    expr: x === void 0 ? "" : et(x),
    facets: gs(o, z),
    page: k
  };
}
function Ha(e, t, n = {}, a = "") {
  const s = Gn(t, n), l = bt(t, e.entity), r = zs(a).filter(([h]) => !_r(h)), o = [], i = (h, w) => o.push([h, Pn(w)]), c = l?.key ?? null;
  c !== s.entity && i(ea, c ?? As), e.view !== s.view && i(ta, e.view), e.sort !== s.sort && i(na, e.sort), e.dir !== s.dir && i(aa, e.dir), e.expr.trim() !== "" && i(sa, e.expr);
  for (const h of l?.facets ?? []) {
    const w = e.facets[h.key];
    if (!w) continue;
    const $ = wr(w, h);
    $ !== null && o.push([`${ra}${h.key}`, Pn($)]);
  }
  e.page > 1 && i(la, String(e.page));
  const d = [
    ...r.map(([h, w]) => [Pn(h), w]),
    ...o
  ];
  return d.length ? `?${d.map(([h, w]) => w === "" ? h : `${h}=${w}`).join("&")}` : "";
}
const mn = "entity", Wt = "expr";
function br(e, t) {
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
function oa(e, t) {
  const n = [];
  t && n.push({
    id: mn,
    label: `entity:${t.key}`,
    facetKey: mn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && vs(s) && n.push(...br(a, s));
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
function $r(e, t, n = null) {
  if (jn(e)) {
    const l = rt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = oa(e, t).filter((l) => l.facetKey !== Wt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function xr(e) {
  const { adapter: t } = e, n = v(() => Ft(e.schema)), a = v(() => Ft(e.defaults) ?? {}), s = v(() => kr(t.search.value, n.value, a.value)), l = v(() => bt(n.value, s.value.entity)), r = v(() => l.value ?? ds(n.value, a.value)), o = v(() => ps(l.value, n.value)), i = v(() => rt(l.value, s.value.sort, n.value)), c = (g, k) => {
    const z = Ha(g, n.value, a.value, t.search.value);
    z !== t.search.value && (k === "push" ? t.push(z) : t.replace(z));
  }, d = () => Ft(e.navigationMode) ?? "push", h = () => Ft(e.facetNavigationMode) ?? "replace", w = (g, k) => {
    const z = g.page ?? (za(g) ? 1 : s.value.page);
    c({ ...s.value, ...g, page: z }, k);
  }, $ = (g, k) => {
    const z = s.value.facets[g];
    if (!z) return;
    const E = { ...s.value.facets, [g]: k(z) };
    w({ facets: E }, h());
  }, x = (g) => {
    const k = g === null ? null : bt(n.value, g);
    return (k?.key ?? null) === s.value.entity ? {} : {
      entity: k?.key ?? null,
      sort: rt(k, s.value.sort, n.value).key,
      facets: At(k)
    };
  }, C = (g) => {
    const k = x(g);
    Object.keys(k).length && w(k, d());
  };
  return {
    query: s,
    entity: l,
    focus: r,
    sort: i,
    sorts: o,
    summary: v(() => $r(s.value, l.value, n.value)),
    terms: v(() => oa(s.value, l.value)),
    isPristine: v(() => jn(s.value)),
    isEverything: v(() => s.value.entity === null),
    hasFacets: v(() => hs(s.value.facets)),
    setEntity: C,
    clearEntity: () => C(null),
    setView(g) {
      w({ view: g }, d());
    },
    setSort(g) {
      w({ sort: rt(l.value, g, n.value).key }, d());
    },
    toggleDirection() {
      w({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(g) {
      w({ expr: g }, d());
    },
    narrow(g, k, z) {
      w({ expr: g, ...x(k), ...z ? { view: z } : {} }, d());
    },
    setPage(g, k) {
      w({ page: Math.max(1, Math.floor(g)) }, k ?? d());
    },
    setFacet(g, k) {
      $(g, () => k);
    },
    toggleChip(g, k) {
      $(g, (z) => z.kind !== "chips" ? z : { kind: "chips", selected: z.selected.includes(k) ? z.selected.filter((L) => L !== k) : [...z.selected, k] });
    },
    setRange(g, k, z) {
      $(g, (E) => E.kind === "range" ? { kind: "range", min: k, max: z } : E);
    },
    toggleFlag(g) {
      $(
        g,
        (k) => k.kind === "toggle" ? { kind: "toggle", on: !k.on } : k
      );
    },
    removeTerm(g) {
      if (g.facetKey === mn) {
        C(null);
        return;
      }
      if (g.facetKey === Wt) {
        const k = er(Re(s.value.expr), g.group ?? 0, g.index ?? 0);
        w({ expr: ft(k) }, d());
        return;
      }
      $(g.facetKey, (k) => k.kind === "chips" && g.option ? { kind: "chips", selected: k.selected.filter((z) => z !== g.option) } : k.kind === "range" ? { kind: "range", min: null, max: null } : k.kind === "toggle" ? { kind: "toggle", on: !1 } : k);
    },
    clearFilters() {
      w({ entity: null, expr: "", facets: At(null) }, d());
    },
    reset() {
      c(Gn(n.value, a.value), d());
    },
    hrefFor(g) {
      const k = { ...s.value, ...g };
      return k.page = g.page ?? (za(g) ? 1 : s.value.page), k.facets = gs(bt(n.value, k.entity), k.facets), `${t.path.value}${Ha(k, n.value, a.value, t.search.value)}`;
    }
  };
}
function Cr(e) {
  const t = Et([]), n = K(0), a = K(!1), s = Et(null);
  let l = 0, r = null;
  const o = v(() => (e.query.value.page - 1) * e.limit.value), i = v(() => Il(n.value, e.limit.value)), c = () => {
    const g = e.query.value, k = e.within?.value.trim(), z = Ms(e.entity.value, g.expr);
    return k ? { ...g, expr: Yn(k, z) } : z === g.expr ? g : { ...g, expr: z };
  }, d = (g) => {
    t.value = g.rows, n.value = g.total, s.value = null;
  }, h = (g) => {
    s.value = g, t.value = [], n.value = 0;
  }, w = (g, k) => {
    let z = !0;
    const E = () => g === l, L = () => {
      z && (z = !1, t.value = [], n.value = 0), s.value = null;
    };
    return {
      get open() {
        return E();
      },
      insert(F, H) {
        if (!E()) return;
        const y = Array.isArray(F) ? F : [F];
        if (!y.length) return;
        L();
        const A = [...t.value];
        A.splice(H ?? A.length, 0, ...y), t.value = k > 0 ? A.slice(0, k) : A, n.value += y.length;
      },
      set(F) {
        E() && (F.rows && (L(), t.value = k > 0 ? F.rows.slice(0, k) : F.rows, n.value = F.rows.length), F.total !== void 0 && (n.value = F.total));
      },
      close() {
        E() && (a.value = !1);
      },
      fail(F) {
        E() && (h(F), a.value = !1);
      }
    };
  }, $ = () => {
    const g = r;
    r = null, g?.();
  }, x = () => {
    const g = ++l;
    $();
    const k = {
      query: c(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, z = e.source.value;
    if (z.stream) {
      a.value = !0;
      try {
        r = z.stream(k, w(g, k.limit)) ?? null;
      } catch (L) {
        h(L), a.value = !1;
      }
      return;
    }
    let E;
    try {
      E = z.query(k);
    } catch (L) {
      h(L);
      return;
    }
    if (!(E instanceof Promise)) {
      d(E), a.value = !1;
      return;
    }
    a.value = !0, E.then((L) => {
      g === l && d(L);
    }).catch((L) => {
      g === l && h(L);
    }).finally(() => {
      g === l && (a.value = !1);
    });
  }, C = v(() => {
    const g = c();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(ms.map((z) => g[z]))}|${g.page}`;
  });
  return ke([e.source, C, e.limit], x, {
    immediate: !0
  }), ls(() => {
    l++, $();
  }, !0), { rows: t, total: n, offset: o, pageCount: i, pending: a, error: s, refresh: x };
}
const Ot = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Sr = ["aria-label"], Mr = ["role", "aria-label"], Er = ["data-dc-item"], Pr = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Ar = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Tr = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, zr = { class: "dc-menu__label dc-truncate" }, Lr = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Rr = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Fr = /* @__PURE__ */ re({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = K(null), r = K([]), o = K(null), i = K(null), c = K(null), d = K(!1), h = v(
      () => a.items.flatMap((y, A) => Ot(y) ? [A] : [])
    ), w = v(() => {
      const y = [{ entries: [] }];
      return a.items.forEach((A, O) => {
        A.heading ? y.push({ heading: A, entries: [] }) : y[y.length - 1]?.entries.push({ item: A, index: O });
      }), y.filter((A) => A.entries.length > 0);
    }), $ = K({ x: a.at.x, y: a.at.y });
    async function x() {
      $.value = { x: a.at.x, y: a.at.y }, await Kt();
      const y = l.value?.getBoundingClientRect();
      if (!y) return;
      const A = 8;
      let O = a.at.x, j = a.at.y;
      if (O + y.width > window.innerWidth - A) {
        const ue = a.at.mirrorX === void 0 ? null : a.at.mirrorX - y.width;
        O = ue !== null && ue >= A ? ue : window.innerWidth - y.width - A;
      }
      j + y.height > window.innerHeight - A && (j = window.innerHeight - y.height - A), $.value = { x: Math.max(A, O), y: Math.max(A, j) };
    }
    const C = v(() => ({ left: `${$.value.x}px`, top: `${$.value.y}px` }));
    function g(y) {
      o.value = y, y !== null && Kt(() => r.value[y]?.focus());
    }
    function k(y, A) {
      const O = h.value;
      if (O.length === 0) return null;
      if (y === null) return A === 1 ? O[0] ?? null : O[O.length - 1] ?? null;
      const j = O.indexOf(y);
      return j === -1 ? O[0] ?? null : O[(j + A + O.length) % O.length] ?? null;
    }
    function z(y, A) {
      if (!a.items[y]?.items?.length) return;
      const j = r.value[y]?.getBoundingClientRect(), ue = l.value?.getBoundingClientRect();
      !j || !ue || (c.value = { x: ue.right - 4, y: j.top - 4, mirrorX: ue.left + 4 }, i.value = y, d.value = A);
    }
    function E(y) {
      const A = i.value;
      i.value = null, c.value = null, y && A !== null && g(A);
    }
    function L(y) {
      const A = a.items[y];
      if (!(!A || !Ot(A))) {
        if (A.items?.length) {
          z(y, !0);
          return;
        }
        s("choose", A);
      }
    }
    function F(y) {
      const A = y.key;
      if (A === "Escape") {
        y.preventDefault(), y.stopPropagation(), i.value !== null ? E(!0) : s("dismiss");
        return;
      }
      if (A === "ArrowDown" || A === "ArrowUp") {
        y.preventDefault(), y.stopPropagation(), E(!1), g(k(o.value, A === "ArrowDown" ? 1 : -1));
        return;
      }
      if (A === "Home" || A === "End") {
        y.preventDefault(), y.stopPropagation(), E(!1), g(k(null, A === "Home" ? 1 : -1));
        return;
      }
      if (A === "ArrowRight") {
        const O = o.value;
        O !== null && a.items[O]?.items?.length && (y.preventDefault(), y.stopPropagation(), z(O, !0));
        return;
      }
      if (A === "ArrowLeft") {
        i.value !== null && (y.preventDefault(), y.stopPropagation(), E(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const O = o.value;
        if (O === null) return;
        y.preventDefault(), y.stopPropagation(), L(O);
      }
    }
    function H(y) {
      const A = a.items[y];
      !A || !Ot(A) || (i.value !== null && i.value !== y && E(!1), g(y), A.items?.length && z(y, !1));
    }
    return rs(() => {
      x(), a.autofocus && g(k(null, 1));
    }), ke(() => a.at, x, { deep: !0 }), ke(() => a.items, () => void x(), { deep: !0 }), De(() => {
      i.value = null;
    }), t({ root: l }), (y, A) => {
      const O = os("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Me(C.value),
        onKeydown: F
      }, [
        (f(!0), m(te, null, ve(w.value, (j, ue) => (f(), m("div", {
          key: `${ue}-${j.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: j.heading ? "group" : "none",
          "aria-label": j.heading?.label
        }, [
          j.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": j.heading.id
          }, I(j.heading.label), 9, Er)) : R("", !0),
          (f(!0), m(te, null, ve(j.entries, ({ item: Z, index: _e }) => (f(), m(te, {
            key: Z.id ?? `${_e}-${Z.label ?? ""}`
          }, [
            Z.separator ? (f(), m("div", Pr)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (xe) => {
                xe && (r.value[_e] = xe);
              },
              type: "button",
              class: "dc-menu__item",
              role: Z.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Z.checked === void 0 ? void 0 : Z.checked,
              "aria-haspopup": Z.items?.length ? "menu" : void 0,
              "aria-expanded": Z.items?.length ? i.value === _e : void 0,
              "aria-disabled": Z.disabled ? "true" : void 0,
              disabled: Z.disabled,
              "data-dc-item": Z.id,
              tabindex: "-1",
              onClick: (xe) => L(_e),
              onMouseenter: (xe) => H(_e)
            }, [
              b("span", Tr, I(Z.checked ? "✓" : ""), 1),
              b("span", zr, I(Z.label), 1),
              Z.shortcut ? (f(), m("span", Lr, I(Z.shortcut), 1)) : Z.items?.length ? (f(), m("span", Rr, "›")) : R("", !0)
            ], 40, Ar))
          ], 64))), 128))
        ], 8, Mr))), 128)),
        i.value !== null && c.value ? (f(), Q(O, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: c.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: A[0] || (A[0] = (j) => s("choose", j)),
          onDismiss: A[1] || (A[1] = (j) => E(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
      ], 44, Sr);
    };
  }
}), ie = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ia = /* @__PURE__ */ ie(Fr, [["__scopeId", "data-v-9b1413fa"]]), Nr = { class: "dc-pick" }, Ir = ["id"], Or = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Dr = { class: "dc-pick__label" }, Br = /* @__PURE__ */ re({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Vn() ?? "dc-pick", l = K(null), r = K(null), o = K(null), i = K(!1), c = v(() => o.value !== null), d = v(
      () => n.options.find((E) => E.key === n.modelValue) ?? n.options[0]
    ), h = v(
      () => n.options.map((E) => ({
        id: E.key,
        label: E.label,
        checked: E.key === n.modelValue
      }))
    ), w = v(
      () => o.value ? { maxHeight: `${window.innerHeight - o.value.y - 8}px` } : void 0
    );
    function $(E) {
      const L = l.value?.getBoundingClientRect();
      L && (o.value = { x: L.left, y: L.bottom + 4, mirrorX: L.right }, i.value = E, a("open"));
    }
    function x(E) {
      o.value = null, E && l.value?.focus();
    }
    function C() {
      c.value ? x(!0) : $(!1);
    }
    function g(E) {
      E.key !== "ArrowDown" && E.key !== "ArrowUp" || c.value || (E.preventDefault(), $(!0));
    }
    function k(E) {
      const L = E.target;
      L && (l.value?.contains(L) || r.value?.root?.contains(L) || x(!1));
    }
    ke(c, (E) => {
      E ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), De(() => window.removeEventListener("pointerdown", k, !0));
    function z(E) {
      x(!0), !(E.id === void 0 || E.id === n.modelValue) && a("update:modelValue", E.id);
    }
    return (E, L) => (f(), m("span", Nr, [
      b("span", {
        id: `${P(s)}-name`,
        class: "dc-pick__name"
      }, I(e.label), 9, Ir),
      b("button", {
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
        onKeydown: g
      }, [
        b("span", Dr, I(d.value?.label), 1)
      ], 42, Or),
      L[1] || (L[1] = b("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      o.value ? (f(), Q(ia, {
        key: 0,
        ref_key: "menu",
        ref: r,
        class: "dc-pick__list",
        style: Me(w.value),
        items: h.value,
        at: o.value,
        label: e.label,
        autofocus: i.value,
        onChoose: z,
        onDismiss: L[0] || (L[0] = (F) => x(!0))
      }, null, 8, ["style", "items", "at", "label", "autofocus"])) : R("", !0)
    ]));
  }
}), Ua = /* @__PURE__ */ ie(Br, [["__scopeId", "data-v-b2ce0fd5"]]);
function qr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = K(!0);
  let a = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++a, r = e.query.value, o = e.schema.value, i = e.entities.value, c = e.within?.value.trim() ?? "";
    n.value = r.expr.trim() === "" && !c;
    const d = /* @__PURE__ */ new Map();
    for (const h of i) {
      const w = Ms(h, r.expr), $ = c ? Yn(c, w) : w, x = e.source.value.query({
        query: { ...r, entity: h.key, expr: $, facets: At(h), page: 1 },
        schema: o,
        entity: h,
        limit: 0,
        offset: 0
      });
      x instanceof Promise ? (d.set(h.key, { total: 0, pending: !0 }), x.then((C) => {
        if (l !== a) return;
        const g = new Map(t.value);
        g.set(h.key, { total: C.total, pending: !1 }), t.value = g;
      })) : d.set(h.key, { total: x.total, pending: !1 });
    }
    t.value = d;
  } };
}
const Kr = 25, Ls = (e, t) => e.toLowerCase() === t.toLowerCase();
function Vr(e, t) {
  return e.find((n) => Ls(n.id, t));
}
function Wr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (o) => {
    if (o.facetKey !== Wt || !o.field || !o.value) return null;
    const i = Es(e.schema.value, o.field);
    return i ? { entity: i, id: o.value, key: `${i.key}:${o.value}` } : null;
  }, s = (o) => {
    const { entity: i, id: c } = o, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: $s(i, c) ?? "",
        facets: At(i),
        sort: rt(i, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Kr,
      offset: 0
    });
  }, l = (o, i) => {
    const c = cn(Ve(o.columns ?? [], "identity"), i);
    return c === Ln || Ls(c, i.id) ? "" : c;
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
      d.forEach((w, $) => {
        const { reference: x } = i[$], C = Vr(w.rows, x.id);
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
const Hr = ["data-dc-expanded"], Ur = { class: "dc-header__domain" }, jr = {
  key: 0,
  class: "dc-header__within"
}, Xr = ["title"], Gr = ["data-dc-more", "title"], Yr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Qr = ["title", "aria-label", "onClick"], Zr = ["onKeydown"], Jr = ["aria-expanded", "aria-controls"], eo = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, to = { class: "dc-header__sr" }, no = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, ao = ["disabled"], so = ["title"], lo = ["value", "onKeydown"], ro = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, oo = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, io = ["disabled"], co = {
  key: 1,
  class: "dc-header__actions"
}, uo = /* @__PURE__ */ re({
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
    const n = e, a = t, s = ye(), l = v(() => s.schema.value), r = v(
      () => s.hasFacets.value || !!s.query.value.expr.trim() || !!s.within.value
    ), o = v(() => l.value.formatCount ?? wt), i = qr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      entities: s.entities,
      within: s.within
    });
    function c(D) {
      if (n.hideCount) return D.count;
      if (D.key === s.query.value.entity && r.value) return o.value(s.total.value);
      if (i.pristine.value) return D.count;
      const M = i.counts.value.get(D.key);
      return M ? `${M.pending ? "~" : ""}${o.value(M.total)}` : D.count;
    }
    function d(D) {
      return `${D.label} · ${c(D)}`;
    }
    const h = v(() => [
      { key: "", label: "Everything" },
      ...s.entities.value.map((D) => ({ key: D.key, label: d(D) }))
    ]), w = v(() => {
      const D = s.within.value.trim();
      return D ? oa({ ...s.query.value, expr: D, facets: {} }, null) : [];
    }), $ = v(
      () => (n.views ?? [...cs]).map((D) => ({ key: D, label: Fl[D] }))
    ), x = v(() => Hn(s.query.value.view, n.views)), C = v(() => s.query.value.entity !== null);
    function g(D) {
      s.setView(D);
    }
    const k = v(() => {
      const D = s.entity.value, G = D?.keepsScope ? void 0 : D?.scope?.toLowerCase();
      return s.terms.value.filter((M) => M.facetKey !== mn).map((M, W, ae) => {
        const Ce = ae[W - 1];
        return {
          term: M,
          or: Ce?.group !== void 0 && M.group !== void 0 && M.group !== Ce.group,
          idle: !!G && M.field?.toLowerCase() === G
        };
      });
    }), z = Wr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...w.value, ...s.terms.value])
    });
    function E(D) {
      return Es(l.value, D)?.scopeLabel ?? D;
    }
    function L(D) {
      return D.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function F(D) {
      const G = z.nameOf(D);
      return G ? `${D.negated ? "-" : ""}${E(D.field)}: ${L(G)}` : D.label;
    }
    function H(D) {
      s.setEntity(D || null);
    }
    const y = K(""), A = K(null);
    function O() {
      const D = y.value.trim();
      D && (s.setExpression(ar(s.query.value.expr, D)), y.value = "");
    }
    function j() {
      y.value = "", A.value?.blur();
    }
    function ue(D) {
      if (y.value) return;
      const G = k.value.at(-1);
      G && (D.preventDefault(), s.removeTerm(G.term));
    }
    function Z(D) {
      D.target?.closest("button, select, label, input") || a("toggle");
    }
    const _e = K(null), xe = K("");
    function S() {
      const D = _e.value;
      if (!D) {
        xe.value = "";
        return;
      }
      const G = D.scrollLeft > 1, M = D.scrollWidth - D.clientWidth - D.scrollLeft > 1;
      xe.value = G && M ? "both" : G ? "start" : M ? "end" : "";
    }
    let q = null;
    ke(
      _e,
      (D) => {
        q?.disconnect(), q = null, S(), !(!D || typeof ResizeObserver > "u") && (q = new ResizeObserver(S), q.observe(D));
      },
      { flush: "post" }
    ), ke(k, S, { flush: "post" }), De(() => q?.disconnect());
    const U = v(() => s.query.value.page), se = v(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !Xn(s.query.value)
    ), me = v(
      () => `${s.pending.value ? "~" : ""}${wt(s.pageCount.value)}`
    ), Ee = v(() => {
      let D = `Page ${wt(U.value)} of ${me.value}`;
      const G = s.rows.value.length;
      if (G) {
        const M = s.offset.value + 1, W = `${s.pending.value ? "~" : ""}${wt(s.total.value)}`;
        D += ` — rows ${wt(M)} to ${wt(M + G - 1)} of ${W}`;
      }
      return n.pagesNote ? `${D}
${n.pagesNote}` : D;
    }), ze = K(null), Ue = v(() => ze.value ?? String(U.value)), je = v(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function Xe(D) {
      D.target.select();
    }
    function qe(D) {
      const G = D.target, M = G.value.replace(/[^0-9]/g, "");
      G.value !== M && (G.value = M), ze.value = M;
    }
    function Fe(D) {
      const G = D.target, M = Number(ze.value);
      ze.value = null;
      const W = Number.isFinite(M) && M >= 1 ? Math.min(Math.trunc(M), Math.max(1, s.pageCount.value)) : U.value;
      G.value = String(W), W !== U.value && s.setPage(W);
    }
    function Ke(D) {
      const G = D.target;
      ze.value = null, G.value = String(U.value), G.blur();
    }
    return (D, G) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      b("div", {
        class: "dc-header__trigger",
        onClick: Z
      }, [
        b("span", Ur, I(l.value.label), 1),
        w.value.length ? (f(), m("span", jr, [
          G[4] || (G[4] = b("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(te, null, ve(w.value, (M) => (f(), m("span", {
            key: `scope:${M.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: F(M)
          }, I(F(M)), 9, Xr))), 128))
        ])) : R("", !0),
        b("div", {
          ref_key: "termBar",
          ref: _e,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": xe.value,
          title: P(s).summary.value,
          onScroll: S
        }, [
          C.value ? (f(), Q(Ua, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": P(s).query.value.entity ?? "",
            options: h.value,
            onOpen: P(i).refresh,
            "onUpdate:modelValue": H
          }, null, 8, ["model-value", "options", "onOpen"])) : R("", !0),
          pe(Ua, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": x.value,
            options: $.value,
            "onUpdate:modelValue": g
          }, null, 8, ["model-value", "options"]),
          (f(!0), m(te, null, ve(k.value, (M) => (f(), m(te, {
            key: M.term.id
          }, [
            M.or ? (f(), m("span", Yr, "or")) : R("", !0),
            b("button", {
              type: "button",
              class: Pt(["dc-term dc-mono", { "dc-term--idle": M.idle }]),
              title: M.idle ? `Not applied to ${P(s).entity.value?.label} — remove ${F(M.term)}` : `Remove ${F(M.term)}`,
              "aria-label": `Remove ${F(M.term)}`,
              onClick: (W) => P(s).removeTerm(M.term)
            }, I(F(M.term)), 11, Qr)
          ], 64))), 128)),
          pn(b("input", {
            ref_key: "searchBox",
            ref: A,
            "onUpdate:modelValue": G[0] || (G[0] = (M) => y.value = M),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Ye(Le(O, ["prevent"]), ["enter"]),
              Ye(Le(j, ["prevent"]), ["esc"]),
              Ye(ue, ["backspace"])
            ]
          }, null, 40, Zr), [
            [vn, y.value]
          ])
        ], 40, Gr),
        b("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: G[1] || (G[1] = (M) => a("toggle"))
        }, [
          b("span", eo, I(e.expanded ? "▲" : "▼"), 1),
          b("span", to, I(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Jr)
      ]),
      se.value ? (f(), m("nav", no, [
        b("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: U.value <= 1,
          onClick: G[2] || (G[2] = (M) => P(s).setPage(U.value - 1))
        }, [...G[5] || (G[5] = [
          b("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, ao),
        b("span", {
          class: "dc-header__page dc-mono",
          title: Ee.value
        }, [
          b("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Me({ width: je.value }),
            value: Ue.value,
            onFocus: Xe,
            onInput: qe,
            onKeydown: [
              Ye(Le(Fe, ["prevent"]), ["enter"]),
              Ye(Le(Ke, ["prevent"]), ["esc"])
            ],
            onBlur: Fe
          }, null, 44, lo),
          b("span", ro, "/ " + I(me.value), 1)
        ], 8, so),
        b("span", oo, I(Ee.value), 1),
        b("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: U.value >= P(s).pageCount.value,
          onClick: G[3] || (G[3] = (M) => P(s).setPage(U.value + 1))
        }, [...G[6] || (G[6] = [
          b("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, io)
      ])) : R("", !0),
      D.$slots.actions ? (f(), m("div", co, [
        be(D.$slots, "actions", {}, void 0, !0)
      ])) : R("", !0)
    ], 8, Hr));
  }
}), Rs = /* @__PURE__ */ ie(uo, [["__scopeId", "data-v-270c68d0"]]), fo = { class: "dc-facet" }, po = ["id"], vo = { class: "dc-facet__body" }, ho = ["aria-labelledby"], mo = ["aria-pressed", "data-dc-active", "onClick"], go = ["aria-labelledby"], _o = ["aria-label", "placeholder", "onKeydown"], yo = ["aria-label", "placeholder", "onKeydown"], wo = ["aria-checked"], ko = { class: "dc-switch__text" }, bo = ["data-dc-active"], $o = /* @__PURE__ */ re({
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
      const w = s.value.has(h) ? n.value.selected.filter(($) => $ !== h) : [...n.value.selected, h];
      a("update", { kind: "chips", selected: w });
    }
    const r = K(""), o = K("");
    ke(
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
      const $ = Number(w);
      return Number.isFinite($) ? $ : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const h = i(r.value), w = i(o.value);
      h === n.value.min && w === n.value.max || a("update", { kind: "range", min: h, max: w });
    }
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (h, w) => (f(), m("div", fo, [
      b("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, I(e.facet.label), 9, po),
      b("div", vo, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), m(te, null, ve(e.facet.options, ($) => (f(), m("button", {
            key: $,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has($),
            "data-dc-active": s.value.has($) ? "true" : "false",
            onClick: (x) => l($)
          }, I($), 9, mo))), 128))
        ], 8, ho)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          pn(b("input", {
            "onUpdate:modelValue": w[0] || (w[0] = ($) => r.value = $),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(Le(c, ["prevent"]), ["enter"])
          }, null, 40, _o), [
            [vn, r.value]
          ]),
          w[2] || (w[2] = b("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          pn(b("input", {
            "onUpdate:modelValue": w[1] || (w[1] = ($) => o.value = $),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(Le(c, ["prevent"]), ["enter"])
          }, null, 40, yo), [
            [vn, o.value]
          ])
        ], 8, go)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          b("span", ko, I(e.facet.text), 1),
          b("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...w[3] || (w[3] = [
            b("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, bo)
        ], 8, wo)) : R("", !0)
      ])
    ]));
  }
}), Fs = /* @__PURE__ */ ie($o, [["__scopeId", "data-v-36d1334b"]]), xo = ["id"], Co = { class: "dc-panel__section dc-panel__rows" }, So = { class: "dc-panel__row" }, Mo = ["for"], Eo = ["title", "aria-label", "onClick"], Po = ["id", "placeholder", "onKeydown"], Ao = { class: "dc-panel__actions" }, To = ["disabled"], zo = {
  key: 0,
  class: "dc-panel__section"
}, Lo = /* @__PURE__ */ re({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Ht(), s = ye(), l = v(() => tr(s.query.value.expr)), r = v(() => l.value.parts.map(jt)), o = K(l.value.text), i = K(null);
    ke(
      () => l.value.text,
      (C) => {
        o.value = C;
      }
    );
    const c = v(() => o.value !== l.value.text);
    function d() {
      c.value && s.setExpression(Ba(l.value.parts, o.value)), n("close");
    }
    function h(C) {
      const { parts: g, text: k } = l.value;
      s.setExpression(Ba(g.filter((z, E) => E !== C), k));
    }
    function w(C) {
      const { parts: g } = l.value;
      o.value || !g.length || (C.preventDefault(), h(g.length - 1));
    }
    function $() {
      o.value = "", s.clearFilters();
    }
    function x(C, g) {
      s.setFacet(C, g);
    }
    return Kt(() => i.value?.focus()), (C, g) => (f(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: g[2] || (g[2] = Ye(Le((k) => n("close"), ["stop"]), ["esc"]))
    }, [
      b("section", Co, [
        b("div", So, [
          b("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, Mo),
          b("div", {
            class: "dc-field",
            onMousedown: g[1] || (g[1] = Le((k) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(te, null, ve(r.value, (k, z) => (f(), m("button", {
              key: `${z}:${k}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${k}`,
              "aria-label": `Remove ${k}`,
              onClick: (E) => h(z)
            }, I(k), 9, Eo))), 128)),
            pn(b("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": g[0] || (g[0] = (k) => o.value = k),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : P(s).schema.value.placeholder,
              onKeydown: [
                Ye(Le(d, ["prevent"]), ["enter"]),
                Ye(w, ["backspace"])
              ]
            }, null, 40, Po), [
              [vn, o.value]
            ])
          ], 32)
        ]),
        P(s).entity.value ? (f(!0), m(te, { key: 0 }, ve(P(s).entity.value.facets, (k) => (f(), Q(Fs, {
          key: k.key,
          facet: k,
          value: P(s).query.value.facets[k.key],
          onUpdate: (z) => x(k.key, z)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : R("", !0),
        b("div", Ao, [
          b("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          b("button", {
            type: "button",
            class: "dc-button",
            disabled: P(s).isPristine.value && !c.value,
            onClick: $
          }, " Reset ", 8, To)
        ])
      ]),
      a["panel-section"] ? (f(), m("section", zo, [
        be(C.$slots, "panel-section", {}, void 0, !0)
      ])) : R("", !0)
    ], 40, xo));
  }
}), Ns = /* @__PURE__ */ ie(Lo, [["__scopeId", "data-v-2642c02d"]]), Ro = ["checked", "indeterminate"], Is = /* @__PURE__ */ re({
  __name: "PageTick",
  setup(e) {
    const t = ye(), n = v(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = v(
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
    }, null, 40, Ro));
  }
}), Fo = {
  key: 0,
  class: "dc-actions"
}, No = {
  key: 0,
  class: "dc-actions__select"
}, Io = {
  key: 0,
  class: "dc-actions__all"
}, Oo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Do = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Bo = { class: "dc-actions__ops" }, qo = ["disabled"], Ko = ["disabled"], Vo = /* @__PURE__ */ re({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), a = v(() => n.entity.value), s = v(() => !Xn(n.query.value)), l = v(() => s.value && n.selectable.value), r = v(
      () => Hn(n.query.value.view, t.views) === "table"
    ), o = v(
      () => s.value && (l.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), i = v(() => n.selection.value.ids.length), c = v(() => i.value ? `${i.value} selected` : r.value ? "None selected" : "Select all");
    function d(h) {
      return i.value ? `${h} ${i.value}` : h;
    }
    return (h, w) => o.value ? (f(), m("div", Fo, [
      l.value ? (f(), m("div", No, [
        r.value ? (f(), m("span", Do, I(c.value), 1)) : (f(), m("label", Io, [
          pe(Is),
          b("span", Oo, I(c.value), 1)
        ])),
        i.value ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: w[0] || (w[0] = ($) => P(n).clearSelection())
        }, " Clear ")) : R("", !0)
      ])) : R("", !0),
      b("div", Bo, [
        a.value?.create ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: w[1] || (w[1] = ($) => P(n).create(a.value))
        }, [
          w[4] || (w[4] = b("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + I(a.value.create), 1)
        ])) : R("", !0),
        a.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !i.value,
          onClick: w[2] || (w[2] = ($) => P(n).duplicate())
        }, I(d(a.value.duplicate)), 9, qo)) : R("", !0),
        a.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !i.value,
          onClick: w[3] || (w[3] = ($) => P(n).delete())
        }, I(d(a.value.delete)), 9, Ko)) : R("", !0)
      ])
    ])) : R("", !0);
  }
}), Os = /* @__PURE__ */ ie(Vo, [["__scopeId", "data-v-03ff2a91"]]);
function Wo(e, t) {
  if (!e) return null;
  const n = Oe(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Ho(e, t) {
  const n = Ve(t, "state"), a = Ve(t, "tint");
  return {
    identity: cn(Ve(t, "identity"), e),
    reference: cn(Ve(t, "reference"), e),
    metrics: _s(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ut(s, e)
    })),
    state: n ? Oe(n, e) ?? null : null,
    updated: cn(Ve(t, "updated"), e),
    image: Wo(Ve(t, "image"), e),
    tint: a ? Oe(a, e) ?? null : null
  };
}
function Ds(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Vl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: Bl(t),
    parts: Ho(e, l),
    pinned: a,
    selected: s
  };
}
function gt() {
  const e = ye(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, a) => Ds(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Uo = ["data-dc-status"], jo = /* @__PURE__ */ re({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, I(e.status), 9, Uo));
  }
}), Xt = /* @__PURE__ */ ie(jo, [["__scopeId", "data-v-23e59fbf"]]), Xo = ["title"], Go = { key: 1 }, Yo = /* @__PURE__ */ re({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ye(), a = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), s = v(() => t.column.label ?? ""), l = v(() => Ut(t.column, t.entry.row));
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
      be(o.$slots, "default", {}, () => [
        We(I(l.value), 1)
      ], !0)
    ], 8, Xo)) : (f(), m("span", Go, [
      be(o.$slots, "default", {}, () => [
        We(I(l.value), 1)
      ], !0)
    ]));
  }
}), Gt = /* @__PURE__ */ ie(Yo, [["__scopeId", "data-v-f2501b17"]]), Qo = ["data-dc-active", "aria-pressed", "aria-label"], Zo = /* @__PURE__ */ re({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ye();
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
    }, I(e.pinned ? "★" : "☆"), 9, Qo));
  }
}), ca = /* @__PURE__ */ ie(Zo, [["__scopeId", "data-v-ef63d763"]]), Jo = ["src"], ei = /* @__PURE__ */ re({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = K(!1);
    return ke(
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
    }, null, 40, Jo)) : R("", !0);
  }
}), wn = /* @__PURE__ */ ie(ei, [["__scopeId", "data-v-afaab300"]]), ti = ["data-dc-standing", "title", "aria-label"], ni = /* @__PURE__ */ re({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), a = v(() => Qn(t.entry.entity, t.entry.row)), s = v(() => Cs(n.query.value.expr, a.value)), l = v(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(o) {
      o.stopPropagation(), n.setExpression(Ss(n.query.value.expr, a.value));
    }
    return (o, i) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, I(s.value === "in" ? "+" : "−"), 9, ti)) : R("", !0);
  }
}), kn = /* @__PURE__ */ ie(ni, [["__scopeId", "data-v-4b8d4166"]]), ai = ["data-dc-pending", "title", "aria-label"], si = /* @__PURE__ */ re({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), a = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = K(null);
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
    }, " → ", 40, ai)) : R("", !0);
  }
}), Yt = /* @__PURE__ */ ie(si, [["__scopeId", "data-v-9efd42ac"]]), li = ["checked", "aria-label"], _t = /* @__PURE__ */ re({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ye();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, l) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, li));
  }
}), ri = { class: "dc-cards" }, oi = { class: "dc-card__top dc-mono" }, ii = { class: "dc-card__lead" }, ci = {
  key: 1,
  class: "dc-card__entity"
}, ui = { class: "dc-card__top-right" }, di = ["onClick"], fi = { class: "dc-card__names" }, pi = { class: "dc-card__primary" }, vi = { class: "dc-card__secondary dc-mono" }, hi = { class: "dc-card__metrics dc-mono" }, mi = {
  key: 0,
  class: "dc-card__date"
}, gi = /* @__PURE__ */ re({
  __name: "CardsView",
  setup(e) {
    const t = ye(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), m("div", ri, [
      (f(!0), m(te, null, ve(P(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-card"
      }, [
        b("div", oi, [
          b("span", ii, [
            P(t).selectable.value ? (f(), Q(_t, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : R("", !0),
            We(" " + I(r.ordinal) + " ", 1),
            a.value ? (f(), m("span", ci, I(r.entityLabel), 1)) : R("", !0)
          ]),
          b("span", ui, [
            r.parts.state ? (f(), Q(Xt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : R("", !0),
            pe(kn, { entry: r }, null, 8, ["entry"]),
            pe(Yt, { entry: r }, null, 8, ["entry"]),
            P(t).pinnable.value ? (f(), Q(ca, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : R("", !0)
          ])
        ]),
        b("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => P(t).activate(r.row, P(Be)(o))
        }, [
          r.parts.image ? (f(), Q(wn, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : R("", !0),
          b("span", fi, [
            b("span", pi, I(r.parts.identity), 1),
            b("span", vi, I(r.parts.reference), 1)
          ])
        ], 8, di),
        b("div", hi, [
          (f(!0), m(te, null, ve(r.parts.metrics.slice(0, 2), (o) => (f(), Q(Gt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: Qe(() => [
              We(I(o.label) + " " + I(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), m("span", mi, I(r.parts.updated), 1)) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Bs = /* @__PURE__ */ ie(gi, [["__scopeId", "data-v-28581543"]]), _i = { class: "dc-grid" }, yi = ["onClick"], wi = { class: "dc-tile__scrim" }, ki = { class: "dc-tile__top dc-mono" }, bi = { class: "dc-tile__chip" }, $i = { class: "dc-tile__caption" }, xi = { class: "dc-tile__secondary dc-truncate" }, Ci = { class: "dc-tile__primary" }, Si = /* @__PURE__ */ re({
  __name: "GridView",
  setup(e) {
    const t = ye(), n = gt();
    return (a, s) => (f(), m("div", _i, [
      (f(!0), m(te, null, ve(P(n), (l) => (f(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        b("button", {
          type: "button",
          class: "dc-tile",
          style: Me({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => P(t).activate(l.row, P(Be)(r))
        }, [
          l.parts.image ? (f(), Q(wn, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : R("", !0),
          b("span", wi, [
            b("span", ki, [
              b("span", bi, I(l.ordinal), 1)
            ]),
            b("span", $i, [
              b("span", xi, I(l.parts.reference), 1),
              b("span", Ci, I(l.parts.identity), 1)
            ])
          ])
        ], 12, yi),
        P(t).selectable.value ? (f(), Q(_t, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0)
      ]))), 128))
    ]));
  }
}), qs = /* @__PURE__ */ ie(Si, [["__scopeId", "data-v-7df25d40"]]);
function ja(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Mi(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const r = [];
  let o = [], i = 0;
  for (const c of e) {
    const d = Math.max(t(c), Number.EPSILON), h = ja(i + d, o.length + 1, a, l);
    if (h > s) {
      o.push(c), i += d;
      continue;
    }
    const w = o.length ? ja(i, o.length, a, l) : 1 / 0;
    w - s < s - h ? (r.push({ items: o, height: w, filled: !0 }), o = [c], i = d) : (r.push({ items: [...o, c], height: h, filled: !0 }), o = [], i = 0);
  }
  return o.length && r.push({ items: o, height: s, filled: !1 }), r;
}
const Ei = { class: "dc-images" }, Pi = ["title", "aria-label", "onClick"], Ai = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Ti = 240, an = 8, zi = 1, Li = /* @__PURE__ */ re({
  __name: "ImagesView",
  setup(e) {
    const t = ye(), n = gt(), a = Ta(/* @__PURE__ */ new Map()), s = Ta(/* @__PURE__ */ new Set());
    function l(x, C) {
      const g = C.target;
      g.naturalWidth > 0 && g.naturalHeight > 0 && a.set(x, { width: g.naturalWidth, height: g.naturalHeight });
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
      return C ? C.width / C.height : zi;
    }
    const c = K(null), d = K(0);
    let h = null;
    function w() {
      d.value = c.value?.clientWidth ?? 0;
    }
    rs(() => {
      w(), !(!c.value || typeof ResizeObserver > "u") && (h = new ResizeObserver(w), h.observe(c.value));
    }), De(() => {
      h?.disconnect(), h = null;
    });
    const $ = v(() => {
      const x = Mi(n.value, i, {
        width: d.value,
        height: Ti,
        gap: an
      }), C = [];
      let g = 0;
      for (const k of x) {
        let z = 0;
        for (const E of k.items) {
          const L = i(E) * k.height, F = o(E), H = F !== void 0 && F.height < k.height;
          C.push({
            entry: E,
            style: {
              top: `${g}px`,
              left: `${z}px`,
              width: `${L}px`,
              height: `${k.height}px`
            },
            picture: H ? { width: `${F.width}px`, height: `${F.height}px` } : { width: "100%", height: "100%" }
          }), z += L + an;
        }
        g += k.height + an;
      }
      return { boxes: C, height: x.length ? g - an : 0 };
    });
    return (x, C) => (f(), m("div", Ei, [
      b("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Me({ height: `${$.value.height}px` })
      }, [
        (f(!0), m(te, null, ve($.value.boxes, ({ entry: g, style: k, picture: z }) => (f(), m("div", {
          key: g.key,
          class: "dc-images__cell",
          style: Me(k)
        }, [
          b("button", {
            type: "button",
            class: "dc-images__open",
            title: g.parts.identity,
            "aria-label": g.parts.identity,
            onClick: (E) => P(t).activate(g.row, P(Be)(E))
          }, [
            r(g) ? (f(), Q(wn, {
              key: 0,
              class: "dc-images__picture",
              style: Me(z),
              src: r(g),
              onLoad: (E) => l(r(g), E),
              onError: (E) => s.add(r(g))
            }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), m("span", Ai, I(g.parts.identity), 1))
          ], 8, Pi),
          P(t).selectable.value ? (f(), Q(_t, {
            key: 0,
            class: "dc-images__tick",
            row: g.row,
            selected: g.selected,
            name: g.parts.identity
          }, null, 8, ["row", "selected", "name"])) : R("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), Ks = /* @__PURE__ */ ie(Li, [["__scopeId", "data-v-676e0f1d"]]), Ri = { class: "dc-links" }, Fi = ["onClick"], Ni = { class: "dc-link__primary dc-truncate" }, Ii = { class: "dc-link__secondary dc-mono dc-truncate" }, Oi = /* @__PURE__ */ re({
  __name: "LinksView",
  setup(e) {
    const t = ye(), n = gt();
    return (a, s) => (f(), m("div", Ri, [
      (f(!0), m(te, null, ve(P(n), (l) => (f(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (f(), Q(_t, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        b("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => P(t).activate(l.row, P(Be)(r))
        }, [
          b("span", Ni, I(l.parts.identity), 1),
          b("span", Ii, I(l.parts.reference), 1)
        ], 8, Fi)
      ]))), 128))
    ]));
  }
}), Vs = /* @__PURE__ */ ie(Oi, [["__scopeId", "data-v-08d0266c"]]), Di = {
  class: "dc-list",
  role: "list"
}, Bi = ["onClick"], qi = { class: "dc-list__ordinal dc-mono" }, Ki = { class: "dc-list__identity" }, Vi = { class: "dc-list__primary dc-truncate" }, Wi = { class: "dc-list__secondary dc-mono dc-truncate" }, Hi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Ui = { class: "dc-list__metrics dc-mono" }, ji = { class: "dc-list__trailing" }, Xi = /* @__PURE__ */ re({
  __name: "ListView",
  setup(e) {
    const t = ye(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), m("div", Di, [
      (f(!0), m(te, null, ve(P(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (f(), Q(_t, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        b("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => P(t).activate(r.row, P(Be)(o))
        }, [
          b("span", qi, I(r.ordinal), 1),
          b("span", Ki, [
            b("span", Vi, I(r.parts.identity), 1),
            b("span", Wi, I(r.parts.reference), 1)
          ])
        ], 8, Bi),
        a.value ? (f(), m("span", Hi, I(r.entityLabel), 1)) : R("", !0),
        b("span", Ui, [
          (f(!0), m(te, null, ve(r.parts.metrics.slice(0, 2), (o) => (f(), Q(Gt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        b("span", ji, [
          r.parts.state ? (f(), Q(Xt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : R("", !0),
          pe(kn, { entry: r }, null, 8, ["entry"]),
          pe(Yt, { entry: r }, null, 8, ["entry"]),
          P(t).pinnable.value ? (f(), Q(ca, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Nn = /* @__PURE__ */ ie(Xi, [["__scopeId", "data-v-11b9f46c"]]), Gi = { class: "dc-preview" }, Yi = { class: "dc-preview__pager dc-mono" }, Qi = ["disabled"], Zi = { "aria-live": "polite" }, Ji = ["disabled"], ec = {
  key: 0,
  class: "dc-preview__card"
}, tc = ["src"], nc = { class: "dc-preview__body" }, ac = { class: "dc-preview__top" }, sc = { class: "dc-preview__badges" }, lc = { class: "dc-preview__entity dc-mono" }, rc = { class: "dc-preview__marks" }, oc = { class: "dc-preview__primary" }, ic = { class: "dc-preview__secondary dc-mono" }, cc = { class: "dc-preview__fields" }, uc = { class: "dc-preview__key" }, dc = { class: "dc-preview__value dc-mono" }, fc = /* @__PURE__ */ re({
  __name: "PreviewView",
  setup(e) {
    const t = ye(), n = gt(), a = K(0);
    ke(n, (i) => {
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
    return (i, c) => (f(), m("div", Gi, [
      b("div", Yi, [
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => o(-1))
        }, " ‹ ", 8, Qi),
        b("span", Zi, I(r.value), 1),
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= P(n).length - 1,
          onClick: c[1] || (c[1] = (d) => o(1))
        }, " › ", 8, Ji)
      ]),
      s.value ? (f(), m("div", ec, [
        b("div", {
          class: "dc-preview__media",
          style: Me({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), m("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, tc)) : (f(), m(te, { key: 1 }, [
            We(" preview ")
          ], 64))
        ], 4),
        b("div", nc, [
          b("div", ac, [
            b("span", sc, [
              P(t).selectable.value ? (f(), Q(_t, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : R("", !0),
              s.value.parts.state ? (f(), Q(Xt, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : R("", !0),
              b("span", lc, I(s.value.entityLabel), 1)
            ]),
            b("span", rc, [
              pe(kn, { entry: s.value }, null, 8, ["entry"]),
              pe(Yt, { entry: s.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (f(), Q(ca, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : R("", !0)
            ])
          ]),
          b("div", null, [
            b("div", oc, I(s.value.parts.identity), 1),
            b("div", ic, I(s.value.parts.reference), 1)
          ]),
          b("dl", cc, [
            (f(!0), m(te, null, ve(l.value, (d) => (f(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              b("dt", uc, I(d.key), 1),
              b("dd", dc, [
                d.column && s.value ? (f(), Q(Gt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), m(te, { key: 1 }, [
                  We(I(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          b("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: c[2] || (c[2] = (d) => P(t).activate(s.value.row, P(Be)(d)))
          }, " Open record → ")
        ])
      ])) : R("", !0)
    ]));
  }
}), Ws = /* @__PURE__ */ ie(fc, [["__scopeId", "data-v-6be41155"]]);
function pc() {
  const e = ye();
  return v(() => ql(e.schema.value, e.entity.value));
}
const vc = ["title"], hc = {
  key: 5,
  class: "dc-cell__text"
}, mc = /* @__PURE__ */ re({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), a = v(() => t.column.kind ?? "text"), s = v(() => Oe(t.column, t.entry.row)), l = v(
      () => a.value === "ordinal" ? t.entry.ordinal : Ut(t.column, t.entry.row)
    ), r = v(() => s.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => Rn(t.column)), c = v(() => ys(t.column, t.entry.row));
    function d(h) {
      if (!o.value) return;
      h.stopPropagation();
      const w = Be(h);
      t.column.click?.(t.entry.row, w), t.column.activate && n.activate(t.entry.row, w);
    }
    return (h, w) => a.value === "component" && e.column.component ? (f(), Q(Wn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), Q(Xt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), Q(wn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Me({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), Q(Gt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), m("button", {
      key: 4,
      type: "button",
      class: Pt(["dc-table__open", { "dc-truncate": i.value }]),
      title: c.value,
      onClick: d
    }, I(l.value), 11, vc)) : (f(), m("span", hc, I(l.value), 1));
  }
}), Xa = /* @__PURE__ */ ie(mc, [["__scopeId", "data-v-70ba8aa2"]]), gc = ["aria-label"], _c = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], yc = /* @__PURE__ */ re({
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
      (f(!0), m(te, null, ve(s.value, (c) => (f(), m("button", {
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
      }, I(c.sign), 9, _c))), 128))
    ], 8, gc));
  }
}), Ga = /* @__PURE__ */ ie(yc, [["__scopeId", "data-v-adaa8412"]]), wc = {
  key: 0,
  class: "dc-table__none"
}, kc = { class: "dc-table__detail" }, bc = ["data-dc-wrap"], $c = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, xc = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Cc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Sc = ["onClick"], Mc = {
  key: 2,
  class: "dc-table__head"
}, Ec = ["onClick"], Pc = {
  key: 0,
  class: "dc-table__pick"
}, Ac = {
  key: 1,
  class: "dc-table__standing"
}, Tc = ["data-dc-align", "data-dc-hide", "title"], zc = {
  key: 0,
  class: "dc-table__name"
}, Lc = /* @__PURE__ */ re({
  __name: "TableView",
  setup(e) {
    const t = ye(), n = gt(), a = pc(), s = v(
      () => a.value.find((y) => y.scope)
    ), l = v(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((y) => y.scope)
    ), r = (y) => Qn(y.entity, y.row), o = (y) => Cs(t.query.value.expr, r(y));
    function i(y, A) {
      t.setExpression(Va(t.query.value.expr, r(y), A));
    }
    const c = v(() => {
      const y = n.value.filter((O) => r(O) !== null), A = y.filter((O) => O.selected);
      return A.length ? A : y;
    }), d = v(() => c.value.some((y) => y.selected)), h = v(() => {
      const y = c.value[0];
      return y ? o(y) : null;
    }), w = v(
      () => c.value.some((y) => o(y) !== h.value)
    ), $ = v(
      () => d.value ? "the ticked rows" : "every row on this page"
    );
    function x(y) {
      t.setExpression(
        c.value.reduce(
          (A, O) => Va(A, r(O), y),
          t.query.value.expr
        )
      );
    }
    const C = v(
      () => a.value.some((y) => y.kind === "image" || y.height !== void 0)
    );
    function g(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const k = v(() => t.entity.value?.label ?? "The result set"), z = v(() => new Set(t.sorts.value.map((y) => y.key))), E = (y) => y.sort !== void 0 && z.value.has(y.sort), L = (y) => {
      if (E(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function F(y) {
      return [
        Fa(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        Rn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function H(y, A) {
      if (!(!Rn(y) || y.activate || y.click))
        return ys(y, A.row);
    }
    return (y, A) => P(a).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": C.value ? "" : void 0
    }, [
      b("thead", null, [
        b("tr", null, [
          P(t).selectable.value ? (f(), m("th", $c, [
            pe(Is)
          ])) : R("", !0),
          l.value ? (f(), m("th", xc, [
            c.value.length ? (f(), Q(Ga, {
              key: 0,
              standing: h.value,
              mixed: w.value,
              name: $.value,
              onSet: x
            }, null, 8, ["standing", "mixed", "name"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), m(te, null, ve(P(a), (O, j) => (f(), m("th", {
            key: P(La)(O, j),
            scope: "col",
            class: Pt(P(Fa)(O)),
            style: Me({ width: O.width }),
            "data-dc-align": P(Ra)(O),
            "data-dc-hide": O.hideBelow,
            "aria-sort": L(O),
            title: O.hint
          }, [
            E(O) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (ue) => g(O.sort)
            }, I(O.label), 9, Sc)) : (f(), m(te, { key: 1 }, [
              We(I(O.label), 1)
            ], 64)),
            O.header ? (f(), m("span", Mc, [
              (f(), Q(Wn(O.header), {
                column: O,
                entity: P(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : R("", !0)
          ], 14, Cc))), 128))
        ])
      ]),
      b("tbody", null, [
        (f(!0), m(te, null, ve(P(n), (O) => (f(), m("tr", {
          key: O.key,
          class: "dc-table__row",
          onClick: (j) => P(t).activate(O.row, P(Be)(j))
        }, [
          P(t).selectable.value ? (f(), m("td", Pc, [
            pe(_t, {
              row: O.row,
              selected: O.selected,
              name: O.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : R("", !0),
          l.value ? (f(), m("td", Ac, [
            r(O) !== null ? (f(), Q(Ga, {
              key: 0,
              standing: o(O),
              name: O.parts.identity,
              onSet: (j) => i(O, j)
            }, null, 8, ["standing", "name", "onSet"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), m(te, null, ve(P(a), (j, ue) => (f(), m("td", {
            key: P(La)(j, ue),
            class: Pt(F(j)),
            "data-dc-align": P(Ra)(j),
            "data-dc-hide": j.hideBelow,
            title: H(j, O)
          }, [
            j === s.value ? (f(), m("span", zc, [
              pe(Xa, {
                column: j,
                entry: O
              }, null, 8, ["column", "entry"]),
              pe(Yt, { entry: O }, null, 8, ["entry"])
            ])) : (f(), Q(Xa, {
              key: 1,
              column: j,
              entry: O
            }, null, 8, ["column", "entry"]))
          ], 10, Tc))), 128))
        ], 8, Ec))), 128))
      ])
    ], 8, bc)) : (f(), m("p", wc, [
      A[2] || (A[2] = b("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      b("span", kc, [
        We(I(k.value) + " has no ", 1),
        A[0] || (A[0] = b("code", null, "columns", -1)),
        A[1] || (A[1] = We(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Hs = /* @__PURE__ */ ie(Lc, [["__scopeId", "data-v-c8a96457"]]);
function Rc(e) {
  const t = Et([]), n = K(!1), a = Et(null);
  let s = 0;
  const l = (i, c, d, h, w) => ({
    entity: i,
    rows: c.rows.map(
      ($, x) => Ds($, x, i, e.isPinned($.id))
    ),
    total: c.total,
    count: d ? i.count : String(c.total),
    pinned: Fc(h, c, w)
  }), r = () => {
    const i = ++s, c = e.query.value, d = e.schema.value, h = e.entities.value, w = e.limit.value, $ = e.within?.value.trim() ?? "", x = jn(c) && !$, C = $ ? Yn($, c.expr) : c.expr, g = h.map((k) => ({
      entity: k,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: k.key, expr: C, facets: At(k), page: 1 },
        schema: d,
        entity: k,
        limit: w,
        offset: 0
      })
    }));
    if (g.every(({ outcome: k }) => !(k instanceof Promise))) {
      t.value = g.map(
        ({ entity: k, outcome: z }) => l(k, z, x, d, C)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(g.map(({ outcome: k }) => Promise.resolve(k))).then((k) => {
      i === s && (t.value = k.map(
        (z, E) => l(g[E].entity, z, x, d, C)
      ), a.value = null);
    }).catch((k) => {
      i === s && (a.value = k, t.value = []);
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
function Fc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Zn(e, a);
  return !!l && Jn(s, l) === s;
}
const Nc = ["data-dc-pending"], Ic = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Oc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Dc = {
  key: 2,
  class: "dc-types__state"
}, Bc = ["data-dc-empty"], qc = ["onClick"], Kc = { class: "dc-type__name" }, Vc = { class: "dc-type__count dc-mono" }, Wc = { class: "dc-type__sr" }, Hc = {
  key: 0,
  class: "dc-type__empty"
}, Uc = ["onClick"], jc = { class: "dc-type__identity" }, Xc = { class: "dc-type__primary dc-truncate" }, Gc = { class: "dc-type__secondary dc-mono dc-truncate" }, Yc = { class: "dc-type__trailing dc-mono" }, Qc = { class: "dc-type__metric-value" }, Zc = { class: "dc-type__metric-label" }, Jc = {
  key: 0,
  class: "dc-type__date"
}, eu = ["onClick"], tu = /* @__PURE__ */ re({
  __name: "TypeCardsView",
  setup(e) {
    const t = ye(), { previews: n, pending: a, error: s } = Rc({
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
      be(o.$slots, "before", {}, void 0, !0),
      P(s) ? (f(), m("p", Ic, " Could not load results: " + I(P(s) instanceof Error ? P(s).message : "the data source failed."), 1)) : !r.value.length && P(a) ? (f(), m("p", Oc, " Running query… ")) : r.value.length ? R("", !0) : (f(), m("p", Dc, I(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(te, null, ve(r.value, (c) => (f(), m("section", {
        key: c.entity.key,
        class: "dc-type",
        "data-dc-empty": c.rows.length ? "false" : "true"
      }, [
        b("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => P(t).setEntity(c.entity.key)
        }, [
          b("span", Kc, I(c.entity.label), 1),
          b("span", Vc, I(c.count), 1),
          i[0] || (i[0] = b("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          b("span", Wc, "Show only " + I(c.entity.label.toLowerCase()), 1)
        ], 8, qc),
        c.rows.length ? R("", !0) : (f(), m("p", Hc, I(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(te, null, ve(c.rows, (d) => (f(), m("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          b("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (h) => P(t).activate(d.row, P(Be)(h))
          }, [
            b("span", jc, [
              b("span", Xc, I(d.parts.identity), 1),
              b("span", Gc, I(d.parts.reference), 1)
            ])
          ], 8, Uc),
          b("span", Yc, [
            (f(!0), m(te, null, ve(d.parts.metrics.slice(0, 1), (h) => (f(), Q(Gt, {
              key: h.column.key ?? h.label,
              class: "dc-type__metric",
              entry: d,
              column: h.column
            }, {
              default: Qe(() => [
                b("span", Qc, I(h.text), 1),
                b("span", Zc, I(h.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), m("span", Jc, I(d.parts.updated), 1)) : R("", !0),
            pe(kn, { entry: d }, null, 8, ["entry"]),
            pe(Yt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        c.entity.create ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => P(t).create(c.entity)
        }, [
          i[1] || (i[1] = b("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + I(c.entity.create), 1)
        ], 8, eu)) : R("", !0)
      ], 8, Bc))), 128)),
      be(o.$slots, "after", {}, void 0, !0)
    ], 8, Nc));
  }
}), Us = /* @__PURE__ */ ie(tu, [["__scopeId", "data-v-c7b8f990"]]), nu = ["data-dc-pending"], au = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, su = { class: "dc-results__detail" }, lu = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, ru = {
  key: 3,
  class: "dc-results__state"
}, ou = { class: "dc-results__detail" }, iu = /* @__PURE__ */ re({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), a = Ht(), s = {
      list: Nn,
      cards: Bs,
      grid: qs,
      images: Ks,
      table: Hs,
      links: Vs,
      preview: Ws
    }, l = v(() => Xn(n.query.value)), r = v(() => Hn(n.query.value.view, t.views)), o = v(() => s[r.value] ?? Nn), i = v(() => n.rows.value.length > 0), c = v(() => n.error.value !== null), d = K(null);
    return ke(
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
      l.value ? (f(), Q(Us, { key: 0 }, rn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Qe(() => [
            be(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Qe(() => [
            be(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), m("p", au, [
        w[1] || (w[1] = b("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        b("span", su, I(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && P(n).pending.value ? (f(), m("p", lu, [...w[2] || (w[2] = [
        b("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), Q(Wn(o.value), { key: 4 })) : (f(), m("div", ru, [
        w[3] || (w[3] = b("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        b("span", ou, I(P(n).summary.value), 1),
        P(n).isPristine.value ? R("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: w[0] || (w[0] = ($) => P(n).clearFilters())
        }, I(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, nu));
  }
}), js = /* @__PURE__ */ ie(iu, [["__scopeId", "data-v-c131c5c3"]]), cu = ["data-dc-theme"], uu = ["data-dc-width", "data-dc-align"], du = { class: "dc-shell__panel" }, fu = /* @__PURE__ */ re({
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
    const a = e, s = n, l = It(e, "open"), r = It(e, "pinned"), o = It(e, "selected"), i = Ht(), c = Mt(is, null), d = a.route || c ? null : Ll(), h = a.route ?? c ?? d;
    De(() => d?.dispose?.());
    const w = v(() => pr({ seed: a.schema.key })), $ = v(() => a.source ?? w.value), x = xr({
      schema: () => a.schema,
      adapter: h,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), C = v(() => a.within?.trim() ?? ""), g = Cr({
      source: $,
      query: x.query,
      schema: v(() => a.schema),
      entity: x.entity,
      limit: v(() => a.limit),
      within: C
    });
    ke(x.query, (S) => s("query-change", S)), ke(
      [g.pageCount, g.pending, x.query],
      () => {
        if (g.pending.value) return;
        const S = g.pageCount.value;
        x.query.value.page > S && x.setPage(S, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const k = Vn() ?? "dc-query-panel", z = K(null);
    function E() {
      l.value && (l.value = !1, Kt(() => {
        z.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const L = v(() => new Set(r.value));
    function F(S) {
      const q = new Set(L.value);
      q.has(S.id) ? q.delete(S.id) : q.add(S.id), r.value = [...q], s("toggle-pin", S);
    }
    const H = v(() => {
      if (a.selectable === !0) return !0;
      const S = x.entity.value;
      return !!(S?.duplicate || S?.delete);
    }), y = v(() => new Set(o.value));
    function A(S) {
      const q = new Set(y.value);
      q.has(S.id) ? q.delete(S.id) : q.add(S.id), o.value = [...q];
    }
    function O(S) {
      const q = new Set(y.value);
      for (const U of g.rows.value)
        S ? q.add(U.id) : q.delete(U.id);
      o.value = [...q];
    }
    function j() {
      o.value.length && (o.value = []);
    }
    const ue = v(() => ({
      ids: [...o.value],
      rows: g.rows.value.filter((S) => y.value.has(S.id)),
      entity: x.entity.value
    }));
    ke(() => x.query.value.entity, j);
    function Z(S, q, U = {}) {
      const se = vr(a.schema, x.query.value, S, U);
      U.exclude ? x.narrow(se, q?.key ?? x.query.value.entity) : x.narrow(se, q?.key ?? null, q ? void 0 : "cards"), s("drill", S, q, U);
    }
    const _e = hr({
      ...x,
      schema: v(() => a.schema),
      entities: v(() => a.schema.entities),
      rows: g.rows,
      total: g.total,
      limit: v(() => a.limit),
      offset: g.offset,
      pageCount: g.pageCount,
      pending: g.pending,
      error: g.error,
      source: $,
      previewsPerType: v(() => a.previewsPerType),
      within: C,
      pinnable: v(() => a.pinnable === !0),
      isPinned: (S) => L.value.has(S.id),
      isPinnedId: (S) => L.value.has(S),
      togglePin: F,
      selectable: H,
      selection: ue,
      isSelected: (S) => y.value.has(S.id),
      toggleSelect: A,
      selectPage: O,
      clearSelection: j,
      narrowsOnPress: v(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (S, q = {}) => {
        if (a.rowPress === "narrow" && Zn(a.schema, S)) {
          Z(S, null, q);
          return;
        }
        s("activate", S);
      },
      create: (S) => s("create", S),
      duplicate: () => s("duplicate", ue.value),
      delete: () => s("delete", ue.value),
      drill: Z
    }), xe = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: x.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: E
    }), (S, q) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Me(xe.value)
    }, [
      b("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(Rs, {
          ref_key: "headerRef",
          ref: z,
          expanded: l.value,
          "panel-id": P(k),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: q[0] || (q[0] = (U) => l.value = !l.value)
        }, rn({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Qe(() => [
              be(S.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), m(te, { key: 0 }, [
          b("div", {
            class: "dc-shell__scrim",
            onClick: E
          }),
          b("div", du, [
            pe(Ns, {
              "panel-id": P(k),
              onClose: E
            }, rn({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Qe(() => [
                  be(S.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : R("", !0)
      ], 8, uu),
      pe(Os, { views: e.views }, null, 8, ["views"]),
      be(S.$slots, "results", {
        rows: P(_e).rows.value,
        total: P(_e).total.value,
        offset: P(_e).offset.value,
        pageCount: P(_e).pageCount.value,
        query: P(_e).query.value,
        pending: P(_e).pending.value
      }, () => [
        pe(js, { views: e.views }, rn({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: Qe(() => [
              be(S.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Qe(() => [
              be(S.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, cu));
  }
}), pu = /* @__PURE__ */ ie(fu, [["__scopeId", "data-v-68ec86d9"]]), vu = ["data-dc-muted"], hu = {
  key: 0,
  class: "dc-shell-card__head"
}, mu = { class: "dc-shell-card__title" }, gu = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, _u = {
  key: 0,
  class: "dc-shell-card__aside"
}, yu = ["data-dc-flush"], wu = {
  key: 2,
  class: "dc-shell-card__foot"
}, ku = /* @__PURE__ */ re({
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
      return d.some((h) => h.type === Pl ? !1 : h.type === Al ? String(h.children ?? "").trim().length > 0 : h.type === te ? l(h.children ?? []) : !0);
    }
    const r = v(() => !!t.title || o.value || s(a.head)), o = v(() => s(a.aside)), i = v(() => s(a.default)), c = v(() => s(a.foot));
    return (d, h) => (f(), m("section", {
      class: "dc-shell-card",
      style: Me(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), m("header", hu, [
        be(d.$slots, "head", {}, () => [
          b("h2", mu, I(e.title), 1),
          e.count !== void 0 ? (f(), m("span", gu, I(e.count), 1)) : R("", !0)
        ], !0),
        o.value ? (f(), m("span", _u, [
          be(d.$slots, "aside", {}, void 0, !0)
        ])) : R("", !0)
      ])) : R("", !0),
      i.value ? (f(), m("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        be(d.$slots, "default", {}, void 0, !0)
      ], 8, yu)) : R("", !0),
      c.value ? (f(), m("footer", wu, [
        be(d.$slots, "foot", {}, void 0, !0)
      ])) : R("", !0)
    ], 12, vu));
  }
}), af = /* @__PURE__ */ ie(ku, [["__scopeId", "data-v-75f2ef0b"]]), bu = ["aria-label"], $u = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], xu = /* @__PURE__ */ re({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = K([]);
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
      (f(!0), m(te, null, ve(e.options, (i, c) => (f(), m("button", {
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
      }, I(i.label), 43, $u))), 128))
    ], 8, bu));
  }
}), Cu = /* @__PURE__ */ ie(xu, [["__scopeId", "data-v-63fb5482"]]), Su = ["data-dc-theme", "aria-label"], Mu = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Eu = /* @__PURE__ */ re({
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
    }), s = t, l = K(null), r = K([]), o = K(null), i = K(null), c = K(!1), d = v(
      () => n.menus.flatMap((L, F) => Ot(L) ? [F] : [])
    );
    function h(L, F) {
      const H = r.value[L]?.getBoundingClientRect(), y = n.menus[L];
      !H || !y || !Ot(y) || (i.value = { x: H.left, y: H.bottom + 2, mirrorX: H.right }, o.value = L, c.value = F);
    }
    function w(L) {
      const F = o.value;
      o.value = null, i.value = null, L && F !== null && r.value[F]?.focus();
    }
    function $(L) {
      o.value === L ? w(!0) : h(L, !1);
    }
    function x(L) {
      o.value === null || o.value === L || h(L, !1);
    }
    function C(L, F) {
      const H = d.value;
      if (H.length === 0) return null;
      if (L === null) return F === 1 ? H[0] ?? null : H[H.length - 1] ?? null;
      const y = H.indexOf(L);
      return y === -1 ? H[0] ?? null : H[(y + F + H.length) % H.length] ?? null;
    }
    function g(L) {
      const F = L.key;
      if (F === "Escape") {
        if (o.value === null) return;
        L.preventDefault(), w(!0);
        return;
      }
      if (F === "ArrowDown" && o.value === null) {
        const A = k();
        if (A === null) return;
        L.preventDefault(), h(A, !0);
        return;
      }
      if (F !== "ArrowLeft" && F !== "ArrowRight") return;
      const H = o.value ?? k(), y = C(H, F === "ArrowRight" ? 1 : -1);
      y !== null && (L.preventDefault(), o.value !== null ? h(y, !0) : r.value[y]?.focus());
    }
    function k() {
      const L = r.value.findIndex((F) => F === document.activeElement);
      return L === -1 ? d.value[0] ?? null : L;
    }
    function z(L) {
      const F = L.target;
      !F || l.value?.contains(F) || w(!1);
    }
    ke(o, (L) => {
      L !== null ? window.addEventListener("pointerdown", z, !0) : window.removeEventListener("pointerdown", z, !0);
    }), De(() => window.removeEventListener("pointerdown", z, !0));
    function E(L) {
      w(!0), L.action?.(), s("choose", L);
    }
    return (L, F) => (f(), m("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Me(a.value),
      onKeydown: g
    }, [
      (f(!0), m(te, null, ve(e.menus, (H, y) => (f(), m("button", {
        key: H.id ?? H.label ?? y,
        ref_for: !0,
        ref: (A) => {
          A && (r.value[y] = A);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === y,
        "aria-disabled": H.disabled ? "true" : void 0,
        disabled: H.disabled,
        "data-dc-menu": H.id ?? H.label,
        tabindex: y === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (A) => $(y),
        onMouseenter: (A) => x(y)
      }, I(H.label), 41, Mu))), 128)),
      o.value !== null && i.value ? (f(), Q(ia, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: c.value,
        onChoose: E,
        onDismiss: F[0] || (F[0] = (H) => w(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 44, Su));
  }
}), sf = /* @__PURE__ */ ie(Eu, [["__scopeId", "data-v-93dbd2e4"]]), Pu = ["aria-label", "aria-expanded", "disabled"], Au = { "aria-hidden": "true" }, Tu = /* @__PURE__ */ re({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = K(null), s = K(null), l = K(null), r = K(!1), o = v(() => l.value !== null);
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
    ke(o, (x) => {
      x ? window.addEventListener("pointerdown", w, !0) : window.removeEventListener("pointerdown", w, !0);
    }), De(() => window.removeEventListener("pointerdown", w, !0));
    function $(x) {
      c(!0), x.action?.(), n("choose", x);
    }
    return (x, C) => (f(), m(te, null, [
      b("button", {
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
        b("span", Au, I(e.glyph), 1)
      ], 40, Pu),
      l.value ? (f(), Q(ia, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: $,
        onDismiss: C[0] || (C[0] = (g) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 64));
  }
}), ua = /* @__PURE__ */ ie(Tu, [["__scopeId", "data-v-48f5ada5"]]), zt = (e) => e.kind === "split", X = (e) => e.kind === "group", ne = (e) => e.kind === "float", pt = { x: 16, y: 16, w: 360, h: 260 }, gn = 28, Xs = 120, In = 220, Gs = 38, kt = 6;
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
function lf(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const he = (e) => typeof e == "string", da = (e) => he(e) ? Ze(e) : e, Zt = (e) => he(e) ? [e] : at(e), Ya = (e) => e.panels.filter(he), zu = (e) => e.panels.filter((t) => !he(t)), Ie = (e, t) => e.panels.includes(t);
function Jt(e, t, n) {
  let a = !1;
  const s = e.panels.map((l) => {
    if (he(l) || !oe(l, t)) return l;
    const r = n(l);
    return r !== l && (a = !0), r;
  });
  return a ? { ...e, panels: s } : e;
}
function bn(e, t) {
  return { node: e, rect: { ...pt, ...t } };
}
function fa(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function pa(e, t) {
  const n = { ...pt, ...t };
  return fa(
    e.map(
      (a, s) => bn(a, {
        ...n,
        x: n.x + s * gn,
        y: n.y + s * gn
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
const ha = (e, t, n) => va("row", e, t, n), rf = (e, t, n) => va("column", e, t, n);
function we(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const mt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, of = (e) => ({ ...e, headless: !0 }), cf = (e) => ({ ...e, fixedView: !0 }), Lu = (e) => e === "left" || e === "right" ? "row" : "column";
function at(e) {
  return X(e) ? e.panels.flatMap(Zt) : ne(e) ? e.frames.flatMap((t) => at(t.node)) : e.children.flatMap(at);
}
function oe(e, t) {
  return X(e) ? e.panels.some((n) => he(n) ? n === t : oe(n, t)) : ne(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Ys = (e) => at(e).length === 0, On = (e) => !X(e) && mt(e), Dn = (e) => Ys(e) && !On(e);
function $n(e) {
  return zt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ne(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => he(t) ? [] : [{ node: t, index: n }]);
}
const ma = (e) => $n(e).map((t) => t.node);
function yt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => he(a) ? a === t : oe(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Qs(e) {
  const t = e.panels[yt(e)];
  return t !== void 0 && he(t) ? t : "";
}
function Te(e) {
  if (he(e)) return e;
  if (X(e)) {
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
  if (X(e) && Ie(e, t)) return e;
  for (const n of ma(e)) {
    const a = $t(n, t);
    if (a) return a;
  }
  return null;
}
function Ru(e) {
  const t = ma(e).flatMap(Ru);
  return X(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (X(e)) {
    for (const n of zu(e)) {
      const a = Se(n, t);
      if (a) return a;
    }
    return null;
  }
  if (ne(e)) {
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
function An(e, t, n = Xs) {
  const a = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), s = a(e.w, t.w), l = a(e.h, t.h), r = (o, i, c) => Math.min(Math.max(o, 0), Math.max(c - i, 0));
  return {
    x: Math.round(r(e.x, s, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function Qa(e, t, n, a, s = Xs) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + a), t.includes("n") && (i = e.h - a, r = e.y + a), o < s && (t.includes("w") && (l = e.x + e.w - s), o = s), i < s && (t.includes("n") && (r = e.y + e.h - s), i = s), { x: l, y: r, w: o, h: i };
}
const Zs = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function xt(e, t, n) {
  if (X(e)) return Jt(e, t, (l) => xt(l, t, n));
  if (ne(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!oe(o.node, t)) return o;
      if (Se(o.node, t)) {
        const c = xt(o.node, t, n);
        return c === o.node ? o : (l = !0, { ...o, node: c });
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
function Fu(e, t, n) {
  return xt(e, t, (a) => Zs(a.rect, n) ? a : { ...a, rect: n });
}
const lt = (e) => e.maximized === !0, Js = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Nu(e, t, n = !0) {
  return xt(e, t, Js(n));
}
function uf(e, t) {
  const n = Se(e, t);
  return n ? Nu(e, t, !lt(n)) : e;
}
const dt = (e) => e.minimized === !0, el = (e) => (t) => {
  if (dt(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function Iu(e, t, n = !0) {
  return xt(e, t, el(n));
}
function df(e, t) {
  const n = Se(e, t);
  return n ? Iu(e, t, !dt(n)) : e;
}
function ut(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = ot(e, t.slice(0, -1));
  return !a || !ne(a) ? null : a.frames[n] ?? null;
}
function Bn(e, t) {
  if (ne(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!oe(a.node, t)) continue;
      const s = Bn(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of $n(e)) {
    if (!oe(n, t)) continue;
    const s = Bn(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function ga(e, t, n) {
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
function Za(e, t, n) {
  return ga(
    e,
    t,
    (a) => Zs(a.rect, n) ? a : { ...a, rect: n }
  );
}
function Ou(e, t, n = !0) {
  return ga(e, t, Js(n));
}
function Du(e, t, n = !0) {
  return ga(e, t, el(n));
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
function Bu(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (ne(a) && (n[l] = a.frames.length - 1), a = ot(a, [s]));
  }), n;
}
function un(e, t, n, a) {
  if (X(e)) return Jt(e, n, (r) => un(r, t, n, a));
  if (ne(e)) {
    const r = e.frames.findIndex((i) => oe(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if (Se(o.node, n)) {
      const i = un(o.node, t, n, a);
      if (i === o.node) return e;
      const c = [...e.frames];
      return c[r] = { ...o, node: i }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, bn(Ze(t), a)] };
  }
  if (!oe(e, n)) return e;
  let s = !1;
  const l = e.children.map((r) => {
    const o = un(r, t, n, a);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: l } : e;
}
function Ja(e, t, n, a) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Se(e, n)) return e;
  const s = vt(e, t);
  if (!s) return e;
  const l = un(s, t, n, a);
  return l === s ? e : $e(l);
}
function qu(e, t, n) {
  return ne(e) ? { ...e, frames: [...e.frames, bn(Ze(t), n)] } : X(e) ? nl(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ze(t)],
    sizes: [...nt(e), 1],
    ...we(e)
  };
}
function tl(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return qu(e, t, a);
  const l = n.slice(1), r = (d, h) => h === s ? tl(d, t, l, a) : vt(d, t);
  if (ne(e)) {
    const d = e.frames.flatMap((h, w) => {
      const $ = r(h.node, w);
      return $ ? [$ === h.node ? h : { ...h, node: $ }] : [];
    });
    return { ...e, frames: d };
  }
  if (X(e)) {
    const d = yt(e), h = [];
    e.panels.forEach((x, C) => {
      if (he(x)) {
        x !== t && h.push(x);
        return;
      }
      const g = r(x, C);
      g && h.push(g);
    });
    const $ = e.active && h.some((x) => Zt(x).includes(e.active)) ? e.active : Te(h[d] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...$ ? { active: $ } : {},
      ...we(e)
    };
  }
  const o = nt(e), i = [], c = [];
  return e.children.forEach((d, h) => {
    const w = r(d, h);
    w && (i.push(w), c.push(o[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: c, ...we(e) };
}
function es(e, t, n, a) {
  const s = ot(e, n);
  return !s || !Ys(s) || !oe(e, t) ? e : $e(tl(e, t, n, a));
}
function Tn(e, t) {
  if (X(e)) return Jt(e, t, (s) => Tn(s, t));
  if (ne(e)) {
    const s = e.frames.findIndex((c) => oe(c.node, t)), l = e.frames[s];
    if (!l) return e;
    const r = Tn(l.node, t), o = r === l.node ? l : { ...l, node: r };
    if (s === e.frames.length - 1 && o === l) return e;
    const i = [...e.frames];
    return i.splice(s, 1), i.push(o), { ...e, frames: i };
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = Tn(s, t);
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
const nt = (e) => _a(e.children.length, e.sizes), He = (e) => {
  const t = X(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function $e(e) {
  if (X(e)) return Ku(e);
  if (ne(e)) {
    const o = e.frames.flatMap((i) => {
      const c = $e(i.node);
      return Dn(c) ? [] : [c === i.node ? i : { ...i, node: c }];
    });
    return o.length === e.frames.length && o.every((i, c) => i === e.frames[c]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = nt(e), n = He(e), a = [], s = [], l = [];
  e.children.forEach((o, i) => {
    const c = $e(o), d = t[i] ?? 0;
    if (Dn(c)) return;
    if (!n && zt(c) && c.direction === e.direction && !He(c) && !mt(c)) {
      const w = nt(c);
      c.children.forEach(($, x) => {
        a.push($), s.push(d * (w[x] ?? 0));
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
    sizes: _a(a.length, s),
    ...we(e),
    ...l.length === a.length && l.length > 0 ? { places: l } : {}
  };
}
function Ku(e) {
  if (e.panels.every(he)) return e;
  const t = Te(e), n = He(e), a = [], s = [];
  e.panels.forEach((o, i) => {
    const c = n?.[i];
    if (he(o)) {
      a.push(o), c && s.push(c);
      return;
    }
    const d = $e(o);
    if (!Dn(d)) {
      if (X(d) && !mt(d) && !He(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), c && s.push(c);
    }
  });
  const l = a[0];
  if (a.length === 1 && l !== void 0 && !he(l) && !mt(e))
    return l;
  if (a.length === e.panels.length && a.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && a.some((o) => Zt(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...r ? { active: r } : {},
    ...we(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function vt(e, t) {
  if (ne(e)) {
    const r = e.frames.flatMap((o) => {
      const i = vt(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !On(e) ? null : { ...e, frames: r };
  }
  if (X(e)) {
    if (!oe(e, t)) return e;
    const r = yt(e), o = [];
    for (const d of e.panels) {
      if (he(d)) {
        d !== t && o.push(d);
        continue;
      }
      const h = vt(d, t);
      h && o.push(h);
    }
    if (o.length === 0) return null;
    const c = e.active && o.some((d) => Zt(d).includes(e.active)) ? e.active : Te(o[r] ?? o[o.length - 1]);
    return c ? { kind: "group", panels: o, active: c, ...we(e) } : { kind: "group", panels: o, ...we(e) };
  }
  const n = nt(e), a = [], s = [];
  if (e.children.forEach((r, o) => {
    const i = vt(r, t);
    i && (a.push(i), s.push(n[o] ?? 0));
  }), a.length === 0)
    return On(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...we(e) } : null;
  const l = a[0];
  return a.length === 1 && l && !mt(e) ? l : $e({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...we(e)
  });
}
function nl(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...we(e) };
}
function Nt(e, t, n, a, s) {
  const l = ($) => Qt(
    $,
    (x) => oe(x, n) ? Nt(x, t, n, a, s) : x
  );
  if (a === "float") return e;
  const r = ($) => Jt($, n, (x) => Nt(x, t, n, a, s));
  if (a === "center")
    return X(e) ? Ie(e, n) ? nl(e, t, s) : r(e) : ne(e) ? l(e) : {
      ...e,
      children: e.children.map(
        ($) => oe($, n) ? Nt($, t, n, a, s) : $
      )
    };
  const o = Lu(a), i = a === "left" || a === "top", c = ($) => ({
    kind: "split",
    direction: o,
    children: i ? [Ze(t), $] : [$, Ze(t)],
    sizes: [0.5, 0.5]
  });
  if (X(e)) return Ie(e, n) ? c(e) : r(e);
  if (ne(e)) return l(e);
  const d = nt(e), h = e.children.findIndex(
    ($) => X($) && Ie($, n)
  );
  if (h >= 0 && e.direction === o) {
    const $ = (d[h] ?? 0) / 2, x = [...e.children], C = [...d];
    return x.splice(i ? h : h + 1, 0, Ze(t)), C.splice(h, 1, $, $), {
      kind: "split",
      direction: o,
      children: x,
      sizes: C,
      ...we(e)
    };
  }
  const w = e.children.map(($) => oe($, n) ? X($) && Ie($, n) ? c($) : Nt($, t, n, a) : $);
  return {
    kind: "split",
    direction: e.direction,
    children: w,
    sizes: d,
    ...we(e)
  };
}
function Ct(e, t) {
  if (X(e)) {
    if (Ie(e, t))
      return Qs(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((i) => !he(i) && oe(i, t)), l = e.panels[s];
    if (l === void 0 || he(l)) return e;
    const r = Ct(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[s] = r, { ...e, panels: o, active: t };
  }
  if (!oe(e, t)) return e;
  if (ne(e)) return Qt(e, (s) => Ct(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const l = Ct(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Bt(e, t, n) {
  if (X(e)) {
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
      ...we(e),
      ...o ? { places: o } : {}
    };
  }
  return oe(e, t) ? ne(e) ? Qt(e, (a) => Bt(a, t, n)) : { ...e, children: e.children.map((a) => Bt(a, t, n)) } : e;
}
function dn(e, t, n) {
  if (t === n) return e;
  if (X(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const a = (l) => l === t ? n : l === n ? t : l, s = e.panels.map((l) => he(l) ? a(l) : dn(l, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return ne(e) ? Qt(e, (a) => dn(a, t, n)) : { ...e, children: e.children.map((a) => dn(a, t, n)) };
}
function sn(e, t, n, a, s) {
  if (a === "float" || !oe(e, t) || !oe(e, n)) return e;
  const l = $t(e, t);
  if (a === "center" && l && Ie(l, n)) {
    if (s === void 0) return e;
    const o = l.panels.indexOf(t), i = s > o ? s - 1 : s;
    return i === o ? e : Ct(Bt(e, t, i), t);
  }
  if (t === n) return e;
  const r = vt(e, t);
  return r ? $e(Nt(r, t, n, a, s)) : e;
}
function al(e, t, n) {
  if (X(e)) {
    const s = e.panels[t];
    if (s === void 0 || he(s)) return e;
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
  if (!X(e) && a.some(({ node: s }) => X(s) && Ie(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: l } of a) {
    if (!oe(s, t)) continue;
    const r = en(s, t, n);
    return r ? al(e, l, r) : null;
  }
  return null;
}
function ff(e, t, n) {
  const a = en(
    e,
    t,
    (s) => zt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? $e(a) : e;
}
function sl(e) {
  return ne(e) ? [e] : He(e) || mt(e) ? [e] : X(e) ? [...e.panels] : e.children.flatMap(sl);
}
function ll(e, t) {
  if (X(e)) return e;
  const n = ma(e).map(sl), a = n.flat(), s = t && a.some((r) => Zt(r).includes(t)) ? t : void 0, l = Vu(e, n);
  return $e({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function Vu(e, t) {
  const n = ne(e) ? e.frames.map(({ node: a, ...s }) => s) : He(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function Wu(e, t) {
  const n = en(e, t, (a) => ll(a, t));
  return n ? $e(n) : e;
}
function ya(e, t, n) {
  if (X(e) && Ie(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of $n(e)) {
    if (!oe(a, t)) continue;
    const l = ya(a, t, n);
    return l ? al(e, s, l) : null;
  }
  return null;
}
function ts(e, t, n) {
  const a = ya(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const l = He(s);
    return {
      ...va(n, s.panels.map(da)),
      ...we(s),
      ...l ? { places: l } : {}
    };
  });
  return a ? $e(a) : e;
}
function qn(e, t) {
  if (X(e)) return e;
  if (ne(e)) {
    const s = e.frames.findIndex(
      (o) => X(o.node) && o.node.panels.includes(t)
    ), l = e.frames[s], r = l && X(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const o = pa(r.panels.map(da), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...o, ...e.frames.slice(s + 1)]
      };
    }
    return Qt(e, (o) => qn(o, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = qn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Hu(e, t, n) {
  const a = $t(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const r = qn(e, t);
    return r === e ? e : $e(r);
  }
  const l = ya(e, t, (r) => ({
    ...fa(rl(r.panels.map(da), He(r), n)),
    ...we(r)
  }));
  return l ? $e(l) : e;
}
function rl(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : pa(e, n).frames;
}
function ol(e, t) {
  return { ...fa(rl(e.children, He(e), t)), ...we(e) };
}
function pf(e, t, n) {
  const a = en(
    e,
    t,
    (s) => ne(s) ? s : ol(s, n)
  );
  return a ? $e(a) : X(e) && Ie(e, t) ? pa([e], n) : e;
}
function Uu(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function il(e, t) {
  const n = Uu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...we(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function vf(e, t, n = "row") {
  const a = en(
    e,
    t,
    (s) => ne(s) ? il(s, n) : s
  );
  return a ? $e(a) : e;
}
function cl(e) {
  if (ne(e)) return null;
  const t = X(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || he(t) || X(t) && t.panels.length === 1 && he(t.panels[0]) ? null : t;
}
const ju = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Xu(e, t) {
  const n = cl(e);
  return n ? t === "inner" ? n : { ...ju(n), ...we(e) } : e;
}
function Tt(e) {
  return e.title ? e.title : X(e) ? "" : ne(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function qt(e, t) {
  if (X(e)) {
    const a = e.panels[yt(e)];
    return a === void 0 ? "" : he(a) ? t(a) ?? a : Tt(a) || qt(a, t);
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
      n = s === void 0 || he(s) ? void 0 : s;
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
  if (X(e)) {
    const i = e.panels[a];
    if (i === void 0 || he(i)) return e;
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
    return zt(e) ? { ...e, sizes: _a(e.children.length, n) } : e;
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
  if (X(e)) {
    const o = e.panels[a];
    if (o === void 0 || he(o)) return e;
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
function ns(e, t, n, a = 0.02) {
  const s = e[t], l = e[t + 1];
  if (s === void 0 || l === void 0) return e;
  const r = s + l;
  if (r < a * 2) return e;
  const o = [...e], i = Math.min(Math.max(s + n, a), r - a);
  return o[t] = i, o[t + 1] = r - i, o;
}
function _n(e) {
  if (!X(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !he(t) ? e : { ...ha([Gu(e)]), ...we(e) };
}
const Gu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function as(e) {
  return e.length === 0 ? null : ha(e.map(Ze));
}
function Yu(e, t) {
  if (!e) return as(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const i of at(e))
    !n.has(i) || a.has(i) ? s.add(i) : a.add(i);
  let l = e;
  for (const i of s)
    l = l ? vt(l, i) : null;
  const r = new Set(l ? at(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? _n($e(l)) : null;
  if (!l) return as(o);
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
  return _n($e(ha([l, ...o.map(Ze)])));
}
const wa = Symbol("dc.windowContext");
function Qu(e) {
  return Kn(wa, e), e;
}
function ka() {
  const e = Mt(wa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Zu = ["data-dc-glyph"], Ju = { class: "dc-glyph__line" }, ed = ["d"], td = {
  key: 0,
  class: "dc-glyph__aqua"
}, nd = ["d"], ad = /* @__PURE__ */ re({
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
      b("g", Ju, [
        (f(!0), m(te, null, ve(t[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, ed))), 128))
      ]),
      n[e.kind] ? (f(), m("g", td, [
        (f(!0), m(te, null, ve(n[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, nd))), 128))
      ])) : R("", !0)
    ], 8, Zu));
  }
}), St = /* @__PURE__ */ ie(ad, [["__scopeId", "data-v-4d2872c0"]]), sd = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], ld = ["data-dc-movable"], rd = { class: "dc-float__title dc-truncate" }, od = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, id = ["aria-label", "aria-pressed", "data-dc-minimize"], cd = ["aria-label", "aria-pressed", "data-dc-maximize"], ud = ["aria-label", "data-dc-close"], dd = { class: "dc-float__content" }, fd = ["data-dc-handle", "onPointerdown"], pd = /* @__PURE__ */ re({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ka(), a = v(() => Te(t.frame.node)), s = v(() => n.panelFor(a.value)?.fixed === !0), l = v(() => lt(t.frame)), r = v(() => dt(t.frame)), o = v(() => l.value || r.value), i = v(() => n.resizable.value && !s.value && !o.value), c = v(() => n.movable.value && !s.value && !o.value), d = v(() => {
      const F = at(t.frame.node);
      return F.length === 1 ? F[0] ?? null : null;
    }), h = v(() => d.value !== null && n.closable(d.value)), w = v(() => t.frame.node.headless === !0), $ = v(
      () => !w.value && (!X(t.frame.node) || r.value)
    ), x = v(
      () => t.frame.title || Tt(t.frame.node) || qt(t.frame.node, (F) => n.panelFor(F)?.title)
    ), C = v(() => n.spaceMenu(t.path));
    function g(F) {
      F.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, F, "move");
    }
    function k(F) {
      F.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const z = v(() => {
      const F = n.framing.value;
      return F !== null && oe(t.frame.node, F);
    }), E = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${In}px`,
        height: `${Gs}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), L = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (F, H) => (f(), m("div", {
      class: "dc-float",
      style: Me(E.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": z.value ? "true" : "false",
      onPointerdown: H[3] || (H[3] = (y) => P(n).raiseAt(e.path))
    }, [
      $.value ? (f(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: g,
        onDblclick: k
      }, [
        b("span", rd, I(x.value), 1),
        C.value.length ? (f(), Q(ua, {
          key: 0,
          items: C.value,
          label: `${x.value} menu`
        }, null, 8, ["items", "label"])) : R("", !0),
        !s.value || r.value && h.value && d.value ? (f(), m("div", od, [
          s.value ? R("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${x.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": a.value,
            onClick: H[0] || (H[0] = (y) => P(n).toggleMinimizeAt(e.path))
          }, [
            pe(St, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, id)),
          s.value ? R("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${x.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: H[1] || (H[1] = (y) => P(n).toggleMaximizeAt(e.path))
          }, [
            pe(St, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, cd)),
          r.value && h.value && d.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${x.value}`,
            "data-dc-close": d.value,
            onClick: H[2] || (H[2] = (y) => P(n).close(d.value))
          }, [
            pe(St, { kind: "close" })
          ], 8, ud)) : R("", !0)
        ])) : R("", !0)
      ], 40, ld)) : R("", !0),
      b("div", dd, [
        be(F.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(te, null, ve(i.value ? L : [], (y) => (f(), m("span", {
        key: y,
        class: "dc-float__grip",
        "data-dc-handle": y,
        "aria-hidden": "true",
        onPointerdown: Le((A) => P(n).beginFrameDragAt(e.path, A, y), ["stop"])
      }, null, 40, fd))), 128))
    ], 44, sd));
  }
}), vd = /* @__PURE__ */ ie(pd, [["__scopeId", "data-v-f035684c"]]), ba = Symbol("dc.paneContext");
function hd(e) {
  return Kn(ba, e), e;
}
function hf() {
  return Mt(ba, null);
}
function mf(e) {
  const t = Mt(wa, null), n = Mt(ba, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Ft(e)
  );
  return Tl() && ls(a), a;
}
const md = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], gd = ["data-dc-movable"], _d = ["aria-label", "aria-pressed"], yd = ["data-dc-space-name"], wd = { class: "dc-truncate" }, kd = ["aria-label"], bd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, $d = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], xd = { class: "dc-tab__name dc-truncate" }, Cd = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Sd = ["aria-label", "data-dc-close", "onClick"], Md = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Ed = { class: "dc-pane__tools" }, Pd = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Ad = ["aria-label", "data-dc-minimize"], Td = ["aria-label", "aria-pressed", "data-dc-maximize"], zd = ["aria-label", "data-dc-close"], Ld = ["id", "role", "aria-labelledby"], Rd = ["id", "role", "aria-labelledby"], Fd = ["data-dc-edge"], Nd = /* @__PURE__ */ re({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ka(), a = Vn() ?? "dc-pane", s = v(
      () => t.group.panels.flatMap((M, W) => {
        if (!he(M)) {
          const Ce = Tt(M) || qt(M, (Pe) => n.panelFor(Pe)?.title);
          return [{ kind: "space", index: W, id: `space-${W}`, title: Ce, node: M }];
        }
        const ae = n.panelFor(M);
        return ae ? [{ kind: "panel", index: W, id: M, title: ae.title, panel: ae }] : [];
      })
    ), l = v(() => s.value.length > 1), r = v(() => {
      const M = yt(t.group);
      return s.value.find((W) => W.index === M) ?? s.value[0] ?? null;
    }), o = v(() => r.value?.kind === "space" ? r.value.node : null), i = v(() => o.value ? "" : Qs(t.group)), c = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => r.value?.title ?? ""), h = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), w = v(() => [...t.path, r.value?.index ?? 0]), $ = v(() => i.value || Ya(t.group)[0] || ""), x = v(() => n.viewFor(i.value)), C = v(() => t.group.headless === !0), g = v(() => n.focused.value === i.value), k = v(() => n.dragging.value === i.value), z = v(() => n.moving.value === i.value), E = v(() => n.frameOf($.value) !== null), L = v(() => n.panelFor($.value)?.fixed === !0), F = v(
      () => !o.value && (n.canMove(i.value) || E.value && n.movable.value && !L.value)
    ), H = v(
      () => o.value ? n.spaceMenu(w.value) : n.menuFor(i.value)
    ), y = (M) => n.closable(M);
    hd({ panel: i });
    const A = v(() => n.maximized($.value)), O = v(
      () => E.value && !L.value || !l.value && !!c.value && y(c.value.id)
    ), j = (M) => `${a}-tab-${M}`, ue = v(() => `${a}-body`), Z = v(() => {
      const M = n.dropTarget.value;
      return !M || !Ie(t.group, M.panel) || M.edge === "float" ? null : M;
    }), _e = v(() => Z.value?.index === void 0 ? Z.value?.edge ?? null : null), xe = v(() => Z.value?.index ?? null), S = () => c.value ? n.renderContent(c.value, x.value, g.value) ?? null : null, q = () => c.value ? n.renderActions(c.value, x.value, g.value) ?? null : null;
    let U = null;
    function se(M) {
      const W = U !== null && Math.hypot(M.clientX - U.x, M.clientY - U.y) >= 4;
      return U = null, W;
    }
    const me = (M) => M.kind === "panel" ? M.id : Te(M.node);
    function Ee(M, W) {
      W.kind !== "space" && (n.focus(W.id), U = { x: M.clientX, y: M.clientY }, n.beginDrag(W.id, M));
    }
    function ze(M, W) {
      if (se(M)) return;
      const ae = me(W);
      ae && n.selectPanel(ae);
    }
    function Ue(M) {
      i.value && n.focus(i.value), !M.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (E.value ? n.beginFrameDrag($.value, M, "move") : n.beginDrag(i.value, M));
    }
    function je(M) {
      U = { x: M.clientX, y: M.clientY }, n.beginDrag(i.value, M);
    }
    function Xe(M) {
      se(M) || n.toggleMoveMode(i.value);
    }
    const qe = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Fe(M) {
      if (!z.value) return;
      if (M.key === "Escape") {
        M.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const W = qe[M.key];
      W && (M.preventDefault(), E.value ? n.nudgeFrame(i.value, W, M.shiftKey) : n.nudge(i.value, W, M.shiftKey));
    }
    function Ke(M) {
      !E.value || M.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize($.value);
    }
    function D(M, W) {
      M.stopPropagation(), U = null, n.close(W);
    }
    function G(M, W) {
      const ae = s.value.length;
      let Ce = null;
      if (M.key === "ArrowRight" ? Ce = (W + 1) % ae : M.key === "ArrowLeft" ? Ce = (W - 1 + ae) % ae : M.key === "Home" ? Ce = 0 : M.key === "End" && (Ce = ae - 1), Ce === null) return;
      M.preventDefault();
      const Pe = s.value[Ce];
      if (!Pe) return;
      const Lt = me(Pe);
      Lt && n.selectPanel(Lt);
    }
    return (M, W) => r.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": P(Ya)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": E.value ? "true" : "false",
      "data-dc-maximized": A.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": g.value ? "true" : "false",
      "data-dc-dragging": k.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: W[7] || (W[7] = (ae) => i.value && P(n).focus(i.value))
    }, [
      C.value ? R("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": F.value ? "true" : "false",
        onPointerdown: Ue,
        onDblclick: Ke
      }, [
        F.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": z.value,
          onPointerdown: je,
          onClick: Xe,
          onKeydown: Fe
        }, [...W[8] || (W[8] = [
          b("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, _d)) : R("", !0),
        h.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          b("span", wd, I(h.value), 1)
        ], 8, yd)) : R("", !0),
        b("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), m(te, null, ve(s.value, (ae, Ce) => (f(), m(te, {
            key: ae.id
          }, [
            xe.value === Ce ? (f(), m("span", bd)) : R("", !0),
            b("button", {
              id: j(ae.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ae.kind === "panel" ? ae.id : void 0,
              "data-dc-space": ae.kind === "space" ? ae.title : void 0,
              "aria-selected": ae.index === r.value.index,
              "aria-controls": ue.value,
              tabindex: ae.index === r.value.index ? 0 : -1,
              onPointerdown: (Pe) => Ee(Pe, ae),
              onClick: (Pe) => ze(Pe, ae),
              onKeydown: (Pe) => G(Pe, Ce)
            }, [
              b("span", xd, I(ae.title), 1),
              ae.kind === "panel" && ae.panel.subtitle ? (f(), m("span", Cd, I(ae.panel.subtitle), 1)) : R("", !0),
              l.value && ae.kind === "panel" && y(ae.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ae.title}`,
                "data-dc-close": ae.id,
                onPointerdown: W[0] || (W[0] = Le(() => {
                }, ["stop"])),
                onClick: (Pe) => D(Pe, ae.id)
              }, [...W[9] || (W[9] = [
                b("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Sd)) : R("", !0)
            ], 40, $d)
          ], 64))), 128)),
          xe.value === s.value.length ? (f(), m("span", Md)) : R("", !0)
        ], 8, kd),
        b("div", Ed, [
          pe(q),
          H.value.length ? (f(), Q(ua, {
            key: 0,
            items: H.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ]),
        O.value ? (f(), m("div", Pd, [
          E.value && !L.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": $.value,
            onPointerdown: W[1] || (W[1] = Le(() => {
            }, ["stop"])),
            onClick: W[2] || (W[2] = (ae) => P(n).toggleMinimize($.value))
          }, [
            pe(St, { kind: "minimize" })
          ], 40, Ad)) : R("", !0),
          E.value && !L.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": $.value,
            onPointerdown: W[3] || (W[3] = Le(() => {
            }, ["stop"])),
            onClick: W[4] || (W[4] = (ae) => P(n).toggleMaximize($.value))
          }, [
            pe(St, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Td)) : R("", !0),
          !l.value && c.value && y(c.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: W[5] || (W[5] = Le(() => {
            }, ["stop"])),
            onClick: W[6] || (W[6] = (ae) => P(n).close(c.value.id))
          }, [
            pe(St, { kind: "close" })
          ], 40, zd)) : R("", !0)
        ])) : R("", !0)
      ], 40, gd)),
      o.value ? (f(), m("div", {
        key: 1,
        id: ue.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : j(r.value.id)
      }, [
        be(M.$slots, "space", {
          node: o.value,
          path: w.value
        }, void 0, !0)
      ], 8, Ld)) : (f(), m("div", {
        key: 2,
        id: ue.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : j(i.value)
      }, [
        pe(S)
      ], 8, Rd)),
      _e.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": _e.value,
        "aria-hidden": "true"
      }, null, 8, Fd)) : R("", !0)
    ], 40, md)) : R("", !0);
  }
}), ul = /* @__PURE__ */ ie(Nd, [["__scopeId", "data-v-44fd2b2d"]]), Id = ["data-dc-space", "data-dc-path", "aria-label"], Od = {
  key: 0,
  class: "dc-space__head"
}, Dd = { class: "dc-space__title dc-truncate" }, Bd = ["data-dc-direction"], qd = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Kd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Vd = /* @__PURE__ */ re({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ka(), a = K(null), s = v(() => X(t.node) ? t.node : null), l = v(() => zt(t.node) ? t.node : null), r = v(() => ne(t.node) ? t.node : null), o = v(
      () => l.value ? l.value.children : r.value?.frames.map((S) => S.node) ?? []
    ), i = v(() => l.value ? nt(l.value) : []), c = v(
      () => (r.value?.frames ?? []).map((S, q) => ({
        held: S,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: q,
        key: y(S.node),
        path: [...t.path, q]
      })).sort((S, q) => S.key < q.key ? -1 : S.key > q.key ? 1 : 0)
    ), d = v(() => Tt(t.node)), h = v(() => n.spaceMenu(t.path)), w = v(() => t.node.headless === !0), $ = v(() => r.value ? "desktop" : l.value?.direction ?? ""), x = K(null), C = K(0);
    let g = null;
    ke(
      x,
      (S) => {
        g?.disconnect(), g = null, !(!S || typeof ResizeObserver > "u") && (C.value = S.clientWidth, g = new ResizeObserver(([q]) => {
          C.value = q?.contentRect.width ?? 0;
        }), g.observe(S));
      },
      { immediate: !0 }
    ), De(() => g?.disconnect());
    const k = v(() => {
      const S = Math.max(
        1,
        Math.floor((C.value + kt) / (In + kt))
      ), q = /* @__PURE__ */ new Map();
      let U = 0;
      for (const se of c.value)
        se.held.minimized === !0 && (q.set(se.key, {
          x: kt + U % S * (In + kt),
          bottom: kt + Math.floor(U / S) * (Gs + kt)
        }), U += 1);
      return q;
    }), z = (S) => !!S && S.join("/") === t.path.join("/"), E = v(() => {
      const S = n.dropTarget.value, q = r.value;
      if (!q || !S?.rect || S.edge !== "float") return null;
      if (S.space) return z(S.space) ? S.rect : null;
      const U = Se(q, S.panel);
      return U && q.frames.includes(U) ? S.rect : null;
    }), L = v(() => {
      const S = n.dropTarget.value;
      return !!S && !S.rect && z(S.space);
    }), F = v(() => l.value?.direction === "row"), H = v(() => o.value.map((S, q) => [...t.path, q])), y = (S) => [...at(S)].sort().join("/"), A = (S) => {
      const q = at(S)[0];
      return (q ? n.panelFor(q)?.title : null) ?? q ?? "panel";
    }, O = (S) => {
      const q = o.value[S], U = o.value[S + 1];
      return !q || !U ? "Resize panels" : `Resize ${A(q)} and ${A(U)}`;
    }, j = (S) => {
      const q = i.value[S] ?? 0, U = i.value[S + 1] ?? 0, se = q + U;
      return se > 0 ? Math.round(q / se * 100) : 50;
    };
    function ue() {
      const S = a.value, q = S ? F.value ? S.clientWidth : S.clientHeight : 0;
      return q <= 0 ? 0.05 : Math.min(n.minPanelSize.value / q, 0.4);
    }
    let Z = null;
    function _e(S, q) {
      const U = l.value, se = a.value;
      if (!n.resizable.value || !U || !se || S.button !== 0) return;
      const me = F.value ? se.clientWidth : se.clientHeight;
      if (me <= 0) return;
      const Ee = F.value ? S.clientX : S.clientY, ze = nt(U), Ue = Math.min(n.minPanelSize.value / me, 0.4);
      S.preventDefault();
      const je = (Fe) => {
        const Ke = ((F.value ? Fe.clientX : Fe.clientY) - Ee) / me;
        n.setSizes(t.path, ns(ze, q, Ke, Ue));
      }, Xe = () => Z?.(), qe = (Fe) => {
        Fe.key === "Escape" && (n.setSizes(t.path, ze), Z?.());
      };
      Z = () => {
        window.removeEventListener("pointermove", je), window.removeEventListener("pointerup", Xe), window.removeEventListener("pointercancel", Xe), window.removeEventListener("keydown", qe), Z = null;
      }, window.addEventListener("pointermove", je), window.addEventListener("pointerup", Xe), window.addEventListener("pointercancel", Xe), window.addEventListener("keydown", qe);
    }
    De(() => Z?.());
    function xe(S, q) {
      const U = l.value;
      if (!n.resizable.value || !U) return;
      const se = F.value ? "ArrowRight" : "ArrowDown", me = F.value ? "ArrowLeft" : "ArrowUp", Ee = S.shiftKey ? 0.1 : 0.02;
      if (S.key !== se && S.key !== me) return;
      const ze = S.key === se ? Ee : -Ee;
      S.preventDefault(), n.setSizes(t.path, ns(nt(U), q, ze, ue()));
    }
    return (S, q) => {
      const U = os("WindowNode", !0);
      return s.value ? (f(), Q(ul, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Qe(({ node: se, path: me }) => [
          pe(U, {
            node: se,
            path: me,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), m("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": $.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !w.value ? (f(), m("header", Od, [
          b("span", Dd, I(d.value), 1),
          h.value.length ? (f(), Q(ua, {
            key: 0,
            items: h.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ])) : R("", !0),
        r.value ? (f(), m("div", {
          key: 1,
          ref_key: "desktop",
          ref: x,
          class: "dc-window__desktop"
        }, [
          E.value ? (f(), m("div", {
            key: 0,
            class: "dc-window__drop",
            style: Me({
              left: `${E.value.x}px`,
              top: `${E.value.y}px`,
              width: `${E.value.w}px`,
              height: `${E.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : R("", !0),
          (f(!0), m(te, null, ve(c.value, (se) => (f(), Q(vd, {
            key: se.key,
            frame: se.held,
            path: se.path,
            order: se.order,
            place: k.value.get(se.key) ?? null
          }, {
            default: Qe(() => [
              pe(U, {
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
          L.value ? (f(), m("div", qd)) : R("", !0),
          (f(!0), m(te, null, ve(o.value, (se, me) => (f(), m(te, {
            key: y(se)
          }, [
            b("div", {
              class: "dc-window__cell",
              style: Me({ flexGrow: i.value[me] ?? 1 })
            }, [
              pe(U, {
                node: se,
                path: H.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": F.value ? "vertical" : "horizontal",
              "aria-label": O(me),
              "aria-valuenow": j(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Ee) => _e(Ee, me),
              onKeydown: (Ee) => xe(Ee, me)
            }, null, 40, Kd)) : R("", !0)
          ], 64))), 128))
        ], 8, Bd)) : R("", !0)
      ], 8, Id));
    };
  }
}), Wd = /* @__PURE__ */ ie(Vd, [["__scopeId", "data-v-fb5b403f"]]), Hd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Ud = {
  key: 1,
  class: "dc-window__empty"
}, jd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, ln = 16, Xd = /* @__PURE__ */ re({
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
    const a = e, s = n, l = It(e, "layout"), r = It(e, "views"), o = Ht(), i = v(() => new Map(a.panels.map((u) => [u.id, u]))), c = v(() => a.panels.map((u) => u.id)), d = v(() => Yu(l.value, c.value)), h = K(null), w = K(null), $ = K(null), x = K(!0), C = K(null), g = K(null), k = K(null), z = K(""), E = K(null);
    function L() {
      const u = E.value;
      return u ? [...u.querySelectorAll(".dc-pane[data-dc-panels]")].filter((_) => _.closest(".dc-window") === u).map((_) => ({ panels: (_.dataset.dcPanels ?? "").split(" "), element: _ })) : [];
    }
    function F(u) {
      const p = [];
      let _ = u.closest(".dc-float");
      for (; _; )
        p.unshift(Number(_.dataset.dcOrder ?? 0)), _ = _.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function H() {
      return L().map((u) => ({ pane: u, order: F(u.element) })).sort((u, p) => {
        const _ = Math.max(u.order.length, p.order.length);
        for (let T = 0; T < _; T += 1) {
          const N = (u.order[T] ?? -1) - (p.order[T] ?? -1);
          if (N !== 0) return N;
        }
        return 0;
      }).map((u) => u.pane);
    }
    const y = (u) => L().find((p) => p.panels.includes(u)) ?? null;
    function A(u) {
      const p = i.value.get(u);
      if (!p) return "";
      const _ = r.value[u];
      return _ && p.views?.some((T) => T.key === _) ? _ : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function O(u, p) {
      r.value = { ...r.value, [u]: p }, s("view-change", { panel: u, view: p });
    }
    const j = v(
      () => a.panels.filter((u) => u.fixed !== !0).length
    );
    function ue(u) {
      return !a.movable || j.value < 1 || a.panels.length < 2 ? !1 : i.value.get(u)?.fixed !== !0;
    }
    function Z(u, p) {
      const _ = d.value;
      !u || !_ || u === _ || (l.value = u, p && s("panel-move", p));
    }
    function _e(u, p, _) {
      if (u.width <= 0 || u.height <= 0) return "center";
      const T = (p - u.left) / u.width, N = (_ - u.top) / u.height, B = 0.3;
      return T > B && T < 1 - B && N > B && N < 1 - B ? "center" : [
        { edge: "left", distance: T },
        { edge: "right", distance: 1 - T },
        { edge: "top", distance: N },
        { edge: "bottom", distance: 1 - N }
      ].reduce(
        (le, V) => V.distance < le.distance ? V : le
      ).edge;
    }
    function xe(u, p) {
      const _ = [...u.querySelectorAll(".dc-tab")], T = _.findIndex((N) => {
        const B = N.getBoundingClientRect();
        return p < B.left + B.width / 2;
      });
      return T === -1 ? _.length : T;
    }
    function S(u, p, _) {
      for (const { panels: T, element: N } of H().reverse()) {
        const B = N.getBoundingClientRect();
        if (u < B.left || u > B.right || p < B.top || p > B.bottom) continue;
        const de = T.find((J) => J !== _), le = N.querySelector(".dc-pane__tabs"), V = le?.getBoundingClientRect();
        if (le && V && p >= V.top && p <= V.bottom)
          return de ? { panel: de, edge: "center", index: xe(le, u) } : null;
        const Y = N.querySelector(":scope > .dc-pane__space");
        if (Y) {
          const J = Y.getBoundingClientRect();
          if (u >= J.left && u <= J.right && p >= J.top && p <= J.bottom) continue;
        }
        return de ? { panel: de, edge: _e(B, u, p) } : null;
      }
      return U(u, p, _) ?? Ee(u, p);
    }
    function q() {
      const u = E.value;
      return u ? [...u.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === u).reverse() : [];
    }
    function U(u, p, _) {
      const T = d.value;
      if (!T) return null;
      for (const N of q()) {
        const B = N.getBoundingClientRect();
        if (u < B.left || u > B.right || p < B.top || p > B.bottom) continue;
        const de = ze(N), le = de.flatMap((ce) => ce.panels).find((ce) => ce !== _);
        if (!le && de.length > 0) return null;
        const V = Se(T, _)?.rect, Y = An(
          {
            x: u - B.left - 24,
            y: p - B.top - 12,
            w: V?.w ?? pt.w,
            h: V?.h ?? pt.h
          },
          { w: N.clientWidth, h: N.clientHeight },
          a.minPanelSize
        );
        if (le) return { panel: le, edge: "float", rect: Y };
        const J = se(N);
        return J ? { panel: "", space: J, edge: "float", rect: Y } : null;
      }
      return null;
    }
    function se(u) {
      const p = u.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function me() {
      const u = E.value;
      return u ? [...u.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === u).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const _ = se(p);
        return _ ? [{ element: p, path: _ }] : [];
      }) : [];
    }
    function Ee(u, p) {
      for (const { element: _, path: T } of me()) {
        if (_.dataset.dcSpace === "desktop") continue;
        const N = _.getBoundingClientRect();
        if (!(u < N.left || u > N.right || p < N.top || p > N.bottom))
          return { panel: "", space: T, edge: "center" };
      }
      return null;
    }
    function ze(u) {
      return L().filter(
        (p) => p.element.closest(".dc-window__desktop") === u
      );
    }
    let Ue = null;
    const je = (u) => u.altKey;
    function Xe(u, p) {
      if (!ue(u) || w.value || g.value || p.button !== 0) return;
      const _ = p.clientX, T = p.clientY;
      let N = !1, B = je(p);
      const de = () => {
        const fe = k.value;
        fe && ($.value = B ? U(fe.x, fe.y, u) : S(fe.x, fe.y, u));
      }, le = (fe) => {
        if (!N) {
          if (Math.hypot(fe.clientX - _, fe.clientY - T) < 4) return;
          N = !0, w.value = u, C.value = null;
        }
        B = je(fe), x.value = !B, k.value = { x: fe.clientX, y: fe.clientY }, de();
      }, V = (fe) => {
        je(fe) !== B && (B = !B, x.value = !B, N && de());
      }, Y = (fe) => {
        Ue?.();
        const ee = $.value, Ae = d.value;
        if (fe && N && ee && Ae) {
          const st = ee.space ? es(Ae, u, ee.space, ee.rect) : ee.edge === "float" && ee.rect ? Ja(Ae, u, ee.panel, ee.rect) : sn(Ae, u, ee.panel, ee.edge, ee.index);
          Z(st, {
            panel: u,
            target: ee.panel,
            edge: ee.edge,
            ...ee.space === void 0 ? {} : { space: ee.space },
            ...ee.index === void 0 ? {} : { index: ee.index },
            ...ee.rect === void 0 ? {} : { rect: ee.rect }
          });
        }
        w.value = null, $.value = null, k.value = null, x.value = !0;
      }, J = () => Y(!0), ce = () => Y(!1), ge = (fe) => {
        if (fe.key === "Escape") {
          Y(!1);
          return;
        }
        V(fe);
      };
      Ue = () => {
        window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", J), window.removeEventListener("pointercancel", ce), window.removeEventListener("keydown", ge), window.removeEventListener("keyup", V), Ue = null;
      }, window.addEventListener("pointermove", le), window.addEventListener("pointerup", J), window.addEventListener("pointercancel", ce), window.addEventListener("keydown", ge), window.addEventListener("keyup", V);
    }
    De(() => Ue?.());
    let qe = null;
    function Fe(u) {
      const p = E.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${u.join("/")}"]`
      )].find((N) => N.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ke(u) {
      const p = d.value;
      return p ? Bn(p, u) : null;
    }
    function D(u) {
      const p = d.value;
      if (!p) return;
      const _ = Dt(p, u);
      _ !== p && (l.value = _);
    }
    function G(u) {
      const p = Ke(u);
      p && D(p);
    }
    function M(u) {
      const p = d.value, _ = p ? Se(p, u) : null;
      return _ !== null && lt(_);
    }
    function W(u) {
      const p = d.value, _ = p ? Se(p, u) : null;
      return _ !== null && dt(_);
    }
    function ae(u) {
      const p = d.value, _ = p ? ut(p, u) : null;
      return _ ? Te(_.node) : "";
    }
    function Ce(u) {
      const p = d.value, _ = p ? ut(p, u) : null;
      if (!p || !_) return;
      const T = Te(_.node);
      if (i.value.get(T)?.fixed === !0) return;
      const N = !dt(_);
      let B = Du(p, u, N);
      B !== p && (N || (B = Dt(B, u)), l.value = B, s("frame-minimize", { panel: T, minimized: N }));
    }
    function Pe(u) {
      const p = Ke(u);
      p && Ce(p);
    }
    function Lt(u) {
      const p = d.value, _ = p ? ut(p, u) : null;
      if (!p || !_) return;
      const T = Te(_.node);
      if (i.value.get(T)?.fixed === !0) return;
      const N = !lt(_);
      let B = Ou(p, u, N);
      B !== p && (N && (B = Dt(B, u)), l.value = B, s("frame-maximize", { panel: T, maximized: N }));
    }
    function $a(u) {
      const p = Ke(u);
      p && Lt(p);
    }
    function xa(u, p, _) {
      const T = d.value, N = T ? ut(T, u) : null;
      if (!T || !N || p.button !== 0 || w.value || g.value) return;
      const B = Te(N.node);
      if (i.value.get(B)?.fixed === !0 || lt(N) || dt(N) || (_ === "move" ? !a.movable : !a.resizable)) return;
      const de = Fe(u), le = Bu(T, u);
      D(u);
      const V = { w: de?.clientWidth ?? 0, h: de?.clientHeight ?? 0 }, Y = { ...N.rect }, J = p.clientX, ce = p.clientY, ge = a.minPanelSize;
      g.value = B;
      const fe = (Ne) => {
        const Je = d.value;
        if (!Je) return;
        const Rt = Za(Je, le, An(Ne, V, ge));
        Rt !== Je && (l.value = Rt);
      }, ee = (Ne) => {
        Ne.preventDefault();
        const Je = Ne.clientX - J, Rt = Ne.clientY - ce;
        fe(
          _ === "move" ? { ...Y, x: Y.x + Je, y: Y.y + Rt } : Qa(Y, _, Je, Rt, ge)
        );
      }, Ae = (Ne) => {
        if (qe?.(), g.value = null, !Ne) {
          fe(Y);
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
    function dl(u, p, _) {
      const T = Ke(u);
      T && xa(T, p, _);
    }
    function fl(u, p, _ = !1) {
      const T = d.value, N = Ke(u), B = T && N ? ut(T, N) : null;
      if (!T || !N || !B || i.value.get(u)?.fixed === !0 || (_ ? !a.resizable : !a.movable)) return;
      if (lt(B) || dt(B)) {
        z.value = `${Ge(u)} is ${lt(B) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const de = p === "left" ? -ln : p === "right" ? ln : 0, le = p === "up" ? -ln : p === "down" ? ln : 0, V = Fe(N), Y = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, J = _ ? Qa(B.rect, "se", de, le, a.minPanelSize) : { ...B.rect, x: B.rect.x + de, y: B.rect.y + le }, ce = Za(T, N, An(J, Y, a.minPanelSize));
      if (ce === T) {
        z.value = _ ? `${Ge(u)} cannot be resized further.` : `${Ge(u)} cannot move ${p}.`;
        return;
      }
      l.value = ce;
      const ge = ut(ce, N);
      ge && (s("frame-change", { panel: u, rect: ge.rect }), z.value = _ ? `${Ge(u)} resized to ${ge.rect.w} by ${ge.rect.h}.` : `${Ge(u)} moved to ${ge.rect.x}, ${ge.rect.y}.`);
    }
    De(() => qe?.());
    function pl(u, p) {
      const _ = y(u), T = _?.element.getBoundingClientRect();
      if (!_ || !T) return null;
      const N = p === "left" || p === "right", B = (V) => {
        if (!(N ? V.bottom > T.top + 1 && V.top < T.bottom - 1 : V.right > T.left + 1 && V.left < T.right - 1)) return null;
        const J = p === "left" ? T.left - V.right : p === "right" ? V.left - T.right : p === "up" ? T.top - V.bottom : V.top - T.bottom;
        return J < -1 ? null : J;
      }, de = [];
      for (const V of L()) {
        if (V === _ || V.element === _.element) continue;
        const Y = B(V.element.getBoundingClientRect());
        if (Y === null) continue;
        const J = V.panels.find((ce) => ce !== u);
        J && de.push({ to: { panel: J }, distance: Y });
      }
      for (const { element: V, path: Y } of me()) {
        const J = B(V.getBoundingClientRect());
        J !== null && de.push({ to: { space: Y }, distance: J });
      }
      return de.reduce(
        (V, Y) => V && V.distance <= Y.distance ? V : Y,
        null
      )?.to ?? null;
    }
    function vl(u) {
      const p = d.value ? Se(d.value, u) !== null : !1;
      if (!p && !ue(u)) return;
      C.value = C.value === u ? null : u;
      const _ = Ge(u);
      if (!C.value) {
        z.value = `${_}: move mode off.`;
        return;
      }
      z.value = p ? `${_}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${_}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ge = (u) => i.value.get(u)?.title ?? u, hl = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function ml(u, p, _ = !1) {
      if (!ue(u)) return;
      const T = d.value;
      if (!T) return;
      const N = Ge(u), B = $t(T, u);
      if (!_ && B && (p === "left" || p === "right") && B.panels.length > 1) {
        const ce = B.panels.indexOf(u), ge = p === "left" ? ce - 1 : ce + 1;
        if (ge >= 0 && ge < B.panels.length) {
          Z(Bt(T, u, ge), { panel: u, target: u, edge: "center", index: ge }), z.value = `${N} moved ${p}, now tab ${ge + 1} of ${B.panels.length}.`, xn(u);
          return;
        }
      }
      const le = pl(u, p);
      if (!le || le.panel !== void 0 && !ue(le.panel)) {
        z.value = `${N} cannot move ${p}.`;
        return;
      }
      const V = hl[p];
      if (le.space) {
        const ce = le.space, ge = ot(T, ce), fe = Se(T, u)?.rect, ee = { ...pt, ...fe ? { w: fe.w, h: fe.h } : {} };
        Z(es(T, u, ce, ee), { panel: u, target: "", space: ce, edge: V }), z.value = `${N} moved ${p}, into ${ge ? Tt(ge) : "the space"}.`, xn(u);
        return;
      }
      const Y = le.panel, J = B?.panels.length === 1 && $t(T, Y)?.panels.length === 1;
      _ ? (Z(sn(T, u, Y, "center"), {
        panel: u,
        target: Y,
        edge: "center"
      }), z.value = `${N} joined ${Ge(Y)} as a tab.`) : J ? (Z(dn(T, u, Y), { panel: u, target: Y, edge: V }), z.value = `${N} moved ${p}, trading places with ${Ge(Y)}.`) : (Z(sn(T, u, Y, V), { panel: u, target: Y, edge: V }), z.value = `${N} moved ${p}, beside ${Ge(Y)}.`), xn(u);
    }
    function xn(u) {
      Kt(() => {
        y(u)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function gl(u, p) {
      const _ = d.value;
      _ && (l.value = fn(_, u, p));
    }
    function Cn(u) {
      const p = d.value;
      if (!p) return;
      const _ = Ct(p, u);
      _ !== p && (l.value = _, s("tab-select", { panel: u }));
    }
    function Ca(u) {
      return i.value.get(u)?.closable ?? a.closable;
    }
    function _l(u) {
      Ca(u) && s("panel-close", u);
    }
    const Sn = K(/* @__PURE__ */ new Map());
    let yl = 0;
    function wl(u, p) {
      const _ = yl += 1;
      return Sn.value.set(_, { panel: u, items: p }), () => {
        Sn.value.delete(_);
      };
    }
    function kl(u) {
      const p = [];
      for (const _ of Sn.value.values())
        _.panel() === u && p.push(..._.items());
      return p;
    }
    function Sa(u) {
      const p = u.filter((_) => _.items.length > 0);
      return p.length < 2 ? p.flatMap((_) => _.items) : p.flatMap((_) => [
        { id: _.id, heading: !0, label: _.title },
        ..._.items
      ]);
    }
    const Ma = (u) => u.title || "These tabs";
    function bl(u, p) {
      const _ = p.id, T = $t(u, _), N = (T?.panels.length ?? 0) > 1, B = T?.fixedView === !0, de = (J) => ({
        action: () => {
          J !== u && (l.value = J);
        }
      }), le = [], V = [], Y = p.views ?? [];
      if (Y.length > 1 && !B) {
        const J = A(_);
        le.push({
          id: "view",
          label: "View",
          items: Y.map((ce) => ({
            id: `view-${ce.key}`,
            label: ce.label,
            checked: ce.key === J,
            action: () => O(_, ce.key)
          }))
        });
      }
      return N && !B && V.push(
        { id: "show-row", label: "Row", checked: !1, ...de(ts(u, _, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...de(ts(u, _, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...de(Wu(u, _))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...de(Hu(u, _))
        }
      ), N && T && (V.length && V.push({ separator: !0 }), V.push(...Ea(T, _))), { panel: le, tabs: V, tabsTitle: T ? Ma(T) : "" };
    }
    function Ea(u, p) {
      const _ = yt(u), T = (N) => {
        const B = u.panels[(_ + N + u.panels.length) % u.panels.length];
        return (B === void 0 ? "" : Te(B)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Cn(T(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Cn(T(-1)) }
      ];
    }
    function tn(u) {
      return u.title ? u.title : X(u) ? u.panels.length > 1 ? "these tabs" : "the strip" : Tt(u);
    }
    function Pa(u) {
      if (!u || ne(u) || u.fixedView === !0 || !u.title && u.headless !== !0 || He(u)) return null;
      const p = cl(u);
      return p && p.fixedView !== !0 ? p : null;
    }
    function $l(u) {
      const p = d.value;
      if (!a.menu || !p) return [];
      const _ = ot(p, u);
      if (!_ || X(_)) return [];
      if (_.fixedView) return [];
      const T = ne(_) ? "desktop" : _.direction, N = (ee, Ae, st) => ({
        id: `show-${ee}`,
        label: Ae,
        checked: T === ee,
        action: () => {
          const it = d.value, ct = st();
          !it || ct === _ || (l.value = _n($e(ht(it, u, ct))));
        }
      }), B = () => {
        const ee = ll(_, xl(_));
        if (X(ee) && ee.panels.length === 0) return _;
        const Ae = X(ee) && ee.panels.length === 1 ? ee.panels[0] : void 0;
        return Ae !== void 0 && he(Ae) ? _ : ee;
      }, de = (ee) => () => ne(_) ? il(_, ee) : _.direction === ee ? _ : { ..._, direction: ee }, le = u.slice(0, -1), V = u.length > 0 ? ot(p, le) : null, Y = V && X(V) && V.panels.length > 1 ? V : null, J = V && Pa(V) === _ ? V : null, ce = Pa(_), ge = _.title || "this space", fe = (ee, Ae, st, it, ct) => ({
        id: ee,
        label: ct,
        action: () => {
          const Ne = d.value;
          Ne && (l.value = _n($e(ht(Ne, Ae, Xu(st, it)))));
        }
      });
      return Sa([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: _.title || "This space",
          items: [
            N("row", "Row", de("row")),
            N("column", "Column", de("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            N("tabs", "Tabs", () => B()),
            N("desktop", "Desktop", () => ne(_) ? _ : ol(_))
          ]
        },
        {
          id: "about-around",
          title: ce ? `Around ${tn(ce)}` : "",
          items: ce ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ce.title ? [] : [fe("merge-around-keep-this", u, _, "outer", `Keep ${ge}`)],
            ..._.title ? [] : [fe("merge-around-keep-that", u, _, "inner", `Keep ${tn(ce)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: J ? `Inside ${tn(J)}` : "",
          items: J ? [
            ..._.title ? [] : [fe("merge-inside-keep-that", le, J, "outer", `Keep ${tn(J)}`)],
            ...J.title ? [] : [fe("merge-inside-keep-this", le, J, "inner", `Keep ${ge}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: Y ? Ma(Y) : "",
          items: Y ? Ea(Y, Te(_)) : []
        }
      ]);
    }
    function xl(u) {
      const p = h.value;
      return p && oe(u, p) ? p : void 0;
    }
    function Cl(u) {
      const p = d.value, _ = i.value.get(u);
      if (!p || !_) return [];
      const T = a.menu ? bl(p, _) : null, N = kl(u);
      N.length && T?.panel.length && N.push({ separator: !0 }), T && N.push(...T.panel);
      const B = Sa([
        { id: "about-panel", title: _.title, items: N },
        { id: "about-tabs", title: T?.tabsTitle ?? "", items: T?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(_, B) : B;
    }
    function Sl(u, p) {
      return o[`${u}-${p}`] ?? o[u];
    }
    function Aa(u, p, _, T) {
      return Sl(u, p.id)?.({ panel: p, view: _, active: T });
    }
    Qu({
      panelFor: (u) => i.value.get(u) ?? null,
      viewFor: A,
      setView: O,
      movable: v(() => a.movable),
      resizable: v(() => a.resizable),
      minPanelSize: v(() => a.minPanelSize),
      spaceNames: v(() => a.spaceNames),
      focused: h,
      dragging: w,
      dropTarget: $,
      moving: C,
      framing: g,
      canMove: ue,
      focus(u) {
        h.value !== u && (h.value = u, s("panel-activate", u));
      },
      selectPanel: Cn,
      beginDrag: Xe,
      toggleMoveMode: vl,
      nudge: ml,
      setSizes: gl,
      frameOf: (u) => d.value ? Se(d.value, u) : null,
      beginFrameDrag: dl,
      nudgeFrame: fl,
      raise: G,
      maximized: M,
      toggleMaximize: $a,
      minimized: W,
      toggleMinimize: Pe,
      beginFrameDragAt: xa,
      raiseAt: D,
      toggleMaximizeAt: Lt,
      toggleMinimizeAt: Ce,
      menuFor: Cl,
      spaceMenu: $l,
      registerMenu: wl,
      closable: Ca,
      close: _l,
      renderContent: (u, p, _) => Aa("panel", u, p, _),
      renderActions: (u, p, _) => Aa("actions", u, p, _),
      layout: d
    });
    const Ml = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), El = () => {
      const u = w.value, p = k.value;
      return !u || !p ? null : zl(
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
      move(u, p, _, T) {
        const N = d.value;
        N && Z(sn(N, u, p, _, T), {
          panel: u,
          target: p,
          edge: _,
          ...T === void 0 ? {} : { index: T }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(u) {
        const p = d.value;
        p && (l.value = Ct(p, u));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(u, p, _) {
        const T = d.value;
        T && Z(Ja(T, u, p, _), {
          panel: u,
          target: p,
          edge: "float",
          rect: _
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(u, p) {
        const _ = d.value;
        if (!_) return;
        const T = Fu(_, u, p);
        if (T === _) return;
        l.value = T;
        const N = Se(T, u);
        N && s("frame-change", { panel: u, rect: N.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: O,
      /** Brings a floating frame to the front of its stack. */
      raise: G,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: $a,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Pe
    }), (u, p) => (f(), m("div", {
      ref_key: "root",
      ref: E,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": w.value ? "true" : "false",
      "data-dc-docking": x.value ? "true" : "false",
      style: Me(Ml.value)
    }, [
      d.value ? (f(), Q(Wd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", Ud, " This window has no panels. ")),
      pe(El),
      b("p", jd, I(z.value), 1)
    ], 12, Hd));
  }
}), Gd = /* @__PURE__ */ ie(Xd, [["__scopeId", "data-v-711565af"]]);
function gf(e = "", t = "/") {
  const n = K(tt(e)), a = K(t), s = [`${a.value}${n.value}`];
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
function ss(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return tt(a === -1 ? n : n.slice(0, a));
}
function _f(e) {
  const t = K(ss(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), a = ke(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = ss(s);
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
const Yd = {
  DataShell: pu,
  ShellHeader: Rs,
  QueryPanel: Ns,
  RecordActions: Os,
  ResultsArea: js,
  FacetControl: Fs,
  SegmentedControl: Cu,
  StatusPill: Xt,
  WindowFrame: Gd,
  WindowPane: ul,
  ListView: Nn,
  CardsView: Bs,
  GridView: qs,
  ImagesView: Ks,
  TableView: Hs,
  LinksView: Vs,
  PreviewView: Ws,
  TypeCardsView: Us
}, yf = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Yd))
      e.component(`${n}${a}`, s);
    t.route && e.provide(is, t.route);
  }
};
export {
  gn as CASCADE_STEP,
  ef as COLUMN_BREAKPOINTS,
  Jd as COLUMN_ROLES,
  Bs as CardsView,
  Xa as ColumnCell,
  pt as DEFAULT_FRAME,
  zn as DEFAULT_SORT,
  Rl as DEFAULT_VIEW,
  pu as DataShell,
  Ln as EMPTY_CELL,
  As as ENTITY_ALL,
  mn as ENTITY_TERM,
  Wt as EXPRESSION_TERM,
  ra as FACET_PREFIX,
  Fs as FacetControl,
  qs as GridView,
  yf as HeaderContentLayoutPlugin,
  Ks as ImagesView,
  Vs as LinksView,
  Nn as ListView,
  kt as MINIMIZED_GAP,
  Gs as MINIMIZED_HEIGHT,
  In as MINIMIZED_WIDTH,
  Xs as MIN_FRAME,
  Ka as MOCK_TINTS,
  sf as MenuBar,
  ua as MenuButton,
  ia as MenuList,
  Gt as MetricDrill,
  ba as PANE_CONTEXT_KEY,
  aa as PARAM_DIR,
  ea as PARAM_ENTITY,
  sa as PARAM_EXPR,
  la as PARAM_PAGE,
  na as PARAM_SORT,
  ta as PARAM_VIEW,
  ca as PinStar,
  Ws as PreviewView,
  kn as QueryMark,
  Ns as QueryPanel,
  nn as RECORD_STATUSES,
  ms as RESULT_FIELDS,
  is as ROUTE_ADAPTER_KEY,
  Os as RecordActions,
  js as ResultsArea,
  Ps as SHELL_CONTEXT_KEY,
  Zd as SHELL_THEMES,
  Yt as ScopeMark,
  Cu as SegmentedControl,
  _t as SelectTick,
  af as ShellCard,
  Rs as ShellHeader,
  Ga as StandingControl,
  Xt as StatusPill,
  Hs as TableView,
  Us as TypeCardsView,
  cs as VIEW_KINDS,
  Fl as VIEW_LABELS,
  wa as WINDOW_CONTEXT_KEY,
  Gd as WindowFrame,
  ul as WindowPane,
  Qs as activePanel,
  yt as activeTab,
  Jn as addTerm,
  Yn as andExpression,
  Lu as axisOf,
  pa as cascade,
  ys as cellFull,
  Ut as cellText,
  cn as cellTextOf,
  Oe as cellValue,
  za as changesResults,
  An as clampRect,
  ll as collapseSpace,
  Wu as collapseToTabs,
  rf as column,
  Ra as columnAlign,
  Fa as columnClass,
  La as columnKey,
  Rn as columnTruncates,
  ql as columnsFor,
  Il as countPages,
  Ll as createHistoryAdapter,
  gf as createMemoryAdapter,
  pr as createMockDataSource,
  _f as createVueRouterAdapter,
  Wl as defaultCellText,
  as as defaultLayout,
  Gn as defaultQuery,
  vr as drillExpression,
  es as dropIntoSpace,
  At as emptyFacetState,
  Un as emptyFacetValue,
  xs as excludingTerm,
  bt as findEntity,
  rt as findSort,
  cf as fixedView,
  fa as float,
  Ja as floatPanel,
  ol as floatSplit,
  Hu as floatTabs,
  on as fnv1a,
  ds as focusEntity,
  wt as formatCount,
  Dl as formatDate,
  ft as formatExpression,
  Ol as formatMetric,
  Bl as formatOrdinal,
  jt as formatTerm,
  bn as frame,
  ut as frameAt,
  Se as frameOf,
  Bn as framePathOf,
  Te as frontPanel,
  ur as generateRows,
  lf as group,
  $t as groupOf,
  Ru as groups,
  hs as hasActiveFacets,
  oe as hasPanel,
  of as headless,
  Nt as insertPanel,
  Ot as isChoosable,
  tf as isEntityScoped,
  vs as isFacetActive,
  ne as isFloat,
  X as isGroup,
  lt as isMaximized,
  dt as isMinimized,
  he as isPanelTab,
  jn as isPristineQuery,
  zt as isSplit,
  Ie as isTabOf,
  Xn as isTypeCardsQuery,
  us as isViewKind,
  Ba as joinExpression,
  Ss as liftTerm,
  Jl as matchesExpression,
  dr as matchesFacets,
  Nu as maximizeFrame,
  Ou as maximizeFrameAt,
  Xu as mergeSpace,
  Iu as minimizeFrame,
  Du as minimizeFrameAt,
  sn as movePanel,
  Bt as moveTab,
  nf as negateTerm,
  ot as nodeAt,
  qt as nodeTitle,
  $e as normalizeLayout,
  tt as normalizeSearch,
  _a as normalizeSizes,
  cl as onlySpace,
  Vt as oppositeTerm,
  at as panelIds,
  Ze as panelNode,
  Ya as panelTabs,
  Re as parseExpression,
  kr as parseQuery,
  Ho as presentParts,
  Ds as presentRow,
  Be as pressOptions,
  hd as providePaneContext,
  hr as provideShellContext,
  Qu as provideWindowContext,
  Tn as raiseFrame,
  Dt as raiseFrameAt,
  Bu as raisedPath,
  gs as reconcileFacets,
  Yu as reconcileLayout,
  $s as recordTerm,
  ar as refineExpression,
  vt as removePanel,
  ht as replaceAt,
  Qa as resizeRect,
  ns as resizeSplit,
  Hn as resolveView,
  Ve as roleColumn,
  _s as roleColumns,
  _n as rootSpace,
  ha as row,
  Vl as rowKey,
  yn as sameTerm,
  Qn as scopeTerm,
  Zn as scopeTermFor,
  Es as scopedEntity,
  Ha as serializeQuery,
  Ct as setActivePanel,
  Fu as setFrameRect,
  Za as setFrameRectAt,
  fn as setSizesAt,
  ff as setSplitDirection,
  nt as sizesOf,
  ps as sortsFor,
  we as spaceChrome,
  Tt as spaceTitle,
  va as split,
  tr as splitExpression,
  ts as spreadTabs,
  $r as summarizeQuery,
  oa as summaryTerms,
  dn as swapPanels,
  da as tabNode,
  Zt as tabPanels,
  Cs as termStanding,
  il as tileFloat,
  pf as toFloat,
  vf as toTiled,
  uf as toggleMaximized,
  df as toggleMinimized,
  pc as useColumns,
  qr as useEntityCounts,
  Rc as useEntityPreviews,
  hf as usePaneContext,
  mf as usePaneMenu,
  gt as usePresentedRows,
  xr as useQueryState,
  Wr as useRecordNames,
  Cr as useResults,
  ye as useShellContext,
  ka as useWindowContext,
  Va as withStanding,
  Ms as withoutOwnScope,
  er as withoutTerm
};
