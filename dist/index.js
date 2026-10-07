import { ref as W, inject as It, provide as va, computed as p, toValue as Pt, shallowRef as yt, watch as we, onScopeDispose as Jt, getCurrentScope as An, defineComponent as ce, onMounted as zs, onBeforeUnmount as Ke, resolveComponent as Ls, openBlock as f, createElementBlock as m, normalizeStyle as Ee, Fragment as ae, renderList as he, toDisplayString as F, createCommentVNode as I, createElementVNode as x, createBlock as te, nextTick as Ft, useId as Tn, unref as A, normalizeClass as ut, Teleport as ul, createVNode as ie, withDirectives as dt, withKeys as Je, withModifiers as Fe, vModelText as $n, renderSlot as be, useSlots as en, createTextVNode as Ne, withCtx as $e, reactive as ts, resolveDynamicComponent as ha, createSlots as mn, useModel as Ht, mergeModels as xn, vShow as Cn, Comment as dl, Text as fl, h as pl } from "vue";
const Rs = Symbol("dc.routeAdapter");
function Oe(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function vl() {
  const e = typeof window < "u", t = W(e ? Oe(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), a = () => {
    t.value = Oe(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (r, i) => {
    const o = Oe(r);
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
      return e ? `${window.location.pathname}${Oe(r)}${window.location.hash}` : `${n.value}${Oe(r)}`;
    },
    push: (r) => s(r, "push"),
    replace: (r) => s(r, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
const Is = ["list", "cards", "grid", "images", "table", "links", "preview"], Wf = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], fn = ["ok", "running", "queued", "review", "failed"], Uf = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], jf = [480, 620, 760, 900, 1100], hl = "cards", ml = "table";
function Qt(e, t = {}) {
  const n = (s) => s && Fs(s) ? s : void 0;
  if (e === null) return n(t.view) ?? hl;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? ml;
}
function ns(e, t, n, a = {}) {
  return e === Qt(t, a) ? Qt(n, a) : e;
}
const ea = "updated";
function Fs(e) {
  return typeof e == "string" && Is.includes(e);
}
const gl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function ma(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Et(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Ns(e, t = {}) {
  const n = Et(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function Ds(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Os(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of Ds(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const _l = { key: ea, label: ea };
function it(e, t, n = null) {
  const a = Os(e, n);
  return (t ? a.find((r) => r.key === t) : void 0) ?? a.find((r) => r.key === ea) ?? a[0] ?? _l;
}
function ga(e) {
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
  for (const n of e?.facets ?? []) t[n.key] = ga(n);
  return t;
}
function Bs(e) {
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
function qs(e) {
  return Object.values(e).some(Bs);
}
function _a(e) {
  return e.entity === null && e.expr.trim() === "" && !qs(e.facets);
}
function Gf(e) {
  return e.entity !== null;
}
function ya(e) {
  return e.entity === null && e.view === "cards";
}
function yl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function wa(e, t = {}) {
  const a = t.landing === "entity" ? Ns(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Qt(a?.key ?? null, t),
    sort: it(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Nt(a),
    page: 1
  };
}
const ka = ["entity", "sort", "dir", "expr", "facets"];
function Vn(e) {
  return ka.some((t) => t in e);
}
function Vs(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : ga(a);
  }
  return n;
}
function gn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function wl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Ct(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function kl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function bl(e) {
  return String(e + 1).padStart(2, "0");
}
const ta = "—";
function je(e, t) {
  return e.find((n) => n.role === t);
}
function Ks(e, t) {
  return e.filter((n) => n.role === t);
}
function $l(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const xl = ["id", "entityKey", "entityLabel"];
function Ve(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (xl.includes(n))
      return t[n];
  }
}
function as(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Cl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ml(e, t) {
  if (e == null || e === "") return ta;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? wl(n) : String(e);
  }
  return t === "date" ? kl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : ta : String(e);
}
function tn(e, t) {
  const n = Ve(e, t);
  return e.format ? e.format(n, t) : Ml(n, e.kind);
}
function Sl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Hs(e, t) {
  const n = tn(e, t), a = Sl(Ve(e, t));
  return a && a !== n ? a : n;
}
function _n(e, t) {
  return e ? tn(e, t) : "";
}
function ss(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Pl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function rs(e) {
  return [Pl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function na(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const El = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Al(e) {
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
  for (const s of Al(t)) {
    const r = s.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const i = s.length > 1 && s.startsWith("-"), o = i ? s.slice(1) : s, l = i ? { negated: !0 } : {}, c = El.exec(o);
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
const At = (e) => e.toLowerCase().replace(/\s+/g, ""), Ws = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Tl(e, t, n) {
  const a = At(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && At(c.label) === a
  );
  if (r) return Ve(r, t);
  const i = n.facets.find((c) => At(c.label) === a);
  if (i && i.key in t.fields) return t.fields[i.key];
  const o = Ws.find(([c]) => c === a)?.[1];
  if (o) {
    const c = je(s, o);
    if (c) return Ve(c, t);
  }
  const l = /^metric(\d+)$/.exec(a);
  if (l) {
    const c = Ks(s, "metric")[Number(l[1]) - 1];
    if (c) return Ve(c, t);
  }
}
function Us(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const ls = /^[a-z_][\w.-]*$/;
function js(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return ls.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : At(e.label);
  return n !== void 0 && ls.test(n) ? n : void 0;
}
function zl(e, t) {
  const n = At(e);
  if (n === "entity" || Ws.some(([s]) => s === n) || /^metric\d+$/.test(n)) return !0;
  const a = (s) => s !== void 0 && At(s) === n;
  return (t.columns ?? []).some(
    (s) => a(s.key) || a(s.field) || a(s.label)
  ) || t.facets.some((s) => a(s.key) || a(s.label));
}
function Mn(e, t) {
  if (!t) return e;
  let n = !1;
  const a = Ie(e).map(
    (s) => s.map((r) => {
      if (r.kind !== "field") return r;
      const i = Gs(r.field, t), o = i && js(i);
      return o ? (n = !0, { ...r, field: o }) : r;
    })
  );
  return n ? at(a) : e;
}
function Gs(e, t) {
  if (!(!e || zl(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && Us(n.label) === e
    );
}
function Ll(e, t) {
  if (!t || e.label === void 0 || !js(e)) return;
  const n = Us(e.label);
  return Gs(n, t) === e ? n : void 0;
}
function Kn(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function os(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Rl(e, t, n) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const l = je(i, o), c = l ? Ve(l, t) : void 0;
      return typeof c == "string" && Kn(c, e.value);
    });
  }
  const a = Tl(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (o) => e.comparator === "=" ? os(String(o), e.value) : Kn(String(o), e.value)
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
    return e.comparator === "=" ? os(String(a), e.value) : Kn(String(a), e.value);
  }
  const s = Number(e.value), r = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(r) ? null : Il(e.comparator, r, s);
}
function is(e, t, n) {
  const a = Rl(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function Il(e, t, n) {
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
function cs(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
function Fl(e, t, n) {
  return e.length ? e.some((a) => {
    const s = /* @__PURE__ */ new Map();
    for (const r of a)
      cs(r) && s.set(r.field, (s.get(r.field) ?? !1) || is(r, t, n));
    return a.every(
      (r) => cs(r) ? s.get(r.field) === !0 : is(r, t, n)
    );
  }) : !0;
}
function us(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function nn(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + us(e.value) : `${t}${e.field}${e.comparator}${us(e.value)}`;
}
function Xf(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function at(e) {
  return e.filter((t) => t.length).map((t) => t.map(nn).join(" ")).join(" OR ");
}
function Nl(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((r, i) => i !== n) : a).filter((a) => a.length);
}
function Dl(e) {
  const t = Ie(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(nn).join(" ")
  };
}
function ds(e, t) {
  return [...e.map(nn), t.trim()].filter(Boolean).join(" ");
}
const fs = (e, t) => e.toLowerCase() === t.toLowerCase();
function zn(e, t) {
  return !!e.negated == !!t.negated && Xs(e, t);
}
function Yt(e, t) {
  return !!e.negated != !!t.negated && Xs(e, t);
}
function Xs(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && fs(e.value, t.value) : t.kind === "text" && fs(e.value, t.value);
}
function Ol(e, t) {
  return t.filter((n) => !e.some((a) => zn(a, n)));
}
function ba(e, t) {
  return Qs(e, t, (n) => n);
}
function aa(e, t) {
  return Qs(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((r) => Yt(s, r)))
  );
}
const Bl = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function ql(e) {
  return at(
    Ie(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Bl.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function Qs(e, t, n) {
  const a = Ie(e), s = Ie(t);
  return a.length ? s.length ? at(
    a.flatMap(
      (r) => s.map((i) => [...n(r, i), ...Ol(r, i)])
    )
  ) : at(a) : at(s);
}
const ps = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Ys(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Vl = 7, Kl = 3;
function Hl(e, t, n, a) {
  const s = (t * Vl + gn(n)) % a, r = [];
  for (let i = 0; i < Math.min(Kl, a); i++)
    r.push(Ys(e, (s + i) % a));
  return r;
}
function Wl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ul(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ul(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) s.add((a + r) % e.length);
  return [...s].sort((r, i) => r - i).map((r) => e[r]);
}
function jl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: r } = t, i = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${i}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return fn[n % fn.length];
    case "updated":
      return r;
    case "tint":
      return ps[n % ps.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return fn[n % fn.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Gl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, i = t.scopes ?? [];
  if (!r.length) return [];
  const o = [];
  for (let l = 0; l < n; l++) {
    const c = r[l % r.length], d = Math.floor(l / r.length), h = gn(`${a}:${e.key}:${c[0]}:${l}`), y = Ys(e.key, l), g = new Date(s.getTime() - h % 900 * 36e5).toISOString(), w = {};
    for (const b of e.columns ?? []) {
      const C = b.field ?? b.key;
      if (!C || b.value) continue;
      const k = jl(b, {
        hash: gn(`${h}:${C}`),
        sample: c,
        revision: d,
        updatedAt: g
      });
      k !== void 0 && (w[C] = k);
    }
    for (const b of e.facets)
      w[b.key] = Wl(b, gn(`${h}:${b.key}`));
    for (const [b, C] of i)
      w[b] = C === e.key ? y : Hl(C, l, b, n);
    o.push({ id: y, entityKey: e.key, entityLabel: e.label, fields: w });
  }
  return o;
}
function Xl(e, t) {
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
function Ql(e, t) {
  const n = e.find((i) => i.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", r = a === "date" || n.role === "updated";
  return (i, o) => {
    const l = Ve(n, i), c = Ve(n, o);
    return s ? Number(c ?? 0) - Number(l ?? 0) : r ? Date.parse(String(c ?? "")) - Date.parse(String(l ?? "")) : String(c ?? "").localeCompare(String(l ?? ""));
  };
}
function Yl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const r = t.get(a.key);
    if (r) return r;
    const i = e.scopes ?? s.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), o = Gl(a, { ...e, scopes: i });
    return t.set(a.key, o), o;
  };
  return {
    query({ query: a, schema: s, entity: r, limit: i, offset: o }) {
      const l = Ie(a.expr), c = r ? [r] : s.entities, d = [], h = [];
      for (const w of c)
        for (const b of n(w, s))
          d.push(b), (r ? Xl(b, a.facets) : !0) && Fl(l, b, w) && h.push(b);
      const y = it(r, a.sort, s), g = h.sort(Ql(Ds(r, s), y.key));
      return a.dir === "asc" && g.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: g.slice(o, o + i),
        total: h.length,
        unfiltered: h.length === d.length
      };
    }
  };
}
function $a(e, t) {
  return Zs(e, t.id);
}
function Zs(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Wt(e, t) {
  return $a(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function xa(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Ie(t).flat();
  if (!a) return n;
  const s = Ie(n);
  return s.some((o) => o.some((l) => zn(l, a))) ? n : s.some((o) => o.some((l) => Yt(l, a))) ? at(
    s.map(
      (o) => o.map((l) => Yt(l, a) ? a : l)
    )
  ) : `${n} ${t}`;
}
function Js(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function er(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Ie(t).flat();
  if (!n) return null;
  const a = Ie(e).flat();
  return a.some((s) => zn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Yt(s, n)) ? n.negated ? "in" : "out" : null;
}
function tr(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Ie(t).flat();
  if (!n) return e;
  const a = Ie(e), s = a.map(
    (r) => r.filter((i) => !zn(i, n) && !Yt(i, n))
  );
  return s.every((r, i) => r.length === a[i]?.length) ? e : at(s);
}
function vs(e, t, n) {
  return t ? n === null ? tr(e, t) : xa(e, n === "out" ? Js(t) : t) : e;
}
function nr(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function Ln(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function Hn(e, t, n, a = {}) {
  const s = Wt(e, n);
  return xa(t.expr, a.exclude ? Js(s) : s);
}
function ar(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Ie(t), s = a.map(
    (r) => r.filter((i) => i.kind !== "field" || i.field !== n)
  );
  return s.every((r, i) => r.length === a[i]?.length) ? t : at(s);
}
function sr(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const rr = Symbol("dc.shellContext");
function Zl(e) {
  const t = e.liveQuery ? e : Jl(e);
  return va(rr, t), t;
}
function Jl(e) {
  const t = e.draft ?? W("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: p(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        aa(e.query.value.expr, Mn(n, e.entity.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function xe() {
  const e = It(rr, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Ca = "e", Ma = "v", Sa = "s", Pa = "d", Ea = "q", Aa = "p", Ta = "f_", lr = "*", eo = [
  Ca,
  Ma,
  Sa,
  Pa,
  Ea,
  Aa
], sa = "..", or = ",", to = [
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
function Wn(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of to) t = t.replace(n, a);
  return t;
}
function nt(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ir(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), r = s === -1 ? a : a.slice(0, s), i = s === -1 ? "" : a.slice(s + 1);
    n.push([nt(r), i]);
  }
  return n;
}
function no(e) {
  return eo.includes(e) || e.startsWith(Ta);
}
function hs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function ao(e, t) {
  const n = nt(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(or).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => a.has(r)) };
    }
    case "range": {
      const a = n.indexOf(sa), s = (a === -1 ? n : n.slice(0, a)).trim(), r = (a === -1 ? "" : n.slice(a + sa.length)).trim(), i = s === "" ? null : Number(s), o = r === "" ? null : Number(r);
      let l = i !== null && Number.isFinite(i) ? hs(i, e.min, e.max) : null, c = o !== null && Number.isFinite(o) ? hs(o, e.min, e.max) : null;
      return l !== null && c !== null && l > c && ([l, c] = [c, l]), { kind: "range", min: l, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function so(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(or) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${sa}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function ro(e, t, n = {}) {
  const a = wa(t, n), s = new Map(ir(e)), r = s.get(Ca), i = r === void 0 ? a.entity : nt(r), o = i === lr ? null : Et(t, i), l = s.get(Ma), c = l && Fs(nt(l)) ? nt(l) : Qt(o?.key ?? null, n), d = s.get(Sa), h = it(o, d ? nt(d) : n.sort, t), y = s.get(Pa), g = y ? nt(y) === "asc" ? "asc" : "desc" : a.dir, w = s.get(Ea), b = s.get(Aa), C = b === void 0 ? 1 : Number(nt(b)), k = Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 1, M = {};
  for (const R of o?.facets ?? []) {
    const $ = s.get(`${Ta}${R.key}`);
    M[R.key] = $ === void 0 ? ga(R) : ao(R, $);
  }
  return {
    entity: o?.key ?? null,
    view: c,
    sort: h.key,
    dir: g,
    expr: w === void 0 ? "" : nt(w),
    facets: Vs(o, M),
    page: k
  };
}
function Un(e, t, n = {}, a = "") {
  const s = wa(t, n), r = Et(t, e.entity), i = ir(a).filter(([h]) => !no(h)), o = [], l = (h, y) => o.push([h, Wn(y)]), c = r?.key ?? null;
  c !== s.entity && l(Ca, c ?? lr), e.view !== Qt(c, n) && l(Ma, e.view), e.sort !== s.sort && l(Sa, e.sort), e.dir !== s.dir && l(Pa, e.dir), e.expr.trim() !== "" && l(Ea, e.expr);
  for (const h of r?.facets ?? []) {
    const y = e.facets[h.key];
    if (!y) continue;
    const g = so(y, h);
    g !== null && o.push([`${Ta}${h.key}`, Wn(g)]);
  }
  e.page > 1 && l(Aa, String(e.page));
  const d = [
    ...i.map(([h, y]) => [Wn(h), y]),
    ...o
  ];
  return d.length ? `?${d.map(([h, y]) => y === "" ? h : `${h}=${y}`).join("&")}` : "";
}
const Sn = "entity", Zt = "expr";
function lo(e, t) {
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
function za(e, t) {
  const n = [];
  t && n.push({
    id: Sn,
    label: `entity:${t.key}`,
    facetKey: Sn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && Bs(s) && n.push(...lo(a, s));
  }
  return Ie(e.expr).forEach((a, s) => {
    a.forEach((r, i) => {
      n.push({
        id: `${Zt}:${s}:${i}`,
        label: nn(r),
        facetKey: Zt,
        group: s,
        index: i,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function oo(e, t, n = null) {
  if (_a(e)) {
    const r = it(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const a = za(e, t).filter((r) => r.facetKey !== Zt).map((r) => r.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function io(e) {
  const { adapter: t } = e, n = p(() => Pt(e.schema)), a = p(() => Pt(e.defaults) ?? {}), s = p(() => ro(t.search.value, n.value, a.value)), r = p(() => Et(n.value, s.value.entity)), i = p(() => r.value ?? Ns(n.value, a.value)), o = p(() => Os(r.value, n.value)), l = p(() => it(r.value, s.value.sort, n.value)), c = (k, M) => {
    const R = Un(k, n.value, a.value, t.search.value);
    return R === t.search.value ? !1 : (M === "push" ? t.push(R) : t.replace(R), !0);
  }, d = () => Pt(e.navigationMode) ?? "push", h = () => Pt(e.facetNavigationMode) ?? "replace", y = (k, M) => {
    const R = k.page ?? (Vn(k) ? 1 : s.value.page);
    return c({ ...s.value, ...k, page: R }, M);
  }, g = (k) => {
    const M = k.page ?? (Vn(k) ? 1 : s.value.page), R = Un({ ...s.value, ...k, page: M }, n.value, a.value, t.search.value);
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
      view: ns(s.value.view, s.value.entity, M?.key ?? null, a.value),
      sort: it(M, s.value.sort, n.value).key,
      facets: Nt(M)
    };
  }, C = (k) => {
    const M = b(k);
    Object.keys(M).length && y(M, d());
  };
  return {
    query: s,
    entity: r,
    focus: i,
    sort: l,
    sorts: o,
    summary: p(() => oo(s.value, r.value, n.value)),
    terms: p(() => za(s.value, r.value)),
    isPristine: p(() => _a(s.value)),
    isEverything: p(() => s.value.entity === null),
    hasFacets: p(() => qs(s.value.facets)),
    setEntity: C,
    entityHref: (k) => g(b(k)),
    clearEntity: () => C(null),
    setView(k) {
      y({ view: k }, d());
    },
    setSort(k) {
      y({ sort: it(r.value, k, n.value).key }, d());
    },
    toggleDirection() {
      y({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(k) {
      return y({ expr: k }, d());
    },
    narrow(k, M, R) {
      return y({ expr: k, ...b(M), ...R ? { view: R } : {} }, d());
    },
    narrowHref(k, M, R) {
      return g({ expr: k, ...b(M), ...R ? { view: R } : {} });
    },
    setPage(k, M) {
      y({ page: Math.max(1, Math.floor(k)) }, M ?? d());
    },
    setFacet(k, M) {
      w(k, () => M);
    },
    toggleChip(k, M) {
      w(k, (R) => R.kind !== "chips" ? R : { kind: "chips", selected: R.selected.includes(M) ? R.selected.filter((S) => S !== M) : [...R.selected, M] });
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
      if (k.facetKey === Zt) {
        const M = Nl(Ie(s.value.expr), k.group ?? 0, k.index ?? 0);
        y({ expr: at(M) }, d());
        return;
      }
      w(k.facetKey, (M) => M.kind === "chips" && k.option ? { kind: "chips", selected: M.selected.filter((R) => R !== k.option) } : M.kind === "range" ? { kind: "range", min: null, max: null } : M.kind === "toggle" ? { kind: "toggle", on: !1 } : M);
    },
    clearFilters() {
      y({ ...b(null), expr: "", facets: Nt(null) }, d());
    },
    reset() {
      c(wa(n.value, a.value), d());
    },
    hrefFor(k) {
      const M = { ...s.value, ...k };
      return "entity" in k && !("view" in k) && (M.view = ns(s.value.view, s.value.entity, M.entity, a.value)), M.page = k.page ?? (Vn(k) ? 1 : s.value.page), M.facets = Vs(Et(n.value, M.entity), M.facets), `${t.path.value}${Un(M, n.value, a.value, t.search.value)}`;
    }
  };
}
function co(e) {
  const t = yt([]), n = W(0), a = W(!1), s = W(!1), r = yt(null);
  let i = 0, o = null, l = null;
  const c = p(() => (e.query.value.page - 1) * e.limit.value), d = p(() => yl(n.value, e.limit.value)), h = () => {
    const $ = e.query.value, S = e.within?.value.trim(), V = ar(e.entity.value, $.expr);
    return S ? { ...$, expr: ba(S, V) } : V === $.expr ? $ : { ...$, expr: V };
  }, y = ($, S) => {
    t.value = $.rows, n.value = $.total, r.value = null, g(S);
  }, g = ($) => {
    o = { key: $, total: n.value }, s.value = !1;
  }, w = ($) => {
    r.value = $, t.value = [], n.value = 0, o = null, s.value = !1;
  }, b = ($, S, V, P) => {
    let z = !0;
    const E = () => $ === i;
    let H = 0, B = !1;
    const U = (se) => {
      H = se, B = !0, P === void 0 && (n.value = se);
    }, ye = () => {
      z && (z = !1, t.value = [], U(0)), r.value = null;
    };
    return {
      get open() {
        return E();
      },
      insert(se, D) {
        if (!E()) return;
        const T = Array.isArray(se) ? se : [se];
        if (!T.length) return;
        ye();
        const j = [...t.value];
        j.splice(D ?? j.length, 0, ...T), t.value = S > 0 ? j.slice(0, S) : j, U(H + T.length);
      },
      set(se) {
        E() && (se.rows && (ye(), t.value = S > 0 ? se.rows.slice(0, S) : se.rows, U(se.rows.length)), se.total !== void 0 && U(se.total));
      },
      close() {
        E() && (a.value = !1, B && (n.value = H), g(V));
      },
      fail(se) {
        E() && (w(se), a.value = !1);
      }
    };
  }, C = () => {
    const $ = l;
    l = null, $?.();
  }, k = () => {
    const $ = ++i;
    C();
    const S = M.value, V = o?.key === S ? o.total : void 0;
    s.value = V === void 0;
    const P = {
      query: h(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, z = e.source.value;
    if (z.stream) {
      a.value = !0;
      try {
        l = z.stream(P, b($, P.limit, S, V)) ?? null;
      } catch (H) {
        w(H), a.value = !1;
      }
      return;
    }
    let E;
    try {
      E = z.query(P);
    } catch (H) {
      w(H);
      return;
    }
    if (!(E instanceof Promise)) {
      y(E, S), a.value = !1;
      return;
    }
    a.value = !0, E.then((H) => {
      $ === i && y(H, S);
    }).catch((H) => {
      $ === i && w(H);
    }).finally(() => {
      $ === i && (a.value = !1);
    });
  }, M = p(() => {
    const $ = h();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(ka.map((V) => $[V]))}`;
  }), R = p(() => `${M.value}|${e.query.value.page}`);
  return we([e.source, R, e.limit], k, {
    immediate: !0
  }), Jt(() => {
    i++, C();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: r, refresh: k };
}
const uo = 150;
function fo(e) {
  const t = e.delay ?? uo, n = W(""), a = W("");
  let s = !1, r;
  const i = () => {
    clearTimeout(r), r = void 0;
  }, o = p(() => Mn(ql(a.value), e.entity.value)), l = p(() => o.value.trim() !== ""), c = p(
    () => JSON.stringify([o.value, ...ka.map((g) => e.query.value[g])])
  ), d = yt(null), h = p(() => {
    const g = e.query.value;
    if (!l.value) return g;
    const w = d.value?.of === c.value ? d.value.page : 1;
    return { ...g, expr: aa(g.expr, o.value), page: w };
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
  return An() && Jt(i), {
    text: n,
    live: h,
    drafting: l,
    setPage(g) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(g)) };
    },
    commit() {
      const g = n.value.trim();
      if (!g) return;
      const w = aa(
        e.query.value.expr,
        Mn(g, e.entity.value)
      );
      a.value = g, y(() => e.setExpression(w));
    },
    abandon() {
      i(), s = !1, n.value = "", a.value = "";
    },
    release: y
  };
}
const Ut = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, po = ["aria-label"], vo = ["role", "aria-label"], ho = ["data-dc-item"], mo = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, go = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], _o = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, yo = { class: "dc-menu__label dc-truncate" }, wo = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, ko = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, bo = /* @__PURE__ */ ce({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = W(null), i = W([]), o = W(null), l = W(null), c = W(null), d = W(!1), h = p(
      () => a.items.flatMap((P, z) => Ut(P) ? [z] : [])
    ), y = p(() => {
      const P = [{ entries: [] }];
      return a.items.forEach((z, E) => {
        z.heading ? P.push({ heading: z, entries: [] }) : P[P.length - 1]?.entries.push({ item: z, index: E });
      }), P.filter((z) => z.entries.length > 0);
    }), g = W({ x: a.at.x, y: a.at.y });
    async function w() {
      g.value = { x: a.at.x, y: a.at.y }, await Ft();
      const P = r.value?.getBoundingClientRect();
      if (!P) return;
      const z = 8;
      let E = a.at.x, H = a.at.y;
      if (E + P.width > window.innerWidth - z) {
        const B = a.at.mirrorX === void 0 ? null : a.at.mirrorX - P.width;
        E = B !== null && B >= z ? B : window.innerWidth - P.width - z;
      }
      H + P.height > window.innerHeight - z && (H = window.innerHeight - P.height - z), g.value = { x: Math.max(z, E), y: Math.max(z, H) };
    }
    const b = p(() => ({ left: `${g.value.x}px`, top: `${g.value.y}px` }));
    function C(P) {
      o.value = P, P !== null && Ft(() => i.value[P]?.focus());
    }
    function k(P, z) {
      const E = h.value;
      if (E.length === 0) return null;
      if (P === null) return z === 1 ? E[0] ?? null : E[E.length - 1] ?? null;
      const H = E.indexOf(P);
      return H === -1 ? E[0] ?? null : E[(H + z + E.length) % E.length] ?? null;
    }
    function M(P, z) {
      if (!a.items[P]?.items?.length) return;
      const H = i.value[P]?.getBoundingClientRect(), B = r.value?.getBoundingClientRect();
      !H || !B || (c.value = { x: B.right - 4, y: H.top - 4, mirrorX: B.left + 4 }, l.value = P, d.value = z);
    }
    function R(P) {
      const z = l.value;
      l.value = null, c.value = null, P && z !== null && C(z);
    }
    function $(P) {
      const z = a.items[P];
      if (!(!z || !Ut(z))) {
        if (z.items?.length) {
          M(P, !0);
          return;
        }
        s("choose", z);
      }
    }
    function S(P) {
      const z = P.key;
      if (z === "Escape") {
        P.preventDefault(), P.stopPropagation(), l.value !== null ? R(!0) : s("dismiss");
        return;
      }
      if (z === "ArrowDown" || z === "ArrowUp") {
        P.preventDefault(), P.stopPropagation(), R(!1), C(k(o.value, z === "ArrowDown" ? 1 : -1));
        return;
      }
      if (z === "Home" || z === "End") {
        P.preventDefault(), P.stopPropagation(), R(!1), C(k(null, z === "Home" ? 1 : -1));
        return;
      }
      if (z === "ArrowRight") {
        const E = o.value;
        E !== null && a.items[E]?.items?.length && (P.preventDefault(), P.stopPropagation(), M(E, !0));
        return;
      }
      if (z === "ArrowLeft") {
        l.value !== null && (P.preventDefault(), P.stopPropagation(), R(!0));
        return;
      }
      if (z === "Enter" || z === " ") {
        const E = o.value;
        if (E === null) return;
        P.preventDefault(), P.stopPropagation(), $(E);
      }
    }
    function V(P) {
      const z = a.items[P];
      !z || !Ut(z) || (l.value !== null && l.value !== P && R(!1), C(P), z.items?.length && M(P, !1));
    }
    return zs(() => {
      w(), a.autofocus && C(k(null, 1));
    }), we(() => a.at, w, { deep: !0 }), we(() => a.items, () => void w(), { deep: !0 }), Ke(() => {
      l.value = null;
    }), t({ root: r }), (P, z) => {
      const E = Ls("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Ee(b.value),
        onKeydown: S
      }, [
        (f(!0), m(ae, null, he(y.value, (H, B) => (f(), m("div", {
          key: `${B}-${H.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: H.heading ? "group" : "none",
          "aria-label": H.heading?.label
        }, [
          H.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": H.heading.id
          }, F(H.heading.label), 9, ho)) : I("", !0),
          (f(!0), m(ae, null, he(H.entries, ({ item: U, index: ye }) => (f(), m(ae, {
            key: U.id ?? `${ye}-${U.label ?? ""}`
          }, [
            U.separator ? (f(), m("div", mo)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (se) => {
                se && (i.value[ye] = se);
              },
              type: "button",
              class: "dc-menu__item",
              role: U.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": U.checked === void 0 ? void 0 : U.checked,
              "aria-haspopup": U.items?.length ? "menu" : void 0,
              "aria-expanded": U.items?.length ? l.value === ye : void 0,
              "aria-disabled": U.disabled ? "true" : void 0,
              disabled: U.disabled,
              "data-dc-item": U.id,
              tabindex: "-1",
              onClick: (se) => $(ye),
              onMouseenter: (se) => V(ye)
            }, [
              x("span", _o, F(U.checked ? "✓" : ""), 1),
              x("span", yo, F(U.label), 1),
              U.shortcut ? (f(), m("span", wo, F(U.shortcut), 1)) : U.items?.length ? (f(), m("span", ko, "›")) : I("", !0)
            ], 40, go))
          ], 64))), 128))
        ], 8, vo))), 128)),
        l.value !== null && c.value ? (f(), te(E, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: c.value,
          label: e.items[l.value]?.label,
          autofocus: d.value,
          onChoose: z[0] || (z[0] = (H) => s("choose", H)),
          onDismiss: z[1] || (z[1] = (H) => R(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
      ], 44, po);
    };
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, La = /* @__PURE__ */ fe(bo, [["__scopeId", "data-v-9b1413fa"]]), $o = { class: "dc-pick" }, xo = ["id"], Co = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Mo = { class: "dc-pick__label" }, So = /* @__PURE__ */ ce({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Tn() ?? "dc-pick", r = W(null), i = W(null), o = W(null), l = W(!1), c = p(() => o.value !== null), d = W(null), h = p(
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
      const S = r.value?.getBoundingClientRect();
      S && (d.value = r.value?.closest(".dc-shell") ?? document.body, o.value = { x: S.left, y: S.bottom + 4, mirrorX: S.right }, l.value = $, a("open"));
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
      const S = $.target;
      S && (r.value?.contains(S) || i.value?.root?.contains(S) || b(!1));
    }
    we(c, ($) => {
      $ ? window.addEventListener("pointerdown", M, !0) : window.removeEventListener("pointerdown", M, !0);
    }), Ke(() => window.removeEventListener("pointerdown", M, !0));
    function R($) {
      b(!0), !($.id === void 0 || $.id === n.modelValue) && a("update:modelValue", $.id);
    }
    return ($, S) => (f(), m("span", $o, [
      x("span", {
        id: `${A(s)}-name`,
        class: "dc-pick__name"
      }, F(e.label), 9, xo),
      x("button", {
        id: `${A(s)}-value`,
        ref_key: "trigger",
        ref: r,
        type: "button",
        class: ut(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${A(s)}-name ${A(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: C,
        onKeydown: k
      }, [
        x("span", Mo, F(h.value?.label), 1)
      ], 42, Co),
      S[1] || (S[1] = x("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      o.value && d.value ? (f(), te(ul, {
        key: 0,
        to: d.value
      }, [
        ie(La, {
          ref_key: "menu",
          ref: i,
          class: "dc-pick__list",
          style: Ee(g.value),
          items: y.value,
          at: o.value,
          label: e.label,
          autofocus: l.value,
          onChoose: R,
          onDismiss: S[0] || (S[0] = (V) => b(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : I("", !0)
    ]));
  }
}), ms = /* @__PURE__ */ fe(So, [["__scopeId", "data-v-d21ebf1b"]]);
function Po(e) {
  const t = yt(/* @__PURE__ */ new Map()), n = W(!0);
  let a = 0, s;
  const r = () => {
    a++, s?.abort(), s = void 0;
  }, i = () => {
    r();
    const o = a, { signal: l } = s = new AbortController(), c = e.query.value, d = e.schema.value, h = e.entities.value, y = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !y;
    const g = /* @__PURE__ */ new Map();
    let w = !0;
    for (const b of h) {
      const C = ar(b, c.expr), k = y ? ba(y, C) : C;
      let M = !1;
      const R = (S) => {
        if (o !== a) return;
        if (w) {
          g.set(b.key, S);
          return;
        }
        const V = new Map(t.value);
        V.set(b.key, S), t.value = V;
      }, $ = e.source.value.query({
        query: { ...c, entity: b.key, expr: k, facets: Nt(b), page: 1 },
        schema: d,
        entity: b,
        limit: 0,
        offset: 0,
        signal: l,
        progress: (S) => {
          M || R({ total: S, pending: !0, counted: !0 });
        }
      });
      $ instanceof Promise ? (g.has(b.key) || g.set(b.key, { total: 0, pending: !0, counted: !1 }), $.then((S) => {
        M = !0, R({ total: S.total, pending: !1, counted: !0 });
      })) : (M = !0, g.set(b.key, { total: $.total, pending: !1, counted: !0 }));
    }
    w = !1, t.value = g;
  };
  return An() && Jt(r), { counts: t, pristine: n, refresh: i, cancel: r };
}
const Eo = 25, cr = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ao(e, t) {
  return e.find((n) => cr(n.id, t));
}
function To(e) {
  const t = yt(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (o) => {
    if (o.facetKey !== Zt || !o.field || !o.value) return null;
    const l = sr(e.schema.value, o.field);
    return l ? { entity: l, id: o.value, key: `${l.key}:${o.value}` } : null;
  }, s = (o) => {
    const { entity: l, id: c } = o, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: l.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Zs(l, c) ?? "",
        facets: Nt(l),
        sort: it(l, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: l,
      limit: Eo,
      offset: 0
    });
  }, r = (o, l) => {
    const c = _n(je(o.columns ?? [], "identity"), l);
    return c === ta || cr(c, l.id) ? "" : c;
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
      d.forEach((y, g) => {
        const { reference: w } = l[g], b = Ao(y.rows, w.id);
        h.set(w.key, b ? r(w.entity, b) : "");
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
const zo = ["data-dc-expanded"], Lo = { class: "dc-header__domain" }, Ro = {
  key: 0,
  class: "dc-header__within"
}, Io = ["title"], Fo = ["data-dc-more", "title"], No = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Do = ["title", "aria-label", "onClick"], Oo = ["onKeydown"], Bo = ["aria-expanded", "aria-controls"], qo = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Vo = { class: "dc-header__sr" }, Ko = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Ho = ["disabled"], Wo = ["title"], Uo = ["value", "onKeydown"], jo = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Go = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Xo = ["disabled"], Qo = {
  key: 1,
  class: "dc-header__actions"
}, Yo = "…", Zo = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = xe(), r = p(() => s.schema.value), i = p(
      () => s.hasFacets.value || !!s.liveQuery.value.expr.trim() || !!s.within.value
    ), o = p(() => r.value.formatCount ?? Ct), l = Po({
      source: s.source,
      schema: s.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: s.liveQuery,
      entities: s.entities,
      within: s.within
    });
    function c(O) {
      if (n.hideCount) return O.count;
      if (O.key === s.query.value.entity && i.value) return o.value(s.total.value);
      if (l.pristine.value) return O.count;
      const X = l.counts.value.get(O.key);
      return X ? X.counted ? `${X.pending ? "~" : ""}${o.value(X.total)}` : Yo : O.count;
    }
    function d(O) {
      return `${O.label} · ${c(O)}`;
    }
    const h = p(() => [
      { key: "", label: "Everything" },
      ...s.entities.value.map((O) => ({ key: O.key, label: d(O) }))
    ]), y = p(() => {
      const O = s.within.value.trim();
      return O ? za({ ...s.query.value, expr: O, facets: {} }, null) : [];
    }), g = p(
      () => (n.views ?? [...Is]).map((O) => ({ key: O, label: gl[O] }))
    ), w = p(() => ma(s.query.value.view, n.views)), b = p(() => s.query.value.entity !== null);
    function C(O) {
      s.setView(O);
    }
    const k = p(() => {
      const O = s.entity.value, Q = O?.keepsScope ? void 0 : O?.scope?.toLowerCase();
      return s.terms.value.filter((X) => X.facetKey !== Sn).map((X, De, Bt) => {
        const xt = Bt[De - 1];
        return {
          term: X,
          or: xt?.group !== void 0 && X.group !== void 0 && X.group !== xt.group,
          idle: !!Q && X.field?.toLowerCase() === Q
        };
      });
    }), M = To({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: p(() => [...y.value, ...s.terms.value])
    });
    function R(O) {
      return sr(r.value, O)?.scopeLabel ?? O;
    }
    function $(O) {
      return O.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function S(O) {
      const Q = M.nameOf(O);
      return Q ? `${O.negated ? "-" : ""}${R(O.field)}: ${$(Q)}` : O.label;
    }
    function V(O) {
      s.setEntity(O || null);
    }
    const P = W(null);
    function z() {
      s.abandonDraft(), P.value?.blur();
    }
    function E(O) {
      if (s.draft.value) return;
      const Q = k.value.at(-1);
      Q && (O.preventDefault(), s.removeTerm(Q.term));
    }
    function H(O) {
      O.target?.closest("button, select, label, input") || a("toggle");
    }
    const B = W(null), U = W("");
    function ye() {
      const O = B.value;
      if (!O) {
        U.value = "";
        return;
      }
      const Q = O.scrollLeft > 1, X = O.scrollWidth - O.clientWidth - O.scrollLeft > 1;
      U.value = Q && X ? "both" : Q ? "start" : X ? "end" : "";
    }
    let se = null;
    we(
      B,
      (O) => {
        se?.disconnect(), se = null, ye(), !(!O || typeof ResizeObserver > "u") && (se = new ResizeObserver(ye), se.observe(O));
      },
      { flush: "post" }
    ), we(k, ye, { flush: "post" }), Ke(() => se?.disconnect());
    const D = p(() => s.liveQuery.value.page), T = p(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !ya(s.query.value)
    ), j = p(
      () => `${s.counting.value ? "~" : ""}${Ct(s.pageCount.value)}`
    ), ne = p(() => {
      let O = `Page ${Ct(D.value)} of ${j.value}`;
      const Q = s.rows.value.length;
      if (Q) {
        const X = s.offset.value + 1, De = `${s.counting.value ? "~" : ""}${Ct(s.total.value)}`;
        O += ` — rows ${Ct(X)} to ${Ct(X + Q - 1)} of ${De}`;
      }
      return n.pagesNote ? `${O}
${n.pagesNote}` : O;
    }), ue = W(null), Te = p(() => ue.value ?? String(D.value)), He = p(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function Qe(O) {
      O.target.select();
    }
    function Ye(O) {
      const Q = O.target, X = Q.value.replace(/[^0-9]/g, "");
      Q.value !== X && (Q.value = X), ue.value = X;
    }
    function We(O) {
      const Q = O.target, X = Number(ue.value);
      ue.value = null;
      const De = Number.isFinite(X) && X >= 1 ? Math.min(Math.trunc(X), Math.max(1, s.pageCount.value)) : D.value;
      Q.value = String(De), De !== D.value && s.setPage(De);
    }
    function Ue(O) {
      const Q = O.target;
      ue.value = null, Q.value = String(D.value), Q.blur();
    }
    return (O, Q) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      x("div", {
        class: "dc-header__trigger",
        onClick: H
      }, [
        x("span", Lo, F(r.value.label), 1),
        y.value.length ? (f(), m("span", Ro, [
          Q[5] || (Q[5] = x("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(ae, null, he(y.value, (X) => (f(), m("span", {
            key: `scope:${X.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: S(X)
          }, F(S(X)), 9, Io))), 128))
        ])) : I("", !0),
        x("div", {
          ref_key: "termBar",
          ref: B,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": U.value,
          title: A(s).summary.value,
          onScroll: ye
        }, [
          b.value ? (f(), te(ms, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": A(s).query.value.entity ?? "",
            options: h.value,
            onOpen: A(l).refresh,
            onClose: A(l).cancel,
            "onUpdate:modelValue": V
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : I("", !0),
          ie(ms, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": w.value,
            options: g.value,
            "onUpdate:modelValue": C
          }, null, 8, ["model-value", "options"]),
          (f(!0), m(ae, null, he(k.value, (X) => (f(), m(ae, {
            key: X.term.id
          }, [
            X.or ? (f(), m("span", No, "or")) : I("", !0),
            x("button", {
              type: "button",
              class: ut(["dc-term dc-mono", { "dc-term--idle": X.idle }]),
              title: X.idle ? `Not applied to ${A(s).entity.value?.label} — remove ${S(X.term)}` : `Remove ${S(X.term)}`,
              "aria-label": `Remove ${S(X.term)}`,
              onClick: (De) => A(s).removeTerm(X.term)
            }, F(S(X.term)), 11, Do)
          ], 64))), 128)),
          dt(x("input", {
            ref_key: "searchBox",
            ref: P,
            "onUpdate:modelValue": Q[0] || (Q[0] = (X) => A(s).draft.value = X),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Q[1] || (Q[1] = Je(Fe(
                //@ts-ignore
                (...X) => A(s).commitDraft && A(s).commitDraft(...X),
                ["prevent"]
              ), ["enter"])),
              Je(Fe(z, ["prevent"]), ["esc"]),
              Je(E, ["backspace"])
            ]
          }, null, 40, Oo), [
            [$n, A(s).draft.value]
          ])
        ], 40, Fo),
        x("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: Q[2] || (Q[2] = (X) => a("toggle"))
        }, [
          x("span", qo, F(e.expanded ? "▲" : "▼"), 1),
          x("span", Vo, F(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Bo)
      ]),
      T.value ? (f(), m("nav", Ko, [
        x("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: D.value <= 1,
          onClick: Q[3] || (Q[3] = (X) => A(s).setPage(D.value - 1))
        }, [...Q[6] || (Q[6] = [
          x("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Ho),
        x("span", {
          class: "dc-header__page dc-mono",
          title: ne.value
        }, [
          x("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Ee({ width: He.value }),
            value: Te.value,
            onFocus: Qe,
            onInput: Ye,
            onKeydown: [
              Je(Fe(We, ["prevent"]), ["enter"]),
              Je(Fe(Ue, ["prevent"]), ["esc"])
            ],
            onBlur: We
          }, null, 44, Uo),
          x("span", jo, "/ " + F(j.value), 1)
        ], 8, Wo),
        x("span", Go, F(ne.value), 1),
        x("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: D.value >= A(s).pageCount.value,
          onClick: Q[4] || (Q[4] = (X) => A(s).setPage(D.value + 1))
        }, [...Q[7] || (Q[7] = [
          x("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Xo)
      ])) : I("", !0),
      O.$slots.actions ? (f(), m("div", Qo, [
        be(O.$slots, "actions", {}, void 0, !0)
      ])) : I("", !0)
    ], 8, zo));
  }
}), ur = /* @__PURE__ */ fe(Zo, [["__scopeId", "data-v-6e711ad8"]]), Jo = { class: "dc-facet" }, ei = ["id"], ti = { class: "dc-facet__body" }, ni = ["aria-labelledby"], ai = ["aria-pressed", "data-dc-active", "onClick"], si = ["aria-labelledby"], ri = ["aria-label", "placeholder", "onKeydown"], li = ["aria-label", "placeholder", "onKeydown"], oi = ["aria-checked"], ii = { class: "dc-switch__text" }, ci = ["data-dc-active"], ui = /* @__PURE__ */ ce({
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
    const i = W(""), o = W("");
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
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (h, y) => (f(), m("div", Jo, [
      x("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, F(e.facet.label), 9, ei),
      x("div", ti, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), m(ae, null, he(e.facet.options, (g) => (f(), m("button", {
            key: g,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(g),
            "data-dc-active": s.value.has(g) ? "true" : "false",
            onClick: (w) => r(g)
          }, F(g), 9, ai))), 128))
        ], 8, ni)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          dt(x("input", {
            "onUpdate:modelValue": y[0] || (y[0] = (g) => i.value = g),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: Je(Fe(c, ["prevent"]), ["enter"])
          }, null, 40, ri), [
            [$n, i.value]
          ]),
          y[2] || (y[2] = x("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          dt(x("input", {
            "onUpdate:modelValue": y[1] || (y[1] = (g) => o.value = g),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: Je(Fe(c, ["prevent"]), ["enter"])
          }, null, 40, li), [
            [$n, o.value]
          ])
        ], 8, si)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          x("span", ii, F(e.facet.text), 1),
          x("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...y[3] || (y[3] = [
            x("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, ci)
        ], 8, oi)) : I("", !0)
      ])
    ]));
  }
}), dr = /* @__PURE__ */ fe(ui, [["__scopeId", "data-v-36d1334b"]]), di = ["id"], fi = { class: "dc-panel__section dc-panel__rows" }, pi = { class: "dc-panel__row" }, vi = ["for"], hi = ["title", "aria-label", "onClick"], mi = ["id", "placeholder", "onKeydown"], gi = { class: "dc-panel__actions" }, _i = ["disabled"], yi = {
  key: 0,
  class: "dc-panel__section"
}, wi = /* @__PURE__ */ ce({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = en(), s = xe(), r = p(() => Dl(s.query.value.expr)), i = p(() => r.value.parts.map(nn)), o = W(r.value.text), l = W(null);
    we(
      () => r.value.text,
      (b) => {
        o.value = b;
      }
    );
    const c = p(() => o.value !== r.value.text);
    function d() {
      if (c.value) {
        const b = Mn(o.value, s.entity.value);
        s.setExpression(ds(r.value.parts, b));
      }
      n("close");
    }
    function h(b) {
      const { parts: C, text: k } = r.value;
      s.setExpression(ds(C.filter((M, R) => R !== b), k));
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
      onKeydown: C[2] || (C[2] = Je(Fe((k) => n("close"), ["stop"]), ["esc"]))
    }, [
      x("section", fi, [
        x("div", pi, [
          x("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, vi),
          x("div", {
            class: "dc-field",
            onMousedown: C[1] || (C[1] = Fe((k) => l.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(ae, null, he(i.value, (k, M) => (f(), m("button", {
              key: `${M}:${k}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${k}`,
              "aria-label": `Remove ${k}`,
              onClick: (R) => h(M)
            }, F(k), 9, hi))), 128)),
            dt(x("input", {
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
                Je(Fe(d, ["prevent"]), ["enter"]),
                Je(y, ["backspace"])
              ]
            }, null, 40, mi), [
              [$n, o.value]
            ])
          ], 32)
        ]),
        A(s).entity.value ? (f(!0), m(ae, { key: 0 }, he(A(s).entity.value.facets, (k) => (f(), te(dr, {
          key: k.key,
          facet: k,
          value: A(s).query.value.facets[k.key],
          onUpdate: (M) => w(k.key, M)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : I("", !0),
        x("div", gi, [
          x("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          x("button", {
            type: "button",
            class: "dc-button",
            disabled: A(s).isPristine.value && !c.value,
            onClick: g
          }, " Reset ", 8, _i)
        ])
      ]),
      a["panel-section"] ? (f(), m("section", yi, [
        be(b.$slots, "panel-section", {}, void 0, !0)
      ])) : I("", !0)
    ], 40, di));
  }
}), fr = /* @__PURE__ */ fe(wi, [["__scopeId", "data-v-640ae2f5"]]), ki = ["checked", "indeterminate"], pr = /* @__PURE__ */ ce({
  __name: "PageTick",
  setup(e) {
    const t = xe(), n = p(() => t.rows.value.filter((r) => t.isSelected(r)).length), a = p(
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
    }, null, 40, ki));
  }
}), bi = {
  key: 0,
  class: "dc-actions"
}, $i = {
  key: 0,
  class: "dc-actions__select"
}, xi = {
  key: 0,
  class: "dc-actions__all"
}, Ci = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Mi = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Si = { class: "dc-actions__ops" }, Pi = ["disabled"], Ei = ["disabled"], Ai = /* @__PURE__ */ ce({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = xe(), a = p(() => n.entity.value), s = p(() => !ya(n.query.value)), r = p(() => s.value && n.selectable.value), i = p(
      () => ma(n.query.value.view, t.views) === "table"
    ), o = p(
      () => s.value && (r.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), l = p(() => n.selection.value.ids.length), c = p(() => l.value ? `${l.value} selected` : i.value ? "None selected" : "Select all");
    function d(h) {
      return l.value ? `${h} ${l.value}` : h;
    }
    return (h, y) => o.value ? (f(), m("div", bi, [
      r.value ? (f(), m("div", $i, [
        i.value ? (f(), m("span", Mi, F(c.value), 1)) : (f(), m("label", xi, [
          ie(pr),
          x("span", Ci, F(c.value), 1)
        ])),
        l.value ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[0] || (y[0] = (g) => A(n).clearSelection())
        }, " Clear ")) : I("", !0)
      ])) : I("", !0),
      x("div", Si, [
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
        }, F(d(a.value.duplicate)), 9, Pi)) : I("", !0),
        a.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !l.value,
          onClick: y[3] || (y[3] = (g) => A(n).delete())
        }, F(d(a.value.delete)), 9, Ei)) : I("", !0)
      ])
    ])) : I("", !0);
  }
}), vr = /* @__PURE__ */ fe(Ai, [["__scopeId", "data-v-03ff2a91"]]), Ti = ["href"], zi = /* @__PURE__ */ ce({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function s(r) {
      if (n.href && nr(r)) {
        r.stopPropagation();
        return;
      }
      r.preventDefault(), a("press", Ln(r), r);
    }
    return (r, i) => e.href ? (f(), m("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: s
    }, [
      be(r.$slots, "default", {}, void 0, !0)
    ], 8, Ti)) : (f(), m("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: s
    }, [
      be(r.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Ge = /* @__PURE__ */ fe(zi, [["__scopeId", "data-v-2462ef10"]]);
function Li(e, t) {
  if (!e) return null;
  const n = Ve(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Ri(e, t) {
  const n = je(t, "state"), a = je(t, "tint");
  return {
    identity: _n(je(t, "identity"), e),
    reference: _n(je(t, "reference"), e),
    metrics: Ks(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: tn(s, e)
    })),
    state: n ? Ve(n, e) ?? null : null,
    updated: _n(je(t, "updated"), e),
    image: Li(je(t, "image"), e),
    tint: a ? Ve(a, e) ?? null : null
  };
}
function hr(e, t, n, a, s = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: Cl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: bl(t),
    parts: Ri(e, r),
    pinned: a,
    selected: s
  };
}
function kt() {
  const e = xe(), t = p(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return p(
    () => e.rows.value.map(
      (n, a) => hr(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Ii = ["data-dc-status"], Fi = /* @__PURE__ */ ce({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, F(e.status), 9, Ii));
  }
}), an = /* @__PURE__ */ fe(Fi, [["__scopeId", "data-v-23e59fbf"]]), Ni = { key: 1 }, Di = /* @__PURE__ */ ce({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = xe(), a = p(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), s = p(() => t.column.label ?? ""), r = p(() => tn(t.column, t.entry.row)), i = p(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function o(l, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, l);
    }
    return (l, c) => a.value ? (f(), te(Ge, {
      key: 0,
      class: "dc-drill",
      href: i.value,
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: o
    }, {
      default: $e(() => [
        be(l.$slots, "default", {}, () => [
          Ne(F(r.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (f(), m("span", Ni, [
      be(l.$slots, "default", {}, () => [
        Ne(F(r.value), 1)
      ], !0)
    ]));
  }
}), sn = /* @__PURE__ */ fe(Di, [["__scopeId", "data-v-d3e7f4e0"]]), Oi = ["data-dc-active", "aria-pressed", "aria-label"], Bi = /* @__PURE__ */ ce({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = xe();
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
    }, F(e.pinned ? "★" : "☆"), 9, Oi));
  }
}), Ra = /* @__PURE__ */ fe(Bi, [["__scopeId", "data-v-ef63d763"]]), qi = ["src"], Vi = /* @__PURE__ */ ce({
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
    ), (a, s) => e.src.trim() && !n.value ? (f(), m("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (r) => n.value = !0)
    }, null, 40, qi)) : I("", !0);
  }
}), Rn = /* @__PURE__ */ fe(Vi, [["__scopeId", "data-v-afaab300"]]), Ki = ["data-dc-standing", "title", "aria-label"], Hi = /* @__PURE__ */ ce({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = xe(), a = p(() => $a(t.entry.entity, t.entry.row)), s = p(() => er(n.query.value.expr, a.value)), r = p(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function i(o) {
      o.stopPropagation(), n.setExpression(tr(n.query.value.expr, a.value));
    }
    return (o, l) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: r.value,
      "aria-label": r.value,
      onClick: i
    }, F(s.value === "in" ? "+" : "−"), 9, Ki)) : I("", !0);
  }
}), In = /* @__PURE__ */ fe(Hi, [["__scopeId", "data-v-4b8d4166"]]), Wi = /* @__PURE__ */ ce({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = xe(), a = p(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = W(null);
    function r(d) {
      s.value = Ln(d).exclude ? "out" : "in";
    }
    function i(d) {
      r(d), window.addEventListener("keydown", r), window.addEventListener("keyup", r);
    }
    function o() {
      s.value = null, window.removeEventListener("keydown", r), window.removeEventListener("keyup", r);
    }
    Ke(o);
    const l = p(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(d, h) {
      h.stopPropagation(), n.drill(t.entry.row, null, d);
    }
    return (d, h) => a.value ? (f(), te(Ge, {
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
      default: $e(() => [...h[0] || (h[0] = [
        Ne(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : I("", !0);
  }
}), rn = /* @__PURE__ */ fe(Wi, [["__scopeId", "data-v-05d2c233"]]), Ui = ["checked", "aria-label"], bt = /* @__PURE__ */ ce({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = xe();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, r) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Ui));
  }
}), ji = { class: "dc-card__top dc-mono" }, Gi = { class: "dc-card__lead" }, Xi = {
  key: 2,
  class: "dc-card__entity"
}, Qi = { class: "dc-card__top-right" }, Yi = { class: "dc-card__names" }, Zi = { class: "dc-card__primary" }, Ji = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, ec = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, tc = {
  key: 0,
  class: "dc-card__date"
}, nc = /* @__PURE__ */ ce({
  __name: "CardsView",
  setup(e) {
    const t = xe(), n = kt(), a = p(() => t.isEverything.value), s = (i) => i.entity?.card === "picture", r = p(() => n.value.length > 0 && n.value.every(s));
    return (i, o) => (f(), m("div", {
      class: ut(["dc-cards", { "dc-cards--pictures": r.value }])
    }, [
      (f(!0), m(ae, null, he(A(n), (l) => (f(), m("div", {
        key: l.key,
        class: ut(["dc-card", { "dc-card--picture": s(l) }])
      }, [
        x("div", ji, [
          x("span", Gi, [
            A(t).selectable.value ? (f(), te(bt, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : I("", !0),
            s(l) ? I("", !0) : (f(), m(ae, { key: 1 }, [
              Ne(F(l.ordinal), 1)
            ], 64)),
            a.value ? (f(), m("span", Xi, F(l.entityLabel), 1)) : I("", !0)
          ]),
          x("span", Qi, [
            l.parts.state && !s(l) ? (f(), te(an, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : I("", !0),
            ie(In, { entry: l }, null, 8, ["entry"]),
            ie(rn, { entry: l }, null, 8, ["entry"]),
            A(t).pinnable.value ? (f(), te(Ra, {
              key: 1,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : I("", !0)
          ])
        ]),
        ie(Ge, {
          class: "dc-card__open",
          href: A(t).pressHref(l.row),
          onPress: (c) => A(t).activate(l.row, c)
        }, {
          default: $e(() => [
            l.parts.image ? (f(), te(Rn, {
              key: 0,
              class: "dc-card__image",
              src: l.parts.image
            }, null, 8, ["src"])) : I("", !0),
            x("span", Yi, [
              x("span", Zi, F(l.parts.identity), 1),
              s(l) ? I("", !0) : (f(), m("span", Ji, F(l.parts.reference), 1))
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        s(l) ? I("", !0) : (f(), m("div", ec, [
          (f(!0), m(ae, null, he(l.parts.metrics.slice(0, 2), (c) => (f(), te(sn, {
            key: c.column.key ?? c.label,
            entry: l,
            column: c.column
          }, {
            default: $e(() => [
              Ne(F(c.label) + " " + F(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (f(), m("span", tc, F(l.parts.updated), 1)) : I("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), mr = /* @__PURE__ */ fe(nc, [["__scopeId", "data-v-f36c3333"]]), ac = { class: "dc-grid" }, sc = { class: "dc-tile__scrim" }, rc = { class: "dc-tile__top dc-mono" }, lc = { class: "dc-tile__chip" }, oc = { class: "dc-tile__caption" }, ic = { class: "dc-tile__secondary dc-truncate" }, cc = { class: "dc-tile__primary" }, uc = /* @__PURE__ */ ce({
  __name: "GridView",
  setup(e) {
    const t = xe(), n = kt();
    return (a, s) => (f(), m("div", ac, [
      (f(!0), m(ae, null, he(A(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        ie(Ge, {
          class: "dc-tile",
          style: Ee({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          href: A(t).pressHref(r.row),
          onPress: (i) => A(t).activate(r.row, i)
        }, {
          default: $e(() => [
            r.parts.image ? (f(), te(Rn, {
              key: 0,
              class: "dc-tile__image",
              src: r.parts.image
            }, null, 8, ["src"])) : I("", !0),
            x("span", sc, [
              x("span", rc, [
                x("span", lc, F(r.ordinal), 1)
              ]),
              x("span", oc, [
                x("span", ic, F(r.parts.reference), 1),
                x("span", cc, F(r.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        A(t).selectable.value ? (f(), te(bt, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : I("", !0)
      ]))), 128))
    ]));
  }
}), gr = /* @__PURE__ */ fe(uc, [["__scopeId", "data-v-12dd4d94"]]);
function gs(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function jn(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function dc(e) {
  return e > 0 ? e : 1 / 0;
}
function fc(e, t, n) {
  const { width: a, height: s, gap: r = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const i = [];
  let o = [], l = 0, c = 0;
  for (const d of e) {
    const h = t(d), y = Math.max(h.ratio, Number.EPSILON), g = h.height && h.height > 0 ? Math.max(c, h.height) : c, w = jn(g, s), b = gs(l + y, o.length + 1, a, r);
    if (b > w) {
      o.push(d), l += y, c = g;
      continue;
    }
    const C = jn(c, s), k = o.length ? gs(l, o.length, a, r) : 1 / 0;
    k <= dc(c) && k - C < w - b ? (i.push({ items: o, height: k, filled: !0 }), o = [d], l = y, c = h.height && h.height > 0 ? h.height : 0) : (i.push({ items: [...o, d], height: b, filled: !0 }), o = [], l = 0, c = 0);
  }
  return o.length && i.push({ items: o, height: jn(c, s), filled: !1 }), i;
}
const pc = { class: "dc-images" }, vc = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, hc = 240, pn = 8, mc = 1, gc = /* @__PURE__ */ ce({
  __name: "ImagesView",
  setup(e) {
    const t = xe(), n = kt(), a = ts(/* @__PURE__ */ new Map()), s = ts(/* @__PURE__ */ new Set());
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
      return b ? { ratio: b.width / b.height, height: b.height } : { ratio: mc };
    }
    const c = W(null), d = W(0);
    let h = null;
    function y() {
      d.value = c.value?.clientWidth ?? 0;
    }
    zs(() => {
      y(), !(!c.value || typeof ResizeObserver > "u") && (h = new ResizeObserver(y), h.observe(c.value));
    }), Ke(() => {
      h?.disconnect(), h = null;
    });
    const g = p(() => {
      const w = fc(n.value, l, {
        width: d.value,
        height: hc,
        gap: pn
      }), b = [];
      let C = 0;
      for (const k of w) {
        let M = 0;
        for (const R of k.items) {
          const $ = l(R).ratio * k.height, S = o(R), V = S !== void 0 && S.height < k.height;
          b.push({
            entry: R,
            style: {
              top: `${C}px`,
              left: `${M}px`,
              width: `${$}px`,
              height: `${k.height}px`
            },
            picture: V ? { width: `${S.width}px`, height: `${S.height}px` } : { width: "100%", height: "100%" }
          }), M += $ + pn;
        }
        C += k.height + pn;
      }
      return { boxes: b, height: w.length ? C - pn : 0 };
    });
    return (w, b) => (f(), m("div", pc, [
      x("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Ee({ height: `${g.value.height}px` })
      }, [
        (f(!0), m(ae, null, he(g.value.boxes, ({ entry: C, style: k, picture: M }) => (f(), m("div", {
          key: C.key,
          class: "dc-images__cell",
          style: Ee(k)
        }, [
          ie(Ge, {
            class: "dc-images__open",
            title: C.parts.identity,
            "aria-label": C.parts.identity,
            href: A(t).pressHref(C.row),
            onPress: (R) => A(t).activate(C.row, R)
          }, {
            default: $e(() => [
              i(C) ? (f(), te(Rn, {
                key: 0,
                class: "dc-images__picture",
                style: Ee(M),
                src: i(C),
                onLoad: (R) => r(i(C), R),
                onError: (R) => s.add(i(C))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), m("span", vc, F(C.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          A(t).selectable.value ? (f(), te(bt, {
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
}), _r = /* @__PURE__ */ fe(gc, [["__scopeId", "data-v-d77205b8"]]), _c = { class: "dc-links" }, yc = { class: "dc-link__primary dc-truncate" }, wc = { class: "dc-link__secondary dc-mono dc-truncate" }, kc = /* @__PURE__ */ ce({
  __name: "LinksView",
  setup(e) {
    const t = xe(), n = kt();
    return (a, s) => (f(), m("div", _c, [
      (f(!0), m(ae, null, he(A(n), (r) => (f(), m("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        A(t).selectable.value ? (f(), te(bt, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : I("", !0),
        ie(Ge, {
          class: "dc-link",
          href: A(t).pressHref(r.row),
          onPress: (i) => A(t).activate(r.row, i)
        }, {
          default: $e(() => [
            x("span", yc, F(r.parts.identity), 1),
            x("span", wc, F(r.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), yr = /* @__PURE__ */ fe(kc, [["__scopeId", "data-v-f47b75cf"]]), bc = {
  class: "dc-list",
  role: "list"
}, $c = { class: "dc-list__ordinal dc-mono" }, xc = { class: "dc-list__identity" }, Cc = { class: "dc-list__primary dc-truncate" }, Mc = { class: "dc-list__secondary dc-mono dc-truncate" }, Sc = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Pc = { class: "dc-list__metrics dc-mono" }, Ec = { class: "dc-list__trailing" }, Ac = /* @__PURE__ */ ce({
  __name: "ListView",
  setup(e) {
    const t = xe(), n = kt(), a = p(() => t.isEverything.value);
    return (s, r) => (f(), m("div", bc, [
      (f(!0), m(ae, null, he(A(n), (i) => (f(), m("div", {
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
        }, null, 8, ["row", "selected", "name"])) : I("", !0),
        ie(Ge, {
          class: "dc-list__open",
          href: A(t).pressHref(i.row),
          onPress: (o) => A(t).activate(i.row, o)
        }, {
          default: $e(() => [
            x("span", $c, F(i.ordinal), 1),
            x("span", xc, [
              x("span", Cc, F(i.parts.identity), 1),
              x("span", Mc, F(i.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (f(), m("span", Sc, F(i.entityLabel), 1)) : I("", !0),
        x("span", Pc, [
          (f(!0), m(ae, null, he(i.parts.metrics.slice(0, 2), (o) => (f(), te(sn, {
            key: o.column.key ?? o.label,
            entry: i,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        x("span", Ec, [
          i.parts.state ? (f(), te(an, {
            key: 0,
            status: i.parts.state
          }, null, 8, ["status"])) : I("", !0),
          ie(In, { entry: i }, null, 8, ["entry"]),
          ie(rn, { entry: i }, null, 8, ["entry"]),
          A(t).pinnable.value ? (f(), te(Ra, {
            key: 1,
            row: i.row,
            name: i.parts.identity,
            pinned: i.pinned
          }, null, 8, ["row", "name", "pinned"])) : I("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ra = /* @__PURE__ */ fe(Ac, [["__scopeId", "data-v-54b2de15"]]), Tc = { class: "dc-preview" }, zc = { class: "dc-preview__pager dc-mono" }, Lc = ["disabled"], Rc = { "aria-live": "polite" }, Ic = ["disabled"], Fc = {
  key: 0,
  class: "dc-preview__card"
}, Nc = ["src"], Dc = { class: "dc-preview__body" }, Oc = { class: "dc-preview__top" }, Bc = { class: "dc-preview__badges" }, qc = { class: "dc-preview__entity dc-mono" }, Vc = { class: "dc-preview__marks" }, Kc = { class: "dc-preview__primary" }, Hc = { class: "dc-preview__secondary dc-mono" }, Wc = { class: "dc-preview__fields" }, Uc = { class: "dc-preview__key" }, jc = { class: "dc-preview__value dc-mono" }, Gc = /* @__PURE__ */ ce({
  __name: "PreviewView",
  setup(e) {
    const t = xe(), n = kt(), a = W(0);
    we(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = p(() => n.value[a.value]), r = p(() => {
      const l = s.value;
      if (!l) return [];
      const c = je(l.columns, "reference"), d = je(l.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: l.parts.reference, column: null }] : [],
        ...l.parts.metrics.map((h) => ({
          key: h.label,
          value: h.text,
          column: h.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: l.parts.updated, column: null }] : []
      ];
    }), i = p(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${l}`;
    }), o = (l) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + l)));
    };
    return (l, c) => (f(), m("div", Tc, [
      x("div", zc, [
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => o(-1))
        }, " ‹ ", 8, Lc),
        x("span", Rc, F(i.value), 1),
        x("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= A(n).length - 1,
          onClick: c[1] || (c[1] = (d) => o(1))
        }, " › ", 8, Ic)
      ]),
      s.value ? (f(), m("div", Fc, [
        x("div", {
          class: "dc-preview__media",
          style: Ee({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), m("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Nc)) : (f(), m(ae, { key: 1 }, [
            Ne(" preview ")
          ], 64))
        ], 4),
        x("div", Dc, [
          x("div", Oc, [
            x("span", Bc, [
              A(t).selectable.value ? (f(), te(bt, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : I("", !0),
              s.value.parts.state ? (f(), te(an, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : I("", !0),
              x("span", qc, F(s.value.entityLabel), 1)
            ]),
            x("span", Vc, [
              ie(In, { entry: s.value }, null, 8, ["entry"]),
              ie(rn, { entry: s.value }, null, 8, ["entry"]),
              A(t).pinnable.value ? (f(), te(Ra, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : I("", !0)
            ])
          ]),
          x("div", null, [
            x("div", Kc, F(s.value.parts.identity), 1),
            x("div", Hc, F(s.value.parts.reference), 1)
          ]),
          x("dl", Wc, [
            (f(!0), m(ae, null, he(r.value, (d) => (f(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              x("dt", Uc, F(d.key), 1),
              x("dd", jc, [
                d.column && s.value ? (f(), te(sn, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), m(ae, { key: 1 }, [
                  Ne(F(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          ie(Ge, {
            class: "dc-preview__open",
            href: s.value ? A(t).pressHref(s.value.row) : null,
            onPress: c[2] || (c[2] = (d) => s.value && A(t).activate(s.value.row, d))
          }, {
            default: $e(() => [...c[3] || (c[3] = [
              Ne(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : I("", !0)
    ]));
  }
}), wr = /* @__PURE__ */ fe(Gc, [["__scopeId", "data-v-1bc19613"]]);
function Xc() {
  const e = xe();
  return p(() => $l(e.schema.value, e.entity.value));
}
const Qc = {
  key: 5,
  class: "dc-cell__text"
}, Yc = /* @__PURE__ */ ce({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = xe(), a = p(() => t.column.kind ?? "text"), s = p(() => Ve(t.column, t.entry.row)), r = p(
      () => a.value === "ordinal" ? t.entry.ordinal : tn(t.column, t.entry.row)
    ), i = p(() => s.value), o = p(() => t.column.activate === !0 || !!t.column.click), l = p(() => na(t.column)), c = p(() => Hs(t.column, t.entry.row));
    function d(g) {
      o.value && (g.stopPropagation(), h(Ln(g)));
    }
    function h(g) {
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    const y = p(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (g, w) => a.value === "component" && e.column.component ? (f(), te(ha(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), te(an, {
      key: 1,
      status: i.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), te(Rn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Ee({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), te(sn, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), te(Ge, {
      key: 4,
      class: ut(["dc-table__open", { "dc-truncate": l.value }]),
      href: y.value,
      title: c.value,
      onPress: w[0] || (w[0] = (b, C) => {
        C.stopPropagation(), h(b);
      })
    }, {
      default: $e(() => [
        Ne(F(r.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (f(), m("span", Qc, F(r.value), 1));
  }
}), _s = /* @__PURE__ */ fe(Yc, [["__scopeId", "data-v-af24c370"]]), Zc = ["aria-label"], Jc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], eu = /* @__PURE__ */ ce({
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
      (f(!0), m(ae, null, he(s.value, (c) => (f(), m("button", {
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
      }, F(c.sign), 9, Jc))), 128))
    ], 8, Zc));
  }
}), ys = /* @__PURE__ */ fe(eu, [["__scopeId", "data-v-adaa8412"]]), tu = {
  key: 0,
  class: "dc-table__none"
}, nu = { class: "dc-table__detail" }, au = ["data-dc-wrap"], su = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, ru = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, lu = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], ou = ["onClick"], iu = {
  key: 2,
  class: "dc-table__head"
}, cu = ["onClick"], uu = {
  key: 0,
  class: "dc-table__pick"
}, du = {
  key: 1,
  class: "dc-table__standing"
}, fu = ["data-dc-align", "data-dc-hide", "title"], pu = {
  key: 0,
  class: "dc-table__name"
}, vu = /* @__PURE__ */ ce({
  __name: "TableView",
  setup(e) {
    const t = xe(), n = kt(), a = Xc();
    function s(E, H) {
      const B = t.pressHref(E);
      if (B && nr(H)) {
        const U = H.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(B, "_blank", U);
        return;
      }
      t.activate(E, Ln(H));
    }
    function r(E) {
      const H = Ll(E, t.entity.value), B = H ? `Shortcut: ${H}` : void 0;
      return [E.hint, B].filter(Boolean).join(`
`) || void 0;
    }
    const i = p(
      () => a.value.find((E) => E.scope)
    ), o = p(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((E) => E.scope)
    ), l = (E) => $a(E.entity, E.row), c = (E) => er(t.query.value.expr, l(E));
    function d(E, H) {
      t.setExpression(vs(t.query.value.expr, l(E), H));
    }
    const h = p(() => {
      const E = n.value.filter((B) => l(B) !== null), H = E.filter((B) => B.selected);
      return H.length ? H : E;
    }), y = p(() => h.value.some((E) => E.selected)), g = p(() => {
      const E = h.value[0];
      return E ? c(E) : null;
    }), w = p(
      () => h.value.some((E) => c(E) !== g.value)
    ), b = p(
      () => y.value ? "the ticked rows" : "every row on this page"
    );
    function C(E) {
      t.setExpression(
        h.value.reduce(
          (H, B) => vs(H, l(B), E),
          t.query.value.expr
        )
      );
    }
    const k = p(
      () => a.value.some((E) => E.kind === "image" || E.height !== void 0)
    );
    function M(E) {
      E && (t.query.value.sort === E ? t.toggleDirection() : t.setSort(E));
    }
    const R = p(() => t.entity.value?.label ?? "The result set"), $ = p(() => new Set(t.sorts.value.map((E) => E.key))), S = (E) => E.sort !== void 0 && $.value.has(E.sort), V = (E) => {
      if (S(E))
        return t.query.value.sort !== E.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function P(E) {
      return [
        rs(E),
        E.muted ? "dc-table__muted" : "",
        E.mono ? "dc-mono" : "",
        na(E) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function z(E, H) {
      if (!(!na(E) || E.activate || E.click))
        return Hs(E, H.row);
    }
    return (E, H) => A(a).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": k.value ? "" : void 0
    }, [
      x("thead", null, [
        x("tr", null, [
          A(t).selectable.value ? (f(), m("th", su, [
            ie(pr)
          ])) : I("", !0),
          o.value ? (f(), m("th", ru, [
            h.value.length ? (f(), te(ys, {
              key: 0,
              standing: g.value,
              mixed: w.value,
              name: b.value,
              onSet: C
            }, null, 8, ["standing", "mixed", "name"])) : I("", !0)
          ])) : I("", !0),
          (f(!0), m(ae, null, he(A(a), (B, U) => (f(), m("th", {
            key: A(as)(B, U),
            scope: "col",
            class: ut(A(rs)(B)),
            style: Ee({ width: B.width }),
            "data-dc-align": A(ss)(B),
            "data-dc-hide": B.hideBelow,
            "aria-sort": V(B),
            title: r(B)
          }, [
            S(B) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (ye) => M(B.sort)
            }, F(B.label), 9, ou)) : (f(), m(ae, { key: 1 }, [
              Ne(F(B.label), 1)
            ], 64)),
            B.header ? (f(), m("span", iu, [
              (f(), te(ha(B.header), {
                column: B,
                entity: A(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : I("", !0)
          ], 14, lu))), 128))
        ])
      ]),
      x("tbody", null, [
        (f(!0), m(ae, null, he(A(n), (B) => (f(), m("tr", {
          key: B.key,
          class: "dc-table__row",
          onClick: (U) => s(B.row, U)
        }, [
          A(t).selectable.value ? (f(), m("td", uu, [
            ie(bt, {
              row: B.row,
              selected: B.selected,
              name: B.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : I("", !0),
          o.value ? (f(), m("td", du, [
            l(B) !== null ? (f(), te(ys, {
              key: 0,
              standing: c(B),
              name: B.parts.identity,
              onSet: (U) => d(B, U)
            }, null, 8, ["standing", "name", "onSet"])) : I("", !0)
          ])) : I("", !0),
          (f(!0), m(ae, null, he(A(a), (U, ye) => (f(), m("td", {
            key: A(as)(U, ye),
            class: ut(P(U)),
            "data-dc-align": A(ss)(U),
            "data-dc-hide": U.hideBelow,
            title: z(U, B)
          }, [
            U === i.value ? (f(), m("span", pu, [
              ie(_s, {
                column: U,
                entry: B
              }, null, 8, ["column", "entry"]),
              ie(rn, { entry: B }, null, 8, ["entry"])
            ])) : (f(), te(_s, {
              key: 1,
              column: U,
              entry: B
            }, null, 8, ["column", "entry"]))
          ], 10, fu))), 128))
        ], 8, cu))), 128))
      ])
    ], 8, au)) : (f(), m("p", tu, [
      H[2] || (H[2] = x("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      x("span", nu, [
        Ne(F(R.value) + " has no ", 1),
        H[0] || (H[0] = x("code", null, "columns", -1)),
        H[1] || (H[1] = Ne(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), kr = /* @__PURE__ */ fe(vu, [["__scopeId", "data-v-a4e80859"]]);
function hu(e) {
  const t = yt([]), n = W(!1), a = yt(null);
  let s = 0;
  const r = (l, c, d, h, y) => ({
    entity: l,
    rows: e.limit.value > 0 ? c.rows.map((g, w) => hr(g, w, l, e.isPinned(g.id))) : [],
    total: c.total,
    count: d ? l.count : String(c.total),
    pinned: mu(h, c, y)
  }), i = () => {
    const l = ++s, c = e.query.value, d = e.schema.value, h = e.entities.value, y = e.limit.value, g = e.within?.value.trim() ?? "", w = _a(c) && !g, b = g ? ba(g, c.expr) : c.expr, C = h.map((k) => ({
      entity: k,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: k.key, expr: b, facets: Nt(k), page: 1 },
        schema: d,
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
        ({ entity: k, outcome: M }) => r(k, M, w, d, b)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(C.map(({ outcome: k }) => Promise.resolve(k))).then((k) => {
      l === s && (t.value = k.map(
        (M, R) => r(C[R].entity, M, w, d, b)
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
function mu(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const r = Wt(e, a);
  return !!r && xa(s, r) === s;
}
const gu = ["data-dc-pending", "data-dc-heads-only"], _u = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, yu = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, wu = {
  key: 2,
  class: "dc-types__state"
}, ku = ["data-dc-empty"], bu = { class: "dc-type__name" }, $u = { class: "dc-type__count dc-mono" }, xu = { class: "dc-type__sr" }, Cu = {
  key: 0,
  class: "dc-type__empty"
}, Mu = { class: "dc-type__identity" }, Su = { class: "dc-type__primary dc-truncate" }, Pu = { class: "dc-type__secondary dc-mono dc-truncate" }, Eu = { class: "dc-type__trailing dc-mono" }, Au = { class: "dc-type__metric-value" }, Tu = { class: "dc-type__metric-label" }, zu = {
  key: 0,
  class: "dc-type__date"
}, Lu = ["onClick"], Ru = /* @__PURE__ */ ce({
  __name: "TypeCardsView",
  setup(e) {
    const t = xe(), { previews: n, pending: a, error: s } = hu({
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
      be(l.$slots, "before", {}, void 0, !0),
      A(s) ? (f(), m("p", _u, " Could not load results: " + F(A(s) instanceof Error ? A(s).message : "the data source failed."), 1)) : !o.value.length && A(a) ? (f(), m("p", yu, " Running query… ")) : o.value.length ? I("", !0) : (f(), m("p", wu, F(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(ae, null, he(o.value, (d) => (f(), m("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        ie(Ge, {
          class: "dc-type__head",
          href: A(t).entityHref(d.entity.key),
          onPress: (h) => A(t).setEntity(d.entity.key)
        }, {
          default: $e(() => [
            x("span", bu, F(d.entity.label), 1),
            x("span", $u, F(d.count), 1),
            c[0] || (c[0] = x("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            x("span", xu, "Show only " + F(d.entity.label.toLowerCase()), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        d.total ? I("", !0) : (f(), m("p", Cu, F(r.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(ae, null, he(d.rows, (h) => (f(), m("div", {
          key: h.key,
          class: "dc-type__row"
        }, [
          ie(Ge, {
            class: "dc-type__open",
            href: A(t).pressHref(h.row),
            onPress: (y) => A(t).activate(h.row, y)
          }, {
            default: $e(() => [
              x("span", Mu, [
                x("span", Su, F(h.parts.identity), 1),
                x("span", Pu, F(h.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          x("span", Eu, [
            (f(!0), m(ae, null, he(h.parts.metrics.slice(0, 1), (y) => (f(), te(sn, {
              key: y.column.key ?? y.label,
              class: "dc-type__metric",
              entry: h,
              column: y.column
            }, {
              default: $e(() => [
                x("span", Au, F(y.text), 1),
                x("span", Tu, F(y.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            h.parts.updated ? (f(), m("span", zu, F(h.parts.updated), 1)) : I("", !0),
            ie(In, { entry: h }, null, 8, ["entry"]),
            ie(rn, { entry: h }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !i.value ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (h) => A(t).create(d.entity)
        }, [
          c[1] || (c[1] = x("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ne(" " + F(d.entity.create), 1)
        ], 8, Lu)) : I("", !0)
      ], 8, ku))), 128)),
      be(l.$slots, "after", {}, void 0, !0)
    ], 8, gu));
  }
}), br = /* @__PURE__ */ fe(Ru, [["__scopeId", "data-v-a7148bf3"]]), Iu = ["data-dc-pending"], Fu = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Nu = { class: "dc-results__detail" }, Du = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Ou = {
  key: 3,
  class: "dc-results__state"
}, Bu = { class: "dc-results__detail" }, qu = /* @__PURE__ */ ce({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = xe(), a = en(), s = {
      list: ra,
      cards: mr,
      grid: gr,
      images: _r,
      table: kr,
      links: yr,
      preview: wr
    }, r = p(() => ya(n.query.value)), i = p(() => ma(n.query.value.view, t.views)), o = p(() => s[i.value] ?? ra), l = p(() => n.rows.value.length > 0), c = p(() => n.error.value !== null), d = W(null);
    return we(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (h, y) => (f(), m("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": A(n).pending.value ? "true" : "false"
    }, [
      r.value ? (f(), te(br, { key: 0 }, mn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: $e(() => [
            be(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: $e(() => [
            be(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), m("p", Fu, [
        y[1] || (y[1] = x("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        x("span", Nu, F(A(n).error.value instanceof Error ? A(n).error.value.message : "The data source failed."), 1)
      ])) : !l.value && A(n).pending.value ? (f(), m("p", Du, [...y[2] || (y[2] = [
        x("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : l.value ? (f(), te(ha(o.value), { key: 4 })) : (f(), m("div", Ou, [
        y[3] || (y[3] = x("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        x("span", Bu, F(A(n).summary.value), 1),
        A(n).isPristine.value ? I("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: y[0] || (y[0] = (g) => A(n).clearFilters())
        }, F(A(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Iu));
  }
}), $r = /* @__PURE__ */ fe(qu, [["__scopeId", "data-v-cb9aac50"]]), Vu = ["data-dc-theme"], Ku = ["data-dc-width", "data-dc-align"], Hu = { class: "dc-shell__panel" }, Wu = /* @__PURE__ */ ce({
  __name: "DataShell",
  props: /* @__PURE__ */ xn({
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
  emits: /* @__PURE__ */ xn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Ht(e, "open"), i = Ht(e, "pinned"), o = Ht(e, "selected"), l = en(), c = It(Rs, null), d = a.route || c ? null : vl(), h = a.route ?? c ?? d;
    Ke(() => d?.dispose?.());
    const y = p(() => Yl({ seed: a.schema.key })), g = p(() => a.source ?? y.value), w = io({
      schema: () => a.schema,
      adapter: h,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), b = p(() => a.within?.trim() ?? ""), C = fo({
      query: w.query,
      entity: w.entity,
      setExpression: w.setExpression
    }), k = co({
      source: g,
      query: C.live,
      schema: p(() => a.schema),
      entity: w.entity,
      limit: p(() => a.limit),
      within: b
    });
    we(w.query, (T) => s("query-change", T)), we(
      [k.pageCount, k.pending, w.query, C.drafting],
      () => {
        if (k.pending.value || C.drafting.value) return;
        const T = k.pageCount.value;
        w.query.value.page > T && w.setPage(T, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const M = Tn() ?? "dc-query-panel", R = W(null);
    function $() {
      r.value && (r.value = !1, Ft(() => {
        R.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const S = p(() => new Set(i.value));
    function V(T) {
      const j = new Set(S.value);
      j.has(T.id) ? j.delete(T.id) : j.add(T.id), i.value = [...j], s("toggle-pin", T);
    }
    const P = p(() => {
      if (a.selectable === !0) return !0;
      const T = w.entity.value;
      return !!(T?.duplicate || T?.delete);
    }), z = p(() => new Set(o.value));
    function E(T) {
      const j = new Set(z.value);
      j.has(T.id) ? j.delete(T.id) : j.add(T.id), o.value = [...j];
    }
    function H(T) {
      const j = new Set(z.value);
      for (const ne of k.rows.value)
        T ? j.add(ne.id) : j.delete(ne.id);
      o.value = [...j];
    }
    function B() {
      o.value.length && (o.value = []);
    }
    const U = p(() => ({
      ids: [...o.value],
      rows: k.rows.value.filter((T) => z.value.has(T.id)),
      entity: w.entity.value
    }));
    we(() => w.query.value.entity, B);
    function ye(T, j, ne = {}) {
      const ue = Hn(a.schema, w.query.value, T, ne);
      ne.exclude ? w.narrow(ue, j?.key ?? w.query.value.entity) : C.release(() => w.narrow(ue, j?.key ?? null, j ? void 0 : "cards")), s("drill", T, j, ne);
    }
    const se = Zl({
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
      setPage: (T, j) => {
        C.drafting.value ? C.setPage(T) : w.setPage(T, j);
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
      isPinned: (T) => S.value.has(T.id),
      isPinnedId: (T) => S.value.has(T),
      togglePin: V,
      selectable: P,
      selection: U,
      isSelected: (T) => z.value.has(T.id),
      toggleSelect: E,
      selectPage: H,
      clearSelection: B,
      narrowsOnPress: p(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (T, j = {}) => {
        if (a.rowPress === "narrow" && Wt(a.schema, T)) {
          ye(T, null, j);
          return;
        }
        s("activate", T);
      },
      pressHref: (T) => a.rowPress === "narrow" && Wt(a.schema, T) ? w.narrowHref(Hn(a.schema, w.query.value, T), null, "cards") : null,
      drillHref: (T, j) => Wt(a.schema, T) ? w.narrowHref(
        Hn(a.schema, w.query.value, T),
        j?.key ?? null,
        j ? void 0 : "cards"
      ) : null,
      create: (T) => s("create", T),
      duplicate: () => s("duplicate", U.value),
      delete: () => s("delete", U.value),
      drill: ye
    }), D = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: w.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: $
    }), (T, j) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Ee(D.value)
    }, [
      x("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ie(ur, {
          ref_key: "headerRef",
          ref: R,
          expanded: r.value,
          "panel-id": A(M),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: j[0] || (j[0] = (ne) => r.value = !r.value)
        }, mn({ _: 2 }, [
          l.actions ? {
            name: "actions",
            fn: $e(() => [
              be(T.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        r.value ? (f(), m(ae, { key: 0 }, [
          x("div", {
            class: "dc-shell__scrim",
            onClick: $
          }),
          x("div", Hu, [
            ie(fr, {
              "panel-id": A(M),
              onClose: $
            }, mn({ _: 2 }, [
              l["panel-section"] ? {
                name: "panel-section",
                fn: $e(() => [
                  be(T.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : I("", !0)
      ], 8, Ku),
      ie(vr, { views: e.views }, null, 8, ["views"]),
      be(T.$slots, "results", {
        rows: A(se).rows.value,
        total: A(se).total.value,
        offset: A(se).offset.value,
        pageCount: A(se).pageCount.value,
        query: A(se).liveQuery.value,
        pending: A(se).pending.value
      }, () => [
        ie($r, { views: e.views }, mn({ _: 2 }, [
          l["cards-before"] ? {
            name: "cards-before",
            fn: $e(() => [
              be(T.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          l["cards-after"] ? {
            name: "cards-after",
            fn: $e(() => [
              be(T.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Vu));
  }
}), Uu = /* @__PURE__ */ fe(Wu, [["__scopeId", "data-v-5d3841df"]]), ju = ["data-dc-muted", "data-dc-collapsed"], Gu = ["data-dc-collapsible"], Xu = ["aria-expanded", "aria-controls"], Qu = { class: "dc-shell-card__sr" }, Yu = { class: "dc-shell-card__title" }, Zu = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Ju = {
  key: 1,
  class: "dc-shell-card__aside"
}, ed = ["data-dc-flush"], td = /* @__PURE__ */ ce({
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
    const n = e, a = t, s = W(n.defaultCollapsed === !0), r = p(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), i = en();
    function o(P) {
      return l(P?.() ?? []);
    }
    function l(P) {
      return P.some((z) => z.type === dl ? !1 : z.type === fl ? String(z.children ?? "").trim().length > 0 : z.type === ae ? l(z.children ?? []) : !0);
    }
    const c = p(() => !!n.title || d.value || o(i.head)), d = p(() => o(i.aside)), h = p(() => o(i.default)), y = p(() => o(i.foot)), g = p(() => n.collapsible === !0 && c.value), w = p(() => g.value && (n.collapsed ?? s.value));
    function b() {
      const P = !w.value;
      s.value = P, a("update:collapsed", P);
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
    ].join(", "), S = W(null);
    function V(P) {
      if (!g.value) return;
      const z = P.target?.closest($);
      z && S.value?.contains(z) || typeof window < "u" && window.getSelection()?.toString() || b();
    }
    return (P, z) => (f(), m("section", {
      class: "dc-shell-card",
      style: Ee(r.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": w.value ? "true" : "false"
    }, [
      c.value ? (f(), m("header", {
        key: 0,
        ref_key: "head",
        ref: S,
        class: "dc-shell-card__head",
        "data-dc-collapsible": g.value ? "true" : "false",
        onClick: V
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
          x("span", Qu, F(e.title || "Card"), 1)
        ], 8, Xu)) : I("", !0),
        be(P.$slots, "head", {}, () => [
          x("h2", Yu, F(e.title), 1),
          e.count !== void 0 ? (f(), m("span", Zu, F(e.count), 1)) : I("", !0)
        ], !0),
        d.value ? (f(), m("span", Ju, [
          be(P.$slots, "aside", {}, void 0, !0)
        ])) : I("", !0)
      ], 8, Gu)) : I("", !0),
      h.value ? dt((f(), m("div", {
        key: 1,
        id: k,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        be(P.$slots, "default", {}, void 0, !0)
      ], 8, ed)), [
        [Cn, !w.value]
      ]) : I("", !0),
      y.value ? dt((f(), m("footer", {
        key: 2,
        id: M,
        class: "dc-shell-card__foot"
      }, [
        be(P.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [Cn, !w.value]
      ]) : I("", !0)
    ], 12, ju));
  }
}), Qf = /* @__PURE__ */ fe(td, [["__scopeId", "data-v-1caf8572"]]), nd = ["aria-label"], ad = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], sd = /* @__PURE__ */ ce({
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
      (f(!0), m(ae, null, he(e.options, (l, c) => (f(), m("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: ut(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", l.key),
        onKeydown: (d) => r(d, c)
      }, F(l.label), 43, ad))), 128))
    ], 8, nd));
  }
}), rd = /* @__PURE__ */ fe(sd, [["__scopeId", "data-v-63fb5482"]]), ld = ["data-dc-theme", "aria-label"], od = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], id = /* @__PURE__ */ ce({
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
    }), s = t, r = W(null), i = W([]), o = W(null), l = W(null), c = W(!1), d = p(
      () => n.menus.flatMap(($, S) => Ut($) ? [S] : [])
    );
    function h($, S) {
      const V = i.value[$]?.getBoundingClientRect(), P = n.menus[$];
      !V || !P || !Ut(P) || (l.value = { x: V.left, y: V.bottom + 2, mirrorX: V.right }, o.value = $, c.value = S);
    }
    function y($) {
      const S = o.value;
      o.value = null, l.value = null, $ && S !== null && i.value[S]?.focus();
    }
    function g($) {
      o.value === $ ? y(!0) : h($, !1);
    }
    function w($) {
      o.value === null || o.value === $ || h($, !1);
    }
    function b($, S) {
      const V = d.value;
      if (V.length === 0) return null;
      if ($ === null) return S === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const P = V.indexOf($);
      return P === -1 ? V[0] ?? null : V[(P + S + V.length) % V.length] ?? null;
    }
    function C($) {
      const S = $.key;
      if (S === "Escape") {
        if (o.value === null) return;
        $.preventDefault(), y(!0);
        return;
      }
      if (S === "ArrowDown" && o.value === null) {
        const z = k();
        if (z === null) return;
        $.preventDefault(), h(z, !0);
        return;
      }
      if (S !== "ArrowLeft" && S !== "ArrowRight") return;
      const V = o.value ?? k(), P = b(V, S === "ArrowRight" ? 1 : -1);
      P !== null && ($.preventDefault(), o.value !== null ? h(P, !0) : i.value[P]?.focus());
    }
    function k() {
      const $ = i.value.findIndex((S) => S === document.activeElement);
      return $ === -1 ? d.value[0] ?? null : $;
    }
    function M($) {
      const S = $.target;
      !S || r.value?.contains(S) || y(!1);
    }
    we(o, ($) => {
      $ !== null ? window.addEventListener("pointerdown", M, !0) : window.removeEventListener("pointerdown", M, !0);
    }), Ke(() => window.removeEventListener("pointerdown", M, !0));
    function R($) {
      y(!0), $.action?.(), s("choose", $);
    }
    return ($, S) => (f(), m("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Ee(a.value),
      onKeydown: C
    }, [
      (f(!0), m(ae, null, he(e.menus, (V, P) => (f(), m("button", {
        key: V.id ?? V.label ?? P,
        ref_for: !0,
        ref: (z) => {
          z && (i.value[P] = z);
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
        onClick: (z) => g(P),
        onMouseenter: (z) => w(P)
      }, F(V.label), 41, od))), 128)),
      o.value !== null && l.value ? (f(), te(La, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: l.value,
        label: e.menus[o.value]?.label,
        autofocus: c.value,
        onChoose: R,
        onDismiss: S[0] || (S[0] = (V) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : I("", !0)
    ], 44, ld));
  }
}), Yf = /* @__PURE__ */ fe(id, [["__scopeId", "data-v-93dbd2e4"]]), cd = ["aria-label", "aria-expanded", "disabled"], ud = { "aria-hidden": "true" }, dd = /* @__PURE__ */ ce({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = W(null), s = W(null), r = W(null), i = W(!1), o = p(() => r.value !== null);
    function l(w) {
      const b = a.value?.getBoundingClientRect();
      b && (r.value = { x: b.left, y: b.bottom + 4, mirrorX: b.right }, i.value = w);
    }
    function c(w) {
      r.value = null, w && a.value?.focus();
    }
    function d() {
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
    }), Ke(() => window.removeEventListener("pointerdown", y, !0));
    function g(w) {
      c(!0), w.action?.(), n("choose", w);
    }
    return (w, b) => (f(), m(ae, null, [
      x("button", {
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
        x("span", ud, F(e.glyph), 1)
      ], 40, cd),
      r.value ? (f(), te(La, {
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
}), Ia = /* @__PURE__ */ fe(dd, [["__scopeId", "data-v-48f5ada5"]]), Ot = (e) => e.kind === "split", Z = (e) => e.kind === "group", oe = (e) => e.kind === "float", mt = { x: 16, y: 16, w: 360, h: 260 }, Pn = 28, xr = 120, la = 220, Cr = 38, Mt = 6;
function ln(e, t) {
  let n = !1;
  const a = e.frames.map((s, r) => {
    const i = t(s.node, r);
    return i === s.node ? s : (n = !0, { ...s, node: i });
  });
  return n ? { ...e, frames: a } : e;
}
function et(e) {
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
const _e = (e) => typeof e == "string", Fa = (e) => _e(e) ? et(e) : e, on = (e) => _e(e) ? [e] : rt(e), ws = (e) => e.panels.filter(_e), fd = (e) => e.panels.filter((t) => !_e(t)), qe = (e, t) => e.panels.includes(t);
function cn(e, t, n) {
  let a = !1;
  const s = e.panels.map((r) => {
    if (_e(r) || !pe(r, t)) return r;
    const i = n(r);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, panels: s } : e;
}
function Fn(e, t) {
  return { node: e, rect: { ...mt, ...t } };
}
function Na(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Da(e, t) {
  const n = { ...mt, ...t };
  return Na(
    e.map(
      (a, s) => Fn(a, {
        ...n,
        x: n.x + s * Pn,
        y: n.y + s * Pn
      })
    )
  );
}
function Oa(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const Ba = (e, t, n) => Oa("row", e, t, n), Jf = (e, t, n) => Oa("column", e, t, n);
function Ce(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const wt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, ep = (e) => ({ ...e, headless: !0 }), tp = (e) => ({ ...e, fixedView: !0 }), pd = (e) => e === "left" || e === "right" ? "row" : "column";
function rt(e) {
  return Z(e) ? e.panels.flatMap(on) : oe(e) ? e.frames.flatMap((t) => rt(t.node)) : e.children.flatMap(rt);
}
function pe(e, t) {
  return Z(e) ? e.panels.some((n) => _e(n) ? n === t : pe(n, t)) : oe(e) ? e.frames.some((n) => pe(n.node, t)) : e.children.some((n) => pe(n, t));
}
const Mr = (e) => rt(e).length === 0, oa = (e) => !Z(e) && wt(e), ia = (e) => Mr(e) && !oa(e);
function Nn(e) {
  return Ot(e) ? e.children.map((t, n) => ({ node: t, index: n })) : oe(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => _e(t) ? [] : [{ node: t, index: n }]);
}
const qa = (e) => Nn(e).map((t) => t.node);
function $t(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => _e(a) ? a === t : pe(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Sr(e) {
  const t = e.panels[$t(e)];
  return t !== void 0 && _e(t) ? t : "";
}
function Re(e) {
  if (_e(e)) return e;
  if (Z(e)) {
    const n = e.panels[$t(e)];
    return n === void 0 ? "" : Re(n);
  }
  if (oe(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Re(n.node) : "";
  }
  const t = e.children[0];
  return t ? Re(t) : "";
}
function Tt(e, t) {
  if (Z(e) && qe(e, t)) return e;
  for (const n of qa(e)) {
    const a = Tt(n, t);
    if (a) return a;
  }
  return null;
}
function vd(e) {
  const t = qa(e).flatMap(vd);
  return Z(e) ? [e, ...t] : t;
}
function Pe(e, t) {
  if (Z(e)) {
    for (const n of fd(e)) {
      const a = Pe(n, t);
      if (a) return a;
    }
    return null;
  }
  if (oe(e)) {
    for (const n of e.frames)
      if (pe(n.node, t))
        return Pe(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Pe(n, t);
    if (a) return a;
  }
  return null;
}
function Gn(e, t, n = xr) {
  const a = (o, l) => l > 0 ? Math.max(Math.min(o, l), Math.min(n, l)) : Math.max(o, n), s = a(e.w, t.w), r = a(e.h, t.h), i = (o, l, c) => Math.min(Math.max(o, 0), Math.max(c - l, 0));
  return {
    x: Math.round(i(e.x, s, t.w)),
    y: Math.round(i(e.y, r, t.h)),
    w: Math.round(s),
    h: Math.round(r)
  };
}
function ks(e, t, n, a, s = xr) {
  let { x: r, y: i, w: o, h: l } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + a), t.includes("n") && (l = e.h - a, i = e.y + a), o < s && (t.includes("w") && (r = e.x + e.w - s), o = s), l < s && (t.includes("n") && (i = e.y + e.h - s), l = s), { x: r, y: i, w: o, h: l };
}
const Pr = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function zt(e, t, n) {
  if (Z(e)) return cn(e, t, (r) => zt(r, t, n));
  if (oe(e)) {
    let r = !1;
    const i = e.frames.map((o) => {
      if (!pe(o.node, t)) return o;
      if (Pe(o.node, t)) {
        const c = zt(o.node, t, n);
        return c === o.node ? o : (r = !0, { ...o, node: c });
      }
      const l = n(o);
      return l === o ? o : (r = !0, l);
    });
    return r ? { ...e, frames: i } : e;
  }
  if (!pe(e, t)) return e;
  let a = !1;
  const s = e.children.map((r) => {
    const i = zt(r, t, n);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, children: s } : e;
}
function hd(e, t, n) {
  return zt(e, t, (a) => Pr(a.rect, n) ? a : { ...a, rect: n });
}
const ot = (e) => e.maximized === !0, Er = (e) => (t) => {
  if (ot(t) === e) return t;
  if (e) {
    const { minimized: s, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function md(e, t, n = !0) {
  return zt(e, t, Er(n));
}
function np(e, t) {
  const n = Pe(e, t);
  return n ? md(e, t, !ot(n)) : e;
}
const ht = (e) => e.minimized === !0, Ar = (e) => (t) => {
  if (ht(t) === e) return t;
  if (e) {
    const { maximized: s, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function gd(e, t, n = !0) {
  return zt(e, t, Ar(n));
}
function ap(e, t) {
  const n = Pe(e, t);
  return n ? gd(e, t, !ht(n)) : e;
}
function vt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = ct(e, t.slice(0, -1));
  return !a || !oe(a) ? null : a.frames[n] ?? null;
}
function ca(e, t) {
  if (oe(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!pe(a.node, t)) continue;
      const s = ca(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of Nn(e)) {
    if (!pe(n, t)) continue;
    const s = ca(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function Va(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), r = ct(e, s);
  if (!r || !oe(r)) return e;
  const i = r.frames[a];
  if (!i) return e;
  const o = n(i);
  if (o === i) return e;
  const l = [...r.frames];
  return l[a] = o, _t(e, s, { ...r, frames: l });
}
function bs(e, t, n) {
  return Va(
    e,
    t,
    (a) => Pr(a.rect, n) ? a : { ...a, rect: n }
  );
}
function _d(e, t, n = !0) {
  return Va(e, t, Er(n));
}
function yd(e, t, n = !0) {
  return Va(e, t, Ar(n));
}
function jt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (oe(e)) {
    const i = e.frames[n];
    if (!i) return e;
    const o = jt(i.node, a), l = o === i.node ? i : { ...i, node: o };
    if (n === e.frames.length - 1 && l === i) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(l), { ...e, frames: c };
  }
  const s = ct(e, [n]);
  if (!s) return e;
  const r = jt(s, a);
  return r === s ? e : _t(e, [n], r);
}
function wd(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, r) => {
    a && (oe(a) && (n[r] = a.frames.length - 1), a = ct(a, [s]));
  }), n;
}
function yn(e, t, n, a) {
  if (Z(e)) return cn(e, n, (i) => yn(i, t, n, a));
  if (oe(e)) {
    const i = e.frames.findIndex((l) => pe(l.node, n)), o = e.frames[i];
    if (!o) return e;
    if (Pe(o.node, n)) {
      const l = yn(o.node, t, n, a);
      if (l === o.node) return e;
      const c = [...e.frames];
      return c[i] = { ...o, node: l }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, Fn(et(t), a)] };
  }
  if (!pe(e, n)) return e;
  let s = !1;
  const r = e.children.map((i) => {
    const o = yn(i, t, n, a);
    return o !== i && (s = !0), o;
  });
  return s ? { ...e, children: r } : e;
}
function $s(e, t, n, a) {
  if (t === n || !pe(e, t) || !pe(e, n) || !Pe(e, n)) return e;
  const s = gt(e, t);
  if (!s) return e;
  const r = yn(s, t, n, a);
  return r === s ? e : Me(r);
}
function kd(e, t, n) {
  return oe(e) ? { ...e, frames: [...e.frames, Fn(et(t), n)] } : Z(e) ? zr(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, et(t)],
    sizes: [...st(e), 1],
    ...Ce(e)
  };
}
function Tr(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return kd(e, t, a);
  const r = n.slice(1), i = (d, h) => h === s ? Tr(d, t, r, a) : gt(d, t);
  if (oe(e)) {
    const d = e.frames.flatMap((h, y) => {
      const g = i(h.node, y);
      return g ? [g === h.node ? h : { ...h, node: g }] : [];
    });
    return { ...e, frames: d };
  }
  if (Z(e)) {
    const d = $t(e), h = [];
    e.panels.forEach((w, b) => {
      if (_e(w)) {
        w !== t && h.push(w);
        return;
      }
      const C = i(w, b);
      C && h.push(C);
    });
    const g = e.active && h.some((w) => on(w).includes(e.active)) ? e.active : Re(h[d] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...g ? { active: g } : {},
      ...Ce(e)
    };
  }
  const o = st(e), l = [], c = [];
  return e.children.forEach((d, h) => {
    const y = i(d, h);
    y && (l.push(y), c.push(o[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: c, ...Ce(e) };
}
function xs(e, t, n, a) {
  const s = ct(e, n);
  return !s || !Mr(s) || !pe(e, t) ? e : Me(Tr(e, t, n, a));
}
function Xn(e, t) {
  if (Z(e)) return cn(e, t, (s) => Xn(s, t));
  if (oe(e)) {
    const s = e.frames.findIndex((c) => pe(c.node, t)), r = e.frames[s];
    if (!r) return e;
    const i = Xn(r.node, t), o = i === r.node ? r : { ...r, node: i };
    if (s === e.frames.length - 1 && o === r) return e;
    const l = [...e.frames];
    return l.splice(s, 1), l.push(o), { ...e, frames: l };
  }
  if (!pe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = Xn(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Ka(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), s = a.reduce((r, i) => r + i, 0);
  return s <= 0 ? n() : a.map((r) => r / s);
}
const st = (e) => Ka(e.children.length, e.sizes), Xe = (e) => {
  const t = Z(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function Me(e) {
  if (Z(e)) return bd(e);
  if (oe(e)) {
    const o = e.frames.flatMap((l) => {
      const c = Me(l.node);
      return ia(c) ? [] : [c === l.node ? l : { ...l, node: c }];
    });
    return o.length === e.frames.length && o.every((l, c) => l === e.frames[c]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = st(e), n = Xe(e), a = [], s = [], r = [];
  e.children.forEach((o, l) => {
    const c = Me(o), d = t[l] ?? 0;
    if (ia(c)) return;
    if (!n && Ot(c) && c.direction === e.direction && !Xe(c) && !wt(c)) {
      const y = st(c);
      c.children.forEach((g, w) => {
        a.push(g), s.push(d * (y[w] ?? 0));
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
    sizes: Ka(a.length, s),
    ...Ce(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function bd(e) {
  if (e.panels.every(_e)) return e;
  const t = Re(e), n = Xe(e), a = [], s = [];
  e.panels.forEach((o, l) => {
    const c = n?.[l];
    if (_e(o)) {
      a.push(o), c && s.push(c);
      return;
    }
    const d = Me(o);
    if (!ia(d)) {
      if (Z(d) && !wt(d) && !Xe(d)) {
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
  const i = t && a.some((o) => on(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...i ? { active: i } : {},
    ...Ce(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function gt(e, t) {
  if (oe(e)) {
    const i = e.frames.flatMap((o) => {
      const l = gt(o.node, t);
      return l ? [l === o.node ? o : { ...o, node: l }] : [];
    });
    return i.length === 0 && !oa(e) ? null : { ...e, frames: i };
  }
  if (Z(e)) {
    if (!pe(e, t)) return e;
    const i = $t(e), o = [];
    for (const d of e.panels) {
      if (_e(d)) {
        d !== t && o.push(d);
        continue;
      }
      const h = gt(d, t);
      h && o.push(h);
    }
    if (o.length === 0) return null;
    const c = e.active && o.some((d) => on(d).includes(e.active)) ? e.active : Re(o[i] ?? o[o.length - 1]);
    return c ? { kind: "group", panels: o, active: c, ...Ce(e) } : { kind: "group", panels: o, ...Ce(e) };
  }
  const n = st(e), a = [], s = [];
  if (e.children.forEach((i, o) => {
    const l = gt(i, t);
    l && (a.push(l), s.push(n[o] ?? 0));
  }), a.length === 0)
    return oa(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...Ce(e) } : null;
  const r = a[0];
  return a.length === 1 && r && !wt(e) ? r : Me({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...Ce(e)
  });
}
function zr(e, t, n) {
  const a = e.panels.filter((r) => r !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...Ce(e) };
}
function Kt(e, t, n, a, s) {
  const r = (g) => ln(
    g,
    (w) => pe(w, n) ? Kt(w, t, n, a, s) : w
  );
  if (a === "float") return e;
  const i = (g) => cn(g, n, (w) => Kt(w, t, n, a, s));
  if (a === "center")
    return Z(e) ? qe(e, n) ? zr(e, t, s) : i(e) : oe(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (g) => pe(g, n) ? Kt(g, t, n, a, s) : g
      )
    };
  const o = pd(a), l = a === "left" || a === "top", c = (g) => ({
    kind: "split",
    direction: o,
    children: l ? [et(t), g] : [g, et(t)],
    sizes: [0.5, 0.5]
  });
  if (Z(e)) return qe(e, n) ? c(e) : i(e);
  if (oe(e)) return r(e);
  const d = st(e), h = e.children.findIndex(
    (g) => Z(g) && qe(g, n)
  );
  if (h >= 0 && e.direction === o) {
    const g = (d[h] ?? 0) / 2, w = [...e.children], b = [...d];
    return w.splice(l ? h : h + 1, 0, et(t)), b.splice(h, 1, g, g), {
      kind: "split",
      direction: o,
      children: w,
      sizes: b,
      ...Ce(e)
    };
  }
  const y = e.children.map((g) => pe(g, n) ? Z(g) && qe(g, n) ? c(g) : Kt(g, t, n, a) : g);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: d,
    ...Ce(e)
  };
}
function Lt(e, t) {
  if (Z(e)) {
    if (qe(e, t))
      return Sr(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((l) => !_e(l) && pe(l, t)), r = e.panels[s];
    if (r === void 0 || _e(r)) return e;
    const i = Lt(r, t);
    if (i === r && e.active === t) return e;
    const o = [...e.panels];
    return o[s] = i, { ...e, panels: o, active: t };
  }
  if (!pe(e, t)) return e;
  if (oe(e)) return ln(e, (s) => Lt(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const r = Lt(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Gt(e, t, n) {
  if (Z(e)) {
    if (!qe(e, t)) return cn(e, t, (c) => Gt(c, t, n));
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
  return pe(e, t) ? oe(e) ? ln(e, (a) => Gt(a, t, n)) : { ...e, children: e.children.map((a) => Gt(a, t, n)) } : e;
}
function wn(e, t, n) {
  if (t === n) return e;
  if (Z(e)) {
    if (!pe(e, t) && !pe(e, n)) return e;
    const a = (r) => r === t ? n : r === n ? t : r, s = e.panels.map((r) => _e(r) ? a(r) : wn(r, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return oe(e) ? ln(e, (a) => wn(a, t, n)) : { ...e, children: e.children.map((a) => wn(a, t, n)) };
}
function vn(e, t, n, a, s) {
  if (a === "float" || !pe(e, t) || !pe(e, n)) return e;
  const r = Tt(e, t);
  if (a === "center" && r && qe(r, n)) {
    if (s === void 0) return e;
    const o = r.panels.indexOf(t), l = s > o ? s - 1 : s;
    return l === o ? e : Lt(Gt(e, t, l), t);
  }
  if (t === n) return e;
  const i = gt(e, t);
  return i ? Me(Kt(i, t, n, a, s)) : e;
}
function Lr(e, t, n) {
  if (Z(e)) {
    const s = e.panels[t];
    if (s === void 0 || _e(s)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (oe(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const r = [...e.frames];
    return r[t] = { ...s, node: n }, { ...e, frames: r };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function un(e, t, n) {
  const a = Nn(e);
  if (!Z(e) && a.some(({ node: s }) => Z(s) && qe(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: r } of a) {
    if (!pe(s, t)) continue;
    const i = un(s, t, n);
    return i ? Lr(e, r, i) : null;
  }
  return null;
}
function sp(e, t, n) {
  const a = un(
    e,
    t,
    (s) => Ot(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? Me(a) : e;
}
function Rr(e) {
  return oe(e) ? [e] : Xe(e) || wt(e) ? [e] : Z(e) ? [...e.panels] : e.children.flatMap(Rr);
}
function Ir(e, t) {
  if (Z(e)) return e;
  const n = qa(e).map(Rr), a = n.flat(), s = t && a.some((i) => on(i).includes(t)) ? t : void 0, r = $d(e, n);
  return Me({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...Ce(e),
    ...r ? { places: r } : {}
  });
}
function $d(e, t) {
  const n = oe(e) ? e.frames.map(({ node: a, ...s }) => s) : Xe(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function xd(e, t) {
  const n = un(e, t, (a) => Ir(a, t));
  return n ? Me(n) : e;
}
function Ha(e, t, n) {
  if (Z(e) && qe(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Nn(e)) {
    if (!pe(a, t)) continue;
    const r = Ha(a, t, n);
    return r ? Lr(e, s, r) : null;
  }
  return null;
}
function Cs(e, t, n) {
  const a = Ha(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const r = Xe(s);
    return {
      ...Oa(n, s.panels.map(Fa)),
      ...Ce(s),
      ...r ? { places: r } : {}
    };
  });
  return a ? Me(a) : e;
}
function ua(e, t) {
  if (Z(e)) return e;
  if (oe(e)) {
    const s = e.frames.findIndex(
      (o) => Z(o.node) && o.node.panels.includes(t)
    ), r = e.frames[s], i = r && Z(r.node) ? r.node : null;
    if (r && i && i.panels.length > 1) {
      const o = Da(i.panels.map(Fa), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...o, ...e.frames.slice(s + 1)]
      };
    }
    return ln(e, (o) => ua(o, t));
  }
  if (!pe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = ua(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Cd(e, t, n) {
  const a = Tt(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Pe(e, t)?.node === a) {
    const i = ua(e, t);
    return i === e ? e : Me(i);
  }
  const r = Ha(e, t, (i) => ({
    ...Na(Fr(i.panels.map(Fa), Xe(i), n)),
    ...Ce(i)
  }));
  return r ? Me(r) : e;
}
function Fr(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : Da(e, n).frames;
}
function Nr(e, t) {
  return { ...Na(Fr(e.children, Xe(e), t)), ...Ce(e) };
}
function rp(e, t, n) {
  const a = un(
    e,
    t,
    (s) => oe(s) ? s : Nr(s, n)
  );
  return a ? Me(a) : Z(e) && qe(e, t) ? Da([e], n) : e;
}
function Md(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, r) => n(s) - n(r) || a(s) - a(r));
}
function Dr(e, t) {
  const n = Md(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...Ce(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function lp(e, t, n = "row") {
  const a = un(
    e,
    t,
    (s) => oe(s) ? Dr(s, n) : s
  );
  return a ? Me(a) : e;
}
function Or(e) {
  if (oe(e)) return null;
  const t = Z(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || _e(t) || Z(t) && t.panels.length === 1 && _e(t.panels[0]) ? null : t;
}
const Sd = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Pd(e, t) {
  const n = Or(e);
  return n ? t === "inner" ? n : { ...Sd(n), ...Ce(e) } : e;
}
function Dt(e) {
  return e.title ? e.title : Z(e) ? "" : oe(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Xt(e, t) {
  if (Z(e)) {
    const a = e.panels[$t(e)];
    return a === void 0 ? "" : _e(a) ? t(a) ?? a : Dt(a) || Xt(a, t);
  }
  if (e.title) return e.title;
  if (oe(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? Xt(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? Xt(n, t) : "";
}
function ct(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (Ot(n)) n = n.children[a];
    else if (oe(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || _e(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function _t(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (oe(e)) {
    const l = e.frames[a];
    if (!l) return e;
    const c = _t(l.node, s, n);
    if (c === l.node) return e;
    const d = [...e.frames];
    return d[a] = { ...l, node: c }, { ...e, frames: d };
  }
  if (Z(e)) {
    const l = e.panels[a];
    if (l === void 0 || _e(l)) return e;
    const c = _t(l, s, n);
    if (c === l) return e;
    const d = [...e.panels];
    return d[a] = c, { ...e, panels: d };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = _t(r, s, n);
  if (i === r) return e;
  const o = [...e.children];
  return o[a] = i, { ...e, children: o };
}
function kn(e, t, n) {
  if (t.length === 0)
    return Ot(e) ? { ...e, sizes: Ka(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (oe(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const l = kn(o.node, s, n);
    if (l === o.node) return e;
    const c = [...e.frames];
    return c[a] = { ...o, node: l }, { ...e, frames: c };
  }
  if (Z(e)) {
    const o = e.panels[a];
    if (o === void 0 || _e(o)) return e;
    const l = kn(o, s, n);
    if (l === o) return e;
    const c = [...e.panels];
    return c[a] = l, { ...e, panels: c };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = [...e.children];
  return i[a] = kn(r, s, n), { ...e, children: i };
}
function Ms(e, t, n, a = 0.02) {
  const s = e[t], r = e[t + 1];
  if (s === void 0 || r === void 0) return e;
  const i = s + r;
  if (i < a * 2) return e;
  const o = [...e], l = Math.min(Math.max(s + n, a), i - a);
  return o[t] = l, o[t + 1] = i - l, o;
}
function En(e) {
  if (!Z(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !_e(t) ? e : { ...Ba([Ed(e)]), ...Ce(e) };
}
const Ed = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ss(e) {
  return e.length === 0 ? null : Ba(e.map(et));
}
function Ad(e, t) {
  if (!e) return Ss(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const l of rt(e))
    !n.has(l) || a.has(l) ? s.add(l) : a.add(l);
  let r = e;
  for (const l of s)
    r = r ? gt(r, l) : null;
  const i = new Set(r ? rt(r) : []), o = t.filter((l) => !i.has(l));
  if (o.length === 0) return r ? En(Me(r)) : null;
  if (!r) return Ss(o);
  if (oe(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...o.map(
          (c, d) => Fn(et(c), {
            x: mt.x + (l + d) * Pn,
            y: mt.y + (l + d) * Pn
          })
        )
      ]
    };
  }
  return En(Me(Ba([r, ...o.map(et)])));
}
const Wa = Symbol("dc.windowContext");
function Td(e) {
  return va(Wa, e), e;
}
function Dn() {
  const e = It(Wa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const zd = ["data-dc-glyph"], Ld = { class: "dc-glyph__line" }, Rd = ["d"], Id = {
  key: 0,
  class: "dc-glyph__aqua"
}, Fd = ["d"], Nd = /* @__PURE__ */ ce({
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
      x("g", Ld, [
        (f(!0), m(ae, null, he(t[e.kind], (r) => (f(), m("path", {
          key: r,
          d: r
        }, null, 8, Rd))), 128))
      ]),
      n[e.kind] ? (f(), m("g", Id, [
        (f(!0), m(ae, null, he(n[e.kind], (r) => (f(), m("path", {
          key: r,
          d: r
        }, null, 8, Fd))), 128))
      ])) : I("", !0)
    ], 8, zd));
  }
}), Rt = /* @__PURE__ */ fe(Nd, [["__scopeId", "data-v-4d2872c0"]]), Dd = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Od = ["data-dc-movable"], Bd = { class: "dc-float__title dc-truncate" }, qd = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Vd = ["aria-label", "aria-pressed", "data-dc-minimize"], Kd = ["aria-label", "aria-pressed", "data-dc-maximize"], Hd = ["aria-label", "data-dc-close"], Wd = { class: "dc-float__content" }, Ud = ["data-dc-handle", "onPointerdown"], jd = /* @__PURE__ */ ce({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = Dn(), a = p(() => Re(t.frame.node)), s = p(() => n.panelFor(a.value)?.fixed === !0), r = p(() => ot(t.frame)), i = p(() => ht(t.frame)), o = p(() => r.value || i.value), l = p(() => n.resizable.value && !s.value && !o.value), c = p(() => n.movable.value && !s.value && !o.value), d = p(() => {
      const S = rt(t.frame.node);
      return S.length === 1 ? S[0] ?? null : null;
    }), h = p(() => d.value !== null && n.closable(d.value)), y = p(() => t.frame.node.headless === !0), g = p(
      () => !y.value && (!Z(t.frame.node) || i.value)
    ), w = p(
      () => t.frame.title || Dt(t.frame.node) || Xt(t.frame.node, (S) => n.panelFor(S)?.title)
    ), b = p(() => n.spaceMenu(t.path));
    function C(S) {
      S.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, S, "move");
    }
    function k(S) {
      S.target?.closest("button, a, input, select, textarea, label") || (i.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const M = p(() => {
      const S = n.framing.value;
      return S !== null && pe(t.frame.node, S);
    }), R = p(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : i.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${la}px`,
        height: `${Cr}px`
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
    return (S, V) => (f(), m("div", {
      class: "dc-float",
      style: Ee(R.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": i.value ? "true" : "false",
      "data-dc-dragging": M.value ? "true" : "false",
      onPointerdown: V[3] || (V[3] = (P) => A(n).raiseAt(e.path))
    }, [
      g.value ? (f(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: C,
        onDblclick: k
      }, [
        x("span", Bd, F(w.value), 1),
        b.value.length ? (f(), te(Ia, {
          key: 0,
          items: b.value,
          label: `${w.value} menu`
        }, null, 8, ["items", "label"])) : I("", !0),
        !s.value || i.value && h.value && d.value ? (f(), m("div", qd, [
          s.value ? I("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${i.value ? "Unroll" : "Minimize"} ${w.value}`,
            "aria-pressed": i.value,
            "data-dc-minimize": a.value,
            onClick: V[0] || (V[0] = (P) => A(n).toggleMinimizeAt(e.path))
          }, [
            ie(Rt, {
              kind: i.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Vd)),
          s.value ? I("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${w.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": a.value,
            onClick: V[1] || (V[1] = (P) => A(n).toggleMaximizeAt(e.path))
          }, [
            ie(Rt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Kd)),
          i.value && h.value && d.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${w.value}`,
            "data-dc-close": d.value,
            onClick: V[2] || (V[2] = (P) => A(n).close(d.value))
          }, [
            ie(Rt, { kind: "close" })
          ], 8, Hd)) : I("", !0)
        ])) : I("", !0)
      ], 40, Od)) : I("", !0),
      x("div", Wd, [
        be(S.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(ae, null, he(l.value ? $ : [], (P) => (f(), m("span", {
        key: P,
        class: "dc-float__grip",
        "data-dc-handle": P,
        "aria-hidden": "true",
        onPointerdown: Fe((z) => A(n).beginFrameDragAt(e.path, z, P), ["stop"])
      }, null, 40, Ud))), 128))
    ], 44, Dd));
  }
}), Gd = /* @__PURE__ */ fe(jd, [["__scopeId", "data-v-f035684c"]]), Ua = Symbol("dc.paneContext");
function Br(e) {
  return va(Ua, e), e;
}
function op() {
  return It(Ua, null);
}
function ip(e) {
  const t = It(Wa, null), n = It(Ua, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Pt(e)
  );
  return An() && Jt(a), a;
}
const Xd = ["data-dc-panel"], Qd = /* @__PURE__ */ ce({
  __name: "WindowPaneBody",
  props: {
    panel: {},
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Dn();
    Br({ panel: p(() => t.panel) });
    const a = () => {
      const s = n.panelFor(t.panel);
      return s ? n.renderContent(s, n.viewFor(t.panel), t.active) ?? null : null;
    };
    return (s, r) => (f(), m("div", {
      class: "dc-pane__content",
      "data-dc-panel": t.panel
    }, [
      ie(a)
    ], 8, Xd));
  }
}), Yd = /* @__PURE__ */ fe(Qd, [["__scopeId", "data-v-31c655fd"]]), Zd = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Jd = ["data-dc-movable"], ef = ["aria-label", "aria-pressed"], tf = ["data-dc-space-name"], nf = { class: "dc-truncate" }, af = ["aria-label"], sf = {
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
}, pf = ["aria-label", "data-dc-minimize"], vf = ["aria-label", "aria-pressed", "data-dc-maximize"], hf = ["aria-label", "data-dc-close"], mf = ["id", "role", "aria-labelledby"], gf = ["id", "role", "aria-labelledby"], _f = ["data-dc-edge"], yf = /* @__PURE__ */ ce({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = Dn(), a = Tn() ?? "dc-pane", s = p(
      () => t.group.panels.flatMap((K, Y) => {
        if (!_e(K)) {
          const Ae = Dt(K) || Xt(K, (ze) => n.panelFor(ze)?.title);
          return [{ kind: "space", index: Y, id: `space-${Y}`, title: Ae, node: K }];
        }
        const J = n.panelFor(K);
        return J ? [{ kind: "panel", index: Y, id: K, title: J.title, panel: J }] : [];
      })
    ), r = p(() => s.value.length > 1), i = p(() => {
      const K = $t(t.group);
      return s.value.find((Y) => Y.index === K) ?? s.value[0] ?? null;
    }), o = p(() => i.value?.kind === "space" ? i.value.node : null), l = p(() => o.value ? "" : Sr(t.group)), c = p(() => o.value ? null : n.panelFor(l.value)), d = p(() => i.value?.title ?? ""), h = p(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = p(() => [...t.path, i.value?.index ?? 0]), g = p(() => l.value || ws(t.group)[0] || ""), w = p(() => n.viewFor(l.value)), b = p(() => t.group.headless === !0), C = p(() => n.focused.value === l.value), k = p(() => n.dragging.value === l.value), M = p(() => n.moving.value === l.value), R = p(() => n.frameOf(g.value) !== null), $ = p(() => n.panelFor(g.value)?.fixed === !0), S = p(
      () => !o.value && (n.canMove(l.value) || R.value && n.movable.value && !$.value)
    ), V = p(
      () => o.value ? n.spaceMenu(y.value) : n.menuFor(l.value)
    ), P = (K) => n.closable(K);
    Br({ panel: l });
    const z = p(() => n.maximized(g.value)), E = p(
      () => R.value && !$.value || !r.value && !!c.value && P(c.value.id)
    ), H = (K) => `${a}-tab-${K}`, B = p(() => `${a}-body`), U = p(() => {
      const K = n.dropTarget.value;
      return !K || !qe(t.group, K.panel) || K.edge === "float" ? null : K;
    }), ye = p(() => U.value?.index === void 0 ? U.value?.edge ?? null : null), se = p(() => U.value?.index ?? null), D = p(
      () => s.value.flatMap(
        (K) => K.kind === "panel" && (K.id === l.value || K.panel.keepAlive === !0) ? [K.id] : []
      )
    ), T = W(null), j = /* @__PURE__ */ new Map();
    we(
      l,
      (K, Y) => {
        const J = T.value;
        if (!J || (Y && j.set(Y, J.scrollTop), !n.panelFor(K)?.keepAlive || !j.has(K))) return;
        const Ae = j.get(K);
        Ft(() => {
          T.value && (T.value.scrollTop = Ae);
        });
      },
      { flush: "pre" }
    );
    const ne = () => c.value ? n.renderActions(c.value, w.value, C.value) ?? null : null;
    let ue = null;
    function Te(K) {
      const Y = ue !== null && Math.hypot(K.clientX - ue.x, K.clientY - ue.y) >= 4;
      return ue = null, Y;
    }
    const He = (K) => K.kind === "panel" ? K.id : Re(K.node);
    function Qe(K, Y) {
      Y.kind !== "space" && (n.focus(Y.id), ue = { x: K.clientX, y: K.clientY }, n.beginDrag(Y.id, K));
    }
    function Ye(K, Y) {
      if (Te(K)) return;
      const J = He(Y);
      J && n.selectPanel(J);
    }
    function We(K) {
      l.value && n.focus(l.value), !K.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (R.value ? n.beginFrameDrag(g.value, K, "move") : n.beginDrag(l.value, K));
    }
    function Ue(K) {
      ue = { x: K.clientX, y: K.clientY }, n.beginDrag(l.value, K);
    }
    function O(K) {
      Te(K) || n.toggleMoveMode(l.value);
    }
    const Q = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function X(K) {
      if (!M.value) return;
      if (K.key === "Escape") {
        K.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const Y = Q[K.key];
      Y && (K.preventDefault(), R.value ? n.nudgeFrame(l.value, Y, K.shiftKey) : n.nudge(l.value, Y, K.shiftKey));
    }
    function De(K) {
      !R.value || K.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(g.value);
    }
    function Bt(K, Y) {
      K.stopPropagation(), ue = null, n.close(Y);
    }
    function xt(K, Y) {
      const J = s.value.length;
      let Ae = null;
      if (K.key === "ArrowRight" ? Ae = (Y + 1) % J : K.key === "ArrowLeft" ? Ae = (Y - 1 + J) % J : K.key === "Home" ? Ae = 0 : K.key === "End" && (Ae = J - 1), Ae === null) return;
      K.preventDefault();
      const ze = s.value[Ae];
      if (!ze) return;
      const qt = He(ze);
      qt && n.selectPanel(qt);
    }
    return (K, Y) => i.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": A(ws)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": R.value ? "true" : "false",
      "data-dc-maximized": z.value ? "true" : "false",
      "data-dc-headless": b.value ? "true" : "false",
      "data-dc-active": C.value ? "true" : "false",
      "data-dc-dragging": k.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: Y[7] || (Y[7] = (J) => l.value && A(n).focus(l.value))
    }, [
      b.value ? I("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": S.value ? "true" : "false",
        onPointerdown: We,
        onDblclick: De
      }, [
        S.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": M.value,
          onPointerdown: Ue,
          onClick: O,
          onKeydown: X
        }, [...Y[8] || (Y[8] = [
          x("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, ef)) : I("", !0),
        h.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          x("span", nf, F(h.value), 1)
        ], 8, tf)) : I("", !0),
        x("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), m(ae, null, he(s.value, (J, Ae) => (f(), m(ae, {
            key: J.id
          }, [
            se.value === Ae ? (f(), m("span", sf)) : I("", !0),
            x("button", {
              id: H(J.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": J.kind === "panel" ? J.id : void 0,
              "data-dc-space": J.kind === "space" ? J.title : void 0,
              "aria-selected": J.index === i.value.index,
              "aria-controls": B.value,
              tabindex: J.index === i.value.index ? 0 : -1,
              onPointerdown: (ze) => Qe(ze, J),
              onClick: (ze) => Ye(ze, J),
              onKeydown: (ze) => xt(ze, Ae)
            }, [
              x("span", lf, F(J.title), 1),
              J.kind === "panel" && J.panel.subtitle ? (f(), m("span", of, F(J.panel.subtitle), 1)) : I("", !0),
              r.value && J.kind === "panel" && P(J.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${J.title}`,
                "data-dc-close": J.id,
                onPointerdown: Y[0] || (Y[0] = Fe(() => {
                }, ["stop"])),
                onClick: (ze) => Bt(ze, J.id)
              }, [...Y[9] || (Y[9] = [
                x("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, cf)) : I("", !0)
            ], 40, rf)
          ], 64))), 128)),
          se.value === s.value.length ? (f(), m("span", uf)) : I("", !0)
        ], 8, af),
        x("div", df, [
          ie(ne),
          V.value.length ? (f(), te(Ia, {
            key: 0,
            items: V.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : I("", !0)
        ]),
        E.value ? (f(), m("div", ff, [
          R.value && !$.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": g.value,
            onPointerdown: Y[1] || (Y[1] = Fe(() => {
            }, ["stop"])),
            onClick: Y[2] || (Y[2] = (J) => A(n).toggleMinimize(g.value))
          }, [
            ie(Rt, { kind: "minimize" })
          ], 40, pf)) : I("", !0),
          R.value && !$.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${z.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": z.value,
            "data-dc-maximize": g.value,
            onPointerdown: Y[3] || (Y[3] = Fe(() => {
            }, ["stop"])),
            onClick: Y[4] || (Y[4] = (J) => A(n).toggleMaximize(g.value))
          }, [
            ie(Rt, {
              kind: z.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, vf)) : I("", !0),
          !r.value && c.value && P(c.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: Y[5] || (Y[5] = Fe(() => {
            }, ["stop"])),
            onClick: Y[6] || (Y[6] = (J) => A(n).close(c.value.id))
          }, [
            ie(Rt, { kind: "close" })
          ], 40, hf)) : I("", !0)
        ])) : I("", !0)
      ], 40, Jd)),
      o.value ? (f(), m("div", {
        key: 1,
        id: B.value,
        class: "dc-pane__space",
        role: b.value ? void 0 : "tabpanel",
        "aria-labelledby": b.value ? void 0 : H(i.value.id)
      }, [
        be(K.$slots, "space", {
          node: o.value,
          path: y.value
        }, void 0, !0)
      ], 8, mf)) : I("", !0),
      !o.value || D.value.length ? dt((f(), m("div", {
        key: 2,
        id: o.value ? void 0 : B.value,
        ref_key: "body",
        ref: T,
        class: "dc-pane__body",
        role: b.value || o.value ? void 0 : "tabpanel",
        "aria-labelledby": b.value || o.value ? void 0 : H(l.value)
      }, [
        (f(!0), m(ae, null, he(D.value, (J) => dt((f(), te(Yd, {
          key: J,
          panel: J,
          active: J === l.value && C.value
        }, null, 8, ["panel", "active"])), [
          [Cn, J === l.value]
        ])), 128))
      ], 8, gf)), [
        [Cn, !o.value]
      ]) : I("", !0),
      ye.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ye.value,
        "aria-hidden": "true"
      }, null, 8, _f)) : I("", !0)
    ], 40, Zd)) : I("", !0);
  }
}), qr = /* @__PURE__ */ fe(yf, [["__scopeId", "data-v-2c3c5ecf"]]), wf = ["data-dc-space", "data-dc-path", "aria-label"], kf = {
  key: 0,
  class: "dc-space__head"
}, bf = { class: "dc-space__title dc-truncate" }, $f = ["data-dc-direction"], xf = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Cf = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Mf = /* @__PURE__ */ ce({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Dn(), a = W(null), s = p(() => Z(t.node) ? t.node : null), r = p(() => Ot(t.node) ? t.node : null), i = p(() => oe(t.node) ? t.node : null), o = p(
      () => r.value ? r.value.children : i.value?.frames.map((D) => D.node) ?? []
    ), l = p(() => r.value ? st(r.value) : []), c = p(
      () => (i.value?.frames ?? []).map((D, T) => ({
        held: D,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: T,
        key: P(D.node),
        path: [...t.path, T]
      })).sort((D, T) => D.key < T.key ? -1 : D.key > T.key ? 1 : 0)
    ), d = p(() => Dt(t.node)), h = p(() => n.spaceMenu(t.path)), y = p(() => t.node.headless === !0), g = p(() => i.value ? "desktop" : r.value?.direction ?? ""), w = W(null), b = W(0);
    let C = null;
    we(
      w,
      (D) => {
        C?.disconnect(), C = null, !(!D || typeof ResizeObserver > "u") && (b.value = D.clientWidth, C = new ResizeObserver(([T]) => {
          b.value = T?.contentRect.width ?? 0;
        }), C.observe(D));
      },
      { immediate: !0 }
    ), Ke(() => C?.disconnect());
    const k = p(() => {
      const D = Math.max(
        1,
        Math.floor((b.value + Mt) / (la + Mt))
      ), T = /* @__PURE__ */ new Map();
      let j = 0;
      for (const ne of c.value)
        ne.held.minimized === !0 && (T.set(ne.key, {
          x: Mt + j % D * (la + Mt),
          bottom: Mt + Math.floor(j / D) * (Cr + Mt)
        }), j += 1);
      return T;
    }), M = (D) => !!D && D.join("/") === t.path.join("/"), R = p(() => {
      const D = n.dropTarget.value, T = i.value;
      if (!T || !D?.rect || D.edge !== "float") return null;
      if (D.space) return M(D.space) ? D.rect : null;
      const j = Pe(T, D.panel);
      return j && T.frames.includes(j) ? D.rect : null;
    }), $ = p(() => {
      const D = n.dropTarget.value;
      return !!D && !D.rect && M(D.space);
    }), S = p(() => r.value?.direction === "row"), V = p(() => o.value.map((D, T) => [...t.path, T])), P = (D) => [...rt(D)].sort().join("/"), z = (D) => {
      const T = rt(D)[0];
      return (T ? n.panelFor(T)?.title : null) ?? T ?? "panel";
    }, E = (D) => {
      const T = o.value[D], j = o.value[D + 1];
      return !T || !j ? "Resize panels" : `Resize ${z(T)} and ${z(j)}`;
    }, H = (D) => {
      const T = l.value[D] ?? 0, j = l.value[D + 1] ?? 0, ne = T + j;
      return ne > 0 ? Math.round(T / ne * 100) : 50;
    };
    function B() {
      const D = a.value, T = D ? S.value ? D.clientWidth : D.clientHeight : 0;
      return T <= 0 ? 0.05 : Math.min(n.minPanelSize.value / T, 0.4);
    }
    let U = null;
    function ye(D, T) {
      const j = r.value, ne = a.value;
      if (!n.resizable.value || !j || !ne || D.button !== 0) return;
      const ue = S.value ? ne.clientWidth : ne.clientHeight;
      if (ue <= 0) return;
      const Te = S.value ? D.clientX : D.clientY, He = st(j), Qe = Math.min(n.minPanelSize.value / ue, 0.4);
      D.preventDefault();
      const Ye = (O) => {
        const Q = ((S.value ? O.clientX : O.clientY) - Te) / ue;
        n.setSizes(t.path, Ms(He, T, Q, Qe));
      }, We = () => U?.(), Ue = (O) => {
        O.key === "Escape" && (n.setSizes(t.path, He), U?.());
      };
      U = () => {
        window.removeEventListener("pointermove", Ye), window.removeEventListener("pointerup", We), window.removeEventListener("pointercancel", We), window.removeEventListener("keydown", Ue), U = null;
      }, window.addEventListener("pointermove", Ye), window.addEventListener("pointerup", We), window.addEventListener("pointercancel", We), window.addEventListener("keydown", Ue);
    }
    Ke(() => U?.());
    function se(D, T) {
      const j = r.value;
      if (!n.resizable.value || !j) return;
      const ne = S.value ? "ArrowRight" : "ArrowDown", ue = S.value ? "ArrowLeft" : "ArrowUp", Te = D.shiftKey ? 0.1 : 0.02;
      if (D.key !== ne && D.key !== ue) return;
      const He = D.key === ne ? Te : -Te;
      D.preventDefault(), n.setSizes(t.path, Ms(st(j), T, He, B()));
    }
    return (D, T) => {
      const j = Ls("WindowNode", !0);
      return s.value ? (f(), te(qr, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: $e(({ node: ne, path: ue }) => [
          ie(j, {
            node: ne,
            path: ue,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), m("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": g.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !y.value ? (f(), m("header", kf, [
          x("span", bf, F(d.value), 1),
          h.value.length ? (f(), te(Ia, {
            key: 0,
            items: h.value,
            label: `${d.value} menu`
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
            style: Ee({
              left: `${R.value.x}px`,
              top: `${R.value.y}px`,
              width: `${R.value.w}px`,
              height: `${R.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : I("", !0),
          (f(!0), m(ae, null, he(c.value, (ne) => (f(), te(Gd, {
            key: ne.key,
            frame: ne.held,
            path: ne.path,
            order: ne.order,
            place: k.value.get(ne.key) ?? null
          }, {
            default: $e(() => [
              ie(j, {
                node: ne.held.node,
                path: ne.path,
                framed: ne.held.node.kind !== "group"
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
          $.value ? (f(), m("div", xf)) : I("", !0),
          (f(!0), m(ae, null, he(o.value, (ne, ue) => (f(), m(ae, {
            key: P(ne)
          }, [
            x("div", {
              class: "dc-window__cell",
              style: Ee({ flexGrow: l.value[ue] ?? 1 })
            }, [
              ie(j, {
                node: ne,
                path: V.value[ue] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ue < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": S.value ? "vertical" : "horizontal",
              "aria-label": E(ue),
              "aria-valuenow": H(ue),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": A(n).resizable.value ? void 0 : "true",
              tabindex: A(n).resizable.value ? 0 : -1,
              onPointerdown: (Te) => ye(Te, ue),
              onKeydown: (Te) => se(Te, ue)
            }, null, 40, Cf)) : I("", !0)
          ], 64))), 128))
        ], 8, $f)) : I("", !0)
      ], 8, wf));
    };
  }
}), Sf = /* @__PURE__ */ fe(Mf, [["__scopeId", "data-v-fb5b403f"]]), Pf = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Ef = {
  key: 1,
  class: "dc-window__empty"
}, Af = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, hn = 16, Tf = /* @__PURE__ */ ce({
  __name: "WindowFrame",
  props: /* @__PURE__ */ xn({
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
  emits: /* @__PURE__ */ xn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Ht(e, "layout"), i = Ht(e, "views"), o = en(), l = p(() => new Map(a.panels.map((u) => [u.id, u]))), c = p(() => a.panels.map((u) => u.id)), d = p(() => Ad(r.value, c.value)), h = W(null), y = W(null), g = W(null), w = W(!0), b = W(null), C = W(null), k = W(null), M = W(""), R = W(null);
    function $() {
      const u = R.value;
      return u ? [...u.querySelectorAll(".dc-pane[data-dc-panels]")].filter((_) => _.closest(".dc-window") === u).map((_) => ({ panels: (_.dataset.dcPanels ?? "").split(" "), element: _ })) : [];
    }
    function S(u) {
      const v = [];
      let _ = u.closest(".dc-float");
      for (; _; )
        v.unshift(Number(_.dataset.dcOrder ?? 0)), _ = _.parentElement?.closest(".dc-float") ?? null;
      return v;
    }
    function V() {
      return $().map((u) => ({ pane: u, order: S(u.element) })).sort((u, v) => {
        const _ = Math.max(u.order.length, v.order.length);
        for (let L = 0; L < _; L += 1) {
          const N = (u.order[L] ?? -1) - (v.order[L] ?? -1);
          if (N !== 0) return N;
        }
        return 0;
      }).map((u) => u.pane);
    }
    const P = (u) => $().find((v) => v.panels.includes(u)) ?? null;
    function z(u) {
      const v = l.value.get(u);
      if (!v) return "";
      const _ = i.value[u];
      return _ && v.views?.some((L) => L.key === _) ? _ : v.defaultView ?? v.views?.[0]?.key ?? "";
    }
    function E(u, v) {
      i.value = { ...i.value, [u]: v }, s("view-change", { panel: u, view: v });
    }
    const H = p(
      () => a.panels.filter((u) => u.fixed !== !0).length
    );
    function B(u) {
      return !a.movable || H.value < 1 || a.panels.length < 2 ? !1 : l.value.get(u)?.fixed !== !0;
    }
    function U(u, v) {
      const _ = d.value;
      !u || !_ || u === _ || (r.value = u, v && s("panel-move", v));
    }
    function ye(u, v, _) {
      if (u.width <= 0 || u.height <= 0) return "center";
      const L = (v - u.left) / u.width, N = (_ - u.top) / u.height, q = 0.3;
      return L > q && L < 1 - q && N > q && N < 1 - q ? "center" : [
        { edge: "left", distance: L },
        { edge: "right", distance: 1 - L },
        { edge: "top", distance: N },
        { edge: "bottom", distance: 1 - N }
      ].reduce(
        (de, G) => G.distance < de.distance ? G : de
      ).edge;
    }
    function se(u, v) {
      const _ = [...u.querySelectorAll(".dc-tab")], L = _.findIndex((N) => {
        const q = N.getBoundingClientRect();
        return v < q.left + q.width / 2;
      });
      return L === -1 ? _.length : L;
    }
    function D(u, v, _) {
      for (const { panels: L, element: N } of V().reverse()) {
        const q = N.getBoundingClientRect();
        if (u < q.left || u > q.right || v < q.top || v > q.bottom) continue;
        const me = L.find((re) => re !== _), de = N.querySelector(".dc-pane__tabs"), G = de?.getBoundingClientRect();
        if (de && G && v >= G.top && v <= G.bottom)
          return me ? { panel: me, edge: "center", index: se(de, u) } : null;
        const ee = N.querySelector(":scope > .dc-pane__space");
        if (ee) {
          const re = ee.getBoundingClientRect();
          if (u >= re.left && u <= re.right && v >= re.top && v <= re.bottom) continue;
        }
        return me ? { panel: me, edge: ye(q, u, v) } : null;
      }
      return j(u, v, _) ?? Te(u, v);
    }
    function T() {
      const u = R.value;
      return u ? [...u.querySelectorAll(".dc-window__desktop")].filter((v) => v.closest(".dc-window") === u).reverse() : [];
    }
    function j(u, v, _) {
      const L = d.value;
      if (!L) return null;
      for (const N of T()) {
        const q = N.getBoundingClientRect();
        if (u < q.left || u > q.right || v < q.top || v > q.bottom) continue;
        const me = He(N), de = me.flatMap((ve) => ve.panels).find((ve) => ve !== _);
        if (!de && me.length > 0) return null;
        const G = Pe(L, _)?.rect, ee = Gn(
          {
            x: u - q.left - 24,
            y: v - q.top - 12,
            w: G?.w ?? mt.w,
            h: G?.h ?? mt.h
          },
          { w: N.clientWidth, h: N.clientHeight },
          a.minPanelSize
        );
        if (de) return { panel: de, edge: "float", rect: ee };
        const re = ne(N);
        return re ? { panel: "", space: re, edge: "float", rect: ee } : null;
      }
      return null;
    }
    function ne(u) {
      const v = u.closest(".dc-space")?.getAttribute("data-dc-path");
      return v == null ? null : v === "" ? [] : v.split("/").map(Number);
    }
    function ue() {
      const u = R.value;
      return u ? [...u.querySelectorAll(".dc-space")].filter((v) => v.closest(".dc-window") === u).filter((v) => !v.querySelector(".dc-pane")).reverse().flatMap((v) => {
        const _ = ne(v);
        return _ ? [{ element: v, path: _ }] : [];
      }) : [];
    }
    function Te(u, v) {
      for (const { element: _, path: L } of ue()) {
        if (_.dataset.dcSpace === "desktop") continue;
        const N = _.getBoundingClientRect();
        if (!(u < N.left || u > N.right || v < N.top || v > N.bottom))
          return { panel: "", space: L, edge: "center" };
      }
      return null;
    }
    function He(u) {
      return $().filter(
        (v) => v.element.closest(".dc-window__desktop") === u
      );
    }
    let Qe = null;
    const Ye = (u) => u.altKey;
    function We(u, v) {
      if (!B(u) || y.value || C.value || v.button !== 0) return;
      const _ = v.clientX, L = v.clientY;
      let N = !1, q = Ye(v);
      const me = () => {
        const ge = k.value;
        ge && (g.value = q ? j(ge.x, ge.y, u) : D(ge.x, ge.y, u));
      }, de = (ge) => {
        if (!N) {
          if (Math.hypot(ge.clientX - _, ge.clientY - L) < 4) return;
          N = !0, y.value = u, b.value = null;
        }
        q = Ye(ge), w.value = !q, k.value = { x: ge.clientX, y: ge.clientY }, me();
      }, G = (ge) => {
        Ye(ge) !== q && (q = !q, w.value = !q, N && me());
      }, ee = (ge) => {
        Qe?.();
        const le = g.value, Le = d.value;
        if (ge && N && le && Le) {
          const lt = le.space ? xs(Le, u, le.space, le.rect) : le.edge === "float" && le.rect ? $s(Le, u, le.panel, le.rect) : vn(Le, u, le.panel, le.edge, le.index);
          U(lt, {
            panel: u,
            target: le.panel,
            edge: le.edge,
            ...le.space === void 0 ? {} : { space: le.space },
            ...le.index === void 0 ? {} : { index: le.index },
            ...le.rect === void 0 ? {} : { rect: le.rect }
          });
        }
        y.value = null, g.value = null, k.value = null, w.value = !0;
      }, re = () => ee(!0), ve = () => ee(!1), ke = (ge) => {
        if (ge.key === "Escape") {
          ee(!1);
          return;
        }
        G(ge);
      };
      Qe = () => {
        window.removeEventListener("pointermove", de), window.removeEventListener("pointerup", re), window.removeEventListener("pointercancel", ve), window.removeEventListener("keydown", ke), window.removeEventListener("keyup", G), Qe = null;
      }, window.addEventListener("pointermove", de), window.addEventListener("pointerup", re), window.addEventListener("pointercancel", ve), window.addEventListener("keydown", ke), window.addEventListener("keyup", G);
    }
    Ke(() => Qe?.());
    let Ue = null;
    function O(u) {
      const v = R.value;
      return v ? [...v.querySelectorAll(
        `.dc-float[data-dc-path="${u.join("/")}"]`
      )].find((N) => N.closest(".dc-window") === v)?.parentElement ?? null : null;
    }
    function Q(u) {
      const v = d.value;
      return v ? ca(v, u) : null;
    }
    function X(u) {
      const v = d.value;
      if (!v) return;
      const _ = jt(v, u);
      _ !== v && (r.value = _);
    }
    function De(u) {
      const v = Q(u);
      v && X(v);
    }
    function Bt(u) {
      const v = d.value, _ = v ? Pe(v, u) : null;
      return _ !== null && ot(_);
    }
    function xt(u) {
      const v = d.value, _ = v ? Pe(v, u) : null;
      return _ !== null && ht(_);
    }
    function K(u) {
      const v = d.value, _ = v ? vt(v, u) : null;
      return _ ? Re(_.node) : "";
    }
    function Y(u) {
      const v = d.value, _ = v ? vt(v, u) : null;
      if (!v || !_) return;
      const L = Re(_.node);
      if (l.value.get(L)?.fixed === !0) return;
      const N = !ht(_);
      let q = yd(v, u, N);
      q !== v && (N || (q = jt(q, u)), r.value = q, s("frame-minimize", { panel: L, minimized: N }));
    }
    function J(u) {
      const v = Q(u);
      v && Y(v);
    }
    function Ae(u) {
      const v = d.value, _ = v ? vt(v, u) : null;
      if (!v || !_) return;
      const L = Re(_.node);
      if (l.value.get(L)?.fixed === !0) return;
      const N = !ot(_);
      let q = _d(v, u, N);
      q !== v && (N && (q = jt(q, u)), r.value = q, s("frame-maximize", { panel: L, maximized: N }));
    }
    function ze(u) {
      const v = Q(u);
      v && Ae(v);
    }
    function qt(u, v, _) {
      const L = d.value, N = L ? vt(L, u) : null;
      if (!L || !N || v.button !== 0 || y.value || C.value) return;
      const q = Re(N.node);
      if (l.value.get(q)?.fixed === !0 || ot(N) || ht(N) || (_ === "move" ? !a.movable : !a.resizable)) return;
      const me = O(u), de = wd(L, u);
      X(u);
      const G = { w: me?.clientWidth ?? 0, h: me?.clientHeight ?? 0 }, ee = { ...N.rect }, re = v.clientX, ve = v.clientY, ke = a.minPanelSize;
      C.value = q;
      const ge = (Be) => {
        const tt = d.value;
        if (!tt) return;
        const Vt = bs(tt, de, Gn(Be, G, ke));
        Vt !== tt && (r.value = Vt);
      }, le = (Be) => {
        Be.preventDefault();
        const tt = Be.clientX - re, Vt = Be.clientY - ve;
        ge(
          _ === "move" ? { ...ee, x: ee.x + tt, y: ee.y + Vt } : ks(ee, _, tt, Vt, ke)
        );
      }, Le = (Be) => {
        if (Ue?.(), C.value = null, !Be) {
          ge(ee);
          return;
        }
        const tt = d.value ? vt(d.value, de) : null;
        tt && s("frame-change", { panel: K(de), rect: tt.rect });
      }, lt = () => Le(!0), ft = () => Le(!1), pt = (Be) => {
        Be.key === "Escape" && Le(!1);
      };
      Ue = () => {
        window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", lt), window.removeEventListener("pointercancel", ft), window.removeEventListener("keydown", pt), Ue = null;
      }, window.addEventListener("pointermove", le), window.addEventListener("pointerup", lt), window.addEventListener("pointercancel", ft), window.addEventListener("keydown", pt);
    }
    function Ur(u, v, _) {
      const L = Q(u);
      L && qt(L, v, _);
    }
    function jr(u, v, _ = !1) {
      const L = d.value, N = Q(u), q = L && N ? vt(L, N) : null;
      if (!L || !N || !q || l.value.get(u)?.fixed === !0 || (_ ? !a.resizable : !a.movable)) return;
      if (ot(q) || ht(q)) {
        M.value = `${Ze(u)} is ${ot(q) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const me = v === "left" ? -hn : v === "right" ? hn : 0, de = v === "up" ? -hn : v === "down" ? hn : 0, G = O(N), ee = { w: G?.clientWidth ?? 0, h: G?.clientHeight ?? 0 }, re = _ ? ks(q.rect, "se", me, de, a.minPanelSize) : { ...q.rect, x: q.rect.x + me, y: q.rect.y + de }, ve = bs(L, N, Gn(re, ee, a.minPanelSize));
      if (ve === L) {
        M.value = _ ? `${Ze(u)} cannot be resized further.` : `${Ze(u)} cannot move ${v}.`;
        return;
      }
      r.value = ve;
      const ke = vt(ve, N);
      ke && (s("frame-change", { panel: u, rect: ke.rect }), M.value = _ ? `${Ze(u)} resized to ${ke.rect.w} by ${ke.rect.h}.` : `${Ze(u)} moved to ${ke.rect.x}, ${ke.rect.y}.`);
    }
    Ke(() => Ue?.());
    function Gr(u, v) {
      const _ = P(u), L = _?.element.getBoundingClientRect();
      if (!_ || !L) return null;
      const N = v === "left" || v === "right", q = (G) => {
        if (!(N ? G.bottom > L.top + 1 && G.top < L.bottom - 1 : G.right > L.left + 1 && G.left < L.right - 1)) return null;
        const re = v === "left" ? L.left - G.right : v === "right" ? G.left - L.right : v === "up" ? L.top - G.bottom : G.top - L.bottom;
        return re < -1 ? null : re;
      }, me = [];
      for (const G of $()) {
        if (G === _ || G.element === _.element) continue;
        const ee = q(G.element.getBoundingClientRect());
        if (ee === null) continue;
        const re = G.panels.find((ve) => ve !== u);
        re && me.push({ to: { panel: re }, distance: ee });
      }
      for (const { element: G, path: ee } of ue()) {
        const re = q(G.getBoundingClientRect());
        re !== null && me.push({ to: { space: ee }, distance: re });
      }
      return me.reduce(
        (G, ee) => G && G.distance <= ee.distance ? G : ee,
        null
      )?.to ?? null;
    }
    function Xr(u) {
      const v = d.value ? Pe(d.value, u) !== null : !1;
      if (!v && !B(u)) return;
      b.value = b.value === u ? null : u;
      const _ = Ze(u);
      if (!b.value) {
        M.value = `${_}: move mode off.`;
        return;
      }
      M.value = v ? `${_}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${_}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ze = (u) => l.value.get(u)?.title ?? u, Qr = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Yr(u, v, _ = !1) {
      if (!B(u)) return;
      const L = d.value;
      if (!L) return;
      const N = Ze(u), q = Tt(L, u);
      if (!_ && q && (v === "left" || v === "right") && q.panels.length > 1) {
        const ve = q.panels.indexOf(u), ke = v === "left" ? ve - 1 : ve + 1;
        if (ke >= 0 && ke < q.panels.length) {
          U(Gt(L, u, ke), { panel: u, target: u, edge: "center", index: ke }), M.value = `${N} moved ${v}, now tab ${ke + 1} of ${q.panels.length}.`, On(u);
          return;
        }
      }
      const de = Gr(u, v);
      if (!de || de.panel !== void 0 && !B(de.panel)) {
        M.value = `${N} cannot move ${v}.`;
        return;
      }
      const G = Qr[v];
      if (de.space) {
        const ve = de.space, ke = ct(L, ve), ge = Pe(L, u)?.rect, le = { ...mt, ...ge ? { w: ge.w, h: ge.h } : {} };
        U(xs(L, u, ve, le), { panel: u, target: "", space: ve, edge: G }), M.value = `${N} moved ${v}, into ${ke ? Dt(ke) : "the space"}.`, On(u);
        return;
      }
      const ee = de.panel, re = q?.panels.length === 1 && Tt(L, ee)?.panels.length === 1;
      _ ? (U(vn(L, u, ee, "center"), {
        panel: u,
        target: ee,
        edge: "center"
      }), M.value = `${N} joined ${Ze(ee)} as a tab.`) : re ? (U(wn(L, u, ee), { panel: u, target: ee, edge: G }), M.value = `${N} moved ${v}, trading places with ${Ze(ee)}.`) : (U(vn(L, u, ee, G), { panel: u, target: ee, edge: G }), M.value = `${N} moved ${v}, beside ${Ze(ee)}.`), On(u);
    }
    function On(u) {
      Ft(() => {
        P(u)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Zr(u, v) {
      const _ = d.value;
      _ && (r.value = kn(_, u, v));
    }
    function Bn(u) {
      const v = d.value;
      if (!v) return;
      const _ = Lt(v, u);
      _ !== v && (r.value = _, s("tab-select", { panel: u }));
    }
    function Xa(u) {
      return l.value.get(u)?.closable ?? a.closable;
    }
    function Jr(u) {
      Xa(u) && s("panel-close", u);
    }
    const qn = W(/* @__PURE__ */ new Map());
    let el = 0;
    function tl(u, v) {
      const _ = el += 1;
      return qn.value.set(_, { panel: u, items: v }), () => {
        qn.value.delete(_);
      };
    }
    function nl(u) {
      const v = [];
      for (const _ of qn.value.values())
        _.panel() === u && v.push(..._.items());
      return v;
    }
    function Qa(u) {
      const v = u.filter((_) => _.items.length > 0);
      return v.length < 2 ? v.flatMap((_) => _.items) : v.flatMap((_) => [
        { id: _.id, heading: !0, label: _.title },
        ..._.items
      ]);
    }
    const Ya = (u) => u.title || "These tabs";
    function al(u, v) {
      const _ = v.id, L = Tt(u, _), N = (L?.panels.length ?? 0) > 1, q = L?.fixedView === !0, me = (re) => ({
        action: () => {
          re !== u && (r.value = re);
        }
      }), de = [], G = [], ee = v.views ?? [];
      if (ee.length > 1 && !q) {
        const re = z(_);
        de.push({
          id: "view",
          label: "View",
          items: ee.map((ve) => ({
            id: `view-${ve.key}`,
            label: ve.label,
            checked: ve.key === re,
            action: () => E(_, ve.key)
          }))
        });
      }
      return N && !q && G.push(
        { id: "show-row", label: "Row", checked: !1, ...me(Cs(u, _, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...me(Cs(u, _, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...me(xd(u, _))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...me(Cd(u, _))
        }
      ), N && L && (G.length && G.push({ separator: !0 }), G.push(...Za(L, _))), { panel: de, tabs: G, tabsTitle: L ? Ya(L) : "" };
    }
    function Za(u, v) {
      const _ = $t(u), L = (N) => {
        const q = u.panels[(_ + N + u.panels.length) % u.panels.length];
        return (q === void 0 ? "" : Re(q)) || v;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Bn(L(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Bn(L(-1)) }
      ];
    }
    function dn(u) {
      return u.title ? u.title : Z(u) ? u.panels.length > 1 ? "these tabs" : "the strip" : Dt(u);
    }
    function Ja(u) {
      if (!u || oe(u) || u.fixedView === !0 || !u.title && u.headless !== !0 || Xe(u)) return null;
      const v = Or(u);
      return v && v.fixedView !== !0 ? v : null;
    }
    function sl(u) {
      const v = d.value;
      if (!a.menu || !v) return [];
      const _ = ct(v, u);
      if (!_ || Z(_)) return [];
      if (_.fixedView) return [];
      const L = oe(_) ? "desktop" : _.direction, N = (le, Le, lt) => ({
        id: `show-${le}`,
        label: Le,
        checked: L === le,
        action: () => {
          const ft = d.value, pt = lt();
          !ft || pt === _ || (r.value = En(Me(_t(ft, u, pt))));
        }
      }), q = () => {
        const le = Ir(_, rl(_));
        if (Z(le) && le.panels.length === 0) return _;
        const Le = Z(le) && le.panels.length === 1 ? le.panels[0] : void 0;
        return Le !== void 0 && _e(Le) ? _ : le;
      }, me = (le) => () => oe(_) ? Dr(_, le) : _.direction === le ? _ : { ..._, direction: le }, de = u.slice(0, -1), G = u.length > 0 ? ct(v, de) : null, ee = G && Z(G) && G.panels.length > 1 ? G : null, re = G && Ja(G) === _ ? G : null, ve = Ja(_), ke = _.title || "this space", ge = (le, Le, lt, ft, pt) => ({
        id: le,
        label: pt,
        action: () => {
          const Be = d.value;
          Be && (r.value = En(Me(_t(Be, Le, Pd(lt, ft)))));
        }
      });
      return Qa([
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
            N("tabs", "Tabs", () => q()),
            N("desktop", "Desktop", () => oe(_) ? _ : Nr(_))
          ]
        },
        {
          id: "about-around",
          title: ve ? `Around ${dn(ve)}` : "",
          items: ve ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ve.title ? [] : [ge("merge-around-keep-this", u, _, "outer", `Keep ${ke}`)],
            ..._.title ? [] : [ge("merge-around-keep-that", u, _, "inner", `Keep ${dn(ve)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: re ? `Inside ${dn(re)}` : "",
          items: re ? [
            ..._.title ? [] : [ge("merge-inside-keep-that", de, re, "outer", `Keep ${dn(re)}`)],
            ...re.title ? [] : [ge("merge-inside-keep-this", de, re, "inner", `Keep ${ke}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: ee ? Ya(ee) : "",
          items: ee ? Za(ee, Re(_)) : []
        }
      ]);
    }
    function rl(u) {
      const v = h.value;
      return v && pe(u, v) ? v : void 0;
    }
    function ll(u) {
      const v = d.value, _ = l.value.get(u);
      if (!v || !_) return [];
      const L = a.menu ? al(v, _) : null, N = nl(u);
      N.length && L?.panel.length && N.push({ separator: !0 }), L && N.push(...L.panel);
      const q = Qa([
        { id: "about-panel", title: _.title, items: N },
        { id: "about-tabs", title: L?.tabsTitle ?? "", items: L?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(_, q) : q;
    }
    function ol(u, v) {
      return o[`${u}-${v}`] ?? o[u];
    }
    function es(u, v, _, L) {
      return ol(u, v.id)?.({ panel: v, view: _, active: L });
    }
    Td({
      panelFor: (u) => l.value.get(u) ?? null,
      viewFor: z,
      setView: E,
      movable: p(() => a.movable),
      resizable: p(() => a.resizable),
      minPanelSize: p(() => a.minPanelSize),
      spaceNames: p(() => a.spaceNames),
      focused: h,
      dragging: y,
      dropTarget: g,
      moving: b,
      framing: C,
      canMove: B,
      focus(u) {
        h.value !== u && (h.value = u, s("panel-activate", u));
      },
      selectPanel: Bn,
      beginDrag: We,
      toggleMoveMode: Xr,
      nudge: Yr,
      setSizes: Zr,
      frameOf: (u) => d.value ? Pe(d.value, u) : null,
      beginFrameDrag: Ur,
      nudgeFrame: jr,
      raise: De,
      maximized: Bt,
      toggleMaximize: ze,
      minimized: xt,
      toggleMinimize: J,
      beginFrameDragAt: qt,
      raiseAt: X,
      toggleMaximizeAt: Ae,
      toggleMinimizeAt: Y,
      menuFor: ll,
      spaceMenu: sl,
      registerMenu: tl,
      closable: Xa,
      close: Jr,
      renderContent: (u, v, _) => es("panel", u, v, _),
      renderActions: (u, v, _) => es("actions", u, v, _),
      layout: d
    });
    const il = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), cl = () => {
      const u = y.value, v = k.value;
      return !u || !v ? null : pl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${v.x}px`, top: `${v.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(u)?.title ?? u
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(u, v, _, L) {
        const N = d.value;
        N && U(vn(N, u, v, _, L), {
          panel: u,
          target: v,
          edge: _,
          ...L === void 0 ? {} : { index: L }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(u) {
        const v = d.value;
        v && (r.value = Lt(v, u));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(u, v, _) {
        const L = d.value;
        L && U($s(L, u, v, _), {
          panel: u,
          target: v,
          edge: "float",
          rect: _
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(u, v) {
        const _ = d.value;
        if (!_) return;
        const L = hd(_, u, v);
        if (L === _) return;
        r.value = L;
        const N = Pe(L, u);
        N && s("frame-change", { panel: u, rect: N.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: E,
      /** Brings a floating frame to the front of its stack. */
      raise: De,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ze,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: J
    }), (u, v) => (f(), m("div", {
      ref_key: "root",
      ref: R,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": w.value ? "true" : "false",
      style: Ee(il.value)
    }, [
      d.value ? (f(), te(Sf, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", Ef, " This window has no panels. ")),
      ie(cl),
      x("p", Af, F(M.value), 1)
    ], 12, Pf));
  }
}), zf = /* @__PURE__ */ fe(Tf, [["__scopeId", "data-v-711565af"]]), Lf = (e) => Math.round(e * 1e3) / 1e3;
function Qn(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function Rf(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function Yn(e) {
  const t = { b: Rf(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function If(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function da(e) {
  const t = If(e);
  return t !== null ? t : Vr(e);
}
function Vr(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((a) => typeof a == "string" ? a : Vr(a)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(Yn)), Qn(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(da) };
    return e.sizes && (n.z = e.sizes.map(Lf)), e.places && (n.p = e.places.map(Yn)), Qn(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: da(n.node), ...Yn(n) }))
  };
  return Qn(e, t);
}
class Kr extends Error {
}
const Se = () => {
  throw new Kr();
}, fa = (e) => typeof e == "object" && e !== null && !Array.isArray(e), St = (e) => Array.isArray(e) ? e : Se(), ja = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : Se(), Hr = (e) => St(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : Se());
function Ff(e) {
  const [t, n, a, s] = Hr(e);
  return s === void 0 && Se(), { x: t, y: n, w: a, h: s };
}
function Zn(e) {
  if (!fa(e)) return Se();
  const t = { rect: Ff(e.b) }, n = ja(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function Jn(e, t) {
  const n = ja(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function bn(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!fa(e)) return Se();
  if (e.g !== void 0) {
    const n = St(e.g).map((r) => typeof r == "string" ? r : bn(r));
    n.length === 0 && Se();
    const a = { kind: "group", panels: n }, s = ja(e.a);
    return s !== void 0 && (a.active = s), e.p !== void 0 && (a.places = St(e.p).map(Zn)), Jn(e, a);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = St(t === "row" ? e.r : e.c).map(bn), a = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (a.sizes = Hr(e.z)), e.p !== void 0 && (a.places = St(e.p).map(Zn)), Jn(e, a);
  }
  if (e.f !== void 0) {
    const a = { kind: "float", frames: St(e.f).map((s) => !fa(s) || s.n === void 0 ? Se() : { node: bn(s.n), ...Zn(s) }) };
    return Jn(e, a);
  }
  return Se();
}
const Wr = /[ '!:(),*@$]/, Nf = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function Ps(e) {
  return e !== "" && !Wr.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function pa(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? Ps(e) : Array.isArray(e) ? `!(${e.map(pa).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${Ps(t)}:${pa(n)}`).join(",")})`;
}
function Df(e) {
  let t = 0;
  const n = () => e[t], a = (o) => e[t++] === o ? void 0 : Se(), s = () => {
    if (n() === "'") {
      t++;
      let l = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return Se();
        if (c === "'") return l;
        if (c === "!") {
          const d = e[t++];
          d !== "!" && d !== "'" && Se(), l += d;
        } else l += c;
      }
    }
    const o = t;
    for (; t < e.length && !Wr.test(e[t]); ) t++;
    return t === o && Se(), e.slice(o, t);
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
        h !== "," && Se();
      }
    }
    if (o === "!") {
      t++;
      const c = e[t++];
      if (c === "t") return !0;
      if (c === "f") return !1;
      if (c === "n") return null;
      if (c !== "(") return Se();
      const d = [];
      if (n() === ")")
        return t++, d;
      for (; ; ) {
        d.push(r());
        const h = e[t++];
        if (h === ")") return d;
        h !== "," && Se();
      }
    }
    if (o === "'") return s();
    const l = s();
    return Nf.test(l) ? Number(l) : l;
  }, i = r();
  return t !== e.length && Se(), i;
}
function Es(e) {
  return pa(da(e));
}
function Of(e) {
  try {
    return bn(Df(e));
  } catch (t) {
    if (t instanceof Kr) return null;
    throw t;
  }
}
function As(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const a = n.indexOf("="), s = a === -1 ? n : n.slice(0, a);
    if (Ga(s) === t) return a === -1 ? "" : n.slice(a + 1);
  }
  return null;
}
function Bf(e, t, n) {
  const a = e.replace(/^[?]/, "").split("&").filter(Boolean), s = a.findIndex((i) => {
    const o = i.indexOf("=");
    return Ga(o === -1 ? i : i.slice(0, o)) === t;
  }), r = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return s === -1 ? r && a.push(r) : r ? a[s] = r : a.splice(s, 1), a.length ? `?${a.join("&")}` : "";
}
function Ga(e) {
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
  const { adapter: n } = t, a = t.param ?? "w", s = t.delay ?? 200, r = () => Pt(t.home) ?? null;
  let i = As(n.search.value, a), o = null;
  const l = () => {
    o !== null && clearTimeout(o), o = null;
  }, c = (y) => y === null ? r() : Of(Ga(y)) ?? r(), d = () => {
    l();
    const y = e.value, g = r(), w = y ? Es(y) : null, b = w === null || g && w === Es(g) ? null : Vf(w);
    i = b;
    const C = Bf(n.search.value, a, b);
    C !== n.search.value && n.replace(C);
  }, h = c(i);
  return h && (e.value = h), we(e, () => {
    l(), o = setTimeout(d, s);
  }), we(n.search, (y) => {
    const g = As(y, a);
    if (g === i) return;
    l(), i = g;
    const w = c(g);
    w && (e.value = w);
  }), An() && Jt(() => o !== null ? d() : void 0), { flush: () => o !== null ? d() : void 0 };
}
function up(e = "", t = "/") {
  const n = W(Oe(e)), a = W(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    href(r) {
      return `${a.value}${Oe(r)}`;
    },
    push(r) {
      n.value = Oe(r), s.push(`${a.value}${n.value}`);
    },
    replace(r) {
      n.value = Oe(r), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Ts(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return Oe(a === -1 ? n : n.slice(0, a));
}
function dp(e) {
  const t = W(Ts(e.currentRoute.value.fullPath)), n = p(() => e.currentRoute.value.path), a = we(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Ts(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${Oe(s)}`),
    replace: (s) => e.replace(`${n.value}${Oe(s)}`),
    href: (s) => {
      const r = `${n.value}${Oe(s)}`;
      return e.resolve?.(r).href ?? r;
    },
    dispose: a
  };
}
const Kf = {
  DataShell: Uu,
  ShellHeader: ur,
  QueryPanel: fr,
  RecordActions: vr,
  ResultsArea: $r,
  FacetControl: dr,
  SegmentedControl: rd,
  StatusPill: an,
  WindowFrame: zf,
  WindowPane: qr,
  ListView: ra,
  CardsView: mr,
  GridView: gr,
  ImagesView: _r,
  TableView: kr,
  LinksView: yr,
  PreviewView: wr,
  TypeCardsView: br
}, fp = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Kf))
      e.component(`${n}${a}`, s);
    t.route && e.provide(Rs, t.route);
  }
};
export {
  Pn as CASCADE_STEP,
  jf as COLUMN_BREAKPOINTS,
  Uf as COLUMN_ROLES,
  mr as CardsView,
  _s as ColumnCell,
  ml as DEFAULT_ENTITY_VIEW,
  mt as DEFAULT_FRAME,
  ea as DEFAULT_SORT,
  hl as DEFAULT_VIEW,
  uo as DRAFT_DELAY,
  Uu as DataShell,
  ta as EMPTY_CELL,
  lr as ENTITY_ALL,
  Sn as ENTITY_TERM,
  Zt as EXPRESSION_TERM,
  Ta as FACET_PREFIX,
  dr as FacetControl,
  gr as GridView,
  fp as HeaderContentLayoutPlugin,
  _r as ImagesView,
  yr as LinksView,
  ra as ListView,
  Mt as MINIMIZED_GAP,
  Cr as MINIMIZED_HEIGHT,
  la as MINIMIZED_WIDTH,
  xr as MIN_FRAME,
  ps as MOCK_TINTS,
  Yf as MenuBar,
  Ia as MenuButton,
  La as MenuList,
  sn as MetricDrill,
  Ua as PANE_CONTEXT_KEY,
  Pa as PARAM_DIR,
  Ca as PARAM_ENTITY,
  Ea as PARAM_EXPR,
  Aa as PARAM_PAGE,
  Sa as PARAM_SORT,
  Ma as PARAM_VIEW,
  Ra as PinStar,
  wr as PreviewView,
  In as QueryMark,
  fr as QueryPanel,
  fn as RECORD_STATUSES,
  ka as RESULT_FIELDS,
  Rs as ROUTE_ADAPTER_KEY,
  vr as RecordActions,
  $r as ResultsArea,
  rr as SHELL_CONTEXT_KEY,
  Wf as SHELL_THEMES,
  rn as ScopeMark,
  rd as SegmentedControl,
  bt as SelectTick,
  Qf as ShellCard,
  ur as ShellHeader,
  ys as StandingControl,
  an as StatusPill,
  kr as TableView,
  br as TypeCardsView,
  Is as VIEW_KINDS,
  gl as VIEW_LABELS,
  Wa as WINDOW_CONTEXT_KEY,
  zf as WindowFrame,
  qr as WindowPane,
  Sr as activePanel,
  $t as activeTab,
  xa as addTerm,
  ba as andExpression,
  pd as axisOf,
  Da as cascade,
  Hs as cellFull,
  tn as cellText,
  _n as cellTextOf,
  Ve as cellValue,
  Vn as changesResults,
  Gn as clampRect,
  Ir as collapseSpace,
  xd as collapseToTabs,
  Jf as column,
  ss as columnAlign,
  rs as columnClass,
  as as columnKey,
  Us as columnShortcut,
  Ll as columnShortcutOf,
  na as columnTruncates,
  $l as columnsFor,
  yl as countPages,
  vl as createHistoryAdapter,
  up as createMemoryAdapter,
  Yl as createMockDataSource,
  dp as createVueRouterAdapter,
  Of as decodeLayout,
  Ml as defaultCellText,
  Ss as defaultLayout,
  wa as defaultQuery,
  Qt as defaultViewFor,
  Hn as drillExpression,
  xs as dropIntoSpace,
  Nt as emptyFacetState,
  ga as emptyFacetValue,
  Es as encodeLayout,
  Js as excludingTerm,
  Mn as expandShortcuts,
  Et as findEntity,
  it as findSort,
  tp as fixedView,
  Na as float,
  $s as floatPanel,
  Nr as floatSplit,
  Cd as floatTabs,
  gn as fnv1a,
  Ns as focusEntity,
  Ct as formatCount,
  kl as formatDate,
  at as formatExpression,
  wl as formatMetric,
  bl as formatOrdinal,
  nn as formatTerm,
  Fn as frame,
  vt as frameAt,
  Pe as frameOf,
  ca as framePathOf,
  Re as frontPanel,
  Gl as generateRows,
  Zf as group,
  Tt as groupOf,
  vd as groups,
  qs as hasActiveFacets,
  pe as hasPanel,
  ep as headless,
  Kt as insertPanel,
  Ut as isChoosable,
  Gf as isEntityScoped,
  Bs as isFacetActive,
  oe as isFloat,
  Z as isGroup,
  ot as isMaximized,
  ht as isMinimized,
  _e as isPanelTab,
  _a as isPristineQuery,
  Ot as isSplit,
  qe as isTabOf,
  ya as isTypeCardsQuery,
  Fs as isViewKind,
  ds as joinExpression,
  tr as liftTerm,
  Fl as matchesExpression,
  Xl as matchesFacets,
  md as maximizeFrame,
  _d as maximizeFrameAt,
  Pd as mergeSpace,
  gd as minimizeFrame,
  yd as minimizeFrameAt,
  vn as movePanel,
  Gt as moveTab,
  Xf as negateTerm,
  ct as nodeAt,
  Xt as nodeTitle,
  Me as normalizeLayout,
  Oe as normalizeSearch,
  Ka as normalizeSizes,
  Or as onlySpace,
  Yt as oppositeTerm,
  rt as panelIds,
  et as panelNode,
  ws as panelTabs,
  Ie as parseExpression,
  ro as parseQuery,
  Ri as presentParts,
  hr as presentRow,
  Ln as pressOptions,
  Br as providePaneContext,
  Zl as provideShellContext,
  Td as provideWindowContext,
  Xn as raiseFrame,
  jt as raiseFrameAt,
  wd as raisedPath,
  ql as readDraft,
  Vs as reconcileFacets,
  Ad as reconcileLayout,
  Zs as recordTerm,
  aa as refineExpression,
  gt as removePanel,
  _t as replaceAt,
  ks as resizeRect,
  Ms as resizeSplit,
  ma as resolveView,
  je as roleColumn,
  Ks as roleColumns,
  En as rootSpace,
  Ba as row,
  Cl as rowKey,
  zn as sameTerm,
  $a as scopeTerm,
  Wt as scopeTermFor,
  sr as scopedEntity,
  Un as serializeQuery,
  Lt as setActivePanel,
  hd as setFrameRect,
  bs as setFrameRectAt,
  kn as setSizesAt,
  sp as setSplitDirection,
  st as sizesOf,
  Os as sortsFor,
  Ce as spaceChrome,
  Dt as spaceTitle,
  Oa as split,
  Dl as splitExpression,
  Cs as spreadTabs,
  oo as summarizeQuery,
  za as summaryTerms,
  wn as swapPanels,
  Fa as tabNode,
  on as tabPanels,
  er as termStanding,
  Dr as tileFloat,
  rp as toFloat,
  lp as toTiled,
  np as toggleMaximized,
  ap as toggleMinimized,
  Xc as useColumns,
  fo as useDraft,
  Po as useEntityCounts,
  hu as useEntityPreviews,
  cp as useLayoutRoute,
  op as usePaneContext,
  ip as usePaneMenu,
  kt as usePresentedRows,
  io as useQueryState,
  To as useRecordNames,
  co as useResults,
  xe as useShellContext,
  Dn as useWindowContext,
  ns as viewAcross,
  vs as withStanding,
  ar as withoutOwnScope,
  Nl as withoutTerm
};
