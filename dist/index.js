import { ref as W, inject as Et, provide as Vn, computed as v, toValue as Nt, shallowRef as Pt, watch as be, onScopeDispose as Wn, defineComponent as oe, onMounted as is, onBeforeUnmount as De, resolveComponent as cs, openBlock as f, createElementBlock as h, normalizeStyle as Me, Fragment as ne, renderList as he, toDisplayString as O, createCommentVNode as R, createElementVNode as $, createBlock as J, nextTick as Vt, useId as Hn, unref as A, normalizeClass as At, getCurrentScope as us, createVNode as ve, withDirectives as vn, withKeys as Ye, withModifiers as ze, vModelText as hn, renderSlot as $e, useSlots as Ut, createTextVNode as We, withCtx as Qe, reactive as za, resolveDynamicComponent as Un, createSlots as on, useModel as Ot, mergeModels as mn, Comment as Il, Text as Ol, h as Dl } from "vue";
const ds = Symbol("dc.routeAdapter");
function tt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Bl() {
  const e = typeof window < "u", t = W(e ? tt(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), a = () => {
    t.value = tt(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, o) => {
    const r = tt(l);
    if (!e) {
      t.value = r;
      return;
    }
    const i = `${window.location.pathname}${r}${window.location.hash}`;
    o === "push" ? window.history.pushState(window.history.state, "", i) : window.history.replaceState(window.history.state, "", i), t.value = r, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    push: (l) => s(l, "push"),
    replace: (l) => s(l, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
const fs = ["list", "cards", "grid", "images", "table", "links", "preview"], cf = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], an = ["ok", "running", "queued", "review", "failed"], uf = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], df = [480, 620, 760, 900, 1100], ql = "cards", zn = "updated";
function ps(e) {
  return typeof e == "string" && fs.includes(e);
}
const Kl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function jn(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function bt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function vs(e, t = {}) {
  const n = bt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function hs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function ms(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of hs(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const Vl = { key: zn, label: zn };
function rt(e, t, n = null) {
  const a = ms(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === zn) ?? a[0] ?? Vl;
}
function Gn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Tt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Gn(n);
  return t;
}
function gs(e) {
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
function _s(e) {
  return Object.values(e).some(gs);
}
function Xn(e) {
  return e.entity === null && e.expr.trim() === "" && !_s(e.facets);
}
function ff(e) {
  return e.entity !== null;
}
function Yn(e) {
  return e.entity === null && e.view === "cards";
}
function Wl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Qn(e, t = {}) {
  const a = t.landing === "entity" ? vs(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && ps(t.view) ? t.view : ql,
    sort: rt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Tt(a),
    page: 1
  };
}
const ys = ["entity", "sort", "dir", "expr", "facets"];
function Ra(e) {
  return ys.some((t) => t in e);
}
function ws(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : Gn(a);
  }
  return n;
}
function cn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Hl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function wt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Ul(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function jl(e) {
  return String(e + 1).padStart(2, "0");
}
const Rn = "—";
function Ve(e, t) {
  return e.find((n) => n.role === t);
}
function ks(e, t) {
  return e.filter((n) => n.role === t);
}
function Gl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Xl = ["id", "entityKey", "entityLabel"];
function Oe(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Xl.includes(n))
      return t[n];
  }
}
function Fa(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Yl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Ql(e, t) {
  if (e == null || e === "") return Rn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Hl(n) : String(e);
  }
  return t === "date" ? Ul(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Rn : String(e);
}
function jt(e, t) {
  const n = Oe(e, t);
  return e.format ? e.format(n, t) : Ql(n, e.kind);
}
function Zl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function bs(e, t) {
  const n = jt(e, t), a = Zl(Oe(e, t));
  return a && a !== n ? a : n;
}
function un(e, t) {
  return e ? jt(e, t) : "";
}
function Na(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Jl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Ia(e) {
  return [Jl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Fn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const er = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function tr(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const o = e[l];
    if (a) {
      o === a ? a = null : n += o;
      continue;
    }
    if (o === '"' || o === "'") {
      a = o;
      continue;
    }
    if (/\s/.test(o)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += o;
  }
  return s(), t;
}
function Re(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of tr(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const o = s.length > 1 && s.startsWith("-"), r = o ? s.slice(1) : s, i = o ? { negated: !0 } : {}, c = er.exec(r);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...i
    }) : a.push({ kind: "text", value: r, ...i });
  }
  return a.length && n.push(a), n;
}
const $t = (e) => e.toLowerCase().replace(/\s+/g, ""), $s = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function nr(e, t, n) {
  const a = $t(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && $t(c.label) === a
  );
  if (l) return Oe(l, t);
  const o = n.facets.find((c) => $t(c.label) === a);
  if (o && o.key in t.fields) return t.fields[o.key];
  const r = $s.find(([c]) => c === a)?.[1];
  if (r) {
    const c = Ve(s, r);
    if (c) return Oe(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = ks(s, "metric")[Number(i[1]) - 1];
    if (c) return Oe(c, t);
  }
}
function xs(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Oa = /^[a-z_][\w.-]*$/;
function Cs(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Oa.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : $t(e.label);
  return n !== void 0 && Oa.test(n) ? n : void 0;
}
function ar(e, t) {
  const n = $t(e);
  if (n === "entity" || $s.some(([s]) => s === n) || /^metric\d+$/.test(n)) return !0;
  const a = (s) => s !== void 0 && $t(s) === n;
  return (t.columns ?? []).some(
    (s) => a(s.key) || a(s.field) || a(s.label)
  ) || t.facets.some((s) => a(s.key) || a(s.label));
}
function Ss(e, t) {
  if (!t) return e;
  let n = !1;
  const a = Re(e).map(
    (s) => s.map((l) => {
      if (l.kind !== "field") return l;
      const o = Ms(l.field, t), r = o && Cs(o);
      return r ? (n = !0, { ...l, field: r }) : l;
    })
  );
  return n ? ot(a) : e;
}
function Ms(e, t) {
  if (!(!e || ar(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && xs(n.label) === e
    );
}
function sr(e, t) {
  if (!t || e.label === void 0 || !Cs(e)) return;
  const n = xs(e.label);
  return Ms(n, t) === e ? n : void 0;
}
function En(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Da(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function lr(e, t, n) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((r) => {
      const i = Ve(o, r), c = i ? Oe(i, t) : void 0;
      return typeof c == "string" && En(c, e.value);
    });
  }
  const a = nr(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (r) => e.comparator === "=" ? Da(String(r), e.value) : En(String(r), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof a == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? a : o === "false" || o === "no" ? !a : null;
    }
    if (typeof a == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? a === o : null;
    }
    return e.comparator === "=" ? Da(String(a), e.value) : En(String(a), e.value);
  }
  const s = Number(e.value), l = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(l) ? null : rr(e.comparator, l, s);
}
function Ba(e, t, n) {
  const a = lr(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function rr(e, t, n) {
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
function qa(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
function or(e, t, n) {
  return e.length ? e.some((a) => {
    const s = /* @__PURE__ */ new Map();
    for (const l of a)
      qa(l) && s.set(l.field, (s.get(l.field) ?? !1) || Ba(l, t, n));
    return a.every(
      (l) => qa(l) ? s.get(l.field) === !0 : Ba(l, t, n)
    );
  }) : !0;
}
function Ka(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Gt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ka(e.value) : `${t}${e.field}${e.comparator}${Ka(e.value)}`;
}
function pf(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ot(e) {
  return e.filter((t) => t.length).map((t) => t.map(Gt).join(" ")).join(" OR ");
}
function ir(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, o) => o !== n) : a).filter((a) => a.length);
}
function cr(e) {
  const t = Re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(Gt).join(" ")
  };
}
function Va(e, t) {
  return [...e.map(Gt), t.trim()].filter(Boolean).join(" ");
}
const Wa = (e, t) => e.toLowerCase() === t.toLowerCase();
function wn(e, t) {
  return !!e.negated == !!t.negated && Es(e, t);
}
function Wt(e, t) {
  return !!e.negated != !!t.negated && Es(e, t);
}
function Es(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Wa(e.value, t.value) : t.kind === "text" && Wa(e.value, t.value);
}
function ur(e, t) {
  return t.filter((n) => !e.some((a) => wn(a, n)));
}
function Zn(e, t) {
  return Ps(e, t, (n) => n);
}
function dr(e, t) {
  return Ps(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Wt(s, l)))
  );
}
function Ps(e, t, n) {
  const a = Re(e), s = Re(t);
  return a.length ? s.length ? ot(
    a.flatMap(
      (l) => s.map((o) => [...n(l, o), ...ur(l, o)])
    )
  ) : ot(a) : ot(s);
}
const Ha = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function As(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const fr = 7, pr = 3;
function vr(e, t, n, a) {
  const s = (t * fr + cn(n)) % a, l = [];
  for (let o = 0; o < Math.min(pr, a); o++)
    l.push(As(e, (s + o) % a));
  return l;
}
function hr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? mr(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function mr(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, o) => l - o).map((l) => e[l]);
}
function gr(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, o = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${o}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return an[n % an.length];
    case "updated":
      return l;
    case "tint":
      return Ha[n % Ha.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return an[n % an.length];
    case "date":
      return l;
    default:
      return;
  }
}
function _r(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, o = t.scopes ?? [];
  if (!l.length) return [];
  const r = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], d = Math.floor(i / l.length), m = cn(`${a}:${e.key}:${c[0]}:${i}`), y = As(e.key, i), k = new Date(s.getTime() - m % 900 * 36e5).toISOString(), b = {};
    for (const C of e.columns ?? []) {
      const _ = C.field ?? C.key;
      if (!_ || C.value) continue;
      const x = gr(C, {
        hash: cn(`${m}:${_}`),
        sample: c,
        revision: d,
        updatedAt: k
      });
      x !== void 0 && (b[_] = x);
    }
    for (const C of e.facets)
      b[C.key] = hr(C, cn(`${m}:${C.key}`));
    for (const [C, _] of o)
      b[C] = _ === e.key ? y : vr(_, i, C, n);
    r.push({ id: y, entityKey: e.key, entityLabel: e.label, fields: b });
  }
  return r;
}
function yr(e, t) {
  for (const [n, a] of Object.entries(t)) {
    const s = e.fields[n];
    switch (a.kind) {
      case "chips": {
        if (!a.selected.length) break;
        if (Array.isArray(s)) {
          if (!s.some((l) => a.selected.includes(String(l)))) return !1;
          break;
        }
        if (typeof s != "string" || !a.selected.includes(s)) return !1;
        break;
      }
      case "range": {
        if (a.min === null && a.max === null) break;
        const l = typeof s == "number" ? s : Number(s);
        if (!Number.isFinite(l) || a.min !== null && l < a.min || a.max !== null && l > a.max) return !1;
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
function wr(e, t) {
  const n = e.find((o) => o.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", l = a === "date" || n.role === "updated";
  return (o, r) => {
    const i = Oe(n, o), c = Oe(n, r);
    return s ? Number(c ?? 0) - Number(i ?? 0) : l ? Date.parse(String(c ?? "")) - Date.parse(String(i ?? "")) : String(c ?? "").localeCompare(String(i ?? ""));
  };
}
function kr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const o = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), r = _r(a, { ...e, scopes: o });
    return t.set(a.key, r), r;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: o, offset: r }) {
      const i = Re(a.expr), c = l ? [l] : s.entities, d = [], m = [];
      for (const b of c)
        for (const C of n(b, s))
          d.push(C), (l ? yr(C, a.facets) : !0) && or(i, C, b) && m.push(C);
      const y = rt(l, a.sort, s), k = m.sort(wr(hs(l, s), y.key));
      return a.dir === "asc" && k.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: k.slice(r, r + o),
        total: m.length,
        unfiltered: m.length === d.length
      };
    }
  };
}
function Jn(e, t) {
  return Ts(e, t.id);
}
function Ts(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function ea(e, t) {
  return Jn(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ta(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Re(t).flat();
  if (!a) return n;
  const s = Re(n);
  return s.some((r) => r.some((i) => wn(i, a))) ? n : s.some((r) => r.some((i) => Wt(i, a))) ? ot(
    s.map(
      (r) => r.map((i) => Wt(i, a) ? a : i)
    )
  ) : `${n} ${t}`;
}
function Ls(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function zs(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Re(t).flat();
  if (!n) return null;
  const a = Re(e).flat();
  return a.some((s) => wn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Wt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Rs(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Re(t).flat();
  if (!n) return e;
  const a = Re(e), s = a.map(
    (l) => l.filter((o) => !wn(o, n) && !Wt(o, n))
  );
  return s.every((l, o) => l.length === a[o]?.length) ? e : ot(s);
}
function Ua(e, t, n) {
  return t ? n === null ? Rs(e, t) : ta(e, n === "out" ? Ls(t) : t) : e;
}
function Be(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey ? { exclude: !0 } : {};
}
function br(e, t, n, a = {}) {
  const s = ea(e, n);
  return ta(t.expr, a.exclude ? Ls(s) : s);
}
function Fs(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Re(t), s = a.map(
    (l) => l.filter((o) => o.kind !== "field" || o.field !== n)
  );
  return s.every((l, o) => l.length === a[o]?.length) ? t : ot(s);
}
function Ns(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const Is = Symbol("dc.shellContext");
function $r(e) {
  return Vn(Is, e), e;
}
function we() {
  const e = Et(Is, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const na = "e", aa = "v", sa = "s", la = "d", ra = "q", oa = "p", ia = "f_", Os = "*", xr = [
  na,
  aa,
  sa,
  la,
  ra,
  oa
], Nn = "..", Ds = ",", Cr = [
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
function Pn(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Cr) t = t.replace(n, a);
  return t;
}
function et(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Bs(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), o = s === -1 ? "" : a.slice(s + 1);
    n.push([et(l), o]);
  }
  return n;
}
function Sr(e) {
  return xr.includes(e) || e.startsWith(ia);
}
function ja(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Mr(e, t) {
  const n = et(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(Ds).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => a.has(l)) };
    }
    case "range": {
      const a = n.indexOf(Nn), s = (a === -1 ? n : n.slice(0, a)).trim(), l = (a === -1 ? "" : n.slice(a + Nn.length)).trim(), o = s === "" ? null : Number(s), r = l === "" ? null : Number(l);
      let i = o !== null && Number.isFinite(o) ? ja(o, e.min, e.max) : null, c = r !== null && Number.isFinite(r) ? ja(r, e.min, e.max) : null;
      return i !== null && c !== null && i > c && ([i, c] = [c, i]), { kind: "range", min: i, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Er(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(Ds) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Nn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function Pr(e, t, n = {}) {
  const a = Qn(t, n), s = new Map(Bs(e)), l = s.get(na), o = l === void 0 ? a.entity : et(l), r = o === Os ? null : bt(t, o), i = s.get(aa), c = i && ps(et(i)) ? et(i) : a.view, d = s.get(sa), m = rt(r, d ? et(d) : n.sort, t), y = s.get(la), k = y ? et(y) === "asc" ? "asc" : "desc" : a.dir, b = s.get(ra), C = s.get(oa), _ = C === void 0 ? 1 : Number(et(C)), x = Number.isFinite(_) ? Math.max(1, Math.floor(_)) : 1, F = {};
  for (const z of r?.facets ?? []) {
    const M = s.get(`${ia}${z.key}`);
    F[z.key] = M === void 0 ? Gn(z) : Mr(z, M);
  }
  return {
    entity: r?.key ?? null,
    view: c,
    sort: m.key,
    dir: k,
    expr: b === void 0 ? "" : et(b),
    facets: ws(r, F),
    page: x
  };
}
function Ga(e, t, n = {}, a = "") {
  const s = Qn(t, n), l = bt(t, e.entity), o = Bs(a).filter(([m]) => !Sr(m)), r = [], i = (m, y) => r.push([m, Pn(y)]), c = l?.key ?? null;
  c !== s.entity && i(na, c ?? Os), e.view !== s.view && i(aa, e.view), e.sort !== s.sort && i(sa, e.sort), e.dir !== s.dir && i(la, e.dir), e.expr.trim() !== "" && i(ra, e.expr);
  for (const m of l?.facets ?? []) {
    const y = e.facets[m.key];
    if (!y) continue;
    const k = Er(y, m);
    k !== null && r.push([`${ia}${m.key}`, Pn(k)]);
  }
  e.page > 1 && i(oa, String(e.page));
  const d = [
    ...o.map(([m, y]) => [Pn(m), y]),
    ...r
  ];
  return d.length ? `?${d.map(([m, y]) => y === "" ? m : `${m}=${y}`).join("&")}` : "";
}
const gn = "entity", Ht = "expr";
function Ar(e, t) {
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
function ca(e, t) {
  const n = [];
  t && n.push({
    id: gn,
    label: `entity:${t.key}`,
    facetKey: gn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && gs(s) && n.push(...Ar(a, s));
  }
  return Re(e.expr).forEach((a, s) => {
    a.forEach((l, o) => {
      n.push({
        id: `${Ht}:${s}:${o}`,
        label: Gt(l),
        facetKey: Ht,
        group: s,
        index: o,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function Tr(e, t, n = null) {
  if (Xn(e)) {
    const l = rt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = ca(e, t).filter((l) => l.facetKey !== Ht).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function Lr(e) {
  const { adapter: t } = e, n = v(() => Nt(e.schema)), a = v(() => Nt(e.defaults) ?? {}), s = v(() => Pr(t.search.value, n.value, a.value)), l = v(() => bt(n.value, s.value.entity)), o = v(() => l.value ?? vs(n.value, a.value)), r = v(() => ms(l.value, n.value)), i = v(() => rt(l.value, s.value.sort, n.value)), c = (_, x) => {
    const F = Ga(_, n.value, a.value, t.search.value);
    F !== t.search.value && (x === "push" ? t.push(F) : t.replace(F));
  }, d = () => Nt(e.navigationMode) ?? "push", m = () => Nt(e.facetNavigationMode) ?? "replace", y = (_, x) => {
    const F = _.page ?? (Ra(_) ? 1 : s.value.page);
    c({ ...s.value, ..._, page: F }, x);
  }, k = (_, x) => {
    const F = s.value.facets[_];
    if (!F) return;
    const z = { ...s.value.facets, [_]: x(F) };
    y({ facets: z }, m());
  }, b = (_) => {
    const x = _ === null ? null : bt(n.value, _);
    return (x?.key ?? null) === s.value.entity ? {} : {
      entity: x?.key ?? null,
      sort: rt(x, s.value.sort, n.value).key,
      facets: Tt(x)
    };
  }, C = (_) => {
    const x = b(_);
    Object.keys(x).length && y(x, d());
  };
  return {
    query: s,
    entity: l,
    focus: o,
    sort: i,
    sorts: r,
    summary: v(() => Tr(s.value, l.value, n.value)),
    terms: v(() => ca(s.value, l.value)),
    isPristine: v(() => Xn(s.value)),
    isEverything: v(() => s.value.entity === null),
    hasFacets: v(() => _s(s.value.facets)),
    setEntity: C,
    clearEntity: () => C(null),
    setView(_) {
      y({ view: _ }, d());
    },
    setSort(_) {
      y({ sort: rt(l.value, _, n.value).key }, d());
    },
    toggleDirection() {
      y({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(_) {
      y({ expr: _ }, d());
    },
    narrow(_, x, F) {
      y({ expr: _, ...b(x), ...F ? { view: F } : {} }, d());
    },
    setPage(_, x) {
      y({ page: Math.max(1, Math.floor(_)) }, x ?? d());
    },
    setFacet(_, x) {
      k(_, () => x);
    },
    toggleChip(_, x) {
      k(_, (F) => F.kind !== "chips" ? F : { kind: "chips", selected: F.selected.includes(x) ? F.selected.filter((M) => M !== x) : [...F.selected, x] });
    },
    setRange(_, x, F) {
      k(_, (z) => z.kind === "range" ? { kind: "range", min: x, max: F } : z);
    },
    toggleFlag(_) {
      k(
        _,
        (x) => x.kind === "toggle" ? { kind: "toggle", on: !x.on } : x
      );
    },
    removeTerm(_) {
      if (_.facetKey === gn) {
        C(null);
        return;
      }
      if (_.facetKey === Ht) {
        const x = ir(Re(s.value.expr), _.group ?? 0, _.index ?? 0);
        y({ expr: ot(x) }, d());
        return;
      }
      k(_.facetKey, (x) => x.kind === "chips" && _.option ? { kind: "chips", selected: x.selected.filter((F) => F !== _.option) } : x.kind === "range" ? { kind: "range", min: null, max: null } : x.kind === "toggle" ? { kind: "toggle", on: !1 } : x);
    },
    clearFilters() {
      y({ entity: null, expr: "", facets: Tt(null) }, d());
    },
    reset() {
      c(Qn(n.value, a.value), d());
    },
    hrefFor(_) {
      const x = { ...s.value, ..._ };
      return x.page = _.page ?? (Ra(_) ? 1 : s.value.page), x.facets = ws(bt(n.value, x.entity), x.facets), `${t.path.value}${Ga(x, n.value, a.value, t.search.value)}`;
    }
  };
}
function zr(e) {
  const t = Pt([]), n = W(0), a = W(!1), s = W(!1), l = Pt(null);
  let o = 0, r = null, i = null;
  const c = v(() => (e.query.value.page - 1) * e.limit.value), d = v(() => Wl(n.value, e.limit.value)), m = () => {
    const M = e.query.value, L = e.within?.value.trim(), K = Fs(e.entity.value, M.expr);
    return L ? { ...M, expr: Zn(L, K) } : K === M.expr ? M : { ...M, expr: K };
  }, y = (M, L) => {
    t.value = M.rows, n.value = M.total, l.value = null, k(L);
  }, k = (M) => {
    r = { key: M, total: n.value }, s.value = !1;
  }, b = (M) => {
    l.value = M, t.value = [], n.value = 0, r = null, s.value = !1;
  }, C = (M, L, K, P) => {
    let w = !0;
    const V = () => M === o;
    let N = 0, Y = !1;
    const G = (ie) => {
      N = ie, Y = !0, P === void 0 && (n.value = ie);
    }, ge = () => {
      w && (w = !1, t.value = [], G(0)), l.value = null;
    };
    return {
      get open() {
        return V();
      },
      insert(ie, S) {
        if (!V()) return;
        const D = Array.isArray(ie) ? ie : [ie];
        if (!D.length) return;
        ge();
        const j = [...t.value];
        j.splice(S ?? j.length, 0, ...D), t.value = L > 0 ? j.slice(0, L) : j, G(N + D.length);
      },
      set(ie) {
        V() && (ie.rows && (ge(), t.value = L > 0 ? ie.rows.slice(0, L) : ie.rows, G(ie.rows.length)), ie.total !== void 0 && G(ie.total));
      },
      close() {
        V() && (a.value = !1, Y && (n.value = N), k(K));
      },
      fail(ie) {
        V() && (b(ie), a.value = !1);
      }
    };
  }, _ = () => {
    const M = i;
    i = null, M?.();
  }, x = () => {
    const M = ++o;
    _();
    const L = F.value, K = r?.key === L ? r.total : void 0;
    s.value = K === void 0;
    const P = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, w = e.source.value;
    if (w.stream) {
      a.value = !0;
      try {
        i = w.stream(P, C(M, P.limit, L, K)) ?? null;
      } catch (N) {
        b(N), a.value = !1;
      }
      return;
    }
    let V;
    try {
      V = w.query(P);
    } catch (N) {
      b(N);
      return;
    }
    if (!(V instanceof Promise)) {
      y(V, L), a.value = !1;
      return;
    }
    a.value = !0, V.then((N) => {
      M === o && y(N, L);
    }).catch((N) => {
      M === o && b(N);
    }).finally(() => {
      M === o && (a.value = !1);
    });
  }, F = v(() => {
    const M = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(ys.map((K) => M[K]))}`;
  }), z = v(() => `${F.value}|${e.query.value.page}`);
  return be([e.source, z, e.limit], x, {
    immediate: !0
  }), Wn(() => {
    o++, _();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: l, refresh: x };
}
const Dt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Rr = ["aria-label"], Fr = ["role", "aria-label"], Nr = ["data-dc-item"], Ir = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Or = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Dr = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Br = { class: "dc-menu__label dc-truncate" }, qr = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Kr = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Vr = /* @__PURE__ */ oe({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = W(null), o = W([]), r = W(null), i = W(null), c = W(null), d = W(!1), m = v(
      () => a.items.flatMap((P, w) => Dt(P) ? [w] : [])
    ), y = v(() => {
      const P = [{ entries: [] }];
      return a.items.forEach((w, V) => {
        w.heading ? P.push({ heading: w, entries: [] }) : P[P.length - 1]?.entries.push({ item: w, index: V });
      }), P.filter((w) => w.entries.length > 0);
    }), k = W({ x: a.at.x, y: a.at.y });
    async function b() {
      k.value = { x: a.at.x, y: a.at.y }, await Vt();
      const P = l.value?.getBoundingClientRect();
      if (!P) return;
      const w = 8;
      let V = a.at.x, N = a.at.y;
      if (V + P.width > window.innerWidth - w) {
        const Y = a.at.mirrorX === void 0 ? null : a.at.mirrorX - P.width;
        V = Y !== null && Y >= w ? Y : window.innerWidth - P.width - w;
      }
      N + P.height > window.innerHeight - w && (N = window.innerHeight - P.height - w), k.value = { x: Math.max(w, V), y: Math.max(w, N) };
    }
    const C = v(() => ({ left: `${k.value.x}px`, top: `${k.value.y}px` }));
    function _(P) {
      r.value = P, P !== null && Vt(() => o.value[P]?.focus());
    }
    function x(P, w) {
      const V = m.value;
      if (V.length === 0) return null;
      if (P === null) return w === 1 ? V[0] ?? null : V[V.length - 1] ?? null;
      const N = V.indexOf(P);
      return N === -1 ? V[0] ?? null : V[(N + w + V.length) % V.length] ?? null;
    }
    function F(P, w) {
      if (!a.items[P]?.items?.length) return;
      const N = o.value[P]?.getBoundingClientRect(), Y = l.value?.getBoundingClientRect();
      !N || !Y || (c.value = { x: Y.right - 4, y: N.top - 4, mirrorX: Y.left + 4 }, i.value = P, d.value = w);
    }
    function z(P) {
      const w = i.value;
      i.value = null, c.value = null, P && w !== null && _(w);
    }
    function M(P) {
      const w = a.items[P];
      if (!(!w || !Dt(w))) {
        if (w.items?.length) {
          F(P, !0);
          return;
        }
        s("choose", w);
      }
    }
    function L(P) {
      const w = P.key;
      if (w === "Escape") {
        P.preventDefault(), P.stopPropagation(), i.value !== null ? z(!0) : s("dismiss");
        return;
      }
      if (w === "ArrowDown" || w === "ArrowUp") {
        P.preventDefault(), P.stopPropagation(), z(!1), _(x(r.value, w === "ArrowDown" ? 1 : -1));
        return;
      }
      if (w === "Home" || w === "End") {
        P.preventDefault(), P.stopPropagation(), z(!1), _(x(null, w === "Home" ? 1 : -1));
        return;
      }
      if (w === "ArrowRight") {
        const V = r.value;
        V !== null && a.items[V]?.items?.length && (P.preventDefault(), P.stopPropagation(), F(V, !0));
        return;
      }
      if (w === "ArrowLeft") {
        i.value !== null && (P.preventDefault(), P.stopPropagation(), z(!0));
        return;
      }
      if (w === "Enter" || w === " ") {
        const V = r.value;
        if (V === null) return;
        P.preventDefault(), P.stopPropagation(), M(V);
      }
    }
    function K(P) {
      const w = a.items[P];
      !w || !Dt(w) || (i.value !== null && i.value !== P && z(!1), _(P), w.items?.length && F(P, !1));
    }
    return is(() => {
      b(), a.autofocus && _(x(null, 1));
    }), be(() => a.at, b, { deep: !0 }), be(() => a.items, () => void b(), { deep: !0 }), De(() => {
      i.value = null;
    }), t({ root: l }), (P, w) => {
      const V = cs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Me(C.value),
        onKeydown: L
      }, [
        (f(!0), h(ne, null, he(y.value, (N, Y) => (f(), h("div", {
          key: `${Y}-${N.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: N.heading ? "group" : "none",
          "aria-label": N.heading?.label
        }, [
          N.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": N.heading.id
          }, O(N.heading.label), 9, Nr)) : R("", !0),
          (f(!0), h(ne, null, he(N.entries, ({ item: G, index: ge }) => (f(), h(ne, {
            key: G.id ?? `${ge}-${G.label ?? ""}`
          }, [
            G.separator ? (f(), h("div", Ir)) : (f(), h("button", {
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
              onMouseenter: (ie) => K(ge)
            }, [
              $("span", Dr, O(G.checked ? "✓" : ""), 1),
              $("span", Br, O(G.label), 1),
              G.shortcut ? (f(), h("span", qr, O(G.shortcut), 1)) : G.items?.length ? (f(), h("span", Kr, "›")) : R("", !0)
            ], 40, Or))
          ], 64))), 128))
        ], 8, Fr))), 128)),
        i.value !== null && c.value ? (f(), J(V, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: c.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: w[0] || (w[0] = (N) => s("choose", N)),
          onDismiss: w[1] || (w[1] = (N) => z(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
      ], 44, Rr);
    };
  }
}), ue = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ua = /* @__PURE__ */ ue(Vr, [["__scopeId", "data-v-9b1413fa"]]), Wr = { class: "dc-pick" }, Hr = ["id"], Ur = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], jr = { class: "dc-pick__label" }, Gr = /* @__PURE__ */ oe({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = Hn() ?? "dc-pick", l = W(null), o = W(null), r = W(null), i = W(!1), c = v(() => r.value !== null), d = v(
      () => n.options.find((z) => z.key === n.modelValue) ?? n.options[0]
    ), m = v(
      () => n.options.map((z) => ({
        id: z.key,
        label: z.label,
        checked: z.key === n.modelValue
      }))
    ), y = v(
      () => r.value ? { maxHeight: `${window.innerHeight - r.value.y - 8}px` } : void 0
    );
    function k(z) {
      const M = l.value?.getBoundingClientRect();
      M && (r.value = { x: M.left, y: M.bottom + 4, mirrorX: M.right }, i.value = z, a("open"));
    }
    function b(z) {
      r.value && a("close"), r.value = null, z && l.value?.focus();
    }
    function C() {
      c.value ? b(!0) : k(!1);
    }
    function _(z) {
      z.key !== "ArrowDown" && z.key !== "ArrowUp" || c.value || (z.preventDefault(), k(!0));
    }
    function x(z) {
      const M = z.target;
      M && (l.value?.contains(M) || o.value?.root?.contains(M) || b(!1));
    }
    be(c, (z) => {
      z ? window.addEventListener("pointerdown", x, !0) : window.removeEventListener("pointerdown", x, !0);
    }), De(() => window.removeEventListener("pointerdown", x, !0));
    function F(z) {
      b(!0), !(z.id === void 0 || z.id === n.modelValue) && a("update:modelValue", z.id);
    }
    return (z, M) => (f(), h("span", Wr, [
      $("span", {
        id: `${A(s)}-name`,
        class: "dc-pick__name"
      }, O(e.label), 9, Hr),
      $("button", {
        id: `${A(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: At(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${A(s)}-name ${A(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: C,
        onKeydown: _
      }, [
        $("span", jr, O(d.value?.label), 1)
      ], 42, Ur),
      M[1] || (M[1] = $("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      r.value ? (f(), J(ua, {
        key: 0,
        ref_key: "menu",
        ref: o,
        class: "dc-pick__list",
        style: Me(y.value),
        items: m.value,
        at: r.value,
        label: e.label,
        autofocus: i.value,
        onChoose: F,
        onDismiss: M[0] || (M[0] = (L) => b(!0))
      }, null, 8, ["style", "items", "at", "label", "autofocus"])) : R("", !0)
    ]));
  }
}), Xa = /* @__PURE__ */ ue(Gr, [["__scopeId", "data-v-9d15111b"]]);
function Xr(e) {
  const t = Pt(/* @__PURE__ */ new Map()), n = W(!0);
  let a = 0, s;
  const l = () => {
    a++, s?.abort(), s = void 0;
  }, o = () => {
    l();
    const r = a, { signal: i } = s = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, y = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !y;
    const k = /* @__PURE__ */ new Map();
    let b = !0;
    for (const C of m) {
      const _ = Fs(C, c.expr), x = y ? Zn(y, _) : _;
      let F = !1;
      const z = (L) => {
        if (r !== a) return;
        if (b) {
          k.set(C.key, L);
          return;
        }
        const K = new Map(t.value);
        K.set(C.key, L), t.value = K;
      }, M = e.source.value.query({
        query: { ...c, entity: C.key, expr: x, facets: Tt(C), page: 1 },
        schema: d,
        entity: C,
        limit: 0,
        offset: 0,
        signal: i,
        progress: (L) => {
          F || z({ total: L, pending: !0, counted: !0 });
        }
      });
      M instanceof Promise ? (k.has(C.key) || k.set(C.key, { total: 0, pending: !0, counted: !1 }), M.then((L) => {
        F = !0, z({ total: L.total, pending: !1, counted: !0 });
      })) : (F = !0, k.set(C.key, { total: M.total, pending: !1, counted: !0 }));
    }
    b = !1, t.value = k;
  };
  return us() && Wn(l), { counts: t, pristine: n, refresh: o, cancel: l };
}
const Yr = 25, qs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Qr(e, t) {
  return e.find((n) => qs(n.id, t));
}
function Zr(e) {
  const t = Pt(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (r) => {
    if (r.facetKey !== Ht || !r.field || !r.value) return null;
    const i = Ns(e.schema.value, r.field);
    return i ? { entity: i, id: r.value, key: `${i.key}:${r.value}` } : null;
  }, s = (r) => {
    const { entity: i, id: c } = r, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Ts(i, c) ?? "",
        facets: Tt(i),
        sort: rt(i, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Yr,
      offset: 0
    });
  }, l = (r, i) => {
    const c = un(Ve(r.columns ?? [], "identity"), i);
    return c === Rn || qs(c, i.id) ? "" : c;
  }, o = () => {
    const r = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = a(d);
      m && !t.value.has(m.key) && !n.has(m.key) && r.set(m.key, m);
    }
    if (!r.size) return;
    const i = [...r.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const m = new Map(t.value);
      d.forEach((y, k) => {
        const { reference: b } = i[k], C = Qr(y.rows, b.id);
        m.set(b.key, C ? l(b.entity, C) : "");
      }), t.value = m;
    };
    if (i.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(i.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of i) n.add(d.key);
    Promise.all(i.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of i) n.delete(d.key);
    });
  };
  return be([e.source, e.schema, e.terms], () => {
    try {
      o();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(r) {
      const i = a(r);
      return i && t.value.get(i.key) || null;
    }
  };
}
const Jr = ["data-dc-expanded"], eo = { class: "dc-header__domain" }, to = {
  key: 0,
  class: "dc-header__within"
}, no = ["title"], ao = ["data-dc-more", "title"], so = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, lo = ["title", "aria-label", "onClick"], ro = ["onKeydown"], oo = ["aria-expanded", "aria-controls"], io = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, co = { class: "dc-header__sr" }, uo = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, fo = ["disabled"], po = ["title"], vo = ["value", "onKeydown"], ho = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, mo = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, go = ["disabled"], _o = {
  key: 1,
  class: "dc-header__actions"
}, yo = "…", wo = /* @__PURE__ */ oe({
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
    const n = e, a = t, s = we(), l = v(() => s.schema.value), o = v(
      () => s.hasFacets.value || !!s.query.value.expr.trim() || !!s.within.value
    ), r = v(() => l.value.formatCount ?? wt), i = Xr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      entities: s.entities,
      within: s.within
    });
    function c(B) {
      if (n.hideCount) return B.count;
      if (B.key === s.query.value.entity && o.value) return r.value(s.total.value);
      if (i.pristine.value) return B.count;
      const E = i.counts.value.get(B.key);
      return E ? E.counted ? `${E.pending ? "~" : ""}${r.value(E.total)}` : yo : B.count;
    }
    function d(B) {
      return `${B.label} · ${c(B)}`;
    }
    const m = v(() => [
      { key: "", label: "Everything" },
      ...s.entities.value.map((B) => ({ key: B.key, label: d(B) }))
    ]), y = v(() => {
      const B = s.within.value.trim();
      return B ? ca({ ...s.query.value, expr: B, facets: {} }, null) : [];
    }), k = v(
      () => (n.views ?? [...fs]).map((B) => ({ key: B, label: Kl[B] }))
    ), b = v(() => jn(s.query.value.view, n.views)), C = v(() => s.query.value.entity !== null);
    function _(B) {
      s.setView(B);
    }
    const x = v(() => {
      const B = s.entity.value, Q = B?.keepsScope ? void 0 : B?.scope?.toLowerCase();
      return s.terms.value.filter((E) => E.facetKey !== gn).map((E, U, se) => {
        const Ce = se[U - 1];
        return {
          term: E,
          or: Ce?.group !== void 0 && E.group !== void 0 && E.group !== Ce.group,
          idle: !!Q && E.field?.toLowerCase() === Q
        };
      });
    }), F = Zr({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...y.value, ...s.terms.value])
    });
    function z(B) {
      return Ns(l.value, B)?.scopeLabel ?? B;
    }
    function M(B) {
      return B.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function L(B) {
      const Q = F.nameOf(B);
      return Q ? `${B.negated ? "-" : ""}${z(B.field)}: ${M(Q)}` : B.label;
    }
    function K(B) {
      s.setEntity(B || null);
    }
    const P = W(""), w = W(null);
    function V() {
      const B = P.value.trim();
      B && (s.setExpression(
        dr(s.query.value.expr, Ss(B, s.entity.value))
      ), P.value = "");
    }
    function N() {
      P.value = "", w.value?.blur();
    }
    function Y(B) {
      if (P.value) return;
      const Q = x.value.at(-1);
      Q && (B.preventDefault(), s.removeTerm(Q.term));
    }
    function G(B) {
      B.target?.closest("button, select, label, input") || a("toggle");
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
    let D = null;
    be(
      ge,
      (B) => {
        D?.disconnect(), D = null, S(), !(!B || typeof ResizeObserver > "u") && (D = new ResizeObserver(S), D.observe(B));
      },
      { flush: "post" }
    ), be(x, S, { flush: "post" }), De(() => D?.disconnect());
    const j = v(() => s.query.value.page), le = v(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !Yn(s.query.value)
    ), _e = v(
      () => `${s.counting.value ? "~" : ""}${wt(s.pageCount.value)}`
    ), Ee = v(() => {
      let B = `Page ${wt(j.value)} of ${_e.value}`;
      const Q = s.rows.value.length;
      if (Q) {
        const E = s.offset.value + 1, U = `${s.counting.value ? "~" : ""}${wt(s.total.value)}`;
        B += ` — rows ${wt(E)} to ${wt(E + Q - 1)} of ${U}`;
      }
      return n.pagesNote ? `${B}
${n.pagesNote}` : B;
    }), Le = W(null), Ue = v(() => Le.value ?? String(j.value)), je = v(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function Ge(B) {
      B.target.select();
    }
    function qe(B) {
      const Q = B.target, E = Q.value.replace(/[^0-9]/g, "");
      Q.value !== E && (Q.value = E), Le.value = E;
    }
    function Fe(B) {
      const Q = B.target, E = Number(Le.value);
      Le.value = null;
      const U = Number.isFinite(E) && E >= 1 ? Math.min(Math.trunc(E), Math.max(1, s.pageCount.value)) : j.value;
      Q.value = String(U), U !== j.value && s.setPage(U);
    }
    function Ke(B) {
      const Q = B.target;
      Le.value = null, Q.value = String(j.value), Q.blur();
    }
    return (B, Q) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      $("div", {
        class: "dc-header__trigger",
        onClick: G
      }, [
        $("span", eo, O(l.value.label), 1),
        y.value.length ? (f(), h("span", to, [
          Q[4] || (Q[4] = $("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(ne, null, he(y.value, (E) => (f(), h("span", {
            key: `scope:${E.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: L(E)
          }, O(L(E)), 9, no))), 128))
        ])) : R("", !0),
        $("div", {
          ref_key: "termBar",
          ref: ge,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ie.value,
          title: A(s).summary.value,
          onScroll: S
        }, [
          C.value ? (f(), J(Xa, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": A(s).query.value.entity ?? "",
            options: m.value,
            onOpen: A(i).refresh,
            onClose: A(i).cancel,
            "onUpdate:modelValue": K
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : R("", !0),
          ve(Xa, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": b.value,
            options: k.value,
            "onUpdate:modelValue": _
          }, null, 8, ["model-value", "options"]),
          (f(!0), h(ne, null, he(x.value, (E) => (f(), h(ne, {
            key: E.term.id
          }, [
            E.or ? (f(), h("span", so, "or")) : R("", !0),
            $("button", {
              type: "button",
              class: At(["dc-term dc-mono", { "dc-term--idle": E.idle }]),
              title: E.idle ? `Not applied to ${A(s).entity.value?.label} — remove ${L(E.term)}` : `Remove ${L(E.term)}`,
              "aria-label": `Remove ${L(E.term)}`,
              onClick: (U) => A(s).removeTerm(E.term)
            }, O(L(E.term)), 11, lo)
          ], 64))), 128)),
          vn($("input", {
            ref_key: "searchBox",
            ref: w,
            "onUpdate:modelValue": Q[0] || (Q[0] = (E) => P.value = E),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Ye(ze(V, ["prevent"]), ["enter"]),
              Ye(ze(N, ["prevent"]), ["esc"]),
              Ye(Y, ["backspace"])
            ]
          }, null, 40, ro), [
            [hn, P.value]
          ])
        ], 40, ao),
        $("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: Q[1] || (Q[1] = (E) => a("toggle"))
        }, [
          $("span", io, O(e.expanded ? "▲" : "▼"), 1),
          $("span", co, O(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, oo)
      ]),
      le.value ? (f(), h("nav", uo, [
        $("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: j.value <= 1,
          onClick: Q[2] || (Q[2] = (E) => A(s).setPage(j.value - 1))
        }, [...Q[5] || (Q[5] = [
          $("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, fo),
        $("span", {
          class: "dc-header__page dc-mono",
          title: Ee.value
        }, [
          $("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Me({ width: je.value }),
            value: Ue.value,
            onFocus: Ge,
            onInput: qe,
            onKeydown: [
              Ye(ze(Fe, ["prevent"]), ["enter"]),
              Ye(ze(Ke, ["prevent"]), ["esc"])
            ],
            onBlur: Fe
          }, null, 44, vo),
          $("span", ho, "/ " + O(_e.value), 1)
        ], 8, po),
        $("span", mo, O(Ee.value), 1),
        $("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: j.value >= A(s).pageCount.value,
          onClick: Q[3] || (Q[3] = (E) => A(s).setPage(j.value + 1))
        }, [...Q[6] || (Q[6] = [
          $("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, go)
      ])) : R("", !0),
      B.$slots.actions ? (f(), h("div", _o, [
        $e(B.$slots, "actions", {}, void 0, !0)
      ])) : R("", !0)
    ], 8, Jr));
  }
}), Ks = /* @__PURE__ */ ue(wo, [["__scopeId", "data-v-682f5b6d"]]), ko = { class: "dc-facet" }, bo = ["id"], $o = { class: "dc-facet__body" }, xo = ["aria-labelledby"], Co = ["aria-pressed", "data-dc-active", "onClick"], So = ["aria-labelledby"], Mo = ["aria-label", "placeholder", "onKeydown"], Eo = ["aria-label", "placeholder", "onKeydown"], Po = ["aria-checked"], Ao = { class: "dc-switch__text" }, To = ["data-dc-active"], Lo = /* @__PURE__ */ oe({
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
    function l(m) {
      if (n.value.kind !== "chips") return;
      const y = s.value.has(m) ? n.value.selected.filter((k) => k !== m) : [...n.value.selected, m];
      a("update", { kind: "chips", selected: y });
    }
    const o = W(""), r = W("");
    be(
      () => n.value,
      (m) => {
        m.kind === "range" && (o.value = m.min === null ? "" : m.min, r.value = m.max === null ? "" : m.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(m) {
      if (typeof m == "number") return Number.isFinite(m) ? m : null;
      const y = m.trim();
      if (!y) return null;
      const k = Number(y);
      return Number.isFinite(k) ? k : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const m = i(o.value), y = i(r.value);
      m === n.value.min && y === n.value.max || a("update", { kind: "range", min: m, max: y });
    }
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (m, y) => (f(), h("div", ko, [
      $("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, O(e.facet.label), 9, bo),
      $("div", $o, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), h(ne, null, he(e.facet.options, (k) => (f(), h("button", {
            key: k,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(k),
            "data-dc-active": s.value.has(k) ? "true" : "false",
            onClick: (b) => l(k)
          }, O(k), 9, Co))), 128))
        ], 8, xo)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          vn($("input", {
            "onUpdate:modelValue": y[0] || (y[0] = (k) => o.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(ze(c, ["prevent"]), ["enter"])
          }, null, 40, Mo), [
            [hn, o.value]
          ]),
          y[2] || (y[2] = $("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          vn($("input", {
            "onUpdate:modelValue": y[1] || (y[1] = (k) => r.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(ze(c, ["prevent"]), ["enter"])
          }, null, 40, Eo), [
            [hn, r.value]
          ])
        ], 8, So)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          $("span", Ao, O(e.facet.text), 1),
          $("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...y[3] || (y[3] = [
            $("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, To)
        ], 8, Po)) : R("", !0)
      ])
    ]));
  }
}), Vs = /* @__PURE__ */ ue(Lo, [["__scopeId", "data-v-36d1334b"]]), zo = ["id"], Ro = { class: "dc-panel__section dc-panel__rows" }, Fo = { class: "dc-panel__row" }, No = ["for"], Io = ["title", "aria-label", "onClick"], Oo = ["id", "placeholder", "onKeydown"], Do = { class: "dc-panel__actions" }, Bo = ["disabled"], qo = {
  key: 0,
  class: "dc-panel__section"
}, Ko = /* @__PURE__ */ oe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Ut(), s = we(), l = v(() => cr(s.query.value.expr)), o = v(() => l.value.parts.map(Gt)), r = W(l.value.text), i = W(null);
    be(
      () => l.value.text,
      (C) => {
        r.value = C;
      }
    );
    const c = v(() => r.value !== l.value.text);
    function d() {
      if (c.value) {
        const C = Ss(r.value, s.entity.value);
        s.setExpression(Va(l.value.parts, C));
      }
      n("close");
    }
    function m(C) {
      const { parts: _, text: x } = l.value;
      s.setExpression(Va(_.filter((F, z) => z !== C), x));
    }
    function y(C) {
      const { parts: _ } = l.value;
      r.value || !_.length || (C.preventDefault(), m(_.length - 1));
    }
    function k() {
      r.value = "", s.clearFilters();
    }
    function b(C, _) {
      s.setFacet(C, _);
    }
    return Vt(() => i.value?.focus()), (C, _) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: _[2] || (_[2] = Ye(ze((x) => n("close"), ["stop"]), ["esc"]))
    }, [
      $("section", Ro, [
        $("div", Fo, [
          $("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, No),
          $("div", {
            class: "dc-field",
            onMousedown: _[1] || (_[1] = ze((x) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(ne, null, he(o.value, (x, F) => (f(), h("button", {
              key: `${F}:${x}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${x}`,
              "aria-label": `Remove ${x}`,
              onClick: (z) => m(F)
            }, O(x), 9, Io))), 128)),
            vn($("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": _[0] || (_[0] = (x) => r.value = x),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: o.value.length ? "" : A(s).schema.value.placeholder,
              onKeydown: [
                Ye(ze(d, ["prevent"]), ["enter"]),
                Ye(y, ["backspace"])
              ]
            }, null, 40, Oo), [
              [hn, r.value]
            ])
          ], 32)
        ]),
        A(s).entity.value ? (f(!0), h(ne, { key: 0 }, he(A(s).entity.value.facets, (x) => (f(), J(Vs, {
          key: x.key,
          facet: x,
          value: A(s).query.value.facets[x.key],
          onUpdate: (F) => b(x.key, F)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : R("", !0),
        $("div", Do, [
          $("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          $("button", {
            type: "button",
            class: "dc-button",
            disabled: A(s).isPristine.value && !c.value,
            onClick: k
          }, " Reset ", 8, Bo)
        ])
      ]),
      a["panel-section"] ? (f(), h("section", qo, [
        $e(C.$slots, "panel-section", {}, void 0, !0)
      ])) : R("", !0)
    ], 40, zo));
  }
}), Ws = /* @__PURE__ */ ue(Ko, [["__scopeId", "data-v-640ae2f5"]]), Vo = ["checked", "indeterminate"], Hs = /* @__PURE__ */ oe({
  __name: "PageTick",
  setup(e) {
    const t = we(), n = v(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = v(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = v(() => n.value > 0 && !a.value);
    return (l, o) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: o[0] || (o[0] = (r) => A(t).selectPage(!a.value))
    }, null, 40, Vo));
  }
}), Wo = {
  key: 0,
  class: "dc-actions"
}, Ho = {
  key: 0,
  class: "dc-actions__select"
}, Uo = {
  key: 0,
  class: "dc-actions__all"
}, jo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Go = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Xo = { class: "dc-actions__ops" }, Yo = ["disabled"], Qo = ["disabled"], Zo = /* @__PURE__ */ oe({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(() => n.entity.value), s = v(() => !Yn(n.query.value)), l = v(() => s.value && n.selectable.value), o = v(
      () => jn(n.query.value.view, t.views) === "table"
    ), r = v(
      () => s.value && (l.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), i = v(() => n.selection.value.ids.length), c = v(() => i.value ? `${i.value} selected` : o.value ? "None selected" : "Select all");
    function d(m) {
      return i.value ? `${m} ${i.value}` : m;
    }
    return (m, y) => r.value ? (f(), h("div", Wo, [
      l.value ? (f(), h("div", Ho, [
        o.value ? (f(), h("span", Go, O(c.value), 1)) : (f(), h("label", Uo, [
          ve(Hs),
          $("span", jo, O(c.value), 1)
        ])),
        i.value ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: y[0] || (y[0] = (k) => A(n).clearSelection())
        }, " Clear ")) : R("", !0)
      ])) : R("", !0),
      $("div", Xo, [
        a.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: y[1] || (y[1] = (k) => A(n).create(a.value))
        }, [
          y[4] || (y[4] = $("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + O(a.value.create), 1)
        ])) : R("", !0),
        a.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !i.value,
          onClick: y[2] || (y[2] = (k) => A(n).duplicate())
        }, O(d(a.value.duplicate)), 9, Yo)) : R("", !0),
        a.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !i.value,
          onClick: y[3] || (y[3] = (k) => A(n).delete())
        }, O(d(a.value.delete)), 9, Qo)) : R("", !0)
      ])
    ])) : R("", !0);
  }
}), Us = /* @__PURE__ */ ue(Zo, [["__scopeId", "data-v-03ff2a91"]]);
function Jo(e, t) {
  if (!e) return null;
  const n = Oe(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function ei(e, t) {
  const n = Ve(t, "state"), a = Ve(t, "tint");
  return {
    identity: un(Ve(t, "identity"), e),
    reference: un(Ve(t, "reference"), e),
    metrics: ks(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: jt(s, e)
    })),
    state: n ? Oe(n, e) ?? null : null,
    updated: un(Ve(t, "updated"), e),
    image: Jo(Ve(t, "image"), e),
    tint: a ? Oe(a, e) ?? null : null
  };
}
function js(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Yl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: jl(t),
    parts: ei(e, l),
    pinned: a,
    selected: s
  };
}
function gt() {
  const e = we(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, a) => js(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const ti = ["data-dc-status"], ni = /* @__PURE__ */ oe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, O(e.status), 9, ti));
  }
}), Xt = /* @__PURE__ */ ue(ni, [["__scopeId", "data-v-23e59fbf"]]), ai = ["title"], si = { key: 1 }, li = /* @__PURE__ */ oe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), s = v(() => t.column.label ?? ""), l = v(() => jt(t.column, t.entry.row));
    function o(r) {
      r.stopPropagation(), a.value && n.drill(t.entry.row, a.value, Be(r));
    }
    return (r, i) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onClick: o
    }, [
      $e(r.$slots, "default", {}, () => [
        We(O(l.value), 1)
      ], !0)
    ], 8, ai)) : (f(), h("span", si, [
      $e(r.$slots, "default", {}, () => [
        We(O(l.value), 1)
      ], !0)
    ]));
  }
}), Yt = /* @__PURE__ */ ue(li, [["__scopeId", "data-v-f2501b17"]]), ri = ["data-dc-active", "aria-pressed", "aria-label"], oi = /* @__PURE__ */ oe({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = we();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, l) => (f(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, O(e.pinned ? "★" : "☆"), 9, ri));
  }
}), da = /* @__PURE__ */ ue(oi, [["__scopeId", "data-v-ef63d763"]]), ii = ["src"], ci = /* @__PURE__ */ oe({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = W(!1);
    return be(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (f(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, ii)) : R("", !0);
  }
}), kn = /* @__PURE__ */ ue(ci, [["__scopeId", "data-v-afaab300"]]), ui = ["data-dc-standing", "title", "aria-label"], di = /* @__PURE__ */ oe({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(() => Jn(t.entry.entity, t.entry.row)), s = v(() => zs(n.query.value.expr, a.value)), l = v(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function o(r) {
      r.stopPropagation(), n.setExpression(Rs(n.query.value.expr, a.value));
    }
    return (r, i) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: o
    }, O(s.value === "in" ? "+" : "−"), 9, ui)) : R("", !0);
  }
}), bn = /* @__PURE__ */ ue(di, [["__scopeId", "data-v-4b8d4166"]]), fi = ["data-dc-pending", "title", "aria-label"], pi = /* @__PURE__ */ oe({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = W(null);
    function l(c) {
      s.value = Be(c).exclude ? "out" : "in";
    }
    function o(c) {
      l(c), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function r() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    De(r);
    function i(c) {
      c.stopPropagation(), n.drill(t.entry.row, null, Be(c));
    }
    return (c, d) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: o,
      onPointermove: l,
      onPointerleave: r,
      onClick: i
    }, " → ", 40, fi)) : R("", !0);
  }
}), Qt = /* @__PURE__ */ ue(pi, [["__scopeId", "data-v-9efd42ac"]]), vi = ["checked", "aria-label"], _t = /* @__PURE__ */ oe({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = we();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, l) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, vi));
  }
}), hi = { class: "dc-cards" }, mi = { class: "dc-card__top dc-mono" }, gi = { class: "dc-card__lead" }, _i = {
  key: 1,
  class: "dc-card__entity"
}, yi = { class: "dc-card__top-right" }, wi = ["onClick"], ki = { class: "dc-card__names" }, bi = { class: "dc-card__primary" }, $i = { class: "dc-card__secondary dc-mono" }, xi = { class: "dc-card__metrics dc-mono" }, Ci = {
  key: 0,
  class: "dc-card__date"
}, Si = /* @__PURE__ */ oe({
  __name: "CardsView",
  setup(e) {
    const t = we(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", hi, [
      (f(!0), h(ne, null, he(A(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-card"
      }, [
        $("div", mi, [
          $("span", gi, [
            A(t).selectable.value ? (f(), J(_t, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : R("", !0),
            We(" " + O(o.ordinal) + " ", 1),
            a.value ? (f(), h("span", _i, O(o.entityLabel), 1)) : R("", !0)
          ]),
          $("span", yi, [
            o.parts.state ? (f(), J(Xt, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : R("", !0),
            ve(bn, { entry: o }, null, 8, ["entry"]),
            ve(Qt, { entry: o }, null, 8, ["entry"]),
            A(t).pinnable.value ? (f(), J(da, {
              key: 1,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : R("", !0)
          ])
        ]),
        $("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (r) => A(t).activate(o.row, A(Be)(r))
        }, [
          o.parts.image ? (f(), J(kn, {
            key: 0,
            class: "dc-card__image",
            src: o.parts.image
          }, null, 8, ["src"])) : R("", !0),
          $("span", ki, [
            $("span", bi, O(o.parts.identity), 1),
            $("span", $i, O(o.parts.reference), 1)
          ])
        ], 8, wi),
        $("div", xi, [
          (f(!0), h(ne, null, he(o.parts.metrics.slice(0, 2), (r) => (f(), J(Yt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, {
            default: Qe(() => [
              We(O(r.label) + " " + O(r.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (f(), h("span", Ci, O(o.parts.updated), 1)) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Gs = /* @__PURE__ */ ue(Si, [["__scopeId", "data-v-28581543"]]), Mi = { class: "dc-grid" }, Ei = ["onClick"], Pi = { class: "dc-tile__scrim" }, Ai = { class: "dc-tile__top dc-mono" }, Ti = { class: "dc-tile__chip" }, Li = { class: "dc-tile__caption" }, zi = { class: "dc-tile__secondary dc-truncate" }, Ri = { class: "dc-tile__primary" }, Fi = /* @__PURE__ */ oe({
  __name: "GridView",
  setup(e) {
    const t = we(), n = gt();
    return (a, s) => (f(), h("div", Mi, [
      (f(!0), h(ne, null, he(A(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        $("button", {
          type: "button",
          class: "dc-tile",
          style: Me({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (o) => A(t).activate(l.row, A(Be)(o))
        }, [
          l.parts.image ? (f(), J(kn, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : R("", !0),
          $("span", Pi, [
            $("span", Ai, [
              $("span", Ti, O(l.ordinal), 1)
            ]),
            $("span", Li, [
              $("span", zi, O(l.parts.reference), 1),
              $("span", Ri, O(l.parts.identity), 1)
            ])
          ])
        ], 12, Ei),
        A(t).selectable.value ? (f(), J(_t, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0)
      ]))), 128))
    ]));
  }
}), Xs = /* @__PURE__ */ ue(Fi, [["__scopeId", "data-v-7df25d40"]]);
function Ya(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function An(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function Ni(e) {
  return e > 0 ? e : 1 / 0;
}
function Ii(e, t, n) {
  const { width: a, height: s, gap: l = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const o = [];
  let r = [], i = 0, c = 0;
  for (const d of e) {
    const m = t(d), y = Math.max(m.ratio, Number.EPSILON), k = m.height && m.height > 0 ? Math.max(c, m.height) : c, b = An(k, s), C = Ya(i + y, r.length + 1, a, l);
    if (C > b) {
      r.push(d), i += y, c = k;
      continue;
    }
    const _ = An(c, s), x = r.length ? Ya(i, r.length, a, l) : 1 / 0;
    x <= Ni(c) && x - _ < b - C ? (o.push({ items: r, height: x, filled: !0 }), r = [d], i = y, c = m.height && m.height > 0 ? m.height : 0) : (o.push({ items: [...r, d], height: C, filled: !0 }), r = [], i = 0, c = 0);
  }
  return r.length && o.push({ items: r, height: An(c, s), filled: !1 }), o;
}
const Oi = { class: "dc-images" }, Di = ["title", "aria-label", "onClick"], Bi = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, qi = 240, sn = 8, Ki = 1, Vi = /* @__PURE__ */ oe({
  __name: "ImagesView",
  setup(e) {
    const t = we(), n = gt(), a = za(/* @__PURE__ */ new Map()), s = za(/* @__PURE__ */ new Set());
    function l(b, C) {
      const _ = C.target;
      _.naturalWidth > 0 && _.naturalHeight > 0 && a.set(b, { width: _.naturalWidth, height: _.naturalHeight });
    }
    function o(b) {
      const C = b.parts.image;
      return C && !s.has(C) ? C : null;
    }
    function r(b) {
      const C = o(b);
      return C ? a.get(C) : void 0;
    }
    function i(b) {
      const C = r(b);
      return C ? { ratio: C.width / C.height, height: C.height } : { ratio: Ki };
    }
    const c = W(null), d = W(0);
    let m = null;
    function y() {
      d.value = c.value?.clientWidth ?? 0;
    }
    is(() => {
      y(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(y), m.observe(c.value));
    }), De(() => {
      m?.disconnect(), m = null;
    });
    const k = v(() => {
      const b = Ii(n.value, i, {
        width: d.value,
        height: qi,
        gap: sn
      }), C = [];
      let _ = 0;
      for (const x of b) {
        let F = 0;
        for (const z of x.items) {
          const M = i(z).ratio * x.height, L = r(z), K = L !== void 0 && L.height < x.height;
          C.push({
            entry: z,
            style: {
              top: `${_}px`,
              left: `${F}px`,
              width: `${M}px`,
              height: `${x.height}px`
            },
            picture: K ? { width: `${L.width}px`, height: `${L.height}px` } : { width: "100%", height: "100%" }
          }), F += M + sn;
        }
        _ += x.height + sn;
      }
      return { boxes: C, height: b.length ? _ - sn : 0 };
    });
    return (b, C) => (f(), h("div", Oi, [
      $("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Me({ height: `${k.value.height}px` })
      }, [
        (f(!0), h(ne, null, he(k.value.boxes, ({ entry: _, style: x, picture: F }) => (f(), h("div", {
          key: _.key,
          class: "dc-images__cell",
          style: Me(x)
        }, [
          $("button", {
            type: "button",
            class: "dc-images__open",
            title: _.parts.identity,
            "aria-label": _.parts.identity,
            onClick: (z) => A(t).activate(_.row, A(Be)(z))
          }, [
            o(_) ? (f(), J(kn, {
              key: 0,
              class: "dc-images__picture",
              style: Me(F),
              src: o(_),
              onLoad: (z) => l(o(_), z),
              onError: (z) => s.add(o(_))
            }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), h("span", Bi, O(_.parts.identity), 1))
          ], 8, Di),
          A(t).selectable.value ? (f(), J(_t, {
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
}), Ys = /* @__PURE__ */ ue(Vi, [["__scopeId", "data-v-f708d83f"]]), Wi = { class: "dc-links" }, Hi = ["onClick"], Ui = { class: "dc-link__primary dc-truncate" }, ji = { class: "dc-link__secondary dc-mono dc-truncate" }, Gi = /* @__PURE__ */ oe({
  __name: "LinksView",
  setup(e) {
    const t = we(), n = gt();
    return (a, s) => (f(), h("div", Wi, [
      (f(!0), h(ne, null, he(A(n), (l) => (f(), h("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        A(t).selectable.value ? (f(), J(_t, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        $("button", {
          type: "button",
          class: "dc-link",
          onClick: (o) => A(t).activate(l.row, A(Be)(o))
        }, [
          $("span", Ui, O(l.parts.identity), 1),
          $("span", ji, O(l.parts.reference), 1)
        ], 8, Hi)
      ]))), 128))
    ]));
  }
}), Qs = /* @__PURE__ */ ue(Gi, [["__scopeId", "data-v-08d0266c"]]), Xi = {
  class: "dc-list",
  role: "list"
}, Yi = ["onClick"], Qi = { class: "dc-list__ordinal dc-mono" }, Zi = { class: "dc-list__identity" }, Ji = { class: "dc-list__primary dc-truncate" }, ec = { class: "dc-list__secondary dc-mono dc-truncate" }, tc = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, nc = { class: "dc-list__metrics dc-mono" }, ac = { class: "dc-list__trailing" }, sc = /* @__PURE__ */ oe({
  __name: "ListView",
  setup(e) {
    const t = we(), n = gt(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), h("div", Xi, [
      (f(!0), h(ne, null, he(A(n), (o) => (f(), h("div", {
        key: o.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        A(t).selectable.value ? (f(), J(_t, {
          key: 0,
          class: "dc-list__tick",
          row: o.row,
          selected: o.selected,
          name: o.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        $("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (r) => A(t).activate(o.row, A(Be)(r))
        }, [
          $("span", Qi, O(o.ordinal), 1),
          $("span", Zi, [
            $("span", Ji, O(o.parts.identity), 1),
            $("span", ec, O(o.parts.reference), 1)
          ])
        ], 8, Yi),
        a.value ? (f(), h("span", tc, O(o.entityLabel), 1)) : R("", !0),
        $("span", nc, [
          (f(!0), h(ne, null, he(o.parts.metrics.slice(0, 2), (r) => (f(), J(Yt, {
            key: r.column.key ?? r.label,
            entry: o,
            column: r.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        $("span", ac, [
          o.parts.state ? (f(), J(Xt, {
            key: 0,
            status: o.parts.state
          }, null, 8, ["status"])) : R("", !0),
          ve(bn, { entry: o }, null, 8, ["entry"]),
          ve(Qt, { entry: o }, null, 8, ["entry"]),
          A(t).pinnable.value ? (f(), J(da, {
            key: 1,
            row: o.row,
            name: o.parts.identity,
            pinned: o.pinned
          }, null, 8, ["row", "name", "pinned"])) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), In = /* @__PURE__ */ ue(sc, [["__scopeId", "data-v-11b9f46c"]]), lc = { class: "dc-preview" }, rc = { class: "dc-preview__pager dc-mono" }, oc = ["disabled"], ic = { "aria-live": "polite" }, cc = ["disabled"], uc = {
  key: 0,
  class: "dc-preview__card"
}, dc = ["src"], fc = { class: "dc-preview__body" }, pc = { class: "dc-preview__top" }, vc = { class: "dc-preview__badges" }, hc = { class: "dc-preview__entity dc-mono" }, mc = { class: "dc-preview__marks" }, gc = { class: "dc-preview__primary" }, _c = { class: "dc-preview__secondary dc-mono" }, yc = { class: "dc-preview__fields" }, wc = { class: "dc-preview__key" }, kc = { class: "dc-preview__value dc-mono" }, bc = /* @__PURE__ */ oe({
  __name: "PreviewView",
  setup(e) {
    const t = we(), n = gt(), a = W(0);
    be(n, (i) => {
      a.value > i.length - 1 && (a.value = Math.max(0, i.length - 1));
    });
    const s = v(() => n.value[a.value]), l = v(() => {
      const i = s.value;
      if (!i) return [];
      const c = Ve(i.columns, "reference"), d = Ve(i.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), o = v(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${i}`;
    }), r = (i) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + i)));
    };
    return (i, c) => (f(), h("div", lc, [
      $("div", rc, [
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => r(-1))
        }, " ‹ ", 8, oc),
        $("span", ic, O(o.value), 1),
        $("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= A(n).length - 1,
          onClick: c[1] || (c[1] = (d) => r(1))
        }, " › ", 8, cc)
      ]),
      s.value ? (f(), h("div", uc, [
        $("div", {
          class: "dc-preview__media",
          style: Me({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, dc)) : (f(), h(ne, { key: 1 }, [
            We(" preview ")
          ], 64))
        ], 4),
        $("div", fc, [
          $("div", pc, [
            $("span", vc, [
              A(t).selectable.value ? (f(), J(_t, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : R("", !0),
              s.value.parts.state ? (f(), J(Xt, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : R("", !0),
              $("span", hc, O(s.value.entityLabel), 1)
            ]),
            $("span", mc, [
              ve(bn, { entry: s.value }, null, 8, ["entry"]),
              ve(Qt, { entry: s.value }, null, 8, ["entry"]),
              A(t).pinnable.value ? (f(), J(da, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : R("", !0)
            ])
          ]),
          $("div", null, [
            $("div", gc, O(s.value.parts.identity), 1),
            $("div", _c, O(s.value.parts.reference), 1)
          ]),
          $("dl", yc, [
            (f(!0), h(ne, null, he(l.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              $("dt", wc, O(d.key), 1),
              $("dd", kc, [
                d.column && s.value ? (f(), J(Yt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(ne, { key: 1 }, [
                  We(O(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          $("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: c[2] || (c[2] = (d) => A(t).activate(s.value.row, A(Be)(d)))
          }, " Open record → ")
        ])
      ])) : R("", !0)
    ]));
  }
}), Zs = /* @__PURE__ */ ue(bc, [["__scopeId", "data-v-6be41155"]]);
function $c() {
  const e = we();
  return v(() => Gl(e.schema.value, e.entity.value));
}
const xc = ["title"], Cc = {
  key: 5,
  class: "dc-cell__text"
}, Sc = /* @__PURE__ */ oe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = we(), a = v(() => t.column.kind ?? "text"), s = v(() => Oe(t.column, t.entry.row)), l = v(
      () => a.value === "ordinal" ? t.entry.ordinal : jt(t.column, t.entry.row)
    ), o = v(() => s.value), r = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => Fn(t.column)), c = v(() => bs(t.column, t.entry.row));
    function d(m) {
      if (!r.value) return;
      m.stopPropagation();
      const y = Be(m);
      t.column.click?.(t.entry.row, y), t.column.activate && n.activate(t.entry.row, y);
    }
    return (m, y) => a.value === "component" && e.column.component ? (f(), J(Un(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), J(Xt, {
      key: 1,
      status: o.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), J(kn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Me({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), J(Yt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : r.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: At(["dc-table__open", { "dc-truncate": i.value }]),
      title: c.value,
      onClick: d
    }, O(l.value), 11, xc)) : (f(), h("span", Cc, O(l.value), 1));
  }
}), Qa = /* @__PURE__ */ ue(Sc, [["__scopeId", "data-v-70ba8aa2"]]), Mc = ["aria-label"], Ec = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Pc = /* @__PURE__ */ oe({
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
    ]), l = (r) => !n.mixed && n.standing === r;
    function o(r, i) {
      r.stopPropagation(), a("set", i);
    }
    return (r, i) => (f(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (f(!0), h(ne, null, he(s.value, (c) => (f(), h("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": l(c.standing) ? "true" : "false",
        "aria-checked": l(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => o(d, c.standing)
      }, O(c.sign), 9, Ec))), 128))
    ], 8, Mc));
  }
}), Za = /* @__PURE__ */ ue(Pc, [["__scopeId", "data-v-adaa8412"]]), Ac = {
  key: 0,
  class: "dc-table__none"
}, Tc = { class: "dc-table__detail" }, Lc = ["data-dc-wrap"], zc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Rc = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Fc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Nc = ["onClick"], Ic = {
  key: 2,
  class: "dc-table__head"
}, Oc = ["onClick"], Dc = {
  key: 0,
  class: "dc-table__pick"
}, Bc = {
  key: 1,
  class: "dc-table__standing"
}, qc = ["data-dc-align", "data-dc-hide", "title"], Kc = {
  key: 0,
  class: "dc-table__name"
}, Vc = /* @__PURE__ */ oe({
  __name: "TableView",
  setup(e) {
    const t = we(), n = gt(), a = $c();
    function s(w) {
      const V = sr(w, t.entity.value), N = V ? `Shortcut: ${V}` : void 0;
      return [w.hint, N].filter(Boolean).join(`
`) || void 0;
    }
    const l = v(
      () => a.value.find((w) => w.scope)
    ), o = v(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((w) => w.scope)
    ), r = (w) => Jn(w.entity, w.row), i = (w) => zs(t.query.value.expr, r(w));
    function c(w, V) {
      t.setExpression(Ua(t.query.value.expr, r(w), V));
    }
    const d = v(() => {
      const w = n.value.filter((N) => r(N) !== null), V = w.filter((N) => N.selected);
      return V.length ? V : w;
    }), m = v(() => d.value.some((w) => w.selected)), y = v(() => {
      const w = d.value[0];
      return w ? i(w) : null;
    }), k = v(
      () => d.value.some((w) => i(w) !== y.value)
    ), b = v(
      () => m.value ? "the ticked rows" : "every row on this page"
    );
    function C(w) {
      t.setExpression(
        d.value.reduce(
          (V, N) => Ua(V, r(N), w),
          t.query.value.expr
        )
      );
    }
    const _ = v(
      () => a.value.some((w) => w.kind === "image" || w.height !== void 0)
    );
    function x(w) {
      w && (t.query.value.sort === w ? t.toggleDirection() : t.setSort(w));
    }
    const F = v(() => t.entity.value?.label ?? "The result set"), z = v(() => new Set(t.sorts.value.map((w) => w.key))), M = (w) => w.sort !== void 0 && z.value.has(w.sort), L = (w) => {
      if (M(w))
        return t.query.value.sort !== w.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function K(w) {
      return [
        Ia(w),
        w.muted ? "dc-table__muted" : "",
        w.mono ? "dc-mono" : "",
        Fn(w) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function P(w, V) {
      if (!(!Fn(w) || w.activate || w.click))
        return bs(w, V.row);
    }
    return (w, V) => A(a).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": _.value ? "" : void 0
    }, [
      $("thead", null, [
        $("tr", null, [
          A(t).selectable.value ? (f(), h("th", zc, [
            ve(Hs)
          ])) : R("", !0),
          o.value ? (f(), h("th", Rc, [
            d.value.length ? (f(), J(Za, {
              key: 0,
              standing: y.value,
              mixed: k.value,
              name: b.value,
              onSet: C
            }, null, 8, ["standing", "mixed", "name"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), h(ne, null, he(A(a), (N, Y) => (f(), h("th", {
            key: A(Fa)(N, Y),
            scope: "col",
            class: At(A(Ia)(N)),
            style: Me({ width: N.width }),
            "data-dc-align": A(Na)(N),
            "data-dc-hide": N.hideBelow,
            "aria-sort": L(N),
            title: s(N)
          }, [
            M(N) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (G) => x(N.sort)
            }, O(N.label), 9, Nc)) : (f(), h(ne, { key: 1 }, [
              We(O(N.label), 1)
            ], 64)),
            N.header ? (f(), h("span", Ic, [
              (f(), J(Un(N.header), {
                column: N,
                entity: A(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : R("", !0)
          ], 14, Fc))), 128))
        ])
      ]),
      $("tbody", null, [
        (f(!0), h(ne, null, he(A(n), (N) => (f(), h("tr", {
          key: N.key,
          class: "dc-table__row",
          onClick: (Y) => A(t).activate(N.row, A(Be)(Y))
        }, [
          A(t).selectable.value ? (f(), h("td", Dc, [
            ve(_t, {
              row: N.row,
              selected: N.selected,
              name: N.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : R("", !0),
          o.value ? (f(), h("td", Bc, [
            r(N) !== null ? (f(), J(Za, {
              key: 0,
              standing: i(N),
              name: N.parts.identity,
              onSet: (Y) => c(N, Y)
            }, null, 8, ["standing", "name", "onSet"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), h(ne, null, he(A(a), (Y, G) => (f(), h("td", {
            key: A(Fa)(Y, G),
            class: At(K(Y)),
            "data-dc-align": A(Na)(Y),
            "data-dc-hide": Y.hideBelow,
            title: P(Y, N)
          }, [
            Y === l.value ? (f(), h("span", Kc, [
              ve(Qa, {
                column: Y,
                entry: N
              }, null, 8, ["column", "entry"]),
              ve(Qt, { entry: N }, null, 8, ["entry"])
            ])) : (f(), J(Qa, {
              key: 1,
              column: Y,
              entry: N
            }, null, 8, ["column", "entry"]))
          ], 10, qc))), 128))
        ], 8, Oc))), 128))
      ])
    ], 8, Lc)) : (f(), h("p", Ac, [
      V[2] || (V[2] = $("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      $("span", Tc, [
        We(O(F.value) + " has no ", 1),
        V[0] || (V[0] = $("code", null, "columns", -1)),
        V[1] || (V[1] = We(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Js = /* @__PURE__ */ ue(Vc, [["__scopeId", "data-v-98495b60"]]);
function Wc(e) {
  const t = Pt([]), n = W(!1), a = Pt(null);
  let s = 0;
  const l = (i, c, d, m, y) => ({
    entity: i,
    rows: c.rows.map(
      (k, b) => js(k, b, i, e.isPinned(k.id))
    ),
    total: c.total,
    count: d ? i.count : String(c.total),
    pinned: Hc(m, c, y)
  }), o = () => {
    const i = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, y = e.limit.value, k = e.within?.value.trim() ?? "", b = Xn(c) && !k, C = k ? Zn(k, c.expr) : c.expr, _ = m.map((x) => ({
      entity: x,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: x.key, expr: C, facets: Tt(x), page: 1 },
        schema: d,
        entity: x,
        limit: y,
        offset: 0
      })
    }));
    if (_.every(({ outcome: x }) => !(x instanceof Promise))) {
      t.value = _.map(
        ({ entity: x, outcome: F }) => l(x, F, b, d, C)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(_.map(({ outcome: x }) => Promise.resolve(x))).then((x) => {
      i === s && (t.value = x.map(
        (F, z) => l(_[z].entity, F, b, d, C)
      ), a.value = null);
    }).catch((x) => {
      i === s && (a.value = x, t.value = []);
    }).finally(() => {
      i === s && (n.value = !1);
    });
  }, r = () => {
    try {
      o();
    } catch (i) {
      a.value = i, t.value = [], n.value = !1;
    }
  };
  return be(
    [
      e.source,
      e.schema,
      e.query,
      e.entities,
      e.limit,
      () => e.within?.value
    ],
    r,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: r };
}
function Hc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = ea(e, a);
  return !!l && ta(s, l) === s;
}
const Uc = ["data-dc-pending"], jc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Gc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Xc = {
  key: 2,
  class: "dc-types__state"
}, Yc = ["data-dc-empty"], Qc = ["onClick"], Zc = { class: "dc-type__name" }, Jc = { class: "dc-type__count dc-mono" }, eu = { class: "dc-type__sr" }, tu = {
  key: 0,
  class: "dc-type__empty"
}, nu = ["onClick"], au = { class: "dc-type__identity" }, su = { class: "dc-type__primary dc-truncate" }, lu = { class: "dc-type__secondary dc-mono dc-truncate" }, ru = { class: "dc-type__trailing dc-mono" }, ou = { class: "dc-type__metric-value" }, iu = { class: "dc-type__metric-label" }, cu = {
  key: 0,
  class: "dc-type__date"
}, uu = ["onClick"], du = /* @__PURE__ */ oe({
  __name: "TypeCardsView",
  setup(e) {
    const t = we(), { previews: n, pending: a, error: s } = Wc({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (r) => t.isPinnedId(r)
    }), l = v(() => !t.isPristine.value || !!t.within.value), o = v(
      () => n.value.filter(
        (r) => !r.pinned && (r.rows.length > 0 || r.entity.create)
      )
    );
    return (r, i) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": A(a) ? "true" : "false"
    }, [
      $e(r.$slots, "before", {}, void 0, !0),
      A(s) ? (f(), h("p", jc, " Could not load results: " + O(A(s) instanceof Error ? A(s).message : "the data source failed."), 1)) : !o.value.length && A(a) ? (f(), h("p", Gc, " Running query… ")) : o.value.length ? R("", !0) : (f(), h("p", Xc, O(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(ne, null, he(o.value, (c) => (f(), h("section", {
        key: c.entity.key,
        class: "dc-type",
        "data-dc-empty": c.rows.length ? "false" : "true"
      }, [
        $("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => A(t).setEntity(c.entity.key)
        }, [
          $("span", Zc, O(c.entity.label), 1),
          $("span", Jc, O(c.count), 1),
          i[0] || (i[0] = $("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          $("span", eu, "Show only " + O(c.entity.label.toLowerCase()), 1)
        ], 8, Qc),
        c.rows.length ? R("", !0) : (f(), h("p", tu, O(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(ne, null, he(c.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          $("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (m) => A(t).activate(d.row, A(Be)(m))
          }, [
            $("span", au, [
              $("span", su, O(d.parts.identity), 1),
              $("span", lu, O(d.parts.reference), 1)
            ])
          ], 8, nu),
          $("span", ru, [
            (f(!0), h(ne, null, he(d.parts.metrics.slice(0, 1), (m) => (f(), J(Yt, {
              key: m.column.key ?? m.label,
              class: "dc-type__metric",
              entry: d,
              column: m.column
            }, {
              default: Qe(() => [
                $("span", ou, O(m.text), 1),
                $("span", iu, O(m.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", cu, O(d.parts.updated), 1)) : R("", !0),
            ve(bn, { entry: d }, null, 8, ["entry"]),
            ve(Qt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        c.entity.create ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => A(t).create(c.entity)
        }, [
          i[1] || (i[1] = $("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          We(" " + O(c.entity.create), 1)
        ], 8, uu)) : R("", !0)
      ], 8, Yc))), 128)),
      $e(r.$slots, "after", {}, void 0, !0)
    ], 8, Uc));
  }
}), el = /* @__PURE__ */ ue(du, [["__scopeId", "data-v-c7b8f990"]]), fu = ["data-dc-pending"], pu = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, vu = { class: "dc-results__detail" }, hu = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, mu = {
  key: 3,
  class: "dc-results__state"
}, gu = { class: "dc-results__detail" }, _u = /* @__PURE__ */ oe({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = we(), a = Ut(), s = {
      list: In,
      cards: Gs,
      grid: Xs,
      images: Ys,
      table: Js,
      links: Qs,
      preview: Zs
    }, l = v(() => Yn(n.query.value)), o = v(() => jn(n.query.value.view, t.views)), r = v(() => s[o.value] ?? In), i = v(() => n.rows.value.length > 0), c = v(() => n.error.value !== null), d = W(null);
    return be(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (m, y) => (f(), h("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": A(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), J(el, { key: 0 }, on({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Qe(() => [
            $e(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Qe(() => [
            $e(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), h("p", pu, [
        y[1] || (y[1] = $("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        $("span", vu, O(A(n).error.value instanceof Error ? A(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && A(n).pending.value ? (f(), h("p", hu, [...y[2] || (y[2] = [
        $("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), J(Un(r.value), { key: 4 })) : (f(), h("div", mu, [
        y[3] || (y[3] = $("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        $("span", gu, O(A(n).summary.value), 1),
        A(n).isPristine.value ? R("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: y[0] || (y[0] = (k) => A(n).clearFilters())
        }, O(A(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, fu));
  }
}), tl = /* @__PURE__ */ ue(_u, [["__scopeId", "data-v-c131c5c3"]]), yu = ["data-dc-theme"], wu = ["data-dc-width", "data-dc-align"], ku = { class: "dc-shell__panel" }, bu = /* @__PURE__ */ oe({
  __name: "DataShell",
  props: /* @__PURE__ */ mn({
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
  emits: /* @__PURE__ */ mn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Ot(e, "open"), o = Ot(e, "pinned"), r = Ot(e, "selected"), i = Ut(), c = Et(ds, null), d = a.route || c ? null : Bl(), m = a.route ?? c ?? d;
    De(() => d?.dispose?.());
    const y = v(() => kr({ seed: a.schema.key })), k = v(() => a.source ?? y.value), b = Lr({
      schema: () => a.schema,
      adapter: m,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), C = v(() => a.within?.trim() ?? ""), _ = zr({
      source: k,
      query: b.query,
      schema: v(() => a.schema),
      entity: b.entity,
      limit: v(() => a.limit),
      within: C
    });
    be(b.query, (S) => s("query-change", S)), be(
      [_.pageCount, _.pending, b.query],
      () => {
        if (_.pending.value) return;
        const S = _.pageCount.value;
        b.query.value.page > S && b.setPage(S, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const x = Hn() ?? "dc-query-panel", F = W(null);
    function z() {
      l.value && (l.value = !1, Vt(() => {
        F.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const M = v(() => new Set(o.value));
    function L(S) {
      const D = new Set(M.value);
      D.has(S.id) ? D.delete(S.id) : D.add(S.id), o.value = [...D], s("toggle-pin", S);
    }
    const K = v(() => {
      if (a.selectable === !0) return !0;
      const S = b.entity.value;
      return !!(S?.duplicate || S?.delete);
    }), P = v(() => new Set(r.value));
    function w(S) {
      const D = new Set(P.value);
      D.has(S.id) ? D.delete(S.id) : D.add(S.id), r.value = [...D];
    }
    function V(S) {
      const D = new Set(P.value);
      for (const j of _.rows.value)
        S ? D.add(j.id) : D.delete(j.id);
      r.value = [...D];
    }
    function N() {
      r.value.length && (r.value = []);
    }
    const Y = v(() => ({
      ids: [...r.value],
      rows: _.rows.value.filter((S) => P.value.has(S.id)),
      entity: b.entity.value
    }));
    be(() => b.query.value.entity, N);
    function G(S, D, j = {}) {
      const le = br(a.schema, b.query.value, S, j);
      j.exclude ? b.narrow(le, D?.key ?? b.query.value.entity) : b.narrow(le, D?.key ?? null, D ? void 0 : "cards"), s("drill", S, D, j);
    }
    const ge = $r({
      ...b,
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
      source: k,
      previewsPerType: v(() => a.previewsPerType),
      within: C,
      pinnable: v(() => a.pinnable === !0),
      isPinned: (S) => M.value.has(S.id),
      isPinnedId: (S) => M.value.has(S),
      togglePin: L,
      selectable: K,
      selection: Y,
      isSelected: (S) => P.value.has(S.id),
      toggleSelect: w,
      selectPage: V,
      clearSelection: N,
      narrowsOnPress: v(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (S, D = {}) => {
        if (a.rowPress === "narrow" && ea(a.schema, S)) {
          G(S, null, D);
          return;
        }
        s("activate", S);
      },
      create: (S) => s("create", S),
      duplicate: () => s("duplicate", Y.value),
      delete: () => s("delete", Y.value),
      drill: G
    }), ie = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: z
    }), (S, D) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Me(ie.value)
    }, [
      $("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ve(Ks, {
          ref_key: "headerRef",
          ref: F,
          expanded: l.value,
          "panel-id": A(x),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: D[0] || (D[0] = (j) => l.value = !l.value)
        }, on({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Qe(() => [
              $e(S.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), h(ne, { key: 0 }, [
          $("div", {
            class: "dc-shell__scrim",
            onClick: z
          }),
          $("div", ku, [
            ve(Ws, {
              "panel-id": A(x),
              onClose: z
            }, on({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Qe(() => [
                  $e(S.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : R("", !0)
      ], 8, wu),
      ve(Us, { views: e.views }, null, 8, ["views"]),
      $e(S.$slots, "results", {
        rows: A(ge).rows.value,
        total: A(ge).total.value,
        offset: A(ge).offset.value,
        pageCount: A(ge).pageCount.value,
        query: A(ge).query.value,
        pending: A(ge).pending.value
      }, () => [
        ve(tl, { views: e.views }, on({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: Qe(() => [
              $e(S.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Qe(() => [
              $e(S.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, yu));
  }
}), $u = /* @__PURE__ */ ue(bu, [["__scopeId", "data-v-a366aa47"]]), xu = ["data-dc-muted"], Cu = {
  key: 0,
  class: "dc-shell-card__head"
}, Su = { class: "dc-shell-card__title" }, Mu = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Eu = {
  key: 0,
  class: "dc-shell-card__aside"
}, Pu = ["data-dc-flush"], Au = {
  key: 2,
  class: "dc-shell-card__foot"
}, Tu = /* @__PURE__ */ oe({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), a = Ut();
    function s(d) {
      return l(d?.() ?? []);
    }
    function l(d) {
      return d.some((m) => m.type === Il ? !1 : m.type === Ol ? String(m.children ?? "").trim().length > 0 : m.type === ne ? l(m.children ?? []) : !0);
    }
    const o = v(() => !!t.title || r.value || s(a.head)), r = v(() => s(a.aside)), i = v(() => s(a.default)), c = v(() => s(a.foot));
    return (d, m) => (f(), h("section", {
      class: "dc-shell-card",
      style: Me(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      o.value ? (f(), h("header", Cu, [
        $e(d.$slots, "head", {}, () => [
          $("h2", Su, O(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Mu, O(e.count), 1)) : R("", !0)
        ], !0),
        r.value ? (f(), h("span", Eu, [
          $e(d.$slots, "aside", {}, void 0, !0)
        ])) : R("", !0)
      ])) : R("", !0),
      i.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        $e(d.$slots, "default", {}, void 0, !0)
      ], 8, Pu)) : R("", !0),
      c.value ? (f(), h("footer", Au, [
        $e(d.$slots, "foot", {}, void 0, !0)
      ])) : R("", !0)
    ], 12, xu));
  }
}), vf = /* @__PURE__ */ ue(Tu, [["__scopeId", "data-v-75f2ef0b"]]), Lu = ["aria-label"], zu = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Ru = /* @__PURE__ */ oe({
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
    function l(o, r) {
      const i = n.options.length;
      let c = null;
      if (o.key === "ArrowRight" || o.key === "ArrowDown" ? c = (r + 1) % i : o.key === "ArrowLeft" || o.key === "ArrowUp" ? c = (r - 1 + i) % i : o.key === "Home" ? c = 0 : o.key === "End" && (c = i - 1), c === null) return;
      o.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (o, r) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(ne, null, he(e.options, (i, c) => (f(), h("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: At(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", i.key),
        onKeydown: (d) => l(d, c)
      }, O(i.label), 43, zu))), 128))
    ], 8, Lu));
  }
}), Fu = /* @__PURE__ */ ue(Ru, [["__scopeId", "data-v-63fb5482"]]), Nu = ["data-dc-theme", "aria-label"], Iu = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Ou = /* @__PURE__ */ oe({
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
    }), s = t, l = W(null), o = W([]), r = W(null), i = W(null), c = W(!1), d = v(
      () => n.menus.flatMap((M, L) => Dt(M) ? [L] : [])
    );
    function m(M, L) {
      const K = o.value[M]?.getBoundingClientRect(), P = n.menus[M];
      !K || !P || !Dt(P) || (i.value = { x: K.left, y: K.bottom + 2, mirrorX: K.right }, r.value = M, c.value = L);
    }
    function y(M) {
      const L = r.value;
      r.value = null, i.value = null, M && L !== null && o.value[L]?.focus();
    }
    function k(M) {
      r.value === M ? y(!0) : m(M, !1);
    }
    function b(M) {
      r.value === null || r.value === M || m(M, !1);
    }
    function C(M, L) {
      const K = d.value;
      if (K.length === 0) return null;
      if (M === null) return L === 1 ? K[0] ?? null : K[K.length - 1] ?? null;
      const P = K.indexOf(M);
      return P === -1 ? K[0] ?? null : K[(P + L + K.length) % K.length] ?? null;
    }
    function _(M) {
      const L = M.key;
      if (L === "Escape") {
        if (r.value === null) return;
        M.preventDefault(), y(!0);
        return;
      }
      if (L === "ArrowDown" && r.value === null) {
        const w = x();
        if (w === null) return;
        M.preventDefault(), m(w, !0);
        return;
      }
      if (L !== "ArrowLeft" && L !== "ArrowRight") return;
      const K = r.value ?? x(), P = C(K, L === "ArrowRight" ? 1 : -1);
      P !== null && (M.preventDefault(), r.value !== null ? m(P, !0) : o.value[P]?.focus());
    }
    function x() {
      const M = o.value.findIndex((L) => L === document.activeElement);
      return M === -1 ? d.value[0] ?? null : M;
    }
    function F(M) {
      const L = M.target;
      !L || l.value?.contains(L) || y(!1);
    }
    be(r, (M) => {
      M !== null ? window.addEventListener("pointerdown", F, !0) : window.removeEventListener("pointerdown", F, !0);
    }), De(() => window.removeEventListener("pointerdown", F, !0));
    function z(M) {
      y(!0), M.action?.(), s("choose", M);
    }
    return (M, L) => (f(), h("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Me(a.value),
      onKeydown: _
    }, [
      (f(!0), h(ne, null, he(e.menus, (K, P) => (f(), h("button", {
        key: K.id ?? K.label ?? P,
        ref_for: !0,
        ref: (w) => {
          w && (o.value[P] = w);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": r.value === P,
        "aria-disabled": K.disabled ? "true" : void 0,
        disabled: K.disabled,
        "data-dc-menu": K.id ?? K.label,
        tabindex: P === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (w) => k(P),
        onMouseenter: (w) => b(P)
      }, O(K.label), 41, Iu))), 128)),
      r.value !== null && i.value ? (f(), J(ua, {
        key: r.value,
        items: e.menus[r.value]?.items ?? [],
        at: i.value,
        label: e.menus[r.value]?.label,
        autofocus: c.value,
        onChoose: z,
        onDismiss: L[0] || (L[0] = (K) => y(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 44, Nu));
  }
}), hf = /* @__PURE__ */ ue(Ou, [["__scopeId", "data-v-93dbd2e4"]]), Du = ["aria-label", "aria-expanded", "disabled"], Bu = { "aria-hidden": "true" }, qu = /* @__PURE__ */ oe({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = W(null), s = W(null), l = W(null), o = W(!1), r = v(() => l.value !== null);
    function i(b) {
      const C = a.value?.getBoundingClientRect();
      C && (l.value = { x: C.left, y: C.bottom + 4, mirrorX: C.right }, o.value = b);
    }
    function c(b) {
      l.value = null, b && a.value?.focus();
    }
    function d() {
      r.value ? c(!0) : i(!1);
    }
    function m(b) {
      b.key !== "ArrowDown" || r.value || (b.preventDefault(), i(!0));
    }
    function y(b) {
      const C = b.target;
      C && (a.value?.contains(C) || s.value?.root?.contains(C) || c(!1));
    }
    be(r, (b) => {
      b ? window.addEventListener("pointerdown", y, !0) : window.removeEventListener("pointerdown", y, !0);
    }), De(() => window.removeEventListener("pointerdown", y, !0));
    function k(b) {
      c(!0), b.action?.(), n("choose", b);
    }
    return (b, C) => (f(), h(ne, null, [
      $("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": r.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: m
      }, [
        $("span", Bu, O(e.glyph), 1)
      ], 40, Du),
      l.value ? (f(), J(ua, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: o.value,
        onChoose: k,
        onDismiss: C[0] || (C[0] = (_) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 64));
  }
}), fa = /* @__PURE__ */ ue(qu, [["__scopeId", "data-v-48f5ada5"]]), zt = (e) => e.kind === "split", X = (e) => e.kind === "group", ae = (e) => e.kind === "float", pt = { x: 16, y: 16, w: 360, h: 260 }, _n = 28, nl = 120, On = 220, al = 38, kt = 6;
function Zt(e, t) {
  let n = !1;
  const a = e.frames.map((s, l) => {
    const o = t(s.node, l);
    return o === s.node ? s : (n = !0, { ...s, node: o });
  });
  return n ? { ...e, frames: a } : e;
}
function Ze(e) {
  return { kind: "group", panels: [e] };
}
function mf(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const me = (e) => typeof e == "string", pa = (e) => me(e) ? Ze(e) : e, Jt = (e) => me(e) ? [e] : at(e), Ja = (e) => e.panels.filter(me), Ku = (e) => e.panels.filter((t) => !me(t)), Ie = (e, t) => e.panels.includes(t);
function en(e, t, n) {
  let a = !1;
  const s = e.panels.map((l) => {
    if (me(l) || !ce(l, t)) return l;
    const o = n(l);
    return o !== l && (a = !0), o;
  });
  return a ? { ...e, panels: s } : e;
}
function $n(e, t) {
  return { node: e, rect: { ...pt, ...t } };
}
function va(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function ha(e, t) {
  const n = { ...pt, ...t };
  return va(
    e.map(
      (a, s) => $n(a, {
        ...n,
        x: n.x + s * _n,
        y: n.y + s * _n
      })
    )
  );
}
function ma(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const ga = (e, t, n) => ma("row", e, t, n), gf = (e, t, n) => ma("column", e, t, n);
function ke(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const mt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, _f = (e) => ({ ...e, headless: !0 }), yf = (e) => ({ ...e, fixedView: !0 }), Vu = (e) => e === "left" || e === "right" ? "row" : "column";
function at(e) {
  return X(e) ? e.panels.flatMap(Jt) : ae(e) ? e.frames.flatMap((t) => at(t.node)) : e.children.flatMap(at);
}
function ce(e, t) {
  return X(e) ? e.panels.some((n) => me(n) ? n === t : ce(n, t)) : ae(e) ? e.frames.some((n) => ce(n.node, t)) : e.children.some((n) => ce(n, t));
}
const sl = (e) => at(e).length === 0, Dn = (e) => !X(e) && mt(e), Bn = (e) => sl(e) && !Dn(e);
function xn(e) {
  return zt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ae(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => me(t) ? [] : [{ node: t, index: n }]);
}
const _a = (e) => xn(e).map((t) => t.node);
function yt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => me(a) ? a === t : ce(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function ll(e) {
  const t = e.panels[yt(e)];
  return t !== void 0 && me(t) ? t : "";
}
function Te(e) {
  if (me(e)) return e;
  if (X(e)) {
    const n = e.panels[yt(e)];
    return n === void 0 ? "" : Te(n);
  }
  if (ae(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Te(n.node) : "";
  }
  const t = e.children[0];
  return t ? Te(t) : "";
}
function xt(e, t) {
  if (X(e) && Ie(e, t)) return e;
  for (const n of _a(e)) {
    const a = xt(n, t);
    if (a) return a;
  }
  return null;
}
function Wu(e) {
  const t = _a(e).flatMap(Wu);
  return X(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (X(e)) {
    for (const n of Ku(e)) {
      const a = Se(n, t);
      if (a) return a;
    }
    return null;
  }
  if (ae(e)) {
    for (const n of e.frames)
      if (ce(n.node, t))
        return Se(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Se(n, t);
    if (a) return a;
  }
  return null;
}
function Tn(e, t, n = nl) {
  const a = (r, i) => i > 0 ? Math.max(Math.min(r, i), Math.min(n, i)) : Math.max(r, n), s = a(e.w, t.w), l = a(e.h, t.h), o = (r, i, c) => Math.min(Math.max(r, 0), Math.max(c - i, 0));
  return {
    x: Math.round(o(e.x, s, t.w)),
    y: Math.round(o(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function es(e, t, n, a, s = nl) {
  let { x: l, y: o, w: r, h: i } = e;
  return t.includes("e") && (r = e.w + n), t.includes("w") && (r = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + a), t.includes("n") && (i = e.h - a, o = e.y + a), r < s && (t.includes("w") && (l = e.x + e.w - s), r = s), i < s && (t.includes("n") && (o = e.y + e.h - s), i = s), { x: l, y: o, w: r, h: i };
}
const rl = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function Ct(e, t, n) {
  if (X(e)) return en(e, t, (l) => Ct(l, t, n));
  if (ae(e)) {
    let l = !1;
    const o = e.frames.map((r) => {
      if (!ce(r.node, t)) return r;
      if (Se(r.node, t)) {
        const c = Ct(r.node, t, n);
        return c === r.node ? r : (l = !0, { ...r, node: c });
      }
      const i = n(r);
      return i === r ? r : (l = !0, i);
    });
    return l ? { ...e, frames: o } : e;
  }
  if (!ce(e, t)) return e;
  let a = !1;
  const s = e.children.map((l) => {
    const o = Ct(l, t, n);
    return o !== l && (a = !0), o;
  });
  return a ? { ...e, children: s } : e;
}
function Hu(e, t, n) {
  return Ct(e, t, (a) => rl(a.rect, n) ? a : { ...a, rect: n });
}
const lt = (e) => e.maximized === !0, ol = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Uu(e, t, n = !0) {
  return Ct(e, t, ol(n));
}
function wf(e, t) {
  const n = Se(e, t);
  return n ? Uu(e, t, !lt(n)) : e;
}
const ft = (e) => e.minimized === !0, il = (e) => (t) => {
  if (ft(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function ju(e, t, n = !0) {
  return Ct(e, t, il(n));
}
function kf(e, t) {
  const n = Se(e, t);
  return n ? ju(e, t, !ft(n)) : e;
}
function dt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = it(e, t.slice(0, -1));
  return !a || !ae(a) ? null : a.frames[n] ?? null;
}
function qn(e, t) {
  if (ae(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!ce(a.node, t)) continue;
      const s = qn(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of xn(e)) {
    if (!ce(n, t)) continue;
    const s = qn(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function ya(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), l = it(e, s);
  if (!l || !ae(l)) return e;
  const o = l.frames[a];
  if (!o) return e;
  const r = n(o);
  if (r === o) return e;
  const i = [...l.frames];
  return i[a] = r, ht(e, s, { ...l, frames: i });
}
function ts(e, t, n) {
  return ya(
    e,
    t,
    (a) => rl(a.rect, n) ? a : { ...a, rect: n }
  );
}
function Gu(e, t, n = !0) {
  return ya(e, t, ol(n));
}
function Xu(e, t, n = !0) {
  return ya(e, t, il(n));
}
function Bt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (ae(e)) {
    const o = e.frames[n];
    if (!o) return e;
    const r = Bt(o.node, a), i = r === o.node ? o : { ...o, node: r };
    if (n === e.frames.length - 1 && i === o) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(i), { ...e, frames: c };
  }
  const s = it(e, [n]);
  if (!s) return e;
  const l = Bt(s, a);
  return l === s ? e : ht(e, [n], l);
}
function Yu(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (ae(a) && (n[l] = a.frames.length - 1), a = it(a, [s]));
  }), n;
}
function dn(e, t, n, a) {
  if (X(e)) return en(e, n, (o) => dn(o, t, n, a));
  if (ae(e)) {
    const o = e.frames.findIndex((i) => ce(i.node, n)), r = e.frames[o];
    if (!r) return e;
    if (Se(r.node, n)) {
      const i = dn(r.node, t, n, a);
      if (i === r.node) return e;
      const c = [...e.frames];
      return c[o] = { ...r, node: i }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, $n(Ze(t), a)] };
  }
  if (!ce(e, n)) return e;
  let s = !1;
  const l = e.children.map((o) => {
    const r = dn(o, t, n, a);
    return r !== o && (s = !0), r;
  });
  return s ? { ...e, children: l } : e;
}
function ns(e, t, n, a) {
  if (t === n || !ce(e, t) || !ce(e, n) || !Se(e, n)) return e;
  const s = vt(e, t);
  if (!s) return e;
  const l = dn(s, t, n, a);
  return l === s ? e : xe(l);
}
function Qu(e, t, n) {
  return ae(e) ? { ...e, frames: [...e.frames, $n(Ze(t), n)] } : X(e) ? ul(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ze(t)],
    sizes: [...nt(e), 1],
    ...ke(e)
  };
}
function cl(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Qu(e, t, a);
  const l = n.slice(1), o = (d, m) => m === s ? cl(d, t, l, a) : vt(d, t);
  if (ae(e)) {
    const d = e.frames.flatMap((m, y) => {
      const k = o(m.node, y);
      return k ? [k === m.node ? m : { ...m, node: k }] : [];
    });
    return { ...e, frames: d };
  }
  if (X(e)) {
    const d = yt(e), m = [];
    e.panels.forEach((b, C) => {
      if (me(b)) {
        b !== t && m.push(b);
        return;
      }
      const _ = o(b, C);
      _ && m.push(_);
    });
    const k = e.active && m.some((b) => Jt(b).includes(e.active)) ? e.active : Te(m[d] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...k ? { active: k } : {},
      ...ke(e)
    };
  }
  const r = nt(e), i = [], c = [];
  return e.children.forEach((d, m) => {
    const y = o(d, m);
    y && (i.push(y), c.push(r[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: c, ...ke(e) };
}
function as(e, t, n, a) {
  const s = it(e, n);
  return !s || !sl(s) || !ce(e, t) ? e : xe(cl(e, t, n, a));
}
function Ln(e, t) {
  if (X(e)) return en(e, t, (s) => Ln(s, t));
  if (ae(e)) {
    const s = e.frames.findIndex((c) => ce(c.node, t)), l = e.frames[s];
    if (!l) return e;
    const o = Ln(l.node, t), r = o === l.node ? l : { ...l, node: o };
    if (s === e.frames.length - 1 && r === l) return e;
    const i = [...e.frames];
    return i.splice(s, 1), i.push(r), { ...e, frames: i };
  }
  if (!ce(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = Ln(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function wa(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), s = a.reduce((l, o) => l + o, 0);
  return s <= 0 ? n() : a.map((l) => l / s);
}
const nt = (e) => wa(e.children.length, e.sizes), He = (e) => {
  const t = X(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function xe(e) {
  if (X(e)) return Zu(e);
  if (ae(e)) {
    const r = e.frames.flatMap((i) => {
      const c = xe(i.node);
      return Bn(c) ? [] : [c === i.node ? i : { ...i, node: c }];
    });
    return r.length === e.frames.length && r.every((i, c) => i === e.frames[c]) ? e : { ...e, frames: r };
  }
  if (e.children.length === 0) return e;
  const t = nt(e), n = He(e), a = [], s = [], l = [];
  e.children.forEach((r, i) => {
    const c = xe(r), d = t[i] ?? 0;
    if (Bn(c)) return;
    if (!n && zt(c) && c.direction === e.direction && !He(c) && !mt(c)) {
      const y = nt(c);
      c.children.forEach((k, b) => {
        a.push(k), s.push(d * (y[b] ?? 0));
      });
      return;
    }
    a.push(c), s.push(d);
    const m = n?.[i];
    m && l.push(m);
  });
  const o = a[0];
  return a.length === 1 && o && !mt(e) ? o : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: wa(a.length, s),
    ...ke(e),
    ...l.length === a.length && l.length > 0 ? { places: l } : {}
  };
}
function Zu(e) {
  if (e.panels.every(me)) return e;
  const t = Te(e), n = He(e), a = [], s = [];
  e.panels.forEach((r, i) => {
    const c = n?.[i];
    if (me(r)) {
      a.push(r), c && s.push(c);
      return;
    }
    const d = xe(r);
    if (!Bn(d)) {
      if (X(d) && !mt(d) && !He(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), c && s.push(c);
    }
  });
  const l = a[0];
  if (a.length === 1 && l !== void 0 && !me(l) && !mt(e))
    return l;
  if (a.length === e.panels.length && a.every((r, i) => r === e.panels[i]))
    return e;
  const o = t && a.some((r) => Jt(r).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...o ? { active: o } : {},
    ...ke(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function vt(e, t) {
  if (ae(e)) {
    const o = e.frames.flatMap((r) => {
      const i = vt(r.node, t);
      return i ? [i === r.node ? r : { ...r, node: i }] : [];
    });
    return o.length === 0 && !Dn(e) ? null : { ...e, frames: o };
  }
  if (X(e)) {
    if (!ce(e, t)) return e;
    const o = yt(e), r = [];
    for (const d of e.panels) {
      if (me(d)) {
        d !== t && r.push(d);
        continue;
      }
      const m = vt(d, t);
      m && r.push(m);
    }
    if (r.length === 0) return null;
    const c = e.active && r.some((d) => Jt(d).includes(e.active)) ? e.active : Te(r[o] ?? r[r.length - 1]);
    return c ? { kind: "group", panels: r, active: c, ...ke(e) } : { kind: "group", panels: r, ...ke(e) };
  }
  const n = nt(e), a = [], s = [];
  if (e.children.forEach((o, r) => {
    const i = vt(o, t);
    i && (a.push(i), s.push(n[r] ?? 0));
  }), a.length === 0)
    return Dn(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...ke(e) } : null;
  const l = a[0];
  return a.length === 1 && l && !mt(e) ? l : xe({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...ke(e)
  });
}
function ul(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...ke(e) };
}
function It(e, t, n, a, s) {
  const l = (k) => Zt(
    k,
    (b) => ce(b, n) ? It(b, t, n, a, s) : b
  );
  if (a === "float") return e;
  const o = (k) => en(k, n, (b) => It(b, t, n, a, s));
  if (a === "center")
    return X(e) ? Ie(e, n) ? ul(e, t, s) : o(e) : ae(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (k) => ce(k, n) ? It(k, t, n, a, s) : k
      )
    };
  const r = Vu(a), i = a === "left" || a === "top", c = (k) => ({
    kind: "split",
    direction: r,
    children: i ? [Ze(t), k] : [k, Ze(t)],
    sizes: [0.5, 0.5]
  });
  if (X(e)) return Ie(e, n) ? c(e) : o(e);
  if (ae(e)) return l(e);
  const d = nt(e), m = e.children.findIndex(
    (k) => X(k) && Ie(k, n)
  );
  if (m >= 0 && e.direction === r) {
    const k = (d[m] ?? 0) / 2, b = [...e.children], C = [...d];
    return b.splice(i ? m : m + 1, 0, Ze(t)), C.splice(m, 1, k, k), {
      kind: "split",
      direction: r,
      children: b,
      sizes: C,
      ...ke(e)
    };
  }
  const y = e.children.map((k) => ce(k, n) ? X(k) && Ie(k, n) ? c(k) : It(k, t, n, a) : k);
  return {
    kind: "split",
    direction: e.direction,
    children: y,
    sizes: d,
    ...ke(e)
  };
}
function St(e, t) {
  if (X(e)) {
    if (Ie(e, t))
      return ll(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((i) => !me(i) && ce(i, t)), l = e.panels[s];
    if (l === void 0 || me(l)) return e;
    const o = St(l, t);
    if (o === l && e.active === t) return e;
    const r = [...e.panels];
    return r[s] = o, { ...e, panels: r, active: t };
  }
  if (!ce(e, t)) return e;
  if (ae(e)) return Zt(e, (s) => St(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const l = St(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function qt(e, t, n) {
  if (X(e)) {
    if (!Ie(e, t)) return en(e, t, (c) => qt(c, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const l = [...e.panels];
    l.splice(a, 1), l.splice(s, 0, t);
    const o = He(e), r = o ? [...o] : void 0;
    r && r.splice(s, 0, ...r.splice(a, 1));
    const i = Te(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ...ke(e),
      ...r ? { places: r } : {}
    };
  }
  return ce(e, t) ? ae(e) ? Zt(e, (a) => qt(a, t, n)) : { ...e, children: e.children.map((a) => qt(a, t, n)) } : e;
}
function fn(e, t, n) {
  if (t === n) return e;
  if (X(e)) {
    if (!ce(e, t) && !ce(e, n)) return e;
    const a = (l) => l === t ? n : l === n ? t : l, s = e.panels.map((l) => me(l) ? a(l) : fn(l, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return ae(e) ? Zt(e, (a) => fn(a, t, n)) : { ...e, children: e.children.map((a) => fn(a, t, n)) };
}
function ln(e, t, n, a, s) {
  if (a === "float" || !ce(e, t) || !ce(e, n)) return e;
  const l = xt(e, t);
  if (a === "center" && l && Ie(l, n)) {
    if (s === void 0) return e;
    const r = l.panels.indexOf(t), i = s > r ? s - 1 : s;
    return i === r ? e : St(qt(e, t, i), t);
  }
  if (t === n) return e;
  const o = vt(e, t);
  return o ? xe(It(o, t, n, a, s)) : e;
}
function dl(e, t, n) {
  if (X(e)) {
    const s = e.panels[t];
    if (s === void 0 || me(s)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (ae(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const l = [...e.frames];
    return l[t] = { ...s, node: n }, { ...e, frames: l };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function tn(e, t, n) {
  const a = xn(e);
  if (!X(e) && a.some(({ node: s }) => X(s) && Ie(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: l } of a) {
    if (!ce(s, t)) continue;
    const o = tn(s, t, n);
    return o ? dl(e, l, o) : null;
  }
  return null;
}
function bf(e, t, n) {
  const a = tn(
    e,
    t,
    (s) => zt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? xe(a) : e;
}
function fl(e) {
  return ae(e) ? [e] : He(e) || mt(e) ? [e] : X(e) ? [...e.panels] : e.children.flatMap(fl);
}
function pl(e, t) {
  if (X(e)) return e;
  const n = _a(e).map(fl), a = n.flat(), s = t && a.some((o) => Jt(o).includes(t)) ? t : void 0, l = Ju(e, n);
  return xe({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...ke(e),
    ...l ? { places: l } : {}
  });
}
function Ju(e, t) {
  const n = ae(e) ? e.frames.map(({ node: a, ...s }) => s) : He(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function ed(e, t) {
  const n = tn(e, t, (a) => pl(a, t));
  return n ? xe(n) : e;
}
function ka(e, t, n) {
  if (X(e) && Ie(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of xn(e)) {
    if (!ce(a, t)) continue;
    const l = ka(a, t, n);
    return l ? dl(e, s, l) : null;
  }
  return null;
}
function ss(e, t, n) {
  const a = ka(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const l = He(s);
    return {
      ...ma(n, s.panels.map(pa)),
      ...ke(s),
      ...l ? { places: l } : {}
    };
  });
  return a ? xe(a) : e;
}
function Kn(e, t) {
  if (X(e)) return e;
  if (ae(e)) {
    const s = e.frames.findIndex(
      (r) => X(r.node) && r.node.panels.includes(t)
    ), l = e.frames[s], o = l && X(l.node) ? l.node : null;
    if (l && o && o.panels.length > 1) {
      const r = ha(o.panels.map(pa), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...r, ...e.frames.slice(s + 1)]
      };
    }
    return Zt(e, (r) => Kn(r, t));
  }
  if (!ce(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = Kn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function td(e, t, n) {
  const a = xt(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const o = Kn(e, t);
    return o === e ? e : xe(o);
  }
  const l = ka(e, t, (o) => ({
    ...va(vl(o.panels.map(pa), He(o), n)),
    ...ke(o)
  }));
  return l ? xe(l) : e;
}
function vl(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : ha(e, n).frames;
}
function hl(e, t) {
  return { ...va(vl(e.children, He(e), t)), ...ke(e) };
}
function $f(e, t, n) {
  const a = tn(
    e,
    t,
    (s) => ae(s) ? s : hl(s, n)
  );
  return a ? xe(a) : X(e) && Ie(e, t) ? ha([e], n) : e;
}
function nd(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function ml(e, t) {
  const n = nd(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...ke(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function xf(e, t, n = "row") {
  const a = tn(
    e,
    t,
    (s) => ae(s) ? ml(s, n) : s
  );
  return a ? xe(a) : e;
}
function gl(e) {
  if (ae(e)) return null;
  const t = X(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || me(t) || X(t) && t.panels.length === 1 && me(t.panels[0]) ? null : t;
}
const ad = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function sd(e, t) {
  const n = gl(e);
  return n ? t === "inner" ? n : { ...ad(n), ...ke(e) } : e;
}
function Lt(e) {
  return e.title ? e.title : X(e) ? "" : ae(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Kt(e, t) {
  if (X(e)) {
    const a = e.panels[yt(e)];
    return a === void 0 ? "" : me(a) ? t(a) ?? a : Lt(a) || Kt(a, t);
  }
  if (e.title) return e.title;
  if (ae(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? Kt(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? Kt(n, t) : "";
}
function it(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (zt(n)) n = n.children[a];
    else if (ae(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || me(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function ht(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ae(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const c = ht(i.node, s, n);
    if (c === i.node) return e;
    const d = [...e.frames];
    return d[a] = { ...i, node: c }, { ...e, frames: d };
  }
  if (X(e)) {
    const i = e.panels[a];
    if (i === void 0 || me(i)) return e;
    const c = ht(i, s, n);
    if (c === i) return e;
    const d = [...e.panels];
    return d[a] = c, { ...e, panels: d };
  }
  const l = e.children[a];
  if (!l) return e;
  const o = ht(l, s, n);
  if (o === l) return e;
  const r = [...e.children];
  return r[a] = o, { ...e, children: r };
}
function pn(e, t, n) {
  if (t.length === 0)
    return zt(e) ? { ...e, sizes: wa(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ae(e)) {
    const r = e.frames[a];
    if (!r) return e;
    const i = pn(r.node, s, n);
    if (i === r.node) return e;
    const c = [...e.frames];
    return c[a] = { ...r, node: i }, { ...e, frames: c };
  }
  if (X(e)) {
    const r = e.panels[a];
    if (r === void 0 || me(r)) return e;
    const i = pn(r, s, n);
    if (i === r) return e;
    const c = [...e.panels];
    return c[a] = i, { ...e, panels: c };
  }
  const l = e.children[a];
  if (!l) return e;
  const o = [...e.children];
  return o[a] = pn(l, s, n), { ...e, children: o };
}
function ls(e, t, n, a = 0.02) {
  const s = e[t], l = e[t + 1];
  if (s === void 0 || l === void 0) return e;
  const o = s + l;
  if (o < a * 2) return e;
  const r = [...e], i = Math.min(Math.max(s + n, a), o - a);
  return r[t] = i, r[t + 1] = o - i, r;
}
function yn(e) {
  if (!X(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !me(t) ? e : { ...ga([ld(e)]), ...ke(e) };
}
const ld = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function rs(e) {
  return e.length === 0 ? null : ga(e.map(Ze));
}
function rd(e, t) {
  if (!e) return rs(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const i of at(e))
    !n.has(i) || a.has(i) ? s.add(i) : a.add(i);
  let l = e;
  for (const i of s)
    l = l ? vt(l, i) : null;
  const o = new Set(l ? at(l) : []), r = t.filter((i) => !o.has(i));
  if (r.length === 0) return l ? yn(xe(l)) : null;
  if (!l) return rs(r);
  if (ae(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...r.map(
          (c, d) => $n(Ze(c), {
            x: pt.x + (i + d) * _n,
            y: pt.y + (i + d) * _n
          })
        )
      ]
    };
  }
  return yn(xe(ga([l, ...r.map(Ze)])));
}
const ba = Symbol("dc.windowContext");
function od(e) {
  return Vn(ba, e), e;
}
function $a() {
  const e = Et(ba, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const id = ["data-dc-glyph"], cd = { class: "dc-glyph__line" }, ud = ["d"], dd = {
  key: 0,
  class: "dc-glyph__aqua"
}, fd = ["d"], pd = /* @__PURE__ */ oe({
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
    return (a, s) => (f(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      $("g", cd, [
        (f(!0), h(ne, null, he(t[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, ud))), 128))
      ]),
      n[e.kind] ? (f(), h("g", dd, [
        (f(!0), h(ne, null, he(n[e.kind], (l) => (f(), h("path", {
          key: l,
          d: l
        }, null, 8, fd))), 128))
      ])) : R("", !0)
    ], 8, id));
  }
}), Mt = /* @__PURE__ */ ue(pd, [["__scopeId", "data-v-4d2872c0"]]), vd = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], hd = ["data-dc-movable"], md = { class: "dc-float__title dc-truncate" }, gd = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, _d = ["aria-label", "aria-pressed", "data-dc-minimize"], yd = ["aria-label", "aria-pressed", "data-dc-maximize"], wd = ["aria-label", "data-dc-close"], kd = { class: "dc-float__content" }, bd = ["data-dc-handle", "onPointerdown"], $d = /* @__PURE__ */ oe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = $a(), a = v(() => Te(t.frame.node)), s = v(() => n.panelFor(a.value)?.fixed === !0), l = v(() => lt(t.frame)), o = v(() => ft(t.frame)), r = v(() => l.value || o.value), i = v(() => n.resizable.value && !s.value && !r.value), c = v(() => n.movable.value && !s.value && !r.value), d = v(() => {
      const L = at(t.frame.node);
      return L.length === 1 ? L[0] ?? null : null;
    }), m = v(() => d.value !== null && n.closable(d.value)), y = v(() => t.frame.node.headless === !0), k = v(
      () => !y.value && (!X(t.frame.node) || o.value)
    ), b = v(
      () => t.frame.title || Lt(t.frame.node) || Kt(t.frame.node, (L) => n.panelFor(L)?.title)
    ), C = v(() => n.spaceMenu(t.path));
    function _(L) {
      L.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, L, "move");
    }
    function x(L) {
      L.target?.closest("button, a, input, select, textarea, label") || (o.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const F = v(() => {
      const L = n.framing.value;
      return L !== null && ce(t.frame.node, L);
    }), z = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : o.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${On}px`,
        height: `${al}px`
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
    return (L, K) => (f(), h("div", {
      class: "dc-float",
      style: Me(z.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": o.value ? "true" : "false",
      "data-dc-dragging": F.value ? "true" : "false",
      onPointerdown: K[3] || (K[3] = (P) => A(n).raiseAt(e.path))
    }, [
      k.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: _,
        onDblclick: x
      }, [
        $("span", md, O(b.value), 1),
        C.value.length ? (f(), J(fa, {
          key: 0,
          items: C.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : R("", !0),
        !s.value || o.value && m.value && d.value ? (f(), h("div", gd, [
          s.value ? R("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${o.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": o.value,
            "data-dc-minimize": a.value,
            onClick: K[0] || (K[0] = (P) => A(n).toggleMinimizeAt(e.path))
          }, [
            ve(Mt, {
              kind: o.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, _d)),
          s.value ? R("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: K[1] || (K[1] = (P) => A(n).toggleMaximizeAt(e.path))
          }, [
            ve(Mt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, yd)),
          o.value && m.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": d.value,
            onClick: K[2] || (K[2] = (P) => A(n).close(d.value))
          }, [
            ve(Mt, { kind: "close" })
          ], 8, wd)) : R("", !0)
        ])) : R("", !0)
      ], 40, hd)) : R("", !0),
      $("div", kd, [
        $e(L.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(ne, null, he(i.value ? M : [], (P) => (f(), h("span", {
        key: P,
        class: "dc-float__grip",
        "data-dc-handle": P,
        "aria-hidden": "true",
        onPointerdown: ze((w) => A(n).beginFrameDragAt(e.path, w, P), ["stop"])
      }, null, 40, bd))), 128))
    ], 44, vd));
  }
}), xd = /* @__PURE__ */ ue($d, [["__scopeId", "data-v-f035684c"]]), xa = Symbol("dc.paneContext");
function Cd(e) {
  return Vn(xa, e), e;
}
function Cf() {
  return Et(xa, null);
}
function Sf(e) {
  const t = Et(ba, null), n = Et(xa, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Nt(e)
  );
  return us() && Wn(a), a;
}
const Sd = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Md = ["data-dc-movable"], Ed = ["aria-label", "aria-pressed"], Pd = ["data-dc-space-name"], Ad = { class: "dc-truncate" }, Td = ["aria-label"], Ld = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, zd = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Rd = { class: "dc-tab__name dc-truncate" }, Fd = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Nd = ["aria-label", "data-dc-close", "onClick"], Id = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Od = { class: "dc-pane__tools" }, Dd = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Bd = ["aria-label", "data-dc-minimize"], qd = ["aria-label", "aria-pressed", "data-dc-maximize"], Kd = ["aria-label", "data-dc-close"], Vd = ["id", "role", "aria-labelledby"], Wd = ["id", "role", "aria-labelledby"], Hd = ["data-dc-edge"], Ud = /* @__PURE__ */ oe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = $a(), a = Hn() ?? "dc-pane", s = v(
      () => t.group.panels.flatMap((E, U) => {
        if (!me(E)) {
          const Ce = Lt(E) || Kt(E, (Pe) => n.panelFor(Pe)?.title);
          return [{ kind: "space", index: U, id: `space-${U}`, title: Ce, node: E }];
        }
        const se = n.panelFor(E);
        return se ? [{ kind: "panel", index: U, id: E, title: se.title, panel: se }] : [];
      })
    ), l = v(() => s.value.length > 1), o = v(() => {
      const E = yt(t.group);
      return s.value.find((U) => U.index === E) ?? s.value[0] ?? null;
    }), r = v(() => o.value?.kind === "space" ? o.value.node : null), i = v(() => r.value ? "" : ll(t.group)), c = v(() => r.value ? null : n.panelFor(i.value)), d = v(() => o.value?.title ?? ""), m = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), y = v(() => [...t.path, o.value?.index ?? 0]), k = v(() => i.value || Ja(t.group)[0] || ""), b = v(() => n.viewFor(i.value)), C = v(() => t.group.headless === !0), _ = v(() => n.focused.value === i.value), x = v(() => n.dragging.value === i.value), F = v(() => n.moving.value === i.value), z = v(() => n.frameOf(k.value) !== null), M = v(() => n.panelFor(k.value)?.fixed === !0), L = v(
      () => !r.value && (n.canMove(i.value) || z.value && n.movable.value && !M.value)
    ), K = v(
      () => r.value ? n.spaceMenu(y.value) : n.menuFor(i.value)
    ), P = (E) => n.closable(E);
    Cd({ panel: i });
    const w = v(() => n.maximized(k.value)), V = v(
      () => z.value && !M.value || !l.value && !!c.value && P(c.value.id)
    ), N = (E) => `${a}-tab-${E}`, Y = v(() => `${a}-body`), G = v(() => {
      const E = n.dropTarget.value;
      return !E || !Ie(t.group, E.panel) || E.edge === "float" ? null : E;
    }), ge = v(() => G.value?.index === void 0 ? G.value?.edge ?? null : null), ie = v(() => G.value?.index ?? null), S = () => c.value ? n.renderContent(c.value, b.value, _.value) ?? null : null, D = () => c.value ? n.renderActions(c.value, b.value, _.value) ?? null : null;
    let j = null;
    function le(E) {
      const U = j !== null && Math.hypot(E.clientX - j.x, E.clientY - j.y) >= 4;
      return j = null, U;
    }
    const _e = (E) => E.kind === "panel" ? E.id : Te(E.node);
    function Ee(E, U) {
      U.kind !== "space" && (n.focus(U.id), j = { x: E.clientX, y: E.clientY }, n.beginDrag(U.id, E));
    }
    function Le(E, U) {
      if (le(E)) return;
      const se = _e(U);
      se && n.selectPanel(se);
    }
    function Ue(E) {
      i.value && n.focus(i.value), !E.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (z.value ? n.beginFrameDrag(k.value, E, "move") : n.beginDrag(i.value, E));
    }
    function je(E) {
      j = { x: E.clientX, y: E.clientY }, n.beginDrag(i.value, E);
    }
    function Ge(E) {
      le(E) || n.toggleMoveMode(i.value);
    }
    const qe = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Fe(E) {
      if (!F.value) return;
      if (E.key === "Escape") {
        E.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const U = qe[E.key];
      U && (E.preventDefault(), z.value ? n.nudgeFrame(i.value, U, E.shiftKey) : n.nudge(i.value, U, E.shiftKey));
    }
    function Ke(E) {
      !z.value || E.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(k.value);
    }
    function B(E, U) {
      E.stopPropagation(), j = null, n.close(U);
    }
    function Q(E, U) {
      const se = s.value.length;
      let Ce = null;
      if (E.key === "ArrowRight" ? Ce = (U + 1) % se : E.key === "ArrowLeft" ? Ce = (U - 1 + se) % se : E.key === "Home" ? Ce = 0 : E.key === "End" && (Ce = se - 1), Ce === null) return;
      E.preventDefault();
      const Pe = s.value[Ce];
      if (!Pe) return;
      const Rt = _e(Pe);
      Rt && n.selectPanel(Rt);
    }
    return (E, U) => o.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": A(Ja)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": z.value ? "true" : "false",
      "data-dc-maximized": w.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": _.value ? "true" : "false",
      "data-dc-dragging": x.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: U[7] || (U[7] = (se) => i.value && A(n).focus(i.value))
    }, [
      C.value ? R("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": L.value ? "true" : "false",
        onPointerdown: Ue,
        onDblclick: Ke
      }, [
        L.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": F.value,
          onPointerdown: je,
          onClick: Ge,
          onKeydown: Fe
        }, [...U[8] || (U[8] = [
          $("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Ed)) : R("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          $("span", Ad, O(m.value), 1)
        ], 8, Pd)) : R("", !0),
        $("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(ne, null, he(s.value, (se, Ce) => (f(), h(ne, {
            key: se.id
          }, [
            ie.value === Ce ? (f(), h("span", Ld)) : R("", !0),
            $("button", {
              id: N(se.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": se.kind === "panel" ? se.id : void 0,
              "data-dc-space": se.kind === "space" ? se.title : void 0,
              "aria-selected": se.index === o.value.index,
              "aria-controls": Y.value,
              tabindex: se.index === o.value.index ? 0 : -1,
              onPointerdown: (Pe) => Ee(Pe, se),
              onClick: (Pe) => Le(Pe, se),
              onKeydown: (Pe) => Q(Pe, Ce)
            }, [
              $("span", Rd, O(se.title), 1),
              se.kind === "panel" && se.panel.subtitle ? (f(), h("span", Fd, O(se.panel.subtitle), 1)) : R("", !0),
              l.value && se.kind === "panel" && P(se.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${se.title}`,
                "data-dc-close": se.id,
                onPointerdown: U[0] || (U[0] = ze(() => {
                }, ["stop"])),
                onClick: (Pe) => B(Pe, se.id)
              }, [...U[9] || (U[9] = [
                $("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Nd)) : R("", !0)
            ], 40, zd)
          ], 64))), 128)),
          ie.value === s.value.length ? (f(), h("span", Id)) : R("", !0)
        ], 8, Td),
        $("div", Od, [
          ve(D),
          K.value.length ? (f(), J(fa, {
            key: 0,
            items: K.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ]),
        V.value ? (f(), h("div", Dd, [
          z.value && !M.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": k.value,
            onPointerdown: U[1] || (U[1] = ze(() => {
            }, ["stop"])),
            onClick: U[2] || (U[2] = (se) => A(n).toggleMinimize(k.value))
          }, [
            ve(Mt, { kind: "minimize" })
          ], 40, Bd)) : R("", !0),
          z.value && !M.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${w.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": w.value,
            "data-dc-maximize": k.value,
            onPointerdown: U[3] || (U[3] = ze(() => {
            }, ["stop"])),
            onClick: U[4] || (U[4] = (se) => A(n).toggleMaximize(k.value))
          }, [
            ve(Mt, {
              kind: w.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, qd)) : R("", !0),
          !l.value && c.value && P(c.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: U[5] || (U[5] = ze(() => {
            }, ["stop"])),
            onClick: U[6] || (U[6] = (se) => A(n).close(c.value.id))
          }, [
            ve(Mt, { kind: "close" })
          ], 40, Kd)) : R("", !0)
        ])) : R("", !0)
      ], 40, Md)),
      r.value ? (f(), h("div", {
        key: 1,
        id: Y.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : N(o.value.id)
      }, [
        $e(E.$slots, "space", {
          node: r.value,
          path: y.value
        }, void 0, !0)
      ], 8, Vd)) : (f(), h("div", {
        key: 2,
        id: Y.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : N(i.value)
      }, [
        ve(S)
      ], 8, Wd)),
      ge.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ge.value,
        "aria-hidden": "true"
      }, null, 8, Hd)) : R("", !0)
    ], 40, Sd)) : R("", !0);
  }
}), _l = /* @__PURE__ */ ue(Ud, [["__scopeId", "data-v-44fd2b2d"]]), jd = ["data-dc-space", "data-dc-path", "aria-label"], Gd = {
  key: 0,
  class: "dc-space__head"
}, Xd = { class: "dc-space__title dc-truncate" }, Yd = ["data-dc-direction"], Qd = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Zd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], Jd = /* @__PURE__ */ oe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = $a(), a = W(null), s = v(() => X(t.node) ? t.node : null), l = v(() => zt(t.node) ? t.node : null), o = v(() => ae(t.node) ? t.node : null), r = v(
      () => l.value ? l.value.children : o.value?.frames.map((S) => S.node) ?? []
    ), i = v(() => l.value ? nt(l.value) : []), c = v(
      () => (o.value?.frames ?? []).map((S, D) => ({
        held: S,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: D,
        key: P(S.node),
        path: [...t.path, D]
      })).sort((S, D) => S.key < D.key ? -1 : S.key > D.key ? 1 : 0)
    ), d = v(() => Lt(t.node)), m = v(() => n.spaceMenu(t.path)), y = v(() => t.node.headless === !0), k = v(() => o.value ? "desktop" : l.value?.direction ?? ""), b = W(null), C = W(0);
    let _ = null;
    be(
      b,
      (S) => {
        _?.disconnect(), _ = null, !(!S || typeof ResizeObserver > "u") && (C.value = S.clientWidth, _ = new ResizeObserver(([D]) => {
          C.value = D?.contentRect.width ?? 0;
        }), _.observe(S));
      },
      { immediate: !0 }
    ), De(() => _?.disconnect());
    const x = v(() => {
      const S = Math.max(
        1,
        Math.floor((C.value + kt) / (On + kt))
      ), D = /* @__PURE__ */ new Map();
      let j = 0;
      for (const le of c.value)
        le.held.minimized === !0 && (D.set(le.key, {
          x: kt + j % S * (On + kt),
          bottom: kt + Math.floor(j / S) * (al + kt)
        }), j += 1);
      return D;
    }), F = (S) => !!S && S.join("/") === t.path.join("/"), z = v(() => {
      const S = n.dropTarget.value, D = o.value;
      if (!D || !S?.rect || S.edge !== "float") return null;
      if (S.space) return F(S.space) ? S.rect : null;
      const j = Se(D, S.panel);
      return j && D.frames.includes(j) ? S.rect : null;
    }), M = v(() => {
      const S = n.dropTarget.value;
      return !!S && !S.rect && F(S.space);
    }), L = v(() => l.value?.direction === "row"), K = v(() => r.value.map((S, D) => [...t.path, D])), P = (S) => [...at(S)].sort().join("/"), w = (S) => {
      const D = at(S)[0];
      return (D ? n.panelFor(D)?.title : null) ?? D ?? "panel";
    }, V = (S) => {
      const D = r.value[S], j = r.value[S + 1];
      return !D || !j ? "Resize panels" : `Resize ${w(D)} and ${w(j)}`;
    }, N = (S) => {
      const D = i.value[S] ?? 0, j = i.value[S + 1] ?? 0, le = D + j;
      return le > 0 ? Math.round(D / le * 100) : 50;
    };
    function Y() {
      const S = a.value, D = S ? L.value ? S.clientWidth : S.clientHeight : 0;
      return D <= 0 ? 0.05 : Math.min(n.minPanelSize.value / D, 0.4);
    }
    let G = null;
    function ge(S, D) {
      const j = l.value, le = a.value;
      if (!n.resizable.value || !j || !le || S.button !== 0) return;
      const _e = L.value ? le.clientWidth : le.clientHeight;
      if (_e <= 0) return;
      const Ee = L.value ? S.clientX : S.clientY, Le = nt(j), Ue = Math.min(n.minPanelSize.value / _e, 0.4);
      S.preventDefault();
      const je = (Fe) => {
        const Ke = ((L.value ? Fe.clientX : Fe.clientY) - Ee) / _e;
        n.setSizes(t.path, ls(Le, D, Ke, Ue));
      }, Ge = () => G?.(), qe = (Fe) => {
        Fe.key === "Escape" && (n.setSizes(t.path, Le), G?.());
      };
      G = () => {
        window.removeEventListener("pointermove", je), window.removeEventListener("pointerup", Ge), window.removeEventListener("pointercancel", Ge), window.removeEventListener("keydown", qe), G = null;
      }, window.addEventListener("pointermove", je), window.addEventListener("pointerup", Ge), window.addEventListener("pointercancel", Ge), window.addEventListener("keydown", qe);
    }
    De(() => G?.());
    function ie(S, D) {
      const j = l.value;
      if (!n.resizable.value || !j) return;
      const le = L.value ? "ArrowRight" : "ArrowDown", _e = L.value ? "ArrowLeft" : "ArrowUp", Ee = S.shiftKey ? 0.1 : 0.02;
      if (S.key !== le && S.key !== _e) return;
      const Le = S.key === le ? Ee : -Ee;
      S.preventDefault(), n.setSizes(t.path, ls(nt(j), D, Le, Y()));
    }
    return (S, D) => {
      const j = cs("WindowNode", !0);
      return s.value ? (f(), J(_l, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Qe(({ node: le, path: _e }) => [
          ve(j, {
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
        !e.framed && !y.value ? (f(), h("header", Gd, [
          $("span", Xd, O(d.value), 1),
          m.value.length ? (f(), J(fa, {
            key: 0,
            items: m.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ])) : R("", !0),
        o.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: b,
          class: "dc-window__desktop"
        }, [
          z.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Me({
              left: `${z.value.x}px`,
              top: `${z.value.y}px`,
              width: `${z.value.w}px`,
              height: `${z.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : R("", !0),
          (f(!0), h(ne, null, he(c.value, (le) => (f(), J(xd, {
            key: le.key,
            frame: le.held,
            path: le.path,
            order: le.order,
            place: x.value.get(le.key) ?? null
          }, {
            default: Qe(() => [
              ve(j, {
                node: le.held.node,
                path: le.path,
                framed: le.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (f(), h("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          M.value ? (f(), h("div", Qd)) : R("", !0),
          (f(!0), h(ne, null, he(r.value, (le, _e) => (f(), h(ne, {
            key: P(le)
          }, [
            $("div", {
              class: "dc-window__cell",
              style: Me({ flexGrow: i.value[_e] ?? 1 })
            }, [
              ve(j, {
                node: le,
                path: K.value[_e] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            _e < r.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": L.value ? "vertical" : "horizontal",
              "aria-label": V(_e),
              "aria-valuenow": N(_e),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": A(n).resizable.value ? void 0 : "true",
              tabindex: A(n).resizable.value ? 0 : -1,
              onPointerdown: (Ee) => ge(Ee, _e),
              onKeydown: (Ee) => ie(Ee, _e)
            }, null, 40, Zd)) : R("", !0)
          ], 64))), 128))
        ], 8, Yd)) : R("", !0)
      ], 8, jd));
    };
  }
}), ef = /* @__PURE__ */ ue(Jd, [["__scopeId", "data-v-fb5b403f"]]), tf = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], nf = {
  key: 1,
  class: "dc-window__empty"
}, af = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, rn = 16, sf = /* @__PURE__ */ oe({
  __name: "WindowFrame",
  props: /* @__PURE__ */ mn({
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
  emits: /* @__PURE__ */ mn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = Ot(e, "layout"), o = Ot(e, "views"), r = Ut(), i = v(() => new Map(a.panels.map((u) => [u.id, u]))), c = v(() => a.panels.map((u) => u.id)), d = v(() => rd(l.value, c.value)), m = W(null), y = W(null), k = W(null), b = W(!0), C = W(null), _ = W(null), x = W(null), F = W(""), z = W(null);
    function M() {
      const u = z.value;
      return u ? [...u.querySelectorAll(".dc-pane[data-dc-panels]")].filter((g) => g.closest(".dc-window") === u).map((g) => ({ panels: (g.dataset.dcPanels ?? "").split(" "), element: g })) : [];
    }
    function L(u) {
      const p = [];
      let g = u.closest(".dc-float");
      for (; g; )
        p.unshift(Number(g.dataset.dcOrder ?? 0)), g = g.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function K() {
      return M().map((u) => ({ pane: u, order: L(u.element) })).sort((u, p) => {
        const g = Math.max(u.order.length, p.order.length);
        for (let T = 0; T < g; T += 1) {
          const I = (u.order[T] ?? -1) - (p.order[T] ?? -1);
          if (I !== 0) return I;
        }
        return 0;
      }).map((u) => u.pane);
    }
    const P = (u) => M().find((p) => p.panels.includes(u)) ?? null;
    function w(u) {
      const p = i.value.get(u);
      if (!p) return "";
      const g = o.value[u];
      return g && p.views?.some((T) => T.key === g) ? g : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function V(u, p) {
      o.value = { ...o.value, [u]: p }, s("view-change", { panel: u, view: p });
    }
    const N = v(
      () => a.panels.filter((u) => u.fixed !== !0).length
    );
    function Y(u) {
      return !a.movable || N.value < 1 || a.panels.length < 2 ? !1 : i.value.get(u)?.fixed !== !0;
    }
    function G(u, p) {
      const g = d.value;
      !u || !g || u === g || (l.value = u, p && s("panel-move", p));
    }
    function ge(u, p, g) {
      if (u.width <= 0 || u.height <= 0) return "center";
      const T = (p - u.left) / u.width, I = (g - u.top) / u.height, q = 0.3;
      return T > q && T < 1 - q && I > q && I < 1 - q ? "center" : [
        { edge: "left", distance: T },
        { edge: "right", distance: 1 - T },
        { edge: "top", distance: I },
        { edge: "bottom", distance: 1 - I }
      ].reduce(
        (re, H) => H.distance < re.distance ? H : re
      ).edge;
    }
    function ie(u, p) {
      const g = [...u.querySelectorAll(".dc-tab")], T = g.findIndex((I) => {
        const q = I.getBoundingClientRect();
        return p < q.left + q.width / 2;
      });
      return T === -1 ? g.length : T;
    }
    function S(u, p, g) {
      for (const { panels: T, element: I } of K().reverse()) {
        const q = I.getBoundingClientRect();
        if (u < q.left || u > q.right || p < q.top || p > q.bottom) continue;
        const fe = T.find((ee) => ee !== g), re = I.querySelector(".dc-pane__tabs"), H = re?.getBoundingClientRect();
        if (re && H && p >= H.top && p <= H.bottom)
          return fe ? { panel: fe, edge: "center", index: ie(re, u) } : null;
        const Z = I.querySelector(":scope > .dc-pane__space");
        if (Z) {
          const ee = Z.getBoundingClientRect();
          if (u >= ee.left && u <= ee.right && p >= ee.top && p <= ee.bottom) continue;
        }
        return fe ? { panel: fe, edge: ge(q, u, p) } : null;
      }
      return j(u, p, g) ?? Ee(u, p);
    }
    function D() {
      const u = z.value;
      return u ? [...u.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === u).reverse() : [];
    }
    function j(u, p, g) {
      const T = d.value;
      if (!T) return null;
      for (const I of D()) {
        const q = I.getBoundingClientRect();
        if (u < q.left || u > q.right || p < q.top || p > q.bottom) continue;
        const fe = Le(I), re = fe.flatMap((de) => de.panels).find((de) => de !== g);
        if (!re && fe.length > 0) return null;
        const H = Se(T, g)?.rect, Z = Tn(
          {
            x: u - q.left - 24,
            y: p - q.top - 12,
            w: H?.w ?? pt.w,
            h: H?.h ?? pt.h
          },
          { w: I.clientWidth, h: I.clientHeight },
          a.minPanelSize
        );
        if (re) return { panel: re, edge: "float", rect: Z };
        const ee = le(I);
        return ee ? { panel: "", space: ee, edge: "float", rect: Z } : null;
      }
      return null;
    }
    function le(u) {
      const p = u.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function _e() {
      const u = z.value;
      return u ? [...u.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === u).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const g = le(p);
        return g ? [{ element: p, path: g }] : [];
      }) : [];
    }
    function Ee(u, p) {
      for (const { element: g, path: T } of _e()) {
        if (g.dataset.dcSpace === "desktop") continue;
        const I = g.getBoundingClientRect();
        if (!(u < I.left || u > I.right || p < I.top || p > I.bottom))
          return { panel: "", space: T, edge: "center" };
      }
      return null;
    }
    function Le(u) {
      return M().filter(
        (p) => p.element.closest(".dc-window__desktop") === u
      );
    }
    let Ue = null;
    const je = (u) => u.altKey;
    function Ge(u, p) {
      if (!Y(u) || y.value || _.value || p.button !== 0) return;
      const g = p.clientX, T = p.clientY;
      let I = !1, q = je(p);
      const fe = () => {
        const pe = x.value;
        pe && (k.value = q ? j(pe.x, pe.y, u) : S(pe.x, pe.y, u));
      }, re = (pe) => {
        if (!I) {
          if (Math.hypot(pe.clientX - g, pe.clientY - T) < 4) return;
          I = !0, y.value = u, C.value = null;
        }
        q = je(pe), b.value = !q, x.value = { x: pe.clientX, y: pe.clientY }, fe();
      }, H = (pe) => {
        je(pe) !== q && (q = !q, b.value = !q, I && fe());
      }, Z = (pe) => {
        Ue?.();
        const te = k.value, Ae = d.value;
        if (pe && I && te && Ae) {
          const st = te.space ? as(Ae, u, te.space, te.rect) : te.edge === "float" && te.rect ? ns(Ae, u, te.panel, te.rect) : ln(Ae, u, te.panel, te.edge, te.index);
          G(st, {
            panel: u,
            target: te.panel,
            edge: te.edge,
            ...te.space === void 0 ? {} : { space: te.space },
            ...te.index === void 0 ? {} : { index: te.index },
            ...te.rect === void 0 ? {} : { rect: te.rect }
          });
        }
        y.value = null, k.value = null, x.value = null, b.value = !0;
      }, ee = () => Z(!0), de = () => Z(!1), ye = (pe) => {
        if (pe.key === "Escape") {
          Z(!1);
          return;
        }
        H(pe);
      };
      Ue = () => {
        window.removeEventListener("pointermove", re), window.removeEventListener("pointerup", ee), window.removeEventListener("pointercancel", de), window.removeEventListener("keydown", ye), window.removeEventListener("keyup", H), Ue = null;
      }, window.addEventListener("pointermove", re), window.addEventListener("pointerup", ee), window.addEventListener("pointercancel", de), window.addEventListener("keydown", ye), window.addEventListener("keyup", H);
    }
    De(() => Ue?.());
    let qe = null;
    function Fe(u) {
      const p = z.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${u.join("/")}"]`
      )].find((I) => I.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ke(u) {
      const p = d.value;
      return p ? qn(p, u) : null;
    }
    function B(u) {
      const p = d.value;
      if (!p) return;
      const g = Bt(p, u);
      g !== p && (l.value = g);
    }
    function Q(u) {
      const p = Ke(u);
      p && B(p);
    }
    function E(u) {
      const p = d.value, g = p ? Se(p, u) : null;
      return g !== null && lt(g);
    }
    function U(u) {
      const p = d.value, g = p ? Se(p, u) : null;
      return g !== null && ft(g);
    }
    function se(u) {
      const p = d.value, g = p ? dt(p, u) : null;
      return g ? Te(g.node) : "";
    }
    function Ce(u) {
      const p = d.value, g = p ? dt(p, u) : null;
      if (!p || !g) return;
      const T = Te(g.node);
      if (i.value.get(T)?.fixed === !0) return;
      const I = !ft(g);
      let q = Xu(p, u, I);
      q !== p && (I || (q = Bt(q, u)), l.value = q, s("frame-minimize", { panel: T, minimized: I }));
    }
    function Pe(u) {
      const p = Ke(u);
      p && Ce(p);
    }
    function Rt(u) {
      const p = d.value, g = p ? dt(p, u) : null;
      if (!p || !g) return;
      const T = Te(g.node);
      if (i.value.get(T)?.fixed === !0) return;
      const I = !lt(g);
      let q = Gu(p, u, I);
      q !== p && (I && (q = Bt(q, u)), l.value = q, s("frame-maximize", { panel: T, maximized: I }));
    }
    function Ca(u) {
      const p = Ke(u);
      p && Rt(p);
    }
    function Sa(u, p, g) {
      const T = d.value, I = T ? dt(T, u) : null;
      if (!T || !I || p.button !== 0 || y.value || _.value) return;
      const q = Te(I.node);
      if (i.value.get(q)?.fixed === !0 || lt(I) || ft(I) || (g === "move" ? !a.movable : !a.resizable)) return;
      const fe = Fe(u), re = Yu(T, u);
      B(u);
      const H = { w: fe?.clientWidth ?? 0, h: fe?.clientHeight ?? 0 }, Z = { ...I.rect }, ee = p.clientX, de = p.clientY, ye = a.minPanelSize;
      _.value = q;
      const pe = (Ne) => {
        const Je = d.value;
        if (!Je) return;
        const Ft = ts(Je, re, Tn(Ne, H, ye));
        Ft !== Je && (l.value = Ft);
      }, te = (Ne) => {
        Ne.preventDefault();
        const Je = Ne.clientX - ee, Ft = Ne.clientY - de;
        pe(
          g === "move" ? { ...Z, x: Z.x + Je, y: Z.y + Ft } : es(Z, g, Je, Ft, ye)
        );
      }, Ae = (Ne) => {
        if (qe?.(), _.value = null, !Ne) {
          pe(Z);
          return;
        }
        const Je = d.value ? dt(d.value, re) : null;
        Je && s("frame-change", { panel: se(re), rect: Je.rect });
      }, st = () => Ae(!0), ct = () => Ae(!1), ut = (Ne) => {
        Ne.key === "Escape" && Ae(!1);
      };
      qe = () => {
        window.removeEventListener("pointermove", te), window.removeEventListener("pointerup", st), window.removeEventListener("pointercancel", ct), window.removeEventListener("keydown", ut), qe = null;
      }, window.addEventListener("pointermove", te), window.addEventListener("pointerup", st), window.addEventListener("pointercancel", ct), window.addEventListener("keydown", ut);
    }
    function yl(u, p, g) {
      const T = Ke(u);
      T && Sa(T, p, g);
    }
    function wl(u, p, g = !1) {
      const T = d.value, I = Ke(u), q = T && I ? dt(T, I) : null;
      if (!T || !I || !q || i.value.get(u)?.fixed === !0 || (g ? !a.resizable : !a.movable)) return;
      if (lt(q) || ft(q)) {
        F.value = `${Xe(u)} is ${lt(q) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const fe = p === "left" ? -rn : p === "right" ? rn : 0, re = p === "up" ? -rn : p === "down" ? rn : 0, H = Fe(I), Z = { w: H?.clientWidth ?? 0, h: H?.clientHeight ?? 0 }, ee = g ? es(q.rect, "se", fe, re, a.minPanelSize) : { ...q.rect, x: q.rect.x + fe, y: q.rect.y + re }, de = ts(T, I, Tn(ee, Z, a.minPanelSize));
      if (de === T) {
        F.value = g ? `${Xe(u)} cannot be resized further.` : `${Xe(u)} cannot move ${p}.`;
        return;
      }
      l.value = de;
      const ye = dt(de, I);
      ye && (s("frame-change", { panel: u, rect: ye.rect }), F.value = g ? `${Xe(u)} resized to ${ye.rect.w} by ${ye.rect.h}.` : `${Xe(u)} moved to ${ye.rect.x}, ${ye.rect.y}.`);
    }
    De(() => qe?.());
    function kl(u, p) {
      const g = P(u), T = g?.element.getBoundingClientRect();
      if (!g || !T) return null;
      const I = p === "left" || p === "right", q = (H) => {
        if (!(I ? H.bottom > T.top + 1 && H.top < T.bottom - 1 : H.right > T.left + 1 && H.left < T.right - 1)) return null;
        const ee = p === "left" ? T.left - H.right : p === "right" ? H.left - T.right : p === "up" ? T.top - H.bottom : H.top - T.bottom;
        return ee < -1 ? null : ee;
      }, fe = [];
      for (const H of M()) {
        if (H === g || H.element === g.element) continue;
        const Z = q(H.element.getBoundingClientRect());
        if (Z === null) continue;
        const ee = H.panels.find((de) => de !== u);
        ee && fe.push({ to: { panel: ee }, distance: Z });
      }
      for (const { element: H, path: Z } of _e()) {
        const ee = q(H.getBoundingClientRect());
        ee !== null && fe.push({ to: { space: Z }, distance: ee });
      }
      return fe.reduce(
        (H, Z) => H && H.distance <= Z.distance ? H : Z,
        null
      )?.to ?? null;
    }
    function bl(u) {
      const p = d.value ? Se(d.value, u) !== null : !1;
      if (!p && !Y(u)) return;
      C.value = C.value === u ? null : u;
      const g = Xe(u);
      if (!C.value) {
        F.value = `${g}: move mode off.`;
        return;
      }
      F.value = p ? `${g}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${g}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Xe = (u) => i.value.get(u)?.title ?? u, $l = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function xl(u, p, g = !1) {
      if (!Y(u)) return;
      const T = d.value;
      if (!T) return;
      const I = Xe(u), q = xt(T, u);
      if (!g && q && (p === "left" || p === "right") && q.panels.length > 1) {
        const de = q.panels.indexOf(u), ye = p === "left" ? de - 1 : de + 1;
        if (ye >= 0 && ye < q.panels.length) {
          G(qt(T, u, ye), { panel: u, target: u, edge: "center", index: ye }), F.value = `${I} moved ${p}, now tab ${ye + 1} of ${q.panels.length}.`, Cn(u);
          return;
        }
      }
      const re = kl(u, p);
      if (!re || re.panel !== void 0 && !Y(re.panel)) {
        F.value = `${I} cannot move ${p}.`;
        return;
      }
      const H = $l[p];
      if (re.space) {
        const de = re.space, ye = it(T, de), pe = Se(T, u)?.rect, te = { ...pt, ...pe ? { w: pe.w, h: pe.h } : {} };
        G(as(T, u, de, te), { panel: u, target: "", space: de, edge: H }), F.value = `${I} moved ${p}, into ${ye ? Lt(ye) : "the space"}.`, Cn(u);
        return;
      }
      const Z = re.panel, ee = q?.panels.length === 1 && xt(T, Z)?.panels.length === 1;
      g ? (G(ln(T, u, Z, "center"), {
        panel: u,
        target: Z,
        edge: "center"
      }), F.value = `${I} joined ${Xe(Z)} as a tab.`) : ee ? (G(fn(T, u, Z), { panel: u, target: Z, edge: H }), F.value = `${I} moved ${p}, trading places with ${Xe(Z)}.`) : (G(ln(T, u, Z, H), { panel: u, target: Z, edge: H }), F.value = `${I} moved ${p}, beside ${Xe(Z)}.`), Cn(u);
    }
    function Cn(u) {
      Vt(() => {
        P(u)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Cl(u, p) {
      const g = d.value;
      g && (l.value = pn(g, u, p));
    }
    function Sn(u) {
      const p = d.value;
      if (!p) return;
      const g = St(p, u);
      g !== p && (l.value = g, s("tab-select", { panel: u }));
    }
    function Ma(u) {
      return i.value.get(u)?.closable ?? a.closable;
    }
    function Sl(u) {
      Ma(u) && s("panel-close", u);
    }
    const Mn = W(/* @__PURE__ */ new Map());
    let Ml = 0;
    function El(u, p) {
      const g = Ml += 1;
      return Mn.value.set(g, { panel: u, items: p }), () => {
        Mn.value.delete(g);
      };
    }
    function Pl(u) {
      const p = [];
      for (const g of Mn.value.values())
        g.panel() === u && p.push(...g.items());
      return p;
    }
    function Ea(u) {
      const p = u.filter((g) => g.items.length > 0);
      return p.length < 2 ? p.flatMap((g) => g.items) : p.flatMap((g) => [
        { id: g.id, heading: !0, label: g.title },
        ...g.items
      ]);
    }
    const Pa = (u) => u.title || "These tabs";
    function Al(u, p) {
      const g = p.id, T = xt(u, g), I = (T?.panels.length ?? 0) > 1, q = T?.fixedView === !0, fe = (ee) => ({
        action: () => {
          ee !== u && (l.value = ee);
        }
      }), re = [], H = [], Z = p.views ?? [];
      if (Z.length > 1 && !q) {
        const ee = w(g);
        re.push({
          id: "view",
          label: "View",
          items: Z.map((de) => ({
            id: `view-${de.key}`,
            label: de.label,
            checked: de.key === ee,
            action: () => V(g, de.key)
          }))
        });
      }
      return I && !q && H.push(
        { id: "show-row", label: "Row", checked: !1, ...fe(ss(u, g, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...fe(ss(u, g, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...fe(ed(u, g))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...fe(td(u, g))
        }
      ), I && T && (H.length && H.push({ separator: !0 }), H.push(...Aa(T, g))), { panel: re, tabs: H, tabsTitle: T ? Pa(T) : "" };
    }
    function Aa(u, p) {
      const g = yt(u), T = (I) => {
        const q = u.panels[(g + I + u.panels.length) % u.panels.length];
        return (q === void 0 ? "" : Te(q)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Sn(T(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Sn(T(-1)) }
      ];
    }
    function nn(u) {
      return u.title ? u.title : X(u) ? u.panels.length > 1 ? "these tabs" : "the strip" : Lt(u);
    }
    function Ta(u) {
      if (!u || ae(u) || u.fixedView === !0 || !u.title && u.headless !== !0 || He(u)) return null;
      const p = gl(u);
      return p && p.fixedView !== !0 ? p : null;
    }
    function Tl(u) {
      const p = d.value;
      if (!a.menu || !p) return [];
      const g = it(p, u);
      if (!g || X(g)) return [];
      if (g.fixedView) return [];
      const T = ae(g) ? "desktop" : g.direction, I = (te, Ae, st) => ({
        id: `show-${te}`,
        label: Ae,
        checked: T === te,
        action: () => {
          const ct = d.value, ut = st();
          !ct || ut === g || (l.value = yn(xe(ht(ct, u, ut))));
        }
      }), q = () => {
        const te = pl(g, Ll(g));
        if (X(te) && te.panels.length === 0) return g;
        const Ae = X(te) && te.panels.length === 1 ? te.panels[0] : void 0;
        return Ae !== void 0 && me(Ae) ? g : te;
      }, fe = (te) => () => ae(g) ? ml(g, te) : g.direction === te ? g : { ...g, direction: te }, re = u.slice(0, -1), H = u.length > 0 ? it(p, re) : null, Z = H && X(H) && H.panels.length > 1 ? H : null, ee = H && Ta(H) === g ? H : null, de = Ta(g), ye = g.title || "this space", pe = (te, Ae, st, ct, ut) => ({
        id: te,
        label: ut,
        action: () => {
          const Ne = d.value;
          Ne && (l.value = yn(xe(ht(Ne, Ae, sd(st, ct)))));
        }
      });
      return Ea([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: g.title || "This space",
          items: [
            I("row", "Row", fe("row")),
            I("column", "Column", fe("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            I("tabs", "Tabs", () => q()),
            I("desktop", "Desktop", () => ae(g) ? g : hl(g))
          ]
        },
        {
          id: "about-around",
          title: de ? `Around ${nn(de)}` : "",
          items: de ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...de.title ? [] : [pe("merge-around-keep-this", u, g, "outer", `Keep ${ye}`)],
            ...g.title ? [] : [pe("merge-around-keep-that", u, g, "inner", `Keep ${nn(de)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: ee ? `Inside ${nn(ee)}` : "",
          items: ee ? [
            ...g.title ? [] : [pe("merge-inside-keep-that", re, ee, "outer", `Keep ${nn(ee)}`)],
            ...ee.title ? [] : [pe("merge-inside-keep-this", re, ee, "inner", `Keep ${ye}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: Z ? Pa(Z) : "",
          items: Z ? Aa(Z, Te(g)) : []
        }
      ]);
    }
    function Ll(u) {
      const p = m.value;
      return p && ce(u, p) ? p : void 0;
    }
    function zl(u) {
      const p = d.value, g = i.value.get(u);
      if (!p || !g) return [];
      const T = a.menu ? Al(p, g) : null, I = Pl(u);
      I.length && T?.panel.length && I.push({ separator: !0 }), T && I.push(...T.panel);
      const q = Ea([
        { id: "about-panel", title: g.title, items: I },
        { id: "about-tabs", title: T?.tabsTitle ?? "", items: T?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(g, q) : q;
    }
    function Rl(u, p) {
      return r[`${u}-${p}`] ?? r[u];
    }
    function La(u, p, g, T) {
      return Rl(u, p.id)?.({ panel: p, view: g, active: T });
    }
    od({
      panelFor: (u) => i.value.get(u) ?? null,
      viewFor: w,
      setView: V,
      movable: v(() => a.movable),
      resizable: v(() => a.resizable),
      minPanelSize: v(() => a.minPanelSize),
      spaceNames: v(() => a.spaceNames),
      focused: m,
      dragging: y,
      dropTarget: k,
      moving: C,
      framing: _,
      canMove: Y,
      focus(u) {
        m.value !== u && (m.value = u, s("panel-activate", u));
      },
      selectPanel: Sn,
      beginDrag: Ge,
      toggleMoveMode: bl,
      nudge: xl,
      setSizes: Cl,
      frameOf: (u) => d.value ? Se(d.value, u) : null,
      beginFrameDrag: yl,
      nudgeFrame: wl,
      raise: Q,
      maximized: E,
      toggleMaximize: Ca,
      minimized: U,
      toggleMinimize: Pe,
      beginFrameDragAt: Sa,
      raiseAt: B,
      toggleMaximizeAt: Rt,
      toggleMinimizeAt: Ce,
      menuFor: zl,
      spaceMenu: Tl,
      registerMenu: El,
      closable: Ma,
      close: Sl,
      renderContent: (u, p, g) => La("panel", u, p, g),
      renderActions: (u, p, g) => La("actions", u, p, g),
      layout: d
    });
    const Fl = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Nl = () => {
      const u = y.value, p = x.value;
      return !u || !p ? null : Dl(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${p.x}px`, top: `${p.y}px` },
          "aria-hidden": "true"
        },
        i.value.get(u)?.title ?? u
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(u, p, g, T) {
        const I = d.value;
        I && G(ln(I, u, p, g, T), {
          panel: u,
          target: p,
          edge: g,
          ...T === void 0 ? {} : { index: T }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(u) {
        const p = d.value;
        p && (l.value = St(p, u));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(u, p, g) {
        const T = d.value;
        T && G(ns(T, u, p, g), {
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
        const T = Hu(g, u, p);
        if (T === g) return;
        l.value = T;
        const I = Se(T, u);
        I && s("frame-change", { panel: u, rect: I.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: V,
      /** Brings a floating frame to the front of its stack. */
      raise: Q,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Ca,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Pe
    }), (u, p) => (f(), h("div", {
      ref_key: "root",
      ref: z,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": y.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Me(Fl.value)
    }, [
      d.value ? (f(), J(ef, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", nf, " This window has no panels. ")),
      ve(Nl),
      $("p", af, O(F.value), 1)
    ], 12, tf));
  }
}), lf = /* @__PURE__ */ ue(sf, [["__scopeId", "data-v-711565af"]]);
function Mf(e = "", t = "/") {
  const n = W(tt(e)), a = W(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    push(l) {
      n.value = tt(l), s.push(`${a.value}${n.value}`);
    },
    replace(l) {
      n.value = tt(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function os(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return tt(a === -1 ? n : n.slice(0, a));
}
function Ef(e) {
  const t = W(os(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), a = be(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = os(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${tt(s)}`),
    replace: (s) => e.replace(`${n.value}${tt(s)}`),
    dispose: a
  };
}
const rf = {
  DataShell: $u,
  ShellHeader: Ks,
  QueryPanel: Ws,
  RecordActions: Us,
  ResultsArea: tl,
  FacetControl: Vs,
  SegmentedControl: Fu,
  StatusPill: Xt,
  WindowFrame: lf,
  WindowPane: _l,
  ListView: In,
  CardsView: Gs,
  GridView: Xs,
  ImagesView: Ys,
  TableView: Js,
  LinksView: Qs,
  PreviewView: Zs,
  TypeCardsView: el
}, Pf = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(rf))
      e.component(`${n}${a}`, s);
    t.route && e.provide(ds, t.route);
  }
};
export {
  _n as CASCADE_STEP,
  df as COLUMN_BREAKPOINTS,
  uf as COLUMN_ROLES,
  Gs as CardsView,
  Qa as ColumnCell,
  pt as DEFAULT_FRAME,
  zn as DEFAULT_SORT,
  ql as DEFAULT_VIEW,
  $u as DataShell,
  Rn as EMPTY_CELL,
  Os as ENTITY_ALL,
  gn as ENTITY_TERM,
  Ht as EXPRESSION_TERM,
  ia as FACET_PREFIX,
  Vs as FacetControl,
  Xs as GridView,
  Pf as HeaderContentLayoutPlugin,
  Ys as ImagesView,
  Qs as LinksView,
  In as ListView,
  kt as MINIMIZED_GAP,
  al as MINIMIZED_HEIGHT,
  On as MINIMIZED_WIDTH,
  nl as MIN_FRAME,
  Ha as MOCK_TINTS,
  hf as MenuBar,
  fa as MenuButton,
  ua as MenuList,
  Yt as MetricDrill,
  xa as PANE_CONTEXT_KEY,
  la as PARAM_DIR,
  na as PARAM_ENTITY,
  ra as PARAM_EXPR,
  oa as PARAM_PAGE,
  sa as PARAM_SORT,
  aa as PARAM_VIEW,
  da as PinStar,
  Zs as PreviewView,
  bn as QueryMark,
  Ws as QueryPanel,
  an as RECORD_STATUSES,
  ys as RESULT_FIELDS,
  ds as ROUTE_ADAPTER_KEY,
  Us as RecordActions,
  tl as ResultsArea,
  Is as SHELL_CONTEXT_KEY,
  cf as SHELL_THEMES,
  Qt as ScopeMark,
  Fu as SegmentedControl,
  _t as SelectTick,
  vf as ShellCard,
  Ks as ShellHeader,
  Za as StandingControl,
  Xt as StatusPill,
  Js as TableView,
  el as TypeCardsView,
  fs as VIEW_KINDS,
  Kl as VIEW_LABELS,
  ba as WINDOW_CONTEXT_KEY,
  lf as WindowFrame,
  _l as WindowPane,
  ll as activePanel,
  yt as activeTab,
  ta as addTerm,
  Zn as andExpression,
  Vu as axisOf,
  ha as cascade,
  bs as cellFull,
  jt as cellText,
  un as cellTextOf,
  Oe as cellValue,
  Ra as changesResults,
  Tn as clampRect,
  pl as collapseSpace,
  ed as collapseToTabs,
  gf as column,
  Na as columnAlign,
  Ia as columnClass,
  Fa as columnKey,
  xs as columnShortcut,
  sr as columnShortcutOf,
  Fn as columnTruncates,
  Gl as columnsFor,
  Wl as countPages,
  Bl as createHistoryAdapter,
  Mf as createMemoryAdapter,
  kr as createMockDataSource,
  Ef as createVueRouterAdapter,
  Ql as defaultCellText,
  rs as defaultLayout,
  Qn as defaultQuery,
  br as drillExpression,
  as as dropIntoSpace,
  Tt as emptyFacetState,
  Gn as emptyFacetValue,
  Ls as excludingTerm,
  Ss as expandShortcuts,
  bt as findEntity,
  rt as findSort,
  yf as fixedView,
  va as float,
  ns as floatPanel,
  hl as floatSplit,
  td as floatTabs,
  cn as fnv1a,
  vs as focusEntity,
  wt as formatCount,
  Ul as formatDate,
  ot as formatExpression,
  Hl as formatMetric,
  jl as formatOrdinal,
  Gt as formatTerm,
  $n as frame,
  dt as frameAt,
  Se as frameOf,
  qn as framePathOf,
  Te as frontPanel,
  _r as generateRows,
  mf as group,
  xt as groupOf,
  Wu as groups,
  _s as hasActiveFacets,
  ce as hasPanel,
  _f as headless,
  It as insertPanel,
  Dt as isChoosable,
  ff as isEntityScoped,
  gs as isFacetActive,
  ae as isFloat,
  X as isGroup,
  lt as isMaximized,
  ft as isMinimized,
  me as isPanelTab,
  Xn as isPristineQuery,
  zt as isSplit,
  Ie as isTabOf,
  Yn as isTypeCardsQuery,
  ps as isViewKind,
  Va as joinExpression,
  Rs as liftTerm,
  or as matchesExpression,
  yr as matchesFacets,
  Uu as maximizeFrame,
  Gu as maximizeFrameAt,
  sd as mergeSpace,
  ju as minimizeFrame,
  Xu as minimizeFrameAt,
  ln as movePanel,
  qt as moveTab,
  pf as negateTerm,
  it as nodeAt,
  Kt as nodeTitle,
  xe as normalizeLayout,
  tt as normalizeSearch,
  wa as normalizeSizes,
  gl as onlySpace,
  Wt as oppositeTerm,
  at as panelIds,
  Ze as panelNode,
  Ja as panelTabs,
  Re as parseExpression,
  Pr as parseQuery,
  ei as presentParts,
  js as presentRow,
  Be as pressOptions,
  Cd as providePaneContext,
  $r as provideShellContext,
  od as provideWindowContext,
  Ln as raiseFrame,
  Bt as raiseFrameAt,
  Yu as raisedPath,
  ws as reconcileFacets,
  rd as reconcileLayout,
  Ts as recordTerm,
  dr as refineExpression,
  vt as removePanel,
  ht as replaceAt,
  es as resizeRect,
  ls as resizeSplit,
  jn as resolveView,
  Ve as roleColumn,
  ks as roleColumns,
  yn as rootSpace,
  ga as row,
  Yl as rowKey,
  wn as sameTerm,
  Jn as scopeTerm,
  ea as scopeTermFor,
  Ns as scopedEntity,
  Ga as serializeQuery,
  St as setActivePanel,
  Hu as setFrameRect,
  ts as setFrameRectAt,
  pn as setSizesAt,
  bf as setSplitDirection,
  nt as sizesOf,
  ms as sortsFor,
  ke as spaceChrome,
  Lt as spaceTitle,
  ma as split,
  cr as splitExpression,
  ss as spreadTabs,
  Tr as summarizeQuery,
  ca as summaryTerms,
  fn as swapPanels,
  pa as tabNode,
  Jt as tabPanels,
  zs as termStanding,
  ml as tileFloat,
  $f as toFloat,
  xf as toTiled,
  wf as toggleMaximized,
  kf as toggleMinimized,
  $c as useColumns,
  Xr as useEntityCounts,
  Wc as useEntityPreviews,
  Cf as usePaneContext,
  Sf as usePaneMenu,
  gt as usePresentedRows,
  Lr as useQueryState,
  Zr as useRecordNames,
  zr as useResults,
  we as useShellContext,
  $a as useWindowContext,
  Ua as withStanding,
  Fs as withoutOwnScope,
  ir as withoutTerm
};
