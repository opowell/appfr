import { ref as U, inject as xt, provide as In, computed as v, toValue as Rt, shallowRef as Ct, watch as be, onScopeDispose as Ws, defineComponent as fe, onBeforeUnmount as et, openBlock as f, createElementBlock as h, createElementVNode as k, toDisplayString as A, Fragment as Z, renderList as ce, createCommentVNode as z, unref as E, withKeys as dt, withModifiers as Fe, normalizeStyle as Te, renderSlot as ke, withDirectives as Mn, vModelText as Sn, useSlots as Vt, nextTick as Kt, createBlock as le, createTextVNode as je, createVNode as ye, withCtx as He, resolveDynamicComponent as On, normalizeClass as un, createSlots as sn, useModel as Ft, useId as Us, mergeModels as dn, Comment as dl, Text as fl, onMounted as pl, resolveComponent as Hs, getCurrentScope as vl, h as hl } from "vue";
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
  const a = (l, r) => {
    const o = Ze(l);
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
], zd = [480, 620, 760, 900, 1100], _l = "cards", En = "updated";
function Gs(e) {
  return typeof e == "string" && Xs.includes(e);
}
const gl = {
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
function yt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Qs(e, t = {}) {
  const n = yt(e, t.entity), s = e.entities[0];
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
function at(e, t, n = null) {
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
function Mt(e) {
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
    view: t.view && Gs(t.view) ? t.view : _l,
    sort: at(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Mt(s),
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
    const r = e[l];
    if (s) {
      r === s ? s = null : n += r;
      continue;
    }
    if (r === '"' || r === "'") {
      s = r;
      continue;
    }
    if (/\s/.test(r)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += r;
  }
  return a(), t;
}
function rt(e) {
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
    const r = a.length > 1 && a.startsWith("-"), o = r ? a.slice(1) : a, i = r ? { negated: !0 } : {}, u = Al.exec(o);
    u && u[3] !== "" ? s.push({
      kind: "field",
      field: u[1].toLowerCase(),
      comparator: u[2],
      value: u[3],
      ...i
    }) : s.push({ kind: "text", value: o, ...i });
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
  const r = n.facets.find((u) => kn(u.label) === s);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = Tl.find(([u]) => u === s)?.[1];
  if (o) {
    const u = Oe(a, o);
    if (u) return De(u, t);
  }
  const i = /^metric(\d+)$/.exec(s);
  if (i) {
    const u = aa(a, "metric")[Number(i[1]) - 1];
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
    const r = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = Oe(r, o), u = i ? De(i, t) : void 0;
      return typeof u == "string" && bn(u, e.value);
    });
  }
  const s = Rl(e.field, t, n);
  if (s === void 0) return null;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (o) => e.comparator === "=" ? Ms(String(o), e.value) : bn(String(o), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const r = e.value.toLowerCase();
      return r === "true" || r === "yes" ? s : r === "false" || r === "no" ? !s : null;
    }
    if (typeof s == "number") {
      const r = Number(e.value);
      return Number.isFinite(r) ? s === r : null;
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
function Nt(e) {
  return e.filter((t) => t.length).map((t) => t.map(Ut).join(" ")).join(" OR ");
}
function Il(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, r) => r !== n) : s).filter((s) => s.length);
}
function Ol(e) {
  const t = rt(e);
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
  const n = rt(e), s = rt(t);
  return n.length ? s.length ? Nt(
    n.flatMap((a) => s.map((l) => [...a, ...Bl(a, l)]))
  ) : Nt(n) : Nt(s);
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
  for (let r = 0; r < Math.min(ql, s); r++)
    l.push(ia(e, (a + r) % s));
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
  return [...a].sort((l, r) => l - r).map((l) => e[l]);
}
function Hl(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: l } = t, r = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${r}`;
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
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const u = l[i % l.length], d = Math.floor(i / l.length), _ = an(`${s}:${e.key}:${u[0]}:${i}`), g = ia(e.key, i), w = new Date(a.getTime() - _ % 900 * 36e5).toISOString(), b = {};
    for (const C of e.columns ?? []) {
      const y = C.field ?? C.key;
      if (!y || C.value) continue;
      const $ = Hl(C, {
        hash: an(`${_}:${y}`),
        sample: u,
        revision: d,
        updatedAt: w
      });
      $ !== void 0 && (b[y] = $);
    }
    for (const C of e.facets)
      b[C.key] = Wl(C, an(`${_}:${C.key}`));
    for (const [C, y] of r)
      b[C] = y === e.key ? g : Vl(y, i, C, n);
    o.push({ id: g, entityKey: e.key, entityLabel: e.label, fields: b });
  }
  return o;
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
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", l = s === "date" || n.role === "updated";
  return (r, o) => {
    const i = De(n, r), u = De(n, o);
    return a ? Number(u ?? 0) - Number(i ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(i ?? "")) : String(u ?? "").localeCompare(String(i ?? ""));
  };
}
function Yl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const r = e.scopes ?? a.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = jl(s, { ...e, scopes: r });
    return t.set(s.key, o), o;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: r, offset: o }) {
      const i = rt(s.expr), u = l ? [l] : a.entities, d = [], _ = [];
      for (const b of u)
        for (const C of n(b, a))
          d.push(C), (l ? Xl(C, s.facets) : !0) && Dl(i, C, b) && _.push(C);
      const g = at(l, s.sort, a), w = _.sort(Gl(Zs(l, a), g.key));
      return s.dir === "asc" && w.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: w.slice(o, o + r),
        total: _.length,
        unfiltered: _.length === d.length
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
  const [s] = rt(t).flat();
  if (!s) return n;
  const a = rt(n);
  return a.some((o) => o.some((i) => ra(i, s))) ? n : a.some((o) => o.some((i) => As(i, s))) ? Nt(
    a.map(
      (o) => o.map((i) => As(i, s) ? s : i)
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
  const e = xt(fa, null);
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
    const a = s.indexOf("="), l = a === -1 ? s : s.slice(0, a), r = a === -1 ? "" : s.slice(a + 1);
    n.push([Qe(l), r]);
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
      const s = n.indexOf(zn), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + zn.length)).trim(), r = a === "" ? null : Number(a), o = l === "" ? null : Number(l);
      let i = r !== null && Number.isFinite(r) ? Ts(r, e.min, e.max) : null, u = o !== null && Number.isFinite(o) ? Ts(o, e.min, e.max) : null;
      return i !== null && u !== null && i > u && ([i, u] = [u, i]), { kind: "range", min: i, max: u };
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
  const s = qn(t, n), a = new Map(ha(e)), l = a.get(Un), r = l === void 0 ? s.entity : Qe(l), o = r === pa ? null : yt(t, r), i = a.get(Hn), u = i && Gs(Qe(i)) ? Qe(i) : s.view, d = a.get(jn), _ = at(o, d ? Qe(d) : n.sort, t), g = a.get(Xn), w = g ? Qe(g) === "asc" ? "asc" : "desc" : s.dir, b = a.get(Gn), C = a.get(Yn), y = C === void 0 ? 1 : Number(Qe(C)), $ = Number.isFinite(y) ? Math.max(1, Math.floor(y)) : 1, R = {};
  for (const B of o?.facets ?? []) {
    const F = a.get(`${Qn}${B.key}`);
    R[B.key] = F === void 0 ? Bn(B) : ar(B, F);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: _.key,
    dir: w,
    expr: b === void 0 ? "" : Qe(b),
    facets: sa(o, R),
    page: $
  };
}
function Rs(e, t, n = {}, s = "") {
  const a = qn(t, n), l = yt(t, e.entity), r = ha(s).filter(([_]) => !sr(_)), o = [], i = (_, g) => o.push([_, $n(g)]), u = l?.key ?? null;
  u !== a.entity && i(Un, u ?? pa), e.view !== a.view && i(Hn, e.view), e.sort !== a.sort && i(jn, e.sort), e.dir !== a.dir && i(Xn, e.dir), e.expr.trim() !== "" && i(Gn, e.expr);
  for (const _ of l?.facets ?? []) {
    const g = e.facets[_.key];
    if (!g) continue;
    const w = lr(g, _);
    w !== null && o.push([`${Qn}${_.key}`, $n(w)]);
  }
  e.page > 1 && i(Yn, String(e.page));
  const d = [
    ...r.map(([_, g]) => [$n(_), g]),
    ...o
  ];
  return d.length ? `?${d.map(([_, g]) => g === "" ? _ : `${_}=${g}`).join("&")}` : "";
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
  return rt(e.expr).forEach((s, a) => {
    s.forEach((l, r) => {
      n.push({
        id: `${qt}:${a}:${r}`,
        label: Ut(l),
        facetKey: qt,
        group: a,
        index: r,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function ir(e, t, n = null) {
  if (hn(e)) {
    const l = at(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = Zn(e, t).filter((l) => l.facetKey !== qt).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function cr(e) {
  const { adapter: t } = e, n = v(() => Rt(e.schema)), s = v(() => Rt(e.defaults) ?? {}), a = v(() => rr(t.search.value, n.value, s.value)), l = v(() => yt(n.value, a.value.entity)), r = v(() => l.value ?? Qs(n.value, s.value)), o = v(() => Js(l.value, n.value)), i = v(() => at(l.value, a.value.sort, n.value)), u = (y, $) => {
    const R = Rs(y, n.value, s.value, t.search.value);
    R !== t.search.value && ($ === "push" ? t.push(R) : t.replace(R));
  }, d = () => Rt(e.navigationMode) ?? "push", _ = () => Rt(e.facetNavigationMode) ?? "replace", g = (y, $) => {
    const R = y.page ?? (bs(y) ? 1 : a.value.page);
    u({ ...a.value, ...y, page: R }, $);
  }, w = (y, $) => {
    const R = a.value.facets[y];
    if (!R) return;
    const B = { ...a.value.facets, [y]: $(R) };
    g({ facets: B }, _());
  }, b = (y) => {
    const $ = y === null ? null : yt(n.value, y);
    return ($?.key ?? null) === a.value.entity ? {} : {
      entity: $?.key ?? null,
      sort: at($, a.value.sort, n.value).key,
      facets: Mt($)
    };
  }, C = (y) => {
    const $ = b(y);
    Object.keys($).length && g($, d());
  };
  return {
    query: a,
    entity: l,
    focus: r,
    sort: i,
    sorts: o,
    summary: v(() => ir(a.value, l.value, n.value)),
    terms: v(() => Zn(a.value, l.value)),
    isPristine: v(() => hn(a.value)),
    isEverything: v(() => a.value.entity === null),
    hasFacets: v(() => ta(a.value.facets)),
    setEntity: C,
    clearEntity: () => C(null),
    setView(y) {
      g({ view: y }, d());
    },
    setSort(y) {
      g({ sort: at(l.value, y, n.value).key }, d());
    },
    toggleDirection() {
      g({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(y) {
      g({ expr: y }, d());
    },
    narrow(y, $, R) {
      g({ expr: y, ...b($), ...R ? { view: R } : {} }, d());
    },
    setPage(y, $) {
      g({ page: Math.max(1, Math.floor(y)) }, $ ?? d());
    },
    setFacet(y, $) {
      w(y, () => $);
    },
    toggleChip(y, $) {
      w(y, (R) => R.kind !== "chips" ? R : { kind: "chips", selected: R.selected.includes($) ? R.selected.filter((F) => F !== $) : [...R.selected, $] });
    },
    setRange(y, $, R) {
      w(y, (B) => B.kind === "range" ? { kind: "range", min: $, max: R } : B);
    },
    toggleFlag(y) {
      w(
        y,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(y) {
      if (y.facetKey === fn) {
        C(null);
        return;
      }
      if (y.facetKey === qt) {
        const $ = Il(rt(a.value.expr), y.group ?? 0, y.index ?? 0);
        g({ expr: Nt($) }, d());
        return;
      }
      w(y.facetKey, ($) => $.kind === "chips" && y.option ? { kind: "chips", selected: $.selected.filter((R) => R !== y.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      g({ entity: null, expr: "", facets: Mt(null) }, d());
    },
    reset() {
      u(qn(n.value, s.value), d());
    },
    hrefFor(y) {
      const $ = { ...a.value, ...y };
      return $.page = y.page ?? (bs(y) ? 1 : a.value.page), $.facets = sa(yt(n.value, $.entity), $.facets), `${t.path.value}${Rs($, n.value, s.value, t.search.value)}`;
    }
  };
}
function ur(e) {
  const t = Ct([]), n = U(0), s = U(!1), a = Ct(null);
  let l = 0, r = null;
  const o = v(() => (e.query.value.page - 1) * e.limit.value), i = v(() => wl(n.value, e.limit.value)), u = () => {
    const y = e.query.value, $ = e.within?.value.trim();
    return $ ? { ...y, expr: Vn($, y.expr) } : y;
  }, d = (y) => {
    t.value = y.rows, n.value = y.total, a.value = null;
  }, _ = (y) => {
    a.value = y, t.value = [], n.value = 0;
  }, g = (y, $) => {
    let R = !0;
    const B = () => y === l, F = () => {
      R && (R = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return B();
      },
      insert(D, W) {
        if (!B()) return;
        const S = Array.isArray(D) ? D : [D];
        if (!S.length) return;
        F();
        const T = [...t.value];
        T.splice(W ?? T.length, 0, ...S), t.value = $ > 0 ? T.slice(0, $) : T, n.value += S.length;
      },
      set(D) {
        B() && (D.rows && (F(), t.value = $ > 0 ? D.rows.slice(0, $) : D.rows, n.value = D.rows.length), D.total !== void 0 && (n.value = D.total));
      },
      close() {
        B() && (s.value = !1);
      },
      fail(D) {
        B() && (_(D), s.value = !1);
      }
    };
  }, w = () => {
    const y = r;
    r = null, y?.();
  }, b = () => {
    const y = ++l;
    w();
    const $ = {
      query: u(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, R = e.source.value;
    if (R.stream) {
      s.value = !0;
      try {
        r = R.stream($, g(y, $.limit)) ?? null;
      } catch (F) {
        _(F), s.value = !1;
      }
      return;
    }
    let B;
    try {
      B = R.query($);
    } catch (F) {
      _(F);
      return;
    }
    if (!(B instanceof Promise)) {
      d(B), s.value = !1;
      return;
    }
    s.value = !0, B.then((F) => {
      y === l && d(F);
    }).catch((F) => {
      y === l && _(F);
    }).finally(() => {
      y === l && (s.value = !1);
    });
  }, C = v(() => {
    const y = u();
    return `${JSON.stringify(na.map(($) => y[$]))}|${y.page}`;
  });
  return be([e.source, C, e.schema, e.entity, e.limit], b, {
    immediate: !0
  }), Ws(() => {
    l++, w();
  }, !0), { rows: t, total: n, offset: o, pageCount: i, pending: s, error: a, refresh: b };
}
function dr(e) {
  const t = Ct(/* @__PURE__ */ new Map()), n = U(!0);
  let s = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++s, r = e.query.value, o = e.schema.value, i = e.entities.value, u = e.within?.value.trim() ?? "";
    n.value = hn(r) && !u;
    const d = u ? Vn(u, r.expr) : r.expr, _ = /* @__PURE__ */ new Map();
    for (const g of i) {
      const w = e.source.value.query({
        query: { ...r, entity: g.key, expr: d, facets: Mt(g), page: 1 },
        schema: o,
        entity: g,
        limit: 0,
        offset: 0
      });
      w instanceof Promise ? (_.set(g.key, { total: 0, pending: !0 }), w.then((b) => {
        if (l !== s) return;
        const C = new Map(t.value);
        C.set(g.key, { total: b.total, pending: !1 }), t.value = C;
      })) : _.set(g.key, { total: w.total, pending: !1 });
    }
    t.value = _;
  } };
}
const fr = 25, ma = (e, t) => e.toLowerCase() === t.toLowerCase();
function pr(e, t) {
  return e.find((n) => ma(n.id, t));
}
function vr(e) {
  const t = Ct(/* @__PURE__ */ new Map()), n = (r) => {
    if (r.facetKey !== qt || !r.field || !r.value) return null;
    const o = da(e.schema.value, r.field);
    return o ? { entity: o, id: r.value, key: `${o.key}:${r.value}` } : null;
  }, s = (r) => {
    const { entity: o, id: i } = r, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ca(o, i) ?? "",
        facets: Mt(o),
        sort: at(o, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: fr,
      offset: 0
    });
  }, a = (r, o) => {
    const i = ln(Oe(r.columns ?? [], "identity"), o);
    return i === Pn || ma(i, o.id) ? "" : i;
  }, l = () => {
    const r = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const d = n(u);
      d && !t.value.has(d.key) && r.set(d.key, d);
    }
    if (!r.size) return;
    const o = [...r.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), i = (u) => {
      const d = new Map(t.value);
      u.forEach((_, g) => {
        const { reference: w } = o[g], b = pr(_.rows, w.id);
        d.set(w.key, b ? a(w.entity, b) : "");
      }), t.value = d;
    };
    if (o.every(({ outcome: u }) => !(u instanceof Promise))) {
      i(o.map(({ outcome: u }) => u));
      return;
    }
    Promise.all(o.map(({ outcome: u }) => Promise.resolve(u))).then(i).catch(() => {
    });
  };
  return be([e.source, e.schema, e.terms], () => {
    try {
      l();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(r) {
      const o = n(r);
      return o && t.value.get(o.key) || null;
    }
  };
}
const hr = ["data-dc-expanded"], mr = { class: "dc-header__domain" }, _r = {
  key: 0,
  class: "dc-header__within"
}, gr = ["title"], yr = ["data-dc-more", "title"], wr = {
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
    const n = e, s = t, a = Me(), l = v(() => a.schema.value), r = v(
      () => a.hasFacets.value || !!a.query.value.expr.trim() || !!a.within.value
    ), o = v(() => l.value.formatCount ?? _t), i = dr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      entities: a.entities,
      within: a.within
    });
    function u(L) {
      if (n.hideCount) return L.count;
      if (L.key === a.query.value.entity && r.value) return o.value(a.total.value);
      if (i.pristine.value) return L.count;
      const V = i.counts.value.get(L.key);
      return V ? `${V.pending ? "~" : ""}${o.value(V.total)}` : L.count;
    }
    function d(L) {
      return `${L.label} · ${u(L)}`;
    }
    const _ = v(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${o.value(a.total.value)}`), g = v(() => {
      const L = a.within.value.trim();
      return L ? Zn({ ...a.query.value, expr: L, facets: {} }, null) : [];
    }), w = v(
      () => (n.views ?? [...Xs]).map((L) => ({ key: L, label: gl[L] }))
    ), b = v(() => Ys(a.query.value.view, n.views)), C = v(
      () => !(a.within.value && a.query.value.entity === null && b.value === "cards")
    );
    function y(L) {
      a.setView(L.target.value);
    }
    const $ = v(
      () => a.sorts.value.map((L) => ({ key: L.key, label: L.label }))
    ), R = v(
      () => $.value.length > 0 && a.query.value.entity !== null && !a.within.value
    );
    function B(L) {
      a.setSort(L.target.value);
    }
    const F = v(() => a.query.value.dir === "desc"), D = v(
      () => a.terms.value.filter((L) => L.facetKey !== fn).map((L, K, V) => {
        const I = V[K - 1];
        return {
          term: L,
          or: I?.group !== void 0 && L.group !== void 0 && L.group !== I.group
        };
      })
    ), W = vr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...g.value, ...a.terms.value])
    });
    function S(L) {
      return da(l.value, L)?.scopeLabel ?? L;
    }
    function T(L) {
      return L.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function Q(L) {
      const K = W.nameOf(L);
      return K ? `${L.negated ? "-" : ""}${S(L.field)}: ${T(K)}` : L.label;
    }
    function re(L) {
      const K = L.target.value;
      a.setEntity(K || null);
    }
    function he(L) {
      L.target?.closest("button, select, label") || s("toggle");
    }
    const G = U(null), ge = U("");
    function xe() {
      const L = G.value;
      if (!L) {
        ge.value = "";
        return;
      }
      const K = L.scrollLeft > 1, V = L.scrollWidth - L.clientWidth - L.scrollLeft > 1;
      ge.value = K && V ? "both" : K ? "start" : V ? "end" : "";
    }
    let x = null;
    be(
      G,
      (L) => {
        x?.disconnect(), x = null, xe(), !(!L || typeof ResizeObserver > "u") && (x = new ResizeObserver(xe), x.observe(L));
      },
      { flush: "post" }
    ), be(D, xe, { flush: "post" }), et(() => x?.disconnect());
    const N = v(() => a.query.value.page), Y = v(
      () => (a.pageCount.value > 1 || !!n.pagesNote) && !Kn(a.query.value)
    ), ne = v(
      () => `${a.pending.value ? "~" : ""}${_t(a.pageCount.value)}`
    ), me = v(() => {
      let L = `Page ${_t(N.value)} of ${ne.value}`;
      const K = a.rows.value.length;
      if (K) {
        const V = a.offset.value + 1, I = `${a.pending.value ? "~" : ""}${_t(a.total.value)}`;
        L += ` — rows ${_t(V)} to ${_t(V + K - 1)} of ${I}`;
      }
      return n.pagesNote ? `${L}
${n.pagesNote}` : L;
    }), Ce = U(null), Ke = v(() => Ce.value ?? String(N.value)), qe = v(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function Ve(L) {
      L.target.select();
    }
    function We(L) {
      const K = L.target, V = K.value.replace(/[^0-9]/g, "");
      K.value !== V && (K.value = V), Ce.value = V;
    }
    function Re(L) {
      const K = L.target, V = Number(Ce.value);
      Ce.value = null;
      const I = Number.isFinite(V) && V >= 1 ? Math.min(Math.trunc(V), Math.max(1, a.pageCount.value)) : N.value;
      K.value = String(I), I !== N.value && a.setPage(I);
    }
    function Ie(L) {
      const K = L.target;
      Ce.value = null, K.value = String(N.value), K.blur();
    }
    return (L, K) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      k("div", {
        class: "dc-header__trigger",
        onClick: he
      }, [
        k("span", mr, A(l.value.label), 1),
        g.value.length ? (f(), h("span", _r, [
          K[5] || (K[5] = k("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(Z, null, ce(g.value, (V) => (f(), h("span", {
            key: `scope:${V.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: Q(V)
          }, A(Q(V)), 9, gr))), 128))
        ])) : z("", !0),
        k("div", {
          ref_key: "termBar",
          ref: G,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ge.value,
          title: E(a).summary.value,
          onScroll: xe
        }, [
          C.value ? (f(), h("label", wr, [
            K[7] || (K[7] = k("span", { class: "dc-header__sr" }, "Type", -1)),
            k("span", kr, [
              k("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: E(a).query.value.entity ?? "",
                onFocus: K[0] || (K[0] = //@ts-ignore
                (...V) => E(i).refresh && E(i).refresh(...V)),
                onChange: re
              }, [
                k("option", $r, A(_.value), 1),
                (f(!0), h(Z, null, ce(E(a).entities.value, (V) => (f(), h("option", {
                  key: V.key,
                  value: V.key
                }, A(d(V)), 9, xr))), 128))
              ], 40, br),
              K[6] || (K[6] = k("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ])) : z("", !0),
          k("label", Cr, [
            K[9] || (K[9] = k("span", { class: "dc-header__sr" }, "View", -1)),
            k("span", Mr, [
              k("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: b.value,
                onChange: y
              }, [
                (f(!0), h(Z, null, ce(w.value, (V) => (f(), h("option", {
                  key: V.key,
                  value: V.key
                }, A(V.label), 9, Er))), 128))
              ], 40, Sr),
              K[8] || (K[8] = k("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          R.value ? (f(), h(Z, { key: 1 }, [
            k("label", Pr, [
              K[11] || (K[11] = k("span", { class: "dc-header__sr" }, "Sort", -1)),
              k("span", Ar, [
                k("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: E(a).sort.value.key,
                  onChange: B
                }, [
                  (f(!0), h(Z, null, ce($.value, (V) => (f(), h("option", {
                    key: V.key,
                    value: V.key
                  }, A(V.label), 9, Tr))), 128))
                ], 40, zr),
                K[10] || (K[10] = k("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            k("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: F.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${F.value ? "descending" : "ascending"}`,
              onClick: K[1] || (K[1] = (V) => E(a).toggleDirection())
            }, A(F.value ? "↓" : "↑"), 9, Rr)
          ], 64)) : z("", !0),
          (f(!0), h(Z, null, ce(D.value, (V) => (f(), h(Z, {
            key: V.term.id
          }, [
            V.or ? (f(), h("span", Lr, "or")) : z("", !0),
            k("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${Q(V.term)}`,
              "aria-label": `Remove ${Q(V.term)}`,
              onClick: (I) => E(a).removeTerm(V.term)
            }, A(Q(V.term)), 9, Fr)
          ], 64))), 128))
        ], 40, yr),
        k("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: K[2] || (K[2] = (V) => s("toggle"))
        }, [
          k("span", Dr, A(e.expanded ? "▲" : "▼"), 1),
          k("span", Ir, A(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Nr)
      ]),
      Y.value ? (f(), h("nav", Or, [
        k("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: N.value <= 1,
          onClick: K[3] || (K[3] = (V) => E(a).setPage(N.value - 1))
        }, [...K[12] || (K[12] = [
          k("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Br),
        k("span", {
          class: "dc-header__page dc-mono",
          title: me.value
        }, [
          k("input", {
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
              dt(Fe(Re, ["prevent"]), ["enter"]),
              dt(Fe(Ie, ["prevent"]), ["esc"])
            ],
            onBlur: Re
          }, null, 44, qr),
          k("span", Vr, "/ " + A(ne.value), 1)
        ], 8, Kr),
        k("span", Wr, A(me.value), 1),
        k("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: N.value >= E(a).pageCount.value,
          onClick: K[4] || (K[4] = (V) => E(a).setPage(N.value + 1))
        }, [...K[13] || (K[13] = [
          k("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Ur)
      ])) : z("", !0),
      L.$slots.actions ? (f(), h("div", Hr, [
        ke(L.$slots, "actions", {}, void 0, !0)
      ])) : z("", !0)
    ], 8, hr));
  }
}), pe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, _a = /* @__PURE__ */ pe(jr, [["__scopeId", "data-v-86011b72"]]), Xr = { class: "dc-facet" }, Gr = ["id"], Yr = { class: "dc-facet__body" }, Qr = ["aria-labelledby"], Zr = ["aria-pressed", "data-dc-active", "onClick"], Jr = ["aria-labelledby"], eo = ["aria-label", "placeholder", "onKeydown"], to = ["aria-label", "placeholder", "onKeydown"], no = ["aria-checked"], so = { class: "dc-switch__text" }, ao = ["data-dc-active"], lo = /* @__PURE__ */ fe({
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
    function l(_) {
      if (n.value.kind !== "chips") return;
      const g = a.value.has(_) ? n.value.selected.filter((w) => w !== _) : [...n.value.selected, _];
      s("update", { kind: "chips", selected: g });
    }
    const r = U(""), o = U("");
    be(
      () => n.value,
      (_) => {
        _.kind === "range" && (r.value = _.min === null ? "" : _.min, o.value = _.max === null ? "" : _.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(_) {
      if (typeof _ == "number") return Number.isFinite(_) ? _ : null;
      const g = _.trim();
      if (!g) return null;
      const w = Number(g);
      return Number.isFinite(w) ? w : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const _ = i(r.value), g = i(o.value);
      _ === n.value.min && g === n.value.max || s("update", { kind: "range", min: _, max: g });
    }
    function d() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (_, g) => (f(), h("div", Xr, [
      k("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, A(e.facet.label), 9, Gr),
      k("div", Yr, [
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
            onClick: (b) => l(w)
          }, A(w), 9, Zr))), 128))
        ], 8, Qr)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          Mn(k("input", {
            "onUpdate:modelValue": g[0] || (g[0] = (w) => r.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: dt(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, eo), [
            [Sn, r.value]
          ]),
          g[2] || (g[2] = k("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          Mn(k("input", {
            "onUpdate:modelValue": g[1] || (g[1] = (w) => o.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: dt(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, to), [
            [Sn, o.value]
          ])
        ], 8, Jr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          k("span", so, A(e.facet.text), 1),
          k("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...g[3] || (g[3] = [
            k("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, ao)
        ], 8, no)) : z("", !0)
      ])
    ]));
  }
}), ga = /* @__PURE__ */ pe(lo, [["__scopeId", "data-v-36d1334b"]]), ro = ["id"], oo = { class: "dc-panel__section dc-panel__rows" }, io = { class: "dc-panel__row" }, co = ["for"], uo = ["title", "aria-label", "onClick"], fo = ["id", "placeholder", "onKeydown"], po = { class: "dc-panel__actions" }, vo = ["disabled"], ho = {
  key: 0,
  class: "dc-panel__section"
}, mo = /* @__PURE__ */ fe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Vt(), a = Me(), l = v(() => Ol(a.query.value.expr)), r = v(() => l.value.parts.map(Ut)), o = U(l.value.text), i = U(null);
    be(
      () => l.value.text,
      (C) => {
        o.value = C;
      }
    );
    const u = v(() => o.value !== l.value.text);
    function d() {
      u.value && a.setExpression(Es(l.value.parts, o.value)), n("close");
    }
    function _(C) {
      const { parts: y, text: $ } = l.value;
      a.setExpression(Es(y.filter((R, B) => B !== C), $));
    }
    function g(C) {
      const { parts: y } = l.value;
      o.value || !y.length || (C.preventDefault(), _(y.length - 1));
    }
    function w() {
      o.value = "", a.clearFilters();
    }
    function b(C, y) {
      a.setFacet(C, y);
    }
    return Kt(() => i.value?.focus()), (C, y) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: y[2] || (y[2] = dt(Fe(($) => n("close"), ["stop"]), ["esc"]))
    }, [
      k("section", oo, [
        k("div", io, [
          k("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, co),
          k("div", {
            class: "dc-field",
            onMousedown: y[1] || (y[1] = Fe(($) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(Z, null, ce(r.value, ($, R) => (f(), h("button", {
              key: `${R}:${$}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${$}`,
              "aria-label": `Remove ${$}`,
              onClick: (B) => _(R)
            }, A($), 9, uo))), 128)),
            Mn(k("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": y[0] || (y[0] = ($) => o.value = $),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : E(a).schema.value.placeholder,
              onKeydown: [
                dt(Fe(d, ["prevent"]), ["enter"]),
                dt(g, ["backspace"])
              ]
            }, null, 40, fo), [
              [Sn, o.value]
            ])
          ], 32)
        ]),
        E(a).entity.value ? (f(!0), h(Z, { key: 0 }, ce(E(a).entity.value.facets, ($) => (f(), le(ga, {
          key: $.key,
          facet: $,
          value: E(a).query.value.facets[$.key],
          onUpdate: (R) => b($.key, R)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : z("", !0),
        k("div", po, [
          k("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          k("button", {
            type: "button",
            class: "dc-button",
            disabled: E(a).isPristine.value && !u.value,
            onClick: w
          }, " Reset ", 8, vo)
        ])
      ]),
      s["panel-section"] ? (f(), h("section", ho, [
        ke(C.$slots, "panel-section", {}, void 0, !0)
      ])) : z("", !0)
    ], 40, ro));
  }
}), ya = /* @__PURE__ */ pe(mo, [["__scopeId", "data-v-2642c02d"]]), _o = {
  key: 0,
  class: "dc-actions"
}, go = {
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
    ), r = v(() => t.selection.value.ids.length), o = v(() => t.rows.value.filter((g) => t.isSelected(g)).length), i = v(
      () => t.rows.value.length > 0 && o.value === t.rows.value.length
    ), u = v(() => o.value > 0 && !i.value), d = v(() => r.value ? `${r.value} selected` : "Select all");
    function _(g) {
      return r.value ? `${g} ${r.value}` : g;
    }
    return (g, w) => l.value ? (f(), h("div", _o, [
      a.value ? (f(), h("div", go, [
        k("label", yo, [
          k("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: i.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: w[0] || (w[0] = (b) => E(t).selectPage(!i.value))
          }, null, 40, wo),
          k("span", ko, A(d.value), 1)
        ]),
        r.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: w[1] || (w[1] = (b) => E(t).clearSelection())
        }, " Clear ")) : z("", !0)
      ])) : z("", !0),
      k("div", bo, [
        n.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: w[2] || (w[2] = (b) => E(t).create(n.value))
        }, [
          w[5] || (w[5] = k("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          je(" " + A(n.value.create), 1)
        ])) : z("", !0),
        n.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !r.value,
          onClick: w[3] || (w[3] = (b) => E(t).duplicate())
        }, A(_(n.value.duplicate)), 9, $o)) : z("", !0),
        n.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !r.value,
          onClick: w[4] || (w[4] = (b) => E(t).delete())
        }, A(_(n.value.delete)), 9, xo)) : z("", !0)
      ])
    ])) : z("", !0);
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
function Et() {
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
    }, A(e.status), 9, Eo));
  }
}), Ht = /* @__PURE__ */ pe(Po, [["__scopeId", "data-v-23e59fbf"]]), Ao = ["title"], zo = { key: 1 }, To = /* @__PURE__ */ fe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Me(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), l = v(() => Wt(t.column, t.entry.row));
    function r(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value, Ge(o));
    }
    return (o, i) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: r
    }, [
      ke(o.$slots, "default", {}, () => [
        je(A(l.value), 1)
      ], !0)
    ], 8, Ao)) : (f(), h("span", zo, [
      ke(o.$slots, "default", {}, () => [
        je(A(l.value), 1)
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
    }, A(e.pinned ? "★" : "☆"), 9, Ro));
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
    }, null, 40, Fo)) : z("", !0);
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
    return (l, r) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, Do)) : z("", !0);
  }
}), Xt = /* @__PURE__ */ pe(Io, [["__scopeId", "data-v-feb1c62d"]]), Oo = ["checked", "aria-label"], Pt = /* @__PURE__ */ fe({
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
    const t = Me(), n = Et(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), h("div", Bo, [
      (f(!0), h(Z, null, ce(E(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-card"
      }, [
        k("div", Ko, [
          k("span", qo, [
            E(t).selectable.value ? (f(), le(Pt, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : z("", !0),
            je(" " + A(r.ordinal) + " ", 1),
            s.value ? (f(), h("span", Vo, A(r.entityLabel), 1)) : z("", !0)
          ]),
          k("span", Wo, [
            r.parts.state ? (f(), le(Ht, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : z("", !0),
            ye(Xt, { entry: r }, null, 8, ["entry"]),
            E(t).pinnable.value ? (f(), le(Jn, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : z("", !0)
          ])
        ]),
        k("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => E(t).activate(r.row, E(Ge)(o))
        }, [
          r.parts.image ? (f(), le(es, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : z("", !0),
          k("span", Ho, [
            k("span", jo, A(r.parts.identity), 1),
            k("span", Xo, A(r.parts.reference), 1)
          ])
        ], 8, Uo),
        k("div", Go, [
          (f(!0), h(Z, null, ce(r.parts.metrics.slice(0, 2), (o) => (f(), le(jt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: He(() => [
              je(A(o.label) + " " + A(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), h("span", Yo, A(r.parts.updated), 1)) : z("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ba = /* @__PURE__ */ pe(Qo, [["__scopeId", "data-v-434bd32f"]]), Zo = { class: "dc-grid" }, Jo = ["onClick"], ei = { class: "dc-tile__scrim" }, ti = { class: "dc-tile__top dc-mono" }, ni = { class: "dc-tile__chip" }, si = { class: "dc-tile__caption" }, ai = { class: "dc-tile__secondary dc-truncate" }, li = { class: "dc-tile__primary" }, ri = /* @__PURE__ */ fe({
  __name: "GridView",
  setup(e) {
    const t = Me(), n = Et();
    return (s, a) => (f(), h("div", Zo, [
      (f(!0), h(Z, null, ce(E(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        k("button", {
          type: "button",
          class: "dc-tile",
          style: Te({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => E(t).activate(l.row, E(Ge)(r))
        }, [
          l.parts.image ? (f(), le(es, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : z("", !0),
          k("span", ei, [
            k("span", ti, [
              k("span", ni, A(l.ordinal), 1)
            ]),
            k("span", si, [
              k("span", ai, A(l.parts.reference), 1),
              k("span", li, A(l.parts.identity), 1)
            ])
          ])
        ], 12, Jo),
        E(t).selectable.value ? (f(), le(Pt, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0)
      ]))), 128))
    ]));
  }
}), $a = /* @__PURE__ */ pe(ri, [["__scopeId", "data-v-7df25d40"]]), oi = { class: "dc-links" }, ii = ["onClick"], ci = { class: "dc-link__primary dc-truncate" }, ui = { class: "dc-link__secondary dc-mono dc-truncate" }, di = /* @__PURE__ */ fe({
  __name: "LinksView",
  setup(e) {
    const t = Me(), n = Et();
    return (s, a) => (f(), h("div", oi, [
      (f(!0), h(Z, null, ce(E(n), (l) => (f(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        E(t).selectable.value ? (f(), le(Pt, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0),
        k("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => E(t).activate(l.row, E(Ge)(r))
        }, [
          k("span", ci, A(l.parts.identity), 1),
          k("span", ui, A(l.parts.reference), 1)
        ], 8, ii)
      ]))), 128))
    ]));
  }
}), xa = /* @__PURE__ */ pe(di, [["__scopeId", "data-v-08d0266c"]]), fi = {
  class: "dc-list",
  role: "list"
}, pi = ["onClick"], vi = { class: "dc-list__ordinal dc-mono" }, hi = { class: "dc-list__identity" }, mi = { class: "dc-list__primary dc-truncate" }, _i = { class: "dc-list__secondary dc-mono dc-truncate" }, gi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, yi = { class: "dc-list__metrics dc-mono" }, wi = { class: "dc-list__trailing" }, ki = /* @__PURE__ */ fe({
  __name: "ListView",
  setup(e) {
    const t = Me(), n = Et(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), h("div", fi, [
      (f(!0), h(Z, null, ce(E(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        E(t).selectable.value ? (f(), le(Pt, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0),
        k("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => E(t).activate(r.row, E(Ge)(o))
        }, [
          k("span", vi, A(r.ordinal), 1),
          k("span", hi, [
            k("span", mi, A(r.parts.identity), 1),
            k("span", _i, A(r.parts.reference), 1)
          ])
        ], 8, pi),
        s.value ? (f(), h("span", gi, A(r.entityLabel), 1)) : z("", !0),
        k("span", yi, [
          (f(!0), h(Z, null, ce(r.parts.metrics.slice(0, 2), (o) => (f(), le(jt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        k("span", wi, [
          r.parts.state ? (f(), le(Ht, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : z("", !0),
          ye(Xt, { entry: r }, null, 8, ["entry"]),
          E(t).pinnable.value ? (f(), le(Jn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : z("", !0)
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
    const t = Me(), n = Et(), s = U(0);
    be(n, (i) => {
      s.value > i.length - 1 && (s.value = Math.max(0, i.length - 1));
    });
    const a = v(() => n.value[s.value]), l = v(() => {
      const i = a.value;
      if (!i) return [];
      const u = Oe(i.columns, "reference"), d = Oe(i.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((_) => ({
          key: _.label,
          value: _.text,
          column: _.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), r = v(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${i}`;
    }), o = (i) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + i)));
    };
    return (i, u) => (f(), h("div", bi, [
      k("div", $i, [
        k("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => o(-1))
        }, " ‹ ", 8, xi),
        k("span", Ci, A(r.value), 1),
        k("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (d) => o(1))
        }, " › ", 8, Mi)
      ]),
      a.value ? (f(), h("div", Si, [
        k("div", {
          class: "dc-preview__media",
          style: Te({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        k("div", Ei, [
          k("div", Pi, [
            k("span", Ai, [
              E(t).selectable.value ? (f(), le(Pt, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : z("", !0),
              a.value.parts.state ? (f(), le(Ht, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : z("", !0),
              k("span", zi, A(a.value.entityLabel), 1)
            ]),
            k("span", Ti, [
              ye(Xt, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (f(), le(Jn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : z("", !0)
            ])
          ]),
          k("div", null, [
            k("div", Ri, A(a.value.parts.identity), 1),
            k("div", Li, A(a.value.parts.reference), 1)
          ]),
          k("dl", Fi, [
            (f(!0), h(Z, null, ce(l.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              k("dt", Ni, A(d.key), 1),
              k("dd", Di, [
                d.column && a.value ? (f(), le(jt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(Z, { key: 1 }, [
                  je(A(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          k("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => E(t).activate(a.value.row, E(Ge)(d)))
          }, " Open record → ")
        ])
      ])) : z("", !0)
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
    ), r = v(() => a.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => An(t.column)), u = v(() => la(t.column, t.entry.row));
    function d(_) {
      if (!o.value) return;
      _.stopPropagation();
      const g = Ge(_);
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    return (_, g) => s.value === "component" && e.column.component ? (f(), le(On(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), le(Ht, {
      key: 1,
      status: r.value
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
    }, null, 8, ["entry", "column"])) : o.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: un(["dc-table__open", { "dc-truncate": i.value }]),
      title: u.value,
      onClick: d
    }, A(l.value), 11, Bi)) : (f(), h("span", Ki, A(l.value), 1));
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
    const t = Me(), n = Et(), s = Oi(), a = v(
      () => s.value.some((g) => g.kind === "image" || g.height !== void 0)
    );
    function l(g) {
      g && (t.query.value.sort === g ? t.toggleDirection() : t.setSort(g));
    }
    const r = v(() => t.entity.value?.label ?? "The result set"), o = v(() => new Set(t.sorts.value.map((g) => g.key))), i = (g) => g.sort !== void 0 && o.value.has(g.sort), u = (g) => {
      if (i(g))
        return t.query.value.sort !== g.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function d(g) {
      return [
        Cs(g),
        g.muted ? "dc-table__muted" : "",
        g.mono ? "dc-mono" : "",
        An(g) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function _(g, w) {
      if (!(!An(g) || g.activate || g.click))
        return la(g, w.row);
    }
    return (g, w) => E(s).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      k("thead", null, [
        k("tr", null, [
          E(t).selectable.value ? (f(), h("th", Hi, [...w[3] || (w[3] = [
            k("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : z("", !0),
          (f(!0), h(Z, null, ce(E(s), (b, C) => (f(), h("th", {
            key: E($s)(b, C),
            scope: "col",
            class: un(E(Cs)(b)),
            style: Te({ width: b.width }),
            "data-dc-align": E(xs)(b),
            "data-dc-hide": b.hideBelow,
            "aria-sort": u(b),
            title: b.hint
          }, [
            i(b) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (y) => l(b.sort)
            }, A(b.label), 9, Xi)) : (f(), h(Z, { key: 1 }, [
              je(A(b.label), 1)
            ], 64)),
            b.header ? (f(), h("span", Gi, [
              (f(), le(On(b.header), {
                column: b,
                entity: E(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : z("", !0)
          ], 14, ji))), 128))
        ])
      ]),
      k("tbody", null, [
        (f(!0), h(Z, null, ce(E(n), (b) => (f(), h("tr", {
          key: b.key,
          class: "dc-table__row",
          onClick: (C) => E(t).activate(b.row, E(Ge)(C))
        }, [
          E(t).selectable.value ? (f(), h("td", Qi, [
            ye(Pt, {
              row: b.row,
              selected: b.selected,
              name: b.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : z("", !0),
          (f(!0), h(Z, null, ce(E(s), (C, y) => (f(), h("td", {
            key: E($s)(C, y),
            class: un(d(C)),
            "data-dc-align": E(xs)(C),
            "data-dc-hide": C.hideBelow,
            title: _(C, b)
          }, [
            C.scope ? (f(), h("span", Ji, [
              ye(Ls, {
                column: C,
                entry: b
              }, null, 8, ["column", "entry"]),
              ye(Xt, { entry: b }, null, 8, ["entry"])
            ])) : (f(), le(Ls, {
              key: 1,
              column: C,
              entry: b
            }, null, 8, ["column", "entry"]))
          ], 10, Zi))), 128))
        ], 8, Yi))), 128))
      ])
    ], 8, Ui)) : (f(), h("p", Vi, [
      w[2] || (w[2] = k("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      k("span", Wi, [
        je(A(r.value) + " has no ", 1),
        w[0] || (w[0] = k("code", null, "columns", -1)),
        w[1] || (w[1] = je(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ma = /* @__PURE__ */ pe(ec, [["__scopeId", "data-v-25251288"]]);
function tc(e) {
  const t = Ct([]), n = U(!1), s = Ct(null);
  let a = 0;
  const l = (i, u, d, _, g) => ({
    entity: i,
    rows: u.rows.map(
      (w, b) => ka(w, b, i, e.isPinned(w.id))
    ),
    total: u.total,
    count: d ? i.count : String(u.total),
    pinned: nc(_, u, g)
  }), r = () => {
    const i = ++a, u = e.query.value, d = e.schema.value, _ = e.entities.value, g = e.limit.value, w = e.within?.value.trim() ?? "", b = hn(u) && !w, C = w ? Vn(w, u.expr) : u.expr, y = _.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: $.key, expr: C, facets: Mt($), page: 1 },
        schema: d,
        entity: $,
        limit: g,
        offset: 0
      })
    }));
    if (y.every(({ outcome: $ }) => !($ instanceof Promise))) {
      t.value = y.map(
        ({ entity: $, outcome: R }) => l($, R, b, d, C)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(y.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      i === a && (t.value = $.map(
        (R, B) => l(y[B].entity, R, b, d, C)
      ), s.value = null);
    }).catch(($) => {
      i === a && (s.value = $, t.value = []);
    }).finally(() => {
      i === a && (n.value = !1);
    });
  }, o = () => {
    try {
      r();
    } catch (i) {
      s.value = i, t.value = [], n.value = !1;
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
  ), { previews: t, pending: n, error: s, refresh: o };
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
}, pc = ["onClick"], vc = { class: "dc-type__identity" }, hc = { class: "dc-type__primary dc-truncate" }, mc = { class: "dc-type__secondary dc-mono dc-truncate" }, _c = { class: "dc-type__trailing dc-mono" }, gc = { class: "dc-type__metric-value" }, yc = { class: "dc-type__metric-label" }, wc = {
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
      isPinned: (o) => t.isPinnedId(o)
    }), l = v(() => !t.isPristine.value || !!t.within.value), r = v(
      () => n.value.filter(
        (o) => !o.pinned && (o.rows.length > 0 || o.entity.create)
      )
    );
    return (o, i) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      ke(o.$slots, "before", {}, void 0, !0),
      E(a) ? (f(), h("p", ac, " Could not load results: " + A(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !r.value.length && E(s) ? (f(), h("p", lc, " Running query… ")) : r.value.length ? z("", !0) : (f(), h("p", rc, A(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(Z, null, ce(r.value, (u) => (f(), h("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        k("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => E(t).setEntity(u.entity.key)
        }, [
          k("span", cc, A(u.entity.label), 1),
          k("span", uc, A(u.count), 1),
          i[0] || (i[0] = k("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          k("span", dc, "Show only " + A(u.entity.label.toLowerCase()), 1)
        ], 8, ic),
        u.rows.length ? z("", !0) : (f(), h("p", fc, A(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(Z, null, ce(u.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          k("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (_) => E(t).activate(d.row, E(Ge)(_))
          }, [
            k("span", vc, [
              k("span", hc, A(d.parts.identity), 1),
              k("span", mc, A(d.parts.reference), 1)
            ])
          ], 8, pc),
          k("span", _c, [
            (f(!0), h(Z, null, ce(d.parts.metrics.slice(0, 1), (_) => (f(), le(jt, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: d,
              column: _.column
            }, {
              default: He(() => [
                k("span", gc, A(_.text), 1),
                k("span", yc, A(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", wc, A(d.parts.updated), 1)) : z("", !0),
            ye(Xt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => E(t).create(u.entity)
        }, [
          i[1] || (i[1] = k("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          je(" " + A(u.entity.create), 1)
        ], 8, kc)) : z("", !0)
      ], 8, oc))), 128)),
      ke(o.$slots, "after", {}, void 0, !0)
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
    }, l = v(() => Kn(n.query.value)), r = v(() => Ys(n.query.value.view, t.views)), o = v(() => a[r.value] ?? Tn), i = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = U(null);
    return be(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (_, g) => (f(), h("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), le(Sa, { key: 0 }, sn({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: He(() => [
            ke(_.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: He(() => [
            ke(_.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), h("p", xc, [
        g[1] || (g[1] = k("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        k("span", Cc, A(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && E(n).pending.value ? (f(), h("p", Mc, [...g[2] || (g[2] = [
        k("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), le(On(o.value), { key: 4 })) : (f(), h("div", Sc, [
        g[3] || (g[3] = k("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        k("span", Ec, A(E(n).summary.value), 1),
        E(n).isPristine.value ? z("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: g[0] || (g[0] = (w) => E(n).clearFilters())
        }, A(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
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
    const s = e, a = n, l = Ft(e, "open"), r = Ft(e, "pinned"), o = Ft(e, "selected"), i = Vt(), u = xt(js, null), d = s.route || u ? null : ml(), _ = s.route ?? u ?? d;
    et(() => d?.dispose?.());
    const g = v(() => Yl({ seed: s.schema.key })), w = v(() => s.source ?? g.value), b = cr({
      schema: () => s.schema,
      adapter: _,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), C = v(() => s.within?.trim() ?? ""), y = ur({
      source: w,
      query: b.query,
      schema: v(() => s.schema),
      entity: b.entity,
      limit: v(() => s.limit),
      within: C
    });
    be(b.query, (x) => a("query-change", x)), be(
      [y.pageCount, y.pending, b.query],
      () => {
        if (y.pending.value) return;
        const x = y.pageCount.value;
        b.query.value.page > x && b.setPage(x, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Us() ?? "dc-query-panel", R = U(null);
    function B() {
      l.value && (l.value = !1, Kt(() => {
        R.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const F = v(() => new Set(r.value));
    function D(x) {
      const N = new Set(F.value);
      N.has(x.id) ? N.delete(x.id) : N.add(x.id), r.value = [...N], a("toggle-pin", x);
    }
    const W = v(() => {
      if (s.selectable === !0) return !0;
      const x = b.entity.value;
      return !!(x?.duplicate || x?.delete);
    }), S = v(() => new Set(o.value));
    function T(x) {
      const N = new Set(S.value);
      N.has(x.id) ? N.delete(x.id) : N.add(x.id), o.value = [...N];
    }
    function Q(x) {
      const N = new Set(S.value);
      for (const Y of y.rows.value)
        x ? N.add(Y.id) : N.delete(Y.id);
      o.value = [...N];
    }
    function re() {
      o.value.length && (o.value = []);
    }
    const he = v(() => ({
      ids: [...o.value],
      rows: y.rows.value.filter((x) => S.value.has(x.id)),
      entity: b.entity.value
    }));
    be(() => b.query.value.entity, re);
    function G(x, N, Y = {}) {
      const ne = Jl(s.schema, b.query.value, x, Y);
      Y.exclude ? b.narrow(ne, N?.key ?? b.query.value.entity) : b.narrow(ne, N?.key ?? null, N ? void 0 : "cards"), a("drill", x, N, Y);
    }
    const ge = er({
      ...b,
      schema: v(() => s.schema),
      entities: v(() => s.schema.entities),
      rows: y.rows,
      total: y.total,
      limit: v(() => s.limit),
      offset: y.offset,
      pageCount: y.pageCount,
      pending: y.pending,
      error: y.error,
      source: w,
      previewsPerType: v(() => s.previewsPerType),
      within: C,
      pinnable: v(() => s.pinnable === !0),
      isPinned: (x) => F.value.has(x.id),
      isPinnedId: (x) => F.value.has(x),
      togglePin: D,
      selectable: W,
      selection: he,
      isSelected: (x) => S.value.has(x.id),
      toggleSelect: T,
      selectPage: Q,
      clearSelection: re,
      narrowsOnPress: v(() => s.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (x, N = {}) => {
        if (s.rowPress === "narrow" && Wn(s.schema, x)) {
          G(x, null, N);
          return;
        }
        a("activate", x);
      },
      create: (x) => a("create", x),
      duplicate: () => a("duplicate", he.value),
      delete: () => a("delete", he.value),
      drill: G
    }), xe = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: B
    }), (x, N) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Te(xe.value)
    }, [
      k("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ye(_a, {
          ref_key: "headerRef",
          ref: R,
          expanded: l.value,
          "panel-id": E($),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: N[0] || (N[0] = (Y) => l.value = !l.value)
        }, sn({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: He(() => [
              ke(x.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), h(Z, { key: 0 }, [
          k("div", {
            class: "dc-shell__scrim",
            onClick: B
          }),
          k("div", Tc, [
            ye(ya, {
              "panel-id": E($),
              onClose: B
            }, sn({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: He(() => [
                  ke(x.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : z("", !0)
      ], 8, zc),
      ye(wa),
      ke(x.$slots, "results", {
        rows: E(ge).rows.value,
        total: E(ge).total.value,
        offset: E(ge).offset.value,
        pageCount: E(ge).pageCount.value,
        query: E(ge).query.value,
        pending: E(ge).pending.value
      }, () => [
        ye(Ea, { views: e.views }, sn({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: He(() => [
              ke(x.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: He(() => [
              ke(x.$slots, "cards-after", {}, void 0, !0)
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
      return d.some((_) => _.type === dl ? !1 : _.type === fl ? String(_.children ?? "").trim().length > 0 : _.type === Z ? l(_.children ?? []) : !0);
    }
    const r = v(() => !!t.title || o.value || a(s.head)), o = v(() => a(s.aside)), i = v(() => a(s.default)), u = v(() => a(s.foot));
    return (d, _) => (f(), h("section", {
      class: "dc-shell-card",
      style: Te(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), h("header", Nc, [
        ke(d.$slots, "head", {}, () => [
          k("h2", Dc, A(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Ic, A(e.count), 1)) : z("", !0)
        ], !0),
        o.value ? (f(), h("span", Oc, [
          ke(d.$slots, "aside", {}, void 0, !0)
        ])) : z("", !0)
      ])) : z("", !0),
      i.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        ke(d.$slots, "default", {}, void 0, !0)
      ], 8, Bc)) : z("", !0),
      u.value ? (f(), h("footer", Kc, [
        ke(d.$slots, "foot", {}, void 0, !0)
      ])) : z("", !0)
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
    function l(r, o) {
      const i = n.options.length;
      let u = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? u = (o + 1) % i : r.key === "ArrowLeft" || r.key === "ArrowUp" ? u = (o - 1 + i) % i : r.key === "Home" ? u = 0 : r.key === "End" && (u = i - 1), u === null) return;
      r.preventDefault();
      const d = n.options[u];
      d && (s("update:modelValue", d.key), a.value[u]?.focus());
    }
    return (r, o) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(Z, null, ce(e.options, (i, u) => (f(), h("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: un(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", i.key),
        onKeydown: (d) => l(d, u)
      }, A(i.label), 43, Wc))), 128))
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
    const s = e, a = n, l = U(null), r = U([]), o = U(null), i = U(null), u = U(null), d = U(!1), _ = v(
      () => s.items.flatMap((S, T) => Dt(S) ? [T] : [])
    ), g = v(() => {
      const S = [{ entries: [] }];
      return s.items.forEach((T, Q) => {
        T.heading ? S.push({ heading: T, entries: [] }) : S[S.length - 1]?.entries.push({ item: T, index: Q });
      }), S.filter((T) => T.entries.length > 0);
    }), w = U({ x: s.at.x, y: s.at.y });
    async function b() {
      w.value = { x: s.at.x, y: s.at.y }, await Kt();
      const S = l.value?.getBoundingClientRect();
      if (!S) return;
      const T = 8;
      let Q = s.at.x, re = s.at.y;
      if (Q + S.width > window.innerWidth - T) {
        const he = s.at.mirrorX === void 0 ? null : s.at.mirrorX - S.width;
        Q = he !== null && he >= T ? he : window.innerWidth - S.width - T;
      }
      re + S.height > window.innerHeight - T && (re = window.innerHeight - S.height - T), w.value = { x: Math.max(T, Q), y: Math.max(T, re) };
    }
    const C = v(() => ({ left: `${w.value.x}px`, top: `${w.value.y}px` }));
    function y(S) {
      o.value = S, S !== null && Kt(() => r.value[S]?.focus());
    }
    function $(S, T) {
      const Q = _.value;
      if (Q.length === 0) return null;
      if (S === null) return T === 1 ? Q[0] ?? null : Q[Q.length - 1] ?? null;
      const re = Q.indexOf(S);
      return re === -1 ? Q[0] ?? null : Q[(re + T + Q.length) % Q.length] ?? null;
    }
    function R(S, T) {
      if (!s.items[S]?.items?.length) return;
      const re = r.value[S]?.getBoundingClientRect(), he = l.value?.getBoundingClientRect();
      !re || !he || (u.value = { x: he.right - 4, y: re.top - 4, mirrorX: he.left + 4 }, i.value = S, d.value = T);
    }
    function B(S) {
      const T = i.value;
      i.value = null, u.value = null, S && T !== null && y(T);
    }
    function F(S) {
      const T = s.items[S];
      if (!(!T || !Dt(T))) {
        if (T.items?.length) {
          R(S, !0);
          return;
        }
        a("choose", T);
      }
    }
    function D(S) {
      const T = S.key;
      if (T === "Escape") {
        S.preventDefault(), S.stopPropagation(), i.value !== null ? B(!0) : a("dismiss");
        return;
      }
      if (T === "ArrowDown" || T === "ArrowUp") {
        S.preventDefault(), S.stopPropagation(), B(!1), y($(o.value, T === "ArrowDown" ? 1 : -1));
        return;
      }
      if (T === "Home" || T === "End") {
        S.preventDefault(), S.stopPropagation(), B(!1), y($(null, T === "Home" ? 1 : -1));
        return;
      }
      if (T === "ArrowRight") {
        const Q = o.value;
        Q !== null && s.items[Q]?.items?.length && (S.preventDefault(), S.stopPropagation(), R(Q, !0));
        return;
      }
      if (T === "ArrowLeft") {
        i.value !== null && (S.preventDefault(), S.stopPropagation(), B(!0));
        return;
      }
      if (T === "Enter" || T === " ") {
        const Q = o.value;
        if (Q === null) return;
        S.preventDefault(), S.stopPropagation(), F(Q);
      }
    }
    function W(S) {
      const T = s.items[S];
      !T || !Dt(T) || (i.value !== null && i.value !== S && B(!1), y(S), T.items?.length && R(S, !1));
    }
    return pl(() => {
      b(), s.autofocus && y($(null, 1));
    }), be(() => s.at, b, { deep: !0 }), be(() => s.items, () => void b(), { deep: !0 }), et(() => {
      i.value = null;
    }), t({ root: l }), (S, T) => {
      const Q = Hs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Te(C.value),
        onKeydown: D
      }, [
        (f(!0), h(Z, null, ce(g.value, (re, he) => (f(), h("div", {
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
          }, A(re.heading.label), 9, Gc)) : z("", !0),
          (f(!0), h(Z, null, ce(re.entries, ({ item: G, index: ge }) => (f(), h(Z, {
            key: G.id ?? `${ge}-${G.label ?? ""}`
          }, [
            G.separator ? (f(), h("div", Yc)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (xe) => {
                xe && (r.value[ge] = xe);
              },
              type: "button",
              class: "dc-menu__item",
              role: G.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": G.checked === void 0 ? void 0 : G.checked,
              "aria-haspopup": G.items?.length ? "menu" : void 0,
              "aria-expanded": G.items?.length ? i.value === ge : void 0,
              "aria-disabled": G.disabled ? "true" : void 0,
              disabled: G.disabled,
              "data-dc-item": G.id,
              tabindex: "-1",
              onClick: (xe) => F(ge),
              onMouseenter: (xe) => W(ge)
            }, [
              k("span", Zc, A(G.checked ? "✓" : ""), 1),
              k("span", Jc, A(G.label), 1),
              G.shortcut ? (f(), h("span", eu, A(G.shortcut), 1)) : G.items?.length ? (f(), h("span", tu, "›")) : z("", !0)
            ], 40, Qc))
          ], 64))), 128))
        ], 8, Xc))), 128)),
        i.value !== null && u.value ? (f(), le(Q, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: u.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: T[0] || (T[0] = (re) => a("choose", re)),
          onDismiss: T[1] || (T[1] = (re) => B(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
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
    }), a = t, l = U(null), r = U([]), o = U(null), i = U(null), u = U(!1), d = v(
      () => n.menus.flatMap((F, D) => Dt(F) ? [D] : [])
    );
    function _(F, D) {
      const W = r.value[F]?.getBoundingClientRect(), S = n.menus[F];
      !W || !S || !Dt(S) || (i.value = { x: W.left, y: W.bottom + 2, mirrorX: W.right }, o.value = F, u.value = D);
    }
    function g(F) {
      const D = o.value;
      o.value = null, i.value = null, F && D !== null && r.value[D]?.focus();
    }
    function w(F) {
      o.value === F ? g(!0) : _(F, !1);
    }
    function b(F) {
      o.value === null || o.value === F || _(F, !1);
    }
    function C(F, D) {
      const W = d.value;
      if (W.length === 0) return null;
      if (F === null) return D === 1 ? W[0] ?? null : W[W.length - 1] ?? null;
      const S = W.indexOf(F);
      return S === -1 ? W[0] ?? null : W[(S + D + W.length) % W.length] ?? null;
    }
    function y(F) {
      const D = F.key;
      if (D === "Escape") {
        if (o.value === null) return;
        F.preventDefault(), g(!0);
        return;
      }
      if (D === "ArrowDown" && o.value === null) {
        const T = $();
        if (T === null) return;
        F.preventDefault(), _(T, !0);
        return;
      }
      if (D !== "ArrowLeft" && D !== "ArrowRight") return;
      const W = o.value ?? $(), S = C(W, D === "ArrowRight" ? 1 : -1);
      S !== null && (F.preventDefault(), o.value !== null ? _(S, !0) : r.value[S]?.focus());
    }
    function $() {
      const F = r.value.findIndex((D) => D === document.activeElement);
      return F === -1 ? d.value[0] ?? null : F;
    }
    function R(F) {
      const D = F.target;
      !D || l.value?.contains(D) || g(!1);
    }
    be(o, (F) => {
      F !== null ? window.addEventListener("pointerdown", R, !0) : window.removeEventListener("pointerdown", R, !0);
    }), et(() => window.removeEventListener("pointerdown", R, !0));
    function B(F) {
      g(!0), F.action?.(), a("choose", F);
    }
    return (F, D) => (f(), h("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Te(s.value),
      onKeydown: y
    }, [
      (f(!0), h(Z, null, ce(e.menus, (W, S) => (f(), h("button", {
        key: W.id ?? W.label ?? S,
        ref_for: !0,
        ref: (T) => {
          T && (r.value[S] = T);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === S,
        "aria-disabled": W.disabled ? "true" : void 0,
        disabled: W.disabled,
        "data-dc-menu": W.id ?? W.label,
        tabindex: S === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (T) => w(S),
        onMouseenter: (T) => b(S)
      }, A(W.label), 41, au))), 128)),
      o.value !== null && i.value ? (f(), le(Pa, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: B,
        onDismiss: D[0] || (D[0] = (W) => g(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
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
    const n = t, s = U(null), a = U(null), l = U(null), r = U(!1), o = v(() => l.value !== null);
    function i(b) {
      const C = s.value?.getBoundingClientRect();
      C && (l.value = { x: C.left, y: C.bottom + 4, mirrorX: C.right }, r.value = b);
    }
    function u(b) {
      l.value = null, b && s.value?.focus();
    }
    function d() {
      o.value ? u(!0) : i(!1);
    }
    function _(b) {
      b.key !== "ArrowDown" || o.value || (b.preventDefault(), i(!0));
    }
    function g(b) {
      const C = b.target;
      C && (s.value?.contains(C) || a.value?.root?.contains(C) || u(!1));
    }
    be(o, (b) => {
      b ? window.addEventListener("pointerdown", g, !0) : window.removeEventListener("pointerdown", g, !0);
    }), et(() => window.removeEventListener("pointerdown", g, !0));
    function w(b) {
      u(!0), b.action?.(), n("choose", b);
    }
    return (b, C) => (f(), h(Z, null, [
      k("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: _
      }, [
        k("span", ou, A(e.glyph), 1)
      ], 40, ru),
      l.value ? (f(), le(Pa, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: w,
        onDismiss: C[0] || (C[0] = (y) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
    ], 64));
  }
}), ts = /* @__PURE__ */ pe(iu, [["__scopeId", "data-v-48f5ada5"]]), At = (e) => e.kind === "split", j = (e) => e.kind === "group", te = (e) => e.kind === "float", ft = { x: 16, y: 16, w: 360, h: 260 }, pn = 28, Aa = 120, Rn = 220, za = 38, gt = 6;
function Gt(e, t) {
  let n = !1;
  const s = e.frames.map((a, l) => {
    const r = t(a.node, l);
    return r === a.node ? a : (n = !0, { ...a, node: r });
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
const ve = (e) => typeof e == "string", ns = (e) => ve(e) ? Xe(e) : e, Yt = (e) => ve(e) ? [e] : tt(e), Fs = (e) => e.panels.filter(ve), cu = (e) => e.panels.filter((t) => !ve(t)), Ne = (e, t) => e.panels.includes(t);
function Qt(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (ve(l) || !oe(l, t)) return l;
    const r = n(l);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, panels: a } : e;
}
function mn(e, t) {
  return { node: e, rect: { ...ft, ...t } };
}
function ss(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function as(e, t) {
  const n = { ...ft, ...t };
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
const ht = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Id = (e) => ({ ...e, headless: !0 }), Od = (e) => ({ ...e, fixedView: !0 }), uu = (e) => e === "left" || e === "right" ? "row" : "column";
function tt(e) {
  return j(e) ? e.panels.flatMap(Yt) : te(e) ? e.frames.flatMap((t) => tt(t.node)) : e.children.flatMap(tt);
}
function oe(e, t) {
  return j(e) ? e.panels.some((n) => ve(n) ? n === t : oe(n, t)) : te(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Ta = (e) => tt(e).length === 0, Ln = (e) => !j(e) && ht(e), Fn = (e) => Ta(e) && !Ln(e);
function _n(e) {
  return At(e) ? e.children.map((t, n) => ({ node: t, index: n })) : te(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ve(t) ? [] : [{ node: t, index: n }]);
}
const os = (e) => _n(e).map((t) => t.node);
function mt(e) {
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
  const t = e.panels[mt(e)];
  return t !== void 0 && ve(t) ? t : "";
}
function Ae(e) {
  if (ve(e)) return e;
  if (j(e)) {
    const n = e.panels[mt(e)];
    return n === void 0 ? "" : Ae(n);
  }
  if (te(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Ae(n.node) : "";
  }
  const t = e.children[0];
  return t ? Ae(t) : "";
}
function wt(e, t) {
  if (j(e) && Ne(e, t)) return e;
  for (const n of os(e)) {
    const s = wt(n, t);
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
  const s = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), a = s(e.w, t.w), l = s(e.h, t.h), r = (o, i, u) => Math.min(Math.max(o, 0), Math.max(u - i, 0));
  return {
    x: Math.round(r(e.x, a, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function Ns(e, t, n, s, a = Aa) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + s), t.includes("n") && (i = e.h - s, r = e.y + s), o < a && (t.includes("w") && (l = e.x + e.w - a), o = a), i < a && (t.includes("n") && (r = e.y + e.h - a), i = a), { x: l, y: r, w: o, h: i };
}
const La = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function kt(e, t, n) {
  if (j(e)) return Qt(e, t, (l) => kt(l, t, n));
  if (te(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!oe(o.node, t)) return o;
      if (Se(o.node, t)) {
        const u = kt(o.node, t, n);
        return u === o.node ? o : (l = !0, { ...o, node: u });
      }
      const i = n(o);
      return i === o ? o : (l = !0, i);
    });
    return l ? { ...e, frames: r } : e;
  }
  if (!oe(e, t)) return e;
  let s = !1;
  const a = e.children.map((l) => {
    const r = kt(l, t, n);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, children: a } : e;
}
function fu(e, t, n) {
  return kt(e, t, (s) => La(s.rect, n) ? s : { ...s, rect: n });
}
const st = (e) => e.maximized === !0, Fa = (e) => (t) => {
  if (st(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function pu(e, t, n = !0) {
  return kt(e, t, Fa(n));
}
function Bd(e, t) {
  const n = Se(e, t);
  return n ? pu(e, t, !st(n)) : e;
}
const ut = (e) => e.minimized === !0, Na = (e) => (t) => {
  if (ut(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function vu(e, t, n = !0) {
  return kt(e, t, Na(n));
}
function Kd(e, t) {
  const n = Se(e, t);
  return n ? vu(e, t, !ut(n)) : e;
}
function ct(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = lt(e, t.slice(0, -1));
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
  for (const { node: n, index: s } of _n(e)) {
    if (!oe(n, t)) continue;
    const a = Nn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function is(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = lt(e, a);
  if (!l || !te(l)) return e;
  const r = l.frames[s];
  if (!r) return e;
  const o = n(r);
  if (o === r) return e;
  const i = [...l.frames];
  return i[s] = o, vt(e, a, { ...l, frames: i });
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
    const r = e.frames[n];
    if (!r) return e;
    const o = It(r.node, s), i = o === r.node ? r : { ...r, node: o };
    if (n === e.frames.length - 1 && i === r) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(i), { ...e, frames: u };
  }
  const a = lt(e, [n]);
  if (!a) return e;
  const l = It(a, s);
  return l === a ? e : vt(e, [n], l);
}
function _u(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (te(s) && (n[l] = s.frames.length - 1), s = lt(s, [a]));
  }), n;
}
function rn(e, t, n, s) {
  if (j(e)) return Qt(e, n, (r) => rn(r, t, n, s));
  if (te(e)) {
    const r = e.frames.findIndex((i) => oe(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if (Se(o.node, n)) {
      const i = rn(o.node, t, n, s);
      if (i === o.node) return e;
      const u = [...e.frames];
      return u[r] = { ...o, node: i }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, mn(Xe(t), s)] };
  }
  if (!oe(e, n)) return e;
  let a = !1;
  const l = e.children.map((r) => {
    const o = rn(r, t, n, s);
    return o !== r && (a = !0), o;
  });
  return a ? { ...e, children: l } : e;
}
function Is(e, t, n, s) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Se(e, n)) return e;
  const a = pt(e, t);
  if (!a) return e;
  const l = rn(a, t, n, s);
  return l === a ? e : $e(l);
}
function gu(e, t, n) {
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
  if (a === void 0) return gu(e, t, s);
  const l = n.slice(1), r = (d, _) => _ === a ? Da(d, t, l, s) : pt(d, t);
  if (te(e)) {
    const d = e.frames.flatMap((_, g) => {
      const w = r(_.node, g);
      return w ? [w === _.node ? _ : { ..._, node: w }] : [];
    });
    return { ...e, frames: d };
  }
  if (j(e)) {
    const d = mt(e), _ = [];
    e.panels.forEach((b, C) => {
      if (ve(b)) {
        b !== t && _.push(b);
        return;
      }
      const y = r(b, C);
      y && _.push(y);
    });
    const w = e.active && _.some((b) => Yt(b).includes(e.active)) ? e.active : Ae(_[d] ?? _[_.length - 1]);
    return {
      kind: "group",
      panels: _,
      ...w ? { active: w } : {},
      ...we(e)
    };
  }
  const o = Je(e), i = [], u = [];
  return e.children.forEach((d, _) => {
    const g = r(d, _);
    g && (i.push(g), u.push(o[_] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: u, ...we(e) };
}
function Os(e, t, n, s) {
  const a = lt(e, n);
  return !a || !Ta(a) || !oe(e, t) ? e : $e(Da(e, t, n, s));
}
function Cn(e, t) {
  if (j(e)) return Qt(e, t, (a) => Cn(a, t));
  if (te(e)) {
    const a = e.frames.findIndex((u) => oe(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const r = Cn(l.node, t), o = r === l.node ? l : { ...l, node: r };
    if (a === e.frames.length - 1 && o === l) return e;
    const i = [...e.frames];
    return i.splice(a, 1), i.push(o), { ...e, frames: i };
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
  const s = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), a = s.reduce((l, r) => l + r, 0);
  return a <= 0 ? n() : s.map((l) => l / a);
}
const Je = (e) => cs(e.children.length, e.sizes), Be = (e) => {
  const t = j(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function $e(e) {
  if (j(e)) return yu(e);
  if (te(e)) {
    const o = e.frames.flatMap((i) => {
      const u = $e(i.node);
      return Fn(u) ? [] : [u === i.node ? i : { ...i, node: u }];
    });
    return o.length === e.frames.length && o.every((i, u) => i === e.frames[u]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = Je(e), n = Be(e), s = [], a = [], l = [];
  e.children.forEach((o, i) => {
    const u = $e(o), d = t[i] ?? 0;
    if (Fn(u)) return;
    if (!n && At(u) && u.direction === e.direction && !Be(u) && !ht(u)) {
      const g = Je(u);
      u.children.forEach((w, b) => {
        s.push(w), a.push(d * (g[b] ?? 0));
      });
      return;
    }
    s.push(u), a.push(d);
    const _ = n?.[i];
    _ && l.push(_);
  });
  const r = s[0];
  return s.length === 1 && r && !ht(e) ? r : {
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
  e.panels.forEach((o, i) => {
    const u = n?.[i];
    if (ve(o)) {
      s.push(o), u && a.push(u);
      return;
    }
    const d = $e(o);
    if (!Fn(d)) {
      if (j(d) && !ht(d) && !Be(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const l = s[0];
  if (s.length === 1 && l !== void 0 && !ve(l) && !ht(e))
    return l;
  if (s.length === e.panels.length && s.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && s.some((o) => Yt(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...r ? { active: r } : {},
    ...we(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function pt(e, t) {
  if (te(e)) {
    const r = e.frames.flatMap((o) => {
      const i = pt(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !Ln(e) ? null : { ...e, frames: r };
  }
  if (j(e)) {
    if (!oe(e, t)) return e;
    const r = mt(e), o = [];
    for (const d of e.panels) {
      if (ve(d)) {
        d !== t && o.push(d);
        continue;
      }
      const _ = pt(d, t);
      _ && o.push(_);
    }
    if (o.length === 0) return null;
    const u = e.active && o.some((d) => Yt(d).includes(e.active)) ? e.active : Ae(o[r] ?? o[o.length - 1]);
    return u ? { kind: "group", panels: o, active: u, ...we(e) } : { kind: "group", panels: o, ...we(e) };
  }
  const n = Je(e), s = [], a = [];
  if (e.children.forEach((r, o) => {
    const i = pt(r, t);
    i && (s.push(i), a.push(n[o] ?? 0));
  }), s.length === 0)
    return Ln(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...we(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !ht(e) ? l : $e({
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
function Lt(e, t, n, s, a) {
  const l = (w) => Gt(
    w,
    (b) => oe(b, n) ? Lt(b, t, n, s, a) : b
  );
  if (s === "float") return e;
  const r = (w) => Qt(w, n, (b) => Lt(b, t, n, s, a));
  if (s === "center")
    return j(e) ? Ne(e, n) ? Ia(e, t, a) : r(e) : te(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (w) => oe(w, n) ? Lt(w, t, n, s, a) : w
      )
    };
  const o = uu(s), i = s === "left" || s === "top", u = (w) => ({
    kind: "split",
    direction: o,
    children: i ? [Xe(t), w] : [w, Xe(t)],
    sizes: [0.5, 0.5]
  });
  if (j(e)) return Ne(e, n) ? u(e) : r(e);
  if (te(e)) return l(e);
  const d = Je(e), _ = e.children.findIndex(
    (w) => j(w) && Ne(w, n)
  );
  if (_ >= 0 && e.direction === o) {
    const w = (d[_] ?? 0) / 2, b = [...e.children], C = [...d];
    return b.splice(i ? _ : _ + 1, 0, Xe(t)), C.splice(_, 1, w, w), {
      kind: "split",
      direction: o,
      children: b,
      sizes: C,
      ...we(e)
    };
  }
  const g = e.children.map((w) => oe(w, n) ? j(w) && Ne(w, n) ? u(w) : Lt(w, t, n, s) : w);
  return {
    kind: "split",
    direction: e.direction,
    children: g,
    sizes: d,
    ...we(e)
  };
}
function bt(e, t) {
  if (j(e)) {
    if (Ne(e, t))
      return Ra(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((i) => !ve(i) && oe(i, t)), l = e.panels[a];
    if (l === void 0 || ve(l)) return e;
    const r = bt(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[a] = r, { ...e, panels: o, active: t };
  }
  if (!oe(e, t)) return e;
  if (te(e)) return Gt(e, (a) => bt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = bt(a, t);
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
    const r = Be(e), o = r ? [...r] : void 0;
    o && o.splice(a, 0, ...o.splice(s, 1));
    const i = Ae(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ...we(e),
      ...o ? { places: o } : {}
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
  const l = wt(e, t);
  if (s === "center" && l && Ne(l, n)) {
    if (a === void 0) return e;
    const o = l.panels.indexOf(t), i = a > o ? a - 1 : a;
    return i === o ? e : bt(Ot(e, t, i), t);
  }
  if (t === n) return e;
  const r = pt(e, t);
  return r ? $e(Lt(r, t, n, s, a)) : e;
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
  const s = _n(e);
  if (!j(e) && s.some(({ node: a }) => j(a) && Ne(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!oe(a, t)) continue;
    const r = Zt(a, t, n);
    return r ? Oa(e, l, r) : null;
  }
  return null;
}
function qd(e, t, n) {
  const s = Zt(
    e,
    t,
    (a) => At(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? $e(s) : e;
}
function Ba(e) {
  return te(e) ? [e] : Be(e) || ht(e) ? [e] : j(e) ? [...e.panels] : e.children.flatMap(Ba);
}
function Ka(e, t) {
  if (j(e)) return e;
  const n = os(e).map(Ba), s = n.flat(), a = t && s.some((r) => Yt(r).includes(t)) ? t : void 0, l = wu(e, n);
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
  for (const { node: s, index: a } of _n(e)) {
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
      (o) => j(o.node) && o.node.panels.includes(t)
    ), l = e.frames[a], r = l && j(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const o = as(r.panels.map(ns), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...o, ...e.frames.slice(a + 1)]
      };
    }
    return Gt(e, (o) => Dn(o, t));
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
  const s = wt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (Se(e, t)?.node === s) {
    const r = Dn(e, t);
    return r === e ? e : $e(r);
  }
  const l = us(e, t, (r) => ({
    ...ss(qa(r.panels.map(ns), Be(r), n)),
    ...we(r)
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
function St(e) {
  return e.title ? e.title : j(e) ? "" : te(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Bt(e, t) {
  if (j(e)) {
    const s = e.panels[mt(e)];
    return s === void 0 ? "" : ve(s) ? t(s) ?? s : St(s) || Bt(s, t);
  }
  if (e.title) return e.title;
  if (te(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Bt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Bt(n, t) : "";
}
function lt(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (At(n)) n = n.children[s];
    else if (te(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || ve(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function vt(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (te(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const u = vt(i.node, a, n);
    if (u === i.node) return e;
    const d = [...e.frames];
    return d[s] = { ...i, node: u }, { ...e, frames: d };
  }
  if (j(e)) {
    const i = e.panels[s];
    if (i === void 0 || ve(i)) return e;
    const u = vt(i, a, n);
    if (u === i) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = vt(l, a, n);
  if (r === l) return e;
  const o = [...e.children];
  return o[s] = r, { ...e, children: o };
}
function cn(e, t, n) {
  if (t.length === 0)
    return At(e) ? { ...e, sizes: cs(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (te(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const i = cn(o.node, a, n);
    if (i === o.node) return e;
    const u = [...e.frames];
    return u[s] = { ...o, node: i }, { ...e, frames: u };
  }
  if (j(e)) {
    const o = e.panels[s];
    if (o === void 0 || ve(o)) return e;
    const i = cn(o, a, n);
    if (i === o) return e;
    const u = [...e.panels];
    return u[s] = i, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = [...e.children];
  return r[s] = cn(l, a, n), { ...e, children: r };
}
function Ks(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const r = a + l;
  if (r < s * 2) return e;
  const o = [...e], i = Math.min(Math.max(a + n, s), r - s);
  return o[t] = i, o[t + 1] = r - i, o;
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
  for (const i of tt(e))
    !n.has(i) || s.has(i) ? a.add(i) : s.add(i);
  let l = e;
  for (const i of a)
    l = l ? pt(l, i) : null;
  const r = new Set(l ? tt(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? vn($e(l)) : null;
  if (!l) return qs(o);
  if (te(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (u, d) => mn(Xe(u), {
            x: ft.x + (i + d) * pn,
            y: ft.y + (i + d) * pn
          })
        )
      ]
    };
  }
  return vn($e(rs([l, ...o.map(Xe)])));
}
const ds = Symbol("dc.windowContext");
function Eu(e) {
  return In(ds, e), e;
}
function fs() {
  const e = xt(ds, null);
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
      k("g", Au, [
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
      ])) : z("", !0)
    ], 8, Pu));
  }
}), $t = /* @__PURE__ */ pe(Lu, [["__scopeId", "data-v-4d2872c0"]]), Fu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Nu = ["data-dc-movable"], Du = { class: "dc-float__title dc-truncate" }, Iu = {
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
    const t = e, n = fs(), s = v(() => Ae(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), l = v(() => st(t.frame)), r = v(() => ut(t.frame)), o = v(() => l.value || r.value), i = v(() => n.resizable.value && !a.value && !o.value), u = v(() => n.movable.value && !a.value && !o.value), d = v(() => {
      const D = tt(t.frame.node);
      return D.length === 1 ? D[0] ?? null : null;
    }), _ = v(() => d.value !== null && n.closable(d.value)), g = v(() => t.frame.node.headless === !0), w = v(
      () => !g.value && (!j(t.frame.node) || r.value)
    ), b = v(
      () => t.frame.title || St(t.frame.node) || Bt(t.frame.node, (D) => n.panelFor(D)?.title)
    ), C = v(() => n.spaceMenu(t.path));
    function y(D) {
      D.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, D, "move");
    }
    function $(D) {
      D.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const R = v(() => {
      const D = n.framing.value;
      return D !== null && oe(t.frame.node, D);
    }), B = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
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
    })), F = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (D, W) => (f(), h("div", {
      class: "dc-float",
      style: Te(B.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": R.value ? "true" : "false",
      onPointerdown: W[3] || (W[3] = (S) => E(n).raiseAt(e.path))
    }, [
      w.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: y,
        onDblclick: $
      }, [
        k("span", Du, A(b.value), 1),
        C.value.length ? (f(), le(ts, {
          key: 0,
          items: C.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : z("", !0),
        !a.value || r.value && _.value && d.value ? (f(), h("div", Iu, [
          a.value ? z("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": s.value,
            onClick: W[0] || (W[0] = (S) => E(n).toggleMinimizeAt(e.path))
          }, [
            ye($t, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Ou)),
          a.value ? z("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: W[1] || (W[1] = (S) => E(n).toggleMaximizeAt(e.path))
          }, [
            ye($t, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Bu)),
          r.value && _.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": d.value,
            onClick: W[2] || (W[2] = (S) => E(n).close(d.value))
          }, [
            ye($t, { kind: "close" })
          ], 8, Ku)) : z("", !0)
        ])) : z("", !0)
      ], 40, Nu)) : z("", !0),
      k("div", qu, [
        ke(D.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(Z, null, ce(i.value ? F : [], (S) => (f(), h("span", {
        key: S,
        class: "dc-float__grip",
        "data-dc-handle": S,
        "aria-hidden": "true",
        onPointerdown: Fe((T) => E(n).beginFrameDragAt(e.path, T, S), ["stop"])
      }, null, 40, Vu))), 128))
    ], 44, Fu));
  }
}), Uu = /* @__PURE__ */ pe(Wu, [["__scopeId", "data-v-f035684c"]]), ps = Symbol("dc.paneContext");
function Hu(e) {
  return In(ps, e), e;
}
function Ud() {
  return xt(ps, null);
}
function Hd(e) {
  const t = xt(ds, null), n = xt(ps, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Rt(e)
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
      () => t.group.panels.flatMap((I, H) => {
        if (!ve(I)) {
          const ze = St(I) || Bt(I, (Ee) => n.panelFor(Ee)?.title);
          return [{ kind: "space", index: H, id: `space-${H}`, title: ze, node: I }];
        }
        const se = n.panelFor(I);
        return se ? [{ kind: "panel", index: H, id: I, title: se.title, panel: se }] : [];
      })
    ), l = v(() => a.value.length > 1), r = v(() => {
      const I = mt(t.group);
      return a.value.find((H) => H.index === I) ?? a.value[0] ?? null;
    }), o = v(() => r.value?.kind === "space" ? r.value.node : null), i = v(() => o.value ? "" : Ra(t.group)), u = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => r.value?.title ?? ""), _ = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), g = v(() => [...t.path, r.value?.index ?? 0]), w = v(() => i.value || Fs(t.group)[0] || ""), b = v(() => n.viewFor(i.value)), C = v(() => t.group.headless === !0), y = v(() => n.focused.value === i.value), $ = v(() => n.dragging.value === i.value), R = v(() => n.moving.value === i.value), B = v(() => n.frameOf(w.value) !== null), F = v(() => n.panelFor(w.value)?.fixed === !0), D = v(
      () => !o.value && (n.canMove(i.value) || B.value && n.movable.value && !F.value)
    ), W = v(
      () => o.value ? n.spaceMenu(g.value) : n.menuFor(i.value)
    ), S = (I) => n.closable(I);
    Hu({ panel: i });
    const T = v(() => n.maximized(w.value)), Q = v(
      () => B.value && !F.value || !l.value && !!u.value && S(u.value.id)
    ), re = (I) => `${s}-tab-${I}`, he = v(() => `${s}-body`), G = v(() => {
      const I = n.dropTarget.value;
      return !I || !Ne(t.group, I.panel) || I.edge === "float" ? null : I;
    }), ge = v(() => G.value?.index === void 0 ? G.value?.edge ?? null : null), xe = v(() => G.value?.index ?? null), x = () => u.value ? n.renderContent(u.value, b.value, y.value) ?? null : null, N = () => u.value ? n.renderActions(u.value, b.value, y.value) ?? null : null;
    let Y = null;
    function ne(I) {
      const H = Y !== null && Math.hypot(I.clientX - Y.x, I.clientY - Y.y) >= 4;
      return Y = null, H;
    }
    const me = (I) => I.kind === "panel" ? I.id : Ae(I.node);
    function Ce(I, H) {
      H.kind !== "space" && (n.focus(H.id), Y = { x: I.clientX, y: I.clientY }, n.beginDrag(H.id, I));
    }
    function Ke(I, H) {
      if (ne(I)) return;
      const se = me(H);
      se && n.selectPanel(se);
    }
    function qe(I) {
      i.value && n.focus(i.value), !I.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (B.value ? n.beginFrameDrag(w.value, I, "move") : n.beginDrag(i.value, I));
    }
    function Ve(I) {
      Y = { x: I.clientX, y: I.clientY }, n.beginDrag(i.value, I);
    }
    function We(I) {
      ne(I) || n.toggleMoveMode(i.value);
    }
    const Re = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ie(I) {
      if (!R.value) return;
      if (I.key === "Escape") {
        I.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const H = Re[I.key];
      H && (I.preventDefault(), B.value ? n.nudgeFrame(i.value, H, I.shiftKey) : n.nudge(i.value, H, I.shiftKey));
    }
    function L(I) {
      !B.value || I.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(w.value);
    }
    function K(I, H) {
      I.stopPropagation(), Y = null, n.close(H);
    }
    function V(I, H) {
      const se = a.value.length;
      let ze = null;
      if (I.key === "ArrowRight" ? ze = (H + 1) % se : I.key === "ArrowLeft" ? ze = (H - 1 + se) % se : I.key === "Home" ? ze = 0 : I.key === "End" && (ze = se - 1), ze === null) return;
      I.preventDefault();
      const Ee = a.value[ze];
      if (!Ee) return;
      const zt = me(Ee);
      zt && n.selectPanel(zt);
    }
    return (I, H) => r.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": E(Fs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": B.value ? "true" : "false",
      "data-dc-maximized": T.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": y.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: H[7] || (H[7] = (se) => i.value && E(n).focus(i.value))
    }, [
      C.value ? z("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": D.value ? "true" : "false",
        onPointerdown: qe,
        onDblclick: L
      }, [
        D.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": R.value,
          onPointerdown: Ve,
          onClick: We,
          onKeydown: Ie
        }, [...H[8] || (H[8] = [
          k("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Gu)) : z("", !0),
        _.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": _.value
        }, [
          k("span", Qu, A(_.value), 1)
        ], 8, Yu)) : z("", !0),
        k("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(Z, null, ce(a.value, (se, ze) => (f(), h(Z, {
            key: se.id
          }, [
            xe.value === ze ? (f(), h("span", Ju)) : z("", !0),
            k("button", {
              id: re(se.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": se.kind === "panel" ? se.id : void 0,
              "data-dc-space": se.kind === "space" ? se.title : void 0,
              "aria-selected": se.index === r.value.index,
              "aria-controls": he.value,
              tabindex: se.index === r.value.index ? 0 : -1,
              onPointerdown: (Ee) => Ce(Ee, se),
              onClick: (Ee) => Ke(Ee, se),
              onKeydown: (Ee) => V(Ee, ze)
            }, [
              k("span", td, A(se.title), 1),
              se.kind === "panel" && se.panel.subtitle ? (f(), h("span", nd, A(se.panel.subtitle), 1)) : z("", !0),
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
                k("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, sd)) : z("", !0)
            ], 40, ed)
          ], 64))), 128)),
          xe.value === a.value.length ? (f(), h("span", ad)) : z("", !0)
        ], 8, Zu),
        k("div", ld, [
          ye(N),
          W.value.length ? (f(), le(ts, {
            key: 0,
            items: W.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : z("", !0)
        ]),
        Q.value ? (f(), h("div", rd, [
          B.value && !F.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": w.value,
            onPointerdown: H[1] || (H[1] = Fe(() => {
            }, ["stop"])),
            onClick: H[2] || (H[2] = (se) => E(n).toggleMinimize(w.value))
          }, [
            ye($t, { kind: "minimize" })
          ], 40, od)) : z("", !0),
          B.value && !F.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${T.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": T.value,
            "data-dc-maximize": w.value,
            onPointerdown: H[3] || (H[3] = Fe(() => {
            }, ["stop"])),
            onClick: H[4] || (H[4] = (se) => E(n).toggleMaximize(w.value))
          }, [
            ye($t, {
              kind: T.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, id)) : z("", !0),
          !l.value && u.value && S(u.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: H[5] || (H[5] = Fe(() => {
            }, ["stop"])),
            onClick: H[6] || (H[6] = (se) => E(n).close(u.value.id))
          }, [
            ye($t, { kind: "close" })
          ], 40, cd)) : z("", !0)
        ])) : z("", !0)
      ], 40, Xu)),
      o.value ? (f(), h("div", {
        key: 1,
        id: he.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : re(r.value.id)
      }, [
        ke(I.$slots, "space", {
          node: o.value,
          path: g.value
        }, void 0, !0)
      ], 8, ud)) : (f(), h("div", {
        key: 2,
        id: he.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : re(i.value)
      }, [
        ye(x)
      ], 8, dd)),
      ge.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ge.value,
        "aria-hidden": "true"
      }, null, 8, fd)) : z("", !0)
    ], 40, ju)) : z("", !0);
  }
}), Ha = /* @__PURE__ */ pe(pd, [["__scopeId", "data-v-44fd2b2d"]]), vd = ["data-dc-space", "data-dc-path", "aria-label"], hd = {
  key: 0,
  class: "dc-space__head"
}, md = { class: "dc-space__title dc-truncate" }, _d = ["data-dc-direction"], gd = {
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
    const t = e, n = fs(), s = U(null), a = v(() => j(t.node) ? t.node : null), l = v(() => At(t.node) ? t.node : null), r = v(() => te(t.node) ? t.node : null), o = v(
      () => l.value ? l.value.children : r.value?.frames.map((x) => x.node) ?? []
    ), i = v(() => l.value ? Je(l.value) : []), u = v(
      () => (r.value?.frames ?? []).map((x, N) => ({
        held: x,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: N,
        key: S(x.node),
        path: [...t.path, N]
      })).sort((x, N) => x.key < N.key ? -1 : x.key > N.key ? 1 : 0)
    ), d = v(() => St(t.node)), _ = v(() => n.spaceMenu(t.path)), g = v(() => t.node.headless === !0), w = v(() => r.value ? "desktop" : l.value?.direction ?? ""), b = U(null), C = U(0);
    let y = null;
    be(
      b,
      (x) => {
        y?.disconnect(), y = null, !(!x || typeof ResizeObserver > "u") && (C.value = x.clientWidth, y = new ResizeObserver(([N]) => {
          C.value = N?.contentRect.width ?? 0;
        }), y.observe(x));
      },
      { immediate: !0 }
    ), et(() => y?.disconnect());
    const $ = v(() => {
      const x = Math.max(
        1,
        Math.floor((C.value + gt) / (Rn + gt))
      ), N = /* @__PURE__ */ new Map();
      let Y = 0;
      for (const ne of u.value)
        ne.held.minimized === !0 && (N.set(ne.key, {
          x: gt + Y % x * (Rn + gt),
          bottom: gt + Math.floor(Y / x) * (za + gt)
        }), Y += 1);
      return N;
    }), R = (x) => !!x && x.join("/") === t.path.join("/"), B = v(() => {
      const x = n.dropTarget.value, N = r.value;
      if (!N || !x?.rect || x.edge !== "float") return null;
      if (x.space) return R(x.space) ? x.rect : null;
      const Y = Se(N, x.panel);
      return Y && N.frames.includes(Y) ? x.rect : null;
    }), F = v(() => {
      const x = n.dropTarget.value;
      return !!x && !x.rect && R(x.space);
    }), D = v(() => l.value?.direction === "row"), W = v(() => o.value.map((x, N) => [...t.path, N])), S = (x) => [...tt(x)].sort().join("/"), T = (x) => {
      const N = tt(x)[0];
      return (N ? n.panelFor(N)?.title : null) ?? N ?? "panel";
    }, Q = (x) => {
      const N = o.value[x], Y = o.value[x + 1];
      return !N || !Y ? "Resize panels" : `Resize ${T(N)} and ${T(Y)}`;
    }, re = (x) => {
      const N = i.value[x] ?? 0, Y = i.value[x + 1] ?? 0, ne = N + Y;
      return ne > 0 ? Math.round(N / ne * 100) : 50;
    };
    function he() {
      const x = s.value, N = x ? D.value ? x.clientWidth : x.clientHeight : 0;
      return N <= 0 ? 0.05 : Math.min(n.minPanelSize.value / N, 0.4);
    }
    let G = null;
    function ge(x, N) {
      const Y = l.value, ne = s.value;
      if (!n.resizable.value || !Y || !ne || x.button !== 0) return;
      const me = D.value ? ne.clientWidth : ne.clientHeight;
      if (me <= 0) return;
      const Ce = D.value ? x.clientX : x.clientY, Ke = Je(Y), qe = Math.min(n.minPanelSize.value / me, 0.4);
      x.preventDefault();
      const Ve = (Ie) => {
        const L = ((D.value ? Ie.clientX : Ie.clientY) - Ce) / me;
        n.setSizes(t.path, Ks(Ke, N, L, qe));
      }, We = () => G?.(), Re = (Ie) => {
        Ie.key === "Escape" && (n.setSizes(t.path, Ke), G?.());
      };
      G = () => {
        window.removeEventListener("pointermove", Ve), window.removeEventListener("pointerup", We), window.removeEventListener("pointercancel", We), window.removeEventListener("keydown", Re), G = null;
      }, window.addEventListener("pointermove", Ve), window.addEventListener("pointerup", We), window.addEventListener("pointercancel", We), window.addEventListener("keydown", Re);
    }
    et(() => G?.());
    function xe(x, N) {
      const Y = l.value;
      if (!n.resizable.value || !Y) return;
      const ne = D.value ? "ArrowRight" : "ArrowDown", me = D.value ? "ArrowLeft" : "ArrowUp", Ce = x.shiftKey ? 0.1 : 0.02;
      if (x.key !== ne && x.key !== me) return;
      const Ke = x.key === ne ? Ce : -Ce;
      x.preventDefault(), n.setSizes(t.path, Ks(Je(Y), N, Ke, he()));
    }
    return (x, N) => {
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
        !e.framed && !g.value ? (f(), h("header", hd, [
          k("span", md, A(d.value), 1),
          _.value.length ? (f(), le(ts, {
            key: 0,
            items: _.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : z("", !0)
        ])) : z("", !0),
        r.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: b,
          class: "dc-window__desktop"
        }, [
          B.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Te({
              left: `${B.value.x}px`,
              top: `${B.value.y}px`,
              width: `${B.value.w}px`,
              height: `${B.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          (f(!0), h(Z, null, ce(u.value, (ne) => (f(), le(Uu, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: $.value.get(ne.key) ?? null
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
          F.value ? (f(), h("div", gd)) : z("", !0),
          (f(!0), h(Z, null, ce(o.value, (ne, me) => (f(), h(Z, {
            key: S(ne)
          }, [
            k("div", {
              class: "dc-window__cell",
              style: Te({ flexGrow: i.value[me] ?? 1 })
            }, [
              ye(Y, {
                node: ne,
                path: W.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < o.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": D.value ? "vertical" : "horizontal",
              "aria-label": Q(me),
              "aria-valuenow": re(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Ce) => ge(Ce, me),
              onKeydown: (Ce) => xe(Ce, me)
            }, null, 40, yd)) : z("", !0)
          ], 64))), 128))
        ], 8, _d)) : z("", !0)
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
    const s = e, a = n, l = Ft(e, "layout"), r = Ft(e, "views"), o = Vt(), i = v(() => new Map(s.panels.map((c) => [c.id, c]))), u = v(() => s.panels.map((c) => c.id)), d = v(() => Su(l.value, u.value)), _ = U(null), g = U(null), w = U(null), b = U(!0), C = U(null), y = U(null), $ = U(null), R = U(""), B = U(null);
    function F() {
      const c = B.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((m) => m.closest(".dc-window") === c).map((m) => ({ panels: (m.dataset.dcPanels ?? "").split(" "), element: m })) : [];
    }
    function D(c) {
      const p = [];
      let m = c.closest(".dc-float");
      for (; m; )
        p.unshift(Number(m.dataset.dcOrder ?? 0)), m = m.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function W() {
      return F().map((c) => ({ pane: c, order: D(c.element) })).sort((c, p) => {
        const m = Math.max(c.order.length, p.order.length);
        for (let M = 0; M < m; M += 1) {
          const P = (c.order[M] ?? -1) - (p.order[M] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const S = (c) => F().find((p) => p.panels.includes(c)) ?? null;
    function T(c) {
      const p = i.value.get(c);
      if (!p) return "";
      const m = r.value[c];
      return m && p.views?.some((M) => M.key === m) ? m : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function Q(c, p) {
      r.value = { ...r.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const re = v(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function he(c) {
      return !s.movable || re.value < 1 || s.panels.length < 2 ? !1 : i.value.get(c)?.fixed !== !0;
    }
    function G(c, p) {
      const m = d.value;
      !c || !m || c === m || (l.value = c, p && a("panel-move", p));
    }
    function ge(c, p, m) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (p - c.left) / c.width, P = (m - c.top) / c.height, O = 0.3;
      return M > O && M < 1 - O && P > O && P < 1 - O ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (ae, q) => q.distance < ae.distance ? q : ae
      ).edge;
    }
    function xe(c, p) {
      const m = [...c.querySelectorAll(".dc-tab")], M = m.findIndex((P) => {
        const O = P.getBoundingClientRect();
        return p < O.left + O.width / 2;
      });
      return M === -1 ? m.length : M;
    }
    function x(c, p, m) {
      for (const { panels: M, element: P } of W().reverse()) {
        const O = P.getBoundingClientRect();
        if (c < O.left || c > O.right || p < O.top || p > O.bottom) continue;
        const ue = M.find((J) => J !== m), ae = P.querySelector(".dc-pane__tabs"), q = ae?.getBoundingClientRect();
        if (ae && q && p >= q.top && p <= q.bottom)
          return ue ? { panel: ue, edge: "center", index: xe(ae, c) } : null;
        const X = P.querySelector(":scope > .dc-pane__space");
        if (X) {
          const J = X.getBoundingClientRect();
          if (c >= J.left && c <= J.right && p >= J.top && p <= J.bottom) continue;
        }
        return ue ? { panel: ue, edge: ge(O, c, p) } : null;
      }
      return Y(c, p, m) ?? Ce(c, p);
    }
    function N() {
      const c = B.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function Y(c, p, m) {
      const M = d.value;
      if (!M) return null;
      for (const P of N()) {
        const O = P.getBoundingClientRect();
        if (c < O.left || c > O.right || p < O.top || p > O.bottom) continue;
        const ue = Ke(P), ae = ue.flatMap((ie) => ie.panels).find((ie) => ie !== m);
        if (!ae && ue.length > 0) return null;
        const q = Se(M, m)?.rect, X = xn(
          {
            x: c - O.left - 24,
            y: p - O.top - 12,
            w: q?.w ?? ft.w,
            h: q?.h ?? ft.h
          },
          { w: P.clientWidth, h: P.clientHeight },
          s.minPanelSize
        );
        if (ae) return { panel: ae, edge: "float", rect: X };
        const J = ne(P);
        return J ? { panel: "", space: J, edge: "float", rect: X } : null;
      }
      return null;
    }
    function ne(c) {
      const p = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function me() {
      const c = B.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === c).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const m = ne(p);
        return m ? [{ element: p, path: m }] : [];
      }) : [];
    }
    function Ce(c, p) {
      for (const { element: m, path: M } of me()) {
        if (m.dataset.dcSpace === "desktop") continue;
        const P = m.getBoundingClientRect();
        if (!(c < P.left || c > P.right || p < P.top || p > P.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Ke(c) {
      return F().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let qe = null;
    const Ve = (c) => c.altKey;
    function We(c, p) {
      if (!he(c) || g.value || y.value || p.button !== 0) return;
      const m = p.clientX, M = p.clientY;
      let P = !1, O = Ve(p);
      const ue = () => {
        const de = $.value;
        de && (w.value = O ? Y(de.x, de.y, c) : x(de.x, de.y, c));
      }, ae = (de) => {
        if (!P) {
          if (Math.hypot(de.clientX - m, de.clientY - M) < 4) return;
          P = !0, g.value = c, C.value = null;
        }
        O = Ve(de), b.value = !O, $.value = { x: de.clientX, y: de.clientY }, ue();
      }, q = (de) => {
        Ve(de) !== O && (O = !O, b.value = !O, P && ue());
      }, X = (de) => {
        qe?.();
        const ee = w.value, Pe = d.value;
        if (de && P && ee && Pe) {
          const nt = ee.space ? Os(Pe, c, ee.space, ee.rect) : ee.edge === "float" && ee.rect ? Is(Pe, c, ee.panel, ee.rect) : tn(Pe, c, ee.panel, ee.edge, ee.index);
          G(nt, {
            panel: c,
            target: ee.panel,
            edge: ee.edge,
            ...ee.space === void 0 ? {} : { space: ee.space },
            ...ee.index === void 0 ? {} : { index: ee.index },
            ...ee.rect === void 0 ? {} : { rect: ee.rect }
          });
        }
        g.value = null, w.value = null, $.value = null, b.value = !0;
      }, J = () => X(!0), ie = () => X(!1), _e = (de) => {
        if (de.key === "Escape") {
          X(!1);
          return;
        }
        q(de);
      };
      qe = () => {
        window.removeEventListener("pointermove", ae), window.removeEventListener("pointerup", J), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", _e), window.removeEventListener("keyup", q), qe = null;
      }, window.addEventListener("pointermove", ae), window.addEventListener("pointerup", J), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", _e), window.addEventListener("keyup", q);
    }
    et(() => qe?.());
    let Re = null;
    function Ie(c) {
      const p = B.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((P) => P.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function L(c) {
      const p = d.value;
      return p ? Nn(p, c) : null;
    }
    function K(c) {
      const p = d.value;
      if (!p) return;
      const m = It(p, c);
      m !== p && (l.value = m);
    }
    function V(c) {
      const p = L(c);
      p && K(p);
    }
    function I(c) {
      const p = d.value, m = p ? Se(p, c) : null;
      return m !== null && st(m);
    }
    function H(c) {
      const p = d.value, m = p ? Se(p, c) : null;
      return m !== null && ut(m);
    }
    function se(c) {
      const p = d.value, m = p ? ct(p, c) : null;
      return m ? Ae(m.node) : "";
    }
    function ze(c) {
      const p = d.value, m = p ? ct(p, c) : null;
      if (!p || !m) return;
      const M = Ae(m.node);
      if (i.value.get(M)?.fixed === !0) return;
      const P = !ut(m);
      let O = mu(p, c, P);
      O !== p && (P || (O = It(O, c)), l.value = O, a("frame-minimize", { panel: M, minimized: P }));
    }
    function Ee(c) {
      const p = L(c);
      p && ze(p);
    }
    function zt(c) {
      const p = d.value, m = p ? ct(p, c) : null;
      if (!p || !m) return;
      const M = Ae(m.node);
      if (i.value.get(M)?.fixed === !0) return;
      const P = !st(m);
      let O = hu(p, c, P);
      O !== p && (P && (O = It(O, c)), l.value = O, a("frame-maximize", { panel: M, maximized: P }));
    }
    function vs(c) {
      const p = L(c);
      p && zt(p);
    }
    function hs(c, p, m) {
      const M = d.value, P = M ? ct(M, c) : null;
      if (!M || !P || p.button !== 0 || g.value || y.value) return;
      const O = Ae(P.node);
      if (i.value.get(O)?.fixed === !0 || st(P) || ut(P) || (m === "move" ? !s.movable : !s.resizable)) return;
      const ue = Ie(c), ae = _u(M, c);
      K(c);
      const q = { w: ue?.clientWidth ?? 0, h: ue?.clientHeight ?? 0 }, X = { ...P.rect }, J = p.clientX, ie = p.clientY, _e = s.minPanelSize;
      y.value = O;
      const de = (Le) => {
        const Ye = d.value;
        if (!Ye) return;
        const Tt = Ds(Ye, ae, xn(Le, q, _e));
        Tt !== Ye && (l.value = Tt);
      }, ee = (Le) => {
        Le.preventDefault();
        const Ye = Le.clientX - J, Tt = Le.clientY - ie;
        de(
          m === "move" ? { ...X, x: X.x + Ye, y: X.y + Tt } : Ns(X, m, Ye, Tt, _e)
        );
      }, Pe = (Le) => {
        if (Re?.(), y.value = null, !Le) {
          de(X);
          return;
        }
        const Ye = d.value ? ct(d.value, ae) : null;
        Ye && a("frame-change", { panel: se(ae), rect: Ye.rect });
      }, nt = () => Pe(!0), ot = () => Pe(!1), it = (Le) => {
        Le.key === "Escape" && Pe(!1);
      };
      Re = () => {
        window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", nt), window.removeEventListener("pointercancel", ot), window.removeEventListener("keydown", it), Re = null;
      }, window.addEventListener("pointermove", ee), window.addEventListener("pointerup", nt), window.addEventListener("pointercancel", ot), window.addEventListener("keydown", it);
    }
    function ja(c, p, m) {
      const M = L(c);
      M && hs(M, p, m);
    }
    function Xa(c, p, m = !1) {
      const M = d.value, P = L(c), O = M && P ? ct(M, P) : null;
      if (!M || !P || !O || i.value.get(c)?.fixed === !0 || (m ? !s.resizable : !s.movable)) return;
      if (st(O) || ut(O)) {
        R.value = `${Ue(c)} is ${st(O) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ue = p === "left" ? -nn : p === "right" ? nn : 0, ae = p === "up" ? -nn : p === "down" ? nn : 0, q = Ie(P), X = { w: q?.clientWidth ?? 0, h: q?.clientHeight ?? 0 }, J = m ? Ns(O.rect, "se", ue, ae, s.minPanelSize) : { ...O.rect, x: O.rect.x + ue, y: O.rect.y + ae }, ie = Ds(M, P, xn(J, X, s.minPanelSize));
      if (ie === M) {
        R.value = m ? `${Ue(c)} cannot be resized further.` : `${Ue(c)} cannot move ${p}.`;
        return;
      }
      l.value = ie;
      const _e = ct(ie, P);
      _e && (a("frame-change", { panel: c, rect: _e.rect }), R.value = m ? `${Ue(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${Ue(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    et(() => Re?.());
    function Ga(c, p) {
      const m = S(c), M = m?.element.getBoundingClientRect();
      if (!m || !M) return null;
      const P = p === "left" || p === "right", O = (q) => {
        if (!(P ? q.bottom > M.top + 1 && q.top < M.bottom - 1 : q.right > M.left + 1 && q.left < M.right - 1)) return null;
        const J = p === "left" ? M.left - q.right : p === "right" ? q.left - M.right : p === "up" ? M.top - q.bottom : q.top - M.bottom;
        return J < -1 ? null : J;
      }, ue = [];
      for (const q of F()) {
        if (q === m || q.element === m.element) continue;
        const X = O(q.element.getBoundingClientRect());
        if (X === null) continue;
        const J = q.panels.find((ie) => ie !== c);
        J && ue.push({ to: { panel: J }, distance: X });
      }
      for (const { element: q, path: X } of me()) {
        const J = O(q.getBoundingClientRect());
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
        R.value = `${m}: move mode off.`;
        return;
      }
      R.value = p ? `${m}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${m}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ue = (c) => i.value.get(c)?.title ?? c, Qa = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Za(c, p, m = !1) {
      if (!he(c)) return;
      const M = d.value;
      if (!M) return;
      const P = Ue(c), O = wt(M, c);
      if (!m && O && (p === "left" || p === "right") && O.panels.length > 1) {
        const ie = O.panels.indexOf(c), _e = p === "left" ? ie - 1 : ie + 1;
        if (_e >= 0 && _e < O.panels.length) {
          G(Ot(M, c, _e), { panel: c, target: c, edge: "center", index: _e }), R.value = `${P} moved ${p}, now tab ${_e + 1} of ${O.panels.length}.`, gn(c);
          return;
        }
      }
      const ae = Ga(c, p);
      if (!ae || ae.panel !== void 0 && !he(ae.panel)) {
        R.value = `${P} cannot move ${p}.`;
        return;
      }
      const q = Qa[p];
      if (ae.space) {
        const ie = ae.space, _e = lt(M, ie), de = Se(M, c)?.rect, ee = { ...ft, ...de ? { w: de.w, h: de.h } : {} };
        G(Os(M, c, ie, ee), { panel: c, target: "", space: ie, edge: q }), R.value = `${P} moved ${p}, into ${_e ? St(_e) : "the space"}.`, gn(c);
        return;
      }
      const X = ae.panel, J = O?.panels.length === 1 && wt(M, X)?.panels.length === 1;
      m ? (G(tn(M, c, X, "center"), {
        panel: c,
        target: X,
        edge: "center"
      }), R.value = `${P} joined ${Ue(X)} as a tab.`) : J ? (G(on(M, c, X), { panel: c, target: X, edge: q }), R.value = `${P} moved ${p}, trading places with ${Ue(X)}.`) : (G(tn(M, c, X, q), { panel: c, target: X, edge: q }), R.value = `${P} moved ${p}, beside ${Ue(X)}.`), gn(c);
    }
    function gn(c) {
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
      const m = bt(p, c);
      m !== p && (l.value = m, a("tab-select", { panel: c }));
    }
    function ms(c) {
      return i.value.get(c)?.closable ?? s.closable;
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
    function _s(c) {
      const p = c.filter((m) => m.items.length > 0);
      return p.length < 2 ? p.flatMap((m) => m.items) : p.flatMap((m) => [
        { id: m.id, heading: !0, label: m.title },
        ...m.items
      ]);
    }
    const gs = (c) => c.title || "These tabs";
    function al(c, p) {
      const m = p.id, M = wt(c, m), P = (M?.panels.length ?? 0) > 1, O = M?.fixedView === !0, ue = (J) => ({
        action: () => {
          J !== c && (l.value = J);
        }
      }), ae = [], q = [], X = p.views ?? [];
      if (X.length > 1 && !O) {
        const J = T(m);
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
      return P && !O && q.push(
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
      ), P && M && (q.length && q.push({ separator: !0 }), q.push(...ys(M, m))), { panel: ae, tabs: q, tabsTitle: M ? gs(M) : "" };
    }
    function ys(c, p) {
      const m = mt(c), M = (P) => {
        const O = c.panels[(m + P + c.panels.length) % c.panels.length];
        return (O === void 0 ? "" : Ae(O)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => yn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => yn(M(-1)) }
      ];
    }
    function Jt(c) {
      return c.title ? c.title : j(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : St(c);
    }
    function ws(c) {
      if (!c || te(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Be(c)) return null;
      const p = Ua(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function ll(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const m = lt(p, c);
      if (!m || j(m)) return [];
      if (m.fixedView) return [];
      const M = te(m) ? "desktop" : m.direction, P = (ee, Pe, nt) => ({
        id: `show-${ee}`,
        label: Pe,
        checked: M === ee,
        action: () => {
          const ot = d.value, it = nt();
          !ot || it === m || (l.value = vn($e(vt(ot, c, it))));
        }
      }), O = () => {
        const ee = Ka(m, rl(m));
        if (j(ee) && ee.panels.length === 0) return m;
        const Pe = j(ee) && ee.panels.length === 1 ? ee.panels[0] : void 0;
        return Pe !== void 0 && ve(Pe) ? m : ee;
      }, ue = (ee) => () => te(m) ? Wa(m, ee) : m.direction === ee ? m : { ...m, direction: ee }, ae = c.slice(0, -1), q = c.length > 0 ? lt(p, ae) : null, X = q && j(q) && q.panels.length > 1 ? q : null, J = q && ws(q) === m ? q : null, ie = ws(m), _e = m.title || "this space", de = (ee, Pe, nt, ot, it) => ({
        id: ee,
        label: it,
        action: () => {
          const Le = d.value;
          Le && (l.value = vn($e(vt(Le, Pe, Cu(nt, ot)))));
        }
      });
      return _s([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: m.title || "This space",
          items: [
            P("row", "Row", ue("row")),
            P("column", "Column", ue("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            P("tabs", "Tabs", () => O()),
            P("desktop", "Desktop", () => te(m) ? m : Va(m))
          ]
        },
        {
          id: "about-around",
          title: ie ? `Around ${Jt(ie)}` : "",
          items: ie ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ie.title ? [] : [de("merge-around-keep-this", c, m, "outer", `Keep ${_e}`)],
            ...m.title ? [] : [de("merge-around-keep-that", c, m, "inner", `Keep ${Jt(ie)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: J ? `Inside ${Jt(J)}` : "",
          items: J ? [
            ...m.title ? [] : [de("merge-inside-keep-that", ae, J, "outer", `Keep ${Jt(J)}`)],
            ...J.title ? [] : [de("merge-inside-keep-this", ae, J, "inner", `Keep ${_e}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: X ? gs(X) : "",
          items: X ? ys(X, Ae(m)) : []
        }
      ]);
    }
    function rl(c) {
      const p = _.value;
      return p && oe(c, p) ? p : void 0;
    }
    function ol(c) {
      const p = d.value, m = i.value.get(c);
      if (!p || !m) return [];
      const M = s.menu ? al(p, m) : null, P = sl(c);
      P.length && M?.panel.length && P.push({ separator: !0 }), M && P.push(...M.panel);
      const O = _s([
        { id: "about-panel", title: m.title, items: P },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(m, O) : O;
    }
    function il(c, p) {
      return o[`${c}-${p}`] ?? o[c];
    }
    function ks(c, p, m, M) {
      return il(c, p.id)?.({ panel: p, view: m, active: M });
    }
    Eu({
      panelFor: (c) => i.value.get(c) ?? null,
      viewFor: T,
      setView: Q,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: _,
      dragging: g,
      dropTarget: w,
      moving: C,
      framing: y,
      canMove: he,
      focus(c) {
        _.value !== c && (_.value = c, a("panel-activate", c));
      },
      selectPanel: yn,
      beginDrag: We,
      toggleMoveMode: Ya,
      nudge: Za,
      setSizes: Ja,
      frameOf: (c) => d.value ? Se(d.value, c) : null,
      beginFrameDrag: ja,
      nudgeFrame: Xa,
      raise: V,
      maximized: I,
      toggleMaximize: vs,
      minimized: H,
      toggleMinimize: Ee,
      beginFrameDragAt: hs,
      raiseAt: K,
      toggleMaximizeAt: zt,
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
      const c = g.value, p = $.value;
      return !c || !p ? null : hl(
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
      move(c, p, m, M) {
        const P = d.value;
        P && G(tn(P, c, p, m, M), {
          panel: c,
          target: p,
          edge: m,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (l.value = bt(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, m) {
        const M = d.value;
        M && G(Is(M, c, p, m), {
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
        const M = fu(m, c, p);
        if (M === m) return;
        l.value = M;
        const P = Se(M, c);
        P && a("frame-change", { panel: c, rect: P.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: Q,
      /** Brings a floating frame to the front of its stack. */
      raise: V,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: vs,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Ee
    }), (c, p) => (f(), h("div", {
      ref_key: "root",
      ref: B,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": g.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Te(cl.value)
    }, [
      d.value ? (f(), le(kd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", $d, " This window has no panels. ")),
      ye(ul),
      k("p", xd, A(R.value), 1)
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
  ShellHeader: _a,
  QueryPanel: ya,
  RecordActions: wa,
  ResultsArea: Ea,
  FacetControl: ga,
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
  ft as DEFAULT_FRAME,
  En as DEFAULT_SORT,
  _l as DEFAULT_VIEW,
  Lc as DataShell,
  Pn as EMPTY_CELL,
  pa as ENTITY_ALL,
  fn as ENTITY_TERM,
  qt as EXPRESSION_TERM,
  Qn as FACET_PREFIX,
  ga as FacetControl,
  $a as GridView,
  Gd as HeaderContentLayoutPlugin,
  xa as LinksView,
  Tn as ListView,
  gt as MINIMIZED_GAP,
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
  Pt as SelectTick,
  Ld as ShellCard,
  _a as ShellHeader,
  Ht as StatusPill,
  Ma as TableView,
  Sa as TypeCardsView,
  Xs as VIEW_KINDS,
  gl as VIEW_LABELS,
  ds as WINDOW_CONTEXT_KEY,
  Md as WindowFrame,
  Ha as WindowPane,
  Ra as activePanel,
  mt as activeTab,
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
  Mt as emptyFacetState,
  Bn as emptyFacetValue,
  Zl as excludingTerm,
  yt as findEntity,
  at as findSort,
  Od as fixedView,
  ss as float,
  Is as floatPanel,
  Va as floatSplit,
  bu as floatTabs,
  an as fnv1a,
  Qs as focusEntity,
  _t as formatCount,
  bl as formatDate,
  Nt as formatExpression,
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
  wt as groupOf,
  du as groups,
  ta as hasActiveFacets,
  oe as hasPanel,
  Id as headless,
  Lt as insertPanel,
  Dt as isChoosable,
  Td as isEntityScoped,
  ea as isFacetActive,
  te as isFloat,
  j as isGroup,
  st as isMaximized,
  ut as isMinimized,
  ve as isPanelTab,
  hn as isPristineQuery,
  At as isSplit,
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
  lt as nodeAt,
  Bt as nodeTitle,
  $e as normalizeLayout,
  Ze as normalizeSearch,
  cs as normalizeSizes,
  Ua as onlySpace,
  As as oppositeTerm,
  tt as panelIds,
  Xe as panelNode,
  Fs as panelTabs,
  rt as parseExpression,
  rr as parseQuery,
  So as presentParts,
  ka as presentRow,
  Ge as pressOptions,
  Hu as providePaneContext,
  er as provideShellContext,
  Eu as provideWindowContext,
  Cn as raiseFrame,
  It as raiseFrameAt,
  _u as raisedPath,
  sa as reconcileFacets,
  Su as reconcileLayout,
  ca as recordTerm,
  pt as removePanel,
  vt as replaceAt,
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
  bt as setActivePanel,
  fu as setFrameRect,
  Ds as setFrameRectAt,
  cn as setSizesAt,
  qd as setSplitDirection,
  Je as sizesOf,
  Js as sortsFor,
  we as spaceChrome,
  St as spaceTitle,
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
  Et as usePresentedRows,
  cr as useQueryState,
  vr as useRecordNames,
  ur as useResults,
  Me as useShellContext,
  fs as useWindowContext,
  Il as withoutTerm
};
