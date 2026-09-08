import { ref as U, inject as _t, provide as Rn, computed as h, toValue as St, shallowRef as Ft, watch as ke, onScopeDispose as Fs, defineComponent as de, onBeforeUnmount as He, openBlock as p, createElementBlock as m, createElementVNode as _, toDisplayString as T, unref as E, Fragment as J, renderList as ue, createCommentVNode as I, renderSlot as qe, withDirectives as kn, withKeys as Pt, withModifiers as Fe, vModelText as wn, useSlots as Tn, nextTick as Dt, createBlock as se, createTextVNode as De, createVNode as he, withCtx as gt, normalizeStyle as Re, resolveDynamicComponent as Ds, normalizeClass as an, useModel as At, useId as Is, createSlots as ps, mergeModels as ln, onMounted as tl, resolveComponent as Ns, getCurrentScope as nl, h as sl } from "vue";
const Os = Symbol("dc.routeAdapter");
function We(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function al() {
  const e = typeof window < "u", t = U(e ? We(window.location.search) : ""), n = U(e ? window.location.pathname : "/"), s = () => {
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
const Ks = ["list", "cards", "grid", "table", "links", "preview"], ad = [
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
], rd = [480, 620, 760, 900, 1100], ll = "cards", bn = "updated";
function Vs(e) {
  return typeof e == "string" && Ks.includes(e);
}
const rl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Bs(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function ft(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function qs(e, t = {}) {
  const n = ft(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Ws(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Us(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Ws(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const ol = { key: bn, label: bn };
function et(e, t, n = null) {
  const s = Us(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === bn) ?? s[0] ?? ol;
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
function Hs(e) {
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
function js(e) {
  return Object.values(e).some(Hs);
}
function Fn(e) {
  return e.entity === null && e.expr.trim() === "" && !js(e.facets);
}
function od(e) {
  return e.entity !== null;
}
function Dn(e) {
  return e.entity === null && e.view === "cards";
}
function il(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function In(e, t = {}) {
  const s = t.landing === "entity" ? qs(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Vs(t.view) ? t.view : ll,
    sort: et(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: It(s),
    page: 1
  };
}
const Xs = ["entity", "sort", "dir", "expr", "facets"];
function vs(e) {
  return Xs.some((t) => t in e);
}
function Gs(e, t) {
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
function cl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function ms(e) {
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
function Ys(e, t) {
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
function hs(e, t) {
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
  const n = Ae(e, t);
  return e.format ? e.format(n, t) : ml(n, e.kind);
}
function hl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Qs(e, t) {
  const n = Ot(e, t), s = hl(Ae(e, t));
  return s && s !== n ? s : n;
}
function en(e, t) {
  return e ? Ot(e, t) : "";
}
function _s(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const _l = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function gs(e) {
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
    const u = Ys(a, "metric")[Number(i[1]) - 1];
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
function ys(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Kt(e) {
  return e.kind === "text" ? ys(e.value) : `${e.field}${e.comparator}${ys(e.value)}`;
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
function ks(e, t) {
  return [...e.map(Kt), t.trim()].filter(Boolean).join(" ");
}
const ws = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Zs(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const El = 7, Pl = 3;
function Al(e, t, n, s) {
  const a = (t * El + Jt(n)) % s, l = [];
  for (let r = 0; r < Math.min(Pl, s); r++)
    l.push(Zs(e, (a + r) % s));
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
      return ws[n % ws.length];
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
    const u = l[i % l.length], f = Math.floor(i / l.length), w = Jt(`${s}:${e.key}:${u[0]}:${i}`), k = Zs(e.key, i), y = new Date(a.getTime() - w % 900 * 36e5).toISOString(), b = {};
    for (const g of e.columns ?? []) {
      const $ = g.field ?? g.key;
      if (!$ || g.value) continue;
      const x = Tl(g, {
        hash: Jt(`${w}:${$}`),
        sample: u,
        revision: f,
        updatedAt: y
      });
      x !== void 0 && (b[$] = x);
    }
    for (const g of e.facets)
      b[g.key] = zl(g, Jt(`${w}:${g.key}`));
    for (const [g, $] of r)
      b[g] = $ === e.key ? k : Al($, i, g, n);
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
        for (const g of n(b, a))
          f.push(g), (l ? Fl(g, s.facets) : !0) && xl(i, g, b) && w.push(g);
      const k = et(l, s.sort, a), y = w.sort(Dl(Ws(l, a), k.key));
      return s.dir === "asc" && y.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: y.slice(o, o + r),
        total: w.length,
        unfiltered: w.length === f.length
      };
    }
  };
}
function Nl(e, t) {
  return Js(e, t.id);
}
function Js(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Ol(e, t) {
  return Nl(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
const bs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Kl(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && bs(e.value, t.value) : t.kind === "text" && bs(e.value, t.value);
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
const ea = Symbol("dc.shellContext");
function Wl(e) {
  return Rn(ea, e), e;
}
function we() {
  const e = _t(ea, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Nn = "e", On = "v", Kn = "s", Vn = "d", Bn = "q", qn = "p", Wn = "f_", ta = "*", Ul = [
  Nn,
  On,
  Kn,
  Vn,
  Bn,
  qn
], Cn = "..", na = ",", Hl = [
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
function sa(e) {
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
function $s(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Xl(e, t) {
  const n = Be(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(na).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => s.has(l)) };
    }
    case "range": {
      const s = n.indexOf(Cn), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + Cn.length)).trim(), r = a === "" ? null : Number(a), o = l === "" ? null : Number(l);
      let i = r !== null && Number.isFinite(r) ? $s(r, e.min, e.max) : null, u = o !== null && Number.isFinite(o) ? $s(o, e.min, e.max) : null;
      return i !== null && u !== null && i > u && ([i, u] = [u, i]), { kind: "range", min: i, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Gl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(na) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Cn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Yl(e, t, n = {}) {
  const s = In(t, n), a = new Map(sa(e)), l = a.get(Nn), r = l === void 0 ? s.entity : Be(l), o = r === ta ? null : ft(t, r), i = a.get(On), u = i && Vs(Be(i)) ? Be(i) : s.view, f = a.get(Kn), w = et(o, f ? Be(f) : n.sort, t), k = a.get(Vn), y = k ? Be(k) === "asc" ? "asc" : "desc" : s.dir, b = a.get(Bn), g = a.get(qn), $ = g === void 0 ? 1 : Number(Be(g)), x = Number.isFinite($) ? Math.max(1, Math.floor($)) : 1, L = {};
  for (const N of o?.facets ?? []) {
    const F = a.get(`${Wn}${N.key}`);
    L[N.key] = F === void 0 ? Ln(N) : Xl(N, F);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: w.key,
    dir: y,
    expr: b === void 0 ? "" : Be(b),
    facets: Gs(o, L),
    page: x
  };
}
function xs(e, t, n = {}, s = "") {
  const a = In(t, n), l = ft(t, e.entity), r = sa(s).filter(([w]) => !jl(w)), o = [], i = (w, k) => o.push([w, _n(k)]), u = l?.key ?? null;
  u !== a.entity && i(Nn, u ?? ta), e.view !== a.view && i(On, e.view), e.sort !== a.sort && i(Kn, e.sort), e.dir !== a.dir && i(Vn, e.dir), e.expr.trim() !== "" && i(Bn, e.expr);
  for (const w of l?.facets ?? []) {
    const k = e.facets[w.key];
    if (!k) continue;
    const y = Gl(k, w);
    y !== null && o.push([`${Wn}${w.key}`, _n(y)]);
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
function aa(e, t) {
  const n = [];
  t && n.push({
    id: rn,
    label: `entity:${t.key}`,
    facetKey: rn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Hs(a) && n.push(...Ql(s, a));
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
  const s = aa(e, t).filter((l) => l.facetKey !== Nt).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function Jl(e) {
  const { adapter: t } = e, n = h(() => St(e.schema)), s = h(() => St(e.defaults) ?? {}), a = h(() => Yl(t.search.value, n.value, s.value)), l = h(() => ft(n.value, a.value.entity)), r = h(() => l.value ?? qs(n.value, s.value)), o = h(() => Us(l.value, n.value)), i = h(() => et(l.value, a.value.sort, n.value)), u = ($, x) => {
    const L = xs($, n.value, s.value, t.search.value);
    L !== t.search.value && (x === "push" ? t.push(L) : t.replace(L));
  }, f = () => St(e.navigationMode) ?? "push", w = () => St(e.facetNavigationMode) ?? "replace", k = ($, x) => {
    const L = $.page ?? (vs($) ? 1 : a.value.page);
    u({ ...a.value, ...$, page: L }, x);
  }, y = ($, x) => {
    const L = a.value.facets[$];
    if (!L) return;
    const N = { ...a.value.facets, [$]: x(L) };
    k({ facets: N }, w());
  }, b = ($) => {
    const x = $ === null ? null : ft(n.value, $);
    return (x?.key ?? null) === a.value.entity ? {} : {
      entity: x?.key ?? null,
      sort: et(x, a.value.sort, n.value).key,
      facets: It(x)
    };
  }, g = ($) => {
    const x = b($);
    Object.keys(x).length && k(x, f());
  };
  return {
    query: a,
    entity: l,
    focus: r,
    sort: i,
    sorts: o,
    summary: h(() => Zl(a.value, l.value, n.value)),
    terms: h(() => aa(a.value, l.value)),
    isPristine: h(() => Fn(a.value)),
    isEverything: h(() => a.value.entity === null),
    hasFacets: h(() => js(a.value.facets)),
    setEntity: g,
    clearEntity: () => g(null),
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
    narrow($, x) {
      k({ expr: $, ...b(x) }, f());
    },
    setPage($, x) {
      k({ page: Math.max(1, Math.floor($)) }, x ?? f());
    },
    setFacet($, x) {
      y($, () => x);
    },
    toggleChip($, x) {
      y($, (L) => L.kind !== "chips" ? L : { kind: "chips", selected: L.selected.includes(x) ? L.selected.filter((F) => F !== x) : [...L.selected, x] });
    },
    setRange($, x, L) {
      y($, (N) => N.kind === "range" ? { kind: "range", min: x, max: L } : N);
    },
    toggleFlag($) {
      y(
        $,
        (x) => x.kind === "toggle" ? { kind: "toggle", on: !x.on } : x
      );
    },
    removeTerm($) {
      if ($.facetKey === rn) {
        g(null);
        return;
      }
      if ($.facetKey === Nt) {
        const x = Ml(yt(a.value.expr), $.group ?? 0, $.index ?? 0);
        k({ expr: Cl(x) }, f());
        return;
      }
      y($.facetKey, (x) => x.kind === "chips" && $.option ? { kind: "chips", selected: x.selected.filter((L) => L !== $.option) } : x.kind === "range" ? { kind: "range", min: null, max: null } : x.kind === "toggle" ? { kind: "toggle", on: !1 } : x);
    },
    clearFilters() {
      k({ entity: null, expr: "", facets: It(null) }, f());
    },
    reset() {
      u(In(n.value, s.value), f());
    },
    hrefFor($) {
      const x = { ...a.value, ...$ };
      return x.page = $.page ?? (vs($) ? 1 : a.value.page), x.facets = Gs(ft(n.value, x.entity), x.facets), `${t.path.value}${xs(x, n.value, s.value, t.search.value)}`;
    }
  };
}
function er(e) {
  const t = Ft([]), n = U(0), s = U(!1), a = Ft(null);
  let l = 0, r = null;
  const o = h(() => (e.query.value.page - 1) * e.limit.value), i = h(() => il(n.value, e.limit.value)), u = (g) => {
    t.value = g.rows, n.value = g.total, a.value = null;
  }, f = (g) => {
    a.value = g, t.value = [], n.value = 0;
  }, w = (g, $) => {
    let x = !0;
    const L = () => g === l, N = () => {
      x && (x = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return L();
      },
      insert(F, O) {
        if (!L()) return;
        const V = Array.isArray(F) ? F : [F];
        if (!V.length) return;
        N();
        const C = [...t.value];
        C.splice(O ?? C.length, 0, ...V), t.value = $ > 0 ? C.slice(0, $) : C, n.value += V.length;
      },
      set(F) {
        L() && (F.rows && (N(), t.value = $ > 0 ? F.rows.slice(0, $) : F.rows, n.value = F.rows.length), F.total !== void 0 && (n.value = F.total));
      },
      close() {
        L() && (s.value = !1);
      },
      fail(F) {
        L() && (f(F), s.value = !1);
      }
    };
  }, k = () => {
    const g = r;
    r = null, g?.();
  }, y = () => {
    const g = ++l;
    k();
    const $ = {
      query: e.query.value,
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, x = e.source.value;
    if (x.stream) {
      s.value = !0;
      try {
        r = x.stream($, w(g, $.limit)) ?? null;
      } catch (N) {
        f(N), s.value = !1;
      }
      return;
    }
    let L;
    try {
      L = x.query($);
    } catch (N) {
      f(N);
      return;
    }
    if (!(L instanceof Promise)) {
      u(L), s.value = !1;
      return;
    }
    s.value = !0, L.then((N) => {
      g === l && u(N);
    }).catch((N) => {
      g === l && f(N);
    }).finally(() => {
      g === l && (s.value = !1);
    });
  }, b = h(
    () => `${JSON.stringify(Xs.map((g) => e.query.value[g]))}|${e.query.value.page}`
  );
  return ke([e.source, b, e.schema, e.entity, e.limit], y, {
    immediate: !0
  }), Fs(() => {
    l++, k();
  }, !0), { rows: t, total: n, offset: o, pageCount: i, pending: s, error: a, refresh: y };
}
const tr = 25, la = (e, t) => e.toLowerCase() === t.toLowerCase();
function nr(e, t) {
  return e.find((n) => la(n.id, t));
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
        expr: Js(o, i) ?? "",
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
    return i === $n || la(i, o.id) ? "" : i;
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
        const { reference: y } = o[k], b = nr(w.rows, y.id);
        f.set(y.key, b ? a(y.entity, b) : "");
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
    const n = e, s = t, a = we(), l = h(() => a.schema.value), r = h(() => a.hasFacets.value || !!a.query.value.expr.trim());
    function o(S) {
      return S.key === a.query.value.entity && r.value && !n.hideCount ? ms(a.total.value) : S.count;
    }
    function i(S) {
      return `${S.label} · ${o(S)}`;
    }
    const u = h(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${ms(a.total.value)}`), f = h(
      () => (n.views ?? [...Ks]).map((S) => ({ key: S, label: rl[S] }))
    ), w = h(() => Bs(a.query.value.view, n.views));
    function k(S) {
      a.setView(S.target.value);
    }
    const y = h(
      () => a.sorts.value.map((S) => ({ key: S.key, label: S.label }))
    );
    function b(S) {
      a.setSort(S.target.value);
    }
    const g = h(() => a.query.value.dir === "desc"), $ = h(
      () => a.terms.value.filter((S) => S.facetKey !== rn).map((S, q, z) => {
        const P = z[q - 1];
        return {
          term: S,
          or: P?.group !== void 0 && S.group !== void 0 && S.group !== P.group
        };
      })
    ), x = sr({
      source: a.source,
      schema: a.schema,
      query: a.query,
      terms: a.terms
    });
    function L(S) {
      const q = x.nameOf(S);
      return q ? `${S.field}:${q} (${S.value})` : S.label;
    }
    function N(S) {
      const q = S.target.value;
      a.setEntity(q || null);
    }
    function F(S) {
      S.target?.closest("button, select, label") || s("toggle");
    }
    const O = U(null), V = U("");
    function C() {
      const S = O.value;
      if (!S) {
        V.value = "";
        return;
      }
      const q = S.scrollLeft > 1, z = S.scrollWidth - S.clientWidth - S.scrollLeft > 1;
      V.value = q && z ? "both" : q ? "start" : z ? "end" : "";
    }
    let R = null;
    ke(
      O,
      (S) => {
        R?.disconnect(), R = null, C(), !(!S || typeof ResizeObserver > "u") && (R = new ResizeObserver(C), R.observe(S));
      },
      { flush: "post" }
    ), ke($, C, { flush: "post" }), He(() => R?.disconnect());
    const X = h(() => a.query.value.page), ne = h(
      () => a.pageCount.value > 1 && !Dn(a.query.value)
    ), ve = h(() => {
      const S = `Page ${X.value} of ${a.pageCount.value}`, q = a.rows.value.length;
      if (!q) return S;
      const z = a.offset.value + 1;
      return `${S} — rows ${z} to ${z + q - 1} of ${a.total.value}`;
    });
    return (S, q) => (p(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      _("div", {
        class: "dc-header__trigger",
        onClick: F
      }, [
        q[10] || (q[10] = _("span", {
          class: "dc-header__badge",
          "aria-hidden": "true"
        }, "◆", -1)),
        _("span", lr, T(l.value.label), 1),
        _("div", {
          ref_key: "termBar",
          ref: O,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": V.value,
          title: E(a).summary.value,
          onScroll: C
        }, [
          _("label", or, [
            q[5] || (q[5] = _("span", { class: "dc-header__sr" }, "Type", -1)),
            _("span", ir, [
              _("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: E(a).query.value.entity ?? "",
                onChange: N
              }, [
                _("option", ur, T(u.value), 1),
                (p(!0), m(J, null, ue(E(a).entities.value, (z) => (p(), m("option", {
                  key: z.key,
                  value: z.key
                }, T(i(z)), 9, dr))), 128))
              ], 40, cr),
              q[4] || (q[4] = _("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          _("label", fr, [
            q[7] || (q[7] = _("span", { class: "dc-header__sr" }, "View", -1)),
            _("span", pr, [
              _("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: w.value,
                onChange: k
              }, [
                (p(!0), m(J, null, ue(f.value, (z) => (p(), m("option", {
                  key: z.key,
                  value: z.key
                }, T(z.label), 9, mr))), 128))
              ], 40, vr),
              q[6] || (q[6] = _("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          y.value.length ? (p(), m(J, { key: 0 }, [
            _("label", hr, [
              q[9] || (q[9] = _("span", { class: "dc-header__sr" }, "Sort", -1)),
              _("span", _r, [
                _("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: E(a).sort.value.key,
                  onChange: b
                }, [
                  (p(!0), m(J, null, ue(y.value, (z) => (p(), m("option", {
                    key: z.key,
                    value: z.key
                  }, T(z.label), 9, yr))), 128))
                ], 40, gr),
                q[8] || (q[8] = _("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            _("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: g.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${g.value ? "descending" : "ascending"}`,
              onClick: q[0] || (q[0] = (z) => E(a).toggleDirection())
            }, T(g.value ? "↓" : "↑"), 9, kr)
          ], 64)) : I("", !0),
          (p(!0), m(J, null, ue($.value, (z) => (p(), m(J, {
            key: z.term.id
          }, [
            z.or ? (p(), m("span", wr, "or")) : I("", !0),
            _("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${L(z.term)}`,
              "aria-label": `Remove ${L(z.term)}`,
              onClick: (P) => E(a).removeTerm(z.term)
            }, T(L(z.term)), 9, br)
          ], 64))), 128))
        ], 40, rr),
        _("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: q[1] || (q[1] = (z) => s("toggle"))
        }, [
          _("span", xr, T(e.expanded ? "▲" : "▼"), 1),
          _("span", Cr, T(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, $r)
      ]),
      ne.value ? (p(), m("nav", Mr, [
        _("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: X.value <= 1,
          onClick: q[2] || (q[2] = (z) => E(a).setPage(X.value - 1))
        }, [...q[11] || (q[11] = [
          _("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Sr),
        _("span", {
          class: "dc-header__page dc-mono",
          title: ve.value,
          "aria-hidden": "true"
        }, T(X.value) + " / " + T(E(a).pageCount.value), 9, Er),
        _("span", Pr, T(ve.value), 1),
        _("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: X.value >= E(a).pageCount.value,
          onClick: q[3] || (q[3] = (z) => E(a).setPage(X.value + 1))
        }, [...q[12] || (q[12] = [
          _("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Ar)
      ])) : I("", !0),
      S.$slots.actions ? (p(), m("div", zr, [
        qe(S.$slots, "actions", {}, void 0, !0)
      ])) : I("", !0)
    ], 8, ar));
  }
}), pe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ra = /* @__PURE__ */ pe(Rr, [["__scopeId", "data-v-0e63d114"]]), Tr = { class: "dc-facet" }, Lr = ["id"], Fr = { class: "dc-facet__body" }, Dr = ["aria-labelledby"], Ir = ["aria-pressed", "data-dc-active", "onClick"], Nr = ["aria-labelledby"], Or = ["aria-label", "placeholder", "onKeydown"], Kr = ["aria-label", "placeholder", "onKeydown"], Vr = ["aria-checked"], Br = { class: "dc-switch__text" }, qr = ["data-dc-active"], Wr = /* @__PURE__ */ de({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = h(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function l(w) {
      if (n.value.kind !== "chips") return;
      const k = a.value.has(w) ? n.value.selected.filter((y) => y !== w) : [...n.value.selected, w];
      s("update", { kind: "chips", selected: k });
    }
    const r = U(""), o = U("");
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
      const y = Number(k);
      return Number.isFinite(y) ? y : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const w = i(r.value), k = i(o.value);
      w === n.value.min && k === n.value.max || s("update", { kind: "range", min: w, max: k });
    }
    function f() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (w, k) => (p(), m("div", Tr, [
      _("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, T(e.facet.label), 9, Lr),
      _("div", Fr, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (p(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (p(!0), m(J, null, ue(e.facet.options, (y) => (p(), m("button", {
            key: y,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(y),
            "data-dc-active": a.value.has(y) ? "true" : "false",
            onClick: (b) => l(y)
          }, T(y), 9, Ir))), 128))
        ], 8, Dr)) : e.facet.kind === "range" && e.value.kind === "range" ? (p(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          kn(_("input", {
            "onUpdate:modelValue": k[0] || (k[0] = (y) => r.value = y),
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
            "onUpdate:modelValue": k[1] || (k[1] = (y) => o.value = y),
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
        ], 8, Nr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (p(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: f
        }, [
          _("span", Br, T(e.facet.text), 1),
          _("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...k[3] || (k[3] = [
            _("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, qr)
        ], 8, Vr)) : I("", !0)
      ])
    ]));
  }
}), oa = /* @__PURE__ */ pe(Wr, [["__scopeId", "data-v-36d1334b"]]), Ur = ["id"], Hr = { class: "dc-panel__section dc-panel__rows" }, jr = { class: "dc-panel__row" }, Xr = ["for"], Gr = ["title", "aria-label", "onClick"], Yr = ["id", "placeholder", "onKeydown"], Qr = { class: "dc-panel__actions" }, Zr = ["disabled"], Jr = {
  key: 0,
  class: "dc-panel__section"
}, eo = /* @__PURE__ */ de({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Tn(), a = we(), l = h(() => Sl(a.query.value.expr)), r = h(() => l.value.parts.map(Kt)), o = U(l.value.text), i = U(null);
    ke(
      () => l.value.text,
      (g) => {
        o.value = g;
      }
    );
    const u = h(() => o.value !== l.value.text);
    function f() {
      u.value && a.setExpression(ks(l.value.parts, o.value)), n("close");
    }
    function w(g) {
      const { parts: $, text: x } = l.value;
      a.setExpression(ks($.filter((L, N) => N !== g), x));
    }
    function k(g) {
      const { parts: $ } = l.value;
      o.value || !$.length || (g.preventDefault(), w($.length - 1));
    }
    function y() {
      o.value = "", a.clearFilters();
    }
    function b(g, $) {
      a.setFacet(g, $);
    }
    return Dt(() => i.value?.focus()), (g, $) => (p(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: $[2] || ($[2] = Pt(Fe((x) => n("close"), ["stop"]), ["esc"]))
    }, [
      _("section", Hr, [
        _("div", jr, [
          _("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, Xr),
          _("div", {
            class: "dc-field",
            onMousedown: $[1] || ($[1] = Fe((x) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (p(!0), m(J, null, ue(r.value, (x, L) => (p(), m("button", {
              key: `${L}:${x}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${x}`,
              "aria-label": `Remove ${x}`,
              onClick: (N) => w(L)
            }, T(x), 9, Gr))), 128)),
            kn(_("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": $[0] || ($[0] = (x) => o.value = x),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : E(a).schema.value.placeholder,
              onKeydown: [
                Pt(Fe(f, ["prevent"]), ["enter"]),
                Pt(k, ["backspace"])
              ]
            }, null, 40, Yr), [
              [wn, o.value]
            ])
          ], 32)
        ]),
        E(a).entity.value ? (p(!0), m(J, { key: 0 }, ue(E(a).entity.value.facets, (x) => (p(), se(oa, {
          key: x.key,
          facet: x,
          value: E(a).query.value.facets[x.key],
          onUpdate: (L) => b(x.key, L)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : I("", !0),
        _("div", Qr, [
          _("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: f
          }, " Run query "),
          _("button", {
            type: "button",
            class: "dc-button",
            disabled: E(a).isPristine.value && !u.value,
            onClick: y
          }, " Reset ", 8, Zr)
        ])
      ]),
      s["panel-section"] ? (p(), m("section", Jr, [
        qe(g.$slots, "panel-section", {}, void 0, !0)
      ])) : I("", !0)
    ], 40, Ur));
  }
}), ia = /* @__PURE__ */ pe(eo, [["__scopeId", "data-v-2642c02d"]]), to = {
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
    const t = we(), n = h(() => t.entity.value), s = h(() => !Dn(t.query.value)), a = h(() => s.value && t.selectable.value), l = h(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), r = h(() => t.selection.value.ids.length), o = h(() => t.rows.value.filter((k) => t.isSelected(k)).length), i = h(
      () => t.rows.value.length > 0 && o.value === t.rows.value.length
    ), u = h(() => o.value > 0 && !i.value), f = h(() => r.value ? `${r.value} selected` : "Select all");
    function w(k) {
      return r.value ? `${k} ${r.value}` : k;
    }
    return (k, y) => l.value ? (p(), m("div", to, [
      a.value ? (p(), m("div", no, [
        _("label", so, [
          _("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: i.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: y[0] || (y[0] = (b) => E(t).selectPage(!i.value))
          }, null, 40, ao),
          _("span", lo, T(f.value), 1)
        ]),
        r.value ? (p(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[1] || (y[1] = (b) => E(t).clearSelection())
        }, " Clear ")) : I("", !0)
      ])) : I("", !0),
      _("div", ro, [
        n.value?.create ? (p(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: y[2] || (y[2] = (b) => E(t).create(n.value))
        }, [
          y[5] || (y[5] = _("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          De(" " + T(n.value.create), 1)
        ])) : I("", !0),
        n.value?.duplicate ? (p(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !r.value,
          onClick: y[3] || (y[3] = (b) => E(t).duplicate())
        }, T(w(n.value.duplicate)), 9, oo)) : I("", !0),
        n.value?.delete ? (p(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !r.value,
          onClick: y[4] || (y[4] = (b) => E(t).delete())
        }, T(w(n.value.delete)), 9, io)) : I("", !0)
      ])
    ])) : I("", !0);
  }
}), ca = /* @__PURE__ */ pe(co, [["__scopeId", "data-v-ca4aca14"]]);
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
    metrics: Ys(t, "metric").map((a) => ({
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
function ua(e, t, n, s, a = !1) {
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
  const e = we(), t = h(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return h(
    () => e.rows.value.map(
      (n, s) => ua(
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
    return (t, n) => (p(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, T(e.status), 9, po));
  }
}), Vt = /* @__PURE__ */ pe(vo, [["__scopeId", "data-v-23e59fbf"]]), mo = ["title"], ho = { key: 1 }, _o = /* @__PURE__ */ de({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = we(), s = h(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), a = h(() => t.column.label ?? ""), l = h(() => Ot(t.column, t.entry.row));
    function r(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (o, i) => s.value ? (p(), m("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: r
    }, [
      qe(o.$slots, "default", {}, () => [
        De(T(l.value), 1)
      ], !0)
    ], 8, mo)) : (p(), m("span", ho, [
      qe(o.$slots, "default", {}, () => [
        De(T(l.value), 1)
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
    return (a, l) => (p(), m("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, T(e.pinned ? "★" : "☆"), 9, go));
  }
}), Un = /* @__PURE__ */ pe(yo, [["__scopeId", "data-v-ef63d763"]]), ko = ["src"], wo = /* @__PURE__ */ de({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = U(!1);
    return ke(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (s, a) => n.value ? I("", !0) : (p(), m("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: a[0] || (a[0] = (l) => n.value = !0)
    }, null, 40, ko));
  }
}), da = /* @__PURE__ */ pe(wo, [["__scopeId", "data-v-39293cee"]]), bo = ["title", "aria-label"], $o = /* @__PURE__ */ de({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), s = h(() => t.entry.entity?.scope ?? null);
    function a(l) {
      l.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (l, r) => s.value ? (p(), m("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, bo)) : I("", !0);
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
    return (a, l) => (p(), m("input", {
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
    const t = we(), n = wt(), s = h(() => t.isEverything.value);
    return (a, l) => (p(), m("div", Co, [
      (p(!0), m(J, null, ue(E(n), (r) => (p(), m("div", {
        key: r.key,
        class: "dc-card"
      }, [
        _("div", Mo, [
          _("span", So, [
            E(t).selectable.value ? (p(), se(bt, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : I("", !0),
            De(" " + T(r.ordinal) + " ", 1),
            s.value ? (p(), m("span", Eo, T(r.entityLabel), 1)) : I("", !0)
          ]),
          _("span", Po, [
            r.parts.state ? (p(), se(Vt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : I("", !0),
            he(qt, { entry: r }, null, 8, ["entry"]),
            E(t).pinnable.value ? (p(), se(Un, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : I("", !0)
          ])
        ]),
        _("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => E(t).activate(r.row)
        }, [
          r.parts.image ? (p(), se(da, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : I("", !0),
          _("span", zo, [
            _("span", Ro, T(r.parts.identity), 1),
            _("span", To, T(r.parts.reference), 1)
          ])
        ], 8, Ao),
        _("div", Lo, [
          (p(!0), m(J, null, ue(r.parts.metrics.slice(0, 2), (o) => (p(), se(Bt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: gt(() => [
              De(T(o.label) + " " + T(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (p(), m("span", Fo, T(r.parts.updated), 1)) : I("", !0)
        ])
      ]))), 128))
    ]));
  }
}), fa = /* @__PURE__ */ pe(Do, [["__scopeId", "data-v-05d69cb4"]]), Io = { class: "dc-grid" }, No = ["onClick"], Oo = { class: "dc-tile__scrim" }, Ko = { class: "dc-tile__top dc-mono" }, Vo = { class: "dc-tile__chip" }, Bo = { class: "dc-tile__caption" }, qo = { class: "dc-tile__secondary dc-truncate" }, Wo = { class: "dc-tile__primary" }, Uo = /* @__PURE__ */ de({
  __name: "GridView",
  setup(e) {
    const t = we(), n = wt();
    return (s, a) => (p(), m("div", Io, [
      (p(!0), m(J, null, ue(E(n), (l) => (p(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        _("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => E(t).activate(l.row)
        }, [
          l.parts.image ? (p(), se(da, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : I("", !0),
          _("span", Oo, [
            _("span", Ko, [
              _("span", Vo, T(l.ordinal), 1)
            ]),
            _("span", Bo, [
              _("span", qo, T(l.parts.reference), 1),
              _("span", Wo, T(l.parts.identity), 1)
            ])
          ])
        ], 12, No),
        E(t).selectable.value ? (p(), se(bt, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : I("", !0)
      ]))), 128))
    ]));
  }
}), pa = /* @__PURE__ */ pe(Uo, [["__scopeId", "data-v-c9789911"]]), Ho = { class: "dc-links" }, jo = ["onClick"], Xo = { class: "dc-link__primary dc-truncate" }, Go = { class: "dc-link__secondary dc-mono dc-truncate" }, Yo = /* @__PURE__ */ de({
  __name: "LinksView",
  setup(e) {
    const t = we(), n = wt();
    return (s, a) => (p(), m("div", Ho, [
      (p(!0), m(J, null, ue(E(n), (l) => (p(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        E(t).selectable.value ? (p(), se(bt, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : I("", !0),
        _("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => E(t).activate(l.row)
        }, [
          _("span", Xo, T(l.parts.identity), 1),
          _("span", Go, T(l.parts.reference), 1)
        ], 8, jo)
      ]))), 128))
    ]));
  }
}), va = /* @__PURE__ */ pe(Yo, [["__scopeId", "data-v-cc3a66fa"]]), Qo = {
  class: "dc-list",
  role: "list"
}, Zo = ["onClick"], Jo = { class: "dc-list__ordinal dc-mono" }, ei = { class: "dc-list__identity" }, ti = { class: "dc-list__primary dc-truncate" }, ni = { class: "dc-list__secondary dc-mono dc-truncate" }, si = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, ai = { class: "dc-list__metrics dc-mono" }, li = { class: "dc-list__trailing" }, ri = /* @__PURE__ */ de({
  __name: "ListView",
  setup(e) {
    const t = we(), n = wt(), s = h(() => t.isEverything.value);
    return (a, l) => (p(), m("div", Qo, [
      (p(!0), m(J, null, ue(E(n), (r) => (p(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        E(t).selectable.value ? (p(), se(bt, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : I("", !0),
        _("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => E(t).activate(r.row)
        }, [
          _("span", Jo, T(r.ordinal), 1),
          _("span", ei, [
            _("span", ti, T(r.parts.identity), 1),
            _("span", ni, T(r.parts.reference), 1)
          ])
        ], 8, Zo),
        s.value ? (p(), m("span", si, T(r.entityLabel), 1)) : I("", !0),
        _("span", ai, [
          (p(!0), m(J, null, ue(r.parts.metrics.slice(0, 2), (o) => (p(), se(Bt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        _("span", li, [
          r.parts.state ? (p(), se(Vt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : I("", !0),
          he(qt, { entry: r }, null, 8, ["entry"]),
          E(t).pinnable.value ? (p(), se(Un, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : I("", !0)
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
    const t = we(), n = wt(), s = U(0);
    ke(n, (i) => {
      s.value > i.length - 1 && (s.value = Math.max(0, i.length - 1));
    });
    const a = h(() => n.value[s.value]), l = h(() => {
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
    }), r = h(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${i}`;
    }), o = (i) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + i)));
    };
    return (i, u) => (p(), m("div", oi, [
      _("div", ii, [
        _("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (f) => o(-1))
        }, " ‹ ", 8, ci),
        _("span", ui, T(r.value), 1),
        _("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (f) => o(1))
        }, " › ", 8, di)
      ]),
      a.value ? (p(), m("div", fi, [
        _("div", {
          class: "dc-preview__media",
          style: Re({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        _("div", pi, [
          _("div", vi, [
            _("span", mi, [
              E(t).selectable.value ? (p(), se(bt, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : I("", !0),
              a.value.parts.state ? (p(), se(Vt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : I("", !0),
              _("span", hi, T(a.value.entityLabel), 1)
            ]),
            _("span", _i, [
              he(qt, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (p(), se(Un, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : I("", !0)
            ])
          ]),
          _("div", null, [
            _("div", gi, T(a.value.parts.identity), 1),
            _("div", yi, T(a.value.parts.reference), 1)
          ]),
          _("dl", ki, [
            (p(!0), m(J, null, ue(l.value, (f) => (p(), m("div", {
              key: f.key,
              class: "dc-preview__field"
            }, [
              _("dt", wi, T(f.key), 1),
              _("dd", bi, [
                f.column && a.value ? (p(), se(Bt, {
                  key: 0,
                  entry: a.value,
                  column: f.column
                }, null, 8, ["entry", "column"])) : (p(), m(J, { key: 1 }, [
                  De(T(f.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          _("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (f) => E(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : I("", !0)
    ]));
  }
}), ma = /* @__PURE__ */ pe($i, [["__scopeId", "data-v-a236412c"]]);
function xi() {
  const e = we();
  return h(() => fl(e.schema.value, e.entity.value));
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
    const t = e, n = we(), s = h(() => t.column.kind ?? "text"), a = h(() => Ae(t.column, t.entry.row)), l = h(
      () => s.value === "ordinal" ? t.entry.ordinal : Ot(t.column, t.entry.row)
    ), r = h(() => a.value), o = h(() => t.column.activate === !0 || !!t.column.click), i = h(() => xn(t.column)), u = h(() => Qs(t.column, t.entry.row));
    function f(w) {
      o.value && (w.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (w, k) => s.value === "component" && e.column.component ? (p(), se(Ds(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (p(), se(Vt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : s.value === "image" ? (p(), m("img", {
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
    }, null, 8, ["entry", "column"])) : o.value ? (p(), m("button", {
      key: 4,
      type: "button",
      class: an(["dc-table__open", { "dc-truncate": i.value }]),
      title: u.value,
      onClick: f
    }, T(l.value), 11, Mi)) : (p(), m("span", Si, T(l.value), 1));
  }
}), Cs = /* @__PURE__ */ pe(Ei, [["__scopeId", "data-v-4e1c37cf"]]), Pi = {
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
    const t = we(), n = wt(), s = xi(), a = h(
      () => s.value.some((k) => k.kind === "image" || k.height !== void 0)
    );
    function l(k) {
      k && (t.query.value.sort === k ? t.toggleDirection() : t.setSort(k));
    }
    const r = h(() => t.entity.value?.label ?? "The result set"), o = h(() => new Set(t.sorts.value.map((k) => k.key))), i = (k) => k.sort !== void 0 && o.value.has(k.sort), u = (k) => {
      if (i(k))
        return t.query.value.sort !== k.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function f(k) {
      return [
        gs(k),
        k.muted ? "dc-table__muted" : "",
        k.mono ? "dc-mono" : "",
        xn(k) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function w(k, y) {
      if (!(!xn(k) || k.activate || k.click))
        return Qs(k, y.row);
    }
    return (k, y) => E(s).length ? (p(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      _("thead", null, [
        _("tr", null, [
          E(t).selectable.value ? (p(), m("th", Ri, [...y[3] || (y[3] = [
            _("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : I("", !0),
          (p(!0), m(J, null, ue(E(s), (b, g) => (p(), m("th", {
            key: E(hs)(b, g),
            scope: "col",
            class: an(E(gs)(b)),
            style: Re({ width: b.width }),
            "data-dc-align": E(_s)(b),
            "data-dc-hide": b.hideBelow,
            "aria-sort": u(b)
          }, [
            i(b) ? (p(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: ($) => l(b.sort)
            }, T(b.label), 9, Li)) : (p(), m(J, { key: 1 }, [
              De(T(b.label), 1)
            ], 64))
          ], 14, Ti))), 128))
        ])
      ]),
      _("tbody", null, [
        (p(!0), m(J, null, ue(E(n), (b) => (p(), m("tr", {
          key: b.key,
          class: "dc-table__row",
          onClick: (g) => E(t).activate(b.row)
        }, [
          E(t).selectable.value ? (p(), m("td", Di, [
            he(bt, {
              row: b.row,
              selected: b.selected,
              name: b.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : I("", !0),
          (p(!0), m(J, null, ue(E(s), (g, $) => (p(), m("td", {
            key: E(hs)(g, $),
            class: an(f(g)),
            "data-dc-align": E(_s)(g),
            "data-dc-hide": g.hideBelow,
            title: w(g, b)
          }, [
            g.scope ? (p(), m("span", Ni, [
              he(Cs, {
                column: g,
                entry: b
              }, null, 8, ["column", "entry"]),
              he(qt, { entry: b }, null, 8, ["entry"])
            ])) : (p(), se(Cs, {
              key: 1,
              column: g,
              entry: b
            }, null, 8, ["column", "entry"]))
          ], 10, Ii))), 128))
        ], 8, Fi))), 128))
      ])
    ], 8, zi)) : (p(), m("p", Pi, [
      y[2] || (y[2] = _("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      _("span", Ai, [
        De(T(r.value) + " has no ", 1),
        y[0] || (y[0] = _("code", null, "columns", -1)),
        y[1] || (y[1] = De(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ha = /* @__PURE__ */ pe(Oi, [["__scopeId", "data-v-335f12c8"]]);
function Ki(e) {
  const t = Ft([]), n = U(!1), s = Ft(null);
  let a = 0;
  const l = (i, u, f) => ({
    entity: i,
    rows: u.rows.map(
      (w, k) => ua(w, k, i, e.isPinned(w.id))
    ),
    total: u.total,
    count: f ? i.count : String(u.total)
  }), r = () => {
    const i = ++a, u = e.query.value, f = e.schema.value, w = e.entities.value, k = e.limit.value, y = Fn(u), b = w.map((g) => ({
      entity: g,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: g.key, facets: It(g), page: 1 },
        schema: f,
        entity: g,
        limit: k,
        offset: 0
      })
    }));
    if (b.every(({ outcome: g }) => !(g instanceof Promise))) {
      t.value = b.map(
        ({ entity: g, outcome: $ }) => l(g, $, y)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(b.map(({ outcome: g }) => Promise.resolve(g))).then((g) => {
      i === a && (t.value = g.map(
        ($, x) => l(b[x].entity, $, y)
      ), s.value = null);
    }).catch((g) => {
      i === a && (s.value = g, t.value = []);
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
    }), l = h(() => !t.isPristine.value);
    return (r, o) => E(a) ? (p(), m("p", Vi, " Could not load results: " + T(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !E(n).length && E(s) ? (p(), m("p", Bi, " Running query… ")) : (p(), m("div", {
      key: 2,
      class: "dc-types",
      "data-dc-pending": E(s) ? "true" : "false"
    }, [
      (p(!0), m(J, null, ue(E(n), (i) => (p(), m("section", {
        key: i.entity.key,
        class: "dc-type",
        "data-dc-empty": i.rows.length ? "false" : "true"
      }, [
        _("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => E(t).setEntity(i.entity.key)
        }, [
          _("span", Hi, T(i.entity.label), 1),
          _("span", ji, T(i.count), 1),
          o[0] || (o[0] = _("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          _("span", Xi, "Show only " + T(i.entity.label.toLowerCase()), 1)
        ], 8, Ui),
        i.rows.length ? I("", !0) : (p(), m("p", Gi, T(l.value ? "No matches" : "Nothing here yet"), 1)),
        (p(!0), m(J, null, ue(i.rows, (u) => (p(), m("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          _("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (f) => E(t).activate(u.row)
          }, [
            _("span", Qi, [
              _("span", Zi, T(u.parts.identity), 1),
              _("span", Ji, T(u.parts.reference), 1)
            ])
          ], 8, Yi),
          _("span", ec, [
            (p(!0), m(J, null, ue(u.parts.metrics.slice(0, 1), (f) => (p(), se(Bt, {
              key: f.column.key ?? f.label,
              class: "dc-type__metric",
              entry: u,
              column: f.column
            }, {
              default: gt(() => [
                _("span", tc, T(f.text), 1),
                _("span", nc, T(f.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (p(), m("span", sc, T(u.parts.updated), 1)) : I("", !0),
            he(qt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        i.entity.create ? (p(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => E(t).create(i.entity)
        }, [
          o[1] || (o[1] = _("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          De(" " + T(i.entity.create), 1)
        ], 8, ac)) : I("", !0)
      ], 8, Wi))), 128))
    ], 8, qi));
  }
}), _a = /* @__PURE__ */ pe(lc, [["__scopeId", "data-v-b776cfb6"]]), rc = ["data-dc-pending"], oc = {
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
      cards: fa,
      grid: pa,
      table: ha,
      links: va,
      preview: ma
    }, a = h(() => Dn(n.query.value)), l = h(() => Bs(n.query.value.view, t.views)), r = h(() => s[l.value] ?? Mn), o = h(() => n.rows.value.length > 0), i = h(() => n.error.value !== null);
    return (u, f) => (p(), m("div", {
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      i.value ? (p(), m("p", oc, [
        f[1] || (f[1] = _("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        _("span", ic, T(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : a.value ? (p(), se(_a, { key: 1 })) : !o.value && E(n).pending.value ? (p(), m("p", cc, [...f[2] || (f[2] = [
        _("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (p(), se(Ds(r.value), { key: 4 })) : (p(), m("div", uc, [
        f[3] || (f[3] = _("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        _("span", dc, T(E(n).summary.value), 1),
        E(n).isPristine.value ? I("", !0) : (p(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: f[0] || (f[0] = (w) => E(n).clearFilters())
        }, T(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, rc));
  }
}), ga = /* @__PURE__ */ pe(fc, [["__scopeId", "data-v-4b83efc2"]]), pc = ["data-dc-theme"], vc = ["data-dc-width", "data-dc-align"], mc = { class: "dc-shell__panel" }, hc = /* @__PURE__ */ de({
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
    const s = e, a = n, l = At(e, "open"), r = At(e, "pinned"), o = At(e, "selected"), i = Tn(), u = _t(Os, null), f = s.route || u ? null : al(), w = s.route ?? u ?? f;
    He(() => f?.dispose?.());
    const k = h(() => Il({ seed: s.schema.key })), y = h(() => s.source ?? k.value), b = Jl({
      schema: () => s.schema,
      adapter: w,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), g = er({
      source: y,
      query: b.query,
      schema: h(() => s.schema),
      entity: b.entity,
      limit: h(() => s.limit)
    });
    ke(b.query, (z) => a("query-change", z)), ke(
      [g.pageCount, g.pending, b.query],
      () => {
        if (g.pending.value) return;
        const z = g.pageCount.value;
        b.query.value.page > z && b.setPage(z, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Is() ?? "dc-query-panel", x = U(null);
    function L() {
      l.value && (l.value = !1, Dt(() => {
        x.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const N = h(() => new Set(r.value));
    function F(z) {
      const P = new Set(N.value);
      P.has(z.id) ? P.delete(z.id) : P.add(z.id), r.value = [...P], a("toggle-pin", z);
    }
    const O = h(() => {
      if (s.selectable === !0) return !0;
      const z = b.entity.value;
      return !!(z?.duplicate || z?.delete);
    }), V = h(() => new Set(o.value));
    function C(z) {
      const P = new Set(V.value);
      P.has(z.id) ? P.delete(z.id) : P.add(z.id), o.value = [...P];
    }
    function R(z) {
      const P = new Set(V.value);
      for (const G of g.rows.value)
        z ? P.add(G.id) : P.delete(G.id);
      o.value = [...P];
    }
    function X() {
      o.value.length && (o.value = []);
    }
    const ne = h(() => ({
      ids: [...o.value],
      rows: g.rows.value.filter((z) => V.value.has(z.id)),
      entity: b.entity.value
    }));
    ke(() => b.query.value.entity, X);
    function ve(z, P) {
      b.narrow(Bl(s.schema, b.query.value, z), P?.key ?? null), a("drill", z, P);
    }
    const S = Wl({
      ...b,
      schema: h(() => s.schema),
      entities: h(() => s.schema.entities),
      rows: g.rows,
      total: g.total,
      limit: h(() => s.limit),
      offset: g.offset,
      pageCount: g.pageCount,
      pending: g.pending,
      error: g.error,
      source: y,
      previewsPerType: h(() => s.previewsPerType),
      pinnable: h(() => s.pinnable === !0),
      isPinned: (z) => N.value.has(z.id),
      isPinnedId: (z) => N.value.has(z),
      togglePin: F,
      selectable: O,
      selection: ne,
      isSelected: (z) => V.value.has(z.id),
      toggleSelect: C,
      selectPage: R,
      clearSelection: X,
      activate: (z) => a("activate", z),
      create: (z) => a("create", z),
      duplicate: () => a("duplicate", ne.value),
      delete: () => a("delete", ne.value),
      drill: ve
    }), q = h(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: L
    }), (z, P) => (p(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re(q.value)
    }, [
      _("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        he(ra, {
          ref_key: "headerRef",
          ref: x,
          expanded: l.value,
          "panel-id": E($),
          views: e.views,
          onToggle: P[0] || (P[0] = (G) => l.value = !l.value)
        }, ps({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: gt(() => [
              qe(z.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views"]),
        l.value ? (p(), m(J, { key: 0 }, [
          _("div", {
            class: "dc-shell__scrim",
            onClick: L
          }),
          _("div", mc, [
            he(ia, {
              "panel-id": E($),
              onClose: L
            }, ps({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: gt(() => [
                  qe(z.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : I("", !0)
      ], 8, vc),
      he(ca),
      qe(z.$slots, "results", {
        rows: E(S).rows.value,
        total: E(S).total.value,
        offset: E(S).offset.value,
        pageCount: E(S).pageCount.value,
        query: E(S).query.value,
        pending: E(S).pending.value
      }, () => [
        he(ga, { views: e.views }, null, 8, ["views"])
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
    const n = e, s = t, a = U([]);
    function l(r, o) {
      const i = n.options.length;
      let u = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? u = (o + 1) % i : r.key === "ArrowLeft" || r.key === "ArrowUp" ? u = (o - 1 + i) % i : r.key === "Home" ? u = 0 : r.key === "End" && (u = i - 1), u === null) return;
      r.preventDefault();
      const f = n.options[u];
      f && (s("update:modelValue", f.key), a.value[u]?.focus());
    }
    return (r, o) => (p(), m("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (p(!0), m(J, null, ue(e.options, (i, u) => (p(), m("button", {
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
      }, T(i.label), 43, yc))), 128))
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
    const s = e, a = n, l = U(null), r = U([]), o = U(null), i = U(null), u = U(null), f = U(!1), w = h(
      () => s.items.flatMap((C, R) => zt(C) ? [R] : [])
    ), k = h(() => {
      const C = [{ entries: [] }];
      return s.items.forEach((R, X) => {
        R.heading ? C.push({ heading: R, entries: [] }) : C[C.length - 1]?.entries.push({ item: R, index: X });
      }), C.filter((R) => R.entries.length > 0);
    }), y = U({ x: s.at.x, y: s.at.y });
    async function b() {
      y.value = { x: s.at.x, y: s.at.y }, await Dt();
      const C = l.value?.getBoundingClientRect();
      if (!C) return;
      const R = 8;
      let X = s.at.x, ne = s.at.y;
      if (X + C.width > window.innerWidth - R) {
        const ve = s.at.mirrorX === void 0 ? null : s.at.mirrorX - C.width;
        X = ve !== null && ve >= R ? ve : window.innerWidth - C.width - R;
      }
      ne + C.height > window.innerHeight - R && (ne = window.innerHeight - C.height - R), y.value = { x: Math.max(R, X), y: Math.max(R, ne) };
    }
    const g = h(() => ({ left: `${y.value.x}px`, top: `${y.value.y}px` }));
    function $(C) {
      o.value = C, C !== null && Dt(() => r.value[C]?.focus());
    }
    function x(C, R) {
      const X = w.value;
      if (X.length === 0) return null;
      if (C === null) return R === 1 ? X[0] ?? null : X[X.length - 1] ?? null;
      const ne = X.indexOf(C);
      return ne === -1 ? X[0] ?? null : X[(ne + R + X.length) % X.length] ?? null;
    }
    function L(C, R) {
      if (!s.items[C]?.items?.length) return;
      const ne = r.value[C]?.getBoundingClientRect(), ve = l.value?.getBoundingClientRect();
      !ne || !ve || (u.value = { x: ve.right - 4, y: ne.top - 4, mirrorX: ve.left + 4 }, i.value = C, f.value = R);
    }
    function N(C) {
      const R = i.value;
      i.value = null, u.value = null, C && R !== null && $(R);
    }
    function F(C) {
      const R = s.items[C];
      if (!(!R || !zt(R))) {
        if (R.items?.length) {
          L(C, !0);
          return;
        }
        a("choose", R);
      }
    }
    function O(C) {
      const R = C.key;
      if (R === "Escape") {
        C.preventDefault(), C.stopPropagation(), i.value !== null ? N(!0) : a("dismiss");
        return;
      }
      if (R === "ArrowDown" || R === "ArrowUp") {
        C.preventDefault(), C.stopPropagation(), N(!1), $(x(o.value, R === "ArrowDown" ? 1 : -1));
        return;
      }
      if (R === "Home" || R === "End") {
        C.preventDefault(), C.stopPropagation(), N(!1), $(x(null, R === "Home" ? 1 : -1));
        return;
      }
      if (R === "ArrowRight") {
        const X = o.value;
        X !== null && s.items[X]?.items?.length && (C.preventDefault(), C.stopPropagation(), L(X, !0));
        return;
      }
      if (R === "ArrowLeft") {
        i.value !== null && (C.preventDefault(), C.stopPropagation(), N(!0));
        return;
      }
      if (R === "Enter" || R === " ") {
        const X = o.value;
        if (X === null) return;
        C.preventDefault(), C.stopPropagation(), F(X);
      }
    }
    function V(C) {
      const R = s.items[C];
      !R || !zt(R) || (i.value !== null && i.value !== C && N(!1), $(C), R.items?.length && L(C, !1));
    }
    return tl(() => {
      b(), s.autofocus && $(x(null, 1));
    }), ke(() => s.at, b, { deep: !0 }), ke(() => s.items, () => void b(), { deep: !0 }), He(() => {
      i.value = null;
    }), t({ root: l }), (C, R) => {
      const X = Ns("MenuList", !0);
      return p(), m("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(g.value),
        onKeydown: O
      }, [
        (p(!0), m(J, null, ue(k.value, (ne, ve) => (p(), m("div", {
          key: `${ve}-${ne.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: ne.heading ? "group" : "none",
          "aria-label": ne.heading?.label
        }, [
          ne.heading ? (p(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": ne.heading.id
          }, T(ne.heading.label), 9, xc)) : I("", !0),
          (p(!0), m(J, null, ue(ne.entries, ({ item: S, index: q }) => (p(), m(J, {
            key: S.id ?? `${q}-${S.label ?? ""}`
          }, [
            S.separator ? (p(), m("div", Cc)) : (p(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (z) => {
                z && (r.value[q] = z);
              },
              type: "button",
              class: "dc-menu__item",
              role: S.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": S.checked === void 0 ? void 0 : S.checked,
              "aria-haspopup": S.items?.length ? "menu" : void 0,
              "aria-expanded": S.items?.length ? i.value === q : void 0,
              "aria-disabled": S.disabled ? "true" : void 0,
              disabled: S.disabled,
              "data-dc-item": S.id,
              tabindex: "-1",
              onClick: (z) => F(q),
              onMouseenter: (z) => V(q)
            }, [
              _("span", Sc, T(S.checked ? "✓" : ""), 1),
              _("span", Ec, T(S.label), 1),
              S.shortcut ? (p(), m("span", Pc, T(S.shortcut), 1)) : S.items?.length ? (p(), m("span", Ac, "›")) : I("", !0)
            ], 40, Mc))
          ], 64))), 128))
        ], 8, $c))), 128)),
        i.value !== null && u.value ? (p(), se(X, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: u.value,
          label: e.items[i.value]?.label,
          autofocus: f.value,
          onChoose: R[0] || (R[0] = (ne) => a("choose", ne)),
          onDismiss: R[1] || (R[1] = (ne) => N(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
      ], 44, bc);
    };
  }
}), ya = /* @__PURE__ */ pe(zc, [["__scopeId", "data-v-9b1413fa"]]), Rc = ["data-dc-theme", "aria-label"], Tc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Lc = /* @__PURE__ */ de({
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
    const n = e, s = h(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), a = t, l = U(null), r = U([]), o = U(null), i = U(null), u = U(!1), f = h(
      () => n.menus.flatMap((F, O) => zt(F) ? [O] : [])
    );
    function w(F, O) {
      const V = r.value[F]?.getBoundingClientRect(), C = n.menus[F];
      !V || !C || !zt(C) || (i.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, o.value = F, u.value = O);
    }
    function k(F) {
      const O = o.value;
      o.value = null, i.value = null, F && O !== null && r.value[O]?.focus();
    }
    function y(F) {
      o.value === F ? k(!0) : w(F, !1);
    }
    function b(F) {
      o.value === null || o.value === F || w(F, !1);
    }
    function g(F, O) {
      const V = f.value;
      if (V.length === 0) return null;
      if (F === null) return O === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const C = V.indexOf(F);
      return C === -1 ? V[0] ?? null : V[(C + O + V.length) % V.length] ?? null;
    }
    function $(F) {
      const O = F.key;
      if (O === "Escape") {
        if (o.value === null) return;
        F.preventDefault(), k(!0);
        return;
      }
      if (O === "ArrowDown" && o.value === null) {
        const R = x();
        if (R === null) return;
        F.preventDefault(), w(R, !0);
        return;
      }
      if (O !== "ArrowLeft" && O !== "ArrowRight") return;
      const V = o.value ?? x(), C = g(V, O === "ArrowRight" ? 1 : -1);
      C !== null && (F.preventDefault(), o.value !== null ? w(C, !0) : r.value[C]?.focus());
    }
    function x() {
      const F = r.value.findIndex((O) => O === document.activeElement);
      return F === -1 ? f.value[0] ?? null : F;
    }
    function L(F) {
      const O = F.target;
      !O || l.value?.contains(O) || k(!1);
    }
    ke(o, (F) => {
      F !== null ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), He(() => window.removeEventListener("pointerdown", L, !0));
    function N(F) {
      k(!0), F.action?.(), a("choose", F);
    }
    return (F, O) => (p(), m("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Re(s.value),
      onKeydown: $
    }, [
      (p(!0), m(J, null, ue(e.menus, (V, C) => (p(), m("button", {
        key: V.id ?? V.label ?? C,
        ref_for: !0,
        ref: (R) => {
          R && (r.value[C] = R);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === C,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: C === (f.value[0] ?? 0) ? 0 : -1,
        onClick: (R) => y(C),
        onMouseenter: (R) => b(C)
      }, T(V.label), 41, Tc))), 128)),
      o.value !== null && i.value ? (p(), se(ya, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: N,
        onDismiss: O[0] || (O[0] = (V) => k(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
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
    const n = t, s = U(null), a = U(null), l = U(null), r = U(!1), o = h(() => l.value !== null);
    function i(b) {
      const g = s.value?.getBoundingClientRect();
      g && (l.value = { x: g.left, y: g.bottom + 4, mirrorX: g.right }, r.value = b);
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
      const g = b.target;
      g && (s.value?.contains(g) || a.value?.root?.contains(g) || u(!1));
    }
    ke(o, (b) => {
      b ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), He(() => window.removeEventListener("pointerdown", k, !0));
    function y(b) {
      u(!0), b.action?.(), n("choose", b);
    }
    return (b, g) => (p(), m(J, null, [
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
        _("span", Dc, T(e.glyph), 1)
      ], 40, Fc),
      l.value ? (p(), se(ya, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: y,
        onDismiss: g[0] || (g[0] = ($) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
    ], 64));
  }
}), Hn = /* @__PURE__ */ pe(Ic, [["__scopeId", "data-v-48f5ada5"]]), $t = (e) => e.kind === "split", H = (e) => e.kind === "group", Z = (e) => e.kind === "float", rt = { x: 16, y: 16, w: 360, h: 260 }, on = 28, ka = 120, Sn = 220, wa = 38, dt = 6;
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
const fe = (e) => typeof e == "string", jn = (e) => fe(e) ? Ie(e) : e, Ut = (e) => fe(e) ? [e] : je(e), Ms = (e) => e.panels.filter(fe), Nc = (e) => e.panels.filter((t) => !fe(t)), Pe = (e, t) => e.panels.includes(t);
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
  return H(e) ? e.panels.flatMap(Ut) : Z(e) ? e.frames.flatMap((t) => je(t.node)) : e.children.flatMap(je);
}
function ae(e, t) {
  return H(e) ? e.panels.some((n) => fe(n) ? n === t : ae(n, t)) : Z(e) ? e.frames.some((n) => ae(n.node, t)) : e.children.some((n) => ae(n, t));
}
const ba = (e) => je(e).length === 0, En = (e) => !H(e) && ct(e), Pn = (e) => ba(e) && !En(e);
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
function $a(e) {
  const t = e.panels[ut(e)];
  return t !== void 0 && fe(t) ? t : "";
}
function Ce(e) {
  if (fe(e)) return e;
  if (H(e)) {
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
  if (H(e) && Pe(e, t)) return e;
  for (const n of Zn(e)) {
    const s = pt(n, t);
    if (s) return s;
  }
  return null;
}
function Kc(e) {
  const t = Zn(e).flatMap(Kc);
  return H(e) ? [e, ...t] : t;
}
function be(e, t) {
  if (H(e)) {
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
function gn(e, t, n = ka) {
  const s = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), a = s(e.w, t.w), l = s(e.h, t.h), r = (o, i, u) => Math.min(Math.max(o, 0), Math.max(u - i, 0));
  return {
    x: Math.round(r(e.x, a, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function Ss(e, t, n, s, a = ka) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + s), t.includes("n") && (i = e.h - s, r = e.y + s), o < a && (t.includes("w") && (l = e.x + e.w - a), o = a), i < a && (t.includes("n") && (r = e.y + e.h - a), i = a), { x: l, y: r, w: o, h: i };
}
const xa = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function vt(e, t, n) {
  if (H(e)) return Ht(e, t, (l) => vt(l, t, n));
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
  return vt(e, t, (s) => xa(s.rect, n) ? s : { ...s, rect: n });
}
const Je = (e) => e.maximized === !0, Ca = (e) => (t) => {
  if (Je(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function Bc(e, t, n = !0) {
  return vt(e, t, Ca(n));
}
function pd(e, t) {
  const n = be(e, t);
  return n ? Bc(e, t, !Je(n)) : e;
}
const lt = (e) => e.minimized === !0, Ma = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function qc(e, t, n = !0) {
  return vt(e, t, Ma(n));
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
function Es(e, t, n) {
  return Jn(
    e,
    t,
    (s) => xa(s.rect, n) ? s : { ...s, rect: n }
  );
}
function Wc(e, t, n = !0) {
  return Jn(e, t, Ca(n));
}
function Uc(e, t, n = !0) {
  return Jn(e, t, Ma(n));
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
  if (H(e)) return Ht(e, n, (r) => tn(r, t, n, s));
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
function Ps(e, t, n, s) {
  if (t === n || !ae(e, t) || !ae(e, n) || !be(e, n)) return e;
  const a = ot(e, t);
  if (!a) return e;
  const l = tn(a, t, n, s);
  return l === a ? e : ye(l);
}
function jc(e, t, n) {
  return Z(e) ? { ...e, frames: [...e.frames, un(Ie(t), n)] } : H(e) ? Ea(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ie(t)],
    sizes: [...Ue(e), 1],
    ...ge(e)
  };
}
function Sa(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return jc(e, t, s);
  const l = n.slice(1), r = (f, w) => w === a ? Sa(f, t, l, s) : ot(f, t);
  if (Z(e)) {
    const f = e.frames.flatMap((w, k) => {
      const y = r(w.node, k);
      return y ? [y === w.node ? w : { ...w, node: y }] : [];
    });
    return { ...e, frames: f };
  }
  if (H(e)) {
    const f = ut(e), w = [];
    e.panels.forEach((b, g) => {
      if (fe(b)) {
        b !== t && w.push(b);
        return;
      }
      const $ = r(b, g);
      $ && w.push($);
    });
    const y = e.active && w.some((b) => Ut(b).includes(e.active)) ? e.active : Ce(w[f] ?? w[w.length - 1]);
    return {
      kind: "group",
      panels: w,
      ...y ? { active: y } : {},
      ...ge(e)
    };
  }
  const o = Ue(e), i = [], u = [];
  return e.children.forEach((f, w) => {
    const k = r(f, w);
    k && (i.push(k), u.push(o[w] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: u, ...ge(e) };
}
function As(e, t, n, s) {
  const a = tt(e, n);
  return !a || !ba(a) || !ae(e, t) ? e : ye(Sa(e, t, n, s));
}
function yn(e, t) {
  if (H(e)) return Ht(e, t, (a) => yn(a, t));
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
  const t = H(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function ye(e) {
  if (H(e)) return Xc(e);
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
      u.children.forEach((y, b) => {
        s.push(y), a.push(f * (k[b] ?? 0));
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
      if (H(f) && !ct(f) && !Te(f)) {
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
  if (H(e)) {
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
function Ea(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...ge(e) };
}
function Et(e, t, n, s, a) {
  const l = (y) => Wt(
    y,
    (b) => ae(b, n) ? Et(b, t, n, s, a) : b
  );
  if (s === "float") return e;
  const r = (y) => Ht(y, n, (b) => Et(b, t, n, s, a));
  if (s === "center")
    return H(e) ? Pe(e, n) ? Ea(e, t, a) : r(e) : Z(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (y) => ae(y, n) ? Et(y, t, n, s, a) : y
      )
    };
  const o = Oc(s), i = s === "left" || s === "top", u = (y) => ({
    kind: "split",
    direction: o,
    children: i ? [Ie(t), y] : [y, Ie(t)],
    sizes: [0.5, 0.5]
  });
  if (H(e)) return Pe(e, n) ? u(e) : r(e);
  if (Z(e)) return l(e);
  const f = Ue(e), w = e.children.findIndex(
    (y) => H(y) && Pe(y, n)
  );
  if (w >= 0 && e.direction === o) {
    const y = (f[w] ?? 0) / 2, b = [...e.children], g = [...f];
    return b.splice(i ? w : w + 1, 0, Ie(t)), g.splice(w, 1, y, y), {
      kind: "split",
      direction: o,
      children: b,
      sizes: g,
      ...ge(e)
    };
  }
  const k = e.children.map((y) => ae(y, n) ? H(y) && Pe(y, n) ? u(y) : Et(y, t, n, s) : y);
  return {
    kind: "split",
    direction: e.direction,
    children: k,
    sizes: f,
    ...ge(e)
  };
}
function mt(e, t) {
  if (H(e)) {
    if (Pe(e, t))
      return $a(e) === t ? e : { ...e, active: t };
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
  if (H(e)) {
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
  if (H(e)) {
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
function Pa(e, t, n) {
  if (H(e)) {
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
  if (!H(e) && s.some(({ node: a }) => H(a) && Pe(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!ae(a, t)) continue;
    const r = jt(a, t, n);
    return r ? Pa(e, l, r) : null;
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
function Aa(e) {
  return Z(e) ? [e] : Te(e) || ct(e) ? [e] : H(e) ? [...e.panels] : e.children.flatMap(Aa);
}
function za(e, t) {
  if (H(e)) return e;
  const n = Zn(e).map(Aa), s = n.flat(), a = t && s.some((r) => Ut(r).includes(t)) ? t : void 0, l = Gc(e, n);
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
  const n = jt(e, t, (s) => za(s, t));
  return n ? ye(n) : e;
}
function ts(e, t, n) {
  if (H(e) && Pe(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of dn(e)) {
    if (!ae(s, t)) continue;
    const l = ts(s, t, n);
    return l ? Pa(e, a, l) : null;
  }
  return null;
}
function zs(e, t, n) {
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
  if (H(e)) return e;
  if (Z(e)) {
    const a = e.frames.findIndex(
      (o) => H(o.node) && o.node.panels.includes(t)
    ), l = e.frames[a], r = l && H(l.node) ? l.node : null;
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
    ...Xn(Ra(r.panels.map(jn), Te(r), n)),
    ...ge(r)
  }));
  return l ? ye(l) : e;
}
function Ra(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Gn(e, n).frames;
}
function Ta(e, t) {
  return { ...Xn(Ra(e.children, Te(e), t)), ...ge(e) };
}
function hd(e, t, n) {
  const s = jt(
    e,
    t,
    (a) => Z(a) ? a : Ta(a, n)
  );
  return s ? ye(s) : H(e) && Pe(e, t) ? Gn([e], n) : e;
}
function Zc(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function La(e, t) {
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
    (a) => Z(a) ? La(a, n) : a
  );
  return s ? ye(s) : e;
}
function Fa(e) {
  if (Z(e)) return null;
  const t = H(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || fe(t) || H(t) && t.panels.length === 1 && fe(t.panels[0]) ? null : t;
}
const Jc = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function eu(e, t) {
  const n = Fa(e);
  return n ? t === "inner" ? n : { ...Jc(n), ...ge(e) } : e;
}
function kt(e) {
  return e.title ? e.title : H(e) ? "" : Z(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Lt(e, t) {
  if (H(e)) {
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
  if (H(e)) {
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
  if (H(e)) {
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
function Rs(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const r = a + l;
  if (r < s * 2) return e;
  const o = [...e], i = Math.min(Math.max(a + n, s), r - s);
  return o[t] = i, o[t + 1] = r - i, o;
}
function cn(e) {
  if (!H(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !fe(t) ? e : { ...Qn([tu(e)]), ...ge(e) };
}
const tu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ts(e) {
  return e.length === 0 ? null : Qn(e.map(Ie));
}
function nu(e, t) {
  if (!e) return Ts(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const i of je(e))
    !n.has(i) || s.has(i) ? a.add(i) : s.add(i);
  let l = e;
  for (const i of a)
    l = l ? ot(l, i) : null;
  const r = new Set(l ? je(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? cn(ye(l)) : null;
  if (!l) return Ts(o);
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
    return (s, a) => (p(), m("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      _("g", lu, [
        (p(!0), m(J, null, ue(t[e.kind], (l) => (p(), m("path", {
          key: l,
          d: l
        }, null, 8, ru))), 128))
      ]),
      n[e.kind] ? (p(), m("g", ou, [
        (p(!0), m(J, null, ue(n[e.kind], (l) => (p(), m("path", {
          key: l,
          d: l
        }, null, 8, iu))), 128))
      ])) : I("", !0)
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
    const t = e, n = ss(), s = h(() => Ce(t.frame.node)), a = h(() => n.panelFor(s.value)?.fixed === !0), l = h(() => Je(t.frame)), r = h(() => lt(t.frame)), o = h(() => l.value || r.value), i = h(() => n.resizable.value && !a.value && !o.value), u = h(() => n.movable.value && !a.value && !o.value), f = h(() => {
      const O = je(t.frame.node);
      return O.length === 1 ? O[0] ?? null : null;
    }), w = h(() => f.value !== null && n.closable(f.value)), k = h(() => t.frame.node.headless === !0), y = h(
      () => !k.value && (!H(t.frame.node) || r.value)
    ), b = h(
      () => t.frame.title || kt(t.frame.node) || Lt(t.frame.node, (O) => n.panelFor(O)?.title)
    ), g = h(() => n.spaceMenu(t.path));
    function $(O) {
      O.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, O, "move");
    }
    function x(O) {
      O.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const L = h(() => {
      const O = n.framing.value;
      return O !== null && ae(t.frame.node, O);
    }), N = h(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Sn}px`,
        height: `${wa}px`
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
    return (O, V) => (p(), m("div", {
      class: "dc-float",
      style: Re(N.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": L.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (C) => E(n).raiseAt(e.path))
    }, [
      y.value ? (p(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: $,
        onDblclick: x
      }, [
        _("span", fu, T(b.value), 1),
        g.value.length ? (p(), se(Hn, {
          key: 0,
          items: g.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : I("", !0),
        !a.value || r.value && w.value && f.value ? (p(), m("div", pu, [
          a.value ? I("", !0) : (p(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (C) => E(n).toggleMinimizeAt(e.path))
          }, [
            he(ht, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, vu)),
          a.value ? I("", !0) : (p(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (C) => E(n).toggleMaximizeAt(e.path))
          }, [
            he(ht, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, mu)),
          r.value && w.value && f.value ? (p(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": f.value,
            onClick: V[2] || (V[2] = (C) => E(n).close(f.value))
          }, [
            he(ht, { kind: "close" })
          ], 8, hu)) : I("", !0)
        ])) : I("", !0)
      ], 40, du)) : I("", !0),
      _("div", _u, [
        qe(O.$slots, "default", {}, void 0, !0)
      ]),
      (p(!0), m(J, null, ue(i.value ? F : [], (C) => (p(), m("span", {
        key: C,
        class: "dc-float__grip",
        "data-dc-handle": C,
        "aria-hidden": "true",
        onPointerdown: Fe((R) => E(n).beginFrameDragAt(e.path, R, C), ["stop"])
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
  return nl() && Fs(s), s;
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
    const t = e, n = ss(), s = Is() ?? "dc-pane", a = h(
      () => t.group.panels.flatMap((K, W) => {
        if (!fe(K)) {
          const Me = kt(K) || Lt(K, ($e) => n.panelFor($e)?.title);
          return [{ kind: "space", index: W, id: `space-${W}`, title: Me, node: K }];
        }
        const ee = n.panelFor(K);
        return ee ? [{ kind: "panel", index: W, id: K, title: ee.title, panel: ee }] : [];
      })
    ), l = h(() => a.value.length > 1), r = h(() => {
      const K = ut(t.group);
      return a.value.find((W) => W.index === K) ?? a.value[0] ?? null;
    }), o = h(() => r.value?.kind === "space" ? r.value.node : null), i = h(() => o.value ? "" : $a(t.group)), u = h(() => o.value ? null : n.panelFor(i.value)), f = h(() => r.value?.title ?? ""), w = h(() => n.spaceNames.value ? t.group.title ?? "" : ""), k = h(() => [...t.path, r.value?.index ?? 0]), y = h(() => i.value || Ms(t.group)[0] || ""), b = h(() => n.viewFor(i.value)), g = h(() => t.group.headless === !0), $ = h(() => n.focused.value === i.value), x = h(() => n.dragging.value === i.value), L = h(() => n.moving.value === i.value), N = h(() => n.frameOf(y.value) !== null), F = h(() => n.panelFor(y.value)?.fixed === !0), O = h(
      () => !o.value && (n.canMove(i.value) || N.value && n.movable.value && !F.value)
    ), V = h(
      () => o.value ? n.spaceMenu(k.value) : n.menuFor(i.value)
    ), C = (K) => n.closable(K);
    wu({ panel: i });
    const R = h(() => n.maximized(y.value)), X = h(
      () => N.value && !F.value || !l.value && !!u.value && C(u.value.id)
    ), ne = (K) => `${s}-tab-${K}`, ve = h(() => `${s}-body`), S = h(() => {
      const K = n.dropTarget.value;
      return !K || !Pe(t.group, K.panel) || K.edge === "float" ? null : K;
    }), q = h(() => S.value?.index === void 0 ? S.value?.edge ?? null : null), z = h(() => S.value?.index ?? null), P = () => u.value ? n.renderContent(u.value, b.value, $.value) ?? null : null, G = () => u.value ? n.renderActions(u.value, b.value, $.value) ?? null : null;
    let le = null;
    function re(K) {
      const W = le !== null && Math.hypot(K.clientX - le.x, K.clientY - le.y) >= 4;
      return le = null, W;
    }
    const _e = (K) => K.kind === "panel" ? K.id : Ce(K.node);
    function Se(K, W) {
      W.kind !== "space" && (n.focus(W.id), le = { x: K.clientX, y: K.clientY }, n.beginDrag(W.id, K));
    }
    function Xe(K, W) {
      if (re(K)) return;
      const ee = _e(W);
      ee && n.selectPanel(ee);
    }
    function Ge(K) {
      i.value && n.focus(i.value), !K.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (N.value ? n.beginFrameDrag(y.value, K, "move") : n.beginDrag(i.value, K));
    }
    function Ye(K) {
      le = { x: K.clientX, y: K.clientY }, n.beginDrag(i.value, K);
    }
    function Qe(K) {
      re(K) || n.toggleMoveMode(i.value);
    }
    const Ne = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Oe(K) {
      if (!L.value) return;
      if (K.key === "Escape") {
        K.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const W = Ne[K.key];
      W && (K.preventDefault(), N.value ? n.nudgeFrame(i.value, W, K.shiftKey) : n.nudge(i.value, W, K.shiftKey));
    }
    function Ke(K) {
      !N.value || K.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(y.value);
    }
    function xt(K, W) {
      K.stopPropagation(), le = null, n.close(W);
    }
    function Xt(K, W) {
      const ee = a.value.length;
      let Me = null;
      if (K.key === "ArrowRight" ? Me = (W + 1) % ee : K.key === "ArrowLeft" ? Me = (W - 1 + ee) % ee : K.key === "Home" ? Me = 0 : K.key === "End" && (Me = ee - 1), Me === null) return;
      K.preventDefault();
      const $e = a.value[Me];
      if (!$e) return;
      const Ct = _e($e);
      Ct && n.selectPanel(Ct);
    }
    return (K, W) => r.value ? (p(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": E(Ms)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": N.value ? "true" : "false",
      "data-dc-maximized": R.value ? "true" : "false",
      "data-dc-headless": g.value ? "true" : "false",
      "data-dc-active": $.value ? "true" : "false",
      "data-dc-dragging": x.value ? "true" : "false",
      "aria-label": f.value,
      onFocusin: W[7] || (W[7] = (ee) => i.value && E(n).focus(i.value))
    }, [
      g.value ? I("", !0) : (p(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": O.value ? "true" : "false",
        onPointerdown: Ge,
        onDblclick: Ke
      }, [
        O.value ? (p(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${f.value}`,
          "aria-pressed": L.value,
          onPointerdown: Ye,
          onClick: Qe,
          onKeydown: Oe
        }, [...W[8] || (W[8] = [
          _("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, xu)) : I("", !0),
        w.value ? (p(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": w.value
        }, [
          _("span", Mu, T(w.value), 1)
        ], 8, Cu)) : I("", !0),
        _("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${f.value} panels`
        }, [
          (p(!0), m(J, null, ue(a.value, (ee, Me) => (p(), m(J, {
            key: ee.id
          }, [
            z.value === Me ? (p(), m("span", Eu)) : I("", !0),
            _("button", {
              id: ne(ee.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ee.kind === "panel" ? ee.id : void 0,
              "data-dc-space": ee.kind === "space" ? ee.title : void 0,
              "aria-selected": ee.index === r.value.index,
              "aria-controls": ve.value,
              tabindex: ee.index === r.value.index ? 0 : -1,
              onPointerdown: ($e) => Se($e, ee),
              onClick: ($e) => Xe($e, ee),
              onKeydown: ($e) => Xt($e, Me)
            }, [
              _("span", Au, T(ee.title), 1),
              ee.kind === "panel" && ee.panel.subtitle ? (p(), m("span", zu, T(ee.panel.subtitle), 1)) : I("", !0),
              l.value && ee.kind === "panel" && C(ee.id) ? (p(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ee.title}`,
                "data-dc-close": ee.id,
                onPointerdown: W[0] || (W[0] = Fe(() => {
                }, ["stop"])),
                onClick: ($e) => xt($e, ee.id)
              }, [...W[9] || (W[9] = [
                _("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Ru)) : I("", !0)
            ], 40, Pu)
          ], 64))), 128)),
          z.value === a.value.length ? (p(), m("span", Tu)) : I("", !0)
        ], 8, Su),
        _("div", Lu, [
          he(G),
          V.value.length ? (p(), se(Hn, {
            key: 0,
            items: V.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : I("", !0)
        ]),
        X.value ? (p(), m("div", Fu, [
          N.value && !F.value ? (p(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${f.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: W[1] || (W[1] = Fe(() => {
            }, ["stop"])),
            onClick: W[2] || (W[2] = (ee) => E(n).toggleMinimize(y.value))
          }, [
            he(ht, { kind: "minimize" })
          ], 40, Du)) : I("", !0),
          N.value && !F.value ? (p(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${R.value ? "Restore" : "Maximize"} ${f.value}`,
            "aria-pressed": R.value,
            "data-dc-maximize": y.value,
            onPointerdown: W[3] || (W[3] = Fe(() => {
            }, ["stop"])),
            onClick: W[4] || (W[4] = (ee) => E(n).toggleMaximize(y.value))
          }, [
            he(ht, {
              kind: R.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Iu)) : I("", !0),
          !l.value && u.value && C(u.value.id) ? (p(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${f.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: W[5] || (W[5] = Fe(() => {
            }, ["stop"])),
            onClick: W[6] || (W[6] = (ee) => E(n).close(u.value.id))
          }, [
            he(ht, { kind: "close" })
          ], 40, Nu)) : I("", !0)
        ])) : I("", !0)
      ], 40, $u)),
      o.value ? (p(), m("div", {
        key: 1,
        id: ve.value,
        class: "dc-pane__space",
        role: g.value ? void 0 : "tabpanel",
        "aria-labelledby": g.value ? void 0 : ne(r.value.id)
      }, [
        qe(K.$slots, "space", {
          node: o.value,
          path: k.value
        }, void 0, !0)
      ], 8, Ou)) : (p(), m("div", {
        key: 2,
        id: ve.value,
        class: "dc-pane__body",
        role: g.value ? void 0 : "tabpanel",
        "aria-labelledby": g.value ? void 0 : ne(i.value)
      }, [
        he(P)
      ], 8, Ku)),
      q.value ? (p(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": q.value,
        "aria-hidden": "true"
      }, null, 8, Vu)) : I("", !0)
    ], 40, bu)) : I("", !0);
  }
}), Da = /* @__PURE__ */ pe(Bu, [["__scopeId", "data-v-44fd2b2d"]]), qu = ["data-dc-space", "data-dc-path", "aria-label"], Wu = {
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
    const t = e, n = ss(), s = U(null), a = h(() => H(t.node) ? t.node : null), l = h(() => $t(t.node) ? t.node : null), r = h(() => Z(t.node) ? t.node : null), o = h(
      () => l.value ? l.value.children : r.value?.frames.map((P) => P.node) ?? []
    ), i = h(() => l.value ? Ue(l.value) : []), u = h(
      () => (r.value?.frames ?? []).map((P, G) => ({
        held: P,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: G,
        key: C(P.node),
        path: [...t.path, G]
      })).sort((P, G) => P.key < G.key ? -1 : P.key > G.key ? 1 : 0)
    ), f = h(() => kt(t.node)), w = h(() => n.spaceMenu(t.path)), k = h(() => t.node.headless === !0), y = h(() => r.value ? "desktop" : l.value?.direction ?? ""), b = U(null), g = U(0);
    let $ = null;
    ke(
      b,
      (P) => {
        $?.disconnect(), $ = null, !(!P || typeof ResizeObserver > "u") && (g.value = P.clientWidth, $ = new ResizeObserver(([G]) => {
          g.value = G?.contentRect.width ?? 0;
        }), $.observe(P));
      },
      { immediate: !0 }
    ), He(() => $?.disconnect());
    const x = h(() => {
      const P = Math.max(
        1,
        Math.floor((g.value + dt) / (Sn + dt))
      ), G = /* @__PURE__ */ new Map();
      let le = 0;
      for (const re of u.value)
        re.held.minimized === !0 && (G.set(re.key, {
          x: dt + le % P * (Sn + dt),
          bottom: dt + Math.floor(le / P) * (wa + dt)
        }), le += 1);
      return G;
    }), L = (P) => !!P && P.join("/") === t.path.join("/"), N = h(() => {
      const P = n.dropTarget.value, G = r.value;
      if (!G || !P?.rect || P.edge !== "float") return null;
      if (P.space) return L(P.space) ? P.rect : null;
      const le = be(G, P.panel);
      return le && G.frames.includes(le) ? P.rect : null;
    }), F = h(() => {
      const P = n.dropTarget.value;
      return !!P && !P.rect && L(P.space);
    }), O = h(() => l.value?.direction === "row"), V = h(() => o.value.map((P, G) => [...t.path, G])), C = (P) => [...je(P)].sort().join("/"), R = (P) => {
      const G = je(P)[0];
      return (G ? n.panelFor(G)?.title : null) ?? G ?? "panel";
    }, X = (P) => {
      const G = o.value[P], le = o.value[P + 1];
      return !G || !le ? "Resize panels" : `Resize ${R(G)} and ${R(le)}`;
    }, ne = (P) => {
      const G = i.value[P] ?? 0, le = i.value[P + 1] ?? 0, re = G + le;
      return re > 0 ? Math.round(G / re * 100) : 50;
    };
    function ve() {
      const P = s.value, G = P ? O.value ? P.clientWidth : P.clientHeight : 0;
      return G <= 0 ? 0.05 : Math.min(n.minPanelSize.value / G, 0.4);
    }
    let S = null;
    function q(P, G) {
      const le = l.value, re = s.value;
      if (!n.resizable.value || !le || !re || P.button !== 0) return;
      const _e = O.value ? re.clientWidth : re.clientHeight;
      if (_e <= 0) return;
      const Se = O.value ? P.clientX : P.clientY, Xe = Ue(le), Ge = Math.min(n.minPanelSize.value / _e, 0.4);
      P.preventDefault();
      const Ye = (Oe) => {
        const Ke = ((O.value ? Oe.clientX : Oe.clientY) - Se) / _e;
        n.setSizes(t.path, Rs(Xe, G, Ke, Ge));
      }, Qe = () => S?.(), Ne = (Oe) => {
        Oe.key === "Escape" && (n.setSizes(t.path, Xe), S?.());
      };
      S = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", Qe), window.removeEventListener("keydown", Ne), S = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", Qe), window.addEventListener("keydown", Ne);
    }
    He(() => S?.());
    function z(P, G) {
      const le = l.value;
      if (!n.resizable.value || !le) return;
      const re = O.value ? "ArrowRight" : "ArrowDown", _e = O.value ? "ArrowLeft" : "ArrowUp", Se = P.shiftKey ? 0.1 : 0.02;
      if (P.key !== re && P.key !== _e) return;
      const Xe = P.key === re ? Se : -Se;
      P.preventDefault(), n.setSizes(t.path, Rs(Ue(le), G, Xe, ve()));
    }
    return (P, G) => {
      const le = Ns("WindowNode", !0);
      return a.value ? (p(), se(Da, {
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
      }, 8, ["group", "path"])) : (p(), m("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": y.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": f.value
      }, [
        !e.framed && !k.value ? (p(), m("header", Wu, [
          _("span", Uu, T(f.value), 1),
          w.value.length ? (p(), se(Hn, {
            key: 0,
            items: w.value,
            label: `${f.value} menu`
          }, null, 8, ["items", "label"])) : I("", !0)
        ])) : I("", !0),
        r.value ? (p(), m("div", {
          key: 1,
          ref_key: "desktop",
          ref: b,
          class: "dc-window__desktop"
        }, [
          N.value ? (p(), m("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${N.value.x}px`,
              top: `${N.value.y}px`,
              width: `${N.value.w}px`,
              height: `${N.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : I("", !0),
          (p(!0), m(J, null, ue(u.value, (re) => (p(), se(ku, {
            key: re.key,
            frame: re.held,
            path: re.path,
            order: re.order,
            place: x.value.get(re.key) ?? null
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
        ], 512)) : l.value ? (p(), m("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          F.value ? (p(), m("div", ju)) : I("", !0),
          (p(!0), m(J, null, ue(o.value, (re, _e) => (p(), m(J, {
            key: C(re)
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
            _e < o.value.length - 1 ? (p(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": O.value ? "vertical" : "horizontal",
              "aria-label": X(_e),
              "aria-valuenow": ne(_e),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (Se) => q(Se, _e),
              onKeydown: (Se) => z(Se, _e)
            }, null, 40, Xu)) : I("", !0)
          ], 64))), 128))
        ], 8, Hu)) : I("", !0)
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
    const s = e, a = n, l = At(e, "layout"), r = At(e, "views"), o = Tn(), i = h(() => new Map(s.panels.map((c) => [c.id, c]))), u = h(() => s.panels.map((c) => c.id)), f = h(() => nu(l.value, u.value)), w = U(null), k = U(null), y = U(null), b = U(!0), g = U(null), $ = U(null), x = U(null), L = U(""), N = U(null);
    function F() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((v) => v.closest(".dc-window") === c).map((v) => ({ panels: (v.dataset.dcPanels ?? "").split(" "), element: v })) : [];
    }
    function O(c) {
      const d = [];
      let v = c.closest(".dc-float");
      for (; v; )
        d.unshift(Number(v.dataset.dcOrder ?? 0)), v = v.parentElement?.closest(".dc-float") ?? null;
      return d;
    }
    function V() {
      return F().map((c) => ({ pane: c, order: O(c.element) })).sort((c, d) => {
        const v = Math.max(c.order.length, d.order.length);
        for (let M = 0; M < v; M += 1) {
          const A = (c.order[M] ?? -1) - (d.order[M] ?? -1);
          if (A !== 0) return A;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const C = (c) => F().find((d) => d.panels.includes(c)) ?? null;
    function R(c) {
      const d = i.value.get(c);
      if (!d) return "";
      const v = r.value[c];
      return v && d.views?.some((M) => M.key === v) ? v : d.defaultView ?? d.views?.[0]?.key ?? "";
    }
    function X(c, d) {
      r.value = { ...r.value, [c]: d }, a("view-change", { panel: c, view: d });
    }
    const ne = h(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ve(c) {
      return !s.movable || ne.value < 1 || s.panels.length < 2 ? !1 : i.value.get(c)?.fixed !== !0;
    }
    function S(c, d) {
      const v = f.value;
      !c || !v || c === v || (l.value = c, d && a("panel-move", d));
    }
    function q(c, d, v) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (d - c.left) / c.width, A = (v - c.top) / c.height, D = 0.3;
      return M > D && M < 1 - D && A > D && A < 1 - D ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: A },
        { edge: "bottom", distance: 1 - A }
      ].reduce(
        (te, B) => B.distance < te.distance ? B : te
      ).edge;
    }
    function z(c, d) {
      const v = [...c.querySelectorAll(".dc-tab")], M = v.findIndex((A) => {
        const D = A.getBoundingClientRect();
        return d < D.left + D.width / 2;
      });
      return M === -1 ? v.length : M;
    }
    function P(c, d, v) {
      for (const { panels: M, element: A } of V().reverse()) {
        const D = A.getBoundingClientRect();
        if (c < D.left || c > D.right || d < D.top || d > D.bottom) continue;
        const ie = M.find((Y) => Y !== v), te = A.querySelector(".dc-pane__tabs"), B = te?.getBoundingClientRect();
        if (te && B && d >= B.top && d <= B.bottom)
          return ie ? { panel: ie, edge: "center", index: z(te, c) } : null;
        const j = A.querySelector(":scope > .dc-pane__space");
        if (j) {
          const Y = j.getBoundingClientRect();
          if (c >= Y.left && c <= Y.right && d >= Y.top && d <= Y.bottom) continue;
        }
        return ie ? { panel: ie, edge: q(D, c, d) } : null;
      }
      return le(c, d, v) ?? Se(c, d);
    }
    function G() {
      const c = N.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((d) => d.closest(".dc-window") === c).reverse() : [];
    }
    function le(c, d, v) {
      const M = f.value;
      if (!M) return null;
      for (const A of G()) {
        const D = A.getBoundingClientRect();
        if (c < D.left || c > D.right || d < D.top || d > D.bottom) continue;
        const ie = Xe(A), te = ie.flatMap((oe) => oe.panels).find((oe) => oe !== v);
        if (!te && ie.length > 0) return null;
        const B = be(M, v)?.rect, j = gn(
          {
            x: c - D.left - 24,
            y: d - D.top - 12,
            w: B?.w ?? rt.w,
            h: B?.h ?? rt.h
          },
          { w: A.clientWidth, h: A.clientHeight },
          s.minPanelSize
        );
        if (te) return { panel: te, edge: "float", rect: j };
        const Y = re(A);
        return Y ? { panel: "", space: Y, edge: "float", rect: j } : null;
      }
      return null;
    }
    function re(c) {
      const d = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return d == null ? null : d === "" ? [] : d.split("/").map(Number);
    }
    function _e() {
      const c = N.value;
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
      return F().filter(
        (d) => d.element.closest(".dc-window__desktop") === c
      );
    }
    let Ge = null;
    const Ye = (c) => c.altKey;
    function Qe(c, d) {
      if (!ve(c) || k.value || $.value || d.button !== 0) return;
      const v = d.clientX, M = d.clientY;
      let A = !1, D = Ye(d);
      const ie = () => {
        const ce = x.value;
        ce && (y.value = D ? le(ce.x, ce.y, c) : P(ce.x, ce.y, c));
      }, te = (ce) => {
        if (!A) {
          if (Math.hypot(ce.clientX - v, ce.clientY - M) < 4) return;
          A = !0, k.value = c, g.value = null;
        }
        D = Ye(ce), b.value = !D, x.value = { x: ce.clientX, y: ce.clientY }, ie();
      }, B = (ce) => {
        Ye(ce) !== D && (D = !D, b.value = !D, A && ie());
      }, j = (ce) => {
        Ge?.();
        const Q = y.value, xe = f.value;
        if (ce && A && Q && xe) {
          const Ze = Q.space ? As(xe, c, Q.space, Q.rect) : Q.edge === "float" && Q.rect ? Ps(xe, c, Q.panel, Q.rect) : Qt(xe, c, Q.panel, Q.edge, Q.index);
          S(Ze, {
            panel: c,
            target: Q.panel,
            edge: Q.edge,
            ...Q.space === void 0 ? {} : { space: Q.space },
            ...Q.index === void 0 ? {} : { index: Q.index },
            ...Q.rect === void 0 ? {} : { rect: Q.rect }
          });
        }
        k.value = null, y.value = null, x.value = null, b.value = !0;
      }, Y = () => j(!0), oe = () => j(!1), me = (ce) => {
        if (ce.key === "Escape") {
          j(!1);
          return;
        }
        B(ce);
      };
      Ge = () => {
        window.removeEventListener("pointermove", te), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", oe), window.removeEventListener("keydown", me), window.removeEventListener("keyup", B), Ge = null;
      }, window.addEventListener("pointermove", te), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", oe), window.addEventListener("keydown", me), window.addEventListener("keyup", B);
    }
    He(() => Ge?.());
    let Ne = null;
    function Oe(c) {
      const d = N.value;
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
    function K(c) {
      const d = f.value, v = d ? be(d, c) : null;
      return v !== null && Je(v);
    }
    function W(c) {
      const d = f.value, v = d ? be(d, c) : null;
      return v !== null && lt(v);
    }
    function ee(c) {
      const d = f.value, v = d ? at(d, c) : null;
      return v ? Ce(v.node) : "";
    }
    function Me(c) {
      const d = f.value, v = d ? at(d, c) : null;
      if (!d || !v) return;
      const M = Ce(v.node);
      if (i.value.get(M)?.fixed === !0) return;
      const A = !lt(v);
      let D = Uc(d, c, A);
      D !== d && (A || (D = Rt(D, c)), l.value = D, a("frame-minimize", { panel: M, minimized: A }));
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
      let D = Wc(d, c, A);
      D !== d && (A && (D = Rt(D, c)), l.value = D, a("frame-maximize", { panel: M, maximized: A }));
    }
    function ls(c) {
      const d = Ke(c);
      d && Ct(d);
    }
    function rs(c, d, v) {
      const M = f.value, A = M ? at(M, c) : null;
      if (!M || !A || d.button !== 0 || k.value || $.value) return;
      const D = Ce(A.node);
      if (i.value.get(D)?.fixed === !0 || Je(A) || lt(A) || (v === "move" ? !s.movable : !s.resizable)) return;
      const ie = Oe(c), te = Hc(M, c);
      xt(c);
      const B = { w: ie?.clientWidth ?? 0, h: ie?.clientHeight ?? 0 }, j = { ...A.rect }, Y = d.clientX, oe = d.clientY, me = s.minPanelSize;
      $.value = D;
      const ce = (Ee) => {
        const Ve = f.value;
        if (!Ve) return;
        const Mt = Es(Ve, te, gn(Ee, B, me));
        Mt !== Ve && (l.value = Mt);
      }, Q = (Ee) => {
        Ee.preventDefault();
        const Ve = Ee.clientX - Y, Mt = Ee.clientY - oe;
        ce(
          v === "move" ? { ...j, x: j.x + Ve, y: j.y + Mt } : Ss(j, v, Ve, Mt, me)
        );
      }, xe = (Ee) => {
        if (Ne?.(), $.value = null, !Ee) {
          ce(j);
          return;
        }
        const Ve = f.value ? at(f.value, te) : null;
        Ve && a("frame-change", { panel: ee(te), rect: Ve.rect });
      }, Ze = () => xe(!0), nt = () => xe(!1), st = (Ee) => {
        Ee.key === "Escape" && xe(!1);
      };
      Ne = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", nt), window.removeEventListener("keydown", st), Ne = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", nt), window.addEventListener("keydown", st);
    }
    function Ia(c, d, v) {
      const M = Ke(c);
      M && rs(M, d, v);
    }
    function Na(c, d, v = !1) {
      const M = f.value, A = Ke(c), D = M && A ? at(M, A) : null;
      if (!M || !A || !D || i.value.get(c)?.fixed === !0 || (v ? !s.resizable : !s.movable)) return;
      if (Je(D) || lt(D)) {
        L.value = `${Le(c)} is ${Je(D) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ie = d === "left" ? -Zt : d === "right" ? Zt : 0, te = d === "up" ? -Zt : d === "down" ? Zt : 0, B = Oe(A), j = { w: B?.clientWidth ?? 0, h: B?.clientHeight ?? 0 }, Y = v ? Ss(D.rect, "se", ie, te, s.minPanelSize) : { ...D.rect, x: D.rect.x + ie, y: D.rect.y + te }, oe = Es(M, A, gn(Y, j, s.minPanelSize));
      if (oe === M) {
        L.value = v ? `${Le(c)} cannot be resized further.` : `${Le(c)} cannot move ${d}.`;
        return;
      }
      l.value = oe;
      const me = at(oe, A);
      me && (a("frame-change", { panel: c, rect: me.rect }), L.value = v ? `${Le(c)} resized to ${me.rect.w} by ${me.rect.h}.` : `${Le(c)} moved to ${me.rect.x}, ${me.rect.y}.`);
    }
    He(() => Ne?.());
    function Oa(c, d) {
      const v = C(c), M = v?.element.getBoundingClientRect();
      if (!v || !M) return null;
      const A = d === "left" || d === "right", D = (B) => {
        if (!(A ? B.bottom > M.top + 1 && B.top < M.bottom - 1 : B.right > M.left + 1 && B.left < M.right - 1)) return null;
        const Y = d === "left" ? M.left - B.right : d === "right" ? B.left - M.right : d === "up" ? M.top - B.bottom : B.top - M.bottom;
        return Y < -1 ? null : Y;
      }, ie = [];
      for (const B of F()) {
        if (B === v || B.element === v.element) continue;
        const j = D(B.element.getBoundingClientRect());
        if (j === null) continue;
        const Y = B.panels.find((oe) => oe !== c);
        Y && ie.push({ to: { panel: Y }, distance: j });
      }
      for (const { element: B, path: j } of _e()) {
        const Y = D(B.getBoundingClientRect());
        Y !== null && ie.push({ to: { space: j }, distance: Y });
      }
      return ie.reduce(
        (B, j) => B && B.distance <= j.distance ? B : j,
        null
      )?.to ?? null;
    }
    function Ka(c) {
      const d = f.value ? be(f.value, c) !== null : !1;
      if (!d && !ve(c)) return;
      g.value = g.value === c ? null : c;
      const v = Le(c);
      if (!g.value) {
        L.value = `${v}: move mode off.`;
        return;
      }
      L.value = d ? `${v}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${v}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Le = (c) => i.value.get(c)?.title ?? c, Va = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Ba(c, d, v = !1) {
      if (!ve(c)) return;
      const M = f.value;
      if (!M) return;
      const A = Le(c), D = pt(M, c);
      if (!v && D && (d === "left" || d === "right") && D.panels.length > 1) {
        const oe = D.panels.indexOf(c), me = d === "left" ? oe - 1 : oe + 1;
        if (me >= 0 && me < D.panels.length) {
          S(Tt(M, c, me), { panel: c, target: c, edge: "center", index: me }), L.value = `${A} moved ${d}, now tab ${me + 1} of ${D.panels.length}.`, fn(c);
          return;
        }
      }
      const te = Oa(c, d);
      if (!te || te.panel !== void 0 && !ve(te.panel)) {
        L.value = `${A} cannot move ${d}.`;
        return;
      }
      const B = Va[d];
      if (te.space) {
        const oe = te.space, me = tt(M, oe), ce = be(M, c)?.rect, Q = { ...rt, ...ce ? { w: ce.w, h: ce.h } : {} };
        S(As(M, c, oe, Q), { panel: c, target: "", space: oe, edge: B }), L.value = `${A} moved ${d}, into ${me ? kt(me) : "the space"}.`, fn(c);
        return;
      }
      const j = te.panel, Y = D?.panels.length === 1 && pt(M, j)?.panels.length === 1;
      v ? (S(Qt(M, c, j, "center"), {
        panel: c,
        target: j,
        edge: "center"
      }), L.value = `${A} joined ${Le(j)} as a tab.`) : Y ? (S(nn(M, c, j), { panel: c, target: j, edge: B }), L.value = `${A} moved ${d}, trading places with ${Le(j)}.`) : (S(Qt(M, c, j, B), { panel: c, target: j, edge: B }), L.value = `${A} moved ${d}, beside ${Le(j)}.`), fn(c);
    }
    function fn(c) {
      Dt(() => {
        C(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function qa(c, d) {
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
    function Wa(c) {
      os(c) && a("panel-close", c);
    }
    const vn = U(/* @__PURE__ */ new Map());
    let Ua = 0;
    function Ha(c, d) {
      const v = Ua += 1;
      return vn.value.set(v, { panel: c, items: d }), () => {
        vn.value.delete(v);
      };
    }
    function ja(c) {
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
    function Xa(c, d) {
      const v = d.id, M = pt(c, v), A = (M?.panels.length ?? 0) > 1, D = M?.fixedView === !0, ie = (Y) => ({
        action: () => {
          Y !== c && (l.value = Y);
        }
      }), te = [], B = [], j = d.views ?? [];
      if (j.length > 1 && !D) {
        const Y = R(v);
        te.push({
          id: "view",
          label: "View",
          items: j.map((oe) => ({
            id: `view-${oe.key}`,
            label: oe.label,
            checked: oe.key === Y,
            action: () => X(v, oe.key)
          }))
        });
      }
      return A && !D && B.push(
        { id: "show-row", label: "Row", checked: !1, ...ie(zs(c, v, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ie(zs(c, v, "column"))
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
      ), A && M && (B.length && B.push({ separator: !0 }), B.push(...us(M, v))), { panel: te, tabs: B, tabsTitle: M ? cs(M) : "" };
    }
    function us(c, d) {
      const v = ut(c), M = (A) => {
        const D = c.panels[(v + A + c.panels.length) % c.panels.length];
        return (D === void 0 ? "" : Ce(D)) || d;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => pn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => pn(M(-1)) }
      ];
    }
    function Gt(c) {
      return c.title ? c.title : H(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : kt(c);
    }
    function ds(c) {
      if (!c || Z(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Te(c)) return null;
      const d = Fa(c);
      return d && d.fixedView !== !0 ? d : null;
    }
    function Ga(c) {
      const d = f.value;
      if (!s.menu || !d) return [];
      const v = tt(d, c);
      if (!v || H(v)) return [];
      if (v.fixedView) return [];
      const M = Z(v) ? "desktop" : v.direction, A = (Q, xe, Ze) => ({
        id: `show-${Q}`,
        label: xe,
        checked: M === Q,
        action: () => {
          const nt = f.value, st = Ze();
          !nt || st === v || (l.value = cn(ye(it(nt, c, st))));
        }
      }), D = () => {
        const Q = za(v, Ya(v));
        if (H(Q) && Q.panels.length === 0) return v;
        const xe = H(Q) && Q.panels.length === 1 ? Q.panels[0] : void 0;
        return xe !== void 0 && fe(xe) ? v : Q;
      }, ie = (Q) => () => Z(v) ? La(v, Q) : v.direction === Q ? v : { ...v, direction: Q }, te = c.slice(0, -1), B = c.length > 0 ? tt(d, te) : null, j = B && H(B) && B.panels.length > 1 ? B : null, Y = B && ds(B) === v ? B : null, oe = ds(v), me = v.title || "this space", ce = (Q, xe, Ze, nt, st) => ({
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
            A("tabs", "Tabs", () => D()),
            A("desktop", "Desktop", () => Z(v) ? v : Ta(v))
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
            ...v.title ? [] : [ce("merge-inside-keep-that", te, Y, "outer", `Keep ${Gt(Y)}`)],
            ...Y.title ? [] : [ce("merge-inside-keep-this", te, Y, "inner", `Keep ${me}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: j ? cs(j) : "",
          items: j ? us(j, Ce(v)) : []
        }
      ]);
    }
    function Ya(c) {
      const d = w.value;
      return d && ae(c, d) ? d : void 0;
    }
    function Qa(c) {
      const d = f.value, v = i.value.get(c);
      if (!d || !v) return [];
      const M = s.menu ? Xa(d, v) : null, A = ja(c);
      A.length && M?.panel.length && A.push({ separator: !0 }), M && A.push(...M.panel);
      const D = is([
        { id: "about-panel", title: v.title, items: A },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(v, D) : D;
    }
    function Za(c, d) {
      return o[`${c}-${d}`] ?? o[c];
    }
    function fs(c, d, v, M) {
      return Za(c, d.id)?.({ panel: d, view: v, active: M });
    }
    su({
      panelFor: (c) => i.value.get(c) ?? null,
      viewFor: R,
      setView: X,
      movable: h(() => s.movable),
      resizable: h(() => s.resizable),
      minPanelSize: h(() => s.minPanelSize),
      spaceNames: h(() => s.spaceNames),
      focused: w,
      dragging: k,
      dropTarget: y,
      moving: g,
      framing: $,
      canMove: ve,
      focus(c) {
        w.value !== c && (w.value = c, a("panel-activate", c));
      },
      selectPanel: pn,
      beginDrag: Qe,
      toggleMoveMode: Ka,
      nudge: Ba,
      setSizes: qa,
      frameOf: (c) => f.value ? be(f.value, c) : null,
      beginFrameDrag: Ia,
      nudgeFrame: Na,
      raise: Xt,
      maximized: K,
      toggleMaximize: ls,
      minimized: W,
      toggleMinimize: $e,
      beginFrameDragAt: rs,
      raiseAt: xt,
      toggleMaximizeAt: Ct,
      toggleMinimizeAt: Me,
      menuFor: Qa,
      spaceMenu: Ga,
      registerMenu: Ha,
      closable: os,
      close: Wa,
      renderContent: (c, d, v) => fs("panel", c, d, v),
      renderActions: (c, d, v) => fs("actions", c, d, v),
      layout: f
    });
    const Ja = h(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), el = () => {
      const c = k.value, d = x.value;
      return !c || !d ? null : sl(
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
        A && S(Qt(A, c, d, v, M), {
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
        M && S(Ps(M, c, d, v), {
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
      setView: X,
      /** Brings a floating frame to the front of its stack. */
      raise: Xt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ls,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: $e
    }), (c, d) => (p(), m("div", {
      ref_key: "root",
      ref: N,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": k.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Re(Ja.value)
    }, [
      f.value ? (p(), se(Yu, {
        key: 0,
        node: f.value,
        path: []
      }, null, 8, ["node"])) : (p(), m("p", Zu, " This window has no panels. ")),
      he(el),
      _("p", Ju, T(L.value), 1)
    ], 12, Qu));
  }
}), td = /* @__PURE__ */ pe(ed, [["__scopeId", "data-v-711565af"]]);
function kd(e = "", t = "/") {
  const n = U(We(e)), s = U(t), a = [`${s.value}${n.value}`];
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
function Ls(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return We(s === -1 ? n : n.slice(0, s));
}
function wd(e) {
  const t = U(Ls(e.currentRoute.value.fullPath)), n = h(() => e.currentRoute.value.path), s = ke(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Ls(a);
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
  ShellHeader: ra,
  QueryPanel: ia,
  RecordActions: ca,
  ResultsArea: ga,
  FacetControl: oa,
  SegmentedControl: wc,
  StatusPill: Vt,
  WindowFrame: td,
  WindowPane: Da,
  ListView: Mn,
  CardsView: fa,
  GridView: pa,
  TableView: ha,
  LinksView: va,
  PreviewView: ma,
  TypeCardsView: _a
}, bd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(nd))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Os, t.route);
  }
};
export {
  on as CASCADE_STEP,
  rd as COLUMN_BREAKPOINTS,
  ld as COLUMN_ROLES,
  fa as CardsView,
  Cs as ColumnCell,
  rt as DEFAULT_FRAME,
  bn as DEFAULT_SORT,
  ll as DEFAULT_VIEW,
  _c as DataShell,
  $n as EMPTY_CELL,
  ta as ENTITY_ALL,
  rn as ENTITY_TERM,
  Nt as EXPRESSION_TERM,
  Wn as FACET_PREFIX,
  oa as FacetControl,
  pa as GridView,
  bd as HeaderContentLayoutPlugin,
  va as LinksView,
  Mn as ListView,
  dt as MINIMIZED_GAP,
  wa as MINIMIZED_HEIGHT,
  Sn as MINIMIZED_WIDTH,
  ka as MIN_FRAME,
  ws as MOCK_TINTS,
  id as MenuBar,
  Hn as MenuButton,
  ya as MenuList,
  Bt as MetricDrill,
  as as PANE_CONTEXT_KEY,
  Vn as PARAM_DIR,
  Nn as PARAM_ENTITY,
  Bn as PARAM_EXPR,
  qn as PARAM_PAGE,
  Kn as PARAM_SORT,
  On as PARAM_VIEW,
  Un as PinStar,
  ma as PreviewView,
  ia as QueryPanel,
  Yt as RECORD_STATUSES,
  Xs as RESULT_FIELDS,
  Os as ROUTE_ADAPTER_KEY,
  ca as RecordActions,
  ga as ResultsArea,
  ea as SHELL_CONTEXT_KEY,
  ad as SHELL_THEMES,
  qt as ScopeMark,
  wc as SegmentedControl,
  bt as SelectTick,
  ra as ShellHeader,
  Vt as StatusPill,
  ha as TableView,
  _a as TypeCardsView,
  Ks as VIEW_KINDS,
  rl as VIEW_LABELS,
  ns as WINDOW_CONTEXT_KEY,
  td as WindowFrame,
  Da as WindowPane,
  $a as activePanel,
  ut as activeTab,
  Vl as addTerm,
  Oc as axisOf,
  Gn as cascade,
  Qs as cellFull,
  Ot as cellText,
  en as cellTextOf,
  Ae as cellValue,
  vs as changesResults,
  gn as clampRect,
  za as collapseSpace,
  Yc as collapseToTabs,
  ud as column,
  _s as columnAlign,
  gs as columnClass,
  hs as columnKey,
  xn as columnTruncates,
  fl as columnsFor,
  il as countPages,
  al as createHistoryAdapter,
  kd as createMemoryAdapter,
  Il as createMockDataSource,
  wd as createVueRouterAdapter,
  ml as defaultCellText,
  Ts as defaultLayout,
  In as defaultQuery,
  Bl as drillExpression,
  As as dropIntoSpace,
  It as emptyFacetState,
  Ln as emptyFacetValue,
  ft as findEntity,
  et as findSort,
  fd as fixedView,
  Xn as float,
  Ps as floatPanel,
  Ta as floatSplit,
  Qc as floatTabs,
  Jt as fnv1a,
  qs as focusEntity,
  ms as formatCount,
  ul as formatDate,
  Cl as formatExpression,
  cl as formatMetric,
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
  js as hasActiveFacets,
  ae as hasPanel,
  dd as headless,
  Et as insertPanel,
  zt as isChoosable,
  od as isEntityScoped,
  Hs as isFacetActive,
  Z as isFloat,
  H as isGroup,
  Je as isMaximized,
  lt as isMinimized,
  fe as isPanelTab,
  Fn as isPristineQuery,
  $t as isSplit,
  Pe as isTabOf,
  Dn as isTypeCardsQuery,
  Vs as isViewKind,
  ks as joinExpression,
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
  Fa as onlySpace,
  je as panelIds,
  Ie as panelNode,
  Ms as panelTabs,
  yt as parseExpression,
  Yl as parseQuery,
  fo as presentParts,
  ua as presentRow,
  wu as providePaneContext,
  Wl as provideShellContext,
  su as provideWindowContext,
  yn as raiseFrame,
  Rt as raiseFrameAt,
  Hc as raisedPath,
  Gs as reconcileFacets,
  nu as reconcileLayout,
  Js as recordTerm,
  ot as removePanel,
  it as replaceAt,
  Ss as resizeRect,
  Rs as resizeSplit,
  Bs as resolveView,
  ze as roleColumn,
  Ys as roleColumns,
  cn as rootSpace,
  Qn as row,
  vl as rowKey,
  Nl as scopeTerm,
  Ol as scopeTermFor,
  ql as scopedEntity,
  xs as serializeQuery,
  mt as setActivePanel,
  Vc as setFrameRect,
  Es as setFrameRectAt,
  sn as setSizesAt,
  md as setSplitDirection,
  Ue as sizesOf,
  Us as sortsFor,
  ge as spaceChrome,
  kt as spaceTitle,
  Yn as split,
  Sl as splitExpression,
  zs as spreadTabs,
  Zl as summarizeQuery,
  aa as summaryTerms,
  nn as swapPanels,
  jn as tabNode,
  Ut as tabPanels,
  La as tileFloat,
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
