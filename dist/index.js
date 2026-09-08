import { ref as W, inject as yt, provide as Fn, computed as m, toValue as St, shallowRef as Ft, watch as ke, onScopeDispose as Is, defineComponent as de, onBeforeUnmount as je, openBlock as f, createElementBlock as h, createElementVNode as w, toDisplayString as R, Fragment as j, renderList as ie, createCommentVNode as T, unref as P, renderSlot as ye, withDirectives as $n, withKeys as Pt, withModifiers as De, vModelText as xn, useSlots as Ot, nextTick as Dt, createBlock as se, createTextVNode as Ne, createVNode as me, withCtx as Ie, normalizeStyle as Re, resolveDynamicComponent as Ns, normalizeClass as on, createSlots as en, useModel as At, useId as Os, mergeModels as cn, Comment as sr, Text as ar, onMounted as rr, resolveComponent as Bs, getCurrentScope as lr, h as or } from "vue";
const Ks = Symbol("dc.routeAdapter");
function Ue(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ir() {
  const e = typeof window < "u", t = W(e ? Ue(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), s = () => {
    t.value = Ue(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, l) => {
    const i = Ue(r);
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
const Vs = ["list", "cards", "grid", "table", "links", "preview"], _d = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Qt = ["ok", "running", "queued", "review", "failed"], gd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], yd = [480, 620, 760, 900, 1100], cr = "cards", Cn = "updated";
function qs(e) {
  return typeof e == "string" && Vs.includes(e);
}
const ur = {
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
function vt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Us(e, t = {}) {
  const n = vt(e, t.entity), s = e.entities[0];
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
const dr = { key: Cn, label: Cn };
function tt(e, t, n = null) {
  const s = js(e, n);
  return (t ? s.find((r) => r.key === t) : void 0) ?? s.find((r) => r.key === Cn) ?? s[0] ?? dr;
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
function wd(e) {
  return e.entity !== null;
}
function Nn(e) {
  return e.entity === null && e.view === "cards";
}
function fr(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function On(e, t = {}) {
  const s = t.landing === "entity" ? Us(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && qs(t.view) ? t.view : cr,
    sort: tt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: It(s),
    page: 1
  };
}
const Ys = ["entity", "sort", "dir", "expr", "facets"];
function _s(e) {
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
function tn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function pr(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function vr(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function mr(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function hr(e) {
  return String(e + 1).padStart(2, "0");
}
const Mn = "—";
function Te(e, t) {
  return e.find((n) => n.role === t);
}
function Zs(e, t) {
  return e.filter((n) => n.role === t);
}
function _r(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const gr = ["id", "entityKey", "entityLabel"];
function ze(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (gr.includes(n))
      return t[n];
  }
}
function gs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function yr(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function wr(e, t) {
  if (e == null || e === "") return Mn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? pr(n) : String(e);
  }
  return t === "date" ? mr(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Mn : String(e);
}
function Bt(e, t) {
  const n = ze(e, t);
  return e.format ? e.format(n, t) : wr(n, e.kind);
}
function kr(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Js(e, t) {
  const n = Bt(e, t), s = kr(ze(e, t));
  return s && s !== n ? s : n;
}
function nn(e, t) {
  return e ? Bt(e, t) : "";
}
function ys(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const br = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function ws(e) {
  return [br[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Sn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const $r = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function xr(e) {
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
function st(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of xr(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const l = $r.exec(a);
    l && l[3] !== "" ? s.push({
      kind: "field",
      field: l[1].toLowerCase(),
      comparator: l[2],
      value: l[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const gn = (e) => e.toLowerCase().replace(/\s+/g, ""), Cr = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Mr(e, t, n) {
  const s = gn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && gn(u.label) === s
  );
  if (r) return ze(r, t);
  const l = n.facets.find((u) => gn(u.label) === s);
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = Cr.find(([u]) => u === s)?.[1];
  if (i) {
    const u = Te(a, i);
    if (u) return ze(u, t);
  }
  const o = /^metric(\d+)$/.exec(s);
  if (o) {
    const u = Zs(a, "metric")[Number(o[1]) - 1];
    if (u) return ze(u, t);
  }
}
function yn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function Sr(e, t, n) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((i) => {
      const o = Te(l, i), u = o ? ze(o, t) : void 0;
      return typeof u == "string" && yn(u, e.value);
    });
  }
  const s = Mr(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((i) => yn(String(i), e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const l = e.value.toLowerCase();
      return l === "true" || l === "yes" ? s : l === "false" || l === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const l = Number(e.value);
      return Number.isFinite(l) ? s === l : !0;
    }
    return yn(String(s), e.value);
  }
  const a = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(r) ? !0 : Er(e.comparator, r, a);
}
function Er(e, t, n) {
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
function Pr(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => Sr(a, t, n))) : !0;
}
function ks(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Kt(e) {
  return e.kind === "text" ? ks(e.value) : `${e.field}${e.comparator}${ks(e.value)}`;
}
function sn(e) {
  return e.filter((t) => t.length).map((t) => t.map(Kt).join(" ")).join(" OR ");
}
function Ar(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((r, l) => l !== n) : s).filter((s) => s.length);
}
function zr(e) {
  const t = st(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(Kt).join(" ")
  };
}
function bs(e, t) {
  return [...e.map(Kt), t.trim()].filter(Boolean).join(" ");
}
const $s = (e, t) => e.toLowerCase() === t.toLowerCase();
function ea(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && $s(e.value, t.value) : t.kind === "text" && $s(e.value, t.value);
}
function Rr(e, t) {
  return t.filter((n) => !e.some((s) => ea(s, n)));
}
function ta(e, t) {
  const n = st(e), s = st(t);
  return n.length ? s.length ? sn(
    n.flatMap((a) => s.map((r) => [...a, ...Rr(a, r)]))
  ) : sn(n) : sn(s);
}
const xs = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function na(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Tr = 7, Lr = 3;
function Fr(e, t, n, s) {
  const a = (t * Tr + tn(n)) % s, r = [];
  for (let l = 0; l < Math.min(Lr, s); l++)
    r.push(na(e, (a + l) % s));
  return r;
}
function Dr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ir(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ir(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, l) => r - l).map((r) => e[r]);
}
function Nr(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: r } = t, l = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${l}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return Qt[n % Qt.length];
    case "updated":
      return r;
    case "tint":
      return xs[n % xs.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Qt[n % Qt.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Or(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, l = t.scopes ?? [];
  if (!r.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const u = r[o % r.length], d = Math.floor(o / r.length), _ = tn(`${s}:${e.key}:${u[0]}:${o}`), b = na(e.key, o), k = new Date(a.getTime() - _ % 900 * 36e5).toISOString(), $ = {};
    for (const M of e.columns ?? []) {
      const y = M.field ?? M.key;
      if (!y || M.value) continue;
      const x = Nr(M, {
        hash: tn(`${_}:${y}`),
        sample: u,
        revision: d,
        updatedAt: k
      });
      x !== void 0 && ($[y] = x);
    }
    for (const M of e.facets)
      $[M.key] = Dr(M, tn(`${_}:${M.key}`));
    for (const [M, y] of l)
      $[M] = y === e.key ? b : Fr(y, o, M, n);
    i.push({ id: b, entityKey: e.key, entityLabel: e.label, fields: $ });
  }
  return i;
}
function Br(e, t) {
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
function Kr(e, t) {
  const n = e.find((l) => l.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", r = s === "date" || n.role === "updated";
  return (l, i) => {
    const o = ze(n, l), u = ze(n, i);
    return a ? Number(u ?? 0) - Number(o ?? 0) : r ? Date.parse(String(u ?? "")) - Date.parse(String(o ?? "")) : String(u ?? "").localeCompare(String(o ?? ""));
  };
}
function Vr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const r = t.get(s.key);
    if (r) return r;
    const l = e.scopes ?? a.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = Or(s, { ...e, scopes: l });
    return t.set(s.key, i), i;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: l, offset: i }) {
      const o = st(s.expr), u = r ? [r] : a.entities, d = [], _ = [];
      for (const $ of u)
        for (const M of n($, a))
          d.push(M), (r ? Br(M, s.facets) : !0) && Pr(o, M, $) && _.push(M);
      const b = tt(r, s.sort, a), k = _.sort(Kr(Hs(r, a), b.key));
      return s.dir === "asc" && k.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: k.slice(i, i + l),
        total: _.length,
        unfiltered: _.length === d.length
      };
    }
  };
}
function qr(e, t) {
  return sa(e, t.id);
}
function sa(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Wr(e, t) {
  return qr(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Ur(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = st(t).flat();
  return s ? st(n).some(
    (r) => r.some((l) => ea(l, s))
  ) ? n : `${n} ${t}` : n;
}
function Hr(e, t, n) {
  return Ur(t.expr, Wr(e, n));
}
function jr(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const aa = Symbol("dc.shellContext");
function Xr(e) {
  return Fn(aa, e), e;
}
function be() {
  const e = yt(aa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Bn = "e", Kn = "v", Vn = "s", qn = "d", Wn = "q", Un = "p", Hn = "f_", ra = "*", Gr = [
  Bn,
  Kn,
  Vn,
  qn,
  Wn,
  Un
], En = "..", la = ",", Yr = [
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
function wn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Yr) t = t.replace(n, s);
  return t;
}
function We(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function oa(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), l = a === -1 ? "" : s.slice(a + 1);
    n.push([We(r), l]);
  }
  return n;
}
function Qr(e) {
  return Gr.includes(e) || e.startsWith(Hn);
}
function Cs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Zr(e, t) {
  const n = We(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(la).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(En), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + En.length)).trim(), l = a === "" ? null : Number(a), i = r === "" ? null : Number(r);
      let o = l !== null && Number.isFinite(l) ? Cs(l, e.min, e.max) : null, u = i !== null && Number.isFinite(i) ? Cs(i, e.min, e.max) : null;
      return o !== null && u !== null && o > u && ([o, u] = [u, o]), { kind: "range", min: o, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Jr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(la) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${En}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function el(e, t, n = {}) {
  const s = On(t, n), a = new Map(oa(e)), r = a.get(Bn), l = r === void 0 ? s.entity : We(r), i = l === ra ? null : vt(t, l), o = a.get(Kn), u = o && qs(We(o)) ? We(o) : s.view, d = a.get(Vn), _ = tt(i, d ? We(d) : n.sort, t), b = a.get(qn), k = b ? We(b) === "asc" ? "asc" : "desc" : s.dir, $ = a.get(Wn), M = a.get(Un), y = M === void 0 ? 1 : Number(We(M)), x = Number.isFinite(y) ? Math.max(1, Math.floor(y)) : 1, F = {};
  for (const N of i?.facets ?? []) {
    const L = a.get(`${Hn}${N.key}`);
    F[N.key] = L === void 0 ? Dn(N) : Zr(N, L);
  }
  return {
    entity: i?.key ?? null,
    view: u,
    sort: _.key,
    dir: k,
    expr: $ === void 0 ? "" : We($),
    facets: Qs(i, F),
    page: x
  };
}
function Ms(e, t, n = {}, s = "") {
  const a = On(t, n), r = vt(t, e.entity), l = oa(s).filter(([_]) => !Qr(_)), i = [], o = (_, b) => i.push([_, wn(b)]), u = r?.key ?? null;
  u !== a.entity && o(Bn, u ?? ra), e.view !== a.view && o(Kn, e.view), e.sort !== a.sort && o(Vn, e.sort), e.dir !== a.dir && o(qn, e.dir), e.expr.trim() !== "" && o(Wn, e.expr);
  for (const _ of r?.facets ?? []) {
    const b = e.facets[_.key];
    if (!b) continue;
    const k = Jr(b, _);
    k !== null && i.push([`${Hn}${_.key}`, wn(k)]);
  }
  e.page > 1 && o(Un, String(e.page));
  const d = [
    ...l.map(([_, b]) => [wn(_), b]),
    ...i
  ];
  return d.length ? `?${d.map(([_, b]) => b === "" ? _ : `${_}=${b}`).join("&")}` : "";
}
const un = "entity", Nt = "expr";
function tl(e, t) {
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
function jn(e, t) {
  const n = [];
  t && n.push({
    id: un,
    label: `entity:${t.key}`,
    facetKey: un
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Xs(a) && n.push(...tl(s, a));
  }
  return st(e.expr).forEach((s, a) => {
    s.forEach((r, l) => {
      n.push({
        id: `${Nt}:${a}:${l}`,
        label: Kt(r),
        facetKey: Nt,
        group: a,
        index: l,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {}
      });
    });
  }), n;
}
function nl(e, t, n = null) {
  if (In(e)) {
    const r = tt(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const s = jn(e, t).filter((r) => r.facetKey !== Nt).map((r) => r.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function sl(e) {
  const { adapter: t } = e, n = m(() => St(e.schema)), s = m(() => St(e.defaults) ?? {}), a = m(() => el(t.search.value, n.value, s.value)), r = m(() => vt(n.value, a.value.entity)), l = m(() => r.value ?? Us(n.value, s.value)), i = m(() => js(r.value, n.value)), o = m(() => tt(r.value, a.value.sort, n.value)), u = (y, x) => {
    const F = Ms(y, n.value, s.value, t.search.value);
    F !== t.search.value && (x === "push" ? t.push(F) : t.replace(F));
  }, d = () => St(e.navigationMode) ?? "push", _ = () => St(e.facetNavigationMode) ?? "replace", b = (y, x) => {
    const F = y.page ?? (_s(y) ? 1 : a.value.page);
    u({ ...a.value, ...y, page: F }, x);
  }, k = (y, x) => {
    const F = a.value.facets[y];
    if (!F) return;
    const N = { ...a.value.facets, [y]: x(F) };
    b({ facets: N }, _());
  }, $ = (y) => {
    const x = y === null ? null : vt(n.value, y);
    return (x?.key ?? null) === a.value.entity ? {} : {
      entity: x?.key ?? null,
      sort: tt(x, a.value.sort, n.value).key,
      facets: It(x)
    };
  }, M = (y) => {
    const x = $(y);
    Object.keys(x).length && b(x, d());
  };
  return {
    query: a,
    entity: r,
    focus: l,
    sort: o,
    sorts: i,
    summary: m(() => nl(a.value, r.value, n.value)),
    terms: m(() => jn(a.value, r.value)),
    isPristine: m(() => In(a.value)),
    isEverything: m(() => a.value.entity === null),
    hasFacets: m(() => Gs(a.value.facets)),
    setEntity: M,
    clearEntity: () => M(null),
    setView(y) {
      b({ view: y }, d());
    },
    setSort(y) {
      b({ sort: tt(r.value, y, n.value).key }, d());
    },
    toggleDirection() {
      b({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(y) {
      b({ expr: y }, d());
    },
    narrow(y, x) {
      b({ expr: y, ...$(x) }, d());
    },
    setPage(y, x) {
      b({ page: Math.max(1, Math.floor(y)) }, x ?? d());
    },
    setFacet(y, x) {
      k(y, () => x);
    },
    toggleChip(y, x) {
      k(y, (F) => F.kind !== "chips" ? F : { kind: "chips", selected: F.selected.includes(x) ? F.selected.filter((L) => L !== x) : [...F.selected, x] });
    },
    setRange(y, x, F) {
      k(y, (N) => N.kind === "range" ? { kind: "range", min: x, max: F } : N);
    },
    toggleFlag(y) {
      k(
        y,
        (x) => x.kind === "toggle" ? { kind: "toggle", on: !x.on } : x
      );
    },
    removeTerm(y) {
      if (y.facetKey === un) {
        M(null);
        return;
      }
      if (y.facetKey === Nt) {
        const x = Ar(st(a.value.expr), y.group ?? 0, y.index ?? 0);
        b({ expr: sn(x) }, d());
        return;
      }
      k(y.facetKey, (x) => x.kind === "chips" && y.option ? { kind: "chips", selected: x.selected.filter((F) => F !== y.option) } : x.kind === "range" ? { kind: "range", min: null, max: null } : x.kind === "toggle" ? { kind: "toggle", on: !1 } : x);
    },
    clearFilters() {
      b({ entity: null, expr: "", facets: It(null) }, d());
    },
    reset() {
      u(On(n.value, s.value), d());
    },
    hrefFor(y) {
      const x = { ...a.value, ...y };
      return x.page = y.page ?? (_s(y) ? 1 : a.value.page), x.facets = Qs(vt(n.value, x.entity), x.facets), `${t.path.value}${Ms(x, n.value, s.value, t.search.value)}`;
    }
  };
}
function al(e) {
  const t = Ft([]), n = W(0), s = W(!1), a = Ft(null);
  let r = 0, l = null;
  const i = m(() => (e.query.value.page - 1) * e.limit.value), o = m(() => fr(n.value, e.limit.value)), u = () => {
    const y = e.query.value, x = e.within?.value.trim();
    return x ? { ...y, expr: ta(x, y.expr) } : y;
  }, d = (y) => {
    t.value = y.rows, n.value = y.total, a.value = null;
  }, _ = (y) => {
    a.value = y, t.value = [], n.value = 0;
  }, b = (y, x) => {
    let F = !0;
    const N = () => y === r, L = () => {
      F && (F = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return N();
      },
      insert(I, V) {
        if (!N()) return;
        const C = Array.isArray(I) ? I : [I];
        if (!C.length) return;
        L();
        const z = [...t.value];
        z.splice(V ?? z.length, 0, ...C), t.value = x > 0 ? z.slice(0, x) : z, n.value += C.length;
      },
      set(I) {
        N() && (I.rows && (L(), t.value = x > 0 ? I.rows.slice(0, x) : I.rows, n.value = I.rows.length), I.total !== void 0 && (n.value = I.total));
      },
      close() {
        N() && (s.value = !1);
      },
      fail(I) {
        N() && (_(I), s.value = !1);
      }
    };
  }, k = () => {
    const y = l;
    l = null, y?.();
  }, $ = () => {
    const y = ++r;
    k();
    const x = {
      query: u(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: i.value
    }, F = e.source.value;
    if (F.stream) {
      s.value = !0;
      try {
        l = F.stream(x, b(y, x.limit)) ?? null;
      } catch (L) {
        _(L), s.value = !1;
      }
      return;
    }
    let N;
    try {
      N = F.query(x);
    } catch (L) {
      _(L);
      return;
    }
    if (!(N instanceof Promise)) {
      d(N), s.value = !1;
      return;
    }
    s.value = !0, N.then((L) => {
      y === r && d(L);
    }).catch((L) => {
      y === r && _(L);
    }).finally(() => {
      y === r && (s.value = !1);
    });
  }, M = m(() => {
    const y = u();
    return `${JSON.stringify(Ys.map((x) => y[x]))}|${y.page}`;
  });
  return ke([e.source, M, e.schema, e.entity, e.limit], $, {
    immediate: !0
  }), Is(() => {
    r++, k();
  }, !0), { rows: t, total: n, offset: i, pageCount: o, pending: s, error: a, refresh: $ };
}
const rl = 25, ia = (e, t) => e.toLowerCase() === t.toLowerCase();
function ll(e, t) {
  return e.find((n) => ia(n.id, t));
}
function ol(e) {
  const t = Ft(/* @__PURE__ */ new Map()), n = (l) => {
    if (l.facetKey !== Nt || !l.field || !l.value) return null;
    const i = jr(e.schema.value, l.field);
    return i ? { entity: i, id: l.value, key: `${i.key}:${l.value}` } : null;
  }, s = (l) => {
    const { entity: i, id: o } = l, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: sa(i, o) ?? "",
        facets: It(i),
        sort: tt(i, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: rl,
      offset: 0
    });
  }, a = (l, i) => {
    const o = nn(Te(l.columns ?? [], "identity"), i);
    return o === Mn || ia(o, i.id) ? "" : o;
  }, r = () => {
    const l = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const d = n(u);
      d && !t.value.has(d.key) && l.set(d.key, d);
    }
    if (!l.size) return;
    const i = [...l.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), o = (u) => {
      const d = new Map(t.value);
      u.forEach((_, b) => {
        const { reference: k } = i[b], $ = ll(_.rows, k.id);
        d.set(k.key, $ ? a(k.entity, $) : "");
      }), t.value = d;
    };
    if (i.every(({ outcome: u }) => !(u instanceof Promise))) {
      o(i.map(({ outcome: u }) => u));
      return;
    }
    Promise.all(i.map(({ outcome: u }) => Promise.resolve(u))).then(o).catch(() => {
    });
  };
  return ke([e.source, e.schema, e.terms], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(l) {
      const i = n(l);
      return i && t.value.get(i.key) || null;
    }
  };
}
const il = ["data-dc-expanded"], cl = { class: "dc-header__domain" }, ul = {
  key: 0,
  class: "dc-header__within"
}, dl = ["title"], fl = ["data-dc-more", "title"], pl = { class: "dc-header__pick" }, vl = { class: "dc-header__pick-box" }, ml = ["value"], hl = { value: "" }, _l = ["value"], gl = { class: "dc-header__pick" }, yl = { class: "dc-header__pick-box" }, wl = ["value"], kl = ["value"], bl = { class: "dc-header__pick" }, $l = { class: "dc-header__pick-box" }, xl = ["value"], Cl = ["value"], Ml = ["title", "aria-label"], Sl = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, El = ["title", "aria-label", "onClick"], Pl = ["aria-expanded", "aria-controls"], Al = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, zl = { class: "dc-header__sr" }, Rl = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Tl = ["disabled"], Ll = ["title"], Fl = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Dl = ["disabled"], Il = {
  key: 1,
  class: "dc-header__actions"
}, Nl = /* @__PURE__ */ de({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean },
    views: {}
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = be(), r = m(() => a.schema.value), l = m(
      () => a.hasFacets.value || !!a.query.value.expr.trim() || !!a.within.value
    ), i = m(() => r.value.formatCount ?? vr);
    function o(O) {
      return O.key === a.query.value.entity && l.value && !n.hideCount ? i.value(a.total.value) : O.count;
    }
    function u(O) {
      return `${O.label} · ${o(O)}`;
    }
    const d = m(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${i.value(a.total.value)}`), _ = m(() => {
      const O = a.within.value.trim();
      return O ? jn({ ...a.query.value, expr: O, facets: {} }, null) : [];
    }), b = m(
      () => (n.views ?? [...Vs]).map((O) => ({ key: O, label: ur[O] }))
    ), k = m(() => Ws(a.query.value.view, n.views));
    function $(O) {
      a.setView(O.target.value);
    }
    const M = m(
      () => a.sorts.value.map((O) => ({ key: O.key, label: O.label }))
    );
    function y(O) {
      a.setSort(O.target.value);
    }
    const x = m(() => a.query.value.dir === "desc"), F = m(
      () => a.terms.value.filter((O) => O.facetKey !== un).map((O, g, E) => {
        const G = E[g - 1];
        return {
          term: O,
          or: G?.group !== void 0 && O.group !== void 0 && O.group !== G.group
        };
      })
    ), N = ol({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: m(() => [..._.value, ...a.terms.value])
    });
    function L(O) {
      const g = N.nameOf(O);
      return g ? `${O.field}:${g} (${O.value})` : O.label;
    }
    function I(O) {
      const g = O.target.value;
      a.setEntity(g || null);
    }
    function V(O) {
      O.target?.closest("button, select, label") || s("toggle");
    }
    const C = W(null), z = W("");
    function X() {
      const O = C.value;
      if (!O) {
        z.value = "";
        return;
      }
      const g = O.scrollLeft > 1, E = O.scrollWidth - O.clientWidth - O.scrollLeft > 1;
      z.value = g && E ? "both" : g ? "start" : E ? "end" : "";
    }
    let ee = null;
    ke(
      C,
      (O) => {
        ee?.disconnect(), ee = null, X(), !(!O || typeof ResizeObserver > "u") && (ee = new ResizeObserver(X), ee.observe(O));
      },
      { flush: "post" }
    ), ke(F, X, { flush: "post" }), je(() => ee?.disconnect());
    const re = m(() => a.query.value.page), J = m(
      () => a.pageCount.value > 1 && !Nn(a.query.value)
    ), he = m(() => {
      const O = `Page ${re.value} of ${a.pageCount.value}`, g = a.rows.value.length;
      if (!g) return O;
      const E = a.offset.value + 1;
      return `${O} — rows ${E} to ${E + g - 1} of ${a.total.value}`;
    });
    return (O, g) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      w("div", {
        class: "dc-header__trigger",
        onClick: V
      }, [
        g[11] || (g[11] = w("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        w("span", cl, R(r.value.label), 1),
        _.value.length ? (f(), h("span", ul, [
          g[4] || (g[4] = w("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(j, null, ie(_.value, (E) => (f(), h("span", {
            key: `scope:${E.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: L(E)
          }, R(L(E)), 9, dl))), 128))
        ])) : T("", !0),
        w("div", {
          ref_key: "termBar",
          ref: C,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": z.value,
          title: P(a).summary.value,
          onScroll: X
        }, [
          w("label", pl, [
            g[6] || (g[6] = w("span", { class: "dc-header__sr" }, "Type", -1)),
            w("span", vl, [
              w("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: P(a).query.value.entity ?? "",
                onChange: I
              }, [
                w("option", hl, R(d.value), 1),
                (f(!0), h(j, null, ie(P(a).entities.value, (E) => (f(), h("option", {
                  key: E.key,
                  value: E.key
                }, R(u(E)), 9, _l))), 128))
              ], 40, ml),
              g[5] || (g[5] = w("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          w("label", gl, [
            g[8] || (g[8] = w("span", { class: "dc-header__sr" }, "View", -1)),
            w("span", yl, [
              w("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: k.value,
                onChange: $
              }, [
                (f(!0), h(j, null, ie(b.value, (E) => (f(), h("option", {
                  key: E.key,
                  value: E.key
                }, R(E.label), 9, kl))), 128))
              ], 40, wl),
              g[7] || (g[7] = w("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          M.value.length ? (f(), h(j, { key: 0 }, [
            w("label", bl, [
              g[10] || (g[10] = w("span", { class: "dc-header__sr" }, "Sort", -1)),
              w("span", $l, [
                w("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: P(a).sort.value.key,
                  onChange: y
                }, [
                  (f(!0), h(j, null, ie(M.value, (E) => (f(), h("option", {
                    key: E.key,
                    value: E.key
                  }, R(E.label), 9, Cl))), 128))
                ], 40, xl),
                g[9] || (g[9] = w("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            w("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: x.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${x.value ? "descending" : "ascending"}`,
              onClick: g[0] || (g[0] = (E) => P(a).toggleDirection())
            }, R(x.value ? "↓" : "↑"), 9, Ml)
          ], 64)) : T("", !0),
          (f(!0), h(j, null, ie(F.value, (E) => (f(), h(j, {
            key: E.term.id
          }, [
            E.or ? (f(), h("span", Sl, "or")) : T("", !0),
            w("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${L(E.term)}`,
              "aria-label": `Remove ${L(E.term)}`,
              onClick: (G) => P(a).removeTerm(E.term)
            }, R(L(E.term)), 9, El)
          ], 64))), 128))
        ], 40, fl),
        w("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: g[1] || (g[1] = (E) => s("toggle"))
        }, [
          w("span", Al, R(e.expanded ? "▲" : "▼"), 1),
          w("span", zl, R(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Pl)
      ]),
      J.value ? (f(), h("nav", Rl, [
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: re.value <= 1,
          onClick: g[2] || (g[2] = (E) => P(a).setPage(re.value - 1))
        }, [...g[12] || (g[12] = [
          w("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Tl),
        w("span", {
          class: "dc-header__page dc-mono",
          title: he.value,
          "aria-hidden": "true"
        }, R(re.value) + " / " + R(P(a).pageCount.value), 9, Ll),
        w("span", Fl, R(he.value), 1),
        w("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: re.value >= P(a).pageCount.value,
          onClick: g[3] || (g[3] = (E) => P(a).setPage(re.value + 1))
        }, [...g[13] || (g[13] = [
          w("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Dl)
      ])) : T("", !0),
      O.$slots.actions ? (f(), h("div", Il, [
        ye(O.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ], 8, il));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ca = /* @__PURE__ */ fe(Nl, [["__scopeId", "data-v-91f37f7f"]]), Ol = { class: "dc-facet" }, Bl = ["id"], Kl = { class: "dc-facet__body" }, Vl = ["aria-labelledby"], ql = ["aria-pressed", "data-dc-active", "onClick"], Wl = ["aria-labelledby"], Ul = ["aria-label", "placeholder", "onKeydown"], Hl = ["aria-label", "placeholder", "onKeydown"], jl = ["aria-checked"], Xl = { class: "dc-switch__text" }, Gl = ["data-dc-active"], Yl = /* @__PURE__ */ de({
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
    function r(_) {
      if (n.value.kind !== "chips") return;
      const b = a.value.has(_) ? n.value.selected.filter((k) => k !== _) : [...n.value.selected, _];
      s("update", { kind: "chips", selected: b });
    }
    const l = W(""), i = W("");
    ke(
      () => n.value,
      (_) => {
        _.kind === "range" && (l.value = _.min === null ? "" : _.min, i.value = _.max === null ? "" : _.max);
      },
      { immediate: !0, deep: !0 }
    );
    function o(_) {
      if (typeof _ == "number") return Number.isFinite(_) ? _ : null;
      const b = _.trim();
      if (!b) return null;
      const k = Number(b);
      return Number.isFinite(k) ? k : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const _ = o(l.value), b = o(i.value);
      _ === n.value.min && b === n.value.max || s("update", { kind: "range", min: _, max: b });
    }
    function d() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (_, b) => (f(), h("div", Ol, [
      w("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, R(e.facet.label), 9, Bl),
      w("div", Kl, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), h(j, null, ie(e.facet.options, (k) => (f(), h("button", {
            key: k,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(k),
            "data-dc-active": a.value.has(k) ? "true" : "false",
            onClick: ($) => r(k)
          }, R(k), 9, ql))), 128))
        ], 8, Vl)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          $n(w("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (k) => l.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: Pt(De(u, ["prevent"]), ["enter"])
          }, null, 40, Ul), [
            [xn, l.value]
          ]),
          b[2] || (b[2] = w("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          $n(w("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (k) => i.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: Pt(De(u, ["prevent"]), ["enter"])
          }, null, 40, Hl), [
            [xn, i.value]
          ])
        ], 8, Wl)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          w("span", Xl, R(e.facet.text), 1),
          w("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...b[3] || (b[3] = [
            w("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Gl)
        ], 8, jl)) : T("", !0)
      ])
    ]));
  }
}), ua = /* @__PURE__ */ fe(Yl, [["__scopeId", "data-v-36d1334b"]]), Ql = ["id"], Zl = { class: "dc-panel__section dc-panel__rows" }, Jl = { class: "dc-panel__row" }, eo = ["for"], to = ["title", "aria-label", "onClick"], no = ["id", "placeholder", "onKeydown"], so = { class: "dc-panel__actions" }, ao = ["disabled"], ro = {
  key: 0,
  class: "dc-panel__section"
}, lo = /* @__PURE__ */ de({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Ot(), a = be(), r = m(() => zr(a.query.value.expr)), l = m(() => r.value.parts.map(Kt)), i = W(r.value.text), o = W(null);
    ke(
      () => r.value.text,
      (M) => {
        i.value = M;
      }
    );
    const u = m(() => i.value !== r.value.text);
    function d() {
      u.value && a.setExpression(bs(r.value.parts, i.value)), n("close");
    }
    function _(M) {
      const { parts: y, text: x } = r.value;
      a.setExpression(bs(y.filter((F, N) => N !== M), x));
    }
    function b(M) {
      const { parts: y } = r.value;
      i.value || !y.length || (M.preventDefault(), _(y.length - 1));
    }
    function k() {
      i.value = "", a.clearFilters();
    }
    function $(M, y) {
      a.setFacet(M, y);
    }
    return Dt(() => o.value?.focus()), (M, y) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: y[2] || (y[2] = Pt(De((x) => n("close"), ["stop"]), ["esc"]))
    }, [
      w("section", Zl, [
        w("div", Jl, [
          w("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, eo),
          w("div", {
            class: "dc-field",
            onMousedown: y[1] || (y[1] = De((x) => o.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(j, null, ie(l.value, (x, F) => (f(), h("button", {
              key: `${F}:${x}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${x}`,
              "aria-label": `Remove ${x}`,
              onClick: (N) => _(F)
            }, R(x), 9, to))), 128)),
            $n(w("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: o,
              "onUpdate:modelValue": y[0] || (y[0] = (x) => i.value = x),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: l.value.length ? "" : P(a).schema.value.placeholder,
              onKeydown: [
                Pt(De(d, ["prevent"]), ["enter"]),
                Pt(b, ["backspace"])
              ]
            }, null, 40, no), [
              [xn, i.value]
            ])
          ], 32)
        ]),
        P(a).entity.value ? (f(!0), h(j, { key: 0 }, ie(P(a).entity.value.facets, (x) => (f(), se(ua, {
          key: x.key,
          facet: x,
          value: P(a).query.value.facets[x.key],
          onUpdate: (F) => $(x.key, F)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : T("", !0),
        w("div", so, [
          w("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          w("button", {
            type: "button",
            class: "dc-button",
            disabled: P(a).isPristine.value && !u.value,
            onClick: k
          }, " Reset ", 8, ao)
        ])
      ]),
      s["panel-section"] ? (f(), h("section", ro, [
        ye(M.$slots, "panel-section", {}, void 0, !0)
      ])) : T("", !0)
    ], 40, Ql));
  }
}), da = /* @__PURE__ */ fe(lo, [["__scopeId", "data-v-2642c02d"]]), oo = {
  key: 0,
  class: "dc-actions"
}, io = {
  key: 0,
  class: "dc-actions__select"
}, co = { class: "dc-actions__all" }, uo = ["checked", "indeterminate"], fo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, po = { class: "dc-actions__ops" }, vo = ["disabled"], mo = ["disabled"], ho = /* @__PURE__ */ de({
  __name: "RecordActions",
  setup(e) {
    const t = be(), n = m(() => t.entity.value), s = m(() => !Nn(t.query.value)), a = m(() => s.value && t.selectable.value), r = m(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), l = m(() => t.selection.value.ids.length), i = m(() => t.rows.value.filter((b) => t.isSelected(b)).length), o = m(
      () => t.rows.value.length > 0 && i.value === t.rows.value.length
    ), u = m(() => i.value > 0 && !o.value), d = m(() => l.value ? `${l.value} selected` : "Select all");
    function _(b) {
      return l.value ? `${b} ${l.value}` : b;
    }
    return (b, k) => r.value ? (f(), h("div", oo, [
      a.value ? (f(), h("div", io, [
        w("label", co, [
          w("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: o.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: k[0] || (k[0] = ($) => P(t).selectPage(!o.value))
          }, null, 40, uo),
          w("span", fo, R(d.value), 1)
        ]),
        l.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[1] || (k[1] = ($) => P(t).clearSelection())
        }, " Clear ")) : T("", !0)
      ])) : T("", !0),
      w("div", po, [
        n.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: k[2] || (k[2] = ($) => P(t).create(n.value))
        }, [
          k[5] || (k[5] = w("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ne(" " + R(n.value.create), 1)
        ])) : T("", !0),
        n.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !l.value,
          onClick: k[3] || (k[3] = ($) => P(t).duplicate())
        }, R(_(n.value.duplicate)), 9, vo)) : T("", !0),
        n.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !l.value,
          onClick: k[4] || (k[4] = ($) => P(t).delete())
        }, R(_(n.value.delete)), 9, mo)) : T("", !0)
      ])
    ])) : T("", !0);
  }
}), fa = /* @__PURE__ */ fe(ho, [["__scopeId", "data-v-ca4aca14"]]);
function _o(e, t) {
  if (!e) return null;
  const n = ze(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function go(e, t) {
  const n = Te(t, "state"), s = Te(t, "tint");
  return {
    identity: nn(Te(t, "identity"), e),
    reference: nn(Te(t, "reference"), e),
    metrics: Zs(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Bt(a, e)
    })),
    state: n ? ze(n, e) ?? null : null,
    updated: nn(Te(t, "updated"), e),
    image: _o(Te(t, "image"), e),
    tint: s ? ze(s, e) ?? null : null
  };
}
function pa(e, t, n, s, a = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: yr(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: hr(t),
    parts: go(e, r),
    pinned: s,
    selected: a
  };
}
function kt() {
  const e = be(), t = m(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return m(
    () => e.rows.value.map(
      (n, s) => pa(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const yo = ["data-dc-status"], wo = /* @__PURE__ */ de({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, R(e.status), 9, yo));
  }
}), Vt = /* @__PURE__ */ fe(wo, [["__scopeId", "data-v-23e59fbf"]]), ko = ["title"], bo = { key: 1 }, $o = /* @__PURE__ */ de({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = be(), s = m(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((o) => o.key === t.column.drill) ?? null), a = m(() => t.column.label ?? ""), r = m(() => Bt(t.column, t.entry.row));
    function l(i) {
      i.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (i, o) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: l
    }, [
      ye(i.$slots, "default", {}, () => [
        Ne(R(r.value), 1)
      ], !0)
    ], 8, ko)) : (f(), h("span", bo, [
      ye(i.$slots, "default", {}, () => [
        Ne(R(r.value), 1)
      ], !0)
    ]));
  }
}), qt = /* @__PURE__ */ fe($o, [["__scopeId", "data-v-3bd0cbdb"]]), xo = ["data-dc-active", "aria-pressed", "aria-label"], Co = /* @__PURE__ */ de({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
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
    }, R(e.pinned ? "★" : "☆"), 9, xo));
  }
}), Xn = /* @__PURE__ */ fe(Co, [["__scopeId", "data-v-ef63d763"]]), Mo = ["src"], So = /* @__PURE__ */ de({
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
    }, null, 40, Mo)) : T("", !0);
  }
}), Gn = /* @__PURE__ */ fe(So, [["__scopeId", "data-v-afaab300"]]), Eo = ["title", "aria-label"], Po = /* @__PURE__ */ de({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), s = m(() => t.entry.entity?.scope ?? null);
    function a(r) {
      r.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (r, l) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, Eo)) : T("", !0);
  }
}), Wt = /* @__PURE__ */ fe(Po, [["__scopeId", "data-v-1d9b1a9f"]]), Ao = ["checked", "aria-label"], bt = /* @__PURE__ */ de({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, r) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: s
    }, null, 8, Ao));
  }
}), zo = { class: "dc-cards" }, Ro = { class: "dc-card__top dc-mono" }, To = { class: "dc-card__lead" }, Lo = {
  key: 1,
  class: "dc-card__entity"
}, Fo = { class: "dc-card__top-right" }, Do = ["onClick"], Io = { class: "dc-card__names" }, No = { class: "dc-card__primary" }, Oo = { class: "dc-card__secondary dc-mono" }, Bo = { class: "dc-card__metrics dc-mono" }, Ko = {
  key: 0,
  class: "dc-card__date"
}, Vo = /* @__PURE__ */ de({
  __name: "CardsView",
  setup(e) {
    const t = be(), n = kt(), s = m(() => t.isEverything.value);
    return (a, r) => (f(), h("div", zo, [
      (f(!0), h(j, null, ie(P(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-card"
      }, [
        w("div", Ro, [
          w("span", To, [
            P(t).selectable.value ? (f(), se(bt, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            Ne(" " + R(l.ordinal) + " ", 1),
            s.value ? (f(), h("span", Lo, R(l.entityLabel), 1)) : T("", !0)
          ]),
          w("span", Fo, [
            l.parts.state ? (f(), se(Vt, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : T("", !0),
            me(Wt, { entry: l }, null, 8, ["entry"]),
            P(t).pinnable.value ? (f(), se(Xn, {
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
          onClick: (i) => P(t).activate(l.row)
        }, [
          l.parts.image ? (f(), se(Gn, {
            key: 0,
            class: "dc-card__image",
            src: l.parts.image
          }, null, 8, ["src"])) : T("", !0),
          w("span", Io, [
            w("span", No, R(l.parts.identity), 1),
            w("span", Oo, R(l.parts.reference), 1)
          ])
        ], 8, Do),
        w("div", Bo, [
          (f(!0), h(j, null, ie(l.parts.metrics.slice(0, 2), (i) => (f(), se(qt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, {
            default: Ie(() => [
              Ne(R(i.label) + " " + R(i.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (f(), h("span", Ko, R(l.parts.updated), 1)) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), va = /* @__PURE__ */ fe(Vo, [["__scopeId", "data-v-05d69cb4"]]), qo = { class: "dc-grid" }, Wo = ["onClick"], Uo = { class: "dc-tile__scrim" }, Ho = { class: "dc-tile__top dc-mono" }, jo = { class: "dc-tile__chip" }, Xo = { class: "dc-tile__caption" }, Go = { class: "dc-tile__secondary dc-truncate" }, Yo = { class: "dc-tile__primary" }, Qo = /* @__PURE__ */ de({
  __name: "GridView",
  setup(e) {
    const t = be(), n = kt();
    return (s, a) => (f(), h("div", qo, [
      (f(!0), h(j, null, ie(P(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        w("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          onClick: (l) => P(t).activate(r.row)
        }, [
          r.parts.image ? (f(), se(Gn, {
            key: 0,
            class: "dc-tile__image",
            src: r.parts.image
          }, null, 8, ["src"])) : T("", !0),
          w("span", Uo, [
            w("span", Ho, [
              w("span", jo, R(r.ordinal), 1)
            ]),
            w("span", Xo, [
              w("span", Go, R(r.parts.reference), 1),
              w("span", Yo, R(r.parts.identity), 1)
            ])
          ])
        ], 12, Wo),
        P(t).selectable.value ? (f(), se(bt, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), ma = /* @__PURE__ */ fe(Qo, [["__scopeId", "data-v-c9789911"]]), Zo = { class: "dc-links" }, Jo = ["onClick"], ei = { class: "dc-link__primary dc-truncate" }, ti = { class: "dc-link__secondary dc-mono dc-truncate" }, ni = /* @__PURE__ */ de({
  __name: "LinksView",
  setup(e) {
    const t = be(), n = kt();
    return (s, a) => (f(), h("div", Zo, [
      (f(!0), h(j, null, ie(P(n), (r) => (f(), h("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (f(), se(bt, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        w("button", {
          type: "button",
          class: "dc-link",
          onClick: (l) => P(t).activate(r.row)
        }, [
          w("span", ei, R(r.parts.identity), 1),
          w("span", ti, R(r.parts.reference), 1)
        ], 8, Jo)
      ]))), 128))
    ]));
  }
}), ha = /* @__PURE__ */ fe(ni, [["__scopeId", "data-v-cc3a66fa"]]), si = {
  class: "dc-list",
  role: "list"
}, ai = ["onClick"], ri = { class: "dc-list__ordinal dc-mono" }, li = { class: "dc-list__identity" }, oi = { class: "dc-list__primary dc-truncate" }, ii = { class: "dc-list__secondary dc-mono dc-truncate" }, ci = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, ui = { class: "dc-list__metrics dc-mono" }, di = { class: "dc-list__trailing" }, fi = /* @__PURE__ */ de({
  __name: "ListView",
  setup(e) {
    const t = be(), n = kt(), s = m(() => t.isEverything.value);
    return (a, r) => (f(), h("div", si, [
      (f(!0), h(j, null, ie(P(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (f(), se(bt, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        w("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (i) => P(t).activate(l.row)
        }, [
          w("span", ri, R(l.ordinal), 1),
          w("span", li, [
            w("span", oi, R(l.parts.identity), 1),
            w("span", ii, R(l.parts.reference), 1)
          ])
        ], 8, ai),
        s.value ? (f(), h("span", ci, R(l.entityLabel), 1)) : T("", !0),
        w("span", ui, [
          (f(!0), h(j, null, ie(l.parts.metrics.slice(0, 2), (i) => (f(), se(qt, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        w("span", di, [
          l.parts.state ? (f(), se(Vt, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : T("", !0),
          me(Wt, { entry: l }, null, 8, ["entry"]),
          P(t).pinnable.value ? (f(), se(Xn, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Pn = /* @__PURE__ */ fe(fi, [["__scopeId", "data-v-6c92ff27"]]), pi = { class: "dc-preview" }, vi = { class: "dc-preview__pager dc-mono" }, mi = ["disabled"], hi = { "aria-live": "polite" }, _i = ["disabled"], gi = {
  key: 0,
  class: "dc-preview__card"
}, yi = { class: "dc-preview__body" }, wi = { class: "dc-preview__top" }, ki = { class: "dc-preview__badges" }, bi = { class: "dc-preview__entity dc-mono" }, $i = { class: "dc-preview__marks" }, xi = { class: "dc-preview__primary" }, Ci = { class: "dc-preview__secondary dc-mono" }, Mi = { class: "dc-preview__fields" }, Si = { class: "dc-preview__key" }, Ei = { class: "dc-preview__value dc-mono" }, Pi = /* @__PURE__ */ de({
  __name: "PreviewView",
  setup(e) {
    const t = be(), n = kt(), s = W(0);
    ke(n, (o) => {
      s.value > o.length - 1 && (s.value = Math.max(0, o.length - 1));
    });
    const a = m(() => n.value[s.value]), r = m(() => {
      const o = a.value;
      if (!o) return [];
      const u = Te(o.columns, "reference"), d = Te(o.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((_) => ({
          key: _.label,
          value: _.text,
          column: _.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), l = m(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + o)));
    };
    return (o, u) => (f(), h("div", pi, [
      w("div", vi, [
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => i(-1))
        }, " ‹ ", 8, mi),
        w("span", hi, R(l.value), 1),
        w("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= P(n).length - 1,
          onClick: u[1] || (u[1] = (d) => i(1))
        }, " › ", 8, _i)
      ]),
      a.value ? (f(), h("div", gi, [
        w("div", {
          class: "dc-preview__media",
          style: Re({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        w("div", yi, [
          w("div", wi, [
            w("span", ki, [
              P(t).selectable.value ? (f(), se(bt, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              a.value.parts.state ? (f(), se(Vt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              w("span", bi, R(a.value.entityLabel), 1)
            ]),
            w("span", $i, [
              me(Wt, { entry: a.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (f(), se(Xn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          w("div", null, [
            w("div", xi, R(a.value.parts.identity), 1),
            w("div", Ci, R(a.value.parts.reference), 1)
          ]),
          w("dl", Mi, [
            (f(!0), h(j, null, ie(r.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              w("dt", Si, R(d.key), 1),
              w("dd", Ei, [
                d.column && a.value ? (f(), se(qt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(j, { key: 1 }, [
                  Ne(R(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          w("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => P(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : T("", !0)
    ]));
  }
}), _a = /* @__PURE__ */ fe(Pi, [["__scopeId", "data-v-a236412c"]]);
function Ai() {
  const e = be();
  return m(() => _r(e.schema.value, e.entity.value));
}
const zi = ["title"], Ri = {
  key: 5,
  class: "dc-cell__text"
}, Ti = /* @__PURE__ */ de({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), s = m(() => t.column.kind ?? "text"), a = m(() => ze(t.column, t.entry.row)), r = m(
      () => s.value === "ordinal" ? t.entry.ordinal : Bt(t.column, t.entry.row)
    ), l = m(() => a.value), i = m(() => t.column.activate === !0 || !!t.column.click), o = m(() => Sn(t.column)), u = m(() => Js(t.column, t.entry.row));
    function d(_) {
      i.value && (_.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (_, b) => s.value === "component" && e.column.component ? (f(), se(Ns(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), se(Vt, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), se(Gn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Re({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), se(qt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: on(["dc-table__open", { "dc-truncate": o.value }]),
      title: u.value,
      onClick: d
    }, R(r.value), 11, zi)) : (f(), h("span", Ri, R(r.value), 1));
  }
}), Ss = /* @__PURE__ */ fe(Ti, [["__scopeId", "data-v-d746be44"]]), Li = {
  key: 0,
  class: "dc-table__none"
}, Fi = { class: "dc-table__detail" }, Di = ["data-dc-wrap"], Ii = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Ni = ["data-dc-align", "data-dc-hide", "aria-sort"], Oi = ["onClick"], Bi = ["onClick"], Ki = {
  key: 0,
  class: "dc-table__pick"
}, Vi = ["data-dc-align", "data-dc-hide", "title"], qi = {
  key: 0,
  class: "dc-table__name"
}, Wi = /* @__PURE__ */ de({
  __name: "TableView",
  setup(e) {
    const t = be(), n = kt(), s = Ai(), a = m(
      () => s.value.some((b) => b.kind === "image" || b.height !== void 0)
    );
    function r(b) {
      b && (t.query.value.sort === b ? t.toggleDirection() : t.setSort(b));
    }
    const l = m(() => t.entity.value?.label ?? "The result set"), i = m(() => new Set(t.sorts.value.map((b) => b.key))), o = (b) => b.sort !== void 0 && i.value.has(b.sort), u = (b) => {
      if (o(b))
        return t.query.value.sort !== b.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function d(b) {
      return [
        ws(b),
        b.muted ? "dc-table__muted" : "",
        b.mono ? "dc-mono" : "",
        Sn(b) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function _(b, k) {
      if (!(!Sn(b) || b.activate || b.click))
        return Js(b, k.row);
    }
    return (b, k) => P(s).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      w("thead", null, [
        w("tr", null, [
          P(t).selectable.value ? (f(), h("th", Ii, [...k[3] || (k[3] = [
            w("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : T("", !0),
          (f(!0), h(j, null, ie(P(s), ($, M) => (f(), h("th", {
            key: P(gs)($, M),
            scope: "col",
            class: on(P(ws)($)),
            style: Re({ width: $.width }),
            "data-dc-align": P(ys)($),
            "data-dc-hide": $.hideBelow,
            "aria-sort": u($)
          }, [
            o($) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (y) => r($.sort)
            }, R($.label), 9, Oi)) : (f(), h(j, { key: 1 }, [
              Ne(R($.label), 1)
            ], 64))
          ], 14, Ni))), 128))
        ])
      ]),
      w("tbody", null, [
        (f(!0), h(j, null, ie(P(n), ($) => (f(), h("tr", {
          key: $.key,
          class: "dc-table__row",
          onClick: (M) => P(t).activate($.row)
        }, [
          P(t).selectable.value ? (f(), h("td", Ki, [
            me(bt, {
              row: $.row,
              selected: $.selected,
              name: $.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          (f(!0), h(j, null, ie(P(s), (M, y) => (f(), h("td", {
            key: P(gs)(M, y),
            class: on(d(M)),
            "data-dc-align": P(ys)(M),
            "data-dc-hide": M.hideBelow,
            title: _(M, $)
          }, [
            M.scope ? (f(), h("span", qi, [
              me(Ss, {
                column: M,
                entry: $
              }, null, 8, ["column", "entry"]),
              me(Wt, { entry: $ }, null, 8, ["entry"])
            ])) : (f(), se(Ss, {
              key: 1,
              column: M,
              entry: $
            }, null, 8, ["column", "entry"]))
          ], 10, Vi))), 128))
        ], 8, Bi))), 128))
      ])
    ], 8, Di)) : (f(), h("p", Li, [
      k[2] || (k[2] = w("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      w("span", Fi, [
        Ne(R(l.value) + " has no ", 1),
        k[0] || (k[0] = w("code", null, "columns", -1)),
        k[1] || (k[1] = Ne(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ga = /* @__PURE__ */ fe(Wi, [["__scopeId", "data-v-66b32c45"]]);
function Ui(e) {
  const t = Ft([]), n = W(!1), s = Ft(null);
  let a = 0;
  const r = (o, u, d) => ({
    entity: o,
    rows: u.rows.map(
      (_, b) => pa(_, b, o, e.isPinned(_.id))
    ),
    total: u.total,
    count: d ? o.count : String(u.total)
  }), l = () => {
    const o = ++a, u = e.query.value, d = e.schema.value, _ = e.entities.value, b = e.limit.value, k = e.within?.value.trim() ?? "", $ = In(u) && !k, M = k ? ta(k, u.expr) : u.expr, y = _.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: x.key, expr: M, facets: It(x), page: 1 },
        schema: d,
        entity: x,
        limit: b,
        offset: 0
      })
    }));
    if (y.every(({ outcome: x }) => !(x instanceof Promise))) {
      t.value = y.map(
        ({ entity: x, outcome: F }) => r(x, F, $)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(y.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      o === a && (t.value = x.map(
        (F, N) => r(y[N].entity, F, $)
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
const Hi = ["data-dc-pending"], ji = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Xi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Gi = ["data-dc-empty"], Yi = ["onClick"], Qi = { class: "dc-type__name" }, Zi = { class: "dc-type__count dc-mono" }, Ji = { class: "dc-type__sr" }, ec = {
  key: 0,
  class: "dc-type__empty"
}, tc = ["onClick"], nc = { class: "dc-type__identity" }, sc = { class: "dc-type__primary dc-truncate" }, ac = { class: "dc-type__secondary dc-mono dc-truncate" }, rc = { class: "dc-type__trailing dc-mono" }, lc = { class: "dc-type__metric-value" }, oc = { class: "dc-type__metric-label" }, ic = {
  key: 0,
  class: "dc-type__date"
}, cc = ["onClick"], uc = /* @__PURE__ */ de({
  __name: "TypeCardsView",
  setup(e) {
    const t = be(), { previews: n, pending: s, error: a } = Ui({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (l) => t.isPinnedId(l)
    }), r = m(() => !t.isPristine.value || !!t.within.value);
    return (l, i) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": P(s) ? "true" : "false"
    }, [
      ye(l.$slots, "before", {}, void 0, !0),
      P(a) ? (f(), h("p", ji, " Could not load results: " + R(P(a) instanceof Error ? P(a).message : "the data source failed."), 1)) : !P(n).length && P(s) ? (f(), h("p", Xi, " Running query… ")) : T("", !0),
      (f(!0), h(j, null, ie(P(n), (o) => (f(), h("section", {
        key: o.entity.key,
        class: "dc-type",
        "data-dc-empty": o.rows.length ? "false" : "true"
      }, [
        w("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => P(t).setEntity(o.entity.key)
        }, [
          w("span", Qi, R(o.entity.label), 1),
          w("span", Zi, R(o.count), 1),
          i[0] || (i[0] = w("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          w("span", Ji, "Show only " + R(o.entity.label.toLowerCase()), 1)
        ], 8, Yi),
        o.rows.length ? T("", !0) : (f(), h("p", ec, R(r.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(j, null, ie(o.rows, (u) => (f(), h("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          w("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (d) => P(t).activate(u.row)
          }, [
            w("span", nc, [
              w("span", sc, R(u.parts.identity), 1),
              w("span", ac, R(u.parts.reference), 1)
            ])
          ], 8, tc),
          w("span", rc, [
            (f(!0), h(j, null, ie(u.parts.metrics.slice(0, 1), (d) => (f(), se(qt, {
              key: d.column.key ?? d.label,
              class: "dc-type__metric",
              entry: u,
              column: d.column
            }, {
              default: Ie(() => [
                w("span", lc, R(d.text), 1),
                w("span", oc, R(d.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (f(), h("span", ic, R(u.parts.updated), 1)) : T("", !0),
            me(Wt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        o.entity.create ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => P(t).create(o.entity)
        }, [
          i[1] || (i[1] = w("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ne(" " + R(o.entity.create), 1)
        ], 8, cc)) : T("", !0)
      ], 8, Gi))), 128)),
      ye(l.$slots, "after", {}, void 0, !0)
    ], 8, Hi));
  }
}), ya = /* @__PURE__ */ fe(uc, [["__scopeId", "data-v-9e2cabcb"]]), dc = ["data-dc-pending"], fc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, pc = { class: "dc-results__detail" }, vc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, mc = {
  key: 3,
  class: "dc-results__state"
}, hc = { class: "dc-results__detail" }, _c = /* @__PURE__ */ de({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), s = Ot(), a = {
      list: Pn,
      cards: va,
      grid: ma,
      table: ga,
      links: ha,
      preview: _a
    }, r = m(() => Nn(n.query.value)), l = m(() => Ws(n.query.value.view, t.views)), i = m(() => a[l.value] ?? Pn), o = m(() => n.rows.value.length > 0), u = m(() => n.error.value !== null);
    return (d, _) => (f(), h("div", {
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      r.value ? (f(), se(ya, { key: 0 }, en({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: Ie(() => [
            ye(d.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: Ie(() => [
            ye(d.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), h("p", fc, [
        _[1] || (_[1] = w("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        w("span", pc, R(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !o.value && P(n).pending.value ? (f(), h("p", vc, [..._[2] || (_[2] = [
        w("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (f(), se(Ns(i.value), { key: 4 })) : (f(), h("div", mc, [
        _[3] || (_[3] = w("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        w("span", hc, R(P(n).summary.value), 1),
        P(n).isPristine.value ? T("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: _[0] || (_[0] = (b) => P(n).clearFilters())
        }, R(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, dc));
  }
}), wa = /* @__PURE__ */ fe(_c, [["__scopeId", "data-v-570beafc"]]), gc = ["data-dc-theme"], yc = ["data-dc-width", "data-dc-align"], wc = { class: "dc-shell__panel" }, kc = /* @__PURE__ */ de({
  __name: "DataShell",
  props: /* @__PURE__ */ cn({
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
  emits: /* @__PURE__ */ cn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = At(e, "open"), l = At(e, "pinned"), i = At(e, "selected"), o = Ot(), u = yt(Ks, null), d = s.route || u ? null : ir(), _ = s.route ?? u ?? d;
    je(() => d?.dispose?.());
    const b = m(() => Vr({ seed: s.schema.key })), k = m(() => s.source ?? b.value), $ = sl({
      schema: () => s.schema,
      adapter: _,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), M = m(() => s.within?.trim() ?? ""), y = al({
      source: k,
      query: $.query,
      schema: m(() => s.schema),
      entity: $.entity,
      limit: m(() => s.limit),
      within: M
    });
    ke($.query, (g) => a("query-change", g)), ke(
      [y.pageCount, y.pending, $.query],
      () => {
        if (y.pending.value) return;
        const g = y.pageCount.value;
        $.query.value.page > g && $.setPage(g, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const x = Os() ?? "dc-query-panel", F = W(null);
    function N() {
      r.value && (r.value = !1, Dt(() => {
        F.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const L = m(() => new Set(l.value));
    function I(g) {
      const E = new Set(L.value);
      E.has(g.id) ? E.delete(g.id) : E.add(g.id), l.value = [...E], a("toggle-pin", g);
    }
    const V = m(() => {
      if (s.selectable === !0) return !0;
      const g = $.entity.value;
      return !!(g?.duplicate || g?.delete);
    }), C = m(() => new Set(i.value));
    function z(g) {
      const E = new Set(C.value);
      E.has(g.id) ? E.delete(g.id) : E.add(g.id), i.value = [...E];
    }
    function X(g) {
      const E = new Set(C.value);
      for (const G of y.rows.value)
        g ? E.add(G.id) : E.delete(G.id);
      i.value = [...E];
    }
    function ee() {
      i.value.length && (i.value = []);
    }
    const re = m(() => ({
      ids: [...i.value],
      rows: y.rows.value.filter((g) => C.value.has(g.id)),
      entity: $.entity.value
    }));
    ke(() => $.query.value.entity, ee);
    function J(g, E) {
      $.narrow(Hr(s.schema, $.query.value, g), E?.key ?? null), a("drill", g, E);
    }
    const he = Xr({
      ...$,
      schema: m(() => s.schema),
      entities: m(() => s.schema.entities),
      rows: y.rows,
      total: y.total,
      limit: m(() => s.limit),
      offset: y.offset,
      pageCount: y.pageCount,
      pending: y.pending,
      error: y.error,
      source: k,
      previewsPerType: m(() => s.previewsPerType),
      within: M,
      pinnable: m(() => s.pinnable === !0),
      isPinned: (g) => L.value.has(g.id),
      isPinnedId: (g) => L.value.has(g),
      togglePin: I,
      selectable: V,
      selection: re,
      isSelected: (g) => C.value.has(g.id),
      toggleSelect: z,
      selectPage: X,
      clearSelection: ee,
      activate: (g) => a("activate", g),
      create: (g) => a("create", g),
      duplicate: () => a("duplicate", re.value),
      delete: () => a("delete", re.value),
      drill: J
    }), O = m(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: $.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: N
    }), (g, E) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re(O.value)
    }, [
      w("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        me(ca, {
          ref_key: "headerRef",
          ref: F,
          expanded: r.value,
          "panel-id": P(x),
          views: e.views,
          onToggle: E[0] || (E[0] = (G) => r.value = !r.value)
        }, en({ _: 2 }, [
          o.actions ? {
            name: "actions",
            fn: Ie(() => [
              ye(g.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views"]),
        r.value ? (f(), h(j, { key: 0 }, [
          w("div", {
            class: "dc-shell__scrim",
            onClick: N
          }),
          w("div", wc, [
            me(da, {
              "panel-id": P(x),
              onClose: N
            }, en({ _: 2 }, [
              o["panel-section"] ? {
                name: "panel-section",
                fn: Ie(() => [
                  ye(g.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : T("", !0)
      ], 8, yc),
      me(fa),
      ye(g.$slots, "results", {
        rows: P(he).rows.value,
        total: P(he).total.value,
        offset: P(he).offset.value,
        pageCount: P(he).pageCount.value,
        query: P(he).query.value,
        pending: P(he).pending.value
      }, () => [
        me(wa, { views: e.views }, en({ _: 2 }, [
          o["cards-before"] ? {
            name: "cards-before",
            fn: Ie(() => [
              ye(g.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          o["cards-after"] ? {
            name: "cards-after",
            fn: Ie(() => [
              ye(g.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, gc));
  }
}), bc = /* @__PURE__ */ fe(kc, [["__scopeId", "data-v-c00bb7e4"]]), $c = ["data-dc-muted"], xc = {
  key: 0,
  class: "dc-shell-card__head"
}, Cc = { class: "dc-shell-card__title" }, Mc = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Sc = {
  key: 0,
  class: "dc-shell-card__aside"
}, Ec = ["data-dc-flush"], Pc = {
  key: 2,
  class: "dc-shell-card__foot"
}, Ac = /* @__PURE__ */ de({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: { default: 1 },
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Ot();
    function s(d) {
      return a(d?.() ?? []);
    }
    function a(d) {
      return d.some((_) => _.type === sr ? !1 : _.type === ar ? String(_.children ?? "").trim().length > 0 : _.type === j ? a(_.children ?? []) : !0);
    }
    const r = m(() => {
      if (t.span === "all") return { gridColumn: "1 / -1" };
      const d = Math.max(1, Math.floor(Number(t.span) || 1));
      return d > 1 ? { gridColumn: `span ${d}` } : void 0;
    }), l = m(() => !!t.title || i.value || s(n.head)), i = m(() => s(n.aside)), o = m(() => s(n.default)), u = m(() => s(n.foot));
    return (d, _) => (f(), h("section", {
      class: "dc-shell-card",
      style: Re(r.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      l.value ? (f(), h("header", xc, [
        ye(d.$slots, "head", {}, () => [
          w("h2", Cc, R(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Mc, R(e.count), 1)) : T("", !0)
        ], !0),
        i.value ? (f(), h("span", Sc, [
          ye(d.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ])) : T("", !0),
      o.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        ye(d.$slots, "default", {}, void 0, !0)
      ], 8, Ec)) : T("", !0),
      u.value ? (f(), h("footer", Pc, [
        ye(d.$slots, "foot", {}, void 0, !0)
      ])) : T("", !0)
    ], 12, $c));
  }
}), kd = /* @__PURE__ */ fe(Ac, [["__scopeId", "data-v-ee53444c"]]), zc = ["aria-label"], Rc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Tc = /* @__PURE__ */ de({
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
      (f(!0), h(j, null, ie(e.options, (o, u) => (f(), h("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: on(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", o.key),
        onKeydown: (d) => r(d, u)
      }, R(o.label), 43, Rc))), 128))
    ], 8, zc));
  }
}), Lc = /* @__PURE__ */ fe(Tc, [["__scopeId", "data-v-63fb5482"]]), zt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Fc = ["aria-label"], Dc = ["role", "aria-label"], Ic = ["data-dc-item"], Nc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Oc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Bc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Kc = { class: "dc-menu__label dc-truncate" }, Vc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, qc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Wc = /* @__PURE__ */ de({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = W(null), l = W([]), i = W(null), o = W(null), u = W(null), d = W(!1), _ = m(
      () => s.items.flatMap((C, z) => zt(C) ? [z] : [])
    ), b = m(() => {
      const C = [{ entries: [] }];
      return s.items.forEach((z, X) => {
        z.heading ? C.push({ heading: z, entries: [] }) : C[C.length - 1]?.entries.push({ item: z, index: X });
      }), C.filter((z) => z.entries.length > 0);
    }), k = W({ x: s.at.x, y: s.at.y });
    async function $() {
      k.value = { x: s.at.x, y: s.at.y }, await Dt();
      const C = r.value?.getBoundingClientRect();
      if (!C) return;
      const z = 8;
      let X = s.at.x, ee = s.at.y;
      if (X + C.width > window.innerWidth - z) {
        const re = s.at.mirrorX === void 0 ? null : s.at.mirrorX - C.width;
        X = re !== null && re >= z ? re : window.innerWidth - C.width - z;
      }
      ee + C.height > window.innerHeight - z && (ee = window.innerHeight - C.height - z), k.value = { x: Math.max(z, X), y: Math.max(z, ee) };
    }
    const M = m(() => ({ left: `${k.value.x}px`, top: `${k.value.y}px` }));
    function y(C) {
      i.value = C, C !== null && Dt(() => l.value[C]?.focus());
    }
    function x(C, z) {
      const X = _.value;
      if (X.length === 0) return null;
      if (C === null) return z === 1 ? X[0] ?? null : X[X.length - 1] ?? null;
      const ee = X.indexOf(C);
      return ee === -1 ? X[0] ?? null : X[(ee + z + X.length) % X.length] ?? null;
    }
    function F(C, z) {
      if (!s.items[C]?.items?.length) return;
      const ee = l.value[C]?.getBoundingClientRect(), re = r.value?.getBoundingClientRect();
      !ee || !re || (u.value = { x: re.right - 4, y: ee.top - 4, mirrorX: re.left + 4 }, o.value = C, d.value = z);
    }
    function N(C) {
      const z = o.value;
      o.value = null, u.value = null, C && z !== null && y(z);
    }
    function L(C) {
      const z = s.items[C];
      if (!(!z || !zt(z))) {
        if (z.items?.length) {
          F(C, !0);
          return;
        }
        a("choose", z);
      }
    }
    function I(C) {
      const z = C.key;
      if (z === "Escape") {
        C.preventDefault(), C.stopPropagation(), o.value !== null ? N(!0) : a("dismiss");
        return;
      }
      if (z === "ArrowDown" || z === "ArrowUp") {
        C.preventDefault(), C.stopPropagation(), N(!1), y(x(i.value, z === "ArrowDown" ? 1 : -1));
        return;
      }
      if (z === "Home" || z === "End") {
        C.preventDefault(), C.stopPropagation(), N(!1), y(x(null, z === "Home" ? 1 : -1));
        return;
      }
      if (z === "ArrowRight") {
        const X = i.value;
        X !== null && s.items[X]?.items?.length && (C.preventDefault(), C.stopPropagation(), F(X, !0));
        return;
      }
      if (z === "ArrowLeft") {
        o.value !== null && (C.preventDefault(), C.stopPropagation(), N(!0));
        return;
      }
      if (z === "Enter" || z === " ") {
        const X = i.value;
        if (X === null) return;
        C.preventDefault(), C.stopPropagation(), L(X);
      }
    }
    function V(C) {
      const z = s.items[C];
      !z || !zt(z) || (o.value !== null && o.value !== C && N(!1), y(C), z.items?.length && F(C, !1));
    }
    return rr(() => {
      $(), s.autofocus && y(x(null, 1));
    }), ke(() => s.at, $, { deep: !0 }), ke(() => s.items, () => void $(), { deep: !0 }), je(() => {
      o.value = null;
    }), t({ root: r }), (C, z) => {
      const X = Bs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(M.value),
        onKeydown: I
      }, [
        (f(!0), h(j, null, ie(b.value, (ee, re) => (f(), h("div", {
          key: `${re}-${ee.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: ee.heading ? "group" : "none",
          "aria-label": ee.heading?.label
        }, [
          ee.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": ee.heading.id
          }, R(ee.heading.label), 9, Ic)) : T("", !0),
          (f(!0), h(j, null, ie(ee.entries, ({ item: J, index: he }) => (f(), h(j, {
            key: J.id ?? `${he}-${J.label ?? ""}`
          }, [
            J.separator ? (f(), h("div", Nc)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (O) => {
                O && (l.value[he] = O);
              },
              type: "button",
              class: "dc-menu__item",
              role: J.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": J.checked === void 0 ? void 0 : J.checked,
              "aria-haspopup": J.items?.length ? "menu" : void 0,
              "aria-expanded": J.items?.length ? o.value === he : void 0,
              "aria-disabled": J.disabled ? "true" : void 0,
              disabled: J.disabled,
              "data-dc-item": J.id,
              tabindex: "-1",
              onClick: (O) => L(he),
              onMouseenter: (O) => V(he)
            }, [
              w("span", Bc, R(J.checked ? "✓" : ""), 1),
              w("span", Kc, R(J.label), 1),
              J.shortcut ? (f(), h("span", Vc, R(J.shortcut), 1)) : J.items?.length ? (f(), h("span", qc, "›")) : T("", !0)
            ], 40, Oc))
          ], 64))), 128))
        ], 8, Dc))), 128)),
        o.value !== null && u.value ? (f(), se(X, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: u.value,
          label: e.items[o.value]?.label,
          autofocus: d.value,
          onChoose: z[0] || (z[0] = (ee) => a("choose", ee)),
          onDismiss: z[1] || (z[1] = (ee) => N(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
      ], 44, Fc);
    };
  }
}), ka = /* @__PURE__ */ fe(Wc, [["__scopeId", "data-v-9b1413fa"]]), Uc = ["data-dc-theme", "aria-label"], Hc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], jc = /* @__PURE__ */ de({
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
    }), a = t, r = W(null), l = W([]), i = W(null), o = W(null), u = W(!1), d = m(
      () => n.menus.flatMap((L, I) => zt(L) ? [I] : [])
    );
    function _(L, I) {
      const V = l.value[L]?.getBoundingClientRect(), C = n.menus[L];
      !V || !C || !zt(C) || (o.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, i.value = L, u.value = I);
    }
    function b(L) {
      const I = i.value;
      i.value = null, o.value = null, L && I !== null && l.value[I]?.focus();
    }
    function k(L) {
      i.value === L ? b(!0) : _(L, !1);
    }
    function $(L) {
      i.value === null || i.value === L || _(L, !1);
    }
    function M(L, I) {
      const V = d.value;
      if (V.length === 0) return null;
      if (L === null) return I === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const C = V.indexOf(L);
      return C === -1 ? V[0] ?? null : V[(C + I + V.length) % V.length] ?? null;
    }
    function y(L) {
      const I = L.key;
      if (I === "Escape") {
        if (i.value === null) return;
        L.preventDefault(), b(!0);
        return;
      }
      if (I === "ArrowDown" && i.value === null) {
        const z = x();
        if (z === null) return;
        L.preventDefault(), _(z, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const V = i.value ?? x(), C = M(V, I === "ArrowRight" ? 1 : -1);
      C !== null && (L.preventDefault(), i.value !== null ? _(C, !0) : l.value[C]?.focus());
    }
    function x() {
      const L = l.value.findIndex((I) => I === document.activeElement);
      return L === -1 ? d.value[0] ?? null : L;
    }
    function F(L) {
      const I = L.target;
      !I || r.value?.contains(I) || b(!1);
    }
    ke(i, (L) => {
      L !== null ? window.addEventListener("pointerdown", F, !0) : window.removeEventListener("pointerdown", F, !0);
    }), je(() => window.removeEventListener("pointerdown", F, !0));
    function N(L) {
      b(!0), L.action?.(), a("choose", L);
    }
    return (L, I) => (f(), h("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Re(s.value),
      onKeydown: y
    }, [
      (f(!0), h(j, null, ie(e.menus, (V, C) => (f(), h("button", {
        key: V.id ?? V.label ?? C,
        ref_for: !0,
        ref: (z) => {
          z && (l.value[C] = z);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === C,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: C === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (z) => k(C),
        onMouseenter: (z) => $(C)
      }, R(V.label), 41, Hc))), 128)),
      i.value !== null && o.value ? (f(), se(ka, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: u.value,
        onChoose: N,
        onDismiss: I[0] || (I[0] = (V) => b(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 44, Uc));
  }
}), bd = /* @__PURE__ */ fe(jc, [["__scopeId", "data-v-93dbd2e4"]]), Xc = ["aria-label", "aria-expanded", "disabled"], Gc = { "aria-hidden": "true" }, Yc = /* @__PURE__ */ de({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = W(null), a = W(null), r = W(null), l = W(!1), i = m(() => r.value !== null);
    function o($) {
      const M = s.value?.getBoundingClientRect();
      M && (r.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, l.value = $);
    }
    function u($) {
      r.value = null, $ && s.value?.focus();
    }
    function d() {
      i.value ? u(!0) : o(!1);
    }
    function _($) {
      $.key !== "ArrowDown" || i.value || ($.preventDefault(), o(!0));
    }
    function b($) {
      const M = $.target;
      M && (s.value?.contains(M) || a.value?.root?.contains(M) || u(!1));
    }
    ke(i, ($) => {
      $ ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), je(() => window.removeEventListener("pointerdown", b, !0));
    function k($) {
      u(!0), $.action?.(), n("choose", $);
    }
    return ($, M) => (f(), h(j, null, [
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
        onKeydown: _
      }, [
        w("span", Gc, R(e.glyph), 1)
      ], 40, Xc),
      r.value ? (f(), se(ka, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: l.value,
        onChoose: k,
        onDismiss: M[0] || (M[0] = (y) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 64));
  }
}), Yn = /* @__PURE__ */ fe(Yc, [["__scopeId", "data-v-48f5ada5"]]), $t = (e) => e.kind === "split", U = (e) => e.kind === "group", Z = (e) => e.kind === "float", it = { x: 16, y: 16, w: 360, h: 260 }, dn = 28, ba = 120, An = 220, $a = 38, pt = 6;
function Ut(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const l = t(a.node, r);
    return l === a.node ? a : (n = !0, { ...a, node: l });
  });
  return n ? { ...e, frames: s } : e;
}
function Oe(e) {
  return { kind: "group", panels: [e] };
}
function $d(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const pe = (e) => typeof e == "string", Qn = (e) => pe(e) ? Oe(e) : e, Ht = (e) => pe(e) ? [e] : Xe(e), Es = (e) => e.panels.filter(pe), Qc = (e) => e.panels.filter((t) => !pe(t)), Ae = (e, t) => e.panels.includes(t);
function jt(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (pe(r) || !ae(r, t)) return r;
    const l = n(r);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, panels: a } : e;
}
function pn(e, t) {
  return { node: e, rect: { ...it, ...t } };
}
function Zn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Jn(e, t) {
  const n = { ...it, ...t };
  return Zn(
    e.map(
      (s, a) => pn(s, {
        ...n,
        x: n.x + a * dn,
        y: n.y + a * dn
      })
    )
  );
}
function es(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const ts = (e, t, n) => es("row", e, t, n), xd = (e, t, n) => es("column", e, t, n);
function ge(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const dt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Cd = (e) => ({ ...e, headless: !0 }), Md = (e) => ({ ...e, fixedView: !0 }), Zc = (e) => e === "left" || e === "right" ? "row" : "column";
function Xe(e) {
  return U(e) ? e.panels.flatMap(Ht) : Z(e) ? e.frames.flatMap((t) => Xe(t.node)) : e.children.flatMap(Xe);
}
function ae(e, t) {
  return U(e) ? e.panels.some((n) => pe(n) ? n === t : ae(n, t)) : Z(e) ? e.frames.some((n) => ae(n.node, t)) : e.children.some((n) => ae(n, t));
}
const xa = (e) => Xe(e).length === 0, zn = (e) => !U(e) && dt(e), Rn = (e) => xa(e) && !zn(e);
function vn(e) {
  return $t(e) ? e.children.map((t, n) => ({ node: t, index: n })) : Z(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => pe(t) ? [] : [{ node: t, index: n }]);
}
const ns = (e) => vn(e).map((t) => t.node);
function ft(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => pe(s) ? s === t : ae(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ca(e) {
  const t = e.panels[ft(e)];
  return t !== void 0 && pe(t) ? t : "";
}
function Me(e) {
  if (pe(e)) return e;
  if (U(e)) {
    const n = e.panels[ft(e)];
    return n === void 0 ? "" : Me(n);
  }
  if (Z(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Me(n.node) : "";
  }
  const t = e.children[0];
  return t ? Me(t) : "";
}
function mt(e, t) {
  if (U(e) && Ae(e, t)) return e;
  for (const n of ns(e)) {
    const s = mt(n, t);
    if (s) return s;
  }
  return null;
}
function Jc(e) {
  const t = ns(e).flatMap(Jc);
  return U(e) ? [e, ...t] : t;
}
function $e(e, t) {
  if (U(e)) {
    for (const n of Qc(e)) {
      const s = $e(n, t);
      if (s) return s;
    }
    return null;
  }
  if (Z(e)) {
    for (const n of e.frames)
      if (ae(n.node, t))
        return $e(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = $e(n, t);
    if (s) return s;
  }
  return null;
}
function kn(e, t, n = ba) {
  const s = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), a = s(e.w, t.w), r = s(e.h, t.h), l = (i, o, u) => Math.min(Math.max(i, 0), Math.max(u - o, 0));
  return {
    x: Math.round(l(e.x, a, t.w)),
    y: Math.round(l(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function Ps(e, t, n, s, a = ba) {
  let { x: r, y: l, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, r = e.x + n), t.includes("s") && (o = e.h + s), t.includes("n") && (o = e.h - s, l = e.y + s), i < a && (t.includes("w") && (r = e.x + e.w - a), i = a), o < a && (t.includes("n") && (l = e.y + e.h - a), o = a), { x: r, y: l, w: i, h: o };
}
const Ma = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function ht(e, t, n) {
  if (U(e)) return jt(e, t, (r) => ht(r, t, n));
  if (Z(e)) {
    let r = !1;
    const l = e.frames.map((i) => {
      if (!ae(i.node, t)) return i;
      if ($e(i.node, t)) {
        const u = ht(i.node, t, n);
        return u === i.node ? i : (r = !0, { ...i, node: u });
      }
      const o = n(i);
      return o === i ? i : (r = !0, o);
    });
    return r ? { ...e, frames: l } : e;
  }
  if (!ae(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const l = ht(r, t, n);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, children: a } : e;
}
function eu(e, t, n) {
  return ht(e, t, (s) => Ma(s.rect, n) ? s : { ...s, rect: n });
}
const et = (e) => e.maximized === !0, Sa = (e) => (t) => {
  if (et(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function tu(e, t, n = !0) {
  return ht(e, t, Sa(n));
}
function Sd(e, t) {
  const n = $e(e, t);
  return n ? tu(e, t, !et(n)) : e;
}
const ot = (e) => e.minimized === !0, Ea = (e) => (t) => {
  if (ot(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function nu(e, t, n = !0) {
  return ht(e, t, Ea(n));
}
function Ed(e, t) {
  const n = $e(e, t);
  return n ? nu(e, t, !ot(n)) : e;
}
function lt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = nt(e, t.slice(0, -1));
  return !s || !Z(s) ? null : s.frames[n] ?? null;
}
function Tn(e, t) {
  if (Z(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ae(s.node, t)) continue;
      const a = Tn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of vn(e)) {
    if (!ae(n, t)) continue;
    const a = Tn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function ss(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = nt(e, a);
  if (!r || !Z(r)) return e;
  const l = r.frames[s];
  if (!l) return e;
  const i = n(l);
  if (i === l) return e;
  const o = [...r.frames];
  return o[s] = i, ut(e, a, { ...r, frames: o });
}
function As(e, t, n) {
  return ss(
    e,
    t,
    (s) => Ma(s.rect, n) ? s : { ...s, rect: n }
  );
}
function su(e, t, n = !0) {
  return ss(e, t, Sa(n));
}
function au(e, t, n = !0) {
  return ss(e, t, Ea(n));
}
function Rt(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (Z(e)) {
    const l = e.frames[n];
    if (!l) return e;
    const i = Rt(l.node, s), o = i === l.node ? l : { ...l, node: i };
    if (n === e.frames.length - 1 && o === l) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(o), { ...e, frames: u };
  }
  const a = nt(e, [n]);
  if (!a) return e;
  const r = Rt(a, s);
  return r === a ? e : ut(e, [n], r);
}
function ru(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (Z(s) && (n[r] = s.frames.length - 1), s = nt(s, [a]));
  }), n;
}
function an(e, t, n, s) {
  if (U(e)) return jt(e, n, (l) => an(l, t, n, s));
  if (Z(e)) {
    const l = e.frames.findIndex((o) => ae(o.node, n)), i = e.frames[l];
    if (!i) return e;
    if ($e(i.node, n)) {
      const o = an(i.node, t, n, s);
      if (o === i.node) return e;
      const u = [...e.frames];
      return u[l] = { ...i, node: o }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, pn(Oe(t), s)] };
  }
  if (!ae(e, n)) return e;
  let a = !1;
  const r = e.children.map((l) => {
    const i = an(l, t, n, s);
    return i !== l && (a = !0), i;
  });
  return a ? { ...e, children: r } : e;
}
function zs(e, t, n, s) {
  if (t === n || !ae(e, t) || !ae(e, n) || !$e(e, n)) return e;
  const a = ct(e, t);
  if (!a) return e;
  const r = an(a, t, n, s);
  return r === a ? e : we(r);
}
function lu(e, t, n) {
  return Z(e) ? { ...e, frames: [...e.frames, pn(Oe(t), n)] } : U(e) ? Aa(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Oe(t)],
    sizes: [...He(e), 1],
    ...ge(e)
  };
}
function Pa(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return lu(e, t, s);
  const r = n.slice(1), l = (d, _) => _ === a ? Pa(d, t, r, s) : ct(d, t);
  if (Z(e)) {
    const d = e.frames.flatMap((_, b) => {
      const k = l(_.node, b);
      return k ? [k === _.node ? _ : { ..._, node: k }] : [];
    });
    return { ...e, frames: d };
  }
  if (U(e)) {
    const d = ft(e), _ = [];
    e.panels.forEach(($, M) => {
      if (pe($)) {
        $ !== t && _.push($);
        return;
      }
      const y = l($, M);
      y && _.push(y);
    });
    const k = e.active && _.some(($) => Ht($).includes(e.active)) ? e.active : Me(_[d] ?? _[_.length - 1]);
    return {
      kind: "group",
      panels: _,
      ...k ? { active: k } : {},
      ...ge(e)
    };
  }
  const i = He(e), o = [], u = [];
  return e.children.forEach((d, _) => {
    const b = l(d, _);
    b && (o.push(b), u.push(i[_] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: u, ...ge(e) };
}
function Rs(e, t, n, s) {
  const a = nt(e, n);
  return !a || !xa(a) || !ae(e, t) ? e : we(Pa(e, t, n, s));
}
function bn(e, t) {
  if (U(e)) return jt(e, t, (a) => bn(a, t));
  if (Z(e)) {
    const a = e.frames.findIndex((u) => ae(u.node, t)), r = e.frames[a];
    if (!r) return e;
    const l = bn(r.node, t), i = l === r.node ? r : { ...r, node: l };
    if (a === e.frames.length - 1 && i === r) return e;
    const o = [...e.frames];
    return o.splice(a, 1), o.push(i), { ...e, frames: o };
  }
  if (!ae(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = bn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function as(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, l) => r + l, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const He = (e) => as(e.children.length, e.sizes), Le = (e) => {
  const t = U(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function we(e) {
  if (U(e)) return ou(e);
  if (Z(e)) {
    const i = e.frames.flatMap((o) => {
      const u = we(o.node);
      return Rn(u) ? [] : [u === o.node ? o : { ...o, node: u }];
    });
    return i.length === e.frames.length && i.every((o, u) => o === e.frames[u]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = He(e), n = Le(e), s = [], a = [], r = [];
  e.children.forEach((i, o) => {
    const u = we(i), d = t[o] ?? 0;
    if (Rn(u)) return;
    if (!n && $t(u) && u.direction === e.direction && !Le(u) && !dt(u)) {
      const b = He(u);
      u.children.forEach((k, $) => {
        s.push(k), a.push(d * (b[$] ?? 0));
      });
      return;
    }
    s.push(u), a.push(d);
    const _ = n?.[o];
    _ && r.push(_);
  });
  const l = s[0];
  return s.length === 1 && l && !dt(e) ? l : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: as(s.length, a),
    ...ge(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function ou(e) {
  if (e.panels.every(pe)) return e;
  const t = Me(e), n = Le(e), s = [], a = [];
  e.panels.forEach((i, o) => {
    const u = n?.[o];
    if (pe(i)) {
      s.push(i), u && a.push(u);
      return;
    }
    const d = we(i);
    if (!Rn(d)) {
      if (U(d) && !dt(d) && !Le(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !pe(r) && !dt(e))
    return r;
  if (s.length === e.panels.length && s.every((i, o) => i === e.panels[o]))
    return e;
  const l = t && s.some((i) => Ht(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...l ? { active: l } : {},
    ...ge(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ct(e, t) {
  if (Z(e)) {
    const l = e.frames.flatMap((i) => {
      const o = ct(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return l.length === 0 && !zn(e) ? null : { ...e, frames: l };
  }
  if (U(e)) {
    if (!ae(e, t)) return e;
    const l = ft(e), i = [];
    for (const d of e.panels) {
      if (pe(d)) {
        d !== t && i.push(d);
        continue;
      }
      const _ = ct(d, t);
      _ && i.push(_);
    }
    if (i.length === 0) return null;
    const u = e.active && i.some((d) => Ht(d).includes(e.active)) ? e.active : Me(i[l] ?? i[i.length - 1]);
    return u ? { kind: "group", panels: i, active: u, ...ge(e) } : { kind: "group", panels: i, ...ge(e) };
  }
  const n = He(e), s = [], a = [];
  if (e.children.forEach((l, i) => {
    const o = ct(l, t);
    o && (s.push(o), a.push(n[i] ?? 0));
  }), s.length === 0)
    return zn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...ge(e) } : null;
  const r = s[0];
  return s.length === 1 && r && !dt(e) ? r : we({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...ge(e)
  });
}
function Aa(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...ge(e) };
}
function Et(e, t, n, s, a) {
  const r = (k) => Ut(
    k,
    ($) => ae($, n) ? Et($, t, n, s, a) : $
  );
  if (s === "float") return e;
  const l = (k) => jt(k, n, ($) => Et($, t, n, s, a));
  if (s === "center")
    return U(e) ? Ae(e, n) ? Aa(e, t, a) : l(e) : Z(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (k) => ae(k, n) ? Et(k, t, n, s, a) : k
      )
    };
  const i = Zc(s), o = s === "left" || s === "top", u = (k) => ({
    kind: "split",
    direction: i,
    children: o ? [Oe(t), k] : [k, Oe(t)],
    sizes: [0.5, 0.5]
  });
  if (U(e)) return Ae(e, n) ? u(e) : l(e);
  if (Z(e)) return r(e);
  const d = He(e), _ = e.children.findIndex(
    (k) => U(k) && Ae(k, n)
  );
  if (_ >= 0 && e.direction === i) {
    const k = (d[_] ?? 0) / 2, $ = [...e.children], M = [...d];
    return $.splice(o ? _ : _ + 1, 0, Oe(t)), M.splice(_, 1, k, k), {
      kind: "split",
      direction: i,
      children: $,
      sizes: M,
      ...ge(e)
    };
  }
  const b = e.children.map((k) => ae(k, n) ? U(k) && Ae(k, n) ? u(k) : Et(k, t, n, s) : k);
  return {
    kind: "split",
    direction: e.direction,
    children: b,
    sizes: d,
    ...ge(e)
  };
}
function _t(e, t) {
  if (U(e)) {
    if (Ae(e, t))
      return Ca(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((o) => !pe(o) && ae(o, t)), r = e.panels[a];
    if (r === void 0 || pe(r)) return e;
    const l = _t(r, t);
    if (l === r && e.active === t) return e;
    const i = [...e.panels];
    return i[a] = l, { ...e, panels: i, active: t };
  }
  if (!ae(e, t)) return e;
  if (Z(e)) return Ut(e, (a) => _t(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = _t(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Tt(e, t, n) {
  if (U(e)) {
    if (!Ae(e, t)) return jt(e, t, (u) => Tt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const l = Le(e), i = l ? [...l] : void 0;
    i && i.splice(a, 0, ...i.splice(s, 1));
    const o = Me(e);
    return {
      kind: "group",
      panels: r,
      ...o ? { active: o } : {},
      ...ge(e),
      ...i ? { places: i } : {}
    };
  }
  return ae(e, t) ? Z(e) ? Ut(e, (s) => Tt(s, t, n)) : { ...e, children: e.children.map((s) => Tt(s, t, n)) } : e;
}
function rn(e, t, n) {
  if (t === n) return e;
  if (U(e)) {
    if (!ae(e, t) && !ae(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => pe(r) ? s(r) : rn(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return Z(e) ? Ut(e, (s) => rn(s, t, n)) : { ...e, children: e.children.map((s) => rn(s, t, n)) };
}
function Zt(e, t, n, s, a) {
  if (s === "float" || !ae(e, t) || !ae(e, n)) return e;
  const r = mt(e, t);
  if (s === "center" && r && Ae(r, n)) {
    if (a === void 0) return e;
    const i = r.panels.indexOf(t), o = a > i ? a - 1 : a;
    return o === i ? e : _t(Tt(e, t, o), t);
  }
  if (t === n) return e;
  const l = ct(e, t);
  return l ? we(Et(l, t, n, s, a)) : e;
}
function za(e, t, n) {
  if (U(e)) {
    const a = e.panels[t];
    if (a === void 0 || pe(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (Z(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const r = [...e.frames];
    return r[t] = { ...a, node: n }, { ...e, frames: r };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function Xt(e, t, n) {
  const s = vn(e);
  if (!U(e) && s.some(({ node: a }) => U(a) && Ae(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!ae(a, t)) continue;
    const l = Xt(a, t, n);
    return l ? za(e, r, l) : null;
  }
  return null;
}
function Pd(e, t, n) {
  const s = Xt(
    e,
    t,
    (a) => $t(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? we(s) : e;
}
function Ra(e) {
  return Z(e) ? [e] : Le(e) || dt(e) ? [e] : U(e) ? [...e.panels] : e.children.flatMap(Ra);
}
function Ta(e, t) {
  if (U(e)) return e;
  const n = ns(e).map(Ra), s = n.flat(), a = t && s.some((l) => Ht(l).includes(t)) ? t : void 0, r = iu(e, n);
  return we({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...ge(e),
    ...r ? { places: r } : {}
  });
}
function iu(e, t) {
  const n = Z(e) ? e.frames.map(({ node: s, ...a }) => a) : Le(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function cu(e, t) {
  const n = Xt(e, t, (s) => Ta(s, t));
  return n ? we(n) : e;
}
function rs(e, t, n) {
  if (U(e) && Ae(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of vn(e)) {
    if (!ae(s, t)) continue;
    const r = rs(s, t, n);
    return r ? za(e, a, r) : null;
  }
  return null;
}
function Ts(e, t, n) {
  const s = rs(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = Le(a);
    return {
      ...es(n, a.panels.map(Qn)),
      ...ge(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? we(s) : e;
}
function Ln(e, t) {
  if (U(e)) return e;
  if (Z(e)) {
    const a = e.frames.findIndex(
      (i) => U(i.node) && i.node.panels.includes(t)
    ), r = e.frames[a], l = r && U(r.node) ? r.node : null;
    if (r && l && l.panels.length > 1) {
      const i = Jn(l.panels.map(Qn), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...i, ...e.frames.slice(a + 1)]
      };
    }
    return Ut(e, (i) => Ln(i, t));
  }
  if (!ae(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = Ln(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function uu(e, t, n) {
  const s = mt(e, t);
  if (!s || s.panels.length < 2) return e;
  if ($e(e, t)?.node === s) {
    const l = Ln(e, t);
    return l === e ? e : we(l);
  }
  const r = rs(e, t, (l) => ({
    ...Zn(La(l.panels.map(Qn), Le(l), n)),
    ...ge(l)
  }));
  return r ? we(r) : e;
}
function La(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Jn(e, n).frames;
}
function Fa(e, t) {
  return { ...Zn(La(e.children, Le(e), t)), ...ge(e) };
}
function Ad(e, t, n) {
  const s = Xt(
    e,
    t,
    (a) => Z(a) ? a : Fa(a, n)
  );
  return s ? we(s) : U(e) && Ae(e, t) ? Jn([e], n) : e;
}
function du(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function Da(e, t) {
  const n = du(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...ge(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function zd(e, t, n = "row") {
  const s = Xt(
    e,
    t,
    (a) => Z(a) ? Da(a, n) : a
  );
  return s ? we(s) : e;
}
function Ia(e) {
  if (Z(e)) return null;
  const t = U(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || pe(t) || U(t) && t.panels.length === 1 && pe(t.panels[0]) ? null : t;
}
const fu = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function pu(e, t) {
  const n = Ia(e);
  return n ? t === "inner" ? n : { ...fu(n), ...ge(e) } : e;
}
function wt(e) {
  return e.title ? e.title : U(e) ? "" : Z(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Lt(e, t) {
  if (U(e)) {
    const s = e.panels[ft(e)];
    return s === void 0 ? "" : pe(s) ? t(s) ?? s : wt(s) || Lt(s, t);
  }
  if (e.title) return e.title;
  if (Z(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Lt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Lt(n, t) : "";
}
function nt(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if ($t(n)) n = n.children[s];
    else if (Z(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || pe(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function ut(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (Z(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const u = ut(o.node, a, n);
    if (u === o.node) return e;
    const d = [...e.frames];
    return d[s] = { ...o, node: u }, { ...e, frames: d };
  }
  if (U(e)) {
    const o = e.panels[s];
    if (o === void 0 || pe(o)) return e;
    const u = ut(o, a, n);
    if (u === o) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = ut(r, a, n);
  if (l === r) return e;
  const i = [...e.children];
  return i[s] = l, { ...e, children: i };
}
function ln(e, t, n) {
  if (t.length === 0)
    return $t(e) ? { ...e, sizes: as(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (Z(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const o = ln(i.node, a, n);
    if (o === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: o }, { ...e, frames: u };
  }
  if (U(e)) {
    const i = e.panels[s];
    if (i === void 0 || pe(i)) return e;
    const o = ln(i, a, n);
    if (o === i) return e;
    const u = [...e.panels];
    return u[s] = o, { ...e, panels: u };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = [...e.children];
  return l[s] = ln(r, a, n), { ...e, children: l };
}
function Ls(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const l = a + r;
  if (l < s * 2) return e;
  const i = [...e], o = Math.min(Math.max(a + n, s), l - s);
  return i[t] = o, i[t + 1] = l - o, i;
}
function fn(e) {
  if (!U(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !pe(t) ? e : { ...ts([vu(e)]), ...ge(e) };
}
const vu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Fs(e) {
  return e.length === 0 ? null : ts(e.map(Oe));
}
function mu(e, t) {
  if (!e) return Fs(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const o of Xe(e))
    !n.has(o) || s.has(o) ? a.add(o) : s.add(o);
  let r = e;
  for (const o of a)
    r = r ? ct(r, o) : null;
  const l = new Set(r ? Xe(r) : []), i = t.filter((o) => !l.has(o));
  if (i.length === 0) return r ? fn(we(r)) : null;
  if (!r) return Fs(i);
  if (Z(r)) {
    const o = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...i.map(
          (u, d) => pn(Oe(u), {
            x: it.x + (o + d) * dn,
            y: it.y + (o + d) * dn
          })
        )
      ]
    };
  }
  return fn(we(ts([r, ...i.map(Oe)])));
}
const ls = Symbol("dc.windowContext");
function hu(e) {
  return Fn(ls, e), e;
}
function os() {
  const e = yt(ls, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const _u = ["data-dc-glyph"], gu = { class: "dc-glyph__line" }, yu = ["d"], wu = {
  key: 0,
  class: "dc-glyph__aqua"
}, ku = ["d"], bu = /* @__PURE__ */ de({
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
      w("g", gu, [
        (f(!0), h(j, null, ie(t[e.kind], (r) => (f(), h("path", {
          key: r,
          d: r
        }, null, 8, yu))), 128))
      ]),
      n[e.kind] ? (f(), h("g", wu, [
        (f(!0), h(j, null, ie(n[e.kind], (r) => (f(), h("path", {
          key: r,
          d: r
        }, null, 8, ku))), 128))
      ])) : T("", !0)
    ], 8, _u));
  }
}), gt = /* @__PURE__ */ fe(bu, [["__scopeId", "data-v-4d2872c0"]]), $u = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], xu = ["data-dc-movable"], Cu = { class: "dc-float__title dc-truncate" }, Mu = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Su = ["aria-label", "aria-pressed", "data-dc-minimize"], Eu = ["aria-label", "aria-pressed", "data-dc-maximize"], Pu = ["aria-label", "data-dc-close"], Au = { class: "dc-float__content" }, zu = ["data-dc-handle", "onPointerdown"], Ru = /* @__PURE__ */ de({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = os(), s = m(() => Me(t.frame.node)), a = m(() => n.panelFor(s.value)?.fixed === !0), r = m(() => et(t.frame)), l = m(() => ot(t.frame)), i = m(() => r.value || l.value), o = m(() => n.resizable.value && !a.value && !i.value), u = m(() => n.movable.value && !a.value && !i.value), d = m(() => {
      const I = Xe(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), _ = m(() => d.value !== null && n.closable(d.value)), b = m(() => t.frame.node.headless === !0), k = m(
      () => !b.value && (!U(t.frame.node) || l.value)
    ), $ = m(
      () => t.frame.title || wt(t.frame.node) || Lt(t.frame.node, (I) => n.panelFor(I)?.title)
    ), M = m(() => n.spaceMenu(t.path));
    function y(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function x(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const F = m(() => {
      const I = n.framing.value;
      return I !== null && ae(t.frame.node, I);
    }), N = m(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${An}px`,
        height: `${$a}px`
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
    return (I, V) => (f(), h("div", {
      class: "dc-float",
      style: Re(N.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": l.value ? "true" : "false",
      "data-dc-dragging": F.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (C) => P(n).raiseAt(e.path))
    }, [
      k.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: y,
        onDblclick: x
      }, [
        w("span", Cu, R($.value), 1),
        M.value.length ? (f(), se(Yn, {
          key: 0,
          items: M.value,
          label: `${$.value} menu`
        }, null, 8, ["items", "label"])) : T("", !0),
        !a.value || l.value && _.value && d.value ? (f(), h("div", Mu, [
          a.value ? T("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Unroll" : "Minimize"} ${$.value}`,
            "aria-pressed": l.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (C) => P(n).toggleMinimizeAt(e.path))
          }, [
            me(gt, {
              kind: l.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Su)),
          a.value ? T("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${$.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (C) => P(n).toggleMaximizeAt(e.path))
          }, [
            me(gt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Eu)),
          l.value && _.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${$.value}`,
            "data-dc-close": d.value,
            onClick: V[2] || (V[2] = (C) => P(n).close(d.value))
          }, [
            me(gt, { kind: "close" })
          ], 8, Pu)) : T("", !0)
        ])) : T("", !0)
      ], 40, xu)) : T("", !0),
      w("div", Au, [
        ye(I.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(j, null, ie(o.value ? L : [], (C) => (f(), h("span", {
        key: C,
        class: "dc-float__grip",
        "data-dc-handle": C,
        "aria-hidden": "true",
        onPointerdown: De((z) => P(n).beginFrameDragAt(e.path, z, C), ["stop"])
      }, null, 40, zu))), 128))
    ], 44, $u));
  }
}), Tu = /* @__PURE__ */ fe(Ru, [["__scopeId", "data-v-f035684c"]]), is = Symbol("dc.paneContext");
function Lu(e) {
  return Fn(is, e), e;
}
function Rd() {
  return yt(is, null);
}
function Td(e) {
  const t = yt(ls, null), n = yt(is, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => St(e)
  );
  return lr() && Is(s), s;
}
const Fu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Du = ["data-dc-movable"], Iu = ["aria-label", "aria-pressed"], Nu = ["data-dc-space-name"], Ou = { class: "dc-truncate" }, Bu = ["aria-label"], Ku = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Vu = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], qu = { class: "dc-tab__name dc-truncate" }, Wu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Uu = ["aria-label", "data-dc-close", "onClick"], Hu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ju = { class: "dc-pane__tools" }, Xu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Gu = ["aria-label", "data-dc-minimize"], Yu = ["aria-label", "aria-pressed", "data-dc-maximize"], Qu = ["aria-label", "data-dc-close"], Zu = ["id", "role", "aria-labelledby"], Ju = ["id", "role", "aria-labelledby"], ed = ["data-dc-edge"], td = /* @__PURE__ */ de({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = os(), s = Os() ?? "dc-pane", a = m(
      () => t.group.panels.flatMap((B, q) => {
        if (!pe(B)) {
          const Se = wt(B) || Lt(B, (xe) => n.panelFor(xe)?.title);
          return [{ kind: "space", index: q, id: `space-${q}`, title: Se, node: B }];
        }
        const te = n.panelFor(B);
        return te ? [{ kind: "panel", index: q, id: B, title: te.title, panel: te }] : [];
      })
    ), r = m(() => a.value.length > 1), l = m(() => {
      const B = ft(t.group);
      return a.value.find((q) => q.index === B) ?? a.value[0] ?? null;
    }), i = m(() => l.value?.kind === "space" ? l.value.node : null), o = m(() => i.value ? "" : Ca(t.group)), u = m(() => i.value ? null : n.panelFor(o.value)), d = m(() => l.value?.title ?? ""), _ = m(() => n.spaceNames.value ? t.group.title ?? "" : ""), b = m(() => [...t.path, l.value?.index ?? 0]), k = m(() => o.value || Es(t.group)[0] || ""), $ = m(() => n.viewFor(o.value)), M = m(() => t.group.headless === !0), y = m(() => n.focused.value === o.value), x = m(() => n.dragging.value === o.value), F = m(() => n.moving.value === o.value), N = m(() => n.frameOf(k.value) !== null), L = m(() => n.panelFor(k.value)?.fixed === !0), I = m(
      () => !i.value && (n.canMove(o.value) || N.value && n.movable.value && !L.value)
    ), V = m(
      () => i.value ? n.spaceMenu(b.value) : n.menuFor(o.value)
    ), C = (B) => n.closable(B);
    Lu({ panel: o });
    const z = m(() => n.maximized(k.value)), X = m(
      () => N.value && !L.value || !r.value && !!u.value && C(u.value.id)
    ), ee = (B) => `${s}-tab-${B}`, re = m(() => `${s}-body`), J = m(() => {
      const B = n.dropTarget.value;
      return !B || !Ae(t.group, B.panel) || B.edge === "float" ? null : B;
    }), he = m(() => J.value?.index === void 0 ? J.value?.edge ?? null : null), O = m(() => J.value?.index ?? null), g = () => u.value ? n.renderContent(u.value, $.value, y.value) ?? null : null, E = () => u.value ? n.renderActions(u.value, $.value, y.value) ?? null : null;
    let G = null;
    function le(B) {
      const q = G !== null && Math.hypot(B.clientX - G.x, B.clientY - G.y) >= 4;
      return G = null, q;
    }
    const _e = (B) => B.kind === "panel" ? B.id : Me(B.node);
    function Ee(B, q) {
      q.kind !== "space" && (n.focus(q.id), G = { x: B.clientX, y: B.clientY }, n.beginDrag(q.id, B));
    }
    function Ge(B, q) {
      if (le(B)) return;
      const te = _e(q);
      te && n.selectPanel(te);
    }
    function Ye(B) {
      o.value && n.focus(o.value), !B.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (N.value ? n.beginFrameDrag(k.value, B, "move") : n.beginDrag(o.value, B));
    }
    function Qe(B) {
      G = { x: B.clientX, y: B.clientY }, n.beginDrag(o.value, B);
    }
    function Ze(B) {
      le(B) || n.toggleMoveMode(o.value);
    }
    const Be = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ke(B) {
      if (!F.value) return;
      if (B.key === "Escape") {
        B.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const q = Be[B.key];
      q && (B.preventDefault(), N.value ? n.nudgeFrame(o.value, q, B.shiftKey) : n.nudge(o.value, q, B.shiftKey));
    }
    function Ve(B) {
      !N.value || B.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(k.value);
    }
    function xt(B, q) {
      B.stopPropagation(), G = null, n.close(q);
    }
    function Gt(B, q) {
      const te = a.value.length;
      let Se = null;
      if (B.key === "ArrowRight" ? Se = (q + 1) % te : B.key === "ArrowLeft" ? Se = (q - 1 + te) % te : B.key === "Home" ? Se = 0 : B.key === "End" && (Se = te - 1), Se === null) return;
      B.preventDefault();
      const xe = a.value[Se];
      if (!xe) return;
      const Ct = _e(xe);
      Ct && n.selectPanel(Ct);
    }
    return (B, q) => l.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": P(Es)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": N.value ? "true" : "false",
      "data-dc-maximized": z.value ? "true" : "false",
      "data-dc-headless": M.value ? "true" : "false",
      "data-dc-active": y.value ? "true" : "false",
      "data-dc-dragging": x.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: q[7] || (q[7] = (te) => o.value && P(n).focus(o.value))
    }, [
      M.value ? T("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": I.value ? "true" : "false",
        onPointerdown: Ye,
        onDblclick: Ve
      }, [
        I.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": F.value,
          onPointerdown: Qe,
          onClick: Ze,
          onKeydown: Ke
        }, [...q[8] || (q[8] = [
          w("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Iu)) : T("", !0),
        _.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": _.value
        }, [
          w("span", Ou, R(_.value), 1)
        ], 8, Nu)) : T("", !0),
        w("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(j, null, ie(a.value, (te, Se) => (f(), h(j, {
            key: te.id
          }, [
            O.value === Se ? (f(), h("span", Ku)) : T("", !0),
            w("button", {
              id: ee(te.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": te.kind === "panel" ? te.id : void 0,
              "data-dc-space": te.kind === "space" ? te.title : void 0,
              "aria-selected": te.index === l.value.index,
              "aria-controls": re.value,
              tabindex: te.index === l.value.index ? 0 : -1,
              onPointerdown: (xe) => Ee(xe, te),
              onClick: (xe) => Ge(xe, te),
              onKeydown: (xe) => Gt(xe, Se)
            }, [
              w("span", qu, R(te.title), 1),
              te.kind === "panel" && te.panel.subtitle ? (f(), h("span", Wu, R(te.panel.subtitle), 1)) : T("", !0),
              r.value && te.kind === "panel" && C(te.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${te.title}`,
                "data-dc-close": te.id,
                onPointerdown: q[0] || (q[0] = De(() => {
                }, ["stop"])),
                onClick: (xe) => xt(xe, te.id)
              }, [...q[9] || (q[9] = [
                w("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Uu)) : T("", !0)
            ], 40, Vu)
          ], 64))), 128)),
          O.value === a.value.length ? (f(), h("span", Hu)) : T("", !0)
        ], 8, Bu),
        w("div", ju, [
          me(E),
          V.value.length ? (f(), se(Yn, {
            key: 0,
            items: V.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ]),
        X.value ? (f(), h("div", Xu, [
          N.value && !L.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": k.value,
            onPointerdown: q[1] || (q[1] = De(() => {
            }, ["stop"])),
            onClick: q[2] || (q[2] = (te) => P(n).toggleMinimize(k.value))
          }, [
            me(gt, { kind: "minimize" })
          ], 40, Gu)) : T("", !0),
          N.value && !L.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${z.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": z.value,
            "data-dc-maximize": k.value,
            onPointerdown: q[3] || (q[3] = De(() => {
            }, ["stop"])),
            onClick: q[4] || (q[4] = (te) => P(n).toggleMaximize(k.value))
          }, [
            me(gt, {
              kind: z.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Yu)) : T("", !0),
          !r.value && u.value && C(u.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: q[5] || (q[5] = De(() => {
            }, ["stop"])),
            onClick: q[6] || (q[6] = (te) => P(n).close(u.value.id))
          }, [
            me(gt, { kind: "close" })
          ], 40, Qu)) : T("", !0)
        ])) : T("", !0)
      ], 40, Du)),
      i.value ? (f(), h("div", {
        key: 1,
        id: re.value,
        class: "dc-pane__space",
        role: M.value ? void 0 : "tabpanel",
        "aria-labelledby": M.value ? void 0 : ee(l.value.id)
      }, [
        ye(B.$slots, "space", {
          node: i.value,
          path: b.value
        }, void 0, !0)
      ], 8, Zu)) : (f(), h("div", {
        key: 2,
        id: re.value,
        class: "dc-pane__body",
        role: M.value ? void 0 : "tabpanel",
        "aria-labelledby": M.value ? void 0 : ee(o.value)
      }, [
        me(g)
      ], 8, Ju)),
      he.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": he.value,
        "aria-hidden": "true"
      }, null, 8, ed)) : T("", !0)
    ], 40, Fu)) : T("", !0);
  }
}), Na = /* @__PURE__ */ fe(td, [["__scopeId", "data-v-44fd2b2d"]]), nd = ["data-dc-space", "data-dc-path", "aria-label"], sd = {
  key: 0,
  class: "dc-space__head"
}, ad = { class: "dc-space__title dc-truncate" }, rd = ["data-dc-direction"], ld = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, od = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], id = /* @__PURE__ */ de({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = os(), s = W(null), a = m(() => U(t.node) ? t.node : null), r = m(() => $t(t.node) ? t.node : null), l = m(() => Z(t.node) ? t.node : null), i = m(
      () => r.value ? r.value.children : l.value?.frames.map((g) => g.node) ?? []
    ), o = m(() => r.value ? He(r.value) : []), u = m(
      () => (l.value?.frames ?? []).map((g, E) => ({
        held: g,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: E,
        key: C(g.node),
        path: [...t.path, E]
      })).sort((g, E) => g.key < E.key ? -1 : g.key > E.key ? 1 : 0)
    ), d = m(() => wt(t.node)), _ = m(() => n.spaceMenu(t.path)), b = m(() => t.node.headless === !0), k = m(() => l.value ? "desktop" : r.value?.direction ?? ""), $ = W(null), M = W(0);
    let y = null;
    ke(
      $,
      (g) => {
        y?.disconnect(), y = null, !(!g || typeof ResizeObserver > "u") && (M.value = g.clientWidth, y = new ResizeObserver(([E]) => {
          M.value = E?.contentRect.width ?? 0;
        }), y.observe(g));
      },
      { immediate: !0 }
    ), je(() => y?.disconnect());
    const x = m(() => {
      const g = Math.max(
        1,
        Math.floor((M.value + pt) / (An + pt))
      ), E = /* @__PURE__ */ new Map();
      let G = 0;
      for (const le of u.value)
        le.held.minimized === !0 && (E.set(le.key, {
          x: pt + G % g * (An + pt),
          bottom: pt + Math.floor(G / g) * ($a + pt)
        }), G += 1);
      return E;
    }), F = (g) => !!g && g.join("/") === t.path.join("/"), N = m(() => {
      const g = n.dropTarget.value, E = l.value;
      if (!E || !g?.rect || g.edge !== "float") return null;
      if (g.space) return F(g.space) ? g.rect : null;
      const G = $e(E, g.panel);
      return G && E.frames.includes(G) ? g.rect : null;
    }), L = m(() => {
      const g = n.dropTarget.value;
      return !!g && !g.rect && F(g.space);
    }), I = m(() => r.value?.direction === "row"), V = m(() => i.value.map((g, E) => [...t.path, E])), C = (g) => [...Xe(g)].sort().join("/"), z = (g) => {
      const E = Xe(g)[0];
      return (E ? n.panelFor(E)?.title : null) ?? E ?? "panel";
    }, X = (g) => {
      const E = i.value[g], G = i.value[g + 1];
      return !E || !G ? "Resize panels" : `Resize ${z(E)} and ${z(G)}`;
    }, ee = (g) => {
      const E = o.value[g] ?? 0, G = o.value[g + 1] ?? 0, le = E + G;
      return le > 0 ? Math.round(E / le * 100) : 50;
    };
    function re() {
      const g = s.value, E = g ? I.value ? g.clientWidth : g.clientHeight : 0;
      return E <= 0 ? 0.05 : Math.min(n.minPanelSize.value / E, 0.4);
    }
    let J = null;
    function he(g, E) {
      const G = r.value, le = s.value;
      if (!n.resizable.value || !G || !le || g.button !== 0) return;
      const _e = I.value ? le.clientWidth : le.clientHeight;
      if (_e <= 0) return;
      const Ee = I.value ? g.clientX : g.clientY, Ge = He(G), Ye = Math.min(n.minPanelSize.value / _e, 0.4);
      g.preventDefault();
      const Qe = (Ke) => {
        const Ve = ((I.value ? Ke.clientX : Ke.clientY) - Ee) / _e;
        n.setSizes(t.path, Ls(Ge, E, Ve, Ye));
      }, Ze = () => J?.(), Be = (Ke) => {
        Ke.key === "Escape" && (n.setSizes(t.path, Ge), J?.());
      };
      J = () => {
        window.removeEventListener("pointermove", Qe), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", Ze), window.removeEventListener("keydown", Be), J = null;
      }, window.addEventListener("pointermove", Qe), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", Ze), window.addEventListener("keydown", Be);
    }
    je(() => J?.());
    function O(g, E) {
      const G = r.value;
      if (!n.resizable.value || !G) return;
      const le = I.value ? "ArrowRight" : "ArrowDown", _e = I.value ? "ArrowLeft" : "ArrowUp", Ee = g.shiftKey ? 0.1 : 0.02;
      if (g.key !== le && g.key !== _e) return;
      const Ge = g.key === le ? Ee : -Ee;
      g.preventDefault(), n.setSizes(t.path, Ls(He(G), E, Ge, re()));
    }
    return (g, E) => {
      const G = Bs("WindowNode", !0);
      return a.value ? (f(), se(Na, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: Ie(({ node: le, path: _e }) => [
          me(G, {
            node: le,
            path: _e,
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
        !e.framed && !b.value ? (f(), h("header", sd, [
          w("span", ad, R(d.value), 1),
          _.value.length ? (f(), se(Yn, {
            key: 0,
            items: _.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ])) : T("", !0),
        l.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: $,
          class: "dc-window__desktop"
        }, [
          N.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${N.value.x}px`,
              top: `${N.value.y}px`,
              width: `${N.value.w}px`,
              height: `${N.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : T("", !0),
          (f(!0), h(j, null, ie(u.value, (le) => (f(), se(Tu, {
            key: le.key,
            frame: le.held,
            path: le.path,
            order: le.order,
            place: x.value.get(le.key) ?? null
          }, {
            default: Ie(() => [
              me(G, {
                node: le.held.node,
                path: le.path,
                framed: le.held.node.kind !== "group"
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
          L.value ? (f(), h("div", ld)) : T("", !0),
          (f(!0), h(j, null, ie(i.value, (le, _e) => (f(), h(j, {
            key: C(le)
          }, [
            w("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: o.value[_e] ?? 1 })
            }, [
              me(G, {
                node: le,
                path: V.value[_e] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            _e < i.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": I.value ? "vertical" : "horizontal",
              "aria-label": X(_e),
              "aria-valuenow": ee(_e),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Ee) => he(Ee, _e),
              onKeydown: (Ee) => O(Ee, _e)
            }, null, 40, od)) : T("", !0)
          ], 64))), 128))
        ], 8, rd)) : T("", !0)
      ], 8, nd));
    };
  }
}), cd = /* @__PURE__ */ fe(id, [["__scopeId", "data-v-fb5b403f"]]), ud = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], dd = {
  key: 1,
  class: "dc-window__empty"
}, fd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Jt = 16, pd = /* @__PURE__ */ de({
  __name: "WindowFrame",
  props: /* @__PURE__ */ cn({
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
  emits: /* @__PURE__ */ cn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = At(e, "layout"), l = At(e, "views"), i = Ot(), o = m(() => new Map(s.panels.map((c) => [c.id, c]))), u = m(() => s.panels.map((c) => c.id)), d = m(() => mu(r.value, u.value)), _ = W(null), b = W(null), k = W(null), $ = W(!0), M = W(null), y = W(null), x = W(null), F = W(""), N = W(null);
    function L() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function I(c) {
      const p = [];
      let v = c.closest(".dc-float");
      for (; v; )
        p.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function V() {
      return L().map((c) => ({ pane: c, order: I(c.element) })).sort((c, p) => {
        const v = Math.max(c.order.length, p.order.length);
        for (let S = 0; S < v; S += 1) {
          const A = (c.order[S] ?? -1) - (p.order[S] ?? -1);
          if (A !== 0) return A;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const C = (c) => L().find((p) => p.panels.includes(c)) ?? null;
    function z(c) {
      const p = o.value.get(c);
      if (!p) return "";
      const v = l.value[c];
      return v && p.views?.some((S) => S.key === v) ? v : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function X(c, p) {
      l.value = { ...l.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const ee = m(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function re(c) {
      return !s.movable || ee.value < 1 || s.panels.length < 2 ? !1 : o.value.get(c)?.fixed !== !0;
    }
    function J(c, p) {
      const v = d.value;
      !c || !v || c === v || (r.value = c, p && a("panel-move", p));
    }
    function he(c, p, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const S = (p - c.left) / c.width, A = (v - c.top) / c.height, D = 0.3;
      return S > D && S < 1 - D && A > D && A < 1 - D ? "center" : [
        { edge: "left", distance: S },
        { edge: "right", distance: 1 - S },
        { edge: "top", distance: A },
        { edge: "bottom", distance: 1 - A }
      ].reduce(
        (ne, K) => K.distance < ne.distance ? K : ne
      ).edge;
    }
    function O(c, p) {
      const v = [...c.querySelectorAll(".dc-tab")], S = v.findIndex((A) => {
        const D = A.getBoundingClientRect();
        return p < D.left + D.width / 2;
      });
      return S === -1 ? v.length : S;
    }
    function g(c, p, v) {
      for (const { panels: S, element: A } of V().reverse()) {
        const D = A.getBoundingClientRect();
        if (c < D.left || c > D.right || p < D.top || p > D.bottom) continue;
        const ce = S.find((Y) => Y !== v), ne = A.querySelector(".dc-pane__tabs"), K = ne?.getBoundingClientRect();
        if (ne && K && p >= K.top && p <= K.bottom)
          return ce ? { panel: ce, edge: "center", index: O(ne, c) } : null;
        const H = A.querySelector(":scope > .dc-pane__space");
        if (H) {
          const Y = H.getBoundingClientRect();
          if (c >= Y.left && c <= Y.right && p >= Y.top && p <= Y.bottom) continue;
        }
        return ce ? { panel: ce, edge: he(D, c, p) } : null;
      }
      return G(c, p, v) ?? Ee(c, p);
    }
    function E() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function G(c, p, v) {
      const S = d.value;
      if (!S) return null;
      for (const A of E()) {
        const D = A.getBoundingClientRect();
        if (c < D.left || c > D.right || p < D.top || p > D.bottom) continue;
        const ce = Ge(A), ne = ce.flatMap((oe) => oe.panels).find((oe) => oe !== v);
        if (!ne && ce.length > 0) return null;
        const K = $e(S, v)?.rect, H = kn(
          {
            x: c - D.left - 24,
            y: p - D.top - 12,
            w: K?.w ?? it.w,
            h: K?.h ?? it.h
          },
          { w: A.clientWidth, h: A.clientHeight },
          s.minPanelSize
        );
        if (ne) return { panel: ne, edge: "float", rect: H };
        const Y = le(A);
        return Y ? { panel: "", space: Y, edge: "float", rect: H } : null;
      }
      return null;
    }
    function le(c) {
      const p = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function _e() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === c).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const v = le(p);
        return v ? [{ element: p, path: v }] : [];
      }) : [];
    }
    function Ee(c, p) {
      for (const { element: v, path: S } of _e()) {
        if (v.dataset.dcSpace === "desktop") continue;
        const A = v.getBoundingClientRect();
        if (!(c < A.left || c > A.right || p < A.top || p > A.bottom))
          return { panel: "", space: S, edge: "center" };
      }
      return null;
    }
    function Ge(c) {
      return L().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let Ye = null;
    const Qe = (c) => c.altKey;
    function Ze(c, p) {
      if (!re(c) || b.value || y.value || p.button !== 0) return;
      const v = p.clientX, S = p.clientY;
      let A = !1, D = Qe(p);
      const ce = () => {
        const ue = x.value;
        ue && (k.value = D ? G(ue.x, ue.y, c) : g(ue.x, ue.y, c));
      }, ne = (ue) => {
        if (!A) {
          if (Math.hypot(ue.clientX - v, ue.clientY - S) < 4) return;
          A = !0, b.value = c, M.value = null;
        }
        D = Qe(ue), $.value = !D, x.value = { x: ue.clientX, y: ue.clientY }, ce();
      }, K = (ue) => {
        Qe(ue) !== D && (D = !D, $.value = !D, A && ce());
      }, H = (ue) => {
        Ye?.();
        const Q = k.value, Ce = d.value;
        if (ue && A && Q && Ce) {
          const Je = Q.space ? Rs(Ce, c, Q.space, Q.rect) : Q.edge === "float" && Q.rect ? zs(Ce, c, Q.panel, Q.rect) : Zt(Ce, c, Q.panel, Q.edge, Q.index);
          J(Je, {
            panel: c,
            target: Q.panel,
            edge: Q.edge,
            ...Q.space === void 0 ? {} : { space: Q.space },
            ...Q.index === void 0 ? {} : { index: Q.index },
            ...Q.rect === void 0 ? {} : { rect: Q.rect }
          });
        }
        b.value = null, k.value = null, x.value = null, $.value = !0;
      }, Y = () => H(!0), oe = () => H(!1), ve = (ue) => {
        if (ue.key === "Escape") {
          H(!1);
          return;
        }
        K(ue);
      };
      Ye = () => {
        window.removeEventListener("pointermove", ne), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", oe), window.removeEventListener("keydown", ve), window.removeEventListener("keyup", K), Ye = null;
      }, window.addEventListener("pointermove", ne), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", oe), window.addEventListener("keydown", ve), window.addEventListener("keyup", K);
    }
    je(() => Ye?.());
    let Be = null;
    function Ke(c) {
      const p = N.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((A) => A.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ve(c) {
      const p = d.value;
      return p ? Tn(p, c) : null;
    }
    function xt(c) {
      const p = d.value;
      if (!p) return;
      const v = Rt(p, c);
      v !== p && (r.value = v);
    }
    function Gt(c) {
      const p = Ve(c);
      p && xt(p);
    }
    function B(c) {
      const p = d.value, v = p ? $e(p, c) : null;
      return v !== null && et(v);
    }
    function q(c) {
      const p = d.value, v = p ? $e(p, c) : null;
      return v !== null && ot(v);
    }
    function te(c) {
      const p = d.value, v = p ? lt(p, c) : null;
      return v ? Me(v.node) : "";
    }
    function Se(c) {
      const p = d.value, v = p ? lt(p, c) : null;
      if (!p || !v) return;
      const S = Me(v.node);
      if (o.value.get(S)?.fixed === !0) return;
      const A = !ot(v);
      let D = au(p, c, A);
      D !== p && (A || (D = Rt(D, c)), r.value = D, a("frame-minimize", { panel: S, minimized: A }));
    }
    function xe(c) {
      const p = Ve(c);
      p && Se(p);
    }
    function Ct(c) {
      const p = d.value, v = p ? lt(p, c) : null;
      if (!p || !v) return;
      const S = Me(v.node);
      if (o.value.get(S)?.fixed === !0) return;
      const A = !et(v);
      let D = su(p, c, A);
      D !== p && (A && (D = Rt(D, c)), r.value = D, a("frame-maximize", { panel: S, maximized: A }));
    }
    function cs(c) {
      const p = Ve(c);
      p && Ct(p);
    }
    function us(c, p, v) {
      const S = d.value, A = S ? lt(S, c) : null;
      if (!S || !A || p.button !== 0 || b.value || y.value) return;
      const D = Me(A.node);
      if (o.value.get(D)?.fixed === !0 || et(A) || ot(A) || (v === "move" ? !s.movable : !s.resizable)) return;
      const ce = Ke(c), ne = ru(S, c);
      xt(c);
      const K = { w: ce?.clientWidth ?? 0, h: ce?.clientHeight ?? 0 }, H = { ...A.rect }, Y = p.clientX, oe = p.clientY, ve = s.minPanelSize;
      y.value = D;
      const ue = (Pe) => {
        const qe = d.value;
        if (!qe) return;
        const Mt = As(qe, ne, kn(Pe, K, ve));
        Mt !== qe && (r.value = Mt);
      }, Q = (Pe) => {
        Pe.preventDefault();
        const qe = Pe.clientX - Y, Mt = Pe.clientY - oe;
        ue(
          v === "move" ? { ...H, x: H.x + qe, y: H.y + Mt } : Ps(H, v, qe, Mt, ve)
        );
      }, Ce = (Pe) => {
        if (Be?.(), y.value = null, !Pe) {
          ue(H);
          return;
        }
        const qe = d.value ? lt(d.value, ne) : null;
        qe && a("frame-change", { panel: te(ne), rect: qe.rect });
      }, Je = () => Ce(!0), at = () => Ce(!1), rt = (Pe) => {
        Pe.key === "Escape" && Ce(!1);
      };
      Be = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", Je), window.removeEventListener("pointercancel", at), window.removeEventListener("keydown", rt), Be = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", Je), window.addEventListener("pointercancel", at), window.addEventListener("keydown", rt);
    }
    function Oa(c, p, v) {
      const S = Ve(c);
      S && us(S, p, v);
    }
    function Ba(c, p, v = !1) {
      const S = d.value, A = Ve(c), D = S && A ? lt(S, A) : null;
      if (!S || !A || !D || o.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (et(D) || ot(D)) {
        F.value = `${Fe(c)} is ${et(D) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ce = p === "left" ? -Jt : p === "right" ? Jt : 0, ne = p === "up" ? -Jt : p === "down" ? Jt : 0, K = Ke(A), H = { w: K?.clientWidth ?? 0, h: K?.clientHeight ?? 0 }, Y = v ? Ps(D.rect, "se", ce, ne, s.minPanelSize) : { ...D.rect, x: D.rect.x + ce, y: D.rect.y + ne }, oe = As(S, A, kn(Y, H, s.minPanelSize));
      if (oe === S) {
        F.value = v ? `${Fe(c)} cannot be resized further.` : `${Fe(c)} cannot move ${p}.`;
        return;
      }
      r.value = oe;
      const ve = lt(oe, A);
      ve && (a("frame-change", { panel: c, rect: ve.rect }), F.value = v ? `${Fe(c)} resized to ${ve.rect.w} by ${ve.rect.h}.` : `${Fe(c)} moved to ${ve.rect.x}, ${ve.rect.y}.`);
    }
    je(() => Be?.());
    function Ka(c, p) {
      const v = C(c), S = v?.element.getBoundingClientRect();
      if (!v || !S) return null;
      const A = p === "left" || p === "right", D = (K) => {
        if (!(A ? K.bottom > S.top + 1 && K.top < S.bottom - 1 : K.right > S.left + 1 && K.left < S.right - 1)) return null;
        const Y = p === "left" ? S.left - K.right : p === "right" ? K.left - S.right : p === "up" ? S.top - K.bottom : K.top - S.bottom;
        return Y < -1 ? null : Y;
      }, ce = [];
      for (const K of L()) {
        if (K === v || K.element === v.element) continue;
        const H = D(K.element.getBoundingClientRect());
        if (H === null) continue;
        const Y = K.panels.find((oe) => oe !== c);
        Y && ce.push({ to: { panel: Y }, distance: H });
      }
      for (const { element: K, path: H } of _e()) {
        const Y = D(K.getBoundingClientRect());
        Y !== null && ce.push({ to: { space: H }, distance: Y });
      }
      return ce.reduce(
        (K, H) => K && K.distance <= H.distance ? K : H,
        null
      )?.to ?? null;
    }
    function Va(c) {
      const p = d.value ? $e(d.value, c) !== null : !1;
      if (!p && !re(c)) return;
      M.value = M.value === c ? null : c;
      const v = Fe(c);
      if (!M.value) {
        F.value = `${v}: move mode off.`;
        return;
      }
      F.value = p ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Fe = (c) => o.value.get(c)?.title ?? c, qa = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Wa(c, p, v = !1) {
      if (!re(c)) return;
      const S = d.value;
      if (!S) return;
      const A = Fe(c), D = mt(S, c);
      if (!v && D && (p === "left" || p === "right") && D.panels.length > 1) {
        const oe = D.panels.indexOf(c), ve = p === "left" ? oe - 1 : oe + 1;
        if (ve >= 0 && ve < D.panels.length) {
          J(Tt(S, c, ve), { panel: c, target: c, edge: "center", index: ve }), F.value = `${A} moved ${p}, now tab ${ve + 1} of ${D.panels.length}.`, mn(c);
          return;
        }
      }
      const ne = Ka(c, p);
      if (!ne || ne.panel !== void 0 && !re(ne.panel)) {
        F.value = `${A} cannot move ${p}.`;
        return;
      }
      const K = qa[p];
      if (ne.space) {
        const oe = ne.space, ve = nt(S, oe), ue = $e(S, c)?.rect, Q = { ...it, ...ue ? { w: ue.w, h: ue.h } : {} };
        J(Rs(S, c, oe, Q), { panel: c, target: "", space: oe, edge: K }), F.value = `${A} moved ${p}, into ${ve ? wt(ve) : "the space"}.`, mn(c);
        return;
      }
      const H = ne.panel, Y = D?.panels.length === 1 && mt(S, H)?.panels.length === 1;
      v ? (J(Zt(S, c, H, "center"), {
        panel: c,
        target: H,
        edge: "center"
      }), F.value = `${A} joined ${Fe(H)} as a tab.`) : Y ? (J(rn(S, c, H), { panel: c, target: H, edge: K }), F.value = `${A} moved ${p}, trading places with ${Fe(H)}.`) : (J(Zt(S, c, H, K), { panel: c, target: H, edge: K }), F.value = `${A} moved ${p}, beside ${Fe(H)}.`), mn(c);
    }
    function mn(c) {
      Dt(() => {
        C(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Ua(c, p) {
      const v = d.value;
      v && (r.value = ln(v, c, p));
    }
    function hn(c) {
      const p = d.value;
      if (!p) return;
      const v = _t(p, c);
      v !== p && (r.value = v, a("tab-select", { panel: c }));
    }
    function ds(c) {
      return o.value.get(c)?.closable ?? s.closable;
    }
    function Ha(c) {
      ds(c) && a("panel-close", c);
    }
    const _n = W(/* @__PURE__ */ new Map());
    let ja = 0;
    function Xa(c, p) {
      const v = ja += 1;
      return _n.value.set(v, { panel: c, items: p }), () => {
        _n.value.delete(v);
      };
    }
    function Ga(c) {
      const p = [];
      for (const v of _n.value.values())
        v.panel() === c && p.push(...v.items());
      return p;
    }
    function fs(c) {
      const p = c.filter((v) => v.items.length > 0);
      return p.length < 2 ? p.flatMap((v) => v.items) : p.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const ps = (c) => c.title || "These tabs";
    function Ya(c, p) {
      const v = p.id, S = mt(c, v), A = (S?.panels.length ?? 0) > 1, D = S?.fixedView === !0, ce = (Y) => ({
        action: () => {
          Y !== c && (r.value = Y);
        }
      }), ne = [], K = [], H = p.views ?? [];
      if (H.length > 1 && !D) {
        const Y = z(v);
        ne.push({
          id: "view",
          label: "View",
          items: H.map((oe) => ({
            id: `view-${oe.key}`,
            label: oe.label,
            checked: oe.key === Y,
            action: () => X(v, oe.key)
          }))
        });
      }
      return A && !D && K.push(
        { id: "show-row", label: "Row", checked: !1, ...ce(Ts(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ce(Ts(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ce(cu(c, v))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ce(uu(c, v))
        }
      ), A && S && (K.length && K.push({ separator: !0 }), K.push(...vs(S, v))), { panel: ne, tabs: K, tabsTitle: S ? ps(S) : "" };
    }
    function vs(c, p) {
      const v = ft(c), S = (A) => {
        const D = c.panels[(v + A + c.panels.length) % c.panels.length];
        return (D === void 0 ? "" : Me(D)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => hn(S(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => hn(S(-1)) }
      ];
    }
    function Yt(c) {
      return c.title ? c.title : U(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : wt(c);
    }
    function ms(c) {
      if (!c || Z(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Le(c)) return null;
      const p = Ia(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function Qa(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const v = nt(p, c);
      if (!v || U(v)) return [];
      if (v.fixedView) return [];
      const S = Z(v) ? "desktop" : v.direction, A = (Q, Ce, Je) => ({
        id: `show-${Q}`,
        label: Ce,
        checked: S === Q,
        action: () => {
          const at = d.value, rt = Je();
          !at || rt === v || (r.value = fn(we(ut(at, c, rt))));
        }
      }), D = () => {
        const Q = Ta(v, Za(v));
        if (U(Q) && Q.panels.length === 0) return v;
        const Ce = U(Q) && Q.panels.length === 1 ? Q.panels[0] : void 0;
        return Ce !== void 0 && pe(Ce) ? v : Q;
      }, ce = (Q) => () => Z(v) ? Da(v, Q) : v.direction === Q ? v : { ...v, direction: Q }, ne = c.slice(0, -1), K = c.length > 0 ? nt(p, ne) : null, H = K && U(K) && K.panels.length > 1 ? K : null, Y = K && ms(K) === v ? K : null, oe = ms(v), ve = v.title || "this space", ue = (Q, Ce, Je, at, rt) => ({
        id: Q,
        label: rt,
        action: () => {
          const Pe = d.value;
          Pe && (r.value = fn(we(ut(Pe, Ce, pu(Je, at)))));
        }
      });
      return fs([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            A("row", "Row", ce("row")),
            A("column", "Column", ce("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            A("tabs", "Tabs", () => D()),
            A("desktop", "Desktop", () => Z(v) ? v : Fa(v))
          ]
        },
        {
          id: "about-around",
          title: oe ? `Around ${Yt(oe)}` : "",
          items: oe ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...oe.title ? [] : [ue("merge-around-keep-this", c, v, "outer", `Keep ${ve}`)],
            ...v.title ? [] : [ue("merge-around-keep-that", c, v, "inner", `Keep ${Yt(oe)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Y ? `Inside ${Yt(Y)}` : "",
          items: Y ? [
            ...v.title ? [] : [ue("merge-inside-keep-that", ne, Y, "outer", `Keep ${Yt(Y)}`)],
            ...Y.title ? [] : [ue("merge-inside-keep-this", ne, Y, "inner", `Keep ${ve}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: H ? ps(H) : "",
          items: H ? vs(H, Me(v)) : []
        }
      ]);
    }
    function Za(c) {
      const p = _.value;
      return p && ae(c, p) ? p : void 0;
    }
    function Ja(c) {
      const p = d.value, v = o.value.get(c);
      if (!p || !v) return [];
      const S = s.menu ? Ya(p, v) : null, A = Ga(c);
      A.length && S?.panel.length && A.push({ separator: !0 }), S && A.push(...S.panel);
      const D = fs([
        { id: "about-panel", title: v.title, items: A },
        { id: "about-tabs", title: S?.tabsTitle ?? "", items: S?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, D) : D;
    }
    function er(c, p) {
      return i[`${c}-${p}`] ?? i[c];
    }
    function hs(c, p, v, S) {
      return er(c, p.id)?.({ panel: p, view: v, active: S });
    }
    hu({
      panelFor: (c) => o.value.get(c) ?? null,
      viewFor: z,
      setView: X,
      movable: m(() => s.movable),
      resizable: m(() => s.resizable),
      minPanelSize: m(() => s.minPanelSize),
      spaceNames: m(() => s.spaceNames),
      focused: _,
      dragging: b,
      dropTarget: k,
      moving: M,
      framing: y,
      canMove: re,
      focus(c) {
        _.value !== c && (_.value = c, a("panel-activate", c));
      },
      selectPanel: hn,
      beginDrag: Ze,
      toggleMoveMode: Va,
      nudge: Wa,
      setSizes: Ua,
      frameOf: (c) => d.value ? $e(d.value, c) : null,
      beginFrameDrag: Oa,
      nudgeFrame: Ba,
      raise: Gt,
      maximized: B,
      toggleMaximize: cs,
      minimized: q,
      toggleMinimize: xe,
      beginFrameDragAt: us,
      raiseAt: xt,
      toggleMaximizeAt: Ct,
      toggleMinimizeAt: Se,
      menuFor: Ja,
      spaceMenu: Qa,
      registerMenu: Xa,
      closable: ds,
      close: Ha,
      renderContent: (c, p, v) => hs("panel", c, p, v),
      renderActions: (c, p, v) => hs("actions", c, p, v),
      layout: d
    });
    const tr = m(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), nr = () => {
      const c = b.value, p = x.value;
      return !c || !p ? null : or(
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
      move(c, p, v, S) {
        const A = d.value;
        A && J(Zt(A, c, p, v, S), {
          panel: c,
          target: p,
          edge: v,
          ...S === void 0 ? {} : { index: S }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (r.value = _t(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, v) {
        const S = d.value;
        S && J(zs(S, c, p, v), {
          panel: c,
          target: p,
          edge: "float",
          rect: v
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, p) {
        const v = d.value;
        if (!v) return;
        const S = eu(v, c, p);
        if (S === v) return;
        r.value = S;
        const A = $e(S, c);
        A && a("frame-change", { panel: c, rect: A.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: X,
      /** Brings a floating frame to the front of its stack. */
      raise: Gt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: cs,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: xe
    }), (c, p) => (f(), h("div", {
      ref_key: "root",
      ref: N,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": b.value ? "true" : "false",
      "data-dc-docking": $.value ? "true" : "false",
      style: Re(tr.value)
    }, [
      d.value ? (f(), se(cd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", dd, " This window has no panels. ")),
      me(nr),
      w("p", fd, R(F.value), 1)
    ], 12, ud));
  }
}), vd = /* @__PURE__ */ fe(pd, [["__scopeId", "data-v-711565af"]]);
function Ld(e = "", t = "/") {
  const n = W(Ue(e)), s = W(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = Ue(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = Ue(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Ds(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Ue(s === -1 ? n : n.slice(0, s));
}
function Fd(e) {
  const t = W(Ds(e.currentRoute.value.fullPath)), n = m(() => e.currentRoute.value.path), s = ke(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Ds(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${Ue(a)}`),
    replace: (a) => e.replace(`${n.value}${Ue(a)}`),
    dispose: s
  };
}
const md = {
  DataShell: bc,
  ShellHeader: ca,
  QueryPanel: da,
  RecordActions: fa,
  ResultsArea: wa,
  FacetControl: ua,
  SegmentedControl: Lc,
  StatusPill: Vt,
  WindowFrame: vd,
  WindowPane: Na,
  ListView: Pn,
  CardsView: va,
  GridView: ma,
  TableView: ga,
  LinksView: ha,
  PreviewView: _a,
  TypeCardsView: ya
}, Dd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(md))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ks, t.route);
  }
};
export {
  dn as CASCADE_STEP,
  yd as COLUMN_BREAKPOINTS,
  gd as COLUMN_ROLES,
  va as CardsView,
  Ss as ColumnCell,
  it as DEFAULT_FRAME,
  Cn as DEFAULT_SORT,
  cr as DEFAULT_VIEW,
  bc as DataShell,
  Mn as EMPTY_CELL,
  ra as ENTITY_ALL,
  un as ENTITY_TERM,
  Nt as EXPRESSION_TERM,
  Hn as FACET_PREFIX,
  ua as FacetControl,
  ma as GridView,
  Dd as HeaderContentLayoutPlugin,
  ha as LinksView,
  Pn as ListView,
  pt as MINIMIZED_GAP,
  $a as MINIMIZED_HEIGHT,
  An as MINIMIZED_WIDTH,
  ba as MIN_FRAME,
  xs as MOCK_TINTS,
  bd as MenuBar,
  Yn as MenuButton,
  ka as MenuList,
  qt as MetricDrill,
  is as PANE_CONTEXT_KEY,
  qn as PARAM_DIR,
  Bn as PARAM_ENTITY,
  Wn as PARAM_EXPR,
  Un as PARAM_PAGE,
  Vn as PARAM_SORT,
  Kn as PARAM_VIEW,
  Xn as PinStar,
  _a as PreviewView,
  da as QueryPanel,
  Qt as RECORD_STATUSES,
  Ys as RESULT_FIELDS,
  Ks as ROUTE_ADAPTER_KEY,
  fa as RecordActions,
  wa as ResultsArea,
  aa as SHELL_CONTEXT_KEY,
  _d as SHELL_THEMES,
  Wt as ScopeMark,
  Lc as SegmentedControl,
  bt as SelectTick,
  kd as ShellCard,
  ca as ShellHeader,
  Vt as StatusPill,
  ga as TableView,
  ya as TypeCardsView,
  Vs as VIEW_KINDS,
  ur as VIEW_LABELS,
  ls as WINDOW_CONTEXT_KEY,
  vd as WindowFrame,
  Na as WindowPane,
  Ca as activePanel,
  ft as activeTab,
  Ur as addTerm,
  ta as andExpression,
  Zc as axisOf,
  Jn as cascade,
  Js as cellFull,
  Bt as cellText,
  nn as cellTextOf,
  ze as cellValue,
  _s as changesResults,
  kn as clampRect,
  Ta as collapseSpace,
  cu as collapseToTabs,
  xd as column,
  ys as columnAlign,
  ws as columnClass,
  gs as columnKey,
  Sn as columnTruncates,
  _r as columnsFor,
  fr as countPages,
  ir as createHistoryAdapter,
  Ld as createMemoryAdapter,
  Vr as createMockDataSource,
  Fd as createVueRouterAdapter,
  wr as defaultCellText,
  Fs as defaultLayout,
  On as defaultQuery,
  Hr as drillExpression,
  Rs as dropIntoSpace,
  It as emptyFacetState,
  Dn as emptyFacetValue,
  vt as findEntity,
  tt as findSort,
  Md as fixedView,
  Zn as float,
  zs as floatPanel,
  Fa as floatSplit,
  uu as floatTabs,
  tn as fnv1a,
  Us as focusEntity,
  vr as formatCount,
  mr as formatDate,
  sn as formatExpression,
  pr as formatMetric,
  hr as formatOrdinal,
  Kt as formatTerm,
  pn as frame,
  lt as frameAt,
  $e as frameOf,
  Tn as framePathOf,
  Me as frontPanel,
  Or as generateRows,
  $d as group,
  mt as groupOf,
  Jc as groups,
  Gs as hasActiveFacets,
  ae as hasPanel,
  Cd as headless,
  Et as insertPanel,
  zt as isChoosable,
  wd as isEntityScoped,
  Xs as isFacetActive,
  Z as isFloat,
  U as isGroup,
  et as isMaximized,
  ot as isMinimized,
  pe as isPanelTab,
  In as isPristineQuery,
  $t as isSplit,
  Ae as isTabOf,
  Nn as isTypeCardsQuery,
  qs as isViewKind,
  bs as joinExpression,
  Pr as matchesExpression,
  Br as matchesFacets,
  tu as maximizeFrame,
  su as maximizeFrameAt,
  pu as mergeSpace,
  nu as minimizeFrame,
  au as minimizeFrameAt,
  Zt as movePanel,
  Tt as moveTab,
  nt as nodeAt,
  Lt as nodeTitle,
  we as normalizeLayout,
  Ue as normalizeSearch,
  as as normalizeSizes,
  Ia as onlySpace,
  Xe as panelIds,
  Oe as panelNode,
  Es as panelTabs,
  st as parseExpression,
  el as parseQuery,
  go as presentParts,
  pa as presentRow,
  Lu as providePaneContext,
  Xr as provideShellContext,
  hu as provideWindowContext,
  bn as raiseFrame,
  Rt as raiseFrameAt,
  ru as raisedPath,
  Qs as reconcileFacets,
  mu as reconcileLayout,
  sa as recordTerm,
  ct as removePanel,
  ut as replaceAt,
  Ps as resizeRect,
  Ls as resizeSplit,
  Ws as resolveView,
  Te as roleColumn,
  Zs as roleColumns,
  fn as rootSpace,
  ts as row,
  yr as rowKey,
  ea as sameTerm,
  qr as scopeTerm,
  Wr as scopeTermFor,
  jr as scopedEntity,
  Ms as serializeQuery,
  _t as setActivePanel,
  eu as setFrameRect,
  As as setFrameRectAt,
  ln as setSizesAt,
  Pd as setSplitDirection,
  He as sizesOf,
  js as sortsFor,
  ge as spaceChrome,
  wt as spaceTitle,
  es as split,
  zr as splitExpression,
  Ts as spreadTabs,
  nl as summarizeQuery,
  jn as summaryTerms,
  rn as swapPanels,
  Qn as tabNode,
  Ht as tabPanels,
  Da as tileFloat,
  Ad as toFloat,
  zd as toTiled,
  Sd as toggleMaximized,
  Ed as toggleMinimized,
  Ai as useColumns,
  Ui as useEntityPreviews,
  Rd as usePaneContext,
  Td as usePaneMenu,
  kt as usePresentedRows,
  sl as useQueryState,
  ol as useRecordNames,
  al as useResults,
  be as useShellContext,
  os as useWindowContext,
  Ar as withoutTerm
};
