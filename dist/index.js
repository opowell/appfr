import { ref as H, inject as Ct, provide as In, computed as v, toValue as Lt, shallowRef as Mt, watch as be, onScopeDispose as Ws, defineComponent as fe, onBeforeUnmount as et, openBlock as f, createElementBlock as h, createElementVNode as w, toDisplayString as z, Fragment as Z, renderList as ce, createCommentVNode as T, unref as S, normalizeClass as Kt, withKeys as dt, withModifiers as Fe, normalizeStyle as Te, renderSlot as ke, withDirectives as Mn, vModelText as Sn, useSlots as Wt, nextTick as qt, createBlock as le, createTextVNode as je, createVNode as ye, withCtx as He, resolveDynamicComponent as On, createSlots as an, useModel as Nt, useId as Us, mergeModels as dn, Comment as fl, Text as pl, onMounted as vl, resolveComponent as Hs, getCurrentScope as hl, h as ml } from "vue";
const js = Symbol("dc.routeAdapter");
function Ze(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function gl() {
  const e = typeof window < "u", t = H(e ? Ze(window.location.search) : ""), n = H(e ? window.location.pathname : "/"), s = () => {
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
const Xs = ["list", "cards", "grid", "table", "links", "preview"], Ad = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], tn = ["ok", "running", "queued", "review", "failed"], zd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Td = [480, 620, 760, 900, 1100], _l = "cards", En = "updated";
function Gs(e) {
  return typeof e == "string" && Xs.includes(e);
}
const yl = {
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
const wl = { key: En, label: En };
function lt(e, t, n = null) {
  const s = Js(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === En) ?? s[0] ?? wl;
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
function Rd(e) {
  return e.entity !== null;
}
function Kn(e) {
  return e.entity === null && e.view === "cards";
}
function kl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function qn(e, t = {}) {
  const s = t.landing === "entity" ? Qs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Gs(t.view) ? t.view : _l,
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
function ln(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function bl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function gt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function $l(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function xl(e) {
  return String(e + 1).padStart(2, "0");
}
const Pn = "—";
function Oe(e, t) {
  return e.find((n) => n.role === t);
}
function aa(e, t) {
  return e.filter((n) => n.role === t);
}
function Cl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const Ml = ["id", "entityKey", "entityLabel"];
function De(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Ml.includes(n))
      return t[n];
  }
}
function $s(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Sl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function El(e, t) {
  if (e == null || e === "") return Pn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? bl(n) : String(e);
  }
  return t === "date" ? $l(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Pn : String(e);
}
function Ut(e, t) {
  const n = De(e, t);
  return e.format ? e.format(n, t) : El(n, e.kind);
}
function Pl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function la(e, t) {
  const n = Ut(e, t), s = Pl(De(e, t));
  return s && s !== n ? s : n;
}
function rn(e, t) {
  return e ? Ut(e, t) : "";
}
function xs(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Al = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Cs(e) {
  return [Al[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function An(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const zl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Tl(e) {
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
  for (const a of Tl(t)) {
    const l = a.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const o = a.length > 1 && a.startsWith("-"), i = o ? a.slice(1) : a, r = o ? { negated: !0 } : {}, u = zl.exec(i);
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
const kn = (e) => e.toLowerCase().replace(/\s+/g, ""), Rl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Ll(e, t, n) {
  const s = kn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && kn(u.label) === s
  );
  if (l) return De(l, t);
  const o = n.facets.find((u) => kn(u.label) === s);
  if (o && o.key in t.fields) return t.fields[o.key];
  const i = Rl.find(([u]) => u === s)?.[1];
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
function Fl(e, t, n) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const r = Oe(o, i), u = r ? De(r, t) : void 0;
      return typeof u == "string" && bn(u, e.value);
    });
  }
  const s = Ll(e.field, t, n);
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
  return !Number.isFinite(a) || !Number.isFinite(l) ? null : Dl(e.comparator, l, a);
}
function Nl(e, t, n) {
  const s = Fl(e, t, n);
  return s === null ? !0 : e.negated ? !s : s;
}
function Dl(e, t, n) {
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
function Il(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => Nl(a, t, n))) : !0;
}
function Ss(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Ht(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ss(e.value) : `${t}${e.field}${e.comparator}${Ss(e.value)}`;
}
function Ld(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function wt(e) {
  return e.filter((t) => t.length).map((t) => t.map(Ht).join(" ")).join(" OR ");
}
function Ol(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, o) => o !== n) : s).filter((s) => s.length);
}
function Bl(e) {
  const t = tt(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(Ht).join(" ")
  };
}
function Es(e, t) {
  return [...e.map(Ht), t.trim()].filter(Boolean).join(" ");
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
function Kl(e, t) {
  return t.filter((n) => !e.some((s) => ra(s, n)));
}
function Vn(e, t) {
  const n = tt(e), s = tt(t);
  return n.length ? s.length ? wt(
    n.flatMap((a) => s.map((l) => [...a, ...Kl(a, l)]))
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
const ql = 7, Vl = 3;
function Wl(e, t, n, s) {
  const a = (t * ql + ln(n)) % s, l = [];
  for (let o = 0; o < Math.min(Vl, s); o++)
    l.push(ia(e, (a + o) % s));
  return l;
}
function Ul(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Hl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Hl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) a.add((s + l) % e.length);
  return [...a].sort((l, o) => l - o).map((l) => e[l]);
}
function jl(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: l } = t, o = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${o}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return tn[n % tn.length];
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
      return tn[n % tn.length];
    case "date":
      return l;
    default:
      return;
  }
}
function Xl(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let r = 0; r < n; r++) {
    const u = l[r % l.length], d = Math.floor(r / l.length), m = ln(`${s}:${e.key}:${u[0]}:${r}`), y = ia(e.key, r), k = new Date(a.getTime() - m % 900 * 36e5).toISOString(), b = {};
    for (const C of e.columns ?? []) {
      const _ = C.field ?? C.key;
      if (!_ || C.value) continue;
      const $ = jl(C, {
        hash: ln(`${m}:${_}`),
        sample: u,
        revision: d,
        updatedAt: k
      });
      $ !== void 0 && (b[_] = $);
    }
    for (const C of e.facets)
      b[C.key] = Ul(C, ln(`${m}:${C.key}`));
    for (const [C, _] of o)
      b[C] = _ === e.key ? y : Wl(_, r, C, n);
    i.push({ id: y, entityKey: e.key, entityLabel: e.label, fields: b });
  }
  return i;
}
function Gl(e, t) {
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
function Yl(e, t) {
  const n = e.find((o) => o.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", l = s === "date" || n.role === "updated";
  return (o, i) => {
    const r = De(n, o), u = De(n, i);
    return a ? Number(u ?? 0) - Number(r ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(r ?? "")) : String(u ?? "").localeCompare(String(r ?? ""));
  };
}
function Ql(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const o = e.scopes ?? a.entities.flatMap(
      (r) => r.scope ? [[r.scope, r.key]] : []
    ), i = Xl(s, { ...e, scopes: o });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: o, offset: i }) {
      const r = tt(s.expr), u = l ? [l] : a.entities, d = [], m = [];
      for (const b of u)
        for (const C of n(b, a))
          d.push(C), (l ? Gl(C, s.facets) : !0) && Il(r, C, b) && m.push(C);
      const y = lt(l, s.sort, a), k = m.sort(Yl(Zs(l, a), y.key));
      return s.dir === "asc" && k.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: k.slice(i, i + o),
        total: m.length,
        unfiltered: m.length === d.length
      };
    }
  };
}
function Zl(e, t) {
  return ca(e, t.id);
}
function ca(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Wn(e, t) {
  return Zl(
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
function Jl(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Ge(e) {
  return e.metaKey || e.ctrlKey ? { exclude: !0 } : {};
}
function er(e, t, n, s = {}) {
  const a = Wn(e, n);
  return ua(t.expr, s.exclude ? Jl(a) : a);
}
function da(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || !t.trim()) return t;
  const s = tt(t), a = s.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return a.every((l, o) => l.length === s[o]?.length) ? t : wt(a);
}
function fa(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const pa = Symbol("dc.shellContext");
function tr(e) {
  return In(pa, e), e;
}
function Me() {
  const e = Ct(pa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Un = "e", Hn = "v", jn = "s", Xn = "d", Gn = "q", Yn = "p", Qn = "f_", va = "*", nr = [
  Un,
  Hn,
  jn,
  Xn,
  Gn,
  Yn
], zn = "..", ha = ",", sr = [
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
  for (const [n, s] of sr) t = t.replace(n, s);
  return t;
}
function Qe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ma(e) {
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
function ar(e) {
  return nr.includes(e) || e.startsWith(Qn);
}
function Ts(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function lr(e, t) {
  const n = Qe(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(ha).map((l) => l.trim()).filter(Boolean)
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
function rr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(ha) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${zn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function or(e, t, n = {}) {
  const s = qn(t, n), a = new Map(ma(e)), l = a.get(Un), o = l === void 0 ? s.entity : Qe(l), i = o === va ? null : yt(t, o), r = a.get(Hn), u = r && Gs(Qe(r)) ? Qe(r) : s.view, d = a.get(jn), m = lt(i, d ? Qe(d) : n.sort, t), y = a.get(Xn), k = y ? Qe(y) === "asc" ? "asc" : "desc" : s.dir, b = a.get(Gn), C = a.get(Yn), _ = C === void 0 ? 1 : Number(Qe(C)), $ = Number.isFinite(_) ? Math.max(1, Math.floor(_)) : 1, A = {};
  for (const B of i?.facets ?? []) {
    const L = a.get(`${Qn}${B.key}`);
    A[B.key] = L === void 0 ? Bn(B) : lr(B, L);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: m.key,
    dir: k,
    expr: b === void 0 ? "" : Qe(b),
    facets: sa(i, A),
    page: $
  };
}
function Rs(e, t, n = {}, s = "") {
  const a = qn(t, n), l = yt(t, e.entity), o = ma(s).filter(([m]) => !ar(m)), i = [], r = (m, y) => i.push([m, $n(y)]), u = l?.key ?? null;
  u !== a.entity && r(Un, u ?? va), e.view !== a.view && r(Hn, e.view), e.sort !== a.sort && r(jn, e.sort), e.dir !== a.dir && r(Xn, e.dir), e.expr.trim() !== "" && r(Gn, e.expr);
  for (const m of l?.facets ?? []) {
    const y = e.facets[m.key];
    if (!y) continue;
    const k = rr(y, m);
    k !== null && i.push([`${Qn}${m.key}`, $n(k)]);
  }
  e.page > 1 && r(Yn, String(e.page));
  const d = [
    ...o.map(([m, y]) => [$n(m), y]),
    ...i
  ];
  return d.length ? `?${d.map(([m, y]) => y === "" ? m : `${m}=${y}`).join("&")}` : "";
}
const fn = "entity", Vt = "expr";
function ir(e, t) {
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
    a && ea(a) && n.push(...ir(s, a));
  }
  return tt(e.expr).forEach((s, a) => {
    s.forEach((l, o) => {
      n.push({
        id: `${Vt}:${a}:${o}`,
        label: Ht(l),
        facetKey: Vt,
        group: a,
        index: o,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function cr(e, t, n = null) {
  if (hn(e)) {
    const l = lt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = Zn(e, t).filter((l) => l.facetKey !== Vt).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function ur(e) {
  const { adapter: t } = e, n = v(() => Lt(e.schema)), s = v(() => Lt(e.defaults) ?? {}), a = v(() => or(t.search.value, n.value, s.value)), l = v(() => yt(n.value, a.value.entity)), o = v(() => l.value ?? Qs(n.value, s.value)), i = v(() => Js(l.value, n.value)), r = v(() => lt(l.value, a.value.sort, n.value)), u = (_, $) => {
    const A = Rs(_, n.value, s.value, t.search.value);
    A !== t.search.value && ($ === "push" ? t.push(A) : t.replace(A));
  }, d = () => Lt(e.navigationMode) ?? "push", m = () => Lt(e.facetNavigationMode) ?? "replace", y = (_, $) => {
    const A = _.page ?? (bs(_) ? 1 : a.value.page);
    u({ ...a.value, ..._, page: A }, $);
  }, k = (_, $) => {
    const A = a.value.facets[_];
    if (!A) return;
    const B = { ...a.value.facets, [_]: $(A) };
    y({ facets: B }, m());
  }, b = (_) => {
    const $ = _ === null ? null : yt(n.value, _);
    return ($?.key ?? null) === a.value.entity ? {} : {
      entity: $?.key ?? null,
      sort: lt($, a.value.sort, n.value).key,
      facets: St($)
    };
  }, C = (_) => {
    const $ = b(_);
    Object.keys($).length && y($, d());
  };
  return {
    query: a,
    entity: l,
    focus: o,
    sort: r,
    sorts: i,
    summary: v(() => cr(a.value, l.value, n.value)),
    terms: v(() => Zn(a.value, l.value)),
    isPristine: v(() => hn(a.value)),
    isEverything: v(() => a.value.entity === null),
    hasFacets: v(() => ta(a.value.facets)),
    setEntity: C,
    clearEntity: () => C(null),
    setView(_) {
      y({ view: _ }, d());
    },
    setSort(_) {
      y({ sort: lt(l.value, _, n.value).key }, d());
    },
    toggleDirection() {
      y({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(_) {
      y({ expr: _ }, d());
    },
    narrow(_, $, A) {
      y({ expr: _, ...b($), ...A ? { view: A } : {} }, d());
    },
    setPage(_, $) {
      y({ page: Math.max(1, Math.floor(_)) }, $ ?? d());
    },
    setFacet(_, $) {
      k(_, () => $);
    },
    toggleChip(_, $) {
      k(_, (A) => A.kind !== "chips" ? A : { kind: "chips", selected: A.selected.includes($) ? A.selected.filter((L) => L !== $) : [...A.selected, $] });
    },
    setRange(_, $, A) {
      k(_, (B) => B.kind === "range" ? { kind: "range", min: $, max: A } : B);
    },
    toggleFlag(_) {
      k(
        _,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(_) {
      if (_.facetKey === fn) {
        C(null);
        return;
      }
      if (_.facetKey === Vt) {
        const $ = Ol(tt(a.value.expr), _.group ?? 0, _.index ?? 0);
        y({ expr: wt($) }, d());
        return;
      }
      k(_.facetKey, ($) => $.kind === "chips" && _.option ? { kind: "chips", selected: $.selected.filter((A) => A !== _.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: St(null) }, d());
    },
    reset() {
      u(qn(n.value, s.value), d());
    },
    hrefFor(_) {
      const $ = { ...a.value, ..._ };
      return $.page = _.page ?? (bs(_) ? 1 : a.value.page), $.facets = sa(yt(n.value, $.entity), $.facets), `${t.path.value}${Rs($, n.value, s.value, t.search.value)}`;
    }
  };
}
function dr(e) {
  const t = Mt([]), n = H(0), s = H(!1), a = Mt(null);
  let l = 0, o = null;
  const i = v(() => (e.query.value.page - 1) * e.limit.value), r = v(() => kl(n.value, e.limit.value)), u = () => {
    const _ = e.query.value, $ = e.within?.value.trim(), A = da(e.entity.value, _.expr);
    return $ ? { ..._, expr: Vn($, A) } : A === _.expr ? _ : { ..._, expr: A };
  }, d = (_) => {
    t.value = _.rows, n.value = _.total, a.value = null;
  }, m = (_) => {
    a.value = _, t.value = [], n.value = 0;
  }, y = (_, $) => {
    let A = !0;
    const B = () => _ === l, L = () => {
      A && (A = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return B();
      },
      insert(D, W) {
        if (!B()) return;
        const E = Array.isArray(D) ? D : [D];
        if (!E.length) return;
        L();
        const R = [...t.value];
        R.splice(W ?? R.length, 0, ...E), t.value = $ > 0 ? R.slice(0, $) : R, n.value += E.length;
      },
      set(D) {
        B() && (D.rows && (L(), t.value = $ > 0 ? D.rows.slice(0, $) : D.rows, n.value = D.rows.length), D.total !== void 0 && (n.value = D.total));
      },
      close() {
        B() && (s.value = !1);
      },
      fail(D) {
        B() && (m(D), s.value = !1);
      }
    };
  }, k = () => {
    const _ = o;
    o = null, _?.();
  }, b = () => {
    const _ = ++l;
    k();
    const $ = {
      query: u(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, A = e.source.value;
    if (A.stream) {
      s.value = !0;
      try {
        o = A.stream($, y(_, $.limit)) ?? null;
      } catch (L) {
        m(L), s.value = !1;
      }
      return;
    }
    let B;
    try {
      B = A.query($);
    } catch (L) {
      m(L);
      return;
    }
    if (!(B instanceof Promise)) {
      d(B), s.value = !1;
      return;
    }
    s.value = !0, B.then((L) => {
      _ === l && d(L);
    }).catch((L) => {
      _ === l && m(L);
    }).finally(() => {
      _ === l && (s.value = !1);
    });
  }, C = v(() => {
    const _ = u();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(na.map((A) => _[A]))}|${_.page}`;
  });
  return be([e.source, C, e.limit], b, {
    immediate: !0
  }), Ws(() => {
    l++, k();
  }, !0), { rows: t, total: n, offset: i, pageCount: r, pending: s, error: a, refresh: b };
}
function fr(e) {
  const t = Mt(/* @__PURE__ */ new Map()), n = H(!0);
  let s = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++s, o = e.query.value, i = e.schema.value, r = e.entities.value, u = e.within?.value.trim() ?? "";
    n.value = hn(o) && !u;
    const d = /* @__PURE__ */ new Map();
    for (const m of r) {
      const y = da(m, o.expr), k = u ? Vn(u, y) : y, b = e.source.value.query({
        query: { ...o, entity: m.key, expr: k, facets: St(m), page: 1 },
        schema: i,
        entity: m,
        limit: 0,
        offset: 0
      });
      b instanceof Promise ? (d.set(m.key, { total: 0, pending: !0 }), b.then((C) => {
        if (l !== s) return;
        const _ = new Map(t.value);
        _.set(m.key, { total: C.total, pending: !1 }), t.value = _;
      })) : d.set(m.key, { total: b.total, pending: !1 });
    }
    t.value = d;
  } };
}
const pr = 25, ga = (e, t) => e.toLowerCase() === t.toLowerCase();
function vr(e, t) {
  return e.find((n) => ga(n.id, t));
}
function hr(e) {
  const t = Mt(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), s = (i) => {
    if (i.facetKey !== Vt || !i.field || !i.value) return null;
    const r = fa(e.schema.value, i.field);
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
      limit: pr,
      offset: 0
    });
  }, l = (i, r) => {
    const u = rn(Oe(i.columns ?? [], "identity"), r);
    return u === Pn || ga(u, r.id) ? "" : u;
  }, o = () => {
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = s(d);
      m && !t.value.has(m.key) && !n.has(m.key) && i.set(m.key, m);
    }
    if (!i.size) return;
    const r = [...i.values()].map((d) => ({
      reference: d,
      outcome: a(d)
    })), u = (d) => {
      const m = new Map(t.value);
      d.forEach((y, k) => {
        const { reference: b } = r[k], C = vr(y.rows, b.id);
        m.set(b.key, C ? l(b.entity, C) : "");
      }), t.value = m;
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
const mr = ["data-dc-expanded"], gr = { class: "dc-header__domain" }, _r = {
  key: 0,
  class: "dc-header__within"
}, yr = ["title"], wr = ["data-dc-more", "title"], kr = {
  key: 0,
  class: "dc-header__pick"
}, br = { class: "dc-header__pick-box" }, $r = ["value"], xr = { value: "" }, Cr = ["value"], Mr = { class: "dc-header__pick" }, Sr = { class: "dc-header__pick-box" }, Er = ["value"], Pr = ["value"], Ar = { class: "dc-header__pick" }, zr = { class: "dc-header__pick-box" }, Tr = ["value"], Rr = ["value"], Lr = ["title", "aria-label"], Fr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Nr = ["title", "aria-label", "onClick"], Dr = ["aria-expanded", "aria-controls"], Ir = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Or = { class: "dc-header__sr" }, Br = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Kr = ["disabled"], qr = ["title"], Vr = ["value", "onKeydown"], Wr = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Ur = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Hr = ["disabled"], jr = {
  key: 1,
  class: "dc-header__actions"
}, Xr = /* @__PURE__ */ fe({
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
    ), i = v(() => l.value.formatCount ?? gt), r = fr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      entities: a.entities,
      within: a.within
    });
    function u(N) {
      if (n.hideCount) return N.count;
      if (N.key === a.query.value.entity && o.value) return i.value(a.total.value);
      if (r.pristine.value) return N.count;
      const q = r.counts.value.get(N.key);
      return q ? `${q.pending ? "~" : ""}${i.value(q.total)}` : N.count;
    }
    function d(N) {
      return `${N.label} · ${u(N)}`;
    }
    const m = v(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${i.value(a.total.value)}`), y = v(() => {
      const N = a.within.value.trim();
      return N ? Zn({ ...a.query.value, expr: N, facets: {} }, null) : [];
    }), k = v(
      () => (n.views ?? [...Xs]).map((N) => ({ key: N, label: yl[N] }))
    ), b = v(() => Ys(a.query.value.view, n.views)), C = v(
      () => !(a.within.value && a.query.value.entity === null && b.value === "cards")
    );
    function _(N) {
      a.setView(N.target.value);
    }
    const $ = v(
      () => a.sorts.value.map((N) => ({ key: N.key, label: N.label }))
    ), A = v(
      () => $.value.length > 0 && a.query.value.entity !== null && !a.within.value
    );
    function B(N) {
      a.setSort(N.target.value);
    }
    const L = v(() => a.query.value.dir === "desc"), D = v(() => {
      const N = a.entity.value?.scope?.toLowerCase();
      return a.terms.value.filter((K) => K.facetKey !== fn).map((K, q, O) => {
        const U = O[q - 1];
        return {
          term: K,
          or: U?.group !== void 0 && K.group !== void 0 && K.group !== U.group,
          idle: !!N && K.field?.toLowerCase() === N
        };
      });
    }), W = hr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...y.value, ...a.terms.value])
    });
    function E(N) {
      return fa(l.value, N)?.scopeLabel ?? N;
    }
    function R(N) {
      return N.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function G(N) {
      const K = W.nameOf(N);
      return K ? `${N.negated ? "-" : ""}${E(N.field)}: ${R(K)}` : N.label;
    }
    function re(N) {
      const K = N.target.value;
      a.setEntity(K || null);
    }
    function he(N) {
      N.target?.closest("button, select, label") || s("toggle");
    }
    const Y = H(null), _e = H("");
    function xe() {
      const N = Y.value;
      if (!N) {
        _e.value = "";
        return;
      }
      const K = N.scrollLeft > 1, q = N.scrollWidth - N.clientWidth - N.scrollLeft > 1;
      _e.value = K && q ? "both" : K ? "start" : q ? "end" : "";
    }
    let x = null;
    be(
      Y,
      (N) => {
        x?.disconnect(), x = null, xe(), !(!N || typeof ResizeObserver > "u") && (x = new ResizeObserver(xe), x.observe(N));
      },
      { flush: "post" }
    ), be(D, xe, { flush: "post" }), et(() => x?.disconnect());
    const F = v(() => a.query.value.page), Q = v(
      () => (a.pageCount.value > 1 || !!n.pagesNote) && !Kn(a.query.value)
    ), ne = v(
      () => `${a.pending.value ? "~" : ""}${gt(a.pageCount.value)}`
    ), me = v(() => {
      let N = `Page ${gt(F.value)} of ${ne.value}`;
      const K = a.rows.value.length;
      if (K) {
        const q = a.offset.value + 1, O = `${a.pending.value ? "~" : ""}${gt(a.total.value)}`;
        N += ` — rows ${gt(q)} to ${gt(q + K - 1)} of ${O}`;
      }
      return n.pagesNote ? `${N}
${n.pagesNote}` : N;
    }), Ce = H(null), Ke = v(() => Ce.value ?? String(F.value)), qe = v(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function Ve(N) {
      N.target.select();
    }
    function We(N) {
      const K = N.target, q = K.value.replace(/[^0-9]/g, "");
      K.value !== q && (K.value = q), Ce.value = q;
    }
    function Re(N) {
      const K = N.target, q = Number(Ce.value);
      Ce.value = null;
      const O = Number.isFinite(q) && q >= 1 ? Math.min(Math.trunc(q), Math.max(1, a.pageCount.value)) : F.value;
      K.value = String(O), O !== F.value && a.setPage(O);
    }
    function Ie(N) {
      const K = N.target;
      Ce.value = null, K.value = String(F.value), K.blur();
    }
    return (N, K) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      w("div", {
        class: "dc-header__trigger",
        onClick: he
      }, [
        w("span", gr, z(l.value.label), 1),
        y.value.length ? (f(), h("span", _r, [
          K[5] || (K[5] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(Z, null, ce(y.value, (q) => (f(), h("span", {
            key: `scope:${q.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: G(q)
          }, z(G(q)), 9, yr))), 128))
        ])) : T("", !0),
        w("div", {
          ref_key: "termBar",
          ref: Y,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": _e.value,
          title: S(a).summary.value,
          onScroll: xe
        }, [
          C.value ? (f(), h("label", kr, [
            K[7] || (K[7] = w("span", { class: "dc-header__sr" }, "Type", -1)),
            w("span", br, [
              w("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: S(a).query.value.entity ?? "",
                onFocus: K[0] || (K[0] = //@ts-ignore
                (...q) => S(r).refresh && S(r).refresh(...q)),
                onChange: re
              }, [
                w("option", xr, z(m.value), 1),
                (f(!0), h(Z, null, ce(S(a).entities.value, (q) => (f(), h("option", {
                  key: q.key,
                  value: q.key
                }, z(d(q)), 9, Cr))), 128))
              ], 40, $r),
              K[6] || (K[6] = w("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ])) : T("", !0),
          w("label", Mr, [
            K[9] || (K[9] = w("span", { class: "dc-header__sr" }, "View", -1)),
            w("span", Sr, [
              w("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: b.value,
                onChange: _
              }, [
                (f(!0), h(Z, null, ce(k.value, (q) => (f(), h("option", {
                  key: q.key,
                  value: q.key
                }, z(q.label), 9, Pr))), 128))
              ], 40, Er),
              K[8] || (K[8] = w("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          A.value ? (f(), h(Z, { key: 1 }, [
            w("label", Ar, [
              K[11] || (K[11] = w("span", { class: "dc-header__sr" }, "Sort", -1)),
              w("span", zr, [
                w("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: S(a).sort.value.key,
                  onChange: B
                }, [
                  (f(!0), h(Z, null, ce($.value, (q) => (f(), h("option", {
                    key: q.key,
                    value: q.key
                  }, z(q.label), 9, Rr))), 128))
                ], 40, Tr),
                K[10] || (K[10] = w("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            w("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: L.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${L.value ? "descending" : "ascending"}`,
              onClick: K[1] || (K[1] = (q) => S(a).toggleDirection())
            }, z(L.value ? "↓" : "↑"), 9, Lr)
          ], 64)) : T("", !0),
          (f(!0), h(Z, null, ce(D.value, (q) => (f(), h(Z, {
            key: q.term.id
          }, [
            q.or ? (f(), h("span", Fr, "or")) : T("", !0),
            w("button", {
              type: "button",
              class: Kt(["dc-term dc-mono", { "dc-term--idle": q.idle }]),
              title: q.idle ? `Not applied to ${S(a).entity.value?.label} — remove ${G(q.term)}` : `Remove ${G(q.term)}`,
              "aria-label": `Remove ${G(q.term)}`,
              onClick: (O) => S(a).removeTerm(q.term)
            }, z(G(q.term)), 11, Nr)
          ], 64))), 128))
        ], 40, wr),
        w("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: K[2] || (K[2] = (q) => s("toggle"))
        }, [
          w("span", Ir, z(e.expanded ? "▲" : "▼"), 1),
          w("span", Or, z(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Dr)
      ]),
      Q.value ? (f(), h("nav", Br, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: F.value <= 1,
          onClick: K[3] || (K[3] = (q) => S(a).setPage(F.value - 1))
        }, [...K[12] || (K[12] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Kr),
        w("span", {
          class: "dc-header__page dc-mono",
          title: me.value
        }, [
          w("input", {
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
          }, null, 44, Vr),
          w("span", Wr, "/ " + z(ne.value), 1)
        ], 8, qr),
        w("span", Ur, z(me.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: F.value >= S(a).pageCount.value,
          onClick: K[4] || (K[4] = (q) => S(a).setPage(F.value + 1))
        }, [...K[13] || (K[13] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Hr)
      ])) : T("", !0),
      N.$slots.actions ? (f(), h("div", jr, [
        ke(N.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ], 8, mr));
  }
}), pe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, _a = /* @__PURE__ */ pe(Xr, [["__scopeId", "data-v-60988f12"]]), Gr = { class: "dc-facet" }, Yr = ["id"], Qr = { class: "dc-facet__body" }, Zr = ["aria-labelledby"], Jr = ["aria-pressed", "data-dc-active", "onClick"], eo = ["aria-labelledby"], to = ["aria-label", "placeholder", "onKeydown"], no = ["aria-label", "placeholder", "onKeydown"], so = ["aria-checked"], ao = { class: "dc-switch__text" }, lo = ["data-dc-active"], ro = /* @__PURE__ */ fe({
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
    function l(m) {
      if (n.value.kind !== "chips") return;
      const y = a.value.has(m) ? n.value.selected.filter((k) => k !== m) : [...n.value.selected, m];
      s("update", { kind: "chips", selected: y });
    }
    const o = H(""), i = H("");
    be(
      () => n.value,
      (m) => {
        m.kind === "range" && (o.value = m.min === null ? "" : m.min, i.value = m.max === null ? "" : m.max);
      },
      { immediate: !0, deep: !0 }
    );
    function r(m) {
      if (typeof m == "number") return Number.isFinite(m) ? m : null;
      const y = m.trim();
      if (!y) return null;
      const k = Number(y);
      return Number.isFinite(k) ? k : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const m = r(o.value), y = r(i.value);
      m === n.value.min && y === n.value.max || s("update", { kind: "range", min: m, max: y });
    }
    function d() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (m, y) => (f(), h("div", Gr, [
      w("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, z(e.facet.label), 9, Yr),
      w("div", Qr, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), h(Z, null, ce(e.facet.options, (k) => (f(), h("button", {
            key: k,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(k),
            "data-dc-active": a.value.has(k) ? "true" : "false",
            onClick: (b) => l(k)
          }, z(k), 9, Jr))), 128))
        ], 8, Zr)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          Mn(w("input", {
            "onUpdate:modelValue": y[0] || (y[0] = (k) => o.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: dt(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, to), [
            [Sn, o.value]
          ]),
          y[2] || (y[2] = w("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          Mn(w("input", {
            "onUpdate:modelValue": y[1] || (y[1] = (k) => i.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: dt(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, no), [
            [Sn, i.value]
          ])
        ], 8, eo)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          w("span", ao, z(e.facet.text), 1),
          w("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...y[3] || (y[3] = [
            w("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, lo)
        ], 8, so)) : T("", !0)
      ])
    ]));
  }
}), ya = /* @__PURE__ */ pe(ro, [["__scopeId", "data-v-36d1334b"]]), oo = ["id"], io = { class: "dc-panel__section dc-panel__rows" }, co = { class: "dc-panel__row" }, uo = ["for"], fo = ["title", "aria-label", "onClick"], po = ["id", "placeholder", "onKeydown"], vo = { class: "dc-panel__actions" }, ho = ["disabled"], mo = {
  key: 0,
  class: "dc-panel__section"
}, go = /* @__PURE__ */ fe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Wt(), a = Me(), l = v(() => Bl(a.query.value.expr)), o = v(() => l.value.parts.map(Ht)), i = H(l.value.text), r = H(null);
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
    function m(C) {
      const { parts: _, text: $ } = l.value;
      a.setExpression(Es(_.filter((A, B) => B !== C), $));
    }
    function y(C) {
      const { parts: _ } = l.value;
      i.value || !_.length || (C.preventDefault(), m(_.length - 1));
    }
    function k() {
      i.value = "", a.clearFilters();
    }
    function b(C, _) {
      a.setFacet(C, _);
    }
    return qt(() => r.value?.focus()), (C, _) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: _[2] || (_[2] = dt(Fe(($) => n("close"), ["stop"]), ["esc"]))
    }, [
      w("section", io, [
        w("div", co, [
          w("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, uo),
          w("div", {
            class: "dc-field",
            onMousedown: _[1] || (_[1] = Fe(($) => r.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(Z, null, ce(o.value, ($, A) => (f(), h("button", {
              key: `${A}:${$}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${$}`,
              "aria-label": `Remove ${$}`,
              onClick: (B) => m(A)
            }, z($), 9, fo))), 128)),
            Mn(w("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: r,
              "onUpdate:modelValue": _[0] || (_[0] = ($) => i.value = $),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: o.value.length ? "" : S(a).schema.value.placeholder,
              onKeydown: [
                dt(Fe(d, ["prevent"]), ["enter"]),
                dt(y, ["backspace"])
              ]
            }, null, 40, po), [
              [Sn, i.value]
            ])
          ], 32)
        ]),
        S(a).entity.value ? (f(!0), h(Z, { key: 0 }, ce(S(a).entity.value.facets, ($) => (f(), le(ya, {
          key: $.key,
          facet: $,
          value: S(a).query.value.facets[$.key],
          onUpdate: (A) => b($.key, A)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : T("", !0),
        w("div", vo, [
          w("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          w("button", {
            type: "button",
            class: "dc-button",
            disabled: S(a).isPristine.value && !u.value,
            onClick: k
          }, " Reset ", 8, ho)
        ])
      ]),
      s["panel-section"] ? (f(), h("section", mo, [
        ke(C.$slots, "panel-section", {}, void 0, !0)
      ])) : T("", !0)
    ], 40, oo));
  }
}), wa = /* @__PURE__ */ pe(go, [["__scopeId", "data-v-2642c02d"]]), _o = {
  key: 0,
  class: "dc-actions"
}, yo = {
  key: 0,
  class: "dc-actions__select"
}, wo = { class: "dc-actions__all" }, ko = ["checked", "indeterminate"], bo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, $o = { class: "dc-actions__ops" }, xo = ["disabled"], Co = ["disabled"], Mo = /* @__PURE__ */ fe({
  __name: "RecordActions",
  setup(e) {
    const t = Me(), n = v(() => t.entity.value), s = v(() => !Kn(t.query.value)), a = v(() => s.value && t.selectable.value), l = v(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), o = v(() => t.selection.value.ids.length), i = v(() => t.rows.value.filter((y) => t.isSelected(y)).length), r = v(
      () => t.rows.value.length > 0 && i.value === t.rows.value.length
    ), u = v(() => i.value > 0 && !r.value), d = v(() => o.value ? `${o.value} selected` : "Select all");
    function m(y) {
      return o.value ? `${y} ${o.value}` : y;
    }
    return (y, k) => l.value ? (f(), h("div", _o, [
      a.value ? (f(), h("div", yo, [
        w("label", wo, [
          w("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: r.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: k[0] || (k[0] = (b) => S(t).selectPage(!r.value))
          }, null, 40, ko),
          w("span", bo, z(d.value), 1)
        ]),
        o.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[1] || (k[1] = (b) => S(t).clearSelection())
        }, " Clear ")) : T("", !0)
      ])) : T("", !0),
      w("div", $o, [
        n.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: k[2] || (k[2] = (b) => S(t).create(n.value))
        }, [
          k[5] || (k[5] = w("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          je(" " + z(n.value.create), 1)
        ])) : T("", !0),
        n.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !o.value,
          onClick: k[3] || (k[3] = (b) => S(t).duplicate())
        }, z(m(n.value.duplicate)), 9, xo)) : T("", !0),
        n.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !o.value,
          onClick: k[4] || (k[4] = (b) => S(t).delete())
        }, z(m(n.value.delete)), 9, Co)) : T("", !0)
      ])
    ])) : T("", !0);
  }
}), ka = /* @__PURE__ */ pe(Mo, [["__scopeId", "data-v-ca4aca14"]]);
function So(e, t) {
  if (!e) return null;
  const n = De(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Eo(e, t) {
  const n = Oe(t, "state"), s = Oe(t, "tint");
  return {
    identity: rn(Oe(t, "identity"), e),
    reference: rn(Oe(t, "reference"), e),
    metrics: aa(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Ut(a, e)
    })),
    state: n ? De(n, e) ?? null : null,
    updated: rn(Oe(t, "updated"), e),
    image: So(Oe(t, "image"), e),
    tint: s ? De(s, e) ?? null : null
  };
}
function ba(e, t, n, s, a = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Sl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: xl(t),
    parts: Eo(e, l),
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
      (n, s) => ba(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Po = ["data-dc-status"], Ao = /* @__PURE__ */ fe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, z(e.status), 9, Po));
  }
}), jt = /* @__PURE__ */ pe(Ao, [["__scopeId", "data-v-23e59fbf"]]), zo = ["title"], To = { key: 1 }, Ro = /* @__PURE__ */ fe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Me(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((r) => r.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), l = v(() => Ut(t.column, t.entry.row));
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
        je(z(l.value), 1)
      ], !0)
    ], 8, zo)) : (f(), h("span", To, [
      ke(i.$slots, "default", {}, () => [
        je(z(l.value), 1)
      ], !0)
    ]));
  }
}), Xt = /* @__PURE__ */ pe(Ro, [["__scopeId", "data-v-f2501b17"]]), Lo = ["data-dc-active", "aria-pressed", "aria-label"], Fo = /* @__PURE__ */ fe({
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
    }, z(e.pinned ? "★" : "☆"), 9, Lo));
  }
}), Jn = /* @__PURE__ */ pe(Fo, [["__scopeId", "data-v-ef63d763"]]), No = ["src"], Do = /* @__PURE__ */ fe({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = H(!1);
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
    }, null, 40, No)) : T("", !0);
  }
}), es = /* @__PURE__ */ pe(Do, [["__scopeId", "data-v-afaab300"]]), Io = ["title", "aria-label"], Oo = /* @__PURE__ */ fe({
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
    }, " → ", 8, Io)) : T("", !0);
  }
}), Gt = /* @__PURE__ */ pe(Oo, [["__scopeId", "data-v-feb1c62d"]]), Bo = ["checked", "aria-label"], At = /* @__PURE__ */ fe({
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
    }, null, 8, Bo));
  }
}), Ko = { class: "dc-cards" }, qo = { class: "dc-card__top dc-mono" }, Vo = { class: "dc-card__lead" }, Wo = {
  key: 1,
  class: "dc-card__entity"
}, Uo = { class: "dc-card__top-right" }, Ho = ["onClick"], jo = { class: "dc-card__names" }, Xo = { class: "dc-card__primary" }, Go = { class: "dc-card__secondary dc-mono" }, Yo = { class: "dc-card__metrics dc-mono" }, Qo = {
  key: 0,
  class: "dc-card__date"
}, Zo = /* @__PURE__ */ fe({
  __name: "CardsView",
  setup(e) {
    const t = Me(), n = Pt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), h("div", Ko, [
      (f(!0), h(Z, null, ce(S(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-card"
      }, [
        w("div", qo, [
          w("span", Vo, [
            S(t).selectable.value ? (f(), le(At, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            je(" " + z(o.ordinal) + " ", 1),
            s.value ? (f(), h("span", Wo, z(o.entityLabel), 1)) : T("", !0)
          ]),
          w("span", Uo, [
            o.parts.state ? (f(), le(jt, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : T("", !0),
            ye(Gt, { entry: o }, null, 8, ["entry"]),
            S(t).pinnable.value ? (f(), le(Jn, {
              key: 1,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        w("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => S(t).activate(o.row, S(Ge)(i))
        }, [
          o.parts.image ? (f(), le(es, {
            key: 0,
            class: "dc-card__image",
            src: o.parts.image
          }, null, 8, ["src"])) : T("", !0),
          w("span", jo, [
            w("span", Xo, z(o.parts.identity), 1),
            w("span", Go, z(o.parts.reference), 1)
          ])
        ], 8, Ho),
        w("div", Yo, [
          (f(!0), h(Z, null, ce(o.parts.metrics.slice(0, 2), (i) => (f(), le(Xt, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, {
            default: He(() => [
              je(z(i.label) + " " + z(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (f(), h("span", Qo, z(o.parts.updated), 1)) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), $a = /* @__PURE__ */ pe(Zo, [["__scopeId", "data-v-434bd32f"]]), Jo = { class: "dc-grid" }, ei = ["onClick"], ti = { class: "dc-tile__scrim" }, ni = { class: "dc-tile__top dc-mono" }, si = { class: "dc-tile__chip" }, ai = { class: "dc-tile__caption" }, li = { class: "dc-tile__secondary dc-truncate" }, ri = { class: "dc-tile__primary" }, oi = /* @__PURE__ */ fe({
  __name: "GridView",
  setup(e) {
    const t = Me(), n = Pt();
    return (s, a) => (f(), h("div", Jo, [
      (f(!0), h(Z, null, ce(S(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        w("button", {
          type: "button",
          class: "dc-tile",
          style: Te({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (o) => S(t).activate(l.row, S(Ge)(o))
        }, [
          l.parts.image ? (f(), le(es, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : T("", !0),
          w("span", ti, [
            w("span", ni, [
              w("span", si, z(l.ordinal), 1)
            ]),
            w("span", ai, [
              w("span", li, z(l.parts.reference), 1),
              w("span", ri, z(l.parts.identity), 1)
            ])
          ])
        ], 12, ei),
        S(t).selectable.value ? (f(), le(At, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), xa = /* @__PURE__ */ pe(oi, [["__scopeId", "data-v-7df25d40"]]), ii = { class: "dc-links" }, ci = ["onClick"], ui = { class: "dc-link__primary dc-truncate" }, di = { class: "dc-link__secondary dc-mono dc-truncate" }, fi = /* @__PURE__ */ fe({
  __name: "LinksView",
  setup(e) {
    const t = Me(), n = Pt();
    return (s, a) => (f(), h("div", ii, [
      (f(!0), h(Z, null, ce(S(n), (l) => (f(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        S(t).selectable.value ? (f(), le(At, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        w("button", {
          type: "button",
          class: "dc-link",
          onClick: (o) => S(t).activate(l.row, S(Ge)(o))
        }, [
          w("span", ui, z(l.parts.identity), 1),
          w("span", di, z(l.parts.reference), 1)
        ], 8, ci)
      ]))), 128))
    ]));
  }
}), Ca = /* @__PURE__ */ pe(fi, [["__scopeId", "data-v-08d0266c"]]), pi = {
  class: "dc-list",
  role: "list"
}, vi = ["onClick"], hi = { class: "dc-list__ordinal dc-mono" }, mi = { class: "dc-list__identity" }, gi = { class: "dc-list__primary dc-truncate" }, _i = { class: "dc-list__secondary dc-mono dc-truncate" }, yi = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, wi = { class: "dc-list__metrics dc-mono" }, ki = { class: "dc-list__trailing" }, bi = /* @__PURE__ */ fe({
  __name: "ListView",
  setup(e) {
    const t = Me(), n = Pt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), h("div", pi, [
      (f(!0), h(Z, null, ce(S(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        S(t).selectable.value ? (f(), le(At, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        w("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => S(t).activate(o.row, S(Ge)(i))
        }, [
          w("span", hi, z(o.ordinal), 1),
          w("span", mi, [
            w("span", gi, z(o.parts.identity), 1),
            w("span", _i, z(o.parts.reference), 1)
          ])
        ], 8, vi),
        s.value ? (f(), h("span", yi, z(o.entityLabel), 1)) : T("", !0),
        w("span", wi, [
          (f(!0), h(Z, null, ce(o.parts.metrics.slice(0, 2), (i) => (f(), le(Xt, {
            key: i.column.key ?? i.label,
            entry: o,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", ki, [
          o.parts.state ? (f(), le(jt, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : T("", !0),
          ye(Gt, { entry: o }, null, 8, ["entry"]),
          S(t).pinnable.value ? (f(), le(Jn, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Tn = /* @__PURE__ */ pe(bi, [["__scopeId", "data-v-8e3fd7b4"]]), $i = { class: "dc-preview" }, xi = { class: "dc-preview__pager dc-mono" }, Ci = ["disabled"], Mi = { "aria-live": "polite" }, Si = ["disabled"], Ei = {
  key: 0,
  class: "dc-preview__card"
}, Pi = { class: "dc-preview__body" }, Ai = { class: "dc-preview__top" }, zi = { class: "dc-preview__badges" }, Ti = { class: "dc-preview__entity dc-mono" }, Ri = { class: "dc-preview__marks" }, Li = { class: "dc-preview__primary" }, Fi = { class: "dc-preview__secondary dc-mono" }, Ni = { class: "dc-preview__fields" }, Di = { class: "dc-preview__key" }, Ii = { class: "dc-preview__value dc-mono" }, Oi = /* @__PURE__ */ fe({
  __name: "PreviewView",
  setup(e) {
    const t = Me(), n = Pt(), s = H(0);
    be(n, (r) => {
      s.value > r.length - 1 && (s.value = Math.max(0, r.length - 1));
    });
    const a = v(() => n.value[s.value]), l = v(() => {
      const r = a.value;
      if (!r) return [];
      const u = Oe(r.columns, "reference"), d = Oe(r.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: r.parts.reference, column: null }] : [],
        ...r.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
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
    return (r, u) => (f(), h("div", $i, [
      w("div", xi, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => i(-1))
        }, " ‹ ", 8, Ci),
        w("span", Mi, z(o.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= S(n).length - 1,
          onClick: u[1] || (u[1] = (d) => i(1))
        }, " › ", 8, Si)
      ]),
      a.value ? (f(), h("div", Ei, [
        w("div", {
          class: "dc-preview__media",
          style: Te({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        w("div", Pi, [
          w("div", Ai, [
            w("span", zi, [
              S(t).selectable.value ? (f(), le(At, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              a.value.parts.state ? (f(), le(jt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              w("span", Ti, z(a.value.entityLabel), 1)
            ]),
            w("span", Ri, [
              ye(Gt, { entry: a.value }, null, 8, ["entry"]),
              S(t).pinnable.value ? (f(), le(Jn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          w("div", null, [
            w("div", Li, z(a.value.parts.identity), 1),
            w("div", Fi, z(a.value.parts.reference), 1)
          ]),
          w("dl", Ni, [
            (f(!0), h(Z, null, ce(l.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", Di, z(d.key), 1),
              w("dd", Ii, [
                d.column && a.value ? (f(), le(Xt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(Z, { key: 1 }, [
                  je(z(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          w("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => S(t).activate(a.value.row, S(Ge)(d)))
          }, " Open record → ")
        ])
      ])) : T("", !0)
    ]));
  }
}), Ma = /* @__PURE__ */ pe(Oi, [["__scopeId", "data-v-b14eee6d"]]);
function Bi() {
  const e = Me();
  return v(() => Cl(e.schema.value, e.entity.value));
}
const Ki = ["title"], qi = {
  key: 5,
  class: "dc-cell__text"
}, Vi = /* @__PURE__ */ fe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Me(), s = v(() => t.column.kind ?? "text"), a = v(() => De(t.column, t.entry.row)), l = v(
      () => s.value === "ordinal" ? t.entry.ordinal : Ut(t.column, t.entry.row)
    ), o = v(() => a.value), i = v(() => t.column.activate === !0 || !!t.column.click), r = v(() => An(t.column)), u = v(() => la(t.column, t.entry.row));
    function d(m) {
      if (!i.value) return;
      m.stopPropagation();
      const y = Ge(m);
      t.column.click?.(t.entry.row, y), t.column.activate && n.activate(t.entry.row, y);
    }
    return (m, y) => s.value === "component" && e.column.component ? (f(), le(On(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), le(jt, {
      key: 1,
      status: o.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), le(es, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Te({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), le(Xt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: Kt(["dc-table__open", { "dc-truncate": r.value }]),
      title: u.value,
      onClick: d
    }, z(l.value), 11, Ki)) : (f(), h("span", qi, z(l.value), 1));
  }
}), Ls = /* @__PURE__ */ pe(Vi, [["__scopeId", "data-v-70ba8aa2"]]), Wi = {
  key: 0,
  class: "dc-table__none"
}, Ui = { class: "dc-table__detail" }, Hi = ["data-dc-wrap"], ji = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Xi = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Gi = ["onClick"], Yi = {
  key: 2,
  class: "dc-table__head"
}, Qi = ["onClick"], Zi = {
  key: 0,
  class: "dc-table__pick"
}, Ji = ["data-dc-align", "data-dc-hide", "title"], ec = {
  key: 0,
  class: "dc-table__name"
}, tc = /* @__PURE__ */ fe({
  __name: "TableView",
  setup(e) {
    const t = Me(), n = Pt(), s = Bi(), a = v(
      () => s.value.some((y) => y.kind === "image" || y.height !== void 0)
    );
    function l(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const o = v(() => t.entity.value?.label ?? "The result set"), i = v(() => new Set(t.sorts.value.map((y) => y.key))), r = (y) => y.sort !== void 0 && i.value.has(y.sort), u = (y) => {
      if (r(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function d(y) {
      return [
        Cs(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        An(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function m(y, k) {
      if (!(!An(y) || y.activate || y.click))
        return la(y, k.row);
    }
    return (y, k) => S(s).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      w("thead", null, [
        w("tr", null, [
          S(t).selectable.value ? (f(), h("th", ji, [...k[3] || (k[3] = [
            w("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : T("", !0),
          (f(!0), h(Z, null, ce(S(s), (b, C) => (f(), h("th", {
            key: S($s)(b, C),
            scope: "col",
            class: Kt(S(Cs)(b)),
            style: Te({ width: b.width }),
            "data-dc-align": S(xs)(b),
            "data-dc-hide": b.hideBelow,
            "aria-sort": u(b),
            title: b.hint
          }, [
            r(b) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (_) => l(b.sort)
            }, z(b.label), 9, Gi)) : (f(), h(Z, { key: 1 }, [
              je(z(b.label), 1)
            ], 64)),
            b.header ? (f(), h("span", Yi, [
              (f(), le(On(b.header), {
                column: b,
                entity: S(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, Xi))), 128))
        ])
      ]),
      w("tbody", null, [
        (f(!0), h(Z, null, ce(S(n), (b) => (f(), h("tr", {
          key: b.key,
          class: "dc-table__row",
          onClick: (C) => S(t).activate(b.row, S(Ge)(C))
        }, [
          S(t).selectable.value ? (f(), h("td", Zi, [
            ye(At, {
              row: b.row,
              selected: b.selected,
              name: b.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          (f(!0), h(Z, null, ce(S(s), (C, _) => (f(), h("td", {
            key: S($s)(C, _),
            class: Kt(d(C)),
            "data-dc-align": S(xs)(C),
            "data-dc-hide": C.hideBelow,
            title: m(C, b)
          }, [
            C.scope ? (f(), h("span", ec, [
              ye(Ls, {
                column: C,
                entry: b
              }, null, 8, ["column", "entry"]),
              ye(Gt, { entry: b }, null, 8, ["entry"])
            ])) : (f(), le(Ls, {
              key: 1,
              column: C,
              entry: b
            }, null, 8, ["column", "entry"]))
          ], 10, Ji))), 128))
        ], 8, Qi))), 128))
      ])
    ], 8, Hi)) : (f(), h("p", Wi, [
      k[2] || (k[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", Ui, [
        je(z(o.value) + " has no ", 1),
        k[0] || (k[0] = w("code", null, "columns", -1)),
        k[1] || (k[1] = je(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Sa = /* @__PURE__ */ pe(tc, [["__scopeId", "data-v-25251288"]]);
function nc(e) {
  const t = Mt([]), n = H(!1), s = Mt(null);
  let a = 0;
  const l = (r, u, d, m, y) => ({
    entity: r,
    rows: u.rows.map(
      (k, b) => ba(k, b, r, e.isPinned(k.id))
    ),
    total: u.total,
    count: d ? r.count : String(u.total),
    pinned: sc(m, u, y)
  }), o = () => {
    const r = ++a, u = e.query.value, d = e.schema.value, m = e.entities.value, y = e.limit.value, k = e.within?.value.trim() ?? "", b = hn(u) && !k, C = k ? Vn(k, u.expr) : u.expr, _ = m.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: $.key, expr: C, facets: St($), page: 1 },
        schema: d,
        entity: $,
        limit: y,
        offset: 0
      })
    }));
    if (_.every(({ outcome: $ }) => !($ instanceof Promise))) {
      t.value = _.map(
        ({ entity: $, outcome: A }) => l($, A, b, d, C)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(_.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      r === a && (t.value = $.map(
        (A, B) => l(_[B].entity, A, b, d, C)
      ), s.value = null);
    }).catch(($) => {
      r === a && (s.value = $, t.value = []);
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
function sc(e, t, n) {
  const s = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !s)
    return !1;
  const a = n.trim();
  if (!a)
    return !1;
  const l = Wn(e, s);
  return !!l && ua(a, l) === a;
}
const ac = ["data-dc-pending"], lc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, rc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, oc = {
  key: 2,
  class: "dc-types__state"
}, ic = ["data-dc-empty"], cc = ["onClick"], uc = { class: "dc-type__name" }, dc = { class: "dc-type__count dc-mono" }, fc = { class: "dc-type__sr" }, pc = {
  key: 0,
  class: "dc-type__empty"
}, vc = ["onClick"], hc = { class: "dc-type__identity" }, mc = { class: "dc-type__primary dc-truncate" }, gc = { class: "dc-type__secondary dc-mono dc-truncate" }, _c = { class: "dc-type__trailing dc-mono" }, yc = { class: "dc-type__metric-value" }, wc = { class: "dc-type__metric-label" }, kc = {
  key: 0,
  class: "dc-type__date"
}, bc = ["onClick"], $c = /* @__PURE__ */ fe({
  __name: "TypeCardsView",
  setup(e) {
    const t = Me(), { previews: n, pending: s, error: a } = nc({
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
      "data-dc-pending": S(s) ? "true" : "false"
    }, [
      ke(i.$slots, "before", {}, void 0, !0),
      S(a) ? (f(), h("p", lc, " Could not load results: " + z(S(a) instanceof Error ? S(a).message : "the data source failed."), 1)) : !o.value.length && S(s) ? (f(), h("p", rc, " Running query… ")) : o.value.length ? T("", !0) : (f(), h("p", oc, z(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(Z, null, ce(o.value, (u) => (f(), h("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        w("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => S(t).setEntity(u.entity.key)
        }, [
          w("span", uc, z(u.entity.label), 1),
          w("span", dc, z(u.count), 1),
          r[0] || (r[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", fc, "Show only " + z(u.entity.label.toLowerCase()), 1)
        ], 8, cc),
        u.rows.length ? T("", !0) : (f(), h("p", pc, z(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(Z, null, ce(u.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (m) => S(t).activate(d.row, S(Ge)(m))
          }, [
            w("span", hc, [
              w("span", mc, z(d.parts.identity), 1),
              w("span", gc, z(d.parts.reference), 1)
            ])
          ], 8, vc),
          w("span", _c, [
            (f(!0), h(Z, null, ce(d.parts.metrics.slice(0, 1), (m) => (f(), le(Xt, {
              key: m.column.key ?? m.label,
              class: "dc-type__metric",
              entry: d,
              column: m.column
            }, {
              default: He(() => [
                w("span", yc, z(m.text), 1),
                w("span", wc, z(m.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", kc, z(d.parts.updated), 1)) : T("", !0),
            ye(Gt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => S(t).create(u.entity)
        }, [
          r[1] || (r[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          je(" " + z(u.entity.create), 1)
        ], 8, bc)) : T("", !0)
      ], 8, ic))), 128)),
      ke(i.$slots, "after", {}, void 0, !0)
    ], 8, ac));
  }
}), Ea = /* @__PURE__ */ pe($c, [["__scopeId", "data-v-eb7e0cec"]]), xc = ["data-dc-pending"], Cc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Mc = { class: "dc-results__detail" }, Sc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ec = {
  key: 3,
  class: "dc-results__state"
}, Pc = { class: "dc-results__detail" }, Ac = /* @__PURE__ */ fe({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = Me(), s = Wt(), a = {
      list: Tn,
      cards: $a,
      grid: xa,
      table: Sa,
      links: Ca,
      preview: Ma
    }, l = v(() => Kn(n.query.value)), o = v(() => Ys(n.query.value.view, t.views)), i = v(() => a[o.value] ?? Tn), r = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = H(null);
    return be(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (m, y) => (f(), h("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": S(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), le(Ea, { key: 0 }, an({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: He(() => [
            ke(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: He(() => [
            ke(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), h("p", Cc, [
        y[1] || (y[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", Mc, z(S(n).error.value instanceof Error ? S(n).error.value.message : "The data source failed."), 1)
      ])) : !r.value && S(n).pending.value ? (f(), h("p", Sc, [...y[2] || (y[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : r.value ? (f(), le(On(i.value), { key: 4 })) : (f(), h("div", Ec, [
        y[3] || (y[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", Pc, z(S(n).summary.value), 1),
        S(n).isPristine.value ? T("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: y[0] || (y[0] = (k) => S(n).clearFilters())
        }, z(S(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, xc));
  }
}), Pa = /* @__PURE__ */ pe(Ac, [["__scopeId", "data-v-41f54508"]]), zc = ["data-dc-theme"], Tc = ["data-dc-width", "data-dc-align"], Rc = { class: "dc-shell__panel" }, Lc = /* @__PURE__ */ fe({
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
    const s = e, a = n, l = Nt(e, "open"), o = Nt(e, "pinned"), i = Nt(e, "selected"), r = Wt(), u = Ct(js, null), d = s.route || u ? null : gl(), m = s.route ?? u ?? d;
    et(() => d?.dispose?.());
    const y = v(() => Ql({ seed: s.schema.key })), k = v(() => s.source ?? y.value), b = ur({
      schema: () => s.schema,
      adapter: m,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), C = v(() => s.within?.trim() ?? ""), _ = dr({
      source: k,
      query: b.query,
      schema: v(() => s.schema),
      entity: b.entity,
      limit: v(() => s.limit),
      within: C
    });
    be(b.query, (x) => a("query-change", x)), be(
      [_.pageCount, _.pending, b.query],
      () => {
        if (_.pending.value) return;
        const x = _.pageCount.value;
        b.query.value.page > x && b.setPage(x, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Us() ?? "dc-query-panel", A = H(null);
    function B() {
      l.value && (l.value = !1, qt(() => {
        A.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const L = v(() => new Set(o.value));
    function D(x) {
      const F = new Set(L.value);
      F.has(x.id) ? F.delete(x.id) : F.add(x.id), o.value = [...F], a("toggle-pin", x);
    }
    const W = v(() => {
      if (s.selectable === !0) return !0;
      const x = b.entity.value;
      return !!(x?.duplicate || x?.delete);
    }), E = v(() => new Set(i.value));
    function R(x) {
      const F = new Set(E.value);
      F.has(x.id) ? F.delete(x.id) : F.add(x.id), i.value = [...F];
    }
    function G(x) {
      const F = new Set(E.value);
      for (const Q of _.rows.value)
        x ? F.add(Q.id) : F.delete(Q.id);
      i.value = [...F];
    }
    function re() {
      i.value.length && (i.value = []);
    }
    const he = v(() => ({
      ids: [...i.value],
      rows: _.rows.value.filter((x) => E.value.has(x.id)),
      entity: b.entity.value
    }));
    be(() => b.query.value.entity, re);
    function Y(x, F, Q = {}) {
      const ne = er(s.schema, b.query.value, x, Q);
      Q.exclude ? b.narrow(ne, F?.key ?? b.query.value.entity) : b.narrow(ne, F?.key ?? null, F ? void 0 : "cards"), a("drill", x, F, Q);
    }
    const _e = tr({
      ...b,
      schema: v(() => s.schema),
      entities: v(() => s.schema.entities),
      rows: _.rows,
      total: _.total,
      limit: v(() => s.limit),
      offset: _.offset,
      pageCount: _.pageCount,
      pending: _.pending,
      error: _.error,
      source: k,
      previewsPerType: v(() => s.previewsPerType),
      within: C,
      pinnable: v(() => s.pinnable === !0),
      isPinned: (x) => L.value.has(x.id),
      isPinnedId: (x) => L.value.has(x),
      togglePin: D,
      selectable: W,
      selection: he,
      isSelected: (x) => E.value.has(x.id),
      toggleSelect: R,
      selectPage: G,
      clearSelection: re,
      narrowsOnPress: v(() => s.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (x, F = {}) => {
        if (s.rowPress === "narrow" && Wn(s.schema, x)) {
          Y(x, null, F);
          return;
        }
        a("activate", x);
      },
      create: (x) => a("create", x),
      duplicate: () => a("duplicate", he.value),
      delete: () => a("delete", he.value),
      drill: Y
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
    }), (x, F) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Te(xe.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ye(_a, {
          ref_key: "headerRef",
          ref: A,
          expanded: l.value,
          "panel-id": S($),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: F[0] || (F[0] = (Q) => l.value = !l.value)
        }, an({ _: 2 }, [
          r.actions ? {
            name: "actions",
            fn: He(() => [
              ke(x.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), h(Z, { key: 0 }, [
          w("div", {
            class: "dc-shell__scrim",
            onClick: B
          }),
          w("div", Rc, [
            ye(wa, {
              "panel-id": S($),
              onClose: B
            }, an({ _: 2 }, [
              r["panel-section"] ? {
                name: "panel-section",
                fn: He(() => [
                  ke(x.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : T("", !0)
      ], 8, Tc),
      ye(ka),
      ke(x.$slots, "results", {
        rows: S(_e).rows.value,
        total: S(_e).total.value,
        offset: S(_e).offset.value,
        pageCount: S(_e).pageCount.value,
        query: S(_e).query.value,
        pending: S(_e).pending.value
      }, () => [
        ye(Pa, { views: e.views }, an({ _: 2 }, [
          r["cards-before"] ? {
            name: "cards-before",
            fn: He(() => [
              ke(x.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          r["cards-after"] ? {
            name: "cards-after",
            fn: He(() => [
              ke(x.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, zc));
  }
}), Fc = /* @__PURE__ */ pe(Lc, [["__scopeId", "data-v-7b71d70f"]]), Nc = ["data-dc-muted"], Dc = {
  key: 0,
  class: "dc-shell-card__head"
}, Ic = { class: "dc-shell-card__title" }, Oc = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Bc = {
  key: 0,
  class: "dc-shell-card__aside"
}, Kc = ["data-dc-flush"], qc = {
  key: 2,
  class: "dc-shell-card__foot"
}, Vc = /* @__PURE__ */ fe({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), s = Wt();
    function a(d) {
      return l(d?.() ?? []);
    }
    function l(d) {
      return d.some((m) => m.type === fl ? !1 : m.type === pl ? String(m.children ?? "").trim().length > 0 : m.type === Z ? l(m.children ?? []) : !0);
    }
    const o = v(() => !!t.title || i.value || a(s.head)), i = v(() => a(s.aside)), r = v(() => a(s.default)), u = v(() => a(s.foot));
    return (d, m) => (f(), h("section", {
      class: "dc-shell-card",
      style: Te(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      o.value ? (f(), h("header", Dc, [
        ke(d.$slots, "head", {}, () => [
          w("h2", Ic, z(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Oc, z(e.count), 1)) : T("", !0)
        ], !0),
        i.value ? (f(), h("span", Bc, [
          ke(d.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ])) : T("", !0),
      r.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        ke(d.$slots, "default", {}, void 0, !0)
      ], 8, Kc)) : T("", !0),
      u.value ? (f(), h("footer", qc, [
        ke(d.$slots, "foot", {}, void 0, !0)
      ])) : T("", !0)
    ], 12, Nc));
  }
}), Fd = /* @__PURE__ */ pe(Vc, [["__scopeId", "data-v-75f2ef0b"]]), Wc = ["aria-label"], Uc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Hc = /* @__PURE__ */ fe({
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
        class: Kt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": r.key === e.modelValue,
        "data-dc-active": r.key === e.modelValue ? "true" : "false",
        tabindex: r.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", r.key),
        onKeydown: (d) => l(d, u)
      }, z(r.label), 43, Uc))), 128))
    ], 8, Wc));
  }
}), jc = /* @__PURE__ */ pe(Hc, [["__scopeId", "data-v-63fb5482"]]), Dt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Xc = ["aria-label"], Gc = ["role", "aria-label"], Yc = ["data-dc-item"], Qc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Zc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Jc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, eu = { class: "dc-menu__label dc-truncate" }, tu = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, nu = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, su = /* @__PURE__ */ fe({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = H(null), o = H([]), i = H(null), r = H(null), u = H(null), d = H(!1), m = v(
      () => s.items.flatMap((E, R) => Dt(E) ? [R] : [])
    ), y = v(() => {
      const E = [{ entries: [] }];
      return s.items.forEach((R, G) => {
        R.heading ? E.push({ heading: R, entries: [] }) : E[E.length - 1]?.entries.push({ item: R, index: G });
      }), E.filter((R) => R.entries.length > 0);
    }), k = H({ x: s.at.x, y: s.at.y });
    async function b() {
      k.value = { x: s.at.x, y: s.at.y }, await qt();
      const E = l.value?.getBoundingClientRect();
      if (!E) return;
      const R = 8;
      let G = s.at.x, re = s.at.y;
      if (G + E.width > window.innerWidth - R) {
        const he = s.at.mirrorX === void 0 ? null : s.at.mirrorX - E.width;
        G = he !== null && he >= R ? he : window.innerWidth - E.width - R;
      }
      re + E.height > window.innerHeight - R && (re = window.innerHeight - E.height - R), k.value = { x: Math.max(R, G), y: Math.max(R, re) };
    }
    const C = v(() => ({ left: `${k.value.x}px`, top: `${k.value.y}px` }));
    function _(E) {
      i.value = E, E !== null && qt(() => o.value[E]?.focus());
    }
    function $(E, R) {
      const G = m.value;
      if (G.length === 0) return null;
      if (E === null) return R === 1 ? G[0] ?? null : G[G.length - 1] ?? null;
      const re = G.indexOf(E);
      return re === -1 ? G[0] ?? null : G[(re + R + G.length) % G.length] ?? null;
    }
    function A(E, R) {
      if (!s.items[E]?.items?.length) return;
      const re = o.value[E]?.getBoundingClientRect(), he = l.value?.getBoundingClientRect();
      !re || !he || (u.value = { x: he.right - 4, y: re.top - 4, mirrorX: he.left + 4 }, r.value = E, d.value = R);
    }
    function B(E) {
      const R = r.value;
      r.value = null, u.value = null, E && R !== null && _(R);
    }
    function L(E) {
      const R = s.items[E];
      if (!(!R || !Dt(R))) {
        if (R.items?.length) {
          A(E, !0);
          return;
        }
        a("choose", R);
      }
    }
    function D(E) {
      const R = E.key;
      if (R === "Escape") {
        E.preventDefault(), E.stopPropagation(), r.value !== null ? B(!0) : a("dismiss");
        return;
      }
      if (R === "ArrowDown" || R === "ArrowUp") {
        E.preventDefault(), E.stopPropagation(), B(!1), _($(i.value, R === "ArrowDown" ? 1 : -1));
        return;
      }
      if (R === "Home" || R === "End") {
        E.preventDefault(), E.stopPropagation(), B(!1), _($(null, R === "Home" ? 1 : -1));
        return;
      }
      if (R === "ArrowRight") {
        const G = i.value;
        G !== null && s.items[G]?.items?.length && (E.preventDefault(), E.stopPropagation(), A(G, !0));
        return;
      }
      if (R === "ArrowLeft") {
        r.value !== null && (E.preventDefault(), E.stopPropagation(), B(!0));
        return;
      }
      if (R === "Enter" || R === " ") {
        const G = i.value;
        if (G === null) return;
        E.preventDefault(), E.stopPropagation(), L(G);
      }
    }
    function W(E) {
      const R = s.items[E];
      !R || !Dt(R) || (r.value !== null && r.value !== E && B(!1), _(E), R.items?.length && A(E, !1));
    }
    return vl(() => {
      b(), s.autofocus && _($(null, 1));
    }), be(() => s.at, b, { deep: !0 }), be(() => s.items, () => void b(), { deep: !0 }), et(() => {
      r.value = null;
    }), t({ root: l }), (E, R) => {
      const G = Hs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Te(C.value),
        onKeydown: D
      }, [
        (f(!0), h(Z, null, ce(y.value, (re, he) => (f(), h("div", {
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
          }, z(re.heading.label), 9, Yc)) : T("", !0),
          (f(!0), h(Z, null, ce(re.entries, ({ item: Y, index: _e }) => (f(), h(Z, {
            key: Y.id ?? `${_e}-${Y.label ?? ""}`
          }, [
            Y.separator ? (f(), h("div", Qc)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (xe) => {
                xe && (o.value[_e] = xe);
              },
              type: "button",
              class: "dc-menu__item",
              role: Y.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Y.checked === void 0 ? void 0 : Y.checked,
              "aria-haspopup": Y.items?.length ? "menu" : void 0,
              "aria-expanded": Y.items?.length ? r.value === _e : void 0,
              "aria-disabled": Y.disabled ? "true" : void 0,
              disabled: Y.disabled,
              "data-dc-item": Y.id,
              tabindex: "-1",
              onClick: (xe) => L(_e),
              onMouseenter: (xe) => W(_e)
            }, [
              w("span", Jc, z(Y.checked ? "✓" : ""), 1),
              w("span", eu, z(Y.label), 1),
              Y.shortcut ? (f(), h("span", tu, z(Y.shortcut), 1)) : Y.items?.length ? (f(), h("span", nu, "›")) : T("", !0)
            ], 40, Zc))
          ], 64))), 128))
        ], 8, Gc))), 128)),
        r.value !== null && u.value ? (f(), le(G, {
          key: r.value,
          items: e.items[r.value]?.items ?? [],
          at: u.value,
          label: e.items[r.value]?.label,
          autofocus: d.value,
          onChoose: R[0] || (R[0] = (re) => a("choose", re)),
          onDismiss: R[1] || (R[1] = (re) => B(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
      ], 44, Xc);
    };
  }
}), Aa = /* @__PURE__ */ pe(su, [["__scopeId", "data-v-9b1413fa"]]), au = ["data-dc-theme", "aria-label"], lu = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], ru = /* @__PURE__ */ fe({
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
    }), a = t, l = H(null), o = H([]), i = H(null), r = H(null), u = H(!1), d = v(
      () => n.menus.flatMap((L, D) => Dt(L) ? [D] : [])
    );
    function m(L, D) {
      const W = o.value[L]?.getBoundingClientRect(), E = n.menus[L];
      !W || !E || !Dt(E) || (r.value = { x: W.left, y: W.bottom + 2, mirrorX: W.right }, i.value = L, u.value = D);
    }
    function y(L) {
      const D = i.value;
      i.value = null, r.value = null, L && D !== null && o.value[D]?.focus();
    }
    function k(L) {
      i.value === L ? y(!0) : m(L, !1);
    }
    function b(L) {
      i.value === null || i.value === L || m(L, !1);
    }
    function C(L, D) {
      const W = d.value;
      if (W.length === 0) return null;
      if (L === null) return D === 1 ? W[0] ?? null : W[W.length - 1] ?? null;
      const E = W.indexOf(L);
      return E === -1 ? W[0] ?? null : W[(E + D + W.length) % W.length] ?? null;
    }
    function _(L) {
      const D = L.key;
      if (D === "Escape") {
        if (i.value === null) return;
        L.preventDefault(), y(!0);
        return;
      }
      if (D === "ArrowDown" && i.value === null) {
        const R = $();
        if (R === null) return;
        L.preventDefault(), m(R, !0);
        return;
      }
      if (D !== "ArrowLeft" && D !== "ArrowRight") return;
      const W = i.value ?? $(), E = C(W, D === "ArrowRight" ? 1 : -1);
      E !== null && (L.preventDefault(), i.value !== null ? m(E, !0) : o.value[E]?.focus());
    }
    function $() {
      const L = o.value.findIndex((D) => D === document.activeElement);
      return L === -1 ? d.value[0] ?? null : L;
    }
    function A(L) {
      const D = L.target;
      !D || l.value?.contains(D) || y(!1);
    }
    be(i, (L) => {
      L !== null ? window.addEventListener("pointerdown", A, !0) : window.removeEventListener("pointerdown", A, !0);
    }), et(() => window.removeEventListener("pointerdown", A, !0));
    function B(L) {
      y(!0), L.action?.(), a("choose", L);
    }
    return (L, D) => (f(), h("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Te(s.value),
      onKeydown: _
    }, [
      (f(!0), h(Z, null, ce(e.menus, (W, E) => (f(), h("button", {
        key: W.id ?? W.label ?? E,
        ref_for: !0,
        ref: (R) => {
          R && (o.value[E] = R);
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
        onClick: (R) => k(E),
        onMouseenter: (R) => b(E)
      }, z(W.label), 41, lu))), 128)),
      i.value !== null && r.value ? (f(), le(Aa, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: r.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: B,
        onDismiss: D[0] || (D[0] = (W) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 44, au));
  }
}), Nd = /* @__PURE__ */ pe(ru, [["__scopeId", "data-v-93dbd2e4"]]), ou = ["aria-label", "aria-expanded", "disabled"], iu = { "aria-hidden": "true" }, cu = /* @__PURE__ */ fe({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = H(null), a = H(null), l = H(null), o = H(!1), i = v(() => l.value !== null);
    function r(b) {
      const C = s.value?.getBoundingClientRect();
      C && (l.value = { x: C.left, y: C.bottom + 4, mirrorX: C.right }, o.value = b);
    }
    function u(b) {
      l.value = null, b && s.value?.focus();
    }
    function d() {
      i.value ? u(!0) : r(!1);
    }
    function m(b) {
      b.key !== "ArrowDown" || i.value || (b.preventDefault(), r(!0));
    }
    function y(b) {
      const C = b.target;
      C && (s.value?.contains(C) || a.value?.root?.contains(C) || u(!1));
    }
    be(i, (b) => {
      b ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), et(() => window.removeEventListener("pointerdown", y, !0));
    function k(b) {
      u(!0), b.action?.(), n("choose", b);
    }
    return (b, C) => (f(), h(Z, null, [
      w("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: m
      }, [
        w("span", iu, z(e.glyph), 1)
      ], 40, ou),
      l.value ? (f(), le(Aa, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: o.value,
        onChoose: k,
        onDismiss: C[0] || (C[0] = (_) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 64));
  }
}), ts = /* @__PURE__ */ pe(cu, [["__scopeId", "data-v-48f5ada5"]]), zt = (e) => e.kind === "split", j = (e) => e.kind === "group", te = (e) => e.kind === "float", ft = { x: 16, y: 16, w: 360, h: 260 }, pn = 28, za = 120, Rn = 220, Ta = 38, _t = 6;
function Yt(e, t) {
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
function Dd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ve = (e) => typeof e == "string", ns = (e) => ve(e) ? Xe(e) : e, Qt = (e) => ve(e) ? [e] : nt(e), Fs = (e) => e.panels.filter(ve), uu = (e) => e.panels.filter((t) => !ve(t)), Ne = (e, t) => e.panels.includes(t);
function Zt(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (ve(l) || !oe(l, t)) return l;
    const o = n(l);
    return o !== l && (s = !0), o;
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
const rs = (e, t, n) => ls("row", e, t, n), Id = (e, t, n) => ls("column", e, t, n);
function we(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ht = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Od = (e) => ({ ...e, headless: !0 }), Bd = (e) => ({ ...e, fixedView: !0 }), du = (e) => e === "left" || e === "right" ? "row" : "column";
function nt(e) {
  return j(e) ? e.panels.flatMap(Qt) : te(e) ? e.frames.flatMap((t) => nt(t.node)) : e.children.flatMap(nt);
}
function oe(e, t) {
  return j(e) ? e.panels.some((n) => ve(n) ? n === t : oe(n, t)) : te(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Ra = (e) => nt(e).length === 0, Ln = (e) => !j(e) && ht(e), Fn = (e) => Ra(e) && !Ln(e);
function gn(e) {
  return zt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : te(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ve(t) ? [] : [{ node: t, index: n }]);
}
const os = (e) => gn(e).map((t) => t.node);
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
function La(e) {
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
function kt(e, t) {
  if (j(e) && Ne(e, t)) return e;
  for (const n of os(e)) {
    const s = kt(n, t);
    if (s) return s;
  }
  return null;
}
function fu(e) {
  const t = os(e).flatMap(fu);
  return j(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (j(e)) {
    for (const n of uu(e)) {
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
function xn(e, t, n = za) {
  const s = (i, r) => r > 0 ? Math.max(Math.min(i, r), Math.min(n, r)) : Math.max(i, n), a = s(e.w, t.w), l = s(e.h, t.h), o = (i, r, u) => Math.min(Math.max(i, 0), Math.max(u - r, 0));
  return {
    x: Math.round(o(e.x, a, t.w)),
    y: Math.round(o(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function Ns(e, t, n, s, a = za) {
  let { x: l, y: o, w: i, h: r } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, l = e.x + n), t.includes("s") && (r = e.h + s), t.includes("n") && (r = e.h - s, o = e.y + s), i < a && (t.includes("w") && (l = e.x + e.w - a), i = a), r < a && (t.includes("n") && (o = e.y + e.h - a), r = a), { x: l, y: o, w: i, h: r };
}
const Fa = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function bt(e, t, n) {
  if (j(e)) return Zt(e, t, (l) => bt(l, t, n));
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
function pu(e, t, n) {
  return bt(e, t, (s) => Fa(s.rect, n) ? s : { ...s, rect: n });
}
const at = (e) => e.maximized === !0, Na = (e) => (t) => {
  if (at(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function vu(e, t, n = !0) {
  return bt(e, t, Na(n));
}
function Kd(e, t) {
  const n = Se(e, t);
  return n ? vu(e, t, !at(n)) : e;
}
const ut = (e) => e.minimized === !0, Da = (e) => (t) => {
  if (ut(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function hu(e, t, n = !0) {
  return bt(e, t, Da(n));
}
function qd(e, t) {
  const n = Se(e, t);
  return n ? hu(e, t, !ut(n)) : e;
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
  return r[s] = i, vt(e, a, { ...l, frames: r });
}
function Ds(e, t, n) {
  return is(
    e,
    t,
    (s) => Fa(s.rect, n) ? s : { ...s, rect: n }
  );
}
function mu(e, t, n = !0) {
  return is(e, t, Na(n));
}
function gu(e, t, n = !0) {
  return is(e, t, Da(n));
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
  return l === a ? e : vt(e, [n], l);
}
function _u(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (te(s) && (n[l] = s.frames.length - 1), s = rt(s, [a]));
  }), n;
}
function on(e, t, n, s) {
  if (j(e)) return Zt(e, n, (o) => on(o, t, n, s));
  if (te(e)) {
    const o = e.frames.findIndex((r) => oe(r.node, n)), i = e.frames[o];
    if (!i) return e;
    if (Se(i.node, n)) {
      const r = on(i.node, t, n, s);
      if (r === i.node) return e;
      const u = [...e.frames];
      return u[o] = { ...i, node: r }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, mn(Xe(t), s)] };
  }
  if (!oe(e, n)) return e;
  let a = !1;
  const l = e.children.map((o) => {
    const i = on(o, t, n, s);
    return i !== o && (a = !0), i;
  });
  return a ? { ...e, children: l } : e;
}
function Is(e, t, n, s) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Se(e, n)) return e;
  const a = pt(e, t);
  if (!a) return e;
  const l = on(a, t, n, s);
  return l === a ? e : $e(l);
}
function yu(e, t, n) {
  return te(e) ? { ...e, frames: [...e.frames, mn(Xe(t), n)] } : j(e) ? Oa(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Xe(t)],
    sizes: [...Je(e), 1],
    ...we(e)
  };
}
function Ia(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return yu(e, t, s);
  const l = n.slice(1), o = (d, m) => m === a ? Ia(d, t, l, s) : pt(d, t);
  if (te(e)) {
    const d = e.frames.flatMap((m, y) => {
      const k = o(m.node, y);
      return k ? [k === m.node ? m : { ...m, node: k }] : [];
    });
    return { ...e, frames: d };
  }
  if (j(e)) {
    const d = mt(e), m = [];
    e.panels.forEach((b, C) => {
      if (ve(b)) {
        b !== t && m.push(b);
        return;
      }
      const _ = o(b, C);
      _ && m.push(_);
    });
    const k = e.active && m.some((b) => Qt(b).includes(e.active)) ? e.active : Ae(m[d] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...k ? { active: k } : {},
      ...we(e)
    };
  }
  const i = Je(e), r = [], u = [];
  return e.children.forEach((d, m) => {
    const y = o(d, m);
    y && (r.push(y), u.push(i[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: r, sizes: u, ...we(e) };
}
function Os(e, t, n, s) {
  const a = rt(e, n);
  return !a || !Ra(a) || !oe(e, t) ? e : $e(Ia(e, t, n, s));
}
function Cn(e, t) {
  if (j(e)) return Zt(e, t, (a) => Cn(a, t));
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
  if (j(e)) return wu(e);
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
    if (!n && zt(u) && u.direction === e.direction && !Be(u) && !ht(u)) {
      const y = Je(u);
      u.children.forEach((k, b) => {
        s.push(k), a.push(d * (y[b] ?? 0));
      });
      return;
    }
    s.push(u), a.push(d);
    const m = n?.[r];
    m && l.push(m);
  });
  const o = s[0];
  return s.length === 1 && o && !ht(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: cs(s.length, a),
    ...we(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function wu(e) {
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
  if (s.length === e.panels.length && s.every((i, r) => i === e.panels[r]))
    return e;
  const o = t && s.some((i) => Qt(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...o ? { active: o } : {},
    ...we(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function pt(e, t) {
  if (te(e)) {
    const o = e.frames.flatMap((i) => {
      const r = pt(i.node, t);
      return r ? [r === i.node ? i : { ...i, node: r }] : [];
    });
    return o.length === 0 && !Ln(e) ? null : { ...e, frames: o };
  }
  if (j(e)) {
    if (!oe(e, t)) return e;
    const o = mt(e), i = [];
    for (const d of e.panels) {
      if (ve(d)) {
        d !== t && i.push(d);
        continue;
      }
      const m = pt(d, t);
      m && i.push(m);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((d) => Qt(d).includes(e.active)) ? e.active : Ae(i[o] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...we(e) } : { kind: "group", panels: i, ...we(e) };
  }
  const n = Je(e), s = [], a = [];
  if (e.children.forEach((o, i) => {
    const r = pt(o, t);
    r && (s.push(r), a.push(n[i] ?? 0));
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
function Oa(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...we(e) };
}
function Ft(e, t, n, s, a) {
  const l = (k) => Yt(
    k,
    (b) => oe(b, n) ? Ft(b, t, n, s, a) : b
  );
  if (s === "float") return e;
  const o = (k) => Zt(k, n, (b) => Ft(b, t, n, s, a));
  if (s === "center")
    return j(e) ? Ne(e, n) ? Oa(e, t, a) : o(e) : te(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (k) => oe(k, n) ? Ft(k, t, n, s, a) : k
      )
    };
  const i = du(s), r = s === "left" || s === "top", u = (k) => ({
    kind: "split",
    direction: i,
    children: r ? [Xe(t), k] : [k, Xe(t)],
    sizes: [0.5, 0.5]
  });
  if (j(e)) return Ne(e, n) ? u(e) : o(e);
  if (te(e)) return l(e);
  const d = Je(e), m = e.children.findIndex(
    (k) => j(k) && Ne(k, n)
  );
  if (m >= 0 && e.direction === i) {
    const k = (d[m] ?? 0) / 2, b = [...e.children], C = [...d];
    return b.splice(r ? m : m + 1, 0, Xe(t)), C.splice(m, 1, k, k), {
      kind: "split",
      direction: i,
      children: b,
      sizes: C,
      ...we(e)
    };
  }
  const y = e.children.map((k) => oe(k, n) ? j(k) && Ne(k, n) ? u(k) : Ft(k, t, n, s) : k);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: d,
    ...we(e)
  };
}
function $t(e, t) {
  if (j(e)) {
    if (Ne(e, t))
      return La(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((r) => !ve(r) && oe(r, t)), l = e.panels[a];
    if (l === void 0 || ve(l)) return e;
    const o = $t(l, t);
    if (o === l && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = o, { ...e, panels: i, active: t };
  }
  if (!oe(e, t)) return e;
  if (te(e)) return Yt(e, (a) => $t(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = $t(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Ot(e, t, n) {
  if (j(e)) {
    if (!Ne(e, t)) return Zt(e, t, (u) => Ot(u, t, n));
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
  return oe(e, t) ? te(e) ? Yt(e, (s) => Ot(s, t, n)) : { ...e, children: e.children.map((s) => Ot(s, t, n)) } : e;
}
function cn(e, t, n) {
  if (t === n) return e;
  if (j(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => ve(l) ? s(l) : cn(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return te(e) ? Yt(e, (s) => cn(s, t, n)) : { ...e, children: e.children.map((s) => cn(s, t, n)) };
}
function nn(e, t, n, s, a) {
  if (s === "float" || !oe(e, t) || !oe(e, n)) return e;
  const l = kt(e, t);
  if (s === "center" && l && Ne(l, n)) {
    if (a === void 0) return e;
    const i = l.panels.indexOf(t), r = a > i ? a - 1 : a;
    return r === i ? e : $t(Ot(e, t, r), t);
  }
  if (t === n) return e;
  const o = pt(e, t);
  return o ? $e(Ft(o, t, n, s, a)) : e;
}
function Ba(e, t, n) {
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
function Jt(e, t, n) {
  const s = gn(e);
  if (!j(e) && s.some(({ node: a }) => j(a) && Ne(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!oe(a, t)) continue;
    const o = Jt(a, t, n);
    return o ? Ba(e, l, o) : null;
  }
  return null;
}
function Vd(e, t, n) {
  const s = Jt(
    e,
    t,
    (a) => zt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? $e(s) : e;
}
function Ka(e) {
  return te(e) ? [e] : Be(e) || ht(e) ? [e] : j(e) ? [...e.panels] : e.children.flatMap(Ka);
}
function qa(e, t) {
  if (j(e)) return e;
  const n = os(e).map(Ka), s = n.flat(), a = t && s.some((o) => Qt(o).includes(t)) ? t : void 0, l = ku(e, n);
  return $e({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function ku(e, t) {
  const n = te(e) ? e.frames.map(({ node: s, ...a }) => a) : Be(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function bu(e, t) {
  const n = Jt(e, t, (s) => qa(s, t));
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
    return l ? Ba(e, a, l) : null;
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
    return Yt(e, (i) => Dn(i, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = Dn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function $u(e, t, n) {
  const s = kt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (Se(e, t)?.node === s) {
    const o = Dn(e, t);
    return o === e ? e : $e(o);
  }
  const l = us(e, t, (o) => ({
    ...ss(Va(o.panels.map(ns), Be(o), n)),
    ...we(o)
  }));
  return l ? $e(l) : e;
}
function Va(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : as(e, n).frames;
}
function Wa(e, t) {
  return { ...ss(Va(e.children, Be(e), t)), ...we(e) };
}
function Wd(e, t, n) {
  const s = Jt(
    e,
    t,
    (a) => te(a) ? a : Wa(a, n)
  );
  return s ? $e(s) : j(e) && Ne(e, t) ? as([e], n) : e;
}
function xu(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function Ua(e, t) {
  const n = xu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...we(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Ud(e, t, n = "row") {
  const s = Jt(
    e,
    t,
    (a) => te(a) ? Ua(a, n) : a
  );
  return s ? $e(s) : e;
}
function Ha(e) {
  if (te(e)) return null;
  const t = j(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ve(t) || j(t) && t.panels.length === 1 && ve(t.panels[0]) ? null : t;
}
const Cu = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Mu(e, t) {
  const n = Ha(e);
  return n ? t === "inner" ? n : { ...Cu(n), ...we(e) } : e;
}
function Et(e) {
  return e.title ? e.title : j(e) ? "" : te(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Bt(e, t) {
  if (j(e)) {
    const s = e.panels[mt(e)];
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
function vt(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (te(e)) {
    const r = e.frames[s];
    if (!r) return e;
    const u = vt(r.node, a, n);
    if (u === r.node) return e;
    const d = [...e.frames];
    return d[s] = { ...r, node: u }, { ...e, frames: d };
  }
  if (j(e)) {
    const r = e.panels[s];
    if (r === void 0 || ve(r)) return e;
    const u = vt(r, a, n);
    if (u === r) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const l = e.children[s];
  if (!l) return e;
  const o = vt(l, a, n);
  if (o === l) return e;
  const i = [...e.children];
  return i[s] = o, { ...e, children: i };
}
function un(e, t, n) {
  if (t.length === 0)
    return zt(e) ? { ...e, sizes: cs(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (te(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const r = un(i.node, a, n);
    if (r === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: r }, { ...e, frames: u };
  }
  if (j(e)) {
    const i = e.panels[s];
    if (i === void 0 || ve(i)) return e;
    const r = un(i, a, n);
    if (r === i) return e;
    const u = [...e.panels];
    return u[s] = r, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const o = [...e.children];
  return o[s] = un(l, a, n), { ...e, children: o };
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
  return t !== void 0 && !ve(t) ? e : { ...rs([Su(e)]), ...we(e) };
}
const Su = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function qs(e) {
  return e.length === 0 ? null : rs(e.map(Xe));
}
function Eu(e, t) {
  if (!e) return qs(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const r of nt(e))
    !n.has(r) || s.has(r) ? a.add(r) : s.add(r);
  let l = e;
  for (const r of a)
    l = l ? pt(l, r) : null;
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
            x: ft.x + (r + d) * pn,
            y: ft.y + (r + d) * pn
          })
        )
      ]
    };
  }
  return vn($e(rs([l, ...i.map(Xe)])));
}
const ds = Symbol("dc.windowContext");
function Pu(e) {
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
const Au = ["data-dc-glyph"], zu = { class: "dc-glyph__line" }, Tu = ["d"], Ru = {
  key: 0,
  class: "dc-glyph__aqua"
}, Lu = ["d"], Fu = /* @__PURE__ */ fe({
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
      w("g", zu, [
        (f(!0), h(Z, null, ce(t[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, Tu))), 128))
      ]),
      n[e.kind] ? (f(), h("g", Ru, [
        (f(!0), h(Z, null, ce(n[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, Lu))), 128))
      ])) : T("", !0)
    ], 8, Au));
  }
}), xt = /* @__PURE__ */ pe(Fu, [["__scopeId", "data-v-4d2872c0"]]), Nu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Du = ["data-dc-movable"], Iu = { class: "dc-float__title dc-truncate" }, Ou = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Bu = ["aria-label", "aria-pressed", "data-dc-minimize"], Ku = ["aria-label", "aria-pressed", "data-dc-maximize"], qu = ["aria-label", "data-dc-close"], Vu = { class: "dc-float__content" }, Wu = ["data-dc-handle", "onPointerdown"], Uu = /* @__PURE__ */ fe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = fs(), s = v(() => Ae(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), l = v(() => at(t.frame)), o = v(() => ut(t.frame)), i = v(() => l.value || o.value), r = v(() => n.resizable.value && !a.value && !i.value), u = v(() => n.movable.value && !a.value && !i.value), d = v(() => {
      const D = nt(t.frame.node);
      return D.length === 1 ? D[0] ?? null : null;
    }), m = v(() => d.value !== null && n.closable(d.value)), y = v(() => t.frame.node.headless === !0), k = v(
      () => !y.value && (!j(t.frame.node) || o.value)
    ), b = v(
      () => t.frame.title || Et(t.frame.node) || Bt(t.frame.node, (D) => n.panelFor(D)?.title)
    ), C = v(() => n.spaceMenu(t.path));
    function _(D) {
      D.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, D, "move");
    }
    function $(D) {
      D.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const A = v(() => {
      const D = n.framing.value;
      return D !== null && oe(t.frame.node, D);
    }), B = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Rn}px`,
        height: `${Ta}px`
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
    return (D, W) => (f(), h("div", {
      class: "dc-float",
      style: Te(B.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": A.value ? "true" : "false",
      onPointerdown: W[3] || (W[3] = (E) => S(n).raiseAt(e.path))
    }, [
      k.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: _,
        onDblclick: $
      }, [
        w("span", Iu, z(b.value), 1),
        C.value.length ? (f(), le(ts, {
          key: 0,
          items: C.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : T("", !0),
        !a.value || o.value && m.value && d.value ? (f(), h("div", Ou, [
          a.value ? T("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: W[0] || (W[0] = (E) => S(n).toggleMinimizeAt(e.path))
          }, [
            ye(xt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Bu)),
          a.value ? T("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: W[1] || (W[1] = (E) => S(n).toggleMaximizeAt(e.path))
          }, [
            ye(xt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Ku)),
          o.value && m.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": d.value,
            onClick: W[2] || (W[2] = (E) => S(n).close(d.value))
          }, [
            ye(xt, { kind: "close" })
          ], 8, qu)) : T("", !0)
        ])) : T("", !0)
      ], 40, Du)) : T("", !0),
      w("div", Vu, [
        ke(D.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(Z, null, ce(r.value ? L : [], (E) => (f(), h("span", {
        key: E,
        class: "dc-float__grip",
        "data-dc-handle": E,
        "aria-hidden": "true",
        onPointerdown: Fe((R) => S(n).beginFrameDragAt(e.path, R, E), ["stop"])
      }, null, 40, Wu))), 128))
    ], 44, Nu));
  }
}), Hu = /* @__PURE__ */ pe(Uu, [["__scopeId", "data-v-f035684c"]]), ps = Symbol("dc.paneContext");
function ju(e) {
  return In(ps, e), e;
}
function Hd() {
  return Ct(ps, null);
}
function jd(e) {
  const t = Ct(ds, null), n = Ct(ps, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Lt(e)
  );
  return hl() && Ws(s), s;
}
const Xu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Gu = ["data-dc-movable"], Yu = ["aria-label", "aria-pressed"], Qu = ["data-dc-space-name"], Zu = { class: "dc-truncate" }, Ju = ["aria-label"], ed = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, td = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], nd = { class: "dc-tab__name dc-truncate" }, sd = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, ad = ["aria-label", "data-dc-close", "onClick"], ld = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, rd = { class: "dc-pane__tools" }, od = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, id = ["aria-label", "data-dc-minimize"], cd = ["aria-label", "aria-pressed", "data-dc-maximize"], ud = ["aria-label", "data-dc-close"], dd = ["id", "role", "aria-labelledby"], fd = ["id", "role", "aria-labelledby"], pd = ["data-dc-edge"], vd = /* @__PURE__ */ fe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = fs(), s = Us() ?? "dc-pane", a = v(
      () => t.group.panels.flatMap((O, U) => {
        if (!ve(O)) {
          const ze = Et(O) || Bt(O, (Ee) => n.panelFor(Ee)?.title);
          return [{ kind: "space", index: U, id: `space-${U}`, title: ze, node: O }];
        }
        const se = n.panelFor(O);
        return se ? [{ kind: "panel", index: U, id: O, title: se.title, panel: se }] : [];
      })
    ), l = v(() => a.value.length > 1), o = v(() => {
      const O = mt(t.group);
      return a.value.find((U) => U.index === O) ?? a.value[0] ?? null;
    }), i = v(() => o.value?.kind === "space" ? o.value.node : null), r = v(() => i.value ? "" : La(t.group)), u = v(() => i.value ? null : n.panelFor(r.value)), d = v(() => o.value?.title ?? ""), m = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = v(() => [...t.path, o.value?.index ?? 0]), k = v(() => r.value || Fs(t.group)[0] || ""), b = v(() => n.viewFor(r.value)), C = v(() => t.group.headless === !0), _ = v(() => n.focused.value === r.value), $ = v(() => n.dragging.value === r.value), A = v(() => n.moving.value === r.value), B = v(() => n.frameOf(k.value) !== null), L = v(() => n.panelFor(k.value)?.fixed === !0), D = v(
      () => !i.value && (n.canMove(r.value) || B.value && n.movable.value && !L.value)
    ), W = v(
      () => i.value ? n.spaceMenu(y.value) : n.menuFor(r.value)
    ), E = (O) => n.closable(O);
    ju({ panel: r });
    const R = v(() => n.maximized(k.value)), G = v(
      () => B.value && !L.value || !l.value && !!u.value && E(u.value.id)
    ), re = (O) => `${s}-tab-${O}`, he = v(() => `${s}-body`), Y = v(() => {
      const O = n.dropTarget.value;
      return !O || !Ne(t.group, O.panel) || O.edge === "float" ? null : O;
    }), _e = v(() => Y.value?.index === void 0 ? Y.value?.edge ?? null : null), xe = v(() => Y.value?.index ?? null), x = () => u.value ? n.renderContent(u.value, b.value, _.value) ?? null : null, F = () => u.value ? n.renderActions(u.value, b.value, _.value) ?? null : null;
    let Q = null;
    function ne(O) {
      const U = Q !== null && Math.hypot(O.clientX - Q.x, O.clientY - Q.y) >= 4;
      return Q = null, U;
    }
    const me = (O) => O.kind === "panel" ? O.id : Ae(O.node);
    function Ce(O, U) {
      U.kind !== "space" && (n.focus(U.id), Q = { x: O.clientX, y: O.clientY }, n.beginDrag(U.id, O));
    }
    function Ke(O, U) {
      if (ne(O)) return;
      const se = me(U);
      se && n.selectPanel(se);
    }
    function qe(O) {
      r.value && n.focus(r.value), !O.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (B.value ? n.beginFrameDrag(k.value, O, "move") : n.beginDrag(r.value, O));
    }
    function Ve(O) {
      Q = { x: O.clientX, y: O.clientY }, n.beginDrag(r.value, O);
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
      if (!A.value) return;
      if (O.key === "Escape") {
        O.preventDefault(), n.toggleMoveMode(r.value);
        return;
      }
      const U = Re[O.key];
      U && (O.preventDefault(), B.value ? n.nudgeFrame(r.value, U, O.shiftKey) : n.nudge(r.value, U, O.shiftKey));
    }
    function N(O) {
      !B.value || O.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(k.value);
    }
    function K(O, U) {
      O.stopPropagation(), Q = null, n.close(U);
    }
    function q(O, U) {
      const se = a.value.length;
      let ze = null;
      if (O.key === "ArrowRight" ? ze = (U + 1) % se : O.key === "ArrowLeft" ? ze = (U - 1 + se) % se : O.key === "Home" ? ze = 0 : O.key === "End" && (ze = se - 1), ze === null) return;
      O.preventDefault();
      const Ee = a.value[ze];
      if (!Ee) return;
      const Tt = me(Ee);
      Tt && n.selectPanel(Tt);
    }
    return (O, U) => o.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": r.value || void 0,
      "data-dc-panels": S(Fs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": B.value ? "true" : "false",
      "data-dc-maximized": R.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": _.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: U[7] || (U[7] = (se) => r.value && S(n).focus(r.value))
    }, [
      C.value ? T("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": D.value ? "true" : "false",
        onPointerdown: qe,
        onDblclick: N
      }, [
        D.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": A.value,
          onPointerdown: Ve,
          onClick: We,
          onKeydown: Ie
        }, [...U[8] || (U[8] = [
          w("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Yu)) : T("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          w("span", Zu, z(m.value), 1)
        ], 8, Qu)) : T("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(Z, null, ce(a.value, (se, ze) => (f(), h(Z, {
            key: se.id
          }, [
            xe.value === ze ? (f(), h("span", ed)) : T("", !0),
            w("button", {
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
              onKeydown: (Ee) => q(Ee, ze)
            }, [
              w("span", nd, z(se.title), 1),
              se.kind === "panel" && se.panel.subtitle ? (f(), h("span", sd, z(se.panel.subtitle), 1)) : T("", !0),
              l.value && se.kind === "panel" && E(se.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${se.title}`,
                "data-dc-close": se.id,
                onPointerdown: U[0] || (U[0] = Fe(() => {
                }, ["stop"])),
                onClick: (Ee) => K(Ee, se.id)
              }, [...U[9] || (U[9] = [
                w("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, ad)) : T("", !0)
            ], 40, td)
          ], 64))), 128)),
          xe.value === a.value.length ? (f(), h("span", ld)) : T("", !0)
        ], 8, Ju),
        w("div", rd, [
          ye(F),
          W.value.length ? (f(), le(ts, {
            key: 0,
            items: W.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ]),
        G.value ? (f(), h("div", od, [
          B.value && !L.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": k.value,
            onPointerdown: U[1] || (U[1] = Fe(() => {
            }, ["stop"])),
            onClick: U[2] || (U[2] = (se) => S(n).toggleMinimize(k.value))
          }, [
            ye(xt, { kind: "minimize" })
          ], 40, id)) : T("", !0),
          B.value && !L.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${R.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": R.value,
            "data-dc-maximize": k.value,
            onPointerdown: U[3] || (U[3] = Fe(() => {
            }, ["stop"])),
            onClick: U[4] || (U[4] = (se) => S(n).toggleMaximize(k.value))
          }, [
            ye(xt, {
              kind: R.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, cd)) : T("", !0),
          !l.value && u.value && E(u.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: U[5] || (U[5] = Fe(() => {
            }, ["stop"])),
            onClick: U[6] || (U[6] = (se) => S(n).close(u.value.id))
          }, [
            ye(xt, { kind: "close" })
          ], 40, ud)) : T("", !0)
        ])) : T("", !0)
      ], 40, Gu)),
      i.value ? (f(), h("div", {
        key: 1,
        id: he.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : re(o.value.id)
      }, [
        ke(O.$slots, "space", {
          node: i.value,
          path: y.value
        }, void 0, !0)
      ], 8, dd)) : (f(), h("div", {
        key: 2,
        id: he.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : re(r.value)
      }, [
        ye(x)
      ], 8, fd)),
      _e.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": _e.value,
        "aria-hidden": "true"
      }, null, 8, pd)) : T("", !0)
    ], 40, Xu)) : T("", !0);
  }
}), ja = /* @__PURE__ */ pe(vd, [["__scopeId", "data-v-44fd2b2d"]]), hd = ["data-dc-space", "data-dc-path", "aria-label"], md = {
  key: 0,
  class: "dc-space__head"
}, gd = { class: "dc-space__title dc-truncate" }, _d = ["data-dc-direction"], yd = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, wd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], kd = /* @__PURE__ */ fe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = fs(), s = H(null), a = v(() => j(t.node) ? t.node : null), l = v(() => zt(t.node) ? t.node : null), o = v(() => te(t.node) ? t.node : null), i = v(
      () => l.value ? l.value.children : o.value?.frames.map((x) => x.node) ?? []
    ), r = v(() => l.value ? Je(l.value) : []), u = v(
      () => (o.value?.frames ?? []).map((x, F) => ({
        held: x,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: F,
        key: E(x.node),
        path: [...t.path, F]
      })).sort((x, F) => x.key < F.key ? -1 : x.key > F.key ? 1 : 0)
    ), d = v(() => Et(t.node)), m = v(() => n.spaceMenu(t.path)), y = v(() => t.node.headless === !0), k = v(() => o.value ? "desktop" : l.value?.direction ?? ""), b = H(null), C = H(0);
    let _ = null;
    be(
      b,
      (x) => {
        _?.disconnect(), _ = null, !(!x || typeof ResizeObserver > "u") && (C.value = x.clientWidth, _ = new ResizeObserver(([F]) => {
          C.value = F?.contentRect.width ?? 0;
        }), _.observe(x));
      },
      { immediate: !0 }
    ), et(() => _?.disconnect());
    const $ = v(() => {
      const x = Math.max(
        1,
        Math.floor((C.value + _t) / (Rn + _t))
      ), F = /* @__PURE__ */ new Map();
      let Q = 0;
      for (const ne of u.value)
        ne.held.minimized === !0 && (F.set(ne.key, {
          x: _t + Q % x * (Rn + _t),
          bottom: _t + Math.floor(Q / x) * (Ta + _t)
        }), Q += 1);
      return F;
    }), A = (x) => !!x && x.join("/") === t.path.join("/"), B = v(() => {
      const x = n.dropTarget.value, F = o.value;
      if (!F || !x?.rect || x.edge !== "float") return null;
      if (x.space) return A(x.space) ? x.rect : null;
      const Q = Se(F, x.panel);
      return Q && F.frames.includes(Q) ? x.rect : null;
    }), L = v(() => {
      const x = n.dropTarget.value;
      return !!x && !x.rect && A(x.space);
    }), D = v(() => l.value?.direction === "row"), W = v(() => i.value.map((x, F) => [...t.path, F])), E = (x) => [...nt(x)].sort().join("/"), R = (x) => {
      const F = nt(x)[0];
      return (F ? n.panelFor(F)?.title : null) ?? F ?? "panel";
    }, G = (x) => {
      const F = i.value[x], Q = i.value[x + 1];
      return !F || !Q ? "Resize panels" : `Resize ${R(F)} and ${R(Q)}`;
    }, re = (x) => {
      const F = r.value[x] ?? 0, Q = r.value[x + 1] ?? 0, ne = F + Q;
      return ne > 0 ? Math.round(F / ne * 100) : 50;
    };
    function he() {
      const x = s.value, F = x ? D.value ? x.clientWidth : x.clientHeight : 0;
      return F <= 0 ? 0.05 : Math.min(n.minPanelSize.value / F, 0.4);
    }
    let Y = null;
    function _e(x, F) {
      const Q = l.value, ne = s.value;
      if (!n.resizable.value || !Q || !ne || x.button !== 0) return;
      const me = D.value ? ne.clientWidth : ne.clientHeight;
      if (me <= 0) return;
      const Ce = D.value ? x.clientX : x.clientY, Ke = Je(Q), qe = Math.min(n.minPanelSize.value / me, 0.4);
      x.preventDefault();
      const Ve = (Ie) => {
        const N = ((D.value ? Ie.clientX : Ie.clientY) - Ce) / me;
        n.setSizes(t.path, Ks(Ke, F, N, qe));
      }, We = () => Y?.(), Re = (Ie) => {
        Ie.key === "Escape" && (n.setSizes(t.path, Ke), Y?.());
      };
      Y = () => {
        window.removeEventListener("pointermove", Ve), window.removeEventListener("pointerup", We), window.removeEventListener("pointercancel", We), window.removeEventListener("keydown", Re), Y = null;
      }, window.addEventListener("pointermove", Ve), window.addEventListener("pointerup", We), window.addEventListener("pointercancel", We), window.addEventListener("keydown", Re);
    }
    et(() => Y?.());
    function xe(x, F) {
      const Q = l.value;
      if (!n.resizable.value || !Q) return;
      const ne = D.value ? "ArrowRight" : "ArrowDown", me = D.value ? "ArrowLeft" : "ArrowUp", Ce = x.shiftKey ? 0.1 : 0.02;
      if (x.key !== ne && x.key !== me) return;
      const Ke = x.key === ne ? Ce : -Ce;
      x.preventDefault(), n.setSizes(t.path, Ks(Je(Q), F, Ke, he()));
    }
    return (x, F) => {
      const Q = Hs("WindowNode", !0);
      return a.value ? (f(), le(ja, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: He(({ node: ne, path: me }) => [
          ye(Q, {
            node: ne,
            path: me,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": k.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !y.value ? (f(), h("header", md, [
          w("span", gd, z(d.value), 1),
          m.value.length ? (f(), le(ts, {
            key: 0,
            items: m.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ])) : T("", !0),
        o.value ? (f(), h("div", {
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
          }, null, 4)) : T("", !0),
          (f(!0), h(Z, null, ce(u.value, (ne) => (f(), le(Hu, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: $.value.get(ne.key) ?? null
          }, {
            default: He(() => [
              ye(Q, {
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
          L.value ? (f(), h("div", yd)) : T("", !0),
          (f(!0), h(Z, null, ce(i.value, (ne, me) => (f(), h(Z, {
            key: E(ne)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: Te({ flexGrow: r.value[me] ?? 1 })
            }, [
              ye(Q, {
                node: ne,
                path: W.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < i.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": D.value ? "vertical" : "horizontal",
              "aria-label": G(me),
              "aria-valuenow": re(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": S(n).resizable.value ? void 0 : "true",
              tabindex: S(n).resizable.value ? 0 : -1,
              onPointerdown: (Ce) => _e(Ce, me),
              onKeydown: (Ce) => xe(Ce, me)
            }, null, 40, wd)) : T("", !0)
          ], 64))), 128))
        ], 8, _d)) : T("", !0)
      ], 8, hd));
    };
  }
}), bd = /* @__PURE__ */ pe(kd, [["__scopeId", "data-v-fb5b403f"]]), $d = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], xd = {
  key: 1,
  class: "dc-window__empty"
}, Cd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, sn = 16, Md = /* @__PURE__ */ fe({
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
    const s = e, a = n, l = Nt(e, "layout"), o = Nt(e, "views"), i = Wt(), r = v(() => new Map(s.panels.map((c) => [c.id, c]))), u = v(() => s.panels.map((c) => c.id)), d = v(() => Eu(l.value, u.value)), m = H(null), y = H(null), k = H(null), b = H(!0), C = H(null), _ = H(null), $ = H(null), A = H(""), B = H(null);
    function L() {
      const c = B.value;
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
      return L().map((c) => ({ pane: c, order: D(c.element) })).sort((c, p) => {
        const g = Math.max(c.order.length, p.order.length);
        for (let M = 0; M < g; M += 1) {
          const P = (c.order[M] ?? -1) - (p.order[M] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const E = (c) => L().find((p) => p.panels.includes(c)) ?? null;
    function R(c) {
      const p = r.value.get(c);
      if (!p) return "";
      const g = o.value[c];
      return g && p.views?.some((M) => M.key === g) ? g : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function G(c, p) {
      o.value = { ...o.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const re = v(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function he(c) {
      return !s.movable || re.value < 1 || s.panels.length < 2 ? !1 : r.value.get(c)?.fixed !== !0;
    }
    function Y(c, p) {
      const g = d.value;
      !c || !g || c === g || (l.value = c, p && a("panel-move", p));
    }
    function _e(c, p, g) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (p - c.left) / c.width, P = (g - c.top) / c.height, I = 0.3;
      return M > I && M < 1 - I && P > I && P < 1 - I ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (ae, V) => V.distance < ae.distance ? V : ae
      ).edge;
    }
    function xe(c, p) {
      const g = [...c.querySelectorAll(".dc-tab")], M = g.findIndex((P) => {
        const I = P.getBoundingClientRect();
        return p < I.left + I.width / 2;
      });
      return M === -1 ? g.length : M;
    }
    function x(c, p, g) {
      for (const { panels: M, element: P } of W().reverse()) {
        const I = P.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const ue = M.find((J) => J !== g), ae = P.querySelector(".dc-pane__tabs"), V = ae?.getBoundingClientRect();
        if (ae && V && p >= V.top && p <= V.bottom)
          return ue ? { panel: ue, edge: "center", index: xe(ae, c) } : null;
        const X = P.querySelector(":scope > .dc-pane__space");
        if (X) {
          const J = X.getBoundingClientRect();
          if (c >= J.left && c <= J.right && p >= J.top && p <= J.bottom) continue;
        }
        return ue ? { panel: ue, edge: _e(I, c, p) } : null;
      }
      return Q(c, p, g) ?? Ce(c, p);
    }
    function F() {
      const c = B.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function Q(c, p, g) {
      const M = d.value;
      if (!M) return null;
      for (const P of F()) {
        const I = P.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const ue = Ke(P), ae = ue.flatMap((ie) => ie.panels).find((ie) => ie !== g);
        if (!ae && ue.length > 0) return null;
        const V = Se(M, g)?.rect, X = xn(
          {
            x: c - I.left - 24,
            y: p - I.top - 12,
            w: V?.w ?? ft.w,
            h: V?.h ?? ft.h
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
        const g = ne(p);
        return g ? [{ element: p, path: g }] : [];
      }) : [];
    }
    function Ce(c, p) {
      for (const { element: g, path: M } of me()) {
        if (g.dataset.dcSpace === "desktop") continue;
        const P = g.getBoundingClientRect();
        if (!(c < P.left || c > P.right || p < P.top || p > P.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Ke(c) {
      return L().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let qe = null;
    const Ve = (c) => c.altKey;
    function We(c, p) {
      if (!he(c) || y.value || _.value || p.button !== 0) return;
      const g = p.clientX, M = p.clientY;
      let P = !1, I = Ve(p);
      const ue = () => {
        const de = $.value;
        de && (k.value = I ? Q(de.x, de.y, c) : x(de.x, de.y, c));
      }, ae = (de) => {
        if (!P) {
          if (Math.hypot(de.clientX - g, de.clientY - M) < 4) return;
          P = !0, y.value = c, C.value = null;
        }
        I = Ve(de), b.value = !I, $.value = { x: de.clientX, y: de.clientY }, ue();
      }, V = (de) => {
        Ve(de) !== I && (I = !I, b.value = !I, P && ue());
      }, X = (de) => {
        qe?.();
        const ee = k.value, Pe = d.value;
        if (de && P && ee && Pe) {
          const st = ee.space ? Os(Pe, c, ee.space, ee.rect) : ee.edge === "float" && ee.rect ? Is(Pe, c, ee.panel, ee.rect) : nn(Pe, c, ee.panel, ee.edge, ee.index);
          Y(st, {
            panel: c,
            target: ee.panel,
            edge: ee.edge,
            ...ee.space === void 0 ? {} : { space: ee.space },
            ...ee.index === void 0 ? {} : { index: ee.index },
            ...ee.rect === void 0 ? {} : { rect: ee.rect }
          });
        }
        y.value = null, k.value = null, $.value = null, b.value = !0;
      }, J = () => X(!0), ie = () => X(!1), ge = (de) => {
        if (de.key === "Escape") {
          X(!1);
          return;
        }
        V(de);
      };
      qe = () => {
        window.removeEventListener("pointermove", ae), window.removeEventListener("pointerup", J), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", ge), window.removeEventListener("keyup", V), qe = null;
      }, window.addEventListener("pointermove", ae), window.addEventListener("pointerup", J), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", ge), window.addEventListener("keyup", V);
    }
    et(() => qe?.());
    let Re = null;
    function Ie(c) {
      const p = B.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((P) => P.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function N(c) {
      const p = d.value;
      return p ? Nn(p, c) : null;
    }
    function K(c) {
      const p = d.value;
      if (!p) return;
      const g = It(p, c);
      g !== p && (l.value = g);
    }
    function q(c) {
      const p = N(c);
      p && K(p);
    }
    function O(c) {
      const p = d.value, g = p ? Se(p, c) : null;
      return g !== null && at(g);
    }
    function U(c) {
      const p = d.value, g = p ? Se(p, c) : null;
      return g !== null && ut(g);
    }
    function se(c) {
      const p = d.value, g = p ? ct(p, c) : null;
      return g ? Ae(g.node) : "";
    }
    function ze(c) {
      const p = d.value, g = p ? ct(p, c) : null;
      if (!p || !g) return;
      const M = Ae(g.node);
      if (r.value.get(M)?.fixed === !0) return;
      const P = !ut(g);
      let I = gu(p, c, P);
      I !== p && (P || (I = It(I, c)), l.value = I, a("frame-minimize", { panel: M, minimized: P }));
    }
    function Ee(c) {
      const p = N(c);
      p && ze(p);
    }
    function Tt(c) {
      const p = d.value, g = p ? ct(p, c) : null;
      if (!p || !g) return;
      const M = Ae(g.node);
      if (r.value.get(M)?.fixed === !0) return;
      const P = !at(g);
      let I = mu(p, c, P);
      I !== p && (P && (I = It(I, c)), l.value = I, a("frame-maximize", { panel: M, maximized: P }));
    }
    function vs(c) {
      const p = N(c);
      p && Tt(p);
    }
    function hs(c, p, g) {
      const M = d.value, P = M ? ct(M, c) : null;
      if (!M || !P || p.button !== 0 || y.value || _.value) return;
      const I = Ae(P.node);
      if (r.value.get(I)?.fixed === !0 || at(P) || ut(P) || (g === "move" ? !s.movable : !s.resizable)) return;
      const ue = Ie(c), ae = _u(M, c);
      K(c);
      const V = { w: ue?.clientWidth ?? 0, h: ue?.clientHeight ?? 0 }, X = { ...P.rect }, J = p.clientX, ie = p.clientY, ge = s.minPanelSize;
      _.value = I;
      const de = (Le) => {
        const Ye = d.value;
        if (!Ye) return;
        const Rt = Ds(Ye, ae, xn(Le, V, ge));
        Rt !== Ye && (l.value = Rt);
      }, ee = (Le) => {
        Le.preventDefault();
        const Ye = Le.clientX - J, Rt = Le.clientY - ie;
        de(
          g === "move" ? { ...X, x: X.x + Ye, y: X.y + Rt } : Ns(X, g, Ye, Rt, ge)
        );
      }, Pe = (Le) => {
        if (Re?.(), _.value = null, !Le) {
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
    function Xa(c, p, g) {
      const M = N(c);
      M && hs(M, p, g);
    }
    function Ga(c, p, g = !1) {
      const M = d.value, P = N(c), I = M && P ? ct(M, P) : null;
      if (!M || !P || !I || r.value.get(c)?.fixed === !0 || (g ? !s.resizable : !s.movable)) return;
      if (at(I) || ut(I)) {
        A.value = `${Ue(c)} is ${at(I) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ue = p === "left" ? -sn : p === "right" ? sn : 0, ae = p === "up" ? -sn : p === "down" ? sn : 0, V = Ie(P), X = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, J = g ? Ns(I.rect, "se", ue, ae, s.minPanelSize) : { ...I.rect, x: I.rect.x + ue, y: I.rect.y + ae }, ie = Ds(M, P, xn(J, X, s.minPanelSize));
      if (ie === M) {
        A.value = g ? `${Ue(c)} cannot be resized further.` : `${Ue(c)} cannot move ${p}.`;
        return;
      }
      l.value = ie;
      const ge = ct(ie, P);
      ge && (a("frame-change", { panel: c, rect: ge.rect }), A.value = g ? `${Ue(c)} resized to ${ge.rect.w} by ${ge.rect.h}.` : `${Ue(c)} moved to ${ge.rect.x}, ${ge.rect.y}.`);
    }
    et(() => Re?.());
    function Ya(c, p) {
      const g = E(c), M = g?.element.getBoundingClientRect();
      if (!g || !M) return null;
      const P = p === "left" || p === "right", I = (V) => {
        if (!(P ? V.bottom > M.top + 1 && V.top < M.bottom - 1 : V.right > M.left + 1 && V.left < M.right - 1)) return null;
        const J = p === "left" ? M.left - V.right : p === "right" ? V.left - M.right : p === "up" ? M.top - V.bottom : V.top - M.bottom;
        return J < -1 ? null : J;
      }, ue = [];
      for (const V of L()) {
        if (V === g || V.element === g.element) continue;
        const X = I(V.element.getBoundingClientRect());
        if (X === null) continue;
        const J = V.panels.find((ie) => ie !== c);
        J && ue.push({ to: { panel: J }, distance: X });
      }
      for (const { element: V, path: X } of me()) {
        const J = I(V.getBoundingClientRect());
        J !== null && ue.push({ to: { space: X }, distance: J });
      }
      return ue.reduce(
        (V, X) => V && V.distance <= X.distance ? V : X,
        null
      )?.to ?? null;
    }
    function Qa(c) {
      const p = d.value ? Se(d.value, c) !== null : !1;
      if (!p && !he(c)) return;
      C.value = C.value === c ? null : c;
      const g = Ue(c);
      if (!C.value) {
        A.value = `${g}: move mode off.`;
        return;
      }
      A.value = p ? `${g}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${g}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ue = (c) => r.value.get(c)?.title ?? c, Za = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Ja(c, p, g = !1) {
      if (!he(c)) return;
      const M = d.value;
      if (!M) return;
      const P = Ue(c), I = kt(M, c);
      if (!g && I && (p === "left" || p === "right") && I.panels.length > 1) {
        const ie = I.panels.indexOf(c), ge = p === "left" ? ie - 1 : ie + 1;
        if (ge >= 0 && ge < I.panels.length) {
          Y(Ot(M, c, ge), { panel: c, target: c, edge: "center", index: ge }), A.value = `${P} moved ${p}, now tab ${ge + 1} of ${I.panels.length}.`, _n(c);
          return;
        }
      }
      const ae = Ya(c, p);
      if (!ae || ae.panel !== void 0 && !he(ae.panel)) {
        A.value = `${P} cannot move ${p}.`;
        return;
      }
      const V = Za[p];
      if (ae.space) {
        const ie = ae.space, ge = rt(M, ie), de = Se(M, c)?.rect, ee = { ...ft, ...de ? { w: de.w, h: de.h } : {} };
        Y(Os(M, c, ie, ee), { panel: c, target: "", space: ie, edge: V }), A.value = `${P} moved ${p}, into ${ge ? Et(ge) : "the space"}.`, _n(c);
        return;
      }
      const X = ae.panel, J = I?.panels.length === 1 && kt(M, X)?.panels.length === 1;
      g ? (Y(nn(M, c, X, "center"), {
        panel: c,
        target: X,
        edge: "center"
      }), A.value = `${P} joined ${Ue(X)} as a tab.`) : J ? (Y(cn(M, c, X), { panel: c, target: X, edge: V }), A.value = `${P} moved ${p}, trading places with ${Ue(X)}.`) : (Y(nn(M, c, X, V), { panel: c, target: X, edge: V }), A.value = `${P} moved ${p}, beside ${Ue(X)}.`), _n(c);
    }
    function _n(c) {
      qt(() => {
        E(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function el(c, p) {
      const g = d.value;
      g && (l.value = un(g, c, p));
    }
    function yn(c) {
      const p = d.value;
      if (!p) return;
      const g = $t(p, c);
      g !== p && (l.value = g, a("tab-select", { panel: c }));
    }
    function ms(c) {
      return r.value.get(c)?.closable ?? s.closable;
    }
    function tl(c) {
      ms(c) && a("panel-close", c);
    }
    const wn = H(/* @__PURE__ */ new Map());
    let nl = 0;
    function sl(c, p) {
      const g = nl += 1;
      return wn.value.set(g, { panel: c, items: p }), () => {
        wn.value.delete(g);
      };
    }
    function al(c) {
      const p = [];
      for (const g of wn.value.values())
        g.panel() === c && p.push(...g.items());
      return p;
    }
    function gs(c) {
      const p = c.filter((g) => g.items.length > 0);
      return p.length < 2 ? p.flatMap((g) => g.items) : p.flatMap((g) => [
        { id: g.id, heading: !0, label: g.title },
        ...g.items
      ]);
    }
    const _s = (c) => c.title || "These tabs";
    function ll(c, p) {
      const g = p.id, M = kt(c, g), P = (M?.panels.length ?? 0) > 1, I = M?.fixedView === !0, ue = (J) => ({
        action: () => {
          J !== c && (l.value = J);
        }
      }), ae = [], V = [], X = p.views ?? [];
      if (X.length > 1 && !I) {
        const J = R(g);
        ae.push({
          id: "view",
          label: "View",
          items: X.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === J,
            action: () => G(g, ie.key)
          }))
        });
      }
      return P && !I && V.push(
        { id: "show-row", label: "Row", checked: !1, ...ue(Bs(c, g, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ue(Bs(c, g, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ue(bu(c, g))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ue($u(c, g))
        }
      ), P && M && (V.length && V.push({ separator: !0 }), V.push(...ys(M, g))), { panel: ae, tabs: V, tabsTitle: M ? _s(M) : "" };
    }
    function ys(c, p) {
      const g = mt(c), M = (P) => {
        const I = c.panels[(g + P + c.panels.length) % c.panels.length];
        return (I === void 0 ? "" : Ae(I)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => yn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => yn(M(-1)) }
      ];
    }
    function en(c) {
      return c.title ? c.title : j(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : Et(c);
    }
    function ws(c) {
      if (!c || te(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Be(c)) return null;
      const p = Ha(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function rl(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const g = rt(p, c);
      if (!g || j(g)) return [];
      if (g.fixedView) return [];
      const M = te(g) ? "desktop" : g.direction, P = (ee, Pe, st) => ({
        id: `show-${ee}`,
        label: Pe,
        checked: M === ee,
        action: () => {
          const ot = d.value, it = st();
          !ot || it === g || (l.value = vn($e(vt(ot, c, it))));
        }
      }), I = () => {
        const ee = qa(g, ol(g));
        if (j(ee) && ee.panels.length === 0) return g;
        const Pe = j(ee) && ee.panels.length === 1 ? ee.panels[0] : void 0;
        return Pe !== void 0 && ve(Pe) ? g : ee;
      }, ue = (ee) => () => te(g) ? Ua(g, ee) : g.direction === ee ? g : { ...g, direction: ee }, ae = c.slice(0, -1), V = c.length > 0 ? rt(p, ae) : null, X = V && j(V) && V.panels.length > 1 ? V : null, J = V && ws(V) === g ? V : null, ie = ws(g), ge = g.title || "this space", de = (ee, Pe, st, ot, it) => ({
        id: ee,
        label: it,
        action: () => {
          const Le = d.value;
          Le && (l.value = vn($e(vt(Le, Pe, Mu(st, ot)))));
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
          title: g.title || "This space",
          items: [
            P("row", "Row", ue("row")),
            P("column", "Column", ue("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            P("tabs", "Tabs", () => I()),
            P("desktop", "Desktop", () => te(g) ? g : Wa(g))
          ]
        },
        {
          id: "about-around",
          title: ie ? `Around ${en(ie)}` : "",
          items: ie ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ie.title ? [] : [de("merge-around-keep-this", c, g, "outer", `Keep ${ge}`)],
            ...g.title ? [] : [de("merge-around-keep-that", c, g, "inner", `Keep ${en(ie)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: J ? `Inside ${en(J)}` : "",
          items: J ? [
            ...g.title ? [] : [de("merge-inside-keep-that", ae, J, "outer", `Keep ${en(J)}`)],
            ...J.title ? [] : [de("merge-inside-keep-this", ae, J, "inner", `Keep ${ge}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: X ? _s(X) : "",
          items: X ? ys(X, Ae(g)) : []
        }
      ]);
    }
    function ol(c) {
      const p = m.value;
      return p && oe(c, p) ? p : void 0;
    }
    function il(c) {
      const p = d.value, g = r.value.get(c);
      if (!p || !g) return [];
      const M = s.menu ? ll(p, g) : null, P = al(c);
      P.length && M?.panel.length && P.push({ separator: !0 }), M && P.push(...M.panel);
      const I = gs([
        { id: "about-panel", title: g.title, items: P },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(g, I) : I;
    }
    function cl(c, p) {
      return i[`${c}-${p}`] ?? i[c];
    }
    function ks(c, p, g, M) {
      return cl(c, p.id)?.({ panel: p, view: g, active: M });
    }
    Pu({
      panelFor: (c) => r.value.get(c) ?? null,
      viewFor: R,
      setView: G,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: m,
      dragging: y,
      dropTarget: k,
      moving: C,
      framing: _,
      canMove: he,
      focus(c) {
        m.value !== c && (m.value = c, a("panel-activate", c));
      },
      selectPanel: yn,
      beginDrag: We,
      toggleMoveMode: Qa,
      nudge: Ja,
      setSizes: el,
      frameOf: (c) => d.value ? Se(d.value, c) : null,
      beginFrameDrag: Xa,
      nudgeFrame: Ga,
      raise: q,
      maximized: O,
      toggleMaximize: vs,
      minimized: U,
      toggleMinimize: Ee,
      beginFrameDragAt: hs,
      raiseAt: K,
      toggleMaximizeAt: Tt,
      toggleMinimizeAt: ze,
      menuFor: il,
      spaceMenu: rl,
      registerMenu: sl,
      closable: ms,
      close: tl,
      renderContent: (c, p, g) => ks("panel", c, p, g),
      renderActions: (c, p, g) => ks("actions", c, p, g),
      layout: d
    });
    const ul = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), dl = () => {
      const c = y.value, p = $.value;
      return !c || !p ? null : ml(
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
      move(c, p, g, M) {
        const P = d.value;
        P && Y(nn(P, c, p, g, M), {
          panel: c,
          target: p,
          edge: g,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (l.value = $t(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, g) {
        const M = d.value;
        M && Y(Is(M, c, p, g), {
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
        const M = pu(g, c, p);
        if (M === g) return;
        l.value = M;
        const P = Se(M, c);
        P && a("frame-change", { panel: c, rect: P.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: G,
      /** Brings a floating frame to the front of its stack. */
      raise: q,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: vs,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Ee
    }), (c, p) => (f(), h("div", {
      ref_key: "root",
      ref: B,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Te(ul.value)
    }, [
      d.value ? (f(), le(bd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", xd, " This window has no panels. ")),
      ye(dl),
      w("p", Cd, z(A.value), 1)
    ], 12, $d));
  }
}), Sd = /* @__PURE__ */ pe(Md, [["__scopeId", "data-v-711565af"]]);
function Xd(e = "", t = "/") {
  const n = H(Ze(e)), s = H(t), a = [`${s.value}${n.value}`];
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
function Gd(e) {
  const t = H(Vs(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), s = be(
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
const Ed = {
  DataShell: Fc,
  ShellHeader: _a,
  QueryPanel: wa,
  RecordActions: ka,
  ResultsArea: Pa,
  FacetControl: ya,
  SegmentedControl: jc,
  StatusPill: jt,
  WindowFrame: Sd,
  WindowPane: ja,
  ListView: Tn,
  CardsView: $a,
  GridView: xa,
  TableView: Sa,
  LinksView: Ca,
  PreviewView: Ma,
  TypeCardsView: Ea
}, Yd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Ed))
      e.component(`${n}${s}`, a);
    t.route && e.provide(js, t.route);
  }
};
export {
  pn as CASCADE_STEP,
  Td as COLUMN_BREAKPOINTS,
  zd as COLUMN_ROLES,
  $a as CardsView,
  Ls as ColumnCell,
  ft as DEFAULT_FRAME,
  En as DEFAULT_SORT,
  _l as DEFAULT_VIEW,
  Fc as DataShell,
  Pn as EMPTY_CELL,
  va as ENTITY_ALL,
  fn as ENTITY_TERM,
  Vt as EXPRESSION_TERM,
  Qn as FACET_PREFIX,
  ya as FacetControl,
  xa as GridView,
  Yd as HeaderContentLayoutPlugin,
  Ca as LinksView,
  Tn as ListView,
  _t as MINIMIZED_GAP,
  Ta as MINIMIZED_HEIGHT,
  Rn as MINIMIZED_WIDTH,
  za as MIN_FRAME,
  zs as MOCK_TINTS,
  Nd as MenuBar,
  ts as MenuButton,
  Aa as MenuList,
  Xt as MetricDrill,
  ps as PANE_CONTEXT_KEY,
  Xn as PARAM_DIR,
  Un as PARAM_ENTITY,
  Gn as PARAM_EXPR,
  Yn as PARAM_PAGE,
  jn as PARAM_SORT,
  Hn as PARAM_VIEW,
  Jn as PinStar,
  Ma as PreviewView,
  wa as QueryPanel,
  tn as RECORD_STATUSES,
  na as RESULT_FIELDS,
  js as ROUTE_ADAPTER_KEY,
  ka as RecordActions,
  Pa as ResultsArea,
  pa as SHELL_CONTEXT_KEY,
  Ad as SHELL_THEMES,
  Gt as ScopeMark,
  jc as SegmentedControl,
  At as SelectTick,
  Fd as ShellCard,
  _a as ShellHeader,
  jt as StatusPill,
  Sa as TableView,
  Ea as TypeCardsView,
  Xs as VIEW_KINDS,
  yl as VIEW_LABELS,
  ds as WINDOW_CONTEXT_KEY,
  Sd as WindowFrame,
  ja as WindowPane,
  La as activePanel,
  mt as activeTab,
  ua as addTerm,
  Vn as andExpression,
  du as axisOf,
  as as cascade,
  la as cellFull,
  Ut as cellText,
  rn as cellTextOf,
  De as cellValue,
  bs as changesResults,
  xn as clampRect,
  qa as collapseSpace,
  bu as collapseToTabs,
  Id as column,
  xs as columnAlign,
  Cs as columnClass,
  $s as columnKey,
  An as columnTruncates,
  Cl as columnsFor,
  kl as countPages,
  gl as createHistoryAdapter,
  Xd as createMemoryAdapter,
  Ql as createMockDataSource,
  Gd as createVueRouterAdapter,
  El as defaultCellText,
  qs as defaultLayout,
  qn as defaultQuery,
  er as drillExpression,
  Os as dropIntoSpace,
  St as emptyFacetState,
  Bn as emptyFacetValue,
  Jl as excludingTerm,
  yt as findEntity,
  lt as findSort,
  Bd as fixedView,
  ss as float,
  Is as floatPanel,
  Wa as floatSplit,
  $u as floatTabs,
  ln as fnv1a,
  Qs as focusEntity,
  gt as formatCount,
  $l as formatDate,
  wt as formatExpression,
  bl as formatMetric,
  xl as formatOrdinal,
  Ht as formatTerm,
  mn as frame,
  ct as frameAt,
  Se as frameOf,
  Nn as framePathOf,
  Ae as frontPanel,
  Xl as generateRows,
  Dd as group,
  kt as groupOf,
  fu as groups,
  ta as hasActiveFacets,
  oe as hasPanel,
  Od as headless,
  Ft as insertPanel,
  Dt as isChoosable,
  Rd as isEntityScoped,
  ea as isFacetActive,
  te as isFloat,
  j as isGroup,
  at as isMaximized,
  ut as isMinimized,
  ve as isPanelTab,
  hn as isPristineQuery,
  zt as isSplit,
  Ne as isTabOf,
  Kn as isTypeCardsQuery,
  Gs as isViewKind,
  Es as joinExpression,
  Il as matchesExpression,
  Gl as matchesFacets,
  vu as maximizeFrame,
  mu as maximizeFrameAt,
  Mu as mergeSpace,
  hu as minimizeFrame,
  gu as minimizeFrameAt,
  nn as movePanel,
  Ot as moveTab,
  Ld as negateTerm,
  rt as nodeAt,
  Bt as nodeTitle,
  $e as normalizeLayout,
  Ze as normalizeSearch,
  cs as normalizeSizes,
  Ha as onlySpace,
  As as oppositeTerm,
  nt as panelIds,
  Xe as panelNode,
  Fs as panelTabs,
  tt as parseExpression,
  or as parseQuery,
  Eo as presentParts,
  ba as presentRow,
  Ge as pressOptions,
  ju as providePaneContext,
  tr as provideShellContext,
  Pu as provideWindowContext,
  Cn as raiseFrame,
  It as raiseFrameAt,
  _u as raisedPath,
  sa as reconcileFacets,
  Eu as reconcileLayout,
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
  Sl as rowKey,
  ra as sameTerm,
  Zl as scopeTerm,
  Wn as scopeTermFor,
  fa as scopedEntity,
  Rs as serializeQuery,
  $t as setActivePanel,
  pu as setFrameRect,
  Ds as setFrameRectAt,
  un as setSizesAt,
  Vd as setSplitDirection,
  Je as sizesOf,
  Js as sortsFor,
  we as spaceChrome,
  Et as spaceTitle,
  ls as split,
  Bl as splitExpression,
  Bs as spreadTabs,
  cr as summarizeQuery,
  Zn as summaryTerms,
  cn as swapPanels,
  ns as tabNode,
  Qt as tabPanels,
  Ua as tileFloat,
  Wd as toFloat,
  Ud as toTiled,
  Kd as toggleMaximized,
  qd as toggleMinimized,
  Bi as useColumns,
  fr as useEntityCounts,
  nc as useEntityPreviews,
  Hd as usePaneContext,
  jd as usePaneMenu,
  Pt as usePresentedRows,
  ur as useQueryState,
  hr as useRecordNames,
  dr as useResults,
  Me as useShellContext,
  fs as useWindowContext,
  da as withoutOwnScope,
  Ol as withoutTerm
};
