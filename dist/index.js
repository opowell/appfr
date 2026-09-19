import { ref as W, inject as Mt, provide as Vn, computed as v, toValue as Ft, shallowRef as St, watch as ke, onScopeDispose as Hs, defineComponent as ue, onBeforeUnmount as tt, openBlock as f, createElementBlock as h, createElementVNode as w, toDisplayString as z, Fragment as Q, renderList as ce, createCommentVNode as T, unref as E, normalizeClass as qt, withDirectives as pn, withKeys as je, withModifiers as ze, vModelText as vn, normalizeStyle as Re, renderSlot as we, useSlots as Ut, nextTick as Vt, createBlock as se, createTextVNode as Ve, createVNode as he, withCtx as Xe, resolveDynamicComponent as Wn, createSlots as ln, useModel as Dt, useId as js, mergeModels as hn, Comment as vr, Text as hr, onMounted as mr, resolveComponent as Xs, getCurrentScope as _r, h as gr } from "vue";
const Gs = Symbol("dc.routeAdapter");
function Je(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function yr() {
  const e = typeof window < "u", t = W(e ? Je(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), s = () => {
    t.value = Je(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, l) => {
    const i = Je(r);
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
const Ys = ["list", "cards", "grid", "table", "links", "preview"], Dd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], sn = ["ok", "running", "queued", "review", "failed"], Id = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Od = [480, 620, 760, 900, 1100], wr = "cards", Rn = "updated";
function Qs(e) {
  return typeof e == "string" && Ys.includes(e);
}
const kr = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Zs(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function kt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Js(e, t = {}) {
  const n = kt(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function ea(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function ta(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of ea(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const br = { key: Rn, label: Rn };
function rt(e, t, n = null) {
  const s = ta(e, n);
  return (t ? s.find((r) => r.key === t) : void 0) ?? s.find((r) => r.key === Rn) ?? s[0] ?? br;
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
function Et(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Un(n);
  return t;
}
function na(e) {
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
function sa(e) {
  return Object.values(e).some(na);
}
function wn(e) {
  return e.entity === null && e.expr.trim() === "" && !sa(e.facets);
}
function Bd(e) {
  return e.entity !== null;
}
function Hn(e) {
  return e.entity === null && e.view === "cards";
}
function $r(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function jn(e, t = {}) {
  const s = t.landing === "entity" ? Js(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Qs(t.view) ? t.view : wr,
    sort: rt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Et(s),
    page: 1
  };
}
const aa = ["entity", "sort", "dir", "expr", "facets"];
function Cs(e) {
  return aa.some((t) => t in e);
}
function ra(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Un(s);
  }
  return n;
}
function on(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function xr(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function yt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Cr(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function Mr(e) {
  return String(e + 1).padStart(2, "0");
}
const Ln = "—";
function Ne(e, t) {
  return e.find((n) => n.role === t);
}
function la(e, t) {
  return e.filter((n) => n.role === t);
}
function Sr(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const Er = ["id", "entityKey", "entityLabel"];
function Ie(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Er.includes(n))
      return t[n];
  }
}
function Ms(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Pr(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ar(e, t) {
  if (e == null || e === "") return Ln;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? xr(n) : String(e);
  }
  return t === "date" ? Cr(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Ln : String(e);
}
function Ht(e, t) {
  const n = Ie(e, t);
  return e.format ? e.format(n, t) : Ar(n, e.kind);
}
function Tr(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function oa(e, t) {
  const n = Ht(e, t), s = Tr(Ie(e, t));
  return s && s !== n ? s : n;
}
function cn(e, t) {
  return e ? Ht(e, t) : "";
}
function Ss(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const zr = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Es(e) {
  return [zr[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Fn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Rr = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Lr(e) {
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
function Le(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of Lr(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const l = a.length > 1 && a.startsWith("-"), i = l ? a.slice(1) : a, o = l ? { negated: !0 } : {}, u = Rr.exec(i);
    u && u[3] !== "" ? s.push({
      kind: "field",
      field: u[1].toLowerCase(),
      comparator: u[2],
      value: u[3],
      ...o
    }) : s.push({ kind: "text", value: i, ...o });
  }
  return s.length && n.push(s), n;
}
const En = (e) => e.toLowerCase().replace(/\s+/g, ""), Fr = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Nr(e, t, n) {
  const s = En(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && En(u.label) === s
  );
  if (r) return Ie(r, t);
  const l = n.facets.find((u) => En(u.label) === s);
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = Fr.find(([u]) => u === s)?.[1];
  if (i) {
    const u = Ne(a, i);
    if (u) return Ie(u, t);
  }
  const o = /^metric(\d+)$/.exec(s);
  if (o) {
    const u = la(a, "metric")[Number(o[1]) - 1];
    if (u) return Ie(u, t);
  }
}
function Pn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function Ps(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Dr(e, t, n) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const o = Ne(l, i), u = o ? Ie(o, t) : void 0;
      return typeof u == "string" && Pn(u, e.value);
    });
  }
  const s = Nr(e.field, t, n);
  if (s === void 0) return null;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (i) => e.comparator === "=" ? Ps(String(i), e.value) : Pn(String(i), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const l = e.value.toLowerCase();
      return l === "true" || l === "yes" ? s : l === "false" || l === "no" ? !s : null;
    }
    if (typeof s == "number") {
      const l = Number(e.value);
      return Number.isFinite(l) ? s === l : null;
    }
    return e.comparator === "=" ? Ps(String(s), e.value) : Pn(String(s), e.value);
  }
  const a = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(r) ? null : Or(e.comparator, r, a);
}
function Ir(e, t, n) {
  const s = Dr(e, t, n);
  return s === null ? !0 : e.negated ? !s : s;
}
function Or(e, t, n) {
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
function Br(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => Ir(a, t, n))) : !0;
}
function As(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function jt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + As(e.value) : `${t}${e.field}${e.comparator}${As(e.value)}`;
}
function Kd(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ft(e) {
  return e.filter((t) => t.length).map((t) => t.map(jt).join(" ")).join(" OR ");
}
function Kr(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((r, l) => l !== n) : s).filter((s) => s.length);
}
function qr(e) {
  const t = Le(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(jt).join(" ")
  };
}
function Ts(e, t) {
  return [...e.map(jt), t.trim()].filter(Boolean).join(" ");
}
const zs = (e, t) => e.toLowerCase() === t.toLowerCase();
function kn(e, t) {
  return !!e.negated == !!t.negated && ia(e, t);
}
function mn(e, t) {
  return !!e.negated != !!t.negated && ia(e, t);
}
function ia(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && zs(e.value, t.value) : t.kind === "text" && zs(e.value, t.value);
}
function Vr(e, t) {
  return t.filter((n) => !e.some((s) => kn(s, n)));
}
function bn(e, t) {
  const n = Le(e), s = Le(t);
  return n.length ? s.length ? ft(
    n.flatMap((a) => s.map((r) => [...a, ...Vr(a, r)]))
  ) : ft(n) : ft(s);
}
const Rs = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function ca(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Wr = 7, Ur = 3;
function Hr(e, t, n, s) {
  const a = (t * Wr + on(n)) % s, r = [];
  for (let l = 0; l < Math.min(Ur, s); l++)
    r.push(ca(e, (a + l) % s));
  return r;
}
function jr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Xr(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Xr(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, l) => r - l).map((r) => e[r]);
}
function Gr(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: r } = t, l = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${l}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return sn[n % sn.length];
    case "updated":
      return r;
    case "tint":
      return Rs[n % Rs.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return sn[n % sn.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Yr(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, l = t.scopes ?? [];
  if (!r.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const u = r[o % r.length], d = Math.floor(o / r.length), m = on(`${s}:${e.key}:${u[0]}:${o}`), b = ca(e.key, o), y = new Date(a.getTime() - m % 900 * 36e5).toISOString(), k = {};
    for (const x of e.columns ?? []) {
      const g = x.field ?? x.key;
      if (!g || x.value) continue;
      const $ = Gr(x, {
        hash: on(`${m}:${g}`),
        sample: u,
        revision: d,
        updatedAt: y
      });
      $ !== void 0 && (k[g] = $);
    }
    for (const x of e.facets)
      k[x.key] = jr(x, on(`${m}:${x.key}`));
    for (const [x, g] of l)
      k[x] = g === e.key ? b : Hr(g, o, x, n);
    i.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return i;
}
function Qr(e, t) {
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
function Zr(e, t) {
  const n = e.find((l) => l.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", r = s === "date" || n.role === "updated";
  return (l, i) => {
    const o = Ie(n, l), u = Ie(n, i);
    return a ? Number(u ?? 0) - Number(o ?? 0) : r ? Date.parse(String(u ?? "")) - Date.parse(String(o ?? "")) : String(u ?? "").localeCompare(String(o ?? ""));
  };
}
function Jr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const r = t.get(s.key);
    if (r) return r;
    const l = e.scopes ?? a.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = Yr(s, { ...e, scopes: l });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: l, offset: i }) {
      const o = Le(s.expr), u = r ? [r] : a.entities, d = [], m = [];
      for (const k of u)
        for (const x of n(k, a))
          d.push(x), (r ? Qr(x, s.facets) : !0) && Br(o, x, k) && m.push(x);
      const b = rt(r, s.sort, a), y = m.sort(Zr(ea(r, a), b.key));
      return s.dir === "asc" && y.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: y.slice(i, i + l),
        total: m.length,
        unfiltered: m.length === d.length
      };
    }
  };
}
function ua(e, t) {
  return da(e, t.id);
}
function da(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Xn(e, t) {
  return ua(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function fa(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = Le(t).flat();
  if (!s) return n;
  const a = Le(n);
  return a.some((i) => i.some((o) => kn(o, s))) ? n : a.some((i) => i.some((o) => mn(o, s))) ? ft(
    a.map(
      (i) => i.map((o) => mn(o, s) ? s : o)
    )
  ) : `${n} ${t}`;
}
function el(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function tl(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Le(t).flat();
  if (!n) return null;
  const s = Le(e).flat();
  return s.some((a) => kn(a, n)) ? n.negated ? "out" : "in" : s.some((a) => mn(a, n)) ? n.negated ? "in" : "out" : null;
}
function nl(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Le(t).flat();
  if (!n) return e;
  const s = Le(e), a = s.map(
    (r) => r.filter((l) => !kn(l, n) && !mn(l, n))
  );
  return a.every((r, l) => r.length === s[l]?.length) ? e : ft(a);
}
function Ye(e) {
  return e.metaKey || e.ctrlKey ? { exclude: !0 } : {};
}
function sl(e, t, n, s = {}) {
  const a = Xn(e, n);
  return fa(t.expr, s.exclude ? el(a) : a);
}
function pa(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || !t.trim()) return t;
  const s = Le(t), a = s.map(
    (r) => r.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return a.every((r, l) => r.length === s[l]?.length) ? t : ft(a);
}
function va(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const ha = Symbol("dc.shellContext");
function al(e) {
  return Vn(ha, e), e;
}
function $e() {
  const e = Mt(ha, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Gn = "e", Yn = "v", Qn = "s", Zn = "d", Jn = "q", es = "p", ts = "f_", ma = "*", rl = [
  Gn,
  Yn,
  Qn,
  Zn,
  Jn,
  es
], Nn = "..", _a = ",", ll = [
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
  for (const [n, s] of ll) t = t.replace(n, s);
  return t;
}
function Ze(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ga(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), l = a === -1 ? "" : s.slice(a + 1);
    n.push([Ze(r), l]);
  }
  return n;
}
function ol(e) {
  return rl.includes(e) || e.startsWith(ts);
}
function Ls(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function il(e, t) {
  const n = Ze(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(_a).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(Nn), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + Nn.length)).trim(), l = a === "" ? null : Number(a), i = r === "" ? null : Number(r);
      let o = l !== null && Number.isFinite(l) ? Ls(l, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? Ls(i, e.min, e.max) : null;
      return o !== null && u !== null && o > u && ([o, u] = [u, o]), { kind: "range", min: o, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function cl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(_a) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Nn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function ul(e, t, n = {}) {
  const s = jn(t, n), a = new Map(ga(e)), r = a.get(Gn), l = r === void 0 ? s.entity : Ze(r), i = l === ma ? null : kt(t, l), o = a.get(Yn), u = o && Qs(Ze(o)) ? Ze(o) : s.view, d = a.get(Qn), m = rt(i, d ? Ze(d) : n.sort, t), b = a.get(Zn), y = b ? Ze(b) === "asc" ? "asc" : "desc" : s.dir, k = a.get(Jn), x = a.get(es), g = x === void 0 ? 1 : Number(Ze(x)), $ = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1, R = {};
  for (const B of i?.facets ?? []) {
    const N = a.get(`${ts}${B.key}`);
    R[B.key] = N === void 0 ? Un(B) : il(B, N);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: m.key,
    dir: y,
    expr: k === void 0 ? "" : Ze(k),
    facets: ra(i, R),
    page: $
  };
}
function Fs(e, t, n = {}, s = "") {
  const a = jn(t, n), r = kt(t, e.entity), l = ga(s).filter(([m]) => !ol(m)), i = [], o = (m, b) => i.push([m, An(b)]), u = r?.key ?? null;
  u !== a.entity && o(Gn, u ?? ma), e.view !== a.view && o(Yn, e.view), e.sort !== a.sort && o(Qn, e.sort), e.dir !== a.dir && o(Zn, e.dir), e.expr.trim() !== "" && o(Jn, e.expr);
  for (const m of r?.facets ?? []) {
    const b = e.facets[m.key];
    if (!b) continue;
    const y = cl(b, m);
    y !== null && i.push([`${ts}${m.key}`, An(y)]);
  }
  e.page > 1 && o(es, String(e.page));
  const d = [
    ...l.map(([m, b]) => [An(m), b]),
    ...i
  ];
  return d.length ? `?${d.map(([m, b]) => b === "" ? m : `${m}=${b}`).join("&")}` : "";
}
const _n = "entity", Wt = "expr";
function dl(e, t) {
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
function ns(e, t) {
  const n = [];
  t && n.push({
    id: _n,
    label: `entity:${t.key}`,
    facetKey: _n
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && na(a) && n.push(...dl(s, a));
  }
  return Le(e.expr).forEach((s, a) => {
    s.forEach((r, l) => {
      n.push({
        id: `${Wt}:${a}:${l}`,
        label: jt(r),
        facetKey: Wt,
        group: a,
        index: l,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function fl(e, t, n = null) {
  if (wn(e)) {
    const r = rt(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const s = ns(e, t).filter((r) => r.facetKey !== Wt).map((r) => r.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function pl(e) {
  const { adapter: t } = e, n = v(() => Ft(e.schema)), s = v(() => Ft(e.defaults) ?? {}), a = v(() => ul(t.search.value, n.value, s.value)), r = v(() => kt(n.value, a.value.entity)), l = v(() => r.value ?? Js(n.value, s.value)), i = v(() => ta(r.value, n.value)), o = v(() => rt(r.value, a.value.sort, n.value)), u = (g, $) => {
    const R = Fs(g, n.value, s.value, t.search.value);
    R !== t.search.value && ($ === "push" ? t.push(R) : t.replace(R));
  }, d = () => Ft(e.navigationMode) ?? "push", m = () => Ft(e.facetNavigationMode) ?? "replace", b = (g, $) => {
    const R = g.page ?? (Cs(g) ? 1 : a.value.page);
    u({ ...a.value, ...g, page: R }, $);
  }, y = (g, $) => {
    const R = a.value.facets[g];
    if (!R) return;
    const B = { ...a.value.facets, [g]: $(R) };
    b({ facets: B }, m());
  }, k = (g) => {
    const $ = g === null ? null : kt(n.value, g);
    return ($?.key ?? null) === a.value.entity ? {} : {
      entity: $?.key ?? null,
      sort: rt($, a.value.sort, n.value).key,
      facets: Et($)
    };
  }, x = (g) => {
    const $ = k(g);
    Object.keys($).length && b($, d());
  };
  return {
    query: a,
    entity: r,
    focus: l,
    sort: o,
    sorts: i,
    summary: v(() => fl(a.value, r.value, n.value)),
    terms: v(() => ns(a.value, r.value)),
    isPristine: v(() => wn(a.value)),
    isEverything: v(() => a.value.entity === null),
    hasFacets: v(() => sa(a.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(g) {
      b({ view: g }, d());
    },
    setSort(g) {
      b({ sort: rt(r.value, g, n.value).key }, d());
    },
    toggleDirection() {
      b({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(g) {
      b({ expr: g }, d());
    },
    narrow(g, $, R) {
      b({ expr: g, ...k($), ...R ? { view: R } : {} }, d());
    },
    setPage(g, $) {
      b({ page: Math.max(1, Math.floor(g)) }, $ ?? d());
    },
    setFacet(g, $) {
      y(g, () => $);
    },
    toggleChip(g, $) {
      y(g, (R) => R.kind !== "chips" ? R : { kind: "chips", selected: R.selected.includes($) ? R.selected.filter((N) => N !== $) : [...R.selected, $] });
    },
    setRange(g, $, R) {
      y(g, (B) => B.kind === "range" ? { kind: "range", min: $, max: R } : B);
    },
    toggleFlag(g) {
      y(
        g,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(g) {
      if (g.facetKey === _n) {
        x(null);
        return;
      }
      if (g.facetKey === Wt) {
        const $ = Kr(Le(a.value.expr), g.group ?? 0, g.index ?? 0);
        b({ expr: ft($) }, d());
        return;
      }
      y(g.facetKey, ($) => $.kind === "chips" && g.option ? { kind: "chips", selected: $.selected.filter((R) => R !== g.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      b({ entity: null, expr: "", facets: Et(null) }, d());
    },
    reset() {
      u(jn(n.value, s.value), d());
    },
    hrefFor(g) {
      const $ = { ...a.value, ...g };
      return $.page = g.page ?? (Cs(g) ? 1 : a.value.page), $.facets = ra(kt(n.value, $.entity), $.facets), `${t.path.value}${Fs($, n.value, s.value, t.search.value)}`;
    }
  };
}
function vl(e) {
  const t = St([]), n = W(0), s = W(!1), a = St(null);
  let r = 0, l = null;
  const i = v(() => (e.query.value.page - 1) * e.limit.value), o = v(() => $r(n.value, e.limit.value)), u = () => {
    const g = e.query.value, $ = e.within?.value.trim(), R = pa(e.entity.value, g.expr);
    return $ ? { ...g, expr: bn($, R) } : R === g.expr ? g : { ...g, expr: R };
  }, d = (g) => {
    t.value = g.rows, n.value = g.total, a.value = null;
  }, m = (g) => {
    a.value = g, t.value = [], n.value = 0;
  }, b = (g, $) => {
    let R = !0;
    const B = () => g === r, N = () => {
      R && (R = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return B();
      },
      insert(D, U) {
        if (!B()) return;
        const P = Array.isArray(D) ? D : [D];
        if (!P.length) return;
        N();
        const L = [...t.value];
        L.splice(U ?? L.length, 0, ...P), t.value = $ > 0 ? L.slice(0, $) : L, n.value += P.length;
      },
      set(D) {
        B() && (D.rows && (N(), t.value = $ > 0 ? D.rows.slice(0, $) : D.rows, n.value = D.rows.length), D.total !== void 0 && (n.value = D.total));
      },
      close() {
        B() && (s.value = !1);
      },
      fail(D) {
        B() && (m(D), s.value = !1);
      }
    };
  }, y = () => {
    const g = l;
    l = null, g?.();
  }, k = () => {
    const g = ++r;
    y();
    const $ = {
      query: u(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, R = e.source.value;
    if (R.stream) {
      s.value = !0;
      try {
        l = R.stream($, b(g, $.limit)) ?? null;
      } catch (N) {
        m(N), s.value = !1;
      }
      return;
    }
    let B;
    try {
      B = R.query($);
    } catch (N) {
      m(N);
      return;
    }
    if (!(B instanceof Promise)) {
      d(B), s.value = !1;
      return;
    }
    s.value = !0, B.then((N) => {
      g === r && d(N);
    }).catch((N) => {
      g === r && m(N);
    }).finally(() => {
      g === r && (s.value = !1);
    });
  }, x = v(() => {
    const g = u();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(aa.map((R) => g[R]))}|${g.page}`;
  });
  return ke([e.source, x, e.limit], k, {
    immediate: !0
  }), Hs(() => {
    r++, y();
  }, !0), { rows: t, total: n, offset: i, pageCount: o, pending: s, error: a, refresh: k };
}
function hl(e) {
  const t = St(/* @__PURE__ */ new Map()), n = W(!0);
  let s = 0;
  return { counts: t, pristine: n, refresh: () => {
    const r = ++s, l = e.query.value, i = e.schema.value, o = e.entities.value, u = e.within?.value.trim() ?? "";
    n.value = wn(l) && !u;
    const d = /* @__PURE__ */ new Map();
    for (const m of o) {
      const b = pa(m, l.expr), y = u ? bn(u, b) : b, k = e.source.value.query({
        query: { ...l, entity: m.key, expr: y, facets: Et(m), page: 1 },
        schema: i,
        entity: m,
        limit: 0,
        offset: 0
      });
      k instanceof Promise ? (d.set(m.key, { total: 0, pending: !0 }), k.then((x) => {
        if (r !== s) return;
        const g = new Map(t.value);
        g.set(m.key, { total: x.total, pending: !1 }), t.value = g;
      })) : d.set(m.key, { total: k.total, pending: !1 });
    }
    t.value = d;
  } };
}
const ml = 25, ya = (e, t) => e.toLowerCase() === t.toLowerCase();
function _l(e, t) {
  return e.find((n) => ya(n.id, t));
}
function gl(e) {
  const t = St(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), s = (i) => {
    if (i.facetKey !== Wt || !i.field || !i.value) return null;
    const o = va(e.schema.value, i.field);
    return o ? { entity: o, id: i.value, key: `${o.key}:${i.value}` } : null;
  }, a = (i) => {
    const { entity: o, id: u } = i, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: da(o, u) ?? "",
        facets: Et(o),
        sort: rt(o, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: ml,
      offset: 0
    });
  }, r = (i, o) => {
    const u = cn(Ne(i.columns ?? [], "identity"), o);
    return u === Ln || ya(u, o.id) ? "" : u;
  }, l = () => {
    const i = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = s(d);
      m && !t.value.has(m.key) && !n.has(m.key) && i.set(m.key, m);
    }
    if (!i.size) return;
    const o = [...i.values()].map((d) => ({
      reference: d,
      outcome: a(d)
    })), u = (d) => {
      const m = new Map(t.value);
      d.forEach((b, y) => {
        const { reference: k } = o[y], x = _l(b.rows, k.id);
        m.set(k.key, x ? r(k.entity, x) : "");
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
      l();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const o = s(i);
      return o && t.value.get(o.key) || null;
    }
  };
}
const yl = ["data-dc-expanded"], wl = { class: "dc-header__domain" }, kl = {
  key: 0,
  class: "dc-header__within"
}, bl = ["title"], $l = ["data-dc-more", "title"], xl = {
  key: 0,
  class: "dc-header__pick"
}, Cl = { class: "dc-header__pick-box" }, Ml = ["value"], Sl = { value: "" }, El = ["value"], Pl = { class: "dc-header__pick" }, Al = { class: "dc-header__pick-box" }, Tl = ["value"], zl = ["value"], Rl = { class: "dc-header__pick" }, Ll = { class: "dc-header__pick-box" }, Fl = ["value"], Nl = ["value"], Dl = ["title", "aria-label"], Il = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Ol = ["title", "aria-label", "onClick"], Bl = ["onKeydown"], Kl = ["aria-expanded", "aria-controls"], ql = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Vl = { class: "dc-header__sr" }, Wl = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Ul = ["disabled"], Hl = ["title"], jl = ["value", "onKeydown"], Xl = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Gl = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Yl = ["disabled"], Ql = {
  key: 1,
  class: "dc-header__actions"
}, Zl = /* @__PURE__ */ ue({
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
    const n = e, s = t, a = $e(), r = v(() => a.schema.value), l = v(
      () => a.hasFacets.value || !!a.query.value.expr.trim() || !!a.within.value
    ), i = v(() => r.value.formatCount ?? yt), o = hl({
      source: a.source,
      schema: a.schema,
      query: a.query,
      entities: a.entities,
      within: a.within
    });
    function u(M) {
      if (n.hideCount) return M.count;
      if (M.key === a.query.value.entity && l.value) return i.value(a.total.value);
      if (o.pristine.value) return M.count;
      const O = o.counts.value.get(M.key);
      return O ? `${O.pending ? "~" : ""}${i.value(O.total)}` : M.count;
    }
    function d(M) {
      return `${M.label} · ${u(M)}`;
    }
    const m = v(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${i.value(a.total.value)}`), b = v(() => {
      const M = a.within.value.trim();
      return M ? ns({ ...a.query.value, expr: M, facets: {} }, null) : [];
    }), y = v(
      () => (n.views ?? [...Ys]).map((M) => ({ key: M, label: kr[M] }))
    ), k = v(() => Zs(a.query.value.view, n.views)), x = v(
      () => !(a.within.value && a.query.value.entity === null && k.value === "cards")
    );
    function g(M) {
      a.setView(M.target.value);
    }
    const $ = v(
      () => a.sorts.value.map((M) => ({ key: M.key, label: M.label }))
    ), R = v(
      () => $.value.length > 0 && a.query.value.entity !== null && !a.within.value
    );
    function B(M) {
      a.setSort(M.target.value);
    }
    const N = v(() => a.query.value.dir === "desc"), D = v(() => {
      const M = a.entity.value?.scope?.toLowerCase();
      return a.terms.value.filter((F) => F.facetKey !== _n).map((F, O, Te) => {
        const Rt = Te[O - 1];
        return {
          term: F,
          or: Rt?.group !== void 0 && F.group !== void 0 && F.group !== Rt.group,
          idle: !!M && F.field?.toLowerCase() === M
        };
      });
    }), U = gl({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...b.value, ...a.terms.value])
    });
    function P(M) {
      return va(r.value, M)?.scopeLabel ?? M;
    }
    function L(M) {
      return M.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function Y(M) {
      const F = U.nameOf(M);
      return F ? `${M.negated ? "-" : ""}${P(M.field)}: ${L(F)}` : M.label;
    }
    function re(M) {
      const F = M.target.value;
      a.setEntity(F || null);
    }
    const oe = W(""), Z = W(null);
    function ge() {
      const M = oe.value.trim();
      M && (a.setExpression(bn(a.query.value.expr, M)), oe.value = "");
    }
    function Se() {
      oe.value = "", Z.value?.blur();
    }
    function C(M) {
      if (oe.value) return;
      const F = D.value.at(-1);
      F && (M.preventDefault(), a.removeTerm(F.term));
    }
    function K(M) {
      M.target?.closest("button, select, label, input") || s("toggle");
    }
    const G = W(null), ne = W("");
    function me() {
      const M = G.value;
      if (!M) {
        ne.value = "";
        return;
      }
      const F = M.scrollLeft > 1, O = M.scrollWidth - M.clientWidth - M.scrollLeft > 1;
      ne.value = F && O ? "both" : F ? "start" : O ? "end" : "";
    }
    let xe = null;
    ke(
      G,
      (M) => {
        xe?.disconnect(), xe = null, me(), !(!M || typeof ResizeObserver > "u") && (xe = new ResizeObserver(me), xe.observe(M));
      },
      { flush: "post" }
    ), ke(D, me, { flush: "post" }), tt(() => xe?.disconnect());
    const Ce = v(() => a.query.value.page), Ue = v(
      () => (a.pageCount.value > 1 || !!n.pagesNote) && !Hn(a.query.value)
    ), Oe = v(
      () => `${a.pending.value ? "~" : ""}${yt(a.pageCount.value)}`
    ), Be = v(() => {
      let M = `Page ${yt(Ce.value)} of ${Oe.value}`;
      const F = a.rows.value.length;
      if (F) {
        const O = a.offset.value + 1, Te = `${a.pending.value ? "~" : ""}${yt(a.total.value)}`;
        M += ` — rows ${yt(O)} to ${yt(O + F - 1)} of ${Te}`;
      }
      return n.pagesNote ? `${M}
${n.pagesNote}` : M;
    }), Ee = W(null), Ke = v(() => Ee.value ?? String(Ce.value)), qe = v(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function ot(M) {
      M.target.select();
    }
    function gt(M) {
      const F = M.target, O = F.value.replace(/[^0-9]/g, "");
      F.value !== O && (F.value = O), Ee.value = O;
    }
    function q(M) {
      const F = M.target, O = Number(Ee.value);
      Ee.value = null;
      const Te = Number.isFinite(O) && O >= 1 ? Math.min(Math.trunc(O), Math.max(1, a.pageCount.value)) : Ce.value;
      F.value = String(Te), Te !== Ce.value && a.setPage(Te);
    }
    function H(M) {
      const F = M.target;
      Ee.value = null, F.value = String(Ce.value), F.blur();
    }
    return (M, F) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      w("div", {
        class: "dc-header__trigger",
        onClick: K
      }, [
        w("span", wl, z(r.value.label), 1),
        b.value.length ? (f(), h("span", kl, [
          F[6] || (F[6] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(Q, null, ce(b.value, (O) => (f(), h("span", {
            key: `scope:${O.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: Y(O)
          }, z(Y(O)), 9, bl))), 128))
        ])) : T("", !0),
        w("div", {
          ref_key: "termBar",
          ref: G,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ne.value,
          title: E(a).summary.value,
          onScroll: me
        }, [
          x.value ? (f(), h("label", xl, [
            F[8] || (F[8] = w("span", { class: "dc-header__sr" }, "Type", -1)),
            w("span", Cl, [
              w("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: E(a).query.value.entity ?? "",
                onFocus: F[0] || (F[0] = //@ts-ignore
                (...O) => E(o).refresh && E(o).refresh(...O)),
                onChange: re
              }, [
                w("option", Sl, z(m.value), 1),
                (f(!0), h(Q, null, ce(E(a).entities.value, (O) => (f(), h("option", {
                  key: O.key,
                  value: O.key
                }, z(d(O)), 9, El))), 128))
              ], 40, Ml),
              F[7] || (F[7] = w("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ])) : T("", !0),
          w("label", Pl, [
            F[10] || (F[10] = w("span", { class: "dc-header__sr" }, "View", -1)),
            w("span", Al, [
              w("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: k.value,
                onChange: g
              }, [
                (f(!0), h(Q, null, ce(y.value, (O) => (f(), h("option", {
                  key: O.key,
                  value: O.key
                }, z(O.label), 9, zl))), 128))
              ], 40, Tl),
              F[9] || (F[9] = w("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          R.value ? (f(), h(Q, { key: 1 }, [
            w("label", Rl, [
              F[12] || (F[12] = w("span", { class: "dc-header__sr" }, "Sort", -1)),
              w("span", Ll, [
                w("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: E(a).sort.value.key,
                  onChange: B
                }, [
                  (f(!0), h(Q, null, ce($.value, (O) => (f(), h("option", {
                    key: O.key,
                    value: O.key
                  }, z(O.label), 9, Nl))), 128))
                ], 40, Fl),
                F[11] || (F[11] = w("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            w("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: N.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${N.value ? "descending" : "ascending"}`,
              onClick: F[1] || (F[1] = (O) => E(a).toggleDirection())
            }, z(N.value ? "↓" : "↑"), 9, Dl)
          ], 64)) : T("", !0),
          (f(!0), h(Q, null, ce(D.value, (O) => (f(), h(Q, {
            key: O.term.id
          }, [
            O.or ? (f(), h("span", Il, "or")) : T("", !0),
            w("button", {
              type: "button",
              class: qt(["dc-term dc-mono", { "dc-term--idle": O.idle }]),
              title: O.idle ? `Not applied to ${E(a).entity.value?.label} — remove ${Y(O.term)}` : `Remove ${Y(O.term)}`,
              "aria-label": `Remove ${Y(O.term)}`,
              onClick: (Te) => E(a).removeTerm(O.term)
            }, z(Y(O.term)), 11, Ol)
          ], 64))), 128)),
          pn(w("input", {
            ref_key: "searchBox",
            ref: Z,
            "onUpdate:modelValue": F[2] || (F[2] = (O) => oe.value = O),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              je(ze(ge, ["prevent"]), ["enter"]),
              je(ze(Se, ["prevent"]), ["esc"]),
              je(C, ["backspace"])
            ]
          }, null, 40, Bl), [
            [vn, oe.value]
          ])
        ], 40, $l),
        w("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: F[3] || (F[3] = (O) => s("toggle"))
        }, [
          w("span", ql, z(e.expanded ? "▲" : "▼"), 1),
          w("span", Vl, z(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Kl)
      ]),
      Ue.value ? (f(), h("nav", Wl, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: Ce.value <= 1,
          onClick: F[4] || (F[4] = (O) => E(a).setPage(Ce.value - 1))
        }, [...F[13] || (F[13] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Ul),
        w("span", {
          class: "dc-header__page dc-mono",
          title: Be.value
        }, [
          w("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Re({ width: qe.value }),
            value: Ke.value,
            onFocus: ot,
            onInput: gt,
            onKeydown: [
              je(ze(q, ["prevent"]), ["enter"]),
              je(ze(H, ["prevent"]), ["esc"])
            ],
            onBlur: q
          }, null, 44, jl),
          w("span", Xl, "/ " + z(Oe.value), 1)
        ], 8, Hl),
        w("span", Gl, z(Be.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: Ce.value >= E(a).pageCount.value,
          onClick: F[5] || (F[5] = (O) => E(a).setPage(Ce.value + 1))
        }, [...F[14] || (F[14] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Yl)
      ])) : T("", !0),
      M.$slots.actions ? (f(), h("div", Ql, [
        we(M.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ], 8, yl));
  }
}), pe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, wa = /* @__PURE__ */ pe(Zl, [["__scopeId", "data-v-3b9447f4"]]), Jl = { class: "dc-facet" }, eo = ["id"], to = { class: "dc-facet__body" }, no = ["aria-labelledby"], so = ["aria-pressed", "data-dc-active", "onClick"], ao = ["aria-labelledby"], ro = ["aria-label", "placeholder", "onKeydown"], lo = ["aria-label", "placeholder", "onKeydown"], oo = ["aria-checked"], io = { class: "dc-switch__text" }, co = ["data-dc-active"], uo = /* @__PURE__ */ ue({
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
    function r(m) {
      if (n.value.kind !== "chips") return;
      const b = a.value.has(m) ? n.value.selected.filter((y) => y !== m) : [...n.value.selected, m];
      s("update", { kind: "chips", selected: b });
    }
    const l = W(""), i = W("");
    ke(
      () => n.value,
      (m) => {
        m.kind === "range" && (l.value = m.min === null ? "" : m.min, i.value = m.max === null ? "" : m.max);
      },
      { immediate: !0, deep: !0 }
    );
    function o(m) {
      if (typeof m == "number") return Number.isFinite(m) ? m : null;
      const b = m.trim();
      if (!b) return null;
      const y = Number(b);
      return Number.isFinite(y) ? y : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const m = o(l.value), b = o(i.value);
      m === n.value.min && b === n.value.max || s("update", { kind: "range", min: m, max: b });
    }
    function d() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (m, b) => (f(), h("div", Jl, [
      w("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, z(e.facet.label), 9, eo),
      w("div", to, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), h(Q, null, ce(e.facet.options, (y) => (f(), h("button", {
            key: y,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(y),
            "data-dc-active": a.value.has(y) ? "true" : "false",
            onClick: (k) => r(y)
          }, z(y), 9, so))), 128))
        ], 8, no)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          pn(w("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (y) => l.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: je(ze(u, ["prevent"]), ["enter"])
          }, null, 40, ro), [
            [vn, l.value]
          ]),
          b[2] || (b[2] = w("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          pn(w("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (y) => i.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: je(ze(u, ["prevent"]), ["enter"])
          }, null, 40, lo), [
            [vn, i.value]
          ])
        ], 8, ao)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          w("span", io, z(e.facet.text), 1),
          w("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...b[3] || (b[3] = [
            w("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, co)
        ], 8, oo)) : T("", !0)
      ])
    ]));
  }
}), ka = /* @__PURE__ */ pe(uo, [["__scopeId", "data-v-36d1334b"]]), fo = ["id"], po = { class: "dc-panel__section dc-panel__rows" }, vo = { class: "dc-panel__row" }, ho = ["for"], mo = ["title", "aria-label", "onClick"], _o = ["id", "placeholder", "onKeydown"], go = { class: "dc-panel__actions" }, yo = ["disabled"], wo = {
  key: 0,
  class: "dc-panel__section"
}, ko = /* @__PURE__ */ ue({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Ut(), a = $e(), r = v(() => qr(a.query.value.expr)), l = v(() => r.value.parts.map(jt)), i = W(r.value.text), o = W(null);
    ke(
      () => r.value.text,
      (x) => {
        i.value = x;
      }
    );
    const u = v(() => i.value !== r.value.text);
    function d() {
      u.value && a.setExpression(Ts(r.value.parts, i.value)), n("close");
    }
    function m(x) {
      const { parts: g, text: $ } = r.value;
      a.setExpression(Ts(g.filter((R, B) => B !== x), $));
    }
    function b(x) {
      const { parts: g } = r.value;
      i.value || !g.length || (x.preventDefault(), m(g.length - 1));
    }
    function y() {
      i.value = "", a.clearFilters();
    }
    function k(x, g) {
      a.setFacet(x, g);
    }
    return Vt(() => o.value?.focus()), (x, g) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: g[2] || (g[2] = je(ze(($) => n("close"), ["stop"]), ["esc"]))
    }, [
      w("section", po, [
        w("div", vo, [
          w("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, ho),
          w("div", {
            class: "dc-field",
            onMousedown: g[1] || (g[1] = ze(($) => o.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(Q, null, ce(l.value, ($, R) => (f(), h("button", {
              key: `${R}:${$}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${$}`,
              "aria-label": `Remove ${$}`,
              onClick: (B) => m(R)
            }, z($), 9, mo))), 128)),
            pn(w("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: o,
              "onUpdate:modelValue": g[0] || (g[0] = ($) => i.value = $),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: l.value.length ? "" : E(a).schema.value.placeholder,
              onKeydown: [
                je(ze(d, ["prevent"]), ["enter"]),
                je(b, ["backspace"])
              ]
            }, null, 40, _o), [
              [vn, i.value]
            ])
          ], 32)
        ]),
        E(a).entity.value ? (f(!0), h(Q, { key: 0 }, ce(E(a).entity.value.facets, ($) => (f(), se(ka, {
          key: $.key,
          facet: $,
          value: E(a).query.value.facets[$.key],
          onUpdate: (R) => k($.key, R)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : T("", !0),
        w("div", go, [
          w("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          w("button", {
            type: "button",
            class: "dc-button",
            disabled: E(a).isPristine.value && !u.value,
            onClick: y
          }, " Reset ", 8, yo)
        ])
      ]),
      s["panel-section"] ? (f(), h("section", wo, [
        we(x.$slots, "panel-section", {}, void 0, !0)
      ])) : T("", !0)
    ], 40, fo));
  }
}), ba = /* @__PURE__ */ pe(ko, [["__scopeId", "data-v-2642c02d"]]), bo = {
  key: 0,
  class: "dc-actions"
}, $o = {
  key: 0,
  class: "dc-actions__select"
}, xo = { class: "dc-actions__all" }, Co = ["checked", "indeterminate"], Mo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, So = { class: "dc-actions__ops" }, Eo = ["disabled"], Po = ["disabled"], Ao = /* @__PURE__ */ ue({
  __name: "RecordActions",
  setup(e) {
    const t = $e(), n = v(() => t.entity.value), s = v(() => !Hn(t.query.value)), a = v(() => s.value && t.selectable.value), r = v(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), l = v(() => t.selection.value.ids.length), i = v(() => t.rows.value.filter((b) => t.isSelected(b)).length), o = v(
      () => t.rows.value.length > 0 && i.value === t.rows.value.length
    ), u = v(() => i.value > 0 && !o.value), d = v(() => l.value ? `${l.value} selected` : "Select all");
    function m(b) {
      return l.value ? `${b} ${l.value}` : b;
    }
    return (b, y) => r.value ? (f(), h("div", bo, [
      a.value ? (f(), h("div", $o, [
        w("label", xo, [
          w("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: o.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: y[0] || (y[0] = (k) => E(t).selectPage(!o.value))
          }, null, 40, Co),
          w("span", Mo, z(d.value), 1)
        ]),
        l.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[1] || (y[1] = (k) => E(t).clearSelection())
        }, " Clear ")) : T("", !0)
      ])) : T("", !0),
      w("div", So, [
        n.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: y[2] || (y[2] = (k) => E(t).create(n.value))
        }, [
          y[5] || (y[5] = w("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ve(" " + z(n.value.create), 1)
        ])) : T("", !0),
        n.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !l.value,
          onClick: y[3] || (y[3] = (k) => E(t).duplicate())
        }, z(m(n.value.duplicate)), 9, Eo)) : T("", !0),
        n.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !l.value,
          onClick: y[4] || (y[4] = (k) => E(t).delete())
        }, z(m(n.value.delete)), 9, Po)) : T("", !0)
      ])
    ])) : T("", !0);
  }
}), $a = /* @__PURE__ */ pe(Ao, [["__scopeId", "data-v-ca4aca14"]]);
function To(e, t) {
  if (!e) return null;
  const n = Ie(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function zo(e, t) {
  const n = Ne(t, "state"), s = Ne(t, "tint");
  return {
    identity: cn(Ne(t, "identity"), e),
    reference: cn(Ne(t, "reference"), e),
    metrics: la(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Ht(a, e)
    })),
    state: n ? Ie(n, e) ?? null : null,
    updated: cn(Ne(t, "updated"), e),
    image: To(Ne(t, "image"), e),
    tint: s ? Ie(s, e) ?? null : null
  };
}
function xa(e, t, n, s, a = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: Pr(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: Mr(t),
    parts: zo(e, r),
    pinned: s,
    selected: a
  };
}
function At() {
  const e = $e(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, s) => xa(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Ro = ["data-dc-status"], Lo = /* @__PURE__ */ ue({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, z(e.status), 9, Ro));
  }
}), Xt = /* @__PURE__ */ pe(Lo, [["__scopeId", "data-v-23e59fbf"]]), Fo = ["title"], No = { key: 1 }, Do = /* @__PURE__ */ ue({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = $e(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((o) => o.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), r = v(() => Ht(t.column, t.entry.row));
    function l(i) {
      i.stopPropagation(), s.value && n.drill(t.entry.row, s.value, Ye(i));
    }
    return (i, o) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: l
    }, [
      we(i.$slots, "default", {}, () => [
        Ve(z(r.value), 1)
      ], !0)
    ], 8, Fo)) : (f(), h("span", No, [
      we(i.$slots, "default", {}, () => [
        Ve(z(r.value), 1)
      ], !0)
    ]));
  }
}), Gt = /* @__PURE__ */ pe(Do, [["__scopeId", "data-v-f2501b17"]]), Io = ["data-dc-active", "aria-pressed", "aria-label"], Oo = /* @__PURE__ */ ue({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = $e();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, r) => (f(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, z(e.pinned ? "★" : "☆"), 9, Io));
  }
}), ss = /* @__PURE__ */ pe(Oo, [["__scopeId", "data-v-ef63d763"]]), Bo = ["src"], Ko = /* @__PURE__ */ ue({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = W(!1);
    return ke(
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
      onError: a[0] || (a[0] = (r) => n.value = !0)
    }, null, 40, Bo)) : T("", !0);
  }
}), as = /* @__PURE__ */ pe(Ko, [["__scopeId", "data-v-afaab300"]]), qo = ["data-dc-standing", "title", "aria-label"], Vo = /* @__PURE__ */ ue({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = $e(), s = v(() => ua(t.entry.entity, t.entry.row)), a = v(() => tl(n.query.value.expr, s.value)), r = v(
      () => a.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(nl(n.query.value.expr, s.value));
    }
    return (i, o) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": a.value,
      title: r.value,
      "aria-label": r.value,
      onClick: l
    }, z(a.value === "in" ? "+" : "−"), 9, qo)) : T("", !0);
  }
}), Yt = /* @__PURE__ */ pe(Vo, [["__scopeId", "data-v-29cbf9c3"]]), Wo = ["title", "aria-label"], Uo = /* @__PURE__ */ ue({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = $e(), s = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    );
    function a(r) {
      r.stopPropagation(), n.drill(t.entry.row, null, Ye(r));
    }
    return (r, l) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, Wo)) : T("", !0);
  }
}), Qt = /* @__PURE__ */ pe(Uo, [["__scopeId", "data-v-feb1c62d"]]), Ho = ["checked", "aria-label"], Tt = /* @__PURE__ */ ue({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = $e();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, r) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: s
    }, null, 8, Ho));
  }
}), jo = { class: "dc-cards" }, Xo = { class: "dc-card__top dc-mono" }, Go = { class: "dc-card__lead" }, Yo = {
  key: 1,
  class: "dc-card__entity"
}, Qo = { class: "dc-card__top-right" }, Zo = ["onClick"], Jo = { class: "dc-card__names" }, ei = { class: "dc-card__primary" }, ti = { class: "dc-card__secondary dc-mono" }, ni = { class: "dc-card__metrics dc-mono" }, si = {
  key: 0,
  class: "dc-card__date"
}, ai = /* @__PURE__ */ ue({
  __name: "CardsView",
  setup(e) {
    const t = $e(), n = At(), s = v(() => t.isEverything.value);
    return (a, r) => (f(), h("div", jo, [
      (f(!0), h(Q, null, ce(E(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-card"
      }, [
        w("div", Xo, [
          w("span", Go, [
            E(t).selectable.value ? (f(), se(Tt, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            Ve(" " + z(l.ordinal) + " ", 1),
            s.value ? (f(), h("span", Yo, z(l.entityLabel), 1)) : T("", !0)
          ]),
          w("span", Qo, [
            l.parts.state ? (f(), se(Xt, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : T("", !0),
            he(Yt, { entry: l }, null, 8, ["entry"]),
            he(Qt, { entry: l }, null, 8, ["entry"]),
            E(t).pinnable.value ? (f(), se(ss, {
              key: 1,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        w("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => E(t).activate(l.row, E(Ye)(i))
        }, [
          l.parts.image ? (f(), se(as, {
            key: 0,
            class: "dc-card__image",
            src: l.parts.image
          }, null, 8, ["src"])) : T("", !0),
          w("span", Jo, [
            w("span", ei, z(l.parts.identity), 1),
            w("span", ti, z(l.parts.reference), 1)
          ])
        ], 8, Zo),
        w("div", ni, [
          (f(!0), h(Q, null, ce(l.parts.metrics.slice(0, 2), (i) => (f(), se(Gt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, {
            default: Xe(() => [
              Ve(z(i.label) + " " + z(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (f(), h("span", si, z(l.parts.updated), 1)) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Ca = /* @__PURE__ */ pe(ai, [["__scopeId", "data-v-28581543"]]), ri = { class: "dc-grid" }, li = ["onClick"], oi = { class: "dc-tile__scrim" }, ii = { class: "dc-tile__top dc-mono" }, ci = { class: "dc-tile__chip" }, ui = { class: "dc-tile__caption" }, di = { class: "dc-tile__secondary dc-truncate" }, fi = { class: "dc-tile__primary" }, pi = /* @__PURE__ */ ue({
  __name: "GridView",
  setup(e) {
    const t = $e(), n = At();
    return (s, a) => (f(), h("div", ri, [
      (f(!0), h(Q, null, ce(E(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        w("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          onClick: (l) => E(t).activate(r.row, E(Ye)(l))
        }, [
          r.parts.image ? (f(), se(as, {
            key: 0,
            class: "dc-tile__image",
            src: r.parts.image
          }, null, 8, ["src"])) : T("", !0),
          w("span", oi, [
            w("span", ii, [
              w("span", ci, z(r.ordinal), 1)
            ]),
            w("span", ui, [
              w("span", di, z(r.parts.reference), 1),
              w("span", fi, z(r.parts.identity), 1)
            ])
          ])
        ], 12, li),
        E(t).selectable.value ? (f(), se(Tt, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), Ma = /* @__PURE__ */ pe(pi, [["__scopeId", "data-v-7df25d40"]]), vi = { class: "dc-links" }, hi = ["onClick"], mi = { class: "dc-link__primary dc-truncate" }, _i = { class: "dc-link__secondary dc-mono dc-truncate" }, gi = /* @__PURE__ */ ue({
  __name: "LinksView",
  setup(e) {
    const t = $e(), n = At();
    return (s, a) => (f(), h("div", vi, [
      (f(!0), h(Q, null, ce(E(n), (r) => (f(), h("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        E(t).selectable.value ? (f(), se(Tt, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        w("button", {
          type: "button",
          class: "dc-link",
          onClick: (l) => E(t).activate(r.row, E(Ye)(l))
        }, [
          w("span", mi, z(r.parts.identity), 1),
          w("span", _i, z(r.parts.reference), 1)
        ], 8, hi)
      ]))), 128))
    ]));
  }
}), Sa = /* @__PURE__ */ pe(gi, [["__scopeId", "data-v-08d0266c"]]), yi = {
  class: "dc-list",
  role: "list"
}, wi = ["onClick"], ki = { class: "dc-list__ordinal dc-mono" }, bi = { class: "dc-list__identity" }, $i = { class: "dc-list__primary dc-truncate" }, xi = { class: "dc-list__secondary dc-mono dc-truncate" }, Ci = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Mi = { class: "dc-list__metrics dc-mono" }, Si = { class: "dc-list__trailing" }, Ei = /* @__PURE__ */ ue({
  __name: "ListView",
  setup(e) {
    const t = $e(), n = At(), s = v(() => t.isEverything.value);
    return (a, r) => (f(), h("div", yi, [
      (f(!0), h(Q, null, ce(E(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        E(t).selectable.value ? (f(), se(Tt, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        w("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => E(t).activate(l.row, E(Ye)(i))
        }, [
          w("span", ki, z(l.ordinal), 1),
          w("span", bi, [
            w("span", $i, z(l.parts.identity), 1),
            w("span", xi, z(l.parts.reference), 1)
          ])
        ], 8, wi),
        s.value ? (f(), h("span", Ci, z(l.entityLabel), 1)) : T("", !0),
        w("span", Mi, [
          (f(!0), h(Q, null, ce(l.parts.metrics.slice(0, 2), (i) => (f(), se(Gt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", Si, [
          l.parts.state ? (f(), se(Xt, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : T("", !0),
          he(Yt, { entry: l }, null, 8, ["entry"]),
          he(Qt, { entry: l }, null, 8, ["entry"]),
          E(t).pinnable.value ? (f(), se(ss, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Dn = /* @__PURE__ */ pe(Ei, [["__scopeId", "data-v-11b9f46c"]]), Pi = { class: "dc-preview" }, Ai = { class: "dc-preview__pager dc-mono" }, Ti = ["disabled"], zi = { "aria-live": "polite" }, Ri = ["disabled"], Li = {
  key: 0,
  class: "dc-preview__card"
}, Fi = ["src"], Ni = { class: "dc-preview__body" }, Di = { class: "dc-preview__top" }, Ii = { class: "dc-preview__badges" }, Oi = { class: "dc-preview__entity dc-mono" }, Bi = { class: "dc-preview__marks" }, Ki = { class: "dc-preview__primary" }, qi = { class: "dc-preview__secondary dc-mono" }, Vi = { class: "dc-preview__fields" }, Wi = { class: "dc-preview__key" }, Ui = { class: "dc-preview__value dc-mono" }, Hi = /* @__PURE__ */ ue({
  __name: "PreviewView",
  setup(e) {
    const t = $e(), n = At(), s = W(0);
    ke(n, (o) => {
      s.value > o.length - 1 && (s.value = Math.max(0, o.length - 1));
    });
    const a = v(() => n.value[s.value]), r = v(() => {
      const o = a.value;
      if (!o) return [];
      const u = Ne(o.columns, "reference"), d = Ne(o.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), l = v(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + o)));
    };
    return (o, u) => (f(), h("div", Pi, [
      w("div", Ai, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => i(-1))
        }, " ‹ ", 8, Ti),
        w("span", zi, z(l.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (d) => i(1))
        }, " › ", 8, Ri)
      ]),
      a.value ? (f(), h("div", Li, [
        w("div", {
          class: "dc-preview__media",
          style: Re({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          a.value.parts.image ? (f(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: a.value.parts.image,
            alt: ""
          }, null, 8, Fi)) : (f(), h(Q, { key: 1 }, [
            Ve(" preview ")
          ], 64))
        ], 4),
        w("div", Ni, [
          w("div", Di, [
            w("span", Ii, [
              E(t).selectable.value ? (f(), se(Tt, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              a.value.parts.state ? (f(), se(Xt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              w("span", Oi, z(a.value.entityLabel), 1)
            ]),
            w("span", Bi, [
              he(Yt, { entry: a.value }, null, 8, ["entry"]),
              he(Qt, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (f(), se(ss, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          w("div", null, [
            w("div", Ki, z(a.value.parts.identity), 1),
            w("div", qi, z(a.value.parts.reference), 1)
          ]),
          w("dl", Vi, [
            (f(!0), h(Q, null, ce(r.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", Wi, z(d.key), 1),
              w("dd", Ui, [
                d.column && a.value ? (f(), se(Gt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(Q, { key: 1 }, [
                  Ve(z(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          w("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => E(t).activate(a.value.row, E(Ye)(d)))
          }, " Open record → ")
        ])
      ])) : T("", !0)
    ]));
  }
}), Ea = /* @__PURE__ */ pe(Hi, [["__scopeId", "data-v-6be41155"]]);
function ji() {
  const e = $e();
  return v(() => Sr(e.schema.value, e.entity.value));
}
const Xi = ["title"], Gi = {
  key: 5,
  class: "dc-cell__text"
}, Yi = /* @__PURE__ */ ue({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = $e(), s = v(() => t.column.kind ?? "text"), a = v(() => Ie(t.column, t.entry.row)), r = v(
      () => s.value === "ordinal" ? t.entry.ordinal : Ht(t.column, t.entry.row)
    ), l = v(() => a.value), i = v(() => t.column.activate === !0 || !!t.column.click), o = v(() => Fn(t.column)), u = v(() => oa(t.column, t.entry.row));
    function d(m) {
      if (!i.value) return;
      m.stopPropagation();
      const b = Ye(m);
      t.column.click?.(t.entry.row, b), t.column.activate && n.activate(t.entry.row, b);
    }
    return (m, b) => s.value === "component" && e.column.component ? (f(), se(Wn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), se(Xt, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), se(as, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Re({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), se(Gt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: qt(["dc-table__open", { "dc-truncate": o.value }]),
      title: u.value,
      onClick: d
    }, z(r.value), 11, Xi)) : (f(), h("span", Gi, z(r.value), 1));
  }
}), Ns = /* @__PURE__ */ pe(Yi, [["__scopeId", "data-v-70ba8aa2"]]), Qi = {
  key: 0,
  class: "dc-table__none"
}, Zi = { class: "dc-table__detail" }, Ji = ["data-dc-wrap"], ec = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, tc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], nc = ["onClick"], sc = {
  key: 2,
  class: "dc-table__head"
}, ac = ["onClick"], rc = {
  key: 0,
  class: "dc-table__pick"
}, lc = ["data-dc-align", "data-dc-hide", "title"], oc = {
  key: 0,
  class: "dc-table__name"
}, ic = /* @__PURE__ */ ue({
  __name: "TableView",
  setup(e) {
    const t = $e(), n = At(), s = ji(), a = v(
      () => s.value.find((y) => y.scope) ?? Ne(s.value, "identity")
    ), r = v(
      () => s.value.some((y) => y.kind === "image" || y.height !== void 0)
    );
    function l(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const i = v(() => t.entity.value?.label ?? "The result set"), o = v(() => new Set(t.sorts.value.map((y) => y.key))), u = (y) => y.sort !== void 0 && o.value.has(y.sort), d = (y) => {
      if (u(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function m(y) {
      return [
        Es(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        Fn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function b(y, k) {
      if (!(!Fn(y) || y.activate || y.click))
        return oa(y, k.row);
    }
    return (y, k) => E(s).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": r.value ? "" : void 0
    }, [
      w("thead", null, [
        w("tr", null, [
          E(t).selectable.value ? (f(), h("th", ec, [...k[3] || (k[3] = [
            w("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : T("", !0),
          (f(!0), h(Q, null, ce(E(s), (x, g) => (f(), h("th", {
            key: E(Ms)(x, g),
            scope: "col",
            class: qt(E(Es)(x)),
            style: Re({ width: x.width }),
            "data-dc-align": E(Ss)(x),
            "data-dc-hide": x.hideBelow,
            "aria-sort": d(x),
            title: x.hint
          }, [
            u(x) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: ($) => l(x.sort)
            }, z(x.label), 9, nc)) : (f(), h(Q, { key: 1 }, [
              Ve(z(x.label), 1)
            ], 64)),
            x.header ? (f(), h("span", sc, [
              (f(), se(Wn(x.header), {
                column: x,
                entity: E(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : T("", !0)
          ], 14, tc))), 128))
        ])
      ]),
      w("tbody", null, [
        (f(!0), h(Q, null, ce(E(n), (x) => (f(), h("tr", {
          key: x.key,
          class: "dc-table__row",
          onClick: (g) => E(t).activate(x.row, E(Ye)(g))
        }, [
          E(t).selectable.value ? (f(), h("td", rc, [
            he(Tt, {
              row: x.row,
              selected: x.selected,
              name: x.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          (f(!0), h(Q, null, ce(E(s), (g, $) => (f(), h("td", {
            key: E(Ms)(g, $),
            class: qt(m(g)),
            "data-dc-align": E(Ss)(g),
            "data-dc-hide": g.hideBelow,
            title: b(g, x)
          }, [
            g === a.value ? (f(), h("span", oc, [
              he(Ns, {
                column: g,
                entry: x
              }, null, 8, ["column", "entry"]),
              he(Yt, { entry: x }, null, 8, ["entry"]),
              g.scope ? (f(), se(Qt, {
                key: 0,
                entry: x
              }, null, 8, ["entry"])) : T("", !0)
            ])) : (f(), se(Ns, {
              key: 1,
              column: g,
              entry: x
            }, null, 8, ["column", "entry"]))
          ], 10, lc))), 128))
        ], 8, ac))), 128))
      ])
    ], 8, Ji)) : (f(), h("p", Qi, [
      k[2] || (k[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", Zi, [
        Ve(z(i.value) + " has no ", 1),
        k[0] || (k[0] = w("code", null, "columns", -1)),
        k[1] || (k[1] = Ve(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Pa = /* @__PURE__ */ pe(ic, [["__scopeId", "data-v-25677138"]]);
function cc(e) {
  const t = St([]), n = W(!1), s = St(null);
  let a = 0;
  const r = (o, u, d, m, b) => ({
    entity: o,
    rows: u.rows.map(
      (y, k) => xa(y, k, o, e.isPinned(y.id))
    ),
    total: u.total,
    count: d ? o.count : String(u.total),
    pinned: uc(m, u, b)
  }), l = () => {
    const o = ++a, u = e.query.value, d = e.schema.value, m = e.entities.value, b = e.limit.value, y = e.within?.value.trim() ?? "", k = wn(u) && !y, x = y ? bn(y, u.expr) : u.expr, g = m.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: $.key, expr: x, facets: Et($), page: 1 },
        schema: d,
        entity: $,
        limit: b,
        offset: 0
      })
    }));
    if (g.every(({ outcome: $ }) => !($ instanceof Promise))) {
      t.value = g.map(
        ({ entity: $, outcome: R }) => r($, R, k, d, x)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(g.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      o === a && (t.value = $.map(
        (R, B) => r(g[B].entity, R, k, d, x)
      ), s.value = null);
    }).catch(($) => {
      o === a && (s.value = $, t.value = []);
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
  ), { previews: t, pending: n, error: s, refresh: i };
}
function uc(e, t, n) {
  const s = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !s)
    return !1;
  const a = n.trim();
  if (!a)
    return !1;
  const r = Xn(e, s);
  return !!r && fa(a, r) === a;
}
const dc = ["data-dc-pending"], fc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, pc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, vc = {
  key: 2,
  class: "dc-types__state"
}, hc = ["data-dc-empty"], mc = ["onClick"], _c = { class: "dc-type__name" }, gc = { class: "dc-type__count dc-mono" }, yc = { class: "dc-type__sr" }, wc = {
  key: 0,
  class: "dc-type__empty"
}, kc = ["onClick"], bc = { class: "dc-type__identity" }, $c = { class: "dc-type__primary dc-truncate" }, xc = { class: "dc-type__secondary dc-mono dc-truncate" }, Cc = { class: "dc-type__trailing dc-mono" }, Mc = { class: "dc-type__metric-value" }, Sc = { class: "dc-type__metric-label" }, Ec = {
  key: 0,
  class: "dc-type__date"
}, Pc = ["onClick"], Ac = /* @__PURE__ */ ue({
  __name: "TypeCardsView",
  setup(e) {
    const t = $e(), { previews: n, pending: s, error: a } = cc({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (i) => t.isPinnedId(i)
    }), r = v(() => !t.isPristine.value || !!t.within.value), l = v(
      () => n.value.filter(
        (i) => !i.pinned && (i.rows.length > 0 || i.entity.create)
      )
    );
    return (i, o) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      we(i.$slots, "before", {}, void 0, !0),
      E(a) ? (f(), h("p", fc, " Could not load results: " + z(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !l.value.length && E(s) ? (f(), h("p", pc, " Running query… ")) : l.value.length ? T("", !0) : (f(), h("p", vc, z(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(Q, null, ce(l.value, (u) => (f(), h("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        w("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => E(t).setEntity(u.entity.key)
        }, [
          w("span", _c, z(u.entity.label), 1),
          w("span", gc, z(u.count), 1),
          o[0] || (o[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", yc, "Show only " + z(u.entity.label.toLowerCase()), 1)
        ], 8, mc),
        u.rows.length ? T("", !0) : (f(), h("p", wc, z(r.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(Q, null, ce(u.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (m) => E(t).activate(d.row, E(Ye)(m))
          }, [
            w("span", bc, [
              w("span", $c, z(d.parts.identity), 1),
              w("span", xc, z(d.parts.reference), 1)
            ])
          ], 8, kc),
          w("span", Cc, [
            (f(!0), h(Q, null, ce(d.parts.metrics.slice(0, 1), (m) => (f(), se(Gt, {
              key: m.column.key ?? m.label,
              class: "dc-type__metric",
              entry: d,
              column: m.column
            }, {
              default: Xe(() => [
                w("span", Mc, z(m.text), 1),
                w("span", Sc, z(m.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", Ec, z(d.parts.updated), 1)) : T("", !0),
            he(Yt, { entry: d }, null, 8, ["entry"]),
            he(Qt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => E(t).create(u.entity)
        }, [
          o[1] || (o[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ve(" " + z(u.entity.create), 1)
        ], 8, Pc)) : T("", !0)
      ], 8, hc))), 128)),
      we(i.$slots, "after", {}, void 0, !0)
    ], 8, dc));
  }
}), Aa = /* @__PURE__ */ pe(Ac, [["__scopeId", "data-v-c7b8f990"]]), Tc = ["data-dc-pending"], zc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Rc = { class: "dc-results__detail" }, Lc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Fc = {
  key: 3,
  class: "dc-results__state"
}, Nc = { class: "dc-results__detail" }, Dc = /* @__PURE__ */ ue({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = $e(), s = Ut(), a = {
      list: Dn,
      cards: Ca,
      grid: Ma,
      table: Pa,
      links: Sa,
      preview: Ea
    }, r = v(() => Hn(n.query.value)), l = v(() => Zs(n.query.value.view, t.views)), i = v(() => a[l.value] ?? Dn), o = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = W(null);
    return ke(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (m, b) => (f(), h("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      r.value ? (f(), se(Aa, { key: 0 }, ln({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: Xe(() => [
            we(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: Xe(() => [
            we(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), h("p", zc, [
        b[1] || (b[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", Rc, z(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : !o.value && E(n).pending.value ? (f(), h("p", Lc, [...b[2] || (b[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (f(), se(Wn(i.value), { key: 4 })) : (f(), h("div", Fc, [
        b[3] || (b[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", Nc, z(E(n).summary.value), 1),
        E(n).isPristine.value ? T("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: b[0] || (b[0] = (y) => E(n).clearFilters())
        }, z(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Tc));
  }
}), Ta = /* @__PURE__ */ pe(Dc, [["__scopeId", "data-v-41f54508"]]), Ic = ["data-dc-theme"], Oc = ["data-dc-width", "data-dc-align"], Bc = { class: "dc-shell__panel" }, Kc = /* @__PURE__ */ ue({
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
    const s = e, a = n, r = Dt(e, "open"), l = Dt(e, "pinned"), i = Dt(e, "selected"), o = Ut(), u = Mt(Gs, null), d = s.route || u ? null : yr(), m = s.route ?? u ?? d;
    tt(() => d?.dispose?.());
    const b = v(() => Jr({ seed: s.schema.key })), y = v(() => s.source ?? b.value), k = pl({
      schema: () => s.schema,
      adapter: m,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), x = v(() => s.within?.trim() ?? ""), g = vl({
      source: y,
      query: k.query,
      schema: v(() => s.schema),
      entity: k.entity,
      limit: v(() => s.limit),
      within: x
    });
    ke(k.query, (C) => a("query-change", C)), ke(
      [g.pageCount, g.pending, k.query],
      () => {
        if (g.pending.value) return;
        const C = g.pageCount.value;
        k.query.value.page > C && k.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = js() ?? "dc-query-panel", R = W(null);
    function B() {
      r.value && (r.value = !1, Vt(() => {
        R.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const N = v(() => new Set(l.value));
    function D(C) {
      const K = new Set(N.value);
      K.has(C.id) ? K.delete(C.id) : K.add(C.id), l.value = [...K], a("toggle-pin", C);
    }
    const U = v(() => {
      if (s.selectable === !0) return !0;
      const C = k.entity.value;
      return !!(C?.duplicate || C?.delete);
    }), P = v(() => new Set(i.value));
    function L(C) {
      const K = new Set(P.value);
      K.has(C.id) ? K.delete(C.id) : K.add(C.id), i.value = [...K];
    }
    function Y(C) {
      const K = new Set(P.value);
      for (const G of g.rows.value)
        C ? K.add(G.id) : K.delete(G.id);
      i.value = [...K];
    }
    function re() {
      i.value.length && (i.value = []);
    }
    const oe = v(() => ({
      ids: [...i.value],
      rows: g.rows.value.filter((C) => P.value.has(C.id)),
      entity: k.entity.value
    }));
    ke(() => k.query.value.entity, re);
    function Z(C, K, G = {}) {
      const ne = sl(s.schema, k.query.value, C, G);
      G.exclude ? k.narrow(ne, K?.key ?? k.query.value.entity) : k.narrow(ne, K?.key ?? null, K ? void 0 : "cards"), a("drill", C, K, G);
    }
    const ge = al({
      ...k,
      schema: v(() => s.schema),
      entities: v(() => s.schema.entities),
      rows: g.rows,
      total: g.total,
      limit: v(() => s.limit),
      offset: g.offset,
      pageCount: g.pageCount,
      pending: g.pending,
      error: g.error,
      source: y,
      previewsPerType: v(() => s.previewsPerType),
      within: x,
      pinnable: v(() => s.pinnable === !0),
      isPinned: (C) => N.value.has(C.id),
      isPinnedId: (C) => N.value.has(C),
      togglePin: D,
      selectable: U,
      selection: oe,
      isSelected: (C) => P.value.has(C.id),
      toggleSelect: L,
      selectPage: Y,
      clearSelection: re,
      narrowsOnPress: v(() => s.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C, K = {}) => {
        if (s.rowPress === "narrow" && Xn(s.schema, C)) {
          Z(C, null, K);
          return;
        }
        a("activate", C);
      },
      create: (C) => a("create", C),
      duplicate: () => a("duplicate", oe.value),
      delete: () => a("delete", oe.value),
      drill: Z
    }), Se = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: k.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: B
    }), (C, K) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re(Se.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        he(wa, {
          ref_key: "headerRef",
          ref: R,
          expanded: r.value,
          "panel-id": E($),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: K[0] || (K[0] = (G) => r.value = !r.value)
        }, ln({ _: 2 }, [
          o.actions ? {
            name: "actions",
            fn: Xe(() => [
              we(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        r.value ? (f(), h(Q, { key: 0 }, [
          w("div", {
            class: "dc-shell__scrim",
            onClick: B
          }),
          w("div", Bc, [
            he(ba, {
              "panel-id": E($),
              onClose: B
            }, ln({ _: 2 }, [
              o["panel-section"] ? {
                name: "panel-section",
                fn: Xe(() => [
                  we(C.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : T("", !0)
      ], 8, Oc),
      he($a),
      we(C.$slots, "results", {
        rows: E(ge).rows.value,
        total: E(ge).total.value,
        offset: E(ge).offset.value,
        pageCount: E(ge).pageCount.value,
        query: E(ge).query.value,
        pending: E(ge).pending.value
      }, () => [
        he(Ta, { views: e.views }, ln({ _: 2 }, [
          o["cards-before"] ? {
            name: "cards-before",
            fn: Xe(() => [
              we(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          o["cards-after"] ? {
            name: "cards-after",
            fn: Xe(() => [
              we(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Ic));
  }
}), qc = /* @__PURE__ */ pe(Kc, [["__scopeId", "data-v-7b71d70f"]]), Vc = ["data-dc-muted"], Wc = {
  key: 0,
  class: "dc-shell-card__head"
}, Uc = { class: "dc-shell-card__title" }, Hc = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, jc = {
  key: 0,
  class: "dc-shell-card__aside"
}, Xc = ["data-dc-flush"], Gc = {
  key: 2,
  class: "dc-shell-card__foot"
}, Yc = /* @__PURE__ */ ue({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), s = Ut();
    function a(d) {
      return r(d?.() ?? []);
    }
    function r(d) {
      return d.some((m) => m.type === vr ? !1 : m.type === hr ? String(m.children ?? "").trim().length > 0 : m.type === Q ? r(m.children ?? []) : !0);
    }
    const l = v(() => !!t.title || i.value || a(s.head)), i = v(() => a(s.aside)), o = v(() => a(s.default)), u = v(() => a(s.foot));
    return (d, m) => (f(), h("section", {
      class: "dc-shell-card",
      style: Re(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      l.value ? (f(), h("header", Wc, [
        we(d.$slots, "head", {}, () => [
          w("h2", Uc, z(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Hc, z(e.count), 1)) : T("", !0)
        ], !0),
        i.value ? (f(), h("span", jc, [
          we(d.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ])) : T("", !0),
      o.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        we(d.$slots, "default", {}, void 0, !0)
      ], 8, Xc)) : T("", !0),
      u.value ? (f(), h("footer", Gc, [
        we(d.$slots, "foot", {}, void 0, !0)
      ])) : T("", !0)
    ], 12, Vc));
  }
}), qd = /* @__PURE__ */ pe(Yc, [["__scopeId", "data-v-75f2ef0b"]]), Qc = ["aria-label"], Zc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Jc = /* @__PURE__ */ ue({
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
      const d = n.options[u];
      d && (s("update:modelValue", d.key), a.value[u]?.focus());
    }
    return (l, i) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(Q, null, ce(e.options, (o, u) => (f(), h("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: qt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", o.key),
        onKeydown: (d) => r(d, u)
      }, z(o.label), 43, Zc))), 128))
    ], 8, Qc));
  }
}), eu = /* @__PURE__ */ pe(Jc, [["__scopeId", "data-v-63fb5482"]]), It = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, tu = ["aria-label"], nu = ["role", "aria-label"], su = ["data-dc-item"], au = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, ru = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], lu = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, ou = { class: "dc-menu__label dc-truncate" }, iu = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, cu = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, uu = /* @__PURE__ */ ue({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = W(null), l = W([]), i = W(null), o = W(null), u = W(null), d = W(!1), m = v(
      () => s.items.flatMap((P, L) => It(P) ? [L] : [])
    ), b = v(() => {
      const P = [{ entries: [] }];
      return s.items.forEach((L, Y) => {
        L.heading ? P.push({ heading: L, entries: [] }) : P[P.length - 1]?.entries.push({ item: L, index: Y });
      }), P.filter((L) => L.entries.length > 0);
    }), y = W({ x: s.at.x, y: s.at.y });
    async function k() {
      y.value = { x: s.at.x, y: s.at.y }, await Vt();
      const P = r.value?.getBoundingClientRect();
      if (!P) return;
      const L = 8;
      let Y = s.at.x, re = s.at.y;
      if (Y + P.width > window.innerWidth - L) {
        const oe = s.at.mirrorX === void 0 ? null : s.at.mirrorX - P.width;
        Y = oe !== null && oe >= L ? oe : window.innerWidth - P.width - L;
      }
      re + P.height > window.innerHeight - L && (re = window.innerHeight - P.height - L), y.value = { x: Math.max(L, Y), y: Math.max(L, re) };
    }
    const x = v(() => ({ left: `${y.value.x}px`, top: `${y.value.y}px` }));
    function g(P) {
      i.value = P, P !== null && Vt(() => l.value[P]?.focus());
    }
    function $(P, L) {
      const Y = m.value;
      if (Y.length === 0) return null;
      if (P === null) return L === 1 ? Y[0] ?? null : Y[Y.length - 1] ?? null;
      const re = Y.indexOf(P);
      return re === -1 ? Y[0] ?? null : Y[(re + L + Y.length) % Y.length] ?? null;
    }
    function R(P, L) {
      if (!s.items[P]?.items?.length) return;
      const re = l.value[P]?.getBoundingClientRect(), oe = r.value?.getBoundingClientRect();
      !re || !oe || (u.value = { x: oe.right - 4, y: re.top - 4, mirrorX: oe.left + 4 }, o.value = P, d.value = L);
    }
    function B(P) {
      const L = o.value;
      o.value = null, u.value = null, P && L !== null && g(L);
    }
    function N(P) {
      const L = s.items[P];
      if (!(!L || !It(L))) {
        if (L.items?.length) {
          R(P, !0);
          return;
        }
        a("choose", L);
      }
    }
    function D(P) {
      const L = P.key;
      if (L === "Escape") {
        P.preventDefault(), P.stopPropagation(), o.value !== null ? B(!0) : a("dismiss");
        return;
      }
      if (L === "ArrowDown" || L === "ArrowUp") {
        P.preventDefault(), P.stopPropagation(), B(!1), g($(i.value, L === "ArrowDown" ? 1 : -1));
        return;
      }
      if (L === "Home" || L === "End") {
        P.preventDefault(), P.stopPropagation(), B(!1), g($(null, L === "Home" ? 1 : -1));
        return;
      }
      if (L === "ArrowRight") {
        const Y = i.value;
        Y !== null && s.items[Y]?.items?.length && (P.preventDefault(), P.stopPropagation(), R(Y, !0));
        return;
      }
      if (L === "ArrowLeft") {
        o.value !== null && (P.preventDefault(), P.stopPropagation(), B(!0));
        return;
      }
      if (L === "Enter" || L === " ") {
        const Y = i.value;
        if (Y === null) return;
        P.preventDefault(), P.stopPropagation(), N(Y);
      }
    }
    function U(P) {
      const L = s.items[P];
      !L || !It(L) || (o.value !== null && o.value !== P && B(!1), g(P), L.items?.length && R(P, !1));
    }
    return mr(() => {
      k(), s.autofocus && g($(null, 1));
    }), ke(() => s.at, k, { deep: !0 }), ke(() => s.items, () => void k(), { deep: !0 }), tt(() => {
      o.value = null;
    }), t({ root: r }), (P, L) => {
      const Y = Xs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(x.value),
        onKeydown: D
      }, [
        (f(!0), h(Q, null, ce(b.value, (re, oe) => (f(), h("div", {
          key: `${oe}-${re.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: re.heading ? "group" : "none",
          "aria-label": re.heading?.label
        }, [
          re.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": re.heading.id
          }, z(re.heading.label), 9, su)) : T("", !0),
          (f(!0), h(Q, null, ce(re.entries, ({ item: Z, index: ge }) => (f(), h(Q, {
            key: Z.id ?? `${ge}-${Z.label ?? ""}`
          }, [
            Z.separator ? (f(), h("div", au)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (Se) => {
                Se && (l.value[ge] = Se);
              },
              type: "button",
              class: "dc-menu__item",
              role: Z.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Z.checked === void 0 ? void 0 : Z.checked,
              "aria-haspopup": Z.items?.length ? "menu" : void 0,
              "aria-expanded": Z.items?.length ? o.value === ge : void 0,
              "aria-disabled": Z.disabled ? "true" : void 0,
              disabled: Z.disabled,
              "data-dc-item": Z.id,
              tabindex: "-1",
              onClick: (Se) => N(ge),
              onMouseenter: (Se) => U(ge)
            }, [
              w("span", lu, z(Z.checked ? "✓" : ""), 1),
              w("span", ou, z(Z.label), 1),
              Z.shortcut ? (f(), h("span", iu, z(Z.shortcut), 1)) : Z.items?.length ? (f(), h("span", cu, "›")) : T("", !0)
            ], 40, ru))
          ], 64))), 128))
        ], 8, nu))), 128)),
        o.value !== null && u.value ? (f(), se(Y, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: u.value,
          label: e.items[o.value]?.label,
          autofocus: d.value,
          onChoose: L[0] || (L[0] = (re) => a("choose", re)),
          onDismiss: L[1] || (L[1] = (re) => B(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
      ], 44, tu);
    };
  }
}), za = /* @__PURE__ */ pe(uu, [["__scopeId", "data-v-9b1413fa"]]), du = ["data-dc-theme", "aria-label"], fu = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], pu = /* @__PURE__ */ ue({
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
    }), a = t, r = W(null), l = W([]), i = W(null), o = W(null), u = W(!1), d = v(
      () => n.menus.flatMap((N, D) => It(N) ? [D] : [])
    );
    function m(N, D) {
      const U = l.value[N]?.getBoundingClientRect(), P = n.menus[N];
      !U || !P || !It(P) || (o.value = { x: U.left, y: U.bottom + 2, mirrorX: U.right }, i.value = N, u.value = D);
    }
    function b(N) {
      const D = i.value;
      i.value = null, o.value = null, N && D !== null && l.value[D]?.focus();
    }
    function y(N) {
      i.value === N ? b(!0) : m(N, !1);
    }
    function k(N) {
      i.value === null || i.value === N || m(N, !1);
    }
    function x(N, D) {
      const U = d.value;
      if (U.length === 0) return null;
      if (N === null) return D === 1 ? U[0] ?? null : U[U.length - 1] ?? null;
      const P = U.indexOf(N);
      return P === -1 ? U[0] ?? null : U[(P + D + U.length) % U.length] ?? null;
    }
    function g(N) {
      const D = N.key;
      if (D === "Escape") {
        if (i.value === null) return;
        N.preventDefault(), b(!0);
        return;
      }
      if (D === "ArrowDown" && i.value === null) {
        const L = $();
        if (L === null) return;
        N.preventDefault(), m(L, !0);
        return;
      }
      if (D !== "ArrowLeft" && D !== "ArrowRight") return;
      const U = i.value ?? $(), P = x(U, D === "ArrowRight" ? 1 : -1);
      P !== null && (N.preventDefault(), i.value !== null ? m(P, !0) : l.value[P]?.focus());
    }
    function $() {
      const N = l.value.findIndex((D) => D === document.activeElement);
      return N === -1 ? d.value[0] ?? null : N;
    }
    function R(N) {
      const D = N.target;
      !D || r.value?.contains(D) || b(!1);
    }
    ke(i, (N) => {
      N !== null ? window.addEventListener("pointerdown", R, !0) : window.removeEventListener("pointerdown", R, !0);
    }), tt(() => window.removeEventListener("pointerdown", R, !0));
    function B(N) {
      b(!0), N.action?.(), a("choose", N);
    }
    return (N, D) => (f(), h("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Re(s.value),
      onKeydown: g
    }, [
      (f(!0), h(Q, null, ce(e.menus, (U, P) => (f(), h("button", {
        key: U.id ?? U.label ?? P,
        ref_for: !0,
        ref: (L) => {
          L && (l.value[P] = L);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === P,
        "aria-disabled": U.disabled ? "true" : void 0,
        disabled: U.disabled,
        "data-dc-menu": U.id ?? U.label,
        tabindex: P === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (L) => y(P),
        onMouseenter: (L) => k(P)
      }, z(U.label), 41, fu))), 128)),
      i.value !== null && o.value ? (f(), se(za, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: B,
        onDismiss: D[0] || (D[0] = (U) => b(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 44, du));
  }
}), Vd = /* @__PURE__ */ pe(pu, [["__scopeId", "data-v-93dbd2e4"]]), vu = ["aria-label", "aria-expanded", "disabled"], hu = { "aria-hidden": "true" }, mu = /* @__PURE__ */ ue({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = W(null), a = W(null), r = W(null), l = W(!1), i = v(() => r.value !== null);
    function o(k) {
      const x = s.value?.getBoundingClientRect();
      x && (r.value = { x: x.left, y: x.bottom + 4, mirrorX: x.right }, l.value = k);
    }
    function u(k) {
      r.value = null, k && s.value?.focus();
    }
    function d() {
      i.value ? u(!0) : o(!1);
    }
    function m(k) {
      k.key !== "ArrowDown" || i.value || (k.preventDefault(), o(!0));
    }
    function b(k) {
      const x = k.target;
      x && (s.value?.contains(x) || a.value?.root?.contains(x) || u(!1));
    }
    ke(i, (k) => {
      k ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), tt(() => window.removeEventListener("pointerdown", b, !0));
    function y(k) {
      u(!0), k.action?.(), n("choose", k);
    }
    return (k, x) => (f(), h(Q, null, [
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
        w("span", hu, z(e.glyph), 1)
      ], 40, vu),
      r.value ? (f(), se(za, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: l.value,
        onChoose: y,
        onDismiss: x[0] || (x[0] = (g) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 64));
  }
}), rs = /* @__PURE__ */ pe(mu, [["__scopeId", "data-v-48f5ada5"]]), zt = (e) => e.kind === "split", j = (e) => e.kind === "group", te = (e) => e.kind === "float", pt = { x: 16, y: 16, w: 360, h: 260 }, gn = 28, Ra = 120, In = 220, La = 38, wt = 6;
function Zt(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const l = t(a.node, r);
    return l === a.node ? a : (n = !0, { ...a, node: l });
  });
  return n ? { ...e, frames: s } : e;
}
function Ge(e) {
  return { kind: "group", panels: [e] };
}
function Wd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const ve = (e) => typeof e == "string", ls = (e) => ve(e) ? Ge(e) : e, Jt = (e) => ve(e) ? [e] : nt(e), Ds = (e) => e.panels.filter(ve), _u = (e) => e.panels.filter((t) => !ve(t)), De = (e, t) => e.panels.includes(t);
function en(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (ve(r) || !le(r, t)) return r;
    const l = n(r);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, panels: a } : e;
}
function $n(e, t) {
  return { node: e, rect: { ...pt, ...t } };
}
function os(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function is(e, t) {
  const n = { ...pt, ...t };
  return os(
    e.map(
      (s, a) => $n(s, {
        ...n,
        x: n.x + a * gn,
        y: n.y + a * gn
      })
    )
  );
}
function cs(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const us = (e, t, n) => cs("row", e, t, n), Ud = (e, t, n) => cs("column", e, t, n);
function ye(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const mt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Hd = (e) => ({ ...e, headless: !0 }), jd = (e) => ({ ...e, fixedView: !0 }), gu = (e) => e === "left" || e === "right" ? "row" : "column";
function nt(e) {
  return j(e) ? e.panels.flatMap(Jt) : te(e) ? e.frames.flatMap((t) => nt(t.node)) : e.children.flatMap(nt);
}
function le(e, t) {
  return j(e) ? e.panels.some((n) => ve(n) ? n === t : le(n, t)) : te(e) ? e.frames.some((n) => le(n.node, t)) : e.children.some((n) => le(n, t));
}
const Fa = (e) => nt(e).length === 0, On = (e) => !j(e) && mt(e), Bn = (e) => Fa(e) && !On(e);
function xn(e) {
  return zt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : te(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => ve(t) ? [] : [{ node: t, index: n }]);
}
const ds = (e) => xn(e).map((t) => t.node);
function _t(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => ve(s) ? s === t : le(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Na(e) {
  const t = e.panels[_t(e)];
  return t !== void 0 && ve(t) ? t : "";
}
function Ae(e) {
  if (ve(e)) return e;
  if (j(e)) {
    const n = e.panels[_t(e)];
    return n === void 0 ? "" : Ae(n);
  }
  if (te(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Ae(n.node) : "";
  }
  const t = e.children[0];
  return t ? Ae(t) : "";
}
function bt(e, t) {
  if (j(e) && De(e, t)) return e;
  for (const n of ds(e)) {
    const s = bt(n, t);
    if (s) return s;
  }
  return null;
}
function yu(e) {
  const t = ds(e).flatMap(yu);
  return j(e) ? [e, ...t] : t;
}
function Me(e, t) {
  if (j(e)) {
    for (const n of _u(e)) {
      const s = Me(n, t);
      if (s) return s;
    }
    return null;
  }
  if (te(e)) {
    for (const n of e.frames)
      if (le(n.node, t))
        return Me(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = Me(n, t);
    if (s) return s;
  }
  return null;
}
function Tn(e, t, n = Ra) {
  const s = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), a = s(e.w, t.w), r = s(e.h, t.h), l = (i, o, u) => Math.min(Math.max(i, 0), Math.max(u - o, 0));
  return {
    x: Math.round(l(e.x, a, t.w)),
    y: Math.round(l(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function Is(e, t, n, s, a = Ra) {
  let { x: r, y: l, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (o = e.h + s), t.includes("n") && (o = e.h - s, l = e.y + s), i < a && (t.includes("w") && (r = e.x + e.w - a), i = a), o < a && (t.includes("n") && (l = e.y + e.h - a), o = a), { x: r, y: l, w: i, h: o };
}
const Da = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function $t(e, t, n) {
  if (j(e)) return en(e, t, (r) => $t(r, t, n));
  if (te(e)) {
    let r = !1;
    const l = e.frames.map((i) => {
      if (!le(i.node, t)) return i;
      if (Me(i.node, t)) {
        const u = $t(i.node, t, n);
        return u === i.node ? i : (r = !0, { ...i, node: u });
      }
      const o = n(i);
      return o === i ? i : (r = !0, o);
    });
    return r ? { ...e, frames: l } : e;
  }
  if (!le(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const l = $t(r, t, n);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, children: a } : e;
}
function wu(e, t, n) {
  return $t(e, t, (s) => Da(s.rect, n) ? s : { ...s, rect: n });
}
const at = (e) => e.maximized === !0, Ia = (e) => (t) => {
  if (at(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function ku(e, t, n = !0) {
  return $t(e, t, Ia(n));
}
function Xd(e, t) {
  const n = Me(e, t);
  return n ? ku(e, t, !at(n)) : e;
}
const dt = (e) => e.minimized === !0, Oa = (e) => (t) => {
  if (dt(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function bu(e, t, n = !0) {
  return $t(e, t, Oa(n));
}
function Gd(e, t) {
  const n = Me(e, t);
  return n ? bu(e, t, !dt(n)) : e;
}
function ut(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = lt(e, t.slice(0, -1));
  return !s || !te(s) ? null : s.frames[n] ?? null;
}
function Kn(e, t) {
  if (te(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!le(s.node, t)) continue;
      const a = Kn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of xn(e)) {
    if (!le(n, t)) continue;
    const a = Kn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function fs(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = lt(e, a);
  if (!r || !te(r)) return e;
  const l = r.frames[s];
  if (!l) return e;
  const i = n(l);
  if (i === l) return e;
  const o = [...r.frames];
  return o[s] = i, ht(e, a, { ...r, frames: o });
}
function Os(e, t, n) {
  return fs(
    e,
    t,
    (s) => Da(s.rect, n) ? s : { ...s, rect: n }
  );
}
function $u(e, t, n = !0) {
  return fs(e, t, Ia(n));
}
function xu(e, t, n = !0) {
  return fs(e, t, Oa(n));
}
function Ot(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (te(e)) {
    const l = e.frames[n];
    if (!l) return e;
    const i = Ot(l.node, s), o = i === l.node ? l : { ...l, node: i };
    if (n === e.frames.length - 1 && o === l) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(o), { ...e, frames: u };
  }
  const a = lt(e, [n]);
  if (!a) return e;
  const r = Ot(a, s);
  return r === a ? e : ht(e, [n], r);
}
function Cu(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (te(s) && (n[r] = s.frames.length - 1), s = lt(s, [a]));
  }), n;
}
function un(e, t, n, s) {
  if (j(e)) return en(e, n, (l) => un(l, t, n, s));
  if (te(e)) {
    const l = e.frames.findIndex((o) => le(o.node, n)), i = e.frames[l];
    if (!i) return e;
    if (Me(i.node, n)) {
      const o = un(i.node, t, n, s);
      if (o === i.node) return e;
      const u = [...e.frames];
      return u[l] = { ...i, node: o }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, $n(Ge(t), s)] };
  }
  if (!le(e, n)) return e;
  let a = !1;
  const r = e.children.map((l) => {
    const i = un(l, t, n, s);
    return i !== l && (a = !0), i;
  });
  return a ? { ...e, children: r } : e;
}
function Bs(e, t, n, s) {
  if (t === n || !le(e, t) || !le(e, n) || !Me(e, n)) return e;
  const a = vt(e, t);
  if (!a) return e;
  const r = un(a, t, n, s);
  return r === a ? e : be(r);
}
function Mu(e, t, n) {
  return te(e) ? { ...e, frames: [...e.frames, $n(Ge(t), n)] } : j(e) ? Ka(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ge(t)],
    sizes: [...et(e), 1],
    ...ye(e)
  };
}
function Ba(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return Mu(e, t, s);
  const r = n.slice(1), l = (d, m) => m === a ? Ba(d, t, r, s) : vt(d, t);
  if (te(e)) {
    const d = e.frames.flatMap((m, b) => {
      const y = l(m.node, b);
      return y ? [y === m.node ? m : { ...m, node: y }] : [];
    });
    return { ...e, frames: d };
  }
  if (j(e)) {
    const d = _t(e), m = [];
    e.panels.forEach((k, x) => {
      if (ve(k)) {
        k !== t && m.push(k);
        return;
      }
      const g = l(k, x);
      g && m.push(g);
    });
    const y = e.active && m.some((k) => Jt(k).includes(e.active)) ? e.active : Ae(m[d] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...y ? { active: y } : {},
      ...ye(e)
    };
  }
  const i = et(e), o = [], u = [];
  return e.children.forEach((d, m) => {
    const b = l(d, m);
    b && (o.push(b), u.push(i[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: u, ...ye(e) };
}
function Ks(e, t, n, s) {
  const a = lt(e, n);
  return !a || !Fa(a) || !le(e, t) ? e : be(Ba(e, t, n, s));
}
function zn(e, t) {
  if (j(e)) return en(e, t, (a) => zn(a, t));
  if (te(e)) {
    const a = e.frames.findIndex((u) => le(u.node, t)), r = e.frames[a];
    if (!r) return e;
    const l = zn(r.node, t), i = l === r.node ? r : { ...r, node: l };
    if (a === e.frames.length - 1 && i === r) return e;
    const o = [...e.frames];
    return o.splice(a, 1), o.push(i), { ...e, frames: o };
  }
  if (!le(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = zn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function ps(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, l) => r + l, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const et = (e) => ps(e.children.length, e.sizes), We = (e) => {
  const t = j(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function be(e) {
  if (j(e)) return Su(e);
  if (te(e)) {
    const i = e.frames.flatMap((o) => {
      const u = be(o.node);
      return Bn(u) ? [] : [u === o.node ? o : { ...o, node: u }];
    });
    return i.length === e.frames.length && i.every((o, u) => o === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = et(e), n = We(e), s = [], a = [], r = [];
  e.children.forEach((i, o) => {
    const u = be(i), d = t[o] ?? 0;
    if (Bn(u)) return;
    if (!n && zt(u) && u.direction === e.direction && !We(u) && !mt(u)) {
      const b = et(u);
      u.children.forEach((y, k) => {
        s.push(y), a.push(d * (b[k] ?? 0));
      });
      return;
    }
    s.push(u), a.push(d);
    const m = n?.[o];
    m && r.push(m);
  });
  const l = s[0];
  return s.length === 1 && l && !mt(e) ? l : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: ps(s.length, a),
    ...ye(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function Su(e) {
  if (e.panels.every(ve)) return e;
  const t = Ae(e), n = We(e), s = [], a = [];
  e.panels.forEach((i, o) => {
    const u = n?.[o];
    if (ve(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const d = be(i);
    if (!Bn(d)) {
      if (j(d) && !mt(d) && !We(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !ve(r) && !mt(e))
    return r;
  if (s.length === e.panels.length && s.every((i, o) => i === e.panels[o]))
    return e;
  const l = t && s.some((i) => Jt(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...l ? { active: l } : {},
    ...ye(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function vt(e, t) {
  if (te(e)) {
    const l = e.frames.flatMap((i) => {
      const o = vt(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return l.length === 0 && !On(e) ? null : { ...e, frames: l };
  }
  if (j(e)) {
    if (!le(e, t)) return e;
    const l = _t(e), i = [];
    for (const d of e.panels) {
      if (ve(d)) {
        d !== t && i.push(d);
        continue;
      }
      const m = vt(d, t);
      m && i.push(m);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((d) => Jt(d).includes(e.active)) ? e.active : Ae(i[l] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...ye(e) } : { kind: "group", panels: i, ...ye(e) };
  }
  const n = et(e), s = [], a = [];
  if (e.children.forEach((l, i) => {
    const o = vt(l, t);
    o && (s.push(o), a.push(n[i] ?? 0));
  }), s.length === 0)
    return On(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...ye(e) } : null;
  const r = s[0];
  return s.length === 1 && r && !mt(e) ? r : be({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...ye(e)
  });
}
function Ka(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...ye(e) };
}
function Nt(e, t, n, s, a) {
  const r = (y) => Zt(
    y,
    (k) => le(k, n) ? Nt(k, t, n, s, a) : k
  );
  if (s === "float") return e;
  const l = (y) => en(y, n, (k) => Nt(k, t, n, s, a));
  if (s === "center")
    return j(e) ? De(e, n) ? Ka(e, t, a) : l(e) : te(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (y) => le(y, n) ? Nt(y, t, n, s, a) : y
      )
    };
  const i = gu(s), o = s === "left" || s === "top", u = (y) => ({
    kind: "split",
    direction: i,
    children: o ? [Ge(t), y] : [y, Ge(t)],
    sizes: [0.5, 0.5]
  });
  if (j(e)) return De(e, n) ? u(e) : l(e);
  if (te(e)) return r(e);
  const d = et(e), m = e.children.findIndex(
    (y) => j(y) && De(y, n)
  );
  if (m >= 0 && e.direction === i) {
    const y = (d[m] ?? 0) / 2, k = [...e.children], x = [...d];
    return k.splice(o ? m : m + 1, 0, Ge(t)), x.splice(m, 1, y, y), {
      kind: "split",
      direction: i,
      children: k,
      sizes: x,
      ...ye(e)
    };
  }
  const b = e.children.map((y) => le(y, n) ? j(y) && De(y, n) ? u(y) : Nt(y, t, n, s) : y);
  return {
    kind: "split",
    direction: e.direction,
    children: b,
    sizes: d,
    ...ye(e)
  };
}
function xt(e, t) {
  if (j(e)) {
    if (De(e, t))
      return Na(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((o) => !ve(o) && le(o, t)), r = e.panels[a];
    if (r === void 0 || ve(r)) return e;
    const l = xt(r, t);
    if (l === r && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = l, { ...e, panels: i, active: t };
  }
  if (!le(e, t)) return e;
  if (te(e)) return Zt(e, (a) => xt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = xt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Bt(e, t, n) {
  if (j(e)) {
    if (!De(e, t)) return en(e, t, (u) => Bt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const l = We(e), i = l ? [...l] : void 0;
    i && i.splice(a, 0, ...i.splice(s, 1));
    const o = Ae(e);
    return {
      kind: "group",
      panels: r,
      ...o ? { active: o } : {},
      ...ye(e),
      ...i ? { places: i } : {}
    };
  }
  return le(e, t) ? te(e) ? Zt(e, (s) => Bt(s, t, n)) : { ...e, children: e.children.map((s) => Bt(s, t, n)) } : e;
}
function dn(e, t, n) {
  if (t === n) return e;
  if (j(e)) {
    if (!le(e, t) && !le(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => ve(r) ? s(r) : dn(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return te(e) ? Zt(e, (s) => dn(s, t, n)) : { ...e, children: e.children.map((s) => dn(s, t, n)) };
}
function an(e, t, n, s, a) {
  if (s === "float" || !le(e, t) || !le(e, n)) return e;
  const r = bt(e, t);
  if (s === "center" && r && De(r, n)) {
    if (a === void 0) return e;
    const i = r.panels.indexOf(t), o = a > i ? a - 1 : a;
    return o === i ? e : xt(Bt(e, t, o), t);
  }
  if (t === n) return e;
  const l = vt(e, t);
  return l ? be(Nt(l, t, n, s, a)) : e;
}
function qa(e, t, n) {
  if (j(e)) {
    const a = e.panels[t];
    if (a === void 0 || ve(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (te(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const r = [...e.frames];
    return r[t] = { ...a, node: n }, { ...e, frames: r };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function tn(e, t, n) {
  const s = xn(e);
  if (!j(e) && s.some(({ node: a }) => j(a) && De(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!le(a, t)) continue;
    const l = tn(a, t, n);
    return l ? qa(e, r, l) : null;
  }
  return null;
}
function Yd(e, t, n) {
  const s = tn(
    e,
    t,
    (a) => zt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? be(s) : e;
}
function Va(e) {
  return te(e) ? [e] : We(e) || mt(e) ? [e] : j(e) ? [...e.panels] : e.children.flatMap(Va);
}
function Wa(e, t) {
  if (j(e)) return e;
  const n = ds(e).map(Va), s = n.flat(), a = t && s.some((l) => Jt(l).includes(t)) ? t : void 0, r = Eu(e, n);
  return be({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...ye(e),
    ...r ? { places: r } : {}
  });
}
function Eu(e, t) {
  const n = te(e) ? e.frames.map(({ node: s, ...a }) => a) : We(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Pu(e, t) {
  const n = tn(e, t, (s) => Wa(s, t));
  return n ? be(n) : e;
}
function vs(e, t, n) {
  if (j(e) && De(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of xn(e)) {
    if (!le(s, t)) continue;
    const r = vs(s, t, n);
    return r ? qa(e, a, r) : null;
  }
  return null;
}
function qs(e, t, n) {
  const s = vs(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = We(a);
    return {
      ...cs(n, a.panels.map(ls)),
      ...ye(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? be(s) : e;
}
function qn(e, t) {
  if (j(e)) return e;
  if (te(e)) {
    const a = e.frames.findIndex(
      (i) => j(i.node) && i.node.panels.includes(t)
    ), r = e.frames[a], l = r && j(r.node) ? r.node : null;
    if (r && l && l.panels.length > 1) {
      const i = is(l.panels.map(ls), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return Zt(e, (i) => qn(i, t));
  }
  if (!le(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = qn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Au(e, t, n) {
  const s = bt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (Me(e, t)?.node === s) {
    const l = qn(e, t);
    return l === e ? e : be(l);
  }
  const r = vs(e, t, (l) => ({
    ...os(Ua(l.panels.map(ls), We(l), n)),
    ...ye(l)
  }));
  return r ? be(r) : e;
}
function Ua(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : is(e, n).frames;
}
function Ha(e, t) {
  return { ...os(Ua(e.children, We(e), t)), ...ye(e) };
}
function Qd(e, t, n) {
  const s = tn(
    e,
    t,
    (a) => te(a) ? a : Ha(a, n)
  );
  return s ? be(s) : j(e) && De(e, t) ? is([e], n) : e;
}
function Tu(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function ja(e, t) {
  const n = Tu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...ye(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Zd(e, t, n = "row") {
  const s = tn(
    e,
    t,
    (a) => te(a) ? ja(a, n) : a
  );
  return s ? be(s) : e;
}
function Xa(e) {
  if (te(e)) return null;
  const t = j(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || ve(t) || j(t) && t.panels.length === 1 && ve(t.panels[0]) ? null : t;
}
const zu = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Ru(e, t) {
  const n = Xa(e);
  return n ? t === "inner" ? n : { ...zu(n), ...ye(e) } : e;
}
function Pt(e) {
  return e.title ? e.title : j(e) ? "" : te(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Kt(e, t) {
  if (j(e)) {
    const s = e.panels[_t(e)];
    return s === void 0 ? "" : ve(s) ? t(s) ?? s : Pt(s) || Kt(s, t);
  }
  if (e.title) return e.title;
  if (te(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Kt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Kt(n, t) : "";
}
function lt(e, t) {
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
    const o = e.frames[s];
    if (!o) return e;
    const u = ht(o.node, a, n);
    if (u === o.node) return e;
    const d = [...e.frames];
    return d[s] = { ...o, node: u }, { ...e, frames: d };
  }
  if (j(e)) {
    const o = e.panels[s];
    if (o === void 0 || ve(o)) return e;
    const u = ht(o, a, n);
    if (u === o) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = ht(r, a, n);
  if (l === r) return e;
  const i = [...e.children];
  return i[s] = l, { ...e, children: i };
}
function fn(e, t, n) {
  if (t.length === 0)
    return zt(e) ? { ...e, sizes: ps(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (te(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const o = fn(i.node, a, n);
    if (o === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: o }, { ...e, frames: u };
  }
  if (j(e)) {
    const i = e.panels[s];
    if (i === void 0 || ve(i)) return e;
    const o = fn(i, a, n);
    if (o === i) return e;
    const u = [...e.panels];
    return u[s] = o, { ...e, panels: u };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = [...e.children];
  return l[s] = fn(r, a, n), { ...e, children: l };
}
function Vs(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const l = a + r;
  if (l < s * 2) return e;
  const i = [...e], o = Math.min(Math.max(a + n, s), l - s);
  return i[t] = o, i[t + 1] = l - o, i;
}
function yn(e) {
  if (!j(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !ve(t) ? e : { ...us([Lu(e)]), ...ye(e) };
}
const Lu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ws(e) {
  return e.length === 0 ? null : us(e.map(Ge));
}
function Fu(e, t) {
  if (!e) return Ws(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const o of nt(e))
    !n.has(o) || s.has(o) ? a.add(o) : s.add(o);
  let r = e;
  for (const o of a)
    r = r ? vt(r, o) : null;
  const l = new Set(r ? nt(r) : []), i = t.filter((o) => !l.has(o));
  if (i.length === 0) return r ? yn(be(r)) : null;
  if (!r) return Ws(i);
  if (te(r)) {
    const o = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...i.map(
          (u, d) => $n(Ge(u), {
            x: pt.x + (o + d) * gn,
            y: pt.y + (o + d) * gn
          })
        )
      ]
    };
  }
  return yn(be(us([r, ...i.map(Ge)])));
}
const hs = Symbol("dc.windowContext");
function Nu(e) {
  return Vn(hs, e), e;
}
function ms() {
  const e = Mt(hs, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Du = ["data-dc-glyph"], Iu = { class: "dc-glyph__line" }, Ou = ["d"], Bu = {
  key: 0,
  class: "dc-glyph__aqua"
}, Ku = ["d"], qu = /* @__PURE__ */ ue({
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
      w("g", Iu, [
        (f(!0), h(Q, null, ce(t[e.kind], (r) => (f(), h("path", {
          key: r,
          d: r
        }, null, 8, Ou))), 128))
      ]),
      n[e.kind] ? (f(), h("g", Bu, [
        (f(!0), h(Q, null, ce(n[e.kind], (r) => (f(), h("path", {
          key: r,
          d: r
        }, null, 8, Ku))), 128))
      ])) : T("", !0)
    ], 8, Du));
  }
}), Ct = /* @__PURE__ */ pe(qu, [["__scopeId", "data-v-4d2872c0"]]), Vu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Wu = ["data-dc-movable"], Uu = { class: "dc-float__title dc-truncate" }, Hu = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, ju = ["aria-label", "aria-pressed", "data-dc-minimize"], Xu = ["aria-label", "aria-pressed", "data-dc-maximize"], Gu = ["aria-label", "data-dc-close"], Yu = { class: "dc-float__content" }, Qu = ["data-dc-handle", "onPointerdown"], Zu = /* @__PURE__ */ ue({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ms(), s = v(() => Ae(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), r = v(() => at(t.frame)), l = v(() => dt(t.frame)), i = v(() => r.value || l.value), o = v(() => n.resizable.value && !a.value && !i.value), u = v(() => n.movable.value && !a.value && !i.value), d = v(() => {
      const D = nt(t.frame.node);
      return D.length === 1 ? D[0] ?? null : null;
    }), m = v(() => d.value !== null && n.closable(d.value)), b = v(() => t.frame.node.headless === !0), y = v(
      () => !b.value && (!j(t.frame.node) || l.value)
    ), k = v(
      () => t.frame.title || Pt(t.frame.node) || Kt(t.frame.node, (D) => n.panelFor(D)?.title)
    ), x = v(() => n.spaceMenu(t.path));
    function g(D) {
      D.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, D, "move");
    }
    function $(D) {
      D.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const R = v(() => {
      const D = n.framing.value;
      return D !== null && le(t.frame.node, D);
    }), B = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${In}px`,
        height: `${La}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), N = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (D, U) => (f(), h("div", {
      class: "dc-float",
      style: Re(B.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": l.value ? "true" : "false",
      "data-dc-dragging": R.value ? "true" : "false",
      onPointerdown: U[3] || (U[3] = (P) => E(n).raiseAt(e.path))
    }, [
      y.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: g,
        onDblclick: $
      }, [
        w("span", Uu, z(k.value), 1),
        x.value.length ? (f(), se(rs, {
          key: 0,
          items: x.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : T("", !0),
        !a.value || l.value && m.value && d.value ? (f(), h("div", Hu, [
          a.value ? T("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": l.value,
            "data-dc-minimize": s.value,
            onClick: U[0] || (U[0] = (P) => E(n).toggleMinimizeAt(e.path))
          }, [
            he(Ct, {
              kind: l.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, ju)),
          a.value ? T("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: U[1] || (U[1] = (P) => E(n).toggleMaximizeAt(e.path))
          }, [
            he(Ct, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Xu)),
          l.value && m.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": d.value,
            onClick: U[2] || (U[2] = (P) => E(n).close(d.value))
          }, [
            he(Ct, { kind: "close" })
          ], 8, Gu)) : T("", !0)
        ])) : T("", !0)
      ], 40, Wu)) : T("", !0),
      w("div", Yu, [
        we(D.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(Q, null, ce(o.value ? N : [], (P) => (f(), h("span", {
        key: P,
        class: "dc-float__grip",
        "data-dc-handle": P,
        "aria-hidden": "true",
        onPointerdown: ze((L) => E(n).beginFrameDragAt(e.path, L, P), ["stop"])
      }, null, 40, Qu))), 128))
    ], 44, Vu));
  }
}), Ju = /* @__PURE__ */ pe(Zu, [["__scopeId", "data-v-f035684c"]]), _s = Symbol("dc.paneContext");
function ed(e) {
  return Vn(_s, e), e;
}
function Jd() {
  return Mt(_s, null);
}
function ef(e) {
  const t = Mt(hs, null), n = Mt(_s, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Ft(e)
  );
  return _r() && Hs(s), s;
}
const td = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], nd = ["data-dc-movable"], sd = ["aria-label", "aria-pressed"], ad = ["data-dc-space-name"], rd = { class: "dc-truncate" }, ld = ["aria-label"], od = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, id = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], cd = { class: "dc-tab__name dc-truncate" }, ud = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, dd = ["aria-label", "data-dc-close", "onClick"], fd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, pd = { class: "dc-pane__tools" }, vd = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, hd = ["aria-label", "data-dc-minimize"], md = ["aria-label", "aria-pressed", "data-dc-maximize"], _d = ["aria-label", "data-dc-close"], gd = ["id", "role", "aria-labelledby"], yd = ["id", "role", "aria-labelledby"], wd = ["data-dc-edge"], kd = /* @__PURE__ */ ue({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ms(), s = js() ?? "dc-pane", a = v(
      () => t.group.panels.flatMap((q, H) => {
        if (!ve(q)) {
          const F = Pt(q) || Kt(q, (O) => n.panelFor(O)?.title);
          return [{ kind: "space", index: H, id: `space-${H}`, title: F, node: q }];
        }
        const M = n.panelFor(q);
        return M ? [{ kind: "panel", index: H, id: q, title: M.title, panel: M }] : [];
      })
    ), r = v(() => a.value.length > 1), l = v(() => {
      const q = _t(t.group);
      return a.value.find((H) => H.index === q) ?? a.value[0] ?? null;
    }), i = v(() => l.value?.kind === "space" ? l.value.node : null), o = v(() => i.value ? "" : Na(t.group)), u = v(() => i.value ? null : n.panelFor(o.value)), d = v(() => l.value?.title ?? ""), m = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), b = v(() => [...t.path, l.value?.index ?? 0]), y = v(() => o.value || Ds(t.group)[0] || ""), k = v(() => n.viewFor(o.value)), x = v(() => t.group.headless === !0), g = v(() => n.focused.value === o.value), $ = v(() => n.dragging.value === o.value), R = v(() => n.moving.value === o.value), B = v(() => n.frameOf(y.value) !== null), N = v(() => n.panelFor(y.value)?.fixed === !0), D = v(
      () => !i.value && (n.canMove(o.value) || B.value && n.movable.value && !N.value)
    ), U = v(
      () => i.value ? n.spaceMenu(b.value) : n.menuFor(o.value)
    ), P = (q) => n.closable(q);
    ed({ panel: o });
    const L = v(() => n.maximized(y.value)), Y = v(
      () => B.value && !N.value || !r.value && !!u.value && P(u.value.id)
    ), re = (q) => `${s}-tab-${q}`, oe = v(() => `${s}-body`), Z = v(() => {
      const q = n.dropTarget.value;
      return !q || !De(t.group, q.panel) || q.edge === "float" ? null : q;
    }), ge = v(() => Z.value?.index === void 0 ? Z.value?.edge ?? null : null), Se = v(() => Z.value?.index ?? null), C = () => u.value ? n.renderContent(u.value, k.value, g.value) ?? null : null, K = () => u.value ? n.renderActions(u.value, k.value, g.value) ?? null : null;
    let G = null;
    function ne(q) {
      const H = G !== null && Math.hypot(q.clientX - G.x, q.clientY - G.y) >= 4;
      return G = null, H;
    }
    const me = (q) => q.kind === "panel" ? q.id : Ae(q.node);
    function xe(q, H) {
      H.kind !== "space" && (n.focus(H.id), G = { x: q.clientX, y: q.clientY }, n.beginDrag(H.id, q));
    }
    function Ce(q, H) {
      if (ne(q)) return;
      const M = me(H);
      M && n.selectPanel(M);
    }
    function Ue(q) {
      o.value && n.focus(o.value), !q.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (B.value ? n.beginFrameDrag(y.value, q, "move") : n.beginDrag(o.value, q));
    }
    function Oe(q) {
      G = { x: q.clientX, y: q.clientY }, n.beginDrag(o.value, q);
    }
    function Be(q) {
      ne(q) || n.toggleMoveMode(o.value);
    }
    const Ee = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ke(q) {
      if (!R.value) return;
      if (q.key === "Escape") {
        q.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const H = Ee[q.key];
      H && (q.preventDefault(), B.value ? n.nudgeFrame(o.value, H, q.shiftKey) : n.nudge(o.value, H, q.shiftKey));
    }
    function qe(q) {
      !B.value || q.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(y.value);
    }
    function ot(q, H) {
      q.stopPropagation(), G = null, n.close(H);
    }
    function gt(q, H) {
      const M = a.value.length;
      let F = null;
      if (q.key === "ArrowRight" ? F = (H + 1) % M : q.key === "ArrowLeft" ? F = (H - 1 + M) % M : q.key === "Home" ? F = 0 : q.key === "End" && (F = M - 1), F === null) return;
      q.preventDefault();
      const O = a.value[F];
      if (!O) return;
      const Te = me(O);
      Te && n.selectPanel(Te);
    }
    return (q, H) => l.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": E(Ds)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": B.value ? "true" : "false",
      "data-dc-maximized": L.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": g.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: H[7] || (H[7] = (M) => o.value && E(n).focus(o.value))
    }, [
      x.value ? T("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": D.value ? "true" : "false",
        onPointerdown: Ue,
        onDblclick: qe
      }, [
        D.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": R.value,
          onPointerdown: Oe,
          onClick: Be,
          onKeydown: Ke
        }, [...H[8] || (H[8] = [
          w("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, sd)) : T("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          w("span", rd, z(m.value), 1)
        ], 8, ad)) : T("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(Q, null, ce(a.value, (M, F) => (f(), h(Q, {
            key: M.id
          }, [
            Se.value === F ? (f(), h("span", od)) : T("", !0),
            w("button", {
              id: re(M.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": M.kind === "panel" ? M.id : void 0,
              "data-dc-space": M.kind === "space" ? M.title : void 0,
              "aria-selected": M.index === l.value.index,
              "aria-controls": oe.value,
              tabindex: M.index === l.value.index ? 0 : -1,
              onPointerdown: (O) => xe(O, M),
              onClick: (O) => Ce(O, M),
              onKeydown: (O) => gt(O, F)
            }, [
              w("span", cd, z(M.title), 1),
              M.kind === "panel" && M.panel.subtitle ? (f(), h("span", ud, z(M.panel.subtitle), 1)) : T("", !0),
              r.value && M.kind === "panel" && P(M.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${M.title}`,
                "data-dc-close": M.id,
                onPointerdown: H[0] || (H[0] = ze(() => {
                }, ["stop"])),
                onClick: (O) => ot(O, M.id)
              }, [...H[9] || (H[9] = [
                w("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, dd)) : T("", !0)
            ], 40, id)
          ], 64))), 128)),
          Se.value === a.value.length ? (f(), h("span", fd)) : T("", !0)
        ], 8, ld),
        w("div", pd, [
          he(K),
          U.value.length ? (f(), se(rs, {
            key: 0,
            items: U.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ]),
        Y.value ? (f(), h("div", vd, [
          B.value && !N.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: H[1] || (H[1] = ze(() => {
            }, ["stop"])),
            onClick: H[2] || (H[2] = (M) => E(n).toggleMinimize(y.value))
          }, [
            he(Ct, { kind: "minimize" })
          ], 40, hd)) : T("", !0),
          B.value && !N.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${L.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": L.value,
            "data-dc-maximize": y.value,
            onPointerdown: H[3] || (H[3] = ze(() => {
            }, ["stop"])),
            onClick: H[4] || (H[4] = (M) => E(n).toggleMaximize(y.value))
          }, [
            he(Ct, {
              kind: L.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, md)) : T("", !0),
          !r.value && u.value && P(u.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: H[5] || (H[5] = ze(() => {
            }, ["stop"])),
            onClick: H[6] || (H[6] = (M) => E(n).close(u.value.id))
          }, [
            he(Ct, { kind: "close" })
          ], 40, _d)) : T("", !0)
        ])) : T("", !0)
      ], 40, nd)),
      i.value ? (f(), h("div", {
        key: 1,
        id: oe.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : re(l.value.id)
      }, [
        we(q.$slots, "space", {
          node: i.value,
          path: b.value
        }, void 0, !0)
      ], 8, gd)) : (f(), h("div", {
        key: 2,
        id: oe.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : re(o.value)
      }, [
        he(C)
      ], 8, yd)),
      ge.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ge.value,
        "aria-hidden": "true"
      }, null, 8, wd)) : T("", !0)
    ], 40, td)) : T("", !0);
  }
}), Ga = /* @__PURE__ */ pe(kd, [["__scopeId", "data-v-44fd2b2d"]]), bd = ["data-dc-space", "data-dc-path", "aria-label"], $d = {
  key: 0,
  class: "dc-space__head"
}, xd = { class: "dc-space__title dc-truncate" }, Cd = ["data-dc-direction"], Md = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Sd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Ed = /* @__PURE__ */ ue({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ms(), s = W(null), a = v(() => j(t.node) ? t.node : null), r = v(() => zt(t.node) ? t.node : null), l = v(() => te(t.node) ? t.node : null), i = v(
      () => r.value ? r.value.children : l.value?.frames.map((C) => C.node) ?? []
    ), o = v(() => r.value ? et(r.value) : []), u = v(
      () => (l.value?.frames ?? []).map((C, K) => ({
        held: C,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: K,
        key: P(C.node),
        path: [...t.path, K]
      })).sort((C, K) => C.key < K.key ? -1 : C.key > K.key ? 1 : 0)
    ), d = v(() => Pt(t.node)), m = v(() => n.spaceMenu(t.path)), b = v(() => t.node.headless === !0), y = v(() => l.value ? "desktop" : r.value?.direction ?? ""), k = W(null), x = W(0);
    let g = null;
    ke(
      k,
      (C) => {
        g?.disconnect(), g = null, !(!C || typeof ResizeObserver > "u") && (x.value = C.clientWidth, g = new ResizeObserver(([K]) => {
          x.value = K?.contentRect.width ?? 0;
        }), g.observe(C));
      },
      { immediate: !0 }
    ), tt(() => g?.disconnect());
    const $ = v(() => {
      const C = Math.max(
        1,
        Math.floor((x.value + wt) / (In + wt))
      ), K = /* @__PURE__ */ new Map();
      let G = 0;
      for (const ne of u.value)
        ne.held.minimized === !0 && (K.set(ne.key, {
          x: wt + G % C * (In + wt),
          bottom: wt + Math.floor(G / C) * (La + wt)
        }), G += 1);
      return K;
    }), R = (C) => !!C && C.join("/") === t.path.join("/"), B = v(() => {
      const C = n.dropTarget.value, K = l.value;
      if (!K || !C?.rect || C.edge !== "float") return null;
      if (C.space) return R(C.space) ? C.rect : null;
      const G = Me(K, C.panel);
      return G && K.frames.includes(G) ? C.rect : null;
    }), N = v(() => {
      const C = n.dropTarget.value;
      return !!C && !C.rect && R(C.space);
    }), D = v(() => r.value?.direction === "row"), U = v(() => i.value.map((C, K) => [...t.path, K])), P = (C) => [...nt(C)].sort().join("/"), L = (C) => {
      const K = nt(C)[0];
      return (K ? n.panelFor(K)?.title : null) ?? K ?? "panel";
    }, Y = (C) => {
      const K = i.value[C], G = i.value[C + 1];
      return !K || !G ? "Resize panels" : `Resize ${L(K)} and ${L(G)}`;
    }, re = (C) => {
      const K = o.value[C] ?? 0, G = o.value[C + 1] ?? 0, ne = K + G;
      return ne > 0 ? Math.round(K / ne * 100) : 50;
    };
    function oe() {
      const C = s.value, K = C ? D.value ? C.clientWidth : C.clientHeight : 0;
      return K <= 0 ? 0.05 : Math.min(n.minPanelSize.value / K, 0.4);
    }
    let Z = null;
    function ge(C, K) {
      const G = r.value, ne = s.value;
      if (!n.resizable.value || !G || !ne || C.button !== 0) return;
      const me = D.value ? ne.clientWidth : ne.clientHeight;
      if (me <= 0) return;
      const xe = D.value ? C.clientX : C.clientY, Ce = et(G), Ue = Math.min(n.minPanelSize.value / me, 0.4);
      C.preventDefault();
      const Oe = (Ke) => {
        const qe = ((D.value ? Ke.clientX : Ke.clientY) - xe) / me;
        n.setSizes(t.path, Vs(Ce, K, qe, Ue));
      }, Be = () => Z?.(), Ee = (Ke) => {
        Ke.key === "Escape" && (n.setSizes(t.path, Ce), Z?.());
      };
      Z = () => {
        window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", Be), window.removeEventListener("pointercancel", Be), window.removeEventListener("keydown", Ee), Z = null;
      }, window.addEventListener("pointermove", Oe), window.addEventListener("pointerup", Be), window.addEventListener("pointercancel", Be), window.addEventListener("keydown", Ee);
    }
    tt(() => Z?.());
    function Se(C, K) {
      const G = r.value;
      if (!n.resizable.value || !G) return;
      const ne = D.value ? "ArrowRight" : "ArrowDown", me = D.value ? "ArrowLeft" : "ArrowUp", xe = C.shiftKey ? 0.1 : 0.02;
      if (C.key !== ne && C.key !== me) return;
      const Ce = C.key === ne ? xe : -xe;
      C.preventDefault(), n.setSizes(t.path, Vs(et(G), K, Ce, oe()));
    }
    return (C, K) => {
      const G = Xs("WindowNode", !0);
      return a.value ? (f(), se(Ga, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: Xe(({ node: ne, path: me }) => [
          he(G, {
            node: ne,
            path: me,
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
        !e.framed && !b.value ? (f(), h("header", $d, [
          w("span", xd, z(d.value), 1),
          m.value.length ? (f(), se(rs, {
            key: 0,
            items: m.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ])) : T("", !0),
        l.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: k,
          class: "dc-window__desktop"
        }, [
          B.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${B.value.x}px`,
              top: `${B.value.y}px`,
              width: `${B.value.w}px`,
              height: `${B.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : T("", !0),
          (f(!0), h(Q, null, ce(u.value, (ne) => (f(), se(Ju, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: $.value.get(ne.key) ?? null
          }, {
            default: Xe(() => [
              he(G, {
                node: ne.held.node,
                path: ne.path,
                framed: ne.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (f(), h("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          N.value ? (f(), h("div", Md)) : T("", !0),
          (f(!0), h(Q, null, ce(i.value, (ne, me) => (f(), h(Q, {
            key: P(ne)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: o.value[me] ?? 1 })
            }, [
              he(G, {
                node: ne,
                path: U.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < i.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": D.value ? "vertical" : "horizontal",
              "aria-label": Y(me),
              "aria-valuenow": re(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (xe) => ge(xe, me),
              onKeydown: (xe) => Se(xe, me)
            }, null, 40, Sd)) : T("", !0)
          ], 64))), 128))
        ], 8, Cd)) : T("", !0)
      ], 8, bd));
    };
  }
}), Pd = /* @__PURE__ */ pe(Ed, [["__scopeId", "data-v-fb5b403f"]]), Ad = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Td = {
  key: 1,
  class: "dc-window__empty"
}, zd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, rn = 16, Rd = /* @__PURE__ */ ue({
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
    const s = e, a = n, r = Dt(e, "layout"), l = Dt(e, "views"), i = Ut(), o = v(() => new Map(s.panels.map((c) => [c.id, c]))), u = v(() => s.panels.map((c) => c.id)), d = v(() => Fu(r.value, u.value)), m = W(null), b = W(null), y = W(null), k = W(!0), x = W(null), g = W(null), $ = W(null), R = W(""), B = W(null);
    function N() {
      const c = B.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((_) => _.closest(".dc-window") === c).map((_) => ({ panels: (_.dataset.dcPanels ?? "").split(" "), element: _ })) : [];
    }
    function D(c) {
      const p = [];
      let _ = c.closest(".dc-float");
      for (; _; )
        p.unshift(Number(_.dataset.dcOrder ?? 0)), _ = _.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function U() {
      return N().map((c) => ({ pane: c, order: D(c.element) })).sort((c, p) => {
        const _ = Math.max(c.order.length, p.order.length);
        for (let S = 0; S < _; S += 1) {
          const A = (c.order[S] ?? -1) - (p.order[S] ?? -1);
          if (A !== 0) return A;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const P = (c) => N().find((p) => p.panels.includes(c)) ?? null;
    function L(c) {
      const p = o.value.get(c);
      if (!p) return "";
      const _ = l.value[c];
      return _ && p.views?.some((S) => S.key === _) ? _ : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function Y(c, p) {
      l.value = { ...l.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const re = v(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function oe(c) {
      return !s.movable || re.value < 1 || s.panels.length < 2 ? !1 : o.value.get(c)?.fixed !== !0;
    }
    function Z(c, p) {
      const _ = d.value;
      !c || !_ || c === _ || (r.value = c, p && a("panel-move", p));
    }
    function ge(c, p, _) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const S = (p - c.left) / c.width, A = (_ - c.top) / c.height, I = 0.3;
      return S > I && S < 1 - I && A > I && A < 1 - I ? "center" : [
        { edge: "left", distance: S },
        { edge: "right", distance: 1 - S },
        { edge: "top", distance: A },
        { edge: "bottom", distance: 1 - A }
      ].reduce(
        (ae, V) => V.distance < ae.distance ? V : ae
      ).edge;
    }
    function Se(c, p) {
      const _ = [...c.querySelectorAll(".dc-tab")], S = _.findIndex((A) => {
        const I = A.getBoundingClientRect();
        return p < I.left + I.width / 2;
      });
      return S === -1 ? _.length : S;
    }
    function C(c, p, _) {
      for (const { panels: S, element: A } of U().reverse()) {
        const I = A.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const de = S.find((J) => J !== _), ae = A.querySelector(".dc-pane__tabs"), V = ae?.getBoundingClientRect();
        if (ae && V && p >= V.top && p <= V.bottom)
          return de ? { panel: de, edge: "center", index: Se(ae, c) } : null;
        const X = A.querySelector(":scope > .dc-pane__space");
        if (X) {
          const J = X.getBoundingClientRect();
          if (c >= J.left && c <= J.right && p >= J.top && p <= J.bottom) continue;
        }
        return de ? { panel: de, edge: ge(I, c, p) } : null;
      }
      return G(c, p, _) ?? xe(c, p);
    }
    function K() {
      const c = B.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function G(c, p, _) {
      const S = d.value;
      if (!S) return null;
      for (const A of K()) {
        const I = A.getBoundingClientRect();
        if (c < I.left || c > I.right || p < I.top || p > I.bottom) continue;
        const de = Ce(A), ae = de.flatMap((ie) => ie.panels).find((ie) => ie !== _);
        if (!ae && de.length > 0) return null;
        const V = Me(S, _)?.rect, X = Tn(
          {
            x: c - I.left - 24,
            y: p - I.top - 12,
            w: V?.w ?? pt.w,
            h: V?.h ?? pt.h
          },
          { w: A.clientWidth, h: A.clientHeight },
          s.minPanelSize
        );
        if (ae) return { panel: ae, edge: "float", rect: X };
        const J = ne(A);
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
        const _ = ne(p);
        return _ ? [{ element: p, path: _ }] : [];
      }) : [];
    }
    function xe(c, p) {
      for (const { element: _, path: S } of me()) {
        if (_.dataset.dcSpace === "desktop") continue;
        const A = _.getBoundingClientRect();
        if (!(c < A.left || c > A.right || p < A.top || p > A.bottom))
          return { panel: "", space: S, edge: "center" };
      }
      return null;
    }
    function Ce(c) {
      return N().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let Ue = null;
    const Oe = (c) => c.altKey;
    function Be(c, p) {
      if (!oe(c) || b.value || g.value || p.button !== 0) return;
      const _ = p.clientX, S = p.clientY;
      let A = !1, I = Oe(p);
      const de = () => {
        const fe = $.value;
        fe && (y.value = I ? G(fe.x, fe.y, c) : C(fe.x, fe.y, c));
      }, ae = (fe) => {
        if (!A) {
          if (Math.hypot(fe.clientX - _, fe.clientY - S) < 4) return;
          A = !0, b.value = c, x.value = null;
        }
        I = Oe(fe), k.value = !I, $.value = { x: fe.clientX, y: fe.clientY }, de();
      }, V = (fe) => {
        Oe(fe) !== I && (I = !I, k.value = !I, A && de());
      }, X = (fe) => {
        Ue?.();
        const ee = y.value, Pe = d.value;
        if (fe && A && ee && Pe) {
          const st = ee.space ? Ks(Pe, c, ee.space, ee.rect) : ee.edge === "float" && ee.rect ? Bs(Pe, c, ee.panel, ee.rect) : an(Pe, c, ee.panel, ee.edge, ee.index);
          Z(st, {
            panel: c,
            target: ee.panel,
            edge: ee.edge,
            ...ee.space === void 0 ? {} : { space: ee.space },
            ...ee.index === void 0 ? {} : { index: ee.index },
            ...ee.rect === void 0 ? {} : { rect: ee.rect }
          });
        }
        b.value = null, y.value = null, $.value = null, k.value = !0;
      }, J = () => X(!0), ie = () => X(!1), _e = (fe) => {
        if (fe.key === "Escape") {
          X(!1);
          return;
        }
        V(fe);
      };
      Ue = () => {
        window.removeEventListener("pointermove", ae), window.removeEventListener("pointerup", J), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", _e), window.removeEventListener("keyup", V), Ue = null;
      }, window.addEventListener("pointermove", ae), window.addEventListener("pointerup", J), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", _e), window.addEventListener("keyup", V);
    }
    tt(() => Ue?.());
    let Ee = null;
    function Ke(c) {
      const p = B.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((A) => A.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function qe(c) {
      const p = d.value;
      return p ? Kn(p, c) : null;
    }
    function ot(c) {
      const p = d.value;
      if (!p) return;
      const _ = Ot(p, c);
      _ !== p && (r.value = _);
    }
    function gt(c) {
      const p = qe(c);
      p && ot(p);
    }
    function q(c) {
      const p = d.value, _ = p ? Me(p, c) : null;
      return _ !== null && at(_);
    }
    function H(c) {
      const p = d.value, _ = p ? Me(p, c) : null;
      return _ !== null && dt(_);
    }
    function M(c) {
      const p = d.value, _ = p ? ut(p, c) : null;
      return _ ? Ae(_.node) : "";
    }
    function F(c) {
      const p = d.value, _ = p ? ut(p, c) : null;
      if (!p || !_) return;
      const S = Ae(_.node);
      if (o.value.get(S)?.fixed === !0) return;
      const A = !dt(_);
      let I = xu(p, c, A);
      I !== p && (A || (I = Ot(I, c)), r.value = I, a("frame-minimize", { panel: S, minimized: A }));
    }
    function O(c) {
      const p = qe(c);
      p && F(p);
    }
    function Te(c) {
      const p = d.value, _ = p ? ut(p, c) : null;
      if (!p || !_) return;
      const S = Ae(_.node);
      if (o.value.get(S)?.fixed === !0) return;
      const A = !at(_);
      let I = $u(p, c, A);
      I !== p && (A && (I = Ot(I, c)), r.value = I, a("frame-maximize", { panel: S, maximized: A }));
    }
    function Rt(c) {
      const p = qe(c);
      p && Te(p);
    }
    function gs(c, p, _) {
      const S = d.value, A = S ? ut(S, c) : null;
      if (!S || !A || p.button !== 0 || b.value || g.value) return;
      const I = Ae(A.node);
      if (o.value.get(I)?.fixed === !0 || at(A) || dt(A) || (_ === "move" ? !s.movable : !s.resizable)) return;
      const de = Ke(c), ae = Cu(S, c);
      ot(c);
      const V = { w: de?.clientWidth ?? 0, h: de?.clientHeight ?? 0 }, X = { ...A.rect }, J = p.clientX, ie = p.clientY, _e = s.minPanelSize;
      g.value = I;
      const fe = (Fe) => {
        const Qe = d.value;
        if (!Qe) return;
        const Lt = Os(Qe, ae, Tn(Fe, V, _e));
        Lt !== Qe && (r.value = Lt);
      }, ee = (Fe) => {
        Fe.preventDefault();
        const Qe = Fe.clientX - J, Lt = Fe.clientY - ie;
        fe(
          _ === "move" ? { ...X, x: X.x + Qe, y: X.y + Lt } : Is(X, _, Qe, Lt, _e)
        );
      }, Pe = (Fe) => {
        if (Ee?.(), g.value = null, !Fe) {
          fe(X);
          return;
        }
        const Qe = d.value ? ut(d.value, ae) : null;
        Qe && a("frame-change", { panel: M(ae), rect: Qe.rect });
      }, st = () => Pe(!0), it = () => Pe(!1), ct = (Fe) => {
        Fe.key === "Escape" && Pe(!1);
      };
      Ee = () => {
        window.removeEventListener("pointermove", ee), window.removeEventListener("pointerup", st), window.removeEventListener("pointercancel", it), window.removeEventListener("keydown", ct), Ee = null;
      }, window.addEventListener("pointermove", ee), window.addEventListener("pointerup", st), window.addEventListener("pointercancel", it), window.addEventListener("keydown", ct);
    }
    function Ya(c, p, _) {
      const S = qe(c);
      S && gs(S, p, _);
    }
    function Qa(c, p, _ = !1) {
      const S = d.value, A = qe(c), I = S && A ? ut(S, A) : null;
      if (!S || !A || !I || o.value.get(c)?.fixed === !0 || (_ ? !s.resizable : !s.movable)) return;
      if (at(I) || dt(I)) {
        R.value = `${He(c)} is ${at(I) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const de = p === "left" ? -rn : p === "right" ? rn : 0, ae = p === "up" ? -rn : p === "down" ? rn : 0, V = Ke(A), X = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, J = _ ? Is(I.rect, "se", de, ae, s.minPanelSize) : { ...I.rect, x: I.rect.x + de, y: I.rect.y + ae }, ie = Os(S, A, Tn(J, X, s.minPanelSize));
      if (ie === S) {
        R.value = _ ? `${He(c)} cannot be resized further.` : `${He(c)} cannot move ${p}.`;
        return;
      }
      r.value = ie;
      const _e = ut(ie, A);
      _e && (a("frame-change", { panel: c, rect: _e.rect }), R.value = _ ? `${He(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${He(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    tt(() => Ee?.());
    function Za(c, p) {
      const _ = P(c), S = _?.element.getBoundingClientRect();
      if (!_ || !S) return null;
      const A = p === "left" || p === "right", I = (V) => {
        if (!(A ? V.bottom > S.top + 1 && V.top < S.bottom - 1 : V.right > S.left + 1 && V.left < S.right - 1)) return null;
        const J = p === "left" ? S.left - V.right : p === "right" ? V.left - S.right : p === "up" ? S.top - V.bottom : V.top - S.bottom;
        return J < -1 ? null : J;
      }, de = [];
      for (const V of N()) {
        if (V === _ || V.element === _.element) continue;
        const X = I(V.element.getBoundingClientRect());
        if (X === null) continue;
        const J = V.panels.find((ie) => ie !== c);
        J && de.push({ to: { panel: J }, distance: X });
      }
      for (const { element: V, path: X } of me()) {
        const J = I(V.getBoundingClientRect());
        J !== null && de.push({ to: { space: X }, distance: J });
      }
      return de.reduce(
        (V, X) => V && V.distance <= X.distance ? V : X,
        null
      )?.to ?? null;
    }
    function Ja(c) {
      const p = d.value ? Me(d.value, c) !== null : !1;
      if (!p && !oe(c)) return;
      x.value = x.value === c ? null : c;
      const _ = He(c);
      if (!x.value) {
        R.value = `${_}: move mode off.`;
        return;
      }
      R.value = p ? `${_}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${_}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const He = (c) => o.value.get(c)?.title ?? c, er = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function tr(c, p, _ = !1) {
      if (!oe(c)) return;
      const S = d.value;
      if (!S) return;
      const A = He(c), I = bt(S, c);
      if (!_ && I && (p === "left" || p === "right") && I.panels.length > 1) {
        const ie = I.panels.indexOf(c), _e = p === "left" ? ie - 1 : ie + 1;
        if (_e >= 0 && _e < I.panels.length) {
          Z(Bt(S, c, _e), { panel: c, target: c, edge: "center", index: _e }), R.value = `${A} moved ${p}, now tab ${_e + 1} of ${I.panels.length}.`, Cn(c);
          return;
        }
      }
      const ae = Za(c, p);
      if (!ae || ae.panel !== void 0 && !oe(ae.panel)) {
        R.value = `${A} cannot move ${p}.`;
        return;
      }
      const V = er[p];
      if (ae.space) {
        const ie = ae.space, _e = lt(S, ie), fe = Me(S, c)?.rect, ee = { ...pt, ...fe ? { w: fe.w, h: fe.h } : {} };
        Z(Ks(S, c, ie, ee), { panel: c, target: "", space: ie, edge: V }), R.value = `${A} moved ${p}, into ${_e ? Pt(_e) : "the space"}.`, Cn(c);
        return;
      }
      const X = ae.panel, J = I?.panels.length === 1 && bt(S, X)?.panels.length === 1;
      _ ? (Z(an(S, c, X, "center"), {
        panel: c,
        target: X,
        edge: "center"
      }), R.value = `${A} joined ${He(X)} as a tab.`) : J ? (Z(dn(S, c, X), { panel: c, target: X, edge: V }), R.value = `${A} moved ${p}, trading places with ${He(X)}.`) : (Z(an(S, c, X, V), { panel: c, target: X, edge: V }), R.value = `${A} moved ${p}, beside ${He(X)}.`), Cn(c);
    }
    function Cn(c) {
      Vt(() => {
        P(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function nr(c, p) {
      const _ = d.value;
      _ && (r.value = fn(_, c, p));
    }
    function Mn(c) {
      const p = d.value;
      if (!p) return;
      const _ = xt(p, c);
      _ !== p && (r.value = _, a("tab-select", { panel: c }));
    }
    function ys(c) {
      return o.value.get(c)?.closable ?? s.closable;
    }
    function sr(c) {
      ys(c) && a("panel-close", c);
    }
    const Sn = W(/* @__PURE__ */ new Map());
    let ar = 0;
    function rr(c, p) {
      const _ = ar += 1;
      return Sn.value.set(_, { panel: c, items: p }), () => {
        Sn.value.delete(_);
      };
    }
    function lr(c) {
      const p = [];
      for (const _ of Sn.value.values())
        _.panel() === c && p.push(..._.items());
      return p;
    }
    function ws(c) {
      const p = c.filter((_) => _.items.length > 0);
      return p.length < 2 ? p.flatMap((_) => _.items) : p.flatMap((_) => [
        { id: _.id, heading: !0, label: _.title },
        ..._.items
      ]);
    }
    const ks = (c) => c.title || "These tabs";
    function or(c, p) {
      const _ = p.id, S = bt(c, _), A = (S?.panels.length ?? 0) > 1, I = S?.fixedView === !0, de = (J) => ({
        action: () => {
          J !== c && (r.value = J);
        }
      }), ae = [], V = [], X = p.views ?? [];
      if (X.length > 1 && !I) {
        const J = L(_);
        ae.push({
          id: "view",
          label: "View",
          items: X.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === J,
            action: () => Y(_, ie.key)
          }))
        });
      }
      return A && !I && V.push(
        { id: "show-row", label: "Row", checked: !1, ...de(qs(c, _, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...de(qs(c, _, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...de(Pu(c, _))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...de(Au(c, _))
        }
      ), A && S && (V.length && V.push({ separator: !0 }), V.push(...bs(S, _))), { panel: ae, tabs: V, tabsTitle: S ? ks(S) : "" };
    }
    function bs(c, p) {
      const _ = _t(c), S = (A) => {
        const I = c.panels[(_ + A + c.panels.length) % c.panels.length];
        return (I === void 0 ? "" : Ae(I)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Mn(S(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Mn(S(-1)) }
      ];
    }
    function nn(c) {
      return c.title ? c.title : j(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : Pt(c);
    }
    function $s(c) {
      if (!c || te(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || We(c)) return null;
      const p = Xa(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function ir(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const _ = lt(p, c);
      if (!_ || j(_)) return [];
      if (_.fixedView) return [];
      const S = te(_) ? "desktop" : _.direction, A = (ee, Pe, st) => ({
        id: `show-${ee}`,
        label: Pe,
        checked: S === ee,
        action: () => {
          const it = d.value, ct = st();
          !it || ct === _ || (r.value = yn(be(ht(it, c, ct))));
        }
      }), I = () => {
        const ee = Wa(_, cr(_));
        if (j(ee) && ee.panels.length === 0) return _;
        const Pe = j(ee) && ee.panels.length === 1 ? ee.panels[0] : void 0;
        return Pe !== void 0 && ve(Pe) ? _ : ee;
      }, de = (ee) => () => te(_) ? ja(_, ee) : _.direction === ee ? _ : { ..._, direction: ee }, ae = c.slice(0, -1), V = c.length > 0 ? lt(p, ae) : null, X = V && j(V) && V.panels.length > 1 ? V : null, J = V && $s(V) === _ ? V : null, ie = $s(_), _e = _.title || "this space", fe = (ee, Pe, st, it, ct) => ({
        id: ee,
        label: ct,
        action: () => {
          const Fe = d.value;
          Fe && (r.value = yn(be(ht(Fe, Pe, Ru(st, it)))));
        }
      });
      return ws([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: _.title || "This space",
          items: [
            A("row", "Row", de("row")),
            A("column", "Column", de("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            A("tabs", "Tabs", () => I()),
            A("desktop", "Desktop", () => te(_) ? _ : Ha(_))
          ]
        },
        {
          id: "about-around",
          title: ie ? `Around ${nn(ie)}` : "",
          items: ie ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ie.title ? [] : [fe("merge-around-keep-this", c, _, "outer", `Keep ${_e}`)],
            ..._.title ? [] : [fe("merge-around-keep-that", c, _, "inner", `Keep ${nn(ie)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: J ? `Inside ${nn(J)}` : "",
          items: J ? [
            ..._.title ? [] : [fe("merge-inside-keep-that", ae, J, "outer", `Keep ${nn(J)}`)],
            ...J.title ? [] : [fe("merge-inside-keep-this", ae, J, "inner", `Keep ${_e}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: X ? ks(X) : "",
          items: X ? bs(X, Ae(_)) : []
        }
      ]);
    }
    function cr(c) {
      const p = m.value;
      return p && le(c, p) ? p : void 0;
    }
    function ur(c) {
      const p = d.value, _ = o.value.get(c);
      if (!p || !_) return [];
      const S = s.menu ? or(p, _) : null, A = lr(c);
      A.length && S?.panel.length && A.push({ separator: !0 }), S && A.push(...S.panel);
      const I = ws([
        { id: "about-panel", title: _.title, items: A },
        { id: "about-tabs", title: S?.tabsTitle ?? "", items: S?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(_, I) : I;
    }
    function dr(c, p) {
      return i[`${c}-${p}`] ?? i[c];
    }
    function xs(c, p, _, S) {
      return dr(c, p.id)?.({ panel: p, view: _, active: S });
    }
    Nu({
      panelFor: (c) => o.value.get(c) ?? null,
      viewFor: L,
      setView: Y,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: m,
      dragging: b,
      dropTarget: y,
      moving: x,
      framing: g,
      canMove: oe,
      focus(c) {
        m.value !== c && (m.value = c, a("panel-activate", c));
      },
      selectPanel: Mn,
      beginDrag: Be,
      toggleMoveMode: Ja,
      nudge: tr,
      setSizes: nr,
      frameOf: (c) => d.value ? Me(d.value, c) : null,
      beginFrameDrag: Ya,
      nudgeFrame: Qa,
      raise: gt,
      maximized: q,
      toggleMaximize: Rt,
      minimized: H,
      toggleMinimize: O,
      beginFrameDragAt: gs,
      raiseAt: ot,
      toggleMaximizeAt: Te,
      toggleMinimizeAt: F,
      menuFor: ur,
      spaceMenu: ir,
      registerMenu: rr,
      closable: ys,
      close: sr,
      renderContent: (c, p, _) => xs("panel", c, p, _),
      renderActions: (c, p, _) => xs("actions", c, p, _),
      layout: d
    });
    const fr = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), pr = () => {
      const c = b.value, p = $.value;
      return !c || !p ? null : gr(
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
      move(c, p, _, S) {
        const A = d.value;
        A && Z(an(A, c, p, _, S), {
          panel: c,
          target: p,
          edge: _,
          ...S === void 0 ? {} : { index: S }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (r.value = xt(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, _) {
        const S = d.value;
        S && Z(Bs(S, c, p, _), {
          panel: c,
          target: p,
          edge: "float",
          rect: _
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, p) {
        const _ = d.value;
        if (!_) return;
        const S = wu(_, c, p);
        if (S === _) return;
        r.value = S;
        const A = Me(S, c);
        A && a("frame-change", { panel: c, rect: A.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: Y,
      /** Brings a floating frame to the front of its stack. */
      raise: gt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Rt,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: O
    }), (c, p) => (f(), h("div", {
      ref_key: "root",
      ref: B,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": b.value ? "true" : "false",
      "data-dc-docking": k.value ? "true" : "false",
      style: Re(fr.value)
    }, [
      d.value ? (f(), se(Pd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", Td, " This window has no panels. ")),
      he(pr),
      w("p", zd, z(R.value), 1)
    ], 12, Ad));
  }
}), Ld = /* @__PURE__ */ pe(Rd, [["__scopeId", "data-v-711565af"]]);
function tf(e = "", t = "/") {
  const n = W(Je(e)), s = W(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = Je(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = Je(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Us(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Je(s === -1 ? n : n.slice(0, s));
}
function nf(e) {
  const t = W(Us(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), s = ke(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Us(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${Je(a)}`),
    replace: (a) => e.replace(`${n.value}${Je(a)}`),
    dispose: s
  };
}
const Fd = {
  DataShell: qc,
  ShellHeader: wa,
  QueryPanel: ba,
  RecordActions: $a,
  ResultsArea: Ta,
  FacetControl: ka,
  SegmentedControl: eu,
  StatusPill: Xt,
  WindowFrame: Ld,
  WindowPane: Ga,
  ListView: Dn,
  CardsView: Ca,
  GridView: Ma,
  TableView: Pa,
  LinksView: Sa,
  PreviewView: Ea,
  TypeCardsView: Aa
}, sf = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Fd))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Gs, t.route);
  }
};
export {
  gn as CASCADE_STEP,
  Od as COLUMN_BREAKPOINTS,
  Id as COLUMN_ROLES,
  Ca as CardsView,
  Ns as ColumnCell,
  pt as DEFAULT_FRAME,
  Rn as DEFAULT_SORT,
  wr as DEFAULT_VIEW,
  qc as DataShell,
  Ln as EMPTY_CELL,
  ma as ENTITY_ALL,
  _n as ENTITY_TERM,
  Wt as EXPRESSION_TERM,
  ts as FACET_PREFIX,
  ka as FacetControl,
  Ma as GridView,
  sf as HeaderContentLayoutPlugin,
  Sa as LinksView,
  Dn as ListView,
  wt as MINIMIZED_GAP,
  La as MINIMIZED_HEIGHT,
  In as MINIMIZED_WIDTH,
  Ra as MIN_FRAME,
  Rs as MOCK_TINTS,
  Vd as MenuBar,
  rs as MenuButton,
  za as MenuList,
  Gt as MetricDrill,
  _s as PANE_CONTEXT_KEY,
  Zn as PARAM_DIR,
  Gn as PARAM_ENTITY,
  Jn as PARAM_EXPR,
  es as PARAM_PAGE,
  Qn as PARAM_SORT,
  Yn as PARAM_VIEW,
  ss as PinStar,
  Ea as PreviewView,
  Yt as QueryMark,
  ba as QueryPanel,
  sn as RECORD_STATUSES,
  aa as RESULT_FIELDS,
  Gs as ROUTE_ADAPTER_KEY,
  $a as RecordActions,
  Ta as ResultsArea,
  ha as SHELL_CONTEXT_KEY,
  Dd as SHELL_THEMES,
  Qt as ScopeMark,
  eu as SegmentedControl,
  Tt as SelectTick,
  qd as ShellCard,
  wa as ShellHeader,
  Xt as StatusPill,
  Pa as TableView,
  Aa as TypeCardsView,
  Ys as VIEW_KINDS,
  kr as VIEW_LABELS,
  hs as WINDOW_CONTEXT_KEY,
  Ld as WindowFrame,
  Ga as WindowPane,
  Na as activePanel,
  _t as activeTab,
  fa as addTerm,
  bn as andExpression,
  gu as axisOf,
  is as cascade,
  oa as cellFull,
  Ht as cellText,
  cn as cellTextOf,
  Ie as cellValue,
  Cs as changesResults,
  Tn as clampRect,
  Wa as collapseSpace,
  Pu as collapseToTabs,
  Ud as column,
  Ss as columnAlign,
  Es as columnClass,
  Ms as columnKey,
  Fn as columnTruncates,
  Sr as columnsFor,
  $r as countPages,
  yr as createHistoryAdapter,
  tf as createMemoryAdapter,
  Jr as createMockDataSource,
  nf as createVueRouterAdapter,
  Ar as defaultCellText,
  Ws as defaultLayout,
  jn as defaultQuery,
  sl as drillExpression,
  Ks as dropIntoSpace,
  Et as emptyFacetState,
  Un as emptyFacetValue,
  el as excludingTerm,
  kt as findEntity,
  rt as findSort,
  jd as fixedView,
  os as float,
  Bs as floatPanel,
  Ha as floatSplit,
  Au as floatTabs,
  on as fnv1a,
  Js as focusEntity,
  yt as formatCount,
  Cr as formatDate,
  ft as formatExpression,
  xr as formatMetric,
  Mr as formatOrdinal,
  jt as formatTerm,
  $n as frame,
  ut as frameAt,
  Me as frameOf,
  Kn as framePathOf,
  Ae as frontPanel,
  Yr as generateRows,
  Wd as group,
  bt as groupOf,
  yu as groups,
  sa as hasActiveFacets,
  le as hasPanel,
  Hd as headless,
  Nt as insertPanel,
  It as isChoosable,
  Bd as isEntityScoped,
  na as isFacetActive,
  te as isFloat,
  j as isGroup,
  at as isMaximized,
  dt as isMinimized,
  ve as isPanelTab,
  wn as isPristineQuery,
  zt as isSplit,
  De as isTabOf,
  Hn as isTypeCardsQuery,
  Qs as isViewKind,
  Ts as joinExpression,
  nl as liftTerm,
  Br as matchesExpression,
  Qr as matchesFacets,
  ku as maximizeFrame,
  $u as maximizeFrameAt,
  Ru as mergeSpace,
  bu as minimizeFrame,
  xu as minimizeFrameAt,
  an as movePanel,
  Bt as moveTab,
  Kd as negateTerm,
  lt as nodeAt,
  Kt as nodeTitle,
  be as normalizeLayout,
  Je as normalizeSearch,
  ps as normalizeSizes,
  Xa as onlySpace,
  mn as oppositeTerm,
  nt as panelIds,
  Ge as panelNode,
  Ds as panelTabs,
  Le as parseExpression,
  ul as parseQuery,
  zo as presentParts,
  xa as presentRow,
  Ye as pressOptions,
  ed as providePaneContext,
  al as provideShellContext,
  Nu as provideWindowContext,
  zn as raiseFrame,
  Ot as raiseFrameAt,
  Cu as raisedPath,
  ra as reconcileFacets,
  Fu as reconcileLayout,
  da as recordTerm,
  vt as removePanel,
  ht as replaceAt,
  Is as resizeRect,
  Vs as resizeSplit,
  Zs as resolveView,
  Ne as roleColumn,
  la as roleColumns,
  yn as rootSpace,
  us as row,
  Pr as rowKey,
  kn as sameTerm,
  ua as scopeTerm,
  Xn as scopeTermFor,
  va as scopedEntity,
  Fs as serializeQuery,
  xt as setActivePanel,
  wu as setFrameRect,
  Os as setFrameRectAt,
  fn as setSizesAt,
  Yd as setSplitDirection,
  et as sizesOf,
  ta as sortsFor,
  ye as spaceChrome,
  Pt as spaceTitle,
  cs as split,
  qr as splitExpression,
  qs as spreadTabs,
  fl as summarizeQuery,
  ns as summaryTerms,
  dn as swapPanels,
  ls as tabNode,
  Jt as tabPanels,
  tl as termStanding,
  ja as tileFloat,
  Qd as toFloat,
  Zd as toTiled,
  Xd as toggleMaximized,
  Gd as toggleMinimized,
  ji as useColumns,
  hl as useEntityCounts,
  cc as useEntityPreviews,
  Jd as usePaneContext,
  ef as usePaneMenu,
  At as usePresentedRows,
  pl as useQueryState,
  gl as useRecordNames,
  vl as useResults,
  $e as useShellContext,
  ms as useWindowContext,
  pa as withoutOwnScope,
  Kr as withoutTerm
};
