import { ref as U, inject as It, provide as _a, computed as p, toValue as Pt, shallowRef as wt, watch as we, onScopeDispose as Zt, getCurrentScope as An, defineComponent as ie, onMounted as Rs, onBeforeUnmount as He, resolveComponent as Is, openBlock as f, createElementBlock as m, normalizeStyle as Ae, Fragment as ne, renderList as he, toDisplayString as F, createCommentVNode as I, createElementVNode as x, createBlock as Y, nextTick as Ft, useId as Tn, unref as A, normalizeClass as dt, Teleport as fl, createVNode as ce, withDirectives as ft, withKeys as et, withModifiers as Fe, vModelText as bn, renderSlot as $e, useSlots as Jt, createTextVNode as Ne, withCtx as xe, reactive as rs, resolveDynamicComponent as ya, createSlots as hn, useModel as Ht, mergeModels as $n, vShow as xn, Comment as pl, Text as vl, h as hl } from "vue";
const Fs = Symbol("dc.routeAdapter");
function De(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function ml() {
  const e = typeof window < "u", t = U(e ? De(window.location.search) : ""), n = U(e ? window.location.pathname : "/"), a = () => {
    t.value = De(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (r, i) => {
    const o = De(r);
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
    href(r) {
      return e ? `${window.location.pathname}${De(r)}${window.location.hash}` : `${n.value}${De(r)}`;
    },
    push: (r) => s(r, "push"),
    replace: (r) => s(r, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
const Ns = ["list", "cards", "grid", "images", "table", "links", "preview"], Qf = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], dn = ["ok", "running", "queued", "review", "failed"], Yf = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Zf = [480, 620, 760, 900, 1100], gl = "cards", _l = "table";
function Qt(e, t = {}) {
  const n = (s) => s && Ds(s) ? s : void 0;
  if (e === null) return n(t.view) ?? gl;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? _l;
}
function ls(e, t, n, a = {}) {
  return e === Qt(t, a) ? Qt(n, a) : e;
}
const ta = "updated";
function Ds(e) {
  return typeof e == "string" && Ns.includes(e);
}
const yl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function zn(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Et(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Os(e, t = {}) {
  const n = Et(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function Bs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function qs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of Bs(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const wl = { key: ta, label: ta };
function ct(e, t, n = null) {
  const a = qs(e, n);
  return (t ? a.find((r) => r.key === t) : void 0) ?? a.find((r) => r.key === ta) ?? a[0] ?? wl;
}
function wa(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Nt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = wa(n);
  return t;
}
function Vs(e) {
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
function Ks(e) {
  return Object.values(e).some(Vs);
}
function ka(e) {
  return e.entity === null && e.expr.trim() === "" && !Ks(e.facets);
}
function Jf(e) {
  return e.entity !== null;
}
function ba(e, t) {
  return e.entity === null && zn(e.view, t) === "cards";
}
function kl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function $a(e, t = {}) {
  const a = t.landing === "entity" ? Os(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Qt(a?.key ?? null, t),
    sort: ct(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Nt(a),
    page: 1
  };
}
const xa = ["entity", "sort", "dir", "expr", "facets"];
function Kn(e) {
  return xa.some((t) => t in e);
}
function Hs(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : wa(a);
  }
  return n;
}
function mn(e) {
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
function Ct(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function $l(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function xl(e) {
  return String(e + 1).padStart(2, "0");
}
const na = "—";
function je(e, t) {
  return e.find((n) => n.role === t);
}
function Ws(e, t) {
  return e.filter((n) => n.role === t);
}
function Cl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Ml = ["id", "entityKey", "entityLabel"];
function Ke(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Ml.includes(n))
      return t[n];
  }
}
function os(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Sl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Pl(e, t) {
  if (e == null || e === "") return na;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? bl(n) : String(e);
  }
  return t === "date" ? $l(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : na : String(e);
}
function en(e, t) {
  const n = Ke(e, t);
  return e.format ? e.format(n, t) : Pl(n, e.kind);
}
function El(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Us(e, t) {
  const n = en(e, t), a = El(Ke(e, t));
  return a && a !== n ? a : n;
}
function gn(e, t) {
  return e ? en(e, t) : "";
}
function is(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Al = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function cs(e) {
  return [Al[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function aa(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Tl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function zl(e) {
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
function Ie(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of zl(t)) {
    const r = s.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const i = s.length > 1 && s.startsWith("-"), o = i ? s.slice(1) : s, l = i ? { negated: !0 } : {}, c = Tl.exec(o);
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
const At = (e) => e.toLowerCase().replace(/\s+/g, ""), js = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Ll(e, t, n) {
  const a = At(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && At(c.label) === a
  );
  if (r) return Ke(r, t);
  const i = n.facets.find((c) => At(c.label) === a);
  if (i && i.key in t.fields) return t.fields[i.key];
  const o = js.find(([c]) => c === a)?.[1];
  if (o) {
    const c = je(s, o);
    if (c) return Ke(c, t);
  }
  const l = /^metric(\d+)$/.exec(a);
  if (l) {
    const c = Ws(s, "metric")[Number(l[1]) - 1];
    if (c) return Ke(c, t);
  }
}
function Gs(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const us = /^[a-z_][\w.-]*$/;
function Xs(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return us.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : At(e.label);
  return n !== void 0 && us.test(n) ? n : void 0;
}
function Rl(e, t) {
  const n = At(e);
  if (n === "entity" || js.some(([s]) => s === n) || /^metric\d+$/.test(n)) return !0;
  const a = (s) => s !== void 0 && At(s) === n;
  return (t.columns ?? []).some(
    (s) => a(s.key) || a(s.field) || a(s.label)
  ) || t.facets.some((s) => a(s.key) || a(s.label));
}
function Cn(e, t) {
  if (!t) return e;
  let n = !1;
  const a = Ie(e).map(
    (s) => s.map((r) => {
      if (r.kind !== "field") return r;
      const i = Qs(r.field, t), o = i && Xs(i);
      return o ? (n = !0, { ...r, field: o }) : r;
    })
  );
  return n ? st(a) : e;
}
function Qs(e, t) {
  if (!(!e || Rl(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && Gs(n.label) === e
    );
}
function Il(e, t) {
  if (!t || e.label === void 0 || !Xs(e)) return;
  const n = Gs(e.label);
  return Qs(n, t) === e ? n : void 0;
}
function Hn(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function ds(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Fl(e, t, n) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const l = je(i, o), c = l ? Ke(l, t) : void 0;
      return typeof c == "string" && Hn(c, e.value);
    });
  }
  const a = Ll(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (o) => e.comparator === "=" ? ds(String(o), e.value) : Hn(String(o), e.value)
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
    return e.comparator === "=" ? ds(String(a), e.value) : Hn(String(a), e.value);
  }
  const s = Number(e.value), r = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(r) ? null : Nl(e.comparator, r, s);
}
function fs(e, t, n) {
  const a = Fl(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
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
function ps(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
function Dl(e, t, n) {
  return e.length ? e.some((a) => {
    const s = /* @__PURE__ */ new Map();
    for (const r of a)
      ps(r) && s.set(r.field, (s.get(r.field) ?? !1) || fs(r, t, n));
    return a.every(
      (r) => ps(r) ? s.get(r.field) === !0 : fs(r, t, n)
    );
  }) : !0;
}
function vs(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function tn(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + vs(e.value) : `${t}${e.field}${e.comparator}${vs(e.value)}`;
}
function Ol(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function st(e) {
  return e.filter((t) => t.length).map((t) => t.map(tn).join(" ")).join(" OR ");
}
function Bl(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((r, i) => i !== n) : a).filter((a) => a.length);
}
function ql(e) {
  const t = Ie(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(tn).join(" ")
  };
}
function hs(e, t) {
  return [...e.map(tn), t.trim()].filter(Boolean).join(" ");
}
const ms = (e, t) => e.toLowerCase() === t.toLowerCase();
function sa(e, t) {
  return !!e.negated == !!t.negated && Ys(e, t);
}
function Vl(e, t) {
  return !!e.negated != !!t.negated && Ys(e, t);
}
function Ys(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && ms(e.value, t.value) : t.kind === "text" && ms(e.value, t.value);
}
function Kl(e, t) {
  return t.filter((n) => !e.some((a) => sa(a, n)));
}
function Ca(e, t) {
  return Zs(e, t, (n) => n);
}
function ra(e, t) {
  return Zs(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((r) => Vl(s, r)))
  );
}
const Hl = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Wl(e) {
  return st(
    Ie(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Hl.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function Zs(e, t, n) {
  const a = Ie(e), s = Ie(t);
  return a.length ? s.length ? st(
    a.flatMap(
      (r) => s.map((i) => [...n(r, i), ...Kl(r, i)])
    )
  ) : st(a) : st(s);
}
const gs = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Js(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ul = 7, jl = 3;
function Gl(e, t, n, a) {
  const s = (t * Ul + mn(n)) % a, r = [];
  for (let i = 0; i < Math.min(jl, a); i++)
    r.push(Js(e, (s + i) % a));
  return r;
}
function Xl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ql(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ql(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) s.add((a + r) % e.length);
  return [...s].sort((r, i) => r - i).map((r) => e[r]);
}
function Yl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: r } = t, i = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${i}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return dn[n % dn.length];
    case "updated":
      return r;
    case "tint":
      return gs[n % gs.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return dn[n % dn.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Zl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, i = t.scopes ?? [];
  if (!r.length) return [];
  const o = [];
  for (let l = 0; l < n; l++) {
    const c = r[l % r.length], u = Math.floor(l / r.length), h = mn(`${a}:${e.key}:${c[0]}:${l}`), y = Js(e.key, l), g = new Date(s.getTime() - h % 900 * 36e5).toISOString(), w = {};
    for (const b of e.columns ?? []) {
      const C = b.field ?? b.key;
      if (!C || b.value) continue;
      const k = Yl(b, {
        hash: mn(`${h}:${C}`),
        sample: c,
        revision: u,
        updatedAt: g
      });
      k !== void 0 && (w[C] = k);
    }
    for (const b of e.facets)
      w[b.key] = Xl(b, mn(`${h}:${b.key}`));
    for (const [b, C] of i)
      w[b] = C === e.key ? y : Gl(C, l, b, n);
    o.push({ id: y, entityKey: e.key, entityLabel: e.label, fields: w });
  }
  return o;
}
function Jl(e, t) {
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
function eo(e, t) {
  const n = e.find((i) => i.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", r = a === "date" || n.role === "updated";
  return (i, o) => {
    const l = Ke(n, i), c = Ke(n, o);
    return s ? Number(c ?? 0) - Number(l ?? 0) : r ? Date.parse(String(c ?? "")) - Date.parse(String(l ?? "")) : String(c ?? "").localeCompare(String(l ?? ""));
  };
}
function to(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const r = t.get(a.key);
    if (r) return r;
    const i = e.scopes ?? s.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), o = Zl(a, { ...e, scopes: i });
    return t.set(a.key, o), o;
  };
  return {
    query({ query: a, schema: s, entity: r, limit: i, offset: o }) {
      const l = Ie(a.expr), c = r ? [r] : s.entities, u = [], h = [];
      for (const w of c)
        for (const b of n(w, s))
          u.push(b), (r ? Jl(b, a.facets) : !0) && Dl(l, b, w) && h.push(b);
      const y = ct(r, a.sort, s), g = h.sort(eo(Bs(r, s), y.key));
      return a.dir === "asc" && g.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: g.slice(o, o + i),
        total: h.length,
        unfiltered: h.length === u.length
      };
    }
  };
}
function Ln(e, t) {
  return er(e, t.id);
}
function er(e, t) {
  const n = e?.scope;
  return n ? `${n}="${t.replace(/"/g, "")}"` : null;
}
function Rn(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return sa(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return sa(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Mn(e, t) {
  return Rn(e, Ol(t));
}
function Wt(e, t) {
  return Ln(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Ma(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Ie(t).flat();
  if (!a) return n;
  const s = Ie(n);
  return s.some((o) => o.some((l) => Rn(l, a))) ? n : s.some((o) => o.some((l) => Mn(l, a))) ? st(
    s.map(
      (o) => o.map((l) => Mn(l, a) ? a : l)
    )
  ) : `${n} ${t}`;
}
function tr(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Sa(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Ie(t).flat();
  if (!n) return null;
  const a = Ie(e).flat();
  return a.some((s) => Rn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Mn(s, n)) ? n.negated ? "in" : "out" : null;
}
function nr(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Ie(t).flat();
  if (!n) return e;
  const a = Ie(e), s = a.map(
    (r) => r.filter((i) => !Rn(i, n) && !Mn(i, n))
  );
  return s.every((r, i) => r.length === a[i]?.length) ? e : st(s);
}
function la(e, t, n) {
  return t ? n === null ? nr(e, t) : Ma(e, n === "out" ? tr(t) : t) : e;
}
function ar(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function In(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Wn(e, t, n, a = {}) {
  const s = Wt(e, n);
  return Ma(t.expr, a.exclude ? tr(s) : s);
}
function sr(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Ie(t), s = a.map(
    (r) => r.filter((i) => i.kind !== "field" || i.field !== n)
  );
  return s.every((r, i) => r.length === a[i]?.length) ? t : st(s);
}
function rr(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const lr = Symbol("dc.shellContext");
function no(e) {
  const t = e.liveQuery ? e : ao(e);
  return _a(lr, t), t;
}
function ao(e) {
  const t = e.draft ?? U("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: p(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        ra(e.query.value.expr, Cn(n, e.entity.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function be() {
  const e = It(lr, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Pa = "e", Ea = "v", Aa = "s", Ta = "d", za = "q", La = "p", Ra = "f_", or = "*", so = [
  Pa,
  Ea,
  Aa,
  Ta,
  za,
  La
], oa = "..", ir = ",", ro = [
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
function Un(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of ro) t = t.replace(n, a);
  return t;
}
function at(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function cr(e) {
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
function lo(e) {
  return so.includes(e) || e.startsWith(Ra);
}
function _s(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function oo(e, t) {
  const n = at(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(ir).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => a.has(r)) };
    }
    case "range": {
      const a = n.indexOf(oa), s = (a === -1 ? n : n.slice(0, a)).trim(), r = (a === -1 ? "" : n.slice(a + oa.length)).trim(), i = s === "" ? null : Number(s), o = r === "" ? null : Number(r);
      let l = i !== null && Number.isFinite(i) ? _s(i, e.min, e.max) : null, c = o !== null && Number.isFinite(o) ? _s(o, e.min, e.max) : null;
      return l !== null && c !== null && l > c && ([l, c] = [c, l]), { kind: "range", min: l, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function io(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(ir) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${oa}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function co(e, t, n = {}) {
  const a = $a(t, n), s = new Map(cr(e)), r = s.get(Pa), i = r === void 0 ? a.entity : at(r), o = i === or ? null : Et(t, i), l = s.get(Ea), c = l && Ds(at(l)) ? at(l) : Qt(o?.key ?? null, n), u = s.get(Aa), h = ct(o, u ? at(u) : n.sort, t), y = s.get(Ta), g = y ? at(y) === "asc" ? "asc" : "desc" : a.dir, w = s.get(za), b = s.get(La), C = b === void 0 ? 1 : Number(at(b)), k = Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 1, M = {};
  for (const R of o?.facets ?? []) {
    const $ = s.get(`${Ra}${R.key}`);
    M[R.key] = $ === void 0 ? wa(R) : oo(R, $);
  }
  return {
    entity: o?.key ?? null,
    view: c,
    sort: h.key,
    dir: g,
    expr: w === void 0 ? "" : at(w),
    facets: Hs(o, M),
    page: k
  };
}
function jn(e, t, n = {}, a = "") {
  const s = $a(t, n), r = Et(t, e.entity), i = cr(a).filter(([h]) => !lo(h)), o = [], l = (h, y) => o.push([h, Un(y)]), c = r?.key ?? null;
  c !== s.entity && l(Pa, c ?? or), e.view !== Qt(c, n) && l(Ea, e.view), e.sort !== s.sort && l(Aa, e.sort), e.dir !== s.dir && l(Ta, e.dir), e.expr.trim() !== "" && l(za, e.expr);
  for (const h of r?.facets ?? []) {
    const y = e.facets[h.key];
    if (!y) continue;
    const g = io(y, h);
    g !== null && o.push([`${Ra}${h.key}`, Un(g)]);
  }
  e.page > 1 && l(La, String(e.page));
  const u = [
    ...i.map(([h, y]) => [Un(h), y]),
    ...o
  ];
  return u.length ? `?${u.map(([h, y]) => y === "" ? h : `${h}=${y}`).join("&")}` : "";
}
const Sn = "entity", Yt = "expr";
function uo(e, t) {
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
function Ia(e, t) {
  const n = [];
  t && n.push({
    id: Sn,
    label: `entity:${t.key}`,
    facetKey: Sn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && Vs(s) && n.push(...uo(a, s));
  }
  return Ie(e.expr).forEach((a, s) => {
    a.forEach((r, i) => {
      n.push({
        id: `${Yt}:${s}:${i}`,
        label: tn(r),
        facetKey: Yt,
        group: s,
        index: i,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function fo(e, t, n = null) {
  if (ka(e)) {
    const r = ct(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const a = Ia(e, t).filter((r) => r.facetKey !== Yt).map((r) => r.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function po(e) {
  const { adapter: t } = e, n = p(() => Pt(e.schema)), a = p(() => Pt(e.defaults) ?? {}), s = p(() => co(t.search.value, n.value, a.value)), r = p(() => Et(n.value, s.value.entity)), i = p(() => r.value ?? Os(n.value, a.value)), o = p(() => qs(r.value, n.value)), l = p(() => ct(r.value, s.value.sort, n.value)), c = (k, M) => {
    const R = jn(k, n.value, a.value, t.search.value);
    return R === t.search.value ? !1 : (M === "push" ? t.push(R) : t.replace(R), !0);
  }, u = () => Pt(e.navigationMode) ?? "push", h = () => Pt(e.facetNavigationMode) ?? "replace", y = (k, M) => {
    const R = k.page ?? (Kn(k) ? 1 : s.value.page);
    return c({ ...s.value, ...k, page: R }, M);
  }, g = (k) => {
    const M = k.page ?? (Kn(k) ? 1 : s.value.page), R = jn({ ...s.value, ...k, page: M }, n.value, a.value, t.search.value);
    return t.href ? t.href(R) : `${t.path.value}${R}`;
  }, w = (k, M) => {
    const R = s.value.facets[k];
    if (!R) return;
    const $ = { ...s.value.facets, [k]: M(R) };
    y({ facets: $ }, h());
  }, b = (k) => {
    const M = k === null ? null : Et(n.value, k);
    return (M?.key ?? null) === s.value.entity ? {} : {
      entity: M?.key ?? null,
      view: ls(s.value.view, s.value.entity, M?.key ?? null, a.value),
      sort: ct(M, s.value.sort, n.value).key,
      facets: Nt(M)
    };
  }, C = (k) => {
    const M = b(k);
    Object.keys(M).length && y(M, u());
  };
  return {
    query: s,
    entity: r,
    focus: i,
    sort: l,
    sorts: o,
    summary: p(() => fo(s.value, r.value, n.value)),
    terms: p(() => Ia(s.value, r.value)),
    isPristine: p(() => ka(s.value)),
    isEverything: p(() => s.value.entity === null),
    hasFacets: p(() => Ks(s.value.facets)),
    setEntity: C,
    entityHref: (k) => g(b(k)),
    clearEntity: () => C(null),
    setView(k) {
      y({ view: k }, u());
    },
    setSort(k) {
      y({ sort: ct(r.value, k, n.value).key }, u());
    },
    toggleDirection() {
      y({ dir: s.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(k) {
      return y({ expr: k }, u());
    },
    narrow(k, M, R) {
      return y({ expr: k, ...b(M), ...R ? { view: R } : {} }, u());
    },
    narrowHref(k, M, R) {
      return g({ expr: k, ...b(M), ...R ? { view: R } : {} });
    },
    setPage(k, M) {
      y({ page: Math.max(1, Math.floor(k)) }, M ?? u());
    },
    setFacet(k, M) {
      w(k, () => M);
    },
    toggleChip(k, M) {
      w(k, (R) => R.kind !== "chips" ? R : { kind: "chips", selected: R.selected.includes(M) ? R.selected.filter((E) => E !== M) : [...R.selected, M] });
    },
    setRange(k, M, R) {
      w(k, ($) => $.kind === "range" ? { kind: "range", min: M, max: R } : $);
    },
    toggleFlag(k) {
      w(
        k,
        (M) => M.kind === "toggle" ? { kind: "toggle", on: !M.on } : M
      );
    },
    removeTerm(k) {
      if (k.facetKey === Sn) {
        C(null);
        return;
      }
      if (k.facetKey === Yt) {
        const M = Bl(Ie(s.value.expr), k.group ?? 0, k.index ?? 0);
        y({ expr: st(M) }, u());
        return;
      }
      w(k.facetKey, (M) => M.kind === "chips" && k.option ? { kind: "chips", selected: M.selected.filter((R) => R !== k.option) } : M.kind === "range" ? { kind: "range", min: null, max: null } : M.kind === "toggle" ? { kind: "toggle", on: !1 } : M);
    },
    clearFilters() {
      y({ ...b(null), expr: "", facets: Nt(null) }, u());
    },
    reset() {
      c($a(n.value, a.value), u());
    },
    hrefFor(k) {
      const M = { ...s.value, ...k };
      return "entity" in k && !("view" in k) && (M.view = ls(s.value.view, s.value.entity, M.entity, a.value)), M.page = k.page ?? (Kn(k) ? 1 : s.value.page), M.facets = Hs(Et(n.value, M.entity), M.facets), `${t.path.value}${jn(M, n.value, a.value, t.search.value)}`;
    }
  };
}
function vo(e) {
  const t = wt([]), n = U(0), a = U(!1), s = U(!1), r = wt(null);
  let i = 0, o = null, l = null;
  const c = p(() => (e.query.value.page - 1) * e.limit.value), u = p(() => kl(n.value, e.limit.value)), h = () => {
    const $ = e.query.value, E = e.within?.value.trim(), D = sr(e.entity.value, $.expr);
    return E ? { ...$, expr: Ca(E, D) } : D === $.expr ? $ : { ...$, expr: D };
  }, y = ($, E) => {
    t.value = $.rows, n.value = $.total, r.value = null, g(E);
  }, g = ($) => {
    o = { key: $, total: n.value }, s.value = !1;
  }, w = ($) => {
    r.value = $, t.value = [], n.value = 0, o = null, s.value = !1;
  }, b = ($, E, D, S) => {
    let z = !0;
    const T = () => $ === i;
    let H = 0, K = !1;
    const W = (oe) => {
      H = oe, K = !0, S === void 0 && (n.value = oe);
    }, ye = () => {
      z && (z = !1, t.value = [], W(0)), r.value = null;
    };
    return {
      get open() {
        return T();
      },
      insert(oe, q) {
        if (!T()) return;
        const P = Array.isArray(oe) ? oe : [oe];
        if (!P.length) return;
        ye();
        const j = [...t.value];
        j.splice(q ?? j.length, 0, ...P), t.value = E > 0 ? j.slice(0, E) : j, W(H + P.length);
      },
      set(oe) {
        T() && (oe.rows && (ye(), t.value = E > 0 ? oe.rows.slice(0, E) : oe.rows, W(oe.rows.length)), oe.total !== void 0 && W(oe.total));
      },
      close() {
        T() && (a.value = !1, K && (n.value = H), g(D));
      },
      fail(oe) {
        T() && (w(oe), a.value = !1);
      }
    };
  }, C = () => {
    const $ = l;
    l = null, $?.();
  }, k = () => {
    const $ = ++i;
    C();
    const E = M.value, D = o?.key === E ? o.total : void 0;
    s.value = D === void 0;
    const S = {
      query: h(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, z = e.source.value;
    if (z.stream) {
      a.value = !0;
      try {
        l = z.stream(S, b($, S.limit, E, D)) ?? null;
      } catch (H) {
        w(H), a.value = !1;
      }
      return;
    }
    let T;
    try {
      T = z.query(S);
    } catch (H) {
      w(H);
      return;
    }
    if (!(T instanceof Promise)) {
      y(T, E), a.value = !1;
      return;
    }
    a.value = !0, T.then((H) => {
      $ === i && y(H, E);
    }).catch((H) => {
      $ === i && w(H);
    }).finally(() => {
      $ === i && (a.value = !1);
    });
  }, M = p(() => {
    const $ = h();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(xa.map((D) => $[D]))}`;
  }), R = p(() => `${M.value}|${e.query.value.page}`);
  return we([e.source, R, e.limit], k, {
    immediate: !0
  }), Zt(() => {
    i++, C();
  }, !0), { rows: t, total: n, offset: c, pageCount: u, pending: a, counting: s, error: r, refresh: k };
}
const ho = 150;
function mo(e) {
  const t = e.delay ?? ho, n = U(""), a = U("");
  let s = !1, r;
  const i = () => {
    clearTimeout(r), r = void 0;
  }, o = p(() => Cn(Wl(a.value), e.entity.value)), l = p(() => o.value.trim() !== ""), c = p(
    () => JSON.stringify([o.value, ...xa.map((g) => e.query.value[g])])
  ), u = wt(null), h = p(() => {
    const g = e.query.value;
    if (!l.value) return g;
    const w = u.value?.of === c.value ? u.value.page : 1;
    return { ...g, expr: ra(g.expr, o.value), page: w };
  });
  we(n, (g) => {
    if (i(), !g.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, r = setTimeout(() => {
      r = void 0, a.value = n.value;
    }, t);
  }), we(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const y = (g) => {
    i(), s = !0, n.value = "", !g() && s && (s = !1, a.value = "");
  };
  return An() && Zt(i), {
    text: n,
    live: h,
    drafting: l,
    setPage(g) {
      u.value = { of: c.value, page: Math.max(1, Math.floor(g)) };
    },
    commit() {
      const g = n.value.trim();
      if (!g) return;
      const w = ra(
        e.query.value.expr,
        Cn(g, e.entity.value)
      );
      a.value = g, y(() => e.setExpression(w));
    },
    abandon() {
      i(), s = !1, n.value = "", a.value = "";
    },
    release: y
  };
}
const Ut = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, go = ["aria-label"], _o = ["role", "aria-label"], yo = ["data-dc-item"], wo = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, ko = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], bo = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, $o = { class: "dc-menu__label dc-truncate" }, xo = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Co = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Mo = /* @__PURE__ */ ie({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = U(null), i = U([]), o = U(null), l = U(null), c = U(null), u = U(!1), h = p(
      () => a.items.flatMap((S, z) => Ut(S) ? [z] : [])
    ), y = p(() => {
      const S = [{ entries: [] }];
      return a.items.forEach((z, T) => {
        z.heading ? S.push({ heading: z, entries: [] }) : S[S.length - 1]?.entries.push({ item: z, index: T });
      }), S.filter((z) => z.entries.length > 0);
    }), g = U({ x: a.at.x, y: a.at.y });
    async function w() {
      g.value = { x: a.at.x, y: a.at.y }, await Ft();
      const S = r.value?.getBoundingClientRect();
      if (!S) return;
      const z = 8;
      let T = a.at.x, H = a.at.y;
      if (T + S.width > window.innerWidth - z) {
        const K = a.at.mirrorX === void 0 ? null : a.at.mirrorX - S.width;
        T = K !== null && K >= z ? K : window.innerWidth - S.width - z;
      }
      H + S.height > window.innerHeight - z && (H = window.innerHeight - S.height - z), g.value = { x: Math.max(z, T), y: Math.max(z, H) };
    }
    const b = p(() => ({ left: `${g.value.x}px`, top: `${g.value.y}px` }));
    function C(S) {
      o.value = S, S !== null && Ft(() => i.value[S]?.focus());
    }
    function k(S, z) {
      const T = h.value;
      if (T.length === 0) return null;
      if (S === null) return z === 1 ? T[0] ?? null : T[T.length - 1] ?? null;
      const H = T.indexOf(S);
      return H === -1 ? T[0] ?? null : T[(H + z + T.length) % T.length] ?? null;
    }
    function M(S, z) {
      if (!a.items[S]?.items?.length) return;
      const H = i.value[S]?.getBoundingClientRect(), K = r.value?.getBoundingClientRect();
      !H || !K || (c.value = { x: K.right - 4, y: H.top - 4, mirrorX: K.left + 4 }, l.value = S, u.value = z);
    }
    function R(S) {
      const z = l.value;
      l.value = null, c.value = null, S && z !== null && C(z);
    }
    function $(S) {
      const z = a.items[S];
      if (!(!z || !Ut(z))) {
        if (z.items?.length) {
          M(S, !0);
          return;
        }
        s("choose", z);
      }
    }
    function E(S) {
      const z = S.key;
      if (z === "Escape") {
        S.preventDefault(), S.stopPropagation(), l.value !== null ? R(!0) : s("dismiss");
        return;
      }
      if (z === "ArrowDown" || z === "ArrowUp") {
        S.preventDefault(), S.stopPropagation(), R(!1), C(k(o.value, z === "ArrowDown" ? 1 : -1));
        return;
      }
      if (z === "Home" || z === "End") {
        S.preventDefault(), S.stopPropagation(), R(!1), C(k(null, z === "Home" ? 1 : -1));
        return;
      }
      if (z === "ArrowRight") {
        const T = o.value;
        T !== null && a.items[T]?.items?.length && (S.preventDefault(), S.stopPropagation(), M(T, !0));
        return;
      }
      if (z === "ArrowLeft") {
        l.value !== null && (S.preventDefault(), S.stopPropagation(), R(!0));
        return;
      }
      if (z === "Enter" || z === " ") {
        const T = o.value;
        if (T === null) return;
        S.preventDefault(), S.stopPropagation(), $(T);
      }
    }
    function D(S) {
      const z = a.items[S];
      !z || !Ut(z) || (l.value !== null && l.value !== S && R(!1), C(S), z.items?.length && M(S, !1));
    }
    return Rs(() => {
      w(), a.autofocus && C(k(null, 1));
    }), we(() => a.at, w, { deep: !0 }), we(() => a.items, () => void w(), { deep: !0 }), He(() => {
      l.value = null;
    }), t({ root: r }), (S, z) => {
      const T = Is("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Ae(b.value),
        onKeydown: E
      }, [
        (f(!0), m(ne, null, he(y.value, (H, K) => (f(), m("div", {
          key: `${K}-${H.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: H.heading ? "group" : "none",
          "aria-label": H.heading?.label
        }, [
          H.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": H.heading.id
          }, F(H.heading.label), 9, yo)) : I("", !0),
          (f(!0), m(ne, null, he(H.entries, ({ item: W, index: ye }) => (f(), m(ne, {
            key: W.id ?? `${ye}-${W.label ?? ""}`
          }, [
            W.separator ? (f(), m("div", wo)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (oe) => {
                oe && (i.value[ye] = oe);
              },
              type: "button",
              class: "dc-menu__item",
              role: W.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": W.checked === void 0 ? void 0 : W.checked,
              "aria-haspopup": W.items?.length ? "menu" : void 0,
              "aria-expanded": W.items?.length ? l.value === ye : void 0,
              "aria-disabled": W.disabled ? "true" : void 0,
              disabled: W.disabled,
              "data-dc-item": W.id,
              tabindex: "-1",
              onClick: (oe) => $(ye),
              onMouseenter: (oe) => D(ye)
            }, [
              x("span", bo, F(W.checked ? "✓" : ""), 1),
              x("span", $o, F(W.label), 1),
              W.shortcut ? (f(), m("span", xo, F(W.shortcut), 1)) : W.items?.length ? (f(), m("span", Co, "›")) : I("", !0)
            ], 40, ko))
          ], 64))), 128))
        ], 8, _o))), 128)),
        l.value !== null && c.value ? (f(), Y(T, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: c.value,
          label: e.items[l.value]?.label,
          autofocus: u.value,
          onChoose: z[0] || (z[0] = (H) => s("choose", H)),
          onDismiss: z[1] || (z[1] = (H) => R(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
      ], 44, go);
    };
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Fa = /* @__PURE__ */ de(Mo, [["__scopeId", "data-v-9b1413fa"]]), So = { class: "dc-pick" }, Po = ["id"], Eo = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Ao = { class: "dc-pick__label" }, To = /* @__PURE__ */ ie({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Tn() ?? "dc-pick", r = U(null), i = U(null), o = U(null), l = U(!1), c = p(() => o.value !== null), u = U(null), h = p(
      () => n.options.find(($) => $.key === n.modelValue) ?? n.options[0]
    ), y = p(
      () => n.options.map(($) => ({
        id: $.key,
        label: $.label,
        checked: $.key === n.modelValue
      }))
    ), g = p(
      () => o.value ? { maxHeight: `${window.innerHeight - o.value.y - 8}px` } : void 0
    );
    function w($) {
      const E = r.value?.getBoundingClientRect();
      E && (u.value = r.value?.closest(".dc-shell") ?? document.body, o.value = { x: E.left, y: E.bottom + 4, mirrorX: E.right }, l.value = $, a("open"));
    }
    function b($) {
      o.value && a("close"), o.value = null, $ && r.value?.focus();
    }
    function C() {
      c.value ? b(!0) : w(!1);
    }
    function k($) {
      $.key !== "ArrowDown" && $.key !== "ArrowUp" || c.value || ($.preventDefault(), w(!0));
    }
    function M($) {
      const E = $.target;
      E && (r.value?.contains(E) || i.value?.root?.contains(E) || b(!1));
    }
    we(c, ($) => {
      $ ? window.addEventListener("pointerdown", M, !0) : window.removeEventListener("pointerdown", M, !0);
    }), He(() => window.removeEventListener("pointerdown", M, !0));
    function R($) {
      b(!0), !($.id === void 0 || $.id === n.modelValue) && a("update:modelValue", $.id);
    }
    return ($, E) => (f(), m("span", So, [
      x("span", {
        id: `${A(s)}-name`,
        class: "dc-pick__name"
      }, F(e.label), 9, Po),
      x("button", {
        id: `${A(s)}-value`,
        ref_key: "trigger",
        ref: r,
        type: "button",
        class: dt(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${A(s)}-name ${A(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: C,
        onKeydown: k
      }, [
        x("span", Ao, F(h.value?.label), 1)
      ], 42, Eo),
      E[1] || (E[1] = x("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      o.value && u.value ? (f(), Y(fl, {
        key: 0,
        to: u.value
      }, [
        ce(Fa, {
          ref_key: "menu",
          ref: i,
          class: "dc-pick__list",
          style: Ae(g.value),
          items: y.value,
          at: o.value,
          label: e.label,
          autofocus: l.value,
          onChoose: R,
          onDismiss: E[0] || (E[0] = (D) => b(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : I("", !0)
    ]));
  }
}), ys = /* @__PURE__ */ de(To, [["__scopeId", "data-v-d21ebf1b"]]);
function zo(e) {
  const t = wt(/* @__PURE__ */ new Map()), n = U(!0);
  let a = 0, s;
  const r = () => {
    a++, s?.abort(), s = void 0;
  }, i = () => {
    r();
    const o = a, { signal: l } = s = new AbortController(), c = e.query.value, u = e.schema.value, h = e.entities.value, y = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !y;
    const g = /* @__PURE__ */ new Map();
    let w = !0;
    for (const b of h) {
      const C = sr(b, c.expr), k = y ? Ca(y, C) : C;
      let M = !1;
      const R = (E) => {
        if (o !== a) return;
        if (w) {
          g.set(b.key, E);
          return;
        }
        const D = new Map(t.value);
        D.set(b.key, E), t.value = D;
      }, $ = e.source.value.query({
        query: { ...c, entity: b.key, expr: k, facets: Nt(b), page: 1 },
        schema: u,
        entity: b,
        limit: 0,
        offset: 0,
        signal: l,
        progress: (E) => {
          M || R({ total: E, pending: !0, counted: !0 });
        }
      });
      $ instanceof Promise ? (g.has(b.key) || g.set(b.key, { total: 0, pending: !0, counted: !1 }), $.then((E) => {
        M = !0, R({ total: E.total, pending: !1, counted: !0 });
      })) : (M = !0, g.set(b.key, { total: $.total, pending: !1, counted: !0 }));
    }
    w = !1, t.value = g;
  };
  return An() && Zt(r), { counts: t, pristine: n, refresh: i, cancel: r };
}
const Lo = 25, ur = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ro(e, t) {
  return e.find((n) => ur(n.id, t));
}
function Io(e) {
  const t = wt(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (o) => {
    if (o.facetKey !== Yt || !o.field || !o.value) return null;
    const l = rr(e.schema.value, o.field);
    return l ? { entity: l, id: o.value, key: `${l.key}:${o.value}` } : null;
  }, s = (o) => {
    const { entity: l, id: c } = o, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: l.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: er(l, c) ?? "",
        facets: Nt(l),
        sort: ct(l, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: l,
      limit: Lo,
      offset: 0
    });
  }, r = (o, l) => {
    const c = gn(je(o.columns ?? [], "identity"), l);
    return c === na || ur(c, l.id) ? "" : c;
  }, i = () => {
    const o = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const h = a(u);
      h && !t.value.has(h.key) && !n.has(h.key) && o.set(h.key, h);
    }
    if (!o.size) return;
    const l = [...o.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), c = (u) => {
      const h = new Map(t.value);
      u.forEach((y, g) => {
        const { reference: w } = l[g], b = Ro(y.rows, w.id);
        h.set(w.key, b ? r(w.entity, b) : "");
      }), t.value = h;
    };
    if (l.every(({ outcome: u }) => !(u instanceof Promise))) {
      c(l.map(({ outcome: u }) => u));
      return;
    }
    for (const { reference: u } of l) n.add(u.key);
    Promise.all(l.map(({ outcome: u }) => Promise.resolve(u))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: u } of l) n.delete(u.key);
    });
  };
  return we([e.source, e.schema, e.terms], () => {
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
const Fo = ["data-dc-expanded"], No = { class: "dc-header__domain" }, Do = {
  key: 0,
  class: "dc-header__within"
}, Oo = ["title"], Bo = ["data-dc-more", "title"], qo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Vo = ["title", "aria-label", "onClick"], Ko = ["onKeydown"], Ho = ["aria-expanded", "aria-controls"], Wo = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Uo = { class: "dc-header__sr" }, jo = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Go = ["disabled"], Xo = ["title"], Qo = ["value", "onKeydown"], Yo = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Zo = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Jo = ["disabled"], ei = {
  key: 1,
  class: "dc-header__actions"
}, ti = "…", ni = /* @__PURE__ */ ie({
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
    const n = e, a = t, s = be(), r = p(() => s.schema.value), i = p(
      () => s.hasFacets.value || !!s.liveQuery.value.expr.trim() || !!s.within.value
    ), o = p(() => r.value.formatCount ?? Ct), l = zo({
      source: s.source,
      schema: s.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: s.liveQuery,
      entities: s.entities,
      within: s.within
    });
    function c(B) {
      if (n.hideCount) return B.count;
      if (B.key === s.query.value.entity && i.value) return o.value(s.total.value);
      if (l.pristine.value) return B.count;
      const X = l.counts.value.get(B.key);
      return X ? X.counted ? `${X.pending ? "~" : ""}${o.value(X.total)}` : ti : B.count;
    }
    function u(B) {
      return `${B.label} · ${c(B)}`;
    }
    const h = p(() => [
      { key: "", label: "Everything" },
      ...s.entities.value.map((B) => ({ key: B.key, label: u(B) }))
    ]), y = p(() => {
      const B = s.within.value.trim();
      return B ? Ia({ ...s.query.value, expr: B, facets: {} }, null) : [];
    }), g = p(
      () => (n.views ?? [...Ns]).map((B) => ({ key: B, label: yl[B] }))
    ), w = p(() => zn(s.query.value.view, n.views)), b = p(() => g.value.length > 1), C = p(() => s.query.value.entity !== null);
    function k(B) {
      s.setView(B);
    }
    const M = p(() => {
      const B = s.entity.value, Z = B?.keepsScope ? void 0 : B?.scope?.toLowerCase();
      return s.terms.value.filter((X) => X.facetKey !== Sn).map((X, Be, Bt) => {
        const O = Bt[Be - 1];
        return {
          term: X,
          or: O?.group !== void 0 && X.group !== void 0 && X.group !== O.group,
          idle: !!Z && X.field?.toLowerCase() === Z
        };
      });
    }), R = Io({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: p(() => [...y.value, ...s.terms.value])
    });
    function $(B) {
      return rr(r.value, B)?.scopeLabel ?? B;
    }
    function E(B) {
      return B.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function D(B) {
      const Z = R.nameOf(B);
      return Z ? `${B.negated ? "-" : ""}${$(B.field)}: ${E(Z)}` : B.label;
    }
    function S(B) {
      s.setEntity(B || null);
    }
    const z = U(null);
    function T() {
      s.abandonDraft(), z.value?.blur();
    }
    function H(B) {
      if (s.draft.value) return;
      const Z = M.value.at(-1);
      Z && (B.preventDefault(), s.removeTerm(Z.term));
    }
    function K(B) {
      B.target?.closest("button, select, label, input") || a("toggle");
    }
    const W = U(null), ye = U("");
    function oe() {
      const B = W.value;
      if (!B) {
        ye.value = "";
        return;
      }
      const Z = B.scrollLeft > 1, X = B.scrollWidth - B.clientWidth - B.scrollLeft > 1;
      ye.value = Z && X ? "both" : Z ? "start" : X ? "end" : "";
    }
    let q = null;
    we(
      W,
      (B) => {
        q?.disconnect(), q = null, oe(), !(!B || typeof ResizeObserver > "u") && (q = new ResizeObserver(oe), q.observe(B));
      },
      { flush: "post" }
    ), we(M, oe, { flush: "post" }), He(() => q?.disconnect());
    const P = p(() => s.liveQuery.value.page), j = p(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !ba(s.query.value, n.views)
    ), ae = p(
      () => `${s.counting.value ? "~" : ""}${Ct(s.pageCount.value)}`
    ), pe = p(() => {
      let B = `Page ${Ct(P.value)} of ${ae.value}`;
      const Z = s.rows.value.length;
      if (Z) {
        const X = s.offset.value + 1, Be = `${s.counting.value ? "~" : ""}${Ct(s.total.value)}`;
        B += ` — rows ${Ct(X)} to ${Ct(X + Z - 1)} of ${Be}`;
      }
      return n.pagesNote ? `${B}
${n.pagesNote}` : B;
    }), Me = U(null), We = p(() => Me.value ?? String(P.value)), Qe = p(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function Ye(B) {
      B.target.select();
    }
    function Ze(B) {
      const Z = B.target, X = Z.value.replace(/[^0-9]/g, "");
      Z.value !== X && (Z.value = X), Me.value = X;
    }
    function Oe(B) {
      const Z = B.target, X = Number(Me.value);
      Me.value = null;
      const Be = Number.isFinite(X) && X >= 1 ? Math.min(Math.trunc(X), Math.max(1, s.pageCount.value)) : P.value;
      Z.value = String(Be), Be !== P.value && s.setPage(Be);
    }
    function Ue(B) {
      const Z = B.target;
      Me.value = null, Z.value = String(P.value), Z.blur();
    }
    return (B, Z) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      x("div", {
        class: "dc-header__trigger",
        onClick: K
      }, [
        x("span", No, F(r.value.label), 1),
        y.value.length ? (f(), m("span", Do, [
          Z[5] || (Z[5] = x("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(ne, null, he(y.value, (X) => (f(), m("span", {
            key: `scope:${X.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: D(X)
          }, F(D(X)), 9, Oo))), 128))
        ])) : I("", !0),
        x("div", {
          ref_key: "termBar",
          ref: W,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ye.value,
          title: A(s).summary.value,
          onScroll: oe
        }, [
          C.value ? (f(), Y(ys, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": A(s).query.value.entity ?? "",
            options: h.value,
            onOpen: A(l).refresh,
            onClose: A(l).cancel,
            "onUpdate:modelValue": S
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : I("", !0),
          b.value ? (f(), Y(ys, {
            key: 1,
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": w.value,
            options: g.value,
            "onUpdate:modelValue": k
          }, null, 8, ["model-value", "options"])) : I("", !0),
          (f(!0), m(ne, null, he(M.value, (X) => (f(), m(ne, {
            key: X.term.id
          }, [
            X.or ? (f(), m("span", qo, "or")) : I("", !0),
            x("button", {
              type: "button",
              class: dt(["dc-term dc-mono", { "dc-term--idle": X.idle }]),
              title: X.idle ? `Not applied to ${A(s).entity.value?.label} — remove ${D(X.term)}` : `Remove ${D(X.term)}`,
              "aria-label": `Remove ${D(X.term)}`,
              onClick: (Be) => A(s).removeTerm(X.term)
            }, F(D(X.term)), 11, Vo)
          ], 64))), 128)),
          ft(x("input", {
            ref_key: "searchBox",
            ref: z,
            "onUpdate:modelValue": Z[0] || (Z[0] = (X) => A(s).draft.value = X),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Z[1] || (Z[1] = et(Fe(
                //@ts-ignore
                (...X) => A(s).commitDraft && A(s).commitDraft(...X),
                ["prevent"]
              ), ["enter"])),
              et(Fe(T, ["prevent"]), ["esc"]),
              et(H, ["backspace"])
            ]
          }, null, 40, Ko), [
            [bn, A(s).draft.value]
          ])
        ], 40, Bo),
        x("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: Z[2] || (Z[2] = (X) => a("toggle"))
        }, [
          x("span", Wo, F(e.expanded ? "▲" : "▼"), 1),
          x("span", Uo, F(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Ho)
      ]),
      j.value ? (f(), m("nav", jo, [
        x("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: P.value <= 1,
          onClick: Z[3] || (Z[3] = (X) => A(s).setPage(P.value - 1))
        }, [...Z[6] || (Z[6] = [
          x("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Go),
        x("span", {
          class: "dc-header__page dc-mono",
          title: pe.value
        }, [
          x("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Ae({ width: Qe.value }),
            value: We.value,
            onFocus: Ye,
            onInput: Ze,
            onKeydown: [
              et(Fe(Oe, ["prevent"]), ["enter"]),
              et(Fe(Ue, ["prevent"]), ["esc"])
            ],
            onBlur: Oe
          }, null, 44, Qo),
          x("span", Yo, "/ " + F(ae.value), 1)
        ], 8, Xo),
        x("span", Zo, F(pe.value), 1),
        x("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: P.value >= A(s).pageCount.value,
          onClick: Z[4] || (Z[4] = (X) => A(s).setPage(P.value + 1))
        }, [...Z[7] || (Z[7] = [
          x("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Jo)
      ])) : I("", !0),
      B.$slots.actions ? (f(), m("div", ei, [
        $e(B.$slots, "actions", {}, void 0, !0)
      ])) : I("", !0)
    ], 8, Fo));
  }
}), dr = /* @__PURE__ */ de(ni, [["__scopeId", "data-v-d4f7546d"]]), ai = { class: "dc-facet" }, si = ["id"], ri = { class: "dc-facet__body" }, li = ["aria-labelledby"], oi = ["aria-pressed", "data-dc-active", "onClick"], ii = ["aria-labelledby"], ci = ["aria-label", "placeholder", "onKeydown"], ui = ["aria-label", "placeholder", "onKeydown"], di = ["aria-checked"], fi = { class: "dc-switch__text" }, pi = ["data-dc-active"], vi = /* @__PURE__ */ ie({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = p(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function r(h) {
      if (n.value.kind !== "chips") return;
      const y = s.value.has(h) ? n.value.selected.filter((g) => g !== h) : [...n.value.selected, h];
      a("update", { kind: "chips", selected: y });
    }
    const i = U(""), o = U("");
    we(
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
      const g = Number(y);
      return Number.isFinite(g) ? g : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const h = l(i.value), y = l(o.value);
      h === n.value.min && y === n.value.max || a("update", { kind: "range", min: h, max: y });
    }
    function u() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (h, y) => (f(), m("div", ai, [
      x("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, F(e.facet.label), 9, si),
      x("div", ri, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), m(ne, null, he(e.facet.options, (g) => (f(), m("button", {
            key: g,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(g),
            "data-dc-active": s.value.has(g) ? "true" : "false",
            onClick: (w) => r(g)
          }, F(g), 9, oi))), 128))
        ], 8, li)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          ft(x("input", {
            "onUpdate:modelValue": y[0] || (y[0] = (g) => i.value = g),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: et(Fe(c, ["prevent"]), ["enter"])
          }, null, 40, ci), [
            [bn, i.value]
          ]),
          y[2] || (y[2] = x("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          ft(x("input", {
            "onUpdate:modelValue": y[1] || (y[1] = (g) => o.value = g),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: et(Fe(c, ["prevent"]), ["enter"])
          }, null, 40, ui), [
            [bn, o.value]
          ])
        ], 8, ii)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: u
        }, [
          x("span", fi, F(e.facet.text), 1),
          x("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...y[3] || (y[3] = [
            x("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, pi)
        ], 8, di)) : I("", !0)
      ])
    ]));
  }
}), fr = /* @__PURE__ */ de(vi, [["__scopeId", "data-v-36d1334b"]]), hi = ["id"], mi = { class: "dc-panel__section dc-panel__rows" }, gi = { class: "dc-panel__row" }, _i = ["for"], yi = ["title", "aria-label", "onClick"], wi = ["id", "placeholder", "onKeydown"], ki = { class: "dc-panel__actions" }, bi = ["disabled"], $i = {
  key: 0,
  class: "dc-panel__section"
}, xi = /* @__PURE__ */ ie({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Jt(), s = be(), r = p(() => ql(s.query.value.expr)), i = p(() => r.value.parts.map(tn)), o = U(r.value.text), l = U(null);
    we(
      () => r.value.text,
      (b) => {
        o.value = b;
      }
    );
    const c = p(() => o.value !== r.value.text);
    function u() {
      if (c.value) {
        const b = Cn(o.value, s.entity.value);
        s.setExpression(hs(r.value.parts, b));
      }
      n("close");
    }
    function h(b) {
      const { parts: C, text: k } = r.value;
      s.setExpression(hs(C.filter((M, R) => R !== b), k));
    }
    function y(b) {
      const { parts: C } = r.value;
      o.value || !C.length || (b.preventDefault(), h(C.length - 1));
    }
    function g() {
      o.value = "", s.clearFilters();
    }
    function w(b, C) {
      s.setFacet(b, C);
    }
    return Ft(() => l.value?.focus()), (b, C) => (f(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: C[2] || (C[2] = et(Fe((k) => n("close"), ["stop"]), ["esc"]))
    }, [
      x("section", mi, [
        x("div", gi, [
          x("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, _i),
          x("div", {
            class: "dc-field",
            onMousedown: C[1] || (C[1] = Fe((k) => l.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(ne, null, he(i.value, (k, M) => (f(), m("button", {
              key: `${M}:${k}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${k}`,
              "aria-label": `Remove ${k}`,
              onClick: (R) => h(M)
            }, F(k), 9, yi))), 128)),
            ft(x("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: l,
              "onUpdate:modelValue": C[0] || (C[0] = (k) => o.value = k),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: i.value.length ? "" : A(s).schema.value.placeholder,
              onKeydown: [
                et(Fe(u, ["prevent"]), ["enter"]),
                et(y, ["backspace"])
              ]
            }, null, 40, wi), [
              [bn, o.value]
            ])
          ], 32)
        ]),
        A(s).entity.value ? (f(!0), m(ne, { key: 0 }, he(A(s).entity.value.facets, (k) => (f(), Y(fr, {
          key: k.key,
          facet: k,
          value: A(s).query.value.facets[k.key],
          onUpdate: (M) => w(k.key, M)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : I("", !0),
        x("div", ki, [
          x("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: u
          }, " Run query "),
          x("button", {
            type: "button",
            class: "dc-button",
            disabled: A(s).isPristine.value && !c.value,
            onClick: g
          }, " Reset ", 8, bi)
        ])
      ]),
      a["panel-section"] ? (f(), m("section", $i, [
        $e(b.$slots, "panel-section", {}, void 0, !0)
      ])) : I("", !0)
    ], 40, hi));
  }
}), pr = /* @__PURE__ */ de(xi, [["__scopeId", "data-v-640ae2f5"]]), Ci = ["checked", "indeterminate"], vr = /* @__PURE__ */ ie({
  __name: "PageTick",
  setup(e) {
    const t = be(), n = p(() => t.rows.value.filter((r) => t.isSelected(r)).length), a = p(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = p(() => n.value > 0 && !a.value);
    return (r, i) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: i[0] || (i[0] = (o) => A(t).selectPage(!a.value))
    }, null, 40, Ci));
  }
}), Mi = {
  key: 0,
  class: "dc-actions"
}, Si = {
  key: 0,
  class: "dc-actions__select"
}, Pi = {
  key: 0,
  class: "dc-actions__all"
}, Ei = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Ai = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Ti = { class: "dc-actions__ops" }, zi = ["disabled"], Li = ["data-dc-operation", "disabled", "onClick"], Ri = ["disabled"], Ii = /* @__PURE__ */ ie({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(() => n.entity.value), s = p(() => !ba(n.query.value, t.views)), r = p(() => s.value && n.selectable.value), i = p(
      () => zn(n.query.value.view, t.views) === "table"
    ), o = p(
      () => s.value && (r.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete || a.value?.operations?.length))
    ), l = p(() => n.selection.value.ids.length), c = p(() => l.value ? `${l.value} selected` : i.value ? "None selected" : "Select all");
    function u(h) {
      return l.value ? `${h} ${l.value}` : h;
    }
    return (h, y) => o.value ? (f(), m("div", Mi, [
      r.value ? (f(), m("div", Si, [
        i.value ? (f(), m("span", Ai, F(c.value), 1)) : (f(), m("label", Pi, [
          ce(vr),
          x("span", Ei, F(c.value), 1)
        ])),
        l.value ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[0] || (y[0] = (g) => A(n).clearSelection())
        }, " Clear ")) : I("", !0)
      ])) : I("", !0),
      x("div", Ti, [
        a.value?.create ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: y[1] || (y[1] = (g) => A(n).create(a.value))
        }, [
          y[4] || (y[4] = x("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ne(" " + F(a.value.create), 1)
        ])) : I("", !0),
        a.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !l.value,
          onClick: y[2] || (y[2] = (g) => A(n).duplicate())
        }, F(u(a.value.duplicate)), 9, zi)) : I("", !0),
        (f(!0), m(ne, null, he(a.value?.operations ?? [], (g) => (f(), m("button", {
          key: g.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": g.key,
          disabled: !l.value,
          onClick: (w) => A(n).operate(g.key)
        }, F(u(g.label)), 9, Li))), 128)),
        a.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !l.value,
          onClick: y[3] || (y[3] = (g) => A(n).delete())
        }, F(u(a.value.delete)), 9, Ri)) : I("", !0)
      ])
    ])) : I("", !0);
  }
}), hr = /* @__PURE__ */ de(Ii, [["__scopeId", "data-v-8548a5bf"]]), Fi = ["href"], Ni = /* @__PURE__ */ ie({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(r) {
      if (n.href && ar(r)) {
        r.stopPropagation();
        return;
      }
      r.preventDefault(), a("press", In(r), r);
    }
    return (r, i) => e.href ? (f(), m("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      $e(r.$slots, "default", {}, void 0, !0)
    ], 8, Fi)) : (f(), m("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      $e(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Ge = /* @__PURE__ */ de(Ni, [["__scopeId", "data-v-a9383f64"]]);
function Di(e, t) {
  if (!e) return null;
  const n = Ke(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Oi(e, t) {
  const n = je(t, "state"), a = je(t, "tint");
  return {
    identity: gn(je(t, "identity"), e),
    reference: gn(je(t, "reference"), e),
    metrics: Ws(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: en(s, e)
    })),
    state: n ? Ke(n, e) ?? null : null,
    updated: gn(je(t, "updated"), e),
    image: Di(je(t, "image"), e),
    tint: a ? Ke(a, e) ?? null : null
  };
}
function mr(e, t, n, a, s = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: Sl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: xl(t),
    parts: Oi(e, r),
    pinned: a,
    selected: s
  };
}
function bt() {
  const e = be(), t = p(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return p(
    () => e.rows.value.map(
      (n, a) => mr(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Bi = ["data-dc-status"], qi = /* @__PURE__ */ ie({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, F(e.status), 9, Bi));
  }
}), nn = /* @__PURE__ */ de(qi, [["__scopeId", "data-v-23e59fbf"]]), Vi = { key: 1 }, Ki = /* @__PURE__ */ ie({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = p(() => t.column.label ?? ""), r = p(() => en(t.column, t.entry.row)), i = p(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function o(l, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, l);
    }
    return (l, c) => a.value ? (f(), Y(Ge, {
      key: 0,
      class: "dc-drill",
      href: i.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: o
    }, {
      default: xe(() => [
        $e(l.$slots, "default", {}, () => [
          Ne(F(r.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (f(), m("span", Vi, [
      $e(l.$slots, "default", {}, () => [
        Ne(F(r.value), 1)
      ], !0)
    ]));
  }
}), an = /* @__PURE__ */ de(Ki, [["__scopeId", "data-v-d3e7f4e0"]]), Hi = ["data-dc-active", "aria-pressed", "aria-label"], Wi = /* @__PURE__ */ ie({
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
    }, F(e.pinned ? "★" : "☆"), 9, Hi));
  }
}), Na = /* @__PURE__ */ de(Wi, [["__scopeId", "data-v-ef63d763"]]), Ui = ["src"], ji = /* @__PURE__ */ ie({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = U(!1);
    return we(
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
    }, null, 40, Ui)) : I("", !0);
  }
}), Fn = /* @__PURE__ */ de(ji, [["__scopeId", "data-v-afaab300"]]), Gi = ["data-dc-standing", "title", "aria-label"], Xi = /* @__PURE__ */ ie({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(() => Ln(t.entry.entity, t.entry.row)), s = p(() => Sa(n.query.value.expr, a.value)), r = p(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function i(o) {
      o.stopPropagation(), n.setExpression(nr(n.query.value.expr, a.value));
    }
    return (o, l) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: r.value,
      "aria-label": r.value,
      onClick: i
    }, F(s.value === "in" ? "+" : "−"), 9, Gi)) : I("", !0);
  }
}), Da = /* @__PURE__ */ de(Xi, [["__scopeId", "data-v-4b8d4166"]]), Qi = ["aria-label"], Yi = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Zi = /* @__PURE__ */ ie({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = p(() => [
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
      (f(!0), m(ne, null, he(s.value, (c) => (f(), m("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": r(c.standing) ? "true" : "false",
        "aria-checked": r(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (u) => i(u, c.standing)
      }, F(c.sign), 9, Yi))), 128))
    ], 8, Qi));
  }
}), ia = /* @__PURE__ */ de(Zi, [["__scopeId", "data-v-adaa8412"]]), gr = /* @__PURE__ */ ie({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(() => Ln(t.entry.entity, t.entry.row)), s = p(() => Sa(n.query.value.expr, a.value));
    function r(i) {
      n.setExpression(la(n.query.value.expr, a.value, i));
    }
    return (i, o) => a.value !== null ? (f(), Y(ia, {
      key: 0,
      class: "dc-row-standing",
      standing: s.value,
      name: e.entry.parts.identity,
      onSet: r
    }, null, 8, ["standing", "name"])) : I("", !0);
  }
}), Ji = /* @__PURE__ */ ie({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = U(null);
    function r(u) {
      s.value = In(u).exclude ? "out" : "in";
    }
    function i(u) {
      r(u), window.addEventListener("keydown", r), window.addEventListener("keyup", r);
    }
    function o() {
      s.value = null, window.removeEventListener("keydown", r), window.removeEventListener("keyup", r);
    }
    He(o);
    const l = p(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(u, h) {
      h.stopPropagation(), n.drill(t.entry.row, null, u);
    }
    return (u, h) => a.value ? (f(), Y(Ge, {
      key: 0,
      class: "dc-scope",
      href: l.value,
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: i,
      onPointermove: r,
      onPointerleave: o,
      onPress: c
    }, {
      default: xe(() => [...h[0] || (h[0] = [
        Ne(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : I("", !0);
  }
}), sn = /* @__PURE__ */ de(Ji, [["__scopeId", "data-v-05d2c233"]]), ec = ["checked", "aria-label"], $t = /* @__PURE__ */ ie({
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
    }, null, 8, ec));
  }
}), tc = { class: "dc-card__top dc-mono" }, nc = { class: "dc-card__lead" }, ac = {
  key: 2,
  class: "dc-card__entity"
}, sc = { class: "dc-card__top-right" }, rc = { class: "dc-card__names" }, lc = { class: "dc-card__primary" }, oc = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, ic = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, cc = {
  key: 0,
  class: "dc-card__date"
}, uc = /* @__PURE__ */ ie({
  __name: "CardsView",
  setup(e) {
    const t = be(), n = bt(), a = p(() => t.isEverything.value), s = (i) => i.entity?.card === "picture", r = p(() => n.value.length > 0 && n.value.every(s));
    return (i, o) => (f(), m("div", {
      class: dt(["dc-cards", { "dc-cards--pictures": r.value }])
    }, [
      (f(!0), m(ne, null, he(A(n), (l) => (f(), m("div", {
        key: l.key,
        class: dt(["dc-card", { "dc-card--picture": s(l) }])
      }, [
        x("div", tc, [
          x("span", nc, [
            A(t).selectable.value ? (f(), Y($t, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : I("", !0),
            s(l) ? I("", !0) : (f(), m(ne, { key: 1 }, [
              Ne(F(l.ordinal), 1)
            ], 64)),
            a.value ? (f(), m("span", ac, F(l.entityLabel), 1)) : I("", !0)
          ]),
          x("span", sc, [
            l.parts.state && !s(l) ? (f(), Y(nn, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : I("", !0),
            s(l) ? (f(), Y(Da, {
              key: 1,
              entry: l
            }, null, 8, ["entry"])) : (f(), Y(gr, {
              key: 2,
              entry: l
            }, null, 8, ["entry"])),
            ce(sn, { entry: l }, null, 8, ["entry"]),
            A(t).pinnable.value ? (f(), Y(Na, {
              key: 3,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : I("", !0)
          ])
        ]),
        ce(Ge, {
          class: "dc-card__open",
          href: A(t).pressHref(l.row),
          onPress: (c) => A(t).activate(l.row, c)
        }, {
          default: xe(() => [
            l.parts.image ? (f(), Y(Fn, {
              key: 0,
              class: "dc-card__image",
              src: l.parts.image
            }, null, 8, ["src"])) : I("", !0),
            x("span", rc, [
              x("span", lc, F(l.parts.identity), 1),
              s(l) ? I("", !0) : (f(), m("span", oc, F(l.parts.reference), 1))
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(l) ? I("", !0) : (f(), m("div", ic, [
          (f(!0), m(ne, null, he(l.parts.metrics.slice(0, 2), (c) => (f(), Y(an, {
            key: c.column.key ?? c.label,
            entry: l,
            column: c.column
          }, {
            default: xe(() => [
              Ne(F(c.label) + " " + F(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (f(), m("span", cc, F(l.parts.updated), 1)) : I("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), _r = /* @__PURE__ */ de(uc, [["__scopeId", "data-v-046f11c3"]]), dc = { class: "dc-grid" }, fc = { class: "dc-tile__scrim" }, pc = { class: "dc-tile__top dc-mono" }, vc = { class: "dc-tile__chip" }, hc = { class: "dc-tile__caption" }, mc = { class: "dc-tile__secondary dc-truncate" }, gc = { class: "dc-tile__primary" }, _c = /* @__PURE__ */ ie({
  __name: "GridView",
  setup(e) {
    const t = be(), n = bt();
    return (a, s) => (f(), m("div", dc, [
      (f(!0), m(ne, null, he(A(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        ce(Ge, {
          class: "dc-tile",
          style: Ae({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          href: A(t).pressHref(r.row),
          onPress: (i) => A(t).activate(r.row, i)
        }, {
          default: xe(() => [
            r.parts.image ? (f(), Y(Fn, {
              key: 0,
              class: "dc-tile__image",
              src: r.parts.image
            }, null, 8, ["src"])) : I("", !0),
            x("span", fc, [
              x("span", pc, [
                x("span", vc, F(r.ordinal), 1)
              ]),
              x("span", hc, [
                x("span", mc, F(r.parts.reference), 1),
                x("span", gc, F(r.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        A(t).selectable.value ? (f(), Y($t, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : I("", !0)
      ]))), 128))
    ]));
  }
}), yr = /* @__PURE__ */ de(_c, [["__scopeId", "data-v-12dd4d94"]]);
function ws(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Gn(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function yc(e) {
  return e > 0 ? e : 1 / 0;
}
function wc(e, t, n) {
  const { width: a, height: s, gap: r = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const i = [];
  let o = [], l = 0, c = 0;
  for (const u of e) {
    const h = t(u), y = Math.max(h.ratio, Number.EPSILON), g = h.height && h.height > 0 ? Math.max(c, h.height) : c, w = Gn(g, s), b = ws(l + y, o.length + 1, a, r);
    if (b > w) {
      o.push(u), l += y, c = g;
      continue;
    }
    const C = Gn(c, s), k = o.length ? ws(l, o.length, a, r) : 1 / 0;
    k <= yc(c) && k - C < w - b ? (i.push({ items: o, height: k, filled: !0 }), o = [u], l = y, c = h.height && h.height > 0 ? h.height : 0) : (i.push({ items: [...o, u], height: b, filled: !0 }), o = [], l = 0, c = 0);
  }
  return o.length && i.push({ items: o, height: Gn(c, s), filled: !1 }), i;
}
const kc = { class: "dc-images" }, bc = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, $c = 240, fn = 8, xc = 1, Cc = /* @__PURE__ */ ie({
  __name: "ImagesView",
  setup(e) {
    const t = be(), n = bt(), a = rs(/* @__PURE__ */ new Map()), s = rs(/* @__PURE__ */ new Set());
    function r(w, b) {
      const C = b.target;
      C.naturalWidth > 0 && C.naturalHeight > 0 && a.set(w, { width: C.naturalWidth, height: C.naturalHeight });
    }
    function i(w) {
      const b = w.parts.image;
      return b && !s.has(b) ? b : null;
    }
    function o(w) {
      const b = i(w);
      return b ? a.get(b) : void 0;
    }
    function l(w) {
      const b = o(w);
      return b ? { ratio: b.width / b.height, height: b.height } : { ratio: xc };
    }
    const c = U(null), u = U(0);
    let h = null;
    function y() {
      u.value = c.value?.clientWidth ?? 0;
    }
    Rs(() => {
      y(), !(!c.value || typeof ResizeObserver > "u") && (h = new ResizeObserver(y), h.observe(c.value));
    }), He(() => {
      h?.disconnect(), h = null;
    });
    const g = p(() => {
      const w = wc(n.value, l, {
        width: u.value,
        height: $c,
        gap: fn
      }), b = [];
      let C = 0;
      for (const k of w) {
        let M = 0;
        for (const R of k.items) {
          const $ = l(R).ratio * k.height, E = o(R), D = E !== void 0 && E.height < k.height;
          b.push({
            entry: R,
            style: {
              top: `${C}px`,
              left: `${M}px`,
              width: `${$}px`,
              height: `${k.height}px`
            },
            picture: D ? { width: `${E.width}px`, height: `${E.height}px` } : { width: "100%", height: "100%" }
          }), M += $ + fn;
        }
        C += k.height + fn;
      }
      return { boxes: b, height: w.length ? C - fn : 0 };
    });
    return (w, b) => (f(), m("div", kc, [
      x("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Ae({ height: `${g.value.height}px` })
      }, [
        (f(!0), m(ne, null, he(g.value.boxes, ({ entry: C, style: k, picture: M }) => (f(), m("div", {
          key: C.key,
          class: "dc-images__cell",
          style: Ae(k)
        }, [
          ce(Ge, {
            class: "dc-images__open",
            title: C.parts.identity,
            "aria-label": C.parts.identity,
            href: A(t).pressHref(C.row),
            onPress: (R) => A(t).activate(C.row, R)
          }, {
            default: xe(() => [
              i(C) ? (f(), Y(Fn, {
                key: 0,
                class: "dc-images__picture",
                style: Ae(M),
                src: i(C),
                onLoad: (R) => r(i(C), R),
                onError: (R) => s.add(i(C))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), m("span", bc, F(C.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          A(t).selectable.value ? (f(), Y($t, {
            key: 0,
            class: "dc-images__tick",
            row: C.row,
            selected: C.selected,
            name: C.parts.identity
          }, null, 8, ["row", "selected", "name"])) : I("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), wr = /* @__PURE__ */ de(Cc, [["__scopeId", "data-v-d77205b8"]]), Mc = { class: "dc-links" }, Sc = { class: "dc-link__primary dc-truncate" }, Pc = { class: "dc-link__secondary dc-mono dc-truncate" }, Ec = /* @__PURE__ */ ie({
  __name: "LinksView",
  setup(e) {
    const t = be(), n = bt();
    return (a, s) => (f(), m("div", Mc, [
      (f(!0), m(ne, null, he(A(n), (r) => (f(), m("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        A(t).selectable.value ? (f(), Y($t, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : I("", !0),
        ce(Ge, {
          class: "dc-link",
          href: A(t).pressHref(r.row),
          onPress: (i) => A(t).activate(r.row, i)
        }, {
          default: xe(() => [
            x("span", Sc, F(r.parts.identity), 1),
            x("span", Pc, F(r.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), kr = /* @__PURE__ */ de(Ec, [["__scopeId", "data-v-f47b75cf"]]), Ac = {
  class: "dc-list",
  role: "list"
}, Tc = { class: "dc-list__ordinal dc-mono" }, zc = { class: "dc-list__identity" }, Lc = { class: "dc-list__primary dc-truncate" }, Rc = { class: "dc-list__secondary dc-mono dc-truncate" }, Ic = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Fc = { class: "dc-list__metrics dc-mono" }, Nc = { class: "dc-list__trailing" }, Dc = /* @__PURE__ */ ie({
  __name: "ListView",
  setup(e) {
    const t = be(), n = bt(), a = p(() => t.isEverything.value);
    return (s, r) => (f(), m("div", Ac, [
      (f(!0), m(ne, null, he(A(n), (i) => (f(), m("div", {
        key: i.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        A(t).selectable.value ? (f(), Y($t, {
          key: 0,
          class: "dc-list__tick",
          row: i.row,
          selected: i.selected,
          name: i.parts.identity
        }, null, 8, ["row", "selected", "name"])) : I("", !0),
        ce(gr, {
          class: "dc-list__standing",
          entry: i
        }, null, 8, ["entry"]),
        ce(Ge, {
          class: "dc-list__open",
          href: A(t).pressHref(i.row),
          onPress: (o) => A(t).activate(i.row, o)
        }, {
          default: xe(() => [
            x("span", Tc, F(i.ordinal), 1),
            x("span", zc, [
              x("span", Lc, F(i.parts.identity), 1),
              x("span", Rc, F(i.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (f(), m("span", Ic, F(i.entityLabel), 1)) : I("", !0),
        x("span", Fc, [
          (f(!0), m(ne, null, he(i.parts.metrics.slice(0, 2), (o) => (f(), Y(an, {
            key: o.column.key ?? o.label,
            entry: i,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        x("span", Nc, [
          i.parts.state ? (f(), Y(nn, {
            key: 0,
            status: i.parts.state
          }, null, 8, ["status"])) : I("", !0),
          ce(sn, { entry: i }, null, 8, ["entry"]),
          A(t).pinnable.value ? (f(), Y(Na, {
            key: 1,
            row: i.row,
            name: i.parts.identity,
            pinned: i.pinned
          }, null, 8, ["row", "name", "pinned"])) : I("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ca = /* @__PURE__ */ de(Dc, [["__scopeId", "data-v-9b2e8a87"]]), Oc = { class: "dc-preview" }, Bc = { class: "dc-preview__pager dc-mono" }, qc = ["disabled"], Vc = { "aria-live": "polite" }, Kc = ["disabled"], Hc = {
  key: 0,
  class: "dc-preview__card"
}, Wc = ["src"], Uc = { class: "dc-preview__body" }, jc = { class: "dc-preview__top" }, Gc = { class: "dc-preview__badges" }, Xc = { class: "dc-preview__entity dc-mono" }, Qc = { class: "dc-preview__marks" }, Yc = { class: "dc-preview__primary" }, Zc = { class: "dc-preview__secondary dc-mono" }, Jc = { class: "dc-preview__fields" }, eu = { class: "dc-preview__key" }, tu = { class: "dc-preview__value dc-mono" }, nu = /* @__PURE__ */ ie({
  __name: "PreviewView",
  setup(e) {
    const t = be(), n = bt(), a = U(0);
    we(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = p(() => n.value[a.value]), r = p(() => {
      const l = s.value;
      if (!l) return [];
      const c = je(l.columns, "reference"), u = je(l.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: l.parts.reference, column: null }] : [],
        ...l.parts.metrics.map((h) => ({
          key: h.label,
          value: h.text,
          column: h.column
        })),
        ...u ? [{ key: u.label ?? "Updated", value: l.parts.updated, column: null }] : []
      ];
    }), i = p(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${l}`;
    }), o = (l) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + l)));
    };
    return (l, c) => (f(), m("div", Oc, [
      x("div", Bc, [
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (u) => o(-1))
        }, " ‹ ", 8, qc),
        x("span", Vc, F(i.value), 1),
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= A(n).length - 1,
          onClick: c[1] || (c[1] = (u) => o(1))
        }, " › ", 8, Kc)
      ]),
      s.value ? (f(), m("div", Hc, [
        x("div", {
          class: "dc-preview__media",
          style: Ae({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), m("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Wc)) : (f(), m(ne, { key: 1 }, [
            Ne(" preview ")
          ], 64))
        ], 4),
        x("div", Uc, [
          x("div", jc, [
            x("span", Gc, [
              A(t).selectable.value ? (f(), Y($t, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : I("", !0),
              s.value.parts.state ? (f(), Y(nn, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : I("", !0),
              x("span", Xc, F(s.value.entityLabel), 1)
            ]),
            x("span", Qc, [
              ce(Da, { entry: s.value }, null, 8, ["entry"]),
              ce(sn, { entry: s.value }, null, 8, ["entry"]),
              A(t).pinnable.value ? (f(), Y(Na, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : I("", !0)
            ])
          ]),
          x("div", null, [
            x("div", Yc, F(s.value.parts.identity), 1),
            x("div", Zc, F(s.value.parts.reference), 1)
          ]),
          x("dl", Jc, [
            (f(!0), m(ne, null, he(r.value, (u) => (f(), m("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              x("dt", eu, F(u.key), 1),
              x("dd", tu, [
                u.column && s.value ? (f(), Y(an, {
                  key: 0,
                  entry: s.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (f(), m(ne, { key: 1 }, [
                  Ne(F(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          ce(Ge, {
            class: "dc-preview__open",
            href: s.value ? A(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (u) => s.value && A(t).activate(s.value.row, u))
          }, {
            default: xe(() => [...c[3] || (c[3] = [
              Ne(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : I("", !0)
    ]));
  }
}), br = /* @__PURE__ */ de(nu, [["__scopeId", "data-v-1bc19613"]]);
function au() {
  const e = be();
  return p(() => Cl(e.schema.value, e.entity.value));
}
const su = {
  key: 5,
  class: "dc-cell__text"
}, ru = /* @__PURE__ */ ie({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(() => t.column.kind ?? "text"), s = p(() => Ke(t.column, t.entry.row)), r = p(
      () => a.value === "ordinal" ? t.entry.ordinal : en(t.column, t.entry.row)
    ), i = p(() => s.value), o = p(() => t.column.activate === !0 || !!t.column.click), l = p(() => aa(t.column)), c = p(() => Us(t.column, t.entry.row));
    function u(g) {
      o.value && (g.stopPropagation(), h(In(g)));
    }
    function h(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const y = p(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (g, w) => a.value === "component" && e.column.component ? (f(), Y(ya(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), Y(nn, {
      key: 1,
      status: i.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), Y(Fn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Ae({ maxHeight: e.column.height }),
      onClick: u
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), Y(an, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), Y(Ge, {
      key: 4,
      class: dt(["dc-table__open", { "dc-truncate": l.value }]),
      href: y.value,
      title: c.value,
      onPress: w[0] || (w[0] = (b, C) => {
        C.stopPropagation(), h(b);
      })
    }, {
      default: xe(() => [
        Ne(F(r.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (f(), m("span", su, F(r.value), 1));
  }
}), ks = /* @__PURE__ */ de(ru, [["__scopeId", "data-v-af24c370"]]), lu = {
  key: 0,
  class: "dc-table__none"
}, ou = { class: "dc-table__detail" }, iu = ["data-dc-wrap"], cu = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, uu = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, du = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], fu = ["onClick"], pu = {
  key: 2,
  class: "dc-table__head"
}, vu = ["onClick"], hu = {
  key: 0,
  class: "dc-table__pick"
}, mu = {
  key: 1,
  class: "dc-table__standing"
}, gu = ["data-dc-align", "data-dc-hide", "title"], _u = {
  key: 0,
  class: "dc-table__name"
}, yu = /* @__PURE__ */ ie({
  __name: "TableView",
  setup(e) {
    const t = be(), n = bt(), a = au();
    function s(T, H) {
      const K = t.pressHref(T);
      if (K && ar(H)) {
        const W = H.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(K, "_blank", W);
        return;
      }
      t.activate(T, In(H));
    }
    function r(T) {
      const H = Il(T, t.entity.value), K = H ? `Shortcut: ${H}` : void 0;
      return [T.hint, K].filter(Boolean).join(`
`) || void 0;
    }
    const i = p(
      () => a.value.find((T) => T.scope)
    ), o = p(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((T) => T.scope)
    ), l = (T) => Ln(T.entity, T.row), c = (T) => Sa(t.query.value.expr, l(T));
    function u(T, H) {
      t.setExpression(la(t.query.value.expr, l(T), H));
    }
    const h = p(() => {
      const T = n.value.filter((K) => l(K) !== null), H = T.filter((K) => K.selected);
      return H.length ? H : T;
    }), y = p(() => h.value.some((T) => T.selected)), g = p(() => {
      const T = h.value[0];
      return T ? c(T) : null;
    }), w = p(
      () => h.value.some((T) => c(T) !== g.value)
    ), b = p(
      () => y.value ? "the ticked rows" : "every row on this page"
    );
    function C(T) {
      t.setExpression(
        h.value.reduce(
          (H, K) => la(H, l(K), T),
          t.query.value.expr
        )
      );
    }
    const k = p(
      () => a.value.some((T) => T.kind === "image" || T.height !== void 0)
    );
    function M(T) {
      T && (t.query.value.sort === T ? t.toggleDirection() : t.setSort(T));
    }
    const R = p(() => t.entity.value?.label ?? "The result set"), $ = p(() => new Set(t.sorts.value.map((T) => T.key))), E = (T) => T.sort !== void 0 && $.value.has(T.sort), D = (T) => {
      if (E(T))
        return t.query.value.sort !== T.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function S(T) {
      return [
        cs(T),
        T.muted ? "dc-table__muted" : "",
        T.mono ? "dc-mono" : "",
        aa(T) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function z(T, H) {
      if (!(!aa(T) || T.activate || T.click))
        return Us(T, H.row);
    }
    return (T, H) => A(a).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": k.value ? "" : void 0
    }, [
      x("thead", null, [
        x("tr", null, [
          A(t).selectable.value ? (f(), m("th", cu, [
            ce(vr)
          ])) : I("", !0),
          o.value ? (f(), m("th", uu, [
            h.value.length ? (f(), Y(ia, {
              key: 0,
              standing: g.value,
              mixed: w.value,
              name: b.value,
              onSet: C
            }, null, 8, ["standing", "mixed", "name"])) : I("", !0)
          ])) : I("", !0),
          (f(!0), m(ne, null, he(A(a), (K, W) => (f(), m("th", {
            key: A(os)(K, W),
            scope: "col",
            class: dt(A(cs)(K)),
            style: Ae({ width: K.width }),
            "data-dc-align": A(is)(K),
            "data-dc-hide": K.hideBelow,
            "aria-sort": D(K),
            title: r(K)
          }, [
            E(K) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (ye) => M(K.sort)
            }, F(K.label), 9, fu)) : (f(), m(ne, { key: 1 }, [
              Ne(F(K.label), 1)
            ], 64)),
            K.header ? (f(), m("span", pu, [
              (f(), Y(ya(K.header), {
                column: K,
                entity: A(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : I("", !0)
          ], 14, du))), 128))
        ])
      ]),
      x("tbody", null, [
        (f(!0), m(ne, null, he(A(n), (K) => (f(), m("tr", {
          key: K.key,
          class: "dc-table__row",
          onClick: (W) => s(K.row, W)
        }, [
          A(t).selectable.value ? (f(), m("td", hu, [
            ce($t, {
              row: K.row,
              selected: K.selected,
              name: K.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : I("", !0),
          o.value ? (f(), m("td", mu, [
            l(K) !== null ? (f(), Y(ia, {
              key: 0,
              standing: c(K),
              name: K.parts.identity,
              onSet: (W) => u(K, W)
            }, null, 8, ["standing", "name", "onSet"])) : I("", !0)
          ])) : I("", !0),
          (f(!0), m(ne, null, he(A(a), (W, ye) => (f(), m("td", {
            key: A(os)(W, ye),
            class: dt(S(W)),
            "data-dc-align": A(is)(W),
            "data-dc-hide": W.hideBelow,
            title: z(W, K)
          }, [
            W === i.value ? (f(), m("span", _u, [
              ce(ks, {
                column: W,
                entry: K
              }, null, 8, ["column", "entry"]),
              ce(sn, { entry: K }, null, 8, ["entry"])
            ])) : (f(), Y(ks, {
              key: 1,
              column: W,
              entry: K
            }, null, 8, ["column", "entry"]))
          ], 10, gu))), 128))
        ], 8, vu))), 128))
      ])
    ], 8, iu)) : (f(), m("p", lu, [
      H[2] || (H[2] = x("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      x("span", ou, [
        Ne(F(R.value) + " has no ", 1),
        H[0] || (H[0] = x("code", null, "columns", -1)),
        H[1] || (H[1] = Ne(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), $r = /* @__PURE__ */ de(yu, [["__scopeId", "data-v-a4e80859"]]);
function wu(e) {
  const t = wt([]), n = U(!1), a = wt(null);
  let s = 0;
  const r = (l, c, u, h, y) => ({
    entity: l,
    rows: e.limit.value > 0 ? c.rows.map((g, w) => mr(g, w, l, e.isPinned(g.id))) : [],
    total: c.total,
    count: u ? l.count : String(c.total),
    pinned: ku(h, c, y)
  }), i = () => {
    const l = ++s, c = e.query.value, u = e.schema.value, h = e.entities.value, y = e.limit.value, g = e.within?.value.trim() ?? "", w = ka(c) && !g, b = g ? Ca(g, c.expr) : c.expr, C = h.map((k) => ({
      entity: k,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: k.key, expr: b, facets: Nt(k), page: 1 },
        schema: u,
        entity: k,
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
    if (C.every(({ outcome: k }) => !(k instanceof Promise))) {
      t.value = C.map(
        ({ entity: k, outcome: M }) => r(k, M, w, u, b)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(C.map(({ outcome: k }) => Promise.resolve(k))).then((k) => {
      l === s && (t.value = k.map(
        (M, R) => r(C[R].entity, M, w, u, b)
      ), a.value = null);
    }).catch((k) => {
      l === s && (a.value = k, t.value = []);
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
  return we(
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
function ku(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const r = Wt(e, a);
  return !!r && Ma(s, r) === s;
}
const bu = ["data-dc-pending", "data-dc-heads-only"], $u = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, xu = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Cu = {
  key: 2,
  class: "dc-types__state"
}, Mu = ["data-dc-empty"], Su = { class: "dc-type__name" }, Pu = { class: "dc-type__count dc-mono" }, Eu = { class: "dc-type__sr" }, Au = {
  key: 0,
  class: "dc-type__empty"
}, Tu = { class: "dc-type__identity" }, zu = { class: "dc-type__primary dc-truncate" }, Lu = { class: "dc-type__secondary dc-mono dc-truncate" }, Ru = { class: "dc-type__trailing dc-mono" }, Iu = { class: "dc-type__metric-value" }, Fu = { class: "dc-type__metric-label" }, Nu = {
  key: 0,
  class: "dc-type__date"
}, Du = ["onClick"], Ou = /* @__PURE__ */ ie({
  __name: "TypeCardsView",
  setup(e) {
    const t = be(), { previews: n, pending: a, error: s } = wu({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (l) => t.isPinnedId(l)
    }), r = p(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), i = p(() => t.previewsPerType.value <= 0), o = p(
      () => n.value.filter(
        (l) => !l.pinned && (l.total > 0 || !i.value && l.entity.create)
      )
    );
    return (l, c) => (f(), m("div", {
      class: "dc-types",
      "data-dc-pending": A(a) ? "true" : "false",
      "data-dc-heads-only": i.value ? "true" : "false"
    }, [
      $e(l.$slots, "before", {}, void 0, !0),
      A(s) ? (f(), m("p", $u, " Could not load results: " + F(A(s) instanceof Error ? A(s).message : "the data source failed."), 1)) : !o.value.length && A(a) ? (f(), m("p", xu, " Running query… ")) : o.value.length ? I("", !0) : (f(), m("p", Cu, F(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(ne, null, he(o.value, (u) => (f(), m("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.total ? "false" : "true"
      }, [
        ce(Ge, {
          class: "dc-type__head",
          href: A(t).entityHref(u.entity.key),
          onPress: (h) => A(t).setEntity(u.entity.key)
        }, {
          default: xe(() => [
            x("span", Su, F(u.entity.label), 1),
            x("span", Pu, F(u.count), 1),
            c[0] || (c[0] = x("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            x("span", Eu, "Show only " + F(u.entity.label.toLowerCase()), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        u.total ? I("", !0) : (f(), m("p", Au, F(r.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(ne, null, he(u.rows, (h) => (f(), m("div", {
          key: h.key,
          class: "dc-type__row"
        }, [
          ce(Ge, {
            class: "dc-type__open",
            href: A(t).pressHref(h.row),
            onPress: (y) => A(t).activate(h.row, y)
          }, {
            default: xe(() => [
              x("span", Tu, [
                x("span", zu, F(h.parts.identity), 1),
                x("span", Lu, F(h.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          x("span", Ru, [
            (f(!0), m(ne, null, he(h.parts.metrics.slice(0, 1), (y) => (f(), Y(an, {
              key: y.column.key ?? y.label,
              class: "dc-type__metric",
              entry: h,
              column: y.column
            }, {
              default: xe(() => [
                x("span", Iu, F(y.text), 1),
                x("span", Fu, F(y.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            h.parts.updated ? (f(), m("span", Nu, F(h.parts.updated), 1)) : I("", !0),
            ce(Da, { entry: h }, null, 8, ["entry"]),
            ce(sn, { entry: h }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create && !i.value ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (h) => A(t).create(u.entity)
        }, [
          c[1] || (c[1] = x("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ne(" " + F(u.entity.create), 1)
        ], 8, Du)) : I("", !0)
      ], 8, Mu))), 128)),
      $e(l.$slots, "after", {}, void 0, !0)
    ], 8, bu));
  }
}), xr = /* @__PURE__ */ de(Ou, [["__scopeId", "data-v-a7148bf3"]]), Bu = ["data-dc-pending"], qu = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Vu = { class: "dc-results__detail" }, Ku = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Hu = {
  key: 3,
  class: "dc-results__state"
}, Wu = { class: "dc-results__detail" }, Uu = /* @__PURE__ */ ie({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = Jt(), s = {
      list: ca,
      cards: _r,
      grid: yr,
      images: wr,
      table: $r,
      links: kr,
      preview: br
    }, r = p(() => ba(n.query.value, t.views)), i = p(() => zn(n.query.value.view, t.views)), o = p(() => s[i.value] ?? ca), l = p(() => n.rows.value.length > 0), c = p(() => n.error.value !== null), u = U(null);
    return we(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        u.value && (u.value.scrollTop = 0);
      }
    ), (h, y) => (f(), m("div", {
      ref_key: "scroller",
      ref: u,
      class: "dc-results",
      "data-dc-pending": A(n).pending.value ? "true" : "false"
    }, [
      r.value ? (f(), Y(xr, { key: 0 }, hn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: xe(() => [
            $e(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: xe(() => [
            $e(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), m("p", qu, [
        y[1] || (y[1] = x("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        x("span", Vu, F(A(n).error.value instanceof Error ? A(n).error.value.message : "The data source failed."), 1)
      ])) : !l.value && A(n).pending.value ? (f(), m("p", Ku, [...y[2] || (y[2] = [
        x("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : l.value ? (f(), Y(ya(o.value), { key: 4 })) : (f(), m("div", Hu, [
        y[3] || (y[3] = x("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        x("span", Wu, F(A(n).summary.value), 1),
        A(n).isPristine.value ? I("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: y[0] || (y[0] = (g) => A(n).clearFilters())
        }, F(A(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Bu));
  }
}), Cr = /* @__PURE__ */ de(Uu, [["__scopeId", "data-v-d06f9125"]]), ju = ["data-dc-theme"], Gu = ["data-dc-width", "data-dc-align"], Xu = { class: "dc-shell__panel" }, Qu = /* @__PURE__ */ ie({
  __name: "DataShell",
  props: /* @__PURE__ */ $n({
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
  emits: /* @__PURE__ */ $n(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Ht(e, "open"), i = Ht(e, "pinned"), o = Ht(e, "selected"), l = Jt(), c = It(Fs, null), u = a.route || c ? null : ml(), h = a.route ?? c ?? u;
    He(() => u?.dispose?.());
    const y = p(() => to({ seed: a.schema.key })), g = p(() => a.source ?? y.value), w = po({
      schema: () => a.schema,
      adapter: h,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = p(() => a.within?.trim() ?? ""), C = mo({
      query: w.query,
      entity: w.entity,
      setExpression: w.setExpression
    }), k = vo({
      source: g,
      query: C.live,
      schema: p(() => a.schema),
      entity: w.entity,
      limit: p(() => a.limit),
      within: b
    });
    we(w.query, (P) => s("query-change", P)), we(
      [k.pageCount, k.pending, w.query, C.drafting],
      () => {
        if (k.pending.value || C.drafting.value) return;
        const P = k.pageCount.value;
        w.query.value.page > P && w.setPage(P, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const M = Tn() ?? "dc-query-panel", R = U(null);
    function $() {
      r.value && (r.value = !1, Ft(() => {
        R.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const E = p(() => new Set(i.value));
    function D(P) {
      const j = new Set(E.value);
      j.has(P.id) ? j.delete(P.id) : j.add(P.id), i.value = [...j], s("toggle-pin", P);
    }
    const S = p(() => {
      if (a.selectable === !0) return !0;
      const P = w.entity.value;
      return !!(P?.duplicate || P?.delete || P?.operations?.length);
    }), z = p(() => new Set(o.value));
    function T(P) {
      const j = new Set(z.value);
      j.has(P.id) ? j.delete(P.id) : j.add(P.id), o.value = [...j];
    }
    function H(P) {
      const j = new Set(z.value);
      for (const ae of k.rows.value)
        P ? j.add(ae.id) : j.delete(ae.id);
      o.value = [...j];
    }
    function K() {
      o.value.length && (o.value = []);
    }
    const W = p(() => ({
      ids: [...o.value],
      rows: k.rows.value.filter((P) => z.value.has(P.id)),
      entity: w.entity.value
    }));
    we(() => w.query.value.entity, K);
    function ye(P, j, ae = {}) {
      const pe = Wn(a.schema, w.query.value, P, ae);
      ae.exclude ? w.narrow(pe, j?.key ?? w.query.value.entity) : C.release(() => w.narrow(pe, j?.key ?? null, j ? void 0 : "cards")), s("drill", P, j, ae);
    }
    const oe = no({
      ...w,
      draft: C.text,
      liveQuery: C.live,
      drafting: C.drafting,
      commitDraft: C.commit,
      abandonDraft: C.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (P, j) => {
        C.drafting.value ? C.setPage(P) : w.setPage(P, j);
      },
      schema: p(() => a.schema),
      entities: p(() => a.schema.entities),
      rows: k.rows,
      total: k.total,
      limit: p(() => a.limit),
      offset: k.offset,
      pageCount: k.pageCount,
      pending: k.pending,
      counting: k.counting,
      error: k.error,
      source: g,
      previewsPerType: p(() => a.previewsPerType),
      within: b,
      pinnable: p(() => a.pinnable === !0),
      isPinned: (P) => E.value.has(P.id),
      isPinnedId: (P) => E.value.has(P),
      togglePin: D,
      selectable: S,
      selection: W,
      isSelected: (P) => z.value.has(P.id),
      toggleSelect: T,
      selectPage: H,
      clearSelection: K,
      narrowsOnPress: p(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (P, j = {}) => {
        if (a.rowPress === "narrow" && Wt(a.schema, P)) {
          ye(P, null, j);
          return;
        }
        s("activate", P);
      },
      pressHref: (P) => a.rowPress === "narrow" && Wt(a.schema, P) ? w.narrowHref(Wn(a.schema, w.query.value, P), null, "cards") : null,
      drillHref: (P, j) => Wt(a.schema, P) ? w.narrowHref(
        Wn(a.schema, w.query.value, P),
        j?.key ?? null,
        j ? void 0 : "cards"
      ) : null,
      create: (P) => s("create", P),
      duplicate: () => s("duplicate", W.value),
      delete: () => s("delete", W.value),
      operate: (P) => s("operate", P, W.value),
      drill: ye
    }), q = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: w.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: $
    }), (P, j) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Ae(q.value)
    }, [
      x("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ce(dr, {
          ref_key: "headerRef",
          ref: R,
          expanded: r.value,
          "panel-id": A(M),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: j[0] || (j[0] = (ae) => r.value = !r.value)
        }, hn({ _: 2 }, [
          l.actions ? {
            name: "actions",
            fn: xe(() => [
              $e(P.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        r.value ? (f(), m(ne, { key: 0 }, [
          x("div", {
            class: "dc-shell__scrim",
            onClick: $
          }),
          x("div", Xu, [
            ce(pr, {
              "panel-id": A(M),
              onClose: $
            }, hn({ _: 2 }, [
              l["panel-section"] ? {
                name: "panel-section",
                fn: xe(() => [
                  $e(P.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : I("", !0)
      ], 8, Gu),
      ce(hr, { views: e.views }, null, 8, ["views"]),
      $e(P.$slots, "results", {
        rows: A(oe).rows.value,
        total: A(oe).total.value,
        offset: A(oe).offset.value,
        pageCount: A(oe).pageCount.value,
        query: A(oe).liveQuery.value,
        pending: A(oe).pending.value
      }, () => [
        ce(Cr, { views: e.views }, hn({ _: 2 }, [
          l["cards-before"] ? {
            name: "cards-before",
            fn: xe(() => [
              $e(P.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          l["cards-after"] ? {
            name: "cards-after",
            fn: xe(() => [
              $e(P.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, ju));
  }
}), Yu = /* @__PURE__ */ de(Qu, [["__scopeId", "data-v-441e22d4"]]), Zu = ["data-dc-muted", "data-dc-collapsed"], Ju = ["data-dc-collapsible"], ed = ["aria-expanded", "aria-controls"], td = { class: "dc-shell-card__sr" }, nd = { class: "dc-shell-card__title" }, ad = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, sd = {
  key: 1,
  class: "dc-shell-card__aside"
}, rd = ["data-dc-flush"], ld = /* @__PURE__ */ ie({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean },
    collapsible: { type: Boolean },
    collapsed: { type: Boolean, default: void 0 },
    defaultCollapsed: { type: Boolean }
  },
  emits: ["update:collapsed"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = U(n.defaultCollapsed === !0), r = p(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), i = Jt();
    function o(S) {
      return l(S?.() ?? []);
    }
    function l(S) {
      return S.some((z) => z.type === pl ? !1 : z.type === vl ? String(z.children ?? "").trim().length > 0 : z.type === ne ? l(z.children ?? []) : !0);
    }
    const c = p(() => !!n.title || u.value || o(i.head)), u = p(() => o(i.aside)), h = p(() => o(i.default)), y = p(() => o(i.foot)), g = p(() => n.collapsible === !0 && c.value), w = p(() => g.value && (n.collapsed ?? s.value));
    function b() {
      const S = !w.value;
      s.value = S, a("update:collapsed", S);
    }
    const C = Tn() ?? "dc-shell-card", k = `${C}-body`, M = `${C}-foot`, R = p(
      () => [h.value ? k : "", y.value ? M : ""].filter(Boolean).join(" ") || void 0
    ), $ = [
      "a[href]",
      "button",
      "input",
      "select",
      "textarea",
      "label",
      "summary",
      '[contenteditable]:not([contenteditable="false"])',
      '[role="button"]',
      '[role="link"]',
      '[role="checkbox"]',
      '[role="switch"]',
      '[role="tab"]',
      '[role="menuitem"]'
    ].join(", "), E = U(null);
    function D(S) {
      if (!g.value) return;
      const z = S.target?.closest($);
      z && E.value?.contains(z) || typeof window < "u" && window.getSelection()?.toString() || b();
    }
    return (S, z) => (f(), m("section", {
      class: "dc-shell-card",
      style: Ae(r.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": w.value ? "true" : "false"
    }, [
      c.value ? (f(), m("header", {
        key: 0,
        ref_key: "head",
        ref: E,
        class: "dc-shell-card__head",
        "data-dc-collapsible": g.value ? "true" : "false",
        onClick: D
      }, [
        g.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": w.value ? "false" : "true",
          "aria-controls": R.value,
          onClick: b
        }, [
          z[0] || (z[0] = x("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            x("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          x("span", td, F(e.title || "Card"), 1)
        ], 8, ed)) : I("", !0),
        $e(S.$slots, "head", {}, () => [
          x("h2", nd, F(e.title), 1),
          e.count !== void 0 ? (f(), m("span", ad, F(e.count), 1)) : I("", !0)
        ], !0),
        u.value ? (f(), m("span", sd, [
          $e(S.$slots, "aside", {}, void 0, !0)
        ])) : I("", !0)
      ], 8, Ju)) : I("", !0),
      h.value ? ft((f(), m("div", {
        key: 1,
        id: k,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        $e(S.$slots, "default", {}, void 0, !0)
      ], 8, rd)), [
        [xn, !w.value]
      ]) : I("", !0),
      y.value ? ft((f(), m("footer", {
        key: 2,
        id: M,
        class: "dc-shell-card__foot"
      }, [
        $e(S.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [xn, !w.value]
      ]) : I("", !0)
    ], 12, Zu));
  }
}), ep = /* @__PURE__ */ de(ld, [["__scopeId", "data-v-1caf8572"]]), od = ["aria-label"], id = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], cd = /* @__PURE__ */ ie({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = U([]);
    function r(i, o) {
      const l = n.options.length;
      let c = null;
      if (i.key === "ArrowRight" || i.key === "ArrowDown" ? c = (o + 1) % l : i.key === "ArrowLeft" || i.key === "ArrowUp" ? c = (o - 1 + l) % l : i.key === "Home" ? c = 0 : i.key === "End" && (c = l - 1), c === null) return;
      i.preventDefault();
      const u = n.options[c];
      u && (a("update:modelValue", u.key), s.value[c]?.focus());
    }
    return (i, o) => (f(), m("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), m(ne, null, he(e.options, (l, c) => (f(), m("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: dt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (u) => a("update:modelValue", l.key),
        onKeydown: (u) => r(u, c)
      }, F(l.label), 43, id))), 128))
    ], 8, od));
  }
}), ud = /* @__PURE__ */ de(cd, [["__scopeId", "data-v-63fb5482"]]), dd = ["data-dc-theme", "aria-label"], fd = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], pd = /* @__PURE__ */ ie({
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
    const n = e, a = p(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), s = t, r = U(null), i = U([]), o = U(null), l = U(null), c = U(!1), u = p(
      () => n.menus.flatMap(($, E) => Ut($) ? [E] : [])
    );
    function h($, E) {
      const D = i.value[$]?.getBoundingClientRect(), S = n.menus[$];
      !D || !S || !Ut(S) || (l.value = { x: D.left, y: D.bottom + 2, mirrorX: D.right }, o.value = $, c.value = E);
    }
    function y($) {
      const E = o.value;
      o.value = null, l.value = null, $ && E !== null && i.value[E]?.focus();
    }
    function g($) {
      o.value === $ ? y(!0) : h($, !1);
    }
    function w($) {
      o.value === null || o.value === $ || h($, !1);
    }
    function b($, E) {
      const D = u.value;
      if (D.length === 0) return null;
      if ($ === null) return E === 1 ? D[0] ?? null : D[D.length - 1] ?? null;
      const S = D.indexOf($);
      return S === -1 ? D[0] ?? null : D[(S + E + D.length) % D.length] ?? null;
    }
    function C($) {
      const E = $.key;
      if (E === "Escape") {
        if (o.value === null) return;
        $.preventDefault(), y(!0);
        return;
      }
      if (E === "ArrowDown" && o.value === null) {
        const z = k();
        if (z === null) return;
        $.preventDefault(), h(z, !0);
        return;
      }
      if (E !== "ArrowLeft" && E !== "ArrowRight") return;
      const D = o.value ?? k(), S = b(D, E === "ArrowRight" ? 1 : -1);
      S !== null && ($.preventDefault(), o.value !== null ? h(S, !0) : i.value[S]?.focus());
    }
    function k() {
      const $ = i.value.findIndex((E) => E === document.activeElement);
      return $ === -1 ? u.value[0] ?? null : $;
    }
    function M($) {
      const E = $.target;
      !E || r.value?.contains(E) || y(!1);
    }
    we(o, ($) => {
      $ !== null ? window.addEventListener("pointerdown", M, !0) : window.removeEventListener("pointerdown", M, !0);
    }), He(() => window.removeEventListener("pointerdown", M, !0));
    function R($) {
      y(!0), $.action?.(), s("choose", $);
    }
    return ($, E) => (f(), m("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Ae(a.value),
      onKeydown: C
    }, [
      (f(!0), m(ne, null, he(e.menus, (D, S) => (f(), m("button", {
        key: D.id ?? D.label ?? S,
        ref_for: !0,
        ref: (z) => {
          z && (i.value[S] = z);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === S,
        "aria-disabled": D.disabled ? "true" : void 0,
        disabled: D.disabled,
        "data-dc-menu": D.id ?? D.label,
        tabindex: S === (u.value[0] ?? 0) ? 0 : -1,
        onClick: (z) => g(S),
        onMouseenter: (z) => w(S)
      }, F(D.label), 41, fd))), 128)),
      o.value !== null && l.value ? (f(), Y(Fa, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: l.value,
        label: e.menus[o.value]?.label,
        autofocus: c.value,
        onChoose: R,
        onDismiss: E[0] || (E[0] = (D) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
    ], 44, dd));
  }
}), tp = /* @__PURE__ */ de(pd, [["__scopeId", "data-v-93dbd2e4"]]), vd = ["aria-label", "aria-expanded", "disabled"], hd = { "aria-hidden": "true" }, md = /* @__PURE__ */ ie({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = U(null), s = U(null), r = U(null), i = U(!1), o = p(() => r.value !== null);
    function l(w) {
      const b = a.value?.getBoundingClientRect();
      b && (r.value = { x: b.left, y: b.bottom + 4, mirrorX: b.right }, i.value = w);
    }
    function c(w) {
      r.value = null, w && a.value?.focus();
    }
    function u() {
      o.value ? c(!0) : l(!1);
    }
    function h(w) {
      w.key !== "ArrowDown" || o.value || (w.preventDefault(), l(!0));
    }
    function y(w) {
      const b = w.target;
      b && (a.value?.contains(b) || s.value?.root?.contains(b) || c(!1));
    }
    we(o, (w) => {
      w ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), He(() => window.removeEventListener("pointerdown", y, !0));
    function g(w) {
      c(!0), w.action?.(), n("choose", w);
    }
    return (w, b) => (f(), m(ne, null, [
      x("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: u,
        onKeydown: h
      }, [
        x("span", hd, F(e.glyph), 1)
      ], 40, vd),
      r.value ? (f(), Y(Fa, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: i.value,
        onChoose: g,
        onDismiss: b[0] || (b[0] = (C) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
    ], 64));
  }
}), Oa = /* @__PURE__ */ de(md, [["__scopeId", "data-v-48f5ada5"]]), Ot = (e) => e.kind === "split", J = (e) => e.kind === "group", le = (e) => e.kind === "float", gt = { x: 16, y: 16, w: 360, h: 260 }, Pn = 28, Mr = 120, ua = 220, Sr = 38, Mt = 6;
function rn(e, t) {
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
function np(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const _e = (e) => typeof e == "string", Ba = (e) => _e(e) ? tt(e) : e, ln = (e) => _e(e) ? [e] : lt(e), bs = (e) => e.panels.filter(_e), gd = (e) => e.panels.filter((t) => !_e(t)), Ve = (e, t) => e.panels.includes(t);
function on(e, t, n) {
  let a = !1;
  const s = e.panels.map((r) => {
    if (_e(r) || !fe(r, t)) return r;
    const i = n(r);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, panels: s } : e;
}
function Nn(e, t) {
  return { node: e, rect: { ...gt, ...t } };
}
function qa(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Va(e, t) {
  const n = { ...gt, ...t };
  return qa(
    e.map(
      (a, s) => Nn(a, {
        ...n,
        x: n.x + s * Pn,
        y: n.y + s * Pn
      })
    )
  );
}
function Ka(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const Ha = (e, t, n) => Ka("row", e, t, n), ap = (e, t, n) => Ka("column", e, t, n);
function Ce(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const kt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, sp = (e) => ({ ...e, headless: !0 }), rp = (e) => ({ ...e, fixedView: !0 }), _d = (e) => e === "left" || e === "right" ? "row" : "column";
function lt(e) {
  return J(e) ? e.panels.flatMap(ln) : le(e) ? e.frames.flatMap((t) => lt(t.node)) : e.children.flatMap(lt);
}
function fe(e, t) {
  return J(e) ? e.panels.some((n) => _e(n) ? n === t : fe(n, t)) : le(e) ? e.frames.some((n) => fe(n.node, t)) : e.children.some((n) => fe(n, t));
}
const Pr = (e) => lt(e).length === 0, da = (e) => !J(e) && kt(e), fa = (e) => Pr(e) && !da(e);
function Dn(e) {
  return Ot(e) ? e.children.map((t, n) => ({ node: t, index: n })) : le(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => _e(t) ? [] : [{ node: t, index: n }]);
}
const Wa = (e) => Dn(e).map((t) => t.node);
function xt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => _e(a) ? a === t : fe(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Er(e) {
  const t = e.panels[xt(e)];
  return t !== void 0 && _e(t) ? t : "";
}
function Re(e) {
  if (_e(e)) return e;
  if (J(e)) {
    const n = e.panels[xt(e)];
    return n === void 0 ? "" : Re(n);
  }
  if (le(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Re(n.node) : "";
  }
  const t = e.children[0];
  return t ? Re(t) : "";
}
function Tt(e, t) {
  if (J(e) && Ve(e, t)) return e;
  for (const n of Wa(e)) {
    const a = Tt(n, t);
    if (a) return a;
  }
  return null;
}
function yd(e) {
  const t = Wa(e).flatMap(yd);
  return J(e) ? [e, ...t] : t;
}
function Ee(e, t) {
  if (J(e)) {
    for (const n of gd(e)) {
      const a = Ee(n, t);
      if (a) return a;
    }
    return null;
  }
  if (le(e)) {
    for (const n of e.frames)
      if (fe(n.node, t))
        return Ee(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Ee(n, t);
    if (a) return a;
  }
  return null;
}
function Xn(e, t, n = Mr) {
  const a = (o, l) => l > 0 ? Math.max(Math.min(o, l), Math.min(n, l)) : Math.max(o, n), s = a(e.w, t.w), r = a(e.h, t.h), i = (o, l, c) => Math.min(Math.max(o, 0), Math.max(c - l, 0));
  return {
    x: Math.round(i(e.x, s, t.w)),
    y: Math.round(i(e.y, r, t.h)),
    w: Math.round(s),
    h: Math.round(r)
  };
}
function $s(e, t, n, a, s = Mr) {
  let { x: r, y: i, w: o, h: l } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + a), t.includes("n") && (l = e.h - a, i = e.y + a), o < s && (t.includes("w") && (r = e.x + e.w - s), o = s), l < s && (t.includes("n") && (i = e.y + e.h - s), l = s), { x: r, y: i, w: o, h: l };
}
const Ar = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function zt(e, t, n) {
  if (J(e)) return on(e, t, (r) => zt(r, t, n));
  if (le(e)) {
    let r = !1;
    const i = e.frames.map((o) => {
      if (!fe(o.node, t)) return o;
      if (Ee(o.node, t)) {
        const c = zt(o.node, t, n);
        return c === o.node ? o : (r = !0, { ...o, node: c });
      }
      const l = n(o);
      return l === o ? o : (r = !0, l);
    });
    return r ? { ...e, frames: i } : e;
  }
  if (!fe(e, t)) return e;
  let a = !1;
  const s = e.children.map((r) => {
    const i = zt(r, t, n);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, children: s } : e;
}
function wd(e, t, n) {
  return zt(e, t, (a) => Ar(a.rect, n) ? a : { ...a, rect: n });
}
const it = (e) => e.maximized === !0, Tr = (e) => (t) => {
  if (it(t) === e) return t;
  if (e) {
    const { minimized: s, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function kd(e, t, n = !0) {
  return zt(e, t, Tr(n));
}
function lp(e, t) {
  const n = Ee(e, t);
  return n ? kd(e, t, !it(n)) : e;
}
const mt = (e) => e.minimized === !0, zr = (e) => (t) => {
  if (mt(t) === e) return t;
  if (e) {
    const { maximized: s, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function bd(e, t, n = !0) {
  return zt(e, t, zr(n));
}
function op(e, t) {
  const n = Ee(e, t);
  return n ? bd(e, t, !mt(n)) : e;
}
function ht(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = ut(e, t.slice(0, -1));
  return !a || !le(a) ? null : a.frames[n] ?? null;
}
function pa(e, t) {
  if (le(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!fe(a.node, t)) continue;
      const s = pa(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of Dn(e)) {
    if (!fe(n, t)) continue;
    const s = pa(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function Ua(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), r = ut(e, s);
  if (!r || !le(r)) return e;
  const i = r.frames[a];
  if (!i) return e;
  const o = n(i);
  if (o === i) return e;
  const l = [...r.frames];
  return l[a] = o, yt(e, s, { ...r, frames: l });
}
function xs(e, t, n) {
  return Ua(
    e,
    t,
    (a) => Ar(a.rect, n) ? a : { ...a, rect: n }
  );
}
function $d(e, t, n = !0) {
  return Ua(e, t, Tr(n));
}
function xd(e, t, n = !0) {
  return Ua(e, t, zr(n));
}
function jt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (le(e)) {
    const i = e.frames[n];
    if (!i) return e;
    const o = jt(i.node, a), l = o === i.node ? i : { ...i, node: o };
    if (n === e.frames.length - 1 && l === i) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(l), { ...e, frames: c };
  }
  const s = ut(e, [n]);
  if (!s) return e;
  const r = jt(s, a);
  return r === s ? e : yt(e, [n], r);
}
function Cd(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, r) => {
    a && (le(a) && (n[r] = a.frames.length - 1), a = ut(a, [s]));
  }), n;
}
function _n(e, t, n, a) {
  if (J(e)) return on(e, n, (i) => _n(i, t, n, a));
  if (le(e)) {
    const i = e.frames.findIndex((l) => fe(l.node, n)), o = e.frames[i];
    if (!o) return e;
    if (Ee(o.node, n)) {
      const l = _n(o.node, t, n, a);
      if (l === o.node) return e;
      const c = [...e.frames];
      return c[i] = { ...o, node: l }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, Nn(tt(t), a)] };
  }
  if (!fe(e, n)) return e;
  let s = !1;
  const r = e.children.map((i) => {
    const o = _n(i, t, n, a);
    return o !== i && (s = !0), o;
  });
  return s ? { ...e, children: r } : e;
}
function Cs(e, t, n, a) {
  if (t === n || !fe(e, t) || !fe(e, n) || !Ee(e, n)) return e;
  const s = _t(e, t);
  if (!s) return e;
  const r = _n(s, t, n, a);
  return r === s ? e : Se(r);
}
function Md(e, t, n) {
  return le(e) ? { ...e, frames: [...e.frames, Nn(tt(t), n)] } : J(e) ? Rr(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, tt(t)],
    sizes: [...rt(e), 1],
    ...Ce(e)
  };
}
function Lr(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Md(e, t, a);
  const r = n.slice(1), i = (u, h) => h === s ? Lr(u, t, r, a) : _t(u, t);
  if (le(e)) {
    const u = e.frames.flatMap((h, y) => {
      const g = i(h.node, y);
      return g ? [g === h.node ? h : { ...h, node: g }] : [];
    });
    return { ...e, frames: u };
  }
  if (J(e)) {
    const u = xt(e), h = [];
    e.panels.forEach((w, b) => {
      if (_e(w)) {
        w !== t && h.push(w);
        return;
      }
      const C = i(w, b);
      C && h.push(C);
    });
    const g = e.active && h.some((w) => ln(w).includes(e.active)) ? e.active : Re(h[u] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...g ? { active: g } : {},
      ...Ce(e)
    };
  }
  const o = rt(e), l = [], c = [];
  return e.children.forEach((u, h) => {
    const y = i(u, h);
    y && (l.push(y), c.push(o[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: c, ...Ce(e) };
}
function Ms(e, t, n, a) {
  const s = ut(e, n);
  return !s || !Pr(s) || !fe(e, t) ? e : Se(Lr(e, t, n, a));
}
function Qn(e, t) {
  if (J(e)) return on(e, t, (s) => Qn(s, t));
  if (le(e)) {
    const s = e.frames.findIndex((c) => fe(c.node, t)), r = e.frames[s];
    if (!r) return e;
    const i = Qn(r.node, t), o = i === r.node ? r : { ...r, node: i };
    if (s === e.frames.length - 1 && o === r) return e;
    const l = [...e.frames];
    return l.splice(s, 1), l.push(o), { ...e, frames: l };
  }
  if (!fe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = Qn(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function ja(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), s = a.reduce((r, i) => r + i, 0);
  return s <= 0 ? n() : a.map((r) => r / s);
}
const rt = (e) => ja(e.children.length, e.sizes), Xe = (e) => {
  const t = J(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function Se(e) {
  if (J(e)) return Sd(e);
  if (le(e)) {
    const o = e.frames.flatMap((l) => {
      const c = Se(l.node);
      return fa(c) ? [] : [c === l.node ? l : { ...l, node: c }];
    });
    return o.length === e.frames.length && o.every((l, c) => l === e.frames[c]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = rt(e), n = Xe(e), a = [], s = [], r = [];
  e.children.forEach((o, l) => {
    const c = Se(o), u = t[l] ?? 0;
    if (fa(c)) return;
    if (!n && Ot(c) && c.direction === e.direction && !Xe(c) && !kt(c)) {
      const y = rt(c);
      c.children.forEach((g, w) => {
        a.push(g), s.push(u * (y[w] ?? 0));
      });
      return;
    }
    a.push(c), s.push(u);
    const h = n?.[l];
    h && r.push(h);
  });
  const i = a[0];
  return a.length === 1 && i && !kt(e) ? i : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: ja(a.length, s),
    ...Ce(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function Sd(e) {
  if (e.panels.every(_e)) return e;
  const t = Re(e), n = Xe(e), a = [], s = [];
  e.panels.forEach((o, l) => {
    const c = n?.[l];
    if (_e(o)) {
      a.push(o), c && s.push(c);
      return;
    }
    const u = Se(o);
    if (!fa(u)) {
      if (J(u) && !kt(u) && !Xe(u)) {
        a.push(...u.panels);
        return;
      }
      a.push(u), c && s.push(c);
    }
  });
  const r = a[0];
  if (a.length === 1 && r !== void 0 && !_e(r) && !kt(e))
    return r;
  if (a.length === e.panels.length && a.every((o, l) => o === e.panels[l]))
    return e;
  const i = t && a.some((o) => ln(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...i ? { active: i } : {},
    ...Ce(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function _t(e, t) {
  if (le(e)) {
    const i = e.frames.flatMap((o) => {
      const l = _t(o.node, t);
      return l ? [l === o.node ? o : { ...o, node: l }] : [];
    });
    return i.length === 0 && !da(e) ? null : { ...e, frames: i };
  }
  if (J(e)) {
    if (!fe(e, t)) return e;
    const i = xt(e), o = [];
    for (const u of e.panels) {
      if (_e(u)) {
        u !== t && o.push(u);
        continue;
      }
      const h = _t(u, t);
      h && o.push(h);
    }
    if (o.length === 0) return null;
    const c = e.active && o.some((u) => ln(u).includes(e.active)) ? e.active : Re(o[i] ?? o[o.length - 1]);
    return c ? { kind: "group", panels: o, active: c, ...Ce(e) } : { kind: "group", panels: o, ...Ce(e) };
  }
  const n = rt(e), a = [], s = [];
  if (e.children.forEach((i, o) => {
    const l = _t(i, t);
    l && (a.push(l), s.push(n[o] ?? 0));
  }), a.length === 0)
    return da(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...Ce(e) } : null;
  const r = a[0];
  return a.length === 1 && r && !kt(e) ? r : Se({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...Ce(e)
  });
}
function Rr(e, t, n) {
  const a = e.panels.filter((r) => r !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...Ce(e) };
}
function Kt(e, t, n, a, s) {
  const r = (g) => rn(
    g,
    (w) => fe(w, n) ? Kt(w, t, n, a, s) : w
  );
  if (a === "float") return e;
  const i = (g) => on(g, n, (w) => Kt(w, t, n, a, s));
  if (a === "center")
    return J(e) ? Ve(e, n) ? Rr(e, t, s) : i(e) : le(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (g) => fe(g, n) ? Kt(g, t, n, a, s) : g
      )
    };
  const o = _d(a), l = a === "left" || a === "top", c = (g) => ({
    kind: "split",
    direction: o,
    children: l ? [tt(t), g] : [g, tt(t)],
    sizes: [0.5, 0.5]
  });
  if (J(e)) return Ve(e, n) ? c(e) : i(e);
  if (le(e)) return r(e);
  const u = rt(e), h = e.children.findIndex(
    (g) => J(g) && Ve(g, n)
  );
  if (h >= 0 && e.direction === o) {
    const g = (u[h] ?? 0) / 2, w = [...e.children], b = [...u];
    return w.splice(l ? h : h + 1, 0, tt(t)), b.splice(h, 1, g, g), {
      kind: "split",
      direction: o,
      children: w,
      sizes: b,
      ...Ce(e)
    };
  }
  const y = e.children.map((g) => fe(g, n) ? J(g) && Ve(g, n) ? c(g) : Kt(g, t, n, a) : g);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: u,
    ...Ce(e)
  };
}
function Lt(e, t) {
  if (J(e)) {
    if (Ve(e, t))
      return Er(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((l) => !_e(l) && fe(l, t)), r = e.panels[s];
    if (r === void 0 || _e(r)) return e;
    const i = Lt(r, t);
    if (i === r && e.active === t) return e;
    const o = [...e.panels];
    return o[s] = i, { ...e, panels: o, active: t };
  }
  if (!fe(e, t)) return e;
  if (le(e)) return rn(e, (s) => Lt(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const r = Lt(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Gt(e, t, n) {
  if (J(e)) {
    if (!Ve(e, t)) return on(e, t, (c) => Gt(c, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const r = [...e.panels];
    r.splice(a, 1), r.splice(s, 0, t);
    const i = Xe(e), o = i ? [...i] : void 0;
    o && o.splice(s, 0, ...o.splice(a, 1));
    const l = Re(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...Ce(e),
      ...o ? { places: o } : {}
    };
  }
  return fe(e, t) ? le(e) ? rn(e, (a) => Gt(a, t, n)) : { ...e, children: e.children.map((a) => Gt(a, t, n)) } : e;
}
function yn(e, t, n) {
  if (t === n) return e;
  if (J(e)) {
    if (!fe(e, t) && !fe(e, n)) return e;
    const a = (r) => r === t ? n : r === n ? t : r, s = e.panels.map((r) => _e(r) ? a(r) : yn(r, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return le(e) ? rn(e, (a) => yn(a, t, n)) : { ...e, children: e.children.map((a) => yn(a, t, n)) };
}
function pn(e, t, n, a, s) {
  if (a === "float" || !fe(e, t) || !fe(e, n)) return e;
  const r = Tt(e, t);
  if (a === "center" && r && Ve(r, n)) {
    if (s === void 0) return e;
    const o = r.panels.indexOf(t), l = s > o ? s - 1 : s;
    return l === o ? e : Lt(Gt(e, t, l), t);
  }
  if (t === n) return e;
  const i = _t(e, t);
  return i ? Se(Kt(i, t, n, a, s)) : e;
}
function Ir(e, t, n) {
  if (J(e)) {
    const s = e.panels[t];
    if (s === void 0 || _e(s)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (le(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const r = [...e.frames];
    return r[t] = { ...s, node: n }, { ...e, frames: r };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function cn(e, t, n) {
  const a = Dn(e);
  if (!J(e) && a.some(({ node: s }) => J(s) && Ve(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: r } of a) {
    if (!fe(s, t)) continue;
    const i = cn(s, t, n);
    return i ? Ir(e, r, i) : null;
  }
  return null;
}
function ip(e, t, n) {
  const a = cn(
    e,
    t,
    (s) => Ot(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? Se(a) : e;
}
function Fr(e) {
  return le(e) ? [e] : Xe(e) || kt(e) ? [e] : J(e) ? [...e.panels] : e.children.flatMap(Fr);
}
function Nr(e, t) {
  if (J(e)) return e;
  const n = Wa(e).map(Fr), a = n.flat(), s = t && a.some((i) => ln(i).includes(t)) ? t : void 0, r = Pd(e, n);
  return Se({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...Ce(e),
    ...r ? { places: r } : {}
  });
}
function Pd(e, t) {
  const n = le(e) ? e.frames.map(({ node: a, ...s }) => s) : Xe(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function Ed(e, t) {
  const n = cn(e, t, (a) => Nr(a, t));
  return n ? Se(n) : e;
}
function Ga(e, t, n) {
  if (J(e) && Ve(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Dn(e)) {
    if (!fe(a, t)) continue;
    const r = Ga(a, t, n);
    return r ? Ir(e, s, r) : null;
  }
  return null;
}
function Ss(e, t, n) {
  const a = Ga(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const r = Xe(s);
    return {
      ...Ka(n, s.panels.map(Ba)),
      ...Ce(s),
      ...r ? { places: r } : {}
    };
  });
  return a ? Se(a) : e;
}
function va(e, t) {
  if (J(e)) return e;
  if (le(e)) {
    const s = e.frames.findIndex(
      (o) => J(o.node) && o.node.panels.includes(t)
    ), r = e.frames[s], i = r && J(r.node) ? r.node : null;
    if (r && i && i.panels.length > 1) {
      const o = Va(i.panels.map(Ba), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...o, ...e.frames.slice(s + 1)]
      };
    }
    return rn(e, (o) => va(o, t));
  }
  if (!fe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = va(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Ad(e, t, n) {
  const a = Tt(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Ee(e, t)?.node === a) {
    const i = va(e, t);
    return i === e ? e : Se(i);
  }
  const r = Ga(e, t, (i) => ({
    ...qa(Dr(i.panels.map(Ba), Xe(i), n)),
    ...Ce(i)
  }));
  return r ? Se(r) : e;
}
function Dr(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : Va(e, n).frames;
}
function Or(e, t) {
  return { ...qa(Dr(e.children, Xe(e), t)), ...Ce(e) };
}
function cp(e, t, n) {
  const a = cn(
    e,
    t,
    (s) => le(s) ? s : Or(s, n)
  );
  return a ? Se(a) : J(e) && Ve(e, t) ? Va([e], n) : e;
}
function Td(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, r) => n(s) - n(r) || a(s) - a(r));
}
function Br(e, t) {
  const n = Td(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...Ce(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function up(e, t, n = "row") {
  const a = cn(
    e,
    t,
    (s) => le(s) ? Br(s, n) : s
  );
  return a ? Se(a) : e;
}
function qr(e) {
  if (le(e)) return null;
  const t = J(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || _e(t) || J(t) && t.panels.length === 1 && _e(t.panels[0]) ? null : t;
}
const zd = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Ld(e, t) {
  const n = qr(e);
  return n ? t === "inner" ? n : { ...zd(n), ...Ce(e) } : e;
}
function Dt(e) {
  return e.title ? e.title : J(e) ? "" : le(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Xt(e, t) {
  if (J(e)) {
    const a = e.panels[xt(e)];
    return a === void 0 ? "" : _e(a) ? t(a) ?? a : Dt(a) || Xt(a, t);
  }
  if (e.title) return e.title;
  if (le(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? Xt(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? Xt(n, t) : "";
}
function ut(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (Ot(n)) n = n.children[a];
    else if (le(n)) n = n.frames[a]?.node;
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
  if (le(e)) {
    const l = e.frames[a];
    if (!l) return e;
    const c = yt(l.node, s, n);
    if (c === l.node) return e;
    const u = [...e.frames];
    return u[a] = { ...l, node: c }, { ...e, frames: u };
  }
  if (J(e)) {
    const l = e.panels[a];
    if (l === void 0 || _e(l)) return e;
    const c = yt(l, s, n);
    if (c === l) return e;
    const u = [...e.panels];
    return u[a] = c, { ...e, panels: u };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = yt(r, s, n);
  if (i === r) return e;
  const o = [...e.children];
  return o[a] = i, { ...e, children: o };
}
function wn(e, t, n) {
  if (t.length === 0)
    return Ot(e) ? { ...e, sizes: ja(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (le(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const l = wn(o.node, s, n);
    if (l === o.node) return e;
    const c = [...e.frames];
    return c[a] = { ...o, node: l }, { ...e, frames: c };
  }
  if (J(e)) {
    const o = e.panels[a];
    if (o === void 0 || _e(o)) return e;
    const l = wn(o, s, n);
    if (l === o) return e;
    const c = [...e.panels];
    return c[a] = l, { ...e, panels: c };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = [...e.children];
  return i[a] = wn(r, s, n), { ...e, children: i };
}
function Ps(e, t, n, a = 0.02) {
  const s = e[t], r = e[t + 1];
  if (s === void 0 || r === void 0) return e;
  const i = s + r;
  if (i < a * 2) return e;
  const o = [...e], l = Math.min(Math.max(s + n, a), i - a);
  return o[t] = l, o[t + 1] = i - l, o;
}
function En(e) {
  if (!J(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !_e(t) ? e : { ...Ha([Rd(e)]), ...Ce(e) };
}
const Rd = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Es(e) {
  return e.length === 0 ? null : Ha(e.map(tt));
}
function Id(e, t) {
  if (!e) return Es(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const l of lt(e))
    !n.has(l) || a.has(l) ? s.add(l) : a.add(l);
  let r = e;
  for (const l of s)
    r = r ? _t(r, l) : null;
  const i = new Set(r ? lt(r) : []), o = t.filter((l) => !i.has(l));
  if (o.length === 0) return r ? En(Se(r)) : null;
  if (!r) return Es(o);
  if (le(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...o.map(
          (c, u) => Nn(tt(c), {
            x: gt.x + (l + u) * Pn,
            y: gt.y + (l + u) * Pn
          })
        )
      ]
    };
  }
  return En(Se(Ha([r, ...o.map(tt)])));
}
const Xa = Symbol("dc.windowContext");
function Fd(e) {
  return _a(Xa, e), e;
}
function On() {
  const e = It(Xa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Nd = ["data-dc-glyph"], Dd = { class: "dc-glyph__line" }, Od = ["d"], Bd = {
  key: 0,
  class: "dc-glyph__aqua"
}, qd = ["d"], Vd = /* @__PURE__ */ ie({
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
      x("g", Dd, [
        (f(!0), m(ne, null, he(t[e.kind], (r) => (f(), m("path", {
          key: r,
          d: r
        }, null, 8, Od))), 128))
      ]),
      n[e.kind] ? (f(), m("g", Bd, [
        (f(!0), m(ne, null, he(n[e.kind], (r) => (f(), m("path", {
          key: r,
          d: r
        }, null, 8, qd))), 128))
      ])) : I("", !0)
    ], 8, Nd));
  }
}), Rt = /* @__PURE__ */ de(Vd, [["__scopeId", "data-v-4d2872c0"]]), Kd = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Hd = ["data-dc-movable"], Wd = { class: "dc-float__title dc-truncate" }, Ud = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, jd = ["aria-label", "aria-pressed", "data-dc-minimize"], Gd = ["aria-label", "aria-pressed", "data-dc-maximize"], Xd = ["aria-label", "data-dc-close"], Qd = { class: "dc-float__content" }, Yd = ["data-dc-handle", "onPointerdown"], Zd = /* @__PURE__ */ ie({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = On(), a = p(() => Re(t.frame.node)), s = p(() => n.panelFor(a.value)?.fixed === !0), r = p(() => it(t.frame)), i = p(() => mt(t.frame)), o = p(() => r.value || i.value), l = p(() => n.resizable.value && !s.value && !o.value), c = p(() => n.movable.value && !s.value && !o.value), u = p(() => {
      const E = lt(t.frame.node);
      return E.length === 1 ? E[0] ?? null : null;
    }), h = p(() => u.value !== null && n.closable(u.value)), y = p(() => t.frame.node.headless === !0), g = p(
      () => !y.value && (!J(t.frame.node) || i.value)
    ), w = p(
      () => t.frame.title || Dt(t.frame.node) || Xt(t.frame.node, (E) => n.panelFor(E)?.title)
    ), b = p(() => n.spaceMenu(t.path));
    function C(E) {
      E.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, E, "move");
    }
    function k(E) {
      E.target?.closest("button, a, input, select, textarea, label") || (i.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const M = p(() => {
      const E = n.framing.value;
      return E !== null && fe(t.frame.node, E);
    }), R = p(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : i.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${ua}px`,
        height: `${Sr}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), $ = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (E, D) => (f(), m("div", {
      class: "dc-float",
      style: Ae(R.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": i.value ? "true" : "false",
      "data-dc-dragging": M.value ? "true" : "false",
      onPointerdown: D[3] || (D[3] = (S) => A(n).raiseAt(e.path))
    }, [
      g.value ? (f(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: C,
        onDblclick: k
      }, [
        x("span", Wd, F(w.value), 1),
        b.value.length ? (f(), Y(Oa, {
          key: 0,
          items: b.value,
          label: `${w.value} menu`
        }, null, 8, ["items", "label"])) : I("", !0),
        !s.value || i.value && h.value && u.value ? (f(), m("div", Ud, [
          s.value ? I("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${i.value ? "Unroll" : "Minimize"} ${w.value}`,
            "aria-pressed": i.value,
            "data-dc-minimize": a.value,
            onClick: D[0] || (D[0] = (S) => A(n).toggleMinimizeAt(e.path))
          }, [
            ce(Rt, {
              kind: i.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, jd)),
          s.value ? I("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${w.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": a.value,
            onClick: D[1] || (D[1] = (S) => A(n).toggleMaximizeAt(e.path))
          }, [
            ce(Rt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Gd)),
          i.value && h.value && u.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${w.value}`,
            "data-dc-close": u.value,
            onClick: D[2] || (D[2] = (S) => A(n).close(u.value))
          }, [
            ce(Rt, { kind: "close" })
          ], 8, Xd)) : I("", !0)
        ])) : I("", !0)
      ], 40, Hd)) : I("", !0),
      x("div", Qd, [
        $e(E.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(ne, null, he(l.value ? $ : [], (S) => (f(), m("span", {
        key: S,
        class: "dc-float__grip",
        "data-dc-handle": S,
        "aria-hidden": "true",
        onPointerdown: Fe((z) => A(n).beginFrameDragAt(e.path, z, S), ["stop"])
      }, null, 40, Yd))), 128))
    ], 44, Kd));
  }
}), Jd = /* @__PURE__ */ de(Zd, [["__scopeId", "data-v-f035684c"]]), Qa = Symbol("dc.paneContext");
function Vr(e) {
  return _a(Qa, e), e;
}
function dp() {
  return It(Qa, null);
}
function fp(e) {
  const t = It(Xa, null), n = It(Qa, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Pt(e)
  );
  return An() && Zt(a), a;
}
const ef = ["data-dc-panel"], tf = /* @__PURE__ */ ie({
  __name: "WindowPaneBody",
  props: {
    panel: {},
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, n = On();
    Vr({ panel: p(() => t.panel) });
    const a = () => {
      const s = n.panelFor(t.panel);
      return s ? n.renderContent(s, n.viewFor(t.panel), t.active) ?? null : null;
    };
    return (s, r) => (f(), m("div", {
      class: "dc-pane__content",
      "data-dc-panel": t.panel
    }, [
      ce(a)
    ], 8, ef));
  }
}), nf = /* @__PURE__ */ de(tf, [["__scopeId", "data-v-31c655fd"]]), af = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], sf = ["data-dc-movable"], rf = ["aria-label", "aria-pressed"], lf = ["data-dc-space-name"], of = { class: "dc-truncate" }, cf = ["aria-label"], uf = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, df = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], ff = { class: "dc-tab__name dc-truncate" }, pf = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, vf = ["aria-label", "data-dc-close", "onClick"], hf = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, mf = { class: "dc-pane__tools" }, gf = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, _f = ["aria-label", "data-dc-minimize"], yf = ["aria-label", "aria-pressed", "data-dc-maximize"], wf = ["aria-label", "data-dc-close"], kf = ["id", "role", "aria-labelledby"], bf = ["id", "role", "aria-labelledby"], $f = ["data-dc-edge"], xf = /* @__PURE__ */ ie({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = On(), a = Tn() ?? "dc-pane", s = p(
      () => t.group.panels.flatMap((O, Q) => {
        if (!_e(O)) {
          const Te = Dt(O) || Xt(O, (ze) => n.panelFor(ze)?.title);
          return [{ kind: "space", index: Q, id: `space-${Q}`, title: Te, node: O }];
        }
        const ee = n.panelFor(O);
        return ee ? [{ kind: "panel", index: Q, id: O, title: ee.title, panel: ee }] : [];
      })
    ), r = p(() => s.value.length > 1), i = p(() => {
      const O = xt(t.group);
      return s.value.find((Q) => Q.index === O) ?? s.value[0] ?? null;
    }), o = p(() => i.value?.kind === "space" ? i.value.node : null), l = p(() => o.value ? "" : Er(t.group)), c = p(() => o.value ? null : n.panelFor(l.value)), u = p(() => i.value?.title ?? ""), h = p(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = p(() => [...t.path, i.value?.index ?? 0]), g = p(() => l.value || bs(t.group)[0] || ""), w = p(() => n.viewFor(l.value)), b = p(() => t.group.headless === !0), C = p(() => n.focused.value === l.value), k = p(() => n.dragging.value === l.value), M = p(() => n.moving.value === l.value), R = p(() => n.frameOf(g.value) !== null), $ = p(() => n.panelFor(g.value)?.fixed === !0), E = p(
      () => !o.value && (n.canMove(l.value) || R.value && n.movable.value && !$.value)
    ), D = p(
      () => o.value ? n.spaceMenu(y.value) : n.menuFor(l.value)
    ), S = (O) => n.closable(O);
    Vr({ panel: l });
    const z = p(() => n.maximized(g.value)), T = p(
      () => R.value && !$.value || !r.value && !!c.value && S(c.value.id)
    ), H = (O) => `${a}-tab-${O}`, K = p(() => `${a}-body`), W = p(() => {
      const O = n.dropTarget.value;
      return !O || !Ve(t.group, O.panel) || O.edge === "float" ? null : O;
    }), ye = p(() => W.value?.index === void 0 ? W.value?.edge ?? null : null), oe = p(() => W.value?.index ?? null), q = p(
      () => s.value.flatMap(
        (O) => O.kind === "panel" && (O.id === l.value || O.panel.keepAlive === !0) ? [O.id] : []
      )
    ), P = U(null), j = /* @__PURE__ */ new Map();
    we(
      l,
      (O, Q) => {
        const ee = P.value;
        if (!ee || (Q && j.set(Q, ee.scrollTop), !n.panelFor(O)?.keepAlive || !j.has(O))) return;
        const Te = j.get(O);
        Ft(() => {
          P.value && (P.value.scrollTop = Te);
        });
      },
      { flush: "pre" }
    );
    const ae = () => c.value ? n.renderActions(c.value, w.value, C.value) ?? null : null;
    let pe = null;
    function Me(O) {
      const Q = pe !== null && Math.hypot(O.clientX - pe.x, O.clientY - pe.y) >= 4;
      return pe = null, Q;
    }
    const We = (O) => O.kind === "panel" ? O.id : Re(O.node);
    function Qe(O, Q) {
      Q.kind !== "space" && (n.focus(Q.id), pe = { x: O.clientX, y: O.clientY }, n.beginDrag(Q.id, O));
    }
    function Ye(O, Q) {
      if (Me(O)) return;
      const ee = We(Q);
      ee && n.selectPanel(ee);
    }
    function Ze(O) {
      l.value && n.focus(l.value), !O.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (R.value ? n.beginFrameDrag(g.value, O, "move") : n.beginDrag(l.value, O));
    }
    function Oe(O) {
      pe = { x: O.clientX, y: O.clientY }, n.beginDrag(l.value, O);
    }
    function Ue(O) {
      Me(O) || n.toggleMoveMode(l.value);
    }
    const B = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Z(O) {
      if (!M.value) return;
      if (O.key === "Escape") {
        O.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const Q = B[O.key];
      Q && (O.preventDefault(), R.value ? n.nudgeFrame(l.value, Q, O.shiftKey) : n.nudge(l.value, Q, O.shiftKey));
    }
    function X(O) {
      !R.value || O.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(g.value);
    }
    function Be(O, Q) {
      O.stopPropagation(), pe = null, n.close(Q);
    }
    function Bt(O, Q) {
      const ee = s.value.length;
      let Te = null;
      if (O.key === "ArrowRight" ? Te = (Q + 1) % ee : O.key === "ArrowLeft" ? Te = (Q - 1 + ee) % ee : O.key === "Home" ? Te = 0 : O.key === "End" && (Te = ee - 1), Te === null) return;
      O.preventDefault();
      const ze = s.value[Te];
      if (!ze) return;
      const qt = We(ze);
      qt && n.selectPanel(qt);
    }
    return (O, Q) => i.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": A(bs)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": R.value ? "true" : "false",
      "data-dc-maximized": z.value ? "true" : "false",
      "data-dc-headless": b.value ? "true" : "false",
      "data-dc-active": C.value ? "true" : "false",
      "data-dc-dragging": k.value ? "true" : "false",
      "aria-label": u.value,
      onFocusin: Q[7] || (Q[7] = (ee) => l.value && A(n).focus(l.value))
    }, [
      b.value ? I("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": E.value ? "true" : "false",
        onPointerdown: Ze,
        onDblclick: X
      }, [
        E.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${u.value}`,
          "aria-pressed": M.value,
          onPointerdown: Oe,
          onClick: Ue,
          onKeydown: Z
        }, [...Q[8] || (Q[8] = [
          x("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, rf)) : I("", !0),
        h.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          x("span", of, F(h.value), 1)
        ], 8, lf)) : I("", !0),
        x("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${u.value} panels`
        }, [
          (f(!0), m(ne, null, he(s.value, (ee, Te) => (f(), m(ne, {
            key: ee.id
          }, [
            oe.value === Te ? (f(), m("span", uf)) : I("", !0),
            x("button", {
              id: H(ee.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ee.kind === "panel" ? ee.id : void 0,
              "data-dc-space": ee.kind === "space" ? ee.title : void 0,
              "aria-selected": ee.index === i.value.index,
              "aria-controls": K.value,
              tabindex: ee.index === i.value.index ? 0 : -1,
              onPointerdown: (ze) => Qe(ze, ee),
              onClick: (ze) => Ye(ze, ee),
              onKeydown: (ze) => Bt(ze, Te)
            }, [
              x("span", ff, F(ee.title), 1),
              ee.kind === "panel" && ee.panel.subtitle ? (f(), m("span", pf, F(ee.panel.subtitle), 1)) : I("", !0),
              r.value && ee.kind === "panel" && S(ee.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ee.title}`,
                "data-dc-close": ee.id,
                onPointerdown: Q[0] || (Q[0] = Fe(() => {
                }, ["stop"])),
                onClick: (ze) => Be(ze, ee.id)
              }, [...Q[9] || (Q[9] = [
                x("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, vf)) : I("", !0)
            ], 40, df)
          ], 64))), 128)),
          oe.value === s.value.length ? (f(), m("span", hf)) : I("", !0)
        ], 8, cf),
        x("div", mf, [
          ce(ae),
          D.value.length ? (f(), Y(Oa, {
            key: 0,
            items: D.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : I("", !0)
        ]),
        T.value ? (f(), m("div", gf, [
          R.value && !$.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${u.value}`,
            "data-dc-minimize": g.value,
            onPointerdown: Q[1] || (Q[1] = Fe(() => {
            }, ["stop"])),
            onClick: Q[2] || (Q[2] = (ee) => A(n).toggleMinimize(g.value))
          }, [
            ce(Rt, { kind: "minimize" })
          ], 40, _f)) : I("", !0),
          R.value && !$.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${z.value ? "Restore" : "Maximize"} ${u.value}`,
            "aria-pressed": z.value,
            "data-dc-maximize": g.value,
            onPointerdown: Q[3] || (Q[3] = Fe(() => {
            }, ["stop"])),
            onClick: Q[4] || (Q[4] = (ee) => A(n).toggleMaximize(g.value))
          }, [
            ce(Rt, {
              kind: z.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, yf)) : I("", !0),
          !r.value && c.value && S(c.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${u.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: Q[5] || (Q[5] = Fe(() => {
            }, ["stop"])),
            onClick: Q[6] || (Q[6] = (ee) => A(n).close(c.value.id))
          }, [
            ce(Rt, { kind: "close" })
          ], 40, wf)) : I("", !0)
        ])) : I("", !0)
      ], 40, sf)),
      o.value ? (f(), m("div", {
        key: 1,
        id: K.value,
        class: "dc-pane__space",
        role: b.value ? void 0 : "tabpanel",
        "aria-labelledby": b.value ? void 0 : H(i.value.id)
      }, [
        $e(O.$slots, "space", {
          node: o.value,
          path: y.value
        }, void 0, !0)
      ], 8, kf)) : I("", !0),
      !o.value || q.value.length ? ft((f(), m("div", {
        key: 2,
        id: o.value ? void 0 : K.value,
        ref_key: "body",
        ref: P,
        class: "dc-pane__body",
        role: b.value || o.value ? void 0 : "tabpanel",
        "aria-labelledby": b.value || o.value ? void 0 : H(l.value)
      }, [
        (f(!0), m(ne, null, he(q.value, (ee) => ft((f(), Y(nf, {
          key: ee,
          panel: ee,
          active: ee === l.value && C.value
        }, null, 8, ["panel", "active"])), [
          [xn, ee === l.value]
        ])), 128))
      ], 8, bf)), [
        [xn, !o.value]
      ]) : I("", !0),
      ye.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ye.value,
        "aria-hidden": "true"
      }, null, 8, $f)) : I("", !0)
    ], 40, af)) : I("", !0);
  }
}), Kr = /* @__PURE__ */ de(xf, [["__scopeId", "data-v-2c3c5ecf"]]), Cf = ["data-dc-space", "data-dc-path", "aria-label"], Mf = {
  key: 0,
  class: "dc-space__head"
}, Sf = { class: "dc-space__title dc-truncate" }, Pf = ["data-dc-direction"], Ef = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Af = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Tf = /* @__PURE__ */ ie({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = On(), a = U(null), s = p(() => J(t.node) ? t.node : null), r = p(() => Ot(t.node) ? t.node : null), i = p(() => le(t.node) ? t.node : null), o = p(
      () => r.value ? r.value.children : i.value?.frames.map((q) => q.node) ?? []
    ), l = p(() => r.value ? rt(r.value) : []), c = p(
      () => (i.value?.frames ?? []).map((q, P) => ({
        held: q,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: P,
        key: S(q.node),
        path: [...t.path, P]
      })).sort((q, P) => q.key < P.key ? -1 : q.key > P.key ? 1 : 0)
    ), u = p(() => Dt(t.node)), h = p(() => n.spaceMenu(t.path)), y = p(() => t.node.headless === !0), g = p(() => i.value ? "desktop" : r.value?.direction ?? ""), w = U(null), b = U(0);
    let C = null;
    we(
      w,
      (q) => {
        C?.disconnect(), C = null, !(!q || typeof ResizeObserver > "u") && (b.value = q.clientWidth, C = new ResizeObserver(([P]) => {
          b.value = P?.contentRect.width ?? 0;
        }), C.observe(q));
      },
      { immediate: !0 }
    ), He(() => C?.disconnect());
    const k = p(() => {
      const q = Math.max(
        1,
        Math.floor((b.value + Mt) / (ua + Mt))
      ), P = /* @__PURE__ */ new Map();
      let j = 0;
      for (const ae of c.value)
        ae.held.minimized === !0 && (P.set(ae.key, {
          x: Mt + j % q * (ua + Mt),
          bottom: Mt + Math.floor(j / q) * (Sr + Mt)
        }), j += 1);
      return P;
    }), M = (q) => !!q && q.join("/") === t.path.join("/"), R = p(() => {
      const q = n.dropTarget.value, P = i.value;
      if (!P || !q?.rect || q.edge !== "float") return null;
      if (q.space) return M(q.space) ? q.rect : null;
      const j = Ee(P, q.panel);
      return j && P.frames.includes(j) ? q.rect : null;
    }), $ = p(() => {
      const q = n.dropTarget.value;
      return !!q && !q.rect && M(q.space);
    }), E = p(() => r.value?.direction === "row"), D = p(() => o.value.map((q, P) => [...t.path, P])), S = (q) => [...lt(q)].sort().join("/"), z = (q) => {
      const P = lt(q)[0];
      return (P ? n.panelFor(P)?.title : null) ?? P ?? "panel";
    }, T = (q) => {
      const P = o.value[q], j = o.value[q + 1];
      return !P || !j ? "Resize panels" : `Resize ${z(P)} and ${z(j)}`;
    }, H = (q) => {
      const P = l.value[q] ?? 0, j = l.value[q + 1] ?? 0, ae = P + j;
      return ae > 0 ? Math.round(P / ae * 100) : 50;
    };
    function K() {
      const q = a.value, P = q ? E.value ? q.clientWidth : q.clientHeight : 0;
      return P <= 0 ? 0.05 : Math.min(n.minPanelSize.value / P, 0.4);
    }
    let W = null;
    function ye(q, P) {
      const j = r.value, ae = a.value;
      if (!n.resizable.value || !j || !ae || q.button !== 0) return;
      const pe = E.value ? ae.clientWidth : ae.clientHeight;
      if (pe <= 0) return;
      const Me = E.value ? q.clientX : q.clientY, We = rt(j), Qe = Math.min(n.minPanelSize.value / pe, 0.4);
      q.preventDefault();
      const Ye = (Ue) => {
        const B = ((E.value ? Ue.clientX : Ue.clientY) - Me) / pe;
        n.setSizes(t.path, Ps(We, P, B, Qe));
      }, Ze = () => W?.(), Oe = (Ue) => {
        Ue.key === "Escape" && (n.setSizes(t.path, We), W?.());
      };
      W = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", Ze), window.removeEventListener("keydown", Oe), W = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", Ze), window.addEventListener("keydown", Oe);
    }
    He(() => W?.());
    function oe(q, P) {
      const j = r.value;
      if (!n.resizable.value || !j) return;
      const ae = E.value ? "ArrowRight" : "ArrowDown", pe = E.value ? "ArrowLeft" : "ArrowUp", Me = q.shiftKey ? 0.1 : 0.02;
      if (q.key !== ae && q.key !== pe) return;
      const We = q.key === ae ? Me : -Me;
      q.preventDefault(), n.setSizes(t.path, Ps(rt(j), P, We, K()));
    }
    return (q, P) => {
      const j = Is("WindowNode", !0);
      return s.value ? (f(), Y(Kr, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: xe(({ node: ae, path: pe }) => [
          ce(j, {
            node: ae,
            path: pe,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), m("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": g.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": u.value
      }, [
        !e.framed && !y.value ? (f(), m("header", Mf, [
          x("span", Sf, F(u.value), 1),
          h.value.length ? (f(), Y(Oa, {
            key: 0,
            items: h.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : I("", !0)
        ])) : I("", !0),
        i.value ? (f(), m("div", {
          key: 1,
          ref_key: "desktop",
          ref: w,
          class: "dc-window__desktop"
        }, [
          R.value ? (f(), m("div", {
            key: 0,
            class: "dc-window__drop",
            style: Ae({
              left: `${R.value.x}px`,
              top: `${R.value.y}px`,
              width: `${R.value.w}px`,
              height: `${R.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : I("", !0),
          (f(!0), m(ne, null, he(c.value, (ae) => (f(), Y(Jd, {
            key: ae.key,
            frame: ae.held,
            path: ae.path,
            order: ae.order,
            place: k.value.get(ae.key) ?? null
          }, {
            default: xe(() => [
              ce(j, {
                node: ae.held.node,
                path: ae.path,
                framed: ae.held.node.kind !== "group"
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
          $.value ? (f(), m("div", Ef)) : I("", !0),
          (f(!0), m(ne, null, he(o.value, (ae, pe) => (f(), m(ne, {
            key: S(ae)
          }, [
            x("div", {
              class: "dc-window__cell",
              style: Ae({ flexGrow: l.value[pe] ?? 1 })
            }, [
              ce(j, {
                node: ae,
                path: D.value[pe] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            pe < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": E.value ? "vertical" : "horizontal",
              "aria-label": T(pe),
              "aria-valuenow": H(pe),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": A(n).resizable.value ? void 0 : "true",
              tabindex: A(n).resizable.value ? 0 : -1,
              onPointerdown: (Me) => ye(Me, pe),
              onKeydown: (Me) => oe(Me, pe)
            }, null, 40, Af)) : I("", !0)
          ], 64))), 128))
        ], 8, Pf)) : I("", !0)
      ], 8, Cf));
    };
  }
}), zf = /* @__PURE__ */ de(Tf, [["__scopeId", "data-v-fb5b403f"]]), Lf = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Rf = {
  key: 1,
  class: "dc-window__empty"
}, If = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, vn = 16, Ff = /* @__PURE__ */ ie({
  __name: "WindowFrame",
  props: /* @__PURE__ */ $n({
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
  emits: /* @__PURE__ */ $n(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Ht(e, "layout"), i = Ht(e, "views"), o = Jt(), l = p(() => new Map(a.panels.map((d) => [d.id, d]))), c = p(() => a.panels.map((d) => d.id)), u = p(() => Id(r.value, c.value)), h = U(null), y = U(null), g = U(null), w = U(!0), b = U(null), C = U(null), k = U(null), M = U(""), R = U(null);
    function $() {
      const d = R.value;
      return d ? [...d.querySelectorAll(".dc-pane[data-dc-panels]")].filter((_) => _.closest(".dc-window") === d).map((_) => ({ panels: (_.dataset.dcPanels ?? "").split(" "), element: _ })) : [];
    }
    function E(d) {
      const v = [];
      let _ = d.closest(".dc-float");
      for (; _; )
        v.unshift(Number(_.dataset.dcOrder ?? 0)), _ = _.parentElement?.closest(".dc-float") ?? null;
      return v;
    }
    function D() {
      return $().map((d) => ({ pane: d, order: E(d.element) })).sort((d, v) => {
        const _ = Math.max(d.order.length, v.order.length);
        for (let L = 0; L < _; L += 1) {
          const N = (d.order[L] ?? -1) - (v.order[L] ?? -1);
          if (N !== 0) return N;
        }
        return 0;
      }).map((d) => d.pane);
    }
    const S = (d) => $().find((v) => v.panels.includes(d)) ?? null;
    function z(d) {
      const v = l.value.get(d);
      if (!v) return "";
      const _ = i.value[d];
      return _ && v.views?.some((L) => L.key === _) ? _ : v.defaultView ?? v.views?.[0]?.key ?? "";
    }
    function T(d, v) {
      i.value = { ...i.value, [d]: v }, s("view-change", { panel: d, view: v });
    }
    const H = p(
      () => a.panels.filter((d) => d.fixed !== !0).length
    );
    function K(d) {
      return !a.movable || H.value < 1 || a.panels.length < 2 ? !1 : l.value.get(d)?.fixed !== !0;
    }
    function W(d, v) {
      const _ = u.value;
      !d || !_ || d === _ || (r.value = d, v && s("panel-move", v));
    }
    function ye(d, v, _) {
      if (d.width <= 0 || d.height <= 0) return "center";
      const L = (v - d.left) / d.width, N = (_ - d.top) / d.height, V = 0.3;
      return L > V && L < 1 - V && N > V && N < 1 - V ? "center" : [
        { edge: "left", distance: L },
        { edge: "right", distance: 1 - L },
        { edge: "top", distance: N },
        { edge: "bottom", distance: 1 - N }
      ].reduce(
        (ue, G) => G.distance < ue.distance ? G : ue
      ).edge;
    }
    function oe(d, v) {
      const _ = [...d.querySelectorAll(".dc-tab")], L = _.findIndex((N) => {
        const V = N.getBoundingClientRect();
        return v < V.left + V.width / 2;
      });
      return L === -1 ? _.length : L;
    }
    function q(d, v, _) {
      for (const { panels: L, element: N } of D().reverse()) {
        const V = N.getBoundingClientRect();
        if (d < V.left || d > V.right || v < V.top || v > V.bottom) continue;
        const me = L.find((se) => se !== _), ue = N.querySelector(".dc-pane__tabs"), G = ue?.getBoundingClientRect();
        if (ue && G && v >= G.top && v <= G.bottom)
          return me ? { panel: me, edge: "center", index: oe(ue, d) } : null;
        const te = N.querySelector(":scope > .dc-pane__space");
        if (te) {
          const se = te.getBoundingClientRect();
          if (d >= se.left && d <= se.right && v >= se.top && v <= se.bottom) continue;
        }
        return me ? { panel: me, edge: ye(V, d, v) } : null;
      }
      return j(d, v, _) ?? Me(d, v);
    }
    function P() {
      const d = R.value;
      return d ? [...d.querySelectorAll(".dc-window__desktop")].filter((v) => v.closest(".dc-window") === d).reverse() : [];
    }
    function j(d, v, _) {
      const L = u.value;
      if (!L) return null;
      for (const N of P()) {
        const V = N.getBoundingClientRect();
        if (d < V.left || d > V.right || v < V.top || v > V.bottom) continue;
        const me = We(N), ue = me.flatMap((ve) => ve.panels).find((ve) => ve !== _);
        if (!ue && me.length > 0) return null;
        const G = Ee(L, _)?.rect, te = Xn(
          {
            x: d - V.left - 24,
            y: v - V.top - 12,
            w: G?.w ?? gt.w,
            h: G?.h ?? gt.h
          },
          { w: N.clientWidth, h: N.clientHeight },
          a.minPanelSize
        );
        if (ue) return { panel: ue, edge: "float", rect: te };
        const se = ae(N);
        return se ? { panel: "", space: se, edge: "float", rect: te } : null;
      }
      return null;
    }
    function ae(d) {
      const v = d.closest(".dc-space")?.getAttribute("data-dc-path");
      return v == null ? null : v === "" ? [] : v.split("/").map(Number);
    }
    function pe() {
      const d = R.value;
      return d ? [...d.querySelectorAll(".dc-space")].filter((v) => v.closest(".dc-window") === d).filter((v) => !v.querySelector(".dc-pane")).reverse().flatMap((v) => {
        const _ = ae(v);
        return _ ? [{ element: v, path: _ }] : [];
      }) : [];
    }
    function Me(d, v) {
      for (const { element: _, path: L } of pe()) {
        if (_.dataset.dcSpace === "desktop") continue;
        const N = _.getBoundingClientRect();
        if (!(d < N.left || d > N.right || v < N.top || v > N.bottom))
          return { panel: "", space: L, edge: "center" };
      }
      return null;
    }
    function We(d) {
      return $().filter(
        (v) => v.element.closest(".dc-window__desktop") === d
      );
    }
    let Qe = null;
    const Ye = (d) => d.altKey;
    function Ze(d, v) {
      if (!K(d) || y.value || C.value || v.button !== 0) return;
      const _ = v.clientX, L = v.clientY;
      let N = !1, V = Ye(v);
      const me = () => {
        const ge = k.value;
        ge && (g.value = V ? j(ge.x, ge.y, d) : q(ge.x, ge.y, d));
      }, ue = (ge) => {
        if (!N) {
          if (Math.hypot(ge.clientX - _, ge.clientY - L) < 4) return;
          N = !0, y.value = d, b.value = null;
        }
        V = Ye(ge), w.value = !V, k.value = { x: ge.clientX, y: ge.clientY }, me();
      }, G = (ge) => {
        Ye(ge) !== V && (V = !V, w.value = !V, N && me());
      }, te = (ge) => {
        Qe?.();
        const re = g.value, Le = u.value;
        if (ge && N && re && Le) {
          const ot = re.space ? Ms(Le, d, re.space, re.rect) : re.edge === "float" && re.rect ? Cs(Le, d, re.panel, re.rect) : pn(Le, d, re.panel, re.edge, re.index);
          W(ot, {
            panel: d,
            target: re.panel,
            edge: re.edge,
            ...re.space === void 0 ? {} : { space: re.space },
            ...re.index === void 0 ? {} : { index: re.index },
            ...re.rect === void 0 ? {} : { rect: re.rect }
          });
        }
        y.value = null, g.value = null, k.value = null, w.value = !0;
      }, se = () => te(!0), ve = () => te(!1), ke = (ge) => {
        if (ge.key === "Escape") {
          te(!1);
          return;
        }
        G(ge);
      };
      Qe = () => {
        window.removeEventListener("pointermove", ue), window.removeEventListener("pointerup", se), window.removeEventListener("pointercancel", ve), window.removeEventListener("keydown", ke), window.removeEventListener("keyup", G), Qe = null;
      }, window.addEventListener("pointermove", ue), window.addEventListener("pointerup", se), window.addEventListener("pointercancel", ve), window.addEventListener("keydown", ke), window.addEventListener("keyup", G);
    }
    He(() => Qe?.());
    let Oe = null;
    function Ue(d) {
      const v = R.value;
      return v ? [...v.querySelectorAll(
        `.dc-float[data-dc-path="${d.join("/")}"]`
      )].find((N) => N.closest(".dc-window") === v)?.parentElement ?? null : null;
    }
    function B(d) {
      const v = u.value;
      return v ? pa(v, d) : null;
    }
    function Z(d) {
      const v = u.value;
      if (!v) return;
      const _ = jt(v, d);
      _ !== v && (r.value = _);
    }
    function X(d) {
      const v = B(d);
      v && Z(v);
    }
    function Be(d) {
      const v = u.value, _ = v ? Ee(v, d) : null;
      return _ !== null && it(_);
    }
    function Bt(d) {
      const v = u.value, _ = v ? Ee(v, d) : null;
      return _ !== null && mt(_);
    }
    function O(d) {
      const v = u.value, _ = v ? ht(v, d) : null;
      return _ ? Re(_.node) : "";
    }
    function Q(d) {
      const v = u.value, _ = v ? ht(v, d) : null;
      if (!v || !_) return;
      const L = Re(_.node);
      if (l.value.get(L)?.fixed === !0) return;
      const N = !mt(_);
      let V = xd(v, d, N);
      V !== v && (N || (V = jt(V, d)), r.value = V, s("frame-minimize", { panel: L, minimized: N }));
    }
    function ee(d) {
      const v = B(d);
      v && Q(v);
    }
    function Te(d) {
      const v = u.value, _ = v ? ht(v, d) : null;
      if (!v || !_) return;
      const L = Re(_.node);
      if (l.value.get(L)?.fixed === !0) return;
      const N = !it(_);
      let V = $d(v, d, N);
      V !== v && (N && (V = jt(V, d)), r.value = V, s("frame-maximize", { panel: L, maximized: N }));
    }
    function ze(d) {
      const v = B(d);
      v && Te(v);
    }
    function qt(d, v, _) {
      const L = u.value, N = L ? ht(L, d) : null;
      if (!L || !N || v.button !== 0 || y.value || C.value) return;
      const V = Re(N.node);
      if (l.value.get(V)?.fixed === !0 || it(N) || mt(N) || (_ === "move" ? !a.movable : !a.resizable)) return;
      const me = Ue(d), ue = Cd(L, d);
      Z(d);
      const G = { w: me?.clientWidth ?? 0, h: me?.clientHeight ?? 0 }, te = { ...N.rect }, se = v.clientX, ve = v.clientY, ke = a.minPanelSize;
      C.value = V;
      const ge = (qe) => {
        const nt = u.value;
        if (!nt) return;
        const Vt = xs(nt, ue, Xn(qe, G, ke));
        Vt !== nt && (r.value = Vt);
      }, re = (qe) => {
        qe.preventDefault();
        const nt = qe.clientX - se, Vt = qe.clientY - ve;
        ge(
          _ === "move" ? { ...te, x: te.x + nt, y: te.y + Vt } : $s(te, _, nt, Vt, ke)
        );
      }, Le = (qe) => {
        if (Oe?.(), C.value = null, !qe) {
          ge(te);
          return;
        }
        const nt = u.value ? ht(u.value, ue) : null;
        nt && s("frame-change", { panel: O(ue), rect: nt.rect });
      }, ot = () => Le(!0), pt = () => Le(!1), vt = (qe) => {
        qe.key === "Escape" && Le(!1);
      };
      Oe = () => {
        window.removeEventListener("pointermove", re), window.removeEventListener("pointerup", ot), window.removeEventListener("pointercancel", pt), window.removeEventListener("keydown", vt), Oe = null;
      }, window.addEventListener("pointermove", re), window.addEventListener("pointerup", ot), window.addEventListener("pointercancel", pt), window.addEventListener("keydown", vt);
    }
    function Gr(d, v, _) {
      const L = B(d);
      L && qt(L, v, _);
    }
    function Xr(d, v, _ = !1) {
      const L = u.value, N = B(d), V = L && N ? ht(L, N) : null;
      if (!L || !N || !V || l.value.get(d)?.fixed === !0 || (_ ? !a.resizable : !a.movable)) return;
      if (it(V) || mt(V)) {
        M.value = `${Je(d)} is ${it(V) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const me = v === "left" ? -vn : v === "right" ? vn : 0, ue = v === "up" ? -vn : v === "down" ? vn : 0, G = Ue(N), te = { w: G?.clientWidth ?? 0, h: G?.clientHeight ?? 0 }, se = _ ? $s(V.rect, "se", me, ue, a.minPanelSize) : { ...V.rect, x: V.rect.x + me, y: V.rect.y + ue }, ve = xs(L, N, Xn(se, te, a.minPanelSize));
      if (ve === L) {
        M.value = _ ? `${Je(d)} cannot be resized further.` : `${Je(d)} cannot move ${v}.`;
        return;
      }
      r.value = ve;
      const ke = ht(ve, N);
      ke && (s("frame-change", { panel: d, rect: ke.rect }), M.value = _ ? `${Je(d)} resized to ${ke.rect.w} by ${ke.rect.h}.` : `${Je(d)} moved to ${ke.rect.x}, ${ke.rect.y}.`);
    }
    He(() => Oe?.());
    function Qr(d, v) {
      const _ = S(d), L = _?.element.getBoundingClientRect();
      if (!_ || !L) return null;
      const N = v === "left" || v === "right", V = (G) => {
        if (!(N ? G.bottom > L.top + 1 && G.top < L.bottom - 1 : G.right > L.left + 1 && G.left < L.right - 1)) return null;
        const se = v === "left" ? L.left - G.right : v === "right" ? G.left - L.right : v === "up" ? L.top - G.bottom : G.top - L.bottom;
        return se < -1 ? null : se;
      }, me = [];
      for (const G of $()) {
        if (G === _ || G.element === _.element) continue;
        const te = V(G.element.getBoundingClientRect());
        if (te === null) continue;
        const se = G.panels.find((ve) => ve !== d);
        se && me.push({ to: { panel: se }, distance: te });
      }
      for (const { element: G, path: te } of pe()) {
        const se = V(G.getBoundingClientRect());
        se !== null && me.push({ to: { space: te }, distance: se });
      }
      return me.reduce(
        (G, te) => G && G.distance <= te.distance ? G : te,
        null
      )?.to ?? null;
    }
    function Yr(d) {
      const v = u.value ? Ee(u.value, d) !== null : !1;
      if (!v && !K(d)) return;
      b.value = b.value === d ? null : d;
      const _ = Je(d);
      if (!b.value) {
        M.value = `${_}: move mode off.`;
        return;
      }
      M.value = v ? `${_}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${_}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Je = (d) => l.value.get(d)?.title ?? d, Zr = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Jr(d, v, _ = !1) {
      if (!K(d)) return;
      const L = u.value;
      if (!L) return;
      const N = Je(d), V = Tt(L, d);
      if (!_ && V && (v === "left" || v === "right") && V.panels.length > 1) {
        const ve = V.panels.indexOf(d), ke = v === "left" ? ve - 1 : ve + 1;
        if (ke >= 0 && ke < V.panels.length) {
          W(Gt(L, d, ke), { panel: d, target: d, edge: "center", index: ke }), M.value = `${N} moved ${v}, now tab ${ke + 1} of ${V.panels.length}.`, Bn(d);
          return;
        }
      }
      const ue = Qr(d, v);
      if (!ue || ue.panel !== void 0 && !K(ue.panel)) {
        M.value = `${N} cannot move ${v}.`;
        return;
      }
      const G = Zr[v];
      if (ue.space) {
        const ve = ue.space, ke = ut(L, ve), ge = Ee(L, d)?.rect, re = { ...gt, ...ge ? { w: ge.w, h: ge.h } : {} };
        W(Ms(L, d, ve, re), { panel: d, target: "", space: ve, edge: G }), M.value = `${N} moved ${v}, into ${ke ? Dt(ke) : "the space"}.`, Bn(d);
        return;
      }
      const te = ue.panel, se = V?.panels.length === 1 && Tt(L, te)?.panels.length === 1;
      _ ? (W(pn(L, d, te, "center"), {
        panel: d,
        target: te,
        edge: "center"
      }), M.value = `${N} joined ${Je(te)} as a tab.`) : se ? (W(yn(L, d, te), { panel: d, target: te, edge: G }), M.value = `${N} moved ${v}, trading places with ${Je(te)}.`) : (W(pn(L, d, te, G), { panel: d, target: te, edge: G }), M.value = `${N} moved ${v}, beside ${Je(te)}.`), Bn(d);
    }
    function Bn(d) {
      Ft(() => {
        S(d)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function el(d, v) {
      const _ = u.value;
      _ && (r.value = wn(_, d, v));
    }
    function qn(d) {
      const v = u.value;
      if (!v) return;
      const _ = Lt(v, d);
      _ !== v && (r.value = _, s("tab-select", { panel: d }));
    }
    function Ja(d) {
      return l.value.get(d)?.closable ?? a.closable;
    }
    function tl(d) {
      Ja(d) && s("panel-close", d);
    }
    const Vn = U(/* @__PURE__ */ new Map());
    let nl = 0;
    function al(d, v) {
      const _ = nl += 1;
      return Vn.value.set(_, { panel: d, items: v }), () => {
        Vn.value.delete(_);
      };
    }
    function sl(d) {
      const v = [];
      for (const _ of Vn.value.values())
        _.panel() === d && v.push(..._.items());
      return v;
    }
    function es(d) {
      const v = d.filter((_) => _.items.length > 0);
      return v.length < 2 ? v.flatMap((_) => _.items) : v.flatMap((_) => [
        { id: _.id, heading: !0, label: _.title },
        ..._.items
      ]);
    }
    const ts = (d) => d.title || "These tabs";
    function rl(d, v) {
      const _ = v.id, L = Tt(d, _), N = (L?.panels.length ?? 0) > 1, V = L?.fixedView === !0, me = (se) => ({
        action: () => {
          se !== d && (r.value = se);
        }
      }), ue = [], G = [], te = v.views ?? [];
      if (te.length > 1 && !V) {
        const se = z(_);
        ue.push({
          id: "view",
          label: "View",
          items: te.map((ve) => ({
            id: `view-${ve.key}`,
            label: ve.label,
            checked: ve.key === se,
            action: () => T(_, ve.key)
          }))
        });
      }
      return N && !V && G.push(
        { id: "show-row", label: "Row", checked: !1, ...me(Ss(d, _, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...me(Ss(d, _, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...me(Ed(d, _))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...me(Ad(d, _))
        }
      ), N && L && (G.length && G.push({ separator: !0 }), G.push(...ns(L, _))), { panel: ue, tabs: G, tabsTitle: L ? ts(L) : "" };
    }
    function ns(d, v) {
      const _ = xt(d), L = (N) => {
        const V = d.panels[(_ + N + d.panels.length) % d.panels.length];
        return (V === void 0 ? "" : Re(V)) || v;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => qn(L(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => qn(L(-1)) }
      ];
    }
    function un(d) {
      return d.title ? d.title : J(d) ? d.panels.length > 1 ? "these tabs" : "the strip" : Dt(d);
    }
    function as(d) {
      if (!d || le(d) || d.fixedView === !0 || !d.title && d.headless !== !0 || Xe(d)) return null;
      const v = qr(d);
      return v && v.fixedView !== !0 ? v : null;
    }
    function ll(d) {
      const v = u.value;
      if (!a.menu || !v) return [];
      const _ = ut(v, d);
      if (!_ || J(_)) return [];
      if (_.fixedView) return [];
      const L = le(_) ? "desktop" : _.direction, N = (re, Le, ot) => ({
        id: `show-${re}`,
        label: Le,
        checked: L === re,
        action: () => {
          const pt = u.value, vt = ot();
          !pt || vt === _ || (r.value = En(Se(yt(pt, d, vt))));
        }
      }), V = () => {
        const re = Nr(_, ol(_));
        if (J(re) && re.panels.length === 0) return _;
        const Le = J(re) && re.panels.length === 1 ? re.panels[0] : void 0;
        return Le !== void 0 && _e(Le) ? _ : re;
      }, me = (re) => () => le(_) ? Br(_, re) : _.direction === re ? _ : { ..._, direction: re }, ue = d.slice(0, -1), G = d.length > 0 ? ut(v, ue) : null, te = G && J(G) && G.panels.length > 1 ? G : null, se = G && as(G) === _ ? G : null, ve = as(_), ke = _.title || "this space", ge = (re, Le, ot, pt, vt) => ({
        id: re,
        label: vt,
        action: () => {
          const qe = u.value;
          qe && (r.value = En(Se(yt(qe, Le, Ld(ot, pt)))));
        }
      });
      return es([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: _.title || "This space",
          items: [
            N("row", "Row", me("row")),
            N("column", "Column", me("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            N("tabs", "Tabs", () => V()),
            N("desktop", "Desktop", () => le(_) ? _ : Or(_))
          ]
        },
        {
          id: "about-around",
          title: ve ? `Around ${un(ve)}` : "",
          items: ve ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ve.title ? [] : [ge("merge-around-keep-this", d, _, "outer", `Keep ${ke}`)],
            ..._.title ? [] : [ge("merge-around-keep-that", d, _, "inner", `Keep ${un(ve)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: se ? `Inside ${un(se)}` : "",
          items: se ? [
            ..._.title ? [] : [ge("merge-inside-keep-that", ue, se, "outer", `Keep ${un(se)}`)],
            ...se.title ? [] : [ge("merge-inside-keep-this", ue, se, "inner", `Keep ${ke}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: te ? ts(te) : "",
          items: te ? ns(te, Re(_)) : []
        }
      ]);
    }
    function ol(d) {
      const v = h.value;
      return v && fe(d, v) ? v : void 0;
    }
    function il(d) {
      const v = u.value, _ = l.value.get(d);
      if (!v || !_) return [];
      const L = a.menu ? rl(v, _) : null, N = sl(d);
      N.length && L?.panel.length && N.push({ separator: !0 }), L && N.push(...L.panel);
      const V = es([
        { id: "about-panel", title: _.title, items: N },
        { id: "about-tabs", title: L?.tabsTitle ?? "", items: L?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(_, V) : V;
    }
    function cl(d, v) {
      return o[`${d}-${v}`] ?? o[d];
    }
    function ss(d, v, _, L) {
      return cl(d, v.id)?.({ panel: v, view: _, active: L });
    }
    Fd({
      panelFor: (d) => l.value.get(d) ?? null,
      viewFor: z,
      setView: T,
      movable: p(() => a.movable),
      resizable: p(() => a.resizable),
      minPanelSize: p(() => a.minPanelSize),
      spaceNames: p(() => a.spaceNames),
      focused: h,
      dragging: y,
      dropTarget: g,
      moving: b,
      framing: C,
      canMove: K,
      focus(d) {
        h.value !== d && (h.value = d, s("panel-activate", d));
      },
      selectPanel: qn,
      beginDrag: Ze,
      toggleMoveMode: Yr,
      nudge: Jr,
      setSizes: el,
      frameOf: (d) => u.value ? Ee(u.value, d) : null,
      beginFrameDrag: Gr,
      nudgeFrame: Xr,
      raise: X,
      maximized: Be,
      toggleMaximize: ze,
      minimized: Bt,
      toggleMinimize: ee,
      beginFrameDragAt: qt,
      raiseAt: Z,
      toggleMaximizeAt: Te,
      toggleMinimizeAt: Q,
      menuFor: il,
      spaceMenu: ll,
      registerMenu: al,
      closable: Ja,
      close: tl,
      renderContent: (d, v, _) => ss("panel", d, v, _),
      renderActions: (d, v, _) => ss("actions", d, v, _),
      layout: u
    });
    const ul = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), dl = () => {
      const d = y.value, v = k.value;
      return !d || !v ? null : hl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${v.x}px`, top: `${v.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(d)?.title ?? d
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: u,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(d, v, _, L) {
        const N = u.value;
        N && W(pn(N, d, v, _, L), {
          panel: d,
          target: v,
          edge: _,
          ...L === void 0 ? {} : { index: L }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(d) {
        const v = u.value;
        v && (r.value = Lt(v, d));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(d, v, _) {
        const L = u.value;
        L && W(Cs(L, d, v, _), {
          panel: d,
          target: v,
          edge: "float",
          rect: _
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(d, v) {
        const _ = u.value;
        if (!_) return;
        const L = wd(_, d, v);
        if (L === _) return;
        r.value = L;
        const N = Ee(L, d);
        N && s("frame-change", { panel: d, rect: N.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: T,
      /** Brings a floating frame to the front of its stack. */
      raise: X,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ze,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: ee
    }), (d, v) => (f(), m("div", {
      ref_key: "root",
      ref: R,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": w.value ? "true" : "false",
      style: Ae(ul.value)
    }, [
      u.value ? (f(), Y(zf, {
        key: 0,
        node: u.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", Rf, " This window has no panels. ")),
      ce(dl),
      x("p", If, F(M.value), 1)
    ], 12, Lf));
  }
}), Nf = /* @__PURE__ */ de(Ff, [["__scopeId", "data-v-711565af"]]), Df = (e) => Math.round(e * 1e3) / 1e3;
function Yn(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function Of(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function Zn(e) {
  const t = { b: Of(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function Bf(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function ha(e) {
  const t = Bf(e);
  return t !== null ? t : Hr(e);
}
function Hr(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((a) => typeof a == "string" ? a : Hr(a)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(Zn)), Yn(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(ha) };
    return e.sizes && (n.z = e.sizes.map(Df)), e.places && (n.p = e.places.map(Zn)), Yn(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: ha(n.node), ...Zn(n) }))
  };
  return Yn(e, t);
}
class Wr extends Error {
}
const Pe = () => {
  throw new Wr();
}, ma = (e) => typeof e == "object" && e !== null && !Array.isArray(e), St = (e) => Array.isArray(e) ? e : Pe(), Ya = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : Pe(), Ur = (e) => St(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : Pe());
function qf(e) {
  const [t, n, a, s] = Ur(e);
  return s === void 0 && Pe(), { x: t, y: n, w: a, h: s };
}
function Jn(e) {
  if (!ma(e)) return Pe();
  const t = { rect: qf(e.b) }, n = Ya(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function ea(e, t) {
  const n = Ya(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function kn(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!ma(e)) return Pe();
  if (e.g !== void 0) {
    const n = St(e.g).map((r) => typeof r == "string" ? r : kn(r));
    n.length === 0 && Pe();
    const a = { kind: "group", panels: n }, s = Ya(e.a);
    return s !== void 0 && (a.active = s), e.p !== void 0 && (a.places = St(e.p).map(Jn)), ea(e, a);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = St(t === "row" ? e.r : e.c).map(kn), a = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (a.sizes = Ur(e.z)), e.p !== void 0 && (a.places = St(e.p).map(Jn)), ea(e, a);
  }
  if (e.f !== void 0) {
    const a = { kind: "float", frames: St(e.f).map((s) => !ma(s) || s.n === void 0 ? Pe() : { node: kn(s.n), ...Jn(s) }) };
    return ea(e, a);
  }
  return Pe();
}
const jr = /[ '!:(),*@$]/, Vf = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function As(e) {
  return e !== "" && !jr.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function ga(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? As(e) : Array.isArray(e) ? `!(${e.map(ga).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${As(t)}:${ga(n)}`).join(",")})`;
}
function Kf(e) {
  let t = 0;
  const n = () => e[t], a = (o) => e[t++] === o ? void 0 : Pe(), s = () => {
    if (n() === "'") {
      t++;
      let l = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return Pe();
        if (c === "'") return l;
        if (c === "!") {
          const u = e[t++];
          u !== "!" && u !== "'" && Pe(), l += u;
        } else l += c;
      }
    }
    const o = t;
    for (; t < e.length && !jr.test(e[t]); ) t++;
    return t === o && Pe(), e.slice(o, t);
  }, r = () => {
    const o = n();
    if (o === "(") {
      t++;
      const c = {};
      if (n() === ")")
        return t++, c;
      for (; ; ) {
        const u = s();
        a(":"), c[u] = r();
        const h = e[t++];
        if (h === ")") return c;
        h !== "," && Pe();
      }
    }
    if (o === "!") {
      t++;
      const c = e[t++];
      if (c === "t") return !0;
      if (c === "f") return !1;
      if (c === "n") return null;
      if (c !== "(") return Pe();
      const u = [];
      if (n() === ")")
        return t++, u;
      for (; ; ) {
        u.push(r());
        const h = e[t++];
        if (h === ")") return u;
        h !== "," && Pe();
      }
    }
    if (o === "'") return s();
    const l = s();
    return Vf.test(l) ? Number(l) : l;
  }, i = r();
  return t !== e.length && Pe(), i;
}
function Ts(e) {
  return ga(ha(e));
}
function Hf(e) {
  try {
    return kn(Kf(e));
  } catch (t) {
    if (t instanceof Wr) return null;
    throw t;
  }
}
function zs(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const a = n.indexOf("="), s = a === -1 ? n : n.slice(0, a);
    if (Za(s) === t) return a === -1 ? "" : n.slice(a + 1);
  }
  return null;
}
function Wf(e, t, n) {
  const a = e.replace(/^[?]/, "").split("&").filter(Boolean), s = a.findIndex((i) => {
    const o = i.indexOf("=");
    return Za(o === -1 ? i : i.slice(0, o)) === t;
  }), r = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return s === -1 ? r && a.push(r) : r ? a[s] = r : a.splice(s, 1), a.length ? `?${a.join("&")}` : "";
}
function Za(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
const Uf = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%24/g, "$"],
  [/%20/g, "+"]
], jf = (e) => {
  let t = encodeURIComponent(e);
  for (const [n, a] of Uf) t = t.replace(n, a);
  return t;
};
function pp(e, t) {
  const { adapter: n } = t, a = t.param ?? "w", s = t.delay ?? 200, r = () => Pt(t.home) ?? null;
  let i = zs(n.search.value, a), o = null;
  const l = () => {
    o !== null && clearTimeout(o), o = null;
  }, c = (y) => y === null ? r() : Hf(Za(y)) ?? r(), u = () => {
    l();
    const y = e.value, g = r(), w = y ? Ts(y) : null, b = w === null || g && w === Ts(g) ? null : jf(w);
    i = b;
    const C = Wf(n.search.value, a, b);
    C !== n.search.value && n.replace(C);
  }, h = c(i);
  return h && (e.value = h), we(e, () => {
    l(), o = setTimeout(u, s);
  }), we(n.search, (y) => {
    const g = zs(y, a);
    if (g === i) return;
    l(), i = g;
    const w = c(g);
    w && (e.value = w);
  }), An() && Zt(() => o !== null ? u() : void 0), { flush: () => o !== null ? u() : void 0 };
}
function vp(e = "", t = "/") {
  const n = U(De(e)), a = U(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(r) {
      return `${a.value}${De(r)}`;
    },
    push(r) {
      n.value = De(r), s.push(`${a.value}${n.value}`);
    },
    replace(r) {
      n.value = De(r), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Ls(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return De(a === -1 ? n : n.slice(0, a));
}
function hp(e) {
  const t = U(Ls(e.currentRoute.value.fullPath)), n = p(() => e.currentRoute.value.path), a = we(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Ls(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${De(s)}`),
    replace: (s) => e.replace(`${n.value}${De(s)}`),
    href: (s) => {
      const r = `${n.value}${De(s)}`;
      return e.resolve?.(r).href ?? r;
    },
    dispose: a
  };
}
const Gf = {
  DataShell: Yu,
  ShellHeader: dr,
  QueryPanel: pr,
  RecordActions: hr,
  ResultsArea: Cr,
  FacetControl: fr,
  SegmentedControl: ud,
  StatusPill: nn,
  WindowFrame: Nf,
  WindowPane: Kr,
  ListView: ca,
  CardsView: _r,
  GridView: yr,
  ImagesView: wr,
  TableView: $r,
  LinksView: kr,
  PreviewView: br,
  TypeCardsView: xr
}, mp = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Gf))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Fs, t.route);
  }
};
export {
  Pn as CASCADE_STEP,
  Zf as COLUMN_BREAKPOINTS,
  Yf as COLUMN_ROLES,
  _r as CardsView,
  ks as ColumnCell,
  _l as DEFAULT_ENTITY_VIEW,
  gt as DEFAULT_FRAME,
  ta as DEFAULT_SORT,
  gl as DEFAULT_VIEW,
  ho as DRAFT_DELAY,
  Yu as DataShell,
  na as EMPTY_CELL,
  or as ENTITY_ALL,
  Sn as ENTITY_TERM,
  Yt as EXPRESSION_TERM,
  Ra as FACET_PREFIX,
  fr as FacetControl,
  yr as GridView,
  mp as HeaderContentLayoutPlugin,
  wr as ImagesView,
  kr as LinksView,
  ca as ListView,
  Mt as MINIMIZED_GAP,
  Sr as MINIMIZED_HEIGHT,
  ua as MINIMIZED_WIDTH,
  Mr as MIN_FRAME,
  gs as MOCK_TINTS,
  tp as MenuBar,
  Oa as MenuButton,
  Fa as MenuList,
  an as MetricDrill,
  Qa as PANE_CONTEXT_KEY,
  Ta as PARAM_DIR,
  Pa as PARAM_ENTITY,
  za as PARAM_EXPR,
  La as PARAM_PAGE,
  Aa as PARAM_SORT,
  Ea as PARAM_VIEW,
  Na as PinStar,
  br as PreviewView,
  Da as QueryMark,
  pr as QueryPanel,
  dn as RECORD_STATUSES,
  xa as RESULT_FIELDS,
  Fs as ROUTE_ADAPTER_KEY,
  hr as RecordActions,
  Cr as ResultsArea,
  lr as SHELL_CONTEXT_KEY,
  Qf as SHELL_THEMES,
  sn as ScopeMark,
  ud as SegmentedControl,
  $t as SelectTick,
  ep as ShellCard,
  dr as ShellHeader,
  ia as StandingControl,
  nn as StatusPill,
  $r as TableView,
  xr as TypeCardsView,
  Ns as VIEW_KINDS,
  yl as VIEW_LABELS,
  Xa as WINDOW_CONTEXT_KEY,
  Nf as WindowFrame,
  Kr as WindowPane,
  Er as activePanel,
  xt as activeTab,
  Ma as addTerm,
  Ca as andExpression,
  _d as axisOf,
  Va as cascade,
  Us as cellFull,
  en as cellText,
  gn as cellTextOf,
  Ke as cellValue,
  Kn as changesResults,
  Xn as clampRect,
  Nr as collapseSpace,
  Ed as collapseToTabs,
  ap as column,
  is as columnAlign,
  cs as columnClass,
  os as columnKey,
  Gs as columnShortcut,
  Il as columnShortcutOf,
  aa as columnTruncates,
  Cl as columnsFor,
  kl as countPages,
  ml as createHistoryAdapter,
  vp as createMemoryAdapter,
  to as createMockDataSource,
  hp as createVueRouterAdapter,
  Hf as decodeLayout,
  Pl as defaultCellText,
  Es as defaultLayout,
  $a as defaultQuery,
  Qt as defaultViewFor,
  Wn as drillExpression,
  Ms as dropIntoSpace,
  Nt as emptyFacetState,
  wa as emptyFacetValue,
  Ts as encodeLayout,
  tr as excludingTerm,
  Cn as expandShortcuts,
  Et as findEntity,
  ct as findSort,
  rp as fixedView,
  qa as float,
  Cs as floatPanel,
  Or as floatSplit,
  Ad as floatTabs,
  mn as fnv1a,
  Os as focusEntity,
  Ct as formatCount,
  $l as formatDate,
  st as formatExpression,
  bl as formatMetric,
  xl as formatOrdinal,
  tn as formatTerm,
  Nn as frame,
  ht as frameAt,
  Ee as frameOf,
  pa as framePathOf,
  Re as frontPanel,
  Zl as generateRows,
  np as group,
  Tt as groupOf,
  yd as groups,
  Ks as hasActiveFacets,
  fe as hasPanel,
  sp as headless,
  Kt as insertPanel,
  Ut as isChoosable,
  Jf as isEntityScoped,
  Vs as isFacetActive,
  le as isFloat,
  J as isGroup,
  it as isMaximized,
  mt as isMinimized,
  _e as isPanelTab,
  ka as isPristineQuery,
  Ot as isSplit,
  Ve as isTabOf,
  ba as isTypeCardsQuery,
  Ds as isViewKind,
  hs as joinExpression,
  nr as liftTerm,
  Dl as matchesExpression,
  Jl as matchesFacets,
  kd as maximizeFrame,
  $d as maximizeFrameAt,
  Ld as mergeSpace,
  bd as minimizeFrame,
  xd as minimizeFrameAt,
  pn as movePanel,
  Gt as moveTab,
  Ol as negateTerm,
  ut as nodeAt,
  Xt as nodeTitle,
  Se as normalizeLayout,
  De as normalizeSearch,
  ja as normalizeSizes,
  qr as onlySpace,
  Vl as oppositeTerm,
  lt as panelIds,
  tt as panelNode,
  bs as panelTabs,
  Ie as parseExpression,
  co as parseQuery,
  Oi as presentParts,
  mr as presentRow,
  In as pressOptions,
  Vr as providePaneContext,
  no as provideShellContext,
  Fd as provideWindowContext,
  Qn as raiseFrame,
  jt as raiseFrameAt,
  Cd as raisedPath,
  Wl as readDraft,
  Hs as reconcileFacets,
  Id as reconcileLayout,
  er as recordTerm,
  ra as refineExpression,
  _t as removePanel,
  yt as replaceAt,
  $s as resizeRect,
  Ps as resizeSplit,
  zn as resolveView,
  je as roleColumn,
  Ws as roleColumns,
  En as rootSpace,
  Ha as row,
  Sl as rowKey,
  sa as sameTerm,
  Ln as scopeTerm,
  Wt as scopeTermFor,
  rr as scopedEntity,
  jn as serializeQuery,
  Lt as setActivePanel,
  wd as setFrameRect,
  xs as setFrameRectAt,
  wn as setSizesAt,
  ip as setSplitDirection,
  rt as sizesOf,
  qs as sortsFor,
  Ce as spaceChrome,
  Dt as spaceTitle,
  Ka as split,
  ql as splitExpression,
  Ss as spreadTabs,
  fo as summarizeQuery,
  Ia as summaryTerms,
  yn as swapPanels,
  Ba as tabNode,
  ln as tabPanels,
  Sa as termStanding,
  Br as tileFloat,
  cp as toFloat,
  up as toTiled,
  lp as toggleMaximized,
  op as toggleMinimized,
  au as useColumns,
  mo as useDraft,
  zo as useEntityCounts,
  wu as useEntityPreviews,
  pp as useLayoutRoute,
  dp as usePaneContext,
  fp as usePaneMenu,
  bt as usePresentedRows,
  po as useQueryState,
  Io as useRecordNames,
  vo as useResults,
  be as useShellContext,
  On as useWindowContext,
  ls as viewAcross,
  la as withStanding,
  sr as withoutOwnScope,
  Bl as withoutTerm
};
