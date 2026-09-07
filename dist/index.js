import { ref as X, inject as _t, provide as Tn, computed as m, toValue as St, shallowRef as Ft, watch as be, onScopeDispose as Is, defineComponent as fe, onBeforeUnmount as He, openBlock as p, createElementBlock as h, createElementVNode as g, toDisplayString as T, unref as C, Fragment as ee, renderList as ue, createCommentVNode as O, renderSlot as qe, withDirectives as wn, withKeys as Pt, withModifiers as De, vModelText as bn, normalizeClass as an, useSlots as Ln, nextTick as Dt, createBlock as oe, createVNode as ve, createTextVNode as Ae, withCtx as gt, normalizeStyle as Re, resolveDynamicComponent as Ns, useModel as At, useId as Os, createSlots as ms, mergeModels as ln, onMounted as nl, resolveComponent as Vs, getCurrentScope as sl, h as al } from "vue";
const Ks = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ll() {
  const e = typeof window < "u", t = X(e ? We(window.location.search) : ""), n = X(e ? window.location.pathname : "/"), s = () => {
    t.value = We(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (l, r) => {
    const i = We(l);
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
    push: (l) => a(l, "push"),
    replace: (l) => a(l, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", s);
    }
  };
}
const Fn = ["list", "cards", "grid", "table", "links", "preview"], od = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Yt = ["ok", "running", "queued", "review", "failed"], id = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "tint"
], cd = [480, 620, 760, 900, 1100], rl = "cards", kn = "updated";
function Bs(e) {
  return typeof e == "string" && Fn.includes(e);
}
const qs = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Ws(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Us(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Hs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function js(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Hs(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const ol = { key: kn, label: kn };
function et(e, t, n = null) {
  const s = js(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === kn) ?? s[0] ?? ol;
}
function Dn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function It(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Dn(n);
  return t;
}
function Xs(e) {
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
function Gs(e) {
  return Object.values(e).some(Xs);
}
function In(e) {
  return e.entity === null && e.expr.trim() === "" && !Gs(e.facets);
}
function ud(e) {
  return e.entity !== null;
}
function Nn(e) {
  return e.entity === null && e.view === "cards";
}
function il(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function On(e, t = {}) {
  const s = t.landing === "entity" ? Us(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Bs(t.view) ? t.view : rl,
    sort: et(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: It(s),
    page: 1
  };
}
const Ys = ["entity", "sort", "dir", "expr", "facets"];
function hs(e) {
  return Ys.some((t) => t in e);
}
function Qs(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Dn(s);
  }
  return n;
}
function Jt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function cl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function _s(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function ul(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function dl(e) {
  return String(e + 1).padStart(2, "0");
}
const $n = "—";
function Fe(e, t) {
  return e.find((n) => n.role === t);
}
function Zs(e, t) {
  return e.filter((n) => n.role === t);
}
function fl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const pl = ["id", "entityKey", "entityLabel"];
function ze(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (pl.includes(n))
      return t[n];
  }
}
function gs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function vl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function ml(e, t) {
  if (e == null || e === "") return $n;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? cl(n) : String(e);
  }
  return t === "date" ? ul(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : $n : String(e);
}
function Ot(e, t) {
  const n = ze(e, t);
  return e.format ? e.format(n, t) : ml(n, e.kind);
}
function hl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Js(e, t) {
  const n = Ot(e, t), s = hl(ze(e, t));
  return s && s !== n ? s : n;
}
function en(e, t) {
  return e ? Ot(e, t) : "";
}
function ys(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const _l = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function ws(e) {
  return [_l[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function xn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const gl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function yl(e) {
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
function yt(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of yl(t)) {
    const l = a.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const r = gl.exec(a);
    r && r[3] !== "" ? s.push({
      kind: "field",
      field: r[1].toLowerCase(),
      comparator: r[2],
      value: r[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const mn = (e) => e.toLowerCase().replace(/\s+/g, ""), wl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function bl(e, t, n) {
  const s = mn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && mn(u.label) === s
  );
  if (l) return ze(l, t);
  const r = n.facets.find((u) => mn(u.label) === s);
  if (r && r.key in t.fields) return t.fields[r.key];
  const i = wl.find(([u]) => u === s)?.[1];
  if (i) {
    const u = Fe(a, i);
    if (u) return ze(u, t);
  }
  const o = /^metric(\d+)$/.exec(s);
  if (o) {
    const u = Zs(a, "metric")[Number(o[1]) - 1];
    if (u) return ze(u, t);
  }
}
function hn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function kl(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const o = Fe(r, i), u = o ? ze(o, t) : void 0;
      return typeof u == "string" && hn(u, e.value);
    });
  }
  const s = bl(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((i) => hn(String(i), e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const r = e.value.toLowerCase();
      return r === "true" || r === "yes" ? s : r === "false" || r === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const r = Number(e.value);
      return Number.isFinite(r) ? s === r : !0;
    }
    return hn(String(s), e.value);
  }
  const a = Number(e.value), l = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(l) ? !0 : $l(e.comparator, l, a);
}
function $l(e, t, n) {
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
function xl(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => kl(a, t, n))) : !0;
}
function bs(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Vt(e) {
  return e.kind === "text" ? bs(e.value) : `${e.field}${e.comparator}${bs(e.value)}`;
}
function Cl(e) {
  return e.filter((t) => t.length).map((t) => t.map(Vt).join(" ")).join(" OR ");
}
function Ml(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, r) => r !== n) : s).filter((s) => s.length);
}
function Sl(e) {
  const t = yt(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(Vt).join(" ")
  };
}
function ks(e, t) {
  return [...e.map(Vt), t.trim()].filter(Boolean).join(" ");
}
const $s = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function ea(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const El = 7, Pl = 3;
function Al(e, t, n, s) {
  const a = (t * El + Jt(n)) % s, l = [];
  for (let r = 0; r < Math.min(Pl, s); r++)
    l.push(ea(e, (a + r) % s));
  return l;
}
function zl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Rl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Rl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) a.add((s + l) % e.length);
  return [...a].sort((l, r) => l - r).map((l) => e[l]);
}
function Tl(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: l } = t, r = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${r}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return Yt[n % Yt.length];
    case "updated":
      return l;
    case "tint":
      return $s[n % $s.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Yt[n % Yt.length];
    case "date":
      return l;
    default:
      return;
  }
}
function Ll(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const u = l[o % l.length], d = Math.floor(o / l.length), _ = Jt(`${s}:${e.key}:${u[0]}:${o}`), b = ea(e.key, o), y = new Date(a.getTime() - _ % 900 * 36e5).toISOString(), k = {};
    for (const w of e.columns ?? []) {
      const $ = w.field ?? w.key;
      if (!$ || w.value) continue;
      const A = Tl(w, {
        hash: Jt(`${_}:${$}`),
        sample: u,
        revision: d,
        updatedAt: y
      });
      A !== void 0 && (k[$] = A);
    }
    for (const w of e.facets)
      k[w.key] = zl(w, Jt(`${_}:${w.key}`));
    for (const [w, $] of r)
      k[w] = $ === e.key ? b : Al($, o, w, n);
    i.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return i;
}
function Fl(e, t) {
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
function Dl(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", l = s === "date" || n.role === "updated";
  return (r, i) => {
    const o = ze(n, r), u = ze(n, i);
    return a ? Number(u ?? 0) - Number(o ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(o ?? "")) : String(u ?? "").localeCompare(String(o ?? ""));
  };
}
function Il(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const r = e.scopes ?? a.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = Ll(s, { ...e, scopes: r });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: r, offset: i }) {
      const o = yt(s.expr), u = l ? [l] : a.entities, d = [], _ = [];
      for (const k of u)
        for (const w of n(k, a))
          d.push(w), (l ? Fl(w, s.facets) : !0) && xl(o, w, k) && _.push(w);
      const b = et(l, s.sort, a), y = _.sort(Dl(Hs(l, a), b.key));
      return s.dir === "asc" && y.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: y.slice(i, i + r),
        total: _.length,
        unfiltered: _.length === d.length
      };
    }
  };
}
function Nl(e, t) {
  return ta(e, t.id);
}
function ta(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Ol(e, t) {
  return Nl(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
const xs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Vl(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && xs(e.value, t.value) : t.kind === "text" && xs(e.value, t.value);
}
function Kl(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = yt(t).flat();
  return s ? yt(n).some(
    (l) => l.some((r) => Vl(r, s))
  ) ? n : `${n} ${t}` : n;
}
function Bl(e, t, n) {
  return Kl(t.expr, Ol(e, n));
}
function ql(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const na = Symbol("dc.shellContext");
function Wl(e) {
  return Tn(na, e), e;
}
function ye() {
  const e = _t(na, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Vn = "e", Kn = "v", Bn = "s", qn = "d", Wn = "q", Un = "p", Hn = "f_", sa = "*", Ul = [
  Vn,
  Kn,
  Bn,
  qn,
  Wn,
  Un
], Cn = "..", aa = ",", Hl = [
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
function _n(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Hl) t = t.replace(n, s);
  return t;
}
function Be(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function la(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), l = a === -1 ? s : s.slice(0, a), r = a === -1 ? "" : s.slice(a + 1);
    n.push([Be(l), r]);
  }
  return n;
}
function jl(e) {
  return Ul.includes(e) || e.startsWith(Hn);
}
function Cs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Xl(e, t) {
  const n = Be(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(aa).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => s.has(l)) };
    }
    case "range": {
      const s = n.indexOf(Cn), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + Cn.length)).trim(), r = a === "" ? null : Number(a), i = l === "" ? null : Number(l);
      let o = r !== null && Number.isFinite(r) ? Cs(r, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? Cs(i, e.min, e.max) : null;
      return o !== null && u !== null && o > u && ([o, u] = [u, o]), { kind: "range", min: o, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Gl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(aa) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Cn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Yl(e, t, n = {}) {
  const s = On(t, n), a = new Map(la(e)), l = a.get(Vn), r = l === void 0 ? s.entity : Be(l), i = r === sa ? null : ft(t, r), o = a.get(Kn), u = o && Bs(Be(o)) ? Be(o) : s.view, d = a.get(Bn), _ = et(i, d ? Be(d) : n.sort, t), b = a.get(qn), y = b ? Be(b) === "asc" ? "asc" : "desc" : s.dir, k = a.get(Wn), w = a.get(Un), $ = w === void 0 ? 1 : Number(Be(w)), A = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1, P = {};
  for (const E of i?.facets ?? []) {
    const x = a.get(`${Hn}${E.key}`);
    P[E.key] = x === void 0 ? Dn(E) : Xl(E, x);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: _.key,
    dir: y,
    expr: k === void 0 ? "" : Be(k),
    facets: Qs(i, P),
    page: A
  };
}
function Ms(e, t, n = {}, s = "") {
  const a = On(t, n), l = ft(t, e.entity), r = la(s).filter(([_]) => !jl(_)), i = [], o = (_, b) => i.push([_, _n(b)]), u = l?.key ?? null;
  u !== a.entity && o(Vn, u ?? sa), e.view !== a.view && o(Kn, e.view), e.sort !== a.sort && o(Bn, e.sort), e.dir !== a.dir && o(qn, e.dir), e.expr.trim() !== "" && o(Wn, e.expr);
  for (const _ of l?.facets ?? []) {
    const b = e.facets[_.key];
    if (!b) continue;
    const y = Gl(b, _);
    y !== null && i.push([`${Hn}${_.key}`, _n(y)]);
  }
  e.page > 1 && o(Un, String(e.page));
  const d = [
    ...r.map(([_, b]) => [_n(_), b]),
    ...i
  ];
  return d.length ? `?${d.map(([_, b]) => b === "" ? _ : `${_}=${b}`).join("&")}` : "";
}
const rn = "entity", Nt = "expr";
function Ql(e, t) {
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
function ra(e, t) {
  const n = [];
  t && n.push({
    id: rn,
    label: `entity:${t.key}`,
    facetKey: rn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Xs(a) && n.push(...Ql(s, a));
  }
  return yt(e.expr).forEach((s, a) => {
    s.forEach((l, r) => {
      n.push({
        id: `${Nt}:${a}:${r}`,
        label: Vt(l),
        facetKey: Nt,
        group: a,
        index: r,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {}
      });
    });
  }), n;
}
function Zl(e, t, n = null) {
  if (In(e)) {
    const l = et(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = ra(e, t).filter((l) => l.facetKey !== Nt).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function Jl(e) {
  const { adapter: t } = e, n = m(() => St(e.schema)), s = m(() => St(e.defaults) ?? {}), a = m(() => Yl(t.search.value, n.value, s.value)), l = m(() => ft(n.value, a.value.entity)), r = m(() => l.value ?? Us(n.value, s.value)), i = m(() => js(l.value, n.value)), o = m(() => et(l.value, a.value.sort, n.value)), u = ($, A) => {
    const P = Ms($, n.value, s.value, t.search.value);
    P !== t.search.value && (A === "push" ? t.push(P) : t.replace(P));
  }, d = () => St(e.navigationMode) ?? "push", _ = () => St(e.facetNavigationMode) ?? "replace", b = ($, A) => {
    const P = $.page ?? (hs($) ? 1 : a.value.page);
    u({ ...a.value, ...$, page: P }, A);
  }, y = ($, A) => {
    const P = a.value.facets[$];
    if (!P) return;
    const E = { ...a.value.facets, [$]: A(P) };
    b({ facets: E }, _());
  }, k = ($) => {
    const A = $ === null ? null : ft(n.value, $);
    return (A?.key ?? null) === a.value.entity ? {} : {
      entity: A?.key ?? null,
      sort: et(A, a.value.sort, n.value).key,
      facets: It(A)
    };
  }, w = ($) => {
    const A = k($);
    Object.keys(A).length && b(A, d());
  };
  return {
    query: a,
    entity: l,
    focus: r,
    sort: o,
    sorts: i,
    summary: m(() => Zl(a.value, l.value, n.value)),
    terms: m(() => ra(a.value, l.value)),
    isPristine: m(() => In(a.value)),
    isEverything: m(() => a.value.entity === null),
    hasFacets: m(() => Gs(a.value.facets)),
    setEntity: w,
    clearEntity: () => w(null),
    setView($) {
      b({ view: $ }, d());
    },
    setSort($) {
      b({ sort: et(l.value, $, n.value).key }, d());
    },
    toggleDirection() {
      b({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression($) {
      b({ expr: $ }, d());
    },
    narrow($, A) {
      b({ expr: $, ...k(A) }, d());
    },
    setPage($, A) {
      b({ page: Math.max(1, Math.floor($)) }, A ?? d());
    },
    setFacet($, A) {
      y($, () => A);
    },
    toggleChip($, A) {
      y($, (P) => P.kind !== "chips" ? P : { kind: "chips", selected: P.selected.includes(A) ? P.selected.filter((x) => x !== A) : [...P.selected, A] });
    },
    setRange($, A, P) {
      y($, (E) => E.kind === "range" ? { kind: "range", min: A, max: P } : E);
    },
    toggleFlag($) {
      y(
        $,
        (A) => A.kind === "toggle" ? { kind: "toggle", on: !A.on } : A
      );
    },
    removeTerm($) {
      if ($.facetKey === rn) {
        w(null);
        return;
      }
      if ($.facetKey === Nt) {
        const A = Ml(yt(a.value.expr), $.group ?? 0, $.index ?? 0);
        b({ expr: Cl(A) }, d());
        return;
      }
      y($.facetKey, (A) => A.kind === "chips" && $.option ? { kind: "chips", selected: A.selected.filter((P) => P !== $.option) } : A.kind === "range" ? { kind: "range", min: null, max: null } : A.kind === "toggle" ? { kind: "toggle", on: !1 } : A);
    },
    clearFilters() {
      b({ entity: null, expr: "", facets: It(null) }, d());
    },
    reset() {
      u(On(n.value, s.value), d());
    },
    hrefFor($) {
      const A = { ...a.value, ...$ };
      return A.page = $.page ?? (hs($) ? 1 : a.value.page), A.facets = Qs(ft(n.value, A.entity), A.facets), `${t.path.value}${Ms(A, n.value, s.value, t.search.value)}`;
    }
  };
}
function er(e) {
  const t = Ft([]), n = X(0), s = X(!1), a = Ft(null);
  let l = 0, r = null;
  const i = m(() => (e.query.value.page - 1) * e.limit.value), o = m(() => il(n.value, e.limit.value)), u = (w) => {
    t.value = w.rows, n.value = w.total, a.value = null;
  }, d = (w) => {
    a.value = w, t.value = [], n.value = 0;
  }, _ = (w, $) => {
    let A = !0;
    const P = () => w === l, E = () => {
      A && (A = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return P();
      },
      insert(x, I) {
        if (!P()) return;
        const V = Array.isArray(x) ? x : [x];
        if (!V.length) return;
        E();
        const S = [...t.value];
        S.splice(I ?? S.length, 0, ...V), t.value = $ > 0 ? S.slice(0, $) : S, n.value += V.length;
      },
      set(x) {
        P() && (x.rows && (E(), t.value = $ > 0 ? x.rows.slice(0, $) : x.rows, n.value = x.rows.length), x.total !== void 0 && (n.value = x.total));
      },
      close() {
        P() && (s.value = !1);
      },
      fail(x) {
        P() && (d(x), s.value = !1);
      }
    };
  }, b = () => {
    const w = r;
    r = null, w?.();
  }, y = () => {
    const w = ++l;
    b();
    const $ = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, A = e.source.value;
    if (A.stream) {
      s.value = !0;
      try {
        r = A.stream($, _(w, $.limit)) ?? null;
      } catch (E) {
        d(E), s.value = !1;
      }
      return;
    }
    let P;
    try {
      P = A.query($);
    } catch (E) {
      d(E);
      return;
    }
    if (!(P instanceof Promise)) {
      u(P), s.value = !1;
      return;
    }
    s.value = !0, P.then((E) => {
      w === l && u(E);
    }).catch((E) => {
      w === l && d(E);
    }).finally(() => {
      w === l && (s.value = !1);
    });
  }, k = m(
    () => `${JSON.stringify(Ys.map((w) => e.query.value[w]))}|${e.query.value.page}`
  );
  return be([e.source, k, e.schema, e.entity, e.limit], y, {
    immediate: !0
  }), Is(() => {
    l++, b();
  }, !0), { rows: t, total: n, offset: i, pageCount: o, pending: s, error: a, refresh: y };
}
const tr = 25, oa = (e, t) => e.toLowerCase() === t.toLowerCase();
function nr(e, t) {
  return e.find((n) => oa(n.id, t));
}
function sr(e) {
  const t = Ft(/* @__PURE__ */ new Map()), n = (r) => {
    if (r.facetKey !== Nt || !r.field || !r.value) return null;
    const i = ql(e.schema.value, r.field);
    return i ? { entity: i, id: r.value, key: `${i.key}:${r.value}` } : null;
  }, s = (r) => {
    const { entity: i, id: o } = r, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ta(i, o) ?? "",
        facets: It(i),
        sort: et(i, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: tr,
      offset: 0
    });
  }, a = (r, i) => {
    const o = en(Fe(r.columns ?? [], "identity"), i);
    return o === $n || oa(o, i.id) ? "" : o;
  }, l = () => {
    const r = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const d = n(u);
      d && !t.value.has(d.key) && r.set(d.key, d);
    }
    if (!r.size) return;
    const i = [...r.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), o = (u) => {
      const d = new Map(t.value);
      u.forEach((_, b) => {
        const { reference: y } = i[b], k = nr(_.rows, y.id);
        d.set(y.key, k ? a(y.entity, k) : "");
      }), t.value = d;
    };
    if (i.every(({ outcome: u }) => !(u instanceof Promise))) {
      o(i.map(({ outcome: u }) => u));
      return;
    }
    Promise.all(i.map(({ outcome: u }) => Promise.resolve(u))).then(o).catch(() => {
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
      const i = n(r);
      return i && t.value.get(i.key) || null;
    }
  };
}
const ar = ["data-dc-expanded"], lr = { class: "dc-header__domain" }, rr = ["data-dc-more", "title"], or = { class: "dc-header__pick" }, ir = { class: "dc-header__pick-box" }, cr = ["value"], ur = { value: "" }, dr = ["value"], fr = { class: "dc-header__pick" }, pr = { class: "dc-header__pick-box" }, vr = ["value"], mr = ["value"], hr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, _r = ["title", "aria-label", "onClick"], gr = ["aria-expanded", "aria-controls"], yr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, wr = { class: "dc-header__sr" }, br = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, kr = ["disabled"], $r = ["title"], xr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Cr = ["disabled"], Mr = {
  key: 1,
  class: "dc-header__actions"
}, Sr = /* @__PURE__ */ fe({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean },
    views: {}
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ye(), l = m(() => a.schema.value), r = m(() => a.hasFacets.value || !!a.query.value.expr.trim());
    function i(L) {
      return L.key === a.query.value.entity && r.value && !n.hideCount ? _s(a.total.value) : L.count;
    }
    function o(L) {
      return `${L.label} · ${i(L)}`;
    }
    const u = m(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${_s(a.total.value)}`), d = m(
      () => (n.views ?? [...Fn]).map((L) => ({ key: L, label: qs[L] }))
    ), _ = m(() => Ws(a.query.value.view, n.views));
    function b(L) {
      a.setView(L.target.value);
    }
    const y = m(
      () => a.terms.value.filter((L) => L.facetKey !== rn).map((L, N, W) => {
        const j = W[N - 1];
        return {
          term: L,
          or: j?.group !== void 0 && L.group !== void 0 && L.group !== j.group
        };
      })
    ), k = sr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      terms: a.terms
    });
    function w(L) {
      const N = k.nameOf(L);
      return N ? `${L.field}:${N} (${L.value})` : L.label;
    }
    function $(L) {
      const N = L.target.value;
      a.setEntity(N || null);
    }
    function A(L) {
      L.target?.closest("button, select, label") || s("toggle");
    }
    const P = X(null), E = X("");
    function x() {
      const L = P.value;
      if (!L) {
        E.value = "";
        return;
      }
      const N = L.scrollLeft > 1, W = L.scrollWidth - L.clientWidth - L.scrollLeft > 1;
      E.value = N && W ? "both" : N ? "start" : W ? "end" : "";
    }
    let I = null;
    be(
      P,
      (L) => {
        I?.disconnect(), I = null, x(), !(!L || typeof ResizeObserver > "u") && (I = new ResizeObserver(x), I.observe(L));
      },
      { flush: "post" }
    ), be(y, x, { flush: "post" }), He(() => I?.disconnect());
    const V = m(() => a.query.value.page), S = m(
      () => a.pageCount.value > 1 && !Nn(a.query.value)
    ), F = m(() => {
      const L = `Page ${V.value} of ${a.pageCount.value}`, N = a.rows.value.length;
      if (!N) return L;
      const W = a.offset.value + 1;
      return `${L} — rows ${W} to ${W + N - 1} of ${a.total.value}`;
    });
    return (L, N) => (p(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      g("div", {
        class: "dc-header__trigger",
        onClick: A
      }, [
        N[7] || (N[7] = g("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        g("span", lr, T(l.value.label), 1),
        g("div", {
          ref_key: "termBar",
          ref: P,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": E.value,
          title: C(a).summary.value,
          onScroll: x
        }, [
          g("label", or, [
            N[4] || (N[4] = g("span", { class: "dc-header__sr" }, "Type", -1)),
            g("span", ir, [
              g("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: C(a).query.value.entity ?? "",
                onChange: $
              }, [
                g("option", ur, T(u.value), 1),
                (p(!0), h(ee, null, ue(C(a).entities.value, (W) => (p(), h("option", {
                  key: W.key,
                  value: W.key
                }, T(o(W)), 9, dr))), 128))
              ], 40, cr),
              N[3] || (N[3] = g("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          g("label", fr, [
            N[6] || (N[6] = g("span", { class: "dc-header__sr" }, "View", -1)),
            g("span", pr, [
              g("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: _.value,
                onChange: b
              }, [
                (p(!0), h(ee, null, ue(d.value, (W) => (p(), h("option", {
                  key: W.key,
                  value: W.key
                }, T(W.label), 9, mr))), 128))
              ], 40, vr),
              N[5] || (N[5] = g("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          (p(!0), h(ee, null, ue(y.value, (W) => (p(), h(ee, {
            key: W.term.id
          }, [
            W.or ? (p(), h("span", hr, "or")) : O("", !0),
            g("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${w(W.term)}`,
              "aria-label": `Remove ${w(W.term)}`,
              onClick: (j) => C(a).removeTerm(W.term)
            }, T(w(W.term)), 9, _r)
          ], 64))), 128))
        ], 40, rr),
        g("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: N[0] || (N[0] = (W) => s("toggle"))
        }, [
          g("span", yr, T(e.expanded ? "▲" : "▼"), 1),
          g("span", wr, T(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, gr)
      ]),
      S.value ? (p(), h("nav", br, [
        g("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: V.value <= 1,
          onClick: N[1] || (N[1] = (W) => C(a).setPage(V.value - 1))
        }, [...N[8] || (N[8] = [
          g("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, kr),
        g("span", {
          class: "dc-header__page dc-mono",
          title: F.value,
          "aria-hidden": "true"
        }, T(V.value) + " / " + T(C(a).pageCount.value), 9, $r),
        g("span", xr, T(F.value), 1),
        g("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: V.value >= C(a).pageCount.value,
          onClick: N[2] || (N[2] = (W) => C(a).setPage(V.value + 1))
        }, [...N[9] || (N[9] = [
          g("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Cr)
      ])) : O("", !0),
      L.$slots.actions ? (p(), h("div", Mr, [
        qe(L.$slots, "actions", {}, void 0, !0)
      ])) : O("", !0)
    ], 8, ar));
  }
}), pe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ia = /* @__PURE__ */ pe(Sr, [["__scopeId", "data-v-66000c16"]]), Er = { class: "dc-facet" }, Pr = ["id"], Ar = { class: "dc-facet__body" }, zr = ["aria-labelledby"], Rr = ["aria-pressed", "data-dc-active", "onClick"], Tr = ["aria-labelledby"], Lr = ["aria-label", "placeholder", "onKeydown"], Fr = ["aria-label", "placeholder", "onKeydown"], Dr = ["aria-checked"], Ir = { class: "dc-switch__text" }, Nr = ["data-dc-active"], Or = /* @__PURE__ */ fe({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = m(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function l(_) {
      if (n.value.kind !== "chips") return;
      const b = a.value.has(_) ? n.value.selected.filter((y) => y !== _) : [...n.value.selected, _];
      s("update", { kind: "chips", selected: b });
    }
    const r = X(""), i = X("");
    be(
      () => n.value,
      (_) => {
        _.kind === "range" && (r.value = _.min === null ? "" : _.min, i.value = _.max === null ? "" : _.max);
      },
      { immediate: !0, deep: !0 }
    );
    function o(_) {
      if (typeof _ == "number") return Number.isFinite(_) ? _ : null;
      const b = _.trim();
      if (!b) return null;
      const y = Number(b);
      return Number.isFinite(y) ? y : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const _ = o(r.value), b = o(i.value);
      _ === n.value.min && b === n.value.max || s("update", { kind: "range", min: _, max: b });
    }
    function d() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (_, b) => (p(), h("div", Er, [
      g("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, T(e.facet.label), 9, Pr),
      g("div", Ar, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (p(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (p(!0), h(ee, null, ue(e.facet.options, (y) => (p(), h("button", {
            key: y,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(y),
            "data-dc-active": a.value.has(y) ? "true" : "false",
            onClick: (k) => l(y)
          }, T(y), 9, Rr))), 128))
        ], 8, zr)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          wn(g("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (y) => r.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: Pt(De(u, ["prevent"]), ["enter"])
          }, null, 40, Lr), [
            [bn, r.value]
          ]),
          b[2] || (b[2] = g("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          wn(g("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (y) => i.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: Pt(De(u, ["prevent"]), ["enter"])
          }, null, 40, Fr), [
            [bn, i.value]
          ])
        ], 8, Tr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          g("span", Ir, T(e.facet.text), 1),
          g("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...b[3] || (b[3] = [
            g("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Nr)
        ], 8, Dr)) : O("", !0)
      ])
    ]));
  }
}), ca = /* @__PURE__ */ pe(Or, [["__scopeId", "data-v-36d1334b"]]), Vr = ["aria-label"], Kr = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Br = /* @__PURE__ */ fe({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = X([]);
    function l(r, i) {
      const o = n.options.length;
      let u = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? u = (i + 1) % o : r.key === "ArrowLeft" || r.key === "ArrowUp" ? u = (i - 1 + o) % o : r.key === "Home" ? u = 0 : r.key === "End" && (u = o - 1), u === null) return;
      r.preventDefault();
      const d = n.options[u];
      d && (s("update:modelValue", d.key), a.value[u]?.focus());
    }
    return (r, i) => (p(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (p(!0), h(ee, null, ue(e.options, (o, u) => (p(), h("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: an(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", o.key),
        onKeydown: (d) => l(d, u)
      }, T(o.label), 43, Kr))), 128))
    ], 8, Vr));
  }
}), Mn = /* @__PURE__ */ pe(Br, [["__scopeId", "data-v-63fb5482"]]), qr = ["id"], Wr = { class: "dc-panel__section dc-panel__rows" }, Ur = { class: "dc-panel__row" }, Hr = ["for"], jr = ["title", "aria-label", "onClick"], Xr = ["id", "placeholder", "onKeydown"], Gr = { class: "dc-panel__row" }, Yr = ["id"], Qr = ["aria-labelledby"], Zr = ["data-dc-active", "aria-current"], Jr = { class: "dc-entity__count dc-mono" }, eo = ["data-dc-active", "aria-current", "onClick"], to = { class: "dc-entity__label" }, no = { class: "dc-entity__count dc-mono" }, so = { class: "dc-panel__actions" }, ao = ["disabled"], lo = { class: "dc-panel__section dc-panel__rows" }, ro = { class: "dc-panel__row" }, oo = { class: "dc-panel__control" }, io = { class: "dc-panel__row" }, co = { class: "dc-panel__control" }, uo = ["title", "aria-label"], fo = {
  key: 0,
  class: "dc-panel__section"
}, po = /* @__PURE__ */ fe({
  __name: "QueryPanel",
  props: {
    panelId: {},
    views: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = Ln(), l = ye(), r = m(
      () => (n.views ?? [...Fn]).map((P) => ({ key: P, label: qs[P] }))
    ), i = m(
      () => l.sorts.value.map((P) => ({ key: P.key, label: P.label }))
    ), o = m(() => Sl(l.query.value.expr)), u = m(() => o.value.parts.map(Vt)), d = X(o.value.text), _ = X(null);
    be(
      () => o.value.text,
      (P) => {
        d.value = P;
      }
    );
    const b = m(() => d.value !== o.value.text);
    function y() {
      b.value && l.setExpression(ks(o.value.parts, d.value)), s("close");
    }
    function k(P) {
      const { parts: E, text: x } = o.value;
      l.setExpression(ks(E.filter((I, V) => V !== P), x));
    }
    function w(P) {
      const { parts: E } = o.value;
      d.value || !E.length || (P.preventDefault(), k(E.length - 1));
    }
    function $() {
      d.value = "", l.clearFilters();
    }
    function A(P, E) {
      l.setFacet(P, E);
    }
    return Dt(() => _.value?.focus()), (P, E) => (p(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: E[6] || (E[6] = Pt(De((x) => s("close"), ["stop"]), ["esc"]))
    }, [
      g("section", Wr, [
        g("div", Ur, [
          g("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, Hr),
          g("div", {
            class: "dc-field",
            onMousedown: E[1] || (E[1] = De((x) => _.value?.focus(), ["self", "prevent"]))
          }, [
            (p(!0), h(ee, null, ue(u.value, (x, I) => (p(), h("button", {
              key: `${I}:${x}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${x}`,
              "aria-label": `Remove ${x}`,
              onClick: (V) => k(I)
            }, T(x), 9, jr))), 128)),
            wn(g("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: _,
              "onUpdate:modelValue": E[0] || (E[0] = (x) => d.value = x),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: u.value.length ? "" : C(l).schema.value.placeholder,
              onKeydown: [
                Pt(De(y, ["prevent"]), ["enter"]),
                Pt(w, ["backspace"])
              ]
            }, null, 40, Xr), [
              [bn, d.value]
            ])
          ], 32)
        ]),
        C(l).entity.value ? (p(!0), h(ee, { key: 0 }, ue(C(l).entity.value.facets, (x) => (p(), oe(ca, {
          key: x.key,
          facet: x,
          value: C(l).query.value.facets[x.key],
          onUpdate: (I) => A(x.key, I)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : O("", !0),
        g("div", Gr, [
          g("span", {
            id: `${e.panelId}-entities`,
            class: "dc-panel__field-label"
          }, "Entities", 8, Yr),
          g("div", {
            class: "dc-panel__entities",
            role: "group",
            "aria-labelledby": `${e.panelId}-entities`
          }, [
            g("button", {
              type: "button",
              class: "dc-entity dc-entity--all",
              "data-dc-active": C(l).isEverything.value ? "true" : "false",
              "aria-current": C(l).isEverything.value ? "true" : void 0,
              onClick: E[2] || (E[2] = (x) => C(l).clearEntity())
            }, [
              E[7] || (E[7] = g("span", { class: "dc-entity__label" }, "Everything", -1)),
              g("span", Jr, T(C(l).entities.value.length) + " kinds", 1)
            ], 8, Zr),
            (p(!0), h(ee, null, ue(C(l).entities.value, (x) => (p(), h("button", {
              key: x.key,
              type: "button",
              class: "dc-entity",
              "data-dc-active": x.key === C(l).entity.value?.key ? "true" : "false",
              "aria-current": x.key === C(l).entity.value?.key ? "true" : void 0,
              onClick: (I) => C(l).setEntity(x.key)
            }, [
              g("span", to, T(x.label), 1),
              g("span", no, T(x.count), 1)
            ], 8, eo))), 128))
          ], 8, Qr)
        ]),
        g("div", so, [
          g("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: y
          }, " Run query "),
          g("button", {
            type: "button",
            class: "dc-button",
            disabled: C(l).isPristine.value && !b.value,
            onClick: $
          }, " Reset ", 8, ao)
        ])
      ]),
      g("section", lo, [
        g("div", ro, [
          E[8] || (E[8] = g("span", { class: "dc-panel__field-label" }, "View", -1)),
          g("div", oo, [
            ve(Mn, {
              label: "Result view",
              "model-value": C(l).query.value.view,
              options: r.value,
              "onUpdate:modelValue": E[3] || (E[3] = (x) => C(l).setView(x))
            }, null, 8, ["model-value", "options"])
          ])
        ]),
        g("div", io, [
          E[9] || (E[9] = g("span", { class: "dc-panel__field-label" }, "Sort", -1)),
          g("div", co, [
            ve(Mn, {
              mono: "",
              label: "Sort field",
              "model-value": C(l).query.value.sort,
              options: i.value,
              "onUpdate:modelValue": E[4] || (E[4] = (x) => C(l).setSort(x))
            }, null, 8, ["model-value", "options"]),
            g("button", {
              type: "button",
              class: "dc-button dc-button--icon dc-mono",
              title: C(l).query.value.dir === "desc" ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${C(l).query.value.dir === "desc" ? "descending" : "ascending"}`,
              onClick: E[5] || (E[5] = (x) => C(l).toggleDirection())
            }, T(C(l).query.value.dir === "desc" ? "↓" : "↑"), 9, uo)
          ])
        ])
      ]),
      a["panel-section"] ? (p(), h("section", fo, [
        qe(P.$slots, "panel-section", {}, void 0, !0)
      ])) : O("", !0)
    ], 40, qr));
  }
}), ua = /* @__PURE__ */ pe(po, [["__scopeId", "data-v-171cb4db"]]), vo = {
  key: 0,
  class: "dc-actions"
}, mo = {
  key: 0,
  class: "dc-actions__select"
}, ho = { class: "dc-actions__all" }, _o = ["checked", "indeterminate"], go = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, yo = { class: "dc-actions__ops" }, wo = ["disabled"], bo = ["disabled"], ko = /* @__PURE__ */ fe({
  __name: "RecordActions",
  setup(e) {
    const t = ye(), n = m(() => t.entity.value), s = m(() => !Nn(t.query.value)), a = m(() => s.value && t.selectable.value), l = m(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), r = m(() => t.selection.value.ids.length), i = m(() => t.rows.value.filter((b) => t.isSelected(b)).length), o = m(
      () => t.rows.value.length > 0 && i.value === t.rows.value.length
    ), u = m(() => i.value > 0 && !o.value), d = m(() => r.value ? `${r.value} selected` : "Select all");
    function _(b) {
      return r.value ? `${b} ${r.value}` : b;
    }
    return (b, y) => l.value ? (p(), h("div", vo, [
      a.value ? (p(), h("div", mo, [
        g("label", ho, [
          g("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: o.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: y[0] || (y[0] = (k) => C(t).selectPage(!o.value))
          }, null, 40, _o),
          g("span", go, T(d.value), 1)
        ]),
        r.value ? (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[1] || (y[1] = (k) => C(t).clearSelection())
        }, " Clear ")) : O("", !0)
      ])) : O("", !0),
      g("div", yo, [
        n.value?.create ? (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: y[2] || (y[2] = (k) => C(t).create(n.value))
        }, [
          y[5] || (y[5] = g("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ae(" " + T(n.value.create), 1)
        ])) : O("", !0),
        n.value?.duplicate ? (p(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !r.value,
          onClick: y[3] || (y[3] = (k) => C(t).duplicate())
        }, T(_(n.value.duplicate)), 9, wo)) : O("", !0),
        n.value?.delete ? (p(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !r.value,
          onClick: y[4] || (y[4] = (k) => C(t).delete())
        }, T(_(n.value.delete)), 9, bo)) : O("", !0)
      ])
    ])) : O("", !0);
  }
}), da = /* @__PURE__ */ pe(ko, [["__scopeId", "data-v-ca4aca14"]]);
function $o(e, t) {
  const n = Fe(t, "state"), s = Fe(t, "tint");
  return {
    identity: en(Fe(t, "identity"), e),
    reference: en(Fe(t, "reference"), e),
    metrics: Zs(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Ot(a, e)
    })),
    state: n ? ze(n, e) ?? null : null,
    updated: en(Fe(t, "updated"), e),
    tint: s ? ze(s, e) ?? null : null
  };
}
function fa(e, t, n, s, a = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: vl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: dl(t),
    parts: $o(e, l),
    pinned: s,
    selected: a
  };
}
function bt() {
  const e = ye(), t = m(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return m(
    () => e.rows.value.map(
      (n, s) => fa(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const xo = ["data-dc-status"], Co = /* @__PURE__ */ fe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (p(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, T(e.status), 9, xo));
  }
}), Kt = /* @__PURE__ */ pe(Co, [["__scopeId", "data-v-23e59fbf"]]), Mo = ["title"], So = { key: 1 }, Eo = /* @__PURE__ */ fe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ye(), s = m(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((o) => o.key === t.column.drill) ?? null), a = m(() => t.column.label ?? ""), l = m(() => Ot(t.column, t.entry.row));
    function r(i) {
      i.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (i, o) => s.value ? (p(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: r
    }, [
      qe(i.$slots, "default", {}, () => [
        Ae(T(l.value), 1)
      ], !0)
    ], 8, Mo)) : (p(), h("span", So, [
      qe(i.$slots, "default", {}, () => [
        Ae(T(l.value), 1)
      ], !0)
    ]));
  }
}), Bt = /* @__PURE__ */ pe(Eo, [["__scopeId", "data-v-3bd0cbdb"]]), Po = ["data-dc-active", "aria-pressed", "aria-label"], Ao = /* @__PURE__ */ fe({
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
    return (a, l) => (p(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, T(e.pinned ? "★" : "☆"), 9, Po));
  }
}), jn = /* @__PURE__ */ pe(Ao, [["__scopeId", "data-v-ef63d763"]]), zo = ["title", "aria-label"], Ro = /* @__PURE__ */ fe({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = m(() => t.entry.entity?.scope ?? null);
    function a(l) {
      l.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (l, r) => s.value ? (p(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, zo)) : O("", !0);
  }
}), qt = /* @__PURE__ */ pe(Ro, [["__scopeId", "data-v-1d9b1a9f"]]), To = ["checked", "aria-label"], kt = /* @__PURE__ */ fe({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ye();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, l) => (p(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: s
    }, null, 8, To));
  }
}), Lo = { class: "dc-cards" }, Fo = { class: "dc-card__top dc-mono" }, Do = { class: "dc-card__lead" }, Io = {
  key: 1,
  class: "dc-card__entity"
}, No = { class: "dc-card__top-right" }, Oo = ["onClick"], Vo = { class: "dc-card__primary" }, Ko = { class: "dc-card__secondary dc-mono" }, Bo = { class: "dc-card__metrics dc-mono" }, qo = {
  key: 0,
  class: "dc-card__date"
}, Wo = /* @__PURE__ */ fe({
  __name: "CardsView",
  setup(e) {
    const t = ye(), n = bt(), s = m(() => t.isEverything.value);
    return (a, l) => (p(), h("div", Lo, [
      (p(!0), h(ee, null, ue(C(n), (r) => (p(), h("div", {
        key: r.key,
        class: "dc-card"
      }, [
        g("div", Fo, [
          g("span", Do, [
            C(t).selectable.value ? (p(), oe(kt, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : O("", !0),
            Ae(" " + T(r.ordinal) + " ", 1),
            s.value ? (p(), h("span", Io, T(r.entityLabel), 1)) : O("", !0)
          ]),
          g("span", No, [
            r.parts.state ? (p(), oe(Kt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : O("", !0),
            ve(qt, { entry: r }, null, 8, ["entry"]),
            C(t).pinnable.value ? (p(), oe(jn, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : O("", !0)
          ])
        ]),
        g("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (i) => C(t).activate(r.row)
        }, [
          g("span", Vo, T(r.parts.identity), 1),
          g("span", Ko, T(r.parts.reference), 1)
        ], 8, Oo),
        g("div", Bo, [
          (p(!0), h(ee, null, ue(r.parts.metrics.slice(0, 2), (i) => (p(), oe(Bt, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, {
            default: gt(() => [
              Ae(T(i.label) + " " + T(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (p(), h("span", qo, T(r.parts.updated), 1)) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), pa = /* @__PURE__ */ pe(Wo, [["__scopeId", "data-v-590e2312"]]), Uo = { class: "dc-grid" }, Ho = ["onClick"], jo = { class: "dc-tile__scrim" }, Xo = { class: "dc-tile__top dc-mono" }, Go = { class: "dc-tile__chip" }, Yo = { class: "dc-tile__caption" }, Qo = { class: "dc-tile__secondary dc-truncate" }, Zo = { class: "dc-tile__primary" }, Jo = /* @__PURE__ */ fe({
  __name: "GridView",
  setup(e) {
    const t = ye(), n = bt();
    return (s, a) => (p(), h("div", Uo, [
      (p(!0), h(ee, null, ue(C(n), (l) => (p(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        g("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => C(t).activate(l.row)
        }, [
          g("span", jo, [
            g("span", Xo, [
              g("span", Go, T(l.ordinal), 1)
            ]),
            g("span", Yo, [
              g("span", Qo, T(l.parts.reference), 1),
              g("span", Zo, T(l.parts.identity), 1)
            ])
          ])
        ], 12, Ho),
        C(t).selectable.value ? (p(), oe(kt, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0)
      ]))), 128))
    ]));
  }
}), va = /* @__PURE__ */ pe(Jo, [["__scopeId", "data-v-28cefc33"]]), ei = { class: "dc-links" }, ti = ["onClick"], ni = { class: "dc-link__primary dc-truncate" }, si = { class: "dc-link__secondary dc-mono dc-truncate" }, ai = /* @__PURE__ */ fe({
  __name: "LinksView",
  setup(e) {
    const t = ye(), n = bt();
    return (s, a) => (p(), h("div", ei, [
      (p(!0), h(ee, null, ue(C(n), (l) => (p(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        C(t).selectable.value ? (p(), oe(kt, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0),
        g("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => C(t).activate(l.row)
        }, [
          g("span", ni, T(l.parts.identity), 1),
          g("span", si, T(l.parts.reference), 1)
        ], 8, ti)
      ]))), 128))
    ]));
  }
}), ma = /* @__PURE__ */ pe(ai, [["__scopeId", "data-v-cc3a66fa"]]), li = {
  class: "dc-list",
  role: "list"
}, ri = ["onClick"], oi = { class: "dc-list__ordinal dc-mono" }, ii = { class: "dc-list__identity" }, ci = { class: "dc-list__primary dc-truncate" }, ui = { class: "dc-list__secondary dc-mono dc-truncate" }, di = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, fi = { class: "dc-list__metrics dc-mono" }, pi = { class: "dc-list__trailing" }, vi = /* @__PURE__ */ fe({
  __name: "ListView",
  setup(e) {
    const t = ye(), n = bt(), s = m(() => t.isEverything.value);
    return (a, l) => (p(), h("div", li, [
      (p(!0), h(ee, null, ue(C(n), (r) => (p(), h("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        C(t).selectable.value ? (p(), oe(kt, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : O("", !0),
        g("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => C(t).activate(r.row)
        }, [
          g("span", oi, T(r.ordinal), 1),
          g("span", ii, [
            g("span", ci, T(r.parts.identity), 1),
            g("span", ui, T(r.parts.reference), 1)
          ])
        ], 8, ri),
        s.value ? (p(), h("span", di, T(r.entityLabel), 1)) : O("", !0),
        g("span", fi, [
          (p(!0), h(ee, null, ue(r.parts.metrics.slice(0, 2), (i) => (p(), oe(Bt, {
            key: i.column.key ?? i.label,
            entry: r,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        g("span", pi, [
          r.parts.state ? (p(), oe(Kt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : O("", !0),
          ve(qt, { entry: r }, null, 8, ["entry"]),
          C(t).pinnable.value ? (p(), oe(jn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : O("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Sn = /* @__PURE__ */ pe(vi, [["__scopeId", "data-v-6c92ff27"]]), mi = { class: "dc-preview" }, hi = { class: "dc-preview__pager dc-mono" }, _i = ["disabled"], gi = { "aria-live": "polite" }, yi = ["disabled"], wi = {
  key: 0,
  class: "dc-preview__card"
}, bi = { class: "dc-preview__body" }, ki = { class: "dc-preview__top" }, $i = { class: "dc-preview__badges" }, xi = { class: "dc-preview__entity dc-mono" }, Ci = { class: "dc-preview__marks" }, Mi = { class: "dc-preview__primary" }, Si = { class: "dc-preview__secondary dc-mono" }, Ei = { class: "dc-preview__fields" }, Pi = { class: "dc-preview__key" }, Ai = { class: "dc-preview__value dc-mono" }, zi = /* @__PURE__ */ fe({
  __name: "PreviewView",
  setup(e) {
    const t = ye(), n = bt(), s = X(0);
    be(n, (o) => {
      s.value > o.length - 1 && (s.value = Math.max(0, o.length - 1));
    });
    const a = m(() => n.value[s.value]), l = m(() => {
      const o = a.value;
      if (!o) return [];
      const u = Fe(o.columns, "reference"), d = Fe(o.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((_) => ({
          key: _.label,
          value: _.text,
          column: _.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), r = m(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + o)));
    };
    return (o, u) => (p(), h("div", mi, [
      g("div", hi, [
        g("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => i(-1))
        }, " ‹ ", 8, _i),
        g("span", gi, T(r.value), 1),
        g("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= C(n).length - 1,
          onClick: u[1] || (u[1] = (d) => i(1))
        }, " › ", 8, yi)
      ]),
      a.value ? (p(), h("div", wi, [
        g("div", {
          class: "dc-preview__media",
          style: Re({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        g("div", bi, [
          g("div", ki, [
            g("span", $i, [
              C(t).selectable.value ? (p(), oe(kt, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : O("", !0),
              a.value.parts.state ? (p(), oe(Kt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : O("", !0),
              g("span", xi, T(a.value.entityLabel), 1)
            ]),
            g("span", Ci, [
              ve(qt, { entry: a.value }, null, 8, ["entry"]),
              C(t).pinnable.value ? (p(), oe(jn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : O("", !0)
            ])
          ]),
          g("div", null, [
            g("div", Mi, T(a.value.parts.identity), 1),
            g("div", Si, T(a.value.parts.reference), 1)
          ]),
          g("dl", Ei, [
            (p(!0), h(ee, null, ue(l.value, (d) => (p(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              g("dt", Pi, T(d.key), 1),
              g("dd", Ai, [
                d.column && a.value ? (p(), oe(Bt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (p(), h(ee, { key: 1 }, [
                  Ae(T(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          g("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => C(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : O("", !0)
    ]));
  }
}), ha = /* @__PURE__ */ pe(zi, [["__scopeId", "data-v-a236412c"]]);
function Ri() {
  const e = ye();
  return m(() => fl(e.schema.value, e.entity.value));
}
const Ti = ["src", "alt"], Li = ["title"], Fi = /* @__PURE__ */ fe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ye(), s = m(() => t.column.kind ?? "text"), a = m(() => ze(t.column, t.entry.row)), l = m(
      () => s.value === "ordinal" ? t.entry.ordinal : Ot(t.column, t.entry.row)
    ), r = m(() => a.value), i = m(() => t.column.activate === !0 || !!t.column.click), o = m(() => xn(t.column)), u = m(() => Js(t.column, t.entry.row));
    function d(_) {
      i.value && (_.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (_, b) => s.value === "component" && e.column.component ? (p(), oe(Ns(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (p(), oe(Kt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : s.value === "image" ? (p(), h("img", {
      key: 2,
      class: "dc-cell__image",
      src: String(a.value ?? ""),
      alt: e.entry.parts.identity,
      loading: "lazy",
      style: Re({ maxHeight: e.column.height }),
      onClick: d
    }, null, 12, Ti)) : e.column.drill ? (p(), oe(Bt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (p(), h("button", {
      key: 4,
      type: "button",
      class: an(["dc-table__open", { "dc-truncate": o.value }]),
      title: u.value,
      onClick: d
    }, T(l.value), 11, Li)) : (p(), h(ee, { key: 5 }, [
      Ae(T(l.value), 1)
    ], 64));
  }
}), Ss = /* @__PURE__ */ pe(Fi, [["__scopeId", "data-v-8a010beb"]]), Di = {
  key: 0,
  class: "dc-table__none"
}, Ii = { class: "dc-table__detail" }, Ni = {
  key: 1,
  class: "dc-table"
}, Oi = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Vi = ["data-dc-align", "data-dc-hide", "aria-sort"], Ki = ["onClick"], Bi = ["onClick"], qi = {
  key: 0,
  class: "dc-table__pick"
}, Wi = ["data-dc-align", "data-dc-hide", "title"], Ui = {
  key: 0,
  class: "dc-table__name"
}, Hi = /* @__PURE__ */ fe({
  __name: "TableView",
  setup(e) {
    const t = ye(), n = bt(), s = Ri();
    function a(_) {
      _ && (t.query.value.sort === _ ? t.toggleDirection() : t.setSort(_));
    }
    const l = m(() => t.entity.value?.label ?? "The result set"), r = m(() => new Set(t.sorts.value.map((_) => _.key))), i = (_) => _.sort !== void 0 && r.value.has(_.sort), o = (_) => {
      if (i(_))
        return t.query.value.sort !== _.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function u(_) {
      return [
        ws(_),
        _.muted ? "dc-table__muted" : "",
        _.mono ? "dc-mono" : "",
        xn(_) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function d(_, b) {
      if (!(!xn(_) || _.activate || _.click))
        return Js(_, b.row);
    }
    return (_, b) => C(s).length ? (p(), h("table", Ni, [
      g("thead", null, [
        g("tr", null, [
          C(t).selectable.value ? (p(), h("th", Oi, [...b[3] || (b[3] = [
            g("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : O("", !0),
          (p(!0), h(ee, null, ue(C(s), (y, k) => (p(), h("th", {
            key: C(gs)(y, k),
            scope: "col",
            class: an(C(ws)(y)),
            style: Re({ width: y.width }),
            "data-dc-align": C(ys)(y),
            "data-dc-hide": y.hideBelow,
            "aria-sort": o(y)
          }, [
            i(y) ? (p(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (w) => a(y.sort)
            }, T(y.label), 9, Ki)) : (p(), h(ee, { key: 1 }, [
              Ae(T(y.label), 1)
            ], 64))
          ], 14, Vi))), 128))
        ])
      ]),
      g("tbody", null, [
        (p(!0), h(ee, null, ue(C(n), (y) => (p(), h("tr", {
          key: y.key,
          class: "dc-table__row",
          onClick: (k) => C(t).activate(y.row)
        }, [
          C(t).selectable.value ? (p(), h("td", qi, [
            ve(kt, {
              row: y.row,
              selected: y.selected,
              name: y.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : O("", !0),
          (p(!0), h(ee, null, ue(C(s), (k, w) => (p(), h("td", {
            key: C(gs)(k, w),
            class: an(u(k)),
            "data-dc-align": C(ys)(k),
            "data-dc-hide": k.hideBelow,
            title: d(k, y)
          }, [
            k.scope ? (p(), h("span", Ui, [
              ve(Ss, {
                column: k,
                entry: y
              }, null, 8, ["column", "entry"]),
              ve(qt, { entry: y }, null, 8, ["entry"])
            ])) : (p(), oe(Ss, {
              key: 1,
              column: k,
              entry: y
            }, null, 8, ["column", "entry"]))
          ], 10, Wi))), 128))
        ], 8, Bi))), 128))
      ])
    ])) : (p(), h("p", Di, [
      b[2] || (b[2] = g("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      g("span", Ii, [
        Ae(T(l.value) + " has no ", 1),
        b[0] || (b[0] = g("code", null, "columns", -1)),
        b[1] || (b[1] = Ae(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), _a = /* @__PURE__ */ pe(Hi, [["__scopeId", "data-v-0fedf611"]]);
function ji(e) {
  const t = Ft([]), n = X(!1), s = Ft(null);
  let a = 0;
  const l = (o, u, d) => ({
    entity: o,
    rows: u.rows.map(
      (_, b) => fa(_, b, o, e.isPinned(_.id))
    ),
    total: u.total,
    count: d ? o.count : String(u.total)
  }), r = () => {
    const o = ++a, u = e.query.value, d = e.schema.value, _ = e.entities.value, b = e.limit.value, y = In(u), k = _.map((w) => ({
      entity: w,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: w.key, facets: It(w), page: 1 },
        schema: d,
        entity: w,
        limit: b,
        offset: 0
      })
    }));
    if (k.every(({ outcome: w }) => !(w instanceof Promise))) {
      t.value = k.map(
        ({ entity: w, outcome: $ }) => l(w, $, y)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(k.map(({ outcome: w }) => Promise.resolve(w))).then((w) => {
      o === a && (t.value = w.map(
        ($, A) => l(k[A].entity, $, y)
      ), s.value = null);
    }).catch((w) => {
      o === a && (s.value = w, t.value = []);
    }).finally(() => {
      o === a && (n.value = !1);
    });
  }, i = () => {
    try {
      r();
    } catch (o) {
      s.value = o, t.value = [], n.value = !1;
    }
  };
  return be(
    [e.source, e.schema, e.query, e.entities, e.limit],
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: i };
}
const Xi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Gi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Yi = ["data-dc-pending"], Qi = ["data-dc-empty"], Zi = ["onClick"], Ji = { class: "dc-type__name" }, ec = { class: "dc-type__count dc-mono" }, tc = { class: "dc-type__sr" }, nc = {
  key: 0,
  class: "dc-type__empty"
}, sc = ["onClick"], ac = { class: "dc-type__identity" }, lc = { class: "dc-type__primary dc-truncate" }, rc = { class: "dc-type__secondary dc-mono dc-truncate" }, oc = { class: "dc-type__trailing dc-mono" }, ic = { class: "dc-type__metric-value" }, cc = { class: "dc-type__metric-label" }, uc = {
  key: 0,
  class: "dc-type__date"
}, dc = ["onClick"], fc = /* @__PURE__ */ fe({
  __name: "TypeCardsView",
  setup(e) {
    const t = ye(), { previews: n, pending: s, error: a } = ji({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (r) => t.isPinnedId(r)
    }), l = m(() => !t.isPristine.value);
    return (r, i) => C(a) ? (p(), h("p", Xi, " Could not load results: " + T(C(a) instanceof Error ? C(a).message : "the data source failed."), 1)) : !C(n).length && C(s) ? (p(), h("p", Gi, " Running query… ")) : (p(), h("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": C(s) ? "true" : "false"
    }, [
      (p(!0), h(ee, null, ue(C(n), (o) => (p(), h("section", {
        key: o.entity.key,
        class: "dc-type",
        "data-dc-empty": o.rows.length ? "false" : "true"
      }, [
        g("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => C(t).setEntity(o.entity.key)
        }, [
          g("span", Ji, T(o.entity.label), 1),
          g("span", ec, T(o.count), 1),
          i[0] || (i[0] = g("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          g("span", tc, "Show only " + T(o.entity.label.toLowerCase()), 1)
        ], 8, Zi),
        o.rows.length ? O("", !0) : (p(), h("p", nc, T(l.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), h(ee, null, ue(o.rows, (u) => (p(), h("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          g("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (d) => C(t).activate(u.row)
          }, [
            g("span", ac, [
              g("span", lc, T(u.parts.identity), 1),
              g("span", rc, T(u.parts.reference), 1)
            ])
          ], 8, sc),
          g("span", oc, [
            (p(!0), h(ee, null, ue(u.parts.metrics.slice(0, 1), (d) => (p(), oe(Bt, {
              key: d.column.key ?? d.label,
              class: "dc-type__metric",
              entry: u,
              column: d.column
            }, {
              default: gt(() => [
                g("span", ic, T(d.text), 1),
                g("span", cc, T(d.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), h("span", uc, T(u.parts.updated), 1)) : O("", !0),
            ve(qt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        o.entity.create ? (p(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => C(t).create(o.entity)
        }, [
          i[1] || (i[1] = g("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ae(" " + T(o.entity.create), 1)
        ], 8, dc)) : O("", !0)
      ], 8, Qi))), 128))
    ], 8, Yi));
  }
}), ga = /* @__PURE__ */ pe(fc, [["__scopeId", "data-v-b776cfb6"]]), pc = ["data-dc-pending"], vc = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, mc = { class: "dc-results__detail" }, hc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, _c = {
  key: 3,
  class: "dc-results__state"
}, gc = { class: "dc-results__detail" }, yc = /* @__PURE__ */ fe({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ye(), s = {
      list: Sn,
      cards: pa,
      grid: va,
      table: _a,
      links: ma,
      preview: ha
    }, a = m(() => Nn(n.query.value)), l = m(() => Ws(n.query.value.view, t.views)), r = m(() => s[l.value] ?? Sn), i = m(() => n.rows.value.length > 0), o = m(() => n.error.value !== null);
    return (u, d) => (p(), h("div", {
      class: "dc-results",
      "data-dc-pending": C(n).pending.value ? "true" : "false"
    }, [
      o.value ? (p(), h("p", vc, [
        d[1] || (d[1] = g("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        g("span", mc, T(C(n).error.value instanceof Error ? C(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), oe(ga, { key: 1 })) : !i.value && C(n).pending.value ? (p(), h("p", hc, [...d[2] || (d[2] = [
        g("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (p(), oe(Ns(r.value), { key: 4 })) : (p(), h("div", _c, [
        d[3] || (d[3] = g("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        g("span", gc, T(C(n).summary.value), 1),
        C(n).isPristine.value ? O("", !0) : (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: d[0] || (d[0] = (_) => C(n).clearFilters())
        }, T(C(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, pc));
  }
}), ya = /* @__PURE__ */ pe(yc, [["__scopeId", "data-v-4b83efc2"]]), wc = ["data-dc-theme"], bc = ["data-dc-width", "data-dc-align"], kc = { class: "dc-shell__panel" }, $c = /* @__PURE__ */ fe({
  __name: "DataShell",
  props: /* @__PURE__ */ ln({
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
    selectable: { type: Boolean },
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
  emits: /* @__PURE__ */ ln(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = At(e, "open"), r = At(e, "pinned"), i = At(e, "selected"), o = Ln(), u = _t(Ks, null), d = s.route || u ? null : ll(), _ = s.route ?? u ?? d;
    He(() => d?.dispose?.());
    const b = m(() => Il({ seed: s.schema.key })), y = m(() => s.source ?? b.value), k = Jl({
      schema: () => s.schema,
      adapter: _,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), w = er({
      source: y,
      query: k.query,
      schema: m(() => s.schema),
      entity: k.entity,
      limit: m(() => s.limit)
    });
    be(k.query, (q) => a("query-change", q)), be(
      [w.pageCount, w.pending, k.query],
      () => {
        if (w.pending.value) return;
        const q = w.pageCount.value;
        k.query.value.page > q && k.setPage(q, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Os() ?? "dc-query-panel", A = X(null);
    function P() {
      l.value && (l.value = !1, Dt(() => {
        A.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const E = m(() => new Set(r.value));
    function x(q) {
      const R = new Set(E.value);
      R.has(q.id) ? R.delete(q.id) : R.add(q.id), r.value = [...R], a("toggle-pin", q);
    }
    const I = m(() => {
      if (s.selectable === !0) return !0;
      const q = k.entity.value;
      return !!(q?.duplicate || q?.delete);
    }), V = m(() => new Set(i.value));
    function S(q) {
      const R = new Set(V.value);
      R.has(q.id) ? R.delete(q.id) : R.add(q.id), i.value = [...R];
    }
    function F(q) {
      const R = new Set(V.value);
      for (const Y of w.rows.value)
        q ? R.add(Y.id) : R.delete(Y.id);
      i.value = [...R];
    }
    function L() {
      i.value.length && (i.value = []);
    }
    const N = m(() => ({
      ids: [...i.value],
      rows: w.rows.value.filter((q) => V.value.has(q.id)),
      entity: k.entity.value
    }));
    be(() => k.query.value.entity, L);
    function W(q, R) {
      k.narrow(Bl(s.schema, k.query.value, q), R?.key ?? null), a("drill", q, R);
    }
    const j = Wl({
      ...k,
      schema: m(() => s.schema),
      entities: m(() => s.schema.entities),
      rows: w.rows,
      total: w.total,
      limit: m(() => s.limit),
      offset: w.offset,
      pageCount: w.pageCount,
      pending: w.pending,
      error: w.error,
      source: y,
      previewsPerType: m(() => s.previewsPerType),
      pinnable: m(() => s.pinnable === !0),
      isPinned: (q) => E.value.has(q.id),
      isPinnedId: (q) => E.value.has(q),
      togglePin: x,
      selectable: I,
      selection: N,
      isSelected: (q) => V.value.has(q.id),
      toggleSelect: S,
      selectPage: F,
      clearSelection: L,
      activate: (q) => a("activate", q),
      create: (q) => a("create", q),
      duplicate: () => a("duplicate", N.value),
      delete: () => a("delete", N.value),
      drill: W
    }), Ce = m(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: k.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: P
    }), (q, R) => (p(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re(Ce.value)
    }, [
      g("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ve(ia, {
          ref_key: "headerRef",
          ref: A,
          expanded: l.value,
          "panel-id": C($),
          views: e.views,
          onToggle: R[0] || (R[0] = (Y) => l.value = !l.value)
        }, ms({ _: 2 }, [
          o.actions ? {
            name: "actions",
            fn: gt(() => [
              qe(q.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views"]),
        l.value ? (p(), h(ee, { key: 0 }, [
          g("div", {
            class: "dc-shell__scrim",
            onClick: P
          }),
          g("div", kc, [
            ve(ua, {
              "panel-id": C($),
              views: e.views,
              onClose: P
            }, ms({ _: 2 }, [
              o["panel-section"] ? {
                name: "panel-section",
                fn: gt(() => [
                  qe(q.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id", "views"])
          ])
        ], 64)) : O("", !0)
      ], 8, bc),
      ve(da),
      qe(q.$slots, "results", {
        rows: C(j).rows.value,
        total: C(j).total.value,
        offset: C(j).offset.value,
        pageCount: C(j).pageCount.value,
        query: C(j).query.value,
        pending: C(j).pending.value
      }, () => [
        ve(ya, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, wc));
  }
}), xc = /* @__PURE__ */ pe($c, [["__scopeId", "data-v-b0e6f16b"]]), zt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Cc = ["aria-label"], Mc = ["role", "aria-label"], Sc = ["data-dc-item"], Ec = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Pc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Ac = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, zc = { class: "dc-menu__label dc-truncate" }, Rc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Tc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Lc = /* @__PURE__ */ fe({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = X(null), r = X([]), i = X(null), o = X(null), u = X(null), d = X(!1), _ = m(
      () => s.items.flatMap((S, F) => zt(S) ? [F] : [])
    ), b = m(() => {
      const S = [{ entries: [] }];
      return s.items.forEach((F, L) => {
        F.heading ? S.push({ heading: F, entries: [] }) : S[S.length - 1]?.entries.push({ item: F, index: L });
      }), S.filter((F) => F.entries.length > 0);
    }), y = X({ x: s.at.x, y: s.at.y });
    async function k() {
      y.value = { x: s.at.x, y: s.at.y }, await Dt();
      const S = l.value?.getBoundingClientRect();
      if (!S) return;
      const F = 8;
      let L = s.at.x, N = s.at.y;
      if (L + S.width > window.innerWidth - F) {
        const W = s.at.mirrorX === void 0 ? null : s.at.mirrorX - S.width;
        L = W !== null && W >= F ? W : window.innerWidth - S.width - F;
      }
      N + S.height > window.innerHeight - F && (N = window.innerHeight - S.height - F), y.value = { x: Math.max(F, L), y: Math.max(F, N) };
    }
    const w = m(() => ({ left: `${y.value.x}px`, top: `${y.value.y}px` }));
    function $(S) {
      i.value = S, S !== null && Dt(() => r.value[S]?.focus());
    }
    function A(S, F) {
      const L = _.value;
      if (L.length === 0) return null;
      if (S === null) return F === 1 ? L[0] ?? null : L[L.length - 1] ?? null;
      const N = L.indexOf(S);
      return N === -1 ? L[0] ?? null : L[(N + F + L.length) % L.length] ?? null;
    }
    function P(S, F) {
      if (!s.items[S]?.items?.length) return;
      const N = r.value[S]?.getBoundingClientRect(), W = l.value?.getBoundingClientRect();
      !N || !W || (u.value = { x: W.right - 4, y: N.top - 4, mirrorX: W.left + 4 }, o.value = S, d.value = F);
    }
    function E(S) {
      const F = o.value;
      o.value = null, u.value = null, S && F !== null && $(F);
    }
    function x(S) {
      const F = s.items[S];
      if (!(!F || !zt(F))) {
        if (F.items?.length) {
          P(S, !0);
          return;
        }
        a("choose", F);
      }
    }
    function I(S) {
      const F = S.key;
      if (F === "Escape") {
        S.preventDefault(), S.stopPropagation(), o.value !== null ? E(!0) : a("dismiss");
        return;
      }
      if (F === "ArrowDown" || F === "ArrowUp") {
        S.preventDefault(), S.stopPropagation(), E(!1), $(A(i.value, F === "ArrowDown" ? 1 : -1));
        return;
      }
      if (F === "Home" || F === "End") {
        S.preventDefault(), S.stopPropagation(), E(!1), $(A(null, F === "Home" ? 1 : -1));
        return;
      }
      if (F === "ArrowRight") {
        const L = i.value;
        L !== null && s.items[L]?.items?.length && (S.preventDefault(), S.stopPropagation(), P(L, !0));
        return;
      }
      if (F === "ArrowLeft") {
        o.value !== null && (S.preventDefault(), S.stopPropagation(), E(!0));
        return;
      }
      if (F === "Enter" || F === " ") {
        const L = i.value;
        if (L === null) return;
        S.preventDefault(), S.stopPropagation(), x(L);
      }
    }
    function V(S) {
      const F = s.items[S];
      !F || !zt(F) || (o.value !== null && o.value !== S && E(!1), $(S), F.items?.length && P(S, !1));
    }
    return nl(() => {
      k(), s.autofocus && $(A(null, 1));
    }), be(() => s.at, k, { deep: !0 }), be(() => s.items, () => void k(), { deep: !0 }), He(() => {
      o.value = null;
    }), t({ root: l }), (S, F) => {
      const L = Vs("MenuList", !0);
      return p(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(w.value),
        onKeydown: I
      }, [
        (p(!0), h(ee, null, ue(b.value, (N, W) => (p(), h("div", {
          key: `${W}-${N.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: N.heading ? "group" : "none",
          "aria-label": N.heading?.label
        }, [
          N.heading ? (p(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": N.heading.id
          }, T(N.heading.label), 9, Sc)) : O("", !0),
          (p(!0), h(ee, null, ue(N.entries, ({ item: j, index: Ce }) => (p(), h(ee, {
            key: j.id ?? `${Ce}-${j.label ?? ""}`
          }, [
            j.separator ? (p(), h("div", Ec)) : (p(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (q) => {
                q && (r.value[Ce] = q);
              },
              type: "button",
              class: "dc-menu__item",
              role: j.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": j.checked === void 0 ? void 0 : j.checked,
              "aria-haspopup": j.items?.length ? "menu" : void 0,
              "aria-expanded": j.items?.length ? o.value === Ce : void 0,
              "aria-disabled": j.disabled ? "true" : void 0,
              disabled: j.disabled,
              "data-dc-item": j.id,
              tabindex: "-1",
              onClick: (q) => x(Ce),
              onMouseenter: (q) => V(Ce)
            }, [
              g("span", Ac, T(j.checked ? "✓" : ""), 1),
              g("span", zc, T(j.label), 1),
              j.shortcut ? (p(), h("span", Rc, T(j.shortcut), 1)) : j.items?.length ? (p(), h("span", Tc, "›")) : O("", !0)
            ], 40, Pc))
          ], 64))), 128))
        ], 8, Mc))), 128)),
        o.value !== null && u.value ? (p(), oe(L, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: u.value,
          label: e.items[o.value]?.label,
          autofocus: d.value,
          onChoose: F[0] || (F[0] = (N) => a("choose", N)),
          onDismiss: F[1] || (F[1] = (N) => E(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
      ], 44, Cc);
    };
  }
}), wa = /* @__PURE__ */ pe(Lc, [["__scopeId", "data-v-9b1413fa"]]), Fc = ["data-dc-theme", "aria-label"], Dc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Ic = /* @__PURE__ */ fe({
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
    const n = e, s = m(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), a = t, l = X(null), r = X([]), i = X(null), o = X(null), u = X(!1), d = m(
      () => n.menus.flatMap((x, I) => zt(x) ? [I] : [])
    );
    function _(x, I) {
      const V = r.value[x]?.getBoundingClientRect(), S = n.menus[x];
      !V || !S || !zt(S) || (o.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, i.value = x, u.value = I);
    }
    function b(x) {
      const I = i.value;
      i.value = null, o.value = null, x && I !== null && r.value[I]?.focus();
    }
    function y(x) {
      i.value === x ? b(!0) : _(x, !1);
    }
    function k(x) {
      i.value === null || i.value === x || _(x, !1);
    }
    function w(x, I) {
      const V = d.value;
      if (V.length === 0) return null;
      if (x === null) return I === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const S = V.indexOf(x);
      return S === -1 ? V[0] ?? null : V[(S + I + V.length) % V.length] ?? null;
    }
    function $(x) {
      const I = x.key;
      if (I === "Escape") {
        if (i.value === null) return;
        x.preventDefault(), b(!0);
        return;
      }
      if (I === "ArrowDown" && i.value === null) {
        const F = A();
        if (F === null) return;
        x.preventDefault(), _(F, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const V = i.value ?? A(), S = w(V, I === "ArrowRight" ? 1 : -1);
      S !== null && (x.preventDefault(), i.value !== null ? _(S, !0) : r.value[S]?.focus());
    }
    function A() {
      const x = r.value.findIndex((I) => I === document.activeElement);
      return x === -1 ? d.value[0] ?? null : x;
    }
    function P(x) {
      const I = x.target;
      !I || l.value?.contains(I) || b(!1);
    }
    be(i, (x) => {
      x !== null ? window.addEventListener("pointerdown", P, !0) : window.removeEventListener("pointerdown", P, !0);
    }), He(() => window.removeEventListener("pointerdown", P, !0));
    function E(x) {
      b(!0), x.action?.(), a("choose", x);
    }
    return (x, I) => (p(), h("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Re(s.value),
      onKeydown: $
    }, [
      (p(!0), h(ee, null, ue(e.menus, (V, S) => (p(), h("button", {
        key: V.id ?? V.label ?? S,
        ref_for: !0,
        ref: (F) => {
          F && (r.value[S] = F);
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
        onClick: (F) => y(S),
        onMouseenter: (F) => k(S)
      }, T(V.label), 41, Dc))), 128)),
      i.value !== null && o.value ? (p(), oe(wa, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: E,
        onDismiss: I[0] || (I[0] = (V) => b(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 44, Fc));
  }
}), dd = /* @__PURE__ */ pe(Ic, [["__scopeId", "data-v-93dbd2e4"]]), Nc = ["aria-label", "aria-expanded", "disabled"], Oc = { "aria-hidden": "true" }, Vc = /* @__PURE__ */ fe({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = X(null), a = X(null), l = X(null), r = X(!1), i = m(() => l.value !== null);
    function o(k) {
      const w = s.value?.getBoundingClientRect();
      w && (l.value = { x: w.left, y: w.bottom + 4, mirrorX: w.right }, r.value = k);
    }
    function u(k) {
      l.value = null, k && s.value?.focus();
    }
    function d() {
      i.value ? u(!0) : o(!1);
    }
    function _(k) {
      k.key !== "ArrowDown" || i.value || (k.preventDefault(), o(!0));
    }
    function b(k) {
      const w = k.target;
      w && (s.value?.contains(w) || a.value?.root?.contains(w) || u(!1));
    }
    be(i, (k) => {
      k ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), He(() => window.removeEventListener("pointerdown", b, !0));
    function y(k) {
      u(!0), k.action?.(), n("choose", k);
    }
    return (k, w) => (p(), h(ee, null, [
      g("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: _
      }, [
        g("span", Oc, T(e.glyph), 1)
      ], 40, Nc),
      l.value ? (p(), oe(wa, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: y,
        onDismiss: w[0] || (w[0] = ($) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : O("", !0)
    ], 64));
  }
}), Xn = /* @__PURE__ */ pe(Vc, [["__scopeId", "data-v-48f5ada5"]]), $t = (e) => e.kind === "split", H = (e) => e.kind === "group", J = (e) => e.kind === "float", rt = { x: 16, y: 16, w: 360, h: 260 }, on = 28, ba = 120, En = 220, ka = 38, dt = 6;
function Wt(e, t) {
  let n = !1;
  const s = e.frames.map((a, l) => {
    const r = t(a.node, l);
    return r === a.node ? a : (n = !0, { ...a, node: r });
  });
  return n ? { ...e, frames: s } : e;
}
function Ie(e) {
  return { kind: "group", panels: [e] };
}
function fd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const de = (e) => typeof e == "string", Gn = (e) => de(e) ? Ie(e) : e, Ut = (e) => de(e) ? [e] : je(e), Es = (e) => e.panels.filter(de), Kc = (e) => e.panels.filter((t) => !de(t)), Pe = (e, t) => e.panels.includes(t);
function Ht(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (de(l) || !se(l, t)) return l;
    const r = n(l);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, panels: a } : e;
}
function un(e, t) {
  return { node: e, rect: { ...rt, ...t } };
}
function Yn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Qn(e, t) {
  const n = { ...rt, ...t };
  return Yn(
    e.map(
      (s, a) => un(s, {
        ...n,
        x: n.x + a * on,
        y: n.y + a * on
      })
    )
  );
}
function Zn(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Jn = (e, t, n) => Zn("row", e, t, n), pd = (e, t, n) => Zn("column", e, t, n);
function _e(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, vd = (e) => ({ ...e, headless: !0 }), md = (e) => ({ ...e, fixedView: !0 }), Bc = (e) => e === "left" || e === "right" ? "row" : "column";
function je(e) {
  return H(e) ? e.panels.flatMap(Ut) : J(e) ? e.frames.flatMap((t) => je(t.node)) : e.children.flatMap(je);
}
function se(e, t) {
  return H(e) ? e.panels.some((n) => de(n) ? n === t : se(n, t)) : J(e) ? e.frames.some((n) => se(n.node, t)) : e.children.some((n) => se(n, t));
}
const $a = (e) => je(e).length === 0, Pn = (e) => !H(e) && ct(e), An = (e) => $a(e) && !Pn(e);
function dn(e) {
  return $t(e) ? e.children.map((t, n) => ({ node: t, index: n })) : J(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => de(t) ? [] : [{ node: t, index: n }]);
}
const es = (e) => dn(e).map((t) => t.node);
function ut(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => de(s) ? s === t : se(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function xa(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && de(t) ? t : "";
}
function xe(e) {
  if (de(e)) return e;
  if (H(e)) {
    const n = e.panels[ut(e)];
    return n === void 0 ? "" : xe(n);
  }
  if (J(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? xe(n.node) : "";
  }
  const t = e.children[0];
  return t ? xe(t) : "";
}
function pt(e, t) {
  if (H(e) && Pe(e, t)) return e;
  for (const n of es(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function qc(e) {
  const t = es(e).flatMap(qc);
  return H(e) ? [e, ...t] : t;
}
function we(e, t) {
  if (H(e)) {
    for (const n of Kc(e)) {
      const s = we(n, t);
      if (s) return s;
    }
    return null;
  }
  if (J(e)) {
    for (const n of e.frames)
      if (se(n.node, t))
        return we(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = we(n, t);
    if (s) return s;
  }
  return null;
}
function gn(e, t, n = ba) {
  const s = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), a = s(e.w, t.w), l = s(e.h, t.h), r = (i, o, u) => Math.min(Math.max(i, 0), Math.max(u - o, 0));
  return {
    x: Math.round(r(e.x, a, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function Ps(e, t, n, s, a = ba) {
  let { x: l, y: r, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, l = e.x + n), t.includes("s") && (o = e.h + s), t.includes("n") && (o = e.h - s, r = e.y + s), i < a && (t.includes("w") && (l = e.x + e.w - a), i = a), o < a && (t.includes("n") && (r = e.y + e.h - a), o = a), { x: l, y: r, w: i, h: o };
}
const Ca = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (H(e)) return Ht(e, t, (l) => vt(l, t, n));
  if (J(e)) {
    let l = !1;
    const r = e.frames.map((i) => {
      if (!se(i.node, t)) return i;
      if (we(i.node, t)) {
        const u = vt(i.node, t, n);
        return u === i.node ? i : (l = !0, { ...i, node: u });
      }
      const o = n(i);
      return o === i ? i : (l = !0, o);
    });
    return l ? { ...e, frames: r } : e;
  }
  if (!se(e, t)) return e;
  let s = !1;
  const a = e.children.map((l) => {
    const r = vt(l, t, n);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, children: a } : e;
}
function Wc(e, t, n) {
  return vt(e, t, (s) => Ca(s.rect, n) ? s : { ...s, rect: n });
}
const Je = (e) => e.maximized === !0, Ma = (e) => (t) => {
  if (Je(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function Uc(e, t, n = !0) {
  return vt(e, t, Ma(n));
}
function hd(e, t) {
  const n = we(e, t);
  return n ? Uc(e, t, !Je(n)) : e;
}
const lt = (e) => e.minimized === !0, Sa = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function Hc(e, t, n = !0) {
  return vt(e, t, Sa(n));
}
function _d(e, t) {
  const n = we(e, t);
  return n ? Hc(e, t, !lt(n)) : e;
}
function at(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = tt(e, t.slice(0, -1));
  return !s || !J(s) ? null : s.frames[n] ?? null;
}
function zn(e, t) {
  if (J(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!se(s.node, t)) continue;
      const a = zn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of dn(e)) {
    if (!se(n, t)) continue;
    const a = zn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function ts(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = tt(e, a);
  if (!l || !J(l)) return e;
  const r = l.frames[s];
  if (!r) return e;
  const i = n(r);
  if (i === r) return e;
  const o = [...l.frames];
  return o[s] = i, it(e, a, { ...l, frames: o });
}
function As(e, t, n) {
  return ts(
    e,
    t,
    (s) => Ca(s.rect, n) ? s : { ...s, rect: n }
  );
}
function jc(e, t, n = !0) {
  return ts(e, t, Ma(n));
}
function Xc(e, t, n = !0) {
  return ts(e, t, Sa(n));
}
function Rt(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (J(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const i = Rt(r.node, s), o = i === r.node ? r : { ...r, node: i };
    if (n === e.frames.length - 1 && o === r) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(o), { ...e, frames: u };
  }
  const a = tt(e, [n]);
  if (!a) return e;
  const l = Rt(a, s);
  return l === a ? e : it(e, [n], l);
}
function Gc(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (J(s) && (n[l] = s.frames.length - 1), s = tt(s, [a]));
  }), n;
}
function tn(e, t, n, s) {
  if (H(e)) return Ht(e, n, (r) => tn(r, t, n, s));
  if (J(e)) {
    const r = e.frames.findIndex((o) => se(o.node, n)), i = e.frames[r];
    if (!i) return e;
    if (we(i.node, n)) {
      const o = tn(i.node, t, n, s);
      if (o === i.node) return e;
      const u = [...e.frames];
      return u[r] = { ...i, node: o }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, un(Ie(t), s)] };
  }
  if (!se(e, n)) return e;
  let a = !1;
  const l = e.children.map((r) => {
    const i = tn(r, t, n, s);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, children: l } : e;
}
function zs(e, t, n, s) {
  if (t === n || !se(e, t) || !se(e, n) || !we(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const l = tn(a, t, n, s);
  return l === a ? e : ge(l);
}
function Yc(e, t, n) {
  return J(e) ? { ...e, frames: [...e.frames, un(Ie(t), n)] } : H(e) ? Pa(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ie(t)],
    sizes: [...Ue(e), 1],
    ..._e(e)
  };
}
function Ea(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return Yc(e, t, s);
  const l = n.slice(1), r = (d, _) => _ === a ? Ea(d, t, l, s) : ot(d, t);
  if (J(e)) {
    const d = e.frames.flatMap((_, b) => {
      const y = r(_.node, b);
      return y ? [y === _.node ? _ : { ..._, node: y }] : [];
    });
    return { ...e, frames: d };
  }
  if (H(e)) {
    const d = ut(e), _ = [];
    e.panels.forEach((k, w) => {
      if (de(k)) {
        k !== t && _.push(k);
        return;
      }
      const $ = r(k, w);
      $ && _.push($);
    });
    const y = e.active && _.some((k) => Ut(k).includes(e.active)) ? e.active : xe(_[d] ?? _[_.length - 1]);
    return {
      kind: "group",
      panels: _,
      ...y ? { active: y } : {},
      ..._e(e)
    };
  }
  const i = Ue(e), o = [], u = [];
  return e.children.forEach((d, _) => {
    const b = r(d, _);
    b && (o.push(b), u.push(i[_] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: u, ..._e(e) };
}
function Rs(e, t, n, s) {
  const a = tt(e, n);
  return !a || !$a(a) || !se(e, t) ? e : ge(Ea(e, t, n, s));
}
function yn(e, t) {
  if (H(e)) return Ht(e, t, (a) => yn(a, t));
  if (J(e)) {
    const a = e.frames.findIndex((u) => se(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const r = yn(l.node, t), i = r === l.node ? l : { ...l, node: r };
    if (a === e.frames.length - 1 && i === l) return e;
    const o = [...e.frames];
    return o.splice(a, 1), o.push(i), { ...e, frames: o };
  }
  if (!se(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = yn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function ns(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), a = s.reduce((l, r) => l + r, 0);
  return a <= 0 ? n() : s.map((l) => l / a);
}
const Ue = (e) => ns(e.children.length, e.sizes), Te = (e) => {
  const t = H(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function ge(e) {
  if (H(e)) return Qc(e);
  if (J(e)) {
    const i = e.frames.flatMap((o) => {
      const u = ge(o.node);
      return An(u) ? [] : [u === o.node ? o : { ...o, node: u }];
    });
    return i.length === e.frames.length && i.every((o, u) => o === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = Ue(e), n = Te(e), s = [], a = [], l = [];
  e.children.forEach((i, o) => {
    const u = ge(i), d = t[o] ?? 0;
    if (An(u)) return;
    if (!n && $t(u) && u.direction === e.direction && !Te(u) && !ct(u)) {
      const b = Ue(u);
      u.children.forEach((y, k) => {
        s.push(y), a.push(d * (b[k] ?? 0));
      });
      return;
    }
    s.push(u), a.push(d);
    const _ = n?.[o];
    _ && l.push(_);
  });
  const r = s[0];
  return s.length === 1 && r && !ct(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: ns(s.length, a),
    ..._e(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function Qc(e) {
  if (e.panels.every(de)) return e;
  const t = xe(e), n = Te(e), s = [], a = [];
  e.panels.forEach((i, o) => {
    const u = n?.[o];
    if (de(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const d = ge(i);
    if (!An(d)) {
      if (H(d) && !ct(d) && !Te(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const l = s[0];
  if (s.length === 1 && l !== void 0 && !de(l) && !ct(e))
    return l;
  if (s.length === e.panels.length && s.every((i, o) => i === e.panels[o]))
    return e;
  const r = t && s.some((i) => Ut(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...r ? { active: r } : {},
    ..._e(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ot(e, t) {
  if (J(e)) {
    const r = e.frames.flatMap((i) => {
      const o = ot(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return r.length === 0 && !Pn(e) ? null : { ...e, frames: r };
  }
  if (H(e)) {
    if (!se(e, t)) return e;
    const r = ut(e), i = [];
    for (const d of e.panels) {
      if (de(d)) {
        d !== t && i.push(d);
        continue;
      }
      const _ = ot(d, t);
      _ && i.push(_);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((d) => Ut(d).includes(e.active)) ? e.active : xe(i[r] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ..._e(e) } : { kind: "group", panels: i, ..._e(e) };
  }
  const n = Ue(e), s = [], a = [];
  if (e.children.forEach((r, i) => {
    const o = ot(r, t);
    o && (s.push(o), a.push(n[i] ?? 0));
  }), s.length === 0)
    return Pn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ..._e(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !ct(e) ? l : ge({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ..._e(e)
  });
}
function Pa(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ..._e(e) };
}
function Et(e, t, n, s, a) {
  const l = (y) => Wt(
    y,
    (k) => se(k, n) ? Et(k, t, n, s, a) : k
  );
  if (s === "float") return e;
  const r = (y) => Ht(y, n, (k) => Et(k, t, n, s, a));
  if (s === "center")
    return H(e) ? Pe(e, n) ? Pa(e, t, a) : r(e) : J(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (y) => se(y, n) ? Et(y, t, n, s, a) : y
      )
    };
  const i = Bc(s), o = s === "left" || s === "top", u = (y) => ({
    kind: "split",
    direction: i,
    children: o ? [Ie(t), y] : [y, Ie(t)],
    sizes: [0.5, 0.5]
  });
  if (H(e)) return Pe(e, n) ? u(e) : r(e);
  if (J(e)) return l(e);
  const d = Ue(e), _ = e.children.findIndex(
    (y) => H(y) && Pe(y, n)
  );
  if (_ >= 0 && e.direction === i) {
    const y = (d[_] ?? 0) / 2, k = [...e.children], w = [...d];
    return k.splice(o ? _ : _ + 1, 0, Ie(t)), w.splice(_, 1, y, y), {
      kind: "split",
      direction: i,
      children: k,
      sizes: w,
      ..._e(e)
    };
  }
  const b = e.children.map((y) => se(y, n) ? H(y) && Pe(y, n) ? u(y) : Et(y, t, n, s) : y);
  return {
    kind: "split",
    direction: e.direction,
    children: b,
    sizes: d,
    ..._e(e)
  };
}
function mt(e, t) {
  if (H(e)) {
    if (Pe(e, t))
      return xa(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((o) => !de(o) && se(o, t)), l = e.panels[a];
    if (l === void 0 || de(l)) return e;
    const r = mt(l, t);
    if (r === l && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = r, { ...e, panels: i, active: t };
  }
  if (!se(e, t)) return e;
  if (J(e)) return Wt(e, (a) => mt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = mt(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Tt(e, t, n) {
  if (H(e)) {
    if (!Pe(e, t)) return Ht(e, t, (u) => Tt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const l = [...e.panels];
    l.splice(s, 1), l.splice(a, 0, t);
    const r = Te(e), i = r ? [...r] : void 0;
    i && i.splice(a, 0, ...i.splice(s, 1));
    const o = xe(e);
    return {
      kind: "group",
      panels: l,
      ...o ? { active: o } : {},
      ..._e(e),
      ...i ? { places: i } : {}
    };
  }
  return se(e, t) ? J(e) ? Wt(e, (s) => Tt(s, t, n)) : { ...e, children: e.children.map((s) => Tt(s, t, n)) } : e;
}
function nn(e, t, n) {
  if (t === n) return e;
  if (H(e)) {
    if (!se(e, t) && !se(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => de(l) ? s(l) : nn(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return J(e) ? Wt(e, (s) => nn(s, t, n)) : { ...e, children: e.children.map((s) => nn(s, t, n)) };
}
function Qt(e, t, n, s, a) {
  if (s === "float" || !se(e, t) || !se(e, n)) return e;
  const l = pt(e, t);
  if (s === "center" && l && Pe(l, n)) {
    if (a === void 0) return e;
    const i = l.panels.indexOf(t), o = a > i ? a - 1 : a;
    return o === i ? e : mt(Tt(e, t, o), t);
  }
  if (t === n) return e;
  const r = ot(e, t);
  return r ? ge(Et(r, t, n, s, a)) : e;
}
function Aa(e, t, n) {
  if (H(e)) {
    const a = e.panels[t];
    if (a === void 0 || de(a)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (J(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const l = [...e.frames];
    return l[t] = { ...a, node: n }, { ...e, frames: l };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function jt(e, t, n) {
  const s = dn(e);
  if (!H(e) && s.some(({ node: a }) => H(a) && Pe(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!se(a, t)) continue;
    const r = jt(a, t, n);
    return r ? Aa(e, l, r) : null;
  }
  return null;
}
function gd(e, t, n) {
  const s = jt(
    e,
    t,
    (a) => $t(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? ge(s) : e;
}
function za(e) {
  return J(e) ? [e] : Te(e) || ct(e) ? [e] : H(e) ? [...e.panels] : e.children.flatMap(za);
}
function Ra(e, t) {
  if (H(e)) return e;
  const n = es(e).map(za), s = n.flat(), a = t && s.some((r) => Ut(r).includes(t)) ? t : void 0, l = Zc(e, n);
  return ge({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ..._e(e),
    ...l ? { places: l } : {}
  });
}
function Zc(e, t) {
  const n = J(e) ? e.frames.map(({ node: s, ...a }) => a) : Te(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Jc(e, t) {
  const n = jt(e, t, (s) => Ra(s, t));
  return n ? ge(n) : e;
}
function ss(e, t, n) {
  if (H(e) && Pe(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of dn(e)) {
    if (!se(s, t)) continue;
    const l = ss(s, t, n);
    return l ? Aa(e, a, l) : null;
  }
  return null;
}
function Ts(e, t, n) {
  const s = ss(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const l = Te(a);
    return {
      ...Zn(n, a.panels.map(Gn)),
      ..._e(a),
      ...l ? { places: l } : {}
    };
  });
  return s ? ge(s) : e;
}
function Rn(e, t) {
  if (H(e)) return e;
  if (J(e)) {
    const a = e.frames.findIndex(
      (i) => H(i.node) && i.node.panels.includes(t)
    ), l = e.frames[a], r = l && H(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const i = Qn(r.panels.map(Gn), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return Wt(e, (i) => Rn(i, t));
  }
  if (!se(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = Rn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function eu(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (we(e, t)?.node === s) {
    const r = Rn(e, t);
    return r === e ? e : ge(r);
  }
  const l = ss(e, t, (r) => ({
    ...Yn(Ta(r.panels.map(Gn), Te(r), n)),
    ..._e(r)
  }));
  return l ? ge(l) : e;
}
function Ta(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Qn(e, n).frames;
}
function La(e, t) {
  return { ...Yn(Ta(e.children, Te(e), t)), ..._e(e) };
}
function yd(e, t, n) {
  const s = jt(
    e,
    t,
    (a) => J(a) ? a : La(a, n)
  );
  return s ? ge(s) : H(e) && Pe(e, t) ? Qn([e], n) : e;
}
function tu(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function Fa(e, t) {
  const n = tu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ..._e(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function wd(e, t, n = "row") {
  const s = jt(
    e,
    t,
    (a) => J(a) ? Fa(a, n) : a
  );
  return s ? ge(s) : e;
}
function Da(e) {
  if (J(e)) return null;
  const t = H(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || de(t) || H(t) && t.panels.length === 1 && de(t.panels[0]) ? null : t;
}
const nu = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function su(e, t) {
  const n = Da(e);
  return n ? t === "inner" ? n : { ...nu(n), ..._e(e) } : e;
}
function wt(e) {
  return e.title ? e.title : H(e) ? "" : J(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Lt(e, t) {
  if (H(e)) {
    const s = e.panels[ut(e)];
    return s === void 0 ? "" : de(s) ? t(s) ?? s : wt(s) || Lt(s, t);
  }
  if (e.title) return e.title;
  if (J(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Lt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Lt(n, t) : "";
}
function tt(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if ($t(n)) n = n.children[s];
    else if (J(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || de(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function it(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (J(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const u = it(o.node, a, n);
    if (u === o.node) return e;
    const d = [...e.frames];
    return d[s] = { ...o, node: u }, { ...e, frames: d };
  }
  if (H(e)) {
    const o = e.panels[s];
    if (o === void 0 || de(o)) return e;
    const u = it(o, a, n);
    if (u === o) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = it(l, a, n);
  if (r === l) return e;
  const i = [...e.children];
  return i[s] = r, { ...e, children: i };
}
function sn(e, t, n) {
  if (t.length === 0)
    return $t(e) ? { ...e, sizes: ns(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (J(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const o = sn(i.node, a, n);
    if (o === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: o }, { ...e, frames: u };
  }
  if (H(e)) {
    const i = e.panels[s];
    if (i === void 0 || de(i)) return e;
    const o = sn(i, a, n);
    if (o === i) return e;
    const u = [...e.panels];
    return u[s] = o, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = [...e.children];
  return r[s] = sn(l, a, n), { ...e, children: r };
}
function Ls(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const r = a + l;
  if (r < s * 2) return e;
  const i = [...e], o = Math.min(Math.max(a + n, s), r - s);
  return i[t] = o, i[t + 1] = r - o, i;
}
function cn(e) {
  if (!H(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !de(t) ? e : { ...Jn([au(e)]), ..._e(e) };
}
const au = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Fs(e) {
  return e.length === 0 ? null : Jn(e.map(Ie));
}
function lu(e, t) {
  if (!e) return Fs(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const o of je(e))
    !n.has(o) || s.has(o) ? a.add(o) : s.add(o);
  let l = e;
  for (const o of a)
    l = l ? ot(l, o) : null;
  const r = new Set(l ? je(l) : []), i = t.filter((o) => !r.has(o));
  if (i.length === 0) return l ? cn(ge(l)) : null;
  if (!l) return Fs(i);
  if (J(l)) {
    const o = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...i.map(
          (u, d) => un(Ie(u), {
            x: rt.x + (o + d) * on,
            y: rt.y + (o + d) * on
          })
        )
      ]
    };
  }
  return cn(ge(Jn([l, ...i.map(Ie)])));
}
const as = Symbol("dc.windowContext");
function ru(e) {
  return Tn(as, e), e;
}
function ls() {
  const e = _t(as, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const ou = ["data-dc-glyph"], iu = { class: "dc-glyph__line" }, cu = ["d"], uu = {
  key: 0,
  class: "dc-glyph__aqua"
}, du = ["d"], fu = /* @__PURE__ */ fe({
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
    return (s, a) => (p(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      g("g", iu, [
        (p(!0), h(ee, null, ue(t[e.kind], (l) => (p(), h("path", {
          key: l,
          d: l
        }, null, 8, cu))), 128))
      ]),
      n[e.kind] ? (p(), h("g", uu, [
        (p(!0), h(ee, null, ue(n[e.kind], (l) => (p(), h("path", {
          key: l,
          d: l
        }, null, 8, du))), 128))
      ])) : O("", !0)
    ], 8, ou));
  }
}), ht = /* @__PURE__ */ pe(fu, [["__scopeId", "data-v-4d2872c0"]]), pu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], vu = ["data-dc-movable"], mu = { class: "dc-float__title dc-truncate" }, hu = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, _u = ["aria-label", "aria-pressed", "data-dc-minimize"], gu = ["aria-label", "aria-pressed", "data-dc-maximize"], yu = ["aria-label", "data-dc-close"], wu = { class: "dc-float__content" }, bu = ["data-dc-handle", "onPointerdown"], ku = /* @__PURE__ */ fe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ls(), s = m(() => xe(t.frame.node)), a = m(() => n.panelFor(s.value)?.fixed === !0), l = m(() => Je(t.frame)), r = m(() => lt(t.frame)), i = m(() => l.value || r.value), o = m(() => n.resizable.value && !a.value && !i.value), u = m(() => n.movable.value && !a.value && !i.value), d = m(() => {
      const I = je(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), _ = m(() => d.value !== null && n.closable(d.value)), b = m(() => t.frame.node.headless === !0), y = m(
      () => !b.value && (!H(t.frame.node) || r.value)
    ), k = m(
      () => t.frame.title || wt(t.frame.node) || Lt(t.frame.node, (I) => n.panelFor(I)?.title)
    ), w = m(() => n.spaceMenu(t.path));
    function $(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function A(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const P = m(() => {
      const I = n.framing.value;
      return I !== null && se(t.frame.node, I);
    }), E = m(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${En}px`,
        height: `${ka}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), x = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (I, V) => (p(), h("div", {
      class: "dc-float",
      style: Re(E.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": P.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (S) => C(n).raiseAt(e.path))
    }, [
      y.value ? (p(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: A
      }, [
        g("span", mu, T(k.value), 1),
        w.value.length ? (p(), oe(Xn, {
          key: 0,
          items: w.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : O("", !0),
        !a.value || r.value && _.value && d.value ? (p(), h("div", hu, [
          a.value ? O("", !0) : (p(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (S) => C(n).toggleMinimizeAt(e.path))
          }, [
            ve(ht, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, _u)),
          a.value ? O("", !0) : (p(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (S) => C(n).toggleMaximizeAt(e.path))
          }, [
            ve(ht, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, gu)),
          r.value && _.value && d.value ? (p(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": d.value,
            onClick: V[2] || (V[2] = (S) => C(n).close(d.value))
          }, [
            ve(ht, { kind: "close" })
          ], 8, yu)) : O("", !0)
        ])) : O("", !0)
      ], 40, vu)) : O("", !0),
      g("div", wu, [
        qe(I.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), h(ee, null, ue(o.value ? x : [], (S) => (p(), h("span", {
        key: S,
        class: "dc-float__grip",
        "data-dc-handle": S,
        "aria-hidden": "true",
        onPointerdown: De((F) => C(n).beginFrameDragAt(e.path, F, S), ["stop"])
      }, null, 40, bu))), 128))
    ], 44, pu));
  }
}), $u = /* @__PURE__ */ pe(ku, [["__scopeId", "data-v-f035684c"]]), rs = Symbol("dc.paneContext");
function xu(e) {
  return Tn(rs, e), e;
}
function bd() {
  return _t(rs, null);
}
function kd(e) {
  const t = _t(as, null), n = _t(rs, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => St(e)
  );
  return sl() && Is(s), s;
}
const Cu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Mu = ["data-dc-movable"], Su = ["aria-label", "aria-pressed"], Eu = ["data-dc-space-name"], Pu = { class: "dc-truncate" }, Au = ["aria-label"], zu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Ru = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Tu = { class: "dc-tab__name dc-truncate" }, Lu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Fu = ["aria-label", "data-dc-close", "onClick"], Du = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Iu = { class: "dc-pane__tools" }, Nu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Ou = ["aria-label", "data-dc-minimize"], Vu = ["aria-label", "aria-pressed", "data-dc-maximize"], Ku = ["aria-label", "data-dc-close"], Bu = ["id", "role", "aria-labelledby"], qu = ["id", "role", "aria-labelledby"], Wu = ["data-dc-edge"], Uu = /* @__PURE__ */ fe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ls(), s = Os() ?? "dc-pane", a = m(
      () => t.group.panels.flatMap((K, U) => {
        if (!de(K)) {
          const Me = wt(K) || Lt(K, (ke) => n.panelFor(ke)?.title);
          return [{ kind: "space", index: U, id: `space-${U}`, title: Me, node: K }];
        }
        const te = n.panelFor(K);
        return te ? [{ kind: "panel", index: U, id: K, title: te.title, panel: te }] : [];
      })
    ), l = m(() => a.value.length > 1), r = m(() => {
      const K = ut(t.group);
      return a.value.find((U) => U.index === K) ?? a.value[0] ?? null;
    }), i = m(() => r.value?.kind === "space" ? r.value.node : null), o = m(() => i.value ? "" : xa(t.group)), u = m(() => i.value ? null : n.panelFor(o.value)), d = m(() => r.value?.title ?? ""), _ = m(() => n.spaceNames.value ? t.group.title ?? "" : ""), b = m(() => [...t.path, r.value?.index ?? 0]), y = m(() => o.value || Es(t.group)[0] || ""), k = m(() => n.viewFor(o.value)), w = m(() => t.group.headless === !0), $ = m(() => n.focused.value === o.value), A = m(() => n.dragging.value === o.value), P = m(() => n.moving.value === o.value), E = m(() => n.frameOf(y.value) !== null), x = m(() => n.panelFor(y.value)?.fixed === !0), I = m(
      () => !i.value && (n.canMove(o.value) || E.value && n.movable.value && !x.value)
    ), V = m(
      () => i.value ? n.spaceMenu(b.value) : n.menuFor(o.value)
    ), S = (K) => n.closable(K);
    xu({ panel: o });
    const F = m(() => n.maximized(y.value)), L = m(
      () => E.value && !x.value || !l.value && !!u.value && S(u.value.id)
    ), N = (K) => `${s}-tab-${K}`, W = m(() => `${s}-body`), j = m(() => {
      const K = n.dropTarget.value;
      return !K || !Pe(t.group, K.panel) || K.edge === "float" ? null : K;
    }), Ce = m(() => j.value?.index === void 0 ? j.value?.edge ?? null : null), q = m(() => j.value?.index ?? null), R = () => u.value ? n.renderContent(u.value, k.value, $.value) ?? null : null, Y = () => u.value ? n.renderActions(u.value, k.value, $.value) ?? null : null;
    let ae = null;
    function le(K) {
      const U = ae !== null && Math.hypot(K.clientX - ae.x, K.clientY - ae.y) >= 4;
      return ae = null, U;
    }
    const he = (K) => K.kind === "panel" ? K.id : xe(K.node);
    function Se(K, U) {
      U.kind !== "space" && (n.focus(U.id), ae = { x: K.clientX, y: K.clientY }, n.beginDrag(U.id, K));
    }
    function Xe(K, U) {
      if (le(K)) return;
      const te = he(U);
      te && n.selectPanel(te);
    }
    function Ge(K) {
      o.value && n.focus(o.value), !K.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (E.value ? n.beginFrameDrag(y.value, K, "move") : n.beginDrag(o.value, K));
    }
    function Ye(K) {
      ae = { x: K.clientX, y: K.clientY }, n.beginDrag(o.value, K);
    }
    function Qe(K) {
      le(K) || n.toggleMoveMode(o.value);
    }
    const Ne = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Oe(K) {
      if (!P.value) return;
      if (K.key === "Escape") {
        K.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const U = Ne[K.key];
      U && (K.preventDefault(), E.value ? n.nudgeFrame(o.value, U, K.shiftKey) : n.nudge(o.value, U, K.shiftKey));
    }
    function Ve(K) {
      !E.value || K.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(y.value);
    }
    function xt(K, U) {
      K.stopPropagation(), ae = null, n.close(U);
    }
    function Xt(K, U) {
      const te = a.value.length;
      let Me = null;
      if (K.key === "ArrowRight" ? Me = (U + 1) % te : K.key === "ArrowLeft" ? Me = (U - 1 + te) % te : K.key === "Home" ? Me = 0 : K.key === "End" && (Me = te - 1), Me === null) return;
      K.preventDefault();
      const ke = a.value[Me];
      if (!ke) return;
      const Ct = he(ke);
      Ct && n.selectPanel(Ct);
    }
    return (K, U) => r.value ? (p(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": C(Es)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": E.value ? "true" : "false",
      "data-dc-maximized": F.value ? "true" : "false",
      "data-dc-headless": w.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": A.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: U[7] || (U[7] = (te) => o.value && C(n).focus(o.value))
    }, [
      w.value ? O("", !0) : (p(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": I.value ? "true" : "false",
        onPointerdown: Ge,
        onDblclick: Ve
      }, [
        I.value ? (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": P.value,
          onPointerdown: Ye,
          onClick: Qe,
          onKeydown: Oe
        }, [...U[8] || (U[8] = [
          g("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Su)) : O("", !0),
        _.value ? (p(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": _.value
        }, [
          g("span", Pu, T(_.value), 1)
        ], 8, Eu)) : O("", !0),
        g("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (p(!0), h(ee, null, ue(a.value, (te, Me) => (p(), h(ee, {
            key: te.id
          }, [
            q.value === Me ? (p(), h("span", zu)) : O("", !0),
            g("button", {
              id: N(te.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": te.kind === "panel" ? te.id : void 0,
              "data-dc-space": te.kind === "space" ? te.title : void 0,
              "aria-selected": te.index === r.value.index,
              "aria-controls": W.value,
              tabindex: te.index === r.value.index ? 0 : -1,
              onPointerdown: (ke) => Se(ke, te),
              onClick: (ke) => Xe(ke, te),
              onKeydown: (ke) => Xt(ke, Me)
            }, [
              g("span", Tu, T(te.title), 1),
              te.kind === "panel" && te.panel.subtitle ? (p(), h("span", Lu, T(te.panel.subtitle), 1)) : O("", !0),
              l.value && te.kind === "panel" && S(te.id) ? (p(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${te.title}`,
                "data-dc-close": te.id,
                onPointerdown: U[0] || (U[0] = De(() => {
                }, ["stop"])),
                onClick: (ke) => xt(ke, te.id)
              }, [...U[9] || (U[9] = [
                g("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Fu)) : O("", !0)
            ], 40, Ru)
          ], 64))), 128)),
          q.value === a.value.length ? (p(), h("span", Du)) : O("", !0)
        ], 8, Au),
        g("div", Iu, [
          ve(Y),
          V.value.length ? (p(), oe(Xn, {
            key: 0,
            items: V.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ]),
        L.value ? (p(), h("div", Nu, [
          E.value && !x.value ? (p(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: U[1] || (U[1] = De(() => {
            }, ["stop"])),
            onClick: U[2] || (U[2] = (te) => C(n).toggleMinimize(y.value))
          }, [
            ve(ht, { kind: "minimize" })
          ], 40, Ou)) : O("", !0),
          E.value && !x.value ? (p(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${F.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": F.value,
            "data-dc-maximize": y.value,
            onPointerdown: U[3] || (U[3] = De(() => {
            }, ["stop"])),
            onClick: U[4] || (U[4] = (te) => C(n).toggleMaximize(y.value))
          }, [
            ve(ht, {
              kind: F.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Vu)) : O("", !0),
          !l.value && u.value && S(u.value.id) ? (p(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: U[5] || (U[5] = De(() => {
            }, ["stop"])),
            onClick: U[6] || (U[6] = (te) => C(n).close(u.value.id))
          }, [
            ve(ht, { kind: "close" })
          ], 40, Ku)) : O("", !0)
        ])) : O("", !0)
      ], 40, Mu)),
      i.value ? (p(), h("div", {
        key: 1,
        id: W.value,
        class: "dc-pane__space",
        role: w.value ? void 0 : "tabpanel",
        "aria-labelledby": w.value ? void 0 : N(r.value.id)
      }, [
        qe(K.$slots, "space", {
          node: i.value,
          path: b.value
        }, void 0, !0)
      ], 8, Bu)) : (p(), h("div", {
        key: 2,
        id: W.value,
        class: "dc-pane__body",
        role: w.value ? void 0 : "tabpanel",
        "aria-labelledby": w.value ? void 0 : N(o.value)
      }, [
        ve(R)
      ], 8, qu)),
      Ce.value ? (p(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": Ce.value,
        "aria-hidden": "true"
      }, null, 8, Wu)) : O("", !0)
    ], 40, Cu)) : O("", !0);
  }
}), Ia = /* @__PURE__ */ pe(Uu, [["__scopeId", "data-v-44fd2b2d"]]), Hu = ["data-dc-space", "data-dc-path", "aria-label"], ju = {
  key: 0,
  class: "dc-space__head"
}, Xu = { class: "dc-space__title dc-truncate" }, Gu = ["data-dc-direction"], Yu = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Qu = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Zu = /* @__PURE__ */ fe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ls(), s = X(null), a = m(() => H(t.node) ? t.node : null), l = m(() => $t(t.node) ? t.node : null), r = m(() => J(t.node) ? t.node : null), i = m(
      () => l.value ? l.value.children : r.value?.frames.map((R) => R.node) ?? []
    ), o = m(() => l.value ? Ue(l.value) : []), u = m(
      () => (r.value?.frames ?? []).map((R, Y) => ({
        held: R,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: Y,
        key: S(R.node),
        path: [...t.path, Y]
      })).sort((R, Y) => R.key < Y.key ? -1 : R.key > Y.key ? 1 : 0)
    ), d = m(() => wt(t.node)), _ = m(() => n.spaceMenu(t.path)), b = m(() => t.node.headless === !0), y = m(() => r.value ? "desktop" : l.value?.direction ?? ""), k = X(null), w = X(0);
    let $ = null;
    be(
      k,
      (R) => {
        $?.disconnect(), $ = null, !(!R || typeof ResizeObserver > "u") && (w.value = R.clientWidth, $ = new ResizeObserver(([Y]) => {
          w.value = Y?.contentRect.width ?? 0;
        }), $.observe(R));
      },
      { immediate: !0 }
    ), He(() => $?.disconnect());
    const A = m(() => {
      const R = Math.max(
        1,
        Math.floor((w.value + dt) / (En + dt))
      ), Y = /* @__PURE__ */ new Map();
      let ae = 0;
      for (const le of u.value)
        le.held.minimized === !0 && (Y.set(le.key, {
          x: dt + ae % R * (En + dt),
          bottom: dt + Math.floor(ae / R) * (ka + dt)
        }), ae += 1);
      return Y;
    }), P = (R) => !!R && R.join("/") === t.path.join("/"), E = m(() => {
      const R = n.dropTarget.value, Y = r.value;
      if (!Y || !R?.rect || R.edge !== "float") return null;
      if (R.space) return P(R.space) ? R.rect : null;
      const ae = we(Y, R.panel);
      return ae && Y.frames.includes(ae) ? R.rect : null;
    }), x = m(() => {
      const R = n.dropTarget.value;
      return !!R && !R.rect && P(R.space);
    }), I = m(() => l.value?.direction === "row"), V = m(() => i.value.map((R, Y) => [...t.path, Y])), S = (R) => [...je(R)].sort().join("/"), F = (R) => {
      const Y = je(R)[0];
      return (Y ? n.panelFor(Y)?.title : null) ?? Y ?? "panel";
    }, L = (R) => {
      const Y = i.value[R], ae = i.value[R + 1];
      return !Y || !ae ? "Resize panels" : `Resize ${F(Y)} and ${F(ae)}`;
    }, N = (R) => {
      const Y = o.value[R] ?? 0, ae = o.value[R + 1] ?? 0, le = Y + ae;
      return le > 0 ? Math.round(Y / le * 100) : 50;
    };
    function W() {
      const R = s.value, Y = R ? I.value ? R.clientWidth : R.clientHeight : 0;
      return Y <= 0 ? 0.05 : Math.min(n.minPanelSize.value / Y, 0.4);
    }
    let j = null;
    function Ce(R, Y) {
      const ae = l.value, le = s.value;
      if (!n.resizable.value || !ae || !le || R.button !== 0) return;
      const he = I.value ? le.clientWidth : le.clientHeight;
      if (he <= 0) return;
      const Se = I.value ? R.clientX : R.clientY, Xe = Ue(ae), Ge = Math.min(n.minPanelSize.value / he, 0.4);
      R.preventDefault();
      const Ye = (Oe) => {
        const Ve = ((I.value ? Oe.clientX : Oe.clientY) - Se) / he;
        n.setSizes(t.path, Ls(Xe, Y, Ve, Ge));
      }, Qe = () => j?.(), Ne = (Oe) => {
        Oe.key === "Escape" && (n.setSizes(t.path, Xe), j?.());
      };
      j = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", Qe), window.removeEventListener("keydown", Ne), j = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", Qe), window.addEventListener("keydown", Ne);
    }
    He(() => j?.());
    function q(R, Y) {
      const ae = l.value;
      if (!n.resizable.value || !ae) return;
      const le = I.value ? "ArrowRight" : "ArrowDown", he = I.value ? "ArrowLeft" : "ArrowUp", Se = R.shiftKey ? 0.1 : 0.02;
      if (R.key !== le && R.key !== he) return;
      const Xe = R.key === le ? Se : -Se;
      R.preventDefault(), n.setSizes(t.path, Ls(Ue(ae), Y, Xe, W()));
    }
    return (R, Y) => {
      const ae = Vs("WindowNode", !0);
      return a.value ? (p(), oe(Ia, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: gt(({ node: le, path: he }) => [
          ve(ae, {
            node: le,
            path: he,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (p(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": y.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !b.value ? (p(), h("header", ju, [
          g("span", Xu, T(d.value), 1),
          _.value.length ? (p(), oe(Xn, {
            key: 0,
            items: _.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : O("", !0)
        ])) : O("", !0),
        r.value ? (p(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: k,
          class: "dc-window__desktop"
        }, [
          E.value ? (p(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${E.value.x}px`,
              top: `${E.value.y}px`,
              width: `${E.value.w}px`,
              height: `${E.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          (p(!0), h(ee, null, ue(u.value, (le) => (p(), oe($u, {
            key: le.key,
            frame: le.held,
            path: le.path,
            order: le.order,
            place: A.value.get(le.key) ?? null
          }, {
            default: gt(() => [
              ve(ae, {
                node: le.held.node,
                path: le.path,
                framed: le.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (p(), h("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          x.value ? (p(), h("div", Yu)) : O("", !0),
          (p(!0), h(ee, null, ue(i.value, (le, he) => (p(), h(ee, {
            key: S(le)
          }, [
            g("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: o.value[he] ?? 1 })
            }, [
              ve(ae, {
                node: le,
                path: V.value[he] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            he < i.value.length - 1 ? (p(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": I.value ? "vertical" : "horizontal",
              "aria-label": L(he),
              "aria-valuenow": N(he),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": C(n).resizable.value ? void 0 : "true",
              tabindex: C(n).resizable.value ? 0 : -1,
              onPointerdown: (Se) => Ce(Se, he),
              onKeydown: (Se) => q(Se, he)
            }, null, 40, Qu)) : O("", !0)
          ], 64))), 128))
        ], 8, Gu)) : O("", !0)
      ], 8, Hu));
    };
  }
}), Ju = /* @__PURE__ */ pe(Zu, [["__scopeId", "data-v-fb5b403f"]]), ed = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], td = {
  key: 1,
  class: "dc-window__empty"
}, nd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Zt = 16, sd = /* @__PURE__ */ fe({
  __name: "WindowFrame",
  props: /* @__PURE__ */ ln({
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
  emits: /* @__PURE__ */ ln(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = At(e, "layout"), r = At(e, "views"), i = Ln(), o = m(() => new Map(s.panels.map((c) => [c.id, c]))), u = m(() => s.panels.map((c) => c.id)), d = m(() => lu(l.value, u.value)), _ = X(null), b = X(null), y = X(null), k = X(!0), w = X(null), $ = X(null), A = X(null), P = X(""), E = X(null);
    function x() {
      const c = E.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function I(c) {
      const f = [];
      let v = c.closest(".dc-float");
      for (; v; )
        f.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return f;
    }
    function V() {
      return x().map((c) => ({ pane: c, order: I(c.element) })).sort((c, f) => {
        const v = Math.max(c.order.length, f.order.length);
        for (let M = 0; M < v; M += 1) {
          const z = (c.order[M] ?? -1) - (f.order[M] ?? -1);
          if (z !== 0) return z;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const S = (c) => x().find((f) => f.panels.includes(c)) ?? null;
    function F(c) {
      const f = o.value.get(c);
      if (!f) return "";
      const v = r.value[c];
      return v && f.views?.some((M) => M.key === v) ? v : f.defaultView ?? f.views?.[0]?.key ?? "";
    }
    function L(c, f) {
      r.value = { ...r.value, [c]: f }, a("view-change", { panel: c, view: f });
    }
    const N = m(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function W(c) {
      return !s.movable || N.value < 1 || s.panels.length < 2 ? !1 : o.value.get(c)?.fixed !== !0;
    }
    function j(c, f) {
      const v = d.value;
      !c || !v || c === v || (l.value = c, f && a("panel-move", f));
    }
    function Ce(c, f, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (f - c.left) / c.width, z = (v - c.top) / c.height, D = 0.3;
      return M > D && M < 1 - D && z > D && z < 1 - D ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: z },
        { edge: "bottom", distance: 1 - z }
      ].reduce(
        (ne, B) => B.distance < ne.distance ? B : ne
      ).edge;
    }
    function q(c, f) {
      const v = [...c.querySelectorAll(".dc-tab")], M = v.findIndex((z) => {
        const D = z.getBoundingClientRect();
        return f < D.left + D.width / 2;
      });
      return M === -1 ? v.length : M;
    }
    function R(c, f, v) {
      for (const { panels: M, element: z } of V().reverse()) {
        const D = z.getBoundingClientRect();
        if (c < D.left || c > D.right || f < D.top || f > D.bottom) continue;
        const ie = M.find((Q) => Q !== v), ne = z.querySelector(".dc-pane__tabs"), B = ne?.getBoundingClientRect();
        if (ne && B && f >= B.top && f <= B.bottom)
          return ie ? { panel: ie, edge: "center", index: q(ne, c) } : null;
        const G = z.querySelector(":scope > .dc-pane__space");
        if (G) {
          const Q = G.getBoundingClientRect();
          if (c >= Q.left && c <= Q.right && f >= Q.top && f <= Q.bottom) continue;
        }
        return ie ? { panel: ie, edge: Ce(D, c, f) } : null;
      }
      return ae(c, f, v) ?? Se(c, f);
    }
    function Y() {
      const c = E.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((f) => f.closest(".dc-window") === c).reverse() : [];
    }
    function ae(c, f, v) {
      const M = d.value;
      if (!M) return null;
      for (const z of Y()) {
        const D = z.getBoundingClientRect();
        if (c < D.left || c > D.right || f < D.top || f > D.bottom) continue;
        const ie = Xe(z), ne = ie.flatMap((re) => re.panels).find((re) => re !== v);
        if (!ne && ie.length > 0) return null;
        const B = we(M, v)?.rect, G = gn(
          {
            x: c - D.left - 24,
            y: f - D.top - 12,
            w: B?.w ?? rt.w,
            h: B?.h ?? rt.h
          },
          { w: z.clientWidth, h: z.clientHeight },
          s.minPanelSize
        );
        if (ne) return { panel: ne, edge: "float", rect: G };
        const Q = le(z);
        return Q ? { panel: "", space: Q, edge: "float", rect: G } : null;
      }
      return null;
    }
    function le(c) {
      const f = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return f == null ? null : f === "" ? [] : f.split("/").map(Number);
    }
    function he() {
      const c = E.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((f) => f.closest(".dc-window") === c).filter((f) => !f.querySelector(".dc-pane")).reverse().flatMap((f) => {
        const v = le(f);
        return v ? [{ element: f, path: v }] : [];
      }) : [];
    }
    function Se(c, f) {
      for (const { element: v, path: M } of he()) {
        if (v.dataset.dcSpace === "desktop") continue;
        const z = v.getBoundingClientRect();
        if (!(c < z.left || c > z.right || f < z.top || f > z.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Xe(c) {
      return x().filter(
        (f) => f.element.closest(".dc-window__desktop") === c
      );
    }
    let Ge = null;
    const Ye = (c) => c.altKey;
    function Qe(c, f) {
      if (!W(c) || b.value || $.value || f.button !== 0) return;
      const v = f.clientX, M = f.clientY;
      let z = !1, D = Ye(f);
      const ie = () => {
        const ce = A.value;
        ce && (y.value = D ? ae(ce.x, ce.y, c) : R(ce.x, ce.y, c));
      }, ne = (ce) => {
        if (!z) {
          if (Math.hypot(ce.clientX - v, ce.clientY - M) < 4) return;
          z = !0, b.value = c, w.value = null;
        }
        D = Ye(ce), k.value = !D, A.value = { x: ce.clientX, y: ce.clientY }, ie();
      }, B = (ce) => {
        Ye(ce) !== D && (D = !D, k.value = !D, z && ie());
      }, G = (ce) => {
        Ge?.();
        const Z = y.value, $e = d.value;
        if (ce && z && Z && $e) {
          const Ze = Z.space ? Rs($e, c, Z.space, Z.rect) : Z.edge === "float" && Z.rect ? zs($e, c, Z.panel, Z.rect) : Qt($e, c, Z.panel, Z.edge, Z.index);
          j(Ze, {
            panel: c,
            target: Z.panel,
            edge: Z.edge,
            ...Z.space === void 0 ? {} : { space: Z.space },
            ...Z.index === void 0 ? {} : { index: Z.index },
            ...Z.rect === void 0 ? {} : { rect: Z.rect }
          });
        }
        b.value = null, y.value = null, A.value = null, k.value = !0;
      }, Q = () => G(!0), re = () => G(!1), me = (ce) => {
        if (ce.key === "Escape") {
          G(!1);
          return;
        }
        B(ce);
      };
      Ge = () => {
        window.removeEventListener("pointermove", ne), window.removeEventListener("pointerup", Q), window.removeEventListener("pointercancel", re), window.removeEventListener("keydown", me), window.removeEventListener("keyup", B), Ge = null;
      }, window.addEventListener("pointermove", ne), window.addEventListener("pointerup", Q), window.addEventListener("pointercancel", re), window.addEventListener("keydown", me), window.addEventListener("keyup", B);
    }
    He(() => Ge?.());
    let Ne = null;
    function Oe(c) {
      const f = E.value;
      return f ? [...f.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((z) => z.closest(".dc-window") === f)?.parentElement ?? null : null;
    }
    function Ve(c) {
      const f = d.value;
      return f ? zn(f, c) : null;
    }
    function xt(c) {
      const f = d.value;
      if (!f) return;
      const v = Rt(f, c);
      v !== f && (l.value = v);
    }
    function Xt(c) {
      const f = Ve(c);
      f && xt(f);
    }
    function K(c) {
      const f = d.value, v = f ? we(f, c) : null;
      return v !== null && Je(v);
    }
    function U(c) {
      const f = d.value, v = f ? we(f, c) : null;
      return v !== null && lt(v);
    }
    function te(c) {
      const f = d.value, v = f ? at(f, c) : null;
      return v ? xe(v.node) : "";
    }
    function Me(c) {
      const f = d.value, v = f ? at(f, c) : null;
      if (!f || !v) return;
      const M = xe(v.node);
      if (o.value.get(M)?.fixed === !0) return;
      const z = !lt(v);
      let D = Xc(f, c, z);
      D !== f && (z || (D = Rt(D, c)), l.value = D, a("frame-minimize", { panel: M, minimized: z }));
    }
    function ke(c) {
      const f = Ve(c);
      f && Me(f);
    }
    function Ct(c) {
      const f = d.value, v = f ? at(f, c) : null;
      if (!f || !v) return;
      const M = xe(v.node);
      if (o.value.get(M)?.fixed === !0) return;
      const z = !Je(v);
      let D = jc(f, c, z);
      D !== f && (z && (D = Rt(D, c)), l.value = D, a("frame-maximize", { panel: M, maximized: z }));
    }
    function os(c) {
      const f = Ve(c);
      f && Ct(f);
    }
    function is(c, f, v) {
      const M = d.value, z = M ? at(M, c) : null;
      if (!M || !z || f.button !== 0 || b.value || $.value) return;
      const D = xe(z.node);
      if (o.value.get(D)?.fixed === !0 || Je(z) || lt(z) || (v === "move" ? !s.movable : !s.resizable)) return;
      const ie = Oe(c), ne = Gc(M, c);
      xt(c);
      const B = { w: ie?.clientWidth ?? 0, h: ie?.clientHeight ?? 0 }, G = { ...z.rect }, Q = f.clientX, re = f.clientY, me = s.minPanelSize;
      $.value = D;
      const ce = (Ee) => {
        const Ke = d.value;
        if (!Ke) return;
        const Mt = As(Ke, ne, gn(Ee, B, me));
        Mt !== Ke && (l.value = Mt);
      }, Z = (Ee) => {
        Ee.preventDefault();
        const Ke = Ee.clientX - Q, Mt = Ee.clientY - re;
        ce(
          v === "move" ? { ...G, x: G.x + Ke, y: G.y + Mt } : Ps(G, v, Ke, Mt, me)
        );
      }, $e = (Ee) => {
        if (Ne?.(), $.value = null, !Ee) {
          ce(G);
          return;
        }
        const Ke = d.value ? at(d.value, ne) : null;
        Ke && a("frame-change", { panel: te(ne), rect: Ke.rect });
      }, Ze = () => $e(!0), nt = () => $e(!1), st = (Ee) => {
        Ee.key === "Escape" && $e(!1);
      };
      Ne = () => {
        window.removeEventListener("pointermove", Z), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", nt), window.removeEventListener("keydown", st), Ne = null;
      }, window.addEventListener("pointermove", Z), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", nt), window.addEventListener("keydown", st);
    }
    function Na(c, f, v) {
      const M = Ve(c);
      M && is(M, f, v);
    }
    function Oa(c, f, v = !1) {
      const M = d.value, z = Ve(c), D = M && z ? at(M, z) : null;
      if (!M || !z || !D || o.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Je(D) || lt(D)) {
        P.value = `${Le(c)} is ${Je(D) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ie = f === "left" ? -Zt : f === "right" ? Zt : 0, ne = f === "up" ? -Zt : f === "down" ? Zt : 0, B = Oe(z), G = { w: B?.clientWidth ?? 0, h: B?.clientHeight ?? 0 }, Q = v ? Ps(D.rect, "se", ie, ne, s.minPanelSize) : { ...D.rect, x: D.rect.x + ie, y: D.rect.y + ne }, re = As(M, z, gn(Q, G, s.minPanelSize));
      if (re === M) {
        P.value = v ? `${Le(c)} cannot be resized further.` : `${Le(c)} cannot move ${f}.`;
        return;
      }
      l.value = re;
      const me = at(re, z);
      me && (a("frame-change", { panel: c, rect: me.rect }), P.value = v ? `${Le(c)} resized to ${me.rect.w} by ${me.rect.h}.` : `${Le(c)} moved to ${me.rect.x}, ${me.rect.y}.`);
    }
    He(() => Ne?.());
    function Va(c, f) {
      const v = S(c), M = v?.element.getBoundingClientRect();
      if (!v || !M) return null;
      const z = f === "left" || f === "right", D = (B) => {
        if (!(z ? B.bottom > M.top + 1 && B.top < M.bottom - 1 : B.right > M.left + 1 && B.left < M.right - 1)) return null;
        const Q = f === "left" ? M.left - B.right : f === "right" ? B.left - M.right : f === "up" ? M.top - B.bottom : B.top - M.bottom;
        return Q < -1 ? null : Q;
      }, ie = [];
      for (const B of x()) {
        if (B === v || B.element === v.element) continue;
        const G = D(B.element.getBoundingClientRect());
        if (G === null) continue;
        const Q = B.panels.find((re) => re !== c);
        Q && ie.push({ to: { panel: Q }, distance: G });
      }
      for (const { element: B, path: G } of he()) {
        const Q = D(B.getBoundingClientRect());
        Q !== null && ie.push({ to: { space: G }, distance: Q });
      }
      return ie.reduce(
        (B, G) => B && B.distance <= G.distance ? B : G,
        null
      )?.to ?? null;
    }
    function Ka(c) {
      const f = d.value ? we(d.value, c) !== null : !1;
      if (!f && !W(c)) return;
      w.value = w.value === c ? null : c;
      const v = Le(c);
      if (!w.value) {
        P.value = `${v}: move mode off.`;
        return;
      }
      P.value = f ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Le = (c) => o.value.get(c)?.title ?? c, Ba = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function qa(c, f, v = !1) {
      if (!W(c)) return;
      const M = d.value;
      if (!M) return;
      const z = Le(c), D = pt(M, c);
      if (!v && D && (f === "left" || f === "right") && D.panels.length > 1) {
        const re = D.panels.indexOf(c), me = f === "left" ? re - 1 : re + 1;
        if (me >= 0 && me < D.panels.length) {
          j(Tt(M, c, me), { panel: c, target: c, edge: "center", index: me }), P.value = `${z} moved ${f}, now tab ${me + 1} of ${D.panels.length}.`, fn(c);
          return;
        }
      }
      const ne = Va(c, f);
      if (!ne || ne.panel !== void 0 && !W(ne.panel)) {
        P.value = `${z} cannot move ${f}.`;
        return;
      }
      const B = Ba[f];
      if (ne.space) {
        const re = ne.space, me = tt(M, re), ce = we(M, c)?.rect, Z = { ...rt, ...ce ? { w: ce.w, h: ce.h } : {} };
        j(Rs(M, c, re, Z), { panel: c, target: "", space: re, edge: B }), P.value = `${z} moved ${f}, into ${me ? wt(me) : "the space"}.`, fn(c);
        return;
      }
      const G = ne.panel, Q = D?.panels.length === 1 && pt(M, G)?.panels.length === 1;
      v ? (j(Qt(M, c, G, "center"), {
        panel: c,
        target: G,
        edge: "center"
      }), P.value = `${z} joined ${Le(G)} as a tab.`) : Q ? (j(nn(M, c, G), { panel: c, target: G, edge: B }), P.value = `${z} moved ${f}, trading places with ${Le(G)}.`) : (j(Qt(M, c, G, B), { panel: c, target: G, edge: B }), P.value = `${z} moved ${f}, beside ${Le(G)}.`), fn(c);
    }
    function fn(c) {
      Dt(() => {
        S(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Wa(c, f) {
      const v = d.value;
      v && (l.value = sn(v, c, f));
    }
    function pn(c) {
      const f = d.value;
      if (!f) return;
      const v = mt(f, c);
      v !== f && (l.value = v, a("tab-select", { panel: c }));
    }
    function cs(c) {
      return o.value.get(c)?.closable ?? s.closable;
    }
    function Ua(c) {
      cs(c) && a("panel-close", c);
    }
    const vn = X(/* @__PURE__ */ new Map());
    let Ha = 0;
    function ja(c, f) {
      const v = Ha += 1;
      return vn.value.set(v, { panel: c, items: f }), () => {
        vn.value.delete(v);
      };
    }
    function Xa(c) {
      const f = [];
      for (const v of vn.value.values())
        v.panel() === c && f.push(...v.items());
      return f;
    }
    function us(c) {
      const f = c.filter((v) => v.items.length > 0);
      return f.length < 2 ? f.flatMap((v) => v.items) : f.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const ds = (c) => c.title || "These tabs";
    function Ga(c, f) {
      const v = f.id, M = pt(c, v), z = (M?.panels.length ?? 0) > 1, D = M?.fixedView === !0, ie = (Q) => ({
        action: () => {
          Q !== c && (l.value = Q);
        }
      }), ne = [], B = [], G = f.views ?? [];
      if (G.length > 1 && !D) {
        const Q = F(v);
        ne.push({
          id: "view",
          label: "View",
          items: G.map((re) => ({
            id: `view-${re.key}`,
            label: re.label,
            checked: re.key === Q,
            action: () => L(v, re.key)
          }))
        });
      }
      return z && !D && B.push(
        { id: "show-row", label: "Row", checked: !1, ...ie(Ts(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ie(Ts(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ie(Jc(c, v))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ie(eu(c, v))
        }
      ), z && M && (B.length && B.push({ separator: !0 }), B.push(...fs(M, v))), { panel: ne, tabs: B, tabsTitle: M ? ds(M) : "" };
    }
    function fs(c, f) {
      const v = ut(c), M = (z) => {
        const D = c.panels[(v + z + c.panels.length) % c.panels.length];
        return (D === void 0 ? "" : xe(D)) || f;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => pn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => pn(M(-1)) }
      ];
    }
    function Gt(c) {
      return c.title ? c.title : H(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : wt(c);
    }
    function ps(c) {
      if (!c || J(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Te(c)) return null;
      const f = Da(c);
      return f && f.fixedView !== !0 ? f : null;
    }
    function Ya(c) {
      const f = d.value;
      if (!s.menu || !f) return [];
      const v = tt(f, c);
      if (!v || H(v)) return [];
      if (v.fixedView) return [];
      const M = J(v) ? "desktop" : v.direction, z = (Z, $e, Ze) => ({
        id: `show-${Z}`,
        label: $e,
        checked: M === Z,
        action: () => {
          const nt = d.value, st = Ze();
          !nt || st === v || (l.value = cn(ge(it(nt, c, st))));
        }
      }), D = () => {
        const Z = Ra(v, Qa(v));
        if (H(Z) && Z.panels.length === 0) return v;
        const $e = H(Z) && Z.panels.length === 1 ? Z.panels[0] : void 0;
        return $e !== void 0 && de($e) ? v : Z;
      }, ie = (Z) => () => J(v) ? Fa(v, Z) : v.direction === Z ? v : { ...v, direction: Z }, ne = c.slice(0, -1), B = c.length > 0 ? tt(f, ne) : null, G = B && H(B) && B.panels.length > 1 ? B : null, Q = B && ps(B) === v ? B : null, re = ps(v), me = v.title || "this space", ce = (Z, $e, Ze, nt, st) => ({
        id: Z,
        label: st,
        action: () => {
          const Ee = d.value;
          Ee && (l.value = cn(ge(it(Ee, $e, su(Ze, nt)))));
        }
      });
      return us([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            z("row", "Row", ie("row")),
            z("column", "Column", ie("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            z("tabs", "Tabs", () => D()),
            z("desktop", "Desktop", () => J(v) ? v : La(v))
          ]
        },
        {
          id: "about-around",
          title: re ? `Around ${Gt(re)}` : "",
          items: re ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...re.title ? [] : [ce("merge-around-keep-this", c, v, "outer", `Keep ${me}`)],
            ...v.title ? [] : [ce("merge-around-keep-that", c, v, "inner", `Keep ${Gt(re)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Q ? `Inside ${Gt(Q)}` : "",
          items: Q ? [
            ...v.title ? [] : [ce("merge-inside-keep-that", ne, Q, "outer", `Keep ${Gt(Q)}`)],
            ...Q.title ? [] : [ce("merge-inside-keep-this", ne, Q, "inner", `Keep ${me}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: G ? ds(G) : "",
          items: G ? fs(G, xe(v)) : []
        }
      ]);
    }
    function Qa(c) {
      const f = _.value;
      return f && se(c, f) ? f : void 0;
    }
    function Za(c) {
      const f = d.value, v = o.value.get(c);
      if (!f || !v) return [];
      const M = s.menu ? Ga(f, v) : null, z = Xa(c);
      z.length && M?.panel.length && z.push({ separator: !0 }), M && z.push(...M.panel);
      const D = us([
        { id: "about-panel", title: v.title, items: z },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, D) : D;
    }
    function Ja(c, f) {
      return i[`${c}-${f}`] ?? i[c];
    }
    function vs(c, f, v, M) {
      return Ja(c, f.id)?.({ panel: f, view: v, active: M });
    }
    ru({
      panelFor: (c) => o.value.get(c) ?? null,
      viewFor: F,
      setView: L,
      movable: m(() => s.movable),
      resizable: m(() => s.resizable),
      minPanelSize: m(() => s.minPanelSize),
      spaceNames: m(() => s.spaceNames),
      focused: _,
      dragging: b,
      dropTarget: y,
      moving: w,
      framing: $,
      canMove: W,
      focus(c) {
        _.value !== c && (_.value = c, a("panel-activate", c));
      },
      selectPanel: pn,
      beginDrag: Qe,
      toggleMoveMode: Ka,
      nudge: qa,
      setSizes: Wa,
      frameOf: (c) => d.value ? we(d.value, c) : null,
      beginFrameDrag: Na,
      nudgeFrame: Oa,
      raise: Xt,
      maximized: K,
      toggleMaximize: os,
      minimized: U,
      toggleMinimize: ke,
      beginFrameDragAt: is,
      raiseAt: xt,
      toggleMaximizeAt: Ct,
      toggleMinimizeAt: Me,
      menuFor: Za,
      spaceMenu: Ya,
      registerMenu: ja,
      closable: cs,
      close: Ua,
      renderContent: (c, f, v) => vs("panel", c, f, v),
      renderActions: (c, f, v) => vs("actions", c, f, v),
      layout: d
    });
    const el = m(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), tl = () => {
      const c = b.value, f = A.value;
      return !c || !f ? null : al(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${f.x}px`, top: `${f.y}px` },
          "aria-hidden": "true"
        },
        o.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, f, v, M) {
        const z = d.value;
        z && j(Qt(z, c, f, v, M), {
          panel: c,
          target: f,
          edge: v,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const f = d.value;
        f && (l.value = mt(f, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, f, v) {
        const M = d.value;
        M && j(zs(M, c, f, v), {
          panel: c,
          target: f,
          edge: "float",
          rect: v
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, f) {
        const v = d.value;
        if (!v) return;
        const M = Wc(v, c, f);
        if (M === v) return;
        l.value = M;
        const z = we(M, c);
        z && a("frame-change", { panel: c, rect: z.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: L,
      /** Brings a floating frame to the front of its stack. */
      raise: Xt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: os,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: ke
    }), (c, f) => (p(), h("div", {
      ref_key: "root",
      ref: E,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": b.value ? "true" : "false",
      "data-dc-docking": k.value ? "true" : "false",
      style: Re(el.value)
    }, [
      d.value ? (p(), oe(Ju, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (p(), h("p", td, " This window has no panels. ")),
      ve(tl),
      g("p", nd, T(P.value), 1)
    ], 12, ed));
  }
}), ad = /* @__PURE__ */ pe(sd, [["__scopeId", "data-v-711565af"]]);
function $d(e = "", t = "/") {
  const n = X(We(e)), s = X(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(l) {
      n.value = We(l), a.push(`${s.value}${n.value}`);
    },
    replace(l) {
      n.value = We(l), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Ds(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function xd(e) {
  const t = X(Ds(e.currentRoute.value.fullPath)), n = m(() => e.currentRoute.value.path), s = be(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Ds(a);
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
const ld = {
  DataShell: xc,
  ShellHeader: ia,
  QueryPanel: ua,
  RecordActions: da,
  ResultsArea: ya,
  FacetControl: ca,
  SegmentedControl: Mn,
  StatusPill: Kt,
  WindowFrame: ad,
  WindowPane: Ia,
  ListView: Sn,
  CardsView: pa,
  GridView: va,
  TableView: _a,
  LinksView: ma,
  PreviewView: ha,
  TypeCardsView: ga
}, Cd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(ld))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ks, t.route);
  }
};
export {
  on as CASCADE_STEP,
  cd as COLUMN_BREAKPOINTS,
  id as COLUMN_ROLES,
  pa as CardsView,
  Ss as ColumnCell,
  rt as DEFAULT_FRAME,
  kn as DEFAULT_SORT,
  rl as DEFAULT_VIEW,
  xc as DataShell,
  $n as EMPTY_CELL,
  sa as ENTITY_ALL,
  rn as ENTITY_TERM,
  Nt as EXPRESSION_TERM,
  Hn as FACET_PREFIX,
  ca as FacetControl,
  va as GridView,
  Cd as HeaderContentLayoutPlugin,
  ma as LinksView,
  Sn as ListView,
  dt as MINIMIZED_GAP,
  ka as MINIMIZED_HEIGHT,
  En as MINIMIZED_WIDTH,
  ba as MIN_FRAME,
  $s as MOCK_TINTS,
  dd as MenuBar,
  Xn as MenuButton,
  wa as MenuList,
  Bt as MetricDrill,
  rs as PANE_CONTEXT_KEY,
  qn as PARAM_DIR,
  Vn as PARAM_ENTITY,
  Wn as PARAM_EXPR,
  Un as PARAM_PAGE,
  Bn as PARAM_SORT,
  Kn as PARAM_VIEW,
  jn as PinStar,
  ha as PreviewView,
  ua as QueryPanel,
  Yt as RECORD_STATUSES,
  Ys as RESULT_FIELDS,
  Ks as ROUTE_ADAPTER_KEY,
  da as RecordActions,
  ya as ResultsArea,
  na as SHELL_CONTEXT_KEY,
  od as SHELL_THEMES,
  qt as ScopeMark,
  Mn as SegmentedControl,
  kt as SelectTick,
  ia as ShellHeader,
  Kt as StatusPill,
  _a as TableView,
  ga as TypeCardsView,
  Fn as VIEW_KINDS,
  qs as VIEW_LABELS,
  as as WINDOW_CONTEXT_KEY,
  ad as WindowFrame,
  Ia as WindowPane,
  xa as activePanel,
  ut as activeTab,
  Kl as addTerm,
  Bc as axisOf,
  Qn as cascade,
  Js as cellFull,
  Ot as cellText,
  en as cellTextOf,
  ze as cellValue,
  hs as changesResults,
  gn as clampRect,
  Ra as collapseSpace,
  Jc as collapseToTabs,
  pd as column,
  ys as columnAlign,
  ws as columnClass,
  gs as columnKey,
  xn as columnTruncates,
  fl as columnsFor,
  il as countPages,
  ll as createHistoryAdapter,
  $d as createMemoryAdapter,
  Il as createMockDataSource,
  xd as createVueRouterAdapter,
  ml as defaultCellText,
  Fs as defaultLayout,
  On as defaultQuery,
  Bl as drillExpression,
  Rs as dropIntoSpace,
  It as emptyFacetState,
  Dn as emptyFacetValue,
  ft as findEntity,
  et as findSort,
  md as fixedView,
  Yn as float,
  zs as floatPanel,
  La as floatSplit,
  eu as floatTabs,
  Jt as fnv1a,
  Us as focusEntity,
  _s as formatCount,
  ul as formatDate,
  Cl as formatExpression,
  cl as formatMetric,
  dl as formatOrdinal,
  Vt as formatTerm,
  un as frame,
  at as frameAt,
  we as frameOf,
  zn as framePathOf,
  xe as frontPanel,
  Ll as generateRows,
  fd as group,
  pt as groupOf,
  qc as groups,
  Gs as hasActiveFacets,
  se as hasPanel,
  vd as headless,
  Et as insertPanel,
  zt as isChoosable,
  ud as isEntityScoped,
  Xs as isFacetActive,
  J as isFloat,
  H as isGroup,
  Je as isMaximized,
  lt as isMinimized,
  de as isPanelTab,
  In as isPristineQuery,
  $t as isSplit,
  Pe as isTabOf,
  Nn as isTypeCardsQuery,
  Bs as isViewKind,
  ks as joinExpression,
  xl as matchesExpression,
  Fl as matchesFacets,
  Uc as maximizeFrame,
  jc as maximizeFrameAt,
  su as mergeSpace,
  Hc as minimizeFrame,
  Xc as minimizeFrameAt,
  Qt as movePanel,
  Tt as moveTab,
  tt as nodeAt,
  Lt as nodeTitle,
  ge as normalizeLayout,
  We as normalizeSearch,
  ns as normalizeSizes,
  Da as onlySpace,
  je as panelIds,
  Ie as panelNode,
  Es as panelTabs,
  yt as parseExpression,
  Yl as parseQuery,
  $o as presentParts,
  fa as presentRow,
  xu as providePaneContext,
  Wl as provideShellContext,
  ru as provideWindowContext,
  yn as raiseFrame,
  Rt as raiseFrameAt,
  Gc as raisedPath,
  Qs as reconcileFacets,
  lu as reconcileLayout,
  ta as recordTerm,
  ot as removePanel,
  it as replaceAt,
  Ps as resizeRect,
  Ls as resizeSplit,
  Ws as resolveView,
  Fe as roleColumn,
  Zs as roleColumns,
  cn as rootSpace,
  Jn as row,
  vl as rowKey,
  Nl as scopeTerm,
  Ol as scopeTermFor,
  ql as scopedEntity,
  Ms as serializeQuery,
  mt as setActivePanel,
  Wc as setFrameRect,
  As as setFrameRectAt,
  sn as setSizesAt,
  gd as setSplitDirection,
  Ue as sizesOf,
  js as sortsFor,
  _e as spaceChrome,
  wt as spaceTitle,
  Zn as split,
  Sl as splitExpression,
  Ts as spreadTabs,
  Zl as summarizeQuery,
  ra as summaryTerms,
  nn as swapPanels,
  Gn as tabNode,
  Ut as tabPanels,
  Fa as tileFloat,
  yd as toFloat,
  wd as toTiled,
  hd as toggleMaximized,
  _d as toggleMinimized,
  Ri as useColumns,
  ji as useEntityPreviews,
  bd as usePaneContext,
  kd as usePaneMenu,
  bt as usePresentedRows,
  Jl as useQueryState,
  sr as useRecordNames,
  er as useResults,
  ye as useShellContext,
  ls as useWindowContext,
  Ml as withoutTerm
};
