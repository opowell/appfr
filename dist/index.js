import { ref as q, inject as _t, provide as An, computed as g, toValue as Mt, shallowRef as Yt, watch as $e, onScopeDispose as zs, defineComponent as ue, onBeforeUnmount as He, openBlock as p, createElementBlock as _, createElementVNode as b, toDisplayString as z, createCommentVNode as O, unref as S, Fragment as Y, renderList as ie, renderSlot as qe, withDirectives as _n, withKeys as Qt, withModifiers as Be, vModelText as gn, normalizeClass as Zt, useSlots as zn, nextTick as zt, createBlock as ce, createVNode as pe, createTextVNode as Fe, withCtx as gt, normalizeStyle as ze, resolveDynamicComponent as Rs, useModel as Jt, useId as Ts, createSlots as us, mergeModels as en, onMounted as Xa, resolveComponent as Fs, getCurrentScope as Ga, h as Ya } from "vue";
const Ls = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Qa() {
  const e = typeof window < "u", t = q(e ? We(window.location.search) : ""), n = q(e ? window.location.pathname : "/"), s = () => {
    t.value = We(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, l) => {
    const i = We(r);
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
const Ds = ["list", "cards", "grid", "table", "links", "preview"], Ru = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], qt = ["ok", "running", "queued", "review", "failed"], Tu = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "tint"
], Fu = [480, 620, 760, 900, 1100], Za = "cards", yn = "updated";
function Ns(e) {
  return typeof e == "string" && Ds.includes(e);
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Is(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Os(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Vs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Os(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const Ja = { key: yn, label: yn };
function rt(e, t, n = null) {
  const s = Vs(e, n);
  return (t ? s.find((r) => r.key === t) : void 0) ?? s.find((r) => r.key === yn) ?? s[0] ?? Ja;
}
function Rn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function tn(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Rn(n);
  return t;
}
function Ks(e) {
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
function Bs(e) {
  return Object.values(e).some(Ks);
}
function Tn(e) {
  return e.entity === null && e.expr.trim() === "" && !Bs(e.facets);
}
function Lu(e) {
  return e.entity !== null;
}
function qs(e) {
  return e.entity === null && e.view === "cards";
}
function er(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Fn(e, t = {}) {
  const s = t.landing === "entity" ? Is(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Ns(t.view) ? t.view : Za,
    sort: rt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: tn(s),
    page: 1
  };
}
const Ws = ["entity", "sort", "dir", "expr", "facets"];
function ds(e) {
  return Ws.some((t) => t in e);
}
function Us(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Rn(s);
  }
  return n;
}
function Ht(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function tr(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function nr(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function sr(e) {
  return String(e + 1).padStart(2, "0");
}
const fs = "—";
function Ke(e, t) {
  return e.find((n) => n.role === t);
}
function Hs(e, t) {
  return e.filter((n) => n.role === t);
}
function ar(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const rr = ["id", "entityKey", "entityLabel"];
function Ae(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (rr.includes(n))
      return t[n];
  }
}
function ps(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function lr(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function or(e, t) {
  if (e == null || e === "") return fs;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? tr(n) : String(e);
  }
  return t === "date" ? nr(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : fs : String(e);
}
function Tt(e, t) {
  const n = Ae(e, t);
  return e.format ? e.format(n, t) : or(n, e.kind);
}
function ir(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function js(e, t) {
  const n = Tt(e, t), s = ir(Ae(e, t));
  return s && s !== n ? s : n;
}
function dn(e, t) {
  return e ? Tt(e, t) : "";
}
function vs(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const cr = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function ms(e) {
  return [cr[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function bn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const ur = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function dr(e) {
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
function Rt(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of dr(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const l = ur.exec(a);
    l && l[3] !== "" ? s.push({
      kind: "field",
      field: l[1].toLowerCase(),
      comparator: l[2],
      value: l[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const fn = (e) => e.toLowerCase().replace(/\s+/g, ""), fr = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function pr(e, t, n) {
  const s = fn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && fn(u.label) === s
  );
  if (r) return Ae(r, t);
  const l = n.facets.find((u) => fn(u.label) === s);
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = fr.find(([u]) => u === s)?.[1];
  if (i) {
    const u = Ke(a, i);
    if (u) return Ae(u, t);
  }
  const o = /^metric(\d+)$/.exec(s);
  if (o) {
    const u = Hs(a, "metric")[Number(o[1]) - 1];
    if (u) return Ae(u, t);
  }
}
function pn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function vr(e, t, n) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const o = Ke(l, i), u = o ? Ae(o, t) : void 0;
      return typeof u == "string" && pn(u, e.value);
    });
  }
  const s = pr(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((i) => pn(String(i), e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const l = e.value.toLowerCase();
      return l === "true" || l === "yes" ? s : l === "false" || l === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const l = Number(e.value);
      return Number.isFinite(l) ? s === l : !0;
    }
    return pn(String(s), e.value);
  }
  const a = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(r) ? !0 : mr(e.comparator, r, a);
}
function mr(e, t, n) {
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
function hr(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => vr(a, t, n))) : !0;
}
function hs(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Xs(e) {
  return e.kind === "text" ? hs(e.value) : `${e.field}${e.comparator}${hs(e.value)}`;
}
function _r(e) {
  return e.filter((t) => t.length).map((t) => t.map(Xs).join(" ")).join(" OR ");
}
function gr(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((r, l) => l !== n) : s).filter((s) => s.length);
}
const _s = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Gs(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const yr = 7, br = 3;
function wr(e, t, n, s) {
  const a = (t * yr + Ht(n)) % s, r = [];
  for (let l = 0; l < Math.min(br, s); l++)
    r.push(Gs(e, (a + l) % s));
  return r;
}
function kr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? $r(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function $r(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, l) => r - l).map((r) => e[r]);
}
function xr(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: r } = t, l = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${l}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return qt[n % qt.length];
    case "updated":
      return r;
    case "tint":
      return _s[n % _s.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return qt[n % qt.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Mr(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, l = t.scopes ?? [];
  if (!r.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const u = r[o % r.length], f = Math.floor(o / r.length), y = Ht(`${s}:${e.key}:${u[0]}:${o}`), k = Gs(e.key, o), m = new Date(a.getTime() - y % 900 * 36e5).toISOString(), $ = {};
    for (const x of e.columns ?? []) {
      const h = x.field ?? x.key;
      if (!h || x.value) continue;
      const w = xr(x, {
        hash: Ht(`${y}:${h}`),
        sample: u,
        revision: f,
        updatedAt: m
      });
      w !== void 0 && ($[h] = w);
    }
    for (const x of e.facets)
      $[x.key] = kr(x, Ht(`${y}:${x.key}`));
    for (const [x, h] of l)
      $[x] = h === e.key ? k : wr(h, o, x, n);
    i.push({ id: k, entityKey: e.key, entityLabel: e.label, fields: $ });
  }
  return i;
}
function Cr(e, t) {
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
function Sr(e, t) {
  const n = e.find((l) => l.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", r = s === "date" || n.role === "updated";
  return (l, i) => {
    const o = Ae(n, l), u = Ae(n, i);
    return a ? Number(u ?? 0) - Number(o ?? 0) : r ? Date.parse(String(u ?? "")) - Date.parse(String(o ?? "")) : String(u ?? "").localeCompare(String(o ?? ""));
  };
}
function Er(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const r = t.get(s.key);
    if (r) return r;
    const l = e.scopes ?? a.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = Mr(s, { ...e, scopes: l });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: l, offset: i }) {
      const o = Rt(s.expr), u = r ? [r] : a.entities, f = [], y = [];
      for (const $ of u)
        for (const x of n($, a))
          f.push(x), (r ? Cr(x, s.facets) : !0) && hr(o, x, $) && y.push(x);
      const k = rt(r, s.sort, a), m = y.sort(Sr(Os(r, a), k.key));
      return s.dir === "asc" && m.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: m.slice(i, i + l),
        total: y.length,
        unfiltered: y.length === f.length
      };
    }
  };
}
function Pr(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.id.replace(/"/g, "")}"` : null;
}
function Ar(e, t) {
  return Pr(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
const gs = (e, t) => e.toLowerCase() === t.toLowerCase();
function zr(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && gs(e.value, t.value) : t.kind === "text" && gs(e.value, t.value);
}
function Rr(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = Rt(t).flat();
  return s ? Rt(n).some(
    (r) => r.some((l) => zr(l, s))
  ) ? n : `${n} ${t}` : n;
}
function Tr(e, t, n) {
  return Rr(t.expr, Ar(e, n));
}
const Ys = Symbol("dc.shellContext");
function Fr(e) {
  return An(Ys, e), e;
}
function ye() {
  const e = _t(Ys, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Ln = "e", Dn = "v", Nn = "s", In = "d", On = "q", Vn = "p", Kn = "f_", Qs = "*", Lr = [
  Ln,
  Dn,
  Nn,
  In,
  On,
  Vn
], wn = "..", Zs = ",", Dr = [
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
function vn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Dr) t = t.replace(n, s);
  return t;
}
function Ve(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Js(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), l = a === -1 ? "" : s.slice(a + 1);
    n.push([Ve(r), l]);
  }
  return n;
}
function Nr(e) {
  return Lr.includes(e) || e.startsWith(Kn);
}
function ys(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Ir(e, t) {
  const n = Ve(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(Zs).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(wn), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + wn.length)).trim(), l = a === "" ? null : Number(a), i = r === "" ? null : Number(r);
      let o = l !== null && Number.isFinite(l) ? ys(l, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? ys(i, e.min, e.max) : null;
      return o !== null && u !== null && o > u && ([o, u] = [u, o]), { kind: "range", min: o, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Or(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(Zs) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${wn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Vr(e, t, n = {}) {
  const s = Fn(t, n), a = new Map(Js(e)), r = a.get(Ln), l = r === void 0 ? s.entity : Ve(r), i = l === Qs ? null : ft(t, l), o = a.get(Dn), u = o && Ns(Ve(o)) ? Ve(o) : s.view, f = a.get(Nn), y = rt(i, f ? Ve(f) : n.sort, t), k = a.get(In), m = k ? Ve(k) === "asc" ? "asc" : "desc" : s.dir, $ = a.get(On), x = a.get(Vn), h = x === void 0 ? 1 : Number(Ve(x)), w = Number.isFinite(h) ? Math.max(1, Math.floor(h)) : 1, E = {};
  for (const N of i?.facets ?? []) {
    const T = a.get(`${Kn}${N.key}`);
    E[N.key] = T === void 0 ? Rn(N) : Ir(N, T);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: y.key,
    dir: m,
    expr: $ === void 0 ? "" : Ve($),
    facets: Us(i, E),
    page: w
  };
}
function bs(e, t, n = {}, s = "") {
  const a = Fn(t, n), r = ft(t, e.entity), l = Js(s).filter(([y]) => !Nr(y)), i = [], o = (y, k) => i.push([y, vn(k)]), u = r?.key ?? null;
  u !== a.entity && o(Ln, u ?? Qs), e.view !== a.view && o(Dn, e.view), e.sort !== a.sort && o(Nn, e.sort), e.dir !== a.dir && o(In, e.dir), e.expr.trim() !== "" && o(On, e.expr);
  for (const y of r?.facets ?? []) {
    const k = e.facets[y.key];
    if (!k) continue;
    const m = Or(k, y);
    m !== null && i.push([`${Kn}${y.key}`, vn(m)]);
  }
  e.page > 1 && o(Vn, String(e.page));
  const f = [
    ...l.map(([y, k]) => [vn(y), k]),
    ...i
  ];
  return f.length ? `?${f.map(([y, k]) => k === "" ? y : `${y}=${k}`).join("&")}` : "";
}
const kn = "entity", nn = "expr";
function Kr(e, t) {
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
      const s = t.min ?? "", a = t.max ?? "";
      return [{ id: e.key, label: `${n}:${s}..${a}`, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function ea(e, t) {
  const n = [];
  t && n.push({
    id: kn,
    label: `entity:${t.key}`,
    facetKey: kn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Ks(a) && n.push(...Kr(s, a));
  }
  return Rt(e.expr).forEach((s, a) => {
    s.forEach((r, l) => {
      n.push({
        id: `${nn}:${a}:${l}`,
        label: Xs(r),
        facetKey: nn,
        group: a,
        index: l
      });
    });
  }), n;
}
function Br(e, t, n = null) {
  if (Tn(e)) {
    const r = rt(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const s = ea(e, t).filter((r) => r.facetKey !== nn).map((r) => r.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function qr(e) {
  const { adapter: t } = e, n = g(() => Mt(e.schema)), s = g(() => Mt(e.defaults) ?? {}), a = g(() => Vr(t.search.value, n.value, s.value)), r = g(() => ft(n.value, a.value.entity)), l = g(() => r.value ?? Is(n.value, s.value)), i = g(() => Vs(r.value, n.value)), o = g(() => rt(r.value, a.value.sort, n.value)), u = (h, w) => {
    const E = bs(h, n.value, s.value, t.search.value);
    E !== t.search.value && (w === "push" ? t.push(E) : t.replace(E));
  }, f = () => Mt(e.navigationMode) ?? "push", y = () => Mt(e.facetNavigationMode) ?? "replace", k = (h, w) => {
    const E = h.page ?? (ds(h) ? 1 : a.value.page);
    u({ ...a.value, ...h, page: E }, w);
  }, m = (h, w) => {
    const E = a.value.facets[h];
    if (!E) return;
    const N = { ...a.value.facets, [h]: w(E) };
    k({ facets: N }, y());
  }, $ = (h) => {
    const w = h === null ? null : ft(n.value, h);
    return (w?.key ?? null) === a.value.entity ? {} : {
      entity: w?.key ?? null,
      sort: rt(w, a.value.sort, n.value).key,
      facets: tn(w)
    };
  }, x = (h) => {
    const w = $(h);
    Object.keys(w).length && k(w, f());
  };
  return {
    query: a,
    entity: r,
    focus: l,
    sort: o,
    sorts: i,
    summary: g(() => Br(a.value, r.value, n.value)),
    terms: g(() => ea(a.value, r.value)),
    isPristine: g(() => Tn(a.value)),
    isEverything: g(() => a.value.entity === null),
    hasFacets: g(() => Bs(a.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(h) {
      k({ view: h }, f());
    },
    setSort(h) {
      k({ sort: rt(r.value, h, n.value).key }, f());
    },
    toggleDirection() {
      k({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression(h) {
      k({ expr: h }, f());
    },
    narrow(h, w) {
      k({ expr: h, ...$(w) }, f());
    },
    setPage(h, w) {
      k({ page: Math.max(1, Math.floor(h)) }, w ?? f());
    },
    setFacet(h, w) {
      m(h, () => w);
    },
    toggleChip(h, w) {
      m(h, (E) => E.kind !== "chips" ? E : { kind: "chips", selected: E.selected.includes(w) ? E.selected.filter((T) => T !== w) : [...E.selected, w] });
    },
    setRange(h, w, E) {
      m(h, (N) => N.kind === "range" ? { kind: "range", min: w, max: E } : N);
    },
    toggleFlag(h) {
      m(
        h,
        (w) => w.kind === "toggle" ? { kind: "toggle", on: !w.on } : w
      );
    },
    removeTerm(h) {
      if (h.facetKey === kn) {
        x(null);
        return;
      }
      if (h.facetKey === nn) {
        const w = gr(Rt(a.value.expr), h.group ?? 0, h.index ?? 0);
        k({ expr: _r(w) }, f());
        return;
      }
      m(h.facetKey, (w) => w.kind === "chips" && h.option ? { kind: "chips", selected: w.selected.filter((E) => E !== h.option) } : w.kind === "range" ? { kind: "range", min: null, max: null } : w.kind === "toggle" ? { kind: "toggle", on: !1 } : w);
    },
    clearFilters() {
      k({ entity: null, expr: "", facets: tn(null) }, f());
    },
    reset() {
      u(Fn(n.value, s.value), f());
    },
    hrefFor(h) {
      const w = { ...a.value, ...h };
      return w.page = h.page ?? (ds(h) ? 1 : a.value.page), w.facets = Us(ft(n.value, w.entity), w.facets), `${t.path.value}${bs(w, n.value, s.value, t.search.value)}`;
    }
  };
}
function Wr(e) {
  const t = Yt([]), n = q(0), s = q(!1), a = Yt(null);
  let r = 0, l = null;
  const i = g(() => (e.query.value.page - 1) * e.limit.value), o = g(() => er(n.value, e.limit.value)), u = (x) => {
    t.value = x.rows, n.value = x.total, a.value = null;
  }, f = (x) => {
    a.value = x, t.value = [], n.value = 0;
  }, y = (x, h) => {
    let w = !0;
    const E = () => x === r, N = () => {
      w && (w = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return E();
      },
      insert(T, F) {
        if (!E()) return;
        const V = Array.isArray(T) ? T : [T];
        if (!V.length) return;
        N();
        const M = [...t.value];
        M.splice(F ?? M.length, 0, ...V), t.value = h > 0 ? M.slice(0, h) : M, n.value += V.length;
      },
      set(T) {
        E() && (T.rows && (N(), t.value = h > 0 ? T.rows.slice(0, h) : T.rows, n.value = T.rows.length), T.total !== void 0 && (n.value = T.total));
      },
      close() {
        E() && (s.value = !1);
      },
      fail(T) {
        E() && (f(T), s.value = !1);
      }
    };
  }, k = () => {
    const x = l;
    l = null, x?.();
  }, m = () => {
    const x = ++r;
    k();
    const h = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, w = e.source.value;
    if (w.stream) {
      s.value = !0;
      try {
        l = w.stream(h, y(x, h.limit)) ?? null;
      } catch (N) {
        f(N), s.value = !1;
      }
      return;
    }
    let E;
    try {
      E = w.query(h);
    } catch (N) {
      f(N);
      return;
    }
    if (!(E instanceof Promise)) {
      u(E), s.value = !1;
      return;
    }
    s.value = !0, E.then((N) => {
      x === r && u(N);
    }).catch((N) => {
      x === r && f(N);
    }).finally(() => {
      x === r && (s.value = !1);
    });
  }, $ = g(
    () => `${JSON.stringify(Ws.map((x) => e.query.value[x]))}|${e.query.value.page}`
  );
  return $e([e.source, $, e.schema, e.entity, e.limit], m, {
    immediate: !0
  }), zs(() => {
    r++, k();
  }, !0), { rows: t, total: n, offset: i, pageCount: o, pending: s, error: a, refresh: m };
}
const Ur = ["data-dc-expanded"], Hr = ["aria-expanded", "aria-controls"], jr = { class: "dc-header__domain" }, Xr = { class: "dc-header__crumb" }, Gr = { class: "dc-header__crumb-root" }, Yr = {
  key: 0,
  class: "dc-header__count dc-mono"
}, Qr = {
  key: 0,
  class: "dc-header__query"
}, Zr = ["data-dc-active", "title"], Jr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, el = { class: "dc-header__sr" }, tl = ["data-dc-more"], nl = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, sl = ["title", "aria-label", "onClick"], al = {
  key: 1,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, rl = ["disabled"], ll = ["title"], ol = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, il = ["disabled"], cl = {
  key: 2,
  class: "dc-header__actions"
}, ul = /* @__PURE__ */ ue({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ye(), r = g(() => a.schema.value), l = g(() => a.entity.value?.label ?? "Everything"), i = g(() => {
      if (n.hideCount) return "";
      const h = a.entity.value;
      return h && !a.hasFacets.value && !a.query.value.expr.trim() ? h.count : String(a.total.value);
    }), o = g(
      () => a.terms.value.map((h, w, E) => {
        const N = E[w - 1];
        return {
          term: h,
          or: N?.group !== void 0 && h.group !== void 0 && h.group !== N.group
        };
      })
    ), u = q(null), f = q("");
    function y() {
      const h = u.value;
      if (!h) {
        f.value = "";
        return;
      }
      const w = h.scrollLeft > 1, E = h.scrollWidth - h.clientWidth - h.scrollLeft > 1;
      f.value = w && E ? "both" : w ? "start" : E ? "end" : "";
    }
    let k = null;
    $e(
      u,
      (h) => {
        k?.disconnect(), k = null, y(), !(!h || typeof ResizeObserver > "u") && (k = new ResizeObserver(y), k.observe(h));
      },
      { flush: "post" }
    ), $e(o, y, { flush: "post" }), He(() => k?.disconnect());
    const m = g(() => a.query.value.page), $ = g(
      () => a.pageCount.value > 1 && !qs(a.query.value)
    ), x = g(() => {
      const h = `Page ${m.value} of ${a.pageCount.value}`, w = a.rows.value.length;
      if (!w) return h;
      const E = a.offset.value + 1;
      return `${h} — rows ${E} to ${E + w - 1} of ${a.total.value}`;
    });
    return (h, w) => (p(), _("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      b("button", {
        type: "button",
        class: "dc-header__trigger",
        "aria-expanded": e.expanded,
        "aria-controls": e.panelId,
        onClick: w[0] || (w[0] = (E) => s("toggle"))
      }, [
        w[4] || (w[4] = b("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        b("span", jr, z(r.value.label), 1),
        b("span", Xr, [
          b("span", Gr, z(l.value), 1),
          i.value ? (p(), _("span", Yr, z(i.value), 1)) : O("", !0)
        ]),
        o.value.length ? O("", !0) : (p(), _("span", Qr, [
          w[3] || (w[3] = b("span", { class: "dc-header__query-label" }, "Query", -1)),
          b("span", {
            class: "dc-header__summary dc-mono dc-truncate",
            "data-dc-active": S(a).isPristine.value ? "false" : "true",
            title: S(a).summary.value
          }, z(S(a).summary.value), 9, Zr)
        ])),
        b("span", Jr, z(e.expanded ? "▲" : "▼"), 1),
        b("span", el, z(e.expanded ? "Hide query panel" : "Edit query"), 1)
      ], 8, Hr),
      o.value.length ? (p(), _("div", {
        key: 0,
        ref_key: "termBar",
        ref: u,
        class: "dc-header__query dc-header__terms",
        "data-dc-more": f.value,
        onScroll: y
      }, [
        w[5] || (w[5] = b("span", { class: "dc-header__query-label" }, "Query", -1)),
        (p(!0), _(Y, null, ie(o.value, (E) => (p(), _(Y, {
          key: E.term.id
        }, [
          E.or ? (p(), _("span", nl, "or")) : O("", !0),
          b("button", {
            type: "button",
            class: "dc-term dc-mono",
            title: `Remove ${E.term.label}`,
            "aria-label": `Remove ${E.term.label}`,
            onClick: (N) => S(a).removeTerm(E.term)
          }, z(E.term.label), 9, sl)
        ], 64))), 128))
      ], 40, tl)) : O("", !0),
      $.value ? (p(), _("nav", al, [
        b("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: m.value <= 1,
          onClick: w[1] || (w[1] = (E) => S(a).setPage(m.value - 1))
        }, [...w[6] || (w[6] = [
          b("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, rl),
        b("span", {
          class: "dc-header__page dc-mono",
          title: x.value,
          "aria-hidden": "true"
        }, z(m.value) + " / " + z(S(a).pageCount.value), 9, ll),
        b("span", ol, z(x.value), 1),
        b("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: m.value >= S(a).pageCount.value,
          onClick: w[2] || (w[2] = (E) => S(a).setPage(m.value + 1))
        }, [...w[7] || (w[7] = [
          b("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, il)
      ])) : O("", !0),
      h.$slots.actions ? (p(), _("div", cl, [
        qe(h.$slots, "actions", {}, void 0, !0)
      ])) : O("", !0)
    ], 8, Ur));
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ta = /* @__PURE__ */ de(ul, [["__scopeId", "data-v-d377c169"]]), dl = { class: "dc-facet" }, fl = { class: "dc-facet__head" }, pl = ["id"], vl = { class: "dc-facet__hint dc-mono" }, ml = ["aria-labelledby"], hl = ["aria-pressed", "data-dc-active", "onClick"], _l = ["aria-labelledby"], gl = ["aria-label", "placeholder", "onKeydown"], yl = ["aria-label", "placeholder", "onKeydown"], bl = ["aria-checked"], wl = { class: "dc-switch__text" }, kl = ["data-dc-active"], $l = /* @__PURE__ */ ue({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = g(() => {
      const { facet: k, value: m } = n;
      return k.kind === "chips" && m.kind === "chips" ? m.selected.length ? `${m.selected.length} of ${k.options.length}` : "any" : k.kind === "range" && m.kind === "range" ? m.min === null && m.max === null ? `${k.min}–${k.max}` : `${m.min ?? k.min}–${m.max ?? k.max}` : m.kind === "toggle" ? m.on ? "on" : "off" : "";
    }), r = g(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function l(k) {
      if (n.value.kind !== "chips") return;
      const m = r.value.has(k) ? n.value.selected.filter(($) => $ !== k) : [...n.value.selected, k];
      s("update", { kind: "chips", selected: m });
    }
    const i = q(""), o = q("");
    $e(
      () => n.value,
      (k) => {
        k.kind === "range" && (i.value = k.min === null ? "" : k.min, o.value = k.max === null ? "" : k.max);
      },
      { immediate: !0, deep: !0 }
    );
    function u(k) {
      if (typeof k == "number") return Number.isFinite(k) ? k : null;
      const m = k.trim();
      if (!m) return null;
      const $ = Number(m);
      return Number.isFinite($) ? $ : null;
    }
    function f() {
      if (n.value.kind !== "range") return;
      const k = u(i.value), m = u(o.value);
      k === n.value.min && m === n.value.max || s("update", { kind: "range", min: k, max: m });
    }
    function y() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (k, m) => (p(), _("div", dl, [
      b("div", fl, [
        b("span", {
          id: `dc-facet-${e.facet.key}`,
          class: "dc-facet__label"
        }, z(e.facet.label), 9, pl),
        b("span", vl, z(a.value), 1)
      ]),
      e.facet.kind === "chips" && e.value.kind === "chips" ? (p(), _("div", {
        key: 0,
        class: "dc-facet__chips",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        (p(!0), _(Y, null, ie(e.facet.options, ($) => (p(), _("button", {
          key: $,
          type: "button",
          class: "dc-chip",
          "aria-pressed": r.value.has($),
          "data-dc-active": r.value.has($) ? "true" : "false",
          onClick: (x) => l($)
        }, z($), 9, hl))), 128))
      ], 8, ml)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), _("div", {
        key: 1,
        class: "dc-facet__range",
        role: "group",
        "aria-labelledby": `dc-facet-${e.facet.key}`
      }, [
        _n(b("input", {
          "onUpdate:modelValue": m[0] || (m[0] = ($) => i.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} minimum`,
          placeholder: String(e.facet.min),
          onChange: f,
          onBlur: f,
          onKeydown: Qt(Be(f, ["prevent"]), ["enter"])
        }, null, 40, gl), [
          [gn, i.value]
        ]),
        m[2] || (m[2] = b("span", {
          class: "dc-facet__dash",
          "aria-hidden": "true"
        }, "–", -1)),
        _n(b("input", {
          "onUpdate:modelValue": m[1] || (m[1] = ($) => o.value = $),
          class: "dc-input dc-mono",
          type: "number",
          inputmode: "numeric",
          "aria-label": `${e.facet.label} maximum`,
          placeholder: String(e.facet.max),
          onChange: f,
          onBlur: f,
          onKeydown: Qt(Be(f, ["prevent"]), ["enter"])
        }, null, 40, yl), [
          [gn, o.value]
        ])
      ], 8, _l)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), _("button", {
        key: 2,
        type: "button",
        class: "dc-switch",
        role: "switch",
        "aria-checked": e.value.on,
        onClick: y
      }, [
        b("span", wl, z(e.facet.text), 1),
        b("span", {
          class: "dc-switch__track",
          "data-dc-active": e.value.on ? "true" : "false",
          "aria-hidden": "true"
        }, [...m[3] || (m[3] = [
          b("span", { class: "dc-switch__knob" }, null, -1)
        ])], 8, kl)
      ], 8, bl)) : O("", !0)
    ]));
  }
}), na = /* @__PURE__ */ de($l, [["__scopeId", "data-v-c2efbd0c"]]), xl = ["aria-label"], Ml = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Cl = /* @__PURE__ */ ue({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = q([]);
    function r(l, i) {
      const o = n.options.length;
      let u = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? u = (i + 1) % o : l.key === "ArrowLeft" || l.key === "ArrowUp" ? u = (i - 1 + o) % o : l.key === "Home" ? u = 0 : l.key === "End" && (u = o - 1), u === null) return;
      l.preventDefault();
      const f = n.options[u];
      f && (s("update:modelValue", f.key), a.value[u]?.focus());
    }
    return (l, i) => (p(), _("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (p(!0), _(Y, null, ie(e.options, (o, u) => (p(), _("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: Zt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (f) => s("update:modelValue", o.key),
        onKeydown: (f) => r(f, u)
      }, z(o.label), 43, Ml))), 128))
    ], 8, xl));
  }
}), $n = /* @__PURE__ */ de(Cl, [["__scopeId", "data-v-63fb5482"]]), Sl = ["id"], El = { class: "dc-panel__section" }, Pl = { class: "dc-panel__query" }, Al = { class: "dc-panel__expression" }, zl = ["for"], Rl = ["id", "placeholder", "onKeydown"], Tl = {
  key: 0,
  class: "dc-panel__facets"
}, Fl = {
  key: 1,
  class: "dc-panel__hint"
}, Ll = { class: "dc-panel__scope" }, Dl = ["id"], Nl = ["aria-labelledby"], Il = ["data-dc-active", "aria-current"], Ol = { class: "dc-entity__count dc-mono" }, Vl = ["data-dc-active", "aria-current", "onClick"], Kl = { class: "dc-entity__label" }, Bl = { class: "dc-entity__count dc-mono" }, ql = { class: "dc-panel__actions" }, Wl = ["disabled"], Ul = { class: "dc-panel__section dc-panel__section--row" }, Hl = { class: "dc-panel__control" }, jl = { class: "dc-panel__control" }, Xl = ["title", "aria-label"], Gl = {
  key: 0,
  class: "dc-panel__section"
}, Yl = /* @__PURE__ */ ue({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = zn(), r = ye(), l = {
      list: "List",
      cards: "Cards",
      grid: "Grid",
      table: "Table",
      links: "Links",
      preview: "Preview"
    }, i = g(
      () => (n.views ?? [...Ds]).map((x) => ({ key: x, label: l[x] }))
    ), o = g(
      () => r.sorts.value.map((x) => ({ key: x.key, label: x.label }))
    ), u = q(r.query.value.expr), f = q(null);
    $e(
      () => r.query.value.expr,
      (x) => {
        u.value = x;
      }
    );
    const y = g(() => u.value !== r.query.value.expr);
    function k() {
      r.setExpression(u.value), s("close");
    }
    function m() {
      u.value = "", r.clearFilters();
    }
    function $(x, h) {
      r.setFacet(x, h);
    }
    return zt(() => f.value?.focus()), (x, h) => (p(), _("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: h[5] || (h[5] = Qt(Be((w) => s("close"), ["stop"]), ["esc"]))
    }, [
      b("section", El, [
        b("div", Pl, [
          b("div", Al, [
            b("label", {
              class: "dc-panel__field-label",
              for: `${e.panelId}-expr`
            }, "Expression", 8, zl),
            _n(b("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: f,
              "onUpdate:modelValue": h[0] || (h[0] = (w) => u.value = w),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: S(r).schema.value.placeholder,
              onKeydown: Qt(Be(k, ["prevent"]), ["enter"])
            }, null, 40, Rl), [
              [gn, u.value]
            ])
          ]),
          S(r).entity.value ? (p(), _("div", Tl, [
            (p(!0), _(Y, null, ie(S(r).entity.value.facets, (w) => (p(), ce(na, {
              key: w.key,
              facet: w,
              value: S(r).query.value.facets[w.key],
              onUpdate: (E) => $(w.key, E)
            }, null, 8, ["facet", "value", "onUpdate"]))), 128))
          ])) : (p(), _("p", Fl, " Results span every entity — logs and settings included. Pick one below to narrow to it and to get its own filters. "))
        ]),
        b("div", Ll, [
          b("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, Dl),
          b("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            b("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": S(r).isEverything.value ? "true" : "false",
              "aria-current": S(r).isEverything.value ? "true" : void 0,
              onClick: h[1] || (h[1] = (w) => S(r).clearEntity())
            }, [
              h[6] || (h[6] = b("span", { class: "dc-entity__label" }, "Everything", -1)),
              b("span", Ol, z(S(r).entities.value.length) + " kinds", 1)
            ], 8, Il),
            (p(!0), _(Y, null, ie(S(r).entities.value, (w) => (p(), _("button", {
              key: w.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": w.key === S(r).entity.value?.key ? "true" : "false",
              "aria-current": w.key === S(r).entity.value?.key ? "true" : void 0,
              onClick: (E) => S(r).setEntity(w.key)
            }, [
              b("span", Kl, z(w.label), 1),
              b("span", Bl, z(w.count), 1)
            ], 8, Vl))), 128))
          ], 8, Nl)
        ]),
        b("div", ql, [
          b("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: k
          }, " Run query "),
          b("button", {
            type: "button",
            class: "dc-button",
            disabled: S(r).isPristine.value && !y.value,
            onClick: m
          }, " Reset ", 8, Wl)
        ])
      ]),
      b("section", Ul, [
        b("div", Hl, [
          h[7] || (h[7] = b("span", { class: "dc-eyebrow" }, "View", -1)),
          pe($n, {
            label: "Result view",
            "model-value": S(r).query.value.view,
            options: i.value,
            "onUpdate:modelValue": h[2] || (h[2] = (w) => S(r).setView(w))
          }, null, 8, ["model-value", "options"])
        ]),
        b("div", jl, [
          h[8] || (h[8] = b("span", { class: "dc-eyebrow" }, "Sort", -1)),
          pe($n, {
            mono: "",
            label: "Sort field",
            "model-value": S(r).query.value.sort,
            options: o.value,
            "onUpdate:modelValue": h[3] || (h[3] = (w) => S(r).setSort(w))
          }, null, 8, ["model-value", "options"]),
          b("button", {
            type: "button",
            class: "dc-button dc-button--icon dc-mono",
            title: S(r).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
            "aria-label": `Sort direction: ${S(r).query.value.dir === "desc" ? "descending" : "ascending"}`,
            onClick: h[4] || (h[4] = (w) => S(r).toggleDirection())
          }, z(S(r).query.value.dir === "desc" ? "↓" : "↑"), 9, Xl)
        ])
      ]),
      a["panel-section"] ? (p(), _("section", Gl, [
        qe(x.$slots, "panel-section", {}, void 0, !0)
      ])) : O("", !0)
    ], 40, Sl));
  }
}), sa = /* @__PURE__ */ de(Yl, [["__scopeId", "data-v-d8a6ac01"]]);
function Ql(e, t) {
  const n = Ke(t, "state"), s = Ke(t, "tint");
  return {
    identity: dn(Ke(t, "identity"), e),
    reference: dn(Ke(t, "reference"), e),
    metrics: Hs(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Tt(a, e)
    })),
    state: n ? Ae(n, e) ?? null : null,
    updated: dn(Ke(t, "updated"), e),
    tint: s ? Ae(s, e) ?? null : null
  };
}
function aa(e, t, n, s) {
  const a = n?.columns ?? [];
  return {
    row: e,
    key: lr(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: a,
    ordinal: sr(t),
    parts: Ql(e, a),
    pinned: s
  };
}
function bt() {
  const e = ye(), t = g(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return g(
    () => e.rows.value.map(
      (n, s) => aa(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n)
      )
    )
  );
}
const Zl = ["data-dc-status"], Jl = /* @__PURE__ */ ue({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (p(), _("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, z(e.status), 9, Zl));
  }
}), Ft = /* @__PURE__ */ de(Jl, [["__scopeId", "data-v-23e59fbf"]]), eo = ["title"], to = { key: 1 }, no = /* @__PURE__ */ ue({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ye(), s = g(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((o) => o.key === t.column.drill) ?? null), a = g(() => t.column.label ?? ""), r = g(() => Tt(t.column, t.entry.row));
    function l(i) {
      i.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (i, o) => s.value ? (p(), _("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: l
    }, [
      qe(i.$slots, "default", {}, () => [
        Fe(z(r.value), 1)
      ], !0)
    ], 8, eo)) : (p(), _("span", to, [
      qe(i.$slots, "default", {}, () => [
        Fe(z(r.value), 1)
      ], !0)
    ]));
  }
}), Lt = /* @__PURE__ */ de(no, [["__scopeId", "data-v-3bd0cbdb"]]), so = ["data-dc-active", "aria-pressed", "aria-label"], ao = /* @__PURE__ */ ue({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ye();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, r) => (p(), _("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, z(e.pinned ? "★" : "☆"), 9, so));
  }
}), Bn = /* @__PURE__ */ de(ao, [["__scopeId", "data-v-ef63d763"]]), ro = ["title", "aria-label"], lo = /* @__PURE__ */ ue({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = g(() => t.entry.entity?.scope ?? null);
    function a(r) {
      r.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (r, l) => s.value ? (p(), _("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, ro)) : O("", !0);
  }
}), Dt = /* @__PURE__ */ de(lo, [["__scopeId", "data-v-1d9b1a9f"]]), oo = { class: "dc-cards" }, io = { class: "dc-card__top dc-mono" }, co = {
  key: 0,
  class: "dc-card__entity"
}, uo = { class: "dc-card__top-right" }, fo = ["onClick"], po = { class: "dc-card__primary" }, vo = { class: "dc-card__secondary dc-mono" }, mo = { class: "dc-card__metrics dc-mono" }, ho = {
  key: 0,
  class: "dc-card__date"
}, _o = /* @__PURE__ */ ue({
  __name: "CardsView",
  setup(e) {
    const t = ye(), n = bt(), s = g(() => t.isEverything.value);
    return (a, r) => (p(), _("div", oo, [
      (p(!0), _(Y, null, ie(S(n), (l) => (p(), _("div", {
        key: l.key,
        class: "dc-card"
      }, [
        b("div", io, [
          b("span", null, [
            Fe(z(l.ordinal) + " ", 1),
            s.value ? (p(), _("span", co, z(l.entityLabel), 1)) : O("", !0)
          ]),
          b("span", uo, [
            l.parts.state ? (p(), ce(Ft, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : O("", !0),
            pe(Dt, { entry: l }, null, 8, ["entry"]),
            S(t).pinnable.value ? (p(), ce(Bn, {
              key: 1,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : O("", !0)
          ])
        ]),
        b("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => S(t).activate(l.row)
        }, [
          b("span", po, z(l.parts.identity), 1),
          b("span", vo, z(l.parts.reference), 1)
        ], 8, fo),
        b("div", mo, [
          (p(!0), _(Y, null, ie(l.parts.metrics.slice(0, 2), (i) => (p(), ce(Lt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, {
            default: gt(() => [
              Fe(z(i.label) + " " + z(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (p(), _("span", ho, z(l.parts.updated), 1)) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ra = /* @__PURE__ */ de(_o, [["__scopeId", "data-v-b633cc4d"]]), go = { class: "dc-grid" }, yo = ["onClick"], bo = { class: "dc-tile__scrim" }, wo = { class: "dc-tile__top dc-mono" }, ko = { class: "dc-tile__chip" }, $o = { class: "dc-tile__caption" }, xo = { class: "dc-tile__secondary dc-truncate" }, Mo = { class: "dc-tile__primary" }, Co = /* @__PURE__ */ ue({
  __name: "GridView",
  setup(e) {
    const t = ye(), n = bt();
    return (s, a) => (p(), _("div", go, [
      (p(!0), _(Y, null, ie(S(n), (r) => (p(), _("button", {
        key: r.key,
        type: "button",
        class: "dc-tile",
        style: ze({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
        onClick: (l) => S(t).activate(r.row)
      }, [
        b("span", bo, [
          b("span", wo, [
            b("span", ko, z(r.ordinal), 1)
          ]),
          b("span", $o, [
            b("span", xo, z(r.parts.reference), 1),
            b("span", Mo, z(r.parts.identity), 1)
          ])
        ])
      ], 12, yo))), 128))
    ]));
  }
}), la = /* @__PURE__ */ de(Co, [["__scopeId", "data-v-ddbd0e17"]]), So = { class: "dc-links" }, Eo = ["onClick"], Po = { class: "dc-link__primary dc-truncate" }, Ao = { class: "dc-link__secondary dc-mono dc-truncate" }, zo = /* @__PURE__ */ ue({
  __name: "LinksView",
  setup(e) {
    const t = ye(), n = bt();
    return (s, a) => (p(), _("div", So, [
      (p(!0), _(Y, null, ie(S(n), (r) => (p(), _("button", {
        key: r.key,
        type: "button",
        class: "dc-link",
        onClick: (l) => S(t).activate(r.row)
      }, [
        b("span", Po, z(r.parts.identity), 1),
        b("span", Ao, z(r.parts.reference), 1)
      ], 8, Eo))), 128))
    ]));
  }
}), oa = /* @__PURE__ */ de(zo, [["__scopeId", "data-v-d94cadb6"]]), Ro = {
  class: "dc-list",
  role: "list"
}, To = ["onClick"], Fo = { class: "dc-list__ordinal dc-mono" }, Lo = { class: "dc-list__identity" }, Do = { class: "dc-list__primary dc-truncate" }, No = { class: "dc-list__secondary dc-mono dc-truncate" }, Io = {
  key: 0,
  class: "dc-list__entity dc-mono"
}, Oo = { class: "dc-list__metrics dc-mono" }, Vo = { class: "dc-list__trailing" }, Ko = /* @__PURE__ */ ue({
  __name: "ListView",
  setup(e) {
    const t = ye(), n = bt(), s = g(() => t.isEverything.value);
    return (a, r) => (p(), _("div", Ro, [
      (p(!0), _(Y, null, ie(S(n), (l) => (p(), _("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        b("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => S(t).activate(l.row)
        }, [
          b("span", Fo, z(l.ordinal), 1),
          b("span", Lo, [
            b("span", Do, z(l.parts.identity), 1),
            b("span", No, z(l.parts.reference), 1)
          ])
        ], 8, To),
        s.value ? (p(), _("span", Io, z(l.entityLabel), 1)) : O("", !0),
        b("span", Oo, [
          (p(!0), _(Y, null, ie(l.parts.metrics.slice(0, 2), (i) => (p(), ce(Lt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        b("span", Vo, [
          l.parts.state ? (p(), ce(Ft, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : O("", !0),
          pe(Dt, { entry: l }, null, 8, ["entry"]),
          S(t).pinnable.value ? (p(), ce(Bn, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), xn = /* @__PURE__ */ de(Ko, [["__scopeId", "data-v-7ef881bb"]]), Bo = { class: "dc-preview" }, qo = { class: "dc-preview__pager dc-mono" }, Wo = ["disabled"], Uo = { "aria-live": "polite" }, Ho = ["disabled"], jo = {
  key: 0,
  class: "dc-preview__card"
}, Xo = { class: "dc-preview__body" }, Go = { class: "dc-preview__top" }, Yo = { class: "dc-preview__badges" }, Qo = { class: "dc-preview__entity dc-mono" }, Zo = { class: "dc-preview__marks" }, Jo = { class: "dc-preview__primary" }, ei = { class: "dc-preview__secondary dc-mono" }, ti = { class: "dc-preview__fields" }, ni = { class: "dc-preview__key" }, si = { class: "dc-preview__value dc-mono" }, ai = /* @__PURE__ */ ue({
  __name: "PreviewView",
  setup(e) {
    const t = ye(), n = bt(), s = q(0);
    $e(n, (o) => {
      s.value > o.length - 1 && (s.value = Math.max(0, o.length - 1));
    });
    const a = g(() => n.value[s.value]), r = g(() => {
      const o = a.value;
      if (!o) return [];
      const u = Ke(o.columns, "reference"), f = Ke(o.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((y) => ({
          key: y.label,
          value: y.text,
          column: y.column
        })),
        ...f ? [{ key: f.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), l = g(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + o)));
    };
    return (o, u) => (p(), _("div", Bo, [
      b("div", qo, [
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => i(-1))
        }, " ‹ ", 8, Wo),
        b("span", Uo, z(l.value), 1),
        b("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= S(n).length - 1,
          onClick: u[1] || (u[1] = (f) => i(1))
        }, " › ", 8, Ho)
      ]),
      a.value ? (p(), _("div", jo, [
        b("div", {
          class: "dc-preview__media",
          style: ze({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        b("div", Xo, [
          b("div", Go, [
            b("span", Yo, [
              a.value.parts.state ? (p(), ce(Ft, {
                key: 0,
                status: a.value.parts.state
              }, null, 8, ["status"])) : O("", !0),
              b("span", Qo, z(a.value.entityLabel), 1)
            ]),
            b("span", Zo, [
              pe(Dt, { entry: a.value }, null, 8, ["entry"]),
              S(t).pinnable.value ? (p(), ce(Bn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : O("", !0)
            ])
          ]),
          b("div", null, [
            b("div", Jo, z(a.value.parts.identity), 1),
            b("div", ei, z(a.value.parts.reference), 1)
          ]),
          b("dl", ti, [
            (p(!0), _(Y, null, ie(r.value, (f) => (p(), _("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              b("dt", ni, z(f.key), 1),
              b("dd", si, [
                f.column && a.value ? (p(), ce(Lt, {
                  key: 0,
                  entry: a.value,
                  column: f.column
                }, null, 8, ["entry", "column"])) : (p(), _(Y, { key: 1 }, [
                  Fe(z(f.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          b("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (f) => S(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : O("", !0)
    ]));
  }
}), ia = /* @__PURE__ */ de(ai, [["__scopeId", "data-v-8e2c6c48"]]);
function ri() {
  const e = ye();
  return g(() => ar(e.schema.value, e.entity.value));
}
const li = ["src", "alt"], oi = ["title"], ii = /* @__PURE__ */ ue({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = g(() => t.column.kind ?? "text"), a = g(() => Ae(t.column, t.entry.row)), r = g(
      () => s.value === "ordinal" ? t.entry.ordinal : Tt(t.column, t.entry.row)
    ), l = g(() => a.value), i = g(() => t.column.activate === !0 || !!t.column.click), o = g(() => bn(t.column)), u = g(() => js(t.column, t.entry.row));
    function f(y) {
      i.value && (y.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (y, k) => s.value === "component" && e.column.component ? (p(), ce(Rs(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (p(), ce(Ft, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : s.value === "image" ? (p(), _("img", {
      key: 2,
      class: "dc-cell__image",
      src: String(a.value ?? ""),
      alt: e.entry.parts.identity,
      loading: "lazy",
      style: ze({ maxHeight: e.column.height }),
      onClick: f
    }, null, 12, li)) : e.column.drill ? (p(), ce(Lt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (p(), _("button", {
      key: 4,
      type: "button",
      class: Zt(["dc-table__open", { "dc-truncate": o.value }]),
      title: u.value,
      onClick: f
    }, z(r.value), 11, oi)) : (p(), _(Y, { key: 5 }, [
      Fe(z(r.value), 1)
    ], 64));
  }
}), ws = /* @__PURE__ */ de(ii, [["__scopeId", "data-v-8a010beb"]]), ci = {
  key: 0,
  class: "dc-table__none"
}, ui = { class: "dc-table__detail" }, di = {
  key: 1,
  class: "dc-table"
}, fi = ["data-dc-align", "data-dc-hide", "aria-sort"], pi = ["onClick"], vi = ["onClick"], mi = ["data-dc-align", "data-dc-hide", "title"], hi = {
  key: 0,
  class: "dc-table__name"
}, _i = /* @__PURE__ */ ue({
  __name: "TableView",
  setup(e) {
    const t = ye(), n = bt(), s = ri();
    function a(y) {
      y && (t.query.value.sort === y ? t.toggleDirection() : t.setSort(y));
    }
    const r = g(() => t.entity.value?.label ?? "The result set"), l = g(() => new Set(t.sorts.value.map((y) => y.key))), i = (y) => y.sort !== void 0 && l.value.has(y.sort), o = (y) => {
      if (i(y))
        return t.query.value.sort !== y.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function u(y) {
      return [
        ms(y),
        y.muted ? "dc-table__muted" : "",
        y.mono ? "dc-mono" : "",
        bn(y) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function f(y, k) {
      if (!(!bn(y) || y.activate || y.click))
        return js(y, k.row);
    }
    return (y, k) => S(s).length ? (p(), _("table", di, [
      b("thead", null, [
        b("tr", null, [
          (p(!0), _(Y, null, ie(S(s), (m, $) => (p(), _("th", {
            key: S(ps)(m, $),
            scope: "col",
            class: Zt(S(ms)(m)),
            style: ze({ width: m.width }),
            "data-dc-align": S(vs)(m),
            "data-dc-hide": m.hideBelow,
            "aria-sort": o(m)
          }, [
            i(m) ? (p(), _("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (x) => a(m.sort)
            }, z(m.label), 9, pi)) : (p(), _(Y, { key: 1 }, [
              Fe(z(m.label), 1)
            ], 64))
          ], 14, fi))), 128))
        ])
      ]),
      b("tbody", null, [
        (p(!0), _(Y, null, ie(S(n), (m) => (p(), _("tr", {
          key: m.key,
          class: "dc-table__row",
          onClick: ($) => S(t).activate(m.row)
        }, [
          (p(!0), _(Y, null, ie(S(s), ($, x) => (p(), _("td", {
            key: S(ps)($, x),
            class: Zt(u($)),
            "data-dc-align": S(vs)($),
            "data-dc-hide": $.hideBelow,
            title: f($, m)
          }, [
            $.scope ? (p(), _("span", hi, [
              pe(ws, {
                column: $,
                entry: m
              }, null, 8, ["column", "entry"]),
              pe(Dt, { entry: m }, null, 8, ["entry"])
            ])) : (p(), ce(ws, {
              key: 1,
              column: $,
              entry: m
            }, null, 8, ["column", "entry"]))
          ], 10, mi))), 128))
        ], 8, vi))), 128))
      ])
    ])) : (p(), _("p", ci, [
      k[2] || (k[2] = b("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      b("span", ui, [
        Fe(z(r.value) + " has no ", 1),
        k[0] || (k[0] = b("code", null, "columns", -1)),
        k[1] || (k[1] = Fe(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ca = /* @__PURE__ */ de(_i, [["__scopeId", "data-v-d6cf251d"]]);
function gi(e) {
  const t = Yt([]), n = q(!1), s = Yt(null);
  let a = 0;
  const r = (o, u, f) => ({
    entity: o,
    rows: u.rows.map(
      (y, k) => aa(y, k, o, e.isPinned(y.id))
    ),
    total: u.total,
    count: f ? o.count : String(u.total)
  }), l = () => {
    const o = ++a, u = e.query.value, f = e.schema.value, y = e.entities.value, k = e.limit.value, m = Tn(u), $ = y.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: x.key, facets: tn(x), page: 1 },
        schema: f,
        entity: x,
        limit: k,
        offset: 0
      })
    }));
    if ($.every(({ outcome: x }) => !(x instanceof Promise))) {
      t.value = $.map(
        ({ entity: x, outcome: h }) => r(x, h, m)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all($.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      o === a && (t.value = x.map(
        (h, w) => r($[w].entity, h, m)
      ), s.value = null);
    }).catch((x) => {
      o === a && (s.value = x, t.value = []);
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
  return $e(
    [e.source, e.schema, e.query, e.entities, e.limit],
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: i };
}
const yi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, bi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, wi = ["data-dc-pending"], ki = ["data-dc-empty"], $i = ["onClick"], xi = { class: "dc-type__name" }, Mi = { class: "dc-type__count dc-mono" }, Ci = { class: "dc-type__sr" }, Si = {
  key: 0,
  class: "dc-type__empty"
}, Ei = ["onClick"], Pi = { class: "dc-type__identity" }, Ai = { class: "dc-type__primary dc-truncate" }, zi = { class: "dc-type__secondary dc-mono dc-truncate" }, Ri = { class: "dc-type__trailing dc-mono" }, Ti = { class: "dc-type__metric-value" }, Fi = { class: "dc-type__metric-label" }, Li = {
  key: 0,
  class: "dc-type__date"
}, Di = ["onClick"], Ni = /* @__PURE__ */ ue({
  __name: "TypeCardsView",
  setup(e) {
    const t = ye(), { previews: n, pending: s, error: a } = gi({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (l) => t.isPinnedId(l)
    }), r = g(() => !t.isPristine.value);
    return (l, i) => S(a) ? (p(), _("p", yi, " Could not load results: " + z(S(a) instanceof Error ? S(a).message : "the data source failed."), 1)) : !S(n).length && S(s) ? (p(), _("p", bi, " Running query… ")) : (p(), _("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": S(s) ? "true" : "false"
    }, [
      (p(!0), _(Y, null, ie(S(n), (o) => (p(), _("section", {
        key: o.entity.key,
        class: "dc-type",
        "data-dc-empty": o.rows.length ? "false" : "true"
      }, [
        b("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => S(t).setEntity(o.entity.key)
        }, [
          b("span", xi, z(o.entity.label), 1),
          b("span", Mi, z(o.count), 1),
          i[0] || (i[0] = b("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          b("span", Ci, "Show only " + z(o.entity.label.toLowerCase()), 1)
        ], 8, $i),
        o.rows.length ? O("", !0) : (p(), _("p", Si, z(r.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), _(Y, null, ie(o.rows, (u) => (p(), _("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          b("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (f) => S(t).activate(u.row)
          }, [
            b("span", Pi, [
              b("span", Ai, z(u.parts.identity), 1),
              b("span", zi, z(u.parts.reference), 1)
            ])
          ], 8, Ei),
          b("span", Ri, [
            (p(!0), _(Y, null, ie(u.parts.metrics.slice(0, 1), (f) => (p(), ce(Lt, {
              key: f.column.key ?? f.label,
              class: "dc-type__metric",
              entry: u,
              column: f.column
            }, {
              default: gt(() => [
                b("span", Ti, z(f.text), 1),
                b("span", Fi, z(f.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), _("span", Li, z(u.parts.updated), 1)) : O("", !0),
            pe(Dt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        o.entity.create ? (p(), _("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => S(t).create(o.entity)
        }, [
          i[1] || (i[1] = b("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Fe(" " + z(o.entity.create), 1)
        ], 8, Di)) : O("", !0)
      ], 8, ki))), 128))
    ], 8, wi));
  }
}), ua = /* @__PURE__ */ de(Ni, [["__scopeId", "data-v-b776cfb6"]]), Ii = ["data-dc-pending"], Oi = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, Vi = { class: "dc-results__detail" }, Ki = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Bi = {
  key: 3,
  class: "dc-results__state"
}, qi = { class: "dc-results__detail" }, Wi = /* @__PURE__ */ ue({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), s = {
      list: xn,
      cards: ra,
      grid: la,
      table: ca,
      links: oa,
      preview: ia
    }, a = g(() => qs(n.query.value)), r = g(() => {
      const u = n.query.value.view, f = t.views ?? [], [y] = f;
      return y === void 0 || f.includes(u) ? u : y;
    }), l = g(() => s[r.value] ?? xn), i = g(() => n.rows.value.length > 0), o = g(() => n.error.value !== null);
    return (u, f) => (p(), _("div", {
      class: "dc-results",
      "data-dc-pending": S(n).pending.value ? "true" : "false"
    }, [
      o.value ? (p(), _("p", Oi, [
        f[1] || (f[1] = b("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        b("span", Vi, z(S(n).error.value instanceof Error ? S(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), ce(ua, { key: 1 })) : !i.value && S(n).pending.value ? (p(), _("p", Ki, [...f[2] || (f[2] = [
        b("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (p(), ce(Rs(l.value), { key: 4 })) : (p(), _("div", Bi, [
        f[3] || (f[3] = b("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        b("span", qi, z(S(n).summary.value), 1),
        S(n).isPristine.value ? O("", !0) : (p(), _("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: f[0] || (f[0] = (y) => S(n).clearFilters())
        }, z(S(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Ii));
  }
}), da = /* @__PURE__ */ de(Wi, [["__scopeId", "data-v-c00573c8"]]), Ui = ["data-dc-theme"], Hi = ["data-dc-width", "data-dc-align"], ji = { class: "dc-shell__panel" }, Xi = /* @__PURE__ */ ue({
  __name: "DataShell",
  props: /* @__PURE__ */ en({
    schema: {},
    source: {},
    route: {},
    defaults: {},
    limit: { default: 50 },
    previewsPerType: { default: 3 },
    views: {},
    accent: {},
    tokens: {},
    theme: { default: "minimal" },
    matchWidth: { default: "grow" },
    headAlign: { default: "center" },
    pinnable: { type: Boolean },
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    open: { type: Boolean, default: !1 },
    openModifiers: {},
    pinned: { default: () => [] },
    pinnedModifiers: {}
  }),
  emits: /* @__PURE__ */ en(["activate", "create", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Jt(e, "open"), l = Jt(e, "pinned"), i = zn(), o = _t(Ls, null), u = s.route || o ? null : Qa(), f = s.route ?? o ?? u;
    He(() => u?.dispose?.());
    const y = g(() => Er({ seed: s.schema.key })), k = g(() => s.source ?? y.value), m = qr({
      schema: () => s.schema,
      adapter: f,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), $ = Wr({
      source: k,
      query: m.query,
      schema: g(() => s.schema),
      entity: m.entity,
      limit: g(() => s.limit)
    });
    $e(m.query, (M) => a("query-change", M)), $e(
      [$.pageCount, $.pending, m.query],
      () => {
        if ($.pending.value) return;
        const M = $.pageCount.value;
        m.query.value.page > M && m.setPage(M, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const x = Ts() ?? "dc-query-panel", h = q(null);
    function w() {
      r.value && (r.value = !1, zt(() => {
        h.value?.$el?.querySelector(".dc-header__trigger")?.focus();
      }));
    }
    const E = g(() => new Set(l.value));
    function N(M) {
      const A = new Set(E.value);
      A.has(M.id) ? A.delete(M.id) : A.add(M.id), l.value = [...A], a("toggle-pin", M);
    }
    function T(M, A) {
      m.narrow(Tr(s.schema, m.query.value, M), A?.key ?? null), a("drill", M, A);
    }
    const F = Fr({
      ...m,
      schema: g(() => s.schema),
      entities: g(() => s.schema.entities),
      rows: $.rows,
      total: $.total,
      limit: g(() => s.limit),
      offset: $.offset,
      pageCount: $.pageCount,
      pending: $.pending,
      error: $.error,
      source: k,
      previewsPerType: g(() => s.previewsPerType),
      pinnable: g(() => s.pinnable === !0),
      isPinned: (M) => E.value.has(M.id),
      isPinnedId: (M) => E.value.has(M),
      togglePin: N,
      activate: (M) => a("activate", M),
      create: (M) => a("create", M),
      drill: T
    }), V = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: m.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: w
    }), (M, A) => (p(), _("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: ze(V.value)
    }, [
      b("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(ta, {
          ref_key: "headerRef",
          ref: h,
          expanded: r.value,
          "panel-id": S(x),
          onToggle: A[0] || (A[0] = (J) => r.value = !r.value)
        }, us({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: gt(() => [
              qe(M.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id"]),
        r.value ? (p(), _(Y, { key: 0 }, [
          b("div", {
            class: "dc-shell__scrim",
            onClick: w
          }),
          b("div", ji, [
            pe(sa, {
              "panel-id": S(x),
              views: e.views,
              onClose: w
            }, us({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: gt(() => [
                  qe(M.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : O("", !0)
      ], 8, Hi),
      qe(M.$slots, "results", {
        rows: S(F).rows.value,
        total: S(F).total.value,
        offset: S(F).offset.value,
        pageCount: S(F).pageCount.value,
        query: S(F).query.value,
        pending: S(F).pending.value
      }, () => [
        pe(da, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, Ui));
  }
}), Gi = /* @__PURE__ */ de(Xi, [["__scopeId", "data-v-737c7342"]]), St = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Yi = ["aria-label"], Qi = ["role", "aria-label"], Zi = ["data-dc-item"], Ji = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, ec = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], tc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, nc = { class: "dc-menu__label dc-truncate" }, sc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, ac = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, rc = /* @__PURE__ */ ue({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = q(null), l = q([]), i = q(null), o = q(null), u = q(null), f = q(!1), y = g(
      () => s.items.flatMap((M, A) => St(M) ? [A] : [])
    ), k = g(() => {
      const M = [{ entries: [] }];
      return s.items.forEach((A, J) => {
        A.heading ? M.push({ heading: A, entries: [] }) : M[M.length - 1]?.entries.push({ item: A, index: J });
      }), M.filter((A) => A.entries.length > 0);
    }), m = q({ x: s.at.x, y: s.at.y });
    async function $() {
      m.value = { x: s.at.x, y: s.at.y }, await zt();
      const M = r.value?.getBoundingClientRect();
      if (!M) return;
      const A = 8;
      let J = s.at.x, le = s.at.y;
      if (J + M.width > window.innerWidth - A) {
        const ve = s.at.mirrorX === void 0 ? null : s.at.mirrorX - M.width;
        J = ve !== null && ve >= A ? ve : window.innerWidth - M.width - A;
      }
      le + M.height > window.innerHeight - A && (le = window.innerHeight - M.height - A), m.value = { x: Math.max(A, J), y: Math.max(A, le) };
    }
    const x = g(() => ({ left: `${m.value.x}px`, top: `${m.value.y}px` }));
    function h(M) {
      i.value = M, M !== null && zt(() => l.value[M]?.focus());
    }
    function w(M, A) {
      const J = y.value;
      if (J.length === 0) return null;
      if (M === null) return A === 1 ? J[0] ?? null : J[J.length - 1] ?? null;
      const le = J.indexOf(M);
      return le === -1 ? J[0] ?? null : J[(le + A + J.length) % J.length] ?? null;
    }
    function E(M, A) {
      if (!s.items[M]?.items?.length) return;
      const le = l.value[M]?.getBoundingClientRect(), ve = r.value?.getBoundingClientRect();
      !le || !ve || (u.value = { x: ve.right - 4, y: le.top - 4, mirrorX: ve.left + 4 }, o.value = M, f.value = A);
    }
    function N(M) {
      const A = o.value;
      o.value = null, u.value = null, M && A !== null && h(A);
    }
    function T(M) {
      const A = s.items[M];
      if (!(!A || !St(A))) {
        if (A.items?.length) {
          E(M, !0);
          return;
        }
        a("choose", A);
      }
    }
    function F(M) {
      const A = M.key;
      if (A === "Escape") {
        M.preventDefault(), M.stopPropagation(), o.value !== null ? N(!0) : a("dismiss");
        return;
      }
      if (A === "ArrowDown" || A === "ArrowUp") {
        M.preventDefault(), M.stopPropagation(), N(!1), h(w(i.value, A === "ArrowDown" ? 1 : -1));
        return;
      }
      if (A === "Home" || A === "End") {
        M.preventDefault(), M.stopPropagation(), N(!1), h(w(null, A === "Home" ? 1 : -1));
        return;
      }
      if (A === "ArrowRight") {
        const J = i.value;
        J !== null && s.items[J]?.items?.length && (M.preventDefault(), M.stopPropagation(), E(J, !0));
        return;
      }
      if (A === "ArrowLeft") {
        o.value !== null && (M.preventDefault(), M.stopPropagation(), N(!0));
        return;
      }
      if (A === "Enter" || A === " ") {
        const J = i.value;
        if (J === null) return;
        M.preventDefault(), M.stopPropagation(), T(J);
      }
    }
    function V(M) {
      const A = s.items[M];
      !A || !St(A) || (o.value !== null && o.value !== M && N(!1), h(M), A.items?.length && E(M, !1));
    }
    return Xa(() => {
      $(), s.autofocus && h(w(null, 1));
    }), $e(() => s.at, $, { deep: !0 }), $e(() => s.items, () => void $(), { deep: !0 }), He(() => {
      o.value = null;
    }), t({ root: r }), (M, A) => {
      const J = Fs("MenuList", !0);
      return p(), _("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: ze(x.value),
        onKeydown: F
      }, [
        (p(!0), _(Y, null, ie(k.value, (le, ve) => (p(), _("div", {
          key: `${ve}-${le.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: le.heading ? "group" : "none",
          "aria-label": le.heading?.label
        }, [
          le.heading ? (p(), _("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": le.heading.id
          }, z(le.heading.label), 9, Zi)) : O("", !0),
          (p(!0), _(Y, null, ie(le.entries, ({ item: Q, index: Me }) => (p(), _(Y, {
            key: Q.id ?? `${Me}-${Q.label ?? ""}`
          }, [
            Q.separator ? (p(), _("div", Ji)) : (p(), _("button", {
              key: 1,
              ref_for: !0,
              ref: (Pe) => {
                Pe && (l.value[Me] = Pe);
              },
              type: "button",
              class: "dc-menu__item",
              role: Q.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Q.checked === void 0 ? void 0 : Q.checked,
              "aria-haspopup": Q.items?.length ? "menu" : void 0,
              "aria-expanded": Q.items?.length ? o.value === Me : void 0,
              "aria-disabled": Q.disabled ? "true" : void 0,
              disabled: Q.disabled,
              "data-dc-item": Q.id,
              tabindex: "-1",
              onClick: (Pe) => T(Me),
              onMouseenter: (Pe) => V(Me)
            }, [
              b("span", tc, z(Q.checked ? "✓" : ""), 1),
              b("span", nc, z(Q.label), 1),
              Q.shortcut ? (p(), _("span", sc, z(Q.shortcut), 1)) : Q.items?.length ? (p(), _("span", ac, "›")) : O("", !0)
            ], 40, ec))
          ], 64))), 128))
        ], 8, Qi))), 128)),
        o.value !== null && u.value ? (p(), ce(J, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: u.value,
          label: e.items[o.value]?.label,
          autofocus: f.value,
          onChoose: A[0] || (A[0] = (le) => a("choose", le)),
          onDismiss: A[1] || (A[1] = (le) => N(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
      ], 44, Yi);
    };
  }
}), fa = /* @__PURE__ */ de(rc, [["__scopeId", "data-v-9b1413fa"]]), lc = ["data-dc-theme", "aria-label"], oc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], ic = /* @__PURE__ */ ue({
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
    const n = e, s = g(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), a = t, r = q(null), l = q([]), i = q(null), o = q(null), u = q(!1), f = g(
      () => n.menus.flatMap((T, F) => St(T) ? [F] : [])
    );
    function y(T, F) {
      const V = l.value[T]?.getBoundingClientRect(), M = n.menus[T];
      !V || !M || !St(M) || (o.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, i.value = T, u.value = F);
    }
    function k(T) {
      const F = i.value;
      i.value = null, o.value = null, T && F !== null && l.value[F]?.focus();
    }
    function m(T) {
      i.value === T ? k(!0) : y(T, !1);
    }
    function $(T) {
      i.value === null || i.value === T || y(T, !1);
    }
    function x(T, F) {
      const V = f.value;
      if (V.length === 0) return null;
      if (T === null) return F === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const M = V.indexOf(T);
      return M === -1 ? V[0] ?? null : V[(M + F + V.length) % V.length] ?? null;
    }
    function h(T) {
      const F = T.key;
      if (F === "Escape") {
        if (i.value === null) return;
        T.preventDefault(), k(!0);
        return;
      }
      if (F === "ArrowDown" && i.value === null) {
        const A = w();
        if (A === null) return;
        T.preventDefault(), y(A, !0);
        return;
      }
      if (F !== "ArrowLeft" && F !== "ArrowRight") return;
      const V = i.value ?? w(), M = x(V, F === "ArrowRight" ? 1 : -1);
      M !== null && (T.preventDefault(), i.value !== null ? y(M, !0) : l.value[M]?.focus());
    }
    function w() {
      const T = l.value.findIndex((F) => F === document.activeElement);
      return T === -1 ? f.value[0] ?? null : T;
    }
    function E(T) {
      const F = T.target;
      !F || r.value?.contains(F) || k(!1);
    }
    $e(i, (T) => {
      T !== null ? window.addEventListener("pointerdown", E, !0) : window.removeEventListener("pointerdown", E, !0);
    }), He(() => window.removeEventListener("pointerdown", E, !0));
    function N(T) {
      k(!0), T.action?.(), a("choose", T);
    }
    return (T, F) => (p(), _("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: ze(s.value),
      onKeydown: h
    }, [
      (p(!0), _(Y, null, ie(e.menus, (V, M) => (p(), _("button", {
        key: V.id ?? V.label ?? M,
        ref_for: !0,
        ref: (A) => {
          A && (l.value[M] = A);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === M,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: M === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (A) => m(M),
        onMouseenter: (A) => $(M)
      }, z(V.label), 41, oc))), 128)),
      i.value !== null && o.value ? (p(), ce(fa, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: N,
        onDismiss: F[0] || (F[0] = (V) => k(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 44, lc));
  }
}), Du = /* @__PURE__ */ de(ic, [["__scopeId", "data-v-93dbd2e4"]]), cc = ["aria-label", "aria-expanded", "disabled"], uc = { "aria-hidden": "true" }, dc = /* @__PURE__ */ ue({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = q(null), a = q(null), r = q(null), l = q(!1), i = g(() => r.value !== null);
    function o($) {
      const x = s.value?.getBoundingClientRect();
      x && (r.value = { x: x.left, y: x.bottom + 4, mirrorX: x.right }, l.value = $);
    }
    function u($) {
      r.value = null, $ && s.value?.focus();
    }
    function f() {
      i.value ? u(!0) : o(!1);
    }
    function y($) {
      $.key !== "ArrowDown" || i.value || ($.preventDefault(), o(!0));
    }
    function k($) {
      const x = $.target;
      x && (s.value?.contains(x) || a.value?.root?.contains(x) || u(!1));
    }
    $e(i, ($) => {
      $ ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), He(() => window.removeEventListener("pointerdown", k, !0));
    function m($) {
      u(!0), $.action?.(), n("choose", $);
    }
    return ($, x) => (p(), _(Y, null, [
      b("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: y
      }, [
        b("span", uc, z(e.glyph), 1)
      ], 40, cc),
      r.value ? (p(), ce(fa, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: l.value,
        onChoose: m,
        onDismiss: x[0] || (x[0] = (h) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 64));
  }
}), qn = /* @__PURE__ */ de(dc, [["__scopeId", "data-v-48f5ada5"]]), wt = (e) => e.kind === "split", B = (e) => e.kind === "group", j = (e) => e.kind === "float", lt = { x: 16, y: 16, w: 360, h: 260 }, sn = 28, pa = 120, Mn = 220, va = 38, dt = 6;
function Nt(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const l = t(a.node, r);
    return l === a.node ? a : (n = !0, { ...a, node: l });
  });
  return n ? { ...e, frames: s } : e;
}
function Le(e) {
  return { kind: "group", panels: [e] };
}
function Nu(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const oe = (e) => typeof e == "string", Wn = (e) => oe(e) ? Le(e) : e, It = (e) => oe(e) ? [e] : je(e), ks = (e) => e.panels.filter(oe), fc = (e) => e.panels.filter((t) => !oe(t)), Ee = (e, t) => e.panels.includes(t);
function Ot(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (oe(r) || !ee(r, t)) return r;
    const l = n(r);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, panels: a } : e;
}
function rn(e, t) {
  return { node: e, rect: { ...lt, ...t } };
}
function Un(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Hn(e, t) {
  const n = { ...lt, ...t };
  return Un(
    e.map(
      (s, a) => rn(s, {
        ...n,
        x: n.x + a * sn,
        y: n.y + a * sn
      })
    )
  );
}
function jn(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Xn = (e, t, n) => jn("row", e, t, n), Iu = (e, t, n) => jn("column", e, t, n);
function he(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Ou = (e) => ({ ...e, headless: !0 }), Vu = (e) => ({ ...e, fixedView: !0 }), pc = (e) => e === "left" || e === "right" ? "row" : "column";
function je(e) {
  return B(e) ? e.panels.flatMap(It) : j(e) ? e.frames.flatMap((t) => je(t.node)) : e.children.flatMap(je);
}
function ee(e, t) {
  return B(e) ? e.panels.some((n) => oe(n) ? n === t : ee(n, t)) : j(e) ? e.frames.some((n) => ee(n.node, t)) : e.children.some((n) => ee(n, t));
}
const ma = (e) => je(e).length === 0, Cn = (e) => !B(e) && ct(e), Sn = (e) => ma(e) && !Cn(e);
function ln(e) {
  return wt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : j(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => oe(t) ? [] : [{ node: t, index: n }]);
}
const Gn = (e) => ln(e).map((t) => t.node);
function ut(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => oe(s) ? s === t : ee(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function ha(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && oe(t) ? t : "";
}
function ke(e) {
  if (oe(e)) return e;
  if (B(e)) {
    const n = e.panels[ut(e)];
    return n === void 0 ? "" : ke(n);
  }
  if (j(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? ke(n.node) : "";
  }
  const t = e.children[0];
  return t ? ke(t) : "";
}
function pt(e, t) {
  if (B(e) && Ee(e, t)) return e;
  for (const n of Gn(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function vc(e) {
  const t = Gn(e).flatMap(vc);
  return B(e) ? [e, ...t] : t;
}
function ge(e, t) {
  if (B(e)) {
    for (const n of fc(e)) {
      const s = ge(n, t);
      if (s) return s;
    }
    return null;
  }
  if (j(e)) {
    for (const n of e.frames)
      if (ee(n.node, t))
        return ge(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = ge(n, t);
    if (s) return s;
  }
  return null;
}
function mn(e, t, n = pa) {
  const s = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), a = s(e.w, t.w), r = s(e.h, t.h), l = (i, o, u) => Math.min(Math.max(i, 0), Math.max(u - o, 0));
  return {
    x: Math.round(l(e.x, a, t.w)),
    y: Math.round(l(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function $s(e, t, n, s, a = pa) {
  let { x: r, y: l, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (o = e.h + s), t.includes("n") && (o = e.h - s, l = e.y + s), i < a && (t.includes("w") && (r = e.x + e.w - a), i = a), o < a && (t.includes("n") && (l = e.y + e.h - a), o = a), { x: r, y: l, w: i, h: o };
}
const _a = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (B(e)) return Ot(e, t, (r) => vt(r, t, n));
  if (j(e)) {
    let r = !1;
    const l = e.frames.map((i) => {
      if (!ee(i.node, t)) return i;
      if (ge(i.node, t)) {
        const u = vt(i.node, t, n);
        return u === i.node ? i : (r = !0, { ...i, node: u });
      }
      const o = n(i);
      return o === i ? i : (r = !0, o);
    });
    return r ? { ...e, frames: l } : e;
  }
  if (!ee(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const l = vt(r, t, n);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, children: a } : e;
}
function mc(e, t, n) {
  return vt(e, t, (s) => _a(s.rect, n) ? s : { ...s, rect: n });
}
const Je = (e) => e.maximized === !0, ga = (e) => (t) => {
  if (Je(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function hc(e, t, n = !0) {
  return vt(e, t, ga(n));
}
function Ku(e, t) {
  const n = ge(e, t);
  return n ? hc(e, t, !Je(n)) : e;
}
const at = (e) => e.minimized === !0, ya = (e) => (t) => {
  if (at(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function _c(e, t, n = !0) {
  return vt(e, t, ya(n));
}
function Bu(e, t) {
  const n = ge(e, t);
  return n ? _c(e, t, !at(n)) : e;
}
function st(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = et(e, t.slice(0, -1));
  return !s || !j(s) ? null : s.frames[n] ?? null;
}
function En(e, t) {
  if (j(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ee(s.node, t)) continue;
      const a = En(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of ln(e)) {
    if (!ee(n, t)) continue;
    const a = En(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function Yn(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = et(e, a);
  if (!r || !j(r)) return e;
  const l = r.frames[s];
  if (!l) return e;
  const i = n(l);
  if (i === l) return e;
  const o = [...r.frames];
  return o[s] = i, it(e, a, { ...r, frames: o });
}
function xs(e, t, n) {
  return Yn(
    e,
    t,
    (s) => _a(s.rect, n) ? s : { ...s, rect: n }
  );
}
function gc(e, t, n = !0) {
  return Yn(e, t, ga(n));
}
function yc(e, t, n = !0) {
  return Yn(e, t, ya(n));
}
function Et(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (j(e)) {
    const l = e.frames[n];
    if (!l) return e;
    const i = Et(l.node, s), o = i === l.node ? l : { ...l, node: i };
    if (n === e.frames.length - 1 && o === l) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(o), { ...e, frames: u };
  }
  const a = et(e, [n]);
  if (!a) return e;
  const r = Et(a, s);
  return r === a ? e : it(e, [n], r);
}
function bc(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (j(s) && (n[r] = s.frames.length - 1), s = et(s, [a]));
  }), n;
}
function jt(e, t, n, s) {
  if (B(e)) return Ot(e, n, (l) => jt(l, t, n, s));
  if (j(e)) {
    const l = e.frames.findIndex((o) => ee(o.node, n)), i = e.frames[l];
    if (!i) return e;
    if (ge(i.node, n)) {
      const o = jt(i.node, t, n, s);
      if (o === i.node) return e;
      const u = [...e.frames];
      return u[l] = { ...i, node: o }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, rn(Le(t), s)] };
  }
  if (!ee(e, n)) return e;
  let a = !1;
  const r = e.children.map((l) => {
    const i = jt(l, t, n, s);
    return i !== l && (a = !0), i;
  });
  return a ? { ...e, children: r } : e;
}
function Ms(e, t, n, s) {
  if (t === n || !ee(e, t) || !ee(e, n) || !ge(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const r = jt(a, t, n, s);
  return r === a ? e : _e(r);
}
function wc(e, t, n) {
  return j(e) ? { ...e, frames: [...e.frames, rn(Le(t), n)] } : B(e) ? wa(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Le(t)],
    sizes: [...Ue(e), 1],
    ...he(e)
  };
}
function ba(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return wc(e, t, s);
  const r = n.slice(1), l = (f, y) => y === a ? ba(f, t, r, s) : ot(f, t);
  if (j(e)) {
    const f = e.frames.flatMap((y, k) => {
      const m = l(y.node, k);
      return m ? [m === y.node ? y : { ...y, node: m }] : [];
    });
    return { ...e, frames: f };
  }
  if (B(e)) {
    const f = ut(e), y = [];
    e.panels.forEach(($, x) => {
      if (oe($)) {
        $ !== t && y.push($);
        return;
      }
      const h = l($, x);
      h && y.push(h);
    });
    const m = e.active && y.some(($) => It($).includes(e.active)) ? e.active : ke(y[f] ?? y[y.length - 1]);
    return {
      kind: "group",
      panels: y,
      ...m ? { active: m } : {},
      ...he(e)
    };
  }
  const i = Ue(e), o = [], u = [];
  return e.children.forEach((f, y) => {
    const k = l(f, y);
    k && (o.push(k), u.push(i[y] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: u, ...he(e) };
}
function Cs(e, t, n, s) {
  const a = et(e, n);
  return !a || !ma(a) || !ee(e, t) ? e : _e(ba(e, t, n, s));
}
function hn(e, t) {
  if (B(e)) return Ot(e, t, (a) => hn(a, t));
  if (j(e)) {
    const a = e.frames.findIndex((u) => ee(u.node, t)), r = e.frames[a];
    if (!r) return e;
    const l = hn(r.node, t), i = l === r.node ? r : { ...r, node: l };
    if (a === e.frames.length - 1 && i === r) return e;
    const o = [...e.frames];
    return o.splice(a, 1), o.push(i), { ...e, frames: o };
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = hn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Qn(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, l) => r + l, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const Ue = (e) => Qn(e.children.length, e.sizes), Re = (e) => {
  const t = B(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function _e(e) {
  if (B(e)) return kc(e);
  if (j(e)) {
    const i = e.frames.flatMap((o) => {
      const u = _e(o.node);
      return Sn(u) ? [] : [u === o.node ? o : { ...o, node: u }];
    });
    return i.length === e.frames.length && i.every((o, u) => o === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = Ue(e), n = Re(e), s = [], a = [], r = [];
  e.children.forEach((i, o) => {
    const u = _e(i), f = t[o] ?? 0;
    if (Sn(u)) return;
    if (!n && wt(u) && u.direction === e.direction && !Re(u) && !ct(u)) {
      const k = Ue(u);
      u.children.forEach((m, $) => {
        s.push(m), a.push(f * (k[$] ?? 0));
      });
      return;
    }
    s.push(u), a.push(f);
    const y = n?.[o];
    y && r.push(y);
  });
  const l = s[0];
  return s.length === 1 && l && !ct(e) ? l : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: Qn(s.length, a),
    ...he(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function kc(e) {
  if (e.panels.every(oe)) return e;
  const t = ke(e), n = Re(e), s = [], a = [];
  e.panels.forEach((i, o) => {
    const u = n?.[o];
    if (oe(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const f = _e(i);
    if (!Sn(f)) {
      if (B(f) && !ct(f) && !Re(f)) {
        s.push(...f.panels);
        return;
      }
      s.push(f), u && a.push(u);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !oe(r) && !ct(e))
    return r;
  if (s.length === e.panels.length && s.every((i, o) => i === e.panels[o]))
    return e;
  const l = t && s.some((i) => It(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...l ? { active: l } : {},
    ...he(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ot(e, t) {
  if (j(e)) {
    const l = e.frames.flatMap((i) => {
      const o = ot(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return l.length === 0 && !Cn(e) ? null : { ...e, frames: l };
  }
  if (B(e)) {
    if (!ee(e, t)) return e;
    const l = ut(e), i = [];
    for (const f of e.panels) {
      if (oe(f)) {
        f !== t && i.push(f);
        continue;
      }
      const y = ot(f, t);
      y && i.push(y);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((f) => It(f).includes(e.active)) ? e.active : ke(i[l] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...he(e) } : { kind: "group", panels: i, ...he(e) };
  }
  const n = Ue(e), s = [], a = [];
  if (e.children.forEach((l, i) => {
    const o = ot(l, t);
    o && (s.push(o), a.push(n[i] ?? 0));
  }), s.length === 0)
    return Cn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...he(e) } : null;
  const r = s[0];
  return s.length === 1 && r && !ct(e) ? r : _e({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...he(e)
  });
}
function wa(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...he(e) };
}
function Ct(e, t, n, s, a) {
  const r = (m) => Nt(
    m,
    ($) => ee($, n) ? Ct($, t, n, s, a) : $
  );
  if (s === "float") return e;
  const l = (m) => Ot(m, n, ($) => Ct($, t, n, s, a));
  if (s === "center")
    return B(e) ? Ee(e, n) ? wa(e, t, a) : l(e) : j(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (m) => ee(m, n) ? Ct(m, t, n, s, a) : m
      )
    };
  const i = pc(s), o = s === "left" || s === "top", u = (m) => ({
    kind: "split",
    direction: i,
    children: o ? [Le(t), m] : [m, Le(t)],
    sizes: [0.5, 0.5]
  });
  if (B(e)) return Ee(e, n) ? u(e) : l(e);
  if (j(e)) return r(e);
  const f = Ue(e), y = e.children.findIndex(
    (m) => B(m) && Ee(m, n)
  );
  if (y >= 0 && e.direction === i) {
    const m = (f[y] ?? 0) / 2, $ = [...e.children], x = [...f];
    return $.splice(o ? y : y + 1, 0, Le(t)), x.splice(y, 1, m, m), {
      kind: "split",
      direction: i,
      children: $,
      sizes: x,
      ...he(e)
    };
  }
  const k = e.children.map((m) => ee(m, n) ? B(m) && Ee(m, n) ? u(m) : Ct(m, t, n, s) : m);
  return {
    kind: "split",
    direction: e.direction,
    children: k,
    sizes: f,
    ...he(e)
  };
}
function mt(e, t) {
  if (B(e)) {
    if (Ee(e, t))
      return ha(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((o) => !oe(o) && ee(o, t)), r = e.panels[a];
    if (r === void 0 || oe(r)) return e;
    const l = mt(r, t);
    if (l === r && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = l, { ...e, panels: i, active: t };
  }
  if (!ee(e, t)) return e;
  if (j(e)) return Nt(e, (a) => mt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = mt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Pt(e, t, n) {
  if (B(e)) {
    if (!Ee(e, t)) return Ot(e, t, (u) => Pt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const l = Re(e), i = l ? [...l] : void 0;
    i && i.splice(a, 0, ...i.splice(s, 1));
    const o = ke(e);
    return {
      kind: "group",
      panels: r,
      ...o ? { active: o } : {},
      ...he(e),
      ...i ? { places: i } : {}
    };
  }
  return ee(e, t) ? j(e) ? Nt(e, (s) => Pt(s, t, n)) : { ...e, children: e.children.map((s) => Pt(s, t, n)) } : e;
}
function Xt(e, t, n) {
  if (t === n) return e;
  if (B(e)) {
    if (!ee(e, t) && !ee(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => oe(r) ? s(r) : Xt(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return j(e) ? Nt(e, (s) => Xt(s, t, n)) : { ...e, children: e.children.map((s) => Xt(s, t, n)) };
}
function Wt(e, t, n, s, a) {
  if (s === "float" || !ee(e, t) || !ee(e, n)) return e;
  const r = pt(e, t);
  if (s === "center" && r && Ee(r, n)) {
    if (a === void 0) return e;
    const i = r.panels.indexOf(t), o = a > i ? a - 1 : a;
    return o === i ? e : mt(Pt(e, t, o), t);
  }
  if (t === n) return e;
  const l = ot(e, t);
  return l ? _e(Ct(l, t, n, s, a)) : e;
}
function ka(e, t, n) {
  if (B(e)) {
    const a = e.panels[t];
    if (a === void 0 || oe(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (j(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const r = [...e.frames];
    return r[t] = { ...a, node: n }, { ...e, frames: r };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function Vt(e, t, n) {
  const s = ln(e);
  if (!B(e) && s.some(({ node: a }) => B(a) && Ee(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!ee(a, t)) continue;
    const l = Vt(a, t, n);
    return l ? ka(e, r, l) : null;
  }
  return null;
}
function qu(e, t, n) {
  const s = Vt(
    e,
    t,
    (a) => wt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? _e(s) : e;
}
function $a(e) {
  return j(e) ? [e] : Re(e) || ct(e) ? [e] : B(e) ? [...e.panels] : e.children.flatMap($a);
}
function xa(e, t) {
  if (B(e)) return e;
  const n = Gn(e).map($a), s = n.flat(), a = t && s.some((l) => It(l).includes(t)) ? t : void 0, r = $c(e, n);
  return _e({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...he(e),
    ...r ? { places: r } : {}
  });
}
function $c(e, t) {
  const n = j(e) ? e.frames.map(({ node: s, ...a }) => a) : Re(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function xc(e, t) {
  const n = Vt(e, t, (s) => xa(s, t));
  return n ? _e(n) : e;
}
function Zn(e, t, n) {
  if (B(e) && Ee(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of ln(e)) {
    if (!ee(s, t)) continue;
    const r = Zn(s, t, n);
    return r ? ka(e, a, r) : null;
  }
  return null;
}
function Ss(e, t, n) {
  const s = Zn(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = Re(a);
    return {
      ...jn(n, a.panels.map(Wn)),
      ...he(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? _e(s) : e;
}
function Pn(e, t) {
  if (B(e)) return e;
  if (j(e)) {
    const a = e.frames.findIndex(
      (i) => B(i.node) && i.node.panels.includes(t)
    ), r = e.frames[a], l = r && B(r.node) ? r.node : null;
    if (r && l && l.panels.length > 1) {
      const i = Hn(l.panels.map(Wn), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return Nt(e, (i) => Pn(i, t));
  }
  if (!ee(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = Pn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Mc(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (ge(e, t)?.node === s) {
    const l = Pn(e, t);
    return l === e ? e : _e(l);
  }
  const r = Zn(e, t, (l) => ({
    ...Un(Ma(l.panels.map(Wn), Re(l), n)),
    ...he(l)
  }));
  return r ? _e(r) : e;
}
function Ma(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Hn(e, n).frames;
}
function Ca(e, t) {
  return { ...Un(Ma(e.children, Re(e), t)), ...he(e) };
}
function Wu(e, t, n) {
  const s = Vt(
    e,
    t,
    (a) => j(a) ? a : Ca(a, n)
  );
  return s ? _e(s) : B(e) && Ee(e, t) ? Hn([e], n) : e;
}
function Cc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function Sa(e, t) {
  const n = Cc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...he(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Uu(e, t, n = "row") {
  const s = Vt(
    e,
    t,
    (a) => j(a) ? Sa(a, n) : a
  );
  return s ? _e(s) : e;
}
function Ea(e) {
  if (j(e)) return null;
  const t = B(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || oe(t) || B(t) && t.panels.length === 1 && oe(t.panels[0]) ? null : t;
}
const Sc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function Ec(e, t) {
  const n = Ea(e);
  return n ? t === "inner" ? n : { ...Sc(n), ...he(e) } : e;
}
function yt(e) {
  return e.title ? e.title : B(e) ? "" : j(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function At(e, t) {
  if (B(e)) {
    const s = e.panels[ut(e)];
    return s === void 0 ? "" : oe(s) ? t(s) ?? s : yt(s) || At(s, t);
  }
  if (e.title) return e.title;
  if (j(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? At(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? At(n, t) : "";
}
function et(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (wt(n)) n = n.children[s];
    else if (j(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || oe(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function it(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (j(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const u = it(o.node, a, n);
    if (u === o.node) return e;
    const f = [...e.frames];
    return f[s] = { ...o, node: u }, { ...e, frames: f };
  }
  if (B(e)) {
    const o = e.panels[s];
    if (o === void 0 || oe(o)) return e;
    const u = it(o, a, n);
    if (u === o) return e;
    const f = [...e.panels];
    return f[s] = u, { ...e, panels: f };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = it(r, a, n);
  if (l === r) return e;
  const i = [...e.children];
  return i[s] = l, { ...e, children: i };
}
function Gt(e, t, n) {
  if (t.length === 0)
    return wt(e) ? { ...e, sizes: Qn(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (j(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const o = Gt(i.node, a, n);
    if (o === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: o }, { ...e, frames: u };
  }
  if (B(e)) {
    const i = e.panels[s];
    if (i === void 0 || oe(i)) return e;
    const o = Gt(i, a, n);
    if (o === i) return e;
    const u = [...e.panels];
    return u[s] = o, { ...e, panels: u };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = [...e.children];
  return l[s] = Gt(r, a, n), { ...e, children: l };
}
function Es(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const l = a + r;
  if (l < s * 2) return e;
  const i = [...e], o = Math.min(Math.max(a + n, s), l - s);
  return i[t] = o, i[t + 1] = l - o, i;
}
function an(e) {
  if (!B(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !oe(t) ? e : { ...Xn([Pc(e)]), ...he(e) };
}
const Pc = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ps(e) {
  return e.length === 0 ? null : Xn(e.map(Le));
}
function Ac(e, t) {
  if (!e) return Ps(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const o of je(e))
    !n.has(o) || s.has(o) ? a.add(o) : s.add(o);
  let r = e;
  for (const o of a)
    r = r ? ot(r, o) : null;
  const l = new Set(r ? je(r) : []), i = t.filter((o) => !l.has(o));
  if (i.length === 0) return r ? an(_e(r)) : null;
  if (!r) return Ps(i);
  if (j(r)) {
    const o = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...i.map(
          (u, f) => rn(Le(u), {
            x: lt.x + (o + f) * sn,
            y: lt.y + (o + f) * sn
          })
        )
      ]
    };
  }
  return an(_e(Xn([r, ...i.map(Le)])));
}
const Jn = Symbol("dc.windowContext");
function zc(e) {
  return An(Jn, e), e;
}
function es() {
  const e = _t(Jn, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Rc = ["data-dc-glyph"], Tc = { class: "dc-glyph__line" }, Fc = ["d"], Lc = {
  key: 0,
  class: "dc-glyph__aqua"
}, Dc = ["d"], Nc = /* @__PURE__ */ ue({
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
    return (s, a) => (p(), _("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      b("g", Tc, [
        (p(!0), _(Y, null, ie(t[e.kind], (r) => (p(), _("path", {
          key: r,
          d: r
        }, null, 8, Fc))), 128))
      ]),
      n[e.kind] ? (p(), _("g", Lc, [
        (p(!0), _(Y, null, ie(n[e.kind], (r) => (p(), _("path", {
          key: r,
          d: r
        }, null, 8, Dc))), 128))
      ])) : O("", !0)
    ], 8, Rc));
  }
}), ht = /* @__PURE__ */ de(Nc, [["__scopeId", "data-v-4d2872c0"]]), Ic = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Oc = ["data-dc-movable"], Vc = { class: "dc-float__title dc-truncate" }, Kc = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Bc = ["aria-label", "aria-pressed", "data-dc-minimize"], qc = ["aria-label", "aria-pressed", "data-dc-maximize"], Wc = ["aria-label", "data-dc-close"], Uc = { class: "dc-float__content" }, Hc = ["data-dc-handle", "onPointerdown"], jc = /* @__PURE__ */ ue({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = es(), s = g(() => ke(t.frame.node)), a = g(() => n.panelFor(s.value)?.fixed === !0), r = g(() => Je(t.frame)), l = g(() => at(t.frame)), i = g(() => r.value || l.value), o = g(() => n.resizable.value && !a.value && !i.value), u = g(() => n.movable.value && !a.value && !i.value), f = g(() => {
      const F = je(t.frame.node);
      return F.length === 1 ? F[0] ?? null : null;
    }), y = g(() => f.value !== null && n.closable(f.value)), k = g(() => t.frame.node.headless === !0), m = g(
      () => !k.value && (!B(t.frame.node) || l.value)
    ), $ = g(
      () => t.frame.title || yt(t.frame.node) || At(t.frame.node, (F) => n.panelFor(F)?.title)
    ), x = g(() => n.spaceMenu(t.path));
    function h(F) {
      F.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, F, "move");
    }
    function w(F) {
      F.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const E = g(() => {
      const F = n.framing.value;
      return F !== null && ee(t.frame.node, F);
    }), N = g(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Mn}px`,
        height: `${va}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), T = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (F, V) => (p(), _("div", {
      class: "dc-float",
      style: ze(N.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": l.value ? "true" : "false",
      "data-dc-dragging": E.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (M) => S(n).raiseAt(e.path))
    }, [
      m.value ? (p(), _("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: h,
        onDblclick: w
      }, [
        b("span", Vc, z($.value), 1),
        x.value.length ? (p(), ce(qn, {
          key: 0,
          items: x.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : O("", !0),
        !a.value || l.value && y.value && f.value ? (p(), _("div", Kc, [
          a.value ? O("", !0) : (p(), _("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Unroll" : "Minimize"} ${$.value}`,
            "aria-pressed": l.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (M) => S(n).toggleMinimizeAt(e.path))
          }, [
            pe(ht, {
              kind: l.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Bc)),
          a.value ? O("", !0) : (p(), _("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${$.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (M) => S(n).toggleMaximizeAt(e.path))
          }, [
            pe(ht, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, qc)),
          l.value && y.value && f.value ? (p(), _("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": f.value,
            onClick: V[2] || (V[2] = (M) => S(n).close(f.value))
          }, [
            pe(ht, { kind: "close" })
          ], 8, Wc)) : O("", !0)
        ])) : O("", !0)
      ], 40, Oc)) : O("", !0),
      b("div", Uc, [
        qe(F.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), _(Y, null, ie(o.value ? T : [], (M) => (p(), _("span", {
        key: M,
        class: "dc-float__grip",
        "data-dc-handle": M,
        "aria-hidden": "true",
        onPointerdown: Be((A) => S(n).beginFrameDragAt(e.path, A, M), ["stop"])
      }, null, 40, Hc))), 128))
    ], 44, Ic));
  }
}), Xc = /* @__PURE__ */ de(jc, [["__scopeId", "data-v-f035684c"]]), ts = Symbol("dc.paneContext");
function Gc(e) {
  return An(ts, e), e;
}
function Hu() {
  return _t(ts, null);
}
function ju(e) {
  const t = _t(Jn, null), n = _t(ts, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Mt(e)
  );
  return Ga() && zs(s), s;
}
const Yc = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Qc = ["data-dc-movable"], Zc = ["aria-label", "aria-pressed"], Jc = ["data-dc-space-name"], eu = { class: "dc-truncate" }, tu = ["aria-label"], nu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, su = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], au = { class: "dc-tab__name dc-truncate" }, ru = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, lu = ["aria-label", "data-dc-close", "onClick"], ou = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, iu = { class: "dc-pane__tools" }, cu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, uu = ["aria-label", "data-dc-minimize"], du = ["aria-label", "aria-pressed", "data-dc-maximize"], fu = ["aria-label", "data-dc-close"], pu = ["id", "role", "aria-labelledby"], vu = ["id", "role", "aria-labelledby"], mu = ["data-dc-edge"], hu = /* @__PURE__ */ ue({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = es(), s = Ts() ?? "dc-pane", a = g(
      () => t.group.panels.flatMap((L, K) => {
        if (!oe(L)) {
          const xe = yt(L) || At(L, (be) => n.panelFor(be)?.title);
          return [{ kind: "space", index: K, id: `space-${K}`, title: xe, node: L }];
        }
        const G = n.panelFor(L);
        return G ? [{ kind: "panel", index: K, id: L, title: G.title, panel: G }] : [];
      })
    ), r = g(() => a.value.length > 1), l = g(() => {
      const L = ut(t.group);
      return a.value.find((K) => K.index === L) ?? a.value[0] ?? null;
    }), i = g(() => l.value?.kind === "space" ? l.value.node : null), o = g(() => i.value ? "" : ha(t.group)), u = g(() => i.value ? null : n.panelFor(o.value)), f = g(() => l.value?.title ?? ""), y = g(() => n.spaceNames.value ? t.group.title ?? "" : ""), k = g(() => [...t.path, l.value?.index ?? 0]), m = g(() => o.value || ks(t.group)[0] || ""), $ = g(() => n.viewFor(o.value)), x = g(() => t.group.headless === !0), h = g(() => n.focused.value === o.value), w = g(() => n.dragging.value === o.value), E = g(() => n.moving.value === o.value), N = g(() => n.frameOf(m.value) !== null), T = g(() => n.panelFor(m.value)?.fixed === !0), F = g(
      () => !i.value && (n.canMove(o.value) || N.value && n.movable.value && !T.value)
    ), V = g(
      () => i.value ? n.spaceMenu(k.value) : n.menuFor(o.value)
    ), M = (L) => n.closable(L);
    Gc({ panel: o });
    const A = g(() => n.maximized(m.value)), J = g(
      () => N.value && !T.value || !r.value && !!u.value && M(u.value.id)
    ), le = (L) => `${s}-tab-${L}`, ve = g(() => `${s}-body`), Q = g(() => {
      const L = n.dropTarget.value;
      return !L || !Ee(t.group, L.panel) || L.edge === "float" ? null : L;
    }), Me = g(() => Q.value?.index === void 0 ? Q.value?.edge ?? null : null), Pe = g(() => Q.value?.index ?? null), D = () => u.value ? n.renderContent(u.value, $.value, h.value) ?? null : null, X = () => u.value ? n.renderActions(u.value, $.value, h.value) ?? null : null;
    let te = null;
    function ne(L) {
      const K = te !== null && Math.hypot(L.clientX - te.x, L.clientY - te.y) >= 4;
      return te = null, K;
    }
    const me = (L) => L.kind === "panel" ? L.id : ke(L.node);
    function Ce(L, K) {
      K.kind !== "space" && (n.focus(K.id), te = { x: L.clientX, y: L.clientY }, n.beginDrag(K.id, L));
    }
    function Xe(L, K) {
      if (ne(L)) return;
      const G = me(K);
      G && n.selectPanel(G);
    }
    function Ge(L) {
      o.value && n.focus(o.value), !L.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (N.value ? n.beginFrameDrag(m.value, L, "move") : n.beginDrag(o.value, L));
    }
    function Ye(L) {
      te = { x: L.clientX, y: L.clientY }, n.beginDrag(o.value, L);
    }
    function Qe(L) {
      ne(L) || n.toggleMoveMode(o.value);
    }
    const De = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ne(L) {
      if (!E.value) return;
      if (L.key === "Escape") {
        L.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const K = De[L.key];
      K && (L.preventDefault(), N.value ? n.nudgeFrame(o.value, K, L.shiftKey) : n.nudge(o.value, K, L.shiftKey));
    }
    function Ie(L) {
      !N.value || L.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(m.value);
    }
    function kt(L, K) {
      L.stopPropagation(), te = null, n.close(K);
    }
    function Kt(L, K) {
      const G = a.value.length;
      let xe = null;
      if (L.key === "ArrowRight" ? xe = (K + 1) % G : L.key === "ArrowLeft" ? xe = (K - 1 + G) % G : L.key === "Home" ? xe = 0 : L.key === "End" && (xe = G - 1), xe === null) return;
      L.preventDefault();
      const be = a.value[xe];
      if (!be) return;
      const $t = me(be);
      $t && n.selectPanel($t);
    }
    return (L, K) => l.value ? (p(), _("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": S(ks)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": N.value ? "true" : "false",
      "data-dc-maximized": A.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": h.value ? "true" : "false",
      "data-dc-dragging": w.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: K[7] || (K[7] = (G) => o.value && S(n).focus(o.value))
    }, [
      x.value ? O("", !0) : (p(), _("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": F.value ? "true" : "false",
        onPointerdown: Ge,
        onDblclick: Ie
      }, [
        F.value ? (p(), _("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": E.value,
          onPointerdown: Ye,
          onClick: Qe,
          onKeydown: Ne
        }, [...K[8] || (K[8] = [
          b("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Zc)) : O("", !0),
        y.value ? (p(), _("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": y.value
        }, [
          b("span", eu, z(y.value), 1)
        ], 8, Jc)) : O("", !0),
        b("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (p(!0), _(Y, null, ie(a.value, (G, xe) => (p(), _(Y, {
            key: G.id
          }, [
            Pe.value === xe ? (p(), _("span", nu)) : O("", !0),
            b("button", {
              id: le(G.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": G.kind === "panel" ? G.id : void 0,
              "data-dc-space": G.kind === "space" ? G.title : void 0,
              "aria-selected": G.index === l.value.index,
              "aria-controls": ve.value,
              tabindex: G.index === l.value.index ? 0 : -1,
              onPointerdown: (be) => Ce(be, G),
              onClick: (be) => Xe(be, G),
              onKeydown: (be) => Kt(be, xe)
            }, [
              b("span", au, z(G.title), 1),
              G.kind === "panel" && G.panel.subtitle ? (p(), _("span", ru, z(G.panel.subtitle), 1)) : O("", !0),
              r.value && G.kind === "panel" && M(G.id) ? (p(), _("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${G.title}`,
                "data-dc-close": G.id,
                onPointerdown: K[0] || (K[0] = Be(() => {
                }, ["stop"])),
                onClick: (be) => kt(be, G.id)
              }, [...K[9] || (K[9] = [
                b("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, lu)) : O("", !0)
            ], 40, su)
          ], 64))), 128)),
          Pe.value === a.value.length ? (p(), _("span", ou)) : O("", !0)
        ], 8, tu),
        b("div", iu, [
          pe(X),
          V.value.length ? (p(), ce(qn, {
            key: 0,
            items: V.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ]),
        J.value ? (p(), _("div", cu, [
          N.value && !T.value ? (p(), _("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": m.value,
            onPointerdown: K[1] || (K[1] = Be(() => {
            }, ["stop"])),
            onClick: K[2] || (K[2] = (G) => S(n).toggleMinimize(m.value))
          }, [
            pe(ht, { kind: "minimize" })
          ], 40, uu)) : O("", !0),
          N.value && !T.value ? (p(), _("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${A.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": A.value,
            "data-dc-maximize": m.value,
            onPointerdown: K[3] || (K[3] = Be(() => {
            }, ["stop"])),
            onClick: K[4] || (K[4] = (G) => S(n).toggleMaximize(m.value))
          }, [
            pe(ht, {
              kind: A.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, du)) : O("", !0),
          !r.value && u.value && M(u.value.id) ? (p(), _("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: K[5] || (K[5] = Be(() => {
            }, ["stop"])),
            onClick: K[6] || (K[6] = (G) => S(n).close(u.value.id))
          }, [
            pe(ht, { kind: "close" })
          ], 40, fu)) : O("", !0)
        ])) : O("", !0)
      ], 40, Qc)),
      i.value ? (p(), _("div", {
        key: 1,
        id: ve.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : le(l.value.id)
      }, [
        qe(L.$slots, "space", {
          node: i.value,
          path: k.value
        }, void 0, !0)
      ], 8, pu)) : (p(), _("div", {
        key: 2,
        id: ve.value,
        class: "dc-pane__body",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : le(o.value)
      }, [
        pe(D)
      ], 8, vu)),
      Me.value ? (p(), _("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Me.value,
        "aria-hidden": "true"
      }, null, 8, mu)) : O("", !0)
    ], 40, Yc)) : O("", !0);
  }
}), Pa = /* @__PURE__ */ de(hu, [["__scopeId", "data-v-44fd2b2d"]]), _u = ["data-dc-space", "data-dc-path", "aria-label"], gu = {
  key: 0,
  class: "dc-space__head"
}, yu = { class: "dc-space__title dc-truncate" }, bu = ["data-dc-direction"], wu = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, ku = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], $u = /* @__PURE__ */ ue({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = es(), s = q(null), a = g(() => B(t.node) ? t.node : null), r = g(() => wt(t.node) ? t.node : null), l = g(() => j(t.node) ? t.node : null), i = g(
      () => r.value ? r.value.children : l.value?.frames.map((D) => D.node) ?? []
    ), o = g(() => r.value ? Ue(r.value) : []), u = g(
      () => (l.value?.frames ?? []).map((D, X) => ({
        held: D,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: X,
        key: M(D.node),
        path: [...t.path, X]
      })).sort((D, X) => D.key < X.key ? -1 : D.key > X.key ? 1 : 0)
    ), f = g(() => yt(t.node)), y = g(() => n.spaceMenu(t.path)), k = g(() => t.node.headless === !0), m = g(() => l.value ? "desktop" : r.value?.direction ?? ""), $ = q(null), x = q(0);
    let h = null;
    $e(
      $,
      (D) => {
        h?.disconnect(), h = null, !(!D || typeof ResizeObserver > "u") && (x.value = D.clientWidth, h = new ResizeObserver(([X]) => {
          x.value = X?.contentRect.width ?? 0;
        }), h.observe(D));
      },
      { immediate: !0 }
    ), He(() => h?.disconnect());
    const w = g(() => {
      const D = Math.max(
        1,
        Math.floor((x.value + dt) / (Mn + dt))
      ), X = /* @__PURE__ */ new Map();
      let te = 0;
      for (const ne of u.value)
        ne.held.minimized === !0 && (X.set(ne.key, {
          x: dt + te % D * (Mn + dt),
          bottom: dt + Math.floor(te / D) * (va + dt)
        }), te += 1);
      return X;
    }), E = (D) => !!D && D.join("/") === t.path.join("/"), N = g(() => {
      const D = n.dropTarget.value, X = l.value;
      if (!X || !D?.rect || D.edge !== "float") return null;
      if (D.space) return E(D.space) ? D.rect : null;
      const te = ge(X, D.panel);
      return te && X.frames.includes(te) ? D.rect : null;
    }), T = g(() => {
      const D = n.dropTarget.value;
      return !!D && !D.rect && E(D.space);
    }), F = g(() => r.value?.direction === "row"), V = g(() => i.value.map((D, X) => [...t.path, X])), M = (D) => [...je(D)].sort().join("/"), A = (D) => {
      const X = je(D)[0];
      return (X ? n.panelFor(X)?.title : null) ?? X ?? "panel";
    }, J = (D) => {
      const X = i.value[D], te = i.value[D + 1];
      return !X || !te ? "Resize panels" : `Resize ${A(X)} and ${A(te)}`;
    }, le = (D) => {
      const X = o.value[D] ?? 0, te = o.value[D + 1] ?? 0, ne = X + te;
      return ne > 0 ? Math.round(X / ne * 100) : 50;
    };
    function ve() {
      const D = s.value, X = D ? F.value ? D.clientWidth : D.clientHeight : 0;
      return X <= 0 ? 0.05 : Math.min(n.minPanelSize.value / X, 0.4);
    }
    let Q = null;
    function Me(D, X) {
      const te = r.value, ne = s.value;
      if (!n.resizable.value || !te || !ne || D.button !== 0) return;
      const me = F.value ? ne.clientWidth : ne.clientHeight;
      if (me <= 0) return;
      const Ce = F.value ? D.clientX : D.clientY, Xe = Ue(te), Ge = Math.min(n.minPanelSize.value / me, 0.4);
      D.preventDefault();
      const Ye = (Ne) => {
        const Ie = ((F.value ? Ne.clientX : Ne.clientY) - Ce) / me;
        n.setSizes(t.path, Es(Xe, X, Ie, Ge));
      }, Qe = () => Q?.(), De = (Ne) => {
        Ne.key === "Escape" && (n.setSizes(t.path, Xe), Q?.());
      };
      Q = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", Qe), window.removeEventListener("keydown", De), Q = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", Qe), window.addEventListener("keydown", De);
    }
    He(() => Q?.());
    function Pe(D, X) {
      const te = r.value;
      if (!n.resizable.value || !te) return;
      const ne = F.value ? "ArrowRight" : "ArrowDown", me = F.value ? "ArrowLeft" : "ArrowUp", Ce = D.shiftKey ? 0.1 : 0.02;
      if (D.key !== ne && D.key !== me) return;
      const Xe = D.key === ne ? Ce : -Ce;
      D.preventDefault(), n.setSizes(t.path, Es(Ue(te), X, Xe, ve()));
    }
    return (D, X) => {
      const te = Fs("WindowNode", !0);
      return a.value ? (p(), ce(Pa, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: gt(({ node: ne, path: me }) => [
          pe(te, {
            node: ne,
            path: me,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (p(), _("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": m.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !k.value ? (p(), _("header", gu, [
          b("span", yu, z(f.value), 1),
          y.value.length ? (p(), ce(qn, {
            key: 0,
            items: y.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ])) : O("", !0),
        l.value ? (p(), _("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          N.value ? (p(), _("div", {
            key: 0,
            class: "dc-window__drop",
            style: ze({
              left: `${N.value.x}px`,
              top: `${N.value.y}px`,
              width: `${N.value.w}px`,
              height: `${N.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          (p(!0), _(Y, null, ie(u.value, (ne) => (p(), ce(Xc, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: w.value.get(ne.key) ?? null
          }, {
            default: gt(() => [
              pe(te, {
                node: ne.held.node,
                path: ne.path,
                framed: ne.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (p(), _("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          T.value ? (p(), _("div", wu)) : O("", !0),
          (p(!0), _(Y, null, ie(i.value, (ne, me) => (p(), _(Y, {
            key: M(ne)
          }, [
            b("div", {
              class: "dc-window__cell",
              style: ze({ flexGrow: o.value[me] ?? 1 })
            }, [
              pe(te, {
                node: ne,
                path: V.value[me] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            me < i.value.length - 1 ? (p(), _("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": F.value ? "vertical" : "horizontal",
              "aria-label": J(me),
              "aria-valuenow": le(me),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": S(n).resizable.value ? void 0 : "true",
              tabindex: S(n).resizable.value ? 0 : -1,
              onPointerdown: (Ce) => Me(Ce, me),
              onKeydown: (Ce) => Pe(Ce, me)
            }, null, 40, ku)) : O("", !0)
          ], 64))), 128))
        ], 8, bu)) : O("", !0)
      ], 8, _u));
    };
  }
}), xu = /* @__PURE__ */ de($u, [["__scopeId", "data-v-fb5b403f"]]), Mu = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Cu = {
  key: 1,
  class: "dc-window__empty"
}, Su = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Ut = 16, Eu = /* @__PURE__ */ ue({
  __name: "WindowFrame",
  props: /* @__PURE__ */ en({
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
  emits: /* @__PURE__ */ en(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Jt(e, "layout"), l = Jt(e, "views"), i = zn(), o = g(() => new Map(s.panels.map((c) => [c.id, c]))), u = g(() => s.panels.map((c) => c.id)), f = g(() => Ac(r.value, u.value)), y = q(null), k = q(null), m = q(null), $ = q(!0), x = q(null), h = q(null), w = q(null), E = q(""), N = q(null);
    function T() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function F(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function V() {
      return T().map((c) => ({ pane: c, order: F(c.element) })).sort((c, d) => {
        const v = Math.max(c.order.length, d.order.length);
        for (let C = 0; C < v; C += 1) {
          const P = (c.order[C] ?? -1) - (d.order[C] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const M = (c) => T().find((d) => d.panels.includes(c)) ?? null;
    function A(c) {
      const d = o.value.get(c);
      if (!d) return "";
      const v = l.value[c];
      return v && d.views?.some((C) => C.key === v) ? v : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function J(c, d) {
      l.value = { ...l.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const le = g(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ve(c) {
      return !s.movable || le.value < 1 || s.panels.length < 2 ? !1 : o.value.get(c)?.fixed !== !0;
    }
    function Q(c, d) {
      const v = f.value;
      !c || !v || c === v || (r.value = c, d && a("panel-move", d));
    }
    function Me(c, d, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const C = (d - c.left) / c.width, P = (v - c.top) / c.height, R = 0.3;
      return C > R && C < 1 - R && P > R && P < 1 - R ? "center" : [
        { edge: "left", distance: C },
        { edge: "right", distance: 1 - C },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (Z, I) => I.distance < Z.distance ? I : Z
      ).edge;
    }
    function Pe(c, d) {
      const v = [...c.querySelectorAll(".dc-tab")], C = v.findIndex((P) => {
        const R = P.getBoundingClientRect();
        return d < R.left + R.width / 2;
      });
      return C === -1 ? v.length : C;
    }
    function D(c, d, v) {
      for (const { panels: C, element: P } of V().reverse()) {
        const R = P.getBoundingClientRect();
        if (c < R.left || c > R.right || d < R.top || d > R.bottom) continue;
        const ae = C.find((U) => U !== v), Z = P.querySelector(".dc-pane__tabs"), I = Z?.getBoundingClientRect();
        if (Z && I && d >= I.top && d <= I.bottom)
          return ae ? { panel: ae, edge: "center", index: Pe(Z, c) } : null;
        const W = P.querySelector(":scope > .dc-pane__space");
        if (W) {
          const U = W.getBoundingClientRect();
          if (c >= U.left && c <= U.right && d >= U.top && d <= U.bottom) continue;
        }
        return ae ? { panel: ae, edge: Me(R, c, d) } : null;
      }
      return te(c, d, v) ?? Ce(c, d);
    }
    function X() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function te(c, d, v) {
      const C = f.value;
      if (!C) return null;
      for (const P of X()) {
        const R = P.getBoundingClientRect();
        if (c < R.left || c > R.right || d < R.top || d > R.bottom) continue;
        const ae = Xe(P), Z = ae.flatMap((se) => se.panels).find((se) => se !== v);
        if (!Z && ae.length > 0) return null;
        const I = ge(C, v)?.rect, W = mn(
          {
            x: c - R.left - 24,
            y: d - R.top - 12,
            w: I?.w ?? lt.w,
            h: I?.h ?? lt.h
          },
          { w: P.clientWidth, h: P.clientHeight },
          s.minPanelSize
        );
        if (Z) return { panel: Z, edge: "float", rect: W };
        const U = ne(P);
        return U ? { panel: "", space: U, edge: "float", rect: W } : null;
      }
      return null;
    }
    function ne(c) {
      const d = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return d == null ? null : d === "" ? [] : d.split("/").map(Number);
    }
    function me() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((d) => d.closest(".dc-window") === c).filter((d) => !d.querySelector(".dc-pane")).reverse().flatMap((d) => {
        const v = ne(d);
        return v ? [{ element: d, path: v }] : [];
      }) : [];
    }
    function Ce(c, d) {
      for (const { element: v, path: C } of me()) {
        if (v.dataset.dcSpace === "desktop") continue;
        const P = v.getBoundingClientRect();
        if (!(c < P.left || c > P.right || d < P.top || d > P.bottom))
          return { panel: "", space: C, edge: "center" };
      }
      return null;
    }
    function Xe(c) {
      return T().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let Ge = null;
    const Ye = (c) => c.altKey;
    function Qe(c, d) {
      if (!ve(c) || k.value || h.value || d.button !== 0) return;
      const v = d.clientX, C = d.clientY;
      let P = !1, R = Ye(d);
      const ae = () => {
        const re = w.value;
        re && (m.value = R ? te(re.x, re.y, c) : D(re.x, re.y, c));
      }, Z = (re) => {
        if (!P) {
          if (Math.hypot(re.clientX - v, re.clientY - C) < 4) return;
          P = !0, k.value = c, x.value = null;
        }
        R = Ye(re), $.value = !R, w.value = { x: re.clientX, y: re.clientY }, ae();
      }, I = (re) => {
        Ye(re) !== R && (R = !R, $.value = !R, P && ae());
      }, W = (re) => {
        Ge?.();
        const H = m.value, we = f.value;
        if (re && P && H && we) {
          const Ze = H.space ? Cs(we, c, H.space, H.rect) : H.edge === "float" && H.rect ? Ms(we, c, H.panel, H.rect) : Wt(we, c, H.panel, H.edge, H.index);
          Q(Ze, {
            panel: c,
            target: H.panel,
            edge: H.edge,
            ...H.space === void 0 ? {} : { space: H.space },
            ...H.index === void 0 ? {} : { index: H.index },
            ...H.rect === void 0 ? {} : { rect: H.rect }
          });
        }
        k.value = null, m.value = null, w.value = null, $.value = !0;
      }, U = () => W(!0), se = () => W(!1), fe = (re) => {
        if (re.key === "Escape") {
          W(!1);
          return;
        }
        I(re);
      };
      Ge = () => {
        window.removeEventListener("pointermove", Z), window.removeEventListener("pointerup", U), window.removeEventListener("pointercancel", se), window.removeEventListener("keydown", fe), window.removeEventListener("keyup", I), Ge = null;
      }, window.addEventListener("pointermove", Z), window.addEventListener("pointerup", U), window.addEventListener("pointercancel", se), window.addEventListener("keydown", fe), window.addEventListener("keyup", I);
    }
    He(() => Ge?.());
    let De = null;
    function Ne(c) {
      const d = N.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((P) => P.closest(".dc-window") === d)?.parentElement ?? null : null;
    }
    function Ie(c) {
      const d = f.value;
      return d ? En(d, c) : null;
    }
    function kt(c) {
      const d = f.value;
      if (!d) return;
      const v = Et(d, c);
      v !== d && (r.value = v);
    }
    function Kt(c) {
      const d = Ie(c);
      d && kt(d);
    }
    function L(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && Je(v);
    }
    function K(c) {
      const d = f.value, v = d ? ge(d, c) : null;
      return v !== null && at(v);
    }
    function G(c) {
      const d = f.value, v = d ? st(d, c) : null;
      return v ? ke(v.node) : "";
    }
    function xe(c) {
      const d = f.value, v = d ? st(d, c) : null;
      if (!d || !v) return;
      const C = ke(v.node);
      if (o.value.get(C)?.fixed === !0) return;
      const P = !at(v);
      let R = yc(d, c, P);
      R !== d && (P || (R = Et(R, c)), r.value = R, a("frame-minimize", { panel: C, minimized: P }));
    }
    function be(c) {
      const d = Ie(c);
      d && xe(d);
    }
    function $t(c) {
      const d = f.value, v = d ? st(d, c) : null;
      if (!d || !v) return;
      const C = ke(v.node);
      if (o.value.get(C)?.fixed === !0) return;
      const P = !Je(v);
      let R = gc(d, c, P);
      R !== d && (P && (R = Et(R, c)), r.value = R, a("frame-maximize", { panel: C, maximized: P }));
    }
    function ns(c) {
      const d = Ie(c);
      d && $t(d);
    }
    function ss(c, d, v) {
      const C = f.value, P = C ? st(C, c) : null;
      if (!C || !P || d.button !== 0 || k.value || h.value) return;
      const R = ke(P.node);
      if (o.value.get(R)?.fixed === !0 || Je(P) || at(P) || (v === "move" ? !s.movable : !s.resizable)) return;
      const ae = Ne(c), Z = bc(C, c);
      kt(c);
      const I = { w: ae?.clientWidth ?? 0, h: ae?.clientHeight ?? 0 }, W = { ...P.rect }, U = d.clientX, se = d.clientY, fe = s.minPanelSize;
      h.value = R;
      const re = (Se) => {
        const Oe = f.value;
        if (!Oe) return;
        const xt = xs(Oe, Z, mn(Se, I, fe));
        xt !== Oe && (r.value = xt);
      }, H = (Se) => {
        Se.preventDefault();
        const Oe = Se.clientX - U, xt = Se.clientY - se;
        re(
          v === "move" ? { ...W, x: W.x + Oe, y: W.y + xt } : $s(W, v, Oe, xt, fe)
        );
      }, we = (Se) => {
        if (De?.(), h.value = null, !Se) {
          re(W);
          return;
        }
        const Oe = f.value ? st(f.value, Z) : null;
        Oe && a("frame-change", { panel: G(Z), rect: Oe.rect });
      }, Ze = () => we(!0), tt = () => we(!1), nt = (Se) => {
        Se.key === "Escape" && we(!1);
      };
      De = () => {
        window.removeEventListener("pointermove", H), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", tt), window.removeEventListener("keydown", nt), De = null;
      }, window.addEventListener("pointermove", H), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", tt), window.addEventListener("keydown", nt);
    }
    function Aa(c, d, v) {
      const C = Ie(c);
      C && ss(C, d, v);
    }
    function za(c, d, v = !1) {
      const C = f.value, P = Ie(c), R = C && P ? st(C, P) : null;
      if (!C || !P || !R || o.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Je(R) || at(R)) {
        E.value = `${Te(c)} is ${Je(R) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ae = d === "left" ? -Ut : d === "right" ? Ut : 0, Z = d === "up" ? -Ut : d === "down" ? Ut : 0, I = Ne(P), W = { w: I?.clientWidth ?? 0, h: I?.clientHeight ?? 0 }, U = v ? $s(R.rect, "se", ae, Z, s.minPanelSize) : { ...R.rect, x: R.rect.x + ae, y: R.rect.y + Z }, se = xs(C, P, mn(U, W, s.minPanelSize));
      if (se === C) {
        E.value = v ? `${Te(c)} cannot be resized further.` : `${Te(c)} cannot move ${d}.`;
        return;
      }
      r.value = se;
      const fe = st(se, P);
      fe && (a("frame-change", { panel: c, rect: fe.rect }), E.value = v ? `${Te(c)} resized to ${fe.rect.w} by ${fe.rect.h}.` : `${Te(c)} moved to ${fe.rect.x}, ${fe.rect.y}.`);
    }
    He(() => De?.());
    function Ra(c, d) {
      const v = M(c), C = v?.element.getBoundingClientRect();
      if (!v || !C) return null;
      const P = d === "left" || d === "right", R = (I) => {
        if (!(P ? I.bottom > C.top + 1 && I.top < C.bottom - 1 : I.right > C.left + 1 && I.left < C.right - 1)) return null;
        const U = d === "left" ? C.left - I.right : d === "right" ? I.left - C.right : d === "up" ? C.top - I.bottom : I.top - C.bottom;
        return U < -1 ? null : U;
      }, ae = [];
      for (const I of T()) {
        if (I === v || I.element === v.element) continue;
        const W = R(I.element.getBoundingClientRect());
        if (W === null) continue;
        const U = I.panels.find((se) => se !== c);
        U && ae.push({ to: { panel: U }, distance: W });
      }
      for (const { element: I, path: W } of me()) {
        const U = R(I.getBoundingClientRect());
        U !== null && ae.push({ to: { space: W }, distance: U });
      }
      return ae.reduce(
        (I, W) => I && I.distance <= W.distance ? I : W,
        null
      )?.to ?? null;
    }
    function Ta(c) {
      const d = f.value ? ge(f.value, c) !== null : !1;
      if (!d && !ve(c)) return;
      x.value = x.value === c ? null : c;
      const v = Te(c);
      if (!x.value) {
        E.value = `${v}: move mode off.`;
        return;
      }
      E.value = d ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Te = (c) => o.value.get(c)?.title ?? c, Fa = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function La(c, d, v = !1) {
      if (!ve(c)) return;
      const C = f.value;
      if (!C) return;
      const P = Te(c), R = pt(C, c);
      if (!v && R && (d === "left" || d === "right") && R.panels.length > 1) {
        const se = R.panels.indexOf(c), fe = d === "left" ? se - 1 : se + 1;
        if (fe >= 0 && fe < R.panels.length) {
          Q(Pt(C, c, fe), { panel: c, target: c, edge: "center", index: fe }), E.value = `${P} moved ${d}, now tab ${fe + 1} of ${R.panels.length}.`, on(c);
          return;
        }
      }
      const Z = Ra(c, d);
      if (!Z || Z.panel !== void 0 && !ve(Z.panel)) {
        E.value = `${P} cannot move ${d}.`;
        return;
      }
      const I = Fa[d];
      if (Z.space) {
        const se = Z.space, fe = et(C, se), re = ge(C, c)?.rect, H = { ...lt, ...re ? { w: re.w, h: re.h } : {} };
        Q(Cs(C, c, se, H), { panel: c, target: "", space: se, edge: I }), E.value = `${P} moved ${d}, into ${fe ? yt(fe) : "the space"}.`, on(c);
        return;
      }
      const W = Z.panel, U = R?.panels.length === 1 && pt(C, W)?.panels.length === 1;
      v ? (Q(Wt(C, c, W, "center"), {
        panel: c,
        target: W,
        edge: "center"
      }), E.value = `${P} joined ${Te(W)} as a tab.`) : U ? (Q(Xt(C, c, W), { panel: c, target: W, edge: I }), E.value = `${P} moved ${d}, trading places with ${Te(W)}.`) : (Q(Wt(C, c, W, I), { panel: c, target: W, edge: I }), E.value = `${P} moved ${d}, beside ${Te(W)}.`), on(c);
    }
    function on(c) {
      zt(() => {
        M(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Da(c, d) {
      const v = f.value;
      v && (r.value = Gt(v, c, d));
    }
    function cn(c) {
      const d = f.value;
      if (!d) return;
      const v = mt(d, c);
      v !== d && (r.value = v, a("tab-select", { panel: c }));
    }
    function as(c) {
      return o.value.get(c)?.closable ?? s.closable;
    }
    function Na(c) {
      as(c) && a("panel-close", c);
    }
    const un = q(/* @__PURE__ */ new Map());
    let Ia = 0;
    function Oa(c, d) {
      const v = Ia += 1;
      return un.value.set(v, { panel: c, items: d }), () => {
        un.value.delete(v);
      };
    }
    function Va(c) {
      const d = [];
      for (const v of un.value.values())
        v.panel() === c && d.push(...v.items());
      return d;
    }
    function rs(c) {
      const d = c.filter((v) => v.items.length > 0);
      return d.length < 2 ? d.flatMap((v) => v.items) : d.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const ls = (c) => c.title || "These tabs";
    function Ka(c, d) {
      const v = d.id, C = pt(c, v), P = (C?.panels.length ?? 0) > 1, R = C?.fixedView === !0, ae = (U) => ({
        action: () => {
          U !== c && (r.value = U);
        }
      }), Z = [], I = [], W = d.views ?? [];
      if (W.length > 1 && !R) {
        const U = A(v);
        Z.push({
          id: "view",
          label: "View",
          items: W.map((se) => ({
            id: `view-${se.key}`,
            label: se.label,
            checked: se.key === U,
            action: () => J(v, se.key)
          }))
        });
      }
      return P && !R && I.push(
        { id: "show-row", label: "Row", checked: !1, ...ae(Ss(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ae(Ss(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ae(xc(c, v))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ae(Mc(c, v))
        }
      ), P && C && (I.length && I.push({ separator: !0 }), I.push(...os(C, v))), { panel: Z, tabs: I, tabsTitle: C ? ls(C) : "" };
    }
    function os(c, d) {
      const v = ut(c), C = (P) => {
        const R = c.panels[(v + P + c.panels.length) % c.panels.length];
        return (R === void 0 ? "" : ke(R)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => cn(C(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => cn(C(-1)) }
      ];
    }
    function Bt(c) {
      return c.title ? c.title : B(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : yt(c);
    }
    function is(c) {
      if (!c || j(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Re(c)) return null;
      const d = Ea(c);
      return d && d.fixedView !== !0 ? d : null;
    }
    function Ba(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const v = et(d, c);
      if (!v || B(v)) return [];
      if (v.fixedView) return [];
      const C = j(v) ? "desktop" : v.direction, P = (H, we, Ze) => ({
        id: `show-${H}`,
        label: we,
        checked: C === H,
        action: () => {
          const tt = f.value, nt = Ze();
          !tt || nt === v || (r.value = an(_e(it(tt, c, nt))));
        }
      }), R = () => {
        const H = xa(v, qa(v));
        if (B(H) && H.panels.length === 0) return v;
        const we = B(H) && H.panels.length === 1 ? H.panels[0] : void 0;
        return we !== void 0 && oe(we) ? v : H;
      }, ae = (H) => () => j(v) ? Sa(v, H) : v.direction === H ? v : { ...v, direction: H }, Z = c.slice(0, -1), I = c.length > 0 ? et(d, Z) : null, W = I && B(I) && I.panels.length > 1 ? I : null, U = I && is(I) === v ? I : null, se = is(v), fe = v.title || "this space", re = (H, we, Ze, tt, nt) => ({
        id: H,
        label: nt,
        action: () => {
          const Se = f.value;
          Se && (r.value = an(_e(it(Se, we, Ec(Ze, tt)))));
        }
      });
      return rs([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            P("row", "Row", ae("row")),
            P("column", "Column", ae("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            P("tabs", "Tabs", () => R()),
            P("desktop", "Desktop", () => j(v) ? v : Ca(v))
          ]
        },
        {
          id: "about-around",
          title: se ? `Around ${Bt(se)}` : "",
          items: se ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...se.title ? [] : [re("merge-around-keep-this", c, v, "outer", `Keep ${fe}`)],
            ...v.title ? [] : [re("merge-around-keep-that", c, v, "inner", `Keep ${Bt(se)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: U ? `Inside ${Bt(U)}` : "",
          items: U ? [
            ...v.title ? [] : [re("merge-inside-keep-that", Z, U, "outer", `Keep ${Bt(U)}`)],
            ...U.title ? [] : [re("merge-inside-keep-this", Z, U, "inner", `Keep ${fe}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: W ? ls(W) : "",
          items: W ? os(W, ke(v)) : []
        }
      ]);
    }
    function qa(c) {
      const d = y.value;
      return d && ee(c, d) ? d : void 0;
    }
    function Wa(c) {
      const d = f.value, v = o.value.get(c);
      if (!d || !v) return [];
      const C = s.menu ? Ka(d, v) : null, P = Va(c);
      P.length && C?.panel.length && P.push({ separator: !0 }), C && P.push(...C.panel);
      const R = rs([
        { id: "about-panel", title: v.title, items: P },
        { id: "about-tabs", title: C?.tabsTitle ?? "", items: C?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, R) : R;
    }
    function Ua(c, d) {
      return i[`${c}-${d}`] ?? i[c];
    }
    function cs(c, d, v, C) {
      return Ua(c, d.id)?.({ panel: d, view: v, active: C });
    }
    zc({
      panelFor: (c) => o.value.get(c) ?? null,
      viewFor: A,
      setView: J,
      movable: g(() => s.movable),
      resizable: g(() => s.resizable),
      minPanelSize: g(() => s.minPanelSize),
      spaceNames: g(() => s.spaceNames),
      focused: y,
      dragging: k,
      dropTarget: m,
      moving: x,
      framing: h,
      canMove: ve,
      focus(c) {
        y.value !== c && (y.value = c, a("panel-activate", c));
      },
      selectPanel: cn,
      beginDrag: Qe,
      toggleMoveMode: Ta,
      nudge: La,
      setSizes: Da,
      frameOf: (c) => f.value ? ge(f.value, c) : null,
      beginFrameDrag: Aa,
      nudgeFrame: za,
      raise: Kt,
      maximized: L,
      toggleMaximize: ns,
      minimized: K,
      toggleMinimize: be,
      beginFrameDragAt: ss,
      raiseAt: kt,
      toggleMaximizeAt: $t,
      toggleMinimizeAt: xe,
      menuFor: Wa,
      spaceMenu: Ba,
      registerMenu: Oa,
      closable: as,
      close: Na,
      renderContent: (c, d, v) => cs("panel", c, d, v),
      renderActions: (c, d, v) => cs("actions", c, d, v),
      layout: f
    });
    const Ha = g(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), ja = () => {
      const c = k.value, d = w.value;
      return !c || !d ? null : Ya(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${d.x}px`, top: `${d.y}px` },
          "aria-hidden": "true"
        },
        o.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: f,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, d, v, C) {
        const P = f.value;
        P && Q(Wt(P, c, d, v, C), {
          panel: c,
          target: d,
          edge: v,
          ...C === void 0 ? {} : { index: C }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const d = f.value;
        d && (r.value = mt(d, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, d, v) {
        const C = f.value;
        C && Q(Ms(C, c, d, v), {
          panel: c,
          target: d,
          edge: "float",
          rect: v
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, d) {
        const v = f.value;
        if (!v) return;
        const C = mc(v, c, d);
        if (C === v) return;
        r.value = C;
        const P = ge(C, c);
        P && a("frame-change", { panel: c, rect: P.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: J,
      /** Brings a floating frame to the front of its stack. */
      raise: Kt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ns,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: be
    }), (c, d) => (p(), _("div", {
      ref_key: "root",
      ref: N,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": k.value ? "true" : "false",
      "data-dc-docking": $.value ? "true" : "false",
      style: ze(Ha.value)
    }, [
      f.value ? (p(), ce(xu, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (p(), _("p", Cu, " This window has no panels. ")),
      pe(ja),
      b("p", Su, z(E.value), 1)
    ], 12, Mu));
  }
}), Pu = /* @__PURE__ */ de(Eu, [["__scopeId", "data-v-711565af"]]);
function Xu(e = "", t = "/") {
  const n = q(We(e)), s = q(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = We(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = We(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function As(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function Gu(e) {
  const t = q(As(e.currentRoute.value.fullPath)), n = g(() => e.currentRoute.value.path), s = $e(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = As(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${We(a)}`),
    replace: (a) => e.replace(`${n.value}${We(a)}`),
    dispose: s
  };
}
const Au = {
  DataShell: Gi,
  ShellHeader: ta,
  QueryPanel: sa,
  ResultsArea: da,
  FacetControl: na,
  SegmentedControl: $n,
  StatusPill: Ft,
  WindowFrame: Pu,
  WindowPane: Pa,
  ListView: xn,
  CardsView: ra,
  GridView: la,
  TableView: ca,
  LinksView: oa,
  PreviewView: ia,
  TypeCardsView: ua
}, Yu = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(Au))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ls, t.route);
  }
};
export {
  sn as CASCADE_STEP,
  Fu as COLUMN_BREAKPOINTS,
  Tu as COLUMN_ROLES,
  ra as CardsView,
  ws as ColumnCell,
  lt as DEFAULT_FRAME,
  yn as DEFAULT_SORT,
  Za as DEFAULT_VIEW,
  Gi as DataShell,
  fs as EMPTY_CELL,
  Qs as ENTITY_ALL,
  kn as ENTITY_TERM,
  nn as EXPRESSION_TERM,
  Kn as FACET_PREFIX,
  na as FacetControl,
  la as GridView,
  Yu as HeaderContentLayoutPlugin,
  oa as LinksView,
  xn as ListView,
  dt as MINIMIZED_GAP,
  va as MINIMIZED_HEIGHT,
  Mn as MINIMIZED_WIDTH,
  pa as MIN_FRAME,
  _s as MOCK_TINTS,
  Du as MenuBar,
  qn as MenuButton,
  fa as MenuList,
  Lt as MetricDrill,
  ts as PANE_CONTEXT_KEY,
  In as PARAM_DIR,
  Ln as PARAM_ENTITY,
  On as PARAM_EXPR,
  Vn as PARAM_PAGE,
  Nn as PARAM_SORT,
  Dn as PARAM_VIEW,
  Bn as PinStar,
  ia as PreviewView,
  sa as QueryPanel,
  qt as RECORD_STATUSES,
  Ws as RESULT_FIELDS,
  Ls as ROUTE_ADAPTER_KEY,
  da as ResultsArea,
  Ys as SHELL_CONTEXT_KEY,
  Ru as SHELL_THEMES,
  Dt as ScopeMark,
  $n as SegmentedControl,
  ta as ShellHeader,
  Ft as StatusPill,
  ca as TableView,
  ua as TypeCardsView,
  Ds as VIEW_KINDS,
  Jn as WINDOW_CONTEXT_KEY,
  Pu as WindowFrame,
  Pa as WindowPane,
  ha as activePanel,
  ut as activeTab,
  Rr as addTerm,
  pc as axisOf,
  Hn as cascade,
  js as cellFull,
  Tt as cellText,
  dn as cellTextOf,
  Ae as cellValue,
  ds as changesResults,
  mn as clampRect,
  xa as collapseSpace,
  xc as collapseToTabs,
  Iu as column,
  vs as columnAlign,
  ms as columnClass,
  ps as columnKey,
  bn as columnTruncates,
  ar as columnsFor,
  er as countPages,
  Qa as createHistoryAdapter,
  Xu as createMemoryAdapter,
  Er as createMockDataSource,
  Gu as createVueRouterAdapter,
  or as defaultCellText,
  Ps as defaultLayout,
  Fn as defaultQuery,
  Tr as drillExpression,
  Cs as dropIntoSpace,
  tn as emptyFacetState,
  Rn as emptyFacetValue,
  ft as findEntity,
  rt as findSort,
  Vu as fixedView,
  Un as float,
  Ms as floatPanel,
  Ca as floatSplit,
  Mc as floatTabs,
  Ht as fnv1a,
  Is as focusEntity,
  nr as formatDate,
  _r as formatExpression,
  tr as formatMetric,
  sr as formatOrdinal,
  Xs as formatTerm,
  rn as frame,
  st as frameAt,
  ge as frameOf,
  En as framePathOf,
  ke as frontPanel,
  Mr as generateRows,
  Nu as group,
  pt as groupOf,
  vc as groups,
  Bs as hasActiveFacets,
  ee as hasPanel,
  Ou as headless,
  Ct as insertPanel,
  St as isChoosable,
  Lu as isEntityScoped,
  Ks as isFacetActive,
  j as isFloat,
  B as isGroup,
  Je as isMaximized,
  at as isMinimized,
  oe as isPanelTab,
  Tn as isPristineQuery,
  wt as isSplit,
  Ee as isTabOf,
  qs as isTypeCardsQuery,
  Ns as isViewKind,
  hr as matchesExpression,
  Cr as matchesFacets,
  hc as maximizeFrame,
  gc as maximizeFrameAt,
  Ec as mergeSpace,
  _c as minimizeFrame,
  yc as minimizeFrameAt,
  Wt as movePanel,
  Pt as moveTab,
  et as nodeAt,
  At as nodeTitle,
  _e as normalizeLayout,
  We as normalizeSearch,
  Qn as normalizeSizes,
  Ea as onlySpace,
  je as panelIds,
  Le as panelNode,
  ks as panelTabs,
  Rt as parseExpression,
  Vr as parseQuery,
  Ql as presentParts,
  aa as presentRow,
  Gc as providePaneContext,
  Fr as provideShellContext,
  zc as provideWindowContext,
  hn as raiseFrame,
  Et as raiseFrameAt,
  bc as raisedPath,
  Us as reconcileFacets,
  Ac as reconcileLayout,
  ot as removePanel,
  it as replaceAt,
  $s as resizeRect,
  Es as resizeSplit,
  Ke as roleColumn,
  Hs as roleColumns,
  an as rootSpace,
  Xn as row,
  lr as rowKey,
  Pr as scopeTerm,
  Ar as scopeTermFor,
  bs as serializeQuery,
  mt as setActivePanel,
  mc as setFrameRect,
  xs as setFrameRectAt,
  Gt as setSizesAt,
  qu as setSplitDirection,
  Ue as sizesOf,
  Vs as sortsFor,
  he as spaceChrome,
  yt as spaceTitle,
  jn as split,
  Ss as spreadTabs,
  Br as summarizeQuery,
  ea as summaryTerms,
  Xt as swapPanels,
  Wn as tabNode,
  It as tabPanels,
  Sa as tileFloat,
  Wu as toFloat,
  Uu as toTiled,
  Ku as toggleMaximized,
  Bu as toggleMinimized,
  ri as useColumns,
  gi as useEntityPreviews,
  Hu as usePaneContext,
  ju as usePaneMenu,
  bt as usePresentedRows,
  qr as useQueryState,
  Wr as useResults,
  ye as useShellContext,
  es as useWindowContext,
  gr as withoutTerm
};
