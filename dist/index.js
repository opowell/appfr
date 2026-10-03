import { ref as W, inject as zt, provide as es, computed as v, toValue as xt, shallowRef as Tt, watch as we, onScopeDispose as $n, defineComponent as oe, onMounted as xa, onBeforeUnmount as Be, resolveComponent as Ca, openBlock as f, createElementBlock as m, normalizeStyle as Ee, Fragment as ne, renderList as he, toDisplayString as I, createCommentVNode as R, createElementVNode as x, createBlock as J, nextTick as Ht, useId as ts, unref as z, normalizeClass as Lt, Teleport as nl, createVNode as fe, getCurrentScope as ns, withDirectives as gn, withKeys as Qe, withModifiers as Re, vModelText as _n, renderSlot as $e, useSlots as Gt, createTextVNode as He, withCtx as Ze, reactive as Us, resolveDynamicComponent as ss, createSlots as un, useModel as Bt, mergeModels as yn, Comment as sl, Text as al, h as rl } from "vue";
const Ma = Symbol("dc.routeAdapter");
function nt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ll() {
  const e = typeof window < "u", t = W(e ? nt(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), s = () => {
    t.value = nt(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, o) => {
    const l = nt(r);
    if (!e) {
      t.value = l;
      return;
    }
    const i = `${window.location.pathname}${l}${window.location.hash}`;
    o === "push" ? window.history.pushState(window.history.state, "", i) : window.history.replaceState(window.history.state, "", i), t.value = l, n.value = window.location.pathname;
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
const Sa = ["list", "cards", "grid", "images", "table", "links", "preview"], Df = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], rn = ["ok", "running", "queued", "review", "failed"], Bf = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], qf = [480, 620, 760, 900, 1100], ol = "cards", qn = "updated";
function Ea(e) {
  return typeof e == "string" && Sa.includes(e);
}
const il = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function as(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Ct(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Pa(e, t = {}) {
  const n = Ct(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Aa(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function za(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Aa(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const cl = { key: qn, label: qn };
function ot(e, t, n = null) {
  const s = za(e, n);
  return (t ? s.find((r) => r.key === t) : void 0) ?? s.find((r) => r.key === qn) ?? s[0] ?? cl;
}
function rs(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Rt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = rs(n);
  return t;
}
function Ta(e) {
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
function La(e) {
  return Object.values(e).some(Ta);
}
function ls(e) {
  return e.entity === null && e.expr.trim() === "" && !La(e.facets);
}
function Vf(e) {
  return e.entity !== null;
}
function os(e) {
  return e.entity === null && e.view === "cards";
}
function ul(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function is(e, t = {}) {
  const s = t.landing === "entity" ? Pa(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Ea(t.view) ? t.view : ol,
    sort: ot(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Rt(s),
    page: 1
  };
}
const Ra = ["entity", "sort", "dir", "expr", "facets"];
function js(e) {
  return Ra.some((t) => t in e);
}
function Na(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : rs(s);
  }
  return n;
}
function dn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function dl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function kt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function fl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function pl(e) {
  return String(e + 1).padStart(2, "0");
}
const Vn = "—";
function We(e, t) {
  return e.find((n) => n.role === t);
}
function Fa(e, t) {
  return e.filter((n) => n.role === t);
}
function vl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const hl = ["id", "entityKey", "entityLabel"];
function De(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (hl.includes(n))
      return t[n];
  }
}
function Gs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function ml(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function gl(e, t) {
  if (e == null || e === "") return Vn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? dl(n) : String(e);
  }
  return t === "date" ? fl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Vn : String(e);
}
function Xt(e, t) {
  const n = De(e, t);
  return e.format ? e.format(n, t) : gl(n, e.kind);
}
function _l(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Ia(e, t) {
  const n = Xt(e, t), s = _l(De(e, t));
  return s && s !== n ? s : n;
}
function fn(e, t) {
  return e ? Xt(e, t) : "";
}
function Xs(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const yl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Ys(e) {
  return [yl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Kn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const wl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function kl(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    if (s) {
      o === s ? s = null : n += o;
      continue;
    }
    if (o === '"' || o === "'") {
      s = o;
      continue;
    }
    if (/\s/.test(o)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(r + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += o;
  }
  return a(), t;
}
function Ne(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of kl(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const o = a.length > 1 && a.startsWith("-"), l = o ? a.slice(1) : a, i = o ? { negated: !0 } : {}, c = wl.exec(l);
    c && c[3] !== "" ? s.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...i
    }) : s.push({ kind: "text", value: l, ...i });
  }
  return s.length && n.push(s), n;
}
const Mt = (e) => e.toLowerCase().replace(/\s+/g, ""), Oa = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function bl(e, t, n) {
  const s = Mt(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = a.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Mt(c.label) === s
  );
  if (r) return De(r, t);
  const o = n.facets.find((c) => Mt(c.label) === s);
  if (o && o.key in t.fields) return t.fields[o.key];
  const l = Oa.find(([c]) => c === s)?.[1];
  if (l) {
    const c = We(a, l);
    if (c) return De(c, t);
  }
  const i = /^metric(\d+)$/.exec(s);
  if (i) {
    const c = Fa(a, "metric")[Number(i[1]) - 1];
    if (c) return De(c, t);
  }
}
function Da(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Qs = /^[a-z_][\w.-]*$/;
function Ba(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Qs.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Mt(e.label);
  return n !== void 0 && Qs.test(n) ? n : void 0;
}
function $l(e, t) {
  const n = Mt(e);
  if (n === "entity" || Oa.some(([a]) => a === n) || /^metric\d+$/.test(n)) return !0;
  const s = (a) => a !== void 0 && Mt(a) === n;
  return (t.columns ?? []).some(
    (a) => s(a.key) || s(a.field) || s(a.label)
  ) || t.facets.some((a) => s(a.key) || s(a.label));
}
function qa(e, t) {
  if (!t) return e;
  let n = !1;
  const s = Ne(e).map(
    (a) => a.map((r) => {
      if (r.kind !== "field") return r;
      const o = Va(r.field, t), l = o && Ba(o);
      return l ? (n = !0, { ...r, field: l }) : r;
    })
  );
  return n ? it(s) : e;
}
function Va(e, t) {
  if (!(!e || $l(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && Da(n.label) === e
    );
}
function xl(e, t) {
  if (!t || e.label === void 0 || !Ba(e)) return;
  const n = Da(e.label);
  return Va(n, t) === e ? n : void 0;
}
function Tn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function Zs(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Cl(e, t, n) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((l) => {
      const i = We(o, l), c = i ? De(i, t) : void 0;
      return typeof c == "string" && Tn(c, e.value);
    });
  }
  const s = bl(e.field, t, n);
  if (s === void 0) return null;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some(
      (l) => e.comparator === "=" ? Zs(String(l), e.value) : Tn(String(l), e.value)
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
    return e.comparator === "=" ? Zs(String(s), e.value) : Tn(String(s), e.value);
  }
  const a = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(r) ? null : Ml(e.comparator, r, a);
}
function Js(e, t, n) {
  const s = Cl(e, t, n);
  return s === null ? !0 : e.negated ? !s : s;
}
function Ml(e, t, n) {
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
function ea(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
function Sl(e, t, n) {
  return e.length ? e.some((s) => {
    const a = /* @__PURE__ */ new Map();
    for (const r of s)
      ea(r) && a.set(r.field, (a.get(r.field) ?? !1) || Js(r, t, n));
    return s.every(
      (r) => ea(r) ? a.get(r.field) === !0 : Js(r, t, n)
    );
  }) : !0;
}
function ta(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Yt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + ta(e.value) : `${t}${e.field}${e.comparator}${ta(e.value)}`;
}
function Kf(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function it(e) {
  return e.filter((t) => t.length).map((t) => t.map(Yt).join(" ")).join(" OR ");
}
function El(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((r, o) => o !== n) : s).filter((s) => s.length);
}
function Pl(e) {
  const t = Ne(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(Yt).join(" ")
  };
}
function na(e, t) {
  return [...e.map(Yt), t.trim()].filter(Boolean).join(" ");
}
const sa = (e, t) => e.toLowerCase() === t.toLowerCase();
function xn(e, t) {
  return !!e.negated == !!t.negated && Ka(e, t);
}
function Ut(e, t) {
  return !!e.negated != !!t.negated && Ka(e, t);
}
function Ka(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && sa(e.value, t.value) : t.kind === "text" && sa(e.value, t.value);
}
function Al(e, t) {
  return t.filter((n) => !e.some((s) => xn(s, n)));
}
function cs(e, t) {
  return Wa(e, t, (n) => n);
}
function zl(e, t) {
  return Wa(
    e,
    t,
    (n, s) => n.filter((a) => !s.some((r) => Ut(a, r)))
  );
}
function Wa(e, t, n) {
  const s = Ne(e), a = Ne(t);
  return s.length ? a.length ? it(
    s.flatMap(
      (r) => a.map((o) => [...n(r, o), ...Al(r, o)])
    )
  ) : it(s) : it(a);
}
const aa = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Ha(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Tl = 7, Ll = 3;
function Rl(e, t, n, s) {
  const a = (t * Tl + dn(n)) % s, r = [];
  for (let o = 0; o < Math.min(Ll, s); o++)
    r.push(Ha(e, (a + o) % s));
  return r;
}
function Nl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Fl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Fl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, o) => r - o).map((r) => e[r]);
}
function Il(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: r } = t, o = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${o}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return rn[n % rn.length];
    case "updated":
      return r;
    case "tint":
      return aa[n % aa.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return rn[n % rn.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Ol(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, o = t.scopes ?? [];
  if (!r.length) return [];
  const l = [];
  for (let i = 0; i < n; i++) {
    const c = r[i % r.length], u = Math.floor(i / r.length), h = dn(`${s}:${e.key}:${c[0]}:${i}`), y = Ha(e.key, i), w = new Date(a.getTime() - h % 900 * 36e5).toISOString(), k = {};
    for (const $ of e.columns ?? []) {
      const _ = $.field ?? $.key;
      if (!_ || $.value) continue;
      const C = Il($, {
        hash: dn(`${h}:${_}`),
        sample: c,
        revision: u,
        updatedAt: w
      });
      C !== void 0 && (k[_] = C);
    }
    for (const $ of e.facets)
      k[$.key] = Nl($, dn(`${h}:${$.key}`));
    for (const [$, _] of o)
      k[$] = _ === e.key ? y : Rl(_, i, $, n);
    l.push({ id: y, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return l;
}
function Dl(e, t) {
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
function Bl(e, t) {
  const n = e.find((o) => o.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", r = s === "date" || n.role === "updated";
  return (o, l) => {
    const i = De(n, o), c = De(n, l);
    return a ? Number(c ?? 0) - Number(i ?? 0) : r ? Date.parse(String(c ?? "")) - Date.parse(String(i ?? "")) : String(c ?? "").localeCompare(String(i ?? ""));
  };
}
function ql(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const r = t.get(s.key);
    if (r) return r;
    const o = e.scopes ?? a.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), l = Ol(s, { ...e, scopes: o });
    return t.set(s.key, l), l;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: o, offset: l }) {
      const i = Ne(s.expr), c = r ? [r] : a.entities, u = [], h = [];
      for (const k of c)
        for (const $ of n(k, a))
          u.push($), (r ? Dl($, s.facets) : !0) && Sl(i, $, k) && h.push($);
      const y = ot(r, s.sort, a), w = h.sort(Bl(Aa(r, a), y.key));
      return s.dir === "asc" && w.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: w.slice(l, l + o),
        total: h.length,
        unfiltered: h.length === u.length
      };
    }
  };
}
function us(e, t) {
  return Ua(e, t.id);
}
function Ua(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function ds(e, t) {
  return us(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function fs(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = Ne(t).flat();
  if (!s) return n;
  const a = Ne(n);
  return a.some((l) => l.some((i) => xn(i, s))) ? n : a.some((l) => l.some((i) => Ut(i, s))) ? it(
    a.map(
      (l) => l.map((i) => Ut(i, s) ? s : i)
    )
  ) : `${n} ${t}`;
}
function ja(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Ga(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Ne(t).flat();
  if (!n) return null;
  const s = Ne(e).flat();
  return s.some((a) => xn(a, n)) ? n.negated ? "out" : "in" : s.some((a) => Ut(a, n)) ? n.negated ? "in" : "out" : null;
}
function Xa(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Ne(t).flat();
  if (!n) return e;
  const s = Ne(e), a = s.map(
    (r) => r.filter((o) => !xn(o, n) && !Ut(o, n))
  );
  return a.every((r, o) => r.length === s[o]?.length) ? e : it(a);
}
function ra(e, t, n) {
  return t ? n === null ? Xa(e, t) : fs(e, n === "out" ? ja(t) : t) : e;
}
function qe(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey ? { exclude: !0 } : {};
}
function Vl(e, t, n, s = {}) {
  const a = ds(e, n);
  return fs(t.expr, s.exclude ? ja(a) : a);
}
function Ya(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const s = Ne(t), a = s.map(
    (r) => r.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return a.every((r, o) => r.length === s[o]?.length) ? t : it(a);
}
function Qa(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const Za = Symbol("dc.shellContext");
function Kl(e) {
  return es(Za, e), e;
}
function ke() {
  const e = zt(Za, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const ps = "e", vs = "v", hs = "s", ms = "d", gs = "q", _s = "p", ys = "f_", Ja = "*", Wl = [
  ps,
  vs,
  hs,
  ms,
  gs,
  _s
], Wn = "..", er = ",", Hl = [
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
function Ln(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Hl) t = t.replace(n, s);
  return t;
}
function tt(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function tr(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), o = a === -1 ? "" : s.slice(a + 1);
    n.push([tt(r), o]);
  }
  return n;
}
function Ul(e) {
  return Wl.includes(e) || e.startsWith(ys);
}
function la(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function jl(e, t) {
  const n = tt(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(er).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(Wn), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + Wn.length)).trim(), o = a === "" ? null : Number(a), l = r === "" ? null : Number(r);
      let i = o !== null && Number.isFinite(o) ? la(o, e.min, e.max) : null, c = l !== null && Number.isFinite(l) ? la(l, e.min, e.max) : null;
      return i !== null && c !== null && i > c && ([i, c] = [c, i]), { kind: "range", min: i, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Gl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(er) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Wn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Xl(e, t, n = {}) {
  const s = is(t, n), a = new Map(tr(e)), r = a.get(ps), o = r === void 0 ? s.entity : tt(r), l = o === Ja ? null : Ct(t, o), i = a.get(vs), c = i && Ea(tt(i)) ? tt(i) : s.view, u = a.get(hs), h = ot(l, u ? tt(u) : n.sort, t), y = a.get(ms), w = y ? tt(y) === "asc" ? "asc" : "desc" : s.dir, k = a.get(gs), $ = a.get(_s), _ = $ === void 0 ? 1 : Number(tt($)), C = Number.isFinite(_) ? Math.max(1, Math.floor(_)) : 1, L = {};
  for (const D of l?.facets ?? []) {
    const M = a.get(`${ys}${D.key}`);
    L[D.key] = M === void 0 ? rs(D) : jl(D, M);
  }
  return {
    entity: l?.key ?? null,
    view: c,
    sort: h.key,
    dir: w,
    expr: k === void 0 ? "" : tt(k),
    facets: Na(l, L),
    page: C
  };
}
function oa(e, t, n = {}, s = "") {
  const a = is(t, n), r = Ct(t, e.entity), o = tr(s).filter(([h]) => !Ul(h)), l = [], i = (h, y) => l.push([h, Ln(y)]), c = r?.key ?? null;
  c !== a.entity && i(ps, c ?? Ja), e.view !== a.view && i(vs, e.view), e.sort !== a.sort && i(hs, e.sort), e.dir !== a.dir && i(ms, e.dir), e.expr.trim() !== "" && i(gs, e.expr);
  for (const h of r?.facets ?? []) {
    const y = e.facets[h.key];
    if (!y) continue;
    const w = Gl(y, h);
    w !== null && l.push([`${ys}${h.key}`, Ln(w)]);
  }
  e.page > 1 && i(_s, String(e.page));
  const u = [
    ...o.map(([h, y]) => [Ln(h), y]),
    ...l
  ];
  return u.length ? `?${u.map(([h, y]) => y === "" ? h : `${h}=${y}`).join("&")}` : "";
}
const wn = "entity", jt = "expr";
function Yl(e, t) {
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
function ws(e, t) {
  const n = [];
  t && n.push({
    id: wn,
    label: `entity:${t.key}`,
    facetKey: wn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Ta(a) && n.push(...Yl(s, a));
  }
  return Ne(e.expr).forEach((s, a) => {
    s.forEach((r, o) => {
      n.push({
        id: `${jt}:${a}:${o}`,
        label: Yt(r),
        facetKey: jt,
        group: a,
        index: o,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function Ql(e, t, n = null) {
  if (ls(e)) {
    const r = ot(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const s = ws(e, t).filter((r) => r.facetKey !== jt).map((r) => r.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function Zl(e) {
  const { adapter: t } = e, n = v(() => xt(e.schema)), s = v(() => xt(e.defaults) ?? {}), a = v(() => Xl(t.search.value, n.value, s.value)), r = v(() => Ct(n.value, a.value.entity)), o = v(() => r.value ?? Pa(n.value, s.value)), l = v(() => za(r.value, n.value)), i = v(() => ot(r.value, a.value.sort, n.value)), c = (_, C) => {
    const L = oa(_, n.value, s.value, t.search.value);
    L !== t.search.value && (C === "push" ? t.push(L) : t.replace(L));
  }, u = () => xt(e.navigationMode) ?? "push", h = () => xt(e.facetNavigationMode) ?? "replace", y = (_, C) => {
    const L = _.page ?? (js(_) ? 1 : a.value.page);
    c({ ...a.value, ..._, page: L }, C);
  }, w = (_, C) => {
    const L = a.value.facets[_];
    if (!L) return;
    const D = { ...a.value.facets, [_]: C(L) };
    y({ facets: D }, h());
  }, k = (_) => {
    const C = _ === null ? null : Ct(n.value, _);
    return (C?.key ?? null) === a.value.entity ? {} : {
      entity: C?.key ?? null,
      sort: ot(C, a.value.sort, n.value).key,
      facets: Rt(C)
    };
  }, $ = (_) => {
    const C = k(_);
    Object.keys(C).length && y(C, u());
  };
  return {
    query: a,
    entity: r,
    focus: o,
    sort: i,
    sorts: l,
    summary: v(() => Ql(a.value, r.value, n.value)),
    terms: v(() => ws(a.value, r.value)),
    isPristine: v(() => ls(a.value)),
    isEverything: v(() => a.value.entity === null),
    hasFacets: v(() => La(a.value.facets)),
    setEntity: $,
    clearEntity: () => $(null),
    setView(_) {
      y({ view: _ }, u());
    },
    setSort(_) {
      y({ sort: ot(r.value, _, n.value).key }, u());
    },
    toggleDirection() {
      y({ dir: a.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(_) {
      y({ expr: _ }, u());
    },
    narrow(_, C, L) {
      y({ expr: _, ...k(C), ...L ? { view: L } : {} }, u());
    },
    setPage(_, C) {
      y({ page: Math.max(1, Math.floor(_)) }, C ?? u());
    },
    setFacet(_, C) {
      w(_, () => C);
    },
    toggleChip(_, C) {
      w(_, (L) => L.kind !== "chips" ? L : { kind: "chips", selected: L.selected.includes(C) ? L.selected.filter((M) => M !== C) : [...L.selected, C] });
    },
    setRange(_, C, L) {
      w(_, (D) => D.kind === "range" ? { kind: "range", min: C, max: L } : D);
    },
    toggleFlag(_) {
      w(
        _,
        (C) => C.kind === "toggle" ? { kind: "toggle", on: !C.on } : C
      );
    },
    removeTerm(_) {
      if (_.facetKey === wn) {
        $(null);
        return;
      }
      if (_.facetKey === jt) {
        const C = El(Ne(a.value.expr), _.group ?? 0, _.index ?? 0);
        y({ expr: it(C) }, u());
        return;
      }
      w(_.facetKey, (C) => C.kind === "chips" && _.option ? { kind: "chips", selected: C.selected.filter((L) => L !== _.option) } : C.kind === "range" ? { kind: "range", min: null, max: null } : C.kind === "toggle" ? { kind: "toggle", on: !1 } : C);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Rt(null) }, u());
    },
    reset() {
      c(is(n.value, s.value), u());
    },
    hrefFor(_) {
      const C = { ...a.value, ..._ };
      return C.page = _.page ?? (js(_) ? 1 : a.value.page), C.facets = Na(Ct(n.value, C.entity), C.facets), `${t.path.value}${oa(C, n.value, s.value, t.search.value)}`;
    }
  };
}
function Jl(e) {
  const t = Tt([]), n = W(0), s = W(!1), a = W(!1), r = Tt(null);
  let o = 0, l = null, i = null;
  const c = v(() => (e.query.value.page - 1) * e.limit.value), u = v(() => ul(n.value, e.limit.value)), h = () => {
    const M = e.query.value, P = e.within?.value.trim(), V = Ya(e.entity.value, M.expr);
    return P ? { ...M, expr: cs(P, V) } : V === M.expr ? M : { ...M, expr: V };
  }, y = (M, P) => {
    t.value = M.rows, n.value = M.total, r.value = null, w(P);
  }, w = (M) => {
    l = { key: M, total: n.value }, a.value = !1;
  }, k = (M) => {
    r.value = M, t.value = [], n.value = 0, l = null, a.value = !1;
  }, $ = (M, P, V, A) => {
    let b = !0;
    const K = () => M === o;
    let N = 0, Y = !1;
    const G = (ie) => {
      N = ie, Y = !0, A === void 0 && (n.value = ie);
    }, ge = () => {
      b && (b = !1, t.value = [], G(0)), r.value = null;
    };
    return {
      get open() {
        return K();
      },
      insert(ie, S) {
        if (!K()) return;
        const O = Array.isArray(ie) ? ie : [ie];
        if (!O.length) return;
        ge();
        const j = [...t.value];
        j.splice(S ?? j.length, 0, ...O), t.value = P > 0 ? j.slice(0, P) : j, G(N + O.length);
      },
      set(ie) {
        K() && (ie.rows && (ge(), t.value = P > 0 ? ie.rows.slice(0, P) : ie.rows, G(ie.rows.length)), ie.total !== void 0 && G(ie.total));
      },
      close() {
        K() && (s.value = !1, Y && (n.value = N), w(V));
      },
      fail(ie) {
        K() && (k(ie), s.value = !1);
      }
    };
  }, _ = () => {
    const M = i;
    i = null, M?.();
  }, C = () => {
    const M = ++o;
    _();
    const P = L.value, V = l?.key === P ? l.total : void 0;
    a.value = V === void 0;
    const A = {
      query: h(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, b = e.source.value;
    if (b.stream) {
      s.value = !0;
      try {
        i = b.stream(A, $(M, A.limit, P, V)) ?? null;
      } catch (N) {
        k(N), s.value = !1;
      }
      return;
    }
    let K;
    try {
      K = b.query(A);
    } catch (N) {
      k(N);
      return;
    }
    if (!(K instanceof Promise)) {
      y(K, P), s.value = !1;
      return;
    }
    s.value = !0, K.then((N) => {
      M === o && y(N, P);
    }).catch((N) => {
      M === o && k(N);
    }).finally(() => {
      M === o && (s.value = !1);
    });
  }, L = v(() => {
    const M = h();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Ra.map((V) => M[V]))}`;
  }), D = v(() => `${L.value}|${e.query.value.page}`);
  return we([e.source, D, e.limit], C, {
    immediate: !0
  }), $n(() => {
    o++, _();
  }, !0), { rows: t, total: n, offset: c, pageCount: u, pending: s, counting: a, error: r, refresh: C };
}
const qt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, eo = ["aria-label"], to = ["role", "aria-label"], no = ["data-dc-item"], so = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, ao = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], ro = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, lo = { class: "dc-menu__label dc-truncate" }, oo = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, io = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, co = /* @__PURE__ */ oe({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = W(null), o = W([]), l = W(null), i = W(null), c = W(null), u = W(!1), h = v(
      () => s.items.flatMap((A, b) => qt(A) ? [b] : [])
    ), y = v(() => {
      const A = [{ entries: [] }];
      return s.items.forEach((b, K) => {
        b.heading ? A.push({ heading: b, entries: [] }) : A[A.length - 1]?.entries.push({ item: b, index: K });
      }), A.filter((b) => b.entries.length > 0);
    }), w = W({ x: s.at.x, y: s.at.y });
    async function k() {
      w.value = { x: s.at.x, y: s.at.y }, await Ht();
      const A = r.value?.getBoundingClientRect();
      if (!A) return;
      const b = 8;
      let K = s.at.x, N = s.at.y;
      if (K + A.width > window.innerWidth - b) {
        const Y = s.at.mirrorX === void 0 ? null : s.at.mirrorX - A.width;
        K = Y !== null && Y >= b ? Y : window.innerWidth - A.width - b;
      }
      N + A.height > window.innerHeight - b && (N = window.innerHeight - A.height - b), w.value = { x: Math.max(b, K), y: Math.max(b, N) };
    }
    const $ = v(() => ({ left: `${w.value.x}px`, top: `${w.value.y}px` }));
    function _(A) {
      l.value = A, A !== null && Ht(() => o.value[A]?.focus());
    }
    function C(A, b) {
      const K = h.value;
      if (K.length === 0) return null;
      if (A === null) return b === 1 ? K[0] ?? null : K[K.length - 1] ?? null;
      const N = K.indexOf(A);
      return N === -1 ? K[0] ?? null : K[(N + b + K.length) % K.length] ?? null;
    }
    function L(A, b) {
      if (!s.items[A]?.items?.length) return;
      const N = o.value[A]?.getBoundingClientRect(), Y = r.value?.getBoundingClientRect();
      !N || !Y || (c.value = { x: Y.right - 4, y: N.top - 4, mirrorX: Y.left + 4 }, i.value = A, u.value = b);
    }
    function D(A) {
      const b = i.value;
      i.value = null, c.value = null, A && b !== null && _(b);
    }
    function M(A) {
      const b = s.items[A];
      if (!(!b || !qt(b))) {
        if (b.items?.length) {
          L(A, !0);
          return;
        }
        a("choose", b);
      }
    }
    function P(A) {
      const b = A.key;
      if (b === "Escape") {
        A.preventDefault(), A.stopPropagation(), i.value !== null ? D(!0) : a("dismiss");
        return;
      }
      if (b === "ArrowDown" || b === "ArrowUp") {
        A.preventDefault(), A.stopPropagation(), D(!1), _(C(l.value, b === "ArrowDown" ? 1 : -1));
        return;
      }
      if (b === "Home" || b === "End") {
        A.preventDefault(), A.stopPropagation(), D(!1), _(C(null, b === "Home" ? 1 : -1));
        return;
      }
      if (b === "ArrowRight") {
        const K = l.value;
        K !== null && s.items[K]?.items?.length && (A.preventDefault(), A.stopPropagation(), L(K, !0));
        return;
      }
      if (b === "ArrowLeft") {
        i.value !== null && (A.preventDefault(), A.stopPropagation(), D(!0));
        return;
      }
      if (b === "Enter" || b === " ") {
        const K = l.value;
        if (K === null) return;
        A.preventDefault(), A.stopPropagation(), M(K);
      }
    }
    function V(A) {
      const b = s.items[A];
      !b || !qt(b) || (i.value !== null && i.value !== A && D(!1), _(A), b.items?.length && L(A, !1));
    }
    return xa(() => {
      k(), s.autofocus && _(C(null, 1));
    }), we(() => s.at, k, { deep: !0 }), we(() => s.items, () => void k(), { deep: !0 }), Be(() => {
      i.value = null;
    }), t({ root: r }), (A, b) => {
      const K = Ca("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Ee($.value),
        onKeydown: P
      }, [
        (f(!0), m(ne, null, he(y.value, (N, Y) => (f(), m("div", {
          key: `${Y}-${N.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: N.heading ? "group" : "none",
          "aria-label": N.heading?.label
        }, [
          N.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": N.heading.id
          }, I(N.heading.label), 9, no)) : R("", !0),
          (f(!0), m(ne, null, he(N.entries, ({ item: G, index: ge }) => (f(), m(ne, {
            key: G.id ?? `${ge}-${G.label ?? ""}`
          }, [
            G.separator ? (f(), m("div", so)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (ie) => {
                ie && (o.value[ge] = ie);
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
              onClick: (ie) => M(ge),
              onMouseenter: (ie) => V(ge)
            }, [
              x("span", ro, I(G.checked ? "✓" : ""), 1),
              x("span", lo, I(G.label), 1),
              G.shortcut ? (f(), m("span", oo, I(G.shortcut), 1)) : G.items?.length ? (f(), m("span", io, "›")) : R("", !0)
            ], 40, ao))
          ], 64))), 128))
        ], 8, to))), 128)),
        i.value !== null && c.value ? (f(), J(K, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: c.value,
          label: e.items[i.value]?.label,
          autofocus: u.value,
          onChoose: b[0] || (b[0] = (N) => a("choose", N)),
          onDismiss: b[1] || (b[1] = (N) => D(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
      ], 44, eo);
    };
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ks = /* @__PURE__ */ ue(co, [["__scopeId", "data-v-9b1413fa"]]), uo = { class: "dc-pick" }, fo = ["id"], po = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], vo = { class: "dc-pick__label" }, ho = /* @__PURE__ */ oe({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ts() ?? "dc-pick", r = W(null), o = W(null), l = W(null), i = W(!1), c = v(() => l.value !== null), u = W(null), h = v(
      () => n.options.find((M) => M.key === n.modelValue) ?? n.options[0]
    ), y = v(
      () => n.options.map((M) => ({
        id: M.key,
        label: M.label,
        checked: M.key === n.modelValue
      }))
    ), w = v(
      () => l.value ? { maxHeight: `${window.innerHeight - l.value.y - 8}px` } : void 0
    );
    function k(M) {
      const P = r.value?.getBoundingClientRect();
      P && (u.value = r.value?.closest(".dc-shell") ?? document.body, l.value = { x: P.left, y: P.bottom + 4, mirrorX: P.right }, i.value = M, s("open"));
    }
    function $(M) {
      l.value && s("close"), l.value = null, M && r.value?.focus();
    }
    function _() {
      c.value ? $(!0) : k(!1);
    }
    function C(M) {
      M.key !== "ArrowDown" && M.key !== "ArrowUp" || c.value || (M.preventDefault(), k(!0));
    }
    function L(M) {
      const P = M.target;
      P && (r.value?.contains(P) || o.value?.root?.contains(P) || $(!1));
    }
    we(c, (M) => {
      M ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), Be(() => window.removeEventListener("pointerdown", L, !0));
    function D(M) {
      $(!0), !(M.id === void 0 || M.id === n.modelValue) && s("update:modelValue", M.id);
    }
    return (M, P) => (f(), m("span", uo, [
      x("span", {
        id: `${z(a)}-name`,
        class: "dc-pick__name"
      }, I(e.label), 9, fo),
      x("button", {
        id: `${z(a)}-value`,
        ref_key: "trigger",
        ref: r,
        type: "button",
        class: Lt(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${z(a)}-name ${z(a)}-value`,
        "data-dc-value": e.modelValue,
        onClick: _,
        onKeydown: C
      }, [
        x("span", vo, I(h.value?.label), 1)
      ], 42, po),
      P[1] || (P[1] = x("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      l.value && u.value ? (f(), J(nl, {
        key: 0,
        to: u.value
      }, [
        fe(ks, {
          ref_key: "menu",
          ref: o,
          class: "dc-pick__list",
          style: Ee(w.value),
          items: y.value,
          at: l.value,
          label: e.label,
          autofocus: i.value,
          onChoose: D,
          onDismiss: P[0] || (P[0] = (V) => $(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : R("", !0)
    ]));
  }
}), ia = /* @__PURE__ */ ue(ho, [["__scopeId", "data-v-d21ebf1b"]]);
function mo(e) {
  const t = Tt(/* @__PURE__ */ new Map()), n = W(!0);
  let s = 0, a;
  const r = () => {
    s++, a?.abort(), a = void 0;
  }, o = () => {
    r();
    const l = s, { signal: i } = a = new AbortController(), c = e.query.value, u = e.schema.value, h = e.entities.value, y = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !y;
    const w = /* @__PURE__ */ new Map();
    let k = !0;
    for (const $ of h) {
      const _ = Ya($, c.expr), C = y ? cs(y, _) : _;
      let L = !1;
      const D = (P) => {
        if (l !== s) return;
        if (k) {
          w.set($.key, P);
          return;
        }
        const V = new Map(t.value);
        V.set($.key, P), t.value = V;
      }, M = e.source.value.query({
        query: { ...c, entity: $.key, expr: C, facets: Rt($), page: 1 },
        schema: u,
        entity: $,
        limit: 0,
        offset: 0,
        signal: i,
        progress: (P) => {
          L || D({ total: P, pending: !0, counted: !0 });
        }
      });
      M instanceof Promise ? (w.has($.key) || w.set($.key, { total: 0, pending: !0, counted: !1 }), M.then((P) => {
        L = !0, D({ total: P.total, pending: !1, counted: !0 });
      })) : (L = !0, w.set($.key, { total: M.total, pending: !1, counted: !0 }));
    }
    k = !1, t.value = w;
  };
  return ns() && $n(r), { counts: t, pristine: n, refresh: o, cancel: r };
}
const go = 25, nr = (e, t) => e.toLowerCase() === t.toLowerCase();
function _o(e, t) {
  return e.find((n) => nr(n.id, t));
}
function yo(e) {
  const t = Tt(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), s = (l) => {
    if (l.facetKey !== jt || !l.field || !l.value) return null;
    const i = Qa(e.schema.value, l.field);
    return i ? { entity: i, id: l.value, key: `${i.key}:${l.value}` } : null;
  }, a = (l) => {
    const { entity: i, id: c } = l, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Ua(i, c) ?? "",
        facets: Rt(i),
        sort: ot(i, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: go,
      offset: 0
    });
  }, r = (l, i) => {
    const c = fn(We(l.columns ?? [], "identity"), i);
    return c === Vn || nr(c, i.id) ? "" : c;
  }, o = () => {
    const l = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const h = s(u);
      h && !t.value.has(h.key) && !n.has(h.key) && l.set(h.key, h);
    }
    if (!l.size) return;
    const i = [...l.values()].map((u) => ({
      reference: u,
      outcome: a(u)
    })), c = (u) => {
      const h = new Map(t.value);
      u.forEach((y, w) => {
        const { reference: k } = i[w], $ = _o(y.rows, k.id);
        h.set(k.key, $ ? r(k.entity, $) : "");
      }), t.value = h;
    };
    if (i.every(({ outcome: u }) => !(u instanceof Promise))) {
      c(i.map(({ outcome: u }) => u));
      return;
    }
    for (const { reference: u } of i) n.add(u.key);
    Promise.all(i.map(({ outcome: u }) => Promise.resolve(u))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: u } of i) n.delete(u.key);
    });
  };
  return we([e.source, e.schema, e.terms], () => {
    try {
      o();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(l) {
      const i = s(l);
      return i && t.value.get(i.key) || null;
    }
  };
}
const wo = ["data-dc-expanded"], ko = { class: "dc-header__domain" }, bo = {
  key: 0,
  class: "dc-header__within"
}, $o = ["title"], xo = ["data-dc-more", "title"], Co = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Mo = ["title", "aria-label", "onClick"], So = ["onKeydown"], Eo = ["aria-expanded", "aria-controls"], Po = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Ao = { class: "dc-header__sr" }, zo = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, To = ["disabled"], Lo = ["title"], Ro = ["value", "onKeydown"], No = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Fo = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Io = ["disabled"], Oo = {
  key: 1,
  class: "dc-header__actions"
}, Do = "…", Bo = /* @__PURE__ */ oe({
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
    const n = e, s = t, a = ke(), r = v(() => a.schema.value), o = v(
      () => a.hasFacets.value || !!a.query.value.expr.trim() || !!a.within.value
    ), l = v(() => r.value.formatCount ?? kt), i = mo({
      source: a.source,
      schema: a.schema,
      query: a.query,
      entities: a.entities,
      within: a.within
    });
    function c(B) {
      if (n.hideCount) return B.count;
      if (B.key === a.query.value.entity && o.value) return l.value(a.total.value);
      if (i.pristine.value) return B.count;
      const E = i.counts.value.get(B.key);
      return E ? E.counted ? `${E.pending ? "~" : ""}${l.value(E.total)}` : Do : B.count;
    }
    function u(B) {
      return `${B.label} · ${c(B)}`;
    }
    const h = v(() => [
      { key: "", label: "Everything" },
      ...a.entities.value.map((B) => ({ key: B.key, label: u(B) }))
    ]), y = v(() => {
      const B = a.within.value.trim();
      return B ? ws({ ...a.query.value, expr: B, facets: {} }, null) : [];
    }), w = v(
      () => (n.views ?? [...Sa]).map((B) => ({ key: B, label: il[B] }))
    ), k = v(() => as(a.query.value.view, n.views)), $ = v(() => a.query.value.entity !== null);
    function _(B) {
      a.setView(B);
    }
    const C = v(() => {
      const B = a.entity.value, Q = B?.keepsScope ? void 0 : B?.scope?.toLowerCase();
      return a.terms.value.filter((E) => E.facetKey !== wn).map((E, U, ae) => {
        const Ce = ae[U - 1];
        return {
          term: E,
          or: Ce?.group !== void 0 && E.group !== void 0 && E.group !== Ce.group,
          idle: !!Q && E.field?.toLowerCase() === Q
        };
      });
    }), L = yo({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...y.value, ...a.terms.value])
    });
    function D(B) {
      return Qa(r.value, B)?.scopeLabel ?? B;
    }
    function M(B) {
      return B.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function P(B) {
      const Q = L.nameOf(B);
      return Q ? `${B.negated ? "-" : ""}${D(B.field)}: ${M(Q)}` : B.label;
    }
    function V(B) {
      a.setEntity(B || null);
    }
    const A = W(""), b = W(null);
    function K() {
      const B = A.value.trim();
      B && (a.setExpression(
        zl(a.query.value.expr, qa(B, a.entity.value))
      ), A.value = "");
    }
    function N() {
      A.value = "", b.value?.blur();
    }
    function Y(B) {
      if (A.value) return;
      const Q = C.value.at(-1);
      Q && (B.preventDefault(), a.removeTerm(Q.term));
    }
    function G(B) {
      B.target?.closest("button, select, label, input") || s("toggle");
    }
    const ge = W(null), ie = W("");
    function S() {
      const B = ge.value;
      if (!B) {
        ie.value = "";
        return;
      }
      const Q = B.scrollLeft > 1, E = B.scrollWidth - B.clientWidth - B.scrollLeft > 1;
      ie.value = Q && E ? "both" : Q ? "start" : E ? "end" : "";
    }
    let O = null;
    we(
      ge,
      (B) => {
        O?.disconnect(), O = null, S(), !(!B || typeof ResizeObserver > "u") && (O = new ResizeObserver(S), O.observe(B));
      },
      { flush: "post" }
    ), we(C, S, { flush: "post" }), Be(() => O?.disconnect());
    const j = v(() => a.query.value.page), re = v(
      () => (a.pageCount.value > 1 || !!n.pagesNote) && !os(a.query.value)
    ), _e = v(
      () => `${a.counting.value ? "~" : ""}${kt(a.pageCount.value)}`
    ), Pe = v(() => {
      let B = `Page ${kt(j.value)} of ${_e.value}`;
      const Q = a.rows.value.length;
      if (Q) {
        const E = a.offset.value + 1, U = `${a.counting.value ? "~" : ""}${kt(a.total.value)}`;
        B += ` — rows ${kt(E)} to ${kt(E + Q - 1)} of ${U}`;
      }
      return n.pagesNote ? `${B}
${n.pagesNote}` : B;
    }), Le = W(null), je = v(() => Le.value ?? String(j.value)), Ge = v(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function Xe(B) {
      B.target.select();
    }
    function Ve(B) {
      const Q = B.target, E = Q.value.replace(/[^0-9]/g, "");
      Q.value !== E && (Q.value = E), Le.value = E;
    }
    function Fe(B) {
      const Q = B.target, E = Number(Le.value);
      Le.value = null;
      const U = Number.isFinite(E) && E >= 1 ? Math.min(Math.trunc(E), Math.max(1, a.pageCount.value)) : j.value;
      Q.value = String(U), U !== j.value && a.setPage(U);
    }
    function Ke(B) {
      const Q = B.target;
      Le.value = null, Q.value = String(j.value), Q.blur();
    }
    return (B, Q) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      x("div", {
        class: "dc-header__trigger",
        onClick: G
      }, [
        x("span", ko, I(r.value.label), 1),
        y.value.length ? (f(), m("span", bo, [
          Q[4] || (Q[4] = x("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(ne, null, he(y.value, (E) => (f(), m("span", {
            key: `scope:${E.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: P(E)
          }, I(P(E)), 9, $o))), 128))
        ])) : R("", !0),
        x("div", {
          ref_key: "termBar",
          ref: ge,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ie.value,
          title: z(a).summary.value,
          onScroll: S
        }, [
          $.value ? (f(), J(ia, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": z(a).query.value.entity ?? "",
            options: h.value,
            onOpen: z(i).refresh,
            onClose: z(i).cancel,
            "onUpdate:modelValue": V
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : R("", !0),
          fe(ia, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": k.value,
            options: w.value,
            "onUpdate:modelValue": _
          }, null, 8, ["model-value", "options"]),
          (f(!0), m(ne, null, he(C.value, (E) => (f(), m(ne, {
            key: E.term.id
          }, [
            E.or ? (f(), m("span", Co, "or")) : R("", !0),
            x("button", {
              type: "button",
              class: Lt(["dc-term dc-mono", { "dc-term--idle": E.idle }]),
              title: E.idle ? `Not applied to ${z(a).entity.value?.label} — remove ${P(E.term)}` : `Remove ${P(E.term)}`,
              "aria-label": `Remove ${P(E.term)}`,
              onClick: (U) => z(a).removeTerm(E.term)
            }, I(P(E.term)), 11, Mo)
          ], 64))), 128)),
          gn(x("input", {
            ref_key: "searchBox",
            ref: b,
            "onUpdate:modelValue": Q[0] || (Q[0] = (E) => A.value = E),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Qe(Re(K, ["prevent"]), ["enter"]),
              Qe(Re(N, ["prevent"]), ["esc"]),
              Qe(Y, ["backspace"])
            ]
          }, null, 40, So), [
            [_n, A.value]
          ])
        ], 40, xo),
        x("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: Q[1] || (Q[1] = (E) => s("toggle"))
        }, [
          x("span", Po, I(e.expanded ? "▲" : "▼"), 1),
          x("span", Ao, I(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Eo)
      ]),
      re.value ? (f(), m("nav", zo, [
        x("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: j.value <= 1,
          onClick: Q[2] || (Q[2] = (E) => z(a).setPage(j.value - 1))
        }, [...Q[5] || (Q[5] = [
          x("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, To),
        x("span", {
          class: "dc-header__page dc-mono",
          title: Pe.value
        }, [
          x("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Ee({ width: Ge.value }),
            value: je.value,
            onFocus: Xe,
            onInput: Ve,
            onKeydown: [
              Qe(Re(Fe, ["prevent"]), ["enter"]),
              Qe(Re(Ke, ["prevent"]), ["esc"])
            ],
            onBlur: Fe
          }, null, 44, Ro),
          x("span", No, "/ " + I(_e.value), 1)
        ], 8, Lo),
        x("span", Fo, I(Pe.value), 1),
        x("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: j.value >= z(a).pageCount.value,
          onClick: Q[3] || (Q[3] = (E) => z(a).setPage(j.value + 1))
        }, [...Q[6] || (Q[6] = [
          x("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Io)
      ])) : R("", !0),
      B.$slots.actions ? (f(), m("div", Oo, [
        $e(B.$slots, "actions", {}, void 0, !0)
      ])) : R("", !0)
    ], 8, wo));
  }
}), sr = /* @__PURE__ */ ue(Bo, [["__scopeId", "data-v-682f5b6d"]]), qo = { class: "dc-facet" }, Vo = ["id"], Ko = { class: "dc-facet__body" }, Wo = ["aria-labelledby"], Ho = ["aria-pressed", "data-dc-active", "onClick"], Uo = ["aria-labelledby"], jo = ["aria-label", "placeholder", "onKeydown"], Go = ["aria-label", "placeholder", "onKeydown"], Xo = ["aria-checked"], Yo = { class: "dc-switch__text" }, Qo = ["data-dc-active"], Zo = /* @__PURE__ */ oe({
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
    function r(h) {
      if (n.value.kind !== "chips") return;
      const y = a.value.has(h) ? n.value.selected.filter((w) => w !== h) : [...n.value.selected, h];
      s("update", { kind: "chips", selected: y });
    }
    const o = W(""), l = W("");
    we(
      () => n.value,
      (h) => {
        h.kind === "range" && (o.value = h.min === null ? "" : h.min, l.value = h.max === null ? "" : h.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(h) {
      if (typeof h == "number") return Number.isFinite(h) ? h : null;
      const y = h.trim();
      if (!y) return null;
      const w = Number(y);
      return Number.isFinite(w) ? w : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const h = i(o.value), y = i(l.value);
      h === n.value.min && y === n.value.max || s("update", { kind: "range", min: h, max: y });
    }
    function u() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (h, y) => (f(), m("div", qo, [
      x("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, I(e.facet.label), 9, Vo),
      x("div", Ko, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), m(ne, null, he(e.facet.options, (w) => (f(), m("button", {
            key: w,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(w),
            "data-dc-active": a.value.has(w) ? "true" : "false",
            onClick: (k) => r(w)
          }, I(w), 9, Ho))), 128))
        ], 8, Wo)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          gn(x("input", {
            "onUpdate:modelValue": y[0] || (y[0] = (w) => o.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: Qe(Re(c, ["prevent"]), ["enter"])
          }, null, 40, jo), [
            [_n, o.value]
          ]),
          y[2] || (y[2] = x("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          gn(x("input", {
            "onUpdate:modelValue": y[1] || (y[1] = (w) => l.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: Qe(Re(c, ["prevent"]), ["enter"])
          }, null, 40, Go), [
            [_n, l.value]
          ])
        ], 8, Uo)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: u
        }, [
          x("span", Yo, I(e.facet.text), 1),
          x("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...y[3] || (y[3] = [
            x("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Qo)
        ], 8, Xo)) : R("", !0)
      ])
    ]));
  }
}), ar = /* @__PURE__ */ ue(Zo, [["__scopeId", "data-v-36d1334b"]]), Jo = ["id"], ei = { class: "dc-panel__section dc-panel__rows" }, ti = { class: "dc-panel__row" }, ni = ["for"], si = ["title", "aria-label", "onClick"], ai = ["id", "placeholder", "onKeydown"], ri = { class: "dc-panel__actions" }, li = ["disabled"], oi = {
  key: 0,
  class: "dc-panel__section"
}, ii = /* @__PURE__ */ oe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Gt(), a = ke(), r = v(() => Pl(a.query.value.expr)), o = v(() => r.value.parts.map(Yt)), l = W(r.value.text), i = W(null);
    we(
      () => r.value.text,
      ($) => {
        l.value = $;
      }
    );
    const c = v(() => l.value !== r.value.text);
    function u() {
      if (c.value) {
        const $ = qa(l.value, a.entity.value);
        a.setExpression(na(r.value.parts, $));
      }
      n("close");
    }
    function h($) {
      const { parts: _, text: C } = r.value;
      a.setExpression(na(_.filter((L, D) => D !== $), C));
    }
    function y($) {
      const { parts: _ } = r.value;
      l.value || !_.length || ($.preventDefault(), h(_.length - 1));
    }
    function w() {
      l.value = "", a.clearFilters();
    }
    function k($, _) {
      a.setFacet($, _);
    }
    return Ht(() => i.value?.focus()), ($, _) => (f(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: _[2] || (_[2] = Qe(Re((C) => n("close"), ["stop"]), ["esc"]))
    }, [
      x("section", ei, [
        x("div", ti, [
          x("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, ni),
          x("div", {
            class: "dc-field",
            onMousedown: _[1] || (_[1] = Re((C) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(ne, null, he(o.value, (C, L) => (f(), m("button", {
              key: `${L}:${C}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${C}`,
              "aria-label": `Remove ${C}`,
              onClick: (D) => h(L)
            }, I(C), 9, si))), 128)),
            gn(x("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": _[0] || (_[0] = (C) => l.value = C),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: o.value.length ? "" : z(a).schema.value.placeholder,
              onKeydown: [
                Qe(Re(u, ["prevent"]), ["enter"]),
                Qe(y, ["backspace"])
              ]
            }, null, 40, ai), [
              [_n, l.value]
            ])
          ], 32)
        ]),
        z(a).entity.value ? (f(!0), m(ne, { key: 0 }, he(z(a).entity.value.facets, (C) => (f(), J(ar, {
          key: C.key,
          facet: C,
          value: z(a).query.value.facets[C.key],
          onUpdate: (L) => k(C.key, L)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : R("", !0),
        x("div", ri, [
          x("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: u
          }, " Run query "),
          x("button", {
            type: "button",
            class: "dc-button",
            disabled: z(a).isPristine.value && !c.value,
            onClick: w
          }, " Reset ", 8, li)
        ])
      ]),
      s["panel-section"] ? (f(), m("section", oi, [
        $e($.$slots, "panel-section", {}, void 0, !0)
      ])) : R("", !0)
    ], 40, Jo));
  }
}), rr = /* @__PURE__ */ ue(ii, [["__scopeId", "data-v-640ae2f5"]]), ci = ["checked", "indeterminate"], lr = /* @__PURE__ */ oe({
  __name: "PageTick",
  setup(e) {
    const t = ke(), n = v(() => t.rows.value.filter((r) => t.isSelected(r)).length), s = v(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), a = v(() => n.value > 0 && !s.value);
    return (r, o) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: s.value,
      indeterminate: a.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: o[0] || (o[0] = (l) => z(t).selectPage(!s.value))
    }, null, 40, ci));
  }
}), ui = {
  key: 0,
  class: "dc-actions"
}, di = {
  key: 0,
  class: "dc-actions__select"
}, fi = {
  key: 0,
  class: "dc-actions__all"
}, pi = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, vi = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, hi = { class: "dc-actions__ops" }, mi = ["disabled"], gi = ["disabled"], _i = /* @__PURE__ */ oe({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ke(), s = v(() => n.entity.value), a = v(() => !os(n.query.value)), r = v(() => a.value && n.selectable.value), o = v(
      () => as(n.query.value.view, t.views) === "table"
    ), l = v(
      () => a.value && (r.value || !!(s.value?.create || s.value?.duplicate || s.value?.delete))
    ), i = v(() => n.selection.value.ids.length), c = v(() => i.value ? `${i.value} selected` : o.value ? "None selected" : "Select all");
    function u(h) {
      return i.value ? `${h} ${i.value}` : h;
    }
    return (h, y) => l.value ? (f(), m("div", ui, [
      r.value ? (f(), m("div", di, [
        o.value ? (f(), m("span", vi, I(c.value), 1)) : (f(), m("label", fi, [
          fe(lr),
          x("span", pi, I(c.value), 1)
        ])),
        i.value ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[0] || (y[0] = (w) => z(n).clearSelection())
        }, " Clear ")) : R("", !0)
      ])) : R("", !0),
      x("div", hi, [
        s.value?.create ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: y[1] || (y[1] = (w) => z(n).create(s.value))
        }, [
          y[4] || (y[4] = x("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          He(" " + I(s.value.create), 1)
        ])) : R("", !0),
        s.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !i.value,
          onClick: y[2] || (y[2] = (w) => z(n).duplicate())
        }, I(u(s.value.duplicate)), 9, mi)) : R("", !0),
        s.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !i.value,
          onClick: y[3] || (y[3] = (w) => z(n).delete())
        }, I(u(s.value.delete)), 9, gi)) : R("", !0)
      ])
    ])) : R("", !0);
  }
}), or = /* @__PURE__ */ ue(_i, [["__scopeId", "data-v-03ff2a91"]]);
function yi(e, t) {
  if (!e) return null;
  const n = De(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function wi(e, t) {
  const n = We(t, "state"), s = We(t, "tint");
  return {
    identity: fn(We(t, "identity"), e),
    reference: fn(We(t, "reference"), e),
    metrics: Fa(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Xt(a, e)
    })),
    state: n ? De(n, e) ?? null : null,
    updated: fn(We(t, "updated"), e),
    image: yi(We(t, "image"), e),
    tint: s ? De(s, e) ?? null : null
  };
}
function ir(e, t, n, s, a = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: ml(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: pl(t),
    parts: wi(e, r),
    pinned: s,
    selected: a
  };
}
function _t() {
  const e = ke(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, s) => ir(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const ki = ["data-dc-status"], bi = /* @__PURE__ */ oe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, I(e.status), 9, ki));
  }
}), Qt = /* @__PURE__ */ ue(bi, [["__scopeId", "data-v-23e59fbf"]]), $i = ["title"], xi = { key: 1 }, Ci = /* @__PURE__ */ oe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ke(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), r = v(() => Xt(t.column, t.entry.row));
    function o(l) {
      l.stopPropagation(), s.value && n.drill(t.entry.row, s.value, qe(l));
    }
    return (l, i) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: o
    }, [
      $e(l.$slots, "default", {}, () => [
        He(I(r.value), 1)
      ], !0)
    ], 8, $i)) : (f(), m("span", xi, [
      $e(l.$slots, "default", {}, () => [
        He(I(r.value), 1)
      ], !0)
    ]));
  }
}), Zt = /* @__PURE__ */ ue(Ci, [["__scopeId", "data-v-f2501b17"]]), Mi = ["data-dc-active", "aria-pressed", "aria-label"], Si = /* @__PURE__ */ oe({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ke();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, r) => (f(), m("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, I(e.pinned ? "★" : "☆"), 9, Mi));
  }
}), bs = /* @__PURE__ */ ue(Si, [["__scopeId", "data-v-ef63d763"]]), Ei = ["src"], Pi = /* @__PURE__ */ oe({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = W(!1);
    return we(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (s, a) => e.src.trim() && !n.value ? (f(), m("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: a[0] || (a[0] = (r) => n.value = !0)
    }, null, 40, Ei)) : R("", !0);
  }
}), Cn = /* @__PURE__ */ ue(Pi, [["__scopeId", "data-v-afaab300"]]), Ai = ["data-dc-standing", "title", "aria-label"], zi = /* @__PURE__ */ oe({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ke(), s = v(() => us(t.entry.entity, t.entry.row)), a = v(() => Ga(n.query.value.expr, s.value)), r = v(
      () => a.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(l) {
      l.stopPropagation(), n.setExpression(Xa(n.query.value.expr, s.value));
    }
    return (l, i) => a.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": a.value,
      title: r.value,
      "aria-label": r.value,
      onClick: o
    }, I(a.value === "in" ? "+" : "−"), 9, Ai)) : R("", !0);
  }
}), Mn = /* @__PURE__ */ ue(zi, [["__scopeId", "data-v-4b8d4166"]]), Ti = ["data-dc-pending", "title", "aria-label"], Li = /* @__PURE__ */ oe({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ke(), s = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), a = W(null);
    function r(c) {
      a.value = qe(c).exclude ? "out" : "in";
    }
    function o(c) {
      r(c), window.addEventListener("keydown", r), window.addEventListener("keyup", r);
    }
    function l() {
      a.value = null, window.removeEventListener("keydown", r), window.removeEventListener("keyup", r);
    }
    Be(l);
    function i(c) {
      c.stopPropagation(), n.drill(t.entry.row, null, qe(c));
    }
    return (c, u) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      "data-dc-pending": a.value ?? void 0,
      title: `Narrow everything to ${s.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: o,
      onPointermove: r,
      onPointerleave: l,
      onClick: i
    }, " → ", 40, Ti)) : R("", !0);
  }
}), Jt = /* @__PURE__ */ ue(Li, [["__scopeId", "data-v-9efd42ac"]]), Ri = ["checked", "aria-label"], yt = /* @__PURE__ */ oe({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ke();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, r) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: s
    }, null, 8, Ri));
  }
}), Ni = { class: "dc-cards" }, Fi = { class: "dc-card__top dc-mono" }, Ii = { class: "dc-card__lead" }, Oi = {
  key: 1,
  class: "dc-card__entity"
}, Di = { class: "dc-card__top-right" }, Bi = ["onClick"], qi = { class: "dc-card__names" }, Vi = { class: "dc-card__primary" }, Ki = { class: "dc-card__secondary dc-mono" }, Wi = { class: "dc-card__metrics dc-mono" }, Hi = {
  key: 0,
  class: "dc-card__date"
}, Ui = /* @__PURE__ */ oe({
  __name: "CardsView",
  setup(e) {
    const t = ke(), n = _t(), s = v(() => t.isEverything.value);
    return (a, r) => (f(), m("div", Ni, [
      (f(!0), m(ne, null, he(z(n), (o) => (f(), m("div", {
        key: o.key,
        class: "dc-card"
      }, [
        x("div", Fi, [
          x("span", Ii, [
            z(t).selectable.value ? (f(), J(yt, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : R("", !0),
            He(" " + I(o.ordinal) + " ", 1),
            s.value ? (f(), m("span", Oi, I(o.entityLabel), 1)) : R("", !0)
          ]),
          x("span", Di, [
            o.parts.state ? (f(), J(Qt, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : R("", !0),
            fe(Mn, { entry: o }, null, 8, ["entry"]),
            fe(Jt, { entry: o }, null, 8, ["entry"]),
            z(t).pinnable.value ? (f(), J(bs, {
              key: 1,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : R("", !0)
          ])
        ]),
        x("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (l) => z(t).activate(o.row, z(qe)(l))
        }, [
          o.parts.image ? (f(), J(Cn, {
            key: 0,
            class: "dc-card__image",
            src: o.parts.image
          }, null, 8, ["src"])) : R("", !0),
          x("span", qi, [
            x("span", Vi, I(o.parts.identity), 1),
            x("span", Ki, I(o.parts.reference), 1)
          ])
        ], 8, Bi),
        x("div", Wi, [
          (f(!0), m(ne, null, he(o.parts.metrics.slice(0, 2), (l) => (f(), J(Zt, {
            key: l.column.key ?? l.label,
            entry: o,
            column: l.column
          }, {
            default: Ze(() => [
              He(I(l.label) + " " + I(l.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (f(), m("span", Hi, I(o.parts.updated), 1)) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), cr = /* @__PURE__ */ ue(Ui, [["__scopeId", "data-v-28581543"]]), ji = { class: "dc-grid" }, Gi = ["onClick"], Xi = { class: "dc-tile__scrim" }, Yi = { class: "dc-tile__top dc-mono" }, Qi = { class: "dc-tile__chip" }, Zi = { class: "dc-tile__caption" }, Ji = { class: "dc-tile__secondary dc-truncate" }, ec = { class: "dc-tile__primary" }, tc = /* @__PURE__ */ oe({
  __name: "GridView",
  setup(e) {
    const t = ke(), n = _t();
    return (s, a) => (f(), m("div", ji, [
      (f(!0), m(ne, null, he(z(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        x("button", {
          type: "button",
          class: "dc-tile",
          style: Ee({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          onClick: (o) => z(t).activate(r.row, z(qe)(o))
        }, [
          r.parts.image ? (f(), J(Cn, {
            key: 0,
            class: "dc-tile__image",
            src: r.parts.image
          }, null, 8, ["src"])) : R("", !0),
          x("span", Xi, [
            x("span", Yi, [
              x("span", Qi, I(r.ordinal), 1)
            ]),
            x("span", Zi, [
              x("span", Ji, I(r.parts.reference), 1),
              x("span", ec, I(r.parts.identity), 1)
            ])
          ])
        ], 12, Gi),
        z(t).selectable.value ? (f(), J(yt, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0)
      ]))), 128))
    ]));
  }
}), ur = /* @__PURE__ */ ue(tc, [["__scopeId", "data-v-7df25d40"]]);
function ca(e, t, n, s) {
  return (n - s * (t - 1)) / e;
}
function Rn(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function nc(e) {
  return e > 0 ? e : 1 / 0;
}
function sc(e, t, n) {
  const { width: s, height: a, gap: r = 0 } = n;
  if (!e.length) return [];
  if (!(s > 0) || !(a > 0)) return [{ items: [...e], height: a, filled: !1 }];
  const o = [];
  let l = [], i = 0, c = 0;
  for (const u of e) {
    const h = t(u), y = Math.max(h.ratio, Number.EPSILON), w = h.height && h.height > 0 ? Math.max(c, h.height) : c, k = Rn(w, a), $ = ca(i + y, l.length + 1, s, r);
    if ($ > k) {
      l.push(u), i += y, c = w;
      continue;
    }
    const _ = Rn(c, a), C = l.length ? ca(i, l.length, s, r) : 1 / 0;
    C <= nc(c) && C - _ < k - $ ? (o.push({ items: l, height: C, filled: !0 }), l = [u], i = y, c = h.height && h.height > 0 ? h.height : 0) : (o.push({ items: [...l, u], height: $, filled: !0 }), l = [], i = 0, c = 0);
  }
  return l.length && o.push({ items: l, height: Rn(c, a), filled: !1 }), o;
}
const ac = { class: "dc-images" }, rc = ["title", "aria-label", "onClick"], lc = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, oc = 240, ln = 8, ic = 1, cc = /* @__PURE__ */ oe({
  __name: "ImagesView",
  setup(e) {
    const t = ke(), n = _t(), s = Us(/* @__PURE__ */ new Map()), a = Us(/* @__PURE__ */ new Set());
    function r(k, $) {
      const _ = $.target;
      _.naturalWidth > 0 && _.naturalHeight > 0 && s.set(k, { width: _.naturalWidth, height: _.naturalHeight });
    }
    function o(k) {
      const $ = k.parts.image;
      return $ && !a.has($) ? $ : null;
    }
    function l(k) {
      const $ = o(k);
      return $ ? s.get($) : void 0;
    }
    function i(k) {
      const $ = l(k);
      return $ ? { ratio: $.width / $.height, height: $.height } : { ratio: ic };
    }
    const c = W(null), u = W(0);
    let h = null;
    function y() {
      u.value = c.value?.clientWidth ?? 0;
    }
    xa(() => {
      y(), !(!c.value || typeof ResizeObserver > "u") && (h = new ResizeObserver(y), h.observe(c.value));
    }), Be(() => {
      h?.disconnect(), h = null;
    });
    const w = v(() => {
      const k = sc(n.value, i, {
        width: u.value,
        height: oc,
        gap: ln
      }), $ = [];
      let _ = 0;
      for (const C of k) {
        let L = 0;
        for (const D of C.items) {
          const M = i(D).ratio * C.height, P = l(D), V = P !== void 0 && P.height < C.height;
          $.push({
            entry: D,
            style: {
              top: `${_}px`,
              left: `${L}px`,
              width: `${M}px`,
              height: `${C.height}px`
            },
            picture: V ? { width: `${P.width}px`, height: `${P.height}px` } : { width: "100%", height: "100%" }
          }), L += M + ln;
        }
        _ += C.height + ln;
      }
      return { boxes: $, height: k.length ? _ - ln : 0 };
    });
    return (k, $) => (f(), m("div", ac, [
      x("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Ee({ height: `${w.value.height}px` })
      }, [
        (f(!0), m(ne, null, he(w.value.boxes, ({ entry: _, style: C, picture: L }) => (f(), m("div", {
          key: _.key,
          class: "dc-images__cell",
          style: Ee(C)
        }, [
          x("button", {
            type: "button",
            class: "dc-images__open",
            title: _.parts.identity,
            "aria-label": _.parts.identity,
            onClick: (D) => z(t).activate(_.row, z(qe)(D))
          }, [
            o(_) ? (f(), J(Cn, {
              key: 0,
              class: "dc-images__picture",
              style: Ee(L),
              src: o(_),
              onLoad: (D) => r(o(_), D),
              onError: (D) => a.add(o(_))
            }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), m("span", lc, I(_.parts.identity), 1))
          ], 8, rc),
          z(t).selectable.value ? (f(), J(yt, {
            key: 0,
            class: "dc-images__tick",
            row: _.row,
            selected: _.selected,
            name: _.parts.identity
          }, null, 8, ["row", "selected", "name"])) : R("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), dr = /* @__PURE__ */ ue(cc, [["__scopeId", "data-v-f708d83f"]]), uc = { class: "dc-links" }, dc = ["onClick"], fc = { class: "dc-link__primary dc-truncate" }, pc = { class: "dc-link__secondary dc-mono dc-truncate" }, vc = /* @__PURE__ */ oe({
  __name: "LinksView",
  setup(e) {
    const t = ke(), n = _t();
    return (s, a) => (f(), m("div", uc, [
      (f(!0), m(ne, null, he(z(n), (r) => (f(), m("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        z(t).selectable.value ? (f(), J(yt, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        x("button", {
          type: "button",
          class: "dc-link",
          onClick: (o) => z(t).activate(r.row, z(qe)(o))
        }, [
          x("span", fc, I(r.parts.identity), 1),
          x("span", pc, I(r.parts.reference), 1)
        ], 8, dc)
      ]))), 128))
    ]));
  }
}), fr = /* @__PURE__ */ ue(vc, [["__scopeId", "data-v-08d0266c"]]), hc = {
  class: "dc-list",
  role: "list"
}, mc = ["onClick"], gc = { class: "dc-list__ordinal dc-mono" }, _c = { class: "dc-list__identity" }, yc = { class: "dc-list__primary dc-truncate" }, wc = { class: "dc-list__secondary dc-mono dc-truncate" }, kc = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, bc = { class: "dc-list__metrics dc-mono" }, $c = { class: "dc-list__trailing" }, xc = /* @__PURE__ */ oe({
  __name: "ListView",
  setup(e) {
    const t = ke(), n = _t(), s = v(() => t.isEverything.value);
    return (a, r) => (f(), m("div", hc, [
      (f(!0), m(ne, null, he(z(n), (o) => (f(), m("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        z(t).selectable.value ? (f(), J(yt, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        x("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (l) => z(t).activate(o.row, z(qe)(l))
        }, [
          x("span", gc, I(o.ordinal), 1),
          x("span", _c, [
            x("span", yc, I(o.parts.identity), 1),
            x("span", wc, I(o.parts.reference), 1)
          ])
        ], 8, mc),
        s.value ? (f(), m("span", kc, I(o.entityLabel), 1)) : R("", !0),
        x("span", bc, [
          (f(!0), m(ne, null, he(o.parts.metrics.slice(0, 2), (l) => (f(), J(Zt, {
            key: l.column.key ?? l.label,
            entry: o,
            column: l.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        x("span", $c, [
          o.parts.state ? (f(), J(Qt, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : R("", !0),
          fe(Mn, { entry: o }, null, 8, ["entry"]),
          fe(Jt, { entry: o }, null, 8, ["entry"]),
          z(t).pinnable.value ? (f(), J(bs, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Hn = /* @__PURE__ */ ue(xc, [["__scopeId", "data-v-11b9f46c"]]), Cc = { class: "dc-preview" }, Mc = { class: "dc-preview__pager dc-mono" }, Sc = ["disabled"], Ec = { "aria-live": "polite" }, Pc = ["disabled"], Ac = {
  key: 0,
  class: "dc-preview__card"
}, zc = ["src"], Tc = { class: "dc-preview__body" }, Lc = { class: "dc-preview__top" }, Rc = { class: "dc-preview__badges" }, Nc = { class: "dc-preview__entity dc-mono" }, Fc = { class: "dc-preview__marks" }, Ic = { class: "dc-preview__primary" }, Oc = { class: "dc-preview__secondary dc-mono" }, Dc = { class: "dc-preview__fields" }, Bc = { class: "dc-preview__key" }, qc = { class: "dc-preview__value dc-mono" }, Vc = /* @__PURE__ */ oe({
  __name: "PreviewView",
  setup(e) {
    const t = ke(), n = _t(), s = W(0);
    we(n, (i) => {
      s.value > i.length - 1 && (s.value = Math.max(0, i.length - 1));
    });
    const a = v(() => n.value[s.value]), r = v(() => {
      const i = a.value;
      if (!i) return [];
      const c = We(i.columns, "reference"), u = We(i.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((h) => ({
          key: h.label,
          value: h.text,
          column: h.column
        })),
        ...u ? [{ key: u.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), o = v(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${i}`;
    }), l = (i) => {
      const c = n.value.length;
      c && (s.value = Math.min(c - 1, Math.max(0, s.value + i)));
    };
    return (i, c) => (f(), m("div", Cc, [
      x("div", Mc, [
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: c[0] || (c[0] = (u) => l(-1))
        }, " ‹ ", 8, Sc),
        x("span", Ec, I(o.value), 1),
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= z(n).length - 1,
          onClick: c[1] || (c[1] = (u) => l(1))
        }, " › ", 8, Pc)
      ]),
      a.value ? (f(), m("div", Ac, [
        x("div", {
          class: "dc-preview__media",
          style: Ee({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          a.value.parts.image ? (f(), m("img", {
            key: 0,
            class: "dc-preview__image",
            src: a.value.parts.image,
            alt: ""
          }, null, 8, zc)) : (f(), m(ne, { key: 1 }, [
            He(" preview ")
          ], 64))
        ], 4),
        x("div", Tc, [
          x("div", Lc, [
            x("span", Rc, [
              z(t).selectable.value ? (f(), J(yt, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : R("", !0),
              a.value.parts.state ? (f(), J(Qt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : R("", !0),
              x("span", Nc, I(a.value.entityLabel), 1)
            ]),
            x("span", Fc, [
              fe(Mn, { entry: a.value }, null, 8, ["entry"]),
              fe(Jt, { entry: a.value }, null, 8, ["entry"]),
              z(t).pinnable.value ? (f(), J(bs, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : R("", !0)
            ])
          ]),
          x("div", null, [
            x("div", Ic, I(a.value.parts.identity), 1),
            x("div", Oc, I(a.value.parts.reference), 1)
          ]),
          x("dl", Dc, [
            (f(!0), m(ne, null, he(r.value, (u) => (f(), m("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              x("dt", Bc, I(u.key), 1),
              x("dd", qc, [
                u.column && a.value ? (f(), J(Zt, {
                  key: 0,
                  entry: a.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (f(), m(ne, { key: 1 }, [
                  He(I(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          x("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: c[2] || (c[2] = (u) => z(t).activate(a.value.row, z(qe)(u)))
          }, " Open record → ")
        ])
      ])) : R("", !0)
    ]));
  }
}), pr = /* @__PURE__ */ ue(Vc, [["__scopeId", "data-v-6be41155"]]);
function Kc() {
  const e = ke();
  return v(() => vl(e.schema.value, e.entity.value));
}
const Wc = ["title"], Hc = {
  key: 5,
  class: "dc-cell__text"
}, Uc = /* @__PURE__ */ oe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ke(), s = v(() => t.column.kind ?? "text"), a = v(() => De(t.column, t.entry.row)), r = v(
      () => s.value === "ordinal" ? t.entry.ordinal : Xt(t.column, t.entry.row)
    ), o = v(() => a.value), l = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => Kn(t.column)), c = v(() => Ia(t.column, t.entry.row));
    function u(h) {
      if (!l.value) return;
      h.stopPropagation();
      const y = qe(h);
      t.column.click?.(t.entry.row, y), t.column.activate && n.activate(t.entry.row, y);
    }
    return (h, y) => s.value === "component" && e.column.component ? (f(), J(ss(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), J(Qt, {
      key: 1,
      status: o.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), J(Cn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Ee({ maxHeight: e.column.height }),
      onClick: u
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), J(Zt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : l.value ? (f(), m("button", {
      key: 4,
      type: "button",
      class: Lt(["dc-table__open", { "dc-truncate": i.value }]),
      title: c.value,
      onClick: u
    }, I(r.value), 11, Wc)) : (f(), m("span", Hc, I(r.value), 1));
  }
}), ua = /* @__PURE__ */ ue(Uc, [["__scopeId", "data-v-70ba8aa2"]]), jc = ["aria-label"], Gc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Xc = /* @__PURE__ */ oe({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = v(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), r = (l) => !n.mixed && n.standing === l;
    function o(l, i) {
      l.stopPropagation(), s("set", i);
    }
    return (l, i) => (f(), m("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (f(!0), m(ne, null, he(a.value, (c) => (f(), m("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": r(c.standing) ? "true" : "false",
        "aria-checked": r(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (u) => o(u, c.standing)
      }, I(c.sign), 9, Gc))), 128))
    ], 8, jc));
  }
}), da = /* @__PURE__ */ ue(Xc, [["__scopeId", "data-v-adaa8412"]]), Yc = {
  key: 0,
  class: "dc-table__none"
}, Qc = { class: "dc-table__detail" }, Zc = ["data-dc-wrap"], Jc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, eu = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, tu = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], nu = ["onClick"], su = {
  key: 2,
  class: "dc-table__head"
}, au = ["onClick"], ru = {
  key: 0,
  class: "dc-table__pick"
}, lu = {
  key: 1,
  class: "dc-table__standing"
}, ou = ["data-dc-align", "data-dc-hide", "title"], iu = {
  key: 0,
  class: "dc-table__name"
}, cu = /* @__PURE__ */ oe({
  __name: "TableView",
  setup(e) {
    const t = ke(), n = _t(), s = Kc();
    function a(b) {
      const K = xl(b, t.entity.value), N = K ? `Shortcut: ${K}` : void 0;
      return [b.hint, N].filter(Boolean).join(`
`) || void 0;
    }
    const r = v(
      () => s.value.find((b) => b.scope)
    ), o = v(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((b) => b.scope)
    ), l = (b) => us(b.entity, b.row), i = (b) => Ga(t.query.value.expr, l(b));
    function c(b, K) {
      t.setExpression(ra(t.query.value.expr, l(b), K));
    }
    const u = v(() => {
      const b = n.value.filter((N) => l(N) !== null), K = b.filter((N) => N.selected);
      return K.length ? K : b;
    }), h = v(() => u.value.some((b) => b.selected)), y = v(() => {
      const b = u.value[0];
      return b ? i(b) : null;
    }), w = v(
      () => u.value.some((b) => i(b) !== y.value)
    ), k = v(
      () => h.value ? "the ticked rows" : "every row on this page"
    );
    function $(b) {
      t.setExpression(
        u.value.reduce(
          (K, N) => ra(K, l(N), b),
          t.query.value.expr
        )
      );
    }
    const _ = v(
      () => s.value.some((b) => b.kind === "image" || b.height !== void 0)
    );
    function C(b) {
      b && (t.query.value.sort === b ? t.toggleDirection() : t.setSort(b));
    }
    const L = v(() => t.entity.value?.label ?? "The result set"), D = v(() => new Set(t.sorts.value.map((b) => b.key))), M = (b) => b.sort !== void 0 && D.value.has(b.sort), P = (b) => {
      if (M(b))
        return t.query.value.sort !== b.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function V(b) {
      return [
        Ys(b),
        b.muted ? "dc-table__muted" : "",
        b.mono ? "dc-mono" : "",
        Kn(b) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function A(b, K) {
      if (!(!Kn(b) || b.activate || b.click))
        return Ia(b, K.row);
    }
    return (b, K) => z(s).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0
    }, [
      x("thead", null, [
        x("tr", null, [
          z(t).selectable.value ? (f(), m("th", Jc, [
            fe(lr)
          ])) : R("", !0),
          o.value ? (f(), m("th", eu, [
            u.value.length ? (f(), J(da, {
              key: 0,
              standing: y.value,
              mixed: w.value,
              name: k.value,
              onSet: $
            }, null, 8, ["standing", "mixed", "name"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), m(ne, null, he(z(s), (N, Y) => (f(), m("th", {
            key: z(Gs)(N, Y),
            scope: "col",
            class: Lt(z(Ys)(N)),
            style: Ee({ width: N.width }),
            "data-dc-align": z(Xs)(N),
            "data-dc-hide": N.hideBelow,
            "aria-sort": P(N),
            title: a(N)
          }, [
            M(N) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (G) => C(N.sort)
            }, I(N.label), 9, nu)) : (f(), m(ne, { key: 1 }, [
              He(I(N.label), 1)
            ], 64)),
            N.header ? (f(), m("span", su, [
              (f(), J(ss(N.header), {
                column: N,
                entity: z(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : R("", !0)
          ], 14, tu))), 128))
        ])
      ]),
      x("tbody", null, [
        (f(!0), m(ne, null, he(z(n), (N) => (f(), m("tr", {
          key: N.key,
          class: "dc-table__row",
          onClick: (Y) => z(t).activate(N.row, z(qe)(Y))
        }, [
          z(t).selectable.value ? (f(), m("td", ru, [
            fe(yt, {
              row: N.row,
              selected: N.selected,
              name: N.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : R("", !0),
          o.value ? (f(), m("td", lu, [
            l(N) !== null ? (f(), J(da, {
              key: 0,
              standing: i(N),
              name: N.parts.identity,
              onSet: (Y) => c(N, Y)
            }, null, 8, ["standing", "name", "onSet"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), m(ne, null, he(z(s), (Y, G) => (f(), m("td", {
            key: z(Gs)(Y, G),
            class: Lt(V(Y)),
            "data-dc-align": z(Xs)(Y),
            "data-dc-hide": Y.hideBelow,
            title: A(Y, N)
          }, [
            Y === r.value ? (f(), m("span", iu, [
              fe(ua, {
                column: Y,
                entry: N
              }, null, 8, ["column", "entry"]),
              fe(Jt, { entry: N }, null, 8, ["entry"])
            ])) : (f(), J(ua, {
              key: 1,
              column: Y,
              entry: N
            }, null, 8, ["column", "entry"]))
          ], 10, ou))), 128))
        ], 8, au))), 128))
      ])
    ], 8, Zc)) : (f(), m("p", Yc, [
      K[2] || (K[2] = x("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      x("span", Qc, [
        He(I(L.value) + " has no ", 1),
        K[0] || (K[0] = x("code", null, "columns", -1)),
        K[1] || (K[1] = He(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), vr = /* @__PURE__ */ ue(cu, [["__scopeId", "data-v-98495b60"]]);
function uu(e) {
  const t = Tt([]), n = W(!1), s = Tt(null);
  let a = 0;
  const r = (i, c, u, h, y) => ({
    entity: i,
    rows: c.rows.map(
      (w, k) => ir(w, k, i, e.isPinned(w.id))
    ),
    total: c.total,
    count: u ? i.count : String(c.total),
    pinned: du(h, c, y)
  }), o = () => {
    const i = ++a, c = e.query.value, u = e.schema.value, h = e.entities.value, y = e.limit.value, w = e.within?.value.trim() ?? "", k = ls(c) && !w, $ = w ? cs(w, c.expr) : c.expr, _ = h.map((C) => ({
      entity: C,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: C.key, expr: $, facets: Rt(C), page: 1 },
        schema: u,
        entity: C,
        limit: y,
        offset: 0
      })
    }));
    if (_.every(({ outcome: C }) => !(C instanceof Promise))) {
      t.value = _.map(
        ({ entity: C, outcome: L }) => r(C, L, k, u, $)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(_.map(({ outcome: C }) => Promise.resolve(C))).then((C) => {
      i === a && (t.value = C.map(
        (L, D) => r(_[D].entity, L, k, u, $)
      ), s.value = null);
    }).catch((C) => {
      i === a && (s.value = C, t.value = []);
    }).finally(() => {
      i === a && (n.value = !1);
    });
  }, l = () => {
    try {
      o();
    } catch (i) {
      s.value = i, t.value = [], n.value = !1;
    }
  };
  return we(
    [
      e.source,
      e.schema,
      e.query,
      e.entities,
      e.limit,
      () => e.within?.value
    ],
    l,
    { immediate: !0 }
  ), { previews: t, pending: n, error: s, refresh: l };
}
function du(e, t, n) {
  const s = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !s)
    return !1;
  const a = n.trim();
  if (!a)
    return !1;
  const r = ds(e, s);
  return !!r && fs(a, r) === a;
}
const fu = ["data-dc-pending"], pu = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, vu = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, hu = {
  key: 2,
  class: "dc-types__state"
}, mu = ["data-dc-empty"], gu = ["onClick"], _u = { class: "dc-type__name" }, yu = { class: "dc-type__count dc-mono" }, wu = { class: "dc-type__sr" }, ku = {
  key: 0,
  class: "dc-type__empty"
}, bu = ["onClick"], $u = { class: "dc-type__identity" }, xu = { class: "dc-type__primary dc-truncate" }, Cu = { class: "dc-type__secondary dc-mono dc-truncate" }, Mu = { class: "dc-type__trailing dc-mono" }, Su = { class: "dc-type__metric-value" }, Eu = { class: "dc-type__metric-label" }, Pu = {
  key: 0,
  class: "dc-type__date"
}, Au = ["onClick"], zu = /* @__PURE__ */ oe({
  __name: "TypeCardsView",
  setup(e) {
    const t = ke(), { previews: n, pending: s, error: a } = uu({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (l) => t.isPinnedId(l)
    }), r = v(() => !t.isPristine.value || !!t.within.value), o = v(
      () => n.value.filter(
        (l) => !l.pinned && (l.rows.length > 0 || l.entity.create)
      )
    );
    return (l, i) => (f(), m("div", {
      class: "dc-types",
      "data-dc-pending": z(s) ? "true" : "false"
    }, [
      $e(l.$slots, "before", {}, void 0, !0),
      z(a) ? (f(), m("p", pu, " Could not load results: " + I(z(a) instanceof Error ? z(a).message : "the data source failed."), 1)) : !o.value.length && z(s) ? (f(), m("p", vu, " Running query… ")) : o.value.length ? R("", !0) : (f(), m("p", hu, I(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(ne, null, he(o.value, (c) => (f(), m("section", {
        key: c.entity.key,
        class: "dc-type",
        "data-dc-empty": c.rows.length ? "false" : "true"
      }, [
        x("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (u) => z(t).setEntity(c.entity.key)
        }, [
          x("span", _u, I(c.entity.label), 1),
          x("span", yu, I(c.count), 1),
          i[0] || (i[0] = x("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          x("span", wu, "Show only " + I(c.entity.label.toLowerCase()), 1)
        ], 8, gu),
        c.rows.length ? R("", !0) : (f(), m("p", ku, I(r.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(ne, null, he(c.rows, (u) => (f(), m("div", {
          key: u.key,
          class: "dc-type__row"
        }, [
          x("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (h) => z(t).activate(u.row, z(qe)(h))
          }, [
            x("span", $u, [
              x("span", xu, I(u.parts.identity), 1),
              x("span", Cu, I(u.parts.reference), 1)
            ])
          ], 8, bu),
          x("span", Mu, [
            (f(!0), m(ne, null, he(u.parts.metrics.slice(0, 1), (h) => (f(), J(Zt, {
              key: h.column.key ?? h.label,
              class: "dc-type__metric",
              entry: u,
              column: h.column
            }, {
              default: Ze(() => [
                x("span", Su, I(h.text), 1),
                x("span", Eu, I(h.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            u.parts.updated ? (f(), m("span", Pu, I(u.parts.updated), 1)) : R("", !0),
            fe(Mn, { entry: u }, null, 8, ["entry"]),
            fe(Jt, { entry: u }, null, 8, ["entry"])
          ])
        ]))), 128)),
        c.entity.create ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (u) => z(t).create(c.entity)
        }, [
          i[1] || (i[1] = x("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          He(" " + I(c.entity.create), 1)
        ], 8, Au)) : R("", !0)
      ], 8, mu))), 128)),
      $e(l.$slots, "after", {}, void 0, !0)
    ], 8, fu));
  }
}), hr = /* @__PURE__ */ ue(zu, [["__scopeId", "data-v-c7b8f990"]]), Tu = ["data-dc-pending"], Lu = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Ru = { class: "dc-results__detail" }, Nu = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Fu = {
  key: 3,
  class: "dc-results__state"
}, Iu = { class: "dc-results__detail" }, Ou = /* @__PURE__ */ oe({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ke(), s = Gt(), a = {
      list: Hn,
      cards: cr,
      grid: ur,
      images: dr,
      table: vr,
      links: fr,
      preview: pr
    }, r = v(() => os(n.query.value)), o = v(() => as(n.query.value.view, t.views)), l = v(() => a[o.value] ?? Hn), i = v(() => n.rows.value.length > 0), c = v(() => n.error.value !== null), u = W(null);
    return we(
      () => n.query.value.page,
      () => {
        u.value && (u.value.scrollTop = 0);
      }
    ), (h, y) => (f(), m("div", {
      ref_key: "scroller",
      ref: u,
      class: "dc-results",
      "data-dc-pending": z(n).pending.value ? "true" : "false"
    }, [
      r.value ? (f(), J(hr, { key: 0 }, un({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: Ze(() => [
            $e(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: Ze(() => [
            $e(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), m("p", Lu, [
        y[1] || (y[1] = x("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        x("span", Ru, I(z(n).error.value instanceof Error ? z(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && z(n).pending.value ? (f(), m("p", Nu, [...y[2] || (y[2] = [
        x("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), J(ss(l.value), { key: 4 })) : (f(), m("div", Fu, [
        y[3] || (y[3] = x("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        x("span", Iu, I(z(n).summary.value), 1),
        z(n).isPristine.value ? R("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: y[0] || (y[0] = (w) => z(n).clearFilters())
        }, I(z(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Tu));
  }
}), mr = /* @__PURE__ */ ue(Ou, [["__scopeId", "data-v-c131c5c3"]]), Du = ["data-dc-theme"], Bu = ["data-dc-width", "data-dc-align"], qu = { class: "dc-shell__panel" }, Vu = /* @__PURE__ */ oe({
  __name: "DataShell",
  props: /* @__PURE__ */ yn({
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
  emits: /* @__PURE__ */ yn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Bt(e, "open"), o = Bt(e, "pinned"), l = Bt(e, "selected"), i = Gt(), c = zt(Ma, null), u = s.route || c ? null : ll(), h = s.route ?? c ?? u;
    Be(() => u?.dispose?.());
    const y = v(() => ql({ seed: s.schema.key })), w = v(() => s.source ?? y.value), k = Zl({
      schema: () => s.schema,
      adapter: h,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), $ = v(() => s.within?.trim() ?? ""), _ = Jl({
      source: w,
      query: k.query,
      schema: v(() => s.schema),
      entity: k.entity,
      limit: v(() => s.limit),
      within: $
    });
    we(k.query, (S) => a("query-change", S)), we(
      [_.pageCount, _.pending, k.query],
      () => {
        if (_.pending.value) return;
        const S = _.pageCount.value;
        k.query.value.page > S && k.setPage(S, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const C = ts() ?? "dc-query-panel", L = W(null);
    function D() {
      r.value && (r.value = !1, Ht(() => {
        L.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const M = v(() => new Set(o.value));
    function P(S) {
      const O = new Set(M.value);
      O.has(S.id) ? O.delete(S.id) : O.add(S.id), o.value = [...O], a("toggle-pin", S);
    }
    const V = v(() => {
      if (s.selectable === !0) return !0;
      const S = k.entity.value;
      return !!(S?.duplicate || S?.delete);
    }), A = v(() => new Set(l.value));
    function b(S) {
      const O = new Set(A.value);
      O.has(S.id) ? O.delete(S.id) : O.add(S.id), l.value = [...O];
    }
    function K(S) {
      const O = new Set(A.value);
      for (const j of _.rows.value)
        S ? O.add(j.id) : O.delete(j.id);
      l.value = [...O];
    }
    function N() {
      l.value.length && (l.value = []);
    }
    const Y = v(() => ({
      ids: [...l.value],
      rows: _.rows.value.filter((S) => A.value.has(S.id)),
      entity: k.entity.value
    }));
    we(() => k.query.value.entity, N);
    function G(S, O, j = {}) {
      const re = Vl(s.schema, k.query.value, S, j);
      j.exclude ? k.narrow(re, O?.key ?? k.query.value.entity) : k.narrow(re, O?.key ?? null, O ? void 0 : "cards"), a("drill", S, O, j);
    }
    const ge = Kl({
      ...k,
      schema: v(() => s.schema),
      entities: v(() => s.schema.entities),
      rows: _.rows,
      total: _.total,
      limit: v(() => s.limit),
      offset: _.offset,
      pageCount: _.pageCount,
      pending: _.pending,
      counting: _.counting,
      error: _.error,
      source: w,
      previewsPerType: v(() => s.previewsPerType),
      within: $,
      pinnable: v(() => s.pinnable === !0),
      isPinned: (S) => M.value.has(S.id),
      isPinnedId: (S) => M.value.has(S),
      togglePin: P,
      selectable: V,
      selection: Y,
      isSelected: (S) => A.value.has(S.id),
      toggleSelect: b,
      selectPage: K,
      clearSelection: N,
      narrowsOnPress: v(() => s.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (S, O = {}) => {
        if (s.rowPress === "narrow" && ds(s.schema, S)) {
          G(S, null, O);
          return;
        }
        a("activate", S);
      },
      create: (S) => a("create", S),
      duplicate: () => a("duplicate", Y.value),
      delete: () => a("delete", Y.value),
      drill: G
    }), ie = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: k.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: D
    }), (S, O) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Ee(ie.value)
    }, [
      x("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        fe(sr, {
          ref_key: "headerRef",
          ref: L,
          expanded: r.value,
          "panel-id": z(C),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: O[0] || (O[0] = (j) => r.value = !r.value)
        }, un({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Ze(() => [
              $e(S.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        r.value ? (f(), m(ne, { key: 0 }, [
          x("div", {
            class: "dc-shell__scrim",
            onClick: D
          }),
          x("div", qu, [
            fe(rr, {
              "panel-id": z(C),
              onClose: D
            }, un({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Ze(() => [
                  $e(S.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : R("", !0)
      ], 8, Bu),
      fe(or, { views: e.views }, null, 8, ["views"]),
      $e(S.$slots, "results", {
        rows: z(ge).rows.value,
        total: z(ge).total.value,
        offset: z(ge).offset.value,
        pageCount: z(ge).pageCount.value,
        query: z(ge).query.value,
        pending: z(ge).pending.value
      }, () => [
        fe(mr, { views: e.views }, un({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: Ze(() => [
              $e(S.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Ze(() => [
              $e(S.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Du));
  }
}), Ku = /* @__PURE__ */ ue(Vu, [["__scopeId", "data-v-a366aa47"]]), Wu = ["data-dc-muted"], Hu = {
  key: 0,
  class: "dc-shell-card__head"
}, Uu = { class: "dc-shell-card__title" }, ju = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Gu = {
  key: 0,
  class: "dc-shell-card__aside"
}, Xu = ["data-dc-flush"], Yu = {
  key: 2,
  class: "dc-shell-card__foot"
}, Qu = /* @__PURE__ */ oe({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), s = Gt();
    function a(u) {
      return r(u?.() ?? []);
    }
    function r(u) {
      return u.some((h) => h.type === sl ? !1 : h.type === al ? String(h.children ?? "").trim().length > 0 : h.type === ne ? r(h.children ?? []) : !0);
    }
    const o = v(() => !!t.title || l.value || a(s.head)), l = v(() => a(s.aside)), i = v(() => a(s.default)), c = v(() => a(s.foot));
    return (u, h) => (f(), m("section", {
      class: "dc-shell-card",
      style: Ee(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      o.value ? (f(), m("header", Hu, [
        $e(u.$slots, "head", {}, () => [
          x("h2", Uu, I(e.title), 1),
          e.count !== void 0 ? (f(), m("span", ju, I(e.count), 1)) : R("", !0)
        ], !0),
        l.value ? (f(), m("span", Gu, [
          $e(u.$slots, "aside", {}, void 0, !0)
        ])) : R("", !0)
      ])) : R("", !0),
      i.value ? (f(), m("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        $e(u.$slots, "default", {}, void 0, !0)
      ], 8, Xu)) : R("", !0),
      c.value ? (f(), m("footer", Yu, [
        $e(u.$slots, "foot", {}, void 0, !0)
      ])) : R("", !0)
    ], 12, Wu));
  }
}), Wf = /* @__PURE__ */ ue(Qu, [["__scopeId", "data-v-75f2ef0b"]]), Zu = ["aria-label"], Ju = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], ed = /* @__PURE__ */ oe({
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
    function r(o, l) {
      const i = n.options.length;
      let c = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? c = (l + 1) % i : o.key === "ArrowLeft" || o.key === "ArrowUp" ? c = (l - 1 + i) % i : o.key === "Home" ? c = 0 : o.key === "End" && (c = i - 1), c === null) return;
      o.preventDefault();
      const u = n.options[c];
      u && (s("update:modelValue", u.key), a.value[c]?.focus());
    }
    return (o, l) => (f(), m("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), m(ne, null, he(e.options, (i, c) => (f(), m("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: Lt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (u) => s("update:modelValue", i.key),
        onKeydown: (u) => r(u, c)
      }, I(i.label), 43, Ju))), 128))
    ], 8, Zu));
  }
}), td = /* @__PURE__ */ ue(ed, [["__scopeId", "data-v-63fb5482"]]), nd = ["data-dc-theme", "aria-label"], sd = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], ad = /* @__PURE__ */ oe({
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
    }), a = t, r = W(null), o = W([]), l = W(null), i = W(null), c = W(!1), u = v(
      () => n.menus.flatMap((M, P) => qt(M) ? [P] : [])
    );
    function h(M, P) {
      const V = o.value[M]?.getBoundingClientRect(), A = n.menus[M];
      !V || !A || !qt(A) || (i.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, l.value = M, c.value = P);
    }
    function y(M) {
      const P = l.value;
      l.value = null, i.value = null, M && P !== null && o.value[P]?.focus();
    }
    function w(M) {
      l.value === M ? y(!0) : h(M, !1);
    }
    function k(M) {
      l.value === null || l.value === M || h(M, !1);
    }
    function $(M, P) {
      const V = u.value;
      if (V.length === 0) return null;
      if (M === null) return P === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const A = V.indexOf(M);
      return A === -1 ? V[0] ?? null : V[(A + P + V.length) % V.length] ?? null;
    }
    function _(M) {
      const P = M.key;
      if (P === "Escape") {
        if (l.value === null) return;
        M.preventDefault(), y(!0);
        return;
      }
      if (P === "ArrowDown" && l.value === null) {
        const b = C();
        if (b === null) return;
        M.preventDefault(), h(b, !0);
        return;
      }
      if (P !== "ArrowLeft" && P !== "ArrowRight") return;
      const V = l.value ?? C(), A = $(V, P === "ArrowRight" ? 1 : -1);
      A !== null && (M.preventDefault(), l.value !== null ? h(A, !0) : o.value[A]?.focus());
    }
    function C() {
      const M = o.value.findIndex((P) => P === document.activeElement);
      return M === -1 ? u.value[0] ?? null : M;
    }
    function L(M) {
      const P = M.target;
      !P || r.value?.contains(P) || y(!1);
    }
    we(l, (M) => {
      M !== null ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), Be(() => window.removeEventListener("pointerdown", L, !0));
    function D(M) {
      y(!0), M.action?.(), a("choose", M);
    }
    return (M, P) => (f(), m("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Ee(s.value),
      onKeydown: _
    }, [
      (f(!0), m(ne, null, he(e.menus, (V, A) => (f(), m("button", {
        key: V.id ?? V.label ?? A,
        ref_for: !0,
        ref: (b) => {
          b && (o.value[A] = b);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": l.value === A,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: A === (u.value[0] ?? 0) ? 0 : -1,
        onClick: (b) => w(A),
        onMouseenter: (b) => k(A)
      }, I(V.label), 41, sd))), 128)),
      l.value !== null && i.value ? (f(), J(ks, {
        key: l.value,
        items: e.menus[l.value]?.items ?? [],
        at: i.value,
        label: e.menus[l.value]?.label,
        autofocus: c.value,
        onChoose: D,
        onDismiss: P[0] || (P[0] = (V) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 44, nd));
  }
}), Hf = /* @__PURE__ */ ue(ad, [["__scopeId", "data-v-93dbd2e4"]]), rd = ["aria-label", "aria-expanded", "disabled"], ld = { "aria-hidden": "true" }, od = /* @__PURE__ */ oe({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = W(null), a = W(null), r = W(null), o = W(!1), l = v(() => r.value !== null);
    function i(k) {
      const $ = s.value?.getBoundingClientRect();
      $ && (r.value = { x: $.left, y: $.bottom + 4, mirrorX: $.right }, o.value = k);
    }
    function c(k) {
      r.value = null, k && s.value?.focus();
    }
    function u() {
      l.value ? c(!0) : i(!1);
    }
    function h(k) {
      k.key !== "ArrowDown" || l.value || (k.preventDefault(), i(!0));
    }
    function y(k) {
      const $ = k.target;
      $ && (s.value?.contains($) || a.value?.root?.contains($) || c(!1));
    }
    we(l, (k) => {
      k ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), Be(() => window.removeEventListener("pointerdown", y, !0));
    function w(k) {
      c(!0), k.action?.(), n("choose", k);
    }
    return (k, $) => (f(), m(ne, null, [
      x("button", {
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": l.value,
        disabled: e.items.length === 0,
        onClick: u,
        onKeydown: h
      }, [
        x("span", ld, I(e.glyph), 1)
      ], 40, rd),
      r.value ? (f(), J(ks, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: o.value,
        onChoose: w,
        onDismiss: $[0] || ($[0] = (_) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 64));
  }
}), $s = /* @__PURE__ */ ue(od, [["__scopeId", "data-v-48f5ada5"]]), Ft = (e) => e.kind === "split", X = (e) => e.kind === "group", se = (e) => e.kind === "float", vt = { x: 16, y: 16, w: 360, h: 260 }, kn = 28, gr = 120, Un = 220, _r = 38, bt = 6;
function en(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const o = t(a.node, r);
    return o === a.node ? a : (n = !0, { ...a, node: o });
  });
  return n ? { ...e, frames: s } : e;
}
function Je(e) {
  return { kind: "group", panels: [e] };
}
function Uf(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const me = (e) => typeof e == "string", xs = (e) => me(e) ? Je(e) : e, tn = (e) => me(e) ? [e] : at(e), fa = (e) => e.panels.filter(me), id = (e) => e.panels.filter((t) => !me(t)), Oe = (e, t) => e.panels.includes(t);
function nn(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (me(r) || !ce(r, t)) return r;
    const o = n(r);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, panels: a } : e;
}
function Sn(e, t) {
  return { node: e, rect: { ...vt, ...t } };
}
function Cs(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Ms(e, t) {
  const n = { ...vt, ...t };
  return Cs(
    e.map(
      (s, a) => Sn(s, {
        ...n,
        x: n.x + a * kn,
        y: n.y + a * kn
      })
    )
  );
}
function Ss(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const Es = (e, t, n) => Ss("row", e, t, n), jf = (e, t, n) => Ss("column", e, t, n);
function be(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const gt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Gf = (e) => ({ ...e, headless: !0 }), Xf = (e) => ({ ...e, fixedView: !0 }), cd = (e) => e === "left" || e === "right" ? "row" : "column";
function at(e) {
  return X(e) ? e.panels.flatMap(tn) : se(e) ? e.frames.flatMap((t) => at(t.node)) : e.children.flatMap(at);
}
function ce(e, t) {
  return X(e) ? e.panels.some((n) => me(n) ? n === t : ce(n, t)) : se(e) ? e.frames.some((n) => ce(n.node, t)) : e.children.some((n) => ce(n, t));
}
const yr = (e) => at(e).length === 0, jn = (e) => !X(e) && gt(e), Gn = (e) => yr(e) && !jn(e);
function En(e) {
  return Ft(e) ? e.children.map((t, n) => ({ node: t, index: n })) : se(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => me(t) ? [] : [{ node: t, index: n }]);
}
const Ps = (e) => En(e).map((t) => t.node);
function wt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => me(s) ? s === t : ce(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function wr(e) {
  const t = e.panels[wt(e)];
  return t !== void 0 && me(t) ? t : "";
}
function Te(e) {
  if (me(e)) return e;
  if (X(e)) {
    const n = e.panels[wt(e)];
    return n === void 0 ? "" : Te(n);
  }
  if (se(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Te(n.node) : "";
  }
  const t = e.children[0];
  return t ? Te(t) : "";
}
function St(e, t) {
  if (X(e) && Oe(e, t)) return e;
  for (const n of Ps(e)) {
    const s = St(n, t);
    if (s) return s;
  }
  return null;
}
function ud(e) {
  const t = Ps(e).flatMap(ud);
  return X(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (X(e)) {
    for (const n of id(e)) {
      const s = Se(n, t);
      if (s) return s;
    }
    return null;
  }
  if (se(e)) {
    for (const n of e.frames)
      if (ce(n.node, t))
        return Se(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = Se(n, t);
    if (s) return s;
  }
  return null;
}
function Nn(e, t, n = gr) {
  const s = (l, i) => i > 0 ? Math.max(Math.min(l, i), Math.min(n, i)) : Math.max(l, n), a = s(e.w, t.w), r = s(e.h, t.h), o = (l, i, c) => Math.min(Math.max(l, 0), Math.max(c - i, 0));
  return {
    x: Math.round(o(e.x, a, t.w)),
    y: Math.round(o(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function pa(e, t, n, s, a = gr) {
  let { x: r, y: o, w: l, h: i } = e;
  return t.includes("e") && (l = e.w + n), t.includes("w") && (l = e.w - n, r = e.x + n), t.includes("s") && (i = e.h + s), t.includes("n") && (i = e.h - s, o = e.y + s), l < a && (t.includes("w") && (r = e.x + e.w - a), l = a), i < a && (t.includes("n") && (o = e.y + e.h - a), i = a), { x: r, y: o, w: l, h: i };
}
const kr = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function Et(e, t, n) {
  if (X(e)) return nn(e, t, (r) => Et(r, t, n));
  if (se(e)) {
    let r = !1;
    const o = e.frames.map((l) => {
      if (!ce(l.node, t)) return l;
      if (Se(l.node, t)) {
        const c = Et(l.node, t, n);
        return c === l.node ? l : (r = !0, { ...l, node: c });
      }
      const i = n(l);
      return i === l ? l : (r = !0, i);
    });
    return r ? { ...e, frames: o } : e;
  }
  if (!ce(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const o = Et(r, t, n);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: a } : e;
}
function dd(e, t, n) {
  return Et(e, t, (s) => kr(s.rect, n) ? s : { ...s, rect: n });
}
const lt = (e) => e.maximized === !0, br = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function fd(e, t, n = !0) {
  return Et(e, t, br(n));
}
function Yf(e, t) {
  const n = Se(e, t);
  return n ? fd(e, t, !lt(n)) : e;
}
const pt = (e) => e.minimized === !0, $r = (e) => (t) => {
  if (pt(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function pd(e, t, n = !0) {
  return Et(e, t, $r(n));
}
function Qf(e, t) {
  const n = Se(e, t);
  return n ? pd(e, t, !pt(n)) : e;
}
function ft(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = ct(e, t.slice(0, -1));
  return !s || !se(s) ? null : s.frames[n] ?? null;
}
function Xn(e, t) {
  if (se(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ce(s.node, t)) continue;
      const a = Xn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of En(e)) {
    if (!ce(n, t)) continue;
    const a = Xn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function As(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = ct(e, a);
  if (!r || !se(r)) return e;
  const o = r.frames[s];
  if (!o) return e;
  const l = n(o);
  if (l === o) return e;
  const i = [...r.frames];
  return i[s] = l, mt(e, a, { ...r, frames: i });
}
function va(e, t, n) {
  return As(
    e,
    t,
    (s) => kr(s.rect, n) ? s : { ...s, rect: n }
  );
}
function vd(e, t, n = !0) {
  return As(e, t, br(n));
}
function hd(e, t, n = !0) {
  return As(e, t, $r(n));
}
function Vt(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (se(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const l = Vt(o.node, s), i = l === o.node ? o : { ...o, node: l };
    if (n === e.frames.length - 1 && i === o) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(i), { ...e, frames: c };
  }
  const a = ct(e, [n]);
  if (!a) return e;
  const r = Vt(a, s);
  return r === a ? e : mt(e, [n], r);
}
function md(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (se(s) && (n[r] = s.frames.length - 1), s = ct(s, [a]));
  }), n;
}
function pn(e, t, n, s) {
  if (X(e)) return nn(e, n, (o) => pn(o, t, n, s));
  if (se(e)) {
    const o = e.frames.findIndex((i) => ce(i.node, n)), l = e.frames[o];
    if (!l) return e;
    if (Se(l.node, n)) {
      const i = pn(l.node, t, n, s);
      if (i === l.node) return e;
      const c = [...e.frames];
      return c[o] = { ...l, node: i }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, Sn(Je(t), s)] };
  }
  if (!ce(e, n)) return e;
  let a = !1;
  const r = e.children.map((o) => {
    const l = pn(o, t, n, s);
    return l !== o && (a = !0), l;
  });
  return a ? { ...e, children: r } : e;
}
function ha(e, t, n, s) {
  if (t === n || !ce(e, t) || !ce(e, n) || !Se(e, n)) return e;
  const a = ht(e, t);
  if (!a) return e;
  const r = pn(a, t, n, s);
  return r === a ? e : xe(r);
}
function gd(e, t, n) {
  return se(e) ? { ...e, frames: [...e.frames, Sn(Je(t), n)] } : X(e) ? Cr(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Je(t)],
    sizes: [...st(e), 1],
    ...be(e)
  };
}
function xr(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return gd(e, t, s);
  const r = n.slice(1), o = (u, h) => h === a ? xr(u, t, r, s) : ht(u, t);
  if (se(e)) {
    const u = e.frames.flatMap((h, y) => {
      const w = o(h.node, y);
      return w ? [w === h.node ? h : { ...h, node: w }] : [];
    });
    return { ...e, frames: u };
  }
  if (X(e)) {
    const u = wt(e), h = [];
    e.panels.forEach((k, $) => {
      if (me(k)) {
        k !== t && h.push(k);
        return;
      }
      const _ = o(k, $);
      _ && h.push(_);
    });
    const w = e.active && h.some((k) => tn(k).includes(e.active)) ? e.active : Te(h[u] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...w ? { active: w } : {},
      ...be(e)
    };
  }
  const l = st(e), i = [], c = [];
  return e.children.forEach((u, h) => {
    const y = o(u, h);
    y && (i.push(y), c.push(l[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: c, ...be(e) };
}
function ma(e, t, n, s) {
  const a = ct(e, n);
  return !a || !yr(a) || !ce(e, t) ? e : xe(xr(e, t, n, s));
}
function Fn(e, t) {
  if (X(e)) return nn(e, t, (a) => Fn(a, t));
  if (se(e)) {
    const a = e.frames.findIndex((c) => ce(c.node, t)), r = e.frames[a];
    if (!r) return e;
    const o = Fn(r.node, t), l = o === r.node ? r : { ...r, node: o };
    if (a === e.frames.length - 1 && l === r) return e;
    const i = [...e.frames];
    return i.splice(a, 1), i.push(l), { ...e, frames: i };
  }
  if (!ce(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = Fn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function zs(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, o) => r + o, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const st = (e) => zs(e.children.length, e.sizes), Ue = (e) => {
  const t = X(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function xe(e) {
  if (X(e)) return _d(e);
  if (se(e)) {
    const l = e.frames.flatMap((i) => {
      const c = xe(i.node);
      return Gn(c) ? [] : [c === i.node ? i : { ...i, node: c }];
    });
    return l.length === e.frames.length && l.every((i, c) => i === e.frames[c]) ? e : { ...e, frames: l };
  }
  if (e.children.length === 0) return e;
  const t = st(e), n = Ue(e), s = [], a = [], r = [];
  e.children.forEach((l, i) => {
    const c = xe(l), u = t[i] ?? 0;
    if (Gn(c)) return;
    if (!n && Ft(c) && c.direction === e.direction && !Ue(c) && !gt(c)) {
      const y = st(c);
      c.children.forEach((w, k) => {
        s.push(w), a.push(u * (y[k] ?? 0));
      });
      return;
    }
    s.push(c), a.push(u);
    const h = n?.[i];
    h && r.push(h);
  });
  const o = s[0];
  return s.length === 1 && o && !gt(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: zs(s.length, a),
    ...be(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function _d(e) {
  if (e.panels.every(me)) return e;
  const t = Te(e), n = Ue(e), s = [], a = [];
  e.panels.forEach((l, i) => {
    const c = n?.[i];
    if (me(l)) {
      s.push(l), c && a.push(c);
      return;
    }
    const u = xe(l);
    if (!Gn(u)) {
      if (X(u) && !gt(u) && !Ue(u)) {
        s.push(...u.panels);
        return;
      }
      s.push(u), c && a.push(c);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !me(r) && !gt(e))
    return r;
  if (s.length === e.panels.length && s.every((l, i) => l === e.panels[i]))
    return e;
  const o = t && s.some((l) => tn(l).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...o ? { active: o } : {},
    ...be(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ht(e, t) {
  if (se(e)) {
    const o = e.frames.flatMap((l) => {
      const i = ht(l.node, t);
      return i ? [i === l.node ? l : { ...l, node: i }] : [];
    });
    return o.length === 0 && !jn(e) ? null : { ...e, frames: o };
  }
  if (X(e)) {
    if (!ce(e, t)) return e;
    const o = wt(e), l = [];
    for (const u of e.panels) {
      if (me(u)) {
        u !== t && l.push(u);
        continue;
      }
      const h = ht(u, t);
      h && l.push(h);
    }
    if (l.length === 0) return null;
    const c = e.active && l.some((u) => tn(u).includes(e.active)) ? e.active : Te(l[o] ?? l[l.length - 1]);
    return c ? { kind: "group", panels: l, active: c, ...be(e) } : { kind: "group", panels: l, ...be(e) };
  }
  const n = st(e), s = [], a = [];
  if (e.children.forEach((o, l) => {
    const i = ht(o, t);
    i && (s.push(i), a.push(n[l] ?? 0));
  }), s.length === 0)
    return jn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...be(e) } : null;
  const r = s[0];
  return s.length === 1 && r && !gt(e) ? r : xe({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...be(e)
  });
}
function Cr(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...be(e) };
}
function Dt(e, t, n, s, a) {
  const r = (w) => en(
    w,
    (k) => ce(k, n) ? Dt(k, t, n, s, a) : k
  );
  if (s === "float") return e;
  const o = (w) => nn(w, n, (k) => Dt(k, t, n, s, a));
  if (s === "center")
    return X(e) ? Oe(e, n) ? Cr(e, t, a) : o(e) : se(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (w) => ce(w, n) ? Dt(w, t, n, s, a) : w
      )
    };
  const l = cd(s), i = s === "left" || s === "top", c = (w) => ({
    kind: "split",
    direction: l,
    children: i ? [Je(t), w] : [w, Je(t)],
    sizes: [0.5, 0.5]
  });
  if (X(e)) return Oe(e, n) ? c(e) : o(e);
  if (se(e)) return r(e);
  const u = st(e), h = e.children.findIndex(
    (w) => X(w) && Oe(w, n)
  );
  if (h >= 0 && e.direction === l) {
    const w = (u[h] ?? 0) / 2, k = [...e.children], $ = [...u];
    return k.splice(i ? h : h + 1, 0, Je(t)), $.splice(h, 1, w, w), {
      kind: "split",
      direction: l,
      children: k,
      sizes: $,
      ...be(e)
    };
  }
  const y = e.children.map((w) => ce(w, n) ? X(w) && Oe(w, n) ? c(w) : Dt(w, t, n, s) : w);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: u,
    ...be(e)
  };
}
function Pt(e, t) {
  if (X(e)) {
    if (Oe(e, t))
      return wr(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((i) => !me(i) && ce(i, t)), r = e.panels[a];
    if (r === void 0 || me(r)) return e;
    const o = Pt(r, t);
    if (o === r && e.active === t) return e;
    const l = [...e.panels];
    return l[a] = o, { ...e, panels: l, active: t };
  }
  if (!ce(e, t)) return e;
  if (se(e)) return en(e, (a) => Pt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = Pt(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Kt(e, t, n) {
  if (X(e)) {
    if (!Oe(e, t)) return nn(e, t, (c) => Kt(c, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const o = Ue(e), l = o ? [...o] : void 0;
    l && l.splice(a, 0, ...l.splice(s, 1));
    const i = Te(e);
    return {
      kind: "group",
      panels: r,
      ...i ? { active: i } : {},
      ...be(e),
      ...l ? { places: l } : {}
    };
  }
  return ce(e, t) ? se(e) ? en(e, (s) => Kt(s, t, n)) : { ...e, children: e.children.map((s) => Kt(s, t, n)) } : e;
}
function vn(e, t, n) {
  if (t === n) return e;
  if (X(e)) {
    if (!ce(e, t) && !ce(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => me(r) ? s(r) : vn(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return se(e) ? en(e, (s) => vn(s, t, n)) : { ...e, children: e.children.map((s) => vn(s, t, n)) };
}
function on(e, t, n, s, a) {
  if (s === "float" || !ce(e, t) || !ce(e, n)) return e;
  const r = St(e, t);
  if (s === "center" && r && Oe(r, n)) {
    if (a === void 0) return e;
    const l = r.panels.indexOf(t), i = a > l ? a - 1 : a;
    return i === l ? e : Pt(Kt(e, t, i), t);
  }
  if (t === n) return e;
  const o = ht(e, t);
  return o ? xe(Dt(o, t, n, s, a)) : e;
}
function Mr(e, t, n) {
  if (X(e)) {
    const a = e.panels[t];
    if (a === void 0 || me(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (se(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const r = [...e.frames];
    return r[t] = { ...a, node: n }, { ...e, frames: r };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function sn(e, t, n) {
  const s = En(e);
  if (!X(e) && s.some(({ node: a }) => X(a) && Oe(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!ce(a, t)) continue;
    const o = sn(a, t, n);
    return o ? Mr(e, r, o) : null;
  }
  return null;
}
function Zf(e, t, n) {
  const s = sn(
    e,
    t,
    (a) => Ft(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? xe(s) : e;
}
function Sr(e) {
  return se(e) ? [e] : Ue(e) || gt(e) ? [e] : X(e) ? [...e.panels] : e.children.flatMap(Sr);
}
function Er(e, t) {
  if (X(e)) return e;
  const n = Ps(e).map(Sr), s = n.flat(), a = t && s.some((o) => tn(o).includes(t)) ? t : void 0, r = yd(e, n);
  return xe({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...be(e),
    ...r ? { places: r } : {}
  });
}
function yd(e, t) {
  const n = se(e) ? e.frames.map(({ node: s, ...a }) => a) : Ue(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function wd(e, t) {
  const n = sn(e, t, (s) => Er(s, t));
  return n ? xe(n) : e;
}
function Ts(e, t, n) {
  if (X(e) && Oe(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of En(e)) {
    if (!ce(s, t)) continue;
    const r = Ts(s, t, n);
    return r ? Mr(e, a, r) : null;
  }
  return null;
}
function ga(e, t, n) {
  const s = Ts(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = Ue(a);
    return {
      ...Ss(n, a.panels.map(xs)),
      ...be(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? xe(s) : e;
}
function Yn(e, t) {
  if (X(e)) return e;
  if (se(e)) {
    const a = e.frames.findIndex(
      (l) => X(l.node) && l.node.panels.includes(t)
    ), r = e.frames[a], o = r && X(r.node) ? r.node : null;
    if (r && o && o.panels.length > 1) {
      const l = Ms(o.panels.map(xs), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...l, ...e.frames.slice(a + 1)]
      };
    }
    return en(e, (l) => Yn(l, t));
  }
  if (!ce(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = Yn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function kd(e, t, n) {
  const s = St(e, t);
  if (!s || s.panels.length < 2) return e;
  if (Se(e, t)?.node === s) {
    const o = Yn(e, t);
    return o === e ? e : xe(o);
  }
  const r = Ts(e, t, (o) => ({
    ...Cs(Pr(o.panels.map(xs), Ue(o), n)),
    ...be(o)
  }));
  return r ? xe(r) : e;
}
function Pr(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Ms(e, n).frames;
}
function Ar(e, t) {
  return { ...Cs(Pr(e.children, Ue(e), t)), ...be(e) };
}
function Jf(e, t, n) {
  const s = sn(
    e,
    t,
    (a) => se(a) ? a : Ar(a, n)
  );
  return s ? xe(s) : X(e) && Oe(e, t) ? Ms([e], n) : e;
}
function bd(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function zr(e, t) {
  const n = bd(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...be(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function ep(e, t, n = "row") {
  const s = sn(
    e,
    t,
    (a) => se(a) ? zr(a, n) : a
  );
  return s ? xe(s) : e;
}
function Tr(e) {
  if (se(e)) return null;
  const t = X(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || me(t) || X(t) && t.panels.length === 1 && me(t.panels[0]) ? null : t;
}
const $d = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function xd(e, t) {
  const n = Tr(e);
  return n ? t === "inner" ? n : { ...$d(n), ...be(e) } : e;
}
function Nt(e) {
  return e.title ? e.title : X(e) ? "" : se(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Wt(e, t) {
  if (X(e)) {
    const s = e.panels[wt(e)];
    return s === void 0 ? "" : me(s) ? t(s) ?? s : Nt(s) || Wt(s, t);
  }
  if (e.title) return e.title;
  if (se(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Wt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Wt(n, t) : "";
}
function ct(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (Ft(n)) n = n.children[s];
    else if (se(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || me(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function mt(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (se(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const c = mt(i.node, a, n);
    if (c === i.node) return e;
    const u = [...e.frames];
    return u[s] = { ...i, node: c }, { ...e, frames: u };
  }
  if (X(e)) {
    const i = e.panels[s];
    if (i === void 0 || me(i)) return e;
    const c = mt(i, a, n);
    if (c === i) return e;
    const u = [...e.panels];
    return u[s] = c, { ...e, panels: u };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = mt(r, a, n);
  if (o === r) return e;
  const l = [...e.children];
  return l[s] = o, { ...e, children: l };
}
function hn(e, t, n) {
  if (t.length === 0)
    return Ft(e) ? { ...e, sizes: zs(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (se(e)) {
    const l = e.frames[s];
    if (!l) return e;
    const i = hn(l.node, a, n);
    if (i === l.node) return e;
    const c = [...e.frames];
    return c[s] = { ...l, node: i }, { ...e, frames: c };
  }
  if (X(e)) {
    const l = e.panels[s];
    if (l === void 0 || me(l)) return e;
    const i = hn(l, a, n);
    if (i === l) return e;
    const c = [...e.panels];
    return c[s] = i, { ...e, panels: c };
  }
  const r = e.children[s];
  if (!r) return e;
  const o = [...e.children];
  return o[s] = hn(r, a, n), { ...e, children: o };
}
function _a(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const o = a + r;
  if (o < s * 2) return e;
  const l = [...e], i = Math.min(Math.max(a + n, s), o - s);
  return l[t] = i, l[t + 1] = o - i, l;
}
function bn(e) {
  if (!X(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !me(t) ? e : { ...Es([Cd(e)]), ...be(e) };
}
const Cd = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function ya(e) {
  return e.length === 0 ? null : Es(e.map(Je));
}
function Md(e, t) {
  if (!e) return ya(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const i of at(e))
    !n.has(i) || s.has(i) ? a.add(i) : s.add(i);
  let r = e;
  for (const i of a)
    r = r ? ht(r, i) : null;
  const o = new Set(r ? at(r) : []), l = t.filter((i) => !o.has(i));
  if (l.length === 0) return r ? bn(xe(r)) : null;
  if (!r) return ya(l);
  if (se(r)) {
    const i = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...l.map(
          (c, u) => Sn(Je(c), {
            x: vt.x + (i + u) * kn,
            y: vt.y + (i + u) * kn
          })
        )
      ]
    };
  }
  return bn(xe(Es([r, ...l.map(Je)])));
}
const Ls = Symbol("dc.windowContext");
function Sd(e) {
  return es(Ls, e), e;
}
function Rs() {
  const e = zt(Ls, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Ed = ["data-dc-glyph"], Pd = { class: "dc-glyph__line" }, Ad = ["d"], zd = {
  key: 0,
  class: "dc-glyph__aqua"
}, Td = ["d"], Ld = /* @__PURE__ */ oe({
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
    return (s, a) => (f(), m("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      x("g", Pd, [
        (f(!0), m(ne, null, he(t[e.kind], (r) => (f(), m("path", {
          key: r,
          d: r
        }, null, 8, Ad))), 128))
      ]),
      n[e.kind] ? (f(), m("g", zd, [
        (f(!0), m(ne, null, he(n[e.kind], (r) => (f(), m("path", {
          key: r,
          d: r
        }, null, 8, Td))), 128))
      ])) : R("", !0)
    ], 8, Ed));
  }
}), At = /* @__PURE__ */ ue(Ld, [["__scopeId", "data-v-4d2872c0"]]), Rd = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Nd = ["data-dc-movable"], Fd = { class: "dc-float__title dc-truncate" }, Id = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Od = ["aria-label", "aria-pressed", "data-dc-minimize"], Dd = ["aria-label", "aria-pressed", "data-dc-maximize"], Bd = ["aria-label", "data-dc-close"], qd = { class: "dc-float__content" }, Vd = ["data-dc-handle", "onPointerdown"], Kd = /* @__PURE__ */ oe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Rs(), s = v(() => Te(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), r = v(() => lt(t.frame)), o = v(() => pt(t.frame)), l = v(() => r.value || o.value), i = v(() => n.resizable.value && !a.value && !l.value), c = v(() => n.movable.value && !a.value && !l.value), u = v(() => {
      const P = at(t.frame.node);
      return P.length === 1 ? P[0] ?? null : null;
    }), h = v(() => u.value !== null && n.closable(u.value)), y = v(() => t.frame.node.headless === !0), w = v(
      () => !y.value && (!X(t.frame.node) || o.value)
    ), k = v(
      () => t.frame.title || Nt(t.frame.node) || Wt(t.frame.node, (P) => n.panelFor(P)?.title)
    ), $ = v(() => n.spaceMenu(t.path));
    function _(P) {
      P.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, P, "move");
    }
    function C(P) {
      P.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const L = v(() => {
      const P = n.framing.value;
      return P !== null && ce(t.frame.node, P);
    }), D = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Un}px`,
        height: `${_r}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), M = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (P, V) => (f(), m("div", {
      class: "dc-float",
      style: Ee(D.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": L.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (A) => z(n).raiseAt(e.path))
    }, [
      w.value ? (f(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: _,
        onDblclick: C
      }, [
        x("span", Fd, I(k.value), 1),
        $.value.length ? (f(), J($s, {
          key: 0,
          items: $.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : R("", !0),
        !a.value || o.value && h.value && u.value ? (f(), m("div", Id, [
          a.value ? R("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": s.value,
            onClick: V[0] || (V[0] = (A) => z(n).toggleMinimizeAt(e.path))
          }, [
            fe(At, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Od)),
          a.value ? R("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: V[1] || (V[1] = (A) => z(n).toggleMaximizeAt(e.path))
          }, [
            fe(At, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Dd)),
          o.value && h.value && u.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": u.value,
            onClick: V[2] || (V[2] = (A) => z(n).close(u.value))
          }, [
            fe(At, { kind: "close" })
          ], 8, Bd)) : R("", !0)
        ])) : R("", !0)
      ], 40, Nd)) : R("", !0),
      x("div", qd, [
        $e(P.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(ne, null, he(i.value ? M : [], (A) => (f(), m("span", {
        key: A,
        class: "dc-float__grip",
        "data-dc-handle": A,
        "aria-hidden": "true",
        onPointerdown: Re((b) => z(n).beginFrameDragAt(e.path, b, A), ["stop"])
      }, null, 40, Vd))), 128))
    ], 44, Rd));
  }
}), Wd = /* @__PURE__ */ ue(Kd, [["__scopeId", "data-v-f035684c"]]), Ns = Symbol("dc.paneContext");
function Hd(e) {
  return es(Ns, e), e;
}
function tp() {
  return zt(Ns, null);
}
function np(e) {
  const t = zt(Ls, null), n = zt(Ns, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => xt(e)
  );
  return ns() && $n(s), s;
}
const Ud = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], jd = ["data-dc-movable"], Gd = ["aria-label", "aria-pressed"], Xd = ["data-dc-space-name"], Yd = { class: "dc-truncate" }, Qd = ["aria-label"], Zd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Jd = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], ef = { class: "dc-tab__name dc-truncate" }, tf = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, nf = ["aria-label", "data-dc-close", "onClick"], sf = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, af = { class: "dc-pane__tools" }, rf = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, lf = ["aria-label", "data-dc-minimize"], of = ["aria-label", "aria-pressed", "data-dc-maximize"], cf = ["aria-label", "data-dc-close"], uf = ["id", "role", "aria-labelledby"], df = ["id", "role", "aria-labelledby"], ff = ["data-dc-edge"], pf = /* @__PURE__ */ oe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Rs(), s = ts() ?? "dc-pane", a = v(
      () => t.group.panels.flatMap((E, U) => {
        if (!me(E)) {
          const Ce = Nt(E) || Wt(E, (Ae) => n.panelFor(Ae)?.title);
          return [{ kind: "space", index: U, id: `space-${U}`, title: Ce, node: E }];
        }
        const ae = n.panelFor(E);
        return ae ? [{ kind: "panel", index: U, id: E, title: ae.title, panel: ae }] : [];
      })
    ), r = v(() => a.value.length > 1), o = v(() => {
      const E = wt(t.group);
      return a.value.find((U) => U.index === E) ?? a.value[0] ?? null;
    }), l = v(() => o.value?.kind === "space" ? o.value.node : null), i = v(() => l.value ? "" : wr(t.group)), c = v(() => l.value ? null : n.panelFor(i.value)), u = v(() => o.value?.title ?? ""), h = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = v(() => [...t.path, o.value?.index ?? 0]), w = v(() => i.value || fa(t.group)[0] || ""), k = v(() => n.viewFor(i.value)), $ = v(() => t.group.headless === !0), _ = v(() => n.focused.value === i.value), C = v(() => n.dragging.value === i.value), L = v(() => n.moving.value === i.value), D = v(() => n.frameOf(w.value) !== null), M = v(() => n.panelFor(w.value)?.fixed === !0), P = v(
      () => !l.value && (n.canMove(i.value) || D.value && n.movable.value && !M.value)
    ), V = v(
      () => l.value ? n.spaceMenu(y.value) : n.menuFor(i.value)
    ), A = (E) => n.closable(E);
    Hd({ panel: i });
    const b = v(() => n.maximized(w.value)), K = v(
      () => D.value && !M.value || !r.value && !!c.value && A(c.value.id)
    ), N = (E) => `${s}-tab-${E}`, Y = v(() => `${s}-body`), G = v(() => {
      const E = n.dropTarget.value;
      return !E || !Oe(t.group, E.panel) || E.edge === "float" ? null : E;
    }), ge = v(() => G.value?.index === void 0 ? G.value?.edge ?? null : null), ie = v(() => G.value?.index ?? null), S = () => c.value ? n.renderContent(c.value, k.value, _.value) ?? null : null, O = () => c.value ? n.renderActions(c.value, k.value, _.value) ?? null : null;
    let j = null;
    function re(E) {
      const U = j !== null && Math.hypot(E.clientX - j.x, E.clientY - j.y) >= 4;
      return j = null, U;
    }
    const _e = (E) => E.kind === "panel" ? E.id : Te(E.node);
    function Pe(E, U) {
      U.kind !== "space" && (n.focus(U.id), j = { x: E.clientX, y: E.clientY }, n.beginDrag(U.id, E));
    }
    function Le(E, U) {
      if (re(E)) return;
      const ae = _e(U);
      ae && n.selectPanel(ae);
    }
    function je(E) {
      i.value && n.focus(i.value), !E.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (D.value ? n.beginFrameDrag(w.value, E, "move") : n.beginDrag(i.value, E));
    }
    function Ge(E) {
      j = { x: E.clientX, y: E.clientY }, n.beginDrag(i.value, E);
    }
    function Xe(E) {
      re(E) || n.toggleMoveMode(i.value);
    }
    const Ve = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Fe(E) {
      if (!L.value) return;
      if (E.key === "Escape") {
        E.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const U = Ve[E.key];
      U && (E.preventDefault(), D.value ? n.nudgeFrame(i.value, U, E.shiftKey) : n.nudge(i.value, U, E.shiftKey));
    }
    function Ke(E) {
      !D.value || E.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(w.value);
    }
    function B(E, U) {
      E.stopPropagation(), j = null, n.close(U);
    }
    function Q(E, U) {
      const ae = a.value.length;
      let Ce = null;
      if (E.key === "ArrowRight" ? Ce = (U + 1) % ae : E.key === "ArrowLeft" ? Ce = (U - 1 + ae) % ae : E.key === "Home" ? Ce = 0 : E.key === "End" && (Ce = ae - 1), Ce === null) return;
      E.preventDefault();
      const Ae = a.value[Ce];
      if (!Ae) return;
      const It = _e(Ae);
      It && n.selectPanel(It);
    }
    return (E, U) => o.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": z(fa)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": D.value ? "true" : "false",
      "data-dc-maximized": b.value ? "true" : "false",
      "data-dc-headless": $.value ? "true" : "false",
      "data-dc-active": _.value ? "true" : "false",
      "data-dc-dragging": C.value ? "true" : "false",
      "aria-label": u.value,
      onFocusin: U[7] || (U[7] = (ae) => i.value && z(n).focus(i.value))
    }, [
      $.value ? R("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": P.value ? "true" : "false",
        onPointerdown: je,
        onDblclick: Ke
      }, [
        P.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${u.value}`,
          "aria-pressed": L.value,
          onPointerdown: Ge,
          onClick: Xe,
          onKeydown: Fe
        }, [...U[8] || (U[8] = [
          x("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Gd)) : R("", !0),
        h.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          x("span", Yd, I(h.value), 1)
        ], 8, Xd)) : R("", !0),
        x("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${u.value} panels`
        }, [
          (f(!0), m(ne, null, he(a.value, (ae, Ce) => (f(), m(ne, {
            key: ae.id
          }, [
            ie.value === Ce ? (f(), m("span", Zd)) : R("", !0),
            x("button", {
              id: N(ae.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ae.kind === "panel" ? ae.id : void 0,
              "data-dc-space": ae.kind === "space" ? ae.title : void 0,
              "aria-selected": ae.index === o.value.index,
              "aria-controls": Y.value,
              tabindex: ae.index === o.value.index ? 0 : -1,
              onPointerdown: (Ae) => Pe(Ae, ae),
              onClick: (Ae) => Le(Ae, ae),
              onKeydown: (Ae) => Q(Ae, Ce)
            }, [
              x("span", ef, I(ae.title), 1),
              ae.kind === "panel" && ae.panel.subtitle ? (f(), m("span", tf, I(ae.panel.subtitle), 1)) : R("", !0),
              r.value && ae.kind === "panel" && A(ae.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ae.title}`,
                "data-dc-close": ae.id,
                onPointerdown: U[0] || (U[0] = Re(() => {
                }, ["stop"])),
                onClick: (Ae) => B(Ae, ae.id)
              }, [...U[9] || (U[9] = [
                x("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, nf)) : R("", !0)
            ], 40, Jd)
          ], 64))), 128)),
          ie.value === a.value.length ? (f(), m("span", sf)) : R("", !0)
        ], 8, Qd),
        x("div", af, [
          fe(O),
          V.value.length ? (f(), J($s, {
            key: 0,
            items: V.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ]),
        K.value ? (f(), m("div", rf, [
          D.value && !M.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${u.value}`,
            "data-dc-minimize": w.value,
            onPointerdown: U[1] || (U[1] = Re(() => {
            }, ["stop"])),
            onClick: U[2] || (U[2] = (ae) => z(n).toggleMinimize(w.value))
          }, [
            fe(At, { kind: "minimize" })
          ], 40, lf)) : R("", !0),
          D.value && !M.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${b.value ? "Restore" : "Maximize"} ${u.value}`,
            "aria-pressed": b.value,
            "data-dc-maximize": w.value,
            onPointerdown: U[3] || (U[3] = Re(() => {
            }, ["stop"])),
            onClick: U[4] || (U[4] = (ae) => z(n).toggleMaximize(w.value))
          }, [
            fe(At, {
              kind: b.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, of)) : R("", !0),
          !r.value && c.value && A(c.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${u.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: U[5] || (U[5] = Re(() => {
            }, ["stop"])),
            onClick: U[6] || (U[6] = (ae) => z(n).close(c.value.id))
          }, [
            fe(At, { kind: "close" })
          ], 40, cf)) : R("", !0)
        ])) : R("", !0)
      ], 40, jd)),
      l.value ? (f(), m("div", {
        key: 1,
        id: Y.value,
        class: "dc-pane__space",
        role: $.value ? void 0 : "tabpanel",
        "aria-labelledby": $.value ? void 0 : N(o.value.id)
      }, [
        $e(E.$slots, "space", {
          node: l.value,
          path: y.value
        }, void 0, !0)
      ], 8, uf)) : (f(), m("div", {
        key: 2,
        id: Y.value,
        class: "dc-pane__body",
        role: $.value ? void 0 : "tabpanel",
        "aria-labelledby": $.value ? void 0 : N(i.value)
      }, [
        fe(S)
      ], 8, df)),
      ge.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ge.value,
        "aria-hidden": "true"
      }, null, 8, ff)) : R("", !0)
    ], 40, Ud)) : R("", !0);
  }
}), Lr = /* @__PURE__ */ ue(pf, [["__scopeId", "data-v-b73435eb"]]), vf = ["data-dc-space", "data-dc-path", "aria-label"], hf = {
  key: 0,
  class: "dc-space__head"
}, mf = { class: "dc-space__title dc-truncate" }, gf = ["data-dc-direction"], _f = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, yf = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], wf = /* @__PURE__ */ oe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Rs(), s = W(null), a = v(() => X(t.node) ? t.node : null), r = v(() => Ft(t.node) ? t.node : null), o = v(() => se(t.node) ? t.node : null), l = v(
      () => r.value ? r.value.children : o.value?.frames.map((S) => S.node) ?? []
    ), i = v(() => r.value ? st(r.value) : []), c = v(
      () => (o.value?.frames ?? []).map((S, O) => ({
        held: S,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: O,
        key: A(S.node),
        path: [...t.path, O]
      })).sort((S, O) => S.key < O.key ? -1 : S.key > O.key ? 1 : 0)
    ), u = v(() => Nt(t.node)), h = v(() => n.spaceMenu(t.path)), y = v(() => t.node.headless === !0), w = v(() => o.value ? "desktop" : r.value?.direction ?? ""), k = W(null), $ = W(0);
    let _ = null;
    we(
      k,
      (S) => {
        _?.disconnect(), _ = null, !(!S || typeof ResizeObserver > "u") && ($.value = S.clientWidth, _ = new ResizeObserver(([O]) => {
          $.value = O?.contentRect.width ?? 0;
        }), _.observe(S));
      },
      { immediate: !0 }
    ), Be(() => _?.disconnect());
    const C = v(() => {
      const S = Math.max(
        1,
        Math.floor(($.value + bt) / (Un + bt))
      ), O = /* @__PURE__ */ new Map();
      let j = 0;
      for (const re of c.value)
        re.held.minimized === !0 && (O.set(re.key, {
          x: bt + j % S * (Un + bt),
          bottom: bt + Math.floor(j / S) * (_r + bt)
        }), j += 1);
      return O;
    }), L = (S) => !!S && S.join("/") === t.path.join("/"), D = v(() => {
      const S = n.dropTarget.value, O = o.value;
      if (!O || !S?.rect || S.edge !== "float") return null;
      if (S.space) return L(S.space) ? S.rect : null;
      const j = Se(O, S.panel);
      return j && O.frames.includes(j) ? S.rect : null;
    }), M = v(() => {
      const S = n.dropTarget.value;
      return !!S && !S.rect && L(S.space);
    }), P = v(() => r.value?.direction === "row"), V = v(() => l.value.map((S, O) => [...t.path, O])), A = (S) => [...at(S)].sort().join("/"), b = (S) => {
      const O = at(S)[0];
      return (O ? n.panelFor(O)?.title : null) ?? O ?? "panel";
    }, K = (S) => {
      const O = l.value[S], j = l.value[S + 1];
      return !O || !j ? "Resize panels" : `Resize ${b(O)} and ${b(j)}`;
    }, N = (S) => {
      const O = i.value[S] ?? 0, j = i.value[S + 1] ?? 0, re = O + j;
      return re > 0 ? Math.round(O / re * 100) : 50;
    };
    function Y() {
      const S = s.value, O = S ? P.value ? S.clientWidth : S.clientHeight : 0;
      return O <= 0 ? 0.05 : Math.min(n.minPanelSize.value / O, 0.4);
    }
    let G = null;
    function ge(S, O) {
      const j = r.value, re = s.value;
      if (!n.resizable.value || !j || !re || S.button !== 0) return;
      const _e = P.value ? re.clientWidth : re.clientHeight;
      if (_e <= 0) return;
      const Pe = P.value ? S.clientX : S.clientY, Le = st(j), je = Math.min(n.minPanelSize.value / _e, 0.4);
      S.preventDefault();
      const Ge = (Fe) => {
        const Ke = ((P.value ? Fe.clientX : Fe.clientY) - Pe) / _e;
        n.setSizes(t.path, _a(Le, O, Ke, je));
      }, Xe = () => G?.(), Ve = (Fe) => {
        Fe.key === "Escape" && (n.setSizes(t.path, Le), G?.());
      };
      G = () => {
        window.removeEventListener("pointermove", Ge), window.removeEventListener("pointerup", Xe), window.removeEventListener("pointercancel", Xe), window.removeEventListener("keydown", Ve), G = null;
      }, window.addEventListener("pointermove", Ge), window.addEventListener("pointerup", Xe), window.addEventListener("pointercancel", Xe), window.addEventListener("keydown", Ve);
    }
    Be(() => G?.());
    function ie(S, O) {
      const j = r.value;
      if (!n.resizable.value || !j) return;
      const re = P.value ? "ArrowRight" : "ArrowDown", _e = P.value ? "ArrowLeft" : "ArrowUp", Pe = S.shiftKey ? 0.1 : 0.02;
      if (S.key !== re && S.key !== _e) return;
      const Le = S.key === re ? Pe : -Pe;
      S.preventDefault(), n.setSizes(t.path, _a(st(j), O, Le, Y()));
    }
    return (S, O) => {
      const j = Ca("WindowNode", !0);
      return a.value ? (f(), J(Lr, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: Ze(({ node: re, path: _e }) => [
          fe(j, {
            node: re,
            path: _e,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), m("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": w.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": u.value
      }, [
        !e.framed && !y.value ? (f(), m("header", hf, [
          x("span", mf, I(u.value), 1),
          h.value.length ? (f(), J($s, {
            key: 0,
            items: h.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ])) : R("", !0),
        o.value ? (f(), m("div", {
          key: 1,
          ref_key: "desktop",
          ref: k,
          class: "dc-window__desktop"
        }, [
          D.value ? (f(), m("div", {
            key: 0,
            class: "dc-window__drop",
            style: Ee({
              left: `${D.value.x}px`,
              top: `${D.value.y}px`,
              width: `${D.value.w}px`,
              height: `${D.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : R("", !0),
          (f(!0), m(ne, null, he(c.value, (re) => (f(), J(Wd, {
            key: re.key,
            frame: re.held,
            path: re.path,
            order: re.order,
            place: C.value.get(re.key) ?? null
          }, {
            default: Ze(() => [
              fe(j, {
                node: re.held.node,
                path: re.path,
                framed: re.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (f(), m("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          M.value ? (f(), m("div", _f)) : R("", !0),
          (f(!0), m(ne, null, he(l.value, (re, _e) => (f(), m(ne, {
            key: A(re)
          }, [
            x("div", {
              class: "dc-window__cell",
              style: Ee({ flexGrow: i.value[_e] ?? 1 })
            }, [
              fe(j, {
                node: re,
                path: V.value[_e] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            _e < l.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": P.value ? "vertical" : "horizontal",
              "aria-label": K(_e),
              "aria-valuenow": N(_e),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": z(n).resizable.value ? void 0 : "true",
              tabindex: z(n).resizable.value ? 0 : -1,
              onPointerdown: (Pe) => ge(Pe, _e),
              onKeydown: (Pe) => ie(Pe, _e)
            }, null, 40, yf)) : R("", !0)
          ], 64))), 128))
        ], 8, gf)) : R("", !0)
      ], 8, vf));
    };
  }
}), kf = /* @__PURE__ */ ue(wf, [["__scopeId", "data-v-fb5b403f"]]), bf = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], $f = {
  key: 1,
  class: "dc-window__empty"
}, xf = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, cn = 16, Cf = /* @__PURE__ */ oe({
  __name: "WindowFrame",
  props: /* @__PURE__ */ yn({
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
  emits: /* @__PURE__ */ yn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = Bt(e, "layout"), o = Bt(e, "views"), l = Gt(), i = v(() => new Map(s.panels.map((d) => [d.id, d]))), c = v(() => s.panels.map((d) => d.id)), u = v(() => Md(r.value, c.value)), h = W(null), y = W(null), w = W(null), k = W(!0), $ = W(null), _ = W(null), C = W(null), L = W(""), D = W(null);
    function M() {
      const d = D.value;
      return d ? [...d.querySelectorAll(".dc-pane[data-dc-panels]")].filter((g) => g.closest(".dc-window") === d).map((g) => ({ panels: (g.dataset.dcPanels ?? "").split(" "), element: g })) : [];
    }
    function P(d) {
      const p = [];
      let g = d.closest(".dc-float");
      for (; g; )
        p.unshift(Number(g.dataset.dcOrder ?? 0)), g = g.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function V() {
      return M().map((d) => ({ pane: d, order: P(d.element) })).sort((d, p) => {
        const g = Math.max(d.order.length, p.order.length);
        for (let T = 0; T < g; T += 1) {
          const F = (d.order[T] ?? -1) - (p.order[T] ?? -1);
          if (F !== 0) return F;
        }
        return 0;
      }).map((d) => d.pane);
    }
    const A = (d) => M().find((p) => p.panels.includes(d)) ?? null;
    function b(d) {
      const p = i.value.get(d);
      if (!p) return "";
      const g = o.value[d];
      return g && p.views?.some((T) => T.key === g) ? g : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function K(d, p) {
      o.value = { ...o.value, [d]: p }, a("view-change", { panel: d, view: p });
    }
    const N = v(
      () => s.panels.filter((d) => d.fixed !== !0).length
    );
    function Y(d) {
      return !s.movable || N.value < 1 || s.panels.length < 2 ? !1 : i.value.get(d)?.fixed !== !0;
    }
    function G(d, p) {
      const g = u.value;
      !d || !g || d === g || (r.value = d, p && a("panel-move", p));
    }
    function ge(d, p, g) {
      if (d.width <= 0 || d.height <= 0) return "center";
      const T = (p - d.left) / d.width, F = (g - d.top) / d.height, q = 0.3;
      return T > q && T < 1 - q && F > q && F < 1 - q ? "center" : [
        { edge: "left", distance: T },
        { edge: "right", distance: 1 - T },
        { edge: "top", distance: F },
        { edge: "bottom", distance: 1 - F }
      ].reduce(
        (le, H) => H.distance < le.distance ? H : le
      ).edge;
    }
    function ie(d, p) {
      const g = [...d.querySelectorAll(".dc-tab")], T = g.findIndex((F) => {
        const q = F.getBoundingClientRect();
        return p < q.left + q.width / 2;
      });
      return T === -1 ? g.length : T;
    }
    function S(d, p, g) {
      for (const { panels: T, element: F } of V().reverse()) {
        const q = F.getBoundingClientRect();
        if (d < q.left || d > q.right || p < q.top || p > q.bottom) continue;
        const pe = T.find((ee) => ee !== g), le = F.querySelector(".dc-pane__tabs"), H = le?.getBoundingClientRect();
        if (le && H && p >= H.top && p <= H.bottom)
          return pe ? { panel: pe, edge: "center", index: ie(le, d) } : null;
        const Z = F.querySelector(":scope > .dc-pane__space");
        if (Z) {
          const ee = Z.getBoundingClientRect();
          if (d >= ee.left && d <= ee.right && p >= ee.top && p <= ee.bottom) continue;
        }
        return pe ? { panel: pe, edge: ge(q, d, p) } : null;
      }
      return j(d, p, g) ?? Pe(d, p);
    }
    function O() {
      const d = D.value;
      return d ? [...d.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === d).reverse() : [];
    }
    function j(d, p, g) {
      const T = u.value;
      if (!T) return null;
      for (const F of O()) {
        const q = F.getBoundingClientRect();
        if (d < q.left || d > q.right || p < q.top || p > q.bottom) continue;
        const pe = Le(F), le = pe.flatMap((de) => de.panels).find((de) => de !== g);
        if (!le && pe.length > 0) return null;
        const H = Se(T, g)?.rect, Z = Nn(
          {
            x: d - q.left - 24,
            y: p - q.top - 12,
            w: H?.w ?? vt.w,
            h: H?.h ?? vt.h
          },
          { w: F.clientWidth, h: F.clientHeight },
          s.minPanelSize
        );
        if (le) return { panel: le, edge: "float", rect: Z };
        const ee = re(F);
        return ee ? { panel: "", space: ee, edge: "float", rect: Z } : null;
      }
      return null;
    }
    function re(d) {
      const p = d.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function _e() {
      const d = D.value;
      return d ? [...d.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === d).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const g = re(p);
        return g ? [{ element: p, path: g }] : [];
      }) : [];
    }
    function Pe(d, p) {
      for (const { element: g, path: T } of _e()) {
        if (g.dataset.dcSpace === "desktop") continue;
        const F = g.getBoundingClientRect();
        if (!(d < F.left || d > F.right || p < F.top || p > F.bottom))
          return { panel: "", space: T, edge: "center" };
      }
      return null;
    }
    function Le(d) {
      return M().filter(
        (p) => p.element.closest(".dc-window__desktop") === d
      );
    }
    let je = null;
    const Ge = (d) => d.altKey;
    function Xe(d, p) {
      if (!Y(d) || y.value || _.value || p.button !== 0) return;
      const g = p.clientX, T = p.clientY;
      let F = !1, q = Ge(p);
      const pe = () => {
        const ve = C.value;
        ve && (w.value = q ? j(ve.x, ve.y, d) : S(ve.x, ve.y, d));
      }, le = (ve) => {
        if (!F) {
          if (Math.hypot(ve.clientX - g, ve.clientY - T) < 4) return;
          F = !0, y.value = d, $.value = null;
        }
        q = Ge(ve), k.value = !q, C.value = { x: ve.clientX, y: ve.clientY }, pe();
      }, H = (ve) => {
        Ge(ve) !== q && (q = !q, k.value = !q, F && pe());
      }, Z = (ve) => {
        je?.();
        const te = w.value, ze = u.value;
        if (ve && F && te && ze) {
          const rt = te.space ? ma(ze, d, te.space, te.rect) : te.edge === "float" && te.rect ? ha(ze, d, te.panel, te.rect) : on(ze, d, te.panel, te.edge, te.index);
          G(rt, {
            panel: d,
            target: te.panel,
            edge: te.edge,
            ...te.space === void 0 ? {} : { space: te.space },
            ...te.index === void 0 ? {} : { index: te.index },
            ...te.rect === void 0 ? {} : { rect: te.rect }
          });
        }
        y.value = null, w.value = null, C.value = null, k.value = !0;
      }, ee = () => Z(!0), de = () => Z(!1), ye = (ve) => {
        if (ve.key === "Escape") {
          Z(!1);
          return;
        }
        H(ve);
      };
      je = () => {
        window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", ee), window.removeEventListener("pointercancel", de), window.removeEventListener("keydown", ye), window.removeEventListener("keyup", H), je = null;
      }, window.addEventListener("pointermove", le), window.addEventListener("pointerup", ee), window.addEventListener("pointercancel", de), window.addEventListener("keydown", ye), window.addEventListener("keyup", H);
    }
    Be(() => je?.());
    let Ve = null;
    function Fe(d) {
      const p = D.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${d.join("/")}"]`
      )].find((F) => F.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ke(d) {
      const p = u.value;
      return p ? Xn(p, d) : null;
    }
    function B(d) {
      const p = u.value;
      if (!p) return;
      const g = Vt(p, d);
      g !== p && (r.value = g);
    }
    function Q(d) {
      const p = Ke(d);
      p && B(p);
    }
    function E(d) {
      const p = u.value, g = p ? Se(p, d) : null;
      return g !== null && lt(g);
    }
    function U(d) {
      const p = u.value, g = p ? Se(p, d) : null;
      return g !== null && pt(g);
    }
    function ae(d) {
      const p = u.value, g = p ? ft(p, d) : null;
      return g ? Te(g.node) : "";
    }
    function Ce(d) {
      const p = u.value, g = p ? ft(p, d) : null;
      if (!p || !g) return;
      const T = Te(g.node);
      if (i.value.get(T)?.fixed === !0) return;
      const F = !pt(g);
      let q = hd(p, d, F);
      q !== p && (F || (q = Vt(q, d)), r.value = q, a("frame-minimize", { panel: T, minimized: F }));
    }
    function Ae(d) {
      const p = Ke(d);
      p && Ce(p);
    }
    function It(d) {
      const p = u.value, g = p ? ft(p, d) : null;
      if (!p || !g) return;
      const T = Te(g.node);
      if (i.value.get(T)?.fixed === !0) return;
      const F = !lt(g);
      let q = vd(p, d, F);
      q !== p && (F && (q = Vt(q, d)), r.value = q, a("frame-maximize", { panel: T, maximized: F }));
    }
    function Os(d) {
      const p = Ke(d);
      p && It(p);
    }
    function Ds(d, p, g) {
      const T = u.value, F = T ? ft(T, d) : null;
      if (!T || !F || p.button !== 0 || y.value || _.value) return;
      const q = Te(F.node);
      if (i.value.get(q)?.fixed === !0 || lt(F) || pt(F) || (g === "move" ? !s.movable : !s.resizable)) return;
      const pe = Fe(d), le = md(T, d);
      B(d);
      const H = { w: pe?.clientWidth ?? 0, h: pe?.clientHeight ?? 0 }, Z = { ...F.rect }, ee = p.clientX, de = p.clientY, ye = s.minPanelSize;
      _.value = q;
      const ve = (Ie) => {
        const et = u.value;
        if (!et) return;
        const Ot = va(et, le, Nn(Ie, H, ye));
        Ot !== et && (r.value = Ot);
      }, te = (Ie) => {
        Ie.preventDefault();
        const et = Ie.clientX - ee, Ot = Ie.clientY - de;
        ve(
          g === "move" ? { ...Z, x: Z.x + et, y: Z.y + Ot } : pa(Z, g, et, Ot, ye)
        );
      }, ze = (Ie) => {
        if (Ve?.(), _.value = null, !Ie) {
          ve(Z);
          return;
        }
        const et = u.value ? ft(u.value, le) : null;
        et && a("frame-change", { panel: ae(le), rect: et.rect });
      }, rt = () => ze(!0), ut = () => ze(!1), dt = (Ie) => {
        Ie.key === "Escape" && ze(!1);
      };
      Ve = () => {
        window.removeEventListener("pointermove", te), window.removeEventListener("pointerup", rt), window.removeEventListener("pointercancel", ut), window.removeEventListener("keydown", dt), Ve = null;
      }, window.addEventListener("pointermove", te), window.addEventListener("pointerup", rt), window.addEventListener("pointercancel", ut), window.addEventListener("keydown", dt);
    }
    function Or(d, p, g) {
      const T = Ke(d);
      T && Ds(T, p, g);
    }
    function Dr(d, p, g = !1) {
      const T = u.value, F = Ke(d), q = T && F ? ft(T, F) : null;
      if (!T || !F || !q || i.value.get(d)?.fixed === !0 || (g ? !s.resizable : !s.movable)) return;
      if (lt(q) || pt(q)) {
        L.value = `${Ye(d)} is ${lt(q) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const pe = p === "left" ? -cn : p === "right" ? cn : 0, le = p === "up" ? -cn : p === "down" ? cn : 0, H = Fe(F), Z = { w: H?.clientWidth ?? 0, h: H?.clientHeight ?? 0 }, ee = g ? pa(q.rect, "se", pe, le, s.minPanelSize) : { ...q.rect, x: q.rect.x + pe, y: q.rect.y + le }, de = va(T, F, Nn(ee, Z, s.minPanelSize));
      if (de === T) {
        L.value = g ? `${Ye(d)} cannot be resized further.` : `${Ye(d)} cannot move ${p}.`;
        return;
      }
      r.value = de;
      const ye = ft(de, F);
      ye && (a("frame-change", { panel: d, rect: ye.rect }), L.value = g ? `${Ye(d)} resized to ${ye.rect.w} by ${ye.rect.h}.` : `${Ye(d)} moved to ${ye.rect.x}, ${ye.rect.y}.`);
    }
    Be(() => Ve?.());
    function Br(d, p) {
      const g = A(d), T = g?.element.getBoundingClientRect();
      if (!g || !T) return null;
      const F = p === "left" || p === "right", q = (H) => {
        if (!(F ? H.bottom > T.top + 1 && H.top < T.bottom - 1 : H.right > T.left + 1 && H.left < T.right - 1)) return null;
        const ee = p === "left" ? T.left - H.right : p === "right" ? H.left - T.right : p === "up" ? T.top - H.bottom : H.top - T.bottom;
        return ee < -1 ? null : ee;
      }, pe = [];
      for (const H of M()) {
        if (H === g || H.element === g.element) continue;
        const Z = q(H.element.getBoundingClientRect());
        if (Z === null) continue;
        const ee = H.panels.find((de) => de !== d);
        ee && pe.push({ to: { panel: ee }, distance: Z });
      }
      for (const { element: H, path: Z } of _e()) {
        const ee = q(H.getBoundingClientRect());
        ee !== null && pe.push({ to: { space: Z }, distance: ee });
      }
      return pe.reduce(
        (H, Z) => H && H.distance <= Z.distance ? H : Z,
        null
      )?.to ?? null;
    }
    function qr(d) {
      const p = u.value ? Se(u.value, d) !== null : !1;
      if (!p && !Y(d)) return;
      $.value = $.value === d ? null : d;
      const g = Ye(d);
      if (!$.value) {
        L.value = `${g}: move mode off.`;
        return;
      }
      L.value = p ? `${g}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${g}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ye = (d) => i.value.get(d)?.title ?? d, Vr = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Kr(d, p, g = !1) {
      if (!Y(d)) return;
      const T = u.value;
      if (!T) return;
      const F = Ye(d), q = St(T, d);
      if (!g && q && (p === "left" || p === "right") && q.panels.length > 1) {
        const de = q.panels.indexOf(d), ye = p === "left" ? de - 1 : de + 1;
        if (ye >= 0 && ye < q.panels.length) {
          G(Kt(T, d, ye), { panel: d, target: d, edge: "center", index: ye }), L.value = `${F} moved ${p}, now tab ${ye + 1} of ${q.panels.length}.`, Pn(d);
          return;
        }
      }
      const le = Br(d, p);
      if (!le || le.panel !== void 0 && !Y(le.panel)) {
        L.value = `${F} cannot move ${p}.`;
        return;
      }
      const H = Vr[p];
      if (le.space) {
        const de = le.space, ye = ct(T, de), ve = Se(T, d)?.rect, te = { ...vt, ...ve ? { w: ve.w, h: ve.h } : {} };
        G(ma(T, d, de, te), { panel: d, target: "", space: de, edge: H }), L.value = `${F} moved ${p}, into ${ye ? Nt(ye) : "the space"}.`, Pn(d);
        return;
      }
      const Z = le.panel, ee = q?.panels.length === 1 && St(T, Z)?.panels.length === 1;
      g ? (G(on(T, d, Z, "center"), {
        panel: d,
        target: Z,
        edge: "center"
      }), L.value = `${F} joined ${Ye(Z)} as a tab.`) : ee ? (G(vn(T, d, Z), { panel: d, target: Z, edge: H }), L.value = `${F} moved ${p}, trading places with ${Ye(Z)}.`) : (G(on(T, d, Z, H), { panel: d, target: Z, edge: H }), L.value = `${F} moved ${p}, beside ${Ye(Z)}.`), Pn(d);
    }
    function Pn(d) {
      Ht(() => {
        A(d)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Wr(d, p) {
      const g = u.value;
      g && (r.value = hn(g, d, p));
    }
    function An(d) {
      const p = u.value;
      if (!p) return;
      const g = Pt(p, d);
      g !== p && (r.value = g, a("tab-select", { panel: d }));
    }
    function Bs(d) {
      return i.value.get(d)?.closable ?? s.closable;
    }
    function Hr(d) {
      Bs(d) && a("panel-close", d);
    }
    const zn = W(/* @__PURE__ */ new Map());
    let Ur = 0;
    function jr(d, p) {
      const g = Ur += 1;
      return zn.value.set(g, { panel: d, items: p }), () => {
        zn.value.delete(g);
      };
    }
    function Gr(d) {
      const p = [];
      for (const g of zn.value.values())
        g.panel() === d && p.push(...g.items());
      return p;
    }
    function qs(d) {
      const p = d.filter((g) => g.items.length > 0);
      return p.length < 2 ? p.flatMap((g) => g.items) : p.flatMap((g) => [
        { id: g.id, heading: !0, label: g.title },
        ...g.items
      ]);
    }
    const Vs = (d) => d.title || "These tabs";
    function Xr(d, p) {
      const g = p.id, T = St(d, g), F = (T?.panels.length ?? 0) > 1, q = T?.fixedView === !0, pe = (ee) => ({
        action: () => {
          ee !== d && (r.value = ee);
        }
      }), le = [], H = [], Z = p.views ?? [];
      if (Z.length > 1 && !q) {
        const ee = b(g);
        le.push({
          id: "view",
          label: "View",
          items: Z.map((de) => ({
            id: `view-${de.key}`,
            label: de.label,
            checked: de.key === ee,
            action: () => K(g, de.key)
          }))
        });
      }
      return F && !q && H.push(
        { id: "show-row", label: "Row", checked: !1, ...pe(ga(d, g, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...pe(ga(d, g, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...pe(wd(d, g))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...pe(kd(d, g))
        }
      ), F && T && (H.length && H.push({ separator: !0 }), H.push(...Ks(T, g))), { panel: le, tabs: H, tabsTitle: T ? Vs(T) : "" };
    }
    function Ks(d, p) {
      const g = wt(d), T = (F) => {
        const q = d.panels[(g + F + d.panels.length) % d.panels.length];
        return (q === void 0 ? "" : Te(q)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => An(T(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => An(T(-1)) }
      ];
    }
    function an(d) {
      return d.title ? d.title : X(d) ? d.panels.length > 1 ? "these tabs" : "the strip" : Nt(d);
    }
    function Ws(d) {
      if (!d || se(d) || d.fixedView === !0 || !d.title && d.headless !== !0 || Ue(d)) return null;
      const p = Tr(d);
      return p && p.fixedView !== !0 ? p : null;
    }
    function Yr(d) {
      const p = u.value;
      if (!s.menu || !p) return [];
      const g = ct(p, d);
      if (!g || X(g)) return [];
      if (g.fixedView) return [];
      const T = se(g) ? "desktop" : g.direction, F = (te, ze, rt) => ({
        id: `show-${te}`,
        label: ze,
        checked: T === te,
        action: () => {
          const ut = u.value, dt = rt();
          !ut || dt === g || (r.value = bn(xe(mt(ut, d, dt))));
        }
      }), q = () => {
        const te = Er(g, Qr(g));
        if (X(te) && te.panels.length === 0) return g;
        const ze = X(te) && te.panels.length === 1 ? te.panels[0] : void 0;
        return ze !== void 0 && me(ze) ? g : te;
      }, pe = (te) => () => se(g) ? zr(g, te) : g.direction === te ? g : { ...g, direction: te }, le = d.slice(0, -1), H = d.length > 0 ? ct(p, le) : null, Z = H && X(H) && H.panels.length > 1 ? H : null, ee = H && Ws(H) === g ? H : null, de = Ws(g), ye = g.title || "this space", ve = (te, ze, rt, ut, dt) => ({
        id: te,
        label: dt,
        action: () => {
          const Ie = u.value;
          Ie && (r.value = bn(xe(mt(Ie, ze, xd(rt, ut)))));
        }
      });
      return qs([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: g.title || "This space",
          items: [
            F("row", "Row", pe("row")),
            F("column", "Column", pe("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            F("tabs", "Tabs", () => q()),
            F("desktop", "Desktop", () => se(g) ? g : Ar(g))
          ]
        },
        {
          id: "about-around",
          title: de ? `Around ${an(de)}` : "",
          items: de ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...de.title ? [] : [ve("merge-around-keep-this", d, g, "outer", `Keep ${ye}`)],
            ...g.title ? [] : [ve("merge-around-keep-that", d, g, "inner", `Keep ${an(de)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: ee ? `Inside ${an(ee)}` : "",
          items: ee ? [
            ...g.title ? [] : [ve("merge-inside-keep-that", le, ee, "outer", `Keep ${an(ee)}`)],
            ...ee.title ? [] : [ve("merge-inside-keep-this", le, ee, "inner", `Keep ${ye}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: Z ? Vs(Z) : "",
          items: Z ? Ks(Z, Te(g)) : []
        }
      ]);
    }
    function Qr(d) {
      const p = h.value;
      return p && ce(d, p) ? p : void 0;
    }
    function Zr(d) {
      const p = u.value, g = i.value.get(d);
      if (!p || !g) return [];
      const T = s.menu ? Xr(p, g) : null, F = Gr(d);
      F.length && T?.panel.length && F.push({ separator: !0 }), T && F.push(...T.panel);
      const q = qs([
        { id: "about-panel", title: g.title, items: F },
        { id: "about-tabs", title: T?.tabsTitle ?? "", items: T?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(g, q) : q;
    }
    function Jr(d, p) {
      return l[`${d}-${p}`] ?? l[d];
    }
    function Hs(d, p, g, T) {
      return Jr(d, p.id)?.({ panel: p, view: g, active: T });
    }
    Sd({
      panelFor: (d) => i.value.get(d) ?? null,
      viewFor: b,
      setView: K,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: h,
      dragging: y,
      dropTarget: w,
      moving: $,
      framing: _,
      canMove: Y,
      focus(d) {
        h.value !== d && (h.value = d, a("panel-activate", d));
      },
      selectPanel: An,
      beginDrag: Xe,
      toggleMoveMode: qr,
      nudge: Kr,
      setSizes: Wr,
      frameOf: (d) => u.value ? Se(u.value, d) : null,
      beginFrameDrag: Or,
      nudgeFrame: Dr,
      raise: Q,
      maximized: E,
      toggleMaximize: Os,
      minimized: U,
      toggleMinimize: Ae,
      beginFrameDragAt: Ds,
      raiseAt: B,
      toggleMaximizeAt: It,
      toggleMinimizeAt: Ce,
      menuFor: Zr,
      spaceMenu: Yr,
      registerMenu: jr,
      closable: Bs,
      close: Hr,
      renderContent: (d, p, g) => Hs("panel", d, p, g),
      renderActions: (d, p, g) => Hs("actions", d, p, g),
      layout: u
    });
    const el = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), tl = () => {
      const d = y.value, p = C.value;
      return !d || !p ? null : rl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${p.x}px`, top: `${p.y}px` },
          "aria-hidden": "true"
        },
        i.value.get(d)?.title ?? d
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: u,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(d, p, g, T) {
        const F = u.value;
        F && G(on(F, d, p, g, T), {
          panel: d,
          target: p,
          edge: g,
          ...T === void 0 ? {} : { index: T }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(d) {
        const p = u.value;
        p && (r.value = Pt(p, d));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(d, p, g) {
        const T = u.value;
        T && G(ha(T, d, p, g), {
          panel: d,
          target: p,
          edge: "float",
          rect: g
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(d, p) {
        const g = u.value;
        if (!g) return;
        const T = dd(g, d, p);
        if (T === g) return;
        r.value = T;
        const F = Se(T, d);
        F && a("frame-change", { panel: d, rect: F.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: K,
      /** Brings a floating frame to the front of its stack. */
      raise: Q,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Os,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Ae
    }), (d, p) => (f(), m("div", {
      ref_key: "root",
      ref: D,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": k.value ? "true" : "false",
      style: Ee(el.value)
    }, [
      u.value ? (f(), J(kf, {
        key: 0,
        node: u.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", $f, " This window has no panels. ")),
      fe(tl),
      x("p", xf, I(L.value), 1)
    ], 12, bf));
  }
}), Mf = /* @__PURE__ */ ue(Cf, [["__scopeId", "data-v-711565af"]]), Sf = (e) => Math.round(e * 1e3) / 1e3;
function In(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function Ef(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function On(e) {
  const t = { b: Ef(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function Pf(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function Qn(e) {
  const t = Pf(e);
  return t !== null ? t : Rr(e);
}
function Rr(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((s) => typeof s == "string" ? s : Rr(s)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(On)), In(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(Qn) };
    return e.sizes && (n.z = e.sizes.map(Sf)), e.places && (n.p = e.places.map(On)), In(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: Qn(n.node), ...On(n) }))
  };
  return In(e, t);
}
class Nr extends Error {
}
const Me = () => {
  throw new Nr();
}, Zn = (e) => typeof e == "object" && e !== null && !Array.isArray(e), $t = (e) => Array.isArray(e) ? e : Me(), Fs = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : Me(), Fr = (e) => $t(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : Me());
function Af(e) {
  const [t, n, s, a] = Fr(e);
  return a === void 0 && Me(), { x: t, y: n, w: s, h: a };
}
function Dn(e) {
  if (!Zn(e)) return Me();
  const t = { rect: Af(e.b) }, n = Fs(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function Bn(e, t) {
  const n = Fs(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function mn(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!Zn(e)) return Me();
  if (e.g !== void 0) {
    const n = $t(e.g).map((r) => typeof r == "string" ? r : mn(r));
    n.length === 0 && Me();
    const s = { kind: "group", panels: n }, a = Fs(e.a);
    return a !== void 0 && (s.active = a), e.p !== void 0 && (s.places = $t(e.p).map(Dn)), Bn(e, s);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = $t(t === "row" ? e.r : e.c).map(mn), s = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (s.sizes = Fr(e.z)), e.p !== void 0 && (s.places = $t(e.p).map(Dn)), Bn(e, s);
  }
  if (e.f !== void 0) {
    const s = { kind: "float", frames: $t(e.f).map((a) => !Zn(a) || a.n === void 0 ? Me() : { node: mn(a.n), ...Dn(a) }) };
    return Bn(e, s);
  }
  return Me();
}
const Ir = /[ '!:(),*@$]/, zf = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function wa(e) {
  return e !== "" && !Ir.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function Jn(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? wa(e) : Array.isArray(e) ? `!(${e.map(Jn).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${wa(t)}:${Jn(n)}`).join(",")})`;
}
function Tf(e) {
  let t = 0;
  const n = () => e[t], s = (l) => e[t++] === l ? void 0 : Me(), a = () => {
    if (n() === "'") {
      t++;
      let i = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return Me();
        if (c === "'") return i;
        if (c === "!") {
          const u = e[t++];
          u !== "!" && u !== "'" && Me(), i += u;
        } else i += c;
      }
    }
    const l = t;
    for (; t < e.length && !Ir.test(e[t]); ) t++;
    return t === l && Me(), e.slice(l, t);
  }, r = () => {
    const l = n();
    if (l === "(") {
      t++;
      const c = {};
      if (n() === ")")
        return t++, c;
      for (; ; ) {
        const u = a();
        s(":"), c[u] = r();
        const h = e[t++];
        if (h === ")") return c;
        h !== "," && Me();
      }
    }
    if (l === "!") {
      t++;
      const c = e[t++];
      if (c === "t") return !0;
      if (c === "f") return !1;
      if (c === "n") return null;
      if (c !== "(") return Me();
      const u = [];
      if (n() === ")")
        return t++, u;
      for (; ; ) {
        u.push(r());
        const h = e[t++];
        if (h === ")") return u;
        h !== "," && Me();
      }
    }
    if (l === "'") return a();
    const i = a();
    return zf.test(i) ? Number(i) : i;
  }, o = r();
  return t !== e.length && Me(), o;
}
function ka(e) {
  return Jn(Qn(e));
}
function Lf(e) {
  try {
    return mn(Tf(e));
  } catch (t) {
    if (t instanceof Nr) return null;
    throw t;
  }
}
function ba(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const s = n.indexOf("="), a = s === -1 ? n : n.slice(0, s);
    if (Is(a) === t) return s === -1 ? "" : n.slice(s + 1);
  }
  return null;
}
function Rf(e, t, n) {
  const s = e.replace(/^[?]/, "").split("&").filter(Boolean), a = s.findIndex((o) => {
    const l = o.indexOf("=");
    return Is(l === -1 ? o : o.slice(0, l)) === t;
  }), r = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return a === -1 ? r && s.push(r) : r ? s[a] = r : s.splice(a, 1), s.length ? `?${s.join("&")}` : "";
}
function Is(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
const Nf = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%24/g, "$"],
  [/%20/g, "+"]
], Ff = (e) => {
  let t = encodeURIComponent(e);
  for (const [n, s] of Nf) t = t.replace(n, s);
  return t;
};
function sp(e, t) {
  const { adapter: n } = t, s = t.param ?? "w", a = t.delay ?? 200, r = () => xt(t.home) ?? null;
  let o = ba(n.search.value, s), l = null;
  const i = () => {
    l !== null && clearTimeout(l), l = null;
  }, c = (y) => y === null ? r() : Lf(Is(y)) ?? r(), u = () => {
    i();
    const y = e.value, w = r(), k = y ? ka(y) : null, $ = k === null || w && k === ka(w) ? null : Ff(k);
    o = $;
    const _ = Rf(n.search.value, s, $);
    _ !== n.search.value && n.replace(_);
  }, h = c(o);
  return h && (e.value = h), we(e, () => {
    i(), l = setTimeout(u, a);
  }), we(n.search, (y) => {
    const w = ba(y, s);
    if (w === o) return;
    i(), o = w;
    const k = c(w);
    k && (e.value = k);
  }), ns() && $n(() => l !== null ? u() : void 0), { flush: () => l !== null ? u() : void 0 };
}
function ap(e = "", t = "/") {
  const n = W(nt(e)), s = W(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = nt(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = nt(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function $a(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return nt(s === -1 ? n : n.slice(0, s));
}
function rp(e) {
  const t = W($a(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), s = we(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = $a(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${nt(a)}`),
    replace: (a) => e.replace(`${n.value}${nt(a)}`),
    dispose: s
  };
}
const If = {
  DataShell: Ku,
  ShellHeader: sr,
  QueryPanel: rr,
  RecordActions: or,
  ResultsArea: mr,
  FacetControl: ar,
  SegmentedControl: td,
  StatusPill: Qt,
  WindowFrame: Mf,
  WindowPane: Lr,
  ListView: Hn,
  CardsView: cr,
  GridView: ur,
  ImagesView: dr,
  TableView: vr,
  LinksView: fr,
  PreviewView: pr,
  TypeCardsView: hr
}, lp = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(If))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ma, t.route);
  }
};
export {
  kn as CASCADE_STEP,
  qf as COLUMN_BREAKPOINTS,
  Bf as COLUMN_ROLES,
  cr as CardsView,
  ua as ColumnCell,
  vt as DEFAULT_FRAME,
  qn as DEFAULT_SORT,
  ol as DEFAULT_VIEW,
  Ku as DataShell,
  Vn as EMPTY_CELL,
  Ja as ENTITY_ALL,
  wn as ENTITY_TERM,
  jt as EXPRESSION_TERM,
  ys as FACET_PREFIX,
  ar as FacetControl,
  ur as GridView,
  lp as HeaderContentLayoutPlugin,
  dr as ImagesView,
  fr as LinksView,
  Hn as ListView,
  bt as MINIMIZED_GAP,
  _r as MINIMIZED_HEIGHT,
  Un as MINIMIZED_WIDTH,
  gr as MIN_FRAME,
  aa as MOCK_TINTS,
  Hf as MenuBar,
  $s as MenuButton,
  ks as MenuList,
  Zt as MetricDrill,
  Ns as PANE_CONTEXT_KEY,
  ms as PARAM_DIR,
  ps as PARAM_ENTITY,
  gs as PARAM_EXPR,
  _s as PARAM_PAGE,
  hs as PARAM_SORT,
  vs as PARAM_VIEW,
  bs as PinStar,
  pr as PreviewView,
  Mn as QueryMark,
  rr as QueryPanel,
  rn as RECORD_STATUSES,
  Ra as RESULT_FIELDS,
  Ma as ROUTE_ADAPTER_KEY,
  or as RecordActions,
  mr as ResultsArea,
  Za as SHELL_CONTEXT_KEY,
  Df as SHELL_THEMES,
  Jt as ScopeMark,
  td as SegmentedControl,
  yt as SelectTick,
  Wf as ShellCard,
  sr as ShellHeader,
  da as StandingControl,
  Qt as StatusPill,
  vr as TableView,
  hr as TypeCardsView,
  Sa as VIEW_KINDS,
  il as VIEW_LABELS,
  Ls as WINDOW_CONTEXT_KEY,
  Mf as WindowFrame,
  Lr as WindowPane,
  wr as activePanel,
  wt as activeTab,
  fs as addTerm,
  cs as andExpression,
  cd as axisOf,
  Ms as cascade,
  Ia as cellFull,
  Xt as cellText,
  fn as cellTextOf,
  De as cellValue,
  js as changesResults,
  Nn as clampRect,
  Er as collapseSpace,
  wd as collapseToTabs,
  jf as column,
  Xs as columnAlign,
  Ys as columnClass,
  Gs as columnKey,
  Da as columnShortcut,
  xl as columnShortcutOf,
  Kn as columnTruncates,
  vl as columnsFor,
  ul as countPages,
  ll as createHistoryAdapter,
  ap as createMemoryAdapter,
  ql as createMockDataSource,
  rp as createVueRouterAdapter,
  Lf as decodeLayout,
  gl as defaultCellText,
  ya as defaultLayout,
  is as defaultQuery,
  Vl as drillExpression,
  ma as dropIntoSpace,
  Rt as emptyFacetState,
  rs as emptyFacetValue,
  ka as encodeLayout,
  ja as excludingTerm,
  qa as expandShortcuts,
  Ct as findEntity,
  ot as findSort,
  Xf as fixedView,
  Cs as float,
  ha as floatPanel,
  Ar as floatSplit,
  kd as floatTabs,
  dn as fnv1a,
  Pa as focusEntity,
  kt as formatCount,
  fl as formatDate,
  it as formatExpression,
  dl as formatMetric,
  pl as formatOrdinal,
  Yt as formatTerm,
  Sn as frame,
  ft as frameAt,
  Se as frameOf,
  Xn as framePathOf,
  Te as frontPanel,
  Ol as generateRows,
  Uf as group,
  St as groupOf,
  ud as groups,
  La as hasActiveFacets,
  ce as hasPanel,
  Gf as headless,
  Dt as insertPanel,
  qt as isChoosable,
  Vf as isEntityScoped,
  Ta as isFacetActive,
  se as isFloat,
  X as isGroup,
  lt as isMaximized,
  pt as isMinimized,
  me as isPanelTab,
  ls as isPristineQuery,
  Ft as isSplit,
  Oe as isTabOf,
  os as isTypeCardsQuery,
  Ea as isViewKind,
  na as joinExpression,
  Xa as liftTerm,
  Sl as matchesExpression,
  Dl as matchesFacets,
  fd as maximizeFrame,
  vd as maximizeFrameAt,
  xd as mergeSpace,
  pd as minimizeFrame,
  hd as minimizeFrameAt,
  on as movePanel,
  Kt as moveTab,
  Kf as negateTerm,
  ct as nodeAt,
  Wt as nodeTitle,
  xe as normalizeLayout,
  nt as normalizeSearch,
  zs as normalizeSizes,
  Tr as onlySpace,
  Ut as oppositeTerm,
  at as panelIds,
  Je as panelNode,
  fa as panelTabs,
  Ne as parseExpression,
  Xl as parseQuery,
  wi as presentParts,
  ir as presentRow,
  qe as pressOptions,
  Hd as providePaneContext,
  Kl as provideShellContext,
  Sd as provideWindowContext,
  Fn as raiseFrame,
  Vt as raiseFrameAt,
  md as raisedPath,
  Na as reconcileFacets,
  Md as reconcileLayout,
  Ua as recordTerm,
  zl as refineExpression,
  ht as removePanel,
  mt as replaceAt,
  pa as resizeRect,
  _a as resizeSplit,
  as as resolveView,
  We as roleColumn,
  Fa as roleColumns,
  bn as rootSpace,
  Es as row,
  ml as rowKey,
  xn as sameTerm,
  us as scopeTerm,
  ds as scopeTermFor,
  Qa as scopedEntity,
  oa as serializeQuery,
  Pt as setActivePanel,
  dd as setFrameRect,
  va as setFrameRectAt,
  hn as setSizesAt,
  Zf as setSplitDirection,
  st as sizesOf,
  za as sortsFor,
  be as spaceChrome,
  Nt as spaceTitle,
  Ss as split,
  Pl as splitExpression,
  ga as spreadTabs,
  Ql as summarizeQuery,
  ws as summaryTerms,
  vn as swapPanels,
  xs as tabNode,
  tn as tabPanels,
  Ga as termStanding,
  zr as tileFloat,
  Jf as toFloat,
  ep as toTiled,
  Yf as toggleMaximized,
  Qf as toggleMinimized,
  Kc as useColumns,
  mo as useEntityCounts,
  uu as useEntityPreviews,
  sp as useLayoutRoute,
  tp as usePaneContext,
  np as usePaneMenu,
  _t as usePresentedRows,
  Zl as useQueryState,
  yo as useRecordNames,
  Jl as useResults,
  ke as useShellContext,
  Rs as useWindowContext,
  ra as withStanding,
  Ya as withoutOwnScope,
  El as withoutTerm
};
