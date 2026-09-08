import { ref as W, inject as _t, provide as Rn, computed as m, toValue as St, shallowRef as Ft, watch as ke, onScopeDispose as Ls, defineComponent as de, onBeforeUnmount as He, openBlock as p, createElementBlock as h, createElementVNode as _, toDisplayString as z, unref as P, Fragment as ee, renderList as ue, createCommentVNode as D, renderSlot as qe, withDirectives as kn, withKeys as Pt, withModifiers as Fe, vModelText as wn, useSlots as Tn, nextTick as Dt, createBlock as se, createTextVNode as De, createVNode as he, withCtx as gt, normalizeStyle as Re, resolveDynamicComponent as Fs, normalizeClass as an, useModel as At, useId as Ds, createSlots as ps, mergeModels as ln, onMounted as el, resolveComponent as Is, getCurrentScope as tl, h as nl } from "vue";
const Ns = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function sl() {
  const e = typeof window < "u", t = W(e ? We(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), s = () => {
    t.value = We(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (l, r) => {
    const o = We(l);
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
const Os = ["list", "cards", "grid", "table", "links", "preview"], ad = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Yt = ["ok", "running", "queued", "review", "failed"], ld = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], rd = [480, 620, 760, 900, 1100], al = "cards", bn = "updated";
function Ks(e) {
  return typeof e == "string" && Os.includes(e);
}
const ll = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Vs(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Bs(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function qs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Ws(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of qs(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const rl = { key: bn, label: bn };
function et(e, t, n = null) {
  const s = Ws(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === bn) ?? s[0] ?? rl;
}
function Ln(e) {
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
  for (const n of e?.facets ?? []) t[n.key] = Ln(n);
  return t;
}
function Us(e) {
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
function Hs(e) {
  return Object.values(e).some(Us);
}
function Fn(e) {
  return e.entity === null && e.expr.trim() === "" && !Hs(e.facets);
}
function od(e) {
  return e.entity !== null;
}
function Dn(e) {
  return e.entity === null && e.view === "cards";
}
function ol(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function In(e, t = {}) {
  const s = t.landing === "entity" ? Bs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Ks(t.view) ? t.view : al,
    sort: et(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: It(s),
    page: 1
  };
}
const js = ["entity", "sort", "dir", "expr", "facets"];
function vs(e) {
  return js.some((t) => t in e);
}
function Xs(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Ln(s);
  }
  return n;
}
function Jt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function il(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function cl(e) {
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
function ze(e, t) {
  return e.find((n) => n.role === t);
}
function Gs(e, t) {
  return e.filter((n) => n.role === t);
}
function fl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const pl = ["id", "entityKey", "entityLabel"];
function Ae(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (pl.includes(n))
      return t[n];
  }
}
function ms(e, t) {
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
    return Number.isFinite(n) ? il(n) : String(e);
  }
  return t === "date" ? ul(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : $n : String(e);
}
function Ot(e, t) {
  const n = Ae(e, t);
  return e.format ? e.format(n, t) : ml(n, e.kind);
}
function hl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Ys(e, t) {
  const n = Ot(e, t), s = hl(Ae(e, t));
  return s && s !== n ? s : n;
}
function en(e, t) {
  return e ? Ot(e, t) : "";
}
function hs(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const _l = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function _s(e) {
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
const mn = (e) => e.toLowerCase().replace(/\s+/g, ""), kl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function wl(e, t, n) {
  const s = mn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && mn(u.label) === s
  );
  if (l) return Ae(l, t);
  const r = n.facets.find((u) => mn(u.label) === s);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = kl.find(([u]) => u === s)?.[1];
  if (o) {
    const u = ze(a, o);
    if (u) return Ae(u, t);
  }
  const i = /^metric(\d+)$/.exec(s);
  if (i) {
    const u = Gs(a, "metric")[Number(i[1]) - 1];
    if (u) return Ae(u, t);
  }
}
function hn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function bl(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = ze(r, o), u = i ? Ae(i, t) : void 0;
      return typeof u == "string" && hn(u, e.value);
    });
  }
  const s = wl(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((o) => hn(String(o), e.value)) : !0;
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
  return e.length ? e.some((s) => s.every((a) => bl(a, t, n))) : !0;
}
function gs(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Kt(e) {
  return e.kind === "text" ? gs(e.value) : `${e.field}${e.comparator}${gs(e.value)}`;
}
function Cl(e) {
  return e.filter((t) => t.length).map((t) => t.map(Kt).join(" ")).join(" OR ");
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
    text: n.filter((s) => s.kind === "text").map(Kt).join(" ")
  };
}
function ys(e, t) {
  return [...e.map(Kt), t.trim()].filter(Boolean).join(" ");
}
const ks = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Qs(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const El = 7, Pl = 3;
function Al(e, t, n, s) {
  const a = (t * El + Jt(n)) % s, l = [];
  for (let r = 0; r < Math.min(Pl, s); r++)
    l.push(Qs(e, (a + r) % s));
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
      return ks[n % ks.length];
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
  const o = [];
  for (let i = 0; i < n; i++) {
    const u = l[i % l.length], f = Math.floor(i / l.length), w = Jt(`${s}:${e.key}:${u[0]}:${i}`), k = Qs(e.key, i), g = new Date(a.getTime() - w % 900 * 36e5).toISOString(), b = {};
    for (const y of e.columns ?? []) {
      const $ = y.field ?? y.key;
      if (!$ || y.value) continue;
      const C = Tl(y, {
        hash: Jt(`${w}:${$}`),
        sample: u,
        revision: f,
        updatedAt: g
      });
      C !== void 0 && (b[$] = C);
    }
    for (const y of e.facets)
      b[y.key] = zl(y, Jt(`${w}:${y.key}`));
    for (const [y, $] of r)
      b[y] = $ === e.key ? k : Al($, i, y, n);
    o.push({ id: k, entityKey: e.key, entityLabel: e.label, fields: b });
  }
  return o;
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
  return (r, o) => {
    const i = Ae(n, r), u = Ae(n, o);
    return a ? Number(u ?? 0) - Number(i ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(i ?? "")) : String(u ?? "").localeCompare(String(i ?? ""));
  };
}
function Il(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const r = e.scopes ?? a.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = Ll(s, { ...e, scopes: r });
    return t.set(s.key, o), o;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: r, offset: o }) {
      const i = yt(s.expr), u = l ? [l] : a.entities, f = [], w = [];
      for (const b of u)
        for (const y of n(b, a))
          f.push(y), (l ? Fl(y, s.facets) : !0) && xl(i, y, b) && w.push(y);
      const k = et(l, s.sort, a), g = w.sort(Dl(qs(l, a), k.key));
      return s.dir === "asc" && g.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: g.slice(o, o + r),
        total: w.length,
        unfiltered: w.length === f.length
      };
    }
  };
}
function Nl(e, t) {
  return Zs(e, t.id);
}
function Zs(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Ol(e, t) {
  return Nl(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
const ws = (e, t) => e.toLowerCase() === t.toLowerCase();
function Kl(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && ws(e.value, t.value) : t.kind === "text" && ws(e.value, t.value);
}
function Vl(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = yt(t).flat();
  return s ? yt(n).some(
    (l) => l.some((r) => Kl(r, s))
  ) ? n : `${n} ${t}` : n;
}
function Bl(e, t, n) {
  return Vl(t.expr, Ol(e, n));
}
function ql(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const Js = Symbol("dc.shellContext");
function Wl(e) {
  return Rn(Js, e), e;
}
function we() {
  const e = _t(Js, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Nn = "e", On = "v", Kn = "s", Vn = "d", Bn = "q", qn = "p", Wn = "f_", ea = "*", Ul = [
  Nn,
  On,
  Kn,
  Vn,
  Bn,
  qn
], Cn = "..", ta = ",", Hl = [
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
function na(e) {
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
  return Ul.includes(e) || e.startsWith(Wn);
}
function bs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Xl(e, t) {
  const n = Be(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(ta).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => s.has(l)) };
    }
    case "range": {
      const s = n.indexOf(Cn), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + Cn.length)).trim(), r = a === "" ? null : Number(a), o = l === "" ? null : Number(l);
      let i = r !== null && Number.isFinite(r) ? bs(r, e.min, e.max) : null, u = o !== null && Number.isFinite(o) ? bs(o, e.min, e.max) : null;
      return i !== null && u !== null && i > u && ([i, u] = [u, i]), { kind: "range", min: i, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Gl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(ta) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Cn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Yl(e, t, n = {}) {
  const s = In(t, n), a = new Map(na(e)), l = a.get(Nn), r = l === void 0 ? s.entity : Be(l), o = r === ea ? null : ft(t, r), i = a.get(On), u = i && Ks(Be(i)) ? Be(i) : s.view, f = a.get(Kn), w = et(o, f ? Be(f) : n.sort, t), k = a.get(Vn), g = k ? Be(k) === "asc" ? "asc" : "desc" : s.dir, b = a.get(Bn), y = a.get(qn), $ = y === void 0 ? 1 : Number(Be(y)), C = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1, T = {};
  for (const I of o?.facets ?? []) {
    const L = a.get(`${Wn}${I.key}`);
    T[I.key] = L === void 0 ? Ln(I) : Xl(I, L);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: w.key,
    dir: g,
    expr: b === void 0 ? "" : Be(b),
    facets: Xs(o, T),
    page: C
  };
}
function $s(e, t, n = {}, s = "") {
  const a = In(t, n), l = ft(t, e.entity), r = na(s).filter(([w]) => !jl(w)), o = [], i = (w, k) => o.push([w, _n(k)]), u = l?.key ?? null;
  u !== a.entity && i(Nn, u ?? ea), e.view !== a.view && i(On, e.view), e.sort !== a.sort && i(Kn, e.sort), e.dir !== a.dir && i(Vn, e.dir), e.expr.trim() !== "" && i(Bn, e.expr);
  for (const w of l?.facets ?? []) {
    const k = e.facets[w.key];
    if (!k) continue;
    const g = Gl(k, w);
    g !== null && o.push([`${Wn}${w.key}`, _n(g)]);
  }
  e.page > 1 && i(qn, String(e.page));
  const f = [
    ...r.map(([w, k]) => [_n(w), k]),
    ...o
  ];
  return f.length ? `?${f.map(([w, k]) => k === "" ? w : `${w}=${k}`).join("&")}` : "";
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
function sa(e, t) {
  const n = [];
  t && n.push({
    id: rn,
    label: `entity:${t.key}`,
    facetKey: rn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Us(a) && n.push(...Ql(s, a));
  }
  return yt(e.expr).forEach((s, a) => {
    s.forEach((l, r) => {
      n.push({
        id: `${Nt}:${a}:${r}`,
        label: Kt(l),
        facetKey: Nt,
        group: a,
        index: r,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {}
      });
    });
  }), n;
}
function Zl(e, t, n = null) {
  if (Fn(e)) {
    const l = et(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = sa(e, t).filter((l) => l.facetKey !== Nt).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function Jl(e) {
  const { adapter: t } = e, n = m(() => St(e.schema)), s = m(() => St(e.defaults) ?? {}), a = m(() => Yl(t.search.value, n.value, s.value)), l = m(() => ft(n.value, a.value.entity)), r = m(() => l.value ?? Bs(n.value, s.value)), o = m(() => Ws(l.value, n.value)), i = m(() => et(l.value, a.value.sort, n.value)), u = ($, C) => {
    const T = $s($, n.value, s.value, t.search.value);
    T !== t.search.value && (C === "push" ? t.push(T) : t.replace(T));
  }, f = () => St(e.navigationMode) ?? "push", w = () => St(e.facetNavigationMode) ?? "replace", k = ($, C) => {
    const T = $.page ?? (vs($) ? 1 : a.value.page);
    u({ ...a.value, ...$, page: T }, C);
  }, g = ($, C) => {
    const T = a.value.facets[$];
    if (!T) return;
    const I = { ...a.value.facets, [$]: C(T) };
    k({ facets: I }, w());
  }, b = ($) => {
    const C = $ === null ? null : ft(n.value, $);
    return (C?.key ?? null) === a.value.entity ? {} : {
      entity: C?.key ?? null,
      sort: et(C, a.value.sort, n.value).key,
      facets: It(C)
    };
  }, y = ($) => {
    const C = b($);
    Object.keys(C).length && k(C, f());
  };
  return {
    query: a,
    entity: l,
    focus: r,
    sort: i,
    sorts: o,
    summary: m(() => Zl(a.value, l.value, n.value)),
    terms: m(() => sa(a.value, l.value)),
    isPristine: m(() => Fn(a.value)),
    isEverything: m(() => a.value.entity === null),
    hasFacets: m(() => Hs(a.value.facets)),
    setEntity: y,
    clearEntity: () => y(null),
    setView($) {
      k({ view: $ }, f());
    },
    setSort($) {
      k({ sort: et(l.value, $, n.value).key }, f());
    },
    toggleDirection() {
      k({ dir: a.value.dir === "desc" ? "asc" : "desc" }, f());
    },
    setExpression($) {
      k({ expr: $ }, f());
    },
    narrow($, C) {
      k({ expr: $, ...b(C) }, f());
    },
    setPage($, C) {
      k({ page: Math.max(1, Math.floor($)) }, C ?? f());
    },
    setFacet($, C) {
      g($, () => C);
    },
    toggleChip($, C) {
      g($, (T) => T.kind !== "chips" ? T : { kind: "chips", selected: T.selected.includes(C) ? T.selected.filter((L) => L !== C) : [...T.selected, C] });
    },
    setRange($, C, T) {
      g($, (I) => I.kind === "range" ? { kind: "range", min: C, max: T } : I);
    },
    toggleFlag($) {
      g(
        $,
        (C) => C.kind === "toggle" ? { kind: "toggle", on: !C.on } : C
      );
    },
    removeTerm($) {
      if ($.facetKey === rn) {
        y(null);
        return;
      }
      if ($.facetKey === Nt) {
        const C = Ml(yt(a.value.expr), $.group ?? 0, $.index ?? 0);
        k({ expr: Cl(C) }, f());
        return;
      }
      g($.facetKey, (C) => C.kind === "chips" && $.option ? { kind: "chips", selected: C.selected.filter((T) => T !== $.option) } : C.kind === "range" ? { kind: "range", min: null, max: null } : C.kind === "toggle" ? { kind: "toggle", on: !1 } : C);
    },
    clearFilters() {
      k({ entity: null, expr: "", facets: It(null) }, f());
    },
    reset() {
      u(In(n.value, s.value), f());
    },
    hrefFor($) {
      const C = { ...a.value, ...$ };
      return C.page = $.page ?? (vs($) ? 1 : a.value.page), C.facets = Xs(ft(n.value, C.entity), C.facets), `${t.path.value}${$s(C, n.value, s.value, t.search.value)}`;
    }
  };
}
function er(e) {
  const t = Ft([]), n = W(0), s = W(!1), a = Ft(null);
  let l = 0, r = null;
  const o = m(() => (e.query.value.page - 1) * e.limit.value), i = m(() => ol(n.value, e.limit.value)), u = (y) => {
    t.value = y.rows, n.value = y.total, a.value = null;
  }, f = (y) => {
    a.value = y, t.value = [], n.value = 0;
  }, w = (y, $) => {
    let C = !0;
    const T = () => y === l, I = () => {
      C && (C = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return T();
      },
      insert(L, K) {
        if (!T()) return;
        const V = Array.isArray(L) ? L : [L];
        if (!V.length) return;
        I();
        const S = [...t.value];
        S.splice(K ?? S.length, 0, ...V), t.value = $ > 0 ? S.slice(0, $) : S, n.value += V.length;
      },
      set(L) {
        T() && (L.rows && (I(), t.value = $ > 0 ? L.rows.slice(0, $) : L.rows, n.value = L.rows.length), L.total !== void 0 && (n.value = L.total));
      },
      close() {
        T() && (s.value = !1);
      },
      fail(L) {
        T() && (f(L), s.value = !1);
      }
    };
  }, k = () => {
    const y = r;
    r = null, y?.();
  }, g = () => {
    const y = ++l;
    k();
    const $ = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, C = e.source.value;
    if (C.stream) {
      s.value = !0;
      try {
        r = C.stream($, w(y, $.limit)) ?? null;
      } catch (I) {
        f(I), s.value = !1;
      }
      return;
    }
    let T;
    try {
      T = C.query($);
    } catch (I) {
      f(I);
      return;
    }
    if (!(T instanceof Promise)) {
      u(T), s.value = !1;
      return;
    }
    s.value = !0, T.then((I) => {
      y === l && u(I);
    }).catch((I) => {
      y === l && f(I);
    }).finally(() => {
      y === l && (s.value = !1);
    });
  }, b = m(
    () => `${JSON.stringify(js.map((y) => e.query.value[y]))}|${e.query.value.page}`
  );
  return ke([e.source, b, e.schema, e.entity, e.limit], g, {
    immediate: !0
  }), Ls(() => {
    l++, k();
  }, !0), { rows: t, total: n, offset: o, pageCount: i, pending: s, error: a, refresh: g };
}
const tr = 25, aa = (e, t) => e.toLowerCase() === t.toLowerCase();
function nr(e, t) {
  return e.find((n) => aa(n.id, t));
}
function sr(e) {
  const t = Ft(/* @__PURE__ */ new Map()), n = (r) => {
    if (r.facetKey !== Nt || !r.field || !r.value) return null;
    const o = ql(e.schema.value, r.field);
    return o ? { entity: o, id: r.value, key: `${o.key}:${r.value}` } : null;
  }, s = (r) => {
    const { entity: o, id: i } = r, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Zs(o, i) ?? "",
        facets: It(o),
        sort: et(o, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: tr,
      offset: 0
    });
  }, a = (r, o) => {
    const i = en(ze(r.columns ?? [], "identity"), o);
    return i === $n || aa(i, o.id) ? "" : i;
  }, l = () => {
    const r = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const f = n(u);
      f && !t.value.has(f.key) && r.set(f.key, f);
    }
    if (!r.size) return;
    const o = [...r.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), i = (u) => {
      const f = new Map(t.value);
      u.forEach((w, k) => {
        const { reference: g } = o[k], b = nr(w.rows, g.id);
        f.set(g.key, b ? a(g.entity, b) : "");
      }), t.value = f;
    };
    if (o.every(({ outcome: u }) => !(u instanceof Promise))) {
      i(o.map(({ outcome: u }) => u));
      return;
    }
    Promise.all(o.map(({ outcome: u }) => Promise.resolve(u))).then(i).catch(() => {
    });
  };
  return ke([e.source, e.schema, e.terms], () => {
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
const ar = ["data-dc-expanded"], lr = { class: "dc-header__domain" }, rr = ["data-dc-more", "title"], or = { class: "dc-header__pick" }, ir = { class: "dc-header__pick-box" }, cr = ["value"], ur = { value: "" }, dr = ["value"], fr = { class: "dc-header__pick" }, pr = { class: "dc-header__pick-box" }, vr = ["value"], mr = ["value"], hr = { class: "dc-header__pick" }, _r = { class: "dc-header__pick-box" }, gr = ["value"], yr = ["value"], kr = ["title", "aria-label"], wr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, br = ["title", "aria-label", "onClick"], $r = ["aria-expanded", "aria-controls"], xr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Cr = { class: "dc-header__sr" }, Mr = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Sr = ["disabled"], Er = ["title"], Pr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Ar = ["disabled"], zr = {
  key: 1,
  class: "dc-header__actions"
}, Rr = /* @__PURE__ */ de({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean },
    views: {}
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = we(), l = m(() => a.schema.value), r = m(() => a.hasFacets.value || !!a.query.value.expr.trim()), o = m(() => l.value.formatCount ?? cl);
    function i(O) {
      return O.key === a.query.value.entity && r.value && !n.hideCount ? o.value(a.total.value) : O.count;
    }
    function u(O) {
      return `${O.label} · ${i(O)}`;
    }
    const f = m(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${o.value(a.total.value)}`), w = m(
      () => (n.views ?? [...Os]).map((O) => ({ key: O, label: ll[O] }))
    ), k = m(() => Vs(a.query.value.view, n.views));
    function g(O) {
      a.setView(O.target.value);
    }
    const b = m(
      () => a.sorts.value.map((O) => ({ key: O.key, label: O.label }))
    );
    function y(O) {
      a.setSort(O.target.value);
    }
    const $ = m(() => a.query.value.dir === "desc"), C = m(
      () => a.terms.value.filter((O) => O.facetKey !== rn).map((O, E, x) => {
        const H = x[E - 1];
        return {
          term: O,
          or: H?.group !== void 0 && O.group !== void 0 && O.group !== H.group
        };
      })
    ), T = sr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      terms: a.terms
    });
    function I(O) {
      const E = T.nameOf(O);
      return E ? `${O.field}:${E} (${O.value})` : O.label;
    }
    function L(O) {
      const E = O.target.value;
      a.setEntity(E || null);
    }
    function K(O) {
      O.target?.closest("button, select, label") || s("toggle");
    }
    const V = W(null), S = W("");
    function R() {
      const O = V.value;
      if (!O) {
        S.value = "";
        return;
      }
      const E = O.scrollLeft > 1, x = O.scrollWidth - O.clientWidth - O.scrollLeft > 1;
      S.value = E && x ? "both" : E ? "start" : x ? "end" : "";
    }
    let G = null;
    ke(
      V,
      (O) => {
        G?.disconnect(), G = null, R(), !(!O || typeof ResizeObserver > "u") && (G = new ResizeObserver(R), G.observe(O));
      },
      { flush: "post" }
    ), ke(C, R, { flush: "post" }), He(() => G?.disconnect());
    const J = m(() => a.query.value.page), ve = m(
      () => a.pageCount.value > 1 && !Dn(a.query.value)
    ), j = m(() => {
      const O = `Page ${J.value} of ${a.pageCount.value}`, E = a.rows.value.length;
      if (!E) return O;
      const x = a.offset.value + 1;
      return `${O} — rows ${x} to ${x + E - 1} of ${a.total.value}`;
    });
    return (O, E) => (p(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      _("div", {
        class: "dc-header__trigger",
        onClick: K
      }, [
        E[10] || (E[10] = _("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        _("span", lr, z(l.value.label), 1),
        _("div", {
          ref_key: "termBar",
          ref: V,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": S.value,
          title: P(a).summary.value,
          onScroll: R
        }, [
          _("label", or, [
            E[5] || (E[5] = _("span", { class: "dc-header__sr" }, "Type", -1)),
            _("span", ir, [
              _("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: P(a).query.value.entity ?? "",
                onChange: L
              }, [
                _("option", ur, z(f.value), 1),
                (p(!0), h(ee, null, ue(P(a).entities.value, (x) => (p(), h("option", {
                  key: x.key,
                  value: x.key
                }, z(u(x)), 9, dr))), 128))
              ], 40, cr),
              E[4] || (E[4] = _("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          _("label", fr, [
            E[7] || (E[7] = _("span", { class: "dc-header__sr" }, "View", -1)),
            _("span", pr, [
              _("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: k.value,
                onChange: g
              }, [
                (p(!0), h(ee, null, ue(w.value, (x) => (p(), h("option", {
                  key: x.key,
                  value: x.key
                }, z(x.label), 9, mr))), 128))
              ], 40, vr),
              E[6] || (E[6] = _("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          b.value.length ? (p(), h(ee, { key: 0 }, [
            _("label", hr, [
              E[9] || (E[9] = _("span", { class: "dc-header__sr" }, "Sort", -1)),
              _("span", _r, [
                _("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: P(a).sort.value.key,
                  onChange: y
                }, [
                  (p(!0), h(ee, null, ue(b.value, (x) => (p(), h("option", {
                    key: x.key,
                    value: x.key
                  }, z(x.label), 9, yr))), 128))
                ], 40, gr),
                E[8] || (E[8] = _("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            _("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: $.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${$.value ? "descending" : "ascending"}`,
              onClick: E[0] || (E[0] = (x) => P(a).toggleDirection())
            }, z($.value ? "↓" : "↑"), 9, kr)
          ], 64)) : D("", !0),
          (p(!0), h(ee, null, ue(C.value, (x) => (p(), h(ee, {
            key: x.term.id
          }, [
            x.or ? (p(), h("span", wr, "or")) : D("", !0),
            _("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${I(x.term)}`,
              "aria-label": `Remove ${I(x.term)}`,
              onClick: (H) => P(a).removeTerm(x.term)
            }, z(I(x.term)), 9, br)
          ], 64))), 128))
        ], 40, rr),
        _("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: E[1] || (E[1] = (x) => s("toggle"))
        }, [
          _("span", xr, z(e.expanded ? "▲" : "▼"), 1),
          _("span", Cr, z(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, $r)
      ]),
      ve.value ? (p(), h("nav", Mr, [
        _("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: J.value <= 1,
          onClick: E[2] || (E[2] = (x) => P(a).setPage(J.value - 1))
        }, [...E[11] || (E[11] = [
          _("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Sr),
        _("span", {
          class: "dc-header__page dc-mono",
          title: j.value,
          "aria-hidden": "true"
        }, z(J.value) + " / " + z(P(a).pageCount.value), 9, Er),
        _("span", Pr, z(j.value), 1),
        _("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: J.value >= P(a).pageCount.value,
          onClick: E[3] || (E[3] = (x) => P(a).setPage(J.value + 1))
        }, [...E[12] || (E[12] = [
          _("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Ar)
      ])) : D("", !0),
      O.$slots.actions ? (p(), h("div", zr, [
        qe(O.$slots, "actions", {}, void 0, !0)
      ])) : D("", !0)
    ], 8, ar));
  }
}), pe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, la = /* @__PURE__ */ pe(Rr, [["__scopeId", "data-v-391e9173"]]), Tr = { class: "dc-facet" }, Lr = ["id"], Fr = { class: "dc-facet__body" }, Dr = ["aria-labelledby"], Ir = ["aria-pressed", "data-dc-active", "onClick"], Nr = ["aria-labelledby"], Or = ["aria-label", "placeholder", "onKeydown"], Kr = ["aria-label", "placeholder", "onKeydown"], Vr = ["aria-checked"], Br = { class: "dc-switch__text" }, qr = ["data-dc-active"], Wr = /* @__PURE__ */ de({
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
    function l(w) {
      if (n.value.kind !== "chips") return;
      const k = a.value.has(w) ? n.value.selected.filter((g) => g !== w) : [...n.value.selected, w];
      s("update", { kind: "chips", selected: k });
    }
    const r = W(""), o = W("");
    ke(
      () => n.value,
      (w) => {
        w.kind === "range" && (r.value = w.min === null ? "" : w.min, o.value = w.max === null ? "" : w.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(w) {
      if (typeof w == "number") return Number.isFinite(w) ? w : null;
      const k = w.trim();
      if (!k) return null;
      const g = Number(k);
      return Number.isFinite(g) ? g : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const w = i(r.value), k = i(o.value);
      w === n.value.min && k === n.value.max || s("update", { kind: "range", min: w, max: k });
    }
    function f() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (w, k) => (p(), h("div", Tr, [
      _("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, z(e.facet.label), 9, Lr),
      _("div", Fr, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (p(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (p(!0), h(ee, null, ue(e.facet.options, (g) => (p(), h("button", {
            key: g,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(g),
            "data-dc-active": a.value.has(g) ? "true" : "false",
            onClick: (b) => l(g)
          }, z(g), 9, Ir))), 128))
        ], 8, Dr)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          kn(_("input", {
            "onUpdate:modelValue": k[0] || (k[0] = (g) => r.value = g),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: Pt(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, Or), [
            [wn, r.value]
          ]),
          k[2] || (k[2] = _("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          kn(_("input", {
            "onUpdate:modelValue": k[1] || (k[1] = (g) => o.value = g),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: Pt(Fe(u, ["prevent"]), ["enter"])
          }, null, 40, Kr), [
            [wn, o.value]
          ])
        ], 8, Nr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: f
        }, [
          _("span", Br, z(e.facet.text), 1),
          _("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...k[3] || (k[3] = [
            _("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, qr)
        ], 8, Vr)) : D("", !0)
      ])
    ]));
  }
}), ra = /* @__PURE__ */ pe(Wr, [["__scopeId", "data-v-36d1334b"]]), Ur = ["id"], Hr = { class: "dc-panel__section dc-panel__rows" }, jr = { class: "dc-panel__row" }, Xr = ["for"], Gr = ["title", "aria-label", "onClick"], Yr = ["id", "placeholder", "onKeydown"], Qr = { class: "dc-panel__actions" }, Zr = ["disabled"], Jr = {
  key: 0,
  class: "dc-panel__section"
}, eo = /* @__PURE__ */ de({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Tn(), a = we(), l = m(() => Sl(a.query.value.expr)), r = m(() => l.value.parts.map(Kt)), o = W(l.value.text), i = W(null);
    ke(
      () => l.value.text,
      (y) => {
        o.value = y;
      }
    );
    const u = m(() => o.value !== l.value.text);
    function f() {
      u.value && a.setExpression(ys(l.value.parts, o.value)), n("close");
    }
    function w(y) {
      const { parts: $, text: C } = l.value;
      a.setExpression(ys($.filter((T, I) => I !== y), C));
    }
    function k(y) {
      const { parts: $ } = l.value;
      o.value || !$.length || (y.preventDefault(), w($.length - 1));
    }
    function g() {
      o.value = "", a.clearFilters();
    }
    function b(y, $) {
      a.setFacet(y, $);
    }
    return Dt(() => i.value?.focus()), (y, $) => (p(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: $[2] || ($[2] = Pt(Fe((C) => n("close"), ["stop"]), ["esc"]))
    }, [
      _("section", Hr, [
        _("div", jr, [
          _("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, Xr),
          _("div", {
            class: "dc-field",
            onMousedown: $[1] || ($[1] = Fe((C) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (p(!0), h(ee, null, ue(r.value, (C, T) => (p(), h("button", {
              key: `${T}:${C}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${C}`,
              "aria-label": `Remove ${C}`,
              onClick: (I) => w(T)
            }, z(C), 9, Gr))), 128)),
            kn(_("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": $[0] || ($[0] = (C) => o.value = C),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : P(a).schema.value.placeholder,
              onKeydown: [
                Pt(Fe(f, ["prevent"]), ["enter"]),
                Pt(k, ["backspace"])
              ]
            }, null, 40, Yr), [
              [wn, o.value]
            ])
          ], 32)
        ]),
        P(a).entity.value ? (p(!0), h(ee, { key: 0 }, ue(P(a).entity.value.facets, (C) => (p(), se(ra, {
          key: C.key,
          facet: C,
          value: P(a).query.value.facets[C.key],
          onUpdate: (T) => b(C.key, T)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : D("", !0),
        _("div", Qr, [
          _("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: f
          }, " Run query "),
          _("button", {
            type: "button",
            class: "dc-button",
            disabled: P(a).isPristine.value && !u.value,
            onClick: g
          }, " Reset ", 8, Zr)
        ])
      ]),
      s["panel-section"] ? (p(), h("section", Jr, [
        qe(y.$slots, "panel-section", {}, void 0, !0)
      ])) : D("", !0)
    ], 40, Ur));
  }
}), oa = /* @__PURE__ */ pe(eo, [["__scopeId", "data-v-2642c02d"]]), to = {
  key: 0,
  class: "dc-actions"
}, no = {
  key: 0,
  class: "dc-actions__select"
}, so = { class: "dc-actions__all" }, ao = ["checked", "indeterminate"], lo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, ro = { class: "dc-actions__ops" }, oo = ["disabled"], io = ["disabled"], co = /* @__PURE__ */ de({
  __name: "RecordActions",
  setup(e) {
    const t = we(), n = m(() => t.entity.value), s = m(() => !Dn(t.query.value)), a = m(() => s.value && t.selectable.value), l = m(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), r = m(() => t.selection.value.ids.length), o = m(() => t.rows.value.filter((k) => t.isSelected(k)).length), i = m(
      () => t.rows.value.length > 0 && o.value === t.rows.value.length
    ), u = m(() => o.value > 0 && !i.value), f = m(() => r.value ? `${r.value} selected` : "Select all");
    function w(k) {
      return r.value ? `${k} ${r.value}` : k;
    }
    return (k, g) => l.value ? (p(), h("div", to, [
      a.value ? (p(), h("div", no, [
        _("label", so, [
          _("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: i.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: g[0] || (g[0] = (b) => P(t).selectPage(!i.value))
          }, null, 40, ao),
          _("span", lo, z(f.value), 1)
        ]),
        r.value ? (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: g[1] || (g[1] = (b) => P(t).clearSelection())
        }, " Clear ")) : D("", !0)
      ])) : D("", !0),
      _("div", ro, [
        n.value?.create ? (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: g[2] || (g[2] = (b) => P(t).create(n.value))
        }, [
          g[5] || (g[5] = _("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          De(" " + z(n.value.create), 1)
        ])) : D("", !0),
        n.value?.duplicate ? (p(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !r.value,
          onClick: g[3] || (g[3] = (b) => P(t).duplicate())
        }, z(w(n.value.duplicate)), 9, oo)) : D("", !0),
        n.value?.delete ? (p(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !r.value,
          onClick: g[4] || (g[4] = (b) => P(t).delete())
        }, z(w(n.value.delete)), 9, io)) : D("", !0)
      ])
    ])) : D("", !0);
  }
}), ia = /* @__PURE__ */ pe(co, [["__scopeId", "data-v-ca4aca14"]]);
function uo(e, t) {
  if (!e) return null;
  const n = Ae(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function fo(e, t) {
  const n = ze(t, "state"), s = ze(t, "tint");
  return {
    identity: en(ze(t, "identity"), e),
    reference: en(ze(t, "reference"), e),
    metrics: Gs(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Ot(a, e)
    })),
    state: n ? Ae(n, e) ?? null : null,
    updated: en(ze(t, "updated"), e),
    image: uo(ze(t, "image"), e),
    tint: s ? Ae(s, e) ?? null : null
  };
}
function ca(e, t, n, s, a = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: vl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: dl(t),
    parts: fo(e, l),
    pinned: s,
    selected: a
  };
}
function wt() {
  const e = we(), t = m(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return m(
    () => e.rows.value.map(
      (n, s) => ca(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const po = ["data-dc-status"], vo = /* @__PURE__ */ de({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (p(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, z(e.status), 9, po));
  }
}), Vt = /* @__PURE__ */ pe(vo, [["__scopeId", "data-v-23e59fbf"]]), mo = ["title"], ho = { key: 1 }, _o = /* @__PURE__ */ de({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = we(), s = m(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), a = m(() => t.column.label ?? ""), l = m(() => Ot(t.column, t.entry.row));
    function r(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (o, i) => s.value ? (p(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: r
    }, [
      qe(o.$slots, "default", {}, () => [
        De(z(l.value), 1)
      ], !0)
    ], 8, mo)) : (p(), h("span", ho, [
      qe(o.$slots, "default", {}, () => [
        De(z(l.value), 1)
      ], !0)
    ]));
  }
}), Bt = /* @__PURE__ */ pe(_o, [["__scopeId", "data-v-3bd0cbdb"]]), go = ["data-dc-active", "aria-pressed", "aria-label"], yo = /* @__PURE__ */ de({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = we();
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
    }, z(e.pinned ? "★" : "☆"), 9, go));
  }
}), Un = /* @__PURE__ */ pe(yo, [["__scopeId", "data-v-ef63d763"]]), ko = ["src"], wo = /* @__PURE__ */ de({
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
    ), (s, a) => n.value ? D("", !0) : (p(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: a[0] || (a[0] = (l) => n.value = !0)
    }, null, 40, ko));
  }
}), ua = /* @__PURE__ */ pe(wo, [["__scopeId", "data-v-39293cee"]]), bo = ["title", "aria-label"], $o = /* @__PURE__ */ de({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), s = m(() => t.entry.entity?.scope ?? null);
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
    }, " → ", 8, bo)) : D("", !0);
  }
}), qt = /* @__PURE__ */ pe($o, [["__scopeId", "data-v-1d9b1a9f"]]), xo = ["checked", "aria-label"], bt = /* @__PURE__ */ de({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = we();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, l) => (p(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: s
    }, null, 8, xo));
  }
}), Co = { class: "dc-cards" }, Mo = { class: "dc-card__top dc-mono" }, So = { class: "dc-card__lead" }, Eo = {
  key: 1,
  class: "dc-card__entity"
}, Po = { class: "dc-card__top-right" }, Ao = ["onClick"], zo = { class: "dc-card__names" }, Ro = { class: "dc-card__primary" }, To = { class: "dc-card__secondary dc-mono" }, Lo = { class: "dc-card__metrics dc-mono" }, Fo = {
  key: 0,
  class: "dc-card__date"
}, Do = /* @__PURE__ */ de({
  __name: "CardsView",
  setup(e) {
    const t = we(), n = wt(), s = m(() => t.isEverything.value);
    return (a, l) => (p(), h("div", Co, [
      (p(!0), h(ee, null, ue(P(n), (r) => (p(), h("div", {
        key: r.key,
        class: "dc-card"
      }, [
        _("div", Mo, [
          _("span", So, [
            P(t).selectable.value ? (p(), se(bt, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : D("", !0),
            De(" " + z(r.ordinal) + " ", 1),
            s.value ? (p(), h("span", Eo, z(r.entityLabel), 1)) : D("", !0)
          ]),
          _("span", Po, [
            r.parts.state ? (p(), se(Vt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : D("", !0),
            he(qt, { entry: r }, null, 8, ["entry"]),
            P(t).pinnable.value ? (p(), se(Un, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : D("", !0)
          ])
        ]),
        _("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => P(t).activate(r.row)
        }, [
          r.parts.image ? (p(), se(ua, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : D("", !0),
          _("span", zo, [
            _("span", Ro, z(r.parts.identity), 1),
            _("span", To, z(r.parts.reference), 1)
          ])
        ], 8, Ao),
        _("div", Lo, [
          (p(!0), h(ee, null, ue(r.parts.metrics.slice(0, 2), (o) => (p(), se(Bt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: gt(() => [
              De(z(o.label) + " " + z(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (p(), h("span", Fo, z(r.parts.updated), 1)) : D("", !0)
        ])
      ]))), 128))
    ]));
  }
}), da = /* @__PURE__ */ pe(Do, [["__scopeId", "data-v-05d69cb4"]]), Io = { class: "dc-grid" }, No = ["onClick"], Oo = { class: "dc-tile__scrim" }, Ko = { class: "dc-tile__top dc-mono" }, Vo = { class: "dc-tile__chip" }, Bo = { class: "dc-tile__caption" }, qo = { class: "dc-tile__secondary dc-truncate" }, Wo = { class: "dc-tile__primary" }, Uo = /* @__PURE__ */ de({
  __name: "GridView",
  setup(e) {
    const t = we(), n = wt();
    return (s, a) => (p(), h("div", Io, [
      (p(!0), h(ee, null, ue(P(n), (l) => (p(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        _("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => P(t).activate(l.row)
        }, [
          l.parts.image ? (p(), se(ua, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : D("", !0),
          _("span", Oo, [
            _("span", Ko, [
              _("span", Vo, z(l.ordinal), 1)
            ]),
            _("span", Bo, [
              _("span", qo, z(l.parts.reference), 1),
              _("span", Wo, z(l.parts.identity), 1)
            ])
          ])
        ], 12, No),
        P(t).selectable.value ? (p(), se(bt, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : D("", !0)
      ]))), 128))
    ]));
  }
}), fa = /* @__PURE__ */ pe(Uo, [["__scopeId", "data-v-c9789911"]]), Ho = { class: "dc-links" }, jo = ["onClick"], Xo = { class: "dc-link__primary dc-truncate" }, Go = { class: "dc-link__secondary dc-mono dc-truncate" }, Yo = /* @__PURE__ */ de({
  __name: "LinksView",
  setup(e) {
    const t = we(), n = wt();
    return (s, a) => (p(), h("div", Ho, [
      (p(!0), h(ee, null, ue(P(n), (l) => (p(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (p(), se(bt, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : D("", !0),
        _("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => P(t).activate(l.row)
        }, [
          _("span", Xo, z(l.parts.identity), 1),
          _("span", Go, z(l.parts.reference), 1)
        ], 8, jo)
      ]))), 128))
    ]));
  }
}), pa = /* @__PURE__ */ pe(Yo, [["__scopeId", "data-v-cc3a66fa"]]), Qo = {
  class: "dc-list",
  role: "list"
}, Zo = ["onClick"], Jo = { class: "dc-list__ordinal dc-mono" }, ei = { class: "dc-list__identity" }, ti = { class: "dc-list__primary dc-truncate" }, ni = { class: "dc-list__secondary dc-mono dc-truncate" }, si = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, ai = { class: "dc-list__metrics dc-mono" }, li = { class: "dc-list__trailing" }, ri = /* @__PURE__ */ de({
  __name: "ListView",
  setup(e) {
    const t = we(), n = wt(), s = m(() => t.isEverything.value);
    return (a, l) => (p(), h("div", Qo, [
      (p(!0), h(ee, null, ue(P(n), (r) => (p(), h("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (p(), se(bt, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : D("", !0),
        _("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => P(t).activate(r.row)
        }, [
          _("span", Jo, z(r.ordinal), 1),
          _("span", ei, [
            _("span", ti, z(r.parts.identity), 1),
            _("span", ni, z(r.parts.reference), 1)
          ])
        ], 8, Zo),
        s.value ? (p(), h("span", si, z(r.entityLabel), 1)) : D("", !0),
        _("span", ai, [
          (p(!0), h(ee, null, ue(r.parts.metrics.slice(0, 2), (o) => (p(), se(Bt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        _("span", li, [
          r.parts.state ? (p(), se(Vt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : D("", !0),
          he(qt, { entry: r }, null, 8, ["entry"]),
          P(t).pinnable.value ? (p(), se(Un, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : D("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Mn = /* @__PURE__ */ pe(ri, [["__scopeId", "data-v-6c92ff27"]]), oi = { class: "dc-preview" }, ii = { class: "dc-preview__pager dc-mono" }, ci = ["disabled"], ui = { "aria-live": "polite" }, di = ["disabled"], fi = {
  key: 0,
  class: "dc-preview__card"
}, pi = { class: "dc-preview__body" }, vi = { class: "dc-preview__top" }, mi = { class: "dc-preview__badges" }, hi = { class: "dc-preview__entity dc-mono" }, _i = { class: "dc-preview__marks" }, gi = { class: "dc-preview__primary" }, yi = { class: "dc-preview__secondary dc-mono" }, ki = { class: "dc-preview__fields" }, wi = { class: "dc-preview__key" }, bi = { class: "dc-preview__value dc-mono" }, $i = /* @__PURE__ */ de({
  __name: "PreviewView",
  setup(e) {
    const t = we(), n = wt(), s = W(0);
    ke(n, (i) => {
      s.value > i.length - 1 && (s.value = Math.max(0, i.length - 1));
    });
    const a = m(() => n.value[s.value]), l = m(() => {
      const i = a.value;
      if (!i) return [];
      const u = ze(i.columns, "reference"), f = ze(i.columns, "updated");
      return [
        ...u ? [{ key: u.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((w) => ({
          key: w.label,
          value: w.text,
          column: w.column
        })),
        ...f ? [{ key: f.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), r = m(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${i}`;
    }), o = (i) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + i)));
    };
    return (i, u) => (p(), h("div", oi, [
      _("div", ii, [
        _("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => o(-1))
        }, " ‹ ", 8, ci),
        _("span", ui, z(r.value), 1),
        _("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= P(n).length - 1,
          onClick: u[1] || (u[1] = (f) => o(1))
        }, " › ", 8, di)
      ]),
      a.value ? (p(), h("div", fi, [
        _("div", {
          class: "dc-preview__media",
          style: Re({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        _("div", pi, [
          _("div", vi, [
            _("span", mi, [
              P(t).selectable.value ? (p(), se(bt, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : D("", !0),
              a.value.parts.state ? (p(), se(Vt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : D("", !0),
              _("span", hi, z(a.value.entityLabel), 1)
            ]),
            _("span", _i, [
              he(qt, { entry: a.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (p(), se(Un, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : D("", !0)
            ])
          ]),
          _("div", null, [
            _("div", gi, z(a.value.parts.identity), 1),
            _("div", yi, z(a.value.parts.reference), 1)
          ]),
          _("dl", ki, [
            (p(!0), h(ee, null, ue(l.value, (f) => (p(), h("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              _("dt", wi, z(f.key), 1),
              _("dd", bi, [
                f.column && a.value ? (p(), se(Bt, {
                  key: 0,
                  entry: a.value,
                  column: f.column
                }, null, 8, ["entry", "column"])) : (p(), h(ee, { key: 1 }, [
                  De(z(f.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          _("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (f) => P(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : D("", !0)
    ]));
  }
}), va = /* @__PURE__ */ pe($i, [["__scopeId", "data-v-a236412c"]]);
function xi() {
  const e = we();
  return m(() => fl(e.schema.value, e.entity.value));
}
const Ci = ["src", "alt"], Mi = ["title"], Si = {
  key: 5,
  class: "dc-cell__text"
}, Ei = /* @__PURE__ */ de({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), s = m(() => t.column.kind ?? "text"), a = m(() => Ae(t.column, t.entry.row)), l = m(
      () => s.value === "ordinal" ? t.entry.ordinal : Ot(t.column, t.entry.row)
    ), r = m(() => a.value), o = m(() => t.column.activate === !0 || !!t.column.click), i = m(() => xn(t.column)), u = m(() => Ys(t.column, t.entry.row));
    function f(w) {
      o.value && (w.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (w, k) => s.value === "component" && e.column.component ? (p(), se(Fs(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (p(), se(Vt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : s.value === "image" ? (p(), h("img", {
      key: 2,
      class: "dc-cell__image",
      src: String(a.value ?? ""),
      alt: e.entry.parts.identity,
      loading: "lazy",
      style: Re({ maxHeight: e.column.height }),
      onClick: f
    }, null, 12, Ci)) : e.column.drill ? (p(), se(Bt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (p(), h("button", {
      key: 4,
      type: "button",
      class: an(["dc-table__open", { "dc-truncate": i.value }]),
      title: u.value,
      onClick: f
    }, z(l.value), 11, Mi)) : (p(), h("span", Si, z(l.value), 1));
  }
}), xs = /* @__PURE__ */ pe(Ei, [["__scopeId", "data-v-4e1c37cf"]]), Pi = {
  key: 0,
  class: "dc-table__none"
}, Ai = { class: "dc-table__detail" }, zi = ["data-dc-wrap"], Ri = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Ti = ["data-dc-align", "data-dc-hide", "aria-sort"], Li = ["onClick"], Fi = ["onClick"], Di = {
  key: 0,
  class: "dc-table__pick"
}, Ii = ["data-dc-align", "data-dc-hide", "title"], Ni = {
  key: 0,
  class: "dc-table__name"
}, Oi = /* @__PURE__ */ de({
  __name: "TableView",
  setup(e) {
    const t = we(), n = wt(), s = xi(), a = m(
      () => s.value.some((k) => k.kind === "image" || k.height !== void 0)
    );
    function l(k) {
      k && (t.query.value.sort === k ? t.toggleDirection() : t.setSort(k));
    }
    const r = m(() => t.entity.value?.label ?? "The result set"), o = m(() => new Set(t.sorts.value.map((k) => k.key))), i = (k) => k.sort !== void 0 && o.value.has(k.sort), u = (k) => {
      if (i(k))
        return t.query.value.sort !== k.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function f(k) {
      return [
        _s(k),
        k.muted ? "dc-table__muted" : "",
        k.mono ? "dc-mono" : "",
        xn(k) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function w(k, g) {
      if (!(!xn(k) || k.activate || k.click))
        return Ys(k, g.row);
    }
    return (k, g) => P(s).length ? (p(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      _("thead", null, [
        _("tr", null, [
          P(t).selectable.value ? (p(), h("th", Ri, [...g[3] || (g[3] = [
            _("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : D("", !0),
          (p(!0), h(ee, null, ue(P(s), (b, y) => (p(), h("th", {
            key: P(ms)(b, y),
            scope: "col",
            class: an(P(_s)(b)),
            style: Re({ width: b.width }),
            "data-dc-align": P(hs)(b),
            "data-dc-hide": b.hideBelow,
            "aria-sort": u(b)
          }, [
            i(b) ? (p(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: ($) => l(b.sort)
            }, z(b.label), 9, Li)) : (p(), h(ee, { key: 1 }, [
              De(z(b.label), 1)
            ], 64))
          ], 14, Ti))), 128))
        ])
      ]),
      _("tbody", null, [
        (p(!0), h(ee, null, ue(P(n), (b) => (p(), h("tr", {
          key: b.key,
          class: "dc-table__row",
          onClick: (y) => P(t).activate(b.row)
        }, [
          P(t).selectable.value ? (p(), h("td", Di, [
            he(bt, {
              row: b.row,
              selected: b.selected,
              name: b.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : D("", !0),
          (p(!0), h(ee, null, ue(P(s), (y, $) => (p(), h("td", {
            key: P(ms)(y, $),
            class: an(f(y)),
            "data-dc-align": P(hs)(y),
            "data-dc-hide": y.hideBelow,
            title: w(y, b)
          }, [
            y.scope ? (p(), h("span", Ni, [
              he(xs, {
                column: y,
                entry: b
              }, null, 8, ["column", "entry"]),
              he(qt, { entry: b }, null, 8, ["entry"])
            ])) : (p(), se(xs, {
              key: 1,
              column: y,
              entry: b
            }, null, 8, ["column", "entry"]))
          ], 10, Ii))), 128))
        ], 8, Fi))), 128))
      ])
    ], 8, zi)) : (p(), h("p", Pi, [
      g[2] || (g[2] = _("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      _("span", Ai, [
        De(z(r.value) + " has no ", 1),
        g[0] || (g[0] = _("code", null, "columns", -1)),
        g[1] || (g[1] = De(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ma = /* @__PURE__ */ pe(Oi, [["__scopeId", "data-v-335f12c8"]]);
function Ki(e) {
  const t = Ft([]), n = W(!1), s = Ft(null);
  let a = 0;
  const l = (i, u, f) => ({
    entity: i,
    rows: u.rows.map(
      (w, k) => ca(w, k, i, e.isPinned(w.id))
    ),
    total: u.total,
    count: f ? i.count : String(u.total)
  }), r = () => {
    const i = ++a, u = e.query.value, f = e.schema.value, w = e.entities.value, k = e.limit.value, g = Fn(u), b = w.map((y) => ({
      entity: y,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: y.key, facets: It(y), page: 1 },
        schema: f,
        entity: y,
        limit: k,
        offset: 0
      })
    }));
    if (b.every(({ outcome: y }) => !(y instanceof Promise))) {
      t.value = b.map(
        ({ entity: y, outcome: $ }) => l(y, $, g)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(b.map(({ outcome: y }) => Promise.resolve(y))).then((y) => {
      i === a && (t.value = y.map(
        ($, C) => l(b[C].entity, $, g)
      ), s.value = null);
    }).catch((y) => {
      i === a && (s.value = y, t.value = []);
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
  return ke(
    [e.source, e.schema, e.query, e.entities, e.limit],
    o,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: o };
}
const Vi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Bi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, qi = ["data-dc-pending"], Wi = ["data-dc-empty"], Ui = ["onClick"], Hi = { class: "dc-type__name" }, ji = { class: "dc-type__count dc-mono" }, Xi = { class: "dc-type__sr" }, Gi = {
  key: 0,
  class: "dc-type__empty"
}, Yi = ["onClick"], Qi = { class: "dc-type__identity" }, Zi = { class: "dc-type__primary dc-truncate" }, Ji = { class: "dc-type__secondary dc-mono dc-truncate" }, ec = { class: "dc-type__trailing dc-mono" }, tc = { class: "dc-type__metric-value" }, nc = { class: "dc-type__metric-label" }, sc = {
  key: 0,
  class: "dc-type__date"
}, ac = ["onClick"], lc = /* @__PURE__ */ de({
  __name: "TypeCardsView",
  setup(e) {
    const t = we(), { previews: n, pending: s, error: a } = Ki({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      isPinned: (r) => t.isPinnedId(r)
    }), l = m(() => !t.isPristine.value);
    return (r, o) => P(a) ? (p(), h("p", Vi, " Could not load results: " + z(P(a) instanceof Error ? P(a).message : "the data source failed."), 1)) : !P(n).length && P(s) ? (p(), h("p", Bi, " Running query… ")) : (p(), h("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": P(s) ? "true" : "false"
    }, [
      (p(!0), h(ee, null, ue(P(n), (i) => (p(), h("section", {
        key: i.entity.key,
        class: "dc-type",
        "data-dc-empty": i.rows.length ? "false" : "true"
      }, [
        _("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => P(t).setEntity(i.entity.key)
        }, [
          _("span", Hi, z(i.entity.label), 1),
          _("span", ji, z(i.count), 1),
          o[0] || (o[0] = _("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          _("span", Xi, "Show only " + z(i.entity.label.toLowerCase()), 1)
        ], 8, Ui),
        i.rows.length ? D("", !0) : (p(), h("p", Gi, z(l.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), h(ee, null, ue(i.rows, (u) => (p(), h("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          _("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (f) => P(t).activate(u.row)
          }, [
            _("span", Qi, [
              _("span", Zi, z(u.parts.identity), 1),
              _("span", Ji, z(u.parts.reference), 1)
            ])
          ], 8, Yi),
          _("span", ec, [
            (p(!0), h(ee, null, ue(u.parts.metrics.slice(0, 1), (f) => (p(), se(Bt, {
              key: f.column.key ?? f.label,
              class: "dc-type__metric",
              entry: u,
              column: f.column
            }, {
              default: gt(() => [
                _("span", tc, z(f.text), 1),
                _("span", nc, z(f.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), h("span", sc, z(u.parts.updated), 1)) : D("", !0),
            he(qt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        i.entity.create ? (p(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => P(t).create(i.entity)
        }, [
          o[1] || (o[1] = _("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          De(" " + z(i.entity.create), 1)
        ], 8, ac)) : D("", !0)
      ], 8, Wi))), 128))
    ], 8, qi));
  }
}), ha = /* @__PURE__ */ pe(lc, [["__scopeId", "data-v-b776cfb6"]]), rc = ["data-dc-pending"], oc = {
  key: 0,
  class: "dc-results__state",
  role: "alert"
}, ic = { class: "dc-results__detail" }, cc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, uc = {
  key: 3,
  class: "dc-results__state"
}, dc = { class: "dc-results__detail" }, fc = /* @__PURE__ */ de({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = we(), s = {
      list: Mn,
      cards: da,
      grid: fa,
      table: ma,
      links: pa,
      preview: va
    }, a = m(() => Dn(n.query.value)), l = m(() => Vs(n.query.value.view, t.views)), r = m(() => s[l.value] ?? Mn), o = m(() => n.rows.value.length > 0), i = m(() => n.error.value !== null);
    return (u, f) => (p(), h("div", {
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      i.value ? (p(), h("p", oc, [
        f[1] || (f[1] = _("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        _("span", ic, z(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), se(ha, { key: 1 })) : !o.value && P(n).pending.value ? (p(), h("p", cc, [...f[2] || (f[2] = [
        _("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (p(), se(Fs(r.value), { key: 4 })) : (p(), h("div", uc, [
        f[3] || (f[3] = _("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        _("span", dc, z(P(n).summary.value), 1),
        P(n).isPristine.value ? D("", !0) : (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: f[0] || (f[0] = (w) => P(n).clearFilters())
        }, z(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, rc));
  }
}), _a = /* @__PURE__ */ pe(fc, [["__scopeId", "data-v-4b83efc2"]]), pc = ["data-dc-theme"], vc = ["data-dc-width", "data-dc-align"], mc = { class: "dc-shell__panel" }, hc = /* @__PURE__ */ de({
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
    const s = e, a = n, l = At(e, "open"), r = At(e, "pinned"), o = At(e, "selected"), i = Tn(), u = _t(Ns, null), f = s.route || u ? null : sl(), w = s.route ?? u ?? f;
    He(() => f?.dispose?.());
    const k = m(() => Il({ seed: s.schema.key })), g = m(() => s.source ?? k.value), b = Jl({
      schema: () => s.schema,
      adapter: w,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), y = er({
      source: g,
      query: b.query,
      schema: m(() => s.schema),
      entity: b.entity,
      limit: m(() => s.limit)
    });
    ke(b.query, (E) => a("query-change", E)), ke(
      [y.pageCount, y.pending, b.query],
      () => {
        if (y.pending.value) return;
        const E = y.pageCount.value;
        b.query.value.page > E && b.setPage(E, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Ds() ?? "dc-query-panel", C = W(null);
    function T() {
      l.value && (l.value = !1, Dt(() => {
        C.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const I = m(() => new Set(r.value));
    function L(E) {
      const x = new Set(I.value);
      x.has(E.id) ? x.delete(E.id) : x.add(E.id), r.value = [...x], a("toggle-pin", E);
    }
    const K = m(() => {
      if (s.selectable === !0) return !0;
      const E = b.entity.value;
      return !!(E?.duplicate || E?.delete);
    }), V = m(() => new Set(o.value));
    function S(E) {
      const x = new Set(V.value);
      x.has(E.id) ? x.delete(E.id) : x.add(E.id), o.value = [...x];
    }
    function R(E) {
      const x = new Set(V.value);
      for (const H of y.rows.value)
        E ? x.add(H.id) : x.delete(H.id);
      o.value = [...x];
    }
    function G() {
      o.value.length && (o.value = []);
    }
    const J = m(() => ({
      ids: [...o.value],
      rows: y.rows.value.filter((E) => V.value.has(E.id)),
      entity: b.entity.value
    }));
    ke(() => b.query.value.entity, G);
    function ve(E, x) {
      b.narrow(Bl(s.schema, b.query.value, E), x?.key ?? null), a("drill", E, x);
    }
    const j = Wl({
      ...b,
      schema: m(() => s.schema),
      entities: m(() => s.schema.entities),
      rows: y.rows,
      total: y.total,
      limit: m(() => s.limit),
      offset: y.offset,
      pageCount: y.pageCount,
      pending: y.pending,
      error: y.error,
      source: g,
      previewsPerType: m(() => s.previewsPerType),
      pinnable: m(() => s.pinnable === !0),
      isPinned: (E) => I.value.has(E.id),
      isPinnedId: (E) => I.value.has(E),
      togglePin: L,
      selectable: K,
      selection: J,
      isSelected: (E) => V.value.has(E.id),
      toggleSelect: S,
      selectPage: R,
      clearSelection: G,
      activate: (E) => a("activate", E),
      create: (E) => a("create", E),
      duplicate: () => a("duplicate", J.value),
      delete: () => a("delete", J.value),
      drill: ve
    }), O = m(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: T
    }), (E, x) => (p(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re(O.value)
    }, [
      _("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        he(la, {
          ref_key: "headerRef",
          ref: C,
          expanded: l.value,
          "panel-id": P($),
          views: e.views,
          onToggle: x[0] || (x[0] = (H) => l.value = !l.value)
        }, ps({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: gt(() => [
              qe(E.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views"]),
        l.value ? (p(), h(ee, { key: 0 }, [
          _("div", {
            class: "dc-shell__scrim",
            onClick: T
          }),
          _("div", mc, [
            he(oa, {
              "panel-id": P($),
              onClose: T
            }, ps({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: gt(() => [
                  qe(E.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : D("", !0)
      ], 8, vc),
      he(ia),
      qe(E.$slots, "results", {
        rows: P(j).rows.value,
        total: P(j).total.value,
        offset: P(j).offset.value,
        pageCount: P(j).pageCount.value,
        query: P(j).query.value,
        pending: P(j).pending.value
      }, () => [
        he(_a, { views: e.views }, null, 8, ["views"])
      ], !0)
    ], 12, pc));
  }
}), _c = /* @__PURE__ */ pe(hc, [["__scopeId", "data-v-3d12b4bb"]]), gc = ["aria-label"], yc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], kc = /* @__PURE__ */ de({
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
    function l(r, o) {
      const i = n.options.length;
      let u = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? u = (o + 1) % i : r.key === "ArrowLeft" || r.key === "ArrowUp" ? u = (o - 1 + i) % i : r.key === "Home" ? u = 0 : r.key === "End" && (u = i - 1), u === null) return;
      r.preventDefault();
      const f = n.options[u];
      f && (s("update:modelValue", f.key), a.value[u]?.focus());
    }
    return (r, o) => (p(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (p(!0), h(ee, null, ue(e.options, (i, u) => (p(), h("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: an(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (f) => s("update:modelValue", i.key),
        onKeydown: (f) => l(f, u)
      }, z(i.label), 43, yc))), 128))
    ], 8, gc));
  }
}), wc = /* @__PURE__ */ pe(kc, [["__scopeId", "data-v-63fb5482"]]), zt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, bc = ["aria-label"], $c = ["role", "aria-label"], xc = ["data-dc-item"], Cc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Mc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Sc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Ec = { class: "dc-menu__label dc-truncate" }, Pc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Ac = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, zc = /* @__PURE__ */ de({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = W(null), r = W([]), o = W(null), i = W(null), u = W(null), f = W(!1), w = m(
      () => s.items.flatMap((S, R) => zt(S) ? [R] : [])
    ), k = m(() => {
      const S = [{ entries: [] }];
      return s.items.forEach((R, G) => {
        R.heading ? S.push({ heading: R, entries: [] }) : S[S.length - 1]?.entries.push({ item: R, index: G });
      }), S.filter((R) => R.entries.length > 0);
    }), g = W({ x: s.at.x, y: s.at.y });
    async function b() {
      g.value = { x: s.at.x, y: s.at.y }, await Dt();
      const S = l.value?.getBoundingClientRect();
      if (!S) return;
      const R = 8;
      let G = s.at.x, J = s.at.y;
      if (G + S.width > window.innerWidth - R) {
        const ve = s.at.mirrorX === void 0 ? null : s.at.mirrorX - S.width;
        G = ve !== null && ve >= R ? ve : window.innerWidth - S.width - R;
      }
      J + S.height > window.innerHeight - R && (J = window.innerHeight - S.height - R), g.value = { x: Math.max(R, G), y: Math.max(R, J) };
    }
    const y = m(() => ({ left: `${g.value.x}px`, top: `${g.value.y}px` }));
    function $(S) {
      o.value = S, S !== null && Dt(() => r.value[S]?.focus());
    }
    function C(S, R) {
      const G = w.value;
      if (G.length === 0) return null;
      if (S === null) return R === 1 ? G[0] ?? null : G[G.length - 1] ?? null;
      const J = G.indexOf(S);
      return J === -1 ? G[0] ?? null : G[(J + R + G.length) % G.length] ?? null;
    }
    function T(S, R) {
      if (!s.items[S]?.items?.length) return;
      const J = r.value[S]?.getBoundingClientRect(), ve = l.value?.getBoundingClientRect();
      !J || !ve || (u.value = { x: ve.right - 4, y: J.top - 4, mirrorX: ve.left + 4 }, i.value = S, f.value = R);
    }
    function I(S) {
      const R = i.value;
      i.value = null, u.value = null, S && R !== null && $(R);
    }
    function L(S) {
      const R = s.items[S];
      if (!(!R || !zt(R))) {
        if (R.items?.length) {
          T(S, !0);
          return;
        }
        a("choose", R);
      }
    }
    function K(S) {
      const R = S.key;
      if (R === "Escape") {
        S.preventDefault(), S.stopPropagation(), i.value !== null ? I(!0) : a("dismiss");
        return;
      }
      if (R === "ArrowDown" || R === "ArrowUp") {
        S.preventDefault(), S.stopPropagation(), I(!1), $(C(o.value, R === "ArrowDown" ? 1 : -1));
        return;
      }
      if (R === "Home" || R === "End") {
        S.preventDefault(), S.stopPropagation(), I(!1), $(C(null, R === "Home" ? 1 : -1));
        return;
      }
      if (R === "ArrowRight") {
        const G = o.value;
        G !== null && s.items[G]?.items?.length && (S.preventDefault(), S.stopPropagation(), T(G, !0));
        return;
      }
      if (R === "ArrowLeft") {
        i.value !== null && (S.preventDefault(), S.stopPropagation(), I(!0));
        return;
      }
      if (R === "Enter" || R === " ") {
        const G = o.value;
        if (G === null) return;
        S.preventDefault(), S.stopPropagation(), L(G);
      }
    }
    function V(S) {
      const R = s.items[S];
      !R || !zt(R) || (i.value !== null && i.value !== S && I(!1), $(S), R.items?.length && T(S, !1));
    }
    return el(() => {
      b(), s.autofocus && $(C(null, 1));
    }), ke(() => s.at, b, { deep: !0 }), ke(() => s.items, () => void b(), { deep: !0 }), He(() => {
      i.value = null;
    }), t({ root: l }), (S, R) => {
      const G = Is("MenuList", !0);
      return p(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(y.value),
        onKeydown: K
      }, [
        (p(!0), h(ee, null, ue(k.value, (J, ve) => (p(), h("div", {
          key: `${ve}-${J.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: J.heading ? "group" : "none",
          "aria-label": J.heading?.label
        }, [
          J.heading ? (p(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": J.heading.id
          }, z(J.heading.label), 9, xc)) : D("", !0),
          (p(!0), h(ee, null, ue(J.entries, ({ item: j, index: O }) => (p(), h(ee, {
            key: j.id ?? `${O}-${j.label ?? ""}`
          }, [
            j.separator ? (p(), h("div", Cc)) : (p(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (E) => {
                E && (r.value[O] = E);
              },
              type: "button",
              class: "dc-menu__item",
              role: j.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": j.checked === void 0 ? void 0 : j.checked,
              "aria-haspopup": j.items?.length ? "menu" : void 0,
              "aria-expanded": j.items?.length ? i.value === O : void 0,
              "aria-disabled": j.disabled ? "true" : void 0,
              disabled: j.disabled,
              "data-dc-item": j.id,
              tabindex: "-1",
              onClick: (E) => L(O),
              onMouseenter: (E) => V(O)
            }, [
              _("span", Sc, z(j.checked ? "✓" : ""), 1),
              _("span", Ec, z(j.label), 1),
              j.shortcut ? (p(), h("span", Pc, z(j.shortcut), 1)) : j.items?.length ? (p(), h("span", Ac, "›")) : D("", !0)
            ], 40, Mc))
          ], 64))), 128))
        ], 8, $c))), 128)),
        i.value !== null && u.value ? (p(), se(G, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: u.value,
          label: e.items[i.value]?.label,
          autofocus: f.value,
          onChoose: R[0] || (R[0] = (J) => a("choose", J)),
          onDismiss: R[1] || (R[1] = (J) => I(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : D("", !0)
      ], 44, bc);
    };
  }
}), ga = /* @__PURE__ */ pe(zc, [["__scopeId", "data-v-9b1413fa"]]), Rc = ["data-dc-theme", "aria-label"], Tc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Lc = /* @__PURE__ */ de({
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
    }), a = t, l = W(null), r = W([]), o = W(null), i = W(null), u = W(!1), f = m(
      () => n.menus.flatMap((L, K) => zt(L) ? [K] : [])
    );
    function w(L, K) {
      const V = r.value[L]?.getBoundingClientRect(), S = n.menus[L];
      !V || !S || !zt(S) || (i.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, o.value = L, u.value = K);
    }
    function k(L) {
      const K = o.value;
      o.value = null, i.value = null, L && K !== null && r.value[K]?.focus();
    }
    function g(L) {
      o.value === L ? k(!0) : w(L, !1);
    }
    function b(L) {
      o.value === null || o.value === L || w(L, !1);
    }
    function y(L, K) {
      const V = f.value;
      if (V.length === 0) return null;
      if (L === null) return K === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const S = V.indexOf(L);
      return S === -1 ? V[0] ?? null : V[(S + K + V.length) % V.length] ?? null;
    }
    function $(L) {
      const K = L.key;
      if (K === "Escape") {
        if (o.value === null) return;
        L.preventDefault(), k(!0);
        return;
      }
      if (K === "ArrowDown" && o.value === null) {
        const R = C();
        if (R === null) return;
        L.preventDefault(), w(R, !0);
        return;
      }
      if (K !== "ArrowLeft" && K !== "ArrowRight") return;
      const V = o.value ?? C(), S = y(V, K === "ArrowRight" ? 1 : -1);
      S !== null && (L.preventDefault(), o.value !== null ? w(S, !0) : r.value[S]?.focus());
    }
    function C() {
      const L = r.value.findIndex((K) => K === document.activeElement);
      return L === -1 ? f.value[0] ?? null : L;
    }
    function T(L) {
      const K = L.target;
      !K || l.value?.contains(K) || k(!1);
    }
    ke(o, (L) => {
      L !== null ? window.addEventListener("pointerdown", T, !0) : window.removeEventListener("pointerdown", T, !0);
    }), He(() => window.removeEventListener("pointerdown", T, !0));
    function I(L) {
      k(!0), L.action?.(), a("choose", L);
    }
    return (L, K) => (p(), h("div", {
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
        ref: (R) => {
          R && (r.value[S] = R);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === S,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: S === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (R) => g(S),
        onMouseenter: (R) => b(S)
      }, z(V.label), 41, Tc))), 128)),
      o.value !== null && i.value ? (p(), se(ga, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: I,
        onDismiss: K[0] || (K[0] = (V) => k(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : D("", !0)
    ], 44, Rc));
  }
}), id = /* @__PURE__ */ pe(Lc, [["__scopeId", "data-v-93dbd2e4"]]), Fc = ["aria-label", "aria-expanded", "disabled"], Dc = { "aria-hidden": "true" }, Ic = /* @__PURE__ */ de({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = W(null), a = W(null), l = W(null), r = W(!1), o = m(() => l.value !== null);
    function i(b) {
      const y = s.value?.getBoundingClientRect();
      y && (l.value = { x: y.left, y: y.bottom + 4, mirrorX: y.right }, r.value = b);
    }
    function u(b) {
      l.value = null, b && s.value?.focus();
    }
    function f() {
      o.value ? u(!0) : i(!1);
    }
    function w(b) {
      b.key !== "ArrowDown" || o.value || (b.preventDefault(), i(!0));
    }
    function k(b) {
      const y = b.target;
      y && (s.value?.contains(y) || a.value?.root?.contains(y) || u(!1));
    }
    ke(o, (b) => {
      b ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), He(() => window.removeEventListener("pointerdown", k, !0));
    function g(b) {
      u(!0), b.action?.(), n("choose", b);
    }
    return (b, y) => (p(), h(ee, null, [
      _("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: f,
        onKeydown: w
      }, [
        _("span", Dc, z(e.glyph), 1)
      ], 40, Fc),
      l.value ? (p(), se(ga, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: g,
        onDismiss: y[0] || (y[0] = ($) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : D("", !0)
    ], 64));
  }
}), Hn = /* @__PURE__ */ pe(Ic, [["__scopeId", "data-v-48f5ada5"]]), $t = (e) => e.kind === "split", U = (e) => e.kind === "group", Z = (e) => e.kind === "float", rt = { x: 16, y: 16, w: 360, h: 260 }, on = 28, ya = 120, Sn = 220, ka = 38, dt = 6;
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
function cd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const fe = (e) => typeof e == "string", jn = (e) => fe(e) ? Ie(e) : e, Ut = (e) => fe(e) ? [e] : je(e), Cs = (e) => e.panels.filter(fe), Nc = (e) => e.panels.filter((t) => !fe(t)), Pe = (e, t) => e.panels.includes(t);
function Ht(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (fe(l) || !ae(l, t)) return l;
    const r = n(l);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, panels: a } : e;
}
function un(e, t) {
  return { node: e, rect: { ...rt, ...t } };
}
function Xn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Gn(e, t) {
  const n = { ...rt, ...t };
  return Xn(
    e.map(
      (s, a) => un(s, {
        ...n,
        x: n.x + a * on,
        y: n.y + a * on
      })
    )
  );
}
function Yn(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Qn = (e, t, n) => Yn("row", e, t, n), ud = (e, t, n) => Yn("column", e, t, n);
function ge(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ct = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, dd = (e) => ({ ...e, headless: !0 }), fd = (e) => ({ ...e, fixedView: !0 }), Oc = (e) => e === "left" || e === "right" ? "row" : "column";
function je(e) {
  return U(e) ? e.panels.flatMap(Ut) : Z(e) ? e.frames.flatMap((t) => je(t.node)) : e.children.flatMap(je);
}
function ae(e, t) {
  return U(e) ? e.panels.some((n) => fe(n) ? n === t : ae(n, t)) : Z(e) ? e.frames.some((n) => ae(n.node, t)) : e.children.some((n) => ae(n, t));
}
const wa = (e) => je(e).length === 0, En = (e) => !U(e) && ct(e), Pn = (e) => wa(e) && !En(e);
function dn(e) {
  return $t(e) ? e.children.map((t, n) => ({ node: t, index: n })) : Z(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => fe(t) ? [] : [{ node: t, index: n }]);
}
const Zn = (e) => dn(e).map((t) => t.node);
function ut(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => fe(s) ? s === t : ae(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function ba(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && fe(t) ? t : "";
}
function Ce(e) {
  if (fe(e)) return e;
  if (U(e)) {
    const n = e.panels[ut(e)];
    return n === void 0 ? "" : Ce(n);
  }
  if (Z(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Ce(n.node) : "";
  }
  const t = e.children[0];
  return t ? Ce(t) : "";
}
function pt(e, t) {
  if (U(e) && Pe(e, t)) return e;
  for (const n of Zn(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function Kc(e) {
  const t = Zn(e).flatMap(Kc);
  return U(e) ? [e, ...t] : t;
}
function be(e, t) {
  if (U(e)) {
    for (const n of Nc(e)) {
      const s = be(n, t);
      if (s) return s;
    }
    return null;
  }
  if (Z(e)) {
    for (const n of e.frames)
      if (ae(n.node, t))
        return be(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = be(n, t);
    if (s) return s;
  }
  return null;
}
function gn(e, t, n = ya) {
  const s = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), a = s(e.w, t.w), l = s(e.h, t.h), r = (o, i, u) => Math.min(Math.max(o, 0), Math.max(u - i, 0));
  return {
    x: Math.round(r(e.x, a, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function Ms(e, t, n, s, a = ya) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + s), t.includes("n") && (i = e.h - s, r = e.y + s), o < a && (t.includes("w") && (l = e.x + e.w - a), o = a), i < a && (t.includes("n") && (r = e.y + e.h - a), i = a), { x: l, y: r, w: o, h: i };
}
const $a = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (U(e)) return Ht(e, t, (l) => vt(l, t, n));
  if (Z(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!ae(o.node, t)) return o;
      if (be(o.node, t)) {
        const u = vt(o.node, t, n);
        return u === o.node ? o : (l = !0, { ...o, node: u });
      }
      const i = n(o);
      return i === o ? o : (l = !0, i);
    });
    return l ? { ...e, frames: r } : e;
  }
  if (!ae(e, t)) return e;
  let s = !1;
  const a = e.children.map((l) => {
    const r = vt(l, t, n);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, children: a } : e;
}
function Vc(e, t, n) {
  return vt(e, t, (s) => $a(s.rect, n) ? s : { ...s, rect: n });
}
const Je = (e) => e.maximized === !0, xa = (e) => (t) => {
  if (Je(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function Bc(e, t, n = !0) {
  return vt(e, t, xa(n));
}
function pd(e, t) {
  const n = be(e, t);
  return n ? Bc(e, t, !Je(n)) : e;
}
const lt = (e) => e.minimized === !0, Ca = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function qc(e, t, n = !0) {
  return vt(e, t, Ca(n));
}
function vd(e, t) {
  const n = be(e, t);
  return n ? qc(e, t, !lt(n)) : e;
}
function at(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = tt(e, t.slice(0, -1));
  return !s || !Z(s) ? null : s.frames[n] ?? null;
}
function An(e, t) {
  if (Z(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ae(s.node, t)) continue;
      const a = An(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of dn(e)) {
    if (!ae(n, t)) continue;
    const a = An(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function Jn(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = tt(e, a);
  if (!l || !Z(l)) return e;
  const r = l.frames[s];
  if (!r) return e;
  const o = n(r);
  if (o === r) return e;
  const i = [...l.frames];
  return i[s] = o, it(e, a, { ...l, frames: i });
}
function Ss(e, t, n) {
  return Jn(
    e,
    t,
    (s) => $a(s.rect, n) ? s : { ...s, rect: n }
  );
}
function Wc(e, t, n = !0) {
  return Jn(e, t, xa(n));
}
function Uc(e, t, n = !0) {
  return Jn(e, t, Ca(n));
}
function Rt(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (Z(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const o = Rt(r.node, s), i = o === r.node ? r : { ...r, node: o };
    if (n === e.frames.length - 1 && i === r) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(i), { ...e, frames: u };
  }
  const a = tt(e, [n]);
  if (!a) return e;
  const l = Rt(a, s);
  return l === a ? e : it(e, [n], l);
}
function Hc(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (Z(s) && (n[l] = s.frames.length - 1), s = tt(s, [a]));
  }), n;
}
function tn(e, t, n, s) {
  if (U(e)) return Ht(e, n, (r) => tn(r, t, n, s));
  if (Z(e)) {
    const r = e.frames.findIndex((i) => ae(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if (be(o.node, n)) {
      const i = tn(o.node, t, n, s);
      if (i === o.node) return e;
      const u = [...e.frames];
      return u[r] = { ...o, node: i }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, un(Ie(t), s)] };
  }
  if (!ae(e, n)) return e;
  let a = !1;
  const l = e.children.map((r) => {
    const o = tn(r, t, n, s);
    return o !== r && (a = !0), o;
  });
  return a ? { ...e, children: l } : e;
}
function Es(e, t, n, s) {
  if (t === n || !ae(e, t) || !ae(e, n) || !be(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const l = tn(a, t, n, s);
  return l === a ? e : ye(l);
}
function jc(e, t, n) {
  return Z(e) ? { ...e, frames: [...e.frames, un(Ie(t), n)] } : U(e) ? Sa(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ie(t)],
    sizes: [...Ue(e), 1],
    ...ge(e)
  };
}
function Ma(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return jc(e, t, s);
  const l = n.slice(1), r = (f, w) => w === a ? Ma(f, t, l, s) : ot(f, t);
  if (Z(e)) {
    const f = e.frames.flatMap((w, k) => {
      const g = r(w.node, k);
      return g ? [g === w.node ? w : { ...w, node: g }] : [];
    });
    return { ...e, frames: f };
  }
  if (U(e)) {
    const f = ut(e), w = [];
    e.panels.forEach((b, y) => {
      if (fe(b)) {
        b !== t && w.push(b);
        return;
      }
      const $ = r(b, y);
      $ && w.push($);
    });
    const g = e.active && w.some((b) => Ut(b).includes(e.active)) ? e.active : Ce(w[f] ?? w[w.length - 1]);
    return {
      kind: "group",
      panels: w,
      ...g ? { active: g } : {},
      ...ge(e)
    };
  }
  const o = Ue(e), i = [], u = [];
  return e.children.forEach((f, w) => {
    const k = r(f, w);
    k && (i.push(k), u.push(o[w] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: u, ...ge(e) };
}
function Ps(e, t, n, s) {
  const a = tt(e, n);
  return !a || !wa(a) || !ae(e, t) ? e : ye(Ma(e, t, n, s));
}
function yn(e, t) {
  if (U(e)) return Ht(e, t, (a) => yn(a, t));
  if (Z(e)) {
    const a = e.frames.findIndex((u) => ae(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const r = yn(l.node, t), o = r === l.node ? l : { ...l, node: r };
    if (a === e.frames.length - 1 && o === l) return e;
    const i = [...e.frames];
    return i.splice(a, 1), i.push(o), { ...e, frames: i };
  }
  if (!ae(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = yn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function es(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), a = s.reduce((l, r) => l + r, 0);
  return a <= 0 ? n() : s.map((l) => l / a);
}
const Ue = (e) => es(e.children.length, e.sizes), Te = (e) => {
  const t = U(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function ye(e) {
  if (U(e)) return Xc(e);
  if (Z(e)) {
    const o = e.frames.flatMap((i) => {
      const u = ye(i.node);
      return Pn(u) ? [] : [u === i.node ? i : { ...i, node: u }];
    });
    return o.length === e.frames.length && o.every((i, u) => i === e.frames[u]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = Ue(e), n = Te(e), s = [], a = [], l = [];
  e.children.forEach((o, i) => {
    const u = ye(o), f = t[i] ?? 0;
    if (Pn(u)) return;
    if (!n && $t(u) && u.direction === e.direction && !Te(u) && !ct(u)) {
      const k = Ue(u);
      u.children.forEach((g, b) => {
        s.push(g), a.push(f * (k[b] ?? 0));
      });
      return;
    }
    s.push(u), a.push(f);
    const w = n?.[i];
    w && l.push(w);
  });
  const r = s[0];
  return s.length === 1 && r && !ct(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: es(s.length, a),
    ...ge(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function Xc(e) {
  if (e.panels.every(fe)) return e;
  const t = Ce(e), n = Te(e), s = [], a = [];
  e.panels.forEach((o, i) => {
    const u = n?.[i];
    if (fe(o)) {
      s.push(o), u && a.push(u);
      return;
    }
    const f = ye(o);
    if (!Pn(f)) {
      if (U(f) && !ct(f) && !Te(f)) {
        s.push(...f.panels);
        return;
      }
      s.push(f), u && a.push(u);
    }
  });
  const l = s[0];
  if (s.length === 1 && l !== void 0 && !fe(l) && !ct(e))
    return l;
  if (s.length === e.panels.length && s.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && s.some((o) => Ut(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...r ? { active: r } : {},
    ...ge(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ot(e, t) {
  if (Z(e)) {
    const r = e.frames.flatMap((o) => {
      const i = ot(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !En(e) ? null : { ...e, frames: r };
  }
  if (U(e)) {
    if (!ae(e, t)) return e;
    const r = ut(e), o = [];
    for (const f of e.panels) {
      if (fe(f)) {
        f !== t && o.push(f);
        continue;
      }
      const w = ot(f, t);
      w && o.push(w);
    }
    if (o.length === 0) return null;
    const u = e.active && o.some((f) => Ut(f).includes(e.active)) ? e.active : Ce(o[r] ?? o[o.length - 1]);
    return u ? { kind: "group", panels: o, active: u, ...ge(e) } : { kind: "group", panels: o, ...ge(e) };
  }
  const n = Ue(e), s = [], a = [];
  if (e.children.forEach((r, o) => {
    const i = ot(r, t);
    i && (s.push(i), a.push(n[o] ?? 0));
  }), s.length === 0)
    return En(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...ge(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !ct(e) ? l : ye({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...ge(e)
  });
}
function Sa(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...ge(e) };
}
function Et(e, t, n, s, a) {
  const l = (g) => Wt(
    g,
    (b) => ae(b, n) ? Et(b, t, n, s, a) : b
  );
  if (s === "float") return e;
  const r = (g) => Ht(g, n, (b) => Et(b, t, n, s, a));
  if (s === "center")
    return U(e) ? Pe(e, n) ? Sa(e, t, a) : r(e) : Z(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (g) => ae(g, n) ? Et(g, t, n, s, a) : g
      )
    };
  const o = Oc(s), i = s === "left" || s === "top", u = (g) => ({
    kind: "split",
    direction: o,
    children: i ? [Ie(t), g] : [g, Ie(t)],
    sizes: [0.5, 0.5]
  });
  if (U(e)) return Pe(e, n) ? u(e) : r(e);
  if (Z(e)) return l(e);
  const f = Ue(e), w = e.children.findIndex(
    (g) => U(g) && Pe(g, n)
  );
  if (w >= 0 && e.direction === o) {
    const g = (f[w] ?? 0) / 2, b = [...e.children], y = [...f];
    return b.splice(i ? w : w + 1, 0, Ie(t)), y.splice(w, 1, g, g), {
      kind: "split",
      direction: o,
      children: b,
      sizes: y,
      ...ge(e)
    };
  }
  const k = e.children.map((g) => ae(g, n) ? U(g) && Pe(g, n) ? u(g) : Et(g, t, n, s) : g);
  return {
    kind: "split",
    direction: e.direction,
    children: k,
    sizes: f,
    ...ge(e)
  };
}
function mt(e, t) {
  if (U(e)) {
    if (Pe(e, t))
      return ba(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((i) => !fe(i) && ae(i, t)), l = e.panels[a];
    if (l === void 0 || fe(l)) return e;
    const r = mt(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[a] = r, { ...e, panels: o, active: t };
  }
  if (!ae(e, t)) return e;
  if (Z(e)) return Wt(e, (a) => mt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = mt(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Tt(e, t, n) {
  if (U(e)) {
    if (!Pe(e, t)) return Ht(e, t, (u) => Tt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const l = [...e.panels];
    l.splice(s, 1), l.splice(a, 0, t);
    const r = Te(e), o = r ? [...r] : void 0;
    o && o.splice(a, 0, ...o.splice(s, 1));
    const i = Ce(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ...ge(e),
      ...o ? { places: o } : {}
    };
  }
  return ae(e, t) ? Z(e) ? Wt(e, (s) => Tt(s, t, n)) : { ...e, children: e.children.map((s) => Tt(s, t, n)) } : e;
}
function nn(e, t, n) {
  if (t === n) return e;
  if (U(e)) {
    if (!ae(e, t) && !ae(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => fe(l) ? s(l) : nn(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return Z(e) ? Wt(e, (s) => nn(s, t, n)) : { ...e, children: e.children.map((s) => nn(s, t, n)) };
}
function Qt(e, t, n, s, a) {
  if (s === "float" || !ae(e, t) || !ae(e, n)) return e;
  const l = pt(e, t);
  if (s === "center" && l && Pe(l, n)) {
    if (a === void 0) return e;
    const o = l.panels.indexOf(t), i = a > o ? a - 1 : a;
    return i === o ? e : mt(Tt(e, t, i), t);
  }
  if (t === n) return e;
  const r = ot(e, t);
  return r ? ye(Et(r, t, n, s, a)) : e;
}
function Ea(e, t, n) {
  if (U(e)) {
    const a = e.panels[t];
    if (a === void 0 || fe(a)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (Z(e)) {
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
  if (!U(e) && s.some(({ node: a }) => U(a) && Pe(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!ae(a, t)) continue;
    const r = jt(a, t, n);
    return r ? Ea(e, l, r) : null;
  }
  return null;
}
function md(e, t, n) {
  const s = jt(
    e,
    t,
    (a) => $t(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? ye(s) : e;
}
function Pa(e) {
  return Z(e) ? [e] : Te(e) || ct(e) ? [e] : U(e) ? [...e.panels] : e.children.flatMap(Pa);
}
function Aa(e, t) {
  if (U(e)) return e;
  const n = Zn(e).map(Pa), s = n.flat(), a = t && s.some((r) => Ut(r).includes(t)) ? t : void 0, l = Gc(e, n);
  return ye({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...ge(e),
    ...l ? { places: l } : {}
  });
}
function Gc(e, t) {
  const n = Z(e) ? e.frames.map(({ node: s, ...a }) => a) : Te(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function Yc(e, t) {
  const n = jt(e, t, (s) => Aa(s, t));
  return n ? ye(n) : e;
}
function ts(e, t, n) {
  if (U(e) && Pe(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of dn(e)) {
    if (!ae(s, t)) continue;
    const l = ts(s, t, n);
    return l ? Ea(e, a, l) : null;
  }
  return null;
}
function As(e, t, n) {
  const s = ts(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const l = Te(a);
    return {
      ...Yn(n, a.panels.map(jn)),
      ...ge(a),
      ...l ? { places: l } : {}
    };
  });
  return s ? ye(s) : e;
}
function zn(e, t) {
  if (U(e)) return e;
  if (Z(e)) {
    const a = e.frames.findIndex(
      (o) => U(o.node) && o.node.panels.includes(t)
    ), l = e.frames[a], r = l && U(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const o = Gn(r.panels.map(jn), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...o, ...e.frames.slice(a + 1)]
      };
    }
    return Wt(e, (o) => zn(o, t));
  }
  if (!ae(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = zn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Qc(e, t, n) {
  const s = pt(e, t);
  if (!s || s.panels.length < 2) return e;
  if (be(e, t)?.node === s) {
    const r = zn(e, t);
    return r === e ? e : ye(r);
  }
  const l = ts(e, t, (r) => ({
    ...Xn(za(r.panels.map(jn), Te(r), n)),
    ...ge(r)
  }));
  return l ? ye(l) : e;
}
function za(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Gn(e, n).frames;
}
function Ra(e, t) {
  return { ...Xn(za(e.children, Te(e), t)), ...ge(e) };
}
function hd(e, t, n) {
  const s = jt(
    e,
    t,
    (a) => Z(a) ? a : Ra(a, n)
  );
  return s ? ye(s) : U(e) && Pe(e, t) ? Gn([e], n) : e;
}
function Zc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function Ta(e, t) {
  const n = Zc(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...ge(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function _d(e, t, n = "row") {
  const s = jt(
    e,
    t,
    (a) => Z(a) ? Ta(a, n) : a
  );
  return s ? ye(s) : e;
}
function La(e) {
  if (Z(e)) return null;
  const t = U(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || fe(t) || U(t) && t.panels.length === 1 && fe(t.panels[0]) ? null : t;
}
const Jc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function eu(e, t) {
  const n = La(e);
  return n ? t === "inner" ? n : { ...Jc(n), ...ge(e) } : e;
}
function kt(e) {
  return e.title ? e.title : U(e) ? "" : Z(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Lt(e, t) {
  if (U(e)) {
    const s = e.panels[ut(e)];
    return s === void 0 ? "" : fe(s) ? t(s) ?? s : kt(s) || Lt(s, t);
  }
  if (e.title) return e.title;
  if (Z(e)) {
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
    else if (Z(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || fe(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function it(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (Z(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const u = it(i.node, a, n);
    if (u === i.node) return e;
    const f = [...e.frames];
    return f[s] = { ...i, node: u }, { ...e, frames: f };
  }
  if (U(e)) {
    const i = e.panels[s];
    if (i === void 0 || fe(i)) return e;
    const u = it(i, a, n);
    if (u === i) return e;
    const f = [...e.panels];
    return f[s] = u, { ...e, panels: f };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = it(l, a, n);
  if (r === l) return e;
  const o = [...e.children];
  return o[s] = r, { ...e, children: o };
}
function sn(e, t, n) {
  if (t.length === 0)
    return $t(e) ? { ...e, sizes: es(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (Z(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const i = sn(o.node, a, n);
    if (i === o.node) return e;
    const u = [...e.frames];
    return u[s] = { ...o, node: i }, { ...e, frames: u };
  }
  if (U(e)) {
    const o = e.panels[s];
    if (o === void 0 || fe(o)) return e;
    const i = sn(o, a, n);
    if (i === o) return e;
    const u = [...e.panels];
    return u[s] = i, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = [...e.children];
  return r[s] = sn(l, a, n), { ...e, children: r };
}
function zs(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const r = a + l;
  if (r < s * 2) return e;
  const o = [...e], i = Math.min(Math.max(a + n, s), r - s);
  return o[t] = i, o[t + 1] = r - i, o;
}
function cn(e) {
  if (!U(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !fe(t) ? e : { ...Qn([tu(e)]), ...ge(e) };
}
const tu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Rs(e) {
  return e.length === 0 ? null : Qn(e.map(Ie));
}
function nu(e, t) {
  if (!e) return Rs(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const i of je(e))
    !n.has(i) || s.has(i) ? a.add(i) : s.add(i);
  let l = e;
  for (const i of a)
    l = l ? ot(l, i) : null;
  const r = new Set(l ? je(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? cn(ye(l)) : null;
  if (!l) return Rs(o);
  if (Z(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (u, f) => un(Ie(u), {
            x: rt.x + (i + f) * on,
            y: rt.y + (i + f) * on
          })
        )
      ]
    };
  }
  return cn(ye(Qn([l, ...o.map(Ie)])));
}
const ns = Symbol("dc.windowContext");
function su(e) {
  return Rn(ns, e), e;
}
function ss() {
  const e = _t(ns, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const au = ["data-dc-glyph"], lu = { class: "dc-glyph__line" }, ru = ["d"], ou = {
  key: 0,
  class: "dc-glyph__aqua"
}, iu = ["d"], cu = /* @__PURE__ */ de({
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
      _("g", lu, [
        (p(!0), h(ee, null, ue(t[e.kind], (l) => (p(), h("path", {
          key: l,
          d: l
        }, null, 8, ru))), 128))
      ]),
      n[e.kind] ? (p(), h("g", ou, [
        (p(!0), h(ee, null, ue(n[e.kind], (l) => (p(), h("path", {
          key: l,
          d: l
        }, null, 8, iu))), 128))
      ])) : D("", !0)
    ], 8, au));
  }
}), ht = /* @__PURE__ */ pe(cu, [["__scopeId", "data-v-4d2872c0"]]), uu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], du = ["data-dc-movable"], fu = { class: "dc-float__title dc-truncate" }, pu = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, vu = ["aria-label", "aria-pressed", "data-dc-minimize"], mu = ["aria-label", "aria-pressed", "data-dc-maximize"], hu = ["aria-label", "data-dc-close"], _u = { class: "dc-float__content" }, gu = ["data-dc-handle", "onPointerdown"], yu = /* @__PURE__ */ de({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = ss(), s = m(() => Ce(t.frame.node)), a = m(() => n.panelFor(s.value)?.fixed === !0), l = m(() => Je(t.frame)), r = m(() => lt(t.frame)), o = m(() => l.value || r.value), i = m(() => n.resizable.value && !a.value && !o.value), u = m(() => n.movable.value && !a.value && !o.value), f = m(() => {
      const K = je(t.frame.node);
      return K.length === 1 ? K[0] ?? null : null;
    }), w = m(() => f.value !== null && n.closable(f.value)), k = m(() => t.frame.node.headless === !0), g = m(
      () => !k.value && (!U(t.frame.node) || r.value)
    ), b = m(
      () => t.frame.title || kt(t.frame.node) || Lt(t.frame.node, (K) => n.panelFor(K)?.title)
    ), y = m(() => n.spaceMenu(t.path));
    function $(K) {
      K.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, K, "move");
    }
    function C(K) {
      K.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const T = m(() => {
      const K = n.framing.value;
      return K !== null && ae(t.frame.node, K);
    }), I = m(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Sn}px`,
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
    })), L = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (K, V) => (p(), h("div", {
      class: "dc-float",
      style: Re(I.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": T.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (S) => P(n).raiseAt(e.path))
    }, [
      g.value ? (p(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: C
      }, [
        _("span", fu, z(b.value), 1),
        y.value.length ? (p(), se(Hn, {
          key: 0,
          items: y.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : D("", !0),
        !a.value || r.value && w.value && f.value ? (p(), h("div", pu, [
          a.value ? D("", !0) : (p(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (S) => P(n).toggleMinimizeAt(e.path))
          }, [
            he(ht, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, vu)),
          a.value ? D("", !0) : (p(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (S) => P(n).toggleMaximizeAt(e.path))
          }, [
            he(ht, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, mu)),
          r.value && w.value && f.value ? (p(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": f.value,
            onClick: V[2] || (V[2] = (S) => P(n).close(f.value))
          }, [
            he(ht, { kind: "close" })
          ], 8, hu)) : D("", !0)
        ])) : D("", !0)
      ], 40, du)) : D("", !0),
      _("div", _u, [
        qe(K.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), h(ee, null, ue(i.value ? L : [], (S) => (p(), h("span", {
        key: S,
        class: "dc-float__grip",
        "data-dc-handle": S,
        "aria-hidden": "true",
        onPointerdown: Fe((R) => P(n).beginFrameDragAt(e.path, R, S), ["stop"])
      }, null, 40, gu))), 128))
    ], 44, uu));
  }
}), ku = /* @__PURE__ */ pe(yu, [["__scopeId", "data-v-f035684c"]]), as = Symbol("dc.paneContext");
function wu(e) {
  return Rn(as, e), e;
}
function gd() {
  return _t(as, null);
}
function yd(e) {
  const t = _t(ns, null), n = _t(as, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => St(e)
  );
  return tl() && Ls(s), s;
}
const bu = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], $u = ["data-dc-movable"], xu = ["aria-label", "aria-pressed"], Cu = ["data-dc-space-name"], Mu = { class: "dc-truncate" }, Su = ["aria-label"], Eu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Pu = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Au = { class: "dc-tab__name dc-truncate" }, zu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Ru = ["aria-label", "data-dc-close", "onClick"], Tu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Lu = { class: "dc-pane__tools" }, Fu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Du = ["aria-label", "data-dc-minimize"], Iu = ["aria-label", "aria-pressed", "data-dc-maximize"], Nu = ["aria-label", "data-dc-close"], Ou = ["id", "role", "aria-labelledby"], Ku = ["id", "role", "aria-labelledby"], Vu = ["data-dc-edge"], Bu = /* @__PURE__ */ de({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = ss(), s = Ds() ?? "dc-pane", a = m(
      () => t.group.panels.flatMap((N, q) => {
        if (!fe(N)) {
          const Me = kt(N) || Lt(N, ($e) => n.panelFor($e)?.title);
          return [{ kind: "space", index: q, id: `space-${q}`, title: Me, node: N }];
        }
        const te = n.panelFor(N);
        return te ? [{ kind: "panel", index: q, id: N, title: te.title, panel: te }] : [];
      })
    ), l = m(() => a.value.length > 1), r = m(() => {
      const N = ut(t.group);
      return a.value.find((q) => q.index === N) ?? a.value[0] ?? null;
    }), o = m(() => r.value?.kind === "space" ? r.value.node : null), i = m(() => o.value ? "" : ba(t.group)), u = m(() => o.value ? null : n.panelFor(i.value)), f = m(() => r.value?.title ?? ""), w = m(() => n.spaceNames.value ? t.group.title ?? "" : ""), k = m(() => [...t.path, r.value?.index ?? 0]), g = m(() => i.value || Cs(t.group)[0] || ""), b = m(() => n.viewFor(i.value)), y = m(() => t.group.headless === !0), $ = m(() => n.focused.value === i.value), C = m(() => n.dragging.value === i.value), T = m(() => n.moving.value === i.value), I = m(() => n.frameOf(g.value) !== null), L = m(() => n.panelFor(g.value)?.fixed === !0), K = m(
      () => !o.value && (n.canMove(i.value) || I.value && n.movable.value && !L.value)
    ), V = m(
      () => o.value ? n.spaceMenu(k.value) : n.menuFor(i.value)
    ), S = (N) => n.closable(N);
    wu({ panel: i });
    const R = m(() => n.maximized(g.value)), G = m(
      () => I.value && !L.value || !l.value && !!u.value && S(u.value.id)
    ), J = (N) => `${s}-tab-${N}`, ve = m(() => `${s}-body`), j = m(() => {
      const N = n.dropTarget.value;
      return !N || !Pe(t.group, N.panel) || N.edge === "float" ? null : N;
    }), O = m(() => j.value?.index === void 0 ? j.value?.edge ?? null : null), E = m(() => j.value?.index ?? null), x = () => u.value ? n.renderContent(u.value, b.value, $.value) ?? null : null, H = () => u.value ? n.renderActions(u.value, b.value, $.value) ?? null : null;
    let le = null;
    function re(N) {
      const q = le !== null && Math.hypot(N.clientX - le.x, N.clientY - le.y) >= 4;
      return le = null, q;
    }
    const _e = (N) => N.kind === "panel" ? N.id : Ce(N.node);
    function Se(N, q) {
      q.kind !== "space" && (n.focus(q.id), le = { x: N.clientX, y: N.clientY }, n.beginDrag(q.id, N));
    }
    function Xe(N, q) {
      if (re(N)) return;
      const te = _e(q);
      te && n.selectPanel(te);
    }
    function Ge(N) {
      i.value && n.focus(i.value), !N.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (I.value ? n.beginFrameDrag(g.value, N, "move") : n.beginDrag(i.value, N));
    }
    function Ye(N) {
      le = { x: N.clientX, y: N.clientY }, n.beginDrag(i.value, N);
    }
    function Qe(N) {
      re(N) || n.toggleMoveMode(i.value);
    }
    const Ne = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Oe(N) {
      if (!T.value) return;
      if (N.key === "Escape") {
        N.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const q = Ne[N.key];
      q && (N.preventDefault(), I.value ? n.nudgeFrame(i.value, q, N.shiftKey) : n.nudge(i.value, q, N.shiftKey));
    }
    function Ke(N) {
      !I.value || N.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(g.value);
    }
    function xt(N, q) {
      N.stopPropagation(), le = null, n.close(q);
    }
    function Xt(N, q) {
      const te = a.value.length;
      let Me = null;
      if (N.key === "ArrowRight" ? Me = (q + 1) % te : N.key === "ArrowLeft" ? Me = (q - 1 + te) % te : N.key === "Home" ? Me = 0 : N.key === "End" && (Me = te - 1), Me === null) return;
      N.preventDefault();
      const $e = a.value[Me];
      if (!$e) return;
      const Ct = _e($e);
      Ct && n.selectPanel(Ct);
    }
    return (N, q) => r.value ? (p(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": P(Cs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": I.value ? "true" : "false",
      "data-dc-maximized": R.value ? "true" : "false",
      "data-dc-headless": y.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": C.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: q[7] || (q[7] = (te) => i.value && P(n).focus(i.value))
    }, [
      y.value ? D("", !0) : (p(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": K.value ? "true" : "false",
        onPointerdown: Ge,
        onDblclick: Ke
      }, [
        K.value ? (p(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": T.value,
          onPointerdown: Ye,
          onClick: Qe,
          onKeydown: Oe
        }, [...q[8] || (q[8] = [
          _("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, xu)) : D("", !0),
        w.value ? (p(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": w.value
        }, [
          _("span", Mu, z(w.value), 1)
        ], 8, Cu)) : D("", !0),
        _("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (p(!0), h(ee, null, ue(a.value, (te, Me) => (p(), h(ee, {
            key: te.id
          }, [
            E.value === Me ? (p(), h("span", Eu)) : D("", !0),
            _("button", {
              id: J(te.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": te.kind === "panel" ? te.id : void 0,
              "data-dc-space": te.kind === "space" ? te.title : void 0,
              "aria-selected": te.index === r.value.index,
              "aria-controls": ve.value,
              tabindex: te.index === r.value.index ? 0 : -1,
              onPointerdown: ($e) => Se($e, te),
              onClick: ($e) => Xe($e, te),
              onKeydown: ($e) => Xt($e, Me)
            }, [
              _("span", Au, z(te.title), 1),
              te.kind === "panel" && te.panel.subtitle ? (p(), h("span", zu, z(te.panel.subtitle), 1)) : D("", !0),
              l.value && te.kind === "panel" && S(te.id) ? (p(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${te.title}`,
                "data-dc-close": te.id,
                onPointerdown: q[0] || (q[0] = Fe(() => {
                }, ["stop"])),
                onClick: ($e) => xt($e, te.id)
              }, [...q[9] || (q[9] = [
                _("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Ru)) : D("", !0)
            ], 40, Pu)
          ], 64))), 128)),
          E.value === a.value.length ? (p(), h("span", Tu)) : D("", !0)
        ], 8, Su),
        _("div", Lu, [
          he(H),
          V.value.length ? (p(), se(Hn, {
            key: 0,
            items: V.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : D("", !0)
        ]),
        G.value ? (p(), h("div", Fu, [
          I.value && !L.value ? (p(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": g.value,
            onPointerdown: q[1] || (q[1] = Fe(() => {
            }, ["stop"])),
            onClick: q[2] || (q[2] = (te) => P(n).toggleMinimize(g.value))
          }, [
            he(ht, { kind: "minimize" })
          ], 40, Du)) : D("", !0),
          I.value && !L.value ? (p(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${R.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": R.value,
            "data-dc-maximize": g.value,
            onPointerdown: q[3] || (q[3] = Fe(() => {
            }, ["stop"])),
            onClick: q[4] || (q[4] = (te) => P(n).toggleMaximize(g.value))
          }, [
            he(ht, {
              kind: R.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Iu)) : D("", !0),
          !l.value && u.value && S(u.value.id) ? (p(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: q[5] || (q[5] = Fe(() => {
            }, ["stop"])),
            onClick: q[6] || (q[6] = (te) => P(n).close(u.value.id))
          }, [
            he(ht, { kind: "close" })
          ], 40, Nu)) : D("", !0)
        ])) : D("", !0)
      ], 40, $u)),
      o.value ? (p(), h("div", {
        key: 1,
        id: ve.value,
        class: "dc-pane__space",
        role: y.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value ? void 0 : J(r.value.id)
      }, [
        qe(N.$slots, "space", {
          node: o.value,
          path: k.value
        }, void 0, !0)
      ], 8, Ou)) : (p(), h("div", {
        key: 2,
        id: ve.value,
        class: "dc-pane__body",
        role: y.value ? void 0 : "tabpanel",
        "aria-labelledby": y.value ? void 0 : J(i.value)
      }, [
        he(x)
      ], 8, Ku)),
      O.value ? (p(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": O.value,
        "aria-hidden": "true"
      }, null, 8, Vu)) : D("", !0)
    ], 40, bu)) : D("", !0);
  }
}), Fa = /* @__PURE__ */ pe(Bu, [["__scopeId", "data-v-44fd2b2d"]]), qu = ["data-dc-space", "data-dc-path", "aria-label"], Wu = {
  key: 0,
  class: "dc-space__head"
}, Uu = { class: "dc-space__title dc-truncate" }, Hu = ["data-dc-direction"], ju = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Xu = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Gu = /* @__PURE__ */ de({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ss(), s = W(null), a = m(() => U(t.node) ? t.node : null), l = m(() => $t(t.node) ? t.node : null), r = m(() => Z(t.node) ? t.node : null), o = m(
      () => l.value ? l.value.children : r.value?.frames.map((x) => x.node) ?? []
    ), i = m(() => l.value ? Ue(l.value) : []), u = m(
      () => (r.value?.frames ?? []).map((x, H) => ({
        held: x,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: H,
        key: S(x.node),
        path: [...t.path, H]
      })).sort((x, H) => x.key < H.key ? -1 : x.key > H.key ? 1 : 0)
    ), f = m(() => kt(t.node)), w = m(() => n.spaceMenu(t.path)), k = m(() => t.node.headless === !0), g = m(() => r.value ? "desktop" : l.value?.direction ?? ""), b = W(null), y = W(0);
    let $ = null;
    ke(
      b,
      (x) => {
        $?.disconnect(), $ = null, !(!x || typeof ResizeObserver > "u") && (y.value = x.clientWidth, $ = new ResizeObserver(([H]) => {
          y.value = H?.contentRect.width ?? 0;
        }), $.observe(x));
      },
      { immediate: !0 }
    ), He(() => $?.disconnect());
    const C = m(() => {
      const x = Math.max(
        1,
        Math.floor((y.value + dt) / (Sn + dt))
      ), H = /* @__PURE__ */ new Map();
      let le = 0;
      for (const re of u.value)
        re.held.minimized === !0 && (H.set(re.key, {
          x: dt + le % x * (Sn + dt),
          bottom: dt + Math.floor(le / x) * (ka + dt)
        }), le += 1);
      return H;
    }), T = (x) => !!x && x.join("/") === t.path.join("/"), I = m(() => {
      const x = n.dropTarget.value, H = r.value;
      if (!H || !x?.rect || x.edge !== "float") return null;
      if (x.space) return T(x.space) ? x.rect : null;
      const le = be(H, x.panel);
      return le && H.frames.includes(le) ? x.rect : null;
    }), L = m(() => {
      const x = n.dropTarget.value;
      return !!x && !x.rect && T(x.space);
    }), K = m(() => l.value?.direction === "row"), V = m(() => o.value.map((x, H) => [...t.path, H])), S = (x) => [...je(x)].sort().join("/"), R = (x) => {
      const H = je(x)[0];
      return (H ? n.panelFor(H)?.title : null) ?? H ?? "panel";
    }, G = (x) => {
      const H = o.value[x], le = o.value[x + 1];
      return !H || !le ? "Resize panels" : `Resize ${R(H)} and ${R(le)}`;
    }, J = (x) => {
      const H = i.value[x] ?? 0, le = i.value[x + 1] ?? 0, re = H + le;
      return re > 0 ? Math.round(H / re * 100) : 50;
    };
    function ve() {
      const x = s.value, H = x ? K.value ? x.clientWidth : x.clientHeight : 0;
      return H <= 0 ? 0.05 : Math.min(n.minPanelSize.value / H, 0.4);
    }
    let j = null;
    function O(x, H) {
      const le = l.value, re = s.value;
      if (!n.resizable.value || !le || !re || x.button !== 0) return;
      const _e = K.value ? re.clientWidth : re.clientHeight;
      if (_e <= 0) return;
      const Se = K.value ? x.clientX : x.clientY, Xe = Ue(le), Ge = Math.min(n.minPanelSize.value / _e, 0.4);
      x.preventDefault();
      const Ye = (Oe) => {
        const Ke = ((K.value ? Oe.clientX : Oe.clientY) - Se) / _e;
        n.setSizes(t.path, zs(Xe, H, Ke, Ge));
      }, Qe = () => j?.(), Ne = (Oe) => {
        Oe.key === "Escape" && (n.setSizes(t.path, Xe), j?.());
      };
      j = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", Qe), window.removeEventListener("keydown", Ne), j = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", Qe), window.addEventListener("keydown", Ne);
    }
    He(() => j?.());
    function E(x, H) {
      const le = l.value;
      if (!n.resizable.value || !le) return;
      const re = K.value ? "ArrowRight" : "ArrowDown", _e = K.value ? "ArrowLeft" : "ArrowUp", Se = x.shiftKey ? 0.1 : 0.02;
      if (x.key !== re && x.key !== _e) return;
      const Xe = x.key === re ? Se : -Se;
      x.preventDefault(), n.setSizes(t.path, zs(Ue(le), H, Xe, ve()));
    }
    return (x, H) => {
      const le = Is("WindowNode", !0);
      return a.value ? (p(), se(Fa, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: gt(({ node: re, path: _e }) => [
          he(le, {
            node: re,
            path: _e,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (p(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": g.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !k.value ? (p(), h("header", Wu, [
          _("span", Uu, z(f.value), 1),
          w.value.length ? (p(), se(Hn, {
            key: 0,
            items: w.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : D("", !0)
        ])) : D("", !0),
        r.value ? (p(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: b,
          class: "dc-window__desktop"
        }, [
          I.value ? (p(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${I.value.x}px`,
              top: `${I.value.y}px`,
              width: `${I.value.w}px`,
              height: `${I.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : D("", !0),
          (p(!0), h(ee, null, ue(u.value, (re) => (p(), se(ku, {
            key: re.key,
            frame: re.held,
            path: re.path,
            order: re.order,
            place: C.value.get(re.key) ?? null
          }, {
            default: gt(() => [
              he(le, {
                node: re.held.node,
                path: re.path,
                framed: re.held.node.kind !== "group"
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
          L.value ? (p(), h("div", ju)) : D("", !0),
          (p(!0), h(ee, null, ue(o.value, (re, _e) => (p(), h(ee, {
            key: S(re)
          }, [
            _("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: i.value[_e] ?? 1 })
            }, [
              he(le, {
                node: re,
                path: V.value[_e] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            _e < o.value.length - 1 ? (p(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": K.value ? "vertical" : "horizontal",
              "aria-label": G(_e),
              "aria-valuenow": J(_e),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Se) => O(Se, _e),
              onKeydown: (Se) => E(Se, _e)
            }, null, 40, Xu)) : D("", !0)
          ], 64))), 128))
        ], 8, Hu)) : D("", !0)
      ], 8, qu));
    };
  }
}), Yu = /* @__PURE__ */ pe(Gu, [["__scopeId", "data-v-fb5b403f"]]), Qu = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Zu = {
  key: 1,
  class: "dc-window__empty"
}, Ju = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Zt = 16, ed = /* @__PURE__ */ de({
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
    const s = e, a = n, l = At(e, "layout"), r = At(e, "views"), o = Tn(), i = m(() => new Map(s.panels.map((c) => [c.id, c]))), u = m(() => s.panels.map((c) => c.id)), f = m(() => nu(l.value, u.value)), w = W(null), k = W(null), g = W(null), b = W(!0), y = W(null), $ = W(null), C = W(null), T = W(""), I = W(null);
    function L() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function K(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function V() {
      return L().map((c) => ({ pane: c, order: K(c.element) })).sort((c, d) => {
        const v = Math.max(c.order.length, d.order.length);
        for (let M = 0; M < v; M += 1) {
          const A = (c.order[M] ?? -1) - (d.order[M] ?? -1);
          if (A !== 0) return A;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const S = (c) => L().find((d) => d.panels.includes(c)) ?? null;
    function R(c) {
      const d = i.value.get(c);
      if (!d) return "";
      const v = r.value[c];
      return v && d.views?.some((M) => M.key === v) ? v : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function G(c, d) {
      r.value = { ...r.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const J = m(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ve(c) {
      return !s.movable || J.value < 1 || s.panels.length < 2 ? !1 : i.value.get(c)?.fixed !== !0;
    }
    function j(c, d) {
      const v = f.value;
      !c || !v || c === v || (l.value = c, d && a("panel-move", d));
    }
    function O(c, d, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (d - c.left) / c.width, A = (v - c.top) / c.height, F = 0.3;
      return M > F && M < 1 - F && A > F && A < 1 - F ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: A },
        { edge: "bottom", distance: 1 - A }
      ].reduce(
        (ne, B) => B.distance < ne.distance ? B : ne
      ).edge;
    }
    function E(c, d) {
      const v = [...c.querySelectorAll(".dc-tab")], M = v.findIndex((A) => {
        const F = A.getBoundingClientRect();
        return d < F.left + F.width / 2;
      });
      return M === -1 ? v.length : M;
    }
    function x(c, d, v) {
      for (const { panels: M, element: A } of V().reverse()) {
        const F = A.getBoundingClientRect();
        if (c < F.left || c > F.right || d < F.top || d > F.bottom) continue;
        const ie = M.find((Y) => Y !== v), ne = A.querySelector(".dc-pane__tabs"), B = ne?.getBoundingClientRect();
        if (ne && B && d >= B.top && d <= B.bottom)
          return ie ? { panel: ie, edge: "center", index: E(ne, c) } : null;
        const X = A.querySelector(":scope > .dc-pane__space");
        if (X) {
          const Y = X.getBoundingClientRect();
          if (c >= Y.left && c <= Y.right && d >= Y.top && d <= Y.bottom) continue;
        }
        return ie ? { panel: ie, edge: O(F, c, d) } : null;
      }
      return le(c, d, v) ?? Se(c, d);
    }
    function H() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function le(c, d, v) {
      const M = f.value;
      if (!M) return null;
      for (const A of H()) {
        const F = A.getBoundingClientRect();
        if (c < F.left || c > F.right || d < F.top || d > F.bottom) continue;
        const ie = Xe(A), ne = ie.flatMap((oe) => oe.panels).find((oe) => oe !== v);
        if (!ne && ie.length > 0) return null;
        const B = be(M, v)?.rect, X = gn(
          {
            x: c - F.left - 24,
            y: d - F.top - 12,
            w: B?.w ?? rt.w,
            h: B?.h ?? rt.h
          },
          { w: A.clientWidth, h: A.clientHeight },
          s.minPanelSize
        );
        if (ne) return { panel: ne, edge: "float", rect: X };
        const Y = re(A);
        return Y ? { panel: "", space: Y, edge: "float", rect: X } : null;
      }
      return null;
    }
    function re(c) {
      const d = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return d == null ? null : d === "" ? [] : d.split("/").map(Number);
    }
    function _e() {
      const c = I.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((d) => d.closest(".dc-window") === c).filter((d) => !d.querySelector(".dc-pane")).reverse().flatMap((d) => {
        const v = re(d);
        return v ? [{ element: d, path: v }] : [];
      }) : [];
    }
    function Se(c, d) {
      for (const { element: v, path: M } of _e()) {
        if (v.dataset.dcSpace === "desktop") continue;
        const A = v.getBoundingClientRect();
        if (!(c < A.left || c > A.right || d < A.top || d > A.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Xe(c) {
      return L().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let Ge = null;
    const Ye = (c) => c.altKey;
    function Qe(c, d) {
      if (!ve(c) || k.value || $.value || d.button !== 0) return;
      const v = d.clientX, M = d.clientY;
      let A = !1, F = Ye(d);
      const ie = () => {
        const ce = C.value;
        ce && (g.value = F ? le(ce.x, ce.y, c) : x(ce.x, ce.y, c));
      }, ne = (ce) => {
        if (!A) {
          if (Math.hypot(ce.clientX - v, ce.clientY - M) < 4) return;
          A = !0, k.value = c, y.value = null;
        }
        F = Ye(ce), b.value = !F, C.value = { x: ce.clientX, y: ce.clientY }, ie();
      }, B = (ce) => {
        Ye(ce) !== F && (F = !F, b.value = !F, A && ie());
      }, X = (ce) => {
        Ge?.();
        const Q = g.value, xe = f.value;
        if (ce && A && Q && xe) {
          const Ze = Q.space ? Ps(xe, c, Q.space, Q.rect) : Q.edge === "float" && Q.rect ? Es(xe, c, Q.panel, Q.rect) : Qt(xe, c, Q.panel, Q.edge, Q.index);
          j(Ze, {
            panel: c,
            target: Q.panel,
            edge: Q.edge,
            ...Q.space === void 0 ? {} : { space: Q.space },
            ...Q.index === void 0 ? {} : { index: Q.index },
            ...Q.rect === void 0 ? {} : { rect: Q.rect }
          });
        }
        k.value = null, g.value = null, C.value = null, b.value = !0;
      }, Y = () => X(!0), oe = () => X(!1), me = (ce) => {
        if (ce.key === "Escape") {
          X(!1);
          return;
        }
        B(ce);
      };
      Ge = () => {
        window.removeEventListener("pointermove", ne), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", oe), window.removeEventListener("keydown", me), window.removeEventListener("keyup", B), Ge = null;
      }, window.addEventListener("pointermove", ne), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", oe), window.addEventListener("keydown", me), window.addEventListener("keyup", B);
    }
    He(() => Ge?.());
    let Ne = null;
    function Oe(c) {
      const d = I.value;
      return d ? [...d.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((A) => A.closest(".dc-window") === d)?.parentElement ?? null : null;
    }
    function Ke(c) {
      const d = f.value;
      return d ? An(d, c) : null;
    }
    function xt(c) {
      const d = f.value;
      if (!d) return;
      const v = Rt(d, c);
      v !== d && (l.value = v);
    }
    function Xt(c) {
      const d = Ke(c);
      d && xt(d);
    }
    function N(c) {
      const d = f.value, v = d ? be(d, c) : null;
      return v !== null && Je(v);
    }
    function q(c) {
      const d = f.value, v = d ? be(d, c) : null;
      return v !== null && lt(v);
    }
    function te(c) {
      const d = f.value, v = d ? at(d, c) : null;
      return v ? Ce(v.node) : "";
    }
    function Me(c) {
      const d = f.value, v = d ? at(d, c) : null;
      if (!d || !v) return;
      const M = Ce(v.node);
      if (i.value.get(M)?.fixed === !0) return;
      const A = !lt(v);
      let F = Uc(d, c, A);
      F !== d && (A || (F = Rt(F, c)), l.value = F, a("frame-minimize", { panel: M, minimized: A }));
    }
    function $e(c) {
      const d = Ke(c);
      d && Me(d);
    }
    function Ct(c) {
      const d = f.value, v = d ? at(d, c) : null;
      if (!d || !v) return;
      const M = Ce(v.node);
      if (i.value.get(M)?.fixed === !0) return;
      const A = !Je(v);
      let F = Wc(d, c, A);
      F !== d && (A && (F = Rt(F, c)), l.value = F, a("frame-maximize", { panel: M, maximized: A }));
    }
    function ls(c) {
      const d = Ke(c);
      d && Ct(d);
    }
    function rs(c, d, v) {
      const M = f.value, A = M ? at(M, c) : null;
      if (!M || !A || d.button !== 0 || k.value || $.value) return;
      const F = Ce(A.node);
      if (i.value.get(F)?.fixed === !0 || Je(A) || lt(A) || (v === "move" ? !s.movable : !s.resizable)) return;
      const ie = Oe(c), ne = Hc(M, c);
      xt(c);
      const B = { w: ie?.clientWidth ?? 0, h: ie?.clientHeight ?? 0 }, X = { ...A.rect }, Y = d.clientX, oe = d.clientY, me = s.minPanelSize;
      $.value = F;
      const ce = (Ee) => {
        const Ve = f.value;
        if (!Ve) return;
        const Mt = Ss(Ve, ne, gn(Ee, B, me));
        Mt !== Ve && (l.value = Mt);
      }, Q = (Ee) => {
        Ee.preventDefault();
        const Ve = Ee.clientX - Y, Mt = Ee.clientY - oe;
        ce(
          v === "move" ? { ...X, x: X.x + Ve, y: X.y + Mt } : Ms(X, v, Ve, Mt, me)
        );
      }, xe = (Ee) => {
        if (Ne?.(), $.value = null, !Ee) {
          ce(X);
          return;
        }
        const Ve = f.value ? at(f.value, ne) : null;
        Ve && a("frame-change", { panel: te(ne), rect: Ve.rect });
      }, Ze = () => xe(!0), nt = () => xe(!1), st = (Ee) => {
        Ee.key === "Escape" && xe(!1);
      };
      Ne = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", nt), window.removeEventListener("keydown", st), Ne = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", nt), window.addEventListener("keydown", st);
    }
    function Da(c, d, v) {
      const M = Ke(c);
      M && rs(M, d, v);
    }
    function Ia(c, d, v = !1) {
      const M = f.value, A = Ke(c), F = M && A ? at(M, A) : null;
      if (!M || !A || !F || i.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Je(F) || lt(F)) {
        T.value = `${Le(c)} is ${Je(F) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ie = d === "left" ? -Zt : d === "right" ? Zt : 0, ne = d === "up" ? -Zt : d === "down" ? Zt : 0, B = Oe(A), X = { w: B?.clientWidth ?? 0, h: B?.clientHeight ?? 0 }, Y = v ? Ms(F.rect, "se", ie, ne, s.minPanelSize) : { ...F.rect, x: F.rect.x + ie, y: F.rect.y + ne }, oe = Ss(M, A, gn(Y, X, s.minPanelSize));
      if (oe === M) {
        T.value = v ? `${Le(c)} cannot be resized further.` : `${Le(c)} cannot move ${d}.`;
        return;
      }
      l.value = oe;
      const me = at(oe, A);
      me && (a("frame-change", { panel: c, rect: me.rect }), T.value = v ? `${Le(c)} resized to ${me.rect.w} by ${me.rect.h}.` : `${Le(c)} moved to ${me.rect.x}, ${me.rect.y}.`);
    }
    He(() => Ne?.());
    function Na(c, d) {
      const v = S(c), M = v?.element.getBoundingClientRect();
      if (!v || !M) return null;
      const A = d === "left" || d === "right", F = (B) => {
        if (!(A ? B.bottom > M.top + 1 && B.top < M.bottom - 1 : B.right > M.left + 1 && B.left < M.right - 1)) return null;
        const Y = d === "left" ? M.left - B.right : d === "right" ? B.left - M.right : d === "up" ? M.top - B.bottom : B.top - M.bottom;
        return Y < -1 ? null : Y;
      }, ie = [];
      for (const B of L()) {
        if (B === v || B.element === v.element) continue;
        const X = F(B.element.getBoundingClientRect());
        if (X === null) continue;
        const Y = B.panels.find((oe) => oe !== c);
        Y && ie.push({ to: { panel: Y }, distance: X });
      }
      for (const { element: B, path: X } of _e()) {
        const Y = F(B.getBoundingClientRect());
        Y !== null && ie.push({ to: { space: X }, distance: Y });
      }
      return ie.reduce(
        (B, X) => B && B.distance <= X.distance ? B : X,
        null
      )?.to ?? null;
    }
    function Oa(c) {
      const d = f.value ? be(f.value, c) !== null : !1;
      if (!d && !ve(c)) return;
      y.value = y.value === c ? null : c;
      const v = Le(c);
      if (!y.value) {
        T.value = `${v}: move mode off.`;
        return;
      }
      T.value = d ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Le = (c) => i.value.get(c)?.title ?? c, Ka = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Va(c, d, v = !1) {
      if (!ve(c)) return;
      const M = f.value;
      if (!M) return;
      const A = Le(c), F = pt(M, c);
      if (!v && F && (d === "left" || d === "right") && F.panels.length > 1) {
        const oe = F.panels.indexOf(c), me = d === "left" ? oe - 1 : oe + 1;
        if (me >= 0 && me < F.panels.length) {
          j(Tt(M, c, me), { panel: c, target: c, edge: "center", index: me }), T.value = `${A} moved ${d}, now tab ${me + 1} of ${F.panels.length}.`, fn(c);
          return;
        }
      }
      const ne = Na(c, d);
      if (!ne || ne.panel !== void 0 && !ve(ne.panel)) {
        T.value = `${A} cannot move ${d}.`;
        return;
      }
      const B = Ka[d];
      if (ne.space) {
        const oe = ne.space, me = tt(M, oe), ce = be(M, c)?.rect, Q = { ...rt, ...ce ? { w: ce.w, h: ce.h } : {} };
        j(Ps(M, c, oe, Q), { panel: c, target: "", space: oe, edge: B }), T.value = `${A} moved ${d}, into ${me ? kt(me) : "the space"}.`, fn(c);
        return;
      }
      const X = ne.panel, Y = F?.panels.length === 1 && pt(M, X)?.panels.length === 1;
      v ? (j(Qt(M, c, X, "center"), {
        panel: c,
        target: X,
        edge: "center"
      }), T.value = `${A} joined ${Le(X)} as a tab.`) : Y ? (j(nn(M, c, X), { panel: c, target: X, edge: B }), T.value = `${A} moved ${d}, trading places with ${Le(X)}.`) : (j(Qt(M, c, X, B), { panel: c, target: X, edge: B }), T.value = `${A} moved ${d}, beside ${Le(X)}.`), fn(c);
    }
    function fn(c) {
      Dt(() => {
        S(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Ba(c, d) {
      const v = f.value;
      v && (l.value = sn(v, c, d));
    }
    function pn(c) {
      const d = f.value;
      if (!d) return;
      const v = mt(d, c);
      v !== d && (l.value = v, a("tab-select", { panel: c }));
    }
    function os(c) {
      return i.value.get(c)?.closable ?? s.closable;
    }
    function qa(c) {
      os(c) && a("panel-close", c);
    }
    const vn = W(/* @__PURE__ */ new Map());
    let Wa = 0;
    function Ua(c, d) {
      const v = Wa += 1;
      return vn.value.set(v, { panel: c, items: d }), () => {
        vn.value.delete(v);
      };
    }
    function Ha(c) {
      const d = [];
      for (const v of vn.value.values())
        v.panel() === c && d.push(...v.items());
      return d;
    }
    function is(c) {
      const d = c.filter((v) => v.items.length > 0);
      return d.length < 2 ? d.flatMap((v) => v.items) : d.flatMap((v) => [
        { id: v.id, heading: !0, label: v.title },
        ...v.items
      ]);
    }
    const cs = (c) => c.title || "These tabs";
    function ja(c, d) {
      const v = d.id, M = pt(c, v), A = (M?.panels.length ?? 0) > 1, F = M?.fixedView === !0, ie = (Y) => ({
        action: () => {
          Y !== c && (l.value = Y);
        }
      }), ne = [], B = [], X = d.views ?? [];
      if (X.length > 1 && !F) {
        const Y = R(v);
        ne.push({
          id: "view",
          label: "View",
          items: X.map((oe) => ({
            id: `view-${oe.key}`,
            label: oe.label,
            checked: oe.key === Y,
            action: () => G(v, oe.key)
          }))
        });
      }
      return A && !F && B.push(
        { id: "show-row", label: "Row", checked: !1, ...ie(As(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ie(As(c, v, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ie(Yc(c, v))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ie(Qc(c, v))
        }
      ), A && M && (B.length && B.push({ separator: !0 }), B.push(...us(M, v))), { panel: ne, tabs: B, tabsTitle: M ? cs(M) : "" };
    }
    function us(c, d) {
      const v = ut(c), M = (A) => {
        const F = c.panels[(v + A + c.panels.length) % c.panels.length];
        return (F === void 0 ? "" : Ce(F)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => pn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => pn(M(-1)) }
      ];
    }
    function Gt(c) {
      return c.title ? c.title : U(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : kt(c);
    }
    function ds(c) {
      if (!c || Z(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Te(c)) return null;
      const d = La(c);
      return d && d.fixedView !== !0 ? d : null;
    }
    function Xa(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const v = tt(d, c);
      if (!v || U(v)) return [];
      if (v.fixedView) return [];
      const M = Z(v) ? "desktop" : v.direction, A = (Q, xe, Ze) => ({
        id: `show-${Q}`,
        label: xe,
        checked: M === Q,
        action: () => {
          const nt = f.value, st = Ze();
          !nt || st === v || (l.value = cn(ye(it(nt, c, st))));
        }
      }), F = () => {
        const Q = Aa(v, Ga(v));
        if (U(Q) && Q.panels.length === 0) return v;
        const xe = U(Q) && Q.panels.length === 1 ? Q.panels[0] : void 0;
        return xe !== void 0 && fe(xe) ? v : Q;
      }, ie = (Q) => () => Z(v) ? Ta(v, Q) : v.direction === Q ? v : { ...v, direction: Q }, ne = c.slice(0, -1), B = c.length > 0 ? tt(d, ne) : null, X = B && U(B) && B.panels.length > 1 ? B : null, Y = B && ds(B) === v ? B : null, oe = ds(v), me = v.title || "this space", ce = (Q, xe, Ze, nt, st) => ({
        id: Q,
        label: st,
        action: () => {
          const Ee = f.value;
          Ee && (l.value = cn(ye(it(Ee, xe, eu(Ze, nt)))));
        }
      });
      return is([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: v.title || "This space",
          items: [
            A("row", "Row", ie("row")),
            A("column", "Column", ie("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            A("tabs", "Tabs", () => F()),
            A("desktop", "Desktop", () => Z(v) ? v : Ra(v))
          ]
        },
        {
          id: "about-around",
          title: oe ? `Around ${Gt(oe)}` : "",
          items: oe ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...oe.title ? [] : [ce("merge-around-keep-this", c, v, "outer", `Keep ${me}`)],
            ...v.title ? [] : [ce("merge-around-keep-that", c, v, "inner", `Keep ${Gt(oe)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Y ? `Inside ${Gt(Y)}` : "",
          items: Y ? [
            ...v.title ? [] : [ce("merge-inside-keep-that", ne, Y, "outer", `Keep ${Gt(Y)}`)],
            ...Y.title ? [] : [ce("merge-inside-keep-this", ne, Y, "inner", `Keep ${me}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: X ? cs(X) : "",
          items: X ? us(X, Ce(v)) : []
        }
      ]);
    }
    function Ga(c) {
      const d = w.value;
      return d && ae(c, d) ? d : void 0;
    }
    function Ya(c) {
      const d = f.value, v = i.value.get(c);
      if (!d || !v) return [];
      const M = s.menu ? ja(d, v) : null, A = Ha(c);
      A.length && M?.panel.length && A.push({ separator: !0 }), M && A.push(...M.panel);
      const F = is([
        { id: "about-panel", title: v.title, items: A },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, F) : F;
    }
    function Qa(c, d) {
      return o[`${c}-${d}`] ?? o[c];
    }
    function fs(c, d, v, M) {
      return Qa(c, d.id)?.({ panel: d, view: v, active: M });
    }
    su({
      panelFor: (c) => i.value.get(c) ?? null,
      viewFor: R,
      setView: G,
      movable: m(() => s.movable),
      resizable: m(() => s.resizable),
      minPanelSize: m(() => s.minPanelSize),
      spaceNames: m(() => s.spaceNames),
      focused: w,
      dragging: k,
      dropTarget: g,
      moving: y,
      framing: $,
      canMove: ve,
      focus(c) {
        w.value !== c && (w.value = c, a("panel-activate", c));
      },
      selectPanel: pn,
      beginDrag: Qe,
      toggleMoveMode: Oa,
      nudge: Va,
      setSizes: Ba,
      frameOf: (c) => f.value ? be(f.value, c) : null,
      beginFrameDrag: Da,
      nudgeFrame: Ia,
      raise: Xt,
      maximized: N,
      toggleMaximize: ls,
      minimized: q,
      toggleMinimize: $e,
      beginFrameDragAt: rs,
      raiseAt: xt,
      toggleMaximizeAt: Ct,
      toggleMinimizeAt: Me,
      menuFor: Ya,
      spaceMenu: Xa,
      registerMenu: Ua,
      closable: os,
      close: qa,
      renderContent: (c, d, v) => fs("panel", c, d, v),
      renderActions: (c, d, v) => fs("actions", c, d, v),
      layout: f
    });
    const Za = m(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), Ja = () => {
      const c = k.value, d = C.value;
      return !c || !d ? null : nl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${d.x}px`, top: `${d.y}px` },
          "aria-hidden": "true"
        },
        i.value.get(c)?.title ?? c
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: f,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(c, d, v, M) {
        const A = f.value;
        A && j(Qt(A, c, d, v, M), {
          panel: c,
          target: d,
          edge: v,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const d = f.value;
        d && (l.value = mt(d, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, d, v) {
        const M = f.value;
        M && j(Es(M, c, d, v), {
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
        const M = Vc(v, c, d);
        if (M === v) return;
        l.value = M;
        const A = be(M, c);
        A && a("frame-change", { panel: c, rect: A.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: G,
      /** Brings a floating frame to the front of its stack. */
      raise: Xt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ls,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: $e
    }), (c, d) => (p(), h("div", {
      ref_key: "root",
      ref: I,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": k.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Re(Za.value)
    }, [
      f.value ? (p(), se(Yu, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (p(), h("p", Zu, " This window has no panels. ")),
      he(Ja),
      _("p", Ju, z(T.value), 1)
    ], 12, Qu));
  }
}), td = /* @__PURE__ */ pe(ed, [["__scopeId", "data-v-711565af"]]);
function kd(e = "", t = "/") {
  const n = W(We(e)), s = W(t), a = [`${s.value}${n.value}`];
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
function Ts(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function wd(e) {
  const t = W(Ts(e.currentRoute.value.fullPath)), n = m(() => e.currentRoute.value.path), s = ke(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Ts(a);
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
const nd = {
  DataShell: _c,
  ShellHeader: la,
  QueryPanel: oa,
  RecordActions: ia,
  ResultsArea: _a,
  FacetControl: ra,
  SegmentedControl: wc,
  StatusPill: Vt,
  WindowFrame: td,
  WindowPane: Fa,
  ListView: Mn,
  CardsView: da,
  GridView: fa,
  TableView: ma,
  LinksView: pa,
  PreviewView: va,
  TypeCardsView: ha
}, bd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(nd))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ns, t.route);
  }
};
export {
  on as CASCADE_STEP,
  rd as COLUMN_BREAKPOINTS,
  ld as COLUMN_ROLES,
  da as CardsView,
  xs as ColumnCell,
  rt as DEFAULT_FRAME,
  bn as DEFAULT_SORT,
  al as DEFAULT_VIEW,
  _c as DataShell,
  $n as EMPTY_CELL,
  ea as ENTITY_ALL,
  rn as ENTITY_TERM,
  Nt as EXPRESSION_TERM,
  Wn as FACET_PREFIX,
  ra as FacetControl,
  fa as GridView,
  bd as HeaderContentLayoutPlugin,
  pa as LinksView,
  Mn as ListView,
  dt as MINIMIZED_GAP,
  ka as MINIMIZED_HEIGHT,
  Sn as MINIMIZED_WIDTH,
  ya as MIN_FRAME,
  ks as MOCK_TINTS,
  id as MenuBar,
  Hn as MenuButton,
  ga as MenuList,
  Bt as MetricDrill,
  as as PANE_CONTEXT_KEY,
  Vn as PARAM_DIR,
  Nn as PARAM_ENTITY,
  Bn as PARAM_EXPR,
  qn as PARAM_PAGE,
  Kn as PARAM_SORT,
  On as PARAM_VIEW,
  Un as PinStar,
  va as PreviewView,
  oa as QueryPanel,
  Yt as RECORD_STATUSES,
  js as RESULT_FIELDS,
  Ns as ROUTE_ADAPTER_KEY,
  ia as RecordActions,
  _a as ResultsArea,
  Js as SHELL_CONTEXT_KEY,
  ad as SHELL_THEMES,
  qt as ScopeMark,
  wc as SegmentedControl,
  bt as SelectTick,
  la as ShellHeader,
  Vt as StatusPill,
  ma as TableView,
  ha as TypeCardsView,
  Os as VIEW_KINDS,
  ll as VIEW_LABELS,
  ns as WINDOW_CONTEXT_KEY,
  td as WindowFrame,
  Fa as WindowPane,
  ba as activePanel,
  ut as activeTab,
  Vl as addTerm,
  Oc as axisOf,
  Gn as cascade,
  Ys as cellFull,
  Ot as cellText,
  en as cellTextOf,
  Ae as cellValue,
  vs as changesResults,
  gn as clampRect,
  Aa as collapseSpace,
  Yc as collapseToTabs,
  ud as column,
  hs as columnAlign,
  _s as columnClass,
  ms as columnKey,
  xn as columnTruncates,
  fl as columnsFor,
  ol as countPages,
  sl as createHistoryAdapter,
  kd as createMemoryAdapter,
  Il as createMockDataSource,
  wd as createVueRouterAdapter,
  ml as defaultCellText,
  Rs as defaultLayout,
  In as defaultQuery,
  Bl as drillExpression,
  Ps as dropIntoSpace,
  It as emptyFacetState,
  Ln as emptyFacetValue,
  ft as findEntity,
  et as findSort,
  fd as fixedView,
  Xn as float,
  Es as floatPanel,
  Ra as floatSplit,
  Qc as floatTabs,
  Jt as fnv1a,
  Bs as focusEntity,
  cl as formatCount,
  ul as formatDate,
  Cl as formatExpression,
  il as formatMetric,
  dl as formatOrdinal,
  Kt as formatTerm,
  un as frame,
  at as frameAt,
  be as frameOf,
  An as framePathOf,
  Ce as frontPanel,
  Ll as generateRows,
  cd as group,
  pt as groupOf,
  Kc as groups,
  Hs as hasActiveFacets,
  ae as hasPanel,
  dd as headless,
  Et as insertPanel,
  zt as isChoosable,
  od as isEntityScoped,
  Us as isFacetActive,
  Z as isFloat,
  U as isGroup,
  Je as isMaximized,
  lt as isMinimized,
  fe as isPanelTab,
  Fn as isPristineQuery,
  $t as isSplit,
  Pe as isTabOf,
  Dn as isTypeCardsQuery,
  Ks as isViewKind,
  ys as joinExpression,
  xl as matchesExpression,
  Fl as matchesFacets,
  Bc as maximizeFrame,
  Wc as maximizeFrameAt,
  eu as mergeSpace,
  qc as minimizeFrame,
  Uc as minimizeFrameAt,
  Qt as movePanel,
  Tt as moveTab,
  tt as nodeAt,
  Lt as nodeTitle,
  ye as normalizeLayout,
  We as normalizeSearch,
  es as normalizeSizes,
  La as onlySpace,
  je as panelIds,
  Ie as panelNode,
  Cs as panelTabs,
  yt as parseExpression,
  Yl as parseQuery,
  fo as presentParts,
  ca as presentRow,
  wu as providePaneContext,
  Wl as provideShellContext,
  su as provideWindowContext,
  yn as raiseFrame,
  Rt as raiseFrameAt,
  Hc as raisedPath,
  Xs as reconcileFacets,
  nu as reconcileLayout,
  Zs as recordTerm,
  ot as removePanel,
  it as replaceAt,
  Ms as resizeRect,
  zs as resizeSplit,
  Vs as resolveView,
  ze as roleColumn,
  Gs as roleColumns,
  cn as rootSpace,
  Qn as row,
  vl as rowKey,
  Nl as scopeTerm,
  Ol as scopeTermFor,
  ql as scopedEntity,
  $s as serializeQuery,
  mt as setActivePanel,
  Vc as setFrameRect,
  Ss as setFrameRectAt,
  sn as setSizesAt,
  md as setSplitDirection,
  Ue as sizesOf,
  Ws as sortsFor,
  ge as spaceChrome,
  kt as spaceTitle,
  Yn as split,
  Sl as splitExpression,
  As as spreadTabs,
  Zl as summarizeQuery,
  sa as summaryTerms,
  nn as swapPanels,
  jn as tabNode,
  Ut as tabPanels,
  Ta as tileFloat,
  hd as toFloat,
  _d as toTiled,
  pd as toggleMaximized,
  vd as toggleMinimized,
  xi as useColumns,
  Ki as useEntityPreviews,
  gd as usePaneContext,
  yd as usePaneMenu,
  wt as usePresentedRows,
  Jl as useQueryState,
  sr as useRecordNames,
  er as useResults,
  we as useShellContext,
  ss as useWindowContext,
  Ml as withoutTerm
};
