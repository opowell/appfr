import { ref as W, inject as Rt, provide as sa, computed as v, toValue as St, shallowRef as Ft, watch as ke, onScopeDispose as Mn, defineComponent as oe, onMounted as Ss, onBeforeUnmount as Ve, resolveComponent as Es, openBlock as f, createElementBlock as m, normalizeStyle as Ee, Fragment as ne, renderList as ve, toDisplayString as N, createCommentVNode as z, createElementVNode as C, createBlock as te, nextTick as Nt, useId as ra, unref as A, normalizeClass as ft, Teleport as ll, createVNode as pe, getCurrentScope as la, withDirectives as It, withKeys as Je, withModifiers as Fe, vModelText as kn, renderSlot as xe, useSlots as Zt, createTextVNode as je, withCtx as et, reactive as ja, resolveDynamicComponent as oa, createSlots as vn, useModel as Wt, mergeModels as bn, Comment as ol, Text as il, vShow as Ga, h as cl } from "vue";
const Ps = Symbol("dc.routeAdapter");
function st(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ul() {
  const e = typeof window < "u", t = W(e ? st(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), a = () => {
    t.value = st(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (r, i) => {
    const o = st(r);
    if (!e) {
      t.value = o;
      return;
    }
    const l = `${window.location.pathname}${o}${window.location.hash}`;
    i === "push" ? window.history.pushState(window.history.state, "", l) : window.history.replaceState(window.history.state, "", l), t.value = o, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    push: (r) => s(r, "push"),
    replace: (r) => s(r, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
const As = ["list", "cards", "grid", "images", "table", "links", "preview"], Uf = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], un = ["ok", "running", "queued", "review", "failed"], Hf = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], jf = [480, 620, 760, 900, 1100], dl = "cards", fl = "table";
function Xt(e, t = {}) {
  const n = (s) => s && Ts(s) ? s : void 0;
  if (e === null) return n(t.view) ?? dl;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? fl;
}
function Xa(e, t, n, a = {}) {
  return e === Xt(t, a) ? Xt(n, a) : e;
}
const Un = "updated";
function Ts(e) {
  return typeof e == "string" && As.includes(e);
}
const pl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function ia(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Et(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function zs(e, t = {}) {
  const n = Et(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function Ls(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Rs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of Ls(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const vl = { key: Un, label: Un };
function ct(e, t, n = null) {
  const a = Rs(e, n);
  return (t ? a.find((r) => r.key === t) : void 0) ?? a.find((r) => r.key === Un) ?? a[0] ?? vl;
}
function ca(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Ot(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = ca(n);
  return t;
}
function Fs(e) {
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
function Ns(e) {
  return Object.values(e).some(Fs);
}
function ua(e) {
  return e.entity === null && e.expr.trim() === "" && !Ns(e.facets);
}
function Gf(e) {
  return e.entity !== null;
}
function da(e) {
  return e.entity === null && e.view === "cards";
}
function hl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function fa(e, t = {}) {
  const a = t.landing === "entity" ? zs(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Xt(a?.key ?? null, t),
    sort: ct(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Ot(a),
    page: 1
  };
}
const Is = ["entity", "sort", "dir", "expr", "facets"];
function Ya(e) {
  return Is.some((t) => t in e);
}
function Os(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : ca(a);
  }
  return n;
}
function hn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function ml(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function xt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function gl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function _l(e) {
  return String(e + 1).padStart(2, "0");
}
const Hn = "—";
function He(e, t) {
  return e.find((n) => n.role === t);
}
function Ds(e, t) {
  return e.filter((n) => n.role === t);
}
function yl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const wl = ["id", "entityKey", "entityLabel"];
function qe(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (wl.includes(n))
      return t[n];
  }
}
function Qa(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function kl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function bl(e, t) {
  if (e == null || e === "") return Hn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? ml(n) : String(e);
  }
  return t === "date" ? gl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Hn : String(e);
}
function Jt(e, t) {
  const n = qe(e, t);
  return e.format ? e.format(n, t) : bl(n, e.kind);
}
function $l(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Bs(e, t) {
  const n = Jt(e, t), a = $l(qe(e, t));
  return a && a !== n ? a : n;
}
function mn(e, t) {
  return e ? Jt(e, t) : "";
}
function Za(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const xl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Ja(e) {
  return [xl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function jn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Cl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Ml(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    if (a) {
      i === a ? a = null : n += i;
      continue;
    }
    if (i === '"' || i === "'") {
      a = i;
      continue;
    }
    if (/\s/.test(i)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(r + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += i;
  }
  return s(), t;
}
function Ne(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Ml(t)) {
    const r = s.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const i = s.length > 1 && s.startsWith("-"), o = i ? s.slice(1) : s, l = i ? { negated: !0 } : {}, c = Cl.exec(o);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...l
    }) : a.push({ kind: "text", value: o, ...l });
  }
  return a.length && n.push(a), n;
}
const Pt = (e) => e.toLowerCase().replace(/\s+/g, ""), qs = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Sl(e, t, n) {
  const a = Pt(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && Pt(c.label) === a
  );
  if (r) return qe(r, t);
  const i = n.facets.find((c) => Pt(c.label) === a);
  if (i && i.key in t.fields) return t.fields[i.key];
  const o = qs.find(([c]) => c === a)?.[1];
  if (o) {
    const c = He(s, o);
    if (c) return qe(c, t);
  }
  const l = /^metric(\d+)$/.exec(a);
  if (l) {
    const c = Ds(s, "metric")[Number(l[1]) - 1];
    if (c) return qe(c, t);
  }
}
function Vs(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const es = /^[a-z_][\w.-]*$/;
function Ks(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return es.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : Pt(e.label);
  return n !== void 0 && es.test(n) ? n : void 0;
}
function El(e, t) {
  const n = Pt(e);
  if (n === "entity" || qs.some(([s]) => s === n) || /^metric\d+$/.test(n)) return !0;
  const a = (s) => s !== void 0 && Pt(s) === n;
  return (t.columns ?? []).some(
    (s) => a(s.key) || a(s.field) || a(s.label)
  ) || t.facets.some((s) => a(s.key) || a(s.label));
}
function Ws(e, t) {
  if (!t) return e;
  let n = !1;
  const a = Ne(e).map(
    (s) => s.map((r) => {
      if (r.kind !== "field") return r;
      const i = Us(r.field, t), o = i && Ks(i);
      return o ? (n = !0, { ...r, field: o }) : r;
    })
  );
  return n ? ut(a) : e;
}
function Us(e, t) {
  if (!(!e || El(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && Vs(n.label) === e
    );
}
function Pl(e, t) {
  if (!t || e.label === void 0 || !Ks(e)) return;
  const n = Vs(e.label);
  return Us(n, t) === e ? n : void 0;
}
function Nn(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function ts(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Al(e, t, n) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const l = He(i, o), c = l ? qe(l, t) : void 0;
      return typeof c == "string" && Nn(c, e.value);
    });
  }
  const a = Sl(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (o) => e.comparator === "=" ? ts(String(o), e.value) : Nn(String(o), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof a == "boolean") {
      const i = e.value.toLowerCase();
      return i === "true" || i === "yes" ? a : i === "false" || i === "no" ? !a : null;
    }
    if (typeof a == "number") {
      const i = Number(e.value);
      return Number.isFinite(i) ? a === i : null;
    }
    return e.comparator === "=" ? ts(String(a), e.value) : Nn(String(a), e.value);
  }
  const s = Number(e.value), r = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(r) ? null : Tl(e.comparator, r, s);
}
function ns(e, t, n) {
  const a = Al(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function Tl(e, t, n) {
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
function as(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
function zl(e, t, n) {
  return e.length ? e.some((a) => {
    const s = /* @__PURE__ */ new Map();
    for (const r of a)
      as(r) && s.set(r.field, (s.get(r.field) ?? !1) || ns(r, t, n));
    return a.every(
      (r) => as(r) ? s.get(r.field) === !0 : ns(r, t, n)
    );
  }) : !0;
}
function ss(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function en(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + ss(e.value) : `${t}${e.field}${e.comparator}${ss(e.value)}`;
}
function Xf(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ut(e) {
  return e.filter((t) => t.length).map((t) => t.map(en).join(" ")).join(" OR ");
}
function Ll(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((r, i) => i !== n) : a).filter((a) => a.length);
}
function Rl(e) {
  const t = Ne(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(en).join(" ")
  };
}
function rs(e, t) {
  return [...e.map(en), t.trim()].filter(Boolean).join(" ");
}
const ls = (e, t) => e.toLowerCase() === t.toLowerCase();
function Sn(e, t) {
  return !!e.negated == !!t.negated && Hs(e, t);
}
function Yt(e, t) {
  return !!e.negated != !!t.negated && Hs(e, t);
}
function Hs(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && ls(e.value, t.value) : t.kind === "text" && ls(e.value, t.value);
}
function Fl(e, t) {
  return t.filter((n) => !e.some((a) => Sn(a, n)));
}
function pa(e, t) {
  return js(e, t, (n) => n);
}
function Nl(e, t) {
  return js(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((r) => Yt(s, r)))
  );
}
function js(e, t, n) {
  const a = Ne(e), s = Ne(t);
  return a.length ? s.length ? ut(
    a.flatMap(
      (r) => s.map((i) => [...n(r, i), ...Fl(r, i)])
    )
  ) : ut(a) : ut(s);
}
const os = [
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
const Il = 7, Ol = 3;
function Dl(e, t, n, a) {
  const s = (t * Il + hn(n)) % a, r = [];
  for (let i = 0; i < Math.min(Ol, a); i++)
    r.push(Gs(e, (s + i) % a));
  return r;
}
function Bl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? ql(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function ql(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) s.add((a + r) % e.length);
  return [...s].sort((r, i) => r - i).map((r) => e[r]);
}
function Vl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: r } = t, i = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${i}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return un[n % un.length];
    case "updated":
      return r;
    case "tint":
      return os[n % os.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return un[n % un.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Kl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, i = t.scopes ?? [];
  if (!r.length) return [];
  const o = [];
  for (let l = 0; l < n; l++) {
    const c = r[l % r.length], d = Math.floor(l / r.length), h = hn(`${a}:${e.key}:${c[0]}:${l}`), y = Gs(e.key, l), w = new Date(s.getTime() - h % 900 * 36e5).toISOString(), k = {};
    for (const $ of e.columns ?? []) {
      const _ = $.field ?? $.key;
      if (!_ || $.value) continue;
      const x = Vl($, {
        hash: hn(`${h}:${_}`),
        sample: c,
        revision: d,
        updatedAt: w
      });
      x !== void 0 && (k[_] = x);
    }
    for (const $ of e.facets)
      k[$.key] = Bl($, hn(`${h}:${$.key}`));
    for (const [$, _] of i)
      k[$] = _ === e.key ? y : Dl(_, l, $, n);
    o.push({ id: y, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return o;
}
function Wl(e, t) {
  for (const [n, a] of Object.entries(t)) {
    const s = e.fields[n];
    switch (a.kind) {
      case "chips": {
        if (!a.selected.length) break;
        if (Array.isArray(s)) {
          if (!s.some((r) => a.selected.includes(String(r)))) return !1;
          break;
        }
        if (typeof s != "string" || !a.selected.includes(s)) return !1;
        break;
      }
      case "range": {
        if (a.min === null && a.max === null) break;
        const r = typeof s == "number" ? s : Number(s);
        if (!Number.isFinite(r) || a.min !== null && r < a.min || a.max !== null && r > a.max) return !1;
        break;
      }
      case "toggle": {
        if (!a.on) break;
        if (s !== !0) return !1;
        break;
      }
    }
  }
  return !0;
}
function Ul(e, t) {
  const n = e.find((i) => i.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", r = a === "date" || n.role === "updated";
  return (i, o) => {
    const l = qe(n, i), c = qe(n, o);
    return s ? Number(c ?? 0) - Number(l ?? 0) : r ? Date.parse(String(c ?? "")) - Date.parse(String(l ?? "")) : String(c ?? "").localeCompare(String(l ?? ""));
  };
}
function Hl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const r = t.get(a.key);
    if (r) return r;
    const i = e.scopes ?? s.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), o = Kl(a, { ...e, scopes: i });
    return t.set(a.key, o), o;
  };
  return {
    query({ query: a, schema: s, entity: r, limit: i, offset: o }) {
      const l = Ne(a.expr), c = r ? [r] : s.entities, d = [], h = [];
      for (const k of c)
        for (const $ of n(k, s))
          d.push($), (r ? Wl($, a.facets) : !0) && zl(l, $, k) && h.push($);
      const y = ct(r, a.sort, s), w = h.sort(Ul(Ls(r, s), y.key));
      return a.dir === "asc" && w.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: w.slice(o, o + i),
        total: h.length,
        unfiltered: h.length === d.length
      };
    }
  };
}
function va(e, t) {
  return Xs(e, t.id);
}
function Xs(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function ha(e, t) {
  return va(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ma(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Ne(t).flat();
  if (!a) return n;
  const s = Ne(n);
  return s.some((o) => o.some((l) => Sn(l, a))) ? n : s.some((o) => o.some((l) => Yt(l, a))) ? ut(
    s.map(
      (o) => o.map((l) => Yt(l, a) ? a : l)
    )
  ) : `${n} ${t}`;
}
function Ys(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Qs(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Ne(t).flat();
  if (!n) return null;
  const a = Ne(e).flat();
  return a.some((s) => Sn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Yt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Zs(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Ne(t).flat();
  if (!n) return e;
  const a = Ne(e), s = a.map(
    (r) => r.filter((i) => !Sn(i, n) && !Yt(i, n))
  );
  return s.every((r, i) => r.length === a[i]?.length) ? e : ut(s);
}
function is(e, t, n) {
  return t ? n === null ? Zs(e, t) : ma(e, n === "out" ? Ys(t) : t) : e;
}
function Ke(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey ? { exclude: !0 } : {};
}
function jl(e, t, n, a = {}) {
  const s = ha(e, n);
  return ma(t.expr, a.exclude ? Ys(s) : s);
}
function Js(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Ne(t), s = a.map(
    (r) => r.filter((i) => i.kind !== "field" || i.field !== n)
  );
  return s.every((r, i) => r.length === a[i]?.length) ? t : ut(s);
}
function er(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const tr = Symbol("dc.shellContext");
function Gl(e) {
  return sa(tr, e), e;
}
function be() {
  const e = Rt(tr, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const ga = "e", _a = "v", ya = "s", wa = "d", ka = "q", ba = "p", $a = "f_", nr = "*", Xl = [
  ga,
  _a,
  ya,
  wa,
  ka,
  ba
], Gn = "..", ar = ",", Yl = [
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
function In(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Yl) t = t.replace(n, a);
  return t;
}
function at(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function sr(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), r = s === -1 ? a : a.slice(0, s), i = s === -1 ? "" : a.slice(s + 1);
    n.push([at(r), i]);
  }
  return n;
}
function Ql(e) {
  return Xl.includes(e) || e.startsWith($a);
}
function cs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Zl(e, t) {
  const n = at(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(ar).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => a.has(r)) };
    }
    case "range": {
      const a = n.indexOf(Gn), s = (a === -1 ? n : n.slice(0, a)).trim(), r = (a === -1 ? "" : n.slice(a + Gn.length)).trim(), i = s === "" ? null : Number(s), o = r === "" ? null : Number(r);
      let l = i !== null && Number.isFinite(i) ? cs(i, e.min, e.max) : null, c = o !== null && Number.isFinite(o) ? cs(o, e.min, e.max) : null;
      return l !== null && c !== null && l > c && ([l, c] = [c, l]), { kind: "range", min: l, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Jl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(ar) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Gn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function eo(e, t, n = {}) {
  const a = fa(t, n), s = new Map(sr(e)), r = s.get(ga), i = r === void 0 ? a.entity : at(r), o = i === nr ? null : Et(t, i), l = s.get(_a), c = l && Ts(at(l)) ? at(l) : Xt(o?.key ?? null, n), d = s.get(ya), h = ct(o, d ? at(d) : n.sort, t), y = s.get(wa), w = y ? at(y) === "asc" ? "asc" : "desc" : a.dir, k = s.get(ka), $ = s.get(ba), _ = $ === void 0 ? 1 : Number(at($)), x = Number.isFinite(_) ? Math.max(1, Math.floor(_)) : 1, L = {};
  for (const D of o?.facets ?? []) {
    const M = s.get(`${$a}${D.key}`);
    L[D.key] = M === void 0 ? ca(D) : Zl(D, M);
  }
  return {
    entity: o?.key ?? null,
    view: c,
    sort: h.key,
    dir: w,
    expr: k === void 0 ? "" : at(k),
    facets: Os(o, L),
    page: x
  };
}
function us(e, t, n = {}, a = "") {
  const s = fa(t, n), r = Et(t, e.entity), i = sr(a).filter(([h]) => !Ql(h)), o = [], l = (h, y) => o.push([h, In(y)]), c = r?.key ?? null;
  c !== s.entity && l(ga, c ?? nr), e.view !== Xt(c, n) && l(_a, e.view), e.sort !== s.sort && l(ya, e.sort), e.dir !== s.dir && l(wa, e.dir), e.expr.trim() !== "" && l(ka, e.expr);
  for (const h of r?.facets ?? []) {
    const y = e.facets[h.key];
    if (!y) continue;
    const w = Jl(y, h);
    w !== null && o.push([`${$a}${h.key}`, In(w)]);
  }
  e.page > 1 && l(ba, String(e.page));
  const d = [
    ...i.map(([h, y]) => [In(h), y]),
    ...o
  ];
  return d.length ? `?${d.map(([h, y]) => y === "" ? h : `${h}=${y}`).join("&")}` : "";
}
const $n = "entity", Qt = "expr";
function to(e, t) {
  const n = e.label.toLowerCase();
  switch (t.kind) {
    case "chips":
      return t.selected.map((a) => ({
        id: `${e.key}:${a}`,
        label: `${n}:${a}`,
        facetKey: e.key,
        option: a
      }));
    case "range": {
      if (t.min === null && t.max === null) return [];
      const a = t.min !== null && t.max !== null ? `${t.min} ≤ ${n} ≤ ${t.max}` : t.max !== null ? `${n} ≤ ${t.max}` : `${n} ≥ ${t.min}`;
      return [{ id: e.key, label: a, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function xa(e, t) {
  const n = [];
  t && n.push({
    id: $n,
    label: `entity:${t.key}`,
    facetKey: $n
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && Fs(s) && n.push(...to(a, s));
  }
  return Ne(e.expr).forEach((a, s) => {
    a.forEach((r, i) => {
      n.push({
        id: `${Qt}:${s}:${i}`,
        label: en(r),
        facetKey: Qt,
        group: s,
        index: i,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function no(e, t, n = null) {
  if (ua(e)) {
    const r = ct(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const a = xa(e, t).filter((r) => r.facetKey !== Qt).map((r) => r.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function ao(e) {
  const { adapter: t } = e, n = v(() => St(e.schema)), a = v(() => St(e.defaults) ?? {}), s = v(() => eo(t.search.value, n.value, a.value)), r = v(() => Et(n.value, s.value.entity)), i = v(() => r.value ?? zs(n.value, a.value)), o = v(() => Rs(r.value, n.value)), l = v(() => ct(r.value, s.value.sort, n.value)), c = (_, x) => {
    const L = us(_, n.value, a.value, t.search.value);
    L !== t.search.value && (x === "push" ? t.push(L) : t.replace(L));
  }, d = () => St(e.navigationMode) ?? "push", h = () => St(e.facetNavigationMode) ?? "replace", y = (_, x) => {
    const L = _.page ?? (Ya(_) ? 1 : s.value.page);
    c({ ...s.value, ..._, page: L }, x);
  }, w = (_, x) => {
    const L = s.value.facets[_];
    if (!L) return;
    const D = { ...s.value.facets, [_]: x(L) };
    y({ facets: D }, h());
  }, k = (_) => {
    const x = _ === null ? null : Et(n.value, _);
    return (x?.key ?? null) === s.value.entity ? {} : {
      entity: x?.key ?? null,
      view: Xa(s.value.view, s.value.entity, x?.key ?? null, a.value),
      sort: ct(x, s.value.sort, n.value).key,
      facets: Ot(x)
    };
  }, $ = (_) => {
    const x = k(_);
    Object.keys(x).length && y(x, d());
  };
  return {
    query: s,
    entity: r,
    focus: i,
    sort: l,
    sorts: o,
    summary: v(() => no(s.value, r.value, n.value)),
    terms: v(() => xa(s.value, r.value)),
    isPristine: v(() => ua(s.value)),
    isEverything: v(() => s.value.entity === null),
    hasFacets: v(() => Ns(s.value.facets)),
    setEntity: $,
    clearEntity: () => $(null),
    setView(_) {
      y({ view: _ }, d());
    },
    setSort(_) {
      y({ sort: ct(r.value, _, n.value).key }, d());
    },
    toggleDirection() {
      y({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(_) {
      y({ expr: _ }, d());
    },
    narrow(_, x, L) {
      y({ expr: _, ...k(x), ...L ? { view: L } : {} }, d());
    },
    setPage(_, x) {
      y({ page: Math.max(1, Math.floor(_)) }, x ?? d());
    },
    setFacet(_, x) {
      w(_, () => x);
    },
    toggleChip(_, x) {
      w(_, (L) => L.kind !== "chips" ? L : { kind: "chips", selected: L.selected.includes(x) ? L.selected.filter((M) => M !== x) : [...L.selected, x] });
    },
    setRange(_, x, L) {
      w(_, (D) => D.kind === "range" ? { kind: "range", min: x, max: L } : D);
    },
    toggleFlag(_) {
      w(
        _,
        (x) => x.kind === "toggle" ? { kind: "toggle", on: !x.on } : x
      );
    },
    removeTerm(_) {
      if (_.facetKey === $n) {
        $(null);
        return;
      }
      if (_.facetKey === Qt) {
        const x = Ll(Ne(s.value.expr), _.group ?? 0, _.index ?? 0);
        y({ expr: ut(x) }, d());
        return;
      }
      w(_.facetKey, (x) => x.kind === "chips" && _.option ? { kind: "chips", selected: x.selected.filter((L) => L !== _.option) } : x.kind === "range" ? { kind: "range", min: null, max: null } : x.kind === "toggle" ? { kind: "toggle", on: !1 } : x);
    },
    clearFilters() {
      y({ ...k(null), expr: "", facets: Ot(null) }, d());
    },
    reset() {
      c(fa(n.value, a.value), d());
    },
    hrefFor(_) {
      const x = { ...s.value, ..._ };
      return "entity" in _ && !("view" in _) && (x.view = Xa(s.value.view, s.value.entity, x.entity, a.value)), x.page = _.page ?? (Ya(_) ? 1 : s.value.page), x.facets = Os(Et(n.value, x.entity), x.facets), `${t.path.value}${us(x, n.value, a.value, t.search.value)}`;
    }
  };
}
function so(e) {
  const t = Ft([]), n = W(0), a = W(!1), s = W(!1), r = Ft(null);
  let i = 0, o = null, l = null;
  const c = v(() => (e.query.value.page - 1) * e.limit.value), d = v(() => hl(n.value, e.limit.value)), h = () => {
    const M = e.query.value, E = e.within?.value.trim(), V = Js(e.entity.value, M.expr);
    return E ? { ...M, expr: pa(E, V) } : V === M.expr ? M : { ...M, expr: V };
  }, y = (M, E) => {
    t.value = M.rows, n.value = M.total, r.value = null, w(E);
  }, w = (M) => {
    o = { key: M, total: n.value }, s.value = !1;
  }, k = (M) => {
    r.value = M, t.value = [], n.value = 0, o = null, s.value = !1;
  }, $ = (M, E, V, P) => {
    let b = !0;
    const K = () => M === i;
    let R = 0, Z = !1;
    const X = (ue) => {
      R = ue, Z = !0, P === void 0 && (n.value = ue);
    }, ye = () => {
      b && (b = !1, t.value = [], X(0)), r.value = null;
    };
    return {
      get open() {
        return K();
      },
      insert(ue, S) {
        if (!K()) return;
        const I = Array.isArray(ue) ? ue : [ue];
        if (!I.length) return;
        ye();
        const j = [...t.value];
        j.splice(S ?? j.length, 0, ...I), t.value = E > 0 ? j.slice(0, E) : j, X(R + I.length);
      },
      set(ue) {
        K() && (ue.rows && (ye(), t.value = E > 0 ? ue.rows.slice(0, E) : ue.rows, X(ue.rows.length)), ue.total !== void 0 && X(ue.total));
      },
      close() {
        K() && (a.value = !1, Z && (n.value = R), w(V));
      },
      fail(ue) {
        K() && (k(ue), a.value = !1);
      }
    };
  }, _ = () => {
    const M = l;
    l = null, M?.();
  }, x = () => {
    const M = ++i;
    _();
    const E = L.value, V = o?.key === E ? o.total : void 0;
    s.value = V === void 0;
    const P = {
      query: h(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, b = e.source.value;
    if (b.stream) {
      a.value = !0;
      try {
        l = b.stream(P, $(M, P.limit, E, V)) ?? null;
      } catch (R) {
        k(R), a.value = !1;
      }
      return;
    }
    let K;
    try {
      K = b.query(P);
    } catch (R) {
      k(R);
      return;
    }
    if (!(K instanceof Promise)) {
      y(K, E), a.value = !1;
      return;
    }
    a.value = !0, K.then((R) => {
      M === i && y(R, E);
    }).catch((R) => {
      M === i && k(R);
    }).finally(() => {
      M === i && (a.value = !1);
    });
  }, L = v(() => {
    const M = h();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Is.map((V) => M[V]))}`;
  }), D = v(() => `${L.value}|${e.query.value.page}`);
  return ke([e.source, D, e.limit], x, {
    immediate: !0
  }), Mn(() => {
    i++, _();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: r, refresh: x };
}
const Ut = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, ro = ["aria-label"], lo = ["role", "aria-label"], oo = ["data-dc-item"], io = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, co = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], uo = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, fo = { class: "dc-menu__label dc-truncate" }, po = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, vo = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, ho = /* @__PURE__ */ oe({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = W(null), i = W([]), o = W(null), l = W(null), c = W(null), d = W(!1), h = v(
      () => a.items.flatMap((P, b) => Ut(P) ? [b] : [])
    ), y = v(() => {
      const P = [{ entries: [] }];
      return a.items.forEach((b, K) => {
        b.heading ? P.push({ heading: b, entries: [] }) : P[P.length - 1]?.entries.push({ item: b, index: K });
      }), P.filter((b) => b.entries.length > 0);
    }), w = W({ x: a.at.x, y: a.at.y });
    async function k() {
      w.value = { x: a.at.x, y: a.at.y }, await Nt();
      const P = r.value?.getBoundingClientRect();
      if (!P) return;
      const b = 8;
      let K = a.at.x, R = a.at.y;
      if (K + P.width > window.innerWidth - b) {
        const Z = a.at.mirrorX === void 0 ? null : a.at.mirrorX - P.width;
        K = Z !== null && Z >= b ? Z : window.innerWidth - P.width - b;
      }
      R + P.height > window.innerHeight - b && (R = window.innerHeight - P.height - b), w.value = { x: Math.max(b, K), y: Math.max(b, R) };
    }
    const $ = v(() => ({ left: `${w.value.x}px`, top: `${w.value.y}px` }));
    function _(P) {
      o.value = P, P !== null && Nt(() => i.value[P]?.focus());
    }
    function x(P, b) {
      const K = h.value;
      if (K.length === 0) return null;
      if (P === null) return b === 1 ? K[0] ?? null : K[K.length - 1] ?? null;
      const R = K.indexOf(P);
      return R === -1 ? K[0] ?? null : K[(R + b + K.length) % K.length] ?? null;
    }
    function L(P, b) {
      if (!a.items[P]?.items?.length) return;
      const R = i.value[P]?.getBoundingClientRect(), Z = r.value?.getBoundingClientRect();
      !R || !Z || (c.value = { x: Z.right - 4, y: R.top - 4, mirrorX: Z.left + 4 }, l.value = P, d.value = b);
    }
    function D(P) {
      const b = l.value;
      l.value = null, c.value = null, P && b !== null && _(b);
    }
    function M(P) {
      const b = a.items[P];
      if (!(!b || !Ut(b))) {
        if (b.items?.length) {
          L(P, !0);
          return;
        }
        s("choose", b);
      }
    }
    function E(P) {
      const b = P.key;
      if (b === "Escape") {
        P.preventDefault(), P.stopPropagation(), l.value !== null ? D(!0) : s("dismiss");
        return;
      }
      if (b === "ArrowDown" || b === "ArrowUp") {
        P.preventDefault(), P.stopPropagation(), D(!1), _(x(o.value, b === "ArrowDown" ? 1 : -1));
        return;
      }
      if (b === "Home" || b === "End") {
        P.preventDefault(), P.stopPropagation(), D(!1), _(x(null, b === "Home" ? 1 : -1));
        return;
      }
      if (b === "ArrowRight") {
        const K = o.value;
        K !== null && a.items[K]?.items?.length && (P.preventDefault(), P.stopPropagation(), L(K, !0));
        return;
      }
      if (b === "ArrowLeft") {
        l.value !== null && (P.preventDefault(), P.stopPropagation(), D(!0));
        return;
      }
      if (b === "Enter" || b === " ") {
        const K = o.value;
        if (K === null) return;
        P.preventDefault(), P.stopPropagation(), M(K);
      }
    }
    function V(P) {
      const b = a.items[P];
      !b || !Ut(b) || (l.value !== null && l.value !== P && D(!1), _(P), b.items?.length && L(P, !1));
    }
    return Ss(() => {
      k(), a.autofocus && _(x(null, 1));
    }), ke(() => a.at, k, { deep: !0 }), ke(() => a.items, () => void k(), { deep: !0 }), Ve(() => {
      l.value = null;
    }), t({ root: r }), (P, b) => {
      const K = Es("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Ee($.value),
        onKeydown: E
      }, [
        (f(!0), m(ne, null, ve(y.value, (R, Z) => (f(), m("div", {
          key: `${Z}-${R.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: R.heading ? "group" : "none",
          "aria-label": R.heading?.label
        }, [
          R.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": R.heading.id
          }, N(R.heading.label), 9, oo)) : z("", !0),
          (f(!0), m(ne, null, ve(R.entries, ({ item: X, index: ye }) => (f(), m(ne, {
            key: X.id ?? `${ye}-${X.label ?? ""}`
          }, [
            X.separator ? (f(), m("div", io)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (ue) => {
                ue && (i.value[ye] = ue);
              },
              type: "button",
              class: "dc-menu__item",
              role: X.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": X.checked === void 0 ? void 0 : X.checked,
              "aria-haspopup": X.items?.length ? "menu" : void 0,
              "aria-expanded": X.items?.length ? l.value === ye : void 0,
              "aria-disabled": X.disabled ? "true" : void 0,
              disabled: X.disabled,
              "data-dc-item": X.id,
              tabindex: "-1",
              onClick: (ue) => M(ye),
              onMouseenter: (ue) => V(ye)
            }, [
              C("span", uo, N(X.checked ? "✓" : ""), 1),
              C("span", fo, N(X.label), 1),
              X.shortcut ? (f(), m("span", po, N(X.shortcut), 1)) : X.items?.length ? (f(), m("span", vo, "›")) : z("", !0)
            ], 40, co))
          ], 64))), 128))
        ], 8, lo))), 128)),
        l.value !== null && c.value ? (f(), te(K, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: c.value,
          label: e.items[l.value]?.label,
          autofocus: d.value,
          onChoose: b[0] || (b[0] = (R) => s("choose", R)),
          onDismiss: b[1] || (b[1] = (R) => D(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
      ], 44, ro);
    };
  }
}), ce = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Ca = /* @__PURE__ */ ce(ho, [["__scopeId", "data-v-9b1413fa"]]), mo = { class: "dc-pick" }, go = ["id"], _o = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], yo = { class: "dc-pick__label" }, wo = /* @__PURE__ */ oe({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ra() ?? "dc-pick", r = W(null), i = W(null), o = W(null), l = W(!1), c = v(() => o.value !== null), d = W(null), h = v(
      () => n.options.find((M) => M.key === n.modelValue) ?? n.options[0]
    ), y = v(
      () => n.options.map((M) => ({
        id: M.key,
        label: M.label,
        checked: M.key === n.modelValue
      }))
    ), w = v(
      () => o.value ? { maxHeight: `${window.innerHeight - o.value.y - 8}px` } : void 0
    );
    function k(M) {
      const E = r.value?.getBoundingClientRect();
      E && (d.value = r.value?.closest(".dc-shell") ?? document.body, o.value = { x: E.left, y: E.bottom + 4, mirrorX: E.right }, l.value = M, a("open"));
    }
    function $(M) {
      o.value && a("close"), o.value = null, M && r.value?.focus();
    }
    function _() {
      c.value ? $(!0) : k(!1);
    }
    function x(M) {
      M.key !== "ArrowDown" && M.key !== "ArrowUp" || c.value || (M.preventDefault(), k(!0));
    }
    function L(M) {
      const E = M.target;
      E && (r.value?.contains(E) || i.value?.root?.contains(E) || $(!1));
    }
    ke(c, (M) => {
      M ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), Ve(() => window.removeEventListener("pointerdown", L, !0));
    function D(M) {
      $(!0), !(M.id === void 0 || M.id === n.modelValue) && a("update:modelValue", M.id);
    }
    return (M, E) => (f(), m("span", mo, [
      C("span", {
        id: `${A(s)}-name`,
        class: "dc-pick__name"
      }, N(e.label), 9, go),
      C("button", {
        id: `${A(s)}-value`,
        ref_key: "trigger",
        ref: r,
        type: "button",
        class: ft(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${A(s)}-name ${A(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: _,
        onKeydown: x
      }, [
        C("span", yo, N(h.value?.label), 1)
      ], 42, _o),
      E[1] || (E[1] = C("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      o.value && d.value ? (f(), te(ll, {
        key: 0,
        to: d.value
      }, [
        pe(Ca, {
          ref_key: "menu",
          ref: i,
          class: "dc-pick__list",
          style: Ee(w.value),
          items: y.value,
          at: o.value,
          label: e.label,
          autofocus: l.value,
          onChoose: D,
          onDismiss: E[0] || (E[0] = (V) => $(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : z("", !0)
    ]));
  }
}), ds = /* @__PURE__ */ ce(wo, [["__scopeId", "data-v-d21ebf1b"]]);
function ko(e) {
  const t = Ft(/* @__PURE__ */ new Map()), n = W(!0);
  let a = 0, s;
  const r = () => {
    a++, s?.abort(), s = void 0;
  }, i = () => {
    r();
    const o = a, { signal: l } = s = new AbortController(), c = e.query.value, d = e.schema.value, h = e.entities.value, y = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !y;
    const w = /* @__PURE__ */ new Map();
    let k = !0;
    for (const $ of h) {
      const _ = Js($, c.expr), x = y ? pa(y, _) : _;
      let L = !1;
      const D = (E) => {
        if (o !== a) return;
        if (k) {
          w.set($.key, E);
          return;
        }
        const V = new Map(t.value);
        V.set($.key, E), t.value = V;
      }, M = e.source.value.query({
        query: { ...c, entity: $.key, expr: x, facets: Ot($), page: 1 },
        schema: d,
        entity: $,
        limit: 0,
        offset: 0,
        signal: l,
        progress: (E) => {
          L || D({ total: E, pending: !0, counted: !0 });
        }
      });
      M instanceof Promise ? (w.has($.key) || w.set($.key, { total: 0, pending: !0, counted: !1 }), M.then((E) => {
        L = !0, D({ total: E.total, pending: !1, counted: !0 });
      })) : (L = !0, w.set($.key, { total: M.total, pending: !1, counted: !0 }));
    }
    k = !1, t.value = w;
  };
  return la() && Mn(r), { counts: t, pristine: n, refresh: i, cancel: r };
}
const bo = 25, rr = (e, t) => e.toLowerCase() === t.toLowerCase();
function $o(e, t) {
  return e.find((n) => rr(n.id, t));
}
function xo(e) {
  const t = Ft(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (o) => {
    if (o.facetKey !== Qt || !o.field || !o.value) return null;
    const l = er(e.schema.value, o.field);
    return l ? { entity: l, id: o.value, key: `${l.key}:${o.value}` } : null;
  }, s = (o) => {
    const { entity: l, id: c } = o, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: l.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Xs(l, c) ?? "",
        facets: Ot(l),
        sort: ct(l, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: l,
      limit: bo,
      offset: 0
    });
  }, r = (o, l) => {
    const c = mn(He(o.columns ?? [], "identity"), l);
    return c === Hn || rr(c, l.id) ? "" : c;
  }, i = () => {
    const o = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const h = a(d);
      h && !t.value.has(h.key) && !n.has(h.key) && o.set(h.key, h);
    }
    if (!o.size) return;
    const l = [...o.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const h = new Map(t.value);
      d.forEach((y, w) => {
        const { reference: k } = l[w], $ = $o(y.rows, k.id);
        h.set(k.key, $ ? r(k.entity, $) : "");
      }), t.value = h;
    };
    if (l.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(l.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of l) n.add(d.key);
    Promise.all(l.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of l) n.delete(d.key);
    });
  };
  return ke([e.source, e.schema, e.terms], () => {
    try {
      i();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(o) {
      const l = a(o);
      return l && t.value.get(l.key) || null;
    }
  };
}
const Co = ["data-dc-expanded"], Mo = { class: "dc-header__domain" }, So = {
  key: 0,
  class: "dc-header__within"
}, Eo = ["title"], Po = ["data-dc-more", "title"], Ao = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, To = ["title", "aria-label", "onClick"], zo = ["onKeydown"], Lo = ["aria-expanded", "aria-controls"], Ro = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Fo = { class: "dc-header__sr" }, No = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Io = ["disabled"], Oo = ["title"], Do = ["value", "onKeydown"], Bo = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, qo = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Vo = ["disabled"], Ko = {
  key: 1,
  class: "dc-header__actions"
}, Wo = "…", Uo = /* @__PURE__ */ oe({
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
    const n = e, a = t, s = be(), r = v(() => s.schema.value), i = v(
      () => s.hasFacets.value || !!s.query.value.expr.trim() || !!s.within.value
    ), o = v(() => r.value.formatCount ?? xt), l = ko({
      source: s.source,
      schema: s.schema,
      query: s.query,
      entities: s.entities,
      within: s.within
    });
    function c(B) {
      if (n.hideCount) return B.count;
      if (B.key === s.query.value.entity && i.value) return o.value(s.total.value);
      if (l.pristine.value) return B.count;
      const G = l.counts.value.get(B.key);
      return G ? G.counted ? `${G.pending ? "~" : ""}${o.value(G.total)}` : Wo : B.count;
    }
    function d(B) {
      return `${B.label} · ${c(B)}`;
    }
    const h = v(() => [
      { key: "", label: "Everything" },
      ...s.entities.value.map((B) => ({ key: B.key, label: d(B) }))
    ]), y = v(() => {
      const B = s.within.value.trim();
      return B ? xa({ ...s.query.value, expr: B, facets: {} }, null) : [];
    }), w = v(
      () => (n.views ?? [...As]).map((B) => ({ key: B, label: pl[B] }))
    ), k = v(() => ia(s.query.value.view, n.views)), $ = v(() => s.query.value.entity !== null);
    function _(B) {
      s.setView(B);
    }
    const x = v(() => {
      const B = s.entity.value, J = B?.keepsScope ? void 0 : B?.scope?.toLowerCase();
      return s.terms.value.filter((G) => G.facetKey !== $n).map((G, Oe, O) => {
        const H = O[Oe - 1];
        return {
          term: G,
          or: H?.group !== void 0 && G.group !== void 0 && G.group !== H.group,
          idle: !!J && G.field?.toLowerCase() === J
        };
      });
    }), L = xo({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...y.value, ...s.terms.value])
    });
    function D(B) {
      return er(r.value, B)?.scopeLabel ?? B;
    }
    function M(B) {
      return B.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function E(B) {
      const J = L.nameOf(B);
      return J ? `${B.negated ? "-" : ""}${D(B.field)}: ${M(J)}` : B.label;
    }
    function V(B) {
      s.setEntity(B || null);
    }
    const P = W(""), b = W(null);
    function K() {
      const B = P.value.trim();
      B && (s.setExpression(
        Nl(s.query.value.expr, Ws(B, s.entity.value))
      ), P.value = "");
    }
    function R() {
      P.value = "", b.value?.blur();
    }
    function Z(B) {
      if (P.value) return;
      const J = x.value.at(-1);
      J && (B.preventDefault(), s.removeTerm(J.term));
    }
    function X(B) {
      B.target?.closest("button, select, label, input") || a("toggle");
    }
    const ye = W(null), ue = W("");
    function S() {
      const B = ye.value;
      if (!B) {
        ue.value = "";
        return;
      }
      const J = B.scrollLeft > 1, G = B.scrollWidth - B.clientWidth - B.scrollLeft > 1;
      ue.value = J && G ? "both" : J ? "start" : G ? "end" : "";
    }
    let I = null;
    ke(
      ye,
      (B) => {
        I?.disconnect(), I = null, S(), !(!B || typeof ResizeObserver > "u") && (I = new ResizeObserver(S), I.observe(B));
      },
      { flush: "post" }
    ), ke(x, S, { flush: "post" }), Ve(() => I?.disconnect());
    const j = v(() => s.query.value.page), le = v(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !da(s.query.value)
    ), ge = v(
      () => `${s.counting.value ? "~" : ""}${xt(s.pageCount.value)}`
    ), Pe = v(() => {
      let B = `Page ${xt(j.value)} of ${ge.value}`;
      const J = s.rows.value.length;
      if (J) {
        const G = s.offset.value + 1, Oe = `${s.counting.value ? "~" : ""}${xt(s.total.value)}`;
        B += ` — rows ${xt(G)} to ${xt(G + J - 1)} of ${Oe}`;
      }
      return n.pagesNote ? `${B}
${n.pagesNote}` : B;
    }), Te = W(null), Xe = v(() => Te.value ?? String(j.value)), Ye = v(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function Qe(B) {
      B.target.select();
    }
    function We(B) {
      const J = B.target, G = J.value.replace(/[^0-9]/g, "");
      J.value !== G && (J.value = G), Te.value = G;
    }
    function Ie(B) {
      const J = B.target, G = Number(Te.value);
      Te.value = null;
      const Oe = Number.isFinite(G) && G >= 1 ? Math.min(Math.trunc(G), Math.max(1, s.pageCount.value)) : j.value;
      J.value = String(Oe), Oe !== j.value && s.setPage(Oe);
    }
    function Ue(B) {
      const J = B.target;
      Te.value = null, J.value = String(j.value), J.blur();
    }
    return (B, J) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      C("div", {
        class: "dc-header__trigger",
        onClick: X
      }, [
        C("span", Mo, N(r.value.label), 1),
        y.value.length ? (f(), m("span", So, [
          J[4] || (J[4] = C("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(ne, null, ve(y.value, (G) => (f(), m("span", {
            key: `scope:${G.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: E(G)
          }, N(E(G)), 9, Eo))), 128))
        ])) : z("", !0),
        C("div", {
          ref_key: "termBar",
          ref: ye,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ue.value,
          title: A(s).summary.value,
          onScroll: S
        }, [
          $.value ? (f(), te(ds, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": A(s).query.value.entity ?? "",
            options: h.value,
            onOpen: A(l).refresh,
            onClose: A(l).cancel,
            "onUpdate:modelValue": V
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : z("", !0),
          pe(ds, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": k.value,
            options: w.value,
            "onUpdate:modelValue": _
          }, null, 8, ["model-value", "options"]),
          (f(!0), m(ne, null, ve(x.value, (G) => (f(), m(ne, {
            key: G.term.id
          }, [
            G.or ? (f(), m("span", Ao, "or")) : z("", !0),
            C("button", {
              type: "button",
              class: ft(["dc-term dc-mono", { "dc-term--idle": G.idle }]),
              title: G.idle ? `Not applied to ${A(s).entity.value?.label} — remove ${E(G.term)}` : `Remove ${E(G.term)}`,
              "aria-label": `Remove ${E(G.term)}`,
              onClick: (Oe) => A(s).removeTerm(G.term)
            }, N(E(G.term)), 11, To)
          ], 64))), 128)),
          It(C("input", {
            ref_key: "searchBox",
            ref: b,
            "onUpdate:modelValue": J[0] || (J[0] = (G) => P.value = G),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Je(Fe(K, ["prevent"]), ["enter"]),
              Je(Fe(R, ["prevent"]), ["esc"]),
              Je(Z, ["backspace"])
            ]
          }, null, 40, zo), [
            [kn, P.value]
          ])
        ], 40, Po),
        C("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: J[1] || (J[1] = (G) => a("toggle"))
        }, [
          C("span", Ro, N(e.expanded ? "▲" : "▼"), 1),
          C("span", Fo, N(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Lo)
      ]),
      le.value ? (f(), m("nav", No, [
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: j.value <= 1,
          onClick: J[2] || (J[2] = (G) => A(s).setPage(j.value - 1))
        }, [...J[5] || (J[5] = [
          C("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Io),
        C("span", {
          class: "dc-header__page dc-mono",
          title: Pe.value
        }, [
          C("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Ee({ width: Ye.value }),
            value: Xe.value,
            onFocus: Qe,
            onInput: We,
            onKeydown: [
              Je(Fe(Ie, ["prevent"]), ["enter"]),
              Je(Fe(Ue, ["prevent"]), ["esc"])
            ],
            onBlur: Ie
          }, null, 44, Do),
          C("span", Bo, "/ " + N(ge.value), 1)
        ], 8, Oo),
        C("span", qo, N(Pe.value), 1),
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: j.value >= A(s).pageCount.value,
          onClick: J[3] || (J[3] = (G) => A(s).setPage(j.value + 1))
        }, [...J[6] || (J[6] = [
          C("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Vo)
      ])) : z("", !0),
      B.$slots.actions ? (f(), m("div", Ko, [
        xe(B.$slots, "actions", {}, void 0, !0)
      ])) : z("", !0)
    ], 8, Co));
  }
}), lr = /* @__PURE__ */ ce(Uo, [["__scopeId", "data-v-682f5b6d"]]), Ho = { class: "dc-facet" }, jo = ["id"], Go = { class: "dc-facet__body" }, Xo = ["aria-labelledby"], Yo = ["aria-pressed", "data-dc-active", "onClick"], Qo = ["aria-labelledby"], Zo = ["aria-label", "placeholder", "onKeydown"], Jo = ["aria-label", "placeholder", "onKeydown"], ei = ["aria-checked"], ti = { class: "dc-switch__text" }, ni = ["data-dc-active"], ai = /* @__PURE__ */ oe({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = v(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function r(h) {
      if (n.value.kind !== "chips") return;
      const y = s.value.has(h) ? n.value.selected.filter((w) => w !== h) : [...n.value.selected, h];
      a("update", { kind: "chips", selected: y });
    }
    const i = W(""), o = W("");
    ke(
      () => n.value,
      (h) => {
        h.kind === "range" && (i.value = h.min === null ? "" : h.min, o.value = h.max === null ? "" : h.max);
      },
      { immediate: !0, deep: !0 }
    );
    function l(h) {
      if (typeof h == "number") return Number.isFinite(h) ? h : null;
      const y = h.trim();
      if (!y) return null;
      const w = Number(y);
      return Number.isFinite(w) ? w : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const h = l(i.value), y = l(o.value);
      h === n.value.min && y === n.value.max || a("update", { kind: "range", min: h, max: y });
    }
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (h, y) => (f(), m("div", Ho, [
      C("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, N(e.facet.label), 9, jo),
      C("div", Go, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), m(ne, null, ve(e.facet.options, (w) => (f(), m("button", {
            key: w,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(w),
            "data-dc-active": s.value.has(w) ? "true" : "false",
            onClick: (k) => r(w)
          }, N(w), 9, Yo))), 128))
        ], 8, Xo)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          It(C("input", {
            "onUpdate:modelValue": y[0] || (y[0] = (w) => i.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: Je(Fe(c, ["prevent"]), ["enter"])
          }, null, 40, Zo), [
            [kn, i.value]
          ]),
          y[2] || (y[2] = C("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          It(C("input", {
            "onUpdate:modelValue": y[1] || (y[1] = (w) => o.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: Je(Fe(c, ["prevent"]), ["enter"])
          }, null, 40, Jo), [
            [kn, o.value]
          ])
        ], 8, Qo)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          C("span", ti, N(e.facet.text), 1),
          C("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...y[3] || (y[3] = [
            C("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, ni)
        ], 8, ei)) : z("", !0)
      ])
    ]));
  }
}), or = /* @__PURE__ */ ce(ai, [["__scopeId", "data-v-36d1334b"]]), si = ["id"], ri = { class: "dc-panel__section dc-panel__rows" }, li = { class: "dc-panel__row" }, oi = ["for"], ii = ["title", "aria-label", "onClick"], ci = ["id", "placeholder", "onKeydown"], ui = { class: "dc-panel__actions" }, di = ["disabled"], fi = {
  key: 0,
  class: "dc-panel__section"
}, pi = /* @__PURE__ */ oe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Zt(), s = be(), r = v(() => Rl(s.query.value.expr)), i = v(() => r.value.parts.map(en)), o = W(r.value.text), l = W(null);
    ke(
      () => r.value.text,
      ($) => {
        o.value = $;
      }
    );
    const c = v(() => o.value !== r.value.text);
    function d() {
      if (c.value) {
        const $ = Ws(o.value, s.entity.value);
        s.setExpression(rs(r.value.parts, $));
      }
      n("close");
    }
    function h($) {
      const { parts: _, text: x } = r.value;
      s.setExpression(rs(_.filter((L, D) => D !== $), x));
    }
    function y($) {
      const { parts: _ } = r.value;
      o.value || !_.length || ($.preventDefault(), h(_.length - 1));
    }
    function w() {
      o.value = "", s.clearFilters();
    }
    function k($, _) {
      s.setFacet($, _);
    }
    return Nt(() => l.value?.focus()), ($, _) => (f(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: _[2] || (_[2] = Je(Fe((x) => n("close"), ["stop"]), ["esc"]))
    }, [
      C("section", ri, [
        C("div", li, [
          C("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, oi),
          C("div", {
            class: "dc-field",
            onMousedown: _[1] || (_[1] = Fe((x) => l.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(ne, null, ve(i.value, (x, L) => (f(), m("button", {
              key: `${L}:${x}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${x}`,
              "aria-label": `Remove ${x}`,
              onClick: (D) => h(L)
            }, N(x), 9, ii))), 128)),
            It(C("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: l,
              "onUpdate:modelValue": _[0] || (_[0] = (x) => o.value = x),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: i.value.length ? "" : A(s).schema.value.placeholder,
              onKeydown: [
                Je(Fe(d, ["prevent"]), ["enter"]),
                Je(y, ["backspace"])
              ]
            }, null, 40, ci), [
              [kn, o.value]
            ])
          ], 32)
        ]),
        A(s).entity.value ? (f(!0), m(ne, { key: 0 }, ve(A(s).entity.value.facets, (x) => (f(), te(or, {
          key: x.key,
          facet: x,
          value: A(s).query.value.facets[x.key],
          onUpdate: (L) => k(x.key, L)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : z("", !0),
        C("div", ui, [
          C("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          C("button", {
            type: "button",
            class: "dc-button",
            disabled: A(s).isPristine.value && !c.value,
            onClick: w
          }, " Reset ", 8, di)
        ])
      ]),
      a["panel-section"] ? (f(), m("section", fi, [
        xe($.$slots, "panel-section", {}, void 0, !0)
      ])) : z("", !0)
    ], 40, si));
  }
}), ir = /* @__PURE__ */ ce(pi, [["__scopeId", "data-v-640ae2f5"]]), vi = ["checked", "indeterminate"], cr = /* @__PURE__ */ oe({
  __name: "PageTick",
  setup(e) {
    const t = be(), n = v(() => t.rows.value.filter((r) => t.isSelected(r)).length), a = v(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = v(() => n.value > 0 && !a.value);
    return (r, i) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: i[0] || (i[0] = (o) => A(t).selectPage(!a.value))
    }, null, 40, vi));
  }
}), hi = {
  key: 0,
  class: "dc-actions"
}, mi = {
  key: 0,
  class: "dc-actions__select"
}, gi = {
  key: 0,
  class: "dc-actions__all"
}, _i = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, yi = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, wi = { class: "dc-actions__ops" }, ki = ["disabled"], bi = ["disabled"], $i = /* @__PURE__ */ oe({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => n.entity.value), s = v(() => !da(n.query.value)), r = v(() => s.value && n.selectable.value), i = v(
      () => ia(n.query.value.view, t.views) === "table"
    ), o = v(
      () => s.value && (r.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), l = v(() => n.selection.value.ids.length), c = v(() => l.value ? `${l.value} selected` : i.value ? "None selected" : "Select all");
    function d(h) {
      return l.value ? `${h} ${l.value}` : h;
    }
    return (h, y) => o.value ? (f(), m("div", hi, [
      r.value ? (f(), m("div", mi, [
        i.value ? (f(), m("span", yi, N(c.value), 1)) : (f(), m("label", gi, [
          pe(cr),
          C("span", _i, N(c.value), 1)
        ])),
        l.value ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[0] || (y[0] = (w) => A(n).clearSelection())
        }, " Clear ")) : z("", !0)
      ])) : z("", !0),
      C("div", wi, [
        a.value?.create ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: y[1] || (y[1] = (w) => A(n).create(a.value))
        }, [
          y[4] || (y[4] = C("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          je(" " + N(a.value.create), 1)
        ])) : z("", !0),
        a.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !l.value,
          onClick: y[2] || (y[2] = (w) => A(n).duplicate())
        }, N(d(a.value.duplicate)), 9, ki)) : z("", !0),
        a.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !l.value,
          onClick: y[3] || (y[3] = (w) => A(n).delete())
        }, N(d(a.value.delete)), 9, bi)) : z("", !0)
      ])
    ])) : z("", !0);
  }
}), ur = /* @__PURE__ */ ce($i, [["__scopeId", "data-v-03ff2a91"]]);
function xi(e, t) {
  if (!e) return null;
  const n = qe(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Ci(e, t) {
  const n = He(t, "state"), a = He(t, "tint");
  return {
    identity: mn(He(t, "identity"), e),
    reference: mn(He(t, "reference"), e),
    metrics: Ds(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Jt(s, e)
    })),
    state: n ? qe(n, e) ?? null : null,
    updated: mn(He(t, "updated"), e),
    image: xi(He(t, "image"), e),
    tint: a ? qe(a, e) ?? null : null
  };
}
function dr(e, t, n, a, s = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: kl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: _l(t),
    parts: Ci(e, r),
    pinned: a,
    selected: s
  };
}
function kt() {
  const e = be(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, a) => dr(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Mi = ["data-dc-status"], Si = /* @__PURE__ */ oe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, N(e.status), 9, Mi));
  }
}), tn = /* @__PURE__ */ ce(Si, [["__scopeId", "data-v-23e59fbf"]]), Ei = ["title"], Pi = { key: 1 }, Ai = /* @__PURE__ */ oe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((l) => l.key === t.column.drill) ?? null), s = v(() => t.column.label ?? ""), r = v(() => Jt(t.column, t.entry.row));
    function i(o) {
      o.stopPropagation(), a.value && n.drill(t.entry.row, a.value, Ke(o));
    }
    return (o, l) => a.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onClick: i
    }, [
      xe(o.$slots, "default", {}, () => [
        je(N(r.value), 1)
      ], !0)
    ], 8, Ei)) : (f(), m("span", Pi, [
      xe(o.$slots, "default", {}, () => [
        je(N(r.value), 1)
      ], !0)
    ]));
  }
}), nn = /* @__PURE__ */ ce(Ai, [["__scopeId", "data-v-f2501b17"]]), Ti = ["data-dc-active", "aria-pressed", "aria-label"], zi = /* @__PURE__ */ oe({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, r) => (f(), m("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, N(e.pinned ? "★" : "☆"), 9, Ti));
  }
}), Ma = /* @__PURE__ */ ce(zi, [["__scopeId", "data-v-ef63d763"]]), Li = ["src"], Ri = /* @__PURE__ */ oe({
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
    ), (a, s) => e.src.trim() && !n.value ? (f(), m("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (r) => n.value = !0)
    }, null, 40, Li)) : z("", !0);
  }
}), En = /* @__PURE__ */ ce(Ri, [["__scopeId", "data-v-afaab300"]]), Fi = ["data-dc-standing", "title", "aria-label"], Ni = /* @__PURE__ */ oe({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => va(t.entry.entity, t.entry.row)), s = v(() => Qs(n.query.value.expr, a.value)), r = v(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function i(o) {
      o.stopPropagation(), n.setExpression(Zs(n.query.value.expr, a.value));
    }
    return (o, l) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: r.value,
      "aria-label": r.value,
      onClick: i
    }, N(s.value === "in" ? "+" : "−"), 9, Fi)) : z("", !0);
  }
}), Pn = /* @__PURE__ */ ce(Ni, [["__scopeId", "data-v-4b8d4166"]]), Ii = ["data-dc-pending", "title", "aria-label"], Oi = /* @__PURE__ */ oe({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = W(null);
    function r(c) {
      s.value = Ke(c).exclude ? "out" : "in";
    }
    function i(c) {
      r(c), window.addEventListener("keydown", r), window.addEventListener("keyup", r);
    }
    function o() {
      s.value = null, window.removeEventListener("keydown", r), window.removeEventListener("keyup", r);
    }
    Ve(o);
    function l(c) {
      c.stopPropagation(), n.drill(t.entry.row, null, Ke(c));
    }
    return (c, d) => a.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: i,
      onPointermove: r,
      onPointerleave: o,
      onClick: l
    }, " → ", 40, Ii)) : z("", !0);
  }
}), an = /* @__PURE__ */ ce(Oi, [["__scopeId", "data-v-9efd42ac"]]), Di = ["checked", "aria-label"], bt = /* @__PURE__ */ oe({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, r) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Di));
  }
}), Bi = { class: "dc-card__top dc-mono" }, qi = { class: "dc-card__lead" }, Vi = {
  key: 2,
  class: "dc-card__entity"
}, Ki = { class: "dc-card__top-right" }, Wi = ["onClick"], Ui = { class: "dc-card__names" }, Hi = { class: "dc-card__primary" }, ji = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Gi = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Xi = {
  key: 0,
  class: "dc-card__date"
}, Yi = /* @__PURE__ */ oe({
  __name: "CardsView",
  setup(e) {
    const t = be(), n = kt(), a = v(() => t.isEverything.value), s = (i) => i.entity?.card === "picture", r = v(() => n.value.length > 0 && n.value.every(s));
    return (i, o) => (f(), m("div", {
      class: ft(["dc-cards", { "dc-cards--pictures": r.value }])
    }, [
      (f(!0), m(ne, null, ve(A(n), (l) => (f(), m("div", {
        key: l.key,
        class: ft(["dc-card", { "dc-card--picture": s(l) }])
      }, [
        C("div", Bi, [
          C("span", qi, [
            A(t).selectable.value ? (f(), te(bt, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : z("", !0),
            s(l) ? z("", !0) : (f(), m(ne, { key: 1 }, [
              je(N(l.ordinal), 1)
            ], 64)),
            a.value ? (f(), m("span", Vi, N(l.entityLabel), 1)) : z("", !0)
          ]),
          C("span", Ki, [
            l.parts.state && !s(l) ? (f(), te(tn, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : z("", !0),
            pe(Pn, { entry: l }, null, 8, ["entry"]),
            pe(an, { entry: l }, null, 8, ["entry"]),
            A(t).pinnable.value ? (f(), te(Ma, {
              key: 1,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : z("", !0)
          ])
        ]),
        C("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (c) => A(t).activate(l.row, A(Ke)(c))
        }, [
          l.parts.image ? (f(), te(En, {
            key: 0,
            class: "dc-card__image",
            src: l.parts.image
          }, null, 8, ["src"])) : z("", !0),
          C("span", Ui, [
            C("span", Hi, N(l.parts.identity), 1),
            s(l) ? z("", !0) : (f(), m("span", ji, N(l.parts.reference), 1))
          ])
        ], 8, Wi),
        s(l) ? z("", !0) : (f(), m("div", Gi, [
          (f(!0), m(ne, null, ve(l.parts.metrics.slice(0, 2), (c) => (f(), te(nn, {
            key: c.column.key ?? c.label,
            entry: l,
            column: c.column
          }, {
            default: et(() => [
              je(N(c.label) + " " + N(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (f(), m("span", Xi, N(l.parts.updated), 1)) : z("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), fr = /* @__PURE__ */ ce(Yi, [["__scopeId", "data-v-316cfa48"]]), Qi = { class: "dc-grid" }, Zi = ["onClick"], Ji = { class: "dc-tile__scrim" }, ec = { class: "dc-tile__top dc-mono" }, tc = { class: "dc-tile__chip" }, nc = { class: "dc-tile__caption" }, ac = { class: "dc-tile__secondary dc-truncate" }, sc = { class: "dc-tile__primary" }, rc = /* @__PURE__ */ oe({
  __name: "GridView",
  setup(e) {
    const t = be(), n = kt();
    return (a, s) => (f(), m("div", Qi, [
      (f(!0), m(ne, null, ve(A(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        C("button", {
          type: "button",
          class: "dc-tile",
          style: Ee({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          onClick: (i) => A(t).activate(r.row, A(Ke)(i))
        }, [
          r.parts.image ? (f(), te(En, {
            key: 0,
            class: "dc-tile__image",
            src: r.parts.image
          }, null, 8, ["src"])) : z("", !0),
          C("span", Ji, [
            C("span", ec, [
              C("span", tc, N(r.ordinal), 1)
            ]),
            C("span", nc, [
              C("span", ac, N(r.parts.reference), 1),
              C("span", sc, N(r.parts.identity), 1)
            ])
          ])
        ], 12, Zi),
        A(t).selectable.value ? (f(), te(bt, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0)
      ]))), 128))
    ]));
  }
}), pr = /* @__PURE__ */ ce(rc, [["__scopeId", "data-v-7df25d40"]]);
function fs(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function On(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function lc(e) {
  return e > 0 ? e : 1 / 0;
}
function oc(e, t, n) {
  const { width: a, height: s, gap: r = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const i = [];
  let o = [], l = 0, c = 0;
  for (const d of e) {
    const h = t(d), y = Math.max(h.ratio, Number.EPSILON), w = h.height && h.height > 0 ? Math.max(c, h.height) : c, k = On(w, s), $ = fs(l + y, o.length + 1, a, r);
    if ($ > k) {
      o.push(d), l += y, c = w;
      continue;
    }
    const _ = On(c, s), x = o.length ? fs(l, o.length, a, r) : 1 / 0;
    x <= lc(c) && x - _ < k - $ ? (i.push({ items: o, height: x, filled: !0 }), o = [d], l = y, c = h.height && h.height > 0 ? h.height : 0) : (i.push({ items: [...o, d], height: $, filled: !0 }), o = [], l = 0, c = 0);
  }
  return o.length && i.push({ items: o, height: On(c, s), filled: !1 }), i;
}
const ic = { class: "dc-images" }, cc = ["title", "aria-label", "onClick"], uc = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, dc = 240, dn = 8, fc = 1, pc = /* @__PURE__ */ oe({
  __name: "ImagesView",
  setup(e) {
    const t = be(), n = kt(), a = ja(/* @__PURE__ */ new Map()), s = ja(/* @__PURE__ */ new Set());
    function r(k, $) {
      const _ = $.target;
      _.naturalWidth > 0 && _.naturalHeight > 0 && a.set(k, { width: _.naturalWidth, height: _.naturalHeight });
    }
    function i(k) {
      const $ = k.parts.image;
      return $ && !s.has($) ? $ : null;
    }
    function o(k) {
      const $ = i(k);
      return $ ? a.get($) : void 0;
    }
    function l(k) {
      const $ = o(k);
      return $ ? { ratio: $.width / $.height, height: $.height } : { ratio: fc };
    }
    const c = W(null), d = W(0);
    let h = null;
    function y() {
      d.value = c.value?.clientWidth ?? 0;
    }
    Ss(() => {
      y(), !(!c.value || typeof ResizeObserver > "u") && (h = new ResizeObserver(y), h.observe(c.value));
    }), Ve(() => {
      h?.disconnect(), h = null;
    });
    const w = v(() => {
      const k = oc(n.value, l, {
        width: d.value,
        height: dc,
        gap: dn
      }), $ = [];
      let _ = 0;
      for (const x of k) {
        let L = 0;
        for (const D of x.items) {
          const M = l(D).ratio * x.height, E = o(D), V = E !== void 0 && E.height < x.height;
          $.push({
            entry: D,
            style: {
              top: `${_}px`,
              left: `${L}px`,
              width: `${M}px`,
              height: `${x.height}px`
            },
            picture: V ? { width: `${E.width}px`, height: `${E.height}px` } : { width: "100%", height: "100%" }
          }), L += M + dn;
        }
        _ += x.height + dn;
      }
      return { boxes: $, height: k.length ? _ - dn : 0 };
    });
    return (k, $) => (f(), m("div", ic, [
      C("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Ee({ height: `${w.value.height}px` })
      }, [
        (f(!0), m(ne, null, ve(w.value.boxes, ({ entry: _, style: x, picture: L }) => (f(), m("div", {
          key: _.key,
          class: "dc-images__cell",
          style: Ee(x)
        }, [
          C("button", {
            type: "button",
            class: "dc-images__open",
            title: _.parts.identity,
            "aria-label": _.parts.identity,
            onClick: (D) => A(t).activate(_.row, A(Ke)(D))
          }, [
            i(_) ? (f(), te(En, {
              key: 0,
              class: "dc-images__picture",
              style: Ee(L),
              src: i(_),
              onLoad: (D) => r(i(_), D),
              onError: (D) => s.add(i(_))
            }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), m("span", uc, N(_.parts.identity), 1))
          ], 8, cc),
          A(t).selectable.value ? (f(), te(bt, {
            key: 0,
            class: "dc-images__tick",
            row: _.row,
            selected: _.selected,
            name: _.parts.identity
          }, null, 8, ["row", "selected", "name"])) : z("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), vr = /* @__PURE__ */ ce(pc, [["__scopeId", "data-v-f708d83f"]]), vc = { class: "dc-links" }, hc = ["onClick"], mc = { class: "dc-link__primary dc-truncate" }, gc = { class: "dc-link__secondary dc-mono dc-truncate" }, _c = /* @__PURE__ */ oe({
  __name: "LinksView",
  setup(e) {
    const t = be(), n = kt();
    return (a, s) => (f(), m("div", vc, [
      (f(!0), m(ne, null, ve(A(n), (r) => (f(), m("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        A(t).selectable.value ? (f(), te(bt, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0),
        C("button", {
          type: "button",
          class: "dc-link",
          onClick: (i) => A(t).activate(r.row, A(Ke)(i))
        }, [
          C("span", mc, N(r.parts.identity), 1),
          C("span", gc, N(r.parts.reference), 1)
        ], 8, hc)
      ]))), 128))
    ]));
  }
}), hr = /* @__PURE__ */ ce(_c, [["__scopeId", "data-v-08d0266c"]]), yc = {
  class: "dc-list",
  role: "list"
}, wc = ["onClick"], kc = { class: "dc-list__ordinal dc-mono" }, bc = { class: "dc-list__identity" }, $c = { class: "dc-list__primary dc-truncate" }, xc = { class: "dc-list__secondary dc-mono dc-truncate" }, Cc = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Mc = { class: "dc-list__metrics dc-mono" }, Sc = { class: "dc-list__trailing" }, Ec = /* @__PURE__ */ oe({
  __name: "ListView",
  setup(e) {
    const t = be(), n = kt(), a = v(() => t.isEverything.value);
    return (s, r) => (f(), m("div", yc, [
      (f(!0), m(ne, null, ve(A(n), (i) => (f(), m("div", {
        key: i.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        A(t).selectable.value ? (f(), te(bt, {
          key: 0,
          class: "dc-list__tick",
          row: i.row,
          selected: i.selected,
          name: i.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0),
        C("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => A(t).activate(i.row, A(Ke)(o))
        }, [
          C("span", kc, N(i.ordinal), 1),
          C("span", bc, [
            C("span", $c, N(i.parts.identity), 1),
            C("span", xc, N(i.parts.reference), 1)
          ])
        ], 8, wc),
        a.value ? (f(), m("span", Cc, N(i.entityLabel), 1)) : z("", !0),
        C("span", Mc, [
          (f(!0), m(ne, null, ve(i.parts.metrics.slice(0, 2), (o) => (f(), te(nn, {
            key: o.column.key ?? o.label,
            entry: i,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        C("span", Sc, [
          i.parts.state ? (f(), te(tn, {
            key: 0,
            status: i.parts.state
          }, null, 8, ["status"])) : z("", !0),
          pe(Pn, { entry: i }, null, 8, ["entry"]),
          pe(an, { entry: i }, null, 8, ["entry"]),
          A(t).pinnable.value ? (f(), te(Ma, {
            key: 1,
            row: i.row,
            name: i.parts.identity,
            pinned: i.pinned
          }, null, 8, ["row", "name", "pinned"])) : z("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Xn = /* @__PURE__ */ ce(Ec, [["__scopeId", "data-v-11b9f46c"]]), Pc = { class: "dc-preview" }, Ac = { class: "dc-preview__pager dc-mono" }, Tc = ["disabled"], zc = { "aria-live": "polite" }, Lc = ["disabled"], Rc = {
  key: 0,
  class: "dc-preview__card"
}, Fc = ["src"], Nc = { class: "dc-preview__body" }, Ic = { class: "dc-preview__top" }, Oc = { class: "dc-preview__badges" }, Dc = { class: "dc-preview__entity dc-mono" }, Bc = { class: "dc-preview__marks" }, qc = { class: "dc-preview__primary" }, Vc = { class: "dc-preview__secondary dc-mono" }, Kc = { class: "dc-preview__fields" }, Wc = { class: "dc-preview__key" }, Uc = { class: "dc-preview__value dc-mono" }, Hc = /* @__PURE__ */ oe({
  __name: "PreviewView",
  setup(e) {
    const t = be(), n = kt(), a = W(0);
    ke(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = v(() => n.value[a.value]), r = v(() => {
      const l = s.value;
      if (!l) return [];
      const c = He(l.columns, "reference"), d = He(l.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: l.parts.reference, column: null }] : [],
        ...l.parts.metrics.map((h) => ({
          key: h.label,
          value: h.text,
          column: h.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: l.parts.updated, column: null }] : []
      ];
    }), i = v(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${l}`;
    }), o = (l) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + l)));
    };
    return (l, c) => (f(), m("div", Pc, [
      C("div", Ac, [
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => o(-1))
        }, " ‹ ", 8, Tc),
        C("span", zc, N(i.value), 1),
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= A(n).length - 1,
          onClick: c[1] || (c[1] = (d) => o(1))
        }, " › ", 8, Lc)
      ]),
      s.value ? (f(), m("div", Rc, [
        C("div", {
          class: "dc-preview__media",
          style: Ee({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), m("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Fc)) : (f(), m(ne, { key: 1 }, [
            je(" preview ")
          ], 64))
        ], 4),
        C("div", Nc, [
          C("div", Ic, [
            C("span", Oc, [
              A(t).selectable.value ? (f(), te(bt, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : z("", !0),
              s.value.parts.state ? (f(), te(tn, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : z("", !0),
              C("span", Dc, N(s.value.entityLabel), 1)
            ]),
            C("span", Bc, [
              pe(Pn, { entry: s.value }, null, 8, ["entry"]),
              pe(an, { entry: s.value }, null, 8, ["entry"]),
              A(t).pinnable.value ? (f(), te(Ma, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : z("", !0)
            ])
          ]),
          C("div", null, [
            C("div", qc, N(s.value.parts.identity), 1),
            C("div", Vc, N(s.value.parts.reference), 1)
          ]),
          C("dl", Kc, [
            (f(!0), m(ne, null, ve(r.value, (d) => (f(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              C("dt", Wc, N(d.key), 1),
              C("dd", Uc, [
                d.column && s.value ? (f(), te(nn, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), m(ne, { key: 1 }, [
                  je(N(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          C("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: c[2] || (c[2] = (d) => A(t).activate(s.value.row, A(Ke)(d)))
          }, " Open record → ")
        ])
      ])) : z("", !0)
    ]));
  }
}), mr = /* @__PURE__ */ ce(Hc, [["__scopeId", "data-v-6be41155"]]);
function jc() {
  const e = be();
  return v(() => yl(e.schema.value, e.entity.value));
}
const Gc = ["title"], Xc = {
  key: 5,
  class: "dc-cell__text"
}, Yc = /* @__PURE__ */ oe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = v(() => t.column.kind ?? "text"), s = v(() => qe(t.column, t.entry.row)), r = v(
      () => a.value === "ordinal" ? t.entry.ordinal : Jt(t.column, t.entry.row)
    ), i = v(() => s.value), o = v(() => t.column.activate === !0 || !!t.column.click), l = v(() => jn(t.column)), c = v(() => Bs(t.column, t.entry.row));
    function d(h) {
      if (!o.value) return;
      h.stopPropagation();
      const y = Ke(h);
      t.column.click?.(t.entry.row, y), t.column.activate && n.activate(t.entry.row, y);
    }
    return (h, y) => a.value === "component" && e.column.component ? (f(), te(oa(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), te(tn, {
      key: 1,
      status: i.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), te(En, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Ee({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), te(nn, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), m("button", {
      key: 4,
      type: "button",
      class: ft(["dc-table__open", { "dc-truncate": l.value }]),
      title: c.value,
      onClick: d
    }, N(r.value), 11, Gc)) : (f(), m("span", Xc, N(r.value), 1));
  }
}), ps = /* @__PURE__ */ ce(Yc, [["__scopeId", "data-v-70ba8aa2"]]), Qc = ["aria-label"], Zc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Jc = /* @__PURE__ */ oe({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = v(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), r = (o) => !n.mixed && n.standing === o;
    function i(o, l) {
      o.stopPropagation(), a("set", l);
    }
    return (o, l) => (f(), m("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (f(!0), m(ne, null, ve(s.value, (c) => (f(), m("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": r(c.standing) ? "true" : "false",
        "aria-checked": r(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => i(d, c.standing)
      }, N(c.sign), 9, Zc))), 128))
    ], 8, Qc));
  }
}), vs = /* @__PURE__ */ ce(Jc, [["__scopeId", "data-v-adaa8412"]]), eu = {
  key: 0,
  class: "dc-table__none"
}, tu = { class: "dc-table__detail" }, nu = ["data-dc-wrap"], au = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, su = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, ru = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], lu = ["onClick"], ou = {
  key: 2,
  class: "dc-table__head"
}, iu = ["onClick"], cu = {
  key: 0,
  class: "dc-table__pick"
}, uu = {
  key: 1,
  class: "dc-table__standing"
}, du = ["data-dc-align", "data-dc-hide", "title"], fu = {
  key: 0,
  class: "dc-table__name"
}, pu = /* @__PURE__ */ oe({
  __name: "TableView",
  setup(e) {
    const t = be(), n = kt(), a = jc();
    function s(b) {
      const K = Pl(b, t.entity.value), R = K ? `Shortcut: ${K}` : void 0;
      return [b.hint, R].filter(Boolean).join(`
`) || void 0;
    }
    const r = v(
      () => a.value.find((b) => b.scope)
    ), i = v(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((b) => b.scope)
    ), o = (b) => va(b.entity, b.row), l = (b) => Qs(t.query.value.expr, o(b));
    function c(b, K) {
      t.setExpression(is(t.query.value.expr, o(b), K));
    }
    const d = v(() => {
      const b = n.value.filter((R) => o(R) !== null), K = b.filter((R) => R.selected);
      return K.length ? K : b;
    }), h = v(() => d.value.some((b) => b.selected)), y = v(() => {
      const b = d.value[0];
      return b ? l(b) : null;
    }), w = v(
      () => d.value.some((b) => l(b) !== y.value)
    ), k = v(
      () => h.value ? "the ticked rows" : "every row on this page"
    );
    function $(b) {
      t.setExpression(
        d.value.reduce(
          (K, R) => is(K, o(R), b),
          t.query.value.expr
        )
      );
    }
    const _ = v(
      () => a.value.some((b) => b.kind === "image" || b.height !== void 0)
    );
    function x(b) {
      b && (t.query.value.sort === b ? t.toggleDirection() : t.setSort(b));
    }
    const L = v(() => t.entity.value?.label ?? "The result set"), D = v(() => new Set(t.sorts.value.map((b) => b.key))), M = (b) => b.sort !== void 0 && D.value.has(b.sort), E = (b) => {
      if (M(b))
        return t.query.value.sort !== b.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function V(b) {
      return [
        Ja(b),
        b.muted ? "dc-table__muted" : "",
        b.mono ? "dc-mono" : "",
        jn(b) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function P(b, K) {
      if (!(!jn(b) || b.activate || b.click))
        return Bs(b, K.row);
    }
    return (b, K) => A(a).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0
    }, [
      C("thead", null, [
        C("tr", null, [
          A(t).selectable.value ? (f(), m("th", au, [
            pe(cr)
          ])) : z("", !0),
          i.value ? (f(), m("th", su, [
            d.value.length ? (f(), te(vs, {
              key: 0,
              standing: y.value,
              mixed: w.value,
              name: k.value,
              onSet: $
            }, null, 8, ["standing", "mixed", "name"])) : z("", !0)
          ])) : z("", !0),
          (f(!0), m(ne, null, ve(A(a), (R, Z) => (f(), m("th", {
            key: A(Qa)(R, Z),
            scope: "col",
            class: ft(A(Ja)(R)),
            style: Ee({ width: R.width }),
            "data-dc-align": A(Za)(R),
            "data-dc-hide": R.hideBelow,
            "aria-sort": E(R),
            title: s(R)
          }, [
            M(R) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (X) => x(R.sort)
            }, N(R.label), 9, lu)) : (f(), m(ne, { key: 1 }, [
              je(N(R.label), 1)
            ], 64)),
            R.header ? (f(), m("span", ou, [
              (f(), te(oa(R.header), {
                column: R,
                entity: A(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : z("", !0)
          ], 14, ru))), 128))
        ])
      ]),
      C("tbody", null, [
        (f(!0), m(ne, null, ve(A(n), (R) => (f(), m("tr", {
          key: R.key,
          class: "dc-table__row",
          onClick: (Z) => A(t).activate(R.row, A(Ke)(Z))
        }, [
          A(t).selectable.value ? (f(), m("td", cu, [
            pe(bt, {
              row: R.row,
              selected: R.selected,
              name: R.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : z("", !0),
          i.value ? (f(), m("td", uu, [
            o(R) !== null ? (f(), te(vs, {
              key: 0,
              standing: l(R),
              name: R.parts.identity,
              onSet: (Z) => c(R, Z)
            }, null, 8, ["standing", "name", "onSet"])) : z("", !0)
          ])) : z("", !0),
          (f(!0), m(ne, null, ve(A(a), (Z, X) => (f(), m("td", {
            key: A(Qa)(Z, X),
            class: ft(V(Z)),
            "data-dc-align": A(Za)(Z),
            "data-dc-hide": Z.hideBelow,
            title: P(Z, R)
          }, [
            Z === r.value ? (f(), m("span", fu, [
              pe(ps, {
                column: Z,
                entry: R
              }, null, 8, ["column", "entry"]),
              pe(an, { entry: R }, null, 8, ["entry"])
            ])) : (f(), te(ps, {
              key: 1,
              column: Z,
              entry: R
            }, null, 8, ["column", "entry"]))
          ], 10, du))), 128))
        ], 8, iu))), 128))
      ])
    ], 8, nu)) : (f(), m("p", eu, [
      K[2] || (K[2] = C("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      C("span", tu, [
        je(N(L.value) + " has no ", 1),
        K[0] || (K[0] = C("code", null, "columns", -1)),
        K[1] || (K[1] = je(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), gr = /* @__PURE__ */ ce(pu, [["__scopeId", "data-v-98495b60"]]);
function vu(e) {
  const t = Ft([]), n = W(!1), a = Ft(null);
  let s = 0;
  const r = (l, c, d, h, y) => ({
    entity: l,
    rows: e.limit.value > 0 ? c.rows.map((w, k) => dr(w, k, l, e.isPinned(w.id))) : [],
    total: c.total,
    count: d ? l.count : String(c.total),
    pinned: hu(h, c, y)
  }), i = () => {
    const l = ++s, c = e.query.value, d = e.schema.value, h = e.entities.value, y = e.limit.value, w = e.within?.value.trim() ?? "", k = ua(c) && !w, $ = w ? pa(w, c.expr) : c.expr, _ = h.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: x.key, expr: $, facets: Ot(x), page: 1 },
        schema: d,
        entity: x,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max(y, 1),
        offset: 0
      })
    }));
    if (_.every(({ outcome: x }) => !(x instanceof Promise))) {
      t.value = _.map(
        ({ entity: x, outcome: L }) => r(x, L, k, d, $)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(_.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      l === s && (t.value = x.map(
        (L, D) => r(_[D].entity, L, k, d, $)
      ), a.value = null);
    }).catch((x) => {
      l === s && (a.value = x, t.value = []);
    }).finally(() => {
      l === s && (n.value = !1);
    });
  }, o = () => {
    try {
      i();
    } catch (l) {
      a.value = l, t.value = [], n.value = !1;
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
    o,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: o };
}
function hu(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const r = ha(e, a);
  return !!r && ma(s, r) === s;
}
const mu = ["data-dc-pending", "data-dc-heads-only"], gu = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, _u = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, yu = {
  key: 2,
  class: "dc-types__state"
}, wu = ["data-dc-empty"], ku = ["onClick"], bu = { class: "dc-type__name" }, $u = { class: "dc-type__count dc-mono" }, xu = { class: "dc-type__sr" }, Cu = {
  key: 0,
  class: "dc-type__empty"
}, Mu = ["onClick"], Su = { class: "dc-type__identity" }, Eu = { class: "dc-type__primary dc-truncate" }, Pu = { class: "dc-type__secondary dc-mono dc-truncate" }, Au = { class: "dc-type__trailing dc-mono" }, Tu = { class: "dc-type__metric-value" }, zu = { class: "dc-type__metric-label" }, Lu = {
  key: 0,
  class: "dc-type__date"
}, Ru = ["onClick"], Fu = /* @__PURE__ */ oe({
  __name: "TypeCardsView",
  setup(e) {
    const t = be(), { previews: n, pending: a, error: s } = vu({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (l) => t.isPinnedId(l)
    }), r = v(() => !t.isPristine.value || !!t.within.value), i = v(() => t.previewsPerType.value <= 0), o = v(
      () => n.value.filter(
        (l) => !l.pinned && (l.total > 0 || !i.value && l.entity.create)
      )
    );
    return (l, c) => (f(), m("div", {
      class: "dc-types",
      "data-dc-pending": A(a) ? "true" : "false",
      "data-dc-heads-only": i.value ? "true" : "false"
    }, [
      xe(l.$slots, "before", {}, void 0, !0),
      A(s) ? (f(), m("p", gu, " Could not load results: " + N(A(s) instanceof Error ? A(s).message : "the data source failed."), 1)) : !o.value.length && A(a) ? (f(), m("p", _u, " Running query… ")) : o.value.length ? z("", !0) : (f(), m("p", yu, N(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(ne, null, ve(o.value, (d) => (f(), m("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        C("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (h) => A(t).setEntity(d.entity.key)
        }, [
          C("span", bu, N(d.entity.label), 1),
          C("span", $u, N(d.count), 1),
          c[0] || (c[0] = C("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          C("span", xu, "Show only " + N(d.entity.label.toLowerCase()), 1)
        ], 8, ku),
        d.total ? z("", !0) : (f(), m("p", Cu, N(r.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(ne, null, ve(d.rows, (h) => (f(), m("div", {
          key: h.key,
          class: "dc-type__row"
        }, [
          C("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (y) => A(t).activate(h.row, A(Ke)(y))
          }, [
            C("span", Su, [
              C("span", Eu, N(h.parts.identity), 1),
              C("span", Pu, N(h.parts.reference), 1)
            ])
          ], 8, Mu),
          C("span", Au, [
            (f(!0), m(ne, null, ve(h.parts.metrics.slice(0, 1), (y) => (f(), te(nn, {
              key: y.column.key ?? y.label,
              class: "dc-type__metric",
              entry: h,
              column: y.column
            }, {
              default: et(() => [
                C("span", Tu, N(y.text), 1),
                C("span", zu, N(y.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            h.parts.updated ? (f(), m("span", Lu, N(h.parts.updated), 1)) : z("", !0),
            pe(Pn, { entry: h }, null, 8, ["entry"]),
            pe(an, { entry: h }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !i.value ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (h) => A(t).create(d.entity)
        }, [
          c[1] || (c[1] = C("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          je(" " + N(d.entity.create), 1)
        ], 8, Ru)) : z("", !0)
      ], 8, wu))), 128)),
      xe(l.$slots, "after", {}, void 0, !0)
    ], 8, mu));
  }
}), _r = /* @__PURE__ */ ce(Fu, [["__scopeId", "data-v-1d426500"]]), Nu = ["data-dc-pending"], Iu = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Ou = { class: "dc-results__detail" }, Du = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Bu = {
  key: 3,
  class: "dc-results__state"
}, qu = { class: "dc-results__detail" }, Vu = /* @__PURE__ */ oe({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = Zt(), s = {
      list: Xn,
      cards: fr,
      grid: pr,
      images: vr,
      table: gr,
      links: hr,
      preview: mr
    }, r = v(() => da(n.query.value)), i = v(() => ia(n.query.value.view, t.views)), o = v(() => s[i.value] ?? Xn), l = v(() => n.rows.value.length > 0), c = v(() => n.error.value !== null), d = W(null);
    return ke(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (h, y) => (f(), m("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": A(n).pending.value ? "true" : "false"
    }, [
      r.value ? (f(), te(_r, { key: 0 }, vn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: et(() => [
            xe(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: et(() => [
            xe(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), m("p", Iu, [
        y[1] || (y[1] = C("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        C("span", Ou, N(A(n).error.value instanceof Error ? A(n).error.value.message : "The data source failed."), 1)
      ])) : !l.value && A(n).pending.value ? (f(), m("p", Du, [...y[2] || (y[2] = [
        C("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : l.value ? (f(), te(oa(o.value), { key: 4 })) : (f(), m("div", Bu, [
        y[3] || (y[3] = C("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        C("span", qu, N(A(n).summary.value), 1),
        A(n).isPristine.value ? z("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: y[0] || (y[0] = (w) => A(n).clearFilters())
        }, N(A(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Nu));
  }
}), yr = /* @__PURE__ */ ce(Vu, [["__scopeId", "data-v-c131c5c3"]]), Ku = ["data-dc-theme"], Wu = ["data-dc-width", "data-dc-align"], Uu = { class: "dc-shell__panel" }, Hu = /* @__PURE__ */ oe({
  __name: "DataShell",
  props: /* @__PURE__ */ bn({
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
  emits: /* @__PURE__ */ bn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Wt(e, "open"), i = Wt(e, "pinned"), o = Wt(e, "selected"), l = Zt(), c = Rt(Ps, null), d = a.route || c ? null : ul(), h = a.route ?? c ?? d;
    Ve(() => d?.dispose?.());
    const y = v(() => Hl({ seed: a.schema.key })), w = v(() => a.source ?? y.value), k = ao({
      schema: () => a.schema,
      adapter: h,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), $ = v(() => a.within?.trim() ?? ""), _ = so({
      source: w,
      query: k.query,
      schema: v(() => a.schema),
      entity: k.entity,
      limit: v(() => a.limit),
      within: $
    });
    ke(k.query, (S) => s("query-change", S)), ke(
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
    const x = ra() ?? "dc-query-panel", L = W(null);
    function D() {
      r.value && (r.value = !1, Nt(() => {
        L.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const M = v(() => new Set(i.value));
    function E(S) {
      const I = new Set(M.value);
      I.has(S.id) ? I.delete(S.id) : I.add(S.id), i.value = [...I], s("toggle-pin", S);
    }
    const V = v(() => {
      if (a.selectable === !0) return !0;
      const S = k.entity.value;
      return !!(S?.duplicate || S?.delete);
    }), P = v(() => new Set(o.value));
    function b(S) {
      const I = new Set(P.value);
      I.has(S.id) ? I.delete(S.id) : I.add(S.id), o.value = [...I];
    }
    function K(S) {
      const I = new Set(P.value);
      for (const j of _.rows.value)
        S ? I.add(j.id) : I.delete(j.id);
      o.value = [...I];
    }
    function R() {
      o.value.length && (o.value = []);
    }
    const Z = v(() => ({
      ids: [...o.value],
      rows: _.rows.value.filter((S) => P.value.has(S.id)),
      entity: k.entity.value
    }));
    ke(() => k.query.value.entity, R);
    function X(S, I, j = {}) {
      const le = jl(a.schema, k.query.value, S, j);
      j.exclude ? k.narrow(le, I?.key ?? k.query.value.entity) : k.narrow(le, I?.key ?? null, I ? void 0 : "cards"), s("drill", S, I, j);
    }
    const ye = Gl({
      ...k,
      schema: v(() => a.schema),
      entities: v(() => a.schema.entities),
      rows: _.rows,
      total: _.total,
      limit: v(() => a.limit),
      offset: _.offset,
      pageCount: _.pageCount,
      pending: _.pending,
      counting: _.counting,
      error: _.error,
      source: w,
      previewsPerType: v(() => a.previewsPerType),
      within: $,
      pinnable: v(() => a.pinnable === !0),
      isPinned: (S) => M.value.has(S.id),
      isPinnedId: (S) => M.value.has(S),
      togglePin: E,
      selectable: V,
      selection: Z,
      isSelected: (S) => P.value.has(S.id),
      toggleSelect: b,
      selectPage: K,
      clearSelection: R,
      narrowsOnPress: v(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (S, I = {}) => {
        if (a.rowPress === "narrow" && ha(a.schema, S)) {
          X(S, null, I);
          return;
        }
        s("activate", S);
      },
      create: (S) => s("create", S),
      duplicate: () => s("duplicate", Z.value),
      delete: () => s("delete", Z.value),
      drill: X
    }), ue = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: k.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: D
    }), (S, I) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Ee(ue.value)
    }, [
      C("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(lr, {
          ref_key: "headerRef",
          ref: L,
          expanded: r.value,
          "panel-id": A(x),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: I[0] || (I[0] = (j) => r.value = !r.value)
        }, vn({ _: 2 }, [
          l.actions ? {
            name: "actions",
            fn: et(() => [
              xe(S.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        r.value ? (f(), m(ne, { key: 0 }, [
          C("div", {
            class: "dc-shell__scrim",
            onClick: D
          }),
          C("div", Uu, [
            pe(ir, {
              "panel-id": A(x),
              onClose: D
            }, vn({ _: 2 }, [
              l["panel-section"] ? {
                name: "panel-section",
                fn: et(() => [
                  xe(S.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : z("", !0)
      ], 8, Wu),
      pe(ur, { views: e.views }, null, 8, ["views"]),
      xe(S.$slots, "results", {
        rows: A(ye).rows.value,
        total: A(ye).total.value,
        offset: A(ye).offset.value,
        pageCount: A(ye).pageCount.value,
        query: A(ye).query.value,
        pending: A(ye).pending.value
      }, () => [
        pe(yr, { views: e.views }, vn({ _: 2 }, [
          l["cards-before"] ? {
            name: "cards-before",
            fn: et(() => [
              xe(S.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          l["cards-after"] ? {
            name: "cards-after",
            fn: et(() => [
              xe(S.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Ku));
  }
}), ju = /* @__PURE__ */ ce(Hu, [["__scopeId", "data-v-7dd2f361"]]), Gu = ["data-dc-muted"], Xu = {
  key: 0,
  class: "dc-shell-card__head"
}, Yu = { class: "dc-shell-card__title" }, Qu = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Zu = {
  key: 0,
  class: "dc-shell-card__aside"
}, Ju = ["data-dc-flush"], ed = {
  key: 2,
  class: "dc-shell-card__foot"
}, td = /* @__PURE__ */ oe({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), a = Zt();
    function s(d) {
      return r(d?.() ?? []);
    }
    function r(d) {
      return d.some((h) => h.type === ol ? !1 : h.type === il ? String(h.children ?? "").trim().length > 0 : h.type === ne ? r(h.children ?? []) : !0);
    }
    const i = v(() => !!t.title || o.value || s(a.head)), o = v(() => s(a.aside)), l = v(() => s(a.default)), c = v(() => s(a.foot));
    return (d, h) => (f(), m("section", {
      class: "dc-shell-card",
      style: Ee(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      i.value ? (f(), m("header", Xu, [
        xe(d.$slots, "head", {}, () => [
          C("h2", Yu, N(e.title), 1),
          e.count !== void 0 ? (f(), m("span", Qu, N(e.count), 1)) : z("", !0)
        ], !0),
        o.value ? (f(), m("span", Zu, [
          xe(d.$slots, "aside", {}, void 0, !0)
        ])) : z("", !0)
      ])) : z("", !0),
      l.value ? (f(), m("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        xe(d.$slots, "default", {}, void 0, !0)
      ], 8, Ju)) : z("", !0),
      c.value ? (f(), m("footer", ed, [
        xe(d.$slots, "foot", {}, void 0, !0)
      ])) : z("", !0)
    ], 12, Gu));
  }
}), Yf = /* @__PURE__ */ ce(td, [["__scopeId", "data-v-75f2ef0b"]]), nd = ["aria-label"], ad = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], sd = /* @__PURE__ */ oe({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = W([]);
    function r(i, o) {
      const l = n.options.length;
      let c = null;
      if (i.key === "ArrowRight" || i.key === "ArrowDown" ? c = (o + 1) % l : i.key === "ArrowLeft" || i.key === "ArrowUp" ? c = (o - 1 + l) % l : i.key === "Home" ? c = 0 : i.key === "End" && (c = l - 1), c === null) return;
      i.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (i, o) => (f(), m("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), m(ne, null, ve(e.options, (l, c) => (f(), m("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: ft(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", l.key),
        onKeydown: (d) => r(d, c)
      }, N(l.label), 43, ad))), 128))
    ], 8, nd));
  }
}), rd = /* @__PURE__ */ ce(sd, [["__scopeId", "data-v-63fb5482"]]), ld = ["data-dc-theme", "aria-label"], od = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], id = /* @__PURE__ */ oe({
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
    const n = e, a = v(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), s = t, r = W(null), i = W([]), o = W(null), l = W(null), c = W(!1), d = v(
      () => n.menus.flatMap((M, E) => Ut(M) ? [E] : [])
    );
    function h(M, E) {
      const V = i.value[M]?.getBoundingClientRect(), P = n.menus[M];
      !V || !P || !Ut(P) || (l.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, o.value = M, c.value = E);
    }
    function y(M) {
      const E = o.value;
      o.value = null, l.value = null, M && E !== null && i.value[E]?.focus();
    }
    function w(M) {
      o.value === M ? y(!0) : h(M, !1);
    }
    function k(M) {
      o.value === null || o.value === M || h(M, !1);
    }
    function $(M, E) {
      const V = d.value;
      if (V.length === 0) return null;
      if (M === null) return E === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const P = V.indexOf(M);
      return P === -1 ? V[0] ?? null : V[(P + E + V.length) % V.length] ?? null;
    }
    function _(M) {
      const E = M.key;
      if (E === "Escape") {
        if (o.value === null) return;
        M.preventDefault(), y(!0);
        return;
      }
      if (E === "ArrowDown" && o.value === null) {
        const b = x();
        if (b === null) return;
        M.preventDefault(), h(b, !0);
        return;
      }
      if (E !== "ArrowLeft" && E !== "ArrowRight") return;
      const V = o.value ?? x(), P = $(V, E === "ArrowRight" ? 1 : -1);
      P !== null && (M.preventDefault(), o.value !== null ? h(P, !0) : i.value[P]?.focus());
    }
    function x() {
      const M = i.value.findIndex((E) => E === document.activeElement);
      return M === -1 ? d.value[0] ?? null : M;
    }
    function L(M) {
      const E = M.target;
      !E || r.value?.contains(E) || y(!1);
    }
    ke(o, (M) => {
      M !== null ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), Ve(() => window.removeEventListener("pointerdown", L, !0));
    function D(M) {
      y(!0), M.action?.(), s("choose", M);
    }
    return (M, E) => (f(), m("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Ee(a.value),
      onKeydown: _
    }, [
      (f(!0), m(ne, null, ve(e.menus, (V, P) => (f(), m("button", {
        key: V.id ?? V.label ?? P,
        ref_for: !0,
        ref: (b) => {
          b && (i.value[P] = b);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === P,
        "aria-disabled": V.disabled ? "true" : void 0,
        disabled: V.disabled,
        "data-dc-menu": V.id ?? V.label,
        tabindex: P === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (b) => w(P),
        onMouseenter: (b) => k(P)
      }, N(V.label), 41, od))), 128)),
      o.value !== null && l.value ? (f(), te(Ca, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: l.value,
        label: e.menus[o.value]?.label,
        autofocus: c.value,
        onChoose: D,
        onDismiss: E[0] || (E[0] = (V) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
    ], 44, ld));
  }
}), Qf = /* @__PURE__ */ ce(id, [["__scopeId", "data-v-93dbd2e4"]]), cd = ["aria-label", "aria-expanded", "disabled"], ud = { "aria-hidden": "true" }, dd = /* @__PURE__ */ oe({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = W(null), s = W(null), r = W(null), i = W(!1), o = v(() => r.value !== null);
    function l(k) {
      const $ = a.value?.getBoundingClientRect();
      $ && (r.value = { x: $.left, y: $.bottom + 4, mirrorX: $.right }, i.value = k);
    }
    function c(k) {
      r.value = null, k && a.value?.focus();
    }
    function d() {
      o.value ? c(!0) : l(!1);
    }
    function h(k) {
      k.key !== "ArrowDown" || o.value || (k.preventDefault(), l(!0));
    }
    function y(k) {
      const $ = k.target;
      $ && (a.value?.contains($) || s.value?.root?.contains($) || c(!1));
    }
    ke(o, (k) => {
      k ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), Ve(() => window.removeEventListener("pointerdown", y, !0));
    function w(k) {
      c(!0), k.action?.(), n("choose", k);
    }
    return (k, $) => (f(), m(ne, null, [
      C("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: h
      }, [
        C("span", ud, N(e.glyph), 1)
      ], 40, cd),
      r.value ? (f(), te(Ca, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: i.value,
        onChoose: w,
        onDismiss: $[0] || ($[0] = (_) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
    ], 64));
  }
}), Sa = /* @__PURE__ */ ce(dd, [["__scopeId", "data-v-48f5ada5"]]), Bt = (e) => e.kind === "split", Y = (e) => e.kind === "group", re = (e) => e.kind === "float", gt = { x: 16, y: 16, w: 360, h: 260 }, xn = 28, wr = 120, Yn = 220, kr = 38, Ct = 6;
function sn(e, t) {
  let n = !1;
  const a = e.frames.map((s, r) => {
    const i = t(s.node, r);
    return i === s.node ? s : (n = !0, { ...s, node: i });
  });
  return n ? { ...e, frames: a } : e;
}
function tt(e) {
  return { kind: "group", panels: [e] };
}
function Zf(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const _e = (e) => typeof e == "string", Ea = (e) => _e(e) ? tt(e) : e, rn = (e) => _e(e) ? [e] : lt(e), hs = (e) => e.panels.filter(_e), fd = (e) => e.panels.filter((t) => !_e(t)), Be = (e, t) => e.panels.includes(t);
function ln(e, t, n) {
  let a = !1;
  const s = e.panels.map((r) => {
    if (_e(r) || !de(r, t)) return r;
    const i = n(r);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, panels: s } : e;
}
function An(e, t) {
  return { node: e, rect: { ...gt, ...t } };
}
function Pa(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Aa(e, t) {
  const n = { ...gt, ...t };
  return Pa(
    e.map(
      (a, s) => An(a, {
        ...n,
        x: n.x + s * xn,
        y: n.y + s * xn
      })
    )
  );
}
function Ta(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const za = (e, t, n) => Ta("row", e, t, n), Jf = (e, t, n) => Ta("column", e, t, n);
function $e(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const wt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, ep = (e) => ({ ...e, headless: !0 }), tp = (e) => ({ ...e, fixedView: !0 }), pd = (e) => e === "left" || e === "right" ? "row" : "column";
function lt(e) {
  return Y(e) ? e.panels.flatMap(rn) : re(e) ? e.frames.flatMap((t) => lt(t.node)) : e.children.flatMap(lt);
}
function de(e, t) {
  return Y(e) ? e.panels.some((n) => _e(n) ? n === t : de(n, t)) : re(e) ? e.frames.some((n) => de(n.node, t)) : e.children.some((n) => de(n, t));
}
const br = (e) => lt(e).length === 0, Qn = (e) => !Y(e) && wt(e), Zn = (e) => br(e) && !Qn(e);
function Tn(e) {
  return Bt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : re(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => _e(t) ? [] : [{ node: t, index: n }]);
}
const La = (e) => Tn(e).map((t) => t.node);
function $t(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => _e(a) ? a === t : de(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function $r(e) {
  const t = e.panels[$t(e)];
  return t !== void 0 && _e(t) ? t : "";
}
function Re(e) {
  if (_e(e)) return e;
  if (Y(e)) {
    const n = e.panels[$t(e)];
    return n === void 0 ? "" : Re(n);
  }
  if (re(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Re(n.node) : "";
  }
  const t = e.children[0];
  return t ? Re(t) : "";
}
function At(e, t) {
  if (Y(e) && Be(e, t)) return e;
  for (const n of La(e)) {
    const a = At(n, t);
    if (a) return a;
  }
  return null;
}
function vd(e) {
  const t = La(e).flatMap(vd);
  return Y(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (Y(e)) {
    for (const n of fd(e)) {
      const a = Se(n, t);
      if (a) return a;
    }
    return null;
  }
  if (re(e)) {
    for (const n of e.frames)
      if (de(n.node, t))
        return Se(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Se(n, t);
    if (a) return a;
  }
  return null;
}
function Dn(e, t, n = wr) {
  const a = (o, l) => l > 0 ? Math.max(Math.min(o, l), Math.min(n, l)) : Math.max(o, n), s = a(e.w, t.w), r = a(e.h, t.h), i = (o, l, c) => Math.min(Math.max(o, 0), Math.max(c - l, 0));
  return {
    x: Math.round(i(e.x, s, t.w)),
    y: Math.round(i(e.y, r, t.h)),
    w: Math.round(s),
    h: Math.round(r)
  };
}
function ms(e, t, n, a, s = wr) {
  let { x: r, y: i, w: o, h: l } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + a), t.includes("n") && (l = e.h - a, i = e.y + a), o < s && (t.includes("w") && (r = e.x + e.w - s), o = s), l < s && (t.includes("n") && (i = e.y + e.h - s), l = s), { x: r, y: i, w: o, h: l };
}
const xr = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function Tt(e, t, n) {
  if (Y(e)) return ln(e, t, (r) => Tt(r, t, n));
  if (re(e)) {
    let r = !1;
    const i = e.frames.map((o) => {
      if (!de(o.node, t)) return o;
      if (Se(o.node, t)) {
        const c = Tt(o.node, t, n);
        return c === o.node ? o : (r = !0, { ...o, node: c });
      }
      const l = n(o);
      return l === o ? o : (r = !0, l);
    });
    return r ? { ...e, frames: i } : e;
  }
  if (!de(e, t)) return e;
  let a = !1;
  const s = e.children.map((r) => {
    const i = Tt(r, t, n);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, children: s } : e;
}
function hd(e, t, n) {
  return Tt(e, t, (a) => xr(a.rect, n) ? a : { ...a, rect: n });
}
const it = (e) => e.maximized === !0, Cr = (e) => (t) => {
  if (it(t) === e) return t;
  if (e) {
    const { minimized: s, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function md(e, t, n = !0) {
  return Tt(e, t, Cr(n));
}
function np(e, t) {
  const n = Se(e, t);
  return n ? md(e, t, !it(n)) : e;
}
const mt = (e) => e.minimized === !0, Mr = (e) => (t) => {
  if (mt(t) === e) return t;
  if (e) {
    const { maximized: s, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function gd(e, t, n = !0) {
  return Tt(e, t, Mr(n));
}
function ap(e, t) {
  const n = Se(e, t);
  return n ? gd(e, t, !mt(n)) : e;
}
function ht(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = dt(e, t.slice(0, -1));
  return !a || !re(a) ? null : a.frames[n] ?? null;
}
function Jn(e, t) {
  if (re(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!de(a.node, t)) continue;
      const s = Jn(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of Tn(e)) {
    if (!de(n, t)) continue;
    const s = Jn(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function Ra(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), r = dt(e, s);
  if (!r || !re(r)) return e;
  const i = r.frames[a];
  if (!i) return e;
  const o = n(i);
  if (o === i) return e;
  const l = [...r.frames];
  return l[a] = o, yt(e, s, { ...r, frames: l });
}
function gs(e, t, n) {
  return Ra(
    e,
    t,
    (a) => xr(a.rect, n) ? a : { ...a, rect: n }
  );
}
function _d(e, t, n = !0) {
  return Ra(e, t, Cr(n));
}
function yd(e, t, n = !0) {
  return Ra(e, t, Mr(n));
}
function Ht(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (re(e)) {
    const i = e.frames[n];
    if (!i) return e;
    const o = Ht(i.node, a), l = o === i.node ? i : { ...i, node: o };
    if (n === e.frames.length - 1 && l === i) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(l), { ...e, frames: c };
  }
  const s = dt(e, [n]);
  if (!s) return e;
  const r = Ht(s, a);
  return r === s ? e : yt(e, [n], r);
}
function wd(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, r) => {
    a && (re(a) && (n[r] = a.frames.length - 1), a = dt(a, [s]));
  }), n;
}
function gn(e, t, n, a) {
  if (Y(e)) return ln(e, n, (i) => gn(i, t, n, a));
  if (re(e)) {
    const i = e.frames.findIndex((l) => de(l.node, n)), o = e.frames[i];
    if (!o) return e;
    if (Se(o.node, n)) {
      const l = gn(o.node, t, n, a);
      if (l === o.node) return e;
      const c = [...e.frames];
      return c[i] = { ...o, node: l }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, An(tt(t), a)] };
  }
  if (!de(e, n)) return e;
  let s = !1;
  const r = e.children.map((i) => {
    const o = gn(i, t, n, a);
    return o !== i && (s = !0), o;
  });
  return s ? { ...e, children: r } : e;
}
function _s(e, t, n, a) {
  if (t === n || !de(e, t) || !de(e, n) || !Se(e, n)) return e;
  const s = _t(e, t);
  if (!s) return e;
  const r = gn(s, t, n, a);
  return r === s ? e : Ce(r);
}
function kd(e, t, n) {
  return re(e) ? { ...e, frames: [...e.frames, An(tt(t), n)] } : Y(e) ? Er(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, tt(t)],
    sizes: [...rt(e), 1],
    ...$e(e)
  };
}
function Sr(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return kd(e, t, a);
  const r = n.slice(1), i = (d, h) => h === s ? Sr(d, t, r, a) : _t(d, t);
  if (re(e)) {
    const d = e.frames.flatMap((h, y) => {
      const w = i(h.node, y);
      return w ? [w === h.node ? h : { ...h, node: w }] : [];
    });
    return { ...e, frames: d };
  }
  if (Y(e)) {
    const d = $t(e), h = [];
    e.panels.forEach((k, $) => {
      if (_e(k)) {
        k !== t && h.push(k);
        return;
      }
      const _ = i(k, $);
      _ && h.push(_);
    });
    const w = e.active && h.some((k) => rn(k).includes(e.active)) ? e.active : Re(h[d] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...w ? { active: w } : {},
      ...$e(e)
    };
  }
  const o = rt(e), l = [], c = [];
  return e.children.forEach((d, h) => {
    const y = i(d, h);
    y && (l.push(y), c.push(o[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: c, ...$e(e) };
}
function ys(e, t, n, a) {
  const s = dt(e, n);
  return !s || !br(s) || !de(e, t) ? e : Ce(Sr(e, t, n, a));
}
function Bn(e, t) {
  if (Y(e)) return ln(e, t, (s) => Bn(s, t));
  if (re(e)) {
    const s = e.frames.findIndex((c) => de(c.node, t)), r = e.frames[s];
    if (!r) return e;
    const i = Bn(r.node, t), o = i === r.node ? r : { ...r, node: i };
    if (s === e.frames.length - 1 && o === r) return e;
    const l = [...e.frames];
    return l.splice(s, 1), l.push(o), { ...e, frames: l };
  }
  if (!de(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = Bn(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Fa(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), s = a.reduce((r, i) => r + i, 0);
  return s <= 0 ? n() : a.map((r) => r / s);
}
const rt = (e) => Fa(e.children.length, e.sizes), Ge = (e) => {
  const t = Y(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function Ce(e) {
  if (Y(e)) return bd(e);
  if (re(e)) {
    const o = e.frames.flatMap((l) => {
      const c = Ce(l.node);
      return Zn(c) ? [] : [c === l.node ? l : { ...l, node: c }];
    });
    return o.length === e.frames.length && o.every((l, c) => l === e.frames[c]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = rt(e), n = Ge(e), a = [], s = [], r = [];
  e.children.forEach((o, l) => {
    const c = Ce(o), d = t[l] ?? 0;
    if (Zn(c)) return;
    if (!n && Bt(c) && c.direction === e.direction && !Ge(c) && !wt(c)) {
      const y = rt(c);
      c.children.forEach((w, k) => {
        a.push(w), s.push(d * (y[k] ?? 0));
      });
      return;
    }
    a.push(c), s.push(d);
    const h = n?.[l];
    h && r.push(h);
  });
  const i = a[0];
  return a.length === 1 && i && !wt(e) ? i : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: Fa(a.length, s),
    ...$e(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function bd(e) {
  if (e.panels.every(_e)) return e;
  const t = Re(e), n = Ge(e), a = [], s = [];
  e.panels.forEach((o, l) => {
    const c = n?.[l];
    if (_e(o)) {
      a.push(o), c && s.push(c);
      return;
    }
    const d = Ce(o);
    if (!Zn(d)) {
      if (Y(d) && !wt(d) && !Ge(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), c && s.push(c);
    }
  });
  const r = a[0];
  if (a.length === 1 && r !== void 0 && !_e(r) && !wt(e))
    return r;
  if (a.length === e.panels.length && a.every((o, l) => o === e.panels[l]))
    return e;
  const i = t && a.some((o) => rn(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...i ? { active: i } : {},
    ...$e(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function _t(e, t) {
  if (re(e)) {
    const i = e.frames.flatMap((o) => {
      const l = _t(o.node, t);
      return l ? [l === o.node ? o : { ...o, node: l }] : [];
    });
    return i.length === 0 && !Qn(e) ? null : { ...e, frames: i };
  }
  if (Y(e)) {
    if (!de(e, t)) return e;
    const i = $t(e), o = [];
    for (const d of e.panels) {
      if (_e(d)) {
        d !== t && o.push(d);
        continue;
      }
      const h = _t(d, t);
      h && o.push(h);
    }
    if (o.length === 0) return null;
    const c = e.active && o.some((d) => rn(d).includes(e.active)) ? e.active : Re(o[i] ?? o[o.length - 1]);
    return c ? { kind: "group", panels: o, active: c, ...$e(e) } : { kind: "group", panels: o, ...$e(e) };
  }
  const n = rt(e), a = [], s = [];
  if (e.children.forEach((i, o) => {
    const l = _t(i, t);
    l && (a.push(l), s.push(n[o] ?? 0));
  }), a.length === 0)
    return Qn(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...$e(e) } : null;
  const r = a[0];
  return a.length === 1 && r && !wt(e) ? r : Ce({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...$e(e)
  });
}
function Er(e, t, n) {
  const a = e.panels.filter((r) => r !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...$e(e) };
}
function Kt(e, t, n, a, s) {
  const r = (w) => sn(
    w,
    (k) => de(k, n) ? Kt(k, t, n, a, s) : k
  );
  if (a === "float") return e;
  const i = (w) => ln(w, n, (k) => Kt(k, t, n, a, s));
  if (a === "center")
    return Y(e) ? Be(e, n) ? Er(e, t, s) : i(e) : re(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (w) => de(w, n) ? Kt(w, t, n, a, s) : w
      )
    };
  const o = pd(a), l = a === "left" || a === "top", c = (w) => ({
    kind: "split",
    direction: o,
    children: l ? [tt(t), w] : [w, tt(t)],
    sizes: [0.5, 0.5]
  });
  if (Y(e)) return Be(e, n) ? c(e) : i(e);
  if (re(e)) return r(e);
  const d = rt(e), h = e.children.findIndex(
    (w) => Y(w) && Be(w, n)
  );
  if (h >= 0 && e.direction === o) {
    const w = (d[h] ?? 0) / 2, k = [...e.children], $ = [...d];
    return k.splice(l ? h : h + 1, 0, tt(t)), $.splice(h, 1, w, w), {
      kind: "split",
      direction: o,
      children: k,
      sizes: $,
      ...$e(e)
    };
  }
  const y = e.children.map((w) => de(w, n) ? Y(w) && Be(w, n) ? c(w) : Kt(w, t, n, a) : w);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: d,
    ...$e(e)
  };
}
function zt(e, t) {
  if (Y(e)) {
    if (Be(e, t))
      return $r(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((l) => !_e(l) && de(l, t)), r = e.panels[s];
    if (r === void 0 || _e(r)) return e;
    const i = zt(r, t);
    if (i === r && e.active === t) return e;
    const o = [...e.panels];
    return o[s] = i, { ...e, panels: o, active: t };
  }
  if (!de(e, t)) return e;
  if (re(e)) return sn(e, (s) => zt(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const r = zt(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function jt(e, t, n) {
  if (Y(e)) {
    if (!Be(e, t)) return ln(e, t, (c) => jt(c, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const r = [...e.panels];
    r.splice(a, 1), r.splice(s, 0, t);
    const i = Ge(e), o = i ? [...i] : void 0;
    o && o.splice(s, 0, ...o.splice(a, 1));
    const l = Re(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...$e(e),
      ...o ? { places: o } : {}
    };
  }
  return de(e, t) ? re(e) ? sn(e, (a) => jt(a, t, n)) : { ...e, children: e.children.map((a) => jt(a, t, n)) } : e;
}
function _n(e, t, n) {
  if (t === n) return e;
  if (Y(e)) {
    if (!de(e, t) && !de(e, n)) return e;
    const a = (r) => r === t ? n : r === n ? t : r, s = e.panels.map((r) => _e(r) ? a(r) : _n(r, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return re(e) ? sn(e, (a) => _n(a, t, n)) : { ...e, children: e.children.map((a) => _n(a, t, n)) };
}
function fn(e, t, n, a, s) {
  if (a === "float" || !de(e, t) || !de(e, n)) return e;
  const r = At(e, t);
  if (a === "center" && r && Be(r, n)) {
    if (s === void 0) return e;
    const o = r.panels.indexOf(t), l = s > o ? s - 1 : s;
    return l === o ? e : zt(jt(e, t, l), t);
  }
  if (t === n) return e;
  const i = _t(e, t);
  return i ? Ce(Kt(i, t, n, a, s)) : e;
}
function Pr(e, t, n) {
  if (Y(e)) {
    const s = e.panels[t];
    if (s === void 0 || _e(s)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (re(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const r = [...e.frames];
    return r[t] = { ...s, node: n }, { ...e, frames: r };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function on(e, t, n) {
  const a = Tn(e);
  if (!Y(e) && a.some(({ node: s }) => Y(s) && Be(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: r } of a) {
    if (!de(s, t)) continue;
    const i = on(s, t, n);
    return i ? Pr(e, r, i) : null;
  }
  return null;
}
function sp(e, t, n) {
  const a = on(
    e,
    t,
    (s) => Bt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? Ce(a) : e;
}
function Ar(e) {
  return re(e) ? [e] : Ge(e) || wt(e) ? [e] : Y(e) ? [...e.panels] : e.children.flatMap(Ar);
}
function Tr(e, t) {
  if (Y(e)) return e;
  const n = La(e).map(Ar), a = n.flat(), s = t && a.some((i) => rn(i).includes(t)) ? t : void 0, r = $d(e, n);
  return Ce({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...$e(e),
    ...r ? { places: r } : {}
  });
}
function $d(e, t) {
  const n = re(e) ? e.frames.map(({ node: a, ...s }) => s) : Ge(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function xd(e, t) {
  const n = on(e, t, (a) => Tr(a, t));
  return n ? Ce(n) : e;
}
function Na(e, t, n) {
  if (Y(e) && Be(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Tn(e)) {
    if (!de(a, t)) continue;
    const r = Na(a, t, n);
    return r ? Pr(e, s, r) : null;
  }
  return null;
}
function ws(e, t, n) {
  const a = Na(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const r = Ge(s);
    return {
      ...Ta(n, s.panels.map(Ea)),
      ...$e(s),
      ...r ? { places: r } : {}
    };
  });
  return a ? Ce(a) : e;
}
function ea(e, t) {
  if (Y(e)) return e;
  if (re(e)) {
    const s = e.frames.findIndex(
      (o) => Y(o.node) && o.node.panels.includes(t)
    ), r = e.frames[s], i = r && Y(r.node) ? r.node : null;
    if (r && i && i.panels.length > 1) {
      const o = Aa(i.panels.map(Ea), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...o, ...e.frames.slice(s + 1)]
      };
    }
    return sn(e, (o) => ea(o, t));
  }
  if (!de(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = ea(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Cd(e, t, n) {
  const a = At(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const i = ea(e, t);
    return i === e ? e : Ce(i);
  }
  const r = Na(e, t, (i) => ({
    ...Pa(zr(i.panels.map(Ea), Ge(i), n)),
    ...$e(i)
  }));
  return r ? Ce(r) : e;
}
function zr(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : Aa(e, n).frames;
}
function Lr(e, t) {
  return { ...Pa(zr(e.children, Ge(e), t)), ...$e(e) };
}
function rp(e, t, n) {
  const a = on(
    e,
    t,
    (s) => re(s) ? s : Lr(s, n)
  );
  return a ? Ce(a) : Y(e) && Be(e, t) ? Aa([e], n) : e;
}
function Md(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, r) => n(s) - n(r) || a(s) - a(r));
}
function Rr(e, t) {
  const n = Md(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...$e(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function lp(e, t, n = "row") {
  const a = on(
    e,
    t,
    (s) => re(s) ? Rr(s, n) : s
  );
  return a ? Ce(a) : e;
}
function Fr(e) {
  if (re(e)) return null;
  const t = Y(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || _e(t) || Y(t) && t.panels.length === 1 && _e(t.panels[0]) ? null : t;
}
const Sd = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Ed(e, t) {
  const n = Fr(e);
  return n ? t === "inner" ? n : { ...Sd(n), ...$e(e) } : e;
}
function Dt(e) {
  return e.title ? e.title : Y(e) ? "" : re(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Gt(e, t) {
  if (Y(e)) {
    const a = e.panels[$t(e)];
    return a === void 0 ? "" : _e(a) ? t(a) ?? a : Dt(a) || Gt(a, t);
  }
  if (e.title) return e.title;
  if (re(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? Gt(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? Gt(n, t) : "";
}
function dt(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (Bt(n)) n = n.children[a];
    else if (re(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || _e(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function yt(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (re(e)) {
    const l = e.frames[a];
    if (!l) return e;
    const c = yt(l.node, s, n);
    if (c === l.node) return e;
    const d = [...e.frames];
    return d[a] = { ...l, node: c }, { ...e, frames: d };
  }
  if (Y(e)) {
    const l = e.panels[a];
    if (l === void 0 || _e(l)) return e;
    const c = yt(l, s, n);
    if (c === l) return e;
    const d = [...e.panels];
    return d[a] = c, { ...e, panels: d };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = yt(r, s, n);
  if (i === r) return e;
  const o = [...e.children];
  return o[a] = i, { ...e, children: o };
}
function yn(e, t, n) {
  if (t.length === 0)
    return Bt(e) ? { ...e, sizes: Fa(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (re(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const l = yn(o.node, s, n);
    if (l === o.node) return e;
    const c = [...e.frames];
    return c[a] = { ...o, node: l }, { ...e, frames: c };
  }
  if (Y(e)) {
    const o = e.panels[a];
    if (o === void 0 || _e(o)) return e;
    const l = yn(o, s, n);
    if (l === o) return e;
    const c = [...e.panels];
    return c[a] = l, { ...e, panels: c };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = [...e.children];
  return i[a] = yn(r, s, n), { ...e, children: i };
}
function ks(e, t, n, a = 0.02) {
  const s = e[t], r = e[t + 1];
  if (s === void 0 || r === void 0) return e;
  const i = s + r;
  if (i < a * 2) return e;
  const o = [...e], l = Math.min(Math.max(s + n, a), i - a);
  return o[t] = l, o[t + 1] = i - l, o;
}
function Cn(e) {
  if (!Y(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !_e(t) ? e : { ...za([Pd(e)]), ...$e(e) };
}
const Pd = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function bs(e) {
  return e.length === 0 ? null : za(e.map(tt));
}
function Ad(e, t) {
  if (!e) return bs(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const l of lt(e))
    !n.has(l) || a.has(l) ? s.add(l) : a.add(l);
  let r = e;
  for (const l of s)
    r = r ? _t(r, l) : null;
  const i = new Set(r ? lt(r) : []), o = t.filter((l) => !i.has(l));
  if (o.length === 0) return r ? Cn(Ce(r)) : null;
  if (!r) return bs(o);
  if (re(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...o.map(
          (c, d) => An(tt(c), {
            x: gt.x + (l + d) * xn,
            y: gt.y + (l + d) * xn
          })
        )
      ]
    };
  }
  return Cn(Ce(za([r, ...o.map(tt)])));
}
const Ia = Symbol("dc.windowContext");
function Td(e) {
  return sa(Ia, e), e;
}
function zn() {
  const e = Rt(Ia, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const zd = ["data-dc-glyph"], Ld = { class: "dc-glyph__line" }, Rd = ["d"], Fd = {
  key: 0,
  class: "dc-glyph__aqua"
}, Nd = ["d"], Id = /* @__PURE__ */ oe({
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
    return (a, s) => (f(), m("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      C("g", Ld, [
        (f(!0), m(ne, null, ve(t[e.kind], (r) => (f(), m("path", {
          key: r,
          d: r
        }, null, 8, Rd))), 128))
      ]),
      n[e.kind] ? (f(), m("g", Fd, [
        (f(!0), m(ne, null, ve(n[e.kind], (r) => (f(), m("path", {
          key: r,
          d: r
        }, null, 8, Nd))), 128))
      ])) : z("", !0)
    ], 8, zd));
  }
}), Lt = /* @__PURE__ */ ce(Id, [["__scopeId", "data-v-4d2872c0"]]), Od = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Dd = ["data-dc-movable"], Bd = { class: "dc-float__title dc-truncate" }, qd = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Vd = ["aria-label", "aria-pressed", "data-dc-minimize"], Kd = ["aria-label", "aria-pressed", "data-dc-maximize"], Wd = ["aria-label", "data-dc-close"], Ud = { class: "dc-float__content" }, Hd = ["data-dc-handle", "onPointerdown"], jd = /* @__PURE__ */ oe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = zn(), a = v(() => Re(t.frame.node)), s = v(() => n.panelFor(a.value)?.fixed === !0), r = v(() => it(t.frame)), i = v(() => mt(t.frame)), o = v(() => r.value || i.value), l = v(() => n.resizable.value && !s.value && !o.value), c = v(() => n.movable.value && !s.value && !o.value), d = v(() => {
      const E = lt(t.frame.node);
      return E.length === 1 ? E[0] ?? null : null;
    }), h = v(() => d.value !== null && n.closable(d.value)), y = v(() => t.frame.node.headless === !0), w = v(
      () => !y.value && (!Y(t.frame.node) || i.value)
    ), k = v(
      () => t.frame.title || Dt(t.frame.node) || Gt(t.frame.node, (E) => n.panelFor(E)?.title)
    ), $ = v(() => n.spaceMenu(t.path));
    function _(E) {
      E.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, E, "move");
    }
    function x(E) {
      E.target?.closest("button, a, input, select, textarea, label") || (i.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const L = v(() => {
      const E = n.framing.value;
      return E !== null && de(t.frame.node, E);
    }), D = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : i.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Yn}px`,
        height: `${kr}px`
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
    return (E, V) => (f(), m("div", {
      class: "dc-float",
      style: Ee(D.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": i.value ? "true" : "false",
      "data-dc-dragging": L.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (P) => A(n).raiseAt(e.path))
    }, [
      w.value ? (f(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: _,
        onDblclick: x
      }, [
        C("span", Bd, N(k.value), 1),
        $.value.length ? (f(), te(Sa, {
          key: 0,
          items: $.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : z("", !0),
        !s.value || i.value && h.value && d.value ? (f(), m("div", qd, [
          s.value ? z("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${i.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": i.value,
            "data-dc-minimize": a.value,
            onClick: V[0] || (V[0] = (P) => A(n).toggleMinimizeAt(e.path))
          }, [
            pe(Lt, {
              kind: i.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Vd)),
          s.value ? z("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": a.value,
            onClick: V[1] || (V[1] = (P) => A(n).toggleMaximizeAt(e.path))
          }, [
            pe(Lt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Kd)),
          i.value && h.value && d.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": d.value,
            onClick: V[2] || (V[2] = (P) => A(n).close(d.value))
          }, [
            pe(Lt, { kind: "close" })
          ], 8, Wd)) : z("", !0)
        ])) : z("", !0)
      ], 40, Dd)) : z("", !0),
      C("div", Ud, [
        xe(E.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(ne, null, ve(l.value ? M : [], (P) => (f(), m("span", {
        key: P,
        class: "dc-float__grip",
        "data-dc-handle": P,
        "aria-hidden": "true",
        onPointerdown: Fe((b) => A(n).beginFrameDragAt(e.path, b, P), ["stop"])
      }, null, 40, Hd))), 128))
    ], 44, Od));
  }
}), Gd = /* @__PURE__ */ ce(jd, [["__scopeId", "data-v-f035684c"]]), Oa = Symbol("dc.paneContext");
function Nr(e) {
  return sa(Oa, e), e;
}
function op() {
  return Rt(Oa, null);
}
function ip(e) {
  const t = Rt(Ia, null), n = Rt(Oa, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => St(e)
  );
  return la() && Mn(a), a;
}
const Xd = ["data-dc-panel"], Yd = /* @__PURE__ */ oe({
  __name: "WindowPaneBody",
  props: {
    panel: {},
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, n = zn();
    Nr({ panel: v(() => t.panel) });
    const a = () => {
      const s = n.panelFor(t.panel);
      return s ? n.renderContent(s, n.viewFor(t.panel), t.active) ?? null : null;
    };
    return (s, r) => (f(), m("div", {
      class: "dc-pane__content",
      "data-dc-panel": t.panel
    }, [
      pe(a)
    ], 8, Xd));
  }
}), Qd = /* @__PURE__ */ ce(Yd, [["__scopeId", "data-v-31c655fd"]]), Zd = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Jd = ["data-dc-movable"], ef = ["aria-label", "aria-pressed"], tf = ["data-dc-space-name"], nf = { class: "dc-truncate" }, af = ["aria-label"], sf = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, rf = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], lf = { class: "dc-tab__name dc-truncate" }, of = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, cf = ["aria-label", "data-dc-close", "onClick"], uf = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, df = { class: "dc-pane__tools" }, ff = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, pf = ["aria-label", "data-dc-minimize"], vf = ["aria-label", "aria-pressed", "data-dc-maximize"], hf = ["aria-label", "data-dc-close"], mf = ["id", "role", "aria-labelledby"], gf = ["id", "role", "aria-labelledby"], _f = ["data-dc-edge"], yf = /* @__PURE__ */ oe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = zn(), a = ra() ?? "dc-pane", s = v(
      () => t.group.panels.flatMap((O, H) => {
        if (!_e(O)) {
          const Ae = Dt(O) || Gt(O, (ze) => n.panelFor(ze)?.title);
          return [{ kind: "space", index: H, id: `space-${H}`, title: Ae, node: O }];
        }
        const Q = n.panelFor(O);
        return Q ? [{ kind: "panel", index: H, id: O, title: Q.title, panel: Q }] : [];
      })
    ), r = v(() => s.value.length > 1), i = v(() => {
      const O = $t(t.group);
      return s.value.find((H) => H.index === O) ?? s.value[0] ?? null;
    }), o = v(() => i.value?.kind === "space" ? i.value.node : null), l = v(() => o.value ? "" : $r(t.group)), c = v(() => o.value ? null : n.panelFor(l.value)), d = v(() => i.value?.title ?? ""), h = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = v(() => [...t.path, i.value?.index ?? 0]), w = v(() => l.value || hs(t.group)[0] || ""), k = v(() => n.viewFor(l.value)), $ = v(() => t.group.headless === !0), _ = v(() => n.focused.value === l.value), x = v(() => n.dragging.value === l.value), L = v(() => n.moving.value === l.value), D = v(() => n.frameOf(w.value) !== null), M = v(() => n.panelFor(w.value)?.fixed === !0), E = v(
      () => !o.value && (n.canMove(l.value) || D.value && n.movable.value && !M.value)
    ), V = v(
      () => o.value ? n.spaceMenu(y.value) : n.menuFor(l.value)
    ), P = (O) => n.closable(O);
    Nr({ panel: l });
    const b = v(() => n.maximized(w.value)), K = v(
      () => D.value && !M.value || !r.value && !!c.value && P(c.value.id)
    ), R = (O) => `${a}-tab-${O}`, Z = v(() => `${a}-body`), X = v(() => {
      const O = n.dropTarget.value;
      return !O || !Be(t.group, O.panel) || O.edge === "float" ? null : O;
    }), ye = v(() => X.value?.index === void 0 ? X.value?.edge ?? null : null), ue = v(() => X.value?.index ?? null), S = v(
      () => s.value.flatMap(
        (O) => O.kind === "panel" && (O.id === l.value || O.panel.keepAlive === !0) ? [O.id] : []
      )
    ), I = W(null), j = /* @__PURE__ */ new Map();
    ke(
      l,
      (O, H) => {
        const Q = I.value;
        if (!Q || (H && j.set(H, Q.scrollTop), !n.panelFor(O)?.keepAlive || !j.has(O))) return;
        const Ae = j.get(O);
        Nt(() => {
          I.value && (I.value.scrollTop = Ae);
        });
      },
      { flush: "pre" }
    );
    const le = () => c.value ? n.renderActions(c.value, k.value, _.value) ?? null : null;
    let ge = null;
    function Pe(O) {
      const H = ge !== null && Math.hypot(O.clientX - ge.x, O.clientY - ge.y) >= 4;
      return ge = null, H;
    }
    const Te = (O) => O.kind === "panel" ? O.id : Re(O.node);
    function Xe(O, H) {
      H.kind !== "space" && (n.focus(H.id), ge = { x: O.clientX, y: O.clientY }, n.beginDrag(H.id, O));
    }
    function Ye(O, H) {
      if (Pe(O)) return;
      const Q = Te(H);
      Q && n.selectPanel(Q);
    }
    function Qe(O) {
      l.value && n.focus(l.value), !O.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (D.value ? n.beginFrameDrag(w.value, O, "move") : n.beginDrag(l.value, O));
    }
    function We(O) {
      ge = { x: O.clientX, y: O.clientY }, n.beginDrag(l.value, O);
    }
    function Ie(O) {
      Pe(O) || n.toggleMoveMode(l.value);
    }
    const Ue = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function B(O) {
      if (!L.value) return;
      if (O.key === "Escape") {
        O.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const H = Ue[O.key];
      H && (O.preventDefault(), D.value ? n.nudgeFrame(l.value, H, O.shiftKey) : n.nudge(l.value, H, O.shiftKey));
    }
    function J(O) {
      !D.value || O.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(w.value);
    }
    function G(O, H) {
      O.stopPropagation(), ge = null, n.close(H);
    }
    function Oe(O, H) {
      const Q = s.value.length;
      let Ae = null;
      if (O.key === "ArrowRight" ? Ae = (H + 1) % Q : O.key === "ArrowLeft" ? Ae = (H - 1 + Q) % Q : O.key === "Home" ? Ae = 0 : O.key === "End" && (Ae = Q - 1), Ae === null) return;
      O.preventDefault();
      const ze = s.value[Ae];
      if (!ze) return;
      const qt = Te(ze);
      qt && n.selectPanel(qt);
    }
    return (O, H) => i.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": A(hs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": D.value ? "true" : "false",
      "data-dc-maximized": b.value ? "true" : "false",
      "data-dc-headless": $.value ? "true" : "false",
      "data-dc-active": _.value ? "true" : "false",
      "data-dc-dragging": x.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: H[7] || (H[7] = (Q) => l.value && A(n).focus(l.value))
    }, [
      $.value ? z("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": E.value ? "true" : "false",
        onPointerdown: Qe,
        onDblclick: J
      }, [
        E.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": L.value,
          onPointerdown: We,
          onClick: Ie,
          onKeydown: B
        }, [...H[8] || (H[8] = [
          C("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, ef)) : z("", !0),
        h.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          C("span", nf, N(h.value), 1)
        ], 8, tf)) : z("", !0),
        C("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), m(ne, null, ve(s.value, (Q, Ae) => (f(), m(ne, {
            key: Q.id
          }, [
            ue.value === Ae ? (f(), m("span", sf)) : z("", !0),
            C("button", {
              id: R(Q.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": Q.kind === "panel" ? Q.id : void 0,
              "data-dc-space": Q.kind === "space" ? Q.title : void 0,
              "aria-selected": Q.index === i.value.index,
              "aria-controls": Z.value,
              tabindex: Q.index === i.value.index ? 0 : -1,
              onPointerdown: (ze) => Xe(ze, Q),
              onClick: (ze) => Ye(ze, Q),
              onKeydown: (ze) => Oe(ze, Ae)
            }, [
              C("span", lf, N(Q.title), 1),
              Q.kind === "panel" && Q.panel.subtitle ? (f(), m("span", of, N(Q.panel.subtitle), 1)) : z("", !0),
              r.value && Q.kind === "panel" && P(Q.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${Q.title}`,
                "data-dc-close": Q.id,
                onPointerdown: H[0] || (H[0] = Fe(() => {
                }, ["stop"])),
                onClick: (ze) => G(ze, Q.id)
              }, [...H[9] || (H[9] = [
                C("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, cf)) : z("", !0)
            ], 40, rf)
          ], 64))), 128)),
          ue.value === s.value.length ? (f(), m("span", uf)) : z("", !0)
        ], 8, af),
        C("div", df, [
          pe(le),
          V.value.length ? (f(), te(Sa, {
            key: 0,
            items: V.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : z("", !0)
        ]),
        K.value ? (f(), m("div", ff, [
          D.value && !M.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": w.value,
            onPointerdown: H[1] || (H[1] = Fe(() => {
            }, ["stop"])),
            onClick: H[2] || (H[2] = (Q) => A(n).toggleMinimize(w.value))
          }, [
            pe(Lt, { kind: "minimize" })
          ], 40, pf)) : z("", !0),
          D.value && !M.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${b.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": b.value,
            "data-dc-maximize": w.value,
            onPointerdown: H[3] || (H[3] = Fe(() => {
            }, ["stop"])),
            onClick: H[4] || (H[4] = (Q) => A(n).toggleMaximize(w.value))
          }, [
            pe(Lt, {
              kind: b.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, vf)) : z("", !0),
          !r.value && c.value && P(c.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: H[5] || (H[5] = Fe(() => {
            }, ["stop"])),
            onClick: H[6] || (H[6] = (Q) => A(n).close(c.value.id))
          }, [
            pe(Lt, { kind: "close" })
          ], 40, hf)) : z("", !0)
        ])) : z("", !0)
      ], 40, Jd)),
      o.value ? (f(), m("div", {
        key: 1,
        id: Z.value,
        class: "dc-pane__space",
        role: $.value ? void 0 : "tabpanel",
        "aria-labelledby": $.value ? void 0 : R(i.value.id)
      }, [
        xe(O.$slots, "space", {
          node: o.value,
          path: y.value
        }, void 0, !0)
      ], 8, mf)) : z("", !0),
      !o.value || S.value.length ? It((f(), m("div", {
        key: 2,
        id: o.value ? void 0 : Z.value,
        ref_key: "body",
        ref: I,
        class: "dc-pane__body",
        role: $.value || o.value ? void 0 : "tabpanel",
        "aria-labelledby": $.value || o.value ? void 0 : R(l.value)
      }, [
        (f(!0), m(ne, null, ve(S.value, (Q) => It((f(), te(Qd, {
          key: Q,
          panel: Q,
          active: Q === l.value && _.value
        }, null, 8, ["panel", "active"])), [
          [Ga, Q === l.value]
        ])), 128))
      ], 8, gf)), [
        [Ga, !o.value]
      ]) : z("", !0),
      ye.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ye.value,
        "aria-hidden": "true"
      }, null, 8, _f)) : z("", !0)
    ], 40, Zd)) : z("", !0);
  }
}), Ir = /* @__PURE__ */ ce(yf, [["__scopeId", "data-v-2c3c5ecf"]]), wf = ["data-dc-space", "data-dc-path", "aria-label"], kf = {
  key: 0,
  class: "dc-space__head"
}, bf = { class: "dc-space__title dc-truncate" }, $f = ["data-dc-direction"], xf = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Cf = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Mf = /* @__PURE__ */ oe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = zn(), a = W(null), s = v(() => Y(t.node) ? t.node : null), r = v(() => Bt(t.node) ? t.node : null), i = v(() => re(t.node) ? t.node : null), o = v(
      () => r.value ? r.value.children : i.value?.frames.map((S) => S.node) ?? []
    ), l = v(() => r.value ? rt(r.value) : []), c = v(
      () => (i.value?.frames ?? []).map((S, I) => ({
        held: S,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: I,
        key: P(S.node),
        path: [...t.path, I]
      })).sort((S, I) => S.key < I.key ? -1 : S.key > I.key ? 1 : 0)
    ), d = v(() => Dt(t.node)), h = v(() => n.spaceMenu(t.path)), y = v(() => t.node.headless === !0), w = v(() => i.value ? "desktop" : r.value?.direction ?? ""), k = W(null), $ = W(0);
    let _ = null;
    ke(
      k,
      (S) => {
        _?.disconnect(), _ = null, !(!S || typeof ResizeObserver > "u") && ($.value = S.clientWidth, _ = new ResizeObserver(([I]) => {
          $.value = I?.contentRect.width ?? 0;
        }), _.observe(S));
      },
      { immediate: !0 }
    ), Ve(() => _?.disconnect());
    const x = v(() => {
      const S = Math.max(
        1,
        Math.floor(($.value + Ct) / (Yn + Ct))
      ), I = /* @__PURE__ */ new Map();
      let j = 0;
      for (const le of c.value)
        le.held.minimized === !0 && (I.set(le.key, {
          x: Ct + j % S * (Yn + Ct),
          bottom: Ct + Math.floor(j / S) * (kr + Ct)
        }), j += 1);
      return I;
    }), L = (S) => !!S && S.join("/") === t.path.join("/"), D = v(() => {
      const S = n.dropTarget.value, I = i.value;
      if (!I || !S?.rect || S.edge !== "float") return null;
      if (S.space) return L(S.space) ? S.rect : null;
      const j = Se(I, S.panel);
      return j && I.frames.includes(j) ? S.rect : null;
    }), M = v(() => {
      const S = n.dropTarget.value;
      return !!S && !S.rect && L(S.space);
    }), E = v(() => r.value?.direction === "row"), V = v(() => o.value.map((S, I) => [...t.path, I])), P = (S) => [...lt(S)].sort().join("/"), b = (S) => {
      const I = lt(S)[0];
      return (I ? n.panelFor(I)?.title : null) ?? I ?? "panel";
    }, K = (S) => {
      const I = o.value[S], j = o.value[S + 1];
      return !I || !j ? "Resize panels" : `Resize ${b(I)} and ${b(j)}`;
    }, R = (S) => {
      const I = l.value[S] ?? 0, j = l.value[S + 1] ?? 0, le = I + j;
      return le > 0 ? Math.round(I / le * 100) : 50;
    };
    function Z() {
      const S = a.value, I = S ? E.value ? S.clientWidth : S.clientHeight : 0;
      return I <= 0 ? 0.05 : Math.min(n.minPanelSize.value / I, 0.4);
    }
    let X = null;
    function ye(S, I) {
      const j = r.value, le = a.value;
      if (!n.resizable.value || !j || !le || S.button !== 0) return;
      const ge = E.value ? le.clientWidth : le.clientHeight;
      if (ge <= 0) return;
      const Pe = E.value ? S.clientX : S.clientY, Te = rt(j), Xe = Math.min(n.minPanelSize.value / ge, 0.4);
      S.preventDefault();
      const Ye = (Ie) => {
        const Ue = ((E.value ? Ie.clientX : Ie.clientY) - Pe) / ge;
        n.setSizes(t.path, ks(Te, I, Ue, Xe));
      }, Qe = () => X?.(), We = (Ie) => {
        Ie.key === "Escape" && (n.setSizes(t.path, Te), X?.());
      };
      X = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Qe), window.removeEventListener("pointercancel", Qe), window.removeEventListener("keydown", We), X = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Qe), window.addEventListener("pointercancel", Qe), window.addEventListener("keydown", We);
    }
    Ve(() => X?.());
    function ue(S, I) {
      const j = r.value;
      if (!n.resizable.value || !j) return;
      const le = E.value ? "ArrowRight" : "ArrowDown", ge = E.value ? "ArrowLeft" : "ArrowUp", Pe = S.shiftKey ? 0.1 : 0.02;
      if (S.key !== le && S.key !== ge) return;
      const Te = S.key === le ? Pe : -Pe;
      S.preventDefault(), n.setSizes(t.path, ks(rt(j), I, Te, Z()));
    }
    return (S, I) => {
      const j = Es("WindowNode", !0);
      return s.value ? (f(), te(Ir, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: et(({ node: le, path: ge }) => [
          pe(j, {
            node: le,
            path: ge,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), m("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": w.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !y.value ? (f(), m("header", kf, [
          C("span", bf, N(d.value), 1),
          h.value.length ? (f(), te(Sa, {
            key: 0,
            items: h.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : z("", !0)
        ])) : z("", !0),
        i.value ? (f(), m("div", {
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
          }, null, 4)) : z("", !0),
          (f(!0), m(ne, null, ve(c.value, (le) => (f(), te(Gd, {
            key: le.key,
            frame: le.held,
            path: le.path,
            order: le.order,
            place: x.value.get(le.key) ?? null
          }, {
            default: et(() => [
              pe(j, {
                node: le.held.node,
                path: le.path,
                framed: le.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (f(), m("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          M.value ? (f(), m("div", xf)) : z("", !0),
          (f(!0), m(ne, null, ve(o.value, (le, ge) => (f(), m(ne, {
            key: P(le)
          }, [
            C("div", {
              class: "dc-window__cell",
              style: Ee({ flexGrow: l.value[ge] ?? 1 })
            }, [
              pe(j, {
                node: le,
                path: V.value[ge] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ge < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": E.value ? "vertical" : "horizontal",
              "aria-label": K(ge),
              "aria-valuenow": R(ge),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": A(n).resizable.value ? void 0 : "true",
              tabindex: A(n).resizable.value ? 0 : -1,
              onPointerdown: (Pe) => ye(Pe, ge),
              onKeydown: (Pe) => ue(Pe, ge)
            }, null, 40, Cf)) : z("", !0)
          ], 64))), 128))
        ], 8, $f)) : z("", !0)
      ], 8, wf));
    };
  }
}), Sf = /* @__PURE__ */ ce(Mf, [["__scopeId", "data-v-fb5b403f"]]), Ef = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Pf = {
  key: 1,
  class: "dc-window__empty"
}, Af = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, pn = 16, Tf = /* @__PURE__ */ oe({
  __name: "WindowFrame",
  props: /* @__PURE__ */ bn({
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
  emits: /* @__PURE__ */ bn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Wt(e, "layout"), i = Wt(e, "views"), o = Zt(), l = v(() => new Map(a.panels.map((u) => [u.id, u]))), c = v(() => a.panels.map((u) => u.id)), d = v(() => Ad(r.value, c.value)), h = W(null), y = W(null), w = W(null), k = W(!0), $ = W(null), _ = W(null), x = W(null), L = W(""), D = W(null);
    function M() {
      const u = D.value;
      return u ? [...u.querySelectorAll(".dc-pane[data-dc-panels]")].filter((g) => g.closest(".dc-window") === u).map((g) => ({ panels: (g.dataset.dcPanels ?? "").split(" "), element: g })) : [];
    }
    function E(u) {
      const p = [];
      let g = u.closest(".dc-float");
      for (; g; )
        p.unshift(Number(g.dataset.dcOrder ?? 0)), g = g.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function V() {
      return M().map((u) => ({ pane: u, order: E(u.element) })).sort((u, p) => {
        const g = Math.max(u.order.length, p.order.length);
        for (let T = 0; T < g; T += 1) {
          const F = (u.order[T] ?? -1) - (p.order[T] ?? -1);
          if (F !== 0) return F;
        }
        return 0;
      }).map((u) => u.pane);
    }
    const P = (u) => M().find((p) => p.panels.includes(u)) ?? null;
    function b(u) {
      const p = l.value.get(u);
      if (!p) return "";
      const g = i.value[u];
      return g && p.views?.some((T) => T.key === g) ? g : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function K(u, p) {
      i.value = { ...i.value, [u]: p }, s("view-change", { panel: u, view: p });
    }
    const R = v(
      () => a.panels.filter((u) => u.fixed !== !0).length
    );
    function Z(u) {
      return !a.movable || R.value < 1 || a.panels.length < 2 ? !1 : l.value.get(u)?.fixed !== !0;
    }
    function X(u, p) {
      const g = d.value;
      !u || !g || u === g || (r.value = u, p && s("panel-move", p));
    }
    function ye(u, p, g) {
      if (u.width <= 0 || u.height <= 0) return "center";
      const T = (p - u.left) / u.width, F = (g - u.top) / u.height, q = 0.3;
      return T > q && T < 1 - q && F > q && F < 1 - q ? "center" : [
        { edge: "left", distance: T },
        { edge: "right", distance: 1 - T },
        { edge: "top", distance: F },
        { edge: "bottom", distance: 1 - F }
      ].reduce(
        (ie, U) => U.distance < ie.distance ? U : ie
      ).edge;
    }
    function ue(u, p) {
      const g = [...u.querySelectorAll(".dc-tab")], T = g.findIndex((F) => {
        const q = F.getBoundingClientRect();
        return p < q.left + q.width / 2;
      });
      return T === -1 ? g.length : T;
    }
    function S(u, p, g) {
      for (const { panels: T, element: F } of V().reverse()) {
        const q = F.getBoundingClientRect();
        if (u < q.left || u > q.right || p < q.top || p > q.bottom) continue;
        const he = T.find((ae) => ae !== g), ie = F.querySelector(".dc-pane__tabs"), U = ie?.getBoundingClientRect();
        if (ie && U && p >= U.top && p <= U.bottom)
          return he ? { panel: he, edge: "center", index: ue(ie, u) } : null;
        const ee = F.querySelector(":scope > .dc-pane__space");
        if (ee) {
          const ae = ee.getBoundingClientRect();
          if (u >= ae.left && u <= ae.right && p >= ae.top && p <= ae.bottom) continue;
        }
        return he ? { panel: he, edge: ye(q, u, p) } : null;
      }
      return j(u, p, g) ?? Pe(u, p);
    }
    function I() {
      const u = D.value;
      return u ? [...u.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === u).reverse() : [];
    }
    function j(u, p, g) {
      const T = d.value;
      if (!T) return null;
      for (const F of I()) {
        const q = F.getBoundingClientRect();
        if (u < q.left || u > q.right || p < q.top || p > q.bottom) continue;
        const he = Te(F), ie = he.flatMap((fe) => fe.panels).find((fe) => fe !== g);
        if (!ie && he.length > 0) return null;
        const U = Se(T, g)?.rect, ee = Dn(
          {
            x: u - q.left - 24,
            y: p - q.top - 12,
            w: U?.w ?? gt.w,
            h: U?.h ?? gt.h
          },
          { w: F.clientWidth, h: F.clientHeight },
          a.minPanelSize
        );
        if (ie) return { panel: ie, edge: "float", rect: ee };
        const ae = le(F);
        return ae ? { panel: "", space: ae, edge: "float", rect: ee } : null;
      }
      return null;
    }
    function le(u) {
      const p = u.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function ge() {
      const u = D.value;
      return u ? [...u.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === u).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const g = le(p);
        return g ? [{ element: p, path: g }] : [];
      }) : [];
    }
    function Pe(u, p) {
      for (const { element: g, path: T } of ge()) {
        if (g.dataset.dcSpace === "desktop") continue;
        const F = g.getBoundingClientRect();
        if (!(u < F.left || u > F.right || p < F.top || p > F.bottom))
          return { panel: "", space: T, edge: "center" };
      }
      return null;
    }
    function Te(u) {
      return M().filter(
        (p) => p.element.closest(".dc-window__desktop") === u
      );
    }
    let Xe = null;
    const Ye = (u) => u.altKey;
    function Qe(u, p) {
      if (!Z(u) || y.value || _.value || p.button !== 0) return;
      const g = p.clientX, T = p.clientY;
      let F = !1, q = Ye(p);
      const he = () => {
        const me = x.value;
        me && (w.value = q ? j(me.x, me.y, u) : S(me.x, me.y, u));
      }, ie = (me) => {
        if (!F) {
          if (Math.hypot(me.clientX - g, me.clientY - T) < 4) return;
          F = !0, y.value = u, $.value = null;
        }
        q = Ye(me), k.value = !q, x.value = { x: me.clientX, y: me.clientY }, he();
      }, U = (me) => {
        Ye(me) !== q && (q = !q, k.value = !q, F && he());
      }, ee = (me) => {
        Xe?.();
        const se = w.value, Le = d.value;
        if (me && F && se && Le) {
          const ot = se.space ? ys(Le, u, se.space, se.rect) : se.edge === "float" && se.rect ? _s(Le, u, se.panel, se.rect) : fn(Le, u, se.panel, se.edge, se.index);
          X(ot, {
            panel: u,
            target: se.panel,
            edge: se.edge,
            ...se.space === void 0 ? {} : { space: se.space },
            ...se.index === void 0 ? {} : { index: se.index },
            ...se.rect === void 0 ? {} : { rect: se.rect }
          });
        }
        y.value = null, w.value = null, x.value = null, k.value = !0;
      }, ae = () => ee(!0), fe = () => ee(!1), we = (me) => {
        if (me.key === "Escape") {
          ee(!1);
          return;
        }
        U(me);
      };
      Xe = () => {
        window.removeEventListener("pointermove", ie), window.removeEventListener("pointerup", ae), window.removeEventListener("pointercancel", fe), window.removeEventListener("keydown", we), window.removeEventListener("keyup", U), Xe = null;
      }, window.addEventListener("pointermove", ie), window.addEventListener("pointerup", ae), window.addEventListener("pointercancel", fe), window.addEventListener("keydown", we), window.addEventListener("keyup", U);
    }
    Ve(() => Xe?.());
    let We = null;
    function Ie(u) {
      const p = D.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${u.join("/")}"]`
      )].find((F) => F.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ue(u) {
      const p = d.value;
      return p ? Jn(p, u) : null;
    }
    function B(u) {
      const p = d.value;
      if (!p) return;
      const g = Ht(p, u);
      g !== p && (r.value = g);
    }
    function J(u) {
      const p = Ue(u);
      p && B(p);
    }
    function G(u) {
      const p = d.value, g = p ? Se(p, u) : null;
      return g !== null && it(g);
    }
    function Oe(u) {
      const p = d.value, g = p ? Se(p, u) : null;
      return g !== null && mt(g);
    }
    function O(u) {
      const p = d.value, g = p ? ht(p, u) : null;
      return g ? Re(g.node) : "";
    }
    function H(u) {
      const p = d.value, g = p ? ht(p, u) : null;
      if (!p || !g) return;
      const T = Re(g.node);
      if (l.value.get(T)?.fixed === !0) return;
      const F = !mt(g);
      let q = yd(p, u, F);
      q !== p && (F || (q = Ht(q, u)), r.value = q, s("frame-minimize", { panel: T, minimized: F }));
    }
    function Q(u) {
      const p = Ue(u);
      p && H(p);
    }
    function Ae(u) {
      const p = d.value, g = p ? ht(p, u) : null;
      if (!p || !g) return;
      const T = Re(g.node);
      if (l.value.get(T)?.fixed === !0) return;
      const F = !it(g);
      let q = _d(p, u, F);
      q !== p && (F && (q = Ht(q, u)), r.value = q, s("frame-maximize", { panel: T, maximized: F }));
    }
    function ze(u) {
      const p = Ue(u);
      p && Ae(p);
    }
    function qt(u, p, g) {
      const T = d.value, F = T ? ht(T, u) : null;
      if (!T || !F || p.button !== 0 || y.value || _.value) return;
      const q = Re(F.node);
      if (l.value.get(q)?.fixed === !0 || it(F) || mt(F) || (g === "move" ? !a.movable : !a.resizable)) return;
      const he = Ie(u), ie = wd(T, u);
      B(u);
      const U = { w: he?.clientWidth ?? 0, h: he?.clientHeight ?? 0 }, ee = { ...F.rect }, ae = p.clientX, fe = p.clientY, we = a.minPanelSize;
      _.value = q;
      const me = (De) => {
        const nt = d.value;
        if (!nt) return;
        const Vt = gs(nt, ie, Dn(De, U, we));
        Vt !== nt && (r.value = Vt);
      }, se = (De) => {
        De.preventDefault();
        const nt = De.clientX - ae, Vt = De.clientY - fe;
        me(
          g === "move" ? { ...ee, x: ee.x + nt, y: ee.y + Vt } : ms(ee, g, nt, Vt, we)
        );
      }, Le = (De) => {
        if (We?.(), _.value = null, !De) {
          me(ee);
          return;
        }
        const nt = d.value ? ht(d.value, ie) : null;
        nt && s("frame-change", { panel: O(ie), rect: nt.rect });
      }, ot = () => Le(!0), pt = () => Le(!1), vt = (De) => {
        De.key === "Escape" && Le(!1);
      };
      We = () => {
        window.removeEventListener("pointermove", se), window.removeEventListener("pointerup", ot), window.removeEventListener("pointercancel", pt), window.removeEventListener("keydown", vt), We = null;
      }, window.addEventListener("pointermove", se), window.addEventListener("pointerup", ot), window.addEventListener("pointercancel", pt), window.addEventListener("keydown", vt);
    }
    function Vr(u, p, g) {
      const T = Ue(u);
      T && qt(T, p, g);
    }
    function Kr(u, p, g = !1) {
      const T = d.value, F = Ue(u), q = T && F ? ht(T, F) : null;
      if (!T || !F || !q || l.value.get(u)?.fixed === !0 || (g ? !a.resizable : !a.movable)) return;
      if (it(q) || mt(q)) {
        L.value = `${Ze(u)} is ${it(q) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const he = p === "left" ? -pn : p === "right" ? pn : 0, ie = p === "up" ? -pn : p === "down" ? pn : 0, U = Ie(F), ee = { w: U?.clientWidth ?? 0, h: U?.clientHeight ?? 0 }, ae = g ? ms(q.rect, "se", he, ie, a.minPanelSize) : { ...q.rect, x: q.rect.x + he, y: q.rect.y + ie }, fe = gs(T, F, Dn(ae, ee, a.minPanelSize));
      if (fe === T) {
        L.value = g ? `${Ze(u)} cannot be resized further.` : `${Ze(u)} cannot move ${p}.`;
        return;
      }
      r.value = fe;
      const we = ht(fe, F);
      we && (s("frame-change", { panel: u, rect: we.rect }), L.value = g ? `${Ze(u)} resized to ${we.rect.w} by ${we.rect.h}.` : `${Ze(u)} moved to ${we.rect.x}, ${we.rect.y}.`);
    }
    Ve(() => We?.());
    function Wr(u, p) {
      const g = P(u), T = g?.element.getBoundingClientRect();
      if (!g || !T) return null;
      const F = p === "left" || p === "right", q = (U) => {
        if (!(F ? U.bottom > T.top + 1 && U.top < T.bottom - 1 : U.right > T.left + 1 && U.left < T.right - 1)) return null;
        const ae = p === "left" ? T.left - U.right : p === "right" ? U.left - T.right : p === "up" ? T.top - U.bottom : U.top - T.bottom;
        return ae < -1 ? null : ae;
      }, he = [];
      for (const U of M()) {
        if (U === g || U.element === g.element) continue;
        const ee = q(U.element.getBoundingClientRect());
        if (ee === null) continue;
        const ae = U.panels.find((fe) => fe !== u);
        ae && he.push({ to: { panel: ae }, distance: ee });
      }
      for (const { element: U, path: ee } of ge()) {
        const ae = q(U.getBoundingClientRect());
        ae !== null && he.push({ to: { space: ee }, distance: ae });
      }
      return he.reduce(
        (U, ee) => U && U.distance <= ee.distance ? U : ee,
        null
      )?.to ?? null;
    }
    function Ur(u) {
      const p = d.value ? Se(d.value, u) !== null : !1;
      if (!p && !Z(u)) return;
      $.value = $.value === u ? null : u;
      const g = Ze(u);
      if (!$.value) {
        L.value = `${g}: move mode off.`;
        return;
      }
      L.value = p ? `${g}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${g}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ze = (u) => l.value.get(u)?.title ?? u, Hr = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function jr(u, p, g = !1) {
      if (!Z(u)) return;
      const T = d.value;
      if (!T) return;
      const F = Ze(u), q = At(T, u);
      if (!g && q && (p === "left" || p === "right") && q.panels.length > 1) {
        const fe = q.panels.indexOf(u), we = p === "left" ? fe - 1 : fe + 1;
        if (we >= 0 && we < q.panels.length) {
          X(jt(T, u, we), { panel: u, target: u, edge: "center", index: we }), L.value = `${F} moved ${p}, now tab ${we + 1} of ${q.panels.length}.`, Ln(u);
          return;
        }
      }
      const ie = Wr(u, p);
      if (!ie || ie.panel !== void 0 && !Z(ie.panel)) {
        L.value = `${F} cannot move ${p}.`;
        return;
      }
      const U = Hr[p];
      if (ie.space) {
        const fe = ie.space, we = dt(T, fe), me = Se(T, u)?.rect, se = { ...gt, ...me ? { w: me.w, h: me.h } : {} };
        X(ys(T, u, fe, se), { panel: u, target: "", space: fe, edge: U }), L.value = `${F} moved ${p}, into ${we ? Dt(we) : "the space"}.`, Ln(u);
        return;
      }
      const ee = ie.panel, ae = q?.panels.length === 1 && At(T, ee)?.panels.length === 1;
      g ? (X(fn(T, u, ee, "center"), {
        panel: u,
        target: ee,
        edge: "center"
      }), L.value = `${F} joined ${Ze(ee)} as a tab.`) : ae ? (X(_n(T, u, ee), { panel: u, target: ee, edge: U }), L.value = `${F} moved ${p}, trading places with ${Ze(ee)}.`) : (X(fn(T, u, ee, U), { panel: u, target: ee, edge: U }), L.value = `${F} moved ${p}, beside ${Ze(ee)}.`), Ln(u);
    }
    function Ln(u) {
      Nt(() => {
        P(u)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Gr(u, p) {
      const g = d.value;
      g && (r.value = yn(g, u, p));
    }
    function Rn(u) {
      const p = d.value;
      if (!p) return;
      const g = zt(p, u);
      g !== p && (r.value = g, s("tab-select", { panel: u }));
    }
    function qa(u) {
      return l.value.get(u)?.closable ?? a.closable;
    }
    function Xr(u) {
      qa(u) && s("panel-close", u);
    }
    const Fn = W(/* @__PURE__ */ new Map());
    let Yr = 0;
    function Qr(u, p) {
      const g = Yr += 1;
      return Fn.value.set(g, { panel: u, items: p }), () => {
        Fn.value.delete(g);
      };
    }
    function Zr(u) {
      const p = [];
      for (const g of Fn.value.values())
        g.panel() === u && p.push(...g.items());
      return p;
    }
    function Va(u) {
      const p = u.filter((g) => g.items.length > 0);
      return p.length < 2 ? p.flatMap((g) => g.items) : p.flatMap((g) => [
        { id: g.id, heading: !0, label: g.title },
        ...g.items
      ]);
    }
    const Ka = (u) => u.title || "These tabs";
    function Jr(u, p) {
      const g = p.id, T = At(u, g), F = (T?.panels.length ?? 0) > 1, q = T?.fixedView === !0, he = (ae) => ({
        action: () => {
          ae !== u && (r.value = ae);
        }
      }), ie = [], U = [], ee = p.views ?? [];
      if (ee.length > 1 && !q) {
        const ae = b(g);
        ie.push({
          id: "view",
          label: "View",
          items: ee.map((fe) => ({
            id: `view-${fe.key}`,
            label: fe.label,
            checked: fe.key === ae,
            action: () => K(g, fe.key)
          }))
        });
      }
      return F && !q && U.push(
        { id: "show-row", label: "Row", checked: !1, ...he(ws(u, g, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...he(ws(u, g, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...he(xd(u, g))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...he(Cd(u, g))
        }
      ), F && T && (U.length && U.push({ separator: !0 }), U.push(...Wa(T, g))), { panel: ie, tabs: U, tabsTitle: T ? Ka(T) : "" };
    }
    function Wa(u, p) {
      const g = $t(u), T = (F) => {
        const q = u.panels[(g + F + u.panels.length) % u.panels.length];
        return (q === void 0 ? "" : Re(q)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Rn(T(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Rn(T(-1)) }
      ];
    }
    function cn(u) {
      return u.title ? u.title : Y(u) ? u.panels.length > 1 ? "these tabs" : "the strip" : Dt(u);
    }
    function Ua(u) {
      if (!u || re(u) || u.fixedView === !0 || !u.title && u.headless !== !0 || Ge(u)) return null;
      const p = Fr(u);
      return p && p.fixedView !== !0 ? p : null;
    }
    function el(u) {
      const p = d.value;
      if (!a.menu || !p) return [];
      const g = dt(p, u);
      if (!g || Y(g)) return [];
      if (g.fixedView) return [];
      const T = re(g) ? "desktop" : g.direction, F = (se, Le, ot) => ({
        id: `show-${se}`,
        label: Le,
        checked: T === se,
        action: () => {
          const pt = d.value, vt = ot();
          !pt || vt === g || (r.value = Cn(Ce(yt(pt, u, vt))));
        }
      }), q = () => {
        const se = Tr(g, tl(g));
        if (Y(se) && se.panels.length === 0) return g;
        const Le = Y(se) && se.panels.length === 1 ? se.panels[0] : void 0;
        return Le !== void 0 && _e(Le) ? g : se;
      }, he = (se) => () => re(g) ? Rr(g, se) : g.direction === se ? g : { ...g, direction: se }, ie = u.slice(0, -1), U = u.length > 0 ? dt(p, ie) : null, ee = U && Y(U) && U.panels.length > 1 ? U : null, ae = U && Ua(U) === g ? U : null, fe = Ua(g), we = g.title || "this space", me = (se, Le, ot, pt, vt) => ({
        id: se,
        label: vt,
        action: () => {
          const De = d.value;
          De && (r.value = Cn(Ce(yt(De, Le, Ed(ot, pt)))));
        }
      });
      return Va([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: g.title || "This space",
          items: [
            F("row", "Row", he("row")),
            F("column", "Column", he("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            F("tabs", "Tabs", () => q()),
            F("desktop", "Desktop", () => re(g) ? g : Lr(g))
          ]
        },
        {
          id: "about-around",
          title: fe ? `Around ${cn(fe)}` : "",
          items: fe ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...fe.title ? [] : [me("merge-around-keep-this", u, g, "outer", `Keep ${we}`)],
            ...g.title ? [] : [me("merge-around-keep-that", u, g, "inner", `Keep ${cn(fe)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: ae ? `Inside ${cn(ae)}` : "",
          items: ae ? [
            ...g.title ? [] : [me("merge-inside-keep-that", ie, ae, "outer", `Keep ${cn(ae)}`)],
            ...ae.title ? [] : [me("merge-inside-keep-this", ie, ae, "inner", `Keep ${we}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: ee ? Ka(ee) : "",
          items: ee ? Wa(ee, Re(g)) : []
        }
      ]);
    }
    function tl(u) {
      const p = h.value;
      return p && de(u, p) ? p : void 0;
    }
    function nl(u) {
      const p = d.value, g = l.value.get(u);
      if (!p || !g) return [];
      const T = a.menu ? Jr(p, g) : null, F = Zr(u);
      F.length && T?.panel.length && F.push({ separator: !0 }), T && F.push(...T.panel);
      const q = Va([
        { id: "about-panel", title: g.title, items: F },
        { id: "about-tabs", title: T?.tabsTitle ?? "", items: T?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(g, q) : q;
    }
    function al(u, p) {
      return o[`${u}-${p}`] ?? o[u];
    }
    function Ha(u, p, g, T) {
      return al(u, p.id)?.({ panel: p, view: g, active: T });
    }
    Td({
      panelFor: (u) => l.value.get(u) ?? null,
      viewFor: b,
      setView: K,
      movable: v(() => a.movable),
      resizable: v(() => a.resizable),
      minPanelSize: v(() => a.minPanelSize),
      spaceNames: v(() => a.spaceNames),
      focused: h,
      dragging: y,
      dropTarget: w,
      moving: $,
      framing: _,
      canMove: Z,
      focus(u) {
        h.value !== u && (h.value = u, s("panel-activate", u));
      },
      selectPanel: Rn,
      beginDrag: Qe,
      toggleMoveMode: Ur,
      nudge: jr,
      setSizes: Gr,
      frameOf: (u) => d.value ? Se(d.value, u) : null,
      beginFrameDrag: Vr,
      nudgeFrame: Kr,
      raise: J,
      maximized: G,
      toggleMaximize: ze,
      minimized: Oe,
      toggleMinimize: Q,
      beginFrameDragAt: qt,
      raiseAt: B,
      toggleMaximizeAt: Ae,
      toggleMinimizeAt: H,
      menuFor: nl,
      spaceMenu: el,
      registerMenu: Qr,
      closable: qa,
      close: Xr,
      renderContent: (u, p, g) => Ha("panel", u, p, g),
      renderActions: (u, p, g) => Ha("actions", u, p, g),
      layout: d
    });
    const sl = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), rl = () => {
      const u = y.value, p = x.value;
      return !u || !p ? null : cl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${p.x}px`, top: `${p.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(u)?.title ?? u
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(u, p, g, T) {
        const F = d.value;
        F && X(fn(F, u, p, g, T), {
          panel: u,
          target: p,
          edge: g,
          ...T === void 0 ? {} : { index: T }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(u) {
        const p = d.value;
        p && (r.value = zt(p, u));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(u, p, g) {
        const T = d.value;
        T && X(_s(T, u, p, g), {
          panel: u,
          target: p,
          edge: "float",
          rect: g
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(u, p) {
        const g = d.value;
        if (!g) return;
        const T = hd(g, u, p);
        if (T === g) return;
        r.value = T;
        const F = Se(T, u);
        F && s("frame-change", { panel: u, rect: F.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: K,
      /** Brings a floating frame to the front of its stack. */
      raise: J,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ze,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Q
    }), (u, p) => (f(), m("div", {
      ref_key: "root",
      ref: D,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": k.value ? "true" : "false",
      style: Ee(sl.value)
    }, [
      d.value ? (f(), te(Sf, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", Pf, " This window has no panels. ")),
      pe(rl),
      C("p", Af, N(L.value), 1)
    ], 12, Ef));
  }
}), zf = /* @__PURE__ */ ce(Tf, [["__scopeId", "data-v-711565af"]]), Lf = (e) => Math.round(e * 1e3) / 1e3;
function qn(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function Rf(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function Vn(e) {
  const t = { b: Rf(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function Ff(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function ta(e) {
  const t = Ff(e);
  return t !== null ? t : Or(e);
}
function Or(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((a) => typeof a == "string" ? a : Or(a)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(Vn)), qn(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(ta) };
    return e.sizes && (n.z = e.sizes.map(Lf)), e.places && (n.p = e.places.map(Vn)), qn(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: ta(n.node), ...Vn(n) }))
  };
  return qn(e, t);
}
class Dr extends Error {
}
const Me = () => {
  throw new Dr();
}, na = (e) => typeof e == "object" && e !== null && !Array.isArray(e), Mt = (e) => Array.isArray(e) ? e : Me(), Da = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : Me(), Br = (e) => Mt(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : Me());
function Nf(e) {
  const [t, n, a, s] = Br(e);
  return s === void 0 && Me(), { x: t, y: n, w: a, h: s };
}
function Kn(e) {
  if (!na(e)) return Me();
  const t = { rect: Nf(e.b) }, n = Da(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function Wn(e, t) {
  const n = Da(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function wn(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!na(e)) return Me();
  if (e.g !== void 0) {
    const n = Mt(e.g).map((r) => typeof r == "string" ? r : wn(r));
    n.length === 0 && Me();
    const a = { kind: "group", panels: n }, s = Da(e.a);
    return s !== void 0 && (a.active = s), e.p !== void 0 && (a.places = Mt(e.p).map(Kn)), Wn(e, a);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = Mt(t === "row" ? e.r : e.c).map(wn), a = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (a.sizes = Br(e.z)), e.p !== void 0 && (a.places = Mt(e.p).map(Kn)), Wn(e, a);
  }
  if (e.f !== void 0) {
    const a = { kind: "float", frames: Mt(e.f).map((s) => !na(s) || s.n === void 0 ? Me() : { node: wn(s.n), ...Kn(s) }) };
    return Wn(e, a);
  }
  return Me();
}
const qr = /[ '!:(),*@$]/, If = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function $s(e) {
  return e !== "" && !qr.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function aa(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? $s(e) : Array.isArray(e) ? `!(${e.map(aa).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${$s(t)}:${aa(n)}`).join(",")})`;
}
function Of(e) {
  let t = 0;
  const n = () => e[t], a = (o) => e[t++] === o ? void 0 : Me(), s = () => {
    if (n() === "'") {
      t++;
      let l = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return Me();
        if (c === "'") return l;
        if (c === "!") {
          const d = e[t++];
          d !== "!" && d !== "'" && Me(), l += d;
        } else l += c;
      }
    }
    const o = t;
    for (; t < e.length && !qr.test(e[t]); ) t++;
    return t === o && Me(), e.slice(o, t);
  }, r = () => {
    const o = n();
    if (o === "(") {
      t++;
      const c = {};
      if (n() === ")")
        return t++, c;
      for (; ; ) {
        const d = s();
        a(":"), c[d] = r();
        const h = e[t++];
        if (h === ")") return c;
        h !== "," && Me();
      }
    }
    if (o === "!") {
      t++;
      const c = e[t++];
      if (c === "t") return !0;
      if (c === "f") return !1;
      if (c === "n") return null;
      if (c !== "(") return Me();
      const d = [];
      if (n() === ")")
        return t++, d;
      for (; ; ) {
        d.push(r());
        const h = e[t++];
        if (h === ")") return d;
        h !== "," && Me();
      }
    }
    if (o === "'") return s();
    const l = s();
    return If.test(l) ? Number(l) : l;
  }, i = r();
  return t !== e.length && Me(), i;
}
function xs(e) {
  return aa(ta(e));
}
function Df(e) {
  try {
    return wn(Of(e));
  } catch (t) {
    if (t instanceof Dr) return null;
    throw t;
  }
}
function Cs(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const a = n.indexOf("="), s = a === -1 ? n : n.slice(0, a);
    if (Ba(s) === t) return a === -1 ? "" : n.slice(a + 1);
  }
  return null;
}
function Bf(e, t, n) {
  const a = e.replace(/^[?]/, "").split("&").filter(Boolean), s = a.findIndex((i) => {
    const o = i.indexOf("=");
    return Ba(o === -1 ? i : i.slice(0, o)) === t;
  }), r = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return s === -1 ? r && a.push(r) : r ? a[s] = r : a.splice(s, 1), a.length ? `?${a.join("&")}` : "";
}
function Ba(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
const qf = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%24/g, "$"],
  [/%20/g, "+"]
], Vf = (e) => {
  let t = encodeURIComponent(e);
  for (const [n, a] of qf) t = t.replace(n, a);
  return t;
};
function cp(e, t) {
  const { adapter: n } = t, a = t.param ?? "w", s = t.delay ?? 200, r = () => St(t.home) ?? null;
  let i = Cs(n.search.value, a), o = null;
  const l = () => {
    o !== null && clearTimeout(o), o = null;
  }, c = (y) => y === null ? r() : Df(Ba(y)) ?? r(), d = () => {
    l();
    const y = e.value, w = r(), k = y ? xs(y) : null, $ = k === null || w && k === xs(w) ? null : Vf(k);
    i = $;
    const _ = Bf(n.search.value, a, $);
    _ !== n.search.value && n.replace(_);
  }, h = c(i);
  return h && (e.value = h), ke(e, () => {
    l(), o = setTimeout(d, s);
  }), ke(n.search, (y) => {
    const w = Cs(y, a);
    if (w === i) return;
    l(), i = w;
    const k = c(w);
    k && (e.value = k);
  }), la() && Mn(() => o !== null ? d() : void 0), { flush: () => o !== null ? d() : void 0 };
}
function up(e = "", t = "/") {
  const n = W(st(e)), a = W(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    push(r) {
      n.value = st(r), s.push(`${a.value}${n.value}`);
    },
    replace(r) {
      n.value = st(r), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Ms(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return st(a === -1 ? n : n.slice(0, a));
}
function dp(e) {
  const t = W(Ms(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), a = ke(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Ms(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${st(s)}`),
    replace: (s) => e.replace(`${n.value}${st(s)}`),
    dispose: a
  };
}
const Kf = {
  DataShell: ju,
  ShellHeader: lr,
  QueryPanel: ir,
  RecordActions: ur,
  ResultsArea: yr,
  FacetControl: or,
  SegmentedControl: rd,
  StatusPill: tn,
  WindowFrame: zf,
  WindowPane: Ir,
  ListView: Xn,
  CardsView: fr,
  GridView: pr,
  ImagesView: vr,
  TableView: gr,
  LinksView: hr,
  PreviewView: mr,
  TypeCardsView: _r
}, fp = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Kf))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Ps, t.route);
  }
};
export {
  xn as CASCADE_STEP,
  jf as COLUMN_BREAKPOINTS,
  Hf as COLUMN_ROLES,
  fr as CardsView,
  ps as ColumnCell,
  fl as DEFAULT_ENTITY_VIEW,
  gt as DEFAULT_FRAME,
  Un as DEFAULT_SORT,
  dl as DEFAULT_VIEW,
  ju as DataShell,
  Hn as EMPTY_CELL,
  nr as ENTITY_ALL,
  $n as ENTITY_TERM,
  Qt as EXPRESSION_TERM,
  $a as FACET_PREFIX,
  or as FacetControl,
  pr as GridView,
  fp as HeaderContentLayoutPlugin,
  vr as ImagesView,
  hr as LinksView,
  Xn as ListView,
  Ct as MINIMIZED_GAP,
  kr as MINIMIZED_HEIGHT,
  Yn as MINIMIZED_WIDTH,
  wr as MIN_FRAME,
  os as MOCK_TINTS,
  Qf as MenuBar,
  Sa as MenuButton,
  Ca as MenuList,
  nn as MetricDrill,
  Oa as PANE_CONTEXT_KEY,
  wa as PARAM_DIR,
  ga as PARAM_ENTITY,
  ka as PARAM_EXPR,
  ba as PARAM_PAGE,
  ya as PARAM_SORT,
  _a as PARAM_VIEW,
  Ma as PinStar,
  mr as PreviewView,
  Pn as QueryMark,
  ir as QueryPanel,
  un as RECORD_STATUSES,
  Is as RESULT_FIELDS,
  Ps as ROUTE_ADAPTER_KEY,
  ur as RecordActions,
  yr as ResultsArea,
  tr as SHELL_CONTEXT_KEY,
  Uf as SHELL_THEMES,
  an as ScopeMark,
  rd as SegmentedControl,
  bt as SelectTick,
  Yf as ShellCard,
  lr as ShellHeader,
  vs as StandingControl,
  tn as StatusPill,
  gr as TableView,
  _r as TypeCardsView,
  As as VIEW_KINDS,
  pl as VIEW_LABELS,
  Ia as WINDOW_CONTEXT_KEY,
  zf as WindowFrame,
  Ir as WindowPane,
  $r as activePanel,
  $t as activeTab,
  ma as addTerm,
  pa as andExpression,
  pd as axisOf,
  Aa as cascade,
  Bs as cellFull,
  Jt as cellText,
  mn as cellTextOf,
  qe as cellValue,
  Ya as changesResults,
  Dn as clampRect,
  Tr as collapseSpace,
  xd as collapseToTabs,
  Jf as column,
  Za as columnAlign,
  Ja as columnClass,
  Qa as columnKey,
  Vs as columnShortcut,
  Pl as columnShortcutOf,
  jn as columnTruncates,
  yl as columnsFor,
  hl as countPages,
  ul as createHistoryAdapter,
  up as createMemoryAdapter,
  Hl as createMockDataSource,
  dp as createVueRouterAdapter,
  Df as decodeLayout,
  bl as defaultCellText,
  bs as defaultLayout,
  fa as defaultQuery,
  Xt as defaultViewFor,
  jl as drillExpression,
  ys as dropIntoSpace,
  Ot as emptyFacetState,
  ca as emptyFacetValue,
  xs as encodeLayout,
  Ys as excludingTerm,
  Ws as expandShortcuts,
  Et as findEntity,
  ct as findSort,
  tp as fixedView,
  Pa as float,
  _s as floatPanel,
  Lr as floatSplit,
  Cd as floatTabs,
  hn as fnv1a,
  zs as focusEntity,
  xt as formatCount,
  gl as formatDate,
  ut as formatExpression,
  ml as formatMetric,
  _l as formatOrdinal,
  en as formatTerm,
  An as frame,
  ht as frameAt,
  Se as frameOf,
  Jn as framePathOf,
  Re as frontPanel,
  Kl as generateRows,
  Zf as group,
  At as groupOf,
  vd as groups,
  Ns as hasActiveFacets,
  de as hasPanel,
  ep as headless,
  Kt as insertPanel,
  Ut as isChoosable,
  Gf as isEntityScoped,
  Fs as isFacetActive,
  re as isFloat,
  Y as isGroup,
  it as isMaximized,
  mt as isMinimized,
  _e as isPanelTab,
  ua as isPristineQuery,
  Bt as isSplit,
  Be as isTabOf,
  da as isTypeCardsQuery,
  Ts as isViewKind,
  rs as joinExpression,
  Zs as liftTerm,
  zl as matchesExpression,
  Wl as matchesFacets,
  md as maximizeFrame,
  _d as maximizeFrameAt,
  Ed as mergeSpace,
  gd as minimizeFrame,
  yd as minimizeFrameAt,
  fn as movePanel,
  jt as moveTab,
  Xf as negateTerm,
  dt as nodeAt,
  Gt as nodeTitle,
  Ce as normalizeLayout,
  st as normalizeSearch,
  Fa as normalizeSizes,
  Fr as onlySpace,
  Yt as oppositeTerm,
  lt as panelIds,
  tt as panelNode,
  hs as panelTabs,
  Ne as parseExpression,
  eo as parseQuery,
  Ci as presentParts,
  dr as presentRow,
  Ke as pressOptions,
  Nr as providePaneContext,
  Gl as provideShellContext,
  Td as provideWindowContext,
  Bn as raiseFrame,
  Ht as raiseFrameAt,
  wd as raisedPath,
  Os as reconcileFacets,
  Ad as reconcileLayout,
  Xs as recordTerm,
  Nl as refineExpression,
  _t as removePanel,
  yt as replaceAt,
  ms as resizeRect,
  ks as resizeSplit,
  ia as resolveView,
  He as roleColumn,
  Ds as roleColumns,
  Cn as rootSpace,
  za as row,
  kl as rowKey,
  Sn as sameTerm,
  va as scopeTerm,
  ha as scopeTermFor,
  er as scopedEntity,
  us as serializeQuery,
  zt as setActivePanel,
  hd as setFrameRect,
  gs as setFrameRectAt,
  yn as setSizesAt,
  sp as setSplitDirection,
  rt as sizesOf,
  Rs as sortsFor,
  $e as spaceChrome,
  Dt as spaceTitle,
  Ta as split,
  Rl as splitExpression,
  ws as spreadTabs,
  no as summarizeQuery,
  xa as summaryTerms,
  _n as swapPanels,
  Ea as tabNode,
  rn as tabPanels,
  Qs as termStanding,
  Rr as tileFloat,
  rp as toFloat,
  lp as toTiled,
  np as toggleMaximized,
  ap as toggleMinimized,
  jc as useColumns,
  ko as useEntityCounts,
  vu as useEntityPreviews,
  cp as useLayoutRoute,
  op as usePaneContext,
  ip as usePaneMenu,
  kt as usePresentedRows,
  ao as useQueryState,
  xo as useRecordNames,
  so as useResults,
  be as useShellContext,
  zn as useWindowContext,
  Xa as viewAcross,
  is as withStanding,
  Js as withoutOwnScope,
  Ll as withoutTerm
};
