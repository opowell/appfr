import { ref as U, inject as Ct, provide as In, computed as v, toValue as Lt, shallowRef as Mt, watch as be, onScopeDispose as Ws, defineComponent as fe, onBeforeUnmount as et, openBlock as f, createElementBlock as h, createElementVNode as y, toDisplayString as T, Fragment as Z, renderList as ce, createCommentVNode as L, unref as P, withKeys as ft, withModifiers as Fe, normalizeStyle as Te, renderSlot as ke, withDirectives as Mn, vModelText as Sn, useSlots as Vt, nextTick as Kt, createBlock as le, createTextVNode as je, createVNode as ye, withCtx as He, resolveDynamicComponent as On, normalizeClass as un, createSlots as sn, useModel as Nt, useId as Us, mergeModels as dn, Comment as dl, Text as fl, onMounted as pl, resolveComponent as Hs, getCurrentScope as vl, h as hl } from "vue";
const js = Symbol("dc.routeAdapter");
function Ze(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ml() {
  const e = typeof window < "u", t = U(e ? Ze(window.location.search) : ""), n = U(e ? window.location.pathname : "/"), s = () => {
    t.value = Ze(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (l, o) => {
    const i = Ze(l);
    if (!e) {
      t.value = i;
      return;
    }
    const r = `${window.location.pathname}${i}${window.location.hash}`;
    o === "push" ? window.history.pushState(window.history.state, "", r) : window.history.replaceState(window.history.state, "", r), t.value = i, n.value = window.location.pathname;
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
const Xs = ["list", "cards", "grid", "table", "links", "preview"], Pd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], en = ["ok", "running", "queued", "review", "failed"], Ad = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], zd = [480, 620, 760, 900, 1100], gl = "cards", En = "updated";
function Gs(e) {
  return typeof e == "string" && Xs.includes(e);
}
const _l = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Ys(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function ut(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Qs(e, t = {}) {
  const n = ut(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Zs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Js(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Zs(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const yl = { key: En, label: En };
function lt(e, t, n = null) {
  const s = Js(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === En) ?? s[0] ?? yl;
}
function Bn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function St(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Bn(n);
  return t;
}
function ea(e) {
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
function ta(e) {
  return Object.values(e).some(ea);
}
function hn(e) {
  return e.entity === null && e.expr.trim() === "" && !ta(e.facets);
}
function Td(e) {
  return e.entity !== null;
}
function Kn(e) {
  return e.entity === null && e.view === "cards";
}
function wl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function qn(e, t = {}) {
  const s = t.landing === "entity" ? Qs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Gs(t.view) ? t.view : gl,
    sort: lt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: St(s),
    page: 1
  };
}
const na = ["entity", "sort", "dir", "expr", "facets"];
function bs(e) {
  return na.some((t) => t in e);
}
function sa(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Bn(s);
  }
  return n;
}
function an(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function kl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function _t(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function bl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function $l(e) {
  return String(e + 1).padStart(2, "0");
}
const Pn = "—";
function Oe(e, t) {
  return e.find((n) => n.role === t);
}
function aa(e, t) {
  return e.filter((n) => n.role === t);
}
function xl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const Cl = ["id", "entityKey", "entityLabel"];
function De(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Cl.includes(n))
      return t[n];
  }
}
function $s(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ml(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Sl(e, t) {
  if (e == null || e === "") return Pn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? kl(n) : String(e);
  }
  return t === "date" ? bl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Pn : String(e);
}
function Wt(e, t) {
  const n = De(e, t);
  return e.format ? e.format(n, t) : Sl(n, e.kind);
}
function El(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function la(e, t) {
  const n = Wt(e, t), s = El(De(e, t));
  return s && s !== n ? s : n;
}
function ln(e, t) {
  return e ? Wt(e, t) : "";
}
function xs(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Pl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Cs(e) {
  return [Pl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function An(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Al = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function zl(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const o = e[l];
    if (s) {
      o === s ? s = null : n += o;
      continue;
    }
    if (o === '"' || o === "'") {
      s = o;
      continue;
    }
    if (/\s/.test(o)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += o;
  }
  return a(), t;
}
function tt(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of zl(t)) {
    const l = a.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const o = a.length > 1 && a.startsWith("-"), i = o ? a.slice(1) : a, r = o ? { negated: !0 } : {}, u = Al.exec(i);
    u && u[3] !== "" ? s.push({
      kind: "field",
      field: u[1].toLowerCase(),
      comparator: u[2],
      value: u[3],
      ...r
    }) : s.push({ kind: "text", value: i, ...r });
  }
  return s.length && n.push(s), n;
}
const kn = (e) => e.toLowerCase().replace(/\s+/g, ""), Tl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Rl(e, t, n) {
  const s = kn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && kn(u.label) === s
  );
  if (l) return De(l, t);
  const o = n.facets.find((u) => kn(u.label) === s);
  if (o && o.key in t.fields) return t.fields[o.key];
  const i = Tl.find(([u]) => u === s)?.[1];
  if (i) {
    const u = Oe(a, i);
    if (u) return De(u, t);
  }
  const r = /^metric(\d+)$/.exec(s);
  if (r) {
    const u = aa(a, "metric")[Number(r[1]) - 1];
    if (u) return De(u, t);
  }
}
function bn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function Ms(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Ll(e, t, n) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const r = Oe(o, i), u = r ? De(r, t) : void 0;
      return typeof u == "string" && bn(u, e.value);
    });
  }
  const s = Rl(e.field, t, n);
  if (s === void 0) return null;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (i) => e.comparator === "=" ? Ms(String(i), e.value) : bn(String(i), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? s : o === "false" || o === "no" ? !s : null;
    }
    if (typeof s == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? s === o : null;
    }
    return e.comparator === "=" ? Ms(String(s), e.value) : bn(String(s), e.value);
  }
  const a = Number(e.value), l = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(l) ? null : Nl(e.comparator, l, a);
}
function Fl(e, t, n) {
  const s = Ll(e, t, n);
  return s === null ? !0 : e.negated ? !s : s;
}
function Nl(e, t, n) {
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
function Dl(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => Fl(a, t, n))) : !0;
}
function Ss(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Ut(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ss(e.value) : `${t}${e.field}${e.comparator}${Ss(e.value)}`;
}
function Rd(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function wt(e) {
  return e.filter((t) => t.length).map((t) => t.map(Ut).join(" ")).join(" OR ");
}
function Il(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, o) => o !== n) : s).filter((s) => s.length);
}
function Ol(e) {
  const t = tt(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(Ut).join(" ")
  };
}
function Es(e, t) {
  return [...e.map(Ut), t.trim()].filter(Boolean).join(" ");
}
const Ps = (e, t) => e.toLowerCase() === t.toLowerCase();
function ra(e, t) {
  return !!e.negated == !!t.negated && oa(e, t);
}
function As(e, t) {
  return !!e.negated != !!t.negated && oa(e, t);
}
function oa(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Ps(e.value, t.value) : t.kind === "text" && Ps(e.value, t.value);
}
function Bl(e, t) {
  return t.filter((n) => !e.some((s) => ra(s, n)));
}
function Vn(e, t) {
  const n = tt(e), s = tt(t);
  return n.length ? s.length ? wt(
    n.flatMap((a) => s.map((l) => [...a, ...Bl(a, l)]))
  ) : wt(n) : wt(s);
}
const zs = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function ia(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Kl = 7, ql = 3;
function Vl(e, t, n, s) {
  const a = (t * Kl + an(n)) % s, l = [];
  for (let o = 0; o < Math.min(ql, s); o++)
    l.push(ia(e, (a + o) % s));
  return l;
}
function Wl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ul(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ul(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) a.add((s + l) % e.length);
  return [...a].sort((l, o) => l - o).map((l) => e[l]);
}
function Hl(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: l } = t, o = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${o}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return en[n % en.length];
    case "updated":
      return l;
    case "tint":
      return zs[n % zs.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return en[n % en.length];
    case "date":
      return l;
    default:
      return;
  }
}
function jl(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const u = l[r % l.length], d = Math.floor(r / l.length), g = an(`${s}:${e.key}:${u[0]}:${r}`), _ = ia(e.key, r), w = new Date(a.getTime() - g % 900 * 36e5).toISOString(), k = {};
    for (const C of e.columns ?? []) {
      const M = C.field ?? C.key;
      if (!M || C.value) continue;
      const b = Hl(C, {
        hash: an(`${g}:${M}`),
        sample: u,
        revision: d,
        updatedAt: w
      });
      b !== void 0 && (k[M] = b);
    }
    for (const C of e.facets)
      k[C.key] = Wl(C, an(`${g}:${C.key}`));
    for (const [C, M] of o)
      k[C] = M === e.key ? _ : Vl(M, r, C, n);
    i.push({ id: _, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return i;
}
function Xl(e, t) {
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
function Gl(e, t) {
  const n = e.find((o) => o.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", l = s === "date" || n.role === "updated";
  return (o, i) => {
    const r = De(n, o), u = De(n, i);
    return a ? Number(u ?? 0) - Number(r ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(r ?? "")) : String(u ?? "").localeCompare(String(r ?? ""));
  };
}
function Yl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const o = e.scopes ?? a.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = jl(s, { ...e, scopes: o });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: o, offset: i }) {
      const r = tt(s.expr), u = l ? [l] : a.entities, d = [], g = [];
      for (const k of u)
        for (const C of n(k, a))
          d.push(C), (l ? Xl(C, s.facets) : !0) && Dl(r, C, k) && g.push(C);
      const _ = lt(l, s.sort, a), w = g.sort(Gl(Zs(l, a), _.key));
      return s.dir === "asc" && w.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: w.slice(i, i + o),
        total: g.length,
        unfiltered: g.length === d.length
      };
    }
  };
}
function Ql(e, t) {
  return ca(e, t.id);
}
function ca(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Wn(e, t) {
  return Ql(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ua(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = tt(t).flat();
  if (!s) return n;
  const a = tt(n);
  return a.some((i) => i.some((r) => ra(r, s))) ? n : a.some((i) => i.some((r) => As(r, s))) ? wt(
    a.map(
      (i) => i.map((r) => As(r, s) ? s : r)
    )
  ) : `${n} ${t}`;
}
function Zl(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Ge(e) {
  return e.metaKey || e.ctrlKey ? { exclude: !0 } : {};
}
function Jl(e, t, n, s = {}) {
  const a = Wn(e, n);
  return ua(t.expr, s.exclude ? Zl(a) : a);
}
function da(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const fa = Symbol("dc.shellContext");
function er(e) {
  return In(fa, e), e;
}
function Me() {
  const e = Ct(fa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Un = "e", Hn = "v", jn = "s", Xn = "d", Gn = "q", Yn = "p", Qn = "f_", pa = "*", tr = [
  Un,
  Hn,
  jn,
  Xn,
  Gn,
  Yn
], zn = "..", va = ",", nr = [
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
function $n(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of nr) t = t.replace(n, s);
  return t;
}
function Qe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ha(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), l = a === -1 ? s : s.slice(0, a), o = a === -1 ? "" : s.slice(a + 1);
    n.push([Qe(l), o]);
  }
  return n;
}
function sr(e) {
  return tr.includes(e) || e.startsWith(Qn);
}
function Ts(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function ar(e, t) {
  const n = Qe(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(va).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => s.has(l)) };
    }
    case "range": {
      const s = n.indexOf(zn), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + zn.length)).trim(), o = a === "" ? null : Number(a), i = l === "" ? null : Number(l);
      let r = o !== null && Number.isFinite(o) ? Ts(o, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? Ts(i, e.min, e.max) : null;
      return r !== null && u !== null && r > u && ([r, u] = [u, r]), { kind: "range", min: r, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function lr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(va) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${zn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function rr(e, t, n = {}) {
  const s = qn(t, n), a = new Map(ha(e)), l = a.get(Un), o = l === void 0 ? s.entity : Qe(l), i = o === pa ? null : ut(t, o), r = a.get(Hn), u = r && Gs(Qe(r)) ? Qe(r) : s.view, d = a.get(jn), g = lt(i, d ? Qe(d) : n.sort, t), _ = a.get(Xn), w = _ ? Qe(_) === "asc" ? "asc" : "desc" : s.dir, k = a.get(Gn), C = a.get(Yn), M = C === void 0 ? 1 : Number(Qe(C)), b = Number.isFinite(M) ? Math.max(1, Math.floor(M)) : 1, x = {};
  for (const A of i?.facets ?? []) {
    const R = a.get(`${Qn}${A.key}`);
    x[A.key] = R === void 0 ? Bn(A) : ar(A, R);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: g.key,
    dir: w,
    expr: k === void 0 ? "" : Qe(k),
    facets: sa(i, x),
    page: b
  };
}
function Rs(e, t, n = {}, s = "") {
  const a = qn(t, n), l = ut(t, e.entity), o = ha(s).filter(([g]) => !sr(g)), i = [], r = (g, _) => i.push([g, $n(_)]), u = l?.key ?? null;
  u !== a.entity && r(Un, u ?? pa), e.view !== a.view && r(Hn, e.view), e.sort !== a.sort && r(jn, e.sort), e.dir !== a.dir && r(Xn, e.dir), e.expr.trim() !== "" && r(Gn, e.expr);
  for (const g of l?.facets ?? []) {
    const _ = e.facets[g.key];
    if (!_) continue;
    const w = lr(_, g);
    w !== null && i.push([`${Qn}${g.key}`, $n(w)]);
  }
  e.page > 1 && r(Yn, String(e.page));
  const d = [
    ...o.map(([g, _]) => [$n(g), _]),
    ...i
  ];
  return d.length ? `?${d.map(([g, _]) => _ === "" ? g : `${g}=${_}`).join("&")}` : "";
}
const fn = "entity", qt = "expr";
function or(e, t) {
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
      const s = t.min !== null && t.max !== null ? `${t.min} ≤ ${n} ≤ ${t.max}` : t.max !== null ? `${n} ≤ ${t.max}` : `${n} ≥ ${t.min}`;
      return [{ id: e.key, label: s, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function Zn(e, t) {
  const n = [];
  t && n.push({
    id: fn,
    label: `entity:${t.key}`,
    facetKey: fn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && ea(a) && n.push(...or(s, a));
  }
  return tt(e.expr).forEach((s, a) => {
    s.forEach((l, o) => {
      n.push({
        id: `${qt}:${a}:${o}`,
        label: Ut(l),
        facetKey: qt,
        group: a,
        index: o,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function ir(e, t, n = null) {
  if (hn(e)) {
    const l = lt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = Zn(e, t).filter((l) => l.facetKey !== qt).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function cr(e) {
  const { adapter: t } = e, n = v(() => Lt(e.schema)), s = v(() => Lt(e.defaults) ?? {}), a = v(() => rr(t.search.value, n.value, s.value)), l = v(() => ut(n.value, a.value.entity)), o = v(() => l.value ?? Qs(n.value, s.value)), i = v(() => Js(l.value, n.value)), r = v(() => lt(l.value, a.value.sort, n.value)), u = (b, x) => {
    const A = Rs(b, n.value, s.value, t.search.value);
    A !== t.search.value && (x === "push" ? t.push(A) : t.replace(A));
  }, d = () => Lt(e.navigationMode) ?? "push", g = () => Lt(e.facetNavigationMode) ?? "replace", _ = (b, x) => {
    const A = b.page ?? (bs(b) ? 1 : a.value.page);
    u({ ...a.value, ...b, page: A }, x);
  }, w = (b, x) => {
    const A = a.value.facets[b];
    if (!A) return;
    const R = { ...a.value.facets, [b]: x(A) };
    _({ facets: R }, g());
  }, k = (b) => {
    const x = b === null ? null : ut(n.value, b);
    return (x?.key ?? null) === a.value.entity ? {} : {
      entity: x?.key ?? null,
      sort: lt(x, a.value.sort, n.value).key,
      facets: St(x)
    };
  }, C = (b, x) => {
    const A = b?.scope?.toLowerCase();
    if (!A || !x.trim()) return x;
    const R = tt(x), N = R.map(
      (V) => V.filter((S) => S.kind !== "field" || S.field !== A)
    );
    return N.every((V, S) => V.length === R[S]?.length) ? x : wt(N);
  }, M = (b) => {
    const x = k(b);
    if (!Object.keys(x).length) return;
    const A = C(ut(n.value, x.entity ?? null), a.value.expr);
    _(A === a.value.expr ? x : { ...x, expr: A }, d());
  };
  return {
    query: a,
    entity: l,
    focus: o,
    sort: r,
    sorts: i,
    summary: v(() => ir(a.value, l.value, n.value)),
    terms: v(() => Zn(a.value, l.value)),
    isPristine: v(() => hn(a.value)),
    isEverything: v(() => a.value.entity === null),
    hasFacets: v(() => ta(a.value.facets)),
    setEntity: M,
    clearEntity: () => M(null),
    setView(b) {
      _({ view: b }, d());
    },
    setSort(b) {
      _({ sort: lt(l.value, b, n.value).key }, d());
    },
    toggleDirection() {
      _({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(b) {
      _({ expr: b }, d());
    },
    narrow(b, x, A) {
      _({ expr: b, ...k(x), ...A ? { view: A } : {} }, d());
    },
    setPage(b, x) {
      _({ page: Math.max(1, Math.floor(b)) }, x ?? d());
    },
    setFacet(b, x) {
      w(b, () => x);
    },
    toggleChip(b, x) {
      w(b, (A) => A.kind !== "chips" ? A : { kind: "chips", selected: A.selected.includes(x) ? A.selected.filter((N) => N !== x) : [...A.selected, x] });
    },
    setRange(b, x, A) {
      w(b, (R) => R.kind === "range" ? { kind: "range", min: x, max: A } : R);
    },
    toggleFlag(b) {
      w(
        b,
        (x) => x.kind === "toggle" ? { kind: "toggle", on: !x.on } : x
      );
    },
    removeTerm(b) {
      if (b.facetKey === fn) {
        M(null);
        return;
      }
      if (b.facetKey === qt) {
        const x = Il(tt(a.value.expr), b.group ?? 0, b.index ?? 0);
        _({ expr: wt(x) }, d());
        return;
      }
      w(b.facetKey, (x) => x.kind === "chips" && b.option ? { kind: "chips", selected: x.selected.filter((A) => A !== b.option) } : x.kind === "range" ? { kind: "range", min: null, max: null } : x.kind === "toggle" ? { kind: "toggle", on: !1 } : x);
    },
    clearFilters() {
      _({ entity: null, expr: "", facets: St(null) }, d());
    },
    reset() {
      u(qn(n.value, s.value), d());
    },
    hrefFor(b) {
      const x = { ...a.value, ...b };
      return x.page = b.page ?? (bs(b) ? 1 : a.value.page), x.facets = sa(ut(n.value, x.entity), x.facets), `${t.path.value}${Rs(x, n.value, s.value, t.search.value)}`;
    }
  };
}
function ur(e) {
  const t = Mt([]), n = U(0), s = U(!1), a = Mt(null);
  let l = 0, o = null;
  const i = v(() => (e.query.value.page - 1) * e.limit.value), r = v(() => wl(n.value, e.limit.value)), u = () => {
    const M = e.query.value, b = e.within?.value.trim();
    return b ? { ...M, expr: Vn(b, M.expr) } : M;
  }, d = (M) => {
    t.value = M.rows, n.value = M.total, a.value = null;
  }, g = (M) => {
    a.value = M, t.value = [], n.value = 0;
  }, _ = (M, b) => {
    let x = !0;
    const A = () => M === l, R = () => {
      x && (x = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return A();
      },
      insert(N, V) {
        if (!A()) return;
        const S = Array.isArray(N) ? N : [N];
        if (!S.length) return;
        R();
        const F = [...t.value];
        F.splice(V ?? F.length, 0, ...S), t.value = b > 0 ? F.slice(0, b) : F, n.value += S.length;
      },
      set(N) {
        A() && (N.rows && (R(), t.value = b > 0 ? N.rows.slice(0, b) : N.rows, n.value = N.rows.length), N.total !== void 0 && (n.value = N.total));
      },
      close() {
        A() && (s.value = !1);
      },
      fail(N) {
        A() && (g(N), s.value = !1);
      }
    };
  }, w = () => {
    const M = o;
    o = null, M?.();
  }, k = () => {
    const M = ++l;
    w();
    const b = {
      query: u(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, x = e.source.value;
    if (x.stream) {
      s.value = !0;
      try {
        o = x.stream(b, _(M, b.limit)) ?? null;
      } catch (R) {
        g(R), s.value = !1;
      }
      return;
    }
    let A;
    try {
      A = x.query(b);
    } catch (R) {
      g(R);
      return;
    }
    if (!(A instanceof Promise)) {
      d(A), s.value = !1;
      return;
    }
    s.value = !0, A.then((R) => {
      M === l && d(R);
    }).catch((R) => {
      M === l && g(R);
    }).finally(() => {
      M === l && (s.value = !1);
    });
  }, C = v(() => {
    const M = u();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(na.map((x) => M[x]))}|${M.page}`;
  });
  return be([e.source, C, e.limit], k, {
    immediate: !0
  }), Ws(() => {
    l++, w();
  }, !0), { rows: t, total: n, offset: i, pageCount: r, pending: s, error: a, refresh: k };
}
function dr(e) {
  const t = Mt(/* @__PURE__ */ new Map()), n = U(!0);
  let s = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++s, o = e.query.value, i = e.schema.value, r = e.entities.value, u = e.within?.value.trim() ?? "";
    n.value = hn(o) && !u;
    const d = u ? Vn(u, o.expr) : o.expr, g = /* @__PURE__ */ new Map();
    for (const _ of r) {
      const w = e.source.value.query({
        query: { ...o, entity: _.key, expr: d, facets: St(_), page: 1 },
        schema: i,
        entity: _,
        limit: 0,
        offset: 0
      });
      w instanceof Promise ? (g.set(_.key, { total: 0, pending: !0 }), w.then((k) => {
        if (l !== s) return;
        const C = new Map(t.value);
        C.set(_.key, { total: k.total, pending: !1 }), t.value = C;
      })) : g.set(_.key, { total: w.total, pending: !1 });
    }
    t.value = g;
  } };
}
const fr = 25, ma = (e, t) => e.toLowerCase() === t.toLowerCase();
function pr(e, t) {
  return e.find((n) => ma(n.id, t));
}
function vr(e) {
  const t = Mt(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), s = (i) => {
    if (i.facetKey !== qt || !i.field || !i.value) return null;
    const r = da(e.schema.value, i.field);
    return r ? { entity: r, id: i.value, key: `${r.key}:${i.value}` } : null;
  }, a = (i) => {
    const { entity: r, id: u } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: r.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ca(r, u) ?? "",
        facets: St(r),
        sort: lt(r, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: r,
      limit: fr,
      offset: 0
    });
  }, l = (i, r) => {
    const u = ln(Oe(i.columns ?? [], "identity"), r);
    return u === Pn || ma(u, r.id) ? "" : u;
  }, o = () => {
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const g = s(d);
      g && !t.value.has(g.key) && !n.has(g.key) && i.set(g.key, g);
    }
    if (!i.size) return;
    const r = [...i.values()].map((d) => ({
      reference: d,
      outcome: a(d)
    })), u = (d) => {
      const g = new Map(t.value);
      d.forEach((_, w) => {
        const { reference: k } = r[w], C = pr(_.rows, k.id);
        g.set(k.key, C ? l(k.entity, C) : "");
      }), t.value = g;
    };
    if (r.every(({ outcome: d }) => !(d instanceof Promise))) {
      u(r.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of r) n.add(d.key);
    Promise.all(r.map(({ outcome: d }) => Promise.resolve(d))).then(u).catch(() => {
    }).finally(() => {
      for (const { reference: d } of r) n.delete(d.key);
    });
  };
  return be([e.source, e.schema, e.terms], () => {
    try {
      o();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const r = s(i);
      return r && t.value.get(r.key) || null;
    }
  };
}
const hr = ["data-dc-expanded"], mr = { class: "dc-header__domain" }, gr = {
  key: 0,
  class: "dc-header__within"
}, _r = ["title"], yr = ["data-dc-more", "title"], wr = {
  key: 0,
  class: "dc-header__pick"
}, kr = { class: "dc-header__pick-box" }, br = ["value"], $r = { value: "" }, xr = ["value"], Cr = { class: "dc-header__pick" }, Mr = { class: "dc-header__pick-box" }, Sr = ["value"], Er = ["value"], Pr = { class: "dc-header__pick" }, Ar = { class: "dc-header__pick-box" }, zr = ["value"], Tr = ["value"], Rr = ["title", "aria-label"], Lr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Fr = ["title", "aria-label", "onClick"], Nr = ["aria-expanded", "aria-controls"], Dr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Ir = { class: "dc-header__sr" }, Or = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Br = ["disabled"], Kr = ["title"], qr = ["value", "onKeydown"], Vr = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Wr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Ur = ["disabled"], Hr = {
  key: 1,
  class: "dc-header__actions"
}, jr = /* @__PURE__ */ fe({
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
    const n = e, s = t, a = Me(), l = v(() => a.schema.value), o = v(
      () => a.hasFacets.value || !!a.query.value.expr.trim() || !!a.within.value
    ), i = v(() => l.value.formatCount ?? _t), r = dr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      entities: a.entities,
      within: a.within
    });
    function u(D) {
      if (n.hideCount) return D.count;
      if (D.key === a.query.value.entity && o.value) return i.value(a.total.value);
      if (r.pristine.value) return D.count;
      const W = r.counts.value.get(D.key);
      return W ? `${W.pending ? "~" : ""}${i.value(W.total)}` : D.count;
    }
    function d(D) {
      return `${D.label} · ${u(D)}`;
    }
    const g = v(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${i.value(a.total.value)}`), _ = v(() => {
      const D = a.within.value.trim();
      return D ? Zn({ ...a.query.value, expr: D, facets: {} }, null) : [];
    }), w = v(
      () => (n.views ?? [...Xs]).map((D) => ({ key: D, label: _l[D] }))
    ), k = v(() => Ys(a.query.value.view, n.views)), C = v(
      () => !(a.within.value && a.query.value.entity === null && k.value === "cards")
    );
    function M(D) {
      a.setView(D.target.value);
    }
    const b = v(
      () => a.sorts.value.map((D) => ({ key: D.key, label: D.label }))
    ), x = v(
      () => b.value.length > 0 && a.query.value.entity !== null && !a.within.value
    );
    function A(D) {
      a.setSort(D.target.value);
    }
    const R = v(() => a.query.value.dir === "desc"), N = v(
      () => a.terms.value.filter((D) => D.facetKey !== fn).map((D, K, W) => {
        const O = W[K - 1];
        return {
          term: D,
          or: O?.group !== void 0 && D.group !== void 0 && D.group !== O.group
        };
      })
    ), V = vr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [..._.value, ...a.terms.value])
    });
    function S(D) {
      return da(l.value, D)?.scopeLabel ?? D;
    }
    function F(D) {
      return D.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function Q(D) {
      const K = V.nameOf(D);
      return K ? `${D.negated ? "-" : ""}${S(D.field)}: ${F(K)}` : D.label;
    }
    function re(D) {
      const K = D.target.value;
      a.setEntity(K || null);
    }
    function he(D) {
      D.target?.closest("button, select, label") || s("toggle");
    }
    const G = U(null), _e = U("");
    function xe() {
      const D = G.value;
      if (!D) {
        _e.value = "";
        return;
      }
      const K = D.scrollLeft > 1, W = D.scrollWidth - D.clientWidth - D.scrollLeft > 1;
      _e.value = K && W ? "both" : K ? "start" : W ? "end" : "";
    }
    let $ = null;
    be(
      G,
      (D) => {
        $?.disconnect(), $ = null, xe(), !(!D || typeof ResizeObserver > "u") && ($ = new ResizeObserver(xe), $.observe(D));
      },
      { flush: "post" }
    ), be(N, xe, { flush: "post" }), et(() => $?.disconnect());
    const I = v(() => a.query.value.page), Y = v(
      () => (a.pageCount.value > 1 || !!n.pagesNote) && !Kn(a.query.value)
    ), ne = v(
      () => `${a.pending.value ? "~" : ""}${_t(a.pageCount.value)}`
    ), me = v(() => {
      let D = `Page ${_t(I.value)} of ${ne.value}`;
      const K = a.rows.value.length;
      if (K) {
        const W = a.offset.value + 1, O = `${a.pending.value ? "~" : ""}${_t(a.total.value)}`;
        D += ` — rows ${_t(W)} to ${_t(W + K - 1)} of ${O}`;
      }
      return n.pagesNote ? `${D}
${n.pagesNote}` : D;
    }), Ce = U(null), Ke = v(() => Ce.value ?? String(I.value)), qe = v(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function Ve(D) {
      D.target.select();
    }
    function We(D) {
      const K = D.target, W = K.value.replace(/[^0-9]/g, "");
      K.value !== W && (K.value = W), Ce.value = W;
    }
    function Re(D) {
      const K = D.target, W = Number(Ce.value);
      Ce.value = null;
      const O = Number.isFinite(W) && W >= 1 ? Math.min(Math.trunc(W), Math.max(1, a.pageCount.value)) : I.value;
      K.value = String(O), O !== I.value && a.setPage(O);
    }
    function Ie(D) {
      const K = D.target;
      Ce.value = null, K.value = String(I.value), K.blur();
    }
    return (D, K) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      y("div", {
        class: "dc-header__trigger",
        onClick: he
      }, [
        y("span", mr, T(l.value.label), 1),
        _.value.length ? (f(), h("span", gr, [
          K[5] || (K[5] = y("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(Z, null, ce(_.value, (W) => (f(), h("span", {
            key: `scope:${W.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: Q(W)
          }, T(Q(W)), 9, _r))), 128))
        ])) : L("", !0),
        y("div", {
          ref_key: "termBar",
          ref: G,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": _e.value,
          title: P(a).summary.value,
          onScroll: xe
        }, [
          C.value ? (f(), h("label", wr, [
            K[7] || (K[7] = y("span", { class: "dc-header__sr" }, "Type", -1)),
            y("span", kr, [
              y("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: P(a).query.value.entity ?? "",
                onFocus: K[0] || (K[0] = //@ts-ignore
                (...W) => P(r).refresh && P(r).refresh(...W)),
                onChange: re
              }, [
                y("option", $r, T(g.value), 1),
                (f(!0), h(Z, null, ce(P(a).entities.value, (W) => (f(), h("option", {
                  key: W.key,
                  value: W.key
                }, T(d(W)), 9, xr))), 128))
              ], 40, br),
              K[6] || (K[6] = y("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ])) : L("", !0),
          y("label", Cr, [
            K[9] || (K[9] = y("span", { class: "dc-header__sr" }, "View", -1)),
            y("span", Mr, [
              y("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: k.value,
                onChange: M
              }, [
                (f(!0), h(Z, null, ce(w.value, (W) => (f(), h("option", {
                  key: W.key,
                  value: W.key
                }, T(W.label), 9, Er))), 128))
              ], 40, Sr),
              K[8] || (K[8] = y("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          x.value ? (f(), h(Z, { key: 1 }, [
            y("label", Pr, [
              K[11] || (K[11] = y("span", { class: "dc-header__sr" }, "Sort", -1)),
              y("span", Ar, [
                y("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: P(a).sort.value.key,
                  onChange: A
                }, [
                  (f(!0), h(Z, null, ce(b.value, (W) => (f(), h("option", {
                    key: W.key,
                    value: W.key
                  }, T(W.label), 9, Tr))), 128))
                ], 40, zr),
                K[10] || (K[10] = y("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            y("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: R.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${R.value ? "descending" : "ascending"}`,
              onClick: K[1] || (K[1] = (W) => P(a).toggleDirection())
            }, T(R.value ? "↓" : "↑"), 9, Rr)
          ], 64)) : L("", !0),
          (f(!0), h(Z, null, ce(N.value, (W) => (f(), h(Z, {
            key: W.term.id
          }, [
            W.or ? (f(), h("span", Lr, "or")) : L("", !0),
            y("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${Q(W.term)}`,
              "aria-label": `Remove ${Q(W.term)}`,
              onClick: (O) => P(a).removeTerm(W.term)
            }, T(Q(W.term)), 9, Fr)
          ], 64))), 128))
        ], 40, yr),
        y("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: K[2] || (K[2] = (W) => s("toggle"))
        }, [
          y("span", Dr, T(e.expanded ? "▲" : "▼"), 1),
          y("span", Ir, T(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Nr)
      ]),
      Y.value ? (f(), h("nav", Or, [
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: I.value <= 1,
          onClick: K[3] || (K[3] = (W) => P(a).setPage(I.value - 1))
        }, [...K[12] || (K[12] = [
          y("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Br),
        y("span", {
          class: "dc-header__page dc-mono",
          title: me.value
        }, [
          y("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Te({ width: qe.value }),
            value: Ke.value,
            onFocus: Ve,
            onInput: We,
            onKeydown: [
              ft(Fe(Re, ["prevent"]), ["enter"]),
              ft(Fe(Ie, ["prevent"]), ["esc"])
            ],
            onBlur: Re
          }, null, 44, qr),
          y("span", Vr, "/ " + T(ne.value), 1)
        ], 8, Kr),
        y("span", Wr, T(me.value), 1),
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: I.value >= P(a).pageCount.value,
          onClick: K[4] || (K[4] = (W) => P(a).setPage(I.value + 1))
        }, [...K[13] || (K[13] = [
          y("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Ur)
      ])) : L("", !0),
      D.$slots.actions ? (f(), h("div", Hr, [
        ke(D.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ], 8, hr));
  }
}), pe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ga = /* @__PURE__ */ pe(jr, [["__scopeId", "data-v-86011b72"]]), Xr = { class: "dc-facet" }, Gr = ["id"], Yr = { class: "dc-facet__body" }, Qr = ["aria-labelledby"], Zr = ["aria-pressed", "data-dc-active", "onClick"], Jr = ["aria-labelledby"], eo = ["aria-label", "placeholder", "onKeydown"], to = ["aria-label", "placeholder", "onKeydown"], no = ["aria-checked"], so = { class: "dc-switch__text" }, ao = ["data-dc-active"], lo = /* @__PURE__ */ fe({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = v(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function l(g) {
      if (n.value.kind !== "chips") return;
      const _ = a.value.has(g) ? n.value.selected.filter((w) => w !== g) : [...n.value.selected, g];
      s("update", { kind: "chips", selected: _ });
    }
    const o = U(""), i = U("");
    be(
      () => n.value,
      (g) => {
        g.kind === "range" && (o.value = g.min === null ? "" : g.min, i.value = g.max === null ? "" : g.max);
      },
      { immediate: !0, deep: !0 }
    );
    function r(g) {
      if (typeof g == "number") return Number.isFinite(g) ? g : null;
      const _ = g.trim();
      if (!_) return null;
      const w = Number(_);
      return Number.isFinite(w) ? w : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const g = r(o.value), _ = r(i.value);
      g === n.value.min && _ === n.value.max || s("update", { kind: "range", min: g, max: _ });
    }
    function d() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (g, _) => (f(), h("div", Xr, [
      y("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, T(e.facet.label), 9, Gr),
      y("div", Yr, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), h(Z, null, ce(e.facet.options, (w) => (f(), h("button", {
            key: w,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(w),
            "data-dc-active": a.value.has(w) ? "true" : "false",
            onClick: (k) => l(w)
          }, T(w), 9, Zr))), 128))
        ], 8, Qr)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          Mn(y("input", {
            "onUpdate:modelValue": _[0] || (_[0] = (w) => o.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: ft(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, eo), [
            [Sn, o.value]
          ]),
          _[2] || (_[2] = y("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          Mn(y("input", {
            "onUpdate:modelValue": _[1] || (_[1] = (w) => i.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: ft(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, to), [
            [Sn, i.value]
          ])
        ], 8, Jr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          y("span", so, T(e.facet.text), 1),
          y("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [..._[3] || (_[3] = [
            y("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, ao)
        ], 8, no)) : L("", !0)
      ])
    ]));
  }
}), _a = /* @__PURE__ */ pe(lo, [["__scopeId", "data-v-36d1334b"]]), ro = ["id"], oo = { class: "dc-panel__section dc-panel__rows" }, io = { class: "dc-panel__row" }, co = ["for"], uo = ["title", "aria-label", "onClick"], fo = ["id", "placeholder", "onKeydown"], po = { class: "dc-panel__actions" }, vo = ["disabled"], ho = {
  key: 0,
  class: "dc-panel__section"
}, mo = /* @__PURE__ */ fe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Vt(), a = Me(), l = v(() => Ol(a.query.value.expr)), o = v(() => l.value.parts.map(Ut)), i = U(l.value.text), r = U(null);
    be(
      () => l.value.text,
      (C) => {
        i.value = C;
      }
    );
    const u = v(() => i.value !== l.value.text);
    function d() {
      u.value && a.setExpression(Es(l.value.parts, i.value)), n("close");
    }
    function g(C) {
      const { parts: M, text: b } = l.value;
      a.setExpression(Es(M.filter((x, A) => A !== C), b));
    }
    function _(C) {
      const { parts: M } = l.value;
      i.value || !M.length || (C.preventDefault(), g(M.length - 1));
    }
    function w() {
      i.value = "", a.clearFilters();
    }
    function k(C, M) {
      a.setFacet(C, M);
    }
    return Kt(() => r.value?.focus()), (C, M) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: M[2] || (M[2] = ft(Fe((b) => n("close"), ["stop"]), ["esc"]))
    }, [
      y("section", oo, [
        y("div", io, [
          y("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, co),
          y("div", {
            class: "dc-field",
            onMousedown: M[1] || (M[1] = Fe((b) => r.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(Z, null, ce(o.value, (b, x) => (f(), h("button", {
              key: `${x}:${b}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${b}`,
              "aria-label": `Remove ${b}`,
              onClick: (A) => g(x)
            }, T(b), 9, uo))), 128)),
            Mn(y("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: r,
              "onUpdate:modelValue": M[0] || (M[0] = (b) => i.value = b),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: o.value.length ? "" : P(a).schema.value.placeholder,
              onKeydown: [
                ft(Fe(d, ["prevent"]), ["enter"]),
                ft(_, ["backspace"])
              ]
            }, null, 40, fo), [
              [Sn, i.value]
            ])
          ], 32)
        ]),
        P(a).entity.value ? (f(!0), h(Z, { key: 0 }, ce(P(a).entity.value.facets, (b) => (f(), le(_a, {
          key: b.key,
          facet: b,
          value: P(a).query.value.facets[b.key],
          onUpdate: (x) => k(b.key, x)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : L("", !0),
        y("div", po, [
          y("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          y("button", {
            type: "button",
            class: "dc-button",
            disabled: P(a).isPristine.value && !u.value,
            onClick: w
          }, " Reset ", 8, vo)
        ])
      ]),
      s["panel-section"] ? (f(), h("section", ho, [
        ke(C.$slots, "panel-section", {}, void 0, !0)
      ])) : L("", !0)
    ], 40, ro));
  }
}), ya = /* @__PURE__ */ pe(mo, [["__scopeId", "data-v-2642c02d"]]), go = {
  key: 0,
  class: "dc-actions"
}, _o = {
  key: 0,
  class: "dc-actions__select"
}, yo = { class: "dc-actions__all" }, wo = ["checked", "indeterminate"], ko = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, bo = { class: "dc-actions__ops" }, $o = ["disabled"], xo = ["disabled"], Co = /* @__PURE__ */ fe({
  __name: "RecordActions",
  setup(e) {
    const t = Me(), n = v(() => t.entity.value), s = v(() => !Kn(t.query.value)), a = v(() => s.value && t.selectable.value), l = v(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), o = v(() => t.selection.value.ids.length), i = v(() => t.rows.value.filter((_) => t.isSelected(_)).length), r = v(
      () => t.rows.value.length > 0 && i.value === t.rows.value.length
    ), u = v(() => i.value > 0 && !r.value), d = v(() => o.value ? `${o.value} selected` : "Select all");
    function g(_) {
      return o.value ? `${_} ${o.value}` : _;
    }
    return (_, w) => l.value ? (f(), h("div", go, [
      a.value ? (f(), h("div", _o, [
        y("label", yo, [
          y("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: r.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: w[0] || (w[0] = (k) => P(t).selectPage(!r.value))
          }, null, 40, wo),
          y("span", ko, T(d.value), 1)
        ]),
        o.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: w[1] || (w[1] = (k) => P(t).clearSelection())
        }, " Clear ")) : L("", !0)
      ])) : L("", !0),
      y("div", bo, [
        n.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: w[2] || (w[2] = (k) => P(t).create(n.value))
        }, [
          w[5] || (w[5] = y("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          je(" " + T(n.value.create), 1)
        ])) : L("", !0),
        n.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !o.value,
          onClick: w[3] || (w[3] = (k) => P(t).duplicate())
        }, T(g(n.value.duplicate)), 9, $o)) : L("", !0),
        n.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !o.value,
          onClick: w[4] || (w[4] = (k) => P(t).delete())
        }, T(g(n.value.delete)), 9, xo)) : L("", !0)
      ])
    ])) : L("", !0);
  }
}), wa = /* @__PURE__ */ pe(Co, [["__scopeId", "data-v-ca4aca14"]]);
function Mo(e, t) {
  if (!e) return null;
  const n = De(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function So(e, t) {
  const n = Oe(t, "state"), s = Oe(t, "tint");
  return {
    identity: ln(Oe(t, "identity"), e),
    reference: ln(Oe(t, "reference"), e),
    metrics: aa(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Wt(a, e)
    })),
    state: n ? De(n, e) ?? null : null,
    updated: ln(Oe(t, "updated"), e),
    image: Mo(Oe(t, "image"), e),
    tint: s ? De(s, e) ?? null : null
  };
}
function ka(e, t, n, s, a = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Ml(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: $l(t),
    parts: So(e, l),
    pinned: s,
    selected: a
  };
}
function Pt() {
  const e = Me(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, s) => ka(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Eo = ["data-dc-status"], Po = /* @__PURE__ */ fe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, T(e.status), 9, Eo));
  }
}), Ht = /* @__PURE__ */ pe(Po, [["__scopeId", "data-v-23e59fbf"]]), Ao = ["title"], zo = { key: 1 }, To = /* @__PURE__ */ fe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Me(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((r) => r.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), l = v(() => Wt(t.column, t.entry.row));
    function o(i) {
      i.stopPropagation(), s.value && n.drill(t.entry.row, s.value, Ge(i));
    }
    return (i, r) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: o
    }, [
      ke(i.$slots, "default", {}, () => [
        je(T(l.value), 1)
      ], !0)
    ], 8, Ao)) : (f(), h("span", zo, [
      ke(i.$slots, "default", {}, () => [
        je(T(l.value), 1)
      ], !0)
    ]));
  }
}), jt = /* @__PURE__ */ pe(To, [["__scopeId", "data-v-f2501b17"]]), Ro = ["data-dc-active", "aria-pressed", "aria-label"], Lo = /* @__PURE__ */ fe({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Me();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, l) => (f(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, T(e.pinned ? "★" : "☆"), 9, Ro));
  }
}), Jn = /* @__PURE__ */ pe(Lo, [["__scopeId", "data-v-ef63d763"]]), Fo = ["src"], No = /* @__PURE__ */ fe({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = U(!1);
    return be(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (s, a) => e.src.trim() && !n.value ? (f(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: a[0] || (a[0] = (l) => n.value = !0)
    }, null, 40, Fo)) : L("", !0);
  }
}), es = /* @__PURE__ */ pe(No, [["__scopeId", "data-v-afaab300"]]), Do = ["title", "aria-label"], Io = /* @__PURE__ */ fe({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Me(), s = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    );
    function a(l) {
      l.stopPropagation(), n.drill(t.entry.row, null, Ge(l));
    }
    return (l, o) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, Do)) : L("", !0);
  }
}), Xt = /* @__PURE__ */ pe(Io, [["__scopeId", "data-v-feb1c62d"]]), Oo = ["checked", "aria-label"], At = /* @__PURE__ */ fe({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Me();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, l) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: s
    }, null, 8, Oo));
  }
}), Bo = { class: "dc-cards" }, Ko = { class: "dc-card__top dc-mono" }, qo = { class: "dc-card__lead" }, Vo = {
  key: 1,
  class: "dc-card__entity"
}, Wo = { class: "dc-card__top-right" }, Uo = ["onClick"], Ho = { class: "dc-card__names" }, jo = { class: "dc-card__primary" }, Xo = { class: "dc-card__secondary dc-mono" }, Go = { class: "dc-card__metrics dc-mono" }, Yo = {
  key: 0,
  class: "dc-card__date"
}, Qo = /* @__PURE__ */ fe({
  __name: "CardsView",
  setup(e) {
    const t = Me(), n = Pt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), h("div", Bo, [
      (f(!0), h(Z, null, ce(P(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-card"
      }, [
        y("div", Ko, [
          y("span", qo, [
            P(t).selectable.value ? (f(), le(At, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            je(" " + T(o.ordinal) + " ", 1),
            s.value ? (f(), h("span", Vo, T(o.entityLabel), 1)) : L("", !0)
          ]),
          y("span", Wo, [
            o.parts.state ? (f(), le(Ht, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : L("", !0),
            ye(Xt, { entry: o }, null, 8, ["entry"]),
            P(t).pinnable.value ? (f(), le(Jn, {
              key: 1,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        y("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => P(t).activate(o.row, P(Ge)(i))
        }, [
          o.parts.image ? (f(), le(es, {
            key: 0,
            class: "dc-card__image",
            src: o.parts.image
          }, null, 8, ["src"])) : L("", !0),
          y("span", Ho, [
            y("span", jo, T(o.parts.identity), 1),
            y("span", Xo, T(o.parts.reference), 1)
          ])
        ], 8, Uo),
        y("div", Go, [
          (f(!0), h(Z, null, ce(o.parts.metrics.slice(0, 2), (i) => (f(), le(jt, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, {
            default: He(() => [
              je(T(i.label) + " " + T(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (f(), h("span", Yo, T(o.parts.updated), 1)) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ba = /* @__PURE__ */ pe(Qo, [["__scopeId", "data-v-434bd32f"]]), Zo = { class: "dc-grid" }, Jo = ["onClick"], ei = { class: "dc-tile__scrim" }, ti = { class: "dc-tile__top dc-mono" }, ni = { class: "dc-tile__chip" }, si = { class: "dc-tile__caption" }, ai = { class: "dc-tile__secondary dc-truncate" }, li = { class: "dc-tile__primary" }, ri = /* @__PURE__ */ fe({
  __name: "GridView",
  setup(e) {
    const t = Me(), n = Pt();
    return (s, a) => (f(), h("div", Zo, [
      (f(!0), h(Z, null, ce(P(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        y("button", {
          type: "button",
          class: "dc-tile",
          style: Te({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (o) => P(t).activate(l.row, P(Ge)(o))
        }, [
          l.parts.image ? (f(), le(es, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : L("", !0),
          y("span", ei, [
            y("span", ti, [
              y("span", ni, T(l.ordinal), 1)
            ]),
            y("span", si, [
              y("span", ai, T(l.parts.reference), 1),
              y("span", li, T(l.parts.identity), 1)
            ])
          ])
        ], 12, Jo),
        P(t).selectable.value ? (f(), le(At, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), $a = /* @__PURE__ */ pe(ri, [["__scopeId", "data-v-7df25d40"]]), oi = { class: "dc-links" }, ii = ["onClick"], ci = { class: "dc-link__primary dc-truncate" }, ui = { class: "dc-link__secondary dc-mono dc-truncate" }, di = /* @__PURE__ */ fe({
  __name: "LinksView",
  setup(e) {
    const t = Me(), n = Pt();
    return (s, a) => (f(), h("div", oi, [
      (f(!0), h(Z, null, ce(P(n), (l) => (f(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (f(), le(At, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        y("button", {
          type: "button",
          class: "dc-link",
          onClick: (o) => P(t).activate(l.row, P(Ge)(o))
        }, [
          y("span", ci, T(l.parts.identity), 1),
          y("span", ui, T(l.parts.reference), 1)
        ], 8, ii)
      ]))), 128))
    ]));
  }
}), xa = /* @__PURE__ */ pe(di, [["__scopeId", "data-v-08d0266c"]]), fi = {
  class: "dc-list",
  role: "list"
}, pi = ["onClick"], vi = { class: "dc-list__ordinal dc-mono" }, hi = { class: "dc-list__identity" }, mi = { class: "dc-list__primary dc-truncate" }, gi = { class: "dc-list__secondary dc-mono dc-truncate" }, _i = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, yi = { class: "dc-list__metrics dc-mono" }, wi = { class: "dc-list__trailing" }, ki = /* @__PURE__ */ fe({
  __name: "ListView",
  setup(e) {
    const t = Me(), n = Pt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), h("div", fi, [
      (f(!0), h(Z, null, ce(P(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (f(), le(At, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        y("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => P(t).activate(o.row, P(Ge)(i))
        }, [
          y("span", vi, T(o.ordinal), 1),
          y("span", hi, [
            y("span", mi, T(o.parts.identity), 1),
            y("span", gi, T(o.parts.reference), 1)
          ])
        ], 8, pi),
        s.value ? (f(), h("span", _i, T(o.entityLabel), 1)) : L("", !0),
        y("span", yi, [
          (f(!0), h(Z, null, ce(o.parts.metrics.slice(0, 2), (i) => (f(), le(jt, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        y("span", wi, [
          o.parts.state ? (f(), le(Ht, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : L("", !0),
          ye(Xt, { entry: o }, null, 8, ["entry"]),
          P(t).pinnable.value ? (f(), le(Jn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Tn = /* @__PURE__ */ pe(ki, [["__scopeId", "data-v-8e3fd7b4"]]), bi = { class: "dc-preview" }, $i = { class: "dc-preview__pager dc-mono" }, xi = ["disabled"], Ci = { "aria-live": "polite" }, Mi = ["disabled"], Si = {
  key: 0,
  class: "dc-preview__card"
}, Ei = { class: "dc-preview__body" }, Pi = { class: "dc-preview__top" }, Ai = { class: "dc-preview__badges" }, zi = { class: "dc-preview__entity dc-mono" }, Ti = { class: "dc-preview__marks" }, Ri = { class: "dc-preview__primary" }, Li = { class: "dc-preview__secondary dc-mono" }, Fi = { class: "dc-preview__fields" }, Ni = { class: "dc-preview__key" }, Di = { class: "dc-preview__value dc-mono" }, Ii = /* @__PURE__ */ fe({
  __name: "PreviewView",
  setup(e) {
    const t = Me(), n = Pt(), s = U(0);
    be(n, (r) => {
      s.value > r.length - 1 && (s.value = Math.max(0, r.length - 1));
    });
    const a = v(() => n.value[s.value]), l = v(() => {
      const r = a.value;
      if (!r) return [];
      const u = Oe(r.columns, "reference"), d = Oe(r.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: r.parts.reference, column: null }] : [],
        ...r.parts.metrics.map((g) => ({
          key: g.label,
          value: g.text,
          column: g.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: r.parts.updated, column: null }] : []
      ];
    }), o = v(() => {
      if (!n.value.length) return "0 / 0";
      const r = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${r}`;
    }), i = (r) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + r)));
    };
    return (r, u) => (f(), h("div", bi, [
      y("div", $i, [
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => i(-1))
        }, " ‹ ", 8, xi),
        y("span", Ci, T(o.value), 1),
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= P(n).length - 1,
          onClick: u[1] || (u[1] = (d) => i(1))
        }, " › ", 8, Mi)
      ]),
      a.value ? (f(), h("div", Si, [
        y("div", {
          class: "dc-preview__media",
          style: Te({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        y("div", Ei, [
          y("div", Pi, [
            y("span", Ai, [
              P(t).selectable.value ? (f(), le(At, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              a.value.parts.state ? (f(), le(Ht, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              y("span", zi, T(a.value.entityLabel), 1)
            ]),
            y("span", Ti, [
              ye(Xt, { entry: a.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (f(), le(Jn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          y("div", null, [
            y("div", Ri, T(a.value.parts.identity), 1),
            y("div", Li, T(a.value.parts.reference), 1)
          ]),
          y("dl", Fi, [
            (f(!0), h(Z, null, ce(l.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              y("dt", Ni, T(d.key), 1),
              y("dd", Di, [
                d.column && a.value ? (f(), le(jt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(Z, { key: 1 }, [
                  je(T(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          y("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => P(t).activate(a.value.row, P(Ge)(d)))
          }, " Open record → ")
        ])
      ])) : L("", !0)
    ]));
  }
}), Ca = /* @__PURE__ */ pe(Ii, [["__scopeId", "data-v-b14eee6d"]]);
function Oi() {
  const e = Me();
  return v(() => xl(e.schema.value, e.entity.value));
}
const Bi = ["title"], Ki = {
  key: 5,
  class: "dc-cell__text"
}, qi = /* @__PURE__ */ fe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Me(), s = v(() => t.column.kind ?? "text"), a = v(() => De(t.column, t.entry.row)), l = v(
      () => s.value === "ordinal" ? t.entry.ordinal : Wt(t.column, t.entry.row)
    ), o = v(() => a.value), i = v(() => t.column.activate === !0 || !!t.column.click), r = v(() => An(t.column)), u = v(() => la(t.column, t.entry.row));
    function d(g) {
      if (!i.value) return;
      g.stopPropagation();
      const _ = Ge(g);
      t.column.click?.(t.entry.row, _), t.column.activate && n.activate(t.entry.row, _);
    }
    return (g, _) => s.value === "component" && e.column.component ? (f(), le(On(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), le(Ht, {
      key: 1,
      status: o.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), le(es, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Te({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), le(jt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: un(["dc-table__open", { "dc-truncate": r.value }]),
      title: u.value,
      onClick: d
    }, T(l.value), 11, Bi)) : (f(), h("span", Ki, T(l.value), 1));
  }
}), Ls = /* @__PURE__ */ pe(qi, [["__scopeId", "data-v-70ba8aa2"]]), Vi = {
  key: 0,
  class: "dc-table__none"
}, Wi = { class: "dc-table__detail" }, Ui = ["data-dc-wrap"], Hi = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, ji = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Xi = ["onClick"], Gi = {
  key: 2,
  class: "dc-table__head"
}, Yi = ["onClick"], Qi = {
  key: 0,
  class: "dc-table__pick"
}, Zi = ["data-dc-align", "data-dc-hide", "title"], Ji = {
  key: 0,
  class: "dc-table__name"
}, ec = /* @__PURE__ */ fe({
  __name: "TableView",
  setup(e) {
    const t = Me(), n = Pt(), s = Oi(), a = v(
      () => s.value.some((_) => _.kind === "image" || _.height !== void 0)
    );
    function l(_) {
      _ && (t.query.value.sort === _ ? t.toggleDirection() : t.setSort(_));
    }
    const o = v(() => t.entity.value?.label ?? "The result set"), i = v(() => new Set(t.sorts.value.map((_) => _.key))), r = (_) => _.sort !== void 0 && i.value.has(_.sort), u = (_) => {
      if (r(_))
        return t.query.value.sort !== _.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function d(_) {
      return [
        Cs(_),
        _.muted ? "dc-table__muted" : "",
        _.mono ? "dc-mono" : "",
        An(_) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function g(_, w) {
      if (!(!An(_) || _.activate || _.click))
        return la(_, w.row);
    }
    return (_, w) => P(s).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      y("thead", null, [
        y("tr", null, [
          P(t).selectable.value ? (f(), h("th", Hi, [...w[3] || (w[3] = [
            y("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : L("", !0),
          (f(!0), h(Z, null, ce(P(s), (k, C) => (f(), h("th", {
            key: P($s)(k, C),
            scope: "col",
            class: un(P(Cs)(k)),
            style: Te({ width: k.width }),
            "data-dc-align": P(xs)(k),
            "data-dc-hide": k.hideBelow,
            "aria-sort": u(k),
            title: k.hint
          }, [
            r(k) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (M) => l(k.sort)
            }, T(k.label), 9, Xi)) : (f(), h(Z, { key: 1 }, [
              je(T(k.label), 1)
            ], 64)),
            k.header ? (f(), h("span", Gi, [
              (f(), le(On(k.header), {
                column: k,
                entity: P(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, ji))), 128))
        ])
      ]),
      y("tbody", null, [
        (f(!0), h(Z, null, ce(P(n), (k) => (f(), h("tr", {
          key: k.key,
          class: "dc-table__row",
          onClick: (C) => P(t).activate(k.row, P(Ge)(C))
        }, [
          P(t).selectable.value ? (f(), h("td", Qi, [
            ye(At, {
              row: k.row,
              selected: k.selected,
              name: k.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          (f(!0), h(Z, null, ce(P(s), (C, M) => (f(), h("td", {
            key: P($s)(C, M),
            class: un(d(C)),
            "data-dc-align": P(xs)(C),
            "data-dc-hide": C.hideBelow,
            title: g(C, k)
          }, [
            C.scope ? (f(), h("span", Ji, [
              ye(Ls, {
                column: C,
                entry: k
              }, null, 8, ["column", "entry"]),
              ye(Xt, { entry: k }, null, 8, ["entry"])
            ])) : (f(), le(Ls, {
              key: 1,
              column: C,
              entry: k
            }, null, 8, ["column", "entry"]))
          ], 10, Zi))), 128))
        ], 8, Yi))), 128))
      ])
    ], 8, Ui)) : (f(), h("p", Vi, [
      w[2] || (w[2] = y("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      y("span", Wi, [
        je(T(o.value) + " has no ", 1),
        w[0] || (w[0] = y("code", null, "columns", -1)),
        w[1] || (w[1] = je(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ma = /* @__PURE__ */ pe(ec, [["__scopeId", "data-v-25251288"]]);
function tc(e) {
  const t = Mt([]), n = U(!1), s = Mt(null);
  let a = 0;
  const l = (r, u, d, g, _) => ({
    entity: r,
    rows: u.rows.map(
      (w, k) => ka(w, k, r, e.isPinned(w.id))
    ),
    total: u.total,
    count: d ? r.count : String(u.total),
    pinned: nc(g, u, _)
  }), o = () => {
    const r = ++a, u = e.query.value, d = e.schema.value, g = e.entities.value, _ = e.limit.value, w = e.within?.value.trim() ?? "", k = hn(u) && !w, C = w ? Vn(w, u.expr) : u.expr, M = g.map((b) => ({
      entity: b,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: b.key, expr: C, facets: St(b), page: 1 },
        schema: d,
        entity: b,
        limit: _,
        offset: 0
      })
    }));
    if (M.every(({ outcome: b }) => !(b instanceof Promise))) {
      t.value = M.map(
        ({ entity: b, outcome: x }) => l(b, x, k, d, C)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(M.map(({ outcome: b }) => Promise.resolve(b))).then((b) => {
      r === a && (t.value = b.map(
        (x, A) => l(M[A].entity, x, k, d, C)
      ), s.value = null);
    }).catch((b) => {
      r === a && (s.value = b, t.value = []);
    }).finally(() => {
      r === a && (n.value = !1);
    });
  }, i = () => {
    try {
      o();
    } catch (r) {
      s.value = r, t.value = [], n.value = !1;
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
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: i };
}
function nc(e, t, n) {
  const s = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !s)
    return !1;
  const a = n.trim();
  if (!a)
    return !1;
  const l = Wn(e, s);
  return !!l && ua(a, l) === a;
}
const sc = ["data-dc-pending"], ac = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, lc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, rc = {
  key: 2,
  class: "dc-types__state"
}, oc = ["data-dc-empty"], ic = ["onClick"], cc = { class: "dc-type__name" }, uc = { class: "dc-type__count dc-mono" }, dc = { class: "dc-type__sr" }, fc = {
  key: 0,
  class: "dc-type__empty"
}, pc = ["onClick"], vc = { class: "dc-type__identity" }, hc = { class: "dc-type__primary dc-truncate" }, mc = { class: "dc-type__secondary dc-mono dc-truncate" }, gc = { class: "dc-type__trailing dc-mono" }, _c = { class: "dc-type__metric-value" }, yc = { class: "dc-type__metric-label" }, wc = {
  key: 0,
  class: "dc-type__date"
}, kc = ["onClick"], bc = /* @__PURE__ */ fe({
  __name: "TypeCardsView",
  setup(e) {
    const t = Me(), { previews: n, pending: s, error: a } = tc({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (i) => t.isPinnedId(i)
    }), l = v(() => !t.isPristine.value || !!t.within.value), o = v(
      () => n.value.filter(
        (i) => !i.pinned && (i.rows.length > 0 || i.entity.create)
      )
    );
    return (i, r) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": P(s) ? "true" : "false"
    }, [
      ke(i.$slots, "before", {}, void 0, !0),
      P(a) ? (f(), h("p", ac, " Could not load results: " + T(P(a) instanceof Error ? P(a).message : "the data source failed."), 1)) : !o.value.length && P(s) ? (f(), h("p", lc, " Running query… ")) : o.value.length ? L("", !0) : (f(), h("p", rc, T(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(Z, null, ce(o.value, (u) => (f(), h("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        y("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => P(t).setEntity(u.entity.key)
        }, [
          y("span", cc, T(u.entity.label), 1),
          y("span", uc, T(u.count), 1),
          r[0] || (r[0] = y("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          y("span", dc, "Show only " + T(u.entity.label.toLowerCase()), 1)
        ], 8, ic),
        u.rows.length ? L("", !0) : (f(), h("p", fc, T(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(Z, null, ce(u.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          y("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (g) => P(t).activate(d.row, P(Ge)(g))
          }, [
            y("span", vc, [
              y("span", hc, T(d.parts.identity), 1),
              y("span", mc, T(d.parts.reference), 1)
            ])
          ], 8, pc),
          y("span", gc, [
            (f(!0), h(Z, null, ce(d.parts.metrics.slice(0, 1), (g) => (f(), le(jt, {
              key: g.column.key ?? g.label,
              class: "dc-type__metric",
              entry: d,
              column: g.column
            }, {
              default: He(() => [
                y("span", _c, T(g.text), 1),
                y("span", yc, T(g.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", wc, T(d.parts.updated), 1)) : L("", !0),
            ye(Xt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => P(t).create(u.entity)
        }, [
          r[1] || (r[1] = y("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          je(" " + T(u.entity.create), 1)
        ], 8, kc)) : L("", !0)
      ], 8, oc))), 128)),
      ke(i.$slots, "after", {}, void 0, !0)
    ], 8, sc));
  }
}), Sa = /* @__PURE__ */ pe(bc, [["__scopeId", "data-v-eb7e0cec"]]), $c = ["data-dc-pending"], xc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Cc = { class: "dc-results__detail" }, Mc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Sc = {
  key: 3,
  class: "dc-results__state"
}, Ec = { class: "dc-results__detail" }, Pc = /* @__PURE__ */ fe({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = Me(), s = Vt(), a = {
      list: Tn,
      cards: ba,
      grid: $a,
      table: Ma,
      links: xa,
      preview: Ca
    }, l = v(() => Kn(n.query.value)), o = v(() => Ys(n.query.value.view, t.views)), i = v(() => a[o.value] ?? Tn), r = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = U(null);
    return be(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (g, _) => (f(), h("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), le(Sa, { key: 0 }, sn({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: He(() => [
            ke(g.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: He(() => [
            ke(g.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), h("p", xc, [
        _[1] || (_[1] = y("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        y("span", Cc, T(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !r.value && P(n).pending.value ? (f(), h("p", Mc, [..._[2] || (_[2] = [
        y("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (f(), le(On(i.value), { key: 4 })) : (f(), h("div", Sc, [
        _[3] || (_[3] = y("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        y("span", Ec, T(P(n).summary.value), 1),
        P(n).isPristine.value ? L("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: _[0] || (_[0] = (w) => P(n).clearFilters())
        }, T(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, $c));
  }
}), Ea = /* @__PURE__ */ pe(Pc, [["__scopeId", "data-v-41f54508"]]), Ac = ["data-dc-theme"], zc = ["data-dc-width", "data-dc-align"], Tc = { class: "dc-shell__panel" }, Rc = /* @__PURE__ */ fe({
  __name: "DataShell",
  props: /* @__PURE__ */ dn({
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
  emits: /* @__PURE__ */ dn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = Nt(e, "open"), o = Nt(e, "pinned"), i = Nt(e, "selected"), r = Vt(), u = Ct(js, null), d = s.route || u ? null : ml(), g = s.route ?? u ?? d;
    et(() => d?.dispose?.());
    const _ = v(() => Yl({ seed: s.schema.key })), w = v(() => s.source ?? _.value), k = cr({
      schema: () => s.schema,
      adapter: g,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), C = v(() => s.within?.trim() ?? ""), M = ur({
      source: w,
      query: k.query,
      schema: v(() => s.schema),
      entity: k.entity,
      limit: v(() => s.limit),
      within: C
    });
    be(k.query, ($) => a("query-change", $)), be(
      [M.pageCount, M.pending, k.query],
      () => {
        if (M.pending.value) return;
        const $ = M.pageCount.value;
        k.query.value.page > $ && k.setPage($, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const b = Us() ?? "dc-query-panel", x = U(null);
    function A() {
      l.value && (l.value = !1, Kt(() => {
        x.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const R = v(() => new Set(o.value));
    function N($) {
      const I = new Set(R.value);
      I.has($.id) ? I.delete($.id) : I.add($.id), o.value = [...I], a("toggle-pin", $);
    }
    const V = v(() => {
      if (s.selectable === !0) return !0;
      const $ = k.entity.value;
      return !!($?.duplicate || $?.delete);
    }), S = v(() => new Set(i.value));
    function F($) {
      const I = new Set(S.value);
      I.has($.id) ? I.delete($.id) : I.add($.id), i.value = [...I];
    }
    function Q($) {
      const I = new Set(S.value);
      for (const Y of M.rows.value)
        $ ? I.add(Y.id) : I.delete(Y.id);
      i.value = [...I];
    }
    function re() {
      i.value.length && (i.value = []);
    }
    const he = v(() => ({
      ids: [...i.value],
      rows: M.rows.value.filter(($) => S.value.has($.id)),
      entity: k.entity.value
    }));
    be(() => k.query.value.entity, re);
    function G($, I, Y = {}) {
      const ne = Jl(s.schema, k.query.value, $, Y);
      Y.exclude ? k.narrow(ne, I?.key ?? k.query.value.entity) : k.narrow(ne, I?.key ?? null, I ? void 0 : "cards"), a("drill", $, I, Y);
    }
    const _e = er({
      ...k,
      schema: v(() => s.schema),
      entities: v(() => s.schema.entities),
      rows: M.rows,
      total: M.total,
      limit: v(() => s.limit),
      offset: M.offset,
      pageCount: M.pageCount,
      pending: M.pending,
      error: M.error,
      source: w,
      previewsPerType: v(() => s.previewsPerType),
      within: C,
      pinnable: v(() => s.pinnable === !0),
      isPinned: ($) => R.value.has($.id),
      isPinnedId: ($) => R.value.has($),
      togglePin: N,
      selectable: V,
      selection: he,
      isSelected: ($) => S.value.has($.id),
      toggleSelect: F,
      selectPage: Q,
      clearSelection: re,
      narrowsOnPress: v(() => s.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: ($, I = {}) => {
        if (s.rowPress === "narrow" && Wn(s.schema, $)) {
          G($, null, I);
          return;
        }
        a("activate", $);
      },
      create: ($) => a("create", $),
      duplicate: () => a("duplicate", he.value),
      delete: () => a("delete", he.value),
      drill: G
    }), xe = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: k.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: A
    }), ($, I) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Te(xe.value)
    }, [
      y("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ye(ga, {
          ref_key: "headerRef",
          ref: x,
          expanded: l.value,
          "panel-id": P(b),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: I[0] || (I[0] = (Y) => l.value = !l.value)
        }, sn({ _: 2 }, [
          r.actions ? {
            name: "actions",
            fn: He(() => [
              ke($.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), h(Z, { key: 0 }, [
          y("div", {
            class: "dc-shell__scrim",
            onClick: A
          }),
          y("div", Tc, [
            ye(ya, {
              "panel-id": P(b),
              onClose: A
            }, sn({ _: 2 }, [
              r["panel-section"] ? {
                name: "panel-section",
                fn: He(() => [
                  ke($.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : L("", !0)
      ], 8, zc),
      ye(wa),
      ke($.$slots, "results", {
        rows: P(_e).rows.value,
        total: P(_e).total.value,
        offset: P(_e).offset.value,
        pageCount: P(_e).pageCount.value,
        query: P(_e).query.value,
        pending: P(_e).pending.value
      }, () => [
        ye(Ea, { views: e.views }, sn({ _: 2 }, [
          r["cards-before"] ? {
            name: "cards-before",
            fn: He(() => [
              ke($.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          r["cards-after"] ? {
            name: "cards-after",
            fn: He(() => [
              ke($.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Ac));
  }
}), Lc = /* @__PURE__ */ pe(Rc, [["__scopeId", "data-v-7b71d70f"]]), Fc = ["data-dc-muted"], Nc = {
  key: 0,
  class: "dc-shell-card__head"
}, Dc = { class: "dc-shell-card__title" }, Ic = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Oc = {
  key: 0,
  class: "dc-shell-card__aside"
}, Bc = ["data-dc-flush"], Kc = {
  key: 2,
  class: "dc-shell-card__foot"
}, qc = /* @__PURE__ */ fe({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), s = Vt();
    function a(d) {
      return l(d?.() ?? []);
    }
    function l(d) {
      return d.some((g) => g.type === dl ? !1 : g.type === fl ? String(g.children ?? "").trim().length > 0 : g.type === Z ? l(g.children ?? []) : !0);
    }
    const o = v(() => !!t.title || i.value || a(s.head)), i = v(() => a(s.aside)), r = v(() => a(s.default)), u = v(() => a(s.foot));
    return (d, g) => (f(), h("section", {
      class: "dc-shell-card",
      style: Te(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      o.value ? (f(), h("header", Nc, [
        ke(d.$slots, "head", {}, () => [
          y("h2", Dc, T(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Ic, T(e.count), 1)) : L("", !0)
        ], !0),
        i.value ? (f(), h("span", Oc, [
          ke(d.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ])) : L("", !0),
      r.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        ke(d.$slots, "default", {}, void 0, !0)
      ], 8, Bc)) : L("", !0),
      u.value ? (f(), h("footer", Kc, [
        ke(d.$slots, "foot", {}, void 0, !0)
      ])) : L("", !0)
    ], 12, Fc));
  }
}), Ld = /* @__PURE__ */ pe(qc, [["__scopeId", "data-v-75f2ef0b"]]), Vc = ["aria-label"], Wc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Uc = /* @__PURE__ */ fe({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = U([]);
    function l(o, i) {
      const r = n.options.length;
      let u = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? u = (i + 1) % r : o.key === "ArrowLeft" || o.key === "ArrowUp" ? u = (i - 1 + r) % r : o.key === "Home" ? u = 0 : o.key === "End" && (u = r - 1), u === null) return;
      o.preventDefault();
      const d = n.options[u];
      d && (s("update:modelValue", d.key), a.value[u]?.focus());
    }
    return (o, i) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(Z, null, ce(e.options, (r, u) => (f(), h("button", {
        key: r.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: un(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", r.key),
        onKeydown: (d) => l(d, u)
      }, T(r.label), 43, Wc))), 128))
    ], 8, Vc));
  }
}), Hc = /* @__PURE__ */ pe(Uc, [["__scopeId", "data-v-63fb5482"]]), Dt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, jc = ["aria-label"], Xc = ["role", "aria-label"], Gc = ["data-dc-item"], Yc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Qc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Zc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Jc = { class: "dc-menu__label dc-truncate" }, eu = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, tu = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, nu = /* @__PURE__ */ fe({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = U(null), o = U([]), i = U(null), r = U(null), u = U(null), d = U(!1), g = v(
      () => s.items.flatMap((S, F) => Dt(S) ? [F] : [])
    ), _ = v(() => {
      const S = [{ entries: [] }];
      return s.items.forEach((F, Q) => {
        F.heading ? S.push({ heading: F, entries: [] }) : S[S.length - 1]?.entries.push({ item: F, index: Q });
      }), S.filter((F) => F.entries.length > 0);
    }), w = U({ x: s.at.x, y: s.at.y });
    async function k() {
      w.value = { x: s.at.x, y: s.at.y }, await Kt();
      const S = l.value?.getBoundingClientRect();
      if (!S) return;
      const F = 8;
      let Q = s.at.x, re = s.at.y;
      if (Q + S.width > window.innerWidth - F) {
        const he = s.at.mirrorX === void 0 ? null : s.at.mirrorX - S.width;
        Q = he !== null && he >= F ? he : window.innerWidth - S.width - F;
      }
      re + S.height > window.innerHeight - F && (re = window.innerHeight - S.height - F), w.value = { x: Math.max(F, Q), y: Math.max(F, re) };
    }
    const C = v(() => ({ left: `${w.value.x}px`, top: `${w.value.y}px` }));
    function M(S) {
      i.value = S, S !== null && Kt(() => o.value[S]?.focus());
    }
    function b(S, F) {
      const Q = g.value;
      if (Q.length === 0) return null;
      if (S === null) return F === 1 ? Q[0] ?? null : Q[Q.length - 1] ?? null;
      const re = Q.indexOf(S);
      return re === -1 ? Q[0] ?? null : Q[(re + F + Q.length) % Q.length] ?? null;
    }
    function x(S, F) {
      if (!s.items[S]?.items?.length) return;
      const re = o.value[S]?.getBoundingClientRect(), he = l.value?.getBoundingClientRect();
      !re || !he || (u.value = { x: he.right - 4, y: re.top - 4, mirrorX: he.left + 4 }, r.value = S, d.value = F);
    }
    function A(S) {
      const F = r.value;
      r.value = null, u.value = null, S && F !== null && M(F);
    }
    function R(S) {
      const F = s.items[S];
      if (!(!F || !Dt(F))) {
        if (F.items?.length) {
          x(S, !0);
          return;
        }
        a("choose", F);
      }
    }
    function N(S) {
      const F = S.key;
      if (F === "Escape") {
        S.preventDefault(), S.stopPropagation(), r.value !== null ? A(!0) : a("dismiss");
        return;
      }
      if (F === "ArrowDown" || F === "ArrowUp") {
        S.preventDefault(), S.stopPropagation(), A(!1), M(b(i.value, F === "ArrowDown" ? 1 : -1));
        return;
      }
      if (F === "Home" || F === "End") {
        S.preventDefault(), S.stopPropagation(), A(!1), M(b(null, F === "Home" ? 1 : -1));
        return;
      }
      if (F === "ArrowRight") {
        const Q = i.value;
        Q !== null && s.items[Q]?.items?.length && (S.preventDefault(), S.stopPropagation(), x(Q, !0));
        return;
      }
      if (F === "ArrowLeft") {
        r.value !== null && (S.preventDefault(), S.stopPropagation(), A(!0));
        return;
      }
      if (F === "Enter" || F === " ") {
        const Q = i.value;
        if (Q === null) return;
        S.preventDefault(), S.stopPropagation(), R(Q);
      }
    }
    function V(S) {
      const F = s.items[S];
      !F || !Dt(F) || (r.value !== null && r.value !== S && A(!1), M(S), F.items?.length && x(S, !1));
    }
    return pl(() => {
      k(), s.autofocus && M(b(null, 1));
    }), be(() => s.at, k, { deep: !0 }), be(() => s.items, () => void k(), { deep: !0 }), et(() => {
      r.value = null;
    }), t({ root: l }), (S, F) => {
      const Q = Hs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Te(C.value),
        onKeydown: N
      }, [
        (f(!0), h(Z, null, ce(_.value, (re, he) => (f(), h("div", {
          key: `${he}-${re.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: re.heading ? "group" : "none",
          "aria-label": re.heading?.label
        }, [
          re.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": re.heading.id
          }, T(re.heading.label), 9, Gc)) : L("", !0),
          (f(!0), h(Z, null, ce(re.entries, ({ item: G, index: _e }) => (f(), h(Z, {
            key: G.id ?? `${_e}-${G.label ?? ""}`
          }, [
            G.separator ? (f(), h("div", Yc)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (xe) => {
                xe && (o.value[_e] = xe);
              },
              type: "button",
              class: "dc-menu__item",
              role: G.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": G.checked === void 0 ? void 0 : G.checked,
              "aria-haspopup": G.items?.length ? "menu" : void 0,
              "aria-expanded": G.items?.length ? r.value === _e : void 0,
              "aria-disabled": G.disabled ? "true" : void 0,
              disabled: G.disabled,
              "data-dc-item": G.id,
              tabindex: "-1",
              onClick: (xe) => R(_e),
              onMouseenter: (xe) => V(_e)
            }, [
              y("span", Zc, T(G.checked ? "✓" : ""), 1),
              y("span", Jc, T(G.label), 1),
              G.shortcut ? (f(), h("span", eu, T(G.shortcut), 1)) : G.items?.length ? (f(), h("span", tu, "›")) : L("", !0)
            ], 40, Qc))
          ], 64))), 128))
        ], 8, Xc))), 128)),
        r.value !== null && u.value ? (f(), le(Q, {
          key: r.value,
          items: e.items[r.value]?.items ?? [],
          at: u.value,
          label: e.items[r.value]?.label,
          autofocus: d.value,
          onChoose: F[0] || (F[0] = (re) => a("choose", re)),
          onDismiss: F[1] || (F[1] = (re) => A(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
      ], 44, jc);
    };
  }
}), Pa = /* @__PURE__ */ pe(nu, [["__scopeId", "data-v-9b1413fa"]]), su = ["data-dc-theme", "aria-label"], au = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], lu = /* @__PURE__ */ fe({
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
    const n = e, s = v(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), a = t, l = U(null), o = U([]), i = U(null), r = U(null), u = U(!1), d = v(
      () => n.menus.flatMap((R, N) => Dt(R) ? [N] : [])
    );
    function g(R, N) {
      const V = o.value[R]?.getBoundingClientRect(), S = n.menus[R];
      !V || !S || !Dt(S) || (r.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, i.value = R, u.value = N);
    }
    function _(R) {
      const N = i.value;
      i.value = null, r.value = null, R && N !== null && o.value[N]?.focus();
    }
    function w(R) {
      i.value === R ? _(!0) : g(R, !1);
    }
    function k(R) {
      i.value === null || i.value === R || g(R, !1);
    }
    function C(R, N) {
      const V = d.value;
      if (V.length === 0) return null;
      if (R === null) return N === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const S = V.indexOf(R);
      return S === -1 ? V[0] ?? null : V[(S + N + V.length) % V.length] ?? null;
    }
    function M(R) {
      const N = R.key;
      if (N === "Escape") {
        if (i.value === null) return;
        R.preventDefault(), _(!0);
        return;
      }
      if (N === "ArrowDown" && i.value === null) {
        const F = b();
        if (F === null) return;
        R.preventDefault(), g(F, !0);
        return;
      }
      if (N !== "ArrowLeft" && N !== "ArrowRight") return;
      const V = i.value ?? b(), S = C(V, N === "ArrowRight" ? 1 : -1);
      S !== null && (R.preventDefault(), i.value !== null ? g(S, !0) : o.value[S]?.focus());
    }
    function b() {
      const R = o.value.findIndex((N) => N === document.activeElement);
      return R === -1 ? d.value[0] ?? null : R;
    }
    function x(R) {
      const N = R.target;
      !N || l.value?.contains(N) || _(!1);
    }
    be(i, (R) => {
      R !== null ? window.addEventListener("pointerdown", x, !0) : window.removeEventListener("pointerdown", x, !0);
    }), et(() => window.removeEventListener("pointerdown", x, !0));
    function A(R) {
      _(!0), R.action?.(), a("choose", R);
    }
    return (R, N) => (f(), h("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Te(s.value),
      onKeydown: M
    }, [
      (f(!0), h(Z, null, ce(e.menus, (V, S) => (f(), h("button", {
        key: V.id ?? V.label ?? S,
        ref_for: !0,
        ref: (F) => {
          F && (o.value[S] = F);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === S,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: S === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (F) => w(S),
        onMouseenter: (F) => k(S)
      }, T(V.label), 41, au))), 128)),
      i.value !== null && r.value ? (f(), le(Pa, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: r.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: A,
        onDismiss: N[0] || (N[0] = (V) => _(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
    ], 44, su));
  }
}), Fd = /* @__PURE__ */ pe(lu, [["__scopeId", "data-v-93dbd2e4"]]), ru = ["aria-label", "aria-expanded", "disabled"], ou = { "aria-hidden": "true" }, iu = /* @__PURE__ */ fe({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = U(null), a = U(null), l = U(null), o = U(!1), i = v(() => l.value !== null);
    function r(k) {
      const C = s.value?.getBoundingClientRect();
      C && (l.value = { x: C.left, y: C.bottom + 4, mirrorX: C.right }, o.value = k);
    }
    function u(k) {
      l.value = null, k && s.value?.focus();
    }
    function d() {
      i.value ? u(!0) : r(!1);
    }
    function g(k) {
      k.key !== "ArrowDown" || i.value || (k.preventDefault(), r(!0));
    }
    function _(k) {
      const C = k.target;
      C && (s.value?.contains(C) || a.value?.root?.contains(C) || u(!1));
    }
    be(i, (k) => {
      k ? window.addEventListener("pointerdown", _, !0) : window.removeEventListener("pointerdown", _, !0);
    }), et(() => window.removeEventListener("pointerdown", _, !0));
    function w(k) {
      u(!0), k.action?.(), n("choose", k);
    }
    return (k, C) => (f(), h(Z, null, [
      y("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: g
      }, [
        y("span", ou, T(e.glyph), 1)
      ], 40, ru),
      l.value ? (f(), le(Pa, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: o.value,
        onChoose: w,
        onDismiss: C[0] || (C[0] = (M) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
    ], 64));
  }
}), ts = /* @__PURE__ */ pe(iu, [["__scopeId", "data-v-48f5ada5"]]), zt = (e) => e.kind === "split", j = (e) => e.kind === "group", te = (e) => e.kind === "float", pt = { x: 16, y: 16, w: 360, h: 260 }, pn = 28, Aa = 120, Rn = 220, za = 38, yt = 6;
function Gt(e, t) {
  let n = !1;
  const s = e.frames.map((a, l) => {
    const o = t(a.node, l);
    return o === a.node ? a : (n = !0, { ...a, node: o });
  });
  return n ? { ...e, frames: s } : e;
}
function Xe(e) {
  return { kind: "group", panels: [e] };
}
function Nd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ve = (e) => typeof e == "string", ns = (e) => ve(e) ? Xe(e) : e, Yt = (e) => ve(e) ? [e] : nt(e), Fs = (e) => e.panels.filter(ve), cu = (e) => e.panels.filter((t) => !ve(t)), Ne = (e, t) => e.panels.includes(t);
function Qt(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (ve(l) || !oe(l, t)) return l;
    const o = n(l);
    return o !== l && (s = !0), o;
  });
  return s ? { ...e, panels: a } : e;
}
function mn(e, t) {
  return { node: e, rect: { ...pt, ...t } };
}
function ss(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function as(e, t) {
  const n = { ...pt, ...t };
  return ss(
    e.map(
      (s, a) => mn(s, {
        ...n,
        x: n.x + a * pn,
        y: n.y + a * pn
      })
    )
  );
}
function ls(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const rs = (e, t, n) => ls("row", e, t, n), Dd = (e, t, n) => ls("column", e, t, n);
function we(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const mt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Id = (e) => ({ ...e, headless: !0 }), Od = (e) => ({ ...e, fixedView: !0 }), uu = (e) => e === "left" || e === "right" ? "row" : "column";
function nt(e) {
  return j(e) ? e.panels.flatMap(Yt) : te(e) ? e.frames.flatMap((t) => nt(t.node)) : e.children.flatMap(nt);
}
function oe(e, t) {
  return j(e) ? e.panels.some((n) => ve(n) ? n === t : oe(n, t)) : te(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Ta = (e) => nt(e).length === 0, Ln = (e) => !j(e) && mt(e), Fn = (e) => Ta(e) && !Ln(e);
function gn(e) {
  return zt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : te(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ve(t) ? [] : [{ node: t, index: n }]);
}
const os = (e) => gn(e).map((t) => t.node);
function gt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => ve(s) ? s === t : oe(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ra(e) {
  const t = e.panels[gt(e)];
  return t !== void 0 && ve(t) ? t : "";
}
function Ae(e) {
  if (ve(e)) return e;
  if (j(e)) {
    const n = e.panels[gt(e)];
    return n === void 0 ? "" : Ae(n);
  }
  if (te(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Ae(n.node) : "";
  }
  const t = e.children[0];
  return t ? Ae(t) : "";
}
function kt(e, t) {
  if (j(e) && Ne(e, t)) return e;
  for (const n of os(e)) {
    const s = kt(n, t);
    if (s) return s;
  }
  return null;
}
function du(e) {
  const t = os(e).flatMap(du);
  return j(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (j(e)) {
    for (const n of cu(e)) {
      const s = Se(n, t);
      if (s) return s;
    }
    return null;
  }
  if (te(e)) {
    for (const n of e.frames)
      if (oe(n.node, t))
        return Se(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = Se(n, t);
    if (s) return s;
  }
  return null;
}
function xn(e, t, n = Aa) {
  const s = (i, r) => r > 0 ? Math.max(Math.min(i, r), Math.min(n, r)) : Math.max(i, n), a = s(e.w, t.w), l = s(e.h, t.h), o = (i, r, u) => Math.min(Math.max(i, 0), Math.max(u - r, 0));
  return {
    x: Math.round(o(e.x, a, t.w)),
    y: Math.round(o(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function Ns(e, t, n, s, a = Aa) {
  let { x: l, y: o, w: i, h: r } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, l = e.x + n), t.includes("s") && (r = e.h + s), t.includes("n") && (r = e.h - s, o = e.y + s), i < a && (t.includes("w") && (l = e.x + e.w - a), i = a), r < a && (t.includes("n") && (o = e.y + e.h - a), r = a), { x: l, y: o, w: i, h: r };
}
const La = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function bt(e, t, n) {
  if (j(e)) return Qt(e, t, (l) => bt(l, t, n));
  if (te(e)) {
    let l = !1;
    const o = e.frames.map((i) => {
      if (!oe(i.node, t)) return i;
      if (Se(i.node, t)) {
        const u = bt(i.node, t, n);
        return u === i.node ? i : (l = !0, { ...i, node: u });
      }
      const r = n(i);
      return r === i ? i : (l = !0, r);
    });
    return l ? { ...e, frames: o } : e;
  }
  if (!oe(e, t)) return e;
  let s = !1;
  const a = e.children.map((l) => {
    const o = bt(l, t, n);
    return o !== l && (s = !0), o;
  });
  return s ? { ...e, children: a } : e;
}
function fu(e, t, n) {
  return bt(e, t, (s) => La(s.rect, n) ? s : { ...s, rect: n });
}
const at = (e) => e.maximized === !0, Fa = (e) => (t) => {
  if (at(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function pu(e, t, n = !0) {
  return bt(e, t, Fa(n));
}
function Bd(e, t) {
  const n = Se(e, t);
  return n ? pu(e, t, !at(n)) : e;
}
const dt = (e) => e.minimized === !0, Na = (e) => (t) => {
  if (dt(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function vu(e, t, n = !0) {
  return bt(e, t, Na(n));
}
function Kd(e, t) {
  const n = Se(e, t);
  return n ? vu(e, t, !dt(n)) : e;
}
function ct(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = rt(e, t.slice(0, -1));
  return !s || !te(s) ? null : s.frames[n] ?? null;
}
function Nn(e, t) {
  if (te(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!oe(s.node, t)) continue;
      const a = Nn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of gn(e)) {
    if (!oe(n, t)) continue;
    const a = Nn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function is(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = rt(e, a);
  if (!l || !te(l)) return e;
  const o = l.frames[s];
  if (!o) return e;
  const i = n(o);
  if (i === o) return e;
  const r = [...l.frames];
  return r[s] = i, ht(e, a, { ...l, frames: r });
}
function Ds(e, t, n) {
  return is(
    e,
    t,
    (s) => La(s.rect, n) ? s : { ...s, rect: n }
  );
}
function hu(e, t, n = !0) {
  return is(e, t, Fa(n));
}
function mu(e, t, n = !0) {
  return is(e, t, Na(n));
}
function It(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (te(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const i = It(o.node, s), r = i === o.node ? o : { ...o, node: i };
    if (n === e.frames.length - 1 && r === o) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(r), { ...e, frames: u };
  }
  const a = rt(e, [n]);
  if (!a) return e;
  const l = It(a, s);
  return l === a ? e : ht(e, [n], l);
}
function gu(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (te(s) && (n[l] = s.frames.length - 1), s = rt(s, [a]));
  }), n;
}
function rn(e, t, n, s) {
  if (j(e)) return Qt(e, n, (o) => rn(o, t, n, s));
  if (te(e)) {
    const o = e.frames.findIndex((r) => oe(r.node, n)), i = e.frames[o];
    if (!i) return e;
    if (Se(i.node, n)) {
      const r = rn(i.node, t, n, s);
      if (r === i.node) return e;
      const u = [...e.frames];
      return u[o] = { ...i, node: r }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, mn(Xe(t), s)] };
  }
  if (!oe(e, n)) return e;
  let a = !1;
  const l = e.children.map((o) => {
    const i = rn(o, t, n, s);
    return i !== o && (a = !0), i;
  });
  return a ? { ...e, children: l } : e;
}
function Is(e, t, n, s) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Se(e, n)) return e;
  const a = vt(e, t);
  if (!a) return e;
  const l = rn(a, t, n, s);
  return l === a ? e : $e(l);
}
function _u(e, t, n) {
  return te(e) ? { ...e, frames: [...e.frames, mn(Xe(t), n)] } : j(e) ? Ia(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Xe(t)],
    sizes: [...Je(e), 1],
    ...we(e)
  };
}
function Da(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return _u(e, t, s);
  const l = n.slice(1), o = (d, g) => g === a ? Da(d, t, l, s) : vt(d, t);
  if (te(e)) {
    const d = e.frames.flatMap((g, _) => {
      const w = o(g.node, _);
      return w ? [w === g.node ? g : { ...g, node: w }] : [];
    });
    return { ...e, frames: d };
  }
  if (j(e)) {
    const d = gt(e), g = [];
    e.panels.forEach((k, C) => {
      if (ve(k)) {
        k !== t && g.push(k);
        return;
      }
      const M = o(k, C);
      M && g.push(M);
    });
    const w = e.active && g.some((k) => Yt(k).includes(e.active)) ? e.active : Ae(g[d] ?? g[g.length - 1]);
    return {
      kind: "group",
      panels: g,
      ...w ? { active: w } : {},
      ...we(e)
    };
  }
  const i = Je(e), r = [], u = [];
  return e.children.forEach((d, g) => {
    const _ = o(d, g);
    _ && (r.push(_), u.push(i[g] ?? 0));
  }), { kind: "split", direction: e.direction, children: r, sizes: u, ...we(e) };
}
function Os(e, t, n, s) {
  const a = rt(e, n);
  return !a || !Ta(a) || !oe(e, t) ? e : $e(Da(e, t, n, s));
}
function Cn(e, t) {
  if (j(e)) return Qt(e, t, (a) => Cn(a, t));
  if (te(e)) {
    const a = e.frames.findIndex((u) => oe(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const o = Cn(l.node, t), i = o === l.node ? l : { ...l, node: o };
    if (a === e.frames.length - 1 && i === l) return e;
    const r = [...e.frames];
    return r.splice(a, 1), r.push(i), { ...e, frames: r };
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = Cn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function cs(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), a = s.reduce((l, o) => l + o, 0);
  return a <= 0 ? n() : s.map((l) => l / a);
}
const Je = (e) => cs(e.children.length, e.sizes), Be = (e) => {
  const t = j(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function $e(e) {
  if (j(e)) return yu(e);
  if (te(e)) {
    const i = e.frames.flatMap((r) => {
      const u = $e(r.node);
      return Fn(u) ? [] : [u === r.node ? r : { ...r, node: u }];
    });
    return i.length === e.frames.length && i.every((r, u) => r === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = Je(e), n = Be(e), s = [], a = [], l = [];
  e.children.forEach((i, r) => {
    const u = $e(i), d = t[r] ?? 0;
    if (Fn(u)) return;
    if (!n && zt(u) && u.direction === e.direction && !Be(u) && !mt(u)) {
      const _ = Je(u);
      u.children.forEach((w, k) => {
        s.push(w), a.push(d * (_[k] ?? 0));
      });
      return;
    }
    s.push(u), a.push(d);
    const g = n?.[r];
    g && l.push(g);
  });
  const o = s[0];
  return s.length === 1 && o && !mt(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: cs(s.length, a),
    ...we(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function yu(e) {
  if (e.panels.every(ve)) return e;
  const t = Ae(e), n = Be(e), s = [], a = [];
  e.panels.forEach((i, r) => {
    const u = n?.[r];
    if (ve(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const d = $e(i);
    if (!Fn(d)) {
      if (j(d) && !mt(d) && !Be(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const l = s[0];
  if (s.length === 1 && l !== void 0 && !ve(l) && !mt(e))
    return l;
  if (s.length === e.panels.length && s.every((i, r) => i === e.panels[r]))
    return e;
  const o = t && s.some((i) => Yt(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...o ? { active: o } : {},
    ...we(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function vt(e, t) {
  if (te(e)) {
    const o = e.frames.flatMap((i) => {
      const r = vt(i.node, t);
      return r ? [r === i.node ? i : { ...i, node: r }] : [];
    });
    return o.length === 0 && !Ln(e) ? null : { ...e, frames: o };
  }
  if (j(e)) {
    if (!oe(e, t)) return e;
    const o = gt(e), i = [];
    for (const d of e.panels) {
      if (ve(d)) {
        d !== t && i.push(d);
        continue;
      }
      const g = vt(d, t);
      g && i.push(g);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((d) => Yt(d).includes(e.active)) ? e.active : Ae(i[o] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...we(e) } : { kind: "group", panels: i, ...we(e) };
  }
  const n = Je(e), s = [], a = [];
  if (e.children.forEach((o, i) => {
    const r = vt(o, t);
    r && (s.push(r), a.push(n[i] ?? 0));
  }), s.length === 0)
    return Ln(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...we(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !mt(e) ? l : $e({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...we(e)
  });
}
function Ia(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...we(e) };
}
function Ft(e, t, n, s, a) {
  const l = (w) => Gt(
    w,
    (k) => oe(k, n) ? Ft(k, t, n, s, a) : k
  );
  if (s === "float") return e;
  const o = (w) => Qt(w, n, (k) => Ft(k, t, n, s, a));
  if (s === "center")
    return j(e) ? Ne(e, n) ? Ia(e, t, a) : o(e) : te(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (w) => oe(w, n) ? Ft(w, t, n, s, a) : w
      )
    };
  const i = uu(s), r = s === "left" || s === "top", u = (w) => ({
    kind: "split",
    direction: i,
    children: r ? [Xe(t), w] : [w, Xe(t)],
    sizes: [0.5, 0.5]
  });
  if (j(e)) return Ne(e, n) ? u(e) : o(e);
  if (te(e)) return l(e);
  const d = Je(e), g = e.children.findIndex(
    (w) => j(w) && Ne(w, n)
  );
  if (g >= 0 && e.direction === i) {
    const w = (d[g] ?? 0) / 2, k = [...e.children], C = [...d];
    return k.splice(r ? g : g + 1, 0, Xe(t)), C.splice(g, 1, w, w), {
      kind: "split",
      direction: i,
      children: k,
      sizes: C,
      ...we(e)
    };
  }
  const _ = e.children.map((w) => oe(w, n) ? j(w) && Ne(w, n) ? u(w) : Ft(w, t, n, s) : w);
  return {
    kind: "split",
    direction: e.direction,
    children: _,
    sizes: d,
    ...we(e)
  };
}
function $t(e, t) {
  if (j(e)) {
    if (Ne(e, t))
      return Ra(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((r) => !ve(r) && oe(r, t)), l = e.panels[a];
    if (l === void 0 || ve(l)) return e;
    const o = $t(l, t);
    if (o === l && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = o, { ...e, panels: i, active: t };
  }
  if (!oe(e, t)) return e;
  if (te(e)) return Gt(e, (a) => $t(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = $t(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Ot(e, t, n) {
  if (j(e)) {
    if (!Ne(e, t)) return Qt(e, t, (u) => Ot(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const l = [...e.panels];
    l.splice(s, 1), l.splice(a, 0, t);
    const o = Be(e), i = o ? [...o] : void 0;
    i && i.splice(a, 0, ...i.splice(s, 1));
    const r = Ae(e);
    return {
      kind: "group",
      panels: l,
      ...r ? { active: r } : {},
      ...we(e),
      ...i ? { places: i } : {}
    };
  }
  return oe(e, t) ? te(e) ? Gt(e, (s) => Ot(s, t, n)) : { ...e, children: e.children.map((s) => Ot(s, t, n)) } : e;
}
function on(e, t, n) {
  if (t === n) return e;
  if (j(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => ve(l) ? s(l) : on(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return te(e) ? Gt(e, (s) => on(s, t, n)) : { ...e, children: e.children.map((s) => on(s, t, n)) };
}
function tn(e, t, n, s, a) {
  if (s === "float" || !oe(e, t) || !oe(e, n)) return e;
  const l = kt(e, t);
  if (s === "center" && l && Ne(l, n)) {
    if (a === void 0) return e;
    const i = l.panels.indexOf(t), r = a > i ? a - 1 : a;
    return r === i ? e : $t(Ot(e, t, r), t);
  }
  if (t === n) return e;
  const o = vt(e, t);
  return o ? $e(Ft(o, t, n, s, a)) : e;
}
function Oa(e, t, n) {
  if (j(e)) {
    const a = e.panels[t];
    if (a === void 0 || ve(a)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (te(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const l = [...e.frames];
    return l[t] = { ...a, node: n }, { ...e, frames: l };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function Zt(e, t, n) {
  const s = gn(e);
  if (!j(e) && s.some(({ node: a }) => j(a) && Ne(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!oe(a, t)) continue;
    const o = Zt(a, t, n);
    return o ? Oa(e, l, o) : null;
  }
  return null;
}
function qd(e, t, n) {
  const s = Zt(
    e,
    t,
    (a) => zt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? $e(s) : e;
}
function Ba(e) {
  return te(e) ? [e] : Be(e) || mt(e) ? [e] : j(e) ? [...e.panels] : e.children.flatMap(Ba);
}
function Ka(e, t) {
  if (j(e)) return e;
  const n = os(e).map(Ba), s = n.flat(), a = t && s.some((o) => Yt(o).includes(t)) ? t : void 0, l = wu(e, n);
  return $e({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function wu(e, t) {
  const n = te(e) ? e.frames.map(({ node: s, ...a }) => a) : Be(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function ku(e, t) {
  const n = Zt(e, t, (s) => Ka(s, t));
  return n ? $e(n) : e;
}
function us(e, t, n) {
  if (j(e) && Ne(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of gn(e)) {
    if (!oe(s, t)) continue;
    const l = us(s, t, n);
    return l ? Oa(e, a, l) : null;
  }
  return null;
}
function Bs(e, t, n) {
  const s = us(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const l = Be(a);
    return {
      ...ls(n, a.panels.map(ns)),
      ...we(a),
      ...l ? { places: l } : {}
    };
  });
  return s ? $e(s) : e;
}
function Dn(e, t) {
  if (j(e)) return e;
  if (te(e)) {
    const a = e.frames.findIndex(
      (i) => j(i.node) && i.node.panels.includes(t)
    ), l = e.frames[a], o = l && j(l.node) ? l.node : null;
    if (l && o && o.panels.length > 1) {
      const i = as(o.panels.map(ns), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return Gt(e, (i) => Dn(i, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = Dn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function bu(e, t, n) {
  const s = kt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (Se(e, t)?.node === s) {
    const o = Dn(e, t);
    return o === e ? e : $e(o);
  }
  const l = us(e, t, (o) => ({
    ...ss(qa(o.panels.map(ns), Be(o), n)),
    ...we(o)
  }));
  return l ? $e(l) : e;
}
function qa(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : as(e, n).frames;
}
function Va(e, t) {
  return { ...ss(qa(e.children, Be(e), t)), ...we(e) };
}
function Vd(e, t, n) {
  const s = Zt(
    e,
    t,
    (a) => te(a) ? a : Va(a, n)
  );
  return s ? $e(s) : j(e) && Ne(e, t) ? as([e], n) : e;
}
function $u(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function Wa(e, t) {
  const n = $u(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...we(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Wd(e, t, n = "row") {
  const s = Zt(
    e,
    t,
    (a) => te(a) ? Wa(a, n) : a
  );
  return s ? $e(s) : e;
}
function Ua(e) {
  if (te(e)) return null;
  const t = j(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ve(t) || j(t) && t.panels.length === 1 && ve(t.panels[0]) ? null : t;
}
const xu = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Cu(e, t) {
  const n = Ua(e);
  return n ? t === "inner" ? n : { ...xu(n), ...we(e) } : e;
}
function Et(e) {
  return e.title ? e.title : j(e) ? "" : te(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Bt(e, t) {
  if (j(e)) {
    const s = e.panels[gt(e)];
    return s === void 0 ? "" : ve(s) ? t(s) ?? s : Et(s) || Bt(s, t);
  }
  if (e.title) return e.title;
  if (te(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Bt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Bt(n, t) : "";
}
function rt(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (zt(n)) n = n.children[s];
    else if (te(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || ve(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function ht(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (te(e)) {
    const r = e.frames[s];
    if (!r) return e;
    const u = ht(r.node, a, n);
    if (u === r.node) return e;
    const d = [...e.frames];
    return d[s] = { ...r, node: u }, { ...e, frames: d };
  }
  if (j(e)) {
    const r = e.panels[s];
    if (r === void 0 || ve(r)) return e;
    const u = ht(r, a, n);
    if (u === r) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const l = e.children[s];
  if (!l) return e;
  const o = ht(l, a, n);
  if (o === l) return e;
  const i = [...e.children];
  return i[s] = o, { ...e, children: i };
}
function cn(e, t, n) {
  if (t.length === 0)
    return zt(e) ? { ...e, sizes: cs(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (te(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const r = cn(i.node, a, n);
    if (r === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: r }, { ...e, frames: u };
  }
  if (j(e)) {
    const i = e.panels[s];
    if (i === void 0 || ve(i)) return e;
    const r = cn(i, a, n);
    if (r === i) return e;
    const u = [...e.panels];
    return u[s] = r, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const o = [...e.children];
  return o[s] = cn(l, a, n), { ...e, children: o };
}
function Ks(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const o = a + l;
  if (o < s * 2) return e;
  const i = [...e], r = Math.min(Math.max(a + n, s), o - s);
  return i[t] = r, i[t + 1] = o - r, i;
}
function vn(e) {
  if (!j(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ve(t) ? e : { ...rs([Mu(e)]), ...we(e) };
}
const Mu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function qs(e) {
  return e.length === 0 ? null : rs(e.map(Xe));
}
function Su(e, t) {
  if (!e) return qs(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const r of nt(e))
    !n.has(r) || s.has(r) ? a.add(r) : s.add(r);
  let l = e;
  for (const r of a)
    l = l ? vt(l, r) : null;
  const o = new Set(l ? nt(l) : []), i = t.filter((r) => !o.has(r));
  if (i.length === 0) return l ? vn($e(l)) : null;
  if (!l) return qs(i);
  if (te(l)) {
    const r = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...i.map(
          (u, d) => mn(Xe(u), {
            x: pt.x + (r + d) * pn,
            y: pt.y + (r + d) * pn
          })
        )
      ]
    };
  }
  return vn($e(rs([l, ...i.map(Xe)])));
}
const ds = Symbol("dc.windowContext");
function Eu(e) {
  return In(ds, e), e;
}
function fs() {
  const e = Ct(ds, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Pu = ["data-dc-glyph"], Au = { class: "dc-glyph__line" }, zu = ["d"], Tu = {
  key: 0,
  class: "dc-glyph__aqua"
}, Ru = ["d"], Lu = /* @__PURE__ */ fe({
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
    return (s, a) => (f(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      y("g", Au, [
        (f(!0), h(Z, null, ce(t[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, zu))), 128))
      ]),
      n[e.kind] ? (f(), h("g", Tu, [
        (f(!0), h(Z, null, ce(n[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, Ru))), 128))
      ])) : L("", !0)
    ], 8, Pu));
  }
}), xt = /* @__PURE__ */ pe(Lu, [["__scopeId", "data-v-4d2872c0"]]), Fu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Nu = ["data-dc-movable"], Du = { class: "dc-float__title dc-truncate" }, Iu = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Ou = ["aria-label", "aria-pressed", "data-dc-minimize"], Bu = ["aria-label", "aria-pressed", "data-dc-maximize"], Ku = ["aria-label", "data-dc-close"], qu = { class: "dc-float__content" }, Vu = ["data-dc-handle", "onPointerdown"], Wu = /* @__PURE__ */ fe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = fs(), s = v(() => Ae(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), l = v(() => at(t.frame)), o = v(() => dt(t.frame)), i = v(() => l.value || o.value), r = v(() => n.resizable.value && !a.value && !i.value), u = v(() => n.movable.value && !a.value && !i.value), d = v(() => {
      const N = nt(t.frame.node);
      return N.length === 1 ? N[0] ?? null : null;
    }), g = v(() => d.value !== null && n.closable(d.value)), _ = v(() => t.frame.node.headless === !0), w = v(
      () => !_.value && (!j(t.frame.node) || o.value)
    ), k = v(
      () => t.frame.title || Et(t.frame.node) || Bt(t.frame.node, (N) => n.panelFor(N)?.title)
    ), C = v(() => n.spaceMenu(t.path));
    function M(N) {
      N.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, N, "move");
    }
    function b(N) {
      N.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const x = v(() => {
      const N = n.framing.value;
      return N !== null && oe(t.frame.node, N);
    }), A = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Rn}px`,
        height: `${za}px`
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
    return (N, V) => (f(), h("div", {
      class: "dc-float",
      style: Te(A.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": x.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (S) => P(n).raiseAt(e.path))
    }, [
      w.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: M,
        onDblclick: b
      }, [
        y("span", Du, T(k.value), 1),
        C.value.length ? (f(), le(ts, {
          key: 0,
          items: C.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : L("", !0),
        !a.value || o.value && g.value && d.value ? (f(), h("div", Iu, [
          a.value ? L("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (S) => P(n).toggleMinimizeAt(e.path))
          }, [
            ye(xt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Ou)),
          a.value ? L("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (S) => P(n).toggleMaximizeAt(e.path))
          }, [
            ye(xt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Bu)),
          o.value && g.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": d.value,
            onClick: V[2] || (V[2] = (S) => P(n).close(d.value))
          }, [
            ye(xt, { kind: "close" })
          ], 8, Ku)) : L("", !0)
        ])) : L("", !0)
      ], 40, Nu)) : L("", !0),
      y("div", qu, [
        ke(N.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(Z, null, ce(r.value ? R : [], (S) => (f(), h("span", {
        key: S,
        class: "dc-float__grip",
        "data-dc-handle": S,
        "aria-hidden": "true",
        onPointerdown: Fe((F) => P(n).beginFrameDragAt(e.path, F, S), ["stop"])
      }, null, 40, Vu))), 128))
    ], 44, Fu));
  }
}), Uu = /* @__PURE__ */ pe(Wu, [["__scopeId", "data-v-f035684c"]]), ps = Symbol("dc.paneContext");
function Hu(e) {
  return In(ps, e), e;
}
function Ud() {
  return Ct(ps, null);
}
function Hd(e) {
  const t = Ct(ds, null), n = Ct(ps, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Lt(e)
  );
  return vl() && Ws(s), s;
}
const ju = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Xu = ["data-dc-movable"], Gu = ["aria-label", "aria-pressed"], Yu = ["data-dc-space-name"], Qu = { class: "dc-truncate" }, Zu = ["aria-label"], Ju = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ed = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], td = { class: "dc-tab__name dc-truncate" }, nd = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, sd = ["aria-label", "data-dc-close", "onClick"], ad = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ld = { class: "dc-pane__tools" }, rd = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, od = ["aria-label", "data-dc-minimize"], id = ["aria-label", "aria-pressed", "data-dc-maximize"], cd = ["aria-label", "data-dc-close"], ud = ["id", "role", "aria-labelledby"], dd = ["id", "role", "aria-labelledby"], fd = ["data-dc-edge"], pd = /* @__PURE__ */ fe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = fs(), s = Us() ?? "dc-pane", a = v(
      () => t.group.panels.flatMap((O, H) => {
        if (!ve(O)) {
          const ze = Et(O) || Bt(O, (Ee) => n.panelFor(Ee)?.title);
          return [{ kind: "space", index: H, id: `space-${H}`, title: ze, node: O }];
        }
        const se = n.panelFor(O);
        return se ? [{ kind: "panel", index: H, id: O, title: se.title, panel: se }] : [];
      })
    ), l = v(() => a.value.length > 1), o = v(() => {
      const O = gt(t.group);
      return a.value.find((H) => H.index === O) ?? a.value[0] ?? null;
    }), i = v(() => o.value?.kind === "space" ? o.value.node : null), r = v(() => i.value ? "" : Ra(t.group)), u = v(() => i.value ? null : n.panelFor(r.value)), d = v(() => o.value?.title ?? ""), g = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), _ = v(() => [...t.path, o.value?.index ?? 0]), w = v(() => r.value || Fs(t.group)[0] || ""), k = v(() => n.viewFor(r.value)), C = v(() => t.group.headless === !0), M = v(() => n.focused.value === r.value), b = v(() => n.dragging.value === r.value), x = v(() => n.moving.value === r.value), A = v(() => n.frameOf(w.value) !== null), R = v(() => n.panelFor(w.value)?.fixed === !0), N = v(
      () => !i.value && (n.canMove(r.value) || A.value && n.movable.value && !R.value)
    ), V = v(
      () => i.value ? n.spaceMenu(_.value) : n.menuFor(r.value)
    ), S = (O) => n.closable(O);
    Hu({ panel: r });
    const F = v(() => n.maximized(w.value)), Q = v(
      () => A.value && !R.value || !l.value && !!u.value && S(u.value.id)
    ), re = (O) => `${s}-tab-${O}`, he = v(() => `${s}-body`), G = v(() => {
      const O = n.dropTarget.value;
      return !O || !Ne(t.group, O.panel) || O.edge === "float" ? null : O;
    }), _e = v(() => G.value?.index === void 0 ? G.value?.edge ?? null : null), xe = v(() => G.value?.index ?? null), $ = () => u.value ? n.renderContent(u.value, k.value, M.value) ?? null : null, I = () => u.value ? n.renderActions(u.value, k.value, M.value) ?? null : null;
    let Y = null;
    function ne(O) {
      const H = Y !== null && Math.hypot(O.clientX - Y.x, O.clientY - Y.y) >= 4;
      return Y = null, H;
    }
    const me = (O) => O.kind === "panel" ? O.id : Ae(O.node);
    function Ce(O, H) {
      H.kind !== "space" && (n.focus(H.id), Y = { x: O.clientX, y: O.clientY }, n.beginDrag(H.id, O));
    }
    function Ke(O, H) {
      if (ne(O)) return;
      const se = me(H);
      se && n.selectPanel(se);
    }
    function qe(O) {
      r.value && n.focus(r.value), !O.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (A.value ? n.beginFrameDrag(w.value, O, "move") : n.beginDrag(r.value, O));
    }
    function Ve(O) {
      Y = { x: O.clientX, y: O.clientY }, n.beginDrag(r.value, O);
    }
    function We(O) {
      ne(O) || n.toggleMoveMode(r.value);
    }
    const Re = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ie(O) {
      if (!x.value) return;
      if (O.key === "Escape") {
        O.preventDefault(), n.toggleMoveMode(r.value);
        return;
      }
      const H = Re[O.key];
      H && (O.preventDefault(), A.value ? n.nudgeFrame(r.value, H, O.shiftKey) : n.nudge(r.value, H, O.shiftKey));
    }
    function D(O) {
      !A.value || O.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(w.value);
    }
    function K(O, H) {
      O.stopPropagation(), Y = null, n.close(H);
    }
    function W(O, H) {
      const se = a.value.length;
      let ze = null;
      if (O.key === "ArrowRight" ? ze = (H + 1) % se : O.key === "ArrowLeft" ? ze = (H - 1 + se) % se : O.key === "Home" ? ze = 0 : O.key === "End" && (ze = se - 1), ze === null) return;
      O.preventDefault();
      const Ee = a.value[ze];
      if (!Ee) return;
      const Tt = me(Ee);
      Tt && n.selectPanel(Tt);
    }
    return (O, H) => o.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": r.value || void 0,
      "data-dc-panels": P(Fs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": A.value ? "true" : "false",
      "data-dc-maximized": F.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": M.value ? "true" : "false",
      "data-dc-dragging": b.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: H[7] || (H[7] = (se) => r.value && P(n).focus(r.value))
    }, [
      C.value ? L("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": N.value ? "true" : "false",
        onPointerdown: qe,
        onDblclick: D
      }, [
        N.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": x.value,
          onPointerdown: Ve,
          onClick: We,
          onKeydown: Ie
        }, [...H[8] || (H[8] = [
          y("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Gu)) : L("", !0),
        g.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": g.value
        }, [
          y("span", Qu, T(g.value), 1)
        ], 8, Yu)) : L("", !0),
        y("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(Z, null, ce(a.value, (se, ze) => (f(), h(Z, {
            key: se.id
          }, [
            xe.value === ze ? (f(), h("span", Ju)) : L("", !0),
            y("button", {
              id: re(se.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": se.kind === "panel" ? se.id : void 0,
              "data-dc-space": se.kind === "space" ? se.title : void 0,
              "aria-selected": se.index === o.value.index,
              "aria-controls": he.value,
              tabindex: se.index === o.value.index ? 0 : -1,
              onPointerdown: (Ee) => Ce(Ee, se),
              onClick: (Ee) => Ke(Ee, se),
              onKeydown: (Ee) => W(Ee, ze)
            }, [
              y("span", td, T(se.title), 1),
              se.kind === "panel" && se.panel.subtitle ? (f(), h("span", nd, T(se.panel.subtitle), 1)) : L("", !0),
              l.value && se.kind === "panel" && S(se.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${se.title}`,
                "data-dc-close": se.id,
                onPointerdown: H[0] || (H[0] = Fe(() => {
                }, ["stop"])),
                onClick: (Ee) => K(Ee, se.id)
              }, [...H[9] || (H[9] = [
                y("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, sd)) : L("", !0)
            ], 40, ed)
          ], 64))), 128)),
          xe.value === a.value.length ? (f(), h("span", ad)) : L("", !0)
        ], 8, Zu),
        y("div", ld, [
          ye(I),
          V.value.length ? (f(), le(ts, {
            key: 0,
            items: V.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : L("", !0)
        ]),
        Q.value ? (f(), h("div", rd, [
          A.value && !R.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": w.value,
            onPointerdown: H[1] || (H[1] = Fe(() => {
            }, ["stop"])),
            onClick: H[2] || (H[2] = (se) => P(n).toggleMinimize(w.value))
          }, [
            ye(xt, { kind: "minimize" })
          ], 40, od)) : L("", !0),
          A.value && !R.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${F.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": F.value,
            "data-dc-maximize": w.value,
            onPointerdown: H[3] || (H[3] = Fe(() => {
            }, ["stop"])),
            onClick: H[4] || (H[4] = (se) => P(n).toggleMaximize(w.value))
          }, [
            ye(xt, {
              kind: F.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, id)) : L("", !0),
          !l.value && u.value && S(u.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: H[5] || (H[5] = Fe(() => {
            }, ["stop"])),
            onClick: H[6] || (H[6] = (se) => P(n).close(u.value.id))
          }, [
            ye(xt, { kind: "close" })
          ], 40, cd)) : L("", !0)
        ])) : L("", !0)
      ], 40, Xu)),
      i.value ? (f(), h("div", {
        key: 1,
        id: he.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : re(o.value.id)
      }, [
        ke(O.$slots, "space", {
          node: i.value,
          path: _.value
        }, void 0, !0)
      ], 8, ud)) : (f(), h("div", {
        key: 2,
        id: he.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : re(r.value)
      }, [
        ye($)
      ], 8, dd)),
      _e.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": _e.value,
        "aria-hidden": "true"
      }, null, 8, fd)) : L("", !0)
    ], 40, ju)) : L("", !0);
  }
}), Ha = /* @__PURE__ */ pe(pd, [["__scopeId", "data-v-44fd2b2d"]]), vd = ["data-dc-space", "data-dc-path", "aria-label"], hd = {
  key: 0,
  class: "dc-space__head"
}, md = { class: "dc-space__title dc-truncate" }, gd = ["data-dc-direction"], _d = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, yd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], wd = /* @__PURE__ */ fe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = fs(), s = U(null), a = v(() => j(t.node) ? t.node : null), l = v(() => zt(t.node) ? t.node : null), o = v(() => te(t.node) ? t.node : null), i = v(
      () => l.value ? l.value.children : o.value?.frames.map(($) => $.node) ?? []
    ), r = v(() => l.value ? Je(l.value) : []), u = v(
      () => (o.value?.frames ?? []).map(($, I) => ({
        held: $,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: I,
        key: S($.node),
        path: [...t.path, I]
      })).sort(($, I) => $.key < I.key ? -1 : $.key > I.key ? 1 : 0)
    ), d = v(() => Et(t.node)), g = v(() => n.spaceMenu(t.path)), _ = v(() => t.node.headless === !0), w = v(() => o.value ? "desktop" : l.value?.direction ?? ""), k = U(null), C = U(0);
    let M = null;
    be(
      k,
      ($) => {
        M?.disconnect(), M = null, !(!$ || typeof ResizeObserver > "u") && (C.value = $.clientWidth, M = new ResizeObserver(([I]) => {
          C.value = I?.contentRect.width ?? 0;
        }), M.observe($));
      },
      { immediate: !0 }
    ), et(() => M?.disconnect());
    const b = v(() => {
      const $ = Math.max(
        1,
        Math.floor((C.value + yt) / (Rn + yt))
      ), I = /* @__PURE__ */ new Map();
      let Y = 0;
      for (const ne of u.value)
        ne.held.minimized === !0 && (I.set(ne.key, {
          x: yt + Y % $ * (Rn + yt),
          bottom: yt + Math.floor(Y / $) * (za + yt)
        }), Y += 1);
      return I;
    }), x = ($) => !!$ && $.join("/") === t.path.join("/"), A = v(() => {
      const $ = n.dropTarget.value, I = o.value;
      if (!I || !$?.rect || $.edge !== "float") return null;
      if ($.space) return x($.space) ? $.rect : null;
      const Y = Se(I, $.panel);
      return Y && I.frames.includes(Y) ? $.rect : null;
    }), R = v(() => {
      const $ = n.dropTarget.value;
      return !!$ && !$.rect && x($.space);
    }), N = v(() => l.value?.direction === "row"), V = v(() => i.value.map(($, I) => [...t.path, I])), S = ($) => [...nt($)].sort().join("/"), F = ($) => {
      const I = nt($)[0];
      return (I ? n.panelFor(I)?.title : null) ?? I ?? "panel";
    }, Q = ($) => {
      const I = i.value[$], Y = i.value[$ + 1];
      return !I || !Y ? "Resize panels" : `Resize ${F(I)} and ${F(Y)}`;
    }, re = ($) => {
      const I = r.value[$] ?? 0, Y = r.value[$ + 1] ?? 0, ne = I + Y;
      return ne > 0 ? Math.round(I / ne * 100) : 50;
    };
    function he() {
      const $ = s.value, I = $ ? N.value ? $.clientWidth : $.clientHeight : 0;
      return I <= 0 ? 0.05 : Math.min(n.minPanelSize.value / I, 0.4);
    }
    let G = null;
    function _e($, I) {
      const Y = l.value, ne = s.value;
      if (!n.resizable.value || !Y || !ne || $.button !== 0) return;
      const me = N.value ? ne.clientWidth : ne.clientHeight;
      if (me <= 0) return;
      const Ce = N.value ? $.clientX : $.clientY, Ke = Je(Y), qe = Math.min(n.minPanelSize.value / me, 0.4);
      $.preventDefault();
      const Ve = (Ie) => {
        const D = ((N.value ? Ie.clientX : Ie.clientY) - Ce) / me;
        n.setSizes(t.path, Ks(Ke, I, D, qe));
      }, We = () => G?.(), Re = (Ie) => {
        Ie.key === "Escape" && (n.setSizes(t.path, Ke), G?.());
      };
      G = () => {
        window.removeEventListener("pointermove", Ve), window.removeEventListener("pointerup", We), window.removeEventListener("pointercancel", We), window.removeEventListener("keydown", Re), G = null;
      }, window.addEventListener("pointermove", Ve), window.addEventListener("pointerup", We), window.addEventListener("pointercancel", We), window.addEventListener("keydown", Re);
    }
    et(() => G?.());
    function xe($, I) {
      const Y = l.value;
      if (!n.resizable.value || !Y) return;
      const ne = N.value ? "ArrowRight" : "ArrowDown", me = N.value ? "ArrowLeft" : "ArrowUp", Ce = $.shiftKey ? 0.1 : 0.02;
      if ($.key !== ne && $.key !== me) return;
      const Ke = $.key === ne ? Ce : -Ce;
      $.preventDefault(), n.setSizes(t.path, Ks(Je(Y), I, Ke, he()));
    }
    return ($, I) => {
      const Y = Hs("WindowNode", !0);
      return a.value ? (f(), le(Ha, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: He(({ node: ne, path: me }) => [
          ye(Y, {
            node: ne,
            path: me,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": w.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !_.value ? (f(), h("header", hd, [
          y("span", md, T(d.value), 1),
          g.value.length ? (f(), le(ts, {
            key: 0,
            items: g.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : L("", !0)
        ])) : L("", !0),
        o.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: k,
          class: "dc-window__desktop"
        }, [
          A.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Te({
              left: `${A.value.x}px`,
              top: `${A.value.y}px`,
              width: `${A.value.w}px`,
              height: `${A.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : L("", !0),
          (f(!0), h(Z, null, ce(u.value, (ne) => (f(), le(Uu, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: b.value.get(ne.key) ?? null
          }, {
            default: He(() => [
              ye(Y, {
                node: ne.held.node,
                path: ne.path,
                framed: ne.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (f(), h("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          R.value ? (f(), h("div", _d)) : L("", !0),
          (f(!0), h(Z, null, ce(i.value, (ne, me) => (f(), h(Z, {
            key: S(ne)
          }, [
            y("div", {
              class: "dc-window__cell",
              style: Te({ flexGrow: r.value[me] ?? 1 })
            }, [
              ye(Y, {
                node: ne,
                path: V.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < i.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": N.value ? "vertical" : "horizontal",
              "aria-label": Q(me),
              "aria-valuenow": re(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Ce) => _e(Ce, me),
              onKeydown: (Ce) => xe(Ce, me)
            }, null, 40, yd)) : L("", !0)
          ], 64))), 128))
        ], 8, gd)) : L("", !0)
      ], 8, vd));
    };
  }
}), kd = /* @__PURE__ */ pe(wd, [["__scopeId", "data-v-fb5b403f"]]), bd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], $d = {
  key: 1,
  class: "dc-window__empty"
}, xd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, nn = 16, Cd = /* @__PURE__ */ fe({
  __name: "WindowFrame",
  props: /* @__PURE__ */ dn({
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
  emits: /* @__PURE__ */ dn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = Nt(e, "layout"), o = Nt(e, "views"), i = Vt(), r = v(() => new Map(s.panels.map((c) => [c.id, c]))), u = v(() => s.panels.map((c) => c.id)), d = v(() => Su(l.value, u.value)), g = U(null), _ = U(null), w = U(null), k = U(!0), C = U(null), M = U(null), b = U(null), x = U(""), A = U(null);
    function R() {
      const c = A.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((m) => m.closest(".dc-window") === c).map((m) => ({ panels: (m.dataset.dcPanels ?? "").split(" "), element: m })) : [];
    }
    function N(c) {
      const p = [];
      let m = c.closest(".dc-float");
      for (; m; )
        p.unshift(Number(m.dataset.dcOrder ?? 0)), m = m.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function V() {
      return R().map((c) => ({ pane: c, order: N(c.element) })).sort((c, p) => {
        const m = Math.max(c.order.length, p.order.length);
        for (let E = 0; E < m; E += 1) {
          const z = (c.order[E] ?? -1) - (p.order[E] ?? -1);
          if (z !== 0) return z;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const S = (c) => R().find((p) => p.panels.includes(c)) ?? null;
    function F(c) {
      const p = r.value.get(c);
      if (!p) return "";
      const m = o.value[c];
      return m && p.views?.some((E) => E.key === m) ? m : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function Q(c, p) {
      o.value = { ...o.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const re = v(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function he(c) {
      return !s.movable || re.value < 1 || s.panels.length < 2 ? !1 : r.value.get(c)?.fixed !== !0;
    }
    function G(c, p) {
      const m = d.value;
      !c || !m || c === m || (l.value = c, p && a("panel-move", p));
    }
    function _e(c, p, m) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const E = (p - c.left) / c.width, z = (m - c.top) / c.height, B = 0.3;
      return E > B && E < 1 - B && z > B && z < 1 - B ? "center" : [
        { edge: "left", distance: E },
        { edge: "right", distance: 1 - E },
        { edge: "top", distance: z },
        { edge: "bottom", distance: 1 - z }
      ].reduce(
        (ae, q) => q.distance < ae.distance ? q : ae
      ).edge;
    }
    function xe(c, p) {
      const m = [...c.querySelectorAll(".dc-tab")], E = m.findIndex((z) => {
        const B = z.getBoundingClientRect();
        return p < B.left + B.width / 2;
      });
      return E === -1 ? m.length : E;
    }
    function $(c, p, m) {
      for (const { panels: E, element: z } of V().reverse()) {
        const B = z.getBoundingClientRect();
        if (c < B.left || c > B.right || p < B.top || p > B.bottom) continue;
        const ue = E.find((J) => J !== m), ae = z.querySelector(".dc-pane__tabs"), q = ae?.getBoundingClientRect();
        if (ae && q && p >= q.top && p <= q.bottom)
          return ue ? { panel: ue, edge: "center", index: xe(ae, c) } : null;
        const X = z.querySelector(":scope > .dc-pane__space");
        if (X) {
          const J = X.getBoundingClientRect();
          if (c >= J.left && c <= J.right && p >= J.top && p <= J.bottom) continue;
        }
        return ue ? { panel: ue, edge: _e(B, c, p) } : null;
      }
      return Y(c, p, m) ?? Ce(c, p);
    }
    function I() {
      const c = A.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function Y(c, p, m) {
      const E = d.value;
      if (!E) return null;
      for (const z of I()) {
        const B = z.getBoundingClientRect();
        if (c < B.left || c > B.right || p < B.top || p > B.bottom) continue;
        const ue = Ke(z), ae = ue.flatMap((ie) => ie.panels).find((ie) => ie !== m);
        if (!ae && ue.length > 0) return null;
        const q = Se(E, m)?.rect, X = xn(
          {
            x: c - B.left - 24,
            y: p - B.top - 12,
            w: q?.w ?? pt.w,
            h: q?.h ?? pt.h
          },
          { w: z.clientWidth, h: z.clientHeight },
          s.minPanelSize
        );
        if (ae) return { panel: ae, edge: "float", rect: X };
        const J = ne(z);
        return J ? { panel: "", space: J, edge: "float", rect: X } : null;
      }
      return null;
    }
    function ne(c) {
      const p = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function me() {
      const c = A.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === c).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const m = ne(p);
        return m ? [{ element: p, path: m }] : [];
      }) : [];
    }
    function Ce(c, p) {
      for (const { element: m, path: E } of me()) {
        if (m.dataset.dcSpace === "desktop") continue;
        const z = m.getBoundingClientRect();
        if (!(c < z.left || c > z.right || p < z.top || p > z.bottom))
          return { panel: "", space: E, edge: "center" };
      }
      return null;
    }
    function Ke(c) {
      return R().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let qe = null;
    const Ve = (c) => c.altKey;
    function We(c, p) {
      if (!he(c) || _.value || M.value || p.button !== 0) return;
      const m = p.clientX, E = p.clientY;
      let z = !1, B = Ve(p);
      const ue = () => {
        const de = b.value;
        de && (w.value = B ? Y(de.x, de.y, c) : $(de.x, de.y, c));
      }, ae = (de) => {
        if (!z) {
          if (Math.hypot(de.clientX - m, de.clientY - E) < 4) return;
          z = !0, _.value = c, C.value = null;
        }
        B = Ve(de), k.value = !B, b.value = { x: de.clientX, y: de.clientY }, ue();
      }, q = (de) => {
        Ve(de) !== B && (B = !B, k.value = !B, z && ue());
      }, X = (de) => {
        qe?.();
        const ee = w.value, Pe = d.value;
        if (de && z && ee && Pe) {
          const st = ee.space ? Os(Pe, c, ee.space, ee.rect) : ee.edge === "float" && ee.rect ? Is(Pe, c, ee.panel, ee.rect) : tn(Pe, c, ee.panel, ee.edge, ee.index);
          G(st, {
            panel: c,
            target: ee.panel,
            edge: ee.edge,
            ...ee.space === void 0 ? {} : { space: ee.space },
            ...ee.index === void 0 ? {} : { index: ee.index },
            ...ee.rect === void 0 ? {} : { rect: ee.rect }
          });
        }
        _.value = null, w.value = null, b.value = null, k.value = !0;
      }, J = () => X(!0), ie = () => X(!1), ge = (de) => {
        if (de.key === "Escape") {
          X(!1);
          return;
        }
        q(de);
      };
      qe = () => {
        window.removeEventListener("pointermove", ae), window.removeEventListener("pointerup", J), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", ge), window.removeEventListener("keyup", q), qe = null;
      }, window.addEventListener("pointermove", ae), window.addEventListener("pointerup", J), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", ge), window.addEventListener("keyup", q);
    }
    et(() => qe?.());
    let Re = null;
    function Ie(c) {
      const p = A.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((z) => z.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function D(c) {
      const p = d.value;
      return p ? Nn(p, c) : null;
    }
    function K(c) {
      const p = d.value;
      if (!p) return;
      const m = It(p, c);
      m !== p && (l.value = m);
    }
    function W(c) {
      const p = D(c);
      p && K(p);
    }
    function O(c) {
      const p = d.value, m = p ? Se(p, c) : null;
      return m !== null && at(m);
    }
    function H(c) {
      const p = d.value, m = p ? Se(p, c) : null;
      return m !== null && dt(m);
    }
    function se(c) {
      const p = d.value, m = p ? ct(p, c) : null;
      return m ? Ae(m.node) : "";
    }
    function ze(c) {
      const p = d.value, m = p ? ct(p, c) : null;
      if (!p || !m) return;
      const E = Ae(m.node);
      if (r.value.get(E)?.fixed === !0) return;
      const z = !dt(m);
      let B = mu(p, c, z);
      B !== p && (z || (B = It(B, c)), l.value = B, a("frame-minimize", { panel: E, minimized: z }));
    }
    function Ee(c) {
      const p = D(c);
      p && ze(p);
    }
    function Tt(c) {
      const p = d.value, m = p ? ct(p, c) : null;
      if (!p || !m) return;
      const E = Ae(m.node);
      if (r.value.get(E)?.fixed === !0) return;
      const z = !at(m);
      let B = hu(p, c, z);
      B !== p && (z && (B = It(B, c)), l.value = B, a("frame-maximize", { panel: E, maximized: z }));
    }
    function vs(c) {
      const p = D(c);
      p && Tt(p);
    }
    function hs(c, p, m) {
      const E = d.value, z = E ? ct(E, c) : null;
      if (!E || !z || p.button !== 0 || _.value || M.value) return;
      const B = Ae(z.node);
      if (r.value.get(B)?.fixed === !0 || at(z) || dt(z) || (m === "move" ? !s.movable : !s.resizable)) return;
      const ue = Ie(c), ae = gu(E, c);
      K(c);
      const q = { w: ue?.clientWidth ?? 0, h: ue?.clientHeight ?? 0 }, X = { ...z.rect }, J = p.clientX, ie = p.clientY, ge = s.minPanelSize;
      M.value = B;
      const de = (Le) => {
        const Ye = d.value;
        if (!Ye) return;
        const Rt = Ds(Ye, ae, xn(Le, q, ge));
        Rt !== Ye && (l.value = Rt);
      }, ee = (Le) => {
        Le.preventDefault();
        const Ye = Le.clientX - J, Rt = Le.clientY - ie;
        de(
          m === "move" ? { ...X, x: X.x + Ye, y: X.y + Rt } : Ns(X, m, Ye, Rt, ge)
        );
      }, Pe = (Le) => {
        if (Re?.(), M.value = null, !Le) {
          de(X);
          return;
        }
        const Ye = d.value ? ct(d.value, ae) : null;
        Ye && a("frame-change", { panel: se(ae), rect: Ye.rect });
      }, st = () => Pe(!0), ot = () => Pe(!1), it = (Le) => {
        Le.key === "Escape" && Pe(!1);
      };
      Re = () => {
        window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", st), window.removeEventListener("pointercancel", ot), window.removeEventListener("keydown", it), Re = null;
      }, window.addEventListener("pointermove", ee), window.addEventListener("pointerup", st), window.addEventListener("pointercancel", ot), window.addEventListener("keydown", it);
    }
    function ja(c, p, m) {
      const E = D(c);
      E && hs(E, p, m);
    }
    function Xa(c, p, m = !1) {
      const E = d.value, z = D(c), B = E && z ? ct(E, z) : null;
      if (!E || !z || !B || r.value.get(c)?.fixed === !0 || (m ? !s.resizable : !s.movable)) return;
      if (at(B) || dt(B)) {
        x.value = `${Ue(c)} is ${at(B) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ue = p === "left" ? -nn : p === "right" ? nn : 0, ae = p === "up" ? -nn : p === "down" ? nn : 0, q = Ie(z), X = { w: q?.clientWidth ?? 0, h: q?.clientHeight ?? 0 }, J = m ? Ns(B.rect, "se", ue, ae, s.minPanelSize) : { ...B.rect, x: B.rect.x + ue, y: B.rect.y + ae }, ie = Ds(E, z, xn(J, X, s.minPanelSize));
      if (ie === E) {
        x.value = m ? `${Ue(c)} cannot be resized further.` : `${Ue(c)} cannot move ${p}.`;
        return;
      }
      l.value = ie;
      const ge = ct(ie, z);
      ge && (a("frame-change", { panel: c, rect: ge.rect }), x.value = m ? `${Ue(c)} resized to ${ge.rect.w} by ${ge.rect.h}.` : `${Ue(c)} moved to ${ge.rect.x}, ${ge.rect.y}.`);
    }
    et(() => Re?.());
    function Ga(c, p) {
      const m = S(c), E = m?.element.getBoundingClientRect();
      if (!m || !E) return null;
      const z = p === "left" || p === "right", B = (q) => {
        if (!(z ? q.bottom > E.top + 1 && q.top < E.bottom - 1 : q.right > E.left + 1 && q.left < E.right - 1)) return null;
        const J = p === "left" ? E.left - q.right : p === "right" ? q.left - E.right : p === "up" ? E.top - q.bottom : q.top - E.bottom;
        return J < -1 ? null : J;
      }, ue = [];
      for (const q of R()) {
        if (q === m || q.element === m.element) continue;
        const X = B(q.element.getBoundingClientRect());
        if (X === null) continue;
        const J = q.panels.find((ie) => ie !== c);
        J && ue.push({ to: { panel: J }, distance: X });
      }
      for (const { element: q, path: X } of me()) {
        const J = B(q.getBoundingClientRect());
        J !== null && ue.push({ to: { space: X }, distance: J });
      }
      return ue.reduce(
        (q, X) => q && q.distance <= X.distance ? q : X,
        null
      )?.to ?? null;
    }
    function Ya(c) {
      const p = d.value ? Se(d.value, c) !== null : !1;
      if (!p && !he(c)) return;
      C.value = C.value === c ? null : c;
      const m = Ue(c);
      if (!C.value) {
        x.value = `${m}: move mode off.`;
        return;
      }
      x.value = p ? `${m}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${m}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ue = (c) => r.value.get(c)?.title ?? c, Qa = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Za(c, p, m = !1) {
      if (!he(c)) return;
      const E = d.value;
      if (!E) return;
      const z = Ue(c), B = kt(E, c);
      if (!m && B && (p === "left" || p === "right") && B.panels.length > 1) {
        const ie = B.panels.indexOf(c), ge = p === "left" ? ie - 1 : ie + 1;
        if (ge >= 0 && ge < B.panels.length) {
          G(Ot(E, c, ge), { panel: c, target: c, edge: "center", index: ge }), x.value = `${z} moved ${p}, now tab ${ge + 1} of ${B.panels.length}.`, _n(c);
          return;
        }
      }
      const ae = Ga(c, p);
      if (!ae || ae.panel !== void 0 && !he(ae.panel)) {
        x.value = `${z} cannot move ${p}.`;
        return;
      }
      const q = Qa[p];
      if (ae.space) {
        const ie = ae.space, ge = rt(E, ie), de = Se(E, c)?.rect, ee = { ...pt, ...de ? { w: de.w, h: de.h } : {} };
        G(Os(E, c, ie, ee), { panel: c, target: "", space: ie, edge: q }), x.value = `${z} moved ${p}, into ${ge ? Et(ge) : "the space"}.`, _n(c);
        return;
      }
      const X = ae.panel, J = B?.panels.length === 1 && kt(E, X)?.panels.length === 1;
      m ? (G(tn(E, c, X, "center"), {
        panel: c,
        target: X,
        edge: "center"
      }), x.value = `${z} joined ${Ue(X)} as a tab.`) : J ? (G(on(E, c, X), { panel: c, target: X, edge: q }), x.value = `${z} moved ${p}, trading places with ${Ue(X)}.`) : (G(tn(E, c, X, q), { panel: c, target: X, edge: q }), x.value = `${z} moved ${p}, beside ${Ue(X)}.`), _n(c);
    }
    function _n(c) {
      Kt(() => {
        S(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Ja(c, p) {
      const m = d.value;
      m && (l.value = cn(m, c, p));
    }
    function yn(c) {
      const p = d.value;
      if (!p) return;
      const m = $t(p, c);
      m !== p && (l.value = m, a("tab-select", { panel: c }));
    }
    function ms(c) {
      return r.value.get(c)?.closable ?? s.closable;
    }
    function el(c) {
      ms(c) && a("panel-close", c);
    }
    const wn = U(/* @__PURE__ */ new Map());
    let tl = 0;
    function nl(c, p) {
      const m = tl += 1;
      return wn.value.set(m, { panel: c, items: p }), () => {
        wn.value.delete(m);
      };
    }
    function sl(c) {
      const p = [];
      for (const m of wn.value.values())
        m.panel() === c && p.push(...m.items());
      return p;
    }
    function gs(c) {
      const p = c.filter((m) => m.items.length > 0);
      return p.length < 2 ? p.flatMap((m) => m.items) : p.flatMap((m) => [
        { id: m.id, heading: !0, label: m.title },
        ...m.items
      ]);
    }
    const _s = (c) => c.title || "These tabs";
    function al(c, p) {
      const m = p.id, E = kt(c, m), z = (E?.panels.length ?? 0) > 1, B = E?.fixedView === !0, ue = (J) => ({
        action: () => {
          J !== c && (l.value = J);
        }
      }), ae = [], q = [], X = p.views ?? [];
      if (X.length > 1 && !B) {
        const J = F(m);
        ae.push({
          id: "view",
          label: "View",
          items: X.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === J,
            action: () => Q(m, ie.key)
          }))
        });
      }
      return z && !B && q.push(
        { id: "show-row", label: "Row", checked: !1, ...ue(Bs(c, m, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ue(Bs(c, m, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ue(ku(c, m))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ue(bu(c, m))
        }
      ), z && E && (q.length && q.push({ separator: !0 }), q.push(...ys(E, m))), { panel: ae, tabs: q, tabsTitle: E ? _s(E) : "" };
    }
    function ys(c, p) {
      const m = gt(c), E = (z) => {
        const B = c.panels[(m + z + c.panels.length) % c.panels.length];
        return (B === void 0 ? "" : Ae(B)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => yn(E(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => yn(E(-1)) }
      ];
    }
    function Jt(c) {
      return c.title ? c.title : j(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : Et(c);
    }
    function ws(c) {
      if (!c || te(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Be(c)) return null;
      const p = Ua(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function ll(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const m = rt(p, c);
      if (!m || j(m)) return [];
      if (m.fixedView) return [];
      const E = te(m) ? "desktop" : m.direction, z = (ee, Pe, st) => ({
        id: `show-${ee}`,
        label: Pe,
        checked: E === ee,
        action: () => {
          const ot = d.value, it = st();
          !ot || it === m || (l.value = vn($e(ht(ot, c, it))));
        }
      }), B = () => {
        const ee = Ka(m, rl(m));
        if (j(ee) && ee.panels.length === 0) return m;
        const Pe = j(ee) && ee.panels.length === 1 ? ee.panels[0] : void 0;
        return Pe !== void 0 && ve(Pe) ? m : ee;
      }, ue = (ee) => () => te(m) ? Wa(m, ee) : m.direction === ee ? m : { ...m, direction: ee }, ae = c.slice(0, -1), q = c.length > 0 ? rt(p, ae) : null, X = q && j(q) && q.panels.length > 1 ? q : null, J = q && ws(q) === m ? q : null, ie = ws(m), ge = m.title || "this space", de = (ee, Pe, st, ot, it) => ({
        id: ee,
        label: it,
        action: () => {
          const Le = d.value;
          Le && (l.value = vn($e(ht(Le, Pe, Cu(st, ot)))));
        }
      });
      return gs([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: m.title || "This space",
          items: [
            z("row", "Row", ue("row")),
            z("column", "Column", ue("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            z("tabs", "Tabs", () => B()),
            z("desktop", "Desktop", () => te(m) ? m : Va(m))
          ]
        },
        {
          id: "about-around",
          title: ie ? `Around ${Jt(ie)}` : "",
          items: ie ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ie.title ? [] : [de("merge-around-keep-this", c, m, "outer", `Keep ${ge}`)],
            ...m.title ? [] : [de("merge-around-keep-that", c, m, "inner", `Keep ${Jt(ie)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: J ? `Inside ${Jt(J)}` : "",
          items: J ? [
            ...m.title ? [] : [de("merge-inside-keep-that", ae, J, "outer", `Keep ${Jt(J)}`)],
            ...J.title ? [] : [de("merge-inside-keep-this", ae, J, "inner", `Keep ${ge}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: X ? _s(X) : "",
          items: X ? ys(X, Ae(m)) : []
        }
      ]);
    }
    function rl(c) {
      const p = g.value;
      return p && oe(c, p) ? p : void 0;
    }
    function ol(c) {
      const p = d.value, m = r.value.get(c);
      if (!p || !m) return [];
      const E = s.menu ? al(p, m) : null, z = sl(c);
      z.length && E?.panel.length && z.push({ separator: !0 }), E && z.push(...E.panel);
      const B = gs([
        { id: "about-panel", title: m.title, items: z },
        { id: "about-tabs", title: E?.tabsTitle ?? "", items: E?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(m, B) : B;
    }
    function il(c, p) {
      return i[`${c}-${p}`] ?? i[c];
    }
    function ks(c, p, m, E) {
      return il(c, p.id)?.({ panel: p, view: m, active: E });
    }
    Eu({
      panelFor: (c) => r.value.get(c) ?? null,
      viewFor: F,
      setView: Q,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: g,
      dragging: _,
      dropTarget: w,
      moving: C,
      framing: M,
      canMove: he,
      focus(c) {
        g.value !== c && (g.value = c, a("panel-activate", c));
      },
      selectPanel: yn,
      beginDrag: We,
      toggleMoveMode: Ya,
      nudge: Za,
      setSizes: Ja,
      frameOf: (c) => d.value ? Se(d.value, c) : null,
      beginFrameDrag: ja,
      nudgeFrame: Xa,
      raise: W,
      maximized: O,
      toggleMaximize: vs,
      minimized: H,
      toggleMinimize: Ee,
      beginFrameDragAt: hs,
      raiseAt: K,
      toggleMaximizeAt: Tt,
      toggleMinimizeAt: ze,
      menuFor: ol,
      spaceMenu: ll,
      registerMenu: nl,
      closable: ms,
      close: el,
      renderContent: (c, p, m) => ks("panel", c, p, m),
      renderActions: (c, p, m) => ks("actions", c, p, m),
      layout: d
    });
    const cl = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), ul = () => {
      const c = _.value, p = b.value;
      return !c || !p ? null : hl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${p.x}px`, top: `${p.y}px` },
          "aria-hidden": "true"
        },
        r.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, p, m, E) {
        const z = d.value;
        z && G(tn(z, c, p, m, E), {
          panel: c,
          target: p,
          edge: m,
          ...E === void 0 ? {} : { index: E }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (l.value = $t(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, m) {
        const E = d.value;
        E && G(Is(E, c, p, m), {
          panel: c,
          target: p,
          edge: "float",
          rect: m
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, p) {
        const m = d.value;
        if (!m) return;
        const E = fu(m, c, p);
        if (E === m) return;
        l.value = E;
        const z = Se(E, c);
        z && a("frame-change", { panel: c, rect: z.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: Q,
      /** Brings a floating frame to the front of its stack. */
      raise: W,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: vs,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Ee
    }), (c, p) => (f(), h("div", {
      ref_key: "root",
      ref: A,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": _.value ? "true" : "false",
      "data-dc-docking": k.value ? "true" : "false",
      style: Te(cl.value)
    }, [
      d.value ? (f(), le(kd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", $d, " This window has no panels. ")),
      ye(ul),
      y("p", xd, T(x.value), 1)
    ], 12, bd));
  }
}), Md = /* @__PURE__ */ pe(Cd, [["__scopeId", "data-v-711565af"]]);
function jd(e = "", t = "/") {
  const n = U(Ze(e)), s = U(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(l) {
      n.value = Ze(l), a.push(`${s.value}${n.value}`);
    },
    replace(l) {
      n.value = Ze(l), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Vs(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Ze(s === -1 ? n : n.slice(0, s));
}
function Xd(e) {
  const t = U(Vs(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), s = be(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Vs(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${Ze(a)}`),
    replace: (a) => e.replace(`${n.value}${Ze(a)}`),
    dispose: s
  };
}
const Sd = {
  DataShell: Lc,
  ShellHeader: ga,
  QueryPanel: ya,
  RecordActions: wa,
  ResultsArea: Ea,
  FacetControl: _a,
  SegmentedControl: Hc,
  StatusPill: Ht,
  WindowFrame: Md,
  WindowPane: Ha,
  ListView: Tn,
  CardsView: ba,
  GridView: $a,
  TableView: Ma,
  LinksView: xa,
  PreviewView: Ca,
  TypeCardsView: Sa
}, Gd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Sd))
      e.component(`${n}${s}`, a);
    t.route && e.provide(js, t.route);
  }
};
export {
  pn as CASCADE_STEP,
  zd as COLUMN_BREAKPOINTS,
  Ad as COLUMN_ROLES,
  ba as CardsView,
  Ls as ColumnCell,
  pt as DEFAULT_FRAME,
  En as DEFAULT_SORT,
  gl as DEFAULT_VIEW,
  Lc as DataShell,
  Pn as EMPTY_CELL,
  pa as ENTITY_ALL,
  fn as ENTITY_TERM,
  qt as EXPRESSION_TERM,
  Qn as FACET_PREFIX,
  _a as FacetControl,
  $a as GridView,
  Gd as HeaderContentLayoutPlugin,
  xa as LinksView,
  Tn as ListView,
  yt as MINIMIZED_GAP,
  za as MINIMIZED_HEIGHT,
  Rn as MINIMIZED_WIDTH,
  Aa as MIN_FRAME,
  zs as MOCK_TINTS,
  Fd as MenuBar,
  ts as MenuButton,
  Pa as MenuList,
  jt as MetricDrill,
  ps as PANE_CONTEXT_KEY,
  Xn as PARAM_DIR,
  Un as PARAM_ENTITY,
  Gn as PARAM_EXPR,
  Yn as PARAM_PAGE,
  jn as PARAM_SORT,
  Hn as PARAM_VIEW,
  Jn as PinStar,
  Ca as PreviewView,
  ya as QueryPanel,
  en as RECORD_STATUSES,
  na as RESULT_FIELDS,
  js as ROUTE_ADAPTER_KEY,
  wa as RecordActions,
  Ea as ResultsArea,
  fa as SHELL_CONTEXT_KEY,
  Pd as SHELL_THEMES,
  Xt as ScopeMark,
  Hc as SegmentedControl,
  At as SelectTick,
  Ld as ShellCard,
  ga as ShellHeader,
  Ht as StatusPill,
  Ma as TableView,
  Sa as TypeCardsView,
  Xs as VIEW_KINDS,
  _l as VIEW_LABELS,
  ds as WINDOW_CONTEXT_KEY,
  Md as WindowFrame,
  Ha as WindowPane,
  Ra as activePanel,
  gt as activeTab,
  ua as addTerm,
  Vn as andExpression,
  uu as axisOf,
  as as cascade,
  la as cellFull,
  Wt as cellText,
  ln as cellTextOf,
  De as cellValue,
  bs as changesResults,
  xn as clampRect,
  Ka as collapseSpace,
  ku as collapseToTabs,
  Dd as column,
  xs as columnAlign,
  Cs as columnClass,
  $s as columnKey,
  An as columnTruncates,
  xl as columnsFor,
  wl as countPages,
  ml as createHistoryAdapter,
  jd as createMemoryAdapter,
  Yl as createMockDataSource,
  Xd as createVueRouterAdapter,
  Sl as defaultCellText,
  qs as defaultLayout,
  qn as defaultQuery,
  Jl as drillExpression,
  Os as dropIntoSpace,
  St as emptyFacetState,
  Bn as emptyFacetValue,
  Zl as excludingTerm,
  ut as findEntity,
  lt as findSort,
  Od as fixedView,
  ss as float,
  Is as floatPanel,
  Va as floatSplit,
  bu as floatTabs,
  an as fnv1a,
  Qs as focusEntity,
  _t as formatCount,
  bl as formatDate,
  wt as formatExpression,
  kl as formatMetric,
  $l as formatOrdinal,
  Ut as formatTerm,
  mn as frame,
  ct as frameAt,
  Se as frameOf,
  Nn as framePathOf,
  Ae as frontPanel,
  jl as generateRows,
  Nd as group,
  kt as groupOf,
  du as groups,
  ta as hasActiveFacets,
  oe as hasPanel,
  Id as headless,
  Ft as insertPanel,
  Dt as isChoosable,
  Td as isEntityScoped,
  ea as isFacetActive,
  te as isFloat,
  j as isGroup,
  at as isMaximized,
  dt as isMinimized,
  ve as isPanelTab,
  hn as isPristineQuery,
  zt as isSplit,
  Ne as isTabOf,
  Kn as isTypeCardsQuery,
  Gs as isViewKind,
  Es as joinExpression,
  Dl as matchesExpression,
  Xl as matchesFacets,
  pu as maximizeFrame,
  hu as maximizeFrameAt,
  Cu as mergeSpace,
  vu as minimizeFrame,
  mu as minimizeFrameAt,
  tn as movePanel,
  Ot as moveTab,
  Rd as negateTerm,
  rt as nodeAt,
  Bt as nodeTitle,
  $e as normalizeLayout,
  Ze as normalizeSearch,
  cs as normalizeSizes,
  Ua as onlySpace,
  As as oppositeTerm,
  nt as panelIds,
  Xe as panelNode,
  Fs as panelTabs,
  tt as parseExpression,
  rr as parseQuery,
  So as presentParts,
  ka as presentRow,
  Ge as pressOptions,
  Hu as providePaneContext,
  er as provideShellContext,
  Eu as provideWindowContext,
  Cn as raiseFrame,
  It as raiseFrameAt,
  gu as raisedPath,
  sa as reconcileFacets,
  Su as reconcileLayout,
  ca as recordTerm,
  vt as removePanel,
  ht as replaceAt,
  Ns as resizeRect,
  Ks as resizeSplit,
  Ys as resolveView,
  Oe as roleColumn,
  aa as roleColumns,
  vn as rootSpace,
  rs as row,
  Ml as rowKey,
  ra as sameTerm,
  Ql as scopeTerm,
  Wn as scopeTermFor,
  da as scopedEntity,
  Rs as serializeQuery,
  $t as setActivePanel,
  fu as setFrameRect,
  Ds as setFrameRectAt,
  cn as setSizesAt,
  qd as setSplitDirection,
  Je as sizesOf,
  Js as sortsFor,
  we as spaceChrome,
  Et as spaceTitle,
  ls as split,
  Ol as splitExpression,
  Bs as spreadTabs,
  ir as summarizeQuery,
  Zn as summaryTerms,
  on as swapPanels,
  ns as tabNode,
  Yt as tabPanels,
  Wa as tileFloat,
  Vd as toFloat,
  Wd as toTiled,
  Bd as toggleMaximized,
  Kd as toggleMinimized,
  Oi as useColumns,
  dr as useEntityCounts,
  tc as useEntityPreviews,
  Ud as usePaneContext,
  Hd as usePaneMenu,
  Pt as usePresentedRows,
  cr as useQueryState,
  vr as useRecordNames,
  ur as useResults,
  Me as useShellContext,
  fs as useWindowContext,
  Il as withoutTerm
};
