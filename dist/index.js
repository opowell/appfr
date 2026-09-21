import { ref as K, inject as Mt, provide as Kn, computed as v, toValue as Ft, shallowRef as Et, watch as ke, onScopeDispose as ss, defineComponent as re, onMounted as ls, onBeforeUnmount as De, resolveComponent as rs, openBlock as f, createElementBlock as h, normalizeStyle as Me, Fragment as te, renderList as ve, toDisplayString as N, createCommentVNode as R, createElementVNode as b, createBlock as Q, nextTick as Kt, useId as Vn, unref as E, normalizeClass as Pt, createVNode as pe, withDirectives as pn, withKeys as Ye, withModifiers as Le, vModelText as vn, renderSlot as be, useSlots as Ht, createTextVNode as We, withCtx as Qe, reactive as Ta, resolveDynamicComponent as Wn, createSlots as rn, useModel as It, mergeModels as mn, Comment as El, Text as Pl, getCurrentScope as Al, h as Tl } from "vue";
const os = Symbol("dc.routeAdapter");
function tt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function zl() {
  const e = typeof window < "u", t = K(e ? tt(window.location.search) : ""), n = K(e ? window.location.pathname : "/"), a = () => {
    t.value = tt(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, o) => {
    const r = tt(l);
    if (!e) {
      t.value = r;
      return;
    }
    const i = `${window.location.pathname}${r}${window.location.hash}`;
    o === "push" ? window.history.pushState(window.history.state, "", i) : window.history.replaceState(window.history.state, "", i), t.value = r, n.value = window.location.pathname;
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
const is = ["list", "cards", "grid", "images", "table", "links", "preview"], Qd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], nn = ["ok", "running", "queued", "review", "failed"], Zd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Jd = [480, 620, 760, 900, 1100], Ll = "cards", zn = "updated";
function cs(e) {
  return typeof e == "string" && is.includes(e);
}
const Rl = {
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
function us(e, t = {}) {
  const n = bt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function ds(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function fs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of ds(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Fl = { key: zn, label: zn };
function rt(e, t, n = null) {
  const a = fs(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === zn) ?? a[0] ?? Fl;
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
function ps(e) {
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
function vs(e) {
  return Object.values(e).some(ps);
}
function jn(e) {
  return e.entity === null && e.expr.trim() === "" && !vs(e.facets);
}
function ef(e) {
  return e.entity !== null;
}
function Xn(e) {
  return e.entity === null && e.view === "cards";
}
function Nl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Gn(e, t = {}) {
  const a = t.landing === "entity" ? us(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && cs(t.view) ? t.view : Ll,
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
function hs(e, t) {
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
function Il(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function wt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Ol(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Dl(e) {
  return String(e + 1).padStart(2, "0");
}
const Ln = "—";
function Ve(e, t) {
  return e.find((n) => n.role === t);
}
function gs(e, t) {
  return e.filter((n) => n.role === t);
}
function Bl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const ql = ["id", "entityKey", "entityLabel"];
function Oe(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (ql.includes(n))
      return t[n];
  }
}
function La(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Kl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Vl(e, t) {
  if (e == null || e === "") return Ln;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Il(n) : String(e);
  }
  return t === "date" ? Ol(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Ln : String(e);
}
function Ut(e, t) {
  const n = Oe(e, t);
  return e.format ? e.format(n, t) : Vl(n, e.kind);
}
function Wl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function _s(e, t) {
  const n = Ut(e, t), a = Wl(Oe(e, t));
  return a && a !== n ? a : n;
}
function cn(e, t) {
  return e ? Ut(e, t) : "";
}
function Ra(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Hl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Fa(e) {
  return [Hl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Rn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ul = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function jl(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const o = e[l];
    if (a) {
      o === a ? a = null : n += o;
      continue;
    }
    if (o === '"' || o === "'") {
      a = o;
      continue;
    }
    if (/\s/.test(o)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += o;
  }
  return s(), t;
}
function Re(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of jl(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), r = o ? s.slice(1) : s, i = o ? { negated: !0 } : {}, c = Ul.exec(r);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...i
    }) : a.push({ kind: "text", value: r, ...i });
  }
  return a.length && n.push(a), n;
}
const Mn = (e) => e.toLowerCase().replace(/\s+/g, ""), Xl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Gl(e, t, n) {
  const a = Mn(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key === e || c.field === e || c.label !== void 0 && Mn(c.label) === a
  );
  if (l) return Oe(l, t);
  const o = n.facets.find((c) => Mn(c.label) === a);
  if (o && o.key in t.fields) return t.fields[o.key];
  const r = Xl.find(([c]) => c === a)?.[1];
  if (r) {
    const c = Ve(s, r);
    if (c) return Oe(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = gs(s, "metric")[Number(i[1]) - 1];
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
function Yl(e, t, n) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((r) => {
      const i = Ve(o, r), c = i ? Oe(i, t) : void 0;
      return typeof c == "string" && En(c, e.value);
    });
  }
  const a = Gl(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (r) => e.comparator === "=" ? Na(String(r), e.value) : En(String(r), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof a == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? a : o === "false" || o === "no" ? !a : null;
    }
    if (typeof a == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? a === o : null;
    }
    return e.comparator === "=" ? Na(String(a), e.value) : En(String(a), e.value);
  }
  const s = Number(e.value), l = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(l) ? null : Ql(e.comparator, l, s);
}
function Ia(e, t, n) {
  const a = Yl(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function Ql(e, t, n) {
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
function Zl(e, t, n) {
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
function tf(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ft(e) {
  return e.filter((t) => t.length).map((t) => t.map(jt).join(" ")).join(" OR ");
}
function Jl(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function er(e) {
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
  return !!e.negated == !!t.negated && ys(e, t);
}
function Vt(e, t) {
  return !!e.negated != !!t.negated && ys(e, t);
}
function ys(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && qa(e.value, t.value) : t.kind === "text" && qa(e.value, t.value);
}
function tr(e, t) {
  return t.filter((n) => !e.some((a) => yn(a, n)));
}
function Yn(e, t) {
  return ws(e, t, (n) => n);
}
function nr(e, t) {
  return ws(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Vt(s, l)))
  );
}
function ws(e, t, n) {
  const a = Re(e), s = Re(t);
  return a.length ? s.length ? ft(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...tr(l, o)])
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
function ks(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const ar = 7, sr = 3;
function lr(e, t, n, a) {
  const s = (t * ar + on(n)) % a, l = [];
  for (let o = 0; o < Math.min(sr, a); o++)
    l.push(ks(e, (s + o) % a));
  return l;
}
function rr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? or(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function or(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function ir(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, o = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${o}`;
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
function cr(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const r = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], d = Math.floor(i / l.length), m = on(`${a}:${e.key}:${c[0]}:${i}`), w = ks(e.key, i), $ = new Date(s.getTime() - m % 900 * 36e5).toISOString(), x = {};
    for (const S of e.columns ?? []) {
      const g = S.field ?? S.key;
      if (!g || S.value) continue;
      const k = ir(S, {
        hash: on(`${m}:${g}`),
        sample: c,
        revision: d,
        updatedAt: $
      });
      k !== void 0 && (x[g] = k);
    }
    for (const S of e.facets)
      x[S.key] = rr(S, on(`${m}:${S.key}`));
    for (const [S, g] of o)
      x[S] = g === e.key ? w : lr(g, i, S, n);
    r.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: x });
  }
  return r;
}
function ur(e, t) {
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
function dr(e, t) {
  const n = e.find((o) => o.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", l = a === "date" || n.role === "updated";
  return (o, r) => {
    const i = Oe(n, o), c = Oe(n, r);
    return s ? Number(c ?? 0) - Number(i ?? 0) : l ? Date.parse(String(c ?? "")) - Date.parse(String(i ?? "")) : String(c ?? "").localeCompare(String(i ?? ""));
  };
}
function fr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), r = cr(a, { ...e, scopes: o });
    return t.set(a.key, r), r;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: o, offset: r }) {
      const i = Re(a.expr), c = l ? [l] : s.entities, d = [], m = [];
      for (const x of c)
        for (const S of n(x, s))
          d.push(S), (l ? ur(S, a.facets) : !0) && Zl(i, S, x) && m.push(S);
      const w = rt(l, a.sort, s), $ = m.sort(dr(ds(l, s), w.key));
      return a.dir === "asc" && $.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: $.slice(r, r + o),
        total: m.length,
        unfiltered: m.length === d.length
      };
    }
  };
}
function Qn(e, t) {
  return bs(e, t.id);
}
function bs(e, t) {
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
  return s.some((r) => r.some((i) => yn(i, a))) ? n : s.some((r) => r.some((i) => Vt(i, a))) ? ft(
    s.map(
      (r) => r.map((i) => Vt(i, a) ? a : i)
    )
  ) : `${n} ${t}`;
}
function $s(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function xs(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Re(t).flat();
  if (!n) return null;
  const a = Re(e).flat();
  return a.some((s) => yn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Vt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Cs(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Re(t).flat();
  if (!n) return e;
  const a = Re(e), s = a.map(
    (l) => l.filter((o) => !yn(o, n) && !Vt(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : ft(s);
}
function Va(e, t, n) {
  return t ? n === null ? Cs(e, t) : Jn(e, n === "out" ? $s(t) : t) : e;
}
function Be(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey ? { exclude: !0 } : {};
}
function pr(e, t, n, a = {}) {
  const s = Zn(e, n);
  return Jn(t.expr, a.exclude ? $s(s) : s);
}
function Ss(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Re(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : ft(s);
}
function Ms(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const Es = Symbol("dc.shellContext");
function vr(e) {
  return Kn(Es, e), e;
}
function ye() {
  const e = Mt(Es, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const ea = "e", ta = "v", na = "s", aa = "d", sa = "q", la = "p", ra = "f_", Ps = "*", mr = [
  ea,
  ta,
  na,
  aa,
  sa,
  la
], Fn = "..", As = ",", hr = [
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
  for (const [n, a] of hr) t = t.replace(n, a);
  return t;
}
function et(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Ts(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([et(l), o]);
  }
  return n;
}
function gr(e) {
  return mr.includes(e) || e.startsWith(ra);
}
function Wa(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function _r(e, t) {
  const n = et(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(As).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => a.has(l)) };
    }
    case "range": {
      const a = n.indexOf(Fn), s = (a === -1 ? n : n.slice(0, a)).trim(), l = (a === -1 ? "" : n.slice(a + Fn.length)).trim(), o = s === "" ? null : Number(s), r = l === "" ? null : Number(l);
      let i = o !== null && Number.isFinite(o) ? Wa(o, e.min, e.max) : null, c = r !== null && Number.isFinite(r) ? Wa(r, e.min, e.max) : null;
      return i !== null && c !== null && i > c && ([i, c] = [c, i]), { kind: "range", min: i, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function yr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(As) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Fn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function wr(e, t, n = {}) {
  const a = Gn(t, n), s = new Map(Ts(e)), l = s.get(ea), o = l === void 0 ? a.entity : et(l), r = o === Ps ? null : bt(t, o), i = s.get(ta), c = i && cs(et(i)) ? et(i) : a.view, d = s.get(na), m = rt(r, d ? et(d) : n.sort, t), w = s.get(aa), $ = w ? et(w) === "asc" ? "asc" : "desc" : a.dir, x = s.get(sa), S = s.get(la), g = S === void 0 ? 1 : Number(et(S)), k = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1, T = {};
  for (const z of r?.facets ?? []) {
    const L = s.get(`${ra}${z.key}`);
    T[z.key] = L === void 0 ? Un(z) : _r(z, L);
  }
  return {
    entity: r?.key ?? null,
    view: c,
    sort: m.key,
    dir: $,
    expr: x === void 0 ? "" : et(x),
    facets: hs(r, T),
    page: k
  };
}
function Ha(e, t, n = {}, a = "") {
  const s = Gn(t, n), l = bt(t, e.entity), o = Ts(a).filter(([m]) => !gr(m)), r = [], i = (m, w) => r.push([m, Pn(w)]), c = l?.key ?? null;
  c !== s.entity && i(ea, c ?? Ps), e.view !== s.view && i(ta, e.view), e.sort !== s.sort && i(na, e.sort), e.dir !== s.dir && i(aa, e.dir), e.expr.trim() !== "" && i(sa, e.expr);
  for (const m of l?.facets ?? []) {
    const w = e.facets[m.key];
    if (!w) continue;
    const $ = yr(w, m);
    $ !== null && r.push([`${ra}${m.key}`, Pn($)]);
  }
  e.page > 1 && i(la, String(e.page));
  const d = [
    ...o.map(([m, w]) => [Pn(m), w]),
    ...r
  ];
  return d.length ? `?${d.map(([m, w]) => w === "" ? m : `${m}=${w}`).join("&")}` : "";
}
const hn = "entity", Wt = "expr";
function kr(e, t) {
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
    id: hn,
    label: `entity:${t.key}`,
    facetKey: hn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && ps(s) && n.push(...kr(a, s));
  }
  return Re(e.expr).forEach((a, s) => {
    a.forEach((l, o) => {
      n.push({
        id: `${Wt}:${s}:${o}`,
        label: jt(l),
        facetKey: Wt,
        group: s,
        index: o,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function br(e, t, n = null) {
  if (jn(e)) {
    const l = rt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = oa(e, t).filter((l) => l.facetKey !== Wt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function $r(e) {
  const { adapter: t } = e, n = v(() => Ft(e.schema)), a = v(() => Ft(e.defaults) ?? {}), s = v(() => wr(t.search.value, n.value, a.value)), l = v(() => bt(n.value, s.value.entity)), o = v(() => l.value ?? us(n.value, a.value)), r = v(() => fs(l.value, n.value)), i = v(() => rt(l.value, s.value.sort, n.value)), c = (g, k) => {
    const T = Ha(g, n.value, a.value, t.search.value);
    T !== t.search.value && (k === "push" ? t.push(T) : t.replace(T));
  }, d = () => Ft(e.navigationMode) ?? "push", m = () => Ft(e.facetNavigationMode) ?? "replace", w = (g, k) => {
    const T = g.page ?? (za(g) ? 1 : s.value.page);
    c({ ...s.value, ...g, page: T }, k);
  }, $ = (g, k) => {
    const T = s.value.facets[g];
    if (!T) return;
    const z = { ...s.value.facets, [g]: k(T) };
    w({ facets: z }, m());
  }, x = (g) => {
    const k = g === null ? null : bt(n.value, g);
    return (k?.key ?? null) === s.value.entity ? {} : {
      entity: k?.key ?? null,
      sort: rt(k, s.value.sort, n.value).key,
      facets: At(k)
    };
  }, S = (g) => {
    const k = x(g);
    Object.keys(k).length && w(k, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: i,
    sorts: r,
    summary: v(() => br(s.value, l.value, n.value)),
    terms: v(() => oa(s.value, l.value)),
    isPristine: v(() => jn(s.value)),
    isEverything: v(() => s.value.entity === null),
    hasFacets: v(() => vs(s.value.facets)),
    setEntity: S,
    clearEntity: () => S(null),
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
    narrow(g, k, T) {
      w({ expr: g, ...x(k), ...T ? { view: T } : {} }, d());
    },
    setPage(g, k) {
      w({ page: Math.max(1, Math.floor(g)) }, k ?? d());
    },
    setFacet(g, k) {
      $(g, () => k);
    },
    toggleChip(g, k) {
      $(g, (T) => T.kind !== "chips" ? T : { kind: "chips", selected: T.selected.includes(k) ? T.selected.filter((L) => L !== k) : [...T.selected, k] });
    },
    setRange(g, k, T) {
      $(g, (z) => z.kind === "range" ? { kind: "range", min: k, max: T } : z);
    },
    toggleFlag(g) {
      $(
        g,
        (k) => k.kind === "toggle" ? { kind: "toggle", on: !k.on } : k
      );
    },
    removeTerm(g) {
      if (g.facetKey === hn) {
        S(null);
        return;
      }
      if (g.facetKey === Wt) {
        const k = Jl(Re(s.value.expr), g.group ?? 0, g.index ?? 0);
        w({ expr: ft(k) }, d());
        return;
      }
      $(g.facetKey, (k) => k.kind === "chips" && g.option ? { kind: "chips", selected: k.selected.filter((T) => T !== g.option) } : k.kind === "range" ? { kind: "range", min: null, max: null } : k.kind === "toggle" ? { kind: "toggle", on: !1 } : k);
    },
    clearFilters() {
      w({ entity: null, expr: "", facets: At(null) }, d());
    },
    reset() {
      c(Gn(n.value, a.value), d());
    },
    hrefFor(g) {
      const k = { ...s.value, ...g };
      return k.page = g.page ?? (za(g) ? 1 : s.value.page), k.facets = hs(bt(n.value, k.entity), k.facets), `${t.path.value}${Ha(k, n.value, a.value, t.search.value)}`;
    }
  };
}
function xr(e) {
  const t = Et([]), n = K(0), a = K(!1), s = Et(null);
  let l = 0, o = null;
  const r = v(() => (e.query.value.page - 1) * e.limit.value), i = v(() => Nl(n.value, e.limit.value)), c = () => {
    const g = e.query.value, k = e.within?.value.trim(), T = Ss(e.entity.value, g.expr);
    return k ? { ...g, expr: Yn(k, T) } : T === g.expr ? g : { ...g, expr: T };
  }, d = (g) => {
    t.value = g.rows, n.value = g.total, s.value = null;
  }, m = (g) => {
    s.value = g, t.value = [], n.value = 0;
  }, w = (g, k) => {
    let T = !0;
    const z = () => g === l, L = () => {
      T && (T = !1, t.value = [], n.value = 0), s.value = null;
    };
    return {
      get open() {
        return z();
      },
      insert(I, H) {
        if (!z()) return;
        const y = Array.isArray(I) ? I : [I];
        if (!y.length) return;
        L();
        const P = [...t.value];
        P.splice(H ?? P.length, 0, ...y), t.value = k > 0 ? P.slice(0, k) : P, n.value += y.length;
      },
      set(I) {
        z() && (I.rows && (L(), t.value = k > 0 ? I.rows.slice(0, k) : I.rows, n.value = I.rows.length), I.total !== void 0 && (n.value = I.total));
      },
      close() {
        z() && (a.value = !1);
      },
      fail(I) {
        z() && (m(I), a.value = !1);
      }
    };
  }, $ = () => {
    const g = o;
    o = null, g?.();
  }, x = () => {
    const g = ++l;
    $();
    const k = {
      query: c(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: r.value
    }, T = e.source.value;
    if (T.stream) {
      a.value = !0;
      try {
        o = T.stream(k, w(g, k.limit)) ?? null;
      } catch (L) {
        m(L), a.value = !1;
      }
      return;
    }
    let z;
    try {
      z = T.query(k);
    } catch (L) {
      m(L);
      return;
    }
    if (!(z instanceof Promise)) {
      d(z), a.value = !1;
      return;
    }
    a.value = !0, z.then((L) => {
      g === l && d(L);
    }).catch((L) => {
      g === l && m(L);
    }).finally(() => {
      g === l && (a.value = !1);
    });
  }, S = v(() => {
    const g = c();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(ms.map((T) => g[T]))}|${g.page}`;
  });
  return ke([e.source, S, e.limit], x, {
    immediate: !0
  }), ss(() => {
    l++, $();
  }, !0), { rows: t, total: n, offset: r, pageCount: i, pending: a, error: s, refresh: x };
}
const Ot = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Cr = ["aria-label"], Sr = ["role", "aria-label"], Mr = ["data-dc-item"], Er = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Pr = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Ar = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Tr = { class: "dc-menu__label dc-truncate" }, zr = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Lr = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Rr = /* @__PURE__ */ re({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = K(null), o = K([]), r = K(null), i = K(null), c = K(null), d = K(!1), m = v(
      () => a.items.flatMap((y, P) => Ot(y) ? [P] : [])
    ), w = v(() => {
      const y = [{ entries: [] }];
      return a.items.forEach((P, O) => {
        P.heading ? y.push({ heading: P, entries: [] }) : y[y.length - 1]?.entries.push({ item: P, index: O });
      }), y.filter((P) => P.entries.length > 0);
    }), $ = K({ x: a.at.x, y: a.at.y });
    async function x() {
      $.value = { x: a.at.x, y: a.at.y }, await Kt();
      const y = l.value?.getBoundingClientRect();
      if (!y) return;
      const P = 8;
      let O = a.at.x, j = a.at.y;
      if (O + y.width > window.innerWidth - P) {
        const ue = a.at.mirrorX === void 0 ? null : a.at.mirrorX - y.width;
        O = ue !== null && ue >= P ? ue : window.innerWidth - y.width - P;
      }
      j + y.height > window.innerHeight - P && (j = window.innerHeight - y.height - P), $.value = { x: Math.max(P, O), y: Math.max(P, j) };
    }
    const S = v(() => ({ left: `${$.value.x}px`, top: `${$.value.y}px` }));
    function g(y) {
      r.value = y, y !== null && Kt(() => o.value[y]?.focus());
    }
    function k(y, P) {
      const O = m.value;
      if (O.length === 0) return null;
      if (y === null) return P === 1 ? O[0] ?? null : O[O.length - 1] ?? null;
      const j = O.indexOf(y);
      return j === -1 ? O[0] ?? null : O[(j + P + O.length) % O.length] ?? null;
    }
    function T(y, P) {
      if (!a.items[y]?.items?.length) return;
      const j = o.value[y]?.getBoundingClientRect(), ue = l.value?.getBoundingClientRect();
      !j || !ue || (c.value = { x: ue.right - 4, y: j.top - 4, mirrorX: ue.left + 4 }, i.value = y, d.value = P);
    }
    function z(y) {
      const P = i.value;
      i.value = null, c.value = null, y && P !== null && g(P);
    }
    function L(y) {
      const P = a.items[y];
      if (!(!P || !Ot(P))) {
        if (P.items?.length) {
          T(y, !0);
          return;
        }
        s("choose", P);
      }
    }
    function I(y) {
      const P = y.key;
      if (P === "Escape") {
        y.preventDefault(), y.stopPropagation(), i.value !== null ? z(!0) : s("dismiss");
        return;
      }
      if (P === "ArrowDown" || P === "ArrowUp") {
        y.preventDefault(), y.stopPropagation(), z(!1), g(k(r.value, P === "ArrowDown" ? 1 : -1));
        return;
      }
      if (P === "Home" || P === "End") {
        y.preventDefault(), y.stopPropagation(), z(!1), g(k(null, P === "Home" ? 1 : -1));
        return;
      }
      if (P === "ArrowRight") {
        const O = r.value;
        O !== null && a.items[O]?.items?.length && (y.preventDefault(), y.stopPropagation(), T(O, !0));
        return;
      }
      if (P === "ArrowLeft") {
        i.value !== null && (y.preventDefault(), y.stopPropagation(), z(!0));
        return;
      }
      if (P === "Enter" || P === " ") {
        const O = r.value;
        if (O === null) return;
        y.preventDefault(), y.stopPropagation(), L(O);
      }
    }
    function H(y) {
      const P = a.items[y];
      !P || !Ot(P) || (i.value !== null && i.value !== y && z(!1), g(y), P.items?.length && T(y, !1));
    }
    return ls(() => {
      x(), a.autofocus && g(k(null, 1));
    }), ke(() => a.at, x, { deep: !0 }), ke(() => a.items, () => void x(), { deep: !0 }), De(() => {
      i.value = null;
    }), t({ root: l }), (y, P) => {
      const O = rs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Me(S.value),
        onKeydown: I
      }, [
        (f(!0), h(te, null, ve(w.value, (j, ue) => (f(), h("div", {
          key: `${ue}-${j.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: j.heading ? "group" : "none",
          "aria-label": j.heading?.label
        }, [
          j.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": j.heading.id
          }, N(j.heading.label), 9, Mr)) : R("", !0),
          (f(!0), h(te, null, ve(j.entries, ({ item: Z, index: _e }) => (f(), h(te, {
            key: Z.id ?? `${_e}-${Z.label ?? ""}`
          }, [
            Z.separator ? (f(), h("div", Er)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (xe) => {
                xe && (o.value[_e] = xe);
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
              b("span", Ar, N(Z.checked ? "✓" : ""), 1),
              b("span", Tr, N(Z.label), 1),
              Z.shortcut ? (f(), h("span", zr, N(Z.shortcut), 1)) : Z.items?.length ? (f(), h("span", Lr, "›")) : R("", !0)
            ], 40, Pr))
          ], 64))), 128))
        ], 8, Sr))), 128)),
        i.value !== null && c.value ? (f(), Q(O, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: c.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: P[0] || (P[0] = (j) => s("choose", j)),
          onDismiss: P[1] || (P[1] = (j) => z(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
      ], 44, Cr);
    };
  }
}), ie = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ia = /* @__PURE__ */ ie(Rr, [["__scopeId", "data-v-9b1413fa"]]), Fr = { class: "dc-pick" }, Nr = ["id"], Ir = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Or = { class: "dc-pick__label" }, Dr = /* @__PURE__ */ re({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Vn() ?? "dc-pick", l = K(null), o = K(null), r = K(null), i = K(!1), c = v(() => r.value !== null), d = v(
      () => n.options.find((z) => z.key === n.modelValue) ?? n.options[0]
    ), m = v(
      () => n.options.map((z) => ({
        id: z.key,
        label: z.label,
        checked: z.key === n.modelValue
      }))
    ), w = v(
      () => r.value ? { maxHeight: `${window.innerHeight - r.value.y - 8}px` } : void 0
    );
    function $(z) {
      const L = l.value?.getBoundingClientRect();
      L && (r.value = { x: L.left, y: L.bottom + 4, mirrorX: L.right }, i.value = z, a("open"));
    }
    function x(z) {
      r.value = null, z && l.value?.focus();
    }
    function S() {
      c.value ? x(!0) : $(!1);
    }
    function g(z) {
      z.key !== "ArrowDown" && z.key !== "ArrowUp" || c.value || (z.preventDefault(), $(!0));
    }
    function k(z) {
      const L = z.target;
      L && (l.value?.contains(L) || o.value?.root?.contains(L) || x(!1));
    }
    ke(c, (z) => {
      z ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), De(() => window.removeEventListener("pointerdown", k, !0));
    function T(z) {
      x(!0), !(z.id === void 0 || z.id === n.modelValue) && a("update:modelValue", z.id);
    }
    return (z, L) => (f(), h("span", Fr, [
      b("span", {
        id: `${E(s)}-name`,
        class: "dc-pick__name"
      }, N(e.label), 9, Nr),
      b("button", {
        id: `${E(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: Pt(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${E(s)}-name ${E(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: S,
        onKeydown: g
      }, [
        b("span", Or, N(d.value?.label), 1)
      ], 42, Ir),
      L[1] || (L[1] = b("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      r.value ? (f(), Q(ia, {
        key: 0,
        ref_key: "menu",
        ref: o,
        class: "dc-pick__list",
        style: Me(w.value),
        items: m.value,
        at: r.value,
        label: e.label,
        autofocus: i.value,
        onChoose: T,
        onDismiss: L[0] || (L[0] = (I) => x(!0))
      }, null, 8, ["style", "items", "at", "label", "autofocus"])) : R("", !0)
    ]));
  }
}), Ua = /* @__PURE__ */ ie(Dr, [["__scopeId", "data-v-b2ce0fd5"]]);
function Br(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = K(!0);
  let a = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++a, o = e.query.value, r = e.schema.value, i = e.entities.value, c = e.within?.value.trim() ?? "";
    n.value = o.expr.trim() === "" && !c;
    const d = /* @__PURE__ */ new Map();
    for (const m of i) {
      const w = Ss(m, o.expr), $ = c ? Yn(c, w) : w, x = e.source.value.query({
        query: { ...o, entity: m.key, expr: $, facets: At(m), page: 1 },
        schema: r,
        entity: m,
        limit: 0,
        offset: 0
      });
      x instanceof Promise ? (d.set(m.key, { total: 0, pending: !0 }), x.then((S) => {
        if (l !== a) return;
        const g = new Map(t.value);
        g.set(m.key, { total: S.total, pending: !1 }), t.value = g;
      })) : d.set(m.key, { total: x.total, pending: !1 });
    }
    t.value = d;
  } };
}
const qr = 25, zs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Kr(e, t) {
  return e.find((n) => zs(n.id, t));
}
function Vr(e) {
  const t = Et(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (r) => {
    if (r.facetKey !== Wt || !r.field || !r.value) return null;
    const i = Ms(e.schema.value, r.field);
    return i ? { entity: i, id: r.value, key: `${i.key}:${r.value}` } : null;
  }, s = (r) => {
    const { entity: i, id: c } = r, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: bs(i, c) ?? "",
        facets: At(i),
        sort: rt(i, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: qr,
      offset: 0
    });
  }, l = (r, i) => {
    const c = cn(Ve(r.columns ?? [], "identity"), i);
    return c === Ln || zs(c, i.id) ? "" : c;
  }, o = () => {
    const r = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = a(d);
      m && !t.value.has(m.key) && !n.has(m.key) && r.set(m.key, m);
    }
    if (!r.size) return;
    const i = [...r.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const m = new Map(t.value);
      d.forEach((w, $) => {
        const { reference: x } = i[$], S = Kr(w.rows, x.id);
        m.set(x.key, S ? l(x.entity, S) : "");
      }), t.value = m;
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
      o();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(r) {
      const i = a(r);
      return i && t.value.get(i.key) || null;
    }
  };
}
const Wr = ["data-dc-expanded"], Hr = { class: "dc-header__domain" }, Ur = {
  key: 0,
  class: "dc-header__within"
}, jr = ["title"], Xr = ["data-dc-more", "title"], Gr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Yr = ["title", "aria-label", "onClick"], Qr = ["onKeydown"], Zr = ["aria-expanded", "aria-controls"], Jr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, eo = { class: "dc-header__sr" }, to = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, no = ["disabled"], ao = ["title"], so = ["value", "onKeydown"], lo = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, ro = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, oo = ["disabled"], io = {
  key: 1,
  class: "dc-header__actions"
}, co = /* @__PURE__ */ re({
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
    const n = e, a = t, s = ye(), l = v(() => s.schema.value), o = v(
      () => s.hasFacets.value || !!s.query.value.expr.trim() || !!s.within.value
    ), r = v(() => l.value.formatCount ?? wt), i = Br({
      source: s.source,
      schema: s.schema,
      query: s.query,
      entities: s.entities,
      within: s.within
    });
    function c(D) {
      if (n.hideCount) return D.count;
      if (D.key === s.query.value.entity && o.value) return r.value(s.total.value);
      if (i.pristine.value) return D.count;
      const M = i.counts.value.get(D.key);
      return M ? `${M.pending ? "~" : ""}${r.value(M.total)}` : D.count;
    }
    function d(D) {
      return `${D.label} · ${c(D)}`;
    }
    const m = v(() => [
      { key: "", label: "Everything" },
      ...s.entities.value.map((D) => ({ key: D.key, label: d(D) }))
    ]), w = v(() => {
      const D = s.within.value.trim();
      return D ? oa({ ...s.query.value, expr: D, facets: {} }, null) : [];
    }), $ = v(
      () => (n.views ?? [...is]).map((D) => ({ key: D, label: Rl[D] }))
    ), x = v(() => Hn(s.query.value.view, n.views)), S = v(() => s.query.value.entity !== null);
    function g(D) {
      s.setView(D);
    }
    const k = v(() => {
      const D = s.entity.value, G = D?.keepsScope ? void 0 : D?.scope?.toLowerCase();
      return s.terms.value.filter((M) => M.facetKey !== hn).map((M, W, ae) => {
        const Ce = ae[W - 1];
        return {
          term: M,
          or: Ce?.group !== void 0 && M.group !== void 0 && M.group !== Ce.group,
          idle: !!G && M.field?.toLowerCase() === G
        };
      });
    }), T = Vr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...w.value, ...s.terms.value])
    });
    function z(D) {
      return Ms(l.value, D)?.scopeLabel ?? D;
    }
    function L(D) {
      return D.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function I(D) {
      const G = T.nameOf(D);
      return G ? `${D.negated ? "-" : ""}${z(D.field)}: ${L(G)}` : D.label;
    }
    function H(D) {
      s.setEntity(D || null);
    }
    const y = K(""), P = K(null);
    function O() {
      const D = y.value.trim();
      D && (s.setExpression(nr(s.query.value.expr, D)), y.value = "");
    }
    function j() {
      y.value = "", P.value?.blur();
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
    function C() {
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
        q?.disconnect(), q = null, C(), !(!D || typeof ResizeObserver > "u") && (q = new ResizeObserver(C), q.observe(D));
      },
      { flush: "post" }
    ), ke(k, C, { flush: "post" }), De(() => q?.disconnect());
    const U = v(() => s.query.value.page), se = v(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !Xn(s.query.value)
    ), he = v(
      () => `${s.pending.value ? "~" : ""}${wt(s.pageCount.value)}`
    ), Ee = v(() => {
      let D = `Page ${wt(U.value)} of ${he.value}`;
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
    return (D, G) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      b("div", {
        class: "dc-header__trigger",
        onClick: Z
      }, [
        b("span", Hr, N(l.value.label), 1),
        w.value.length ? (f(), h("span", Ur, [
          G[4] || (G[4] = b("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(te, null, ve(w.value, (M) => (f(), h("span", {
            key: `scope:${M.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: I(M)
          }, N(I(M)), 9, jr))), 128))
        ])) : R("", !0),
        b("div", {
          ref_key: "termBar",
          ref: _e,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": xe.value,
          title: E(s).summary.value,
          onScroll: C
        }, [
          S.value ? (f(), Q(Ua, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": E(s).query.value.entity ?? "",
            options: m.value,
            onOpen: E(i).refresh,
            "onUpdate:modelValue": H
          }, null, 8, ["model-value", "options", "onOpen"])) : R("", !0),
          pe(Ua, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": x.value,
            options: $.value,
            "onUpdate:modelValue": g
          }, null, 8, ["model-value", "options"]),
          (f(!0), h(te, null, ve(k.value, (M) => (f(), h(te, {
            key: M.term.id
          }, [
            M.or ? (f(), h("span", Gr, "or")) : R("", !0),
            b("button", {
              type: "button",
              class: Pt(["dc-term dc-mono", { "dc-term--idle": M.idle }]),
              title: M.idle ? `Not applied to ${E(s).entity.value?.label} — remove ${I(M.term)}` : `Remove ${I(M.term)}`,
              "aria-label": `Remove ${I(M.term)}`,
              onClick: (W) => E(s).removeTerm(M.term)
            }, N(I(M.term)), 11, Yr)
          ], 64))), 128)),
          pn(b("input", {
            ref_key: "searchBox",
            ref: P,
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
          }, null, 40, Qr), [
            [vn, y.value]
          ])
        ], 40, Xr),
        b("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: G[1] || (G[1] = (M) => a("toggle"))
        }, [
          b("span", Jr, N(e.expanded ? "▲" : "▼"), 1),
          b("span", eo, N(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Zr)
      ]),
      se.value ? (f(), h("nav", to, [
        b("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: U.value <= 1,
          onClick: G[2] || (G[2] = (M) => E(s).setPage(U.value - 1))
        }, [...G[5] || (G[5] = [
          b("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, no),
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
          }, null, 44, so),
          b("span", lo, "/ " + N(he.value), 1)
        ], 8, ao),
        b("span", ro, N(Ee.value), 1),
        b("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: U.value >= E(s).pageCount.value,
          onClick: G[3] || (G[3] = (M) => E(s).setPage(U.value + 1))
        }, [...G[6] || (G[6] = [
          b("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, oo)
      ])) : R("", !0),
      D.$slots.actions ? (f(), h("div", io, [
        be(D.$slots, "actions", {}, void 0, !0)
      ])) : R("", !0)
    ], 8, Wr));
  }
}), Ls = /* @__PURE__ */ ie(co, [["__scopeId", "data-v-270c68d0"]]), uo = { class: "dc-facet" }, fo = ["id"], po = { class: "dc-facet__body" }, vo = ["aria-labelledby"], mo = ["aria-pressed", "data-dc-active", "onClick"], ho = ["aria-labelledby"], go = ["aria-label", "placeholder", "onKeydown"], _o = ["aria-label", "placeholder", "onKeydown"], yo = ["aria-checked"], wo = { class: "dc-switch__text" }, ko = ["data-dc-active"], bo = /* @__PURE__ */ re({
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
      const w = s.value.has(m) ? n.value.selected.filter(($) => $ !== m) : [...n.value.selected, m];
      a("update", { kind: "chips", selected: w });
    }
    const o = K(""), r = K("");
    ke(
      () => n.value,
      (m) => {
        m.kind === "range" && (o.value = m.min === null ? "" : m.min, r.value = m.max === null ? "" : m.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(m) {
      if (typeof m == "number") return Number.isFinite(m) ? m : null;
      const w = m.trim();
      if (!w) return null;
      const $ = Number(w);
      return Number.isFinite($) ? $ : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const m = i(o.value), w = i(r.value);
      m === n.value.min && w === n.value.max || a("update", { kind: "range", min: m, max: w });
    }
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (m, w) => (f(), h("div", uo, [
      b("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, N(e.facet.label), 9, fo),
      b("div", po, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), h(te, null, ve(e.facet.options, ($) => (f(), h("button", {
            key: $,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has($),
            "data-dc-active": s.value.has($) ? "true" : "false",
            onClick: (x) => l($)
          }, N($), 9, mo))), 128))
        ], 8, vo)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          pn(b("input", {
            "onUpdate:modelValue": w[0] || (w[0] = ($) => o.value = $),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(Le(c, ["prevent"]), ["enter"])
          }, null, 40, go), [
            [vn, o.value]
          ]),
          w[2] || (w[2] = b("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          pn(b("input", {
            "onUpdate:modelValue": w[1] || (w[1] = ($) => r.value = $),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(Le(c, ["prevent"]), ["enter"])
          }, null, 40, _o), [
            [vn, r.value]
          ])
        ], 8, ho)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          b("span", wo, N(e.facet.text), 1),
          b("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...w[3] || (w[3] = [
            b("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, ko)
        ], 8, yo)) : R("", !0)
      ])
    ]));
  }
}), Rs = /* @__PURE__ */ ie(bo, [["__scopeId", "data-v-36d1334b"]]), $o = ["id"], xo = { class: "dc-panel__section dc-panel__rows" }, Co = { class: "dc-panel__row" }, So = ["for"], Mo = ["title", "aria-label", "onClick"], Eo = ["id", "placeholder", "onKeydown"], Po = { class: "dc-panel__actions" }, Ao = ["disabled"], To = {
  key: 0,
  class: "dc-panel__section"
}, zo = /* @__PURE__ */ re({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Ht(), s = ye(), l = v(() => er(s.query.value.expr)), o = v(() => l.value.parts.map(jt)), r = K(l.value.text), i = K(null);
    ke(
      () => l.value.text,
      (S) => {
        r.value = S;
      }
    );
    const c = v(() => r.value !== l.value.text);
    function d() {
      c.value && s.setExpression(Ba(l.value.parts, r.value)), n("close");
    }
    function m(S) {
      const { parts: g, text: k } = l.value;
      s.setExpression(Ba(g.filter((T, z) => z !== S), k));
    }
    function w(S) {
      const { parts: g } = l.value;
      r.value || !g.length || (S.preventDefault(), m(g.length - 1));
    }
    function $() {
      r.value = "", s.clearFilters();
    }
    function x(S, g) {
      s.setFacet(S, g);
    }
    return Kt(() => i.value?.focus()), (S, g) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: g[2] || (g[2] = Ye(Le((k) => n("close"), ["stop"]), ["esc"]))
    }, [
      b("section", xo, [
        b("div", Co, [
          b("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, So),
          b("div", {
            class: "dc-field",
            onMousedown: g[1] || (g[1] = Le((k) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(te, null, ve(o.value, (k, T) => (f(), h("button", {
              key: `${T}:${k}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${k}`,
              "aria-label": `Remove ${k}`,
              onClick: (z) => m(T)
            }, N(k), 9, Mo))), 128)),
            pn(b("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": g[0] || (g[0] = (k) => r.value = k),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: o.value.length ? "" : E(s).schema.value.placeholder,
              onKeydown: [
                Ye(Le(d, ["prevent"]), ["enter"]),
                Ye(w, ["backspace"])
              ]
            }, null, 40, Eo), [
              [vn, r.value]
            ])
          ], 32)
        ]),
        E(s).entity.value ? (f(!0), h(te, { key: 0 }, ve(E(s).entity.value.facets, (k) => (f(), Q(Rs, {
          key: k.key,
          facet: k,
          value: E(s).query.value.facets[k.key],
          onUpdate: (T) => x(k.key, T)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : R("", !0),
        b("div", Po, [
          b("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          b("button", {
            type: "button",
            class: "dc-button",
            disabled: E(s).isPristine.value && !c.value,
            onClick: $
          }, " Reset ", 8, Ao)
        ])
      ]),
      a["panel-section"] ? (f(), h("section", To, [
        be(S.$slots, "panel-section", {}, void 0, !0)
      ])) : R("", !0)
    ], 40, $o));
  }
}), Fs = /* @__PURE__ */ ie(zo, [["__scopeId", "data-v-2642c02d"]]), Lo = ["checked", "indeterminate"], Ns = /* @__PURE__ */ re({
  __name: "PageTick",
  setup(e) {
    const t = ye(), n = v(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = v(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = v(() => n.value > 0 && !a.value);
    return (l, o) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: o[0] || (o[0] = (r) => E(t).selectPage(!a.value))
    }, null, 40, Lo));
  }
}), Ro = {
  key: 0,
  class: "dc-actions"
}, Fo = {
  key: 0,
  class: "dc-actions__select"
}, No = {
  key: 0,
  class: "dc-actions__all"
}, Io = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Oo = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Do = { class: "dc-actions__ops" }, Bo = ["disabled"], qo = ["disabled"], Ko = /* @__PURE__ */ re({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), a = v(() => n.entity.value), s = v(() => !Xn(n.query.value)), l = v(() => s.value && n.selectable.value), o = v(
      () => Hn(n.query.value.view, t.views) === "table"
    ), r = v(
      () => s.value && (l.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), i = v(() => n.selection.value.ids.length), c = v(() => i.value ? `${i.value} selected` : o.value ? "None selected" : "Select all");
    function d(m) {
      return i.value ? `${m} ${i.value}` : m;
    }
    return (m, w) => r.value ? (f(), h("div", Ro, [
      l.value ? (f(), h("div", Fo, [
        o.value ? (f(), h("span", Oo, N(c.value), 1)) : (f(), h("label", No, [
          pe(Ns),
          b("span", Io, N(c.value), 1)
        ])),
        i.value ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: w[0] || (w[0] = ($) => E(n).clearSelection())
        }, " Clear ")) : R("", !0)
      ])) : R("", !0),
      b("div", Do, [
        a.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: w[1] || (w[1] = ($) => E(n).create(a.value))
        }, [
          w[4] || (w[4] = b("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + N(a.value.create), 1)
        ])) : R("", !0),
        a.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !i.value,
          onClick: w[2] || (w[2] = ($) => E(n).duplicate())
        }, N(d(a.value.duplicate)), 9, Bo)) : R("", !0),
        a.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !i.value,
          onClick: w[3] || (w[3] = ($) => E(n).delete())
        }, N(d(a.value.delete)), 9, qo)) : R("", !0)
      ])
    ])) : R("", !0);
  }
}), Is = /* @__PURE__ */ ie(Ko, [["__scopeId", "data-v-03ff2a91"]]);
function Vo(e, t) {
  if (!e) return null;
  const n = Oe(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Wo(e, t) {
  const n = Ve(t, "state"), a = Ve(t, "tint");
  return {
    identity: cn(Ve(t, "identity"), e),
    reference: cn(Ve(t, "reference"), e),
    metrics: gs(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ut(s, e)
    })),
    state: n ? Oe(n, e) ?? null : null,
    updated: cn(Ve(t, "updated"), e),
    image: Vo(Ve(t, "image"), e),
    tint: a ? Oe(a, e) ?? null : null
  };
}
function Os(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Kl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: Dl(t),
    parts: Wo(e, l),
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
      (n, a) => Os(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Ho = ["data-dc-status"], Uo = /* @__PURE__ */ re({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, N(e.status), 9, Ho));
  }
}), Xt = /* @__PURE__ */ ie(Uo, [["__scopeId", "data-v-23e59fbf"]]), jo = ["title"], Xo = { key: 1 }, Go = /* @__PURE__ */ re({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ye(), a = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), s = v(() => t.column.label ?? ""), l = v(() => Ut(t.column, t.entry.row));
    function o(r) {
      r.stopPropagation(), a.value && n.drill(t.entry.row, a.value, Be(r));
    }
    return (r, i) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onClick: o
    }, [
      be(r.$slots, "default", {}, () => [
        We(N(l.value), 1)
      ], !0)
    ], 8, jo)) : (f(), h("span", Xo, [
      be(r.$slots, "default", {}, () => [
        We(N(l.value), 1)
      ], !0)
    ]));
  }
}), Gt = /* @__PURE__ */ ie(Go, [["__scopeId", "data-v-f2501b17"]]), Yo = ["data-dc-active", "aria-pressed", "aria-label"], Qo = /* @__PURE__ */ re({
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
    return (s, l) => (f(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, N(e.pinned ? "★" : "☆"), 9, Yo));
  }
}), ca = /* @__PURE__ */ ie(Qo, [["__scopeId", "data-v-ef63d763"]]), Zo = ["src"], Jo = /* @__PURE__ */ re({
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
    ), (a, s) => e.src.trim() && !n.value ? (f(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, Zo)) : R("", !0);
  }
}), wn = /* @__PURE__ */ ie(Jo, [["__scopeId", "data-v-afaab300"]]), ei = ["data-dc-standing", "title", "aria-label"], ti = /* @__PURE__ */ re({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), a = v(() => Qn(t.entry.entity, t.entry.row)), s = v(() => xs(n.query.value.expr, a.value)), l = v(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(r) {
      r.stopPropagation(), n.setExpression(Cs(n.query.value.expr, a.value));
    }
    return (r, i) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, N(s.value === "in" ? "+" : "−"), 9, ei)) : R("", !0);
  }
}), kn = /* @__PURE__ */ ie(ti, [["__scopeId", "data-v-4b8d4166"]]), ni = ["data-dc-pending", "title", "aria-label"], ai = /* @__PURE__ */ re({
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
    function o(c) {
      l(c), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function r() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    De(r);
    function i(c) {
      c.stopPropagation(), n.drill(t.entry.row, null, Be(c));
    }
    return (c, d) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: o,
      onPointermove: l,
      onPointerleave: r,
      onClick: i
    }, " → ", 40, ni)) : R("", !0);
  }
}), Yt = /* @__PURE__ */ ie(ai, [["__scopeId", "data-v-9efd42ac"]]), si = ["checked", "aria-label"], _t = /* @__PURE__ */ re({
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
    return (s, l) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, si));
  }
}), li = { class: "dc-cards" }, ri = { class: "dc-card__top dc-mono" }, oi = { class: "dc-card__lead" }, ii = {
  key: 1,
  class: "dc-card__entity"
}, ci = { class: "dc-card__top-right" }, ui = ["onClick"], di = { class: "dc-card__names" }, fi = { class: "dc-card__primary" }, pi = { class: "dc-card__secondary dc-mono" }, vi = { class: "dc-card__metrics dc-mono" }, mi = {
  key: 0,
  class: "dc-card__date"
}, hi = /* @__PURE__ */ re({
  __name: "CardsView",
  setup(e) {
    const t = ye(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", li, [
      (f(!0), h(te, null, ve(E(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-card"
      }, [
        b("div", ri, [
          b("span", oi, [
            E(t).selectable.value ? (f(), Q(_t, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : R("", !0),
            We(" " + N(o.ordinal) + " ", 1),
            a.value ? (f(), h("span", ii, N(o.entityLabel), 1)) : R("", !0)
          ]),
          b("span", ci, [
            o.parts.state ? (f(), Q(Xt, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : R("", !0),
            pe(kn, { entry: o }, null, 8, ["entry"]),
            pe(Yt, { entry: o }, null, 8, ["entry"]),
            E(t).pinnable.value ? (f(), Q(ca, {
              key: 1,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : R("", !0)
          ])
        ]),
        b("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (r) => E(t).activate(o.row, E(Be)(r))
        }, [
          o.parts.image ? (f(), Q(wn, {
            key: 0,
            class: "dc-card__image",
            src: o.parts.image
          }, null, 8, ["src"])) : R("", !0),
          b("span", di, [
            b("span", fi, N(o.parts.identity), 1),
            b("span", pi, N(o.parts.reference), 1)
          ])
        ], 8, ui),
        b("div", vi, [
          (f(!0), h(te, null, ve(o.parts.metrics.slice(0, 2), (r) => (f(), Q(Gt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, {
            default: Qe(() => [
              We(N(r.label) + " " + N(r.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (f(), h("span", mi, N(o.parts.updated), 1)) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Ds = /* @__PURE__ */ ie(hi, [["__scopeId", "data-v-28581543"]]), gi = { class: "dc-grid" }, _i = ["onClick"], yi = { class: "dc-tile__scrim" }, wi = { class: "dc-tile__top dc-mono" }, ki = { class: "dc-tile__chip" }, bi = { class: "dc-tile__caption" }, $i = { class: "dc-tile__secondary dc-truncate" }, xi = { class: "dc-tile__primary" }, Ci = /* @__PURE__ */ re({
  __name: "GridView",
  setup(e) {
    const t = ye(), n = gt();
    return (a, s) => (f(), h("div", gi, [
      (f(!0), h(te, null, ve(E(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        b("button", {
          type: "button",
          class: "dc-tile",
          style: Me({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (o) => E(t).activate(l.row, E(Be)(o))
        }, [
          l.parts.image ? (f(), Q(wn, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : R("", !0),
          b("span", yi, [
            b("span", wi, [
              b("span", ki, N(l.ordinal), 1)
            ]),
            b("span", bi, [
              b("span", $i, N(l.parts.reference), 1),
              b("span", xi, N(l.parts.identity), 1)
            ])
          ])
        ], 12, _i),
        E(t).selectable.value ? (f(), Q(_t, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0)
      ]))), 128))
    ]));
  }
}), Bs = /* @__PURE__ */ ie(Ci, [["__scopeId", "data-v-7df25d40"]]);
function Si(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Mi(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  const o = [];
  let r = [], i = 0, c = s;
  for (const d of e) {
    const m = t(d);
    if (r.push(d), i += Math.max(m.ratio, Number.EPSILON), m.height !== void 0 && m.height > 0 && (c = Math.min(c, m.height)), !(a > 0)) continue;
    const w = Si(i, r.length, a, l);
    w <= c && (o.push({ items: r, height: w, filled: !0 }), r = [], i = 0, c = s);
  }
  return r.length && o.push({ items: r, height: c, filled: !1 }), o;
}
const Ei = { class: "dc-images" }, Pi = ["title", "aria-label", "onClick"], Ai = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, Ti = 240, an = 8, zi = /* @__PURE__ */ re({
  __name: "ImagesView",
  setup(e) {
    const t = ye(), n = gt(), a = { ratio: 1 }, s = Ta(/* @__PURE__ */ new Map()), l = Ta(/* @__PURE__ */ new Set());
    function o(x, S) {
      const g = S.target;
      g.naturalWidth > 0 && g.naturalHeight > 0 && s.set(x, { ratio: g.naturalWidth / g.naturalHeight, height: g.naturalHeight });
    }
    function r(x) {
      const S = x.parts.image;
      return S && !l.has(S) ? S : null;
    }
    function i(x) {
      const S = r(x);
      return S && s.get(S) || a;
    }
    const c = K(null), d = K(0);
    let m = null;
    function w() {
      d.value = c.value?.clientWidth ?? 0;
    }
    ls(() => {
      w(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(w), m.observe(c.value));
    }), De(() => {
      m?.disconnect(), m = null;
    });
    const $ = v(() => {
      const x = Mi(n.value, i, {
        width: d.value,
        height: Ti,
        gap: an
      }), S = [];
      let g = 0;
      for (const k of x) {
        let T = 0;
        for (const z of k.items) {
          const L = i(z).ratio * k.height;
          S.push({
            entry: z,
            style: {
              top: `${g}px`,
              left: `${T}px`,
              width: `${L}px`,
              height: `${k.height}px`
            }
          }), T += L + an;
        }
        g += k.height + an;
      }
      return { boxes: S, height: x.length ? g - an : 0 };
    });
    return (x, S) => (f(), h("div", Ei, [
      b("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Me({ height: `${$.value.height}px` })
      }, [
        (f(!0), h(te, null, ve($.value.boxes, ({ entry: g, style: k }) => (f(), h("div", {
          key: g.key,
          class: "dc-images__cell",
          style: Me(k)
        }, [
          b("button", {
            type: "button",
            class: "dc-images__open",
            title: g.parts.identity,
            "aria-label": g.parts.identity,
            onClick: (T) => E(t).activate(g.row, E(Be)(T))
          }, [
            r(g) ? (f(), Q(wn, {
              key: 0,
              class: "dc-images__picture",
              src: r(g),
              onLoad: (T) => o(r(g), T),
              onError: (T) => l.add(r(g))
            }, null, 8, ["src", "onLoad", "onError"])) : (f(), h("span", Ai, N(g.parts.identity), 1))
          ], 8, Pi),
          E(t).selectable.value ? (f(), Q(_t, {
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
}), qs = /* @__PURE__ */ ie(zi, [["__scopeId", "data-v-8df620bc"]]), Li = { class: "dc-links" }, Ri = ["onClick"], Fi = { class: "dc-link__primary dc-truncate" }, Ni = { class: "dc-link__secondary dc-mono dc-truncate" }, Ii = /* @__PURE__ */ re({
  __name: "LinksView",
  setup(e) {
    const t = ye(), n = gt();
    return (a, s) => (f(), h("div", Li, [
      (f(!0), h(te, null, ve(E(n), (l) => (f(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        E(t).selectable.value ? (f(), Q(_t, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        b("button", {
          type: "button",
          class: "dc-link",
          onClick: (o) => E(t).activate(l.row, E(Be)(o))
        }, [
          b("span", Fi, N(l.parts.identity), 1),
          b("span", Ni, N(l.parts.reference), 1)
        ], 8, Ri)
      ]))), 128))
    ]));
  }
}), Ks = /* @__PURE__ */ ie(Ii, [["__scopeId", "data-v-08d0266c"]]), Oi = {
  class: "dc-list",
  role: "list"
}, Di = ["onClick"], Bi = { class: "dc-list__ordinal dc-mono" }, qi = { class: "dc-list__identity" }, Ki = { class: "dc-list__primary dc-truncate" }, Vi = { class: "dc-list__secondary dc-mono dc-truncate" }, Wi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Hi = { class: "dc-list__metrics dc-mono" }, Ui = { class: "dc-list__trailing" }, ji = /* @__PURE__ */ re({
  __name: "ListView",
  setup(e) {
    const t = ye(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", Oi, [
      (f(!0), h(te, null, ve(E(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        E(t).selectable.value ? (f(), Q(_t, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        b("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (r) => E(t).activate(o.row, E(Be)(r))
        }, [
          b("span", Bi, N(o.ordinal), 1),
          b("span", qi, [
            b("span", Ki, N(o.parts.identity), 1),
            b("span", Vi, N(o.parts.reference), 1)
          ])
        ], 8, Di),
        a.value ? (f(), h("span", Wi, N(o.entityLabel), 1)) : R("", !0),
        b("span", Hi, [
          (f(!0), h(te, null, ve(o.parts.metrics.slice(0, 2), (r) => (f(), Q(Gt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        b("span", Ui, [
          o.parts.state ? (f(), Q(Xt, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : R("", !0),
          pe(kn, { entry: o }, null, 8, ["entry"]),
          pe(Yt, { entry: o }, null, 8, ["entry"]),
          E(t).pinnable.value ? (f(), Q(ca, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Nn = /* @__PURE__ */ ie(ji, [["__scopeId", "data-v-11b9f46c"]]), Xi = { class: "dc-preview" }, Gi = { class: "dc-preview__pager dc-mono" }, Yi = ["disabled"], Qi = { "aria-live": "polite" }, Zi = ["disabled"], Ji = {
  key: 0,
  class: "dc-preview__card"
}, ec = ["src"], tc = { class: "dc-preview__body" }, nc = { class: "dc-preview__top" }, ac = { class: "dc-preview__badges" }, sc = { class: "dc-preview__entity dc-mono" }, lc = { class: "dc-preview__marks" }, rc = { class: "dc-preview__primary" }, oc = { class: "dc-preview__secondary dc-mono" }, ic = { class: "dc-preview__fields" }, cc = { class: "dc-preview__key" }, uc = { class: "dc-preview__value dc-mono" }, dc = /* @__PURE__ */ re({
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
        ...i.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), o = v(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${i}`;
    }), r = (i) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + i)));
    };
    return (i, c) => (f(), h("div", Xi, [
      b("div", Gi, [
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => r(-1))
        }, " ‹ ", 8, Yi),
        b("span", Qi, N(o.value), 1),
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= E(n).length - 1,
          onClick: c[1] || (c[1] = (d) => r(1))
        }, " › ", 8, Zi)
      ]),
      s.value ? (f(), h("div", Ji, [
        b("div", {
          class: "dc-preview__media",
          style: Me({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, ec)) : (f(), h(te, { key: 1 }, [
            We(" preview ")
          ], 64))
        ], 4),
        b("div", tc, [
          b("div", nc, [
            b("span", ac, [
              E(t).selectable.value ? (f(), Q(_t, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : R("", !0),
              s.value.parts.state ? (f(), Q(Xt, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : R("", !0),
              b("span", sc, N(s.value.entityLabel), 1)
            ]),
            b("span", lc, [
              pe(kn, { entry: s.value }, null, 8, ["entry"]),
              pe(Yt, { entry: s.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (f(), Q(ca, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : R("", !0)
            ])
          ]),
          b("div", null, [
            b("div", rc, N(s.value.parts.identity), 1),
            b("div", oc, N(s.value.parts.reference), 1)
          ]),
          b("dl", ic, [
            (f(!0), h(te, null, ve(l.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              b("dt", cc, N(d.key), 1),
              b("dd", uc, [
                d.column && s.value ? (f(), Q(Gt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(te, { key: 1 }, [
                  We(N(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          b("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: c[2] || (c[2] = (d) => E(t).activate(s.value.row, E(Be)(d)))
          }, " Open record → ")
        ])
      ])) : R("", !0)
    ]));
  }
}), Vs = /* @__PURE__ */ ie(dc, [["__scopeId", "data-v-6be41155"]]);
function fc() {
  const e = ye();
  return v(() => Bl(e.schema.value, e.entity.value));
}
const pc = ["title"], vc = {
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
    ), o = v(() => s.value), r = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => Rn(t.column)), c = v(() => _s(t.column, t.entry.row));
    function d(m) {
      if (!r.value) return;
      m.stopPropagation();
      const w = Be(m);
      t.column.click?.(t.entry.row, w), t.column.activate && n.activate(t.entry.row, w);
    }
    return (m, w) => a.value === "component" && e.column.component ? (f(), Q(Wn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), Q(Xt, {
      key: 1,
      status: o.value
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
    }, null, 8, ["entry", "column"])) : r.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: Pt(["dc-table__open", { "dc-truncate": i.value }]),
      title: c.value,
      onClick: d
    }, N(l.value), 11, pc)) : (f(), h("span", vc, N(l.value), 1));
  }
}), ja = /* @__PURE__ */ ie(mc, [["__scopeId", "data-v-70ba8aa2"]]), hc = ["aria-label"], gc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], _c = /* @__PURE__ */ re({
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
    ]), l = (r) => !n.mixed && n.standing === r;
    function o(r, i) {
      r.stopPropagation(), a("set", i);
    }
    return (r, i) => (f(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (f(!0), h(te, null, ve(s.value, (c) => (f(), h("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": l(c.standing) ? "true" : "false",
        "aria-checked": l(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => o(d, c.standing)
      }, N(c.sign), 9, gc))), 128))
    ], 8, hc));
  }
}), Xa = /* @__PURE__ */ ie(_c, [["__scopeId", "data-v-adaa8412"]]), yc = {
  key: 0,
  class: "dc-table__none"
}, wc = { class: "dc-table__detail" }, kc = ["data-dc-wrap"], bc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, $c = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, xc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Cc = ["onClick"], Sc = {
  key: 2,
  class: "dc-table__head"
}, Mc = ["onClick"], Ec = {
  key: 0,
  class: "dc-table__pick"
}, Pc = {
  key: 1,
  class: "dc-table__standing"
}, Ac = ["data-dc-align", "data-dc-hide", "title"], Tc = {
  key: 0,
  class: "dc-table__name"
}, zc = /* @__PURE__ */ re({
  __name: "TableView",
  setup(e) {
    const t = ye(), n = gt(), a = fc(), s = v(
      () => a.value.find((y) => y.scope)
    ), l = v(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((y) => y.scope)
    ), o = (y) => Qn(y.entity, y.row), r = (y) => xs(t.query.value.expr, o(y));
    function i(y, P) {
      t.setExpression(Va(t.query.value.expr, o(y), P));
    }
    const c = v(() => {
      const y = n.value.filter((O) => o(O) !== null), P = y.filter((O) => O.selected);
      return P.length ? P : y;
    }), d = v(() => c.value.some((y) => y.selected)), m = v(() => {
      const y = c.value[0];
      return y ? r(y) : null;
    }), w = v(
      () => c.value.some((y) => r(y) !== m.value)
    ), $ = v(
      () => d.value ? "the ticked rows" : "every row on this page"
    );
    function x(y) {
      t.setExpression(
        c.value.reduce(
          (P, O) => Va(P, o(O), y),
          t.query.value.expr
        )
      );
    }
    const S = v(
      () => a.value.some((y) => y.kind === "image" || y.height !== void 0)
    );
    function g(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const k = v(() => t.entity.value?.label ?? "The result set"), T = v(() => new Set(t.sorts.value.map((y) => y.key))), z = (y) => y.sort !== void 0 && T.value.has(y.sort), L = (y) => {
      if (z(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function I(y) {
      return [
        Fa(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        Rn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function H(y, P) {
      if (!(!Rn(y) || y.activate || y.click))
        return _s(y, P.row);
    }
    return (y, P) => E(a).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": S.value ? "" : void 0
    }, [
      b("thead", null, [
        b("tr", null, [
          E(t).selectable.value ? (f(), h("th", bc, [
            pe(Ns)
          ])) : R("", !0),
          l.value ? (f(), h("th", $c, [
            c.value.length ? (f(), Q(Xa, {
              key: 0,
              standing: m.value,
              mixed: w.value,
              name: $.value,
              onSet: x
            }, null, 8, ["standing", "mixed", "name"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), h(te, null, ve(E(a), (O, j) => (f(), h("th", {
            key: E(La)(O, j),
            scope: "col",
            class: Pt(E(Fa)(O)),
            style: Me({ width: O.width }),
            "data-dc-align": E(Ra)(O),
            "data-dc-hide": O.hideBelow,
            "aria-sort": L(O),
            title: O.hint
          }, [
            z(O) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (ue) => g(O.sort)
            }, N(O.label), 9, Cc)) : (f(), h(te, { key: 1 }, [
              We(N(O.label), 1)
            ], 64)),
            O.header ? (f(), h("span", Sc, [
              (f(), Q(Wn(O.header), {
                column: O,
                entity: E(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : R("", !0)
          ], 14, xc))), 128))
        ])
      ]),
      b("tbody", null, [
        (f(!0), h(te, null, ve(E(n), (O) => (f(), h("tr", {
          key: O.key,
          class: "dc-table__row",
          onClick: (j) => E(t).activate(O.row, E(Be)(j))
        }, [
          E(t).selectable.value ? (f(), h("td", Ec, [
            pe(_t, {
              row: O.row,
              selected: O.selected,
              name: O.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : R("", !0),
          l.value ? (f(), h("td", Pc, [
            o(O) !== null ? (f(), Q(Xa, {
              key: 0,
              standing: r(O),
              name: O.parts.identity,
              onSet: (j) => i(O, j)
            }, null, 8, ["standing", "name", "onSet"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), h(te, null, ve(E(a), (j, ue) => (f(), h("td", {
            key: E(La)(j, ue),
            class: Pt(I(j)),
            "data-dc-align": E(Ra)(j),
            "data-dc-hide": j.hideBelow,
            title: H(j, O)
          }, [
            j === s.value ? (f(), h("span", Tc, [
              pe(ja, {
                column: j,
                entry: O
              }, null, 8, ["column", "entry"]),
              pe(Yt, { entry: O }, null, 8, ["entry"])
            ])) : (f(), Q(ja, {
              key: 1,
              column: j,
              entry: O
            }, null, 8, ["column", "entry"]))
          ], 10, Ac))), 128))
        ], 8, Mc))), 128))
      ])
    ], 8, kc)) : (f(), h("p", yc, [
      P[2] || (P[2] = b("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      b("span", wc, [
        We(N(k.value) + " has no ", 1),
        P[0] || (P[0] = b("code", null, "columns", -1)),
        P[1] || (P[1] = We(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ws = /* @__PURE__ */ ie(zc, [["__scopeId", "data-v-c8a96457"]]);
function Lc(e) {
  const t = Et([]), n = K(!1), a = Et(null);
  let s = 0;
  const l = (i, c, d, m, w) => ({
    entity: i,
    rows: c.rows.map(
      ($, x) => Os($, x, i, e.isPinned($.id))
    ),
    total: c.total,
    count: d ? i.count : String(c.total),
    pinned: Rc(m, c, w)
  }), o = () => {
    const i = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, w = e.limit.value, $ = e.within?.value.trim() ?? "", x = jn(c) && !$, S = $ ? Yn($, c.expr) : c.expr, g = m.map((k) => ({
      entity: k,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: k.key, expr: S, facets: At(k), page: 1 },
        schema: d,
        entity: k,
        limit: w,
        offset: 0
      })
    }));
    if (g.every(({ outcome: k }) => !(k instanceof Promise))) {
      t.value = g.map(
        ({ entity: k, outcome: T }) => l(k, T, x, d, S)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(g.map(({ outcome: k }) => Promise.resolve(k))).then((k) => {
      i === s && (t.value = k.map(
        (T, z) => l(g[z].entity, T, x, d, S)
      ), a.value = null);
    }).catch((k) => {
      i === s && (a.value = k, t.value = []);
    }).finally(() => {
      i === s && (n.value = !1);
    });
  }, r = () => {
    try {
      o();
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
    r,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: r };
}
function Rc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Zn(e, a);
  return !!l && Jn(s, l) === s;
}
const Fc = ["data-dc-pending"], Nc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Ic = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Oc = {
  key: 2,
  class: "dc-types__state"
}, Dc = ["data-dc-empty"], Bc = ["onClick"], qc = { class: "dc-type__name" }, Kc = { class: "dc-type__count dc-mono" }, Vc = { class: "dc-type__sr" }, Wc = {
  key: 0,
  class: "dc-type__empty"
}, Hc = ["onClick"], Uc = { class: "dc-type__identity" }, jc = { class: "dc-type__primary dc-truncate" }, Xc = { class: "dc-type__secondary dc-mono dc-truncate" }, Gc = { class: "dc-type__trailing dc-mono" }, Yc = { class: "dc-type__metric-value" }, Qc = { class: "dc-type__metric-label" }, Zc = {
  key: 0,
  class: "dc-type__date"
}, Jc = ["onClick"], eu = /* @__PURE__ */ re({
  __name: "TypeCardsView",
  setup(e) {
    const t = ye(), { previews: n, pending: a, error: s } = Lc({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (r) => t.isPinnedId(r)
    }), l = v(() => !t.isPristine.value || !!t.within.value), o = v(
      () => n.value.filter(
        (r) => !r.pinned && (r.rows.length > 0 || r.entity.create)
      )
    );
    return (r, i) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": E(a) ? "true" : "false"
    }, [
      be(r.$slots, "before", {}, void 0, !0),
      E(s) ? (f(), h("p", Nc, " Could not load results: " + N(E(s) instanceof Error ? E(s).message : "the data source failed."), 1)) : !o.value.length && E(a) ? (f(), h("p", Ic, " Running query… ")) : o.value.length ? R("", !0) : (f(), h("p", Oc, N(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(te, null, ve(o.value, (c) => (f(), h("section", {
        key: c.entity.key,
        class: "dc-type",
        "data-dc-empty": c.rows.length ? "false" : "true"
      }, [
        b("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => E(t).setEntity(c.entity.key)
        }, [
          b("span", qc, N(c.entity.label), 1),
          b("span", Kc, N(c.count), 1),
          i[0] || (i[0] = b("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          b("span", Vc, "Show only " + N(c.entity.label.toLowerCase()), 1)
        ], 8, Bc),
        c.rows.length ? R("", !0) : (f(), h("p", Wc, N(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(te, null, ve(c.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          b("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (m) => E(t).activate(d.row, E(Be)(m))
          }, [
            b("span", Uc, [
              b("span", jc, N(d.parts.identity), 1),
              b("span", Xc, N(d.parts.reference), 1)
            ])
          ], 8, Hc),
          b("span", Gc, [
            (f(!0), h(te, null, ve(d.parts.metrics.slice(0, 1), (m) => (f(), Q(Gt, {
              key: m.column.key ?? m.label,
              class: "dc-type__metric",
              entry: d,
              column: m.column
            }, {
              default: Qe(() => [
                b("span", Yc, N(m.text), 1),
                b("span", Qc, N(m.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", Zc, N(d.parts.updated), 1)) : R("", !0),
            pe(kn, { entry: d }, null, 8, ["entry"]),
            pe(Yt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        c.entity.create ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => E(t).create(c.entity)
        }, [
          i[1] || (i[1] = b("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + N(c.entity.create), 1)
        ], 8, Jc)) : R("", !0)
      ], 8, Dc))), 128)),
      be(r.$slots, "after", {}, void 0, !0)
    ], 8, Fc));
  }
}), Hs = /* @__PURE__ */ ie(eu, [["__scopeId", "data-v-c7b8f990"]]), tu = ["data-dc-pending"], nu = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, au = { class: "dc-results__detail" }, su = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, lu = {
  key: 3,
  class: "dc-results__state"
}, ru = { class: "dc-results__detail" }, ou = /* @__PURE__ */ re({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), a = Ht(), s = {
      list: Nn,
      cards: Ds,
      grid: Bs,
      images: qs,
      table: Ws,
      links: Ks,
      preview: Vs
    }, l = v(() => Xn(n.query.value)), o = v(() => Hn(n.query.value.view, t.views)), r = v(() => s[o.value] ?? Nn), i = v(() => n.rows.value.length > 0), c = v(() => n.error.value !== null), d = K(null);
    return ke(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (m, w) => (f(), h("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), Q(Hs, { key: 0 }, rn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Qe(() => [
            be(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Qe(() => [
            be(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), h("p", nu, [
        w[1] || (w[1] = b("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        b("span", au, N(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && E(n).pending.value ? (f(), h("p", su, [...w[2] || (w[2] = [
        b("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), Q(Wn(r.value), { key: 4 })) : (f(), h("div", lu, [
        w[3] || (w[3] = b("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        b("span", ru, N(E(n).summary.value), 1),
        E(n).isPristine.value ? R("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: w[0] || (w[0] = ($) => E(n).clearFilters())
        }, N(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, tu));
  }
}), Us = /* @__PURE__ */ ie(ou, [["__scopeId", "data-v-c131c5c3"]]), iu = ["data-dc-theme"], cu = ["data-dc-width", "data-dc-align"], uu = { class: "dc-shell__panel" }, du = /* @__PURE__ */ re({
  __name: "DataShell",
  props: /* @__PURE__ */ mn({
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
  emits: /* @__PURE__ */ mn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = It(e, "open"), o = It(e, "pinned"), r = It(e, "selected"), i = Ht(), c = Mt(os, null), d = a.route || c ? null : zl(), m = a.route ?? c ?? d;
    De(() => d?.dispose?.());
    const w = v(() => fr({ seed: a.schema.key })), $ = v(() => a.source ?? w.value), x = $r({
      schema: () => a.schema,
      adapter: m,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), S = v(() => a.within?.trim() ?? ""), g = xr({
      source: $,
      query: x.query,
      schema: v(() => a.schema),
      entity: x.entity,
      limit: v(() => a.limit),
      within: S
    });
    ke(x.query, (C) => s("query-change", C)), ke(
      [g.pageCount, g.pending, x.query],
      () => {
        if (g.pending.value) return;
        const C = g.pageCount.value;
        x.query.value.page > C && x.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const k = Vn() ?? "dc-query-panel", T = K(null);
    function z() {
      l.value && (l.value = !1, Kt(() => {
        T.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const L = v(() => new Set(o.value));
    function I(C) {
      const q = new Set(L.value);
      q.has(C.id) ? q.delete(C.id) : q.add(C.id), o.value = [...q], s("toggle-pin", C);
    }
    const H = v(() => {
      if (a.selectable === !0) return !0;
      const C = x.entity.value;
      return !!(C?.duplicate || C?.delete);
    }), y = v(() => new Set(r.value));
    function P(C) {
      const q = new Set(y.value);
      q.has(C.id) ? q.delete(C.id) : q.add(C.id), r.value = [...q];
    }
    function O(C) {
      const q = new Set(y.value);
      for (const U of g.rows.value)
        C ? q.add(U.id) : q.delete(U.id);
      r.value = [...q];
    }
    function j() {
      r.value.length && (r.value = []);
    }
    const ue = v(() => ({
      ids: [...r.value],
      rows: g.rows.value.filter((C) => y.value.has(C.id)),
      entity: x.entity.value
    }));
    ke(() => x.query.value.entity, j);
    function Z(C, q, U = {}) {
      const se = pr(a.schema, x.query.value, C, U);
      U.exclude ? x.narrow(se, q?.key ?? x.query.value.entity) : x.narrow(se, q?.key ?? null, q ? void 0 : "cards"), s("drill", C, q, U);
    }
    const _e = vr({
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
      within: S,
      pinnable: v(() => a.pinnable === !0),
      isPinned: (C) => L.value.has(C.id),
      isPinnedId: (C) => L.value.has(C),
      togglePin: I,
      selectable: H,
      selection: ue,
      isSelected: (C) => y.value.has(C.id),
      toggleSelect: P,
      selectPage: O,
      clearSelection: j,
      narrowsOnPress: v(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C, q = {}) => {
        if (a.rowPress === "narrow" && Zn(a.schema, C)) {
          Z(C, null, q);
          return;
        }
        s("activate", C);
      },
      create: (C) => s("create", C),
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
      closePanel: z
    }), (C, q) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Me(xe.value)
    }, [
      b("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(Ls, {
          ref_key: "headerRef",
          ref: T,
          expanded: l.value,
          "panel-id": E(k),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: q[0] || (q[0] = (U) => l.value = !l.value)
        }, rn({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Qe(() => [
              be(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), h(te, { key: 0 }, [
          b("div", {
            class: "dc-shell__scrim",
            onClick: z
          }),
          b("div", uu, [
            pe(Fs, {
              "panel-id": E(k),
              onClose: z
            }, rn({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Qe(() => [
                  be(C.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : R("", !0)
      ], 8, cu),
      pe(Is, { views: e.views }, null, 8, ["views"]),
      be(C.$slots, "results", {
        rows: E(_e).rows.value,
        total: E(_e).total.value,
        offset: E(_e).offset.value,
        pageCount: E(_e).pageCount.value,
        query: E(_e).query.value,
        pending: E(_e).pending.value
      }, () => [
        pe(Us, { views: e.views }, rn({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: Qe(() => [
              be(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Qe(() => [
              be(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, iu));
  }
}), fu = /* @__PURE__ */ ie(du, [["__scopeId", "data-v-68ec86d9"]]), pu = ["data-dc-muted"], vu = {
  key: 0,
  class: "dc-shell-card__head"
}, mu = { class: "dc-shell-card__title" }, hu = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, gu = {
  key: 0,
  class: "dc-shell-card__aside"
}, _u = ["data-dc-flush"], yu = {
  key: 2,
  class: "dc-shell-card__foot"
}, wu = /* @__PURE__ */ re({
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
      return d.some((m) => m.type === El ? !1 : m.type === Pl ? String(m.children ?? "").trim().length > 0 : m.type === te ? l(m.children ?? []) : !0);
    }
    const o = v(() => !!t.title || r.value || s(a.head)), r = v(() => s(a.aside)), i = v(() => s(a.default)), c = v(() => s(a.foot));
    return (d, m) => (f(), h("section", {
      class: "dc-shell-card",
      style: Me(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      o.value ? (f(), h("header", vu, [
        be(d.$slots, "head", {}, () => [
          b("h2", mu, N(e.title), 1),
          e.count !== void 0 ? (f(), h("span", hu, N(e.count), 1)) : R("", !0)
        ], !0),
        r.value ? (f(), h("span", gu, [
          be(d.$slots, "aside", {}, void 0, !0)
        ])) : R("", !0)
      ])) : R("", !0),
      i.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        be(d.$slots, "default", {}, void 0, !0)
      ], 8, _u)) : R("", !0),
      c.value ? (f(), h("footer", yu, [
        be(d.$slots, "foot", {}, void 0, !0)
      ])) : R("", !0)
    ], 12, pu));
  }
}), nf = /* @__PURE__ */ ie(wu, [["__scopeId", "data-v-75f2ef0b"]]), ku = ["aria-label"], bu = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], $u = /* @__PURE__ */ re({
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
    function l(o, r) {
      const i = n.options.length;
      let c = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? c = (r + 1) % i : o.key === "ArrowLeft" || o.key === "ArrowUp" ? c = (r - 1 + i) % i : o.key === "Home" ? c = 0 : o.key === "End" && (c = i - 1), c === null) return;
      o.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (o, r) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(te, null, ve(e.options, (i, c) => (f(), h("button", {
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
      }, N(i.label), 43, bu))), 128))
    ], 8, ku));
  }
}), xu = /* @__PURE__ */ ie($u, [["__scopeId", "data-v-63fb5482"]]), Cu = ["data-dc-theme", "aria-label"], Su = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Mu = /* @__PURE__ */ re({
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
    }), s = t, l = K(null), o = K([]), r = K(null), i = K(null), c = K(!1), d = v(
      () => n.menus.flatMap((L, I) => Ot(L) ? [I] : [])
    );
    function m(L, I) {
      const H = o.value[L]?.getBoundingClientRect(), y = n.menus[L];
      !H || !y || !Ot(y) || (i.value = { x: H.left, y: H.bottom + 2, mirrorX: H.right }, r.value = L, c.value = I);
    }
    function w(L) {
      const I = r.value;
      r.value = null, i.value = null, L && I !== null && o.value[I]?.focus();
    }
    function $(L) {
      r.value === L ? w(!0) : m(L, !1);
    }
    function x(L) {
      r.value === null || r.value === L || m(L, !1);
    }
    function S(L, I) {
      const H = d.value;
      if (H.length === 0) return null;
      if (L === null) return I === 1 ? H[0] ?? null : H[H.length - 1] ?? null;
      const y = H.indexOf(L);
      return y === -1 ? H[0] ?? null : H[(y + I + H.length) % H.length] ?? null;
    }
    function g(L) {
      const I = L.key;
      if (I === "Escape") {
        if (r.value === null) return;
        L.preventDefault(), w(!0);
        return;
      }
      if (I === "ArrowDown" && r.value === null) {
        const P = k();
        if (P === null) return;
        L.preventDefault(), m(P, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const H = r.value ?? k(), y = S(H, I === "ArrowRight" ? 1 : -1);
      y !== null && (L.preventDefault(), r.value !== null ? m(y, !0) : o.value[y]?.focus());
    }
    function k() {
      const L = o.value.findIndex((I) => I === document.activeElement);
      return L === -1 ? d.value[0] ?? null : L;
    }
    function T(L) {
      const I = L.target;
      !I || l.value?.contains(I) || w(!1);
    }
    ke(r, (L) => {
      L !== null ? window.addEventListener("pointerdown", T, !0) : window.removeEventListener("pointerdown", T, !0);
    }), De(() => window.removeEventListener("pointerdown", T, !0));
    function z(L) {
      w(!0), L.action?.(), s("choose", L);
    }
    return (L, I) => (f(), h("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Me(a.value),
      onKeydown: g
    }, [
      (f(!0), h(te, null, ve(e.menus, (H, y) => (f(), h("button", {
        key: H.id ?? H.label ?? y,
        ref_for: !0,
        ref: (P) => {
          P && (o.value[y] = P);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": r.value === y,
        "aria-disabled": H.disabled ? "true" : void 0,
        disabled: H.disabled,
        "data-dc-menu": H.id ?? H.label,
        tabindex: y === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (P) => $(y),
        onMouseenter: (P) => x(y)
      }, N(H.label), 41, Su))), 128)),
      r.value !== null && i.value ? (f(), Q(ia, {
        key: r.value,
        items: e.menus[r.value]?.items ?? [],
        at: i.value,
        label: e.menus[r.value]?.label,
        autofocus: c.value,
        onChoose: z,
        onDismiss: I[0] || (I[0] = (H) => w(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 44, Cu));
  }
}), af = /* @__PURE__ */ ie(Mu, [["__scopeId", "data-v-93dbd2e4"]]), Eu = ["aria-label", "aria-expanded", "disabled"], Pu = { "aria-hidden": "true" }, Au = /* @__PURE__ */ re({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = K(null), s = K(null), l = K(null), o = K(!1), r = v(() => l.value !== null);
    function i(x) {
      const S = a.value?.getBoundingClientRect();
      S && (l.value = { x: S.left, y: S.bottom + 4, mirrorX: S.right }, o.value = x);
    }
    function c(x) {
      l.value = null, x && a.value?.focus();
    }
    function d() {
      r.value ? c(!0) : i(!1);
    }
    function m(x) {
      x.key !== "ArrowDown" || r.value || (x.preventDefault(), i(!0));
    }
    function w(x) {
      const S = x.target;
      S && (a.value?.contains(S) || s.value?.root?.contains(S) || c(!1));
    }
    ke(r, (x) => {
      x ? window.addEventListener("pointerdown", w, !0) : window.removeEventListener("pointerdown", w, !0);
    }), De(() => window.removeEventListener("pointerdown", w, !0));
    function $(x) {
      c(!0), x.action?.(), n("choose", x);
    }
    return (x, S) => (f(), h(te, null, [
      b("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": r.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: m
      }, [
        b("span", Pu, N(e.glyph), 1)
      ], 40, Eu),
      l.value ? (f(), Q(ia, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: o.value,
        onChoose: $,
        onDismiss: S[0] || (S[0] = (g) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 64));
  }
}), ua = /* @__PURE__ */ ie(Au, [["__scopeId", "data-v-48f5ada5"]]), zt = (e) => e.kind === "split", X = (e) => e.kind === "group", ne = (e) => e.kind === "float", pt = { x: 16, y: 16, w: 360, h: 260 }, gn = 28, js = 120, In = 220, Xs = 38, kt = 6;
function Qt(e, t) {
  let n = !1;
  const a = e.frames.map((s, l) => {
    const o = t(s.node, l);
    return o === s.node ? s : (n = !0, { ...s, node: o });
  });
  return n ? { ...e, frames: a } : e;
}
function Ze(e) {
  return { kind: "group", panels: [e] };
}
function sf(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const me = (e) => typeof e == "string", da = (e) => me(e) ? Ze(e) : e, Zt = (e) => me(e) ? [e] : at(e), Ga = (e) => e.panels.filter(me), Tu = (e) => e.panels.filter((t) => !me(t)), Ie = (e, t) => e.panels.includes(t);
function Jt(e, t, n) {
  let a = !1;
  const s = e.panels.map((l) => {
    if (me(l) || !oe(l, t)) return l;
    const o = n(l);
    return o !== l && (a = !0), o;
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
const ma = (e, t, n) => va("row", e, t, n), lf = (e, t, n) => va("column", e, t, n);
function we(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ht = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, rf = (e) => ({ ...e, headless: !0 }), of = (e) => ({ ...e, fixedView: !0 }), zu = (e) => e === "left" || e === "right" ? "row" : "column";
function at(e) {
  return X(e) ? e.panels.flatMap(Zt) : ne(e) ? e.frames.flatMap((t) => at(t.node)) : e.children.flatMap(at);
}
function oe(e, t) {
  return X(e) ? e.panels.some((n) => me(n) ? n === t : oe(n, t)) : ne(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Gs = (e) => at(e).length === 0, On = (e) => !X(e) && ht(e), Dn = (e) => Gs(e) && !On(e);
function $n(e) {
  return zt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ne(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => me(t) ? [] : [{ node: t, index: n }]);
}
const ha = (e) => $n(e).map((t) => t.node);
function yt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => me(a) ? a === t : oe(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ys(e) {
  const t = e.panels[yt(e)];
  return t !== void 0 && me(t) ? t : "";
}
function Te(e) {
  if (me(e)) return e;
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
  for (const n of ha(e)) {
    const a = $t(n, t);
    if (a) return a;
  }
  return null;
}
function Lu(e) {
  const t = ha(e).flatMap(Lu);
  return X(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (X(e)) {
    for (const n of Tu(e)) {
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
function An(e, t, n = js) {
  const a = (r, i) => i > 0 ? Math.max(Math.min(r, i), Math.min(n, i)) : Math.max(r, n), s = a(e.w, t.w), l = a(e.h, t.h), o = (r, i, c) => Math.min(Math.max(r, 0), Math.max(c - i, 0));
  return {
    x: Math.round(o(e.x, s, t.w)),
    y: Math.round(o(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function Ya(e, t, n, a, s = js) {
  let { x: l, y: o, w: r, h: i } = e;
  return t.includes("e") && (r = e.w + n), t.includes("w") && (r = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + a), t.includes("n") && (i = e.h - a, o = e.y + a), r < s && (t.includes("w") && (l = e.x + e.w - s), r = s), i < s && (t.includes("n") && (o = e.y + e.h - s), i = s), { x: l, y: o, w: r, h: i };
}
const Qs = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function xt(e, t, n) {
  if (X(e)) return Jt(e, t, (l) => xt(l, t, n));
  if (ne(e)) {
    let l = !1;
    const o = e.frames.map((r) => {
      if (!oe(r.node, t)) return r;
      if (Se(r.node, t)) {
        const c = xt(r.node, t, n);
        return c === r.node ? r : (l = !0, { ...r, node: c });
      }
      const i = n(r);
      return i === r ? r : (l = !0, i);
    });
    return l ? { ...e, frames: o } : e;
  }
  if (!oe(e, t)) return e;
  let a = !1;
  const s = e.children.map((l) => {
    const o = xt(l, t, n);
    return o !== l && (a = !0), o;
  });
  return a ? { ...e, children: s } : e;
}
function Ru(e, t, n) {
  return xt(e, t, (a) => Qs(a.rect, n) ? a : { ...a, rect: n });
}
const lt = (e) => e.maximized === !0, Zs = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Fu(e, t, n = !0) {
  return xt(e, t, Zs(n));
}
function cf(e, t) {
  const n = Se(e, t);
  return n ? Fu(e, t, !lt(n)) : e;
}
const dt = (e) => e.minimized === !0, Js = (e) => (t) => {
  if (dt(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function Nu(e, t, n = !0) {
  return xt(e, t, Js(n));
}
function uf(e, t) {
  const n = Se(e, t);
  return n ? Nu(e, t, !dt(n)) : e;
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
  const o = l.frames[a];
  if (!o) return e;
  const r = n(o);
  if (r === o) return e;
  const i = [...l.frames];
  return i[a] = r, mt(e, s, { ...l, frames: i });
}
function Qa(e, t, n) {
  return ga(
    e,
    t,
    (a) => Qs(a.rect, n) ? a : { ...a, rect: n }
  );
}
function Iu(e, t, n = !0) {
  return ga(e, t, Zs(n));
}
function Ou(e, t, n = !0) {
  return ga(e, t, Js(n));
}
function Dt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (ne(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const r = Dt(o.node, a), i = r === o.node ? o : { ...o, node: r };
    if (n === e.frames.length - 1 && i === o) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(i), { ...e, frames: c };
  }
  const s = ot(e, [n]);
  if (!s) return e;
  const l = Dt(s, a);
  return l === s ? e : mt(e, [n], l);
}
function Du(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (ne(a) && (n[l] = a.frames.length - 1), a = ot(a, [s]));
  }), n;
}
function un(e, t, n, a) {
  if (X(e)) return Jt(e, n, (o) => un(o, t, n, a));
  if (ne(e)) {
    const o = e.frames.findIndex((i) => oe(i.node, n)), r = e.frames[o];
    if (!r) return e;
    if (Se(r.node, n)) {
      const i = un(r.node, t, n, a);
      if (i === r.node) return e;
      const c = [...e.frames];
      return c[o] = { ...r, node: i }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, bn(Ze(t), a)] };
  }
  if (!oe(e, n)) return e;
  let s = !1;
  const l = e.children.map((o) => {
    const r = un(o, t, n, a);
    return r !== o && (s = !0), r;
  });
  return s ? { ...e, children: l } : e;
}
function Za(e, t, n, a) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Se(e, n)) return e;
  const s = vt(e, t);
  if (!s) return e;
  const l = un(s, t, n, a);
  return l === s ? e : $e(l);
}
function Bu(e, t, n) {
  return ne(e) ? { ...e, frames: [...e.frames, bn(Ze(t), n)] } : X(e) ? tl(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ze(t)],
    sizes: [...nt(e), 1],
    ...we(e)
  };
}
function el(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Bu(e, t, a);
  const l = n.slice(1), o = (d, m) => m === s ? el(d, t, l, a) : vt(d, t);
  if (ne(e)) {
    const d = e.frames.flatMap((m, w) => {
      const $ = o(m.node, w);
      return $ ? [$ === m.node ? m : { ...m, node: $ }] : [];
    });
    return { ...e, frames: d };
  }
  if (X(e)) {
    const d = yt(e), m = [];
    e.panels.forEach((x, S) => {
      if (me(x)) {
        x !== t && m.push(x);
        return;
      }
      const g = o(x, S);
      g && m.push(g);
    });
    const $ = e.active && m.some((x) => Zt(x).includes(e.active)) ? e.active : Te(m[d] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...$ ? { active: $ } : {},
      ...we(e)
    };
  }
  const r = nt(e), i = [], c = [];
  return e.children.forEach((d, m) => {
    const w = o(d, m);
    w && (i.push(w), c.push(r[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: c, ...we(e) };
}
function Ja(e, t, n, a) {
  const s = ot(e, n);
  return !s || !Gs(s) || !oe(e, t) ? e : $e(el(e, t, n, a));
}
function Tn(e, t) {
  if (X(e)) return Jt(e, t, (s) => Tn(s, t));
  if (ne(e)) {
    const s = e.frames.findIndex((c) => oe(c.node, t)), l = e.frames[s];
    if (!l) return e;
    const o = Tn(l.node, t), r = o === l.node ? l : { ...l, node: o };
    if (s === e.frames.length - 1 && r === l) return e;
    const i = [...e.frames];
    return i.splice(s, 1), i.push(r), { ...e, frames: i };
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
  const a = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), s = a.reduce((l, o) => l + o, 0);
  return s <= 0 ? n() : a.map((l) => l / s);
}
const nt = (e) => _a(e.children.length, e.sizes), He = (e) => {
  const t = X(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function $e(e) {
  if (X(e)) return qu(e);
  if (ne(e)) {
    const r = e.frames.flatMap((i) => {
      const c = $e(i.node);
      return Dn(c) ? [] : [c === i.node ? i : { ...i, node: c }];
    });
    return r.length === e.frames.length && r.every((i, c) => i === e.frames[c]) ? e : { ...e, frames: r };
  }
  if (e.children.length === 0) return e;
  const t = nt(e), n = He(e), a = [], s = [], l = [];
  e.children.forEach((r, i) => {
    const c = $e(r), d = t[i] ?? 0;
    if (Dn(c)) return;
    if (!n && zt(c) && c.direction === e.direction && !He(c) && !ht(c)) {
      const w = nt(c);
      c.children.forEach(($, x) => {
        a.push($), s.push(d * (w[x] ?? 0));
      });
      return;
    }
    a.push(c), s.push(d);
    const m = n?.[i];
    m && l.push(m);
  });
  const o = a[0];
  return a.length === 1 && o && !ht(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: _a(a.length, s),
    ...we(e),
    ...l.length === a.length && l.length > 0 ? { places: l } : {}
  };
}
function qu(e) {
  if (e.panels.every(me)) return e;
  const t = Te(e), n = He(e), a = [], s = [];
  e.panels.forEach((r, i) => {
    const c = n?.[i];
    if (me(r)) {
      a.push(r), c && s.push(c);
      return;
    }
    const d = $e(r);
    if (!Dn(d)) {
      if (X(d) && !ht(d) && !He(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), c && s.push(c);
    }
  });
  const l = a[0];
  if (a.length === 1 && l !== void 0 && !me(l) && !ht(e))
    return l;
  if (a.length === e.panels.length && a.every((r, i) => r === e.panels[i]))
    return e;
  const o = t && a.some((r) => Zt(r).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...o ? { active: o } : {},
    ...we(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function vt(e, t) {
  if (ne(e)) {
    const o = e.frames.flatMap((r) => {
      const i = vt(r.node, t);
      return i ? [i === r.node ? r : { ...r, node: i }] : [];
    });
    return o.length === 0 && !On(e) ? null : { ...e, frames: o };
  }
  if (X(e)) {
    if (!oe(e, t)) return e;
    const o = yt(e), r = [];
    for (const d of e.panels) {
      if (me(d)) {
        d !== t && r.push(d);
        continue;
      }
      const m = vt(d, t);
      m && r.push(m);
    }
    if (r.length === 0) return null;
    const c = e.active && r.some((d) => Zt(d).includes(e.active)) ? e.active : Te(r[o] ?? r[r.length - 1]);
    return c ? { kind: "group", panels: r, active: c, ...we(e) } : { kind: "group", panels: r, ...we(e) };
  }
  const n = nt(e), a = [], s = [];
  if (e.children.forEach((o, r) => {
    const i = vt(o, t);
    i && (a.push(i), s.push(n[r] ?? 0));
  }), a.length === 0)
    return On(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...we(e) } : null;
  const l = a[0];
  return a.length === 1 && l && !ht(e) ? l : $e({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...we(e)
  });
}
function tl(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...we(e) };
}
function Nt(e, t, n, a, s) {
  const l = ($) => Qt(
    $,
    (x) => oe(x, n) ? Nt(x, t, n, a, s) : x
  );
  if (a === "float") return e;
  const o = ($) => Jt($, n, (x) => Nt(x, t, n, a, s));
  if (a === "center")
    return X(e) ? Ie(e, n) ? tl(e, t, s) : o(e) : ne(e) ? l(e) : {
      ...e,
      children: e.children.map(
        ($) => oe($, n) ? Nt($, t, n, a, s) : $
      )
    };
  const r = zu(a), i = a === "left" || a === "top", c = ($) => ({
    kind: "split",
    direction: r,
    children: i ? [Ze(t), $] : [$, Ze(t)],
    sizes: [0.5, 0.5]
  });
  if (X(e)) return Ie(e, n) ? c(e) : o(e);
  if (ne(e)) return l(e);
  const d = nt(e), m = e.children.findIndex(
    ($) => X($) && Ie($, n)
  );
  if (m >= 0 && e.direction === r) {
    const $ = (d[m] ?? 0) / 2, x = [...e.children], S = [...d];
    return x.splice(i ? m : m + 1, 0, Ze(t)), S.splice(m, 1, $, $), {
      kind: "split",
      direction: r,
      children: x,
      sizes: S,
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
      return Ys(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((i) => !me(i) && oe(i, t)), l = e.panels[s];
    if (l === void 0 || me(l)) return e;
    const o = Ct(l, t);
    if (o === l && e.active === t) return e;
    const r = [...e.panels];
    return r[s] = o, { ...e, panels: r, active: t };
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
    const o = He(e), r = o ? [...o] : void 0;
    r && r.splice(s, 0, ...r.splice(a, 1));
    const i = Te(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ...we(e),
      ...r ? { places: r } : {}
    };
  }
  return oe(e, t) ? ne(e) ? Qt(e, (a) => Bt(a, t, n)) : { ...e, children: e.children.map((a) => Bt(a, t, n)) } : e;
}
function dn(e, t, n) {
  if (t === n) return e;
  if (X(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const a = (l) => l === t ? n : l === n ? t : l, s = e.panels.map((l) => me(l) ? a(l) : dn(l, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return ne(e) ? Qt(e, (a) => dn(a, t, n)) : { ...e, children: e.children.map((a) => dn(a, t, n)) };
}
function sn(e, t, n, a, s) {
  if (a === "float" || !oe(e, t) || !oe(e, n)) return e;
  const l = $t(e, t);
  if (a === "center" && l && Ie(l, n)) {
    if (s === void 0) return e;
    const r = l.panels.indexOf(t), i = s > r ? s - 1 : s;
    return i === r ? e : Ct(Bt(e, t, i), t);
  }
  if (t === n) return e;
  const o = vt(e, t);
  return o ? $e(Nt(o, t, n, a, s)) : e;
}
function nl(e, t, n) {
  if (X(e)) {
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
  if (!X(e) && a.some(({ node: s }) => X(s) && Ie(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: l } of a) {
    if (!oe(s, t)) continue;
    const o = en(s, t, n);
    return o ? nl(e, l, o) : null;
  }
  return null;
}
function df(e, t, n) {
  const a = en(
    e,
    t,
    (s) => zt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? $e(a) : e;
}
function al(e) {
  return ne(e) ? [e] : He(e) || ht(e) ? [e] : X(e) ? [...e.panels] : e.children.flatMap(al);
}
function sl(e, t) {
  if (X(e)) return e;
  const n = ha(e).map(al), a = n.flat(), s = t && a.some((o) => Zt(o).includes(t)) ? t : void 0, l = Ku(e, n);
  return $e({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function Ku(e, t) {
  const n = ne(e) ? e.frames.map(({ node: a, ...s }) => s) : He(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function Vu(e, t) {
  const n = en(e, t, (a) => sl(a, t));
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
    return l ? nl(e, s, l) : null;
  }
  return null;
}
function es(e, t, n) {
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
      (r) => X(r.node) && r.node.panels.includes(t)
    ), l = e.frames[s], o = l && X(l.node) ? l.node : null;
    if (l && o && o.panels.length > 1) {
      const r = pa(o.panels.map(da), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...r, ...e.frames.slice(s + 1)]
      };
    }
    return Qt(e, (r) => qn(r, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = qn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Wu(e, t, n) {
  const a = $t(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const o = qn(e, t);
    return o === e ? e : $e(o);
  }
  const l = ya(e, t, (o) => ({
    ...fa(ll(o.panels.map(da), He(o), n)),
    ...we(o)
  }));
  return l ? $e(l) : e;
}
function ll(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : pa(e, n).frames;
}
function rl(e, t) {
  return { ...fa(ll(e.children, He(e), t)), ...we(e) };
}
function ff(e, t, n) {
  const a = en(
    e,
    t,
    (s) => ne(s) ? s : rl(s, n)
  );
  return a ? $e(a) : X(e) && Ie(e, t) ? pa([e], n) : e;
}
function Hu(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function ol(e, t) {
  const n = Hu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...we(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function pf(e, t, n = "row") {
  const a = en(
    e,
    t,
    (s) => ne(s) ? ol(s, n) : s
  );
  return a ? $e(a) : e;
}
function il(e) {
  if (ne(e)) return null;
  const t = X(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || me(t) || X(t) && t.panels.length === 1 && me(t.panels[0]) ? null : t;
}
const Uu = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function ju(e, t) {
  const n = il(e);
  return n ? t === "inner" ? n : { ...Uu(n), ...we(e) } : e;
}
function Tt(e) {
  return e.title ? e.title : X(e) ? "" : ne(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function qt(e, t) {
  if (X(e)) {
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
function mt(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ne(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const c = mt(i.node, s, n);
    if (c === i.node) return e;
    const d = [...e.frames];
    return d[a] = { ...i, node: c }, { ...e, frames: d };
  }
  if (X(e)) {
    const i = e.panels[a];
    if (i === void 0 || me(i)) return e;
    const c = mt(i, s, n);
    if (c === i) return e;
    const d = [...e.panels];
    return d[a] = c, { ...e, panels: d };
  }
  const l = e.children[a];
  if (!l) return e;
  const o = mt(l, s, n);
  if (o === l) return e;
  const r = [...e.children];
  return r[a] = o, { ...e, children: r };
}
function fn(e, t, n) {
  if (t.length === 0)
    return zt(e) ? { ...e, sizes: _a(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ne(e)) {
    const r = e.frames[a];
    if (!r) return e;
    const i = fn(r.node, s, n);
    if (i === r.node) return e;
    const c = [...e.frames];
    return c[a] = { ...r, node: i }, { ...e, frames: c };
  }
  if (X(e)) {
    const r = e.panels[a];
    if (r === void 0 || me(r)) return e;
    const i = fn(r, s, n);
    if (i === r) return e;
    const c = [...e.panels];
    return c[a] = i, { ...e, panels: c };
  }
  const l = e.children[a];
  if (!l) return e;
  const o = [...e.children];
  return o[a] = fn(l, s, n), { ...e, children: o };
}
function ts(e, t, n, a = 0.02) {
  const s = e[t], l = e[t + 1];
  if (s === void 0 || l === void 0) return e;
  const o = s + l;
  if (o < a * 2) return e;
  const r = [...e], i = Math.min(Math.max(s + n, a), o - a);
  return r[t] = i, r[t + 1] = o - i, r;
}
function _n(e) {
  if (!X(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !me(t) ? e : { ...ma([Xu(e)]), ...we(e) };
}
const Xu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ns(e) {
  return e.length === 0 ? null : ma(e.map(Ze));
}
function Gu(e, t) {
  if (!e) return ns(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const i of at(e))
    !n.has(i) || a.has(i) ? s.add(i) : a.add(i);
  let l = e;
  for (const i of s)
    l = l ? vt(l, i) : null;
  const o = new Set(l ? at(l) : []), r = t.filter((i) => !o.has(i));
  if (r.length === 0) return l ? _n($e(l)) : null;
  if (!l) return ns(r);
  if (ne(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...r.map(
          (c, d) => bn(Ze(c), {
            x: pt.x + (i + d) * gn,
            y: pt.y + (i + d) * gn
          })
        )
      ]
    };
  }
  return _n($e(ma([l, ...r.map(Ze)])));
}
const wa = Symbol("dc.windowContext");
function Yu(e) {
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
const Qu = ["data-dc-glyph"], Zu = { class: "dc-glyph__line" }, Ju = ["d"], ed = {
  key: 0,
  class: "dc-glyph__aqua"
}, td = ["d"], nd = /* @__PURE__ */ re({
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
      b("g", Zu, [
        (f(!0), h(te, null, ve(t[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, Ju))), 128))
      ]),
      n[e.kind] ? (f(), h("g", ed, [
        (f(!0), h(te, null, ve(n[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, td))), 128))
      ])) : R("", !0)
    ], 8, Qu));
  }
}), St = /* @__PURE__ */ ie(nd, [["__scopeId", "data-v-4d2872c0"]]), ad = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], sd = ["data-dc-movable"], ld = { class: "dc-float__title dc-truncate" }, rd = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, od = ["aria-label", "aria-pressed", "data-dc-minimize"], id = ["aria-label", "aria-pressed", "data-dc-maximize"], cd = ["aria-label", "data-dc-close"], ud = { class: "dc-float__content" }, dd = ["data-dc-handle", "onPointerdown"], fd = /* @__PURE__ */ re({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ka(), a = v(() => Te(t.frame.node)), s = v(() => n.panelFor(a.value)?.fixed === !0), l = v(() => lt(t.frame)), o = v(() => dt(t.frame)), r = v(() => l.value || o.value), i = v(() => n.resizable.value && !s.value && !r.value), c = v(() => n.movable.value && !s.value && !r.value), d = v(() => {
      const I = at(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), m = v(() => d.value !== null && n.closable(d.value)), w = v(() => t.frame.node.headless === !0), $ = v(
      () => !w.value && (!X(t.frame.node) || o.value)
    ), x = v(
      () => t.frame.title || Tt(t.frame.node) || qt(t.frame.node, (I) => n.panelFor(I)?.title)
    ), S = v(() => n.spaceMenu(t.path));
    function g(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function k(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const T = v(() => {
      const I = n.framing.value;
      return I !== null && oe(t.frame.node, I);
    }), z = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${In}px`,
        height: `${Xs}px`
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
    return (I, H) => (f(), h("div", {
      class: "dc-float",
      style: Me(z.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": T.value ? "true" : "false",
      onPointerdown: H[3] || (H[3] = (y) => E(n).raiseAt(e.path))
    }, [
      $.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: g,
        onDblclick: k
      }, [
        b("span", ld, N(x.value), 1),
        S.value.length ? (f(), Q(ua, {
          key: 0,
          items: S.value,
          label: `${x.value} menu`
        }, null, 8, ["items", "label"])) : R("", !0),
        !s.value || o.value && m.value && d.value ? (f(), h("div", rd, [
          s.value ? R("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${x.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": a.value,
            onClick: H[0] || (H[0] = (y) => E(n).toggleMinimizeAt(e.path))
          }, [
            pe(St, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, od)),
          s.value ? R("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${x.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: H[1] || (H[1] = (y) => E(n).toggleMaximizeAt(e.path))
          }, [
            pe(St, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, id)),
          o.value && m.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${x.value}`,
            "data-dc-close": d.value,
            onClick: H[2] || (H[2] = (y) => E(n).close(d.value))
          }, [
            pe(St, { kind: "close" })
          ], 8, cd)) : R("", !0)
        ])) : R("", !0)
      ], 40, sd)) : R("", !0),
      b("div", ud, [
        be(I.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(te, null, ve(i.value ? L : [], (y) => (f(), h("span", {
        key: y,
        class: "dc-float__grip",
        "data-dc-handle": y,
        "aria-hidden": "true",
        onPointerdown: Le((P) => E(n).beginFrameDragAt(e.path, P, y), ["stop"])
      }, null, 40, dd))), 128))
    ], 44, ad));
  }
}), pd = /* @__PURE__ */ ie(fd, [["__scopeId", "data-v-f035684c"]]), ba = Symbol("dc.paneContext");
function vd(e) {
  return Kn(ba, e), e;
}
function vf() {
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
  return Al() && ss(a), a;
}
const md = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], hd = ["data-dc-movable"], gd = ["aria-label", "aria-pressed"], _d = ["data-dc-space-name"], yd = { class: "dc-truncate" }, wd = ["aria-label"], kd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, bd = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], $d = { class: "dc-tab__name dc-truncate" }, xd = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Cd = ["aria-label", "data-dc-close", "onClick"], Sd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Md = { class: "dc-pane__tools" }, Ed = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Pd = ["aria-label", "data-dc-minimize"], Ad = ["aria-label", "aria-pressed", "data-dc-maximize"], Td = ["aria-label", "data-dc-close"], zd = ["id", "role", "aria-labelledby"], Ld = ["id", "role", "aria-labelledby"], Rd = ["data-dc-edge"], Fd = /* @__PURE__ */ re({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ka(), a = Vn() ?? "dc-pane", s = v(
      () => t.group.panels.flatMap((M, W) => {
        if (!me(M)) {
          const Ce = Tt(M) || qt(M, (Pe) => n.panelFor(Pe)?.title);
          return [{ kind: "space", index: W, id: `space-${W}`, title: Ce, node: M }];
        }
        const ae = n.panelFor(M);
        return ae ? [{ kind: "panel", index: W, id: M, title: ae.title, panel: ae }] : [];
      })
    ), l = v(() => s.value.length > 1), o = v(() => {
      const M = yt(t.group);
      return s.value.find((W) => W.index === M) ?? s.value[0] ?? null;
    }), r = v(() => o.value?.kind === "space" ? o.value.node : null), i = v(() => r.value ? "" : Ys(t.group)), c = v(() => r.value ? null : n.panelFor(i.value)), d = v(() => o.value?.title ?? ""), m = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), w = v(() => [...t.path, o.value?.index ?? 0]), $ = v(() => i.value || Ga(t.group)[0] || ""), x = v(() => n.viewFor(i.value)), S = v(() => t.group.headless === !0), g = v(() => n.focused.value === i.value), k = v(() => n.dragging.value === i.value), T = v(() => n.moving.value === i.value), z = v(() => n.frameOf($.value) !== null), L = v(() => n.panelFor($.value)?.fixed === !0), I = v(
      () => !r.value && (n.canMove(i.value) || z.value && n.movable.value && !L.value)
    ), H = v(
      () => r.value ? n.spaceMenu(w.value) : n.menuFor(i.value)
    ), y = (M) => n.closable(M);
    vd({ panel: i });
    const P = v(() => n.maximized($.value)), O = v(
      () => z.value && !L.value || !l.value && !!c.value && y(c.value.id)
    ), j = (M) => `${a}-tab-${M}`, ue = v(() => `${a}-body`), Z = v(() => {
      const M = n.dropTarget.value;
      return !M || !Ie(t.group, M.panel) || M.edge === "float" ? null : M;
    }), _e = v(() => Z.value?.index === void 0 ? Z.value?.edge ?? null : null), xe = v(() => Z.value?.index ?? null), C = () => c.value ? n.renderContent(c.value, x.value, g.value) ?? null : null, q = () => c.value ? n.renderActions(c.value, x.value, g.value) ?? null : null;
    let U = null;
    function se(M) {
      const W = U !== null && Math.hypot(M.clientX - U.x, M.clientY - U.y) >= 4;
      return U = null, W;
    }
    const he = (M) => M.kind === "panel" ? M.id : Te(M.node);
    function Ee(M, W) {
      W.kind !== "space" && (n.focus(W.id), U = { x: M.clientX, y: M.clientY }, n.beginDrag(W.id, M));
    }
    function ze(M, W) {
      if (se(M)) return;
      const ae = he(W);
      ae && n.selectPanel(ae);
    }
    function Ue(M) {
      i.value && n.focus(i.value), !M.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (z.value ? n.beginFrameDrag($.value, M, "move") : n.beginDrag(i.value, M));
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
      if (!T.value) return;
      if (M.key === "Escape") {
        M.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const W = qe[M.key];
      W && (M.preventDefault(), z.value ? n.nudgeFrame(i.value, W, M.shiftKey) : n.nudge(i.value, W, M.shiftKey));
    }
    function Ke(M) {
      !z.value || M.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize($.value);
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
      const Lt = he(Pe);
      Lt && n.selectPanel(Lt);
    }
    return (M, W) => o.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": E(Ga)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": z.value ? "true" : "false",
      "data-dc-maximized": P.value ? "true" : "false",
      "data-dc-headless": S.value ? "true" : "false",
      "data-dc-active": g.value ? "true" : "false",
      "data-dc-dragging": k.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: W[7] || (W[7] = (ae) => i.value && E(n).focus(i.value))
    }, [
      S.value ? R("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": I.value ? "true" : "false",
        onPointerdown: Ue,
        onDblclick: Ke
      }, [
        I.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": T.value,
          onPointerdown: je,
          onClick: Xe,
          onKeydown: Fe
        }, [...W[8] || (W[8] = [
          b("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, gd)) : R("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          b("span", yd, N(m.value), 1)
        ], 8, _d)) : R("", !0),
        b("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(te, null, ve(s.value, (ae, Ce) => (f(), h(te, {
            key: ae.id
          }, [
            xe.value === Ce ? (f(), h("span", kd)) : R("", !0),
            b("button", {
              id: j(ae.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ae.kind === "panel" ? ae.id : void 0,
              "data-dc-space": ae.kind === "space" ? ae.title : void 0,
              "aria-selected": ae.index === o.value.index,
              "aria-controls": ue.value,
              tabindex: ae.index === o.value.index ? 0 : -1,
              onPointerdown: (Pe) => Ee(Pe, ae),
              onClick: (Pe) => ze(Pe, ae),
              onKeydown: (Pe) => G(Pe, Ce)
            }, [
              b("span", $d, N(ae.title), 1),
              ae.kind === "panel" && ae.panel.subtitle ? (f(), h("span", xd, N(ae.panel.subtitle), 1)) : R("", !0),
              l.value && ae.kind === "panel" && y(ae.id) ? (f(), h("span", {
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
              ])], 40, Cd)) : R("", !0)
            ], 40, bd)
          ], 64))), 128)),
          xe.value === s.value.length ? (f(), h("span", Sd)) : R("", !0)
        ], 8, wd),
        b("div", Md, [
          pe(q),
          H.value.length ? (f(), Q(ua, {
            key: 0,
            items: H.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ]),
        O.value ? (f(), h("div", Ed, [
          z.value && !L.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": $.value,
            onPointerdown: W[1] || (W[1] = Le(() => {
            }, ["stop"])),
            onClick: W[2] || (W[2] = (ae) => E(n).toggleMinimize($.value))
          }, [
            pe(St, { kind: "minimize" })
          ], 40, Pd)) : R("", !0),
          z.value && !L.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${P.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": P.value,
            "data-dc-maximize": $.value,
            onPointerdown: W[3] || (W[3] = Le(() => {
            }, ["stop"])),
            onClick: W[4] || (W[4] = (ae) => E(n).toggleMaximize($.value))
          }, [
            pe(St, {
              kind: P.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Ad)) : R("", !0),
          !l.value && c.value && y(c.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: W[5] || (W[5] = Le(() => {
            }, ["stop"])),
            onClick: W[6] || (W[6] = (ae) => E(n).close(c.value.id))
          }, [
            pe(St, { kind: "close" })
          ], 40, Td)) : R("", !0)
        ])) : R("", !0)
      ], 40, hd)),
      r.value ? (f(), h("div", {
        key: 1,
        id: ue.value,
        class: "dc-pane__space",
        role: S.value ? void 0 : "tabpanel",
        "aria-labelledby": S.value ? void 0 : j(o.value.id)
      }, [
        be(M.$slots, "space", {
          node: r.value,
          path: w.value
        }, void 0, !0)
      ], 8, zd)) : (f(), h("div", {
        key: 2,
        id: ue.value,
        class: "dc-pane__body",
        role: S.value ? void 0 : "tabpanel",
        "aria-labelledby": S.value ? void 0 : j(i.value)
      }, [
        pe(C)
      ], 8, Ld)),
      _e.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": _e.value,
        "aria-hidden": "true"
      }, null, 8, Rd)) : R("", !0)
    ], 40, md)) : R("", !0);
  }
}), cl = /* @__PURE__ */ ie(Fd, [["__scopeId", "data-v-44fd2b2d"]]), Nd = ["data-dc-space", "data-dc-path", "aria-label"], Id = {
  key: 0,
  class: "dc-space__head"
}, Od = { class: "dc-space__title dc-truncate" }, Dd = ["data-dc-direction"], Bd = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, qd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Kd = /* @__PURE__ */ re({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ka(), a = K(null), s = v(() => X(t.node) ? t.node : null), l = v(() => zt(t.node) ? t.node : null), o = v(() => ne(t.node) ? t.node : null), r = v(
      () => l.value ? l.value.children : o.value?.frames.map((C) => C.node) ?? []
    ), i = v(() => l.value ? nt(l.value) : []), c = v(
      () => (o.value?.frames ?? []).map((C, q) => ({
        held: C,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: q,
        key: y(C.node),
        path: [...t.path, q]
      })).sort((C, q) => C.key < q.key ? -1 : C.key > q.key ? 1 : 0)
    ), d = v(() => Tt(t.node)), m = v(() => n.spaceMenu(t.path)), w = v(() => t.node.headless === !0), $ = v(() => o.value ? "desktop" : l.value?.direction ?? ""), x = K(null), S = K(0);
    let g = null;
    ke(
      x,
      (C) => {
        g?.disconnect(), g = null, !(!C || typeof ResizeObserver > "u") && (S.value = C.clientWidth, g = new ResizeObserver(([q]) => {
          S.value = q?.contentRect.width ?? 0;
        }), g.observe(C));
      },
      { immediate: !0 }
    ), De(() => g?.disconnect());
    const k = v(() => {
      const C = Math.max(
        1,
        Math.floor((S.value + kt) / (In + kt))
      ), q = /* @__PURE__ */ new Map();
      let U = 0;
      for (const se of c.value)
        se.held.minimized === !0 && (q.set(se.key, {
          x: kt + U % C * (In + kt),
          bottom: kt + Math.floor(U / C) * (Xs + kt)
        }), U += 1);
      return q;
    }), T = (C) => !!C && C.join("/") === t.path.join("/"), z = v(() => {
      const C = n.dropTarget.value, q = o.value;
      if (!q || !C?.rect || C.edge !== "float") return null;
      if (C.space) return T(C.space) ? C.rect : null;
      const U = Se(q, C.panel);
      return U && q.frames.includes(U) ? C.rect : null;
    }), L = v(() => {
      const C = n.dropTarget.value;
      return !!C && !C.rect && T(C.space);
    }), I = v(() => l.value?.direction === "row"), H = v(() => r.value.map((C, q) => [...t.path, q])), y = (C) => [...at(C)].sort().join("/"), P = (C) => {
      const q = at(C)[0];
      return (q ? n.panelFor(q)?.title : null) ?? q ?? "panel";
    }, O = (C) => {
      const q = r.value[C], U = r.value[C + 1];
      return !q || !U ? "Resize panels" : `Resize ${P(q)} and ${P(U)}`;
    }, j = (C) => {
      const q = i.value[C] ?? 0, U = i.value[C + 1] ?? 0, se = q + U;
      return se > 0 ? Math.round(q / se * 100) : 50;
    };
    function ue() {
      const C = a.value, q = C ? I.value ? C.clientWidth : C.clientHeight : 0;
      return q <= 0 ? 0.05 : Math.min(n.minPanelSize.value / q, 0.4);
    }
    let Z = null;
    function _e(C, q) {
      const U = l.value, se = a.value;
      if (!n.resizable.value || !U || !se || C.button !== 0) return;
      const he = I.value ? se.clientWidth : se.clientHeight;
      if (he <= 0) return;
      const Ee = I.value ? C.clientX : C.clientY, ze = nt(U), Ue = Math.min(n.minPanelSize.value / he, 0.4);
      C.preventDefault();
      const je = (Fe) => {
        const Ke = ((I.value ? Fe.clientX : Fe.clientY) - Ee) / he;
        n.setSizes(t.path, ts(ze, q, Ke, Ue));
      }, Xe = () => Z?.(), qe = (Fe) => {
        Fe.key === "Escape" && (n.setSizes(t.path, ze), Z?.());
      };
      Z = () => {
        window.removeEventListener("pointermove", je), window.removeEventListener("pointerup", Xe), window.removeEventListener("pointercancel", Xe), window.removeEventListener("keydown", qe), Z = null;
      }, window.addEventListener("pointermove", je), window.addEventListener("pointerup", Xe), window.addEventListener("pointercancel", Xe), window.addEventListener("keydown", qe);
    }
    De(() => Z?.());
    function xe(C, q) {
      const U = l.value;
      if (!n.resizable.value || !U) return;
      const se = I.value ? "ArrowRight" : "ArrowDown", he = I.value ? "ArrowLeft" : "ArrowUp", Ee = C.shiftKey ? 0.1 : 0.02;
      if (C.key !== se && C.key !== he) return;
      const ze = C.key === se ? Ee : -Ee;
      C.preventDefault(), n.setSizes(t.path, ts(nt(U), q, ze, ue()));
    }
    return (C, q) => {
      const U = rs("WindowNode", !0);
      return s.value ? (f(), Q(cl, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Qe(({ node: se, path: he }) => [
          pe(U, {
            node: se,
            path: he,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": $.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !w.value ? (f(), h("header", Id, [
          b("span", Od, N(d.value), 1),
          m.value.length ? (f(), Q(ua, {
            key: 0,
            items: m.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ])) : R("", !0),
        o.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: x,
          class: "dc-window__desktop"
        }, [
          z.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Me({
              left: `${z.value.x}px`,
              top: `${z.value.y}px`,
              width: `${z.value.w}px`,
              height: `${z.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : R("", !0),
          (f(!0), h(te, null, ve(c.value, (se) => (f(), Q(pd, {
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
        ], 512)) : l.value ? (f(), h("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          L.value ? (f(), h("div", Bd)) : R("", !0),
          (f(!0), h(te, null, ve(r.value, (se, he) => (f(), h(te, {
            key: y(se)
          }, [
            b("div", {
              class: "dc-window__cell",
              style: Me({ flexGrow: i.value[he] ?? 1 })
            }, [
              pe(U, {
                node: se,
                path: H.value[he] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            he < r.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": I.value ? "vertical" : "horizontal",
              "aria-label": O(he),
              "aria-valuenow": j(he),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Ee) => _e(Ee, he),
              onKeydown: (Ee) => xe(Ee, he)
            }, null, 40, qd)) : R("", !0)
          ], 64))), 128))
        ], 8, Dd)) : R("", !0)
      ], 8, Nd));
    };
  }
}), Vd = /* @__PURE__ */ ie(Kd, [["__scopeId", "data-v-fb5b403f"]]), Wd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Hd = {
  key: 1,
  class: "dc-window__empty"
}, Ud = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, ln = 16, jd = /* @__PURE__ */ re({
  __name: "WindowFrame",
  props: /* @__PURE__ */ mn({
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
  emits: /* @__PURE__ */ mn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = It(e, "layout"), o = It(e, "views"), r = Ht(), i = v(() => new Map(a.panels.map((u) => [u.id, u]))), c = v(() => a.panels.map((u) => u.id)), d = v(() => Gu(l.value, c.value)), m = K(null), w = K(null), $ = K(null), x = K(!0), S = K(null), g = K(null), k = K(null), T = K(""), z = K(null);
    function L() {
      const u = z.value;
      return u ? [...u.querySelectorAll(".dc-pane[data-dc-panels]")].filter((_) => _.closest(".dc-window") === u).map((_) => ({ panels: (_.dataset.dcPanels ?? "").split(" "), element: _ })) : [];
    }
    function I(u) {
      const p = [];
      let _ = u.closest(".dc-float");
      for (; _; )
        p.unshift(Number(_.dataset.dcOrder ?? 0)), _ = _.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function H() {
      return L().map((u) => ({ pane: u, order: I(u.element) })).sort((u, p) => {
        const _ = Math.max(u.order.length, p.order.length);
        for (let A = 0; A < _; A += 1) {
          const F = (u.order[A] ?? -1) - (p.order[A] ?? -1);
          if (F !== 0) return F;
        }
        return 0;
      }).map((u) => u.pane);
    }
    const y = (u) => L().find((p) => p.panels.includes(u)) ?? null;
    function P(u) {
      const p = i.value.get(u);
      if (!p) return "";
      const _ = o.value[u];
      return _ && p.views?.some((A) => A.key === _) ? _ : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function O(u, p) {
      o.value = { ...o.value, [u]: p }, s("view-change", { panel: u, view: p });
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
      const A = (p - u.left) / u.width, F = (_ - u.top) / u.height, B = 0.3;
      return A > B && A < 1 - B && F > B && F < 1 - B ? "center" : [
        { edge: "left", distance: A },
        { edge: "right", distance: 1 - A },
        { edge: "top", distance: F },
        { edge: "bottom", distance: 1 - F }
      ].reduce(
        (le, V) => V.distance < le.distance ? V : le
      ).edge;
    }
    function xe(u, p) {
      const _ = [...u.querySelectorAll(".dc-tab")], A = _.findIndex((F) => {
        const B = F.getBoundingClientRect();
        return p < B.left + B.width / 2;
      });
      return A === -1 ? _.length : A;
    }
    function C(u, p, _) {
      for (const { panels: A, element: F } of H().reverse()) {
        const B = F.getBoundingClientRect();
        if (u < B.left || u > B.right || p < B.top || p > B.bottom) continue;
        const de = A.find((J) => J !== _), le = F.querySelector(".dc-pane__tabs"), V = le?.getBoundingClientRect();
        if (le && V && p >= V.top && p <= V.bottom)
          return de ? { panel: de, edge: "center", index: xe(le, u) } : null;
        const Y = F.querySelector(":scope > .dc-pane__space");
        if (Y) {
          const J = Y.getBoundingClientRect();
          if (u >= J.left && u <= J.right && p >= J.top && p <= J.bottom) continue;
        }
        return de ? { panel: de, edge: _e(B, u, p) } : null;
      }
      return U(u, p, _) ?? Ee(u, p);
    }
    function q() {
      const u = z.value;
      return u ? [...u.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === u).reverse() : [];
    }
    function U(u, p, _) {
      const A = d.value;
      if (!A) return null;
      for (const F of q()) {
        const B = F.getBoundingClientRect();
        if (u < B.left || u > B.right || p < B.top || p > B.bottom) continue;
        const de = ze(F), le = de.flatMap((ce) => ce.panels).find((ce) => ce !== _);
        if (!le && de.length > 0) return null;
        const V = Se(A, _)?.rect, Y = An(
          {
            x: u - B.left - 24,
            y: p - B.top - 12,
            w: V?.w ?? pt.w,
            h: V?.h ?? pt.h
          },
          { w: F.clientWidth, h: F.clientHeight },
          a.minPanelSize
        );
        if (le) return { panel: le, edge: "float", rect: Y };
        const J = se(F);
        return J ? { panel: "", space: J, edge: "float", rect: Y } : null;
      }
      return null;
    }
    function se(u) {
      const p = u.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function he() {
      const u = z.value;
      return u ? [...u.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === u).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const _ = se(p);
        return _ ? [{ element: p, path: _ }] : [];
      }) : [];
    }
    function Ee(u, p) {
      for (const { element: _, path: A } of he()) {
        if (_.dataset.dcSpace === "desktop") continue;
        const F = _.getBoundingClientRect();
        if (!(u < F.left || u > F.right || p < F.top || p > F.bottom))
          return { panel: "", space: A, edge: "center" };
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
      const _ = p.clientX, A = p.clientY;
      let F = !1, B = je(p);
      const de = () => {
        const fe = k.value;
        fe && ($.value = B ? U(fe.x, fe.y, u) : C(fe.x, fe.y, u));
      }, le = (fe) => {
        if (!F) {
          if (Math.hypot(fe.clientX - _, fe.clientY - A) < 4) return;
          F = !0, w.value = u, S.value = null;
        }
        B = je(fe), x.value = !B, k.value = { x: fe.clientX, y: fe.clientY }, de();
      }, V = (fe) => {
        je(fe) !== B && (B = !B, x.value = !B, F && de());
      }, Y = (fe) => {
        Ue?.();
        const ee = $.value, Ae = d.value;
        if (fe && F && ee && Ae) {
          const st = ee.space ? Ja(Ae, u, ee.space, ee.rect) : ee.edge === "float" && ee.rect ? Za(Ae, u, ee.panel, ee.rect) : sn(Ae, u, ee.panel, ee.edge, ee.index);
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
      const p = z.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${u.join("/")}"]`
      )].find((F) => F.closest(".dc-window") === p)?.parentElement ?? null : null;
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
      const A = Te(_.node);
      if (i.value.get(A)?.fixed === !0) return;
      const F = !dt(_);
      let B = Ou(p, u, F);
      B !== p && (F || (B = Dt(B, u)), l.value = B, s("frame-minimize", { panel: A, minimized: F }));
    }
    function Pe(u) {
      const p = Ke(u);
      p && Ce(p);
    }
    function Lt(u) {
      const p = d.value, _ = p ? ut(p, u) : null;
      if (!p || !_) return;
      const A = Te(_.node);
      if (i.value.get(A)?.fixed === !0) return;
      const F = !lt(_);
      let B = Iu(p, u, F);
      B !== p && (F && (B = Dt(B, u)), l.value = B, s("frame-maximize", { panel: A, maximized: F }));
    }
    function $a(u) {
      const p = Ke(u);
      p && Lt(p);
    }
    function xa(u, p, _) {
      const A = d.value, F = A ? ut(A, u) : null;
      if (!A || !F || p.button !== 0 || w.value || g.value) return;
      const B = Te(F.node);
      if (i.value.get(B)?.fixed === !0 || lt(F) || dt(F) || (_ === "move" ? !a.movable : !a.resizable)) return;
      const de = Fe(u), le = Du(A, u);
      D(u);
      const V = { w: de?.clientWidth ?? 0, h: de?.clientHeight ?? 0 }, Y = { ...F.rect }, J = p.clientX, ce = p.clientY, ge = a.minPanelSize;
      g.value = B;
      const fe = (Ne) => {
        const Je = d.value;
        if (!Je) return;
        const Rt = Qa(Je, le, An(Ne, V, ge));
        Rt !== Je && (l.value = Rt);
      }, ee = (Ne) => {
        Ne.preventDefault();
        const Je = Ne.clientX - J, Rt = Ne.clientY - ce;
        fe(
          _ === "move" ? { ...Y, x: Y.x + Je, y: Y.y + Rt } : Ya(Y, _, Je, Rt, ge)
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
    function ul(u, p, _) {
      const A = Ke(u);
      A && xa(A, p, _);
    }
    function dl(u, p, _ = !1) {
      const A = d.value, F = Ke(u), B = A && F ? ut(A, F) : null;
      if (!A || !F || !B || i.value.get(u)?.fixed === !0 || (_ ? !a.resizable : !a.movable)) return;
      if (lt(B) || dt(B)) {
        T.value = `${Ge(u)} is ${lt(B) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const de = p === "left" ? -ln : p === "right" ? ln : 0, le = p === "up" ? -ln : p === "down" ? ln : 0, V = Fe(F), Y = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, J = _ ? Ya(B.rect, "se", de, le, a.minPanelSize) : { ...B.rect, x: B.rect.x + de, y: B.rect.y + le }, ce = Qa(A, F, An(J, Y, a.minPanelSize));
      if (ce === A) {
        T.value = _ ? `${Ge(u)} cannot be resized further.` : `${Ge(u)} cannot move ${p}.`;
        return;
      }
      l.value = ce;
      const ge = ut(ce, F);
      ge && (s("frame-change", { panel: u, rect: ge.rect }), T.value = _ ? `${Ge(u)} resized to ${ge.rect.w} by ${ge.rect.h}.` : `${Ge(u)} moved to ${ge.rect.x}, ${ge.rect.y}.`);
    }
    De(() => qe?.());
    function fl(u, p) {
      const _ = y(u), A = _?.element.getBoundingClientRect();
      if (!_ || !A) return null;
      const F = p === "left" || p === "right", B = (V) => {
        if (!(F ? V.bottom > A.top + 1 && V.top < A.bottom - 1 : V.right > A.left + 1 && V.left < A.right - 1)) return null;
        const J = p === "left" ? A.left - V.right : p === "right" ? V.left - A.right : p === "up" ? A.top - V.bottom : V.top - A.bottom;
        return J < -1 ? null : J;
      }, de = [];
      for (const V of L()) {
        if (V === _ || V.element === _.element) continue;
        const Y = B(V.element.getBoundingClientRect());
        if (Y === null) continue;
        const J = V.panels.find((ce) => ce !== u);
        J && de.push({ to: { panel: J }, distance: Y });
      }
      for (const { element: V, path: Y } of he()) {
        const J = B(V.getBoundingClientRect());
        J !== null && de.push({ to: { space: Y }, distance: J });
      }
      return de.reduce(
        (V, Y) => V && V.distance <= Y.distance ? V : Y,
        null
      )?.to ?? null;
    }
    function pl(u) {
      const p = d.value ? Se(d.value, u) !== null : !1;
      if (!p && !ue(u)) return;
      S.value = S.value === u ? null : u;
      const _ = Ge(u);
      if (!S.value) {
        T.value = `${_}: move mode off.`;
        return;
      }
      T.value = p ? `${_}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${_}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ge = (u) => i.value.get(u)?.title ?? u, vl = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function ml(u, p, _ = !1) {
      if (!ue(u)) return;
      const A = d.value;
      if (!A) return;
      const F = Ge(u), B = $t(A, u);
      if (!_ && B && (p === "left" || p === "right") && B.panels.length > 1) {
        const ce = B.panels.indexOf(u), ge = p === "left" ? ce - 1 : ce + 1;
        if (ge >= 0 && ge < B.panels.length) {
          Z(Bt(A, u, ge), { panel: u, target: u, edge: "center", index: ge }), T.value = `${F} moved ${p}, now tab ${ge + 1} of ${B.panels.length}.`, xn(u);
          return;
        }
      }
      const le = fl(u, p);
      if (!le || le.panel !== void 0 && !ue(le.panel)) {
        T.value = `${F} cannot move ${p}.`;
        return;
      }
      const V = vl[p];
      if (le.space) {
        const ce = le.space, ge = ot(A, ce), fe = Se(A, u)?.rect, ee = { ...pt, ...fe ? { w: fe.w, h: fe.h } : {} };
        Z(Ja(A, u, ce, ee), { panel: u, target: "", space: ce, edge: V }), T.value = `${F} moved ${p}, into ${ge ? Tt(ge) : "the space"}.`, xn(u);
        return;
      }
      const Y = le.panel, J = B?.panels.length === 1 && $t(A, Y)?.panels.length === 1;
      _ ? (Z(sn(A, u, Y, "center"), {
        panel: u,
        target: Y,
        edge: "center"
      }), T.value = `${F} joined ${Ge(Y)} as a tab.`) : J ? (Z(dn(A, u, Y), { panel: u, target: Y, edge: V }), T.value = `${F} moved ${p}, trading places with ${Ge(Y)}.`) : (Z(sn(A, u, Y, V), { panel: u, target: Y, edge: V }), T.value = `${F} moved ${p}, beside ${Ge(Y)}.`), xn(u);
    }
    function xn(u) {
      Kt(() => {
        y(u)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function hl(u, p) {
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
    function gl(u) {
      Ca(u) && s("panel-close", u);
    }
    const Sn = K(/* @__PURE__ */ new Map());
    let _l = 0;
    function yl(u, p) {
      const _ = _l += 1;
      return Sn.value.set(_, { panel: u, items: p }), () => {
        Sn.value.delete(_);
      };
    }
    function wl(u) {
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
    function kl(u, p) {
      const _ = p.id, A = $t(u, _), F = (A?.panels.length ?? 0) > 1, B = A?.fixedView === !0, de = (J) => ({
        action: () => {
          J !== u && (l.value = J);
        }
      }), le = [], V = [], Y = p.views ?? [];
      if (Y.length > 1 && !B) {
        const J = P(_);
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
      return F && !B && V.push(
        { id: "show-row", label: "Row", checked: !1, ...de(es(u, _, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...de(es(u, _, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...de(Vu(u, _))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...de(Wu(u, _))
        }
      ), F && A && (V.length && V.push({ separator: !0 }), V.push(...Ea(A, _))), { panel: le, tabs: V, tabsTitle: A ? Ma(A) : "" };
    }
    function Ea(u, p) {
      const _ = yt(u), A = (F) => {
        const B = u.panels[(_ + F + u.panels.length) % u.panels.length];
        return (B === void 0 ? "" : Te(B)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Cn(A(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Cn(A(-1)) }
      ];
    }
    function tn(u) {
      return u.title ? u.title : X(u) ? u.panels.length > 1 ? "these tabs" : "the strip" : Tt(u);
    }
    function Pa(u) {
      if (!u || ne(u) || u.fixedView === !0 || !u.title && u.headless !== !0 || He(u)) return null;
      const p = il(u);
      return p && p.fixedView !== !0 ? p : null;
    }
    function bl(u) {
      const p = d.value;
      if (!a.menu || !p) return [];
      const _ = ot(p, u);
      if (!_ || X(_)) return [];
      if (_.fixedView) return [];
      const A = ne(_) ? "desktop" : _.direction, F = (ee, Ae, st) => ({
        id: `show-${ee}`,
        label: Ae,
        checked: A === ee,
        action: () => {
          const it = d.value, ct = st();
          !it || ct === _ || (l.value = _n($e(mt(it, u, ct))));
        }
      }), B = () => {
        const ee = sl(_, $l(_));
        if (X(ee) && ee.panels.length === 0) return _;
        const Ae = X(ee) && ee.panels.length === 1 ? ee.panels[0] : void 0;
        return Ae !== void 0 && me(Ae) ? _ : ee;
      }, de = (ee) => () => ne(_) ? ol(_, ee) : _.direction === ee ? _ : { ..._, direction: ee }, le = u.slice(0, -1), V = u.length > 0 ? ot(p, le) : null, Y = V && X(V) && V.panels.length > 1 ? V : null, J = V && Pa(V) === _ ? V : null, ce = Pa(_), ge = _.title || "this space", fe = (ee, Ae, st, it, ct) => ({
        id: ee,
        label: ct,
        action: () => {
          const Ne = d.value;
          Ne && (l.value = _n($e(mt(Ne, Ae, ju(st, it)))));
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
            F("row", "Row", de("row")),
            F("column", "Column", de("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            F("tabs", "Tabs", () => B()),
            F("desktop", "Desktop", () => ne(_) ? _ : rl(_))
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
    function $l(u) {
      const p = m.value;
      return p && oe(u, p) ? p : void 0;
    }
    function xl(u) {
      const p = d.value, _ = i.value.get(u);
      if (!p || !_) return [];
      const A = a.menu ? kl(p, _) : null, F = wl(u);
      F.length && A?.panel.length && F.push({ separator: !0 }), A && F.push(...A.panel);
      const B = Sa([
        { id: "about-panel", title: _.title, items: F },
        { id: "about-tabs", title: A?.tabsTitle ?? "", items: A?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(_, B) : B;
    }
    function Cl(u, p) {
      return r[`${u}-${p}`] ?? r[u];
    }
    function Aa(u, p, _, A) {
      return Cl(u, p.id)?.({ panel: p, view: _, active: A });
    }
    Yu({
      panelFor: (u) => i.value.get(u) ?? null,
      viewFor: P,
      setView: O,
      movable: v(() => a.movable),
      resizable: v(() => a.resizable),
      minPanelSize: v(() => a.minPanelSize),
      spaceNames: v(() => a.spaceNames),
      focused: m,
      dragging: w,
      dropTarget: $,
      moving: S,
      framing: g,
      canMove: ue,
      focus(u) {
        m.value !== u && (m.value = u, s("panel-activate", u));
      },
      selectPanel: Cn,
      beginDrag: Xe,
      toggleMoveMode: pl,
      nudge: ml,
      setSizes: hl,
      frameOf: (u) => d.value ? Se(d.value, u) : null,
      beginFrameDrag: ul,
      nudgeFrame: dl,
      raise: G,
      maximized: M,
      toggleMaximize: $a,
      minimized: W,
      toggleMinimize: Pe,
      beginFrameDragAt: xa,
      raiseAt: D,
      toggleMaximizeAt: Lt,
      toggleMinimizeAt: Ce,
      menuFor: xl,
      spaceMenu: bl,
      registerMenu: yl,
      closable: Ca,
      close: gl,
      renderContent: (u, p, _) => Aa("panel", u, p, _),
      renderActions: (u, p, _) => Aa("actions", u, p, _),
      layout: d
    });
    const Sl = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Ml = () => {
      const u = w.value, p = k.value;
      return !u || !p ? null : Tl(
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
      move(u, p, _, A) {
        const F = d.value;
        F && Z(sn(F, u, p, _, A), {
          panel: u,
          target: p,
          edge: _,
          ...A === void 0 ? {} : { index: A }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(u) {
        const p = d.value;
        p && (l.value = Ct(p, u));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(u, p, _) {
        const A = d.value;
        A && Z(Za(A, u, p, _), {
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
        const A = Ru(_, u, p);
        if (A === _) return;
        l.value = A;
        const F = Se(A, u);
        F && s("frame-change", { panel: u, rect: F.rect });
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
    }), (u, p) => (f(), h("div", {
      ref_key: "root",
      ref: z,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": w.value ? "true" : "false",
      "data-dc-docking": x.value ? "true" : "false",
      style: Me(Sl.value)
    }, [
      d.value ? (f(), Q(Vd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", Hd, " This window has no panels. ")),
      pe(Ml),
      b("p", Ud, N(T.value), 1)
    ], 12, Wd));
  }
}), Xd = /* @__PURE__ */ ie(jd, [["__scopeId", "data-v-711565af"]]);
function hf(e = "", t = "/") {
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
function as(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return tt(a === -1 ? n : n.slice(0, a));
}
function gf(e) {
  const t = K(as(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), a = ke(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = as(s);
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
const Gd = {
  DataShell: fu,
  ShellHeader: Ls,
  QueryPanel: Fs,
  RecordActions: Is,
  ResultsArea: Us,
  FacetControl: Rs,
  SegmentedControl: xu,
  StatusPill: Xt,
  WindowFrame: Xd,
  WindowPane: cl,
  ListView: Nn,
  CardsView: Ds,
  GridView: Bs,
  ImagesView: qs,
  TableView: Ws,
  LinksView: Ks,
  PreviewView: Vs,
  TypeCardsView: Hs
}, _f = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Gd))
      e.component(`${n}${a}`, s);
    t.route && e.provide(os, t.route);
  }
};
export {
  gn as CASCADE_STEP,
  Jd as COLUMN_BREAKPOINTS,
  Zd as COLUMN_ROLES,
  Ds as CardsView,
  ja as ColumnCell,
  pt as DEFAULT_FRAME,
  zn as DEFAULT_SORT,
  Ll as DEFAULT_VIEW,
  fu as DataShell,
  Ln as EMPTY_CELL,
  Ps as ENTITY_ALL,
  hn as ENTITY_TERM,
  Wt as EXPRESSION_TERM,
  ra as FACET_PREFIX,
  Rs as FacetControl,
  Bs as GridView,
  _f as HeaderContentLayoutPlugin,
  qs as ImagesView,
  Ks as LinksView,
  Nn as ListView,
  kt as MINIMIZED_GAP,
  Xs as MINIMIZED_HEIGHT,
  In as MINIMIZED_WIDTH,
  js as MIN_FRAME,
  Ka as MOCK_TINTS,
  af as MenuBar,
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
  Vs as PreviewView,
  kn as QueryMark,
  Fs as QueryPanel,
  nn as RECORD_STATUSES,
  ms as RESULT_FIELDS,
  os as ROUTE_ADAPTER_KEY,
  Is as RecordActions,
  Us as ResultsArea,
  Es as SHELL_CONTEXT_KEY,
  Qd as SHELL_THEMES,
  Yt as ScopeMark,
  xu as SegmentedControl,
  _t as SelectTick,
  nf as ShellCard,
  Ls as ShellHeader,
  Xa as StandingControl,
  Xt as StatusPill,
  Ws as TableView,
  Hs as TypeCardsView,
  is as VIEW_KINDS,
  Rl as VIEW_LABELS,
  wa as WINDOW_CONTEXT_KEY,
  Xd as WindowFrame,
  cl as WindowPane,
  Ys as activePanel,
  yt as activeTab,
  Jn as addTerm,
  Yn as andExpression,
  zu as axisOf,
  pa as cascade,
  _s as cellFull,
  Ut as cellText,
  cn as cellTextOf,
  Oe as cellValue,
  za as changesResults,
  An as clampRect,
  sl as collapseSpace,
  Vu as collapseToTabs,
  lf as column,
  Ra as columnAlign,
  Fa as columnClass,
  La as columnKey,
  Rn as columnTruncates,
  Bl as columnsFor,
  Nl as countPages,
  zl as createHistoryAdapter,
  hf as createMemoryAdapter,
  fr as createMockDataSource,
  gf as createVueRouterAdapter,
  Vl as defaultCellText,
  ns as defaultLayout,
  Gn as defaultQuery,
  pr as drillExpression,
  Ja as dropIntoSpace,
  At as emptyFacetState,
  Un as emptyFacetValue,
  $s as excludingTerm,
  bt as findEntity,
  rt as findSort,
  of as fixedView,
  fa as float,
  Za as floatPanel,
  rl as floatSplit,
  Wu as floatTabs,
  on as fnv1a,
  us as focusEntity,
  wt as formatCount,
  Ol as formatDate,
  ft as formatExpression,
  Il as formatMetric,
  Dl as formatOrdinal,
  jt as formatTerm,
  bn as frame,
  ut as frameAt,
  Se as frameOf,
  Bn as framePathOf,
  Te as frontPanel,
  cr as generateRows,
  sf as group,
  $t as groupOf,
  Lu as groups,
  vs as hasActiveFacets,
  oe as hasPanel,
  rf as headless,
  Nt as insertPanel,
  Ot as isChoosable,
  ef as isEntityScoped,
  ps as isFacetActive,
  ne as isFloat,
  X as isGroup,
  lt as isMaximized,
  dt as isMinimized,
  me as isPanelTab,
  jn as isPristineQuery,
  zt as isSplit,
  Ie as isTabOf,
  Xn as isTypeCardsQuery,
  cs as isViewKind,
  Ba as joinExpression,
  Cs as liftTerm,
  Zl as matchesExpression,
  ur as matchesFacets,
  Fu as maximizeFrame,
  Iu as maximizeFrameAt,
  ju as mergeSpace,
  Nu as minimizeFrame,
  Ou as minimizeFrameAt,
  sn as movePanel,
  Bt as moveTab,
  tf as negateTerm,
  ot as nodeAt,
  qt as nodeTitle,
  $e as normalizeLayout,
  tt as normalizeSearch,
  _a as normalizeSizes,
  il as onlySpace,
  Vt as oppositeTerm,
  at as panelIds,
  Ze as panelNode,
  Ga as panelTabs,
  Re as parseExpression,
  wr as parseQuery,
  Wo as presentParts,
  Os as presentRow,
  Be as pressOptions,
  vd as providePaneContext,
  vr as provideShellContext,
  Yu as provideWindowContext,
  Tn as raiseFrame,
  Dt as raiseFrameAt,
  Du as raisedPath,
  hs as reconcileFacets,
  Gu as reconcileLayout,
  bs as recordTerm,
  nr as refineExpression,
  vt as removePanel,
  mt as replaceAt,
  Ya as resizeRect,
  ts as resizeSplit,
  Hn as resolveView,
  Ve as roleColumn,
  gs as roleColumns,
  _n as rootSpace,
  ma as row,
  Kl as rowKey,
  yn as sameTerm,
  Qn as scopeTerm,
  Zn as scopeTermFor,
  Ms as scopedEntity,
  Ha as serializeQuery,
  Ct as setActivePanel,
  Ru as setFrameRect,
  Qa as setFrameRectAt,
  fn as setSizesAt,
  df as setSplitDirection,
  nt as sizesOf,
  fs as sortsFor,
  we as spaceChrome,
  Tt as spaceTitle,
  va as split,
  er as splitExpression,
  es as spreadTabs,
  br as summarizeQuery,
  oa as summaryTerms,
  dn as swapPanels,
  da as tabNode,
  Zt as tabPanels,
  xs as termStanding,
  ol as tileFloat,
  ff as toFloat,
  pf as toTiled,
  cf as toggleMaximized,
  uf as toggleMinimized,
  fc as useColumns,
  Br as useEntityCounts,
  Lc as useEntityPreviews,
  vf as usePaneContext,
  mf as usePaneMenu,
  gt as usePresentedRows,
  $r as useQueryState,
  Vr as useRecordNames,
  xr as useResults,
  ye as useShellContext,
  ka as useWindowContext,
  Va as withStanding,
  Ss as withoutOwnScope,
  Jl as withoutTerm
};
